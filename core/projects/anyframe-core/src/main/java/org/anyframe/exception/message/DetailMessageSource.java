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

/**
 * Strategy interface for getting a Message structure which includes user
 * message, solution message and reason message. All exception of Anyframe have
 * to implement this.
 * 
 * @author SoYon Lim
 */
public interface DetailMessageSource {
	/**
	 * Get a Message structure which includes user message, solution message and
	 * reason message.
	 * 
	 * @return Message include user message, solution and error reason
	 */
	Message getMessages();
}
