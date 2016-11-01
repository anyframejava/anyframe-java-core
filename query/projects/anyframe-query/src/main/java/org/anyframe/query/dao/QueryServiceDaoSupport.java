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
package org.anyframe.query.dao;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.exception.QueryException;

/**
 * This is a Wrapper class in order to use with the QueryService API easily The
 * approaching logic for the data is handled by inheriting this class in each of
 * the DAO class.
 * 
 * @author Junghwan Hong
 * @since 1.1.3
 */
public class QueryServiceDaoSupport {
	private String variableName = "vo";

	private QueryService queryService;

	public QueryService getQueryService() {
		return queryService;
	}

	public void setQueryService(QueryService queryService) {
		this.queryService = queryService;
	}

	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}

	/**
	 * Issue update statement (INSERT, UPDATE, DELETE) using JDBC 2.0 batch
	 * updates and named parameter to set values on a dynamic Query created by
	 * this method.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetList
	 *            a set of variable for executing query (is the List of Object
	 *            or Map)
	 * @return an array of the number of rows affected by each statement
	 * @throws QueryException
	 *             if there is any problem issuing the update
	 */
	protected int[] batchUpdate(String queryId, List<?> targetList) {
		return queryService.batchUpdate(queryId, targetList);
	}

	/**
	 * Execute the INSERT query statement using the targetObject including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryID
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            including the needed inputed name at query execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int create(String queryId, Object targetObj) {
		Object[] params = convertParams(targetObj);
		return create(queryId, params);
	}

	/**
	 * Execute the INSERT query statement by targetMap including the inputed
	 * value, queryId which defined in query mappings. At execution of the
	 * appropriate query statement, extract the object included in the Map and
	 * for each object's variable name, define as the key of appropriate object
	 * inside the Map
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            Map including the needed inputed value at the query execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int create(String queryId, Map<String, ?> targetMap) {
		Object[] params = convertParams(targetMap);
		return create(queryId, params);
	}

	/**
	 * Execute the INSERT query statement using the two targetObject including
	 * the inputed value, queryId which defined in query mappings. At the
	 * execution of the appropriate query statement, first, the targetObject's
	 * variable name adds 1 to the defined variableNmae(default='vo'), the
	 * second targetObject's variable name adds 2 to the defined variableName.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj1
	 *            The first object including the needed input value at the query
	 *            execution
	 * @param targetObj2
	 *            The second object including the needed input value at the
	 *            query execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int create(String queryId, Object targetObj1, Object targetObj2) {
		Object[] params = convertParams(targetObj1, targetObj2);
		return create(queryId, params);
	}

	/**
	 * Execute the INSERT query statement using the targetList including the
	 * inputed value, queryId which defined in query mappings. At the
	 * execution of appropriate query statement, extract the object included in
	 * the List and afterwards, define as (variableName + order) type by
	 * reflecting the extracted order for the object's variable name.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetList
	 *            List including the needed input object at the query execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int create(String queryId, List<?> targetList) {
		Object[] params = convertParams(targetList);
		return create(queryId, params);
	}

	/**
	 * Execute the INSERT query statement using the Object array including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            Object Array including the needed input object at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int create(String queryId, Object[] targetObjs) {
		return queryService.create(queryId, targetObjs);
	}

	/**
	 * Execute the UPDATE query statement using the targetObject including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            Object including the needed input object at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int update(String queryId, Object targetObj) {
		Object[] params = convertParams(targetObj);
		return update(queryId, params);
	}

	/**
	 * Execute the UPDATE query statement using the targetMap including the
	 * inputed value, queryId which defined in query mappings. At the
	 * execution of the appropriate query statement, extract the object included
	 * in the Map at the execution of the appropriate query statement
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            The map including the needed input value at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int update(String queryId, Map<String, ?> targetMap) {
		Object[] params = convertParams(targetMap);
		return update(queryId, params);
	}

	/**
	 * Execute the UPDATE query statement using the targetList including the
	 * inputed value, queryId which defined in query mappings. Define as
	 * (variableName+order) type by reflecting the extracted order for the
	 * variable name of the object
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetList
	 *            List including the needed input variable at the execution of
	 *            the query
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int update(String queryId, List<?> targetList) {
		Object[] params = convertParams(targetList);
		return update(queryId, params);
	}

	/**
	 * Execute the UPDATE query statement using the two targetObject including
	 * the input value, queryId which defined in query mappings. At execution
	 * of the appropriate query statement, the first targetObject's variable
	 * name adds 1 to defined variableName(default='vo'), for the second
	 * targetObject's variable, 2 is added to the defined variableName.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj1
	 *            first object including the needed input value at the execution
	 *            of the query statement
	 * @param targetObj2
	 *            Second object including the needed input value at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int update(String queryId, Object targetObj1, Object targetObj2) {
		Object[] params = convertParams(targetObj1, targetObj2);
		return update(queryId, params);
	}

	/**
	 * Execute the UPDATE query statement using the object array including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            Object Array including the needed input value at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int update(String queryId, Object[] targetObjs) {
		return queryService.update(queryId, targetObjs);
	}

	/**
	 * Execute the DELETE query statement using the targetObject including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            Object including the needed input value at the query
	 *            execution.
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int remove(String queryId, Object targetObj) {
		Object[] params = convertParams(targetObj);
		return remove(queryId, params);
	}

	/**
	 * Execute the DELETE query statement using the targetMap including the
	 * inputed value, queryId which defined in query mappings. At the
	 * execution of appropriate query statement, after the extraction of the
	 * object from the Map, for each object's variable name, define as key of
	 * appropriate object included in the map.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            the Map including the needed input value at the execution of
	 *            query statement
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int remove(String queryId, Map<String, ?> targetMap) {
		Object[] params = convertParams(targetMap);
		return remove(queryId, params);
	}

	/**
	 * Execute the DELETE query statement using the two targetObject including
	 * the input value, queryId which defined in query mappings. At execution
	 * of the appropriate query statement, the first targetObject's variable
	 * name adds 1 to defined variableName(default='vo'), for the second
	 * targetObject's variable, 2 is added to the defined variableName.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj1
	 *            first object including the needed input value at the execution
	 *            of the query statement
	 * @param targetObj2
	 *            Second object including the needed input value at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int remove(String queryId, Object targetObj1, Object targetObj2) {
		Object[] params = convertParams(targetObj1, targetObj2);
		return remove(queryId, params);
	}

	/**
	 * Execute the DELETE query statement using the targetList including the
	 * input value, queryId which defined in query mappings. Define as
	 * (variableName + order) type reflecting the extraction order for the
	 * variable name of each object after extracting the object included in the
	 * List at the execution of the appropriate query statement.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            the List including the needed input value at query execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int remove(String queryId, List<?> targetObjs) {
		Object[] params = convertParams(targetObjs);
		return remove(queryId, params);
	}

	/**
	 * Execute the DELETE query statement using the Object array including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            Object Array including the needed input value at the query
	 *            execution
	 * @return the number of rows affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected int remove(String queryId, Object[] targetObjs) {
		return queryService.remove(queryId, targetObjs);
	}

	/**
	 * Execute the SELECT query statement for unitary query using the
	 * targetObject including the inputed value, queryId which defined in
	 * query mappings.
	 * 
	 * @param tableName
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            Object including the needed input value of query execution
	 * @return unitary querying result. Transmits the Null in the case the query
	 *         result value is non-existent.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	protected <T> T findByPk(String queryId, Object targetObj) {
		Object[] params = convertParams(targetObj);
		return (T)findByPk(queryId, params);
	}

	/**
	 * Execute the SELECT query statement for unitary query using the targetMap
	 * including the inputed value, queryId which defined in query mappings.
	 * Define as key of the appropriate object included in the map for the
	 * variable name of each object.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            Map including the needed input value at the query execution
	 * @return unitary querying result. Transmits the Null in the case the query
	 *         result value is non-existent.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	protected <T> T findByPk(String queryId, Map<String, ?> targetMap) {
		Object[] params = convertParams(targetMap);
		return (T)findByPk(queryId, params);
	}

	/**
	 * Execute the SELECT query statement for unitary query using the targetList
	 * including the inputed value, queryId which defined in query mappings.
	 * Define key as (variableName + order) type by reflecting the extraction
	 * order for the variable name of each object after extracting object
	 * included in the List at the appropriate query statement.
	 * 
	 * @param queryId
	 * @param targetList
	 *            the List including the needed input value at the query
	 *            execution
	 * @return unitary querying result. Transmits the Null in the case the query
	 *         result value is non-existent.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	@SuppressWarnings("unchecked")
	protected <T> T findByPk(String queryId, List<?> targetList) {
		Object[] params = convertParams(targetList);
		return (T)findByPk(queryId, params);
	}

	/**
	 * Execute the SELECT query statement for unitary query using the Object
	 * array including the variable value, queryId which defined in mapping xml
	 * files.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            Object Array including the needed inputed value at the query
	 *            execution
	 * @return unitary querying result. Transmits the Null in the case the query
	 *         result value is non-existent.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected <T> T findByPk(String queryId, Object[] targetObjs) {
		List<T> list = queryService.find(queryId, targetObjs);

		if (list == null || list.size() == 0)
			return null;
		return list.iterator().next();
	}

	/**
	 * Execute the SELECT query statement using the targetObject including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            Object including the needed input value at query execution
	 * @return Object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected <T> List<T> findList(String queryId, Object targetObj) {
		Object[] params = convertParams(targetObj);
		return queryService.find(queryId, params);
	}

	/**
	 * Execute the SELECT query statement using the targetMap including the
	 * input value, queryId which defined in query mappings. Define as key of
	 * the appropriate object included in the Map for the variable name of each
	 * object after extracting the object included in the map at the query
	 * execution.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            the Map including the needed inputed value at the query
	 *            execution
	 * @return Object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected <T> List<T> findList(String queryId, Map<String, ?> targetMap) {
		Object[] params = convertParams(targetMap);
		return queryService.find(queryId, params);
	}

	/**
	 * Execute the SELECT query statement using the targetList including the
	 * inputed value, queryId which defined in query mappings. Define key as
	 * (variableName + order) type in reflecting the extraction order for the
	 * variable name of each object after extracting the object included in the
	 * List at the query execution time.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            the List including the needed input object at the query
	 *            execution
	 * @return the object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected <T> List<T> findList(String queryId, List<?> targetObjs) {
		Object[] params = convertParams(targetObjs);
		return queryService.find(queryId, params);
	}

	/**
	 * Execute the SELECT query statement using the Object array including the
	 * inputed value, queryId which defined in query mappings.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            Object Array including the needed input value at query
	 *            execution
	 * @return Object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected <T> List<T> findList(String queryId, Object[] targetObjs) {
		return queryService.find(queryId, targetObjs);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex and pageSize
	 * including the paging info and targetObject including the inputed value,
	 * queryId which defined in query mappings. Tranmits the result as
	 * anyframe.common.Page's object type handled in paginavigator tag for
	 * supporting for the ease at developing of the UI. In order to obtain the
	 * result handled in the paging, the pageIndex and pageSize have to be 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            the object included in the needed input variable at the query
	 *            execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @return the page object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId, Object targetObj,
			int pageIndex, int pageSize) {
		return findListWithPaging(queryId, targetObj, pageIndex, pageSize, 10);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex, pageSize and
	 * pageUnit containing the paging info and targObject including the inputed
	 * value, queryId which defined in query mappings. Transmit by changing
	 * as anyframe.common.Page's object type handled in paginavigator tag for
	 * providing ease in the developing of UI for the result. In order to obtain
	 * the result from paging, the pageIndex, pageSize have to be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObj
	 *            the object including the inputed name at the query execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @param pageUnit
	 *            page unit which expected to be displayed.
	 * @return the Page object including the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId, Object targetObj,
			int pageIndex, int pageSize, int pageUnit) {
		Object[] params = convertParams(targetObj);
		return findListWithPaging(queryId, params, pageIndex, pageSize,
				pageUnit);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex and pageSize
	 * containing the paging info and targetMap including the inputed value,
	 * queryId which defined in query mappings. Define as the appropriate
	 * object's key value included in the Map for the variable name of each
	 * object after extracting the object included in the Map at the execution
	 * of appropriate query statement. Transmit by changing as
	 * anyframe.common.Page object type handled in the paginavigator tag for
	 * providing ease in developing of the UI for the execution result (page
	 * unit is set as 10). In order to obtain the result handled by paging, the
	 * pageIndex and pageSize have to be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            the Map including the needed inputed value at the query
	 *            execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @return the Page object including the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId,
			Map<String, ?> targetMap, int pageIndex, int pageSize) {
		return findListWithPaging(queryId, targetMap, pageIndex, pageSize, 10);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex, pageSize and
	 * pageUnit including the paging info, and targetMap including the inputed
	 * value, queryId which defined in query mappings. Transmit by changing
	 * anyframe.common.Page object value handled in the paginavigator tag for
	 * supporting ease at the developing of UI for the execution result. In
	 * order to obtain the result handled with paging. the pageIndex and
	 * pageSize have to be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetMap
	 *            the Map including the needed input value at the query
	 *            execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @param pageUnit
	 *            page unit which expected to be displayed.
	 * @return the Page object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId,
			Map<String, ?> targetMap, int pageIndex, int pageSize,
			int pageUnit) {
		Object[] params = convertParams(targetMap);
		return findListWithPaging(queryId, params, pageIndex, pageSize,
				pageUnit);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex, pageSize and
	 * targetList including the inputed value, queryId which defined in query mappings. Define key as (variableName + order) type in reflecting the
	 * extraction order for variable name of each object after extracting the
	 * object included in the List at the execution of handled query. Transmit
	 * by changing as anyframe.common.Page object handled the paginavigator tags
	 * for supporting ease at the developing of UI for the execution result
	 * (page unit is set as 10.) In order to obtain the result handled with
	 * paging, the pageIndex, and pageSize have to be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            the List including the inputed object at the query execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @return the Page object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId, List<?> targetObjs,
			int pageIndex, int pageSize) {
		return findListWithPaging(queryId, targetObjs, pageIndex, pageSize, 10);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex and pageSize
	 * including the paging info, targetList including the inputed value,
	 * queryId which defined in query mappings. Define key as (variableName +
	 * order) type in reflecting the extraction order for the variable name of
	 * each object after extracting the object included in the List at the query
	 * execution. Trasmit by changing as anyframe.common.Page object type
	 * handled in paginavigator rag for supporting ease at developing of UI for
	 * the execution result. In order to handle the paging, the pageIndex and
	 * pageSize have to be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            the List including the needed input object at query execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @param pageUnit
	 *            page unit which expected to be displayed.
	 * @return the Page object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId, List<?> targetObjs,
			int pageIndex, int pageSize, int pageUnit) {
		Object[] params = convertParams(targetObjs);
		return findListWithPaging(queryId, params, pageIndex, pageSize,
				pageUnit);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex and pageSize
	 * including the paging info and Object array including the inputed value,
	 * queryId which defined in query mappings. Transmit by changing the
	 * anyframe.common.Page variable type handled in paginavigator tag for
	 * supporting ease at developing of UI for the execution result. (page unit
	 * is set as 10). In order to obtain the result handled in the paging, the
	 * pageIndex and pageSize have to be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            the Object Array including the needed query info at query
	 *            execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @return the Page object containing the query result.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId, Object[] targetObjs,
			int pageIndex, int pageSize) {
		return findListWithPaging(queryId, targetObjs, pageIndex, pageSize, 10);
	}

	/**
	 * Execute the SELECT query statement using the pageIndex and pageSize
	 * including the paging info and Object order including the variable name,
	 * queryId which defined in query mappings. Transmit by changing as
	 * anyframe.common.Page object type handled in the paginavigator tag for
	 * supporting ease of developing of UI for the execution result. In order to
	 * obtain the result handled in paging, the pageIndex and pageSize have to
	 * be bigger than 0.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param targetObjs
	 *            the Object Array including the needed inputed value at the
	 *            query execution
	 * @param pageIndex
	 *            page number which expected to be displayed.
	 * @param pageSize
	 *            maximum number of data that can be displayed.
	 * @param pageUnit
	 *            page unit which expected to be displayed.
	 * @return the Page object containing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	protected Page findListWithPaging(String queryId, Object[] targetObjs,
			int pageIndex, int pageSize, int pageUnit) {
		Map<String, Object> queryMap = null;
		queryMap = queryService.findWithRowCount(queryId, targetObjs,
				pageIndex, pageSize);
		List<?> resultList = (List<?>) queryMap.get(QueryService.LIST);
		int totalSize = ((Long) queryMap.get(QueryService.COUNT)).intValue();
		return new Page(resultList, (new Integer(pageIndex)).intValue(),
				totalSize, pageUnit, pageSize);
	}

	/**
	 * Set in the Object array the targetObject using the defined variableName's
	 * key.
	 * 
	 * @param targetObj
	 *            the Object including the needed inputed value at the query
	 *            execution
	 * @return [variableName, targetObj] type Object Array
	 */
	private Object[] convertParams(Object targetObj) {
		return new Object[] { new Object[] { variableName, targetObj } };
	}

	/**
	 * Set in the Object array the targetObject and targObj2 using as the key
	 * the combined phrases in the defined variableName
	 * 
	 * @param targetObj1
	 *            first Object including the needed inputed value at the query
	 *            execution
	 * @param targetObj2
	 *            second Object including the needed inputed value at the query
	 *            execution
	 * @return [[variableName1, targetObj1],[variableName2, targetObj2]] type
	 *         Object Array
	 */
	private Object[] convertParams(Object targetObj1, Object targetObj2) {
		return new Object[] { new Object[] { variableName + "1", targetObj1 },
				new Object[] { variableName + "2", targetObj2 } };
	}

	/**
	 * Set in the Object array the appropriate objects using the key included in
	 * the Map.
	 * 
	 * @param targetObj
	 *            the Map including the inputed value needed at the query
	 *            execution
	 * @return [[key1, value1],[key2, value2],...] type Object Array
	 */
	@SuppressWarnings("unchecked")
	private Object[] convertParams(Map<String, ?> targetMap) {
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

	/**
	 * Set in the Object array the appropriate objects, take as the key the
	 * (vriableName + order) type's phrases in reflecting the extraction order
	 * in the defined variableName after extracting the object included in the
	 * List
	 * 
	 * @param targetList
	 *            the List including the needed inputed value at query execution
	 * @return [[variableName1, value1],[variableName2, value2],...] type Object
	 *         Array
	 */
	private Object[] convertParams(List<?> targetList) {
		Object[] params = new Object[targetList.size()];
		for (int i = 0, size = targetList.size(); i < size; i++) {
			params[i] = new Object[] { variableName + (i + 1),
					targetList.get(i) };
		}
		return params;
	}
}
