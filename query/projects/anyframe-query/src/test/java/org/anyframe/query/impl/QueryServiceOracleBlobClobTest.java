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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.sql.Blob;
import java.sql.Clob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.LobVO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceOracleBlobClobTest <br>
 * <br>
 * [Description] : In the case where DBMS type is Oracle, CLOB, BLOB Handling
 * methods are tested and verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : After entering BLOB, CLOB type data, relevant data is
 * searched and its result value is verified.</li>
 * <li>#-2 Positive Case : After entering BLOB, CLOB type data, relevant data is
 * searched and then it is put into a specific Result Class.</li>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/lobhandler/oracle/context-*.xml" })
public class QueryServiceOracleBlobClobTest {
	@Inject
	@Named("queryService")
	private QueryService queryService = null;
	@Inject
	@Named("dataSource")
	private DataSource dataSource = null;

	/**
	 * Table TB_BINARY_TEST is created for test.
	 */
	@Before
	public void onSetUp() {
		System.out.println("Attempting to drop old table");
		try {
			queryService.updateBySQL("DROP TABLE TB_BINARY_TEST",
					new String[] {}, new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		String defaultCreate = "CREATE TABLE TB_BINARY_TEST ( bin_id numeric(5) PRIMARY KEY, myblob blob, myclob clob)";
		queryService.updateBySQL(defaultCreate, new String[] {},
				new Object[] {});

	}

	/**
	 * [Flow #-1] Positive Case : After entering BLOB, CLOB type data, relevant
	 * data is searched and its result value is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindClobBlob() {
		// 1. set data for insert
		insertClobBlob();

		// 2. execute query
		List<Map<String, Object>> results = queryService.find("findBlobClob",
				new Object[] { "5" });
		assertEquals(1, results.size());

		// 3. assert
		Iterator<Map<String, Object>> resultItr = results.iterator();
		while (resultItr.hasNext()) {
			Map<String, Object> binary = resultItr.next();
			assertEquals("Fail to find clob.", val, binary.get("myclob"));
			assertEquals("Fail to find blob.", "12345", new String(
					(byte[]) binary.get("myblob")));
		}
	}

	/**
	 * [Flow #-2] Positive Case : After entering BLOB, CLOB type data, relevant
	 * data is searched and then it is put into a specific Result Class.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindClobBlobWithResultClass() {
		// 1. set data for insert
		insertClobBlob();

		// 2. execute query
		List<LobVO> results = queryService.find("findBlobClobWithResultClass",
				new Object[] { "5" });
		assertEquals(1, results.size());

		// 3. assert
		Iterator<LobVO> resultItr = results.iterator();
		while (resultItr.hasNext()) {
			LobVO binary = resultItr.next();
			assertEquals("Fail to find clob.", val, binary.getMyclob());
			assertEquals("Fail to find blob.", "12345", new String(binary
					.getMyblob()));
		}
	}

	// @Test
	public void testFindClobBlobWithJdbc() {
		// 1. set data for insert
		insertClobBlob();

		Connection conn = null;
		ResultSet rs = null;
		PreparedStatement statement = null;

		try {
			conn = this.dataSource.getConnection();
			statement = conn
					.prepareStatement("select bin_id , myblob, myclob, mylong from TB_BINARY_TEST");

			rs = statement.executeQuery();
			
			while (rs.next()) {
				System.out.println("bin_id : " + rs.getInt("bin_id"));
				@SuppressWarnings("unused")
				Blob myblob = rs.getBlob("myblob");
				@SuppressWarnings("unused")
				Clob clob = rs.getClob("myclob");
			}
		} catch (Exception e) {
			fail("Fail to execute query with lob. Reason : " + e.getMessage());
		} finally {			
			try {
				rs.close();
				statement.close();
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	// @Test
	public void testFindClobBlobWithStream() {
		// 1. set data for insert
		insertClobBlob();

		Connection conn = null;
		ResultSet rs = null;
		PreparedStatement statement = null;

		try {
			conn = this.dataSource.getConnection();
			statement = conn
					.prepareStatement("select bin_id , myclob, mylong  from TB_BINARY_TEST");
			rs = statement.executeQuery();

			int i = 1;
			while (rs.next()) {
				System.out.println(i++);
				System.out.println("bin_id : " + rs.getInt("bin_id"));
				// Blob myblob = rs.getBlob("myblob");
				// System.out.println("myblob : "
				// + myblob.getBinaryStream().read());
				Clob myclob = rs.getClob("myclob");
				// System.out
				// .println("myclob : " + myclob.getAsciiStream().read());
				System.out.println("myclob : "
						+ myclob.getSubString(1, (int) myclob.length() - 1));
				System.out.println("mylong : " + rs.getLong("mylong"));
			}
		} catch (Exception e) {
			e.printStackTrace();
			fail("Fail to execute query with lob. Reason : " + e.getMessage());
		} finally {
			try {
				statement.close();
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * By calling for create() method of QueryService for test, BLOB, CLOB type
	 * data is entered.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void insertClobBlob() {
		// 1. execute query
		queryService.create("insertBlobClob", new Object[] { new Integer(5),
				"12345".getBytes(), val });
		queryService.create("insertBlobClob", new Object[] { new Integer(6),
				"12345".getBytes(), val });
	}

	// test data
	private String val = "1The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "2The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "3The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "4The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "5The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "6The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "7The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "8The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "9The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "10The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "11The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "12The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "13The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "14The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "15The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "16The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "17The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "18The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "19The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "20The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "21The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "22The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "23The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "24The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "25The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "26The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "27The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "28The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "29The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
		+ "30The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n";
}
