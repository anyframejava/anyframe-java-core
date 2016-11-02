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
package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.util.NumberUtil;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unchecked")
@Repository("simplewebMapMovieDao")
public class MovieDao extends QueryServiceDaoSupport {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Map map) {
		super.create("createMapMovie", checkNumberTypeChars(map));
	}

	public void remove(Map map) {
		super.remove("removeMapMovie", map);
	}

	public void update(Map map) {
		super.update("updateMapMovie", checkNumberTypeChars(map));
	}

	public Map get(Map map) {
		return (Map) super.findByPk("findMapMovieByPk", map);
	}

	public Page getPagingList(Map map) {
		int pageIndex = 1;
		if (map.get("pageIndex") != null)
			pageIndex = NumberUtil.stringToInt(map.get("pageIndex").toString());
		return super.findListWithPaging("findMapMovieList", map, pageIndex, pageSize,
				pageUnit);
	}

	private Map checkNumberTypeChars(Map map) {
		char removeChar = ',';
		if (StringUtil.isEmpty(map.get("runtime").toString()))
			map.put("runtime", "0");
		else
			map.put("runtime", removeChars(map.get("runtime").toString(),
					removeChar));
		if (StringUtil.isEmpty(map.get("ticketPrice").toString()))
			map.put("ticketPrice", "0");
		else
			map.put("ticketPrice", removeChars(map.get("ticketPrice")
					.toString(), removeChar));

		return map;
	}

	/**
	 * Removes the specified characters from the supplied String.
	 * 
	 * @param original
	 *            the String to remove characters in.
	 * @param ch
	 *            the characters to remove from the supplied String.
	 * @return the String stripped from all the supplied characters.
	 */
	private String removeChars(String original, char ch) {
		StringBuilder r = new StringBuilder();
		for (int i = 0; i < original.length(); i++) {
			char compare = original.charAt(i);
			if (compare != ch)
				r.append(compare);
		}
		return r.toString();
	}

}
