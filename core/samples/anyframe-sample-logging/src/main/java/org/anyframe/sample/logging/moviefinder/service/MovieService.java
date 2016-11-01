package org.anyframe.sample.logging.moviefinder.service;

import org.anyframe.sample.logging.moviefinder.domain.Movie;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public interface MovieService{
    Log LOGGER = LogFactory.getLog(MovieService.class);
    
	void create(Movie movie) throws Exception;
	Movie get() throws Exception;
	void greet();
}