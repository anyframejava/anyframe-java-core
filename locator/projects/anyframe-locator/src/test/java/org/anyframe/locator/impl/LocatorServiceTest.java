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
package org.anyframe.locator.impl;

import javax.naming.Context;
import javax.sql.DataSource;
import javax.transaction.UserTransaction;

import org.anyframe.locator.LocatorService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
//TODO : set JVM arguments. 
//-Djavax.xml.parsers.DocumentBuilderFactory=com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl -Djavax.xml.parsers.SAXParserFactory=com.sun.org.apache.xerces.internal.jaxp.SAXParserFactoryImpl
public class LocatorServiceTest extends
		AbstractDependencyInjectionSpringContextTests {
	private LocatorService m_service;

	/**
	 * overrided
	 * 
	 * @return String[]
	 */
	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/context-*.xml" };
	}

	/**
	 * initialize TestCase
	 * 
	 * @throws Exception
	 *             fail to initialize
	 */
	public void onSetUp() throws Exception {
		m_service = (LocatorService) applicationContext
				.getBean("serviceLocator");
	}

	public void testNamingService() throws Exception {
		Context context = m_service.getContext("default");
		try {
			assertNotNull(
					"Get default context information in configuration file.",
					context);
		} catch (Error e) {
			fail("Could not find running application server");
		}
	}

	public void testDataSourceLookup() throws Exception {
		DataSource ds1 = (DataSource) m_service.lookup("AnyframeDS");
		assertNotNull(ds1);
		ds1.getConnection().close();

		DataSource ds2 = (DataSource) m_service.getDataSource("AnyframeDS",
				"default");
		assertNotNull(ds2);
		ds2.getConnection().close();
	}

	public void testUserTransaction() throws Exception {
		UserTransaction utx = m_service.getUserTransaction();
		utx.begin();
		utx.commit();

		try {
			assertNotNull("Get user transaction through default context", utx);
		} catch (Error e) {
			fail("Could not find running application server");
		}

		utx = m_service.getUserTransaction("default");
		assertNotNull("Get user transaction through default context", utx);
	}

	public void testLookup() throws Exception {
		DataSource ds = (DataSource) m_service.lookup("AnyframeDS", "default");
		assertNotNull(ds);
	}

	public void testGetEJBHome() throws Exception {
//		Object traderHome = m_service
//				.getEJBHome("ejb20-statefulSession-TraderHome");
//		assertNotNull(traderHome);
//
//		traderHome = m_service.getEJBHome("ejb20-statefulSession-TraderHome",
//				"default");
//		assertNotNull(traderHome);
//
//		traderHome = m_service.getEJBHome("ejb20-statefulSession-TraderHome",
//				TraderHome.class, "default");
//		assertNotNull(traderHome);
//
//		traderHome = m_service.getEJBHome("ejb20-statefulSession-TraderHome",
//				TraderHome.class);
//		assertNotNull(traderHome);
	}
}
