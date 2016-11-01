package org.anyframe.plugin.simpleweb.jquery.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.simpleweb.jquery.domain.Genre;
import org.anyframe.plugin.simpleweb.jquery.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("simplewebJqueryGenreService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("simplewebJqueryGenreDao")
	private GenreDao genreDao;

	public List<Genre> getDropDownGenreList() throws Exception {
		return genreDao.getDropDownGenreList();
	}

	public List<Genre> getGenreList(SearchVO searchVO) throws Exception {
		// TODO Auto-generated method stub
		return genreDao.getGenreList(searchVO);
	}

	public List<String> getGenreNameList(String title) throws Exception {
		return genreDao.getGenreNameList(title);
	}
	
	public Genre getGenre(String id) throws Exception {
		return genreDao.getGenre(id);
	}


}
