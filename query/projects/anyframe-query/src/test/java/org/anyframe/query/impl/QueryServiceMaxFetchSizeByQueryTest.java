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
import org.anyframe.query.vo.Customer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceMaxFetchSizeByQueryTest <br>
 * <br>
 * [Description] : In the case where search result number of a specific query
 * statement is bigger than maxFetchSize defined as property of specific query
 * statement. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Positive Case : In the case where executed is query
 * statement which isDynamic is true via QueryService and search result is
 * bigger than maxFetchSize defined each query, verified is whether
 * DataRetrievalFailureException takes place.</li>
 * <li>#-2 Positive Case : Positive Case : In the case where executed is query
 * statement which isDynamic is true via QueryService and search result is
 * bigger than maxFetchSize defined by each query, verified is whether
 * DataRetrievalFailureException takes place.</li>
 * </ul>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/maxfetchsize/context-*.xml" })
public class QueryServiceMaxFetchSizeByQueryTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_CUSTMER is created for test.
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
		queryService.updateBySQL("CREATE TABLE TB_CUSTOMER ( "
				+ "SSNO varchar2(13) NOT NULL, " + "NAME varchar2(20), "
				+ "ADDRESS varchar2(20), " + "PRIMARY KEY (SSNO))",
				new String[] {}, new Object[] {});
	}

	/**
	 * [Flow #-1] Positive Case : In the case where executed is query statement
	 * which isDynamic is true via QueryService and search result is bigger than
	 * maxFetchSize defined by each query, verified is whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFind() {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");

		// 1. execute select query without maxFetchsize
		List<Customer> results = queryService.find(
				"findCustomerWithResultLength", new Object[] { "%12345678%" });
		// 2. assert
		Assert.assertTrue("fail to apply maxFetchSize", results.size() == 2);

		try {
			// 3. execute select query with maxFetchSize
			queryService.find("findCustomerWithResultLengthMaxFetchSize",
					new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 4. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 5. execute select query with maxFetchSize, length
			queryService.find("findCustomerWithResultLengthMaxFetchSize",
					new Object[] { "%12345678%" }, 1);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 6. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 7. execute select query with maxFetchSize
			queryService.find("findCustomerWithMaxFetchSize",
					new Object[] { "%12345678%" }, 1, 4);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 8. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 9. execute select query with maxFetchSize
			queryService.findWithRowCount(
					"findCustomerWithResultLengthMaxFetchSize",
					new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 10. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 11. execute select query with maxFetchSize, length
			queryService.findWithRowCount(
					"findCustomerWithResultLengthMaxFetchSize",
					new Object[] { "%12345678%" }, 1);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 12. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 13. execute select query with maxFetchSize
			queryService.findWithRowCount("findCustomerWithMaxFetchSize",
					new Object[] { "%12345678%" }, 1, 4);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 14. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : In the case where executed is query statement
	 * which isDynamic is true via QueryService and search result is bigger than
	 * maxFetchSize defined each query, verified is whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithDynamicQuery() {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");

		try {
			// 1. execute select query with maxFetchSize
			queryService.find(
					"findCustomerWithDynamicResultLengthMaxFetchSize",
					new Object[] { new Object[] { "ssno", "%12345678%" } });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 2. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 3. execute select query with maxFetchSize, length
			queryService.find(
					"findCustomerWithDynamicResultLengthMaxFetchSize",
					new Object[] { new Object[] { "ssno", "%12345678%" } }, 1);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 4. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 5. execute select query with maxFetchSize
			queryService.find("findCustomerWithDynamicMaxFetchSize",
					new Object[] { new Object[] { "ssno", "%12345678%" } }, 1,
					4);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 6. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 7. execute select query with maxFetchSize
			queryService.findWithRowCount(
					"findCustomerWithDynamicResultLengthMaxFetchSize",
					new Object[] { new Object[] { "ssno", "%12345678%" } });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 8. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 9. execute select query with maxFetchSize, length
			queryService.findWithRowCount(
					"findCustomerWithDynamicResultLengthMaxFetchSize",
					new Object[] { new Object[] { "ssno", "%12345678%" } }, 1);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 10. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		try {
			// 11. execute select query with maxFetchSize
			queryService.findWithRowCount(
					"findCustomerWithDynamicMaxFetchSize",
					new Object[] { new Object[] { "ssno", "%12345678%" } }, 1,
					4);
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryException e) {
			// 12. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * By manually entering INSERT query statement, one piece of data is entered
	 * and its result is verified.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to find customer by SQL
	 */
	private void findCustomerBySQL(String ssno, String name, String address) {
		// 1. execute query
		List<Map<String, Object>> results = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER WHERE SSNO = ?",
				new String[] { "VARCHAR" }, new Object[] { ssno });

		// 2. assert
		Assert.assertEquals("Fail to find customer by SQL.", 1, results.size());

		// 3. assert in detail
		Map<String, Object> rtMap = results.iterator().next();
		Assert.assertEquals("Fail to compare result.", address, (String) rtMap
				.get("address"));
		Assert.assertEquals("Fail to compare result.", name, (String) rtMap
				.get("name"));
	}

	/**
	 * By manually entering INSERT query statement, one piece of data is entered
	 * and its result is verified.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to insert customer by SQL
	 */
	private void insertCustomerBySQL(String ssno, String name, String address) {
		// 1. execute query
		int result = queryService.createBySQL(
				"insert into TB_CUSTOMER values (?, ?, ?)", new String[] {
						"VARCHAR", "VARCHAR", "VARCHAR" }, new Object[] { ssno,
						name, address });

		// 2. assert
		Assert.assertEquals("Fail to insert customer.", 1, result);
		findCustomerBySQL(ssno, name, address);
	}

}
