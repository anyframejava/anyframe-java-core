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
package org.anyframe.sample.transaction;

import junit.framework.TestCase;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * This class is test case for xml configuration.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class SimpleConfigurationTest extends TestCase {

	ApplicationContext context;

	protected void setUp() throws Exception {
		super.setUp();
	}

	protected void tearDown() throws Exception {
		super.tearDown();

	}

	public void test_dbcp() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"spring/unit/context-tx-dbcp.xml");

	}

	public void _test_jndi() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"spring/unit/context-tx-jndi.xml");
	}

	public void test_tx_advice() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"spring/unit/context-tx-advice.xml");
	}

}
