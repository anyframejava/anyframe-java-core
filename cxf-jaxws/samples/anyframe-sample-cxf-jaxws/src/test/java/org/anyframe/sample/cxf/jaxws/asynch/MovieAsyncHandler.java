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
package org.anyframe.sample.cxf.jaxws.asynch;

import java.util.List;

import javax.xml.ws.AsyncHandler;
import javax.xml.ws.Response;

import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.FindMovieListAllResponse;
import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.Movie;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * JaxWsAsynchTest 테스트케이스의 테스트 메소드 중 testFindMovieListAllCallback에서 사용되는
 * MovieAsyncHandler 클래스로 Callback 방식의 Asynchronous Method Invocation을 위해 작성한다.
 * javax.xml.ws.AsyncHandler 인터페이스를 implement 하며, handleReponse method를 구현하여야
 * 한다.
 * 
 * @author SooYeon Park
 */
public class MovieAsyncHandler implements
		AsyncHandler<FindMovieListAllResponse> {

	private Log LOGGER = LogFactory.getLog(MovieAsyncHandler.class);
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
