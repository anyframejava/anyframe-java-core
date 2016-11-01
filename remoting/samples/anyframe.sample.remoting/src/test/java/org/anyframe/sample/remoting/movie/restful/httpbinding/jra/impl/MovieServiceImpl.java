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
package org.anyframe.sample.remoting.movie.restful.httpbinding.jra.impl;

import java.util.List;

import javax.jws.WebParam;
import javax.jws.WebService;

import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.FindMovie;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.Movie;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.MovieService;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.Movies;
import org.anyframe.sample.remoting.movie.restful.httpbinding.jra.RemoveMovie;
import org.codehaus.jra.HttpResource;
import org.codehaus.jra.Post;


@WebService(endpointInterface = "org.anyframe.sample.remoting.movie.restful.httpbinding.jra.MovieService")
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

    public Movie findMovie(FindMovie movie) throws Exception {
        System.out.println("findMovie method is called.");
        System.out.println("movie id="+movie.getMovieId());
        
        return this.movieDAO.fineMovie(movie.getMovieId());
    }

    public void createMovie(Movie movie) throws Exception {
        this.movieDAO.createMovie(movie);
    }
    
    public void createMovies(Movies movies) throws Exception{
        this.movieDAO.createMovies(movies);
    }

    public void updateMovie(Movie movie) throws Exception {
        this.movieDAO.updateMovie(movie);
    }

    public void removeMovie(RemoveMovie removeMovie) throws Exception {
        Movie movie = new Movie();
        movie.setMovieId(removeMovie.getMovieId());
        this.movieDAO.removeMovie(movie);
    }

}
