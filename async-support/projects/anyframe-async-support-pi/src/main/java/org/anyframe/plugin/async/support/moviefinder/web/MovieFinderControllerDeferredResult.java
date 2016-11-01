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

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.core.domain.Movie;
import org.anyframe.plugin.core.moviefinder.service.MovieFinder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.servlet.ModelAndView;

import org.anyframe.pagination.Page;

/**
 * This MovieFinderController class is a Controller class to provide movie list
 * functionality in an asynchronous way with DeferredResult class..
 * 
 * @author Kwangyoung Kim
 */
@Controller("deferredResultMovieFinderController")
@RequestMapping("/asyncSupportMovieFinderDeferredResult.do")
public class MovieFinderControllerDeferredResult {

	Logger logger = LoggerFactory
			.getLogger(MovieFinderControllerDeferredResult.class);

	@Inject
	@Named("coreMovieFinder")
	private MovieFinder movieFinder;

	@RequestMapping(params = "method=list")
	public DeferredResult<ModelAndView> list(
			@RequestParam(value = "pageIndex", defaultValue = "1") final int pageIndex,
			final Movie movie, BindingResult result, final Model model)
			throws Exception {

		// Original thread has been returned to a threadpool.;
		// We can do something does not take a long time here.;

		final DeferredResult<ModelAndView> deferredResult = new DeferredResult<ModelAndView>();

		logger.info("Thread ID : " + Thread.currentThread().getId());
		logger.info("This thread has been returned to a thread pool");

		new Thread(new Runnable() {
			public void run() {
				// In another thread
				// We can do someting takes a long time in call method;
				logger.info("Thread ID : " + Thread.currentThread().getId());
				logger.info("Another thread works for a long time process");
				;

				Page resultPage = null;
				try {
					resultPage = movieFinder.getPagingList(movie, pageIndex);
				} catch (Exception e) {
					e.printStackTrace();
				}
				ModelAndView modelAndView = new ModelAndView(
						"async-support/moviefinder/deferredMovie/list");
				modelAndView.addObject("movie", movie);
				modelAndView.addObject("movies", resultPage.getList());
				modelAndView.addObject("resultPage", resultPage);
				deferredResult.setResult(modelAndView);
			}
		}).start();

		return deferredResult;
	}
	
	@RequestMapping(params = "method=asyncEnter")
	public String enter() throws Exception {
		return "async-support/moviefinder/deferredMovie/asyncEnter";
	}
	
	@RequestMapping(params = "method=hidden")
	public String hiddenCall() throws Exception {
		return "async-support/moviefinder/deferredMovie/hidden";
	}
	
}
