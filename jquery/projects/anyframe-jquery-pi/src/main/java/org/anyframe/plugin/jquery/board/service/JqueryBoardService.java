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
package org.anyframe.plugin.jquery.board.service;

import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.domain.JqueryBoard;

/**
 * This class is a Interface class to provide board crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
public interface JqueryBoardService {
	/**
	 * @param board
	 * @param pageIndex
	 * @return
	 * @throws Exception
	 */
	Page getPagingList(JqueryBoard board) throws Exception;
	
	/**
	 * @param board
	 * @param fileRefId
	 * @return
	 * @throws Exception
	 */
	int create(JqueryBoard board, String fileRefId) throws Exception;
	
	/**
	 * @param board
	 * @return
	 * @throws Exception
	 */
	int update(JqueryBoard board) throws Exception;
	
	/**
	 * @param boardId
	 * @return
	 * @throws Exception
	 */
	int remove(String boardId) throws Exception;
	
	/**
	 * @param boardId
	 * @return
	 * @throws Exception
	 */
	JqueryBoard get(String boardId) throws Exception;
	
	/**
	 * @param keyword
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	List<String> getSearchKeyword(String keyword, String condition, String communityId) throws Exception;
	
}
