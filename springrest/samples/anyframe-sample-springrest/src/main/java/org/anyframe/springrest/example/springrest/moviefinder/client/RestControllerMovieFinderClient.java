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

import java.net.URISyntaxException;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.springrest.example.springrest.domain.Movie;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriTemplate;

/**
 * This MovieFinderClient class is an example of REST client using RestTemplate.
 * 
 * @author Jeryeon Kim
 */
@Service
public class RestControllerMovieFinderClient {

	@Inject
	@Named("restTemplate")
	private RestTemplate restTemplate;

	public String createMovie(Movie movie) throws Exception {
		String movieCreateUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/restmovies";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_ATOM_XML);
		HttpEntity<Movie> requestEntity = new HttpEntity<Movie>(movie, headers);

		ResponseEntity<String> response = restTemplate.exchange(movieCreateUrl,
				HttpMethod.POST, requestEntity, String.class);

		return response.getBody();
	}

	public Movie findMovie(String movieId) {
		String movieSearchUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/restmovies/{movieId}";

		Movie movie = restTemplate.getForObject(movieSearchUrl, Movie.class,
				movieId);

		return movie;
	}

	public String updateMovie(Movie movie) {
		String movieSearchUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/restmovies/{movieId}";

		restTemplate.put(movieSearchUrl, movie, movie.getMovieId());

		return movieSearchUrl;
	}

	public void removeMovie(String movieId) throws URISyntaxException {
		String movieSearchUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/restmovies/{movieId}";

		UriTemplate template = new UriTemplate(movieSearchUrl);

		System.out.println("Movie URI to delete : " + template.expand(movieId));

		restTemplate.delete(template.expand(movieId));
	}
}