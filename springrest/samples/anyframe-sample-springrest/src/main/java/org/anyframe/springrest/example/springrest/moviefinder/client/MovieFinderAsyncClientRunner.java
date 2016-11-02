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
package org.anyframe.springrest.example.springrest.moviefinder.client;

import java.util.Date;

import org.anyframe.springrest.example.springrest.domain.Genre;
import org.anyframe.springrest.example.springrest.domain.Movie;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * This MovieFinderClientRunner class is an runner class to run
 * MovieFinderClient.
 * 
 * @author Jeryeon Kim
 */
public class MovieFinderAsyncClientRunner {

	public static void main(String[] args) {
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext(
				"classpath:/spring/context-*.xml");
		
		MovieFinderAsyncClient movieFinderAsyncClient = applicationContext.getBean(
				"movieFinderAsyncClient", MovieFinderAsyncClient.class);

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
			
			System.out.println("====== Synccall ======");
			String createdMovieUrl = movieFinderAsyncClient.createMovie(movie);
			System.out.println("1. New movie is registered. [search URL : "
					+ createdMovieUrl + "]");
			String movieId = createdMovieUrl.substring(createdMovieUrl
					.lastIndexOf("/") + 1);
			System.out.println("2. New Movie ID : " + movieId);
			
			System.out.println("====== Asynccall 1 ======");
			movieFinderAsyncClient.getMovie2(movieId);
			
			System.out.println("====== Asynccall 2 ======");
			createdMovieUrl = movieFinderAsyncClient.createMovie2(movie);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
