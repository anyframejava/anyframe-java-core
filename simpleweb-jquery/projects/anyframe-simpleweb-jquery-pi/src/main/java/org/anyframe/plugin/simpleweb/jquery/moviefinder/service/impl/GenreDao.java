package org.anyframe.plugin.simpleweb.jquery.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.simpleweb.jquery.domain.Genre;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

@Repository("simplewebJqueryGenreDao")
public class GenreDao extends QueryServiceDaoSupport {

	@Inject
	@Named("queryService")
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	@SuppressWarnings("unchecked")
	public List<Genre> getDropDownGenreList() throws Exception {
		return (List<Genre>) super.getQueryService().find("findDropDownJqueryGenreList", new Object[] {});
	}

	@SuppressWarnings("unchecked")
	public List<Genre> getGenreList(SearchVO searchVO) throws Exception {
		return (List<Genre>) this.findList("findJqueryGenreList", searchVO);
	}

	@SuppressWarnings("unchecked")
	public List<String> getGenreNameList(String prefix) throws Exception {
		return (List<String>) this.getQueryService().find("findGenreName", new Object[] { new Object[] { "prefix", prefix } });
	}

	public Genre getGenre(String genreId) throws Exception {
		Genre genre = new Genre();
		genre.setGenreId(genreId);
		return (Genre) findByPk("findJqueryGenreByPk", genre);
	}

}
