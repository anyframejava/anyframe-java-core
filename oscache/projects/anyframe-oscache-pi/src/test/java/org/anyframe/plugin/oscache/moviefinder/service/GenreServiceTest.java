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
package org.anyframe.plugin.oscache.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.oscache.OSCacheService;
import org.anyframe.plugin.oscache.domain.Genre;
import org.anyframe.plugin.oscache.moviefinder.service.GenreService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

/**
 * This GenreServiceTest class is a Test Case class for GenreService.
 * 
 * @author Sujeong Lee
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class GenreServiceTest {
	@Inject
	@Named("osCacheGenreService")
	private GenreService genreService;

	@Inject
	@Named("cacheService")
	OSCacheService cacheService;

	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void manageGenre() throws Exception {
		// 1. create a new genre
		Genre genre = new Genre();
		genre.setName("Western");
		genreService.create(genre);
		putInCache(genre);

		// 2. assert - create
		genre = getGenreByPk(genre.getGenreId());
		assertNotNull("fail to fetch a genre", genre);
		assertEquals("fail to compare a genre name", "Western", genre.getName());

		// 3. update a name of genre
		String name = "Western " + System.currentTimeMillis();
		genre.setName(name);
		genreService.update(genre);
		putInCache(genre);

		// 4. assert - update
		genre = getGenreByPk(genre.getGenreId());
		assertNotNull("fail to fetch a genre", genre);
		assertEquals("fail to compare a updated name", name, genre.getName());

		// 5. remove a genre
		genreService.remove(genre.getGenreId());
	}

	@SuppressWarnings("unchecked")
	@Test
	public void findGenre() throws Exception {
		Map<String, Genre> resultMap = (HashMap<String, Genre>) cacheService
				.getFromCache("genreList");
		Genre genre = resultMap.get("GR-01");
		assertNotNull("fail to fetch a genre", genre);
	}

	@SuppressWarnings("unchecked")
	private void putInCache(Genre genre) throws Exception {
		Map<String, Genre> genreList = (HashMap<String, Genre>) cacheService
				.getFromCache("genreList");
		genreList.put(genre.getGenreId(), genre);
		cacheService.putInCache("genreList", genreList);
	}

	@SuppressWarnings("unchecked")
	private Genre getGenreByPk(String genreId) throws Exception{
		Map<String, Genre> resultMap = (HashMap<String, Genre>) cacheService
		.getFromCache("genreList");
		Genre genre = resultMap.get(genreId);
		return genre;
	}
}
