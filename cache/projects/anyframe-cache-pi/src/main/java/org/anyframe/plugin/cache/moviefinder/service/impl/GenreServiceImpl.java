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
package org.anyframe.plugin.cache.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.cache.domain.Genre;
import org.anyframe.plugin.cache.moviefinder.service.GenreService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This GenreServiceImpl class is an Implementation class to provide genre CRUD
 * functionality.
 * 
 * @author Sooyeon Park
 */
@Service("cacheGenreService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("cacheGenreDao")
	private GenreDao genreDao;

	/*
	 * Declarative annotation-based caching example
	 * 
	 * @Cacheable, @CacheEvict, @CachePut
	 */
	@CacheEvict(value = "genreList", allEntries = true)
	public void create(Genre genre) throws Exception {
		genre.setGenreId("GR-" + System.currentTimeMillis());
		GenreService.LOGGER.info("always execute create method - genreId = {}",
				genre.getGenreId());
		genreDao.create(genre);
	}

	@Cacheable(value = "genre")
	public Genre get(String genreId) throws Exception {
		GenreService.LOGGER.info("execute get method - genreId = {}", genreId);
		Genre genre = genreDao.get(genreId);
		return genre;
	}
	//Velocity-Support-cacheevict-START
	@Caching(evict = { @CacheEvict(value = "genre", key = "#genre.genreId"),
	//Velocity-Support-cacheevict-END		
			@CacheEvict(value = "genreList", allEntries = true) })
	public void update(Genre genre) throws Exception {
		GenreService.LOGGER.info("always execute update method - genreId = {}",
				genre.getGenreId());
		genreDao.update(genre);
	}

	//Velocity-Support-cacheput-START
	@CachePut(value = "genre", key = "#genre.genreId")
	//Velocity-Support-cacheput-END
	public Genre updateAndGet(Genre genre) throws Exception {
		GenreService.LOGGER.info("always execute update method - genreId = {}",
				genre.getGenreId());
		genreDao.update(genre);
		return genre;
	}

	@Caching(evict = { @CacheEvict("genre"),
			@CacheEvict(value = "genreList", allEntries = true) })
	public void remove(String genreId) throws Exception {
		GenreService.LOGGER.info("always execute remove method - genreId = {}",
				genreId);
		genreDao.remove(genreId);
	}

	@Cacheable(value = "genreList")
	public List<Genre> getList() throws Exception {
		GenreService.LOGGER.info("execute getList method");
		return genreDao.getList();
	}
}
