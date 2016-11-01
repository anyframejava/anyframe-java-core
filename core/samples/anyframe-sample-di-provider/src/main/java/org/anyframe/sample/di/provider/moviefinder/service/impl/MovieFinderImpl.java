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

import java.util.List;

import javax.inject.Named;

import org.anyframe.sample.di.provider.moviefinder.domain.Movie;
import org.anyframe.sample.di.provider.moviefinder.service.MovieFinder;

/**
 * This MovieFinderImpl class is an Implementation class to provide movie list
 * functionality.
 * 
 * @author Sooyeon Park
 */
@Named
public class MovieFinderImpl extends GenericMovieFinder<MovieDao> implements
		MovieFinder {
	public List<Movie> getPagingList(Movie movie, int pageIndex)
			throws Exception {
		// get movieDao instance calling get()
		MovieDao movieDao = get();
		System.out.println("#1 MovieDao instance : " + movieDao);

		movieDao = get();
		System.out.println("#2 MovieDao instance : " + movieDao);

		return movieDao.getPagingList(movie, pageIndex);
	}
}
