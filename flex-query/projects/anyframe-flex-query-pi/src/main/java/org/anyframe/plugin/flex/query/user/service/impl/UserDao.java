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
package org.anyframe.plugin.flex.query.user.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.flex.query.domain.Category;
import org.anyframe.plugin.flex.query.domain.SearchVO;
import org.anyframe.plugin.flex.query.domain.User;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public class UserDao extends QueryServiceDaoSupport {

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

	public int create(User user) {
		return super.create("flex.createUser", user);
	}

	public List<User> getList(SearchVO searchVO) {
		return super.findList("flex.findUserList", searchVO);
	}

	public Page getPagingList(SearchVO searchVO) {
		int pageIndex = searchVO.getPageIndex();
		return super.findListWithPaging("flex.findUserList", searchVO, pageIndex,
				pageSize, pageUnit);
	}

	public int remove(User user) {
		return super.remove("flex.removeUser", user);
	}

	public Map<String, Integer> saveAll(List<User> list) {
		Map<String, Integer> resultCount = new HashMap<String, Integer>();

		int createRowCount = 0;
		int updateRowCount = 0;
		int removeRowCount = 0;

		for (int i = 0; i < list.size(); i++) {
			User user = list.get(i);
			int status = user.getStatus();

			switch (status) {
			case Category.INSERT_ROW:
				createRowCount = createRowCount + this.create(user);
				break;
			case Category.UPDATE_ROW:
				updateRowCount = updateRowCount + this.update(user);
				break;
			case Category.DELETE_ROW:
				removeRowCount = removeRowCount + this.remove(user);
				break;
			}
		}
		resultCount.put("INSERT", createRowCount);
		resultCount.put("UPDATE", updateRowCount);
		resultCount.put("DELETE", removeRowCount);

		return resultCount;
	}

	public int update(User user) {
		return super.update("flex.updateUser", user);
	}

	public List<User> getTree(SearchVO searchVO) {
		String queryId = StringUtil.nullToString(searchVO.getSearchCondition());
		return super.findList("find" + queryId + "List", searchVO);
	}

}
