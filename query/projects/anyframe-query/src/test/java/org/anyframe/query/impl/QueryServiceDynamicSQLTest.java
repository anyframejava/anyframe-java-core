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

import java.util.ArrayList;
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
 * TestCase Name : QueryServiceDynamicSQLTest <br>
 * <br>
 * [Description] : Dynamic Query defined in mapping XML file is executed and
 * execution result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for find() method of QueryService, Dynamic
 * Query defining Named Parameter is executed and its result value is verified.
 * Named Parameter Value is delivered in the form of ‘parameter=value”.</li>
 * <li>#-2 Negative Case : By calling for find() method of Q ueryService,
 * Dynamic Query defining Named Parameter is executed and its result value is
 * verified.</li>
 * <li>#-3 Positive Case : By calling for find() method of Q ueryService,
 * Dynamic Query including Text Replacements{{...}} is executed and its result
 * value is verified.</li>
 * <li>#-4 Negative Case : By calling for find() method of Q ueryService,
 * Dynamic Query including Text Replacements{{...}} is executed and its result
 * value is verified.</li>
 * <li>#-5 Positive Case : QBy calling for find() method of Q ueryService,
 * Dynamic Query including IF statement is executed and its result value is
 * verified.</li>
 * <li>#-6 Positive Case : By calling findWithRowCount()method of QueryService,
 * Dynamic Query including Text Replacements{{...}} is executed and result Value
 * is verified to see whether paging process on Dynamic Query is successful.</li>
 * <li>#-7 Positive Case : By calling find()method of QueryService, Dynamic
 * Query including doreach statement is executed and result Value is verified.
 * The execution number of foreach statement uses $velocityCount.</li>
 * <li>#-8 Positive Case : By calling find()method of QueryService, Dynamic
 * Query defining Named Parameter is executed and result Value is verified. The
 * number of Named Parameter is delivered in the form of 'parameter=value'.
 * However, defined query statement includes block comments and block comments
 * includes “:” or “&”.</li>
 * <li>#-9 Positive Case : By calling find()method of QueryService, Dynamic
 * Query defining Named Parameter is executed and result Value is verified. The
 * number of Named Parameter is delivered in the form of 'parameter=value'.
 * However, defined query statement includes block comments and line comments
 * includes “:” or “&”.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceDynamicSQLTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_USER is created for test and initial data is added.
	 */
	@Before
	public void onSetUp() {
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

	/**
	 * [Flow #-1] Positive Case : By calling for find() method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and its result value
	 * is verified. Named Parameter value is delivered in the form of
	 * ‘parameter=value’.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingNamedParameter() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "lowID=a";
		iVal[1] = "highID=s";

		// 2. execute query
		List<Map<String, Object>> results = queryService.find("findLogonIdByRange",
				iVal);

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", results.size() == 1);
		for (int i = 0; i < results.size(); i++) {
			Map<String, Object> result = results.get(i);
			Assert.assertEquals("Fail to compare result.", "admin", result
					.get("logonId"));
		}
	}

	/**
	 * [Flow #-2] Negative Case : By calling for find() method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and its result value
	 * is verified. Query whose I.D. is 'findLogonIdByRangeWithError' including
	 * Named Parameters called ParalowID and highID. However, this TestCase does
	 * not properly deliver NamedParameter value.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingWrongDefinedNamedParameter() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "a";
		iVal[1] = "z";
		try {
			// 2. execute query
			queryService.find("findLogonIdByRangeWithError", iVal);
			Assert.fail("Fail to execute dynamic query without param name.");
		} catch (Exception e) {
			// 3. assert
			Assert.assertTrue("Fail to find exception class type.",
					e instanceof QueryException);
			Assert.assertTrue("Fail to compare exception message.", e
					.getMessage()
					.startsWith("Query Service : Invalid Argument"));
		}
	}

	/**
	 * [Flow #-3] Positive Case : By calling for find()method of QueryService,
	 * Dynamic Query including Text Replacements {{...}} is executed and its
	 * result value is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingTextReplace() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "schema=TB_USER";
		iVal[1] = "sortColumn=NAME";

		// 2. execute query
		List<Map<String, Object>> results = queryService.find("findUsers", iVal);

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", results.size() == 2);
		Map<String, Object> result = results.get(0);
		Assert.assertEquals("Fail to compare result.", "admin", result
				.get("logonId"));
	}

	/**
	 * [Flow #-4] Negative Case : By calling for find()method of QueryService,
	 * Dynamic Query including Text Replacements {{...}} is executed and its
	 * result value is verified. Query whose I.D. is ‘findUsers’ includes
	 * {{schema}}and {{sortColumn}} for Text Replacements. However, this
	 * TestCase does not properly deliver value for Text Replacements.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingWrongTextReplace() {
		// 1. set data for test
		Object[] iVal = new Object[0];
		try {
			// 2. execute query
			queryService.find("findUsers", iVal);
			Assert.fail("Fail to text replacement");
		} catch (Exception e) {
			// 3. assert
			Assert.assertTrue("Fail to find exception class type.",
					e instanceof QueryException);
		}
	}

	/**
	 * [Flow #-5] Positive Case : By calling for find() method of Q ueryService,
	 * Dynamic Query including IF statement is executed and its result value is
	 * verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingCondition() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "id=test";
		iVal[1] = "sortColumn=NAME";

		// 2. execute query
		List<Map<String, Object>> results = queryService.find(
				"findUsersByCondition", iVal);

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", results.size() == 1);
		Map<String, Object> result = results.get(0);
		Assert.assertEquals("Fail to compare result.", "test", result
				.get("logonId"));
	}

	/**
	 * [Flow #-6] Positive Case : By calling findWithRowCount()method of
	 * QueryService, Dynamic Query including Text Replacements{{...}} is
	 * executed and result Value is verified to see whether paging process on
	 * Dynamic Query is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void testDynamicQueryUsingPagination() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "schema=TB_USER";
		iVal[1] = "sortColumn=NAME";

		// 2. execute query
		Map<String, Object> rtMap = queryService.findWithRowCount("findUsers",
				iVal, 2, 1);

		// 3. get result size and total size
		List<Map<String,Object>> results = (List) rtMap.get(QueryService.LIST);
		Long intVal = (Long) rtMap.get(QueryService.COUNT);

		// 4. assert
		Assert.assertTrue("Fail to execute dynamic query - result.", results
				.size() == 1);
		Assert.assertTrue("Fail to execute dynamic query - total count.",
				intVal.intValue() == 2);

		// 5. assert in detail
		Map<String, Object> result = results.get(0);
		Assert.assertEquals("Fail to compare result.", "test", result
				.get("logonId"));
	}

	/**
	 * [Flow #-7] Positive Case : By calling find()method of QueryService,
	 * Dynamic Query including foreach statement is executed and result Value is
	 * verified. The execution number of foreach statements uses $velocityCount.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingForEach() {
		// 1. set data for test
		List<String> logonIdList = new ArrayList<String>();
		logonIdList.add("admin");
		logonIdList.add("test");

		// 2. execute query
		List<Map<String, Object>> results = queryService.find("dynamicWithForEach",
				new Object[] { new Object[] { "logonIdList", logonIdList } });

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", results.size() == 2);
		Map<String, Object> result = results.get(0);
		Assert.assertEquals("Fail to compare result.", "admin", result
				.get("logonId"));
	}

	/**
	 * [Flow #-8] Positive Case : By calling find()method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and result Value is
	 * verified. The number of Named Parameter is delivered in the form of
	 * 'parameter=value'. However, defined query statement includes block
	 * comments and block comments includes “:” or “&”.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingNamedParameterWithBlockComments() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "lowID=a";
		iVal[1] = "highID=s";

		// 2. execute query
		List<Map<String, Object>> results = queryService.find(
				"findLogonIdByRangeWithBlockComments", iVal);

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", results.size() == 1);
		for (int i = 0; i < results.size(); i++) {
			Map<String, Object> result = results.get(i);
			Assert.assertEquals("Fail to compare result.", "admin", result
					.get("logonId"));
		}
	}

	/**
	 * [Flow #-9] Positive Case : By calling find()method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and result Value is
	 * verified. The number of Named Parameter is delivered in the form of
	 * 'parameter=value'. However, defined query statement includes block
	 * comments and line comments includes “:” or “&”.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testDynamicQueryUsingNamedParameterWithLineComments() {
		// 1. set data for test
		Object[] iVal = new Object[2];
		iVal[0] = "lowID=a";
		iVal[1] = "highID=s";

		// 2. execute query
		List<Map<String, Object>> results = queryService.find(
				"findLogonIdByRangeWithLineComments", iVal);

		// 3. assert
		Assert.assertTrue("Fail to execute dynamic query.", results.size() == 1);
		for (int i = 0; i < results.size(); i++) {
			Map<String, Object> result = results.get(i);
			Assert.assertEquals("Fail to compare result.", "admin", result
					.get("logonId"));
		}
	}
}
