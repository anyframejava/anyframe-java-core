<%@ page contentType="text/html; charset=euc-kr" %>
<%@ page import="flex.messaging.FlexSession"  %>
<%@ page import="flex.messaging.FlexContext"  %>

<?xml version="1.0" encoding="UTF-8"?>
<result>
<%
	String resultLogout = (String)request.getParameter("result_logout");
%>
	<logout_result><%=resultLogout%></logout_result>
</result>
