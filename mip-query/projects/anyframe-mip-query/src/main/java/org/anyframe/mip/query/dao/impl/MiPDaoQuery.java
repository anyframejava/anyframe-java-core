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
package org.anyframe.mip.query.dao.impl;

import java.util.HashMap;
import java.util.Map;

import org.anyframe.mip.query.MiPActionCommand;
import org.anyframe.mip.query.MiPQueryService;
import org.anyframe.mip.query.dao.MiPDao;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

public class MiPDaoQuery implements MiPDao{

	private MiPQueryService miPQueryService;
	
	public MiPDaoQuery(MiPQueryService miPQueryService) {
		this.miPQueryService = miPQueryService;
	}

	public Dataset get(String queryId, String primaryKey) throws Exception {
		VariableList inVl = new VariableList();
		inVl.add("primaryKey", primaryKey);
		return miPQueryService.search(queryId, inVl);
	}
	
	public Dataset get(String queryId, VariableList inVl) throws Exception {
		return miPQueryService.search(queryId, inVl);
	}

	public Dataset getList(String queryId, Dataset inDs) throws Exception {
		return miPQueryService.search(queryId, inDs);
	}

	public Dataset getList(String queryId, VariableList inVl) throws Exception {
		return miPQueryService.search(queryId, inVl);
	}

	public Dataset getPagingList(String queryId, Dataset inDs) throws Exception {
		return miPQueryService.searchWithPaging(queryId, inDs);
	}

	public int create(String queryId, VariableList inVl) throws Exception {
		return miPQueryService.update(queryId, inVl);
	}

	public int create(String queryId, Dataset inDs) throws Exception {
		return create(queryId, inDs, null);
	}

	public int create(String queryId, Dataset inDs,
			MiPActionCommand actionCommand) throws Exception {
		Map queryMap = new HashMap();
		setDatasetStatus(TYPE_INSERT, inDs );
		queryMap.put(MiPQueryService.QUERY_INSERT, queryId);
		return saveAll( queryMap, inDs , actionCommand);
	}

	public int remove(String queryId, VariableList inVl) throws Exception {
		return miPQueryService.update(queryId, inVl);
	}

	public int remove(String queryId, Dataset inDs) throws Exception {
		return remove(queryId, inDs, null);
	}

	public int remove(String queryId, Dataset inDs,
			MiPActionCommand actionCommand) throws Exception {
		Map queryMap = new HashMap();
		setDatasetStatus(TYPE_DELETE, inDs );
		queryMap.put(MiPQueryService.QUERY_DELETE, queryId);
		return saveAll( queryMap, inDs , actionCommand);
	}

	public int update(String queryId, VariableList inVl) throws Exception {
		return miPQueryService.update(queryId, inVl);
	}

	public int update(String queryId, Dataset inDs) throws Exception {
		return update(queryId, inDs, null);
	}

	public int update(String queryId, Dataset inDs,
			MiPActionCommand actionCommand) throws Exception {
		Map queryMap = new HashMap();
		setDatasetStatus(TYPE_UPDATE, inDs );
		queryMap.put(MiPQueryService.QUERY_UPDATE, queryId);
		return saveAll( queryMap, inDs , actionCommand);
	}
	
	public int saveAll(Map queryMap, Dataset inDs) throws Exception {
		return saveAll(queryMap, inDs, null);
	}

	public int saveAll(Map queryMap, Dataset inDs,
			MiPActionCommand actionCommand) throws Exception {
		if(actionCommand == null){
			return miPQueryService.update(queryMap, inDs);
		}else{
			return miPQueryService.update(queryMap, inDs, actionCommand);
		}
	}
	
	public DatasetList execute(String queryId, Dataset inDs) throws Exception {
		return miPQueryService.execute(queryId, inDs);
	}
	
	private void setDatasetStatus(short type, Dataset dataset) throws Exception{
		int rowCount = dataset.getRowCount();
		
		dataset.setUpdate(true);
		for( int i = 0 ; i < rowCount ; i ++ ){
			if( type == TYPE_INSERT  ){
				dataset.setRowType(i, TYPE_INSERT );
			}else if(type == TYPE_UPDATE){
				dataset.setRowType(i, TYPE_UPDATE );
			}else{
				dataset.setRowType(0, TYPE_DELETE);
			}
		}
		dataset.setUpdate(false);
	}
}
