package org.anyframe.plugin.mobile.moviefinder.service;

import org.anyframe.plugin.mobile.domain.User;

public interface UserService {
	
	User get(String email)  throws Exception;
	
	User getUserValid(User user)  throws Exception;
	
	void create(User user) throws Exception;
	
	void update(User user) throws Exception;
	
	void remove(User user) throws Exception;
	
}
