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
package org.anyframe.sample.javaconfig.moviefinder.service.impl;

import java.util.List;

import org.anyframe.sample.javaconfig.moviefinder.domain.Movie;
import org.anyframe.sample.javaconfig.moviefinder.service.MovieFinder;

/**
 * This MovieFinderImpl class is an Implementation class to provide movie list
 * functionality.
 * 
 * @author Sooyeon Park
 */
public class MovieFinderImpl implements MovieFinder {
	
	private MovieFinderDao movieFinderDao;

	public void initialize() {
		System.out.println("Initializing MovieFinderImpl");
	}

	public void destroy() {
		System.out.println("Destroying MovieFinderImpl");
	}

	public MovieFinderImpl(MovieFinderDao movieFinderDao) {
		System.out.println("Calling constructor of MovieFinderImpl");
		this.movieFinderDao = movieFinderDao;
	}

	public List<Movie> getPagingList(Movie movie, int pageIndex)
			throws Exception {
		return movieFinderDao.getPagingList(movie, pageIndex);
	}

}
