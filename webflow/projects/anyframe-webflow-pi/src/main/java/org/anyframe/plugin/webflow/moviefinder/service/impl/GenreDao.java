package org.anyframe.plugin.webflow.moviefinder.service.impl;
import java.util.List;

import javax.inject.Inject;

import org.anyframe.plugin.webflow.domain.Genre;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.stereotype.Repository;

/**
 * This GenreDao class is a DAO class to provide genre list functionality.
 * 
 * @author Jonghoon Kim
 */
@Repository("webflowGenreDao")
public class GenreDao extends AbstractDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	@SuppressWarnings("unchecked")
	public List<Genre> getList() throws Exception {
		return (List<Genre>) this.findList("WebflowGenre", new Object[] {});
	}

}
