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
package org.anyframe.plugin.mobile.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Service;
import org.anyframe.pagination.Page;
import org.anyframe.plugin.mobile.domain.Movie;
import org.anyframe.plugin.mobile.moviefinder.service.MovieFinder;

/**
 * This MovieFinderImpl class is an Implementation class to provide movie list
 * functionality.
 * 
 * @author Jongpil Park
 */
@Service("mobileMovieFinder")
public class MovieFinderImpl implements MovieFinder {

	@Inject
	@Named("mobileMovieDao")
	private MovieDao movieDao;
	
	@Override
	public Movie get(String movieId) throws Exception {
		return movieDao.get(movieId);
	}

	@Override
	public Page getPagingListWithDate(String startDate, String endDate, String title, int pageIndex, int pageSize) throws Exception {
		return movieDao.getPagingListWithDate(startDate, endDate, title, pageIndex, pageSize);
	}


}
