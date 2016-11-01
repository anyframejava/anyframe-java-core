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
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

import org.anyframe.util.TypeUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.util.ClassUtils;

/**
 * BeanMethodRepository
 * 
 * @author Changje Kim
 * 
 */
public class BeanMethodRepository implements ApplicationContextAware, InitializingBean {
	private static final Logger LOGGER = LoggerFactory.getLogger(BeanMethodRepository.class);

	private ConcurrentCache<String, BeanMethodInfo> beansMethodMap;
	private ApplicationContext context;

	private int cacheSize = 15000;

	public void setCacheSize(int size) {
		this.cacheSize = size;
	}

	public BeanMethodInfo findBeanMethod(String beanName, String beanMethod) {
		BeanMethodInfo result = beansMethodMap.get(beanMethod);
		if (result != null)
			return result;

		Object bean = this.context.getBean(beanName);
		createBeanMethodMap(beanName, bean);
		return getBeanMethod(beanMethod);
	}

	private BeanMethodInfo getBeanMethod(String beanMethod) {
		BeanMethodInfo result = beansMethodMap.get(beanMethod);
		if (result != null)
			return result;
		return null;
	}

	public void createBeanMethodMap(String beanName, Object bean) {
		Class<?>[] beanInterfaces = ClassUtils.getAllInterfaces(bean);
		for (int i = 0; i < beanInterfaces.length; i++) {
			createInterfaceMathodMap(beanName, bean, beanInterfaces[i]);
		}
	}

	public void createInterfaceMathodMap(String beanName, Object bean, Class<?> interfaceClass) {

		Method[] methods = interfaceClass.getDeclaredMethods();

		for (int i = 0; i < methods.length; i++) {
			// System.out.println("\n######method Name == " +
			// methods[i].getName());
			Type outParam = methods[i].getGenericReturnType();
			// System.out.println("\n######i == " + i +"\n outParam == " +
			// outParam);
			Type[] inParam = methods[i].getGenericParameterTypes();
			// System.out.println("\n######i == " + i +"\n inParam == " +
			// inParam);
			BeanMethodInfo beanMethodInfo = new BeanMethodInfo();

			beanMethodInfo.setMethod(methods[i]);
			beanMethodInfo.setBean(bean);
			Class<?>[] out = findParamClass(bean.getClass(), outParam, interfaceClass, methods[i], "output");
			beanMethodInfo.setOutputParam(out);

			if (inParam.length > 0) {
				for (int j = 0; j < inParam.length; j++) {
					Class<?>[] in = findParamClass(bean.getClass(), inParam[j], interfaceClass, methods[i], "input");
					beanMethodInfo.addInputParam(in);
				}
			}

			if (beansMethodMap.get(beanName + "." + methods[i].getName()) == null) {
				beansMethodMap.put(beanName + "." + methods[i].getName(), beanMethodInfo);
				LOGGER.debug("Resolve method name ='" + beanName + "." + methods[i].getName() + "'");
			}
		}

	}

	private Class<?>[] findParamClass(Type enclosingType, Type type, Class<?> interfaceClass, Method method, String paramType) {
		Class<?>[] paramClass = new Class<?>[2];

		try {
			paramClass[0] = ((Class<?>) TypeUtil.getRawType(enclosingType, type));
			if (type instanceof ParameterizedType) {
				Type args = ((ParameterizedType) type).getActualTypeArguments()[0];

				paramClass[1] = (Class<?>) TypeUtil.getRawType(enclosingType, args);
			}
		} catch (Exception e) {
			LoggerFactory.getLogger(this.getClass()).warn(
					"Fail to find " + paramType + " parameter class type from method = [" + interfaceClass.getCanonicalName() + "." + method.getName()
							+ "], parameter type = [" + type + "]");
		}
		return paramClass;
	}

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.context = applicationContext;
	}

	public void afterPropertiesSet() throws Exception {
		this.beansMethodMap = new ConcurrentCache<String, BeanMethodInfo>(this.cacheSize);
	}

}