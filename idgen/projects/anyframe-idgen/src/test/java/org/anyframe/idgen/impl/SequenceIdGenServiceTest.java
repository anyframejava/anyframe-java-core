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

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.easymock.EasyMock;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what SequenceIDGeneration Service supports, there are
 * some test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class SequenceIdGenServiceTest {

	@Inject
	private ApplicationContext applicationContext;

	SequenceIdGenServiceImpl idGenerator = null;

	DataSource dsMock = null;

	/**
	 * [Flow #-1] Negative Case : getNextBigDecimalId - In case, result of
	 * executing query doesn't exist.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetNextBigDecimalIdInner() throws Exception {
		initializeResultSetMock();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxBigDecimalIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextBigDecimalId();
		} catch (Exception e) {
			assertEquals(
					"[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.",
					e.getMessage());
		}
	}

	/**
	 * [Flow #-2] Negative Case : getNextLongId - In case, result of executing
	 * query doesn't exist.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetNextLongIdInner() throws Exception {
		initializeResultSetMock();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxByteIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (Exception e) {
			assertEquals(
					"[IDGeneration Service] Unable to allocate a block of Ids. Query for Id did not return a value.",
					e.getMessage());
		}
	}

	/**
	 * [Flow #-3] Negative Case : getNextBigDecimalId - In case, when connect to
	 * DataSource, error is occurred.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetNextBigDecimalIdInnerWithSQLException() throws Exception {
		initializeDataSourceMockThrowSQLException();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxBigDecimalIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextBigDecimalId();
		} catch (Exception e) {
			assertEquals(
					"[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.",
					e.getMessage());
		}
	}

	/**
	 * [Flow #-4] Negative Case : getNextLongId - In case, when connect to
	 * DataSource, error is occurred.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetNextLongIdInnerWithSQLException() throws Exception {
		initializeDataSourceMockThrowSQLException();
		idGenerator = (SequenceIdGenServiceImpl) applicationContext
				.getBean("Ids-TestSequenceMaxByteIds");

		// 1. set DataSource Mock to SequenceIdGeneration Service
		idGenerator.setDataSource(dsMock);

		try {
			idGenerator.getNextLongId();
		} catch (Exception e) {
			assertEquals(
					"[IDGeneration Service] We can't get a connection. So, unable to allocate a block of Ids.",
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
	private void initializeDataSourceMockThrowSQLException() throws SQLException {
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
	private void initializeResultSetMock() throws SQLException {
		
		// 1. set mock object (dataSource)
		dsMock = createMock(DataSource.class);

		// 2. set mock object (connection)
		Connection connMock = createMock(Connection.class);

		// 3. set mock object (PreparedStatement)
		PreparedStatement stmtMock = createMock(PreparedStatement.class);

		// 4. set mock object (ResultSet)
		ResultSet rsltMock = EasyMock.createMock(ResultSet.class);

		// 5. set return value using mock object
		expect(dsMock.getConnection()).andReturn(connMock);
		
		expect(connMock.prepareStatement("SELECT idstest.NEXTVAL FROM DUAL")).andReturn(stmtMock);

		connMock.close();
		
		expect(stmtMock.executeQuery()).andReturn(rsltMock);
		
		expect(rsltMock.next()).andReturn(false);
		
		// 6. replay MockControl
		replay(dsMock);
		replay(connMock);
		replay(stmtMock);
		replay(rsltMock);
	}
}
