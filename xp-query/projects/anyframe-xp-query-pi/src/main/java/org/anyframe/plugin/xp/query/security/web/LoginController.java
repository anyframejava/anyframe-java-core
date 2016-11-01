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
import javax.servlet.http.HttpServletResponse;

import org.anyframe.plugin.xp.query.security.service.AuthenticationService;
import org.anyframe.xp.query.web.controller.AbstractXPController;
import org.springframework.web.servlet.ModelAndView;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.Debugger;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformType;

/**
 * Operate user login and store USER_ID in the session.
 * 
 * @author Youngmin Jo
 */
public class LoginController extends AbstractXPController {
	@Inject
	@Named("xpSecurityService")
	private AuthenticationService securityService;
	
	private String contentType = PlatformType.CONTENT_TYPE_XML; // Default - XML

	private String encoding = PlatformType.DEFAULT_CHAR_SET; // Default CharSet
																// = utf - 8

	public void setContentType(String contentsType) {
		this.contentType = contentsType;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		VariableList inVl = null;
		DataSetList inDl = null;
		VariableList outVl = null;
		DataSetList outDl = null;

		HttpPlatformRequest httpPlatformRequest = new HttpPlatformRequest(
				request, contentType, encoding);
		try {
			httpPlatformRequest.receiveData();

			PlatformData inPlatformData = httpPlatformRequest.getData();
			inVl = inPlatformData.getVariableList();
			inDl = inPlatformData.getDataSetList();

			outVl = new VariableList();
			outDl = new DataSetList();

			logger.debug("{}.operate() started", new Object[] { this.getClass()
					.getName() });
			Debugger debugger = new Debugger();
			logger.debug("Input VariableList");
			logger.debug(debugger.detail(inVl));

			logger.debug("Input DataSetList");
			logger.debug(debugger.detail(inDl));

			operate(httpPlatformRequest, inVl, inDl, outVl, outDl);

			logger.debug("{}.operate() ended", new Object[] { this.getClass()
					.getName() });
			logger.debug("Output VariableList");
			logger.debug(debugger.detail(outVl));
			
			logger.debug("Output DataSetList");
			logger.debug(debugger.detail(outDl));
			
			String userId = outDl.get(0).getString(0, "USER_ID");
			request.getSession().setAttribute("userId", userId);
			
			setResultMessage(outVl, 0,
					"Request has been processed successfully");

		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";

			logger.error(msg);
			setResultMessage(outVl, -1, msg);

		} finally {
			HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(
					response, contentType, encoding);

			PlatformData outPlatformData = new PlatformData();
			outPlatformData.setDataSetList(outDl);
			outPlatformData.setVariableList(outVl);
			httpPlatformResponse.setData(outPlatformData);
			httpPlatformResponse.sendData();
		}
		return null;
	}

	@Override
	public void operate(HttpPlatformRequest httpPlatformRequest,
			VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception {
		securityService.get(inVl, inDl, outVl, outDl);
		DataSet gdsUser = outDl.get("gdsUser");

		outDl.set(0, gdsUser);
	}

}
