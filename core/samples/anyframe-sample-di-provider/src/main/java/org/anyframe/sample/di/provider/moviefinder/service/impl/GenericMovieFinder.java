/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.sample.di.provider.moviefinder.service.impl;

import java.lang.reflect.ParameterizedType;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;

/**
 * This GenericMovieFinder class is a Provider implementation class to get movie
 * information.
 * 
 * @author Sooyeon Park
 */
@Named
public class GenericMovieFinder<T> implements Provider<T> {

	@Inject
	private BeanFactory beanFactory;

	@PostConstruct
	public void initialize() throws Exception {
		if (!(this.beanFactory instanceof ListableBeanFactory)) {
			throw new IllegalArgumentException(
					"beanFactory must be a ListableBeanFactory");
		}
	}

	@SuppressWarnings("unchecked")
	public T get() {
		Class<T> type = (Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];
		ListableBeanFactory listableBeanFactory = (ListableBeanFactory) this.beanFactory;
		Map beans = listableBeanFactory.getBeansOfType(type);

		if (beans.values().size() != 1) {
			throw new NoSuchBeanDefinitionException(
					type.getName(),
					"Can't find no unique bean of type ["
							+ type.getName()
							+ "] is defined: expected single matching bean but found "
							+ beans.values().size() + ": "
							+ beans.keySet().toString());
		}

		return (T) beans.values().iterator().next();
	}
}
