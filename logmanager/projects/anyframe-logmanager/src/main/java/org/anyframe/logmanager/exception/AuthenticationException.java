/* 
 * Copyright (C) 2002-2012 Robert Stewart (robert@wombatnation.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package org.anyframe.logmanager.exception;

import org.anyframe.exception.BaseRuntimeException;

/**
 * This is an exception class for authentication
 * 
 * @author Soyon Lim
 */
public class AuthenticationException extends BaseRuntimeException {
	private static final long serialVersionUID = 1L;

	public AuthenticationException(String message) {
		super(message); 
	}

	/**
	 * Constructor with a message and an exception.
	 * 
	 * @param message
	 *            the message of this exception
	 * @param exception
	 *            the exception that is wrapped in this exception
	 */
	public AuthenticationException(String message, Throwable exception) {
		super(message, exception);
	}
}
