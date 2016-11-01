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
package org.anyframe.plugin.xp.query.moviefinder.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.plugin.xp.query.moviefinder.service.MovieService;
import org.anyframe.xp.query.impl.XPQueryServiceImpl;
import org.anyframe.xp.query.service.impl.XPDao;
import org.anyframe.xp.query.service.impl.XPServiceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Movie Service Class to provide functions to connect Database
 * 
 * @author Youngmin Jo
 */
@Service("xpQueryMovieService")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class MovieServiceImpl extends XPServiceImpl implements MovieService{

	@Inject
	public MovieServiceImpl(XPDao xpDao){
		super.xpDao = xpDao;
	}
	
	public void getList(VariableList inVL, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		DataSet outDs = xpDao.getList("findXPMovieList", inDl.get("dsSearch"));
		outDs.setName("dsResult");
		outDl.add(outDs);
	}
	
	public void saveAll(VariableList inVL, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		Map<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(XPQueryServiceImpl.QUERY_INSERT, "createXPMovie");
		sqlMap.put(XPQueryServiceImpl.QUERY_UPDATE, "updateXPMovie");
		sqlMap.put(XPQueryServiceImpl.QUERY_DELETE, "removeXPMovie");
		
		xpDao.saveAll(sqlMap, inDl.get("dsSave"), new MovieActionCommand());
	}
	
	public void create(DataSet dataSet) throws Exception{
		xpDao.create("createXPMovie", dataSet, new MovieActionCommand());
	}
	
	public void get(VariableList inVL, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		xpDao.get("findXPMovieByPk", inDl.get("dsMovie").getString(0, "MOVIE_ID"));
	}
	
	public void update(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		xpDao.update("updateXPMovie", inDl.get("dsMovie"));
	}
}
