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
package org.anyframe.xp.query.web.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
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
	private String contentType = PlatformType.CONTENT_TYPE_XML; //기본 XML
	
	protected Log logger=LogFactory.getLog(AbstractXPController.class);
	
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
		logger.debug(this.getClass().getName() + " process() Started!");
		VariableList inVl = null;
		DataSetList inDl = null;
		VariableList outVl = null;
		DataSetList outDl = null;

		HttpPlatformRequest httpPlatformRequest = new HttpPlatformRequest(request, contentType, charset);
		HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(response, contentType, charset);

		try {
			//InputStream 또는 Reader로부터 데이터를 수신받는다. 
			httpPlatformRequest.receiveData();
			
			PlatformData inPlatformData = httpPlatformRequest.getData();
			// Client로 부터 전달 받은 데이터 
			inVl = inPlatformData.getVariableList();
			inDl = inPlatformData.getDataSetList();
			
			// Client로 전달 할 데이터
			outVl = new VariableList();
			outDl = new DataSetList();

			if( logger.isDebugEnabled() ){
				logger.debug(
						this.getClass().getName() + "." + "operate()" + " started");
			}
			
			operate(httpPlatformRequest, inVl, inDl, outVl, outDl);
			
			if( logger.isDebugEnabled() ){
				logger.debug(
						this.getClass().getName() + "." + "operate()" + " ended");
			}
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
		logger.debug(this.getClass().getName() + " process() end!");
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
