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
import org.apache.commons.collections.map.ListOrderedMap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceBlobClobWithOracle8iTest <br>
 * <br>
 * [Description] : OracleLoHandler provided by Spring only supports Version
 * Oracle 9i and above. Therefore, this class processes BLOB, CLOB type data at
 * Oracle8i environment by using AnyframeOracle8iLobHandler provided by
 * Anyframe. JDBC Driver for Oracle8i should be set at relevant project’s
 * classpath. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : After entering BLOB, CLOB type data, relevant data is
 * searched and its result value is verified.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceBlobClobWithOracle8iTest {

	@Inject
	QueryService queryService;

	/**
	 * Table TB_BINARY is created for test.
	 */
	@Before
	public void init() {
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
	 * [Flow #-1] Positive Case : After entering BLOB and CLOB type data,
	 * relevant data is searched and its result value is verified. By undoing
	 * annotation for test, oracle8iBlobClob(, private method should be
	 * executed.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testOracle8iBlobClob() {
		// oracle8iBlobClob();
	}

	/**
	 * After entering BLOB and CLOB type data, relevant data is searched and its
	 * result value is verified.
	 * 
	 * @throws Exception
	 */
	@SuppressWarnings("unused")
	private void oracle8iBlobClob() {
		init();
		// 1. execute query
		int result = queryService.create("insertBlobClobWithOra8i",
				new Object[] { new Object[] { new Integer(7) },
						new Object[] { new Integer(7) },
						new Object[] { tempString, tempString.getBytes() } });
		Assert.assertEquals("Fail to insert ClobBlob.", 1, result);

		// 2. assert
		List<Map<String, Object>> results = queryService.find(
				"findBlobClobWithOra8i", new Object[] { new Integer(7) });

		Assert.assertEquals("Fail to find ClobBlob.", 1, results.size());

		Iterator<Map<String, Object>> rtIterator = results.iterator();

		// 3. assert in detail
		while (rtIterator.hasNext()) {
			ListOrderedMap map = (ListOrderedMap) rtIterator.next();

			Assert.assertEquals("Fail to compare result.", tempString, map
					.get("myclob"));
			Assert.assertEquals("Fail to compare result.", 201, ((byte[]) map
					.get("myblob")).length);
			Assert.assertEquals("Fail to compare result.", tempString,
					new String((byte[]) map.get("myblob")));
		}
	}

	// test data
	private String tempString = "1The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.";
}
