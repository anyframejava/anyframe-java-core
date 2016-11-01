//fileupload plugin : 

	var vf = [], vf_id_index = 0;

	var FILEUPLOAD ={
			ID : "",
			GET_SIZE_INTERVAL : 300,
			PROGRESS_INTERVAL : 300,
			CONTEXT : "/anyframe-fileupload-pi"
	};
	
	var BTN ={
			ADD : ".browse-btn",
			UPLOAD : ".upload-btn",
			RESET : ".reset-btn"
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
		jobjVF.appendTo('body');

		var abspos = $(BTN.ADD).offset();

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
			url : FILEUPLOAD.CONTEXT+"/fileuploadJFileUpload.do?method=getmetaFake",
			beforeSend : function(jqXHR, settings) {
				curjqXHR = jqXHR;
				return true;
			},
			success : function(data) {
				$.ajax(optionGetSize);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				if (errorThrown == "abort")
					$.ajax(optionGetSize);
			}
		};

		// getSizeFake 호출
		$form.ajaxSubmit(options);

		var optionGetSize = {
			async : true,
			url : FILEUPLOAD.CONTEXT+"/fileuploadJFileUpload.do?method=getmetaReal",
			data : {
				filename : infilename
			},
			success : function(data) {
				var retJObj = $.parseJSON(data);
				callbackFileuploadObj.updateSize(vfIndex, retJObj.filesize);
			},
			error : function(jqXHR, textStatus, errorThrown) {
				//TODO: error 처리
			}
		};

		function getRealSizeNCancelRequest() {
			if (curjqXHR != null) {
				clearInterval(hAbort);
				curjqXHR.abort("abort");
			}
			
		}

		var hAbort = setTimeout(getRealSizeNCancelRequest, FILEUPLOAD.GET_SIZE_INTERVAL); 
		
	}

	var gVFIndex = 0;
	function VFUpload(vfIndex) {
		if (arguments.length > 0) {
			gVFIndex = vfIndex;
		} else {
			gVFIndex++;
			vfIndex = gVFIndex;
		}

		var $form = vf[vfIndex];

		var options = {
			async : true,
			url : FILEUPLOAD.CONTEXT+"/fileuploadJFileUpload.do?method=upload",
			success : function(data) {
                var extractJson = data.replace(/<[^{}]*>/g, ""),
				    dataObj = $.parseJSON(extractJson);
			},
			error : function() {
				
				fileupload.createMessage(false, "size", vfIndex);
				clearInterval(hAbort);
			}
		};

		//File Upload 호출...
		$form.ajaxSubmit(options);

		var hAbort = setInterval(checkProgress, FILEUPLOAD.PROGRESS_INTERVAL);

		var progressResult = null;

		var options2 = {
			async : true,
			url : FILEUPLOAD.CONTEXT+"/fileuploadJFileUpload.do?method=progressReal",
			success : function(data) {
				var retJObj = $.parseJSON(data);

				fileupload.updateCurrentSize(vfIndex, retJObj.readbyte, retJObj.progress);
				
				progressResult = retJObj;
			},
			error : function(data) {
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
				}

				if ((vfIndex + 1) < (vf.length - 1)) {
					setTimeout(VFUpload, 0);
				}
			} else {
				$.ajax(options2);
			}
		}
	}

	function VFUploadPrepare() {
		
		var options = {
				//target: $form,
				async: false,
				url: FILEUPLOAD.CONTEXT+"/fileuploadJFileUpload.do?method=prepare",
				data: {"utype": "disk"},
				success: function(data) {
				},
				error: function(data) {
				}
		};
		
		$.ajax(options);
	}

//UI 구현 부분
var fileupload ={
		
		list : [],
		
		prefix : "file",
		
		option : {
			name : "full",
			disable : false,
			interval : 0,
			width : "auto",
			height : "auto"
		},
		
		init : function(){
			var browseName = "+Add",
				  resetName = "Reset",
				  uploadName = "Upload",
				  idSelector = $("#"+FILEUPLOAD.ID);

			idSelector.append("<div class = 'file-upload' ></div>");
			
			$(".file-upload").append("<div class = 'file-browse-bar'></div>")
									 .append("<div class='file-list'></div>")
									 .append("<div class='file-upload-bar'></div>");

			$(".file-browse-bar").append("<span class='browse-btn'>"+browseName+"</span>");
			$(".file-upload-bar").append("<span class='upload-btn'>"+uploadName+"</span>")
											.append("<span class='reset-btn'>"+resetName+"</span>");
			
			$(".browse-btn, .upload-btn, .reset-btn").button();

			this.disableUploadBtn(true);
			this._attachUploadEvt();
			this._attachResetEvt();
			
			createForm();
			this.setFormStyle();
		},
		
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
			
			$listRow.append(previewIconTag+nameTag+removeIconTag+sizeTag+progressbarTag);
			$listRow.children(".file-progressbar").progressbar();
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
			//TODO: file명 길이 처리하는 것 option처리 혹은 자동계산 처리 필요
			return name;
		},
		
		_setTooltip : function($listRow, fileName){
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
				  context = FILEUPLOAD.CONTEXT+"/fileupload/image/";
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
				return retObj;			
		},
		
		updateSize : function(index, size){
			var sizeObj = this._formatSize(size);
			var $size = $(".size").eq(index);
			
			$size.children(".toatl-size-unit").text(sizeObj.unit);
			$size.children(".change-size-unit").text(sizeObj.unit);
			$size.children(".total-size").text(sizeObj.size);
		},
		
		updateCurrentSize : function(index, size, progress){
			
			var sizeObj = this._formatSize(size);
			var $size = $(".size").eq(index);
		
			$size.children(".change-size").text(sizeObj.size);
			$size.children(".change-size-unit").text(sizeObj.unit);
			
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
					message = "파일 전송을 완료하였습니다.";
				}else {
					msgClass = "fail-msg";
					message = "파일 전송에 실패하였습니다.";
				}					
				messageTag = "<span class='"+msgClass+"'>"+message+"</span>";
				$(".file-upload-bar").append(messageTag);
				
				
			}
			
			function partMsg(type, index){
				
				switch (type) {
				case "size" :
					msgClass = "fail-msg fail-size";
					message = "업로드 실패, 사이즈 초과 ";
					break;
				
				default :
					msgClass = "fail-msg";
					message = "업로드 실패..";						
				}
				
				fileupload.disableListRow(index);
				fileupload.disableUploadBtn(true);
				
				var $listRow = $(".list-row").eq(index);
				fileupload._removeCancelEvt($listRow);
				
				messageTag = "<span class='"+msgClass+"'>"+message+" : <a class='fail-delete'>삭제</a></span>";
				$(messageTag).insertAfter($listRow);
				$listRow.next().position({
					my : "center",
					at : "center",
					of : $listRow.find(".file-progressbar")
				});
				
				$listRow.next().find(".fail-delete").on("click", function(){
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
			$(BTN.UPLOAD).button("option", "disabled", disabled);
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

			var width = $(BTN.ADD).css("width"), 
				   height = $(BTN.ADD).css("height");

			$(".file-upload").css("width", "600px");

			//positioning input(file) button in front of browse button
			$("input[type='file']").position({
				my : "left top",
				at : "left top",
				of : BTN.ADD
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
			$listRow.last().children(".icon-end").on("click.cancel", function() {
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
			$listRow.last().children(".icon-end").off(".cancel");
			$listRow.last().children(".icon-end").css({"cursor" : "auto"});
		},

		_attachUploadEvt : function() {
			$(BTN.UPLOAD).on("click.upload", function() {
				VFUploadPrepare(); //to define uloading type 
				VFUpload(0);
			});
		},

		_removeUploadEvt : function() {
			$(BTN.UPLOAD).off(".upload");
			$(BTN.UPLOAD).css({"cursor" : "auto"});
		},

		_attachResetEvt : function() {
			$(BTN.RESET).on("click.reset", function() {
				fileupload._reset();
			});
		},

		_removeResetEvt : function() {
			$(BTN.RESET).off(".reset");
		}

	};
