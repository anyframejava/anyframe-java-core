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
package org.anyframe.struts.test;

import java.io.File;

import org.apache.struts.Globals;
import org.apache.struts.action.ActionMessages;
import org.apache.struts.action.ActionServlet;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.context.support.XmlWebApplicationContext;

import servletunit.HttpServletRequestSimulator;
import servletunit.HttpServletResponseSimulator;
import servletunit.ServletContextSimulator;
import servletunit.struts.MockStrutsTestCase;

/**
 * MockStrutsSpringTestCaseBase is a Test Base Class for testing struts-spring
 * integration environment
 * 
 * @author Byunghun Woo
 * @since 2008.06.18
 */
public abstract class MockStrutsSpringTestCaseBase extends MockStrutsTestCase {

	private final String webappPath = "./src/test/resources/webapp";
	private final String CONFIG_LOCATIONS = "classpath*:/webapp"
			+ "/WEB-INF/config/spring/**/context-*.xml";
	private ConfigurableWebApplicationContext WEB_APP_CTXT = null;

	public MockStrutsSpringTestCaseBase(String testName) {
		super(testName);
	}

	public void setUp() throws Exception {
		// super.setUp();
		// This is code of super.setUp()
		logger.debug("Entering");
		if (actionServlet == null)
			actionServlet = new ActionServlet();

		// Not supported ServletConfigSimulator.getServletContext()
		config = new ServletConfigSimulatorExt();
		request = new HttpServletRequestSimulator(config.getServletContext());
		response = new HttpServletResponseSimulator();
		context = (ServletContextSimulator) config.getServletContext();
		requestWrapper = null;
		responseWrapper = null;
		isInitialized = true;
		logger.debug("Exiting");

		setInitParameter("validating", "false");
		setContextDirectory((new File(webappPath)).getCanonicalFile());
		setConfigFile("/WEB-INF/anyframetest-struts-config.xml");

		if (WEB_APP_CTXT == null) {
			ContextLoader ctxLoader = new ContextLoader();
			context.setInitParameter(ContextLoader.CONTEXT_CLASS_PARAM,
					XmlWebApplicationContext.class.getName());
			context.setInitParameter(ContextLoader.CONFIG_LOCATION_PARAM,
					CONFIG_LOCATIONS);
			ctxLoader.initWebApplicationContext(context);
			WEB_APP_CTXT = (ConfigurableWebApplicationContext) WebApplicationContextUtils
					.getRequiredWebApplicationContext(context);
		} else {
			WEB_APP_CTXT.setServletContext(context);
			context
					.setAttribute(
							WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE,
							WEB_APP_CTXT);
		}
	}

	protected void setTokenKey() {
		// set token key
		String tokenKey = this.getMockRequest().getSession().getAttribute(
				org.apache.struts.Globals.TRANSACTION_TOKEN_KEY).toString();
		addRequestParameter(org.apache.struts.taglib.html.Constants.TOKEN_KEY,
				tokenKey);
	}

	protected void verifyMessageArr(String messageKey) {
		verifyMessageArr(messageKey, messageKey);
	}

	protected void verifyMessageArr(String messageKey, String userMessage) {
		verifyMessageArr(messageKey, userMessage, 0);
	}

	protected void verifyMessageArr(String messageKey, String userMessage,
			int idx) {
		Object messageObj = (Object) this.getMockRequest().getAttribute(
				Globals.MESSAGE_KEY);
		String[] messages = {};
		if (messageObj instanceof ActionMessages) {
			verifyActionMessages(new String[] { messageKey });
		} else {
			messages = (String[]) messageObj;
			assertEquals(userMessage, messages[idx]);
		}
	}

}