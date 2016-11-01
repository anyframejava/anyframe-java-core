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
package org.anyframe.plugin.jquery.userfinder.service.impl;


import java.util.List;
import javax.inject.Inject;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.userfinder.domain.User;
import org.anyframe.query.QueryService;
import org.anyframe.query.dao.QueryServiceDaoSupport;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This UserDao class is a DAO class to provide user crud functionality.
 * 
 * @author jonghwan jeong
 */
@Repository("jqueryUserDao")
public class UserDao extends QueryServiceDaoSupport {

	//Velocity-Support-contextProperties-START
	@Value("#{contextProperties['pageSize'] ?: 5}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 5}")
	int pageUnit;
	//Velocity-Support-contextProperties-END

	@Inject
	public void setQueryService(QueryService queryService) {
		super.setQueryService(queryService);
	}
	
/*	public List<User> list() throws Exception {
        Object[] args = new Object[0];		            

        return super.findList("findJqueryUserList", args);
	}*/

	public void create(User user) {
		super.create("createJqueryUser", user);
	}

	public void remove(String userId) {
		User user = new User();
		user.setUserId(userId);
		super.remove("removeJqueryUser", user);
	}

	public void update(User user) {
		super.update("updateJqueryUser", user);
	}
	
	public List<User> list(String deptId) throws Exception {
        Object[] args = new Object[1];		            
		args[0] = new Object[] { "deptId", deptId };

        return super.findList("findJqueryUserList", args);
	}
	
	public Page getPagingList(int page) throws Exception {
        int pageIndex = page;
        Object[] args = new Object[1];		            

        return super.findListWithPaging("findJqueryUserPagingList", args, pageIndex, pageSize, pageUnit);
	}
	
	public User get(String userId) {
		User user = new User();
		user.setUserId(userId);
		return super.findByPk("findJqueryUserByPk", user);
	}
	/*
	public Movie get(String movieId) {
		Movie movie = new Movie();
		movie.setMovieId(movieId);
		return super.findByPk("findJqueryMovieByPk", movie);
	}

	public Page getPagingList(MovieSearchVO search) {
		return super.findListWithPaging("findJqueryMovieList", search, search
				.getPage(), pageSize, pageUnit);
	}

	public List<String> getMovieTitleList(String keyword) {
		return super.getQueryService().find("findMovieTitle",
				new Object[] { new Object[] { "keyword", keyword } });
	}

	public List<Movie> getListByCategory(MovieSearchVO search) {
		return super.findList("findMovieByCategoryList", search);
	}
*/
}
