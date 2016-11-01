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
package org.anyframe.sample.remoting.movie.jaxws.extend;

import java.util.List;

import javax.jws.Oneway;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;

import org.anyframe.sample.remoting.movie.jaxws.Category;
import org.anyframe.sample.remoting.movie.jaxws.Country;
import org.anyframe.sample.remoting.movie.jaxws.Movie;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * This MovieService interface class is only for
 * JaxWsFrontendServerFactoryAnnotationTest to check
 * the function of annotation
 * @WebMethod operationName attribute.
 */
@WebService
public interface MovieService {

    Log LOGGER = LogFactory.getLog(MovieService.class.getName());

    public List<Movie> findMovieListAll() throws Exception;

    public List<Movie> findMovieList(Country country, Category category)
            throws Exception;

    public Movie findMovie(String movieId) throws Exception;

    public void createMovie(Movie movie) throws Exception;

    public void updateMovie(Movie movie) throws Exception;

    public void removeMovie(Movie movie) throws Exception;

    @WebMethod(exclude = true)
    public void testAnnotationMethodExclude();

    public void testAnnotationMethodInclude();

    @Oneway
    public String testAnnotationOneWay();

    public String testAnnotationWebParam(
            @WebParam(name = "movieAnnotationWebParam")
            String input);

}
