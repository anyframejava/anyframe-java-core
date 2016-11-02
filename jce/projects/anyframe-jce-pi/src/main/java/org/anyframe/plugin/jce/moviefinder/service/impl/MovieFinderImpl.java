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
package org.anyframe.plugin.jce.moviefinder.service.impl;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jce.domain.Movie;
import org.anyframe.plugin.jce.moviefinder.service.MovieFinder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * This MovieFinderImpl class is an Implementation class to provide movie list
 * functionality.
 * 
 * @author Joonbo Jang
 * @author Sooyeon Park
 */
@Service("jceMovieFinder")
public class MovieFinderImpl implements MovieFinder {

//	@Inject
//	@Named("jceMovieDao")
	@Autowired
	private GenericDao<Movie> movieDao;

	// All Daos are injected with @Order value...
	@Autowired
	private List<GenericDao> daos;

	public Page getPagingList(Movie movie, int pageIndex) throws Exception {
		return movieDao.getPagingList(movie, pageIndex);
	}

	public void showMyDaos() {
		for (GenericDao dao : daos) {
			System.out.println(dao.getDaoName());
		}
	}

}
