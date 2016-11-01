/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.remoting.moviefinder.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.anyframe.sample.remoting.domain.Category;
import org.anyframe.sample.remoting.domain.Country;
import org.anyframe.sample.remoting.domain.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public interface MovieService {

	Logger LOGGER = LoggerFactory.getLogger(MovieService.class.getName());

	List<Movie> findMovieListAll() throws Exception;

	Map<String, Movie> findMovieMapAll() throws Exception;

	List<Movie> findMovieList(Country country, Category category)
			throws Exception;

	Movie findMovie(String movieId) throws Exception;

	void createMovie(Movie movie) throws Exception;

	void updateMovie(Movie movie) throws Exception;

	void removeMovie(Movie movie) throws Exception;

	// ================= method for Type tests
	int testMovieIntVal(int val);

	long testMovieLongVal(long val);

	short testMovieShortVal(short val);

	float testMovieFloatVal(float val);

	double testMovieDoubleVal(double val);

	BigDecimal testMovieBigDecimalVal(BigDecimal val);

	boolean testMovieBooleanVal(boolean val);

	Character testMovieCharacterVal(Character val);

}
