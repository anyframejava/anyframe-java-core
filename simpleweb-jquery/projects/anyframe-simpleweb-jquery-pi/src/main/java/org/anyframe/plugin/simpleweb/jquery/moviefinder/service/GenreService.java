package org.anyframe.plugin.simpleweb.jquery.moviefinder.service;

import java.util.List;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.simpleweb.jquery.domain.Genre;

public interface GenreService {
	List<Genre> getDropDownGenreList() throws Exception;
	
	List<Genre> getGenreList(SearchVO searchVO) throws Exception;
	
	List getGenreNameList(String title)throws Exception;
	
	Genre getGenre(String id) throws Exception;
}
