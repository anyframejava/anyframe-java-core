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
package org.anyframe.plugin.cxf.jaxrs.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.anyframe.plugin.cxf.jaxrs.domain.Movie;
import org.anyframe.plugin.cxf.jaxrs.domain.ResultPage;
import org.anyframe.plugin.cxf.jaxrs.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Jeryeon Kim
 */
@Service("cxfJaxRsMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("cxfJaxRsMovieDao")
	private MovieDao movieDao;

	public Response create(Movie movie) throws Exception {
		movieDao.create(movie);
		return Response.status(Status.CREATED).build();
	}

	public Response get(String movieId) throws Exception {
		Movie movie = movieDao.get(movieId);
		if (movie == null)
			return Response.status(Status.NOT_FOUND).build();
		return Response.ok(movie).build();
	}

	public Response update(Movie movie) throws Exception {
		movieDao.update(movie);
		return Response.status(Status.NO_CONTENT).build();
	}

	public Response remove(String movieId) throws Exception {
		movieDao.remove(movieId);
		return Response.status(Status.NO_CONTENT).build();
	}

	public Response getPagingList(Movie movie, int pageIndex) throws Exception {
		ResultPage resultPage = new ResultPage();
		resultPage.setPage(movieDao.getPagingList(movie, pageIndex));
		return Response.ok(resultPage).build();
	}
}