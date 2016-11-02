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

	$("input[id^=convert1]").click(convert1);
	$("input[id^=convert2]").click(convert2);
	$("input[id^=convert3]").click(convert3);

});
</script>
<div id="container">
    	<div class="cont_top">
        	<h2>Number Utility Test List</h2>
      	</div>
		<div class="util_list">
			 <dl>
				<dt>[getRandomNumber]</dt>
				<dd>
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
					<input type="text" id="getRandomNumber" name="getRandomNumber" size="30" disabled="disabled" />
				</dd> 
				<dt>[formatNumberByLocale]</dt>
				<dd>
					value : <input type="text" id="value" name="value" value="4523000"/>
					Locale : <input type="text" id="locale" name="locale" value="kr"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="formatNumberByLocale" name="formatNumberByLocale" size="30" disabled="disabled" />
				</dd>
				<dt>[formatNumberByPoint]</dt>
				<dd>
					value : <input type="text" id="value1" name="value1" value="4523000"/>
					point : <input type="text" id="point" name="point" value="3"/>
					<input type="button" id="convert22" name="convert22" value="convert"/>
					<input type="text" id="formatNumberByPoint" name="formatNumberByPoint" size="30" disabled="disabled" />
				</dd>
				<dt>[isNumber]</dt>
				<dd>
					<input type="text" id="value2" name="value2" value="4523.2f"/>
					<input type="button" id="convert11" name="convert11" value="check"/>
					<input type="text" id="isNumber" name="isNumber" size="30" disabled="disabled" />
				</dd>
				<dt>[checkNumberType]</dt>
				<dd>
					value : <input type="text" id="value3" name="value3" value="4523000"/>
					check : 
					<select name="check" id="check" >
						<option value="positive">positive</option>
						<option value="negative">negative</option>
						<option value="whole">whole</option>
						<option value="real">real</option>
					</select>
					<input type="button" id="convert23" name="convert23" value="check"/>
					<input type="text" id="checkNumberType" name="checkNumberType" size="30" disabled="disabled" />
				</dd>
			 </dl>
		</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>