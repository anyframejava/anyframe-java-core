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

import java.io.DataOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.zip.DeflaterOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.Debugger;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformType;

/**
 * Abstract AbstractXPController Class which provide convert data, operation,
 * set message features. <br>
 * This Class contains useful methods using 'XPLATFORM' that is a software
 * package of X-Internet. <br>
 * If given parameter from client "isFR" is set "Y" or "y", response will be
 * sent as firstrow. Firstrow is a way to send very big data from server to
 * client. Send separated data with given parameter(nextDataSize) as CSV format.
 * Firstrow only provides a way for DataSet object, not VariableList.
 * 
 * @author Jonghoon Kim
 * @author Youngmin Jo
 * @deprecated
 */
public abstract class AbstractXPController extends AbstractController {
	/**
	 * CONTENT_TYPE_BINARY "PlatformBinary" CONTENT_TYPE_CSV "PlatformCsv"
	 * CONTENT_TYPE_HTML "PlatformHtml" CONTENT_TYPE_MI_BINARY "MiBinary"
	 * CONTENT_TYPE_MI_XML "MiXml" CONTENT_TYPE_XML "PlatformXml"
	 */
	private String contentType = PlatformType.CONTENT_TYPE_XML; // Default - XML

	private String encoding = PlatformType.DEFAULT_CHAR_SET; // Default CharSet
																// = utf - 8

	protected Logger logger = LoggerFactory
			.getLogger(AbstractXPController.class);
	
	private String protocolType;
	
	private HttpSession session;

	private final int FIRSTROW_DEFAULT_DATASIZE = 1000;

	private final short TOBE_COMPRESS_MARK = (short) 0xFFAD;

	public void setContentType(String contentsType) {
		this.contentType = contentsType;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}
	
	public HttpSession getSession() {
		return this.session;
	}
	
	public void setProtocolType(String protocolType) {
		this.protocolType = protocolType;
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
	 * Write values of VariableList to Writer object
	 * 
	 * @param out
	 *            Writer
	 * @param outVl
	 *            output VariableList
	 * @throws Exception
	 */
	private void printResultMsg(Writer out, VariableList outVl)
			throws Exception {
		int size = outVl.size();

		for (int i = 0; i < size; i++) {
			out.write("\"" + outVl.get(i).getName() + "="
					+ outVl.get(i).getObject().toString() + "\"");
			if (i < size - 1) {
				out.write(",");
			}
		}
		out.write("\n");
	}

	/**
	 * Replace or remove line feed characters for CSV response
	 * 
	 * @param str
	 *            String
	 * @return String replaced or removed feed characters
	 * @throws Exception
	 */
	private String replaceFeedChar(String str) throws Exception {
		String sRtn = str;
		if (str != null) {
			if (0 <= str.indexOf("\"")) {
				sRtn = str.replaceAll("\"", "\\\\\"");
			}
			if (0 <= str.indexOf(System.getProperty("line.separator"))) {
				sRtn = sRtn
						.replaceAll(System.getProperty("line.separator"), "");
			}
			if (0 <= str.indexOf("\r")) {
				sRtn = sRtn.replaceAll("\r", "");
			}
		}
		return sRtn;
	}

	/**
	 * Return PrintWriter object with DeplaterOutputStream for compressed
	 * response
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @return PrintWriter with DeplaterOutputStream
	 * @throws Exception
	 */
	private PrintWriter getZipWriter(HttpServletResponse response)
			throws Exception {

		response.resetBuffer();

		DataOutputStream ostream = new DataOutputStream(
				response.getOutputStream());
		ostream.writeShort(TOBE_COMPRESS_MARK);

		DeflaterOutputStream compress = new DeflaterOutputStream(ostream);
		return new PrintWriter(new OutputStreamWriter(compress, encoding));
	}

	/**
	 * Separate DataSet and Variable from current HTTP request
	 * 
	 * @param request
	 *            current HTTP request
	 * @param respons
	 *            current HTTP response
	 */
	public ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		logger.debug("{} process() Started!", new Object[] { this.getClass()
				.getName() });
		this.session = request.getSession();
		
		VariableList inVl = null;
		DataSetList inDl = null;
		VariableList outVl = null;
		DataSetList outDl = null;

		HttpPlatformRequest httpPlatformRequest = new HttpPlatformRequest(
				request, contentType, encoding);
		
		if(protocolType != null && !"".equals(protocolType)){
			httpPlatformRequest.addProtocolType(protocolType);
		}

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

			setResultMessage(outVl, 0,
					"Request has been processed successfully");

			String isFR = inVl.getString("isFR");

			if ("y".equalsIgnoreCase(isFR)) {
				// in case of Firstrow
				sendFirstrowData(response, inVl, outVl, outDl);
			} else {
				// in case of using general PlatformResponse
				sendPlatformData(response, outVl, outDl);
			}

			logger.debug("{}.operate() end!", new Object[] { this.getClass()
					.getName() });
		} catch (Exception e) {
			String msg = e.getMessage();

			if (msg == null)
				msg = "Fail to process client request.";

			logger.error(msg);
			setResultMessage(outVl, -1, msg);

			sendPlatformData(response, outVl, outDl);
		}

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
	 *            output DataSetList
	 * @throws Exception
	 *             fail to send data
	 */
	private void sendPlatformData(HttpServletResponse response,
			VariableList outVl, DataSetList outDl) throws Exception {
		HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(
				response, contentType, encoding);
		
		if(protocolType != null && !"".equals(protocolType)){
			httpPlatformResponse.addProtocolType(protocolType);
		}
		
		// general HttpPlatformResponse
		PlatformData outPlatformData = new PlatformData();
		outPlatformData.setDataSetList(outDl);
		outPlatformData.setVariableList(outVl);
		httpPlatformResponse.setData(outPlatformData);
		httpPlatformResponse.sendData();
	}

	/**
	 * Send data by using Writer.write() method (Firstrow) Firstrow is a way to
	 * send very big data from server to client. Send separated data with given
	 * parameter(nextDataSize) as CSV format. This method only provides a way
	 * for big DataSet object, not VariableList.
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param inVl
	 *            input VariableList
	 * @param outVl
	 *            output VariableList
	 * @param outDl
	 *            output DataSetList
	 * @throws Exception
	 *             fail to send data
	 */
	private void sendFirstrowData(HttpServletResponse response,
			VariableList inVl, VariableList outVl, DataSetList outDl)
			throws Exception {
		String isComp = inVl.getString("isComp");
		int nextDataSize = inVl.getInt("nextDataSize");

		// setting default value
		if (nextDataSize == 0) {
			nextDataSize = FIRSTROW_DEFAULT_DATASIZE;
		}

		Writer out = null;

		if ("y".equalsIgnoreCase(isComp)) {
			// use DeflaterOutputStream to compressed response
			out = getZipWriter(response);
		} else {
			out = new PrintWriter(new OutputStreamWriter(
					response.getOutputStream(), encoding));
		}

		out.write("CSV:" + encoding + "\n");
		printResultMsg(out, outVl);

		StringBuffer data = new StringBuffer();

		// for each DataSet
		for (int currentDsCount = 0; currentDsCount < outDl.size(); currentDsCount++) {
			DataSet outDs = outDl.get(currentDsCount);

			out.write("Dataset:" + outDs.getName() + "\n");
			String head = "";

			// for each Column of DataSet
			for (int currentColumn = 0; currentColumn < outDs.getColumnCount(); currentColumn++) {
				head += outDs.getColumn(currentColumn).getName() + ":"
						+ outDs.getColumnDataType(currentColumn);
				if (currentColumn < outDs.getColumnCount() - 1)
					head += ",";
			}

			head += "\n";

			// send header data
			out.write(head);

			int dataSize = 1;

			// for each Row of DataSet
			for (int currentRow = 0; currentRow < outDs.getRowCount(); currentRow++) {

				// value of each column
				for (int currentColumn = 0; currentColumn < outDs
						.getColumnCount(); currentColumn++) {
					Object colObj = outDs.getObject(currentRow, currentColumn);
					String colVal = "";
					if (colObj != null)
						colVal = colObj.toString();

					if ("".equals(colVal))
						data.append("\"\",");
					else
						data.append("\"" + replaceFeedChar(colVal) + "\",");
				}
				data.append("\n");
				dataSize++;

				if (currentRow == outDs.getRowCount() - 1) {
					// remainder
					out.write(data.toString());
					out.flush();
				} else if (dataSize >= nextDataSize) {
					// send separated data
					out.write(data.toString());
					out.flush();
					dataSize = 1;
					data.setLength(0);
				}
			}
		}
		out.close();
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
