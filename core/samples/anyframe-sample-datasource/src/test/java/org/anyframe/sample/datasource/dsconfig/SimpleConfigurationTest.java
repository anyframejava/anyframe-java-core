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
package org.anyframe.sample.datasource.dsconfig;

import static org.junit.Assert.assertEquals;

import org.anyframe.sample.datasource.some.JdbcSomeDAO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Unit testcase for each datasource
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(JUnit4.class)
public class SimpleConfigurationTest {

	ApplicationContext context;

	@Test
	public void test_c3p0() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"classpath:spring/context-datasource-c3p0-unit.xml");

		JdbcSomeDAO sfBean = (JdbcSomeDAO) context.getBean("someDAO");

		assertEquals(sfBean.getJdbcTemplate().getDataSource().getClass()
				.getName(), "com.mchange.v2.c3p0.ComboPooledDataSource");

	}

	@Test
	public void test_dbcp() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"classpath:spring/context-datasource-dbcp-unit.xml");

		JdbcSomeDAO sfBean = (JdbcSomeDAO) context.getBean("someDAO");

		assertEquals(sfBean.getJdbcTemplate().getDataSource().getClass()
				.getName(), "org.apache.commons.dbcp.BasicDataSource");

	}

	@Test
	public void test_jdbc() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"classpath:spring/context-datasource-jdbc-unit.xml");

		JdbcSomeDAO sfBean = (JdbcSomeDAO) context.getBean("someDAO");

		assertEquals(sfBean.getJdbcTemplate().getDataSource().getClass()
				.getName(),
				"org.springframework.jdbc.datasource.DriverManagerDataSource");

	}

	@Test
	public void test_jndi() throws Exception {
		context = new ClassPathXmlApplicationContext(
				"classpath:spring/context-datasource-jndi-unit.xml");

		// JdbcSomeDAO sfBean = (JdbcSomeDAO) context.getBean("someDAO");
		//
		// assertEquals(sfBean.getJdbcTemplate().getDataSource().getClass()
		// .getName(),
		// "org.springframework.jdbc.datasource.DriverManagerDataSource");

	}

}
