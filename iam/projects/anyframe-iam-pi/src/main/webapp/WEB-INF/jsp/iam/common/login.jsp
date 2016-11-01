<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ page import="org.springframework.security.web.authentication.AbstractProcessingFilter" %>
<%@ page import="org.springframework.security.web.authentication.AuthenticationProcessingFilter" %>
<%@ page import="org.springframework.security.core.AuthenticationException" %>
<html>
  <head>
    <title>LOGIN</title>
    <%@ include file="/sample/common/meta.jsp" %>
    <title>Users List</title>
	<meta name="heading" content="Users"/>    
    <link rel="stylesheet" type="text/css" media="all" href="<c:url value='/sample/css/displaytag.css'/>" />     
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
	
    <script type="text/javascript" src="<c:url value='/sample/javascript/prototype.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/sample/javascript/global.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>     
  </head>
  <body onload="document.f.j_username.focus();">
	<table width="100%" height="400" border="0" cellpadding="0" cellspacing="0">
	  <tr>
	    <td align="center">
		    <table width="600" height="341" border="0" cellpadding="0" cellspacing="0">
				<tr height="282">
					<td background="<c:url value='/iam/img/login2.gif'/>">
						&nbsp;
					</td>
				</tr>
				<tr>
					<td>
						<table width="600" height="30" border="0" cellpadding="0" cellspacing="0">
							<tr>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td height="89" align="center">
									<form name="f" action="<c:url value='j_spring_security_check'/>" method="POST">
										<table>
											<tr><td colspan="6">This is Anyframe IAM Sample web application.</td></tr>
											<tr><td>User : </td><td><input type='text' name='j_username' size="10" value='<c:if test="${not empty param.login_error}"><c:out value="${SPRING_SECURITY_LAST_USERNAME}"/></c:if><c:if test="${empty param.login_error}">admin</c:if>'/></td>
											<td>Password : </td><td><input type='password' name='j_password' size="12" value='<c:if test="${empty param.login_error}">admin123</c:if>'></td>
											<td colspan='2'><input name="submit" type="submit" value="Login">&nbsp;<input name="reset" type="reset" value="Reset"></td></tr>
										</table>       
									</form>
									<%-- this form-login-page form is also used as the
									     form-error-page to ask for a login again. --%>
									<c:if test="${not empty param.login_error}">
										<font color="red">
										  Your login attempt was not successful, try again.
										  Reason: <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
										</font>
									</c:if>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
	    </td>
	  </tr>
	</table>

  </body>
</html>
