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
package org.anyframe.plugin.jquery.board.web;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.board.service.JqueryBoardService;
import org.anyframe.plugin.jquery.community.service.JqueryCommunityService;
import org.anyframe.plugin.jquery.domain.JqueryBoard;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * This BoardController class is a Controller class to provide board crud
 * functionality.
 * 
 * @author Sujeong Lee
 */
@Controller("jqueryBoardController")
@RequestMapping("/jqueryBoard.do")
public class JqueryBoardController {

	public static Log logger = LogFactory.getLog(JqueryBoardController.class);
	
	@Inject
	@Named("jqueryBoardService")
	private JqueryBoardService boardService;

	@Inject
	@Named("jqueryCommunityService")
	private JqueryCommunityService communityService;
	
	/**
	 * @param searchKeyword
	 * @param searchCondition
	 * @param pageIndex
	 * @param communityId
	 * @param board
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=list")
	public String list(
			@RequestParam(value = "searchKeyword", defaultValue = "") String searchKeyword,
			@RequestParam(value = "searchCondition", defaultValue = "") String searchCondition,
			@RequestParam(value = "communityId", required = false) String communityId,
			JqueryBoard board, Model model, HttpServletRequest request)
			throws Exception {

		if(searchCondition.equals("title")){
			board.setTitle(searchKeyword);
		}
		if(searchCondition.equals("contents")){
			board.setContents(searchKeyword);
		}
		
		if(communityId != null) board.setCommunityId(communityId);
		
		Page resultPage = boardService.getPagingList(board);

		Map<String, Object> jsonModel = new HashMap<String, Object>();

		jsonModel.put("page", resultPage.getCurrentPage() + "");
		jsonModel.put("total", resultPage.getMaxPage() + "");
		jsonModel.put("records", resultPage.getTotalCount() + "");
		jsonModel.put("rows", resultPage.getList());

		model.addAllAttributes(jsonModel);
		return "jsonView";
	}

	/**
	 * @param board
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=update")
	public String update(JqueryBoard board, Model model, HttpServletRequest request)
			throws Exception {
		
		logger.debug("board.getCommunityId()=" + board.getCommunityId());
		logger.debug("board.getCommunityName()=" + board.getCommunityName());
		logger.debug("board.getPostId()=" + board.getPostId());
		logger.debug("board.getTitle()=" + board.getTitle());
		
		boardService.update(board);
		return "jsonView";
	}

	/**
	 * @param session
	 * @param fileRefId
	 * @param board
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=create")
	public String create(HttpSession session, @RequestParam(value = "refId") String fileRefId, JqueryBoard board, Model model, HttpServletRequest request)
			throws Exception {
		board.setRegId(session.getAttribute("regId").toString());
		boardService.create(board, fileRefId);
		return "jsonView";
	}
	
	
	/**
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=tabMain")
	public String tabMain(Model model, HttpServletRequest request)
			throws Exception {
		model.addAttribute("communityList", communityService.getList());
		model.addAttribute("treeList", communityService.getTreeList());
		return "jquery/tabMain";
	}
	
	/**
	 * @param gridId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=getGridType1")
	public String getGridType1(@RequestParam( value = "gridId") String gridId, Model model) throws Exception {
		model.addAttribute("gridId", gridId);
		return "jquery/grid1";
	}
	
	/**
	 * @param gridId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=getGridType2")
	public String getGridType2(@RequestParam( value = "gridId") String gridId, Model model) throws Exception {
		model.addAttribute("gridId", gridId);
		return "jquery/grid2";
	}
	
	/**
	 * @param postId
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=remove")
	public String remove(String postId, Model model, HttpServletRequest request)
			throws Exception {
		boardService.remove(postId);
		return "jsonView";
	}

	// TODO
	/**
	 * @param postId
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(params = "method=get")
	public String get(@RequestParam(value = "postId") String postId,
			Model model, HttpServletRequest request) throws Exception {
		model.addAttribute("board", boardService.get(postId));
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
			@RequestParam(value = "searchCondition") String condition, 
			@RequestParam(value = "communityId", defaultValue = "") String communityId, 
			Model model, HttpServletRequest request) throws Exception {
		model.addAttribute("r", boardService.getSearchKeyword(keyword, condition, communityId));
		return "jsonView";
	}

}
