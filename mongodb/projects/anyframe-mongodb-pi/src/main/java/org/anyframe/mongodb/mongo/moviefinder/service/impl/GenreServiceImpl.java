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
package org.anyframe.mongodb.mongo.moviefinder.service.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Service;

import org.anyframe.mongodb.mongo.domain.Genre;
import org.anyframe.mongodb.mongo.moviefinder.service.GenreService;

/**
 * This GenreServiceImpl class is an Implementation class to provide genre list
 * functionality.
 * 
 * @author Joonbo Jang
 * @author Sooyeon Park
 */
@Service("mongoGenreService")
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("mongoGenreDao")
	private GenreDao genreDao;

	public List<Genre> getList() throws Exception {
		return genreDao.getList();
	}

	/**
	 * Genre Collection Init Data 정의
	 * @throws Exception
	 */
	@PostConstruct
	public void init() throws Exception {
		if (genreDao.getList().size() == 0) { // empty list
			genreDao.init();
		}
	}

}
