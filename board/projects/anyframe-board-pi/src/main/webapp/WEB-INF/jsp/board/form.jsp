<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
		<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/board/form.do'/>">Board 1.1.1 SNAPSHOT</a></div>
    </div>
    <hr />
<!-- jQuery -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-1.7.2.min.js'/>"></script>

<!-- jquery ui & jquery tab css-->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jquery-ui/jquery-ui-1.8.22.custom.min.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jquery-ui/themes/smoothness/jquery-ui-1.8.22.custom.css'/>" rel="stylesheet" type="text/css" />

<!-- jqGrid -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/i18n/grid.locale-en.js'/>"></script>
<script type="text/javascript" src="<c:url value='/jquery/jquery/jqgrid/jquery.jqGrid.min.js'/>"></script>
<link href="<c:url value='/jquery/jquery/jqgrid/ui.jqgrid.css'/>" rel="stylesheet" type="text/css" />

<!-- validator -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/validation/jquery.validate.min.js'/>"></script>

<!-- jsTree -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/jstree/jquery.jstree.js'/>"></script>

<style>
/* validate message box */
.error-label {
	position:absolute;
	z-index:3;
	height:auto;
	background-color:#fff;
	padding:3px 3px 0 3px !important;
	font-size:11px;
	color:#d93d3d;
	background: no-repeat 8px 3px;
}

/* validate message box */
.error-label label.error {
	border:solid #ababab 1px; 
	background:white;
	padding : 2px 8px 2px 8px;
	display:block !important;
	width	: 100%;
	text-align : left;
	margin-top:6px !important;

	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	
	-webkit-box-shadow: 0px 2px 10px rgba(50, 50, 50, 0.5);
	-moz-box-shadow: 0px 2px 10px rgba(50, 50, 50, 0.5);
	box-shadow: 0px 2px 10px rgba(50, 50, 50, 0.5);
}

.ui-jqgrid .ui-jqgrid-bdiv {position: relative; margin: 0em; padding:0; overflow: auto; text-align:left; overflow-x:hidden}

div.ui-widget-header {
	border : 0;
	background : none;
	color : none;
}

</style>

<script type="text/javascript">

/* 
 *	Validate Message
 */
$.validator.messages = {		
		required: "<spring:message code='board.message.required' text='필수 입력항목입니다.'/>",
		digits : "<spring:message code='board.message.input.only.number' text='숫자만 입력가능합니다.'/>",
		max : "<spring:message code='board.message.maxlength' text='최대 용량은 10485760byte를 넘을 수 없습니다.'/>"
}; 


/*
 * 	Initalize Grid Resize
 */
$(window).resize(function(e) {
	$essentialColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.72/10);
	$expandColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.72/10);
});

/*
 * Map for Duplicated Column Check
 */
function Map() {
	this.map = new Object();
};
Map.prototype = {  
    put : function(key, value){  
        this.map[key] = value;
    },
    containsKey : function(key){   
     return key in this.map;
    }
};

/*
 * Check Valid function (Used in input text : baseInfo, setupInfo, tableInfo)
 */
function checkValid(event, str, eventPlace) {
	var strReg1 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]|[~!@#$%^&*(){}-]|\+|\=|\'|\"|\<|\>|\[|\]|\:|\;|\,|\.|\?|\/|\\|\`|\s/;
	var strReg2 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]|[~!@#$%^&*(){}-]|\+|\=|\'|\"|\<|\>|\[|\]|\:|\;|\,|\?|\/|\\|\`|\s/;
	var strReg3 = /^\_|^\d/;	
	var strReg4 = /\.\./;
	
	if(eventPlace == 'boardName') {
		if(strReg1.test(str.value)) {
			alert('<spring:message code="board.message.input.only.englishandnumber" text="영문과 숫자만 입력가능합니다."/>');
			str.value = "";
			return str.value;
		}
		str.value = str.value;			
	} else if(eventPlace == 'packageName') {
		if(strReg2.test(str.value)) {
			alert('<spring:message code="board.message.input.only.englishandnumberandcomma" text="영문, 숫자, 마침표(.)만 입력가능합니다."/>');
			str.value = "";
			return str.value;
		}
		if(strReg4.test(str.value)) {
			alert('<spring:message code="board.message.input.only.one.separator" text="중북된 구분자가 존재합니다."/>');
			str.value = "";
			return str.value;
		}
		str.value = str.value;
	} else if(eventPlace == 'tableName') {
		str.value = str.value.toUpperCase();			
		if(strReg1.test(str.value)){
			alert('<spring:message code="board.message.input.only.englishandnumber" text="영문과 숫자만 입력가능합니다."/>');
			str.value = "";
			return str.value;
		}else if(strReg3.test(str.value) ) {
			alert('<spring:message code="board.message.firstcharacter.sholud.be.english" text="첫글자는 영문만 입력 가능합니다."/>');
			str.value = "";
			return str.value;
		}
		
	} else {
	}
}

/*
 * Validate check jQuery Util function (Used in JQgrid fieldName)
 */
(function($) {		
	var methods = {
			// Byte length check. utf-8 (DB) 기준. 숫자,영문자는 1byte, 그 외는 3byte
			maxbyte : function(value, param){
				var str = value;
		        var _byte = 0;
		  
		        if(str.length != 0)
		        {
		        	for (var i=0; i < str.length; i++) {
		        		var temp = str.charAt(i);
		           		 
		           		 // 아스키 코드를 비교함
		           		if(temp.charCodeAt(0) > 255)
		           		{
		           			_byte += 3;
			            }
		           		else
		           		{
		           			_byte ++;
		           		}
		        	}
				}
		        return _byte <= param;
			}
	};
	$.validateUtil = {
			isValid: function(ruleName, value, param) {
				if(methods[ruleName]){
					return methods[ruleName](value, param);
				} else {
					$.error('The rule ' + ruleName + ' does not exist in $.validateUtil.isValid');
				}
			}
	};
})(jQuery);

/*
 * expand ColInfo validation check 
 */
function expandColInfoValidCheck() {
	saveparameters = {
			"url" : "clientArray"
	};
	var i = 0;
	var columnIdArray = new Array();
	var saveYn = true;
	var ids = $expandColumn_grid.jqGrid('getDataIDs');
	$.each(ids, function() {
		$expandColumn_grid.jqGrid('saveRow', this, saveparameters);
	});
	$.each(ids, function() {
		var currentRowId = this;
		var rowData = $expandColumn_grid.jqGrid('getRowData', this);
		columnIdArray[i] = rowData.columnId;
		i++;
		if(rowData.columnId != '') {
			$.ajax({
				type 	: 'POST',
				url		: '<c:url value="/board/checkColumnId.do"/>',
				async	: false,
				data	: {'columnId' : rowData.columnId},
				success : function(data) {
					if(data.rtn) {
						alert('<spring:message code="board.message.cannotuse.columnid" text="사용할 수 없는 컬럼ID가 존재합니다. 다른 확장 컬럼명을 입력하시기 바랍니다."/>');
						$expandColumn_grid.setSelection(currentRowId, true);
						saveYn = false;
 						return false;
					}
				}
			});
			if(!saveYn){
				return false;
			}
		}
		if(rowData.columnId == ''){
			alert('<spring:message code="board.message.not.input.columnId.exist" text="미입력 테이블 컬럼명이 있습니다."/>');
			$expandColumn_grid.setSelection(currentRowId, true);
			saveYn = false;
			return false;
		}else if(rowData.fieldName.trim() == ''){
			alert('<spring:message code="board.message.not.input.field.exist" text="미입력 항목명이 있습니다."/>');
			$expandColumn_grid.setSelection(currentRowId, true);
			$('#'+currentRowId+'_'+'fieldName').focus();
			saveYn = false;
			return false;
		}else if(rowData.columnSize ==''){
			alert('<spring:message code="board.message.not.input.columnsize.exist" text="미입력 컬럼사이즈가 있습니다."/>');
			$expandColumn_grid.setSelection(currentRowId, true);
			$('#'+currentRowId+'_'+'columnSize').focus();
			saveYn = false;
			return false;
		}else if(rowData.columnSize == 0){
			alert('<spring:message code="board.message.columnsize.cannotinput.zero" text="컬럼길이는 0을 입력할 수 없습니다."/>');
			$expandColumn_grid.setSelection(currentRowId, true);
			$('#'+currentRowId+'_'+'columnSize').focus();
			saveYn = false;
			return false;
		}
	});
	if(!saveYn){
		return false;
	}else{
		if(columnIdArray.length == 1 || columnIdArray.length == 0){
			return true;
		}else if(!sameColumnIdCheck(columnIdArray, ids)){
			return true;
		}else{
			return false;
		}
	}
}

/*
 *	Validate Message UI Set
 */
function setErrorPlacement(error, element){
	element.parent().css('position', 'relative');
	error.addClass('error-label');
    var elementRelativePosition = element.position();
    var top = elementRelativePosition.top + element.outerHeight() - 3;
    var left = elementRelativePosition.left;
    var text = error.text();

    error.insertAfter(element);
	    
    error.css('top', top );
    error.css('left', left); 
}

/*
 * Delete button click event in expandedColumn_grid  
 */
function fncClickDelete(selectedRowId) {
	$expandColumn_grid.delRowData(selectedRowId);
}

/*
 * Same columnId check
 */
function sameColumnIdCheck(columnIdArray, ids) {

 	for(var i = 0; i < columnIdArray.length-1; i++){
 		var rowColumnId = columnIdArray[i];
 		 for(var j = i+1; j < columnIdArray.length; j++){
 			 if(rowColumnId == columnIdArray[j]){
 				alert('<spring:message code="board.message.equalcolumn.exist" text="동일한 컬럼명이 존재합니다."/>');
 				$expandColumn_grid.setSelection(ids[j], true);
 				$expandColumn_grid.setSelection(ids[i], true);
 				$('#'+ids[i]+'_'+'columnId').focus();
 				return true;
 			} 
 		}
 	}
	return false;
}

/*
 * Refresh button click event
 */
function refresh(filePath, packageName, boardName) {
	var start = filePath.indexOf("templates")+"templates".length+1;
	var end = filePath.length;
	var outputFilePath = filePath.substring(start, end);
		outputFilePath = outputFilePath.replace(/SampleBoard/gi, boardName.charAt(0).toUpperCase() + boardName.slice(1));
		var refreshPackageName = packageName.replace(/\./gi, SEPARATOR);
	if(filePath.indexOf('\.java') >= 0) {
 		outputFilePath = outputFilePath.replace('board', refreshPackageName + SEPARATOR + boardName); 
 		if(filePath.indexOf('comment') >=0) {
 	 		outputFilePath = outputFilePath.replace('comment', refreshPackageName + SEPARATOR + 'comment'); 
 		} else if((filePath.indexOf('attachfile') >=0)) {
 	 		outputFilePath = outputFilePath.replace('attachfile', refreshPackageName + SEPARATOR + 'attachfile'); 
 		}
	}  else {
 		outputFilePath = outputFilePath.replace(/board/gi, boardName); 
	}
	return outputFilePath;
}


/*
 * Used date in expandColumn_grid
 */
var newRowNum = 0;
var $expandColumn_grid;
var $essentialColumn_grid;
var SEPARATOR='\<%=System.getProperty("file.separator")%>';
$(document).ready(function() {
	/* 
	 *	Initialization perv button hide
	 */
	$("button.prev").hide();
	$("button.save").hide();
	/* 
	 *	Initialization tabs set
	 */
	$("#tabs").tabs({
		disabled : [0,1,2,3],
		select : function(event, ui){
			if(ui.index == 0 ) {
				$('button.prev').hide();
				$('button.next').show();	
				$('button.save').hide();	
			} else if(ui.index == 3) {
				$('button.prev').show();	
				$('button.next').hide();
				$('button.save').show();
			} else if(ui.index == 1) {
	    		$('#listViewInfoTab').children().remove();
	    		$('#formViewInfoTab').children().remove();
				$('button.prev').show();
				$('button.next').show();
				$('button.save').hide();	
			} else if (ui.index == 2) {
				$('button.prev').show();
				$('button.next').show();
				$('button.save').hide();
			} else {
				
			}
			
		}
	});
	
	/*
	 * Initialization Radio button set
	 */
	$("#useCommentY").attr("checked", true);
	$("#useAnonymousN").attr("checked", true);
	$("#listType").attr("checked", true);
	$("#useAttachFileN").attr("checked", true);

	/*
	 *	Initialization tooltip(Dialog)
	 */
	$('#tooltip').dialog({
		autoOpen : false,
		position : {my : "center", at : "center"},
		minHeight : 100
	}).dialog("widget").find(".ui-dialog-title").hide();
	
	/*
	 * Initialization Sortable Column set
	 */
	$('#listViewInfoTab').sortable({});
	
	/*
	 * Initialization Sortable Column set
	 */
	$('#formViewInfoTab').sortable({});
	
	/*
	 * Initialization Sortable Column set
	 */
	$('#filePaths').hide();

	/*
	 *	Check Duplicated Column 
	 */
	var hasDuplicatedColumn = function() {
		var duplicated = false;		
		var map = new Map();

		$('select' , $('#formViewInfoTab')).each(function(){
			var selectVal = $(this).children(":selected").attr("id");
			if(map.containsKey(selectVal)){
				duplicated = true;
				return false; //each out
			}else {
				map.put(selectVal, selectVal);	
			}
		});
		
		return duplicated;
	};
	
	/*
	 *	essential Grid
	 */
	$essentialColumn_grid = $("#essentialColumn_grid");
	$('#essentialColumn_grid').jqGrid({
		url:'<c:url value="/board/columnList.do"/>',   
	    mtype:'POST',
	    datatype: "json",
	    height: '100%',
	    autowidth: true,
        jsonReader: {repeatitems: false},
        colNames:['<spring:message code="board.grid.columnid" text="컬럼ID"/>', '<spring:message code="board.grid.fieldname" text="필드명"/>', '<spring:message code="board.grid.columnsize" text="컬럼사이즈"/>', '<spring:message code="board.grid.columntype" text="컬럼타입"/>', '<spring:message code="board.grid.essential" text="필수여부"/>', '<spring:message code="board.grid.usescreen" text="표시여부"/>', '<spring:message code="board.grid.list" text="목록화면표시"/>', '<spring:message code="board.grid.form" text="등록화면표시"/>', '<spring:message code="board.grid.listorder" text="목록화면순서"/>', '<spring:message code="board.grid.vieworder" text="등록화면순서"/>'],
    	colModel:[{name : 'columnId', index:'columnId', width:40, align:"center"}, 
    	          {name : 'fieldName', index:'fieldName', sorttype:"text", editable:true, width:40, align:"center",
  					editoptions:{
						dataEvents	:	[{
											type  :  'keyup',
											fn	  :  function(e) {
												var str = $(e.target).val();
												if(!$.validateUtil.isValid('maxbyte', str, 150)) {
													alert('<spring:message code="board.message.cannot.more.input" text="더 이상 입력할 수 없습니다."/>');
													$(e.target).val('');
													$(e.target).val(PREV);
													
												} else {
													PREV = str;
												}
												
											}
										 }]
					}    		
    	          }, 
    	          {name : 'columnSize', index:'columnSize', width:20, align:"center"}, 
    	          {name : 'columnType', index:'columnType', width:40, align:"center"},
    	          {name : 'isEssential', index:'isEssential', align:"center", hidden:true},
    	          {name : 'useScreen', index:'useScreen', align:"center", hidden:true},
    	          {name : 'useList', index:'useList', align:"center", hidden:true},
    	          {name : 'useView', index:'useView', align:"center", hidden:true},
				  {name : "listOrder", index:"listOrder", align:"center", hidden:true},
    			  {name : "viewOrder", index:"viewOrder", align:"center", hidden:true}
    	],
        sortable : false,
        gridComplete : function() {
	    	var ids = $('#essentialColumn_grid').jqGrid('getDataIDs');
			$.each(ids, function(i, rowid){
				var useScreen = $('#essentialColumn_grid').getCell(rowid, 'useScreen');
				if(useScreen == 0) {
					$("#" + rowid).hide();
				}
				$('#essentialColumn_grid').jqGrid('editRow',this, true);
			});
        }
	});
	
	/*
	 *	expand Grid
	 */
	$expandColumn_grid = $("#expandColumn_grid");
	$('#expandColumn_grid').jqGrid({
		editUrl : 'clientArray',
	    mtype:'POST',
	    datatype: 'json',
	    height: '150',
	    autowidth: true,
	    rowNum : '5',
	    jsonReader: {repeatitems: false},
	    colNames:['<spring:message code="board.grid.columnid" text="컬럼ID"/>',
	              '<spring:message code="board.grid.fieldname" text="필드명"/>',
	              '<spring:message code="board.grid.columnsize" text="컬럼사이즈"/>',
	              '<spring:message code="board.grid.columntype" text="컬럼타입"/>',
	              '<spring:message code="board.grid.essential" text="필수여부"/>',
	              '<spring:message code="board.grid.list" text="목록화면표시"/>',
	              '<spring:message code="board.grid.form" text="등록화면표시"/>',
	              '<spring:message code="board.grid.delete" text="삭제"/>',
	              '<spring:message code="board.grid.listorder" text="목록화면순서"/>',
	              '<spring:message code="board.grid.vieworder" text="등록화면순서"/>'
	              ],
	    colModel:[
			{name:"columnId",index:"columnId", width:20, editable:true,
				edittype:"text",
				editoptions:{
					maxlength	:	'30',
					dataEvents	:	[{
										type  :  'keyup',
										fn	  :  function(e) {
											
											var str = $(e.target).val();
											var strReg1 = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]|[~!@#$%^&*(){}-]|\+|\=|\'|\"|\<|\>|\[|\]|\:|\;|\,|\.|\?|\/|\\|\`|\s/;
											var strReg2 = /^\_|^\d/;
											
											$(e.target).val(str.toUpperCase());
											
											if(strReg1.test(str)){
												alert('<spring:message code="board.message.input.only.englishandnumber" text="영문과 숫자만 입력가능합니다."/>');
												str = "";
												$(e.target).val(str);
											}else if(strReg2.test(str) ) {
												alert('<spring:message code="board.message.firstcharacter.sholud.be.english" text="첫글자는 영문만 입력 가능합니다."/>');
												str = "";
												$(e.target).val(str);
											}
										}
									 }]   
					}
			},
		   	{name:"fieldName",index:"fieldName", width:20, editable:true,
				edittype:"text",
				editoptions:{
					dataEvents	:	[{
										type  :  'keyup',
										fn	  :  function(e) {
											var str = $(e.target).val();
											if(!$.validateUtil.isValid('maxbyte', str, 150)) {
												alert('<spring:message code="board.message.cannot.more.input" text="더 이상 입력할 수 없습니다."/>');
												$(e.target).val('');
												$(e.target).val(PREV);
												
											} else {
												PREV = str;
											}
										}
									 }]
				}
			},
			{name:"columnSize",index:"columnSize", width:17, editable:true,
				edittype:"text",
				editoptions:{
					maxlength	:	'4',
					dataEvents	:	[{
										type  :  'keyup',
										fn	  :  function(e) {
											
											var str = $(e.target).val();
											var strReg = /^[0-9]*$/;
											
											if(!strReg.test(str)) {
												alert('<spring:message code="board.message.should.input.number" text="숫자만 입력가능합니다."/>');
												str = "";
												$(e.target).val(str);
											}else if(str > 4000) {
												alert('<spring:message code="board.message.inputrange.is.onetofourthousand" text="입력가능한 범위는 1부터 4000까지입니다."/>');
												str = "";
												$(e.target).val(str);
											}
										}
									 }]
				}
		   	},
		   	{name:"columnAttribute",index:"columnAttribute", width:20, editable:true, formatter:"select" , edittype: "select", align:"center",
		   		editoptions:{
	   				value		: '1:<spring:message code="board.onerow" text="텍스트(한 줄)"/>;2:<spring:message code="board.moretworow" text="텍스트(여러 줄)"/>',
	   				dataEvents	:  [
	   							{	type  : 'focusout',
	   								fn    :  function(e) {
	   									isSelect = false;
	   								}	
	   							}]
		   		}
	 		},
	 		{name:"isEssential",index:"isEssential",width:10, align:"center", edittype:"checkbox",formatter:"checkbox", formatoptions:{disabled:false}, sortable:false,editoptions: {value:"1:0"}},
		   	{name:"useList",index:"useList",width:12, align:"center", edittype:"checkbox", editoptions: {value:"1:0"},formatter:"checkbox", formatoptions:{disabled:false}, sortable:false},
		   	{name:"useView",index:"useView",width:12, align:"center", edittype:"checkbox", editoptions: {value:"1:0"},formatter:"checkbox", formatoptions:{disabled:false}, sortable:false},
		   	{name:"deleteId",index:"deleteId",width:13, align:"center"},
		   	{name:"listOrder",index:"listOrder", align:"center", hidden:true},
		   	{name:"viewOrder",index:"viewOrder", align:"center", hidden:true}
		],
	    loadComplete : function(xhr) {
	    },
		loadError: function(xhr,st,err) {
		},
		onSelectRow: function(id) {	
			var $checkbox = jQuery(this).find('#'+id+' input[type=checkbox]');
			jQuery(this).find('#'+id+' input[type=checkbox]').click(function(e) {
				if($checkbox.prop('checked')) {
					$checkbox.parent().next().next().children().attr("checked", true);	
					$checkbox.parent().next().next().children().attr("disabled", true);
				} else {
					$checkbox.parent().next().next().children().attr("disabled", false);
				}					
			});
			$('#expandColumn_grid').jqGrid('editRow', id, false);
		},
		gridComplete: function(){
			var ids = $('#expandColumn_grid').jqGrid('getDataIDs');
			for(var i=0; i < ids.length; i++){
				var linkDelete = "<span class='button default icon delete'><a id='iconDelete" + i + "' href='javascript:fncClickDelete(\"" + ids[i] + "\");'><spring:message code='board.button.delete' text='삭제'/></a></span>";
				$expandColumn_grid.jqGrid('setRowData', ids[i], { deleteId : linkDelete });
			}	
		}
	});	
	
	/*
	 * Initialization jQgrid width set
	 */
	$essentialColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.72/10);
	$expandColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.72/10);
    
    /*
     *	baseInfoForm validate define
     */
	$('#baseInfoForm').validate({
		errorPlacement : function(error, element){
			setErrorPlacement(error, element);
		},
		wrapper : 'div'		
	});
    
    /*
     *	setupInfoForm validate define
     */
	$('#setupInfoForm').validate({
		errorPlacement : function(error, element){
			setErrorPlacement(error, element);
		},
		wrapper : 'div'		
	});
    
    /*
     *	tableInfoForm validate define
     */
	$('#tableInfoForm').validate({
		errorPlacement : function(error, element){
			setErrorPlacement(error, element);
		},
		wrapper : 'div'		
	});

	/*
	 *	input text sub set false
	 */
	$('input[type="text"]').keypress(function (e) {
		if (e.which == 13){
			return false;			
		}
	});
	
    /*
     *	baseInfoForm submit set false
     */
    $("#baseInfoForm").submit(function(e) {
    	return false;
    });
    
    /*
     *	setupInfoForm submit set false
     */
    $("#setupInfoForm").submit(function(e) {
    	return false;
    });
    
    /*
     *	tableInfoForm submit set false
     */
    $("#tableInfoForm").submit(function(e) {
    	return false;
    });
    
	/*
	 * boardType Check event (if check blogType, Can not select useCommet as Y)
	 */
	$('#blogType').click(function () {
		$("#useCommentN").attr("checked", true);
		$("#useCommentN").attr("disabled", true);
		$("#useCommentY").attr("disabled", true);
	});
	$('#listType').click(function () {
		$("#useCommentN").attr("disabled", false);
		$("#useCommentY").attr("disabled", false);
	});

    /*
     *	Next button Click event
     */
    $('button.next').click(function(){
    	if($('#tabs').tabs('option', 'selected') == 0) {
    		if($('#setupInfoForm').valid() & $('#baseInfoForm').valid()) {
				$('#tooltip').dialog("close");
    			if($('#blogType').is(":checked")) {
        			$expandColumn_grid.jqGrid('hideCol', 'useList');
    			} else {
        			$expandColumn_grid.jqGrid('showCol', 'useList');
    			}
    			$essentialColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.52/10);
    			$expandColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.52/10);
      	 		$("#tabs").tabs("enable", $('#tabs').tabs('option', 'selected') + 1);
       		 	$("#tabs").tabs("select", $('#tabs').tabs('option', 'selected') + 1);
      	 		$("#tabs").tabs("disable", $('#tabs').tabs('option', 'selected') - 1);
    		}    		
    	} else if($('#tabs').tabs('option', 'selected') == 1) {
    		if($('#tableInfoForm').valid() & expandColInfoValidCheck()) {
				$('#tooltip').dialog("close");
      			$.each($essentialColumn_grid.jqGrid('getDataIDs'), function(i, rowid) {
      				jQuery("#essentialColumn_grid").jqGrid('saveRow', this, false,'clientArray');
      			});
      			
      			//set ArrangeUi listView 
      			var listUiColumnIdLists = new Array();
				var listUiFieldNameLists = new Array();
    			var listRowNum = 0;
    			var essential_rowDatas = $essentialColumn_grid.jqGrid('getRowData');	
    			$.each(essential_rowDatas, function(i){
    				if(this.fieldName != '<spring:message code="board.postid" text="게시글ID"/>' & this.fieldName !='<spring:message code="board.boardid" text="게시판ID"/>') {
    					if(this.useList == 1) {
    						listUiColumnIdLists[listRowNum] = this.columnId;
    						listUiFieldNameLists[listRowNum] = this.fieldName; 
    						listRowNum++;
    					}
    				}
    			});
    			var expand_rowDatas = $expandColumn_grid.jqGrid('getRowData');	
    			$.each(expand_rowDatas, function(i){
    				if(this.useList == 1) {
    					listUiColumnIdLists[listRowNum] = this.columnId;
    					listUiFieldNameLists[listRowNum] = this.fieldName; 
    					listRowNum++;
    				}
    			});
    			var listViewHtml ="";
    			if($('#blogType').is(":checked")) {
       				listViewHtml = "<div class='description' style='padding-bottom:15px;'><FONT SIZE='2'><br/><b><spring:message code='board.info.arrangeui' text='※ 게시물 종류를 블로그로 선택하여 화면구성(목록)을 설정할 수 없습니다.'/></b></FONT></div>";
    			} else {
        			for(var i =0; i<listUiColumnIdLists.length; i++) {
        				listViewHtml += "<div id='" + listUiColumnIdLists[i] + "' style='float:left; width:" + (100/listUiColumnIdLists.length -2) + "%; margin:0px 5px 0px 5px; height:40px; text-align:center; border:solid #e5e5e5 1px; cursor:pointer;line-height:40px;'>" + listUiFieldNameLists[i] +" ["+ listUiColumnIdLists[i] +"]"+ "</div>"; 									
        			}		
       			}			
    			$('#listViewInfoTab').append(listViewHtml);
    			
    			//set ArrangeUi FormView
      			var viewUiColumnIdLists = new Array();
				var viewUiFieldNameLists = new Array();
    			var viewRowNum = 0;
    			var essential_rowDatas = $essentialColumn_grid.jqGrid('getRowData');	
    			$.each(essential_rowDatas, function(i){
    				if(this.fieldName != '<spring:message code="board.postid" text="게시글ID"/>' & this.fieldName !='<spring:message code="board.boardid" text="게시판ID"/>') {
        				if(this.useView == 1) {
        					viewUiColumnIdLists[viewRowNum] = this.columnId;
        					viewUiFieldNameLists[viewRowNum] = this.fieldName; 
        					viewRowNum++;
        				}	
    				}
    			});
    			var expand_rowDatas = $expandColumn_grid.jqGrid('getRowData');	
    			$.each(expand_rowDatas, function(i){
    				if(this.useView == 1) {
    					viewUiColumnIdLists[viewRowNum] = this.columnId;
    					viewUiFieldNameLists[viewRowNum] = this.fieldName; 
    					viewRowNum++;
    				}
    			});
    			var formViewHtml ="";
				var formViewOrder = 0;
    			for(var i =0; i<viewUiColumnIdLists.length; i++) {
        			formViewHtml += "<div style='border:solid #e5e5e5 1px;margin:10px 10px 10px 10px;height:25px;line-height:25px;'>&nbsp&nbsp";
        			formViewHtml += "<select id='" + "formUiOrder" + i + "' style='width:250px'>";
        			for(var j = 0; j<viewUiFieldNameLists.length; j++) {
        				formViewHtml += "<option id=" + viewUiColumnIdLists[j];
        				if(j==formViewOrder) {
            				formViewHtml += " selected";	
        				}
        				formViewHtml += ">";
        				formViewHtml += viewUiFieldNameLists[j] + " [" + viewUiColumnIdLists[j] + "]" + "</option>";
        			}
        			formViewHtml += "</select>";
        			formViewHtml += "</div>";
        			formViewOrder++;
    			}
    			$('#formViewInfoTab').append(formViewHtml);    			
    			
      	 		$("#tabs").tabs("enable", $('#tabs').tabs('option', 'selected') + 1);
       		 	$("#tabs").tabs("select", $('#tabs').tabs('option', 'selected') + 1);
      	 		$("#tabs").tabs("disable", $('#tabs').tabs('option', 'selected') - 1);
    		}
    	} else if($('#tabs').tabs('option', 'selected') == 2) {
    		if(hasDuplicatedColumn()) {
    			alert('<spring:message code="board.message.equalfieldname.exist" text="동일한 필드가 존재합니다."/>');
    		} else {
      	 		$("#tabs").tabs("enable", $('#tabs').tabs('option', 'selected') + 1);
       		 	$("#tabs").tabs("select", $('#tabs').tabs('option', 'selected') + 1);
      	 		$("#tabs").tabs("disable", $('#tabs').tabs('option', 'selected') - 1);
    		}
    	} else {
  	 		$("#tabs").tabs("enable", $('#tabs').tabs('option', 'selected') + 1);
   		 	$("#tabs").tabs("select", $('#tabs').tabs('option', 'selected') + 1);
  	 		$("#tabs").tabs("disable", $('#tabs').tabs('option', 'selected') - 1);    		
    	}
    });
    
    /*
     *	Prev button Click event
     */
    $('button.prev').click(function(){
    	if($('#tabs').tabs('option', 'selected') == 2) {
    		$essentialColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.52/10);
    		$expandColumn_grid.jqGrid('setGridWidth', ($('#tabs').width())*9.52/10);
    		var ids = $('#essentialColumn_grid').jqGrid('getDataIDs');
    		$.each(ids, function(i, rowid){
    			var useScreen = $('#essentialColumn_grid').getCell(rowid, 'useScreen');
    			if(useScreen == 0) {
    				$("#" + rowid).hide();
    			}
    			$('#essentialColumn_grid').jqGrid('editRow',this, true);
    		});
    	} 
		$('#tooltip').dialog("close");
 		$("#tabs").tabs("enable", $('#tabs').tabs('option', 'selected') - 1);
       	$("#tabs").tabs("select", $('#tabs').tabs('option', 'selected') - 1);    
		$("#tabs").tabs("disable", $('#tabs').tabs('option', 'selected') + 1);
    });
    
    /*
     *	Save button Click event
     */
    $('button.save').click(function(){
		var url = '<c:url value="/board/generate.do"/>';
		if(hasDuplicatedColumn()) {
			alert('<spring:message code="board.message.equalcolumn.exist" text="동일한 컬럼명이 존재합니다."/>');
			return false;
		}
  	 	if($('#baseInfoForm').valid() & $('#setupInfoForm').valid() & $('#tableInfoForm').valid() & expandColInfoValidCheck()) {
  			$.each($essentialColumn_grid.jqGrid('getDataIDs'), function(i, rowid) {
  				jQuery("#essentialColumn_grid").jqGrid('saveRow', this, false,'clientArray');
  			});
  			
  			/*
  			 *	Array create
  			 */
  	 		var columnIdArray = new Array();
			var fieldNameArray = new Array();
			var columnSizeArray = new Array();
  	 		var columnTypeArray = new Array();
			var columnAttributeArray = new Array();
			var columnUseListArray = new Array();
			var columnUseViewArray = new Array();
			var columnuseScreenArray = new Array();
			var columnIsEssentialArray = new Array();
			var columnIsExpandedArray = new Array();
			var columnListOrderArray = new Array();
			var columnViewOrderArray = new Array();
			
			var rowNum = 0;
			var essential_rowDatas = $essentialColumn_grid.jqGrid('getRowData');			
			$.each(essential_rowDatas, function(i){
				columnIdArray[i] = this.columnId;
				fieldNameArray[i] = this.fieldName;
				columnSizeArray[i] = this.columnSize;
				columnTypeArray[i] = this.columnType;
				columnAttributeArray[i] = "";
				columnUseListArray[i] = this.useList;
				columnUseViewArray[i] = this.useView;
				columnuseScreenArray[i] = this.useScreen;
				columnIsEssentialArray[i] = this.isEssential;
				columnIsExpandedArray[i] = "0";
				columnListOrderArray[i] = "";
				columnViewOrderArray[i] = "";
				rowNum++;
			});
			
			var expand_rowDatas = $expandColumn_grid.jqGrid('getRowData');
			$.each(expand_rowDatas, function(i){
				columnIdArray[rowNum + i] = this.columnId;
				fieldNameArray[rowNum + i] = this.fieldName;
				columnSizeArray[rowNum + i] = this.columnSize;
				columnTypeArray[rowNum + i] = "VARCHAR";
				columnAttributeArray[rowNum + i] = this.columnAttribute;
				columnUseListArray[rowNum + i] = this.useList;
				columnUseViewArray[rowNum + i] = this.useView;
				columnuseScreenArray[rowNum + i] = "";
				columnIsEssentialArray[rowNum + i] = this.isEssential;
				columnIsExpandedArray[rowNum + i] = "1";
				columnListOrderArray[rowNum + i] = "";
				columnViewOrderArray[rowNum + i] = "";
			});
			
  			/*
  			 *	Set listOrder 
  		 	 */
  			$('#listViewInfoTab').children().each(function(index){
				var listOrderId = $(this).attr('id');
  				for(var i=0; i < columnIdArray.length; i++) {
  					if(columnIdArray[i] == listOrderId) {
  						columnListOrderArray[i] = index;
  					}
  				}
 			});

  			/*
  			 *	Set viewOrder 
  		 	 */
   			$('#formViewInfoTab').children().each(function(index){
				var viewOrderFieldName = $(this).children().children(':selected').attr('id');
  				for(var i=0; i < columnIdArray.length; i++) {
  					if(columnIdArray[i] == viewOrderFieldName) {
  						columnViewOrderArray[i] = index;
  					}
  				}
 			});
  			
			$.post(url,
				{'boardTitle' : $('#boardTitle').val(),
				 'boardType' : $('input[name="boardType"]:checked').val(),
				 'useComment' : $('input[name="useComment"]:checked').val(),
			 	 'useAnonymous' : $('input[name="useAnonymous"]:checked').val(),
			 	 'useAttachFile' : $('input[name="useAttachFile"]:checked').val(),
		 		 'boardName' : $('#boardName').val(),
				 'packageName' : $('#packageName').val(),
				 'tableName' : $('#tableName').val(),
				 'columnId[]'		: columnIdArray,
				 'fieldName[]'		: fieldNameArray,
				 'columnSize[]'		: columnSizeArray,
				 'columnType[]'		: columnTypeArray,
				 'columnAttribute[]'	: columnAttributeArray,
				 'useList[]'			: columnUseListArray,
				 'useView[]'		: columnUseViewArray,
				 'useScreen[]'		: columnuseScreenArray,
				 'isEssential[]'	: columnIsEssentialArray,
				 'isExpanded[]'		: columnIsExpandedArray,
				 'listOrder[]'		: columnListOrderArray,
				 'viewOrder[]'		: columnViewOrderArray
				}, function(data) {
					var urlAddress ='';
					if($('#blogType').is(":checked")) {
						urlAddress += $('#boardName').val() + '/' + 'blogView.do';
					} else {
						urlAddress += $('#boardName').val() + '/' + 'listView.do';
					}
					alert('<spring:message code="board.message.created.board" text="게시판이 생성되었습니다."/>' + '\n' + '<spring:message code="board.requestname" text="요청명"/> ' + urlAddress + '<spring:message code="board.message.allow.access" text="로 접근할 수 있습니다."/>');
					var url = '<c:url value="/board/form.do"/>';
					self.location.href = url;
			});
 		}
    });     
    
    /*
     * AddRow button Click event
     */
	$('button.addRow').click(function(e){
		var preFix = "RowNum_";
		var ids = $expandColumn_grid.jqGrid('getDataIDs');
		newRowNum += ids.length;
		var newRowId="";
		if(ids == null || ids.length == 0){
			newRowId = preFix + "1";
		} else {
			newRowNum ++;
			newRowId = preFix + newRowNum;
		}
		var parameters = {
				'rowID'			: newRowId,
				'initdata'		: {},
				'position'		: "last",
				'useDefValues'	: false,
				'useFormatter'	: false,
				'addRowParams'	: {extaraparam:{}}
		};
		$expandColumn_grid.jqGrid('addRow', parameters);
	});
    
    /*
     * Refresh button Click event
     */
    $('button.refresh').click(function(e) {
    	if($('#setupInfoForm').valid()) {
    		$('#filePaths').children().each(function(index) {
    			$(this).show();
    			$(this).children().text($(this).attr('id'));
    			var filePath = $(this).children().text();
    			var refreshFilePath = refresh(filePath, $('#packageName').val(), $('#boardName').val());
    			$(this).children().text(refreshFilePath);
    			if($('#blogType').is(":checked")) {
    				if($(this).children().text().indexOf('\\view.jsp') >=0 || $(this).children().text().indexOf('\\list.jsp') >=0) {
        				$(this).hide();	
    				} else {
    					$(this).show();
    				}
    			} else if($('#listType').is(":checked")) {
    				if($(this).children().text().indexOf('\\bloglist.jsp') >=0) {
    					$(this).hide();
    				}
    			} else {
    				
    			}
    			if($('#useCommentN').is(":checked")) {
    				if($(this).children().text().indexOf('comment') >=0) {
        				$(this).hide();	
    				}
    			} else {
    				
    			}
    			if($('#useAttachFileN').is(":checked")) {
    				if($(this).children().text().indexOf('postattachfile') >=0 || $(this).children().text().indexOf('PostAttachFile') >=0) {
        				$(this).hide();	
    				}
    			} else {
    			}
    		});
    		$('#filePaths').show();
    	}
    });    
    
	/*
	 *	helpContents click event
	 */
	$('button.help').click(function() {
		var boardNameHelp = '<spring:message code="board.message.help.is.boardname" text="게시판 화면 제목이 됩니다. <br/>예시) 자유게시판, 공지사항"/>';
		var boardTypeHelp = '<spring:message code="board.message.help.is.boardtype" text="게시판의 종류를 설정합니다."/>';
		var useCommentHelp = '<spring:message code="board.message.help.is.usecomment" text="블로그형의 게시판의 경우 댓글을 사용하실 수 없습니다."/>';
		var useAnonymousHelp = '<spring:message code="board.message.help.is.useanonymous" text="익명 여부를 사용하면 등록자에 관한 정보가 출력되지 않습니다."/>';
		var useAttachFileHelp = '<spring:message code="board.message.help.is.useattachfile" text="파일 첨부 기능 설정 시 게시글에 파일 첨부가 가능합니다. 최대 첨부 용량은 fileupload.properties 파일에서 수정할 수 있습니다."/>';
		var packageNameHelp = '<spring:message code="board.message.help.is.packagepath" text="생성되는 java 파일의 설치 패키지 경로를 설정합니다."/>';
		var serviceNameHelp = '<spring:message code="board.message.help.is.servicename" text="논리적인 게시판 이름(영문 소문자로 권장)을 설정합니다. 서비스 명 및 폴더명이 됩니다. <br/>예시) xxx/list.jsp, XxxService.java"/>';
		var tableNameHelp = '<spring:message code="board.message.help.is.tablename" text="실제 생성되는 게시판이 사용하는 DB내에 생성되는 TABLE명을 정의합니다.  <br/>예시) NOTICE_BOARD"/>';
		var essentialColumnHelp = '<spring:message code="board.message.help.is.essentialcolumn" text="게시판에서 기본적으로 사용하게 되는 필드의 정보입니다. 필드명을 수정할 수 있으며, 기본 컬럼에 대한 정보는 현 프로젝트/src/main/resources/board/board.columns.definition.xml에 정의되어 있습니다.<br/>(새로운 필드를 기본 컬럼으로 추가 할 수 있으나 기본적으로 정의되어 있는 컬럼에 대한 정보를 수정하는 것은 권고하지 않음)"/>';
		var expandColumnHelp = '<spring:message code="board.message.help.is.expandcolumn" text="게시판에서 기본 컬럼 이외에 추가적으로 사용할 컬럼(필드)에 대해 정의합니다."/>';
		var selectHelp = '';
		$( "#tooltip" ).dialog( "option", "hieght", 100 );
		switch($(this).attr('id')) {
			case 'boardNameHelp': 
				selectHelp = boardNameHelp;
				$( "#tooltip" ).dialog( "option", "width", 300 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#baseInfoForm")});
				break;
			case 'boardTypeHelp':
				selectHelp = boardTypeHelp;
				$( "#tooltip" ).dialog( "option", "width", 300 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#baseInfoForm")});
				break;
			case 'useCommentHelp':
				selectHelp = useCommentHelp;
				$( "#tooltip" ).dialog( "option", "width", 400 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#baseInfoForm")});
				break;
			case 'useAnonymousHelp': 
				selectHelp = useAnonymousHelp;
				$( "#tooltip" ).dialog( "option", "width", 420 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#baseInfoForm")});
				break;
			case 'useAttachFileHelp': 
				selectHelp = useAttachFileHelp;
				$( "#tooltip" ).dialog( "option", "width", 400 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#baseInfoForm")});
				break;
			case 'packageNameHelp': 
				selectHelp = packageNameHelp;
				$( "#tooltip" ).dialog( "option", "width", 400 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#setupInfoForm")});
				break;
			case 'serviceNameHelp': 
				selectHelp = serviceNameHelp;
				$( "#tooltip" ).dialog( "option", "width", 600 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#setupInfoForm")});
				break;
			case 'tableNameHelp': 
				selectHelp = tableNameHelp;
				$( "#tooltip" ).dialog( "option", "width", 500 );
				$( "#tooltip" ).dialog( "option", "position", {of: $("#tableInfoForm")});
				break;
			case 'essentialColumnHelp': 
				selectHelp = essentialColumnHelp;
				$( "#tooltip" ).dialog( "option", "width", 670 );
				$( "#tooltip" ).dialog( "option", "position", {of: window});
				break;
			case 'expandColumnHelp': 
				selectHelp = expandColumnHelp;
				$( "#tooltip" ).dialog( "option", "width", 550 );
				$( "#tooltip" ).dialog( "option", "position", {of: window});
				break;
		}
		var addHtml = '<span>' + selectHelp + '</span>';
		$('#tooltip').children().remove();
		$('#tooltip').append(addHtml);	
		$('#tooltip').dialog("open");
		return false;
	});

});
</script>
<div id="container">
  	<div class="cont_top">
  		<h2><spring:message code='board.title.main' text='게시판 생성'/></h2>
    </div>
	<div id="tabs" style="font-size: 1.0em;">
		<ul>
			<li id="tab_boardInfo"><a href="#boardInfoTab"><spring:message code='board.tabs.baseinfo' text='기본정보'/></a></li>
			<li id="tab_columnInfo"><a href="#columnInfoTab"><spring:message code='board.tabs.columninfo' text='컬럼정보'/></a></li>
			<li id="tab_formViewInfo"><a href="#formViewInfoTab"><spring:message code='board.tabs.formviewinfo' text='화면구성(등록)'/></a></li>
			<li id="tab_listViewInfo"><a href="#listViewInfoTab"><spring:message code='board.tabs.listviewinfo' text='화면구성(목록)'/></a></li>
		</ul>
		<div id="boardInfoTab">
			<div class="description" style="padding-bottom:15px;">
				<FONT SIZE="2">
					<br/><b><spring:message code='board.info.base' text='※ 게시판 이름 및 게시판에 대한 기본정보를 설정합니다. '/></b> 
				</FONT>
			</div>
			<div class="title" style="border-bottom:#eaeaea solid 1px;">
				<img src="<c:url value='/sample/images/ico_check_color.gif'/>"/>
				<FONT SIZE="2">
					<b><spring:message code='board.title.baseinfo' text='기본정보'/></b>
				</FONT>
				<hr />			<br/>
			</div>
			<div class="view" style="margin:10px 0 10px 0">
				<form:form modelAttribute="boardInfo" id="baseInfoForm" name="baseInfoForm" method="post" >
					<table id="baseInfo" cellpadding="5" cellspacing="1">
						<colgroup>
							<col width="20%">
							<col width="30%">
							<col width="20%">
							<col width="30%">							
						</colgroup>
						<tbody>
							<tr>
								<th style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.boardname' text='게시판명'/></FONT>
								</th>
								<td style="background-color:#ffffff; border:1px solid #8B8878;vertical-align:middle;">
									<form:input path="boardTitle" cssClass="required" style="width:200px;"/>
     	    						<button id="boardNameHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>								
								</td>
								<th style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.boardtype' text='게시물 종류'/></FONT>
								</th>
								<td style="background-color:#ffffff; border:1px solid #8B8878;">
									<form:radiobutton path="boardType" value="L" id="listType" name="boardType"/><spring:message code='board.listtype' text='리스트형'/>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<form:radiobutton path="boardType" value="B" id="blogType" name="boardType"/><spring:message code='board.blogtype' text='블로그형'/>
     	    						<button id="boardTypeHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>		
								</td>
							</tr>
							<tr>
								<th style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.useanonymous' text='익명 여부'/></FONT>
								</th>
								<td style="background-color:#ffffff; border:1px solid #8B8878;">
									<form:radiobutton path="useAnonymous" value="Y" id="useAnonymousY" name="useAnonymous"/><spring:message code='board.use' text='사용'/>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<form:radiobutton path="useAnonymous" value="N" id="useAnonymousN" name="useAnonymous"/><spring:message code='board.notuse' text='미사용'/>
     	    						<button id="useAnonymousHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>	
								</td>
								<th style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.usecomment' text='댓글 여부'/></FONT>
								</th>
								<td style="background-color:#ffffff; border:1px solid #8B8878;">
									<form:radiobutton path="useComment" value="Y" id="useCommentY" name="useComment"/><spring:message code='board.use' text='사용'/>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<form:radiobutton path="useComment" value="N" id="useCommentN" name="useComment"/><spring:message code='board.notuse' text='미사용'/>
     	    						<button id="useCommentHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>		
								</td>
							</tr>
							<tr>
								<th rowspan="2" style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.useattachfile' text='파일첨부 사용여부'/></FONT>
								</th>
								<td rowspan="2" colspan="4" style="background-color:#ffffff; border:1px solid #8B8878;">
									<form:radiobutton path="useAttachFile" value="Y" id="useAttachFileY" name="useAttachFile"/><spring:message code='board.use' text='사용'/>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									<form:radiobutton path="useAttachFile" value="N" id="useAttachFileN" name="useAttachFile"/><spring:message code='board.notuse' text='미사용'/>
     	    						<button id="useAttachFileHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form:form>
			</div>
			<div class="title" style="border-bottom:#eaeaea solid 1px;">
				<img src="<c:url value='/sample/images/ico_check_color.gif'/>"/>
				<FONT SIZE="2">
					<b><spring:message code='board.title.setupinfo' text='설치정보'/></b>
				</FONT>
				<hr />			<br/>
			</div>
			<div class="view" style="margin:10px 0 10px 0">
				<form:form modelAttribute="boardInfo" id="setupInfoForm" name="setupInfoForm" method="post" >
					<table id="setupInfo" cellpadding="5" cellspacing="1">
						<colgroup>
							<col width="20%">
							<col width="30%">
							<col width="20%">
							<col width="30%">							
						</colgroup>
						<tbody>
							<tr>
								<th style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.packagename' text='패키지명'/></FONT>
								</th>
								<td style="background-color:#ffffff; border:1px solid #8B8878;">
									<form:input path="packageName" id="packageName" cssClass="required" onkeyup="checkValid(event, this, 'packageName')" style="width:200px;"/>
     	    						<button id="packageNameHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>	
								</td>
								<th style="background-color:#dadada; border:1px solid #8B8878;">
									<FONT COLOR="gray"><spring:message code='board.servicename' text='서비스명'/></FONT>
								</th>
								<td  style="background-color:#ffffff; border:1px solid #8B8878;">
									<form:input path="boardName" cssClass="required" onkeyup="checkValid(event, this, 'boardName')" style="width:200px;"/>
     	    						<button id="serviceNameHelp" class="help">
                    					<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    				</button>	
								</td>
							</tr>
						</tbody>
					</table>
				</form:form>
			</div>
			<div id="fileView" style="border:1px;vertical-align:bottom">
				<FONT SIZE="2"><b><spring:message code='board.message.confirm.fileinfo' text='우측 버튼을 통해 생성되는 파일 정보를 확인할 수 있습니다.'/></b></FONT>
				<button class="button default icon refresh" style="vertical-align:middle">   
            		&nbsp;
           	  		<span class="none_a txt_num3" style="width:100px"><spring:message code='board.button.refresh' text="설치정보 확인"/></span>
            	</button>
				<hr />			<br/>
			</div>
			
			<div id="filePaths" style="border:1px solid c3c3c3;">
 				<c:forEach var="templateName" items="${templateNames}">
				 	<div id="${templateName}"><span>${templateName}</span></div>
				</c:forEach> 
			</div>
		</div>
		<div id="columnInfoTab">
			<div class="description" style="padding-bottom:15px;">
				<FONT SIZE="2">
					<br/><b><spring:message code='board.info.column' text='※ 게시판 화면(목록,등록)에 출력할 필드 속성에 대해 설정합니다. '/></b> 
				</FONT>
			</div>
			<div class="title" style="border-bottom:#eaeaea solid 1px;">
				<img src="<c:url value='/sample/images/ico_check_color.gif'/>"/>
				<FONT SIZE="2">
					<b><spring:message code='board.title.tableinfo' text='테이블정보'/></b>
				</FONT>
				<hr />			<br/>
			</div>
			<div class="view" style="margin:10px 0 10px 0">
				<form:form modelAttribute="boardInfo" id="tableInfoForm" name="tableInfoForm" method="post" >
					<table id="tableInfo" cellpadding="5" cellspacing="1">
						<colgroup>
							<col width="20%">
							<col width="">
						</colgroup>
						<tbody>
							<th style="background-color:#dadada; border:1px solid #8B8878;">
								<FONT COLOR="gray"><spring:message code='board.tablename' text='테이블명'/></FONT>
							</th>
							<td style="background-color:#ffffff; border:1px solid #8B8878;">
								<form:input path="tableName" cssClass="required" onkeyup="checkValid(event, this, 'tableName')" style="width:300px;"/>
     	    					<button id="tableNameHelp" class="help">
                    				<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                    			</button>
							</td> 
						</tbody>
					</table>
				</form:form>
			</div>
			<div class="title" style="border-bottom:#eaeaea solid 1px;">
				<img src="<c:url value='/sample/images/ico_check_color.gif'/>"/>
				<FONT SIZE="2">
					<b><spring:message code='board.title.essentialcolumn' text='필수컬럼'/></b>
				</FONT>
				<button id="essentialColumnHelp" class="help">
                	<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                </button>
			</div>	
			<div id="essential_list"  style="margin:10px 0 10px 0;">
  				<table id="essentialColumn_grid"></table>   
			</div>
			<div class="title" style="border-bottom:#eaeaea solid 1px;">
				<img src="<c:url value='/sample/images/ico_check_color.gif'/>"/>
				<FONT SIZE="2">
					<b><spring:message code='board.title.expandedcolumn' text='확장컬럼'/></b>
				</FONT>
				<button id="expandColumnHelp" class="help">
                	<img src="<c:url value='/jquery/jquery/msdropdown/icons/icon_faq.gif'/>"/>
                </button>
           	</div>	
			<div id="expand_list" style="margin:10px 0 0 0;text-align:right;">
				<table id="expandColumn_grid"></table> 
			</div>
			<div style="margin:10px 0 0 0;text-align:right;">
				<table id="expandColumn_grid"></table> 
				<button class="button default icon addRow">   
      		   		&nbsp;
      	       		<span class="none_a txt_num3"><spring:message code='board.button.addrow' text="행추가"/></span>
     	    	</button>
			</div>
		</div>
		<div id="formViewInfoTab">
		</div>
		<div id="listViewInfoTab" style="padding:1em 1.4em; height:80px; text-align:center">
		</div>
	</div>
    <div class="listunder_container">   
        <div class="none_listpaging">
        </div>
   		<div class="list_underbtn_right">
            <button class="button default icon prev">   
                &nbsp;
                <span class="none_a txt_num3"><spring:message code='board.button.prev' text="이전"/></span>
            </button>
            <button class="button default icon next">   
                &nbsp;
                <span class="none_a txt_num3"><spring:message code='board.button.next' text="다음"/></span>
            </button>
            <button class="button default icon save">   
                <span class=add>&nbsp;</span>
                <span class="none_a txt_num3"><spring:message code='board.button.save' text="생성"/></span>
            </button>
		</div>
	</div>
	<div id="tooltip" class="dialog"></div>
</div>    
<hr />
<%@ include file="/sample/common/bottom.jsp"%>
