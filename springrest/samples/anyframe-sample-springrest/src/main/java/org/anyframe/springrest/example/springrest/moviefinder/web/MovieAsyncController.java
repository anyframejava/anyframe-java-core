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
package org.anyframe.springrest.example.springrest.moviefinder.web;


import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.springrest.example.springrest.domain.Movie;
import org.anyframe.springrest.example.springrest.moviefinder.service.GenreService;
import org.anyframe.springrest.example.springrest.moviefinder.service.MovieFinder;
import org.anyframe.springrest.example.springrest.moviefinder.service.MovieService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Jeryeon Kim
 */
@Controller("springrestMovieAsyncController")
@RequestMapping("/moviesasync")
public class MovieAsyncController {

	@Inject
	@Named("springrestMovieService")
	private MovieService movieService;

	@Inject
	@Named("springrestGenreService")
	private GenreService genreService;

	@Inject
	@Named("springrestMovieFinder")
	private MovieFinder movieFinder;	

	/**
	 * Generate response
	 * 
	 * @param movie
	 * @return Response Status : 201 CREATED, with Location header
	 * @throws Exception
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> create(@RequestBody Movie movie)
			throws Exception {
		
		System.out.println("create : sleep 3s");
		Thread.sleep(3000);
		
		this.movieService.create(movie);

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Location",
				"http://localhost:8080/myapp/springrest/movies/"
						+ movie.getMovieId());

		
		// 201 CREATED, Location header
		return new ResponseEntity<String>("Created resource "
				+ movie.getMovieId(), responseHeaders, HttpStatus.CREATED);
	}	

	/**
	 * Rendering view using ContentNegotiatingViewResolver
	 * 
	 * @param movieId
	 * @param model
	 * @return return Movie object, Response Status : 200 OK
	 * @throws Exception
	 */	
	@RequestMapping(value = "/{movieId}", method = RequestMethod.GET)
	public ResponseEntity<Movie> get(@PathVariable("movieId") String movieId, Model model)
			throws Exception {
		
		System.out.println("async : get : sleep 3s");
		Thread.sleep(3000);
		
		Movie movie = this.movieService.get(movieId);
		System.out.println("movie async :" + movie);
		
		return new ResponseEntity<Movie>(movie, HttpStatus.OK);
	}
}