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

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceLongVarCharTest <br>
 * <br>
 * [Description] : query statement including LONG type data is executed and
 * exectution result is verified. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : After entering LONG type data, verified is whether
 * entering is successful.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceLongVarCharTest {

	@Inject
	QueryService queryService;

	@Inject
	DataSource dataSource;

	/**
	 * Table TB_LONG_VARCHAR is created for test.
	 */
	@Before
	public void onSetUp() {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP TABLE TB_LONG_VARCHAR");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_LONG_VARCHAR ( "
						+ "COUNT  INTEGER, " + "MYVARCHAR VARCHAR2(2000),"
						+ "MYLONG LONG," + "PRIMARY KEY (COUNT))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-1] Positive Case : After entering LONG type data, verified is
	 * whether entering is successful.
	 * 
	 * @throws Exception
	 *             throws exception which is from QueryService
	 */
	@Test
	public void testLognVarchar() {
		// 1. execute insert query
		queryService.create("insertLongVarchar", new Object[] { new Integer(5),
				val1, val2 });

		// 2. execute select query
		List<Map<String, Object>> results = queryService.find("findLongVarchar",
				new Object[] { new Integer(5) });

		// 3. assert
		Assert.assertEquals("Fail to execute query with longvarchar type.", 1,
				results.size());

		// 4. assert in detail
		Iterator<Map<String, Object>> rtItr = results.iterator();
		while (rtItr.hasNext()) {
			Map<String, Object> binary = rtItr.next();
			Assert.assertEquals("Fail to check a varchar value.", val1, binary
					.get("myvarchar"));
			Assert.assertEquals("Fail to check a longvarchar value.", val2,
					binary.get("mylong"));
		}
	}

	// set data
	private String val1 = "0The rose of Sharon is in blossom.";
	private String val2 = "1The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "2The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "3The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "4The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "5The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "6The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "7The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "8The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "9The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "10The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "11The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "12The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "13The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "14The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "15The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "16The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "17The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "18The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "19The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "20The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "21The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "22The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "23The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "24The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "25The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "26The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "27The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "28The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "29The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n"
			+ "30The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom. The rose of Sharon is in blossom.\n";
}
