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
package org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.service;

import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.FindMovie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.Movie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.Movies;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.RemoveMovie;
import org.codehaus.jra.Delete;
import org.codehaus.jra.Get;
import org.codehaus.jra.HttpResource;
import org.codehaus.jra.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebService
public interface MovieService {

	Logger LOGGER = LoggerFactory.getLogger(MovieService.class.getName());

	@Get
	@HttpResource(location = "/movies")
	@WebResult(name = "Movies", targetNamespace = "http://org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain")
	public Movies findMovieListAll() throws Exception;

	@Get
	@HttpResource(location = "/movies/{movieId}")
	@WebResult(name = "Movie", targetNamespace = "http://org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain")
	public Movie findMovie(FindMovie findMovie) throws Exception;

	@Post
	@HttpResource(location = "/movies")
	public void createMovie(@WebParam(name = "Movie") Movie movie)
			throws Exception;

	@Post
	@HttpResource(location = "/movielist")
	public void createMovies(@WebParam(name = "Movies") Movies movies)
			throws Exception;

	@Delete
	@HttpResource(location = "/movies/{movieId}")
	public void removeMovie(RemoveMovie removeMovie) throws Exception;

}
