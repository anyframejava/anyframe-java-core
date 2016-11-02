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
package org.anyframe.plugin.iam.director.service;

import java.util.List;

import org.anyframe.datatype.SearchVO;
import org.anyframe.plugin.iam.domain.Director;

/**
 * The DirectorService class is an Interface class to provide CRUD functions about
 * Director domain.
 * 
 * @author Youngmin Jo
 */
public interface DirectorService {
	
	public void create(Director director) throws Exception;
	
	List<Director> getList(SearchVO searchVO) throws Exception;
	
	Director get(String directorId) throws Exception;
	
	void update(Director director) throws Exception;
	
	void remove(String directorId) throws Exception;
}
