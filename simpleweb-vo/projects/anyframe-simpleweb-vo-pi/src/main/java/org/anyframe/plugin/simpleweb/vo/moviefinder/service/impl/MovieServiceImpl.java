package org.anyframe.plugin.simpleweb.vo.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.idgen.IdGenService;
import org.anyframe.plugin.simpleweb.vo.domain.Movie;
import org.anyframe.plugin.simpleweb.vo.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("simplewebVoMovieService")
@Transactional(rollbackFor = { Exception.class })
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("voIdGenServiceMovie")
	IdGenService idGenService;

	@Inject
	@Named("simplewebVoMovieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws Exception {
		movie.setMovieId(idGenService.getNextStringId());
		movieDao.create(movie);
	}

	public void remove(String movieId) throws Exception {
		movieDao.remove(movieId);
	}

	public void update(Movie movie) throws Exception {
		movieDao.update(movie);
	}

	public Movie get(String movieId) throws Exception {
		return movieDao.get(movieId);
	}
}
