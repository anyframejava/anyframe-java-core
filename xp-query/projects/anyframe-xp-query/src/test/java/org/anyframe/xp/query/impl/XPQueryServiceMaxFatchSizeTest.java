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
package org.anyframe.xp.query.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.query.QueryServiceException;
import org.anyframe.xp.query.XPQueryService;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.data.datatype.DataType;
/**
 * TestCase Name : XPQueryServiceMaxFatchSizeTest <br>
 * <br>
 * [Description] : MaxFatchSize를 설정하고 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
 * method를 호출 하여  maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * <li>#-2 Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
 * method를 호출 하여 XML에 정의된 쿼리를 실행하고  maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * <li>#-3 Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 searchWithPaging
 * method를 호출 하여  페이지 사이즈가 maxFetchSize를 초과할 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * <li>#-4 Positive Case : Dataset에 조회조건을 세팅하고 MiPQueryService의 find
 * method를 호출 하여  페이지 사이즈가 maxFetchSize를 초과할 경우
 * DataRetrievalFailureException이 발생하는지 검증한다.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
public class XPQueryServiceMaxFatchSizeTest extends
		AbstractDependencyInjectionSpringContextTests {
	
	private DataSource dataSource;
	private XPQueryService xpQueryService;

	/**
	 * Spring Configuration 파일을 읽는다.
	 */
	protected String[] getConfigLocations() {
		return new String[] { "classpath:/spring/maxfatchsize/context-*.xml" };
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public void setMipQueryService(XPQueryService xpQueryService) {
		this.xpQueryService = xpQueryService;
	}

	/**
	 * 테스트를 위한 기본 테이블 생성 및 기본 데이터 입력
	 */
	public void onSetUp() throws Exception {
		super.onSetUp();
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP TABLE TB_XP_CUSTOMER");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_XP_CUSTOMER ( "
						+ "SSNO varchar2(13) NOT NULL, " + "NAME varchar2(20), "
						+ "ADDRESS varchar2(20), " + "PRIMARY KEY (SSNO))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}


	/**
	 * [Flow #-1] Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여  maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testFindDataSetWithVariant() throws Exception {
		insertDataSet();

		try{
			DataSet resultDataSet = xpQueryService.search("findCustomerWithDynamicMaxFetchSize",
					makeVariantList());
		} catch (QueryServiceException e) {
			// 7. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}
	
	/**
	 * [Flow #-2] Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여 XML에 정의된 쿼리를 실행하고  maxFetchSize를 초과하는 조회 결과가 검색되었을 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testFindDataSetWithData() throws Exception {
		insertDataSet();

		try{
			DataSet resultDataSet = xpQueryService.search("findCustomerWithDynamicMaxFetchSize",
					makeSelectDataSet("%12345678%"));
		} catch (QueryServiceException e) {
			// 7. assert
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}
	
	/**
	 * [Flow #-3] Positive Case : VariantList에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여  페이지 사이즈가 maxFetchSize를 초과할 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testFindDataSetWithPaging() throws Exception {
		insertDataSet();

		// 테스트 데이터 1Row 추가
		Map queryMap = new HashMap();
		
		queryMap.put(XPQueryService.QUERY_INSERT, "createXPMaxfatchSizeQueryService");

		DataSet insertDataSet = new DataSet("xp_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);
		
		insertDataSet.addColumn("SSNO", DataTypes.STRING);
		insertDataSet.addColumn("NAME", DataTypes.STRING);
		insertDataSet.addColumn("ADDRESS", DataTypes.STRING);
		
		insertDataSet.newRow();
		insertDataSet.setRowType(0, DataSet.ROW_TYPE_INSERTED);
		
		insertDataSet.set(0, "SSNO", "1234567890333");
		insertDataSet.set(0, "NAME", "Anyframe4");
		insertDataSet.set(0, "ADDRESS", "Seoul");
		
		int resultInsert = xpQueryService
				.update(queryMap, insertDataSet);
		
		try{
			DataSet resultDataSet = xpQueryService.search("findCustomerWithDynamic",
					makeVariantList(), 1, 4 );
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			e.printStackTrace();
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}
	
	/**
	 * [Flow #-4] Positive Case : Dataset에 조회조건을 세팅하고 MiPQueryService의 find
	 * method를 호출 하여  페이지 사이즈가 maxFetchSize를 초과할 경우
	 * DataRetrievalFailureException이 발생하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	public void testFindDataSetWithPagingDataset() throws Exception {
		insertDataSet();

		// 테스트 데이터 1Row 추가
		Map queryMap = new HashMap();
		
		queryMap.put(XPQueryService.QUERY_INSERT, "createXPMaxfatchSizeQueryService");

		DataSet insertDataSet = new DataSet("xp_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);
		
		insertDataSet.addColumn("SSNO", DataTypes.STRING);
		insertDataSet.addColumn("NAME", DataTypes.STRING);
		insertDataSet.addColumn("ADDRESS", DataTypes.STRING);
		
		insertDataSet.newRow();
		insertDataSet.setRowType(0, DataSet.ROW_TYPE_INSERTED);
		
		insertDataSet.set(0, "SSNO", "1234567890333");
		insertDataSet.set(0, "NAME", "Anyframe4");
		insertDataSet.set(0, "ADDRESS", "Seoul");
		
		int resultInsert = xpQueryService
				.update(queryMap, insertDataSet);
		
		DataSet searchDataset = makeSelectDataSet("%12345678%");
		
		searchDataset.setChangeStructureWithData(true);
		searchDataset.addConstantColumn("pageIndex", DataTypes.INT, 1);
		searchDataset.addConstantColumn("pageSize", DataTypes.INT,  4);
		
		try{
			DataSet resultDataSet = xpQueryService.searchWithPaging("findCustomerWithDynamic", searchDataset );
			fail("fail to check maxFetchSize in case of pagination");
		} catch (QueryServiceException e) {
			// 5. assert
			e.printStackTrace();
			assertTrue("fail to compare exception",
					e.getCause() instanceof DataRetrievalFailureException);
		}
	}
	
	/**
	 * 데스트를 위한 초기 데이터 값 세팅
	 * @throws Exception
	 */
	private void insertDataSet() throws Exception {
		Map queryMap = new HashMap();
		queryMap.put(XPQueryService.QUERY_INSERT, "createXPMaxfatchSizeQueryService");

		int resultInsert = xpQueryService
				.update(queryMap, makeInsertDataSet());
		assertEquals("Fail to insert MiPDataSet.", 3, resultInsert);

		findListDataSet(3);
	}
	
	/**
	 * 테스트를 실행 한 후 결과값을 검증하기 위해 조회
	 * @param expected
	 * @throws Exception
	 */
	private void findListDataSet(int expected) throws Exception {
		DataSet resultDataSet = xpQueryService.search(
				"findCustomerWithDynamic", makeSelectDataSet("%12345678%"));
		assertEquals("Fail to find MiPDataSet.", expected, resultDataSet
				.getRowCount());

		int totalRowCount = resultDataSet.getRowCount();
		for (int rowNum = 0; rowNum < totalRowCount; rowNum++) {
			
			assertTrue("Fail to check result.", resultDataSet.getString(rowNum, "ssno").startsWith("12345678"));
			assertTrue("Fail to check result.", resultDataSet.getString(rowNum, "name").startsWith("Anyframe"));
		}
	}
	/**
	 * 테스트를 실행 한 후 결과값을 검증하기 위해 조회
	 * @param searchKeyword
	 * @return
	 * @throws QueryServiceException
	 */
	private DataSet findDataSet(String searchKeyword)
			throws Exception {
		DataSet resultDataSet = xpQueryService.search("findMiPQueryService",
				makeSelectDataSet(searchKeyword));
		assertEquals(1, resultDataSet.getRowCount());

		return resultDataSet;
	}

	/**
	 * DataSet 세팅
	 * @return
	 */
	private DataSet makeInsertDataSet() {
		DataSet insertDataSet = new DataSet("xp_insert");
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
	 * @param searchKeyword
	 * @return
	 */
	private DataSet makeSelectDataSet(String searchKeyword) {
		DataSet selectDataSet = new DataSet("xp_select");

		selectDataSet.addColumn("SSNO", DataTypes.STRING);

		selectDataSet.newRow();

		selectDataSet.set(0, "SSNO", searchKeyword);
		return selectDataSet;
	}
	
	/**
	 * 조회 조건이 들어 있는 VariableList 세팅
	 * @return
	 */
	private VariableList makeVariantList() {
		VariableList variableList = new VariableList();
		variableList.add("SSNO", "%12345678%");
		return variableList;
	}
	
}
