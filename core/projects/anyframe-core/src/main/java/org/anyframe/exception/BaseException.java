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

import java.util.Locale;

import org.anyframe.exception.message.DetailMessageSource;
import org.anyframe.exception.message.Message;
import org.anyframe.exception.message.MessageHandler;
import org.springframework.context.MessageSource;

/**
 * Framework General Exception
 * 
 * @author SoYon Lim
 * @author JongHoon Kim
 */
public class BaseException extends Exception implements DetailMessageSource {

	private static final long serialVersionUID = 1L;

	/**
	 * Contains either the message of the exception or message key.
	 */
	protected String messageKey;

	/**
	 * The parameters to substitute. In subclasses, you may either use this
	 * Object[] to hold the messageParameters or (typically preferred) define
	 * your own (typed and named) attributes that you need.
	 */
	protected Object[] messageParameters;

	/**
	 * Contains user defined message, solution message and reason.
	 */
	protected Message message = new Message();

	/**
	 * Default Locale
	 */
	protected Locale locale = Locale.getDefault();

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 * @param defaultMessage
	 *            default message
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, String defaultMessage,
			Throwable wrappedException) {
		super(wrappedException);
		this.messageKey = messageKey;
		this.messageParameters = messageParameters;
		this.message = MessageHandler.handleExMessage(messageSource,
				messageKey, messageParameters, defaultMessage);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 * @param locale
	 *            the locale for language
	 * @param defaultMessage
	 *            default message
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, Locale locale, String defaultMessage,
			Throwable wrappedException) {
		super(wrappedException);
		this.messageKey = messageKey;
		this.messageParameters = messageParameters;
		this.locale = locale;
		this.message = MessageHandler.handleExMessage(messageSource,
				messageKey, messageParameters, locale, defaultMessage);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, Throwable wrappedException) {
		this(messageSource, messageKey, messageParameters, Locale.getDefault(),
				null, wrappedException);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 * @param locale
	 *            the locale for language
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, Locale locale,
			Throwable wrappedException) {
		this(messageSource, messageKey, messageParameters, locale, null,
				wrappedException);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Throwable wrappedException) {
		this(messageSource, messageKey, null, Locale.getDefault(), null,
				wrappedException);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Locale locale, Throwable wrappedException) {
		this(messageSource, messageKey, null, locale, null, wrappedException);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param locale
	 *            the locale for language
	 * @param defaultMessage
	 *            default message
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			String defaultMessage, Throwable wrappedException) {
		this(messageSource, messageKey, null, Locale.getDefault(),
				defaultMessage, wrappedException);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param defaultMessage
	 *            default message
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Locale locale, String defaultMessage, Throwable wrappedException) {
		this(messageSource, messageKey, null, locale, defaultMessage,
				wrappedException);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters) {
		this(messageSource, messageKey, messageParameters, Locale.getDefault(),
				null, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 * @param locale
	 *            the locale for language
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, Locale locale) {
		this(messageSource, messageKey, messageParameters, locale, null, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param defaultMessage
	 *            default message
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, String defaultMessage) {
		this(messageSource, messageKey, messageParameters, Locale.getDefault(),
				defaultMessage, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param defaultMessage
	 *            default message
	 * @param locale
	 *            the locale for language
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, Locale locale, String defaultMessage) {
		this(messageSource, messageKey, messageParameters, locale,
				defaultMessage, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 */
	public BaseException(MessageSource messageSource, String messageKey) {
		this(messageSource, messageKey, null, Locale.getDefault(), null, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param locale
	 *            the locale for language
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Locale locale) {
		this(messageSource, messageKey, null, locale, null, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param defaultMessage
	 *            default message
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			String defaultMessage) {
		this(messageSource, messageKey, null, Locale.getDefault(),
				defaultMessage, null);
	}

	/**
	 * The constructor with a message key, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param messageSource
	 *            message management service to extract a message
	 * @param messageKey
	 *            the message key of this exception
	 * @param locale
	 *            the locale for language
	 * @param defaultMessage
	 *            default message
	 */
	public BaseException(MessageSource messageSource, String messageKey,
			Locale locale, String defaultMessage) {
		this(messageSource, messageKey, null, locale, defaultMessage, null);
	}

	/**
	 * The constructor with a message, with parameters, and with a wrapped
	 * exception (with all the formal parameters).
	 * 
	 * @param message
	 *            the message of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 * @param wrappedException
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(String message, Object[] messageParameters,
			Throwable wrappedException) {
		super(wrappedException);
		this.messageParameters = messageParameters;
		this.message = MessageHandler.handleExMessage(message,
				messageParameters);
	}

	/**
	 * The constructor with a message and parameters. No Throwable or Exception
	 * is transfered.
	 * 
	 * @param message
	 *            the message of this exception
	 * @param messageParameters
	 *            the parameters to substitute in the message
	 */
	public BaseException(String message, Object[] messageParameters) {
		this(message, messageParameters, null);
	}

	/**
	 * default constructor
	 */
	public BaseException() {
		this("BaseRTException without message", null, null);
	}

	/**
	 * Constructor with a message.
	 * 
	 * @param message
	 *            the message of this exception
	 */
	public BaseException(String message) {
		this(message, null, null);
	}

	/**
	 * Constructor with a message and an exception.
	 * 
	 * @param message
	 *            the message of this exception
	 * @param exception
	 *            the exception that is wrapped in this exception
	 */
	public BaseException(String message, Throwable exception) {
		this(message, null, exception);
	}

	/**
	 * Get the normal message structure for the exception.
	 * 
	 * @return the message structure for the user
	 */
	public Message getMessages() {
		return message;
	}

	/**
	 * Get the user message for the exception.
	 * 
	 * @return the user message
	 */
	public String getMessage() {
		return message.getUserMessage();
	}

	public String getMessageKey() {
		return messageKey;
	}

	public void setMessageKey(String messageKey) {
		this.messageKey = messageKey;
	}

	public Object[] getMessageParameters() {
		return messageParameters;
	}

	public void setMessageParameters(Object[] messageParameters) {
		this.messageParameters = messageParameters;
	}
}
