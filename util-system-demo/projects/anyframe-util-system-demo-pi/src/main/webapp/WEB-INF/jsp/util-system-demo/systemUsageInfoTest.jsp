<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System Network Utility Test List</title>
<style type="text/css">
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
<script type="text/javascript">
//<![CDATA[
function makeUrl(path){
	return "<c:url value='/utilSystem/"+path+".do'/>";
}

$(document).ready(function() {

	portletBase(function() {
		if($(this).hasClass("ui-icon-refresh")) {
			if($(this).parent().text() == "CpuPerc") {
				search("CpuPerc", function(data){
						var cpuPerc = simpleAutoProperties(data.result);
						$("#cpuPerc").html(cpuPerc);
					  }
				);
			} else if($(this).parent().text() == "CpuPercList") {
				search("CpuPercList", function(data){
						var cpuPercList = simpleAutoProperties(data.result);
						$("#cpuPercList").html(cpuPercList);
					  }
				);
			} else if($(this).parent().text() == "DiskUsage") {
				search("DiskUsage", function(data){
						var diskUsage = simpleAutoProperties(data.result);
						$("#diskUsage").html(diskUsage);
					  }
				);
			} else if($(this).parent().text() == "ProcessList") {
				search("ProcessList", function(data){
						//var processList = simpleAutoProperties(data.result);
						var processList = "<ul>";
						var titleArr = ['pid', 'user', 'startTime', 'size', 'resident', 'share', 'state', 'total', 'desc'];
						var loopCount = 0;
						jQuery.each(data.result, function(i, val) {
							processList += "<li>" + titleArr[loopCount%9] + " : " + val + "</li>";
							loopCount++;
							if(loopCount%9 == 0) {
								processList += "<br/>";
							}
						});
						$("#processList").html(processList);
					  }
				);
			} else if($(this).parent().text() == "ProcessInfo") {
				search("ProcessInfo", function(data){
						var processInfo = simpleAutoProperties(data.result);
						processInfo = "PID : <input type='text' id='pid' name='pid' style='width:50'/>" + processInfo;
						$("#processInfo").html(processInfo);
					  }, {pid : $("#pid").val()}
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
	<h2>SystemUsageInfo Test List <input type="button" id="searchAll" name="searchAll" value="refresh"/></h2>
</div>
<div class="body">

<div class="column">

	<div class="portlet">
		<div class="portlet-header">CpuPerc</div>
		<div class="portlet-content" id="cpuPerc"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">CpuPercList</div>
		<div class="portlet-content" id="cpuPercList"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">DiskUsage</div>
		<div class="portlet-content" id="diskUsage"></div>
	</div>

</div>

<div class="column" style="width: 600px">

	<div class="portlet">
		<div class="portlet-header">ProcessInfo</div>
		<div class="portlet-content" id="processInfo">ex.) System Idle Process PID <input type="text" id="pid" name="pid" value="0" style="width:50"/></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">ProcessList</div>
		<div class="portlet-content" id="processList"></div>
	</div>

</div>

</div><!-- End body -->

</body>
</html>