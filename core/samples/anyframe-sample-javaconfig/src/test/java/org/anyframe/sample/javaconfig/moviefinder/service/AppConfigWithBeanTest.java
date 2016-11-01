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

import java.util.List;

import org.anyframe.sample.javaconfig.moviefinder.config.AppConfigWithBean;
import org.anyframe.sample.javaconfig.moviefinder.domain.Movie;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

/**
 * This AppConfigWithBeanTest class is a test case for AppConfigWithBean class
 * that uses java-based configuration.
 * 
 * @author Heewon Jung
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { AppConfigWithBean.class }, loader = AnnotationConfigContextLoader.class)
public class AppConfigWithBeanTest {

	@Autowired
	private MovieFinder movieFinder;

	@Test
	public void getMovieList() throws Exception {
		List<Movie> list = movieFinder.getPagingList(new Movie(), 1);
		assertEquals(list.size(), 1);

		Movie movie = list.get(0);
		assertEquals(movie.getTitle(), "Alice in Wonderland");

	}
}
