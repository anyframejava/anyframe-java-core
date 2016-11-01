package org.anyframe.sample.cache.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.anyframe.sample.domain.Genre;
import org.springframework.stereotype.Repository;

@Repository("genreDao")
public class GenreDao extends AbstractDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	} 
	
	public void create(Genre genre)throws Exception{
		create("Genre", genre);
	}
	
	public void remove(String genreId) throws Exception{
		Genre genre = new Genre();
		genre.setGenreId(genreId);
		remove("Genre", genre);
	}

	@SuppressWarnings("unchecked")
	public List<Genre> getList() throws Exception {
		return (List<Genre>) this.findList("Genre", new Object[] {});
	}

}
