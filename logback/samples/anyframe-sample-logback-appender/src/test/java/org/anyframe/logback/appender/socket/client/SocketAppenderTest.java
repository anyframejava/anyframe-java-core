package org.anyframe.logback.appender.socket.client;

import org.anyframe.logback.appender.db.DBAppenderTest;
import org.anyframe.logback.appender.util.LogbackUtil;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ch.qos.logback.classic.LoggerContext;


/**
 * This class is a class to test Logback SocketAppender.
 * @author Sunghoon Son
 */

public class SocketAppenderTest {
	private Logger logger = LoggerFactory.getLogger(DBAppenderTest.class);
	String configFile = "./src/test/resources/logback-socket-client.xml";
	
	@Before
	public void setUp(){
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		LogbackUtil.configureLC(context, configFile);
	}
	
	@Test
	public void testSocketAppender(){
		logger = LoggerFactory.getLogger("socket");	
		logger.info("socket appender test");
	}
}
