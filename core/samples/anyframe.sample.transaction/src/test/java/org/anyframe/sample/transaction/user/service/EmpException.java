package org.anyframe.sample.transaction.user.service;

import org.springframework.context.MessageSource;

import anyframe.common.exception.BaseException;

public class EmpException extends BaseException {

	private static final long serialVersionUID = 1L;

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
	public EmpException(MessageSource messageSource, String messageKey,
			Object[] messageParameters, Throwable wrappedException) {
		super(messageSource, messageKey, messageParameters, wrappedException);
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
	public EmpException(MessageSource messageSource, String messageKey,
			Object[] messageParameters) {
		super(messageSource, messageKey, messageParameters);
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
	public EmpException(MessageSource messageSource, String messageKey,
			Throwable wrappedException) {
		super(messageSource, messageKey, wrappedException);
		// TODO Auto-generated constructor stub
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
	public EmpException(MessageSource messageSource, String messageKey) {
		super(messageSource, messageKey);
	}

	/**
	 * Constructor with a message key and an exception.
	 * 
	 * @param message
	 *            the message of this exception
	 * @param exception
	 *            the exception that is wrapped in this exception
	 */
	public EmpException(String message, Throwable exception) {
		super(message, null, exception);
	}
	
	/**
	 * Constructor with a message key and an exception.
	 * 
	 * @param message
	 *            the message of this exception
	 */
	public EmpException(String message) {
		super(message);
	}	
}
