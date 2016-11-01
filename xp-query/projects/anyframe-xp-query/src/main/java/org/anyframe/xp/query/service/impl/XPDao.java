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
	
	public DataSet get(String queryId, String primaryKey) throws Exception{
		VariableList inVl = new VariableList();
		inVl.add("primaryKey", primaryKey);
		return xpQueryService.search(queryId, inVl);
	}
	
	public DataSet get(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.search(queryId, inVl);
	}
	
	public DataSet getList(String queryId, DataSet inDs) throws Exception {
		return xpQueryService.search(queryId, inDs);
	}

	public DataSet getList(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.search(queryId, inVl);
	}

	public DataSet getPagingList(String queryId, DataSet inDs) throws Exception {
		return xpQueryService.searchWithPaging(queryId, inDs);
	}
	
	public int create(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.update(queryId, inVl);
	}
	
	public int create(String queryId, DataSet inDs) throws Exception {
		return create(queryId, inDs, null);
	}

	public int create(String queryId, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_INSERT, inDs);
		queryMap.put(XPQueryService.QUERY_INSERT, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}
	
	public int remove(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.update(queryId, inVl);
	}

	public int remove(String queryId, DataSet inDs) throws Exception {
		return remove(queryId, inDs, null);
	}

	public int remove(String queryId, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_DELETE, inDs);
		queryMap.put(XPQueryService.QUERY_DELETE, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}

	public int update(String queryId, VariableList inVl) throws Exception {
		return xpQueryService.update(queryId, inVl);
	}

	public int update(String queryId, DataSet inDs) throws Exception {
		return update(queryId, inDs, null);
	}

	public int update(String queryId, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		Map<String, String> queryMap = new HashMap<String, String>();
		setDataSetStatus(TYPE_UPDATE, inDs);
		queryMap.put(XPQueryService.QUERY_UPDATE, queryId);
		return saveAll(queryMap, inDs, actionCommand);
	}
	
	public int saveAll(Map<String, String> queryMap, DataSet inDs) throws Exception {
		return saveAll(queryMap, inDs, null);
	}

	public int saveAll(Map<String, String> queryMap, DataSet inDs, XPActionCommand actionCommand) throws Exception {
		if (actionCommand == null) {
			return xpQueryService.update(queryMap, inDs);
		}
		else {
			return xpQueryService.update(queryMap, inDs, actionCommand);
		}
	}

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
