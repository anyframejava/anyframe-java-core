package org.anyframe.plugin.simpleweb.jquery.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.idgen.IdGenService;
import org.anyframe.plugin.simpleweb.jquery.domain.Movie;
import org.anyframe.plugin.simpleweb.jquery.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("simplewebJqueryMovieService")
@Transactional(rollbackFor = { Exception.class })
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("idGenServiceJqueryMovie")
	IdGenService idGenService;

	@Inject
	@Named("simplewebJqueryMovieDao")
	private MovieDao movieDao;

	public void create(Movie movie) throws Exception {
		movie.setMovieId(idGenService.getNextStringId());
		movieDao.create(movie);
	}

	public void remove(String id) throws Exception {
		movieDao.remove(id);
	}

	public void update(Movie movie) throws Exception {
		movieDao.update(movie);
	}

	public Movie get(String id) throws Exception {
		return movieDao.get(id);
	}

	public List<String> getMovieTitleList(String title) throws Exception {
		return (List<String>)movieDao.getMovieTitleList(title);
	}

	public void removeMovieList(String[] ids) throws Exception {
		for (String id : ids)
			movieDao.remove(id);
	}
}
