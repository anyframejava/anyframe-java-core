package org.anyframe.sample.di.qualifier.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.di.qualifier.DaoQualifier;
import org.anyframe.sample.di.qualifier.moviefinder.dao.MovieDao;
import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;
import org.anyframe.sample.di.qualifier.moviefinder.service.MovieService;

@Named
public class MovieServiceImpl implements MovieService {

	@Inject
	@DaoQualifier(type = "hibernate")
	private MovieDao hibernateMovieDao;

	@Inject
	@DaoQualifier
	private MovieDao queryMovieDao;

	public Movie getByHibernate(String movieId) throws Exception {
		return hibernateMovieDao.get(movieId);
	}

	public Movie getByQuery(String movieId) throws Exception {
		return queryMovieDao.get(movieId);
	}

}
