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
package org.anyframe.xp.query.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformType;

/**
 * Abstract AnyframeXPController Class which provide convert data, operation,
 * set message features. <br>
 * This Class contains useful methods using 'XPlatform' that is a software
 * package of X-Internet. <br>
 * <ul>
 * <li>setResultMessage : Set a result messages</li>
 * <li>process : Seperate datasets from Http request</li>
 * <li>opreate : Call Business Method</li>
 * </ul>
 * 
 * @author Jonghoon Kim
 */
public abstract class AbstractXPController extends AbstractController {
	/**
	 * CONTENT_TYPE_BINARY "PlatformBinary" 
	 * CONTENT_TYPE_CSV "PlatformCsv" 
	 * CONTENT_TYPE_HTML "PlatformHtml" 
	 * CONTENT_TYPE_MI_BINARY "MiBinary"  
	 * CONTENT_TYPE_MI_XML "MiXml"  
	 * CONTENT_TYPE_XML "PlatformXml"  
	 */
	private String contentType = PlatformType.CONTENT_TYPE_XML; // Default - XML
	
	protected Logger logger=LoggerFactory.getLogger(AbstractXPController.class);
	
	private String charset = PlatformType.DEFAULT_CHAR_SET; // Default CharSet = utf - 8

	public void setContentType(String contentsType) {
		this.contentType = contentsType;
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
		outVl.add("ErrorCode", code);
		outVl.add("ErrorMsg", msg);
	}

	/**
	 * Separate Dataset and Variable from current HTTP request
	 * 
	 * @param request
	 *            current HTTP request
	 * @param respons
	 *            current HTTP response
	 */
	public ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		logger.debug("{} process() Started!", new Object[]{this.getClass().getName()});
		VariableList inVl = null;
		DataSetList inDl = null;
		VariableList outVl = null;
		DataSetList outDl = null;

		HttpPlatformRequest httpPlatformRequest = new HttpPlatformRequest(request, contentType, charset);
		HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(response, contentType, charset);

		try {
			httpPlatformRequest.receiveData();
			
			PlatformData inPlatformData = httpPlatformRequest.getData();
			inVl = inPlatformData.getVariableList();
			inDl = inPlatformData.getDataSetList();
			
			outVl = new VariableList();
			outDl = new DataSetList();

			
			logger.debug("{}.operate() started", new Object[] { this.getClass()
					.getName() });
			
			
			operate(httpPlatformRequest, inVl, inDl, outVl, outDl);
			
			
			logger.debug("{}.operate() ended", new Object[] { this.getClass()
					.getName() });
			
			setResultMessage(outVl, 0, "save successed");

		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";

			logger.error(msg);
			setResultMessage(outVl, -1, msg);
		} finally {
			PlatformData outPlatformData = new PlatformData();
			outPlatformData.setDataSetList(outDl);
			outPlatformData.setVariableList(outVl);
			httpPlatformResponse.setData(outPlatformData);
			httpPlatformResponse.sendData();
		}
		logger.debug("{} process() end!", new Object[] { this.getClass()
				.getName() });
		return null;
	}

	/**
	 * Call Business Method
	 * 
	 * @param request
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
	public abstract void operate(HttpPlatformRequest httpPlatformRequest,
			VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception;
}
