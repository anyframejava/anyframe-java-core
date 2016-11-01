package anyframe.sample.di.qualifier.moviefinder.dao;

import anyframe.sample.domain.Movie;

public interface MovieDao {
	Movie get(String movieId) throws Exception;
}
