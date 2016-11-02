/*
 * Copyright 2008-2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.anyframe.plugin.jquery.userfinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.userfinder.domain.User;
import org.anyframe.plugin.jquery.userfinder.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This UserController class is a Controller class to provide user crud functionality
 * 
 * @author Jonghwan Jeong
 */

@Controller("jqueryUserController")
@RequestMapping("/jqueryUser.do")
public class UserController {

	@Inject
	@Named("jqueryUserService")
	private UserService userService;

	@RequestMapping(params = "method=create")
	public String create(User user) throws Exception {
		userService.create(user);
		return "jsonView";
	}
	
	@RequestMapping(params = "method=remove")
	public String remove(String userId) throws Exception {
		userService.remove(userId);
		return "jsonView";
	}
	
	@RequestMapping(params = "method=update")
	public String update(User user) throws Exception {
		userService.update(user);
		return "jsonView";
	}
	
	@RequestMapping(params = "method=get")
	public String get(String userId, Model model) throws Exception {
		User user = userService.get(userId);
		model.addAttribute("user", user);
		return "jsonView";
	}
	
	@RequestMapping(params = "method=isDuplication")
	public String isDuplication(String userId, Model model) throws Exception {
		User user = userService.get(userId);
		Boolean isDuplication = false;
		if(user != null) {
			isDuplication = true;
		}
		model.addAttribute("isDuplication", isDuplication);
		return "jsonView";
	}
}
