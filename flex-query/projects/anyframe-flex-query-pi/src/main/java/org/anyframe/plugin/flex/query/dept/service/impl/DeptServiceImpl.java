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
package org.anyframe.plugin.flex.query.dept.service.impl;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.dept.service.DeptService;
import org.anyframe.plugin.flex.query.domain.Dept;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("deptService")
@RemotingDestination
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class DeptServiceImpl implements DeptService {
	
	@Inject
	@Named("deptDao")
	private DeptDao deptDao;

	public List<Dept> getTree(SearchVO searchVO) throws Exception {
		searchVO.setSearchCondition("Group");
		List<Dept> groupList = deptDao.getTree(searchVO);
		
		for ( int i = 0 ; i < groupList.size() ; i ++ ){
			Dept group = (Dept) groupList.get(i);
			searchVO.setSearchCondition("Team");
			searchVO.setSearchKeyword(group.getDeptId());
			List<Dept> teamList = deptDao.getTree(searchVO);
			group.setChildren(teamList);
		}
		return groupList;
	}    
	
	public Page getPagingList(SearchVO searchVO) throws Exception {
		return deptDao.getPagingList(searchVO);
	}

	public int create(Dept dept) throws Exception {
		return deptDao.create(dept);
	}

	public int update(Dept dept) throws Exception {
		return deptDao.update(dept);
	}

	public int remove(Dept dept) throws Exception {
		return deptDao.remove(dept);
	}

	public Map<String, Integer> saveAll(List<Dept> list) throws Exception {
		return deptDao.saveAll(list);
	}
	
	public List<Dept> getList(SearchVO searchVO) throws Exception{
		return deptDao.getList(searchVO);
	}
	
}