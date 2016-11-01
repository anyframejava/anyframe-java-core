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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceWithoutPageGenerator <br>
 * <br>
 * [Description] : In the case of defining Query service property, 
 * when pagingSQLGenerator setup is not added, by calling for findXXX()
 * Method, checked is whether paging process is successful. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for findBySQLWithRowCount()method of QueryService, 
 * manually entered query is executed and the result is verified. 
 * In the case of calling for findBySQLWithRowCount(), 
 * by delivering pageIndex and pageSize all together, 
 * paging processed search result comes out.</li>
 * <li>#-2 Positive Case : By calling for findBySQL() method of QueryService, 
 * manually entered query is executed and the result is verified. 
 * In the case of calling for findBySQL(),by delivering pageIndex 
 * and pageSize all together, paging processed search result comes out.</li>
 * <li>#-3 Positive Case : By calling for findWithRowCount() method of QueryService, 
 * manually entered query is executed and the result is verified. 
 * In the case of calling for findWithRowCount() by delivering pageIndex
 * and pageSize all together, paging processed search result comes out.</li>
 * <li>#-4 Positive Case : By calling for find() method of QueryService, 
 * manually entered query is executed and the result is verified. 
 * In the case of calling for find(), by only delivering pageIndex 
 * and making pageSize to comply with result size, 
 * paging processed search result comes out.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceWithoutPageGenerator extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/withoutgenerator/context-*.xml" };
	}

	/**
	 * Table TB_CUSTOMER is created for test. 
	 */
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
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");
	}

	/**
	 * [Flow #-1] Positive Case : By calling for findBySQLWithRowCount()method of QueryService, 
	 * query defined at mapping XML file is executed and the result is verified. 
	 * In the case of calling for findBySQLWithRowCount(), 
	 * by delivering pageIndex and pageSize all together, 
	 * paging processed search result comes out.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerBySQLWithRowCount() throws Exception {
		// 1. execute query (page number = 4, page size = 2)
		Map rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 4, 2);

		// 2. get result size, count total
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 3. assert (current page number is bigger than last page number of
		// result)
		assertEquals("Fail to get total count of results.", 5, totalCount
				.intValue());
		assertEquals("Fail to get results.", 0, rtList.size());

		// 4. execute query (page number = 0, page size = 2)
		rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 0, 2);

		// 5. get result size, count total
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 6. assert (current page number must have over 1)
		assertEquals("Fail to get total count of results.", 5, totalCount
				.intValue());
		assertEquals("Fail to get results.", 0, rtList.size());

		// 7. execute query (page number = 3, page size = 2)
		rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 3, 2);

		// 8. get result size, count total
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 9. assert (last page number is 3 and total length of result is 5)
		assertEquals("Fail to get total count of results.", 5, totalCount
				.intValue());
		assertEquals("Fail to get results.", 1, rtList.size());
	}

	/**
	 * [Flow #-2] Positive Case : By calling for findBySQL() method of QueryService, 
	 * query defined at mapping XML file is executed and the result is verified. 
	 * In the case of calling for findBySQL(), by delivering pageIndex 
	 * and pageSize all together, paging processed search result comes out.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerBySQL() throws Exception {
		// 1. execute query (page number = 4, page size = 2)
		Collection rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 4, 2);

		// 2. assert (current page number is bigger than last page number of
		// result)
		assertEquals("Fail to get results.", 0, rtCollection.size());

		// 3. execute query (page number = 0, page size = 2)
		rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 0, 2);

		// 4. assert (current page number must have over 1)
		assertEquals("Fail to get results.", 0, rtCollection.size());

		// 5. execute query (page number = 3, page size = 2)
		rtCollection = queryService.findBySQL(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 3, 2);

		// 6. assert (last page number is 3 and total length of result is 5)
		assertEquals("Fail to get results.", 1, rtCollection.size());
	}

	/**
	 * [Flow #-3] Positive Case : By calling for findWithRowCount() method of QueryService, 
	 * manually entered query is executed and the result is verified. 
	 * In the case of calling for findWithRowCount(), 
	 * by only delivering pageIndex and making pageSize to comply with result size, 
	 * paging processed search result comes out.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithRowCount() throws Exception {
		// 1. execute query (page number = 4, page size = 2)
		Map rtMap = queryService.findWithRowCount(
				"findCustomerWithResultMapping", new Object[] { "%12345%" }, 4,
				2);

		// 2. assert total size of result
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		assertEquals("Fail to get total count of results.", 5, totalCount
				.intValue());

		// 3. assert result size (current page number is bigger than last page
		// number of result)
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 0, rtList.size());

		// 4. execute query (page number = 0, page size = 2)
		rtMap = queryService.findWithRowCount("findCustomerWithResultMapping",
				new Object[] { "%12345%" }, 0, 2);

		// 5. assert total size of result
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		assertEquals("Fail to get total count of results.", 5, totalCount
				.intValue());

		// 6. assert result size (current page number must have over 1)
		rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 0, rtList.size());

		// 7. execute query (page number = 3, page size = 2)
		rtMap = queryService.findWithRowCount("findCustomerWithResultMapping",
				new Object[] { "%12345%" }, 3, 2);

		// 8. assert total size of result
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		assertEquals("Fail to get total count of results.", 5, totalCount
				.intValue());

		// 9. assert result size (last page number is 3 and total length of
		// result is 5)
		rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 1, rtList.size());
	}

	/**
	 * [Flow #-4] Positive Case : By calling for find() method of QueryService, 
	 * query defined at mapping XML file is executed and the result is verified. 
	 * In the case of calling for find(), by only delivering pageIndex 
	 * and making pageSize to comply with result size, 
	 * paging processed search result comes out. 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomer() throws Exception {
		// 1. execute query (page number = 0, page size = 2)
		Collection rtCollection = queryService.find("findCustomerWithResult",
				new Object[] { "%123%" }, 0);

		// 2. assert result size (current page number must have over 1)
		assertEquals("Fail to get results.", 0, rtCollection.size());

		// 3. execute query (page number = 4, page size = 2)
		rtCollection = queryService.find("findCustomerWithResult",
				new Object[] { "%123%" }, 4);

		// 4. assert result size (current page number is bigger than last page
		// number of result)
		assertEquals("Fail to get results.", 0, rtCollection.size());

		// 5. execute query (page number = 3, page size = 2)
		rtCollection = queryService.find("findCustomerWithResult",
				new Object[] { "%123%" }, 3);

		// 6. assert result size (last page number is 3 and total length of
		// result is 5)
		assertEquals("Fail to get results.", 1, rtCollection.size());
	}

	/**
	 * By manually entering SELECT query statement, 
	 * one piece of data is entered and the result is verified. 
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
		assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

		// 3. assert in detail
		Map rtMap = (Map) rtCollection.iterator().next();
		assertEquals("Fail to compare result.", address, (String) rtMap
				.get("address"));
		assertEquals("Fail to compare result.", name, (String) rtMap
				.get("name"));
	}

	/**
	 * By manually entering INSERT query statement, 
	 * one piece of data is entered and the result is verified.
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
		assertEquals("Fail to insert customer.", 1, result);
		findCustomerBySQL(ssno, name, address);
	}
}
