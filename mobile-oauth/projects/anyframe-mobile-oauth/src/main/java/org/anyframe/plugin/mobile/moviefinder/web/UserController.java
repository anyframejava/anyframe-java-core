package org.anyframe.plugin.mobile.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.mobile.domain.User;
import org.anyframe.plugin.mobile.domain.UserAuth;
import org.anyframe.plugin.mobile.moviefinder.service.UserAuthService;
import org.anyframe.plugin.mobile.moviefinder.service.UserService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
	
	@Inject
	@Named("mobileUserService")
	private UserService userService;
	

	@Inject
	@Named("mobileUserAuthService")
	private UserAuthService userAuthService;
	
	
	@RequestMapping(method=RequestMethod.POST)
	public User getUser(@RequestBody User user)
			throws Exception {
		return  userService.getUserValid(user);
	}
	
	@RequestMapping(value="/create", method=RequestMethod.POST)
	public String create(@RequestBody User user) throws Exception {
		UserAuth userAuth = new UserAuth(); 
		userAuth.setEmail(user.getEmail());
		userAuth.setName(user.getName());
		userAuth.setRoleId("ROLE_USER"); //임시 권한 셋팅
		userAuthService.create(userAuth);
		userService.create(user);
		return user.getEmail();	
	}

	@RequestMapping(method=RequestMethod.PUT)
	public void update(@RequestBody User user) throws Exception {
		userService.update(user);
	}

	@RequestMapping(value="/remove",method=RequestMethod.POST)
	public void remove(@RequestBody User user)
			throws Exception {
		userService.remove(user);
		
		UserAuth userAuth = new UserAuth(); 
		userAuth.setEmail(user.getEmail());
		userAuth.setName(user.getName());
		userAuthService.remove(userAuth);
	}
	
}
