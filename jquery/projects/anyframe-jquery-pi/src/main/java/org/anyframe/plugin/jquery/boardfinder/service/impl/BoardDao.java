package org.anyframe.plugin.jquery.boardfinder.service.impl;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.boardfinder.domain.BoardSearchVO;
import org.anyframe.plugin.jquery.boardfinder.domain.Board;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 26
 * Time: 오후 1:12
 * To change this template use File | Settings | File Templates.
 */
@Repository("jqueryBoardDao")
public class BoardDao extends QueryServiceDaoSupport {

    @Value("#{contextProperties['pageSize'] ?: 5}")
    int pageSize;

    @Value("#{contextProperties['pageUnit'] ?: 5}")
    int pageUnit;

    @Inject
    public void setQueryService(QueryService queryService) {
        super.setQueryService(queryService);
    }

    public List<Board> list(BoardSearchVO search) throws Exception {
        return super.findList("findJqueryBoardList", search);
    }

    public void create(Board board) throws Exception {
        super.create("createJqueryBoard", board);
    }

    public void remove(String postId) {
        Board board = new Board();
        board.setPostId(postId);
        super.remove("removeJqueryBoard", board);
    }

    public void update(Board board) {
        super.update("updateJqueryBoard", board);
    }

    public Page getPagingList(BoardSearchVO search) {
        return super.findListWithPaging("findJqueryBoardList", search, search.getPage(), pageSize, pageUnit);
    }

}



