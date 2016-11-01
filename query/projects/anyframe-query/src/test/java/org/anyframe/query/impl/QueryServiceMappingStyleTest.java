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
 * [Description] : QueryService에서 제공하는 다양한 질의 결과 매핑 유형 ('camel', 'lower',
 * 'upper', 'none')에 대해 테스트하고 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 'camel'인 경우
 * Map에 조회 결과가 담길때 key 정보가 camel-cased되는지 체크한다.</li>
 * <li>#-2 Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 'upper'인 경우
 * Map에 조회 결과가 담길때 key 정보가 upper-cased되는지 체크한다.</li>
 * <li>#-3 Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 'lower'인 경우
 * Map에 조회 결과가 담길때 key 정보가 lower-cased되는지 체크한다.</li>
 * <li>#-4 Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 'none'인 경우
 * Map에 조회 결과가 담길때 key 정보가 DBMS에서 리턴해주는 칼럼명 그대로 처리되는지 체크한다.</li>
 * <li>#-5 Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 정의되어 있지 않고,
 * isCamelCase가 true인 경우 Map에 조회 결과가 담길때 key 정보가 camel-cased되는지 체크한다.</li>
 * <li>#-6 Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 정의되어 있지 않고,
 * isCamelCase가 false인 경우 Map에 조회 결과가 담길때 key 정보가 lower-cased되는지 체크한다.</li>
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
	 * 테스트를 위해 테이블 TB_CUSTOMER를 생성한다.
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
	 * [Flow #-1] Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이
	 * 'camel'인 경우 Map에 조회 결과가 담길때 key 정보가 camel-cased되는지 체크한다.
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
	 * [Flow #-2] Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이
	 * 'upper'인 경우 Map에 조회 결과가 담길때 key 정보가 upper-cased되는지 체크한다.
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
	 * [Flow #-3] Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이
	 * 'lower'인 경우 Map에 조회 결과가 담길때 key 정보가 lower-cased되는지 체크한다.
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
	 * [Flow #-4] Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 'none'인
	 * 경우 Map에 조회 결과가 담길때 key 정보가 DBMS에서 리턴해주는 칼럼명 그대로 처리되는지 체크한다.
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
	 * [Flow #-5] Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 정의되어 있지
	 * 않고, isCamelCase가 true인 경우 Map에 조회 결과가 담길때 key 정보가 camel-cased되는지 체크한다.
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
	 * [Flow #-6] Positive Case : 매핑 XML 파일 내에 정의된 쿼리문에 대해 mappingStyle이 정의되어 있지
	 * 않고, isCamelCase가 false인 경우 Map에 조회 결과가 담길때 key 정보가 lower-cased되는지 체크한다.
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
	 * 조회된 결과값을 확인한다.
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
