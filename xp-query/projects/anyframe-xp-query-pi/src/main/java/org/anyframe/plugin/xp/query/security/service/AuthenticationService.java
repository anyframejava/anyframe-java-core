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
package org.anyframe.plugin.xp.query.security.service;

import org.anyframe.xp.query.service.XPService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Authentication Service for User Login
 *  
 * @author Youngmin Jo
 */
public interface AuthenticationService extends XPService{
	public static Logger logger = LoggerFactory.getLogger(AuthenticationService.class);
	void get(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception;
}
