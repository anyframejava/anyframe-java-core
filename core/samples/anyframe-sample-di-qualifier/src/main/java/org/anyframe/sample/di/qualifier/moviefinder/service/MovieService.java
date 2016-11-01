package org.anyframe.sample.di.qualifier.moviefinder.service;

import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;

public interface MovieService {
	Movie getByHibernate(String movieId) throws Exception;

	Movie getByQuery(String movieId) throws Exception;
}
