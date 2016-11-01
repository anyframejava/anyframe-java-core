/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.logmanager.web.filter;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.helpers.Loader;
import org.apache.log4j.xml.DOMConfigurator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

/**
 * 
 * @author Heewon Jung
 * @author Alex Eum
 */
public class MDCServletFilter implements Filter {

	public static final String CLIENT_IP = "clientIp";
	// public static final String SERVER_ID = "serverId";
	public static final String APP_NAME = "appName";
	public static final String SESSION_ATTRIBUTES_PARAM = "sessionAttributes";
	public static final String DEFAULT_LOG4J_INIT_FILE = "log4j.xml";
	public static final String DEFAULT_LOG4J_ENABLE = "true";
	public static final String LOG4J_INIT_FILE_PARAM = "log4jFile";
	public static final String LOG4J_ENABLE_PARAM = "log4jDynamicReload";
	public static final String LOG4J_PERIOD_PARAM = "log4jDynamicReloadPeriod";
	
	public static Logger logger = LoggerFactory.getLogger(MDCServletFilter.class);

	private FilterConfig config;

	public void init(FilterConfig config) throws ServletException {
		this.config = config;

		boolean isLog4jReloadEnable = checkLog4jReloadEnable();
		if (isLog4jReloadEnable) {
			String log4jFileName = getLog4jInitFileName();
			long log4jPeriod = getLog4jReloadPeriod();
			
			try{
				URL url = Loader.getResource(log4jFileName);
				if (log4jPeriod == 0) {
					DOMConfigurator.configureAndWatch(url.getFile());
				} else {
					DOMConfigurator.configureAndWatch(url.getFile(), log4jPeriod);
				}	
			}catch(Exception e){
				// not support log4j case
				logger.info("this application use \"Logback\"");
			}
		}
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;

		String sessionAttrs = config.getInitParameter("sessionAttributes");
		String[] sessionAttr = sessionAttrs.split(",");

		boolean bAdded = false;
		putSessionAttr(request, request.getSession(), sessionAttr);
		bAdded = true;

		try {
			chain.doFilter(servletRequest, servletResponse);
		} finally {
			if (bAdded) {
				removeSessionAttr(sessionAttr);
			}
		}
	}

	/**
	 * 
	 * @param sessionAttr
	 */
	private void removeSessionAttr(String[] sessionAttr) {
		for (int i = 0; i < sessionAttr.length; i++) {
			if (sessionAttr[i].contains(".")) {
				String[] sessionProp = sessionAttr[i].split("\\.");
				MDC.remove(sessionProp[1]);
			} else
				MDC.remove(sessionAttr[i]);
		}
		MDC.remove(CLIENT_IP);
		// MDC.remove(SERVER_ID);
		MDC.remove(APP_NAME);
	}

	/**
	 * 
	 * @param request
	 * @param session
	 * @param sessionAttr
	 */
	private void putSessionAttr(HttpServletRequest request, HttpSession session, String[] sessionAttr) {
		for (int i = 0; i < sessionAttr.length; i++) {
			if (sessionAttr[i].contains(".")) {
				String[] sessionProp = sessionAttr[i].split("\\.");
				if (session.getAttribute(sessionProp[0]) != null) {
					Object sessionObject = session.getAttribute(sessionProp[0]);
					if (sessionObject != null) {
						String propKey = sessionProp[1];
						String propValue = "";
						try {
							propValue = BeanUtils.getProperty(sessionObject, propKey);
						} catch (IllegalAccessException e) {
							logger.warn(e.getMessage(), e);
						} catch (InvocationTargetException e) {
							logger.warn(e.getMessage(), e);
						} catch (NoSuchMethodException e) {
							logger.warn(e.getMessage(), e);
						}
						if (propValue == null)
							MDC.put(propValue, "N/A");
						else
							MDC.put(propKey, propValue);
					}
				}
			} else if (session.getAttribute(sessionAttr[i]) != null) {
				String propValue = (String) session.getAttribute(sessionAttr[i]);
				MDC.put(sessionAttr[i], propValue);
			}

		}

		MDC.put(CLIENT_IP, request.getRemoteHost());
		// MDC.put(SERVER_ID, request.getServerName());
		MDC.put(APP_NAME, request.getContextPath());
	}

	private boolean checkLog4jReloadEnable() {
		String log4jEnable = config.getInitParameter(LOG4J_ENABLE_PARAM);
		if (log4jEnable == null || log4jEnable.equalsIgnoreCase(DEFAULT_LOG4J_ENABLE)) {
			return true;
		} else {
			return false;
		}
	}
	
	
	private String getLog4jInitFileName() {
		String log4jFile = config.getInitParameter(LOG4J_INIT_FILE_PARAM);
		if (log4jFile == null || log4jFile.equalsIgnoreCase(DEFAULT_LOG4J_INIT_FILE)) {
			return DEFAULT_LOG4J_INIT_FILE;
		} else {
			return log4jFile;
		}
	}

	
	private long getLog4jReloadPeriod() {
		String period = config.getInitParameter(LOG4J_PERIOD_PARAM);
		if (period == null) {
			return 0;
		} else {
			return Long.parseLong(period);
		}
	}

	public void destroy() {
	}
}
