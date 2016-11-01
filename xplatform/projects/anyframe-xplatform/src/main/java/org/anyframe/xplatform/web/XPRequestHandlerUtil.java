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
package org.anyframe.xplatform.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.xplatform.util.XPDataSetMapper;

import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformException;

/**
 * The util class needed at UI development using the Tobesoft's XPLATFORM.
 * XPRequestHandlerUtil class provides functions to convert HttpServletRequest &
 * HttpServletResponse to PlatformRequest & PlatformResponse. And it provides
 * functions to convert DataSet or VariableList to Map or VO Object.
 * 
 * @author Youngmin Jo
 * @author modified by Jongpil Park
 */
public class XPRequestHandlerUtil { 

	/**
	 * Response Ojbect to be converted PlatformResponse
	 */
	private final HttpServletResponse response;

	/**
	 * contestType for PlatformRequest & PlatformResponse
	 */
	private final String contentType;

	/**
	 * chatSet for PlatformRequest & PlatformResponse
	 */
	private final String charset;

	/**
	 * Input DataSetList
	 */
	private final DataSetList inDl;

	/**
	 * Input VariableList
	 */
	private final VariableList inVl;

	/**
	 * Output DataSetList
	 */
	private final DataSetList outDl;

	/**
	 * Output VariableList
	 */
	private final VariableList outVl;

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
	public XPRequestHandlerUtil(HttpServletRequest request,
			HttpServletResponse response, String contentType, String charset)
			throws PlatformException {
		this.response = response;
		this.contentType = contentType;
		this.charset = charset;

		HttpPlatformRequest platformRequest = new HttpPlatformRequest(
				request, contentType, charset);
		platformRequest.receiveData();
		PlatformData inPlatformData = platformRequest.getData();

		this.inDl = inPlatformData.getDataSetList();
		this.inVl = inPlatformData.getVariableList();
		this.outDl = new DataSetList();
		this.outVl = new VariableList();
	}

	/**
	 * Get DataSet as List of Map contains information about a row type. Key of
	 * the Map object for the row Type is "rowType".
	 * 
	 * @param dataSetName
	 *            Name of DataSet to get
	 * @return List of Map Object.
	 */
	public List<Map<String, Object>> getDataSetAsMap(String dataSetName) {
		return XPDataSetMapper.convertDataSetToMapList(inDl.get(dataSetName));
	}

	/**
	 * Get DataSet as List of Map contains information about a row type. Key of
	 * the Map object for the row Type is "rowType".
	 * 
	 * @param dataSetName
	 *            Name of DataSet to get
	 * @param convertToCamelCase
	 *            true for convert columns to camelCase.
	 * @return List of Map Object.
	 */
	public List<Map<String, Object>> getDataSetAsMap(String dataSetName,
			boolean convertToCamelCase) {
		return XPDataSetMapper.convertDataSetToMapList(inDl.get(dataSetName),
				convertToCamelCase);
	}

	/**
	 * Get DataSet as Map contains three List Objects. Key of the Map object for
	 * the inserted rows is "insert". Key of the Map object for the updated rows
	 * is "update". Key of the Map object for the deleted rows is "delete".
	 * 
	 * @param dataSetName
	 *            Name of DataSet to get
	 * @return Map contains three List object.
	 */
	public Map<String, List<Map<String, Object>>> getDataSetAsListMap(String dataSetName) {
		return XPDataSetMapper.convertDataSetToListMap(inDl.get(dataSetName));
	}

	/**
	 * Get DataSet as Map contains three List<Map<String, Object>> Objects. Key
	 * of the Map object for the inserted rows is "insert". Key of the Map
	 * object for the updated rows is "update". Key of the Map object for the
	 * deleted rows is "delete".
	 * 
	 * @param dataSetName
	 *            Name of DataSet to get
	 * @param convertToCamelCase
	 *            true for convert columns to camelCase.
	 * @return Map contains three List object.
	 */
	public Map<String, List<Map<String, Object>>> getDataSetAsListMap(String dataSetName,
			boolean convertToCamelCase) {
		return XPDataSetMapper.convertDataSetToListMap(inDl.get(dataSetName),
				convertToCamelCase);
	}

	/**
	 * Get DataSet As Map contains three List<VO> Objects. Key of the Map object
	 * for the inserted rows is "insert". Key of the Map object for the updated
	 * rows is "update". Key of the Map object for the deleted rows is "delete".
	 * 
	 * @param dataSetName
	 *            Name of DataSet to get
	 * @param voClazz
	 *            VO Object class
	 * @return Map contains three List object.
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public Map<String, Object> getDataSetAsVoList(String dataSetName,
			Class<? extends Object> voClazz) throws InstantiationException,
			IllegalAccessException {
		return XPDataSetMapper.convertDatasetToListMap(voClazz, inDl
				.get(dataSetName));
	}

	/**
	 * Get DataSet As Map contains three List<VO> Objects. Key of the Map object
	 * for the inserted rows is "insert". Key of the Map object for the updated
	 * rows is "update". Key of the Map object for the deleted rows is "delete".
	 * 
	 * @param dataSetName
	 *            Name of DataSet to get
	 * @param voClazz
	 *            VO Object class
	 * @param convertToCamelCase
	 *            true for convert columns to camelCase.
	 * @return Map contains three List object.
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public Map<String, Object> getDataSetAsVoList(String dataSetName,
			Class<? extends Object> voClazz, boolean convertToCamelCase)
			throws InstantiationException, IllegalAccessException {
		return XPDataSetMapper.convertDatasetToListMap(voClazz, inDl
				.get(dataSetName), convertToCamelCase);
	}

	/**
	 * Get VariableList as Map object.
	 * 
	 * @return Map
	 */
	public Map<String, Object> getVariableListAsMap() {
		return XPDataSetMapper.convertVariableListToMap(inVl);
	}

	/**
	 * Get VariableList as VO object.
	 * 
	 * @param voClazz
	 *            VO object class
	 * @return Object VO object
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	public Object getVariableListAsVo(Class<? extends Object> voClazz)
			throws InstantiationException, IllegalAccessException {
		return XPDataSetMapper.convertVariableListToVO(voClazz, inVl);
	}

	/**
	 * Set output DataSet.
	 * 
	 * @param dataSetName
	 *            Name of DatSet using in the UI
	 * @param mapList
	 *            List of Map object
	 */
	public void setMapListToDataSetList(String dataSetName,
			List<Map<String, Object>> mapList) {
		this.outDl.add(XPDataSetMapper.convertMapListToDataSet(dataSetName,
				mapList));
	}

	/**
	 * Set output DataSet contains column for check box.
	 * 
	 * @param dataSetName
	 *            Name of DataSet using in the UI
	 * @param mapList
	 *            List of Map object
	 */
	public void setMapListToDataSetListWithCheck(String dataSetName,
			List<Map<String, Object>> mapList) {
		this.outDl.add(XPDataSetMapper.convertMapListToDataSet(dataSetName,
				mapList, true));
	}

	/**
	 * Set output DataSet.
	 * 
	 * @param dataSetName
	 *            Name of DataSet using in the UI
	 * @param voList
	 *            List of VO object
	 */
	public void setVoListToDataSetList(String dataSetName, List<Object> voList) {
		this.outDl.add(XPDataSetMapper.convertVoListToDataset(dataSetName,
				voList, false));
	}

	/**
	 * Set output DataSet contains column for check box.
	 * 
	 * @param dataSetName
	 *            Name of DataSet using in the UI
	 * @param voList
	 *            List of VO object
	 */
	public void setVoListToDataSetListWithCheck(String dataSetName,
			List<Object> voList) {
		this.outDl.add(XPDataSetMapper.convertVoListToDataset(dataSetName,
				voList, true));
	}

	/**
	 * Set output VariableList.
	 * 
	 * @param vo
	 *            VO object
	 */
	public void setVoToVariableList(Object vo) {
		VariableList vl = XPDataSetMapper.convertVoToVariableList(vo);
		addVariableList(vl);
	}

	/**
	 * Add values to the output VariableList.
	 * 
	 * @param key
	 *            Key of VariableList
	 * @param value
	 *            Value
	 */
	public void addVariableListValue(String key, Object value) {
		this.outVl.add(key, value);
	}

	/**
	 * Set output VariableList.
	 * 
	 * @param map
	 *            Map object
	 */
	public void setMapToVariableList(Map<String, Object> map) {
		VariableList vl = XPDataSetMapper.convertMapToVariableList(map);
		addVariableList(vl);
	}

	/**
	 * Set result message for the callback handler in the UI.
	 * 
	 * @param errorCode
	 *            Error code
	 * @param message
	 *            Error Message
	 */
	public void setResultMsg(int errorCode, String message) {
		addVariableListValue("ErrorCode", errorCode);
		addVariableListValue("ErrorMsg", message);
	}

	/**
	 * Send response to XPLATFORM UI.
	 * 
	 * @throws PlatformException
	 */
	public void sendData() throws PlatformException {
		HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(
				response, contentType, charset);
		PlatformData outPlatformData = new PlatformData();
		outPlatformData.setDataSetList(outDl);
		outPlatformData.setVariableList(outVl);
		httpPlatformResponse.setData(outPlatformData);
		httpPlatformResponse.sendData();
	}

	/**
	 * Send response to XPLATFORM UI with given errorCode & message.
	 * 
	 * @param errorCode
	 *            Error Code
	 * @param message
	 *            Error Message
	 * @throws PlatformException
	 */
	public void sendData(int errorCode, String message)
			throws PlatformException {
		setResultMsg(errorCode, message);
		sendData();
	}

	/**
	 * Add output variable list
	 * 
	 * @param vl
	 *            VariableList
	 */
	@SuppressWarnings("unchecked")
	private void addVariableList(VariableList vl) {
		List<String> keyList = vl.keyList();
		for (int i = 0; i < vl.size(); i++) {
			String key = keyList.get(i);
			outVl.add(key, vl.get(key));
		}
	}
}
