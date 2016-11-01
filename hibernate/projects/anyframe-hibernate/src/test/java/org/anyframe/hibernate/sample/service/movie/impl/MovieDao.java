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

public interface MovieDao {
	List<Movie> findMovieListAll();

	List<Movie> findMovieList(int conditionType, String condition);

	List<Movie> findMovieListWithSQL(int conditionType, String condition);

	List<Object[]> findMovieListWithoutReturn(int conditionType,
			String condition);

	List<Object[]> findMovieListWithScalar(int conditionType, String condition);

	List<Object[]> findMovieListByCountry(String countryCode);

	Movie findMovie(String movieId);

	void createMovie(Movie movie);

	void updateMovie(Movie movie);

	void removeMovie(Movie movie);

	void createCountry(Country movie);

	void createCategory(Category category);

	void createMovieList(List<Movie> movieList);
}
