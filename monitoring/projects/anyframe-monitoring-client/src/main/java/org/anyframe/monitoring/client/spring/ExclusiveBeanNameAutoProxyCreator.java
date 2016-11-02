/*
 * Copyright 2002-2008 the original author or authors.
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
package org.anyframe.monitoring.client.spring;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.aop.TargetSource;
import org.springframework.aop.framework.autoproxy.BeanNameAutoProxyCreator;
import org.springframework.beans.factory.InitializingBean;

/**
 * Automatical proxy creator class to identify beans to proxy using the bean name list. Checks
 * for direct, "test*", and "*test" matches.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class ExclusiveBeanNameAutoProxyCreator extends BeanNameAutoProxyCreator
		implements InitializingBean {

	private static final long serialVersionUID = 1L;
	
	private List<String> exclusiveBeanNames = new ArrayList<String>();
	private boolean isBeanNames = false;

	/**
	 * {@inheritDoc}
	 */
	public void setBeanNames(String[] beanNames) {
		if (beanNames.length > 0) isBeanNames = true;
		super.setBeanNames(beanNames);
	}
	
	@SuppressWarnings("unchecked")
	public Object[] getAdvicesAndAdvisorsForBean(Class beanClass,
			String beanName, TargetSource targetSource) {

		if (exclusiveBeanNames != null
				&& (exclusiveBeanNames.contains(beanName)))
			return DO_NOT_PROXY;

		if (exclusiveBeanNames != null) {
			Iterator<String> itr = exclusiveBeanNames.iterator();
			while (itr.hasNext()) {
				String mappedName = itr.next();
				if (isMatch(beanName, mappedName))
					return DO_NOT_PROXY;
			}
		}
		return super.getAdvicesAndAdvisorsForBean(beanClass, beanName,
				targetSource);
	}
	
	/**
	 * Set the names of the exclusive beans
	 * @param beanNames exclusive bean names
	 */
	public void setExclusiveBeanNames(String[] beanNames) {
		for (int i = 0; i < beanNames.length; i++) exclusiveBeanNames.add(beanNames[i]);			
	}
	
	/**
	 * {@inheritDoc}
	 */
	public void afterPropertiesSet() throws Exception {
		if (!isBeanNames)
			super.setBeanNames(new String[] { "*" });
	}	

}
