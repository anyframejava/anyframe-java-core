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
package anyframe.sample.cache.sales.service.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import anyframe.core.cache.ICacheService;
import anyframe.core.generic.service.impl.GenericServiceImpl;
import anyframe.sample.cache.sales.dao.CategoryDao;
import anyframe.sample.cache.sales.service.CategoryService;
import anyframe.sample.domain.Category;

@Service("categoryService")
public class CategoryServiceImpl extends GenericServiceImpl<Category, String>
		implements CategoryService {
	@Resource
	ICacheService cacheService;
	@Resource
	CategoryDao categoryDao;
	
	@PostConstruct
	public void initialize() throws Exception {
		super.setGenericDao(categoryDao);
		
		Collection list = this.categoryDao.getList();
		Iterator itr = list.iterator();

		Map categoryList = new HashMap();
		while (itr.hasNext()) {
			Category category = (Category) itr.next();
			categoryList.put(category.getCategoryNo(), category);
		}

		cacheService.putInCache("categoryList", categoryList);
	}

	public Map getList() throws Exception {
		System.out
				.println("Try to get categories from 'categoryList' cache instead of DB.");
		return (Map) cacheService.getFromCache("categoryList");
	}

	public void create(Category category) throws Exception {
		categoryDao.create(category);

		Map categoryList = (HashMap) cacheService.getFromCache("categoryList");
		categoryList.put(category.getCategoryNo(), category);
		cacheService.putInCache("categoryList", categoryList);
		System.out
				.println("Put a new category into 'categoryList' cache successfully.");
	}

	public void remove(String categoryNo) throws Exception {
		categoryDao.remove(categoryNo);

		Map categoryList = (HashMap) cacheService.getFromCache("categoryList");
		categoryList.remove(categoryNo);
		cacheService.putInCache("categoryList", categoryList);
		System.out
				.println("Remove a new category from 'categoryList' cache successfully.");
	}
}