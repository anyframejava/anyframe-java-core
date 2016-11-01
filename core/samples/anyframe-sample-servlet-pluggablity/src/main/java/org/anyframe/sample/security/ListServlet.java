package org.anyframe.sample.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.domain.Movie;

@WebServlet(name = "ListServlet", urlPatterns = { "/list.do" })
public class ListServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		request.setAttribute("movies", makeMovieList());

		request.getRequestDispatcher("/WEB-INF/jsp/list.jsp").forward(request,
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

	private List<Movie> makeMovieList() {
		List<Movie> movieList = new ArrayList<Movie>();

		Genre genre = new Genre();
		genre.setGenreId("GR-01");
		genre.setName("Adventure");

		Movie movie = new Movie();
		movie.setMovieId("MV-00001");
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");
		movie.setActors("Johnny Depp");
		movie.setRuntime(110L);
		movie.setTicketPrice(8000.0F);
		movie.setReleaseDate(new Date());
		movie.setNowPlaying("Y");
		movie.setGenre(genre);

		movieList.add(movie);

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

		movieList.add(movie);

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

		movieList.add(movie);

		return movieList;
	}

}
