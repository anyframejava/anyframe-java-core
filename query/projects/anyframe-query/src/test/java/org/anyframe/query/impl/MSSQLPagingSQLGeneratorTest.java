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

import junit.framework.TestCase;

import org.anyframe.query.impl.jdbc.generator.MSSQLPagingSQLGenerator;

/**
 * TestCase Name : MSSQLPagingSQLGeneratorTest <br>
 * <br>
 * [Description] : Paging processed query statements on a specific query
 * statement are verified with MSSQLPagingSQLGenerator. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case where DBMS type is MSSQL, Paging
 * processed query statements on a specific query statement are verified with
 * MSSQLPagingSQLGenerator</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class MSSQLPagingSQLGeneratorTest extends TestCase {
	/**
	 * [Flow #-1] Positive Case : In the case where DBMS type is MSSQL, Paging
	 * processed query statements on a specific query statement are verified
	 * with MSSQLPagingSQLGenerator
	 * 
	 * @throws Exception
	 *             throws exception which is from MSSQLPagingSQLGenerator
	 */
	public void testGetPaginationSQL() {
		MSSQLPagingSQLGenerator generator = new MSSQLPagingSQLGenerator();

		String sql1 = "select USER_NAME from USERS";
		String generatedSql = generator.getPaginationSQL(sql1, new Object[0],
				new int[0], 0, 10);
		assertEquals(
				"fail to generate SQL using DB2PagingSQLGenerator.",
				"SELECT * FROM( SELECT ORIGIN_SQL.*, ROW_NUMBER() OVER(ORDER BY (select 0)) AS rownum FROM (SELECT top 0 USER_NAME from USERS )ORIGIN_SQL \n"
						+ ")INNER_TABLE \n"
						+ "WHERE INNER_TABLE.rownum BETWEEN ? AND ?",
				generatedSql);

		String sql2 = "select USER_NAME from USERS ORDER BY USER_NAME";
		generatedSql = generator.getCountSQL(sql2);
		assertEquals(
				"fail to generate SQL using DB2PagingSQLGenerator.",
				"SELECT count(*) FROM (SELECT top 100 percent USER_NAME from USERS ORDER BY USER_NAME )INNER_TABLE ",
				generatedSql);
	}
}
