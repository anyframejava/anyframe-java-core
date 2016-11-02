package org.anyframe.plugin.mobile.moviefinder.service.impl;

import org.anyframe.plugin.mobile.domain.User;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao{
	
    @Autowired
    @Qualifier("sqlSessionTemplate")
    SqlSession sqlsession;
	
	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END
	
	public User get(String email){
		return sqlsession.selectOne("User.getUser", email);
	}
	
	public User getUserValid(User user){
		return sqlsession.selectOne("User.getUserValid", user);
	}
	
	public void create(User user) {
		sqlsession.insert("User.insertUser", user);
	}

	public void update(User user) {
		sqlsession.update("User.updateUser", user);
	}

	public void remove(User user) {
		sqlsession.delete("User.deleteUser", user);
	}


}
