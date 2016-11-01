package org.anyframe.plugin.flex.query.board.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.domain.Board;
import org.anyframe.plugin.flex.query.domain.Category;
import org.anyframe.plugin.flex.query.domain.SearchVO;

public interface BoardService {
	Page getPagingList(SearchVO searchVO) throws Exception;
	
	int create(Board board) throws Exception;
	
	int update(Board board) throws Exception;
	
	int remove(Board board) throws Exception;
	
	Map saveAll(ArrayList arrayList) throws Exception;
	
	List getList(SearchVO searchVO) throws Exception;
}
