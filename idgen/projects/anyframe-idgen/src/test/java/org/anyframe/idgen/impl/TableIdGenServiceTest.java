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
package org.anyframe.idgen.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.anyframe.idgen.impl.TableIdGenServiceImpl;
import org.easymock.MockControl;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

import org.anyframe.exception.BaseException;

/**
* @author SoYon Lim
* @author JongHoon Kim
*/
public class TableIdGenServiceTest extends
		AbstractDependencyInjectionSpringContextTests {
	TableIdGenServiceImpl idGenerator = null;

	MockControl dsControl = null;

	DataSource dsMock = null;

	/**
	 * overrided
	 * 
	 * @return String[]
	 */
	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/context-*.xml" };
	}

	/**
	 * [Flow #-1] Negative Case : try to get next long id in case of tx
	 * conflicting is occurred. (autoCommit = true)
	 * 
	 * @throws Exception
	 *             fail to test
	 */
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
	public void testAllocateIdBlockWithSQLException() throws Exception {
		initializeDataSourceMockThrowSQLException();
		idGenerator = (TableIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize1");

		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (BaseException e) {
			assertEquals("[IDGeneration Service] Although too many retries, unable to allocate a block of Ids.", e.getMessage());
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
		dsControl = MockControl.createControl(DataSource.class);
		dsMock = (DataSource) dsControl.getMock();

		// 2. set return value using mock object
		dsMock.getConnection();
		dsControl.setThrowable(new SQLException());

		// 3. replay MockControl
		dsControl.replay();
	}

	/**
	 * initialize ResultSet Mock Object
	 * 
	 * @throws Exception
	 *             fail to set Mock
	 */
	private void initializeResultSetMock(boolean autoCommit) throws Exception {
		// 1. set mock object (dataSource)
		dsControl = MockControl.createControl(DataSource.class);
		dsMock = (DataSource) dsControl.getMock();

		// 2. set mock object (connection)
		MockControl connControl = MockControl.createControl(Connection.class);
		Connection connMock = (Connection) connControl.getMock();

		// 3. set mock object (PreparedStatement)
		MockControl stmtControl = MockControl
				.createControl(PreparedStatement.class);
		PreparedStatement stmtMock = (PreparedStatement) stmtControl.getMock();

		// 4. set mock object (ResultSet)
		MockControl rsControl = MockControl.createControl(ResultSet.class);
		ResultSet rsltMock = (ResultSet) rsControl.getMock();

		// 5. set return value using mock object
		dsMock.getConnection();
		dsControl.setReturnValue(connMock);
		
		connMock.createStatement();
		connControl.setReturnValue(stmtMock);

		connMock.close();
		connControl.setVoidCallable();

		connMock.getAutoCommit();
		connControl.setReturnValue(autoCommit);

		connMock.rollback();
		connControl.setDefaultVoidCallable();

		stmtMock
				.executeQuery("SELECT next_id FROM idstest WHERE table_name = 'test'");
		stmtControl.setDefaultReturnValue(rsltMock);

		stmtMock.executeUpdate("UPDATE idstest SET next_id = '2' "
				+ " WHERE table_name = 'test' " + "   AND next_id = '1'");
		stmtControl.setDefaultReturnValue(0);

		stmtMock.close();
		stmtControl.setVoidCallable();

		rsltMock.next();
		rsControl.setDefaultReturnValue(true);

		rsltMock.getLong(1);
		rsControl.setDefaultReturnValue(1);
		
		rsltMock.close();
		rsControl.setDefaultVoidCallable();

		// 6. replay MockControl
		dsControl.replay();
		connControl.replay();
		stmtControl.replay();
		rsControl.replay();
	}
}
