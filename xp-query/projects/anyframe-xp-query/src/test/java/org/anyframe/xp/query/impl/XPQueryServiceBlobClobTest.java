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

import java.io.FileInputStream;
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

import org.anyframe.exception.InitializationException;
import org.anyframe.query.exception.QueryException;
import org.anyframe.util.DateUtil;
import org.anyframe.xp.query.XPQueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.FileCopyUtils;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;

/**
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class XPQueryServiceBlobClobTest {

	@Inject
	private DataSource dataSource;

	@Inject
	private XPQueryService xpQueryService;

	@Before
	public void onSetUp() {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP TABLE TB_XP_BLOBCLOB");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_XP_BLOBCLOB ( "
						+ "TEST_CHAR CHAR(10)," + "TEST_BLOB BLOB, "
						+ "TEST_CLOB CLOB," + "TEST_DATE DATE" + ")");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	@Test
	public void testInsertBlobClob() throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		queryMap.put(XPQueryService.QUERY_INSERT, "createBlobClob");
		int resultCount = xpQueryService.update(queryMap,
				makeInsertLobDataSet());
		Assert.assertEquals(2, resultCount);
	}

	@Test
	public void testUpdateBlobClob() {
		// Data initialization
		try {
			Map<String, String> sqlMap = new HashMap<String, String>();
			sqlMap.put(XPQueryService.QUERY_INSERT, "createBlobClob");
			xpQueryService.update(sqlMap, makeInsertLobDataSet());
		} catch (Exception e) {
			throw new InitializationException(
					"An Exception has occurred while initializing Test Update Data",
					e);
		}
		// Test Update
		Map<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(XPQueryService.QUERY_UPDATE, "updateBlobClob");
		int resultCount = xpQueryService.update(sqlMap, makeUpdateLobDataSet());
		Assert.assertEquals(1, resultCount);

	}

	@Test
	public void testFindBlobClob() {
		try {
			Map<String, String> sqlMap = new HashMap<String, String>();
			sqlMap.put(XPQueryService.QUERY_INSERT, "createBlobClob");
			xpQueryService.update(sqlMap, makeInsertLobDataSet());
		} catch (Exception e) {
			throw new InitializationException(
					"An Exception has occurred while initializing Test Update Data",
					e);
		}
		// Test Select
		DataSet resultDs = xpQueryService.search("findBlobClob",
				makeFindDataSet());
		Assert.assertEquals(2, resultDs.getRowCount());
		Assert.assertEquals(makeInsertBlobData().length, resultDs.getBlob(0,
				"testBlob").length);
		Assert.assertEquals(makeInsertBlobData().length, resultDs.getBlob(1,
				"testBlob").length);
		Assert.assertNotNull(resultDs.getObject(0, "testClob"));
		Assert.assertNotNull(resultDs.getObject(1, "testClob"));
	}

	private DataSet makeInsertLobDataSet() {
		DataSet insertDataSet = new DataSet("bbnydory_insert");
		insertDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		insertDataSet.addColumn("TEST_CHAR", DataTypes.STRING);
		insertDataSet.addColumn("TEST_BLOB", DataTypes.BLOB);
		insertDataSet.addColumn("TEST_CLOB", DataTypes.STRING);
		insertDataSet.addColumn("TEST_DATE", DataTypes.DATE);

		insertDataSet.newRow();

		insertDataSet.set(0, "TEST_CHAR", "bbnydory00");
		insertDataSet.set(0, "TEST_BLOB", makeInsertBlobData());
		insertDataSet.set(0, "TEST_CLOB", makeInsertClobData());
		insertDataSet.set(0, "TEST_DATE", getDate());

		insertDataSet.newRow();

		insertDataSet.set(1, "TEST_CHAR", "bbnydory01");
		insertDataSet.set(1, "TEST_BLOB", makeInsertBlobData());
		insertDataSet.set(1, "TEST_CLOB", makeInsertClobData());
		insertDataSet.set(1, "TEST_DATE", getDate());
		return insertDataSet;
	}

	private DataSet makeUpdateLobDataSet() {
		DataSet updateDataSet = new DataSet("bbnydory_update");
		updateDataSet.setSaveType(DataSet.SAVE_TYPE_UPDATED);

		updateDataSet.addColumn("TEST_CHAR", DataTypes.STRING);
		updateDataSet.addColumn("TEST_BLOB", DataTypes.BLOB);
		updateDataSet.addColumn("TEST_CLOB", DataTypes.STRING);
		updateDataSet.addColumn("TEST_DATE", DataTypes.DATE);

		updateDataSet.newRow();
		updateDataSet.setRowType(0, DataSet.ROW_TYPE_UPDATED);

		updateDataSet.set(0, "TEST_CHAR", "bbnydory00");
		updateDataSet.set(0, "TEST_BLOB", makeUpdateBlobData());
		updateDataSet.set(0, "TEST_CLOB", makeUpdateClobData());
		updateDataSet.set(0, "TEST_DATE", getDate());

		// updateDataSet.dump();
		updateDataSet.toString();
		return updateDataSet;
	}

	private DataSet makeFindDataSet() {
		DataSet selectDs = new DataSet("bbnydory_select");

		selectDs.addColumn("SEARCH_KEYWORD", DataTypes.STRING);

		selectDs.newRow();

		selectDs.set(0, "SEARCH_KEYWORD", "%bbnydory%");
		return selectDs;
	}

	private byte[] makeInsertBlobData() {
		FileInputStream fis = null;
		byte[] blobByte = null;
		try {
			fis = new FileInputStream("./testlobdata/CreateLobTest.txt");
			blobByte = FileCopyUtils.copyToByteArray(fis);
		} catch (IOException e) {
			Assert.fail("Fail to read file");
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return blobByte;
	}

	private byte[] makeUpdateBlobData() {
		FileInputStream fis = null;
		byte[] blobByte = null;
		try {
			fis = new FileInputStream("./testlobdata/UpdateLobTest.txt");
			blobByte = FileCopyUtils.copyToByteArray(fis);
		} catch (IOException e) {
			Assert.fail("Fail to read file");
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return blobByte;
	}

	private String makeInsertClobData() {
		String clobData = "Anyframe XPQueryService Test.\n";
		for (int i = 0; i < 100; i++) {
			clobData += "Anyframe XPQueryService Test.\n";
		}
		return clobData;
	}

	private String makeUpdateClobData() {
		String clobData = "Anyframe XPQueryService Update Test.\n";
		for (int i = 0; i < 100; i++) {
			clobData += "Anyframe XPQueryService Update Test.\n";
		}
		return clobData;
	}

	private Timestamp getDate() {
		return DateUtil.stringToTimestamp("2008-12-01", "yyyy-MM-dd");
	}
}
