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
package org.anyframe.sample.asynccontext.longtran;

import java.io.IOException;

import javax.servlet.AsyncContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

@SuppressWarnings("serial")
@WebServlet(urlPatterns = { "/longTransactionAsyncContext" }, asyncSupported = true)
public class LongTransactionAsyncContext extends HttpServlet {

	private Logger logger = Logger.getLogger(getClass());

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		logger.info("doPost() started~!");
		String testParameter = request.getParameter("id");
		if (!"1".equals(testParameter)) {
			logger.info("Error~! Invalid Parameter~!");
			return;
		}
		logger.info("Thread ID : " + Thread.currentThread().getId());
		final ServletContext servletContext = request.getServletContext();
		AsyncContext tempAsyncContext = request.startAsync();
		final AsyncContext asyncContext = tempAsyncContext;
		asyncContext.setTimeout(30 * 1000);
		new Thread(new Runnable() {
			public void run() {
				try {
					logger.info("New Thread Started~!");
					logger.info("Thread ID : " + Thread.currentThread().getId());
					Thread.sleep(1000);
					servletContext.setAttribute("message", "Hello~! : " + System.currentTimeMillis());
					((HttpServletResponse) asyncContext.getResponse())
							.sendRedirect("LongTransactionByAsyncContext.jsp");
					asyncContext.complete();
					logger.info("New Thread Ended~!");
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}).start();
		logger.info("doPost() ended~!");
		return;
	}
}
