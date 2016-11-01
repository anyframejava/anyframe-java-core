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
package org.anyframe.plugin.flex.query.dept.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.domain.Category;
import org.anyframe.plugin.flex.query.domain.Dept;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository
public class DeptDao extends AbstractDao {

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

	public int create(Dept dept) throws Exception {
		return create("Dept", dept);
	}

	public List getList(SearchVO searchVO) throws Exception {
        return (List) this.findList(searchVO.getTableName(), searchVO);
	}

	public Page getPagingList(SearchVO searchVO) throws Exception {
		int pageIndex = searchVO.getPageIndex();

		return this.findListWithPaging(searchVO.getTableName(), searchVO,
				pageIndex, pageSize, pageUnit);
	}

	public int remove(Dept dept) throws Exception {
		return remove("Dept", dept);
	}

	public Map saveAll(ArrayList arrayList) throws Exception {
		Map<String, Integer> resultCount = new HashMap<String, Integer>();
		
		int createRowCount = 0;
		int updateRowCount = 0;
		int removeRowCount = 0;
		
		for ( int i = 0 ; i < arrayList.size() ; i ++ ){
			Dept dept = (Dept) arrayList.get(i);
			int status = dept.getStatus();
			
			switch(status){
				case Category.INSERT_ROW : createRowCount = createRowCount + this.create(dept); break;
				case Category.UPDATE_ROW : updateRowCount = updateRowCount + this.update(dept); break;
				case Category.DELETE_ROW : removeRowCount = removeRowCount + this.remove(dept); break;
			}
		}
		resultCount.put("INSERT", createRowCount );
		resultCount.put("UPDATE", updateRowCount );
		resultCount.put("DELETE", removeRowCount );
		return resultCount;
	}

	public int update(Dept dept) throws Exception {
		return update("Dept", dept);
	}
	
	public List getTree(SearchVO searchVO) throws Exception {
		String queryId = StringUtil.null2str(searchVO.getSearchCondition());
        String searchKeyword = StringUtil.null2str(searchVO.getSearchKeyword());
        
		return (List) this.findList(queryId, searchVO );
	}
	
	
}
