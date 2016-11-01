<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/sample/common/taglibs.jsp"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Component Utility Test List</title>

</head>
<body>
	<div id="systemContainer">
		<h3>System Utility Test List</h3>
		<h4><a href="${ctx}/utilSystem/systemMain.do">System Utility Test List</a></h4>
		<h4><a href="${ctx}/utilSystem/networkMain.do">Network Utility Test</a></h4>
		<h4><a href="${ctx}/utilSystem/systemUsageMain.do">SystemUsageInfo Test List</a></h4>
		<h4><a href="${ctx}/utilSystem/systemUsageChartMain.do">SystemUsageChart Test List</a></h4>
		<hr/>
	</div>
</body>
</html>