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
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import oracle.jdbc.driver.OracleTypes;

import org.anyframe.query.QueryService;
import org.anyframe.util.DateUtil;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceCallableStatementTest
 * <br>
 * <br>
 * [Description] : CallableStatement를 실행시키고 결과값을 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 execute()
 * 메소드를 통해 DBMS에 정의된 Function FUNC_RETURN_NUM를 호출하는
 * 쿼리문을 실행시키고 결과값을 검증한다.</li>
 * <li>#-2 Positive Case : QueryService의 execute()
 * 메소드를 통해 DBMS에 정의된 Procedure PROC_TOCHAR_SYSDATE를
 * 호출하는 쿼리문을 실행시키고 결과값을 검증한다.</li>
 * <li>#-3 Positive Case : QueryService의 execute()
 * 메소드를 통해 DBMS에 정의된 Package
 * PKG_REFCURSOR_TEST.PROC_RECORD_SET를 호출하는 쿼리문을 실행시키고
 * 결과값을 검증한다.</li>
 * <li>#-4 Positive Case : 일반 JDBC를 이용하여 DBMS에 정의된
 * Package PKG_REFCURSOR_TEST.PROC_RECORD_SET를 호출하는
 * 쿼리문을 실행시키고 결과값을 검증한다.</li>
 * <li>#-5 Positive Case : QueryService의
 * executeBySQL() 메소드를 통해 DBMS에 정의된 Function
 * FUNC_RETURN_NUM를 호출하는 쿼리문을 직접 전달하여 실행시키고 결과값을 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceCallableStatementTest extends
        AbstractDependencyInjectionSpringContextTests {

    private QueryService queryService = null;

    private DataSource dataSource = null;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    protected String[] getConfigLocations() {
        setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

    /**
     * 테스트를 위해 Function FUNC_RETURN_NUM, Procedure
     * PROC_TOCHAR_SYSDATE, PACKAGE PKG_REFCURSOR_TEST를
     * 생성한다.
     */
    public void onSetUp() throws Exception {
        System.out.println("Attempting to drop old table");

        // 1. drop function
        try {
            queryService.updateBySQL("DROP FUNCTION FUNC_RETURN_NUM",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Function.");
        }

        // 2. drop procedure
        try {
            queryService.updateBySQL("DROP PROCEDURE PROC_TOCHAR_SYSDATE",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Procedure.");
        }

        // 3. drop package
        try {
            queryService.updateBySQL("DROP PACKAGE PKG_REFCURSOR_TEST",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Package.");
        }

        // 4. create function for test
        queryService
            .updateBySQL(
                "create FUNCTION FUNC_RETURN_NUM (v_in1 IN number) RETURN number IS BEGIN return 1; END;",
                new String[] {}, new Object[] {});

        // 5. create procedure for test
        queryService
            .updateBySQL(
                "CREATE OR REPLACE PROCEDURE PROC_TOCHAR_SYSDATE ( "
                    + " OUT_RESULT OUT VARCHAR2, "
                    + " IN_CONDITION IN DATE "
                    + " ) "
                    + " AS "
                    + " BEGIN "
                    + " SELECT "
                    + "      to_char(IN_CONDITION, 'YYYYMMDD') as today into OUT_RESULT "
                    + " FROM dual; "
                    + " EXCEPTION "
                    + " WHEN OTHERS THEN "
                    + "      DBMS_OUTPUT.PUT_LINE( TO_CHAR(SQLCODE) || ' : ' || SQLERRM ); "
                    + " END;", new String[] {}, new Object[] {});

        // 6. create package for test
        StringBuffer sql = new StringBuffer();
        sql.append("CREATE OR REPLACE PACKAGE PKG_REFCURSOR_TEST AS ");
        sql.append("TYPE dReport IS REF CURSOR; ");
        sql.append("PROCEDURE PROC_RECORD_SET( ");
        sql.append("I_NAME IN VARCHAR2, ");
        sql.append("p_RecordSet OUT dReport ");
        sql.append("); ");
        sql.append("END PKG_REFCURSOR_TEST;");
        queryService.updateBySQL(sql.toString(), new String[] {},
            new Object[] {});

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
        queryService.updateBySQL(sql.toString(), new String[] {},
            new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의
     * execute() 메소드를 통해 DBMS에 정의된 Function
     * FUNC_RETURN_NUM를 호출하는 쿼리문을 실행시키고 결과값을 검증한다. 실행되는
     * 쿼리문은 다음과 같다. {? = call FUNC_RETURN_NUM(?)}
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFunction() throws Exception {
        // 1. set data for test
        HashMap inVal = new HashMap();
        inVal.put("inVal", new Integer(1));

        // 2. execute query
        Map results = queryService.execute("callFunction", inVal);

        // 3. assert
        assertTrue("Fail to execute function.", results.size() == 1);
        assertEquals("Fail to compare class type of outVal.", BigDecimal.class,
            results.get("outVal").getClass());

        BigDecimal rtVal = (BigDecimal) results.get("outVal");
        assertTrue("Fail to execute function.", rtVal.intValue() == 1);
    }

    /**
     * [Flow #-2] Positive Case : QueryService의
     * execute() 메소드를 통해 DBMS에 정의된 Procedure
     * PROC_TOCHAR_SYSDATE를 호출하는 쿼리문을 실행시키고 결과값을 검증한다.
     * 실행되는 쿼리문은 다음과 같다. {call PROC_TOCHAR_SYSDATE
     * (?,?)}
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testProcedure() throws Exception {
        // 1. set data for test
        HashMap inVal = new HashMap();
        inVal.put("inVal", new Timestamp(DateUtil.string2Date("20081111",
            "yyyyMMdd").getTime()));

        // 2. execute query
        Map results = queryService.execute("callProcedure", inVal);

        // 3. assert
        assertTrue("Fail to execute function.", results.size() == 1);
        assertEquals("Fail to compare class type of outVal.", String.class,
            results.get("outVal").getClass());

        assertEquals("20081111", results.get("outVal"));
    }

    /**
     * [Flow #-3] Positive Case : QueryService의
     * execute() 메소드를 통해 DBMS에 정의된 Package
     * PKG_REFCURSOR_TEST.PROC_RECORD_SET를 호출하는 쿼리문을
     * 실행시키고 결과값을 검증한다. 실행되는 쿼리문은 다음과 같다. {call
     * PKG_REFCURSOR_TEST.PROC_RECORD_SET(?, ?)}
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testPackage() throws Exception {
        // 1. set data for test
        HashMap inVal = new HashMap();
        inVal.put("inVal", "KKN");

        // 2. execute query
        Map results = queryService.execute("callPackage", inVal);

        // 3. assert
        assertEquals("Fail to compare class type of outVal.", ArrayList.class,
            results.get("outVal").getClass());

        ArrayList rtVal = (ArrayList) results.get("outVal");

        assertEquals("Fail to compare result size.", 3, rtVal.size());

        // 4. assert in detail
        for (int i = 0; i < rtVal.size(); i++) {
            Map result = (Map) rtVal.get(i);

            assertEquals("Fail to compare a value of NAME column.", "KKN",
                result.get("NAME"));
            if (i == 0)
                assertEquals("Fail to compare a value of STATUS column.",
                    "ACTIVE", result.get("STATUS"));
            else if (i == 1)
                assertEquals("Fail to compare a value of STATUS column.",
                    "READY", result.get("STATUS"));
            else if (i == 2)
                assertEquals("Fail to compare a value of STATUS column.",
                    "BLOCK", result.get("STATUS"));
        }

        // 5. set data for another test
        inVal = new HashMap();
        inVal.put("inVal", null);

        // 6. execute query
        results = queryService.execute("callPackage", inVal);

        // 7. assert
        assertEquals("Fail to compare class type of outVal.", ArrayList.class,
            results.get("outVal").getClass());

        rtVal = (ArrayList) results.get("outVal");
        assertEquals("Fail to compare result size.", 1, rtVal.size());

        // 8. assert in detail
        for (int i = 0; i < rtVal.size(); i++) {
            Map result = (Map) rtVal.get(i);
            assertEquals("Fail to compare a value of NAME column.", "N/A",
                result.get("NAME"));
            assertEquals("Fail to compare a value of STATUS column.", "BLOCK",
                result.get("STATUS"));
        }
    }

    /**
     * [Flow #-4] Positive Case : 일반 JDBC를 이용하여 DBMS에
     * 정의된 Package PKG_REFCURSOR_TEST.PROC_RECORD_SET를
     * 호출하는 쿼리문을 실행시키고 결과값을 검증한다. 실행되는 쿼리문은 다음과 같다.
     * {call PKG_REFCURSOR_TEST.PROC_RECORD_SET(?, ?)}
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testPackageByJdbc() throws Exception {
        Connection conn = null;
        ResultSet rs = null;
        CallableStatement statement = null;
        try {
            // 1. get connection
            conn = this.dataSource.getConnection();

            // 2. execute CallableStatement
            statement =
                conn
                    .prepareCall("{call PKG_REFCURSOR_TEST.PROC_RECORD_SET(?, ?)}");
            statement.setString(1, "KKN");
            statement.registerOutParameter(2, OracleTypes.CURSOR);
            statement.execute();

            // 3. get result
            rs = (ResultSet) statement.getObject(2);

            // 4. assert
            int i = 0;
            while (rs.next()) {
                assertEquals("Fail to compare a value of NAME column.", "KKN",
                    rs.getString(1));
                if (i++ == 0)
                    assertEquals("Fail to compare a value of STATUS column.",
                        "ACTIVE", rs.getString(2));
                else if (i++ == 1)
                    assertEquals("Fail to compare a value of STATUS column.",
                        "READY", rs.getString(2));
                else if (i++ == 2)
                    assertEquals("Fail to compare a value of STATUS column.",
                        "BLOCK", rs.getString(2));
            }
        } catch (Exception e) {
            fail("Fail to execute Oracle package. Reason : " + e.getMessage());
        } finally {
            rs.close();
            statement.close();
            conn.close();
        }
    }

    /**
     * [Flow #-5] Positive Case : QueryService의
     * executeBySQL() 메소드를 통해 DBMS에 정의된 Function
     * FUNC_RETURN_NUM를 호출하는 쿼리문을 직접 전달하여 실행시키고 결과값을
     * 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFunctionBySQL() throws Exception {
        String sql = "{? = call FUNC_RETURN_NUM(?)}";
        String[] paramTypeNames = {"NUMERIC", "NUMERIC" };
        String[] bindings = {"OUT", "IN" };
        String[] names = {"outVal", "inVal" };

        HashMap inVal = new HashMap();
        inVal.put("inVal", new Integer(2));
        Map results =
            queryService.executeBySQL(sql, paramTypeNames, names, bindings,
                inVal);

        assertEquals("{outVal=1}", results.toString());
    }

}
