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
package org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.impl;

import java.util.List;
import java.util.concurrent.Future;

import javax.jws.WebService;
import javax.xml.ws.AsyncHandler;
import javax.xml.ws.Response;

import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.FindMovieListAllResponse;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.Movie;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.MovieServiceAsynch;


@WebService(serviceName = "MovieServiceAsynchService", portName = "MovieServiceAsynchPort", endpointInterface = "org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.MovieServiceAsynch", targetNamespace = "http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http")
public class MovieServiceImpl implements MovieServiceAsynch {

    private MovieDao movieDao = null;

    public MovieServiceImpl() {
        this.setMovieDao(new MovieDao());
    }

    public void setMovieDao(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    public List<Movie> findMovieListAll() throws Exception {
        return this.movieDao.findMovieListAll();
    }

    public Response<FindMovieListAllResponse> findMovieListAllAsync() {
        return null;
        /* not called */
    }

    public Future<?> findMovieListAllAsync(
            AsyncHandler<FindMovieListAllResponse> asyncHandler) {
        return null;
        /* not called */
    }

}
