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
package org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service;

import java.util.Collection;

import javax.jws.WebService;

import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.domain.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebService(targetNamespace = "http://org.anyframe.sample.cxf.rest.moviefinder.httpbinding.namingconvention.service")
public interface MovieService {

	Logger LOGGER = LoggerFactory.getLogger(MovieService.class.getName());

	public Collection<Movie> getMovies() throws Exception;

	public Movie getMovie(String movieId) throws Exception;

	public void deleteMovie(String movieId) throws Exception;

}
