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
package org.anyframe.np.query;

import java.io.PrintWriter;
import java.util.Map;

import org.anyframe.query.exception.QueryException;
import org.anyframe.np.query.NPActionCommand;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.VariableList;

/**
 * This is the interface used for manipulating database in developing the
 * presentation layer using NEXACRO which is the RIA solution of the TOBE
 * Software company.
 * <p>
 * In order to use NPQueryService the
 * org.anyframe.query.ria.AbstractRiaQueryService</code> class has to be
 * registered as Bean.
 * </p>
 * NPQueryService Configuration Example:
 * 
 * <pre>
 * &lt;bean id="npQueryService" class="org.anyframe.np.query.impl.NPQueryServiceImpl"&gt;
 *     &lt;property name="lobHandler" ref="lobHandler"/&gt;
 *     &lt;property name="sqlRepository" ref="sqlLoader"/&gt;
 *     &lt;lookup-method name="getRowCallbackHandler" bean="rowCallbackHandler"/&gt;
 *     &lt;lookup-method name="getCallableStatementCallbackHandler" bean="callableStatementCallbackHandler"/&gt;
 *     &lt;lookup-method name="getPrintWriterRowCallbackHandler" bean="printWriterRowCallbackHandler"/&gt;
 * &lt;/bean&gt;	
 * 	
 * &lt;bean id="callableStatementCallbackHandler" class="org.anyframe.np.query.impl.jdbc.mapper.NPCallableStatementCallbackHandler" scope="prototype"/&gt;
 * 	
 * &lt;bean id="rowCallbackHandler" class="org.anyframe.np.query.impl.jdbc.mapper.NPDataSetCallbackHandler" scope="prototype"/&gt;
 * 	
 * &lt;bean id="printWriterRowCallbackHandler" class="org.anyframe.np.query.impl.jdbc.mapper.NPPrintWriterCallbackHandler" scope="prototype"/&gt;
 * 	 
 * &lt;!-- The original JdbcTemplate definition --&gt;
 * &lt;bean id="pagingNamedParamJdbcTemplate" class="org.anyframe.query.impl.jdbc.PagingNamedParamJdbcTemplate"&gt;
 *     &lt;constructor-arg ref="pagingJdbcTemplate"/&gt;
 * &lt;/bean&gt; 
 *     
 * &lt;bean id="pagingJdbcTemplate" class="org.anyframe.query.impl.jdbc.PagingJdbcTemplate"&gt;
 *     &lt;property name="dataSource" ref="dataSource"/&gt;
 * 	   &lt;property name="exceptionTranslator" ref="exceptionTranslator"/&gt;
 *     &lt;property name="paginationSQLGetter" ref="pagingSQLGenerator"/&gt;
 * &lt;/bean&gt;
 *     
 * &lt;bean id="pagingSQLGenerator" class="org.anyframe.query.impl.jdbc.generator.OraclePagingSQLGenerator"/&gt;
 *     
 *     
 * &lt;!--  SqlLoader --&gt;
 * &lt;bean name="sqlLoader" class="org.anyframe.query.impl.config.loader.MappingXMLLoader"&gt;
 *     &lt;property name="mappingFiles"&gt;
 *         &lt;value&gt;classpath:/mappings/testcase-*.xml&lt;/value&gt;
 *     &lt;/property&gt;	
 *     &lt;property name="nullchecks"&gt;
 *         &lt;map&gt;
 *             &lt;entry key="VARCHAR" value=""/&gt;
 *         &lt;/map&gt;
 *     &lt;/property&gt;	    
 *     &lt;property name="skipError" value="true" /&gt;				
 * &lt;/bean&gt;
 * </pre>
 * 
 * <p>
 * The NPQueryService's configuration has <code>riaQueryService</code>,
 * <code>sqlRepository</code>.
 * </p>
 * 
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public interface NPQueryService {
	String QUERY_INSERT = DataSet.ROW_TYPE_NAME_INSERTED;

	String QUERY_UPDATE = DataSet.ROW_TYPE_NAME_UPDATED;

	String QUERY_DELETE = DataSet.ROW_TYPE_NAME_DELETED;

	/**
	 * This is a method for querying using the VariableList
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param variableList
	 *            VariableList including the query conditions
	 * @return DataSet of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	DataSet search(String queryId, VariableList variableList)
			throws QueryException;

	/**
	 * This is a method for querying with paging using the VariableList
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param variableList
	 *            VariableList including the query conditions
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @return DataSet of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	DataSet search(String queryId, VariableList variableList, int pageIndex,
			int pageSize) throws QueryException;

	/**
	 * This is a method for querying using the DataSet
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @return DataSet of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	DataSet search(String queryId, DataSet dataSet) throws QueryException;

	/**
	 * This is the method at querying using the VariableList. The return value
	 * is <code>void</code> because the query result is put to the screen as
	 * Stream using PrintWriter. At large scale querying, this is recommended.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param variableList
	 *            the VariableList including the query conditions
	 * @param pageIndex
	 *            page number which expected to be displayed (pageIndex > 0)
	 * @param pageSize
	 *            page size which expected to be displayed per page (pageSize >
	 *            0)
	 * @param dataSetName
	 *            the id of DataSet for saving the query result
	 * @param writer
	 *            the PrintWriter object for writing the query result
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	void search(String queryId, VariableList variableList, int pageIndex,
			int pageSize, String dataSetName, PrintWriter writer)
			throws QueryException;

	/**
	 * This is a method for querying using the DataSet for paging
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param dataSet
	 *            the DataSet including the query conditions, page
	 *            index("pageIndex") and page size("pageSize").
	 * @return DataSet of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	DataSet searchWithPaging(String queryId, DataSet dataSet)
			throws QueryException;

	/**
	 * This is the method for inserting, updating and deleting the unitary data
	 * using the VariableList.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param variableList
	 *            the VariableList including the query conditions
	 * @return the number of records affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	int update(String queryId, VariableList variableList) throws QueryException;

	/**
	 * This is the method for inserting, updating and deleting using
	 * VariableList and DataSet.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param variableList
	 *            the VariableList including the query conditions
	 * @param queryMap
	 *            the map with status of row and query identifier. For insert
	 *            status, the Map's key is insert, update status is update,
	 *            delete status is delete. We decide the query id executed in
	 *            using the Status value because in the DataSet the value of
	 *            appropriate record's Status is set.
	 * @param paramDataSet
	 *            the DataSet including the query conditions
	 * @return the number of records affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	int update(String queryId, VariableList variableList, Map<String, String> queryMap,
			DataSet paramDataSet) throws QueryException;

	/**
	 * This is for inserting, updating and deleting using VariableList and
	 * DataSet. The INPActionCommand's implemented class containing the needed
	 * business logic is executed Before/after manipulating a database.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param variableList
	 *            the VariableList including the query conditions
	 * @param queryMap
	 *            the map with status of row and query identifier. For insert
	 *            status, the Map's key is insert, update status is update,
	 *            delete status is delete. We decide the query id executed in
	 *            using the Status value because in the DataSet the value of
	 *            appropriate record's Status is set.
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @param actionCommand
	 *            the NPActionCommand including the business logic before/after
	 *            the insert, update, delete execution.
	 * @return the number of records affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	int update(String queryId, VariableList variableList, Map<String, String> queryMap,
			DataSet dataSet, NPActionCommand actionCommand)
			throws QueryException;

	/**
	 * the method for inserting, updating and deleting using the DataSet to the
	 * database.
	 * 
	 * @param queryMap
	 *            the map with status of row and query identifier. For insert
	 *            status, the Map's key is insert, update status is update,
	 *            delete status is delete. We decide the query id executed in
	 *            using the Status value because in the DataSet the value of
	 *            appropriate record's Status is set.
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @return the number of records affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	int update(Map<String, String> queryMap, DataSet dataSet) throws QueryException;

	/**
	 * This is the method for inserting, updating and deleting using the DataSet
	 * to the database. The INPActionCommand's implemented class containing the
	 * needed business logic is executed Before/after manipulating a database.
	 * 
	 * @param queryMap
	 *            the map with status of row and query identifier. For insert
	 *            status, the Map's key is insert, update status is update,
	 *            delete status is delete. We decide the query id executed in
	 *            using the Status value because in the DataSet the value of
	 *            appropriate record's Status is set.
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @param actionCommand
	 *            the NPActionCommand including the business logic before/after
	 *            the insert, update, delete execution.
	 * @return the number of records affected
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	int update(Map<String, String> queryMap, DataSet dataSet, NPActionCommand actionCommand)
			throws QueryException;

	/**
	 * Method for inserting using JDBC 2.0 batch updates
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @return total count
	 * @throws QueryException
	 *             fail to execute batchUpdate
	 */
	int batchCreate(String queryId, DataSet dataSet) throws QueryException;

	/**
	 * Method for updating using JDBC 2.0 batch updates
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @return total count
	 * @throws QueryException
	 *             fail to execute batchUpdate
	 */
	int batchUpdate(String queryId, DataSet dataSet) throws QueryException;

	/**
	 * Method for removing using JDBC 2.0 batch updates
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @return total count
	 * @throws QueryException
	 *             fail to execute batchUpdate
	 */
	int batchRemove(String queryId, DataSet dataSet) throws QueryException;

	/**
	 * This is the method for executing callablestatement using the DataSet to
	 * the database.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @return DataSet of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	DataSetList execute(String queryId) throws QueryException;

	/**
	 * This is the method for executing callablestatement using the DataSet to
	 * the database.
	 * 
	 * @param queryId
	 *            identifier of query statement to execute
	 * @param dataSet
	 *            the DataSet including the query conditions
	 * @return DataSet of extracted out parameters
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	DataSetList execute(String queryId, DataSet dataSet) throws QueryException;
}
