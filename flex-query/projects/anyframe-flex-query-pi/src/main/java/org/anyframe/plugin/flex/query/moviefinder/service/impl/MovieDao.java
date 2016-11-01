/*
 * Copyright 2008-2011 the original author or authors.
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
import org.anyframe.query.dao.AbstractDao;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Jonghoon Kim
 */
@Repository("flexQueryMovieDao")
public class MovieDao extends AbstractDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Movie movie) throws Exception {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		create("FlexQueryMovie", movie);
	}

	public void remove(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		remove("FlexQueryMovie", movie);
	}

	public void update(Movie movie) throws Exception {
		update("FlexQueryMovie", movie);
	}

	public Movie get(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return (Movie) findByPk("FlexQueryMovie", movie);
	}

	public List getList(Movie movie) throws Exception {
		return (List) this.findList("FlexQueryMovie", movie);
	}
}
