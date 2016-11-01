/*
 * Copyright 2002-2010 the original author or authors.
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
package org.anyframe.spring.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceAware;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindException;
import org.springframework.web.HttpSessionRequiredException;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.SimpleFormController;
import org.springframework.web.servlet.mvc.multiaction.InternalPathMethodNameResolver;
import org.springframework.web.servlet.mvc.multiaction.MethodNameResolver;
import org.springframework.web.servlet.mvc.multiaction.NoSuchRequestHandlingMethodException;

import org.anyframe.exception.BaseException;

/**
 * MultiActionSimpleFormController Class which provide
 * exception, pre/post execution features. <br>
 * <br>
 * <ul>
 * <li>getLogger : Setup Logger</li>
 * <li>preProcess : do something before calling
 * business method</li>
 * <li>process : Call Business Method</li>
 * <li>postProcess : do something after calling
 * business method</li>
 * <li>processUnCheckedException</li>
 * <li>processCheckedException</li>
 * <li>processFinally</li>
 * </ul>
 * We changed
 * org.springframework.web.servlet.mvc.SimpleFormController,org.springframework.web.servlet.mvc.multiaction.MultiActionController
 * Class into
 * org.anyframe.spring.controller.MultiActionSimpleFormController
 * <ul>
 * <li>We changed this source for supporting multi
 * action and preventing duplicate form submission</li>
 * </ul>
 * 
 * 
 * @author Juergen Hoeller
 * @author Rod Johnson
 * @author modified by Sooyeon Park
 */

public class MultiActionSimpleFormController extends SimpleFormController{

	/** Logger that is available to AnyframeFormController */
	private final Log anyframeLogger = LogFactory.getLog(MultiActionSimpleFormController.class);
	
    // logger setting
    public Log getLogger() throws Exception {
        return LogFactory.getLog(this.getClass().getName());
    }

    private String success_list = null;

    private String success_get = null;

    private String success_update = null;

    private String success_add = null;

    private String success_delete = null;

    private String success_addView = null;

    private boolean showNewForm = false;

    public String getSuccess_list() {
        return success_list;
    }

    public void setSuccess_list(String success_list) {
        this.success_list = success_list;
    }

    public String getSuccess_get() {
        return success_get;
    }

    public void setSuccess_get(String success_get) {
        this.success_get = success_get;
    }

    public String getSuccess_update() {
        return success_update;
    }

    public void setSuccess_update(String success_update) {
        this.success_update = success_update;
    }

    public String getSuccess_add() {
        return success_add;
    }

    public void setSuccess_add(String success_add) {
        this.success_add = success_add;
    }

    public String getSuccess_delete() {
        return success_delete;
    }

    public void setSuccess_delete(String success_delete) {
        this.success_delete = success_delete;
    }

    public String getSuccess_addView() {
        return success_addView;
    }

    public void setSuccess_addView(String success_addView) {
        this.success_addView = success_addView;
    }

    public boolean isShowNewForm() {
        return showNewForm;
    }

    public void setShowNewForm(boolean showNewForm) {
        this.showNewForm = showNewForm;
    }

    // constructor
    public MultiActionSimpleFormController() {
        this.delegate = this;
        registerHandlerMethods(this.delegate);
    }

    /**
     * Submit callback with all parameters. Called in
     * case of submit without errors reported by the
     * registered validator, or on every submit if no
     * validator.
     * <p>
     * The default implementation delegates to
     * {@link #onSubmit(Object, BindException)}. For
     * simply performing a submit action and rendering
     * the specified success view, consider
     * implementing {@link #doSubmitAction} rather than
     * an <code>onSubmit</code> variant.
     * <p>
     * Subclasses can override this to provide custom
     * submission handling like storing the object to
     * the database. Implementations can also perform
     * custom validation and call showForm to return to
     * the form. Do <i>not</i> implement multiple
     * onSubmit methods: In that case, just this method
     * will be called by the controller.
     * <p>
     * Call <code>errors.getModel()</code> to
     * populate the ModelAndView model with the command
     * and the Errors instance, under the specified
     * command name, as expected by the "spring:bind"
     * tag.
     * @param request
     *        current servlet request
     * @param response
     *        current servlet response
     * @param command
     *        form object with request parameters bound
     *        onto it
     * @param errors
     *        Errors instance without errors (subclass
     *        can add errors if it wants to)
     * @return the prepared model and view, or
     *         <code>null</code>
     * @throws Exception
     *         in case of errors
     * @see #onSubmit(Object, BindException)
     * @see #doSubmitAction
     * @see #showForm
     * @see org.springframework.validation.Errors
     * @see org.springframework.validation.BindException#getModel
     */
    public ModelAndView onSubmit(HttpServletRequest request,
            HttpServletResponse response, Object command, BindException errors)
            throws Exception {
        ModelAndView result = null;
        try {
            preProcess(request, response);
            logger.debug(this.getClass().getName() + " process() Started!");
            result = process(request, response);
            logger.debug(this.getClass().getName() + " process() Ended!");
            postProcess(request, response);
        } catch (RuntimeException uncheckedException) {
            result =
                processUnCheckedException(request, response, uncheckedException);
        } catch (Exception checkedException) {
            logger.debug("\n Controller Exception catch!!");
            result =
                processCheckedException(request, response, checkedException);
        } finally {
            result = processFinally(request, response, result);
        }

        return result;
    }

    protected void preProcess(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        // do something before calling business method
    }

    protected void postProcess(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        // do something after calling business method
    }

    protected ModelAndView processCheckedException(HttpServletRequest request,
            HttpServletResponse response, Exception checkedException)
            throws Exception {
        throw checkedException;
    }

    protected ModelAndView processUnCheckedException(
            HttpServletRequest request, HttpServletResponse response,
            RuntimeException uncheckedException) throws Exception {
        throw uncheckedException;
    }

    protected ModelAndView processFinally(HttpServletRequest request,
            HttpServletResponse response, ModelAndView result) throws Exception {
        return result;
    }

    /**
     * Determine a handler method and invoke it.
     * @see MethodNameResolver#getHandlerMethodName
     * @see #invokeNamedMethod
     * @see #handleNoSuchRequestHandlingMethod
     */
    protected ModelAndView handleRequestInternal(HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        if (this.isSessionForm()) {
            // Form submission or new form to show?
            if (this.isShowNewForm()) {
                // New form to show: render form
                // view.
                return showNewForm(request, response);
            } else {// Fetch form object from HTTP
                // session, bind, validate,
                // process submission.
                try {
                    Object command = getCommand(request);
                    ServletRequestDataBinder binder =
                        bindAndValidate(request, command);
                    BindException errors =
                        new BindException(binder.getBindingResult());
                    return processFormSubmission(request, response, command,
                        errors);
                } catch (HttpSessionRequiredException ex) {
                    // Cannot submit a session form
                    // if no form object is in
                    // the session.
                    if (logger.isDebugEnabled()) {
                        logger.debug("Invalid submit detected: "
                            + ex.getMessage());
                    }
                    return handleInvalidSubmit(request, response);
                }
            }
        } else
            return onSubmit(request, response, null, null);
    }

    // ---------------------------------------------------------------------
    // Get Methods from MultiActionController
    // ---------------------------------------------------------------------
    /** Suffix for last-modified methods */
    public static final String LAST_MODIFIED_METHOD_SUFFIX = "LastModified";

    /**
     * Log category to use when no mapped handler is
     * found for a request.
     * @see #pageNotFoundLogger
     */
    public static final String PAGE_NOT_FOUND_LOG_CATEGORY =
        "org.springframework.web.servlet.PageNotFound";

    /**
     * Additional logger to use when no mapped handler
     * is found for a request.
     * @see #PAGE_NOT_FOUND_LOG_CATEGORY
     */
    protected static final Log pageNotFoundLogger =
        LogFactory.getLog(PAGE_NOT_FOUND_LOG_CATEGORY);

    /**
     * Object we'll invoke methods on. Defaults to
     * this.
     */
    private Object delegate;

    /**
     * Delegate that knows how to determine method
     * names from incoming requests
     */
    private MethodNameResolver methodNameResolver =
        new InternalPathMethodNameResolver();

    /** Handler methods, keyed by name */
    private final Map handlerMethodMap = new HashMap();

    /**
     * LastModified methods, keyed by handler method
     * name (without LAST_MODIFIED_SUFFIX)
     */
    private final Map lastModifiedMethodMap = new HashMap();

    /** Methods, keyed by exception class */
    private final Map exceptionHandlerMap = new HashMap();

    /**
     * Determine a handler method and invoke it.
     * @see MethodNameResolver#getHandlerMethodName
     * @see #invokeNamedMethod
     * @see #handleNoSuchRequestHandlingMethod
     */
    protected ModelAndView process(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        try {
            String methodName =
                this.methodNameResolver.getHandlerMethodName(request);
            return invokeNamedMethod(methodName, request, response);
        } catch (NoSuchRequestHandlingMethodException ex) {
            return handleNoSuchRequestHandlingMethod(ex, request, response);
        }
    }

    /**
     * Set the delegate used by this class; the default
     * is <code>this</code>, assuming that handler
     * methods have been added by a subclass.
     * <p>
     * This method does not get invoked once the class
     * is configured.
     * @param delegate
     *        an object containing handler methods
     * @throws IllegalStateException
     *         if no handler methods are found
     */
    public final void setDelegate(Object delegate) {
        Assert.notNull(delegate, "Delegate must not be null");
        this.delegate = delegate;
        registerHandlerMethods(this.delegate);
        // There must be SOME handler methods.
        if (this.handlerMethodMap.isEmpty()) {
            throw new IllegalStateException("No handler methods in class ["
                + this.delegate.getClass() + "]");
        }
    }

    /**
     * Set the method name resolver that this class
     * should use.
     * <p>
     * Allows parameterization of handler method
     * mappings.
     */
    public final void setMethodNameResolver(
            MethodNameResolver methodNameResolver) {
        this.methodNameResolver = methodNameResolver;
    }

    /**
     * Return the MethodNameResolver used by this
     * class.
     */
    public final MethodNameResolver getMethodNameResolver() {
        return this.methodNameResolver;
    }

    /**
     * Registers all handlers methods on the delegate
     * object.
     */
    private void registerHandlerMethods(Object delegate) {
        this.handlerMethodMap.clear();
        this.lastModifiedMethodMap.clear();
        this.exceptionHandlerMap.clear();

        // Look at all methods in the subclass, trying
        // to find
        // methods that are validators according to our
        // criteria
        Method[] methods = delegate.getClass().getMethods();
        for (int i = 0; i < methods.length; i++) {
            // We're looking for methods with given
            // parameters.
            Method method = methods[i];
            if (isExceptionHandlerMethod(method)) {
                registerExceptionHandlerMethod(method);
            } else if (isHandlerMethod(method)) {
                registerHandlerMethod(method);
                registerLastModifiedMethodIfExists(delegate, method);
            }
        }
    }

    /**
     * Is the supplied method a valid handler method?
     * <p>
     * Does not consider
     * <code>Controller.handleRequest</code> itself
     * as handler method (to avoid potential stack
     * overflow).
     */
    private boolean isHandlerMethod(Method method) {
        Class returnType = method.getReturnType();
        if (ModelAndView.class.equals(returnType)
            || Map.class.equals(returnType) || String.class.equals(returnType)
            || void.class.equals(returnType)) {
            Class[] parameterTypes = method.getParameterTypes();
            return (parameterTypes.length >= 2
                && HttpServletRequest.class.equals(parameterTypes[0])
                && HttpServletResponse.class.equals(parameterTypes[1]) && !("handleRequest"
                .equals(method.getName()) && parameterTypes.length == 2));
        }
        return false;
    }

    /**
     * Is the supplied method a valid exception handler
     * method?
     */
    private boolean isExceptionHandlerMethod(Method method) {
        return (isHandlerMethod(method)
            && method.getParameterTypes().length == 3 && Throwable.class
            .isAssignableFrom(method.getParameterTypes()[2]));
    }

    /**
     * Registers the supplied method as a request
     * handler.
     */
    private void registerHandlerMethod(Method method) {
        if (anyframeLogger.isDebugEnabled()) {
        	anyframeLogger.debug("Found action method [" + method + "]");
        }
        this.handlerMethodMap.put(method.getName(), method);
    }

    /**
     * Registers a last-modified handler method for the
     * supplied handler method if one exists.
     */
    private void registerLastModifiedMethodIfExists(Object delegate,
            Method method) {
        // Look for corresponding LastModified method.
        try {
            Method lastModifiedMethod =
                delegate.getClass().getMethod(
                    method.getName() + LAST_MODIFIED_METHOD_SUFFIX,
                    new Class[] {HttpServletRequest.class });
            Class returnType = lastModifiedMethod.getReturnType();
            if (!(long.class.equals(returnType) || Long.class
                .equals(returnType))) {
                throw new IllegalStateException(
                    "last-modified method ["
                        + lastModifiedMethod
                        + "] declares an invalid return type - needs to be 'long' or 'Long'");
            }
            // Put in cache, keyed by handler method
            // name.
            this.lastModifiedMethodMap
                .put(method.getName(), lastModifiedMethod);
            if (anyframeLogger.isDebugEnabled()) {
            	anyframeLogger.debug("Found last-modified method for handler method ["
                    + method + "]");
            }
        } catch (NoSuchMethodException ex) {
            // No last modified method. That's ok.
        }
    }

    /**
     * Registers the supplied method as an exception
     * handler.
     */
    private void registerExceptionHandlerMethod(Method method) {
        this.exceptionHandlerMap.put(method.getParameterTypes()[2], method);
        if (anyframeLogger.isDebugEnabled()) {
        	anyframeLogger.debug("Found exception handler method [" + method + "]");
        }
    }

    // ---------------------------------------------------------------------
    // Implementation of LastModified
    // ---------------------------------------------------------------------

    /**
     * Try to find an XXXXLastModified method, where
     * XXXX is the name of a handler. Return -1 if
     * there's no such handler, indicating that content
     * must be updated.
     * @see org.springframework.web.servlet.mvc.LastModified#getLastModified(HttpServletRequest)
     */
    public long getLastModified(HttpServletRequest request) {
        try {
            String handlerMethodName =
                this.methodNameResolver.getHandlerMethodName(request);
            Method lastModifiedMethod =
                (Method) this.lastModifiedMethodMap.get(handlerMethodName);
            if (lastModifiedMethod != null) {
                try {
                    // Invoke the last-modified
                    // method...
                    Long wrappedLong =
                        (Long) lastModifiedMethod.invoke(this.delegate,
                            new Object[] {request });
                    return (wrappedLong != null ? wrappedLong.longValue() : -1);
                } catch (Exception ex) {
                    // We encountered an error invoking
                    // the last-modified
                    // method.
                    // We can't do anything useful
                    // except log this, as we can't
                    // throw an exception.
                	anyframeLogger.error("Failed to invoke last-modified method", ex);
                }
            }
        } catch (NoSuchRequestHandlingMethodException ex) {
            // No handler method for this request. This
            // shouldn't happen, as
            // this
            // method shouldn't be called unless a
            // previous invocation of this
            // class
            // has generated content. Do nothing,
            // that's OK: We'll return
            // default.
        }
        return -1L;
    }

    // ---------------------------------------------------------------------
    // Implementation of AbstractController
    // ---------------------------------------------------------------------

    /**
     * Handle the case where no request handler method
     * was found.
     * <p>
     * The default implementation logs a warning and
     * sends an HTTP 404 error. Alternatively, a
     * fallback view could be chosen, or the
     * NoSuchRequestHandlingMethodException could be
     * rethrown as-is.
     * @param ex
     *        the NoSuchRequestHandlingMethodException
     *        to be handled
     * @param request
     *        current HTTP request
     * @param response
     *        current HTTP response
     * @return a ModelAndView to render, or
     *         <code>null</code> if handled directly
     * @throws Exception
     *         an Exception that should be thrown as
     *         result of the servlet request
     */
    protected ModelAndView handleNoSuchRequestHandlingMethod(
            NoSuchRequestHandlingMethodException ex,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        pageNotFoundLogger.warn(ex.getMessage());
        response.sendError(HttpServletResponse.SC_NOT_FOUND);
        return null;
    }

    /**
     * Invokes the named method.
     * <p>
     * Uses a custom exception handler if possible;
     * otherwise, throw an unchecked exception; wrap a
     * checked exception or Throwable.
     */
    protected final ModelAndView invokeNamedMethod(String methodName,
            HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        Method method = (Method) this.handlerMethodMap.get(methodName);
        if (method == null) {
            throw new NoSuchRequestHandlingMethodException(methodName,
                getClass());
        }

        try {
            Class[] paramTypes = method.getParameterTypes();
            List params = new ArrayList(4);
            params.add(request);
            params.add(response);

            if (paramTypes.length >= 3
                && paramTypes[2].equals(HttpSession.class)) {
                HttpSession session = request.getSession(false);
                if (session == null) {
                    throw new HttpSessionRequiredException(
                        "Pre-existing session required for handler method '"
                            + methodName + "'");
                }
                params.add(session);
            }

            // If last parameter isn't of HttpSession
            // type, it's a command.
            if (paramTypes.length >= 3
                && !paramTypes[paramTypes.length - 1].equals(HttpSession.class)) {
                Object command =
                    newCommandObject(paramTypes[paramTypes.length - 1]);
                params.add(command);
                bind(request, command);
            }

            Object returnValue =
                method.invoke(this.delegate, params.toArray(new Object[params
                    .size()]));
            return massageReturnValueIfNecessary(returnValue);
        } catch (InvocationTargetException ex) {
            // The handler method threw an exception.
            return handleException(request, response, ex.getTargetException());
        } catch (Exception ex) {
            // The binding process threw an exception.
            return handleException(request, response, ex);
        }
    }

    /**
     * Processes the return value of a handler method
     * to ensure that it either returns
     * <code>null</code> or an instance of
     * {@link ModelAndView}. When returning a
     * {@link Map}, the {@link Map} instance is
     * wrapped in a new {@link ModelAndView} instance.
     */
    private ModelAndView massageReturnValueIfNecessary(Object returnValue) {
        if (returnValue instanceof ModelAndView) {
            return (ModelAndView) returnValue;
        } else if (returnValue instanceof Map) {
            return new ModelAndView().addAllObjects((Map) returnValue);
        } else if (returnValue instanceof String) {
            return new ModelAndView((String) returnValue);
        } else {
            // Either returned null or was 'void'
            // return.
            // We'll assume that the handle method
            // already wrote the response.
            return null;
        }
    }

    /**
     * Create a new command object of the given class.
     * <p>
     * This implementation uses
     * <code>BeanUtils.instantiateClass</code>, so
     * commands need to have public no-arg
     * constructors. Subclasses can override this
     * implementation if desired.
     * @throws Exception
     *         if the command object could not be
     *         instantiated
     * @see org.springframework.beans.BeanUtils#instantiateClass(Class)
     */
    protected Object newCommandObject(Class clazz) throws Exception {
        if (anyframeLogger.isDebugEnabled()) {
        	anyframeLogger.debug("Creating new command of class [" + clazz.getName()
                + "]");
        }
        return BeanUtils.instantiateClass(clazz);
    }

    /**
     * Bind request parameters onto the given command
     * bean
     * @param request
     *        request from which parameters will be
     *        bound
     * @param command
     *        command object, that must be a JavaBean
     * @throws Exception
     *         in case of invalid state or arguments
     */
    protected void bind(HttpServletRequest request, Object command)
            throws Exception {
        if (anyframeLogger.isDebugEnabled()) {
        	anyframeLogger
                .debug("Binding request parameters onto MultiActionController command");
        }
        ServletRequestDataBinder binder = createBinder(request, command);
        binder.bind(request);
        binder.closeNoCatch();
    }

    /**
     * Determine the exception handler method for the
     * given exception.
     * <p>
     * Can return <code>null</code> if not found.
     * @return a handler for the given exception type,
     *         or <code>null</code>
     * @param exception
     *        the exception to handle
     */
    protected Method getExceptionHandler(Throwable exception) {
        Class exceptionClass = exception.getClass();
        if (anyframeLogger.isDebugEnabled()) {
        	anyframeLogger.debug("Trying to find handler for exception class ["
                + exceptionClass.getName() + "]");
        }
        Method handler = (Method) this.exceptionHandlerMap.get(exceptionClass);
        while (handler == null && !exceptionClass.equals(Throwable.class)) {
            if (anyframeLogger.isDebugEnabled()) {
            	anyframeLogger
                    .debug("Trying to find handler for exception superclass ["
                        + exceptionClass.getName() + "]");
            }
            exceptionClass = exceptionClass.getSuperclass();
            handler = (Method) this.exceptionHandlerMap.get(exceptionClass);
        }
        return handler;
    }

    /**
     * We've encountered an exception thrown from a
     * handler method. Invoke an appropriate exception
     * handler method, if any.
     * @param request
     *        current HTTP request
     * @param response
     *        current HTTP response
     * @param ex
     *        the exception that got thrown
     * @return a ModelAndView to render the response
     */
    private ModelAndView handleException(HttpServletRequest request,
            HttpServletResponse response, Throwable ex) throws Exception {

        Method handler = getExceptionHandler(ex);
        if (handler != null) {
            if (anyframeLogger.isDebugEnabled()) {
            	anyframeLogger.debug("Invoking exception handler [" + handler
                    + "] for exception: " + ex);
            }
            try {
                Object returnValue =
                    handler.invoke(this.delegate, new Object[] {request,
                        response, ex });
                return massageReturnValueIfNecessary(returnValue);
            } catch (InvocationTargetException ex2) {
            	anyframeLogger
                    .error(
                        "Original exception overridden by exception handling failure",
                        ex);
                ReflectionUtils.rethrowException(ex2.getTargetException());
            } catch (Exception ex2) {
            	anyframeLogger.error("Failed to invoke exception handler method", ex2);
            }
        } else {
            // If we get here, there was no custom
            // handler or we couldn't invoke
            // it.
            ReflectionUtils.rethrowException(ex);
        }
        throw new IllegalStateException("Should never get here");
    }

    /**
     * preventing duplicate form submission and then
     * show the message that key is
     * "common.msg.invalidtoken.error"
     */
    protected ModelAndView handleInvalidSubmit(HttpServletRequest request,
            HttpServletResponse response) throws Exception {
        throw new BaseException("Invalid form submission");
    }

    /**
     * Support binding of Date type.
     */
    protected void initBinder(HttpServletRequest request,
            ServletRequestDataBinder binder) throws Exception {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        CustomDateEditor dateEdit = new CustomDateEditor(df, false);
        binder.registerCustomEditor(Date.class, dateEdit);
    }

}
