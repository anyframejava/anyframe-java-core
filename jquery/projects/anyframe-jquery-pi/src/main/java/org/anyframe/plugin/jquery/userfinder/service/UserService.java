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
package org.anyframe.plugin.jquery.userfinder.service;


import java.util.List;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.userfinder.domain.User;


/**
 * This class is a Interface class to provide user crud functionality.
 * 
 * @author Jonghwan Jeong
 *
 */
public interface UserService {

/*	List<Dept> list() throws Exception;
*/
	void create(User user) throws Exception;

	void remove(String userId) throws Exception;

	void update(User user) throws Exception;
	
	public List<User> list(String deptId) throws Exception;
	
	public Page getPagingList(int page) throws Exception;    
	
	User get(String userId) throws Exception;
	/*	Movie get(String id) throws Exception;


	List<String> getMovieTitleList(String title) throws Exception;

	void create(Movie movie) throws Exception;

	void update(Movie movie) throws Exception;

	void remove(String id) throws Exception;

	void removeMovieList(String[] ids) throws Exception;*/

}
