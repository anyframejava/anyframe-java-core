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

import java.math.BigDecimal;
import java.sql.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.common.MovieFinderException;
import org.anyframe.plugin.mybatis.domain.Genre;
import org.anyframe.plugin.mybatis.domain.Movie2DVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MovieServiceTest2 {
	@Inject
	@Named("mybatisMovieService2")
	private MovieService2 movieService;

	/*@Inject
	@Named("mybatisMovieFinder")
	private MovieFinder movieFinder;*/

	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void manageMovie() throws Exception {
		// 1. create a new movie
		Movie2DVO movie = getMovie();
		movieService.insertMovie(movie);

		// 2. assert - create
		movie = movieService.selectOneMovie(movie);
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a movie title", "Shrek (2001)", movie
				.getTitle());

		// 3. update a title of movie
		String title = "Shrek 2 " + System.currentTimeMillis();
		movie.setTitle(title);
		movieService.updateMovie(movie);

		// 4. assert - update
		movie = movieService.selectOneMovie(movie);
		assertNotNull("fail to fetch a movie", movie);
		assertEquals("fail to compare a updated title", title, movie.getTitle());

		// 5. remove a movie
		movieService.deleteMovie(movie);

		try{
			movie = movieService.selectOneMovie(movie);
		
		} catch (MovieFinderException e) {
			// we expect this exception
			assertNotNull("fail to remove a movie", e);
		}
	}

	@Test
	public void findMovie() throws Exception {
		Movie2DVO movie = new Movie2DVO();
		movie.setMovieId("MV-00001");
		movie = movieService.selectOneMovie(movie);
		assertNotNull(movie);
	}

	@Test
	public void findMovieList() throws Exception {
		Movie2DVO movie = new Movie2DVO();
		movie.setNowPlaying("Y");

		// Page page = movieFinder.getPagingList(movie, 1);
		Page page = movieService.pagingMovie(movie, 1, 5);

		assertNotNull("page is not null", page);
		assertEquals(3, page.getSize());
	}

	private Movie2DVO getMovie() throws Exception {
		Genre genre = new Genre();
		genre.setGenreId("GR-03");

		Movie2DVO movie = new Movie2DVO();
		movie.setTitle("Shrek (2001)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		movie.setGenre(genre);
		movie.setReleaseDate(new Date(20150625));
		movie.setRuntime(new BigDecimal(90));
		movie.setTicketPrice(new BigDecimal(8000));
		movie.setNowPlaying("N");

		return movie;
	}
}
