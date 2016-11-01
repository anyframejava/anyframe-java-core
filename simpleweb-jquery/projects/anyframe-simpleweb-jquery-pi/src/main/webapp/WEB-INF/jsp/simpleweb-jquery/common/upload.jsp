<%@ page language="java" autoFlush="true" contentType="text/html;charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript">
$(document).ready(function() {
	$("#uploadify").uploadify({
		uploader	: "<c:url value='/simpleweb-jquery/jquery/uploadify/uploadify.swf'/>",
		script		: "<c:url value='/simpleFile/upload.do'/>",
		cancelImg	: "<c:url value='/simpleweb-jquery/images/cancel.png'/>",
		queueID		: "fileQueue",
		fileDataName: "fileData",
		auto		: false,
		multi		: false,
		width		: 80,
		height		: 24,
		sizeLimit	: 10000000,
		buttonImg	: "<c:url value='/simpleweb-jquery/images/uploadBrowse.png'/>",
		onComplete	: function(event,queueID,fileObj,response,data) {
						eval("var respJson="+response);
						$('#hiddenUploadedFiles').val($('#hiddenUploadedFiles').val()+','+respJson.uploadResult.fileNm);
						//$('#hiddenUploadedFiles').val(respJson.uploadResult.fileNm);
						$('#fileDir').val(respJson.uploadResult.fileDir);
						$('#uploadify').uploadifySettings('scriptData', {'fileDir' : $('#fileDir').val()});
					  }
	});
	$("#uploadClearButton").click( function() {
		jQuery('#uploadify').uploadifyClearQueue();
	});
});
</script>

<div> 
			<div id="fileQueue" style="width:176px;height:60px;"></div>  
			<!-- hidden attributes -->
			<input type="hidden" id="hiddenUploadedFiles" name="hiddenUploadedFiles" />
			<input type="hidden" id="filePathsAttrName" name="filePathsAttrName" value="filePaths" />
			<input type="hidden" id="fileDir" name="fileDir" />
			<!-- browse/clear button -->
			<div id="buttons" align="center" style="padding-top:5px"> 
				<input type="file" id="uploadify" name="uploadify" width="80"/> 
				<img id="uploadClearButton" src="<c:url value='/simpleweb-jquery/images/clear.jpg'/>" width="57" height="24" border="0" style="cursor:hand;cursor:pointer;vertical-align:bottom;" />
			</div>
</div>