/*
 * Copyright 2002-2008 the original author or authors.
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

package org.anyframe.struts.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * <p>General purpose utility methods related to processing a servlet request
 * in the Anyframe Web framework.</p>
 * 
 * @author Byunghun Woo
 */
public class DefaultActionUtil {

	/**
	 * Core Framework Delegation Util Method to get Logger
	 * @param loggerCategory loggerCategory name
	 * @return Logger Core Framework logger
	 */
    public static Log getLogger(String loggerCategory) {
        Log logger = LogFactory.getLog(loggerCategory);
        return logger;
    }

}
