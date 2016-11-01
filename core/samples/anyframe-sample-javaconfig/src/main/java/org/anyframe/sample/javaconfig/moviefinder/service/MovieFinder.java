package org.anyframe.sample.javaconfig.moviefinder.service;

import java.util.List;

import org.anyframe.sample.javaconfig.moviefinder.domain.Movie;

public interface MovieFinder {
	List<Movie> getPagingList(Movie movie, int pageIndex) throws Exception;
}
