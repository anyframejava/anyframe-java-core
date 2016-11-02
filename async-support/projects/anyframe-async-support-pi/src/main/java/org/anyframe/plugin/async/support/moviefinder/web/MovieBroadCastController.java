/*
 * Copyright 2008-2013 the original author or authors.
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
package org.anyframe.plugin.async.support.moviefinder.web;

import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.anyframe.plugin.async.support.moviefinder.service.MovieRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

/**
 * This MovieBroadCastController class is a Controller class to notify browser
 * when an user registers new movie.
 * 
 * @author Kwangyoung Kim
 */

@Controller("movieBroadCastController")
@RequestMapping("/movieBroadCast.do")
public class MovieBroadCastController {

	Logger logger = LoggerFactory.getLogger(MovieBroadCastController.class);

	private MovieRepository movieRepository;

	@Autowired
	public MovieBroadCastController(MovieRepository movieRepository) {
		this.movieRepository = movieRepository;
	}

	private final Queue<DeferredResult<String>> responseBodyQueue = new ConcurrentLinkedQueue<DeferredResult<String>>();

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody
	DeferredResult<String> newMoviceNotify() throws Exception {
		final DeferredResult<String> result = new DeferredResult<String>(10000);
		this.responseBodyQueue.add(result);

		logger.debug("[Thread ID : " + Thread.currentThread().getId()
				+ "]- put deferredResult in responseBodyQueue");
		logger.debug("[Number of DeferredClass instances: "
				+ responseBodyQueue.size() + "]");

		List<String> movies = this.movieRepository.getMovies();

		if (!movies.isEmpty()) {
			this.broadcastMovieUpdate();
		}

		result.onCompletion(new Runnable() {
			public void run() {
				responseBodyQueue.remove(result);
				logger.debug("[Thread ID : " + Thread.currentThread().getId()
						+ "]- is  removed from responseBodyQueue");
				logger.debug("[ of DeferredClass instances: "
						+ responseBodyQueue.size() + "]");
			}
		});
		return result;
	}

	/*
	 * Broadcast to all threads to notify a movie added.
	 */
	public void broadcastMovieUpdate() throws Exception {
		logger.debug("[ broadcast ]");
		for (DeferredResult<String> result : this.responseBodyQueue) {
			result.setResult("New movie added");
			logger.debug("[Thread ID : " + Thread.currentThread().getId()
					+ "] responded and removed");
			this.responseBodyQueue.remove(result);
		}
		this.movieRepository.removeMovie();
	}
}
