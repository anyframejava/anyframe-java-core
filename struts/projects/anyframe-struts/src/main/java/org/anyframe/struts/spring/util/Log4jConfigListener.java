/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.spring.util;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import org.apache.log4j.LogManager;
import org.springframework.web.util.Log4jWebConfigurer;
import org.springframework.web.util.WebUtils;

/**
 * 
 * @author Byunghun Woo
 *
 */
public class Log4jConfigListener extends org.springframework.web.util.Log4jConfigListener {
//	public void contextInitialized(ServletContextEvent event) {
//		Log4jWebConfigurer.initLogging(event.getServletContext());
//	}
//
//	public void contextDestroyed(ServletContextEvent event) {
//		Log4jWebConfigurer.shutdownLogging(event.getServletContext());
//	}    
    public void contextDestroyed(ServletContextEvent event) {
	ServletContext servletContext = event.getServletContext();
	servletContext.log("Shutting down Log4J");
	try {
//	    LogManager.shutdown();
	    LogManager.resetConfiguration();
	} finally {
	    // Remove the web app root system property.
	    if (exposeWebAppRoot(servletContext)) {
		WebUtils.removeWebAppRootSystemProperty(servletContext);
	    }
	}
    }

    /**
         * Return whether to expose the web app root system property, checking
         * the corresponding ServletContext init parameter.
         * 
         * @see #EXPOSE_WEB_APP_ROOT_PARAM
         */
    private static boolean exposeWebAppRoot(ServletContext servletContext) {
	String exposeWebAppRootParam = servletContext
		.getInitParameter(Log4jWebConfigurer.EXPOSE_WEB_APP_ROOT_PARAM);
	return (exposeWebAppRootParam == null || Boolean.valueOf(
		exposeWebAppRootParam).booleanValue());
    }
}
