<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Component Date Utility Test List</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.css'/>"  /> 
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.4.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-demo/javascript/commoncomponent.js'/>"></script>
<script type="text/javascript">

function makeUrl(path){
	return "<c:url value='/utilDemo/"+path+".do'/>"; 
}

$(document).ready(function() {

	$.datepicker.setDefaults({
	    dateFormat: 'yy-mm-dd'
	});

	$("#startDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 5)));
	$("#startDate").datepicker();

	$("#endDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 20)));
	$("#endDate").datepicker();

	$("#basicDate1").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 5)));
	$("#basicDate1").datepicker();

	$("#compareDate").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 20)));
	$("#compareDate").datepicker();

	$("#basicDate2").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 20)));
	$("#basicDate2").datepicker();

	$("#basicDate3").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 20)));
	$("#basicDate3").datepicker();

	$("#startDate1").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 5)));
	$("#startDate1").datepicker();

	$("#endDate1").val($.datepicker.formatDate($.datepicker.ATOM, new Date(2011, 4 - 1, 20)));
	$("#endDate1").datepicker();

	$("input[id^=convert0]").click(convert0);
	$("input[id^=convert1]").click(convert1);
	$("input[id^=convert2]").click(convert2);
	$("input[id^=convert4]").click(convert4);

});



</script>
</head>
<body>
	<div id="container">
		<div id="header">
			<h2>Date Utility Test List</h2>
			<hr />
		</div>
		<div id="body">
			 <ul>
				<li>
				    [getCurrentDay]<br></br>
					<input type="button" id="convert01" name="convert01" value="convert"/>
					<input type="text" id="getCurrentDay" name="getCurrentDay" size="12" disabled /><br><br>
				</li> 
				<li>
				    [getCurrentTime]<br></br>
				    <input type="text" id="pattern" name="pattern" value="yyyy-MM-dd HH:mm"/>
					<input type="button" id="convert11" name="convert11" value="convert"/>
					<input type="text" id="getCurrentTime" name="getCurrentTime" disabled/><br><br>
				</li> 
				<li>
				    [getDays]<br></br>
					from:<input type="text" id="startDate" name="startDate" size="12"/>
					to:<input type="text" id="endDate" name="endDate" size="12"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="getDays" name="getDays" size="12" disabled /><br><br>
					 
				</li>
				<li>
				    [greaterThan]<br></br>
					<input type="text" id="basicDate1" name="basicDate1" size="12"/>
					<input type="text" id="compareDate" name="compareDate" size="12"/>
					<input type="button" id="convert22" name="convert22" value="convert"/>
					<input type="text" id="greaterThan" name="greaterThan" size="12" disabled /><br><br>
				</li>				
				<li>
				    [getEndDate]<br></br>
					<input type="text" id="basicDate2" name="basicDate2" size="12"/>
					<input type="text" id="interval" name="interval" value="5"/>
					<input type="button" id="convert23" name="convert23" value="convert"/>
					<input type="text" id="getEndDate" name="getEndDate" size="12" disabled /><br><br>
				</li>	
				<li>
				    [addYearMonthDay]<br></br>
					date:<input type="text" id="basicDate3" name="basicDate3" size="12"/>
					year:<input type="text" id="years" name="years" value="1" size="2"/>
					month:<input type="text" id="months" name="months" value="4" size="2"/>
					day:<input type="text" id="days" name="days" value="12" size="2"/>
					<input type="button" id="convert41" name="convert41" value="add"/>
					<input type="text" id="addYearMonthDay" name="addYearMonthDay" size="12" disabled /><br><br>
				</li>	
				<li>
				    [isDate]<br></br>
					date:<input type="text" id="basicDate4" name="basicDate4" size="12" value="2011/04/12"/>
					pattern:<input type="text" id="pattern1" name="pattern1" value="yyyy/MM/dd"/>
					<input type="button" id="convert24" name="convert24" value="check"/>
					<input type="text" id="isDate" name="isDate" size="12" disabled /><br><br>
				</li>	
				<li>
				    [getDates] - Array<br></br>
					from:<input type="text" id="startDate1" name="startDate1" size="12"/>
					to:<input type="text" id="endDate1" name="endDate1" size="12"/>
					<input type="button" id="convert25" name="convert25" value="get"/>
					<textarea id="getDates" name="getDates" cols="100" rows="1"></textarea>
					<br></br>
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