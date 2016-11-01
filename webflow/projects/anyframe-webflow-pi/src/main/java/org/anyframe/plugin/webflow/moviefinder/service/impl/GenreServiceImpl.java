package org.anyframe.plugin.webflow.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.webflow.domain.Genre;
import org.anyframe.plugin.webflow.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;

/**
 * This GenreServiceImpl class is an Implementation class to provide genre list
 * functionality.
 * 
 * @author Jonghoon Kim
 */
@Service("webflowGenreService")
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("webflowGenreDao")
	private GenreDao genreDao;

	public List<Genre> getList() throws Exception {
		return genreDao.getList();
	}

}
