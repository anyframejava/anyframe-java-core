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
package org.anyframe.plugin.logmanager.moviefinder.web;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.anyframe.plugin.logmanager.domain.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This LoginController class is a Controller class to user login.
 * 
 * @author Heewon Jung
 */
@Controller("logmanagerLoginController")
public class LoginController {
	
	/**
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping("/logmanagerLoginView.do")
	public String view(Model model){
		model.addAttribute("user", new User());
		return "/logmanager/login";
	}

	/**
	 * 
	 * @param user
	 * @param results
	 * @param session
	 * @return
	 */
	@RequestMapping("/logmanagerLogin.do")
	public String login(@Valid User user, BindingResult results, HttpSession session){
		if (results.hasErrors())
			return "/logmanager/login";
		session.setAttribute("user", user);
		return "redirect:/logmanagerMovieFinder.do?method=list";
	}
}
