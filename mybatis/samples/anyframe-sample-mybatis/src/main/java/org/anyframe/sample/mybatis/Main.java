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
package org.anyframe.sample.mybatis;

import java.util.Date;
import java.util.List;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.domain.Movie;
import org.anyframe.sample.mybatis.moviefiner.service.GenreService;
import org.anyframe.sample.mybatis.moviefiner.service.MovieService;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Sample code to test a feature provided by mybatis
 * 
 * [how to execute this class in maven] mvn exec:java
 * -Dexec.mainClass=org.anyframe.sample.mybatis.Main
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
	 * Main method to execute a test
	 */
	public static void main(String[] args) throws Exception {
		Main main = new Main();

		// 1. initialize context
		main.setup();
		// 2. test
		main.manageGenre();
		main.manageMovie();
		// 3. close context
		main.teardown();
	}

	public void manageGenre() throws Exception {

		// 1. lookup movieService
		GenreService genreService = (GenreService) context
				.getBean("mybatisGenreService");

		// 2. get genre list
		List<Genre> genreList = genreService.getList();

		for (int i = 0; i < genreList.size(); i++) {
			Genre genre = genreList.get(i);
			System.out.println("Genre ID = " + genre.getGenreId());
			System.out.println("Genre Name = " + genre.getName());
		}
	}

	public void manageMovie() throws Exception {
		MovieService movieService = (MovieService) context
				.getBean("mybatisMovieService");

		// 1. create a new movie
		Movie movie = getMovie();
		movieService.create(movie);

		// 2. get a new movie
		movie = movieService.get(movie.getMovieId());
		System.out.println("Movie Title = " + movie.getTitle());

		// 3. update a title of movie
		String title = "Star Wars: Episode II";
		movie.setTitle(title);
		movieService.update(movie);

		// 4. get a updated movie
		movie = movieService.get(movie.getMovieId());
		System.out.println("Movie Title = " + movie.getTitle());

		// 5. remove a movie
		movieService.remove(movie.getMovieId());
	}

	private Movie getMovie() throws Exception {
		Genre genre = new Genre();
		genre.setGenreId("GR-09");

		Movie movie = new Movie();
		movie.setMovieId("MV-90001");
		movie.setGenre(genre);
		movie.setTitle("Star Wars: Episode I");
		movie.setActors("Liam Neeson");
		movie.setDirector("George Lucas");
		movie.setTicketPrice(new Float(8000));
		movie.setRuntime(new Long(90));
		movie.setReleaseDate(new Date());

		return movie;
	}

}
