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

import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;
import org.anyframe.query.impl.util.InternalDataAccessException;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

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
public class QueryServiceDDLTest extends
        AbstractDependencyInjectionSpringContextTests {
    private QueryService queryService = null;

    public void setQueryService(QueryService queryService) {
        this.queryService = queryService;
    }

    protected String[] getConfigLocations() {
        setAutowireMode(AbstractDependencyInjectionSpringContextTests.AUTOWIRE_BY_NAME);
        return new String[] {"classpath*:/spring/context-*.xml" };
    }

	/**
	 * Index IDX_CUSTOMER is created for test.
	 */
    public void onSetUp() throws Exception {
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
    public void testCreateTable() throws Exception {
        // 1. execute query
        queryService.create("createTable", new Object[] {});

        // 2. execute same query
        try {
            queryService.create("createTable", new Object[] {});
            fail("Fail to create table.");
        } catch (QueryServiceException e) {
            // 3. assert
            assertTrue("Fail to find cause.",
                e.getCause() instanceof InternalDataAccessException);
            String errorCode =
                ((InternalDataAccessException) e.getCause()).getSqlErrorCode();
            assertEquals("Fail to find sql error code.", "955", errorCode);
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
    public void testDropTable() throws Exception {
        // 1. create table
        testCreateTable();

        // 2. execute query
        queryService.remove("dropTable", new Object[] {});

        // 3. execute same query
        try {
            queryService.remove("dropTable", new Object[] {});
        } catch (QueryServiceException e) {
            // 4. assert
            assertTrue("Fail to find cause.",
                e.getCause() instanceof InternalDataAccessException);
            String errorCode =
                ((InternalDataAccessException) e.getCause()).getSqlErrorCode();
            assertEquals("Fail to find sql error code.", "942", errorCode);
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
    public void testCreateIndex() throws Exception {
        // 1. execute query
        int result = queryService.create("createIndex", new Object[] {});
        // 정상적으로 실행된 경우 0을 리턴함.
        assertEquals("Fail to create index.", 0, result);

        // 2. execute query
        queryService.remove("dropIndex", new Object[] {});
        // 정상적으로 실행된 경우 0을 리턴함.
        assertEquals("Fail to drop index.", 0, result);
    }
}
