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
package org.anyframe.plugin.oscache.moviefinder.web;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.oscache.OSCacheService;
import org.anyframe.plugin.oscache.domain.Genre;
import org.anyframe.plugin.oscache.moviefinder.service.GenreService;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This GenreController class is a Controller class to provide genre crud and
 * list functionality.
 * 
 * @author Sujeong Lee
 */
@Controller("osCacheGenreController")
@RequestMapping("/oscacheGenre.do")
public class GenreController {

	@Inject
	@Named("osCacheGenreService")
	private GenreService genreService;

	@Inject
	@Named("cacheService")
	OSCacheService cacheService;

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute(new Genre());
		return "oscache/moviefinder/genre/form";
	}

	@RequestMapping(params = "method=create")
	public String create(Genre genre) throws Exception {
		genreService.create(genre);

		return "redirect:/oscacheGenre.do?method=list";
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(params = "method=get")
	public String get(@RequestParam("genreId") String genreId, Model model)
			throws Exception {

		if (!StringUtils.isBlank(genreId)) {
			Map<String, Genre> resultMap = (HashMap<String, Genre>) cacheService
					.getFromCache("genreList");
			Genre cachedGenre = resultMap.get(genreId);
			model.addAttribute("genre", cachedGenre);
		}

		return "oscache/moviefinder/genre/form";
	}

	@RequestMapping(params = "method=update")
	public String update(Genre genre) throws Exception {
		genreService.update(genre);

		return "redirect:/oscacheGenre.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(@RequestParam("genreId") String genreId)
			throws Exception {
		genreService.remove(genreId);
		return "redirect:/oscacheGenre.do?method=list";
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(params = "method=list")
	public String list(Model model) throws Exception {

		Map<String, Genre> resultMap = (HashMap<String, Genre>) cacheService
		.getFromCache("genreList");
		Collection<Genre> genreList = resultMap.values();

		model.addAttribute("genres", genreList);
		return "oscache/moviefinder/genre/list";
	}	
}
