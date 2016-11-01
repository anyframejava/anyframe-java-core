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
package org.anyframe.mip.query.web.controller;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

public class AbstractMiPDispatchController extends AbstractMiPController {

	/**
	 * The set of Method objects we have intrespected for this class, keyed by
	 * method name. This collection is populated as different methods are
	 * called, so that introspection needs to occur only once per method name.
	 */
	protected Map<String, Method> methods = new HashMap<String, Method>();

	/**
	 * The Class instance of this <code>AnyframeMiPDispatchConroller</code>
	 * class.
	 */
	protected Class<?> clazz = this.getClass();

	/**
	 * The set of Method objects we have introspected for this class, keyed by
	 * method name. This collection is populated as different methods are
	 * called, so that introspection needs to occur only once per method name.
	 */
	protected Class<?>[] types = { PlatformRequest.class, VariableList.class,
			DatasetList.class, VariableList.class, DatasetList.class };

	/**
	 * This is a method for executing the dispatch method. We execute the
	 * appropriate method by obtaining the value of the method attribute of
	 * VariableList. If the mthod's value is null, operator or process, then an
	 * exception occurs, and method's value exists, however, if the in the
	 * class, the method is not implemented, the exception occurs.
	 * 
	 * @param platformRequest
	 *            The Platform request we are processing
	 * @param inVl
	 *            a input VariableList
	 * @param inDl
	 *            a input Dataset
	 * @param outVl
	 *            a output VariableList
	 * @param outDl
	 *            a output Dataset
	 * @exception Exception
	 *                if an exception occurs
	 */
	public void operate(PlatformRequest platformRequest, VariableList inVl,
			DatasetList inDl, VariableList outVl, DatasetList outDl)
			throws Exception {
		try {
			String name = getMethodName(inVl, "method");

			if ("operate".equals(name) || "process".equals(name)) {
				logger
						.error(
								"Can not use a method name such as 'operate' or 'process'.");
				throw new ServletException(
						"Can not use a method name such as 'operate' or 'process'.");
			}
			dispatchMethod(platformRequest, name, inVl, inDl, outVl, outDl);
		} catch (Exception e) {
			logger.error("Can not excute dispatch method." , e.getCause());
			throw new Exception("Fail to process client request.", e.getCause());
		}
	}

	protected String getMethodName(VariableList in_vl, String parameter)
			throws Exception {
		return in_vl.getValueAsString(parameter);
	}

	/**
	 * Returns the method name, given a parameter's value.
	 * 
	 * @param request
	 *            The Platform request we are processing
	 * @param name
	 * 			 a name of method
	 * @param inVl
	 *            a input VariableList
	 * @param inDl
	 *            a input Dataset
	 * @param outVl
	 *            a output VariableList
	 * @param outDl
	 *            a output Dataset
	 * @throws Exception
	 */
	protected void dispatchMethod(PlatformRequest request, String name,
			VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {

		if (name == null) {
			logger.error("Can not find a dispatch method name");
			throw new ServletException("Can not find a dispatch method name");
		}

		// Identify the method object to be dispatched to
		Method method = null;
		try {
			method = getMethod(name);
		} catch (NoSuchMethodException e) {
			logger.error("Can not find a dispatch method name", e);
			throw e;
		}
		try {
			Object args[] = { request, inVl, inDl, outVl, outDl };
			method.invoke(this, args);

		} catch (IllegalAccessException e) {
			logger.error("Can not access a dispatch method name",e);
			throw e;

		} catch (InvocationTargetException e) {
			Throwable t = e.getTargetException();
			if (t instanceof Exception) {
				throw ((Exception) t);
			} else {
				logger.error("Can not invoke a dispatch method name", t);
				throw new ServletException(t);
			}
		}
	}

	/**
	 * Introspect the current class to identify a method of the specified name
	 * that accepts the same parameter types as the <code>execute</code> method
	 * does.
	 * 
	 * @param name
	 *            Name of the method to be introspected
	 * @throws Exception
	 */
	protected Method getMethod(String name) throws Exception {
		synchronized (methods) {
			try {
				Method method = (Method) methods.get(name);
				if (method == null) {
					method = clazz.getMethod(name, types);
					methods.put(name, method);
				}
				return method;
			} catch (Exception e) {
				logger.error("Can not excute dispatch method");
				throw new ServletException("Can not excute dispatch method");
			}
		}
	}
}
