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

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mobile.domain.Movie;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Jongpil Park
 */
@Repository("mobileMovieDao")
public class MovieDao extends SqlSessionDaoSupport {

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	public void create(Movie movie) {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		super.getSqlSession().insert("Movie.insertMovie", movie);
	}

	public void update(Movie movie) {
		super.getSqlSession().update("Movie.updateMovie", movie);
	}

	public void remove(String movieId) {
		super.getSqlSession().delete("Movie.deleteMovie", movieId);
	}

	public Movie get(String movieId) {
		return super.getSqlSession().selectOne("Movie.getMovie", movieId);
	}
	
	public Page getPagingListWithDate(String startDate, String endDate, String title, int pageIndex, int pageSize) throws ParseException {
		Movie searchArgs = new Movie();
		DateFormat sdFormat = new SimpleDateFormat("yyyyMMdd", Locale.ENGLISH);
		if(StringUtils.isNotEmpty(startDate)) {
			Date start = sdFormat.parse(startDate);			
			searchArgs.setStartDate(start);
		}
		if(StringUtils.isNotEmpty(endDate)) {
			Date end = sdFormat.parse(endDate);
			searchArgs.setEndDate(end);
		}

		searchArgs.setTitle(title);

		List<Movie> list = super.getSqlSession().selectList(
				"Movie.getMovieListWithDate", searchArgs,
				new RowBounds(pageSize * (pageIndex - 1), pageSize));

		int rowCount = (Integer) super.getSqlSession().selectOne(
				"Movie.getMovieListCnt", searchArgs);

		return new Page(list, pageIndex, rowCount, pageUnit, pageSize);
	}
	
	
}
