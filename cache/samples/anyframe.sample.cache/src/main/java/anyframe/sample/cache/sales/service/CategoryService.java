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
package anyframe.sample.cache.sales.service;

import java.util.Map;

import anyframe.core.generic.service.GenericService;
import anyframe.sample.domain.Category;

public interface CategoryService extends GenericService<Category, String> {

	void create(Category category) throws Exception;

	void remove(String categoryNo) throws Exception;

	Map getList() throws Exception;

}