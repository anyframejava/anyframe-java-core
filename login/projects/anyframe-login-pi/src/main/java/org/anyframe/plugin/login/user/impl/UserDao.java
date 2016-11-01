package org.anyframe.plugin.login.user.impl;

import java.util.Locale;

import org.anyframe.plugin.login.domain.UserInfo;
import org.springframework.stereotype.Repository;

@Repository("loginUserDao")
public class UserDao {
	public UserInfo getUserInfo(String id) throws Exception{
		String userId = id;
		
		UserInfo userInfo = new UserInfo();
		
		if ( id.equals("anyframe_ko") ){
			userInfo.setUserId(userId);
			userInfo.setUserName("애니프레임");
			userInfo.setLanguage(Locale.KOREAN);
			userInfo.setLocale(Locale.KOREA);
		}else if( id.equals("anyframe_en") ){
			userInfo.setUserId(userId);
			userInfo.setUserName("Anyframe");
			userInfo.setLanguage(Locale.ENGLISH);
			userInfo.setLocale(Locale.US);
		}
		return userInfo;
	}
}
