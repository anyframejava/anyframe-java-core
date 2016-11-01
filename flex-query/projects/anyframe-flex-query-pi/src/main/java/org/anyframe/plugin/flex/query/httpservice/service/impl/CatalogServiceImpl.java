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
package org.anyframe.plugin.flex.query.httpservice.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.flex.query.dao.FlexDao;
import org.anyframe.plugin.flex.query.httpservice.service.CatalogService;
import org.springframework.stereotype.Service;

@Service("catalogService")
public class CatalogServiceImpl implements CatalogService {

	@Inject
	@Named("flexDao")
	private FlexDao flexDao;

	public List<Map<String, Object>> getProduct() throws Exception {
		List<Map<String, Object>> results = flexDao.getList(
				"findFlexQueryProductList", new HashMap<String, Object>());
		return results;
	}

}
