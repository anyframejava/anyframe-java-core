package anyframe.sample.di.provider.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Provider;

import anyframe.sample.di.provider.moviefinder.service.MovieService;
import anyframe.sample.domain.Movie;

@Named
public class MovieServiceImpl implements MovieService {
	@Inject
	private Provider<MovieDao> movieDaoFactory;

	public Movie get(String movieId) throws Exception {
		// get movieDao instance calling get()
		MovieDao movieDao = movieDaoFactory.get();
		System.out.println("#1 MovieDao instance : " + movieDao);

		movieDao = movieDaoFactory.get();
		System.out.println("#2 MovieDao instance : " + movieDao);

		return movieDaoFactory.get().get(movieId);
	}
}
