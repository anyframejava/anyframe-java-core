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
package org.anyframe.plugin.i18n.authentication.web;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.plugin.i18n.authentication.service.AuthenticationService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This SSOController class is a controller class to provide login information
 * functionality.
 * 
 * @author Youngmin Jo
 */
@Controller("i18nAuthenticationController")
public class AuthenticationController {

	@Inject
	@Named("i18nAuthenticationService")
	private AuthenticationService authenticationService;

	@RequestMapping("/i18nLogin.do")
	public String login(@RequestParam("id") String id,
			@RequestParam("password") String password, Model model,
			HttpSession session, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		boolean certification = authenticationService.authenticate(id, password);

		if (certification) {
			return "redirect:/i18nMovieFinder.do?method=list";
		} else {
			model.addAttribute("loginError", "i18n.error");
			return "/i18n/login";
		}
	}

	@RequestMapping("/i18nLogout.do")
	public String logout(HttpSession session) throws Exception {
		session.invalidate();
		return "redirect:/i18nLoginView.do";
	}
}
