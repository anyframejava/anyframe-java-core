package org.anyframe.logback.appender.smtp;

import org.anyframe.logback.appender.util.LogbackUtil;

/**
 * This class is a class to test Logback SMTPAppender.
 * @author Sunghoon Son
 */

import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

import ch.qos.logback.classic.LoggerContext;

public class SMTPAppenderTest {
	
	String configFileName = "./src/test/resources/logback-smtp.xml";
	private static final long MAIL_SEND_WAIT_TIME = 40000; // 40sec the  
	
	@Before
	public void setUp()throws Exception{
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		LogbackUtil.configureLC(context, configFileName);
	}
	
	@Test
	public void testAsyncSMTPAppender() throws Exception{	
		Logger logger = LoggerFactory.getLogger("asyncSMTP");
		logger.error("SMTPAppender test - using default configuration ");
		
		Thread.sleep(MAIL_SEND_WAIT_TIME);
	}
	
	@Test
	public void testSyncSMTPAppender() {
		Logger logger = LoggerFactory.getLogger("syncSMTP");
		logger.error("SMTPAppender test - asyncronousSending = false");
	}
	
	@Test
	public void testBufferedLogging() throws Exception{
		Logger logger = LoggerFactory.getLogger("asyncSMTP");
		
		// These two warning messages will be buffered.
		logger.warn("the first buffered message");
		logger.warn("the second buffered message");
		
		logger.error("the error message");
		
		Thread.sleep(MAIL_SEND_WAIT_TIME);
	}
	
	@Test
	public void testSMTPAppenderWithFilter() throws Exception{
		Logger logger = LoggerFactory.getLogger("filterSMTP");
		
		MDC.put("req.remoteHost", "127.0.0.1");
		// This log request will be filtered.
		logger.warn("the message requested by localhost");
		
		MDC.put("req.remoteHost", "255.255.255.255");
		
		logger.warn("the second buffered message");
		
		logger.error("the error message");
		
		Thread.sleep(MAIL_SEND_WAIT_TIME);
	}
	
	@Test
	public void testMarkerEvaluator() throws Exception{
		Logger logger = LoggerFactory.getLogger("markerEvaluator");
		
		logger.warn("the first buffered message");
		// even the error message will be buffered
		logger.error("the buffered error log message");
		
		Marker notifyAdmin = MarkerFactory.getMarker("NOTIFY_ADMIN");
		
		logger.error(notifyAdmin, "NOTIFY_ADMIN");
		
		Thread.sleep(MAIL_SEND_WAIT_TIME);	
	}
	
	@Test
	public void testSMTPAppenderWithMDCDiscriminator() throws Exception{
		
		Logger logger = LoggerFactory.getLogger("discriminatorSMTP");
		
		String ip1 = "127.0.0.1";
		String ip2 = "255.255.255.255";
		
		MDC.put("req.remoteHost", ip1);
		logger.warn("the first message : " + ip1);
		
		// changes the buffer
		MDC.put("req.remoteHost", ip2);
		
		logger.warn("the first message : " + ip2);
		logger.error("the second message : " + ip2);
		
		MDC.put("req.remoteHost", ip1);
		
		// flushes the previous buffer.	
		logger.error("the second message : " + ip1);
		
		Thread.sleep(MAIL_SEND_WAIT_TIME * 2);
	}
	
}
