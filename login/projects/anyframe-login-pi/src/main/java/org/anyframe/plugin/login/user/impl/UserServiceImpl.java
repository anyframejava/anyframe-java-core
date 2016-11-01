package org.anyframe.plugin.login.user.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.login.domain.UserInfo;
import org.anyframe.plugin.login.user.UserService;
import org.springframework.stereotype.Service;

@Service("loginUserService")
public class UserServiceImpl implements UserService{

	@Inject
	@Named("loginUserDao")
	private UserDao userDao;
	
	public UserInfo getUserInfo(String id) throws Exception {
		return userDao.getUserInfo(id);
	}
	
}
