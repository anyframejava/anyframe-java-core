package anyframe.sample.di.qualifier.moviefinder.service;

import anyframe.sample.domain.Movie;

public interface MovieService {
	Movie getByHibernate(String movieId) throws Exception;

	Movie getByQuery(String movieId) throws Exception;
}
