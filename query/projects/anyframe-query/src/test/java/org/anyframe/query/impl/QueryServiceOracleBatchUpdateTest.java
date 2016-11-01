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

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
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
 * TestCase Name : QueryServiceOracleBatchUpdateTest <br>
 * <br>
 * [Description] : By using OraclePagingJdbcTemplate of QueryService,
 * batchUpdate()method is called for and its execution result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling batchUpdate() of QueryService, a few sets
 * of data is modified as Batch and checked is whether modification is
 * successful and modified number is correct.</li>
 * <li>#-2 Positive Case : By calling for batchExecute() method of QueryService,
 * data for modification is put into HashMap object and modified as Batch and
 * checked is whether modification is successful. By executing
 * batchUpdate()method, executed query calls for procedure.</li>
 * <li>#-3 Positive Case : By calling for batchExecute() method of QueryService,
 * data for modification is put into HashMap object and modified as Batch and
 * checked is whether modification is successful. By executing
 * batchUpdate()method, executed query calls for procedure.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/oraclebatch/context-*.xml" })
public class QueryServiceOracleBatchUpdateTest {

	@Inject
	QueryService queryService;

	@Inject
	DataSource dataSource;

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
					statement.executeUpdate("DROP TABLE TB_BATCH_TEST");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_BATCH_TEST ( "
						+ "col1 varchar2(50) NOT NULL, "
						+ "col2 varchar2(50) NOT NULL, " + "col3 integer, "
						+ "PRIMARY KEY (col1, col2))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			Assert.fail("Unable to initialize database for test. " + e);
		}

		batchInsertByObject();
	}

	@Test
	public void testOraclePagingJdbcTemplateBatchUpdatePerformance()
			throws InterruptedException {
		long beforetime = new Date().getTime();

		List<QueryThread> threadList = new ArrayList<QueryThread>();
		for (int i = 0; i < 1; i++) {
			QueryThread thread = new QueryThread(queryService);
			threadList.add(thread);
			thread.start();
		}

		for (int i = 0; i < threadList.size(); i++) {
			((Thread) threadList.get(i)).join();
		}

		long nexttime = new Date().getTime();
		System.out.println("--> Using Result Class : "
				+ (nexttime - beforetime));
	}

	/**
	 * By delivering user information in the form of Transfer Object mapped with
	 * a specific table and calling for batchCreate() of QueryService, new user
	 * information is registered as Batch. And checked is whether the
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
		batchTestVO = new BatchTestVO();
		batchTestVO.setCol1("I4BatchCreateByObject");
		batchTestVO.setCol2("I4BatchCreateByObject");
		batchTestVO.setCol3(104);
		args.add(batchTestVO);

		// 2. execute query
		int[] rtVal = queryService.batchCreate(args);
		Assert.assertTrue("Fail to batch insert by Object.", rtVal.length == 4);
	}

	public class QueryThread extends Thread {
		private QueryService queryService;

		public QueryThread(QueryService queryService) {
			this.queryService = queryService;
		}

		public void run() {
			try {
				for (int i = 0; i < 1; i++)
					testBatchUpdateByObject();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		/**
		 * [Flow #-1] Positive Case : By calling for batchUpdate() of
		 * QueryService, data for modification is put into BatchTestVO Object
		 * and modified as Batch. After checked is whether modification is
		 * successful.
		 * 
		 * @throws Exception
		 *             throws exception which is from QueryService
		 */
		public void testBatchUpdateByObject() {
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
			Assert.assertTrue("Fail to batch update by object.",
					rtVal.length == 3);

			Assert.assertEquals(
					"Fail to batch update by object - result value.", 0,
					rtVal[0]);
			Assert.assertEquals(
					"Fail to batch update by object - result value.", 0,
					rtVal[1]);
			Assert.assertEquals(
					"Fail to batch update by object - result value.", 3,
					rtVal[2]);
		}
	}

	/**
	 * [Flow #-2] Positive Case : By calling for batchExecute()method of
	 * QueryService, data for modification is put into HashMap Object and
	 * modified as Batch. After that checked is whether modification is
	 * successful.
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
		Assert.assertTrue("Fail to batch insert.", results.size() == 7);
	}

	/**
	 * [Flow #-3] Positive Case : By calling for batchExecuteBySQL() method of
	 * QueryService, data for modification is put into Object[] and modified as
	 * Batch. After checked is whether modification is successful.
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
		Assert.assertTrue("Fail to batch insert.", results.size() == 7);
	}
}
