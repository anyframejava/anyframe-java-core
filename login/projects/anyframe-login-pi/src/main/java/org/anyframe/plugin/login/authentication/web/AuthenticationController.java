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
package org.anyframe.plugin.login.authentication.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.plugin.login.authentication.service.AuthenticationService;
import org.anyframe.plugin.login.domain.LoginInfo;
import org.anyframe.plugin.login.domain.UserInfo;
import org.anyframe.plugin.login.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.LocaleResolver;

/**
 * This SSOController class is a controller class to provide login information
 * functionality.
 * 
 * @author Youngmin Jo
 */
@Controller("loginAuthenticationController")
public class AuthenticationController {

	@Inject
	private LocaleResolver localeResolver;

	@Inject
	@Named("loginAuthenticationService")
	private AuthenticationService authenticationService;

	@Inject
	@Named("loginUserService")
	private UserService userService;

	@RequestMapping("/login.do")
	public String login(@RequestParam("id") String id,
			@RequestParam("password") String password, Model model,
			HttpSession session, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// 사용자 인증
		LoginInfo loginInfo = new LoginInfo();
		loginInfo.setId(id);
		loginInfo.setPassword(password);
		loginInfo.setIpAddress(request.getRemoteAddr());
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		formatter.setTimeZone(TimeZone.getTimeZone("GMT"));
		loginInfo.setTime(formatter.format(new Date()));

		boolean certification = authenticationService.authenticate(loginInfo);

		if (certification) {
			UserInfo userInfo = userService.getUserInfo(id);
			localeResolver.setLocale(request, response, userInfo.getLocale());
			session.setAttribute("userInfo", userInfo);
			return "forward:/loginMovieFinder.do?method=list";
		} else {
			model.addAttribute("loginError", "login.error");
			return "/login/login";
		}
	}

	@RequestMapping("/logout.do")
	public String logout(HttpSession session) throws Exception {
		session.invalidate();
		return "redirect:/loginView.do";
	}
}
