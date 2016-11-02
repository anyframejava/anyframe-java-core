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

import javax.inject.Inject;

import junit.framework.Assert;

import org.anyframe.query.QueryService;
import org.anyframe.query.exception.InternalDataAccessException;
import org.anyframe.query.exception.QueryException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * TestCase Name : QueryServiceDDLTest <br>
 * <br>
 * [Description] : queries of the type of DDL are tested and verified.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : By calling for create()method of QueryService, DDL is
 * executed in order to create a new table. By executing the identical query
 * statement again to check whether the new table is well created, verified is
 * whether “ORA-00955” error meaning the existing object uses this name takes
 * place.</li>
 * <li>#-2 Positive Case : By calling for create()method of QueryService, DDL is
 * executed in order to drop the newly created table. By executing the identical
 * query statement again to check whether the new table is well dropped,
 * verified is whether “ORA-00942” error meaning there is no table or view takes
 * place</li>
 * <li>#-3 Positive Case : By calling for create(), remove() methods of
 * QueryService, Index is created and deleted and its result is verified.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class QueryServiceDDLTest {
	
	@Inject
	QueryService queryService;
	
	/**
	 * Index IDX_CUSTOMER is created for test.
	 */
	@Before
    public void onSetUp() {
        try {
            queryService.remove("dropTable", new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Table.");
        }

        try {
            queryService.updateBySQL("drop index IDX_CUSTOMER",
                new String[] {}, new Object[] {});
        } catch (Exception e) {
            System.out.println("Fail to DROP Index.");
        }
    }

	/**
	 * [Flow #-1] Positive Case : By calling for create()method of QueryService,
	 * DDL is executed in order to create a new table. By executing the
	 * identical query statement again to check whether the new table is well
	 * created, verified is whether “ORA-00955” error meaning the current object
	 * uses this name takes place.
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
	@Test
    public void testCreateTable() {
        // 1. execute query
        queryService.create("createTable", new Object[] {});

        // 2. execute same query
        try {
            queryService.create("createTable", new Object[] {});
            Assert.fail("Fail to create table.");
        } catch (QueryException e) {
            // 3. assert
        	Assert.assertTrue("Fail to find cause.",
                e.getCause() instanceof InternalDataAccessException);
            String errorCode =
                ((InternalDataAccessException) e.getCause()).getSqlErrorCode();
            Assert.assertEquals("Fail to find sql error code.", "955", errorCode);
        }
    }

	/**
	 * [Flow #-2] Positive Case : By calling for create()method of QueryService,
	 * DDL is executed in order to drop the newly created table. By executing
	 * the identical query statement again to check whether the new table is
	 * well dropped, verified is whether “ORA-00942” error meaning there is no
	 * table or viewF takes place
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
	@Test
    public void testDropTable() {
        // 1. create table
        testCreateTable();

        // 2. execute query
        queryService.remove("dropTable", new Object[] {});

        // 3. execute same query
        try {
            queryService.remove("dropTable", new Object[] {});
        } catch (QueryException e) {
            // 4. assert
        	Assert.assertTrue("Fail to find cause.",
                e.getCause() instanceof InternalDataAccessException);
            String errorCode =
                ((InternalDataAccessException) e.getCause()).getSqlErrorCode();
            Assert.assertEquals("Fail to find sql error code.", "942", errorCode);
        }
    }

	/**
	 * [Flow #-3] Positive Case : By calling for create(), remove()methods of
	 * QueryService, index is created and deleted and its result is verified.
	 * 
     * @throws Exception
     *         throws exception which is from
     *         QueryService
     */
	@Test
    public void testCreateIndex() {
        // 1. execute query
        int result = queryService.create("createIndex", new Object[] {});
        // 정상적으로 실행된 경우 0을 리턴함.
        Assert.assertEquals("Fail to create index.", 0, result);

        // 2. execute query
        queryService.remove("dropIndex", new Object[] {});
        // 정상적으로 실행된 경우 0을 리턴함.
        Assert.assertEquals("Fail to drop index.", 0, result);
    }
}
