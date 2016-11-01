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
package org.anyframe.plugin.flex.query.dept.service.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.flex.query.service.FlexSearchVO;
import org.anyframe.flex.query.service.impl.FlexServiceImpl;
import org.anyframe.plugin.flex.query.dept.dao.DeptDao;
import org.anyframe.plugin.flex.query.dept.service.DeptService;
import org.anyframe.plugin.flex.query.domain.Dept;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("deptService")
@RemotingDestination
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class DeptServiceImpl extends FlexServiceImpl implements DeptService {
	
	@Inject
	@Named("deptDao")
	private DeptDao deptDao;

	@PostConstruct
	public void init() {
		setFlexDao(deptDao);
	}

	public List<Dept> getTree(FlexSearchVO searchVO) throws Exception {
		
		searchVO.setSearchCondition("Group");
		List groupList = deptDao.getTree(searchVO);
		
		for ( int i = 0 ; i < groupList.size() ; i ++ ){
			Dept group = (Dept) groupList.get(i);
			searchVO.setSearchCondition("Team");
			searchVO.setSearchKeyword(group.getDeptId());
			List teamList = deptDao.getTree(searchVO);
			group.setChildren(teamList);
		}
		return groupList;
	}        
}