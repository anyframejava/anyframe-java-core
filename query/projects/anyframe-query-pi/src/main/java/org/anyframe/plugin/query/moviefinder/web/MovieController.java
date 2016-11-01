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
package org.anyframe.plugin.query.moviefinder.web;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.anyframe.plugin.query.domain.Genre;
import org.anyframe.plugin.query.domain.Movie;
import org.anyframe.plugin.query.moviefinder.service.GenreService;
import org.anyframe.plugin.query.moviefinder.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Jonghoon Kim
 */
@Controller("queryMovieController")
@RequestMapping("/queryMovie.do")
@SessionAttributes(types = Movie.class)
public class MovieController {

	@Inject
	@Named("queryMovieService")
	private MovieService movieService;

	@Inject
	@Named("queryGenreService")
	private GenreService genreService;

	@ModelAttribute("genreList")
	public Collection<Genre> populateGenreList() throws Exception {
		return genreService.getList();
	}

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new Movie());
		return "query/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=create")
	public String create(@Valid Movie movie, BindingResult results,
			SessionStatus status, HttpSession session) throws Exception {
		if (results.hasErrors()) {
			return "query/moviefinder/movie/form";
		}

		movieService.create(movie);
		status.setComplete();

		return "redirect:/queryMovieFinder.do?method=list";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("movieId") String movieId, Model model)
			throws Exception {
		Movie movie = movieService.get(movieId);
		if (movie == null) {
			throw new Exception("Resource not found " + movieId);
		}
		model.addAttribute(movie);

		return "query/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=update")
	public String update(@Valid Movie movie, BindingResult results,
			SessionStatus status) throws Exception {
		if (results.hasErrors()) {
			return "query/moviefinder/movie/form";
		}

		movieService.update(movie);
		status.setComplete();

		return "redirect:/queryMovieFinder.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(@RequestParam("movieId") String movieId)
			throws Exception {
		movieService.remove(movieId);
		return "redirect:/queryMovieFinder.do?method=list";
	}
}
