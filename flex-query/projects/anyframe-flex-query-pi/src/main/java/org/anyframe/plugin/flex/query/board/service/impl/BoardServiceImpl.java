package org.anyframe.plugin.flex.query.board.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.board.service.BoardService;
import org.anyframe.plugin.flex.query.domain.Board;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("boardService")
@RemotingDestination
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class BoardServiceImpl implements BoardService{

	@Inject
	@Named("boardDao")
	private BoardDao boardDao;
	
	public Page getPagingList(SearchVO searchVO) throws Exception {
		return boardDao.getPagingList(searchVO);
	}

	public int create(Board board) throws Exception {
		return boardDao.create(board);
	}

	public int update(Board board) throws Exception {
		return boardDao.update(board);
	}

	public int remove(Board board) throws Exception {
		return boardDao.remove(board);
	}

	public Map saveAll(ArrayList arrayList) throws Exception {
		return boardDao.saveAll(arrayList);
	}

	public List getList(SearchVO searchVO) throws Exception {
		return boardDao.getList(searchVO);
	}
}
