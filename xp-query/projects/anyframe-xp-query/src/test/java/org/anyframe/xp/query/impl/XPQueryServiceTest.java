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
package org.anyframe.xp.query.impl;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.query.exception.QueryException;
import org.anyframe.util.DateUtil;
import org.anyframe.xp.query.XPActionCommand;
import org.anyframe.xp.query.XPQueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;

/**
 * TestCase Name : XPQueryServiceTest<br>
 * <br>
 * [Description] : XPlatform의 data 전달 객체인 DataSet과 VariableList를 이용해 Database에
 * 접근하는 XPQueryService의 TestCase다. <br>
 * [Main Flow]
 * <ul>
 * <li>#1 - Positive Case : 미리 세팅되어 있는 Database의 값을 XPQueryService의 update
 * method를 호출해 값을 수정하는 TestCase다. 수정될 값이 세팅되어 있는 DataSet를 XPQueryService
 * update()의 argument로 직접 사용해 Database의 값이 제대로 수정 됐는지 검증한다.</li>
 * <li>#2 - Positive Case : DataSet의 Record별 Stauts값을 이용해 insert, update,
 * delete에 해당하는 query 실행을 검증한다.</li>
 * <li>#3 - Positive Case : query가 실행 되기 전 비즈니스 로직의 있을 경우 ActionComman클래스의
 * 해당메소드를 구현해서 Query실행 전, 후 ActionCommand의 메소드가 정상적으로 호출 되는지 Query 실행이 정상적으로
 * 동작하는지 검증한다.</li>
 * <li>#4 - Positive Case : VariantList에 조회조건을 세팅하고 XPQueryService의 find method를
 * 호출 했을 때 조회조건에 맞는 데이터가 조회되는지 검증한다.</li>
 * <li>#5 - Negative Case : 잘못된 Query Id를 입력했을 때 Exception 메세지가 정확하게 전달되는지 검증한다.
 * </li>
 * <li>#6 - Negative Case : query mapping xml파일에 등록된 query가 dynamic가 아닐 경우 발생하는
 * exception과 메세지를 검증한다.</li>
 * <li>#7 - Negative Case : query mapping xml파일에 등록된 query가 잘못된 문법일 경우 발생하는
 * exception과 메세지를 검증한다.</li>
 * </ul>
 * 
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class XPQueryServiceTest {
	private final static String DATE_PATTERN = "yyyy-MM-dd";

	@Inject
	private DataSource dataSource;

	@Inject
	private XPQueryService xpQueryService;

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
					statement.executeUpdate("DROP TABLE TB_XP_TEST");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_XP_TEST ( "
						+ "TEST_CHAR CHAR(10), "
						+ "TEST_VARCHAR2 VARCHAR2(255),"
						+ "TEST_NUMBER NUMBER(13),"
						+ "TEST_DOUBLE NUMBER(8,4)," + "TEST_DATE DATE" + ")");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : 미리 세팅되어 있는 Database의 값을 XPQueryService의 update
	 * method를 호출해 값을 수정하는 TestCase다. 수정될 값이 세팅되어 있는 DataSet를 XPQueryService
	 * update()의 argument로 직접 사용해 Database의 값이 제대로 수정 됐는지 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateDataSet() {
		insertDataSet();

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(XPQueryService.QUERY_UPDATE, "updateXPQueryService");
		int resultUpdate = xpQueryService.update(queryMap, makeUpdateDataSet());
		Assert.assertEquals(1, resultUpdate);

		DataSet resultDataSet = findDataSet("bbnydory00");

		assertDataSet(resultDataSet, "bbnydory00", "2012-12-01", 12345678,
				1234.5678, "Anyframe XPQueryService Test. - UPDATE");
	}

	/**
	 * [Flow #-2] Positive Case : DataSet의 Record별 Stauts값을 이용해 insert, update,
	 * delete에 해당하는 query 실행을 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProcessAllDataSet() {
		insertDataSet();

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(XPQueryService.QUERY_UPDATE, "updateXPQueryService");
		queryMap.put(XPQueryService.QUERY_INSERT, "createXPQueryService");
		queryMap.put(XPQueryService.QUERY_DELETE, "deleteXPQueryService");
		int resultUpdate = xpQueryService.update(queryMap, makeAllDataSet());
		Assert.assertEquals("Fail to process all.", 3, resultUpdate);

		findListDataSet(5);

		DataSet resultDataSet = findDataSet("bbnydory00");
		assertDataSet(resultDataSet, "bbnydory00", "2012-12-01", 12345678,
				1234.5678, "Anyframe XPQueryService Test. - UPDATE");
	}

	/**
	 * [Flow #-3] Positive Case : query가 실행 되기 전 비즈니스 로직의 있을 경우 ActionComman클래스의
	 * 해당메소드를 구현해서 Query실행 전, 후 ActionCommand의 메소드가 정상적으로 호출 되는지 Query 실행이 정상적으로
	 * 동작하는지 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProcessAllDataSetWithActionCommand() {
		insertDataSet();

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(XPQueryService.QUERY_INSERT, "createXPQueryService");
		queryMap.put(XPQueryService.QUERY_UPDATE, "updateXPQueryService");
		queryMap.put(XPQueryService.QUERY_DELETE, "deleteXPQueryService");
		int resultUpdate = xpQueryService.update(queryMap, makeAllDataSet(),
				new XPActionCommand() {

					public void postDelete(DataSet record, int currentRow) {
					}

					public void postInsert(DataSet record, int currentRow) {
					}

					public void postUpdate(DataSet record, int currentRow) {
					}

					public void preDelete(DataSet record, int currentRow) {
					}

					public void preInsert(DataSet record, int currentRow) {
						record.set(currentRow, "TEST_VARCHAR2",
								"Anyframe preUpdate");
					}

					public void preUpdate(DataSet record, int currentRow) {
					}
				});
		Assert.assertEquals("Fail to process all with ActionCommand.", 3,
				resultUpdate);

		DataSet resultDataSet = findDataSet("bbnydory88");

		assertDataSet(resultDataSet, "bbnydory88", "2012-12-01", 12345678,
				1234.5678, "Anyframe preUpdate");
	}

	/**
	 * [Flow #-4] Positive Case : VariantList에 조회조건을 세팅하고 XPQueryService의 find
	 * method를 호출 했을 때 조회조건에 맞는 데이터가 조회되는지 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithVariant() {
		insertDataSet();

		DataSet resultDataSet = xpQueryService.search("findXPQueryService",
				makeVariantList());
		Assert.assertEquals(1, resultDataSet.getRowCount());

		assertDataSet(resultDataSet, "bbnydory00", "2012-12-01", 12345678,
				1234.5678, "Anyframe XPQueryService Test.");
	}

	/**
	 * [Flow #-5] Negative Case : 잘못된 Query Id를 입력했을 때 Exception 메세지가 정확하게 전달되는지
	 * 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithWrongQueryId() throws QueryException {
		try {
			xpQueryService.search("notexistqueryid", makeVariantList());
			Assert.fail("Fail to throw exception.");
		} catch (Exception e) {
			Assert.assertTrue("Fail to check exception.",
					e instanceof QueryException);
			Assert
					.assertEquals(
							"Fail to compare exception message.",
							"Query Service : Fail to find queryId [notexistqueryid] in query mappings.",
							((QueryException) e).getMessage());
		}
	}

	/**
	 * [Flow #-6] Negative Case : query mapping xml파일에 등록된 query가 dynamic가 아닐 경우
	 * 발생하는 exception과 메세지를 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithoutDynamic() throws QueryException {
		try {
			xpQueryService.search("findXPQueryServiceWithoutDynamic",
					makeVariantList());
			Assert.fail("Fail to throw exception.");
		} catch (Exception e) {
			Assert.assertTrue("Fail to check exception.",
					e instanceof QueryException);
			Assert
					.assertEquals(
							"Fail to compare exception message.",
							"Query Service : queryId [findXPQueryServiceWithoutDynamic] is not dynamic statements.",
							((QueryException) e).getMessage());
		}
	}

	/**
	 * [Flow #-7] Negative Case : Negative Case : query mapping xml파일에 등록된
	 * query가 잘못된 문법일 경우 발생하는 exception과 메세지를 검증한다.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithWrongQuery() throws QueryException {
		try {
			xpQueryService.search("findXPQueryServiceWithWrongQuery",
					makeVariantList());
			Assert.fail("Fail to throw exception.");
		} catch (Exception e) {
			Assert.assertTrue(e instanceof QueryException);
			QueryException qe = (QueryException) e;
			Assert.assertEquals("Fail to compare sql error code.", "904", qe
					.getSqlErrorCode());
			Assert.assertEquals("Fail to compare sql error message.",
					"ORA-00904: \"A\".\"NOTEXITCOLUMN\": 부적합한 식별자\n", qe
							.getSqlErrorMessage());
			// assertEquals("Fail to compare sql error message.",
			// "ORA-00904: 열명이 부적합합니다\n", qe.getSqlErrorMessage());
		}
	}

	@Test
	public void testBatchSaveAll() throws QueryException {
		try {
			insertDataSet();
			DataSet inDs = makeAllDataSet();
			int resultUpdate = xpQueryService.batchCreate(
					"createXPQueryService", inDs);
			resultUpdate += xpQueryService.batchUpdate("updateXPQueryService",
					inDs);
			resultUpdate += xpQueryService.batchRemove("deleteXPQueryService",
					inDs);

			findListDataSet(5);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 데스트를 위한 초기 데이터 값 세팅
	 * 
	 * @throws Exception
	 */
	private void insertDataSet() throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(XPQueryService.QUERY_INSERT, "createXPQueryService");

		int resultInsert = xpQueryService.update(queryMap, makeInsertDataSet());
		Assert.assertEquals("Fail to insert XPDataSet.", 3, resultInsert);

		findListDataSet(3);
	}

	/**
	 * 테스트를 실행 한 후 결과값을 검증하기 위해 조회
	 * 
	 * @param expected
	 * @throws Exception
	 */
	private void findListDataSet(int expected) throws QueryException {
		DataSet resultDataSet = xpQueryService.search("findListXPQueryService",
				makeSelectDataSet("%bbnydory%"));
		Assert.assertEquals("Fail to find XPDataSet.", expected, resultDataSet
				.getRowCount());

		int totalRowCount = resultDataSet.getRowCount();
		for (int rowNum = 0; rowNum < totalRowCount; rowNum++) {
			Assert.assertTrue("Fail to check result.", resultDataSet.getString(
					rowNum, "TEST_CHAR").startsWith("bbnydory"));

			Assert.assertEquals("Fail to check result.", "2012-12-01", DateUtil
					.dateToString(resultDataSet
							.getDateTime(rowNum, "TEST_DATE"), DATE_PATTERN));

			Assert.assertEquals("Fail to check result.", 12345678,
					((BigDecimal) resultDataSet
							.getObject(rowNum, "TEST_NUMBER")).intValue());

			Assert.assertEquals("Fail to check result.", 1234.5678,
					resultDataSet.getDouble(rowNum, "TEST_DOUBLE"));

			Assert.assertTrue("Fail to check result.", resultDataSet.getString(
					rowNum, "TEST_VARCHAR2").startsWith(
					"Anyframe XPQueryService Test."));

		}
	}

	/**
	 * 테스트를 실행 한 후 결과값을 검증하기 위해 조회
	 * 
	 * @param searchKeyword
	 * @return
	 * @throws QueryException
	 */
	private DataSet findDataSet(String searchKeyword) throws QueryException {
		DataSet resultDataSet = xpQueryService.search("findXPQueryService",
				makeSelectDataSet(searchKeyword));
		Assert.assertEquals(1, resultDataSet.getRowCount());

		return resultDataSet;
	}

	/**
	 * DataSet의 결과값을 테스트
	 * 
	 * @param resultDataSet
	 * @param col1
	 * @param col2
	 * @param col3
	 * @param col4
	 * @param col5
	 */
	private void assertDataSet(DataSet resultDataSet, String col1, String col2,
			int col3, double col4, String col5) {
		Assert.assertEquals("Fail to check result.", col1, resultDataSet
				.getString(0, "TEST_CHAR"));

		Assert.assertEquals("Fail to check result.", col2, DateUtil
				.dateToString(resultDataSet.getDateTime(0, "TEST_DATE"),
						DATE_PATTERN));

		Assert.assertEquals("Fail to check result.", col3,
				((BigDecimal) resultDataSet.getObject(0, "TEST_NUMBER"))
						.intValue());

		Assert.assertEquals("Fail to check result.", col4, resultDataSet
				.getDouble(0, "TEST_DOUBLE"));

		Assert.assertEquals("Fail to check result.", col5, resultDataSet
				.getString(0, "TEST_VARCHAR2"));
	}

	/**
	 * DataSet 세팅
	 * 
	 * @return
	 */
	private DataSet makeInsertDataSet() {
		DataSet insertDataSet = new DataSet("bbnydory_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		insertDataSet.addColumn("TEST_CHAR", DataTypes.STRING);
		insertDataSet.addColumn("TEST_VARCHAR2", DataTypes.STRING);
		insertDataSet.addColumn("TEST_NUMBER", DataTypes.INT);
		insertDataSet.addColumn("TEST_DOUBLE", DataTypes.BIG_DECIMAL);
		insertDataSet.addColumn("TEST_DATE", DataTypes.DATE);

		insertDataSet.newRow();
		insertDataSet.setRowType(0, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(0, "TEST_CHAR", "bbnydory00");
		insertDataSet.set(0, "TEST_VARCHAR2", "Anyframe XPQueryService Test.");
		insertDataSet.set(0, "TEST_NUMBER", 12345678);
		insertDataSet.set(0, "TEST_DOUBLE", 1234.5678);
		insertDataSet.set(0, "TEST_DATE", getDate());

		insertDataSet.newRow();
		insertDataSet.setRowType(1, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(1, "TEST_CHAR", "bbnydory01");
		insertDataSet.set(1, "TEST_VARCHAR2", "Anyframe XPQueryService Test.");
		insertDataSet.set(1, "TEST_NUMBER", 12345678);
		insertDataSet.set(1, "TEST_DOUBLE", 1234.5678);
		insertDataSet.set(1, "TEST_DATE", getDate());

		insertDataSet.newRow();
		insertDataSet.setRowType(2, DataSet.ROW_TYPE_INSERTED);

		insertDataSet.set(2, "TEST_CHAR", "bbnydory02");
		insertDataSet.set(2, "TEST_VARCHAR2", "Anyframe XPQueryService Test.");
		insertDataSet.set(2, "TEST_NUMBER", 12345678);
		insertDataSet.set(2, "TEST_DOUBLE", 1234.5678);
		insertDataSet.set(2, "TEST_DATE", getDate());

		return insertDataSet;
	}

	/**
	 * update 테스트를 위하 DataSet 세팅
	 * 
	 * @return
	 */
	private DataSet makeUpdateDataSet() {
		DataSet updateDataSet = new DataSet("bbnydory_update");
		updateDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		updateDataSet.addColumn("TEST_CHAR", DataTypes.STRING);
		updateDataSet.addColumn("TEST_VARCHAR2", DataTypes.STRING);
		updateDataSet.addColumn("TEST_NUMBER", DataTypes.INT);
		updateDataSet.addColumn("TEST_DOUBLE", DataTypes.BIG_DECIMAL);
		updateDataSet.addColumn("TEST_DATE", DataTypes.DATE);

		updateDataSet.newRow();
		updateDataSet.setRowType(0, DataSet.ROW_TYPE_UPDATED);

		updateDataSet.set(0, "TEST_CHAR", "bbnydory00");
		updateDataSet.set(0, "TEST_VARCHAR2",
				"Anyframe XPQueryService Test. - UPDATE");
		updateDataSet.set(0, "TEST_NUMBER", 12345678);
		updateDataSet.set(0, "TEST_DOUBLE", 1234.5678);
		updateDataSet.set(0, "TEST_DATE", getDate());

		return updateDataSet;
	}

	/**
	 * update, insert, delete테스트를 위한 DataSet 세팅
	 * 
	 * @return
	 * @throws Exception
	 */
	private DataSet makeAllDataSet() {
		DataSet allDataSet = new DataSet("bbnydory_all");
		allDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		allDataSet.addColumn("TEST_CHAR", DataTypes.STRING);
		allDataSet.addColumn("TEST_VARCHAR2", DataTypes.STRING);
		allDataSet.addColumn("TEST_NUMBER", DataTypes.INT);
		allDataSet.addColumn("TEST_DOUBLE", DataTypes.BIG_DECIMAL);
		allDataSet.addColumn("TEST_DATE", DataTypes.DATE);

		// for UPDATE
		allDataSet.newRow();

		allDataSet.setRowType(0, DataSet.ROW_TYPE_UPDATED);

		allDataSet.set(0, "TEST_CHAR", "bbnydory00");
		allDataSet.set(0, "TEST_VARCHAR2",
				"Anyframe XPQueryService Test. - UPDATE");
		allDataSet.set(0, "TEST_NUMBER", 12345678);
		allDataSet.set(0, "TEST_DOUBLE", 1234.5678);
		allDataSet.set(0, "TEST_DATE", getDate());

		// for INSERT
		allDataSet.newRow();
		allDataSet.setRowType(1, DataSet.ROW_TYPE_INSERTED);

		allDataSet.set(1, "TEST_CHAR", "bbnydory99");
		allDataSet.set(1, "TEST_VARCHAR2", "Anyframe XPQueryService Test.");
		allDataSet.set(1, "TEST_NUMBER", 12345678);
		allDataSet.set(1, "TEST_DOUBLE", 1234.5678);
		allDataSet.set(1, "TEST_DATE", getDate());

		// for INSERT
		allDataSet.newRow();
		allDataSet.setRowType(2, DataSet.ROW_TYPE_INSERTED);

		allDataSet.set(2, "TEST_CHAR", "bbnydory88");
		allDataSet.set(2, "TEST_VARCHAR2", "Anyframe XPQueryService Test.");
		allDataSet.set(2, "TEST_NUMBER", 12345678);
		allDataSet.set(2, "TEST_DOUBLE", 1234.5678);
		allDataSet.set(2, "TEST_DATE", getDate());

		// allDataSet.printDataSet();
		System.out.println(allDataSet.toString());
		return allDataSet;
	}

	/**
	 * 조회 조건이 들어 있는 DataSet세팅
	 * 
	 * @param searchKeyword
	 * @return
	 */
	private DataSet makeSelectDataSet(String searchKeyword) {
		DataSet selectDataSet = new DataSet("bbnydory_select");

		selectDataSet.addColumn("SEARCH_KEYWORD", DataTypes.STRING);

		selectDataSet.newRow();

		selectDataSet.set(0, "SEARCH_KEYWORD", searchKeyword);
		return selectDataSet;
	}

	/**
	 * 조회 조건이 들어 있는 VariableList 세팅
	 * 
	 * @return
	 */
	private VariableList makeVariantList() {
		VariableList variableList = new VariableList();
		variableList.add("SEARCH_KEYWORD", "bbnydory00");
		return variableList;
	}

	private Timestamp getDate() {
		return DateUtil.stringToTimestamp("2012-12-01", "yyyy-MM-dd");
	}
}
