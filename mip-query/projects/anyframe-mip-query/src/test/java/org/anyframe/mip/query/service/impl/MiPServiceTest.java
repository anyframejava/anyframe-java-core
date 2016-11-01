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
import java.util.Date;

import javax.sql.DataSource;

import org.anyframe.mip.query.service.MiPService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * TestCase Name : MiPServiceTest <br>
 * <br>
 * [Description] : MiPService가 제공하는 메소드를 호출 해 원하는 기능이 정상적으로 동작하는지 테스트한다. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Dataset에 조회필드와 검색어가 세팅 되어 있을 때 Dataset을 이용해 목록 조회를
 * 한다. 검색조건과 검색키워드를 두 개의 Dataset에 세팅한 후 쿼리 문이 정상적으로 동작해 기대했던 값과 조회 결과 값을 비교한다.</li>
 * <li>#-2 Positive Case : VariantList에 조회 필드와,검색어를 세팅하고 그것을 이용해 조회 쿼리를 실행한 후 조회
 * 결과 값을 비교해 조회가 정상적으로 실행 됐는지 확인한다.</li>
 * <li>#-3 Positive Case : Dataset에 검색하고자 하는 Page번호와 한 페이지에 디스플레이 하고자 하는 목록의 갯수
 * page unit등을 Constant Column에 세팅 한 후 그것을 이용해 페이징 조회를 했을 때 원하는 목록이 조회 되었는지
 * 확인한다.</li>
 * <li>#-4 Positive Case : VariantList에 저장할 데이터를 세팅한 후 create메소드를 호출해 Database에
 * 값이 추가되는 것을 확인한다.</li>
 * <li>#-5 Positive Case : Dataset에 저장할 데이터를 세팅한 후 create메소드를 호출해 Database에 값이
 * 추가되는 것을 확인한다.</li>
 * <li>#-6 Positive Case : VariantList에 수정할 데이터를 세팅한 후 update메소드를 호출해 Database에
 * 값이 수정되는 것을 확인한다.</li>
 * <li>#-7 Positive Case : Dataset에 수장할 데이터를 세팅한 후 update메소드를 호출해 Database에 값이
 * 수정되는 것을 확인한다.</li>
 * <li>#-8 Positive Case : VariantList에 삭제할 데이터를 세팅한 후 remove메소드를 호출해 Database에
 * 값이 삭제되는 것을 확인한다.</li>
 * <li>#-9 Positive Case : Dataset에 삭제할 데이터를 세팅한 후 remove메소드를 호출해 Database에 값이
 * 삭제되는 것을 확인한다.</li>
 * <li>#-10 Positive Case : Dataset에 추가, 수정, 삭제 할 데이터를 세팅한 후 saveAll메소드를 호출해
 * Database에 값이 추가, 수정 삭제 되는 것을 확인한다.</li>
 * 
 * </li>
 * </ul>
 * 
 * @author Jonghoon, Kim
 */
public class MiPServiceTest extends
		AbstractDependencyInjectionSpringContextTests {

	private static short TYPE_NORMAL = 1;
	private static short TYPE_INSERT = 2;
	private static short TYPE_UPDATE = 4;
	
	public void setMiPService(MiPService mipService) {
		this.mipService = mipService;
	}

	private MiPService mipService;

	public final void onSetUp() throws Exception {
		// Test DB 세팅
		try {
			DataSource dataSource = (DataSource) applicationContext
					.getBean("dataSource");
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
				statement.execute("CREATE TABLE TEST_BOARD("
						+ "BOARD_NO VARCHAR(20) NOT NULL,"
						+ "BOARD_TITLE VARCHAR(50) NOT NULL,"
						+ "CONTENTS VARCHAR(255)," + "REG_ID VARCHAR(20),"
						+ "REG_DATE VARCHAR(10),"
						+ "CONSTRAINT PK_BOARD_MIP PRIMARY KEY(BOARD_NO)" + ")");
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
	 * [Flow #-1] Positive Case : Dataset에 검색 조건이 세팅 되어 있을 때 Dataset을 이용해 목록 조회를
	 * 한다. 검색조건과 검색키워드를 두 개의 Dataset에 세팅한 후 쿼리 문이 정상적으로 동작해 기대했던 값과 조회 결과 값을
	 * 비교한다.
	 */
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

		assertEquals(2, outDl.size());

		Dataset ds1 = outDl.get("querySet1");
		Dataset ds2 = outDl.get("querySet2");

		assertEquals("BOARD-00002", ds1.getColumnAsString(0, "BOARD_NO"));
		assertEquals("TITLE-0001", ds2.getColumnAsString(0, "BOARD_TITLE"));
	}

	/**
	 * [Flow #-2] Positive Case :VariantList에 조회 필드와,검색어를 세팅하고 그것을 이용해 조회 쿼리를
	 * 실행한 후 조회 결과 값을 비교해 조회가 정상적으로 실행 됐는지 확인한다.
	 */
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

		assertEquals("BOARD-00002", ds.getColumnAsString(0, "BOARD_NO"));
	}

	/**
	 * [Flow #-3] Positive Case :Dataset에 검색하고자 하는 Page번호와 한 페이지에 디스플레이 하고자 하는
	 * 목록의 갯수 page unit등을 Constant Column에 세팅 한 후 그것을 이용해 페이징 조회를 했을 때 원하는 목록이
	 * 조회 되었는지 확인한다.
	 */
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

		assertEquals(3.0, ds.getConstColumn("totalCount").getDouble()
				.doubleValue(), 0.00);
		assertEquals("BOARD-00002", ds.getColumnAsString(0, "BOARD_NO"));

	}

	/**
	 * [Flow #-4] Positive Case : VariantList에 저장할 데이터를 세팅한 후 create메소드를 호출해
	 * Database에 값이 추가되는 것을 확인한다.
	 */
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
		assertEquals("1", outVl.get("querySet1").getValue().getString());
	}

	/**
	 * [Flow #-5] Positive Case : Dataset에 저장할 데이터를 세팅한 후 create메소드를 호출해
	 * Database에 값이 추가되는 것을 확인한다.
	 */
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
		dsCreate1.setRowType(0, this.TYPE_INSERT );

		dsCreate1.appendRow();
		dsCreate1.setColumn(1, "BOARD_NO", "BOARD-00005");
		dsCreate1.setColumn(1, "BOARD_TITLE", "TITLE-00005");
		dsCreate1.setColumn(1, "CONTENTS", "CONTENTS-00005");
		dsCreate1.setColumn(1, "REG_ID", "INSERT_TEST2");

		dsCreate1.setColumn(1, "REG_DATE", "2011-03-02");
		dsCreate1.setRowType(1, this.TYPE_INSERT);

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
		dsCreate2.setRowType(0, this.TYPE_INSERT);

		dsCreate2.appendRow();
		dsCreate2.setColumn(1, "BOARD_NO", "BOARD-00007");
		dsCreate2.setColumn(1, "BOARD_TITLE", "TITLE-00007");
		dsCreate2.setColumn(1, "CONTENTS", "CONTENTS-00007");
		dsCreate2.setColumn(1, "REG_ID", "INSERT_TEST8");

		dsCreate2.setColumn(1, "REG_DATE", "2011-03-02");
		dsCreate2.setRowType(1, this.TYPE_INSERT);

		inDl.add("querySet1", dsCreate1);
		inDl.add("querySet2", dsCreate2);

		mipService.create(inVl, inDl, outVl, outDl);

		assertEquals("2", outVl.get("querySet1").getValue().getString());
		assertEquals("2", outVl.get("querySet2").getValue().getString());
	}

	/**
	 * [Flow #-6] Positive Case : VariantList에 수정할 데이터를 세팅한 후 update메소드를 호출해
	 * Database에 값이 수정되는 것을 확인한다.
	 */
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
		assertEquals("1", outVl.get("querySet1").getValue().getString());
	}

	/**
	 * [Flow #-7] Positive Case :Dataset에 수장할 데이터를 세팅한 후 update메소드를 호출해
	 * Database에 값이 수정되는 것을 확인한다.
	 */
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
		dsUpdate1.setRowType(0, this.TYPE_NORMAL);
		dsUpdate1.setColumn(0, "BOARD_TITLE", "TITLE-UPDATE1");

		dsUpdate1.appendRow();
		dsUpdate1.setColumn(1, "BOARD_NO", "BOARD-00002");
		dsUpdate1.setColumn(1, "CONTENTS", "CONTENTS-UPDATE2");
		dsUpdate1.setColumn(1, "REG_ID", "UPDATE_TEST2");
		dsUpdate1.setColumn(1, "REG_DATE", "2011-03-02");
		dsUpdate1.setRowType(1, this.TYPE_NORMAL);
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
		dsUpdate2.setRowType(0, this.TYPE_NORMAL);
		dsUpdate2.setColumn(0, "BOARD_TITLE", "TITLE-UPDATE3");

		inDl.add("querySet1", dsUpdate1);
		inDl.add("querySet2", dsUpdate2);

		mipService.update(inVl, inDl, outVl, outDl);

		assertEquals("2", outVl.get("querySet1").getValue().getString());
		assertEquals("1", outVl.get("querySet2").getValue().getString());
	}

	/**
	 * [Flow #-8] Positive Case :VariantList에 삭제할 데이터를 세팅한 후 remove메소드를 호출해
	 * Database에 값이 삭제되는 것을 확인한다.
	 */
	public void testRemoveVariantList() throws Exception {
		DatasetList inDl = new DatasetList();
		VariableList inVl = new VariableList();
		DatasetList outDl = new DatasetList();
		VariableList outVl = new VariableList();

		inVl.add("querySetCount", 1);
		inVl.add("querySet1", "removeBoard");

		inVl.add("BOARD_NO", "BOARD-00001");

		mipService.remove(inVl, inDl, outVl, outDl);
		assertEquals("1", outVl.get("querySet1").getValue().getString());
	}

	/**
	 * [Flow #-9] Positive Case :Dataset에 삭제할 데이터를 세팅한 후 remove메소드를 호출해
	 * Database에 값이 삭제되는 것을 확인한다.
	 */
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
		dsRemove1.setRowType(0, this.TYPE_NORMAL);
		dsRemove1.deleteRow(0);

		Dataset dsRemove2 = new Dataset("querySet2");
		dsRemove2.addStringColumn("BOARD_NO");
		dsRemove2.setUpdate(true);

		dsRemove2.appendRow();
		dsRemove2.setColumn(0, "BOARD_NO", "BOARD-00003");
		dsRemove2.setRowType(0, this.TYPE_NORMAL);
		dsRemove2.deleteRow(0);

		inDl.add("querySet1", dsRemove1);
		inDl.add("querySet2", dsRemove2);

		mipService.remove(inVl, inDl, outVl, outDl);

		assertEquals("1", outVl.get("querySet1").getValue().getString());
		assertEquals("1", outVl.get("querySet2").getValue().getString());
	}

	/**
	 * [Flow #-10] Positive Case :Dataset에 추가, 수정, 삭제 할 데이터를 세팅한 후 saveAll메소드를
	 * 호출해 Database에 값이 추가, 수정 삭제 되는 것을 확인한다.
	 */
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
		dsSave.setRowType(1, this.TYPE_NORMAL);
		dsSave.setColumn(1, "BOARD_TITLE", "TITLE-UPDATE");

		dsSave.appendRow();
		dsSave.setColumn(2, "BOARD_NO", "BOARD-00002");
		dsSave.setRowType(2, this.TYPE_NORMAL);
		dsSave.deleteRow(2);
		
		dsSave.setUpdate(false);
		
		inDl.add("querySet1", dsSave);
		
		mipService.saveAll(inVl, inDl, outVl, outDl);

		assertEquals("3", outVl.get("querySet1").getValue().getString());
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath:spring/context-*.xml" };
	}
}
