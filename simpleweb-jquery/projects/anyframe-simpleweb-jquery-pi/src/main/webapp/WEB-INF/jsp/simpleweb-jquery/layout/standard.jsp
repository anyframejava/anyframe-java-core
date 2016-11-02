<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="./top.jsp"%>
<div class="location"><a href="<c:url value='anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/simplewebjquery.do'/>">Simpleweb-jQuery 1.0.4-SNAPSHOT</a></div>
    </div>
    <hr />
    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<!-- for sample codes -->
<script type="text/javascript" src="<c:url value="/sample/javascript/CommonScript.js" />"></script>

<!-- dojo -->
<script type="text/javascript" src="<c:url value="/resources/dojo/dojo.js" />"></script>  
<script type="text/javascript" src="<c:url value="/resources/dojo/io/iframe.js" />"></script>  
<script type="text/javascript" src="<c:url value="/resources/org/anyframe/spring/Anyframe-Spring.js" />"></script>
<script type="text/javascript" src="<c:url value="/resources/org/anyframe/spring/Anyframe-Spring-Dojo.js" />"></script>
   
<!-- for jquery -->
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<link rel="stylesheet" href="<c:url value='/simpleweb-jquery/css/jquery.css'/>" type="text/css" />

<!-- jquery ui, jqGrid -->
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jqgrid/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jqgrid/jquery.jqGrid.min.js'/>"></script>
<link href="<c:url value='/simpleweb-jquery/jquery/jqgrid/ui.jqgrid.css'/>" rel="stylesheet" type="text/css" />

<!-- jquery form -->  
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/form/jquery.form.js'/>"></script>

<!-- jquery:jstree-1.0.RC3 -->
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/jstree/jquery.jstree.js'/>"></script>

<!-- jquery tab -->
<link href="<c:url value='/simpleweb-jquery/jquery/jquery-ui/smoothness/jquery-ui-1.8.16.custom.css'/>" rel="stylesheet" type="text/css" />
	
<!-- jquery uploadify -->
<link type="text/css" href="<c:url value='/simpleweb-jquery/jquery/uploadify/uploadify.css'/>" rel="stylesheet">
<script src="<c:url value='/simpleweb-jquery/jquery/uploadify/swfobject.js'/>" type="text/javascript"></script>
<script src="<c:url value='/simpleweb-jquery/jquery/uploadify/jquery.uploadify.v2.1.4.min.js'/>" type="text/javascript"></script>

<!-- jquery image dropdown -->
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/dropdown/msdropdown/js/jquery.dd.js'/>"></script>
<link href="<c:url value='/simpleweb-jquery/jquery/dropdown/msdropdown/dd.css'/>" rel="stylesheet" type="text/css" />

<!--  quick pager -->
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/quickpager/quickpager.mod.jquery.js'/>"></script>
<link rel="stylesheet" href="<c:url value='/simpleweb-jquery/jquery/quickpager/pagination.css'/>" type="text/css" />

<!-- validator -->
<script type="text/javascript" src="<c:url value='/simpleweb-jquery/jquery/validate/jquery.validate.js'/>"></script>
	
	
<div class="view_leftmenu">
	<tiles:insertAttribute name="left"/>
    <tiles:insertAttribute name="body"/>
</div>
    <hr />

<%@ include file="./bottom.jsp"%>