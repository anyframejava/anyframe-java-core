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
package org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.service.impl;

import java.util.List;

import javax.jws.WebService;

import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.FindMovie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.Movie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.Movies;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.domain.RemoveMovie;
import org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.service.MovieService;


@WebService(endpointInterface = "org.anyframe.sample.cxf.rest.moviefinder.httpbinding.jra.service.MovieService")
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

    public Movie findMovie(FindMovie movie) throws Exception {
        System.out.println("findMovie method is called.");
        System.out.println("movie id="+movie.getMovieId());
        
        return this.movieDao.fineMovie(movie.getMovieId());
    }

    public void createMovie(Movie movie) throws Exception {
        this.movieDao.createMovie(movie);
    }
    
    public void createMovies(Movies movies) throws Exception{
        this.movieDao.createMovies(movies);
    }

    public void removeMovie(RemoveMovie removeMovie) throws Exception {
        Movie movie = new Movie();
        movie.setMovieId(removeMovie.getMovieId());
        this.movieDao.removeMovie(movie);
    }

}
