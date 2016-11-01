package org.anyframe.sample.cache.moviefinder.service.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.cache.CacheService;
import org.anyframe.sample.cache.moviefinder.service.GenreService;
import org.anyframe.sample.domain.Genre;
import org.springframework.stereotype.Service;

@Service("genreService")
public class GenreServiceImpl implements GenreService {

	@Inject
	private CacheService cacheService;

	@Inject
	@Named("genreDao")
	private GenreDao genreDao;

	@PostConstruct
	public void initialize() throws Exception {
		Collection list = this.genreDao.getList();
		Iterator itr = list.iterator();

		Map genreList = new HashMap();
		while (itr.hasNext()) {
			Genre genre = (Genre) itr.next();
			genreList.put(genre.getGenreId(), genre);
		}

		cacheService.putInCache("genreList", genreList);
	}

	public void create(Genre genre) throws Exception {
		genreDao.create(genre);

		Map genreList = (HashMap) cacheService.getFromCache("genreList");
		genreList.put(genre.getGenreId(), genre);
		cacheService.putInCache("genreList", genreList);
		System.out
				.println("Put a new genre into 'genreList' cache successfully.");
	}

	public void remove(String genreId) throws Exception {
		genreDao.remove(genreId);
 
		Map genreList = (HashMap) cacheService.getFromCache("genreList");
		genreList.remove(genreId);
		cacheService.putInCache("genreList", genreList);
		System.out
				.println("Remove a new genre from 'genreList' cache successfully.");

	}

	public Map getList() throws Exception {   
		System.out
				.println("Try to get genres from 'genreList' cache instead of DB.");
		return (Map)cacheService.getFromCache("genreList");
	}

}
