<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<html>
  <head>
    <title>LOGIN</title>
    <%@ include file="/sample/common/meta.jsp" %>
    <title>Anyframe Login Plugin</title>
	<meta name="heading" content="Users"/>    
    <link rel="stylesheet" type="text/css" media="all" href="<c:url value='/sample/css/displaytag.css'/>" />     
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
	
    <script type="text/javascript" src="<c:url value='/sample/javascript/prototype.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/sample/javascript/global.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>   
    <script type="text/javascript">
	function fncSubmit() {
		var id = document.getElementsByName("id")[0];
		var password = document.getElementsByName("password")[0];
		if ( id.value.length < 6 ){
			alert("invalid id");
			return;
		}
		if ( password.value.length < 8 ){
			alert("invalid password");
			return;
		}
		document.loginForm.action="<c:url value='login.do'/>";
		document.loginForm.submit();
	}	
    </script>  
  </head>
  <body>
	<table width="100%" height="400" border="0" cellpadding="0" cellspacing="0">
	  <tr>
	    <td align="center">
	   		<form name="loginForm" method="POST">
				<table>
					<tr>
						<td>User : </td><td><input type='text' id="id" name="id" size="15"></td>
						<td>Password : </td><td><input type='password' name='password' size="15"></td>
						<td colspan='2'><input type="button" value="Login" onclick="javascript:fncSubmit()"></td>
					</tr>
					<tr>
						<td colspan="3">
						<c:if test="${not empty loginError}">
										<font color="red">
										<spring:message code="${loginError}"/></font></c:if></td>
					</tr>
				</table>
				<br/>
				<table border="0">
					<tr>
						<td align="center">Locale</td>
						<td align="center" width="200">ID</td>
						<td align="center">Password</td>
					</tr>
					<tr>
						<td align="center"><img src="<c:url value='/sample/images/kr.png'/>" width="16" height="11" border="0" align="absmiddle"></img></td>
						<td align="center">anyframe_ko</td>
						<td align="center">anyframe0</td>
					</tr>
					<tr>
						<td align="center"><img src="<c:url value='/sample/images/en.png'/>" width="16" height="11" border="0" align="absmiddle"></img></td>
						<td align="center">anyframe_en</td>
						<td align="center">anyframe1</td>
					</tr>
				</table>    
	   		</form>
	    </td>
	  </tr>
	</table>
  </body>
</html>
