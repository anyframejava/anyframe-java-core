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

package org.anyframe.plugin.logback.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.MDC;


/**
 * This MDCInsertingServletFilter class is a Filter class to insert automatically
 * user information into MDC.
 * 
 * @author Sunghoon Son
 */
public class MDCServletFilter implements Filter{

	private static final String REMOTE_HOST_MDC_KEY = "remoteHost";
	private static final String REQUEST_URL_MDC_KEY = "requestURL";
	
	public static final String USER_ID_MDC_KEY = "userId";
	
	public void init(FilterConfig config) throws ServletException {}

	public void destroy() {}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		insertIntoMDC(request);
		try{
			chain.doFilter(request, response);
		}finally{
			clearMDC();
		}	
	}

	private void insertIntoMDC(ServletRequest request){
		MDC.put(REMOTE_HOST_MDC_KEY, request.getRemoteHost());
		
		if (request instanceof HttpServletRequest){
			HttpServletRequest httpServletRequest = (HttpServletRequest) request;
			
			StringBuffer requestURL = httpServletRequest.getRequestURL();
		    if (requestURL != null) {
		        MDC.put(REQUEST_URL_MDC_KEY, requestURL.toString());
		    }
		    
		    HttpSession session = httpServletRequest.getSession();
		    
		    if (session != null && session.getAttribute(USER_ID_MDC_KEY) != null){
		    	MDC.put(USER_ID_MDC_KEY, (String)session.getAttribute(USER_ID_MDC_KEY));
		    }
		    
		}		
	}

	private void clearMDC(){
		MDC.remove(REMOTE_HOST_MDC_KEY);
		MDC.remove(USER_ID_MDC_KEY);
		MDC.remove(REQUEST_URL_MDC_KEY);
	}
}
