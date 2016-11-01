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
package org.anyframe.sample.cxf.jaxws.moviefinder.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.jws.Oneway;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import org.anyframe.cxf.adapter.CXFMapAdapter;
import org.anyframe.sample.cxf.jaxws.domain.Category;
import org.anyframe.sample.cxf.jaxws.domain.Country;
import org.anyframe.sample.cxf.jaxws.domain.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebService
public interface MovieService {

    Logger LOGGER = LoggerFactory.getLogger(MovieService.class);

    public List<Movie> findMovieListAll() throws Exception;

    @XmlJavaTypeAdapter(CXFMapAdapter.class)
    public Map<String, Movie> findMovieMapAll() throws Exception;

    public List<Movie> findMovieList(Country country, Category category)
            throws Exception;

    public Movie findMovie(String movieId) throws Exception;

    public void createMovie(Movie movie) throws Exception;

    public void updateMovie(Movie movie) throws Exception;

    public void removeMovie(Movie movie) throws Exception;

    // ================= method for Annotation tests

    @WebMethod(operationName = "testAnnotationMethodInclude")
    public void testAnnotationMethod();

    @Oneway
    public String testAnnotationOneWay();

    public String testAnnotationWebParam(
            @WebParam(name = "movieAnnotationWebParam")
            String input);

    // ================= method for Type tests
    public int testMovieIntVal(int val);

    public long testMovieLongVal(long val);

    public short testMovieShortVal(short val);

    public float testMovieFloatVal(float val);

    public double testMovieDoubleVal(double val);

    public BigDecimal testMovieBigDecimalVal(BigDecimal val);

    public boolean testMovieBooleanVal(boolean val);

    public Character testMovieCharacterVal(Character val);

    public char testMovieCharVal(char val);

}
