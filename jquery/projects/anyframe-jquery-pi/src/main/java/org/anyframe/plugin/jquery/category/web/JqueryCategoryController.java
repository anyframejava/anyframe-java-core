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
package org.anyframe.plugin.jquery.category.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.category.service.JqueryCategoryService;
import org.anyframe.plugin.jquery.domain.JqueryCategory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This CategoryController class is a Controller class to provide category crud
 * functionality.
 * 
 * @author Sujeong Lee
 */
@Controller("jqueryCategoryController")
@RequestMapping("/jqueryCategory.do")
public class JqueryCategoryController {

	@Inject
	@Named("jqueryCategoryService")
	private JqueryCategoryService categoryService;

	/**
	 * @param searchKeyword
	 * @param searchCondition
	 * @param pageIndex
	 * @param param
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=gridList")
	public String gridList(
			@RequestParam(value = "searchKeyword", defaultValue = "") String searchKeyword,
			@RequestParam(value = "searchCondition", defaultValue = "") String searchCondition,
			JqueryCategory param, Model model, HttpServletRequest request)
			throws Exception {

		if(searchCondition.equals("name")){
			param.setCategoryName(searchKeyword);
		}
		if(searchCondition.equals("desc")){
			param.setCategoryDesc(searchKeyword);
		}
		
		Page resultPage = categoryService.getPagingList(param);

		Map<String, Object> jsonModel = new HashMap<String, Object>();

		jsonModel.put("page", resultPage.getCurrentPage() + "");
		jsonModel.put("total", resultPage.getMaxPage() + "");
		jsonModel.put("records", resultPage.getTotalCount() + "");
		jsonModel.put("rows", resultPage.getList());

		model.addAllAttributes(jsonModel);
		return "jsonView";
	}
	
	/**
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=list")
	public String list(Model model) throws Exception {
		List<JqueryCategory> categoryList = categoryService.getList();
		model.addAttribute("categoryList", categoryList);
		return "jsonView";
	}

	// TODO
	/**
	 * @param categoryId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=get")
	public String get(@RequestParam(value = "categoryId") String categoryId, Model model) throws Exception {
		JqueryCategory category = categoryService.get(categoryId);
		model.addAttribute("category", category);
		return "jsonView";
	}
	
	/**
	 * @param param
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=save")
	public String save(JqueryCategory param, Model model) throws Exception{
		if(param.getCategoryId() == null || "".equals(param.getCategoryId())) {
			model.addAttribute("categoryId", categoryService.create(param));
		}else {
			categoryService.update(param);
		}
		return "jsonView";
	}
	
	/**
	 * @param param
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=remove")
	public String remove(JqueryCategory param) throws Exception{
		categoryService.remove(param.getCategoryId());
		return "jsonView";
	}

	/**
	 * @param keyword
	 * @param condition
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=searchKeyword")
	public String searchKeyword(@RequestParam(value = "searchKeyword") String keyword, 
			@RequestParam(value = "searchCondition") String condition, Model model, HttpServletRequest request) throws Exception {
		model.addAttribute("r", categoryService.getSearchKeyword(keyword, condition));
		return "jsonView";
	}
}
