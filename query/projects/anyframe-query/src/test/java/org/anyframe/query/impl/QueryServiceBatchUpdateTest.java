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

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.BatchTestVO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceBatchUpdateTest <br>
 * <br>
 * [Description] : By calling for batchCreate(), batchRemove(), batchUpdate(),
 * batchUpdateBySQL() method of QueryService, execution result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for batchUpdate()method of QueryService,
 * various sets of data is deleted as Batch and checked is whether deletion is
 * successful.</li>
 * <li>#-2 Positive Case : By calling for batchMove() method of QueryService,
 * data for deletion is put into BatchTestVO and removed as Batch. Then,
 * verified is whether deletion is successful.</li>
 * <li>#-3 Positive Case : By calling for batchUpdate(queryId,targets) method of
 * QueryService, data for modification is put into BatchTestVO and modified as
 * Batch. Then, verified is whether modification is successful.</li>
 * <li>#-4 Positive Case : By calling for batchUpdate(targets) method of
 * QueryService, data for modification is put into BatchTestVO and modified as
 * Batch. Then, verified is whether modification is successful.</li>
 * <li>#-5 Positive Case : By calling for batchUpdate() method of QueryService,
 * data for modification is put into HashMap and modified as Batch. Then,
 * verified is whether modification is successful.</li>
 * <li>#-6 Positive Case : By calling for batchExecute () method of
 * QueryService, data for modification is put into HashMap and modified as
 * Batch. Then, verified is whether modification is successful. Query calls for
 * procedure implemented via batchExecute()method.</li>
 * <li>#-7 Positive Case : By calling for ()batchExecuteBySQL method of
 * QueryService, data for modification is put into Object[] and modified as
 * Batch. Then, verified is whether modification is successful. Query calls for
 * procedure implemented via batchExecuteBySQL()method.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceBatchUpdateTest {

	@Inject
	QueryService queryService;

	@Inject
	DataSource dataSource;

	private int initCount = 0;

	/**
	 * Table TB_BATCH_TEST is created for test.
	 */
	@Before
	public void onSetUp() {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP PROCEDURE PROC_BATCH_TEST");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Procedure.");
				}

				try {
					statement.executeUpdate("DROP TABLE TB_BATCH_TEST");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_BATCH_TEST ( "
						+ "col1 varchar2(50) NOT NULL, "
						+ "col2 varchar2(50) NOT NULL, " + "col3 integer, "
						+ "PRIMARY KEY (col1, col2))");

				statement
						.executeUpdate("CREATE OR REPLACE PROCEDURE PROC_BATCH_TEST ( "
								+ " IN1 IN VARCHAR2, "
								+ " IN2 IN VARCHAR2, "
								+ " IN3 IN NUMBER "
								+ " ) "
								+ " AS "
								+ " BEGIN "
								+ " 	INSERT INTO TB_BATCH_TEST (col1, col2, col3) VALUES (IN1, IN2, IN3); "
								+ " END;");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : By calling for batchUpdate() method of
	 * QueryService, various sets of data is deleted as Batch and verified is
	 * whether deletion is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchRemove() {
		// 1. insert data
		batchInsert();

		// 2. set data for delete
		List<Object[]> args = new ArrayList<Object[]>();
		Object[] arg = new Object[1];
		arg[0] = "I1";

		args.add(arg);
		arg = new Object[1];
		arg[0] = "I2";

		args.add(arg);
		arg = new Object[1];
		arg[0] = "I3";

		args.add(arg);

		// 3. execute query
		queryService.batchUpdate("batchDelete", args);

		// 4. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to batch remove.",
				results.size() == 0 + initCount);
	}

	/**
	 * [Flow #-2] Positive Case : By calling for batchRemove()method of
	 * QueryService, various sets of data is put into BatchTestVO and deleted as
	 * Batch. Then checked is whether deletion is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchRemoveByObject() {
		// 1. insert data by SQL
		batchInsertBySQL();

		// 2. set data for delete
		List<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1InsertBySQL");
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2InsertBySQL");
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3InsertBySQL");
		args.add(batchTestVO);

		// 3. execute query
		int[] rtVal = queryService.batchRemove(args);
		Assert.assertTrue("Fail to batch remove by object.", rtVal.length == 3);

		// 4. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to find.", results.size() == initCount);
	}

	/**
	 * [Flow #-3] Positive Case : By calling for batchUpdate(queryId,targets)
	 * method of QueryService, various sets of data is put into BatchTestVO and
	 * deleted as Batch. Then checked is whether deletion is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchUpdateUsingQueryIdByObject() {
		// 1. insert data by object
		batchInsertByObject();

		// 2. set data for update
		List<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(101);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(102);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(103);
		args.add(batchTestVO);

		// 3. execute query
		int[] rtVal = queryService.batchUpdate("batchUpdateWithObject", args);
		Assert.assertTrue("Fail to batch update by object.", rtVal.length == 3);

		// 4. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});

		Assert.assertTrue("Fail to find.", results.size() == initCount + 3);
		for (int i = 0; i < results.size(); i++) {
			Map<String, Object> result = results.get(i);
			Assert.assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * [Flow #-4] Positive Case : By calling for batchUpdate(targets)method of
	 * QueryService, various sets of data is put into BatchTestVO and deleted as
	 * Batch. Then checked is whether deletion is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchUpdateByObject() {
		// 1. insert data by object
		batchInsertByObject();

		// 2. set data for update
		List<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(101);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(102);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3BatchCreateByObject");
		batchTestVO.setCol2("Modified");
		batchTestVO.setCol3(103);
		args.add(batchTestVO);

		// 3. execute query
		int[] rtVal = queryService.batchUpdate(args);
		Assert.assertTrue("Fail to batch update by object.", rtVal.length == 3);

		// 4. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});

		Assert.assertTrue("Fail to find.", results.size() == initCount + 3);
		for (int i = 0; i < results.size(); i++) {
			Map<String, Object> result = results.get(i);
			Assert.assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * [Flow #-5] Positive Case : By calling for batchUPdate()method of
	 * QueryService, various sets of data is put into HashMap and modified as
	 * Batch. Then checked is whether modification is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchUpdateByMap() {
		// 1. set data for insert
		List<Map<String, Object>> args = new ArrayList<Map<String, Object>>();

		Map<String, Object> batchTestMap = new HashMap<String, Object>();
		batchTestMap.put("col1", "I1BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(101));
		args.add(batchTestMap);

		batchTestMap = new HashMap<String, Object>();
		batchTestMap.put("col1", "I2BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(102));
		args.add(batchTestMap);

		batchTestMap = new HashMap<String, Object>();
		batchTestMap.put("col1", "I3BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(103));
		args.add(batchTestMap);

		// 2. execute query
		int[] rtVal = queryService.batchUpdate("batchInsertWithMap", args);
		Assert.assertTrue("Fail to batch update by object.", rtVal.length == 3);

		// 3. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});

		Assert.assertTrue("Fail to find.", results.size() == initCount + 3);
		for (int i = 0; i < results.size(); i++) {
			Map<String, Object> result = results.get(i);
			Assert.assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * [Flow #-6] Positive Case : By calling for batchExecute()method of
	 * QueryService, various sets of data is put into Object[] and modified as
	 * Batch. Then checked is whether modification is successful. Query
	 * implemented calls for procedures via batchExecute().
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchInsertWithProcedure() {
		List<Object[]> args = new ArrayList<Object[]>();
		Object[] arg = new Object[3];

		arg[0] = "test1";
		arg[1] = "test1";
		arg[2] = 1;
		args.add(arg);

		arg = new Object[3];
		arg[0] = "test2";
		arg[1] = "test2";
		arg[2] = 2;
		args.add(arg);

		arg = new Object[3];
		arg[0] = "test3";
		arg[1] = "test3";
		arg[2] = 3;
		args.add(arg);

		queryService.batchExecute("batchInsertWithProcedure", args);

		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to batch insert.", results.size() == 3);
	}

	/**
	 * [Flow #-7] Positive Case : By calling for batchExecuteBySQL() method of
	 * QueryService, data for modification is put into Object[] and modified for
	 * Batch. Then checked is whether modification is successful. Query
	 * implemented calls for procedures via batchExecuteBySQL().
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testBatchInsertWithProcedureBySQL() {
		String sql = "DECLARE  " + "col1      VARCHAR2(50):= ?;  "
				+ "col2      VARCHAR2(50):= ?;  " + "col3      NUMBER:= ?; "
				+ "BEGIN " + "PROC_BATCH_TEST(col1, col2, col3 ); " + "END; ";

		String[] types = new String[3];
		types[0] = "VARCHAR";
		types[1] = "VARCHAR";
		types[2] = "NUMERIC";

		List<Object[]> args = new ArrayList<Object[]>();
		Object[] arg = new Object[3];

		arg[0] = "test1";
		arg[1] = "test1";
		arg[2] = 1;
		args.add(arg);

		arg = new Object[3];
		arg[0] = "test2";
		arg[1] = "test2";
		arg[2] = 2;
		args.add(arg);

		arg = new Object[3];
		arg[0] = "test3";
		arg[1] = "test3";
		arg[2] = 3;
		args.add(arg);

		queryService.batchExecuteBySQL(sql, types, args);

		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to batch insert.", results.size() == 3);
	}

	/**
	 * By delivering user information in the form of Object and query statement
	 * defined within code and calling for batchUpdate() method of QueryService,
	 * new user information is registered as Batch. And checked is whether
	 * registration is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsert() {
		// 1. set data for insert
		List<Object[]> args = new ArrayList<Object[]>();
		Object[] arg = new Object[3];
		arg[0] = "I1";
		arg[1] = "I1";
		arg[2] = new BigDecimal("1");
		args.add(arg);
		arg = new Object[3];
		arg[0] = "I2";
		arg[1] = "I2";
		arg[2] = new BigDecimal("2");
		args.add(arg);
		arg = new Object[3];
		arg[0] = "I3";
		arg[1] = "I3";
		arg[2] = new BigDecimal("3");
		args.add(arg);

		// 2. execute query
		queryService.batchUpdate("batchInsert", args);

		// 3. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to batch insert.",
				results.size() == 3 + initCount);
	}

	/**
	 * By delivering user information in the form of Object and query statement
	 * defined within code and calling for batchUpdateBySQL() method of
	 * QueryService, new user information is registered as Batch. And checked is
	 * whether registration is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsertBySQL() {
		// 1. set query statement for insert
		String sql = "insert into TB_BATCH_TEST(col1, col2, col3) values (?,?,?)";

		// 2. set data for insert
		String[] types = new String[3];
		types[0] = "VARCHAR";
		types[1] = "VARCHAR";
		types[2] = "NUMERIC";
		List<Object[]> args = new ArrayList<Object[]>();
		Object[] arg = new Object[3];
		arg[0] = "I1InsertBySQL";
		arg[1] = "I1";
		arg[2] = new BigDecimal("1");
		args.add(arg);
		arg = new Object[3];
		arg[0] = "I2InsertBySQL";
		arg[1] = "I2";
		arg[2] = new BigDecimal("2");
		args.add(arg);
		arg = new Object[3];
		arg[0] = "I3InsertBySQL";
		arg[1] = "I3";
		arg[2] = new BigDecimal("3");
		args.add(arg);

		// 3. execute query
		queryService.batchUpdateBySQL(sql, types, args);

		// 4. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to batch insert by SQL.",
				results.size() == 3 + initCount);
	}

	/**
	 * By delivering user information in the form of Transfer Object mapped with
	 * a specific table and calling for batchCreate()method of QueryService, new
	 * user information is registered as Batch. And checked is whether
	 * registration is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsertByObject() {
		// 1. set data for insert
		List<BatchTestVO> args = new ArrayList<BatchTestVO>();
		BatchTestVO batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I1BatchCreateByObject");
		batchTestVO.setCol2("I1BatchCreateByObject");
		batchTestVO.setCol3(101);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I2BatchCreateByObject");
		batchTestVO.setCol2("I2BatchCreateByObject");
		batchTestVO.setCol3(102);
		args.add(batchTestVO);
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I3BatchCreateByObject");
		batchTestVO.setCol2("I3BatchCreateByObject");
		batchTestVO.setCol3(103);
		args.add(batchTestVO);

		// 2. execute query
		int[] rtVal = queryService.batchCreate(args);
		Assert.assertTrue("Fail to batch insert by Object.", rtVal.length == 3);

		// 3. assert
		List<Map<String, Object>> results = queryService.find("findBatchTest",
				new Object[] {});
		Assert.assertTrue("Fail to find.", results.size() == initCount + 3);
	}
}
