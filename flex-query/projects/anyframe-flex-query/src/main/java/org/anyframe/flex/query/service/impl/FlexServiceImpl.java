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
package org.anyframe.flex.query.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.anyframe.flex.query.dao.FlexDao;
import org.anyframe.flex.query.data.DataRow;
import org.anyframe.flex.query.data.DataSet;
import org.anyframe.flex.query.service.FlexService;
import org.anyframe.pagination.Page;


public class FlexServiceImpl implements FlexService {

	private FlexDao flexDao;
	
	public void setFlexDao(FlexDao flexDao) {
		this.flexDao = flexDao;
	}

	public List<DataSet> findList(List<DataSet> dataSetList, Map param) throws Exception 
			{
		for(int i=0; i < dataSetList.size() ; i++){
			DataSet ds = (DataSet)dataSetList.get(i);

			String queryId = ds.selectQueryId;

			ds.addAll(flexDao.getList(queryId, param));
		}
		return dataSetList;
	}
	
	public List<DataSet> findPagingList(List<DataSet> dataSetList, Map param) throws Exception 
	{
		for(int i=0; i < dataSetList.size() ; i++){
			DataSet ds = (DataSet)dataSetList.get(i);
			
			String queryId = ds.selectQueryId;
			
			Page resultPage = flexDao.getListWithPaging(queryId, param, ds.currentPage, ds.pagesize, ds.pageunit);
			ds.maxPage = resultPage.getMaxPage();
			ds.totalCount = resultPage.getTotalCount();
			
			ds.addAll(resultPage.getList());
		}
		return dataSetList;
	}
	
	public Map doService(List<DataSet> dataSetList, Map param) throws Exception{
		return null;
	}
	
	public Map saveAll(List<DataSet> dataSetList, Map param) throws Exception {
		
		Map<String, Map<String,Integer>> result = new LinkedHashMap<String, Map<String, Integer>>();
		
		for(int i=0; i<dataSetList.size(); i++) {
			DataSet ds = (DataSet) dataSetList.get(i);
			result.put(ds.dataSetName , flexDao.saveAll(ds, param) );
		}
		return result;
	}
	
	public Map updateRows(List<DataSet> dataSetList, Map param) throws Exception {
		
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();
		
		for(int i=0; i<dataSetList.size(); i++) {
			DataSet ds = (DataSet)dataSetList.get(i);
			result.put(ds.updateQueryId, flexDao.batchExecute(ds.updateQueryId, ds, param));
		}
		return result;
	}
	
	public Map removeRows(List<DataSet> dataSetList, Map param) throws Exception {
		
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();
		
		for(int i=0; i<dataSetList.size(); i++) {
			DataSet ds = (DataSet)dataSetList.get(i);
			result.put(ds.deleteQueryId, flexDao.batchExecute(ds.deleteQueryId, ds, param));
		}
		return result;
	}
	
	public Map insertRows(List<DataSet> dataSetList, Map param) throws Exception {
		
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();
		
		for(int i=0; i<dataSetList.size(); i++) {
			DataSet ds = (DataSet)dataSetList.get(i);
			result.put(ds.insertQueryId, flexDao.batchExecute(ds.insertQueryId, ds, param));
		}
		return result;
	}
	
	public Map find(String queryId, DataRow dataRow, Map param) throws Exception {
		ArrayList resultList = (ArrayList) flexDao.getList(queryId, dataRow, param);
		return (Map)resultList.get(0);
	}
	
	public Map create(String queryId, DataRow dataRow, Map param)
			throws Exception {
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		Object generatedKey = flexDao.create(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += ((Integer) result.get(queryId)).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}
	
	public Map update(String queryId, DataRow dataRow, Map param )throws Exception{
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		Object generatedKey = flexDao.update(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += ((Integer) result.get(queryId)).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}
	
	public Map remove(String queryId, DataRow dataRow, Map param )throws Exception{
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		Object generatedKey = flexDao.delete(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += ((Integer) result.get(queryId)).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}

}
