package org.anyframe.np.query.impl;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.DataTypes;
import com.nexacro.xapi.data.VariableList;
import junit.framework.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * TestCase Name : NPServiceProcedureTest<br>
 * <br>
 * [Description] : BUG로 등록된 [AEJOLTP-170] 이슈에 대한 처리 결과를 검증한다.<br>
 * Procedure 호출을 위해서 NPQueryService.execute 메소드 호출 시, <br>
 * Procedure는 정상적으로 호출이 되지만 결과 DataSet을 가져올 때 NullPointer가 발생하는 버그<br>
 *
 * [원인] <br>
 * NPQueryService에서 OUT Parameter 명으로 DataSet을 생성하는데,
 * NPService에서는 querySet 이름으로 결과 DataSet을 가져오면서 NullPointerException 발생
 *
 * [수정 및 기능 추가] <br>
 * 1. OUT Parameter는 하나의 결과 DataSet으로 매핑이 된다.<br>
 *   다건의 QuerySet과 다건의 Procedure가 호출되면 결과 DataSet의 많아지게 되어 복잡한 Naming 문제가 발생.<br>
 *   querySet1_outParamName 으로 명명규칙을 정함으로써 결과 DataSet의 명명 규칙 복잡도를 간소화함 <br>
 *
 * 2. 기존 NPServiceImpl에서 잘못된 DataSet 이름으로 결과 DataSet을 가져오는 부분 수정 <br>
 *    querySet1_outParamName으로 결과 DataSet을 가져오도록 함 <br>
 *
 * 3. 기존 NPQueryServiceImpl의 execute 로직에서 중복된 로직을 리펙토링함  <br>
 *
 *
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : NPQueryService.execute() 메소드를 실행 시킨다.
 * OUT Parameter로 선언한 변수들이 올바로 Result DataSetList에 저장되어 있는지 검증한다.
 * </li>
 * </ul>
 *
 * @author Sunjoong Kim
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class NPServiceProcedureTest {

	@Inject
	private org.anyframe.np.query.NPQueryService npQueryService;

    @Inject
    @Named("npService")
    private org.anyframe.np.query.service.NPService npService;


	@Inject
	private DataSource dataSource = null;

	@Before
	public void onSetUp() {
		Connection conn = null;
		Statement statement = null;
		try {
			conn = dataSource.getConnection();
			statement = conn.createStatement();

			try {
                //1. Test Table & Procedure 삭제
                statement.executeUpdate("DROP TABLE PROC_TEST_TABLE");
                statement.executeUpdate("DROP PROCEDURE SELECT_CURSOR");
                statement.executeUpdate("DROP PROCEDURE SELECT_ONE");
                statement.executeUpdate("DROP PROCEDURE DELETE_ONE");
                statement.executeUpdate("DROP PROCEDURE SELECT_ONE_WITHOUT_IN");
                statement.executeUpdate("DROP PROCEDURE SELECT_ONE_WITH_MULTIPLE_INPUT");

            } catch (Exception e) {
				System.out.println("Fail to DROP Procedure.");
			}

            // 2. Test 테이블 생성
            statement.executeUpdate("CREATE TABLE PROC_TEST_TABLE ( "
                    + "TABLE_ID VARCHAR2(16) NOT NULL, "
                    + "TABLE_COLUMN1 VARCHAR2(16),"
                    + "CONSTRAINT PK_PROC_TEST_TABLE PRIMARY KEY (TABLE_ID)"
                    + ")" );

            statement.executeUpdate("INSERT INTO PROC_TEST_TABLE VALUES ('ID-0001', NULL) ");
            statement.executeUpdate("INSERT INTO PROC_TEST_TABLE VALUES ('ID-0002', NULL) ");
            statement.executeUpdate("INSERT INTO PROC_TEST_TABLE VALUES ('ID-0003', NULL) ");
            statement.executeUpdate("INSERT INTO PROC_TEST_TABLE VALUES ('ID-0004', NULL) ");

            // 3. Test Procedure 생성
            StringBuilder sql = new StringBuilder();
            sql.append("CREATE or REPLACE PROCEDURE SELECT_CURSOR");
            sql.append("(OUT_CURSOR OUT SYS_REFCURSOR)\n");
            sql.append("AS BEGIN\n");
            sql.append("OPEN OUT_CURSOR FOR\n");
            sql.append("SELECT TABLE_ID FROM PROC_TEST_TABLE;\n");
            sql.append("END;");
            statement.executeUpdate(sql.toString());

            sql = new StringBuilder();
            sql.append("CREATE or REPLACE PROCEDURE SELECT_ONE");
            sql.append("(IN_TABLE_ID IN VARCHAR, OUT_TABLE_ID OUT VARCHAR)\n");
            sql.append("AS BEGIN\n");
            sql.append("SELECT TABLE_ID INTO OUT_TABLE_ID\n");
            sql.append("FROM PROC_TEST_TABLE\n");
            sql.append("WHERE TABLE_ID = IN_TABLE_ID;\n");
            sql.append("END;");
            statement.executeUpdate(sql.toString());

            sql = new StringBuilder();
            sql.append("CREATE or REPLACE PROCEDURE SELECT_ONE_WITHOUT_IN");
            sql.append("(OUT_TABLE_ID OUT VARCHAR)\n");
            sql.append("AS BEGIN\n");
            sql.append("SELECT TABLE_ID INTO OUT_TABLE_ID\n");
            sql.append("FROM PROC_TEST_TABLE\n");
            sql.append("WHERE TABLE_ID = 'ID-0001';\n");
            sql.append("END;");
            statement.executeUpdate(sql.toString());

            sql = new StringBuilder();
            sql.append("CREATE or REPLACE PROCEDURE SELECT_ONE_WITH_MULTIPLE_INPUT\n");
            sql.append("(IN_TABLE_ID_1 IN VARCHAR,\n");
            sql.append("IN_TABLE_ID_2 IN VARCHAR,\n");
            sql.append("OUT_CURSOR OUT SYS_REFCURSOR)\n");
            sql.append("AS BEGIN\n");
            sql.append("OPEN OUT_CURSOR FOR\n");
            sql.append("SELECT TABLE_ID FROM PROC_TEST_TABLE\n");
            sql.append("WHERE TABLE_ID <> IN_TABLE_ID_1\n");
            sql.append("AND TABLE_ID <> IN_TABLE_ID_2;\n");
            sql.append("END;");
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
				System.err.println("Unable to initialize database for test."
						+ e.getMessage());
			}
		}
	}

    /**
     * 하나의 Procedure를 호출한 경우
     * IN : inVal  (변수)
     * OUT : outVal    (변수)
     */
    @Test
    public void testWithOutVariable() throws Exception {
        VariableList inVl = new VariableList();
        DataSetList inDl = new DataSetList();
        VariableList outVl = new VariableList();
        DataSetList outDl = new DataSetList();

        inVl.add("querySetCount" , 1);
        inVl.add("querySet1" , "callSelectOne");

        DataSet inDs = new DataSet("querySet1");
        //Mapping Query의 IN 변수 명과 동일하게 한다.
        inDs.addColumn("inVal", DataTypes.STRING);
        inDs.newRow();
        inDs.set(0, "inVal", "ID-0001");

        inDl.add(inDs);

        npService.execute(inVl, inDl, outVl, outDl);

        //결과는 querySet1_outValName
        DataSet outVal = outDl.get("querySet1_outVal");
        Assert.assertEquals(outVal.getRowCount(), 1);
        Assert.assertEquals(outVal.getString(0,0), "ID-0001");
    }

    /**
     * 하나의 Procedure를 호출한 경우
     * OUT : outVal (변수)
     */
    @Test
    public void testWithOutVariableWithoutInVariable() throws Exception {
        VariableList inVl = new VariableList();
        DataSetList inDl = new DataSetList();
        VariableList outVl = new VariableList();
        DataSetList outDl = new DataSetList();

        inVl.add("querySetCount" , 1);
        inVl.add("querySet1" , "callSelectOneWithoutIn");

        npService.execute(inVl, inDl, outVl, outDl);

        DataSet outVal = outDl.get("querySet1_outVal");
        Assert.assertEquals(outVal.getRowCount(), 1);
        Assert.assertEquals(outVal.getString(0,0), "ID-0001");
    }

    /**
     * 하나의 Procedure를 호출한 경우
     * OUT : outVal (커서)
     */
    @Test
    public void testWithCursor() throws Exception {
        VariableList inVl = new VariableList();
        DataSetList inDl = new DataSetList();
        VariableList outVl = new VariableList();
        DataSetList outDl = new DataSetList();

        inVl.add("querySetCount" , 1);
        inVl.add("querySet1" , "callSelectCursor");

        npService.execute(inVl, inDl, outVl, outDl);

        DataSet outVal = outDl.get("querySet1_outVal");

        Assert.assertEquals(outVal.getRowCount(), 4);
        Assert.assertEquals(outVal.getString(0,0), "ID-0001");
    }

    /**
     * 여러개의 Procedure를 호출한 경우
     * 1. querySet1
     * OUT : outVal (커서)
     *
     * 2. querySet1
     * OUT : outVal (변수)
     */
    @Test
    public void testMultipleQuerySet() throws Exception {
        VariableList inVl = new VariableList();
        DataSetList inDl = new DataSetList();
        VariableList outVl = new VariableList();
        DataSetList outDl = new DataSetList();

        inVl.add("querySetCount" , 2);
        inVl.add("querySet1" , "callSelectCursor");
        inVl.add("querySet2" , "callSelectOneWithoutIn");

        npService.execute(inVl, inDl, outVl, outDl);

        DataSet querySet1_outVal = outDl.get("querySet1_outVal");
        DataSet querySet2_outVal = outDl.get("querySet2_outVal");

        Assert.assertEquals(querySet1_outVal.getRowCount(), 4);
        Assert.assertEquals(querySet1_outVal.getString(0,0), "ID-0001");

        Assert.assertEquals(querySet2_outVal.getRowCount(), 1);
        Assert.assertEquals(querySet2_outVal.getString(0,0), "ID-0001");
    }

    /**
     * 여러개의 Input Parameter를 전달하는 경우
     * 1. querySet1
     * IN : inVal1, inVal2
     * OUT : outVal (커서)
     *
     */
    @Test
    public void testMultipleInputParams() throws Exception {
        VariableList inVl = new VariableList();
        DataSetList inDl = new DataSetList();
        VariableList outVl = new VariableList();
        DataSetList outDl = new DataSetList();

        inVl.add("querySetCount" , 1);
        inVl.add("querySet1" , "callSelectOneWithMultipleInput");

        DataSet ds = new DataSet("querySet1");
        ds.addColumn("inVal1", DataTypes.STRING);
        ds.addColumn("inVal2", DataTypes.STRING);
        ds.newRow();
        ds.set(0, "inVal1" , "ID-0001");
        ds.set(0, "inVal2" , "ID-0002");

        inDl.add(ds);

        npService.execute(inVl, inDl, outVl, outDl);

        DataSet querySet1_outVal = outDl.get("querySet1_outVal");

        Assert.assertEquals(querySet1_outVal.getRowCount(), 2);
        Assert.assertEquals(querySet1_outVal.getString(0,0), "ID-0003");
    }
}


