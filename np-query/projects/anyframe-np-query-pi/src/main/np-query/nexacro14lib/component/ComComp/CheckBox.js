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

if (!nexacro.CheckBox) {
	nexacro.CheckBoxChangedEventInfo = function (obj, id, prevalue, postvalue) {
		this.id = this.eventid = id || "onchanged";
		this.prevalue = prevalue;
		this.postvalue = postvalue;
		this.fromobject = this.fromreferenceobject = obj;
	};

	var _pCheckBoxChangedEventInfo = nexacro._createPrototype(nexacro.ChangedEventInfo, nexacro.CheckBoxChangedEventInfo);
	nexacro.CheckBoxChangedEventInfo.prototype = _pCheckBoxChangedEventInfo;
	_pCheckBoxChangedEventInfo._type_name = "CheckBoxChangedEventInfo";

	delete _pCheckBoxChangedEventInfo;
	_pCheckBoxChangedEventInfo = null;

	nexacro.CheckBox_Style = function (target, idx) {
		nexacro.Style.call(this, target, idx);

		this.buttonalign = null;
		this.buttonimage = null;
		this.textpadding = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonsize = null;
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonbackgroundimagemode = null;
	};

	_pCheckBoxStyle = nexacro.CheckBox_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.CheckBox_Style);
	nexacro.CheckBox_Style.prototype = _pCheckBoxStyle;

	eval(nexacro._createAlignAttributeEvalStr("_pCheckBoxStyle", "buttonalign"));
	eval(nexacro._createValueAttributeEvalStr("_pCheckBoxStyle", "buttonimage"));
	eval(nexacro._createPaddingAttributeEvalStr("_pCheckBoxStyle", "textpadding"));
	eval(nexacro._createBorderAttributeEvalStr("_pCheckBoxStyle", "buttonborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pCheckBoxStyle", "buttonbordertype"));
	eval(nexacro._createValueAttributeEvalStr("_pCheckBoxStyle", "buttonsize"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pCheckBoxStyle", "buttonbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pCheckBoxStyle", "buttongradation"));
	eval(nexacro._createValueAttributeEvalStr("_pCheckBoxStyle", "buttonbackgroundimagemode"));

	_pCheckBoxStyle.__custom_emptyObject = function () {
		this.buttonalign = null;
		this.buttonimage = null;
		this.textpadding = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonsize = null;
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonbackgroundimagemode = null;
		this.accessibility = null;
	};

	_pCheckBoxStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.buttonalign && this.buttonalign._is_empty) {
			val += "buttonalign:" + this.buttonalign._value + "; ";
		}
		if (this.buttonimage && this.buttonimage._is_empty) {
			val += "buttonimage:" + this.buttonimage._value + "; ";
		}
		if (this.textpadding && this.textpadding._is_empty) {
			val += "textpadding:" + this.textpadding._value + "; ";
		}
		if (this.buttonborder && this.buttonborder._is_empty) {
			val += "buttonborder:" + this.buttonborder._value + "; ";
		}
		if (this.buttonbordertype && this.buttonbordertype._is_empty) {
			val += "buttonbordertype:" + this.buttonbordertype._value + "; ";
		}
		if (this.buttonsize && this.buttonsize._is_empty) {
			val += "buttonsize:" + this.buttonsize._value + "; ";
		}
		if (this.buttonbackground && this.buttonbackground._is_empty) {
			val += "buttonbackground:" + this.buttonbackground._value + "; ";
		}
		if (this.buttongradation && this.buttongradation._is_empty) {
			val += "buttongradation:" + this.buttongradation._value + "; ";
		}
		if (this.buttonbackgroundimagemode && this.buttonbackgroundimagemode._is_empty) {
			val += "buttonbackgroundimagemode:" + this.buttonbackgroundimagemode._value + "; ";
		}
		if (this.accessibility && this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}
		return val;
	};

	nexacro.CheckBox_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.buttonalign = null;
		this.buttonimage = null;
		this.textpadding = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonsize = null;
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonbackgroundimagemode = null;
	};

	_pCheckBoxCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.CheckBox_CurrentStyle);
	nexacro.CheckBox_CurrentStyle.prototype = _pCheckBoxCurrentStyle;

	_pCheckBoxCurrentStyle.__get_custuom_style_value = _pCheckBoxStyle.__get_custuom_style_value;
	_pCheckBoxCurrentStyle.__custom_emptyObject = _pCheckBoxStyle.__custom_emptyObject;


	delete _pCheckBoxStyle;
	_pCheckBoxStyle = null;
	delete _pCheckBoxCurrentStyle;
	_pCheckBoxCurrentStyle = null;

	nexacro.CheckBox = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._text_elem = null;
		this.chkimg = null;
		this.value = false;
		this.binddataset = null;
		this.readonly = false;
		this.falsevalue = null;
		this.truevalue = null;


		this._event_list = {
			"canchange" : 1, 
			"onchanged" : 1, 
			"onclick" : 1, 
			"ondrag" : 1, 
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1, 
			"ondrop" : 1, 
			"ongesture" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onkillfocus" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onsetfocus" : 1, 
			"onsize" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onflingstart" : 1, 
			"onfling" : 1, 
			"onflingend" : 1, 
			"onpinchstart" : 1, 
			"onpinch" : 1, 
			"onpinchend" : 1, 
			"onlongpress" : 1, 
			"onslidestart" : 1, 
			"onslide" : 1, 
			"onslideend" : 1
		};


		this._accessibility_role = "checkbox";
		this._is_usetextbox = true;
	};

	_pCheckBox = nexacro._createPrototype(nexacro.Component, nexacro.CheckBox);
	nexacro.CheckBox.prototype = _pCheckBox;

	_pCheckBox._type_name = "CheckBox";

	nexacro.CheckBox._default_buttonsize = nexacro._getCachedStyleObj("buttonsize", 13);
	nexacro.CheckBox._default_textpadding = nexacro._getCachedStyleObj("padding", "5 2 5 2");

	_pCheckBox.on_apply_custom_pseudo = function (pseudo) {
		if (pseudo) {
			this._pseudo = pseudo;
		}
		else if (this._pseudo) {
			pseudo = this._pseudo;
		}

		var curstyle = this.currentstyle;
		var buttonalign = this.on_find_CurrentStyle_buttonalign(pseudo);
		var buttonimage = this.on_find_CurrentStyle_buttonimage(pseudo);
		var textpadding = this.on_find_CurrentStyle_textpadding(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(pseudo);
		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);
		var buttonbackground = this.on_find_CurrentStyle_buttonbackground(pseudo);
		var buttonbackgroundimagemode = this.on_find_CurrentStyle_buttonbackgroundimagemode(pseudo);
		var buttongradation = this.on_find_CurrentStyle_buttongradation(pseudo);
		var font = this.on_find_CurrentStyle_font(pseudo);
		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		var color = this.on_find_CurrentStyle_color(pseudo);
		var align = this.on_find_CurrentStyle_align(pseudo);
		var accessibility = this.on_find_CurrentStyle_accessibility(pseudo);

		if (this._apply_client_border || buttonalign != curstyle.buttonalign) {
			curstyle.buttonalign = buttonalign;
			this.on_apply_style_buttonalign(buttonalign);
			this._apply_client_border = false;
		}
		if (buttonimage != curstyle.buttonimage) {
			curstyle.buttonimage = buttonimage;
			this.on_apply_style_buttonimage(buttonimage);
		}
		if (textpadding != curstyle.textpadding) {
			curstyle.textpadding = textpadding;
			this.on_apply_style_textpadding(textpadding);
		}
		if (buttonborder != curstyle.buttonborder) {
			curstyle.buttonborder = buttonborder;
			if (this.chkimg) {
				this.chkimg.on_apply_pseudo(pseudo);
			}
			this.on_apply_style_buttonborder(buttonborder);
		}
		if (buttonbordertype != curstyle.buttonbordertype) {
			curstyle.buttonbordertype = buttonbordertype;
			if (this.chkimg) {
				this.chkimg.on_apply_pseudo(pseudo);
			}
			this.on_apply_style_buttonbordertype(buttonbordertype);
		}
		if (buttonsize != curstyle.buttonsize) {
			curstyle.buttonsize = buttonsize;
			this.on_apply_style_buttonsize(buttonsize);
		}
		if (buttonbackground != curstyle.buttonbackground) {
			curstyle.buttonbackground = buttonbackground;
			if (this.chkimg) {
				this.chkimg.on_apply_pseudo(pseudo);
			}
			this.on_apply_style_buttonbackground(buttonbackground);
		}
		if (buttongradation != curstyle.buttongradation) {
			curstyle.buttongradation = buttongradation;
			if (this.chkimg) {
				this.chkimg.on_apply_pseudo(pseudo);
			}
			this.on_apply_style_buttongradation(buttongradation);
		}
		if (buttonbackgroundimagemode != curstyle.buttonbackgroundimagemode) {
			curstyle.buttonbackgroundimagemode = buttonbackgroundimagemode;
			if (this.chkimg) {
				this.chkimg.on_apply_pseudo(pseudo);
			}
			this.on_apply_style_buttonbackgroundimagemode(buttonbackgroundimagemode);
		}
		if (font != curstyle.font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}
		if (letterspace != curstyle.letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}
		if (color != curstyle.color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}
		if (align != curstyle.align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pCheckBox.on_create_custom_style = function () {
		return new nexacro.CheckBox_Style(this);
	};

	_pCheckBox.on_create_custom_currentStyle = function () {
		return new nexacro.CheckBox_CurrentStyle(this);
	};


	_pCheckBox.on_find_CurrentStyle_buttonalign = function (pseudo) {
		var default_align = nexacro.Component._default_left_align;

		return this._find_pseudo_obj("buttonalign", pseudo, "align") || default_align;
	};

	_pCheckBox.on_find_CurrentStyle_buttonimage = function (pseudo) {
		return this._find_pseudo_obj("buttonimage", pseudo);
	};

	_pCheckBox.on_find_CurrentStyle_textpadding = function (pseudo) {
		return this._find_pseudo_obj("textpadding", pseudo) || nexacro.CheckBox._default_textpadding;
	};

	_pCheckBox.on_find_CurrentStyle_buttonborder = function (pseudo) {
		return this._find_pseudo_obj("buttonborder", pseudo, "border");
	};

	_pCheckBox.on_find_CurrentStyle_buttonbordertype = function (pseudo) {
		return this._find_pseudo_obj("buttonbordertype", pseudo);
	};

	_pCheckBox.on_find_CurrentStyle_buttonsize = function (pseudo) {
		return this._find_pseudo_obj("buttonsize", pseudo) || nexacro.CheckBox._default_buttonsize;
	};

	_pCheckBox.on_find_CurrentStyle_buttonbackground = function (pseudo) {
		return this._find_pseudo_obj("buttonbackground", pseudo);
	};

	_pCheckBox.on_find_CurrentStyle_buttongradation = function (pseudo) {
		return this._find_pseudo_obj("buttongradation", pseudo);
	};

	_pCheckBox.on_find_CurrentStyle_buttonbackgroundimagemode = function (pseudo) {
		return this._find_pseudo_obj("buttonbackgroundimagemode", pseudo);
	};

	_pCheckBox.on_find_CurrentStyle_align = function (pseudo) {
		var default_align = nexacro.Component._default_left_align;

		return this._find_pseudo_obj("align", pseudo) || default_align;
	};

	_pCheckBox.on_update_style_buttonalign = function () {
		var curstyle = this.currentstyle;
		var buttonalign = curstyle.buttonalign = this.on_find_CurrentStyle_buttonalign(this._pseudo);
		this.on_apply_style_buttonalign(buttonalign);
	};

	_pCheckBox.on_update_style_buttonimage = function () {
		var curstyle = this.currentstyle;
		var buttonimage = curstyle.buttonimage = this.on_find_CurrentStyle_buttonimage(this._pseudo);
		this.on_apply_style_buttonimage(buttonimage);
	};

	_pCheckBox.on_update_style_textpadding = function () {
		var curstyle = this.currentstyle;
		var textpadding = curstyle.textpadding = this.on_find_CurrentStyle_textpadding(this._pseudo);
		this.on_apply_style_textpadding(textpadding);
	};

	_pCheckBox.on_update_style_buttonborder = function () {
		var curstyle = this.currentstyle;
		var buttonborder = curstyle.buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo);
		this.on_apply_style_buttonborder(buttonborder);
	};

	_pCheckBox.on_update_style_buttonbordertype = function () {
		var curstyle = this.currentstyle;
		var buttonbordertype = curstyle.buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(this._pseudo);
		this.on_apply_style_buttonbordertype(buttonbordertype);
	};

	_pCheckBox.on_update_style_buttonsize = function () {
		var curstyle = this.currentstyle;
		var buttonsize = curstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);
		this.on_apply_style_buttonsize(buttonsize);
	};

	_pCheckBox.on_update_style_buttonbackground = function () {
		var curstyle = this.currentstyle;
		var buttonbackground = curstyle.buttonbackground = this.on_find_CurrentStyle_buttonbackground(this._pseudo);
		this.on_apply_style_buttonbackground(buttonbackground);
	};

	_pCheckBox.on_update_style_buttongradation = function () {
		var curstyle = this.currentstyle;
		var buttongradation = curstyle.buttongradation = this.on_find_CurrentStyle_buttongradation(this._pseudo);
		this.on_apply_style_buttongradation(buttongradation);
	};

	_pCheckBox.on_update_style_buttonbackgroundimagemode = function () {
		var curstyle = this.currentstyle;
		var buttonbackgroundimagemode = curstyle.buttonbackgroundimagemode = this.on_find_CurrentStyle_buttonbackgroundimagemode(this._pseudo);
		this.on_apply_style_buttonbackgroundimagemode(buttonbackgroundimagemode);
	};


	_pCheckBox.on_apply_style_align = function (align) {
		if (this._text_elem) {
			var halign = (align.halign == "" ? "center" : align._halign);
			var valign = (align.valign == "" ? "middle" : align._valign);
			this._text_elem.setElementAlignXY(halign, valign);
		}
	};

	_pCheckBox.on_apply_style_buttonalign = function (v) {
		var curstyle = this.currentstyle;

		if (curstyle && curstyle.buttonalign && this.chkimg) {
			var buttonalign = curstyle.buttonalign;

			var container_width = this._client_width;
			var container_height = this._client_height;
			var arr = buttonalign.toString().trim().split(" ");
			var len = arr.length;

			var cl = 0, ct = 0, cr = 0, cb = 0;
			var tl = 0, tt = 0, tr = 0, tb = 0, tw = 0, th = 0;

			var str = "";

			var _buttonsize = curstyle.buttonsize;
			var btn_halign = "left", btn_valign = "middle";
			var btnsize = _buttonsize ? (parseInt(_buttonsize._value) | 0) : 13;

			for (var i = 0; i < len; i++) {
				switch (arr[i]) {
					case "center":
						btn_halign = "center";
						break;
					case "right":
						btn_halign = "right";
						break;
					case "top":
						btn_valign = "top";
						break;
					case "bottom":
						btn_valign = "bottom";
						break;
					default:
						break;
				}
			}

			var curTxtPadding = curstyle.textpadding;
			var textleft, textwidth;

			if (curTxtPadding) {
				if (curTxtPadding.left) {
					tl = curTxtPadding.left;
				}

				if (curTxtPadding.right) {
					tr = curTxtPadding.right;
				}

				if (curTxtPadding.top) {
					tt = curTxtPadding.top;
				}

				if (curTxtPadding.bottom) {
					tb = curTxtPadding.bottom;
				}
			}

			textwidth = container_width - btnsize;
			if (btn_halign == "left" || btn_halign == "center") {
				tl += btnsize;
				cl = 0;
				cr = btnsize;
			}
			else if (btn_halign == "right") {
				cr = container_width;
				cl = cr - btnsize;
			}

			if (btn_valign == "top") {
				ct = 0;
				cb = btnsize;
			}
			else if (btn_valign == "bottom") {
				cb = container_height;
				ct = cb - btnsize;
			}
			else {
				ct = (container_height - btnsize) / 2;
				cb = ct + btnsize;
			}

			this.chkimg.move(cl, ct, cr - cl, cb - ct);

			if (this._text_elem) {
				tw = container_width - tr - tl;
				th = container_height - tb - tt;
				tw = (tw < 0) ? 0 : tw;
				th = (th < 0) ? 0 : th;

				tl = this._convertLeftForRtlLayout(tl, tw);

				this._text_elem.setElementPosition(tl, tt);
				this._text_elem.setElementSize(tw, th);
			}
		}
	};

	_pCheckBox.on_apply_style_color = function (color) {
		if (this._text_elem) {
			this._text_elem.setElementColor(color);
		}
	};

	_pCheckBox.on_apply_style_padding = function (padding) {
		var control = this.getElement();
		if (control) {
			control.setElementPadding(padding);
		}
	};

	_pCheckBox.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pCheckBox.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
		}
	};

	_pCheckBox.on_apply_style_buttonimage = function (v) {
		if (v && this._isChecked(this.value)) {
			if (this.chkimg) {
				this.chkimg.image = v;
				this.chkimg._load_image(v);
			}
			this.on_apply_value();
		}
	};

	_pCheckBox.on_apply_style_textpadding = function (v) {
		if (this._text_elem && this.currentstyle.textpadding) {
			this.on_apply_style_buttonalign(v);
		}
	};

	_pCheckBox.on_apply_style_buttonborder = function (v) {
		if (this.chkimg) {
			this.chkimg.currentstyle.border = v;
			this.chkimg.on_update_style_border();
		}
	};

	_pCheckBox.on_apply_style_buttonbordertype = function (v) {
		if (this.chkimg) {
			this.chkimg.currentstyle.bordertype = v;
			this.chkimg.on_update_style_bordertype();
		}
	};

	_pCheckBox.on_apply_style_buttonsize = function (v) {
		this.on_apply_style_buttonalign(v);
	};

	_pCheckBox.on_apply_style_buttongradation = function (v) {
		if (this.chkimg) {
			this.chkimg.currentstyle.buttongradation = v;
			this.chkimg.on_update_style_gradation();
		}
	};

	_pCheckBox.on_apply_style_buttonbackground = function (v) {
		if (this.chkimg) {
			this.chkimg.currentstyle.buttonbackground = v;
			this.chkimg.on_update_style_background();
		}
	};

	_pCheckBox.on_apply_style_buttonbackgroundimagemode = function (v) {
	};

	_pCheckBox.on_apply_style_cursor = function (cursor) {
		var ck_cursor = nexacro.Component.prototype.on_apply_style_cursor.call(this, cursor);

		if (this.chkimg) {
			this.chkimg.on_apply_style_cursor(cursor);
		}

		return ck_cursor;
	};

	_pCheckBox.on_get_style_accessibility_label = function () {
		return this.text ? this.text : "";
	};

	_pCheckBox.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		this.on_change_containerRect();
		var _rtldirection = this._rtldirection;

		if (this.chkimg) {
			var img_elem = this.chkimg._img_elem;
			if (img_elem) {
				img_elem.setElementImageMirror(null, true);
			}
		}
	};

	_pCheckBox.on_create_contents = function () {
		var _control_element = this._control_element;
		if (_control_element) {
			this.chkimg = new nexacro.CheckBoxImageCtrl("chkimg", this.position, 0, 0, 0, 0, null, null, this);
			this.chkimg.createComponent();

			var current_style = this.currentstyle;

			if (this._is_usetextbox) {
				var text_elem = new nexacro.TextBoxElement(_control_element);
				var halign = ((!current_style.align || current_style.align.halign == "") ? "center" : current_style.align._halign);
				var valign = ((!current_style.align || current_style.align.valign == "") ? "middle" : current_style.align._valign);

				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(current_style.color);
				text_elem.setElementFont(current_style.font);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(current_style.letterspace);
				this._text_elem = text_elem;
				text_elem = null;
			}
			if (current_style.buttonimage) {
				this.chkimg._load_image(current_style.buttonimage);
			}
		}
	};

	_pCheckBox.on_created_contents = function () {
		if (this.chkimg) {
			this.chkimg.on_created();
			var img_elem = this.chkimg._img_elem;
			if (img_elem) {
				img_elem.create();
			}
		}

		if (this._text_elem) {
			this._text_elem.create();
		}

		this.on_apply_text();

		if (this.expr) {
			this.on_apply_expr();
		}

		this._reCalcValue();
		this.on_apply_style_buttonalign(this.currentstyle.buttonalign);
		this.on_apply_style_buttonimage(this.currentstyle.buttonimage);
		this.on_apply_style_buttonbackground(this.currentstyle.buttonbackground);
		this.on_apply_style_textpadding(this.currentstyle.textpadding);

		this._setEventHandler("onkeyup", this.on_notify_checkbox_onkeyup, this);

		this.on_apply_prop_rtldirection();
	};

	_pCheckBox.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}

		if (this.chkimg) {
			this.chkimg.destroy();
			this.chkimg = null;
		}
		this.binddataset = null;
		this.falsevalue = null;
		this.truevalue = null;
	};

	_pCheckBox.on_change_containerRect = function (width, height) {
		var text_elem = this._text_elem;
		var pseudo = this._pseudo;
		var align = this.on_find_CurrentStyle_align(pseudo);

		if (text_elem) {
			text_elem.setElementSize(width, height);
			this.on_apply_style_align(align);
		}

		var buttonalign = this.on_find_CurrentStyle_buttonalign(pseudo);
		this.on_apply_style_buttonalign(buttonalign);
	};

	_pCheckBox.on_getBindableProperties = function () {
		return "value";
	};

	_pCheckBox.__getBindableProperties = function () {
		return "value";
	};

	_pCheckBox.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			this._setValue(undefined, false, false);
			return true;
		}
	};

	_pCheckBox.on_change_bindSource = function (propid, ds, row, col, index) {
		this.binddataset = ds;

		if (propid == "value") {
			this._setValue(ds.getColumn(row, col), false, false);
			return true;
		}
		return false;
	};

	_pCheckBox.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}

		if (this.chkimg) {
			this.chkimg._setEnable(enable);
		}
	};

	_pCheckBox.set_value = function (v) {
		if (this.value != v) {
			this._setValue(v, true, false);
		}
	};

	_pCheckBox.on_apply_value = function () {
		if (this.chkimg) {
			if (this.isChecked() == true) {
				var image = "theme://images/checked.gif";

				if (this.currentstyle.buttonimage) {
					image = this.currentstyle.buttonimage._value;
					this.chkimg.set_image(image);
					this.chkimg.set_imagealign("center middle");
				}
			}
			else {
				this.chkimg.set_image("");
			}
			this.chkimg.on_apply_style_cursor(this.currentstyle.cursor);
		}
	};

	_pCheckBox.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pCheckBox.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}
	};

	_pCheckBox.set_text = function (v) {
		var val = v;
		if (v === undefined || v === null) {
			val = "";
		}
		else {
			val = v.toString();
		}

		if (val != this.text) {
			this.text = val;
			this.on_apply_text();
		}

		return this.text;
	};

	_pCheckBox.on_apply_text = function () {
		if (this._text_elem) {
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
				parser = null;
				exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);

				if (exprfn) {
					try {
						var val = nexacro._toString(exprfn.call(null, this));
						if (val != this.displaytext) {
							this.displaytext = val;
						}
					}
					catch (e) {
						parser = null;
						return;
					}
				}
				parser = null;
			}
			else {
				this.displaytext = this.text;
			}

			this._text_elem.setElementText(this.displaytext);
			this._refreshAccessibilityValue();
		}
	};

	_pCheckBox.set_truevalue = function (v) {
		if (this.truevalue != v) {
			if (this.isChecked()) {
				this.value = v;
			}
			this.truevalue = v;
			this._reCalcValue();
			return this.truevalue;
		}
	};

	_pCheckBox.set_falsevalue = function (v) {
		if (this.falsevalue != v) {
			if (!this.isChecked()) {
				this.value = v;
			}
			this.falsevalue = v;
			this._reCalcValue();
			return this.falsevalue;
		}
	};

	_pCheckBox.isChecked = function () {
		return this._isChecked(this.value);
	};

	_pCheckBox.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pCheckBox.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable) {
			return false;
		}

		if (this.readonly == false) {
			if (this._isChecked(this.value)) {
				if (this.falsevalue != undefined && this.falsevalue != "") {
					this._setValue(this.falsevalue, true);
				}
				else {
					this._setValue(false, true);
				}
			}
			else {
				if (this.truevalue != undefined && this.truevalue != "") {
					this._setValue(this.truevalue, true);
				}
				else {
					this._setValue(true, true);
				}
			}
		}

		if (this.onclick && this.onclick._has_handlers) {
			var evt = new nexacro.ClickEventInfo(this, "onclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onclick._fireEvent(this, evt);
		}
		return false;
	};

	_pCheckBox.on_fire_onsize = function (width, height) {
		this.on_update_style_buttonalign();
		return nexacro.Component.prototype.on_fire_onsize.call(this, width, height);
	};

	_pCheckBox.on_fire_onchanged = function (obj, prevalue, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.CheckBoxChangedEventInfo(this, "onchanged", prevalue, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
		return false;
	};

	_pCheckBox.on_fire_canchange = function (obj, prevalue, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.CheckBoxChangedEventInfo(this, "canchange", prevalue, postvalue);
			return this.canchange._fireEvent(this, evt);
		}
		return true;
	};

	_pCheckBox.on_notify_checkbox_onkeyup = function (obj, e) {
		if (e.keycode == nexacro.Event.KEY_SPACE) {
			this.on_fire_onclick("", e.altKey, e.ctrlKey, e.shiftKey, -1, -1, -1, -1, -1, -1, this.parent, this);
		}
	};

	_pCheckBox._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this.on_fire_onclick("", e.alt_key, e.ctrl_key, e.shift_key, -1, -1, -1, -1, -1, -1, this.parent, this);
	};

	_pCheckBox._setValue = function (val, bBind, bFireEvent) {
		var retn;
		if (this.isChecked() == this._isChecked(val)) {
			return this.value;
		}

		if (bFireEvent !== false) {
			retn = this.on_fire_canchange(this, this.value, val);
		}


		if (retn || retn === undefined) {
			var postVal = this.value;
			this.value = val;
			this._reCalcValue();

			this._setAccessibilityStatChecked(this.isChecked());

			if (postVal !== this.value) {
				if (bFireEvent !== false) {
					this.on_fire_onchanged(this, postVal, this.value);
				}
			}

			if (bBind == true) {
				var ret = this.applyto_bindSource("value", val);

				if (ret == false) {
					this.value = postVal;
					this._reCalcValue();
				}
			}
		}
		return this.value;
	};

	_pCheckBox._isChecked = function (value) {
		if (this.truevalue != null) {
			if (this.falsevalue != null) {
				if (value == this.falsevalue || value === undefined) {
					return false;
				}

				if (value == this.truevalue || nexacro._toBoolean(value)) {
					return true;
				}

				return false;
			}
			else {
				if (value == this.truevalue || nexacro._toBoolean(value)) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		else {
			if (this.falsevalue != null) {
				if (value == this.falsevalue) {
					return false;
				}
				else {
					return true;
				}
			}
			else {
				return nexacro._toBoolean(value);
			}
		}
	};

	_pCheckBox._verticalalign = function (valign) {
	};

	_pCheckBox._reCalcValue = function () {
		if (!this._control_element) {
			return;
		}

		if (this.isChecked()) {
			if (!this.truevalue) {
				if (parseInt(this.value) != 1) {
					this.value = true;
				}
				else {
					this.value = 1;
				}
			}
		}
		else {
			if (!this.falsevalue) {
				if (parseInt(this.value) != 0) {
					this.value = false;
				}
				else {
					this.value = 0;
				}
			}
		}
		this._setAccessibilityStatChecked(this.isChecked());
		this.on_apply_value();
	};

	delete _pCheckBox;

	nexacro.CheckBoxCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CheckBox.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	_pCheckBoxCtrl = nexacro._createPrototype(nexacro.CheckBox, nexacro.CheckBoxCtrl);
	nexacro.CheckBoxCtrl.prototype = _pCheckBoxCtrl;
	_pCheckBoxCtrl._type_name = "CheckBoxControl";

	nexacro._setForControlStyleFinder(_pCheckBoxCtrl);

	delete _pCheckBoxCtrl;

	nexacro.CheckBoxImageCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageViewerCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	_pCheckBoxImageCtrl = nexacro._createPrototype(nexacro.ImageViewerCtrl, nexacro.CheckBoxImageCtrl);
	nexacro.CheckBoxImageCtrl.prototype = _pCheckBoxImageCtrl;


	_pCheckBoxImageCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbackground(pseudo);
	};

	_pCheckBoxImageCtrl.on_find_CurrentStyle_buttonbackgroundimagemode = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbackgroundimagemode(pseudo);
	};

	_pCheckBoxImageCtrl.on_find_CurrentStyle_image = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonimage(pseudo);
	};

	_pCheckBoxImageCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonborder(pseudo);
	};

	_pCheckBoxImageCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbordertype(pseudo);
	};

	_pCheckBoxImageCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttongradation(pseudo);
	};

	_pCheckBoxImageCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pCheckBoxImageCtrl.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this.parent, this);
	};

	_pCheckBoxImageCtrl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this.parent, this);
	};

	delete _pCheckBoxImageCtrl;
}
;
