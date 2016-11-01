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
package org.anyframe.plugin.fileupload.moviefinder.web;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.fileupload.domain.Genre;
import org.anyframe.plugin.fileupload.domain.Movie;
import org.anyframe.plugin.fileupload.moviefinder.service.GenreService;
import org.anyframe.plugin.fileupload.moviefinder.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Sooyeon Park
 */
@Controller("fileUploadMovieController")
@RequestMapping("/fileUploadMovie.do")
@SessionAttributes(types = Movie.class)
public class MovieController {

	@Inject
	@Named("fileUploadMovieService")
	private MovieService movieService;

	@Inject
	@Named("fileUploadGenreService")
	private GenreService genreService;

	@ModelAttribute("genreList")
	public Collection<Genre> populateGenreList() throws Exception {
		return this.genreService.getList();
	}

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new Movie());
		return "fileupload/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=create")
	public String create(@RequestParam("file") MultipartFile[] files,
			Movie movie, BindingResult results, SessionStatus status) throws Exception {
		
		this.movieService.create(movie, files);
		status.setComplete();

		return "redirect:/fileUploadMovieFinder.do?method=list";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("movieId") String movieId, Model model)
			throws Exception {
		Movie movie = this.movieService.get(movieId);
		if (movie == null) {
			throw new Exception("Resource not found " + movieId);
		}
		model.addAttribute("attachedFiles", movie.getAttachedFiles());
		model.addAttribute(movie);

		return "fileupload/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=update")
	public String update(Movie movie, BindingResult results,
			SessionStatus status) throws Exception {

		this.movieService.update(movie);
		status.setComplete();

		return "redirect:/fileUploadMovieFinder.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(Movie movie)
			throws Exception {
		this.movieService.remove(movie);
		return "redirect:/fileUploadMovieFinder.do?method=list";
	}
}
