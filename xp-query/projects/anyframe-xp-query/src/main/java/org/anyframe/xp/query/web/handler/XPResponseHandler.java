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
package org.anyframe.xp.query.web.handler;

import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;
import java.util.zip.DeflaterOutputStream;

import javax.servlet.http.HttpServletResponse;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformException;

/**
 * Using XPResponseHandler class, XPLATFORM data is transformed to response.
 * 
 * @author Youngmin Jo
 *
 */
public class XPResponseHandler {
	private final int FIRSTROW_DEFAULT_DATASIZE = 1000;
	private final short TOBE_COMPRESS_MARK = (short) 0xFFAD;
	private final String LINE_SEPARATOR = "line.separator";
	private final String ERROR_CODE = "ErrorCode";
	private final String ERROR_MESSAGE = "ErrorMsg"; 
	
	/**
	 * contestType for PlatformRequest & PlatformResponse
	 */
	private String contentType;

	/**
	 * chatSet for PlatformRequest & PlatformResponse
	 */
	private String encoding;

	/**
	 * output DataSetList
	 */
	private DataSetList outputDataSetList;

	/**
	 * output VariableList
	 */
	private VariableList outputVariableList;

	/**
	 * Whether using Firstrow or not
	 */
	private boolean isFirstrow;

	/**
	 * Whether using compressed response or not
	 */
	private boolean isCompression;

	private int nextDataSize;

	public XPResponseHandler() {
		this(new DataSetList(), new VariableList());
	}
	
	public XPResponseHandler(DataSetList outputDataSetList,
			VariableList outputVariableList) {
		this(outputDataSetList, outputVariableList, false);
	}

	public XPResponseHandler(DataSetList outputDataSetList,
			VariableList outputVariableList, boolean isFirstrow) {
		this(outputDataSetList, outputVariableList, false, false, 0);
	}

	public XPResponseHandler(DataSetList outputDataSetList,
			VariableList outputVariableList, boolean isFirstrow,
			boolean isCompression, int nextDataSize) {
		this.outputDataSetList = outputDataSetList;
		this.outputVariableList = outputVariableList;
		this.isFirstrow = isFirstrow;
		this.isCompression = isCompression;
		this.nextDataSize = nextDataSize;
	}

	/**
	 * Send response to XPLATFORM UI.
	 * 
	 * @throws PlatformException
	 * @throws IOException
	 */
	public void sendData(HttpServletResponse response, String contentType,
			String encoding) throws PlatformException, IOException {
		if (isFirstrow) {
			sendFirstrowData(response, encoding);
		} else {
			sendPlatformData(response);
		}
	}

	/**
	 * Add output variable list
	 * 
	 * @param variableList
	 *            VariableList
	 */
	@SuppressWarnings("unchecked")
	public void addVariableList(VariableList variableList) {
		List<String> keyList = variableList.keyList();
		for (int i = 0; i < variableList.size(); i++) {
			String key = keyList.get(i);
			this.outputVariableList.add(key, variableList.get(key));
		}
	}

	/**
	 * Add output DataSet
	 * 
	 * @param dataSet
	 */
	public void addDataset(DataSet dataSet) {
		this.outputDataSetList.add(dataSet);
	}

	/**
	 * Set result message for the callback handler.
	 * 
	 * @param errorCode
	 *            Error code
	 * @param message
	 *            Error Message
	 */
	public void setResultMessage(int errorCode, String message) {
		addVariableList(ERROR_CODE, errorCode);
		addVariableList(ERROR_MESSAGE, message);
	}

	/**
	 * Add values to the output VariableList.
	 * 
	 * @param key
	 *            Key of VariableList
	 * @param value
	 *            Value
	 */
	public void addVariableList(String key, Object value) {
		this.outputVariableList.add(key, value);
	}

	/**
	 * Send data by using Writer.write() method(Firstrow). Firstrow is a way to
	 * send very big data from server to client. Send separated data with given
	 * parameter(nextDataSize) as CSV format. This method only provides a way
	 * for big DataSet object, not VariableList.
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @throws IOException
	 *             fail to send data
	 */
	private void sendFirstrowData(HttpServletResponse response, String encoding)
			throws IOException {
		Writer out = null;

		if (isCompression) {
			out = getZipWriter(response);
		} else {
			out = new PrintWriter(new OutputStreamWriter(response.getOutputStream(),
					encoding));
		}
		
		// setting default value
		if (nextDataSize == 0) {
			nextDataSize = FIRSTROW_DEFAULT_DATASIZE;
		}

		out.write("CSV:" + encoding + "\n");
		printResultMsg(out, outputVariableList);

		StringBuffer data = new StringBuffer();

		// for each DataSet
		for (int currentDsCount = 0; currentDsCount < outputDataSetList.size(); currentDsCount++) {
			DataSet outDs = outputDataSetList.get(currentDsCount);

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
	 * Send data by using PlatformResponse
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @param outVl
	 *            output VariableList
	 * @param outDl
	 *            output DataSetList
	 * @throws PlatformException
	 *             fail to send data
	 */
	private void sendPlatformData(HttpServletResponse response)
			throws PlatformException {
		HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(
				response, contentType, encoding);

		// general HttpPlatformResponse
		PlatformData outPlatformData = new PlatformData();
		outPlatformData.setDataSetList(outputDataSetList);
		outPlatformData.setVariableList(outputVariableList);
		httpPlatformResponse.setData(outPlatformData);
		httpPlatformResponse.sendData();
	}

	/**
	 * Return PrintWriter object with DeplaterOutputStream for compressed
	 * response
	 * 
	 * @param response
	 *            HttpServletResponse
	 * @return PrintWriter with DeplaterOutputStream
	 * @throws IOException
	 * @throws Exception
	 */
	private PrintWriter getZipWriter(HttpServletResponse response)
			throws IOException {

		response.resetBuffer();

		DataOutputStream ostream = new DataOutputStream(
				response.getOutputStream());
		ostream.writeShort(TOBE_COMPRESS_MARK);

		DeflaterOutputStream compress = new DeflaterOutputStream(ostream);
		return new PrintWriter(new OutputStreamWriter(compress, encoding));
	}

	/**
	 * Write values of VariableList to Writer object
	 * 
	 * @param out
	 *            Writer
	 * @param outputVariableList
	 *            output VariableList
	 * @throws IOException
	 * @throws Exception
	 */
	private void printResultMsg(Writer out, VariableList outputVariableList)
			throws IOException {
		int size = outputVariableList.size();

		for (int i = 0; i < size; i++) {
			out.write("\"" + outputVariableList.get(i).getName() + "="
					+ outputVariableList.get(i).getObject().toString() + "\"");
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
	 */
	private String replaceFeedChar(String str) {
		String sRtn = str;
		if (str != null) {
			if (0 <= str.indexOf("\"")) {
				sRtn = str.replaceAll("\"", "\\\\\"");
			}
			if (0 <= str.indexOf(System.getProperty(LINE_SEPARATOR))) {
				sRtn = sRtn
						.replaceAll(System.getProperty(LINE_SEPARATOR), "");
			}
			if (0 <= str.indexOf("\r")) {
				sRtn = sRtn.replaceAll("\r", "");
			}
		}
		return sRtn;
	}

}
