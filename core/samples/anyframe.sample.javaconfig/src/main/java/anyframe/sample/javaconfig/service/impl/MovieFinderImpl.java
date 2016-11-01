package anyframe.sample.javaconfig.service.impl;

import java.util.List;

import anyframe.sample.domain.Movie;
import anyframe.sample.javaconfig.service.MovieFinder;

public class MovieFinderImpl implements MovieFinder {
	private MovieDao movieDao;

	public void initialize() {
		System.out.println("Initializing MovieFinderImpl");
	}

	public void destroy() {
		System.out.println("Destroying MovieFinderImpl");
	}

	public MovieFinderImpl(MovieDao movieDao) {
		System.out.println("Calling constructor of MovieFinderImpl");
		this.movieDao = movieDao;
	}

	public List<Movie> getPagingList(Movie movie, int pageIndex)
			throws Exception {
		return movieDao.getPagingList(movie, pageIndex);
	}

}
