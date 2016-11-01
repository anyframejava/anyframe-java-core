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
import org.anyframe.query.QueryServiceException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceTest <br>
 * <br>
 * [Description] : 매핑 XML 파일에 정의된 queryId를 입력하여 데이터를 입력, 수정, 삭제, 조회하고 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 매핑 XML 파일에 정의된 queryId를 입력하여 UPDATE 쿼리를 실행시키고 결과를
 * 검증한다.</li>
 * <li>#-2 Positive Case : 매핑 XML 파일에 정의된 queryId를 입력하여 DELETE 쿼리를 실행시키고 결과를
 * 검증한다.</li>
 * <li>#-3 Positive Case : 매핑 XML 파일에 정의된 queryId를 입력하여 SELECT 쿼리를 실행시키고 결과를
 * 검증한다. 이 테스트케이스에서는 한글 입력 및 조회에 대해서 검증한다.</li>
 * <li>#-4 Negative Case : 매핑 XML 파일에 정의되지 않은 queryId를 입력하여
 * QueryServiceException이 발생하는지 검증한다.</li>
 * <li>#-5 Positive Case : QueryService의 getQueryMap() 메소드를 호출함으로써 QueryService에
 * 의해 load된 모든 쿼리문을 조회하고 제대로 조회되었는지 검증한다.</li>
 * <li>#-6 Positive Case : QueryService의 getStatement() 메소드를 호출함으로써 특정 queryId에
 * 해당하는 쿼리문을 조회하고 제대로 조회되었는지 검증한다.</li>
 * <li>#-7 Positive Case : QueryService의 countQuery() 메소드를 호출함으로써 QueryService에
 * 의해 load된 모든 쿼리문의 개수를 조회하고 제대로 조회되었는지 검증한다.</li>
 * <li>#-8 Positive Case : QueryService의 getQueryParams() 메소드를 호출함으로써 특정
 * queryId에 해당하는 입력 Parameter들을 조회하고 제대로 조회되었는지 검증한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceTest extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	/**
	 * 테스트를 위해 테이블 TB_CUSTOMER, TB_USER를 생성한다.
	 */
	public void onSetUp() throws Exception {
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
	 * [Flow #-1] Positive Case : 매핑 XML 파일에 정의된 queryId를 입력하여 UPDATE 쿼리를 실행시키고
	 * 결과를 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testUpdateUsingQueryId() throws Exception {
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
		assertEquals("Fail to update Customer.", 1, result);

		// 5. assert in detail
		findCustomerUsingQueryId(ssno, "AnyframeUPD", address);
	}

	/**
	 * [Flow #-2] Positive Case : 매핑 XML 파일에 정의된 queryId를 입력하여 DELETE 쿼리를 실행시키고
	 * 결과를 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testRemoveUsingQueryId() throws Exception {
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
		assertEquals("Fail to remove Customer.", 1, result);
		Collection rtCollection = queryService.find("findCustomer",
				new Object[] { ssno });
		assertEquals("Fail to find customer by SQL.", 0, rtCollection.size());
	}

	/**
	 * [Flow #-3] Positive Case : 매핑 XML 파일에 정의된 queryId를 입력하여 SELECT 쿼리를 실행시키고
	 * 결과를 검증한다. 이 테스트케이스에서는 한글 입력 및 조회에 대해서 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindWithKoreanLanguage() throws Exception {
		// 1. set data for insert
		String ssno = "1234567890123";
		String name = "테스트";
		String address = "seoul";

		// 2. insert test data
		insertUsingQueryId(ssno, name, address);

		// 3. execute query
		Collection rtCollection = queryService.find(
				"dynamicWithKoreanLanguage", new String[] { "key=true" });

		// 4. assert
		assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

		// 5. assert in detail
		Map map = (Map) rtCollection.iterator().next();
		assertEquals("Fail to compare result.", name, (String) map.get("name"));

		// 6. execute another query
		rtCollection = queryService.find("queryWithKoreanLanguage",
				new Object[] {});

		// 7. assert
		assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

		// 8. assert in detail
		map = (Map) rtCollection.iterator().next();
		assertEquals("Fail to compare result.", name, (String) map.get("name"));

		// 9. execute query
		rtCollection = queryService.find("findCustomerWithKorean",
				new Object[] { new Object[] { "ssno", "1234567890123" } });
		
		// 10. assert
		assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());
	}

	/**
	 * [Flow #-4] Negative Case : 매핑 XML 파일에 정의되지 않은 queryId를 입력하여
	 * QueryServiceException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testUndefinedQueryId() throws Exception {
		try {
			// 1. execute query
			queryService.find("undefinedQueryId", new Object[] {});
			fail("Fail to recognize undefined query id.");
		} catch (QueryServiceException e) {
			// 2. assert
			assertTrue("Fail to catch QueryServiceException.", e.getMessage()
					.startsWith("Query Service : Fail to find queryId"));
		}
	}

	/**
	 * [Flow #-5] Positive Case : QueryService의 getQueryMap() 메소드를 호출함으로써
	 * QueryService에 의해 load된 모든 쿼리문을 조회하고 제대로 조회되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testGetQueryMap() throws Exception {
		// 1. get all queries in all mapping xml files
		Map queryMap = queryService.getQueryMap();

		// 2. assert
		assertEquals("Fail to get the size of query map.", 60, queryMap.size());
		assertEquals("Fail to get query map.", (String) queryMap
				.get("callFunction"), "{? = call FUNC_RETURN_NUM(?)}");
	}

	/**
	 * [Flow #-6] Positive Case : QueryService의 getStatement() 메소드를 호출함으로써 특정
	 * queryId에 해당하는 쿼리문을 조회하고 제대로 조회되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testGetStatement() throws Exception {
		// 1. get query statement using query id
		String statement = queryService.getStatement("callFunction");
		// 2. assert
		assertEquals("Fail to get query statement.", statement,
				"{? = call FUNC_RETURN_NUM(?)}");
	}

	/**
	 * [Flow #-7] Positive Case : QueryService의 countQuery() 메소드를 호출함으로써
	 * QueryService에 의해 load된 모든 쿼리문의 개수를 조회하고 제대로 조회되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testCountQuery() throws Exception {
		// 1. get total count of queries and assert
		assertEquals("Fail to count total queries.", 60, queryService
				.countQuery());
	}

	/**
	 * [Flow #-8] Positive Case : QueryService의 getQueryParams() 메소드를 호출함으로써 특정
	 * queryId에 해당하는 입력 Parameter들을 조회하고 제대로 조회되었는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testGetQueryParams() throws Exception {
		// 1. get query parameters
		ArrayList params = queryService.getQueryParams("callFunction");

		// 2. assert
		assertEquals("Fail to get query parameters.", 2, params.size());

		// 3. assert in detail
		String[] firstParam = (String[]) params.get(0);
		assertEquals("Fail to find query param name.", firstParam[0], "outVal");
		assertEquals("Fail to find query param type.", firstParam[1], "NUMERIC");
	}

	/**
	 * 매핑 XML 파일에 정의된 query id를 이용하여 테스트를 위한 단건의 데이터를 입력하고 결과를 검증한다.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to insert data using query id
	 */
	private void insertUsingQueryId(String ssno, String name, String address)
			throws Exception {
		// 1. execute query
		int result = queryService.create("insertCustomer", new Object[] { ssno,
				name, address });

		// 2. assert
		assertEquals("Fail to insert Customer.", 1, result);

		// 3. assert in detail
		findCustomerUsingQueryId(ssno, name, address);
	}

	/**
	 * 매핑 XML 파일에 정의된 query id를 이용하여 단건의 데이터를 조회하고 결과를 검증한다.
	 * 
	 * @param ssno
	 * @param name
	 * @param address
	 * @throws Exception
	 *             fail to find customer using query id
	 */
	private void findCustomerUsingQueryId(String ssno, String name,
			String address) throws Exception {
		// 1. execute query
		Collection rtCollection = queryService.find("findCustomer",
				new Object[] { ssno });

		// 2. assert
		assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

		// 3. assert in detail
		Map rtMap = (Map) rtCollection.iterator().next();
		assertEquals("Fail to compare result.", address, (String) rtMap
				.get("address"));
		assertEquals("Fail to compare result.", name, (String) rtMap
				.get("name"));
	}
}
