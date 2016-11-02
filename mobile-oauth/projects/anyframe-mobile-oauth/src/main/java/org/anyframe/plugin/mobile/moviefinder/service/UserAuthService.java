package org.anyframe.plugin.mobile.moviefinder.service;

import org.anyframe.plugin.mobile.domain.UserAuth;

public interface UserAuthService {
	
	void create(UserAuth userAuth) throws Exception;
	
	void remove(UserAuth userAuth) throws Exception;
}
