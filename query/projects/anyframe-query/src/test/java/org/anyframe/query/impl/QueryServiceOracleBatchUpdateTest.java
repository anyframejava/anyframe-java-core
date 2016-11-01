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
package org.anyframe.query.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;

import javax.sql.DataSource;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.BatchTestVO;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceOracleBatchUpdateTest <br>
 * <br>
 * [Description] : QueryService의 OraclePagingJdbcTemplate을 이용하여 batchCreate(),
 * batchUpdate() 메소드를 호출하고 수행 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 여러건의 데이터를
 * Batch로 수정하고 수정이 성공적으로 이루어졌는지, 수정된 건수를 정확한지 확인한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceOracleBatchUpdateTest extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
		return new String[] { "classpath*:/spring/oraclebatch/context-*.xml" };
	}

	/**
	 * 테스트를 위해 테이블 TB_BATCH_TEST를 생성한다.
	 */
	public void onSetUp() throws Exception {
		super.onSetUp();
		DataSource dataSource = (DataSource) applicationContext
				.getBean("dataSource");
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
			fail("Unable to initialize database for test. " + e);
		}

		batchInsertByObject();
	}

	public void onTearDown() {
		setDirty();
	}

	public void testOraclePagingJdbcTemplateBatchUpdatePerformance()
			throws Exception {
		long beforetime = new Date().getTime();

		ArrayList threadList = new ArrayList();
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
	 * 특정 테이블과 매핑된 Transfer Object 형태의 사용자 정보를 전달하고, QueryService의 batchCreate()
	 * 메소드를 호출하여 신규 사용자 정보를 Batch로 등록한다. 그리고 등록 작업이 성공적으로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsertByObject() throws Exception {
		// 1. set data for insert
		ArrayList args = new ArrayList();
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
		assertTrue("Fail to batch insert by Object.", rtVal.length == 4);
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
		 * [Flow #-1] Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 수정할
		 * 대상 데이터들을 BatchTestVO 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.
		 * 
		 * @throws Exception
		 *             throws exception which is from QueryService
		 */
		public void testBatchUpdateByObject() throws Exception {
			// 2. set data for update
			ArrayList args = new ArrayList();
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
			assertTrue("Fail to batch update by object.", rtVal.length == 3);

			assertEquals("Fail to batch update by object - result value.",
					0, rtVal[0]);
			assertEquals("Fail to batch update by object - result value.",
					0, rtVal[1]);
			assertEquals("Fail to batch update by object - result value.",
					3, rtVal[2] );
		}
	}
}
