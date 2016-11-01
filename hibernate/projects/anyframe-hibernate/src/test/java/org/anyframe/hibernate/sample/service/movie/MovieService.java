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
package org.anyframe.hibernate.sample.service.movie;

import java.util.List;

import org.anyframe.hibernate.sample.model.bidirection.Category;
import org.anyframe.hibernate.sample.model.bidirection.Country;
import org.anyframe.hibernate.sample.model.bidirection.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SuppressWarnings("unchecked")
public interface MovieService {
	Logger LOGGER = LoggerFactory.getLogger(MovieService.class.getName());

	List findMovieListAll() throws Exception;

	List findMovieList(int conditionType, String condition) throws Exception;

	List findMovieListWithSQL(int conditionType, String condition)
			throws Exception;

	List findMovieListWithoutReturn(int conditionType, String condition)
			throws Exception;

	List findMovieListWithScalar(int conditionType, String condition)
			throws Exception;

	List findMovieListByCountry(String countryCode) throws Exception;

	Movie findMovie(String movieId) throws Exception;

	void createMovie(Movie movie) throws Exception;

	void createMovieList(List movieList) throws Exception;

	void updateMovie(Movie movie) throws Exception;

	void removeMovie(Movie movie) throws Exception;

	void createCountry(Country country) throws Exception;

	void createCategory(Category category) throws Exception;
}
