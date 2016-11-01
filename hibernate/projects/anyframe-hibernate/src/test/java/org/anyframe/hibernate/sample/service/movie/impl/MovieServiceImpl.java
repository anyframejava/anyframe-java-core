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

import org.anyframe.hibernate.sample.model.bidirection.Category;
import org.anyframe.hibernate.sample.model.bidirection.Country;
import org.anyframe.hibernate.sample.model.bidirection.Movie;
import org.anyframe.hibernate.sample.service.movie.MovieService;

@SuppressWarnings("unchecked")
public class MovieServiceImpl implements MovieService {

	private MovieDao movieDao;

	public void setMovieDao(MovieDao movieDao) {
		this.movieDao = movieDao;
	}

	public void createMovie(Movie movie) throws Exception {
		this.movieDao.createMovie(movie);
	}

	public void createMovieList(List movieList) throws Exception {
		this.movieDao.createMovieList(movieList);
	}

	public Movie findMovie(String movieId) throws Exception {
		return this.movieDao.findMovie(movieId);
	}

	public List findMovieList(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieList(conditionType, condition);
	}

	public List findMovieListWithSQL(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieListWithSQL(conditionType, condition);
	}

	public List findMovieListWithoutReturn(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieListWithoutReturn(conditionType,
				condition);
	}

	public List findMovieListWithScalar(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieListWithScalar(conditionType, condition);
	}

	public List findMovieListByCountry(String countryCode) throws Exception {
		return this.movieDao.findMovieListByCountry(countryCode);
	}

	public List findMovieListAll() throws Exception {
		return this.findMovieListAll();
	}

	public void removeMovie(Movie movie) throws Exception {
		this.movieDao.removeMovie(movie);
	}

	public void updateMovie(Movie movie) throws Exception {
		this.movieDao.updateMovie(movie);
	}

	public void createCategory(Category category) throws Exception {
		this.movieDao.createCategory(category);
	}

	public void createCountry(Country country) throws Exception {
		this.movieDao.createCountry(country);
	}
}
