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


public class FlexServiceImpl implements FlexService {

	private FlexDao flexDao;
	
	public void setFlexDao(FlexDao flexDao) {
		this.flexDao = flexDao;
	}

	public List findList(List dataSetList, Map param) throws Exception 
			{
		for(int i=0; i < dataSetList.size() ; i++){
			DataSet ds = (DataSet)dataSetList.get(i);

			String queryId = ds.selectQueryId;

			ds.addAll(flexDao.getList(queryId, param));
		}
		return dataSetList;
	}
	
	public Map saveAll(List dataSetList, Map param) throws Exception {
		
		Map result = new LinkedHashMap();
		
		for(int i=0; i<dataSetList.size(); i++) {
			
			DataSet ds = (DataSet)dataSetList.get(i);
			
			for(int cnt=0; cnt<ds.size(); cnt++) {
				DataRow dr = (DataRow)ds.get(cnt); 
				
				if(dr.ROWTYPE.equals("D")) {
					String queryId = ds.deleteQueryId;
					int deleteCnt = flexDao.delete(queryId, dr, param);
					if(result.containsKey(queryId)) {
						deleteCnt += ((Integer)result.get(queryId)).intValue();
					}
					result.put(queryId, deleteCnt);
				}
			}
			
			for(int cnt=0; cnt<ds.size(); cnt++) {
				DataRow dr = (DataRow)ds.get(cnt); 
				if(dr.ROWTYPE.equals("I")) {
					String queryId = ds.insertQueryId;
					Object generatedKey = flexDao.create(queryId, dr, param);
					int insertCnt = 1;
					if(result.containsKey(queryId)) {
						insertCnt += ((Integer)result.get(queryId)).intValue();
					}
					result.put(queryId, insertCnt);
					
					if(generatedKey != null) {
						if(result.containsKey("generatedKeys")) {
							List generatedKeys = (List) result.get("generatedKeys");
							generatedKeys.add(generatedKey);
						} else {
							List generatedKeys = new ArrayList();
							generatedKeys.add(generatedKey);
							result.put("generatedKeys", generatedKeys);
						}
					}
					
				}else if(dr.ROWTYPE.equals("U")) {
					String queryId = ds.updateQueryId;
					int updateCnt = flexDao.update(queryId, dr, param);
					if(result.containsKey(queryId)) {
						updateCnt += ((Integer)result.get(queryId)).intValue();
					}
					result.put(queryId, updateCnt);
				}
			}
		}
		return result;
	}
	
	public Map find(String queryId, DataRow dataRow, Map param) throws Exception {
		Map result = new LinkedHashMap();
		ArrayList resultList = (ArrayList) flexDao.getList(queryId, dataRow, param);
		return (Map)resultList.get(0);
	}
	
	public Map create(String queryId, DataRow dataRow, Map param)
			throws Exception {
		Map result = new LinkedHashMap();

		Object generatedKey = flexDao.create(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += ((Integer) result.get(queryId)).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}
	
	public Map update(String queryId, DataRow dataRow, Map param )throws Exception{
		Map result = new LinkedHashMap();

		Object generatedKey = flexDao.update(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += ((Integer) result.get(queryId)).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}
	
	public Map remove(String queryId, DataRow dataRow, Map param )throws Exception{
		Map result = new LinkedHashMap();

		Object generatedKey = flexDao.delete(queryId, dataRow, param);
		int insertCnt = 1;
		if (result.containsKey(queryId)) {
			insertCnt += ((Integer) result.get(queryId)).intValue();
		}
		result.put(queryId, insertCnt);

		return result;
	}

}
