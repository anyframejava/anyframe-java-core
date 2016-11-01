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
package org.anyframe.sample.mybatis.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.domain.Movie;
import org.anyframe.sample.mybatis.moviefinder.dao.MovieDao;
import org.anyframe.sample.mybatis.moviefiner.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Jongpil Park
 */
@Service("mybatisMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("movieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws Exception {
		movieDao.createMovie(movie);
	}

	public void remove(String movieId) throws Exception {
		movieDao.removeMovie(movieId);
	}

	public void update(Movie movie) throws Exception {
		movieDao.updateMovie(movie);
	}

	public Movie get(String movieId) throws Exception {
		return movieDao.getMovie(movieId);
	}

}
