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

import org.anyframe.query.QueryService;
import org.apache.commons.collections.map.ListOrderedMap;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * TestCase Name : QueryServiceBlobClobWithOracle8iTest <br>
 * <br>
 * [Description] : Spring에서 제공하는 OracleLobHandler는 Oracle 9i 이상만 지원한다. 따라서 이
 * 클래스에서는 Anyframe에서 제공하는 AnyframeOracle8iLobHandler를 사용하여 Oracle8i 환경에서 BLOB,
 * CLOB 유형의 데이터를 처리한다. 테스트 수행 전 해당 프로젝트의 클래스 패스에 Oracle8i용 JDBC Driver를 셋팅해야 한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를 조회하여 결과값을 검증한다.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class QueryServiceBlobClobWithOracle8iTest extends
		AbstractDependencyInjectionSpringContextTests {
	private QueryService queryService = null;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	/**
	 * 테스트를 위해 return문의 주석을 해제한다.
	 */
	protected String[] getConfigLocations() {
		setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
		// return new String[]
		// {"classpath*:/spring/ora8ilob/context-*.xml"
		// };
		return new String[] {};
	}

	/**
	 * 테스트를 위해 테이블 TB_BINARY를 생성한다.
	 */
	public void init() throws Exception {
		System.out.println("Attempting to drop old table");
		try {
			queryService.updateBySQL("DROP TABLE TB_BINARY", new String[] {},
					new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}
		queryService.updateBySQL("CREATE TABLE TB_BINARY ( "
				+ "bin_id  integer, " + "myblob blob," + "myclob clob,"
				+ "PRIMARY KEY (bin_id))", new String[] {}, new Object[] {});
	}

	/**
	 * [Flow #-1] Positive Case : BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를 조회하여 결과값을
	 * 검증한다. 테스트 수행을 위해서는 주석을 해제함으로써, private 메소드인 oracle8iBlobClob()를 실행시켜야 한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	public void testOracle8iBlobClob() throws Exception {
		// oracle8iBlobClob();
	}

	/**
	 * BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를 조회하여 결과값을 검증한다.
	 * 
	 * @throws Exception
	 */
	private void oracle8iBlobClob() throws Exception {
		init();
		// 1. execute query
		int result = queryService.create("insertBlobClobWithOra8i",
				new Object[] { new Object[] { new Integer(7) },
						new Object[] { new Integer(7) },
						new Object[] { tempString, tempString.getBytes() } });
		assertEquals("Fail to insert ClobBlob.", 1, result);

		// 2. assert
		Collection rtCollection = queryService.find("findBlobClobWithOra8i",
				new Object[] { new Integer(7) });

		assertEquals("Fail to find ClobBlob.", 1, rtCollection.size());

		Iterator rtIterator = rtCollection.iterator();

		// 3. assert in detail
		while (rtIterator.hasNext()) {
			ListOrderedMap map = (ListOrderedMap) rtIterator.next();

			assertEquals("Fail to compare result.", tempString, map
					.get("myclob"));
			assertEquals("Fail to compare result.", 201, ((byte[]) map
					.get("myblob")).length);
			assertEquals("Fail to compare result.", tempString, new String(
					(byte[]) map.get("myblob")));
		}
	}

	// test data
	private String tempString = "1무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다";
}
