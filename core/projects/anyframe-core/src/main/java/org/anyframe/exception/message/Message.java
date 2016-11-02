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

import java.io.Serializable;

/**
 * This class is a structure for defining exception message.
 * 
 * @author SoYon Lim
 */
public class Message implements Serializable {

	private static final long serialVersionUID = 1L;

	// user defined message
	private String userMessage = "";

	// solution of error
	private String solution = "";

	// message key
	private String messageKey = "";

	// reason of error
	private String reason = "";

	public Message() {
	}

	public Message(String messageKey, String userMessage, String solution,
			String reason) {
		super();
		this.userMessage = userMessage;
		this.solution = solution;
		this.messageKey = messageKey;
		this.reason = reason;
	}

	public String getMessageKey() {
		return messageKey;
	}

	public String getReason() {
		return reason;
	}

	public String getSolution() {
		return solution;
	}

	public String getUserMessage() {
		return userMessage;
	}
}
