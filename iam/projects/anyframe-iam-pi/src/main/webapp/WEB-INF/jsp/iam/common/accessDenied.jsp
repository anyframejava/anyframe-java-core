<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@ page import="org.springframework.security.core.Authentication" %>
<%@ page import="org.springframework.security.web.access.AccessDeniedHandlerImpl" %> 
<html>
<head>
<title>Access Denied</title>
<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
</head>
<script type="text/javascript">
</script>
<body bgcolor="#ffffff" text="#000000">

<!-- begin of title -->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Occurred Access Denied Error!</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!-- end of title -->
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
	<tr>
		<td width="747">
			<table width="370" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td height="120">
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td align="center">
			<table width="375" height="153" border="0" cellpadding="0" cellspacing="0">
				<tr>
					<td height="153">
						<table border="1">
							<tr>
								<td>
									<table width="400" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td width="50">&nbsp;</td>
											<td width="350">
												<br />
												<font color="red">
												<%= request.getAttribute(AccessDeniedHandlerImpl.SPRING_SECURITY_ACCESS_DENIED_EXCEPTION_KEY)%>
												<%		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
														if (auth != null) { %>
												<%      } %>
												</font>
												<br/>
												<br/>
											</td>
										</tr>
										<tr>
											<td>&nbsp;&nbsp;</td>
											<td align="right">
												<table border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td width="17" height="23"><img src="<c:url value='/sample/images/ct_btnbg01.gif'/>" width="17" height="23"></td>
														<td background="<c:url value='/sample/images/ct_btnbg02.gif'/>" class="ct_btn01" style="padding-top:3px;"><a href="<c:url value='/directorLogin.do'/>">Back to Login View</a></td>
														<td width="14" height="23"><img src="<c:url value='/sample/images/ct_btnbg03.gif'/>" width="14" height="23"></td>																									
														<td width="50">&nbsp;</td>
													</tr>
												</table>
											</td>											
										</tr>
										<tr><td height="5" colspan="2"></td></tr>
									</table>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td align="center"></td>
	</tr>
</table>
</body>
</html>