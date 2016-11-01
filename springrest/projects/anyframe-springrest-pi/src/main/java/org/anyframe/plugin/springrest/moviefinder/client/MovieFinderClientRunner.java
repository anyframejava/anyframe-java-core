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
package org.anyframe.plugin.springrest.moviefinder.client;

import java.util.Date;

import org.anyframe.plugin.springrest.domain.Genre;
import org.anyframe.plugin.springrest.domain.Movie;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * This MovieFinderClientRunner class is an runner class to run
 * MovieFinderClient.
 * 
 * @author Jeryeon Kim
 */
public class MovieFinderClientRunner {

	public static void main(String[] args) {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext(
				"classpath:/spring/context-*.xml");
		MovieFinderClient movieFinderClient = applicationContext.getBean(
				"movieFinderClient", MovieFinderClient.class);

		Movie movie = new Movie();
		Genre genre = new Genre();
		genre.setGenreId("GR-02");
		movie.setGenre(genre);
		movie.setTitle("괴물");
		movie.setDirector("봉준호");
		movie.setActors("송강호, 배두나");
		movie.setNowPlaying("Y");
		movie.setReleaseDate(new Date());
		movie.setRuntime(120L);
		movie.setTicketPrice(7500F);

		try {
			String createdMovieUrl = movieFinderClient.createMovie(movie);
			System.out.println("1. New movie is registered. [search URL : "
					+ createdMovieUrl + "]");
			String movieId = createdMovieUrl.substring(createdMovieUrl
					.lastIndexOf("/") + 1);
			System.out.println("2. New Movie ID : " + movieId);

			movie = movieFinderClient.findMovie(movieId);
			System.out.println("3. Finded Movie Object : " + movie);

			try {
				movie = movieFinderClient.findMovie("MV-00099");
			} catch (Exception e) {
				// intended exception because of '404 Not Found'
				System.out.println("4. Intended exception message : "
						+ e);
			}

			movie.setTitle("Updated Movie Title");
			movieFinderClient.updateMovie(movie);

			movie = movieFinderClient.findMovie(movieId);
			System.out.println("5. Updated Movie Object : " + movie);

			movieFinderClient.removeMovie(movieId);
			try {
				movie = movieFinderClient.findMovie(movieId);
			} catch (Exception e) {
				// intended exception because of '404 Not Found'
				System.out
						.println("6. Delete movie successfully. movie not found exception message : "
								+ e);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
