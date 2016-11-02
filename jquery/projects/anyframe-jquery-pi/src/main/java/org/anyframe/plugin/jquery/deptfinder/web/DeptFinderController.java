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
package org.anyframe.plugin.jquery.deptfinder.web;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.jquery.deptfinder.domain.Dept;
import org.anyframe.plugin.jquery.deptfinder.service.DeptService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * This DeptController class is a Controller class to provide dept list functionality.
 * 
 * @author Jonghwan Jeong
 */

@Controller("jqueryDeptFinderController")
@RequestMapping("/jqueryDeptFinder.do")
public class DeptFinderController {

	@Inject
	@Named("jqueryDeptService")
	private DeptService deptService;

	@RequestMapping(params = "method=list")
	public String list(Model model) throws Exception {
		List<Dept> deptList = deptService.list();
 		ArrayList<String> parentDeptList = new ArrayList<String>();
 		ArrayList<String> expandedDeptList = new ArrayList<String>();
		
 		//부모  List 생성
		for(int i=0; i < deptList.size(); i++) {
			String parentDept = deptList.get(i).getParentDept();
			if(!parentDeptList.contains(parentDept)) {
			parentDeptList.add(parentDept);
			}
		}

		for(int i=0; i < deptList.size(); i++) {
			
			//모든 노드에 대해 Loaded속성 적용
			deptList.get(i).setLoaded(true);
			
			//부모가 있는지 여부를 체크 후 Leaf 및 Expanded속성 결정
			if(parentDeptList.contains(deptList.get(i).getDeptId())) {
				deptList.get(i).setLeaf(false);
			} else {
				deptList.get(i).setLeaf(true);
			}
		}
		
		
		//일부 데이터에 대한 expanded를 설정(데이터 중 가장 최초로 level이 0인 데이터 및 그 자식 데이터)
		for(int i=0; i < deptList.size(); i++) {
 			if("0".equals(deptList.get(i).getDeptLevel())) {
 				expandedDeptList.add(deptList.get(i).getDeptId());
				deptList.get(i).setExpanded(true);
 				break;
 			}
 		}
		for(int j=0; j< deptList.size(); j++) {
			if(expandedDeptList.contains(deptList.get(j).getParentDept())) {
				expandedDeptList.add(deptList.get(j).getDeptId());
				deptList.get(j).setExpanded(true);
			}
		}
		
		
		
		model.addAttribute("page", String.valueOf(1));
		model.addAttribute("total", String.valueOf(1));
		model.addAttribute("records", String.valueOf(50));
		model.addAttribute("rows", deptList);
		return "jsonView";
	}
}
