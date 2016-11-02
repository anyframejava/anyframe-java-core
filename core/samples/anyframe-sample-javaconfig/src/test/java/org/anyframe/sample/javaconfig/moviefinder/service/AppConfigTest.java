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
package org.anyframe.sample.javaconfig.moviefinder.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.anyframe.sample.javaconfig.moviefinder.config.AppConfig;
import org.anyframe.sample.javaconfig.moviefinder.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

/**
 * This AppConfigTest class is a test case for AppConfig class that uses
 * java-based configuration.
 * 
 * @author Heewon Jung
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfig.class }, loader = AnnotationConfigContextLoader.class)
public class AppConfigTest {

	@Autowired
	private MovieService movieService;

	@Test
	public void getMovieList() throws Exception {
		Movie movie = movieService.get("MV-00001");

		assertNotNull(movie);
		assertEquals(movie.getMovieId(), "MV-00001");
		assertEquals(movie.getTitle(), "Avatar");
		assertEquals(movie.getNowPlaying(), "Y");
	}
}
