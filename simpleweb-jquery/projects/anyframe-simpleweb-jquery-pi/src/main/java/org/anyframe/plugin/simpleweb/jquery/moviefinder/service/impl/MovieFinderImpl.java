package org.anyframe.plugin.simpleweb.jquery.moviefinder.service.impl;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.simpleweb.jquery.domain.Movie;
import org.anyframe.plugin.simpleweb.jquery.moviefinder.service.MovieFinder;
import org.anyframe.plugin.simpleweb.jquery.moviefinder.service.MovieSearchVO;
import org.springframework.stereotype.Service;

@Service("simplewebJqueryMovieFinder")
public class MovieFinderImpl implements MovieFinder {

	@Inject
	@Named("simplewebJqueryMovieDao")
	private MovieDao movieDao;

	public Page getPagingList(MovieSearchVO search) throws Exception {
		return this.movieDao.getPagingList(search);
	}

	public Collection<Movie> getListByCategory(MovieSearchVO search) throws Exception {
		// TODO Auto-generated method stub
		return this.movieDao.getListByCategory(search);
	}
	
}
