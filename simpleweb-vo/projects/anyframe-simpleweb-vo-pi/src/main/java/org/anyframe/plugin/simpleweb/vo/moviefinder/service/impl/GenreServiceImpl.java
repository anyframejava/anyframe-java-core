package org.anyframe.plugin.simpleweb.vo.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.simpleweb.vo.domain.Genre;
import org.anyframe.plugin.simpleweb.vo.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("simplewebVoGenreService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("simplewebVoGenreDao")
	private GenreDao genreDao;

	public List<Genre> getList() throws Exception {
		return genreDao.getList();
	}
}
