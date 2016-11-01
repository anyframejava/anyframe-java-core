/*
 * Copyright 2008-2011 the original author or authors.
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
package org.anyframe.plugin.scheduling.moviefinder.web;

import java.util.Collection;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import org.anyframe.plugin.scheduling.moviefinder.service.MonthlyMovieStatusService;

/**
 * This MonthlyMovieStatusController class is a Controller class to provide
 * movie status list functionality.
 * 
 * @author hyunjung jeong
 */
@Controller("schedulingMovieStatusController") 
public class MonthlyMovieStatusController {

	@Inject
	@Named("schedulingMonthlyMovieStatusService")
	private MonthlyMovieStatusService monthlyMovieStatusService;

	/**
	 * display movie status list
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/schedulingMovieList.do")
	public String list(Model model) throws Exception {
		Collection results = monthlyMovieStatusService.getList();
		model.addAttribute("movieStatusList", results);
		return "scheduling/moviefinder/movie/listMovieStatus";
	}
}
