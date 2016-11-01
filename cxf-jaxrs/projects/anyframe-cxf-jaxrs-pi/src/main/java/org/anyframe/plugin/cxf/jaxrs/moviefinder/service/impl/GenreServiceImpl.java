package org.anyframe.plugin.cxf.jaxrs.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.cxf.jaxrs.domain.Genre;
import org.anyframe.plugin.cxf.jaxrs.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;

@Service("cxfJaxRsGenreService")
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("cxfJaxRsGenreDao")
	private GenreDao genreDao;

	public List<Genre> getList() throws Exception {
		return genreDao.getList();
	}

}
