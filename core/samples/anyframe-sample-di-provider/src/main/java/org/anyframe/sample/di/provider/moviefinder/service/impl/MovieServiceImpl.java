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
package org.anyframe.sample.di.provider.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;

import org.anyframe.sample.di.provider.moviefinder.domain.Movie;
import org.anyframe.sample.di.provider.moviefinder.service.MovieService;

/**
 * This MovieServiceImpl class is an implementation class to get movie
 * information.
 * 
 * @author Sooyeon Park
 */
@Named
public class MovieServiceImpl implements MovieService {
	@Inject
	private Provider<MovieDao> movieDaoFactory;

	public Movie get(String movieId) throws Exception {
		// get movieDao instance calling get()
		MovieDao movieDao = movieDaoFactory.get();
		System.out.println("#1 MovieDao instance : " + movieDao);

		movieDao = movieDaoFactory.get();
		System.out.println("#2 MovieDao instance : " + movieDao);

		return movieDaoFactory.get().get(movieId);
	}
}
