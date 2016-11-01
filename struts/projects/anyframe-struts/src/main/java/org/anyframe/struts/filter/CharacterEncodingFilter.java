/*
 * Copyright 2007-2012 the original author or authors.
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
package org.anyframe.struts.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * The class implementing javax.servlet.Filter.
 * Changes the encoding of parameter value with respect to the encoding value configured in web.xml
 * <p>web.xml configuration example : </p>
 * <pre>
 * &lt;servlet&gt;
 * 		&lt;servlet-name&gt;action&lt;/servlet-name&gt;
 * 		&lt;servlet-class&gt;
 *			org.anyframe.struts.action.DefaultActionServlet
 *		&lt;/servlet-class&gt;
 *		&lt;init-param&gt;
 *			&lt;param-name&gt;config&lt;/param-name&gt;
 *			&lt;param-value&gt;
 *				/config/struts/struts-config-common.xml
 *			&lt;/param-value&gt;
 *		&lt;/init-param&gt;
 *		&lt;init-param&gt;
 *             &lt;param-name&gt;character-encoding&lt;/param-name&gt;
 *             &lt;param-value&gt;utf-8&lt;/param-value&gt;
 *      &lt;/init-param&gt;
 * &lt;/servlet&gt;
 * </pre>				
 * @author Sooyeon Park
 *
 */
public class CharacterEncodingFilter implements Filter {

	private String encoding;

	private boolean forceEncoding;


	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	public void setForceEncoding(boolean forceEncoding) {
		this.forceEncoding = forceEncoding;
	}

	public void init(FilterConfig config) {
		encoding = config.getInitParameter("encoding");
		if (config.getInitParameter("forceEncoding") != null) {
			if (config.getInitParameter("forceEncoding").equals("true")) {
				forceEncoding = true;
			}
			else {
				forceEncoding = false;
			}
		}
	}

	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		if (this.forceEncoding || request.getCharacterEncoding() == null) {
			request.setCharacterEncoding(this.encoding);
		}
		chain.doFilter(request, response);
	}

	public void destroy() {
	}
}
