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
package org.anyframe.sample.transaction;

import java.util.Date;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.domain.Movie;
import org.anyframe.sample.transaction.moviefinder.service.MovieService;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Sample code to test a feature provided by TransactionService
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=anyframe.sample.transaction.Main
 * 
 * @author Heewon Jung
 */
public class Main {

	protected ClassPathXmlApplicationContext context;

	/**
	 * initializing
	 */
	protected void setup() {
		String[] locations = new String[] { "classpath:spring/context-*.xml" };
		context = new ClassPathXmlApplicationContext(locations, false);
		context.refresh();
	}

	/**
	 * destroying
	 */
	protected void teardown() {
		context.close();
	}

	/**
	 * Main method to execute a test
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. initialize context
		main.setup();
		// 2. test
		main.manageMovie();
		// 3. close context
		main.teardown();
	}

	public void manageMovie() throws Exception {

		// 1. lookup movieService
		MovieService movieService = (MovieService) context
				.getBean("txMovieService");

		// 1. create a new movie
		Movie movie = getMovie();
		movieService.create(movie);

		// 2. get a movie
		movie = movieService.get(movie.getMovieId());
		System.out.println("The product name is a '" + movie.getTitle() + "'.");
	}

	private Movie getMovie() throws Exception {
		Genre genre = new Genre();
		genre.setGenreId("GR-03");

		Movie movie = new Movie();
		movie.setMovieId("MV-" + System.currentTimeMillis());
		movie.setTitle("Shrek (2001)");
		movie.setActors("Shrek");
		movie.setDirector("Andrew Adamson");
		movie.setGenre(genre);
		movie.setReleaseDate(new Date());
		movie.setRuntime(new Long(90));
		movie.setTicketPrice(new Float(8000));
		movie.setNowPlaying("N");

		return movie;
	}
}
