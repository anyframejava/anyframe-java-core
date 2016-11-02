package org.anyframe.plugin.d3js.service.impl;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.d3js.domain.Movie;
import org.anyframe.plugin.d3js.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.inject.Named;

@Service("d3jsMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl implements MovieService {

    @Inject
    @Named("d3jsMovieDao")
    private MovieDao movieDao;

    public void create(Movie movie) throws Exception {
        movieDao.create(movie);
    }

    public void remove(String movieId) throws Exception {
        movieDao.remove(movieId);
    }

    public void update(Movie movie) throws Exception {
        movieDao.update(movie);
    }

    public Movie get(String movieId) throws Exception {
        return movieDao.get(movieId);
    }

    public Page getPagingList(Movie movie, int pageIndex) throws Exception {
        return movieDao.getPagingList(movie, pageIndex);
    }

}
