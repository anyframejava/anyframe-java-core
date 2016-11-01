package org.anyframe.plugin.simpleweb.vo.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.simpleweb.vo.moviefinder.service.MovieFinder;
import org.anyframe.plugin.simpleweb.vo.moviefinder.service.MovieSearchVO;
import org.springframework.stereotype.Service;

@Service("simplewebVoMovieFinder")
public class MovieFinderImpl implements MovieFinder {

	@Inject
	@Named("simplewebVoMovieDao")
	private MovieDao movieDao;

	public Page getPagingList(MovieSearchVO search) throws Exception {
		return this.movieDao.getPagingList(search);
	}

}
