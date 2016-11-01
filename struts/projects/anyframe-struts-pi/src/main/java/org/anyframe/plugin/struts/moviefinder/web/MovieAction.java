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
package org.anyframe.plugin.struts.moviefinder.web;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.struts.domain.Movie;
import org.anyframe.plugin.struts.moviefinder.service.GenreService;
import org.anyframe.plugin.struts.moviefinder.service.MovieFinder;
import org.anyframe.plugin.struts.moviefinder.service.MovieService;
import org.anyframe.plugin.struts.moviefinder.web.form.MovieForm;
import org.anyframe.struts.action.DefaultDispatchActionSupport;
import org.anyframe.util.StringUtil;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.locale.converters.DateLocaleConverter;
import org.apache.commons.lang.StringUtils;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

/**
 * This MovieAction class is an action class to provide movie crud
 * functionality.
 * 
 * @author Hyunjung Jeong
 */
public class MovieAction extends DefaultDispatchActionSupport {

	public ActionForward createView(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		GenreService genreService = (GenreService) getService("strutsGenreService");
		request.setAttribute("genreList", genreService.getList());
		MovieForm movieForm = new MovieForm();
		movieForm.setNowPlaying("Y");
		request.setAttribute("movieForm", movieForm);

		return mapping.findForward("success_createView");
	}

	public ActionForward create(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		MovieService movieService = (MovieService) getService("strutsMovieService");

		Movie movie = new Movie();

		MovieForm movieForm = (MovieForm) form;

		DateLocaleConverter converter = new DateLocaleConverter(null, Locale.getDefault(), "yyyy-MM-dd");
		ConvertUtils.register(converter, java.util.Date.class);
		BeanUtils.copyProperties(movie, movieForm);

		if (movie.getNowPlaying() == null) {
			movie.setNowPlaying("N");
		}

		movieService.create(movie);

		return mapping.findForward("success_create");
	}

	public ActionForward get(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		GenreService genreService = (GenreService) getService("strutsGenreService");
		request.setAttribute("genreList", genreService.getList());

		MovieService movieService = (MovieService) getService("strutsMovieService");
		String movieId = request.getParameter("movieId");

		if (!StringUtils.isBlank(movieId)) {
			Movie gettedMovie = movieService.get(movieId);
			MovieForm movieForm = new MovieForm();
			BeanUtils.copyProperties(movieForm, gettedMovie);
			request.setAttribute("movieForm", movieForm);
		}

		return mapping.findForward("success_get");
	}

	public ActionForward update(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		MovieService movieService = (MovieService) getService("strutsMovieService");

		Movie movie = new Movie();
		MovieForm movieForm = (MovieForm) form;

		DateLocaleConverter converter = new DateLocaleConverter(null, Locale.getDefault(), "yyyy-MM-dd");
		ConvertUtils.register(converter, java.util.Date.class);
		BeanUtils.copyProperties(movie, movieForm);

		if (movie.getNowPlaying() == null) {
			movie.setNowPlaying("N");		
		}

		movieService.update(movie);

		return mapping.findForward("success_update");
	}

	public ActionForward list(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		MovieFinder movieFinder = (MovieFinder) getService("strutsMovieFinder");

		Movie movie = new Movie();

		MovieForm movieForm = (MovieForm) form;
		BeanUtils.copyProperties(movie, movieForm);

		if (movie.getNowPlaying() == null) {
			movie.setNowPlaying("Y");
		}
		
		String pageParamValue = request.getParameter("pageIndex");
		int pageIndex = StringUtil.isNotEmpty(pageParamValue) ? (Integer.parseInt(pageParamValue)) : 1;

		Page resultPage = movieFinder.getPagingList(movie, pageIndex);

		request.setAttribute("movieForm", movieForm);
		request.setAttribute("movies", resultPage.getList());
		request.setAttribute("resultPage", resultPage);

		return mapping.findForward("success_list");
	}

	public ActionForward remove(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		MovieService movieService = (MovieService) getService("strutsMovieService");		

		MovieForm movieForm = (MovieForm) form;
		movieService.remove(movieForm.getMovieId());

		return mapping.findForward("success_remove");
	}
}
