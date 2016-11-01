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
package org.anyframe.sample.remoting.movie.restful.jaxrs.impl;

import java.util.Iterator;
import java.util.List;

import javax.ws.rs.core.Response;

import org.anyframe.sample.remoting.movie.restful.jaxrs.Movie;
import org.anyframe.sample.remoting.movie.restful.jaxrs.MovieService;
import org.anyframe.sample.remoting.movie.restful.jaxrs.Movies;


public class MovieServiceImpl implements MovieService {

    private MovieDAO movieDAO = null;

    public MovieServiceImpl() {
        this.setMovieDAO(new MovieDAODefaultImpl());
    }

    public void setMovieDAO(MovieDAO movieDAO) {
        this.movieDAO = movieDAO;
    }

    public Movies findMovieListAll() throws Exception {
        List<Movie> movieList = this.movieDAO.findMovieListAll();
        Movies movies = new Movies();
        movies.setMovie(movieList);        
        return movies;
    }

    public Movie findMovie(String movieId) throws Exception {
        return this.movieDAO.fineMovie(movieId);
    }

    public Response createMovie(Movie movie) throws Exception {
        this.movieDAO.createMovie(movie);
        return Response.ok(movie).build();
    }

    public Response updateMovie(Movie movie) throws Exception {
        this.movieDAO.updateMovie(movie);
        return Response.ok(movie).build();
    }

    public Response removeMovie(String movieId) throws Exception {
        Movie movie = new Movie();
        movie.setMovieId(movieId);
        this.movieDAO.removeMovie(movie);
        return Response.ok().build();
    }
    
    public Response createMovies(Movies movies) throws Exception{
        this.movieDAO.createMovies(movies);
        return Response.ok().build();
    }

}
