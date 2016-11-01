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

import java.sql.Types;
import java.util.Collection;
import java.util.Iterator;

import org.anyframe.query.QueryService;
import org.anyframe.query.impl.Pagination;
import org.anyframe.query.impl.jdbc.PagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.generator.OraclePagingSQLGenerator;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;
import org.springframework.util.LinkedCaseInsensitiveMap;


/**
 * TestCase Name : PagingJdbcTemplateTest <br>
 * <br>
 * [Description] : PagingJdbcTemplate을 이용하여 특정 쿼리의 조회 결과에 대해 페이징 처리가 성공적으로
 * 이루어지는지 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : PagingSQLGenerator를 셋팅하지 않고, 페이지 번호와 한 페이지에 보여야 할 결과
 * 데이터의 개수를 정의한 PaginationVO 객체를 인자로 전달하여, 검색 조건이 필요한 쿼리문에 대해 페이징 처리가 제대로 수행되었는지
 * 확인한다. 또한 해당 쿼리문을 실행하였을 경우 전체 조회 건수가 몇 개인지 검증한다. 이 경우에는 전체 데이터가 조회된 이후에
 * Result으로 부터 cursor를 이동하여 페이징 처리를 수행하게 된다.</li>
 * <li>#-2 Positive Case : OraclePagingSQLGenerator를 셋팅하고, 페이지 번호와 한 페이지에 보여야 할
 * 결과 데이터의 개수를 정의한 PaginationVO 객체를 인자로 전달하여, 검색 조건이 필요한 쿼리문에 대해 페이징 처리가 제대로
 * 수행되었는지 확인한다. 또한 해당 쿼리문을 실행하였을 경우 전체 조회 건수가 몇 개인지 검증한다. 이 경우에는 페이징 처리를 위해
 * OraclePagingSQLGenerator를 통해 조합된 쿼리문을 통해 페이징 처리를 수행하게 된다.</li>
 * <li>#-3 Positive Case : PagingSQLGenerator를 셋팅하지 않고, 페이지 번호와 한 페이지에 보여야 할 결과
 * 데이터의 개수를 정의한 PaginationVO 객체를 인자로 전달하여, 검색 조건이 필요하지 않은 쿼리문에 대해 페이징 처리가 제대로
 * 수행되었는지 확인한다. 또한 해당 쿼리문을 실행하였을 경우 전체 조회 건수가 몇 개인지 검증한다. 이 경우에는 전체 데이터가 조회된 이후에
 * Result으로 부터 cursor를 이동하여 페이징 처리를 수행하게 된다.</li>
 * <li>#-4 Negative Case : 특정 쿼리문에 대해 검색 조건의 값을 NULL로 전달하였을 경우
 * NullPointerException이 발생하는지 검증한다. 조건 값 셋팅이 불필요한 쿼리문에 대해서는 조건값을 new Object[]{}
 * 형태로 전달해주어야 한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class PagingJdbcTemplateTest extends
		AbstractDependencyInjectionSpringContextTests {

	private PagingJdbcTemplate jdbcTemplate = null;

	private QueryService queryService = null;

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	public void setJdbcTemplate(PagingJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**
	 * 테스트를 위해 초기 데이터 입력 및 테이블 TB_CUSTOMER를 생성한다.
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
		insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
		insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
		insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
		insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
		insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");
	}

	/**
	 * [Flow #-1] Positive Case : PagingSQLGenerator를 셋팅하지 않고, 페이지 번호와 한 페이지에
	 * 보여야 할 결과 데이터의 개수를 정의한 PaginationVO 객체를 인자로 전달하여, 검색 조건이 필요한 쿼리문에 대해 페이징
	 * 처리가 제대로 수행되었는지 확인한다. 또한 해당 쿼리문을 실행하였을 경우 전체 조회 건수가 몇 개인지 검증한다. 이 경우에는 전체
	 * 데이터가 조회된 이후에 Result으로 부터 cursor를 이동하여 페이징 처리를 수행하게 된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	public void testQueryForListWithPagination() throws Exception {
		// 1. set page information
		Pagination context = new Pagination();
		context.setPageSize(2);
		context.setPageIndex(1);
		context.setCountRecordSize(true);

		// 2. execute query
		Collection rtCollection = jdbcTemplate.queryForListWithPagination(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new Object[] { "%12345%" }, new int[] { 12 }, context);

		// 3. assert size of result
		assertEquals("Fail to find using PagingJdbcTemplate.", 2, rtCollection
				.size());
		// 4. assert total size of result
		assertEquals("Fail to compare total count of results.", 6, context
				.getRecordCount());

		// 5. compare result in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) rtIterator
					.next();
			assertTrue("Fail to compare result.", ((String) map.get("name"))
					.startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-2] Positive Case : OraclePagingSQLGenerator를 셋팅하고, 페이지 번호와 한 페이지에
	 * 보여야 할 결과 데이터의 개수를 정의한 PaginationVO 객체를 인자로 전달하여, 검색 조건이 필요한 쿼리문에 대해 페이징
	 * 처리가 제대로 수행되었는지 확인한다. 또한 해당 쿼리문을 실행하였을 경우 전체 조회 건수가 몇 개인지 검증한다. 이 경우에는 페이징
	 * 처리를 위해 OraclePagingSQLGenerator를 통해 조합된 쿼리문을 통해 페이징 처리를 수행하게 된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	public void testQueryForListWithPaginationGenerator() throws Exception {
		// 1. set OraclePagingSQLGenerator
		jdbcTemplate.setPaginationSQLGetter(new OraclePagingSQLGenerator());

		// 2. set page information
		Pagination context = new Pagination();
		context.setPageSize(2);
		context.setPageIndex(1);
		context.setCountRecordSize(true);

		// 3. execute query
		Collection rtCollection = jdbcTemplate.queryForListWithPagination(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new Object[] { "%12345%" }, new int[] { 12 }, context);
		// 4. assert size of result
		assertEquals("Fail to find using PagingJdbcTemplate.", 2, rtCollection
				.size());
		// 5. assert total size of result
		assertEquals("Fail to compare total count of results.", 6, context
				.getRecordCount());

		// 6. compare result in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) rtIterator.next();
			assertTrue("Fail to compare result.", ((String) map.get("name"))
					.startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-3] Positive Case : PagingSQLGenerator를 셋팅하지 않고, 페이지 번호와 한 페이지에
	 * 보여야 할 결과 데이터의 개수를 정의한 PaginationVO 객체를 인자로 전달하여, 검색 조건이 필요하지 않은 쿼리문에 대해
	 * 페이징 처리가 제대로 수행되었는지 확인한다. 또한 해당 쿼리문을 실행하였을 경우 전체 조회 건수가 몇 개인지 검증한다. 이 경우에는
	 * 전체 데이터가 조회된 이후에 Result으로 부터 cursor를 이동하여 페이징 처리를 수행하게 된다.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	public void testQueryForListWithPaginationWithNoArgs() throws Exception {
		// 1. set page information
		Pagination context = new Pagination();
		context.setPageSize(2);
		context.setPageIndex(1);
		context.setCountRecordSize(true);

		// 2. execute query
		Collection rtCollection = jdbcTemplate
				.queryForListWithPagination(
						"select NAME, ADDRESS from TB_CUSTOMER where SSNO like '%12345%'",
						new Object[] {}, new int[] {}, context);

		// 3. assert size of result
		assertEquals("Fail to find using PagingJdbcTemplate.", 2, rtCollection
				.size());
		// 4. assert total size of result
		assertEquals("Fail to compare total count of results.", 6, context
				.getRecordCount());

		// 5. compare result in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) rtIterator.next();
			assertTrue("Fail to compare result.", ((String) map.get("name"))
					.startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-4] Negative Case : 특정 쿼리문에 대해 검색 조건의 값을 NULL로 전달하였을 경우
	 * NullPointerException이 발생하는지 검증한다. 조건 값 셋팅이 불필요한 쿼리문에 대해서는 조건값을 new
	 * Object[]{} 형태로 전달해주어야 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	public void testQueryForListWithPaginationWithNoArgsError()
			throws Exception {
		// 1. set page information
		Pagination context = new Pagination();
		context.setPageSize(2);
		context.setPageIndex(1);
		context.setCountRecordSize(true);

		// 2. execute query
		try {
			jdbcTemplate
					.queryForListWithPagination(
							"select NAME, ADDRESS from TB_CUSTOMER where SSNO like '%12345%'",
							(Object[]) null, new int[] { Types.VARCHAR },
							context);
			fail("Fail to throw exception.");
		} catch (Exception e) {
			e.printStackTrace();
			assertTrue("Fail to compare exception type.",
					e instanceof NullPointerException);
		}
	}

	/**
	 * QueryService의 createBySQL() 메소드 호출을 통해 신규 사용자 정보를 추가한다.
	 * 
	 * @param ssno
	 *            주민번호
	 * @param name
	 *            이름
	 * @param address
	 *            주소
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void insertCustomerBySQL(String ssno, String name, String address)
			throws Exception {
		int result = queryService.createBySQL(
				"insert into TB_CUSTOMER values (?, ?, ?)", new String[] {
						"VARCHAR", "VARCHAR", "VARCHAR" }, new Object[] { ssno,
						name, address });
		assertEquals("Fail to insert customer.", 1, result);
	}
}
