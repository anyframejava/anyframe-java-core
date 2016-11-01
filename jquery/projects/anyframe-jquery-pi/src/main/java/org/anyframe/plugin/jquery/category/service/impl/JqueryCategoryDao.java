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
package org.anyframe.plugin.jquery.category.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.domain.JqueryCategory;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.AbstractDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This class is a DAO class to provide category crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
@Repository("jqueryCategoryDao")
public class JqueryCategoryDao extends AbstractDao {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;
	
	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public int create(JqueryCategory category) throws Exception {
		return create("JqueryCategory", category);
	}

	public int remove(JqueryCategory category) throws Exception {
		return remove("JqueryCategory", category);
	}

	public int update(JqueryCategory category) throws Exception {
		return update("JqueryCategory", category);
	}

	public JqueryCategory get(JqueryCategory category) throws Exception {
		return (JqueryCategory) findByPk("JqueryCategory", category);
	}
	
	@SuppressWarnings("unchecked")
	public List<JqueryCategory> getList(JqueryCategory category) throws Exception{
		return (List<JqueryCategory>) findList("JqueryCategory", category);
	}

	public Page getPagingList(JqueryCategory category, int pageIndex) throws Exception {
		return this.findListWithPaging("JqueryCategory", category, pageIndex, pageSize, pageUnit);
	}
}
