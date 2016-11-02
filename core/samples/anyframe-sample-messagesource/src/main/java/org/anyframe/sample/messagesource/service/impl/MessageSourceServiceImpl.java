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
import org.anyframe.sample.messagesource.domain.MessageSource;
import org.anyframe.sample.messagesource.service.MessageSourceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * This MessageSourceServiceImpl class is an Implementation class to provide
 * messageSource crud functionality.
 * 
 * @author Sujeong Lee
 */
@Service("messageSourceService")
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class MessageSourceServiceImpl implements MessageSourceService {

	@Inject
	@Named("messageSourceDao")
	private MessageSourceDao messageSourceDao;

	public void update(MessageSource messageSource) throws Exception {
		this.messageSourceDao.update(messageSource);
	}

	public MessageSource get(MessageSource messageSource) throws Exception {
		return this.messageSourceDao.get(messageSource);
	}

	public void remove(MessageSource messageSource) throws Exception {
		this.messageSourceDao.remove(messageSource);
	}

	public void create(MessageSource messageSource) throws Exception {
		this.messageSourceDao.create(messageSource);
	}

	public Page getPagingList(SearchVO searchVO) throws Exception {
		return this.messageSourceDao.getPagingList(searchVO);
	}

	public void refresh() throws Exception {
		this.messageSourceDao.refresh();
	}
}
