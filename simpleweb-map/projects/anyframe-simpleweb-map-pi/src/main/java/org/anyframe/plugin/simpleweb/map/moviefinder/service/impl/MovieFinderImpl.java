package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.simpleweb.map.moviefinder.service.MovieFinder;
import org.springframework.stereotype.Service;

@Service("simplewebMapMovieFinder")
public class MovieFinderImpl implements MovieFinder {
	@Inject
	@Named("simplewebMapMovieDao")
	private MovieDao movieDao;

	@SuppressWarnings("unchecked")
	public Page getPagingList(Map map) throws Exception {
		if (map.get("searchKeyword") == null || ((String) map.get("searchKeyword")).equals(""))
			map.put("searchKeyword", "");
		if (map.get("nowPlayingCondition") == null || ((String) map.get("nowPlayingCondition")).equals(""))
			map.put("nowPlayingCondition", "Y");
		return this.movieDao.getPagingList(map);
	}
}
