<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>

	<div class="location">
			<a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; 
			<a href="<c:url value='/fileuploadJFileUpload.do?method=view'/>">FileUpload 1.2.1-SNAPSHOT</a>
	</div>
</div>
 <hr />
    
    
<!-- FileUpload javascript libraries ------------------------------------------------------------>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery-1.9.0.js'/>"></script>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery-ui-1.10.0.custom.js'/>"></script>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery.fileupload.js'/>"></script>

<!--  FileUpload css files ------------------------------------------------------------------------->
<link rel="stylesheet"  type="text/css" href ="<c:url value='/fileupload/css/jquery_ui_style.css'/>" />
<link rel="stylesheet"  type="text/css" href ="<c:url value='/fileupload/css/fileuploader_style.css'/>" />



<!-- document ready function------------------------------------------------------------------------------------------ -->
<script type="text/javascript">
	$(document).ready(function() {
		
		FILEUPLOAD.CONTEXT = "${ctx}";
		FILEUPLOAD.ID = "fileuploader";
		fileupload.init();

	});
</script>

<style>
.bg-section {
	width : 1200px;
	height : 400px;
	margin : 10px;
	padding : 20px;
	background-color : rgb(248, 248, 248);
	font-family : 'Verdana', 'Geneva', sans-serif;
}

.bg-section h1 {
	font-size : 18px;
	text-decoration : underline;
	color : rgb(162,162, 162);
	margin-bottom : 40px;
}


</style>

<div class= 'bg-section' >

<h1>FileUpload UI DEMO</h1>

<div  id ="fileuploader" align='center'></div>

</div>

<%@ include file="/sample/common/bottom.jsp"%>