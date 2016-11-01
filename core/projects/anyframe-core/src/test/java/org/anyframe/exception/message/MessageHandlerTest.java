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
package org.anyframe.exception.message;

import static org.junit.Assert.assertEquals;

import java.util.Locale;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.MessageSource;
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
public class MessageHandlerTest {

	@Inject
	private MessageSource messageSource;

	/**
	 * [Flow #-1] Positive, Negative Case : message parameters are substituted
	 * in the message using Spring MessageSource.
	 */
	@Test
	public void testHandleExMessageMessageSourceStringObjectArray() {
		Locale.setDefault(Locale.ENGLISH);

		// 1. In case message parameter doesn't exist, get full message through
		// MessageHandler.
		Message messages1 = MessageHandler.handleExMessage(messageSource,
				"error.msgKey1", new Object[] {});
		assertEquals("error.msgKey1", messages1.getMessageKey());
		assertEquals("msg value1", messages1.getUserMessage());
		assertEquals("solution msg value1", messages1.getSolution());
		assertEquals("reason msg value1", messages1.getReason());

		// 2. In case message parameter type is String, get full message through
		// MessageHandler.
		Message messages2 = MessageHandler.handleExMessage(messageSource,
				"error.msgKey2", new Object[] { "sample" });
		assertEquals("error.msgKey2", messages2.getMessageKey());
		assertEquals("sample msg value2", messages2.getUserMessage());
		assertEquals("solution msg value2", messages2.getSolution());
		assertEquals("reason msg value2", messages2.getReason());

		// 3. There is only user message, get full message through
		// MessageHandler.
		Message messages3 = MessageHandler.handleExMessage(messageSource,
				"error.msgKey3", new Object[] {});
		assertEquals("error.msgKey3", messages3.getMessageKey());
		assertEquals("msg value3", messages3.getUserMessage());
		assertEquals("msg value3", messages3.getSolution());
		assertEquals("msg value3", messages3.getReason());

		// 4. message key doesn't exist, get message throught MessageHandler.
		Message messages4 = MessageHandler.handleExMessage(messageSource,
				"error.msgKey4", new Object[] {});
		assertEquals("error.msgKey4", messages4.getMessageKey());
		assertEquals("error.msgKey4", messages4.getUserMessage());
		assertEquals("error.msgKey4", messages4.getSolution());
		assertEquals("error.msgKey4", messages4.getReason());
	}

	/**
	 * [Flow #-2] Positive, Negative Case : message parameters are substituted
	 * in the message using MessageFormat.
	 */
	@Test
	public void testHandleExMessageStringObjectArray() {
		// 1. In case message parameter type is String, get full message through
		// MessageHandler.
		String message1 = "{0} msg value1";
		Message messages1 = MessageHandler.handleExMessage(message1,
				new Object[] { "sample" });
		assertEquals("sample msg value1", messages1.getUserMessage());

		// 2. In case message parameter type is String and number, get full
		// message through MessageHandler.
		String message2 = "{0} msg value{1,number}";
		Message messages2 = MessageHandler.handleExMessage(message2,
				new Object[] { "sample", new Integer(10) });
		assertEquals("sample msg value10", messages2.getUserMessage());

		// 3. In case message parameter doesn't be defined, get full message
		// through MessageHandler.
		String message3 = "{0} msg value3";
		Message messages3 = MessageHandler.handleExMessage(message3,
				new Object[] {});
		assertEquals("{0} msg value3", messages3.getUserMessage());

		// 4. In case message parameter doesn't be defined, get full message
		// through MessageHandler.
		String message4 = "msg value4";
		Message messages4 = MessageHandler.handleExMessage(message4,
				new Object[] {});
		assertEquals("msg value4", messages4.getUserMessage());

	}
}
