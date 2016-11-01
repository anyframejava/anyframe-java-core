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
package org.anyframe.plugin.xp.query.security.service.impl;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.anyframe.plugin.xp.query.security.service.AuthenticationService;
import org.anyframe.xp.query.service.impl.XPDao;
import org.anyframe.xp.query.service.impl.XPServiceImpl;
import org.springframework.stereotype.Service;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Authentication Service for User Login
 * 
 * @author Youngmin Jo
 */
@Service("xpSecurityService")
public class DBAuthenticationService extends XPServiceImpl implements AuthenticationService {

	@Inject
	protected DataSource dataSource = null;
	
	@Inject
	public DBAuthenticationService(XPDao xpDao){
		super.xpDao = xpDao;
	}
	
	public void get(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		
		try{
			DataSet outDs = xpDao.getList("findXPUserAuthentication", inDl.get("inDataset"));
			if(outDs.getRowCount()==0){
				throw new Exception("Incorrect User ID or Password");
			}
			outDs.setName("gdsUser");
			outDl.add(outDs);
		} catch(Exception e){
			logger.error(e.getMessage(), e.getCause());
			throw e;
		}
	}
}
