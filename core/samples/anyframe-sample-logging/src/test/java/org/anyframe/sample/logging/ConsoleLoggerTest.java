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
import org.apache.log4j.PatternLayout;
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
public class ConsoleLoggerTest {

	/**
	 * [Flow #-1] Positive Case : try to log using ConsoleLogger
	 * 
	 * @throws Exception
	 *             fail to test
	 */
	@SuppressWarnings("unchecked")
	@Test
	public void testConsoleLogging() {
		// 1. find all appenders of ConsoleLogger
		Enumeration<Appender> appenders = org.apache.log4j.Logger.getLogger(
				this.getClass()).getAllAppenders();

		if (appenders.hasMoreElements()) {
			Appender appender = (Appender) appenders.nextElement();

			// 2. check ConsoleAppender configurations
			if ("org.apache.log4j.ConsoleAppender".equals(appender.getClass()
					.getName())) {

				assertEquals("org.apache.log4j.PatternLayout", appender
						.getLayout().getClass().getName());

				String pattern = ((PatternLayout) appender.getLayout())
						.getConversionPattern();
				assertEquals("%d %p [%c] - <%m>%n", pattern);
			}
		}

		// 3. try to log
		Logger logger = LoggerFactory.getLogger(this.getClass());
		assertTrue(logger.isDebugEnabled());
		logger.debug("log - testConsoleLoggingConf");
	}
}
