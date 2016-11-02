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
 * 
 * The class expanding the org.apache.struts.util.ModuleException.
 * <p>Handles the Exception with respect to authentication.<p>
 * We can define the exception separately in the struts-config.xml 
 * when the exception for authentication occurs.
 * <br>
 * An example defining the AuthenticationException in struts-config.xml
 * <pre>
 * &lt;exception 
 *     	path="/sample/common/error.jsp"
 *     	key="common.msg.authentication"
 *     	type="org.anyframe.struts.util.AuthenticationException"
 *     	handler="org.anyframe.sample.common.EmpExceptionHandler" /&gt;
 * </pre>
 * Brings as the Exception message by finding in the message resources
 * the value appropriate to the key when the authentication fails by 
 * configuring like above.
 * 
 * @author Byunghun Woo
 *
 */
public class AuthenticationException extends ModuleException {

	private static final long serialVersionUID = -8713153798010761869L;
	
	/**
	 * The case for creating the instance without the key value for Exception Message
	 * The message's key is <code>common.msg.authentication</code>.
	 */
	public AuthenticationException() {
        super("common.msg.authentication");
    }
	
	/**
	 * Sets as the exception message the value appropriate to the message key value.
	 * @param key
	 * 			The message key registered in message resources
	 */
    public AuthenticationException(String key) {
        super(key);
    }
    
    /**
     * Sets as the exception message the value appropriate to the message key and urlname.
     * @param key
     * 			The message key registered in message resources
     * @param urlname
     * 			requested url
     */
    public AuthenticationException(String key, String urlname) {
        super(key, urlname);
    }
}
