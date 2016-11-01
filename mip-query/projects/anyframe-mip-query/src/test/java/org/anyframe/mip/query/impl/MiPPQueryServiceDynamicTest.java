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
package org.anyframe.mip.query.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.sql.DataSource;

import junit.framework.Assert;

import org.anyframe.mip.query.MiPQueryService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.Variable;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:/spring/context-*.xml" })
public class MiPPQueryServiceDynamicTest {

	@Inject
	private DataSource dataSource;

	@Inject
	private MiPQueryService mipQueryService;

	/**
	 * Basic table is created for test and and basic data is entered.
	 */
	@Before
	public void onSetUp() {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP TABLE TB_MIP_USER");
				} catch (SQLException e) {
					System.out.println("Fail to DROP Table.");
				}

				statement.executeUpdate("CREATE TABLE TB_MIP_USER ( "
						+ "LOGON_ID  VARCHAR(20), " + "PASSWORD VARCHAR(20),"
						+ "NAME VARCHAR(20)," + "PRIMARY KEY (LOGON_ID))");

				statement
						.executeUpdate("INSERT INTO TB_MIP_USER VALUES ('admin', 'admin', 'ADMIN')");
				statement
						.executeUpdate("INSERT INTO TB_MIP_USER VALUES ('test', 'test123', 'TESTER')");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			Assert.fail("Unable to initialize database for test. " + e);
		}
	}

	@Test
	public void testDynamicWithForEachVariableList() {
		List<String> logonIdList = new ArrayList<String>();
		logonIdList.add("admin");
		logonIdList.add("test");

		VariableList variableList = new VariableList();
		Variant variant = new Variant(logonIdList);

		Variable variable = new Variable("logonIdList", variant);

		variableList.add(variable);

		Dataset resultDs = mipQueryService.search(
				"dynamicWithForEachVariableList", variableList);

		Assert.assertEquals(2, resultDs.getRowCount());
		Assert.assertEquals("ADMIN", resultDs.getColumnAsObject(0, "name"));
		Assert.assertEquals("TESTER", resultDs.getColumnAsObject(1, "name"));
	}

	@Test
	public void testDynamicQueryUsingTextReplaceVariableList() {
		// 1. set data for test
		VariableList variableList = new VariableList();

		Variable variable1 = new Variable("schema", new Variant("TB_MIP_USER"));
		Variable variable2 = new Variable("sortColumn", new Variant("NAME"));

		variableList.add(variable1);
		variableList.add(variable2);

		// 2. execute query
		Dataset resultDs = mipQueryService.search(
				"dynamicQueryUsingTextReplaceVariableList", variableList);
		Assert.assertEquals(2, resultDs.getRowCount());
		Assert.assertEquals("admin", resultDs.getColumnAsObject(0, "logonId"));
		Assert.assertEquals("test", resultDs.getColumnAsObject(1, "logonId"));
	}

	@Test
	public void testDynamicQueryUsingIfVariableList() {

		// When SEARCH_CONDITION is NULL
		// 1. set data for test
		VariableList variableList = new VariableList();

		Variable variable1 = new Variable("SEARCH_CONDITION", new Variant(""));

		variableList.add(variable1);

		// 2. execute query
		Dataset resultDs = mipQueryService.search(
				"dynamicQueryUsingIfVariableList", variableList);
		Assert.assertEquals(2, resultDs.getRowCount());

		// USER whose LOGON_I.D. is admin is searched.
		variableList.clear();

		variableList.add("SEARCH_CONDITION", "LOGON_ID");
		variableList.add("SEARCH_KEYWORD", "admin");

		resultDs = mipQueryService.search("dynamicQueryUsingIfVariableList",
				variableList);

		Assert.assertEquals(1, resultDs.getRowCount());
		Assert.assertEquals("admin", resultDs.getColumnAsString(0, "logonId"));

		// USER whose LOGON_I.D. is test123 is searched.
		variableList.clear();

		variableList.add("SEARCH_CONDITION", "NAME");
		variableList.add("SEARCH_KEYWORD", "TESTER");

		resultDs = mipQueryService.search("dynamicQueryUsingIfVariableList",
				variableList);

		Assert.assertEquals(1, resultDs.getRowCount());
		Assert.assertEquals("TESTER", resultDs.getColumnAsString(0, "name"));
	}

	@Test
	public void testDynamicQueryUsingIfDataSet() {

		// When SEARCH_CONDITION is NULL
		// 1. set data for test
		Dataset dsSearch = new Dataset();
		dsSearch.addStringColumn("SEARCH_CONDITION");
		dsSearch.addStringColumn("SEARCH_KEYWORD");

		dsSearch.appendRow();
		dsSearch.setColumn(0, "SEARCH_CONDITION", "");

		// 2. execute query
		Dataset resultDs = mipQueryService.search("dynamicQueryUsingIfDataSet",
				dsSearch);
		Assert.assertEquals(2, resultDs.getRowCount());

		// USER whose LOGON_I.D. is admin is searched.
		dsSearch.setColumn(0, "SEARCH_CONDITION", "LOGON_ID");
		dsSearch.setColumn(0, "SEARCH_KEYWORD", "admin");

		resultDs = mipQueryService.search("dynamicQueryUsingIfDataSet",
				dsSearch);

		Assert.assertEquals(1, resultDs.getRowCount());
		Assert.assertEquals("admin", resultDs.getColumnAsString(0, "logonId"));

		// USER whose LOGON_I.D. is test123 is searched.
		dsSearch.setColumn(0, "SEARCH_CONDITION", "NAME");
		dsSearch.setColumn(0, "SEARCH_KEYWORD", "TESTER");

		resultDs = mipQueryService.search("dynamicQueryUsingIfDataSet",
				dsSearch);

		Assert.assertEquals(1, resultDs.getRowCount());
		Assert.assertEquals("TESTER", resultDs.getColumnAsString(0, "name"));
	}
}
