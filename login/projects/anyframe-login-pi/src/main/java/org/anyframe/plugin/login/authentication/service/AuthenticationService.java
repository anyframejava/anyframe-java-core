package org.anyframe.plugin.login.authentication.service;

import org.anyframe.plugin.login.domain.LoginInfo;

public interface AuthenticationService {

	public boolean authenticate(LoginInfo loginInfo)throws Exception;
}
