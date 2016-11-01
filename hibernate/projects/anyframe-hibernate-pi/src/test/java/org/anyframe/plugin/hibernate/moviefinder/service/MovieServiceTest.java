package org.anyframe.plugin.hibernate.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.hibernate.domain.Genre;
import org.anyframe.plugin.hibernate.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MovieServiceTest {
	@Inject
	@Named("hibernateMovieService")
	private MovieService movieService;

	@Inject
	@Named("hibernateMovieFinder")
	private MovieFinder movieFinder;

	@Test
	@Rollback(value = true)
	public void manageMovie() throws Exception {
		// 1. create a new movie
		Movie movie = getMovie();
		movieService.create(movie);

		// 2. assert - create
		movie = movieService.get(movie.getMovieId());
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a movie title", "Shrek (2001)", movie
				.getTitle());

		// 3. update a title of movie
		String title = "Shrek 2 " + System.currentTimeMillis();
		movie.setTitle(title);
		movieService.update(movie);

		// 4. assert - update
		movie = movieService.get(movie.getMovieId());
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a updated title", title, movie.getTitle());

		// 5. remove a movie
		movieService.remove(movie.getMovieId());

		// 6. assert - remove
		movie = movieService.get(movie.getMovieId());
		assertNull("fail to remove a movie", movie);
	}

	@Test
	public void findMovie() throws Exception {
		Movie movie = movieService.get("MV-00005");
		assertNotNull("fail to fetch a movie", movie);
	}

	@Test
	public void findMovieList() throws Exception {
		Movie movie = new Movie();
		movie.setNowPlaying("Y");

		Page page = movieFinder.getPagingList(movie, 1);

		assertNotNull("page is not null", page);
		assertEquals(3, page.getSize());
	}

	private Movie getMovie() throws Exception {
		Genre genre = new Genre();
		genre.setGenreId("GR-03");

		Movie movie = new Movie();
		movie.setTitle("Shrek (2001)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		movie.setGenre(genre);
		movie.setRuntime(new Long(90));
		movie.setTicketPrice(new Float(8000));
		movie.setNowPlaying("N");

		return movie;
	}
}
