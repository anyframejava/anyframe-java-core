package org.anyframe.plugin.simpleweb.map.moviefinder.service;

import java.util.Map;

import org.anyframe.pagination.Page;

public interface MovieFinder {
	
	@SuppressWarnings("unchecked")
	Page getPagingList(Map map) throws Exception;
}
