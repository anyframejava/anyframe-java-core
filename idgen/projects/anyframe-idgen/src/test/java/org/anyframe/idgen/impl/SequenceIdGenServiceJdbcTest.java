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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.exception.IdCreationException;
import org.anyframe.idgen.IdGenService;
import org.junit.After;
import org.junit.Before;
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
public class SequenceIdGenServiceJdbcTest {

	@Inject
	private ApplicationContext applicationContext;

	/**
	 * initialize TestCase
	 * 
	 * @throws Exception
	 *             fail to initialize
	 */
	@Before
	public void onSetUp() throws Exception {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Try to drop the table. It may not
				// exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP SEQUENCE idstest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// e.printStackTrace();
				}

				// 2. Create the table that we will use
				// in this test.
				// Different depending on the db.
				// Please add new statements as
				// new databases are
				// tested.
				statement.executeUpdate("CREATE SEQUENCE idstest MINVALUE 0");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * destroy TestCase
	 * 
	 * @throws Exception
	 *             fail to destroy TestCase
	 */
	@After
	public void onTearDown() throws Exception {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Delete the table that we will use
				// in this test.
				statement.executeUpdate("DROP SEQUENCE idstest");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.out.println("Unable to cleanup database after test." + e);
			// Want to continue
		}
	}

	/**
	 * [Flow #-1] Negative Case : try to get next integer id with non existing
	 * sequence name.
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testNonExistingSequenceName() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSequenceNonExistingSequenceName");
		try {
			// 1. get next integer id
			idGenerator.getNextIntegerId();
			fail("Should not have gotten an id");
		} catch (Exception e) {
			assertTrue(e instanceof IdCreationException);
		}
	}

	/**
	 * [Flow #-2] Negative Case : try to get next Long id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleRequestIdsSize1() throws Exception {
		System.out.println("testSequenceSimpleRequestIdsSize1");
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSequenceSimpleRequestIdsSize1");
		int testCount = 100;

		// 1. Initialize the counter in the database.
		initializeNextLongId("idstest", 1);

		// 2. get next integer id until 99
		for (int i = 1; i <= testCount; i++) {
			int id = idGenerator.getNextIntegerId();
			assertEquals("The returned id was not what was expected.", i, id);
		}

		// 3. get next Long id using query directly.
		assertEquals(
				"The next_id column in the database did not have the expected value.",
				testCount + 1, peekNextLongId("idstest"));
	}

	/*---------------------------------------------------------------
	 * Utilitity Methods
	 *-------------------------------------------------------------*/
	/**
	 * initialze min value of sequence
	 * 
	 * @param sequenceName
	 *            sequence name
	 * @param nextId
	 *            next id
	 */
	private void initializeNextLongId(String sequenceName, long nextId) {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				try {
					statement.executeUpdate("DROP SEQUENCE " + sequenceName);
				} catch (SQLException se) {
				}

				statement.executeUpdate("CREATE SEQUENCE " + sequenceName
						+ " MINVALUE " + nextId);

			} finally {
				conn.close();
			}
		} catch (Exception e) {
			System.err.println("Unable to initialize next_id." + e);
			fail("Unable to initialize next_id. " + e);
		}
	}

	/**
	 * get next Long id using query directly.
	 * 
	 * @param sequenceName
	 *            sequence name
	 * @return next Long Id
	 */
	private long peekNextLongId(String sequenceName) {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				ResultSet rs = statement.executeQuery("SELECT " + sequenceName
						+ ".CURRVAL FROM DUAL");

				if (rs.next()) {
					return rs.getLong(1) + 1;
				} else {
					fail(sequenceName + " sequence doesn't exist.");
					return -1; // for compiler
				}
			} finally {
				conn.close();
			}
		} catch (Exception e) {
			System.err.println("Unable to peek next_id." + e);
			fail("Unable to peek next_id. " + e);
			return -1; // for compiler
		}
	}
}
