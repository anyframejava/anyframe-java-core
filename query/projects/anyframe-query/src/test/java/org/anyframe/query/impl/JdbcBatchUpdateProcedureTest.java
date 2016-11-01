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

import java.lang.reflect.Method;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlTypeValue;
import org.springframework.jdbc.core.StatementCreatorUtils;
import org.springframework.jdbc.support.nativejdbc.NativeJdbcExtractor;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : JdbcBatchUpdateProcedureTest <br>
 * <br>
 * [Description] : Various methods regarding batch-processing of procedure are
 * tested and verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Procedure defined with Jdbc is batch-processed and
 * the result is verified.</li>
 * <li>#-2 Positive Case : Procedure is batch-processed with Spring JdbcTemplate
 * and the result is verified.</li>
 * <li>#-3 Positive Case : Procedure is batch-processed with Oracle-style and
 * the result is verified.</li>
 * </ul>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class JdbcBatchUpdateProcedureTest {

	@Inject
	DataSource dataSource;

	@Inject
	NativeJdbcExtractor nativeJdbcExtractor;

	ArrayList args = new ArrayList();

	String sql = null;

	/**
	 * Initial data is entered for test and PROC_BATCH_TEST, TB_BATCH_TEST is
	 * created.
	 */
	@Before
	public void initialize() throws Exception {
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

			sql = "DECLARE  " + "col1      VARCHAR2(50):= ?;  "
					+ "col2      VARCHAR2(50):= ?;  "
					+ "col3      NUMBER:= ?; " + "BEGIN "
					+ "PROC_BATCH_TEST(col1, col2, col3 ); " + "END; ";

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
		} catch (SQLException e) {
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : Procedure defined with Jdbc is batch-processed
	 * and the result is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from PreparedStatement
	 */
	@Test
	public void testBatchByJdbc() throws Exception {
		Connection conn = dataSource.getConnection();
		PreparedStatement ps = conn.prepareStatement(sql);

		for (int i = 0; i < args.size(); i++) {
			Object[] psArg = (Object[]) args.get(i);

			for (int j = 0; j < psArg.length; j++) {
				StatementCreatorUtils.setParameterValue(ps, j + 1,
						SqlTypeValue.TYPE_UNKNOWN, null, psArg[j]);
			}

			ps.addBatch();
		}

		int[] numUpdates = ps.executeBatch();

		Assert.assertEquals("fail to execute batch by jdbc.", 3,
				numUpdates.length);

	}

	/**
	 * [Flow #-2] Positive Case : Procedure defined with Spring JdbcTemplate is
	 * batch processed and the result is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from PreparedStatement
	 */
	@Test
	public void testBatchSpringJdbcTemplate() throws Exception {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

		int[] numUpdates = jdbcTemplate.batchUpdate(sql,
				new BatchPreparedStatementSetter() {

					public int getBatchSize() {
						return args.size();
					}

					public void setValues(PreparedStatement ps, int index)
							throws SQLException {
						Object[] arg = (Object[]) (args.get(index));
						for (int i = 0; i < arg.length; i++) {
							StatementCreatorUtils.setParameterValue(ps, i + 1,
									SqlTypeValue.TYPE_UNKNOWN, null, arg[i]);
						}
					}
				});

		Assert.assertEquals("fail to execute batch by jdbc.", 3,
				numUpdates.length);
	}

	/**
	 * [Flow #-3] Positive Case : Procedure is batch-processed with Oracle-style
	 * and the result is verified.
	 * 
	 * @throws Exception
	 *             throws exception which is from PreparedStatement
	 */
	@Test
	public void testOracleStyledBatch() throws Exception {
		Connection conn = dataSource.getConnection();
		CallableStatement cs = conn.prepareCall(sql);

		int[] numUpdates = new int[3];

		if (nativeJdbcExtractor != null) {
			cs = nativeJdbcExtractor.getNativeCallableStatement(cs);
		}

		Method setExecuteBatchMethod = cs.getClass().getMethod(
				"setExecuteBatch", new Class[] { int.class });
		setExecuteBatchMethod.invoke(cs, new Object[] { new Integer(4) });

		for (int i = 0; i < args.size(); i++) {
			Object[] psArg = (Object[]) args.get(i);

			for (int j = 0; j < psArg.length; j++) {
				StatementCreatorUtils.setParameterValue(cs, j + 1,
						SqlTypeValue.TYPE_UNKNOWN, null, psArg[j]);
			}

			int updateCount = cs.executeUpdate();
			numUpdates[i] = updateCount;
		}

		Assert.assertEquals("fail to execute batch by jdbc.", 3,
				numUpdates.length);
	}
}
