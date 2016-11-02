<%@ page contentType="text/html; charset=utf-8" %>
<html>
<head>
<title>Anyframe MiPlatform UI Sample</title>
<script type="text/javascript">
	function fnRun() {
		
		<%--if(confirm("전용브라우저로 구동하시겠습니까?")){--%>
			MiInstaller.Key = "AnyframeMiPlatformSample";
			MiInstaller.Width  = 1024;
			MiInstaller.Height	= 768;
			MiInstaller.Retry = 1;
			MiInstaller.Timeout = 300;
			MiInstaller.GlobalVal = "";
			MiInstaller.OnlyOne = true;
			MiInstaller.StartXML = "http://" + window.location.host + "<%=request.getContextPath()%>/mip-query/basic/mip_query_mdi.xml";
		 	MiInstaller.run();

			opener = self;
			window.opener = self;
	    	
			var IE_Version = new Number(((window.navigator.appVersion.split('; '))[1].split(' '))[1]);

			<%-- parent window close logic --%>
			<%--
			if (navigator.appName == "Microsoft Internet Explorer" && IE_Version < 7.0) {
				self.close();
			} else {
				window.open('about:blank', '_self').close();
			}
			--%>
		<%--	
		} else {
			MiPlatformCtrl_330MX.Key = "AnyframeMiPlatformSample";
			MiPlatformCtrl_330MX.DeviceType = "Win32U";
			MiPlatformCtrl_330MX.VERSION  = "3.3";
			MiPlatformCtrl_330MX.TimeOut = 1800;
			MiPlatformCtrl_330MX.AutoSize = false;
			MiPlatformCtrl_330MX.Retry = 0;
			MiPlatformCtrl_330MX.StartXML = "http://" + window.location.host + "<%=request.getContextPath()%>/mip-query/basci/mip_query_mdi.xml";
			MiPlatformCtrl_330MX.DoRun();
			MiPlatformCtrl_330MX.ShowMenuBar(false);
		}
		--%>
	}
</script>
</head>
<body onload="javascript:fnRun();" leftmargin="0" topmargin="0" rightmargin="0">
	<script type="text/javascript">
		//document.write('<object classid="clsid:1A000B1F-B285-4fbf-B3CD-B50845003EBB" id="MiInstaller" width="0" height="0" showtext > ');
		document.write('<object classid="clsid:7BA60C95-4CDD-4c3e-9D9A-81CD3BE0B144" id="MiInstaller" width="0" height="0" showtext > ');
		document.write('<param name="DeviceType" value="Win32U" >');
		document.write('<param name="Version" value="3.3" >');
		document.write('<param name="key" value="AnyframeMiPlatformSample" >');
		document.write('</object>');
	</script>
	<script type="text/javascript">
		//document.write('<object classid="clsid:3F4762E6-3DBD-458C-9BE8-10C0F26C969D" id="MiPlatformCtrl_320MX" width="1024px" height="768px" visible="true" > ');
		document.write('<object classid="clsid:9070C3BF-877E-49CC-AAD0-A02389EEEB13" id="MiPlatformCtrl_330MX" width="1024px" height="768px" visible="true" > ');
		document.write('</object>');
	</script>
	<script type="text/javascript" for="MiPlatformCtrl_320MX" event="ExitApplication()">
		if (/MSIE/.test(navigator.userAgent)) {
			if(navigator.appVersion.indexOf("MSIE 7.0")>=0) {
				window.open('about:blank','_self').close();
			} else {
				window.opener = self;
				self.close();
			}
		}
	</script>
</body>
</html>
