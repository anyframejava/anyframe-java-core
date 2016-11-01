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

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.struts.util.InvalidTokenException;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.locale.converters.DateLocaleConverter;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.action.ActionMessage;
import org.apache.struts.action.ActionMessages;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.struts.ActionSupport;

/**  
 * 
 * 
 * Abstract Action Class which provide token, exception, error logging, pre/post
 * execution features.
 * 		<ui>
 * 			<li>getLogger	: 	Setup Logger</li>
 * 			<li>preProcess	: 	Check Synchronized Token</li>
 * 			<li>Process		: 	Call Business Method</li>
 * 			<li>postProcess	: 	Check post Condition</li>
 * 			<li>processInvalidTokenException	</li>
 * 			<li>processUnCheckedException</li>
 * 			<li>processCheckedException</li>
 * 			<li>processFinally</li>
 * 		</ui>
 * 
 * @author Byunghun Woo
 */

public abstract class AbstractActionSupport extends ActionSupport {
	/**
	 * Core Framework Delegation Util Method to get Logger
	 */
	public Logger getLogger() throws Exception{
		return LoggerFactory.getLogger(this.getClass().getName());
	}

	/**
	 * <p>
	 * Process the specified non-HTTP request, and create the corresponding
	 * non-HTTP response (or forward to another web component that will create
	 * it), with provision for handling exceptions thrown by the business logic.
	 * Return an {@link ActionForward} instance describing where and how control
	 * should be forwarded, or <code>null</code> if the response has already
	 * been completed.
	 * </p>
	 * 
	 * <p>
	 * The default implementation attempts to forward to the HTTP version of
	 * this method.
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		ActionForward forward = null;

		try {
			preProcess(mapping, form, request, response);
			getLogger()
					.debug(this.getClass().getName() + ".process() Started!");
			setDateConvertUtil();
			forward = process(mapping, form, request, response);
			getLogger().debug(this.getClass().getName() + ".process() Ended!");
			forward = postProcess(mapping, form, request, response, forward);
		} catch (InvalidTokenException tokenException) {
			forward = processInvalidTokenException(mapping, form, request,
					response, tokenException);
		} catch (RuntimeException uncheckedException) {
			forward = processUnCheckedException(mapping, form, request,
					response, uncheckedException);
		} catch (Exception checkedException) {
			getLogger().debug("\n Action Support Exception catch!!");
			forward = processCheckedException(mapping, form, request, response,
					checkedException);
		} finally {
			forward = processFinally(mapping, form, request, response, forward);
		}
		return forward;
	}

	/**
	 * 
	 * <p>
	 * The abstract method which sub classes must implement
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public abstract ActionForward process(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception;

	/**
	 * 
	 * <p>
	 * The basic method which execute some pre condition actions eg.
	 * authorization, authentication, token validation, etc.
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public void preProcess(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		boolean validateToken = false;
		boolean resetToken = false;

		if (mapping instanceof DefaultActionMapping) {
			DefaultActionMapping t_mapping = (DefaultActionMapping) mapping;
			validateToken = t_mapping.isValidateToken();
			resetToken = t_mapping.isResetToken();
		}

		if (validateToken) {
			if (!isTokenValid(request, resetToken)) {
				throw new InvalidTokenException("common.msg.invalidtoken.error");
			}
		}
		String charset = this.servlet.getInitParameter("character-encoding");
		if( charset == null ) charset = "euc-kr";
		request.setCharacterEncoding(charset);
	}

	/**
	 * 
	 * <p>
	 * The basic method which execute some post condition actions eg. exception
	 * processing etc.
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public ActionForward postProcess(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response,
			ActionForward forward) throws Exception {

		boolean saveToken = false;
		if (mapping instanceof DefaultActionMapping) {
			DefaultActionMapping t_mapping = (DefaultActionMapping) mapping;
			saveToken = t_mapping.isSaveToken();
		}

		if (saveToken) {
			saveToken(request);
		}

		return forward;
	}

	/**
	 * 
	 * <p>
	 * The basic method which execute some common condition actions
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public ActionForward processFinally(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response,
			ActionForward forward) throws Exception {

		return forward;
	}

	/**
	 * 
	 * <p>
	 * The basic method which execute some business exceptional condition
	 * actions
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public ActionForward processCheckedException(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response, Exception checkedException)
			throws Exception {
		throw checkedException;
	}

	/**
	 * 
	 * <p>
	 * The basic method which execute some system exceptional condition actions
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public ActionForward processUnCheckedException(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response, Exception unCheckedException)
			throws Exception {

		throw unCheckedException;
	}

	/**
	 * 
	 * <p>
	 * The basic method which execute some token invalid exceptional condition
	 * actions
	 * </p>
	 * 
	 * @param mapping
	 *            The ActionMapping used to select this instance
	 * @param form
	 *            The optional ActionForm bean for this request (if any)
	 * @param request
	 *            The non-HTTP request we are processing
	 * @param response
	 *            The non-HTTP response we are creating
	 * @return The forward to which control should be transferred, or
	 *         <code>null</code> if the response has been completed.
	 * @throws Exception
	 *             if the application business logic throws an exception.
	 */
	public ActionForward processInvalidTokenException(ActionMapping mapping,
			ActionForm form, HttpServletRequest request,
			HttpServletResponse response, Exception tokenException)
			throws Exception {

		ActionMessages messages = new ActionMessages();
		ActionMessage message = new ActionMessage(
				"common.msg.invalidtoken.error");
		messages.add(ActionMessages.GLOBAL_MESSAGE, message);
		saveMessages(request, messages);
		resetToken(request);
		saveToken(request);
		
		throw tokenException;
	}
	
	/**
	 * Returns using the bean name for the bean registered in WebApplicationContext.
	 * 
	 * @param name
	 *            The bean name registered in ApplicationContext.
	 * @return Returns the bean appropriate to the Object Service.
	 */
	protected Object getService(String name) {
		return getWebApplicationContext().getBean(name);
	}
	
	private void setDateConvertUtil(){
		String pattern = "MM/dd/yy";
		Locale locale = Locale.getDefault();
		DateLocaleConverter converter = new DateLocaleConverter(locale, pattern);
		converter.setLenient(true);
		ConvertUtils.register(converter, java.util.Date.class);
 	}
}
