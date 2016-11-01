<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Component Number Utility Test List</title>
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
	$("input[id^=convert3]").click(convert3);

});



</script>
</head>
<body>
	<div id="container">
		<div id="header">
			<h2>Number Utility Test List</h2>
			<hr />
		</div>
		<div id="body">
			 <ul>
				<li>
				    [getRandomNumber]<br></br>
					Target Class:
					<select name="targetClass" id="targetClass">
						<option value="1">integer</option>
						<option value="2">long</option>
						<option value="3">float</option>
						<option value="4">double</option>
					</select>
					<input type="text" id="min" name="min" value="10"/>
					<input type="text" id="max" name="max" value="10010000"/>
					<input type="button" id="convert31" name="convert31" value="generate"/>
					<input type="text" id="getRandomNumber" name="getRandomNumber" size="30" disabled /><br></br>
				</li> 
				<li>
				    [formatNumberByLocale]<br></br>
					value : <input type="text" id="value" name="value" value="4523000"/>
					Locale : <input type="text" id="locale" name="locale" value="kr"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="formatNumberByLocale" name="formatNumberByLocale" size="30" disabled /><br></br>
				</li>
				<li>
				    [formatNumberByPoint]<br></br>
					value : <input type="text" id="value1" name="value1" value="4523000"/>
					point : <input type="text" id="point" name="point" value="3"/>
					<input type="button" id="convert22" name="convert22" value="convert"/>
					<input type="text" id="formatNumberByPoint" name="formatNumberByPoint" size="30" disabled /><br></br>
				</li>
				<li>
				    [isNumber]<br></br>
					<input type="text" id="value2" name="value2" value="4523.2f"/>
					<input type="button" id="convert11" name="convert11" value="check"/>
					<input type="text" id="isNumber" name="isNumber" size="30" disabled /><br></br>
				</li>
				<li>
				    [checkNumberType]<br></br>
					value : <input type="text" id="value3" name="value3" value="4523000"/>
					check : 
					<select name="check" id="check" >
						<option value="positive">positive</option>
						<option value="negative">negative</option>
						<option value="whole">whole</option>
						<option value="real">real</option>
					</select>
					<input type="button" id="convert23" name="convert23" value="check"/>
					<input type="text" id="checkNumberType" name="checkNumberType" size="30" disabled /><br></br>
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