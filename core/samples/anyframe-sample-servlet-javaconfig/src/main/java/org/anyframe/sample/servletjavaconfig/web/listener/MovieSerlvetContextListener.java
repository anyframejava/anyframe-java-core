/*
 * Copyright 2008-2013 the original author or authors.
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
package org.anyframe.sample.servletjavaconfig.web.listener;

import java.util.EnumSet;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.MultipartConfigElement;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletRegistration;
import javax.servlet.ServletRegistration.Dynamic;
import javax.servlet.annotation.WebListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Application Lifecycle Listener implementation class
 * AnyframeSerlvetContextListener contains example usage of programmatic
 * configuration.
 * 
 * @author Kwangyoung Kim
 * 
 */
@WebListener
public class MovieSerlvetContextListener implements ServletContextListener {

	Logger logger = LoggerFactory.getLogger(MovieSerlvetContextListener.class);

	public void contextInitialized(ServletContextEvent sce) {
		logger.info("[MovieSerlvetContextListener] Servlet Context has been initialized");

		ServletContext sc = (ServletContext) sce.getServletContext();

		// 1. add a filter which filters request with URL '/movie.do'.
		// ServletContext#addFilter method returns FilterRegistration.Dynamic
		// object. Users can configurate filter by method which implements
		// FilterRegistration.Dynamic interface
		FilterRegistration.Dynamic dynamicFilter = sc
				.addFilter(
						"EncodingFilter",
						org.anyframe.sample.servletjavaconfig.web.filter.EncodingFilter.class);
		dynamicFilter.addMappingForUrlPatterns(
				EnumSet.allOf(DispatcherType.class), true, "/movie.do");
		logger.info("Encoding Filter has been Added");

		// 2. add 'MovieFinderServlet' servlet. It is similar to adding a filter
		// that ServletContext#addServlet method
		// returns ServletRegistration.Dynamic obect
		ServletRegistration.Dynamic dynamicServlet = sc
				.addServlet(
						"MovieFinderServlet",
						(org.anyframe.sample.servletjavaconfig.web.servlet.MovieFinderSerlvet.class));
		dynamicServlet.addMapping("/movieFinder.do");
		logger.info("MovieFinder Servlet has been Added");

		// 3. add 'MovieServlet' servlet.
		dynamicServlet = sc
				.addServlet(
						"MovieServlet",
						(org.anyframe.sample.servletjavaconfig.web.servlet.MovieServlet.class));
		dynamicServlet.addMapping("/movie.do");
		logger.info("Movie Servlet has been Added");

		// 4. add 'FileUploadForwardServlet' servlet.
		dynamicServlet = sc
				.addServlet(
						"FileUploadPageServlet",
						(org.anyframe.sample.servletjavaconfig.web.servlet.FileUploadPageServlet.class));
		dynamicServlet.addMapping("/fileUpload.do");
		dynamicServlet.setInitParameter("encoding", "utf-8");
		logger.info("FileUploadPage Servlet has been Added");

		// 5. add 'FileUploadForwardServlet' servlet.
		dynamicServlet = sc
				.addServlet(
						"FileUploadServlet",
						(org.anyframe.sample.servletjavaconfig.web.servlet.FileUploadServlet.class));
		dynamicServlet.addMapping("/upload.do");
		dynamicServlet.setMultipartConfig(new MultipartConfigElement(null,
				50000000, 50000000, 0));

		logger.info("FileUpload Servlet has been Added");

		// 6. get FileUploadServlet servlet from Servlet Context through
		// ServletContext#getServletRegistration. It returns
		// ServletRegistration.Dynamic object so that users can set
		// configuration
		dynamicServlet = (Dynamic) sc
				.getServletRegistration("FileUploadServlet");
		dynamicServlet.setInitParameter("encoding", "utf-8");
		logger.info("Add an init parameter on FileUpload Servlet");
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}

}
