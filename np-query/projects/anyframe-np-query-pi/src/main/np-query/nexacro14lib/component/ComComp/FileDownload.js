//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.1.html	
//
//==============================================================================

if (!nexacro.FileDownload) {
	nexacro.FileDownloadEventInfo = function (obj, id, url, targetfullpath) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;
		this.url = url;
		this.targetfullpath = targetfullpath;
	};
	var _pFileDownloadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileDownloadEventInfo);
	nexacro.FileDownloadEventInfo.prototype = _pFileDownloadEventInfo;
	_pFileDownloadEventInfo._type_name = "FileDownloadEventInfo";

	delete _pFileDownloadEventInfo;

	nexacro.FileDownloadErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
	};
	var _pFileDownloadErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileDownloadErrorEventInfo);
	nexacro.FileDownloadErrorEventInfo.prototype = _pFileDownloadErrorEventInfo;
	_pFileDownloadErrorEventInfo._type_name = "FileDownloadErrorEventInfo";

	delete _pFileDownloadErrorEventInfo;

	nexacro.FileDownload = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);


		this.downloadurl = "";
		this.wordwrap = "char";
		this.downloadfilename = "";


		this._handle = null;
		this._event_list = 
			{
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkeypress" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"ondrag" : 1, 
			"ondrop" : 1, 
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"onsuccess" : 1, 
			"onerror" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onpinchstart" : 1, 
			"onpinch" : 1, 
			"onpinchend" : 1, 
			"onflingstart" : 1, 
			"onfling" : 1, 
			"onflingend" : 1, 
			"onlongpress" : 1, 
			"onslidestart" : 1, 
			"onslide" : 1, 
			"onslideend" : 1
				
		};

		this._accessibility_role = "button";
	};

	var _pFileDownload = nexacro._createPrototype(nexacro.Component, nexacro.FileDownload);
	nexacro.FileDownload.prototype = _pFileDownload;

	_pFileDownload._type_name = "FileDownload";

	_pFileDownload.on_apply_style_align = function (align) {
		var text_elem = this._text_elem;
		if (text_elem && align) {
			var halign = align.halign == "" ? "center" : align._halign;
			var valign = align.valign == "" ? "middle" : align._valign;
			text_elem.setElementAlignXY(halign, valign);
		}
	};

	_pFileDownload.on_apply_style_color = function (color) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.setElementColor(color);
		}
	};

	_pFileDownload.on_apply_style_font = function (font) {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.setElementFont(font);
		}
	};

	_pFileDownload.on_apply_style_accessibility = function (accessibility) {
		if (accessibility) {
			this._control_element.setAccessibility(accessibility);
		}
	};
	_pFileDownload.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}
		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}
		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}
		var align = this.on_find_CurrentStyle_align(pseudo);
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}
		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (curstyle.rtlimagemirroring != rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pFileDownload.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			nexacro._create_filedownload_handle(this.on_load, this);

			var text_elem = new nexacro.TextBoxElement(control_elem);
			this._text_elem = text_elem;
			var halign = this.currentstyle.align.halign == "" ? "left" : this.currentstyle.align._halign;
			var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
			text_elem.setElementSize(this._client_width, this._client_height);
			text_elem.setElementColor(this.currentstyle.color);
			text_elem.setElementFont(this.currentstyle.font);
			text_elem.setElementAlignXY(halign, valign);
			text_elem.setElementLetterSpace(this.currentstyle.letterspace);
		}
	};

	_pFileDownload.on_created_contents = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			text_elem.create();
		}
		this.on_apply_wordwrap();
		this.on_apply_prop_rtldirection();
	};

	_pFileDownload.on_destroy_contents = function () {
		var text_elem = this._text_elem;

		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}

		nexacro._destroy_filedownload_handle(this._handle);
	};

	_pFileDownload.on_change_containerRect = function (width, height) {
		var textElem = this._text_elem;
		if (textElem) {
			textElem.setElementSize(width, height);
		}
	};

	_pFileDownload.set_text = function (text) {
		this.text = text;
		this.on_apply_text();
	};

	_pFileDownload.on_apply_text = function () {
		var control_elem = this._control_element;
		if (this._control_element) {
			var text_elem = this._text_elem;
			if (!text_elem) {
				text_elem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = text_elem;
				this.on_apply_wordwrap();
				text_elem.setElementSize(this._client_width, this._client_height);

				if (this._is_created) {
					var halign = this.currentstyle.align.halign == "" ? "left" : this.currentstyle.align._halign;
					var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
					text_elem.setElementColor(this.currentstyle.color);
					text_elem.setElementFont(this.currentstyle.font);
					text_elem.setElementAlignXY(halign, valign);
					text_elem.setElementLetterSpace(this.currentstyle.letterspace);
					text_elem.create();
				}
			}

			var expr = this.expr;

			if (expr && expr.length > 0) {
				expr = expr.trim().split(":");
				var len = expr.length;
				var parser = new nexacro.ExprParser();
				var conv_expr, exprfn;
				var str;

				if (len == 1) {
					str = expr[0];
				}
				else {
					if (expr[0].trim().toUpperCase() != "EXPR") {
						str = expr.join(":");
					}
					else {
						str = expr.slice(1).join(":");
					}
				}

				conv_expr = parser.makeExpr(this, str);
				exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);

				if (exprfn) {
					try {
						var val = nexacro._toString(exprfn.call(null, this));
						if (val != this.displaytext) {
							this.displaytext = val;
						}
					}
					catch (e) {
						return;
					}
				}
			}
			else {
				this.displaytext = this.text;
			}

			text_elem.setElementText(this.displaytext);
			if (this.displaytext && this.displaytext != "") {
				this._text_width = -1;
				this._text_height = -1;
			}
			else {
				this._text_width = 0;
				this._text_height = 0;
			}
		}
	};

	_pFileDownload.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pFileDownload.set_downloadurl = function (v) {
		if (v != this.downloadurl) {
			this.downloadurl = v;
		}
	};

	_pFileDownload.set_wordwrap = function (v) {
		if (typeof (v) == "string") {
			v = v.toLowerCase();
		}

		if (v != this.wordwrap) {
			this.wordwrap = v;
			this.on_apply_wordwrap();
		}
	};

	_pFileDownload.on_apply_wordwrap = function () {
		if (this._text_elem) {
			this._text_elem.setElementWordWrap(this.wordwrap);
		}
	};

	_pFileDownload.set_downloadfilename = function (v) {
		if (v != this.downloadfilename) {
			this.downloadfilename = v;
		}
	};

	_pFileDownload.download = function (url, targetpath) {
		var ret = false;
		var downloadurl = this.downloadurl;
		var initname = this.downloadfilename;
		if (targetpath != undefined) {
			targetpath = nexacro._toString(targetpath);
		}

		if (url != undefined) {
			url = nexacro._toString(url);
			url = nexacro._getImageLocation(url);

			nexacro._download(url, this._handle, initname, targetpath);
			ret = true;
		}
		else if (downloadurl && downloadurl != undefined && downloadurl != "") {
			downloadurl = application._getServiceLocation(downloadurl);
			nexacro._download(downloadurl, this._handle, initname, targetpath);
			ret = true;
		}
		return ret;
	};

	_pFileDownload.on_fire_onsuccess = function (url, targetfullpath) {
		application._endCommProgress();

		if (this.onsuccess && this.onsuccess._has_handlers && url != "") {
			var evt = new nexacro.FileDownloadEventInfo(this, "onsuccess", url, targetfullpath);
			return this.onsuccess._fireEvent(this, evt);
		}
	};

	_pFileDownload.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri) {
		application._endCommProgress();

		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileDownloadErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
			return this.onerror._fireEvent(this, evt);
		}
	};

	_pFileDownload.on_load = function (status, data, url, errcode, httpcode, errmsg) {
		application._onHttpSystemError(this, true, this, errcode, url, httpcode, url, null);
		if (status < 0) {
			var errormsg = nexacro._GetSystemErrorMsg(this, errcode);
			this.on_fire_onerror(this, "ObjectError", errormsg, this, 9901, null, null);
		}
		else {
			this.on_fire_onsuccess(url, data);
		}
	};

	_pFileDownload.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this.download();
		return ret;
	};

	_pFileDownload.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		if (key_code == 13 || key_code == 32) {
			this.on_fire_onclick("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
		}
		return ret;
	};



	_pFileDownload._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : false, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false
		};
	};

	delete _pFileDownload;

	nexacro.FileDownloadCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FileDownload.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._isSubControl = true;
	};

	var _pFileDownloadCtrl = nexacro._createPrototype(nexacro.FileDownload, nexacro.FileDownloadCtrl);
	nexacro.FileDownloadCtrl.prototype = _pFileDownloadCtrl;
	nexacro._setForControlStyleFinder(_pFileDownloadCtrl);

	_pFileDownloadCtrl._type_name = "FileDownloadControl";

	delete _pFileDownloadCtrl;
}
