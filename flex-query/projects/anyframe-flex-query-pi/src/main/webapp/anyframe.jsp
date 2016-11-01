<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Anyframe Plugins</title>
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
	<link rel="stylesheet" href="<c:url value='/sample/css/left.css'/>" type="text/css">
	<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
</head>
<body>
<table width="100%" height="50" border="0" cellpadding="0" cellspacing="0">
<!-- Top -->
  <tr>
    <td height="100%" align="left" valign="middle">
		<font size="5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anyframe Java 5.0.0</font>
    </td>
  </tr>
</table>
<!-- Body -->
<center>
<table class="scrollTable" width="90%" border="0" cellspacing="0" cellpadding="0" style="margin-top:10px;">
	<thead>
		<tr>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><font size="2">Installed Plugins</font></th>
			<th scope="col" style="border-right: 1px #CCCCCC solid"><font size="2">Generated CRUD Codes</font></th>
		</tr>
	</thead>
	<tbody>
		<tr class="board">
				<td class="underline">
<!--Add new menu here-->
<!--flex-query-menu-START-->
<a href="javascript:openFlexWindows();">
    <font size="2">- Flex UI Sample 1.0.0</font>
</a>
<script type="text/javascript">
			function openFlexWindows(){
				var url = './flex/Main.html';
				var newWin = window.open(url,"","scrollbars=0,status=0,resizable=0,menubar=0,toolbar=0,location=0,titlebar=0,directories=0,width=1024,height=610");
			}
			</script>
<br />
<!--flex-query-menu-END-->
				</td>
				<td class="underline" valign="top">
<!--Add new crud generation menu here-->
				</td>
		</tr>
	</tbody>
</table>
</center>
</body>
</html>
