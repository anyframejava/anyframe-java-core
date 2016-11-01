/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.sample.logging.moviefinder.service.impl;

import org.anyframe.sample.logging.moviefinder.domain.Movie;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a dao class to provide movie management functionality.
 * 
 * @author Sooyeon Park
 */
@Repository("movieDao")
public class MovieDao {

	public void create(Movie movie) {
		System.out.println("movieDao - call create");
	}

	public Movie get() {
		System.out.println("movieDao - call get");
		return null;
	}
}
