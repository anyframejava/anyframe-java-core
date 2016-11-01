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
package org.anyframe.xp.query.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.anyframe.xp.query.XPActionCommand;
import org.anyframe.xp.query.XPQueryService;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * This class provides methods to send pre-defined queries to Database.
 * 
 * @author Youngmin Jo
 *
 */
public class XPDao {

	public final short TYPE_NORMAL = DataSet.ROW_TYPE_NORMAL;
	public final short TYPE_INSERT = DataSet.ROW_TYPE_INSERTED;
	public final short TYPE_UPDATE = DataSet.ROW_TYPE_UPDATED;
	public final short TYPE_DELETE = DataSet.ROW_TYPE_DELETED;
	
	private XPQueryService xpQueryService;
	
	public XPDao(XPQueryService xpQueryService){
		this.xpQueryService = xpQueryService;
	}
	
	/**
     * This is the method for selecting using primary key(String).
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param primaryKey
     * 		primary key value
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public DataSet get(String queryId, String primaryKey) throws Exception{
		VariableList inVl = new VariableList();
		inVl.add("primaryKey", primaryKey);
		return xpQueryService.search(queryId, inVl);
	}
	
	/**
     * This is the method for selecting using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public DataSet get(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.search(queryId, inVl);
	}
	
	/**
     * This is the method for selecting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */ 
	public DataSet getList(String queryId, DataSet inDs) throws Exception {
		return xpQueryService.search(queryId, inDs);
	}

	/**
     * This is the method for selecting using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains key word to search.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public DataSet getList(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.search(queryId, inVl);
	}

	/**
     * This is the method for selecting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains key word to search and pageIndex, pageUnit.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public DataSet getPagingList(String queryId, DataSet inDs) throws Exception {
		return xpQueryService.searchWithPaging(queryId, inDs);
	}
	
	/**
     * This is the method for inserting using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains record to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public int create(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.update(queryId, inVl);
	}
	
	/**
     * This is the method for inserting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to insert.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public int create(String queryId, DataSet inDs) throws Exception {
		return create(queryId, inDs, null);
	}

	/**
     * This is the method for inserting using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to insert.
     * @param actionCommand
     * 		XPActionCommand contains biz. logic pre or post insert. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public int create(String queryId, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_INSERT, inDs);
		queryMap.put(XPQueryService.QUERY_INSERT, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}
	
	/**
     * This is the method for removing using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains record to remove.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */ 
	public int remove(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.update(queryId, inVl);
	}

	/**
     * This is the method for removing using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to remove.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int remove(String queryId, DataSet inDs) throws Exception {
		return remove(queryId, inDs, null);
	}

	/**
     * This is the method for removing using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to remove.
     * @param actionCommand
     * 		XPActionCommand contains biz. logic pre or post remove. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public int remove(String queryId, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_DELETE, inDs);
		queryMap.put(XPQueryService.QUERY_DELETE, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}

	/**
     * This is the method for updating using VariableList.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inVl
     * 		VariableList contains record to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public int update(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.update(queryId, inVl);
	}

	/**
     * This is the method for updating using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to update.
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */
	public int update(String queryId, DataSet inDs) throws Exception {
		return update(queryId, inDs, null);
	}

	/**
     * This is the method for updating using Dataset.
     * @param queryId
     * 		query id to execute in query mapping file.
     * @param inDs
     * 		Dataset contains records to update.
     * @param actionCommand
     * 		XPActionCommand contains biz. logic pre or post update. 
	 * @throws Exception
	 *		if there is any problem executing the
	 *		query
     */  
	public int update(String queryId, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_UPDATE, inDs);
		queryMap.put(XPQueryService.QUERY_UPDATE, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}
	
	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * @param queryMap
	 * 		Three query ids for insert, update, and delete in query mapping file. 
	 * @param inDs
	 * 		Dataset contains records to insert, update, delete.
	 * @return
	 * @throws Exception
	 */
	public int saveAll(Map<String, String> queryMap, DataSet inDs) throws Exception {
		return saveAll(queryMap, inDs, null);
	}

	/**
	 * This is the method for save(insert, update, delete) using Dataset.
	 * @param queryMap
	 * 			Three query ids for insert, update, and delete in query mapping file. 
	 * @param inDs
	 * 			Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 * 			XPActionCommand contains biz. logic pre or post insert, update, delete. 
	 * @return
	 * @throws Exception
	 */
	public int saveAll(Map<String, String> queryMap, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		if (actionCommand == null) {
			return xpQueryService.update(queryMap, inDs);
		}
		else {
			return xpQueryService.update(queryMap, inDs, actionCommand);
		}
	}
	
	/**
	 * This is the method for callablestatement using Dataset.
	 * @param queryMap
	 * 			Three query ids for insert, update, and delete in query mapping file. 
	 * @param inDs
	 * 			Dataset contains records to insert, update, delete.
	 * @param actionCommand
	 * 			XPActionCommand contains biz. logic pre or post insert, update, delete. 
	 * @return
	 * @throws Exception
	 */
	public DataSetList execute(String queryId, DataSet inDs) throws Exception {
		return xpQueryService.execute(queryId, inDs);
	}
	
	private void setDataSetStatus(short type, DataSet dataset) throws Exception {
		int rowCount = dataset.getRowCount();

		if (type == TYPE_DELETE) {
			dataset.setSaveType(DataSet.SAVE_TYPE_DELETED);
		}
		else {
			dataset.setSaveType(DataSet.SAVE_TYPE_UPDATED);
		}

		for (int i = 0; i < rowCount; i++) {
			if (type == TYPE_INSERT) {
				dataset.setRowType(i, TYPE_INSERT);
			}
			else if (type == TYPE_UPDATE) {
				dataset.setRowType(i, TYPE_UPDATE);
			}
			else {
				dataset.setRowType(0, TYPE_DELETE);
			}
		}
	}
}
