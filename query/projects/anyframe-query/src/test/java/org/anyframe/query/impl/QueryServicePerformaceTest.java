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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.anyframe.query.QueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class QueryServicePerformaceTest {
	
	@Inject
	QueryService queryService;

    /**
     * Table TB_EXT_CATEGORY is created for test and initial data is entered. 
     */
	@Before
    public void onSetUp() {
        try {
            queryService.updateBySQL("DROP TABLE TB_CATEGORY", new String[] {},
                new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }

        queryService.updateBySQL("CREATE TABLE TB_CATEGORY("
            + "CATEGORY_NO VARCHAR(16) NOT NULL,"
            + "CATEGORY_NAME VARCHAR(50) NOT NULL,"
            + "CATEGORY_DESC VARCHAR(100)," + "USE_YN CHAR(1),"
            + "REG_ID VARCHAR(20)," + "REG_DATE DATE,"
            + "MODIFY_ID VARCHAR(20)," + "MODIFY_DATE DATE,"
            + "CONSTRAINT PK_TB_CATEGORY PRIMARY KEY(CATEGORY_NO))",
            new String[] {}, new Object[] {});

        for (int i = 0; i < 1000; i++) {
            queryService.updateBySQL(
                "INSERT INTO TB_CATEGORY VALUES('CATEGORY-" + i + "','ygt',"
                    + "'electronics','Y',NULL,'2007-06-27',NULL,'2008-05-21')",
                new String[] {}, new Object[] {});
        }
    }
	
	@Test
    public void findCategoryList() throws InterruptedException {
        long beforetime = new Date().getTime();

        List<QueryThread> threadList = new ArrayList<QueryThread>();
        for (int i = 0; i < 100; i++) {
            QueryThread thread =
                new QueryThread("Thread " + i, queryService,
                    "findCategoryListGeneral");
            threadList.add(thread);
            thread.start();
        }

        for (int i = 0; i < threadList.size(); i++) {
            ((Thread) threadList.get(i)).join();
        }

        long nexttime = new Date().getTime();
        System.out.println("--> Using Result Class : "
            + (nexttime - beforetime));
    }

    @Test
	public void findCategoryListUsingResultMapper() throws InterruptedException {
        long beforetime = new Date().getTime();

        List<QueryThread> threadList = new ArrayList<QueryThread>();
        for (int i = 0; i < 100; i++) {
            QueryThread thread =
                new QueryThread("Thread " + i, queryService,
                    "findCategoryListResultMapper");
            threadList.add(thread);
            thread.start();
        }

        for (int i = 0; i < threadList.size(); i++) {
            ((Thread) threadList.get(i)).join();
        }

        long nexttime = new Date().getTime();
        System.out.println("--> Using Custom ResultSetMapper : "
            + (nexttime - beforetime));
    }

    @Test
    public void findCategoryListUsingHashMap() throws InterruptedException {
        long beforetime = new Date().getTime();

        List<QueryThread> threadList = new ArrayList<QueryThread>();
        for (int i = 0; i < 100; i++) {
            QueryThread thread =
                new QueryThread("Thread " + i, queryService,
                    "findCategoryListHashMap");
            threadList.add(thread);
            thread.start();
        }

        for (int i = 0; i < threadList.size(); i++) {
            ((Thread) threadList.get(i)).join();
        }

        long nexttime = new Date().getTime();
        System.out.println("--> Using HashMap : " + (nexttime - beforetime));
    }

    public class QueryThread extends Thread {
        private QueryService queryService;
        private String queryId;
        @SuppressWarnings("unused")
        private String threadId;

        public QueryThread(String threadId, QueryService queryService,
                String queryId) {
            this.threadId = threadId;
            this.queryService = queryService;
            this.queryId = queryId;
        }

        public void run() {
            try {
                for (int i = 0; i < 10; i++)
                    queryService.find(queryId, new Object[] {});
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
