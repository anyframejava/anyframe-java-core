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

import java.sql.Types;
import java.util.Collection;
import java.util.Iterator;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.impl.jdbc.PagingJdbcTemplate;
import org.anyframe.query.impl.jdbc.generator.OraclePagingSQLGenerator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.LinkedCaseInsensitiveMap;

/**
 * TestCase Name : PagingJdbcTemplateTest <br>
 * <br>
 * [Description] : By using PagingJdbcTemplate, paging on search result of a
 * specific query is successfully handled. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case :PaginationVO Objects defines the number of result data
 * which should be shown within one page along with page number without setting
 * PagingSQLGenerator. By transferring PaginatioVO object into parameter, it is
 * checked whether paging process is conducted properly regarding query
 * statement in need of search condition. Also, in the case of executing
 * relevant query statement, it is verified whether how many a total of search
 * numbers are. In this case, paging is handled by moving cursor from Result
 * after the whole data is searched.</li>
 * <li>#-2 Positive Case : PaginationVO Objects defines the number of result
 * data which should be shown within one page along with page number without
 * setting PagingSQLGenerator. By transferring PaginatioVO object into
 * parameter, it is checked whether paging process is done properly regarding
 * query statement in no need of search condition. Also, in the case where
 * relevant query statement is executed, the total searched number is verified.
 * In this case, for paging process, combined query statement conducts paging
 * process via OraclePagingSQLGenerator.</li>
 * <li>#-3 Positive Case : PaginationVO Objects defines the number of result
 * data which should be shown within one page along with page number without
 * setting PagingSQLGenerator. By transferring PaginatioVO object into
 * parameter, it is checked whether paging process is done properly regarding
 * query statement in no need of search condition. Also, in the case where
 * relevant query statement is executed, the total searched number is verified.
 * In this case, after the whole data is searched, cursor is moved from Result
 * and then paging process is conducted.</li>
 * <li>#-4 Negative Case : In the case where search condition value on a
 * specific query statement is delivered as NULL, it is verified whether
 * NullPointerException takes place.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class PagingJdbcTemplateTest {

	@Inject
	PagingJdbcTemplate jdbcTemplate;

	@Inject
	QueryService queryService;

	/**
	 * Initial data is entered and table TB_CUSTOMER is created for test.
	 */
	@Before
	public void initialize() throws Exception {
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
	 * [Flow #-1] Positive Case : By delivering PagintionVO object setting
	 * OraclePagingSQLGenerator and defining the number of data shown at one
	 * page with page number to parameter, it is checked whether paging process
	 * on query statement requiring search condition is properly handled. Also,
	 * in the case where relevant query statement is implemented, the number of
	 * a total search cases is verified. In this case, paging is handled via
	 * combined query statement by OraclePagingSQLGenerator for the sake of
	 * paging process.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	@Test
	public void testQueryForListWithPagination() throws Exception {
		// 1. set page information
		Pagination context = new Pagination();
		context.setPageSize(2);
		context.setPageIndex(1);
		context.setCountRecordSize(true);

		// 2. execute query
		Collection rtCollection = jdbcTemplate.queryForListWithPagination(
				"select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
				new Object[] { "%12345%" }, new int[] { 12 }, -1, context);

		// 3. assert size of result
		Assert.assertEquals("Fail to find using PagingJdbcTemplate.", 2,
				rtCollection.size());
		// 4. assert total size of result
		Assert.assertEquals("Fail to compare total count of results.", 6,
				context.getRecordCount());

		// 5. compare result in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) rtIterator
					.next();
			Assert.assertTrue("Fail to compare result.", ((String) map
					.get("name")).startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-2] Positive Case : By delivering PagintionVO object setting
	 * OraclePagingSQLGenerator and defining the number of data shown at one
	 * page with page number to parameter, it is checked whether paging process
	 * on query statement requiring search condition is properly handled. Also,
	 * in the case where relevant query statement is implemented, the number of
	 * a total search cases is verified. In this case, paging is handled via
	 * combined query statement by OraclePagingSQLGenerator for the sake of
	 * paging process.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	@Test
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
				new Object[] { "%12345%" }, new int[] { 12 }, -1, context);
		// 4. assert size of result
		Assert.assertEquals("Fail to find using PagingJdbcTemplate.", 2,
				rtCollection.size());
		// 5. assert total size of result
		Assert.assertEquals("Fail to compare total count of results.", 6,
				context.getRecordCount());

		// 6. compare result in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) rtIterator
					.next();
			Assert.assertTrue("Fail to compare result.", ((String) map
					.get("name")).startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-3] Positive Case : By delivering PagintionVO object without
	 * setting OraclePagingSQLGenerator and defining the number of data shown at
	 * one page with page number to parameter, it is checked whether paging
	 * process on query statement not necessarily requiring search condition is
	 * properly handled. Also, in the case where relevant query statement is
	 * implemented, the number of a total search cases is verified. In this
	 * case, paging is handled by moving cursor from Result.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	@Test
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
						new Object[] {}, new int[] {}, -1, context);

		// 3. assert size of result
		Assert.assertEquals("Fail to find using PagingJdbcTemplate.", 2,
				rtCollection.size());
		// 4. assert total size of result
		Assert.assertEquals("Fail to compare total count of results.", 6,
				context.getRecordCount());

		// 5. compare result in detail
		Iterator rtIterator = rtCollection.iterator();
		while (rtIterator.hasNext()) {
			LinkedCaseInsensitiveMap map = (LinkedCaseInsensitiveMap) rtIterator
					.next();
			Assert.assertTrue("Fail to compare result.", ((String) map
					.get("name")).startsWith("Anyframe"));
		}
	}

	/**
	 * [Flow #-4] Negative Case : In the case where research condition value on
	 * a specific query statement is delivered as NULL, verified is whether
	 * NullPointerException takes place. In the case of query statement which
	 * does not require condition value setting, condition value should be
	 * transferred in format of new Object[]{}.
	 * 
	 * @throws Exception
	 *             throws exception which is from PagingJdbcTemplate
	 */
	@Test
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
							(Object[]) null, new int[] { Types.VARCHAR }, -1,
							context);
			Assert.fail("Fail to throw exception.");
		} catch (Exception e) {
			e.printStackTrace();
			Assert.assertTrue("Fail to compare exception type.",
					e instanceof NullPointerException);
		}
	}

	/**
	 * New user information is added by calling for QueryService’s
	 * createBySQL().
	 * 
	 * @param ssno
	 *            resident registration number
	 * @param name
	 *            name
	 * @param address
	 *            address
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void insertCustomerBySQL(String ssno, String name, String address)
			throws Exception {
		int result = queryService.createBySQL(
				"insert into TB_CUSTOMER values (?, ?, ?)", new String[] {
						"VARCHAR", "VARCHAR", "VARCHAR" }, new Object[] { ssno,
						name, address });
		Assert.assertEquals("Fail to insert customer.", 1, result);
	}
}
