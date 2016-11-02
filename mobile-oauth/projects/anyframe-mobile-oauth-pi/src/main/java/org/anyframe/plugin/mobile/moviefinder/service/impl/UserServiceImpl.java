package org.anyframe.plugin.mobile.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.mobile.domain.User;
import org.anyframe.plugin.mobile.moviefinder.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("mobileUserService")
public class UserServiceImpl implements UserService {
	
	@Inject
	@Named("mobileUserDao")
	private UserDao userDao;


	@Override
	public User get(String email) throws Exception {
		return userDao.get(email);
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void create(User user) throws Exception {
		userDao.create(user);
	}

	@Override
	public void update(User user) throws Exception {
		userDao.update(user);
		
	}

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void remove(User user) throws Exception {
		userDao.remove(user);
		
	}

	@Override
	public User getUserValid(User user) throws Exception {
		return userDao.getUserValid(user);
	}

}
