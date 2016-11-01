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
package org.anyframe.exception.sample;

import java.util.Locale;

import org.anyframe.exception.BaseException;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;

/**
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class SampleServiceImpl implements SampleService,
		ApplicationContextAware {
	private MessageSource messageSource;

	public void setApplicationContext(ApplicationContext applicatonContext)
			throws BeansException {
		ApplicationContext context = applicatonContext;
		this.messageSource = (MessageSource) context.getBean("messageSource");
	}

	public void testBaseException(int arg) throws BaseException {
		switch (arg) {
		case 1:
			throw new BaseException(messageSource, "error.base.msg1",
					new Exception("TEST BaseException"));
		case 2:
			throw new BaseException(messageSource, "error.base.msg2",
					new Object[] { "sample" });
		case 3:
			throw new BaseException(messageSource, "error.base.msg1");
		case 4:
			throw new BaseException("{0} message", new Object[] { "sample" });
		case 5:
			throw new BaseException();
		case 6:
			throw new BaseException("message");
		case 7:
			throw new BaseException("message", new Exception(
					"TEST BaseException"));
		}
	}

	public void testBaseExceptionWithLocale(int arg, Locale locale)
			throws BaseException {
		switch (arg) {
		case 1:
			throw new BaseException(messageSource, "error.base.msg1", locale,
					new Exception("TEST BaseException"));
		case 2:
			throw new BaseException(messageSource, "error.base.msg2",
					new Object[] { "sample" }, locale);
		case 3:
			throw new BaseException(messageSource, "error.base.msg1", locale);
		}
	}
}
