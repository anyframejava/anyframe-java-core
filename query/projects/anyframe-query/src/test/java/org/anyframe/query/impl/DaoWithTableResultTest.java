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

import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.UserDaoWithResultClass;
import org.anyframe.query.vo.UsersVO;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : DaoWithResultTest <br>
 * <br>
 * [Description] : QueryService에서 제공하는 AbstractDao 클래스를
 * 테스트하기 위한 테스트 코드로, 입출력 인자가 VO 유형일 경우 INSERT, UPDATE,
 * DELETE, SELECT 쿼리문을 실행하고 결과값을 검증한다. 단 출력값의 유형은 매핑
 * XML에 정의된 <table/> 매핑 정보를 기반으로 한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService에서 제공하는
 * AbstractDao를 상속받아 구현한 UserDaoWithResultClass 클래스에
 * 제공하는 메소드를 호출하고, 결과값을 검증한다. UserDaoWithResultClass
 * 클래스에서는 INSERT, UPDATE, DELETE 수행시 Map 형태의 입력값을 전달하며
 * SELECT 수행 결과를 <table/>에 정의된 매핑 정보를 기반으로 셋팅하여 전달하고
 * 있다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class DaoWithTableResultTest extends
        AbstractDependencyInjectionSpringContextTests {

    private UserDaoWithResultClass userDaoWithResultClass;

    private QueryService queryService;

    public void setUserDaoWithResultClass(
            UserDaoWithResultClass userDaoWithResultClass) {
        this.userDaoWithResultClass = userDaoWithResultClass;
    }

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        return new String[] {
            "classpath:spring/abstractdao/context-common.xml",
            "classpath:spring/abstractdao/context-userdao.xml",
            "classpath:spring/abstractdao/context-query.xml",
            "classpath:spring/abstractdao/context-query-sqlloader-tableresult.xml" };
    }

    /**
     * 테스트를 위해 테이블 USERS를 생성한다.
     */
    public void onSetUp() throws Exception {
        // Try to drop the table. It may not
        // exist and throw an exception.
        System.out.println("Attempting to drop old table");
        try {
            queryService.updateBySQL("DROP TABLE USERS", new String[] {},
                new Object[] {});
        } catch (Exception e) {
            // ignore
        }

        queryService
            .updateBySQL(
                "CREATE TABLE USERS (USER_ID VARCHAR(20) NOT NULL,USER_NAME VARCHAR(50) NOT NULL,PASSWORD VARCHAR(10) NOT NULL,SSN VARCHAR(13),SL_YN CHAR(1),BIRTH_DAY VARCHAR(8),AGE NUMERIC(3),CELL_PHONE VARCHAR(14),ADDR VARCHAR(100),EMAIL VARCHAR(50),EMAIL_YN CHAR(1),IMAGE_FILE VARCHAR(100),REG_DATE DATE,CONSTRAINT PK_USERS PRIMARY KEY(USER_ID))",
                new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService에서 제공하는
     * AbstractDao를 상속받아 구현한 UserDaoWithResultClass
     * 클래스에 제공하는 메소드를 호출하고, 결과값을 검증한다.
     * UserDaoWithResultClass 클래스에서는 INSERT, UPDATE,
     * DELETE 수행시 Map 형태의 입력값을 전달하며 SELECT 수행 결과를
     * <table/>에 정의된 매핑 정보를 기반으로 셋팅하여 전달하고 있다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testUserDaoWithTableResult() throws Exception {
        // 1. insert a new user
        UsersVO usersVO1 = new UsersVO();
        usersVO1.setUserId("admin");
        usersVO1.setUserName("ADMIN");
        usersVO1.setPassword("admin123");
        userDaoWithResultClass.createUsers(usersVO1);

        // 2. insert another new user
        UsersVO usersVO2 = new UsersVO();
        usersVO2.setUserId("test");
        usersVO2.setUserName("TEST");
        usersVO2.setPassword("test123");
        userDaoWithResultClass.createUsers(usersVO2);

        // 3. check for inserting
        UsersVO result = userDaoWithResultClass.findUsers(usersVO1);
        assertEquals(usersVO1.getUserName(), result.getUserName());

        // 4. check for inserting
        result = userDaoWithResultClass.findUsers(usersVO2);
        assertEquals(usersVO2.getUserName(), result.getUserName());

        // 5. update a user information
        usersVO2.setUserName("TESTUPD");
        userDaoWithResultClass.updateUsers(usersVO2);

        // 6. check for updating
        result = userDaoWithResultClass.findUsers(usersVO2);
        assertEquals(usersVO2.getUserName(), result.getUserName());

        // 7. select user list
        UsersVO searchVO = new UsersVO();
        Page page = userDaoWithResultClass.findUsersList(searchVO, 1, 1, 10);
        assertEquals(2, page.getTotalCount());

        // 8. assert in detail
        Collection list = page.getList();
        assertEquals(1, list.size());
        result = (UsersVO) list.iterator().next();
        assertEquals(usersVO1.getUserName(), result.getUserName());
    }

}
