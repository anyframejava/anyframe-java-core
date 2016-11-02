package org.anyframe.plugin.webflow.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.webflow.domain.Movie;
import org.anyframe.plugin.webflow.moviefinder.service.MovieFinder;
import org.springframework.stereotype.Service;

/**
 * This MovieFinderImpl class is an Implementation class to provide movie list
 * functionality.
 * 
 * @author Jonghoon Kim
 */
@Service("webflowMovieFinder")
public class MovieFinderImpl implements MovieFinder {

	@Inject
	@Named("webflowMovieDao")
	private MovieDao movieDao;

	public Page getPagingList(Movie movie, int pageIndex) throws Exception {
		return movieDao.getPagingList(movie, pageIndex);
	}
}
