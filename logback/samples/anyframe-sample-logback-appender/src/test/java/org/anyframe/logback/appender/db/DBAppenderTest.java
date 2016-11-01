package org.anyframe.logback.appender.db;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.logback.appender.util.LogbackUtil;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ch.qos.logback.classic.LoggerContext;

/**
 * This class is a class to test Logback DBAppender.
 * @author Sunghoon Son
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:./src/test/resources/spring/context-transaction.xml"})
public class DBAppenderTest {
	
	Logger logger = LoggerFactory.getLogger(DBAppenderTest.class);
	
	@Inject
	DataSource dataSource;

	private int loggingCount = 1;
	private static final int waitTimeForPerLog = 5000;

	String configFile = "./src/test/resources/logback-db.xml";

	@Before
	public void setUp(){
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		LogbackUtil.configureLC(context, configFile);
		dropTables();
		createTables();
	}

	@After
	public void tearDown(){
		dropTables();
	}
	
	@Test
	public void testAsyncDBAppender() throws Exception{
		Logger logger = LoggerFactory.getLogger("asyncDB");
		
		doLogging(logger);

		// wait enough time for finish asynchronous operation
		Thread.sleep(loggingCount * waitTimeForPerLog);

		int result = getRowCount("LOGGING_EVENT");
		assertEquals(loggingCount, result);
	}

	@Test
	public void testSyncDBAppender() throws Exception{
		Logger logger = LoggerFactory.getLogger("DB");
		doLogging(logger);

		int result = getRowCount("LOGGING_EVENT");
		assertEquals(loggingCount, result);
	}

	@Test
	public void testExceptionLogging() throws Exception{
		
		Logger logger = LoggerFactory.getLogger("DB");
		
		try{
			// if an exception occurs, the exception of information can be logged. 
			throw new Exception("test");
		}catch(Exception ex){
			logger.error("test exception ", ex);
		}

		int result = getRowCount("logging_event_exception");
		
		assertNotSame(0, result);
		assertNotSame(-1, result);
	}

	@Test
	public void testDataSourceDBAppender() throws Exception{
		Logger logger = LoggerFactory.getLogger("datasourceDB");
		doLogging(logger);
		
		int result = getRowCount("LOGGING_EVENT");
		assertEquals(loggingCount, result);
	}

	@Test
	public void testCustomDBAppender() throws Exception{
		Logger logger = LoggerFactory.getLogger("customDB");
		doLogging(logger); 
		
		int result = getRowCount("MY_LOGGING_EVENT");
		assertEquals(loggingCount, result);
	}
	
	/**
	 * negative Case test
	 * @throws Exception
	 */
	@Test
	public void testNonExistingTable() throws Exception{
		dropTables();
		
		Logger logger = LoggerFactory.getLogger("asyncDB");
		doLogging(logger);
		
		Thread.sleep(loggingCount * waitTimeForPerLog);
	}
	
	private void doLogging(Logger logger) {
		long start = System.currentTimeMillis();
		
		for (int i = 0; i < loggingCount; i++){
			logger.error("error test");
		}
		
		long end = System.currentTimeMillis();
		System.out.println("Elapsed Time : " +(end - start) + " ms");
	}
	
	/**
	 * creates tables for hsqldb 
	 */
	private void createTables(){
		Connection conn = null;
		Statement stmt = null;
		try {
			conn = dataSource.getConnection();
			stmt = conn.createStatement();

			String sql1 = new StringBuilder("CREATE TABLE logging_event (")
									.append("timestmp BIGINT NOT NULL,")
									.append("formatted_message LONGVARCHAR NOT NULL,")
									.append("logger_name VARCHAR(256) NOT NULL,")
									.append("level_string VARCHAR(256) NOT NULL,")
									.append("thread_name VARCHAR(256),")
									.append("reference_flag SMALLINT,")
									.append("arg0 VARCHAR(256),")
									.append("arg1 VARCHAR(256),")
									.append("arg2 VARCHAR(256),")
									.append("arg3 VARCHAR(256),")
									.append("caller_filename VARCHAR(256),")
									.append("caller_class VARCHAR(256),")
									.append("caller_method VARCHAR(256),")
									.append("caller_line CHAR(4),")
									.append("event_id BIGINT NOT NULL IDENTITY)").toString();

			stmt.executeUpdate(sql1);

			String sql2 = new StringBuilder("CREATE TABLE logging_event_property(")
									.append("event_id BIGINT NOT NULL,")
									.append("mapped_key  VARCHAR(254) NOT NULL,")
									.append("mapped_value LONGVARCHAR,")
									.append("PRIMARY KEY(event_id, mapped_key),")
									.append("FOREIGN KEY (event_id) REFERENCES logging_event(event_id))").toString();
			stmt.executeUpdate(sql2);

			String sql3 = new StringBuilder("CREATE TABLE logging_event_exception (")
									.append("event_id BIGINT NOT NULL,")
									.append("i SMALLINT NOT NULL,")
									.append("trace_line VARCHAR(256) NOT NULL,")
									.append("PRIMARY KEY(event_id, i),")
									.append("FOREIGN KEY (event_id) REFERENCES logging_event(event_id))").toString();

			stmt.executeUpdate(sql3);

			String sql4 = new StringBuilder("CREATE TABLE my_logging_event (")
									.append("my_timestmp BIGINT NOT NULL,")
									.append("my_formatted_message LONGVARCHAR NOT NULL,")
									.append("my_logger_name VARCHAR(256) NOT NULL,")
									.append("my_level_string VARCHAR(256) NOT NULL,")
									.append("my_thread_name VARCHAR(256),")
									.append("my_reference_flag SMALLINT,")
									.append("my_arg0 VARCHAR(256),")
									.append("my_arg1 VARCHAR(256),")
									.append("my_arg2 VARCHAR(256),")
									.append("my_arg3 VARCHAR(256),")
									.append("my_caller_filename VARCHAR(256),")
									.append("my_caller_class VARCHAR(256),")
									.append("my_caller_method VARCHAR(256),")
									.append("my_caller_line CHAR(4),")
									.append("event_id BIGINT NOT NULL IDENTITY)").toString();

			stmt.executeUpdate(sql4);

			String sql5 = new StringBuilder("CREATE TABLE my_logging_event_property(")
									.append("event_id BIGINT NOT NULL,")
									.append("my_mapped_key  VARCHAR(254) NOT NULL,")
									.append("my_mapped_value LONGVARCHAR,")
									.append("PRIMARY KEY(event_id, my_mapped_key),")
									.append("FOREIGN KEY (event_id) REFERENCES my_logging_event(event_id))").toString();

			stmt.executeUpdate(sql5);

			String sql6 = new StringBuilder("CREATE TABLE my_logging_event_exception (")
									.append("event_id BIGINT NOT NULL,")
									.append("my_i SMALLINT NOT NULL,")
									.append("my_trace_line VARCHAR(256) NOT NULL,")
									.append("PRIMARY KEY(event_id, my_i),")
									.append("FOREIGN KEY (event_id) REFERENCES my_logging_event(event_id))").toString();						

			stmt.executeUpdate(sql6);
			
		} catch (SQLException e1) {
			logger.error("Error occured while create tables : " + e1.getMessage());
		} finally{
			if (stmt != null){
				try {
					stmt.close();
				} catch (SQLException e) {}
			}
			if (conn != null){
				try {
					conn.close();
				} catch (SQLException e) {}
			}	
		}
	}

	/**
	 * drop tables for hsqldb
	 */
	private void dropTables() {
		Connection conn = null;
		try {
			conn = dataSource.getConnection();

			Statement stmt = conn.createStatement();

			// drop default tables
			stmt.executeUpdate("DROP TABLE LOGGING_EVENT_PROPERTY IF EXISTS");

			stmt.executeUpdate("DROP TABLE LOGGING_EVENT_EXCEPTION IF EXISTS");

			stmt.executeUpdate("DROP TABLE LOGGING_EVENT IF EXISTS");

			// drop custom tables
			stmt.executeUpdate("DROP TABLE MY_LOGGING_EVENT_PROPERTY IF EXISTS");

			stmt.executeUpdate("DROP TABLE MY_LOGGING_EVENT_EXCEPTION IF EXISTS");

			stmt.executeUpdate("DROP TABLE MY_LOGGING_EVENT IF EXISTS");

		} catch (SQLException e) {
			logger.error("Error occured while drop tables");
		} finally{
			if (conn != null){
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}
	}

	private int getRowCount(String tableName){

		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		int rowCount = -1;

		try{
			conn = dataSource.getConnection();
			
			stmt = conn.createStatement();

			String sql = "SELECT COUNT(*) FROM " + tableName;

			rs = stmt.executeQuery(sql);

			rs.next();

			rowCount = rs.getInt(1);

		}catch(SQLException e){
			logger.error("Error occured while select tables : " + e.getMessage());
		}finally{
			if (rs != null){
				try {
					rs.close();
				} catch (SQLException e) {}
			}
			if (stmt != null){
				try {
					stmt.close();
				} catch (SQLException e) {}
			}
			
			if (conn != null){
				try {
					conn.close();
				} catch (SQLException e) {}
			}
		}

		return rowCount;
	}
}
