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

/**
 * This ChangeLocaleController class is a Controller class to change locale
 * information.
 * 
 * @author Yongmin Jo
 */
@Controller("loginChangeLocaleController")
public class ChangeLocaleController {

	@Inject
	private LocaleResolver localeResolver;

	@RequestMapping("/loginChangeLocale.do")
	public String login(
			@RequestParam(value = "locale", defaultValue = "en_US") String newLocale,
			Model model, HttpSession session, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		LocaleEditor localeEditor = new LocaleEditor();
		localeEditor.setAsText(newLocale);
		localeResolver.setLocale(request, response,
				(Locale) localeEditor.getValue());

		return "forward:/loginMovieFinder.do?method=list";
	}
}
