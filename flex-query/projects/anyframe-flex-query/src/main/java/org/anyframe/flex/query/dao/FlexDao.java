/*
 * Copyright 2002-2009 the original author or authors.
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
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.anyframe.flex.query.data.DataRow;
import org.anyframe.flex.query.data.DataSet;
import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.QueryServiceException;

/**
 * This interface help to use anyframe.core.flex.query.FlexService more easy. 
 * this interface is including method to select, insert, update, delete, and save 
 * to database using DataSet.
 * @author Jonghoon, Kim
 * @author Youngmin Jo
 *
 */
public class FlexDao{

	private QueryService queryService;
	
	public void setQueryService(QueryService queryService){
		this.queryService = queryService;
	}
	
	private String variableName = "vo";
	
	/**
     * This is the method for selecting using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param searchMap
     * 		The DataRow contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public Collection getList(String queryId, Map searchMap) throws Exception {
		Object[] param = convertParams(searchMap);
		return queryService.find(queryId, param );
	}
	
	/**
     * This is the method for selecting using DataRow or Map.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param searchMap
     * 		the DataRow contains key word to search.
     * @param paramMap
     * 		searchMap contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public Collection getList(String queryId, Map searchMap, Map paramMap) throws Exception {
		Object[] param = convertParams(searchMap);
		return queryService.find(queryId, param );
	}
	
	/**
     * This is the method for inserting using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param insertMap
     * 		The DataRow contains records to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int create(String queryId, Map insertMap) throws Exception {
		Object[] param = convertParams(insertMap);
		return queryService.create(queryId, param );
	}
	
	/**
     * This is the method for inserting using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param insertMap
     * 		The DataRow contains records to insert.
     * @param paramMap
     * 		The Map contains records to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int create(String queryId, Map insertMap, Map paramMap) throws Exception {
		Object[] param = convertParams(insertMap, paramMap);
		return queryService.create(queryId, param );
	}
	
	/**
     * This is the method for inserting using Object.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param tagetObj
     * 		The Object contains records to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int create(String queryId, Object tagetObj) throws Exception {
		Object[] param = convertParams(tagetObj);
		return queryService.create(queryId, param );
	}
	
	/**
     * This is the method for updating using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param updateMap
     * 		The DataRow contains records to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int update(String queryId, Map updateMap) throws Exception {
		Object[] param = convertParams(updateMap);
		return queryService.update(queryId, param );
	}
	
	/**
     * This is the method for updating using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param updateMap
     * 		The DataRow contains records to update.
     * @param paramMap
     * 		The Map contains records to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int update(String queryId, Map updateMap, Map paramMap) throws Exception {
		Object[] param = convertParams(updateMap, paramMap);
		return queryService.update(queryId, param );
	}
	
	/**
     * This is the method for updating using Object.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param tagetObj
     * 		The Object contains records to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int update(String queryId, Object tagetObj) throws Exception {
		Object[] param = convertParams(tagetObj);
		return queryService.update(queryId, param );
	}
	
	/**
     * This is the method for deleting using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param deleteMap
     * 		The DataRow contains records to delete.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int delete(String queryId, Map deleteMap) throws Exception {
		Object[] param = convertParams(deleteMap);
		return queryService.remove(queryId, param );
	}
	
	/**
     * This is the method for updating using DataRow.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param deleteMap
     * 		The DataRow contains records to delete.
     * @param paramMap
     * 		The Map contains records to delete.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int delete(String queryId, Map deleteMap, Map paramMap) throws Exception {
		Object[] param = convertParams(deleteMap, paramMap);
		return queryService.remove(queryId, param );
	}
	
	/**
     * This is the method for deleting using Object.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param tagetObj
     * 		The Object contains records to delete.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	protected int delete(String queryId, Object targetObj) throws QueryServiceException {
		Object[] params = convertParams(targetObj);
		return queryService.remove(queryId, params);
	}
	
	/**
	 * 
     * @param queryId
     * 		query id to execute in query mapping file.
	 * @param searchMap
	 * 		Map contains search conditions.
	 * @param pageIndex
	 * 		current Page number
	 * @param pageSize
	 * 		row size a page
	 * @param pageUnit
	 * 		page unit
	 * @return
	 * 		  Page object includes information about paging navigation status.
	 * @throws QueryServiceException
	 *		if there is any problem executing the
	 *		query
	 */
	public Page getListWithPaging(String queryId, Map searchMap, int pageIndex, int pageSize, int pageUnit)
			throws QueryServiceException {
		Object[] params = convertParams(searchMap);
		return findListWithPaging(queryId, params, pageIndex, pageSize, pageUnit);
	}

	protected Page findListWithPaging(String queryId, Object[] targetObjs, int pageIndex, int pageSize, int pageUnit)
			throws QueryServiceException {
		Map queryMap = null;
		queryMap = queryService.findWithRowCount(queryId, targetObjs, pageIndex,
				pageSize);
		List resultList = (List) queryMap.get(QueryService.LIST);
		int totalSize = ((Long) queryMap.get(QueryService.COUNT)).intValue();
		return new Page(resultList, (new Integer(pageIndex)).intValue(), totalSize, pageUnit, pageSize);
	}
	
	protected int[] batchUpdate(String queryId, List list) throws QueryServiceException{
		return queryService.batchUpdate(queryId, list);
	}
	
	/**
	 * execute batch operation for given queryId.
     * @param queryId
     * 		query id to execute in query mapping file.
	 * @param dataSet
	 * 		DataSet
	 * @param param
	 * 		Map contains search conditions.
	 * @return
	 * 		total count of executed query operation.
	 * @throws QueryServiceException
	 */
	public int batchExecute(String queryId, DataSet dataSet, Map param) throws QueryServiceException{
		int dsSize = dataSet.size();
		List list = new ArrayList(); 
		
		for(int count = 0 ; count < dsSize ; count++){
			DataRow dr = (DataRow) dataSet.get(count);
			Object[] row = convertParams(dr, param);
			list.add(row);
		}
		
		return batchUpdateCount(queryService.batchUpdate(queryId, list));
	}
	
	/**
	 * This is the method for inserting, updating and deleting using DataSet.
	 * @param dataSet
	 * 		DataSet object including query id.
	 * @param param
	 * 		param including query condition.
	 * @return
	 * 		Map including result count for each queryId.
	 * @throws QueryServiceException
	 * 		if there is any problem executing the query
	 */
	public Map saveAll(DataSet dataSet, Map param) throws QueryServiceException{
		List insertList  = new ArrayList<Map>();
		List updateList  = new ArrayList<Map>();
		List deleteList  = new ArrayList<Map>();
		
		int dsSize = dataSet.size();
		
		for( int i = 0 ; i < dsSize ; i ++ ){
			DataRow dr = (DataRow)dataSet.get(i); 
			if(dr.ROWTYPE.equals("D")) {
				Object[] deleteRow = convertParams(dr, param);
				deleteList.add(deleteRow);
			}else if( dr.ROWTYPE.equals("I") ){
				Object[] insertRow = convertParams(dr, param);
				insertList.add(insertRow);
			}else if( dr.ROWTYPE.equals("U") ){
				Object[] updateRow = convertParams(dr, param);
				updateList.add(updateRow);
			}
		}
		
		Map resultMap = new HashMap<String, Integer>();
		
		if(deleteList.size() != 0){
			resultMap.put( dataSet.deleteQueryId, batchUpdateCount(batchUpdate(dataSet.deleteQueryId, deleteList) )) ;
		}
		
		if(insertList.size() != 0){
			resultMap.put( dataSet.insertQueryId, batchUpdateCount(batchUpdate(dataSet.insertQueryId, insertList) ));
		}
		
		if(updateList.size() != 0){
			resultMap.put( dataSet.updateQueryId, batchUpdateCount(batchUpdate(dataSet.updateQueryId, updateList) ));
		}
		
		return resultMap;
	}

	
	private int batchUpdateCount(int[] cnt){
		int sum = 0;
		for(int arrayLength = 0 ; arrayLength < cnt.length ; arrayLength++){
			sum += cnt[arrayLength];
		}
		return sum;
	}
	
	private Object[] convertParams(Map targetMap) {
		Object[] params = new Object[targetMap.size()];
		Iterator targetMapIterator = targetMap.entrySet().iterator();
		int i = 0;
		while (targetMapIterator.hasNext()) {
			Map.Entry entry = (Map.Entry) targetMapIterator.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}
		return params;
	}
	
	private Object[] convertParams(Map targetMap1, Map targetMap2) {
		Object[] params = new Object[targetMap1.size() + targetMap2.size()];
		Iterator targetMapIterator1 = targetMap1.entrySet().iterator();
		Iterator targetMapIterator2 = targetMap2.entrySet().iterator();
		int i = 0;
		while (targetMapIterator1.hasNext()) {
			Map.Entry entry = (Map.Entry) targetMapIterator1.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}
		
		while (targetMapIterator2.hasNext()) {
			Map.Entry entry = (Map.Entry) targetMapIterator2.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}
		return params;
	}
	
	private Object[] convertParams(Object targetObj) {
		return new Object[] { new Object[] { variableName, targetObj } };
	}
}