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
package org.anyframe.sample.properties.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.sample.properties.domain.Movie;
import org.anyframe.util.properties.PropertiesService;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie service functionality to
 * get movie list information.
 * 
 * @author Sooyeon Park
 */
@Repository("propertiesMovieDao")
public class MovieDao {

	@Inject
	@Named("propertiesService")
	protected PropertiesService propertiesService;

	public Page getPagingList(Movie movie) {
		int page_unit = propertiesService.getInt("pageUnit");
		int page_size = propertiesService.getInt("pageSize");

		System.out.println("value of PAGE_UNIT property is a '" + page_unit
				+ "'.");
		System.out.println("value of PAGE_SIZE property is a '" + page_size
				+ "'.");
		return new Page();
	}
}
