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

import org.anyframe.query.impl.jdbc.generator.DB2PagingSQLGenerator;

import junit.framework.TestCase;

/**
 * TestCase Name : DB2PagingSQLGeneratorTest <br>
 * <br>
 * [Description] : Paging processed query statements on a specific query
 * statement are verified with DB2PagingSQLGenerator.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case where DBMS type is DB2, Paging processed
 * query statements on a specific query statement are verified with
 * DB2PagingSQLGenerator.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class DB2PagingSQLGeneratorTest extends TestCase {
	/**
	 * [Flow #-1] Positive Case : In the case where DBMS type is DB2, Paging
	 * processed query statements on a specific query statement are verified
	 * with DB2PagingSQLGenerator.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         DB2PagingSQLGenerator
     */
    public void testGetPaginationSQL() {
        DB2PagingSQLGenerator generator = new DB2PagingSQLGenerator();

        String sql1 = "select USER_NAME from USERS";
        String generatedSql =
            generator.getPaginationSQL(sql1, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ,  USER_NAME from USERS) AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql2 = "select DISTINCT USER_ID from USERS";
        generatedSql =
            generator.getPaginationSQL(sql2, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, row_.* FROM (select DISTINCT USER_ID from USERS) AS row_ ) AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql3 = "select USER_NAME from USERS ORDER BY USER_NAME";
        generatedSql =
            generator.getPaginationSQL(sql3, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, INNER_TABLE.* FROM (select USER_NAME from USERS ORDER BY USER_NAME) AS INNER_TABLE ) WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql4 = "select * from USERS ORDER BY USER_NAME";
        generatedSql =
            generator.getPaginationSQL(sql4, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, INNER_TABLE.* FROM (select * from USERS ORDER BY USER_NAME) AS INNER_TABLE ) WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql5 = "select DISTINCT * from USERS";
        generatedSql =
            generator.getPaginationSQL(sql5, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, row_.* FROM (select DISTINCT * from USERS) AS row_ ) AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql6 = "select DISTINCT * from USERS ORDER BY USER_NAME";
        generatedSql =
            generator.getPaginationSQL(sql6, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, row_.* FROM (select DISTINCT * from USERS ORDER BY USER_NAME) AS row_ ) AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql7 = "   select DISTINCT * from USERS ORDER BY USER_NAME   ";
        generatedSql =
            generator.getPaginationSQL(sql7, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, row_.* FROM (select DISTINCT * from USERS ORDER BY USER_NAME) AS row_ ) AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);

        String sql8 =
            "   select      DISTINCT * from USERS ORDER BY USER_NAME   ";
        generatedSql =
            generator.getPaginationSQL(sql8, new Object[0], new int[0], 0, 10);
        assertEquals(
            "fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT * FROM ( SELECT rownumber() over() as ROW_SEQ, row_.* FROM (select      DISTINCT * from USERS ORDER BY USER_NAME) AS row_ ) AS INNER_TABLE WHERE ROW_SEQ BETWEEN ? AND ?",
            generatedSql);
    }
}
