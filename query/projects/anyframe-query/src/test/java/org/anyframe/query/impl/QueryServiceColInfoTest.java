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

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceColInfoTest <br>
 * <br>
 * [Description] : In the case of calling for findColInfo()method, verified is
 * whether column information for search can be extracted regardless of search
 * result. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for findWithColInfo()method of
 * QueryService, verified is whether Column information can be extracted even
 * tough search result value is 0.</li>
 * </ul>
 */
public class QueryServiceColInfoTest extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/maxfetchsize/context-*.xml" };
	}

	/**
	 * Table TB_CUSTOMER is created for test.
	 */
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
	 * [Flow #-1] Positive Case : By calling for findWithColInfo()method of
	 * QueryService, verified is whether Column information can be extracted
	 * even tough search result value is 0.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindWithColInfo() throws Exception {
		// 1. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 6. execute select query
		Map results = queryService.findWithColInfo("findCustomerWithResult",
				new Object[] { "%987654%" }, 1, 4);

		Map columnInfos = (Map) results.get(QueryService.COL_INFO);

		assertEquals("fail to find column information about ssno",
				"VARCHAR:13:0", columnInfos.get("ssno"));
		assertEquals("fail to find column information about ssno",
				"VARCHAR:20:0", columnInfos.get("name"));
		assertEquals("fail to find column information about ssno",
				"VARCHAR:20:0", columnInfos.get("address"));

		results = queryService.findWithColInfo("findCustomerWithResult",
				new Object[] { "%987654%" });

		columnInfos = (Map) results.get(QueryService.COL_INFO);

		assertEquals("fail to find column information about ssno",
				"VARCHAR:13:0", columnInfos.get("ssno"));
		assertEquals("fail to find column information about ssno",
				"VARCHAR:20:0", columnInfos.get("name"));
		assertEquals("fail to find column information about ssno",
				"VARCHAR:20:0", columnInfos.get("address"));

		results = queryService.findWithColInfo("findCustomerWithResultMapping",
				new Object[] { "%987654%" });

		columnInfos = (Map) results.get(QueryService.COL_INFO);

		assertEquals("fail to find column information about ssno",
				"VARCHAR:20:0", columnInfos.get("name"));
		assertEquals("fail to find column information about ssno",
				"VARCHAR:20:0", columnInfos.get("address"));
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
		assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

		// 3. assert in detail
		Map rtMap = (Map) rtCollection.iterator().next();
		assertEquals("Fail to compare result.", address, (String) rtMap
				.get("address"));
		assertEquals("Fail to compare result.", name, (String) rtMap
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
		assertEquals("Fail to insert customer.", 1, result);
		findCustomerBySQL(ssno, name, address);
	}

}
