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
