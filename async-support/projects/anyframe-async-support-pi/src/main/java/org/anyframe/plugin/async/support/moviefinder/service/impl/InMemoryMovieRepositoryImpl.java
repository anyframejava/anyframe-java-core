/*
 * Copyright 2008-2013 the original author or authors.
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
package org.anyframe.plugin.async.support.moviefinder.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.anyframe.plugin.async.support.moviefinder.service.MovieRepository;
import org.springframework.stereotype.Repository;

/**
 * This InMemoryMovieRepositoryImpl class is is an Implementation class to use
 * MovieRepository in Memory.
 * 
 * @author Kwangyoung Kim
 */
@Repository
public class InMemoryMovieRepositoryImpl implements MovieRepository {

	// A thread-safe variant of ArrayList in which all mutative operations (add,
	// set, and so on) are implemented by making a fresh copy of the underlying
	// array.
	private final List<String> movies = new CopyOnWriteArrayList<String>();

	public List<String> getMovies() {
		if (this.movies.isEmpty()) {
			return Collections.<String> emptyList();
		}
		return this.movies;
	}

	public void addMovie(String newMovieMessage) {
		this.movies.add(newMovieMessage);
	}

	public void removeMovie() {
		this.movies.removeAll(movies);
	}

}
