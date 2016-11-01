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
package org.anyframe.plugin.flex.query.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.flex.query.domain.Movie;
import org.anyframe.plugin.flex.query.moviefinder.service.MovieFinder;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;

/**
 * This MovieFinderImpl class is an Implementation class to provide movie list
 * functionality.
 * 
 * @author Jonghoon Kim
 */
@Service("flexQueryMovieFinder")
@RemotingDestination
public class MovieFinderImpl implements MovieFinder {

	@Inject
	@Named("flexQueryMovieDao")
	private MovieDao movieDao;

	public List<Movie> getList(Movie movie) throws Exception {
		return movieDao.getList(movie);
	}
	
}
