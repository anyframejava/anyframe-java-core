/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.oscache.moviefinder.service.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.oscache.OSCacheService;
import org.anyframe.plugin.oscache.domain.Genre;
import org.anyframe.plugin.oscache.moviefinder.service.GenreService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This GenreServiceImpl class is an Implementation class to provide genre list
 * functionality.
 * 
 * @author Sujeong Lee
 */
@Service("osCacheGenreService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("osCacheGenreDao")
	private GenreDao genreDao;

	@Inject
	@Named("cacheService")
	OSCacheService cacheService;

	@PostConstruct
	public void getList() throws Exception {
		Collection<Genre> list = genreDao.getList();

		Iterator<Genre> itr = list.iterator();

		Map<String, Genre> genreList = new HashMap<String, Genre>();
		while (itr.hasNext()) {
			Genre genre = (Genre) itr.next();
			genreList.put(genre.getGenreId(), genre);
		}

		cacheService.putInCache("genreList", genreList);
	}

	public void create(Genre genre) throws Exception {
		genre.setGenreId("GR-" + System.currentTimeMillis());
		genreDao.create(genre);
		putInCache(genre);
	}

	@SuppressWarnings("unchecked")
	public void remove(String genreId) throws Exception {
		genreDao.remove(genreId);

		Map<String, Genre> genreList = (HashMap<String, Genre>) cacheService
				.getFromCache("genreList");
		genreList.remove(genreId);
		cacheService.putInCache("genreList", genreList);
	}

	public void update(Genre genre) throws Exception {
		genreDao.update(genre);
		putInCache(genre);
	}

	@SuppressWarnings("unchecked")
	private void putInCache(Genre genre) throws Exception {
		Map<String, Genre> genreList = (HashMap<String, Genre>) cacheService
				.getFromCache("genreList");
		genreList.put(genre.getGenreId(), genre);
		cacheService.putInCache("genreList", genreList);
	}
}
