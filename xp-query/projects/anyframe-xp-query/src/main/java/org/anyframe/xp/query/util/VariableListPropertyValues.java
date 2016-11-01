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
package org.anyframe.xp.query.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.util.StringUtil;
import org.springframework.beans.MutablePropertyValues;

import com.tobesoft.xplatform.data.ColumnHeader;
import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;

/**
 * The class expanding org.springframework.beans.MutablePropertyValues
 * <p>
 * Create the object to bind to the VO using the column name and value for
 * XPlatform's VariableList and Dataset
 * <p>
 * 
 * @author Jonghoon Kim
 */
public class VariableListPropertyValues extends MutablePropertyValues {

	private static final long serialVersionUID = 1L;

	/**
	 * After converting the VariableList to key value and the data value to Map
	 * type, create the MutablePropertyValues object
	 * 
	 * @param variableList
	 *            XPlatform VariableList
	 * @param convertToCamelCase
	 *            When changing to CamelCase the VariableList' column name, then
	 *            true
	 */
	public VariableListPropertyValues(VariableList variableList,
			boolean convertToCamelCase) {
		super(getVariableMap(variableList, convertToCamelCase));
	}

	/**
	 * After changing to the Map type the data value and Dataset's column name,
	 * create the MutablePropertyValues object
	 * 
	 * @param dataList
	 *            XPlatform dataset
	 * @param rowNum
	 *            The row number of binded Dataset Record
	 * @param convertToCamelCase
	 *            When changing to CamelCase the column name of the Dataset,
	 *            then true
	 */
	public VariableListPropertyValues(DataSet dataList, int rowNum,
			boolean convertToCamelCase) {
		super(getVariableMap(dataList, rowNum, false, convertToCamelCase));
	}

	/**
	 * After changing to Map type the data value and DataSet's column name,
	 * create MutablePropertyValues object
	 * 
	 * @param dataList
	 *            XPlatform DataSet
	 * @param rowNum
	 *            The row number of DataSet Record
	 * @param isDeleted
	 *            If record is to be deleted, then true
	 * @param convertToCamelCase
	 *            When changing to CamelCase the DataSet's column name, then
	 *            true
	 */
	public VariableListPropertyValues(DataSet dataList, int rowNum,
			boolean isDeleted, boolean convertToCamelCase) {
		super(getVariableMap(dataList, rowNum, isDeleted, convertToCamelCase));
	}

	/**
	 * Change to Map the VariableList
	 * 
	 * @param variableList
	 *            XPlatform VariableList
	 * @param convertToCamelCase
	 *            When changing to CamelCase the VariableList's key, then true
	 * @return
	 */
	private static Map<Object, Object> getVariableMap(
			VariableList variableList, boolean convertToCamelCase) {
		List<?> vaiableKeyList = variableList.keyList();
		Map<Object, Object> returnMap = new HashMap<Object, Object>();

		String key = null;
		Object value = null;

		for (int i = 0; i < vaiableKeyList.size(); i++) {
			key = variableList.get(i).getString();
			value = variableList.getObject(key);
			returnMap.put(convertToCamelCase(key, convertToCamelCase), value);

		}
		return returnMap;
	}

	/**
	 * Change to CamelCase the String phrase row
	 * 
	 * @param key
	 *            the phrase row to change
	 * @param convertToCamelCase
	 *            if true, then change to CamelCase
	 * @return
	 */
	private static Object convertToCamelCase(Object key,
			boolean convertToCamelCase) {
		if (convertToCamelCase == false || key == null
				|| !(key instanceof String))
			return key;
		return StringUtil.convertToCamelCase((String) key);

	}

	/**
	 * Change the DataSet to Map
	 * 
	 * @param dataList
	 *            XPlatform DataSet
	 * @param rowNum
	 *            the row number of Record
	 * @param isDeleted
	 *            when delete record, then true
	 * @param convertToCamelCase
	 *            when changing to CamelCase the column name, then true.
	 * @return
	 */
	private static Map<Object, Object> getVariableMap(DataSet dataList,
			int rowNum, boolean isDeleted, boolean convertToCamelCase) {
		int columnCount = dataList.getColumnCount();
		Map<Object, Object> returnMap = new HashMap<Object, Object>();
		String key = null;
		Object value = null;
		int type = DataTypes.STRING;
		ColumnHeader columnHeader = null;
		for (int i = 0; i < columnCount; i++) {
			columnHeader = dataList.getColumn(i);
			key = columnHeader.getName();
			// 2011.08.17 - change to getDataType
			// type = columnHeader.getType();
			type = columnHeader.getDataType();

			if (isDeleted)
				value = dataList.getRemovedData(rowNum, key);
			else {
				switch (type) {
				// 2011.08.17 - add & change
				case DataTypes.STRING:
					value = dataList.getString(rowNum, key);
					break;
				case DataTypes.BIG_DECIMAL:
					value = dataList.getBigDecimal(rowNum, key);
					break;
				case DataTypes.INT:
					value = dataList.getInt(rowNum, key);
					break;
				case DataTypes.DATE:
					value = dataList.getDateTime(rowNum, key);
					break;
				case DataTypes.LONG:
					value = dataList.getLong(rowNum, key);
					break;
				case DataTypes.FLOAT:
					value = dataList.getFloat(rowNum, key);
					break;
				case DataTypes.DOUBLE:
					value = dataList.getDouble(rowNum, key);
					break;
				case DataTypes.DATE_TIME:
					value = dataList.getDateTime(rowNum, key);
					break;
				case DataTypes.BLOB:
					value = dataList.getBlob(rowNum, key);
					break;
				case DataTypes.BOOLEAN:
					value = dataList.getBoolean(rowNum, key);
					break;
				case DataTypes.TIME:
					value = dataList.getDateTime(rowNum, key);
					break;
				default:
					value = dataList.getObject(rowNum, key);
				}
			}
			returnMap.put(convertToCamelCase(key, convertToCamelCase), value);
		}
		return returnMap;
	}
}