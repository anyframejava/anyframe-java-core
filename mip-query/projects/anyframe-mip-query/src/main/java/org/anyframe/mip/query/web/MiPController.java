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
package org.anyframe.mip.query.web;

import java.lang.reflect.Method;

import org.anyframe.exception.MethodInvocationException;
import org.anyframe.mip.query.web.controller.AbstractMiPController;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;
/**
 * This Class is a common controller class in developing the
 * presentation layer using MiPlatform which is the X-Internet solution of the
 * TOBE Software company.
 * @author Jonghoon, Kim
 *
 */
public class MiPController extends AbstractMiPController {
	
	/**
	 * This method is implementation in AnyframeMiPController. 
	 * this method lookup spring framework bean and invoke bean's method
	 * @param platformRequest
	 * 		PlatformRequest which HttpServletRequest changed is including
	 * 		information of MiPlatform UI.
	 * @param inVl
	 * 		VariableList including the query id or query condition etc.
	 * @param inDl
	 * 		The Dataset list including query conditions
	 * @param outVl
	 * 		Output VaiableList including return values. 
	 * @param outDl
	 * 		Output DatasetList including return values.
	 * @throws Exception
	 *		if there is any problem executing.
	 */
	public void operate(PlatformRequest platformRequest, VariableList inVl,
			DatasetList inDl, VariableList outVl, DatasetList outDl)
			throws Exception {

		String serviceName = inVl.getValueAsString("service");
		
		Object bean = getWebApplicationContext().getBean(serviceName);

		Method method = getMethod(bean,inVl.getValueAsString("method"));
		
  		try {
			method.invoke(bean, new Object[] { inVl, inDl, outVl, outDl });
		} catch (Exception e) {
			Throwable te = e.getCause();
			logger.error("Can not invoke a dispatch method name", te);
			throw new Exception("Fail to process client request.", te);
		}
	}

	private Method getMethod(Object bean, String methodName) {
		Method[] methods = bean.getClass().getMethods();
		
		for (int i = 0; i < methods.length; i++) {
			if (methods[i].getName().equals(methodName)) {
				return methods[i];
			}
		}
		throw new MethodInvocationException("Can not find " + methodName + ".");
	}
}
