package org.anyframe.plugin.login.authentication.service.impl;

import org.anyframe.plugin.login.authentication.service.AuthenticationService;
import org.anyframe.plugin.login.domain.LoginInfo;
import org.springframework.stereotype.Service;

@Service("loginAuthenticationService")
public class AuthenticationServiceImpl implements AuthenticationService{

	public boolean authenticate(LoginInfo loginInfo) throws Exception {
		boolean certification = false;
		
		String id = loginInfo.getId();
		String password = loginInfo.getPassword();
		
		if ( id.equals("anyframe_ko") && password.equals("anyframe0") ){ certification = true; }
		else if ( id.equals("anyframe_en") && password.equals("anyframe1") ){ certification = true; }
		
		return certification;
	}
	
}
