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

import java.util.Locale;

import org.anyframe.exception.BaseException;
import org.anyframe.exception.message.Message;
import org.anyframe.exception.sample.ISampleService;
import org.springframework.test.AbstractDependencyInjectionSpringContextTests;


/**
 * For testing functions what MessageHandler supports, there are some test
 * scenarios in this TestCase.
 * 
 * @author JongHoon Kim
 */
public class ExceptionMgmtLocaleTest extends
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
	 * message structure from that exception. When Language is KOREAN.
	 */
	public void testThrowBaseExceptionKO() {
		Message messages;
		
		Locale locale = Locale.KOREAN;
		// 1. throw new BaseException (constructor is consist of MessageSource,
		// messageKey, cause exception)
		try {
			sampleService.testBaseExceptionWithLocale(1, locale );
		} catch (BaseException be) {
			be.getMessage();
			messages = be.getMessages();
			Exception ex = (Exception) be.getCause();
			assertEquals("TEST BaseException", ex.getMessage());
			assertEquals("error.base.msg1", messages.getMessageKey());
			assertEquals("메세지1", messages.getUserMessage());
			assertEquals("해결1", messages.getSolution());
			assertEquals("원인1", messages.getReason());
		}

		// 2. throw new BaseException (constructor is consist of MessageSource,
		// messageKey, message parameters)
		try {
			sampleService.testBaseException(2);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("error.base.msg2", messages.getMessageKey());
			assertEquals("sample 메세지2", messages.getUserMessage());
			assertEquals("해결2", messages.getSolution());
			assertEquals("원인2", messages.getReason());
		}

		// 3. throw new BaseException (constructor is consist of MessageSource,
		// messageKey)
		try {
			sampleService.testBaseException(3);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("error.base.msg1", messages.getMessageKey());
			assertEquals("메세지1", messages.getUserMessage());
			assertEquals("해결1", messages.getSolution());
			assertEquals("원인1", messages.getReason());
		}
	}
	
	/**
	 * [Flow #-1] Positive : When SampleSerivce throws BaseException, get
	 * message structure from that exception. When Language is KOREAN.
	 */
	public void testThrowBaseExceptionEN() {
		Message messages;
		
		Locale locale = Locale.ENGLISH;
		// 1. throw new BaseException (constructor is consist of MessageSource,
		// messageKey, cause exception)
		try {
			sampleService.testBaseExceptionWithLocale(1, locale );
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
			sampleService.testBaseExceptionWithLocale(2, locale);
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
			sampleService.testBaseExceptionWithLocale(3, locale);
		} catch (BaseException be) {
			messages = be.getMessages();
			assertEquals("error.base.msg1", messages.getMessageKey());
			assertEquals("message1", messages.getUserMessage());
			assertEquals("solution1", messages.getSolution());
			assertEquals("reason1", messages.getReason());
		}
	}	
}
