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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceDynamicSQLTest <br>
 * <br>
 * [Description] : Dynamic Query defined in mapping XML file is executed and
 * execution result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for find() method of QueryService, Dynamic
 * Query defining Named Parameter is executed and its result value is verified.
 * Named Parameter Value is delivered in the form of ‘parameter=value”.</li>
 * <li>#-2 Negative Case : By calling for find() method of Q ueryService,
 * Dynamic Query defining Named Parameter is executed and its result value is
 * verified.</li>
 * <li>#-3 Positive Case : By calling for find() method of Q ueryService,
 * Dynamic Query including Text Replacements{{...}} is executed and its result
 * value is verified.</li>
 * <li>#-4 Negative Case : By calling for find() method of Q ueryService,
 * Dynamic Query including Text Replacements{{...}} is executed and its result
 * value is verified.</li>
 * <li>#-5 Positive Case : QBy calling for find() method of Q ueryService,
 * Dynamic Query including IF statement is executed and its result value is
 * verified.</li>
 * <li>#-6 Positive Case : By calling findWithRowCount()method of QueryService,
 * Dynamic Query including Text Replacements{{...}} is executed and result Value
 * is verified to see whether paging process on Dynamic Query is successful.</li>
 * <li>#-7 Positive Case : By calling find()method of QueryService, Dynamic
 * Query including doreach statement is executed and result Value is verified.
 * The execution number of foreach statement uses $velocityCount.</li>
 * <li>#-8 Positive Case : By calling find()method of QueryService, Dynamic
 * Query defining Named Parameter is executed and result Value is verified. The
 * number of Named Parameter is delivered in the form of 'parameter=value'.
 * However, defined query statement includes block comments and block comments
 * includes “:” or “&”.</li>
 * <li>#-9 Positive Case : By calling find()method of QueryService, Dynamic
 * Query defining Named Parameter is executed and result Value is verified. The
 * number of Named Parameter is delivered in the form of 'parameter=value'.
 * However, defined query statement includes block comments and line comments
 * includes “:” or “&”.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceDynamicSQLTest extends
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
	 * Table TB_USER is created for test and initial data is added.
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
            "INSERT INTO TB_USER VALUES ('test', 'test123', 'TESTER')",
            new String[] {}, new Object[] {});
    }

	/**
	 * [Flow #-1] Positive Case : By calling for find() method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and its result value
	 * is verified. Named Parameter value is delivered in the form of
	 * ‘parameter=value’.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingNamedParameter() throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "lowID=a";
        iVal[1] = "highID=s";

        // 2. execute query
        ArrayList rtList =
            (ArrayList) (queryService.find("findLogonIdByRange", iVal));

        // 3. assert
        assertTrue("Fail to execute dynamic query.", rtList.size() == 1);
        for (int i = 0; i < rtList.size(); i++) {
            Map result = (Map) rtList.get(i);
            assertEquals("Fail to compare result.", "admin", result
                .get("logonId"));
        }
    }

	/**
	 * [Flow #-2] Negative Case : By calling for find() method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and its result value
	 * is verified. Query whose I.D. is 'findLogonIdByRangeWithError' including
	 * Named Parameters called ParalowID and highID. However, this TestCase does
	 * not properly deliver NamedParameter value.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingWrongDefinedNamedParameter()
            throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "a";
        iVal[1] = "z";
        try {
            // 2. execute query
            queryService.find("findLogonIdByRangeWithError", iVal);
            fail("Fail to execute dynamic query without param name.");
        } catch (Exception e) {
            // 3. assert
            assertTrue("Fail to find exception class type.",
                e instanceof QueryServiceException);
            assertTrue("Fail to compare exception message.", e.getMessage()
                .startsWith("Query Service : Invalid Argument"));
        }
    }

	/**
	 * [Flow #-3] Positive Case : By calling for find()method of QueryService,
	 * Dynamic Query including Text Replacements {{...}} is executed and its
	 * result value is verified.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingTextReplace() throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "schema=TB_USER";
        iVal[1] = "sortColumn=NAME";

        // 2. execute query
        ArrayList rtList = (ArrayList) (queryService.find("findUsers", iVal));

        // 3. assert
        assertTrue("Fail to execute dynamic query.", rtList.size() == 2);
        Map result = (Map) rtList.get(0);
        assertEquals("Fail to compare result.", "admin", result.get("logonId"));
    }

	/**
	 * [Flow #-4] Negative Case : By calling for find()method of QueryService,
	 * Dynamic Query including Text Replacements {{...}} is executed and its
	 * result value is verified. Query whose I.D. is ‘findUsers’ includes
	 * {{schema}}and {{sortColumn}} for Text Replacements. However, this
	 * TestCase does not properly deliver value for Text Replacements.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingWrongTextReplace() throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[0];
        try {
            // 2. execute query
            queryService.find("findUsers", iVal);
            fail("Fail to text replacement");
        } catch (Exception e) {
            // 3. assert
            assertTrue("Fail to find exception class type.",
                e instanceof QueryServiceException);
        }
    }

	/**
	 * [Flow #-5] Positive Case : By calling for find() method of Q ueryService,
	 * Dynamic Query including IF statement is executed and its result value is
	 * verified.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingCondition() throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "id=test";
        iVal[1] = "sortColumn=NAME";

        // 2. execute query
        ArrayList rtList =
            (ArrayList) (queryService.find("findUsersByCondition", iVal));

        // 3. assert
        assertTrue("Fail to execute dynamic query.", rtList.size() == 1);
        Map result = (Map) rtList.get(0);
        assertEquals("Fail to compare result.", "test", result.get("logonId"));
    }

	/**
	 * [Flow #-6] Positive Case : By calling findWithRowCount()method of
	 * QueryService, Dynamic Query including Text Replacements{{...}} is
	 * executed and result Value is verified to see whether paging process on
	 * Dynamic Query is successful.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingPagination() throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "schema=TB_USER";
        iVal[1] = "sortColumn=NAME";

        // 2. execute query
        HashMap rtMap =
            (HashMap) (queryService.findWithRowCount("findUsers", iVal, 2, 1));

        // 3. get result size and total size
        ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
        Long intVal = (Long) rtMap.get(QueryService.COUNT);

        // 4. assert
        assertTrue("Fail to execute dynamic query - result.",
            rtList.size() == 1);
        assertTrue("Fail to execute dynamic query - total count.", intVal
            .intValue() == 2);

        // 5. assert in detail
        Map result = (Map) rtList.get(0);
        assertEquals("Fail to compare result.", "test", result.get("logonId"));
    }

	/**
	 * [Flow #-7] Positive Case : By calling find()method of QueryService,
	 * Dynamic Query including foreach statement is executed and result Value is
	 * verified. The execution number of foreach statements uses $velocityCount.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingForEach() throws Exception {
        // 1. set data for test
        List logonIdList = new ArrayList();
        logonIdList.add("admin");
        logonIdList.add("test");

        // 2. execute query
        ArrayList rtList =
            (ArrayList) (queryService.find("dynamicWithForEach",
                new Object[] {new Object[] {"logonIdList", logonIdList } }));

        // 3. assert
        assertTrue("Fail to execute dynamic query.", rtList.size() == 2);
        Map result = (Map) rtList.get(0);
        assertEquals("Fail to compare result.", "admin", result.get("logonId"));
    }

	/**
	 * [Flow #-8] Positive Case : By calling find()method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and result Value is
	 * verified. The number of Named Parameter is delivered in the form of
	 * 'parameter=value'. However, defined query statement includes block
	 * comments and block comments includes “:” or “&”.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingNamedParameterWithBlockComments()
            throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "lowID=a";
        iVal[1] = "highID=s";

        // 2. execute query
        ArrayList rtList =
            (ArrayList) (queryService.find(
                "findLogonIdByRangeWithBlockComments", iVal));

        // 3. assert
        assertTrue("Fail to execute dynamic query.", rtList.size() == 1);
        for (int i = 0; i < rtList.size(); i++) {
            Map result = (Map) rtList.get(i);
            assertEquals("Fail to compare result.", "admin", result
                .get("logonId"));
        }
    }

	/**
	 * [Flow #-9] Positive Case : By calling find()method of QueryService,
	 * Dynamic Query defining Named Parameter is executed and result Value is
	 * verified. The number of Named Parameter is delivered in the form of
	 * 'parameter=value'. However, defined query statement includes block
	 * comments and line comments includes “:” or “&”.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDynamicQueryUsingNamedParameterWithLineComments()
            throws Exception {
        // 1. set data for test
        Object[] iVal = new Object[2];
        iVal[0] = "lowID=a";
        iVal[1] = "highID=s";

        // 2. execute query
        ArrayList rtList =
            (ArrayList) (queryService.find(
                "findLogonIdByRangeWithLineComments", iVal));

        // 3. assert
        assertTrue("Fail to execute dynamic query.", rtList.size() == 1);
        for (int i = 0; i < rtList.size(); i++) {
            Map result = (Map) rtList.get(i);
            assertEquals("Fail to compare result.", "admin", result
                .get("logonId"));
        }
    }
}
