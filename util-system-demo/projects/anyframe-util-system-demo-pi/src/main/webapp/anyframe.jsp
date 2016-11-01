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
		<font size="5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anyframe Java 5.0.0.RC1</font>
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
					<a href="${ctx}/coreMovieFinder.do?method=list"><font size="2">- Core 1.0.0.RC1</font></a><br/>
<!--Add new menu here-->
<!--simpleweb-json-menu-START-->
<a href="${ctx}/simplewebjson.do">
    <font size="2">- Simpleweb-JSON 1.0.0.RC1</font>
</a>
<br />

<!--simpleweb-json-menu-END-->

<!--idgen-menu-START-->
<font size="2">- Idgen 1.0.0.RC1</font><br/>
<!--idgen-menu-END-->
<!--query-menu-START-->
					<a href="${ctx}/queryMovieFinder.do?method=list"><font size="2">- Query 1.0.0.RC1</font></a><br/>

<!--query-menu-END-->
<!--simpleweb-menu-START-->
<font size="2">- Simpleweb 1.0.0.RC1</font><br/>
<!--simpleweb-menu-END-->
<!--tiles-menu-START-->
					<a href="${ctx}/tilesMovieFinder.do?method=list"><font size="2">- Tiles 1.0.0.RC1</font></a><br/>

<!--tiles-menu-END-->
<!--chart-menu-START-->
<font size="2">- Chart 1.0.0.RC1</font><br/>
<!--chart-menu-END-->

<!--util-system-menu-START-->
<font size="2">- Util-system 1.0.0.RC1</font><br/>
<!--util-system-menu-END-->
<!--logging-menu-START-->
<font size="2">- Logging 1.0.0.RC1</font><br/>
<!--logging-menu-END-->
<!--spring-menu-START-->
<font size="2">- Spring 1.0.0.RC1</font><br/>
<!--spring-menu-END-->
<!--datasource-menu-START-->
<font size="2">- Datasource 1.0.0.RC1</font><br/>
<!--datasource-menu-END-->
<!--util-system-demo-menu-START-->
<a href="${ctx}/utilSystem/utilSystemList.do"><font size="2">- util-system-demo 1.0.0.RC1</font></a><br/>
<!--util-system-demo-menu-END-->
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
