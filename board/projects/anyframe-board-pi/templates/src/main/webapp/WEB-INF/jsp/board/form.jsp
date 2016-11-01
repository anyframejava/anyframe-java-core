<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>${boardInfo.boardTitle}</title>
</head>

<body>
<!-- common&layout css  -->
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/layout.css'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/common.css'/>"/>

<!-- FileUpload javascript libraries ------------------------------------------------------------>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery-1.9.0.js'/>"></script>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery-ui-1.10.0.custom.js'/>"></script>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery.form.js'/>"></script>
<script type="text/javascript" src="<c:url value='/fileupload/jquery/jquery.fileupload.js'/>"></script>

<!-- validator -->
<script type="text/javascript" src="<c:url value='/jquery/jquery/validation/jquery.validate.min.js'/>"></script>

<!--  FileUpload css files ------------------------------------------------------------------------->
<link rel="stylesheet"  type="text/css" href ="<c:url value='/fileupload/css/jquery_ui_style.css'/>" />
<link rel="stylesheet"  type="text/css" href ="<c:url value='/fileupload/css/fileuploader_style.css'/>" />
<link rel="stylesheet" type="text/css" href="<c:url value='/sample/css/content.css'/>"/>

<script type="text/javascript">
#if(${boardInfo.useAttachFile} == "Y")
	var postId;
	var attachFileName;

	var vf = [], vf_id_index = 0;

	var ENV ={
			GET_SIZE_INTERVAL : 300,
			PROGRESS_INTERVAL : 300
	};
	
	function getVirtualFormID() {
		return vf_id_index++;
	}

	function createForm() {
		var formhtml = "<form id='vform"
				+ getVirtualFormID()
				+ "' name='vform' method='post' enctype='multipart/form-data' ><input type='file' name='vfile'  /><input type='submit' value='send' /></form>";
		var jobjVF = $(formhtml);
		
		vf.push(jobjVF);
		jobjVF.appendTo('#fileuploader');

		var abspos = $(".browse-btn").offset();

		jobjVF.children("input[type='file']").css(abspos).on('change', function(evt) {
					postCreateForm(evt);
				});

		return jobjVF;
	}

	function postCreateForm(evt) {

		var index = vf.length - 1;
		var curVF = vf[index];
		fileupload.addListRow(index, curVF[0].id);

		//TODO: fileSize 얻기 & fileSize 화면에 업데이트..  
		VFGetFileSize(curVF, fileupload, index);

		createForm();
		fileupload.setFormStyle();

	}

	function VFRemove(vfIndex) {
		// UI 삭제
		var $curVF = vf[vfIndex];
		$curVF.remove();
		// Array Item 삭제
		vf.splice(vfIndex, 1);
	}

	function VFRemoveAll() {
		vf.splice(0, vf.length);
	}

	function VFGetFileSize(curVF, callbackFileuploadObj, vfIndex) {

		var curjqXHR = null;
		var $form = curVF;
		var infilename = ($form.children("input[type='file']").val()).split("\\");
		infilename = infilename[infilename.length - 1];

		var options = {
			async : true,
			url : "${ctx}/postAttachFile.do?method=getmetaFake",
			beforeSend : function(jqXHR, settings) {
				curjqXHR = jqXHR; //*** very important code.. 
				return true;
			},
			success : function(data) {
				console.log("getmetaFake..success");
				$.ajax(optionGetSize);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log("getmetaFake..error, errorThrown => " + errorThrown);
				if (errorThrown == "abort")
					$.ajax(optionGetSize);
			}
		};

		// getSizeFake 호출
		$form.ajaxSubmit(options);

		//*** very important code...
		//*** move
		//$form.children("input[type='file']").css({position: "relative"});

		var optionGetSize = {
			async : true,
			url : "${ctx}/postAttachFile.do?method=getmetaReal",
			data : {
				filename : infilename
			},
			success : function(data) {
				var retJObj = $.parseJSON(data);

				//TODO: CHECK...
				callbackFileuploadObj.updateSize(vfIndex, retJObj.filesize);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				//TODO:  에러처리...
				//console.log("testestest........");
				//console.log("getmeta: error (사이즈 얻어오는 부분)- " + errorThrown);
			}
		};

		function getRealSizeNCancelRequest() {
			if (curjqXHR != null) {
				clearInterval(hAbort);
				curjqXHR.abort("abort");
			}
			
			//$.ajax(optionGetSize);	//getmetaFake 의 success or error 에서 처리되도록 변경함
		}

		var hAbort = setTimeout(getRealSizeNCancelRequest, ENV.GET_SIZE_INTERVAL); 
		
	}
	
	function VFUploadPrepare() {
		
		var options = {
				//target: $form,
				async: false,
				url: "${ctx}/postAttachFile.do?method=prepare",
				data: {"utype": "disk"},
				success: function(data) {
					//console.log("VFUploadPrepare-succ: " + data);
				},
				error: function(data) {
					//console.log("VFUploadPrepare-error: " + VFUploadPrepare);
				}
		};
		
		$.ajax(options);
	}
	
	var gVFIndex = 0;
	var gVFCheckIndex= 0; // 첨부한 파일폼 (vform1, vform2, vform3..) 이 없을경우 파일업로드 서버로직을 호출하지 않기 위한 변수 
	
	// 첨부파일이 있을경우에만 파일업로드 서버 로직을 호출한다.
	function VFUpload(vfIndex) {
		if (arguments.length > 0) {
			gVFIndex = vfIndex;
		} else {
			gVFIndex++;
			vfIndex = gVFIndex;
		}

		var vform= "#vform"+ ++gVFCheckIndex;
		
		if( typeof $(vform).val() == "undefined" )  { // 1. 첨부파일이 없을 경우
			VFUploadComplete();
		} else { // 2. 첨부파일이 있을 경우
			var $form = vf[vfIndex];
			//console.log($form);
			var options = {
				//target: $form,
				async : true,
				url : "${ctx}/postAttachFile.do?method=upload&postId="+postId,
				//headers : {
				//	utype : "disk"
				//},
				success : function(data) {
					var dataObj = $.parseJSON(data);
					//TODO:
					//console.log("getmeta: (success but size is limited..) : " + data);
					postId= dataObj.postId;	
					attachFileName= dataObj.attachFileName;
				},
				error : function() {
					fileupload.createMessage(false, "size", vfIndex);
					clearInterval(hAbort);
					//curjqXHR.abort();
					//console.log("error : (업로드 부분) : " + arguments);
				}
			};
		
			//File Upload 호출...
			$form.ajaxSubmit(options);

			var hAbort = setInterval(checkProgress, ENV.PROGRESS_INTERVAL);

			var progressResult = null;
			
			var options2 = {
				async : true,
				url : "${ctx}/postAttachFile.do?method=progressReal",
				success : function(data) {
					var retJObj = $.parseJSON(data);

					//console.log("getProgress Return: " + retJObj);
					//Return Object Signature : { progress : value, contentbyte : value, readbyte : value} (hashmap > json )
					//TODO: progressbar 연결
					//console.log(retJObj);

					fileupload.updateCurrentSize(vfIndex, retJObj.readbyte, retJObj.progress);
					
					progressResult = retJObj;
				},
				error : function(data) {
					//console.log("error gemeta: " + arguments);
					clearInterval(hAbort);
					curjqXHR.abort();
				}
			};

			function checkProgress() {
				if (progressResult != undefined && progressResult.progress == 100) {
					clearInterval(hAbort);

					fileupload.completeUnitList(vfIndex);

					if (vfIndex == (vf.length - 2)) {
						fileupload.completeAll(true);
						VFUploadComplete();
					}

					//TODO: 남아 있는 Virtual Form 전송

					if ((vfIndex + 1) < (vf.length - 1)) {
						setTimeout(VFUpload, 0);
					}
				} else {
					$.ajax(options2);
				}
			}
		}
	}

	function VFUploadComplete() {
 		var form = $('#${boardName}Form');
		$('#postId').val(postId);
		
		var params = form.serialize();
		
		var url = '<c:url value="/${boardName}/create.do"/>';
		if($('#${boardName}Form').valid()) {
			$.post(url, params, function(data){
				postId= ""; // postId 초기화
#if(${boardInfo.boardType} == 'L')
				var url = '<c:url value="/${boardName}/listView.do"/>'; 
#else
				var url = '<c:url value="/${boardName}/blogView.do"/>'; 
#end
				self.location.href = url;
			});
		}
		
	}
	
	var fileupload ={
		
		list : [],
		
		prefix : "file",
		
		option : {
			name : "full",
			disable : false, // 전체 disabled 처리
			interval : 0,
			width : "auto",
			height : "auto"
		},
		
		init : function(){
			
			// 초기화
			var browseName = "+Add",
				  resetName = "Reset";

			$("#fileuploader").append("<div class = 'file-upload' ></div>");
			
			$(".file-upload").append("<div class = 'file-browse-bar'></div>")
									 .append("<div class='file-list'></div>")
									 .append("<div class='file-upload-bar'></div>");

			$(".file-browse-bar").append("<span class='browse-btn'>"+browseName+"</span>");
			$(".file-upload-bar").append("<span class='reset-btn'>"+resetName+"</span>");
			
			$(".browse-btn, .reset-btn").button();

			this.disableUploadBtn(true);
			this._attachUploadEvt();
			this._attachResetEvt();
			
			createForm();
			this.setFormStyle();

		},
		
		
		/*
		_width : function(value){
			this.option.width = value;
			select.container.css("width", this.option.width);
		},
		
		_setOptions : function(key, value){
			if(key == "width"){
				this._width(value);
			}
		},
		*/
		
		_createList : function(index){
		
			var $listRow = $("#list"+index);
			this.list.push($listRow);
			
			return $listRow;
		},
		
		//add file list row to the next of previous list
		addListRow : function(index, formId){			
			
			$(".file-list").append("<div id='list"+index+"' class='list-row'></div>");
			var $listRow = this._createList(index),
				  fileName = this._getFileName(formId);
			
			var name = this._setFileNameLength(fileName, 30),
				  extension = this._getExtension(fileName),
				  nameTag = this._addName(name),
			 	  previewIconTag = this._addIcon(extension, "front"),
			 	  removeIconTag = this._addIcon("remove", "end"),
			 	  sizeTag = this._addSize(),
			 	  progressbarTag = this._addProgressbar();
			
			${esc.d}listRow.append(previewIconTag+nameTag+removeIconTag+sizeTag+progressbarTag);
			${esc.d}listRow.children(".file-progressbar").progressbar();
			$(".file-list").css({"border-bottom" : "1px solid rgb(211, 211, 211)"});
			
			this.disableUploadBtn(false);
			this._setTooltip($listRow, fileName);
			
			this._attachCancelEvt($listRow);
			
		},
		
		_addIcon : function(type, pos) {
			var icon = this._getIcon(type);
			return "<img class='icon-list icon-"+pos+"' src='"+icon+"' alt='icon'>";
		},
		
		_addName : function(name){
			return "<span class='file-name'>"+name+"</span>";
		},
		
		
		_addProgressbar : function() {
			return "<div class='file-progressbar'></div>";
		},
		
		_addSize : function() {
			return "<div class='size'><span class='change-size'>0</span><span class='change-size-unit'></span>/<span class='total-size'></span><span class='toatl-size-unit'></span></div>";
		},
		
		_getFileName : function(formId) {
			
			var path = $("#"+formId).children("input[type='file']").val();
			
			//TODO: FileSystem 별 처리 보완.. (ex linux..)
			var arryParams = path.split("\\"),
				  fileName = arryParams[ arryParams.length - 1 ];
			
			return fileName;
		},
		
		_setFileNameLength : function(fileName, limitedLength) {

			var  name = fileName;
			
			if(fileName.length > limitedLength){
				name = fileName.substr(0,limitedLength)+"...";
			}
			//file명 길이 처리하는 것 option처리 혹은 자동계산 처리 필요함..@.@
			return name;
		},
		
		_setTooltip : function($listRow, fileName){
			
			//tooltip : show the real long file name
			$listRow.children(".file-name").tooltip({
				items : ".file-name",
				content : fileName,
				position : {
					my : "left+15 top+15",
					at : "left bottom",
					of : $listRow.children(".file-name")
				},
				tooltipClass : "file-tooltip",
				track : true
			});
		},
		
		_removeListRow : function(index, $listObj){
				$listObj.remove();
				this.list.splice(index, 1);
		},
		
		_getExtension : function(fileName){
			
			var arryParams = fileName.split("."),
			  	   extension = arryParams[arryParams.length-1];
			
			return extension;
		},
		
		_getIcon : function(type){
			var icon,
				  context = "${ctx}/fileupload/image/";
			
			switch(type){
			case "doc" :
			case  "docx" :
				icon = "word_icon.png";
				break;
			case "xls" :
			case "xlsx" :
				icon = "excel_icon.png";
				break;
			case "ppt" :
			case "pptx" :
				icon = "ppt_icon.png";
				break;
			case "zip" :
				icon = "zip_icon.png";
				break;
			case "htm" :
			case "html" :
				icon = "html_icon.png";
				break;
			case "mp4" :
			case "avi" :
			case "mkv" :
				icon = "movie_icon.png";
				break;
			case "jpg" :
			case "jpeg" :
			case "png" :
			case "gif" :
				icon = "pic_icon.png";
				break;
			case "remove" :
				icon = "remove_icon.png";
				break;
			default :
				icon = "file_icon.png";
			}
			
			return context+icon;
		},
		
		_formatSize : function(inBytes) {
				var KB = 1024,
					  MB = 1024 * 1024,
					  GB = 1024 * 1024 * 1024,
					  TB = 1024 * 1024 * 1024 * 1024;
				
				var retObj = {
						size : 0,
						unit : "Byte"
				};
				
				if (inBytes < (KB*0.1) ) {
					retObj.size = inBytes;
					retObj.unit = "Byte";
				} else if (inBytes < (MB*0.1) ) {
					retObj.size = inBytes/KB;
					retObj.unit = "KB";	
				} else if ( inBytes < (GB*0.1) ) {
					retObj.size = inBytes/MB;
					retObj.unit = "MB";
				} else if ( inBytes < (TB*0.1) ) {
					retObj.size =inBytes/GB;
					retObj.unit ="GB";
				}
				
				retObj.size = Math.floor(retObj.size*10)/10;//round down
				
				//TODO: Size Limit.. and related error..??
				
				return retObj;			
		},
		
		updateSize : function(index, size){
			var sizeObj = this._formatSize(size);
			var $size = $(".size").eq(index);
			
			${esc.d}size.children(".toatl-size-unit").text(sizeObj.unit);
			${esc.d}size.children(".change-size-unit").text(sizeObj.unit);
			${esc.d}size.children(".total-size").text(sizeObj.size);
		},
		
		updateCurrentSize : function(index, size, progress){
			
			var sizeObj = this._formatSize(size);
			var $size = $(".size").eq(index);
		
			${esc.d}size.children(".change-size").text(sizeObj.size);
			${esc.d}size.children(".change-size-unit").text(sizeObj.unit);
			
			$(".file-progressbar").eq(index).progressbar("option", "value", progress);	
		},	
		
	createMessage : function(success, type, index) {
			var msgClass, message, messagePart, messageTag, removeTag;
			
			if(type== null){
				overallMsg(success, index);
			}else{
				partMsg(type, index);
			}
			
			function overallMsg(success, index){
				
				if(success==true){
					msgClass = "success-msg";
					message = "<spring:message code='$[boardName.toLowerCase()}.message.success.send'/>";
				}else {
					msgClass = "fail-msg";
					message = "<spring:message code='$[boardName.toLowerCase()}.message.fail.send'/>";
				}					
				messageTag = "<span class='"+msgClass+"'>"+message+"</span>";
				$(".file-upload-bar").append(messageTag);
				
				
			}
			
			function partMsg(type, index){
				
				switch (type) {
				case "size" :
					msgClass = "fail-msg fail-size";
					message = "<spring:message code='$[boardName.toLowerCase()}.message.fail.upload.sizeover'/>";
					break;
					
				default :
					msgClass = "fail-msg";
					message = "<spring:message code='$[boardName.toLowerCase()}.message.fail.upload'/>";						
				}
				
				fileupload.disableListRow(index);
				fileupload.disableUploadBtn(true);
				
				var $listRow = $(".list-row").eq(index);
				fileupload._removeCancelEvt($listRow);
				
				messageTag = "<span class='"+msgClass+"'>"+message+" : <a class='fail-delete'><spring:message code='${boardName.toLowerCase()}.button.delete'/></a></span>";
				$(messageTag).insertAfter($listRow);
				//console.log($listRow.next());
				${esc.d}listRow.next().position({
					my : "center",
					at : "center",
					of : $listRow.find(".file-progressbar")
				});
				
				${esc.d}listRow.next().find(".fail-delete").on("click", function(){
					fileupload._removeListRow(index, $listRow);
					$(this).parent().remove();
					VFRemove(index);
					fileupload.setFormStyle();
					fileupload.disableUploadBtn(false);
					fileupload._attachUploadEvt();
					
					if( index==0 && $(".list-row").length ==0){
						fileupload.disableUploadBtn(true);
					}
					
				});
			}
			
			
		},

		disableUploadBtn : function(disabled) {
			$(".upload-btn").button("option", "disabled", disabled);
		},

		completeUnitList : function(index) {
			this.disableListRow(index);
			
			var $listRow = $(".list-row").eq(index);
			fileupload._removeCancelEvt($listRow);
			fileupload._removeUploadEvt();
		},

		disableListRow : function(index) {
			$(".list-row").eq(index).addClass("ui-state-disabled");
		},

		completeAll : function(success) {
			this.createMessage(success);
			this.disableUploadBtn(true);
		},

		setFormStyle : function() {
			
			$("input[name='vfile']").css({"cursor" : "pointer"});

			var width = $(".browse-btn").css("width"), 
				   height = $(".browse-btn").css("height");

			$(".file-upload").css("width", "99%");

			//positioning input(file) button in front of browse button
			$("input[type='file']").position({
				my : "left top",
				at : "left top",
				of : ".browse-btn"
			});

			//form > input(file) style
			$("input[name='vfile']").css({
				'width' : width,
				'height' : height,
				'cursor' : 'pointer',
				'opacity' : '0',
				'filter' : 'alpha(opacity:0)'
			});

			//form > input(submit) style
			$("input[type=submit]").css({
				'display' : 'none'
			});

		},

		_reset : function() {
			$(".file-upload").remove();
			$("form[name='vform']").remove();
			vf_id_index = 0;

			VFRemoveAll();

			this._removeUploadEvt();
			this._removeResetEvt();

			this.init();
		},
		

		_attachCancelEvt : function($listRow) {
			${esc.d}listRow.last().children(".icon-end").on("click.cancel", function() {
				var index = $(".icon-end").index(this);
				fileupload._removeListRow(index, $listRow);
				VFRemove(index);
				if (index == 0) {
					fileupload.disableUploadBtn(true);
				}
				fileupload.setFormStyle();
			});
		},
		
		_removeCancelEvt : function($listRow) {
			${esc.d}listRow.last().children(".icon-end").off(".cancel");
			${esc.d}listRow.last().children(".icon-end").css({"cursor" : "auto"});
		},
		
		_attachUploadEvt : function() {
			$(".add").on("click.upload", function() {
				VFUploadPrepare(); //to define uloading type 
				VFUpload(0); 
			});
			/*
			$(".upload-btn").on("click.upload", function() {
				VFUploadPrepare(); //to define uloading type 
				VFUpload(0);
			});*/
				
		},
		
		_removeUploadEvt : function() {
			$(".add").off(".upload");
			$(".add").css({"cursor" : "auto"});
		},

		_attachResetEvt : function() {
			$(".reset-btn").on("click.reset", function() {
				fileupload._reset();
			});
		},

		_removeResetEvt : function() {
			$(".reset-btn").off(".reset");
		}

	};

	$(function() {

		fileupload.init();

	});
#end
/* 
 *	Validate Message
 */
$.validator.messages = {		
		required: "<spring:message code='${boardName.toLowerCase()}.message.required'/>",
}; 

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

$(document).ready(function(){
	#if(${boardInfo.useAttachFile} == "Y")
	$('#justUpdate').hide();
	
	if('${${boardName}.postId}' != ''){
		$('#fileuploader').hide();
		$('#justUpdate').show();
	}
	#end
	
	/*
	 *	Value to contain searchKeyword / searchCondition
	 */
	var searchCondition = '${searchVO.searchCondition}';
	var searchKeyword = '${searchVO.searchKeyword}';
	
	/*
	 *	Validation Check
	 */
	$('#${boardName}Form').validate({
		errorPlacement : function(error, element){
			setErrorPlacement(error, element);
		},
		wrapper : 'div'				
	});
	
#foreach(${colInfo} in ${viewFields})#if(${colInfo.columnId} != "BOARD_ID" && ${colInfo.columnId} != "POST_ID")
#if(${colInfo.columnType} == "DATE")	
	$('#${colInfo.fieldId}').datepicker({ changeYear: true, changeMonth: true, dateFormat: "yy-mm-dd" });
#end
#end#end
#if(${boardInfo.useAttachFile} == "N")
	/*
	 *	Add button click event
	 */
	$('button.add').click(function(e){
#foreach(${colInfo} in ${viewFields})#if(${colInfo.columnId} != "BOARD_ID" && ${colInfo.columnId} != "POST_ID")
#if(${colInfo.columnType} == "DATE")	
	$('#${colInfo.fieldId}').datepicker('option', 'dateFormat', 'mm/dd/yy');
#end
#end#end
		var form = $('#${boardName}Form');
		var params = form.serialize();
		var url = '<c:url value="/${boardName}/create.do"/>';
		if($('#${boardName}Form').valid()) {
			$.post(url, params, function(data){
				#if(${boardInfo.boardType} == 'L')
				var url = '<c:url value="/${boardName}/listView.do"/>'; 
				#else
				var url = '<c:url value="/${boardName}/blogView.do"/>'; 
				#end
				self.location.href = url;
			});
		}
	});
#end	
	/*
	 *	Update button click event
	 */
	$('button.update').click(function(e){
		var form = $('#${boardName}Form');
		var params = form.serialize();
		var url = '<c:url value="/${boardName}/update.do"/>';
		if($('#${boardName}Form').valid()) {
			$.post(url, params, function(data){
				#if(${boardInfo.boardType} == 'L')
				var url = '<c:url value="/${boardName}/listView.do"/>'; 
				#else
				var url = '<c:url value="/${boardName}/blogView.do"/>'; 
				#end
				self.location.href = url;
			});
		}
	});
	
	/*
	 *	List button click event
	 */
	$('button.list').click(function(e){
		#if(${boardInfo.boardType} == 'L')
		var url = '<c:url value="/${boardName}/listView.do"/>'; 
		#else
		var url = '<c:url value="/${boardName}/blogView.do"/>'; 
		#end
		url += '?searchCondition=' + searchCondition;
		url += '&searchKeyword=' + searchKeyword;
		url += '&pageIndex=' + '${searchVO.pageIndex}';
		self.location.href = url;
	});
});
</script>      
<!--************************** begin of contents *****************************-->
<div id="wrap">
	<div id="container">
	   	<div class="cont_top">
	       	<h2>
			 	<c:if test="${esc.d}{empty ${boardName}.postId}">
			 		<spring:message code="${boardName.toLowerCase()}form.title.add"/>
			 		<c:set var="readonly" value="false"/>
				</c:if>
			    <c:if test="${esc.d}{not empty ${boardName}.postId}">	
				 	<spring:message code="${boardName.toLowerCase()}form.title.update"/>
					<c:set var="readonly" value="true"/>				 
				</c:if>					 				 
			</h2>
	    </div>
	    <div class="post_view">
			<form:form modelAttribute="${boardName}" method="post" action="${boardName}.do" id="${boardName}Form" name="${boardName}Form">
	#foreach(${colInfo} in ${viewFields})#if(${colInfo.columnId} == "BOARD_ID" || ${colInfo.columnId} == "POST_ID")			<form:hidden path="${colInfo.fieldId}" readonly="true"/>
	#end#end
		 		<table summary="This table shows detail information about the ${boardName}">
	    			<caption>Detail information</caption>
	        		<colgroup>
	        			<col class="header" />
	     		    	<col class="contents" />
	     		    </colgroup>
	        		<tbody>
	#foreach(${colInfo} in ${viewFields})#if(${colInfo.columnId} != "BOARD_ID" && ${colInfo.columnId} != "POST_ID")    				<tr>
	        				<th>
	        					<label for="${colInfo.fieldId}"><spring:message code='${boardName.toLowerCase()}.${colInfo.fieldId.toLowerCase()}'/>&nbsp;</label>#if(${colInfo.isEssential} == "1")<label class="essential">*</label>#end

	        				</th>
	            			<td>
#if(${colInfo.columnType} == "CLOB" || ${colInfo.columnAttribute} == "2")
	            				<form:textarea path="${colInfo.fieldId}"#if(${colInfo.isEssential} == "1") cssClass="required"#end #if(${colInfo.columnSize}=="")maxlength="2000"#elseif(${colInfo.columnSize}) maxlength="${colInfo.columnSize}" #end/>
#elseif(${colInfo.columnType} == "DATE")
	            				<form:input path="${colInfo.fieldId}" id="${colInfo.fieldId}" cssClass="ct_input_g #if(${colInfo.isEssential} == "1")required#end" size="40"/>							
#else
		        				<form:input path="${colInfo.fieldId}"#if(${colInfo.isEssential} == "1") cssClass="required"#end #if(${colInfo.columnSize})maxlength="${colInfo.columnSize}"#end/>
#end
#if(${colInfo.isEssential} == "1")
								<form:errors path="${colInfo.fieldId}" cssClass="errors" />
#end
							</td>
	        			</tr>
#end#end
					</tbody>
	    		</table>
			</form:form>
		</div>
#if(${boardInfo.useAttachFile} == "Y")
		<div class="attachFile_view">
	 		<table summary="This table shows detail information about the attachFile">
    			<caption>Detail information</caption>
        		<colgroup>
        			<col class="header" />
     		    	<col class="contents" />
     		    </colgroup>
        		<tbody>
	        		<tr>
						<th><label for="attachFile"><spring:message code='${boardName.toLowerCase()}.attachfile'/></label></th>
            				<td>
            				<div id ="fileuploader" align='left'></div>
							<div id="justUpdate">
								<ul>
									<c:forEach var="attachFile" items="${fileUploadInfoList}">
										<li> ${attachFile.attachFileName} (${attachFile.attachFileSizeString})</li>
									</c:forEach>
								</ul><br/>
								<ul> <font color="red">* <spring:message code='${boardName.toLowerCase()}.message.cannotupdate.attachfile'/></font> </ul>
							</div>
						</td>
					</tr>		
				</tbody>
			</table>
		</div>
#end
	<!--************************** begin of buttons *****************************-->
	    <div class="btncontainer_right">
			<c:if test="${esc.d}{empty ${boardName}.postId}">	
			    <button class="button default icon add">
			        <span class="add">&nbsp;</span>
			        <span class="none_a txt_num3"><spring:message code='${boardName.toLowerCase()}.button.save'/></span>
			    </button>
			</c:if> 
			<c:if test="${esc.d}{not empty ${boardName}.postId}">
			    <button class="button default icon update">
			        <span class="update">&nbsp;</span>
			        <span class="none_a txt_num6"><spring:message code='${boardName.toLowerCase()}.button.save'/></span>
			    </button>
			</c:if>		
		    <button class="button default icon list">
		        <span class="list">&nbsp;</span>
		        <span class="none_a txt_num4"><spring:message code='${boardName.toLowerCase()}.button.list'/></span>
		    </button>
	    </div>
	</div>
</div>
</body>
</html>