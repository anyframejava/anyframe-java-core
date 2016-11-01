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
package org.anyframe.sample.remoting.movie.restful.jaxrs;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.ProduceMime;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlSeeAlso;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@Path("/movieservice/")
@ProduceMime("application/xml")
@XmlSeeAlso(Movie.class)
public interface MovieService {

    Log LOGGER = LogFactory.getLog(MovieService.class.getName());

    @GET
    @Path("/movies/")
    public Movies findMovieListAll() throws Exception;

    @GET
    @Path("/movies/{movieId}/")
    public Movie findMovie(@PathParam("movieId")
    String movieId) throws Exception;

    @POST
    @Path("/movies/")
    public Response createMovie(Movie movie) throws Exception;
    
    @POST
    @Path("/movielist/")
    public Response createMovies(Movies movies) throws Exception;    

    @PUT
    @Path("/movies/")
    public Response updateMovie(Movie movie) throws Exception;

    @DELETE
    @Path("/movies/{movieId}/")
    public Response removeMovie(@PathParam("movieId")
    String movieId) throws Exception;

}
