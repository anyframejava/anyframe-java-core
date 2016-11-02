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
package org.anyframe.plugin.iam.director.web;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.iam.director.service.DirectorService;
import org.anyframe.plugin.iam.domain.Director;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

/**
 * The DirectorController class is a controller class to manage web flows about Director domain.
 * 
 * @author Youngmnin Jo
 *
 */
@Controller("directorController")
@SessionAttributes("director")
public class DirectorController {

	@Inject
	@Named("directorService")
	private DirectorService directorService;
	
	@RequestMapping("/iamGetDirector.do")
	public String get(@RequestParam("directorId") String directorId, Model model) throws Exception{
		
		Director gettedDirector = directorService.get(directorId);
		model.addAttribute("director", gettedDirector);
		
		return "iam/director/form";
	}
	
	@RequestMapping("/iamListDirector.do")
	public String list(@ModelAttribute("search") SearchVO searchVO, Model model) throws Exception{
		
		List<Director> directorList = directorService.getList(searchVO);
		model.addAttribute("directorList", directorList);
		
		return "iam/director/list";
	}
	
	@RequestMapping("/iamUpdateDirector.do")
	public String update(@ModelAttribute("director") Director director, SessionStatus status) throws Exception{
		
		directorService.update(director);
		status.setComplete();
		
		return "redirect:/iamListDirector.do";
	}
}
