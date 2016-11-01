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
package org.anyframe.idgen.impl;

import junit.framework.TestCase;

import org.springframework.beans.factory.BeanCreationException;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * For testing functions what UUIDGeneration Service supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class UUIdGenServiceNegativeTest extends TestCase {
	private ConfigurableApplicationContext context = null;

	/**
	 * [Flow #-1] Negative Case : try to initialize UUIdGenerationService with
	 * wrong configuration (wrong ip).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testWrongIp() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/spring/context-uuid-negative-wrongip1.xml",
					"classpath*:/spring/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e
					.getMessage()
					.indexOf(
							"address in the configuration should be a valid IP or MAC Address") != -1);
		}
	}

	/**
	 * [Flow #-2] Negative Case : try to initialize UUIdGenerationService with
	 * wrong configuration (ip doesn't consist of integer).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testWrongIpWithNotInteger() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/spring/context-uuid-negative-wrongip2.xml",
					"classpath*:/spring/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e
					.getMessage()
					.indexOf(
							"address in the configuration should be a valid IP or MAC Address") != -1);
		}
	}

	/**
	 * [Flow #-3] Negative Case : try to initialize UUIdGenerationService with
	 * wrong configuration (wrong address).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testWrongAddress() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/spring/context-uuid-negative-wrongaddress1.xml",
					"classpath*:/spring/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e
					.getMessage()
					.indexOf(
							"address in the configuration should be a valid IP or MAC Address") != -1);
		}
	}

	/**
	 * [Flow #-4] Negative Case : try to initialize UUIdGenerationService with
	 * wrong configuration (address doesn't consist of integer).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testWrongAddressWithNotInteger() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/spring/context-uuid-negative-wrongaddress2.xml",
					"classpath*:/spring/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e
					.getMessage()
					.indexOf(
							"address in the configuration should be a valid IP or MAC Address") != -1);
		}
	}

	/**
	 * [Flow #-5] Negative Case : try to initialize UUIdGenerationService with
	 * wrong configuration (not supported format).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testWrongAddressWithNotSupportedFormat() throws Exception {
		try {
			String[] confFiles = new String[] {
					"classpath*:/spring/context-uuid-negative-notsupportedformat.xml",
					"classpath*:/spring/context-common.xml" };
			context = new FileSystemXmlApplicationContext(confFiles, false);
			context.refresh();
		} catch (Exception e) {
			assertTrue(e instanceof BeanCreationException);
			assertTrue(e
					.getMessage()
					.indexOf(
							"address in the configuration should be a valid IP or MAC Address") != -1);
		}
	}
}
