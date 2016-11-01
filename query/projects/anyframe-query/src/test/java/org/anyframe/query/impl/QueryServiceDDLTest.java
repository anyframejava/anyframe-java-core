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

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.impl.util.InternalDataAccessException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceDDLTest <br>
 * <br>
 * [Description] : DDL 유형의 쿼리문을 실행하고 수행 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryServcie의 create() 메소드를
 * 호출하여 신규 테이블을 생성하기 위한 DDL을 실행시킨다. 신규 테이블이 성공적으로
 * 생성되었는지 확인하기 위해 동일한 쿼리문을 다시 실행시켜봄으로써 "기존의 객체가 이름을
 * 사용하고 있습니다."라는 "ORA-00955" 에러가 발생하는지 검증한다.</li>
 * <li>#-2 Positive Case : QueryServcie의 remove() 메소드를
 * 호출하여 기 생성된 테이블을 DROP하기 위한 DDL을 실행시킨다. 해당 테이블이 성공적으로
 * DROP되었는지 확인하기 위해 동일한 쿼리문을 다시 실행시켜봄으로써 "테이블 또는 뷰가
 * 존재하지 않습니다."라는 "ORA-00942" 에러가 발생하는지 검증한다.</li>
 * <li>#-3 Positive Case : QueryServcie의 creaet(),
 * remove() 메소드를 호출하여 Index를 생성 및 삭제하고 이 결과를 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceDDLTest extends
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
     * 테스트를 위해 인덱스 IDX_CUSTOMER를 생성한다.
     */
    public void onSetUp() throws Exception {
        try {
            queryService.remove("dropTable", new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }

        try {
            queryService.updateBySQL("drop index IDX_CUSTOMER",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Index.");
        }
    }

    /**
     * [Flow #-1] Positive Case : QueryServcie의
     * create() 메소드를 호출하여 신규 테이블을 생성하기 위한 DDL을 실행시킨다.
     * 신규 테이블이 성공적으로 생성되었는지 확인하기 위해 동일한 쿼리문을 다시
     * 실행시켜봄으로써 "기존의 객체가 이름을 사용하고 있습니다."라는 "ORA-00955"
     * 에러가 발생하는지 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testCreateTable() throws Exception {
        // 1. execute query
        queryService.create("createTable", new Object[] {});

        // 2. execute same query
        try {
            queryService.create("createTable", new Object[] {});
            fail("Fail to create table.");
        } catch (QueryServiceException e) {
            // 3. assert
            assertTrue("Fail to find cause.",
                e.getCause() instanceof InternalDataAccessException);
            String errorCode =
                ((InternalDataAccessException) e.getCause()).getSqlErrorCode();
            assertEquals("Fail to find sql error code.", "955", errorCode);
        }
    }

    /**
     * [Flow #-2] Positive Case : QueryServcie의
     * remove() 메소드를 호출하여 기 생성된 테이블을 DROP하기 위한 DDL을
     * 실행시킨다. 해당 테이블이 성공적으로 DROP되었는지 확인하기 위해 동일한 쿼리문을
     * 다시 실행시켜봄으로써 "테이블 또는 뷰가 존재하지 않습니다."라는 "ORA-00942"
     * 에러가 발생하는지 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDropTable() throws Exception {
        // 1. create table
        testCreateTable();

        // 2. execute query
        queryService.remove("dropTable", new Object[] {});

        // 3. execute same query
        try {
            queryService.remove("dropTable", new Object[] {});
        } catch (QueryServiceException e) {
            // 4. assert
            assertTrue("Fail to find cause.",
                e.getCause() instanceof InternalDataAccessException);
            String errorCode =
                ((InternalDataAccessException) e.getCause()).getSqlErrorCode();
            assertEquals("Fail to find sql error code.", "942", errorCode);
        }
    }

    /**
     * [Flow #-3] Positive Case : QueryServcie의
     * creaet(), remove() 메소드를 호출하여 Index를 생성 및 삭제하고 이
     * 결과를 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testCreateIndex() throws Exception {
        // 1. execute query
        int result = queryService.create("createIndex", new Object[] {});
        // 정상적으로 실행된 경우 0을 리턴함.
        assertEquals("Fail to create index.", 0, result);

        // 2. execute query
        queryService.remove("dropIndex", new Object[] {});
        // 정상적으로 실행된 경우 0을 리턴함.
        assertEquals("Fail to drop index.", 0, result);
    }
}
