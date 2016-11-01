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



import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.userfinder.domain.User;
import org.anyframe.plugin.jquery.userfinder.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This UserController class is a Controller class to provide user list functionality.
 * 
 * @author Jonghwan Jeong
 */

@Controller("jqueryUserFinderController")
@RequestMapping("/jqueryUserFinder.do")
public class UserFinderController {

	@Inject
	@Named("jqueryUserService")
	private UserService userService;

	@RequestMapping(params = "method=listView")
	public String listView(User user, Model model) throws Exception {
		model.addAttribute("user", user);
		return "jquery/userfinder/user/list";
	}
	
    @RequestMapping(params = "method=list")  
    public String list(String deptId, Model model) throws Exception {
		List<User> userList = userService.list(deptId);
		model.addAttribute("page", String.valueOf(1));
		model.addAttribute("total", String.valueOf(1));
		model.addAttribute("records", String.valueOf(50));
		model.addAttribute("rows", userList);
        return "jsonView";        
    }
    
}
