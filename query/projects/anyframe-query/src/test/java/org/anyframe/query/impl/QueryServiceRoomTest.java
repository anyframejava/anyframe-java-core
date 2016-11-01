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
import java.util.Collection;
import java.util.Iterator;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.Room;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceRoomTest <br>
 * <br>
 * [Description] : 별도 쿼리문 정의없이 객체의 입력만으로 데이터의 입력, 수정,
 * 삭제, 조회하고 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 update() 메소드를
 * 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정 데이터를 수정한다.
 * QueryService는 테이블 매핑 정보를 기반으로 UPDATE 쿼리문을 생성하여
 * 실행시킨다.</li>
 * <li>#-2 Positive Case : QueryService의 remove() 메소드를
 * 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정 데이터를 삭제한다.
 * QueryService는 테이블 매핑 정보를 기반으로 DELETE 쿼리문을 생성하여
 * 실행시킨다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceRoomTest extends
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
     * 테스트를 위해 테이블 TB_ROOM을 생성한다.
     */
    public void onSetUp() throws Exception {
        System.out.println("Attempting to drop old table");
        try {
            queryService.updateBySQL("DROP TABLE TB_ROOM", new String[] {},
                new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }

        queryService.updateBySQL("CREATE TABLE TB_ROOM ( "
            + "ROOM_NO NUMBER(3) NOT NULL, " + "ROOM_PRICE NUMBER(8), "
            + "ROOM_SIZE NUMBER(3,1), " + "PRIMARY KEY (ROOM_NO))",
            new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의
     * update() 메소드를 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정
     * 데이터를 수정한다. QueryService는 테이블 매핑 정보를 기반으로 UPDATE
     * 쿼리문을 생성하여 실행시킨다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testUpdateRoomByObject() throws Exception {
        // 1. set object value for test
        Room room = insertRoomByObject();
        room.setRoomPrice(new BigDecimal("250000"));
        room.setRoomSize((new BigDecimal("22.7")));

        // 2. execute query
        int results = queryService.update(room);
        assertEquals("Fail to update room.", results, 1);

        // 3. assert
        findRoomByObject(room.getRoomNo(), room.getRoomPrice(), room
            .getRoomSize());
    }

    /**
     * [Flow #-2] Positive Case : QueryService의
     * remove() 메소드를 호출함으로써, 별도의 쿼리문 정의없이 객체를 이용하여 특정
     * 데이터를 삭제한다. QueryService는 테이블 매핑 정보를 기반으로 DELETE
     * 쿼리문을 생성하여 실행시킨다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testRemoveRoomByObject() throws Exception {
        // 1. insert for test
        Room room = insertRoomByObject();

        // 2. execute query
        int results = queryService.remove(room);

        // 3. assert
        assertEquals("Fail to remove room.", results, 1);
        Collection rtCollection = (Collection) queryService.find(room);
        assertEquals("Fail to remove room.", 0, rtCollection.size());
    }

    /**
     * QueryService의 create() 메소드를 호출함으로써, 별도의 쿼리문 정의없이
     * 객체를 이용하여 신규 데이터를 입력한다. QueryService는 테이블 매핑 정보를
     * 기반으로 INSERT 쿼리문을 생성하여 실행시킨다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    private Room insertRoomByObject() throws Exception {
        // 1. set object value for test
        BigDecimal roomNo = new BigDecimal("123");
        BigDecimal roomPrice = new BigDecimal("300000");
        BigDecimal roomSize = new BigDecimal("25.7");

        Room room = new Room(roomNo, roomPrice, roomSize);

        // 2. execute query
        int results = queryService.create(room);

        // 3. assert
        assertEquals("Fail to insert room.", results, 1);
        findRoomByObject(roomNo, roomPrice, roomSize);

        // 4. return for another test
        return room;
    }

    /**
     * 별도의 쿼리문 정의없이 객체를 이용하여 단건의 데이터를 조회하고 결과를 검증한다.
     * @param roomNo
     * @param roomPrice
     * @param roomSize
     * @return 조회 결과 Room 객체
     * @throws Exception
     *         fail to find Room
     */
    private void findRoomByObject(BigDecimal roomNo, BigDecimal roomPrice,
            BigDecimal roomSize) throws Exception {
        // 1. set object value for test
        Room room = new Room(roomNo, roomPrice, roomSize);

        // 2. execute query
        Collection rtCollection = (Collection) queryService.find(room);

        // 3. assert
        assertEquals("Fail to find room.", 1, rtCollection.size());
        Iterator rtIterator = rtCollection.iterator();

        // 4. assert in detail
        Room result = (Room) rtIterator.next();
        assertEquals("Fail to compare result.", roomPrice, result
            .getRoomPrice());
        assertEquals("Fail to compare result.", roomSize.longValue(), Math
            .round(result.getRoomSize().longValue()));
    }

}
