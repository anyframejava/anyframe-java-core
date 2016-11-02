/*
 * Copyright 2002-2012 the original author or authors.
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
package org.anyframe.plugin.np.query.moviefinder.service;

import org.anyframe.np.query.service.NPService;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.VariableList;

/**
 * Movie Service Interface class 
 * 
 */
public interface MovieService extends NPService{
	
	public void getList(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception;
	
	public void saveAll(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception;
	
	public void create(DataSet ds) throws Exception;
	
	public void get(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception;
	
	public void update(VariableList inVl, DataSetList inDl, VariableList outVl, DataSetList outDl) throws Exception;
}