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

import java.io.File;
import java.util.Enumeration;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Appender;
import org.apache.log4j.DailyRollingFileAppender;
import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
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
public class DailyRollingFileLoggerTest{

	/**
	 * [Flow #-1] Positive Case : try to log using DailyRollingFileLoggger
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@Test
	public void testDailyRollingFileLogging() throws Exception {
		// 1. initialize
		File logFile = new File("./logs/daily");
		File[] logFiles = logFile.listFiles();

		if (logFiles != null)
			for (int i = 0; i < logFiles.length; i++)
				logFiles[i].delete();

		// 2. find all appenders of DailyRollingFileLoggger
		Enumeration appenders = Logger.getLogger(this.getClass())
				.getAllAppenders();

		// 3. check DailyRollingFileAppender configurations
		if (appenders.hasMoreElements()) {
			Appender appender = (Appender) appenders.nextElement();

			if ("org.apache.log4j.DailyRollingFileAppender".equals(appender
					.getClass().getName())) {

				DailyRollingFileAppender fileAppender = (DailyRollingFileAppender) appender;
				String file = fileAppender.getFile();
				String datePattern = fileAppender.getDatePattern();
				assertEquals("./logs/daily/sample.log", file);
				assertEquals(".yyyy-MM-dd-HH-mm", datePattern);
			}
		}

		// 4. try to log
		Log logger = LogFactory.getLog(this.getClass());
		assertTrue(logger.isWarnEnabled());

		for (int i = 0; i < 100; i++)
			logger.warn("log - testDailyRollingFileLoggingConf");

		Thread.sleep(3000);

		for (int i = 0; i < 100; i++)
			logger.warn("log - testDailyRollingFileLoggingConf");

		// 5. check log files
		logFile = new File("./logs/daily");
		logFiles = logFile.listFiles();
		assertTrue(logFiles.length > 1);
	}
}
