package org.anyframe.plugin.jquery.boardfinder.service;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.boardfinder.domain.Board;
import org.anyframe.plugin.jquery.boardfinder.domain.BoardSearchVO;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 8. 1
 * Time: 오후 8:19
 * To change this template use File | Settings | File Templates.
 */
public interface BoardFinder {

    Page getPagingList(BoardSearchVO search) throws  Exception;
    List<Board> list(BoardSearchVO search) throws Exception;
}
