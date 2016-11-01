/**
 * Javascript class for file attachment with uploadify
 */
(function($) {
	
	$.fn.attachment = function(options) {
		
		var id = this.attr('id');
		
		if(typeof(options) == 'undefined') options = {
			'sizeLimit' : 10485760,
			'contextRoot' : '/anyframe-jquery-pi',
			'multi' : true,
			'refId' : '',
			'callBack' : AnyframeUpload.defaultCallBack
		};
		
		if(typeof(options.sizeLimit) == 'undefined') options.sizeLimit = 10485760;
		if(typeof(options.contextRoot) == 'undefined') options.contextRoot = '/anyframe-jquery-pi';
		if(typeof(options.multi) == 'undefined') options.multi = true;
		if(typeof(options.refId) == 'undefined') options.refId = '';
		if(typeof(options.callBack) == 'undefined') options.callBack = AnyframeUpload.defaultCallBack;
		
		AnyframeUpload.options = options;
		
		var html = '';
		html += '<ul class="attachedList"></ul>\n';
		html += '<input type="hidden" id="hiddenUploadedFiles" name="hiddenUploadedFiles"/>\n';
		html += '<input type="hidden" id="filePathsAttrName" name="filePathsAttrName" value="filePaths"/>\n';
		//html += '<input type="hidden" id="fileDir" name="fileDir"/>\n';
		html += '<div id="buttons" align="right" style="padding-top:5px">\n'; 
		html += '<input type="file" id="uploadify" name="uploadify" width="80"/>\n';
		html += '<img id="uploadClearButton" src="' + options.contextRoot + '/jquery/image/clear.jpg" width="57" height="24" border="0" style="padding-bottom:1px;cursor:pointer;vertical-align:bottom;" />\n';
		html += '</div>\n';
		html += '<div id="fileQueue" style="width:100%;"></div>\n';
		$('#' + id).append(html);
		
		if(options.refId != '') {
			AnyframeUpload.loadAttachedFileList(id);
		}
		
		$("#uploadify").uploadify({
			uploader	: options.contextRoot + '/jquery/jquery/uploadify/uploadify.swf',
			script		: options.contextRoot + '/jquery/upload.do',
			cancelImg	: options.contextRoot + '/jquery/image/cancel.png',
			queueID		: "fileQueue",
			fileDataName: "fileData",
			auto		: false,
			multi		: options.multi,
			width		: 80,
			height		: 24,
			sizeLimit	: options.sizeLimit,
			buttonImg	: options.contextRoot + '/jquery/image/uploadBrowse.png',
			onComplete	: function(event,queueID,fileObj,response,data) {
							logger.log('call onComplete!!');
							eval("var respJson="+response);
							$('#hiddenUploadedFiles').val($('#hiddenUploadedFiles').val() + ',' + respJson.uploadResult.fileNm);
							logger.log('001');
							AnyframeUpload.saveFile(respJson.uploadResult);
							logger.log('002');
						  },
			onAllComplete : function(event, data) {
							  //alert(data.filesUploaded + ' files uploaded successfully!');
						  }						  
		});
		
		$("#uploadClearButton").click( function() {
			$('#uploadify').uploadifyClearQueue();
		});
	}
})(jQuery);

/**
 * file upload utility
 */
var AnyframeUpload = {};

AnyframeUpload.remainCount = 0;
AnyframeUpload.deleteFileList = new Array();
AnyframeUpload.options = {};
AnyframeUpload.initCallBack = null;

/**
 * get and display attached file list
 */
AnyframeUpload.loadAttachedFileList = function(id) {
	var url = AnyframeUpload.options.contextRoot + '/jquery/uploadInfo.do?method=getFileList';
	var params = 'refId=' + AnyframeUpload.options.refId;
	$.ajax({
		'url' : url,
		'type' : 'POST',
		'data' : params,
		'dataType' : 'json',
		'success' : function(data) {
			AnyframeUpload.drawList(id, data.attachedList);
		},
		'error' : function(xhr, status, e) {
			//alert('E:Request Status is ' + status + '|' + xhr);
		},
		'complete' : function(xhr, status){
			//alert('C:Request Status is ' + status + '|' + xhr);
		}
	});
};

/**
 * remained file count for callback.
 */
AnyframeUpload.checkCallBack = function() {
	AnyframeUpload.remainCount--;
	logger.log('remainCount=' + AnyframeUpload.remainCount);
	if(AnyframeUpload.remainCount == 0) AnyframeUpload.options.callBack();
};

AnyframeUpload.drawList = function(id, list) {
	var html = '';
	for(var i=0;i<list.length;i++) {
		html += '<li class="attachedFile" id="' + list[i].id + '">';
		html += '<img src="' + AnyframeUpload.options.contextRoot + '/jquery/image/ext/attach_' + list[i].ext + '.gif" border="0"/>';
		html += '<a class="linkClass" href="' + AnyframeUpload.options.contextRoot + '/jquery/download.do?id=' + list[i].id + '&fileSize=' + list[i].fileSize + '&name=' + list[i].name + '">' + list[i].name + '</a>(' + list[i].fileSizeString + ')&nbsp; <a class="linkClass" href="#" onclick="AnyframeUpload.setDeleteFile(\'' + list[i].id + '\');">X</a></li>';
		html += '</li>';
	}
	$('#' + id + ' > ul.attachedList').html(html);
};

/**
 * attached file list clear
 */
AnyframeUpload.clearList = function(id) {
	$('#uploadify').uploadifyClearQueue();
	$('#' + id + ' > ul.attachedList').html('');
};

/**
 * default callback implementation
 */
AnyframeUpload.defaultCallBack = function () {
	logger.log('upload complete! : ' + AnyframeUpload.options.refId);
};

/**
 * attached file info save to DB
 */
AnyframeUpload.saveFile = function(file) {
	var url = AnyframeUpload.options.contextRoot + '/jquery/uploadInfo.do?method=saveFile';
	var params = null;
	params = 'id=' + file.id + '&name=' + file.name + '&fileSize=' + file.fileSize + '&refId=' + AnyframeUpload.options.refId;
	$.ajax({
		'url' : url,
		'type' : 'POST',
		'data' : params,
		'dataType' : 'json',
		'success' : function(data) {
			logger.log('saveFile()=' + data.param.refId);
			AnyframeUpload.options.refId = data.param.refId;
			AnyframeUpload.checkCallBack();
		},
		'error' : function(xhr, status, e) {
			//alert('E:Request Status is ' + status + '|' + xhr);
		},
		'complete' : function(xhr, status){
			//alert('C:Request Status is ' + status + '|' + xhr);
		}
	});
};

/**
 * file delete in display
 */
AnyframeUpload.setDeleteFile = function (id) {
	AnyframeUpload.deleteFileList[AnyframeUpload.deleteFileList.length] = {'id' : id};
	$('#' + id).remove();
};

/**
 * file upload to Web Application Server
 */
AnyframeUpload.fileUpload = function() {
	// file delete
	for(var i=0;i<AnyframeUpload.deleteFileList.length;i++) {
		var url = AnyframeUpload.options.contextRoot + '/jquery/uploadInfo.do?method=remove';
		var params = null;
		params = 'id=' + AnyframeUpload.deleteFileList[i].id;
		//alert(params);
		$.ajax({
			'url' : url,
			'type' : 'POST',
			'data' : params,
			'dataType' : 'json',
			'success' : function(data) {
			},
			'error' : function(xhr, status, e) {
				//alert('E:Request Status is ' + status + '|' + xhr);
			},
			'complete' : function(xhr, status){
				//alert('C:Request Status is ' + status + '|' + xhr);
			}
		});
	}
	
	logger.log($('#fileQueue').children('div').length);
	
	if($('#fileQueue').children('div').length == 0) {
		AnyframeUpload.options.callBack();
		return;
	}else{
		AnyframeUpload.remainCount = $('#fileQueue').children('div').length;
	}
	
	// file upload
	$('#uploadify').uploadifySettings('scriptData', {'fileDir' : AnyframeUpload.options.refId});
	$('#uploadify').uploadifyUpload();
};