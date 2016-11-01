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
package org.anyframe.sample.servletannotation.web.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Application Lifecycle Listener implementation class AnyframeListener contains
 * example usage of @WebListener annotation.
 * 
 * @author Kwangyoung Kim
 * 
 */
@WebListener
public class MovieSerlvetContextListener implements ServletContextListener {

	static Logger logger = LoggerFactory.getLogger(MovieSerlvetContextListener.class);

	public void contextInitialized(ServletContextEvent sce) {
		logger.info("[MovieSerlvetContextListener] Servlet Context has been initialized");
	}

	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
	}

}
