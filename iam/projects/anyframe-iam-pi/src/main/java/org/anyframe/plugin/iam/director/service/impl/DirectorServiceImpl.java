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
package org.anyframe.plugin.iam.director.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.iam.director.service.DirectorService;
import org.anyframe.plugin.iam.domain.Director;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * The DirectorServiceImpl class is an implementation class to provide CRUD functions about 
 *  Director domain.
 * 
 * @author Youngmin Jo
 *
 */
@Service("directorService")
@Transactional(rollbackFor = { Exception.class}, propagation = Propagation.REQUIRED)
public class DirectorServiceImpl implements DirectorService{
	
	@Inject
	@Named("directorDao")
	private DirectorDao directorDao;
	
	public void create(Director director) throws Exception{
		directorDao.create(director);
	}
	
	public void remove(String directorId) throws Exception{
		directorDao.remove(directorId);
	}
	
	public void update(Director director) throws Exception{
		directorDao.update(director);
	}
	
	public Director get(String directorId) throws Exception{
		return directorDao.get(directorId);
	}
	
	public List<Director> getList(SearchVO searchVO) throws Exception{
		return directorDao.getList(searchVO);
	}
}
