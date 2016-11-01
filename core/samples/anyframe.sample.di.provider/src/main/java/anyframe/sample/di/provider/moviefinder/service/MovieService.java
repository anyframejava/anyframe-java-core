package anyframe.sample.di.provider.moviefinder.service;

import anyframe.sample.domain.Movie;

public interface MovieService {
	Movie get(String movieId) throws Exception;
}
