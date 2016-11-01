package org.anyframe.plugin.webflow.moviefinder.service.impl;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.webflow.domain.Movie;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Jonghoon Kim
 */
@Repository("webflowMovieDao")
public class MovieDao extends AbstractDao {
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Movie movie) throws Exception {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		create("WebflowMovie", movie);
	}

	public void remove(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		remove("WebflowMovie", movie);
	}

	public void update(Movie movie) throws Exception {
		update("WebflowMovie", movie);
	}

	public Movie get(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return (Movie) findByPk("WebflowMovie", movie);
	}

	public Page getPagingList(Movie movie, int pageIndex) throws Exception {
		return this.findListWithPaging("WebflowMovie", movie, pageIndex, pageSize,
				pageUnit);
	}
}
