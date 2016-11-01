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
package org.anyframe.xp.query.web;

import java.lang.reflect.Method;

import org.anyframe.exception.BaseException;
import org.anyframe.xp.query.web.controller.AbstractXPController;

import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;

/**
 * Controller class for operate given HttpPlatformRequest & HttpPlatformResponse
 * 
 * @author Youngmin Jo
 */
public class XPController extends AbstractXPController {
	
	public void operate(HttpPlatformRequest request, VariableList inVl,
			DataSetList inDl, VariableList outVl, DataSetList outDl)
			throws Exception {
		String serviceName = inVl.getString("service");
		
		Object bean = getWebApplicationContext().getBean(serviceName);
		
		Method method = getMethod(bean, inVl.getString("method"));
		
		try{
			method.invoke(bean, new Object[] {inVl, inDl, outVl, outDl });
		} catch (Exception e){
			Throwable te = e.getCause();
			logger.error(te);
			throw new BaseException("Fail to process client request.", te);
		}
	}
	
	private Method getMethod(Object bean, String methodName) throws Exception{
		
		Method[] methods = bean.getClass().getMethods();
		
		for(int i = 0 ; i < methods.length ; i++) {
			if( methods[i].getName().equals(methodName)) {
				return methods[i];
			}
		}
		throw new Exception("Cann't find " + methodName + ".");
	}
	
	
}
