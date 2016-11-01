package org.anyframe.logback.appender.syslog;

import org.anyframe.logback.appender.util.LogbackUtil;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;

/**
 * This class is a class to test Logback SyslogAppender.
 * @author Sunghoon Son
 */

public class SyslogAppenderTest {
	
	String configFileName = "./src/test/resources/logback-syslog.xml";
	
	@Before
	public void setUp()throws Exception{
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		LogbackUtil.configureLC(context, configFileName);
	}
	
	@Test
	public void testSyslogAppender(){
		Logger logger = LoggerFactory.getLogger("syslog");
		for (int i = 0; i < 10; i++){
			logger.error("test syslog appender : " + i);
		}
	}
}
