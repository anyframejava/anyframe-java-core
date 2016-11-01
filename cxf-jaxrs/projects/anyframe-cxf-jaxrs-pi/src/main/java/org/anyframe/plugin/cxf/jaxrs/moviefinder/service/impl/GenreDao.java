package org.anyframe.plugin.cxf.jaxrs.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.plugin.cxf.jaxrs.domain.Genre;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.stereotype.Repository;

@Repository("cxfJaxRsGenreDao")
public class GenreDao extends AbstractDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	@SuppressWarnings("unchecked")
	public List<Genre> getList() throws Exception {
		return (List<Genre>) this.findList("CxfJaxRsGenre", new Object[] {});
	}

}
