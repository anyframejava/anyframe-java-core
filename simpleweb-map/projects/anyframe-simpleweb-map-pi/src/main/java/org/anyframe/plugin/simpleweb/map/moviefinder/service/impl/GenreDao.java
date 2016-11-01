package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

@Repository("simplewebMapGenreDao")
public class GenreDao extends QueryServiceDaoSupport {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	@SuppressWarnings("unchecked")
	public List<Map> getList() throws Exception {
		return (List<Map>) this.findList("findMapGenreList", new Object[] {});
	}	
}
