<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>System Network Utility Test List</title>
<style type="text/css">
.column { width: 400px; float: left; padding-bottom: 100px; }
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
<script type="text/javascript" src="<c:url value='/chart/javascript/fusionchart-free/jquery.fusioncharts.debug.js'/>"></script>

<script type="text/javascript">
//<![CDATA[
function makeUrl(path){
	return "<c:url value='/utilSystem/"+path+".do'/>";
}

$(document).ready(function() {

	portletBase(function() {
		if($(this).hasClass("ui-icon-refresh")) {
			if($(this).parent().text() == "CpuPercChart") {
				$('#cpuPercChart').insertFusionCharts({
					swfPath: "<c:url value='/chart/javascript/fusionchart-free/charts/'/>",
					type: "Pie2D",
					data: "<c:url value='/utilSystem/getCpuPercChart.do'/>",
					dataFormat: "URIData",
					width: "370",
					height: "270",
					wMode: "opaque"
				});
			} else if($(this).parent().text() == "MemoryUsageChart") {
				$('#memoryUsageChart').insertFusionCharts({
					swfPath: "<c:url value='/chart/javascript/fusionchart-free/charts/'/>",
					type: "Pie2D",
					data: "<c:url value='/utilSystem/getMemoryUsageChart.do'/>",
					dataFormat: "URIData",
					width: "450",
					height: "270",
					wMode: "opaque"
				});
			} else if($(this).parent().text() == "DiskUsageChart") {
				$('#diskUsageChart').insertFusionCharts({
					swfPath: "<c:url value='/chart/javascript/fusionchart-free/charts/'/>",
					type: "StackedBar2D",
					data: "<c:url value='/utilSystem/getDiskUsageChart.do'/>",
					dataFormat: "URIData",
					width: "450",
					height: "350",
					wMode: "opaque"
				});
			} else if($(this).parent().text() == "ProcessMemoryUsageChart") {
				$('#processMemoryUsageChart').insertFusionCharts({
					swfPath: "<c:url value='/chart/javascript/fusionchart-free/charts/'/>",
					type: "Pie2D",
					data: "<c:url value='/utilSystem/getProcessMemoryUsageChart.do'/>",
					dataFormat: "URIData",
					width: "370",
					height: "270",
					wMode: "opaque"
				});
			} else if($(this).parent().text() == "ProcessCpuUsageChart") {
				$('#processCpuUsageChart').insertFusionCharts({
					swfPath: "<c:url value='/chart/javascript/fusionchart-free/charts/'/>",
					type: "Pie2D",
					data: "<c:url value='/utilSystem/getProcessCpuUsageChart.do'/>",
					dataFormat: "URIData",
					width: "370",
					height: "270",
					wMode: "opaque"
				});
			}
		} else {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		}
	});

	$("#diskUsageHeader").prepend( "<span class='ui-icon ui-icon-newwin'></span>");

	$(".portlet-header .ui-icon-newwin").click(function() {
		if($(this).parent().text() == "DiskUsageChart") {

			$("#dialog-modal").dialog({
				width: 1024,
				height: 768,
				zindex: 100,
				modal: true
			});

			$('#diskUsageChartModal').insertFusionCharts({
				swfPath: "<c:url value='/chart/javascript/fusionchart-free/charts/'/>",
				type: "StackedBar2D",
				data: "<c:url value='/utilSystem/getDiskUsageChart.do'/>",
				dataFormat: "URIData",
				width: "1000",
				height: "700"
			});

		}
	});

	$("#searchAll" ).trigger("click");
});
//]]>
</script>
</head>
<body>
<div id="header">
	<h2>SystemUsageChart Test <input type="button" id="searchAll" name="searchAll" value="refresh"/></h2>
</div>
<div class="body">

<div id="dialog-modal" title="DiskUsageChart">
	<span id="diskUsageChartModal"></span>
</div>

<div class="column">

	<div class="portlet">
		<div class="portlet-header">CpuPercChart</div>
		<div class="portlet-content">
			<span id="cpuPercChart">Loading CpuPercChart!</span>
		</div>
	</div>

	<div class="portlet">
		<div class="portlet-header">ProcessMemoryUsageChart</div>
		<div class="portlet-content">
			<span id="processMemoryUsageChart">Loading ProcessMemoryUsageChart!</span>
		</div>
	</div>

	<div class="portlet">
		<div class="portlet-header">ProcessCpuUsageChart</div>
		<div class="portlet-content">
			<span id="processCpuUsageChart">Loading ProcessCpuUsageChartChart!</span>
		</div>
	</div>

</div>

<div class="column" style="width: 500px">

	<div class="portlet">
		<div class="portlet-header">MemoryUsageChart</div>
		<div class="portlet-content">
			<span id="memoryUsageChart">Loading MemoryUsageChart!</span>
		</div>
	</div>

	<div class="portlet">
		<div id="diskUsageHeader" class="portlet-header">DiskUsageChart</div>
		<div class="portlet-content">
			<span id="diskUsageChart">Loading DiskUsageChart!</span>
		</div>
	</div>

</div>

</div><!-- End body -->

</body>
</html>