package org.anyframe.plugin.simpleweb.map.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MovieServiceTest {
	@Inject
	@Named("simplewebMapMovieService")
	private MovieService movieService;

	@Inject
	@Named("simplewebMapMovieFinder")
	private MovieFinder movieFinder;

	@Test
	@Rollback(value = true)
	public void manageMovie() throws Exception {
		// 1. create a new movie
		Map<String,Object> movie = getMovie();
		movieService.create(movie);

		// 2. assert - create
		Map<String,Object> assertMovie = new HashMap<String,Object>();
		assertMovie.put("movieId", movie.get("movieId"));
		movie = movieService.get(assertMovie);
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a movie title", "Shrek (2001)", movie
				.get("title"));

		// 3. update a title of movie
		String title = "Shrek 2 " + System.currentTimeMillis();
		movie.put("title", title);
		movieService.update(movie);

		// 4. assert - update
		movie = movieService.get(assertMovie);
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a updated title", title, movie.get("title"));

		// 5. remove a movie
		movieService.remove(assertMovie);

		// 6. assert - remove
		movie = movieService.get(assertMovie);
		assertNull("fail to remove a movie", movie);
	}

	@Test
	public void findMovie() throws Exception {
		Map<String,Object> movie = new HashMap<String,Object>();
		movie.put("movieId", "MV-00005");
		Map<String,Object> assertMovie = movieService.get(movie);
		assertNotNull("fail to fetch a movie", assertMovie);
	}

	@Test
	public void findMovieList() throws Exception {
		Map<String,Object> search = new HashMap<String,Object>();
		search.put("nowPlayingCondition", "Y");
		
		Page page = movieFinder.getPagingList(search);

		assertNotNull("page is not null", page);
		assertEquals(3, page.getSize());
	}

	private Map<String,Object> getMovie() throws Exception {
		Map<String,Object> movie = new HashMap<String,Object>();
		movie.put("title", "Shrek (2001)");
		movie.put("actors", "Shrek");
		movie.put("director", "Andrew Adamson");
		movie.put("releaseDate", new Date());
		movie.put("runtime", 90);
		movie.put("ticketPrice", 8000);
		movie.put("nowPlaying", "N");
		movie.put("genreId", "GR-03");
		
		return movie;
	}
}
