/*
 * Copyright 2002-2012 the original author or authors.
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.UserSupportDaoWithMap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : DaoWithMapTest <br>
 * <br>
 * [Description] : This TestCase is to test AbstractDao class provided by
 * QueryService. In the case where input/output factor belongs to Map type,
 * query statements on INSERT, UPDATE AND SELECT are executed and their result
 * values are verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Called for is method provided into implemented
 * UserDaoWithMap class inheriting AbstractDao which is offered by QueryService
 * and its result value is verified. In the case of execution of INSERT, UPDATE
 * AND DELETE, input value is delivered in the form of Map and SELECT execution
 * result is delivered as part of Map at UserDaoWithMap class.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath:spring/daosupport/context-common.xml",
		"classpath:spring/daosupport/context-userdao.xml",
		"classpath:spring/daosupport/context-query.xml",
		"classpath:spring/daosupport/context-query-sqlloader.xml" })
public class SupportDaoWithMapTest {
	
	@Inject
	UserSupportDaoWithMap userSupportDaoWithMap;
	
	@Inject
	QueryService queryService;
	
	/**
	 * Table USERS are created for test.
	 */
    @Before
    public void onSetUp() {
        // Try to drop the table. It may not
        // exist and throw an exception.
        System.out.println("Attempting to drop old table");
        try {
            queryService.updateBySQL("DROP TABLE USERS", new String[] {},
                new Object[] {});
        } catch (Exception e) {
        	System.out.println("Fail to DROP Table.");
        }

        queryService
            .updateBySQL(
                "CREATE TABLE USERS (USER_ID VARCHAR(20) NOT NULL,USER_NAME VARCHAR(50) NOT NULL,PASSWORD VARCHAR(10) NOT NULL,SSN VARCHAR(13),SL_YN CHAR(1),BIRTH_DAY VARCHAR(8),AGE NUMERIC(3),CELL_PHONE VARCHAR(14),ADDR VARCHAR(100),EMAIL VARCHAR(50),EMAIL_YN CHAR(1),IMAGE_FILE VARCHAR(100),REG_DATE DATE,CONSTRAINT PK_USERS PRIMARY KEY(USER_ID))",
                new String[] {}, new Object[] {});
    }

	/**
	 * [Flow #-1] Positive Case : Called for is method provided into implemented
	 * UserDaoWithMap class inheriting AbstractDao which is offered by
	 * QueryService and its result value is verified. In the case of execution
	 * of INSERT, UPDATE AND DELETE, input value is delivered in the form of Map
	 * and SELECT execution result is delivered as part of Map at UserDaoWithMap
	 * class.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
    @SuppressWarnings("unchecked")
	@Test
    public void testUserDaoWithMap() {
        // 1. insert a new user
        Map<String,String> usersMap1 = new HashMap<String, String>();
        usersMap1.put("userId", "admin");
        usersMap1.put("userName", "ADMIN");
        usersMap1.put("password", "admin123");
        userSupportDaoWithMap.createUsers(usersMap1);

        // 2. insert another new user
        Map<String, String> usersMap2 = new HashMap<String, String>();
        usersMap2.put("userId", "test");
        usersMap2.put("userName", "TEST");
        usersMap2.put("password", "test123");
        userSupportDaoWithMap.createUsers(usersMap2);

        // 3. check for inserting
        Map<String, Object> result = userSupportDaoWithMap.findUsers(usersMap1);
        Assert.assertEquals(usersMap1.get("userName"), result.get("userName"));

        // 4. check for inserting
        result = userSupportDaoWithMap.findUsers(usersMap2);
        Assert.assertEquals(usersMap2.get("userName"), result.get("userName"));

        // 5. update a user information
        usersMap2.put("userName", "TESTUPD");
        userSupportDaoWithMap.updateUsers(usersMap2);

        // 6. check for updating
        result = userSupportDaoWithMap.findUsers(usersMap2);
        Assert.assertEquals(usersMap2.get("userName"), result.get("userName"));

        // 7. select user list
        Map<String, String> searchMap = new HashMap<String, String>();
        Page page = userSupportDaoWithMap.findUsersList(searchMap, 1, 1, 10);
        Assert.assertEquals(2, page.getTotalCount());

        // 8. assert in detail
        List<?> list = page.getList();
        Assert.assertEquals(1, list.size());
        result = (Map) list.iterator().next();
        Assert.assertEquals(usersMap1.get("userName"), result.get("userName"));
    }
}
