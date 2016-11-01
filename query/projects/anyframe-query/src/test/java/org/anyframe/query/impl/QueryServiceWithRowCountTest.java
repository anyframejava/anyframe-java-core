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
import java.util.Collection;
import java.util.Map;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.Customer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * TestCase Name : QueryServiceWithRowCountTest <br>
 * <br>
 * [Description] : By calling for findWithRowCount() method, paging processed 
 * search result andthe whole search result number of relevant query come out and are verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for findBySQLWithRowCount() method of QueryService, 
 * manually entered SELECT query is executed and the result is verified. 
 * In the case of calling for findBySQLWithRowCount(), 
 * by delivering pageIndex and pageSize all together, 
 * paging processed search result comes out. </li>
 * <li>#-2 Positive Case : By calling for findBySQLWithRowCount() method of QueryService, 
 * manually entered SELECT query(no search result) is executed and the result is verified. 
 * In the case of calling for findBySQLWithRowCount(), 
 * by delivering pageIndex and pageSize all together, 
 * paging processed search result comes out. </li>
 * <li>#-3 Positive Case : After entering 5 pieces of new data, 
 * by calling for findBySQLWithRowCount() method of QueryService, 
 * manually entered SELECT query is executed and the result is verified. 
 * In the case of calling for findBySQLWithRowCount(), 
 * by delivering pageIndex and pageSize all together, 
 * paging processed search result comes out. </li>
 * <li>#-4 Positive Case : After entering 5 pieces of new data, 
 * by calling for findBySQLWithRowCount() method of QueryService, 
 * manually entered SELECT query is executed and the result is verified. 
 * In the case of calling for findBySQLWithRowCount(), 
 * by not delivering information for paging process, 
 * the search result without paging process comes out. </li>
 * <li>#-5 Positive Case :After entering 5 pieces of new data, 
 * by calling for findBySQLWithRowCount() method of QueryService, 
 * query defined at mapping XML file is executed and the result is verified.
 * In the case of calling for findBySQLWithRowCount(), 
 * by only delivering pageIndex and making pageSize to comply with 
 * result size of relevant query, paging processed search result comes out. 
</li>
 * <li>#-6 Negative Case : After entering 5 pieces of new data, 
 * by calling for findBySQLWithRowCount() method of QueryService, 
 * query defined at mapping XML file is executed and the result is verified. 
 * In the case of calling for findWithRowCount(), 
 * by only delivering pageIndex and making pageSize to comply with 
 * result size of relevant query, paging processed search result comes out. 
 * However, result length is not separately defined within mapping XML file. 
 * In this case, the number of search result list is 0. 
</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceWithRowCountTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_CUSTOMER is created for test.  
	 */
	@Before
	public void onSetUp() throws Exception {
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
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
	}

	/**
	 * [Flow #-1] Positive Case : By calling for findBySQLWithRowCount() method of QueryService, 
	 * manually entered SELECT query is executed and the result is verified. 
	 * In the case of calling for findBySQLWithRowCount(), 
	 * by delivering pageIndex and pageSize all together, 
	 * paging processed search result comes out. 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindBySQLWithPageInfo() throws Exception {
		// 1. execute query
		Map rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 3, 2);

		// 2. get result size, count total
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 3. assert
		Assert.assertEquals("Fail to get total count of results.", 1, totalCount
				.intValue());
		Assert.assertEquals("Fail to get results.", 0, rtList.size());

		// 4. execute query
		rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 1, 2);

		// 5. get result size, count total
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 6. assert
		Assert.assertEquals("Fail to get total count of results.", 1, totalCount
				.intValue());
		Assert.assertEquals("Fail to get results.", 1, rtList.size());
	}

	/**
	 * [Flow #-2] Positive Case : By calling for findBySQLWithRowCount() method of QueryService, 
	 * manually entered SELECT query(no search result) is executed and the result is verified. 
	 * In the case of calling for findBySQLWithRowCount(), 
	 * by delivering pageIndex and pageSize all together, 
	 * paging processed search result comes out. 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindBySQLNoResultSetWithPageInfo() throws Exception {
		// 1. execute query
		Map fstRtMap = queryService
				.findBySQLWithRowCount(
						"select SSNO, NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
						new String[] { "VARCHAR" }, new Object[] { "%132%" },
						1, 2);

		// 2. execute query with another pageindex,
		// pagesize
		Map scdRtMap = queryService
				.findBySQLWithRowCount(
						"select SSNO, NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
						new String[] { "VARCHAR" }, new Object[] { "%132%" },
						2, 1);

		// 3. assert first result
		ArrayList fstRtList = (ArrayList) fstRtMap.get(QueryService.LIST);
		Long fstTotalCount = (Long) fstRtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 0, fstTotalCount
				.intValue());
		Assert.assertEquals("Fail to get results.", 0, fstRtList.size());

		// 4. assert second result
		ArrayList scdRtList = (ArrayList) scdRtMap.get(QueryService.LIST);
		Long scdTotalCount = (Long) scdRtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 0, scdTotalCount
				.intValue());
		Assert.assertEquals("Fail to get results.", 0, scdRtList.size());
	}

	/**
	 * [Flow #-3] Positive Case : After entering 5 pieces of new data, 
	 * by calling for findBySQLWithRowCount() method of QueryService, 
	 * manually entered SELECT query is executed and the result is verified. 
	 * In the case of calling for findBySQLWithRowCount(), 
	 * by delivering pageIndex and pageSize all together, 
	 * paging processed search result comes out. 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindCustomerWithRowCountPageIndexPageSize()
			throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

		// 2. execute query
		Map rtMap = queryService.findWithRowCount(
				"findCustomerWithResultMapping", new Object[] { "%12345%" }, 0,
				3);

		// 3. assert total size of result
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 0, rtList.size());

		// 5. execute query
		rtMap = queryService.findWithRowCount("findCustomerWithResultMapping",
				new Object[] { "%12345%" }, 1, 3);

		// 6. assert total size of result
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 7. assert result size
		rtList = (ArrayList) rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 3, rtList.size());

		// 8. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = (Customer) rtList.get(i);
			Assert.assertTrue("Fail to compare result.", customer.getNm().startsWith(
					"Anyframe"));
		}
	}

	/**
	 * [Flow #-4] Positive Case : After entering 5 pieces of new data, 
	 * by calling for findBySQLWithRowCount() method of QueryService, 
	 * manually entered SELECT query  is executed and the result is verified. 
	 * In the case of calling for findBySQLWithRowCount(), 
	 * by not delivering information for paging process, 
	 * search result without paging process comes out. 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithRowCountNoPageInfo() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

		// 2. execute query
		Map rtMap = queryService.findWithRowCount(
				"findCustomerWithResultMapping", new Object[] { "%12345%" });

		// 3. assert total size of result
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 6, rtList.size());

		// 5. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = (Customer) rtList.get(i);
			Assert.assertTrue("Fail to compare result.", customer.getNm().startsWith(
					"Anyframe"));
		}
	}

	/**
	 * [Flow #-5] Positive Case : After entering 5 pieces of new data, 
	 * by calling for findBySQLWithRowCount() method of QueryService, 
	 * query defined at mapping XML file is executed and the result is verified. 
	 * In the case of calling for findBySQLWithRowCount(), 
	 * by only delivering pageIndex and making pageSize to comply with result size of relevant query, 
	 * paging processed search result comes out.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithPageInfo() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

		// 2. execute query
		Map rtMap = queryService.findWithRowCount("findCustomerWithResult",
				new Object[] { "%123%" }, 1);

		// 3. assert total size of result
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 2, rtList.size());

		// 5. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = (Customer) rtList.get(i);
			Assert.assertTrue("Fail to compare result.", customer.getNm().startsWith(
					"Anyframe"));
		}
	}

	/**
	 * [Flow #-6] Negative Case : After entering 5 pieces of new data, 
	 * by calling for findBySQLWithRowCount() method of QueryService, 
	 * query defined at mapping XML file is executed and the result is verified. 
	 * In the case of calling for findWithRowCount(), 
	 * by only delivering pageIndex and making pageSize to comply with result size of relevant query,
	 * paging processed search result comes out. 
	 * However, result length is not separately defined within mapping XML file. 
	 * In this case, the number of search result list is 0. 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithZeroPage() throws Exception {
		// 1. insert test data
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

		// 2. execute query
		Map rtMap = queryService.findWithRowCount("findCustomerWithZeroLength",
				new Object[] { "%123%" }, 1);

		// 3. assert total size of result
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 0, rtList.size());
	}
	
	@Test
	public void testFind() throws Exception {
		for (int i = 0; i < 23; i++) {
			insertCustomerBySQL(new Integer(i).toString(), "Anyframe2", "Seoul");
		}

		Map rtMap = queryService.findWithRowCount("findCustomerWithResultMapping",
				new Object[] { "%%" }, 2, 10);
		
		ArrayList rtList = (ArrayList)rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 10, rtList.size());
		
	}

	/**
	 * By entering SELECT query statement, one piece of data is entered and its result is verified. 
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
	 * By entering INSERT query statement, one piece of data is entered and its result is verified. 
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
