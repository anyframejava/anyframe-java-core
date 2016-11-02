package org.anyframe.plugin.mobile.moviefinder.service.impl;

import org.anyframe.plugin.mobile.domain.UserAuth;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Repository;

@Repository("mobileUserAuthDao")
public class UserAuthDao  extends SqlSessionDaoSupport{

	
	public void create(UserAuth userAuth) {
		super.getSqlSession().insert("UserAuth.insertUserAuth", userAuth);
	}
	

	public void remove(UserAuth userAuth) {
		super.getSqlSession().delete("UserAuth.deleteUserAuth", userAuth);
	}


}
