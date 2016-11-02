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
        	<h2>String Utility Test List</h2>
      	</div>
		<div class="util_list">
			 <dl>
				<dt>[getRandomString]</dt>
				<dd>
					<input type="text" id="length" name="length" size="5" value="15"/>
					<input type="button" id="convert11" name="convert11" value="generate"/>
					<input type="text" id="getRandomString" name="getRandomString" size="30" disabled="disabled" />
				</dd> 
				<dt>[countMatchesIgnoreCase]</dt>
				<dd>
					<input type="text" id="str2" name="str2" size="30" value="Anyframe Java Test"/>
					<input type="text" id="str21" name="str21" size="10" value="test"/>
					<input type="button" id="convert21" name="convert21" value="check"/>
					<input type="text" id="countMatchesIgnoreCase" name="countMatchesIgnoreCase" size="5" disabled="disabled" />
				</dd>
				<dt>[getLength]</dt>
				<dd>
					<input type="text" id="str3" name="str3" size="30" value=""/>
					<input type="button" id="convert12" name="convert12" value="check"/>
					<input type="text" id="getLength" name="getLength" size="5" disabled="disabled" />
				</dd>
				<dt>[getByteLength]</dt>
				<dd>
					<input type="text" id="str4" name="str4" size="30" value="애니프레임"/>
					<input type="button" id="convert13" name="convert13" value="check"/>
					<input type="text" id="getByteLength" name="getByteLength" size="5" disabled="disabled" />
				</dd>
				<dt>[left]</dt>
				<dd>
					<input type="text" id="str5" name="str5" size="30" value="Anyframe Java Test"/>
					<input type="text" id="cutLength" name="cutLength" size="5" value="14"/>
					<input type="button" id="convert22" name="convert22" value="check"/>
					<input type="text" id="left" name="left" size="30" disabled="disabled" />
				</dd>
				<dt>[leftPad]</dt>
				<dd>
					<input type="text" id="str6" name="str6" size="30" value="Anyframe"/>
					<input type="text" id="size" name="size" size="5" value="10"/>
					<input type="text" id="padChar" name="padChar" size="5" value="a"/>
					<input type="button" id="convert31" name="convert31" value="convert" />
					<input type="text" id="leftPad" name="leftPad" size="30" disabled="disabled" />
				</dd>
				<dt>[rightPad]</dt>
				<dd>
					<input type="text" id="str7" name="str7" size="30" value="Anyframe"/>
					<input type="text" id="size1" name="size1" size="5" value="10"/>
					<input type="text" id="padStr" name="padStr" size="5" value="a"/>
					<input type="button" id="convert32" name="convert32" value="convert" />
					<input type="text" id="rightPad" name="rightPad" size="30" disabled="disabled" />
				</dd>
				<dt>[convertToCamelCase]</dt>
				<dd>
					<input type="text" id="str8" name="str8" size="30" value="Anyframe_java_test"/>
					<input type="text" id="posChar" name="posChar" size="5" value="_"/>
					<input type="button" id="convert23" name="convert23" value="convert" />
					<input type="text" id="convertToCamelCase" name="convertToCamelCase" size="30" disabled="disabled" />
				</dd>
				<dt>[convertToUnderScore]</dt>
				<dd>
					<input type="text" id="str9" name="str9" size="30" value="anyframeJavaTest"/>
					<input type="button" id="convert14" name="convert14" value="convert" />
					<input type="text" id="convertToUnderScore" name="convertToUnderScore" size="30" disabled="disabled" />
				</dd>
				<dt>[htmlEscape]</dt>
				<dd>
					<input type="text" id="str10" name="str10" size="50" value="&lt;html&gt;Anyframe Java Test&lt;/html&gt;"/>
					<input type="button" id="convert15" name="convert15" value="convert" />
					<input type="text" id="htmlEscape" name="htmlEscape" size="50" disabled="disabled" />
				</dd>
				<dt>[htmlUnescape]<br/>
				 &amp;lt;html&amp;gt;Anyframe Java Test&amp;lt;/html&amp;gt;<br/>
				    After copying the upper text, paste the below textbox. and then test.</dt>
				<dd>
					<input type="text" id="str11" name="str11" size="50" value=""/>
					<input type="button" id="convert16" name="convert16" value="convert" />
					<input type="text" id="htmlUnescape" name="htmlUnescape" size="50" disabled="disabled" />
				</dd>
				<dt>[swapFirstLetterCase]</dt>
				<dd>
					<input type="text" id="str12" name="str12" size="50" value="Anyframe"/>
					<input type="button" id="convert17" name="convert17" value="convert" />
					<input type="text" id="swapFirstLetterCase" name="swapFirstLetterCase" size="50" disabled="disabled" />
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