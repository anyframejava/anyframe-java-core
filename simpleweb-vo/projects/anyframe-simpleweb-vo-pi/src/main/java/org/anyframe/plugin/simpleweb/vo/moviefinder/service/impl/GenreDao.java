package org.anyframe.plugin.simpleweb.vo.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.plugin.simpleweb.vo.domain.Genre;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

@Repository("simplewebVoGenreDao")
public class GenreDao extends QueryServiceDaoSupport {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	@SuppressWarnings("unchecked")
	public List<Genre> getList() throws Exception {
		return (List<Genre>) this.findList("findVoGenreList", new Object[] {});
	}	
}
