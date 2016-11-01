<%@ page isErrorPage="true"%>
<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="anyframe.common.exception.BaseException"%>
<html>
<head>
<title>Error</title>
<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>"
	type="text/css">
</head>
<script language="javascript">
</script>
<body bgcolor="#ffffff" text="#000000">

<!-- 타이틀 시작 -->
<table width="100%" height="37" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td width="15" height="37">
			<img src="<c:url value='/sample/images/ct_ttl_img01.gif'/>" width="15" height="37">
		</td>
		<td background="<c:url value='/sample/images/ct_ttl_img02.gif'/>" width="100%" style="padding-left: 10px;">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="93%" class="ct_ttl01">Ocurred Error!!!</td>
				</tr>
			</table>
		</td>
		<td width="12" height="37">
			<img src="<c:url value='/sample/images/ct_ttl_img03.gif'/>" width="12" height="37">
		</td>
	</tr>
</table>
<!-- 타이틀 끝 -->
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
			<table width="375" height="153" border="0" cellpadding="0" cellspacing="0" background="<c:url value='/sample/images/fail.jpg'/>">
				<tr>
					<td height="153">
						<table border="1">
							<tr>
								<td>
									<table width="350" border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td width="26">&nbsp;</td>
											<td width="300"><br />
												<font color="red"> ${exception.message} </font>
												<p />
												<% if (request.getAttribute("exception") instanceof anyframe.common.exception.BaseException) {
												%> <c:if test="${exception.messages.solution != null}">
												<br />
												<b>* SOLUTION : </b> 
												${exception.messages.solution}
												</c:if> 
												<c:if test="${exception.messages.reason  != null}">
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

