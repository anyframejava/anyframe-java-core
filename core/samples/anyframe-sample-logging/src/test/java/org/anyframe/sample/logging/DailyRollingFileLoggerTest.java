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

import java.util.Enumeration;

import org.apache.log4j.Appender;
import org.apache.log4j.DailyRollingFileAppender;
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
public class DailyRollingFileLoggerTest {

	/**
	 * [Flow #-1] Positive Case : try to log using DailyRollingFileLoggger
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void testDailyRollingFileLogging() throws Exception {
		// 1. find all appenders of DailyRollingFileLoggger
		Enumeration<Appender> appenders = org.apache.log4j.Logger.getLogger(this.getClass())
				.getAllAppenders();

		// 2. check DailyRollingFileAppender configurations
		if (appenders.hasMoreElements()) {
			Appender appender = (Appender) appenders.nextElement();

			if ("org.apache.log4j.DailyRollingFileAppender".equals(appender
					.getClass().getName())) {

				DailyRollingFileAppender fileAppender = (DailyRollingFileAppender) appender;
				String file = fileAppender.getFile();
				String datePattern = fileAppender.getDatePattern();
				assertEquals("./logs/daily/sample", file);
				assertEquals("'.'yyyy-MM-dd-HH-mm-ss", datePattern);
			}
		}

		// 3. try to log
		Logger logger = LoggerFactory.getLogger(this.getClass());
		assertTrue(logger.isWarnEnabled());

		for (int i = 0; i < 100; i++)
			logger.warn("log - testDailyRollingFileLoggingConf");

		Thread.sleep(3000);

		for (int i = 0; i < 100; i++)
			logger.warn("log - testDailyRollingFileLoggingConf");
	}
}
