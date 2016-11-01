package org.anyframe.hibernate.sample.service.movie.impl;

import java.util.List;

import org.anyframe.hibernate.sample.model.bidirection.Category;
import org.anyframe.hibernate.sample.model.bidirection.Country;
import org.anyframe.hibernate.sample.model.bidirection.Movie;
import org.anyframe.hibernate.sample.service.movie.MovieService;


public class MovieServiceImpl implements MovieService {

	private MovieDao movieDao;

	public void setMovieDao(MovieDao movieDao) {
		this.movieDao = movieDao;
	}

	public void createMovie(Movie movie) throws Exception {
		this.movieDao.createMovie(movie);
	}

	public void createMovieList(List movieList) throws Exception {
		this.movieDao.createMovieList(movieList);
	}

	public Movie findMovie(String movieId) throws Exception {
		return this.movieDao.findMovie(movieId);
	}

	public List findMovieList(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieList(conditionType, condition);
	}

	public List findMovieListWithSQL(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieListWithSQL(conditionType, condition);
	}

	public List findMovieListWithoutReturn(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieListWithoutReturn(conditionType,
				condition);
	}

	public List findMovieListWithScalar(int conditionType, String condition)
			throws Exception {
		return this.movieDao.findMovieListWithScalar(conditionType, condition);
	}

	public List findMovieListByCountry(String countryCode) throws Exception {
		return this.movieDao.findMovieListByCountry(countryCode);
	}

	public List findMovieListAll() throws Exception {
		return this.findMovieListAll();
	}

	public void removeMovie(Movie movie) throws Exception {
		this.movieDao.removeMovie(movie);
	}

	public void updateMovie(Movie movie) throws Exception {
		this.movieDao.updateMovie(movie);
	}

	public void createCategory(Category category) throws Exception {
		this.movieDao.createCategory(category);
	}

	public void createCountry(Country country) throws Exception {
		this.movieDao.createCountry(country);
	}
}
