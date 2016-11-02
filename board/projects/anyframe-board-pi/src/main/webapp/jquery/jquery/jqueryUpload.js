(function($) {
	$.fn.attachment = function(options) {
		var id = this.attr('id');
		
		//If the options is not defined.
		if(typeof(options) == 'undefined') {
			alert("[error] parameter options is not passed");
			return;
		}
			
		AnyframeUpload.options = options;
		
		var html = "";
		html += '<div id="fileQueue" style="width:100%;"></div>\n';
		html += '<div id="buttons" style="padding-top:5px;">\n';
		html += '<input type="file" id="uploadify" name="uploadify" sytle="display:inline-block;"/>\n';
		html += '</div>\n';

		$('#' + id).append(html);

		$("#uploadify").uploadify({
			swf			: options.contextRoot + '/jquery/jquery/uploadify/uploadify.swf' ,
			uploader	: options.contextRoot + '/jqueryUploadFile.do', 
			queueID		: "fileQueue",
			fileObjName : "fileData",
			auto		: false,
			multi		: false,
			width		: 80,
			height		: 24,
			debug		: false,
			removeTimeout : 0,
			fileTypeExts : '*.jpg; *.gif; *.png;',
			fileSizeLimit	: 10000000,
			buttonImage	: options.contextRoot + '/jquery/image/uploadBrowse.png',
			onUploadSuccess	: function(file, data, response) {
				logger.log("[uploadify] onUploadSuccess : call onUpload Success!!");
				logger.log("[uploadify] onUploadSuccess : " + data);
				eval("var respJson="+data);
				
				$('#filePaths').val(respJson.filePaths);
				$('#realFileName').val(respJson.realFileName);
				
				AnyframeUpload.options.callBack(); // call back to list.jsp
			}, 
			onSelect	: function(file) {
				var queueLength = this.queueData.queueLength;
				if(queueLength > 0 ){
					var n = 0;
					for (var fid in this.queueData.files) {
						if(n > (queueLength-1)) break;
						$('#uploadify').uploadify('cancel',fid); 	
						n++;
					}
				}
			}
		});
		
	};
})(jQuery);

/**
 * file upload utility
 */
var AnyframeUpload = {};
AnyframeUpload.options = {};

/**
 * default callback implementation
 */
AnyframeUpload.defaultCallBack = function () {
	logger.log('AnyframeUpload DefaultCallBack : upload complete!');
	return true;
};

AnyframeUpload.uploadFile = function() {
	if($('#fileQueue').children('div').length == 0) {
		AnyframeUpload.options.callBack();
		return;
	} else {
		$('#uploadify').uploadify('upload','*'); 	
	}
};

