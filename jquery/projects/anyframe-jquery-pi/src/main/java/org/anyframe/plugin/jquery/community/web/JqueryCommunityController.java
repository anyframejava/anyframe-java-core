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
package org.anyframe.plugin.jquery.community.web;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.community.service.JqueryCommunityService;
import org.anyframe.plugin.jquery.domain.JqueryCommunity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This CommunityController class is a Controller class to provide community crud
 * functionality.
 * 
 * @author Sujeong Lee
 */
@Controller("jqueryCommunityController")
@RequestMapping("/jqueryCommunity.do")
public class JqueryCommunityController {

	@Inject
	@Named("jqueryCommunityService")
	private JqueryCommunityService communityService;

	/**
	 * @param searchKeyword
	 * @param searchCondition
	 * @param pageIndex
	 * @param categoryId
	 * @param community
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=list")
	public String list(
			@RequestParam(value = "searchKeyword", defaultValue = "") String searchKeyword,
			@RequestParam(value = "searchCondition", defaultValue = "") String searchCondition,
			@RequestParam(value = "categoryId", required = false) String categoryId,
			JqueryCommunity community, Model model,
			HttpServletRequest request) throws Exception {

		if(searchCondition.equals("name")){
			community.setCommunityName(searchKeyword);
		}
		if(searchCondition.equals("desc")){
			community.setCommunityDesc(searchKeyword);
		}
		
		if(categoryId != null) {
			community.setCategoryId(categoryId);
		}
		
		Page resultPage = communityService.getPagingList(community);

		Map<String,Object> jsonModel = new HashMap<String,Object>();

		jsonModel.put("page", resultPage.getCurrentPage() + "");
		jsonModel.put("total", resultPage.getMaxPage() + "");
		jsonModel.put("records", resultPage.getTotalCount() + "");
		jsonModel.put("rows", resultPage.getList());
		
		model.addAllAttributes(jsonModel);
		return "jsonView";
	}
	
	/**
	 * @param keyword
	 * @param condition
	 * @param categoryId
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=searchKeyword")
	public String searchKeyword(@RequestParam(value = "searchKeyword") String keyword, 
			@RequestParam(value = "searchCondition") String condition, 
			@RequestParam(value = "categoryId") String categoryId, Model model, HttpServletRequest request) throws Exception {
		model.addAttribute("r", communityService.getSearchKeyword(keyword, condition, categoryId));
		return "jsonView";
	}
	

	/**
	 * @param communityId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=remove")
	public String remove(@RequestParam(value = "communityId") String communityId, Model model)
			throws Exception {
		communityService.remove(communityId);
		return "jsonView";
	}
	
	/**
	 * @param model
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=get")
	public String get(Model model, JqueryCommunity param) throws Exception {
		JqueryCommunity community = communityService.get(param.getCommunityId());
		model.addAttribute("community", community);
		return "jsonView";
	}
	
	/**
	 * @param session
	 * @param model
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=save")
	public String save(HttpSession session, Model model, JqueryCommunity param) throws Exception {
		if(param.getCommunityId().equals("")){
			param.setRegId(session.getAttribute("regId").toString());
			model.addAttribute("communityId", communityService.create(param));
			model.addAttribute("categoryId", param.getCategoryId());
		}else{
			communityService.update(param);
		}
		return "jsonView";
	}
	

	/**
	 * @param param
	 * @param model
	 * @param communityId
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateCell")
	public String updateCell(JqueryCommunity param, Model model, 
			@RequestParam(value = "id", defaultValue="") String communityId) throws Exception {
		param.setCommunityId(communityId);
		communityService.updateCell(param);
		return "jsonView";
	}
}
