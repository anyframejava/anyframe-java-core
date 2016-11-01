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
package org.anyframe.plugin.hibernate.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.hibernate.DynamicHibernateService;
import org.anyframe.pagination.Page;
import org.anyframe.plugin.hibernate.domain.Movie;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * The MovieDao class is a DAO class to provide CRUD functions about Movie
 * domain.
 * 
 * @author Youngmin Jo
 */
@Repository("hibernateMovieDao")
public class MovieDao extends HibernateDaoSupport {
	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	@Inject
	DynamicHibernateService dynamicHibernateService;

	@Inject
	public void setHibernateDaoSessionFactory(SessionFactory sessionFactory) {
		super.setSessionFactory(sessionFactory);
	}

	public void create(Movie movie) {
		// set movie id
		movie.setMovieId("MV-" + System.currentTimeMillis());
		super.getHibernateTemplate().save(movie);
	}

	public void remove(String movieId) {
		super.getHibernateTemplate().delete(get(movieId));
	}

	public void update(Movie movie) {
		super.getHibernateTemplate().update(movie);
	}

	public Movie get(String movieId) {
		return super.getHibernateTemplate().get(Movie.class, movieId);
	}

	public Page getPagingList(Movie movie, int pageIndex) {
		Object[] args = null;

		if (!"".equals(movie.getTitle())) {
			args = new Object[2];
			args[0] = new Object[] { "nowPlaying", movie.getNowPlaying() };
			args[1] = new Object[] { "title", "%" + movie.getTitle() + "%" };
		} else {
			args = new Object[1];
			args[0] = new Object[] { "nowPlaying", movie.getNowPlaying() };
		}

		List<Movie> resultList = dynamicHibernateService.findList(
				"findMovieList", args, pageIndex, pageSize);
		Long totalSize = dynamicHibernateService.find("countMovieList", args);

		// When domain object is exposed through web service,
		// LazyInitialisationException occurs.
		// To solve this problem, it converts domain object to dto by using
		// Gilead
		// List<Movie> movieList=(List<Movie>)beanManager.clone(resultList);

		Page resultPage = new Page(resultList, pageIndex, totalSize.intValue(),
				pageUnit, pageSize);
		return resultPage;
	}
}
