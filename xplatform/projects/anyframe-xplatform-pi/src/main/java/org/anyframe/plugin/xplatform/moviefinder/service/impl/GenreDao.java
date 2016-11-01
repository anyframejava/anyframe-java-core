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
package org.anyframe.plugin.xplatform.moviefinder.service.impl;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.stereotype.Repository;

/**
 * The GenreDao class is a DAO class to provide a function to get list of Genre.
 * 
 * 
 * @author Youngmin Jo
 * 
 */
@Repository("xplatformGenreDao")
public class GenreDao extends QueryServiceDaoSupport {
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public List<Map<String, Object>> getList() {
		return super.findList("findXPLATFORMGenreList", new Object[] {});
	}
}
