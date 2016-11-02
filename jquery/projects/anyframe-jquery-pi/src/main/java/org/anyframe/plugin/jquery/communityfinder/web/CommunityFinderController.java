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
package org.anyframe.plugin.jquery.communityfinder.web;



import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.categoryfinder.domain.Category;
import org.anyframe.plugin.jquery.categoryfinder.service.CategoryFinder;
import org.anyframe.plugin.jquery.communityfinder.domain.Community;
import org.anyframe.plugin.jquery.communityfinder.domain.CommunityTreeList;
import org.anyframe.plugin.jquery.communityfinder.service.CommunityService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This CommunityController class is a Controller class to provide community list functionality.
 * 
 * @author Jonghwan Jeong
 */

@Controller("jqueryCommunityFinderController")
@RequestMapping("/jqueryCommunityFinder.do")
public class CommunityFinderController {

	@Inject
	@Named("jqueryCommunityService")
	private CommunityService communityService;

	@Inject
	@Named("jqueryCategoryFinder")
	private CategoryFinder categoryFinder;
	
    @RequestMapping(params = "method=list")  
    public String list(Model model) throws Exception {
		List<Community> communityList = communityService.list();
		List<Category> categoryList = categoryFinder.list(null);
		List<CommunityTreeList> communityTreeListArray = new ArrayList<CommunityTreeList>();
		
		for(int i=0; i<categoryList.size();i++) {
			CommunityTreeList categoryTreeList = new CommunityTreeList();
			categoryTreeList.setCommunityId(categoryList.get(i).getCategoryId());
			categoryTreeList.setCommunityName(categoryList.get(i).getCategoryName());
			categoryTreeList.setCommunityDesc(categoryList.get(i).getCategoryDesc());
			categoryTreeList.setCommunityLevel("0");
			categoryTreeList.setParentId(null);
			categoryTreeList.setLeaf(false);
			categoryTreeList.setExpanded(true);
			categoryTreeList.setLoaded(true);
			categoryTreeList.setIsCategory("true");
			communityTreeListArray.add(categoryTreeList);
			for(int j=0; j < communityList.size() ; j++) {
				if(categoryList.get(i).getCategoryId().equals(communityList.get(j).getCategoryId())) {
					CommunityTreeList communityTreeList = new CommunityTreeList();
					communityTreeList.setCommunityId(communityList.get(j).getCommunityId());
					communityTreeList.setCommunityName(communityList.get(j).getCommunityName());
					communityTreeList.setCommunityDesc(communityList.get(j).getCommunityDesc());
					communityTreeList.setCommunityLevel("1");
					communityTreeList.setParentId(categoryList.get(i).getCategoryId());
					communityTreeList.setLeaf(true);
					communityTreeList.setExpanded(true);
					communityTreeList.setLoaded(true);
					communityTreeListArray.add(communityTreeList);
				}
			}
		}
		
		model.addAttribute("page", String.valueOf(1));
		model.addAttribute("total", String.valueOf(1));
		model.addAttribute("records", String.valueOf(50));
		model.addAttribute("rows", communityTreeListArray);
        return "jsonView";        
    }
    
	@RequestMapping(params = "method=listView")
	public String listView(Community community, Model model) throws Exception {
		model.addAttribute("community", community);
		return "jquery/communityfinder/community/list";
	}
    
}
