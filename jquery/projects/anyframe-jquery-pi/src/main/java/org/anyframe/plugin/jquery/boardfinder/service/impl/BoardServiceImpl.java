package org.anyframe.plugin.jquery.boardfinder.service.impl;

import org.anyframe.plugin.jquery.boardfinder.domain.Board;
import org.anyframe.plugin.jquery.boardfinder.service.BoardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.inject.Named;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 26
 * Time: 오후 1:11
 * To change this template use File | Settings | File Templates.
 */
@Service("jqueryBoardService")
@Transactional(rollbackFor = { Exception.class })
public class BoardServiceImpl implements BoardService {

    @Inject
    @Named("jqueryBoardDao")
    private BoardDao boardDao;

    public void create(Board board) throws Exception {
        board.setRegId("testID");
        boardDao.create(board);
    }

    public void remove(String postId) throws Exception {
        boardDao.remove(postId);
    }

    public void update(Board board) throws Exception {
        boardDao.update(board);
    }

}
