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
package org.anyframe.flex.query.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.anyframe.flex.query.dao.FlexDao;
import org.anyframe.flex.query.domain.FlexDataGrid;
import org.anyframe.flex.query.service.FlexSearchVO;
import org.anyframe.flex.query.service.FlexService;
import org.anyframe.pagination.Page;

/**
 * 
 * @author Jonghoon, Kim
 * 
 */
public class FlexServiceImpl implements FlexService {

	protected FlexDao flexDao;

	public void setFlexDao(FlexDao flexDao) {
		this.flexDao = flexDao;
	}

	public int create(FlexDataGrid flexBaseObject) throws Exception {

		return flexDao.create(flexBaseObject);
	}

	public List getList(FlexSearchVO searchVO) throws Exception {

		return flexDao.getList(searchVO);
	}

	public Page getPagingList(FlexSearchVO searchVO) throws Exception {

		return flexDao.getPagingList(searchVO);
	}

	public int remove(FlexDataGrid flexBaseObject) throws Exception {

		return flexDao.remove(flexBaseObject);
	}

	public Map saveAll(ArrayList arrayList) throws Exception {

		return flexDao.saveAll(arrayList);
	}

	public int update(FlexDataGrid flexBaseObject) throws Exception {

		return flexDao.update(flexBaseObject);
	}
}
