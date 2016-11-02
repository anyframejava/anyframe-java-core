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
package org.anyframe.struts.action;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.MessageResources;
import org.apache.struts.util.ModuleException;
import org.slf4j.Logger;

/**
 * 
 * The class expanding the org.anyframe.struts.action.AbstractActionSupport. It
 * has the same functionality as org.apache.struts.action.ActionForward. At the
 * execution of process method, it leaves a log.
 * 
 * @author Byunghun Woo
 * 
 */
public class DefaultForwardAction extends AbstractActionSupport {

	/**
	 * The message resources for this package.
	 */
	protected static MessageResources messages = MessageResources.getMessageResources("org.apache.struts.actions.LocalStrings");

	private Logger logger;

	/**
	 * Core Framework Delegation Util Method to get Logger
	 */
	public Logger getLogger() throws ModuleException {
		try {
			if (logger == null)
				logger = DefaultActionUtil.getLogger(this.getClass().getName());
		} catch (Exception e) {
			System.out.println("error during getting logger at DefaultForwardAction");
			throw new ModuleException("common.msg.global.error");
		}
		return logger;
	}

	/**
	 * Process the specified HTTP request, and create the corresponding HTTP
	 * response (or forward to another web component that will create it).
	 * Return an <code>ActionForward</code> instance describing where and how
	 * control should be forwarded, or <code>null</code> if the response has
	 * already been completed.
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The HTTP request we are processing
	 * @param response
	 *            The HTTP response we are creating
	 * 
	 * @exception Exception
	 *                if an error occurs
	 */
	public ActionForward process(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {

		// Create a RequestDispatcher the corresponding resource
		String path = mapping.getParameter();

		if (path == null) {
			throw new ServletException(messages.getMessage("forward.path"));
		}

		// Let the controller handle the request
		ActionForward retVal = new ActionForward(path);

		return retVal;
	}

}
