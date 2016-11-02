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
package org.anyframe.plugin.jquery.moviefinder.web;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.moviefinder.domain.Movie;
import org.anyframe.plugin.jquery.moviefinder.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This MovieController class is a Controller class to provide movie crud functionality
 * 
 * @author Sunjoong Kim
 */

@Controller("jqueryMovieController")
@RequestMapping("/jqueryMovie.do")
public class MovieController {

	@Inject
	@Named("jqueryMovieService")
	private MovieService movieService;

	@RequestMapping(params = "method=create")
	public String create(Movie movie) throws Exception {
		movieService.create(movie);
		return "jsonView";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("movieId") String movieId, Model model) throws Exception {
		Movie movie = movieService.get(movieId);
		model.addAttribute("movie", movie);
		return "jsonView";
	}
	
	@RequestMapping(params = "method=removeMovieList")
	public String remove(@RequestParam("ids[]") String[] ids, Model model) throws Exception {
		movieService.removeMovieList(ids);
		return "jsonView";
	}

	@RequestMapping(params = "method=update")
	public String update(Movie movie) throws Exception {
		movieService.update(movie);
		return "jsonView";
	}

	@RequestMapping(params = "method=getMovieTitleList")
	public String listTitleName(@RequestParam("term") String keyword, Model model) throws Exception {
		List<String> titles = movieService.getMovieTitleList(keyword);
		model.addAttribute("autoData", titles);
		return "jsonView";
	}

}
