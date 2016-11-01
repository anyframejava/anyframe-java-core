package org.anyframe.plugin.jquery.boardfinder.web;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.boardfinder.service.BoardFinder;
import org.anyframe.plugin.jquery.boardfinder.domain.BoardSearchVO;
import org.anyframe.plugin.jquery.boardfinder.domain.Board;

import org.anyframe.plugin.jquery.communityfinder.domain.Community;
import org.anyframe.plugin.jquery.communityfinder.service.CommunityService;

import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.Collection;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 8. 1
 * Time: 오후 8:10
 * To change this template use File | Settings | File Templates.
 */
@Controller("jqueryBoardFinderController")
@RequestMapping("/jqueryBoardFinder.do")
public class BoardFinderController {

    @Inject
    @Named("jqueryBoardFinder")
    private BoardFinder boardFinder;

    @Inject
    @Named("jqueryCommunityService")
    private CommunityService communityService;

    @ModelAttribute("communityList")
    public Collection<Community> populateCommunityList() throws Exception {
        return communityService.getDropDownCommunityList();
    }

    @RequestMapping(params = "method=listView")
    public String listView(BoardSearchVO search, Board board, Model model) throws Exception {
        model.addAttribute("search", search);
        model.addAttribute("board", board);
        return "jquery/boardfinder/board/list";
    }

    @RequestMapping(params = "method=list")
    public String list(BoardSearchVO search, Model model) throws Exception {

        Page resultPage = boardFinder.getPagingList(search);

        model.addAttribute("page", String.valueOf(resultPage.getCurrentPage()));
        model.addAttribute("total", String.valueOf(resultPage.getMaxPage()));
        model.addAttribute("records", String.valueOf(resultPage.getTotalCount()));
        model.addAttribute("rows", resultPage.getList());
        return "jsonView";
    }


}
