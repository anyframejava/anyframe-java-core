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
package org.anyframe.plugin.ibatis2.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.ibatis2.domain.Movie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Repository;

import com.ibatis.sqlmap.client.SqlMapClient;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Sooyeon Park
 */
@Repository("ibatis2MovieDao")
public class MovieDao extends SqlMapClientDaoSupport {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	@Inject
	public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
		super.setSqlMapClient(sqlMapClient);
	}

	public void create(Movie movie) {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		super.getSqlMapClientTemplate().insert("insertMovie", movie);
	}

	public void update(Movie movie) {
		super.getSqlMapClientTemplate().update("updateMovie", movie);
	}

	public void remove(String movieId) {
		super.getSqlMapClientTemplate().delete("deleteMovie", movieId);
	}

	public Movie get(String movieId) {
		return (Movie) super.getSqlMapClientTemplate().queryForObject(
				"getMovie", movieId);
	}

	@SuppressWarnings("unchecked")
	public Page getPagingList(Movie movie, int pageIndex) {
		Movie searchArgs = new Movie();
		searchArgs.setTitle("%" + movie.getTitle() + "%");
		searchArgs.setNowPlaying(movie.getNowPlaying());

		List<Movie> list = super.getSqlMapClientTemplate().queryForList(
				"getMovieList", searchArgs, pageSize * (pageIndex - 1),
				pageSize);
		int rowCount = (Integer) super.getSqlMapClientTemplate()
				.queryForObject("getMovieListCnt", searchArgs);

		return new Page(list, pageIndex, rowCount, pageUnit, pageSize);
	}

}
