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
package org.anyframe.plugin.jquery.board.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.domain.Board;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This class is a DAO class to provide board crud functionality.
 *  
 * @author Sujeong Lee
 *
 */
@Repository("jqueryBoardDao")
public class BoardDao extends AbstractDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	public int create(Board board) throws Exception {
		return create("JqueryBoard", board);
	}

	public int remove(String boardId) throws Exception {
		Board board = new Board();
		board.setPostId(boardId);
		return remove("JqueryBoard", board);
	}

	public int update(Board board) throws Exception {
		return update("JqueryBoard", board);
	}

	public Board get(String boardId) throws Exception {
		Board board = new Board();
		board.setPostId(boardId);
		return (Board) findByPk("JqueryBoard", board);
	}

	public Page getPagingList(Board board, int pageIndex) throws Exception {
		return this.findListWithPaging("JqueryBoard", board, pageIndex, pageSize, pageUnit);
	}
	
	@SuppressWarnings("unchecked")
	public List<Board> getList(Board board) throws Exception {
		return (List<Board>)this.findList("JqueryBoard", board);
	}

}
