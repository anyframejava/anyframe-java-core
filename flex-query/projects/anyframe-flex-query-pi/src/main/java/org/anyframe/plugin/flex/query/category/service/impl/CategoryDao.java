/*
 * Copyright 2002-2009 the original author or authors.
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
package org.anyframe.plugin.flex.query.category.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.domain.Category;
import org.anyframe.plugin.flex.query.domain.Community;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;



@Repository("categoryDao")
public class CategoryDao extends AbstractDao {
	
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

	public int create(Category category) throws Exception {
		return create("Category", category);
	}

	public List getList(SearchVO searchVO) throws Exception {
        
        return (List) this.findList(searchVO.getTableName(), searchVO);
	}

	public Page getPagingList(SearchVO searchVO) throws Exception {
		int pageIndex = searchVO.getPageIndex();

		return this.findListWithPaging(searchVO.getTableName(), searchVO,
				pageIndex, pageSize, pageUnit);
	}

	public int remove(Category category) throws Exception {
		return remove("Category", category);
	}

	public Map saveAll(ArrayList arrayList) throws Exception {
		Map<String, Integer> resultCount = new HashMap<String, Integer>();
		
		int createRowCount = 0;
		int updateRowCount = 0;
		int removeRowCount = 0;
		
		for ( int i = 0 ; i < arrayList.size() ; i ++ ){
			Category category = (Category) arrayList.get(i);
			int status = category.getStatus();
			
			switch(status){
				case Category.INSERT_ROW : createRowCount = createRowCount + this.create(category); break;
				case Category.UPDATE_ROW : updateRowCount = updateRowCount + this.update(category); break;
				case Category.DELETE_ROW : removeRowCount = removeRowCount + this.remove(category); break;
			}
		}
		resultCount.put("INSERT", createRowCount );
		resultCount.put("UPDATE", updateRowCount );
		resultCount.put("DELETE", removeRowCount );
		return resultCount;
	}

	public int update(Category category) throws Exception {
		return update("Category", category);
	}
	
	public List<Category> getTree(SearchVO searchVO) throws Exception{
		List<Category> categoryList = (List<Category>) this.findList("CategoryForTree", new Object[]{});
		for ( int i = 0 ; i < categoryList.size() ; i ++){
			Category category = categoryList.get(i);
			searchVO.setSearchKeyword(category.getCategoryId());
			List<Community> communityList = (List<Community>) this.findList("CommunityForTree", searchVO);
			category.setChildren(communityList);
		}
		return categoryList; 
	}
}