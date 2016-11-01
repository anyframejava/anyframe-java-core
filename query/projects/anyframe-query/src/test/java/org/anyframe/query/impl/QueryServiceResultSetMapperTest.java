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
import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.Customer;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceResultSetMapperTest <br>
 * <br>
 * [Description] : findXXX() 메소드를 호출하여 조회 결과를 사용자가 정의한
 * Custom ResultSetMapper를 통해 매핑하게 하고, 검증한다. (<result>
 * 내의 mapper 속성값으로 IResultSetMapper를 구현한 클래스를 지정한 경우,
 * 사용자가 정의한 Mapper의 mapRow() 메소드를 호출하여 결과값을 매핑하게 된다.
 * QueryService를 통해 일반 VO 유형의 클래스에 결과값을 자동 매핑하게 하는 경우
 * Reflection API 호출로 인해 성능 저하가 발생할 수 있다. 따라서,
 * QueryService에서는 이러한 단점을 보완하기 위해 사용자가 직접 해당하는
 * ResultSetMapper를 구현하여 적용할 수 있도록 하고 있다.)<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService의 find() 메소드를
 * 호출하여 매핑 XML에 정의된 쿼리문을 실행시키고, 매핑 XML에 정의된
 * IResultSestMapper 유형의 Mapper를 이용하여, 결과값을 매핑하도록 한다.
 * </li>
 * <li>#-2 Positive Case : pageIndex, 매핑 XML 파일 내의 해당
 * 쿼리에 대한 result length 정보와 함께 QueryService의 find()
 * 메소드를 호출하여 매핑 XML에 정의된 쿼리문을 실행시키고, 매핑 XML에 정의된
 * IResultSestMapper 유형의 Mapper를 이용하여, 결과값을 매핑하도록 한다.
 * 페이징 처리 여부를 점검한다.</li>
 * <li>#-3 Positive Case : pageIndex, pageSize 정보와 함께
 * QueryService의 findWithRowCount() 메소드를 호출하여 매핑 XML에
 * 정의된 쿼리문을 실행시키고, 매핑 XML에 정의된 IResultSestMapper 유형의
 * Mapper를 이용하여, 결과값을 매핑하도록 한다. 페이징 처리 여부를 점검한다.</li>
 * </ul>
 */
public class QueryServiceResultSetMapperTest extends
        AbstractDependencyInjectionSpringContextTests {
    private QueryService queryService = null;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

    /**
     * 테스트를 위해 테이블 TB_CUSTOMER를 생성하고 초기 데이터를 추가한다.
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
            + "SSNO varchar2(13) NOT NULL, " + "NAME varchar2(30), "
            + "ADDRESS varchar2(20), " + "PRIMARY KEY (SSNO))",
            new String[] {}, new Object[] {});

        queryService.updateBySQL(
            "INSERT INTO TB_CUSTOMER VALUES('1234567890123','test1','Seoul')",
            new String[] {}, new Object[] {});
        queryService.updateBySQL(
            "INSERT INTO TB_CUSTOMER VALUES('1234567890124','test2','Seoul')",
            new String[] {}, new Object[] {});
        queryService.updateBySQL(
            "INSERT INTO TB_CUSTOMER VALUES('1234567890125','test3','Seoul')",
            new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService의 find()
     * 메소드를 호출하여 매핑 XML에 정의된 쿼리문을 실행시키고, 매핑 XML에 정의된
     * IResultSestMapper 유형의 Mapper를 이용하여, 결과값을 매핑하도록
     * 한다. (<result> 내의 mapper 속성값으로 IResultSetMapper를
     * 구현한 클래스를 지정한 경우, 사용자가 정의한 Mapper의 mapRow() 메소드를
     * 호출하여 결과값을 매핑하게 된다. QueryService를 통해 일반 VO 유형의
     * 클래스에 결과값을 자동 매핑하게 하는 경우 Reflection API 호출로 인해 성능
     * 저하가 발생할 수 있다. 따라서, QueryService에서는 이러한 단점을 보완하기
     * 위해 사용자가 직접 해당하는 ResultSetMapper를 구현하여 적용할 수 있도록
     * 하고 있다.)
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFindWithCustomResultSetMapper() throws Exception {
        // 1. execute query
        Collection rtList =
            queryService.find("findCustomerWithResultSetMapper",
                new Object[] {"%123456%" });
        // 2. assert a size of result
        assertEquals("Fail to select with custom ResultSetMapper.", 3, rtList
            .size());

        // 3. assert in detail
        Iterator resultItr = rtList.iterator();
        while (resultItr.hasNext()) {
            Customer customer = (Customer) resultItr.next();
            assertTrue("Fail to compare result in defail.", customer.getAddr()
                .equals("Seoul"));
        }
    }

    /**
     * [Flow #-2] Positive Case : pageIndex, 매핑 XML 파일
     * 내의 해당 쿼리에 대한 result length 정보와 함께 QueryService의
     * find() 메소드를 호출하여 매핑 XML에 정의된 쿼리문을 실행시키고, 매핑 XML에
     * 정의된 IResultSestMapper 유형의 Mapper를 이용하여, 결과값을
     * 매핑하도록 한다. 페이징 처리 여부를 점검한다. (<result> 내의 mapper
     * 속성값으로 IResultSetMapper를 구현한 클래스를 지정한 경우, 사용자가
     * 정의한 Mapper의 mapRow() 메소드를 호출하여 결과값을 매핑하게 된다.
     * QueryService를 통해 일반 VO 유형의 클래스에 결과값을 자동 매핑하게 하는
     * 경우 Reflection API 호출로 인해 성능 저하가 발생할 수 있다. 따라서,
     * QueryService에서는 이러한 단점을 보완하기 위해 사용자가 직접 해당하는
     * ResultSetMapper를 구현하여 적용할 수 있도록 하고 있다.)
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFindWithCustomResultSetMapperAndLength() throws Exception {
        // 1. execute query
        Collection rtList =
            queryService.find("findCustomerWithResultSetMapperAndLength",
                new Object[] {"%123456%" }, 1);
        // 2. assert a size of result
        assertEquals("Fail to select with custom ResultSetMapper.", 2, rtList
            .size());

        // 3. assert in detail
        Iterator resultItr = rtList.iterator();
        while (resultItr.hasNext()) {
            Customer customer = (Customer) resultItr.next();
            assertTrue("Fail to compare result in defail.", customer.getAddr()
                .equals("Seoul"));
        }
    }

    /**
     * [Flow #-3] Positive Case : pageIndex, pageSize
     * 정보와 함께 QueryService의 findWithRowCount() 메소드를
     * 호출하여 매핑 XML에 정의된 쿼리문을 실행시키고, 매핑 XML에 정의된
     * IResultSestMapper 유형의 Mapper를 이용하여, 결과값을 매핑하도록
     * 한다. 페이징 처리 여부를 점검한다. (<result> 내의 mapper 속성값으로
     * IResultSetMapper를 구현한 클래스를 지정한 경우, 사용자가 정의한
     * Mapper의 mapRow() 메소드를 호출하여 결과값을 매핑하게 된다.
     * QueryService를 통해 일반 VO 유형의 클래스에 결과값을 자동 매핑하게 하는
     * 경우 Reflection API 호출로 인해 성능 저하가 발생할 수 있다. 따라서,
     * QueryService에서는 이러한 단점을 보완하기 위해 사용자가 직접 해당하는
     * ResultSetMapper를 구현하여 적용할 수 있도록 하고 있다.)
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testFindWithRowCountWithCustomResultSetMapperAndLength()
            throws Exception {
        // 1. execute query
        Map rtMap =
            queryService.findWithRowCount("findCustomerWithResultSetMapper",
                new Object[] {"%123456%" }, 1, 2);

        // 2. assert total size of result
        Long totalCount = (Long) rtMap.get(QueryService.COUNT);
        assertEquals("Fail to get total count of results.", 3, totalCount
            .intValue());

        // 3. assert result size
        ArrayList rtList = (ArrayList) rtMap.get(QueryService.LIST);
        assertEquals("Fail to get results.", 2, rtList.size());

        // 4. assert in detail
        for (int i = 0; i < rtList.size(); i++) {
            Customer customer = (Customer) rtList.get(i);
            assertTrue("Fail to compare result.", customer.getNm().startsWith(
                "test"));
        }
    }
}
