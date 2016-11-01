package org.anyframe.plugin.flex.query.board.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.domain.Board;
import org.anyframe.plugin.flex.query.domain.Community;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("boardDao")
public class BoardDao extends AbstractDao{

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
		super.setCreateId("flex.create");
		super.setUpdateId("flex.update");
		super.setRemoveId("flex.remove");
		super.setFindPrefix("flex.find");
	}
	
	
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	public int create(Board board) throws Exception {
		return create("Board", board);
	}

	public List getList(SearchVO searchVO) throws Exception {
        
        return (List) this.findList(searchVO.getTableName(), searchVO);
	}

	public Page getPagingList(SearchVO searchVO) throws Exception {
		int pageIndex = searchVO.getPageIndex();

		return this.findListWithPaging(searchVO.getTableName(), searchVO,
				pageIndex, pageSize, pageUnit);
	}

	public int remove(Board board) throws Exception {
		return remove("Board", board);
	}

	public Map saveAll(ArrayList arrayList) throws Exception {
		Map<String, Integer> resultCount = new HashMap<String, Integer>();
		
		int createRowCount = 0;
		int updateRowCount = 0;
		int removeRowCount = 0;
		
		for ( int i = 0 ; i < arrayList.size() ; i ++ ){
			Board board = (Board) arrayList.get(i);
			int status = board.getStatus();
			
			switch(status){
				case Board.INSERT_ROW : createRowCount = createRowCount + this.create(board); break;
				case Board.UPDATE_ROW : updateRowCount = updateRowCount + this.update(board); break;
				case Board.DELETE_ROW : removeRowCount = removeRowCount + this.remove(board); break;
			}
		}
		resultCount.put("INSERT", createRowCount );
		resultCount.put("UPDATE", updateRowCount );
		resultCount.put("DELETE", removeRowCount );
		return resultCount;
	}

	public int update(Board board) throws Exception {
		return update("Board", board);
	}
}
