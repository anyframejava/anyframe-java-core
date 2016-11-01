package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.simpleweb.map.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("simplewebMapGenreService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("simplewebMapGenreDao")
	private GenreDao genreDao;

	public Map getList() throws Exception {
		Map genreMap = new HashMap();
		List<Map> genreList = genreDao.getList();
		Iterator itr = genreList.iterator();
		while(itr.hasNext())
		{
			Map genre = (Map)itr.next();
			genreMap.put(genre.get("genreId"), genre.get("name"));
		}
		return genreMap;
	}	
}
