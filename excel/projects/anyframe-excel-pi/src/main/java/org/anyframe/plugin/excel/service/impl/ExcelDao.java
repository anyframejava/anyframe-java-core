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
package org.anyframe.plugin.excel.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.query.QueryService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

/**
 * This ExcelDao class is a DAO class to provide excel functionality.
 * 
 * @author Jonghoon Kim
 */
@SuppressWarnings("rawtypes")
@Repository("excelDao")
public class ExcelDao {

	@Value("#{contextProperties['pageSize'] ?: 10}")
	int pageSize;

	@Value("#{contextProperties['pageUnit'] ?: 10}")
	int pageUnit;

	@Inject
	@Named("queryService")
	private QueryService queryService;

	public List getList(String queryId, Map searchMap) throws Exception {
		return (List) queryService.find(queryId, convertParams(searchMap));
	}

	public List getPagingList(String queryId, int pageIndex, Map searchMap)
			throws Exception {
		return (List) queryService.find(queryId, convertParams(searchMap),
				pageIndex);
	}

	public int create(String queryId, Map insertMap) throws Exception {
		return queryService.create(queryId, convertParams(insertMap));
	}

	private Object[] convertParams(Map targetMap) {
		Object[] params = new Object[targetMap.size()];
		Iterator targetMapIterator = targetMap.entrySet().iterator();
		int i = 0;
		while (targetMapIterator.hasNext()) {
			Map.Entry entry = (Map.Entry) targetMapIterator.next();
			params[i] = new Object[] { entry.getKey(), entry.getValue() };
			i++;
		}
		return params;
	}
}
