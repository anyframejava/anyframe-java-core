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
import org.anyframe.query.vo.Customer;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceWithRowCountTest <br>
 * <br>
 * [Description] : findWithRowCount() 메소드를 호출하여 페이징 처리된 조회 결과와 해당 쿼리에 대한 전체 조회
 * 결과 건수를 얻고, 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 findBySQLWithRowCount() 메소드를 호출하여 직접
 * 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다. findBySQLWithRowCount() 호출시 pageIndex,
 * pageSize 정보를 같이 전달함으로써 페이징 처리된 조회 결과를 얻을 수 있다.</li>
 * <li>#-2 Positive Case : QueryService의 findBySQLWithRowCount() 메소드를 호출하여 직접
 * 입력한 SELECT 쿼리(조회 결과가 없음)를 실행시키고 결과를 검증한다. findBySQLWithRowCount() 호출시
 * pageIndex, pageSize 정보를 같이 전달함으로써 페이징 처리된 조회 결과를 얻을 수 있다.</li>
 * <li>#-3 Positive Case : 5건의 신규 데이터를 입력한 후, QueryService의
 * findBySQLWithRowCount() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다.
 * findBySQLWithRowCount() 호출시 pageIndex, pageSize 정보를 같이 전달함으로써 페이징 처리된 조회 결과를
 * 얻을 수 있다.</li>
 * <li>#-4 Positive Case : 5건의 신규 데이터를 입력한 후, QueryService의
 * findBySQLWithRowCount() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다.
 * findBySQLWithRowCount() 호출시 페이징 처리를 위한 정보를 전달하지 않음으로써 페이징 처리되지 않은 조회 결과를 얻게
 * 된다.</li>
 * <li>#-5 Positive Case : 5건의 신규 데이터를 입력한 후, QueryService의
 * findBySQLWithRowCount() 메소드를 호출하여 매핑 XML 파일에 정의된 query를 실행시키고 결과를 검증한다.
 * findBySQLWithRowCount() 호출시 pageIndex만 전달하고 pageSize는 해당 쿼리의 result size를
 * 따르도록 함으로써 페이징 처리된 조회 결과를 얻을 수 있다.</li>
 * <li>#-6 Negative Case : 5건의 신규 데이터를 입력한 후, QueryService의
 * findBySQLWithRowCount() 메소드를 호출하여 매핑 XML 파일에 정의된 query를 실행시키고 결과를 검증한다.
 * findWithRowCount() 호출시 pageIndex만 전달하고 pageSize는 해당 쿼리의 result size를 따르도록
 * 함으로써 페이징 처리된 조회 결과를 얻을 수 있다. 단, 매핑 XML 파일 내에는 result length를 별도로 정의하지 않았음.
 * 이러한 경우 조회 결과 목록의 수는 0개임.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceWithRowCountTest extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	/**
	 * 테스트를 위해 테이블 TB_CUSTOMER를 생성한다.
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
		insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
	}

	/**
	 * [Flow #-1] Positive Case : QueryService의 findBySQLWithRowCount() 메소드를
	 * 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다. findBySQLWithRowCount() 호출시
	 * pageIndex, pageSize 정보를 같이 전달함으로써 페이징 처리된 조회 결과를 얻을 수 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindBySQLWithPageInfo() throws Exception {
		// 1. execute query
		Map rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 3, 2);

		// 2. get result size, count total
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 3. assert
		assertEquals("Fail to get total count of results.", 1, totalCount
				.intValue());
		assertEquals("Fail to get results.", 0, rtList.size());

		// 4. execute query
		rtMap = queryService.findBySQLWithRowCount(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new String[] { "VARCHAR" }, new Object[] { "%123%" }, 1, 2);

		// 5. get result size, count total
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		rtList = (ArrayList) rtMap.get(QueryService.LIST);

		// 6. assert
		assertEquals("Fail to get total count of results.", 1, totalCount
				.intValue());
		assertEquals("Fail to get results.", 1, rtList.size());
	}

	/**
	 * [Flow #-2] Positive Case : QueryService의 findBySQLWithRowCount() 메소드를
	 * 호출하여 직접 입력한 SELECT 쿼리(조회 결과가 없음)를 실행시키고 결과를 검증한다. findBySQLWithRowCount()
	 * 호출시 pageIndex, pageSize 정보를 같이 전달함으로써 페이징 처리된 조회 결과를 얻을 수 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
		assertEquals("Fail to get total count of results.", 0, fstTotalCount
				.intValue());
		assertEquals("Fail to get results.", 0, fstRtList.size());

		// 4. assert second result
		ArrayList scdRtList = (ArrayList) scdRtMap.get(QueryService.LIST);
		Long scdTotalCount = (Long) scdRtMap.get(QueryService.COUNT);
		assertEquals("Fail to get total count of results.", 0, scdTotalCount
				.intValue());
		assertEquals("Fail to get results.", 0, scdRtList.size());
	}

	/**
	 * [Flow #-3] Positive Case : 5건의 신규 데이터를 입력한 후, QueryService의
	 * findBySQLWithRowCount() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다.
	 * findBySQLWithRowCount() 호출시 pageIndex, pageSize 정보를 같이 전달함으로써 페이징 처리된 조회
	 * 결과를 얻을 수 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
		assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 0, rtList.size());

		// 5. execute query
		rtMap = queryService.findWithRowCount("findCustomerWithResultMapping",
				new Object[] { "%12345%" }, 1, 3);

		// 6. assert total size of result
		totalCount = (Long) rtMap.get(QueryService.COUNT);
		assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 7. assert result size
		rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 3, rtList.size());

		// 8. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = (Customer) rtList.get(i);
			assertTrue("Fail to compare result.", customer.getNm().startsWith(
					"Anyframe"));
		}
	}

	/**
	 * [Flow #-4] Positive Case : 5건의 신규 데이터를 입력한 후, QueryService의
	 * findBySQLWithRowCount() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다.
	 * findBySQLWithRowCount() 호출시 페이징 처리를 위한 정보를 전달하지 않음으로써 페이징 처리되지 않은 조회 결과를
	 * 얻게 된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
		assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 6, rtList.size());

		// 5. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = (Customer) rtList.get(i);
			assertTrue("Fail to compare result.", customer.getNm().startsWith(
					"Anyframe"));
		}
	}

	/**
	 * [Flow #-5] Positive Case : 5건의 신규 데이터를 입력한 후, QueryService의
	 * findBySQLWithRowCount() 메소드를 호출하여 매핑 XML 파일에 정의된 query를 실행시키고 결과를 검증한다.
	 * findBySQLWithRowCount() 호출시 pageIndex만 전달하고 pageSize는 해당 쿼리의 result size를
	 * 따르도록 함으로써 페이징 처리된 조회 결과를 얻을 수 있다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
		assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 2, rtList.size());

		// 5. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = (Customer) rtList.get(i);
			assertTrue("Fail to compare result.", customer.getNm().startsWith(
					"Anyframe"));
		}
	}

	/**
	 * [Flow #-6] Negative Case : 5건의 신규 데이터를 입력한 후, QueryService의
	 * findBySQLWithRowCount() 메소드를 호출하여 매핑 XML 파일에 정의된 query를 실행시키고 결과를 검증한다.
	 * findWithRowCount() 호출시 pageIndex만 전달하고 pageSize는 해당 쿼리의 result size를 따르도록
	 * 함으로써 페이징 처리된 조회 결과를 얻을 수 있다. 단, 매핑 XML 파일 내에는 result length를 별도로 정의하지
	 * 않았음. 이러한 경우 조회 결과 목록의 수는 0개임.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
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
		assertEquals("Fail to get total count of results.", 6, totalCount
				.intValue());

		// 4. assert result size
		ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 0, rtList.size());
	}

	public void testFind() throws Exception {
		for (int i = 0; i < 23; i++) {
			insertCustomerBySQL(new Integer(i).toString(), "Anyframe2", "Seoul");
		}

		Map rtMap = queryService.findWithRowCount("findCustomerWithResultMapping",
				new Object[] { "%%" }, 2, 10);
		
		ArrayList rtList = (ArrayList)rtMap.get(QueryService.LIST);
		assertEquals("Fail to get results.", 10, rtList.size());
		
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
