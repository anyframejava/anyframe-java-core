package org.anyframe.hibernate.sample.service.movie.impl;

import java.util.List;

import org.anyframe.hibernate.sample.model.bidirection.Category;
import org.anyframe.hibernate.sample.model.bidirection.Country;
import org.anyframe.hibernate.sample.model.bidirection.Movie;


public interface MovieDao {
	List findMovieListAll() throws Exception;

	List findMovieList(int conditionType, String condition) throws Exception;

	List findMovieListWithSQL(int conditionType, String condition)
			throws Exception;

	List findMovieListWithoutReturn(int conditionType, String condition)
			throws Exception;

	List findMovieListWithScalar(int conditionType, String condition)
			throws Exception;

	List findMovieListByCountry(String countryCode) throws Exception;

	Movie findMovie(String movieId) throws Exception;

	void createMovie(Movie movie) throws Exception;

	void updateMovie(Movie movie) throws Exception;

	void removeMovie(Movie movie) throws Exception;

	void createCountry(Country movie) throws Exception;

	void createCategory(Category category) throws Exception;

	void createMovieList(List movieList) throws Exception;
}
