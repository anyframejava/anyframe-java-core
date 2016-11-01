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
import org.anyframe.xp.query.web.handler.XPRequestHandler;
import org.anyframe.xp.query.web.handler.XPResponseHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tobesoft.xplatform.data.DataSet;
import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Movie Controller class for operate user-defined service.
 * 
 * @author Youngmin Jo
 */
@Controller("xpMovieController")
@RequestMapping("/xpQueryMovie.do")
public class MovieController {

	@Inject
	@Named("xpQueryMovieService")
	private MovieService movieService;

	@RequestMapping(params = "method=getList")
	@ResponseBody
	public XPResponseHandler getList(
			@RequestBody XPRequestHandler requestHandler) throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();

		try {
			movieService.getList(inputVariableList, inputDataSetList,
					outputVariableList, outputDataSetList);

			return new XPResponseHandler(outputDataSetList, outputVariableList);
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}

	}

	@ResponseBody
	@RequestMapping(params = "method=saveAll")
	public XPResponseHandler saveAll(
			@RequestBody XPRequestHandler requestHandler) throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();

		try {
			movieService.saveAll(inputVariableList, inputDataSetList,
					outputVariableList, outputDataSetList);

			return new XPResponseHandler(outputDataSetList, outputVariableList);
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	@ResponseBody
	@RequestMapping(params = "method=create")
	public XPResponseHandler create(@RequestBody XPRequestHandler requestHandler)
			throws Exception {
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();

		DataSet ds = inputDataSetList.get("dsMovie");

		try {
			movieService.create(ds);
			return new XPResponseHandler(outputDataSetList, outputVariableList);
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	@ResponseBody
	@RequestMapping(params = "method=get")
	public XPResponseHandler get(@RequestBody XPRequestHandler requestHandler)
			throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();

		try {
			movieService.get(inputVariableList, inputDataSetList,
					outputVariableList, outputDataSetList);

			return new XPResponseHandler(outputDataSetList, outputVariableList);
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	@ResponseBody
	@RequestMapping(params = "method=update")
	public XPResponseHandler update(@RequestBody XPRequestHandler requestHandler)
			throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();

		try {
			movieService.update(inputVariableList, inputDataSetList,
					outputVariableList, outputDataSetList);

			return new XPResponseHandler(outputDataSetList, outputVariableList);
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	private XPResponseHandler setFailMessage(DataSetList outputDataSetList,
			VariableList outputVariableList, Exception e) {
		String msg = e.getMessage();

		if (msg == null)
			msg = "Fail to process client request.";

		XPResponseHandler responseHandler = new XPResponseHandler(
				outputDataSetList, outputVariableList);
		responseHandler.setResultMessage(-1, msg);

		return responseHandler;
	}

}
