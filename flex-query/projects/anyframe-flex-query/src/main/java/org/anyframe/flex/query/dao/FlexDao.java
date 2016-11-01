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
package org.anyframe.flex.query.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.anyframe.flex.query.data.DataRow;
import org.anyframe.flex.query.data.DataSet;
import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.exception.QueryException;

/**
 * This interface help to use anyframe.core.flex.query.FlexService more easy.
 * this interface is including method to select, insert, update, delete, and
 * save to database using DataSet.
 * 
 * @author Jonghoon Kim
 * 
 */
public class FlexDao {

	private QueryService queryService;

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	private final String variableName = "vo"; 

	/**
	 * This is the method for selecting using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param searchMap
	 *            The DataRow contains key word to search.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public <T> List<T> getList(String queryId, Map<String, Object> searchMap)
			throws QueryException {
		Object[] param = convertParams(searchMap);
		return queryService.find(queryId, param);
	}

	/**
	 * This is the method for selecting using DataRow or Map.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param searchMap
	 *            the DataRow contains key word to search.
	 * @param paramMap
	 *            searchMap contains key word to search.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public <T> List<T> getList(String queryId, Map<String, Object> searchMap, Map<String, Object> paramMap)
			throws QueryException {
		Object[] param = convertParams(searchMap);
		return queryService.find(queryId, param);
	}

	/**
	 * This is the method for inserting using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param insertMap
	 *            The DataRow contains records to insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, Map<String, Object> insertMap) throws QueryException {
		Object[] param = convertParams(insertMap);
		return queryService.create(queryId, param);
	}

	/**
	 * This is the method for inserting using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param insertMap
	 *            The DataRow contains records to insert.
	 * @param paramMap
	 *            The Map contains records to insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, Map<String, Object> insertMap, Map<String, Object> paramMap)
			throws QueryException {
		Object[] param = convertParams(insertMap, paramMap);
		return queryService.create(queryId, param);
	}

	/**
	 * This is the method for inserting using Object.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param tagetObj
	 *            The Object contains records to insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, Object tagetObj) throws QueryException {
		Object[] param = convertParams(tagetObj);
		return queryService.create(queryId, param);
	}

	/**
	 * This is the method for updating using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param updateMap
	 *            The DataRow contains records to update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, Map<String, Object> updateMap) throws QueryException {
		Object[] param = convertParams(updateMap);
		return queryService.update(queryId, param);
	}

	/**
	 * This is the method for updating using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param updateMap
	 *            The DataRow contains records to update.
	 * @param paramMap
	 *            The Map contains records to update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, Map<String, Object> updateMap, Map<String, Object> paramMap)
			throws QueryException {
		Object[] param = convertParams(updateMap, paramMap);
		return queryService.update(queryId, param);
	}

	/**
	 * This is the method for updating using Object.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param tagetObj
	 *            The Object contains records to update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, Object tagetObj) throws QueryException {
		Object[] param = convertParams(tagetObj);
		return queryService.update(queryId, param);
	}

	/**
	 * This is the method for deleting using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param deleteMap
	 *            The DataRow contains records to delete.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int delete(String queryId, Map<String, Object> deleteMap) throws QueryException {
		Object[] param = convertParams(deleteMap);
		return queryService.remove(queryId, param);
	}

	/**
	 * This is the method for updating using DataRow.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param deleteMap
	 *            The DataRow contains records to delete.
	 * @param paramMap
	 *            The Map contains records to delete.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int delete(String queryId, Map<String, Object> deleteMap, Map<String, Object> paramMap)
			throws QueryException {
		Object[] param = convertParams(deleteMap, paramMap);
		return queryService.remove(queryId, param);
	}

	/**
	 * This is the method for deleting using Object.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param tagetObj
	 *            The Object contains records to delete.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int delete(String queryId, Object targetObj)
			throws QueryException {
		Object[] params = convertParams(targetObj);
		return queryService.remove(queryId, params);
	}

	/**
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param searchMap
	 *            Map contains search conditions.
	 * @param pageIndex
	 *            current Page number
	 * @param pageSize
	 *            row size a page
	 * @param pageUnit
	 *            page unit
	 * @return Page object includes information about paging navigation status.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Page getListWithPaging(String queryId, Map<String, Object> searchMap, int pageIndex,
			int pageSize, int pageUnit) throws QueryException {
		Object[] params = convertParams(searchMap);
		return findListWithPaging(queryId, params, pageIndex, pageSize,
				pageUnit);
	}

	@SuppressWarnings("unchecked")
	protected Page findListWithPaging(String queryId, Object[] targetObjs,
			int pageIndex, int pageSize, int pageUnit) throws QueryException {
		Map<String, Object> queryMap = null;
		queryMap = queryService.findWithRowCount(queryId, targetObjs,
				pageIndex, pageSize);
		List resultList = (List) queryMap.get(QueryService.LIST);
		int totalSize = ((Long) queryMap.get(QueryService.COUNT)).intValue();
		return new Page(resultList, (new Integer(pageIndex)).intValue(),
				totalSize, pageUnit, pageSize);
	}

	protected int[] batchUpdate(String queryId, List<?> list)
			throws QueryException {
		return queryService.batchUpdate(queryId, list);
	}

	/**
	 * execute batch operation for given queryId.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            DataSet
	 * @param param
	 *            Map contains search conditions.
	 * @return total count of executed query operation.
	 * @throws QueryException
	 */
	@SuppressWarnings("unchecked")
	public int batchExecute(String queryId, DataSet dataSet, Map<String, Object> param)
			throws QueryException {
		int dsSize = dataSet.size();
		List<Object> list = new ArrayList<Object>();

		for (int count = 0; count < dsSize; count++) {
			DataRow dr = (DataRow) dataSet.get(count);
			Object[] row = convertParams(dr, param);
			list.add(row);
		}

		return batchUpdateCount(queryService.batchUpdate(queryId, list));
	}

	/**
	 * This is the method for inserting, updating and deleting using DataSet.
	 * 
	 * @param dataSet
	 *            DataSet object including query id.
	 * @param param
	 *            param including query condition.
	 * @return Map including result count for each queryId.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	public Map<String, Integer> saveAll(DataSet dataSet, Map<String, Object> param) throws QueryException {
		List<Object[]> insertList = new ArrayList<Object[]>();
		List<Object[]> updateList = new ArrayList<Object[]>();
		List<Object[]> deleteList = new ArrayList<Object[]>();

		int dsSize = dataSet.size();

		for (int i = 0; i < dsSize; i++) {
			DataRow dr = (DataRow) dataSet.get(i);
			if ("D".equals(dr.rowType)) {
				Object[] deleteRow = convertParams(dr, param);
				deleteList.add(deleteRow);
			} else if ("I".equals(dr.rowType)) {
				Object[] insertRow = convertParams(dr, param);
				insertList.add(insertRow);
			} else if ("U".equals(dr.rowType)) {
				Object[] updateRow = convertParams(dr, param);
				updateList.add(updateRow);
			}
		}

		Map<String, Integer> resultMap = new HashMap<String, Integer>();

		if (deleteList.size() != 0) {
			resultMap.put(dataSet.deleteQueryId, batchUpdateCount(batchUpdate(
					dataSet.deleteQueryId, deleteList)));
		}

		if (insertList.size() != 0) {
			resultMap.put(dataSet.insertQueryId, batchUpdateCount(batchUpdate(
					dataSet.insertQueryId, insertList)));
		}

		if (updateList.size() != 0) {
			resultMap.put(dataSet.updateQueryId, batchUpdateCount(batchUpdate(
					dataSet.updateQueryId, updateList)));
		}

		return resultMap;
	}

	private int batchUpdateCount(int[] cnt) {
		int sum = 0;
		for (int arrayLength = 0; arrayLength < cnt.length; arrayLength++) {
			sum += cnt[arrayLength];
		}
		return sum;
	}

	private Object[] convertParams(Map<String, Object> targetMap) {
		Object[] params = new Object[targetMap.size()];
		Iterator<Entry<String, Object>> targetMapIterator = targetMap.entrySet().iterator();
		int i = 0;
		while (targetMapIterator.hasNext()) {
			Map.Entry<String, Object> entry = targetMapIterator.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}
		return params;
	}

	private Object[] convertParams(Map<String, Object> targetMap1, Map<String, Object> targetMap2) {
		Object[] params = new Object[targetMap1.size() + targetMap2.size()];
		Iterator<Entry<String, Object>> targetMapIterator1 = targetMap1.entrySet().iterator();
		Iterator<Entry<String, Object>> targetMapIterator2 = targetMap2.entrySet().iterator();
		int i = 0;
		while (targetMapIterator1.hasNext()) {
			Map.Entry<String, Object> entry = targetMapIterator1.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}

		while (targetMapIterator2.hasNext()) {
			Map.Entry<String, Object> entry = targetMapIterator2.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}
		return params;
	}

	private Object[] convertParams(Object targetObj) {
		return new Object[] { new Object[] { variableName, targetObj } };
	}
}
