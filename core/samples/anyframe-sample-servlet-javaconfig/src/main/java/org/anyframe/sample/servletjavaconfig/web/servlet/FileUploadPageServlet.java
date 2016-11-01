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
package org.anyframe.sample.servletjavaconfig.web.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet implementation class FileUploadForwardServlet contains example usage
 * of programmatic configuration.
 * 
 * @author Kwangyoung Kim
 * 
 */
public class FileUploadPageServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger logger = LoggerFactory.getLogger(FileUploadPageServlet.class);

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		logger.info("[ " + getServletName() + " ]" + " Encoding type : "
				+ getInitParameter("encoding"));
		request.setCharacterEncoding(getInitParameter("encoding"));

		RequestDispatcher rd = request
				.getRequestDispatcher("/WEB-INF/jsp/moviefinder/movie/fileUpload.jsp");
		rd.forward(request, response);
	}
}
