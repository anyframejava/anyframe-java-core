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

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.mip.query.MiPQueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.platform.data.ColumnInfo;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.Variant;

/**
 * TestCase Name : MiPQueryServiceCallableStatementTest <br>
 * <br>
 * [Description] : CallableStatement is executed and its return value is
 * verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Query statement calling for Function FUNC_RETURN_NUM
 * defined at DBMS via execute() method of MiPQueryService and its return value
 * is verified.</li>
 * <li>#-2 Positive Case : Query statement calling for Procedure PROC_TOCHAR
 * defined at DBMS via execute() method of MiPQueryService and its return value
 * is verified.</li>
 * <li>#-3 Positive Case : Query statement calling for
 * PKG_REFCURSOR_TEST.PROC_RECORD_SET defined at DBMS via execute() method of
 * MiPQueryService and its return value is verified.</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class MiPQuerySerivceCallableStatementTest {

	@Inject
	private MiPQueryService mipQueryService;

	@Inject
	private DataSource dataSource = null;

	/**
	 * Function FUNC_RETURN_NUM, Procedure PROC_TOCHAR_SYSDATE, PACKAGE
	 * PKG_REFCURSOR_TEST is created for test.
	 */
	@Before
	public void onSetUp() {
		Connection conn = null;
		Statement statement = null;
		try {
			conn = dataSource.getConnection();
			statement = conn.createStatement();
			// 1. drop function
			try {
				System.out.println("Attempting to drop old table");
				statement.executeUpdate("DROP FUNCTION FUNC_RETURN_NUM");
			} catch (Exception e) {
				System.out.println("Fail to DROP Function.");
			}

			// 2. drop procedure
			try {
				statement.executeUpdate("DROP PROCEDURE PROC_TOCHAR");
			} catch (Exception e) {
				System.out.println("Fail to DROP Procedure.");
			}

			// 3. drop package
			try {
				statement.executeUpdate("DROP PACKAGE PKG_REFCURSOR_TEST");
			} catch (Exception e) {
				System.out.println("Fail to DROP Package.");
			}

			// 4. create function for test
			statement
					.executeUpdate("create FUNCTION FUNC_RETURN_NUM (v_in1 IN number) RETURN number IS BEGIN return 1; END;");

			// 5. create procedure for test
			statement
					.executeUpdate("CREATE OR REPLACE PROCEDURE PROC_TOCHAR ( "
							+ " OUT_RESULT OUT VARCHAR2, "
							+ " IN_CONDITION IN VARCHAR2 "
							+ " ) "
							+ " AS "
							+ " BEGIN "
							+ " SELECT "
							+ "      'Anyframe '||IN_CONDITION as RESULT into OUT_RESULT "
							+ " FROM dual; "
							+ " EXCEPTION "
							+ " WHEN OTHERS THEN "
							+ "      DBMS_OUTPUT.PUT_LINE( TO_CHAR(SQLCODE) || ' : ' || SQLERRM ); "
							+ " END;");

			// 6. create package for test
			StringBuffer sql = new StringBuffer();
			sql.append("CREATE OR REPLACE PACKAGE PKG_REFCURSOR_TEST AS ");
			sql.append("TYPE dReport IS REF CURSOR; ");
			sql.append("PROCEDURE PROC_RECORD_SET( ");
			sql.append("I_NAME IN VARCHAR2, ");
			sql.append("p_RecordSet OUT dReport ");
			sql.append("); ");
			sql.append("END PKG_REFCURSOR_TEST;");
			statement.executeUpdate(sql.toString());

			// 7. create package body for test
			sql = new StringBuffer();
			sql.append("CREATE OR REPLACE PACKAGE BODY PKG_REFCURSOR_TEST AS ");
			sql.append("PROCEDURE PROC_RECORD_SET( ");
			sql.append("I_NAME IN VARCHAR2, ");
			sql.append("p_RecordSet           OUT dReport ");
			sql.append(") AS ");
			sql.append("BEGIN ");
			sql.append("IF TRIM(I_NAME) IS NULL THEN ");
			sql.append("OPEN p_RecordSet FOR ");
			sql.append("SELECT 'N/A' NAME, 'BLOCK' STATUS ");
			sql.append("FROM   DUAL; ");
			sql.append("ELSE ");
			sql.append("OPEN p_RecordSet FOR ");
			sql.append("SELECT I_NAME NAME, 'ACTIVE' STATUS FROM DUAL ");
			sql.append("UNION ALL ");
			sql.append("SELECT I_NAME, 'READY' FROM DUAL ");
			sql.append("UNION ALL ");
			sql.append("SELECT I_NAME, 'BLOCK' FROM DUAL; ");
			sql.append("END IF; ");
			sql.append("END PROC_RECORD_SET; ");
			sql.append("END PKG_REFCURSOR_TEST; ");
			statement.executeUpdate(sql.toString());
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			Assert.fail("Unable to initialize database for test. " + e);
		} finally {
			try {
				if (statement != null)
					statement.close();
				if (conn != null)
					conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * [Flow #-1] Positive Case : Query statement calling for Function
	 * FUNC_RETURN_NUM defined at DBMS via execute()method of QueryService and
	 * its return value is verified. Executed query statement is as follows. {?
	 * = call FUNC_RETURN_NUM(?)}
	 * 
	 * @throws QueryException
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFunction() {
		// 1. set data for test

		Dataset inDs = new Dataset();
		inDs.setDataSetID("test");
		inDs.addIntegerColumn("inVal");

		inDs.appendRow();
		Variant variant1 = new Variant();
		variant1.setObject("1");
		inDs.setColumn(0, "inVal", variant1);

		inDs.appendRow();
		Variant variant2 = new Variant();
		variant2.setObject("1");
		inDs.setColumn(0, "inVal", variant2);

		DatasetList outDl = mipQueryService.execute("callFunction", inDs);
		Dataset outDs = outDl.get("callFunction0");

		// 3 assert
		Assert
				.assertTrue("Fail to execute function.",
						outDs.getRowCount() == 1);
		Assert.assertEquals("Fail to compare class type of outVal.",
				ColumnInfo.COLTYPE_DECIMAL, outDs.getColumnInfo(0)
						.getColumnType());
		Assert.assertTrue("Fail to execute function.", outDs.getColumnAsDouble(
				0, "outVal").doubleValue() == 1.0);
	}

	/**
	 * [Flow #-2] Positive Case : Query statement calling for Procedure
	 * PROC_TOCHAR_SYSDATE defined at DBMS via execute()method of
	 * MiPQueryService and its return value is verified. Executed query
	 * statement is as follows. {call PROC_TOCHAR_SYSDATE (?,?)}
	 * 
	 * @throws QueryException
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testProcedure() {
		// 1. set data for test
		Dataset inDs = new Dataset();
		inDs.setDataSetID("test");
		inDs.addStringColumn("inVal");

		inDs.appendRow();
		Variant variant = new Variant();
		variant.setString("MiPQueryService Procedure Test");
		inDs.setColumn(0, "inVal", variant);

		// 2. execute query
		DatasetList outDl = mipQueryService.execute("callProcedure", inDs);
		Dataset outDs = outDl.get("callProcedure0");

		// 3. assert
		Assert
				.assertTrue("Fail to execute function.",
						outDs.getRowCount() == 1);
		Assert.assertEquals("Fail to compare class type of outVal.", "STRING",
				outDs.getColumnInfo(0).getColumnTypeStr());

		Assert.assertEquals("Anyframe MiPQueryService Procedure Test", outDs
				.getColumnAsString(0, "outVal"));
	}

	/**
	 * [Flow #-3] Positive Case : Query statement calling for Procedure
	 * PROC_TOCHAR_SYSDATE defined at DBMS via execute()method of
	 * MiPQueryService and its return value is verified. Executed query
	 * statement is as follows. {call PKG_REFCURSOR_TEST.PROC_RECORD_SET(?, ?)}
	 * 
	 * @throws QueryException
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testPackage() {
		// 1. set data for test
		Dataset inDs = new Dataset();
		inDs.setDataSetID("test1");
		inDs.addStringColumn("inVal");

		inDs.appendRow();
		Variant variant1 = new Variant();
		variant1.setString("KKN");
		inDs.setColumn(0, "inVal", variant1);

		inDs.appendRow();
		Variant variant2 = new Variant();
		variant2.setString(null);
		inDs.setColumn(1, "inVal", variant2);

		// 2. execute query
		DatasetList outDl = mipQueryService.execute("callPackage", inDs);

		Dataset outDs1 = outDl.get("callPackage0");
		Dataset outDs2 = outDl.get("callPackage1");

		// 3. assert
		Assert.assertEquals("Fail to compare result size.", 3, outDs1
				.getRowCount());
		Assert.assertEquals("Fail to compare result size.", 1, outDs2
				.getRowCount());

		// 4. assert in detail
		for (int i = 0; i < outDs1.getRowCount(); i++) {

			Assert.assertEquals("Fail to compare a value of NAME column.",
					"KKN", outDs1.getColumnAsString(i, "NAME"));
			if (i == 0)
				Assert.assertEquals(
						"Fail to compare a value of STATUS column.", "ACTIVE",
						outDs1.getColumnAsString(i, "STATUS"));
			else if (i == 1)
				Assert.assertEquals(
						"Fail to compare a value of STATUS column.", "READY",
						outDs1.getColumnAsString(i, "STATUS"));
			else if (i == 2)
				Assert.assertEquals(
						"Fail to compare a value of STATUS column.", "BLOCK",
						outDs1.getColumnAsString(i, "STATUS"));
		}

		for (int i = 0; i < outDs2.getRowCount(); i++) {

			Assert.assertEquals("Fail to compare a value of NAME column.",
					"N/A", outDs2.getColumnAsString(i, "NAME"));
			Assert.assertEquals("Fail to compare a value of STATUS column.",
					"BLOCK", outDs2.getColumnAsString(i, "STATUS"));
		}
	}
}