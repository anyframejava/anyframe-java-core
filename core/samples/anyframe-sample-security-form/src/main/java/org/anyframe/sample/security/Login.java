package org.anyframe.sample.security;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.HttpMethodConstraint;
import javax.servlet.annotation.ServletSecurity;
import javax.servlet.annotation.WebServlet;
import javax.servlet.annotation.ServletSecurity.EmptyRoleSemantic;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet(name = "Login", urlPatterns = { "/login.do" })
@ServletSecurity(httpMethodConstraints = @HttpMethodConstraint(value = "POST", emptyRoleSemantic = EmptyRoleSemantic.PERMIT))
public class Login extends HttpServlet {

	private static final long serialVersionUID = 1L;

	Logger logger = LoggerFactory.getLogger(Login.class);

	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("id");
		String password = request.getParameter("password");

		RequestDispatcher rd = null;

		try {
			request.login(username, password);
			logger.info("Auth Type : " + request.getAuthType());
			logger.info("Remote User : " + request.getRemoteUser());
			rd = request.getRequestDispatcher("/list.do");
		} catch (Exception e) {
			request.setAttribute("msg", "Unable to login with <b> " + username
					+ "</b>");
			rd = request.getRequestDispatcher("/loginForm.do");
		}
		rd.forward(request, response);
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

}
