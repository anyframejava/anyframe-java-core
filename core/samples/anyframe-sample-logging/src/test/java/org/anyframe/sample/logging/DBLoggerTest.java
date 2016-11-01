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
package org.anyframe.sample.logging;

import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Enumeration;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Appender;
import org.apache.log4j.Logger;
import org.apache.log4j.jdbc.JDBCAppender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;
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
public class DBLoggerTest{

	private DataSource dataSource;

	/**
	 * [Flow #-1] Positive Case : try to log using DBLogger
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testDBLogging() throws Exception {
		// 1. initialize DB
		initializeDB();

		// 2. find all appenders of DBLogger
		Enumeration appenders = Logger.getLogger(this.getClass())
				.getAllAppenders();

		if (appenders.hasMoreElements()) {
			Appender appender = (Appender) appenders.nextElement();

			// 3. check DBLogger configurations
			if ("org.apache.log4j.jdbc.JDBCAppender".equals(appender.getClass()
					.getName())) {
				JDBCAppender jdbcAppender = (JDBCAppender) appender;
				String url = jdbcAppender.getURL();
				String user = jdbcAppender.getUser();
				String password = jdbcAppender.getPassword();
				String sql = jdbcAppender.getSql();
				assertEquals("jdbc:oracle:thin:@server.ip:1521:xe", url);
				assertEquals("athena", user);
				assertEquals("athena", password);
				assertEquals(
						"insert into STMR_LOG (msg) values ('%d %p [%c] - <%m>%n')",
						sql);
			}
		}

		// 4. try to log
		Log logger = LogFactory.getLog(this.getClass());
		assertTrue(logger.isErrorEnabled());
		logger.error("log - testDBLoggingConf");

		// 5. check log files
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
	private void initializeDB() throws Exception {
		String[] confFiles = new String[] { "file:./src/test/resources/spring/context-*.xml" };
		ConfigurableApplicationContext context = new FileSystemXmlApplicationContext(
				confFiles, false);
		context.refresh();

		dataSource = (DataSource) context.getBean("util_datasource");
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
