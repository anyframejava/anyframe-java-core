<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System Network Utility Test List</title>
<style>
.column { width: 300px; float: left; padding-bottom: 100px; }
.portlet { margin: 0 1em 1em 0; }
.portlet-header { margin: 0.3em; padding-bottom: 4px; padding-left: 0.2em; }
.portlet-header .ui-icon { float: right; }
.portlet-content { padding: 0.4em; }
.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; }
.ui-sortable-placeholder * { visibility: hidden; }
</style>
<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css" />   
<link rel="stylesheet" type="text/css" href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.css'/>"  /> 
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.4.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-system-demo/javascript/commonportlet.js'/>"></script>

<script>
//<![CDATA[
function makeUrl(path){
	return "<c:url value='/utilSystem/"+path+".do'/>";
}

$(document).ready(function() {

	portletBase(function() {
		if($(this).hasClass("ui-icon-refresh")) {
			if($(this).parent().text() == "NativeInfo") {
				search("NativeInfo", function(data){
						var nativeInfo = simpleAutoProperties(data.result);
						$("#nativeInfo").html(nativeInfo);
					  }
				);
			} else if($(this).parent().text() == "OsInfo") {
				search("OsInfo", function(data){
						var osInfo = simpleAutoProperties(data.result);
						$("#osInfo").html(osInfo);
					  }
				);
			} else if($(this).parent().text() == "JavaInfo") {
				search("JavaInfo", function(data){
						var javaInfo = simpleAutoProperties(data.result);
						$("#javaInfo").html(javaInfo);
					  }
				);
			} else if($(this).parent().text() == "ClientInfo") {
				search("ClientInfo", function(data){
						var clientInfo = simpleAutoProperties(data.result);
						$("#clientInfo").html(clientInfo);
					  }
				);
			} else if($(this).parent().text() == "CpuInfo") {
				search("CpuInfo", function(data){
						var cpuInfo = simpleAutoProperties(data.result);
						$("#cpuInfo").html(cpuInfo);
					  }
				);
			} else if($(this).parent().text() == "MemoryInfo") {
				search("MemoryInfo", function(data){
						var memoryInfo = simpleAutoProperties(data.result);
						$("#memoryInfo").html(memoryInfo);
					  }
				);
			} else if($(this).parent().text() == "UptimeInfo") {
				search("UptimeInfo", function(data){
						var uptimeInfo = simpleAutoProperties(data.result);
						$("#uptimeInfo").html(uptimeInfo);
					  }
				);
			} else if($(this).parent().text() == "FileSystemInfo") {
				search("FileSystemInfo", function(data){
						var fileSystemInfo = simpleAutoProperties(data.result);
						var fileSystemInfo = "";
						jQuery.each(data.result, function(i, val) {
							fileSystemInfo = fileSystemInfo + simpleAutoProperties(val);
						});
						$("#fileSystemInfo").html(fileSystemInfo);
					  }
				);
			} else if($(this).parent().text() == "ProcessStatInfo") {
				search("ProcessStatInfo", function(data){
						var processStatInfo = simpleAutoProperties(data.result);
						$("#processStatInfo").html(processStatInfo);
					  }
				);
			} else if($(this).parent().text() == "UlimitInfo") {
				search("UlimitInfo", function(data){
						var ulimitInfo = simpleAutoProperties(data.result);
						$("#ulimitInfo").html(ulimitInfo);
					  }
				);
			}
		} else {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		}
	});

	$("#searchAll" ).trigger("click");

});
//]]>
</script>
</head>
<body>
<div id="header">
	<h2>System Utility Test List <input type="button" id="searchAll" name="searchAll" value="refresh"/></h2>
</div>
<div class="body">

<div class="column">

	<div class="portlet">
		<div class="portlet-header">OsInfo</div>
		<div class="portlet-content" id="osInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">JavaInfo</div>
		<div class="portlet-content" id="javaInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">NativeInfo</div>
		<div class="portlet-content" id="nativeInfo"></div>
	</div>

</div>

<div class="column">

	<div class="portlet">
		<div class="portlet-header">CpuInfo</div>
		<div class="portlet-content" id="cpuInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">MemoryInfo</div>
		<div class="portlet-content" id="memoryInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">UptimeInfo</div>
		<div class="portlet-content" id="uptimeInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">ClientInfo</div>
		<div class="portlet-content" id="clientInfo"></div>
	</div>

</div>

<div class="column">

	<div class="portlet">
		<div class="portlet-header">ProcessStatInfo</div>
		<div class="portlet-content" id="processStatInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">UlimitInfo</div>
		<div class="portlet-content" id="ulimitInfo"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">FileSystemInfo</div>
		<div class="portlet-content" id="fileSystemInfo"></div>
	</div>

</div>

</div><!-- End body -->

</body>
</html>