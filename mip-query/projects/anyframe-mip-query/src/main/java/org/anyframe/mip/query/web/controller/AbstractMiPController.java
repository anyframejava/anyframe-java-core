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
package org.anyframe.mip.query.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.PlatformResponse;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

/**
 * Abstract AnyframeMiController Class which provide convert data, operation,
 * set message features. <br>
 * This Class contains useful methods using 'MiPlatform' that is a software
 * package of X-Internet. <br>
 * <ul>
 * <li>setResultMessage : Set a result messages</li>
 * <li>process : Separate datasets from Http request</li>
 * <li>operate : Call Business Method</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
public abstract class AbstractMiPController extends AbstractController {
	private int dataFormat = PlatformRequest.XML;
	
	protected Logger logger = LoggerFactory.getLogger(AbstractMiPController.class);
	
	private String charset = "utf-8";

	public void setDataFormat(String dataFormat) {
		if( dataFormat.equals("BIN") ){
			this.dataFormat = PlatformRequest.ZLIB_COMP;
		}
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}
	
	/**
	 * Set a result message
	 * 
	 * @param outVl
	 *            output VariabeList
	 * @param code
	 *            result code
	 * @param msg
	 *            result message
	 */
	public void setResultMessage(VariableList outVl, int code, String msg) {
		if (outVl == null) {
			outVl = new VariableList();
		}
		outVl.addVariable("ErrorCode", new Variant(code));
		outVl.addVariable("ErrorMsg", new Variant(msg));
	}

	/**
	 * Separate Dataset and Variable from current HTTP request
	 * 
	 * @param request
	 *            current HTTP request
	 * @param response
	 *            current HTTP response
	 */
	public ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		logger.debug("{} process() Started!", new Object[] { this.getClass()
				.getName() });
		VariableList inVl = null;
		DatasetList inDl = null;
		VariableList outVl = null;
		DatasetList outDl = null;

		PlatformRequest platformRequest = new PlatformRequest(request,
				charset);
		PlatformResponse platformResponse = new PlatformResponse(response,
				dataFormat, charset);

		try {

			platformRequest.receiveData();

			inVl = platformRequest.getVariableList();
			inDl = platformRequest.getDatasetList();
			outVl = new VariableList();
			outDl = new DatasetList();

			logger.debug("{}.operate() started", new Object[] { this.getClass()
					.getName() });
			logger.debug("Input VariableList");
			inVl.printVariables();
			logger.debug("Input DatasetList");
			inDl.printDatasets();
			
			operate(platformRequest, inVl, inDl, outVl, outDl);
			
			logger.debug("{}.operate() ended", new Object[] { this.getClass()
					.getName() });
			logger.debug("Output VariableList");
			outVl.printVariables();
			logger.debug("Output DatasetList");
			outDl.printDatasets();
			
			setResultMessage(outVl, 0, "save successed");

		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";

			logger.error(msg);
			setResultMessage(outVl, -1, msg);
		} finally {
			platformResponse.sendData(outVl, outDl);
		}
		logger.debug("{} process() end!", new Object[] { this.getClass()
				.getName() });
		return null;
	}

	/**
	 * Call Business Method
	 * 
	 * @param platformRequest
	 *            current HTTP request
	 * @param inVl
	 *            input VariableList
	 * @param inDl
	 *            input DatasetList
	 * @param outVl
	 *            output VariableList
	 * @param outDl
	 *            output DatasetList
	 * @throws Exception
	 */
	public abstract void operate(PlatformRequest platformRequest,
			VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception;
}
