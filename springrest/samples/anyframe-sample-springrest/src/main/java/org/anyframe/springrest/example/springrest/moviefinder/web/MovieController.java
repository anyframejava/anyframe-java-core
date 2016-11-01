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
package org.anyframe.springrest.example.springrest.moviefinder.web;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.anyframe.pagination.Page;
import org.anyframe.springrest.example.springrest.domain.Movie;
import org.anyframe.springrest.example.springrest.exception.NotFoundException;
import org.anyframe.springrest.example.springrest.moviefinder.service.GenreService;
import org.anyframe.springrest.example.springrest.moviefinder.service.MovieFinder;
import org.anyframe.springrest.example.springrest.moviefinder.service.MovieService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.util.ClassUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Jeryeon Kim
 */
@Controller("springrestMovieController")
@RequestMapping("/movies")
public class MovieController {

	@Inject
	@Named("springrestMovieService")
	private MovieService movieService;

	@Inject
	@Named("springrestGenreService")
	private GenreService genreService;

	@Inject
	@Named("springrestMovieFinder")
	private MovieFinder movieFinder;

	/**
	 * Rendering view using ContentNegotiatingViewResolver
	 * 
	 * ※ In the case of view rendering through ContentNegotiatingViewResolver,
	 * affected by defined exceptionResolver when Exception occurs.
	 * 
	 * Currently, SimpleMappingExceptionResolver was defined by Anyframe core
	 * plugin. There is an issue that although error occurs, Response Status is
	 * returned as 200 OK to REST client as error.jsp was rendered as
	 * defaultErrorView.
	 * 
	 * This sample supplemented this issue by {@link #handleException()} method.
	 * 
	 * @param pageIndex
	 * @param model
	 * @return return Page object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(method = RequestMethod.GET)
	public String list(
			@RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex,
			Movie movie, Model model) throws Exception {

		Page page = movieFinder.getPagingList(movie, pageIndex);

		setModel(model, page, movie);
//		model.addAttribute("movies", page.getList());
//		model.addAttribute("movie", movie);
//		model.addAttribute("resultPage", page);
		System.out.println("*******************");
		return "springrest/moviefinder/movie/list";
	}

	@RequestMapping(value = "/new")
	public ModelAndView createView() throws Exception {
		ModelAndView mvn = new ModelAndView(
				"springrest/moviefinder/movie/form", "movie", new Movie());
		List<org.anyframe.springrest.example.springrest.domain.Genre> genreList = genreService
				.getList();
		mvn.addObject(genreList);

		return mvn;
	}

	/**
	 * Generate response
	 * 
	 * @param movie
	 * @return Response Status : 201 CREATED, with Location header
	 * @throws Exception
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> create(@RequestBody Movie movie)
			throws Exception {

		this.movieService.create(movie);

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Location",
				"http://localhost:8080/anyframe-sample-springrest/springrest/movies/"
						+ movie.getMovieId());

		// 201 CREATED, Location header
		return new ResponseEntity<String>("Created resource "
				+ movie.getMovieId(), responseHeaders, HttpStatus.CREATED);
	}

	/**
	 * Rendering view using ContentNegotiatingViewResolver
	 * 
	 * @param movie
	 * @return return Page object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(method = RequestMethod.POST, headers = "Content-type=application/x-www-form-urlencoded")
	public String createForm(@Valid Movie movie, BindingResult results,
			HttpSession session, Model model) throws Exception {
		if (results.hasErrors()) {
			List<org.anyframe.springrest.example.springrest.domain.Genre> genreList = genreService
					.getList();
			model.addAttribute(genreList);
			return "springrest/moviefinder/movie/form";
		}

		this.movieService.create(movie);

		return "redirect:/springrest/movies.html";
	}

	/**
	 * Rendering view using ContentNegotiatingViewResolver
	 * 
	 * @param movieId
	 * @param model
	 * @return return Movie object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value = "/{movieId}", method = RequestMethod.GET)
	public String get(@PathVariable String movieId, Model model)
			throws Exception {

		Movie movie = this.movieService.get(movieId);
		List<org.anyframe.springrest.example.springrest.domain.Genre> genreList = genreService
				.getList();

		if (movie == null) {
			throw new NotFoundException("Resource Not Found with movieId "
					+ movieId);
		}
		model.addAttribute(movie);
		model.addAttribute(genreList);

		return "springrest/moviefinder/movie/form";
	}
	
	/**
	 * Rendering view using ContentNegotiatingViewResolver
	 * 
	 * @param updateMovie
	 * @param model
	 * @return return Page object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value = "/{movieId}", method = RequestMethod.PUT, headers = "Content-type=application/x-www-form-urlencoded")
	public String updateForm(Movie updateMovie, BindingResult results,
			Model model) throws Exception {
		if (results.hasErrors()) {
			List<org.anyframe.springrest.example.springrest.domain.Genre> genreList = genreService
					.getList();
			model.addAttribute(genreList);
			return "springrest/moviefinder/movie/form";
		}
		this.movieService.update(updateMovie);

		return "redirect:/springrest/movies.html";
	}

	/**
	 * Generate response
	 * 
	 * @param movie
	 *            with @RequestBody
	 * @return return Movie object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value = "/{movieId}", method = RequestMethod.PUT)
	@ResponseBody
	public void update(@RequestBody Movie updateMovie) throws Exception {
		this.movieService.update(updateMovie);
	}

	/**
	 * Rendering view using ContentNegotiatingViewResolver
	 * 
	 * @param updateMovie
	 * @param model
	 * @return return Page object, Response Status : 200 OK
	 * @throws Exception
	 */
	@RequestMapping(value = "/{movieId}", method = RequestMethod.DELETE)
	public String remove(@PathVariable String movieId, Model model)
			throws Exception {

		this.movieService.remove(movieId);

		Page page = movieFinder.getPagingList(new Movie(), 1);

		setModel(model, page, new Movie());

		return "springrest/moviefinder/movie/list";
	}

	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(NotFoundException.class)
	public ModelAndView handleException(NotFoundException ex) {
		ModelMap model = new ModelMap();
		model.addAttribute("class", ClassUtils.getShortName(ex.getClass()));
		model.addAttribute("message", ex.getMessage());
		model.addAttribute("exception", ex);
		
		return new ModelAndView("springrest/common/error", model);
	}

	// Separate repeated code
	private void setModel(Model model, Page page, Movie movie) {
		model.addAttribute("movies", page.getList());
		model.addAttribute("movie", movie);
		model.addAttribute("resultPage", page);
	}
}