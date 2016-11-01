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
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import javax.sql.DataSource;

import org.anyframe.query.QueryService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceLongVarCharTest <br>
 * <br>
 * [Description] : LONG 유형의 데이터를 포함하고 있는 쿼리문을 실행하고 수행
 * 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : LONG 유형의 데이터를 입력하고 성공적으로
 * 입력되었는지 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceLongVarCharTest extends
        AbstractDependencyInjectionSpringContextTests {
    private QueryService queryService = null;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

    /**
     * 테스트를 위해 테이블 TB_LONG_VARCHAR를 생성한다.
     */
    public void onSetUp() throws Exception {
        super.onSetUp();
        DataSource dataSource =
            (DataSource) applicationContext.getBean("dataSource");
        try {
            Connection conn = dataSource.getConnection();
            try {
                Statement statement = conn.createStatement();

                try {
                    statement.executeUpdate("DROP TABLE TB_LONG_VARCHAR");
                } catch (SQLException e) {
                    System.out.println("Fail to DROP Table.");
                }

                statement.executeUpdate("CREATE TABLE TB_LONG_VARCHAR ( "
                    + "COUNT  INTEGER, " + "MYVARCHAR VARCHAR2(2000),"
                    + "MYLONG LONG," + "PRIMARY KEY (COUNT))");
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
     * [Flow #-1] Positive Case : LONG 유형의 데이터를 입력하고
     * 성공적으로 입력되었는지 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testLognVarchar() throws Exception {
        // 1. execute insert query
        queryService.create("insertLongVarchar", new Object[] {new Integer(5),
            val1, val2 });

        // 2. execute select query
        Collection rtCollection =
            queryService
                .find("findLongVarchar", new Object[] {new Integer(5) });

        // 3. assert
        assertEquals("Fail to execute query with longvarchar type.", 1,
            rtCollection.size());

        // 4. assert in detail
        Iterator rtItr = rtCollection.iterator();
        while (rtItr.hasNext()) {
            Map binary = (Map) rtItr.next();
            assertEquals("Fail to check a varchar value.", val1, binary
                .get("myvarchar"));
            assertEquals("Fail to check a longvarchar value.", val2, binary
                .get("mylong"));
        }
    }

    // set data
    private String val1 = "0무궁화꽃이피었습니다";
    private String val2 =
        "1무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "2무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "3무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "4무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "5무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "6무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "7무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "8무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "9무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "10무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "11무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "12무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "13무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "14무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "15무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "16무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "17무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "18무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "19무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "20무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "21무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "22무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "23무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "24무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "25무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "26무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "27무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "28무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "29무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
            + "30무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n";
}
