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
/**
 * TimeStamp Format		Y-m-d h:i:s
 */
function timeStampFormatter(cellval, opts, rawObject) {
	 if(cellval == null || cellval =="") {
		return "";
	 }
	var date = new Date(cellval);
	opts = $.extend({}, $.jgrid.formatter.date, opts);
	return $.fmatter.util.DateFormat("" , date, 'Y-m-d H:i:s', opts);
}
#if(${boardInfo.useComment} == 'Y')
function titleFormatter(cellval, opts, rawObject) {
	 if(cellval == null || cellval =="") {
		return "";
	 }
	 var title = cellval + " [" +rawObject.commentCount + "]"; 
	 return title;
}
#end

$(document).ready(function(){
	/*
	 *	Value to contain searchKeyword / searchCondition
	 */
	var searchCondition = '${searchVO.searchCondition}';
	var searchKeyword = '${searchVO.searchKeyword}';
	
	/*
	 * board jqGrid
	 */
	$("#board_grid").jqGrid({
		url				: '<c:url value="/${boardName}/list.do"/>',
		mtype			: 'POST',
		postData : {
			'searchCondition'	: '${searchVO.searchCondition}',
			'searchKeyword'		: '${searchVO.searchKeyword}'
		},
		datatype		: 'json',
		colNames : [
#foreach(${colInfo} in ${listFields})#if(${boardInfo.useAnonymous} == 'Y' && ${colInfo.columnId} =="CREATE_ID")
		#else					"<spring:message code='${boardName.toLowerCase()}.${colInfo.fieldId.toLowerCase()}'/>"#if($foreach.hasNext), ${esc.n}#end
#end#end

		],
		colModel : [
#foreach(${colInfo} in ${listFields})#if(${boardInfo.useAnonymous} == 'Y' && ${colInfo.columnId} =="CREATE_ID")
		#else					{name: '${colInfo.fieldId}', index :'${colInfo.fieldId}'#if(${colInfo.columnId} == "POST_ID"), hidden:true, key:true#end#if(${colInfo.columnId} == "POST_TITLE"), classes:'cell-link'#if(${boardInfo.useComment} == 'Y'), formatter:titleFormatter#end#end#if(${colInfo.columnId} == "CREATE_DTTM" || ${colInfo.columnType} == "TIME" || ${colInfo.columnType} == "DATE"), formatter:timeStampFormatter#end#if(${colInfo.columnId} != "POST_TITLE"), align:'center'#end, sortable:false}#if($foreach.hasNext), ${esc.n}#end
#end#end

		],
		height			: '358',
		scroll 			: false, 
		viewrecords 	: true,	
		autowidth 		: true,
		multiselect		: true,
		page			: $('#pageIndex').val(),
		rowNum			: 3,	        
		jsonReader		: {repeatitems	: false},
		scrollOffset	: 0,
		pager 			: '#pagination',
		sortable 		: false,
		hidegrid		: false,
		onCellSelect: function(rowid, iCol, cellcontent, e) {
			var cm = $('#board_grid').jqGrid("getGridParam", "colModel");
			var colName = cm[iCol]['index'];
			if(colName == "postTitle") {
				var url='<c:url value="/${boardName}/view.do"/>?postId=' + rowid;
				url += '&searchCondition=' + $('#searchCondition').val();
				url += '&searchKeyword=' + $('#searchKeyword').val();
				url += '&pageIndex=' + $('#board_grid').jqGrid('getGridParam', 'page');
				self.location.href=url;
			}
		},
    	loadComplete : function(xhr) {
		}
	}).navGrid('#pagination',{edit:false,add:false,del:false,search:false,refresh:false});	

	/*
 	 *	Validation Check 
	 */
	$('#searchForm').validate({
	});
	
	/*
 	 *	Submit False 
	 */
	$('#searchForm').submit(function(e){
		return false;
	});
	
	/*
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
	 *	Post Search
	 */
	$("#searchBoard").click(function() {
		searchCondition = $('#searchCondition').val();
		searchKeyword = $('#searchKeyword').val();
		jQuery("#board_grid").setGridParam({
			page : $("#pageIndex").val(),
			postData : {
				pageIndex : $('#pageIndex').val(),
				searchKeyword : searchKeyword,
				searchCondition : searchCondition
			}
		});
		jQuery('#board_grid').setGridParam({datatype:'json'}).trigger("reloadGrid");
		return false;
	});
	
	/**
	 *	Add button click event
	 */
	$('button.add').click(function(e){
		var url = '<c:url value="/${boardName}/form.do"/>';
		url += '?searchCondition=' + searchCondition;
		url += '&searchKeyword=' + searchKeyword;
		url += '&pageIndex=' + $('#board_grid').jqGrid('getGridParam', 'page');
		self.location.href = url;
	});
		
	/**
	 *	Delete button click event
	 */
	$('button.delete').click(function(e) {
		var url = '<c:url value="/${boardName}/removePosts.do"/>';
		var rowNum = "";
		var postIds = "";
				
		rowNum = new String(jQuery('#board_grid').jqGrid('getGridParam','selarrrow'));
		rowNumList = rowNum.split(',');
		
		if(rowNum == null || rowNum == '') {
			alert("<spring:message code='${boardName.toLowerCase()}.message.required.select'/>");
			return false;
		} else {
			if(confirm("<spring:message code='${boardName.toLowerCase()}.message.confirm.remove'/>")) {
				for(var i = 0 ; i < rowNumList.length ; i++) {
					rowData = jQuery('#board_grid').getRowData(rowNumList[i]);
					if(i == rowNumList.length - 1) {
						postIds += rowData.postId;
					} else {
						postIds += rowData.postId + ",";
					}
				}
				$.post(url, {'postIds' : postIds}, function(data) {
					jQuery('#board_grid').trigger('reloadGrid');
				});
			}
		}
	});
	
	/**
	 *	Browser resize event
	 *    - Script for grid resizing
	 */
	$(window).resize(function(){
		gridId = "board_grid";
	    gridParentWidth = $('#gbox_' + gridId).parent().width();
	    $('#' + gridId).jqGrid('setGridWidth',gridParentWidth);
	});
});
		
</script>
<!--************************** begin of contents *****************************-->
<div id="wrap">
	<div id="container">
		<form:form modelAttribute="searchVO" method="post" id="searchForm" name="searchForm">  
	    	<div class="cont_top">
	        	<h2><spring:message code='${boardName.toLowerCase()}list.title'/></h2>
	      		<div class="search_list">
	                <fieldset>
	                    <legend>Search</legend>
	                    <label for="searchCondition" class="float_left margin_right5">
							<form:select path="searchCondition" id="searchCondition" cssClass="w_search search_keyword">
								<form:option value=""><spring:message code='${boardName.toLowerCase()}.all'/></form:option>  
	       	   	   	    		<form:option value="postId"><spring:message code='${boardName.toLowerCase()}.postid'/></form:option>
	    					   	<form:option value="postTitle"><spring:message code='${boardName.toLowerCase()}.posttitle'/></form:option>
	           	      			#if(${boardInfo.useAnonymous} == 'N')<form:option value="createId"><spring:message code='${boardName.toLowerCase()}.createid'/></form:option>
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
	    	<div class="list">
				<table id="board_grid"></table>
	 			<input type="hidden" value="${searchVO.pageIndex}" name="pageIndex" id="pageIndex"/>
				<div id="pagination" class="pagination"></div>
	    	</div> 
	   	</form:form>       
	    <div class="listunder_container">   
	        <div class="none_listpaging">
	        </div>
	   		<div class="list_underbtn_right">
	            <button class="button default icon add">   
	                <span class="add">&nbsp;</span>
	                <span class="none_a txt_num3"><spring:message code='${boardName.toLowerCase()}.button.add'/></span>
	            </button>
	            <button class="button default icon delete">   
	                <span class="delete">&nbsp;</span>
	                <span class="none_a txt_num3"><spring:message code='${boardName.toLowerCase()}.button.delete'/></span>
	            </button>
			</div>
		</div>
	</div>
</div>
</body>
</html>