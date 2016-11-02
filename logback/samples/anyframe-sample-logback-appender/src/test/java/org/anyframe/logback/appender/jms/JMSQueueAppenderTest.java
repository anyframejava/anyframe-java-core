package org.anyframe.logback.appender.jms;

import javax.jms.Connection;
import javax.jms.Message;
import javax.jms.MessageConsumer;
import javax.jms.MessageListener;
import javax.jms.Session;

import org.anyframe.logback.appender.util.LogbackUtil;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQObjectMessage;
import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.spi.ILoggingEvent;

/**
 * This class is a class to test Logback JMSQueueAppender.
 * @author Sunghoon Son
 */

public class JMSQueueAppenderTest {
	
	private String configFileName = "./src/test/resources/logback-jms-queue.xml";
	
	@Before
	public void setUp(){
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		LogbackUtil.configureLC(context, configFileName);
	}
		
	@Test
	public void testJMSQueueAppender() throws Exception{
		
		ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory("tcp://127.0.0.1:61616");
		Connection conn = factory.createConnection();
		Session sess = conn.createSession(false, Session.AUTO_ACKNOWLEDGE);
		conn.start();
	
		MessageConsumer consumer = sess.createConsumer(sess.createQueue("MyQueue"));
		consumer.setMessageListener(new MessageListenerImpl());
		
		Logger logger = LoggerFactory.getLogger("jmsQueue");	
		logger.info("JMSQueueAppender Test");
				
		Thread.sleep(30000);
		
		consumer.close();
		sess.close();
		conn.close();
		System.exit(1);	
	}
	
	class MessageListenerImpl implements MessageListener{
		public void onMessage(Message message) {
			try {
				ILoggingEvent event = (ILoggingEvent)((ActiveMQObjectMessage)message).getObject();
				System.out.println("Received log [" + event.getLevel() + "]: "+ event.getMessage());	
			} catch (Exception e) {
				e.printStackTrace();
			}
		}		
	}
}
