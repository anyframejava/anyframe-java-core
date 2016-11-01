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
package org.anyframe.plugin.remoting.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.remoting.domain.Genre;
import org.anyframe.plugin.remoting.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This MovieServiceTest class is a Test Case class for MovieService using httpInvoker.
 * 
 * @author Sooyeon Park
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/test/resources/spring/context-*.xml" })
public class MovieServiceTest {

	@Inject
	@Named("remotingMovieTestClient")
	private MovieService movieService;
	
	@Inject
	@Named("remotingMovieFinderTestClient")
	private MovieFinder movieFinder;

	@Test
	public void manageMovie() throws Exception {
		// 1. create a new movie
		Movie movie = getMovie();
		String movieId = movieService.create(movie);

		// 2. assert - create
		movie = movieService.get(movieId);
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a movie title", "Shrek (2001)",
				movie.getTitle());

		// 3. update a title of movie
		String title = "Shrek 2 " + System.currentTimeMillis();
		movie.setTitle(title);
		movieService.update(movie);

		// 4. assert - update
		movie = movieService.get(movieId);
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a updated title", title, movie.getTitle());

		// 5. remove a movie
		movieService.remove(movieId);
	}

	@Test
	public void findMovie() throws Exception {
		Movie movie = movieService.get("MV-00001");
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
		movie.setReleaseDate(new Date());
		movie.setRuntime(new Long(90));
		movie.setTicketPrice(new Float(8000));
		movie.setNowPlaying("N");

		return movie;
	}
	
}
