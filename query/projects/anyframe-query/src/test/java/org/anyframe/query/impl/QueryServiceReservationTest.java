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

import java.sql.Date;
import java.util.Collection;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.Reservation;
import org.anyframe.util.DateUtil;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceReservationTest <br>
 * <br>
 * [Description] : 별도 쿼리문 정의없이 객체의 입력만으로 데이터의 입력, 수정,
 * 삭제, 조회하고 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 create() 메소드를
 * 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 신규 데이터를 입력한다.
 * QueryService는 테이블 매핑 정보를 기반으로 INSERT 쿼리문을 생성하여
 * 실행시킨다.</li>
 * <li>#-2 Positive Case : QueryService의 update() 메소드를
 * 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정 데이터를 수정한다.
 * QueryService는 테이블 매핑 정보를 기반으로 UPDATE 쿼리문을 생성하여
 * 실행시킨다.</li>
 * <li>#-3 Positive Case : QueryService의 remove() 메소드를
 * 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정 데이터를 삭제한다.
 * QueryService는 테이블 매핑 정보를 기반으로 DELETE 쿼리문을 생성하여
 * 실행시킨다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceReservationTest extends
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
     * 테스트를 위해 테이블 TB_RESERVATION를 생성한다.
     */
    public void onSetUp() throws Exception {
        System.out.println("Attempting to drop old table");
        try {
            queryService.updateBySQL("DROP TABLE TB_RESERVATION",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }

        queryService.updateBySQL("CREATE TABLE TB_RESERVATION ( "
            + "RESERVE_ID varchar2(4) NOT NULL, "
            + "RESERVE_SSNO varchar2(13) NOT NULL, "
            + "RESERVE_NM varchar2(20), " + "RESERVE_DATE DATE, "
            + "PRIMARY KEY (RESERVE_ID, RESERVE_SSNO))", new String[] {},
            new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의
     * create() 메소드를 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 신규
     * 데이터를 입력한다. QueryService는 테이블 매핑 정보를 기반으로 INSERT
     * 쿼리문을 생성하여 실행시킨다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testInsertReservationByObject() throws Exception {
        // 1. set object value for test
        String reserveId = "0001";
        String reserveSsno = "1234567890123";
        String reserveNm = "Test";
        java.util.Date currentDate = new java.util.Date();
        Date reserveDate = new Date(currentDate.getTime());

        Reservation reservation =
            new Reservation(reserveId, reserveSsno, reserveNm, reserveDate);

        // 2. execute query
        int results = queryService.create(reservation);

        // 3. assert
        assertEquals("Fail to insert object.", results, 1);
        findReservation(reserveId, reserveSsno);
    }

    /**
     * [Flow #-2] Positive Case : QueryService의
     * update() 메소드를 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정
     * 데이터를 수정한다. QueryService는 테이블 매핑 정보를 기반으로 UPDATE
     * 쿼리문을 생성하여 실행시킨다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testUpdateReservationByObject() throws Exception {
        // 1. set object value for test
        Reservation reservation =
            insertReservation("0001", "1234567890123", "Anyframe", "2007-06-06");

        // 2. execute query
        int results = queryService.update(reservation);

        // 3. assert
        assertEquals("Fail to update object.", results, 1);
        findReservation(reservation.getReserveId(), reservation
            .getReserveSsno());
    }

    /**
     * [Flow #-3] Positive Case : QueryService의
     * remove() 메소드를 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정
     * 데이터를 삭제한다. QueryService는 테이블 매핑 정보를 기반으로 DELETE
     * 쿼리문을 생성하여 실행시킨다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testRemoveReservationByObject() throws Exception {
        // 1. set object value for test
        Reservation reservation =
            insertReservation("0001", "1234567890123", "Anyframe", "2007-06-06");

        // 2. execute query
        int results = queryService.remove(reservation);

        // 3. assert
        assertEquals("Fail to update object.", results, 1);
        Collection rtCollection = (Collection) queryService.find(reservation);
        assertEquals("Fail to remove reservation.", 0, rtCollection.size());
    }

    /**
     * 별도의 쿼리문 정의없이 객체를 이용하여 단건의 데이터를 조회하고 결과를 검증한다.
     * @param reserveId
     * @param reserveSsno
     * @return 조회 결과 Reservation 객체
     * @throws Exception
     *         fail to find reservation
     */
    private Reservation findReservation(String reserveId, String reserveSsno)
            throws Exception {
        // 1. set object value for test
        Reservation reservation =
            new Reservation(reserveId, reserveSsno, null, null);

        // 2. execute query
        Collection rtCollection = (Collection) queryService.find(reservation);

        // 3. assert
        assertNotNull("Fail to find object.", rtCollection);
        assertTrue("Fail to find object.", rtCollection.size() == 1);

        // 4. assert in detail
        Reservation result = ((Reservation) rtCollection.iterator().next());
        assertEquals("Fail to compare reserveSsno.", reserveSsno, result
            .getReserveSsno());

        // 5. return for another test
        return result;
    }

    /**
     * 별도의 쿼리문 정의없이 객체를 이용하여 신규 데이터를 입력한다.
     * @param reserveId
     * @param reserveSsno
     * @param reserveNm
     * @param reserveDate
     * @return 신규 입력한 데이터를 포함한 Reservation 객체
     * @throws Exception
     *         fail to insert reservation
     */
    private Reservation insertReservation(String reserveId, String reserveSsno,
            String reserveNm, String reserveDate) throws Exception {
        // set object value for test
        Reservation reservation =
            new Reservation(reserveId, reserveSsno, reserveNm, DateUtil
                .string2SQLDate(reserveDate));

        // 2. execute query
        int results = queryService.create(reservation);
        assertEquals("Fail to insert object.", results, 1);

        // 3. return for another test
        return reservation;
    }
}
