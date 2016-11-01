package org.anyframe.plugin.simpleweb.vo.moviefinder.service;

import org.anyframe.plugin.simpleweb.vo.domain.Movie;

public interface MovieService {

	Movie get(String movieId) throws Exception;

	void create(Movie movie) throws Exception;

	void update(Movie movie) throws Exception;

	void remove(String movieId) throws Exception;

}
