package org.anyframe.plugin.jquery.boardfinder.service;

import org.anyframe.plugin.jquery.boardfinder.domain.Board;
/**
 * Created with IntelliJ IDEA.
 * User: Jeongeun Lee
 * Date: 13. 7. 26
 * Time: 오후 1:10
 * To change this template use File | Settings | File Templates.
 */
public interface BoardService {

    void create(Board board) throws Exception;
    void remove(String postId) throws Exception;
    void update(Board board) throws Exception;
}
