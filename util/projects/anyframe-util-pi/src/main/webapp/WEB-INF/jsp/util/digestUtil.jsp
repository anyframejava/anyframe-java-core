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
});

</script>
<div id="container">
    	<div class="cont_top">
        	<h2>Digest Utility Test List</h2>
      	</div>
		<div class="util_list">
			 <dl>
				<dt>[encodeBase64]</dt>
				<dd>
					String:<input type="text" id="str3" name="str3" size="40" value="Anyframe Java Test"/>
					<input type="button" id="convert11" name="convert11" value="convert"/>
					<input type="text" id="encodeBase64" name="encodeBase64" size="40" disabled="disabled" />
				</dd>
				<dt>[decodeBase64]</dt>
				<dd>
					String:<input type="text" id="str4" name="str4" size="40" value="QW55ZnJhbWUgSmF2YSBUZXN0"/>
					<input type="button" id="convert12" name="convert12" value="convert"/>
					<input type="text" id="decodeBase64" name="decodeBase64" size="40" disabled="disabled" />
				</dd>
				<dt>[encodePassword]</dt>
				<dd>
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
					<input type="text" id="encodePassword" name="encodePassword" size="50" disabled="disabled" />
				</dd>
			</dl>
		</div>
	</div>
    <hr />
<%@ include file="/sample/common/bottom.jsp"%>