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
package org.anyframe.query.impl;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.impl.jdbc.OraclePagingJdbcTemplate;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * TestCase Name : QueryNamespaceTest <br>
 * <br>
 * [Description] : query namespace를 이용한 QueryService 속성 정의가 제대로 인식되는지 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : <query:auto-config dbType="..."/>와 같이 정의하였을 때
 * QueryService 속성 정보가 제대로 인식되는지 검증한다.</li>
 * <li>#-2 Positive Case : <query:auto-config dbType="..."
 * sqlLoader-ref="..."/>와 같이 별도로 정의한 sqlLoader Bean의 속성을 참조 관계로 정의하였을 때 해당
 * sqlLoader Bean의 속성 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.</li>
 * <li>#-3 Positive Case : <query:auto-config dbType="..."/>와 같이 정의하고,
 * 'sqlLoader'라는 이름을 가진 sqlLoader Bean의 속성을 중복 정의하였을 때 해당 sqlLoader Bean의 속성 정보를
 * 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.</li>
 * <li>#-4 Positive Case : <query:auto-config dbType="..."
 * jdbcTemplate-ref="..."/>와 같이 정의하고, jdbcTemplate Bean의 속성을 참조 관계로 정의하였을 때 해당
 * jdbcTemplate Bean의 속성 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.</li>
 * <li>#-5 Positive Case : <query:auto-config dbType="..."
 * dataSource-ref="..."/>와 같이 정의하고, dataSource Bean의 속성을 참조 관계로 정의하였을 때 해당
 * dataSource Bean의 속성 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.</li>
 * <li>#-6 Negative Case : <query:auto-config dbType="xxx"/>와 같이 정의할 때 실제로 사용할
 * DBMS의 타입과 상이한 값으로 입력한 경우 pagingSQLGenerator, lobHandler가 잘못 셋팅되는지 검증한다.</li>
 * <li>#-7 Positive Case : <query:auto-config dbType="..."/>, <query:auto-config
 * id="..." dbType="..." dataSoure-ref="..."/>와 같이 정의한 경우 다양한 DataSource를 기반으로
 * 여러 개의 QueryService 인스턴스가 정상적으로 로드되었는지 검증한다.</li>
 * </ul>
 */
@RunWith(JUnit4.class)
public class QueryNamespaceTest {

	QueryService queryService;

	/**
	 * [Flow #-1] Positive Case : <query:auto-config dbType="..."/>와 같이 정의하였을 때
	 * QueryService 속성 정보가 제대로 인식되는지 검증한다.
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
	 * [Flow #-2] Positive Case : <query:auto-config dbType="..."
	 * sqlLoader-ref="..."/>와 같이 별도로 정의한 sqlLoader Bean의 속성을 참조 관계로 정의하였을 때 해당
	 * sqlLoader Bean의 속성 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.
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
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 21,
				queryService.getQueryMap().size());
		testDynamicQuery(context);
	}

	/**
	 * [Flow #-3] Positive Case : <query:auto-config dbType="..."/>와 같이 정의하고,
	 * 'sqlLoader'라는 이름을 가진 sqlLoader Bean의 속성을 중복 정의하였을 때 해당 sqlLoader Bean의 속성
	 * 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
	public void readQueryNamespaceWithDuplicateSQLLoader() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-duplicate-sqlloader.xml");
		queryService = (QueryService) context.getBean("queryService");
		Assert.assertEquals("Fail to read 'anotherSqlLoader' bean.", 21,
				queryService.getQueryMap().size());
		testDynamicQuery(context);
	}

	/**
	 * [Flow #-4] Positive Case : <query:auto-config dbType="..."
	 * jdbcTemplate-ref="..."/>와 같이 정의하고, jdbcTemplate Bean의 속성을 참조 관계로 정의하였을 때
	 * 해당 jdbcTemplate Bean의 속성 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.
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
	 * [Flow #-5] Positive Case : <query:auto-config dbType="..."
	 * dataSource-ref="..."/>와 같이 정의하고, dataSource Bean의 속성을 참조 관계로 정의하였을 때 해당
	 * dataSource Bean의 속성 정보를 이용하여 QueryService 속성 정보가 제대로 인식되는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
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
	 * [Flow #-6] Negative Case : <query:auto-config dbType="xxx"/>와 같이 정의할 때
	 * 실제로 사용할 DBMS의 타입과 상이한 값으로 입력한 경우 pagingSQLGenerator, lobHandler가 잘못 셋팅되는지
	 * 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
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
					e instanceof QueryServiceException);
		}
	}

	/**
	 * [Flow #-7] Positive Case : <query:auto-config dbType="..."/>,
	 * <query:auto-config id="..." dbType="..." dataSoure-ref="..."/>와 같이 정의한 경우
	 * 다양한 DataSource를 기반으로 여러 개의 QueryService 인스턴스가 정상적으로 로드되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService or
	 *             AutoConfigBeanDefinitionParser
	 */
	@Test
	public void readQueryNamespaceWithMultiDataSource() throws Exception {
		ApplicationContext context = new ClassPathXmlApplicationContext(
				"classpath*:/spring/namespace/context-query-multi-datasource.xml");

		queryService = (QueryService) context.getBean("queryService");
		testDynamicQuery(context);

		queryService = (QueryService) context.getBean("anotherQueryService");
		testDynamicQuery(context);
	}

	/**
	 * query namespace를 이용하여 QueryService 속성을 정의한 경우 QueryService가 정상적으로 로드되었는지
	 * 검증하기 위해 QueryService를 이용하여 Dynamic 쿼리 실행 결과에 대해 페이징 처리를 수행한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@SuppressWarnings("unchecked")
	private void testDynamicQuery(ApplicationContext context) throws Exception {
		initializeTable(context);

		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "schema=TB_USER";
		iVal[1] = "sortColumn=NAME";

		// 2. execute query
		ArrayList rtList = (ArrayList) (queryService.find("findUsers", iVal, 1,
				2));

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", rtList.size() == 2);
		Map result = (Map) rtList.get(0);
		Assert.assertEquals("Fail to compare result.", "admin", result
				.get("logonId"));
	}

	/**
	 * 테스트를 위한 DB 테이블을 생성한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void initializeTable(ApplicationContext context) throws Exception {
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
