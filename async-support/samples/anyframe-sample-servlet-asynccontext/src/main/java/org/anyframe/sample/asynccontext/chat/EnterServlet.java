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
package org.anyframe.sample.asynccontext.chat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

@SuppressWarnings("serial")
@WebServlet(urlPatterns = "/enterServlet", asyncSupported = true)
public class EnterServlet extends HttpServlet {

	private Logger logger = Logger.getLogger(getClass());

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		processConnectionRequest(req, resp);
		return;
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		processConnectionRequest(req, resp);
		return;
	}

	private void processConnectionRequest(HttpServletRequest req, HttpServletResponse res) throws IOException {
		logger.info("Receive ENTER request");
		logger.info("Thread ID : " + Thread.currentThread().getId());
		res.setContentType("text/html; charset=UTF-8");
		res.setHeader("Cache-Control", "private");
		res.setHeader("Pragma", "no-cache");
		res.setCharacterEncoding("UTF-8");
		PrintWriter writer = res.getWriter();
		// for IE
		writer.println("<!-- Comet is a programming technique that enables web servers to send data to the client without having any need for the client to request it. -->\n");
		writer.flush();
		AsyncContext asyncCtx = req.startAsync();
		addToChatRoom(asyncCtx);
		return;
	}

	private void addToChatRoom(AsyncContext asyncCtx) {
		asyncCtx.setTimeout(0);
		ChatRoom.getInstance().enter(asyncCtx);
		logger.info("New Client enter Room");
	}

}
