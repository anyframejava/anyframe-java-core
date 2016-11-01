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
package org.anyframe.plugin.util.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.anyframe.plugin.util.domain.Movie;
import org.anyframe.plugin.util.service.MovieFinder;
import org.anyframe.util.ThreadLocalUtil;
import org.springframework.stereotype.Service;
/**
 * This MovieFinderImpl class is a implementation class of MovieFinder interface.
 * This class is designed to provide a list of movies.
 * 
 * @author Sunjoong Kim
 */
@Service("utilMovieFinder")
public class MovieFinderImpl implements MovieFinder{

	public List<Movie> list() {
		ArrayList<Movie> movieList = new ArrayList<Movie>();
		
		String userName =  (String) ThreadLocalUtil.get("userName");
		
		if("admin".equals(userName)) {
			Movie movie = new Movie();
			movie.setMovieId("MV-00001");
			movie.setTitle("Shrek (2011)");
			movie.setActors("Shrek");
			movie.setDirector("Andrew Adamson");
			movie.setGenreName("Animation");
			movie.setReleaseDate("2011/12/31");
			movie.setTicketPrice(new Float(8000));
			
			movieList.add(movie);
			
			movie = new Movie();
			movie.setMovieId("MV-00002");
			movie.setTitle("Superman (2012)");
			movie.setActors("Superman");
			movie.setDirector("Steven Spielberg");
			movie.setGenreName("Action");
			movie.setReleaseDate("2012/01/01");
			movie.setTicketPrice(new Float(7500));
			
			movieList.add(movie);
			
			return movieList;
		}
		return null;
	}
}
