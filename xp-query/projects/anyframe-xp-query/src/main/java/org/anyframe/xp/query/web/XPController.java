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
package org.anyframe.xp.query.web;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.exception.MethodInvocationException;
import org.anyframe.xp.query.web.converter.HttpXPMessageConverter;
import org.anyframe.xp.query.web.handler.XPRequestHandler;
import org.anyframe.xp.query.web.handler.XPResponseHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.Debugger;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Common Controller class to invoke business service from the given ServiceName
 * and Method Name for XPLATFORM UI
 * 
 * @author Youngmin Jo
 */
public class XPController extends AbstractController {
	private final String SERVICE_NAME = "service";
	private final String METHOD_NAME = "method";
	private final String IS_FIRSTROW = "isFR";
	private final String IS_COMP = "isComp";
	private final String NEXT_DATA_SIZE = "nextDataSize";

	Logger logger = LoggerFactory.getLogger(XPController.class);

	HttpXPMessageConverter messageConverter;

	/**
	 * This method invokes business service from the given ServiceName and MethodName.
	 *  
	 * @param request
	 * 		HttpServletRequest
	 * @param response
	 * 		HttpServletResponse
	 * @return
	 * 		ModelAndView
	 * @throws Exception
	 * 		Fail to invoke business service.
	 */
	public ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpInputMessage inputMessage = new ServletServerHttpRequest(request);
		HttpOutputMessage outputMessage = new ServletServerHttpResponse(response);

		XPRequestHandler requestHandler = (XPRequestHandler) messageConverter
				.read(XPRequestHandler.class, inputMessage);
		XPResponseHandler responseHandler = null;

		VariableList inputVariableList = requestHandler.getInputVariableList();
		DataSetList inputDataSetList = requestHandler.getInputDataSetList();

		logger.debug("{}.operate() started", new Object[] { this.getClass().getName() });
		Debugger debugger = new Debugger();
		logger.debug("Input VariableList");
		logger.debug(debugger.detail(inputVariableList));

		logger.debug("Input DataSetList");
		logger.debug(debugger.detail(inputDataSetList));

		String serviceName = inputVariableList.getString(SERVICE_NAME);
		Object bean = getApplicationContext().getBean(serviceName);
		Method method = getMethod(bean, inputVariableList.getString(METHOD_NAME));

		DataSetList outputDataSetList = new DataSetList();
		VariableList outputVariableList = new VariableList();
		try {
			method.invoke(bean,
					new Object[] { requestHandler.getInputVariableList(), requestHandler.getInputDataSetList(),
							outputVariableList, outputDataSetList });

			String isFirstrow = inputVariableList.getString(IS_FIRSTROW);

			logger.debug("{}.operate() ended", new Object[] { this.getClass().getName() });
			logger.debug("Output VariableList");
			logger.debug(debugger.detail(outputVariableList));

			logger.debug("Output DataSetList");
			logger.debug(debugger.detail(outputDataSetList));

			logger.debug("{}.operate() finished", new Object[] { this.getClass().getName() });

			if ("y".equalsIgnoreCase(isFirstrow)) {
				// in case of Firstrow
				String isComp = inputVariableList.getString(IS_COMP);
				int nextDataSize = inputVariableList.getInt(NEXT_DATA_SIZE);

				if ("y".equalsIgnoreCase(isComp)) {
					// use DeflaterOutputStream to compressed response
					responseHandler = new XPResponseHandler(outputDataSetList, outputVariableList, true, true,
							nextDataSize);
				} else {
					responseHandler = new XPResponseHandler(outputDataSetList, outputVariableList, true, false,
							nextDataSize);
				}
			} else {
				// in case of using general PlatformResponse
				responseHandler = new XPResponseHandler(outputDataSetList, outputVariableList);
				responseHandler.setResultMessage(0, "Success");
			}
		} catch (Exception e) {
			logger.error("Can not invoke a dispatch method name", e);
		
			String msg = null;
			Throwable cause = e.getCause();
			if(cause != null) {
				msg=cause.getMessage();
			}

			if (msg == null)
				msg = "Fail to process client request.";

			responseHandler = new XPResponseHandler(outputDataSetList, outputVariableList);
			responseHandler.setResultMessage(-1, msg);
		}
		messageConverter.write(responseHandler, MediaType.APPLICATION_XML, outputMessage);
		return null;
	}

	private Method getMethod(Object bean, String methodName) {
		Method[] methods = bean.getClass().getMethods();

		for (int i = 0; i < methods.length; i++) {
			if (methods[i].getName().equals(methodName)) {
				return methods[i];
			}
		}
		throw new MethodInvocationException("Cann't find " + methodName + ".");
	}

	public void setMessageConverter(HttpXPMessageConverter messageConverter) {
		this.messageConverter = messageConverter;
	}
}
