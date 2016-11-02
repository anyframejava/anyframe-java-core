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

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.CodeVO;
import org.anyframe.query.vo.GroupCodeVO;
import org.anyframe.query.vo.LocalResultMappingVO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceResultMappingTest <br>
 * <br>
 * [Description] : Various query result mapping ways provided by QueryService is
 * tested and verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case table mapping information is defined by
 * using
 * <table>
 * within mapping XML file, search return value of class mapped at relevant
 * table are captured and transferred.
 * </li>
 * <li>#-2 Positive Case : In the case search return value regarding defined
 * specific query statement is mapped by using <result-mapping> within mapping
 * XML file, search return value at <result> is captured in class defined in
 * <result> and transferred.</li>
 * <li>#-3 Positive Case : In the case <result class=""> only is defined
 * regarding specific query statement without definition of table mapping
 * information, search return value is captured in class defined in <result> and
 * transferred.</li>
 * <li>#-4 Positive Case : In the case there is no mapping information on
 * separately defined specific query statement, search return value is captured
 * in HashMap and transferred. However, in the case isCamelCased is true when to
 * define key value put in HashMap based on isCamelCase property of relevant
 * query statement, spring applying CamelCase in search column name is set as
 * HashMap key value.</li>
 * <li>#-5 Positive Case : In the case there is no mapping information on
 * separately defined specific query statement, search return value is captured
 * in HashMap and transferred. However, in the case isCamelCased is false when
 * to define key value put in HashMap based on isCamelCase property of relevant
 * query statement, search column name is set as HashMap key value.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceResultMappingTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_RESERVATION is created for test.
	 */
	@Before
	public void onSetUp() {
		System.out.println("Attempting to drop old table");
		try {
			queryService.updateBySQL("DROP TABLE TB_CODE_GROUP",
					new String[] {}, new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		try {
			queryService.updateBySQL("DROP TABLE TB_CODE", new String[] {},
					new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		queryService.updateBySQL("CREATE TABLE TB_CODE_GROUP ( "
				+ "GROUP_ID varchar2(4) NOT NULL, "
				+ "GROUP_NAME varchar2(13), " + "GROUP_DESC varchar2(50), "
				+ "PRIMARY KEY (GROUP_ID))", new String[] {}, new Object[] {});

		queryService
				.updateBySQL(
						"INSERT INTO TB_CODE_GROUP VALUES ('CMMN', 'Common', 'Common Group')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CODE_GROUP VALUES ('CTGR', 'Category', 'Category Group')",
						new String[] {}, new Object[] {});

		queryService.updateBySQL("CREATE TABLE TB_CODE ( "
				+ "GROUP_ID varchar2(4) NOT NULL, "
				+ "CODE_ID varchar2(4) NOT NULL, " + "CODE_NAME varchar2(30), "
				+ "CODE_DESC varchar2(50), " + "CODE_USE_YN varchar2(1), "
				+ "PRIMARY KEY (GROUP_ID, CODE_ID))", new String[] {},
				new Object[] {});

		queryService
				.updateBySQL(
						"INSERT INTO TB_CODE VALUES ('CTGR', '0000', 'Electronics', 'Electronics', 'Y')",
						new String[] {}, new Object[] {});

		queryService
				.updateBySQL(
						"INSERT INTO TB_CODE VALUES ('CMMN', '0001', 'Configurations', 'Configurations', 'Y')",
						new String[] {}, new Object[] {});

	}

	/**
	 * [Flow #-1] Positive Case : In the case table mapping information is
	 * defined by using
	 * <table>
	 * within mapping XML file, search return value is captured in class mapped
	 * in relevant table and transferred.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testResultMappingWithTableMapping() {
		// Collection rtList = queryService.find("findWithTableMapping",
		// new Object[] {});
		List<CodeVO> results = queryService.find("findWithTableMapping",
				new Object[] {});

		Assert.assertEquals(
				"Fail to find code list using table mapping definition.", 2,
				results.size());

		Iterator<CodeVO> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			CodeVO codeVO = rtItr.next();
			Assert.assertTrue("Fail to assert in detail.", (codeVO.getCodeId()
					.equals("0000") || codeVO.getCodeId().equals("0001")));
		}
	}

	/**
	 * [Flow #-2] Positive Case : In the case search return value regarding
	 * defined specific query statement is mapped by using <result-mapping>
	 * within mapping XML file, search return value is captured in class defined
	 * in <result> and transferred.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testResultMappingWithLocalResultMapping() {
		List<LocalResultMappingVO> results = queryService.find(
				"findWithLocalResultMapping", new Object[] { "CTGR" });

		Assert
				.assertEquals(
						"Fail to find code list using local result mapping definition.",
						1, results.size());

		Iterator<LocalResultMappingVO> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			LocalResultMappingVO codeVO = rtItr.next();
			Assert.assertTrue("Fail to assert in detail.", codeVO.getCodeID()
					.equals("0000"));
			Assert.assertTrue("Fail to assert in detail.", codeVO
					.getGroupName().equals("Category"));
			Assert.assertTrue("Fail to assert in detail.", codeVO
					.getCodeDescription().equals("Electronics"));
		}
	}

	/**
	 * [Flow #-3] Positive Case : In the case <result class=""> only is defined
	 * regarding specific query statement without definition of table mapping
	 * information, search return value is captured in class defined in <result>
	 * and transferred. However, when search result is mapped on specific class,
	 * camelCase is applied in search column name and then property name defined
	 * in relevant string is found.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testResultMappingWithOnlyResultClass() {
		List<GroupCodeVO> results = queryService.find("findWithOnlyResultClass",
				new Object[] {});

		Assert.assertEquals(
				"Fail to find code list using only result class definition.",
				2, results.size());

		Iterator<GroupCodeVO> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			GroupCodeVO codeVO = rtItr.next();
			Assert.assertTrue("Fail to assert in detail.", (codeVO.getGroupId()
					.equals("CTGR") || codeVO.getGroupId().equals("CMMN")));
		}
	}

	/**
	 * [Flow #-4] Positive Case : In the case there is no mapping information on
	 * separately defined specific query statement, search return value is
	 * captured in HashMap and transferred. However, in the case isCamelCased is
	 * true when to define key value put in HashMap based on isCamelCase
	 * property of relevant query statement, spring applying CamelCase in search
	 * column name is set as HashMap key value.
	 * 
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testResultMappingWithHashMapCamelCased() {
		List<Map<String, Object>> results = queryService.find(
				"findWithHashMapAndCamelCased", new Object[] {});

		Assert.assertEquals(
				"Fail to find code list without no result mapping definition.",
				2, results.size());

		Iterator<Map<String, Object>> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			Map<String, Object> result = rtItr.next();
			Assert.assertTrue("Fail to assert in detail.", (result
					.get("codeId").equals("0000") || result.get("codeId")
					.equals("0001")));
		}
	}

	/**
	 * [Flow #-5] Positive Case : In the case there is no mapping information on
	 * separately defined specific query statement, search return value is
	 * captured in HashMap and transferred. However, in the case isCamelCased is
	 * false when to define key value put in HashMap based on isCamelCase
	 * property of relevant query statement, search column name is set as
	 * HashMap key value.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testResultMappingWithHashMap() {
		List<Map<String, Object>> results = queryService.find(
				"findWithHashMapAndNonCamelCased", new Object[] {});

		Assert.assertEquals(
				"Fail to find code list without no result mapping definition.",
				2, results.size());

		Iterator<Map<String, Object>> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			Map<String, Object> result = rtItr.next();
			Assert.assertTrue("Fail to assert in detail.", (result.get(
					"code_id").equals("0000") || result.get("code_id").equals(
					"0001")));
		}
	}

	/**
	 * [Flow #-6] Positive Case : In the case search return value regarding
	 * defined specific query statement is mapped by using <result-mapping>
	 * within mapping XML file, search return value is captured in class defined
	 * in <result> and transferred.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testResultMappingWithCompositeResultMapping() {
		List<LocalResultMappingVO> results = queryService.find(
				"findWithCompositeResultMapping", new Object[] { "CTGR" });

		Assert
				.assertEquals(
						"Fail to find code list using local result mapping definition.",
						1, results.size());

		Iterator<LocalResultMappingVO> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			LocalResultMappingVO codeVO = rtItr.next();

			Assert.assertTrue("Fail to assert in detail.", codeVO
					.getCodeDescription().equals("Electronics"));
			System.out.println(codeVO.getGroup().getGroupId());
			System.out.println(codeVO.getGroup().getCodeNm());
			Assert.assertTrue("Fail to assert in detail.", codeVO.getGroup()
					.getGroupId().equals("CTGR"));
			Assert.assertTrue("Fail to assert in detail.", codeVO.getGroup()
					.getCodeNm().equals("Category"));
		}
	}
}
