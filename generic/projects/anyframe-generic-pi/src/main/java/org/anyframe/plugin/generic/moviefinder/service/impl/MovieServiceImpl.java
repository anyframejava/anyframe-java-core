/*
 * Copyright 2008-2011 the original author or authors.
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
import javax.inject.Named;

import org.anyframe.generic.service.impl.GenericServiceImpl;
import org.anyframe.plugin.generic.domain.GenericMovie;
import org.anyframe.plugin.generic.moviefinder.service.MovieService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MovieServiceImpl class is an Implementation class to provide movie create
 * functionality.
 * 
 * @author Hyunjung Jeong
 */
@Service("genericMovieService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MovieServiceImpl extends GenericServiceImpl<GenericMovie, String>
		implements MovieService {

	@Inject
	@Named("genericMovieDao")
	private MovieDao genericMovieDao;

	@PostConstruct
	public void initialize() {
		super.setGenericDao(genericMovieDao);
	}

	@Override
	public void create(GenericMovie genericMovie) throws Exception {
		genericMovieDao.create(genericMovie);
	}
}