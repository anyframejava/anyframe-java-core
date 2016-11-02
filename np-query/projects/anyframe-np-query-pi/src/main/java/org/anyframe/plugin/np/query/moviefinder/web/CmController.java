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
package org.anyframe.plugin.np.query.moviefinder.web;

import java.lang.reflect.Method;

import javax.inject.Inject;

import org.anyframe.np.query.web.NPController;
import org.anyframe.np.query.web.handler.NPRequestHandler;
import org.anyframe.np.query.web.handler.NPResponseHandler;
import org.anyframe.plugin.common.MovieFinderException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nexacro.xapi.data.DataSet;
import com.nexacro.xapi.data.DataSetList;
import com.nexacro.xapi.data.Debugger;
import com.nexacro.xapi.data.VariableList;

/**
 * Common Controller class for operate user-defined service.
 * 
 */
@Controller("cmController")
@RequestMapping("/spp.do")
public class CmController {

	@Inject
	private ApplicationContext ctx;
	
	private final String SERVICE_NAME = "service";
	private final String METHOD_NAME = "method";
	
	Logger logger = LoggerFactory.getLogger(NPController.class);

	@RequestMapping(params = "method=getList")
	@ResponseBody
	public NPResponseHandler getList(
			@RequestBody NPRequestHandler requestHandler) throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();
		
		logger.debug("{}.operate() started", new Object[] { this.getClass().getName() });
		Debugger debugger = new Debugger();
		logger.debug("Input VariableSetList");
		logger.debug(debugger.detail(inputVariableList));
		logger.debug("Input DataSetList");
		logger.debug(debugger.detail(inputDataSetList));
		
		NPResponseHandler responseHandler = null;
		
		try {
			String serviceName = inputVariableList.getString(SERVICE_NAME);
			Object bean = ctx.getBean(serviceName);
			Method method = getMethod(bean, inputVariableList.getString(METHOD_NAME));
			
			method.invoke(bean,
					new Object[] { inputVariableList, inputDataSetList,
							outputVariableList, outputDataSetList });

			responseHandler = new NPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(0, "Success");
			return responseHandler;
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}

	}

	@ResponseBody
	@RequestMapping(params = "method=saveAll")
	public NPResponseHandler saveAll(
			@RequestBody NPRequestHandler requestHandler) throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();
		
		logger.debug("{}.operate() started", new Object[] { this.getClass().getName() });
		Debugger debugger = new Debugger();
		logger.debug("Input VariableSetList");
		logger.debug(debugger.detail(inputVariableList));
		logger.debug("Input DataSetList");
		logger.debug(debugger.detail(inputDataSetList));
	
		NPResponseHandler responseHandler = null;

		try {
			String serviceName = inputVariableList.getString(SERVICE_NAME);
			Object bean = ctx.getBean(serviceName);
			Method method = getMethod(bean, inputVariableList.getString(METHOD_NAME));
			
			method.invoke(bean,
					new Object[] { inputVariableList, inputDataSetList,
							outputVariableList, outputDataSetList });
			
			responseHandler = new NPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(0, "Success");

			return responseHandler;
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	@ResponseBody
	@RequestMapping(params = "method=create")
	public NPResponseHandler create(@RequestBody NPRequestHandler requestHandler)
			throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();
		
		logger.debug("{}.operate() started", new Object[] { this.getClass().getName() });
		Debugger debugger = new Debugger();
		logger.debug("Input VariableSetList");
		logger.debug(debugger.detail(inputVariableList));
		logger.debug("Input DataSetList");
		logger.debug(debugger.detail(inputDataSetList));
		
		NPResponseHandler responseHandler = null;

		DataSet ds = inputDataSetList.get("dsMovie");

		try {
			String serviceName = inputVariableList.getString(SERVICE_NAME);
			Object bean = ctx.getBean(serviceName);
			Method method = getMethod(bean, inputVariableList.getString(METHOD_NAME));
			
			method.invoke(bean,
					new Object[] {inputVariableList, ds});
			responseHandler = new NPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(0, "Success");

			return responseHandler;
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	@ResponseBody
	@RequestMapping(params = "method=get")
	public NPResponseHandler get(@RequestBody NPRequestHandler requestHandler)
			throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();
	
		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();
		
		logger.debug("{}.operate() started", new Object[] { this.getClass().getName() });
		Debugger debugger = new Debugger();
		logger.debug("Input VariableSetList");
		logger.debug(debugger.detail(inputVariableList));
		logger.debug("Input DataSetList");
		logger.debug(debugger.detail(inputDataSetList));
		
		NPResponseHandler responseHandler = null;

		try {
			String serviceName = inputVariableList.getString(SERVICE_NAME);
			Object bean = ctx.getBean(serviceName);
			Method method = getMethod(bean, inputVariableList.getString(METHOD_NAME));
			
			method.invoke(bean,
					new Object[] { inputVariableList, inputDataSetList,
							outputVariableList, outputDataSetList });
			responseHandler = new NPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(0, "Success");

			return responseHandler;
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	@ResponseBody
	@RequestMapping(params = "method=update")
	public NPResponseHandler update(@RequestBody NPRequestHandler requestHandler)
			throws Exception {
		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		VariableList outputVariableList = new VariableList();
		DataSetList outputDataSetList = new DataSetList();
		
		logger.debug("{}.operate() started", new Object[] { this.getClass().getName() });
		Debugger debugger = new Debugger();
		logger.debug("Input VariableSetList");
		logger.debug(debugger.detail(inputVariableList));
		logger.debug("Input DataSetList");
		logger.debug(debugger.detail(inputDataSetList));

		NPResponseHandler responseHandler = null;

		try {
			String serviceName = inputVariableList.getString(SERVICE_NAME);
			Object bean = ctx.getBean(serviceName);
			Method method = getMethod(bean, inputVariableList.getString(METHOD_NAME));
			
			method.invoke(bean,
					new Object[] { inputVariableList, inputDataSetList,
							outputVariableList, outputDataSetList });

			responseHandler = new NPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(0, "Success");
			
			return responseHandler;
		} catch (Exception e) {
			return setFailMessage(outputDataSetList, outputVariableList, e);
		}
	}

	private NPResponseHandler setFailMessage(DataSetList outputDataSetList,
			VariableList outputVariableList, Exception e) {
		String msg = e.getCause().getMessage();

		if (msg == null)
			msg = "Fail to process client request.";

		NPResponseHandler responseHandler = new NPResponseHandler(
				outputDataSetList, outputVariableList);
		responseHandler.setResultMessage(-1, msg);

		return responseHandler;
	}
	
	private Method getMethod(Object bean, String methodName) throws MovieFinderException {
		Method[] methods = bean.getClass().getMethods();

		for (int i = 0; i < methods.length; i++) {
			if (methods[i].getName().equals(methodName)) {
				return methods[i];
			}
		}
		throw new MovieFinderException("Cann't find " + methodName + ".");
	}

}
