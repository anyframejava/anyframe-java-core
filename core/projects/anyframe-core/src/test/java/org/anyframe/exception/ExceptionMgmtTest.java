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
package org.anyframe.exception;

import static org.junit.Assert.assertEquals;

import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.exception.message.Message;
import org.anyframe.exception.sample.SampleService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * For testing functions what MessageHandler supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/anyframe-exception.xml" })
public class ExceptionMgmtTest {

	@Inject
	@Named("sampleService")
	private SampleService sampleService;

	/**
	 * [Flow #-1] Positive : When SampleSerivce throws BaseException, get
	 * message structure from that exception.
	 */
	@Test
	public void testThrowBaseException() {
		Message messages;

		Locale.setDefault(Locale.ENGLISH);
		// 1. throw new BaseException (constructor is consist of MessageSource,
		// messageKey, cause exception)
		try {
			sampleService.testBaseException(1);
		} catch (BaseException be) {
			be.getMessage();
			messages = be.getMessages();
			Exception ex = (Exception) be.getCause();
			assertEquals("TEST BaseException", ex.getMessage());
			assertEquals("error.base.msg1", messages.getMessageKey());
			assertEquals("message1", messages.getUserMessage());
			assertEquals("solution1", messages.getSolution());
			assertEquals("reason1", messages.getReason());
		}

		// 2. throw new BaseException (constructor is consist of MessageSource,
		// messageKey, message parameters)
		try {
			sampleService.testBaseException(2);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("error.base.msg2", messages.getMessageKey());
			assertEquals("sample message2", messages.getUserMessage());
			assertEquals("solution2", messages.getSolution());
			assertEquals("reason2", messages.getReason());
		}

		// 3. throw new BaseException (constructor is consist of MessageSource,
		// messageKey)
		try {
			sampleService.testBaseException(3);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("error.base.msg1", messages.getMessageKey());
			assertEquals("message1", messages.getUserMessage());
			assertEquals("solution1", messages.getSolution());
			assertEquals("reason1", messages.getReason());
		}

		// 4. throw new BaseException (constructor is consist of message,
		// message parameters)
		try {
			sampleService.testBaseException(4);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("sample message", messages.getUserMessage());
			assertEquals("sample message", messages.getSolution());
			assertEquals("sample message", messages.getReason());
		}

		// 5. throw new BaseException (default constructor)
		try {
			sampleService.testBaseException(5);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("BaseRTException without message", messages
					.getUserMessage());
			assertEquals("BaseRTException without message", messages
					.getSolution());
			assertEquals("BaseRTException without message", messages
					.getReason());
		}

		// 6. throw new BaseException (constructor is consist of message)
		try {
			sampleService.testBaseException(6);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("message", messages.getUserMessage());
			assertEquals("message", messages.getSolution());
			assertEquals("message", messages.getReason());
		}

		// 7. throw new BaseException (constructor is consist of message, cause
		// exception)
		try {
			sampleService.testBaseException(7);
		} catch (BaseException be) {
			messages = be.getMessages();
			Exception ex = (Exception) be.getCause();
			assertEquals("TEST BaseException", ex.getMessage());
			assertEquals("message", messages.getUserMessage());
			assertEquals("message", messages.getSolution());
			assertEquals("message", messages.getReason());
		}
	}
}
