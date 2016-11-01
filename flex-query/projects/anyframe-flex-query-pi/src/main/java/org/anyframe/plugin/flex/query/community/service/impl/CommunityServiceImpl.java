/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.plugin.flex.query.community.service.impl;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.community.service.CommunityService;
import org.anyframe.plugin.flex.query.domain.Community;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("communityService")
@RemotingDestination
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class CommunityServiceImpl implements CommunityService{

	@Inject
	@Named("communityDao")
	private CommunityDao  communityDao;
	
	public Page getPagingList(SearchVO searchVO) throws Exception {
		return communityDao.getPagingList(searchVO);
	}

	public int create(Community community) throws Exception {
		return communityDao.create(community);
	}

	public int update(Community community) throws Exception {
		return communityDao.update(community);
	}

	public int remove(Community community) throws Exception {
		return communityDao.remove(community);
	}

	public Map<String, Integer> saveAll(List<Community> list) throws Exception {
		return communityDao.saveAll(list);
	}

	public List<Community> getList(SearchVO searchVO) throws Exception {
		return communityDao.getList(searchVO);
	}

}
