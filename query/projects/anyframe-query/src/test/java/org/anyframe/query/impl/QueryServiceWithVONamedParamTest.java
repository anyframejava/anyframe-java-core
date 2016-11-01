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

import java.util.Collection;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.CategoryVO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * TestCase Name : QueryServiceWithVONamedParamTest
 * <br>
 * <br>
 * [Description] : When a specific query’s factor value is delivered, 
 * transfer object is delivered in the form of named parameter 
 * and relevant query is implemented and its result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case of calling for update() method provided by QueryService, 
 * when a specific query’s factor value is delivered, 
 * transfer object is delivered in the form of named parameter. 
 * By calling for getter of delivered object, factor value of UPDATE query is set and executed. 
 * This TestCase verifies whether relevant query implementation is successful. 
</li>
 * <li>#-2 Positive Case : In the case of calling for remove() method provided by QueryService, 
 * when a specific query’s factor value is delivered, 
 * transfer object is delivered in the form of named parameter. 
 * By calling for getter of delivered object, factor value of DELETE query is set and executed. 
 * This TestCase verifies whether relevant query implementation is successful. 
</li>
 * </ul>
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class QueryServiceWithVONamedParamTest {
    
	@Inject
	QueryService queryService;

//    public void setQueryService(QueryService queryService) {
//        this.queryService = queryService;
//    }
//
//    protected String[] getConfigLocations() {
//        return new String[] {"classpath:/spring/context-*.xml" };
//    }

    /**
     * Table TB_EXT_CATEGORY is created for test and initial data is entered. 
     */
	@Before
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
     * [Flow #-1] Positive Case : In the case of calling for remove() method provided by QueryService, 
     * when a specific query’s factor value is delivered, 
     * transfer object is delivered in the form of named parameter. 
     * By calling for getter of delivered object, factor value of DELETE query is set and executed. 
     * This TestCase verifies whether relevant query implementation is successful. 
     * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
	@Test
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
        Assert.assertEquals("Fail to update category.", 1, result);
        // 5. assert in detail
        findCategory(categoryVO.getCategoryNo(), categoryVO.getCategoryName());
    }

    /**
     * [Flow #-2] Positive Case : In the case of calling for remove() method provided by QueryService, 
     * when a specific query’s factor value is delivered, 
     * transfer object is delivered in the form of named parameter. 
     * By calling for getter of delivered object, factor value of DELETE query is set and executed. 
     * This TestCase verifies whether relevant query implementation is successful. 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
	@Test
    public void testDeleteCategory() throws Exception {
        // 1. insert test data
        CategoryVO categoryVO = insertCategory();

        // 2. execute query
        int result =
            queryService.remove("deleteCategory", new Object[] {new Object[] {
                "vo", categoryVO } });

        // 3. assert
        Assert.assertEquals("Fail to delete category.", 1, result);

        // 4. execute query for assert
        Collection rtCollection =
            queryService.find("findCategory", new Object[] {new Object[] {"vo",
                categoryVO } });

        // 5. assert
        Assert.assertEquals("Fail to find category list.", 0, rtCollection.size());
    }

    /**
     * By using query I.D. defined at mapping XML file, 
     * one piece of data for test is searched and its result is verified.
     *  
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
        Assert.assertEquals("Fail to insert category.", 1, result);

        // 4. assert in detail
        findCategory(categoryVO.getCategoryNo(), categoryVO.getCategoryName());

        // 5. return for another test
        return categoryVO;
    }

    /**
     * By using query I.D. defined at mapping XML file, 
     * one piece of data is searched and its result is verified. 
     * 
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
        Assert.assertEquals("Fail to find category list.", 1, rtCollection.size());

        // 4. assert in detail
        CategoryVO categoryVO = (CategoryVO) rtCollection.iterator().next();
        Assert.assertEquals("Fail to compare result.", categoryNo, categoryVO
            .getCategoryNo());
        Assert.assertEquals("Fail to compare result.", categoryName, categoryVO
            .getCategoryName());
    }

    /**
     * CategoryVO for running a test is created and delivered. 
     * 
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
