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
package org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service;

import java.util.List;

import javax.jws.WebService;

import org.anyframe.sample.cxf.jaxws.domain.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * This class is a temporary class to generate MovieAsynchService.wsdl file. If
 * you already have a wsdl file for an asynchronous case, you don't need this
 * class. The real asynchronous service interface class is
 * org.anyframe.sample.cxf
 * .jaxws.movie.asynch.asynch_soap_http.MovieServiceAsynch that is one of
 * generated classes using wsdl file.
 */
@WebService(targetNamespace = "http://service.asynch.moviefinder.jaxws.cxf.sample.anyframe.org/asynch_soap_http")
public interface MovieServiceAsynch {

	Logger LOGGER = LoggerFactory.getLogger(MovieServiceAsynch.class);

	public List<Movie> findMovieListAll() throws Exception;

}
