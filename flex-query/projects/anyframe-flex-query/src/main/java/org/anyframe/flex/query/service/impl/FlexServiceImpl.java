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
package org.anyframe.flex.query.service.impl;

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

	@SuppressWarnings("unchecked")
	public List<DataSet> findList(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {
		for (int i = 0; i < dataSetList.size(); i++) {
			DataSet ds = dataSetList.get(i);

			String queryId = ds.selectQueryId;

			ds.addAll(flexDao.getList(queryId, param));
		}
		return dataSetList;
	}

	@SuppressWarnings("unchecked")
	public List<DataSet> findPagingList(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {
		for (int i = 0; i < dataSetList.size(); i++) {
			DataSet ds = dataSetList.get(i);

			String queryId = ds.selectQueryId;

			Page resultPage = flexDao.getListWithPaging(queryId, param,
					ds.currentPage, ds.pagesize, ds.pageunit);
			ds.maxPage = resultPage.getMaxPage();
			ds.totalCount = resultPage.getTotalCount();

			ds.addAll(resultPage.getList());
		}
		return dataSetList;
	}

	public Map<String, Object> doService(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {
		return null;
	}

	public Map<String, Map<String, Integer>> saveAll(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {

		Map<String, Map<String, Integer>> result = new LinkedHashMap<String, Map<String, Integer>>();

		for (int i = 0; i < dataSetList.size(); i++) {
			DataSet ds = dataSetList.get(i);
			result.put(ds.dataSetName, flexDao.saveAll(ds, param));
		}
		return result;
	}

	public Map<String, Integer> updateRows(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {

		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		for (int i = 0; i < dataSetList.size(); i++) {
			DataSet ds = dataSetList.get(i);
			result.put(ds.updateQueryId, flexDao.batchExecute(ds.updateQueryId,
					ds, param));
		}
		return result;
	}

	public Map<String, Integer> removeRows(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {

		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		for (int i = 0; i < dataSetList.size(); i++) {
			DataSet ds = dataSetList.get(i);
			result.put(ds.deleteQueryId, flexDao.batchExecute(ds.deleteQueryId,
					ds, param));
		}
		return result;
	}

	public Map<String, Integer> insertRows(List<DataSet> dataSetList,
			Map<String, Object> param) throws Exception {

		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		for (int i = 0; i < dataSetList.size(); i++) {
			DataSet ds = dataSetList.get(i);
			result.put(ds.insertQueryId, flexDao.batchExecute(ds.insertQueryId,
					ds, param));
		}
		return result;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> find(String queryId, DataRow dataRow, Map<String, Object> param)
			throws Exception {
		List<Map<String, Object>> resultList = flexDao.getList(queryId, dataRow, param);
		return (Map<String, Object>) resultList.get(0);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Integer> create(String queryId, DataRow dataRow,
			Map<String, Object> param) throws Exception {
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		// Object generatedKey = flexDao.create(queryId, dataRow, param);
		flexDao.create(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += result.get(queryId).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Integer> update(String queryId, DataRow dataRow,
			Map<String, Object> param) throws Exception {
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		// Object generatedKey = flexDao.update(queryId, dataRow, param);
		flexDao.update(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += result.get(queryId).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Integer> remove(String queryId, DataRow dataRow,
			Map<String, Object> param) throws Exception {
		Map<String, Integer> result = new LinkedHashMap<String, Integer>();

		flexDao.delete(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += result.get(queryId).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}

}
