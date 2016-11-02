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
package org.anyframe.plugin.mobile.moviefinder.web;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.mobile.domain.Genre;
import org.anyframe.plugin.mobile.domain.Movie;
import org.anyframe.plugin.mobile.moviefinder.service.GenreService;
import org.anyframe.plugin.mobile.moviefinder.service.MovieService;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Jongpil Park
 */
@RestController
@RequestMapping("/movies")
public class MovieController {

	@Inject
	@Named("mobileMovieService")
	private MovieService movieService;

	@Inject
	@Named("mobileGenreService")
	private GenreService genreService;

	@ModelAttribute("genreList")
	public Collection<Genre> populateGenreList() throws Exception {
		return genreService.getList();
	}

	@RequestMapping(value="/create", method=RequestMethod.POST)
	public String create(@RequestBody Movie movie) throws Exception {
		movieService.create(movie);
		return movie.getMovieId();
	}

	@RequestMapping(method=RequestMethod.PUT)
	public void update(@RequestBody Movie movie) throws Exception {
		movieService.update(movie);
	}

	@RequestMapping(value= "/{movieId}", method=RequestMethod.DELETE)
	public void remove(@PathVariable("movieId") String movieId)
			throws Exception {
		movieService.remove(movieId);
	}

}
