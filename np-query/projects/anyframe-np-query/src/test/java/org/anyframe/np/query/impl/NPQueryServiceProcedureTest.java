package org.anyframe.np.query.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.np.query.NPQueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.DataTypes;

/**
 * TestCase Name : NPQueryServiceProcedureTest<br>
 * <br>
 * [Description] : BUG로 등록된 [AF-277] 이슈에 대한 처리 결과를 검증한다.<br>
 * Procedure 호출을 위해서 NPQueryService.execute 메소드 호출 시, Out Parameter가 2개 이상인 경우<br>
 * 가장 마지막에 선언한 Parameter만 Return 되는 버그가 있었음.<br>
 * 
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : NPQueryService.execute() 메소드를 실행 시킨다. 
 * 이 때 수행되는 Procedure는 OUT Parameter를 2개로 선언해두었다.
 * OUT Parameter로 선언한 변수들이 올바로 DataSetList에 저장되어 있는지 검증한다.
 * </li>
 * </ul>
 * @author Youngmin Jo
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class NPQueryServiceProcedureTest {

	@Inject
	private NPQueryService npQueryService;

	@Inject
	private DataSource dataSource = null;

	@Before
	public void onSetUp() {
		Connection conn = null;
		Statement statement = null;
		try {
			conn = dataSource.getConnection();
			statement = conn.createStatement();

			// 2. drop procedure
			try {
				statement.executeUpdate("DROP PROCEDURE PROC_TWO_PARAM");
			} catch (Exception e) {
				System.out.println("Fail to DROP Procedure.");
			}

			// 7. create procedure for test
			statement
					.executeUpdate("CREATE OR REPLACE PROCEDURE PROC_TWO_PARAM ( "
							+ " OUT_RESULT1 OUT VARCHAR2, "
							+ " OUT_RESULT2 OUT VARCHAR2, "
							+ " IN_CONDITION IN VARCHAR2 "
							+ " ) "
							+ " AS "
							+ " BEGIN "
							+ " SELECT "
							+ "      'Anyframe1 '||IN_CONDITION as RESULT1, 'Anyframe2 '||IN_CONDITION as RESULT2 "
							+ "      into OUT_RESULT1,  OUT_RESULT2 "
							+ " FROM dual; "
							+ " EXCEPTION "
							+ " WHEN OTHERS THEN "
							+ "      DBMS_OUTPUT.PUT_LINE( TO_CHAR(SQLCODE) || ' : ' || SQLERRM ); "
							+ " END;");

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
				System.err.println("Unable to initialize database for test."
						+ e.getMessage());
			}
		}
	}

	@Test
	public void testProcedure() {
		DataSet inDs = new DataSet("test");
		inDs.addColumn("inVal", DataTypes.STRING);

		inDs.newRow();
		inDs.set(0, "inVal", "NPQueryService Procedure Test");
		
		inDs.newRow();
		inDs.set(1, "inVal", "NPQueryService Procedure Test2");
		
		DataSetList outDl = null;

		try {
			outDl = npQueryService.execute("callProcedureTwo", inDs);
		} catch (Exception e) {
			e.printStackTrace();
		}

        Assert.assertEquals(2, outDl.size());

        DataSet outDs1 = outDl.get("outVal1");
        DataSet outDs2 = outDl.get("outVal2");

        Assert.assertTrue("Fail to execute function.", outDs1.getRowCount() == 1);
        Assert.assertEquals("Fail to compare class type of outVal.",
                DataTypes.STRING, outDs1.getColumn(0).getDataType());

	}
}
