/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.logging.moviefinder.service.impl;

import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.logging.moviefinder.domain.Movie;
import org.anyframe.sample.logging.moviefinder.service.MovieService;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

/**
 * This MovieServiceImpl class is an implementation class to provide movie
 * management functionality.
 * 
 * @author Sooyeon Park
 */
@Service("movieService")
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("movieDao")
	private MovieDao movieDao;

	@Inject
	private MessageSource messageSource;

	public void create(Movie movie) throws Exception {

		MovieService.LOGGER.debug("DEBUG - call create");
		MovieService.LOGGER.warn("WARNING - call create");
		MovieService.LOGGER.error("ERROR - call create");

		movieDao.create(movie);
	}

	public Movie get() throws Exception {

		MovieService.LOGGER.debug("DEBUG - call get");
		MovieService.LOGGER.warn("WARNING - call get");
		MovieService.LOGGER.error("ERROR - call get");

		return movieDao.get();
	}

	public void greet() {
		MovieService.LOGGER.debug(messageSource.getMessage(
				"sample.default.msg", new String[] {}, Locale.getDefault()));
		MovieService.LOGGER.debug(messageSource.getMessage("sample.msg",
				new String[] { "Anyframe" }, Locale.getDefault()));
	}

}