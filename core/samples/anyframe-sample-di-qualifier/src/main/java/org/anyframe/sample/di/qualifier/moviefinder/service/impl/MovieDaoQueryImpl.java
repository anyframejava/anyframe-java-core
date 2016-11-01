package org.anyframe.sample.di.qualifier.moviefinder.service.impl;

import javax.inject.Named;

import org.anyframe.sample.di.qualifier.DaoQualifier;
import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;

@Named
@DaoQualifier
public class MovieDaoQueryImpl implements MovieDao {

	public Movie get(String movieId) throws Exception {
		System.out.println("call get() in MovieDaoQueryImpl");
		Movie movie = new Movie();
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");

		return movie;
	}

}
