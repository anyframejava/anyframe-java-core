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
package org.anyframe.mip.query.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.anyframe.mip.query.MiPActionCommand;
import org.anyframe.mip.query.MiPQueryService;
import org.anyframe.query.exception.QueryException;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * This class provides methods to send pre-defined queries to Database.
 * 
 * @author Soyon Lim
 * @author JongHoon Kim
 */
public class MiPDao {

	public final short TYPE_NORMAL = 1;
	public final short TYPE_INSERT = 2; 
	public final short TYPE_UPDATE = 4;
	public final short TYPE_DELETE = 8;

	private final MiPQueryService miPQueryService;

	public MiPDao(MiPQueryService miPQueryService) {
		this.miPQueryService = miPQueryService;
	}

	/**
	 * This is the method for selecting using primary key(String).
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param primaryKey
	 *            privary key value
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Dataset get(String queryId, String primaryKey) throws QueryException {
		VariableList inVl = new VariableList();
		inVl.add("primaryKey", primaryKey);
		return miPQueryService.search(queryId, inVl);
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
	public Dataset get(String queryId, VariableList inVl) throws QueryException {
		return miPQueryService.search(queryId, inVl);
	}

	/**
	 * This is the method for selecting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains key word to search.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Dataset getList(String queryId, Dataset inDs) throws QueryException {
		return miPQueryService.search(queryId, inDs);
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
	public Dataset getList(String queryId, VariableList inVl)
			throws QueryException {
		return miPQueryService.search(queryId, inVl);
	}

	/**
	 * This is the method for selecting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains key word to search and pageIndex, pageUnit.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public Dataset getPagingList(String queryId, Dataset inDs)
			throws QueryException {
		return miPQueryService.searchWithPaging(queryId, inDs);
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
		return miPQueryService.update(queryId, inVl);
	}

	/**
	 * This is the method for inserting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains records to insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, Dataset inDs) throws QueryException {
		return create(queryId, inDs, null);
	}

	/**
	 * This is the method for inserting using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains records to insert.
	 * @param actionCommand
	 *            IMiPActionCommand contains biz. logic pre or post insert.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int create(String queryId, Dataset inDs,
			MiPActionCommand actionCommand) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDatasetStatus(TYPE_INSERT, inDs);
		queryMap.put(MiPQueryService.QUERY_INSERT, queryId);
		return saveAll(queryMap, inDs, actionCommand);
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
		return miPQueryService.update(queryId, inVl);
	}

	/**
	 * This is the method for removing using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains records to remove.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(String queryId, Dataset inDs) throws QueryException {
		return remove(queryId, inDs, null);
	}

	/**
	 * This is the method for removing using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains records to remove.
	 * @param actionCommand
	 *            IMiPActionCommand contains biz. logic pre or post remove.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int remove(String queryId, Dataset inDs,
			MiPActionCommand actionCommand) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDatasetStatus(TYPE_DELETE, inDs);
		queryMap.put(MiPQueryService.QUERY_DELETE, queryId);
		return saveAll(queryMap, inDs, actionCommand);
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
		return miPQueryService.update(queryId, inVl);
	}

	/**
	 * This is the method for updating using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains records to update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, Dataset inDs) throws QueryException {
		return update(queryId, inDs, null);
	}

	/**
	 * This is the method for updating using Dataset.
	 * 
	 * @param queryId
	 *            query id to execute in query mapping file.
	 * @param inDs
	 *            Dataset contains records to update.
	 * @param actionCommand
	 *            IMiPActionCommand contains biz. logic pre or post update.
	 * @throws QueryException
	 *             if there is any problem executing the query
	 */
	public int update(String queryId, Dataset inDs,
			MiPActionCommand actionCommand) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDatasetStatus(TYPE_UPDATE, inDs);
		queryMap.put(MiPQueryService.QUERY_UPDATE, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}

	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * 
	 * @param queryMap
	 *            Three query ids for insert, update, and delete in query
	 *            mapping file.
	 * @param inDs
	 *            Dataset contains records to insert, update, delete.
	 * @return
	 * @throws QueryException
	 */
	public int saveAll(Map<String, String> queryMap, Dataset inDs)
			throws QueryException {
		return saveAll(queryMap, inDs, null);
	}

	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * 
	 * @param queryMap
	 *            Three query ids for insert, update, and delete in query
	 *            mapping file.
	 * @param inDs
	 *            Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 *            IMiPActionCommand contains biz. logic pre or post insert,
	 *            update, delete.
	 * @return
	 * @throws QueryException
	 */
	public int saveAll(Map<String, String> queryMap, Dataset inDs,
			MiPActionCommand actionCommand) throws QueryException {
		if (actionCommand == null) {
			return miPQueryService.update(queryMap, inDs);
		} else {
			return miPQueryService.update(queryMap, inDs, actionCommand);
		}
	}

	/**
	 * This is the method for callablestatement using Dataset.
	 * 
	 * @param queryMap
	 *            Three query ids for insert, update, and delete in query
	 *            mapping file.
	 * @param inDs
	 *            Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 *            IMiPActionCommand contains biz. logic pre or post insert,
	 *            update, delete.
	 * @return
	 * @throws QueryException
	 */
	public DatasetList execute(String queryId, Dataset inDs)
			throws QueryException {
		return miPQueryService.execute(queryId, inDs);
	}
	
	public DatasetList execute(String queryId) throws QueryException{
		return miPQueryService.execute(queryId);
	}

	private void setDatasetStatus(short type, Dataset dataset)
			throws QueryException {
		int rowCount = dataset.getRowCount();

		dataset.setUpdate(true);
		for (int i = 0; i < rowCount; i++) {
			if (type == TYPE_INSERT) {
				dataset.setRowType(i, TYPE_INSERT);
			} else if (type == TYPE_UPDATE) {
				dataset.setRowType(i, TYPE_UPDATE);
			} else {
				dataset.setRowType(0, TYPE_DELETE);
			}
		}
		dataset.setUpdate(false);
	}
}
