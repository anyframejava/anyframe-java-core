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

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.common.MovieFinderException;
import org.anyframe.plugin.mybatis.domain.Genre2DVO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class GenreServiceTest {
	@Inject
	@Named("mybatisGenreService2")
	private GenreService2 genreService;

	@Test
	@Transactional(value = "txManager")
	@Rollback(value = true)
	public void manageGenre() throws Exception {
		// 1. create a new genre
		Genre2DVO genre = getGenre();
		genreService.insertGenre(genre);

		// 2. assert - create
		genre = genreService.selectOneGenre(genre);
		assertNotNull("fail to fetch a genre", genre);
		assertEquals("fail to compare a genre name", "Horror", genre.getName());

		// 3. update a name of genre
		String name = "GenreTest " + System.currentTimeMillis();
		genre.setName(name);
		genreService.updateGenre(genre);

		// 4. assert - update
		genre = genreService.selectOneGenre(genre);
		assertNotNull("fail to fetch a genre", genre);
		assertEquals("fail to compare a updated name", name, genre.getName());

		// 5. remove a genre
		genreService.deleteGenre(genre);

		// 6. assert - remove
		try {
			genre = genreService.selectOneGenre(genre);
			
		} catch (MovieFinderException e) {
			// we expect this exception
			assertNotNull("fail to remove a genre", e);
		}
	}

	@Test
	public void findGenre() throws Exception {
		Genre2DVO genre = new Genre2DVO();
		genre.setGenreId("GR-01");
		genre = genreService.selectOneGenre(genre);
		assertNotNull("fail to fetch a genre", genre.getGenreId());
	}

	@Test
	public void findGenreList() throws Exception {
		Genre2DVO genre = new Genre2DVO();
		// genre.setNowPlaying("Y");

		Page page = genreService.pagingGenre(genre, 1, 5);

		assertNotNull("page is not null", page);
		assertEquals(3, page.getSize());
	}

	private Genre2DVO getGenre() throws Exception {
		Genre2DVO genre = new Genre2DVO();
		genre.setGenreId("GR-11");
		genre.setName("Horror");

		return genre;
	}
}
