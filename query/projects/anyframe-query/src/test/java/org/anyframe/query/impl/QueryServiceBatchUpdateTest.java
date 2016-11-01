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

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.BatchTestVO;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceBatchUpdateTest <br>
 * <br>
 * [Description] : QueryService의 batchCreate(), batchRemove(), batchUpdate(),
 * batchUpdateBySQL() 메소드를 호출하고 수행 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 여러건의 데이터를
 * Batch로 삭제하고 삭제가 성공적으로 이루어졌는지 확인한다.</li>
 * <li>#-2 Positive Case : QueryService의 batchRemove() 메소드를 호출하여 삭제 대상 데이터들을
 * BatchTestVO 객체에 담아 Batch로 삭제하고 삭제가 성공적으로 이루어졌는지 확인한다.</li>
 * <li>#-3 Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 수정할 대상 데이터들을
 * BatchTestVO 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.</li>
 * <li>#-4 Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 수정할 대상 데이터들을
 * HashMap 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.</li>
 * <li>#-5 Positive Case : QueryService의 batchExecute() 메소드를 호출하여 수정할 대상 데이터들을
 * Object[] 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다. batchExecute() 메소드 실행을
 * 통해 수행되는 쿼리는 프로시저를 호출한다.</li>
 * <li>#-6 Positive Case : QueryService의 batchExecuteBySQL() 메소드를 호출하여 수정할 대상
 * 데이터들을 Object[] 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.
 * batchExecuteBySQL() 메소드 실행을 통해 수행되는 쿼리는 프로시저를 호출한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceBatchUpdateTest extends
		AbstractDependencyInjectionSpringContextTests {

	private QueryService queryService = null;

	private int initCount = 0;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
		return new String[] { "classpath*:/spring/context-*.xml" };
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
			fail("Unable to initialize database for test. " + e);
		}
	}

	public void onTearDown() {
		setDirty();
	}

	/**
	 * [Flow #-1] Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 여러건의
	 * 데이터를 Batch로 삭제하고 삭제가 성공적으로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testBatchRemove() throws Exception {
		// 1. insert data
		batchInsert();

		// 2. set data for delete
		ArrayList args = new ArrayList();
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
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to batch remove.", rtList.size() == 0 + initCount);
	}

	/**
	 * [Flow #-2] Positive Case : QueryService의 batchRemove() 메소드를 호출하여 삭제 대상
	 * 데이터들을 BatchTestVO 객체에 담아 Batch로 삭제하고 삭제가 성공적으로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testBatchRemoveByObject() throws Exception {
		// 1. insert data by SQL
		batchInsertBySQL();

		// 2. set data for delete
		ArrayList args = new ArrayList();
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
		assertTrue("Fail to batch remove by object.", rtVal.length == 3);

		// 4. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to find.", rtList.size() == initCount);
	}

	/**
	 * [Flow #-3] Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 수정할 대상
	 * 데이터들을 BatchTestVO 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testBatchUpdateByObject() throws Exception {
		// 1. insert data by object
		batchInsertByObject();

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

		// 4. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});

		assertTrue("Fail to find.", rtList.size() == initCount + 3);
		for (int i = 0; i < rtList.size(); i++) {
			Map result = (Map) rtList.get(i);
			assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * [Flow #-4] Positive Case : QueryService의 batchUpdate() 메소드를 호출하여 수정할 대상
	 * 데이터들을 HashMap 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testBatchUpdateByMap() throws Exception {
		// 1. set data for insert
		ArrayList args = new ArrayList();

		Map batchTestMap = new HashMap();
		batchTestMap.put("col1", "I1BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(101));
		args.add(batchTestMap);

		batchTestMap = new HashMap();
		batchTestMap.put("col1", "I2BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(102));
		args.add(batchTestMap);

		batchTestMap = new HashMap();
		batchTestMap.put("col1", "I3BatchCreateByMap");
		batchTestMap.put("col2", "Modified");
		batchTestMap.put("col3", new Integer(103));
		args.add(batchTestMap);

		// 2. execute query
		int[] rtVal = queryService.batchUpdate("batchInsertWithMap", args);
		assertTrue("Fail to batch update by object.", rtVal.length == 3);

		// 3. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});

		assertTrue("Fail to find.", rtList.size() == initCount + 3);
		for (int i = 0; i < rtList.size(); i++) {
			Map result = (Map) rtList.get(i);
			assertEquals("Fail to batch update a specified column.",
					"Modified", result.get("col2"));
		}
	}

	/**
	 * [Flow #-5] Positive Case : QueryService의 batchExecute() 메소드를 호출하여 수정할 대상
	 * 데이터들을 Object[] 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.
	 * batchExecute() 메소드 실행을 통해 수행되는 쿼리는 프로시저를 호출한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testBatchInsertWithProcedure() throws Exception {
		ArrayList args = new ArrayList();
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

		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to batch insert.", rtList.size() == 3);
	}

	/**
	 * [Flow #-6] Positive Case : QueryService의 batchExecuteBySQL() 메소드를 호출하여
	 * 수정할 대상 데이터들을 Object[] 객체에 담아 Batch로 수정하고 수정 작업이 성공적으로 이루어졌는지 확인한다.
	 * batchExecuteBySQL() 메소드 실행을 통해 수행되는 쿼리는 프로시저를 호출한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testBatchInsertWithProcedureBySQL() throws Exception {
		String sql = "DECLARE  " + "col1      VARCHAR2(50):= ?;  "
				+ "col2      VARCHAR2(50):= ?;  " + "col3      NUMBER:= ?; "
				+ "BEGIN " + "PROC_BATCH_TEST(col1, col2, col3 ); " + "END; ";

		String[] types = new String[3];
		types[0] = "VARCHAR";
		types[1] = "VARCHAR";
		types[2] = "NUMERIC";

		ArrayList args = new ArrayList();
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

		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to batch insert.", rtList.size() == 3);
	}

	/**
	 * 사용자 정보를 Object[] 형태로 전달하고, QueryService의 batchUpdate() 메소드를 호출하여 신규 사용자
	 * 정보를 Batch로 등록한다. 그리고 등록 작업이 성공적으로 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsert() throws Exception {
		// 1. set data for insert
		ArrayList args = new ArrayList();
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
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to batch insert.", rtList.size() == 3 + initCount);
	}

	/**
	 * Object[] 형태의 사용자 정보와 코드 내에 정의한 쿼리문을 전달하고, QueryService의
	 * batchUpdateBySQL() 메소드를 호출하여 신규 사용자 정보를 Batch로 등록한다. 그리고 등록 작업이 성공적으로
	 * 이루어졌는지 확인한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void batchInsertBySQL() throws Exception {
		// 1. set query statement for insert
		String sql = "insert into TB_BATCH_TEST(col1, col2, col3) values (?,?,?)";

		// 2. set data for insert
		String[] types = new String[3];
		types[0] = "VARCHAR";
		types[1] = "VARCHAR";
		types[2] = "NUMERIC";
		ArrayList args = new ArrayList();
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
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to batch insert by SQL.",
				rtList.size() == 3 + initCount);
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

		// 2. execute query
		int[] rtVal = queryService.batchCreate(args);
		assertTrue("Fail to batch insert by Object.", rtVal.length == 3);

		// 3. assert
		ArrayList rtList = (ArrayList) queryService.find("findBatchTest",
				new Object[] {});
		assertTrue("Fail to find.", rtList.size() == initCount + 3);
	}
}
