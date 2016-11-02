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

import org.anyframe.exception.BaseException;
import org.apache.struts.Globals;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.ActionMessages;
import org.apache.struts.action.ExceptionHandler;
import org.apache.struts.config.ExceptionConfig;
import org.slf4j.Logger;

/**
 * 
 * <p>
 * An <strong>ExceptionHandler</strong> is configured in the Struts
 * configuration file to handle a specific type of exception thrown by an
 * <code>Action.execute</code> method.
 * </p>
 * 
 * @author Byunghun Woo
 */
public class DefaultExceptionHandler extends ExceptionHandler {
	Logger logger = null;

	public DefaultExceptionHandler() {
		logger = DefaultActionUtil.getLogger(DefaultExceptionHandler.class.getName());
	}

	public ActionForward execute(Exception ex, ExceptionConfig ae, ActionMapping mapping, ActionForm formInstance, HttpServletRequest request,
			HttpServletResponse response) throws ServletException {

		ActionForward forward = null;
		if (ae.getPath() != null) {
			forward = new ActionForward(ae.getPath());
		} else {
			forward = mapping.getInputForward();
		}

		ActionMessage message = null;
		try {
			if (ex instanceof BaseException) {
				BaseException baseEx = (BaseException) ex;
				Object[] obj = baseEx.getMessageParameters();

				message = new ActionMessage(baseEx.getMessageKey(), obj);

				request.setAttribute(Globals.EXCEPTION_KEY, ex);
				logException("base exception is occurred! ", ex);
				storeException(request, baseEx.getMessageKey(), message, forward, ae.getScope());

			} else {
				message = new ActionMessage(ae.getKey(), ex.getMessage());
				request.setAttribute(Globals.EXCEPTION_KEY, ex);
				logException("runtime exception is occurred! ", ex);
				storeException(request, message.getKey(), message, forward, ae.getScope());
			}

		} catch (Exception e) {
			StackTraceElement element = e.getCause().getStackTrace()[0];
			logger.debug(element.getClassName() + ":" + element.getMethodName() + ":" + element.getLineNumber());
			logger.debug(e.getMessage());
		}
		return forward;
	}

	protected void storeException(HttpServletRequest request, String property, ActionMessage message, ActionForward forward, String scope) {

		ActionMessages messages = new ActionMessages();
		messages.add(property, message);

		if ("request".equals(scope)) {
			request.setAttribute(Globals.MESSAGE_KEY, messages);
		} else {
			request.getSession().setAttribute(Globals.MESSAGE_KEY, messages);
		}
	}

	/**
	 * <p>
	 * Logs the <code>Exception</code> using slf4j.
	 * </p>
	 * 
	 * @param e
	 *            The Exception to log.
	 * @since Struts 1.2
	 */
	protected void logException(String message, Exception e) {

		logger.debug(message, e);

	}

}