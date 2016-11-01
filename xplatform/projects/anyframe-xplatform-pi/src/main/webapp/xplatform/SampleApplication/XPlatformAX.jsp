<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<HTML>
<HEAD>
<TITLE>XPLATFORM Sample</TITLE>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr">
<SCRIPT LANGUAGE="JavaScript">
var sKey = "xpsample";

var Server_Path = "http://localhost:8080/";
var sAdl = Server_Path + "<c:url value='/xplatform/SampleApplication/'/>" + "SampleApplication.xadl";
var bOnError = false;
var XPLATFORM_CAB_VER = "9.1.1.150";

function fn_onload()
{
	
	XLauncher.xadl = sAdl;
	XLauncher.autosize = false;
	XLauncher.key = sKey;
	XLauncher.launch();
	
}

</SCRIPT>

<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="addlog(strMsg)">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="beforeexit(bCloseFlag, bHandledFlag)">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="communication(bStart)">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="error(nError, strErrMsg)">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="exit()">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="load(strURL)">
	//XPlatformAXCtrl.callscript("af_setEmbededBorder()");
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="loadingglobalvariables(strURL)">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="loadtypedefinition(strURL)">
</SCRIPT>
<SCRIPT LANGUAGE="JavaScript" FOR="XPlatformAXCtrl" EVENT="usernotify(nNotifyID, strMsg)">
</SCRIPT>

</HEAD>
<BODY style="margin:0px;padding:0px;" onload="fn_onload()"  width='100%' height='100%' >
<OBJECT ID="XPlatformAXCtrl" CLASSID="CLSID:FCB889AC-D683-47a0-B04C-8FC42E257E5B" width="1020" height="900"></OBJECT>
<OBJECT ID="XLauncher" CLASSID="CLSID:3371DC5B-9C2F-4d01-AA1D-E7D62B217697" width="800" height="800"></OBJECT>
</BODY>
</HTML>