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
package org.anyframe.sample.messagesource.service;

import org.anyframe.datatype.SearchVO;
import org.anyframe.pagination.Page;
import org.anyframe.sample.messagesource.domain.MessageSource;

/**
 * This MessageSourceService class is an Interface class to provide
 * messageSource crud functionality.
 * 
 * @author Sujeong Lee
 */
public interface MessageSourceService {

	void create(MessageSource messageSource) throws Exception;

	void remove(MessageSource messageSource) throws Exception;

	void update(MessageSource messageSource) throws Exception;

	MessageSource get(MessageSource messageSource) throws Exception;

	Page getPagingList(SearchVO searchVO) throws Exception;

	void refresh() throws Exception;
}
