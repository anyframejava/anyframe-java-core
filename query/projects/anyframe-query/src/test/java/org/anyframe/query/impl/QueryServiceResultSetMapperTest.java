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
import org.anyframe.query.vo.Customer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceResultSetMapperTest <br>
 * <br>
 * [Description] : By calling for findXXX()method, research result is mapped and
 * verified through Custom ResultSetMapper defined by user. (In the case of
 * selecting class implementing IResultSetMapper with property value within
 * <result>, Mapper’s mapRow() method is called for and its result value is
 * mapped. In the case of automatically mapping result value into ordinary VO
 * type class via QueryService, Reflection API call can lead to weakened
 * performance. Therefore, QueryService allows users by themselves to implement
 * and apply ResultSetMapper in order to make up for this shortcoming.)<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : QBy calling for find() method of QueryService, query
 * statement defined at mapping XML is implemented and by using
 * IResultSestMapper type Mapper defined at mapping XML, the result value is
 * mapped.</li>
 * <li>#-2 Positive Case : By calling for find() method of QueryService along
 * with pageIndex and result length information on relevant query within mapping
 * XML file, query statement defined at mapping XML is implemented and by using
 * IResultSestMapper type Mapper defined at mapping XML, the result value is
 * mapped. Checked is whether paging is processed.</li>
 * <li>#-3 Positive Case : By calling for findWithRowCount() method of
 * QueryService along with pageIndex and result length information on relevant
 * query within mapping XML file, query statement defined at mapping XML is
 * implemented and by using IResultSestMapper type Mapper defined at mapping
 * XML, the result value is mapped. Checked is whether paging is processed.</li>
 * </ul>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceResultSetMapperTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_CUSTOMER is created for test and initial data is added.
	 */
	@Before
	public void onSetUp() {
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

		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES('1234567890123','test1','Seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES('1234567890124','test2','Seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES('1234567890125','test3','Seoul')",
						new String[] {}, new Object[] {});
	}

	/**
	 * [Flow #-1] Positive Case : By calling for find() method of QueryService,
	 * query statement defined at mapping XML is implemented and by using
	 * IResultSestMapper type Mapper defined at mapping XML, the result value is
	 * mapped. (In the case of selecting class implementing IResultSetMapper
	 * with property value within <result>, Mapper’s mapRow() method is called
	 * for and its result value is mapped. In the case of automatically mapping
	 * result value into ordinary VO type class via QueryService, Reflection API
	 * call can lead to weakened performance. Therefore, QueryService allows
	 * users by themselves to implement and apply ResultSetMapper in order to
	 * make up for this shortcoming.)
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithCustomResultSetMapper() {
		// 1. execute query
		List<Customer> results = queryService.find(
				"findCustomerWithResultSetMapper", new Object[] { "%123456%" });
		// 2. assert a size of result
		Assert.assertEquals("Fail to select with custom ResultSetMapper.", 3,
				results.size());

		// 3. assert in detail
		Iterator<Customer> resultItr = results.iterator();
		while (resultItr.hasNext()) {
			Customer customer = resultItr.next();
			Assert.assertTrue("Fail to compare result in defail.", customer
					.getAddr().equals("Seoul"));
		}
	}

	/**
	 * [Flow #-2] Positive Case : By calling for find) method of QueryService
	 * along with pageIndex and result length information on relevant query
	 * within mapping XML file, query statement defined at mapping XML is
	 * implemented and by using IResultSestMapper type Mapper defined at mapping
	 * XML, the result value is mapped. Checked is whether paging is processed.
	 * (In the case of selecting class implementing IResultSetMapper with
	 * property value within <result>, Mapper’s mapRow() method is called for
	 * and its result value is mapped. In the case of automatically mapping
	 * result value into ordinary VO type class via QueryService, Reflection API
	 * call can lead to weakened performance. Therefore, QueryService allows
	 * users by themselves to implement and apply ResultSetMapper in order to
	 * make up for this shortcoming.)
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindWithCustomResultSetMapperAndLength() {
		// 1. execute query
		List<Customer> results = queryService.find(
				"findCustomerWithResultSetMapperAndLength",
				new Object[] { "%123456%" }, 1);
		// 2. assert a size of result
		Assert.assertEquals("Fail to select with custom ResultSetMapper.", 2,
				results.size());

		// 3. assert in detail
		Iterator<Customer> resultItr = results.iterator();
		while (resultItr.hasNext()) {
			Customer customer = resultItr.next();
			Assert.assertTrue("Fail to compare result in defail.", customer
					.getAddr().equals("Seoul"));
		}
	}

	/**
	 * [Flow #-3] Positive Case : By calling for findWithRowCount() method of
	 * QueryService along with pageIndex and result length information on
	 * relevant query within mapping XML file, query statement defined at
	 * mapping XML is implemented and by using ResultSestMapper type Mapper
	 * defined at mapping XML, the result value is mapped. Checked is whether
	 * paging is processed. (In the case of selecting class implementing
	 * ResultSetMapper with property value within <result>, Mapper’s mapRow()
	 * method is called for and its result value is mapped. In the case of
	 * automatically mapping result value into ordinary VO type class via
	 * QueryService, Reflection API call can lead to weakened performance.
	 * Therefore, QueryService allows users by themselves to implement and apply
	 * ResultSetMapper in order to make up for this shortcoming.)
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void testFindWithRowCountWithCustomResultSetMapperAndLength() {
		// 1. execute query
		Map<String, Object> rtMap = queryService.findWithRowCount(
				"findCustomerWithResultSetMapper", new Object[] { "%123456%" },
				1, 2);

		// 2. assert total size of result
		Long totalCount = (Long) rtMap.get(QueryService.COUNT);
		Assert.assertEquals("Fail to get total count of results.", 3,
				totalCount.intValue());

		// 3. assert result size
		List<Customer> rtList = (List<Customer>) rtMap.get(QueryService.LIST);
		Assert.assertEquals("Fail to get results.", 2, rtList.size());

		// 4. assert in detail
		for (int i = 0; i < rtList.size(); i++) {
			Customer customer = rtList.get(i);
			Assert.assertTrue("Fail to compare result.", customer.getNm()
					.startsWith("test"));
		}
	}
}
