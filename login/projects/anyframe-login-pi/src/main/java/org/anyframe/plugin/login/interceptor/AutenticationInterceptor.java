/*
 * Copyright 2008-2012 the original author or authors.
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
package org.anyframe.plugin.login.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.anyframe.plugin.login.domain.UserInfo;
import org.anyframe.util.ThreadLocalUtil;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * This AutenticationInterceptor class is an interceptor class to add/clear user
 * information in thread local.
 * 
 * @author Yongmin Jo
 */
public class AutenticationInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();

		if (session != null) {
			UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
			if (userInfo != null) {
				ThreadLocalUtil.add("userInfo",
						(UserInfo) session.getAttribute("userInfo"));
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
