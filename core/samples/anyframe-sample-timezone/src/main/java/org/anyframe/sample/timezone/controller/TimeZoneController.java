/*
 * Copyright 2008-2014 the original author or authors.
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
package org.anyframe.sample.timezone.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This is TimeZone Controller class 
 * 
 * @author Sujeong Lee
 */
@Controller("timeZoneController")
public class TimeZoneController {
	
	@RequestMapping("/timeZone.do")
	public String list(Model model) throws Exception{
		TimeZone selecteTimeZone = LocaleContextHolder.getTimeZone();
		TimeZone standardTimeZone = TimeZone.getTimeZone("GMT+0");
		
		Date date = new Date();
		
		DateFormat formatter= new SimpleDateFormat("yyyy/MM/dd HH:mm:ss Z");
		String strMyTimeZoneDate = formatter.format(date);
		
		formatter.setTimeZone(standardTimeZone);
		String strStandardTimeZoneDate = formatter.format(date);
				
		formatter.setTimeZone(selecteTimeZone);
		String strSelecteTimeZoneDate  = formatter.format(date);
		
		model.addAttribute("myTimeZoneDate", strMyTimeZoneDate);
		model.addAttribute("standardTimeZoneDate", strStandardTimeZoneDate);
		model.addAttribute("selectTimeZoneDate", strSelecteTimeZoneDate);
		model.addAttribute("selectTimeZoneID", selecteTimeZone.getID());
		
		model.addAttribute("timeZoneList", Arrays.asList(TimeZone.getAvailableIDs()));
		
		return "timeZone/view";
	}

}
