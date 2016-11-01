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
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceSQLTest <br>
 * <br>
 * [Description] : By manually entering query statement, data is entered,
 * modified, deleted and searched and its result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for method of findBySQL() method of
 * QueryService, manually entered SELECT query is executed and its result is
 * verified.</li>
 * <li>#-2 Positive Case : By calling for method of findBySQL() method of
 * QueryService, manually entered SELECT query is executed and its result is
 * verified. In the case of calling for findBySQL(), by delivering pageIndex and
 * pageSize information all together, paging processed search result comes out.</li>
 * <li>#-3 Negative Case : By calling for method of findBySQL() method of
 * QueryService, manually entered SELECT query is executed and its result is
 * verified. This TestCase delivers input factor value besides query statement
 * to NULL and verified is whether QueryServiceException takes place.</li>
 * <li>#-4 Positive Case : By calling for method of updateBySQL()method of
 * QueryService, manually entered UPDATE query is executed and its result is
 * verified.</li>
 * <li>#-5 Positive Case : By calling for removeBySQL()method of method of
 * QueryService, manually entered DELETE query is executed and its result is
 * verified.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceSQLTest {

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
	 * [Flow #-1] Positive Case : By calling for method of findBySQL() method of
	 * QueryService, manually entered SELECT query is executed and its result is
	 * verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindBySQLWithoutPageInfo() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

		// 2. execute query
		Collection rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%12345678%" });

		// 3. assert
		Assert.assertEquals("Fail to find Customer.", 6, rtCollection.size());

		// 4. assert in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			Map map = (Map) rtIterator.next();
			Assert.assertTrue("Fail to compare result.", ((String) map
					.get("name")).startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-2] Positive Case : By calling for method of findBySQL() method of
	 * QueryService, manually entered SELECT query is executed and its result is
	 * verified. In the case of calling for findBySQL(), by delivering pagIndex
	 * and pageSize information all together, paging processed search result
	 * comes out.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindBySQLWithPageInfo() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

		// 2. execute query
		Collection rtCollection = queryService
				.findBySQL(
						"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
						new String[] { "VARCHAR" },
						new Object[] { "%12345678%" }, 1, 2);

		// 3. assert
		Assert.assertEquals("Fail to find Customer.", 2, rtCollection.size());

		// 4. assert in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			Map map = (Map) rtIterator.next();
			Assert.assertTrue("Fail to compare result.", ((String) map
					.get("name")).startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-3] Negative Case : By calling for method of updateBySQL()
	 * QueryService, manually entered UPDATE query is executed and its result is
	 * verified. This TestCase delivers input factor value besides query
	 * statement to NULL and verified is whether QueryServiceException takes
	 * place.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void findBySQLWithNullArg() throws Exception {
		try {
			// 1. execute query with null args
			queryService.findBySQL("select NAME, ADDRESS from TB_CUSTOMER",
					null, null);
			Assert.fail("Fail to catch Exception");
		} catch (Exception e) {
			// 2. assert
			Assert.assertTrue("Fail to compare exception type.",
					e instanceof QueryServiceException);
			Assert.assertTrue("Fail to compare exception message.",
					((QueryServiceException) e).getMessage().startsWith(
							"Query Service : Fail to"));
		}
	}

	/**
	 * [Flow #-4] Positive Case : By calling for method of updateBySQL()
	 * QueryService, manually entered UPDATE query is executed and its result is
	 * verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testUpdateBySQL() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");

		// 2. execute query
		int result = queryService.updateBySQL(
				"update TB_CUSTOMER set NAME=? where SSNO=?", new String[] {
						"VARCHAR", "VARCHAR" }, new Object[] { "AnyframeUPD",
						"1234567890123" });

		// 3. assert
		Assert.assertEquals("Fail to update customer.", 1, result);
		findCustomerBySQL("1234567890123", "AnyframeUPD", "Seoul");
	}

	/**
	 * [Flow #-5] Positive Case : By calling for removeBySQL() method of
	 * QueryService, manually entered DELETE query is executed and its result is
	 * verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testRemoveBySQL() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");

		// 2. execute query
		int result = queryService.removeBySQL(
				"delete TB_CUSTOMER where SSNO=?", new String[] { "VARCHAR" },
				new Object[] { "1234567890123" });

		// 3. assert
		Assert.assertEquals("Fail to update customer.", 1, result);
		Collection rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER WHERE SSNO = ?",
				new String[] { "VARCHAR" }, new Object[] { "1234567890123" });
		Assert.assertEquals("Fail to find customer by SQL.", 0, rtCollection
				.size());
	}

	/**
	 * By manually entering SELECT query statement, one piece of data is entered
	 * and its result is verified.
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
		Assert.assertEquals("Fail to find customer by SQL.", 1, rtCollection
				.size());

		// 3. assert in detail
		Map rtMap = (Map) rtCollection.iterator().next();
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
