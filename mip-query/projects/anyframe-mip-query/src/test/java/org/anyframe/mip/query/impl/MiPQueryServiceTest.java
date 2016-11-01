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

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.mip.query.MiPActionCommand;
import org.anyframe.mip.query.MiPQueryService;
import org.anyframe.query.exception.QueryException;
import org.anyframe.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

/**
 * TestCase Name : MiPQueryServiceTest<br>
 * <br>
 * [Description] : This TestCase accesses Database by using Dataset(MiPlatform’s
 * data return object) and VariableList. <br>
 * [Main Flow]
 * <ul>
 * <li>#1 - Positive Case : This TestCase modifies preset Database value by
 * calling for update method of MiPQueryService. It is verified to see whether
 * Database value is correctively modified by directly using Dataset setting
 * value to be modified as argument of MiPQueryService update().</li>
 * <li>#2 - Positive Case : It is verified to see whether query regarding
 * insert, update and delete is executed by using Dataset’s Status per Record.</li>
 * <li>#3 - Positive Case : In the case where there is business logic before
 * query execution, it is verified to see whether ActionCommand method is
 * correctively called for before and after Query execution and Query is
 * normally executed by implementing relevant method of ActionCommand class.</li>
 * <li>#4 - Positive Case : It is verified to see whether data matching search
 * condition comes out when search condition is set at VariantList and find
 * method of MiPQeryService is called for.</li>
 * <li>#5 - Negative Case : It is verified to see whether Exception message is
 * normally passed when wrong Query I.D. is entered.</li>
 * <li>#6 - Negative Case : It is verified to see whether Exception and message
 * take place in the case where query registered at query mapping xml file is
 * not dynamic.</li>
 * <li>#7 - Negative Case : It is verified to see whether Exception and message
 * take place in the case where query registered at query mapping xml file has
 * incorrect grammar.</li>
 * </ul>
 * 
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class MiPQueryServiceTest {

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
					statement.executeUpdate("DROP TABLE TB_MIP_TEST");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_MIP_TEST ( "
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
	 * [Flow #-1] Positive Case : This TestCase modifies preset Database value
	 * by calling for update method of MiPQueryService. It is verified to see
	 * whether Database value is correctively modified by directly using Dataset
	 * setting value to be modified as argument of MiPQueryService update().
	 * 
	 * @throws Exception
	 */
	@Test
	public void testUpdateDataSet() {
		insertDataSet();

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(MiPQueryService.QUERY_UPDATE, "updateMiPQueryService");
		int resultUpdate = mipQueryService
				.update(queryMap, makeUpdateDataSet());
		Assert.assertEquals(1, resultUpdate);

		Dataset resultDataSet = findDataSet("bbnydory00");

		assertDataSet(resultDataSet, "bbnydory00", "2008-12-01 00:00:00.0",
				12345678, 1234.5678, "Anyframe MiPQueryService Test. - UPDATE");
	}

	/**
	 * [Flow #-2] Positive Case : It is verified to see whether query regarding
	 * insert, update and delete is executed by using Dataset’s Status per
	 * Record.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProcessAllDataSet() throws Exception {
		insertDataSet();

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(MiPQueryService.QUERY_UPDATE, "updateMiPQueryService");
		queryMap.put(MiPQueryService.QUERY_INSERT, "createMiPQueryService");
		queryMap.put(MiPQueryService.QUERY_DELETE, "deleteMiPQueryService");
		int resultUpdate = mipQueryService.update(queryMap, makeAllDataSet());
		Assert.assertEquals("Fail to process all.", 3, resultUpdate);

		findListDataSet(5);

		Dataset resultDataSet = findDataSet("bbnydory00");
		assertDataSet(resultDataSet, "bbnydory00", "2008-12-01 00:00:00.0",
				12345678, 1234.5678, "Anyframe MiPQueryService Test. - UPDATE");
	}

	/**
	 * [Flow #-3] Positive Case : In the case where there is business logic
	 * before query execution, it is verified to see whether ActionCommand
	 * method is correctively called for before and after Query execution and
	 * Query is normally executed by implementing relevant method of
	 * ActionCommand class.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testProcessAllDataSetWithActionCommand() throws Exception {
		insertDataSet();

		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(MiPQueryService.QUERY_INSERT, "createMiPQueryService");
		queryMap.put(MiPQueryService.QUERY_UPDATE, "updateMiPQueryService");
		queryMap.put(MiPQueryService.QUERY_DELETE, "deleteMiPQueryService");
		int resultUpdate = mipQueryService.update(queryMap, makeAllDataSet(),
				new MiPActionCommand() {

					public void postDelete(Dataset record, int currentRow) {
					}

					public void postInsert(Dataset record, int currentRow) {
					}

					public void postUpdate(Dataset record, int currentRow) {
					}

					public void preDelete(Dataset record, int currentRow) {
					}

					public void preInsert(Dataset record, int currentRow) {
						Variant variant = new Variant();
						variant.setObject("Anyframe preUpdate");
						record.setColumn(currentRow, "TEST_VARCHAR2", variant);
					}

					public void preUpdate(Dataset record, int currentRow) {
					}
				});
		Assert.assertEquals("Fail to process all with ActionCommand.", 3,
				resultUpdate);

		Dataset resultDataSet = findDataSet("bbnydory88");

		assertDataSet(resultDataSet, "bbnydory88", "2008-12-01 00:00:00.0",
				12345678, 1234.5678, "Anyframe preUpdate");
	}

	/**
	 * [Flow #-4] Positive Case : It is verified to see whether data matching
	 * search condition comes out when search condition is set at VariantList
	 * and find method of MiPQeryService is called for.
	 */
	@Test
	public void testFindDataSetWithVariant() {
		insertDataSet();

		Dataset resultDataSet = mipQueryService.search("findMiPQueryService",
				makeVariantList());
		Assert.assertEquals(1, resultDataSet.getRowCount());

		assertDataSet(resultDataSet, "bbnydory00", "2008-12-01 00:00:00.0",
				12345678, 1234.5678, "Anyframe MiPQueryService Test.");
	}

	/**
	 * [Flow #-5] Negative Case : It is verified to see whether Exception
	 * message is normally passed when wrong Query I.D. is entered.
	 */
	@Test
	public void testFindDataSetWithWrongQueryId() {
		try {
			mipQueryService.search("notexistqueryid", makeVariantList());
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
	 * [Flow #-6] Negative Case : It is verified to see whether Exception and
	 * message take place in the case where query registered at query mapping
	 * xml file is not dynamic.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithoutDynamic() {
		try {
			mipQueryService.search("findMiPQueryServiceWithoutDynamic",
					makeVariantList());
			Assert.fail("Fail to throw exception.");
		} catch (Exception e) {
			Assert.assertTrue("Fail to check exception.",
					e instanceof QueryException);
			Assert
					.assertEquals(
							"Fail to compare exception message.",
							"Query Service : queryId [findMiPQueryServiceWithoutDynamic] is not dynamic statements.",
							((QueryException) e).getMessage());
		}
	}

	/**
	 * [Flow #-7] Negative Case : It is verified to see whether Exception and
	 * message take place in the case where query registered at query mapping
	 * xml file has incorrect grammar.
	 * 
	 * @throws Exception
	 */
	@Test
	public void testFindDataSetWithWrongQuery() {
		try {
			mipQueryService.search("findMiPQueryServiceWithWrongQuery",
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
		}
	}

	/**
	 * initial data value setting for test
	 * 
	 * @throws Exception
	 */
	private void insertDataSet() {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(MiPQueryService.QUERY_INSERT, "createMiPQueryService");

		int resultInsert = mipQueryService
				.update(queryMap, makeInsertDataSet());
		Assert.assertEquals("Fail to insert MiPDataSet.", 3, resultInsert);

		findListDataSet(3);
	}

	/**
	 * Return value is searched for verification after test execution.
	 * 
	 * @param expected
	 * @throws Exception
	 */
	private void findListDataSet(int expected) {
		Dataset resultDataSet = mipQueryService.search(
				"findListMiPQueryService", makeSelectDataSet("%bbnydory%"));
		Assert.assertEquals("Fail to find MiPDataSet.", expected, resultDataSet
				.getRowCount());

		int totalRowCount = resultDataSet.getRowCount();
		for (int rowNum = 0; rowNum < totalRowCount; rowNum++) {
			Variant testChar = resultDataSet.getColumn(rowNum, "TEST_CHAR");
			Assert.assertTrue("Fail to check result.", testChar.getString()
					.startsWith("bbnydory"));

			Variant testDate = resultDataSet.getColumn(rowNum, "TEST_DATE");
			Assert.assertEquals("Fail to check result.",
					"2008-12-01 00:00:00.0", testDate.getDate().toString());

			Variant testNumber = resultDataSet.getColumn(rowNum, "TEST_NUMBER");
			Assert.assertEquals("Fail to check result.", 12345678, testNumber
					.getDouble().intValue());

			Variant testDouble = resultDataSet.getColumn(rowNum, "TEST_DOUBLE");
			Assert.assertEquals("Fail to check result.", 1234.5678, testDouble
					.getDouble().doubleValue());

			Variant testVarchar = resultDataSet.getColumn(rowNum,
					"TEST_VARCHAR2");
			Assert.assertTrue("Fail to check result.", testVarchar.getString()
					.startsWith("Anyframe MiPQueryService Test."));

		}
	}

	/**
	 * Return value is searched for verification after test execution.
	 * 
	 * @param searchKeyword
	 * @return
	 */
	private Dataset findDataSet(String searchKeyword) {
		Dataset resultDataSet = mipQueryService.search("findMiPQueryService",
				makeSelectDataSet(searchKeyword));
		Assert.assertEquals(1, resultDataSet.getRowCount());

		return resultDataSet;
	}

	/**
	 * Dataset return value is tested.
	 * 
	 * @param resultDataSet
	 * @param col1
	 * @param col2
	 * @param col3
	 * @param col4
	 * @param col5
	 */
	private void assertDataSet(Dataset resultDataSet, String col1, String col2,
			int col3, double col4, String col5) {
		Variant testChar = resultDataSet.getColumn(0, "TEST_CHAR");
		Assert
				.assertEquals("Fail to check result.", col1, testChar
						.getString());

		Variant testDate = resultDataSet.getColumn(0, "TEST_DATE");
		Assert.assertEquals("Fail to check result.", col2, testDate.getDate()
				.toString());

		Variant testNumber = resultDataSet.getColumn(0, "TEST_NUMBER");
		Assert.assertEquals("Fail to check result.", col3, testNumber
				.getDouble().intValue());

		Variant testDouble = resultDataSet.getColumn(0, "TEST_DOUBLE");
		Assert.assertEquals("Fail to check result.", col4, testDouble
				.getDouble().doubleValue());

		Variant testVarchar = resultDataSet.getColumn(0, "TEST_VARCHAR2");
		Assert.assertEquals("Fail to check result.", col5, testVarchar
				.getString());
	}

	/**
	 * Dataset Setting
	 * 
	 * @return
	 */
	private Dataset makeInsertDataSet() {
		Dataset insertDataSet = new Dataset();
		insertDataSet.setUpdate(true);
		insertDataSet.setDataSetID("bbnydory_insert");
		insertDataSet.addStringColumn("TEST_CHAR");
		insertDataSet.addStringColumn("TEST_VARCHAR2");
		insertDataSet.addIntegerColumn("TEST_NUMBER");
		insertDataSet.addDecimalColumn("TEST_DOUBLE");
		insertDataSet.addDateColumn("TEST_DATE");

		insertDataSet.appendRow();
		Variant variant = new Variant();
		variant.setObject("bbnydory00");
		insertDataSet.setColumn(0, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test.");
		insertDataSet.setColumn(0, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		insertDataSet.setColumn(0, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		insertDataSet.setColumn(0, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		insertDataSet.setColumn(0, "TEST_DATE", variant);

		insertDataSet.appendRow();
		variant = new Variant();
		variant.setObject("bbnydory01");
		insertDataSet.setColumn(1, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test.");
		insertDataSet.setColumn(1, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		insertDataSet.setColumn(1, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		insertDataSet.setColumn(1, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		insertDataSet.setColumn(1, "TEST_DATE", variant);

		insertDataSet.appendRow();
		variant = new Variant();
		variant.setObject("bbnydory02");
		insertDataSet.setColumn(2, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test.");
		insertDataSet.setColumn(2, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		insertDataSet.setColumn(2, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		insertDataSet.setColumn(2, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		insertDataSet.setColumn(2, "TEST_DATE", variant);
		return insertDataSet;
	}

	/**
	 * Dataset setting for update test
	 * 
	 * @return
	 */
	private Dataset makeUpdateDataSet() {
		Dataset updateDataSet = new Dataset();
		updateDataSet.setDataSetID("bbnydory_update");
		updateDataSet.addStringColumn("TEST_CHAR");
		updateDataSet.addStringColumn("TEST_VARCHAR2");
		updateDataSet.addIntegerColumn("TEST_NUMBER");
		updateDataSet.addDecimalColumn("TEST_DOUBLE");
		updateDataSet.addDateColumn("TEST_DATE");

		updateDataSet.appendRow();
		updateDataSet.setUpdate(true);
		Variant variant = new Variant();
		variant.setObject("bbnydory00");
		updateDataSet.setColumn(0, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test. - UPDATE");
		updateDataSet.setColumn(0, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		updateDataSet.setColumn(0, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		updateDataSet.setColumn(0, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		updateDataSet.setColumn(0, "TEST_DATE", variant);

		return updateDataSet;
	}

	/**
	 * Dataset setting for upate, insert and delete test
	 * 
	 * @return
	 * @throws Exception
	 */
	private Dataset makeAllDataSet() throws IOException {
		Dataset allDataSet = new Dataset();
		allDataSet.setDataSetID("bbnydory_all");
		allDataSet.addStringColumn("TEST_CHAR");
		allDataSet.addStringColumn("TEST_VARCHAR2");
		allDataSet.addIntegerColumn("TEST_NUMBER");
		allDataSet.addDecimalColumn("TEST_DOUBLE");
		allDataSet.addDateColumn("TEST_DATE");

		// for UPDATE
		allDataSet.appendRow();
		allDataSet.setUpdate(true);
		Variant variant = new Variant();
		variant.setObject("bbnydory00");
		allDataSet.setColumn(0, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test. - UPDATE");
		allDataSet.setColumn(0, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		allDataSet.setColumn(0, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		allDataSet.setColumn(0, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		allDataSet.setColumn(0, "TEST_DATE", variant);

		// for INSERT
		allDataSet.appendRow();
		variant = new Variant();
		variant.setObject("bbnydory99");
		allDataSet.setColumn(1, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test.");
		allDataSet.setColumn(1, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		allDataSet.setColumn(1, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		allDataSet.setColumn(1, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		allDataSet.setColumn(1, "TEST_DATE", variant);

		// for INSERT
		allDataSet.appendRow();
		allDataSet.setUpdate(true);
		variant = new Variant();
		variant.setObject("bbnydory88");
		allDataSet.setColumn(2, "TEST_CHAR", variant);
		variant = new Variant();
		variant.setObject("Anyframe MiPQueryService Test.");
		allDataSet.setColumn(2, "TEST_VARCHAR2", variant);
		variant = new Variant();
		variant.setObject("12345678");
		allDataSet.setColumn(2, "TEST_NUMBER", variant);
		variant = new Variant();
		variant.setObject("1234.5678");
		allDataSet.setColumn(2, "TEST_DOUBLE", variant);
		variant = new Variant();
		variant.setObject(getDate());
		allDataSet.setColumn(2, "TEST_DATE", variant);

		allDataSet.printDataset();
		return allDataSet;
	}

	/**
	 * Dataset setting with search condition
	 * 
	 * @param searchKeyword
	 * @return
	 */
	private Dataset makeSelectDataSet(String searchKeyword) {
		Dataset selectDataSet = new Dataset();
		selectDataSet.setDataSetID("bbnydory_select");
		selectDataSet.addStringColumn("SEARCH_KEYWORD");

		selectDataSet.appendRow();
		Variant variant = new Variant();
		variant.setObject(searchKeyword);
		selectDataSet.setColumn(0, "SEARCH_KEYWORD", variant);
		return selectDataSet;
	}

	/**
	 * VariableList setting with search condition
	 * 
	 * @return
	 */
	private VariableList makeVariantList() {
		VariableList variableList = new VariableList();
		Variant variant = new Variant();
		variant.setObject("bbnydory00");
		variableList.addVariable("SEARCH_KEYWORD", variant);
		return variableList;
	}

	private Timestamp getDate() {
		return DateUtil.stringToTimestamp("2008-12-01", "yyyy-MM-dd");
	}
}
