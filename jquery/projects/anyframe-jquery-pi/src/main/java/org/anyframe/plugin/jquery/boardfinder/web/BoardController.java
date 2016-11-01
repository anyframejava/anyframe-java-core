package org.anyframe.plugin.jquery.boardfinder.web;

import org.anyframe.plugin.jquery.boardfinder.domain.Board;
import org.anyframe.plugin.jquery.boardfinder.service.BoardService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import javax.inject.Named;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 26
 * Time: 오후 1:10
 * To change this template use File | Settings | File Templates.
 */

@Controller("jqueryBoardController")
@RequestMapping("/jqueryBoard.do")
public class BoardController {

    @Inject
    @Named("jqueryBoardService")
    private BoardService boardService;

    @RequestMapping(params = "method=create")
    public String create(Board board) throws Exception {
        boardService.create(board);
        return "jsonView";
    }

    @RequestMapping(params = "method=remove")
    public String remove(String postId) throws Exception {
        boardService.remove(postId);
        return "jsonView";
    }

    @RequestMapping(params = "method=update")
    public String update(Board board) throws Exception {
        boardService.update(board);
        return "jsonView";
    }

}
