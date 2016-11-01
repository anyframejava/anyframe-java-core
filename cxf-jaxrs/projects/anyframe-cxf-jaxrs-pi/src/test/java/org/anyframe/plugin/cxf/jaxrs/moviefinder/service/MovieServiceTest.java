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
package org.anyframe.plugin.cxf.jaxrs.moviefinder.service;

import static org.junit.Assert.assertNotNull;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.core.Response;

import org.anyframe.plugin.cxf.jaxrs.domain.Genre;
import org.anyframe.plugin.cxf.jaxrs.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This MovieServiceTest class is a Test Case class for MovieService.
 * 
 * @author Sooyeon Park
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MovieServiceTest {
	@Inject
	@Named("coreMovieService")
	private MovieService movieService;

	@Test
	@Rollback(value = true)
	public void manageMovie() throws Exception {
		// 1. create a new movie
		Movie movie = getMovie();
		movieService.create(movie);

		// 2. assert - create
		Response response = movieService.get(movie.getMovieId());
		assertNotNull("fail to fetch a movie", response);
//		assertEquals("fail to compare a movie title", "Shrek (2001)", movie.getTitle());

		// 3. update a title of movie
		String title = "Shrek 2 " + System.currentTimeMillis();
		movie.setTitle(title);
		movieService.update(movie);

		// 4. assert - update
		response = movieService.get(movie.getMovieId());
		assertNotNull("fail to fetch a movie", response);
//		assertEquals("fail to compare a updated title", title, movie.getTitle());

		// 5. remove a movie
		movieService.remove(movie.getMovieId());
	}

	@Test
	public void findMovie() throws Exception {
		Response response = movieService.get("MV-00001");
		assertNotNull("fail to fetch a movie", response);
	}

	@Test
	public void findMovieList() throws Exception {
		Movie movie = new Movie();
		movie.setNowPlaying("Y");

		Response response = movieService.getPagingList(movie, 1);

		assertNotNull("page is not null", response);
		//assertEquals(3, page.getSize());
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
