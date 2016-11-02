package org.anyframe.simpleweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import org.anyframe.pagination.Page;
import org.anyframe.simpleweb.beans.support.BeanMethodInfo;
import org.anyframe.simpleweb.beans.support.ServiceEL;

public class SimpleJSONController extends SimpleServiceController {
	
	@SuppressWarnings("unchecked")
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// 1. preventing duplicated submission.
		checkDuplicatedSubmission(request);

		// 2. execute service method and get view name

		Map viewInfo = executeServiceAndReturnView(request);
		
		String viewName = (String)viewInfo.get("VIEW_NAME");

		if (viewInfo.get("INPUT_PAGE") == null)
			// set tiles attribute names and values
			setTilesAttributes(request, null);

		// 3. set attributes for empty command object
		setCommandAttributes(request);

		// 4. set attributes for initial data
		setInitdataAttributes(request);
		
		ModelAndView mav = new ModelAndView(viewName);
		
		mav.addAllObjects((HashMap)request.getAttribute("jsonModel"));
		
		return mav;
	}

	@SuppressWarnings("unchecked")
	protected String invokeServiceMethod(ServiceEL serviceEL,
			HttpServletRequest request, Object[] command, Object[] argument,
			BeanMethodInfo methodInfo, String resultName) throws Exception {
		try {
			
			// 1. invoke service method
			HashMap<String, Object> bindMap = new HashMap<String, Object>();
			bindMap.put("beanFactory", this.getApplicationContext());
			if (serviceEL.getArgList().size() > 0) {
				List<String> argList = serviceEL.getArgList();
				for (int i = 0; i < argList.size(); i++) {
					bindMap.put(serviceEL.getArgList().get(i), argument[i]);
				}
			}
			Object result = serviceEL.execute(bindMap);
			
			Map jsonModel = new HashMap();
			
			if (methodInfo.getOutputParam()[0].getName().equals(
					Page.class.getName())) {
				request.setAttribute(ATTR_RESULT_PAGE, result);
				request.setAttribute(ATTR_RESULT_LIST, ((Page) result)
						.getList());
				Object searchAttrValue = getValue(command[0], argument[0]);
				request.setAttribute(ATTR_SEARCH, searchAttrValue);
				//edit for json
				
				jsonModel.put("page", ((Page) result).getCurrentPage() + "");		
				jsonModel.put("total", ((Page) result).getMaxPage() + "");
				jsonModel.put("records", ((Page) result).getTotalCount());
				jsonModel.put("rows", ((Page) result).getList());
				
				//end
			} else {
				Object resultValue = getValue(command[0], result);
				if (resultName != null)
					request.setAttribute(resultName, resultValue);
				else
					request.setAttribute(methodInfo.getOutParamName(),
							resultValue);
				//for json autocomplete
				jsonModel.put("autoData", resultValue);
			}
			if(request.getAttribute("jsonModel")==null)
				request.setAttribute("jsonModel", jsonModel);
			return null;
		} catch (Exception e) {
			throw new Exception(e.getCause());
		}
	}
}
