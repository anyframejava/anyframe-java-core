<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Component Validation Utility Test List</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.css'/>"  /> 
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.4.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.min.js'/>"></script>
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
</head>
<body>
	<div id="container">
		<div id="header">
			<h2>Validation Utility Test List</h2>
			<hr />
		</div>
		<div id="body">
			 <ul>
				<li>
				    [isEmailAddress]<br></br>
					email:<input type="text" id="email" name="email" size="40" value="anyframe@samsung.com"/>
					<input type="button" id="convert11" name="convert11" value="convert"/>
					<input type="text" id="isEmailAddress" name="isEmailAddress" size="12" disabled /><br></br>
				</li> 
				<li>
				    [isUserFormat]<br></br>
				    Checks the setting for the format is correct. # is the number, s is the character.<br></br>
					string:<input type="text" id="str" name="str" size="30" value="123-asd"/>
					user defined format:<input type="text" id="format" name="format" size="30" value="###-SSS"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="isUserFormat" name="isUserFormat" size="12" disabled /><br></br>
				</li> 
				<li>
				    [isRegexPatternMatch]<br></br>
				    Checks the characters fitted into the pattern. It must match the entire sentence.<br></br>
					string:<input type="text" id="str1" name="str1" size="30" value="aaaaab"/>
					<input type="text" id="pattern" name="pattern" size="30" value="a*b"/>
					<input type="button" id="convert22" name="convert22" value="convert"/>
					<input type="text" id="isRegexPatternMatch" name="isRegexPatternMatch" size="12" disabled /><br></br>
				</li> 
				<li>
				    [isPatternMatching]<br></br>
				    Checks the characters fitted into the user's pattern. * represents the full text.<br></br>
					string:<input type="text" id="str2" name="str2" size="30" value="abc-def"/>
					pattern:<input type="text" id="pattern1" name="pattern1" size="30" value="*-*"/>
					<input type="button" id="convert23" name="convert23" value="convert"/>
					<input type="text" id="isPatternMatching" name="isPatternMatching" size="12" disabled /><br></br>
				</li> 
				<li>
				    [isPatternInclude]<br></br>
				    Checks the characters that contains special character, korean, english, number. <br></br>
				    'special' is special characters.<br></br>
					string:<input type="text" id="str3" name="str3" size="30" value="asdf@5456""/>
					<select name="pattern2" id="pattern2">
						<option value="s">special</option>
						<option value="k">korean</option>
						<option value="e">english</option>
						<option value="n">number</option>
					</select>
					<input type="button" id="convert24" name="convert24" value="convert"/>
					<input type="text" id="isPatternInclude" name="isPatternInclude" size="12" disabled /><br></br>
				</li> 
				<li>
				    [isRegexPatternInclude]<br></br>
				    Checks the characters fitted into the part of the pattern. <br></br>
					string:<input type="text" id="str4" name="str4" size="30" value="cccc123123abbbb"/>
					<input type="text" id="pattern3" name="pattern3" size="30" value="a*b"/>
					<input type="button" id="convert21" name="convert21" value="convert"/>
					<input type="text" id="isRegexPatternInclude" name="isRegexPatternInclude" size="12" disabled /><br></br>
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