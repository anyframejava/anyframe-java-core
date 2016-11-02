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

<!-- board css -->
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/content.css'/>"/>
<script type="text/javascript">
<% pageContext.setAttribute("newLineChar", "\n"); %>
#if(${boardInfo.useComment} == 'Y')
/**
 * Comment save function
 */
function commentSave() {
	var url = '<c:url value="/postcomment/create.do"/>';
	var commentContent = $('#commentContent').val();
	var commentCreator = $('#commentCreator').val();
 	$.post(url,
		{'postId' : '${${boardName}.postId}', 'createId' : commentCreator, 'commentContent' : commentContent},
		function(data){ // success callback function
			var url = '<c:url value="/${boardName}/view.do"/>';
			url += '?postId=' + '${${boardName}.postId}';
			url += '&searchCondition=' +  '${searchVO.searchCondition}';
			url += '&searchKeyword=' + '${searchVO.searchKeyword}';
			url += '&flag=' + 'comment';
			url += '&pageIndex=' + '${searchVO.pageIndex}';
			self.location.href = url;
 	}); 
}
/**
 * Comment remove function
 */
function commentRemove(commentId) {	
	var url = '<c:url value="/postcomment/remove.do"/>';
	$.post(url, 
		{'postId' : '${${boardName}.postId}', 'commentId' : commentId}, 
		function(data){
			var url = '<c:url value="/${boardName}/view.do"/>';
			url += '?postId=' + '${${boardName}.postId}';
			url += '&searchCondition=' + '${searchVO.searchCondition}';
			url += '&searchKeyword=' + '${searchVO.searchKeyword}';
			url += '&flag=' + 'comment';
			url += '&pageIndex=' + '${searchVO.pageIndex}';
			self.location.href = url;
 	}); 
}

/**
 * Comment update function
 */
function updateComment(commentId, editedComment) {
	var url = '<c:url value="/postcomment/update.do"/>';
 	$.post(url,
		{'commentId' : commentId, 'commentContent' : editedComment},
		function(data){ // success callback function
			var url = '<c:url value="/${boardName}/view.do"/>';
			url += '?postId=' + '${${boardName}.postId}';
			url += '&searchCondition=' + '${searchVO.searchCondition}';
			url += '&searchKeyword=' + '${searchVO.searchKeyword}';
			url += '&flag=' + 'comment';
			url += '&pageIndex=' + '${searchVO.pageIndex}';
			self.location.href = url;
	});
}
#end

$(document).ready(function(){
	/**
	 * Update button click event
	 */
	$('button.update').click(function(e) {
		var url = '<c:url value="/${boardName}/form.do"/>';
		url += '?postId=' + '${${boardName}.postId}';
		url += '&searchCondition=' + '${searchVO.searchCondition}';
		url += '&searchKeyword=' + '${searchVO.searchKeyword}';
		url += '&pageIndex=' + '${searchVO.pageIndex}';
		self.location.href = url;
	});
	
	/**
	 * Delete button click event
	 */
	$('button.delete').click(function(e) {
		if(confirm("<spring:message code='${boardName.toLowerCase()}.message.confirm.remove'/>")) {
			var postId = '${${boardName}.postId}';
			var url = '<c:url value="/${boardName}/remove.do"/>';
			$.post(url, {'postId' : postId}, function(data) {
				self.location.href = '<c:url value="/${boardName}/listView.do"/>';
			});			
		}
	});
	
	/**
	 * List button click event
	 */
	$('button.list').click(function(e){
		var url = '<c:url value="/${boardName}/listView.do"/>';
		url += '?postId=' + '${${boardName}.postId}';
		url += '&searchCondition=' + '${searchVO.searchCondition}';
		url += '&searchKeyword=' + '${searchVO.searchKeyword}';
		url += '&pageIndex=' + '${searchVO.pageIndex}';
		self.location.href = url;
	});
	
	#if(${boardInfo.useComment} == 'Y')
	/**
	 * Comment update button click event
	 */
	$('a.comment-update').click(function(e) {
		var $this = $(this);
		var commentId = $this.attr('commentid');
		var $td = $this.parent();
		var text = $td.find('span[name=comment]').html();
		var hasTextarea = $td.find('textarea').length;
		if(hasTextarea == 0){
			$('button.comment-edit-cancel').click();
			var html = '<div class="comment-edit">\n';
			html += '<textarea maxlength="2000"></textarea>\n';
			html += '<button commentid="' + commentId + '" class="default icon comment-edit-update"><img src="<c:url value="/sample/images"/>/ico_check_color.gif"></button>\n';
			html += '<button class="default icon comment-edit-cancel"><img src="<c:url value="/sample/images"/>/ico_x.gif"></button>\n';
			html += '</div>';
			${esc.d}td.append(html).find('textarea').val(text.unescapeHTML());
			}
	});
	
	/**
	 * Comment delete button click event
	 */
	$('a.comment-remove').click(function(e) {
		commentRemove($(this).attr('commentId'));
	});
	
	/**
	 * Comment update button click event in update box
	 */
	$('button.comment-edit-update', $('div.comment-edit')).live('click', function(){
		var $this = $(this);
		var commentId = $this.attr('commentid');
		var $textarea = $this.prev(); //text area
		var editedComment = $textarea.val();		
		
		if(editedComment == '') {
			alert("<spring:message code='${boardName.toLowerCase()}.message.required.comment'/>");
			return false;
		} else {
			updateComment(commentId, editedComment);
			removeCommentEditDiv($this);
		}
	});
	
	/**
	 * Comment cancel button click event
	 */
	$('button.comment-edit-cancel', $('div.comment-edit')).live('click', function(){
		removeCommentEditDiv($(this));
	});
	
	/**
	 * Comment cancel button click event in update box
	 */
	var removeCommentEditDiv = function($this) {
		$this.closest('div.comment-edit').remove();
	};
	
	/**
	 * Comment save button click event
	 */
	$('a.comment-save').click(function(e) {
		if ($('#commentContent').val() == '') {
			alert("<spring:message code='${boardName.toLowerCase()}.message.required.comment'/>");
			$('#commentContent').focus();
			return;
		}
		if ($('#commentCreator').val() == '') {
			alert("<spring:message code='${boardName.toLowerCase()}.message.required.createid'/>");
			$('#commentCreator').focus();
			return;
		}
		commentSave();
	});
#end
});
</script>      
<!--************************** begin of contents *****************************-->
<div id="wrap">
	<div id="container">
	   	<div class="cont_top">
	   		<h2><spring:message code='${boardName.toLowerCase()}view.title'/></h2>
	   	</div>
		<div class="comment">
			<ul>
#if(${boardInfo.useAnonymous} != 'Y')
				<li><span class="name"><spring:message code='${boardName.toLowerCase()}.createid'/></span><span class="txt">${${boardName}.createId}</span></li>
#end
				<li><span class="name"><spring:message code='${boardName.toLowerCase()}.createdttm'/></span><span class="txt">${${boardName}.createDttm}</span></li>
				<li><span class="name"><spring:message code='${boardName.toLowerCase()}.viewcount'/></span><span class="txt">${${boardName}.viewCount}</span></li> 
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
	     			    <td>${${boardName}.${colInfo.fieldId}}</td> 
	 				</tr>
#end#end
#if(${boardInfo.useAttachFile} == "Y")
					<tr>
						<th rowspan="2">
							<label for="attachFile"><spring:message code='${boardName.toLowerCase()}.attachfile'/>&nbsp;</label>
						</th>
						<td>
							<span class="attachfile"><spring:message code='${boardName.toLowerCase()}.totalfilesum'/> : ${fileUploadInfoCount}<spring:message code='${boardName.toLowerCase()}.ea'/> | ${fileSizeSum}</span>
						</td>
					</tr>
					<tr>
						<td>
							<ul>
							<c:forEach var="attachFile" items="${fileUploadInfoList}">
								<li><a href="<c:url value='/postAttachFile.do?method=download&attachFileId=${attachFile.attachFileId}&attachFileName=${attachFile.attachFileName}&attachFilePath=${attachFile.attachFilePath}'/>"fileId="${attachFile.attachFileId}" fileName="${attachFile.attachFileName}" filePath="${attachFile.attachFilePath}" fileSize="${attachFile.attachFileSize}"/> ${attachFile.attachFileName}</a> (${attachFile.attachFileSizeString})</li>
							</c:forEach>
							</ul>
						</td>					
					</tr>
#end
				</tbody>
	    	</table>
		</div>
		#if(${boardInfo.useComment} == 'Y')
	<!--************************** begin of comments *****************************-->
		<div class="board_comment">
			<p class="title"> <spring:message code="postcommentlist.postcomment"/> ${commentCount} </p>
			<table summary='<spring:message code="postcommentlist.postcomment"/>' class="board_commentList">
				<col width="17%">
				<col width="/">
				<c:forEach var="comment" items="${commentList}">
					<tr>
						<td class="writer">#if(${boardInfo.useAnonymous} != 'Y') ${comment.createId} #end</td>
						<td><span name="comment">${esc.d}{fn:replace(comment.commentContent, newLineChar, "<br/>")}</span>
							<a commentId="${comment.commentId}" class="comment-update"><img src="<c:url value="/sample/images"/>/ico_update.gif"></a>
							<a commentId="${comment.commentId}" class="comment-remove"><img src="<c:url value="/sample/images"/>/ico_delete.gif"></a>
							&nbsp;&nbsp;
							<span><fmt:formatDate value="${comment.createDttm}" pattern="yy.MM.dd hh:mm:ss"/></span>
						</td>
					</tr>
				</c:forEach>
			</table>
		</div>
		<div class="commentWrite_area">
			<table summary="Write comment" class="commentWrite_table">
				<tr>
					<td>
						<b><spring:message code="${boardName.toLowerCase()}.id"/> : </b>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="commentCreator" name="commentCreator" maxlength="20"/>
					</td>
				</tr>
				<tr>
					<td>
						<textarea id="commentContent" name="commentContent" maxlength="2000"></textarea>
					</td>
					<td class="comment_btn">
						<a class="comment-save"><spring:message code="postcomment.button.write"/></a>
					</td>
				</tr>
			</table>
		</div>
		#end
	<!--************************** begin of buttons *****************************-->
		<div class="btncontainer_right">
			<button class="button default icon update">
			    <span class="update">&nbsp;</span>
			    <span class="none_a txt_num6"><spring:message code="${boardName.toLowerCase()}.button.update"/></span>
			</button>
			<button class="button default icon delete">
			    <span class="delete">&nbsp;</span>
			    <span class="none_a txt_num6"><spring:message code="${boardName.toLowerCase()}.button.delete"/></span>
			</button>
		    <button class="button default icon list">
		        <span class="list">&nbsp;</span>
		        <span class="none_a txt_num4"><spring:message code="${boardName.toLowerCase()}.button.list"/></span>
		    </button>
	    </div>
	</div>
</div>
</body>
</html>