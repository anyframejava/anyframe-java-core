/*
 * Copyright 2002-2013 the original author or authors.
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

import org.anyframe.np.query.impl.NPQueryServiceImpl;
import org.anyframe.np.query.service.NPService;
import org.anyframe.query.exception.QueryException;



import org.anyframe.np.query.service.impl.NPDao;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.VariableList;

/**
 * This class provides methods to call NPDao to send queries.
 *
 * @author Youngmin Jo
 *         Sunjoong Kim
 */
public class NPServiceImpl implements NPService {

	  protected NPDao npDao;
	    private static final String OUT_QUERY_NAME_PREFIX = "querySet";

	    public NPServiceImpl() {
	    }

	    public NPServiceImpl(NPDao npDao) {
	        this.npDao = npDao;
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


	            queryId = inVl.getString(OUT_QUERY_NAME_PREFIX + i);
	            inDs = inDl.get(OUT_QUERY_NAME_PREFIX + i);
	            if (inDs != null) {
	                outDs = npDao.getList(queryId, inDs);
	            } else {
	                outDs = npDao.getList(queryId, inVl);
	            }
	            outDs.setName(OUT_QUERY_NAME_PREFIX + i);
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

	            queryId = inVl.getString(OUT_QUERY_NAME_PREFIX + i);
	            inDs = inDl.get(OUT_QUERY_NAME_PREFIX + i);
	            if (inDs != null) {
	                outDs = npDao.getPagingList(queryId, inDs);
	            }
	            outDs.setName(OUT_QUERY_NAME_PREFIX + i);
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

	            inDs = inDl.get(OUT_QUERY_NAME_PREFIX + i);
	            queryId = inVl.getString(OUT_QUERY_NAME_PREFIX + i);
	            queryMap = makeQueryMap(queryId);

	            returnValue = npDao.saveAll(queryMap, inDs);
	            outVl.add(OUT_QUERY_NAME_PREFIX + i, String.valueOf(returnValue));
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

	            inDs = inDl.get(OUT_QUERY_NAME_PREFIX + i);
	            queryId = inVl.getString(OUT_QUERY_NAME_PREFIX + i);
	            queryMap = makeQueryMap(queryId);

	            returnValue = npDao.batchSaveAll(queryMap, inDs);
	            outVl.add(OUT_QUERY_NAME_PREFIX + i, String.valueOf(returnValue));
	        }
	    }

	    public void create(VariableList inVl, DataSetList inDl, VariableList outVl,
	                       DataSetList outDl) throws Exception {
	        String status = NPQueryServiceImpl.QUERY_INSERT;
	        save(inVl, inDl, outVl, outDl, status);

	    }

	    public void remove(VariableList inVl, DataSetList inDl, VariableList outVl,
	                       DataSetList outDl) throws Exception {
	        String status = NPQueryServiceImpl.QUERY_DELETE;
	        save(inVl, inDl, outVl, outDl, status);
	    }

	    public void update(VariableList inVl, DataSetList inDl, VariableList outVl,
	                       DataSetList outDl) throws Exception {
	        String status = NPQueryServiceImpl.QUERY_UPDATE;
	        save(inVl, inDl, outVl, outDl, status);
	    }

	    public void execute(VariableList inVl, DataSetList inDl,
	                        VariableList outVl, DataSetList outDl) throws Exception {

	        for (int i = 1; i <= getQuerySetCount(inVl, outVl); i++) {
	            String querySet = OUT_QUERY_NAME_PREFIX + i;
	            String queryId = inVl.getString(querySet);
	            DataSet inDs = inDl.get(querySet);

	            DataSetList resultDl = null;
	            if (inDs != null) {
	                resultDl = npDao.execute(queryId, inDs);
	            } else {
	                resultDl = npDao.execute(queryId);
	            }

	            for(int j = 0 ; j < resultDl.size() ; j++){
	                DataSet outDs = resultDl.get(j);
	                //프로시저의 경우 output DataSet의 이름은 querySet1_outParamName
	                outDs.setName(querySet +  "_" + outDs.getName());
	                outDl.add(outDs);
	            }
	        }
	    }

	    private Map<String, String> makeQueryMap(String queryId) throws QueryException {
	        Map<String, String> queryMap = new HashMap<String, String>();

	        String[] arrQuery = queryId.split(",");

	        if (arrQuery.length != 3)
	            throw new QueryException(
	                    "NPService : saveAll method needs three query Ids for inserting, updating, deleting.");

	        queryMap.put(NPQueryServiceImpl.QUERY_INSERT, arrQuery[0]);
	        queryMap.put(NPQueryServiceImpl.QUERY_UPDATE, arrQuery[1]);
	        queryMap.put(NPQueryServiceImpl.QUERY_DELETE, arrQuery[2]);

	        return queryMap;
	    }

	    private void save(VariableList inVl, DataSetList inDl, VariableList outVl,
	                      DataSetList outDl, String status) throws Exception {

	        int querySetCount = getQuerySetCount(inVl, outVl);

	        String queryId = null;
	        DataSet inDs = null;

	        for (int i = 1; i <= querySetCount; i++) {

	            int returnValue = 0;

	            queryId = inVl.getString(OUT_QUERY_NAME_PREFIX + i);
	            inDs = inDl.get(OUT_QUERY_NAME_PREFIX + i);

	            Map<String, String> queryMap = new HashMap<String, String>();
	            queryMap.put(status, queryId);
	            if (inDs != null) {
	                returnValue = npDao.saveAll(queryMap, inDs);
	            } else {
	                returnValue = npDao.update(queryId, inVl);
	            }
	            outVl.add(OUT_QUERY_NAME_PREFIX + i, String.valueOf(returnValue));
	        }
	    }

	    private int getQuerySetCount(VariableList inVl, VariableList outVl) {
	        int querySetCount = 0;
	        querySetCount = inVl.getInt("querySetCount");
	        return querySetCount;
	    }
}
