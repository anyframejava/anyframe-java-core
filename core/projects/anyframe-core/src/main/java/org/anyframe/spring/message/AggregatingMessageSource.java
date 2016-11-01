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
package org.anyframe.spring.message;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.NoSuchMessageException;

/**
 * {@link org.springframework.context.MessageSource} implementation that
 * delegates to any other MessageSource beans. e.g. if you have two
 * MessageSources, 'databaseMessageSource' and 'fileMessageSource', if a message
 * 'sample' is requested, it will:
 * 
 * <ol>
 * <li>If the message is found through 'databaseMessageSource', return that
 * message.</li>
 * <li>If the message is found through 'fileMessageSource', return that message.
 * </li>
 * <li>Else, throw a NoSuchMessageException.</li>
 * </ol>
 * 
 * Note that {@link #getMessage(MessageSourceResolvable, Locale)} is not
 * supported.
 * 
 * @author SoYon Lim
 */
public class AggregatingMessageSource implements MessageSource {
	private final Logger logger = LoggerFactory
			.getLogger(AggregatingMessageSource.class);

	private List<MessageSource> messageSources;

	/**
	 * Try to resolve the message using all the attributes contained within the
	 * <code>MessageSourceResolvable</code> argument that was passed in.
	 * <p>
	 * Note that {@link #getMessage(MessageSourceResolvable, Locale)} is not
	 * supported.
	 * 
	 * @param resolvable
	 *            value object storing attributes required to properly resolve a
	 *            message
	 * @param locale
	 *            the Locale in which to do the lookup
	 * @return NoSuchMessageException
	 *         {@link #getMessage(MessageSourceResolvable, Locale)} is not
	 *         supported
	 */
	public String getMessage(MessageSourceResolvable resolvable, Locale locale)
			throws NoSuchMessageException {
		for (MessageSource messageSource : messageSources) {
			try {
				return messageSource.getMessage(resolvable, locale);
			} catch (NoSuchMessageException e) {
				logger.debug(String.format(
						"Message Source [%s] does not contain message. %s",
						messageSource.getClass().getName(), e.getMessage()));
			}
		}

		String[] codes = resolvable.getCodes();
		if (codes == null) {
			codes = new String[0];
		}
		throw new NoSuchMessageException(
				codes.length > 0 ? codes[codes.length - 1] : null, locale);
	}

	/**
	 * Try to resolve the message. Treat as an error if the message can't be
	 * found.
	 * 
	 * @param code
	 *            the code to lookup up, such as 'calculator.noRateSet'
	 * @param args
	 *            Array of arguments that will be filled in for params within
	 *            the message (params look like "{0}", "{1,date}", "{2,time}"
	 *            within a message), or <code>null</code> if none.
	 * @param locale
	 *            the Locale in which to do the lookup
	 * @return the resolved message
	 * @throws NoSuchMessageException
	 *             if the message wasn't found
	 */
	public String getMessage(String code, Object[] args, Locale locale)
			throws NoSuchMessageException {
		for (MessageSource messageSource : messageSources) {
			try {
				return messageSource.getMessage(code, args, locale);
			} catch (NoSuchMessageException e) {
				logger.debug(String
						.format("Message Source [%s] does not contain message with key '%s' and locale '%s'",
								messageSource.getClass().getName(), code,
								locale));
			}
		}

		throw new NoSuchMessageException(code, locale);
	}

	/**
	 * Try to resolve the message. Return default message if no message was
	 * found.
	 * 
	 * @param code
	 *            the code to lookup up, such as 'calculator.noRateSet'. Users
	 *            of this class are encouraged to base message names on the
	 *            relevant fully qualified class name, thus avoiding conflict
	 *            and ensuring maximum clarity.
	 * @param args
	 *            array of arguments that will be filled in for params within
	 *            the message (params look like "{0}", "{1,date}", "{2,time}"
	 *            within a message), or <code>null</code> if none.
	 * @param defaultMessage
	 *            String to return if the lookup fails
	 * @param locale
	 *            the Locale in which to do the lookup
	 * @return the resolved message if the lookup was successful; otherwise the
	 *         default message passed as a parameter
	 */
	public String getMessage(String code, Object[] args, String defaultMessage,
			Locale locale) {
		try {
			return getMessage(code, args, locale);
		} catch (NoSuchMessageException e) {
			return defaultMessage;
		}
	}

	public void setMessageSources(List<MessageSource> messageSources) {
		this.messageSources = messageSources;
	}
}
