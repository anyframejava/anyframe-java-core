package org.anyframe.plugin.mobile.moviefinder.service.impl;

import org.anyframe.plugin.mobile.domain.UserAuth;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class UserAuthDao{

    @Autowired
    @Qualifier("sqlSessionTemplate")
    SqlSession sqlsession;
	
	public void create(UserAuth userAuth) {
		sqlsession.insert("UserAuth.insertUserAuth", userAuth);
	}
	

	public void remove(UserAuth userAuth) {
		sqlsession.delete("UserAuth.deleteUserAuth", userAuth);
	}


}
