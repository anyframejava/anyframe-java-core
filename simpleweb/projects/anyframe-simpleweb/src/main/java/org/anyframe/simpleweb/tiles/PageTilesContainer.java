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
package org.anyframe.simpleweb.tiles;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.tiles.Attribute;
import org.apache.tiles.AttributeContext;
import org.apache.tiles.Definition;
import org.apache.tiles.TilesException;
import org.apache.tiles.context.BasicAttributeContext;
import org.apache.tiles.context.TilesRequestContext;
import org.apache.tiles.definition.DefinitionsFactoryException;
import org.apache.tiles.definition.NoSuchDefinitionException;
import org.apache.tiles.impl.BasicTilesContainer;
import org.apache.tiles.preparer.NoSuchPreparerException;
import org.apache.tiles.preparer.ViewPreparer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This replace the attributes of layout to the parameter's values if there is
 * same parameter as layout's attribute in HttpRequest. It will use to reduce
 * the xml definition for tiles. Some of BasicTilesContainer class is reused,
 * and modified.
 * 
 * @author Changje Kim
 */

public class PageTilesContainer extends BasicTilesContainer {

	private static final Logger LOGGER = LoggerFactory.getLogger(PageTilesContainer.class);

	// get prefix, suffix from tilesProperties of TilesConfigurer
	private Map<String, String> initParams = null;

	/** {@inheritDoc} */
	public void render(String definitionName, Object... requestItems) throws TilesException {
		TilesRequestContext requestContext = getContextFactory().createRequestContext(getApplicationContext(), requestItems);
		render(requestContext, definitionName);
	}

	@SuppressWarnings("unchecked")
	protected void render(TilesRequestContext request, String definitionName) throws TilesException {

		LOGGER.debug("Render request recieved for definition '{}'", definitionName);
		// original source code
		// Definition definition = getDefinition(definitionName, request);

		Definition definition = null;
		if (!isValidDefinition(request, definitionName)) {

			Map<String, String> map = request.getParam();

			if (map.get("layout") == null) {
				definitionName = (String) ((HttpServletRequest) request.getRequest()).getAttribute("layout");
			} else {
				definitionName = (String) map.get("layout");
			}

			Definition originalDefinition = getDefinition(definitionName, request);
			definition = new Definition();

			definition.setName(originalDefinition.getName());
			definition.setTemplate(originalDefinition.getTemplate());

			Set<String> attrKeySet = originalDefinition.getAttributes().keySet();
			Iterator<String> attrKeyItr = attrKeySet.iterator();

			Map<String, String> tilesAttrMap = (Map<String, String>) ((HttpServletRequest) request.getRequest()).getAttribute("tilesAttrMap");
			while (attrKeyItr.hasNext()) {
				String attrKey = (String) attrKeyItr.next();
				Attribute attribute = new Attribute();

				if (tilesAttrMap != null && tilesAttrMap.containsKey(attrKey)) {
					if (isValidDefinition(request, tilesAttrMap.get(attrKey))) {
						attribute.setValue(tilesAttrMap.get(attrKey));
					} else {
						setValueWithPrefixSuffix(attribute, tilesAttrMap.get(attrKey));
					}
				} else
					attribute.setValue(originalDefinition.getAttribute(attrKey).getValue());
				definition.putAttribute(attrKey, attribute);
			}
		} else
			definition = getDefinition(definitionName, request);

		// end

		if (definition == null) {
			LOGGER.warn("Unable to find the definition '{}'", definitionName);
			throw new NoSuchDefinitionException(definitionName);
		}


		AttributeContext originalContext = getAttributeContext(request);
		BasicAttributeContext subContext = new BasicAttributeContext(originalContext);
		subContext.addMissing(definition.getAttributes());
		pushContext(subContext, request);

		try {
			if (definition.getPreparer() != null) {
				prepare(request, definition.getPreparer(), true);
			}

			String dispatchPath = definition.getTemplate();

			LOGGER.debug("Dispatching to definition path '{}'", definition.getTemplate());
			request.dispatch(dispatchPath);

			// tiles exception so that it doesn't need to be rethrown.
		} catch (TilesException e) {
			throw e;
		} catch (Exception e) {
			LOGGER.error("Error rendering tile", e);
			// TODO it would be nice to make the preparerInstance throw a more
			// specific
			throw new TilesException(e.getMessage(), e);
		} finally {
			popContext(request);
		}
	}

	private void setValueWithPrefixSuffix(Attribute attribute, Object value) {
		if (this.initParams == null)
			this.initParams = this.getApplicationContext().getInitParams();
		attribute.setValue(this.initParams.get("org.apache.tiles.prefix") + value + this.initParams.get("org.apache.tiles.suffix"));
	}

	private void prepare(TilesRequestContext context, String preparerName, boolean ignoreMissing) throws TilesException {

		LOGGER.debug("Prepare request received for '{}'", preparerName);

		ViewPreparer preparer = this.getPreparerFactory().getPreparer(preparerName, context);
		if (preparer == null && ignoreMissing) {
			return;
		}

		if (preparer == null) {
			throw new NoSuchPreparerException("Preparer '" + preparerName + " not found");
		}

		AttributeContext attributeContext = getContext(context);

		preparer.execute(context, attributeContext);
	}

	@SuppressWarnings("unused")
	private boolean isPermitted(TilesRequestContext request, Set<String> roles) {
		if (roles == null || roles.isEmpty()) {
			return true;
		}

		boolean retValue = false;

		for (Iterator<String> roleIt = roles.iterator(); roleIt.hasNext() && !retValue;) {
			retValue = request.isUserInRole(roleIt.next());
		}

		return retValue;
	}

	private AttributeContext getAttributeContext(TilesRequestContext tilesContext) {
		AttributeContext context = getContext(tilesContext);
		if (context == null) {
			context = new BasicAttributeContext();
			pushContext(context, tilesContext);
		}
		return context;
	}

	/**
	 * Checks if a string is a valid definition name.
	 * 
	 * @param context
	 *            The request context.
	 * @param definitionName
	 *            The name of the definition to find.
	 * @return <code>true</code> if <code>definitionName</code> is a valid
	 *         definition name.
	 */
	private boolean isValidDefinition(TilesRequestContext context, String definitionName) {
		try {
			Definition definition = getDefinition(definitionName, context);
			return definition != null;
		} catch (NoSuchDefinitionException nsde) {
			return false;
		} catch (DefinitionsFactoryException e) {
			return false;
		}
	}

}
