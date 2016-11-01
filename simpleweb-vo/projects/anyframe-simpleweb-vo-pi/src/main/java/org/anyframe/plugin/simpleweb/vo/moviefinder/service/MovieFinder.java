package org.anyframe.plugin.simpleweb.vo.moviefinder.service;

import org.anyframe.pagination.Page;

public interface MovieFinder {
	
	Page getPagingList(MovieSearchVO search) throws Exception;

}
