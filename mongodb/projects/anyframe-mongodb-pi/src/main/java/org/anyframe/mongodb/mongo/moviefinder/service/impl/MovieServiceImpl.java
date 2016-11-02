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
package org.anyframe.mongodb.mongo.moviefinder.service.impl;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.springframework.stereotype.Service;

import org.anyframe.mongodb.mongo.domain.Movie;
import org.anyframe.mongodb.mongo.moviefinder.service.MovieService;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Joonbo Jang
 * @author Sooyeon Park
 */
@Service("mongoMovieService")
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("mongoMovieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws Exception {
		movieDao.create(movie);
	}

	public void remove(String movieId) throws Exception {
		movieDao.remove(movieId);
	}

	public void update(Movie movie) throws Exception {
		movieDao.save(movie);
	}

	public Movie get(String movieId) throws Exception {
		return movieDao.get(movieId);
	}
	
	public Page getPagingList(Movie movie, int pageIndex) throws Exception {
		return movieDao.getPagingList(movie, pageIndex);
	}
	
	/**
	 * Movie Collection Init Data 정의
	 * @throws Exception
	 */
	@PostConstruct
	public void init() throws Exception {
		if(movieDao.getList().size() == 0){
			movieDao.init();
		}
	}

}
