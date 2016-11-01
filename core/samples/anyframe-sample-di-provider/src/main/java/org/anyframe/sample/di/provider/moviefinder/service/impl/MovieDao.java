package org.anyframe.sample.di.provider.moviefinder.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;

import org.anyframe.sample.di.provider.moviefinder.domain.Movie;
import org.springframework.context.annotation.Scope;

@Named
@Scope("prototype")
public class MovieDao {

	public Movie get(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");

		return movie;
	}

	public List<Movie> getPagingList(Movie movie, int pageIndex)
			throws Exception {
		Movie result = new Movie();
		result.setTitle("Alice in Wonderland");
		result.setDirector("Tim Burton");

		ArrayList<Movie> results = new ArrayList<Movie>();
		results.add(result);
		return results;
	}

}
