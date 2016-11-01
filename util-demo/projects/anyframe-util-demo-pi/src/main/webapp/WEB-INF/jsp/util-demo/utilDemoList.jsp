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
	<div id="componentContainer">
		<h3>Component Utility Test List</h2> 
		<h4><a href="${ctx}/utilDemo/dateMain.do">Date Utility Test</a></h4>
		<h4><a href="${ctx}/utilDemo/digestMain.do">Digest Utility Test</a></h4>
		<h4><a href="${ctx}/utilDemo/numberMain.do">Number Utility Test</a></h4>
		<h4><a href="${ctx}/utilDemo/stringMain.do">String Utility Test</a></h4>
		<h4><a href="${ctx}/utilDemo/validationMain.do">Validation Utility Test</a></h4>
	</div>
</body>
</html>