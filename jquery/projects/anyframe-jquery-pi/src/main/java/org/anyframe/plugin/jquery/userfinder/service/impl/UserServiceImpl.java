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
package org.anyframe.plugin.jquery.userfinder.service.impl;


import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.userfinder.domain.User;
import org.anyframe.plugin.jquery.userfinder.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * This UserServiceImpl class is an Implementation class to provide user crud
 * functionality.
 * 
 * @author jonghwan jeong
 */
@Service("jqueryUserService")
@Transactional(rollbackFor = { Exception.class })
public class UserServiceImpl implements UserService {

	@Inject
	@Named("jqueryUserDao")
	private UserDao userDao;

/*	@Transactional(readOnly = true)
	public List<Dept> list() throws Exception {
		return this.userDao.list();
	}*/
	
	public void create(User user) throws Exception {
		userDao.create(user);
	}
	public void remove(String userId) throws Exception {
		userDao.remove(userId);
	}
	public void update(User user) throws Exception {
		userDao.update(user);
	}
	@Transactional(readOnly = true)
	public List<User> list(String deptId) throws Exception {
		return this.userDao.list(deptId);
	}
	@Transactional(readOnly = true)
	public Page getPagingList(int page) throws Exception {
		return userDao.getPagingList(page);
	}     
	public User get(String userId) throws Exception {
		return userDao.get(userId);
	}
	
/*
	public List<String> getMovieTitleList(String title) throws Exception {
		return deptDao.getMovieTitleList(title);
	}

	public void removeMovieList(String[] ids) throws Exception {
		for (String id : ids)
			deptDao.remove(id);
	}*/
}
