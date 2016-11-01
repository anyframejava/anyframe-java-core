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
package org.anyframe.flex.query.service;

import java.util.List;
import java.util.Map;

import org.anyframe.flex.query.data.DataRow;
import org.anyframe.flex.query.data.DataSet;

/**
 * This interface is a common biz. service in developing the
 * presentation layer using Flex which is the RIA solution of the
 * Adobe.
 * @author Jonghoon Kim
 *
 */
public interface FlexService {
	
	/**
	 * This is a method for querying at developing the
     * screen using RIA
	 * @param dataSetList
	 * 		The Dataset list including the query id or query condition etc.
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem getting the DataSet list
     */ 
	public List<DataSet> findList(List<DataSet> dataSetList, Map<String, Object> param) throws Exception ;

	/**
	 * This is a method for querying at developing the
     * screen using RIA with paging navigator.
	 * @param dataSetList
	 * 		The Dataset list including the query id or query condition etc.
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem getting the DataSet list
     */ 
	public List<DataSet> findPagingList(List<DataSet> dataSetList, Map<String, Object> param) throws Exception ;
	
	/**
     * This is the method for inserting, updating and deleting using DataSet.
     * @param dataSetList
	 * 		The Dataset list including query conditions
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem inserting, updating, and deleting using DataSet
     */   
	public Map<String, Map<String,Integer>> saveAll(List<DataSet> dataSetList, Map<String, Object> param) throws Exception ;
	
	/**
	 * This method execute an update query defined into DataSet.
     * @param dataSetList
	 * 		The Dataset list including query conditions
	 * @param param
	 * 		parameters including query condition.
	 * @throws Exception
	 *		if there is any problem updating the data
	 */
	public Map<String, Integer> updateRows(List<DataSet> dataSetList, Map<String, Object> param) throws Exception ;
	
	/**
	 * This method execute a delete query defined into DataSet.
     * @param dataSetList
	 * 		The Dataset list including query conditions
	 * @param param
	 * 		parameters including query condition.
	 * @throws Exception
	 *		if there is any problem deleting the data
	 */	
	public Map<String, Integer> removeRows(List<DataSet> dataSetList, Map<String, Object> param) throws Exception;
	
	/**
	 * This method execute an insert query defined into DataSet.
     * @param dataSetList
	 * 		The Dataset list including query conditions
	 * @param param
	 * 		parameters including query condition.
	 * @throws Exception
	 *		if there is any problem inserting the data
	 */
	public Map<String, Integer> insertRows(List<DataSet> dataSetList, Map<String, Object> param) throws Exception;
	
	/**
	 * This method is for using user defined business logic.
	 * currently it executes nothing.
     * @param dataSetList
	 * 		The Dataset list including query conditions
	 * @param param
	 * 		parameters including query condition.
	 * @throws Exception
	 *		if there is any problem
	 */
	public Map<String, Object> doService(List<DataSet> dataSetList, Map<String, Object> param) throws Exception;
	
	/**
     * This is the method for inquiring using DataSet.
     * @param queryId
	 * 		identifier of query statement to execute
	 * @param dataRow
	 * 		The Datarow including query condition
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem getting the data
     */  
	public Map<String, Object> find(String queryId, DataRow dataRow, Map<String, Object> param) throws Exception;
	
	/**
     * This is a method for querying using the Dataset for insert.
     * @param queryId
	 * 		identifier of query statement to execute
	 * @param dataRow
	 * 		The Datarow including query condition
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem inserting the data
     */   
	public Map<String, Integer> create(String queryId, DataRow dataRow, Map<String, Object> param) throws Exception;
	
	/**
     * This is the method for updating using VariableList and Dataset.
     * @param queryId
	 * 		identifier of query statement to execute
	 * @param dataRow
	 * 		The Datarow including query condition
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem updating the data
     */  
	public Map<String, Integer> update(String queryId, DataRow dataRow, Map<String, Object> param) throws Exception;
	
	/**
     * This is the method for deleting using VariableList and Dataset.
     * @param queryId
	 * 		identifier of query statement to execute
	 * @param dataRow
	 * 		The Datarow including query condition
	 * @param param
	 * 		param including query condition.
	 * @throws Exception
	 *		if there is any problem deleting the data
     */   
	public Map<String, Integer> remove(String queryId, DataRow dataRow, Map<String, Object> param) throws Exception;
}
