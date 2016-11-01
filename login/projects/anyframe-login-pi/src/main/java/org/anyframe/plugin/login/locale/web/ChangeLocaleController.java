package org.anyframe.plugin.login.locale.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
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
import org.springframework.beans.propertyeditors.LocaleEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.LocaleResolver;

@Controller("loginChangeLocaleController")
public class ChangeLocaleController {

	@Inject 
	private LocaleResolver localeResolver;
	
	@RequestMapping("/loginChangeLocale.do")
	public String login(@RequestParam(value = "locale", defaultValue = "en")  String newLocale,
			Model model,
			HttpSession session, HttpServletRequest request,  HttpServletResponse response) throws Exception {
		
		LocaleEditor localeEditor = new LocaleEditor();
		localeEditor.setAsText(newLocale);
		localeResolver.setLocale(request, response, (Locale) localeEditor.getValue());
		
		return "forward:/loginMovieFinder.do?method=list";
	}
}
