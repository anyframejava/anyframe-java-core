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
package org.anyframe.plugin.ibatis2.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.ibatis2.domain.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Sooyeon Park
 */
@Repository("ibatis2MovieDao")
public class MovieDao {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	@Inject
	protected SqlMapClient sqlMap = null;

	public void create(Movie movie) throws Exception {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		sqlMap.insert("insertMovie", movie);
	}

	public void update(Movie movie) throws Exception {
		sqlMap.update("updateMovie", movie);
	}

	public void remove(String movieId) throws Exception {
		sqlMap.delete("deleteMovie", movieId);
	}

	public Movie get(String movieId) throws Exception {
		return (Movie) sqlMap.queryForObject("getMovie", movieId);
	}

	@SuppressWarnings("unchecked")
	public Page getPagingList(Movie movie, int pageIndex) throws Exception {
		Movie searchArgs = new Movie();
		searchArgs.setTitle("%" + movie.getTitle() + "%");
		searchArgs.setNowPlaying(movie.getNowPlaying());
		
		List<Movie> list = sqlMap.queryForList("getMovieList", searchArgs,
				pageSize * (pageIndex - 1), pageSize);
		int rowCount = (Integer) sqlMap
				.queryForObject("getMovieListCnt", searchArgs);

		return new Page(list, pageIndex, rowCount, pageUnit, pageSize);
	}

}
