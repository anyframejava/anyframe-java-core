package org.anyframe.plugin.login.locale.web;

import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
	public String changeLoacle(@RequestParam(value = "locale", defaultValue = "en")  String newLocale,
			Model model,
			HttpSession session, HttpServletRequest request,  HttpServletResponse response) throws Exception {
		
		LocaleEditor localeEditor = new LocaleEditor();
		localeEditor.setAsText(newLocale);
		localeResolver.setLocale(request, response, (Locale) localeEditor.getValue());
		
		return "forward:/loginMovieFinder.do?method=list";
	}
}
