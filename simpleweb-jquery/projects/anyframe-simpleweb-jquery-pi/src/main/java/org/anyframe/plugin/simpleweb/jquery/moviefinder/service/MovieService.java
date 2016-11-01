package org.anyframe.plugin.simpleweb.jquery.moviefinder.service;

import java.util.List;

import org.anyframe.plugin.simpleweb.jquery.domain.Movie;

public interface MovieService {

	Movie get(String id) throws Exception;

	List<String> getMovieTitleList(String title) throws Exception;

	void create(Movie movie) throws Exception;

	void update(Movie movie) throws Exception;

	void remove(String id) throws Exception;

	void removeMovieList(String[] ids) throws Exception;

}
