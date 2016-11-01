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

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.CategoryVO;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceWithVONamedParamTest
 * <br>
 * <br>
 * [Description] : 특정 쿼리의 인자값을 전달할 때, named parameter
 * 형태로 transfer object를 전달하여 해당 쿼리를 실행하고 결과를 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QueryService에서 제공하는
 * update() 메소드 호출시 특정 쿼리의 인자값을 전달할 때, named parameter
 * 형태로 transfer object를 전달한다. QueryService에서는 전달받은 객체의
 * getter를 호출하여 UPDATE 쿼리의 인자값을 셋팅하고 실행한다. 이 테스트케이스에서는
 * 해당 쿼리 실행이 정상적인지 검증한다.</li>
 * <li>#-2 Positive Case : QueryService에서 제공하는
 * remove() 메소드 호출시 특정 쿼리의 인자값을 전달할 때, named parameter
 * 형태로 transfer object를 전달한다. QueryService에서는 전달받은 객체의
 * getter를 호출하여 DELETE 쿼리의 인자값을 셋팅하고 실행한다. 이 테스트케이스에서는
 * 해당 쿼리 실행이 정상적인지 검증한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class QueryServiceWithVONamedParamTest extends
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
            queryService.updateBySQL("DROP TABLE TB_EXT_CATEGORY",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }

        queryService.updateBySQL("CREATE TABLE TB_EXT_CATEGORY("
            + "CATEGORY_NO VARCHAR(16) NOT NULL,"
            + "CATEGORY_NAME VARCHAR(50) NOT NULL,"
            + "CATEGORY_DESC VARCHAR(100)," + "USE_YN CHAR(1),"
            + "REG_ID VARCHAR(20)," + "REG_DATE DATE,"
            + "MODIFY_ID VARCHAR(20)," + "MODIFY_DATE DATE,"
            + "CONSTRAINT PK_EXT_CATEGORY PRIMARY KEY(CATEGORY_NO))",
            new String[] {}, new Object[] {});

        queryService.updateBySQL(
            "INSERT INTO TB_EXT_CATEGORY VALUES('CATEGORY-00001','ygt',"
                + "'electronics','Y',NULL,TO_DATE('2007-06-27','yyyy-MM-dd'),NULL,TO_DATE('2008-05-21','yyyy-MM-dd'))",
            new String[] {}, new Object[] {});
    }

    /**
     * [Flow #-1] Positive Case : QueryService에서 제공하는
     * update() 메소드 호출시 특정 쿼리의 인자값을 전달할 때, named
     * parameter 형태로 transfer object를 전달한다.
     * QueryService에서는 전달받은 객체의 getter를 호출하여 UPDATE 쿼리의
     * 인자값을 셋팅하고 실행한다. 이 테스트케이스에서는 해당 쿼리 실행이 정상적인지
     * 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testUpdateCategory() throws Exception {
        // 1. insert test data
        CategoryVO categoryVO = insertCategory();

        // 2. update category name
        categoryVO.setCategoryName("testUpdate");

        // 3. execute query with named parameter 'vo'
        int result =
            queryService.update("updateCategory", new Object[] {new Object[] {
                "vo", categoryVO } });

        // 4. assert
        assertEquals("Fail to update category.", 1, result);
        // 5. assert in detail
        findCategory(categoryVO.getCategoryNo(), categoryVO.getCategoryName());
    }

    /**
     * [Flow #-2] Positive Case : QueryService에서 제공하는
     * remove() 메소드 호출시 특정 쿼리의 인자값을 전달할 때, named
     * parameter 형태로 transfer object를 전달한다.
     * QueryService에서는 전달받은 객체의 getter를 호출하여 DELETE 쿼리의
     * 인자값을 셋팅하고 실행한다. 이 테스트케이스에서는 해당 쿼리 실행이 정상적인지
     * 검증한다.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
    public void testDeleteCategory() throws Exception {
        // 1. insert test data
        CategoryVO categoryVO = insertCategory();

        // 2. execute query
        int result =
            queryService.remove("deleteCategory", new Object[] {new Object[] {
                "vo", categoryVO } });

        // 3. assert
        assertEquals("Fail to delete category.", 1, result);

        // 4. execute query for assert
        Collection rtCollection =
            queryService.find("findCategory", new Object[] {new Object[] {"vo",
                categoryVO } });

        // 5. assert
        assertEquals("Fail to find category list.", 0, rtCollection.size());
    }

    /**
     * 매핑 XML 파일에 정의된 query id를 이용하여 테스트를 위한 단건의 데이터를
     * 입력하고 결과를 검증한다.
     * @return
     * @throws Exception
     */
    private CategoryVO insertCategory() throws Exception {
        // 1. set data for test
        CategoryVO categoryVO = makeCategoryVO();

        // 2. execute query
        int result =
            queryService.create("insertCategory", new Object[] {new Object[] {
                "vo", categoryVO } });

        // 3. assert
        assertEquals("Fail to insert category.", 1, result);

        // 4. assert in detail
        findCategory(categoryVO.getCategoryNo(), categoryVO.getCategoryName());

        // 5. return for another test
        return categoryVO;
    }

    /**
     * 매핑 XML 파일에 정의된 query id를 이용하여 단건의 데이터를 조회하고 결과를
     * 검증한다.
     * @param categoryNo
     * @param categoryName
     * @throws Exception
     *         fail to find customer using query id
     */
    private void findCategory(String categoryNo, String categoryName)
            throws Exception {
        // 1. set data for test
        CategoryVO searchVO = new CategoryVO();
        searchVO.setCategoryNo(categoryNo);

        // 2. execute query
        Collection rtCollection =
            queryService.find("findCategory", new Object[] {new Object[] {"vo",
                searchVO } });

        // 3. assert
        assertEquals("Fail to find category list.", 1, rtCollection.size());

        // 4. assert in detail
        CategoryVO categoryVO = (CategoryVO) rtCollection.iterator().next();
        assertEquals("Fail to compare result.", categoryNo, categoryVO
            .getCategoryNo());
        assertEquals("Fail to compare result.", categoryName, categoryVO
            .getCategoryName());
    }

    /**
     * 테스트 수행을 위한 CategoryVO를 생성하여 전달한다.
     * @return CategoryVO
     */
    private CategoryVO makeCategoryVO() {
        CategoryVO categoryVO = new CategoryVO();
        // get the next string id through
        // idGenerationService.getNextStringId()
        // statement
        // set the categoryNo member
        categoryVO.setCategoryNo("categoryNo");
        // set the categoryName member
        categoryVO.setCategoryName("elec");
        // set the categoryDesc member
        categoryVO.setCategoryDesc("abc");
        // set the categoryName member
        categoryVO.setUseYn("y");
        // set the RegId member
        categoryVO.setRegId("abc233");
        // set the RegDate member
        categoryVO.setRegDate(null);
        // set the ModifyId member
        categoryVO.setModifyId("jkl");
        // set the ModifyDate member
        categoryVO.setModifyDate(null);

        return categoryVO;
    }
}
