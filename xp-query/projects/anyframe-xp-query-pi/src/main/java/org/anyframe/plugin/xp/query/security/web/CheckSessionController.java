package org.anyframe.plugin.xp.query.security.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.tobesoft.xplatform.data.PlatformData;
import com.tobesoft.xplatform.data.VariableList;
import com.tobesoft.xplatform.tx.HttpPlatformResponse;
import com.tobesoft.xplatform.tx.PlatformType;

/**
 * Check session for user information(userId). 
 * 
 * @author Youngmin Jo
 */
public class CheckSessionController extends AbstractController{
	private String contentType = PlatformType.CONTENT_TYPE_XML; // Default - XML
	
	private String encoding = PlatformType.DEFAULT_CHAR_SET; // Default CharSet = utf - 8

	public void setContentType(String contentsType) {
		this.contentType = contentsType;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}
	
	protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception{
		PlatformData outPlatformData = new PlatformData();
		VariableList outVl = outPlatformData.getVariableList();
		
		String userId = (String) request.getSession().getAttribute("userId");
		
		outVl.add("userId", userId);
		outVl.add("ErrorCode", 0);
		outVl.add("ErrorMsg", "");
		
		HttpPlatformResponse httpPlatformResponse = new HttpPlatformResponse(
				response, contentType, encoding);
		httpPlatformResponse.setData(outPlatformData);
		httpPlatformResponse.sendData();
		return null;
	}
}
