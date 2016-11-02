/*
 * Copyright 2002-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.simpleweb.js.ajax.tiles2;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.tiles.ELTilesContainer;
import org.apache.tiles.Attribute;
import org.apache.tiles.Attribute.AttributeType;
import org.apache.tiles.AttributeContext;
import org.apache.tiles.Definition;
import org.apache.tiles.TilesContainer;
import org.apache.tiles.TilesException;
import org.apache.tiles.access.TilesAccess;
import org.apache.tiles.context.TilesRequestContext;
import org.apache.tiles.definition.DefinitionsFactoryException;
import org.apache.tiles.definition.NoSuchDefinitionException;
import org.apache.tiles.impl.BasicTilesContainer;
import org.springframework.js.ajax.tiles2.AjaxTilesView;
import org.springframework.web.servlet.support.JstlUtils;
import org.springframework.web.servlet.support.RequestContext;
import org.springframework.web.util.WebUtils;

/**
 * @author Jeremy Grelle
 * @author David Winterfeldt
 * 
 * @author modified by Heewon Jung
 * 
 */
@SuppressWarnings("unchecked")
public class AjaxParamTilesView extends AjaxTilesView {

	// get prefix, suffix from tilesProperties of TilesConfigurer
	private Map<String, String> initParams = null;

	protected void flattenAttributeMap(BasicTilesContainer container, TilesRequestContext requestContext, Map resultMap, Definition compositeDefinition,
			HttpServletRequest request, HttpServletResponse response) {

		if (compositeDefinition != null && request.getAttribute("isNestedDefinition") == null) {
			if (compositeDefinition.getAttributes() != null && compositeDefinition.getAttributes().size() > 0) {
				Iterator i = compositeDefinition.getAttributes().keySet().iterator();
				while (i.hasNext()) {
					Object key = i.next();
					Attribute attr = (Attribute) compositeDefinition.getAttributes().get(key);
					AttributeType attrType = attr.getType() != null ? attr.getType() : detectType(container, requestContext, attr);
					if (AttributeType.DEFINITION.equals(attrType) || AttributeType.TEMPLATE.equals(attrType) || AttributeType.OBJECT.equals(attrType)) {
						resultMap.put(key, attr);
						if (AttributeType.DEFINITION.equals(attrType)) {
							Definition nestedDefinition = container.getDefinitionsFactory().getDefinition(attr.getValue().toString(), requestContext);
							if (nestedDefinition != null && nestedDefinition != compositeDefinition) {
								flattenAttributeMap(container, requestContext, resultMap, nestedDefinition, request, response);
							}
						}
					}
				}
			}

			// Process dynamic attributes
			AttributeContext attributeContext = container.getAttributeContext(new Object[] { request, response });

			for (Iterator i = attributeContext.getAttributeNames(); i.hasNext();) {
				String key = (String) i.next();
				Attribute attr = attributeContext.getAttribute(key);
				resultMap.put(key, attr);
			}
		} else {
			if (request.getAttribute("isNestedDefinition") != null)
				request.removeAttribute("isNestedDefinition");
			Map<String, String> map = requestContext.getParam();

			String url;
			if (map.get("layout") == null) {
				url = (String) request.getAttribute("layout");
			} else {
				url = (String) map.get("layout");
			}

			Definition originalDefinition = container.getDefinitionsFactory().getDefinition(url, requestContext);

			Set<String> attrKeySet = originalDefinition.getAttributes().keySet();

			Iterator<String> attrKeyItr = attrKeySet.iterator();

			Map<String, String> tilesAttrMap = (Map<String, String>) request.getAttribute("tilesAttrMap");
			while (attrKeyItr.hasNext()) {
				String attrKey = (String) attrKeyItr.next();
				Attribute attribute = new Attribute();

				if (tilesAttrMap != null && tilesAttrMap.containsKey(attrKey))
					if (isValidDefinition(requestContext, tilesAttrMap.get(attrKey), container)) {
						attribute.setType(AttributeType.DEFINITION);
						attribute.setValue(tilesAttrMap.get(attrKey));
					} else {
						attribute.setValue(tilesAttrMap.get(attrKey));
					}
				else
					attribute.setValue(originalDefinition.getAttribute(attrKey).getValue());

				resultMap.put(attrKey, attribute);
				request.setAttribute(attrKey, attribute);

				if (AttributeType.DEFINITION.equals(attribute.getType())) {
					Definition nestedDefinition = container.getDefinitionsFactory().getDefinition(attribute.getValue().toString(), requestContext);
					if (nestedDefinition != null && nestedDefinition != compositeDefinition) {
						request.setAttribute("layout", attribute.getValue());
						request.setAttribute("isNestedDefinition", true);
						flattenAttributeMap(container, requestContext, resultMap, nestedDefinition, request, response);
					}
				}
			}
			// Process dynamic attributes
			AttributeContext attributeContext = container.getAttributeContext(new Object[] { request, response });

			for (Iterator i = attributeContext.getAttributeNames(); i.hasNext();) {
				String key = (String) i.next();
				Attribute attr = attributeContext.getAttribute(key);
				resultMap.put(key, attr);
			}
		}
	}

	@SuppressWarnings("unused")
	private void setValueWithPrefixSuffix(Attribute attribute, Object value, BasicTilesContainer container) {
		if (this.initParams == null)
			this.initParams = container.getApplicationContext().getInitParams();

		String prefix = "";
		String suffix = "";

		if (this.initParams.get("org.apache.tiles.prefix") != null)
			prefix = this.initParams.get("org.apache.tiles.prefix");
		if (this.initParams.get("org.apache.tiles.suffix") != null)
			suffix = this.initParams.get("org.apache.tiles.suffix");

		logger.debug("View name is '" + prefix + value + suffix + "' including prefix and suffix");

		attribute.setValue(prefix + value + suffix);
	}

	
	protected void renderMergedOutputModel(Map model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		response.setContentType(getContentType());

		ServletContext servletContext = getServletContext();
		String[] renderValuesArray = request.getParameterValues("render");
		List<String> renderValuesList = renderValuesArray != null ? Arrays.asList(renderValuesArray) : null;

		if (renderValuesList != null && renderValuesList.contains("all"))
			renderTilesPage(model, request, response, servletContext);
		else if ((getAjaxHandler().isAjaxRequest(request, response))) {

			String[] attrNames = getRenderFragments(model, request, response);
			if (attrNames.length == 0) {
				logger.warn("An Ajax request was detected, but no fragments were specified to be re-rendered.  "
						+ "Falling back to full page render.  This can cause unpredictable results when processing " + "the ajax response on the client.");
				super.renderMergedOutputModel(model, request, response);
				return;
			}

			ELTilesContainer container = (ELTilesContainer) TilesAccess.getContainer(servletContext);
			if (container == null) {
				throw new ServletException("Tiles container is not initialized. " + "Have you added a TilesConfigurer to your web application context?");
			}

			exposeModelAsRequestAttributes(model, request);
			JstlUtils.exposeLocalizationContext(new RequestContext(request, servletContext));

			TilesRequestContext tilesRequestContext = container.getTilesContextFactory().createRequestContext(container.getApplicationContext(),
					new Object[] { request, response });
			Definition compositeDefinition = container.getDefinitionsFactory().getDefinition(getUrl(), tilesRequestContext);
			Map flattenedAttributeMap = new HashMap();
			flattenAttributeMap(container, tilesRequestContext, flattenedAttributeMap, compositeDefinition, request, response);

			// initialize the session before rendering any fragments. Otherwise
			// views that require the session which has
			// not otherwise been initialized will fail to render
			request.getSession();
			response.flushBuffer();
			for (int i = 0; i < attrNames.length; i++) {
				Attribute attributeToRender = (Attribute) flattenedAttributeMap.get(attrNames[i]);

				if (attributeToRender == null) {
					throw new ServletException("No tiles attribute with a name of '" + attrNames[i] + "' could be found for the current view: " + this);
				} else {
					container.render(attributeToRender, response.getWriter(), new Object[] { request, response });
				}
			}
		} else
			renderTilesPage(model, request, response, servletContext);
	}

	private void renderTilesPage(Map model, HttpServletRequest request, HttpServletResponse response, ServletContext servletContext) throws ServletException,
			Exception, TilesException {
		TilesContainer container = TilesAccess.getContainer(servletContext);
		if (container == null) {
			throw new ServletException("Tiles container is not initialized. " + "Have you added a TilesConfigurer to your web application context?");
		}

		exposeModelAsRequestAttributes(model, request);
		JstlUtils.exposeLocalizationContext(new RequestContext(request, servletContext));

		if (!response.isCommitted()) {
			// Tiles is going to use a forward, but some web containers (e.g.
			// OC4J 10.1.3)
			// do not properly expose the Servlet 2.4 forward request
			// attributes... However,
			// must not do this on Servlet 2.5 or above, mainly for GlassFish
			// compatibility.
			ServletContext sc = getServletContext();
			if (sc.getMajorVersion() == 2 && sc.getMinorVersion() < 5) {
				WebUtils.exposeForwardRequestAttributes(request);
			}
		}

		container.render(getUrl(), new Object[] { request, response });
	}

	private boolean isValidDefinition(TilesRequestContext context, String definitionName, BasicTilesContainer container) {
		try {
			Definition definition = container.getDefinitionsFactory().getDefinition(definitionName, context);
			return definition != null;
		} catch (NoSuchDefinitionException nsde) {
			return false;
		} catch (DefinitionsFactoryException e) {
			return false;
		}
	}

	private AttributeType detectType(BasicTilesContainer container, TilesRequestContext requestContext, Attribute attr) throws DefinitionsFactoryException {
		if (attr.getValue() instanceof String) {
			if (container.getDefinitionsFactory().getDefinition(attr.getValue().toString(), requestContext) != null) {
				return AttributeType.DEFINITION;
			} else if (attr.getValue().toString().startsWith("/")) {
				return AttributeType.TEMPLATE;
			} else {
				return AttributeType.STRING;
			}
		}
		return AttributeType.OBJECT;
	}

}
