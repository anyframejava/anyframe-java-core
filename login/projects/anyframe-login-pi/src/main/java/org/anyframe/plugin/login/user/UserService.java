package org.anyframe.plugin.login.user;

import org.anyframe.plugin.login.domain.UserInfo;

public interface UserService {
	UserInfo getUserInfo(String id) throws Exception;
}
