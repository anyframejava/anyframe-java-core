/*
 * Copyright 2002-2008 the original author or authors.
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
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public interface MovieService {

	Log LOGGER = LogFactory.getLog(MovieService.class.getName());

	public List<Movie> findMovieListAll() throws Exception;

	public Map<String, Movie> findMovieMapAll() throws Exception;

	public List<Movie> findMovieList(Country country, Category category)
			throws Exception;

	public Movie findMovie(String movieId) throws Exception;

	public void createMovie(Movie movie) throws Exception;

	public void updateMovie(Movie movie) throws Exception;

	public void removeMovie(Movie movie) throws Exception;

	// ================= method for Type tests
	public int testMovieIntVal(int val);

	public long testMovieLongVal(long val);

	public short testMovieShortVal(short val);

	public float testMovieFloatVal(float val);

	public double testMovieDoubleVal(double val);

	public BigDecimal testMovieBigDecimalVal(BigDecimal val);

	public boolean testMovieBooleanVal(boolean val);

	public Character testMovieCharacterVal(Character val);

	// public char testMovieCharVal(char val);
}
