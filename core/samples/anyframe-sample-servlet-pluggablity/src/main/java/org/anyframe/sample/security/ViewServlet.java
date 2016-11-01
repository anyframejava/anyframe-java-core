package org.anyframe.sample.security;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.domain.Movie;

@WebServlet(name = "ViewServlet", urlPatterns = { "/view.do" })
public class ViewServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		String movieId = request.getParameter("movieId");

		request.setAttribute("movie", getMovieData(movieId));

		request.getRequestDispatcher("/WEB-INF/jsp/view.jsp").forward(request,
				response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	private Movie getMovieData(String movieId) {
		Genre genre = null;
		Movie movie = null;

		if ("MV-00001".equals(movieId)) {
			genre = new Genre();
			genre.setGenreId("GR-01");
			genre.setName("Adventure");

			movie = new Movie();
			movie.setMovieId("MV-00001");
			movie.setTitle("Alice in Wonderland");
			movie.setDirector("Tim Burton");
			movie.setActors("Johnny Depp");
			movie.setRuntime(110L);
			movie.setTicketPrice(8000.0F);
			movie.setReleaseDate(new Date());
			movie.setNowPlaying("Y");
			movie.setGenre(genre);
		} else if ("MV-00002".equals(movieId)) {
			genre = new Genre();
			genre.setGenreId("GR-02");
			genre.setName("Sci-Fi");

			movie = new Movie();
			movie.setMovieId("MV-00002");
			movie.setTitle("Avatar");
			movie.setDirector("James Cameron");
			movie.setActors("Sigourney Weaver");
			movie.setRuntime(100L);
			movie.setTicketPrice(7000.0F);
			movie.setReleaseDate(new Date());
			movie.setNowPlaying("Y");
			movie.setGenre(genre);
		} else if ("MV-00003".equals(movieId)) {
			genre = new Genre();
			genre.setGenreId("GR-03");
			genre.setName("Action");

			movie = new Movie();
			movie.setMovieId("MV-00003");
			movie.setTitle("Green Zone");
			movie.setDirector("Paul Greengrass");
			movie.setActors("Yigal Naor");
			movie.setRuntime(90L);
			movie.setTicketPrice(7000.0F);
			movie.setReleaseDate(new Date());
			movie.setNowPlaying("Y");
			movie.setGenre(genre);
		} else {
			genre = new Genre();
			movie = new Movie();
		}

		return movie;
	}

}
