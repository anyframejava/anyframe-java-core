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

import org.anyframe.plugin.flex.query.domain.Movie;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Jonghoon Kim
 */
@Repository("flexQueryMovieDao")
public class MovieDao extends QueryServiceDaoSupport {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Movie movie) {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		super.create("createFlexQueryMovie", movie);
	}

	public void remove(String movieId) {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		super.remove("removeFlexQueryMovie", movie);
	}

	public void update(Movie movie) {
		super.update("updateFlexQueryMovie", movie);
	}

	public Movie get(String movieId) {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return super.findByPk("findFlexQueryMovieByPk", movie);
	}

	public List<Movie> getList(Movie movie) {
		return super.findList("findFlexQueryMovieList", movie);
	}

}
