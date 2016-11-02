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

if (!nexacro.FileUpload) {
	nexacro.FileUploadItemEventInfo = function (obj, id, idx) {
		this.id = this.eventid = id || "onfileuploaditem";
		this.fromobject = this.fromreferenceobject = obj;

		this.index = idx;
	};
	var _pEventFileUploadItemEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadItemEventInfo);
	nexacro.FileUploadItemEventInfo.prototype = _pEventFileUploadItemEventInfo;
	_pEventFileUploadItemEventInfo._type_name = "FileUploadItemEventInfo";

	delete _pEventFileUploadItemEventInfo;

	nexacro.FileUploadMouseEventInfo = function (obj, id, strButton, altKey, ctrlKey, shiftKey, index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this.id = this.eventid = id || "onmouse";

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = altKey || false;
		this.ctrlKey = ctrlKey || false;
		this.shiftKey = shiftKey || false;
		this.button = strButton || "";
		this.index = obj.index;
		this.screenX = screenX || -1;
		this.screenY = screenY || -1;
		this.canvasX = canvasX || -1;
		this.canvasY = canvasY || -1;
		this.clientX = clientX || -1;
		this.clientY = clientY || -1;
	};
	var _pFileUploadMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadMouseEventInfo);
	nexacro.FileUploadMouseEventInfo.prototype = _pFileUploadMouseEventInfo;
	_pFileUploadMouseEventInfo._type_name = "FileUploadMouseEventInfo";

	delete _pFileUploadMouseEventInfo;

	nexacro.FileUploadLoadEventInfo = function (obj, id, dsArray, code, msg, url) {
		this.id = this.eventid = id || "onsuccess";
		this.fromobject = this.fromreferenceobject = obj;

		this.datasets = dsArray;
		this.errorcode = code;
		this.errormsg = msg;
		this.url = url;
	};
	var _pFileUploadLoadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadLoadEventInfo);
	nexacro.FileUploadLoadEventInfo.prototype = _pFileUploadLoadEventInfo;
	_pFileUploadLoadEventInfo._type_name = "FileUploadLoadEventInfo";

	delete _pFileUploadLoadEventInfo;

	nexacro.FileUploadItemChangeEventInfo = function (obj, id, index, oldvalue, newvalue) {
		this.id = this.eventid = id || "onitemchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.index = obj.index;
		this.oldvalue = obj.oldvalue;
		this.newvalue = obj.value;
	};
	var _pFileUploadItemChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.FileUploadItemChangeEventInfo);
	nexacro.FileUploadItemChangeEventInfo.prototype = _pFileUploadItemChangeEventInfo;
	_pFileUploadItemChangeEventInfo._type_name = "FileUploadItemChangeEventInfo";

	delete _pFileUploadItemChangeEventInfo;

	nexacro.FileUploadErrorEventInfo = function (obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		nexacro.ErrorEventInfo.call(this, obj, id, errortype, errormsg, errorobj, statuscode, requesturi, locationuri);
		this.index = index;
	};
	var _pFileUploadErrorEventInfo = nexacro._createPrototype(nexacro.ErrorEventInfo, nexacro.FileUploadErrorEventInfo);
	nexacro.FileUploadErrorEventInfo.prototype = _pFileUploadErrorEventInfo;
	_pFileUploadErrorEventInfo._type_name = "FileUploadErrorEventInfo";

	delete _pFileUploadErrorEventInfo;

	nexacro.FileUpload_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}

		this.itemheight = null;

		this.buttonbackground = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttongradation = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.buttonfont = null;
		this.buttoncolor = null;
		this.buttonsize = null;
		this.buttontext = null;

		this.editbackground = null;
		this.editborder = null;
		this.editbordertype = null;
		this.editgradation = null;
		this.editpadding = null;
		this.editmargin = null;
		this.editfont = null;
		this.editcolor = null;
		this.editaccessibility = null;
		this.buttonaccessibility = null;
	};

	var _pFileUploadStyle = nexacro._createPrototype(nexacro.Style, nexacro.FileUpload_Style);
	nexacro.FileUpload_Style.prototype = _pFileUploadStyle;
	_pFileUploadStyle._type_name = "FileUploadStyle";

	eval(nexacro._createValueAttributeEvalStr("_pFileUploadStyle", "itemheight"));
	eval(nexacro._createValueAttributeEvalStr("_pFileUploadStyle", "buttonsize"));
	eval(nexacro._createValueAttributeEvalStr("_pFileUploadStyle", "buttontext"));
	eval(nexacro._createColorAttributeEvalStr("_pFileUploadStyle", "editcolor"));
	eval(nexacro._createColorAttributeEvalStr("_pFileUploadStyle", "buttoncolor"));
	eval(nexacro._createBorderAttributeEvalStr("_pFileUploadStyle", "editborder"));
	eval(nexacro._createBorderAttributeEvalStr("_pFileUploadStyle", "buttonborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pFileUploadStyle", "editbordertype"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pFileUploadStyle", "buttonbordertype"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pFileUploadStyle", "editbackground"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pFileUploadStyle", "buttonbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pFileUploadStyle", "editgradation"));
	eval(nexacro._createGradationAttributeEvalStr("_pFileUploadStyle", "buttongradation"));
	eval(nexacro._createPaddingAttributeEvalStr("_pFileUploadStyle", "editpadding"));
	eval(nexacro._createPaddingAttributeEvalStr("_pFileUploadStyle", "buttonpadding"));
	eval(nexacro._createMarginAttributeEvalStr("_pFileUploadStyle", "editmargin"));
	eval(nexacro._createMarginAttributeEvalStr("_pFileUploadStyle", "buttonmargin"));
	eval(nexacro._createFontAttributeEvalStr("_pFileUploadStyle", "editfont"));
	eval(nexacro._createFontAttributeEvalStr("_pFileUploadStyle", "buttonfont"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pFileUploadStyle", "editaccessibility"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pFileUploadStyle", "buttonaccessibility"));

	_pFileUploadStyle.__custom_emptyObject = function () {
		this.itemheight = null;

		this.buttonbackground = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttongradation = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.buttonfont = null;
		this.buttoncolor = null;
		this.buttonsize = null;
		this.buttontext = null;

		this.editbackground = null;
		this.editborder = null;
		this.editbordertype = null;
		this.editgradation = null;
		this.editpadding = null;
		this.editmargin = null;
		this.editfont = null;
		this.editcolor = null;
		this.editaccessibility = null;
		this.buttonaccessibility = null;
	};

	_pFileUploadStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.itemheight && this.itemheight._is_empty) {
			val += "itemheight" + this.itemheight._value + "; ";
		}

		if (this.buttonsize && this.buttonsize._is_empty) {
			val += "buttonsize" + this.buttonsize._value + "; ";
		}
		if (this.buttontext && this.buttontext._is_empty) {
			val += "buttontext" + this.buttontext._value + "; ";
		}
		if (this.buttonbackground && this.buttonbackground._is_empty) {
			val += "buttonbackground" + this.buttonbackground._value + "; ";
		}
		if (this.buttonborder && this.buttonborder._is_empty) {
			val += "buttonborder" + this.buttonborder._value + "; ";
		}
		if (this.buttonbordertype && this.buttonbordertype._is_empty) {
			val += "buttonbordertype" + this.buttonbordertype._value + "; ";
		}
		if (this.buttongradation && this.buttongradation._is_empty) {
			val += "buttongradation" + this.buttongradation._value + "; ";
		}
		if (this.buttonpadding && this.buttonpadding._is_empty) {
			val += "buttonpadding" + this.buttonpadding._value + "; ";
		}
		if (this.buttonmargin && this.buttonmargin._is_empty) {
			val += "buttonmargin" + this.buttonmargin._value + "; ";
		}
		if (this.buttonfont && this.buttonfont._is_empty) {
			val += "buttonfont" + this.buttonfont._value + "; ";
		}
		if (this.buttoncolor && this.buttoncolor._is_empty) {
			val += "buttoncolor" + this.buttoncolor._value + "; ";
		}

		if (this.editbackground && this.editbackground._is_empty) {
			val += "editbackground" + this.editbackground._value + "; ";
		}
		if (this.editborder && this.editborder._is_empty) {
			val += "editborder" + this.editborder._value + "; ";
		}
		if (this.editbordertype && this.editbordertype._is_empty) {
			val += "editbordertype" + this.editbordertype._value + "; ";
		}
		if (this.editgradation && this.editgradation._is_empty) {
			val += "editgradation" + this.editgradation._value + "; ";
		}
		if (this.editpadding && this.editpadding._is_empty) {
			val += "editpadding" + this.editpadding._value + "; ";
		}
		if (this.editmargin && this.editmargin._is_empty) {
			val += "editmargin" + this.editmargin._value + "; ";
		}
		if (this.editfont && this.editfont._is_empty) {
			val += "editfont" + this.editfont._value + "; ";
		}
		if (this.editcolor && this.editcolor._is_empty) {
			val += "editcolor" + this.editcolor._value + "; ";
		}
		if (this.editaccessibility && this.editaccessibility._is_empty) {
			val += "editaccessibility" + this.editaccessibility._value + "; ";
		}
		if (this.buttonaccessibility && this.buttonaccessibility._is_empty) {
			val += "buttonaccessibility" + this.buttonaccessibility._value + "; ";
		}

		return val;
	};

	nexacro.FileUpload_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.itemheight = null;

		this.buttonbackground = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttongradation = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.buttonfont = null;
		this.buttoncolor = null;
		this.buttonsize = null;
		this.buttontext = null;

		this.editbackground = null;
		this.editborder = null;
		this.editbordertype = null;
		this.editgradation = null;
		this.editpadding = null;
		this.editmargin = null;
		this.editfont = null;
		this.editcolor = null;
		this.editaccessibility = null;
		this.buttonaccessibility = null;
	};

	var _pFileUploadCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.FileUpload_CurrentStyle);
	nexacro.FileUpload_CurrentStyle.prototype = _pFileUploadCurrentStyle;

	_pFileUploadCurrentStyle.__custom_emptyObject = _pFileUploadStyle.__custom_emptyObject;
	_pFileUploadCurrentStyle.__get_custom_style_value = _pFileUploadStyle.__get_custom_style_value;

	delete _pFileUploadStyle;
	delete _pFileUploadCurrentStyle;

	nexacro.FileUpload = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);


		this.scrollbars = "autoboth";
		this.filecolumn = "";
		this.innerdataset = null;
		this._innerdataset = null;
		this.text = "";
		this.index = -1;
		this.async = "false";
		this.retry = 3;
		this.timeout = 30;
		this.itemheight = 18;
		this.itemcount = 1;
		this.uploadurl = "";
		this.multiselect = false;
		this._multiselect = false;
		this.filelist = [];


		this._is_scrollable = true;
		this._scrollbars = 3;
		this._items = [];
		this._handle = null;
		this._last_id = -1;
		this._editFlag = null;
		this._buttonFlag = true;
		this._set_focus_dir = -1;

		this._want_tab = true;
		this._want_arrow = false;
		this.filepathedits = new nexacro.Collection();
		this.filefindbuttons = new nexacro.Collection();

		this._onPopupWin = false;

		this._accessibility_role = "fileupload";
		this._first_focus = false;

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
			"onmousedown" : 1, 
			"onmouseup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmousewheel" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"onsuccess" : 1, 
			"onerror" : 1, 
			"onappenditem" : 1, 
			"ondeleteitem" : 1, 
			"onitemclick" : 1, 
			"onfindclick" : 1, 
			"onitemchanged" : 1, 
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
	};

	var _pFileUpload = nexacro._createPrototype(nexacro.Component, nexacro.FileUpload);
	nexacro.FileUpload.prototype = _pFileUpload;

	_pFileUpload._type_name = "FileUpload";

	_pFileUpload._defaultButtontext = nexacro._getCachedStyleObj("buttontext", "find");
	_pFileUpload._defaultButtonsize = nexacro._getCachedStyleObj("buttonsize", "18");
	_pFileUpload._defaultItemheight = nexacro._getCachedStyleObj("itemheight", "18");

	_pFileUpload.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;


		var padding = this.on_find_CurrentStyle_padding(pseudo);
		if (padding != curstyle.padding) {
			curstyle.padding = padding;
			this.on_apply_style_padding(padding);
		}

		var align = this.on_find_CurrentStyle_align(pseudo);
		if (align != curstyle.align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (font != curstyle.font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}

		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (letterspace != curstyle.letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (color != curstyle.color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}


		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}


		var editbackground = this.on_find_CurrentStyle_editbackground(pseudo);
		if (editbackground != curstyle.editbackground) {
			curstyle.editbackground = editbackground;
		}

		var editborder = this.on_find_CurrentStyle_editborder(pseudo);
		if (editborder != curstyle.editborder) {
			curstyle.editborder = editborder;
		}

		var editbordertype = this.on_find_CurrentStyle_editbordertype(pseudo);
		if (editbordertype != curstyle.editbordertype) {
			curstyle.editbordertype = editbordertype;
		}

		var editgradation = this.on_find_CurrentStyle_editgradation(pseudo);
		if (editgradation != curstyle.editgradation) {
			curstyle.editgradation = editgradation;
		}

		var editpadding = this.on_find_CurrentStyle_editpadding(pseudo);
		if (editpadding != curstyle.editpadding) {
			curstyle.editpadding = editpadding;
		}

		var editmargin = this.on_find_CurrentStyle_editmargin(pseudo);
		if (editmargin != curstyle.editmargin) {
			curstyle.editmargin = editmargin;
		}

		var editfont = this.on_find_CurrentStyle_editfont(pseudo);
		if (editfont != curstyle.editfont) {
			curstyle.editfont = editfont;
		}

		var editcolor = this.on_find_CurrentStyle_editcolor(pseudo);
		if (editcolor != curstyle.editcolor) {
			curstyle.editcolor = editcolor;
		}


		var buttonbackground = this.on_find_CurrentStyle_buttonbackground(pseudo);
		if (buttonbackground != curstyle.buttonbackground) {
			curstyle.buttonbackground = buttonbackground;
		}

		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		if (buttonborder != curstyle.buttonborder) {
			curstyle.buttonborder = buttonborder;
		}

		var buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(pseudo);
		if (buttonbordertype != curstyle.buttonbordertype) {
			curstyle.buttonbordertype = buttonbordertype;
		}

		var buttongradation = this.on_find_CurrentStyle_buttongradation(pseudo);
		if (buttongradation != curstyle.buttongradation) {
			curstyle.buttongradation = buttongradation;
		}

		var buttonpadding = this.on_find_CurrentStyle_buttonpadding(pseudo);
		if (buttonpadding != curstyle.buttonpadding) {
			curstyle.buttonpadding = buttonpadding;
		}

		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(pseudo);
		if (buttonmargin != curstyle.buttonmargin) {
			curstyle.buttonmargin = buttonmargin;
		}

		var buttonfont = this.on_find_CurrentStyle_buttonfont(pseudo);
		if (buttonfont != curstyle.buttonfont) {
			curstyle.buttonfont = buttonfont;
		}

		var buttoncolor = this.on_find_CurrentStyle_buttoncolor(pseudo);
		if (buttoncolor != curstyle.buttoncolor) {
			curstyle.buttoncolor = buttoncolor;
		}

		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);
		if (buttonsize != curstyle.buttonsize) {
			curstyle.buttonsize = buttonsize;
			this.on_apply_style_buttonsize(buttonsize);
		}

		var buttontext = this.on_find_CurrentStyle_buttontext(pseudo);
		if (buttontext != curstyle.buttontext) {
			curstyle.buttontext = buttontext;
			this.on_apply_style_buttontext(buttontext);
		}

		var itemheight = this.on_find_CurrentStyle_itemheight(pseudo);
		if (itemheight != curstyle.itemheight) {
			curstyle.itemheight = itemheight;
			this.on_apply_style_itemheight(itemheight);
		}

		var editaccessibility = this.on_find_CurrentStyle_editaccessibility(pseudo);
		if (editaccessibility != curstyle.editaccessibility) {
			curstyle.editaccessibility = editaccessibility;
			this.on_find_CurrentStyle_editaccessibility(editaccessibility);
		}
		var buttonaccessibility = this.on_find_CurrentStyle_buttonaccessibility(pseudo);
		if (buttonaccessibility != curstyle.buttonaccessibility) {
			curstyle.buttonaccessibility = buttonaccessibility;
			this.on_apply_style_buttonaccessibility(buttonaccessibility);
		}
	};

	_pFileUpload.on_create_custom_style = function () {
		return new nexacro.FileUpload_Style(this);
	};

	_pFileUpload.on_create_custom_currentStyles = function () {
		return new nexacro.FileUpload_CurrentStyle();
	};


	_pFileUpload.on_find_CurrentStyle_editbackground = function (pseudo) {
		var editbackground = this._find_pseudo_obj("editbackground", pseudo, "background");
		return editbackground;
	};

	_pFileUpload.on_find_CurrentStyle_editborder = function (pseudo) {
		var editborder = this._find_pseudo_obj("editborder", pseudo, "border");
		return editborder;
	};

	_pFileUpload.on_find_CurrentStyle_editbordertype = function (pseudo) {
		var editbordertype = this._find_pseudo_obj("editbordertype", pseudo, "bordertype");
		return editbordertype;
	};

	_pFileUpload.on_find_CurrentStyle_editgradation = function (pseudo) {
		var editgradation = this._find_pseudo_obj("editgradation", pseudo, "gradation");
		return editgradation;
	};

	_pFileUpload.on_find_CurrentStyle_editpadding = function (pseudo) {
		var editpadding = this._find_pseudo_obj("editpadding", pseudo, "padding");
		return editpadding;
	};

	_pFileUpload.on_find_CurrentStyle_editmargin = function (pseudo) {
		var editmargin = this._find_pseudo_obj("editmargin", pseudo, "margin");
		return editmargin;
	};

	_pFileUpload.on_find_CurrentStyle_editfont = function (pseudo) {
		var editfont = this._find_pseudo_obj("editfont", pseudo, "font");
		return editfont;
	};

	_pFileUpload.on_find_CurrentStyle_editcolor = function (pseudo) {
		var editcolor = this._find_pseudo_obj("editcolor", pseudo, "color");
		return editcolor;
	};

	_pFileUpload.on_find_CurrentStyle_buttonbackground = function (pseudo) {
		var buttonbackground = this._find_pseudo_obj("buttonbackground", pseudo, "background");
		return buttonbackground;
	};

	_pFileUpload.on_find_CurrentStyle_buttonborder = function (pseudo) {
		var buttonborder = this._find_pseudo_obj("buttonborder", pseudo, "border");
		return buttonborder;
	};

	_pFileUpload.on_find_CurrentStyle_buttonbordertype = function (pseudo) {
		var buttonbordertype = this._find_pseudo_obj("buttonbordertype", pseudo, "bordertype");
		return buttonbordertype;
	};

	_pFileUpload.on_find_CurrentStyle_buttongradation = function (pseudo) {
		var buttongradation = this._find_pseudo_obj("buttongradation", pseudo, "gradation");
		return buttongradation;
	};

	_pFileUpload.on_find_CurrentStyle_buttonpadding = function (pseudo) {
		var buttonpadding = this._find_pseudo_obj("buttonpadding", pseudo, "padding");
		return buttonpadding;
	};

	_pFileUpload.on_find_CurrentStyle_buttonmargin = function (pseudo) {
		var buttonmargin = this._find_pseudo_obj("buttonmargin", pseudo, "margin");
		return buttonmargin;
	};

	_pFileUpload.on_find_CurrentStyle_buttonfont = function (pseudo) {
		var buttonfont = this._find_pseudo_obj("buttonfont", pseudo, "font");
		return buttonfont;
	};

	_pFileUpload.on_find_CurrentStyle_buttoncolor = function (pseudo) {
		var buttoncolor = this._find_pseudo_obj("buttoncolor", pseudo, "color");
		return buttoncolor;
	};

	_pFileUpload.on_find_CurrentStyle_buttonsize = function (pseudo) {
		var buttonsize = this._find_pseudo_obj("buttonsize", pseudo);
		return buttonsize ? buttonsize : this._defaultButtonsize;
	};

	_pFileUpload.on_find_CurrentStyle_buttontext = function (pseudo) {
		var buttontext = this._find_pseudo_obj("buttontext", pseudo);
		return buttontext ? buttontext : this._defaultButtontext;
	};

	_pFileUpload.on_find_CurrentStyle_itemheight = function (pseudo) {
		var itemheight = this._find_pseudo_obj("itemheight", pseudo);
		return itemheight ? itemheight : this._defaultItemheight;
	};

	_pFileUpload.on_find_CurrentStyle_editaccessibility = function (pseudo) {
		return this._find_pseudo_obj("editaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pFileUpload.on_find_CurrentStyle_buttonaccessibility = function (pseudo) {
		return this._find_pseudo_obj("buttonaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};


	_pFileUpload.on_update_style_editbackground = function () {
		var editbackground = this.currentstyle.editbackground = this.on_find_CurrentStyle_editbackground(this._pseudo);
		this.on_apply_style_editbackground(editbackground);
	};

	_pFileUpload.on_update_style_editborder = function () {
		var editborder = this.currentstyle.editborder = this.on_find_CurrentStyle_editborder(this._pseudo);
		this.on_apply_style_editborder(editborder);
	};

	_pFileUpload.on_update_style_editbordertype = function () {
		var editbordertype = this.currentstyle.editbordertype = this.on_find_CurrentStyle_editbordertype(this._pseudo);
		this.on_apply_style_editbordertype(editbordertype);
	};

	_pFileUpload.on_update_style_editgradation = function () {
		var editgradation = this.currentstyle.editgradation = this.on_find_CurrentStyle_editgradation(this._pseudo);
		this.on_apply_style_editgradation(editgradation);
	};

	_pFileUpload.on_update_style_editpadding = function () {
		var editpadding = this.currentstyle.editpadding = this.on_find_CurrentStyle_editpadding(this._pseudo);
		this.on_apply_style_editpadding(editpadding);
	};

	_pFileUpload.on_update_style_editmargin = function () {
		var editmargin = this.currentstyle.editmargin = this.on_find_CurrentStyle_editmargin(this._pseudo);
		this.on_apply_style_editmargin(editmargin);
	};

	_pFileUpload.on_update_style_editfont = function () {
		var editfont = this.currentstyle.editfont = this.on_find_CurrentStyle_editfont(this._pseudo);
		this.on_apply_style_editfont(editfont);
	};

	_pFileUpload.on_update_style_editcolor = function () {
		var editcolor = this.currentstyle.editcolor = this.on_find_CurrentStyle_editcolor(this._pseudo);
		this.on_apply_style_editcolor(editcolor);
	};

	_pFileUpload.on_update_style_buttonbackground = function () {
		var buttonbackground = this.currentstyle.buttonbackground = this.on_find_CurrentStyle_buttonbackground(this._pseudo);
		this.on_apply_style_buttonbackground(buttonbackground);
	};

	_pFileUpload.on_update_style_buttonborder = function () {
		var buttonborder = this.currentstyle.buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo);
		this.on_apply_style_buttonborder(buttonborder);
	};

	_pFileUpload.on_update_style_buttonbordertype = function () {
		var buttonbordertype = this.currentstyle.buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(this._pseudo);
		this.on_apply_style_buttonbordertype(buttonbordertype);
	};

	_pFileUpload.on_update_style_buttongradation = function () {
		var buttongradation = this.currentstyle.buttongradation = this.on_find_CurrentStyle_buttongradation(this._pseudo);
		this.on_apply_style_buttongradation(buttongradation);
	};

	_pFileUpload.on_update_style_buttonpadding = function () {
		var buttonpadding = this.currentstyle.buttonpadding = this.on_find_CurrentStyle_buttonpadding(this._pseudo);
		this.on_apply_style_buttonpadding(buttonpadding);
	};

	_pFileUpload.on_update_style_buttonmargin = function () {
		var buttonmargin = this.currentstyle.buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);
		this.on_apply_style_buttonmargin(buttonmargin);
	};

	_pFileUpload.on_update_style_buttonfont = function () {
		var buttonfont = this.currentstyle.buttonfont = this.on_find_CurrentStyle_buttonfont(this._pseudo);
		this.on_apply_style_buttonfont(buttonfont);
	};

	_pFileUpload.on_update_style_buttoncolor = function () {
		var buttoncolor = this.currentstyle.buttoncolor = this.on_find_CurrentStyle_buttoncolor(this._pseudo);
		this.on_apply_style_buttoncolor(buttoncolor);
	};

	_pFileUpload.on_update_style_buttonsize = function () {
		var buttonsize = this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);
		this.on_apply_style_buttonsize(buttonsize);
	};

	_pFileUpload.on_update_style_buttontext = function () {
		var buttontext = this.currentstyle.buttontext = this.on_find_CurrentStyle_buttontext(this._pseudo);
		this.on_apply_style_buttontext(buttontext);
	};

	_pFileUpload.on_update_style_itemheight = function () {
		var itemheight = this.currentstyle.itemheight = this.on_find_CurrentStyle_itemheight(this._pseudo);
		this.on_apply_style_itemheight(itemheight);
	};

	_pFileUpload.on_update_style_editaccessibility = function () {
		var editaccessibility = this.currentstyle.editaccessibility = this.on_find_CurrentStyle_editaccessibility(this._pseudo);
		this.on_apply_style_editaccessibility(editaccessibility);
	};

	_pFileUpload.on_update_style_buttonaccessibility = function () {
		var buttonaccessibility = this.currentstyle.buttonaccessibility = this.on_find_CurrentStyle_buttonaccessibility(this._pseudo);
		this.on_apply_style_buttonaccessibility(buttonaccessibility);
	};


	_pFileUpload.on_apply_style_padding = function (padding) {
		var items = this._items;
		var item_len = items.length;
		var item_width = this._client_width - padding.right;
		var item_height = this.on_find_CurrentStyle_itemheight(this._pseudo);

		for (var i = 0; i < item_len; i++) {
			items[i].move(padding.left, (itemheight * i + padding.top), item_width, (item_height * (i + 1) + padding.top), null, null);
		}
	};

	_pFileUpload.on_apply_style_cursor = function (cursor) {
		var control_elem = this._control_element;
		var items = this._items;
		var item_len = items.length;
		if (control_elem) {
			control_elem.setElementCursor(cursor);
			for (var i = 0; i < item_len; i++) {
				items[i].on_apply_style_cursor(cursor);
			}
		}
	};

	_pFileUpload.on_apply_style_editbackground = function (editbackground) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_background(editbackground);
			}
		}
	};

	_pFileUpload.on_apply_style_editborder = function (editborder) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_border(editborder);
			}
		}
	};

	_pFileUpload.on_apply_style_editbordertype = function (editbordertype) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_bordertype(editbordertype);
			}
		}
	};

	_pFileUpload.on_apply_style_editgradation = function (editgradation) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_gradation(editgradation);
			}
		}
	};

	_pFileUpload.on_apply_style_editpadding = function (editpadding) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_update_style_padding(editpadding);
			}
		}
	};

	_pFileUpload.on_apply_style_editmargin = function (editmargin) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_margin(editmargin);
			}
		}
	};

	_pFileUpload.on_apply_style_editfont = function (editfont) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_font(editfont);
			}
		}
	};

	_pFileUpload.on_apply_style_editcolor = function (editcolor) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_color(editcolor);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonbackground = function (buttonbackground) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_background(buttonbackground);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonborder = function (buttonborder) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_border(buttonborder);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonbordertype = function (buttonbordertype) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_bordertype(buttonbordertype);
			}
		}
	};

	_pFileUpload.on_apply_style_buttongradation = function (buttongradation) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_gradation(buttongradation);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonpadding = function (buttonpadding) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_update_style_padding(buttonpadding);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonmargin = function (buttonmargin) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_margin(buttonmargin);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonfont = function (buttonfont) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_font(buttonfont);
			}
		}
	};

	_pFileUpload.on_apply_style_buttoncolor = function (buttoncolor) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_color(buttoncolor);
			}
		}
	};

	_pFileUpload.on_apply_style_buttonsize = function (buttonsize) {
		this.on_change_containerRect();
	};

	_pFileUpload.on_apply_style_buttontext = function (buttontext) {
		if (buttontext == null) {
			buttontext = this._defaultButtontext;
		}

		var items = this._items;
		var item_len = items.length;
		if (items == null) {
			return;
		}
		for (var i = 0; i < item_len; i++) {
			items[i].on_apply_style_buttontext(buttontext);
		}
	};

	_pFileUpload.on_apply_style_itemheight = function (itemheight) {
		this.on_change_containerRect();
		this.resetScroll();
	};

	_pFileUpload.on_apply_style_align = function (align) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitemedit) {
				items[i].fileitemedit.style.set_align(align);
			}
		}
	};

	_pFileUpload.on_apply_style_editaccessibility = function (editaccessibility) {
		var iLen = this._items.length;
		var item = null;
		var control_elem = null;

		if (editaccessibility) {
			for (var i = 0; i < iLen; i++) {
				item = this._getItem(i);
				if (item.fileitemedit) {
					item.fileitemedit.on_apply_style_accessibility(editaccessibility);
				}
			}
		}
	};

	_pFileUpload.on_apply_style_buttonaccessibility = function (buttonaccessibility) {
		var iLen = this._items.length;
		var item = null;

		if (buttonaccessibility) {
			for (var i = 0; i < iLen; i++) {
				item = this._getItem(i);
				if (item.fileitembutton) {
					item.fileitembutton.on_apply_style_accessibility(buttonaccessibility);
				}
			}
		}
	};

	_pFileUpload.on_apply_style_letterspace = function (letterspace) {
		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].fileitembutton) {
				items[i].fileitembutton.on_apply_style_letterspace(letterspace);
			}
			if (items[i].fileitemedit) {
				items[i].fileitemedit.on_apply_style_letterspace(letterspace);
			}
		}
	};

	_pFileUpload.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var items = this._items;
			var itemcount = this.itemcount;
			for (var i = 0; i < itemcount; i++) {
				var item = this._createFileItem(i, 0, 0, 0, 0);
				this.filepathedits.add_item(item.id, item.fileitemedit);
				this.filefindbuttons.add_item(item.id, item.fileitembutton);
				items[i] = item;
			}
		}
	};

	_pFileUpload.on_created_contents = function () {
		var ranid = new Date().valueOf().toString();
		nexacro._create_hidden_frame(this._unique_id, ranid, this.on_load, this);
		ranid = null;
		this.on_apply_index();
		this.on_apply_innerdataset();
		this.on_apply_filecolumn();
		this.on_apply_prop_enable(this._isEnable());
		if (nexacro._enableaccessibility) {
			this.on_apply_style_editaccessibility(this.currentstyle.editaccessibility = this.on_find_CurrentStyle_editaccessibility(this._pseudo));
			this.on_apply_style_buttonaccessibility(this.currentstyle.buttonaccessibility = this.on_find_CurrentStyle_buttonaccessibility(this._pseudo));
		}

		var items = this._items;
		var itemcount = this.itemcount;
		for (var i = 0; i < itemcount; i++) {
			items[i].on_created();
			items[i]._setEventHandler("onfindclick", this.on_notify_onfindclick, this);
			items[i]._setEventHandler("onitemclick", this.on_notify_onitemclick, this);

			if (nexacro._enableaccessibility) {
				items[i]._setAccessibilityInfoIndex(i + 1);
				items[i]._setAccessibilityInfoCount(itemcount);
			}
		}
		;

		this._onRecalcScrollSize();
		this._onResetScrollBar();
		this._updateClientSize(this._control_element);
		this.on_apply_style_buttontext(this.currentstyle.buttontext);
		this.on_apply_style_letterspace(this.currentstyle.letterspace);
		this.on_change_containerRect();
		this.on_apply_prop_rtldirection();
	};

	_pFileUpload.on_destroy_contents = function () {
		var name = this.name;
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].destroy();
		}
		this.filelist = null;
		this._items = null;

		this.filepathedits.clear();
		this.filepathedits = null;
		this.filefindbuttons.clear();
		this.filefindbuttons = null;
		nexacro._destroy_hidden_frame(this._unique_id, this, this._handle);
	};

	_pFileUpload.on_change_containerRect = function (width, height) {
		var items = this._items;
		var item_len = items.length;

		if (item_len <= 0) {
			return;
		}

		var pseudo = this._pseudo;
		var client_width = this._client_width;
		var client_left = this._client_left;
		var client_top = this._client_top;
		var item_left, item_top;
		var itemheight = parseInt(this.on_find_CurrentStyle_itemheight(pseudo), 10);
		var buttonsize = parseInt(this.on_find_CurrentStyle_buttonsize(pseudo), 10);
		var padding = this.on_find_CurrentStyle_padding(pseudo);

		var draw_width = buttonsize + padding.left + padding.right;

		var item_width = client_width;

		if (draw_width > client_width) {
			item_left = client_left - padding.left;
		}
		else {
			item_left = client_left - padding.left;
		}

		for (var i = 0; i < item_len; i++) {
			item_top = itemheight * i;

			items[i].move(item_left, item_top, item_width, itemheight, null, null);
			items[i].on_apply_style_itemheight(itemheight);
			items[i].on_apply_style_buttonsize(buttonsize);
		}
	};

	_pFileUpload.resetScroll = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._onRecalcScrollSize();
			this._updateClientSize(control_elem);
		}
	};

	_pFileUpload._onRecalcScrollSize = function (fromComp) {
		var control_elem = this.getElement();
		if (control_elem) {
			var pseudo = this._pseudo;

			var vscroll = this.vscrollbar;
			var hscroll = this.hscrollbar;

			var height = this.on_find_CurrentStyle_itemheight(pseudo);
			var border = this.on_find_CurrentStyle_border(pseudo);
			var padding = this.on_find_CurrentStyle_padding(pseudo);

			var scrollHeight = this.itemcount * height;
			var scrollWidth = this._client_width;
			if (scrollHeight > this._client_height) {
				if (vscroll) {
					scrollWidth -= vscroll._adjust_width;
				}
				else {
					scrollWidth -= nexacro.Component.SCROLLBAR_DEFAULT_SIZE;
				}
			}

			control_elem.setElementScrollMaxSize(scrollWidth, scrollHeight);
		}
	};

	_pFileUpload.on_hscroll = function (obj, e) {
		if (this.onhscroll && this.onhscroll._has_handlers) {
			e.fromobject = this;
			this.onhscroll._fireEvent(this, e);
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementHScrollPos(e.pos);
		}
		return true;
	};

	_pFileUpload.on_vscroll = function (obj, e) {
		if (this.onvscroll && this.onvscroll._has_handlers) {
			e.fromobject = this;
			this.onvscroll._fireEvent(this, e);
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementVScrollPos(e.pos);
		}
		return true;
	};

	_pFileUpload.set_multiselect = function (v) {
		if (v != this.multiselect) {
			this.multiselect = v;
			v = nexacro._toBoolean(v);
			if (v != this._multiselect) {
				this._multiselect = v;
				this.on_apply_multiselect(v);
			}
		}
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 10) {
		_pFileUpload.on_apply_multiselect = nexacro._emptyFn;
	}
	else {
		_pFileUpload.on_apply_multiselect = function () {
			var control_elem = this.getElement();
			if (control_elem) {
				var items = this._items;
				var item_len = items.length;
				var multi_select = this._multiselect;
				var comp_name = this._unique_id;
				var handle = this._handle;

				for (var i = 0; i < item_len; i++) {
					nexacro._setMultipleFile(comp_name, items[i].name, multi_select, items[i]);
				}
			}
		};
	}

	_pFileUpload.set_uploadurl = function (v) {
		if (v != this.uploadurl) {
			this.uploadurl = v;
		}
	};

	_pFileUpload.set_itemcount = function (v) {
		var val = parseInt(v) | 0;

		if (val != this.itemcount) {
			this._old_itemcount = this.itemcount;
			this.itemcount = val;
			this.on_apply_itemcount();
		}
	};

	_pFileUpload.on_apply_itemcount = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var pseudo = this._pseudo;
			var old_itemcnt = this._old_itemcount;
			var itemcnt = this.itemcount;
			var items = this._items;
			var item_len = items.length;
			var client_left = this._client_left;
			var client_top = this._client_top;
			var client_width = this._client_width;
			var itemheight = parseInt(this.on_find_CurrentStyle_itemheight(pseudo), 10);
			var buttonsize = parseInt(this.on_find_CurrentStyle_buttonsize(pseudo), 10);
			var buttontext = this.on_find_CurrentStyle_buttontext(pseudo);

			while (item_len && old_itemcnt > itemcnt) {
				old_itemcnt--;
				items.pop().destroy();
			}

			for (var i = item_len; i < itemcnt; i++) {
				var item_left = client_left;
				var item_top = client_top + (itemheight * i);
				var item_width = client_width;

				var item = this._createFileItem(i, item_left, item_top, item_width, itemheight);
				this.filepathedits.add_item(item.id, item.fileitemedit);
				this.filefindbuttons.add_item(item.id, item.fileitembutton);
				this._items[i] = item;
			}
			this.on_change_containerRect();
			this.on_apply_style_buttontext(buttontext);
			this.resetScroll();
		}
	};

	_pFileUpload.set_itemheight = function (v) {
		var val = parseInt(v) | 0;

		if (val != this.itemheight) {
			this.itemheight = val;
			this.on_apply_itemheight(val);
		}
	};

	_pFileUpload.on_apply_itemheight = function (itemheight) {
		var control_elem = this.getElement();
		if (control_elem) {
			this.style.set_itemheight(itemheight);
		}
	};

	_pFileUpload.set_timeout = function (v) {
		if (v != this.timeout) {
			this.timeout = v;
		}
	};

	_pFileUpload.set_retry = function (v) {
		if (v != this.retry) {
			this.retry = v;
		}
	};

	_pFileUpload.set_async = function (v) {
		if (v != this.async) {
			this.async = v;
		}
	};

	_pFileUpload.set_index = function (v) {
		if (v != this.index) {
			this.index = v;
			this.on_apply_index(v);
			this._setAccessibilityStatSelected(v);
		}
		;
	};

	_pFileUpload.on_apply_index = function (index) {
		var control_elem = this.getElement();
		if (control_elem) {
			var item = this._items[index];
			if (item) {
				if (this._editFlag) {
					item.fileitemedit.setFocus(false);
				}

				if (this._buttonFlag) {
					item.fileitembutton.setFocus(false);
				}

				var last_comp = item._getLastFocused();
				this.value = item.value;
			}
		}
	};

	_pFileUpload.set_text = function (v) {
	};

	_pFileUpload._setText = function (v) {
		if (v != this.text) {
			this.text = v;
		}
		return this.text;
	};

	_pFileUpload.on_apply_text = function (text) {
	};

	_pFileUpload.set_value = function (v) {
	};

	_pFileUpload._setValue = function (v) {
		if (v != this.value) {
			this.value = v;
		}
	};
	_pFileUpload.on_apply_value = function (value) {
	};

	_pFileUpload.setInnerDataset = function (obj) {
		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset();
		}
		else if (obj instanceof nexacro.Dataset) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset();
		}
	};

	_pFileUpload._setInnerDatasetStr = function (str) {
		if (!str) {
			this._innerdataset = null;
			this.innerdataset = "";
		}
		else {
			str = str.replace("@", "");
			this._innerdataset = this._findDataset(str);
			this.innerdataset = str;
		}
	};

	_pFileUpload.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pFileUpload.set_innerdataset = function (str) {
		if (typeof str != "string") {
			this.setInnerDataset(str);
			return;
		}
		if (str != this.innerdataset) {
			if (!str) {
				this._innerdataset = null;
				this.innerdataset = "";
			}
			else {
				str = str.replace("@", "");
				this._innerdataset = this._findDataset(str);
				this.innerdataset = str;
			}
			this.on_apply_innerdataset();
		}
		else if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset();
		}
		return this.innerdataset;
	};

	_pFileUpload.on_apply_innerdataset = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this.on_apply_filecolumn();
		}
	};

	_pFileUpload.set_filecolumn = function (v) {
		if (v != this.filecolumn) {
			this.filecolumn = v;
			this.on_apply_filecolumn(v);
		}
	};

	_pFileUpload.on_apply_filecolumn = function (filecolumn) {
		var control_elem = this.getElement();
		if (control_elem && this._innerdataset) {
			var items = this._items;
			for (var i = 0; i < items.length; i++) {
				var filecolumn = this._innerdataset.getColumn(i, filecolumn);
				if (filecolumn) {
					items[i].set_value(filecolumn);
					filecolumn = 0;
				}
			}
		}
	};

	_pFileUpload.upload = function (v) {
		var ret = false;
		var uploadurl;

		if (v == undefined) {
			if (this.uploadurl) {
				uploadurl = application._getServiceLocation(this.uploadurl);
			}
		}
		else {
			uploadurl = application._getServiceLocation(v);
		}

		if (uploadurl) {
			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				if (items[i].value) {
					ret = true;
					nexacro._submit(this._unique_id, uploadurl, this._handle, null, items[i].value);
					break;
				}
			}
		}
		return ret;
	};

	_pFileUpload.appendItem = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var pseudo = this._pseudo;
			var itemcount = this.itemcount;
			var client_left = this._client_left;
			var client_top = this._client_top;
			var client_width = this._client_width;
			var itemheight = parseInt(this.on_find_CurrentStyle_itemheight(pseudo), 10);
			var buttonsize = parseInt(this.on_find_CurrentStyle_buttonsize(pseudo), 10);
			var buttontext = this.on_find_CurrentStyle_buttontext(pseudo);
			var padding = this.on_find_CurrentStyle_padding(pseudo);

			var item_left = client_left + padding.left;
			var item_top = client_top + (itemheight * itemcount) + padding.top;
			var item_width = client_width - padding.right;

			var id = itemcount;
			var item = this._createFileItem(id, item_left, item_top, item_width, itemheight);
			this.filepathedits.add_item(item.id, item.fileitemedit);
			this.filefindbuttons.add_item(item.id, item.fileitembutton);

			this._items[id] = item;
			this.itemcount++;
			if (nexacro._enableaccessibility) {
				item._setAccessibilityInfoIndex(id);
				item._setAccessibilityInfoCount(id + 1);
			}

			this.on_change_containerRect();
			this.on_apply_style_buttontext(buttontext);
			this.resetScroll();

			this.on_fire_onappenditem(this, id);
		}
	};

	_pFileUpload.deleteItem = function (idx) {
		var cur_index = this.index;
		var control_elem = this.getElement();
		if (control_elem) {
			idx = parseInt(idx, 10);
			var items = this._items;

			if (this.itemcount <= idx) {
				return;
			}

			var iCount = this.itemcount;
			var iCnt = iCount - 1;
			for (var i = idx + 1; i < iCount; i++) {
				if (cur_index == i) {
					this.index--;
				}
				items[i].index--;

				if (nexacro._enableaccessibility) {
					items[i]._setAccessibilityInfoIndex(i);
					items[i]._setAccessibilityInfoCount(iCnt);
				}
			}

			items[idx].destroy();
			this._upadteFileList();
			items.splice(idx, 1);
			if (cur_index == idx) {
				this.index = -1;
				this.value = undefined;
			}

			this.itemcount--;

			this.on_change_containerRect();
			this.resetScroll();
			this.on_fire_ondeleteitem(this, idx);
		}
	};

	_pFileUpload.getItemCount = function (isValue) {
		var elem = this.getElement();
		if (elem) {
			isValue = nexacro._toBoolean(isValue);

			var cnt = 0;
			var idx = 0;
			var itemval_check;
			var items = this._items;
			var item_len = items.length;

			while (idx < item_len) {
				if (isValue == true) {
					if (items[idx].value) {
						cnt++;
					}
				}
				else {
					return item_len;
				}
				++idx;
			}
			return cnt;
		}
	};

	_pFileUpload.getItemIndex = function (obj) {
		var elem = this.getElement();
		if (elem) {
			if (typeof obj == "object") {
				var idx = 0;
				var items = this._items;
				while (idx < items.length) {
					if (obj == items[idx].fileitembutton) {
						return idx;
					}
					if (obj == items[idx].fileitemedit) {
						return idx;
					}
					++idx;
				}
				return -1;
			}
		}
	};

	_pFileUpload._getItem = function (index) {
		if (index >= 0 && this._items.length > 0) {
			return this._items[index];
		}

		return null;
	};

	_pFileUpload.hasValue = function (nIndex) {
		var elem = this.getElement();
		if (elem) {
			var idx = 0;
			var items = this._items;
			if (nIndex == -1) {
				while (idx < items.length) {
					if (items[idx].value) {
						++cnt;
					}
					++idx;
				}
				if (cnt == items.length) {
					return true;
				}
				return false;
			}

			if (nIndex < items.length && items[nIndex].value) {
				return true;
			}
			return false;
		}
	};

	_pFileUpload.getValue = function (idx) {
		var elem = this.getElement();
		if (elem) {
			var items = this._items;
			if (items && idx >= 0 && idx < items.length) {
				return items[idx].value;
			}
			return "";
		}
	};

	_pFileUpload.on_notify_onfindclick = function (obj, e) {
		var bHandled = false;
		var index = nexacro._indexOf(this._items, obj);

		if (this._isEnable() && this.enableevent) {
			bHandled = this.on_fire_onfindclick(obj, index);

			if (bHandled) {
				try {
					nexacro._findclick(this._unique_id, obj.name, obj, this._handle);
				}
				catch (e) {
					var errorobj = nexacro.MakeError("ObjectError", this, "comp_incorrect_file");
					this.on_fire_onerror(this, errorobj.name, errorobj.message, obj, null, null, null, index);
				}
			}
		}
		return bHandled;
	};

	_pFileUpload.on_notify_onitemclick = function (obj, e) {
		if (this.visible && this._isEnable() && this.enableevent) {
			this.on_fire_onitemclick(obj, obj.index);
		}
	};

	_pFileUpload._on_getAccessibilityAdditionalLabel = function () {
		if (this._first_focus == false) {
			var count = 0;
			var items = this._items;
			if (items) {
				count = items.length;
			}
			return (+this.index) + 1 + " " + count;
		}
		return "";
	};

	_pFileUpload._isAccessibilityEnable = function () {
		return true;
	};

	_pFileUpload.on_get_style_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pFileUpload.on_fire_onerror = function (obj, errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.FileUploadErrorEventInfo(obj, "onerror", errortype, errormsg, errorobj, statuscode, requesturi, locationuri, index);
			return this.onerror._fireEvent(this, evt);
		}
		return true;
	};

	_pFileUpload.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.FileUploadMouseEventInfo(this, "onlbuttondown", button, alt_key, ctrl_key, shift_key, this.index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttondown._fireEvent(this, evt);
		}
		return false;
	};

	_pFileUpload.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.FileUploadMouseEventInfo(this, "onlbuttonup", button, alt_key, ctrl_key, shift_key, this.index, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pFileUpload.on_fire_onfindclick = function (obj, index) {
		var bCheck = true;

		if (this.onfindclick && this.onfindclick._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(this, "onfindclick", index);
			bCheck = this.onfindclick._fireCheckEvent(this, evt);
		}

		return bCheck;
	};

	_pFileUpload.on_fire_onitemclick = function (obj, index) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(this, "onitemclick", index);
			this.onitemclick._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onappenditem = function (obj, index) {
		if (this.onappenditem && this.onappenditem._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(obj, "onappenditem", index);
			this.onappenditem._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_ondeleteitem = function (obj, index) {
		if (this.ondeleteitem && this.ondeleteitem._has_handlers) {
			var evt = new nexacro.FileUploadItemEventInfo(obj, "ondeleteitem", index);
			this.ondeleteitem._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onitemchanged = function (obj, index, oldvalue, newvalue) {
		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.FileUploadItemChangeEventInfo(obj, "onitemchanged", index, oldvalue, newvalue);
			return this.onitemchanged._fireEvent(this, evt);
		}
	};

	_pFileUpload.on_fire_onsuccess = function (ds, code, msg, url) {
		application._endCommProgress();

		if (this.onsuccess && this.onsuccess._has_handlers) {
			var evt = new nexacro.FileUploadLoadEventInfo(this, "onsuccess", ds, code, msg, url);
			return this.onsuccess._fireEvent(this, evt);
		}
	};

	_pFileUpload._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_tab = this._want_tab;
		this._want_tab = true;
		return {
			want_tab : want_tab, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._want_arrow
		};
	};

	_pFileUpload.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var items = this._items;
		var tab_flag = false;
		var idx = this.index;
		var E = nexacro.Event;

		if (keycode == E.KEY_TAB) {
			if ((shift_key && idx == 0) || (!shift_key && idx == items.length - 1)) {
				this._want_tab = false;
				this.set_index(-1);
			}
			else {
				if (shift_key) {
					idx--;
				}
				else {
					idx++;
				}
				this.set_index(idx);
			}
			this._getWindow()._keydown_element._event_stop = true;
		}
		else {
			if (nexacro._enableaccessibility) {
				var focus_up = keycode == E.KEY_UP && ctrl_key;
				var focus_down = keycode == E.KEY_DOWN && ctrl_key;

				if (items[idx]) {
					this._find_item_pseudo(items[idx]);
				}

				var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
				if (idx < 0) {
					editaccessibility = this.on_find_CurrentStyle_editaccessibility(items[0].fileitemedit._pseudo);
					buttonaccessibility = this.on_find_CurrentStyle_buttonaccessibility(items[0].fileitembutton._pseudo);
				}
				else {
					editaccessibility = this.on_find_CurrentStyle_editaccessibility(items[idx].fileitemedit._pseudo);
					buttonaccessibility = this.on_find_CurrentStyle_buttonaccessibility(items[idx].fileitembutton._pseudo);
				}

				if (focus_up || focus_down) {
					var _window = this._getWindow();
					if ((focus_up && idx < 0) || (focus_down && this._buttonFlag && idx == items.length - 1)) {
						this._want_arrow = false;
					}
					else {
						while ((editaccessibility && editaccessibility.enable) || (buttonaccessibility && buttonaccessibility.enable)) {
							if (focus_up) {
								if (!this._editFlag && editaccessibility && editaccessibility.enable) {
									this.index = -1;
									this._editFlag = true;
									this._buttonFlag = false;
								}
								else {
									idx--;
									if (buttonaccessibility && buttonaccessibility.enable) {
										if (idx < 0 && accessibility && accessibility.enable) {
											this._editFlag = false;
											this._buttonFlag = false;
											_window._removeFromCurrentFocusPath(this, false);
											this._setFocus(false);
										}
										else {
											this.index = -1;
											this._editFlag = false;
											this._buttonFlag = true;
										}
									}
									else {
										if (idx > 0) {
											this._buttonFlag = false;
											continue;
										}
										else {
											this._want_arrow = false;
											if (accessibility && accessibility.enable) {
												this._editFlag = false;
												this._buttonFlag = false;
												_window._removeFromCurrentFocusPath(this, false);
												this._setFocus(false);
											}
										}
									}
								}
							}
							else if (focus_down) {
								if (!this._editFlag && editaccessibility && editaccessibility.enable) {
									idx++;
									this._editFlag = true;
									this._buttonFlag = false;
								}
								else {
									if (buttonaccessibility && buttonaccessibility.enable) {
										this.index = -1;
										this._editFlag = false;
										this._buttonFlag = true;
									}
									else {
										if (idx < items.length - 1) {
											this._editFlag = false;
											continue;
										}
										else {
											this._want_arrow = false;
											break;
										}
									}
								}
							}
							this.set_index(idx);
							this._want_arrow = true;
							this._getWindow()._keydown_element._event_stop = true;
							break;
						}
					}
				}
				else {
					this._want_arrow = false;
				}
			}
		}
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pFileUpload._find_item_pseudo = function (item) {
		this._editFlag = (item.fileitemedit._pseudo == "focused");
		this._buttonFlag = (item.fileitembutton._pseudo == "focused");
	};



	_pFileUpload._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		var items = this._items;
		var itemLen = items.length;
		var focus_dir = null;
		var idx = 0;
		if (itemLen) {
			this._want_tab = true;
			focus_dir = evt_name == "shifttabkey";
			if (evt_name == "shifttabkey" || evt_name == "tabkey") {
				this._editFlag = false;
				this._buttonFlag = true;
				if (focus_dir) {
					idx = this.index < 0 ? itemLen - 1 : this.index;
				}
				else {
					idx = this.index < 0 ? 0 : this.index;
					this._first_focus = true;
				}
				this.index = -1;
			}
			else {
				focus_dir = evt_name == "upkey";
				if (nexacro._enableaccessibility) {
					this._editFlag = false;
					this._buttonFlag = false;
					this._want_arrow = true;

					var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
					var editaccessibility = this.on_find_CurrentStyle_editaccessibility(this._pseudo);
					var buttonaccessibility = this.on_find_CurrentStyle_buttonaccessibility(this._pseudo);

					if (focus_dir) {
						this.index = -1;
						idx = itemLen - 1;
						if (buttonaccessibility && buttonaccessibility.enable) {
							this._buttonFlag = true;
						}
						else if (editaccessibility && editaccessibility.enable) {
							this._editFlag = true;
						}
					}
					else {
						idx = -1;
						if (accessibility && accessibility.enable == false) {
							idx = 0;
							this.index = -1;
							if (editaccessibility && editaccessibility.enable) {
								this._editFlag = true;
							}
							else if (buttonaccessibility && buttonaccessibility.enable) {
								this._buttonFlag = true;
							}
							this._first_focus = (this._editFlag || this._buttonFlag) ? true : false;
						}
					}
				}
			}
			this.set_index(idx);
			if (nexacro._enableaccessibility) {
				this._first_focus = false;
			}
		}
	};

	_pFileUpload.on_apply_custom_setfocus = function (evt_name) {
		var enableaccessibility = nexacro._enableaccessibility;
		var selffocus = ((evt_name == "lbutton") ? false : enableaccessibility);
		var items = this._items;
		if (items.length < -1 || enableaccessibility) {
			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementFocus(selffocus);
			}
		}
		else {
			var item = items[this.index];
			if (item) {
				item.fileitembutton._control_element.setElementFocus(selffocus);
			}
		}
	};

	_pFileUpload._setParamter = nexacro._emptyFn;
	_pFileUpload._getDataset = nexacro._emptyFn;

	if (nexacro.Browser == "Runtime") {
		_pFileUpload.on_load = function (status, data, url, errcode, httpcode, errmsg) {
			var result, fstr, code = -1, msg = "fail to get", xmldoc = nexacro._getXMLDocument(this._unique_id, data, url);
			if (status < 0) {
				application._onHttpSystemError(this, true, this, errcode, url, httpcode, url, null);
				errmsg = nexacro._GetSystemErrorMsg(this, errcode);
				this.on_fire_onerror(this, "ObjectError", errmsg, this, 9901, null, null, -1);
			}
			else {
				if (data) {
					fstr = data.substring(0, 3);
					if (fstr != "SSV") {
						fstr = "XML";
					}

					if (fstr == "XML") {
						result = nexacro.Deserializer["XML"](xmldoc);
					}
					else {
						result = nexacro.Deserializer["SSV"](data);
					}

					var error_info = result[0];
					if (error_info) {
						code = error_info["ErrorCode"];
						msg = error_info["ErrorMsg"];
					}

					if (code < 0) {
						this.on_fire_onerror(this, "ObjectError", msg, this, 9901, null, null, -1);
					}
					else {
						this.on_fire_onsuccess(result[1], code, msg, url);
					}
				}
				else {
				}
			}
		};
	}
	else {
		_pFileUpload.on_load = function () {
			var result, fstr, url, code = -1, msg = "", data = "";
			try {
				var xmldoc = nexacro._getXMLDocument(this._unique_id);
				url = xmldoc.URL ? xmldoc.URL : xmldoc.url;
				if (url == "about:blank") {
					return;
				}

				this.context = this.parent;
				if (nexacro._getContentType(xmldoc) == "XML") {
					fstr = "XML";
				}
				else {
					data = nexacro._getDataFromDOM(xmldoc, this);
					data = data.trim();
					fstr = data.substring(0, 3);
				}

				if (fstr == "XML") {
					result = nexacro.Deserializer["XML"](xmldoc);
				}
				else if (fstr == "SSV") {
					result = nexacro.Deserializer["SSV"](data);
				}
				else {
				}

				if (result) {
					var error_info = result[0];
					if (error_info["ErrorCode"] != null) {
						code = error_info["ErrorCode"];
					}
					if (error_info["ErrorMsg"] != null) {
						msg = error_info["ErrorMsg"];
					}
				}
				else {
					msg = data;
				}

				if (code < 0) {
					this.on_fire_onerror(this, "ObjectError", "failed to get", this, 9901, null, null, -1);
				}
				else {
					this.on_fire_onsuccess(result[1], code, msg, url);
				}
				delete this.context;
			}
			catch (e) {
				this.on_fire_onerror(this, "ObjectError", "failed to get", this, 9901, null, null, -1);
			}
		};
	}

	_pFileUpload._createFileItem = function (id, left, top, width, height) {
		var unique = this.itemcount < 1 ? this._last_id = 0 : ++this._last_id;
		var name = "upfile" + unique;
		var item = new nexacro.FileItemCtrl(name, "absolute", left, top, width, height, null, null, this);

		item.index = id;
		item.set_name(name);

		item.createComponent();
		item.on_created();

		item._setEventHandler("onfindclick", this.on_notify_onfindclick, this);
		item._setEventHandler("onitemclick", this.on_notify_onitemclick, this);

		return item;
	};

	_pFileUpload.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			items[i]._setEnable(v);
			items[i].fileitemedit._setEnable(v);
			items[i].fileitembutton._setEnable(v);
		}
	};

	_pFileUpload._isPopupFrame = function () {
		return this._onPopupWin;
	};

	_pFileUpload._upadteFileList = function () {
		var file_list = this.filelist = [];

		var items = this._items;

		var item_len = items.length;

		var v_file, files, file;
		for (var i = 0; i < item_len; i++) {
			var item = items[i];
			files = item._files;
			if (files) {
				var files_len = files.length;
				for (var j = 0; j < files_len; j++) {
					var list_len = file_list.length;
					v_file = new nexacro.VirtualFile("uploadfile" + list_len);
					file = files[j];
					v_file._setRefFile(file);
					file_list[list_len] = v_file;
				}
			}
		}
	};


	delete _pFileUpload;

	nexacro.FileUploadCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FileUpload.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pFileUploadCtrl = nexacro._createPrototype(nexacro.FileUpload, nexacro.FileUploadCtrl);
	nexacro.FileUploadCtrl.prototype = _pFileUploadCtrl;
	nexacro._setForControlStyleFinder(_pFileUploadCtrl);

	delete _pFileUploadCtrl;

	nexacro.FileItem = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.fileitemedit = null;
		this.fileitembutton = null;
		this.selected = false;

		this.itemheight = 18;
		this.buttontext = "find";
		this.buttonsize = 18;
		this.name = "";
		this.oldvalue = "";
		this.value = "";
		this.index = 0;
		this.components = [];

		this._accessibility_role = "none";

		this._event_list = 
			{
			"onfindclick" : 1, 
			"onitemclick" : 1
		};
	};

	var _pFileItem = nexacro._createPrototype(nexacro.Component, nexacro.FileItem);
	nexacro.FileItem.prototype = _pFileItem;

	_pFileItem._type_name = "FileItem";

	_pFileItem.on_apply_style_itemheight = function () {
		this.on_change_containerRect(this._client_width, this._client_height);
	};

	_pFileItem.on_apply_style_buttonsize = function () {
		this.on_change_containerRect(this._client_width, this._client_height);
	};

	_pFileItem.on_apply_style_buttontext = function (buttontext) {
		if (this.fileitembutton) {
			this.fileitembutton.set_text(buttontext);
		}
	};

	_pFileItem.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this.fileitemedit = new nexacro.FileItemEditCtrl("fileitemedit", "absolute", 0, 0, 0, 0, null, null, this);
			this.fileitembutton = new nexacro.FileItemButtonCtrl("fileitembutton", "absolute", 0, 0, 0, 0, null, null, this);

			this.fileitemedit.set_readonly("true");
			this.fileitemedit.style.set_align(this.parent.on_find_CurrentStyle_align());
			this.fileitembutton.set_text("find");

			this.fileitemedit.createComponent();
			this.fileitembutton.createComponent();
		}
	};

	_pFileItem.on_created_contents = function () {
		var parent = this.parent;
		nexacro._append_hidden_item(parent._unique_id, this.name, this.on_fileinput_onchange, this, parent._handle, this.parent._multiselect);

		this.fileitemedit.on_created();
		this.fileitembutton.on_created();

		this.fileitemedit._setEventHandler("oneditclick", this.on_notify_fileitem_oneditclick, this);
		this.fileitembutton._setEventHandler("onclick", this.on_notify_fileitem_onfindclick, this);
		this.fileitemedit._setEventHandler("onlbuttondown", this.on_notify_fileitem_oneditlbuttondown, this);
		this.fileitembutton._setEventHandler("onlbuttondown", this.on_notify_fileitem_onfindlbuttondown, this);

		if (nexacro._enableaccessibility) {
			this.components.push(this.fileitemedit);
			this.components.push(this.fileitembutton);
		}

		this._setAccessibilityActiveDescendant(this.fileitembutton);
	};

	_pFileItem.on_destroy_contents = function () {
		if (this.fileitemedit) {
			this.parent.filepathedits.delete_item(this.id);

			this.fileitemedit.destroy();
			this.fileitemedit = null;
		}
		if (this.fileitembutton) {
			this.parent.filefindbuttons.delete_item(this.id);

			this.fileitembutton.destroy();
			this.fileitembutton = null;
		}

		if (this._files) {
			this._files = null;
		}

		this.components = null;
		var parent = this.parent;
		nexacro._remove_hidden_item(parent._unique_id, this.name, parent._handle);
		if (this._input_node) {
			this._input_node = null;
		}
	};

	_pFileItem.on_change_containerRect = function (width, height) {
		var button_width = parseInt(this.parent.on_find_CurrentStyle_buttonsize(this._pseudo), 10);
		var height = parseInt(this.parent.on_find_CurrentStyle_itemheight(this._pseudo), 10);
		var idx = parseInt(this.index, 10);

		var edit_l = this._client_left;
		var edit_t = this._client_top;
		var edit_w = this._client_width - button_width;
		var edit_h = height;

		var button_l = edit_l + edit_w;
		var button_t = edit_t;
		var button_w = button_width;
		var button_h = edit_h;

		if (this.fileitemedit) {
			this.fileitemedit.move(edit_l, edit_t, edit_w, edit_h, null, null);
		}
		if (this.fileitembutton) {
			this.fileitembutton.move(button_l, button_t, button_w, button_h, null, null);
		}
	};


	_pFileItem.set_value = function (v) {
		if (v != this.value) {
			this.oldvalue = this.value;
			this.value = v;
			this.on_apply_value(v);
			this.parent.set_index(this.index);
			this.parent._setText(v);
			this.parent._setValue(v);
			return true;
		}
		return false;
	};

	_pFileItem.on_apply_value = function (v) {
		if (this.fileitemedit) {
			this.fileitemedit.set_value(v);
		}
	};

	_pFileItem.set_name = function (v) {
		if (v != this.name) {
			this.name = v;
		}
	};

	_pFileItem.set_selected = function (v) {
		if (v != this.selected) {
			this.selected = v;
			this.on_apply_selected(v);
		}
	};

	_pFileItem.on_apply_selected = function (isSelected) {
		if (isSelected) {
			this._stat_change("select", "selected");
		}
		else {
			this._stat_change("notselect", "normal");
		}
	};

	_pFileItem.on_notify_fileitem_oneditclick = function (obj, e) {
		this.parent.set_index(this.index);

		if (this.onitemclick && this.onitemclick._has_handlers) {
			this.onitemclick._fireEvent(this, e);
		}
		return false;
	};

	_pFileItem.on_notify_fileitem_onfindclick = function (obj, e) {
		this.parent.set_index(this.index);

		if (this.onfindclick && this.onfindclick._has_handlers) {
			this.onfindclick._fireEvent(this, e);
		}
		return false;
	};

	_pFileItem.on_notify_fileitem_oneditlbuttondown = function (obj, e) {
		this._accessibility_find_focus_flag(true, false);
		this.parent.set_index(this.index);
	};

	_pFileItem.on_notify_fileitem_onfindlbuttondown = function (obj, e) {
		this._accessibility_find_focus_flag(false, true);
		this.parent.set_index(this.index);
	};

	_pFileItem._accessibility_find_focus_flag = function (editflag, buttonflag) {
		if (nexacro._enableaccessibility) {
			this.parent._editFlag = editflag;
			this.parent._buttonFlag = buttonflag;
		}
	};

	_pFileItem.on_fileinput_onchange = function (value) {
		if (this.set_value(value)) {
			this.parent.on_fire_onitemchanged(this, this.index, this.oldvalue, this.value);
		}
	};

	_pFileItem._isPopupFrame = function () {
		return this.parent._onPopupWin;
	};

	_pFileItem._changeFiles = function (files) {
		this._files = files;
		this.parent._upadteFileList();
	};

	delete _pFileItem;

	nexacro.FileItemCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FileItem.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pFileItemCtrl = nexacro._createPrototype(nexacro.FileItem, nexacro.FileItemCtrl);
	nexacro.FileItemCtrl.prototype = _pFileItemCtrl;

	_pFileItemCtrl._type_name = "FileItemControl";

	delete _pFileItemCtrl;

	nexacro.FileItemEditCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.EditCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._edit = null;
	};

	var _pFileItemEditCtrl = nexacro._createPrototype(nexacro.EditCtrl, nexacro.FileItemEditCtrl);
	nexacro.FileItemEditCtrl.prototype = _pFileItemEditCtrl;


	_pFileItemEditCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("editbackground", pseudo, "background");
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("editgradation", pseudo, "gradation");
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("editborder", pseudo, "border");
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("editbordertype", pseudo, "bordertype");
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_padding = function (pseudo) {
		var padding = this.parent.parent._find_pseudo_obj("editpadding", pseudo, "padding");
		return (padding) ? padding : this._defaultPadding;
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_margin = function (pseudo) {
		var margin = this.parent.parent._find_pseudo_obj("editmargin", pseudo, "margin");
		return (margin) ? margin : this._defaultMargin;
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_font = function (pseudo) {
		var font = this.parent.parent._find_pseudo_obj("editfont", pseudo, "font") || this._find_inherit_pseudo_obj("font", pseudo, "font") || nexacro.Component._default_font;
		return font;
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_color = function (pseudo) {
		var color = this.parent.parent._find_pseudo_obj("editcolor", pseudo, "color") || this._find_inherit_pseudo_obj("color", pseudo, "color") || nexacro.Component._default_color;
		return color;
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.parent.on_find_CurrentStyle_editaccessibility(pseudo);
	};

	_pFileItemEditCtrl.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		return this.parent.parent.on_find_CurrentStyle_rtlimagemirroring(pseudo);
	};

	_pFileItemEditCtrl._getAccessibilityLabel = function (accessibility) {
		var label = "";
		if (this.parent.parent._first_focus) {
			var comp = this.parent.parent;
			label = comp._control_element._makeAccessibilityLabelbyReadtype();
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	delete _pFileItemEditCtrl;

	nexacro.FileItemButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
		this._button = null;
	};

	var _pFileItemButtonCtrl = nexacro._createPrototype(nexacro.Button, nexacro.FileItemButtonCtrl);
	nexacro.FileItemButtonCtrl.prototype = _pFileItemButtonCtrl;

	_pFileItemButtonCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("buttonbackground", pseudo, "background");
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("buttongradation", pseudo, "gradation");
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("buttonborder", pseudo, "border");
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.parent._find_pseudo_obj("buttonbordertype", pseudo, "bordertype");
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_padding = function (pseudo) {
		var padding = this.parent.parent._find_pseudo_obj("buttonpadding", pseudo, "padding");
		return (padding) ? padding : this._defaultPadding;
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_margin = function (pseudo) {
		var margin = this.parent.parent._find_pseudo_obj("buttonmargin", pseudo, "margin");
		return (margin) ? margin : this._defaultMargin;
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_font = function (pseudo) {
		var font = this.parent.parent._find_pseudo_obj("buttonfont", pseudo, "font") || this._find_inherit_pseudo_obj("font", pseudo, "font") || nexacro.Component._default_font;
		return font;
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_color = function (pseudo) {
		var color = this.parent.parent._find_pseudo_obj("buttoncolor", pseudo, "color") || this._find_inherit_pseudo_obj("color", pseudo, "color") || nexacro.Component._default_color;
		return color;
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.parent.on_find_CurrentStyle_buttonaccessibility(pseudo);
	};

	_pFileItemButtonCtrl.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		return this.parent.parent.on_find_CurrentStyle_rtlimagemirroring(pseudo);
	};

	_pFileItemButtonCtrl._getAccessibilityLabel = function (accessibility) {
		var label = "";
		if (this.parent.parent._first_focus) {
			var comp = this.parent.parent;
			label = comp._control_element._makeAccessibilityLabelbyReadtype();
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	_pFileItemButtonCtrl.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		if (key_code == 13 || key_code == 32) {
			this.click();
		}
		return ret;
	};

	delete _pFileItemButtonCtrl;
}
;