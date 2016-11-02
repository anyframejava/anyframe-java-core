package org.anyframe.plugin.mobile.moviefinder.service.impl;

import org.anyframe.plugin.mobile.domain.User;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("mobileUserDao")
public class UserDao  extends SqlSessionDaoSupport{
	
	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END
	
	public User get(String email){
		return super.getSqlSession().selectOne("User.getUser", email);
	}
	
	public User getUserValid(User user){
		return super.getSqlSession().selectOne("User.getUserValid", user);
	}
	
	public void create(User user) {
		super.getSqlSession().insert("User.insertUser", user);
	}

	public void update(User user) {
		super.getSqlSession().update("User.updateUser", user);
	}

	public void remove(User user) {
		super.getSqlSession().delete("User.deleteUser", user);
	}


}
