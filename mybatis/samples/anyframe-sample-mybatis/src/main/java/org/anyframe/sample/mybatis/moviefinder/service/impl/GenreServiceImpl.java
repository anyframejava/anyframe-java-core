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
package org.anyframe.sample.mybatis.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.sample.domain.Genre;
import org.anyframe.sample.mybatis.moviefinder.dao.GenreDao;
import org.anyframe.sample.mybatis.moviefiner.service.GenreService;
import org.springframework.stereotype.Service;

/**
 * This GenreServiceImpl class is an Implementation class to provide genre list
 * functionality.
 * 
 * @author Jongpil Park
 */
@Service("mybatisGenreService")
public class GenreServiceImpl implements GenreService {

	@Inject
	@Named("genreDao")
	private GenreDao genreDao;

	public List<Genre> getList() throws Exception {
		return genreDao.getList();
	}

}
