package org.anyframe.plugin.simpleweb.map.moviefinder.service;

import java.util.Map;

import org.anyframe.pagination.Page;

public interface MovieFinder {
	
	Page getPagingList(Map map) throws Exception;
}
