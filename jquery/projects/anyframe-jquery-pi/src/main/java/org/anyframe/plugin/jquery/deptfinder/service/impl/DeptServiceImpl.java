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
package org.anyframe.plugin.jquery.deptfinder.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.deptfinder.domain.Dept;
import org.anyframe.plugin.jquery.deptfinder.service.DeptService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * This DeptServiceImpl class is an Implementation class to provide dept crud
 * functionality.
 * 
 * @author jonghwan jeong
 */
@Service("jqueryDeptService")
@Transactional(rollbackFor = { Exception.class })
public class DeptServiceImpl implements DeptService {

	@Inject
	@Named("jqueryDeptDao")
	private DeptDao deptDao;

	@Transactional(readOnly = true)
	public List<Dept> list() throws Exception {
		return this.deptDao.list();
	}
	
	public Dept get(String deptId) throws Exception {
		return deptDao.get(deptId);
	}
}
