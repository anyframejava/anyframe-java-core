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
package org.anyframe.plugin.generic.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.generic.domain.GenericGenre;
import org.anyframe.plugin.generic.domain.GenericMovie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MovieServiceTest class is a Test Case class for MovieService.
 * 
 * @author Hyunjung Jeong
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MovieServiceTest {

	@Inject
	@Named("genericMovieService")
	private MovieService movieService;

	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void manageMovie() throws Exception {
		// 1. create a new movie
		GenericMovie movie = getMovie();
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
			movieService.get(movie.getMovieId());
		} catch (Exception e) {			
			assertEquals("fail to remove a movie.",
					"'class org.anyframe.plugin.generic.domain.GenericMovie' object with id '"
							+ movie.getMovieId() + "' not found", e
							.getMessage());  
		}
	}
	
	@Test
	public void findMovieList() throws Exception {
		GenericMovie movie = new GenericMovie();
		movie.setNowPlaying("Y");

		Page page = movieService.getPagingList(movie, 1);

		assertNotNull("page is not null", page);
		assertEquals(3, page.getSize());
	}

	private GenericMovie getMovie() throws Exception {
		GenericGenre genericGenre = new GenericGenre();
		genericGenre.setGenreId("GR-03");

		GenericMovie genericMovie = new GenericMovie();
		genericMovie.setTitle("Shrek (2001)");
		genericMovie.setActors("Shrek");
		genericMovie.setDirector("Andrew Adamson");
		genericMovie.setGenre(genericGenre);
		genericMovie.setReleaseDate(new Date());
		genericMovie.setRuntime(new Long(90));
		genericMovie.setTicketPrice(new Float(8000));
		genericMovie.setNowPlaying("N");

		return genericMovie;
	}

}
