<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.lang.String" %>

<%
	String mipid = request.getParameter("mipid");

	if(mipid.indexOf("/") >= 0) {
    	mipid = mipid.replace("/", "::");
	} else if(mipid.indexOf("\\") >= 0) {
    	mipid = mipid.replace("\\", "::");
	}
%>

<HTML>
<HEAD>
<TITLE>Movie List</TITLE>
<META HTTP-EQUIV="Content-type" CONTENT="text/html;charset=utf-8">
<script type="text/javascript">
	function fn_run() {
		MiPlatformCtrl.Key = "sample";
		MiPlatformCtrl.DeviceType = "Win32";
		MiPlatformCtrl.VERSION  = "3.3";  
		MiPlatformCtrl.TimeOut = 1800;
      
		MiPlatformCtrl.AutoSize = false;
		MiPlatformCtrl.Retry = 0;
		MiPlatformCtrl.StartXML = "http://" + window.location.host + "<c:url value='/mip-query/extends/mip_query_sdi.xml'/>";
      
		MiPlatformCtrl.InitUrl = "<%= mipid %>";
		MiPlatformCtrl.DoRun();
	}
</SCRIPT>

<SCRIPT LANGUAGE=javascript FOR=MiPlatformCtrl EVENT=LoadCompleted(pDisp,strReqID,strServiceID,strURL)>
	MiPlatformCtrl.SetGlobalVariableValue( "JSESSIONID", "<%=request.getSession().getId()%>"); 
</SCRIPT>
</HEAD>

<BODY onload="fn_run()" left leftmargin="0" topmargin="0" rightmargin="0">

<!--object classid="clsid:761C6511-03CE-4B78-ACD8-645CEF3CB714" id="MiPlatformCtrl" width="100%" height="100%" visible="true"-->
<object classid="clsid:EC3500BB-63AF-45E4-9CBE-C126C77A28B5" id="MiPlatformCtrl" width="100%" height="100%">
	<param name="Key" 		value="sample">  
	<param name="Version" 	value="3.3">
	<param name="DeviceType"  value="Win32">
</object>

</BODY>
</HTML>
