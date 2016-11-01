package org.anyframe.sample.properties.moviefinder.service;

import org.anyframe.pagination.Page;
import org.anyframe.sample.properties.domain.Movie;

/**
 * This MovieFinder class is an Interface class to provide movie list
 * functionality.
 * 
 * @author Sooyeon Park
 */
public interface MovieFinder {
	Page getPagingList(Movie movie) throws Exception;
}
