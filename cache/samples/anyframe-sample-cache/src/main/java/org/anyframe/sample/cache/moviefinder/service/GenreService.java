package org.anyframe.sample.cache.moviefinder.service;

import java.util.Map;

import org.anyframe.sample.domain.Genre;

public interface GenreService {
	
	void create(Genre genre) throws Exception;

	void remove(String genreId) throws Exception;
	
	Map getList() throws Exception;
}
