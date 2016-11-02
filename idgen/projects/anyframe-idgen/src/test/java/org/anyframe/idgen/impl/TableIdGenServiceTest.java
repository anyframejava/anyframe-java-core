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
package org.anyframe.idgen.impl;

import static org.easymock.EasyMock.createMock;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.replay;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author SungHoon Son
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class TableIdGenServiceTest {

	@Inject
	private ApplicationContext applicationContext;

	TableIdGenServiceImpl idGenerator = null;

	DataSource dsMock = null;

	/**
	 * [Flow #-1] Negative Case : try to get next long id in case of tx
	 * conflicting is occurred. (autoCommit = true)
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testAllocateIdBlockWithTxConflictAutoCommit() throws Exception {
		initializeResultSetMock(true);
		idGenerator = (TableIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize1");

		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (NullPointerException ne) {
			assertTrue(true);
		}
	}

	/**
	 * [Flow #-2] Negative Case : try to get next long id in case of tx
	 * conflicting is occurred. (autoCommit = false)
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testAllocateIdBlockWithTxConflict() throws Exception {
		initializeResultSetMock(false);
		idGenerator = (TableIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize1");

		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (NullPointerException ne) {
			assertTrue(true);
		}
	}

	/**
	 * [Flow #-3] Negative Case : getNextLongId - In case, when connect to
	 * DataSource, error is occurred.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testAllocateIdBlockWithSQLException() throws Exception {
		initializeDataSourceMockThrowSQLException();
		idGenerator = (TableIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize1");

		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (Exception e) {
			assertEquals(
					"[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.",
					e.getMessage());
		}
	}

	/**
	 * initialize DataSource Mock Object. when we request getting connection
	 * from DataSource, SQLException occurs.
	 * 
	 * @throws Exception
	 *             fail to set Mock
	 */
	private void initializeDataSourceMockThrowSQLException() throws Exception {
		// 1. set mock object (dataSource)
		dsMock = createMock(DataSource.class);

		// 2. set return value using mock object
		expect(dsMock.getConnection()).andThrow(new SQLException());
		
		// 3. replay MockControl
		replay(dsMock);
	}

	/**
	 * initialize ResultSet Mock Object
	 * 
	 * @throws Exception
	 *             fail to set Mock
	 */
	private void initializeResultSetMock(boolean autoCommit) throws Exception {
		// 1. set mock object (dataSource)
		dsMock = createMock(DataSource.class);

		// 2. set mock object (connection)
		Connection connMock = createMock(Connection.class);

		// 3. set mock object (PreparedStatement)
		PreparedStatement stmtMock = createMock(PreparedStatement.class);

		// 4. set mock object (ResultSet)
		ResultSet rsltMock = createMock(ResultSet.class);

		// 5. set return value using mock object
		expect(dsMock.getConnection()).andReturn(connMock);
		
		expect(connMock.createStatement()).andReturn(stmtMock);
		
		connMock.close();
		
		expect(connMock.getAutoCommit()).andReturn(autoCommit);
		
		connMock.rollback();
		
		expect(stmtMock
				.executeQuery("SELECT next_id FROM idstest WHERE table_name = 'test'")).andReturn(rsltMock).anyTimes();
		
		expect(stmtMock.executeUpdate("UPDATE idstest SET next_id = 2 "
				+ "WHERE table_name = 'test' " + "AND next_id = 1")).andReturn(0).anyTimes();
		
		stmtMock.close();
		
		expect(rsltMock.next()).andReturn(true).anyTimes();
		
		expect(rsltMock.getLong(1)).andReturn((long)1).anyTimes();

		rsltMock.close();
		
		// 6. replay MockControl
		replay(dsMock);
		
		replay(connMock);
		replay(stmtMock);
		replay(rsltMock);	
	}
}
