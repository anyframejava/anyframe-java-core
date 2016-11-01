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
package org.anyframe.sample.servletannotation.web.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import org.anyframe.sample.servletannotation.web.servlet.FileUploadServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Servlet implementation class FileUploadServlet contains example usage of API
 * included in @MultipartConfig annotation to implement file upload function.
 * 
 * @author Kwangyoung Kim
 * 
 */
/**
 * Servlet implementation class FileUploadServlet
 */

@WebServlet(name = "FileUploadServlet", urlPatterns = { "/upload.do" })
@MultipartConfig
public class FileUploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	Logger logger = LoggerFactory.getLogger(FileUploadServlet.class);
	String errorMessage = "";

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html;charset=UTF-8");
		// Create path components to save the file
		final String path = request.getParameter("destination");
		final Part filePart = request.getPart("file");
		final String fileName = getFileName(filePart);

		OutputStream outputStream = null;
		InputStream inputStream = null;
		final PrintWriter printWriter = response.getWriter();

		try {
			outputStream = new FileOutputStream(new File(path + File.separator
					+ fileName));
			inputStream = filePart.getInputStream();

			int read = 0;
			final byte[] bytes = new byte[1024];

			while ((read = inputStream.read(bytes)) != -1) {
				outputStream.write(bytes, 0, read);
			}
			printWriter.println("New file " + fileName + " created at " + path);
			logger.info("File" + fileName + "being uploaded to " + path);
		} catch (Exception e) {
			this.forwardExceptionPage(request, response);
			e.printStackTrace();
		} finally {
			if (outputStream != null) {
				outputStream.close();
			}
			if (inputStream != null) {
				inputStream.close();
			}
			if (printWriter != null) {
				printWriter.close();
			}
		}
	}

	private void forwardExceptionPage(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("errorMessage", "An error occurs");
		RequestDispatcher rd = request
				.getRequestDispatcher("/sample/common/error.jsp");
		rd.forward(request, response);
	}

	private String getFileName(final Part part) {
		String fileName = "newFile";
		if (part != null) {
			final String partHeader = part.getHeader("content-disposition");
			logger.info("Part Header = " + partHeader);
			for (String content : part.getHeader("content-disposition").split(
					";")) {
				if (content.trim().startsWith("filename")) {
					return content.substring(content.indexOf('=') + 1).trim()
							.replace("\"", "");
				}
			}
		}
		return fileName;
	}

}
