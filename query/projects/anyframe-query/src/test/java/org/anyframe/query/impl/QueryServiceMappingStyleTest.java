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
import java.util.Iterator;
import java.util.Map;

import org.anyframe.query.QueryService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * TestCase Name : QueryServiceMappingStyleTest <br>
 * <br>
 * [Description] : Tested and verified are mapping types such as 'camel',
 * 'lower', 'upper' and 'none' of various query execution results provided by
 * QueryService. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case where mapping style is ‘camel’ regarding
 * query statement defined within mapping XML file, when search result is stored
 * in Map, checked is whether key information is camel-cased.</li>
 * <li>#-2 Positive Case : In the case where mapping style is ‘upper’ regarding
 * query statement defined within mapping XML file, when search result is stored
 * in Map, checked is whether key information is upper-cased.</li>
 * <li>#-3 Positive Case : In the case where mapping style is ‘lower’ regarding
 * query statement defined within mapping XML file, when search result is stored
 * in Map, checked is whether key information is lower-cased.</li>
 * <li>#-4 Positive Case : In the case where mapping style is ‘none’ regarding
 * query statement defined within mapping XML file, when search result is stored
 * in Map, checked is whether key information is processed as the column name
 * witch returns from DBMS implies.</li>
 * <li>#-5 Positive Case : In the case where mappingStyle is not defined
 * regarding query statement defined within mapping XML file and isCamelCase is
 * true, when search result is stored in Map, checked is whether key information
 * is camel-cased.</li>
 * <li>#-6 Positive Case : In the case where mappingStyle is not defined
 * regarding query statement defined within mapping XML file and isCamelCase is
 * false, when search result is stored in Map, checked is whether key
 * information is lower-cased.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceMappingStyleTest extends
		AbstractDependencyInjectionSpringContextTests {
	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	protected String[] getConfigLocations() {
		setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	/**
	 * Table TB_CUSTOMER is created for test.
	 */
	public void onSetUp() throws Exception {
		try {
			queryService.updateBySQL("DROP TABLE TB_CUSTOMER", new String[] {},
					new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}
		queryService.updateBySQL("CREATE TABLE TB_CUSTOMER ( "
				+ "SOCIAL_SECURITY_NUMBER varchar2(13) NOT NULL, "
				+ "CUSTOMER_NAME varchar2(20), "
				+ "CUSTOMER_ADDRESS varchar2(20), "
				+ "PRIMARY KEY (SOCIAL_SECURITY_NUMBER))", new String[] {},
				new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES ('1234567890100','test0','seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES ('1234567890101','test1','seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES ('1234567890102','test2','seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES ('1234567890103','test3','seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES ('1234567890104','test4','seoul')",
						new String[] {}, new Object[] {});
		queryService
				.updateBySQL(
						"INSERT INTO TB_CUSTOMER VALUES ('1234567890105','test5','seoul')",
						new String[] {}, new Object[] {});
	}

	/**
	 * [Flow #-1] Positive Case : In the case where mappingStyple is ‘camel’
	 * regarding query statement defined within mapping XML file, when search
	 * result in stored in Map, checked is whether key information is
	 * camel-cased.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithCamelCased() throws Exception {
		Collection rtCollection = queryService.find(
				"findCustomerWithCamelCased", new Object[] { "%%" });
		assertFindCustomer(rtCollection, "socialSecurityNumber",
				"customerName", "customerAddress");
	}

	/**
	 * [Flow #-2] Positive Case : In the case where mappingStyple is ‘upper’
	 * regarding query statement defined within mapping XML file, when search
	 * result in stored in Map, checked is whether key information is
	 * upper-cased.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithUpperCased() throws Exception {
		Collection rtCollection = queryService.find(
				"findCustomerWithUpperCased", new Object[] { "%%" });
		assertFindCustomer(rtCollection, "SOCIAL_SECURITY_NUMBER",
				"CUSTOMER_NAME", "CUSTOMER_ADDRESS");
	}

	/**
	 * [Flow #-3] Positive Case : In the case where mappingStyple is ‘lower’
	 * regarding query statement defined within mapping XML file, when search
	 * result in stored in Map, checked is whether key information is
	 * upper-cased.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithLowerCased() throws Exception {
		Collection rtCollection = queryService.find(
				"findCustomerWithLowerCased", new Object[] { "%%" });
		assertFindCustomer(rtCollection, "social_security_number",
				"customer_name", "customer_address");
	}

	/**
	 * [Flow #-4] Positive Case : In the case where mapping style is ‘none’
	 * regarding query statement defined within mapping XML file, when search
	 * result is stored in Map, checked is whether key information is processed
	 * as the column name witch returns from DBMS implies.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithNone() throws Exception {
		Collection rtCollection = queryService.find("findCustomerWithNone",
				new Object[] { "%%" });
		assertFindCustomer(rtCollection, "social_security_number",
				"customer_name", "customer_address");
	}

	/**
	 * [Flow #-5] Positive Case : In the case where mappingStyle is not defined
	 * regarding query statement defined within mapping XML file and isCamelCase
	 * is true, when search result is stored in Map, checked is whether key
	 * information is camel-cased.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithIsCamelCaseTrue() throws Exception {
		Collection rtCollection = queryService.find(
				"findCustomerWithIsCamelCaseTrue", new Object[] { "%%" });
		assertFindCustomer(rtCollection, "socialSecurityNumber",
				"customerName", "customerAddress");
	}

	/**
	 * [Flow #-6] Positive Case : In the case where mappingStyle is not defined
	 * regarding query statement defined within mapping XML file and isCamelCase
	 * is false, when search result is stored in Map, checked is whether key
	 * information is lower-cased.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testFindCustomerWithIsCamelCaseFalse() throws Exception {
		Collection rtCollection = queryService.find(
				"findCustomerWithIsCamelCaseFalse", new Object[] { "%%" });
		assertFindCustomer(rtCollection, "socialSecurityNumber",
				"customerName", "customerAddress");
	}

	/**
	 * Checked is searched result value. 
	 */
	private void assertFindCustomer(Collection rtCollection, String ssnoKey,
			String nameKey, String addressKey) throws Exception {
		Iterator rtItr = rtCollection.iterator();
		int i = 0;
		while (rtItr.hasNext()) {
			Map result = (Map) rtItr.next();
			assertEquals("Fail to assert - social security number.",
					"123456789010" + i, result.get(ssnoKey));
			assertEquals("Fail to assert - social security number.",
					"test" + i, result.get(nameKey));
			assertEquals("Fail to assert - social security number.", "seoul",
					result.get(addressKey));
			i++;
		}
	}
}
