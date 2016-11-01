package org.anyframe.sample.logging.moviefinder.service.impl;

import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.logging.moviefinder.domain.Movie;
import org.anyframe.sample.logging.moviefinder.service.MovieService;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

@Service("movieService")
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("movieDao")
	private MovieDao movieDao;

	@Inject
	private MessageSource messageSource;

	public void create(Movie movie) throws Exception {

		MovieService.LOGGER.debug("DEBUG - call create");
		MovieService.LOGGER.warn("WARNING - call create");
		MovieService.LOGGER.error("ERROR - call create");

		movieDao.create(movie);
	}

	public Movie get() throws Exception {

		MovieService.LOGGER.debug("DEBUG - call get");
		MovieService.LOGGER.warn("WARNING - call get");
		MovieService.LOGGER.error("ERROR - call get");

		return movieDao.get();
	}

	public void greet() {
		MovieService.LOGGER.debug(messageSource.getMessage(
				"sample.default.msg", new String[] {}, Locale.getDefault()));
		MovieService.LOGGER.debug(messageSource.getMessage("sample.msg",
				new String[] { "Anyframe" }, Locale.getDefault()));
	}

}