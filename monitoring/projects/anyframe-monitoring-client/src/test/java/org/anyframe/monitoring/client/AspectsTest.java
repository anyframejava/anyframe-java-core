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

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import junit.framework.TestCase;

import net.sf.infrared.agent.MonitorConfig;
import net.sf.infrared.agent.MonitorConfigImpl;
import net.sf.infrared.agent.MonitorFacade;
import net.sf.infrared.agent.MonitorFacadeImpl;
import net.sf.infrared.agent.MultipleEntryGuard;
import net.sf.infrared.aspects.jdbc.p6spy.InfraREDP6Connection;

import org.anyframe.monitoring.client.aspect.ApiAspect;
import org.anyframe.monitoring.client.aspect.JdbcAspect;
import org.easymock.MockControl;
import org.springframework.aop.framework.ProxyFactory;


/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class AspectsTest extends TestCase {
	MonitorConfig defaultConfig = null;
	MonitorFacade defaultFacade = null;

	public void setUp() {
		MonitorConfig defaultConfig = new MonitorConfigImpl(
				"infrared-agent.properties");

		MonitorFacade facade = new MonitorFacadeImpl("AspectsTestCase",
				"localhost", defaultConfig, false);
		defaultFacade = new MultipleEntryGuard(facade);
	}

	public void testAspects() throws Exception {
		MockControl mockDataSource = MockControl
				.createControl(DataSource.class);
		MockControl mockConnection = MockControl
				.createControl(Connection.class);
		DataSource dataSource = (DataSource) mockDataSource.getMock();
		Connection returnConnection = (Connection) mockConnection.getMock();
		ProxyFactory proxyFactory = new ProxyFactory();
		proxyFactory.setInterfaces(new Class[] { DataSource.class });
		ApiAspect api = new ApiAspect();
		api.setMonitorFacade(defaultFacade);
		api.setLayerName("testCase");
		JdbcAspect jdbc = new JdbcAspect();
		jdbc.setMonitorFacade(defaultFacade);
		api.setLayerName("testCase");
		proxyFactory.addAdvice(api);
		proxyFactory.addAdvice(jdbc);
		proxyFactory.setTarget(dataSource);

		dataSource.getConnection();
		mockDataSource.setReturnValue(returnConnection);
		dataSource.getConnection();
		mockDataSource.setThrowable(new SQLException());
		mockDataSource.replay();

		DataSource proxyDataSource = (DataSource) proxyFactory.getProxy();

		Connection con = proxyDataSource.getConnection();

		assertTrue(con instanceof InfraREDP6Connection);

		try {
			proxyDataSource.getConnection();
			fail();
		} catch (SQLException e) {
		}
	}
}
