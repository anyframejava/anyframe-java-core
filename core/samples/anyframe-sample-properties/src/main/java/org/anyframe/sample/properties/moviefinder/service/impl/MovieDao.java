package org.anyframe.sample.properties.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.sample.properties.domain.Movie;
import org.anyframe.util.properties.PropertiesService;
import org.springframework.stereotype.Repository;

@Repository("propertiesMovieDao")
public class MovieDao {

	@Inject
	@Named("propertiesService")
	protected PropertiesService propertiesService;
	
	public Page getPagingList(Movie movie) {
		int page_unit = propertiesService.getInt("pageUnit");
		int page_size = propertiesService.getInt("pageSize");
		
		System.out.println("value of PAGE_UNIT property is a '" + page_unit + "'.");
		System.out.println("value of PAGE_SIZE property is a '" + page_size + "'.");
		return new Page();
	}
}
