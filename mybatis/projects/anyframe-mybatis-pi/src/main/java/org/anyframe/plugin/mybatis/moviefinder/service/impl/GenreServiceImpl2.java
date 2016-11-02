package org.anyframe.plugin.mybatis.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.mybatis.domain.Genre2DVO;
import org.anyframe.plugin.mybatis.moviefinder.service.GenreService2;
import org.springframework.stereotype.Service;


@Service("mybatisGenreService2")
public class GenreServiceImpl2 implements GenreService2 {

	@Inject
	@Named("genreDao2")
	private GenreDao2 genreDao;
	
	@Override
	public int insertGenre(Genre2DVO inputVO) {
		return genreDao.insertGenre(inputVO);
	}

	@Override
	public int updateGenre(Genre2DVO inputVO) {
		return genreDao.updateGenre(inputVO);
	}

	@Override
	public int deleteGenre(Genre2DVO inputVO) {
		return genreDao.deleteGenre(inputVO);
	}

	@Override
	public Genre2DVO selectOneGenre(Genre2DVO inputVO) {
		return genreDao.selectOneGenre(inputVO);
	}

	@Override
	public List<Genre2DVO> listGenre(Genre2DVO inputVO) {
		return genreDao.listGenre(inputVO);
	}

	@Override
	public Genre2DVO selectCountGenre(Genre2DVO inputVO) {
		return genreDao.selectCountGenre(inputVO);
	}

	@Override
	public Page pagingGenre(Genre2DVO inputVO, int pageIndex, int rowCount) {
		return genreDao.pagingGenre(inputVO, pageIndex, rowCount);
	}

}
