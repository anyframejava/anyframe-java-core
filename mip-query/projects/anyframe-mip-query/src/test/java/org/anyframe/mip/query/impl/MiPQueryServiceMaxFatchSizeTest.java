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
package org.anyframe.mip.query.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.mip.query.MiPQueryService;
import org.anyframe.query.exception.QueryException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

/**
 * TestCase Name : MiPQueryServiceMaxFatchSizeTest <br>
 * <br>
 * [Description] : MaxFatchSize is set and its result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Positive Case : In the case where search result shows
 * larger than maxFetchSize by setting search condition at VariantList and
 * calling for find method of MiPQueryService, it is verified whether
 * DataRetrievalFailureException takes place.</li>
 * <li>#-2 Positive Case : In the case where search result shows larger than
 * maxFetchSize and query defined at XML is executed by setting search condition
 * at VariantList and calling for find method of MiPQueryService, it is verified
 * whether DataRetrievalFailureException takes place.</li>
 * <li>#-3 Positive Case : In the case where page size shows larger than
 * maxFetchSize and by setting search condition at VariantList and calling for
 * searchWithPaging method of MiPQueryService, it is verified whether
 * DataRetrievalFailureException takes place.</li>
 * <li>#-4 Positive Case : In the case where page size shows larger than
 * maxFetchSize and by setting search condition at VariantList and calling for
 * searchWithPaging method of MiPQueryService, it is verified whether
 * DataRetrievalFailureException takes place.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/maxfatchsize/context-*.xml" })
public class MiPQueryServiceMaxFatchSizeTest {

	@Inject
	private DataSource dataSource;

	@Inject
	private MiPQueryService mipQueryService;

	/**
	 * Basic table is created for test and basic data is entered.
	 */
	@Before
	public void onSetUp() {

		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP TABLE TB_MIP_CUSTOMER");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_MIP_CUSTOMER ( "
						+ "SSNO varchar2(13) NOT NULL, "
						+ "NAME varchar2(20), " + "ADDRESS varchar2(20), "
						+ "PRIMARY KEY (SSNO))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws QueryException
	 */
	@Test
	public void testFindDataSetWithVariant() {
		insertDataSet();

		try {
			mipQueryService.search("findCustomerWithDynamicMaxFetchSize",
					makeVariantList());
		} catch (QueryException e) {
			// 7. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : In the case where search result shows larger
	 * than maxFetchSize and query defined at XML is executed by setting search
	 * condition at VariantList and calling for find method of MiPQueryService,
	 * it is verified whether DataRetrievalFailureException takes place.
	 * 
	 * @throws QueryException
	 */
	@Test
	public void testFindDataSetWithData() throws Exception {
		insertDataSet();

		try {
			mipQueryService.search("findCustomerWithDynamicMaxFetchSize",
					makeSelectDataSet("%12345678%"));
		} catch (QueryException e) {
			// 7. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-3] Positive Case : In the case where page size shows larger than
	 * maxFetchSize and by setting search condition at VariantList and calling
	 * for searchWithPaging method of MiPQueryService, it is verified whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws QueryException
	 */
	@Test
	public void testFindDataSetWithPaging() {
		insertDataSet();

		// 테스트 데이터 1Row 추가
		Map<String, String> queryMap = new HashMap<String, String>();

		queryMap.put(MiPQueryService.QUERY_INSERT,
				"createMiPMaxfatchSizeQueryService");
		Dataset insertDataSet = new Dataset();
		insertDataSet.setUpdate(true);
		insertDataSet.setDataSetID("mip_insert");
		insertDataSet.addStringColumn("SSNO");
		insertDataSet.addStringColumn("NAME");
		insertDataSet.addStringColumn("ADDRESS");

		insertDataSet.appendRow();
		Variant variant = new Variant();
		variant.setObject("1234567890333");
		insertDataSet.setColumn(0, "SSNO", variant);
		variant = new Variant();
		variant.setObject("Anyframe4");
		insertDataSet.setColumn(0, "NAME", variant);
		variant = new Variant();
		variant.setObject("Seoul");
		insertDataSet.setColumn(0, "ADDRESS", variant);

		mipQueryService.update(queryMap, insertDataSet);

		try {
			mipQueryService.search("findCustomerWithDynamic",
					makeVariantList(), 1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryException e) {
			// 5. assert
			e.printStackTrace();
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-4] Positive Case : In the case where page size shows larger than
	 * maxFetchSize and by setting search condition at Dataset and calling for
	 * find method of MiPQueryService, it is verified whether
	 * DataRetrievalFailureException takes place.
	 * 
	 * @throws QueryException
	 */
	@Test
	public void testFindDataSetWithPagingDataset() {
		insertDataSet();

		// Test Data 1Row Test
		Map<String, String> queryMap = new HashMap<String, String>();

		queryMap.put(MiPQueryService.QUERY_INSERT,
				"createMiPMaxfatchSizeQueryService");
		Dataset insertDataSet = new Dataset();
		insertDataSet.setUpdate(true);
		insertDataSet.setDataSetID("mip_insert");
		insertDataSet.addStringColumn("SSNO");
		insertDataSet.addStringColumn("NAME");
		insertDataSet.addStringColumn("ADDRESS");

		insertDataSet.appendRow();
		Variant variant = new Variant();
		variant.setObject("1234567890333");
		insertDataSet.setColumn(0, "SSNO", variant);
		variant = new Variant();
		variant.setObject("Anyframe4");
		insertDataSet.setColumn(0, "NAME", variant);
		variant = new Variant();
		variant.setObject("Seoul");
		insertDataSet.setColumn(0, "ADDRESS", variant);

		mipQueryService.update(queryMap, insertDataSet);

		Dataset searchDataset = makeSelectDataSet("%12345678%");

		searchDataset.setConstColumn("pageIndex", 1);
		searchDataset.setConstColumn("pageSize", 4);

		try {
			mipQueryService.searchWithPaging("findCustomerWithDynamic",
					searchDataset);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryException e) {
			// 5. assert
			e.printStackTrace();
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * Initial Data Value Setting for Test
	 */
	private void insertDataSet() {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(MiPQueryService.QUERY_INSERT,
				"createMiPMaxfatchSizeQueryService");

		int resultInsert = mipQueryService
				.update(queryMap, makeInsertDataSet());
		Assert.assertEquals("Fail to insert MiPDataSet.", 3, resultInsert);

		findListDataSet(3);
	}

	/**
	 * Test is conducted and then searched to verify the result value.
	 * 
	 * @param expected
	 */
	private void findListDataSet(int expected) {
		Dataset resultDataSet = mipQueryService.search(
				"findCustomerWithDynamic", makeSelectDataSet("%12345678%"));
		Assert.assertEquals("Fail to find MiPDataSet.", expected, resultDataSet
				.getRowCount());

		int totalRowCount = resultDataSet.getRowCount();
		for (int rowNum = 0; rowNum < totalRowCount; rowNum++) {
			Variant ssno = resultDataSet.getColumn(rowNum, "ssno");
			Assert.assertTrue("Fail to check result.", ssno.getString()
					.startsWith("123456789"));

			Variant name = resultDataSet.getColumn(rowNum, "name");
			Assert.assertTrue("Fail to check result.", name.getString()
					.startsWith("Anyframe"));

		}
	}

	/**
	 * Dataset Setting
	 * 
	 * @return
	 */
	private Dataset makeInsertDataSet() {
		Dataset insertDataSet = new Dataset();
		insertDataSet.setUpdate(true);
		insertDataSet.setDataSetID("mip_insert");
		insertDataSet.addStringColumn("SSNO");
		insertDataSet.addStringColumn("NAME");
		insertDataSet.addStringColumn("ADDRESS");

		insertDataSet.appendRow();
		Variant variant = new Variant();
		variant.setObject("1234567890123");
		insertDataSet.setColumn(0, "SSNO", variant);
		variant = new Variant();
		variant.setObject("Anyframe1");
		insertDataSet.setColumn(0, "NAME", variant);
		variant = new Variant();
		variant.setObject("Seoul");
		insertDataSet.setColumn(0, "ADDRESS", variant);

		insertDataSet.appendRow();
		variant = new Variant();
		variant.setObject("1234567890111");
		insertDataSet.setColumn(1, "SSNO", variant);
		variant = new Variant();
		variant.setObject("Anyframe2");
		insertDataSet.setColumn(1, "NAME", variant);
		variant = new Variant();
		variant.setObject("Seoul");
		insertDataSet.setColumn(1, "ADDRESS", variant);

		insertDataSet.appendRow();
		variant = new Variant();
		variant.setObject("1234567890222");
		insertDataSet.setColumn(2, "SSNO", variant);
		variant = new Variant();
		variant.setObject("Anyframe3");
		insertDataSet.setColumn(2, "NAME", variant);
		variant = new Variant();
		variant.setObject("Incheon");
		insertDataSet.setColumn(2, "ADDRESS", variant);

		return insertDataSet;
	}

	/**
	 * Setting with Search Condition
	 * 
	 * @param searchKeyword
	 * @return
	 */
	private Dataset makeSelectDataSet(String searchKeyword) {
		Dataset selectDataSet = new Dataset();
		selectDataSet.setDataSetID("bbnydory_select");
		selectDataSet.addStringColumn("SSNO");

		selectDataSet.appendRow();
		Variant variant = new Variant();
		variant.setObject(searchKeyword);
		selectDataSet.setColumn(0, "SSNO", variant);
		return selectDataSet;
	}

	/**
	 * VariableList Setting with Search Condition
	 * 
	 * @return
	 */
	private VariableList makeVariantList() {
		VariableList variableList = new VariableList();
		Variant variant = new Variant();
		variant.setObject("%12345678%");
		variableList.addVariable("SSNO", variant);
		return variableList;
	}
}
