package org.anyframe.plugin.webflow.moviefinder.service.impl;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.webflow.domain.Movie;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie crud functionality.
 * 
 * @author Jonghoon Kim
 */
@Repository("webflowMovieDao")
public class MovieDao extends QueryServiceDaoSupport {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Movie movie) {
		movie.setMovieId("MV-" + System.currentTimeMillis());
		super.create("createWebflowMovie", movie);
	}

	public void remove(String movieId) {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		super.remove("removeWebflowMovie", movie);
	}

	public void update(Movie movie) {
		update("updateWebflowMovie", movie);
	}

	public Movie get(String movieId) {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return super.findByPk("findWebflowMovieByPk", movie);
	}

	public Page getPagingList(Movie movie, int pageIndex) {
		return super.findListWithPaging("findWebflowMovieList", movie,
				pageIndex, pageSize, pageUnit);
	}

}
