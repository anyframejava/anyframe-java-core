/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.util;


import org.apache.struts.util.ModuleException;

/**
 * The class for expanding org.apache.struts.util.ModuleException
 * <p>Handles the exception for authorization</p>
 * The AuthorizationException occurs in the case the authority is not found
 * when comparing the userrole's role info and the role info for the requested
 * url.
 * 
 * @author Byunghun Woo
 */
public class AuthorizationException extends ModuleException {

	private static final long serialVersionUID = -1056560182594664491L;

	/**
	 * The case for creating the instance without the key value for the Exception Message
	 * The message's key is <code>common.msg.authorization</code>.
	 */
	public AuthorizationException() {
        super("common.msg.authorization");
    }

	/**
	 * Sets as exception message for the appropriate value of the message key value.
	 * @param key
	 * 			The message key registered in message resources
	 */
    public AuthorizationException(String key) {
        super(key);
    }
    
    /**
     * Setting as exception message the value appropriate to the message key and urlname
     * @param key
     * 			the message key registered in message resources
     * @param urlname
     * 			requested url
     */
    public AuthorizationException(String key, String urlname) {
        super(key, urlname);
    }
}
