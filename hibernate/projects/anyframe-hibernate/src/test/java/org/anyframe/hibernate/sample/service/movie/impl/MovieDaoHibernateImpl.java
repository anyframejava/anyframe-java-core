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
package org.anyframe.hibernate.sample.service.movie.impl;

import java.util.List;

import org.anyframe.hibernate.impl.DynamicHibernateServiceImpl;
import org.anyframe.hibernate.sample.model.bidirection.Category;
import org.anyframe.hibernate.sample.model.bidirection.Country;
import org.anyframe.hibernate.sample.model.bidirection.Movie;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

@SuppressWarnings("unchecked")
public class MovieDaoHibernateImpl extends HibernateDaoSupport implements
		MovieDao {

	private DynamicHibernateServiceImpl dynamicHibernateService;

	public void setDynamicHibernateService(
			DynamicHibernateServiceImpl dynamicHibernateService) {
		this.dynamicHibernateService = dynamicHibernateService;
	}

	public void createMovie(Movie movie) throws Exception {
		this.getHibernateTemplate().save(movie);
	}

	public void createMovieList(List movieList) throws Exception {
		for (int i = 0; i < movieList.size(); i++) {
			Movie movie = (Movie) movieList.get(i);
			this.createMovie(movie);
			if (i == 1) {
				throw new Exception(
						"test exception for transaction management in definitive way.");
			}
		}
	}

	public Movie findMovie(String movieId) throws Exception {
		return (Movie) this.getHibernateTemplate().get(Movie.class, movieId);
	}

	public List findMovieList(int conditionType, String condition)
			throws Exception {
		return dynamicHibernateService.findList("dynamicFindMovieListAll",
				makeArguments(conditionType, condition));
	}

	public List findMovieListWithSQL(int conditionType, String condition)
			throws Exception {
		return dynamicHibernateService.findList("dynamicFindMovieListWithSQL",
				makeArguments(conditionType, condition));
	}

	public List findMovieListWithoutReturn(int conditionType, String condition)
			throws Exception {
		return dynamicHibernateService.findList(
				"dynamicFindMovieListWithoutReturn", makeArguments(
						conditionType, condition));
	}

	public List findMovieListWithScalar(int conditionType, String condition)
			throws Exception {
		Object[] args = new Object[3];
		if (conditionType == 0) {
			args[0] = "director=%" + condition + "%";
			args[1] = "sortColumn=movie.director";
		} else {
			args[0] = "title=%" + condition + "%";
			args[1] = "sortColumn=movie.title";
		}
		args[2] = "sortDirection=ASC";

		return dynamicHibernateService.findList(
				"dynamicFindMovieListWithScalar", args);
	}

	public List findMovieListByCountry(String countryCode) throws Exception {
		Object[] args = new Object[3];
		args[0] = "countryCode=%" + countryCode + "%";
		args[1] = "sortColumn=movie.director";
		args[2] = "sortDirection=ASC";

		return dynamicHibernateService.findList(
				"dynamicFindMovieListByCountry", args);
	}

	public List findMovieListAll() throws Exception {
		return this.getHibernateTemplate().find(
				"FROM Movie movie ORDER BY movie.title");
	}

	public void removeMovie(Movie movie) throws Exception {
		this.getHibernateTemplate().delete(movie);
	}

	public void updateMovie(Movie movie) throws Exception {
		this.getHibernateTemplate().update(movie);
	}

	public void updateMovieByBulk(Movie movie) throws Exception {
		StringBuffer hqlBuf = new StringBuffer();
		hqlBuf.append("UPDATE Movie movie ");
		hqlBuf.append("SET movie.director = ? ");
		hqlBuf.append("WHERE movie.movieId = ? ");

		this.getHibernateTemplate().bulkUpdate(hqlBuf.toString(),
				new Object[] { movie.getDirector(), movie.getMovieId() });
	}

	public void createCategory(Category category) throws Exception {
		this.getHibernateTemplate().save(category);
	}

	public void createCountry(Country country) throws Exception {
		this.getHibernateTemplate().save(country);
	}

	private Object[] makeArguments(int conditionType, String condition) {
		Object[] args = new Object[3];
		if (conditionType == 0) {
			args[0] = "director=%" + condition + "%";
			args[1] = "sortColumn=movie.director";
		} else {
			args[0] = "title=%" + condition + "%";
			args[1] = "sortColumn=movie.title";
		}
		args[2] = "sortDirection=ASC";

		return args;
	}
}
