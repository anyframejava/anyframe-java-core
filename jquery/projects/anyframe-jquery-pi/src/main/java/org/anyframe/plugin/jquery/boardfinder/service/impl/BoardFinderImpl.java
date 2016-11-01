package org.anyframe.plugin.jquery.boardfinder.service.impl;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.boardfinder.service.BoardFinder;
import org.anyframe.plugin.jquery.boardfinder.domain.BoardSearchVO;
import org.anyframe.plugin.jquery.boardfinder.domain.Board;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 8. 1
 * Time: 오후 8:19
 * To change this template use File | Settings | File Templates.
 */

@Service("jqueryBoardFinder")
public class BoardFinderImpl implements BoardFinder {

    @Inject
    @Named("jqueryBoardDao")
    private BoardDao boardDao;

    public List<Board> list(BoardSearchVO search) throws Exception {
        return boardDao.list(search);
    }

    public Page getPagingList(BoardSearchVO search) throws  Exception {
        return  boardDao.getPagingList(search);
    }
}
