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
package org.anyframe.sample.messagesource.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.anyframe.sample.messagesource.domain.MessageSource;
import org.anyframe.spring.message.DatabaseMessageSource;
import org.anyframe.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This MessageSourceDao class with QueryService is a DAO class to provide
 * messageSource crud functionality.
 * 
 * @author Sujeong Lee
 */
@Repository("messageSourceDao")
public class MessageSourceDao extends QueryServiceDaoSupport {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	@Inject
	@Named("databaseMessageSource")
	DatabaseMessageSource databaseMessageSource;

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}

	public void create(MessageSource messageSource) {
		super.create("createMessageSource", messageSource);
	}

	public void remove(MessageSource messageSource) {
		super.remove("removeMessageSource", messageSource);
	}

	public void update(MessageSource messageSource) {
		super.update("updateMessageSource", messageSource);
	}

	public MessageSource get(MessageSource messageSource) {
		return super.findByPk("findMessageSourceByPk", messageSource);
	}

	public Page getPagingList(SearchVO searchVO) {

		String searchCondition = StringUtil.nullToString(searchVO
				.getSearchCondition());
		String searchKeyword = StringUtil.nullToString(searchVO
				.getSearchKeyword());

		Object[] args = new Object[4];
		args[0] = "condition=" + searchCondition;
		args[1] = "keywordStr='%" + searchKeyword + "%'";

		return super.findListWithPaging("findMessageSourceList", args, searchVO
				.getPageIndex(), pageSize, pageUnit);
	}

	public void refresh() {
		databaseMessageSource.refresh();
	}
}
