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
package org.anyframe.plugin.jquery.moviefinder.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.plugin.jquery.moviefinder.domain.Genre;
import org.anyframe.plugin.jquery.moviefinder.service.MovieSearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * This GenreDao class is a DAO class to provide genre list functionality.
 * 
 * @author Jonghoon Kim
 */
@Repository("jqueryGenreDao")
public class GenreDao extends QueryServiceDaoSupport {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public List<Genre> getDropDownGenreList() {
		return super.getQueryService().find("findDropDownJqueryGenreList",
				new Object[] {});
	}

	public List<Genre> getGenreList(MovieSearchVO searchVO) {
		return super.findList("findJqueryGenreList", searchVO);
	}

	public List<String> getGenreNameList(String keyword) {
		return super.getQueryService().find("findGenreName",
				new Object[] { new Object[] { "keyword", keyword } });
	}

	public Genre getGenre(String genreId) {
		Genre genre = new Genre();
		genre.setGenreId(genreId);
		return super.findByPk("findJqueryGenreByPk", genre);
	}

}
