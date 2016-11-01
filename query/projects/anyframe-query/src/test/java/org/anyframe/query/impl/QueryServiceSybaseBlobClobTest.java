/*
 * Copyright 2002-2010 the original author or authors.
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

import static org.junit.Assert.assertEquals;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.sql.DataSource;

import org.anyframe.query.QueryService;
import org.anyframe.query.vo.LobVO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * TestCase Name : QueryServiceSybaseBlobClobTest <br>
 * <br>
 * [Description] : DBMS 유형이 Sybase인 경우 CLOB, BLOB Handling 방법을 테스트하고 검증한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를 조회하여 결과값을 검증한다.</li>
 * <li>#-2 Positive Case : Positive Case : BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를
 * 조회하여 특정 Result Class에 담는다.</li>
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/lobhandler/sybase/context-*.xml" })
public class QueryServiceSybaseBlobClobTest {
	@Inject
	@Named("queryService")
	private QueryService queryService = null;
	@Inject
	@Named("dataSource")
	private DataSource dataSource = null;

	/**
	 * 테스트를 위해 테이블 TB_BINARY_TEST를 생성한다.
	 */
	@Before
	public void onSetUp() throws Exception {
		/*
		System.out.println("Attempting to drop old table");
		try {
			queryService.updateBySQL("DROP TABLE TB_BINARY_TEST",
					new String[] {}, new Object[] {});
		} catch (Exception e) {
			System.out.println("Fail to DROP Table.");
		}

		String sybaseCreate = "CREATE TABLE TB_BINARY_TEST ( bin_id numeric(5) PRIMARY KEY, myblob varbinary(20000), myclob text)";
		queryService
				.updateBySQL(sybaseCreate, new String[] {}, new Object[] {});
				*/

	}

	/**
	 * [Flow #-1] Positive Case : BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를 조회하여 결과값을
	 * 검증한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindClobBlob() throws Exception {
		/*
		// 1. set data for insert
		insertClobBlob();

		// 2. execute query
		Collection results = queryService.find("findBlobClob",
				new Object[] { "5" });
		assertEquals(1, results.size());

		// 3. assert
		Iterator resultItr = results.iterator();
		while (resultItr.hasNext()) {
			Map binary = (Map) resultItr.next();
			assertEquals("Fail to find clob.", val, binary.get("myclob"));
			assertEquals("Fail to find blob.", "12345", new String(
					(byte[]) binary.get("myblob")));
		}*/
	}

	/**
	 * [Flow #-2] Positive Case : BLOB, CLOB 유형의 데이터를 입력한 후 해당 데이터를 조회하여 특정
	 * Result Class에 담는다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testFindClobBlobWithResultClass() throws Exception {
		/*
		// 1. set data for insert
		insertClobBlob();

		// 2. execute query
		Collection results = queryService.find("findBlobClobWithResultClass",
				new Object[] { "5" });
		assertEquals(1, results.size());

		// 3. assert
		Iterator resultItr = results.iterator();
		while (resultItr.hasNext()) {
			LobVO binary = (LobVO) resultItr.next();
			assertEquals("Fail to find clob.", val, binary.getMyclob());
			assertEquals("Fail to find blob.", "12345", new String(binary
					.getMyblob()));
		}*/
	}

	/**
	 * 테스트를 위해 QueryService의 create() 메소드를 호출하여 BLOB, CLOB 유형의 데이터를 입력한다.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	private void insertClobBlob() throws Exception {
		// 1. execute query
		queryService.create("insertBlobClob", new Object[] { new Integer(5),
				"12345".getBytes(), val });
		queryService.create("insertBlobClob", new Object[] { new Integer(6),
				"12345".getBytes(), val });
	}

	// test data
	private String val = "1무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "2무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "3무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "4무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "5무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "6무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "7무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "8무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "9무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "10무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "11무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "12무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "13무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "14무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "15무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "16무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "17무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "18무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "19무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "20무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "21무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "22무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "23무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "24무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "25무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "26무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "27무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "28무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "29무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n"
			+ "30무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다무궁화꽃이피었습니다\n";
}
