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
package org.anyframe.query.impl;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.exception.QueryException;
import org.anyframe.query.impl.jdbc.OraclePagingJdbcTemplate;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * TestCase Name : QueryNamespaceTest <br>
 * <br>
 * [Description] : It is verified whether QueryService Property definition by
 * using query namespace is properly recognized. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : When it is defined in the way of <query:auto-config
 * dbType="..."/>, it is verified whether QueryService Property definition is
 * properly recognized.</li>
 * <li>#-2 Positive Case : When sqlLoader Bean’s property is defined as
 * reference relationship which is separately defined such as
 * sqlLoader-ref="..."/>, it is verified whether QueryService Property
 * definition is properly recognized by using sqlLoader Bean.</li>
 * <li>#-3 Positive Case : When sqlLoader Bean’s property is defined as
 * reference relationship which is separately defined such as
 * sqlLoader-ref="..."/>, it is verified whether QueryService Property
 * definition is properly recognized by using sqlLoader Bean.</li>
 * <li>#-4 Positive Case : It is defined in the format of <query:auto-config
 * dbType="..." dataSource-ref="..."/> and dataSource Bean property is defined
 * as reference relation, it is verified whether QueryService property
 * information is properly recognized by using datsSource Bean property
 * information.</li>
 * <li>#-5 Negative Case : When it is defined in the format of
 * <query:auto-config dbType="xxx"/>, in the case where the entered number is
 * different from DBMS type for use, it is verified whether pagingSQLGenerator
 * and lobHandler are wrongly set.</li>
 * <li>#-6 Positive Case : When it is defined in the format of
 * <query:auto-config dbType="..."/>, <query:auto-config id="..." dbType="..."
 * dataSoure-ref="..."/>, it is verified whether various QueryService instances
 * are loaded in normal fashion based diverse DataSources.</li>
 * </ul>
 */
@RunWith(JUnit4.class)
public class QueryNamespaceTest {

	QueryService queryService;

	/**
	 * [Flow #-1] Positive Case : When it is defined in the way of
	 * <query:auto-config dbType="...">, it is verified whether QueryService
	 * property information is properly recognized.
	 * 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
	public void readDefaultQueryNamespace() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-default.xml");
		queryService = (QueryService) context.getBean("queryService");
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 8,
				queryService.getQueryMap().size());
		testDynamicQuery(context);
	}

	/**
	 * [Flow #-2] Positive Case : When it is defined in the way of
	 * <query:auto-config dbType="..." sqLoader-ref="..."/> and sqlLoader Bean
	 * property as reference relationship, it is verified whether QueryService
	 * property information is properly recognized with sqlLoader Bean.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
	public void readQueryNamespaceWithAnotherSQLLoader() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-sqlloader.xml");
		queryService = (QueryService) context.getBean("anotherQueryService");
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 25,
				queryService.getQueryMap().size());
		testDynamicQuery(context);
	}

	/**
	 * [Flow #-3] Positive Case : When it is defined in the way of
	 * <query:auto-config dbType="..." dataSource-ref="..."/> and dataSource
	 * Bean property as reference relationship, it is verified whether
	 * QueryService property information is properly recognized with dataSource
	 * Bean
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
	public void readQueryNamespaceWithAnotherJdbcTemplate() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-jdbctemplate.xml");
		queryService = (QueryService) context.getBean("queryService");
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 8,
				queryService.getQueryMap().size());
		Assert.assertEquals("Fail to refers 'anotherJdbcTemplate' bean.",
				OraclePagingJdbcTemplate.class, queryService
						.getQueryServiceJdbcTemplate().getClass());
		testDynamicQuery(context);
	}

	/**
	 * [Flow #-4] Positive Case : When it is defined in the way of
	 * <query:auto-config dbType="..." dataSource-ref="..."/> and dataSource
	 * Bean property as reference relationship, it is verified whether
	 * QueryService property information is properly recognized with dataSource
	 * Bean
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	// @Test
	public void readQueryNamespaceWithAnotherDataSource() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-datasource.xml");
		queryService = (QueryService) context.getBean("queryService");
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 8,
				queryService.getQueryMap().size());

		try {
			queryService.getQueryServiceJdbcTemplate().getDataSource()
					.getConnection();
			Assert.fail("Fail to refers 'anotherDataSource' bean.");
		} catch (Exception e) {
			Assert.assertTrue("Fail to refers 'anotherDataSource' bean.",
					e instanceof SQLException);
		}
	}

	/**
	 * [Flow #-5] Negative Case : When defined in the way of <query:auto-config
	 * dbType="xxx"/>, in the case where entered value is different from DBMS
	 * type for use, verified is whether pagingSQLGenerator and lobHandler are
	 * wrongly set.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	// @Test
	public void readQueryNamespaceWithWrongDBType() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-wrong-dbtype.xml");
		queryService = (QueryService) context.getBean("queryService");
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 8,
				queryService.getQueryMap().size());
		try {
			testDynamicQuery(context);
			Assert.fail("Fail to set wrong pagingSQLGenerator.");
		} catch (Exception e) {

			Assert.assertTrue("Fail to set wrong pagingSQLGenerator.",
					e instanceof QueryException);
		}
	}

	/**
	 * [Flow #-6] Positive Case : In the case of definition such as
	 * <query:auto-config id="..." dbType="..." dataSoure-ref="..."/>, verified
	 * is whether various QueryService instances are load in the normal fashion
	 * based on a few Datasource.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	// @Test
	public void readQueryNamespaceWithMultiDataSource() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-multi-datasource.xml");

		queryService = (QueryService) context.getBean("queryService");
		testDynamicQuery(context);

		queryService = (QueryService) context.getBean("anotherQueryService");
		testDynamicQuery(context);
	}

	/**
	 * In the case of defining QueryService property with query namespace, in
	 * order to verify whether QueryService is successfully loaded, paging on
	 * Dynamic query execution result is processed with QueryService.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void testDynamicQuery(ApplicationContext context) {
		initializeTable(context);

		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "schema=TB_USER";
		iVal[1] = "sortColumn=NAME";

		// 2. execute query
		List<Map<String, Object>> results = queryService.find("findUsers",
				iVal, 1, 2);

		// 3. assert
		Assert
				.assertTrue("Fail to execute dynamic query.",
						results.size() == 2);
		Map<String, Object> result = results.get(0);
		Assert.assertEquals("Fail to compare result.", "admin", result
				.get("logonId"));
	}

	/**
	 * DB table is created for test.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void initializeTable(ApplicationContext context) {
		try {
			queryService.updateBySQL("DROP TABLE TB_USER", new String[] {},
					new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}
		queryService.updateBySQL("CREATE TABLE TB_USER ( "
				+ "LOGON_ID  VARCHAR(20), " + "PASSWORD VARCHAR(20),"
				+ "NAME VARCHAR(20)," + "PRIMARY KEY (LOGON_ID))",
				new String[] {}, new Object[] {});

		queryService.createBySQL(
				"INSERT INTO TB_USER VALUES ('admin', 'admin', 'ADMIN')",
				new String[] {}, new Object[] {});
		queryService.createBySQL(
				"INSERT INTO TB_USER VALUES ('test', 'test123', 'TESTER')",
				new String[] {}, new Object[] {});
	}
}
