/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.mip.query.moviefinder.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.mip.query.impl.MiPQueryServiceImpl;
import org.anyframe.mip.query.service.impl.MiPDao;
import org.anyframe.mip.query.service.impl.MiPServiceImpl;
import org.anyframe.plugin.mip.query.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Jonghoon Kim
 */
@Service("mipQueryMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl extends MiPServiceImpl implements MovieService {

	@Inject
	public MovieServiceImpl(MiPDao mipDao){
		super.mipDao = mipDao;
	}

	public void saveAll(VariableList inVl, DatasetList inDl,
			VariableList outVl, DatasetList outDl) throws Exception {

		Map<String, String> sqlMap = new HashMap<String, String>();
		sqlMap.put(MiPQueryServiceImpl.QUERY_INSERT, "createMovie");
		sqlMap.put(MiPQueryServiceImpl.QUERY_UPDATE, "updateMovie");
		sqlMap.put(MiPQueryServiceImpl.QUERY_DELETE, "removeMovie");

		mipDao.saveAll(sqlMap, inDl.get("dsSave"), new MovieActionCommand());
	}

	public void getList(VariableList inVl, DatasetList inDl,
			VariableList outVl, DatasetList outDl) throws Exception {
		outDl.add("dsResult", mipDao.getList("findMovieList", inDl
				.get("dsSearch")));
	}

	public void create(Dataset ds) throws Exception {
		mipDao.create("createMovie", ds, new MovieActionCommand());
	}
}
