<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Long Transaction</title>
</head>
<body>
	<h1>Long Transaction~!</h1>
	<form method="GET" action="longTransactionAsyncContext">
		<table>
			<tr>
				<td><input type="submit" value="longTransaction" /></td>
			</tr>
		</table>
	</form>
	<h2>Returned Message</h2>
	<div id="content">
		<%
			if (application.getAttribute("message") != null) {
		%>
		<%=application.getAttribute("message")%>
		<%
			}
		%>
	</div>
</body>
</html>