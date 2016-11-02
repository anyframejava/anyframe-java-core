package org.anyframe.plugin.mybatis.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mybatis.domain.Movie2DVO;
import org.anyframe.plugin.mybatis.moviefinder.service.MovieService2;
import org.springframework.stereotype.Service;

@Service("mybatisMovieService2")
public class MovieServiceImpl2 implements MovieService2 {

	@Inject
	@Named("movieDao2")
	private MovieDao2 movieDao;

	@Override
	public int insertMovie(Movie2DVO inputVO) throws Exception {
		return movieDao.insertMovie(inputVO);
	}

	@Override
	public int updateMovie(Movie2DVO inputVO) throws Exception {
		return movieDao.updateMovie(inputVO);
	}

	@Override
	public int deleteMovie(Movie2DVO inputVO) throws Exception {
		return movieDao.deleteMovie(inputVO);
	}

	@Override
	public Movie2DVO selectOneMovie(Movie2DVO inputVO) throws Exception {
		return movieDao.selectOneMovie(inputVO);
	}

	@Override
	public List<Movie2DVO> listMovie(Movie2DVO inputVO) throws Exception {
		return movieDao.listMovie(inputVO);
	}

	@Override
	public Page pagingMovie(Movie2DVO inputVO, int pageIndex, int rowCount)
			throws Exception {
		return movieDao.pagingMovie(inputVO, pageIndex, rowCount);
	}

	@Override
	public Movie2DVO selectCountMovie(Movie2DVO inputVO) throws Exception {
		return movieDao.selectCountMovie(inputVO);
	}

}
