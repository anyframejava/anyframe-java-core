/*
 * Copyright 2002-2009 the original author or authors.
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
package org.anyframe.plugin.flex.query.category.service.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.flex.query.service.FlexSearchVO;
import org.anyframe.flex.query.service.impl.FlexServiceImpl;
import org.anyframe.plugin.flex.query.category.dao.CategoryDao;
import org.anyframe.plugin.flex.query.category.service.CategoryService;
import org.anyframe.plugin.flex.query.domain.Category;
import org.springframework.flex.remoting.RemotingDestination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service("categoryService")
@RemotingDestination
@Transactional(rollbackFor = { Exception.class }, propagation = Propagation.REQUIRED)
public class CategoryServiceImpl extends FlexServiceImpl implements CategoryService {
	
	@Inject
	@Named("categoryDao")
	private CategoryDao categoryDao;

	@PostConstruct
	public void init() {
		setFlexDao(categoryDao);
	}

	public List<Category> getTree(FlexSearchVO searchVO) throws Exception {
		return this.categoryDao.getTree(searchVO);
	}
}