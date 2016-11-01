package org.anyframe.sample.di.provider.moviefinder.service;

import org.anyframe.sample.di.provider.moviefinder.domain.Movie;

public interface MovieService {
	Movie get(String movieId) throws Exception;
}
