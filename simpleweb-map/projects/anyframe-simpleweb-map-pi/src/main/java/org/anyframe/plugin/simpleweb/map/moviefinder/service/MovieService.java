package org.anyframe.plugin.simpleweb.map.moviefinder.service;

import java.util.Map;

@SuppressWarnings("unchecked")
public interface MovieService {

	Map get(Map map) throws Exception;

	void create(Map map) throws Exception;

	void update(Map map) throws Exception;

	void remove(Map map) throws Exception;

}
