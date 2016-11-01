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
import java.util.Iterator;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceSQLTest <br>
 * <br>
 * [Description] : 쿼리문을 직접 입력하여 데이터를 입력, 수정, 삭제, 조회하고
 * 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 findBySQL()
 * 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다.</li>
 * <li>#-2 Positive Case : QueryService의 findBySQL()
 * 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다.
 * findBySQL() 호출시 pageIndex, pageSize 정보를 같이 전달함으로써
 * 페이징 처리된 조회 결과를 얻을 수 있다.</li>
 * <li>#-3 Negative Case : QueryService의 findBySQL()
 * 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고 결과를 검증한다. 이 테스트
 * 케이스에서는 쿼리문 이외의 입력 인자의 값을 NULL로 전달하고
 * QueryServiceException이 발생하는지 검증한다.</li>
 * <li>#-4 Positive Case : QueryService의 updateBySQL()
 * 메소드를 호출하여 직접 입력한 UPDATE 쿼리를 실행시키고 결과를 검증한다.</li>
 * <li>#-5 Positive Case : QueryService의 removeBySQL()
 * 메소드를 호출하여 직접 입력한 DELETE 쿼리를 실행시키고 결과를 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceSQLTest extends
        AbstractDependencyInjectionSpringContextTests {

    private QueryService queryService = null;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

    /**
     * 테스트를 위해 테이블 TB_CUSTOMER를 생성한다.
     */
    public void onSetUp() throws Exception {
        System.out.println("Attempting to drop old table");
        try {
            queryService.updateBySQL("DROP TABLE TB_CUSTOMER", new String[] {},
                new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }
        queryService.updateBySQL("CREATE TABLE TB_CUSTOMER ( "
            + "SSNO varchar2(13) NOT NULL, " + "NAME varchar2(20), "
            + "ADDRESS varchar2(20), " + "PRIMARY KEY (SSNO))",
            new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의
     * findBySQL() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고
     * 결과를 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFindBySQLWithoutPageInfo() throws Exception {
        // 1. insert test data
        insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
        insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
        insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
        insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
        insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
        insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

        // 2. execute query
        Collection rtCollection =
            queryService.findBySQL(
                "select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
                new String[] {"VARCHAR" }, new Object[] {"%12345678%" });

        // 3. assert
        assertEquals("Fail to find Customer.", 6, rtCollection.size());

        // 4. assert in detail
        Iterator rtIterator = rtCollection.iterator();
        while (rtIterator.hasNext()) {
            Map map = (Map) rtIterator.next();
            assertTrue("Fail to compare result.", ((String) map.get("name"))
                .startsWith("Anyframe"));
        }
    }

    /**
     * [Flow #-2] Positive Case : QueryService의
     * findBySQL() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고
     * 결과를 검증한다. findBySQL() 호출시 pageIndex, pageSize
     * 정보를 같이 전달함으로써 페이징 처리된 조회 결과를 얻을 수 있다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFindBySQLWithPageInfo() throws Exception {
        // 1. insert test data
        insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");
        insertCustomerBySQL("1234567890111", "Anyframe2", "Seoul");
        insertCustomerBySQL("1234567890222", "Anyframe3", "Incheon");
        insertCustomerBySQL("1234567890333", "Anyframe4", "Seoul");
        insertCustomerBySQL("1234567890444", "Anyframe5", "Bundang");
        insertCustomerBySQL("1234567890555", "Anyframe6", "Seoul");

        // 2. execute query
        Collection rtCollection =
            queryService.findBySQL(
                "select NAME, ADDRESS from TB_CUSTOMER where SSNO like ?",
                new String[] {"VARCHAR" }, new Object[] {"%12345678%" }, 1, 2);

        // 3. assert
        assertEquals("Fail to find Customer.", 2, rtCollection.size());

        // 4. assert in detail
        Iterator rtIterator = rtCollection.iterator();
        while (rtIterator.hasNext()) {
        	Map map = (Map) rtIterator.next();
            assertTrue("Fail to compare result.", ((String) map.get("name"))
                .startsWith("Anyframe"));
        }
    }

    /**
     * [Flow #-3] Negative Case : QueryService의
     * findBySQL() 메소드를 호출하여 직접 입력한 SELECT 쿼리를 실행시키고
     * 결과를 검증한다. 이 테스트 케이스에서는 쿼리문 이외의 입력 인자의 값을 NULL로
     * 전달하고 QueryServiceException이 발생하는지 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void findBySQLWithNullArg() throws Exception {
        try {
            // 1. execute query with null args
            queryService.findBySQL("select NAME, ADDRESS from TB_CUSTOMER",
                null, null);
            fail("Fail to catch Exception");
        } catch (Exception e) {
            // 2. assert
            assertTrue("Fail to compare exception type.",
                e instanceof QueryServiceException);
            assertTrue("Fail to compare exception message.",
                ((QueryServiceException) e).getMessage().startsWith(
                    "Query Service : Fail to"));
        }
    }

    /**
     * [Flow #-4] Positive Case : QueryService의
     * updateBySQL() 메소드를 호출하여 직접 입력한 UPDATE 쿼리를 실행시키고
     * 결과를 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testUpdateBySQL() throws Exception {
        // 1. insert test data
        insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");

        // 2. execute query
        int result =
            queryService.updateBySQL(
                "update TB_CUSTOMER set NAME=? where SSNO=?", new String[] {
                    "VARCHAR", "VARCHAR" }, new Object[] {"AnyframeUPD",
                    "1234567890123" });

        // 3. assert
        assertEquals("Fail to update customer.", 1, result);
        findCustomerBySQL("1234567890123", "AnyframeUPD", "Seoul");
    }

    /**
     * [Flow #-5] Positive Case : QueryService의
     * removeBySQL() 메소드를 호출하여 직접 입력한 DELETE 쿼리를 실행시키고
     * 결과를 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testRemoveBySQL() throws Exception {
        // 1. insert test data
        insertCustomerBySQL("1234567890123", "Anyframe1", "Seoul");

        // 2. execute query
        int result =
            queryService.removeBySQL("delete TB_CUSTOMER where SSNO=?",
                new String[] {"VARCHAR" }, new Object[] {"1234567890123" });

        // 3. assert
        assertEquals("Fail to update customer.", 1, result);
        Collection rtCollection =
            queryService.findBySQL(
                "select NAME, ADDRESS from TB_CUSTOMER WHERE SSNO = ?",
                new String[] {"VARCHAR" }, new Object[] {"1234567890123" });
        assertEquals("Fail to find customer by SQL.", 0, rtCollection.size());
    }

    /**
     * SELECT 쿼리문을 직접 입력하여 단건의 데이터를 조회하고 결과를 검증한다.
     * @param ssno
     * @param name
     * @param address
     * @throws Exception
     *         fail to find customer by SQL
     */
    private void findCustomerBySQL(String ssno, String name, String address)
            throws Exception {
        // 1. execute query
        Collection rtCollection =
            queryService.findBySQL(
                "select NAME, ADDRESS from TB_CUSTOMER WHERE SSNO = ?",
                new String[] {"VARCHAR" }, new Object[] {ssno });

        // 2. assert
        assertEquals("Fail to find customer by SQL.", 1, rtCollection.size());

        // 3. assert in detail
        Map rtMap = (Map) rtCollection.iterator().next();
        assertEquals("Fail to compare result.", address, (String) rtMap
            .get("address"));
        assertEquals("Fail to compare result.", name, (String) rtMap
            .get("name"));
    }

    /**
     * INSERT 쿼리문을 직접 입력하여 단건의 데이터를 입력하고 결과를 검증한다.
     * @param ssno
     * @param name
     * @param address
     * @throws Exception
     *         fail to insert customer by SQL
     */
    private void insertCustomerBySQL(String ssno, String name, String address)
            throws Exception {
        // 1. execute query
        int result =
            queryService.createBySQL(
                "insert into TB_CUSTOMER values (?, ?, ?)", new String[] {
                    "VARCHAR", "VARCHAR", "VARCHAR" }, new Object[] {ssno,
                    name, address });

        // 2. assert
        assertEquals("Fail to insert customer.", 1, result);
        findCustomerBySQL(ssno, name, address);
    }

}
