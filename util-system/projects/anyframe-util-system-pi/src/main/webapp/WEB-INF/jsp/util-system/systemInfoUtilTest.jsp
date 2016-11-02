<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe 5.5.2-SNAPSHOT Main</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>
<!-- jQuery component -->
<link rel="stylesheet" type="text/css" href="<c:url value='/util-system-jquery/jquery/jquery-ui/smoothness/jquery-ui-1.8.16.custom.css'/>"  />
<style type="text/css">
.column { width: 300px; float: left; padding-bottom: 100px; }
.portlet { margin: 0 1em 1em 0; }
.portlet-header { margin: 0.3em; padding-bottom: 4px; padding-left: 0.2em; }
.portlet-header .ui-icon { float: right; }
.portlet-content { padding: 0.4em; }
.ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; }
.ui-sortable-placeholder * { visibility: hidden; }
</style> 
</head>

<body>
<div id="wrap">
	<div class="skipnavigation">
		<a href="#contents">Jump up to the contents</a>
	</div>
    <hr />
    
    <div id="header">
    	<div class="toplogo"><h1><a href="<c:url value='/anyframe.jsp'/>"><img src="<c:url value='/sample/images/h1_toplogo.jpg'/>" alt="anyframe"/></a></h1></div>

		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/utilSystem/utilSystemList.do'/>">Util-System 1.5.2-SNAPSHOT</a></div>
    </div>
    <hr />
   
<script type="text/javascript" src="<c:url value='/util-system-jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-system-jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-system/javascript/commonportlet.js'/>"></script>

<script type="text/javascript">
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
</script>

<div id="container">
    	<div class="cont_top">
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
</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>	