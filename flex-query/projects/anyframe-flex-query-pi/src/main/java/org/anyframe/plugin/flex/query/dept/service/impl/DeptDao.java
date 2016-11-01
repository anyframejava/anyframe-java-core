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
package org.anyframe.plugin.flex.query.dept.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.domain.Category;
import org.anyframe.plugin.flex.query.domain.Dept;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("deptDao")
public class DeptDao extends QueryServiceDaoSupport {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public int create(Dept dept) {
		return super.create("flex.createDept", dept);
	}

	public List<Dept> getList(SearchVO searchVO) {
		return super.findList("flex.find" + searchVO.getTableName() + "List",
				searchVO);
	}

	public Page getPagingList(SearchVO searchVO) {
		int pageIndex = searchVO.getPageIndex();
		return super.findListWithPaging("flex.find" + searchVO.getTableName()
				+ "List", searchVO, pageIndex, pageSize, pageUnit);
	}

	public int remove(Dept dept) {
		return super.remove("flex.removeDept", dept);
	}

	public Map<String, Integer> saveAll(List<Dept> list) {
		Map<String, Integer> resultCount = new HashMap<String, Integer>();

		int createRowCount = 0;
		int updateRowCount = 0;
		int removeRowCount = 0;

		for (int i = 0; i < list.size(); i++) {
			Dept dept = list.get(i);
			int status = dept.getStatus();

			switch (status) {
			case Category.INSERT_ROW:
				createRowCount = createRowCount + this.create(dept);
				break;
			case Category.UPDATE_ROW:
				updateRowCount = updateRowCount + this.update(dept);
				break;
			case Category.DELETE_ROW:
				removeRowCount = removeRowCount + this.remove(dept);
				break;
			}
		}
		resultCount.put("INSERT", createRowCount);
		resultCount.put("UPDATE", updateRowCount);
		resultCount.put("DELETE", removeRowCount);

		return resultCount;
	}

	public int update(Dept dept) {
		return super.update("flex.updateDept", dept);
	}

	public List<Dept> getTree(SearchVO searchVO) {
		String queryId = StringUtil.nullToString(searchVO.getSearchCondition());
		return super.findList("flex.find" + queryId + "List", searchVO);
	}

}
