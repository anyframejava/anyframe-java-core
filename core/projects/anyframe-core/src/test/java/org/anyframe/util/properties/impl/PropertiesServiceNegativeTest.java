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
package org.anyframe.util.properties.impl;

import org.springframework.beans.factory.BeanCreationException;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

import junit.framework.TestCase;

/**
 * For testing functions what Properties Service supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class PropertiesServiceNegativeTest extends TestCase {
	private ConfigurableApplicationContext context = null;

	/**
	 * [Flow #-1] Negative Case : try to initialize PropertiesService with wrong
	 * configuration (empty key).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testEmptyKey() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/context-negative-properties-emptykey.xml",
					"classpath*:/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e.getMessage().indexOf(
					"key is essential attribute in a <element>") != -1);
		}
	}

	/**
	 * [Flow #-2] Negative Case : try to initialize PropertiesService with wrong
	 * configuration (not exist properties file).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testNotExistPropertiesFile() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/context-negative-properties-notexistfile.xml",
					"classpath*:/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e.getMessage().indexOf(
					"Fail to initialize a Properties Service") != -1);
		}
	}
}
