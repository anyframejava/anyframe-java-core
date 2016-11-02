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
package org.anyframe.sample.di.provider.moviefinder.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.anyframe.sample.di.provider.moviefinder.domain.Movie;
import org.springframework.context.annotation.Scope;

/**
 * This MovieDao class is a DAO class to provide movie service functionality to
 * get movie information and movie list information.
 * 
 * @author Sooyeon Park
 */
@Named
@Scope("prototype")
public class MovieDao {

	public Movie get(String movieId) {
		Movie movie = new Movie();
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");

		return movie;
	}

	public List<Movie> getPagingList(Movie movie, int pageIndex) {
		Movie result = new Movie();
		result.setTitle("Alice in Wonderland");
		result.setDirector("Tim Burton");

		List<Movie> results = new ArrayList<Movie>();
		results.add(result);
		return results;
	}

}
