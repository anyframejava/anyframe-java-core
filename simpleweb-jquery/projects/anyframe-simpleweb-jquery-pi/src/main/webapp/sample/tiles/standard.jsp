<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Anyframe Plugins</title>
	<link type="text/css" rel="stylesheet" href="<c:url value="/resources/dijit/themes/tundra/tundra.css" />" />
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css">
	<link rel="stylesheet" href="<c:url value='/sample/css/left.css'/>" type="text/css">
	<link rel="stylesheet" href="<c:url value='/sample/css/tundra-customized.css'/>" type="text/css">
	<script type="text/javascript" src="<c:url value="/resources/dojo/dojo.js" />"></script>  
    <script type="text/javascript" src="<c:url value="/resources/dojo/io/iframe.js" />"></script>  
    <script type="text/javascript" src="<c:url value="/resources/spring/Spring.js" />"> </script>
	<script type="text/javascript" src="<c:url value="/resources/spring/Spring-Dojo.js" />"> </script>
	<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/sample/javascript/calendar.js'/>"></script>	
</head>
<body class="tundra spring">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
  <!---- Left Menu ------>
    <td width="177" height="100%" align="left" valign="top"  bgcolor="#eeeeee">
    	<div id="left">
    		<tiles:insertAttribute name="left"/>
    	</div>
    </td>
	<!---- Body ------>
    <td width="100%" height="100%" align="left" valign="top" style="padding:0 20px 0 20px">   
		<div id="body">
        	<tiles:insertAttribute name="body"/>
        </div>	
    </td>
  </tr>
</table>
</body>
</html>
