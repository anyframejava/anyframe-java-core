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
package org.anyframe.np.query.web.handler;

import javax.servlet.http.HttpServletRequest;

import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.PlatformData;
import com.nexacro.xapi.data.VariableList;
import com.nexacro.xapi.tx.HttpPlatformRequest;
import com.nexacro.xapi.tx.PlatformException;
import com.nexacro.xapi.tx.PlatformType;

/**
 * For using NEXACRO data, request is transformed NPRequestHandler class.
 * 
 * @author Youngmin Jo
 *
 */
public class NPRequestHandler {

	/**
	 * Input DataSetList
	 */
	private DataSetList inputDataSetList;

	/**
	 * Input VariableList
	 */
	private VariableList inputVariableList;

	/**
	 * Constructor
	 * 
	 * @param request
	 * @param response
	 * @param contentType
	 *            CONTENT_TYPE for PlatformRequest & PlatformResponse
	 * @param charset
	 *            CHAR_SET for PlatformRequest & PlatformResponse
	 * @throws PlatformException
	 */
	public NPRequestHandler(HttpServletRequest request,  String contentType, String charset)
			throws PlatformException {
		HttpPlatformRequest platformRequest = new HttpPlatformRequest(
				request, contentType, charset);
		
		platformRequest.receiveData();
		PlatformData inPlatformData = platformRequest.getData();

		this.inputDataSetList = inPlatformData.getDataSetList();
		this.inputVariableList = inPlatformData.getVariableList();
	}
	
	
	public NPRequestHandler(HttpServletRequest request)
			throws PlatformException {
		this(request, PlatformType.CONTENT_TYPE_XML, PlatformType.DEFAULT_CHAR_SET);
	}

	public DataSetList getInputDataSetList() {
		return inputDataSetList;
	}

	public void setInputDataSetList(DataSetList inputDataSetList) {
		this.inputDataSetList = inputDataSetList;
	}

	public VariableList getInputVariableList() {
		return inputVariableList;
	}

	public void setInputVariableList(VariableList inputVariableList) {
		this.inputVariableList = inputVariableList;
	}

}
