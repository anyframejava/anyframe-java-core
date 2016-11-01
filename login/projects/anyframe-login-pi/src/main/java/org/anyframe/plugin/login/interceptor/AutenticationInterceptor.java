package org.anyframe.plugin.login.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.plugin.login.ThreadLocalUtil;
import org.anyframe.plugin.login.domain.UserInfo;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;


public class AutenticationInterceptor extends HandlerInterceptorAdapter  {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		
		if ( session != null ){
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			if ( userInfo != null ){
				ThreadLocalUtil.add("userInfo", (UserInfo) session.getAttribute("userInfo"));
			}
		}
		return super.preHandle(request, response, handler);
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		ThreadLocalUtil.clearSharedInfo();
		super.afterCompletion(request, response, handler, ex);
	}
}
