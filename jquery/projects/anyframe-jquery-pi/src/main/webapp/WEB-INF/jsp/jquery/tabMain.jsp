<%@ page language="java" errorPage="/sample/common/error.jsp"
	pageEncoding="UTF-8" contentType="text/html;charset=utf-8"%>
<%@ include file="/sample/common/taglibs.jsp"%>
<%
	session.setAttribute("regId", "test.lee");
%>
<c:set var="treeId" value="tree"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/html140/DTD/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Anyframe Jquery Plugin Sample</title>

<!-- for jquery -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-1.6.2.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/validation/jquery.validate.js'/>"></script>

<!-- jquery ui -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-ui/jquery-ui-1.8.16.custom.min.js'/>"></script>
<link id='uiTheme' href="<c:url value='/jquery/jquery/jquery-ui/themes/redmond/jquery-ui-1.8.16.custom.css'/>" rel="stylesheet" type="text/css" />

<!-- jqGrid -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/jquery.jqGrid.min.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/plugins/grid.setcolumns.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jqgrid/ui.jqgrid.css'/>" rel="stylesheet" type="text/css" />

<!-- quick pager -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/quickpager/quickpager.mod.jquery.js'/>"></script>
<link href="<c:url value='/jquery/jquery/quickpager/pagination.css'/>" rel="stylesheet" type="text/css" />


<!-- logger -->
<script src="<c:url value='/jquery/jquery/logger.js'/>" type="text/javascript"></script>

<!-- tree about Start -->
<script src="<c:url value='/jquery/jquery/jstree/jquery.jstree.js'/>" type="text/javascript"></script>
<script src="<c:url value='/jquery/jquery/jstree/lib/jquery.hotkeys.js'/>" type="text/javascript"></script>
<script src="<c:url value='/jquery/jquery/jstree/lib/jquery.cookie.js'/>" type="text/javascript"></script>
<!-- tree about End -->

<!-- File Attachement Start -->
<link type="text/css" href="<c:url value='/jquery/jquery/uploadify/uploadify.css'/>" rel="stylesheet">
<script src="<c:url value='/jquery/jquery/uploadify/swfobject.js'/>" type="text/javascript"></script>
<script src="<c:url value='/jquery/jquery/uploadify/jquery.uploadify.v2.1.4.min.js'/>" type="text/javascript"></script>
<script src="<c:url value='/jquery/jquery/jqueryUpload.js'/>" type="text/javascript"></script>
<!-- File Attachement End -->

<link rel="stylesheet" href="<c:url value='/sample/css/admin_new.css'/>" type="text/css" />


<script type="text/javascript">

var _currentNodeType = 'ROOT';
var _currentNodeId = 'ROOT';

/**
 * Category Form Initialize
 */
function clearCategoryDialog() {
	$('#txtCategoryName').val('');
	$('#txtCategoryDesc').val('');
	$('#hidCategoryId').val('');
	$('#hidRegDate').val('');
	$('label.error').remove();
}

/**
 * Community Form Initialize
 */
function clearCommunityDialog() {
	$('#hidCommunityId').val('');
	$('#txtCommunityName').val('');
	$('#txtCommunityDesc').val('');
	$('#hidParentCategoryId').val('');
	$('#hidCommunityRegDate').val('');
	$('label.error').remove();
}

/**
 * Add/Modify operation for Category
 */ 
function categorySave() {
	if(!$('#category-form').valid()) {
		logger.log('category-form is invalid.');
		return false;
	}
	$.post('<c:url value="/jqueryCategory.do?method=save"/>', $('#category-form').serialize(), function(data) {
		logger.log('save complete');
		if(typeof(data.categoryId) != 'undefined') {
			logger.log('new Category id is :' + data.categoryId);
			$('#${treeId}').jstree("create", $('#ROOT'), "last", {
				'attr' : {
					'id' : data.categoryId,
					'rel' : 'CA'
				},
				'data' : $('#txtCategoryName').val()
			}, false, true);
			
			$('#grid_ROOT').trigger("reloadGrid");
		}else{
			$('#' + $('#hidCategoryId').val() + ' a:first').html('<ins class=\"jstree-icon\">&nbsp</ins>' + $('#txtCategoryName').val());
		}
		$('#category-form').dialog('close');
		clearCategoryDialog();
	});
}

/**
 * Add/Modify operation for Community
 */ 
function communitySave(obj) {
	if(!$('#community-form').valid()) {
		logger.log('community-form is invalid.');
		return false;
	}
	$.post('<c:url value="/jqueryCommunity.do?method=save"/>', $('#community-form').serialize(), function(data) {
		logger.log('save complete');
		if(typeof(data.communityId) != 'undefined') {
			logger.log('new Community id is :' + data.communityId);
			logger.log('parent is : ' + $('#hidParentCategoryId').val());
			$('#hidCommunityId').val('');
			$('#${treeId}').jstree("create", obj, "last", {
				'attr' : {
					'id' : data.communityId,
					'rel' : 'CO'
				},
				'data' : $('#txtCommunityName').val()
			}, false, true);
			$('#community').append('<option value="' + data.communityId + '">' + $('#txtCommunityName').val() + '</option>');
			$('#grid_' + data.categoryId).trigger("reloadGrid");
		}else{
			$('#' + $('#hidCommunityId').val() + ' a:first').html('<ins class=\"jstree-icon\">&nbsp</ins>' + $('#txtCommunityName').val());
		}
		$('#community-form').dialog('close');
		clearCommunityDialog();
	});
}

/**
 * dialog open for Category Add/Modify form
 */
function openCategoryForm(obj, dialogMode) {
	var pos = $(obj).offset();
	$('#category-form').dialog({
		position:[pos.left,pos.top],
		buttons: {
		'<spring:message code="jquery.dialog.btn.save" />': function() {
			categorySave();
		},
		'<spring:message code="jquery.dialog.btn.cancel" />': function() {
			$( "#category-form" ).dialog( "close" );
		}
	}});
	if(dialogMode == 'create'){
		$('#category-form').dialog('open');
	}else if(dialogMode == 'edit') {
		$.get('<c:url value="/jqueryCategory.do?method=get"/>&categoryId=' + obj.attr('id'), function(data){
			$('#hidCategoryId').val(data.category.categoryId);
			$('#txtCategoryName').val(data.category.categoryName);
			$('#hidRegDate').val(data.category.regDate);
			$('#txtCategoryDesc').val(data.category.categoryDesc);
			$('#category-form').dialog('open');
		});
	}
}

/**
 * dialog open for Community Add/Modify form
 */
function openCommunityForm(obj, dialogMode) {
	var pos = $(obj).offset();
	$('#community-form').dialog({position:[pos.left,pos.top],
		buttons:{
			'<spring:message code="jquery.dialog.btn.save" />' : function() {
			communitySave(obj);
		},
		'<spring:message code="jquery.dialog.btn.cancel" />' : function() {
			$(this).dialog('close');
		}
	}});
	if(dialogMode == 'create') {
		$('#hidParentCategoryId').val(obj.attr('id'));
		$('#community-form').dialog('open');
	}else if(dialogMode == 'edit') {
		var pos = $(obj).offset();
		$.get('<c:url value="/jqueryCommunity.do?method=get"/>&communityId=' + obj.attr('id'), function(data){
			$('#hidCommunityId').val(data.community.communityId);
			$('#hidParentCategoryId').val(data.community.categoryId);
			$('#txtCommunityName').val(data.community.communityName);
			$('#hidRegId').val(data.community.regId);
			$('#hidCommunityRegDate').val(data.community.regDate);
			$('#txtCommunityDesc').val(data.community.communityDesc);
			$('#community-form').dialog('open');
		});
	}
}

/**
 * context menu generate for tree
 */
function createContextMenu(node) {

	var default_object = {
		'create' : {},
		'edit' : {},
		'remove' : {}
	};
	if(node.attr('id') == 'ROOT') {
		default_object = {
			create : {
				label : '<spring:message code="category.context.add" />',
				action : function(obj) {
					logger.log('create category : ' + obj.attr('id'));
					openCategoryForm(obj, 'create');
				}
			},
			edit : false,
			remove : false
		};
	}else if(node.attr('rel') == 'CA') {
		default_object = {
			create : {
				label : '<spring:message code="community.context.add" />',
				action : function(obj) {
					logger.log('create community : ' + obj.attr('id'));
					openCommunityForm(obj, 'create');
				}
			},
			edit : {
				label : '<spring:message code="category.context.edit" />',
				action : function(obj) {
					logger.log('edit category : ' + obj.attr('id'));
					openCategoryForm(obj, 'edit');
				}
			},
			remove : {
				label : '<spring:message code="category.context.delete" />',
				_disabled : node.children('ul').length > 0 ? true : false,
				action : function(obj) {
					logger.log('remove category : ' + obj.attr('id'));
					if(this.is_selected(obj)) { 
						this.remove(); 
					} else { 
						this.remove(obj); 
					} 
				}
			}
		};
	}else if(node.attr('rel') == 'CO') {
		default_object = {
			create : false,
			edit : {
				label : '<spring:message code="community.context.edit" />',
				action : function(obj) {
					logger.log('edit community : ' + obj.attr('id'));
					openCommunityForm(obj, 'edit');
				}
			},
			remove : {
				label : '<spring:message code="community.context.delete" />',
				action : function(obj) {
					logger.log('remove community : ' + obj.attr('id'));
					if(this.is_selected(obj)) { 
						logger.log('try remove 1: ' + obj.attr('id'));
						this.remove(); 
					} else { 
						logger.log('try remove 2: ' + obj.attr('id'));
						this.remove(obj); 
					} 
				}
			}
		};
	}
	return default_object;
}

// tree definition
$(document).ready(function() {

	$('#${treeId}').jstree({
   		'plugins' : ["themes","html_data","ui","crrm","search","types","hotkeys","contextmenu"], //,"dnd"  ,"html_data" , 'checkbox', "cookies", 
   		'themes' : {
   			'theme' : 'default',
   			'dots' : false,
   			'icons' : true
		},
		'contextmenu' : {
			'items' : createContextMenu
		},
		'search' : {
			'case_insensitive' : true
		},
		'types' : {
			'valid_children' : ["root"],
			'types' : {
				'CA' : {},
				'CO' : {// change icon for community
					'icon' : {'image' : '<c:url value="/sample/images/tree_types/leaficons.png"/>'}
				}
			}
		},
		'core' : {
			'initially_open' : ['ROOT'],
			'animation' : 0
		}
	}).bind("select_node.jstree", function (e, data) { // event handling for node select
		logger.log('select_node:' + data.rslt.obj.attr("id"));
		if(data.rslt.obj.attr('id') == 'ROOT') { // Root is selected
			logger.log('root Selected');
			_currentNodeType = 'ROOT';
			_currentNodeId = 'ROOT';
			$tabs.tabs('select', '#tabs-0');
		}else if(data.rslt.obj.attr('rel') == 'CA') { // Category is selected
			logger.log('category Selected');
			_currentNodeType = data.rslt.obj.attr('rel');
			_currentNodeId = data.rslt.obj.attr('id');
			// commuity list load
			$.get("<c:url value='/jqueryCategory.do?method=get'/>", {'categoryId' : data.rslt.obj.attr('id')}, function(r) {
				addTab(r.category.categoryName, data.rslt.obj.attr('id'));
			});
		}else if(data.rslt.obj.attr('rel') == 'CO'){ // Community is selected
			logger.log('community Selected');
			_currentNodeType = data.rslt.obj.attr('rel');
			_currentNodeId = data.rslt.obj.attr('id');
			// community's board list load
			$.get("<c:url value='/jqueryCommunity.do?method=get'/>", {'communityId' : data.rslt.obj.attr('id')}, function(r) {
				addTab(r.community.communityName, data.rslt.obj.attr('id'));
			});
		}
		$('#community').val(data.rslt.obj.attr('id'));		
	}).bind("remove.jstree", function(e, data) { // event handling for node delete
		data.rslt.obj.each(function() {
			if($(data.rslt.obj).attr("rel") == 'CO') { // for community
				logger.log('community removed:' + $(data.rslt.obj).attr("id"));
				$.ajax({
					async : false,
					type : 'POST',
					url : '<c:url value="/jqueryCommunity.do?method=remove"/>',
					data : {
						"communityId" : $(data.rslt.obj).attr("id")
					},
					success : function(r) {
						logger.log('111');
						data.inst.refresh();
						logger.log('222');
						$tabs.tabs('remove', '#tabs-' + $(data.rslt.obj).attr("id"));
						logger.log('333');
						$("#community option[value='" + $(data.rslt.obj).attr("id") + "']").remove();
						logger.log('444');
					},
					error : function() {
						$.jstree.rollback(data.rlbk);
					}
				});
			}else if($(data.rslt.obj).attr("rel") == 'CA'){ // for category
				$.ajax({
					async : false,
					type : 'POST',
					url : '<c:url value="/jqueryCategory.do?method=remove"/>',
					data : {
						"categoryId" : $(data.rslt.obj).attr("id")
					},
					success : function(r) {
						data.inst.refresh();
						$tabs.tabs('remove', '#tabs-' + $(data.rslt.obj).attr("id"));
					},
					error : function() {
						$.jstree.rollback(data.rlbk);
					}
				});
			}
		});
	});

	// tree search event handler for button click case
	$('#treeSearch').click(function(e) {
		$('#${treeId}').jstree('search', $('#searchKeyword').val());
	});

	// tree search event handler for enter key down case
	$('#searchKeyword').keydown(function(e) {
		if(e.keyCode == '13') {
			$('#${treeId}').jstree('search', $('#searchKeyword').val());
			return false;
		}
	});

	$( "#category-form" ).validate();
	$( "#community-form" ).validate();

	// Dialog form definition for Category
	$( "#category-form" ).dialog({
		autoOpen: false,
		width: 400,
		height:"auto",
		modal: true,
		resizable:true,
		close: function() {
			clearCategoryDialog();
		}
	});

	// Dialog form definition for Community
	$( "#community-form" ).dialog({
		autoOpen: false,
		width: 400,
		height:"auto",
		modal: true,
		resizable:true,
		close: function() {
			clearCommunityDialog();
		}
	});
		
});

</script>

<!-- file attachment Start -->
<script type="text/javascript">
function upload() {
	AnyframeUpload.fileUpload();
}

$(document).ready(function() {
	$('#uploadPane').attachment({
		//'refId' : 'board_article_upload',
		'contextRoot' : '${ctx}',
		'callBack' : function() {
			savePost(); // after file upload
		}
	});
});
</script>
<!-- file attachment End -->
<script type="text/javascript">

/**
 * 게시물 등록/수정 폼 초기화
 */
function clearDialog(){
	$("#boardPostId").val("");
	$("#boardTitle").val("");
	$("#boardContents").val("");
	$("#boardRegId").val("");
	$("#boardRegDate").val("");
	$("#communities").val("").selected;
	$('label.error').remove();
	AnyframeUpload.clearList('uploadPane');
	AnyframeUpload.options.refId = '';
	dialogMode = "";
}

/**
 * Add/Modify for Post
 */
function savePost() {
	logger.log('dialogMode is : ' + dialogMode);
	logger.log('refId=' + AnyframeUpload.options.refId);
	var gridId = '#grid_' + _currentTabId;
	
	if(!$('#dialog-form').valid()) {
		logger.log('dialog-form is invalid.');
		return false;
	}
	if(dialogMode == "add"){
		$('#refId').val(AnyframeUpload.options.refId);
		//create url call
		$.post(
			"<c:url value='/jqueryBoard.do?method=create'/>", 
			$("#dialog-form").serialize(), 
			function(data) {
				logger.log('reload grid : ' + gridId);
				$(gridId).trigger("reloadGrid");
				$("#dialog-form").dialog("close");
			});
	}else if(dialogMode == "edit"){
		//update url call
		$.post(
	    	"<c:url value='/jqueryBoard.do?method=update'/>", 
	    	$("#dialog-form").serialize(), 
	    	function(data) {
	    		$(gridId).trigger("reloadGrid");
	    		$("#dialog-form").dialog("close"); 
	    	});
	}else{
		logger.log('dialogMode is invalid : ' + dialogMode);
	}
}

$(document).ready(function(){

	$('#dialog-form').validate();
	
	$("#dialog-form").dialog({
		autoOpen: false,
		width: 400,
		height:"auto",
		modal: true,
		resizable:true,
		position : ['center',50],
		buttons: {
			'<spring:message code="jquery.dialog.btn.save" />': function() {
				upload();//file upload first
			},
			'<spring:message code="jquery.dialog.btn.cancel" />': function() {
				$( "#dialog-form" ).dialog( "close" );
			}
		},
		close: function() {
			clearDialog();
		}
	});
});
</script>

<script type="text/javascript">

function _createGridType1(id) {
	var gridId = '#grid_' + id;
	var paginationId = gridId + '_pagination';
	
	$(gridId).jqGrid({
		url: "<c:url value='/jqueryBoard.do?method=list' />",
		mtype:'POST',
		datatype : "json",
		postData : {'communityId' : id, 'searchKeyword' : '', 'searchCondition' : ''},
		colNames : [ '<spring:message code="board.id" />', '<spring:message code="category.name" />', '<spring:message code="board.title" />', 
		             '<spring:message code="board.contents" />', '<spring:message code="board.regId" />', 
		             '<spring:message code="board.regDate" />', '<spring:message code="community.id" />'],
		jsonReader: {repeatitems: false},
		colModel : [ 
			{key : true, name : 'postId', editable:false, hidden:true}, 
			{name : 'communityName', name : 'communityName', editable:false, hidden:true},
			{name : 'title', index : 'title', align : 'center', editable:true}, 
			{name : 'contents', index :'contents' , align : 'left', editable:true, hidden : false}, 
			{name : 'regId', index : 'regId' , align : 'center', editable:false, width:50}, 
			{name : 'regDate', index : 'regDate', align : 'center', sorttype:"date", editable:true,width:70},
			{name : 'communityId', name : 'communityId', editable:false, hidden:true}],
		autowidth : true,
		height : "auto",	
		viewrecords : true,	
		rowNum : 3, sortable : true,
		loadComplete : function(xhr) {
			$(paginationId).quickPager( {
	    		pageSize: "3",
	    		pageUnit: "10",
	    		pageIndexId: 'grid_' + id + "_pageIndex",
	    		searchButtonId: 'grid_' + id + "_btnSearch", 
	    		currentPage: $(gridId).getGridParam("page"),
	    		totalCount: $(gridId).getGridParam("records"),
	    		searchUrl: "#"
	    		});
	    },
	    gridComplete: function() { 
	    	$("#_empty",gridId).addClass("nodrag nodrop"); 
	    	//$("#grid").tableDnDUpdate(); 
	    	$(gridId).setGridWidth($('#right').width() - 40);
	    	$(window).bind('resize', function() {
	    	    $(gridId).setGridWidth($('#right').width() - 40);
	    	}).trigger('resize');
	    }, 
		loadError: function(xhr,st,err) {
			alert(err); 
		}
	});

	$("button", ".buttons").button();
	
	$(gridId + "_btnAdd").click(function() { 
		dialogMode = "add";
		AnyframeUpload.options.refId = '';
		$("#dialog-form").dialog( "open" );
	});

	$(gridId + "_btnEdit").click(function() { 
		var rowNum = $(gridId).jqGrid('getGridParam','selrow');
		if(rowNum == null || rowNum == ""){
			alert('<spring:message code="board.msg.delete.alert" />');
		}else{
			dialogMode = "edit";
			$.post(
			       "<c:url value='/jqueryBoard.do?method=get'/>", {postId : rowNum}, 
			       function(data) {
			    	   $("#boardPostId").val(data.board.postId);
			    	   $("#boardTitle").val(data.board.title);
			    	   $("#boardContents").val(data.board.contents);
			    	   $("#boardRegId").val(data.board.regId);
			    	   $("#boardRegDate").val(data.board.regDate);
			    	   $("#communities").val(data.board.communityName).selected;

			    	   AnyframeUpload.options.refId = data.board.postId;
			    	   AnyframeUpload.loadAttachedFileList('uploadPane');
			    	   
			    	   $( "#dialog-form" ).dialog( "open" );
		     }); 
		}
	});
	
	$(gridId + "_btnRemove").click(function() { 
		var rowNum = $(gridId).jqGrid('getGridParam','selrow');
		var postId = $(gridId).getCell(rowNum, 'postId');
		$(gridId).delGridRow( rowNum, {
			reloadAfterSubmit:true,
			msg:'<spring:message code="board.msg.delete.confirm" />',
			delData:{postId: postId},
			url:"<c:url value='/jqueryBoard.do?method=remove'/>"
		});
	});
	
	$(gridId + "_btnRefresh").click(function() { 
		$(gridId).trigger("reloadGrid");
	});
	
	$(gridId + "_btnSearch").click(function() {
		$(gridId).setGridParam({
			page: $(gridId + "_pageIndex").val(),
			postData: {
				searchKeyword:$(gridId + "_searchKeyword").val(), 
				searchCondition:$(gridId + "_searchCondition").val()
			}
		});
		$(gridId).setGridParam({url:"<c:url value='/jqueryBoard.do?method=list'/>"}).trigger("reloadGrid");
	});
	
	//$(gridId + "_btnChooser").click(function() { 
	//	$(gridId).jqGrid('setColumns');
	//});

	/* auto click by enter key */
	$(gridId + "_searchKeyword").keypress(function (e) {
		if (e.which == 13){
			$(gridId + "_pageIndex").val('1');
			$(gridId + "_btnSearch").trigger("click");
			return false;
		}
	});

	$(gridId + "_searchKeyword").autocomplete({
		source : function(request, response){
			logger.log('call');
			$.ajax({
				'url' : '<c:url value="/jqueryBoard.do?method=searchKeyword"/>',
				'type' : 'POST',
				'async' : false,
				'data' : 'searchKeyword=' + $(gridId + "_searchKeyword").val() + '&searchCondition=' + $(gridId + "_searchCondition").val() + '&communityId=' + _currentNodeId,
				'dataType' : 'json',
				'success' : function(data){
					logger.log('return:data.r.length=' + data.r.length);
					response(data.r);
				}
			});
		},
		minLength : 1,
		select : function(event, ui) {
			logger.log('autocomplete selected:' + ui.item.value);
			$(gridId + '_searchKeyword').val(ui.item.value);
			$(gridId + '_pageIndex').val('1');
			$(gridId + '_btnSearch').trigger("click");
			return false;
		}
	});

}

var isCellSaved;
var lastsel_row;
var lastsel_col;

function _createGridType2(id) {
	
	var gridId = '#grid_' + id;
	
	$(gridId).jqGrid({
		url: "<c:url value='/jqueryCommunity.do?method=list' />",
		mtype:'POST',
		datatype : "json",
		postData : {'categoryId' : id},
		colNames : ['<spring:message code="community.id" />','<spring:message code="community" /> <spring:message code="community.name" />', '<spring:message code="community.desc" />', 
		            '<spring:message code="community.redId" />', '<spring:message code="community.regDate" />', '<spring:message code="category.id" />', '<spring:message code="category.name" />',''],
		jsonReader: {repeatitems: false},
		colModel : [ 
		{key : true, name : 'communityId', editable:false, hidden:true}, 
		{name : 'communityName', index : 'communityName', align : 'center', editable:true}, 
		{name : 'communityDesc', index :'communityDesc' , align : 'left', editable:true}, 
		{name : 'regId', index : 'regId' , align : 'center', editable:false, width:75}, 
		{name : 'regDate', index : 'regDate', align : 'center', sorttype:"date", width:100, editable:true,
			editoptions: {
	              dataInit: function(element) {
           		    $(element).datepicker({ 
           		    	dateFormat: 'yy/mm/dd',
           		    	onSelect: function(dataText, inst){
           		    		$(gridId).jqGrid('saveCell',lastsel_row, lastsel_col); 
           		    	}
    		    	});
	              }
	          }	
		},
		{name : 'categoryId', name : 'categoryId', editable:false, hidden:true},
		{name : 'categoryName', name : 'categoryName', editable:false, hidden:true},
		{name: 'myac', width:40, fixed:true, sortable:false, resize:false, formatter:'actions', 
			formatoptions:{editbutton:false, keys:true,
				delOptions:{msg:'<spring:message code="board.msg.delete.confirm" />',
					onclickSubmit:function(rp_ge, rowid){
					$(gridId).delGridRow( rowid, {
						reloadAfterSubmit:true,
						delData:{communityId: rowid},
						url:"<c:url value='/jqueryCommunity.do?method=remove'/>",
						afterComplete : function (response, postdata, formid) {
							$('#${treeId}').jstree("remove","#" + rowid);
							return false;
						} 
					});
				}}
			}
		}],
		scroll : true,
		height : 70,
		multiselect : false, viewrecords : true,	
		rowNum : 3, sortable : true,
		cellEdit: true, cellsubmit:"remote",
		cellurl:"<c:url value='/jqueryCommunity.do?method=updateCell'/>",
		beforeEditCell: function(id,name,val,iRow,iCol){     
			lastsel_row = iRow;
			lastsel_col = iCol;
			isCellSaved = false;
		},
		beforeSaveCell: function(id,name,val,iRow,iCol){  
			isCellSaved = true;
		},
		afterSaveCell:function(rowid, cellname, value, iRow, iCol){
			if(cellname=="communityName"){
				$('#${treeId}').jstree('get_selected').find("#"+rowid+" a").html('<ins class="jstree-icon">&nbsp;</ins>' + value);
			}
		},
	    gridComplete: function() { 
	    	$("#_empty",gridId).addClass("nodrag nodrop"); 
	    	$(gridId).setGridWidth($('#right').width() - 40);
	    	$(window).bind('resize', function() {
	    	    $(gridId).setGridWidth($('#right').width() - 40);
	    	}).trigger('resize');
	    }, 
		loadError: function(xhr,st,err) {
			alert(err); 
		}
	});
	
	$(gridId + "_btnSearch").click( function() {
		$(gridId).setGridParam({
			postData: {
				searchKeyword:$(gridId + "_searchKeyword").val(), 
				searchCondition:$(gridId + "_searchCondition").val()
			}
		});
		$(gridId).setGridParam({url:"<c:url value='/jqueryCommunity.do?method=list'/>"}).trigger("reloadGrid");
		return false;
	});

	/* auto click by enter key */
	$(gridId + "_searchKeyword").keypress(function (e) {
		if (e.which == 13){
			$(gridId + "_btnSearch").trigger("click");
			return false;
		}
	});

	$(gridId + "_searchKeyword").autocomplete({
		source : function(request, response){
			logger.log('call');
			$.ajax({
				'url' : '<c:url value="/jqueryCommunity.do?method=searchKeyword"/>',
				'type' : 'POST',
				'async' : false,
				'data' : 'searchKeyword=' + $(gridId + "_searchKeyword").val() + '&searchCondition=' + $(gridId + "_searchCondition").val() + '&categoryId=' + id,
				'dataType' : 'json',
				'success' : function(data){
					logger.log('return:data.r.length=' + data.r.length);
					response(data.r);
				}
			});
		},
		minLength : 1,
		select : function(event, ui) {
			logger.log('autocomplete selected:' + ui.item.value);
			$(gridId + '_searchKeyword').val(ui.item.value);
			$(gridId + '_pageIndex').val('1');
			$(gridId + '_btnSearch').trigger("click");
			return false;
		}
	});

	//$(gridId).jqGrid('gridResize');
}

$(document).ready(function() {
	var id = 'ROOT';
	var gridId = '#grid_' + id;
	var paginationId = gridId + '_pagination';
	
	$(gridId).jqGrid({
		url: "<c:url value='/jqueryCategory.do?method=gridList' />",
		mtype:'POST',
		datatype : "json",
		colNames : ['<spring:message code="category" /> <spring:message code="category.id" />','<spring:message code="category" /> <spring:message code="category.name" />', 
		            '<spring:message code="category.desc" />', '<spring:message code="category.regDate" />'],
		jsonReader: {repeatitems: false},
		colModel : [ 
		{key : true, name : 'categoryId', editable:false, hidden:true}, 
		{name : 'categoryName', index : 'categoryName', align : 'center', editable:false, width:150}, 
		{name : 'categoryDesc', index :'categoryDesc' , align : 'left', editable:false}, 
		{name : 'regDate', index : 'regDate', align : 'center', sorttype:"date", width:100, editable:false,
			editoptions: {
	              dataInit: function(element) {
	                  $(element).datepicker({ dateFormat: 'yy-mm-dd'});
	              }
	          }	
		}],
		scroll : true,
		height : 220,
		multiselect : false, viewrecords : true,	
		rowNum : 3, sortable : true,
		cellEdit: false, cellsubmit:"remote",
		cellurl:"<c:url value='/jqueryCategory.do?method=save'/>",
		beforeEditCell: function(id,name,val,iRow,iCol){     
			lastsel_row = iRow;
			lastsel_col = iCol;
			isCellSaved = false;
		},
		beforeSaveCell: function(id,name,val,iRow,iCol){  
			isCellSaved = true;
		},
		afterSaveCell:function(rowid, cellname, value, iRow, iCol){
			$('#${treeId}').jstree('get_selected').find("#"+rowid+" a").html('<ins class="jstree-icon">&nbsp;</ins>' + value);
		},
	    gridComplete: function() { 
	    	$("#_empty",gridId).addClass("nodrag nodrop"); 
	    	//$(gridId).tableDnDUpdate(); 
	    	$(gridId).setGridWidth($('#right').width() - 40);

	    	$(window).bind('resize', function() {
	    	    $(gridId).setGridWidth($('#right').width() - 40);
	    	}).trigger('resize');
	    },
	    ondblClickRow : function(rowid, iRow, iCol, e) {
		    logger.log('grid dbl click: ' + rowid);
		    $('#${treeId}').jstree('select_node', '#' + rowid);
	    },
		loadError: function(xhr,st,err) {
			alert(err); 
		}
	});
	
	$(gridId + "_btnSearch").click( function() {
		$(gridId).setGridParam({
			postData: {
				searchKeyword:$(gridId + "_searchKeyword").val(), 
				searchCondition:$(gridId + "_searchCondition").val()
			}
		});
		$(gridId).setGridParam({url:"<c:url value='/jqueryCategory.do?method=gridList'/>"}).trigger("reloadGrid");
		return false;
	});

	/* auto click by enter key */
	$(gridId + "_searchKeyword").keypress(function (e) {
		if (e.which == 13){
			$(gridId + "_btnSearch").trigger("click");
			return false;
		}
	});

	$(gridId + "_searchKeyword").autocomplete({
		source : function(request, response){
			logger.log('call');
			$.ajax({
				'url' : '<c:url value="/jqueryCategory.do?method=searchKeyword"/>',
				'type' : 'POST',
				'async' : false,
				'data' : 'searchKeyword=' + $(gridId + "_searchKeyword").val() + '&searchCondition=' + $(gridId + "_searchCondition").val(),
				'dataType' : 'json',
				'success' : function(data){
					logger.log('return:data.r.length=' + data.r.length);
					response(data.r);
				}
			});
		},
		minLength : 1,
		select : function(event, ui) {
			logger.log('autocomplete selected:' + ui.item.value);
			$(gridId + '_searchKeyword').val(ui.item.value);
			$(gridId + '_pageIndex').val('1');
			$(gridId + '_btnSearch').trigger("click");
			return false;
		}
	});

	//$(gridId).jqGrid('gridResize');
});

</script>

<script type="text/javascript">
// Theme Switcher
$(document).ready(function(){

	$('#themeSwitcher').change(function() {
		var cssUrl = '<c:url value="/jquery/jquery/jquery-ui/themes/"/>';
		var theme = $('#themeSwitcher').val();
		$('#uiTheme').attr('href',cssUrl + theme + '/jquery-ui-1.8.16.custom.css');
	});

	$('#right').width($(window).width() - $('#left').outerWidth(true) - 30);
	logger.log($(window).width() + '-' + $('#left').outerWidth(true) + '=' + $('#right').width());
	$(window).resize(function() {
		$('#right').width($(window).width() - $('#left').outerWidth(true) - 30);
	});
});
</script>

<script type="text/javascript">
var _currentTabId = '';
var $tabs = null;

function addTab(title, id) {
	if($('#tabs-' + id).length > 0) {
		$tabs.tabs("select", '#tabs-' + id);
	}else{
		$tabs.tabs("add", "#tabs-" + id, title );
	}
}

$(document).ready(function(){

	$tabs = $('#tabs').tabs({
		tabTemplate: '<li><a href="<%="#"%>{href}"><%="#"%>{label}</a><span class="ui-icon ui-icon-close">Remove Tab</span></li>',
		add: function( event, ui ) {
			var tab_content = '';
			tab_content = _currentNodeType + ':' + _currentNodeId;
			$(ui.panel).append(tab_content);
			$(ui.tab).attr('nodeId', _currentNodeId);
			$(ui.tab).click();
			if(_currentNodeType == 'CO') {
				$.get('<c:url value="/jqueryBoard.do?method=getGridType1"/>', {'gridId' : 'grid_' + _currentNodeId}, function(data) {
					$(ui.panel).html(data);
					_createGridType1(_currentNodeId);
				});
			}else if(_currentNodeType == 'CA'){
				$.get('<c:url value="/jqueryBoard.do?method=getGridType2"/>', {'gridId' : 'grid_' + _currentNodeId}, function(data) {
					$(ui.panel).html(data);
					_createGridType2(_currentNodeId);
				});
			}
		},
		select : function(event, ui) {
			logger.log('tab selected!!:' + $(ui.tab).attr('nodeId'));
			_currentTabId = $(ui.tab).attr('nodeId');
		}
	});

	$( "#tabs span.ui-icon-close" ).live( "click", function() {
		var index = $( "li", $tabs ).index( $( this ).parent() );
		$tabs.tabs( "remove", index );
	});
});
</script>

</head>
<body>
<div id="wrapper">
	<!-- start of title-->
	<div class="title_bar">
		<div class="theme_switcher">
			<label for="themeSwitcher"><spring:message code="jqueyr.theme.title" /></label>
			<select id="themeSwitcher">
				<option value="black-tie">black-tie</option>
				<option value="blitzer">blitzer</option>
				<option value="cupertino">cupertino</option>
				<option value="excite-bike">excite-bike</option>
				<option value="humanity">humanity</option>
				<option value="overcast">overcast</option>
				<option value="redmond" selected>redmond</option>
				<option value="south-street">south-street</option>
				<option value="start">start</option>
				<option value="sunny">sunny</option>
				<option value="ui-lightness">ui-lightness</option>
			</select>
		</div>
		<div class="title01">
			<h1><spring:message code="jquery.title" /></h1>
		</div>
	</div>
	<!--end of title-->
	
	<div id="body">
		<div id="left">
			<!-- begin of tree search -->
			<div id="treeSearchForm">
				<form method="post" id="searchForm" name="searchForm">
	
					<table border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td>
								<label for="searchKeyword"><spring:message code="jquery.search" /> : </label><input type="text" name="searchKeyword" id="searchKeyword" class="jstree_search_input" />
							</td>
							<td align="left" style="padding-left:5px;">
								<a href="#" id="treeSearch"><img src="${ctx}/sample/images/btn_search.png" width="25" height="18" border="0" align="middle"/></a>
							</td>
	
						</tr>
					</table>
				
				</form>
			</div>
			<!-- end of tree search -->
			<!-- start of tree -->
			<div id="tree">
				<span>listNode</span>
				<ul>
			    	<li id="ROOT" rel="root">
			    		<a href='#'>ROOT</a>
						<c:set var="prevDepth" value="-1"/>
						<c:forEach var="node" items="${treeList}">
							<c:if test="${node.depth > prevDepth}">
					    		<ul>
							</c:if>
						   	<c:if test="${prevDepth > node.depth}">
						   		<c:forEach begin="${node.depth}" end="${prevDepth - 1}" step="1">
				    				</ul></li>
						   		</c:forEach>
						   	</c:if>
				    			<li id="${node.nodeId}" parentId="${node.parentId}" depth="${node.depth}" rel="${node.type}">
				    				<a href='#'>${node.nodeName}</a>
							<c:if test="${node.hasChild == 0}">
				    			</li>
						   	</c:if>
						   	<c:set var="prevDepth" value="${node.depth}"/>
						</c:forEach>
					</li>
			    </ul>
			</div>
			<!-- end of tree -->
		</div>
		<div id="right">
			<div id="tabs">
				<ul>
					<li><a href="#tabs-0" nodeId="ROOT"><spring:message code="category" /></a></li>
				</ul>
				<div id="tabs-0">
					<div class="grid_searchForm">
						<select id="grid_ROOT_searchCondition">
							<option value="name"><spring:message code="board.title" /></option>
							<option value="desc"><spring:message code="board.contents" /></option>
						</select>
						<input id="grid_ROOT_searchKeyword" maxlength="50"/>
						<img id="grid_ROOT_btnSearch" class="btnSearch" width="25" height="18" border="0" align="middle" src="${ctx}/sample/images/btn_search.png">
					</div>
					<form:form method="post" id="grid_ROOT_Form" name="grid_ROOTForm" onsubmit="javascript:return false;">
						<!-- jqGrid -->
						<table id="grid_ROOT" class="scroll" cellpadding="0" cellspacing="0">
							<tr>
								<td />
							</tr>
						</table>
						<div id="grid_ROOT_pager"></div>
						<input type="hidden" id="grid_ROOT_pageIndex" name="pageIndex" value="1" />
						<a id="grid_ROOT_getLink" name="getLink"></a>
					</form:form>
				</div>
			</div>
			
		</div>
	</div>
	
</div>
<!-- board form start -->
<form:form id="dialog-form" name="dialog-form" title="Board Form">
	<fieldset>
		<input type="hidden" name="postId" id="boardPostId">
		<input type="hidden" name="regId" id="boardRegId">
		<input type="hidden" name="regDate" id="boardRegDate">
		<table summary="jquery" width="100%">
			<tr>
				<td><spring:message code="board.title" /></td>
				<td><input type="text" name="title" id="boardTitle" class="dialog_text required" maxlength="25"></td>
			</tr>
			<tr>
				<td><spring:message code="board.contents" /></td>
				<td><textarea name="contents" id="boardContents" class="dialog_text required" maxlength="128"></textarea></td>
			</tr>
			<tr>
				<td><label for="deploy"><spring:message code="community" /></label></td>
				<td>
					<select name="communityId" id="community" class="selectbox">
						<c:forEach var="comm" items="${communityList}">
							<option value="${comm.communityId}"><c:out value="${comm.communityName}"></c:out></option>
						</c:forEach>
					</select>
				</td>
			</tr>
			<tr>
				<td><label><spring:message code="board.attach" /></label></td>
				<td>
					<div id="uploadPane"></div>
					<input type="hidden" name="refId" id="refId" value=""/>
				</td>
			</tr>
		</table>
	</fieldset>
</form:form>
<!-- board form end -->

<!-- category form start -->
<form:form id="category-form" name="category-form" title='Category From'>
	<fieldset>
		<input type="hidden" name="categoryId" id="hidCategoryId"/>
		<input type="hidden" name="regDate" id="hidRegDate">
		<table summary="Create Category" width="100%">
			<tr>
				<td><spring:message code="category.name" /></td>
				<td><input type="text" name="categoryName" id="txtCategoryName" class="dialog_text required" maxlength="25"></td>
			</tr>
			<tr>
				<td><spring:message code="category.desc" /></td>
				<td><textarea name="categoryDesc" id="txtCategoryDesc" class="dialog_text required" maxlength="25"></textarea></td>
			</tr>
		</table>
	</fieldset>
</form:form>
<!-- category form end -->

<!-- community form start -->
<form:form id="community-form" name="community-form" title='Community Form'>
	<fieldset>
		<input type="hidden" name="categoryId" id="hidParentCategoryId"/>
		<input type="hidden" name="communityId" id="hidCommunityId"/>
		<input type="hidden" name="regDate" id="hidCommunityRegDate">
		<input type="hidden" name="regId" id="hidRegId">
		<table summary="Create Community" width="100%">
			<tr>
				<td><spring:message code="community.name" /></td>
				<td><input type="text" name="communityName" id="txtCommunityName" class="dialog_text required" maxlength="25"></td>
			</tr>
			<tr>
				<td><spring:message code="community.desc" /></td>
				<td><textarea name="communityDesc" id="txtCommunityDesc" class="dialog_text required" maxlength="128"></textarea></td>
			</tr>
		</table>
	</fieldset>
</form:form>
<!-- community form end -->
</body>
</html>