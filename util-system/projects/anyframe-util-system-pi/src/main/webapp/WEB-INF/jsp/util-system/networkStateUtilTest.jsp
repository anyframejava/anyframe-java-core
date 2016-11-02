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
<!--
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
//-->
</script>
<div id="container">
    	<div class="cont_top">
			<h2>Network Utility Test List <input type="button" id="searchAll" name="searchAll" value="refresh"/></h2>
		</div>
		
	<div class="body">
	
		<div class="column">
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
				<div class="portlet-content" id="ping"><input type="text" id="dest" name="dest" value="localhost"/><input type="text" id="pingResult" name="pingResult" style="width:50" readonly="readonly"/></div>
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
</div>	

    <hr />
<%@ include file="/sample/common/bottom.jsp"%>