package org.anyframe.sample.javaconfig.moviefinder.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.anyframe.sample.javaconfig.moviefinder.domain.Movie;

public class MovieDao {

	public MovieDao() {
		System.out.println("Calling constructor of MovieDao");
	}
	
	public List<Movie> getPagingList(Movie movie, int pageIndex) throws Exception {
		Movie result = new Movie();
		
		result.setMovieId("MV-99999");
		result.setTitle("Alice in Wonderland");
		result.setDirector("Tim Burton");
		
		List<Movie> resultList = new ArrayList<Movie>();
		resultList.add(result);
		return resultList;
	}

}
