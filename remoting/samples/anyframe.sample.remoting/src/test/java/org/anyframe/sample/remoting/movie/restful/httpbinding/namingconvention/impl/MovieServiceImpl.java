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
package org.anyframe.sample.remoting.movie.restful.httpbinding.namingconvention.impl;

import java.util.Collection;
import java.util.List;

import javax.jws.WebService;

import org.anyframe.sample.remoting.movie.restful.httpbinding.namingconvention.Movie;
import org.anyframe.sample.remoting.movie.restful.httpbinding.namingconvention.MovieService;


@WebService(endpointInterface = "org.anyframe.sample.remoting.movie.restful.httpbinding.namingconvention.MovieService")
public class MovieServiceImpl implements MovieService {

    private MovieDAO movieDAO = null;

    public MovieServiceImpl() {
        this.setMovieDAO(new MovieDAODefaultImpl());
    }

    public void setMovieDAO(MovieDAO movieDAO) {
        this.movieDAO = movieDAO;
    }

    public Collection<Movie> getMovies() throws Exception {
        List<Movie> movieList = this.movieDAO.findMovieListAll();
        return movieList;
    }

    public Movie getMovie(String movieId) throws Exception {
        return this.movieDAO.fineMovie(movieId);
    }

    public void addMovie(Movie movie) throws Exception {
        this.movieDAO.createMovie(movie);
    }

    public void updateMovie(String movieId, Movie movie) throws Exception {
        this.movieDAO.updateMovie(movie);
    }

    public void deleteMovie(String movieId) throws Exception {
        Movie movie = new Movie();
        movie.setMovieId(movieId);
        this.movieDAO.removeMovie(movie);
    }

}
