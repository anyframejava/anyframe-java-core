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
 * TestCase Name : QueryServiceMaxFetchSizeTest <br>
 * <br>
 * [Description] : 특정 쿼리문의 조회 결과 개수가 QueryService 속성으로 정의한 maxFetchSize보다 클 경우
 * 이에 대한 처리를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 findBySQL() 메소드를 호출하여 직접 입력한 SELECT 쿼리를
 * 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우 DataRetrievalFailureException이 발생하는지
 * 검증한다.</li>
 * <li>#-2 Positive Case : QueryService를 통해 isDynamic이 false인 쿼리문을 실행시키고
 * maxFetchSize를 초과하는 조회 결과가 검색되었을 경우 DataRetrievalFailureException이 발생하는지 검증한다.
 * </li>
 * <li>#-3 Positive Case : QueryService의 findWithRowCount() 메소드 호출을 통해 XML내에 정의된
 * 쿼리문을 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우 DataRetrievalFailureException이
 * 발생하는지 검증한다.</li>
 * <li>#-4 Positive Case : QueryService의 findWithColInfo() 메소드 호출을 통해 직접 입력한
 * 쿼리문을 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우 DataRetrievalFailureException이
 * 발생하는지 검증한다.</li>
 * </ul>
 */
public class QueryServiceMaxFetchSizeTest extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/maxfetchsize/context-*.xml" };
	}

	/**
	 * 테스트를 위해 테이블 TB_CUSTOMER를 생성한다.
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
	 * [Flow #-1] Positive Case : QueryService의 findBySQL() 메소드를 호출하여 직접 입력한
	 * SELECT 쿼리를 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
		assertEquals("Fail to find Customer.", 3, rtCollection.size());

		// 4. assert in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			Map map = (Map) rtIterator.next();
			assertTrue("Fail to compare result.", ((String) map.get("name"))
					.startsWith("Anyframe"));
		}

		// 5. insert test data over maxFetchSize
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");

		// 6. execute select query
		try {
			rtCollection = queryService.findBySQL(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" });
			fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 7. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 8. execute select query with pagination
		try {
			rtCollection = queryService.findBySQL(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" },
					1, 4);
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 9. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : QueryService를 통해 isDynamic이 false인 쿼리문을 실행시키고
	 * maxFetchSize를 초과하는 조회 결과가 검색되었을 경우 DataRetrievalFailureException이 발생하는지
	 * 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
			fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query
		try {
			queryService.find("findCustomerWithResult",
					new Object[] { "%12345678%" }, 1, 4);
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-3] Positive Case : QueryService의 findWithRowCount() 메소드 호출을 통해
	 * XML내에 정의된 쿼리문을 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
			fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query
		try {
			queryService.findWithRowCount("findCustomerWithResult",
					new Object[] { "%12345678%" }, 1, 4);
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-4] Positive Case : QueryService의 findBySQLWithRowCount() 메소드 호출을
	 * 통해 직접 입력한 쿼리문을 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
			fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query with pagination
		try {
			queryService.findBySQLWithRowCount(
					"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
					new String[] { "VARCHAR" }, new Object[] { "%12345678%" },
					1, 4);
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-4] Positive Case : QueryService의 findWithColInfo() 메소드 호출을 통해 직접
	 * 입력한 쿼리문을 실행시키고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
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

		// 2. execute select query
		try {
			queryService.findWithColInfo("findCustomerWithResult",
					new Object[] { "%12345678%" });
			fail("fail to check maxFetchSize");
		} catch (QueryServiceException e) {
			// 3. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}

		// 4. execute select query
		try {
			queryService.findWithColInfo("findCustomerWithResult",
					new Object[] { "%12345678%" }, 1, 4);
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * SELECT 쿼리문을 직접 입력하여 단건의 데이터를 조회하고 결과를 검증한다.
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
	 * INSERT 쿼리문을 직접 입력하여 단건의 데이터를 입력하고 결과를 검증한다.
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
