package org.anyframe.plugin.simpleweb.jquery.moviefinder.service;

import java.util.Collection;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.simpleweb.jquery.domain.Movie;

public interface MovieFinder {
	
	Page getPagingList(MovieSearchVO search) throws Exception;
	
	Collection<Movie> getListByCategory(MovieSearchVO search) throws Exception;
}
