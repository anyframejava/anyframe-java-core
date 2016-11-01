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
			if($(this).parent().text() == "NetworkInfoList") {
				search("NetworkInfoList", function(data){
						var netinfo = "";
						jQuery.each(data.result, function(i, val) {
							netinfo = netinfo + "<ul>"
								+	"<li>Physical Address : " + val.hwaddr + "</li>"
								+	"<li>Host Name : " + val.hostName + "</li>"
								+	"<li>IP Address : " + val.address + "</li>"
								+	"<li>Subnet Mask : " + val.netmask + "</li>"
								+	"<li>Default Gateway : " + val.defaultGateway + "</li>"
								+	"<li>DNS Servers : " + val.primaryDns + "</li>"
								+	", " + val.secondaryDns + "</li>"
								+	"<li>Domain Name : " + val.domainName + "</li>"
								+ "</ul>";
						});
							$("#networkInfo").html(netinfo);
					  }
				);
			} else if($(this).parent().text() == "MyIPInfo") {
				search("MyIPInfo", function(data){
						var val = data.result;
						myInfo = "<ul>"
							+	"<li>Physical Address : " + val.hwaddr + "</li>"
							+	"<li>Host Name : " + val.hostName + "</li>"
							+	"<li>IP Address : " + val.address + "</li>"
							+	"<li>Subnet Mask : " + val.netmask + "</li>"
							+	"<li>Default Gateway : " + val.defaultGateway + "</li>"
							+	"<li>DNS Servers : " + val.primaryDns + "</li>"
							+	", " + val.secondaryDns + "</li>"
							+	"<li>Domain Name : " + val.domainName + "</li>"
							+ "</ul>";
						$("#ip").html(myInfo);
					  }
				);
			} else if($(this).parent().text() == "MyIPList") {
				search("MyIPList", function(data){
						var ipList = simpleAutoProperties(data.result);
						$("#ipList").html(ipList);
					  }
				);
			} else if($(this).parent().text() == "MyMacAddressList") {
				search("MyMacAddressList", function(data){
						var macList = simpleAutoProperties(data.result);
						$("#macList").html(macList);
					  }
				);
			} /* else if($(this).parent().text() == "PortScan") {
				search("PortScan", function(data){
						var netstat = simpleAutoProperties(data.result);
						$("#netstat").html(netstat);
					  }
				);
			} */ else if($(this).parent().text() == "Route") {
				search("Route", function(data){
						var route = simpleAutoProperties(data.result);
						$("#route").html(route);
					  }
				);
			} else if($(this).parent().text() == "Ping") {
				search("Ping", function(data){
						$("#pingResult").val(data.result);
					  }, {dest : $("#dest").val()}
				);
			}
		} else {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		}
	});

	$("#portScanHeader > span").remove(".ui-icon-refresh");
	$("#portScanHeader").prepend( "<span class='ui-icon ui-icon-arrowrefresh-1-n'></span>");

	$(".portlet-header .ui-icon-arrowrefresh-1-n").click(function() {
		if($(this).parent().text() == "PortScan") {
			search("PortScan", function(data){
				var netstat = simpleAutoProperties(data.result);
				$("#netstat").html(netstat);
			  }
			);
		}
	});

	$("#searchAll" ).trigger("click");
});
//]]>
</script>
</head>
<body>
<div id="header">
	<h2>Network Utility Test List <input type="button" id="searchAll" name="searchAll" value="refresh"/></h2>
</div>
<div class="body">

<div class="column">

	<!-- <input type="button" id="search" name="search" value="search"/> -->

	<div class="portlet">
		<div class="portlet-header">NetworkInfoList</div>
		<div class="portlet-content" id="networkInfo"></div>
	</div>

</div>

<div class="column">

	<div class="portlet">
		<div class="portlet-header">MyIPInfo</div>
		<div class="portlet-content" id="ip"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">MyIPList</div>
		<div class="portlet-content" id="ipList"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">MyMacAddressList</div>
		<div class="portlet-content" id="macList"></div>
	</div>

	<div class="portlet">
		<div class="portlet-header">Ping</div>
		<div class="portlet-content" id="ping"><input type="text" id="dest" name="dest" value="localhost"/><input type="text" id="pingResult" name="pingResult" style="width:50" readonly="true" /></div>
	</div>

</div>

<div class="column">

	<div class="portlet">
		<div class="portlet-header">Route</div>
		<div class="portlet-content" id="route"></div>
	</div>

	<div class="portlet">
		<div id="portScanHeader" class="portlet-header">PortScan</div>
		<div class="portlet-content" id="netstat">네트워크 환경에 따라 PortScan 이 느린 경우가 있으므로 별도 실행하세요.</div>
	</div>

</div>

</div><!-- End body -->

<!--
<div class="demo-description">
<p>
	Enable portlets (styled divs) as sortables and use the <code>connectWith</code>
	option to allow sorting between columns.
</p>
</div>
-->
<!-- End demo-description -->


</body>
</html>