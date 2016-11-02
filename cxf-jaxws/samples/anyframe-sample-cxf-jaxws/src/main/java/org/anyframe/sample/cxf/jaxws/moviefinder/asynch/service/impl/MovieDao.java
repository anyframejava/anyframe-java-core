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
package org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.anyframe.sample.cxf.jaxws.moviefinder.asynch.service.asynch_soap_http.Movie;

public class MovieDao {

	private Map<String, Movie> MOVIES = new HashMap<String, Movie>();

	public MovieDao() {
		Movie movie1 = new Movie();
		movie1.setMovieId("001");
		movie1.setTitle("The Sound Of Music");
		movie1.setDirector("Robert Wise");

		Movie movie2 = new Movie();
		movie2.setMovieId("002");
		movie2.setTitle("No Country For Old Man");
		movie2.setDirector("Ethan Coen,Joel Coen");

		MOVIES.put(movie1.getMovieId(), movie1);
		MOVIES.put(movie2.getMovieId(), movie2);
	}

	public List<Movie> findMovieListAll() {
		List<Movie> movieList = new ArrayList<Movie>();
		Iterator<Movie> itr = this.MOVIES.values().iterator();
		while (itr.hasNext())
			movieList.add(itr.next());
		return movieList;
	}
}
