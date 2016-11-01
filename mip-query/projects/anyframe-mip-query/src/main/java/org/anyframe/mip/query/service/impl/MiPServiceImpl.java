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

import org.anyframe.mip.query.impl.MiPQueryServiceImpl;
import org.anyframe.mip.query.service.MiPService;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * This class provides methods to call MiPDao to send queries.
 * 
 * @author Jonghoon Kim
 * 
 */
public class MiPServiceImpl implements MiPService {

	protected MiPDao mipDao;

	public MiPServiceImpl() {
	}

	public MiPServiceImpl(MiPDao mipDao) {
		this.mipDao = mipDao;
	}

	public void get(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {

		getList(inVl, inDl, outVl, outDl);
	}

	public void getList(VariableList inVl, DatasetList inDl,
			VariableList outVl, DatasetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		Dataset inDs = null;
		Dataset outDs = null;

		for (int i = 1; i <= querySetCount; i++) {

			queryId = inVl.getValueAsString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			if (inDs != null) {
				outDs = mipDao.getList(queryId, inDs);
			} else {
				outDs = mipDao.getList(queryId, inVl);
			}
			outDl.addDataset("querySet" + i, outDs);
		}
	}

	public void getPagingList(VariableList inVl, DatasetList inDl,
			VariableList outVl, DatasetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		Dataset inDs = null;
		Dataset outDs = null;

		for (int i = 1; i <= querySetCount; i++) {

			queryId = inVl.getValueAsString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			if (inDs != null) {
				outDs = mipDao.getPagingList(queryId, inDs);
			}
			outDl.addDataset("querySet" + i, outDs);
		}
	}

	public void saveAll(VariableList inVl, DatasetList inDl,
			VariableList outVl, DatasetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		Dataset inDs = null;

		String[] arrQuery = null;
		Map<String, String> queryMap = new HashMap<String, String>();

		for (int i = 1; i <= querySetCount; i++) {

			int returnValue = 0;

			queryId = inVl.getValueAsString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			arrQuery = queryId.split(",");

			queryMap.put(MiPQueryServiceImpl.QUERY_INSERT, arrQuery[0]);
			queryMap.put(MiPQueryServiceImpl.QUERY_UPDATE, arrQuery[1]);
			queryMap.put(MiPQueryServiceImpl.QUERY_DELETE, arrQuery[2]);

			returnValue = mipDao.saveAll(queryMap, inDs);
			outVl.addStr("querySet" + i, String.valueOf(returnValue));
		}
	}

	public void create(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {

		String status = MiPQueryServiceImpl.QUERY_INSERT;
		save(inVl, inDl, outVl, outDl, status);
	}

	public void remove(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {

		String status = MiPQueryServiceImpl.QUERY_DELETE;
		save(inVl, inDl, outVl, outDl, status);
	}

	public void update(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {

		String status = MiPQueryServiceImpl.QUERY_UPDATE;
		save(inVl, inDl, outVl, outDl, status);
	}

	public void execute(VariableList inVl, DatasetList inDl,
			VariableList outVl, DatasetList outDl) throws Exception {

		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		Dataset inDs = null;
		DatasetList resultDl = null;
		for (int i = 1; i <= querySetCount; i++) {

			queryId = inVl.getValueAsString("querySet" + i);
			inDs = inDl.get("querySet" + i);
			
			if (inDs != null) {
				resultDl = mipDao.execute(queryId, inDs);
			} else {
				resultDl = mipDao.execute(queryId);
			}

			for (int j = 0; j < resultDl.size(); j++) {
				outDl.add(resultDl.get(queryId + j));
			}
		}
	}

	private void save(VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl, String status) throws Exception {
		int querySetCount = getQuerySetCount(inVl, outVl);

		String queryId = null;
		Dataset inDs = null;

		for (int i = 1; i <= querySetCount; i++) {

			int returnValue = 0;

			queryId = inVl.getValueAsString("querySet" + i);
			inDs = inDl.get("querySet" + i);

			Map<String, String> queryMap = new HashMap<String, String>();
			queryMap.put(status, queryId);
			if (inDs != null) {
				returnValue = mipDao.saveAll(queryMap, inDs);
			} else {
				returnValue = mipDao.update(queryId, inVl);
			}
			outVl.addStr("querySet" + i, String.valueOf(returnValue));
		}
	}

	private int getQuerySetCount(VariableList inVl, VariableList outVl) {
		int querySetCount = 0;
		querySetCount = inVl.getValueAsInteger("querySetCount").intValue();
		return querySetCount;
	}
}
