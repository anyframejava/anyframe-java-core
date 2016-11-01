/*
 * Copyright 2002-2009 the original author or authors.
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
package org.anyframe.sample.aop;

import java.util.Date;

import org.anyframe.pagination.Page;
import org.anyframe.sample.aop.domain.Genre;
import org.anyframe.sample.aop.domain.Movie;
import org.anyframe.sample.aop.moviefinder.service.MovieFinder;
import org.anyframe.sample.aop.moviefinder.service.MovieService;
import org.springframework.context.support.ClassPathXmlApplicationContext;


/**
 * Before, AfterThrowing Aspect
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=org.anyframe.sample.aop.Main
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
	 * detroying
	 */
	protected void teardown() {
		context.close();
	}

	/**
	 *  main
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
		// 1. lookup aopMovieFinder, aopMovieService
		MovieFinder movieFinder = (MovieFinder) context.getBean("aopMovieFinder");
		MovieService movieService = (MovieService) context.getBean("aopMovieService");

		// 2. create a new movie
		Movie movie = getMovie();
		movieService.create(movie);
		
		// 3. get movie list
		Page movies = movieFinder.getPagingList(movie, 1);

		// 4. update movie
		movie.setTitle("Mission Impossible");
		movieService.update(movie);
		
		// 5. get movie 
		Movie result = movieService.get(movie.getMovieId());
		
		// 6. remove movie 
		movieService.remove(movie.getMovieId());

	}
	
	private Movie getMovie() throws Exception {
		Genre genre = new Genre();
		genre.setGenreId("GR-03");

		Movie movie = new Movie();
		movie.setMovieId("MV-99999");
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

