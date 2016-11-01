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
package org.anyframe.sample.configuration;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.anyframe.sample.domain.Movie;
import org.junit.Test;
import org.springframework.context.support.GenericXmlApplicationContext;

/**
 * This class is a Test Case class that tests default profile and "dev",
 * "production" profile defined XML.
 * 
 * @author Heewon Jung
 */
public class ProfileTestWithXml {

	private GenericXmlApplicationContext getContext(String profile) {
		GenericXmlApplicationContext ctx = new GenericXmlApplicationContext();
		if (profile != null && profile.length() > 0)
			ctx.getEnvironment().setActiveProfiles(profile);
		ctx.load("classpath:spring/context-profile.xml");
		ctx.refresh();
		return ctx;
	}

	@Test
	public void getDefaultMovie() {
		Movie movie = (Movie) getContext("").getBean("movie");
		assertNotNull(movie);
		assertEquals("Default", movie.getTitle());

	}

	@Test
	public void getDevMovie() {
		Movie movie = (Movie) getContext("Dev").getBean("movie");
		assertNotNull(movie);
		assertEquals("Dev", movie.getTitle());
	}

	@Test
	public void getProductionMovie() {
		Movie movie = (Movie) getContext("Prod").getBean("movie");
		assertNotNull(movie);
		assertEquals("Prod", movie.getTitle());
	}

}
