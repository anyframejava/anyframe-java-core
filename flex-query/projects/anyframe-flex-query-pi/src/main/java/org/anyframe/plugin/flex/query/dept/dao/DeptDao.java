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
package org.anyframe.plugin.flex.query.dept.dao;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.flex.query.dao.FlexDao;
import org.anyframe.flex.query.service.FlexSearchVO;
import org.anyframe.query.QueryService;
import org.anyframe.util.StringUtil;
import org.springframework.stereotype.Repository;

@Repository
public class DeptDao extends FlexDao {

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
		super.setCreateId("flex.create");
		super.setUpdateId("flex.update");
		super.setRemoveId("flex.remove");
		super.setFindPrefix("flex.find");
	}
	
	public List getTree(FlexSearchVO searchVO) throws Exception {
		String queryId = StringUtil.null2str(searchVO.getSearchCondition());
        String searchKeyword = StringUtil.null2str(searchVO.getSearchKeyword());
        
		return (List) this.findList(queryId, searchVO );
	}
}
