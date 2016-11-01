<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/utilDemo/utilDemoList.do'/>">Util-demo 1.0.1</a></div>
    </div>
    <hr />
<link rel="stylesheet" type="text/css" href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/smoothness/jquery-ui-1.8.16.custom.css'/>"  /> 
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
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
				<dt>[getContainsCount Conditioned by char array]</dt>
				<dd>
					<input type="text" id="str1" name="str1" size="30" value="Anyframe Java Test"/>
					<input type="text" id="chars1" name="chars1" size="10" value="aT"/>
					<input type="button" id="convert21" name="convert21" value="check"/>
					<input type="text" id="getContainsCount" name="getContainsCount" size="5" disabled="disabled" />
				</dd> 
				<dt>[getContainsCountIgnoreCase Conditioned by String]</dt>
				<dd>
					<input type="text" id="str2" name="str2" size="30" value="Anyframe Java Test"/>
					<input type="text" id="str21" name="str21" size="10" value="test"/>
					<input type="button" id="convert22" name="convert22" value="check"/>
					<input type="text" id="getContainsCountIgnoreCase" name="getContainsCountIgnoreCase" size="5" disabled="disabled" />
				</dd>
				<dt>[getLength]</dt>
				<dd>
					<input type="text" id="str3" name="str3" size="30" value="ì ëíë ì"/>
					<input type="button" id="convert12" name="convert12" value="check"/>
					<input type="text" id="getLength" name="getLength" size="5" disabled="disabled" />
				</dd>
				<dt>[getByteLength]</dt>
				<dd>
					<input type="text" id="str4" name="str4" size="30" value="ì ëíë ì"/>
					<input type="button" id="convert13" name="convert13" value="check"/>
					<input type="text" id="getByteLength" name="getByteLength" size="5" disabled="disabled" />
				</dd>
				<dt>[getCutString]</dt>
				<dd>
					<input type="text" id="str5" name="str5" size="30" value="Anyframe Java Test"/>
					<input type="text" id="cutLength" name="cutLength" size="5" value="14"/>
					<input type="button" id="convert23" name="convert23" value="check"/>
					<input type="text" id="getCutString" name="getCutString" size="30" disabled="disabled" />
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
					<input type="button" id="convert24" name="convert24" value="convert" />
					<input type="text" id="convertToCamelCase" name="convertToCamelCase" size="30" disabled="disabled" />
				</dd>
				<dt>[convertToUnderScore]</dt>
				<dd>
					<input type="text" id="str9" name="str9" size="30" value="anyframeJavaTest"/>
					<input type="button" id="convert14" name="convert14" value="convert" />
					<input type="text" id="convertToUnderScore" name="convertToUnderScore" size="30" disabled="disabled" />
				</dd>
				<dt>[replaceHtmlEscape]</dt>
				<dd>
					<input type="text" id="str10" name="str10" size="50" value="<html>Anyframe Java Test<html>"/>
					<input type="button" id="convert15" name="convert15" value="convert" />
					<input type="text" id="replaceHtmlEscape" name="replaceHtmlEscape" size="50" disabled="disabled" />
				</dd>
				<dt>[removeEscapeChar]
				 <xmp>&lt;html&gt;Anyframe Java Test&lt;html&gt;</xmp>
				    After copying the upper text, paste the below textbox. and then test.</dt>
				<dd>
				   
					<input type="text" id="str11" name="str11" size="50" value=""/>
					<input type="button" id="convert16" name="convert16" value="convert" />
					<input type="text" id="removeEscapeChar" name="removeEscapeChar" size="50" disabled="disabled" />
				</dd>
				<dt>[swapFirstLetterCase]</dt>
				<dd>
					<input type="text" id="str12" name="str12" size="50" value="Anyframe"/>
					<input type="button" id="convert17" name="convert17" value="convert" />
					<input type="text" id="swapFirstLetterCase" name="swapFirstLetterCase" size="50" disabled="disabled" />
				</dd>
			 </dl>
		</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>