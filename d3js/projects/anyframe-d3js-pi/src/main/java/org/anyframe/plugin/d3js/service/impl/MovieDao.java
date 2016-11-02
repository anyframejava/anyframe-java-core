package org.anyframe.plugin.d3js.service.impl;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.d3js.domain.Movie;
import org.anyframe.query.QueryService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.anyframe.query.dao.QueryServiceDaoSupport;

import javax.inject.Inject;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 14. 7. 7
 * Time: 오후 2:20
 * MovieDao Class
 */

@Repository("d3jsMovieDao")
public class MovieDao extends QueryServiceDaoSupport {

    @Value("#{contextProperties['pageSize'] ?: 10}")
    int pageSize;

    @Value("#{contextProperties['pageUnit'] ?: 10}")
    int pageUnit;

    @Inject
    public void setQueryService(QueryService queryService) {
        super.setQueryService(queryService);
    }

    public void create(Movie movie) {
        movie.setMovieId("MV-" + System.currentTimeMillis());
        super.create("createD3jsMovie", movie);
    }

    public void remove(String movieId) {
        Movie movie = new Movie();
        movie.setMovieId(movieId);
        super.remove("removeD3jsMovie", movie);
    }

    public void update(Movie movie) {
        super.update("updateD3jsMovie", movie);
    }

    public Movie get(String movieId) {
        Movie movie = new Movie();
        movie.setMovieId(movieId);
        return super.findByPk("findD3jsMovieByPk", movie);
    }

    //TODO:  pageSize configurable 하게 수정할 것
    public Page getPagingList(Movie movie, int pageIndex) {
        return super.findListWithPaging("findD3jsMovieList", movie, pageIndex, 1000,
                pageUnit);
    }

}
