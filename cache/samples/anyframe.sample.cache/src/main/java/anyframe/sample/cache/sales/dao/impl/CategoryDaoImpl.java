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
package anyframe.sample.cache.sales.dao.impl;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Repository;
import org.springframework.util.ClassUtils;

import anyframe.core.generic.dao.query.GenericDaoQuery;
import anyframe.core.query.IQueryService;
import anyframe.sample.cache.sales.dao.CategoryDao;
import anyframe.sample.domain.Category;

@Repository("categoryDao")
public class CategoryDaoImpl extends GenericDaoQuery<Category, String> implements CategoryDao {
	
	@Resource
	IQueryService queryService;

    public CategoryDaoImpl() {
        super(Category.class);
    }
    
    @PostConstruct
    public void initialize() {
    	super.setQueryService(queryService);
    }
    
    public Collection getList() throws Exception{
    	Category category = new Category();
        return this.findList(ClassUtils.getShortName(getPersistentClass()), category);
    }  
}
