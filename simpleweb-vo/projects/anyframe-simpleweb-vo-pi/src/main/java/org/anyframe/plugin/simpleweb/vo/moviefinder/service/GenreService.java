package org.anyframe.plugin.simpleweb.vo.moviefinder.service;

import java.util.List;

import org.anyframe.plugin.simpleweb.vo.domain.Genre;

public interface GenreService {

	List<Genre> getList() throws Exception;
	
}
