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

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.anyframe.datatype.HashMapModel;
import org.anyframe.util.StringUtil;
import org.anyframe.simpleweb.beans.support.BeanMethodInfo;
import org.anyframe.simpleweb.beans.support.ServiceEL;

/**
 * Common controller class to execute business service methods with map
 * parameters simply
 * 
 * @author Sooyeon Park
 * 
 */
public class SimpleMapServiceController extends AbstractServiceController {

	protected String bindRequestsAndInvokeServiceMethod(ServiceEL serviceEL,
			HttpServletRequest request, Object[] argument,
			BeanMethodInfo methodInfo, String resultName, Object[] command)
			throws Exception {
		argument[0] = ((HashMapModel) command[0]).getMap();
		return invokeServiceMethod(serviceEL, request, command, argument,
				methodInfo, resultName);
	}

	@SuppressWarnings("unchecked")
	protected Object getValue(Object command, Object value) {
		if(command instanceof HashMapModel){
			((HashMapModel) command).setMap((Map) value);
		}
		else {
			command = value;
		}
		return command;
	}

	@SuppressWarnings("unchecked")
	protected HashMapModel getModel(HttpServletRequest request) {
		HashMapModel model = new HashMapModel();
		Map map = model.getMap();
		map.putAll(getMapFromRequest(request));
		map.put(PARAM_PAGE_INDEX, getPageIndex(request));

		return model;
	}

	/**
	 * Make HashMap Object with parameter names and values from HTTP request.
	 * 
	 * @param request
	 *            current HTTP request
	 */
	@SuppressWarnings("unchecked")
	protected Map getMapFromRequest(HttpServletRequest request) {
		Map targetMap = new HashMap();
		Enumeration enumeration = request.getParameterNames();
		while (enumeration.hasMoreElements()) {
			String paramName = enumeration.nextElement().toString();
			targetMap.put(paramName, request.getParameter(paramName));
		}
		return targetMap;
	}

	protected Object[] bindingCommand(HttpServletRequest request, BeanMethodInfo methodInfo, ServiceEL serviceEL)
			throws Exception {
		Object[] result = new Object[serviceEL.getArgList().size()+1];
		HashMapModel command = getModel(request);
		bind(request, command);
		
		if(StringUtil.isNotEmpty(request.getParameter("fileDir")) && StringUtil.isNotEmpty(request.getParameter("hiddenUploadedFiles")))
		{
			String path = this.getUploadPath() + request.getParameter("fileDir") + "/";
			
			// make filename string array
			String hiddenUploadedFiles = request.getParameter("hiddenUploadedFiles");
			String[] fileNames = StringUtil.getStringArray(hiddenUploadedFiles, ",");
			String filePaths = "";
			for(int i=0;i<fileNames.length;i++){
				//String encodeFileName = URLEncoder.encode(fileNames[i], "utf-8");
				String encodeFileName = fileNames[i];
				if(i == fileNames.length - 1)
					filePaths += path + encodeFileName;
				else
					filePaths += path + encodeFileName + ",";
			}

			// make filepath setter method
			String filePathsAttrName = request.getParameter("filePathsAttrName");
			if(StringUtil.isEmpty(filePathsAttrName)) filePathsAttrName = FILEVO_FILE_PATH;

			// set map
			command.getMap().put(filePathsAttrName, filePaths);	
		}
		result[0] = command;
		return result;
	}

}