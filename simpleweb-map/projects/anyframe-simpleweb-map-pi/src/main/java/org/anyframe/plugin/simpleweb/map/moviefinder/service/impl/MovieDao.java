package org.anyframe.plugin.simpleweb.map.moviefinder.service.impl;

import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("simplewebMapMovieDao")
public class MovieDao extends AbstractDao {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(Map map) throws Exception {
		create("MapMovie", checkNumberTypeChars(map));
	}

	public void remove(Map map) throws Exception {
		remove("MapMovie", map);
	}

	public void update(Map map) throws Exception {
		update("MapMovie", checkNumberTypeChars(map));
	}

	public Map get(Map map) throws Exception {
		return (Map) findByPk("MapMovie", map);
	}

	public Page getPagingList(Map map) throws Exception {
		int pageIndex = 1;
		if (map.get("pageIndex") != null)
			pageIndex = StringUtil.string2integer(map.get("pageIndex")
					.toString());
		return this.findListWithPaging("MapMovie", map, pageIndex, pageSize,
				pageUnit);
	}

	private Map checkNumberTypeChars(Map map) {
		char removeChar = ',';
		if(StringUtil.isEmpty(map.get("runtime").toString()))
			map.put("runtime", "0");
		else
			map.put("runtime", removeChars(map.get("runtime").toString(),
					removeChar));
		if(StringUtil.isEmpty(map.get("ticketPrice").toString()))
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
		StringBuffer r = new StringBuffer();
		for (int i = 0; i < original.length(); i++) {
			char compare = original.charAt(i);
			if (compare != ch)
				r.append(compare);
		}
		return r.toString();
	}

}
