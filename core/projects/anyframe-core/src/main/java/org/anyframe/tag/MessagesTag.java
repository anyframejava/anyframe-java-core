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
package org.anyframe.tag;

import java.io.IOException;

import org.springframework.context.MessageSource;
import org.springframework.web.servlet.tags.MessageTag;

/**
 * Custom message tag that extends spring message tag to handle encoded
 * messages(except messages UNICODE encoded).
 * 
 * @author Sooyeon Park
 */
public class MessagesTag extends MessageTag {

	private static final long serialVersionUID = 1L;

	private String messageSource = "messageSource";

	/**
	 * Write the message to the page.
	 * <p>
	 * Can be overridden in subclasses, e.g. for testing purposes.
	 * 
	 * @param msg
	 *            the message to write
	 * @throws IOException
	 *             if writing failed
	 */
	protected void writeMessage(String msg) throws IOException {

		String charSet = getRequestContext().getWebApplicationContext()
				.getServletContext().getInitParameter("character-encoding");
		if (charSet == null)
			charSet = "euc-kr";

		String finalMsg = new String(msg.getBytes("8859_1"), charSet);
		pageContext.getOut().write(String.valueOf(finalMsg));
	}

	/**
	 * find messageSource bean through the current RequestContext's application
	 * context as MessageSource.
	 */
	protected MessageSource getMessageSource() {
		if (this.messageSource.equals("messageSource")) {
			return getRequestContext().getMessageSource();
		}

		return getRequestContext().getWebApplicationContext().getBean(
				messageSource, MessageSource.class);
	}

	public void setMessageSource(String messageSource) {
		this.messageSource = messageSource;
	}
}
