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
package org.anyframe.monitoring.client;

import java.io.IOException;

import junit.framework.TestCase;

import org.anyframe.monitoring.client.sample.IUser;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;


/**
 * For testing functions what ExclusiveBeanNameAutoProxyCreator supports, there
 * are some test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class ExclusiveBeanNameAutoProxyCreatorTest extends TestCase {
	private BeanFactory beanFactory;

	protected void setUp() throws IOException {
		ClassLoader cl = Thread.currentThread().getContextClassLoader();
		Thread.currentThread().setContextClassLoader(
				ClassPathXmlApplicationContext.class.getClassLoader());
		this.beanFactory = new ClassPathXmlApplicationContext(
				"/spring/anyframe-autoproxycreator.xml", getClass());
		Thread.currentThread().setContextClassLoader(cl);
	}

	public void testUserWithInterceptor() {
		IUser user = (IUser) beanFactory.getBean("userWithInterceptor");
		StringConcatenation stringConcatenation = (StringConcatenation) beanFactory
				.getBean("stringConcatenation");
		
		assertEquals("", stringConcatenation.getMsg());
		
		String userId = user.getUserId();
		assertEquals("userWithInterceptor", userId);
		assertEquals("Hello! userWithInterceptor", stringConcatenation.getMsg());
	}

	public void testUserWithoutInterceptor() {
		IUser user = (IUser) beanFactory.getBean("userWithoutInterceptor");
		StringConcatenation stringConcatenation = (StringConcatenation) beanFactory
				.getBean("stringConcatenation");
		
		assertEquals("", stringConcatenation.getMsg());
		
		String userId = user.getUserId();
		assertEquals("userWithoutInterceptor", userId);
		assertEquals("", stringConcatenation.getMsg());
	}	
}
