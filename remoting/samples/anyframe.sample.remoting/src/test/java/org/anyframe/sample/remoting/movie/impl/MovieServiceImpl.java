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
package org.anyframe.sample.remoting.movie.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.anyframe.sample.remoting.movie.Category;
import org.anyframe.sample.remoting.movie.Country;
import org.anyframe.sample.remoting.movie.Movie;
import org.anyframe.sample.remoting.movie.MovieService;


public class MovieServiceImpl implements MovieService {

    private MovieDAO movieDAO = null;

    public MovieServiceImpl() {
        this.setMovieDAO(new MovieDAODefaultImpl());
    }

    public void setMovieDAO(MovieDAO movieDAO) {
        this.movieDAO = movieDAO;
    }

    public List<Movie> findMovieListAll() throws Exception {
        return this.movieDAO.findMovieListAll();
    }

    public Map<String, Movie> findMovieMapAll() throws Exception {
        return this.movieDAO.findMovieMapAll();
    }

    public List<Movie> findMovieList(Country country, Category category)
            throws Exception {
        return this.movieDAO.findMovieList(country, category);
    }

    public Movie findMovie(String movieId) throws Exception {
        return this.movieDAO.fineMovie(movieId);
    }

    public void createMovie(Movie movie) throws Exception {
        this.movieDAO.createMovie(movie);
    }

    public void updateMovie(Movie movie) throws Exception {
        this.movieDAO.updateMovie(movie);
    }

    public void removeMovie(Movie movie) throws Exception {
        this.movieDAO.removeMovie(movie);
    }

    // ================= method for Type tests
    public int testMovieIntVal(int val) {
        Movie movie = new Movie();
        movie.setIntVal(val);
        return movie.getIntVal();
    }

    public long testMovieLongVal(long val) {
        Movie movie = new Movie();
        movie.setLongVal(val);
        return movie.getLongVal();
    }

    public short testMovieShortVal(short val) {
        Movie movie = new Movie();
        movie.setShortVal(val);
        return movie.getShortVal();
    }

    public float testMovieFloatVal(float val) {
        Movie movie = new Movie();
        movie.setFloatVal(val);
        return movie.getFloatVal();
    }

    public double testMovieDoubleVal(double val) {
        Movie movie = new Movie();
        movie.setDoubleVal(val);
        return movie.getDoubleVal();
    }

    public BigDecimal testMovieBigDecimalVal(BigDecimal val) {
        Movie movie = new Movie();
        movie.setBdVal(val);
        return movie.getBdVal();
    }

    public boolean testMovieBooleanVal(boolean val) {
        Movie movie = new Movie();
        movie.setBooleanVal(val);
        return movie.isBooleanVal();
    }

    public Character testMovieCharacterVal(Character val) {
        Movie movie = new Movie();
        movie.setCharacterVal(val);
        return movie.getCharacterVal();
    }

    // public char testMovieCharVal(char val){
    // Movie movie = new Movie();
    // movie.setCharVal(val);
    // return movie.getCharVal();
    // }
}
