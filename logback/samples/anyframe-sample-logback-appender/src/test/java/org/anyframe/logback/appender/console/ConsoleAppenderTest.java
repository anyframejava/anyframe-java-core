package org.anyframe.logback.appender.console;

import org.anyframe.logback.appender.util.LogbackUtil;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;

/**
 * This class is a class to test Logback console Appender.
 * @author Sunghoon Son
 */

public class ConsoleAppenderTest {
	
	String configFile = "./src/test/resources/logback-console.xml";

	@Before
	public void setUp(){
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		LogbackUtil.configureLC(context, configFile);
	}
	
	@Test
	public void testConsoleAppender() throws Exception{
		Logger logger = LoggerFactory.getLogger("consoleLogger");
		logger.info("console Appender Test");
		
		logger.debug("this is a debug log message");
	}
}
