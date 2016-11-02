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
package org.anyframe.np.query.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.anyframe.np.query.NPActionCommand;
import org.anyframe.np.query.NPQueryService;
import org.anyframe.query.exception.QueryException;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.VariableList;

/**
 * This class provides methods to send pre-defined queries to Database.
 * 
 * @author Youngmin Jo
 * 
 */
public class NPDao { 

	public final short TYPE_NORMAL = DataSet.ROW_TYPE_NORMAL;
	public final short TYPE_INSERT = DataSet.ROW_TYPE_INSERTED;
	public final short TYPE_UPDATE = DataSet.ROW_TYPE_UPDATED;
	public final short TYPE_DELETE = DataSet.ROW_TYPE_DELETED;

	private final NPQueryService npQueryService;

	public NPDao(NPQueryService npQueryService) {
		this.npQueryService = npQueryService;
	}

	/**
	 * This is the method for selecting using primary key(String).
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param primaryKey
	 *            primary key value
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public DataSet get(String queryId, String primaryKey) throws QueryException {
		VariableList inVl = new VariableList();
		inVl.add("primaryKey", primaryKey);
		return npQueryService.search(queryId, inVl);
	}

	/**
	 * This is the method for selecting using VariableList.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inVl
	 *            VariableList contains key word to search.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public DataSet get(String queryId, VariableList inVl) throws QueryException {
		return npQueryService.search(queryId, inVl);
	}

	/**
	 * This is the method for selecting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains key word to search.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public DataSet getList(String queryId, DataSet dataSet)
			throws QueryException {
		return npQueryService.search(queryId, dataSet);
	}

	/**
	 * This is the method for selecting using VariableList.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inVl
	 *            VariableList contains key word to search.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public DataSet getList(String queryId, VariableList inVl)
			throws QueryException {
		return npQueryService.search(queryId, inVl);
	}

	/**
	 * This is the method for selecting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains key word to search and pageIndex, pageUnit.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public DataSet getPagingList(String queryId, DataSet dataSet)
			throws QueryException {
		return npQueryService.searchWithPaging(queryId, dataSet);
	}

	/**
	 * This is the method for inserting using VariableList.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inVl
	 *            VariableList contains record to insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, VariableList inVl) throws QueryException {
		return npQueryService.update(queryId, inVl);
	}

	/**
	 * This is the method for inserting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records to insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, DataSet dataSet) throws QueryException {
		return create(queryId, dataSet, null);
	}

	/**
	 * This is the method for inserting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records to insert.
	 * @param actionCommand
	 *            NPActionCommand contains biz. logic pre or post insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, DataSet dataSet,
			NPActionCommand actionCommand) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_INSERT, dataSet);
		queryMap.put(NPQueryService.QUERY_INSERT, queryId);
		return saveAll(queryMap, dataSet, actionCommand);
	}

	/**
	 * This is the method for removing using VariableList.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inVl
	 *            VariableList contains record to remove.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(String queryId, VariableList inVl) throws QueryException {
		return npQueryService.update(queryId, inVl);
	}

	/**
	 * This is the method for removing using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records to remove.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(String queryId, DataSet dataSet) throws QueryException {
		return remove(queryId, dataSet, null);
	}

	/**
	 * This is the method for removing using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records to remove.
	 * @param actionCommand
	 *            NPActionCommand contains biz. logic pre or post remove.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(String queryId, DataSet dataSet,
			NPActionCommand actionCommand) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_DELETE, dataSet);
		queryMap.put(NPQueryService.QUERY_DELETE, queryId);
		return saveAll(queryMap, dataSet, actionCommand);
	}

	/**
	 * This is the method for updating using VariableList.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inVl
	 *            VariableList contains record to update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, VariableList inVl) throws QueryException {
		return npQueryService.update(queryId, inVl);
	}

	/**
	 * This is the method for updating using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records to update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, DataSet dataSet) throws QueryException {
		return update(queryId, dataSet, null);
	}

	/**
	 * This is the method for updating using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records to update.
	 * @param actionCommand
	 *            NPActionCommand contains biz. logic pre or post update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, DataSet dataSet,
			NPActionCommand actionCommand) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_UPDATE, dataSet);
		queryMap.put(NPQueryService.QUERY_UPDATE, queryId);
		return saveAll(queryMap, dataSet, actionCommand);
	}

	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * 
	 * @param queryMap
	 *            Three query ids for insert, update, and delete in query
	 *            mapping file.
	 * @param dataSet
	 *            Dataset contains records to insert, update, delete.
	 * @return
	 * @throws QueryException
	 */
	public int saveAll(Map<String, String> queryMap, DataSet dataSet)
			throws QueryException {
		return saveAll(queryMap, dataSet, null);
	}

	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * 
	 * @param queryMap
	 *            Three query ids for insert, update, and delete in query
	 *            mapping file.
	 * @param dataSet
	 *            Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 *            NPActionCommand contains biz. logic pre or post insert,
	 *            update, delete.
	 * @return
	 * @throws QueryException
	 */
	public int saveAll(Map<String, String> queryMap, DataSet dataSet,
			NPActionCommand actionCommand) throws QueryException {
		if (actionCommand == null) {
			return npQueryService.update(queryMap, dataSet);
		} else {
			return npQueryService.update(queryMap, dataSet, actionCommand);
		}
	}

	/**
	 * This is the method for save(insert, update, delete) using JDBC 2.0 batch
	 * updates.
	 * 
	 * @param queryMap
	 *            Three query ids for insert, update and delete in query mapping
	 *            file.
	 * @param dataSet
	 *            DataSet contains records to insert, update, delete.
	 * @return
	 * @throws QueryException
	 *             fail to execute batch update
	 */
	public int batchSaveAll(Map<String, String> queryMap, DataSet dataSet)
			throws QueryException {
		int totalCount = 0;

		if (!"".equals(queryMap.get(NPQueryService.QUERY_INSERT)))
			totalCount += npQueryService.batchCreate(queryMap
					.get(NPQueryService.QUERY_INSERT), dataSet);

		if (!"".equals(queryMap.get(NPQueryService.QUERY_UPDATE)))
			totalCount += npQueryService.batchUpdate(queryMap
					.get(NPQueryService.QUERY_UPDATE), dataSet);

		if (!"".equals(queryMap.get(NPQueryService.QUERY_DELETE)))
			totalCount += npQueryService.batchRemove(queryMap
					.get(NPQueryService.QUERY_DELETE), dataSet);
		return totalCount;
	}

	/**
	 * This is the method for callablestatement using Dataset.
	 * 
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param dataSet
	 *            Dataset contains records
	 * @return
	 * @throws QueryException
	 */
	public DataSetList execute(String queryId, DataSet dataSet)
			throws QueryException {
		return npQueryService.execute(queryId, dataSet);
	}
	
	/**
	 * This is the method for callablestatement using Dataset.
	 * 
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @return
	 * @throws QueryException
	 */
	public DataSetList execute(String queryId) throws QueryException{
		return npQueryService.execute(queryId);
	}

	private void setDataSetStatus(short type, DataSet dataset) {
		int rowCount = dataset.getRowCount();

		if (type == TYPE_DELETE) {
			dataset.setSaveType(DataSet.SAVE_TYPE_DELETED);
		} else {
			dataset.setSaveType(DataSet.SAVE_TYPE_UPDATED);
		}

		for (int i = 0; i < rowCount; i++) {
			if (type == TYPE_INSERT) {
				dataset.setRowType(i, TYPE_INSERT);
			} else if (type == TYPE_UPDATE) {
				dataset.setRowType(i, TYPE_UPDATE);
			} else {
				dataset.setRowType(0, TYPE_DELETE);
			}
		}
	}
}
