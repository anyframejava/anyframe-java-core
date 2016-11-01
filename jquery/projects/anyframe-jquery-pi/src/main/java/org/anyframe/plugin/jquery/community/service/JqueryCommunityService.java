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
package org.anyframe.plugin.jquery.community.service;

import java.util.List;
import java.util.Map;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.domain.JqueryCommunity;

/**
 * This class is a Interface class to provide community crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
public interface JqueryCommunityService {
	/**
	 * @param community
	 * @return
	 * @throws Exception
	 */
	String create(JqueryCommunity community) throws Exception;
	
	/**
	 * @param community
	 * @return
	 * @throws Exception
	 */
	int update(JqueryCommunity community) throws Exception;
	
	/**
	 * @param community
	 * @return
	 * @throws Exception
	 */
	int updateCell(JqueryCommunity community) throws Exception;
	
	/**
	 * @param communityId
	 * @return
	 * @throws Exception
	 */
	int remove(String communityId) throws Exception;
	
	/**
	 * @param communityId
	 * @return
	 * @throws Exception
	 */
	JqueryCommunity get(String communityId) throws Exception;
	
	/**
	 * @param community
	 * @param pageIndex
	 * @return
	 * @throws Exception
	 */
	Page getPagingList(JqueryCommunity community) throws Exception;
	
	/**
	 * @return
	 * @throws Exception
	 */
	List<JqueryCommunity> getList() throws Exception;
	
	/**
	 * @return
	 * @throws Exception
	 */
	List<Map<String, String>> getTreeList() throws Exception;
	
	/**
	 * @param keyword
	 * @param condition
	 * @param categoryId
	 * @return
	 * @throws Exception
	 */
	List<String> getSearchKeyword(String keyword, String condition, String categoryId) throws Exception;
}
