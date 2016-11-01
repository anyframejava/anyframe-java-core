<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib uri="http://www.anyframejava.org/tags/simpleweb" prefix="simpleweb" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html140/DTD/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Anyframe Samples</title>
	<!-- for sample codes -->
	<link type="text/css" rel="stylesheet" href="<c:url value="/resources/dijit/themes/tundra/tundra.css" />" />
	<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css" />
	<link rel="stylesheet" href="<c:url value='/sample/css/left.css'/>" type="text/css" />
	<link rel="stylesheet" href="<c:url value='/sample/css/tundra-customized.css'/>" type="text/css">
	 <script type="text/javascript" src="<c:url value="/sample/javascript/CommonScript.js" />"></script>
	<!-- dojo -->
	<script type="text/javascript" src="<c:url value="/resources/dojo/dojo.js" />"></script>  
    <script type="text/javascript" src="<c:url value="/resources/dojo/io/iframe.js" />"></script>  
    <script type="text/javascript" src="<c:url value="/resources/org/anyframe/spring/Anyframe-Spring.js" />"></script>
    <script type="text/javascript" src="<c:url value="/resources/org/anyframe/spring/Anyframe-Spring-Dojo.js" />"></script>
	
	<!-- for jquery -->
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.4.2.min.js'/>"></script>
	<link rel="stylesheet" href="<c:url value='/simpleweb-jquery/css/jquery.css'/>" type="text/css" />
	
	<!-- jquery ui, jqGrid -->
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jqgrid/i18n/grid.locale-en.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.min.js'/>"></script>
	<link href="<c:url value='/simpleweb-jquery/jquery/jqgrid/ui.jqgrid.css'/>" rel="stylesheet" type="text/css" /> 
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jqgrid/jquery.jqGrid.min.js'/>"></script>
	
	<!-- jquery form -->  
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/form/jquery.form.js'/>"></script>
	
	<!-- jquery:jstree-0.9.9 -->
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jstree/lib/jquery.cookie.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jstree/lib/jquery.metadata.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jstree/jquery.tree.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jstree/plugins/jquery.tree.contextmenu.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jstree/plugins/jquery.tree.cookie.js'/>"></script>
	

	<!-- jquery tab -->
	<link href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.css'/>" rel="stylesheet" type="text/css" />
		
	<!-- jquery uploadify -->
	<link rel="stylesheet" href="<c:url value='/simpleweb-jquery/jquery/uploadify/uploadify.css'/>" type="text/css" />
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/uploadify/swfobject.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/uploadify/jquery.uploadify.v2.1.0.min.js'/>"></script>
	
	<!-- jquery image dropdown -->
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/dropdown/msdropdown/js/jquery.dd.js'/>"></script>
	<link href="<c:url value='/simpleweb-jquery/jquery/dropdown/msdropdown/dd.css'/>" rel="stylesheet" type="text/css" />
	
	<!--  quick pager -->
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/quickpager/quickpager.mod.jquery.js'/>"></script>
	<link rel="stylesheet" href="<c:url value='/simpleweb-jquery/jquery/quickpager/pagination.css'/>" type="text/css" />
	
	<!-- validator -->
	<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/validate/jquery.validate.js'/>"></script>
	<link rel="stylesheet" href="<c:url value='/simpleweb-jquery/jquery/validate/validate.css'/>" type="text/css" />
	
</head>
<body class="tundra spring">
<table width="100%" height="520" border="0" cellpadding="0" cellspacing="0">
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
