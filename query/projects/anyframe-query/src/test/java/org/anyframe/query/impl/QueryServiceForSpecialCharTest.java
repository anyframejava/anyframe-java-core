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

import java.util.Collection;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceForSpecialCharTest <br>
 * <br>
 * [Description] : 특수 문자를 포함하고 있는 쿼리문을 실행하고 수행 결과를
 * 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 findBySQL()
 * 메소드를 호출하여 특수 문자를 포함하고 있는 쿼리문을 실행시켜 보고 결과값을 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceForSpecialCharTest extends
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
     * 테스트를 위해 테이블 TB_USER를 생성하고 초기 데이터를 입력한다.
     */
    public void onSetUp() throws Exception {
        try {
            queryService.updateBySQL("DROP TABLE TB_USER", new String[] {},
                new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }
        queryService.updateBySQL("CREATE TABLE TB_USER ( "
            + "LOGON_ID  VARCHAR(20), " + "PASSWORD VARCHAR(20),"
            + "NAME VARCHAR(20)," + "PRIMARY KEY (LOGON_ID))", new String[] {},
            new Object[] {});

        queryService.createBySQL(
            "INSERT INTO TB_USER VALUES ('admin', 'admin', 'ADMIN')",
            new String[] {}, new Object[] {});
        queryService.createBySQL(
            "INSERT INTO TB_USER VALUES ('test', 'test123', 'TESTER&123')",
            new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의
     * findBySQL() 메소드를 호출하여 특수 문자를 포함하고 있는 쿼리문을 실행시켜
     * 보고 결과값을 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testUserUsingConditionWithSpecialChar() throws Exception {
        // 1. set query statement
        String sql =
            "select * from TB_USER "
                + "where NAME like '%~`!@#$^&*()+-={}|[]\\:\";''<>?,./%' ";

        // 2. execute query
        Collection rtCollection =
            queryService.findBySQL(sql, new String[] {}, new Object[] {});

        // 3. assert
        assertTrue("Fail to execute query with special character.",
            rtCollection.size() == 0);

        // 4. set another query statement
        sql = "select * from TB_USER " + "where NAME like '%&%' ";

        // 5. execute query
        rtCollection =
            queryService.findBySQL(sql, new String[] {}, new Object[] {});

        // 6. assert
        assertTrue("Fail to execute query with special character.",
            rtCollection.size() == 1);
        Map result = (Map) rtCollection.iterator().next();
        assertEquals("Fail to compare result.", "test", result.get("LOGON_ID"));
    }
}
