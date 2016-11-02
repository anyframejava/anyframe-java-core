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
package org.anyframe.plugin.flex.query.board.service.impl;

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

	public Map<String, Integer> saveAll(List<Board> list) throws Exception {
		return boardDao.saveAll(list);
	}

	public List<Board> getList(SearchVO searchVO) throws Exception {
		return boardDao.getList(searchVO);
	}
}
