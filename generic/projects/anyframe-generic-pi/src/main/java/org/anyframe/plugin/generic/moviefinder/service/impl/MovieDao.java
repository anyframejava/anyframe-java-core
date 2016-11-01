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
package org.anyframe.plugin.generic.moviefinder.service.impl;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.anyframe.plugin.generic.domain.GenericMovie;
import org.anyframe.query.QueryService;
import org.anyframe.generic.dao.query.GenericQueryDao;
import org.springframework.stereotype.Repository;

/**
 * This MovieDao class is a DAO class to provide movie create functionality.
 * 
 * @author Hyunjung Jeong
 */
@Repository("genericMovieDao")
public class MovieDao extends GenericQueryDao<GenericMovie, String> {

	@Inject
	QueryService queryService;

	@PostConstruct
	public void initialize() {
		super.setQueryService(queryService);
		super.setPersistentClass(GenericMovie.class);
	}

	public void create(GenericMovie genericMovie) {
		genericMovie.setMovieId("MV-" + System.currentTimeMillis());
		create("createGenericMovie", genericMovie);
	}
}
