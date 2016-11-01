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
package org.anyframe.plugin.cxf.jaxrs.moviefinder.service;

import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.anyframe.plugin.cxf.jaxrs.domain.Movie;

/**
 * This MovieService class is an Interface class to provide movie crud
 * functionality.
 * 
 * @author Jeryeon Kim
 */
@Path("/movies/")
@Produces("application/xml")
public interface MovieService {

	@POST
	Response create(Movie movie) throws Exception;

	@GET
	@Path("/{movieId}/")
	Response get(@PathParam("movieId") String movieId) throws Exception;

	@PUT
	Response update(Movie movie) throws Exception;

	@DELETE
	@Path("/{movieId}/")
	Response remove(@PathParam("movieId") String movieId)
			throws Exception;

	@GET
	Response getPagingList(@QueryParam("") Movie movie,
			@QueryParam("pageIndex") @DefaultValue("1") int pageIndex)
			throws Exception;
}