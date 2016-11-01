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
 * [Description] : 매핑 XML 파일에 정의된 Dynamic Query를 실행하고
 * 수행 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 find() 메소드를
 * 호출하여, Named Parameter를 정의하고 있는 Dynamic Query를 실행시켜
 * 보고 결과값을 검증한다. Named Parameter의 값은 'parameter=value'
 * 형태로 전달한다.</li>
 * <li>#-2 Negative Case : QueryService의 find() 메소드를
 * 호출하여, Named Parameter를 정의하고 있는 Dynamic Query를 실행시켜
 * 보고 결과값을 검증한다. </li>
 * <li>#-3 Positive Case : QueryService의 find() 메소드를
 * 호출하여, Text Replacements {{...}}를 포함하고 있는 Dynamic
 * Query를 실행시켜 보고 결과값을 검증한다.</li>
 * <li>#-4 Negative Case : QueryService의 find() 메소드를
 * 호출하여, Text Replacements {{...}}를 포함하고 있는 Dynamic
 * Query를 실행시켜 보고 결과값을 검증한다.</li>
 * <li>#-5 Positive Case : QueryService의 find() 메소드를
 * 호출하여, if 문을 포함하고 있는 Dynamic Query를 실행시켜 보고 결과값을
 * 검증한다.</li>
 * <li>#-6 Positive Case : QueryService의
 * findWithRowCount() 메소드를 호출하여, Text Replacements
 * {{...}}를 포함하고 있는 Dynamic Query를 실행시켜 보고 Dynamic
 * Query에 대해서도 페이징 처리가 성공적으로 수행되는지 결과값을 검증한다.</li>
 * <li>#-7 Positive Case : QueryService의 find() 메소드를
 * 호출하여, foreach 문을 포함하고 있는 Dynamic Query를 실행시켜 보고 결과값을
 * 검증한다. foreach 구문의 실행 회수는 $velocityCount를 이용하고 있다.</li>
 * <li>#-8 Positive Case : QueryService의 find() 메소드를
 * 호출하여, Named Parameter를 정의하고 있는 Dynamic Query를 실행시켜
 * 보고 결과값을 검증한다. Named Parameter의 값은 'parameter=value'
 * 형태로 전달한다. 단, 정의된 쿼리문은 block comments를 포함하고 있고, block
 * comments 내에는 ":" 또는 "&"가 포함되어 있다.</li>
 * <li>#-9 Positive Case : QueryService의 find() 메소드를
 * 호출하여, Named Parameter를 정의하고 있는 Dynamic Query를 실행시켜
 * 보고 결과값을 검증한다. Named Parameter의 값은 'parameter=value'
 * 형태로 전달한다. 단, 정의된 쿼리문은 block comments를 포함하고 있고, line
 * comments 내에는 ":" 또는 "&"가 포함되어 있다.</li>
 * </ul>
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
            "INSERT INTO TB_USER VALUES ('test', 'test123', 'TESTER')",
            new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의 find()
     * 메소드를 호출하여, Named Parameter를 정의하고 있는 Dynamic
     * Query를 실행시켜 보고 결과값을 검증한다. Named Parameter의 값은
     * 'parameter=value' 형태로 전달한다.
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
     * [Flow #-2] Negative Case : QueryService의 find()
     * 메소드를 호출하여, Named Parameter를 정의하고 있는 Dynamic
     * Query를 실행시켜 보고 결과값을 검증한다. queryId가
     * 'findLogonIdByRangeWithError'인 쿼리는 lowID와
     * highID라는 Named Parameter를 포함하고 있으나 이 테스트케이스에서는
     * NamedParameter의 값을 제대로 전달하지 않고 있다.
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
     * [Flow #-3] Positive Case : QueryService의 find()
     * 메소드를 호출하여, Text Replacements {{...}}를 포함하고 있는
     * Dynamic Query를 실행시켜 보고 결과값을 검증한다.
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
     * [Flow #-4] Negative Case : QueryService의 find()
     * 메소드를 호출하여, Text Replacements {{...}}를 포함하고 있는
     * Dynamic Query를 실행시켜 보고 결과값을 검증한다. queryId가
     * 'findUsers'인 쿼리는 Text Replacements 대상인
     * {{schema}}와 {{sortColumn}}를 포함하고 있으나 이 테스트케이스에서는
     * Text Replacements 대상의 값을 제대로 전달하지 않고 있다.
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
     * [Flow #-5] Positive Case : QueryService의 find()
     * 메소드를 호출하여, if 문을 포함하고 있는 Dynamic Query를 실행시켜 보고
     * 결과값을 검증한다.
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
     * [Flow #-6] Positive Case : QueryService의
     * findWithRowCount() 메소드를 호출하여, Text Replacements
     * {{...}}를 포함하고 있는 Dynamic Query를 실행시켜 보고 Dynamic
     * Query에 대해서도 페이징 처리가 성공적으로 수행되는지 결과값을 검증한다.
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
     * [Flow #-7] Positive Case : QueryService의 find()
     * 메소드를 호출하여, foreach 문을 포함하고 있는 Dynamic Query를
     * 실행시켜 보고 결과값을 검증한다. foreach 구문의 실행 회수는
     * $velocityCount를 이용하고 있다.
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
     * [Flow #-8] Positive Case : QueryService의 find()
     * 메소드를 호출하여, Named Parameter를 정의하고 있는 Dynamic
     * Query를 실행시켜 보고 결과값을 검증한다. Named Parameter의 값은
     * 'parameter=value' 형태로 전달한다. 단, 정의된 쿼리문은 block
     * comments를 포함하고 있고, block comments 내에는 ":" 또는
     * "&"가 포함되어 있다.
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
     * [Flow #-9] Positive Case : QueryService의 find()
     * 메소드를 호출하여, Named Parameter를 정의하고 있는 Dynamic
     * Query를 실행시켜 보고 결과값을 검증한다. Named Parameter의 값은
     * 'parameter=value' 형태로 전달한다. 단, 정의된 쿼리문은 block
     * comments를 포함하고 있고, line comments 내에는 ":" 또는 "&"가
     * 포함되어 있다.
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
