/*
 * Copyright 2008-2011 the original author or authors.
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

import java.io.File;
import java.io.FileOutputStream;
import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.anyframe.datatype.SearchVO;
import org.anyframe.generic.service.GenericService;
import org.anyframe.plugin.generic.domain.GenericGenre;
import org.anyframe.plugin.generic.domain.GenericMovie;
import org.anyframe.plugin.generic.moviefinder.service.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Hyunjung Jeong
 */
@Controller("genericMovieController")
@RequestMapping("/genericMovie.do")
public class MovieController {

	@Inject
	@Named("genericMovieService")
	private MovieService movieService;

	@Inject
	@Named("genericGenreService")
	private GenericService<GenericGenre, String> genericGenreService;

	@ModelAttribute("genericGenreList")
	public Collection<GenericGenre> populateGenreList() throws Exception {
		SearchVO searchVO = new SearchVO();
		return genericGenreService.getList(searchVO);
	}

	@RequestMapping(params = "method=createView")
	public String createView(Model model) throws Exception {
		model.addAttribute("genericMovie", new GenericMovie());
		return "generic/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=create")
	public String create(
			@RequestParam(value = "realPosterFile", required = false) MultipartFile posterFile,
			@Valid GenericMovie genericMovie, BindingResult results,
			SessionStatus status, HttpSession session) throws Exception {

		if (results.hasErrors()) {
			return "generic/moviefinder/movie/form";
		}

		if (posterFile != null && !posterFile.getOriginalFilename().equals("")) {
			String pictureName = posterFile.getOriginalFilename();

			String destDir = session.getServletContext().getRealPath(
					"/sample/images/posters/");

			File dirPath = new File(destDir);
			if (!dirPath.exists()) {
				boolean created = dirPath.mkdirs();
				if (!created) {
					throw new Exception(
							"Fail to create a directory for movie image. ["
									+ destDir + "]");
				}
			}

			File destination = File
					.createTempFile("file", pictureName, dirPath);

			FileCopyUtils.copy(posterFile.getInputStream(),
					new FileOutputStream(destination));

			genericMovie.setPosterFile("sample/images/posters/"
					+ destination.getName());
		}

		this.movieService.create(genericMovie);
		status.setComplete();

		return "redirect:/genericMovieFinder.do?method=list";
	}

	@RequestMapping(params = "method=get")
	public String get(@RequestParam("movieId") String movieId, Model model)
			throws Exception {
		GenericMovie genericMovie = this.movieService.get(movieId);
		if (genericMovie == null) {
			throw new Exception("Resource not found " + movieId);
		}

		model.addAttribute("genericMovie", genericMovie);

		return "generic/moviefinder/movie/form";
	}

	@RequestMapping(params = "method=update")
	public String update(@Valid GenericMovie genericMovie,
			BindingResult results, SessionStatus status) throws Exception {
		if (results.hasErrors()) {
			return "generic/moviefinder/movie/form";
		}

		this.movieService.update(genericMovie);
		status.setComplete();

		return "redirect:/genericMovieFinder.do?method=list";
	}

	@RequestMapping(params = "method=remove")
	public String remove(@RequestParam("movieId") String movieId)
			throws Exception {
		this.movieService.remove(movieId);
		return "redirect:/genericMovieFinder.do?method=list";
	}
}
