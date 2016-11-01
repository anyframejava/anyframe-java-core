package org.anyframe.sample.di.provider.moviefinder.service;

import java.util.List;

import org.anyframe.sample.di.provider.moviefinder.domain.Movie;

public interface MovieFinder {
	List<Movie> getPagingList(Movie movie, int pageIndex) throws Exception;
}
