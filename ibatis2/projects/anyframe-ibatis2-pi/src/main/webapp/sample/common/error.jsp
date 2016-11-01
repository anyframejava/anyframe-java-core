<div id="body">
<%@ page isErrorPage="true"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="org.anyframe.exception.BaseException"%>
<html>
<head>
<title>Error</title>
<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>"
	type="text/css">
</head>
<script type="text/javascript">
</script>
<body bgcolor="#ffffff" text="#000000">

<!--begin of title-->
<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="24">
		<table width="100%" height="24" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="24" class="ct_ttl01" style="padding-left: 12px">Occurred Error!!</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
<!--end of title-->
<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
	<tr>
		<td width="747">
			<table width="370" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td height="5">
						<img src="<c:url value='/sample/images/empty.gif'/>" width="1" height="120">
					</td>
				</tr>
			</table>
		</td>
	</tr>
	<tr>
		<td align="center">
			<table width="512" height="264" border="0" cellpadding="0" cellspacing="0" background="<c:url value='/sample/images/fail.jpg'/>">
				<tr>
					<td height="153">
						<table>
							<tr>
								<td>
									<table width="350" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td width="26">&nbsp;</td>
											<td width="300"><br />
												<font color="red">
												<c:choose>
													<c:when test="${exception.message == 'Occurred Error'}">
														${exception.cause.message} 
													</c:when>
													<c:otherwise>
														${exception.message} 
													</c:otherwise>
												</c:choose>
												</font>
												<p />
												<% if (request.getAttribute("exception") instanceof BaseException) {
												%> <c:if test="${exception.messages.solution != null && exception.message != 'Occured Error'}">
												<br />
												<b>* SOLUTION : </b> 
												${exception.messages.solution}
												</c:if> 
												<c:if test="${exception.messages.solution != null && exception.message != 'Occured Error'}">
												<br />
												<br />
												<b>* REASON : </b>
												${exception.messages.reason}
												</c:if>
												<p />
												<% } %>
								
											</td>
											<td width="20">&nbsp;</td>
										</tr>
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
</div>
