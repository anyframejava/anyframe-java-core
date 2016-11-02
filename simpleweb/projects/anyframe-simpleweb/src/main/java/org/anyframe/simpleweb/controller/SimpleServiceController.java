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
package org.anyframe.simpleweb.controller;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;

import org.anyframe.datatype.SearchVO;
import org.anyframe.simpleweb.beans.support.BeanMethodInfo;
import org.anyframe.simpleweb.beans.support.ServiceEL;
import org.anyframe.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.util.ReflectionUtils;

/**
 * Common controller class to execute business service methods simply
 * 
 * @author Sooyeon Park
 * 
 */
public class SimpleServiceController extends AbstractServiceController {

	private static final Logger LOGGER = LoggerFactory.getLogger(SimpleServiceController.class);

	// @Value("#{contextProperties['UPLOAD_PATH'] ?: \"/upload/\"}")
	// String uploadPath;

	protected String bindRequestsAndInvokeServiceMethod(ServiceEL serviceEL, HttpServletRequest request, Object[] argument, BeanMethodInfo methodInfo,
			String resultName, Object[] command) throws Exception {

		// String paramName = "";
		if (serviceEL.getArgList().size() > 0) {
			for (int i = 0; i < serviceEL.getArgList().size(); i++) {
				if (command[i] instanceof SearchVO)
					((SearchVO) command[i]).setPageIndex(getPageIndex(request));

				if (StringUtil.isNotEmpty(request.getParameter("fileDir")) && StringUtil.isNotEmpty(request.getParameter("hiddenUploadedFiles"))) {
					String path = this.getUploadPath() + request.getParameter("fileDir") + "/";

					// make filename string array
					String hiddenUploadedFiles = request.getParameter("hiddenUploadedFiles");
					String[] fileNames = StringUtil.getStringArray(hiddenUploadedFiles, ",");
					String filePaths = "";
					for (int j = 0; j < fileNames.length; j++) {
						// String encodeFileName =
						// URLEncoder.encode(fileNames[i],
						// "utf-8");
						String encodeFileName = fileNames[j];
						if (j == fileNames.length - 1)
							filePaths += path + encodeFileName;
						else
							filePaths += path + encodeFileName + ",";
					}

					// make filepath setter method
					String filePathsAttrName = request.getParameter("filePathsAttrName");
					if (StringUtil.isEmpty(filePathsAttrName))
						filePathsAttrName = "FilePaths";
					else
						filePathsAttrName = filePathsAttrName.substring(0, 1).toUpperCase() + filePathsAttrName.substring(1);

					// call reflection api to call setter method for filepath
					Method method = ReflectionUtils.findMethod(command[i].getClass(), "set" + filePathsAttrName, String.class);
					if (method != null)
						ReflectionUtils.invokeMethod(method, command[i], filePaths);
				}
				argument[i] = command[i];
				// }
			}
		}
		return invokeServiceMethod(serviceEL, request, command, argument, methodInfo, resultName);
	}

	protected Object getValue(Object command, Object value) {
		return value;
	}

	protected Object[] bindingCommand(HttpServletRequest request, BeanMethodInfo methodInfo, ServiceEL serviceEL) throws Exception {

		String paramName = "";
		Object[] command = new Object[serviceEL.getArgList().size() + 1];
		try {
			if (serviceEL.getArgList().size() > 0) {
				for (int i = 0; i < serviceEL.getArgList().size(); i++) {
					paramName = serviceEL.getArgList().get(i);
					Class<?> argClass = null;
					if (methodInfo.getInputParam() != null)
						argClass = methodInfo.getInputParam(i)[0];

					if (StringUtil.isNotEmpty(paramName) && argClass != null) {
						if (argClass.isArray()) {
							command[i] = request.getParameterValues(paramName + "[]");
						} else if (argClass.isPrimitive() || argClass.getPackage().getName().equals("java.lang")) {
							if (request.getParameter(paramName) != null)
								command[i] = request.getParameter(paramName);
						} else {
							command[i] = BeanUtils.instantiateClass(argClass);
							bind(request, command[i]);
						}
					}
				}
			}

		} catch (Exception e) {
			LOGGER.error("fail to bind command.", e);
		}
		return command;
	}

}
