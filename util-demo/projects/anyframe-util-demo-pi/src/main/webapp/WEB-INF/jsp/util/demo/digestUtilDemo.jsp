<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Component Digest Utility Test List</title>
<link rel="stylesheet" href="<c:url value='/sample/css/admin.css'/>" type="text/css" />    
<link rel="stylesheet" type="text/css" href="<c:url value='/dashboard/css/smoothness/jquery-ui-1.8.9.custom.css'/>"  /> 
<script type="text/javascript" src="<c:url value='/dashboard/javascript/jquery/jquery-1.4.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/dashboard/javascript/jquery/jquery-ui-1.8.9.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util/demo/javascript/commoncomponent.js'/>"></script>
<script type="text/javascript">

function makeUrl(path){
	return "<c:url value='/utilDemo/"+path+".do'/>"; 
}

$(document).ready(function() {

	$("input[id^=convert1]").click(convert1);
	$("input[id^=convert2]").click(convert2);
});

</script>
</head>
<body>
	<div id="container">
		<div id="header">
			<h2>Digest Utility Test List</h2>
			<hr />
		</div>
		<div id="body">
			 <ul>
				<li>
				    [encodeBase64]<br></br>
					String:<input type="text" id="str3" name="str3" size="40" value="Anyframe Java Test"/>
					<input type="button" id="convert11" name="convert11" value="convert"/>
					<input type="text" id="encodeBase64" name="encodeBase64" size="40" disabled /><br></br>
				</li>
				<li>
				    [decodeBase64]<br></br>
					String:<input type="text" id="str4" name="str4" size="40" value="QW55ZnJhbWUgSmF2YSBUZXN0"/>
					<input type="button" id="convert12" name="convert12" value="convert"/>
					<input type="text" id="decodeBase64" name="decodeBase64" size="40" disabled /><br></br>
				</li>
				<li>
				    [encodePassword]<br></br>
					String:<input type="text" id="str5" name="str5" size="40" value="test1234"/>
					Algorithm:
					<select name="algorithm1" id="algorithm1">
						<option value="SHA-1">SHA-1</option>
						<option value="SHA-256">SHA-256</option>
						<option value="SHA-384">SHA-384</option>
						<option value="SHA-512">SHA-512</option>
						<option value="MD2">MD2</option>
						<option value="MD5">MD5</option>
					</select>
					<input type="button" id="convert23" name="convert23" value="convert"/>
					<input type="text" id="encodePassword" name="encodePassword" size="50" disabled /><br></br>
				</li>
			 </ul>
		</div>
		<div id="footer">
			<address>
			Copyright(c) Anyframe Java All rights Reserved.
			</address>
		</div>
	</div>
</body>
</html>