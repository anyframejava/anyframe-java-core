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
package org.anyframe.sample.test.moviefinder.web;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import javax.inject.Inject;

import org.anyframe.sample.test.domain.Genre;
import org.anyframe.sample.test.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.web.bind.support.SimpleSessionStatus;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml", "file:./src/main/resources/spring/*-servlet.xml"})
public class MovieControllerTest {

	private final String SUCCESS_CREATEVIEW = "moviefinder/movie/form";
	private final String SUCCESS_CREATE = "redirect:/movieFinder.do?method=list";
	private final String SUCCESS_GET = "moviefinder/movie/form";
	private final String SUCCESS_UPDATE = "redirect:/movieFinder.do?method=list";
	
	@Inject
	private MovieController movieController;
	
	@Test
	public void testCreateView() throws Exception{
		
		String viewName = movieController.createView(new ExtendedModelMap());
		
		assertEquals(SUCCESS_CREATEVIEW, viewName);

	}
	
	@Test
	public void testCreate() throws Exception{
		
		Movie movie = new Movie();
		movie.setTitle("Shrek (2001)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		Genre genre = new Genre();
		genre.setGenreId("GR-03");
		movie.setGenre(genre);
		movie.setReleaseDate(new Date(20120515));
		movie.setRuntime(new Long(120));
		movie.setTicketPrice(8000f);
		
		String viewName = movieController.create(movie, new BeanPropertyBindingResult(movie, "movie"), new SimpleSessionStatus());
		
		assertEquals(SUCCESS_CREATE, viewName);
		
	}
	
	@Test
	public void testGet() throws Exception{
		
		String viewName = movieController.get("MV-00001", new ExtendedModelMap());

		assertEquals(SUCCESS_GET, viewName);
	}
	
	@Test
	public void testUpdate() throws Exception{
		Movie movie = new Movie();
		movie.setMovieId("MV-00001");
		movie.setTitle("Shrek (2011)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		Genre genre = new Genre();
		genre.setGenreId("GR-03");
		movie.setGenre(genre);
		movie.setReleaseDate(new Date(20120515));
		movie.setRuntime(new Long(120));
		movie.setTicketPrice(8000f);
		
		String viewName = movieController.update(movie, new BeanPropertyBindingResult(movie, "movie"), new SimpleSessionStatus());
		
		assertEquals(SUCCESS_UPDATE, viewName);
	}
}
