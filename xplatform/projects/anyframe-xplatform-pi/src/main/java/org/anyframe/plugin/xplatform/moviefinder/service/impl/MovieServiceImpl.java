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
package org.anyframe.plugin.xplatform.moviefinder.service.impl;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.xplatform.domain.Movie;
import org.anyframe.plugin.xplatform.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * The MovieServiceImpl class is an implementation class to provide CRUD
 * functions related with Movie domain object.
 * 
 * @author Youngmin Jo
 *
 */
@Service("xplatformMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("xplatformMovieDao")
	private MovieDao movieDao;
	
	public List<Map<String, Object>> getList(Map<String, Object> searchParamMap)
			throws Exception {
		return movieDao.getList(searchParamMap);
	}
	
	@SuppressWarnings("unchecked")
	public void saveAll(Map<String, Object> listMovie) throws Exception{
		List<Movie> insertList = (List<Movie>) listMovie.get("insert");
		List<Movie> updateList = (List<Movie>) listMovie.get("update");
		List<Movie> deleteList = (List<Movie>) listMovie.get("delete");
		
		for(int insertCount = 0 ; insertCount < insertList.size() ; insertCount++){
			movieDao.create(insertList.get(insertCount));
		}
		
		for(int updateCount = 0 ; updateCount < updateList.size() ; updateCount++){
			movieDao.update(updateList.get(updateCount));
		}
		
		for(int deleteCount = 0 ; deleteCount < deleteList.size() ; deleteCount++){
			movieDao.remove(deleteList.get(deleteCount).getMovieId());
		}
	}
}
