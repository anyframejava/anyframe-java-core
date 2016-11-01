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
package org.anyframe.mip.query.service.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.mip.query.service.MiPService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * TestCase Name : MiPServiceTest <br>
 * <br>
 * [Description] : By calling for method provided by MiPService, it is tested
 * whether targeted function is operated in normal fashion. <br>
 * [Main Flow]
 * <ul>
 * <li>#1 - Positive Case : When search field and keyword area are set at
 * Dataset, list is searched with Dataset. After setting search condition and
 * search keyword at two Datasets, expected value and search return value are
 * compared by executing query statement in normal fashion.</li>
 * <li>#2 - Positive Case : After setting search field and search word at
 * VariantList, executing search query with it and compare search return values,
 * it is checked whether search is correctively executed.</li>
 * <li>#3 - Positive Case : After setting the number of list displaying at one
 * page with page number and page unit at Constant Column. When paging is
 * searched with it, it is checked whether targeted list is searched.</li>
 * <li>#4 - Positive Case : After setting data for storing at VariantList, it is
 * checked whether value is added at Database by calling create method.</li>
 * <li>#5 - Negative Case : After setting data for storing at Dataset, it is
 * checked whether value is added at Database by calling create method.</li>
 * <li>#6 - Negative Case : After setting data for modification at VariantList,
 * it is checked whether value is modified at Database by calling update method.
 * </li>
 * <li>#7 - Negative Case : After setting data for modification at Dataset, it
 * is checked whether value is modified at Database by calling update method.</li>
 * <li>#-8 Positive Case : After setting data for deletion at VariantList, it is
 * checked whether value is deleted at Database by calling remove method.</li>
 * <li>#-9 Positive Case : After setting data for deletion at Dataset, it is
 * checked whether value is deleted at Database by calling remove method.</li>
 * <li>#-10 Positive Case : After setting data for addition, modification and
 * deletion at Dataset, it is checked whether value is added, modified and
 * deleted at Database by calling saveALL method.</li>
 * 
 * </li>
 * </ul>
 * 
 * @author Jonghoon, Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class MiPServiceTest {

	private static short TYPE_NORMAL = 1;
	private static short TYPE_INSERT = 2;
	// private static short TYPE_UPDATE = 4;

	@Inject
	private MiPService mipService;

	@Inject
	private DataSource dataSource;

	@Before
	public final void onSetUp() {
		// Test DB Setting
		try {
			Connection conn = dataSource.getConnection();
			Statement statement = conn.createStatement();
			try {
				try {
					// drop table
					statement.execute("DROP TABLE TEST_BOARD");
				} catch (SQLException e) {
					System.out.println("Unable to drop table." + e);
				}
				// create table
				statement
						.execute("CREATE TABLE TEST_BOARD("
								+ "BOARD_NO VARCHAR(20) NOT NULL,"
								+ "BOARD_TITLE VARCHAR(50) NOT NULL,"
								+ "CONTENTS VARCHAR(255),"
								+ "REG_ID VARCHAR(20),"
								+ "REG_DATE VARCHAR(10),"
								+ "CONSTRAINT PK_BOARD_MIP PRIMARY KEY(BOARD_NO)"
								+ ")");
				// insert data
				statement.executeUpdate("INSERT INTO TEST_BOARD VALUES"
						+ "('BOARD-00001','TITLE-0001','CONTENTS-0001'"
						+ ",'TEST','2009-06-23')");
				statement.executeUpdate("INSERT INTO TEST_BOARD VALUES"
						+ "('BOARD-00002','TITLE-0002','CONTENTS-0002'"
						+ ",'TEST','2009-06-23')");
				statement.executeUpdate("INSERT INTO TEST_BOARD VALUES"
						+ "('BOARD-00003','TITLE-0003','CONTENTS-0003'"
						+ ",'TEST','2009-06-23')");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : When search condition is set at Dataset, list
	 * is searched with Dataset. After setting search condition and search
	 * keyword at two Datasets, expected value and search return value are
	 * compared by executing query statement in normal fashion.
	 */
	@Test
	public void testGetListUsingDataset() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 2);
		inVl.add("querySet1", "findBoardList");
		inVl.add("querySet2", "findBoardList");

		Dataset dsSearch1 = new Dataset("querySet1");
		dsSearch1.addStringColumn("SEARCH_CONDITION");
		dsSearch1.addStringColumn("SEARCH_KEYWORD");

		dsSearch1.appendRow();
		dsSearch1.setColumn(0, "SEARCH_CONDITION", "BOARD_NO");
		dsSearch1.setColumn(0, "SEARCH_KEYWORD", "BOARD-00002");
		inDl.addDataset("querySet1", dsSearch1);

		Dataset dsSearch2 = new Dataset("querySet2");
		dsSearch2.addStringColumn("SEARCH_CONDITION");
		dsSearch2.addStringColumn("SEARCH_KEYWORD");

		dsSearch2.appendRow();
		dsSearch2.setColumn(0, "SEARCH_CONDITION", "BOARD_TITLE");
		dsSearch2.setColumn(0, "SEARCH_KEYWORD", "0001");
		inDl.addDataset("querySet2", dsSearch2);

		mipService.getList(inVl, inDl, outVl, outDl);

		Assert.assertEquals(2, outDl.size());

		Dataset ds1 = outDl.get("querySet1");
		Dataset ds2 = outDl.get("querySet2");

		Assert
				.assertEquals("BOARD-00002", ds1.getColumnAsString(0,
						"BOARD_NO"));
		Assert.assertEquals("TITLE-0001", ds2.getColumnAsString(0,
				"BOARD_TITLE"));
	}

	/**
	 * [Flow #-2] Positive Case :After setting search field and search word at
	 * VariantList, executing search query with it and compare search return
	 * values, it is checked whether search is correctively executed.
	 */
	@Test
	public void testGetListUsingVriableList() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "findBoardList");

		inVl.add("SEARCH_CONDITION", "BOARD_NO");
		inVl.add("SEARCH_KEYWORD", "BOARD-00002");
		mipService.getList(inVl, inDl, outVl, outDl);

		Dataset ds = outDl.get("querySet1");

		Assert.assertEquals("BOARD-00002", ds.getColumnAsString(0, "BOARD_NO"));
	}

	/**
	 * [Flow #-3] Positive Case :After setting the number of list displaying at
	 * one page with page number and page unit at Constant Column. When paging
	 * is searched with it, it is checked whether targeted list is searched.
	 */
	@Test
	public void testGetListWithPage() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "findBoardList");

		Dataset dsSearch = new Dataset("querySet1");
		dsSearch.addConstColumn("pageIndex", 2);
		dsSearch.addConstColumn("pageSize", 1);
		dsSearch.addConstColumn("pageUnit", 3);

		inDl.add("querySet1", dsSearch);

		mipService.getPagingList(inVl, inDl, outVl, outDl);
		Dataset ds = outDl.getDataset("querySet1");

		Assert.assertEquals(3.0, ds.getConstColumn("totalCount").getDouble()
				.doubleValue(), 0.00);
		Assert.assertEquals("BOARD-00002", ds.getColumnAsString(0, "BOARD_NO"));

	}

	/**
	 * [Flow #-4] Positive Case : After setting data for storing at VariantList,
	 * it is checked whether value is added at Database by calling for create
	 * method.
	 */
	@Test
	public void testInsertVariantList() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "createBoard");

		inVl.add("BOARD_NO", "BOARD-00010");
		inVl.add("BOARD_TITLE", "TITLE-00010");
		inVl.add("CONTENTS", "CONTENTS-00010");
		inVl.add("REG_ID", "INSERT_VARIANT");
		inVl.add("REG_DATE", "2009-09-07");

		mipService.create(inVl, inDl, outVl, outDl);
		Assert.assertEquals("1", outVl.get("querySet1").getValue().getString());
	}

	/**
	 * [Flow #-5] Positive Case : After setting data for storing at VariantList,
	 * it is checked whether value is added at Database by calling for create
	 * method.
	 */
	@Test
	public void testInsertDataset() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 2);
		inVl.add("querySet1", "createBoard");
		inVl.add("querySet2", "createBoard");

		Dataset dsCreate1 = new Dataset("querySet1");
		dsCreate1.addStringColumn("BOARD_NO");
		dsCreate1.addStringColumn("BOARD_TITLE");
		dsCreate1.addStringColumn("CONTENTS");
		dsCreate1.addStringColumn("REG_ID");
		dsCreate1.addDateColumn("REG_DATE");

		dsCreate1.setUpdate(true);
		dsCreate1.appendRow();
		dsCreate1.setColumn(0, "BOARD_NO", "BOARD-00004");
		dsCreate1.setColumn(0, "BOARD_TITLE", "TITLE-00004");
		dsCreate1.setColumn(0, "CONTENTS", "CONTENTS-00004");
		dsCreate1.setColumn(0, "REG_ID", "INSERT_TEST1");
		dsCreate1.setColumn(0, "REG_DATE", "2011-03-02");
		dsCreate1.setRowType(0, MiPServiceTest.TYPE_INSERT);

		dsCreate1.appendRow();
		dsCreate1.setColumn(1, "BOARD_NO", "BOARD-00005");
		dsCreate1.setColumn(1, "BOARD_TITLE", "TITLE-00005");
		dsCreate1.setColumn(1, "CONTENTS", "CONTENTS-00005");
		dsCreate1.setColumn(1, "REG_ID", "INSERT_TEST2");

		dsCreate1.setColumn(1, "REG_DATE", "2011-03-02");
		dsCreate1.setRowType(1, MiPServiceTest.TYPE_INSERT);

		Dataset dsCreate2 = new Dataset("querySet2");
		dsCreate2.addStringColumn("BOARD_NO");
		dsCreate2.addStringColumn("BOARD_TITLE");
		dsCreate2.addStringColumn("CONTENTS");
		dsCreate2.addStringColumn("REG_ID");
		dsCreate2.addDateColumn("REG_DATE");

		dsCreate2.setUpdate(true);
		dsCreate2.appendRow();
		dsCreate2.setColumn(0, "BOARD_NO", "BOARD-00006");
		dsCreate2.setColumn(0, "BOARD_TITLE", "TITLE-00006");
		dsCreate2.setColumn(0, "CONTENTS", "CONTENTS-00006");
		dsCreate2.setColumn(0, "REG_ID", "INSERT_TEST3");
		dsCreate2.setColumn(0, "REG_DATE", "2011-03-02");
		dsCreate2.setRowType(0, MiPServiceTest.TYPE_INSERT);

		dsCreate2.appendRow();
		dsCreate2.setColumn(1, "BOARD_NO", "BOARD-00007");
		dsCreate2.setColumn(1, "BOARD_TITLE", "TITLE-00007");
		dsCreate2.setColumn(1, "CONTENTS", "CONTENTS-00007");
		dsCreate2.setColumn(1, "REG_ID", "INSERT_TEST8");

		dsCreate2.setColumn(1, "REG_DATE", "2011-03-02");
		dsCreate2.setRowType(1, MiPServiceTest.TYPE_INSERT);

		inDl.add("querySet1", dsCreate1);
		inDl.add("querySet2", dsCreate2);

		mipService.create(inVl, inDl, outVl, outDl);

		Assert.assertEquals("2", outVl.get("querySet1").getValue().getString());
		Assert.assertEquals("2", outVl.get("querySet2").getValue().getString());
	}

	/**
	 * [Flow #-6] Positive Case : After setting data for modification at
	 * VariantList, it is checked whether value is modified at Database by
	 * calling for update method.
	 */
	@Test
	public void testUpdateVariantList() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "updateBoard");

		inVl.add("BOARD_NO", "BOARD-00001");
		inVl.add("BOARD_TITLE", "TITLE-UPDATE");
		inVl.add("CONTENTS", "CONTENTS-UPDATE");
		inVl.add("REG_ID", "UPDATE_VARIANT");
		inVl.add("REG_DATE", "2009-09-07");

		mipService.update(inVl, inDl, outVl, outDl);
		Assert.assertEquals("1", outVl.get("querySet1").getValue().getString());
	}

	/**
	 * [Flow #-7] Positive Case :After setting data for modification at Dataset,
	 * it is checked whether value is deleted at Database by calling for update
	 * method.
	 */
	@Test
	public void testUpdateDataset() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 2);
		inVl.add("querySet1", "updateBoard");
		inVl.add("querySet2", "updateBoard");

		Dataset dsUpdate1 = new Dataset("querySet1");

		dsUpdate1.addStringColumn("BOARD_NO");
		dsUpdate1.addStringColumn("BOARD_TITLE");
		dsUpdate1.addStringColumn("CONTENTS");
		dsUpdate1.addStringColumn("REG_ID");
		dsUpdate1.addDateColumn("REG_DATE");

		dsUpdate1.setUpdate(true);
		dsUpdate1.appendRow();
		dsUpdate1.setColumn(0, "BOARD_NO", "BOARD-00001");
		dsUpdate1.setColumn(0, "CONTENTS", "CONTENTS-UPDATE1");
		dsUpdate1.setColumn(0, "REG_ID", "UPDATE_TEST1");
		dsUpdate1.setColumn(0, "REG_DATE", "2011-03-02");
		dsUpdate1.setRowType(0, MiPServiceTest.TYPE_NORMAL);
		dsUpdate1.setColumn(0, "BOARD_TITLE", "TITLE-UPDATE1");

		dsUpdate1.appendRow();
		dsUpdate1.setColumn(1, "BOARD_NO", "BOARD-00002");
		dsUpdate1.setColumn(1, "CONTENTS", "CONTENTS-UPDATE2");
		dsUpdate1.setColumn(1, "REG_ID", "UPDATE_TEST2");
		dsUpdate1.setColumn(1, "REG_DATE", "2011-03-02");
		dsUpdate1.setRowType(1, MiPServiceTest.TYPE_NORMAL);
		dsUpdate1.setColumn(1, "BOARD_TITLE", "TITLE-UPDATE2");

		Dataset dsUpdate2 = new Dataset("querySet2");
		dsUpdate2.setUpdate(true);

		dsUpdate2.addStringColumn("BOARD_NO");
		dsUpdate2.addStringColumn("BOARD_TITLE");
		dsUpdate2.addStringColumn("CONTENTS");
		dsUpdate2.addStringColumn("REG_ID");
		dsUpdate2.addDateColumn("REG_DATE");

		dsUpdate2.setUpdate(true);
		dsUpdate2.appendRow();
		dsUpdate2.setColumn(0, "BOARD_NO", "BOARD-00003");
		dsUpdate2.setColumn(0, "CONTENTS", "CONTENTS-UPDATE3");
		dsUpdate2.setColumn(0, "REG_ID", "UPDATE_TEST3");
		dsUpdate2.setColumn(0, "REG_DATE", "2011-03-02");
		dsUpdate2.setRowType(0, MiPServiceTest.TYPE_NORMAL);
		dsUpdate2.setColumn(0, "BOARD_TITLE", "TITLE-UPDATE3");

		inDl.add("querySet1", dsUpdate1);
		inDl.add("querySet2", dsUpdate2);

		mipService.update(inVl, inDl, outVl, outDl);

		Assert.assertEquals("2", outVl.get("querySet1").getValue().getString());
		Assert.assertEquals("1", outVl.get("querySet2").getValue().getString());
	}

	/**
	 * [Flow #-8] Positive Case :After setting data for deletion at VariantList,
	 * it is checked whether value is deleted at Database by calling for remove
	 * method.
	 */
	@Test
	public void testRemoveVariantList() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "removeBoard");

		inVl.add("BOARD_NO", "BOARD-00001");

		mipService.remove(inVl, inDl, outVl, outDl);
		Assert.assertEquals("1", outVl.get("querySet1").getValue().getString());
	}

	/**
	 * [Flow #-9] Positive Case :After setting data for deletion at Dataset, it
	 * is checked whether value is deleted at Database.
	 */
	@Test
	public void testRemoveDataset() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 2);
		inVl.add("querySet1", "removeBoard");
		inVl.add("querySet2", "removeBoard");

		Dataset dsRemove1 = new Dataset("querySet1");
		dsRemove1.setUpdate(true);
		dsRemove1.addStringColumn("BOARD_NO");

		dsRemove1.appendRow();
		dsRemove1.setColumn(0, "BOARD_NO", "BOARD-00002");
		dsRemove1.setRowType(0, MiPServiceTest.TYPE_NORMAL);
		dsRemove1.deleteRow(0);

		Dataset dsRemove2 = new Dataset("querySet2");
		dsRemove2.addStringColumn("BOARD_NO");
		dsRemove2.setUpdate(true);

		dsRemove2.appendRow();
		dsRemove2.setColumn(0, "BOARD_NO", "BOARD-00003");
		dsRemove2.setRowType(0, MiPServiceTest.TYPE_NORMAL);
		dsRemove2.deleteRow(0);

		inDl.add("querySet1", dsRemove1);
		inDl.add("querySet2", dsRemove2);

		mipService.remove(inVl, inDl, outVl, outDl);

		Assert.assertEquals("1", outVl.get("querySet1").getValue().getString());
		Assert.assertEquals("1", outVl.get("querySet2").getValue().getString());
	}

	/**
	 * [Flow #-10] Positive Case :After setting data for addition, modification,
	 * and deletion at Dataset, by calling for saveALLmethod, it is checked
	 * whether value is added, modified and deleted at Dataset.
	 */
	@Test
	public void testSaveAll() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "createBoard,updateBoard,removeBoard");

		Dataset dsSave = new Dataset("querySet1");
		dsSave.addStringColumn("BOARD_NO");
		dsSave.addStringColumn("BOARD_TITLE");
		dsSave.addStringColumn("CONTENTS");
		dsSave.addStringColumn("REG_ID");
		dsSave.addDateColumn("REG_DATE");

		dsSave.setUpdate(true);

		dsSave.appendRow();
		dsSave.setColumn(0, "BOARD_NO", "BOARD-00010");
		dsSave.setColumn(0, "BOARD_TITLE", "TITLE-00010");
		dsSave.setColumn(0, "CONTENTS", "CONTENTS-00010");
		dsSave.setColumn(0, "REG_ID", "SAVE_TEST1");
		dsSave.setColumn(0, "REG_DATE", "2011-03-02");

		dsSave.appendRow();
		dsSave.setColumn(1, "BOARD_NO", "BOARD-00001");
		dsSave.setColumn(1, "CONTENTS", "CONTENTS-00005");
		dsSave.setColumn(1, "REG_ID", "SAVE_TEST2");
		dsSave.setColumn(1, "REG_DATE", "2011-03-02");
		dsSave.setRowType(1, MiPServiceTest.TYPE_NORMAL);
		dsSave.setColumn(1, "BOARD_TITLE", "TITLE-UPDATE");

		dsSave.appendRow();
		dsSave.setColumn(2, "BOARD_NO", "BOARD-00002");
		dsSave.setRowType(2, MiPServiceTest.TYPE_NORMAL);
		dsSave.deleteRow(2);

		dsSave.setUpdate(false);

		inDl.add("querySet1", dsSave);

		mipService.saveAll(inVl, inDl, outVl, outDl);

		Assert.assertEquals("3", outVl.get("querySet1").getValue().getString());
	}
}
