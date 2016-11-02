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
package org.anyframe.simpleweb.beans.support;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author Changje Kim
 * 
 */
public class BeanMethodInfo {
	private String beanId;
	private Object bean;
	private List<Class<?>[]> inputParam = new ArrayList<Class<?>[]>();
	private Class<?>[] outputParam;
	private Method method;

	public Object getBean() {
		return bean;
	}

	public void setBean(Object bean) {
		this.bean = bean;
	}

	public String getBeanId() {
		return beanId;
	}

	public void setBeanId(String beanId) {
		this.beanId = beanId;
	}

	public Class<?>[] getInputParam() {
		if (inputParam.size() == 0)
			return null;
		return inputParam.get(0);
	}

	public Class<?>[] getInputParam(int i) {
		return inputParam.get(i);
	}

	public void addInputParam(Class<?>[] inputParam) {
		this.inputParam.add(inputParam);
	}

	public Class<?>[] getOutputParam() {
		return outputParam;
	}

	public void setOutputParam(Class<?>[] outputParam) {
		this.outputParam = outputParam;
	}

	public Method getMethod() {
		return method;
	}

	public void setMethod(Method method) {
		this.method = method;
	}

	public String getOutParamName() {
		String result = "result";

		if (outputParam[0].getPackage() == null
				|| outputParam[0].getPackage().getName().equals("java.lang")
				|| outputParam[0].isPrimitive()) {
			result = "result";
		} else {
			result = outputParam[0].getSimpleName();
			result = result.substring(0, 1).toLowerCase() + result.substring(1);
			if (result.equals("map") || result.equals("list")
					|| result.equals("arrayList"))
				result = "result";
		}

		return result;
	}

	public String getInputParamName() {
		return getInputParamName(0);

	}

	public String getInputParamName(int i) {
		String result = "result";

		if (inputParam.get(i)[0].getPackage() == null
				|| inputParam.get(i)[0].getPackage().getName().equals(
						"java.lang") || inputParam.get(i)[0].isPrimitive()) {
			result = "result";
		} else {
			result = inputParam.get(i)[0].getSimpleName();
			result = result.substring(0, 1).toLowerCase() + result.substring(1);			
			if (result.equals("map") || result.equals("list")
					&& result.equals("arrayList"))
				result = "result";
		}

		return result;
	}
}
