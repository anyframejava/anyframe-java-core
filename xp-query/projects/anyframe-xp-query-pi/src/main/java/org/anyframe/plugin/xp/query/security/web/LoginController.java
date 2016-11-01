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
package org.anyframe.plugin.xp.query.security.web;

import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.xp.query.security.service.AuthenticationService;
import org.anyframe.xp.query.web.controller.AbstractXPController;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;

/**
 * Operate user login
 * 
 * @author Youngmin Jo
 */
public class LoginController extends AbstractXPController {

	@Inject
	@Named("xpSecurityService")
	private AuthenticationService securityService;
	
	@Override
	public void operate(HttpPlatformRequest httpPlatformRequest,
			VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception {
		try{
			securityService.get(inVl, inDl, outVl, outDl);
			DataSet gdsUser = outDl.get("gdsUser");
			gdsUser.addConstantColumn("Language", 3, Locale.getDefault().getLanguage());
			
			outDl.set(0, gdsUser);
		} catch(Exception e){
			logger.debug(e.getMessage());
			throw e;
		}
	}
}
