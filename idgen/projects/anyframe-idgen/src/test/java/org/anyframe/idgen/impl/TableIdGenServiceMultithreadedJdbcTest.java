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
import java.util.HashMap;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.idgen.IdGenService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what TableIDGeneration Service supports under the
 * MultiThreaded environment, there are some test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class TableIdGenServiceMultithreadedJdbcTest {
	private static final String TABLE_KEY = "test";

	private static final int ID_COUNT = 1000;

	private static final int THREAD_COUNT = 50;

	private Object mSemaphore = new Object();

	private IdGenService mIdGenerator;

	private int mPerThreadGets;

	private HashMap<Long, Long> mIds;

	private Throwable mThrowable;

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

				// 1. Try to drop the table. It may not exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP TABLE idstest");
				} catch (SQLException e) {
					// The table was probably just not there. Ignore this.
				}

				// 2. Create the table that we will use in this test.
				// Different depending on the db. Please add new statements as
				// new databases are
				// tested.
				statement.executeUpdate("CREATE TABLE idstest ( "
						+ "table_name varchar(16) NOT NULL, "
						+ "next_id DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (table_name))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * destroy TestCase
	 * 
	 * @throws Exception
	 *             fail to destroy
	 */
	@After
	public void onTearDown() throws Exception {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Delete the table that we will use in this test.
				statement.executeUpdate("DROP TABLE idstest");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to cleanup database after test." + e);
			// Want to continue
		}
	}

	/**
	 * [Flow #-1] Negative Case : try to get next Long id from id generator with
	 * block size = 1
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	// public void testSimpleRequestIdsSize1() throws Exception {
	// IdGenService idGenerator = (IdGenService) applicationContext
	// .getBean("Ids-TestSimpleRequestIdsSize1");
	// long firstId = 1;
	// int idCount = ID_COUNT;
	// int threadCount = THREAD_COUNT;
	//
	// // 1. Initialize the counter in the database.
	// initializeNextLongId(TABLE_KEY, firstId);
	//
	// // 2. get next id under multi threaded environment
	// generalTestCase(idGenerator, firstId, idCount, threadCount);
	// }

	/**
	 * [Flow #-2] Positive, Negative Case : try to get next Long id from id
	 * generator with block size = 10
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleRequestIdsSize10() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize10");
		long firstId = 1;
		int idCount = ID_COUNT;
		int threadCount = THREAD_COUNT;

		// 1. Initialize the counter in the database.
		initializeNextLongId(TABLE_KEY, firstId);

		// 2. get next id under multi threaded environment
		generalTestCase(idGenerator, firstId, idCount, threadCount);
	}

	/**
	 * [Flow #-3] Positive, Negative Case : try to get next Long id from id
	 * generator with block size = 100
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleRequestIdsSize100() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize100");
		long firstId = 1;
		int idCount = ID_COUNT;
		int threadCount = THREAD_COUNT;

		// 1. Initialize the counter in the database.
		initializeNextLongId(TABLE_KEY, firstId);

		// 2. get next id under multi threaded environment
		generalTestCase(idGenerator, firstId, idCount, threadCount);
	}

	/**
	 * [Flow #-4] Positive, Negative Case : try to get next BigDecimal id from
	 * id generator with block size = 10
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testBigDecimalRequestIdsSize10() throws Exception {
		if (isBigDecimalImplemented()) {
			IdGenService idGenerator = (IdGenService) applicationContext
					.getBean("Ids-TestBigDecimalRequestIdsSize10");
			long firstId = 1;
			int idCount = ID_COUNT;
			int threadCount = THREAD_COUNT;

			// 1. Initialize the counter in the database.
			initializeNextLongId(TABLE_KEY, firstId);

			// 2. get next id under multi threaded environment
			generalTestCase(idGenerator, firstId, idCount, threadCount);
		} else {
			fail("Test failed because BigDecimals are not implemented in current driver.");
		}
	}

	/*---------------------------------------------------------------
	 * Utilitity Methods
	 *-------------------------------------------------------------*/
	/**
	 * General multithreaded test of an IdGenerator
	 * 
	 * @param idGenerator
	 *            the Id Generator to test.
	 * @param firstId
	 *            the first Id that is expected to be returned by the Id
	 *            Generator.
	 * @param idCount
	 *            the number of ids to request in the test.
	 * @param threadCount
	 *            the number of threads to use to test the Id Generator.
	 * @throws Exception
	 *             fail to test
	 */
	private void generalTestCase(final IdGenService idGenerator,
			final long firstId, final int idCount, final int threadCount)
			throws Exception {
		if (idCount % threadCount != 0) {
			fail("idCount must be evenly divisible by threadCount");
		}

		mIdGenerator = idGenerator;
		mPerThreadGets = idCount / threadCount;
		mIds = new HashMap<Long, Long>();

		// 1. Create the runnable which will be used by the test.
		Runnable runnable = new Runnable() {
			public void run() {
				boolean duplicatesFound = false;

				for (int i = 0; i < mPerThreadGets; i++) {
					try {
						long id = mIdGenerator.getNextLongId();

						synchronized (mSemaphore) {
							Long lId = new Long(id);

							// Make sure this id has not already been seen
							if (mIds.get(lId) != null) {
								System.err.println("Obtained a duplicate id: "
										+ id);
								duplicatesFound = true;
							} else {
								// Store a reference to this id
								mIds.put(lId, lId);
							}
						}
					} catch (Throwable t) {
						synchronized (mSemaphore) {
							if (mThrowable == null) {
								mThrowable = t;
							}
						}
						return;
					}
				}

				if (duplicatesFound) {
					fail("IdGenerator returned duplicate ids.");
				}
			}
		};

		LatchedThreadGroup group = new LatchedThreadGroup(runnable, threadCount);

		// 2. Run the test.
		long duration;
		try {
			duration = group.go();
		} catch (Throwable t) {
			// Throwable could have been thrown by one of the tests.
			if (mThrowable == null) {
				mThrowable = t;
			}
			duration = 0;
		}

		if (mThrowable != null) {
			throw new Exception("Exception in test thread." + mThrowable);
		}

		// 3. Make sure that all of the expected ids were obtained
		for (int i = 0; i < idCount; i++) {
			Long id = new Long(firstId + i);
			assertTrue("The IdGenerator did not return an expected id (" + id
					+ ")", mIds.get(id) != null);
		}

		System.out.println("It took " + duration + "ms. for " + threadCount
				+ " threads to allocate " + idCount + " ids.");

		assertEquals(
				"The next_id column in the database did not have the expected value.",
				firstId + idCount, peekNextLongId(TABLE_KEY));
	}

	/**
	 * Tests to see whether or not the current DataSource supports BigDecimal
	 * 
	 * @return boolean implemented type
	 */
	private boolean isBigDecimalImplemented() {
		String tableName = "foorbar_table";

		// Add a row that can be selected.
		initializeNextLongId(tableName, 1);
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				ResultSet rs = statement
						.executeQuery("SELECT next_id FROM idstest "
								+ "WHERE table_name = '" + tableName + "'");
				if (rs.next()) {
					rs.getBigDecimal(1);
				} else {
					fail(tableName + " row not in ids table.");
					return false; // for compiler
				}
			} finally {
				conn.close();
			}

			// Implemented
			return true;
		} catch (Exception e) {
			if (e.toString().toLowerCase().indexOf("implemented") > 0) {
				// Not implemented
				return false;
			}
			System.err.println("Unable to test for BigDecimal support." + e);
			fail("Unable to test for BigDecimal support. " + e);
			return false; // for compiler
		}
	}

	/**
	 * initialze min value of sequence
	 * 
	 * @param tableName
	 *            table name
	 * @param nextId
	 *            next id
	 */
	private void initializeNextLongId(String tableName, long nextId) {
		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				statement
						.executeUpdate("INSERT INTO idstest (table_name, next_id) VALUES ('"
								+ tableName + "', " + nextId + ")");
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
	 * @param tableName
	 *            table name
	 * @return next Long Id
	 */
	private long peekNextLongId(String tableName) {

		DataSource dataSource = (DataSource) applicationContext
				.getBean("util_datasource");
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				ResultSet rs = statement
						.executeQuery("SELECT next_id FROM idstest "
								+ "WHERE table_name = '" + tableName + "'");
				if (rs.next()) {
					return rs.getLong(1);
				} else {
					fail(tableName + " row not in ids table.");
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
