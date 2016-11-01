package org.anyframe.plugin.webflow.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.webflow.domain.Movie;
import org.anyframe.plugin.webflow.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie crud
 * functionality.
 * 
 * @author Jonghoon Kim
 */
@Service("webflowMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("webflowMovieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws Exception {
		movieDao.create(movie);
	}

	public void remove(String movieId) throws Exception {
		movieDao.remove(movieId);
	}

	public void update(Movie movie) throws Exception {
		movieDao.update(movie);
	}

	public Movie get(String movieId) throws Exception {
		return movieDao.get(movieId);
	}

}
