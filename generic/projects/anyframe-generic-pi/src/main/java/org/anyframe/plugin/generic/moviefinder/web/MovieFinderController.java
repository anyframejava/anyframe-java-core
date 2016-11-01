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
package org.anyframe.plugin.generic.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.generic.domain.GenericMovie;
import org.anyframe.plugin.generic.moviefinder.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This MovieFinderController class is a Controller class to provide movie list
 * functionality.
 * 
 * @author Hyunjung Jeong
 */
@Controller("genericMovieFinderController")
@RequestMapping("/genericMovieFinder.do")
public class MovieFinderController {

	@Inject
	@Named("genericMovieService")
	private MovieService movieService;

	@RequestMapping(params = "method=list")
	public String list(
			@RequestParam(value = "pageIndex", defaultValue = "1") int pageIndex,
			GenericMovie genericMovie, BindingResult result, Model model)
			throws Exception {

		Page resultPage = movieService.getPagingList(genericMovie, pageIndex);

		model.addAttribute("genericMovie", genericMovie);
		model.addAttribute("genericMovies", resultPage.getList());
		model.addAttribute("resultPage", resultPage);

		return "generic/moviefinder/movie/list";
	}
}
