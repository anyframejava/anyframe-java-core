/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.simpleweb.controller;

import java.lang.annotation.Annotation;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.metadata.ConstraintDescriptor;

import org.anyframe.exception.BaseException;
import org.anyframe.pagination.Page;
import org.anyframe.simpleweb.beans.support.BeanMethodInfo;
import org.anyframe.simpleweb.beans.support.BeanMethodRepository;
import org.anyframe.simpleweb.beans.support.ServiceEL;
import org.anyframe.util.StringUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.NotReadablePropertyException;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.Validator;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

/**
 * Abstract Common controller class to execute business service methods simply
 * 
 * @author Juergen Hoeller
 * 
 * @author modified by Sooyeon Park
 * @author modified by Heewon Jung
 * 
 */
public abstract class AbstractServiceController extends MultiActionController implements MessageSourceAware {

	/** Logger that is available to AbstractServiceController */
	private final Logger logger = LoggerFactory.getLogger(AbstractServiceController.class);

	public static final String PARAM_FORM_NAME = "formName";
	public static final String PARAM_IS_SHOW_NEW_FORM = "isShowNewForm";
	public static final String PARAM_IS_SESSION_FORM = "isSessionForm";
	public static final String PARAM_UPLOAD_PATH = "uploadPath";
	public static final String PARAM_VALIDATOR = "validator";
	public static final String PARAM_INPUT_PAGE = "inputpage";
	public static final String PARAM_PAGE_INDEX = "pageIndex";
	public static final String PARAM_COMMAND_NAME = "commandName";
	public static final String PARAM_COMMAND_CLASS = "commandClass";
	public static final String PARAM_INITDATA_SERVICE = "initdataService";
	public static final String PARAM_INITDATA_RESULT = "initdataResult";
	public static final String PARAM_TILES = "tiles";

	// viewName for service execution
	public static final String PARAM_ATTR_VIEWNAME = "viewName";
	public static final String PARAM_ATTR_VIEW = "view";
	public static final String PARAM_ATTR_SERVICE = "service";
	public static final String PARAM_ATTR_LAYOUT = "layout";

	public static final String ATTR_TILES_MAP = "tilesAttrMap";
	public static final String ATTR_SEARCH = "search";
	public static final String ATTR_RESULT_LIST = "resultList";
	public static final String ATTR_RESULT_PAGE = "resultPage";
	public static final String ATTR_VIEWNAME = "resultView";

	public static final String FILEVO_FILE_PATH = "filePaths";
	public static final String DEFAULT_UPLOAD_PATH = "/upload/";
	public static final String FILE_PREFIX = "uploadFile";
	public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

	private BeanMethodRepository beanMethodsRepo;

	private MessageSource messageSource;

	private String uploadPath = "/upload/";

	@Inject
	private javax.validation.Validator validator;

	public Logger getLogger() {
		return logger;
	}

	public void setBeanMethodsRepo(BeanMethodRepository beanMethodsRepo) {
		this.beanMethodsRepo = beanMethodsRepo;
	}

	public BeanMethodRepository getBeanMethodsRepo() {
		return beanMethodsRepo;
	}

	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}

	public String getUploadPath() {
		return uploadPath;
	}

	public MessageSource getMessageSource() {
		return messageSource;
	}

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {

		// 1. preventing duplicated submission.
		checkDuplicatedSubmission(request);

		// 2. execute service method and get view name
		Map<String, Object> viewInfo = executeServiceAndReturnView(request);

		String viewName = (String) viewInfo.get("VIEW_NAME");

		if (viewInfo.get("INPUT_PAGE") == null)
			// set tiles attribute names and values
			setTilesAttributes(request, null);

		// 3. set attributes for empty command object
		setCommandAttributes(request);

		// 4. set attributes for initial data
		setInitdataAttributes(request);

		ModelAndView mav = new ModelAndView(viewName);

		return mav;
	}

	protected void checkDuplicatedSubmission(HttpServletRequest request) throws BaseException {
		HttpSession currentSession = request.getSession();

		String formName = request.getParameter(PARAM_FORM_NAME);
		String isShowNewForm = request.getParameter(PARAM_IS_SHOW_NEW_FORM);
		String isSessionForm = request.getParameter(PARAM_IS_SESSION_FORM);

		if (request.getAttribute(PARAM_IS_SESSION_FORM) != null)
			isSessionForm = null;
		else
			request.setAttribute(PARAM_IS_SESSION_FORM, isSessionForm);

		if (isShowNewForm != null && isShowNewForm.equals("true")) {
			if (formName == null)
				throw new BaseException("Set the 'formName' property");
			else {
				currentSession.setAttribute(formName, new Object());
				getLogger().debug("Setting form session attribute [{}] ", formName);
			}
		}
	}

	protected void setCompleteDuplicatedSubmission(HttpServletRequest request) throws BaseException {
		HttpSession currentSession = request.getSession();

		String formName = request.getParameter(PARAM_FORM_NAME);
		String isSessionForm = request.getParameter(PARAM_IS_SESSION_FORM);

		if (request.getAttribute(PARAM_IS_SESSION_FORM) != null)
			isSessionForm = null;
		else
			request.setAttribute(PARAM_IS_SESSION_FORM, isSessionForm);

		if (isSessionForm != null && isSessionForm.equals("true")) {
			if (formName == null)
				throw new BaseException("Set the parameter that key is 'formName'");
			else {
				if (currentSession.getAttribute(formName) != null) {
					currentSession.removeAttribute(formName);
					getLogger().debug("Removing form session attribute [{}]", formName);
				} else {
					getLogger().debug("Invalid submit detected");
					throw new BaseException(new String(getMessageSource().getMessage("common.msg.invalidtoken.error", new String[] {}, Locale.getDefault())));
				}
			}

		}
	}

	protected Map<String, Object> executeServiceAndReturnView(HttpServletRequest request) throws Exception {
		String viewName = request.getParameter(PARAM_ATTR_VIEWNAME);
		String view = request.getParameter(PARAM_ATTR_VIEW);
		String tiles = request.getParameter(PARAM_TILES);

		if (StringUtil.isNotEmpty(tiles)) {
			List<String> inputPageList = StringUtil.getTokens(tiles, ";");
			Iterator<String> inputPageListItr = inputPageList.iterator();
			while (inputPageListItr.hasNext()) {
				List<String> value = StringUtil.getTokens(inputPageListItr.next().toString(), ":");
				request.setAttribute(value.get(0), value.get(1));
			}
		}

		String serviceFromView = "";

		// check viewName
		if (request.getAttribute(PARAM_ATTR_VIEWNAME) != null) {
			viewName = (String) request.getAttribute(PARAM_ATTR_VIEWNAME);
			int serviceIndex = viewName.indexOf(PARAM_ATTR_SERVICE + "=");
			if (serviceIndex != -1)
				serviceFromView = viewName.substring(serviceIndex + 8);
			viewName = null;
		} else
			// save viewName to check duplicated view name
			request.setAttribute(PARAM_ATTR_VIEWNAME, viewName);

		if (viewName == null) {
			if (request.getParameter(PARAM_ATTR_LAYOUT) != null) {
				viewName = (String) request.getParameter(PARAM_ATTR_LAYOUT);
			} else if (request.getAttribute(PARAM_ATTR_LAYOUT) != null) {
				viewName = (String) request.getAttribute(PARAM_ATTR_LAYOUT);
			}
		}
		// check view
		if (request.getAttribute(PARAM_ATTR_VIEW) != null) {
			view = (String) request.getAttribute(PARAM_ATTR_VIEW);
		} else
			// save viewName to check duplicated view name
			request.setAttribute(PARAM_ATTR_VIEW, view);

		Map<String, Object> viewInfo = new HashMap<String, Object>();

		String resultView = (String) request.getAttribute(ATTR_VIEWNAME);

		if (resultView == null) {
			if (StringUtil.isNotEmpty(viewName) && (viewName.startsWith("forward:/") || viewName.startsWith("redirect:/"))) {
				resultView = viewName;
				if (StringUtil.isNotEmpty(view))
					request.setAttribute(ATTR_VIEWNAME, view);
			} else if (StringUtil.isNotEmpty(view))
				resultView = view;
			else if (StringUtil.isEmpty(view) && StringUtil.isNotEmpty(viewName))
				resultView = viewName;
		}
		viewInfo.put("VIEW_NAME", resultView);
		viewInfo.put("INPUT_PAGE", null);
		String service = request.getParameter(PARAM_ATTR_SERVICE);
		String serviceParam = serviceFromView;

		// invoke service method and set attributes
		if (StringUtil.isEmpty(serviceParam)) {

			if (request.getAttribute(PARAM_ATTR_SERVICE) != null)
				request.setAttribute(PARAM_ATTR_SERVICE, null);
			else
				// save service to check duplicated service name
				request.setAttribute(PARAM_ATTR_SERVICE, service);

			if (request.getAttribute(PARAM_ATTR_SERVICE) != null) {
				serviceParam = (String) request.getAttribute(PARAM_ATTR_SERVICE);
			} else
				return viewInfo;
		}
		ServiceEL serviceEL = new ServiceEL("#{" + serviceParam + "}");

		String serviceMethod = serviceEL.getSerivceMethod();

		BeanMethodInfo methodInfo = getBeanMethodsRepo().findBeanMethod(serviceEL.getBeanName(), serviceMethod);

		Object[] command = bindingCommand(request, methodInfo, serviceEL);

		if (StringUtils.isEmpty(serviceFromView) && request.getParameter(PARAM_VALIDATOR) != null) {
			if (request.getParameter(PARAM_INPUT_PAGE) == null || request.getParameter(PARAM_INPUT_PAGE).length() == 0) {
				logger.debug("'inputPage' is required or use javascript function.");
			} else {
				boolean isValidate = excuteValidator(request, command[0], new BeanPropertyBindingResult(command[0], methodInfo.getInputParamName()));
				if (isValidate == false) {

					if (request.getAttribute(ATTR_TILES_MAP) != null) {
						String tilesLayout = request.getParameter(PARAM_ATTR_LAYOUT);
						if (request.getParameter(PARAM_ATTR_LAYOUT) != null) {
							tilesLayout = request.getParameter(PARAM_ATTR_LAYOUT);
						} else if (request.getAttribute(PARAM_ATTR_LAYOUT) != null) {
							tilesLayout = (String) request.getAttribute(PARAM_ATTR_LAYOUT);
						}
						viewInfo.put("VIEW_NAME", tilesLayout);
					} else
						viewInfo.put("VIEW_NAME", request.getParameter(PARAM_INPUT_PAGE));

					viewInfo.put("INPUT_PAGE", "true");

					return viewInfo;
				}
			}
		}

		executeServiceMethod(serviceEL, request, null, command, methodInfo);

		return viewInfo;
	}

	protected abstract Object[] bindingCommand(HttpServletRequest request, BeanMethodInfo methodInfo, ServiceEL serviceEL) throws Exception;

	protected String executeServiceMethod(ServiceEL serviceEL, HttpServletRequest request, String resultName, Object[] command, BeanMethodInfo methodInfo)
			throws Exception {
		// check method info
		if (methodInfo == null) {
			getLogger().debug("Invalid Service Method is called.");
			throw new BaseException(new String(getMessageSource().getMessage("common.msg.invalidmethod.error", new String[] {}, Locale.getDefault())));
		}

		Object[] argument = new Object[serviceEL.getArgList().size() + 1];

		if (methodInfo.getInputParam() != null && methodInfo.getInputParam()[0] != null)
			return bindRequestsAndInvokeServiceMethod(serviceEL, request, argument, methodInfo, resultName, command);

		return invokeServiceMethod(serviceEL, request, new Object[1], null, methodInfo, resultName);
	}

	protected abstract String bindRequestsAndInvokeServiceMethod(ServiceEL serviceEL, HttpServletRequest request, Object[] argument, BeanMethodInfo methodInfo,
			String resultName, Object[] command) throws Exception;

	protected String invokeServiceMethod(ServiceEL serviceEL, HttpServletRequest request, Object[] command, Object[] argument, BeanMethodInfo methodInfo,
			String resultName) throws Exception {
		try {

			// 1. invoke service method
			HashMap<String, Object> bindMap = new HashMap<String, Object>();
			bindMap.put("beanFactory", this.getApplicationContext());
			if (serviceEL.getArgList().size() > 0) {
				List<String> argList = serviceEL.getArgList();
				for (int i = 0; i < argList.size(); i++) {
					bindMap.put(serviceEL.getArgList().get(i), argument[i]);
				}

			}
			Object result = serviceEL.execute(bindMap);

			if (methodInfo.getOutputParam()[0].getName().equals(Page.class.getName())) {
				request.setAttribute(ATTR_RESULT_PAGE, result);
				request.setAttribute(ATTR_RESULT_LIST, ((Page) result).getList());
				Object searchAttrValue = getValue(command[0], argument[0]);
				request.setAttribute(ATTR_SEARCH, searchAttrValue);
			} else {
				Object resultValue = getValue(command[0], result);
				if (resultName != null)
					request.setAttribute(resultName, resultValue);
				else
					request.setAttribute(methodInfo.getOutParamName(), resultValue);
			}

			// set Complete
			setCompleteDuplicatedSubmission(request);

			return null;
		} catch (Exception e) {
			throw new Exception(e.getCause());
		}
	}

	private boolean excuteValidator(HttpServletRequest request, Object command, BindingResult bindingResult) {
		String validatorBeanId = request.getParameter(PARAM_VALIDATOR);
		String inputPage = request.getParameter(PARAM_INPUT_PAGE);
		boolean isValidForm = true;

		request.setAttribute(BindingResult.MODEL_KEY_PREFIX + bindingResult.getObjectName(), bindingResult);
		request.setAttribute(bindingResult.getObjectName(), bindingResult.getTarget());

		if (StringUtil.isNotEmpty(validatorBeanId)) {
			Validator springmvcValidator = (Validator) this.getApplicationContext().getBean(validatorBeanId);
			springmvcValidator.validate(command, bindingResult);
		} else
			validate(command, bindingResult);

		if (bindingResult.hasErrors()) {
			request.setAttribute("isNestedDefinition", true);
			setTilesAttributes(request, inputPage);
			isValidForm = false;
		}

		return isValidForm;
	}

	public void validate(Object target, Errors errors) {
		Set<ConstraintViolation<Object>> result = this.validator.validate(target);
		for (ConstraintViolation<Object> violation : result) {
			String field = violation.getPropertyPath().toString();
			FieldError fieldError = errors.getFieldError(field);
			if (fieldError == null || !fieldError.isBindingFailure()) {
				try {
					Annotation annotation = (Annotation) violation.getConstraintDescriptor().getAnnotation();
					errors.rejectValue(field, annotation.annotationType().getSimpleName(), getArgumentsForConstraint(errors.getObjectName(), field, violation
							.getConstraintDescriptor()), violation.getMessage());
				} catch (NotReadablePropertyException ex) {
					throw new IllegalStateException("JSR-303 validated property '" + field
							+ "' does not have a corresponding accessor for Spring data binding - "
							+ "check your DataBinder's configuration (bean property versus direct field access)", ex);
				}
			}
		}
	}

	protected Object[] getArgumentsForConstraint(String objectName, String field, ConstraintDescriptor<?> descriptor) {
		List<Object> arguments = new LinkedList<Object>();
		String[] codes = new String[] { objectName + Errors.NESTED_PATH_SEPARATOR + field, field };
		arguments.add(new DefaultMessageSourceResolvable(codes, field));
		arguments.addAll(descriptor.getAttributes().values());
		return arguments.toArray(new Object[arguments.size()]);
	}

	protected abstract Object getValue(Object command, Object result);

	protected void setTilesAttributes(HttpServletRequest request, String inputpage) {
		String tiles = "";
		if (inputpage != null)
			tiles = inputpage;
		else
			tiles = request.getParameter(PARAM_TILES);
		Map<String, String> tilesAttrMap = new HashMap<String, String>();

		if (StringUtil.isNotEmpty(tiles)) {
			List<String> inputPageList = StringUtil.getTokens(tiles, ";");
			Iterator<String> inputPageListItr = inputPageList.iterator();
			while (inputPageListItr.hasNext()) {
				List<String> value = StringUtil.getTokens(inputPageListItr.next().toString(), ":");
				tilesAttrMap.put(value.get(0), value.get(1));
			}
		}

		request.setAttribute(ATTR_TILES_MAP, tilesAttrMap);
	}

	protected void setInitdataAttributes(HttpServletRequest request) throws Exception {
		if (StringUtil.isNotEmpty(request.getParameter(PARAM_INITDATA_SERVICE))) {
			String initdataService = request.getParameter(PARAM_INITDATA_SERVICE);
			String initdataResult = request.getParameter(PARAM_INITDATA_RESULT);

			List<String> services = StringUtil.getTokens(initdataService);
			List<String> results = StringUtil.getTokens(initdataResult);
			for (int i = 0; i < services.size(); i++) {
				ServiceEL serviceEL = new ServiceEL("#{" + services.get(i) + "}");

				String serviceMethod = serviceEL.getSerivceMethod();

				BeanMethodInfo methodInfo = getBeanMethodsRepo().findBeanMethod(serviceEL.getBeanName(), serviceMethod);

				Object[] command = bindingCommand(request, methodInfo, serviceEL);

				executeServiceMethod(serviceEL, request, results.get(i), command, methodInfo);
			}
		}
	}

	protected void setCommandAttributes(HttpServletRequest request) throws ClassNotFoundException {
		if (StringUtil.isNotEmpty(request.getParameter(PARAM_COMMAND_NAME))) {
			Class<?> argClass = Class.forName(request.getParameter(PARAM_COMMAND_CLASS));
			Object command = BeanUtils.instantiateClass(argClass);
			request.setAttribute(request.getParameter(PARAM_COMMAND_NAME), command);
		}
	}

	protected int getPageIndex(HttpServletRequest request) {
		if (StringUtil.isNotEmpty(request.getParameter(PARAM_PAGE_INDEX)))
			return new Integer(request.getParameter(PARAM_PAGE_INDEX)).intValue();
		else if (StringUtil.isNotEmpty(request.getParameter("page")))
			return new Integer(request.getParameter("page")).intValue();
		return 1;
	}

	/**
	 * Support binding of Date type.
	 */
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
		DateFormat df = new SimpleDateFormat(DEFAULT_DATE_FORMAT);
		CustomDateEditor dateEdit = new CustomDateEditor(df, true);
		binder.registerCustomEditor(Date.class, dateEdit);
	}
}
