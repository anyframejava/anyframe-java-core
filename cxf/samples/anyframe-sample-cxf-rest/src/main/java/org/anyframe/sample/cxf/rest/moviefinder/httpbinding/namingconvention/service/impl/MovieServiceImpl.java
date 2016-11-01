/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service.impl;

import java.util.Collection;
import java.util.List;

import javax.jws.WebService;

import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain.Movie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service.MovieService;

@WebService(endpointInterface = "org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service.MovieService")
public class MovieServiceImpl implements MovieService {

	private MovieDao movieDao = null;

	public MovieServiceImpl() {
		this.setMovieDao(new MovieDao());
	}

	public void setMovieDao(MovieDao movieDao) {
		this.movieDao = movieDao;
	}

	public Collection<Movie> getMovies() throws Exception {
		List<Movie> movieList = this.movieDao.findMovieListAll();
		return movieList;
	}

	public Movie getMovie(String movieId) throws Exception {
		return this.movieDao.fineMovie(movieId);
	}

	public void deleteMovie(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		this.movieDao.removeMovie(movie);
	}

}
