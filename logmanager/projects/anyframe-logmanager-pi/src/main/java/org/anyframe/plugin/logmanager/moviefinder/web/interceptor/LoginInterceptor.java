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
package org.anyframe.plugin.logmanager.moviefinder.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/**
 * This interceptor class is a Controller class to check user.
 * 
 * @author Heewon Jung
 *
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object hler) throws Exception {
        if(request.getSession().getAttribute("user") != null)
            return true;
        else {
            response.sendRedirect("logmanagerLoginView.do");
            return false;
        }
	}
}
