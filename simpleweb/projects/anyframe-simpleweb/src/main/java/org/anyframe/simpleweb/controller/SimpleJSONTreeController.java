package org.anyframe.simpleweb.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.simpleweb.beans.support.BeanMethodInfo;
import org.anyframe.simpleweb.beans.support.ServiceEL;
import org.anyframe.simpleweb.jquery.jstree.JSTreeNode;
import org.springframework.web.servlet.ModelAndView;

@SuppressWarnings("unchecked")
public abstract class SimpleJSONTreeController extends SimpleJSONController{
	
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// 1. preventing duplicated submission.
		checkDuplicatedSubmission(request);

		// 2. execute service method and get view name

		Map<String, Object> viewInfo = executeServiceAndReturnView(request);
		
		String viewName = (String)viewInfo.get("VIEW_NAME");

		if (viewInfo.get("INPUT_PAGE") == null)
			// set tiles attribute names and values
			setTilesAttributes(request, null);

		// 3. set attributes for empty command object
		setCommandAttributes(request);

		// 4. set attributes for initial data
		setInitdataAttributes(request);
		
		ModelAndView mav = new ModelAndView(viewName);
		
		mav.addObject(request.getAttribute("listNode"));
		
		return mav;
	}
	
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
			
			ArrayList<JSTreeNode> listNode = new ArrayList<JSTreeNode>();
			List jsTreeList = (ArrayList)result;
			
			String id = request.getParameter("id");
			
	 		setTreeData(listNode, jsTreeList, id);
			
			if(request.getAttribute("listNode")==null)
				request.setAttribute("listNode", listNode);
			return null;
		} catch (Exception e) {
			throw new Exception(e.getCause());
		}
	}

	abstract protected void setTreeData(ArrayList<JSTreeNode> listNode, List jsTreeList,
			String id) throws Exception;
	
}
