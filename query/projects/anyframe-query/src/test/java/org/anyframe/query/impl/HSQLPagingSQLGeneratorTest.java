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

import org.anyframe.query.impl.jdbc.generator.HSQLPagingSQLGenerator;

import junit.framework.TestCase;

/**
 * TestCase Name : HSQLPagingSQLGeneratorTest <br>
 * <br>
 * [Description] : Paging processed query statements on a specific query
 * statement are verified with HSQLPagingSQLGenerator. <br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : In the case where DBMS type is HSQLDB, Paging
 * processed query statements on a specific query statement are verified with
 * HSQLPagingSQLGenerator</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
public class HSQLPagingSQLGeneratorTest extends TestCase {
	/**
	 * [Flow #-1] Positive Case : In the case where DBMS type is HSQLDB, Paging
	 * processed query statements on a specific query statement are verified
	 * with HSQLPagingSQLGenerator
	 * 
     * @throws Exception
     *         throws exception which is from
     *         HSQLPagingSQLGenerator
     */
    public void testGetPaginationSQL() {
        HSQLPagingSQLGenerator generator = new HSQLPagingSQLGenerator();

        String sql1 = "select USER_NAME from USERS";
        String generatedSql =
            generator.getPaginationSQL(sql1, new Object[0], new int[0], 0, 10);
        assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
            "select limit ? ? USER_NAME from USERS", generatedSql);

        String sql2 = "select USER_NAME from USERS ORDER BY USER_NAME";
        generatedSql = generator.getCountSQL(sql2);
        assertEquals("fail to generate SQL using DB2PagingSQLGenerator.",
            "SELECT count(*) FROM ( select USER_NAME from USERS  )",
            generatedSql);
    }
}
