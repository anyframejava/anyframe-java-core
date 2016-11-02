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
package org.anyframe.sample.cxf.jaxrs.moviefinder.service.impl;

import java.util.List;

import javax.ws.rs.core.Response;

import org.anyframe.sample.cxf.jaxrs.domain.Movie;
import org.anyframe.sample.cxf.jaxrs.domain.Movies;
import org.anyframe.sample.cxf.jaxrs.moviefinder.service.MovieService;

public class MovieServiceImpl implements MovieService {

	private MovieDao movieDao = null;

	public MovieServiceImpl() {
		this.setMovieDao(new MovieDao());
	}

	public void setMovieDao(MovieDao movieDao) {
		this.movieDao = movieDao;
	}

	public Movies findMovieListAll() throws Exception {
		List<Movie> movieList = this.movieDao.findMovieListAll();
		Movies movies = new Movies();
		movies.setMovie(movieList);
		return movies;
	}

	public Movie findMovie(String movieId) throws Exception {
		return this.movieDao.fineMovie(movieId);
	}

	public Response createMovie(Movie movie) throws Exception {
		this.movieDao.createMovie(movie);
		return Response.ok(movie).build();
	}

	public Response updateMovie(Movie movie) throws Exception {
		this.movieDao.updateMovie(movie);
		return Response.ok(movie).build();
	}

	public Response removeMovie(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		this.movieDao.removeMovie(movie);
		return Response.ok().build();
	}

	public Response createMovies(Movies movies) throws Exception {
		this.movieDao.createMovies(movies);
		return Response.ok().build();
	}

}
