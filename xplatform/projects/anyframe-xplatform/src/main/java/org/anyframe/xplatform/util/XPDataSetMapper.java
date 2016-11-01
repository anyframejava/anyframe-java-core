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
package org.anyframe.xplatform.util;

import java.lang.reflect.AccessibleObject;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.MutablePropertyValues;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataTypes;
import com.tobesoft.xplatform.data.VariableList;

/**
 * The Util class needed at UI development using the Tobesoft's XPLATFORM
 * <p>
 * The XPLATFORM's data trasmitting object are DataSet and VariableList. So, it
 * is different from the VO object used in Java. When transmitting the user
 * inputted value by VO in Server Side, there needs a conversion of Data for
 * transmitting the value to the presentation layer again.
 * </p>
 * <br>
 * <p>
 * Consists of the method helping converting the data such as DataSet,
 * VariableList and VO for XPDataSetMapper.
 * 
 * @author Byunghun Woo
 * @author modified by Youngmin Jo
 * @author modified by Jongpil Park
 */
public class XPDataSetMapper {

	/**
	 * <p>
	 * This method converts Value Object(VO) List into Dataset(XPLATFORM).
	 * <p>
	 * 
	 * @param dataSetName
	 *            a name of Dataset
	 * @param voList
	 *            VO List to be converted into Dataset
	 * @param isCheck
	 *            if isCheck is 'true', when create Dataset, add check column to
	 *            Dataset.
	 * @return Dataset
	 */
	public static DataSet convertVoListToDataset(String dataSetName,
			List<Object> voList, boolean isCheck) {
		DataSet dataSet = new DataSet(dataSetName);
		populate(dataSet, voList, isCheck);
		return dataSet;
	}

	/**
	 * <p>
	 * This method converts Map List into Dataset(XPLATFORM).
	 * <p>
	 * 
	 * @param dataSetName
	 *            a name of Dataset
	 * @param mapList
	 *            Map List(List<Map<String, Object>>) to be converted into
	 *            Dataset
	 * @param isCheck
	 *            if isCheck is 'true', when create Dataset, add check column to
	 *            Dataset.
	 * @return Dataset
	 */
	public static DataSet convertMapListToDataSet(String dataSetName,
			List<Map<String, Object>> mapList, boolean isCheck) {
		DataSet dataSet = new DataSet(dataSetName);

		populateMap(dataSet, mapList, isCheck);

		return dataSet;
	}

	/**
	 * <p>
	 * This method converts Map List into Dataset(XPLATFORM).
	 * <p>
	 * 
	 * @param dataSetName
	 *            a name of Dataset
	 * @param mapList
	 *            Map List(List<Map<String, Object>>) to be converted into
	 *            Dataset
	 * @return Dataset
	 */
	public static DataSet convertMapListToDataSet(String dataSetName,
			List<Map<String, Object>> mapList) {
		return convertMapListToDataSet(dataSetName, mapList, false);
	}

	/**
	 * <p>
	 * This method converts Value Object(VO) into DataSet(XPLATFORM).
	 * </p>
	 * 
	 * @param dataSetName
	 *            a name of DataSet
	 * @param obj
	 *            Value Object(VO) to be converted into DataSet
	 * @param isCheck
	 *            if isCheck is 'true', when create DataSet, add check column to
	 *            DataSet.
	 * @return DataSet
	 */
	public static DataSet convertVoToDataset(String dataSetName, Object obj,
			boolean isCheck) {
		DataSet dataSet = new DataSet(dataSetName);
		populate(dataSet, obj, isCheck);
		return dataSet;
	}

	/**
	 * <p>
	 * This method converts Map object into DataSet(XPLATFORM).
	 * </p>
	 * 
	 * @param dataSetName
	 *            a name of DataSet
	 * @param map
	 *            Map<String, Object> to be converted into DataSet
	 * @param isCheck
	 *            if isCheck is 'true', when create DataSet, add check column to
	 *            DataSet.
	 * @return DataSet
	 */
	public static DataSet convertMapToDataSet(String dataSetName,
			Map<String, Object> map, boolean isCheck) {
		DataSet dataSet = new DataSet(dataSetName);
		populateMap(dataSet, map, isCheck);
		return dataSet;
	}

	/**
	 * <p>
	 * This method converts DataSet into ListMap(VO LIST). If DataSet's status
	 * is 'insert', a key of Map is 'insert' if DataSet's status is 'update', a
	 * key of Map is 'update' if DataSet's status is 'delete', a key of Map is
	 * 'delete'
	 * </p>
	 * 
	 * @param cls
	 *            VO Class.
	 * @param ds
	 *            DataSet to be converted into Value Object(VO) List.
	 * @return Map<String, Object>
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public static Map<String, Object> convertDatasetToListMap(
			Class<? extends Object> cls, DataSet ds)
			throws InstantiationException, IllegalAccessException {
		return populateCudList(cls, ds);
	}

	/**
	 * <p>
	 * This method converts DataSet into ListMap(VO LIST). If DataSet's status
	 * is 'insert', a key of Map is 'insert' if DataSet's status is 'update', a
	 * key of Map is 'update' if DataSet's status is 'delete', a key of Map is
	 * 'delete'
	 * </p>
	 * 
	 * @param cls
	 *            VO Class.
	 * @param ds
	 *            DataSet to be converted into Value Object(VO) List.
	 * @param convertToCamenCase
	 *            if DataSet's column name include '_'(underscore) and attribute
	 *            names of VO are Camelcase, this is 'true' ex) DataSet's column
	 *            name is 'test_sample', a attribute name of VO is 'testSample'
	 *            this value must be true.
	 * @return Map<String, Object>
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	public static Map<String, Object> convertDatasetToListMap(
			Class<? extends Object> cls, DataSet ds, boolean convertToCamenCase)
			throws InstantiationException, IllegalAccessException {
		return populateCudList(cls, ds, convertToCamenCase);
	}

	/**
	 * <p>
	 * This method converts DataSet into ListMap(Map LIST). If DataSet's status
	 * is 'insert', a key of Map is 'insert' if DataSet's status is 'update', a
	 * key of Map is 'update' if DataSet's status is 'delete', a key of Map is
	 * 'delete'
	 * </p>
	 * 
	 * @param ds
	 *            DataSet to be converted into Map List.
	 * @return Map<String, Object>
	 */
	public static Map<String, List<Map<String, Object>>> convertDataSetToListMap(
			DataSet ds) {
		return populateListMap(ds);
	}

	/**
	 * <p>
	 * This method converts DataSet into ListMap(VO LIST). if DataSet's status
	 * is 'insert', a key of Map is 'insert' if DataSet's status is 'update', a
	 * key of Map is 'update' if DataSet's status is 'delete', a key of Map is
	 * 'delete'
	 * </p>
	 * 
	 * @param cls
	 *            VO Class.
	 * @param ds
	 *            DataSet to be converted into Value Object(VO) List.
	 * @param convertToCamenCase
	 *            if DataSet's column name include '_'(underscore) and attribute
	 *            names of VO are Camelcase, this is 'true' ex) DataSet's column
	 *            name is 'test_sample', a attribute name of VO is 'testSample'
	 *            this value must be true.
	 * @return Map<String, Object>
	 */
	public static Map<String, List<Map<String, Object>>> convertDataSetToListMap(
			DataSet ds, boolean convertToCamenCase) {
		return populateListMap(ds, convertToCamenCase);
	}

	/**
	 * <p>
	 * This method converts DataSet into ListMap(VO LIST). if DataSet's status
	 * is 'insert', a key of Map is 'insert' if DataSet's status is 'update', a
	 * key of Map is 'update' if DataSet's status is 'delete', a key of Map is
	 * 'delete'
	 * </p>
	 * 
	 * @param ds
	 *            DataSet to be converted into Value Object(VO) List.
	 * @return List<Map<String, Object>>
	 */
	public static List<Map<String, Object>> convertDataSetToMapList(DataSet ds) {
		return populateList(ds);
	}

	/**
	 * <p>
	 * This method converts DataSet into ListMap(Map LIST). if DataSet's status
	 * is 'insert', a key of Map is 'insert' if DataSet's status is 'update', a
	 * key of Map is 'update' if DataSet's status is 'delete', a key of Map is
	 * 'delete'
	 * </p>
	 * 
	 * @param ds
	 *            DataSet to be converted into Value Object List.
	 * @param convertToCamenCase
	 *            if DataSet's column name include '_'(underscore) and attribute
	 *            names of VO are Camelcase, this is 'true' ex) DataSet's column
	 *            name is 'test_sample', a attribute name of VO is 'testSample'
	 *            this value must be true.
	 * @return List<Map<String, Object>>
	 */
	public static List<Map<String, Object>> convertDataSetToMapList(DataSet ds,
			boolean convertToCamelCase) {
		return populateList(ds, convertToCamelCase);
	}

	/**
	 * This method converts VariableList into VO.
	 * 
	 * @param obj
	 *            VO Object.
	 * @return VariableList
	 */
	public static VariableList convertVoToVariableList(Object obj) {
		VariableList variableList = new VariableList();
		populate(variableList, obj);
		return variableList;
	}

	/**
	 * This method converts Map object into VariableList.
	 * 
	 * @param map
	 *            map object to be converted.
	 * @return VariableList
	 */
	public static VariableList convertMapToVariableList(Map<String, Object> map) {
		VariableList variableList = new VariableList();
		setupColumnInfo(map, variableList);
		return variableList;
	}

	/**
	 * This method converts VariableList into VO object.
	 * 
	 * @param voClazz
	 *            vo class
	 * @param variableList
	 *            VariableList to be converted
	 * @return Object VO
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	public static Object convertVariableListToVO(
			Class<? extends Object> voClazz, VariableList variableList)
			throws InstantiationException, IllegalAccessException {
		return populate(voClazz, variableList);
	}

	/**
	 * This method converts VariableList into Map object.
	 * 
	 * @param variableList
	 *            VariableList to be converted
	 * @return Map<String, Object> Map object.
	 */
	public static Map<String, Object> convertVariableListToMap(
			VariableList variableList) {
		return VariableListPropertyValues.getVariableMap(variableList, false);
	}

	/**
	 * This method converts VariableList into Map object.
	 * 
	 * @param variableList
	 *            VariableList to be converted
	 * @param convertToCamelCase
	 *            true for convert columns to camelCase.
	 * @return Map<String, Object> Map object.
	 */
	public static Map<String, Object> convertVariableListToMap(
			VariableList variableList, boolean convertToCamelCase) {
		return VariableListPropertyValues.getVariableMap(variableList,
				convertToCamelCase);
	}

	/**
	 * Execute the data bind of VariableList and VO class.
	 * 
	 * @param vo
	 *            Sever Side VO
	 * @param variableList
	 *            XPLATFORM VariableList
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	private static Object populate(Class<? extends Object> voClazz,
			VariableList variableList) throws InstantiationException,
			IllegalAccessException {
		return populate(voClazz, variableList, false);
	}

	/**
	 * Execute the data bind of VariableList and VO. The VO's attribute name is
	 * of CameCase. And, the VariableList's Attribute Name includes
	 * underscore('_'). Then, we can set the converToCamelCase option as true
	 * and the data bind occurs.
	 * 
	 * @param vo
	 *            Server Side VO
	 * @param variableList
	 *            XPLATFORM VariableList
	 * @param converToCamelCase
	 *            When changing to CamelCase the VariableList' Attribute Name,
	 *            then true.
	 * @throws IllegalAccessException
	 * @throws InstantiationException
	 */
	private static Object populate(Class<? extends Object> voClazz,
			VariableList variableList, boolean convertToCamelCase)
			throws InstantiationException, IllegalAccessException {
		Object vo = voClazz.newInstance();
		new XPDataBinder(vo, convertToCamelCase).bind(variableList);
		return vo;
	}

	/**
	 * Map the VO the value of DataSet The populate method is different from
	 * populateCudList in that all Data record without relation to stauts maps
	 * to VO and returns Collection.
	 * 
	 * @param voClazz
	 *            Server Side VO
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @return Collection consisting of VO
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	@SuppressWarnings("unused")
	private static List<Object> populate(Class<?> voClazz,
			DataSet dataList) throws InstantiationException,
			IllegalAccessException {
		return populate(voClazz, dataList, false);
	}

	/**
	 * Map VO the DataSet's value The populate method is different from
	 * populateCudList in that all Data record without relation to stauts maps
	 * to VO and returns Collection. If the DataSet's Column Name includes the
	 * Underscore('_'), and if the convertToCamelCase value is true, then maps
	 * to VO as changed to CamelCase
	 * 
	 * @param voClazz
	 *            Sever Side VO
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param converToCamelCase
	 *            If mapping by changing to CamcelCase the DataSet's column
	 *            name, then true
	 * @return The collection consisting of VO
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	private static List<Object> populate(Class<? extends Object> voClazz,
			DataSet dataList, boolean converToCamelCase)
			throws InstantiationException, IllegalAccessException {
		int rowCount = dataList.getRowCount();
		List<Object> list = new ArrayList<Object>();
		Object vo = null;
		for (int i = 0; i < rowCount; i++) {
			vo = voClazz.newInstance();
			list.add(vo);
			new XPDataBinder(vo, converToCamelCase).bind(dataList, i);
		}
		return list;
	}

	/**
	 * The DataSet consists of many records. Each record has the status such as
	 * insert, update and delete. populatedCudList method maps by dividing in
	 * ArryList consisting of VO with respect to the status of the Record.
	 * Afterwards, with key values such as insert, update, and delete, we return
	 * by saving in the HashMap.
	 * 
	 * @param voClazz
	 *            Server Side VO
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @return java.util.HashMap, HashMap�� key��: insert, update, delete
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	private static Map<String, Object> populateCudList(
			Class<? extends Object> voClazz, DataSet dataList)
			throws InstantiationException, IllegalAccessException {
		return populateCudList(voClazz, dataList, false);
	}

	/**
	 * The DataSet consists of many records and each record has status such as
	 * insert, update and delete. populateCuList method returns by saving in the
	 * HashMap with the key values such as insert, update and delete after
	 * mapping in the ArryList consiting of VO according to the record's status.
	 * When the dataset's column name includes Underscore('_'), and VO's
	 * attribute name is CamelCase, then we set convertToCamelCase to true and
	 * the mapping occurs.
	 * 
	 * @param voClazz
	 *            Server Side VO
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param converToCamelCase
	 *            If mapping by changing to CamelCast the DataSet's Column Name,
	 *            then true.
	 * @return java.util.HashMap, HashMap's key value are insert, update and
	 *         delete
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	private static Map<String, Object> populateCudList(
			Class<? extends Object> voClazz, DataSet dataList,
			boolean converToCamelCase) throws InstantiationException,
			IllegalAccessException {
		List<Object> insertList = new ArrayList<Object>();
		List<Object> updateList = new ArrayList<Object>();
		List<Object> deleteList = new ArrayList<Object>();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("insert", insertList);
		resultMap.put("update", updateList);
		resultMap.put("delete", deleteList);

		Object vo = null;
		int rowCount = dataList.getRowCount();
		for (int i = 0; i < rowCount; i++) {
			vo = voClazz.newInstance();
			if (DataSet.ROW_TYPE_INSERTED == dataList.getRowType(i))
				insertList.add(vo);
			else if (DataSet.ROW_TYPE_UPDATED == dataList.getRowType(i))
				updateList.add(vo);

			new XPDataBinder(vo, converToCamelCase).bind(dataList, i);
		}

		int deleteRowCount = dataList.getRemovedRowCount();
		for (int i = 0; i < deleteRowCount; i++) {
			vo = voClazz.newInstance();
			deleteList.add(vo);
			new XPDataBinder(vo, converToCamelCase).bind(dataList, i, true);
		}
		return resultMap;
	}

	/**
	 * This method converts DataSet to Map<String, Object>
	 * 
	 * @param dataList
	 *            DataSet to be converted
	 * @return Map<String, Object> Map object.
	 */
	private static Map<String, List<Map<String, Object>>> populateListMap(
			DataSet dataList) {
		return populateListMap(dataList, false);
	}

	/**
	 * This method converts DataSet to Map contains three List objects. Key of
	 * the Map object for the inserted rows is "insert". Key of the Map object
	 * for the updated rows is "update". Key of the Map object for the deleted
	 * rows is "delete".
	 * 
	 * @param dataList
	 *            DataSet to be converted
	 * @param converToCamelCase
	 *            true for convert columns to camelCase.
	 * @return Map<String, Object> Map object.
	 */
	private static Map<String, List<Map<String, Object>>> populateListMap(
			DataSet dataList, boolean converToCamelCase) {
		List<Map<String, Object>> insertList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> updateList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> deleteList = new ArrayList<Map<String, Object>>();

		Map<String, List<Map<String, Object>>> resultMap = new HashMap<String, List<Map<String, Object>>>();
		resultMap.put("insert", insertList);
		resultMap.put("update", updateList);
		resultMap.put("delete", deleteList);

		int rowCount = dataList.getRowCount();
		for (int i = 0; i < rowCount; i++) {
			Map<String, Object> row = VariableListPropertyValues
					.getVariableMap(dataList, i, false, converToCamelCase);
			if (DataSet.ROW_TYPE_INSERTED == dataList.getRowType(i))
				insertList.add(row);
			else if (DataSet.ROW_TYPE_UPDATED == dataList.getRowType(i))
				updateList.add(row);
		}

		int deleteRowCount = dataList.getRemovedRowCount();
		for (int i = 0; i < deleteRowCount; i++) {
			Map<String, Object> row = VariableListPropertyValues
					.getVariableMap(dataList, i, true, converToCamelCase);
			deleteList.add(row);
		}

		return resultMap;
	}

	/**
	 * This method converts DataSet to List of Map contains information about a
	 * row type. Key of the Map object for the row Type is "rowType".
	 * 
	 * @param dataList
	 *            DataSet to be converted
	 * @return List<Map<String, Object>> List of Map object.
	 */
	private static List<Map<String, Object>> populateList(DataSet dataList) {
		return populateList(dataList, false);
	}

	/**
	 * This method converts DataSet to List of Map contains information about a
	 * row type. Key of the Map object for the row Type is "rowType".
	 * 
	 * @param dataList
	 *            DataSet to be converted
	 * @param converToCamelCase
	 *            true for convert columns to camelCase.
	 * @return List<Map<String, Object>> List of Map object.
	 */
	private static List<Map<String, Object>> populateList(DataSet dataList,
			boolean converToCamelCase) {
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();

		int rowCount = dataList.getRowCount();

		for (int i = 0; i < rowCount; i++) {
			Map<String, Object> row = VariableListPropertyValues
					.getVariableMap(dataList, i, false, converToCamelCase);
			if (DataSet.ROW_TYPE_INSERTED == dataList.getRowType(i))
				row.put("rowType", "insert");
			else if (DataSet.ROW_TYPE_UPDATED == dataList.getRowType(i))
				row.put("rowType", "update");
			resultList.add(row);
		}

		int deleteRowCount = dataList.getRemovedRowCount();
		for (int i = 0; i < deleteRowCount; i++) {
			Map<String, Object> row = VariableListPropertyValues
					.getVariableMap(dataList, i, true, converToCamelCase);
			row.put("rowType", "delete");
			resultList.add(row);
		}

		return resultList;
	}

	/**
	 * Maps the VO to VariableList
	 * 
	 * @param variableList
	 *            XPLATFORM variableList
	 * @param vo
	 *            Sever Side VO
	 */
	private static void populate(VariableList variableList, Object vo) {
		Map<String, Object> propertyMap = setParameterMap(vo);
		Iterator<Map.Entry<String, Object>> variableIterator = propertyMap
				.entrySet().iterator();
		String key = null;
		Object value = null;
		while (variableIterator.hasNext()) {
			Map.Entry<String, Object> entry = variableIterator.next();
			key = entry.getKey();
			value = entry.getValue();
			variableList.add(key, value);
		}
	}

	/**
	 * Maps to DataSet the VO
	 * 
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param vo
	 *            Server Side VO
	 */
	@SuppressWarnings("unused")
	private static void populate(DataSet dataList, Object vo) {
		populate(dataList, vo, false);
	}

	/**
	 * Maps DataSet the VO In the case the DataSet's Check Column is needed,
	 * then we set isCheck to true
	 * 
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param vo
	 *            Server Side VO
	 * @param isCheck
	 *            when check column is needed, then true
	 */
	private static void populate(DataSet dataList, Object vo, boolean isCheck) {
		Map<String, Object> propertyMap = setParameterMap(vo);
		setupColumnInfo(propertyMap, dataList, true, 0, isCheck);
	}

	/**
	 * This method converts DataSet to Map object
	 * 
	 * @param dataList
	 *            DataSet to be converted
	 * @param map
	 *            Map object
	 * @param isCheck
	 *            true for additional column for check box("_chk")
	 */
	private static void populateMap(DataSet dataList, Map<String, Object> map,
			boolean isCheck) {
		setupColumnInfo(map, dataList, true, 0, isCheck);
	}

	/**
	 * Maps to DataSet the List consisting of the Value Object
	 * 
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param voList
	 *            List consisting of Value Object
	 */
	@SuppressWarnings("unused")
	private static void populate(DataSet dataList, List<Object> voList) {
		populate(dataList, voList, false);

	}

	/**
	 * <p>
	 * This method converts Value Object(VO) List into DataSet(XPLATFORM).
	 * <p>
	 * 
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param voList
	 *            List consisting of Value Object
	 * @param isCheck
	 *            If the check field is need, then true
	 */
	private static void populate(DataSet dataList, List<Object> voList,
			boolean isCheck) {
		if (voList.size() == 0)
			return;
		Map<String, Object> propertyMap = setParameterMap(voList.get(0));
		setupColumnInfo(propertyMap, dataList, true, 0, isCheck);
		for (int i = 1; i < voList.size(); i++) {
			propertyMap = setParameterMap(voList.get(i));
			setupColumnInfo(propertyMap, dataList, false, i, isCheck);
		}
	}

	/**
	 * <p>
	 * This method converts Map Object List into DataSet(XPLATFORM).
	 * <p>
	 * 
	 * @param dataList
	 *            XPLATFORM DataSet
	 * @param mapList
	 *            List consisting of Map Object
	 * @param isCheck
	 *            If the check field is need, then true
	 */
	private static void populateMap(DataSet dataList,
			List<Map<String, Object>> mapList, boolean isCheck) {
		if (mapList.size() == 0)
			return;
		Map<String, Object> propertyMap = mapList.get(0);
		setupColumnInfo(propertyMap, dataList, true, 0, isCheck);
		for (int i = 1; i < mapList.size(); i++) {
			setupColumnInfo(mapList.get(i), dataList, false, i, isCheck);
		}
	}

	/**
	 * Setting the value with respect to column after setting the column name of
	 * DataSet the Value Object(VO)'s attribute name if isCheck is true, the
	 * '_chk' column name is addtionally created.
	 * 
	 * @param propertyMap
	 *            The map consisting of the value object's attribute name and
	 *            value
	 * @param dataList
	 *            The dataset mappping the Value Object
	 * @param addColumnInfo
	 *            We set the column info when called the first time because we
	 *            can create the column name when the dataset is created the
	 *            first time. Set the column info Column
	 * @param rowNumber
	 *            the row number of record for settingthe column name
	 * @param isCheck
	 *            If the check field is need, then true
	 */
	private static void setupColumnInfo(Map<String, Object> propertyMap,
			DataSet dataList, boolean addColumnInfo, int rowNumber,
			boolean isCheck) {
		int row = rowNumber;
		Iterator<Map.Entry<String, Object>> variableIterator = propertyMap
				.entrySet().iterator();
		String key = null;
		Object value = null;
		if (addColumnInfo && isCheck)
			dataList.addColumn("_chk", DataTypes.STRING, 255);
		while (variableIterator.hasNext()) {
			try {
				Map.Entry<String, Object> entry = variableIterator.next();
				key = entry.getKey();
				value = entry.getValue();
				if (addColumnInfo) {
					dataList.setChangeStructureWithData(true);
					dataList.addColumn(key, getDsType(value));
				}

				if (row == rowNumber) {
					dataList.newRow();
				}
				dataList.set(rowNumber, key, value);
				row++;
			} catch (Exception e) {
				continue;
			}
		}
	}

	private static void setupColumnInfo(Map<String, Object> propertyMap,
			VariableList variableList) {
		Iterator<Map.Entry<String, Object>> variableIterator = propertyMap
				.entrySet().iterator();
		String key = null;
		Object value = null;
		while (variableIterator.hasNext()) {
			try {
				Map.Entry<String, Object> entry = variableIterator.next();
				key = entry.getKey();
				value = entry.getValue();
				variableList.add(key, value);
			} catch (Exception e) {
				continue;
			}
		}
	}

	/**
	 * Called when obtaining the column type of dataset mapping in the data type
	 * of the Value Object
	 * 
	 * @param value
	 *            data type
	 * @return The column type of dataset mapping in data type of value object.
	 */
	private static int getDsType(Object value) {
		int type = DataTypes.STRING;
		if (value == null)
			return type;
		String t = value.getClass().getName();

		if (t.equals(Long.class.getName())) {
			type = DataTypes.LONG;
		} else if (t.equals(Integer.class.getName())) {
			type = DataTypes.INT;
		} else if (t.equals(Boolean.class.getName())) {
			type = DataTypes.BOOLEAN;
		} else if (t.equals(Float.class.getName())) {
			type = DataTypes.FLOAT;
		} else if (t.equals(Double.class.getName())) {
			type = DataTypes.DOUBLE;
		} else if (t.equals(BigDecimal.class.getName())) {
			type = DataTypes.BIG_DECIMAL;
		} else if (t.equals(Date.class.getName())
				|| t.equals(java.sql.Date.class.getName())) {
			type = DataTypes.DATE_TIME;
		} else if (t.equals(byte[].class.getName())) {
			type = DataTypes.BLOB;
		}

		return type;
	}

	/**
	 * Returns by saving in the map the appropriate value and the Value
	 * Object(VO)'s Attribute Name
	 * 
	 * @param vo
	 *            Server Side Value Object
	 * @return java.util.Map
	 */
	public static Map<String, Object> setParameterMap(Object vo) {
		Class<? extends Object> cls = vo.getClass();
		Field[] field = ReflectionHelp.getAllDeclaredFields(cls);

		AccessibleObject.setAccessible(field, true);

		Map<String, Object> propertyMap = new HashMap<String, Object>();
		for (int i = 0; i < field.length; i++) {
			try {
				propertyMap.put(field[i].getName(), ReflectionHelp
						.getFieldValue(field[i], vo));
			} catch (Exception e) {
				continue;
			}
		}
		return propertyMap;
	}

	/**
	 * This method converts Map object to VO.
	 * 
	 * @param map
	 * @param voClazz
	 * @return Object VO Object
	 * @throws InstantiationException
	 * @throws IllegalAccessException
	 */
	public static Object setParameterVO(Map<String, Object> map,
			Class<? extends Object> voClazz) throws InstantiationException,
			IllegalAccessException {
		Object vo = voClazz.newInstance();

		new XPDataBinder(vo).bind(new MutablePropertyValues(map));

		return vo;
	}
}
