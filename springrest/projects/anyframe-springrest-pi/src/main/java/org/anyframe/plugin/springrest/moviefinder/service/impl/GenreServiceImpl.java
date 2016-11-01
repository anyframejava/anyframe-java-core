package org.anyframe.plugin.springrest.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.springrest.domain.Genre;
import org.anyframe.plugin.springrest.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;

@Service("springrestGenreService")
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("springrestGenreDao")
	private GenreDao genreDao;

	public List<Genre> getList() throws Exception {
		return genreDao.getList();
	}

}
