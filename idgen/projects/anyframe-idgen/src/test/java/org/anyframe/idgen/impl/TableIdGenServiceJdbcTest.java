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

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.exception.IdCreationException;
import org.anyframe.idgen.IdGenService;
import org.anyframe.util.DateUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what TableIDGeneration Service supports, there are some
 * test scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 * @author SungHoon Son
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath*:/spring/context-*.xml" })
public class TableIdGenServiceJdbcTest {

	@Inject
	private ApplicationContext applicationContext;

	@After
	public void onTearDown() throws Exception {
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
					statement.executeUpdate("DROP TABLE idstest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("idstest drop fail.");
					e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP TABLE ids");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("ids drop fail.");
					e.printStackTrace();
				}
				
				try {
					statement.executeUpdate("DROP TABLE MY_IDS");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					System.out.println("my_ids drop fail.");
					e.printStackTrace();
				}
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

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
					statement.executeUpdate("DROP TABLE idstest");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("idstest drop
					// fail.");
					// e.printStackTrace();
				}

				try {
					statement.executeUpdate("DROP TABLE ids");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("ids drop
					// fail.");
					// e.printStackTrace();
				}
				
				try {
					statement.executeUpdate("DROP TABLE MY_IDS");
				} catch (SQLException e) {
					// The table was probably just not
					// there. Ignore this.
					// System.out.println("ids drop
					// fail.");
					// e.printStackTrace();
				}
				
				

				// 2. Create the table that we will use
				// in this test.
				// Different depending on the db.
				// Please add new statements as
				// new databases are
				// tested.
				statement.executeUpdate("CREATE TABLE idstest ( "
						+ "table_name varchar(16) NOT NULL, "
						+ "next_id DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (table_name))");
				statement.executeUpdate("CREATE TABLE ids ( "
						+ "table_name varchar(16) NOT NULL, "
						+ "next_id DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (table_name))");
				
				statement.executeUpdate("CREATE TABLE MY_IDS( "
						+ "MY_KEY varchar(16) NOT NULL, "
						+ "MY_ID DECIMAL(30) NOT NULL, "
						+ "PRIMARY KEY (MY_KEY))");
				
				statement.executeUpdate("INSERT INTO ids VALUES('id','0')");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}

	/**
	 * [Flow #-2] Negative Case : try to get next Long id from id generator with
	 * block size = 1
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleRequestIdsSize1() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize1");
		int testCount = 100;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", 1);

		// 2. get next integer id until 99
		for (int i = 1; i <= testCount; i++) {
			int id = idGenerator.getNextIntegerId();
			assertEquals("The returned id was not what was expected.", i, id);
		}

		// 3. get next Long id using query directly.
		assertEquals(
				"The next_id column in the database did not have the expected value.",
				testCount + 1, peekNextLongId("test"));
	}

	/**
	 * [Flow #-3] Positive, Negative Case : try to get next Long id from id
	 * generator with block size = 10 *
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleRequestIdsSize10() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize10");
		int testCount = 100;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", 1);

		// 2. get next integer id until 99
		for (int i = 1; i <= testCount; i++) {
			int id = idGenerator.getNextIntegerId();
			assertEquals("The returned id was not what was expected.", i, id);
		}

		// 3. get next Long id using query directly.
		assertEquals(
				"The next_id column in the database did not have the expected value.",
				testCount + 1, peekNextLongId("test"));
	}

	/**
	 * [Flow #-4] Positive, Negative Case : try to get next Long id from id
	 * generator with block size = 100
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testSimpleRequestIdsSize100() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize100");
		int testCount = 100;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", 1);

		// 2. get next integer id until 99
		for (int i = 1; i <= testCount; i++) {
			int id = idGenerator.getNextIntegerId();
			assertEquals("The returned id was not what was expected.", i, id);
		}
		// 3. get next Long id using query directly.
		assertEquals(
				"The next_id column in the database did not have the expected value.",
				testCount + 1, peekNextLongId("test"));
	}

	/**
	 * [Flow #-5] Positive, Negative Case : try to get next BigDecimal id from
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
			try {
				int testCount = 100;
				BigDecimal initial = new BigDecimal(new String(Long.MAX_VALUE
						+ "00"));

				// 1. Initialize the counter in the
				// database.
				initializeNextBigDecimalId("test", initial);

				// 2. get next bigdecimal id
				for (int i = 0; i < testCount; i++) {
					BigDecimal id = idGenerator.getNextBigDecimalId();
					assertEquals("The returned id was not what was expected.",
							initial.add(new BigDecimal(new Integer(i)
									.doubleValue())), id);
				}

				// 3. get next integer id using query
				// directly.
				assertEquals(
						"The next_id column in the database did not have the expected value.",
						initial.add(new BigDecimal(new Integer(testCount)
								.doubleValue())), peekNextBigDecimalId("test"));
			} finally {
			}
		} else
			fail("Test failed because BigDecimals are not implemented in current driver.");
	}

	/**
	 * [Flow #-6] Positive, Negative Case : try to get next byte id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testMaxByteIds() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestMaxByteIds");
		int testCount = 100;
		// max = 127
		long max = Byte.MAX_VALUE;
		long initial = max - testCount;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", initial);

		// 2. get next byte id until limitation of Byte
		for (int i = 0; i <= testCount; i++) {
			byte id = idGenerator.getNextByteId();
			assertEquals("The returned id was not what was expected.", i
					+ initial, id);
		}

		// 3. in case it reached a max value data type
		// allows, get next byte
		// id.
		try {
			byte id = idGenerator.getNextByteId();
			fail("Should not have gotten an id: " + id);
		} catch (Exception e) {
			assertTrue(e instanceof IdCreationException);
		}
	}

	/**
	 * [Flow #-7] Positive, Negative Case : try to get next short id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testMaxShortIds() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestMaxShortIds");
		int testCount = 100;
		// max is 32767
		long max = Short.MAX_VALUE;
		long initial = max - testCount;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", initial);

		// 2. get next short id until limitation of
		// Short
		for (int i = 0; i <= testCount; i++) {
			short id = idGenerator.getNextShortId();
			assertEquals("The returned id was not what was expected.", i
					+ initial, id);
		}

		// 3. in case it reached a max value data type
		// allows, get next
		// short
		// id.
		try {
			short id = idGenerator.getNextShortId();
			fail("Should not have gotten an id: " + id);
		} catch (Exception e) {
			assertTrue(e instanceof IdCreationException);
		}
	}

	/**
	 * [Flow #-8] Positive, Negative Case : try to get next integer id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testMaxIntegerIds() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestMaxIntegerIds");
		int testCount = 100;
		// max is 0x7fffffff
		long max = Integer.MAX_VALUE;
		long initial = max - testCount;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", initial);

		// 2. get next integer id until limitation of
		// Integer
		for (int i = 0; i <= testCount; i++) {
			int id = idGenerator.getNextIntegerId();
			assertEquals("The returned id was not what was expected.", i
					+ initial, id);
		}

		// 3. in case it reached a max value data type
		// allows, get next
		// integer id.
		try {
			int id = idGenerator.getNextIntegerId();
			fail("Should not have gotten an id: " + id);
		} catch (Exception e) {
			assertTrue(e instanceof IdCreationException);
		}
	}

	/**
	 * [Flow #-9] Positive, Negative Case : try to get next long id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testMaxLongIds() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestMaxLongIds");
		int testCount = 100;
		// max is 0x7fffffffffffffffL
		long max = Long.MAX_VALUE;
		long initial = max - testCount;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", initial);

		// 2. get next long id until limitation of Long
		for (int i = 0; i <= testCount; i++) {
			long id = idGenerator.getNextLongId();
			assertEquals("The returned id was not what was expected.", i
					+ initial, id);
		}

		// 3. in case it reached a max value data type
		// allows, get next
		// long id.
		try {
			long id = idGenerator.getNextLongId();
			fail("Should not have gotten an id: " + id);
		} catch (Exception e) {
			assertTrue(e instanceof IdCreationException);
		}
	}

	/**
	 * [Flow #-10] Positive, Negative Case : try to get next bigdecimal id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetBigDecimalfromNonBigDecimal() throws Exception {
		if (isBigDecimalImplemented()) {
			IdGenService idGenerator = (IdGenService) applicationContext
					.getBean("Ids-TestSimpleRequestIdsSize100");
			int testCount = 100;
			BigDecimal initial = new BigDecimal("0");

			// 1. Initialize the counter in the
			// database.
			initializeNextBigDecimalId("test", initial);

			// 2. get next bigdecimal id
			for (int i = 0; i < testCount; i++) {
				BigDecimal id = idGenerator.getNextBigDecimalId();
				assertEquals("The returned id was not what was expected.",
						initial
								.add(new BigDecimal(new Integer(i)
										.doubleValue())), id);
			}

			// 3. get next integer id using query
			// directly.
			assertEquals(
					"The next_id column in the database did not have the expected value.",
					initial.add(new BigDecimal(new Integer(testCount)
							.doubleValue())), peekNextBigDecimalId("test"));
		} else
			fail("Test failed because BigDecimals are not implemented in current driver.");

	}

	/**
	 * [Flow #-11] Positive, Negative Case : try to get next String id
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetStringIdFromLongId() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestSimpleRequestIdsSize10");
		int testCount = 100;

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", 1);

		// 2. get next String id
		for (int i = 1; i <= testCount; i++) {
			String id = idGenerator.getNextStringId();
			assertEquals("The returned id was not what was expected.",
					new Integer(i).toString(), id);
		}

		// 3. get next id using query directly.
		assertEquals(
				"The next_id column in the database did not have the expected value.",
				testCount + 1, peekNextLongId("test"));
	}

	/**
	 * [Flow #-12] Positive Case : don't define table information (table &
	 * key-table)
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testNotDefinedTableInfo() throws Exception {
		IdGenService idGenerator = (IdGenService) applicationContext
				.getBean("Ids-TestNotDefinedTableInfo");

		// 1. Initialize the counter in the database.
		initializeNextLongId("ids", 1);
		// 2. get next String id
		String id = idGenerator.getNextStringId();
		assertEquals("The returned id was not what was expected.", new Integer(
				0).toString(), id);
	}

	/**
	 * [Flow #-13] Positive Case : when generate id, apply generation strategy
	 * (MixPrefix).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testIdGenStrategy() throws Exception {
		IdGenService idGenerator1 = (IdGenService) applicationContext
				.getBean("Ids-TestWithGenerationStrategy");

		// 1. Initialize the counter in the database.
		initializeNextLongId("test", 1);

		// 2. generate id with stragety (prefix :
		// 'TEST-', cipers : 5, fillChar :
		// '*')
		for (int i = 0; i < 5; i++)
			assertEquals("TEST-****" + (i + 1), idGenerator1.getNextStringId());

		IdGenService idGenerator2 = (IdGenService) applicationContext
				.getBean("Ids-TestNotDefinedTableInfo");

		// 3. Initialize the counter in the database.
		initializeNextLongId("ids", 1);
		// 4. get next String id
		String id = idGenerator2.getNextStringId();
		assertEquals(new Integer(0).toString(), id);
	}

	/**
	 * [Flow #-13] Positive Case : when generate id, apply generation strategy
	 * (TimestampStrategy).
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetStringIdWithKeyTable() throws Exception {
		IdGenService idGenerator1 = (IdGenService) applicationContext
				.getBean("Ids-TestWithoutTableKey");

		// 1. Initialize the counter in the database.
		initializeNextLongId("MOVIE", 1);
		initializeNextLongId("GENRE", 1);

		// 2. generate id with stragety (pattern :
		// 'yyyyMMdd', separator : '', cipers : 5, fillChar :
		// '0')
		String currentTime = DateUtil.getCurrentDateTime("yyyyMMdd");
		

		for (int i = 0; i < 5; i++) {
			assertEquals(currentTime + "0000" + (i + 1), idGenerator1
					.getNextStringId("MOVIE"));
		}

		for (int i = 0; i < 5; i++) {
			assertEquals(currentTime + "0000" + (i + 1), idGenerator1
					.getNextStringId("GENRE"));
		}

		IdGenService idGenerator2 = (IdGenService) applicationContext
				.getBean("Ids-TestWithPatternedTimestampStrategy");

		currentTime = DateUtil.getCurrentDateTime("yyyy-MM-dd HH");
		// 3. generate id with stragety (pattern :
		// 'yyyyMMddHHmmssSSS', separator : '-', cipers : 5, fillChar :
		// '*')
		for (int i = 5; i < 9; i++) {
			assertEquals(currentTime + "-****" + (i + 1), idGenerator2
					.getNextStringId("MOVIE"));
		}

		for (int i = 5; i < 9; i++) {
			assertEquals(currentTime + "-****" + (i + 1), idGenerator2
					.getNextStringId("GENRE"));
		}
	}

	/**
	 * [Flow #-14] Positive Case : when generate id, apply generation strategy
	 * (TimestampStrategy). And id management table doesn't have initial counter
	 * for 'MOVIE_NEW'
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testGetStringIdWithoutInitCounter() throws Exception {
		IdGenService idGenerator1 = (IdGenService) applicationContext
				.getBean("Ids-TestWithoutTableKey");

		// 1. generate id with stragety (pattern :
		// 'yyyyMMdd', separator : '', cipers : 5, fillChar :
		// '0')
		String currentTime = DateUtil.getCurrentDateTime("yyyyMMdd");

		for (int i = 0; i < 5; i++) {
			assertEquals(currentTime + "0000" + (i + 1), idGenerator1
					.getNextStringId("MOVIE_NEW"));
		}
	}
	
	/**
	 * [Flow #-15] Positive Case : try to get integer id from customized table(custom nextId, custom keyColumn) 
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testCustomColumn() throws Exception{
		IdGenService idGenService = (IdGenService) applicationContext.getBean("Ids-TestCustomColumn");
		
		int testCount = 100;

		// 1. get next integer id until 99
		for (int i = 1; i <= testCount; i++) {
			int id = idGenService.getNextIntegerId();
			assertEquals("The returned id was not what was expected.", i, id);
		}		
	}
	
	/**
	 * [Flow #-16] Negative Case : try to get integer id from non existing custom column
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testNonExistingCustomColumn() throws Exception{
		TableIdGenServiceImpl idGenService = (TableIdGenServiceImpl) applicationContext.getBean("Ids-TestNonExistingCustomColumn");
		
		try{
			idGenService.getNextIntegerId();
			fail("Should not have gotten an id");
		}catch(Exception e){
			assertTrue(e instanceof IdCreationException);	
		}	
	}

	/*---------------------------------------------------------------
	 * Utilitity Methods
	 *-------------------------------------------------------------*/
	/**
	 * Tests to see whether or not the current DataSource supports BigDecimal
	 * ≈∂
	 * @return boolean check bigcimal implemented
	 */
	private boolean isBigDecimalImplemented() {
		String tableName = "foorbar_table";

		// Add a row that can be selected.
		initializeNextLongId(tableName, 1);

		try {
			DataSource dataSource = (DataSource) applicationContext
					.getBean("util_datasource");
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
	 * initialze next BigDecimal Id
	 * 
	 * @param tableName
	 *            table name
	 * @param nextId
	 *            next id
	 */
	private void initializeNextBigDecimalId(String tableName, BigDecimal nextId) {
		try {
			DataSource dataSource = (DataSource) applicationContext
					.getBean("util_datasource");
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// Need to quote the BigDecimal as it
				// is larger than normal
				// numbers can be.
				// Was causing problems with MySQL
				statement
						.executeUpdate("INSERT INTO idstest (table_name, next_id) VALUES ('"
								+ tableName + "', '" + nextId.toString() + "')");
			} finally {
				conn.close();
			}
		} catch (Exception e) {
			System.err.println("Unable to initialize next_id." + e);
			fail("Unable to initialize next_id. " + e);
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
		try {
			DataSource dataSource = (DataSource) applicationContext
					.getBean("util_datasource");
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
	 * get next BigDecimal id using query directly.
	 * 
	 * @param tableName
	 *            table name
	 * @return next BigDecimal Id
	 */
	private BigDecimal peekNextBigDecimalId(String tableName) {
		try {
			DataSource dataSource = (DataSource) applicationContext
					.getBean("util_datasource");
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				ResultSet rs = statement
						.executeQuery("SELECT next_id FROM idstest "
								+ "WHERE table_name = '" + tableName + "'");
				if (rs.next()) {
					return rs.getBigDecimal(1);
				} else {
					fail(tableName + " row not in ids table.");
					return null; // for compiler
				}
			} finally {
				conn.close();
			}
		} catch (Exception e) {
			System.err.println("Unable to peek next_id." + e);
			fail("Unable to peek next_id. " + e);
			return null; // for compiler
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
		try {
			DataSource dataSource = (DataSource) applicationContext
					.getBean("util_datasource");
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
