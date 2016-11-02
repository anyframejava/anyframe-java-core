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
package org.anyframe.struts.action.mip;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.MessageResources;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;
/**
 * 
 * <p>Abstract Dispatch Action Class which provide token, exception, error logging, pre/post execution features</p>
 * 
 * @author Byunghun Woo
 * 
 */
public class AbstractMiPDispatchAction extends AbstractMiPAction{
	/**
     * The Class instance of this <code>DispatchAction</code> class.
     */
	@SuppressWarnings("unchecked")
	protected Class clazz = this.getClass();
	 
	/**
     * The message resources for this package.
     */
    protected static MessageResources messages = MessageResources
    		.getMessageResources("org.apache.struts.actions.LocalStrings");

    public Logger logger;
     
    /**
     * get Logger
     */
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
     * The set of Method objects we have introspected for this class, keyed by
     * method name. This collection is populated as different methods are
     * called, so that introspection needs to occur only once per method name.
     */
    @SuppressWarnings("unchecked")
	protected Class[] types = { ActionMapping.class, PlatformRequest.class, VariableList.class,
    		DatasetList.class, VariableList.class,DatasetList.class };    
    
    /**
     * Process the specified HTTP request, and create the corresponding HTTP
     * response (or forward to another web component that will create it).
     * Return an <code>ActionForward</code> instance describing where and how
     * control should be forwarded, or <code>null</code> if the response has
     * already been completed.
     * 
     * @param mapping
     *            The ActionMapping used to select this instance
     * @param request
     *            The Platform request we are processing
     * @param inVl
     *            a input VariableList
     * @param inDl
     * 			  a input Dataset
     * @param outVl
     * 			  a output VariableList
     * @param outDl
     * 			  a output Dataset
     * @exception Exception
     *                if an exception occurs
     */
    public void process(ActionMapping mapping, PlatformRequest request, VariableList inVl, DatasetList inDl, VariableList outVl, DatasetList outDl) throws Exception {
        String parameter = mapping.getParameter();
        if (parameter == null) {
            String message = messages.getMessage("dispatch.handler", mapping
                    .getPath());
            getLogger().error(message);
            throw new ServletException(message);
        }

        String name = getMethodName(mapping, inVl, parameter);

        if ("execute".equals(name) || "perform".equals(name) || "process".equals(name)) {
            String message = messages.getMessage("dispatch.recursive", mapping
                    .getPath());
            getLogger().error(message);
            throw new ServletException(message);
        }
        dispatchMethod(mapping, request, name, inVl, inDl, outVl, outDl);
	}
    
    /**
     * Returns the method name, given a parameter's value.
     * 
     * @param mapping
     * 		The ActionMapping used to select this instance
     * @param inVl
     * 			a input VariableList
     * @param parameter
     * @return method name
     * @throws Exception
     */
    protected String getMethodName(ActionMapping mapping, 
    		VariableList inVl, 
            String parameter) throws Exception {
        return inVl.getValueAsString(parameter);
    }	
    
    /**
     * Dispatch to the specified method.
     * 
     * @since Struts 1.1
     */
    protected void dispatchMethod(ActionMapping mapping,
            PlatformRequest request,
            String name, VariableList inVl, DatasetList inDl, VariableList outVl, DatasetList outDl) throws Exception {

        if (name == null) {
            unspecified(mapping, request);
            return;
        }

        // Identify the method object to be dispatched to
        Method method = null;
        try {
            method = getMethod(name);

        } catch (NoSuchMethodException e) {
            String message = messages.getMessage("dispatch.method", mapping
                    .getPath(), name);
            getLogger().error(message, e);
            throw e;
        }

        try {
            Object args[] = { mapping, request, inVl, inDl, outVl, outDl};
            method.invoke(this, args);

        } catch (IllegalAccessException e) {
            String message = messages.getMessage("dispatch.error", mapping
                    .getPath(), name);
            getLogger().error(message, e);
            throw e;

        } catch (InvocationTargetException e) {
            Throwable t = e.getTargetException();
            if (t instanceof Exception) {
                throw ((Exception) t);
            } else {
                String message = messages.getMessage("dispatch.error", mapping
                        .getPath(), name);
                getLogger().error(message, t);
                throw new ServletException(t);
            }
        }
    }
    
    /**
     * Method which is dispatched to when there is no value for specified
     * request parameter included in the request. Subclasses of
     * <code>DispatchAction</code> should override this method if they wish to
     * provide default behavior different than throwing a ServletException.
     */
    protected ActionForward unspecified(ActionMapping mapping, PlatformRequest request)
            throws Exception {

        String message = messages.getMessage("dispatch.parameter", mapping
                .getPath(), mapping.getParameter());
        getLogger().error(message);
        throw new ServletException(message);
    }

    /**
     * Introspect the current class to identify a method of the specified name
     * that accepts the same parameter types as the <code>execute</code>
     * method does.
     * 
     * @param name
     *            Name of the method to be introspected
     * 
     * @exception NoSuchMethodException
     *                if no such method can be found
     */
    @SuppressWarnings("unchecked")
	protected Method getMethod(String name) throws NoSuchMethodException {
        synchronized (methods) {
            Method method = (Method) methods.get(name);
            if (method == null) {
                method = clazz.getMethod(name, types);
                methods.put(name, method);
            }
            return method;
        }
    }
    
    /**
     * get Logger
     */
	public Logger getLogger() {
		return LoggerFactory.getLogger(this.getClass().getName());
	}

	public ActionForward process(ActionMapping arg0, ActionForm arg1,
			HttpServletRequest arg2, HttpServletResponse arg3) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
