package org.anyframe.sample.di.qualifier.moviefinder.service.impl;

import javax.inject.Named;

import org.anyframe.sample.di.qualifier.DaoQualifier;
import org.anyframe.sample.di.qualifier.moviefinder.dao.MovieDao;
import org.anyframe.sample.di.qualifier.moviefinder.domain.Movie;

@Named
@DaoQualifier(type = "hibernate")
public class MovieDaoHibernateImpl implements MovieDao{

	public Movie get(String movieId) throws Exception {
		System.out.println("call get() in MovieDaoHibernateImpl");
		Movie movie = new Movie();
		movie.setTitle("Alice in Wonderland");
		movie.setDirector("Tim Burton");

		return movie;
	}

}
