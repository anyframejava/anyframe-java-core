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
package org.anyframe.plugin.jquery.category.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.pagination.Page;
import org.anyframe.plugin.jquery.category.service.JqueryCategoryService;
import org.anyframe.plugin.jquery.domain.JqueryCategory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * This class is a Implementation class to provide category crud functionality.
 * 
 * @author Sujeong Lee
 *
 */
@Service("jqueryCategoryService")
@Transactional(rollbackFor = { Exception.class })
public class JqueryCategoryServiceImpl implements JqueryCategoryService{

	@Inject
	@Named("jqueryCategoryDao")
	private JqueryCategoryDao categoryDao;

	public String create(JqueryCategory category) throws Exception {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS", new Locale("ko", "KR"));
		String categoryId = "CATEGORY-" + formatter.format(new Date());
		category.setCategoryId(categoryId);
		category.setRegDate((new SimpleDateFormat("yyyy/MM/dd")).format(new Date()));
		categoryDao.create(category);
		return categoryId;
	}

	public int update(JqueryCategory category) throws Exception {
		return categoryDao.update(category);
	}

	public int remove(String categoryId) throws Exception {
		JqueryCategory category = new JqueryCategory();
		category.setCategoryId(categoryId);
		return categoryDao.remove(category);
	}

	public JqueryCategory get(String categoryId) throws Exception {
		JqueryCategory param = new JqueryCategory();
		param.setCategoryId(categoryId);
		return categoryDao.get(param);
	}

	public List<JqueryCategory> getList() throws Exception {
		return categoryDao.getList(new JqueryCategory());
	}
	
	public Page getPagingList(JqueryCategory category) throws Exception {
		return categoryDao.getPagingList(category, category.getPage());
	}
	
	public List<String> getSearchKeyword(String keyword, String condition) throws Exception{
		List<String> r = null;
		JqueryCategory param = new JqueryCategory();
		if("name".equals(condition)) {
			param.setCategoryName(keyword);
		}else if("desc".equals(condition)) {
			param.setCategoryDesc(keyword);
		}else{
			throw new Exception("condition is null");
		}
		List<JqueryCategory> list = categoryDao.getList(param);
		int listSize = 0;
		if(list != null) {
			listSize = list.size();
			r = new ArrayList<String>();
			for(int i=0;i<listSize;i++){
				JqueryCategory item = (JqueryCategory)list.get(i);
				if("name".equals(condition)) {
					r.add(item.getCategoryName());
				}else if("desc".equals(condition)) {
					r.add(item.getCategoryDesc());
				}
			}
		}
		return r;
	}
}
