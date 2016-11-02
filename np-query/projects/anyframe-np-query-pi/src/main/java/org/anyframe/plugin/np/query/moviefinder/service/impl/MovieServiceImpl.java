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
package org.anyframe.plugin.np.query.moviefinder.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.np.query.impl.NPQueryServiceImpl;
import org.anyframe.np.query.service.impl.NPDao;
import org.anyframe.np.query.service.impl.NPServiceImpl;
import org.anyframe.np.query.web.NPController;
import org.anyframe.plugin.np.query.moviefinder.service.MovieService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.Debugger;
import com.nexacro.xapi.data.VariableList;


/**
 * Movie Service Class to provide functions to connect Database
 * 
 */
@Service("npQueryMovieService")
@Transactional(rollbackFor = {Exception.class}, propagation = Propagation.REQUIRED)
public class MovieServiceImpl extends NPServiceImpl implements MovieService{

	@Inject
	public MovieServiceImpl(NPDao npDao){
		super.npDao = npDao;
	}

	Logger logger = LoggerFactory.getLogger(NPController.class);

	public void getList(VariableList inVL, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		DataSet outDs = npDao.getList("findXPMovieList", inDl.get("dsSearch"));
		outDs.setName("dsResult");
		outDl.add(outDs);
		Debugger debugger = new Debugger();
		logger.debug("Input VariableSetList");
		logger.debug(debugger.detail(outDs));
	}
	
	public void saveAll(VariableList inVL, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		Map<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(NPQueryServiceImpl.QUERY_INSERT, "createXPMovie");
		sqlMap.put(NPQueryServiceImpl.QUERY_UPDATE, "updateXPMovie");
		sqlMap.put(NPQueryServiceImpl.QUERY_DELETE, "removeXPMovie");
		
		npDao.saveAll(sqlMap, inDl.get("dsSave"), new MovieActionCommand());
	}
	
	public void create(DataSet dataSet) throws Exception{
		npDao.create("createXPMovie", dataSet, new MovieActionCommand());

	}
	
	public void get(VariableList inVL, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		npDao.get("findXPMovieByPk", inDl.get("dsMovie").getString(0, "MOVIE_ID"));
	}
	
	public void update(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception{
		npDao.update("updateXPMovie", inDl.get("dsMovie"));
	}


}
