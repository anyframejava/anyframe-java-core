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
package org.anyframe.sample.logging;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Enumeration;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.apache.log4j.Appender;
import org.apache.log4j.jdbc.JDBCAppender;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For target what Logging Service supports, there are some test scenarios in
 * this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-*.xml" })
public class DBLoggerTest {

	@Inject
	private DataSource dataSource;

	/**
	 * [Flow #-1] Positive Case : try to log using DBLogger
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void testDBLogging() throws Exception {
		// 1. find all appenders of DBLogger
		Enumeration<Appender> appenders = org.apache.log4j.Logger.getLogger(
				this.getClass()).getAllAppenders();

		if (appenders.hasMoreElements()) {
			Appender appender = (Appender) appenders.nextElement();

			// 2. check DBLogger configurations
			if ("org.apache.log4j.jdbc.JDBCAppender".equals(appender.getClass()
					.getName())) {
				JDBCAppender jdbcAppender = (JDBCAppender) appender;
				String url = jdbcAppender.getURL();
				String user = jdbcAppender.getUser();
				String sql = jdbcAppender.getSql();
				assertEquals("jdbc:hsqldb:hsql://localhost/sampledb", url);
				assertEquals("sa", user);
				assertEquals(
						"insert into STMR_LOG (msg) values ('%d %p [%c] - <%m>%n')",
						sql);
			}
		}

		// 3. try to log
		Logger logger = LoggerFactory.getLogger(this.getClass());
		assertTrue(logger.isErrorEnabled());
		logger.error("log - testDBLoggingConf");

		// 4. check log files
		checkLog();
	}

	/**
	 * check log results
	 * 
	 * @throws Exception
	 *             fail to check
	 */
	private void checkLog() throws Exception {
		Connection conn = null;
		Statement statement = null;
		ResultSet rs = null;

		try {
			conn = dataSource.getConnection();
			statement = conn.createStatement();

			rs = statement.executeQuery("SELECT * FROM STMR_LOG");
			assertTrue(rs.next());
		} catch (SQLException e) {
			// The table was probably just not there. Ignore this.
		} finally {
			rs.close();
			statement.close();
			conn.close();
		}
	}

	/**
	 * initialize log table
	 * 
	 * @throws Exception
	 *             fail to initialize
	 */
	@Before
	public void initializeDB() throws Exception {
		try {
			Connection conn = dataSource.getConnection();
			try {
				Statement statement = conn.createStatement();

				// 1. Try to drop the table. It may not exist and throw an
				// exception.
				try {
					statement.executeUpdate("DROP TABLE STMR_LOG");
				} catch (SQLException e) {
					// The table was probably just not there. Ignore this.
				}

				// 2. Create the table that we will use in this test.
				// Different depending on the db. Please add new statements as
				// new databases are
				// tested.
				statement
						.executeUpdate("CREATE TABLE STMR_LOG ( "
								+ "msg varchar(1000) NOT NULL, "
								+ "PRIMARY KEY (msg))");
			} finally {
				conn.close();
			}
		} catch (SQLException e) {
			System.err.println("Unable to initialize database for test." + e);
			fail("Unable to initialize database for test. " + e);
		}
	}
}
