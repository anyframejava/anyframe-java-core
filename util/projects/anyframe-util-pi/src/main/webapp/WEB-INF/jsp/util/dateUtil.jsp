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
<link rel="stylesheet" type="text/css" href="<c:url value='/util-jquery/jquery/jquery-ui/smoothness/jquery-ui-1.8.16.custom.css'/>"  /> 
</head>

<body>
<div id="wrap">
	<div class="skipnavigation">
		<a href="#contents">Jump up to the contents</a>
	</div>
    <hr />
    
    <div id="header">
    	<div class="toplogo"><h1><a href="<c:url value='/anyframe.jsp'/>"><img src="<c:url value='/sample/images/h1_toplogo.jpg'/>" alt="anyframe"/></a></h1></div>

		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/util/utilList.do'/>">Util 1.0.5-SNAPSHOT</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/util-jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util/javascript/commoncomponent.js'/>"></script>
<script type="text/javascript">

function makeUrl(path){
	return "<c:url value='/util/"+path+".do'/>"; 
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
<div id="container">
    	<div class="cont_top">
        	<h2>Date Utility Test List</h2>
      	</div>
		<div class="util_list">
			 <dl>
				<dt>[getCurrentDate]</dt>
				<dd>
					<input type="button" id="convert01" name="convert01" value="convert"/>
					<input type="text" id="getCurrentDate" name="getCurrentDate" size="12" disabled="disabled" />
				</dd>
				<dt>[getCurrentDateTime]</dt>
				<dd>
				    <input type="text" id="pattern" name="pattern" value="yyyy-MM-dd HH:mm"/>
					<input type="button" id="convert11" name="convert11" value="convert"/>
					<input type="text" id="getCurrentDateTime" name="getCurrentDateTime" disabled="disabled"/>
				</dd> 
				<dt>[getDays]</dt>
				<dd>
					from:<input type="text" id="startDate" name="startDate" size="12"/>
					to:<input type="text" id="endDate" name="endDate" size="12"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="getDays" name="getDays" size="12" disabled="disabled" />
					 
				</dd>
				<dt>[greaterThan]</dt>
				<dd>
					<input type="text" id="basicDate1" name="basicDate1" size="12"/>
					<input type="text" id="compareDate" name="compareDate" size="12"/>
					<input type="button" id="convert22" name="convert22" value="convert"/>
					<input type="text" id="greaterThan" name="greaterThan" size="12" disabled="disabled" />
				</dd>				
				<dt>[getEndDate]</dt>
				<dd>
					<input type="text" id="basicDate2" name="basicDate2" size="12"/>
					<input type="text" id="interval" name="interval" value="5"/>
					<input type="button" id="convert23" name="convert23" value="convert"/>
					<input type="text" id="getEndDate" name="getEndDate" size="12" disabled="disabled" />
				</dd>	
				<dt>[addYearMonthDay]</dt>
				<dd>
					date:<input type="text" id="basicDate3" name="basicDate3" size="12"/>
					year:<input type="text" id="years" name="years" value="1" size="2"/>
					month:<input type="text" id="months" name="months" value="4" size="2"/>
					day:<input type="text" id="days" name="days" value="12" size="2"/>
					<input type="button" id="convert41" name="convert41" value="add"/>
					<input type="text" id="addYearMonthDay" name="addYearMonthDay" size="12" disabled="disabled" />
				</dd>
				<dt>[isDate]</dt>
				<dd>
					date:<input type="text" id="basicDate4" name="basicDate4" size="12" value="2011/04/12"/>
					pattern:<input type="text" id="pattern1" name="pattern1" value="yyyy/MM/dd"/>
					<input type="button" id="convert24" name="convert24" value="check"/>
					<input type="text" id="isDate" name="isDate" size="12" disabled="disabled" />
				</dd>	
				<dt>[getDates] - Array</dt>
				<dd>
					from:<input type="text" id="startDate1" name="startDate1" size="12"/>
					to:<input type="text" id="endDate1" name="endDate1" size="12"/>
					<input type="button" id="convert25" name="convert25" value="get"/>
					<textarea id="getDates" name="getDates" cols="100" rows="1"></textarea>
				</dd>
			</dl>
		</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>
