package org.anyframe.plugin.mobile.moviefinder.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.mobile.domain.UserAuth;
import org.anyframe.plugin.mobile.moviefinder.service.UserAuthService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("mobileUserAuthService")
public class UserAuthServiceImpl implements UserAuthService {
	
	@Inject
	@Named("mobileUserAuthDao")
	private UserAuthDao userAuthDao;

	@Override
	@Transactional(rollbackFor=Exception.class)
	public void create(UserAuth userAuth) throws Exception {
		userAuthDao.create(userAuth);
	}
	
	@Override
	@Transactional(rollbackFor=Exception.class)
	public void remove(UserAuth userAuth) throws Exception {
		userAuthDao.remove(userAuth);
		
	}

}
