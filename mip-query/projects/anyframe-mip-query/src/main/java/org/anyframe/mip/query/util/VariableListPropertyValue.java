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
package org.anyframe.mip.query.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.anyframe.util.StringUtil;
import org.springframework.beans.MutablePropertyValues;

import com.tobesoft.platform.data.ColumnInfo;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.VariableList;
import com.tobesoft.platform.data.Variant;

/**
 * The class expanding org.springframework.beans.MutablePropertyValues
 * <p>
 * Create the object to bind to the VO using the column name and value for
 * MiPlatform's VariableList and Dataset
 * <p>
 * 
 * @author Jonghoon Kim
 */
public class VariableListPropertyValue extends MutablePropertyValues {

	private static final long serialVersionUID = 1L;

	/**
	 * After converting the VariableList to key value and the data value to Map
	 * type, create the MutablePropertyValues object
	 * 
	 * @param variableList
	 *            MiPlatform VariableList
	 * @param convertToCamelCase
	 *            When changing to CamelCase the VariableList' column name, then
	 *            true
	 */
	public VariableListPropertyValue(VariableList variableList,
			boolean convertToCamelCase) {
		super(getVariableMap(variableList, convertToCamelCase));
	}

	/**
	 * After changing to the Map type the data value and Dataset's column name,
	 * create the MutablePropertyValues object
	 * 
	 * @param dataList
	 *            MiPlatform dataset
	 * @param rowNum
	 *            The row number of binded Dataset Record
	 * @param convertToCamelCase
	 *            When changing to CamelCase the column name of the Dataset,
	 *            then true
	 */
	public VariableListPropertyValue(Dataset dataList, int rowNum,
			boolean convertToCamelCase) {
		super(getVariableMap(dataList, rowNum, false, convertToCamelCase));
	}

	/**
	 * After changing to Map type the data value and Dataset's column name,
	 * create MutablePropertyValues object
	 * 
	 * @param dataList
	 *            MiPlatform Dataset
	 * @param rowNum
	 *            The row number of Dataset Record
	 * @param isDeleted
	 *            If record is to be deleted, then true
	 * @param convertToCamelCase
	 *            When changing to CamelCase the Dataset's column name, then
	 *            true
	 */
	public VariableListPropertyValue(Dataset dataList, int rowNum,
			boolean isDeleted, boolean convertToCamelCase) {
		super(getVariableMap(dataList, rowNum, isDeleted, convertToCamelCase));
	}

	/**
	 * Change to Map the VariableList
	 * 
	 * @param variableList
	 *            MiPlatform VariableList
	 * @param convertToCamelCase
	 *            When changing to CamelCase the VariableList's key, then true
	 * @return java.util.Map
	 */
	@SuppressWarnings("unchecked")
	private static Map<Object, Object> getVariableMap(VariableList variableList,
			boolean convertToCamelCase) {
		Map<Object, Object> variableMap = variableList.getVariableMap();
		Map<Object, Object> returnMap = new HashMap<Object, Object>();
		Iterator<Entry<Object, Object>>  variableIterator = variableMap.entrySet().iterator();
		Object key = null;
		Object value = null;
		while (variableIterator.hasNext()) {
			Map.Entry<Object, Object> entry = variableIterator.next();
			key = entry.getKey();
			value = ((Variant) entry.getValue()).getString();
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
	 * Change the Dataset to Map
	 * 
	 * @param dataList
	 *            MiPlatform Dataset
	 * @param rowNum
	 *            the row number of Record
	 * @param isDeleted
	 *            when delete record, then true
	 * @param convertToCamelCase
	 *            when changing to CamelCase the column name, then true.
	 * @return
	 */
	private static Map<Object, Object> getVariableMap(Dataset dataList, int rowNum,
			boolean isDeleted, boolean convertToCamelCase) {
		int columnCount = dataList.getColumnCount();
		Map<Object, Object> returnMap = new HashMap<Object, Object>();
		String key = null;
		Object value = null;
		short type = ColumnInfo.COLTYPE_STRING;
		for (int i = 0; i < columnCount; i++) {
			key = dataList.getColumnInfo(i).getColumnID();
			type = dataList.getColumnInfo(i).getType();

			if (isDeleted)
				value = dataList.getDeleteColumn(rowNum, key).asString();
			else {
				switch (type) {
				case ColumnInfo.COLTYPE_DATE:
					value = dataList.getColumnAsDate(rowNum, key);
					break;
				case ColumnInfo.COLTYPE_DECIMAL:
					value = dataList.getColumnAsDouble(rowNum, key);
					break;
				case ColumnInfo.COLTYPE_INT:
					value = dataList.getColumnAsInteger(rowNum, key);
					break;
				default:
					value = dataList.getColumnAsString(rowNum, key);
				}
			}
			returnMap.put(convertToCamelCase(key, convertToCamelCase), value);
		}
		return returnMap;
	}
}