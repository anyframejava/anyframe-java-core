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
package org.anyframe.sample.profile.moviefinder.config;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.anyframe.sample.profile.moviefinder.domain.Movie;
import org.junit.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

/**
 * This class is a Test Case class that test default profile and "dev",
 * "production" profile defined configuration class.
 * 
 * @author Heewon Jung
 */
public class ProfileConfigTestWithXml {

	private AnnotationConfigApplicationContext getContext(String profile) {
		AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
		if (profile != null && profile.length() > 0)
			ctx.getEnvironment().setActiveProfiles(profile);
		ctx.register(DefaultMovieConfig.class, DevMovieConfig.class,
				ProductionMovieConfig.class);
		// ctx.scan("org.anyframe.sample.profile.moviefinder.config");
		ctx.refresh();
		return ctx;
	}

	@Test
	public void getDefaultMovie() {
		Movie movie = (Movie) getContext("").getBean("movie");
		assertNotNull(movie);
		assertEquals("Avatar", movie.getTitle());
	}

	@Test
	public void getDevMovie() {
		Movie movie = (Movie) getContext("dev").getBean("movie");
		assertNotNull(movie);
		assertEquals("Shrek", movie.getTitle());
	}

	@Test
	public void getProductionMovie() {
		Movie movie = (Movie) getContext("production").getBean("movie");
		assertNotNull(movie);
		assertEquals("Saw", movie.getTitle());
	}

}
