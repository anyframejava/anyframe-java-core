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
package org.anyframe.plugin.mybatis.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.common.MovieFinderException;
import org.anyframe.plugin.mybatis.domain.Genre;
import org.anyframe.plugin.mybatis.domain.Movie;
import org.anyframe.plugin.mybatis.moviefinder.service.MovieFinder;
import org.anyframe.plugin.mybatis.moviefinder.service.MovieService;
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
	@Named("mybatisMovieService")
	private MovieService movieService;

	@Inject
	@Named("mybatisMovieFinder")
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
		try {
			movie = movieService.get(movie.getMovieId());
		} catch (MovieFinderException e) {
			// we expect this exception
			assertNotNull("fail to remove a movie", e);
		}
	}

	@Test
	public void findMovie() throws Exception {
		Movie movie = movieService.get("MV-00001");
		assertNotNull("fail to fetch a movie", movie.getGenre().getGenreId());
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
