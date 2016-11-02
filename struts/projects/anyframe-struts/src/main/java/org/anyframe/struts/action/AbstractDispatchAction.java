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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.struts.util.AbstractValueObjectList;
import org.anyframe.struts.util.ValueObject;
import org.apache.commons.validator.Validator;
import org.apache.commons.validator.ValidatorException;
import org.apache.commons.validator.ValidatorResults;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.validator.Resources;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyValues;
import org.springframework.validation.DataBinder;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * Class expanding the org.anyframe.struts.action.DefaultDispatchActionSupport.
 * <p>
 * Provides additional functionalities other than DefaultDispatchActionSupport
 * functionalities.
 * </p>
 * <br>
 * <p>
 * The AbstractDispatchAction doesn't define the form in struts-config.xml the
 * Struts's Form object. It allows for the usage of direct mapping in the server
 * side value object user inputed value transmitted from the presentation layer.
 * </p>
 * We need to implement the getValueObject method and create the VO object for
 * mapping in the inherited Action Class for the AbstractDispatchAction in order
 * to map the value in the value object. The VO object implements the
 * anyframe.common.ValueObject.
 * 
 * @author Byunghun Woo
 * 
 */
public abstract class AbstractDispatchAction extends DefaultDispatchActionSupport {
	public Logger logger;

	/**
	 * <p>
	 * Anyframe Core Delegation Util Method to get Logger
	 * </p>
	 */
	@SuppressWarnings("deprecation")
	protected void onInit() {
		super.onInit();
		getLogger();
	}

	/**
	 * The set of Method objects we have introspected for this class, keyed by
	 * method name. This collection is populated as different methods are
	 * called, so that introspection needs to occur only once per method name.
	 */
	@SuppressWarnings("unchecked")
	protected HashMap methods = new HashMap();

	/**
	 * The set of argument type classes for the reflected method call. These are
	 * the same for all calls, so calculate them only once.
	 */
	@SuppressWarnings("unchecked")
	protected Class[] types = { ActionMapping.class, ValueObject.class, HttpServletRequest.class, HttpServletResponse.class };

	/**
	 * Returns using the bean name for the bean registered in
	 * WebApplicationContext.
	 * 
	 * @param name
	 *            The bean name registered in ApplicationContext.
	 * @return Returns the bean appropriate to the Object Service.
	 */
	@SuppressWarnings("deprecation")
	protected Object getService(String name) {
		return getWebApplicationContext().getBean(name);
	}

	/**
	 * Overrides the process method of
	 * org.anyframe.struts.action.DefaultDispatchActionSupport.
	 * <p>
	 * If a specific request is requested, the process method is called with
	 * respect to the action mapping defined in the struts-config.xml. In the
	 * case the action class inheritting the AbstractionDispatchAction is
	 * defined as the mapping type, the process method is called and it again
	 * calls the appropriate method using the method's name info.
	 * </p>
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
	 *                if an exception occurs
	 */
	public ActionForward process(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String name = getMethodName(mapping, form, request, response, mapping.getParameter());
		getLogger().debug(this.getClass().getName() + "." + name + " Started!");
		ActionForward actionForward = super.process(mapping, form, request, response);
		getLogger().debug(this.getClass().getName() + "." + name + " Ended!");
		return actionForward;
	}

	/**
	 * get method
	 * 
	 * @param name
	 *            method name
	 * @return method
	 */
	@SuppressWarnings("unchecked")
	protected Method getMethod(String name) throws NoSuchMethodException {

		synchronized (methods) {
			Method method = (Method) methods.get(name);
			if (method == null) {
				method = clazz.getMethod(name, types);
				methods.put(name, method);
			}
			return (method);
		}

	}

	/**
	 * Dispatch to the specified method.
	 * 
	 * @since Struts 1.1
	 */
	@SuppressWarnings({ "deprecation", "unchecked" })
	protected ActionForward dispatchMethod(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response, String name)
			throws Exception {

		if (name == null) {
			return this.unspecified(mapping, form, request, response);
		}

		Method method = null;
		try {
			method = getMethod(name);

		} catch (NoSuchMethodException e) {
			String message = messages.getMessage("dispatch.method", mapping.getPath(), name);
			getLogger().error(message, e);
			throw e;
		}
		CommonsMultipartResolver multipartResolver = null;
		ActionForward forward = null;
		try {
			ValueObject vo = getValueObject();
			multipartResolver = new CommonsMultipartResolver(getServletContext());
			if (vo != null) {
				if (multipartResolver.isMultipart(request)) {
					try {
						request = multipartResolver.resolveMultipart(request);
					} catch (Exception e) {
						logger.error("Cannot parse the HTTP Request. Error : " + e.getMessage());
					}
				}
				if (vo instanceof AbstractValueObjectList) {
					AbstractValueObjectList voList = (AbstractValueObjectList) vo;
					String keyParam = voList.getKeyParamName();
					Iterator pmvs = convertRequestToPropertyValues(request, keyParam).iterator();
					while (pmvs.hasNext()) {
						Object _valueObject = voList.getValueObject();
						DataBinder binder = new DataBinder(_valueObject, "");
						binder.bind((PropertyValues) pmvs.next());
						voList.add(_valueObject);
					}
					vo = voList;

				} else {
					ServletRequestDataBinder binder = new ServletRequestDataBinder(vo, "ValueObject");
					binder.bind(request);
				}
			}
			Object args[] = { mapping, vo, request, response };
			forward = (ActionForward) method.invoke(this, args);

		} catch (ClassCastException e) {
			String message = messages.getMessage("dispatch.return", mapping.getPath(), name);
			getLogger().error(message, e);
			throw e;

		} catch (IllegalAccessException e) {
			String message = messages.getMessage("dispatch.error", mapping.getPath(), name);
			getLogger().error(message, e);
			throw e;

		} catch (InvocationTargetException e) {
			Throwable t = e.getTargetException();
			if (t instanceof Exception) {
				throw ((Exception) t);
			} else {
				String message = messages.getMessage("dispatch.error", mapping.getPath(), name);
				getLogger().error(message, t);
				throw new ServletException(t);
			}
		} finally {
			try {
				if (request instanceof MultipartHttpServletRequest) {
					multipartResolver.cleanupMultipart((MultipartHttpServletRequest) request);
				}
			} catch (Exception e) {

			}
		}
		return (forward);
	}

	/**
	 * Changes to the map type by taking the key and value of the parameter
	 * included in the request.
	 * 
	 * @param request
	 *            The HTTP request we are processing
	 * @param keyParam
	 *            The parameter name being the key among the parameters
	 *            transmitted from the the Presentation Layer.
	 * @return The collection object including the Map
	 */
	@SuppressWarnings("unchecked")
	private Collection convertRequestToPropertyValues(HttpServletRequest request, String keyParam) {
		String[] keyValues = request.getParameterValues(keyParam);
		if (keyValues == null)
			return null;
		int keyValueCount = keyValues.length;
		Map _mutablePropertyValuesMap = new HashMap();
		for (int i = 0; i < keyValueCount; i++) {
			_mutablePropertyValuesMap.put(String.valueOf(i), new MutablePropertyValues());
		}
		Enumeration keys = request.getParameterNames();
		String key = null;
		String[] values = null;
		MutablePropertyValues mpv = null;

		while (keys.hasMoreElements()) {
			key = (String) keys.nextElement();
			values = request.getParameterValues(key);
			int valuesCount = values.length;
			for (int i = 0; i < valuesCount && i < keyValueCount; i++) {
				mpv = (MutablePropertyValues) _mutablePropertyValuesMap.get(String.valueOf(i));
				mpv.addPropertyValue(key, values[i]);
			}
		}

		return _mutablePropertyValuesMap.values();

	}

	/**
	 * get Logger
	 */
	public Logger getLogger() {
		return LoggerFactory.getLogger(this.getClass().getName());
	}

	/**
	 * Returns by creating the instance of the VO class used on the Server side.
	 * Has to be implemented in the action class inheritted from
	 * org.anyframe.struts.action.AbstractDispatchAction. Has to return by
	 * creating the VO's instance for mapping the user transmitted value.
	 * 
	 * @return the VO for mapping the user transmitted value
	 */
	public abstract ValueObject getValueObject();

	/**
	 * Does the VO's validation check.
	 * 
	 * @param request
	 *            The HTTP request we are processing
	 * @param vo
	 *            The VO mapping the user transmitted value
	 * @param validationKey
	 *            The form name defining the validation.xml
	 * @return ValidatorError
	 * @throws Exception
	 */
	protected ValidatorErrors validate(HttpServletRequest request, ValueObject vo, String validationKey) throws Exception {
		return validate(request, vo, validationKey, 0);
	}

	/**
	 * Does the validation check of VO.
	 * 
	 * @param request
	 *            The HTTP request we are processing
	 * @param vo
	 *            The VO mapping the user transmitted value.
	 * @param validationKey
	 *            The form name defined in validation.xml.
	 * @param page
	 *            The page for setting in the Validator.
	 * @return ValidatorError
	 * @throws Exception
	 * 
	 */
	@SuppressWarnings("deprecation")
	protected ValidatorErrors validate(HttpServletRequest request, ValueObject vo, String validationKey, int page) throws Exception {

		ValidatorErrors errors = new ValidatorErrors();
		@SuppressWarnings("unused")
		ValidatorResults validatorResults = null;
		Validator validator = Resources.initValidator(validationKey, vo, getServletContext(), request, errors, page);

		try {
			validatorResults = validator.validate();
		} catch (ValidatorException e) {
			logger.error(e.getMessage(), e);
		}

		if (errors.isValid() == false) {
			logger.debug(errors.getErrorMessage());
		}

		errors.checkValidation();
		return errors;
	}
}
