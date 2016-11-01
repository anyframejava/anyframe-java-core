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
package org.anyframe.plugin.jquery.community.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.domain.JqueryCommunity;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This class is a DAO class to provide community crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
@Repository("jqueryCommunityDao")
public class JqueryCommunityDao extends AbstractDao {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public int create(JqueryCommunity community) throws Exception {
		return create("JqueryCommunity", community);
	}

	public int remove(JqueryCommunity community) throws Exception {
		return remove("JqueryCommunity", community);
	}

	public int update(JqueryCommunity community) throws Exception {
		return update("JqueryCommunity", community);
	}
	
	public int updateCell(JqueryCommunity community) throws Exception {
		return update("JqueryCommunityCell", community);
	}

	public JqueryCommunity get(JqueryCommunity community) throws Exception {
		return (JqueryCommunity) findByPk("JqueryCommunity", community);
	}
	
	public Page getPagingList(JqueryCommunity community, int pageIndex) throws Exception{
		return (Page) findListWithPaging("JqueryCommunity", community, pageIndex, pageSize, pageUnit);
	}

	@SuppressWarnings("unchecked")
	public List<JqueryCommunity> getList(JqueryCommunity community) throws Exception{
		return (List<JqueryCommunity>)findList("JqueryCommunity", community);
	}
}
