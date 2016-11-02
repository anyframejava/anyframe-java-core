<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Anyframe 5.6.1-SNAPSHOT Main</title>
</head>

<body>
<!-- common&layout css  -->
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>

<!-- jQuery -->
<script type="text/javascript" src="<c:url value="/jquery"/>/jquery/jquery-1.7.2.min.js"></script>
<link rel="stylesheet" type="text/css" href="<c:url value="/jquery"/>/css/jquery.css">

<!-- jquery ui & jquery tab css-->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-ui/jquery-ui-1.8.22.custom.min.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jquery-ui/themes/smoothness/jquery-ui-1.8.22.custom.css'/>" rel="stylesheet" type="text/css" />

<!-- jqGrid -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/jquery.jqGrid.min.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jqgrid/ui.jqgrid.css'/>" rel="stylesheet" type="text/css" />

<!-- validator -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/validation/jquery.validate.min.js'/>"></script>

<!-- board css -->
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/content.css'/>"/>

<script type="text/javascript">
<% pageContext.setAttribute("newLineChar", "\n"); %>
/**
 * Move to board page
 */
function fncSearchBlog() {
	document.searchForm.action = '<c:url value="/${boardName}/blogView.do"/>';
   	document.searchForm.submit();		
}

$(document).ready(function(){

	/**
 	 *	Validation Check 
	 */
	$('#searchForm').validate({
	});
	
	/**
 	 *	Submit False 
	 */
	$('#searchForm').submit(function(e){
		return false;
	});

	/**
	 *	Post Search
	 */
	$("#searchBoard").click(function(e) {
		var searchCondition = $('#searchCondition').val();
		var searchKeyword = $('#searchKeyword').val();
		var url = '<c:url value="/${boardName}/blogView.do"/>';
		url += '?searchCondition=' + searchCondition;
		url	+= '&searchKeyword=' + searchKeyword;
		self.location.href = url;
		return false;
	});
	
	/**
	 *	Search button click event
	 */
	$("#btnSearch").click( function() {
		if($('#searchForm').valid()) {
			$("#searchBoard").trigger("click");
			return false;
		}
	});
	
	/**
	 *	Search keyword Enter event
	 */
	$("#searchKeyword").keypress(function (e) {
		if (e.which == 13){
			if($('#searchForm').valid()) {
				$("#searchBoard").trigger("click");
				return false;
			}
		}
	});
	
	/**
	 *	update button click event
	 */
	$('button.update').click(function(e) {
		var url = '<c:url value="/${boardName}/form.do"/>';
		url += '?postId=' + $(this).attr('id');
		url += '&searchCondition=' + '${searchVO.searchCondition}';
		url += '&searchKeyword=' + '${searchVO.searchKeyword}';
		url += '&pageIndex=' + '${searchVO.pageIndex}';
		self.location.href = url;
	});
	
	/**
	 *	Add button click event
	 */
	$('button.add').click(function(e) {
		var url = '<c:url value="/${boardName}/form.do"/>';
		url += '?searchCondition=' + '${searchVO.searchCondition}';
		url += '&searchKeyword=' + '${searchVO.searchKeyword}';
		url += '&pageIndex=' + '${searchVO.pageIndex}';
		self.location.href = url;
	});
	
	/**
	 *	Delete button click event
	 */
	$('button.delete').click(function(e) {
		if(confirm("<spring:message code='${boardName.toLowerCase()}.message.confirm.remove'/>")) {
			var postId = $(this).attr('id');
			var url = '<c:url value="/${boardName}/remove.do"/>';
			$.post(url, {'postId' : postId}, function(data) {
				self.location.href = '<c:url value="/${boardName}/blogView.do"/>';
			});	
		}
	});
});
</script>

<!--************************** begin of contents *****************************-->
<div id="wrap">
	<div id="container">
		<form:form modelAttribute="searchVO" method="post" id="searchForm" name="searchForm">  
	    	<div class="cont_top">
	        	<h2><spring:message code='${boardName.toLowerCase()}blog.title'/></h2>
	      		<div class="search_list">
	                <fieldset>
	                    <legend>Search</legend>
	                    <label for="searchCondition" class="float_left margin_right5">
							<form:select path="searchCondition" id="searchCondition" cssClass="w_search search_keyword">
								<form:option value=""><spring:message code='${boardName.toLowerCase()}.all'/></form:option>  
	        	   	       		<form:option value="postId"><spring:message code='${boardName.toLowerCase()}.postid'/></form:option>
	       					   	<form:option value="postTitle"><spring:message code='${boardName.toLowerCase()}.posttitle'/></form:option>
#if(${boardInfo.useAnonymous} == 'N')
	           	      			<form:option value="createId"><spring:message code='${boardName.toLowerCase()}.createid'/></form:option>
#end
							</form:select>
						</label>
	                    <label for="searchKeyword" class="float_left margin_right5">
	                    	<form:input path="searchKeyword" id="searchKeyword" cssClass="w_search search_keyword" cssErrorClass="text medium error" maxlength="255"/>
	                    </label>
	                    <label for="btnSearch" class="float_left">
	                    	<input type="image" id="btnSearch" name="searchBtn" alt="Search" src="<c:url value='/sample/images/btn_search_i.gif'/>"/>
	                    </label>
						<a id="searchBoard" name="searchBoard" href="#"></a> 
	                </fieldset>
	            </div>
	      	</div>
			<form:hidden path="pageIndex"/>
	   	</form:form>       
		<c:if test="${esc.d}{records == 0 }">
			<div class="post_view">
				<table>
					<colgroup>
					</colgroup>
					<tbody>
						<tr>
							<td class="nodata"><spring:message code='${boardName.toLowerCase()}.message.nodata'/></td>
						</tr>
					</tbody>
				</table>
			</div>
		</c:if>
		<c:forEach var="${boardName}" items="${rows}" varStatus="index">
			<c:set var="rowIndex" value="${index.count}" />
			<div class="comment">
				<ul>
#if(${boardInfo.useAnonymous} != 'Y')
					<li><span class="name"><spring:message code='${boardName.toLowerCase()}.createid'/></span><span class="txt">${${boardName}.createId}</span></li>
#end
					<li><span class="name"><spring:message code='${boardName.toLowerCase()}.createdttm'/></span><span class="txt">${${boardName}.createDttm}</span></li>
				</ul>
			</div>
	        <div class="post_view">
		 		<table summary="This table shows detail information about the ${boardName}">
			   	 	<caption>Detail information</caption>
	 	  	   		<colgroup>
		   	   	  		<col class="header"/>
		       	   	 	<col class="contents"/>
		       	 	</colgroup>
		       	 	<tbody>
#foreach(${colInfo} in ${viewFields})
#if(${colInfo.columnType} == "CLOB" || ${colInfo.columnAttribute} == "2")
	    			<tr>
	   				    <th height="200"><label for="${colInfo.fieldId}"><spring:message code='${boardName.toLowerCase()}.${colInfo.fieldId.toLowerCase()}'/>&nbsp;</label></th>
						<td>
							${esc.d}{fn:replace(${boardName}.${colInfo.fieldId}, newLineChar, "<br/>")}
						</td>
					</tr>
#elseif(${colInfo.columnId} != "BOARD_ID" && ${colInfo.columnId} != "POST_ID" && ${colInfo.columnId} != "CREATE_ID")
	    			<tr>
	       		 		<th><label for="${colInfo.fieldId}"><spring:message code='${boardName.toLowerCase()}.${colInfo.fieldId.toLowerCase()}'/>&nbsp;</label></th>
	     			    <td >${${boardName}.${colInfo.fieldId}}</td> 
	 				</tr>
#end#end
#if(${boardInfo.useAttachFile} == 'Y')
					<tr>
	       		 		<th>
	       		 			<label for="attachFile"><spring:message code='${boardName.toLowerCase()}.attachfile'/>&nbsp;</label>
	       		 		</th>
	       		 		<td>
							<ul>
								<c:forEach var="attachFiles" items="${attachFileList}" varStatus="status">
									<c:forEach var="attachFile" items="${attachFiles}" varStatus="status">
										<c:if test="${${boardName}.postId == attachFile.postId }">
											<li><a href="<c:url value='/postAttachFile.do?method=download&attachFileId=${attachFile.attachFileId}&attachFileName=${attachFile.attachFileName}&attachFilePath=${attachFile.attachFilePath}'/>"fileId="${attachFile.attachFileId}" fileName="${attachFile.attachFileName}" filePath="${attachFile.attachFilePath}" fileSize="${attachFile.attachFileSize}"/> ${attachFile.attachFileName}</a> (${attachFile.attachFileSizeString})</li>
										</c:if>
									</c:forEach>				
								</c:forEach>
							</ul>
						</td>
					</tr>
#end
					</tbody>
		    	</table>
			</div>
			<div class="btncontainer_right">
				<button id="${${boardName}.postId}" class="button default icon update">
				    <span class="update">&nbsp;</span>
				    <span class="none_a txt_num6"><spring:message code='${boardName.toLowerCase()}.button.update'/></span>
				</button>
				<button id="${${boardName}.postId}" class="button default icon delete">
				    <span class="delete">&nbsp;</span>
				    <span class="none_a txt_num6"><spring:message code='${boardName.toLowerCase()}.button.delete'/></span>
				</button>
			</div>
			<br>
		</c:forEach>
		<div class="listunder_container">   
			<div class="list_underbtn_right">
		        <button class="button default icon add">   
	            	<span class="add">&nbsp;</span>
	             	<span class="none_a txt_num3"><spring:message code='${boardName.toLowerCase()}.button.add'/></span>
	          	</button>
			</div>
		</div>
		<div class="list_paging">
			<anyframe:pagenavigator linkUrl="javascript:fncSearchBlog();" pages="${resultPage}" />
		</div>
	</div>
</div>
</body>
</html>