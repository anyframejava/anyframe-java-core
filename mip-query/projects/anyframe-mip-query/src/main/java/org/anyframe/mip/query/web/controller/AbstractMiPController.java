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

import com.tobesoft.platform.PlatformFRResponse;
import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.PlatformResponse;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

/**
 * Abstract AbstractMiController Class which provide convert data, operation,
 * set message features. <br>
 * This Class contains useful methods using 'MiPlatform' that is a software
 * package of X-Internet. <br>
 * If given parameter from client "isFR" is set "Y" or "y", response will be
 * sent as firstrow. Firstrow is a way to send very big data from server to
 * client. Send separated data with given parameter(nextDataSize).
 * Firstrow only provides a way for Dataset object, not VariableList.
 * 
 * @author Jonghoon Kim
 * @author Youngmin Jo
 */
public abstract class AbstractMiPController extends AbstractController {
	private int dataFormat = PlatformRequest.XML; 

	protected Logger logger = LoggerFactory
			.getLogger(AbstractMiPController.class);

	private String encoding = PlatformRequest.CHARSET_UTF8;

	public void setDataFormat(String dataFormat) {
		if ("BIN".equals(dataFormat)) {
			this.dataFormat = PlatformRequest.ZLIB_COMP;
		}
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
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

		PlatformRequest platformRequest = new PlatformRequest(request, encoding);

		try {

			platformRequest.receiveData();

			inVl = platformRequest.getVariableList();
			inDl = platformRequest.getDatasetList();
			outVl = new VariableList();
			outDl = new DatasetList();

			if (logger.isDebugEnabled()) {
				logger.debug("{}.operate() started", new Object[] { this
						.getClass().getName() });
				logger.debug("Input VariableList");
				inVl.printVariables();
				logger.debug("Input DatasetList");
				inDl.printDatasets();
			}

			operate(platformRequest, inVl, inDl, outVl, outDl);

			if (logger.isDebugEnabled()) {
				logger.debug("{}.operate() ended", new Object[] { this
						.getClass().getName() });
				logger.debug("Output VariableList");
				outVl.printVariables();
				logger.debug("Output DatasetList");
				outDl.printDatasets();
			}

			setResultMessage(outVl, 0,
					"Request has been processed successfully");

			String isFirstRow = inVl.getValueAsString("isFR");
			;

			// in case of Firstrow
			if ("y".equalsIgnoreCase(isFirstRow)) {
				sendFirstrowData(response, inVl, outVl, outDl);
			} else {
				// general PlatformResponse
				sendPlatformData(response, outVl, outDl);
			}
		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";

			logger.error(msg);
			setResultMessage(outVl, -1, msg);

			sendPlatformData(response, outVl, outDl);
		}

		logger.debug(this.getClass().getName() + " process() end!");
		return null;
	}

	/**
	 * Send data by using PlatformResponse
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param outVl
	 *            output VariableList
	 * @param outDl
	 *            output DatasetList
	 * @throws Exception
	 *             fail to send data
	 */
	private void sendPlatformData(HttpServletResponse response,
			VariableList outVl, DatasetList outDl) throws Exception {
		PlatformResponse platformResponse = new PlatformResponse(response,
				dataFormat, encoding);
		platformResponse.sendData(outVl, outDl);
	}

	/**
	 * Send data by using PlatformFRResponse (Firstrow) Firstrow is a way to
	 * send very big data from server to client. Send separated data with given
	 * parameter(nextDataSize) This method only provides a way for big DataSet
	 * object, not VariableList.
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param inVl
	 *            input VariableList
	 * @param outVl
	 *            output VariableList
	 * @param outDl
	 *            output DatasetList
	 * @throws Exception
	 *             fail to send data
	 */
	private void sendFirstrowData(HttpServletResponse response,
			VariableList inVl, VariableList outVl, DatasetList outDl)
			throws Exception {
		PlatformFRResponse platformFirstRowResponse = new PlatformFRResponse(
				response, encoding);
		DatasetList copyDl = new DatasetList();
		int nextDataSize = inVl.getValueAsInteger("nextDataSize");
		int datasetCount = outDl.size();

		// for each Dataset
		for (int currentDsCount = 0; currentDsCount < datasetCount; currentDsCount++) {
			Dataset outDs = outDl.get(currentDsCount);
			Dataset copyDs = new Dataset(outDs.getDataSetID());

			int dsRows = outDs.getRowCount();
			int columnCount = outDs.getColumnCount();
			boolean isFirstFlag = true;

			// for each Column of Dataset
			for (int currentColumn = 0; currentColumn < columnCount; currentColumn++) {
				// copy columns from original dataset
				copyDs.addColumn(outDs.getColumnId(currentColumn), outDs
						.getColumnInfo(currentColumn).getColumnType(), outDs
						.getColumnInfo(currentColumn).getColumnSize());
			}

			// for each Row of Dataset
			for (int currentRow = 0; currentRow < dsRows; currentRow++) {
				int rowCount = copyDs.appendRow();

				// copy each Column
				for (int currentColumn = 0; currentColumn < columnCount; currentColumn++) {
					// copy value of columns from original dataset
					copyDs.setColumn(rowCount, currentColumn,
							outDs.getColumn(currentRow, currentColumn));
				}

				if (currentRow == dsRows - 1) {
					// send last response
					platformFirstRowResponse.sendNextData(copyDs, 0,
							nextDataSize, false);
					copyDs.deleteAll();
				} else if (isFirstFlag && rowCount >= (nextDataSize - 1)) {
					// in case of first response, including header data
					copyDl.addDataset(copyDs);
					platformFirstRowResponse.sendFirstData(outVl, copyDl);
					copyDs.deleteAll();
					isFirstFlag = false;
				} else if (!isFirstFlag && rowCount >= (nextDataSize - 1)) {
					// send separated data
					platformFirstRowResponse.sendNextData(copyDs, 0,
							nextDataSize, true);
					copyDs.deleteAll();
				}
			}
		}
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
