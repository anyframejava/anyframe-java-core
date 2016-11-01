package org.anyframe.plugin.simpleweb.vo.moviefinder.service.impl;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.simpleweb.vo.domain.Movie;
import org.anyframe.plugin.simpleweb.vo.moviefinder.service.MovieSearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("simplewebVoMovieDao")
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
		create("VoMovie", movie);
	}

	public void remove(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		remove("VoMovie", movie);
	}

	public void update(Movie movie) throws Exception {
		update("VoMovie", movie);
	}

	public Movie get(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return (Movie) findByPk("VoMovie", movie);
	}

	public Page getPagingList(MovieSearchVO search) throws Exception {
		return this.findListWithPaging("VoMovie", search, search.getPageIndex(), pageSize, pageUnit);
	}
	
}
