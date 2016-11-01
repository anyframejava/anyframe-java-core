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
package anyframe.sample.query.sales.service.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import anyframe.core.generic.service.impl.GenericServiceImpl;
import anyframe.sample.domain.Category;
import anyframe.sample.query.sales.dao.CategoryDao;
import anyframe.sample.query.sales.service.CategoryService;
import anyframe.sample.query.sales.service.ProductService;

@Service("categoryService")
public class CategoryServiceImpl extends GenericServiceImpl<Category, String>
		implements CategoryService {
	@Resource
	ProductService productService;
	@Resource
	MessageSource messageSource;
	@Resource
	CategoryDao categoryDao;

	@PostConstruct
	public void initialize() {
		super.setGenericDao(categoryDao);
	}

	public List getDropDownCategoryList() throws Exception {
		return categoryDao.getDropDownCategoryList();
	}
}