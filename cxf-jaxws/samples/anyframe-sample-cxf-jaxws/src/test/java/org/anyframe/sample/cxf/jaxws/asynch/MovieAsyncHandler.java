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
package org.anyframe.sample.cxf.jaxws.asynch;

import java.util.List;

import javax.xml.ws.AsyncHandler;
import javax.xml.ws.Response;

import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.FindMovieListAllResponse;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Out of JaxWsAsynchTest TestCase test methods, for Asynchronous Method Invocation of Callback way, MovieAsyncHandler class is developed. 
 * javax.xml.ws.AsyncHandler interface is implemented and handleReponse method should be implemented. 
 * 
 * @author SooYeon Park
 */
public class MovieAsyncHandler implements
		AsyncHandler<FindMovieListAllResponse> {

	private Logger LOGGER = LoggerFactory.getLogger(MovieAsyncHandler.class);
	private FindMovieListAllResponse reply;

	public void handleResponse(Response<FindMovieListAllResponse> response) {
		try {
			LOGGER.debug("The handleResponse method of MovieAsyncHandler is called.");
			reply = response.get();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public List<Movie> getResponse() {
		return reply.getReturn();
	}

}
