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
package org.anyframe.plugin.hibernate.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.hibernate.domain.Movie;
import org.anyframe.plugin.hibernate.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * The MovieServiceImpl class is an implementation class to provide CRUD
 * functions about Movie domain.
 * 
 * @author Youngmin Jo
 */
@Service("hibernateMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("hibernateMovieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws Exception {
		movieDao.create(movie);
	}

	public void remove(String movieId) throws Exception {
		movieDao.remove(movieId);
	}

	public void update(Movie movie) throws Exception {
		movieDao.update(movie);
	}

	public Movie get(String movieId) throws Exception {
		return movieDao.get(movieId);
	}
}
