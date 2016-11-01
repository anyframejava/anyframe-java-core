package org.anyframe.plugin.simpleweb.jquery.moviefinder.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.simpleweb.jquery.domain.Genre;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.stereotype.Repository;

@Repository("simplewebJqueryGenreDao")
public class GenreDao extends AbstractDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public List<Genre> getDropDownGenreList() throws Exception {
		return (List<Genre>) super.getQueryService().find(
				"findDropDownJqueryGenreList", new Object[] {});
	}

	public List<Genre> getGenreList(SearchVO searchVO) throws Exception {
		return (List<Genre>) this.findList("JqueryGenre", searchVO);
	}

	public List getGenreNameList(String prefix) throws Exception {

		List resultList = (ArrayList) this.getQueryService().find(
				"findGenreName",
				new Object[] { new Object[] { "prefix", prefix } });

		return resultList;
	}
	
	public Genre getGenre(String genreId) throws Exception {
		Genre genre = new Genre();
		genre.setGenreId(genreId);
		return (Genre) findByPk("JqueryGenre", genre);
	}

}
