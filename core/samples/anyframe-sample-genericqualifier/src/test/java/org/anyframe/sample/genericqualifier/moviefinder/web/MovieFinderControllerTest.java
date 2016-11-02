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
package org.anyframe.sample.genericqualifier.moviefinder.web;

import static org.junit.Assert.assertEquals;

import javax.inject.Inject;

import org.anyframe.sample.genericqualifier.domain.Movie;
import org.anyframe.sample.genericqualifier.moviefinder.web.MovieFinderController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.validation.BeanPropertyBindingResult;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:./src/main/resources/spring/context-*.xml", "file:./src/main/resources/spring/*-servlet.xml"})
public class MovieFinderControllerTest {

	private final String SUCCESS_LIST = "moviefinder/movie/list";
	
	@Inject
	private MovieFinderController movieFinderController;

	@Test
	public void testList() throws Exception {
		Movie movie = new Movie();
		String viewName = movieFinderController.list(0, movie, new BeanPropertyBindingResult(movie, "movie"), new ExtendedModelMap());
		
		assertEquals(SUCCESS_LIST, viewName);
	}
}
