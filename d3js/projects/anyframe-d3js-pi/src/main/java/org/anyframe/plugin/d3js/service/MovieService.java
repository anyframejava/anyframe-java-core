package org.anyframe.plugin.d3js.service;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.d3js.domain.Movie;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 14. 7. 7
 * Time: 오후 2:17
 * Movie Service Interface Source.
 */
public interface MovieService {

    Movie get(String movieId) throws Exception;

    void create(Movie movie) throws Exception;

    void update(Movie movie) throws Exception;

    void remove(String movieId) throws Exception;

    Page getPagingList(Movie movie, int pageIndex) throws Exception;
}
