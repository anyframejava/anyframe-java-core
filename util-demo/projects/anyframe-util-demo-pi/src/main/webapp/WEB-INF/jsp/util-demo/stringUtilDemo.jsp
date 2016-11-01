<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Component String Utility Test List</title>
<link rel="stylesheet" type="text/css" href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.css'/>"  /> 
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.4.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.9.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/util-demo/javascript/commoncomponent.js'/>"></script>
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
			<h2>String Utility Test List</h2>
			<hr />
		</div>
		<div id="body">
			 <ul>
				<li>
				    [getRandomString]<br></br>
					<input type="text" id="length" name="length" size="5" value="15"/>
					<input type="button" id="convert11" name="convert11" value="generate"/>
					<input type="text" id="getRandomString" name="getRandomString" size="30" disabled /><br></br>
				</li> 
				<li>
				    [getContainsCount Conditioned by char array]<br></br>
					<input type="text" id="str1" name="str1" size="30" value="Anyframe Java Test"/>
					<input type="text" id="chars1" name="chars1" size="10" value="aT"/>
					<input type="button" id="convert21" name="convert21" value="check"/>
					<input type="text" id="getContainsCount" name="getContainsCount" size="5" disabled /><br></br>
				</li> 
				<li>
				    [getContainsCountIgnoreCase Conditioned by String]<br></br>
					<input type="text" id="str2" name="str2" size="30" value="Anyframe Java Test"/>
					<input type="text" id="str21" name="str21" size="10" value="test"/>
					<input type="button" id="convert22" name="convert22" value="check"/>
					<input type="text" id="getContainsCountIgnoreCase" name="getContainsCountIgnoreCase" size="5" disabled /><br></br>
				</li>
				<li>
				    [getLength]<br></br>
					<input type="text" id="str3" name="str3" size="30" value="애니프레임"/>
					<input type="button" id="convert12" name="convert12" value="check"/>
					<input type="text" id="getLength" name="getLength" size="5" disabled /><br></br>
				</li>
				<li>
				    [getByteLength]<br></br>
					<input type="text" id="str4" name="str4" size="30" value="애니프레임"/>
					<input type="button" id="convert13" name="convert13" value="check"/>
					<input type="text" id="getByteLength" name="getByteLength" size="5" disabled /><br></br>
				</li>
				<li>
				    [getCutString]<br></br>
					<input type="text" id="str5" name="str5" size="30" value="Anyframe Java Test"/>
					<input type="text" id="cutLength" name="cutLength" size="5" value="14"/>
					<input type="button" id="convert23" name="convert23" value="check"/>
					<input type="text" id="getCutString" name="getCutString" size="30" disabled /><br></br>
				</li>
				<li>
				    [leftPad]<br></br>
					<input type="text" id="str6" name="str6" size="30" value="Anyframe"/>
					<input type="text" id="size" name="size" size="5" value="10"/>
					<input type="text" id="padChar" name="padChar" size="5" value="a"/>
					<input type="button" id="convert31" name="convert31" value="convert" />
					<input type="text" id="leftPad" name="leftPad" size="30" disabled /><br></br>
				</li>
				<li>
				    [rightPad]<br></br>
					<input type="text" id="str7" name="str7" size="30" value="Anyframe"/>
					<input type="text" id="size1" name="size1" size="5" value="10"/>
					<input type="text" id="padStr" name="padStr" size="5" value="a"/>
					<input type="button" id="convert32" name="convert32" value="convert" />
					<input type="text" id="rightPad" name="rightPad" size="30" disabled /><br></br>
				</li>
				<li>
				    [convertToCamelCase]<br></br>
					<input type="text" id="str8" name="str8" size="30" value="Anyframe_java_test"/>
					<input type="text" id="posChar" name="posChar" size="5" value="_"/>
					<input type="button" id="convert24" name="convert24" value="convert" />
					<input type="text" id="convertToCamelCase" name="convertToCamelCase" size="30" disabled /><br></br>
				</li>
				<li>
				    [convertToUnderScore]<br></br>
					<input type="text" id="str9" name="str9" size="30" value="anyframeJavaTest"/>
					<input type="button" id="convert14" name="convert14" value="convert" />
					<input type="text" id="convertToUnderScore" name="convertToUnderScore" size="30" disabled /><br></br>
				</li>
				<li>
				    [replaceHtmlEscape]<br></br>
					<input type="text" id="str10" name="str10" size="50" value="<html>Anyframe Java Test<html>"/>
					<input type="button" id="convert15" name="convert15" value="convert" />
					<input type="text" id="replaceHtmlEscape" name="replaceHtmlEscape" size="50" disabled /><br></br>
				</li>
				<li>
				    [removeEscapeChar]<br></br>
				    <xmp>&lt;html&gt;Anyframe Java Test&lt;html&gt;</xmp>
				    After copying the upper text, paste the below textbox. and then test.<br></br>
					<input type="text" id="str11" name="str11" size="50" value=""/>
					<input type="button" id="convert16" name="convert16" value="convert" />
					<input type="text" id="removeEscapeChar" name="removeEscapeChar" size="50" disabled /><br></br>
				</li>
				<li>
				    [swapFirstLetterCase]<br></br>
					<input type="text" id="str12" name="str12" size="50" value="Anyframe"/>
					<input type="button" id="convert17" name="convert17" value="convert" />
					<input type="text" id="swapFirstLetterCase" name="swapFirstLetterCase" size="50" disabled /><br></br>
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