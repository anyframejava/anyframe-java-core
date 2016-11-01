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
package org.anyframe.plugin.xp.query.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.plugin.xp.query.moviefinder.service.MovieService;
import org.anyframe.xp.query.web.controller.AbstractXPDispatchController;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformRequest;

/**
 * Movie Controller class for operate user-defined service.
 * 
 * @author Youngmin Jo
 */
public class MovieController extends AbstractXPDispatchController {

	@Inject
	@Named("xpQueryMovieService")
	private MovieService movieService;

	public void getList(HttpPlatformRequest platformRequest, VariableList inVl,
			DataSetList inDl, VariableList outVl, DataSetList outDl)
			throws Exception {
		movieService.getList(inVl, inDl, outVl, outDl);
	}

	public void saveAll(HttpPlatformRequest platformRequest, VariableList inVl,
			DataSetList inDl, VariableList outVl, DataSetList outDl)
			throws Exception {
		movieService.saveAll(inVl, inDl, outVl, outDl);
	}

	public void create(HttpPlatformRequest platformRequest, VariableList inVl,
			DataSetList inDl, VariableList outVl, DataSetList outDl)
			throws Exception {
		DataSet ds = inDl.get("dsMovie");
		movieService.create(ds);
	}

	public void get(HttpPlatformRequest platformRequest, VariableList inVl,
			DataSetList inDl, VariableList outVl, DataSetList outDl)
			throws Exception {
		movieService.get(inVl, inDl, outVl, outDl);
	}
	
	public void update(HttpPlatformRequest platformRequest, VariableList inVl,
			DataSetList inDl, VariableList outVl, DataSetList outDl)
			throws Exception {
		movieService.update(inVl, inDl, outVl, outDl);
	}

}
