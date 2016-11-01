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
package org.anyframe.sample.di.qualifier.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.di.qualifier.DaoQualifier;
import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;
import org.anyframe.sample.di.qualifier.moviefinder.service.MovieService;

/**
 * This MovieServiceImpl class is an implementation class to get movie
 * information by selected dao framework.
 * 
 * @author Sooyeon Park
 */
@Named
public class MovieServiceImpl implements MovieService {

	@Inject
	@DaoQualifier(type = "hibernate")
	private MovieDao hibernateMovieDao;

	@Inject
	@DaoQualifier
	private MovieDao queryMovieDao;

	public Movie getByHibernate(String movieId) throws Exception {
		return hibernateMovieDao.get(movieId);
	}

	public Movie getByQuery(String movieId) throws Exception {
		return queryMovieDao.get(movieId);
	}

}
