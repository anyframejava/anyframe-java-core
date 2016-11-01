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
package org.anyframe.plugin.excel.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.excel.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * This MovieServiceTest class is a Test Case class for MovieService.
 * 
 * @author Jonghoon Kim
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml" })
public class MovieServiceTest {
	@Inject
	@Named("excelMovieFinder")
	private MovieFinder movieFinder;

	@Test
	public void findMovieList() throws Exception {
		Movie movie = new Movie();
		movie.setNowPlaying("Y");

		Page page = movieFinder.getPagingList(movie, 1);

		assertNotNull("page is not null", page);
		assertEquals(3, page.getSize());
	}
}
