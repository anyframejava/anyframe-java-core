/*
 * Copyright 2008-2013 the original author or authors.
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
package org.anyframe.sample.servletjavaconfig.web.servlet;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.sample.servletjavaconfig.domain.Genre;
import org.anyframe.sample.servletjavaconfig.domain.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet implementation class MovieFinderSerlvet contains example usage of
 * programmatic configuration
 * 
 * @author Kwangyoung Kim
 * 
 */
public class MovieFinderSerlvet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Logger logger = LoggerFactory.getLogger(MovieFinderSerlvet.class);

	private List<Movie> movieList;
	private Genre genre;
	private Movie movie;

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		logger.info("[ " + getServletName() + " ]" + " Servlet works.");

		setMovieList();

		request.setAttribute("movie", movie);
		request.setAttribute("movies", movieList);

		RequestDispatcher rd = request
				.getRequestDispatcher("/WEB-INF/jsp/moviefinder/movie/list.jsp");
		rd.forward(request, response);
	}

	private void setMovieList() {
		
		movieList = new ArrayList<Movie>();
		
		genre = new Genre();
		genre.setGenreId("GR-02");
		genre.setName("Adventure");

		movie = new Movie();

		movie.setMovieId("MV-00001");
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");
		movie.setActors("Johnny Depp");
		movie.setRuntime(110L);
		movie.setReleaseDate(new Date(20110304));
		movie.setGenre(genre);
		movie.setTicketPrice((float) 8000);
		movie.setNowPlaying("Y");

		movieList.add(movie);

		genre = new Genre();
		genre.setGenreId("GR-09");
		genre.setName("Sci-Fi");

		movie = new Movie();

		movie.setMovieId("MV-00002");
		movie.setTitle("Avatar");
		movie.setDirector("James Cameron");
		movie.setActors("Sigourney Weaver");
		movie.setRuntime(100L);
		movie.setReleaseDate(new Date(20110216));
		movie.setGenre(genre);
		movie.setTicketPrice((float) 7000);
		movie.setNowPlaying("Y");

		movieList.add(movie);

		genre = new Genre();
		genre.setGenreId("GR-01");
		genre.setName("Action");

		movie = new Movie();

		movie.setMovieId("MV-00003");
		movie.setTitle("Green Zone");
		movie.setDirector("Paul Greengrass");
		movie.setActors("Yigal Naor");
		movie.setRuntime(90L);
		movie.setReleaseDate(new Date(2011 - 03 - 25));
		movie.setGenre(genre);
		movie.setTicketPrice((float) 7000);
		movie.setNowPlaying("Y");

		movieList.add(movie);
	}

}
