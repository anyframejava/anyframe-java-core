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

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceMaxFetchSizeTest <br>
 * <br>
 * [Description] : In the case where search result number of a specific query
 * statement is bigger than maxFetchSize defined with QueryService, this process
 * is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for findBySQL() of QueryService, manually
 * entered SELECT query is executed. In the case where search result shows
 * bigger than mazFetchSize, verified is whether DataRetrievalFailureException
 * takes place.</li>
 * <li>#-2 Positive Case : In the case where executed is query statement which
 * isDyamic is false via QueryService and search result is bigger than
 * maxFetchSize, verified is whether DataRetrievalFailureException takes place.</li>
 * <li>#-3 Positive Case : In the case where query statement defined within XML
 * is executed through findWithRowCount() method of QueryService and search
 * result is bigger than maxFetchSize, verified is whether
 * DataRetrievalFailureException takes place.</li>
 * <li>#-4 Positive Case : In the case where manually entered query statement is
 * executed through findWithColInfo () method of QueryService and search result
 * is bigger than maxFetchSize, verified is whether
 * DataRetrievalFailureException takes place.</li>
 * </ul>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/maxfetchsize/context-*.xml" })
public class QueryServiceMaxFetchSizeTest {

	@Inject
	QueryService queryService;
	
	/**
	 * Table TB_CUSTOMER is created for test.
	 */
	@Before
	public void onSetUp() throws Exception {
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
	 * [Flow #-1] Positive Case : In the case where manually entered SELECT
	 * query statement is executed through findBySQL () method of QueryService
	 * and search result is bigger than maxFetchSize, verified is whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindBySQL() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");

		// 2. execute query
		Collection rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%12345678%" });

		// 3. assert
		Assert.assertEquals("Fail to find Customer.", 3, rtCollection.size());

		// 4. assert in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			Map map = (Map) rtIterator.next();
			Assert.assertTrue("Fail to compare result.", ((String) map.get("name"))
					.startsWith("Anyframe"));
		}

		// 5. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 6. execute select query
		try {
			rtCollection = queryService.findBySQL(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 7. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 8. execute select query with pagination
		try {
			rtCollection = queryService.findBySQL(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" },
					1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 9. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : In the case where executed is query statement
	 * which isDyamic is false via QueryService and search result is bigger than
	 * maxFetchSize, verified is whether DataRetrievalFailureException takes
	 * place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFind() throws Exception {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 2. execute select query
		try {
			queryService.find("findCustomerWithResult",
					new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query
		try {
			queryService.find("findCustomerWithResult",
					new Object[] { "%12345678%" }, 1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-3] Positive Case : In the case where executed is query statement
	 * defined within XML by calling for findWithRowCount()of QueryService, and
	 * search result is bigger than maxFetchSize, verified is whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithRowCount() throws Exception {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 2. execute select query
		try {
			queryService.findWithRowCount("findCustomerWithResult",
					new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query
		try {
			queryService.findWithRowCount("findCustomerWithResult",
					new Object[] { "%12345678%" }, 1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-4] Positive Case : By calling for findBySQLWithRowCount() of
	 * QueryService, manually entered query is executed. In the case where
	 * search result shows bigger than mazFetchSize, verified is whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindBySQLWithRowCount() throws Exception {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 2. execute select query
		try {
			queryService.findBySQLWithRowCount(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query with pagination
		try {
			queryService.findBySQLWithRowCount(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" },
					1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-5] Positive Case : By calling for findWithColInfo() of
	 * QueryService, manually entered query is executed. In the case where
	 * search result shows bigger than mazFetchSize, verified is whether
	 * DataRetrievalFailureException takes place
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithColInfo() throws Exception {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 2. execute select query
		try {
			queryService.findWithColInfo("findCustomerWithResult",
					new Object[] { "%12345678%" });
			Assert.fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query
		try {
			queryService.findWithColInfo("findCustomerWithResult",
					new Object[] { "%12345678%" }, 1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * By manually entering SELECT query statement, one piece of data is
	 * searched and its result is verified.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to find customer by SQL
	 */
	private void findCustomerBySQL(String ssno, String name, String address)
			throws Exception {
		// 1. execute query
		Collection rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER WHERE SSNO = ?",
				new String[] { "VARCHAR" }, new Object[] { ssno });

		// 2. assert
		Assert.assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

		// 3. assert in detail
		Map rtMap = (Map) rtCollection.iterator().next();
		Assert.assertEquals("Fail to compare result.", address, (String) rtMap
				.get("address"));
		Assert.assertEquals("Fail to compare result.", name, (String) rtMap
				.get("name"));
	}

	/**
	 * By manually entering INSERT query statement, one piece of data is
	 * searched and its result is verified.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to insert customer by SQL
	 */
	private void insertCustomerBySQL(String ssno, String name, String address)
			throws Exception {
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
