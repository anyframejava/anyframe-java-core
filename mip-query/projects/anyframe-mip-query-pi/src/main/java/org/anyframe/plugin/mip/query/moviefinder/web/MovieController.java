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
package org.anyframe.plugin.mip.query.moviefinder.web;

import javax.inject.Inject;
import javax.inject.Named;

import org.anyframe.mip.query.web.controller.AbstractMiPDispatchController;
import org.anyframe.plugin.mip.query.moviefinder.service.MovieService;

import com.tobesoft.platform.PlatformRequest;
import com.tobesoft.platform.data.Dataset;
import com.tobesoft.platform.data.DatasetList;
import com.tobesoft.platform.data.VariableList;

/**
 * This MovieController class is a Controller class to provide movie crud and
 * genre list functionality.
 * 
 * @author Jonghoon Kim
 */
public class MovieController extends AbstractMiPDispatchController {
	@Inject
	@Named("mipQueryMovieService")
	private MovieService movieService;

	public void getList(PlatformRequest platformRequest, VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {
		movieService.getList(inVl, inDl, outVl, outDl);
	}

	public void saveAll(PlatformRequest platformRequest, VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {
		movieService.saveAll(inVl, inDl, outVl, outDl);
	}

	public void create(PlatformRequest platformRequest, VariableList inVl, DatasetList inDl, VariableList outVl,
			DatasetList outDl) throws Exception {
		Dataset ds = inDl.getDataset("dsGridMovie");
		movieService.create(ds);
	}
}
