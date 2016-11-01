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
package org.anyframe.plugin.cache.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.cache.domain.Genre;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This GenreServiceTest class is a Test Case class for GenreService.
 * 
 * @author Sooyeon Park
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class GenreServiceTest {

	@Inject
	@Named("cacheGenreService")
	private GenreService genreService;

	@Test
	@Rollback(value = true)
	public void manageGenre() throws Exception {
		GenreService.LOGGER.info("------ manageGenre test ------");

		// 1. create a new genre
		Genre genre = new Genre();
		genre.setName("Western");
		genreService.create(genre);

		// 2. assert - create
		String genreId = genre.getGenreId();
		genre = genreService.get(genreId);
		assertNotNull("fail to fetch a genre", genre);
		assertEquals("fail to compare a genre name", "Western", genre.getName());

		// 3. update a name of genre
		String name = "Western " + System.currentTimeMillis();
		genre.setName(name);
		genreService.update(genre);

		// 4. assert - update
		Genre updatedGenre = genreService.get(genreId);
		assertNotNull("fail to fetch a genre", updatedGenre);
		assertEquals("fail to compare a updated name", name,
				updatedGenre.getName());

		// 5. update a name of genre and get an updated genre
		String newName = "Western " + System.currentTimeMillis();
		genre.setName(newName);
		Genre updatedAndCachedGenre = genreService.updateAndGet(genre);
		assertNotNull("fail to fetch a genre", updatedAndCachedGenre);
		assertEquals("fail to compare a updated name", newName,
				updatedAndCachedGenre.getName());

		Genre cachedGenre = genreService.get(genreId);
		assertNotNull("fail to fetch a cached genre", cachedGenre);
		assertEquals("fail to compare a updated name of a cached genre",
				newName, cachedGenre.getName());

		// 6. remove a genre
		genreService.remove(updatedGenre.getGenreId());
	}

	@Test
	public void findGenre() throws Exception {
		GenreService.LOGGER.info("------ findGenre test ------");

		Genre genre = genreService.get("GR-01");
		assertNotNull("fail to fetch a genre", genre);

		Genre cachedGenre = genreService.get("GR-01");
		assertNotNull("fail to fetch a cached genre", cachedGenre);
	}

	@Test
	public void findGenreList() throws Exception {
		GenreService.LOGGER.info("------ findGenreList test ------");

		List<Genre> genreList = genreService.getList();
		assertNotNull("genreList is not null", genreList);
		assertEquals(10, genreList.size());

		List<Genre> cachedGenreList = genreService.getList();
		assertNotNull("cached genreList is not null", cachedGenreList);
		assertEquals(10, cachedGenreList.size());
	}
}
