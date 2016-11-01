/* 
 * Copyright (C) 2002-2012 Robert Stewart (robert@wombatnation.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.anyframe.spring.web.servlet.view;

import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.Ordered;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationObjectSupport;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.util.UrlPathHelper;
import org.springframework.web.util.WebUtils;

/**
 * View Resolver Class for anyframe simple content negotiation implementation
 * 
 * @author jaehyoung.eum
 * 
 */
public class SimpleMediaTypeViewResolver extends WebApplicationObjectSupport implements ViewResolver, Ordered {

	private static final Logger LOGGER = LoggerFactory.getLogger(SimpleMediaTypeViewResolver.class);

	private static final UrlPathHelper URL_PATH_HELPER = new UrlPathHelper();	
	
	private int order = Ordered.HIGHEST_PRECEDENCE;

	private final ConcurrentMap<String, ViewResolver> viewResolverMapping = new ConcurrentHashMap<String, ViewResolver>();
	
	private final ConcurrentMap<String, View> viewMapping = new ConcurrentHashMap<String, View>();
	
	private ViewResolver defaultViewResolver = null;
	
	private View defaultView = null;
	
	private boolean checkExtension = true;
	
	private boolean checkParameter = false;
	
	private String parameterName = "mediaType";
	
	public void setDefaultMapping(Object object) {
		if(object != null) {
			if(object instanceof ViewResolver) {
				defaultViewResolver = (ViewResolver)object;
			}else if(object instanceof View) {
				defaultView = (View)object;
			}
		}
	}
	
	public void setCheckExtension(boolean checkExtension) {
		this.checkExtension = checkExtension;
	}

	public void setCheckParameter(boolean checkParameter) {
		this.checkParameter = checkParameter;
	}

	public void setParameterName(String parameterName) {
		this.parameterName = parameterName;
	}

	public int getOrder() {
		return order;
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public void setMediaTypeMappings(Map<String, Object> mediaTypeMappings) {
		for(Map.Entry<String, Object> entry : mediaTypeMappings.entrySet()) {
			String extention = entry.getKey().toLowerCase();
			LOGGER.debug("setMediaTypeMappings(): extention - {}", extention);
			if(entry.getValue() instanceof ViewResolver) {
				LOGGER.debug("setMediaTypeMappings(): found view resolver - {}", entry.getValue().getClass().getName());
				viewResolverMapping.put(extention, (ViewResolver)entry.getValue());
			}else if(entry.getValue() instanceof View){
				LOGGER.debug("setMediaTypeMappings(): found view - {}", entry.getValue().getClass().getName());
				viewMapping.put(extention, (View)entry.getValue());
			}
		}
	}
	
	

	/* (non-Javadoc)
	 * @see org.springframework.web.servlet.ViewResolver#resolveViewName(java.lang.String, java.util.Locale)
	 */
	public View resolveViewName(String viewName, Locale locale) throws Exception {
		
		LOGGER.debug("MediaTypeViewResolver...");
		
		RequestAttributes attrs = RequestContextHolder.getRequestAttributes();

		String requestedMediaType = null;
		HttpServletRequest request = ((ServletRequestAttributes) attrs).getRequest();
		requestedMediaType = getMediaType(request);
		LOGGER.debug("Requested media type is {}", requestedMediaType);
		if (requestedMediaType != null) {
			ViewResolver viewResolver = viewResolverMapping.get(requestedMediaType);
			if(viewResolver != null){
				LOGGER.debug("Found acceptable view resolver {}", viewResolver.getClass().getName());
				return viewResolver.resolveViewName(viewName, locale);
			}else{
				View view = viewMapping.get(requestedMediaType); 
				if(view != null) {
					LOGGER.debug("Found acceptable view {}", view.getClass().getName());
					return view;
				}else{
					LOGGER.debug("No acceptable view found for requested media type {}; ", requestedMediaType);
					return getDefaultView(viewName, locale);	
				}
			}
			
		}else{
			LOGGER.debug("No media type found this request {};", request.getRequestURI());
			return getDefaultView(viewName, locale);
		}
	}
	
	/**
	 * @param viewName
	 * @param locale
	 * @return
	 * @throws Exception
	 */
	private View getDefaultView(String viewName, Locale locale) throws Exception {
		if(this.defaultViewResolver != null) {
			LOGGER.debug("returning default view {}", this.defaultViewResolver.getClass().getName());
			return this.defaultViewResolver.resolveViewName(viewName, locale);
		}else if(this.defaultView != null) {
			LOGGER.debug("returning default view {}", this.defaultView.getClass().getName());
			return this.defaultView;
		}else{
			LOGGER.debug("returning null.");
			return null;
		}
	}
	
	/**
	 * @param request
	 * @return
	 * @throws Exception
	 */
	private String getMediaType(HttpServletRequest request) {
		String mediaType = null;

		if(this.checkExtension) {
			String requestUri = URL_PATH_HELPER.getLookupPathForRequest(request);
			String filename = WebUtils.extractFullFilenameFromUrlPath(requestUri);
			String extension = StringUtils.getFilenameExtension(filename);
			if (!StringUtils.hasText(extension)) {
				return null;
			}
			mediaType = extension.toLowerCase(Locale.ENGLISH);
		}else if(this.checkParameter){
			String parameterValue = request.getParameter(this.parameterName);
			if (parameterValue != null) {
				mediaType = parameterValue.toLowerCase(Locale.ENGLISH);
			}
		}
		
		return mediaType;
	}
}
