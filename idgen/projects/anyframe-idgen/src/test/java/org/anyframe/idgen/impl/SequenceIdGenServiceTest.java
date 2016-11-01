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

import org.anyframe.exception.BaseException;
import org.easymock.MockControl;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;

/**
 * For testing functions what SequenceIDGeneration Service supports, there are
 * some test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class SequenceIdGenServiceTest extends
		AbstractDependencyInjectionSpringContextTests {
	SequenceIdGenServiceImpl idGenerator = null;

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
	 * [Flow #-1] Negative Case : getNextBigDecimalId - In case, result of
	 * executing query doesn't exist.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testGetNextBigDecimalIdInner() throws Exception {
		initializeResultSetMock();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxBigDecimalIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextBigDecimalId();
		} catch (BaseException e) {
			assertEquals( "[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.", e
					.getMessage());
		}
	}

	/**
	 * [Flow #-2] Negative Case : getNextLongId - In case, result of executing
	 * query doesn't exist.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testGetNextLongIdInner() throws Exception {
		initializeResultSetMock();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxByteIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (BaseException e) {
			assertEquals( "[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.", e
					.getMessage());
		}
	}

	/**
	 * [Flow #-3] Negative Case : getNextBigDecimalId - In case, when connect to
	 * DataSource, error is occurred.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testGetNextBigDecimalIdInnerWithSQLException() throws Exception {
		initializeDataSourceMockThrowSQLException();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxBigDecimalIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextBigDecimalId();
		} catch (BaseException e) {
			assertEquals("[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.", e.getMessage());
		}
	}

	/**
	 * [Flow #-4] Negative Case : getNextLongId - In case, when connect to
	 * DataSource, error is occurred.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	public void testGetNextLongIdInnerWithSQLException() throws Exception {
		initializeDataSourceMockThrowSQLException();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxByteIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (BaseException e) {
			assertEquals("[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.", e.getMessage());
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
	private void initializeResultSetMock() throws Exception {
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

		connMock.prepareStatement("SELECT idstest.NEXTVAL FROM DUAL");
		connControl.setReturnValue(stmtMock);

		connMock.close();
		connControl.setVoidCallable();

		stmtMock.executeQuery();
		stmtControl.setReturnValue(rsltMock);

		rsltMock.next();
		rsControl.setReturnValue(false);

		// 6. replay MockControl
		dsControl.replay();
		connControl.replay();
		stmtControl.replay();
		rsControl.replay();
	}
}
