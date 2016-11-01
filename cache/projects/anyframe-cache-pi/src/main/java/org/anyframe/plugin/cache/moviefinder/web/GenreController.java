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
package org.anyframe.plugin.cache.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.cache.domain.Genre;
import org.anyframe.plugin.cache.moviefinder.service.GenreService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This GenreController class is a Controller class to provide genre crud and
 * list functionality.
 * 
 * @author Sooyeon Park
 */
@Controller("cacheGenreController")
@RequestMapping("/cacheGenre.do")
public class GenreController {

	@Inject
	@Named("cacheGenreService")
	private GenreService genreService;

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new Genre());
		return "cache/moviefinder/genre/form";
	}

	@RequestMapping(params = "method=create")
	public String create(Genre genre) throws Exception {
		genreService.create(genre);

		return "redirect:/cacheGenre.do?method=list";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("genreId") String genreId, Model model)
			throws Exception {

		if (!StringUtils.isBlank(genreId)) {
			Genre genre = genreService.get(genreId);
			model.addAttribute("genre", genre);
		}

		return "cache/moviefinder/genre/form";
	}

	@RequestMapping(params = "method=update")
	public String update(Genre genre) throws Exception {
		genreService.update(genre);
		return "redirect:/cacheGenre.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(@RequestParam("genreId") String genreId)
			throws Exception {
		genreService.remove(genreId);
		return "redirect:/cacheGenre.do?method=list";
	}

	@RequestMapping(params = "method=list")
	public String list(Model model) throws Exception {
		model.addAttribute("genres", genreService.getList());
		return "cache/moviefinder/genre/list";
	}
}
