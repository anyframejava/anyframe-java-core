package anyframe.sample.di.qualifier.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import anyframe.sample.di.qualifier.DaoQualifier;
import anyframe.sample.di.qualifier.moviefinder.dao.MovieDao;
import anyframe.sample.di.qualifier.moviefinder.service.MovieService;
import anyframe.sample.domain.Movie;

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
