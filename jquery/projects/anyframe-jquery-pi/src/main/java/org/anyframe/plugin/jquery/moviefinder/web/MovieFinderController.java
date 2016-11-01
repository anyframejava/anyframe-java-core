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

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.moviefinder.domain.Genre;
import org.anyframe.plugin.jquery.moviefinder.domain.Movie;
import org.anyframe.plugin.jquery.moviefinder.service.GenreService;
import org.anyframe.plugin.jquery.moviefinder.service.MovieFinder;
import org.anyframe.plugin.jquery.moviefinder.service.MovieSearchVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This MovieFinderController class is a Controller class to provide movie list and genre list functionality.
 * 
 * @author Sunjoong Kim
 */
@Controller("jqueryMovieFinderController")
@RequestMapping("/jqueryMovieFinder.do")
public class MovieFinderController {

	@Inject
	@Named("jqueryMovieFinder")
	private MovieFinder movieFinder;
	
	@Inject
	@Named("jqueryGenreService")
	private GenreService genreService;

	@ModelAttribute("genreList")
	public Collection<Genre> populateGenreList() throws Exception {
		return genreService.getDropDownGenreList();
	}
	
	@RequestMapping(params = "method=list")
	public String list(MovieSearchVO search, Model model) throws Exception {
		//jqGrid uses values marked as four keys(page, total, records, rows) 
		Page resultPage = movieFinder.getPagingList(search);
		model.addAttribute("page", String.valueOf(resultPage.getCurrentPage()));
		model.addAttribute("total", String.valueOf(resultPage.getMaxPage()));
		model.addAttribute("records", String.valueOf(resultPage.getTotalCount()));
		model.addAttribute("rows", resultPage.getList());
		return "jsonView";
	}
	
	@RequestMapping(params = "method=listView")
	public String listView(MovieSearchVO search, Movie movie, Model model) throws Exception {
		model.addAttribute("search", search);
		model.addAttribute("movie", movie);
		return "jquery/moviefinder/movie/list";
	}
}
