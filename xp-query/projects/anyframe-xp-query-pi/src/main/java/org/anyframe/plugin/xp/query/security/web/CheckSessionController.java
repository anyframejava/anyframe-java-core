package org.anyframe.plugin.xp.query.security.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.xp.query.web.handler.XPResponseHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tobesoft.xplatform.data.DataSetList;
import com.tobesoft.xplatform.data.VariableList;

/**
 * Check session for user information(userId). 
 * 
 * @author Youngmin Jo
 */
@Controller
public class CheckSessionController{

	@RequestMapping("/checkSession.do")
	@ResponseBody
	protected XPResponseHandler handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception{
		VariableList outVl = new VariableList();
		DataSetList outDl = new DataSetList();
		
		String userId = (String) request.getSession().getAttribute("userId");
		
		outVl.add("userId", userId);
		outVl.add("ErrorCode", 0);
		outVl.add("ErrorMsg", "");
		
		return new XPResponseHandler(outDl, outVl);
	}
}
