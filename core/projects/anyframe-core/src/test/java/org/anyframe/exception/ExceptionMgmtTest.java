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
package org.anyframe.exception;

import org.anyframe.exception.BaseException;
import org.anyframe.exception.message.Message;
import org.anyframe.exception.sample.ISampleService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * For testing functions what MessageHandler supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class ExceptionMgmtTest extends
		AbstractDependencyInjectionSpringContextTests {

	private ISampleService sampleService;

	public ISampleService getSampleService() {
		return sampleService;
	}

	public void setSampleService(ISampleService sampleService) {
		this.sampleService = sampleService;
	}

	protected String[] getConfigLocations() {
		return new String[] { "classpath*:/spring/anyframe-exception.xml" };
	}

	/**
	 * [Flow #-1] Positive : When SampleSerivce throws BaseException, get
	 * message structure from that exception.
	 */
	public void testThrowBaseException() {
		Message messages;
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
