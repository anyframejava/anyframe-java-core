package org.anyframe.sample.logging.moviefinder.service.impl;

import org.anyframe.sample.logging.moviefinder.domain.Movie;
import org.springframework.stereotype.Repository;

@Repository("movieDao")
public class MovieDao{

	public void create(Movie movie) throws Exception {
		System.out.println("movieDao - call create");
	}

	public Movie get() throws Exception {
		System.out.println("movieDao - call get");
		return null;
	}
}
