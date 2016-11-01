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
package org.anyframe.sample.servletannotation.web.servlet;

import java.io.IOException;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.sample.servletannotation.domain.Genre;
import org.anyframe.sample.servletannotation.domain.Movie;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet implementation class MovieServlet contains example usage of existing
 * web.xml configuration.
 * 
 * @author Kwangyoung Kim
 * 
 */
@WebServlet(name ="MovieServlet" , urlPatterns="/movie.do")
public class MovieServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	Logger logger = LoggerFactory.getLogger(MovieServlet.class);

	private Genre genre;
	private Movie movie;
	
	protected void service(){
		
	}
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		logger.info("[ " + getServletName() + " ]" + " Servlet works.");

		String movieId = request.getParameter("movieId");

		setMovieValue(movieId);

		request.setAttribute("movie", movie);
		RequestDispatcher rd = request
				.getRequestDispatcher("/WEB-INF/jsp/moviefinder/movie/form.jsp");
		rd.forward(request, response);
	}

	private void setMovieValue(String movieId) {
		
		genre = new Genre();
		movie = new Movie();
		
		if ("MV-00001".equals(movieId)) {
			genre.setGenreId("GR-02");
			genre.setName("Adventure");
			movie.setMovieId("MV-00001");
			movie.setTitle("Alice in Wonderland");
			movie.setDirector("Tim Burton");
			movie.setActors("Johnny Depp");
			movie.setRuntime(110L);
			movie.setReleaseDate(new Date(20110304));
			movie.setGenre(genre);
			movie.setTicketPrice((float) 8000);
			movie.setNowPlaying("Y");
		} else if ("MV-00002".equals(movieId)) {
			genre.setGenreId("GR-09");
			genre.setName("Sci-Fi");
			movie.setMovieId("MV-00002");
			movie.setTitle("Avatar");
			movie.setDirector("James Cameron");
			movie.setActors("Sigourney Weaver");
			movie.setRuntime(100L);
			movie.setReleaseDate(new Date(20110216));
			movie.setGenre(genre);
			movie.setTicketPrice((float) 7000);
			movie.setNowPlaying("Y");
		} else if ("MV-00001".equals(movieId)) {
			genre.setGenreId("GR-01");
			genre.setName("Action");
			movie.setMovieId("MV-00003");
			movie.setTitle("Green Zone");
			movie.setDirector("Paul Greengrass");
			movie.setActors("Yigal Naor");
			movie.setRuntime(90L);
			movie.setReleaseDate(new Date(2011 - 03 - 25));
			movie.setGenre(genre);
			movie.setTicketPrice((float) 7000);
			movie.setNowPlaying("Y");
		}
	}

}
