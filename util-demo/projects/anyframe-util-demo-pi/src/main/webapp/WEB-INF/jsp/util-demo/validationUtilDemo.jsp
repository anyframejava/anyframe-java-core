<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe 5.2.0 Main</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>
<!-- jQuery component -->
<link rel="stylesheet" type="text/css" href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/smoothness/jquery-ui-1.8.16.custom.css'/>"  /> 
</head>

<body>
<div id="wrap">
	<div class="skipnavigation">
		<a href="#contents">Jump up to the contents</a>
	</div>
    <hr />
    
    <div id="header">
    	<div class="toplogo"><h1><a href="<c:url value='/anyframe.jsp'/>"><img src="<c:url value='/sample/images/h1_toplogo.jpg'/>" alt="anyframe"/></a></h1></div>

		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/utilDemo/utilDemoList.do'/>">Util-demo 1.0.2</a></div>
    </div>
    <hr />
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-demo/javascript/commoncomponent.js'/>"></script>
<script type="text/javascript">

function makeUrl(path){
	return "<c:url value='/utilDemo/"+path+".do'/>"; 
}

$(document).ready(function() {

	$("input[id^=convert0]").click(convert0);
	$("input[id^=convert1]").click(convert1);
	$("input[id^=convert2]").click(convert2);
	$("input[id^=convert4]").click(convert4);

});
</script>
	<div id="container">
    	<div class="cont_top">
        	<h2>Validation Utility Test List</h2>
      	</div>
		<div class="util_list">
        	<dl>
            	<dt>[isEmailAddress]</dt>
            	<dd>
					email:<input type="text" id="email" name="email" size="40" value="anyframe@samsung.com"/>
					<input type="button" id="convert11" name="convert11" value="convert"/>
					<input type="text" id="isEmailAddress" name="isEmailAddress" size="12" disabled="disabled" />
				</dd>
				<dt>[isUserFormat]<br></br>
				Checks the setting for the format is correct. # is the number, s is the character.</dt>
				<dd>
					string:<input type="text" id="str" name="str" size="30" value="123-asd"/>
					user defined format:<input type="text" id="format" name="format" size="30" value="###-SSS"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="isUserFormat" name="isUserFormat" size="12" disabled="disabled" />
				</dd>
				<dt>[isRegexPatternMatch]<br></br>
				    Checks the characters fitted into the pattern. It must match the entire sentence.</dt>
				<dd>
					string:<input type="text" id="str1" name="str1" size="30" value="aaaaab"/>
					<input type="text" id="pattern" name="pattern" size="30" value="a*b"/>
					<input type="button" id="convert22" name="convert22" value="convert"/>
					<input type="text" id="isRegexPatternMatch" name="isRegexPatternMatch" size="12" disabled="disabled" />
				</dd>
				<dt>[isPatternMatching]<br></br>
				    Checks the characters fitted into the user's pattern. * represents the full text.</dt>
				<dd>
					string:<input type="text" id="str2" name="str2" size="30" value="abc-def"/>
					pattern:<input type="text" id="pattern1" name="pattern1" size="30" value="*-*"/>
					<input type="button" id="convert23" name="convert23" value="convert"/>
					<input type="text" id="isPatternMatching" name="isPatternMatching" size="12" disabled="disabled" />
				</dd> 
				<dt>[isPatternInclude]<br></br>
				    Checks the characters that contains special character, korean, english, number. <br></br>
				    'special' is special characters.</dt>
				<dd>
					string:<input type="text" id="str3" name="str3" size="30" value="asdf@5456""/>
					<select name="pattern2" id="pattern2">
						<option value="s">special</option>
						<option value="k">korean</option>
						<option value="e">english</option>
						<option value="n">number</option>
					</select>
					<input type="button" id="convert24" name="convert24" value="convert"/>
					<input type="text" id="isPatternInclude" name="isPatternInclude" size="12" disabled="disabled" />
				</dd>
				<dt>[isRegexPatternInclude]<br></br>
				    Checks the characters fitted into the part of the pattern. </dt>
				<dd>
					string:<input type="text" id="str4" name="str4" size="30" value="cccc123123abbbb"/>
					<input type="text" id="pattern3" name="pattern3" size="30" value="a*b"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="isRegexPatternInclude" name="isRegexPatternInclude" size="12" disabled="disabled" />
				</dd> 
			</dl>
		</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>