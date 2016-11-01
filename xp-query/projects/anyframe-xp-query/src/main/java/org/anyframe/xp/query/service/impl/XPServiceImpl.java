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

import org.anyframe.query.exception.QueryException;
import org.anyframe.xp.query.impl.XPQueryServiceImpl;
import org.anyframe.xp.query.service.XPService;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * This class provides methods to call XPDao to send queries.
 * 
 * @author Youngmin Jo
 */
public class XPServiceImpl implements XPService {

	protected XPDao xpDao; 

	public XPServiceImpl() {
	}

	public XPServiceImpl(XPDao xpDao) {
		this.xpDao = xpDao;
	}

	public void get(VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception {
		getList(inVl, inDl, outVl, outDl);
	}

	public void getList(VariableList inVl, DataSetList inDl,
			VariableList outVl, DataSetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		DataSet inDs = null;
		DataSet outDs = null;

		for (int i = 1; i <= querySetCount; i++) {

			queryId = inVl.getString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			if (inDs != null) {
				outDs = xpDao.getList(queryId, inDs);
			} else {
				outDs = xpDao.getList(queryId, inVl);
			}
			outDs.setName("querySet" + i);
			outDl.add(outDs);
		}
	}

	public void getPagingList(VariableList inVl, DataSetList inDl,
			VariableList outVl, DataSetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		DataSet inDs = null;
		DataSet outDs = null;

		for (int i = 1; i <= querySetCount; i++) {

			queryId = inVl.getString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			if (inDs != null) {
				outDs = xpDao.getPagingList(queryId, inDs);
			}
			outDs.setName("querySet" + i);
			outDl.add(outDs);
		}
	}

	public void saveAll(VariableList inVl, DataSetList inDl,
			VariableList outVl, DataSetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		DataSet inDs = null;

		Map<String, String> queryMap = new HashMap<String, String>();

		for (int i = 1; i <= querySetCount; i++) {

			int returnValue = 0;

			inDs = inDl.get("querySet" + i);
			queryId = inVl.getString("querySet" + i);
			queryMap = makeQueryMap(queryId);

			returnValue = xpDao.saveAll(queryMap, inDs);
			outVl.add("querySet" + i, String.valueOf(returnValue));
		}
	}

	public void batchSaveAll(VariableList inVl, DataSetList inDl,
			VariableList outVl, DataSetList outDl) throws Exception {
		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		DataSet inDs = null;

		Map<String, String> queryMap = new HashMap<String, String>();

		for (int i = 1; i <= querySetCount; i++) {

			int returnValue = 0;

			inDs = inDl.get("querySet" + i);
			queryId = inVl.getString("querySet" + i);
			queryMap = makeQueryMap(queryId);

			returnValue = xpDao.batchSaveAll(queryMap, inDs);
			outVl.add("querySet" + i, String.valueOf(returnValue));
		}
	}

	public void create(VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception {
		String status = XPQueryServiceImpl.QUERY_INSERT;
		save(inVl, inDl, outVl, outDl, status);

	}

	public void remove(VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception {
		String status = XPQueryServiceImpl.QUERY_DELETE;
		save(inVl, inDl, outVl, outDl, status);
	}

	public void update(VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl) throws Exception {
		String status = XPQueryServiceImpl.QUERY_UPDATE;
		save(inVl, inDl, outVl, outDl, status);
	}

	public void execute(VariableList inVl, DataSetList inDl,
			VariableList outVl, DataSetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		DataSet inDs = null;
		// DataSet resultDs = null;
		DataSetList resultDl = null;
		for (int i = 1; i <= querySetCount; i++) {

			queryId = inVl.getString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			
			if (inDs != null) {
				resultDl = xpDao.execute(queryId, inDs);
			} else {
				resultDl = xpDao.execute(queryId);
			}
			
			for(int j = 0 ; j < resultDl.size() ; j++){
				DataSet outDs = resultDl.get(queryId + j);
				outDl.add(outDs);
			}
		}
	}

	private Map<String, String> makeQueryMap(String queryId) throws QueryException {
		Map<String, String> queryMap = new HashMap<String, String>();

		String[] arrQuery = queryId.split(",");

		if (arrQuery.length != 3)
			throw new QueryException(
					"XPService : saveAll method needs three query Ids for inserting, updating, deleting.");

		queryMap.put(XPQueryServiceImpl.QUERY_INSERT, arrQuery[0]);
		queryMap.put(XPQueryServiceImpl.QUERY_UPDATE, arrQuery[1]);
		queryMap.put(XPQueryServiceImpl.QUERY_DELETE, arrQuery[2]);

		return queryMap;
	}

	private void save(VariableList inVl, DataSetList inDl, VariableList outVl,
			DataSetList outDl, String status) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		DataSet inDs = null;

		for (int i = 1; i <= querySetCount; i++) {

			int returnValue = 0;

			queryId = inVl.getString("querySet" + i);
			inDs = inDl.get("querySet" + i);

			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put(status, queryId);
			if (inDs != null) {
				returnValue = xpDao.saveAll(queryMap, inDs);
			} else {
				returnValue = xpDao.update(queryId, inVl);
			}
			outVl.add("querySet" + i, String.valueOf(returnValue));
		}
	}

	private int getQuerySetCount(VariableList inVl, VariableList outVl) {
		int querySetCount = 0;
		querySetCount = inVl.getInt("querySetCount");
		return querySetCount;
	}
}
