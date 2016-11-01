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
package org.anyframe.plugin.logback.authentication.service.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.plugin.logback.filter.MDCServletFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * This AuthenticationController class is a controller class to provide login infomation
 * functionality.
 * 
 * @author Sunghoon Son
 */
@Controller("logbackAuthenticationController")
public class AuthenticationController {
		
	@RequestMapping("/logbackLogin.do")
	public String login(@RequestParam("id") String id,
			@RequestParam("password") String password, Model model,
			HttpSession session, HttpServletRequest request,  HttpServletResponse response) throws Exception {
		
		session.setAttribute(MDCServletFilter.USER_ID_MDC_KEY, id);
		return "redirect:/logbackMovieFinder.do?method=list";
	}
	
	@RequestMapping("/logbackLogout.do")
	public String logout(HttpSession session) throws Exception {
		session.invalidate();
		return "redirect:/logbackLoginView.do";
	}
}
