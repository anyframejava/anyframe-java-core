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

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;

import org.anyframe.plugin.xp.query.security.service.AuthenticationService;
import org.anyframe.xp.query.web.handler.XPRequestHandler;
import org.anyframe.xp.query.web.handler.XPResponseHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.Debugger;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Operate user login and store USER_ID in the session.
 * 
 * @author Youngmin Jo
 */
@Controller
public class LoginController {
	
	Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	@Inject
	@Named("xpSecurityService")
	private AuthenticationService securityService;
	
	@RequestMapping("/xpQueryLogin.do")
	@ResponseBody
	public XPResponseHandler doLogin(@RequestBody XPRequestHandler requestHandler, HttpServletRequest request) throws Exception {
		VariableList inVl = requestHandler.getInputVariableList();
		DataSetList inDl = requestHandler.getInputDataSetList();
		VariableList outVl = null;
		DataSetList outDl = null;

		try {
			outVl = new VariableList();
			outDl = new DataSetList();

			logger.debug("{}.operate() started", new Object[] { this.getClass()
					.getName() });
			Debugger debugger = new Debugger();
			logger.debug("Input VariableList");
			logger.debug(debugger.detail(inVl));

			logger.debug("Input DataSetList");
			logger.debug(debugger.detail(inDl));

			securityService.get(inVl, inDl, outVl, outDl);
			DataSet gdsUser = outDl.get("gdsUser");

			outDl.set(0, gdsUser);
			
			logger.debug("{}.operate() ended", new Object[] { this.getClass()
					.getName() });
			logger.debug("Output VariableList");
			logger.debug(debugger.detail(outVl));
			
			logger.debug("Output DataSetList");
			logger.debug(debugger.detail(outDl));
			
			String userId = outDl.get(0).getString(0, "USER_ID");
			request.getSession().setAttribute("userId", userId);
			
			XPResponseHandler responseHandler = new XPResponseHandler(outDl, outVl); 
			responseHandler.setResultMessage(0, "Request has been processed successfully");

			return responseHandler; 
		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";

			logger.error(msg);

			XPResponseHandler responseHandler = new XPResponseHandler(outDl, outVl); 
			responseHandler.setResultMessage(-1, msg);
			
			return responseHandler;
		} 
	}

}
