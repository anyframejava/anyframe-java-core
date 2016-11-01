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

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * {@link org.springframework.context.MessageSource} implementation that
 * accesses resource bundles in files to handle encoding configuration.
 * 
 * @author Sooyeon Park
 * 
 */
public class EncodingResourceBundleMessageSource extends
		ResourceBundleMessageSource {

	private final static Logger LOGGER = LoggerFactory
			.getLogger(EncodingResourceBundleMessageSource.class);

	private String defaultEncoding = "UTF-8";

	public void setDefaultEncoding(String defaultEncoding) {
		this.defaultEncoding = defaultEncoding;
	}

	protected String getMessageInternal(String code, Object[] args,
			Locale locale) {
		String originalMessage = super.getMessageInternal(code, args, locale);
		if (originalMessage == null)
			return null;

		try {
			return new String(originalMessage.getBytes("8859_1"),
					defaultEncoding);
		} catch (UnsupportedEncodingException e) {
			LOGGER.error("Unsupported Encoding : {}",
					new Object[] { defaultEncoding }, e);
			return null;
		}
	}

	protected String getMessageInternalNotEncoding(String code, Object[] args,
			Locale locale) {
		String originalMessage = super.getMessageInternal(code, args, locale);
		if (originalMessage == null)
			return null;

		return originalMessage;
	}

	/**
	 * Searches through the given array of objects, finds any
	 * MessageSourceResolvable objects and resolves them.
	 * <p>
	 * Allows for messages to have MessageSourceResolvables as arguments.
	 * 
	 * @param args
	 *            array of arguments for a message
	 * @param locale
	 *            the locale to resolve through
	 * @return an array of arguments with any MessageSourceResolvables resolved
	 */
	@Override
	protected Object[] resolveArguments(Object[] args, Locale locale) {
		if (args == null) {
			return new Object[0];
		}
		List<Object> resolvedArgs = new ArrayList<Object>(args.length);
		for (Object arg : args) {
			if (arg instanceof MessageSourceResolvable) {
				resolvedArgs.add(getMessageNotEncoding(
						(MessageSourceResolvable) arg, locale));
			} else {
				resolvedArgs.add(arg);
			}
		}
		return resolvedArgs.toArray(new Object[resolvedArgs.size()]);
	}

	protected String getMessageNotEncoding(MessageSourceResolvable resolvable,
			Locale locale) throws NoSuchMessageException {

		String[] codes = resolvable.getCodes();
		if (codes == null) {
			codes = new String[0];
		}
		for (String code : codes) {
			String msg = getMessageInternalNotEncoding(code,
					resolvable.getArguments(), locale);

			if (msg != null) {
				return msg;
			}
		}
		String defaultMessage = resolvable.getDefaultMessage();
		if (defaultMessage != null) {
			return renderDefaultMessage(defaultMessage,
					resolvable.getArguments(), locale);
		}
		if (codes.length > 0) {
			String fallback = getDefaultMessage(codes[0]);
			if (fallback != null) {
				return fallback;
			}
		}
		throw new NoSuchMessageException(
				codes.length > 0 ? codes[codes.length - 1] : null, locale);
	}

}