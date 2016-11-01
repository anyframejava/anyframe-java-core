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

public class MovieServiceImpl implements MovieService {

	private MovieDao movieDao;

	public void setMovieDao(MovieDao movieDao) {
		this.movieDao = movieDao;
	}

	public void createMovie(Movie movie) {
		movieDao.createMovie(movie);
	}

	public void createMovieList(List<Movie> movieList) {
		movieDao.createMovieList(movieList);
	}

	public Movie findMovie(String movieId) {
		return movieDao.findMovie(movieId);
	}

	public List<Movie> findMovieList(int conditionType, String condition) {
		return movieDao.findMovieList(conditionType, condition);
	}

	public List<Movie> findMovieListWithSQL(int conditionType, String condition) {
		return movieDao.findMovieListWithSQL(conditionType, condition);
	}

	public List<Object[]> findMovieListWithoutReturn(int conditionType,
			String condition) {
		return movieDao.findMovieListWithoutReturn(conditionType,
				condition);
	}

	public List<Object[]> findMovieListWithScalar(int conditionType,
			String condition) {
		return movieDao.findMovieListWithScalar(conditionType, condition);
	}

	public List<Object[]> findMovieListByCountry(String countryCode) {
		return movieDao.findMovieListByCountry(countryCode);
	}

	public List<Movie> findMovieListAll() {
		return findMovieListAll();
	}

	public void removeMovie(Movie movie) {
		movieDao.removeMovie(movie);
	}

	public void updateMovie(Movie movie) {
		movieDao.updateMovie(movie);
	}

	public void createCategory(Category category) {
		movieDao.createCategory(category);
	}

	public void createCountry(Country country) {
		movieDao.createCountry(country);
	}
}
