/*
 * Copyright 2008-2013 the original author or authors.
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
package org.anyframe.sample.servletannotation.web.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * Servlet Filter implementation class AnyframeFilter contains example usage of @WebFilter
 * annotation.
 * 
 * @author Kwangyoung Kim
 * 
 */
public final class LoggingFilter implements Filter {
	private FilterConfig filterConfig = null;

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		long start = System.currentTimeMillis();
		String address = request.getRemoteAddr();
		String file = ((HttpServletRequest) request).getRequestURI();
		
		chain.doFilter(request, response);

		filterConfig.getServletContext().log(
				"User access! " + " User IP: " + address + " Resource: " + file
						+ " Milliseconds used: "
						+ (System.currentTimeMillis() - start));
	}

	public void destroy() {
	}

	public void init(FilterConfig filterConfig) {
		this.filterConfig = filterConfig;
	}
}
