package org.anyframe.plugin.simpleweb.jquery.moviefinder.service.impl;

import java.util.Collection;
import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.simpleweb.jquery.domain.Movie;
import org.anyframe.plugin.simpleweb.jquery.moviefinder.service.MovieSearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("simplewebJqueryMovieDao")
public class MovieDao extends QueryServiceDaoSupport {

	@Value("#{contextProperties['pageSize'] ?: 5}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 5}")
	int pageUnit;

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Movie movie) throws Exception {
		create("createJqueryMovie", movie);
	}

	public void remove(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		remove("removeJqueryMovie", movie);
	}

	public void update(Movie movie) throws Exception {
		update("updateJqueryMovie", movie);
	}

	public Movie get(String movieId) throws Exception {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return (Movie) findByPk("findJqueryMovieByPk", movie);
	}

	public Page getPagingList(MovieSearchVO search) throws Exception {
		return this.findListWithPaging("findJqueryMovieList", search, search.getPageIndex(), pageSize, pageUnit);
	}

	@SuppressWarnings("unchecked")
	public List<String> getMovieTitleList(String prefix) throws Exception {
		return (List<String>) this.getQueryService().find("findMovieTitle", new Object[] { new Object[] { "prefix", prefix } });
	}

	@SuppressWarnings("unchecked")
	public Collection<Movie> getListByCategory(MovieSearchVO search) throws Exception {
		return this.findList("findMovieByCategoryList", search);
	}
}
