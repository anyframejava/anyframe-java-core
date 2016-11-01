package org.anyframe.query.impl;

import java.util.ArrayList;
import java.util.Date;

import org.anyframe.query.QueryService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


public class QueryServicePerformaceTest extends
        AbstractDependencyInjectionSpringContextTests {
    private QueryService queryService;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        return new String[] {"classpath:/spring/context-*.xml" };
    }

    /**
     * 테스트를 위해 테이블 TB_EXT_CATEGORY를 생성하고 초기 데이터를 입력한다.
     */
    public void onSetUp() throws Exception {
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

    public void testResultSetMapperPerformance() throws Exception {
//        findCategoryList();
//        findCategoryListUsingResultMapper();
//        findCategoryListUsingHashMap();
    }

    public void findCategoryList() throws Exception {
        long beforetime = new Date().getTime();

        ArrayList threadList = new ArrayList();
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

    public void findCategoryListUsingResultMapper() throws Exception {
        long beforetime = new Date().getTime();

        ArrayList threadList = new ArrayList();
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

    public void findCategoryListUsingHashMap() throws Exception {
        long beforetime = new Date().getTime();

        ArrayList threadList = new ArrayList();
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
