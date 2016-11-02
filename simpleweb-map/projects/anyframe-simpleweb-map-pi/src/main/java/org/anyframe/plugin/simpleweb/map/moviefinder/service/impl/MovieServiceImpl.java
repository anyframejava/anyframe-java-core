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
package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.idgen.IdGenService;
import org.anyframe.plugin.simpleweb.map.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("unchecked")
@Service("simplewebMapMovieService")
@Transactional(rollbackFor = { Exception.class })
public class MovieServiceImpl implements MovieService {

	@Inject
	@Named("mapIdGenerationServiceMovie")
	IdGenService idGenService;

	@Inject
	@Named("simplewebMapMovieDao")
	private MovieDao movieDao;

	public void create(Map map) throws Exception {
		map.put("movieId", idGenService.getNextStringId());
		if (map.get("nowPlaying") == null)
			map.put("nowPlaying", "N");
		movieDao.create(map);
	}

	public void remove(Map map) throws Exception {
		movieDao.remove(map);
	}

	public void update(Map map) throws Exception {
		if (map.get("nowPlaying") == null)
			map.put("nowPlaying", "N");
		movieDao.update(map);
	}

	public Map get(Map map) throws Exception {
		return movieDao.get(map);
	}

}
