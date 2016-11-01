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
package org.anyframe.plugin.cxf.jaxrs.moviefinder.web;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.Valid;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.cxf.jaxrs.domain.Genre;
import org.anyframe.plugin.cxf.jaxrs.domain.Movie;
import org.anyframe.plugin.cxf.jaxrs.domain.ResultPage;
import org.anyframe.plugin.cxf.jaxrs.moviefinder.service.GenreService;
import org.anyframe.plugin.cxf.jaxrs.moviefinder.service.MovieService;
import org.apache.cxf.jaxrs.client.WebClient;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Sooyeon Park
 */
@Controller("cxfJaxRsMovieController")
@DependsOn("cxfJaxRsClientMovieService")
@RequestMapping("/cxfJaxRsMovie.do")
public class MovieController {

	@Inject
	@Named("cxfJaxRsClientMovieService")
	private MovieService movieService;

	@Inject
	@Named("cxfJaxRsGenreService")
	private GenreService genreService;

	private WebClient client;

	@ModelAttribute("genreList")
	public Collection<Genre> populateGenreList() throws Exception {
		return genreService.getList();
	}

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new Movie());
		return "cxf-jaxrs/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=create")
	public String create(@Valid Movie movie, BindingResult results,
			SessionStatus status) throws Exception {
		if (results.hasErrors()) {
			return "cxf-jaxrs/moviefinder/movie/form";
		}
		Response response = getClient().path("/movies").post(movie);
		if (response.getStatus() == Status.INTERNAL_SERVER_ERROR
				.getStatusCode()) {
			throw new Exception("Fail to create : Movie Title="
					+ movie.getTitle());
		}

		status.setComplete();
		return "redirect:/cxfJaxRsMovie.do?method=list";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("movieId") String movieId, Model model)
			throws Exception {
		Movie movie = getClient().path("/movies/" + movieId).get(Movie.class);
		model.addAttribute("movie", movie);

		return "cxf-jaxrs/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=update")
	public String update(@Valid Movie movie, BindingResult results,
			SessionStatus status) throws Exception {
		if (results.hasErrors()) {
			return "cxf-jaxrs/moviefinder/movie/form";
		}
		Response response = getClient().path("/movies").put(movie);
		if (response.getStatus() == Status.INTERNAL_SERVER_ERROR
				.getStatusCode()) {
			throw new Exception("Fail to update : Movie Title="
					+ movie.getTitle());
		}

		status.setComplete();
		return "redirect:/cxfJaxRsMovie.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(Movie movie) throws Exception {
		Response response = getClient().path("/movies/" + movie.getMovieId())
				.delete();
		if (response.getStatus() == Status.INTERNAL_SERVER_ERROR
				.getStatusCode()) {
			throw new Exception("Fail to remove : Movie Title="
					+ movie.getTitle());
		}

		return "redirect:/cxfJaxRsMovie.do?method=list";
	}

	@RequestMapping(params = "method=list")
	public String list(
			@RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex,
			Movie movie, BindingResult result, Model model) throws Exception {
		ResultPage resultPage = getClient().path("/movies").query("title",
				movie.getTitle()).query("nowPlaying", movie.getNowPlaying())
				.query("pageIndex", pageIndex).get(ResultPage.class);
		Page page = resultPage.getPage();

		model.addAttribute("movie", movie);
		model.addAttribute("movies", page.getList());
		model.addAttribute("resultPage", page);

		return "cxf-jaxrs/moviefinder/movie/list";
	}

	private WebClient getClient() {
		if (client == null)
			client = WebClient.fromClient(WebClient.client(movieService));
		return client.reset();
	}
}
