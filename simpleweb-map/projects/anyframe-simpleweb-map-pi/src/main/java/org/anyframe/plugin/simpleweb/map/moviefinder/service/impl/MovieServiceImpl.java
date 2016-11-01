package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.idgen.IdGenService;
import org.anyframe.plugin.simpleweb.map.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
		if(map.get("nowPlaying") == null) map.put("nowPlaying", "N");
		movieDao.create(map);
	}

	public void remove(Map map) throws Exception {
		movieDao.remove(map);
	}

	public void update(Map map) throws Exception {
		if(map.get("nowPlaying") == null) map.put("nowPlaying", "N");
		movieDao.update(map);
	}

	public Map get(Map map) throws Exception {
		return movieDao.get(map);
	}

}
