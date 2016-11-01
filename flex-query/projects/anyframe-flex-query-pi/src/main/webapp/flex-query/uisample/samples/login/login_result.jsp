<%@ page contentType="text/html; charset=euc-kr" %>
<?xml version="1.0" encoding="UTF-8"?>
<result>
<%
	String resultLogin = (String)request.getParameter("result_login");
	
%>
	<login_result><%=resultLogin%></login_result>
</result>
