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
package org.anyframe.np.query.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.np.query.NPQueryService;
import org.anyframe.query.exception.QueryException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataTypes;
import com.nexacro.xapi.data.VariableList;

/**
 * TestCase Name : NPQueryServiceMaxFatchSizeTest <br>
 * <br>
 * [Description] : MaxFatchSize를 설정하고 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Positive Case : VariantList에 조회조건을 세팅하고
 * MiPQueryService의 find method를 호출 하여 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * <li>#-2 Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find method를
 * 호출 하여 XML에 정의된 쿼리를 실행하고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * <li>#-3 Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의
 * searchWithPaging method를 호출 하여 페이지 사이즈가 maxFetchSize를 초과할 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * <li>#-4 Positive Case : Dataset에 조회조건을 세팅하고 MiPQueryService의 find method를 호출
 * 하여 페이지 사이즈가 maxFetchSize를 초과할 경우 DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/maxfatchsize/context-*.xml" })
public class NPQueryServiceMaxFatchSizeTest {

	@Inject
	private DataSource dataSource;

	@Inject
	private NPQueryService npQueryService;

	/**
	 * 테스트를 위한 기본 테이블 생성 및 기본 데이터 입력
	 */
	@Before
	public void onSetUp() {

		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP TABLE TB_NP_CUSTOMER");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_NP_CUSTOMER ( "
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
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithVariant() {
		insertDataSet();

		try {
			npQueryService.search("findCustomerWithDynamicMaxFetchSize",
					makeVariantList());
		} catch (QueryException e) {
			// 7. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-2] Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여 XML에 정의된 쿼리를 실행하고 maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithData() {
		insertDataSet();

		try {
			npQueryService.search("findCustomerWithDynamicMaxFetchSize",
					makeSelectDataSet("%12345678%"));
		} catch (QueryException e) {
			// 7. assert
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-3] Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여 페이지 사이즈가 maxFetchSize를 초과할 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithPaging() {
		insertDataSet();

		// 테스트 데이터 1Row 추가
		Map<String, String> queryMap = new HashMap<String, String>();

		queryMap.put(NPQueryService.QUERY_INSERT,
				"createNPMaxfatchSizeQueryService");

		DataSet insertDataSet = new DataSet("np_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		insertDataSet.addColumn("SSNO", DataTypes.STRING);
		insertDataSet.addColumn("NAME", DataTypes.STRING);
		insertDataSet.addColumn("ADDRESS", DataTypes.STRING);

		insertDataSet.newRow();
		insertDataSet.setRowType(0, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(0, "SSNO", "1234567890333");
		insertDataSet.set(0, "NAME", "Anyframe4");
		insertDataSet.set(0, "ADDRESS", "Seoul");

		npQueryService.update(queryMap, insertDataSet);

		try {
			npQueryService.search("findCustomerWithDynamic", makeVariantList(),
					1, 4);
			Assert.fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryException e) {
			// 5. assert
			e.printStackTrace();
			Assert.assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}

	/**
	 * [Flow #-4] Positive Case : Dataset에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여 페이지 사이즈가 maxFetchSize를 초과할 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithPagingDataset() {
		insertDataSet();

		// 테스트 데이터 1Row 추가
		Map<String, String> queryMap = new HashMap<String, String>();

		queryMap.put(NPQueryService.QUERY_INSERT,
				"createNPMaxfatchSizeQueryService");

		DataSet insertDataSet = new DataSet("np_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		insertDataSet.addColumn("SSNO", DataTypes.STRING);
		insertDataSet.addColumn("NAME", DataTypes.STRING);
		insertDataSet.addColumn("ADDRESS", DataTypes.STRING);

		insertDataSet.newRow();
		insertDataSet.setRowType(0, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(0, "SSNO", "1234567890333");
		insertDataSet.set(0, "NAME", "Anyframe4");
		insertDataSet.set(0, "ADDRESS", "Seoul");

		npQueryService.update(queryMap, insertDataSet);

		DataSet searchDataset = makeSelectDataSet("%12345678%");

		searchDataset.setChangeStructureWithData(true);
		searchDataset.addConstantColumn("pageIndex", DataTypes.INT, 1);
		searchDataset.addConstantColumn("pageSize", DataTypes.INT, 4);

		try {
			npQueryService.searchWithPaging("findCustomerWithDynamic",
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
	 * 데스트를 위한 초기 데이터 값 세팅
	 * 
	 * @throws Exception
	 */
	private void insertDataSet() {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(NPQueryService.QUERY_INSERT,
				"createNPMaxfatchSizeQueryService");

		int resultInsert = npQueryService.update(queryMap, makeInsertDataSet());
		Assert.assertEquals("Fail to insert MiPDataSet.", 3, resultInsert);

		findListDataSet(3);
	}

	/**
	 * 테스트를 실행 한 후 결과값을 검증하기 위해 조회
	 * 
	 * @param expected
	 * @throws Exception
	 */
	private void findListDataSet(int expected) {
		DataSet resultDataSet = npQueryService.search(
				"findCustomerWithDynamic", makeSelectDataSet("%12345678%"));
		Assert.assertEquals("Fail to find MiPDataSet.", expected, resultDataSet
				.getRowCount());

		int totalRowCount = resultDataSet.getRowCount();
		for (int rowNum = 0; rowNum < totalRowCount; rowNum++) {

			Assert.assertTrue("Fail to check result.", resultDataSet.getString(
					rowNum, "ssno").startsWith("12345678"));
			Assert.assertTrue("Fail to check result.", resultDataSet.getString(
					rowNum, "name").startsWith("Anyframe"));
		}
	}

	/**
	 * DataSet 세팅
	 * 
	 * @return
	 */
	private DataSet makeInsertDataSet() {
		DataSet insertDataSet = new DataSet("np_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		insertDataSet.addColumn("SSNO", DataTypes.STRING);
		insertDataSet.addColumn("NAME", DataTypes.STRING);
		insertDataSet.addColumn("ADDRESS", DataTypes.STRING);

		insertDataSet.newRow();
		insertDataSet.setRowType(0, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(0, "SSNO", "1234567890123");
		insertDataSet.set(0, "NAME", "Anyframe1");
		insertDataSet.set(0, "ADDRESS", "Seoul");

		insertDataSet.newRow();
		insertDataSet.setRowType(1, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(1, "SSNO", "1234567890111");
		insertDataSet.set(1, "NAME", "Anyframe2");
		insertDataSet.set(1, "ADDRESS", "Seoul");

		insertDataSet.newRow();
		insertDataSet.setRowType(2, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(2, "SSNO", "1234567890222");
		insertDataSet.set(2, "NAME", "Anyframe3");
		insertDataSet.set(2, "ADDRESS", "Incheon");

		return insertDataSet;
	}

	/**
	 * 조회 조건이 들어 있는 DataSet세팅
	 * 
	 * @param searchKeyword
	 * @return
	 */
	private DataSet makeSelectDataSet(String searchKeyword) {
		DataSet selectDataSet = new DataSet("np_select");

		selectDataSet.addColumn("SSNO", DataTypes.STRING);

		selectDataSet.newRow();

		selectDataSet.set(0, "SSNO", searchKeyword);
		return selectDataSet;
	}

	/**
	 * 조회 조건이 들어 있는 VariableList 세팅
	 * 
	 * @return
	 */
	private VariableList makeVariantList() {
		VariableList variableList = new VariableList();
		variableList.add("SSNO", "%12345678%");
		return variableList;
	}
}
