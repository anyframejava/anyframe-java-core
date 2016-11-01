package org.anyframe.sample.di.qualifier.moviefinder.dao;

import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;

public interface MovieDao {
	Movie get(String movieId) throws Exception;
}
