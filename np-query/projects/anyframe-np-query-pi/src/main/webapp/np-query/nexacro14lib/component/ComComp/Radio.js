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

if (!nexacro.RadioClickEventInfo) {
	nexacro.RadioClickEventInfo = function (obj, id, index, itemText, itemValue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		nexacro.ClickEventInfo.call(this, obj, id || "onradioclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.index = index;
		this.itemtext = itemText;
		this.itemvalue = itemValue;
	};
	var _pRadioClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.RadioClickEventInfo);
	nexacro.RadioClickEventInfo.prototype = _pRadioClickEventInfo;
	_pRadioClickEventInfo._type_name = "RadioClickEventInfo";

	delete _pRadioClickEventInfo;
}

if (!nexacro.Radio) {
	nexacro.Radio_Style = function (target) {
		nexacro.Style.call(this);
		this.buttonalign = null;
		this.buttonbackground = null;
		this.buttonbackgroundimagemode = null;
		this.buttonborder = null;
		this.buttoncolor = null;
		this.buttongradation = null;
		this.buttonimage = null;
		this.buttonsize = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.textpadding = null;

		if (target) {
			this._target = target;
		}
	};

	var _pRadioStyle = nexacro._createPrototype(nexacro.Style, nexacro.Radio_Style);
	nexacro.Radio_Style.prototype = _pRadioStyle;

	eval(nexacro._createAlignAttributeEvalStr("_pRadioStyle", "buttonalign"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pRadioStyle", "buttonbackground"));
	eval(nexacro._createValueAttributeEvalStr("_pRadioStyle", "buttonbackgroundimagemode"));
	eval(nexacro._createBorderAttributeEvalStr("_pRadioStyle", "buttonborder"));
	eval(nexacro._createColorAttributeEvalStr("_pRadioStyle", "buttoncolor"));
	eval(nexacro._createGradationAttributeEvalStr("_pRadioStyle", "buttongradation"));
	eval(nexacro._createValueAttributeEvalStr("_pRadioStyle", "buttonimage"));
	eval(nexacro._createValueAttributeEvalStr("_pRadioStyle", "buttonsize"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pRadioStyle", "itembackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pRadioStyle", "itemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pRadioStyle", "itembordertype"));
	eval(nexacro._createGradationAttributeEvalStr("_pRadioStyle", "itemgradation"));
	eval(nexacro._createPaddingAttributeEvalStr("_pRadioStyle", "itempadding"));
	eval(nexacro._createPaddingAttributeEvalStr("_pRadioStyle", "textpadding"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pRadioStyle", "accessibility"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pRadioStyle", "itemaccessibility"));

	_pRadioStyle.__custom_emptyObject = function () {
		this.buttonalign = null;
		this.buttonbackground = null;
		this.buttonbackgroundimagemode = null;
		this.buttonborder = null;
		this.buttoncolor = null;
		this.buttongradation = null;
		this.buttonimage = null;
		this.buttonsize = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.textpadding = null;
		this.accessibility = null;
		this.itemaccessibility = null;
	};

	_pRadioStyle.__get_custom_style_value = function () {
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
		if (this.buttoncolor && this.buttoncolor._is_empty) {
			val += "buttoncolor:" + this.buttoncolor._value + "; ";
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
		if (this.itembackground && this.itembackground._is_empty) {
			val += "itembackground:" + this.itembackground._value + "; ";
		}
		if (this.itemborder && this.itemborder._is_empty) {
			val += "itemborder:" + this.itemborder._value + "; ";
		}
		if (this.itembordertype && this.itembordertype._is_empty) {
			val += "itembordertype:" + this.itembordertype._value + "; ";
		}
		if (this.itemgradation && this.itemgradation._is_empty) {
			val += "itemgradation:" + this.itemgradation._value + "; ";
		}
		if (this.itempadding && this.itempadding._is_empty) {
			val += "itempadding:" + this.itempadding._value + "; ";
		}
		if (this.accessibility && this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}
		if (this.itemaccessibility && this.itemaccessibility._is_empty) {
			val += "itemaccessibility:" + this.itemaccessibility._value + "; ";
		}
		return val;
	};

	nexacro.Radio_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.buttonalign = null;
		this.buttonimage = null;
		this.textpadding = null;
		this.buttonborder = null;
		this.buttoncolor = null;
		this.buttonsize = null;
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonbackgroundimagemode = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;
		this.itempadding = null;
	};

	var _pRadioCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Radio_CurrentStyle);
	nexacro.Radio_CurrentStyle.prototype = _pRadioCurrentStyle;
	_pRadioCurrentStyle.__get_custom_style_value = _pRadioStyle.__get_custom_style_value;
	_pRadioCurrentStyle.__custom_emptyObject = _pRadioStyle.__custom_emptyObject;

	delete _pRadioStyle;
	delete _pRadioCurrentStyle;

	nexacro.Radio = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.pre_index = -1;
		this.pre_text;
		this.pre_value;
		this.datacolumn = "";
		this.value = undefined;
		this.index = -1;
		this.index_init = -1;
		this.codecolumn = "";
		this.readonly = false;
		this.innerdataset = null;
		this.columncount = 0;
		this.rowcount = 0;
		this.direction = "horizontal";


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
			"ondragend" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"onitemclick" : 1, 
			"onitemchanged" : 1, 
			"canitemchange" : 1, 
			"onmousedown" : 1, 
			"onmouseup" : 1, 
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


		this._apply_pushed_pseudo = true;
		this._do_apply_val = true;
		this._accessibility_role = "radio";
		this._want_tab = true;
		this._want_arrow = false;
		this._is_first_focus = false;
		this._is_tab_focus = false;
		this._accessibility_index = -1;
		this._items = [];
		this._exprcache = {
		};
	};

	var _pRadio = nexacro._createPrototype(nexacro.Component, nexacro.Radio);
	nexacro.Radio.prototype = _pRadio;
	_pRadio._type_name = "Radio";

	_pRadio.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;
		var buttonalign = this.on_find_CurrentStyle_buttonalign(pseudo);
		var buttonbackground = this.on_find_CurrentStyle_buttonbackground(pseudo);
		var buttonbackgroundimagemode = this.on_find_CurrentStyle_buttonbackgroundimagemode(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttoncolor = this.on_find_CurrentStyle_buttoncolor(pseudo);
		var buttongradation = this.on_find_CurrentStyle_buttongradation(pseudo);
		var buttonimage = this.on_find_CurrentStyle_buttonimage(pseudo);
		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);
		var itembackground = this.on_find_CurrentStyle_itembackground(pseudo);
		var itemborder = this.on_find_CurrentStyle_itemborder(pseudo);
		var itembordertype = this.on_find_CurrentStyle_itembordertype(pseudo);
		var itemgradation = this.on_find_CurrentStyle_itemgradation(pseudo);
		var itempadding = this.on_find_CurrentStyle_itempadding(pseudo);
		var textpadding = this.on_find_CurrentStyle_textpadding(pseudo);
		var font = this.on_find_CurrentStyle_font(pseudo);
		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		var color = this.on_find_CurrentStyle_color(pseudo);
		var align = this.on_find_CurrentStyle_align(pseudo);
		var accessibility = this.on_find_CurrentStyle_accessibility(pseudo);
		var itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(pseudo);

		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(curstyle.font);
		}
		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(curstyle.letterspace);
		}
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(curstyle.color);
		}
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(curstyle.align);
		}
		if (buttonalign != curstyle.buttonalign) {
			curstyle.buttonalign = buttonalign;
			this.on_apply_style_buttonalign(curstyle.buttonalign);
		}
		if (buttonbackground != curstyle.buttonbackground) {
			curstyle.buttonbackground = buttonbackground;
			this.on_apply_style_buttonbackground(curstyle.buttonbackground);
		}
		if (buttonbackgroundimagemode != curstyle.buttonbackgroundimagemode) {
			curstyle.buttonbackgroundimagemode = buttonbackgroundimagemode;
			this.on_apply_style_buttonbackgroundimagemode(curstyle.buttonbackgroundimagemode);
		}
		if (buttonborder != curstyle.buttonborder) {
			curstyle.buttonborder = buttonborder;
			this.on_apply_style_buttonborder(curstyle.buttonborder);
		}
		if (buttoncolor != curstyle.buttoncolor) {
			curstyle.buttoncolor = buttoncolor;
			this.on_apply_style_buttoncolor(curstyle.buttoncolor);
		}
		if (buttongradation != curstyle.buttongradation) {
			curstyle.buttongradation = buttongradation;
			this.on_apply_style_buttongradation(curstyle.buttongradation);
		}
		if (buttonimage != curstyle.buttonimage) {
			curstyle.buttonimage = buttonimage;
			this.on_apply_style_buttonimage(curstyle.buttonimage);
		}
		if (buttonsize != curstyle.buttonsize) {
			curstyle.buttonsize = buttonsize;
			this.on_apply_style_buttonsize(curstyle.buttonsize);
		}
		if (itembackground != curstyle.itembackground) {
			curstyle.itembackground = itembackground;
			this.on_apply_style_itembackground(curstyle.itembackground);
		}
		if (itemborder != curstyle.itemborder) {
			curstyle.itemborder = itemborder;
			this.on_apply_style_itemborder(curstyle.itemborder);
		}
		if (itembordertype != curstyle.itembordertype) {
			curstyle.itembordertype = itembordertype;
			this.on_apply_style_itembordertype(curstyle.itembordertype);
		}
		if (itemgradation != curstyle.itemgradation) {
			curstyle.itemgradation = itemgradation;
			this.on_apply_style_itemgradation(curstyle.itemgradation);
		}
		if (itempadding != curstyle.itempadding) {
			curstyle.itempadding = itempadding;
			this.on_apply_style_itempadding(curstyle.itempadding);
		}
		if (textpadding != curstyle.textpadding) {
			curstyle.textpadding = textpadding;
			this.on_apply_style_textpadding(curstyle.textpadding);
		}
		if (accessibility != curstyle.accessibility) {
			curstyle.accessibility = accessibility;
			this.on_update_style_accessibility();
		}
		if (itemaccessibility != curstyle.itemaccessibility) {
			this.currentstyle.itemaccessibility = itemaccessibility;
			this.on_apply_style_itemaccessibility(itemaccessibility);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pRadio.on_create_custom_style = function () {
		return new nexacro.Radio_Style(this);
	};

	_pRadio.on_create_custom_currentStyle = function () {
		return new nexacro.Radio_CurrentStyle();
	};


	_pRadio.on_find_CurrentStyle_buttonalign = function (pseudo) {
		return this._find_pseudo_obj("buttonalign", pseudo, "align");
	};

	_pRadio.on_find_CurrentStyle_buttonbackground = function (pseudo) {
		return this._find_pseudo_obj("buttonbackground", pseudo, "background");
	};

	_pRadio.on_find_CurrentStyle_buttonbackgroundimagemode = function (pseudo) {
		return this._find_pseudo_obj("buttonbackgroundimagemode", pseudo);
	};

	_pRadio.on_find_CurrentStyle_buttonborder = function (pseudo) {
		return this._find_pseudo_obj("buttonborder", pseudo, "border");
	};

	_pRadio.on_find_CurrentStyle_buttoncolor = function (pseudo) {
		return this._find_pseudo_obj("buttoncolor", pseudo, "color");
	};

	_pRadio.on_find_CurrentStyle_buttongradation = function (pseudo) {
		return this._find_pseudo_obj("buttongradation", pseudo, "gradation");
	};

	_pRadio.on_find_CurrentStyle_buttonimage = function (pseudo) {
		return this._find_pseudo_obj("buttonimage", pseudo);
	};

	_pRadio.on_find_CurrentStyle_buttonsize = function (pseudo) {
		return this._find_pseudo_obj("buttonsize", pseudo);
	};

	_pRadio.on_find_CurrentStyle_itembackground = function (pseudo) {
		return this._find_pseudo_obj("itembackground", pseudo, "background");
	};

	_pRadio.on_find_CurrentStyle_itemborder = function (pseudo) {
		return this._find_pseudo_obj("itemborder", pseudo, "border");
	};

	_pRadio.on_find_CurrentStyle_itembordertype = function (pseudo) {
		return this._find_pseudo_obj("itembordertype", pseudo, "bordertype");
	};

	_pRadio.on_find_CurrentStyle_itemgradation = function (pseudo) {
		return this._find_pseudo_obj("itemgradation", pseudo, "gradation");
	};

	_pRadio.on_find_CurrentStyle_itempadding = function (pseudo) {
		return this._find_pseudo_obj("itempadding", pseudo, "padding");
	};

	_pRadio.on_find_CurrentStyle_itemaccessibility = function (pseudo) {
		var itemaccessibility = this._find_pseudo_obj("itemaccessibility", pseudo, "accessibility");
		return itemaccessibility ? itemaccessibility : nexacro.Component._default_accessibility;
	};

	_pRadio.on_find_CurrentStyle_textpadding = function (pseudo) {
		return this._find_pseudo_obj("textpadding", pseudo, "padding");
	};

	_pRadio.on_update_style_buttonalign = function () {
		this.currentstyle.buttonalign = this.on_find_CurrentStyle_buttonalign(this._pseudo);
		this.on_apply_style_buttonalign(this.currentstyle.buttonalign);
	};

	_pRadio.on_update_style_buttonimage = function () {
		this.currentstyle.buttonimage = this.on_find_CurrentStyle_buttonimage(this._pseudo);
		this.on_apply_style_buttonimage(this.currentstyle.buttonimage);
	};

	_pRadio.on_update_style_textpadding = function () {
		this.currentstyle.textpadding = this.on_find_CurrentStyle_textpadding(this._pseudo);
		this.on_apply_style_textpadding(this.currentstyle.textpadding);
	};

	_pRadio.on_update_style_buttonborder = function () {
		this.currentstyle.buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo);
		this.on_apply_style_buttonborder(this.currentstyle.buttonborder);
	};

	_pRadio.on_update_style_buttoncolor = function () {
		this.currentstyle.buttoncolor = this.on_find_CurrentStyle_buttoncolor(this._pseudo);
		this.on_apply_style_buttoncolor(this.currentstyle.buttoncolor);
	};

	_pRadio.on_update_style_buttonsize = function () {
		this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);
		this.on_apply_style_buttonsize(this.currentstyle.buttonsize);
	};

	_pRadio.on_update_style_buttonbackground = function () {
		this.currentstyle.buttonbackground = this.on_find_CurrentStyle_buttonbackground(this._pseudo);
		this.on_apply_style_buttonbackground(this.currentstyle.buttonbackground);
	};

	_pRadio.on_update_style_buttongradation = function () {
		this.currentstyle.buttongradation = this.on_find_CurrentStyle_buttongradation(this._pseudo);
		this.on_apply_style_buttongradation(this.currentstyle.buttongradation);
	};

	_pRadio.on_update_style_buttonbackgroundimagemode = function () {
		this.currentstyle.buttonbackgroundimagemode = this.on_find_CurrentStyle_buttonbackgroundimagemode(this._pseudo);
		this.on_apply_style_buttonbackgroundimagemode(this.currentstyle.buttonbackgroundimagemode);
	};

	_pRadio.on_update_style_itembackground = function () {
		this.currentstyle.itembackground = this.on_find_CurrentStyle_itembackground(this._pseudo);
		this.on_apply_style_itembackground(this.currentstyle.itembackground);
	};

	_pRadio.on_update_style_itemborder = function () {
		this.currentstyle.itemborder = this.on_find_CurrentStyle_itemborder(this._pseudo);
		this.on_apply_style_itemborder(this.currentstyle.itemborder);
	};

	_pRadio.on_update_style_itembordertype = function () {
		this.currentstyle.itembordertype = this.on_find_CurrentStyle_itembordertype(this._pseudo);
		this.on_apply_style_itembordertype(this.currentstyle.itembordertype);
	};

	_pRadio.on_update_style_itemgradation = function () {
		this.currentstyle.itemgradation = this.on_find_CurrentStyle_itemgradation(this._pseudo);
		this.on_apply_style_itemgradation(this.currentstyle.itemgradation);
	};

	_pRadio.on_update_style_itempadding = function () {
		this.currentstyle.itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo);
		this.on_apply_style_itempadding(this.currentstyle.itempadding);
	};

	_pRadio.on_update_style_itemaccessibility = function () {
		this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo);
		this.on_apply_style_itemaccessibility(this._make_accessibility_value(this.currentstyle.itemaccessibility));
	};

	_pRadio._search_style_obj = function (propobj, propid, idx) {
		if (propobj && propobj._bindtype != 0) {
			return nexacro._getValueForStyleBindExpr(this, propobj, propid, idx);
		}
		else {
			return propobj;
		}
	};


	_pRadio.on_apply_style_align = function (align) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_align(align);
			}
		}
	};

	_pRadio.on_apply_style_color = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "color", i);
				radioitems[i].on_apply_style_color(v);
			}
		}
	};

	_pRadio.on_apply_style_font = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "font", i);
				radioitems[i].on_apply_style_font(v);
			}
		}
	};

	_pRadio.on_apply_style_cursor = function (cursor) {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementCursor(cursor);

			var radioitems = this._items;
			if (radioitems) {
				var item_len = radioitems.length;
				for (var i = 0; i < item_len; i++) {
					radioitems[i].on_apply_style_cursor(cursor);
				}
			}
		}
	};

	_pRadio.on_apply_style_buttonalign = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttonalign();
			}
		}
	};

	_pRadio.on_apply_style_buttonbackground = function (buttonbackground) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttonbackground(buttonbackground);
			}
		}
	};

	_pRadio.on_apply_style_buttonbackgroundimagemode = function (buttonbackgroundimagemode) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttonbackgroundimagemode(buttonbackgroundimagemode);
			}
		}
	};

	_pRadio.on_apply_style_buttonborder = function (buttonborder) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttonborder(buttonborder);
			}
		}
	};

	_pRadio.on_apply_style_buttoncolor = function (buttoncolor) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttoncolor(buttoncolor);
			}
		}
	};

	_pRadio.on_apply_style_buttongradation = function (buttongradation) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttongradation(buttongradation);
			}
		}
	};

	_pRadio.on_apply_style_buttonimage = function (buttonimage) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttonimage(buttonimage);
			}
		}
	};

	_pRadio.on_apply_style_buttonsize = function (buttonsize) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_buttonsize(buttonsize);
			}
		}
	};

	_pRadio.on_apply_style_textpadding = function (textpadding) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i].on_apply_style_textpadding(textpadding);
			}
		}
	};

	_pRadio.on_apply_style_itembackground = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "background", i);
				radioitems[i].on_update_style_background();
			}
		}
	};

	_pRadio.on_apply_style_itemborder = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "border", i);
				radioitems[i].on_apply_style_border(v);
			}
		}
	};

	_pRadio.on_apply_style_itembordertype = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "bordertype", i);
				radioitems[i].on_apply_style_bordertype(v);
			}
		}
	};

	_pRadio.on_apply_style_itemgradation = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "gradation", i);
				radioitems[i].on_apply_style_gradation(v);
			}
		}
	};

	_pRadio.on_apply_style_itempadding = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				v = this._search_style_obj(v, "padding", i);
				radioitems[i].on_apply_style_padding(v);
			}
		}
	};

	_pRadio.on_apply_style_accessibility = function (accessibility) {
		if (accessibility) {
			var control_elem = this.getElement();
			if (control_elem) {
				control_elem.setAccessibility(accessibility);
			}
		}
	};

	_pRadio.on_apply_style_itemaccessibility = function (itemaccessibility) {
		var radioitems = this._items;
		this.currentstyle.itemaccessibility = itemaccessibility;

		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				if (itemaccessibility) {
					var accessibility = this._search_style_obj(itemaccessibility, "accessibility", i);
					if (accessibility) {
						radioitems[i].style.set_accessibility(accessibility._value);
					}
				}
			}
		}
	};

	_pRadio.on_apply_style_letterspace = function (letterspace) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				letterspace = this._search_style_obj(letterspace, "letterspace", i);
				radioitems[i].on_apply_style_letterspace(letterspace);
			}
		}
	};

	_pRadio.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (!this.innerdataset) {
				var text_elem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = text_elem;
				var halign = this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign;
				var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);
			}
		}
	};

	_pRadio.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var innerdataset = this._innerdataset;
			var datacolumn = this.datacolumn == "" ? this.codecolumn : this.datacolumn;
			var codecolumn = this.codecolumn;
			var text = "";
			var code = "";
			var radioitem = null;

			if (innerdataset) {
				var rows = innerdataset.getRowCount();
				var valueproc = false;
				if (rows > 0) {
					for (var i = 0; i < rows; i++) {
						text = innerdataset.getColumn(i, datacolumn);
						code = innerdataset.getColumn(i, codecolumn);
						radioitem = new nexacro.RadioItemCtrl("item", "absolute", 0, 0, 0, 0, null, null, this);
						radioitem.set_text(text);
						radioitem.set_code(code);
						radioitem.set_index(i);
						if (code) {
							if (code == this.value && valueproc == false) {
								radioitem.set_value(true);
								valueproc = true;
							}
						}

						radioitem.createComponent();
						if (nexacro._enableaccessibility) {
							radioitem._setAccessibilityInfoCount(rows);
							radioitem._setAccessibilityInfoIndex(i);
						}
						radioitem._setEventHandler("onclick", this.on_notify_item_onclick, this);

						this._items[i] = radioitem;
					}
					this._update_radioitem();
				}
				if (this.index_init > -1 && this.index < 0 && this.value === undefined) {
					this.index = this.index_init;
				}

				this.on_apply_index(this.pre_index, this.index, false);
			}
			else {
				var text_elem = this._text_elem;
				if (text_elem) {
					text_elem.create();
					this.on_apply_text();
				}
			}
			this.on_apply_readonly(this.readonly);
			this.on_apply_value();

			if (nexacro._enableaccessibility) {
				this._want_arrow = nexacro._enableaccessibility;
				this.on_update_style_accessibility();
				this._refreshAccessibilityValue();
			}

			this.on_apply_style_color(this.currentstyle.color);
			this.on_apply_style_font(this.currentstyle.font);
			this.on_apply_style_align(this.currentstyle.align);
			this.on_apply_style_cursor(this.currentstyle.cursor);
			this.on_apply_style_buttonalign(this.currentstyle.buttonalign);
			this.on_apply_style_letterspace(this.currentstyle.letterspace);
			this._setEventHandler("onkeydown", this.on_notify_radio_onkeydown, this);
		}
		this.on_apply_prop_rtldirection();
	};

	_pRadio.on_destroy_contents = function () {
		var items = this._items;
		var item_len = items.length;

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}

		for (var i = 0; i < item_len; i++) {
			items[i].destroy();
			items[i] = null;
		}
		this._items = null;

		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);
			this._innerdataset = null;
		}

		this._exprcache = null;
	};

	_pRadio.on_change_containerRect = function (_client_width, _client_height) {
		this._update_radioitem();
	};

	_pRadio.on_getBindableProperties = function () {
		return "value";
	};

	_pRadio.on_apply_prop_enable = function (v) {
		var radioitems = this._items;
		if (radioitems) {
			var item_len = radioitems.length;
			for (var i = 0; i < item_len; i++) {
				radioitems[i]._setEnable(v);
			}
		}
	};

	_pRadio.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			this.value = undefined;

			var preRadio = this._getItem(this.index);
			var curRadio = this._getItem(-1);

			this.index = -1;

			if (preRadio) {
				preRadio.set_value(false);
			}

			if (curRadio) {
				curRadio.set_value(true);
				this.text = curRadio.text;
			}

			return true;
		}
	};

	_pRadio.on_change_bindSource = function (propid, pSendDataset, rowIdx, colIdx, colArrayIdx) {
		if (propid == "value") {
			var val = pSendDataset.getColumn(rowIdx, colIdx);
			this.value = val;
			var dataset = this._innerdataset;

			if (!dataset) {
				return true;
			}

			var code = this.codecolumn;
			var row = dataset.findRow(code, val);

			var preRadio = this._getItem(this.index);
			var curRadio = this._getItem(row);

			this.index = row;

			if (preRadio) {
				preRadio.set_value(false);
			}

			if (curRadio) {
				curRadio.set_value(true);
				this.text = curRadio.text;
			}
			return true;
		}
		return false;
	};

	_pRadio.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var items = this._items;
		var accIdx = this._accessibility_index;
		var index = this.index;
		var count = items.length;

		if (keycode == nexacro.Event.KEY_TAB) {
			if (shift_key) {
				if (accIdx < 0) {
					this._want_tab = false;
				}
				else {
					var last_focused = this._last_focused;
					this._do_defocus(last_focused, true);
					if (last_focused && last_focused._selected) {
						last_focused._stat_change("select", "selected");
					}
					this._on_focus(true);
					this._accessibility_index = -1;
				}
			}
			else {
				this._want_tab = false;
			}

			this._getWindow()._keydown_element._event_stop = true;
		}
		else if (keycode == nexacro.Event.KEY_SPACE) {
			if (!this.readonly) {
				if (this._accessibility_index > -1) {
					items[this._accessibility_index]._stat_change("notfocus", "normal");
					this.set_index(this._accessibility_index);
				}
			}
		}
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pRadio.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var ret = false;
		var items = this._items;

		if (items && items.length > 0) {
			if (direction > 0) {
				this._accessibility_index++;
			}
			else {
				this._accessibility_index--;
			}

			if (items[this._accessibility_index]) {
				ret = true;
				items[this._accessibility_index]._setAccessibilityNotifyEvent();
			}
		}

		return ret;
	};

	_pRadio._setAccessibilityNotifyEvent = function (direction) {
		var items = this._items;

		if (items && items.length > 0) {
			var obj = null;

			if (this._accessibility_index < 0 || this._accessibility_index >= items.length) {
				if (direction == undefined) {
					direction = 1;
				}

				if (direction > 0) {
					this._accessibility_index = 0;
				}
				else {
					this._accessibility_index = items.length - 1;
				}
			}

			obj = items[this._accessibility_index];
			if (obj) {
				return obj._setAccessibilityNotifyEvent();
			}
		}
		else {
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	_pRadio._setAccessibilityInfoByHover = function (control) {
		if (control) {
			if (control.parent instanceof nexacro.RadioItemCtrl) {
				control = control.parent;
			}

			this._accessibility_index = control.index;
			return control._setAccessibilityNotifyEvent();
		}
		else {
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this);
		}
	};

	_pRadio._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		if (keycode && (keycode == nexacro.Event.KEY_TAB)) {
			var want_tab = this._getPreCalculateWantTab(keycode, shiftKey);
		}
		else {
			var _want_arrow = this._getPreCalculateWantArrow(keycode);
		}

		if (this._is_first_focus) {
			this._is_first_focus = false;
			this._is_tab_focus = false;
		}
		this._want_arrow = nexacro._enableaccessibility;
		this._want_tab = true;
		return {
			want_tab : want_tab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrow
		};
	};


	_pRadio._setFocus = function (bResetScroll, dir) {
		this._focus_direction = dir;
		var retn = this.setFocus(bResetScroll);
		this._focus_direction = -1;
		return retn;
	};

	_pRadio._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var retn = false;
		var focusdir = this._focus_direction;
		if (evt_name == "tabkey") {
			focusdir = 0;
		}
		else if (evt_name == "shifttabkey") {
			focusdir = 1;
		}
		else if (evt_name == "downkey") {
			focusdir = 2;
		}
		else if (evt_name == "upkey") {
			focusdir = 3;
		}

		if (self_flag == false) {
			this._focus_direction = -1;
		}

		if (focusdir >= 0) {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			if (self_flag == false) {
				this._accessibility_index = -1;
				if (focusdir < 2) {
					var items = this._items;
					if (items && items.length > 0) {
						var comp;
						this._is_tab_focus = true;
						this._is_first_focus = true;

						if (this.index > -1) {
							this._accessibility_index = this.index;
							comp = items[this._accessibility_index];
							comp._on_focus(true);
							comp._stat_change("select", "selected");
						}
						else {
							if (focusdir == 0) {
								this._accessibility_index = 0;
							}
							else {
								this._accessibility_index = items.length - 1;
							}
							comp = items[this._accessibility_index];
							comp._on_focus(true);
						}
					}
				}
				else if (nexacro._enableaccessibility) {
					if (!this.readonly) {
						if (focusdir == 2) {
							if (!this._isAccessibilityEnable()) {
								var items = this._items;
								this._is_first_focus = true;
								if (this.index > -1) {
									comp = items[this._accessibility_index = this.index];
									this.set_index(this._accessibility_index);
									comp._on_focus(true);
								}
								else if (items.length > 0) {
									var idx = this._getNextAccessibilityOrderIndex(1);
									if (idx > -1) {
										this.set_index(idx);
										this._accessibility_index = idx;
										var comp = items[idx];
										comp._on_focus(true);
									}
								}
								comp._stat_change("select", "selected");
							}
						}
						else if (focusdir == 3) {
							if (!this._isAccessibilityEnable()) {
								var items = this._items;
								this._is_first_focus = true;
								if (this.index > -1) {
									comp = items[this._accessibility_index = this.index];
									this.set_index(this._accessibility_index);
									comp._on_focus(true);
								}
								else if (items.length > 0) {
									var idx = this._getNextAccessibilityOrderIndex(1);
									if (idx > -1) {
										this.set_index(idx);
										this._accessibility_index = idx;
										var comp = items[idx];
										comp._on_focus(true);
									}
								}
								comp._stat_change("select", "selected");
							}
						}
					}
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		}
		return retn;
	};

	_pRadio._on_getAccessibilityAdditionalLabel = function () {
		if (!this._is_first_focus) {
			var count = 0;
			var items = this._items;
			if (items) {
				count = items.length;
			}
			return (this.index + 1) + " " + count;
		}
		return "";
	};

	_pRadio._on_getAccessibilityAdditionalRole = function () {
		var _role = "";
		if (!this._is_first_focus && this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo)) == "radio") {
			_role = " radio";
		}
		return _role;
	};

	_pRadio.on_get_style_accessibility_label = function () {
		var label = "";
		if (!this._is_first_focus) {
			label = this.text ? this.text : this.value;
		}
		return label;
	};

	_pRadio._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
		if (nexacro._accessibilitytype == 4) {
			var control_elem = this.getElement();
			var items = this._items;

			if (control_elem && items.length <= 0) {
				role = "static";
			}
		}
		return role;
	};

	_pRadio.set_text = nexacro._emptyFn;

	_pRadio.on_apply_text = function () {
		var control_elem = this._control_element;
		var text_elem = this._text_elem;
		if (control_elem) {
			if (!this.innerdataset) {
				if (this._text_elem) {
					text_elem.setElementText(this.id);
				}
			}
			else {
				if (this._text_elem) {
					text_elem.setElementText("");
				}
			}
			this._redraw_radioitem();
		}
	};

	_pRadio.set_value = function (v) {
		if (v != this.value) {
			if (v == undefined || v == null) {
				v = "";
			}
			else {
				v = v.toString();
			}
		}

		var pre_idx = this.index;
		var pre_val = this.value;

		this._setValue(v, false);

		var cur_idx = this.index;
		var cur_val = v;

		if (this.applyto_bindSource("value", v) == false) {
			var preRadio = this._getItem(cur_idx);
			var curRadio = this._getItem(pre_idx);

			if (preRadio) {
				preRadio.set_value(false);
			}

			if (curRadio) {
				curRadio.set_value(true);
			}

			this.index = pre_idx;
			this.value = pre_val;
		}
	};

	_pRadio.on_apply_value = function (bIndex) {
		var dataset = this._innerdataset;
		if (!dataset) {
			return;
		}
		var code = this.codecolumn;
		var data = this.datacolumn;

		if (!code && !data) {
			return;
		}

		if (this.value) {
			var row = dataset.findRow(code, this.value);
			if (bIndex != true) {
				if (this.index != row) {
					this._setIndex(row, true);
				}
			}
		}

		if (bIndex != true) {
			if (this.value == undefined || this.value === "") {
				this._setIndex(-1, true);
			}
		}
	};

	_pRadio.set_index = function (v) {
		this._setIndex(v, false);
	};

	_pRadio.on_apply_index = function (preidx, curidx, bValue) {
		var dataset = this._innerdataset;
		if (!dataset) {
			return;
		}

		var code = this.codecolumn;
		var data = this.datacolumn;
		if (!code && !data) {
			return;
		}

		var val, preRadioItem, postRadioItem;

		if (curidx >= 0) {
			val = dataset.getColumn(curidx, code);

			if (this.value != val) {
				if (this.applyto_bindSource("value", val) === false) {
					postRadioItem = this._getItem(curidx);
					if (postRadioItem) {
						postRadioItem.set_value(false);
					}

					preRadioItem = this._getItem(this.index);
					if (preRadioItem) {
						preRadioItem.set_value(true);
						this.text = preRadioItem.text;
					}

					this._do_apply_val = false;
					return;
				}

				this._setValue(val, true);
			}
		}

		if (bValue != true) {
			if (this.index == undefined) {
				this._setValue(undefined, true);
			}
		}

		if (curidx < 0) {
			var radio;
			for (var i = 0; i < this._items.length; i++) {
				radio = this._getItem(i);
				if (radio) {
					radio.set_value(false);
				}
			}

			val = undefined;

			if (this.applyto_bindSource("value", val) === false) {
				preRadioItem = this._getItem(this.index);
				if (preRadioItem) {
					preRadioItem.set_value(true);
					this.text = preRadioItem.text;
				}

				this._do_apply_val = false;
				return;
			}

			this._setValue(val, true);
		}

		var preRadio = this._getItem(preidx);
		if (preRadio) {
			preRadio.set_value(false);
		}

		var curRadio = this._getItem(curidx);
		if (curRadio) {
			curRadio.set_value(true);
			this.text = curRadio.text;
		}
		else {
			this.text = "";
		}
	};

	_pRadio.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pRadio.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		var radioitem = null;
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			radioitem = this._getItem(i);
			radioitem.set_readonly(v);
		}
	};

	_pRadio.set_datacolumn = function (v) {
		this.datacolumn = v;
		this.on_apply_datacolumn();
	};

	_pRadio.on_apply_datacolumn = function () {
		var data = this.datacolumn == "" ? this.codecolumn : this.datacolumn;
		var data_val;

		var innerdataset = this._innerdataset;
		if (!innerdataset) {
			return;
		}

		var items = this._items;
		var item_len = items.length;

		if (this._creating == false) {
			this._create_radioitem();
		}

		for (var i = 0; i < item_len; i++) {
			data_val = innerdataset.getColumn(i, data);
			if (data_val) {
				items[i].set_text(data_val);
				if (i == this.index) {
					this.text = data_val;
				}
			}
			else {
				items[i].set_text("");
				this.text = "";
			}
		}
	};

	_pRadio.set_codecolumn = function (v) {
		this.codecolumn = v;
		this.on_apply_codecolumn();
	};

	_pRadio.on_apply_codecolumn = function () {
		var code = this.codecolumn;
		var code_val;

		var innerdataset = this._innerdataset;
		if (!innerdataset) {
			return;
		}

		var items = this._items;
		var item_len = items.length;

		if (this._creating == false) {
			this._create_radioitem();
		}

		for (var i = 0; i < item_len; i++) {
			code_val = innerdataset.getColumn(i, code);
			if (code_val) {
				items[i].set_code(code_val);
			}
		}

		this.on_apply_value(false);
		this.set_index(this.index);

		if (this.datacolumn == "" && this._control_element) {
			this.on_apply_datacolumn();
		}
	};

	_pRadio.setInnerDataset = function (obj) {
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

	_pRadio._setInnerDatasetStr = function (str) {
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

	_pRadio.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pRadio.set_innerdataset = function (str) {
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

	_pRadio.on_apply_innerdataset = function () {
		var ds = this._innerdataset;
		if (ds) {
			ds._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			ds._setEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);
		}
		else {
			var text_elem = this._text_elem;
			if (!text_elem && this._control_element) {
				text_elem = new nexacro.TextBoxElement(this._control_element);
				this._text_elem = text_elem;
				var curstyle = this.currentstyle;

				var halign = (curstyle.align.halign == "" ? "center" : curstyle.align._halign);
				var valign = (curstyle.align.valign == "" ? "middle" : curstyle.align._valign);

				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementFont(curstyle.font);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(curstyle.letterspace);

				text_elem.create();
			}
		}
		this.on_apply_text();
	};

	_pRadio.set_columncount = function (v) {
		if (v != this.columncount) {
			this.columncount = v;
			this.on_apply_columncount();
		}
	};

	_pRadio.on_apply_columncount = function () {
		this._update_radioitem();
	};

	_pRadio.set_rowcount = function (v) {
		if (v != this.rowcount) {
			this.rowcount = v;
			this.on_apply_rowcount();
		}
	};

	_pRadio.on_apply_rowcount = function () {
		this._update_radioitem();
	};

	_pRadio.set_direction = function (v) {
		if (v != this.direction) {
			if (v.toString() == "") {
				v = "horizontal";
			}

			this.direction = v;
			this.on_apply_direction();
		}
	};

	_pRadio.on_apply_direction = function () {
		this._update_radioitem();
	};

	_pRadio.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		this.on_change_containerRect();
		var _rtldirection = this._rtldirection;

		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			items[i]._setRtlDirection(_rtldirection);
		}
	};

	_pRadio.getCount = function () {
		var item_len = this._items.length;
		return item_len;
	};

	_pRadio.updateToDataset = function () {
		var change_val = this.applyto_bindSource("value", this.value);
		return change_val;
	};

	_pRadio.on_notify_radio_onkeydown = function (obj, e) {
		var ds = this._innerdataset;
		if (!ds || this.readonly) {
			return false;
		}
		var row_cnt = ds.getRowCount();
		var last_idx = row_cnt - 1;
		if (row_cnt < 1) {
			return false;
		}

		var items = this._items;
		var item_len = items.length;

		for (var i = 0; i < item_len; i++) {
			if (items[i].value == true) {
				this.pre_index = items[i].index;
				this.pre_value = items[i].code;
				this.pre_text = items[i].text;
			}
		}

		var E = nexacro.Event;
		var op = undefined;
		if (!nexacro._enableaccessibility) {
			op = (e.keycode == E.KEY_UP) || (e.keycode == E.KEY_LEFT) ? -1 : (e.keycode == E.KEY_DOWN) || (e.keycode == E.KEY_RIGHT) ? 1 : undefined;
		}
		else {
			op = (e.keycode == E.KEY_LEFT) ? -1 : (e.keycode == E.KEY_RIGHT) ? 1 : undefined;
		}

		if (op !== undefined) {
			if (nexacro._enableaccessibility) {
				if (this._accessibility_index == -1 && this.index > -1) {
					obj.idx = this.index;
				}
				else if (this.index == 0 && E.KEY_UP == e.keycode) {
					var _window = this._getWindow();
					_window._removeFromCurrentFocusPath(this, true);
					if (this._isAccessibilityEnable()) {
						this._on_focus(true);
					}
					this._accessibility_index = -1;
					return;
				}
				else {
					obj.idx = this._accessibility_index + op;
				}
			}
			else {
				obj.idx = this.index + op;
			}

			if (obj.idx >= row_cnt) {
				obj.idx = 0;
			}
			else if (obj.idx < 0) {
				obj.idx = last_idx;
			}
			this._accessibility_index = obj.idx;
			var radioitem = this._getItem(obj.idx);
			if (row_cnt != obj.idx && row_cnt >= obj.idx && 0 <= obj.idx) {
				this.set_index(obj.idx);
				if (obj.idx != this.pre_index) {
					this.on_fire_onitemchanged(radioitem, e);
				}
			}

			if (nexacro._enableaccessibility) {
				radioitem._on_focus(true);
				radioitem._stat_change("select", "selected");
			}
		}
		return false;
	};

	_pRadio.on_notify_item_onclick = function (obj, e) {
		if (!this.enable || this.readonly == true) {
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
				obj._setAccessibilityNotifyEvent();
			}
			return false;
		}
		var items = this._items;
		var item_len = items.length;
		var pre_select_idx = -1;

		for (var i = 0; i < item_len; i++) {
			if (items[i].value == true) {
				this.pre_index = items[i].index;
				this.pre_value = items[i].code;
				this.pre_text = items[i].text;
				pre_select_idx = i;
			}
		}

		var ret = this.on_fire_canitemchange(obj, e);

		if (ret !== false) {
			if (pre_select_idx >= 0) {
				items[this.pre_index].set_value(false);
			}

			this.on_fire_onitemclick(obj, e);

			obj.set_value(true);
			this.set_index(obj.index);

			if (this.index != this.pre_index || pre_select_idx < 0) {
				this.on_fire_onitemchanged(obj, e);
			}

			if (nexacro._enableaccessibility) {
				this._accessibility_index = obj.index;
				obj._on_focus(true);
			}
		}
	};

	_pRadio.on_fire_canitemchange = function (obj, e) {
		if (this.canitemchange && this.canitemchange._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", this.pre_index, this.pre_text, this.pre_value, obj.index, obj.text, obj.code);
			return this.canitemchange._fireCheckEvent(this, evt);
		}
		return;
	};

	_pRadio.on_fire_onitemchanged = function (obj, e) {
		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", this.pre_index, this.pre_text, this.pre_value, obj.index, obj.text, obj.code);
			return this.onitemchanged._fireEvent(this, evt);
		}
		return false;
	};

	_pRadio.on_fire_onitemclick = function (obj, e) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(this, "onitemclick", obj.index, obj.text, obj.code);
			return this.onitemclick._fireEvent(this, evt);
		}
		return false;
	};

	_pRadio._callback_onvaluechanged = function (obj, e) {
		this._redraw_radioitem();
	};

	_pRadio._callback_onload = function (obj, e) {
	};

	_pRadio._callback_onrowsetchanged = function (obj, e) {
		this._redraw_radioitem();
	};

	_pRadio._get_contents_rows = function () {
		var buffer_pages = this._buffer_pages, ret_arr = [];
		if (buffer_pages) {
			var rowobjs, rowobj;
			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				rowobjs = buffer_pages[i];
				if (rowobjs) {
					ret_arr = ret_arr.concat(rowobjs);
				}
			}
		}
		return ret_arr;
	};

	_pRadio._setIndex = function (v, bValue) {
		v = parseInt(v) | 0;

		if (this.index_init < 0 && this.index < 0 && this._items.length == 0) {
			this.index_init = v;
		}

		if (v > 0 && this._items.length > 0 && (v >= this._items.length)) {
			v = -1;
		}
		else if (this._innerdataset && this._items.length == 0) {
			if (this._innerdataset.getRowCount() == 0) {
				v = -1;
			}
		}

		this._do_apply_val = true;
		this.on_apply_index(this.index, v, bValue);
		if (this._do_apply_val) {
			this.index = v;
		}
	};

	_pRadio._getItem = function (index) {
		var items = this._items;
		var item_len = items.length;
		if (index >= 0 && items.length > 0) {
			return items[index];
		}
		return null;
	};

	_pRadio._redraw_radioitem = function () {
		var control = this.getElement();
		var innerdataset = this._innerdataset;
		var radioitem = null;
		var text = "";
		var code = "";
		if (control && control.getRootWindowHandle()) {
			this._delete_radioitem();
			if (innerdataset) {
				var rows = innerdataset.getRowCount();
				var datacolumn = this.datacolumn;
				var codecolumn = this.codecolumn;

				if (rows > 0) {
					for (var i = 0; i < rows; i++) {
						text = innerdataset.getColumn(i, datacolumn == "" ? codecolumn : datacolumn);
						code = innerdataset.getColumn(i, codecolumn);
						radioitem = new nexacro.RadioItemCtrl("item", "absolute", 0, 0, 0, 0, null, null, this);
						radioitem.set_text(text);
						radioitem.set_code(code);
						radioitem.set_index(i);

						radioitem.createComponent();
						radioitem.on_created();
						radioitem._setEventHandler("onclick", this.on_notify_item_onclick, this);

						if (nexacro._enableaccessibility) {
							radioitem._setAccessibilityInfoIndex(i);
							radioitem._setAccessibilityInfoCount(rows);
						}
						this._items[i] = radioitem;
					}
					this._update_radioitem();
				}
			}

			this.on_apply_index(this.pre_index, this.index, false);
			this.on_apply_style_cursor();
			this._refreshAccessibilityValue();
		}
	};

	_pRadio._delete_radioitem = function () {
		var items = this._items;
		var item_len = items.length;
		for (var i = 0; i < item_len; i++) {
			items[i].destroy();
			items[i] = null;
		}

		while (item_len > 0) {
			items.pop();
			item_len--;
		}
	};

	_pRadio._update_radioitem = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var innerdataset = this._innerdataset;
			var items = this._items;
			var item_len = items.length;
			if (innerdataset == null || item_len == 0) {
				return;
			}

			var columncount = parseInt(this.columncount) | 0;
			var rowcount = parseInt(this.rowcount) | 0;
			var datarowcnt = innerdataset.getRowCount();
			var datacolcnt = innerdataset.getColCount();
			var colcnt = 1;
			var rowcnt = datarowcnt;
			var gogo = "row";
			var direction = this.direction.toString();
			var width = 0;
			var height = 0;

			var max_col = 1;
			if (columncount == -1 && rowcount == -1) {
				rowcnt = 1;
				colcnt = 0;
				var sum_width = 0;
				for (var i = 0; i < item_len; i++) {
					var size = items[i]._getItemRealSize();
					sum_width += size.width;

					if (this._client_width < sum_width) {
						rowcnt++;
						sum_width = size.width;
						colcnt = 1;
					}
					else {
						colcnt++;
						max_col = max_col > colcnt ? max_col : colcnt;
					}
				}

				colcnt = max_col;

				var dataidx = 0;
				var pre_w = 0, pre_h = 0;
				var size;
				for (var i = 0; i < rowcnt; i++) {
					pre_w = 0;
					for (var j = 0; j < colcnt; j++) {
						if (datarowcnt <= dataidx) {
							break;
						}
						var radioitem = items[dataidx];
						size = radioitem._getItemRealSize();
						size.height = this._client_height / rowcnt;

						radioitem.move(pre_w, pre_h, size.width, size.height);
						radioitem.setTextOverflow(false);

						pre_w += size.width;

						dataidx++;
					}

					pre_h += size.height;
				}
			}
			else {
				if (direction.toLowerCase() == "horizontal") {
					if (columncount > 0) {
						colcnt = columncount;
					}
					else if ((columncount < 0 && rowcount < 0) || (columncount < 0 && rowcount == 0) || (columncount == 0 && rowcount == 0) || (columncount == 0 && rowcount == datarowcnt)) {
						colcnt = 1;
					}
					else if (columncount < 0 && (columncount < rowcount) && (rowcount > 1)) {
						colcnt = Math.round(rowcnt / rowcount);
					}
					else if (rowcount > 0) {
						colcnt = Math.ceil(rowcnt / rowcount);
						if ((colcnt * rowcount) < rowcnt) {
							colcnt++;
							rowcnt = (((colcnt * rowcount) - rowcnt) >= colcnt) ? rowcount - 1 : rowcount;
						}
					}
					else {
						colcnt = rowcnt;
					}

					if (colcnt > rowcnt) {
						colcnt = rowcnt;
					}

					gogo = "col";
					rowcnt = parseInt(datarowcnt / colcnt) | 0;
					if ((datarowcnt > colcnt) && (datarowcnt % colcnt) > 0) {
						rowcnt++;
					}
				}
				else {
					if (rowcount > 0) {
						rowcnt = rowcount;
					}
					else if (columncount > 0) {
						rowcnt = parseInt(datarowcnt / columncount);
						if ((columncount * rowcnt) < datarowcnt) {
							rowcnt++;
							colcnt = (((columncount * rowcnt) - datarowcnt) >= rowcnt) ? columncount - 1 : columncount;
						}
					}
					else {
						rowcnt = 1;
					}

					gogo = "row";
					colcnt = parseInt(datarowcnt / rowcnt) | 0;

					if (colcnt <= 0) {
						colcnt = 1;
					}
					if ((datarowcnt > rowcnt) && (datarowcnt % rowcnt) > 0) {
						colcnt++;
					}
				}

				width = this._client_width / colcnt;
				height = this._client_height / rowcnt;
				var dataidx = 0;
				var radioitem;

				if (gogo == "col") {
					for (var i = 0; i < rowcnt; i++) {
						for (var j = 0; j < colcnt; j++) {
							if (datarowcnt <= dataidx) {
								break;
							}
							radioitem = this._items[dataidx];
							radioitem.move((width * j), (height * i), width, height);
							radioitem.setTextOverflow(true);
							dataidx++;
						}
					}
				}
				else if (gogo == "" || gogo == "row") {
					var pre_w = 0, pre_h;
					for (var i = 0; i < colcnt; i++) {
						pre_h = 0;
						for (var j = 0; j < rowcnt; j++) {
							if (datarowcnt <= dataidx) {
								break;
							}
							radioitem = this._items[dataidx];
							radioitem.move((width * i), (height * j), width, height);
							radioitem.setTextOverflow(true);

							dataidx++;
						}
					}
				}
			}
		}
	};

	_pRadio._searchStyleValue = nexacro._emptyFn;
	_pRadio._exeExprStyle = nexacro._emptyFn;

	_pRadio._setValue = function (v, bIndex) {
		if (this.value == v) {
			return null;
		}

		var val = null;
		if (v == undefined || v == null) {
			val = "";
		}
		else {
			val = v.toString();
		}

		this.value = val;
		this.on_apply_value(bIndex);
	};

	_pRadio._do_defocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, false);
		}
	};

	_pRadio._getPreCalculateWantTab = function (keycode, shift_key) {
		var ds = this._innerdataset;
		if (ds) {
			if (this.index > -1) {
				var idx = this.index;
				if (idx == this._accessibility_index) {
					return false;
				}
			}
			else {
				var index = this._accessibility_index;
				if (shift_key) {
					if (index < 0) {
						return false;
					}
				}
				else {
					var totalcnt = ds.getRowCount();
					if (index + 1 > totalcnt) {
						return false;
					}
				}
			}
		}
		return this._want_tab;
	};

	_pRadio._getPreCalculateWantArrow = function (keycode) {
		var ds = this._innerdataset;
		if (nexacro._enableaccessibility && (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5)) {
			return true;
		}
		else if (ds) {
			if (keycode == nexacro.Event.KEY_UP) {
				return false;
			}
			else if (keycode == nexacro.Event.KEY_DOWN) {
				return false;
			}
		}
		else {
			return false;
		}

		return this._want_arrow;
	};

	_pRadio._getNextAccessibilityOrderIndex = function (direction) {
		var cur_idx = this._accessibility_index;
		var ar = this._items;
		if (direction > 0) {
			for (var i = cur_idx + direction; i < ar.length; i++) {
				if (ar[i]._isAccessibilityEnable()) {
					return i;
				}
			}
			cur_idx = -1;
		}
		else if (direction < 0) {
			for (var i = cur_idx + direction; i >= 0; i--) {
				if (ar[i]._isAccessibilityEnable()) {
					return i;
				}
			}
			cur_idx = this._accessibility_index = -1;
		}
		return cur_idx;
	};


	delete _pRadio;

	nexacro.RadioCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Radio.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._is_subcontrol = true;

		this._is_overflow = false;
	};
	var _pRadioCtrl = nexacro._createPrototype(nexacro.Radio, nexacro.RadioCtrl);
	nexacro.RadioCtrl.prototype = _pRadioCtrl;
	_pRadioCtrl._type_name = "RadioControl";

	nexacro._setForControlStyleFinder(_pRadioCtrl);

	delete _pRadioCtrl;
}
;

if (!nexacro.RadioItemCtrl) {
	nexacro.RadioItem_Style = function (target, id) {
		nexacro.Style.call(this, target, id);

		this.buttonalign = null;
		this.buttonbackground = null;
		this.buttonbackgroundimagemode = null;
		this.buttonborder = null;
		this.buttoncolor = null;
		this.buttongradation = null;
		this.buttonimage = null;
		this.buttonsize = null;
		this.textpadding = null;
	};

	var _pRadioItemStyle = nexacro._createPrototype(nexacro.Style, nexacro.RadioItem_Style);
	nexacro.RadioItem_Style.prototype = _pRadioItemStyle;

	eval(nexacro._createAlignAttributeEvalStr("_pRadioItemStyle", "buttonalign"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pRadioItemStyle", "buttonbackground"));
	eval(nexacro._createValueAttributeEvalStr("_pRadioItemStyle", "buttonbackgroundimagemode"));
	eval(nexacro._createBorderAttributeEvalStr("_pRadioItemStyle", "buttonborder"));
	eval(nexacro._createColorAttributeEvalStr("_pRadioItemStyle", "buttoncolor"));
	eval(nexacro._createGradationAttributeEvalStr("_pRadioItemStyle", "buttongradation"));
	eval(nexacro._createValueAttributeEvalStr("_pRadioItemStyle", "buttonimage"));
	eval(nexacro._createValueAttributeEvalStr("_pRadioItemStyle", "buttonsize"));
	eval(nexacro._createPaddingAttributeEvalStr("_pRadioItemStyle", "textpadding"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pRadioItemStyle", "accessibility"));

	_pRadioItemStyle.__custom_emptyObject = function () {
		this.buttonalign = null;
		this.buttonbackground = null;
		this.buttonbackgroundimagemode = null;
		this.buttonborder = null;
		this.buttoncolor = null;
		this.buttongradation = null;
		this.buttonimage = null;
		this.buttonsize = null;
		this.textpadding = null;
		this.accessibility = null;
	};

	_pRadioItemStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.buttonalign._value.length) {
			val += "buttonalign:" + this.buttonalign._value + "; ";
		}
		if (this.buttonimage._value.length) {
			val += "buttonimage:" + this.buttonimage._value + "; ";
		}
		if (this.textpadding._value.length) {
			val += "textpadding:" + this.textpadding._value + "; ";
		}
		if (this.buttonborder._value.length) {
			val += "buttonborder:" + this.buttonborder._value + "; ";
		}
		if (this.buttoncolor._value.length) {
			val += "buttoncolor:" + this.buttoncolor._value + "; ";
		}
		if (this.buttonsize._value.length) {
			val += "buttonsize:" + this.buttonsize._value + "; ";
		}
		if (this.buttonbackground._value.length) {
			val += "buttonbackground:" + this.buttonbackground._value + "; ";
		}
		if (this.buttongradation._value.length) {
			val += "buttongradation:" + this.buttongradation._value + "; ";
		}
		if (this.buttonbackgroundimagemode._value.length) {
			val += "buttonbackgroundimagemode:" + this.buttonbackgroundimagemode._value + "; ";
		}
		if (this.accessibility._value.length) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}

		return val;
	};

	nexacro.RadioItem_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.buttonalign = null;
		this.buttonimage = null;
		this.textpadding = null;
		this.buttonborder = null;
		this.buttoncolor = null;
		this.buttonsize = null;
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonbackgroundimagemode = null;
	};

	var _pRadioItemCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.RadioItem_CurrentStyle);
	nexacro.RadioItem_CurrentStyle.prototype = _pRadioItemCurrentStyle;

	_pRadioItemCurrentStyle.__get_custom_style_value = _pRadioItemStyle.__get_custom_style_value;
	_pRadioItemCurrentStyle.__custom_emptyObject = _pRadioItemStyle.__custom_emptyObject;

	delete _pRadioItemStyle;
	delete _pRadioItemCurrentStyle;

	nexacro.RadioItemCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.radioimg = null;
		this.value = false;
		this.index = -1;
		this.readonly = false;
		this.code = "";


		this._text_elem = null;
		this._is_reference_control = false;
		this._accessibility_role = "radioitem";
	};

	var _pRadioItemCtrl = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.RadioItemCtrl);
	nexacro.RadioItemCtrl.prototype = _pRadioItemCtrl;
	nexacro._setForControlStyleFinder(_pRadioItemCtrl);

	_pRadioItemCtrl.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;
		var buttonalign = this.on_find_CurrentStyle_buttonalign(pseudo);
		var buttonimage = this.on_find_CurrentStyle_buttonimage(pseudo);
		var textpadding = this.on_find_CurrentStyle_textpadding(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttoncolor = this.on_find_CurrentStyle_buttoncolor(pseudo);
		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);
		var buttonbackground = this.on_find_CurrentStyle_buttonbackground(pseudo);
		var buttongradation = this.on_find_CurrentStyle_buttongradation(pseudo);
		var buttonbackgroundimagemode = this.on_find_CurrentStyle_buttonbackgroundimagemode(pseudo);
		var accessibility = this.on_find_CurrentStyle_accessibility(pseudo);

		if (buttonalign != curstyle.buttonalign) {
			curstyle.buttonalign = buttonalign;
			this.on_apply_style_buttonalign();
		}
		if (buttonimage != curstyle.buttonimage) {
			curstyle.buttonimage = buttonimage;
			this.on_apply_style_buttonimage(curstyle.buttonimage);
		}
		if (textpadding != curstyle.textpadding) {
			curstyle.textpadding = textpadding;
			this.on_apply_style_textpadding(curstyle.textpadding);
		}
		if (buttonborder != curstyle.buttonborder) {
			curstyle.buttonborder = buttonborder;
			if (this.radioimg) {
				this.radioimg.on_apply_pseudo(pseudo);
			}
		}
		if (buttoncolor != curstyle.buttoncolor) {
			curstyle.buttoncolor = buttoncolor;
			if (this.radioimg) {
				this.radioimg.on_apply_pseudo(pseudo);
			}
		}
		if (buttonsize != curstyle.buttonsize) {
			curstyle.buttonsize = buttonsize;
			this.on_apply_style_buttonsize(curstyle.buttonsize);
		}
		if (buttonbackground != curstyle.buttonbackground) {
			curstyle.buttonbackground = buttonbackground;
			if (this.radioimg) {
				this.radioimg.on_apply_pseudo(pseudo);
			}
		}
		if (buttongradation != curstyle.buttongradation) {
			curstyle.buttongradation = buttongradation;
			if (this.radioimg) {
				this.radioimg.on_apply_pseudo(pseudo);
			}
		}
		if (buttonbackgroundimagemode != curstyle.buttonbackgroundimagemode) {
			curstyle.buttonbackgroundimagemode = buttonbackgroundimagemode;
			if (this.radioimg) {
				this.radioimg.on_apply_pseudo(pseudo);
			}
		}

		if (accessibility != curstyle.accessibility) {
			curstyle.accessibility = this._make_accessibility_value(accessibility);
			this.on_apply_style_accessibility(curstyle.accessibility);
		}
	};

	_pRadioItemCtrl.on_create_custom_style = function () {
		return new nexacro.RadioItem_Style(this);
	};

	_pRadioItemCtrl.on_create_custom_currentStyle = function () {
		return new nexacro.RadioItem_CurrentStyle(this);
	};


	_pRadioItemCtrl.on_find_CurrentStyle_background = function (pseudo) {
		var propobj = this.parent.on_find_CurrentStyle_itembackground(pseudo);
		return this.parent._search_style_obj(propobj, "background", this.index);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttonalign = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonalign(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttonbackground = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbackground(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttonbackgroundimagemode = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbackgroundimagemode(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttonborder = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonborder(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttoncolor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttoncolor(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttongradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttongradation(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttonimage = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonimage(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_buttonsize = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonsize(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_textpadding = function (pseudo) {
		return this.parent.on_find_CurrentStyle_textpadding(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent.on_find_CurrentStyle_align(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_color = function (pseudo) {
		var propobj = this.parent.on_find_CurrentStyle_color(pseudo);
		return this.parent._search_style_obj(propobj, "color", this.index);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_font = function (pseudo) {
		var propobj = this.parent.on_find_CurrentStyle_font(pseudo);
		return this.parent._search_style_obj(propobj, "font", this.index);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		var propobj = this.parent.on_find_CurrentStyle_itemaccessibility(pseudo);
		return this.parent._search_style_obj(propobj, "accessibility", this.index);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemborder(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itembordertype(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_padding = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itempadding(pseudo);
	};

	_pRadioItemCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemgradation(pseudo);
	};


	_pRadioItemCtrl.on_update_style_buttonalign = function () {
		this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonalign(this._pseudo);
		this.on_apply_style_buttonalign(this.currentstyle.buttonsize);
	};

	_pRadioItemCtrl.on_update_style_buttonbackground = function () {
		this.currentstyle.buttonbackground = this.on_find_CurrentStyle_buttonbackground(this._pseudo);
		this.on_apply_style_buttonbackground(this.currentstyle.buttonbackground);
	};

	_pRadioItemCtrl.on_update_style_buttonbackgroundimagemode = function () {
		this.currentstyle.buttonbackgroundimagemode = this.on_find_CurrentStyle_buttonbackgroundimagemode(this._pseudo);
		this.on_apply_style_buttonbackgroundimagemode(this.currentstyle.buttonbackgroundimagemode);
	};

	_pRadioItemCtrl.on_update_style_buttonborder = function () {
		this.currentstyle.buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo);
		this.on_apply_style_buttonborder(this.currentstyle.buttonborder);
	};

	_pRadioItemCtrl.on_update_style_buttoncolor = function () {
		this.currentstyle.buttoncolor = this.on_find_CurrentStyle_buttoncolor(this._pseudo);
		this.on_apply_style_buttoncolor(this.currentstyle.buttoncolor);
	};

	_pRadioItemCtrl.on_update_style_buttongradation = function () {
		this.currentstyle.buttongradation = this.on_find_CurrentStyle_buttongradation(this._pseudo);
		this.on_apply_style_buttongradation(this.currentstyle.buttongradation);
	};

	_pRadioItemCtrl.on_update_style_buttonimage = function () {
		this.currentstyle.buttonimage = this.on_find_CurrentStyle_buttonimage(this._pseudo);
		this.on_apply_style_buttonimage(this.currentstyle.buttonimage);
	};

	_pRadioItemCtrl.on_update_style_buttonsize = function () {
		this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);
		this.on_apply_style_buttonsize(this.currentstyle.buttonsize);
	};

	_pRadioItemCtrl.on_update_style_textpadding = function () {
		this.currentstyle.textpadding = this.on_find_CurrentStyle_textpadding(this._pseudo);
		this.on_apply_style_textpadding(this.currentstyle.textpadding);
	};

	_pRadioItemCtrl.on_update_style_accessibility = function () {
		this.on_apply_style_accessibility(this.currentstyle.accessibility = this._make_accessibility_value(this.on_find_CurrentStyle_accessibility(this._pseudo)));
	};


	_pRadioItemCtrl.on_apply_style_align = function (v) {
		if (this._text_elem && v) {
			var halign = v.halign == "" ? "left" : v._halign;
			var valign = v.valign == "" ? "middle" : v._valign;
			this._text_elem.setElementAlignXY(halign, valign);
		}
	};

	_pRadioItemCtrl.on_apply_style_color = function (v) {
		if (this._text_elem) {
			if (v) {
				this._text_elem.setElementColor(v);
			}
			else {
				this._text_elem.setElementColor("");
			}
		}
	};

	_pRadioItemCtrl.on_apply_style_font = function (v) {
		if (this._text_elem) {
			this._text_elem.setElementFont(v);
		}
	};

	_pRadioItemCtrl.on_apply_style_letterspace = function (v) {
		if (this._text_elem) {
			this._text_elem.setElementLetterSpace(v);
		}
	};

	_pRadioItemCtrl.on_apply_style_cursor = function (v) {
		this._control_element.setElementCursor(v);

		if (this.radioimg) {
			this.radioimg.style.set_cursor(v);
		}
	};

	_pRadioItemCtrl.on_apply_style_buttonalign = function (v) {
		var buttonalign = this.on_find_CurrentStyle_buttonalign(this.pseudo);
		var buttonsize = this.on_find_CurrentStyle_buttonsize(this.pseudo);
		var textpadding = this.on_find_CurrentStyle_textpadding(this.pseudo);
		if (buttonalign) {
			var align_arr = buttonalign.toString().trim().split(" ");
			var align_len = align_arr.length;
			var horizon = "left";
			var vertical = "middle";
			var cl, ct, cr, cb, cw, ch;
			var tl = 0, tt = 0, tr = 0, tb = 0, tw = 0, th = 0;
			var btnsize, str, curBtnSize, curTxtPadding;

			curBtnSize = buttonsize;
			curTxtPadding = textpadding;

			if (buttonsize == null) {
				btnsize = 20;
			}
			else {
				btnsize = parseInt(curBtnSize._value) | 0;
			}

			for (var x = 0; x < align_len; x++) {
				str = align_arr[x].toString();
				if (str == "center") {
					horizon = "center";
				}
				else if (str == "right") {
					horizon = "right";
				}
				else if (str == "top") {
					vertical = "top";
				}
				else if (str == "bottom") {
					vertical = "bottom";
				}
			}

			var btn_gap = 0;
			var gap_and_size = btn_gap + btnsize;
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

			if (horizon == "left") {
				cl = btn_gap;
				tl += gap_and_size;
				gap_and_size = 0;
			}
			else if (horizon == "right") {
				cl = this._client_width - gap_and_size;
			}
			else if (horizon == "center") {
				cl = Math.round((this._client_width - btnsize) / 2);
			}

			if (vertical == "top") {
				ct = 0;
				cb = btnsize;
			}
			else if (vertical == "bottom") {
				ct = this._client_height - btnsize;
			}
			else {
				ct = (this._client_height - btnsize) / 2;
			}

			if (this.radioimg) {
				this.radioimg.move(cl, ct, btnsize, btnsize);
			}

			if (this._text_elem) {
				tw = this._client_width - tr - tl - gap_and_size;
				th = this._client_height - tb - tt;
				tw = (tw < 0) ? 0 : tw;
				th = (th < 0) ? 0 : th;

				tl = this._convertLeftForRtlLayout(tl, tw);
				this._text_elem.setElementPosition(tl, tt);
				this._text_elem.setElementSize(tw, th);

				this.setTextOverflow(!this._is_overflow);
			}
		}
	};

	_pRadioItemCtrl.on_apply_style_buttonimage = function (v) {
		this.on_apply_value();
	};

	_pRadioItemCtrl.on_apply_style_buttonborder = function (v) {
		if (this.radioimg) {
			this.radioimg.on_update_style_border();
		}
	};

	_pRadioItemCtrl.on_apply_style_buttoncolor = function (v) {
		if (this.radioimg) {
			this.radioimg.on_update_style_color();
		}
	};

	_pRadioItemCtrl.on_apply_style_buttonsize = function (v) {
		this.on_apply_style_buttonalign();
	};

	_pRadioItemCtrl.on_apply_style_buttongradation = function (v) {
		if (this.radioimg) {
			this.radioimg.on_update_style_gradation();
		}
	};

	_pRadioItemCtrl.on_apply_style_buttonbackground = function (v) {
		var radioimg = this.radioimg;

		if (radioimg) {
			this.radioimg.on_update_style_background();
		}
	};

	_pRadioItemCtrl.on_apply_style_buttonbackgroundimagemode = function (v) {
		var radioimg = this.radioimg;
		var repeat = "";

		if (v.toString() == "quad") {
			repeat = "quad";
		}
		else {
			repeat = "no-repeat";
		}
		if (radioimg) {
			radioimg.style.set_background_repeat(repeat);
		}
	};

	_pRadioItemCtrl.on_apply_style_textpadding = function (v) {
		this.on_apply_style_buttonalign();
	};

	_pRadioItemCtrl.on_apply_style_accessibility = function (accessibility) {
		if (accessibility) {
			var control_elem = this.getElement();
			control_elem.setAccessibility(accessibility);
		}
	};

	_pRadioItemCtrl.on_apply_prop_enable = function (v) {
		var radioimg = this.radioimg;
		if (radioimg) {
			radioimg._setEnable(v);
		}
	};

	_pRadioItemCtrl.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		this.on_change_containerRect();
	};

	_pRadioItemCtrl.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			this.radioimg = new nexacro.ImageRadioCtrl("radioimg", "absolute", 0, 0, 0, 0, null, null, this);
			this.radioimg.style.set_bordertype("round 50 50");

			var text_elem = new nexacro.TextBoxElement(control);
			this._text_elem = text_elem;
			var align = this.on_find_CurrentStyle_align();
			var halign = align.halign == "" ? "center" : align._halign;
			var valign = align.valign == "" ? "middle" : align._valign;
			text_elem.setElementSize(this._client_width, this._client_height);
			text_elem.setElementColor(this.on_find_CurrentStyle_color());
			text_elem.setElementFont(this.on_find_CurrentStyle_font());
			text_elem.setElementAlignXY(halign, valign);
			text_elem.setElementLetterSpace(this.currentstyle.letterspace);
			text_elem.setElementText(this.text);
			text_elem.setElementWordWrap("char");

			this.radioimg.createComponent(true);
		}
	};

	_pRadioItemCtrl.on_created_contents = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create();
		}
		this.radioimg.on_created();
	};

	_pRadioItemCtrl.on_destroy_contents = function () {
		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}

		if (this.radioimg) {
			this.radioimg.destroy();
			this.radioimg = null;
		}
	};

	_pRadioItemCtrl.on_change_containerRect = function (width, height) {
		this.on_apply_style_buttonalign(this.currentstyle.buttonalign);
		this.on_apply_style_buttonimage(this.currentstyle.buttonimage);
		this.on_apply_style_buttonbackground(this.currentstyle.buttonbackground);
		this.on_apply_style_textpadding(this.currentstyle.textpadding);
		this.on_apply_style_buttonborder(this.currentstyle.buttonborder);

		var text_elem = this._text_elem;
		var align = this.on_find_CurrentStyle_align(this._pseudo);
		if (this._text_elem) {
			text_elem.setElementSize(width, height);
			this.on_apply_style_align(align);
		}
	};

	_pRadioItemCtrl.set_value = function (v) {
		if (v != this.value) {
			this.value = v;
			this.on_apply_value();
		}
	};

	_pRadioItemCtrl.on_apply_value = function () {
		if (this.radioimg) {
			var select = this._isSelected();
			var image = this.on_find_CurrentStyle_buttonimage(this._pseudo);
			if (select == true && image) {
				this.radioimg.set_image(image);
				this.radioimg.set_imagealign("center middle");
			}
			else {
				this.radioimg.set_image("");
				this._stat_change("", "normal");
			}
			this._setAccessibilityStatChecked(select);
		}
	};

	_pRadioItemCtrl.set_index = function (v) {
		this.index = v;
	};

	_pRadioItemCtrl.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pRadioItemCtrl.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}
	};

	_pRadioItemCtrl.set_text = function (v) {
		this.text = v;
		this.on_apply_text();
	};

	_pRadioItemCtrl.on_apply_text = function () {
		if (this._text_elem) {
			this._text_elem.setElementText(this.text + "");
		}
	};

	_pRadioItemCtrl.set_code = function (v) {
		this.code = v;
	};

	_pRadioItemCtrl._on_getAccessibilityAdditionalLabel = function () {
		var radio = this.parent;
		if (this._isAccessibilityEnable() && radio && (!radio._is_first_focus || radio._is_tab_focus)) {
			if (this.index > -1) {
				return (this.index + 1) + " " + radio._items.length;
			}
		}
		return "";
	};

	_pRadioItemCtrl._getFormChildById = function (id) {
		return this.parent._getFormChildById(id);
	};

	_pRadioItemCtrl._getAccessibilityLabel = function (accessibility) {
		var label = "";
		var radio = this.parent;
		if (radio && radio._is_first_focus) {
			var p_accessibility = radio.on_find_CurrentStyle_accessibility(radio._pseudo);
			label = radio._getAccessibilityParentValue(p_accessibility);
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	_pRadioItemCtrl._setAccessibilityNotifyEvent = function (direction) {
		var control_element = this.getElement();

		if (control_element && control_element.accessibility_enable) {
			control_element.setElementAccessibilityNotifyEvent();
			var form = this._getForm();
			if (form) {
				var _window = form._getWindow();
				_window._accessibility_last_focused_comp = this._getRootComponent(this);
			}
			return true;
		}
		return false;
	};

	_pRadioItemCtrl._isSelected = function () {
		return this.value;
	};

	_pRadioItemCtrl._getItemRealSize = function () {
		var buttonalign = this.on_find_CurrentStyle_buttonalign(this.pseudo);
		var buttonsize = this.on_find_CurrentStyle_buttonsize(this.pseudo);
		var textpadding = this.on_find_CurrentStyle_textpadding(this.pseudo);
		var itempadding = this.on_find_CurrentStyle_padding(this.pseudo);
		var itemborder = this.on_find_CurrentStyle_border(this.pseudo);
		var width, height;

		var tl = 0, tt = 0, tr = 0, tb = 0;
		var ipl = 0, ipt = 0, ipr = 0, ipb = 0;
		var ibl = 0, ibt = 0, ibr = 0, ibb = 0;
		var btnsize = 20;

		if (buttonsize) {
			btnsize = parseInt(buttonsize._value) | 0;
		}
		if (textpadding) {
			if (textpadding.left) {
				tl = textpadding.left;
			}
			if (textpadding.right) {
				tr = textpadding.right;
			}
			if (textpadding.top) {
				tt = textpadding.top;
			}
			if (textpadding.bottom) {
				tb = textpadding.bottom;
			}
		}

		if (itempadding) {
			if (itempadding.left) {
				ipl = itempadding.left;
			}
			if (itempadding.top) {
				ipt = itempadding.top;
			}
			if (itempadding.right) {
				ipr = itempadding.right;
			}
			if (itempadding.bottom) {
				ipb = itempadding.bottom;
			}
		}

		if (itemborder) {
			ibl = itemborder._left_width;
			ibr = itemborder._right_width;
			ibt = itemborder._top_width;
			ibb = itemborder._bottom_width;
		}


		var text_size = 0;
		if (this._text_elem) {
			var font = this.on_find_CurrentStyle_font(this.pseudo);
			var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
			text_size = nexacro._getTextSize2(letterspace, this._text_elem.text, font);
		}

		width = btnsize + tl + tr + text_size[0] + ipl + ipr + ibl + ibr;
		height = btnsize + tt + tb + text_size[1] + ipt + ipb + ibt + ibb;

		return {
			width : Math.ceil(width), 
			height : Math.ceil(height)
		};
	};

	_pRadioItemCtrl.setTextOverflow = function (is_default) {
		var text_elem = this._text_elem;
		if (text_elem) {
			this._is_overflow = !is_default;
			if (is_default) {
				text_elem.setElementWordWrap("char");
			}
			else {
				text_elem.setElementTextOverFlow();
			}
		}
	};

	delete _pRadioItemCtrl;

	nexacro.ImageRadioCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageViewerCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._is_reference_control = false;
	};
	var _pImageRadioCtrl = nexacro._createPrototype(nexacro.ImageViewerCtrl, nexacro.ImageRadioCtrl);
	nexacro.ImageRadioCtrl.prototype = _pImageRadioCtrl;


	_pImageRadioCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbackground(pseudo);
	};

	_pImageRadioCtrl.on_find_CurrentStyle_buttonbackgroundimagemode = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonbackgroundimagemode(pseudo);
	};

	_pImageRadioCtrl.on_find_CurrentStyle_image = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonimage(pseudo);
	};

	_pImageRadioCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonborder(pseudo);
	};

	_pImageRadioCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttongradation(pseudo);
	};

	_pImageRadioCtrl.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.parent.enable) {
			return false;
		}
		this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	delete _pImageRadioCtrl;
}
;