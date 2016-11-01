package org.anyframe.sample.properties.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.sample.properties.domain.Movie;
import org.anyframe.sample.properties.moviefinder.service.MovieFinder;
import org.springframework.stereotype.Service;

@Service("propertiesMovieFinder")
public class MovieFinderImpl implements MovieFinder {

	@Inject
	@Named("propertiesMovieDao")
	private MovieDao movieDao;

	public Page getPagingList(Movie movie) throws Exception {
		return this.movieDao.getPagingList(movie);
	}

}

