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

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.exception.QueryException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceTest <br>
 * <br>
 * [Description] : By entering queryId defined at mapping XML file, data is
 * entered, modified, deleted and researched and its result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By entering queryId defined at mapping XML file,
 * UPDATE query is executed and its result is verified.</li>
 * <li>#-2 Positive Case : By entering queryId defined at mapping XML file,
 * DELETE query is executed and its result is verified.</li>
 * <li>#-3 Positive Case : By entering queryId defined at mapping XML file,
 * SELECT query is executed and its result is verified. This TestCase verifies
 * Korean entering and research.</li>
 * <li>#-4 Negative Case : By entering queryId not defined at mapping XML file,
 * verified is whether QueryServiceException takes place.</li>
 * <li>#-5 Positive Case : By calling for getQueryMap () method of QueryService,
 * all query statements loaded by Query Service are researched and verified for
 * research result.</li>
 * <li>#-6 Positive Case : By calling for getStatement() method of QueryService,
 * query statements serving as specific queryId are researched and verified for
 * research result.</li>
 * <li>#-7 Positive Case : By calling for countQuery() method of QueryService,
 * all query statement numbers loaded by QueryService are researched and
 * verified for research result.</li>
 * <li>#-8 Positive Case : By calling for getQueryParams()method of
 * QueryService, input Parameters serving as specific queryId are researched and
 * verified for research result.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_CUSTOMER, TB_USER is created for test.
	 */
	@Before
	public void onSetUp() {
		System.out.println("Attempting to drop old table");
		try {
			queryService.updateBySQL("DROP TABLE TB_CUSTOMER", new String[] {},
					new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		try {
			queryService.updateBySQL("DROP TABLE TB_USER", new String[] {},
					new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		queryService.updateBySQL("CREATE TABLE TB_CUSTOMER ( "
				+ "SSNO varchar2(13) NOT NULL, " + "NAME varchar2(30), "
				+ "ADDRESS varchar2(20), " + "PRIMARY KEY (SSNO))",
				new String[] {}, new Object[] {});

		queryService.updateBySQL("CREATE TABLE TB_USER ( "
				+ "SSNO varchar(13) NOT NULL, " + "NAME varchar(20), "
				+ "ADDRESS varchar(20), " + "PRIMARY KEY (SSNO))",
				new String[] {}, new Object[] {});
	}

	/**
	 * [Flow #-1] Positive Case : By entering queryId defined at mapping XML
	 * file, UPDATE query is executed and its result is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testUpdateUsingQueryId() {
		// 1. set data for test
		String ssno = "1234567890123";
		String name = "Anyframe";
		String address = "seoul";

		// 2. insert test data
		insertUsingQueryId(ssno, name, address);

		// 3. execute query
		int result = queryService.update("updateCustomer", new Object[] {
				"AnyframeUPD", "1234567890123" });

		// 4. assert
		Assert.assertEquals("Fail to update Customer.", 1, result);

		// 5. assert in detail
		findCustomerUsingQueryId(ssno, "AnyframeUPD", address);
	}

	/**
	 * [Flow #-2] Positive Case : By entering queryId defined at mapping XML
	 * file, DELETE query is executed and its result is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testRemoveUsingQueryId() {
		// 1. set data for test
		String ssno = "1234567890123";
		String name = "Anyframe";
		String address = "seoul";

		// 2. insert test data
		insertUsingQueryId(ssno, name, address);

		// 3. execute query
		int result = queryService.remove("removeCustomer",
				new Object[] { ssno });

		// 4. assert
		Assert.assertEquals("Fail to remove Customer.", 1, result);
		List<Map<String, String>> results = queryService.find("findCustomer",
				new Object[] { ssno });

		Assert.assertEquals("Fail to find customer by SQL.", 0, results.size());
	}

	/**
	 * [Flow #-3] Positive Case : By entering queryId defined at mapping XML
	 * file, SELCT query is executed and its result is verified. This TestCase
	 * is to verify Korean entering and research.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithKoreanLanguage() {
		// 1. set data for insert
		String ssno = "1234567890123";
		String name = "테스트";
		String address = "seoul";

		// 2. insert test data
		insertUsingQueryId(ssno, name, address);

		// 3. execute query
		List<Map<String, String>> results = queryService.find(
				"dynamicWithKoreanLanguage", new String[] { "key=true" });

		// 4. assert
		Assert.assertEquals("Fail to find customer by SQL.", 1, results.size());

		// 5. assert in detail
		Map<String, String> map = results.iterator().next();
		Assert.assertEquals("Fail to compare result.", name, map.get("name"));

		// 6. execute another query
		results = queryService.find("queryWithKoreanLanguage", new Object[] {});

		// 7. assert
		Assert.assertEquals("Fail to find customer by SQL.", 1, results.size());

		// 8. assert in detail
		map = results.iterator().next();
		Assert.assertEquals("Fail to compare result.", name, map.get("name"));

		// 9. execute query
		results = queryService.find("findCustomerWithKorean",
				new Object[] { new Object[] { "ssno", "1234567890123" } });

		// 10. assert
		Assert.assertEquals("Fail to find customer by SQL.", 1, results.size());
	}

	/**
	 * [Flow #-4] Negative Case : By entering queryId not defined at mapping XML
	 * file, verified is whether QueryServiceException takes place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testUndefinedQueryId() {
		try {
			// 1. execute query
			queryService.find("undefinedQueryId", new Object[] {});
			Assert.fail("Fail to recognize undefined query id.");
		} catch (QueryException e) {
			// 2. assert
			Assert.assertTrue("Fail to catch QueryException.", e.getMessage()
					.startsWith("Query Service : Fail to find queryId"));
		}
	}

	/**
	 * [Flow #-5] Positive Case : By calling for getQueryMap () method of
	 * QueryService, all query statements loaded by Query Service are researched
	 * and verified for research result.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testGetQueryMap() {
		// 1. get all queries in all mapping xml files
		Map<String, String> queryMap = queryService.getQueryMap();

		// 2. assert
		Assert.assertEquals("Fail to get the size of query map.", 63, queryMap
				.size());
		Assert.assertEquals("Fail to get query map.", queryMap
				.get("callFunction"), "{? = call FUNC_RETURN_NUM(?)}");
	}

	/**
	 * [Flow #-6] Positive Case : By calling for getStatement() method of
	 * QueryService, query statements serving as specific queryId are researched
	 * and verified for research result.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testGetStatement() {
		// 1. get query statement using query id
		String statement = queryService.getStatement("callFunction");
		// 2. assert
		Assert.assertEquals("Fail to get query statement.", statement,
				"{? = call FUNC_RETURN_NUM(?)}");
	}

	/**
	 * [Flow #-7] Positive Case : By calling for countQuery() method of
	 * QueryService, all query statement numbers loaded by QueryService are
	 * researched and verified for research result.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testCountQuery() {
		// 1. get total count of queries and assert
		Assert.assertEquals("Fail to count total queries.", 63, queryService
				.countQuery());
	}

	/**
	 * [Flow #-8] Positive Case : By calling for getQueryParams()method of
	 * QueryService, input Parameters serving as specific queryId are researched
	 * and verified for research result.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testGetQueryParams() {
		// 1. get query parameters
		List<String[]> params = queryService.getQueryParams("callFunction");

		// 2. assert
		Assert.assertEquals("Fail to get query parameters.", 2, params.size());

		// 3. assert in detail
		String[] firstParam = params.get(0);
		Assert.assertEquals("Fail to find query param name.", firstParam[0],
				"outVal");
		Assert.assertEquals("Fail to find query param type.", firstParam[1],
				"NUMERIC");
	}

	/**
	 * By using query I.D. defined at mapping XML file, one piece of data is
	 * searched and its result is verified.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to insert data using query id
	 */
	private void insertUsingQueryId(String ssno, String name, String address) {
		// 1. execute query
		int result = queryService.create("insertCustomer", new Object[] { ssno,
				name, address });

		// 2. assert
		Assert.assertEquals("Fail to insert Customer.", 1, result);

		// 3. assert in detail
		findCustomerUsingQueryId(ssno, name, address);
	}

	/**
	 * By using query I.D. defined at mapping XML file, one piece of data is
	 * searched and its result is verified.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to find customer using query id
	 */
	private void findCustomerUsingQueryId(String ssno, String name,
			String address) {
		// 1. execute query
		List<Map<String, String>> results = queryService.find("findCustomer",
				new Object[] { ssno });

		// 2. assert
		Assert.assertEquals("Fail to find customer by SQL.", 1, results.size());

		// 3. assert in detail
		Map<String, String> rtMap = results.iterator().next();
		Assert.assertEquals("Fail to compare result.", address, rtMap
				.get("address"));
		Assert.assertEquals("Fail to compare result.", name, rtMap.get("name"));
	}
}
