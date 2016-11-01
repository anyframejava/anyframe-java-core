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

import org.anyframe.query.impl.jdbc.generator.AltibasePagingSQLGenerator;

import junit.framework.TestCase;

/**
 * TestCase Name : AltibasePaginSQLGenerator <br>
 * <br>
 * [Description] : Verified is query statement paging processed on a specific
 * query statement with AltibasePaginSQLGenerator.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case where DBMS type is ALTIBASE, Verified is
 * query statement paging processed on a specific query statement with
 * AltibasePaginSQLGenerator.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class AltibasePaginSQLGenerator extends TestCase {
	/**
	 * [Flow #-1] Positive Case : In the case where DBMS type is ALTIBASE,
	 * Verified is query statement paging processed on a specific query
	 * statement with DB2PagingSQLGenerator.
	 * 
	 * @throws Exception
	 *             throws exception which is from AltibasePagingSQLGenerator
	 */
	public void testGetPaginationSQL() throws Exception {
		AltibasePagingSQLGenerator generator = new AltibasePagingSQLGenerator();

		String sql1 = "select USER_NAME from USERS";
		String generatedSql = generator.getPaginationSQL(sql1, new Object[0],
				new int[0], 1, 10);
		assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
				"select USER_NAME from USERS limit ?, ?", generatedSql);

		String sql2 = "select DISTINCT USER_ID from USERS";
		generatedSql = generator.getPaginationSQL(sql2, new Object[0],
				new int[0], 1, 10);
		assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
				"select DISTINCT USER_ID from USERS limit ?, ?", generatedSql);

		String sql3 = "select USER_NAME from USERS ORDER BY USER_NAME";
		generatedSql = generator.getPaginationSQL(sql3, new Object[0],
				new int[0], 1, 10);
		assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
				"select USER_NAME from USERS ORDER BY USER_NAME limit ?, ?",
				generatedSql);

		String sql4 = "select * from USERS ORDER BY USER_NAME";
		generatedSql = generator.getPaginationSQL(sql4, new Object[0],
				new int[0], 1, 10);
		assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
				"select * from USERS ORDER BY USER_NAME limit ?, ?",
				generatedSql);

		String sql5 = "select DISTINCT * from USERS";
		generatedSql = generator.getPaginationSQL(sql5, new Object[0],
				new int[0], 1, 10);
		assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
				"select DISTINCT * from USERS limit ?, ?", generatedSql);

		String sql6 = "select DISTINCT * from USERS ORDER BY USER_NAME";
		generatedSql = generator.getPaginationSQL(sql6, new Object[0],
				new int[0], 1, 10);
		assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
				"select DISTINCT * from USERS ORDER BY USER_NAME limit ?, ?",
				generatedSql);

		String sql7 = "   select DISTINCT * from USERS ORDER BY USER_NAME   ";
		generatedSql = generator.getPaginationSQL(sql7, new Object[0],
				new int[0], 1, 10);
		assertEquals(
				"fail to generate SQL using DB2PagingSQLGenerator.",
				"   select DISTINCT * from USERS ORDER BY USER_NAME    limit ?, ?",
				generatedSql);

		String sql8 = "   select      DISTINCT * from USERS ORDER BY USER_NAME   ";
		generatedSql = generator.getPaginationSQL(sql8, new Object[0],
				new int[0], 1, 10);
		assertEquals(
				"fail to generate SQL using DB2PagingSQLGenerator.",
				"   select      DISTINCT * from USERS ORDER BY USER_NAME    limit ?, ?",
				generatedSql);

		try {
			generatedSql = generator.getPaginationSQL(sql8, new Object[0],
					new int[0], 0, 10);
			fail("Fail to check a page index or a page size.");
		} catch (Exception e) {
			assertEquals(
					"Fail to assert exception message.",
					"Query Service : Can't generate paging SQL under Altibase. Because page number or page size is smaller than 1. [current page number = 0, page size = 10]",
					e.getMessage());
		}
	}
}
