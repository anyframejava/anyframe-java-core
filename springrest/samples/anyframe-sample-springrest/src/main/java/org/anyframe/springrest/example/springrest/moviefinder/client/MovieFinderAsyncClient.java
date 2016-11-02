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

import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.springrest.example.springrest.domain.Movie;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.client.AsyncRestTemplate;
import org.springframework.web.client.RestTemplate;

/**
 * This MovieFinderClient class is an example of REST client using RestTemplate.
 * 
 * @author Jeryeon Kim
 */
@Service
public class MovieFinderAsyncClient {
	
	@Inject
	@Named("restTemplate")
	private RestTemplate restTemplate;
	
	@Inject
	@Named("asyncRestTemplate")
	private AsyncRestTemplate asyncRestTemplate;
	
	private SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");
	
	public String createMovie(Movie movie) throws Exception {
		String movieCreateUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/moviesasync";

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_ATOM_XML);
		HttpEntity<Movie> requestEntity = new HttpEntity<Movie>(movie, headers);

		System.out.println("Sync start ! : exchange ( sleep 3 seconds in controller ) => [" + format.format(new Date()) + "]");
		ResponseEntity<String> response = restTemplate.exchange(movieCreateUrl,
				HttpMethod.POST, requestEntity, String.class);
		System.out.println("Sync end ! : exchange => [" + format.format(new Date()) + "]");

		String movieSearchUrl = response.getHeaders().getLocation().toURL()
				.toString();

		return movieSearchUrl;
	}
	
	public void getMovie2(String movieId) throws Exception {
		
		String movieSearchUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/moviesasync/{movieId}";

		System.out.println("Async start ! : getForEntity ( sleep 3 seconds in controller ) => [" + format.format(new Date()) + "]");
		ListenableFuture<ResponseEntity<Movie>> futureEntity = asyncRestTemplate.getForEntity(movieSearchUrl, Movie.class, movieId);
		System.out.println("Async end ! : getForEntity => [" + format.format(new Date()) + "]");

		System.out.println("== futureEntity.get() start ! [" + format.format(new Date()) + "]");
		ResponseEntity<Movie> movie = futureEntity.get();
		System.out.println("--> movie id : " + movie.getBody().getMovieId());
		System.out.println("--> movie title : " + movie.getBody().getTitle());
		System.out.println("== futureEntity.get() success ! [" + format.format(new Date()) + "]");

	}
	
	public String createMovie2(Movie movie) throws Exception {
		String movieCreateUrl = "http://localhost:8080/anyframe-sample-springrest/springrest/moviesasync";
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_ATOM_XML);
		HttpEntity<Movie> requestEntity = new HttpEntity<Movie>(movie, headers);
		
		System.out.println("Async Start ! : exchange ( sleep 3 seconds in controller ) => [" + format.format(new Date()) + "]");
		
		ListenableFuture<ResponseEntity<String>> futureEntity = 
				asyncRestTemplate.exchange(movieCreateUrl, HttpMethod.POST, requestEntity, String.class);
		
		System.out.println("Async End ! : exchange => [" + format.format(new Date()) + "]");
		
		System.out.println("== futureEntity.addCallback() start ! [" + format.format(new Date()) + "]");
		futureEntity.addCallback(new ListenableFutureCallback<ResponseEntity<String>>() {

			public void onFailure(Throwable arg0) {
				// TODO Auto-generated method stub
				System.out.println("--> Fail!!!");
			}

			public void onSuccess(ResponseEntity<String> arg0) {
				// TODO Auto-generated method stub
				System.out.println("--> Success!!!");
				
				String movieSearchUrl = "";
				try {
					movieSearchUrl = arg0.getHeaders().getLocation().toURL().toString();
				} catch (MalformedURLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("result movieSearchUrl : " + movieSearchUrl);
			}
		});

		System.out.println("== futureEntity.addCallback() end ! [" + format.format(new Date()) + "]");

		return "";
	}
}