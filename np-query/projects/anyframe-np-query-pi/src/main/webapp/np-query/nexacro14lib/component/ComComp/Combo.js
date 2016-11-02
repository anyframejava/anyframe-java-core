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

if (!nexacro.Combo) {
	nexacro.ComboCloseUpEventInfo = function (obj, id, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect) {
		this.id = this.eventid = id || "oncloseup";
		this.fromobject = this.fromreferenceobject = obj;

		this.posttext = afterText;
		this.pretext = beforeText;
		this.postvalue = afterValue;
		this.prevalue = beforeValue;
		this.postindex = afterIndex;
		this.preindex = beforeIndex;
		this.isselect = isSelect;
	};
	var _pComboCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ComboCloseUpEventInfo);
	nexacro.ComboCloseUpEventInfo.prototype = _pComboCloseUpEventInfo;
	_pComboCloseUpEventInfo._type_name = "ComboCloseUpEventInfo";

	delete _pComboCloseUpEventInfo;
	_pComboCloseUpEventInfo = null;

	nexacro.Combo_Style = function (target, id) {
		nexacro.Style.call(this, target, id);

		this.itemheight = null;
		this.itembackground = null;
		this.itemcolor = null;
		this.itemfont = null;
		this.itemgradation = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itempadding = null;
		this.buttonsize = null;
		this.itemaccessibility = null;
		this.popuptype = null;
		this.displaynulltextcolor = null;
	};

	var _pComboStyle = nexacro._createPrototype(nexacro.Style, nexacro.Combo_Style);
	nexacro.Combo_Style.prototype = _pComboStyle;
	_pComboStyle._type_name = "ComboStyle";

	eval(nexacro._createValueAttributeEvalStr("_pComboStyle", "itemheight"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pComboStyle", "itembackground"));
	eval(nexacro._createColorAttributeEvalStr("_pComboStyle", "itemcolor"));
	eval(nexacro._createFontAttributeEvalStr("_pComboStyle", "itemfont"));
	eval(nexacro._createGradationAttributeEvalStr("_pComboStyle", "itemgradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pComboStyle", "itemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pComboStyle", "itembordertype"));
	eval(nexacro._createPaddingAttributeEvalStr("_pComboStyle", "itempadding"));
	eval(nexacro._createValueAttributeEvalStr("_pComboStyle", "buttonsize"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pComboStyle", "itemaccessibility"));
	eval(nexacro._createValueAttributeEvalStr("_pComboStyle", "popuptype"));
	eval(nexacro._createColorAttributeEvalStr("_pComboStyle", "displaynulltextcolor"));


	_pComboStyle.__custom_emptyObject = function () {
		this.itemheight = null;
		this.itembackground = null;
		this.itemcolor = null;
		this.itemfont = null;
		this.itemgradation = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itempadding = null;
		this.buttonsize = null;
		this.itemaccessibility = null;
		this.popuptype = null;
		this.displaynulltextcolor = null;
	};

	_pComboStyle.__get_custom_style_value = function () {
		var val = "";
		var style = this.itemheight;
		if (style && style._is_empty) {
			val += "itemheight:" + style._value + "; ";
		}

		style = this.itembackground;
		if (style && style._is_empty) {
			val += "itembackground:" + style._value + "; ";
		}

		style = this.itemcolor;
		if (style && style.is_empty) {
			val += "itemcolor:" + style._value + "; ";
		}

		style = this.itemfont;
		if (style && style._is_empty) {
			val += "itemfont:" + style._value + "; ";
		}

		style = this.itemgradation;
		if (style && style._is_empty) {
			val += "itemgradation:" + style._value + "; ";
		}

		style = this.itemborder;
		if (style && style._is_empty) {
			val += "itemborder:" + style._value + "; ";
		}

		style = this.itembordertype;
		if (style && style._is_empty) {
			val += "itembordertype:" + style._value + "; ";
		}

		style = this.itempadding;
		if (style && style._is_empty) {
			val += "itempadding:" + style._value + "; ";
		}

		style = this.buttonsize;
		if (style && style._is_empty) {
			val += "buttonsize:" + style._value + "; ";
		}

		style = this.accessibility;
		if (style && style._is_empty) {
			val += "accessibility:" + style._value + "; ";
		}

		style = this.itemaccessibility;
		if (style && style._is_empty) {
			val += "itemaccessibility:" + style._value + "; ";
		}

		style = this.popuptype;
		if (style && style._is_empty) {
			val += "popuptype:" + style._value + "; ";
		}

		style = this.displaynulltextcolor;
		if (style && style._is_empty) {
			val += "displaynulltextcolor:" + style._value + "; ";
		}

		style = null;

		return val;
	};

	nexacro.Combo_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.itemheight = null;
		this.itembackground = null;
		this.itemcolor = null;
		this.itemfont = null;
		this.itemgradation = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itempadding = null;
		this.buttonsize = null;
		this.itemaccessibility = null;
		this.popuptype = null;
		this.displaynulltextcolor = null;
	};

	var _pComboCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Combo_CurrentStyle);
	nexacro.Combo_CurrentStyle.prototype = _pComboCurrentStyle;
	_pComboCurrentStyle._type_name = "ComboCurrentStyle";

	_pComboCurrentStyle.__custom_emptyObject = _pComboStyle.__custom_emptyObject;
	_pComboCurrentStyle.__get_custom_style_value = _pComboStyle.__get_custom_style_value;

	delete _pComboStyle;
	delete _pComboCurrentStyle;

	nexacro.Combo = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._selectinfo = {
			index : -1, 
			text : "", 
			value : undefined
		};

		this._eventinfo = {
			postindex : -1, 
			posttext : "", 
			postvalue : undefined, 
			preindex : -1, 
			pretext : "", 
			prevalue : undefined, 
			isselect : false
		};

		this.comboedit = null;
		this.dropbutton = null;
		this.combolist = null;
		this.popupwindow = null;

		this.value = undefined;
		this.index = -1;
		this.text = "";
		this.codecolumn = "";
		this.datacolumn = "";
		this.innerdataset = null;
		this.type = "dropdown";
		this.readonly = false;
		this.displayrowcount = -1;
		this.displaynulltext = "";
		this.autoselect = false;
		this.autoskip = false;
		this.imemode = "normal";
		this.inputtype = "normal";
		this.useime = "global";
		this.selectchangetype = "noboundup";
		this.usecontextmenu = true;

		this._exprcache = {
		};

		this._event_list = {
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkeypress" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"ondrag" : 1, 
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1, 
			"ondrop" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
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
			"onslideend" : 1, 
			"oneditclick" : 1, 
			"ontextchanged" : 1, 
			"onitemclick" : 1, 
			"canitemchange" : 1, 
			"onitemchanged" : 1, 
			"ondropdown" : 1, 
			"oncloseup" : 1, 
			"ontextchange" : 1, 
			"onchar" : 1, 
			"cancharchange" : 1, 
			"oncontextmenu" : 1, 
			"onmousewheel" : 1
		};

		this._prevalue = undefined;
		this._preindex = -1;
		this._pretext = "";
		this._moverindex = -1;
		this._default_buttonsize = nexacro._getCachedStyleObj("buttonsize", "-1");
		this._innerdataset = null;
		this._filtereddataset = null;
		this._downkey = false;
		this._enterkey = false;
		this._keyval = undefined;
		this._text_change = false;
		this._want_arrows = true;
		this._accessibility_role = "combobox";
		this._has_inputElement = true;
		this._is_recheck = false;
		this._scroll_proc = false;
		this._start_vscroll_pos = 0;
	};

	var _pCombo = nexacro._createPrototype(nexacro.Component, nexacro.Combo);
	nexacro.Combo.prototype = _pCombo;
	_pCombo._type_name = "Combo";

	_pCombo.on_create_custom_style = function () {
		return new nexacro.Combo_Style(this);
	};

	_pCombo.on_create_custom_currentStyle = function () {
		return new nexacro.Combo_CurrentStyle();
	};

	_pCombo.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var style = this.on_find_CurrentStyle_itemheight(pseudo);
		if (style != curstyle.itemheight) {
			curstyle.itemheight = style;
			this.on_apply_style_itemheight(style);
		}

		style = this.on_find_CurrentStyle_border(pseudo);
		if (style != curstyle.border) {
			curstyle.border = style;
			this.on_apply_style_border(style);
		}

		style = this.on_find_CurrentStyle_itembackground(pseudo);
		if (style != curstyle.itembackground) {
			curstyle.itembackground = style;
			this.on_apply_style_itembackground(style);
		}

		style = this.on_find_CurrentStyle_itemcolor(pseudo);
		if (style != curstyle.itemcolor) {
			curstyle.itemcolor = style;
			this.on_apply_style_itemcolor(style);
		}

		style = this.on_find_CurrentStyle_itemfont(pseudo);
		if (style != curstyle.itemfont) {
			curstyle.itemfont = style;
			this.on_apply_style_itemfont(style);
		}

		style = this.on_find_CurrentStyle_itemgradation(pseudo);
		if (style != curstyle.itemgradation) {
			curstyle.itemgradation = style;
			this.on_apply_style_itemgradation(style);
		}

		style = this.on_find_CurrentStyle_itemborder(pseudo);
		if (style != curstyle.itemborder) {
			curstyle.itemborder = style;
			this.on_apply_style_itemborder(style);
		}

		style = this.on_find_CurrentStyle_itembordertype(pseudo);
		if (style != curstyle.itembordertype) {
			curstyle.itembordertype = style;
			this.on_apply_style_itembordertype(style);
		}

		style = this.on_find_CurrentStyle_itempadding(pseudo);
		if (style != curstyle.itempadding) {
			curstyle.itempadding = style;
			this.on_apply_style_itempadding(style);
		}

		style = this.on_find_CurrentStyle_itemaccessibility(pseudo);
		if (style != curstyle.itemaccessibility) {
			curstyle.itemaccessibility = style;
			this.on_apply_style_itemaccessibility(style);
		}

		style = this.on_find_CurrentStyle_buttonsize(pseudo);
		if (style != curstyle.buttonsize) {
			curstyle.buttonsize = style;
			this.on_apply_style_buttonsize(style);
		}

		style = this.on_find_CurrentStyle_align(pseudo);
		if (style != curstyle.align) {
			curstyle.align = style;
			this.on_apply_style_align(style);
		}

		style = this.on_find_CurrentStyle_font(pseudo);
		if (style != curstyle.font) {
			curstyle.font = style;
			this.on_apply_style_font(style);
		}

		style = this.on_find_CurrentStyle_letterspace(pseudo);
		if (style != curstyle.letterspace) {
			curstyle.letterspace = style;
			this.on_apply_style_letterspace(style);
		}

		style = this.on_find_CurrentStyle_color(pseudo);
		if (style != curstyle.color) {
			curstyle.color = style;

			if (style != null) {
				this.on_apply_style_color(style);
			}
		}

		style = this.on_find_CurrentStyle_displaynulltextcolor(pseudo);
		if (style != curstyle.displaynulltextcolor) {
			curstyle.displaynulltextcolor = style;
			this.on_apply_style_displaynulltextcolor(style);
		}

		var popuptype = this.on_find_CurrentStyle_popuptype(pseudo);
		if (curstyle.popuptype != popuptype) {
			curstyle.popuptype = popuptype;
		}

		style = null;
	};

	_pCombo.on_find_CurrentStyle_itemheight = function (pseudo) {
		return this._find_pseudo_obj("itemheight", pseudo);
	};

	_pCombo.on_find_CurrentStyle_itembackground = function (pseudo) {
		return this._find_pseudo_obj("itembackground", pseudo, "background");
	};

	_pCombo.on_find_CurrentStyle_itemcolor = function (pseudo) {
		return this._find_pseudo_obj("itemcolor", pseudo, "color") || nexacro.Component._default_color;
	};

	_pCombo.on_find_CurrentStyle_itemfont = function (pseudo) {
		return this._find_pseudo_obj("itemfont", pseudo, "font");
	};

	_pCombo.on_find_CurrentStyle_itemgradation = function (pseudo) {
		return this._find_pseudo_obj("itemgradation", pseudo, "gradation");
	};
	_pCombo.on_find_CurrentStyle_itemborder = function (pseudo) {
		return this._find_pseudo_obj("itemborder", pseudo, "border");
	};

	_pCombo.on_find_CurrentStyle_itembordertype = function (pseudo) {
		return this._find_pseudo_obj("itembordertype", pseudo, "bordertype");
	};

	_pCombo.on_find_CurrentStyle_itempadding = function (pseudo) {
		return this._find_pseudo_obj("itempadding", pseudo, "padding") || nexacro.Component._default_padding;
	};

	_pCombo.on_find_CurrentStyle_itemaccessibility = function (pseudo) {
		return this._find_pseudo_obj("itemaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pCombo.on_find_CurrentStyle_buttonsize = function (pseudo) {
		return this._find_pseudo_obj("buttonsize", pseudo) || this._default_buttonsize;
	};

	_pCombo.on_find_CurrentStyle_popuptype = function (pseudo) {
		return this._find_pseudo_obj("popuptype", pseudo);
	};

	_pCombo.on_find_CurrentStyle_align = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("align", pseudo, "align") || this._find_pseudo_obj("align", pseudo, "align");
		}

		return this._find_pseudo_obj("align", pseudo, "align");
	};

	_pCombo.on_find_CurrentStyle_background = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("background", pseudo, "background") || this._find_pseudo_obj("background", pseudo, "background");
		}

		return this._find_pseudo_obj("background", pseudo, "background");
	};

	_pCombo.on_find_CurrentStyle_border = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("border", pseudo, "border") || this._find_pseudo_obj("border", pseudo, "border");
		}

		return this._find_pseudo_obj("border", pseudo, "border");
	};

	_pCombo.on_find_CurrentStyle_bordertype = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("bordertype", pseudo, "bordertype") || this._find_pseudo_obj("bordertype", pseudo, "bordertype");
		}

		return this._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pCombo.on_find_CurrentStyle_color = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("color", pseudo, "color") || this._find_pseudo_obj("color", pseudo, "color");
		}

		return this._find_pseudo_obj("color", pseudo, "color");
	};

	_pCombo.on_find_CurrentStyle_font = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("font", pseudo, "font") || this._find_pseudo_obj("font", pseudo, "font");
		}

		return this._find_pseudo_obj("font", pseudo, "font");
	};

	_pCombo.on_find_CurrentStyle_displaynulltextcolor = function (pseudo, childctrl) {
		var displaynulltextcolor = this._find_pseudo_obj("displaynulltextcolor", pseudo, "color");
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_pseudo_obj("color", pseudo, "color");
		}
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_inherit_pseudo_obj("color", pseudo, "color");
		}

		return (displaynulltextcolor) ? displaynulltextcolor : nexacro.Component._default_color;
	};

	_pCombo.on_find_CurrentStyle_gradation = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("gradation", pseudo, "gradation") || this._find_pseudo_obj("gradation", pseudo, "gradation");
		}

		return this._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pCombo.on_find_CurrentStyle_accessibility = function (pseudo, childctrl) {
		if (childctrl) {
			return childctrl._find_pseudo_obj("accessibility", pseudo, "accessibility") || this._find_pseudo_obj("accessibility", pseudo, "accessibility");
		}

		return this._find_pseudo_obj("accessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pCombo.on_update_style_itemheight = function () {
		this.on_apply_style_itemheight(this.currentstyle.itemheight = this.on_find_CurrentStyle_itemheight(this._pseudo));
	};

	_pCombo.on_update_style_itembackground = function () {
		this.on_apply_style_itembackground(this.currentstyle.itembackground = this.on_find_CurrentStyle_itembackground(this._pseudo));
	};

	_pCombo.on_update_style_itemcolor = function () {
		this.on_apply_style_itemcolor(this.currentstyle.itemcolor = this.on_find_CurrentStyle_itemcolor(this._pseudo));
	};

	_pCombo.on_update_style_displaynulltextcolor = function () {
		this.on_apply_style_displaynulltextcolor(this.currentstyle.displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(this._pseudo));
	};

	_pCombo.on_update_style_itemfont = function () {
		this.on_apply_style_itemfont(this.currentstyle.itemfont = this.on_find_CurrentStyle_itemfont(this._pseudo));
	};

	_pCombo.on_update_style_itemgradation = function () {
		this.on_apply_style_itemgradation(this.currentstyle.itemgradation = this.on_find_CurrentStyle_itemgradation(this._pseudo));
	};

	_pCombo.on_update_style_itemborder = function () {
		this.on_apply_style_itemborder(this.currentstyle.itemborder = this.on_find_CurrentStyle_itemborder(this._pseudo));
	};

	_pCombo.on_update_style_itembordertype = function () {
		this.on_apply_style_itembordertype(this.currentstyle.itembordertype = this.on_find_CurrentStyle_itembordertype(this._pseudo));
	};

	_pCombo.on_update_style_itempadding = function () {
		this.on_apply_style_itempadding(this.currentstyle.itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo));
	};

	_pCombo.on_update_style_itemaccessibility = function () {
		this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
	};

	_pCombo.on_update_style_buttonsize = function () {
		this.on_apply_style_buttonsize(this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo));
	};

	_pCombo.on_update_style_popuptype = function () {
		this.currentstyle.popuptype = this.on_find_CurrentStyle_popuptype(this._pseudo);
	};

	_pCombo.on_apply_style_color = function (color) {
		if (this.comboedit) {
			this.comboedit.on_apply_style_color(color);
		}
	};

	_pCombo.on_apply_style_displaynulltextcolor = function (color) {
		if (this.comboedit) {
			this.comboedit.on_apply_style_displaynulltextcolor(color);
		}
	};

	_pCombo.on_apply_style_font = function (font) {
		if (this.comboedit) {
			this.comboedit.on_apply_style_font(font);
		}
	};

	_pCombo.on_apply_style_letterspace = function (letterspace) {
		if (this.comboedit) {
			this.comboedit.on_apply_style_letterspace(letterspace);
		}
	};

	_pCombo.on_apply_style_align = function (align) {
		if (!align) {
			align = this.on_find_CurrentStyle_align(this._pseudo);
		}

		if (this.comboedit) {
			this.comboedit.style.set_align(align);
		}
	};

	_pCombo.on_apply_style_itemheight = function (v) {
		if (this.combolist) {
			this.combolist.on_update_style_itemheight();
		}
	};

	_pCombo.on_apply_style_itembackground = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_itembackground(v);
		}
	};

	_pCombo.on_apply_style_itemcolor = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_color(v);
		}
	};

	_pCombo.on_apply_style_itemfont = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_font(v);
		}
	};

	_pCombo.on_apply_style_itemgradation = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_itemgradation(v);
		}
	};

	_pCombo.on_apply_style_itemborder = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_itemborder(v);
		}
	};

	_pCombo.on_apply_style_itembordertype = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_itembordertype(v);
		}
	};

	_pCombo.on_apply_style_itempadding = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_itempadding(v);
		}
	};

	_pCombo.on_apply_style_itemaccessibility = function (v) {
		if (this.combolist) {
			this.combolist.on_apply_style_itemaccessibility(v);
		}
	};

	_pCombo.on_apply_style_buttonsize = function (v) {
		this._recalcLayout();
	};

	_pCombo.on_apply_style_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_style_accessibility.call(this, accessibility);
		if (this.comboedit) {
			this.comboedit.on_apply_style_accessibility(accessibility);
		}
	};

	_pCombo.on_create_contents = function () {
		if (this.getElement()) {
			this.comboedit = new nexacro.ComboEditCtrl("comboedit", "absolute", 0, 0, 0, 0, null, null, this);
			this.dropbutton = new nexacro.ComboButtonCtrl("dropbutton", "absolute", 0, 0, 0, 0, null, null, this);

			this.comboedit.createComponent();
			this.dropbutton.createComponent();
		}
	};

	_pCombo.on_created_contents = function () {
		this.on_apply_autoskip();
		this.on_apply_displaynulltext();
		this.on_apply_imemode();
		this.on_apply_type();
		this.on_apply_autoselect();
		this.on_apply_style_displaynulltextcolor(this.currentstyle.displaynulltextcolor);

		if (this.value !== undefined) {
			this.on_apply_value();
		}
		else if (this.index > -1) {
			this.on_apply_index();
		}
		else if (this.text !== "") {
			this.on_apply_text();
		}

		this.on_apply_usecontextmenu();

		this._setEventHandler("onmousewheel", this.on_notify_combo_mousewheel, this);

		this.comboedit._setEventHandler("oneditclick", this.on_notify_edit_oneditclick, this);
		this.comboedit._setEventHandler("ontextchanged", this.on_notify_edit_ontextchanged, this);
		this.comboedit._setEventHandler("ontextchange", this.on_notify_edit_ontextchange, this);
		this.comboedit._setEventHandler("onchar", this.on_notify_edit_onchar, this);
		this.comboedit._setEventHandler("cancharchange", this.on_notify_edit_cancharchange, this);
		this.comboedit._setEventHandler("ontap", this.on_notify_ondropdown, this);
		if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
			this.comboedit._setEventHandler("onlbuttondown", this.on_notify_edit_onlbuttondown, this);
			this.dropbutton._setEventHandler("onlbuttondown", this.on_notify_ondropdown, this);
		}

		this.dropbutton._setEventHandler("ontap", this.on_notify_ondropdown, this);

		this.comboedit.on_created();
		this.dropbutton.on_created();

		if (nexacro._enableaccessibility) {
			this._want_arrows = false;
			this._setAccessibilityActiveDescendant(this.comboedit);
			this._setAccessibilityStatAutoComplete("list");

			this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
		}

		this.on_apply_style_align(this.currentstyle.align);
		this.on_apply_style_cursor(this.currentstyle.cursor);
		this.on_apply_style_letterspace(this.currentstyle.letterspace);

		this.on_apply_prop_rtldirection();

		if (!this.innerdataset) {
			this.set_text("");
		}
	};

	_pCombo.on_destroy_contents = function () {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		var form = this._getRootForm();
		if (form) {
			form._bind_manager._dettachSBindItem(this);
		}

		if (this.comboedit) {
			this.comboedit.destroy();
			this.comboedit = null;
		}
		if (this.dropbutton) {
			this.dropbutton.destroy();
			this.dropbutton = null;
		}
		if (this.combolist) {
			this.combolist.destroy();
			this.combolist = null;
		}
		if (this.popupwindow) {
			this.popupwindow.destroy();
			this.popupwindow = null;
		}

		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);
		}
		this._innerdataset = null;
		this.innerdataset = null;
		this._filtereddataset = null;
		this._selectinfo = null;
		this._eventinfo = null;
		this._exprcache = null;
		this._default_buttonsize = null;
	};

	_pCombo.on_change_containerRect = function (container_width, container_height) {
		this._recalcLayout();
	};

	_pCombo.on_apply_custom_setfocus = function (evt_name) {
		var comboedit = this.comboedit;

		try {
			comboedit._stat_change("focus", "focused");
			if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
				comboedit.on_apply_custom_setfocus(evt_name);
			}
			else {
				nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
			}
		}
		catch (e) {
		}
	};

	_pCombo.on_getBindableProperties = function () {
		return "value";
	};

	_pCombo._callback_onvaluechanged = function (obj, e) {
		if (this.type == "filter") {
			this._createFilteredDataset();
		}

		this._recheckValue();
		this._is_recheck = true;
	};

	_pCombo._callback_onrowsetchanged = function (obj, e) {
		if (e.reason == 31) {
			if (this.type == "filter") {
				this._createFilteredDataset();
			}
		}
		else if (e.reason == 10) {
			this.set_index(-1);
		}

		if (this._is_recheck == false) {
			this._recheckValue();
			this._is_recheck = true;
		}
	};

	_pCombo.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}

		if (this.comboedit) {
			this.comboedit._setEnable(enable);
		}
		if (this.dropbutton) {
			this.dropbutton._setEnable(enable);
		}
		if (this.combolist) {
			this.combolist._setEnable(enable);
		}
	};

	_pCombo.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;

		if (this.comboedit) {
			this.comboedit._setRtlDirection(_rtldirection);
		}
		if (this.dropbutton) {
			this.dropbutton._setRtlDirection(_rtldirection);
		}
		if (this.combolist) {
			this.combolist._setRtlDirection(_rtldirection);
		}
	};

	_pCombo.on_apply_custom_class = function () {
		if (this.comboedit) {
			this.comboedit.on_apply_prop_class();
		}
		if (this.dropbutton) {
			this.dropbutton.on_apply_prop_class();
		}
		if (this.combolist) {
			this.combolist.on_apply_prop_class();
		}
	};

	_pCombo.on_init_bindSource = function (columnid, propid, ds) {
		if (this.type == "filter") {
			this._createFilteredDataset();
		}

		this._prevalue = undefined;
		this._preindex = -1;
		this._pretext = "";
		this.value = undefined;

		this.index = -1;
		this.text = "";

		this._eventinfo.preindex = -1;
		this._eventinfo.pretext = "";
		this._eventinfo.prevalue = undefined;
		this._eventinfo.postindex = -1;
		this._eventinfo.posttext = "";
		this._eventinfo.postvalue = undefined;

		this.redraw();
		return true;
	};

	_pCombo.on_change_bindSource = function (propid, pSendDataset, rowIdx, colIdx, colArrayIdx) {
		if (propid !== "value" || !pSendDataset || rowIdx < -1 || colIdx < -1) {
			return false;
		}

		if (this.type == "filter") {
			this._createFilteredDataset();
		}

		var value = pSendDataset.getColumn(rowIdx, colIdx);

		if (this.value == value) {
			return true;
		}

		this._prevalue = this.value;
		this._preindex = this.index;
		this._pretext = this.text;
		this.value = value;


		this.index = this._getIndex(value);
		this.text = this._getItemText(this.index);

		if (this.index == -1 && !this._innerdataset) {
			this.index = rowIdx;
			this.text = value;
		}

		this._eventinfo.preindex = this._preindex;
		this._eventinfo.pretext = this._pretext;
		this._eventinfo.prevalue = this._prevalue;
		this._eventinfo.postindex = this.index;
		this._eventinfo.posttext = this.text;
		this._eventinfo.postvalue = this.value;

		this.redraw();
		return true;
	};

	_pCombo.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);

		if (this._isPopupVisible()) {
			if (resize_flag || move_flag) {
				this._closePopup();
				return;
			}

			this._update_popupwindow_position();

			if (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Runtime") {
				var pThis = this;

				var _observer = this._popupwindow_position_observer;
				if (_observer) {
					if (_observer._interval_timer) {
						_observer._interval_timer.stop();
						delete _observer._interval_timer;
						_observer._interval_timer = null;
					}
					this._popupwindow_position_observer = null;
				}

				var control_elem = this._control_element;
				_observer = this._popupwindow_position_observer = {
				};
				_observer._observed_count = 0;
				_observer._elem_pos = nexacro._getElementPositionInFrame(control_elem);
				_observer._interval_timer = new nexacro.CallbackTimer(this, function () {
					if (++_observer._observed_count >= 50) {
						_observer._interval_timer.destroy();
						delete _observer._interval_timer;
						_observer._interval_timer = null;
						return;
					}

					var cur_elem_pos = nexacro._getElementPositionInFrame(control_elem);
					if (_observer._elem_pos.x != cur_elem_pos.x || _observer._elem_pos.y != cur_elem_pos.y) {
						pThis._update_popupwindow_position();
						_observer._observed_count = 50;
					}
				}, 100);
				_observer._interval_timer.start();
			}
		}
	};

	_pCombo._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) {
			if (ctrlKey || altKey) {
				return {
					want_tab : false, 
					want_return : false, 
					want_escape : false, 
					want_chars : false, 
					want_arrows : true
				};
			}
		}

		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._want_arrows
		};
	};

	_pCombo.on_get_style_accessibility_label = function () {
		return "";
	};

	_pCombo._getAccessibilityReadLabel = function (bwholeread) {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (bwholeread && this.comboedit._input_element && this._status != "focus") {
			if (!this.comboedit._input_element._wantAccessibilityAdditionalLabel
				 || !this.comboedit._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}
		return _readlabel;
	};

	_pCombo._isItemAccessibilityEnable = function () {
		return false;
	};

	_pCombo.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (v != this.visible) {
			nexacro.Component.prototype.set_visible.call(this, v);
			if (!v && this._is_created) {
				this.closeDropdown();
			}
		}
	};

	_pCombo.set_value = function (v) {
		if (v != this.value) {
			var ret = this.applyto_bindSource("value", v);
			if (ret) {
				this._prevalue = this.value;
				this.value = v;
				this.on_apply_value();
			}
		}
	};

	_pCombo.on_apply_value = function () {
		if (this.getElement()) {
			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			var ds = this.type == "filter" ? fds : this._innerdataset;

			if (ds) {
				var row_count = ds.getRowCount();
				for (var i = 0; i < row_count; i++) {
					var item_value = this._getItemValue(i);

					if (item_value instanceof nexacro.Decimal && this.value instanceof nexacro.Decimal) {
						if (item_value.isEqual(this.value)) {
							this.index = i;
							this.text = this._getItemText(this.index);
							this._preindex = this.index;
							this._prevalue = this.value;

							this.redraw();
							this._refreshAccessibilityValue();
							return;
						}
					}
					else if (this.value == item_value) {
						this.index = i;
						this.text = this._getItemText(this.index);
						this._preindex = this.index;
						this._prevalue = this.value;

						this.redraw();
						this._refreshAccessibilityValue();
						return;
					}
				}

				this.index = -1;
				this.text = "";
				this._refreshAccessibilityValue();
			}
			this._preindex = this.index;
			this._prevalue = this.value;
			this.redraw();
			this._refreshAccessibilityValue();
		}
	};

	_pCombo.set_index = function (v) {
		if (v != this.index) {
			var ds;
			if (this.type == "filter") {
				ds = this._filtereddataset;
			}
			else {
				ds = this._innerdataset;
			}

			if (ds) {
				if (v !== undefined) {
					v = parseInt(v, 10) | 0;
				}

				this._preindex = this.index;
				this._pretext = this.text;
				this._prevalue = this.value;
				this.index = v;
				if (v >= 0 && ds && v < ds.getRowCount()) {
					this.value = this._getItemValue(v);
					this.text = this._getItemText(v);
				}
				this.on_apply_index();
			}
		}
	};

	_pCombo.on_apply_index = function () {
		if (this.getElement()) {
			var ds = this._innerdataset;
			var index = this.index;

			if (index >= 0 && ds && index < ds.getRowCount()) {
				this.value = this._getItemValue(index);
				this.text = this._getItemText(index);

				this._eventinfo.preindex = this._preindex;
				this._eventinfo.pretext = this._pretext;
				this._eventinfo.prevalue = this._prevalue;
				this._eventinfo.postindex = this.index;
				this._eventinfo.posttext = this.text;
				this._eventinfo.postvalue = this.value;

				if (this.applyto_bindSource("value", this.value) === false && !nexacro._isNull(this.value)) {
					this.index = this._preindex;
					this.value = this._prevalue;
					this.text = this._getItemText(this.index);
				}

				this.redraw();
				this._cancelSelect();
				this._refreshAccessibilityValue();

				return;
			}

			this.index = -1;
			this.value = undefined;
			this.text = "";

			if (ds) {
				if (this.applyto_bindSource("value", this.value) === false) {
					this.index = this._preindex;
					this.value = this._prevalue;
					if (this.index != -1) {
						this.text = this._getItemText(this.index);
					}
				}
			}
			this._preindex = this.index;
			this._prevalue = this.value;
			this.redraw();
			this._refreshAccessibilityValue();
		}
	};

	_pCombo.set_text = function (v) {
		if (v != this.text) {
			this._pretext = this.text;
			this.text = v == undefined ? "" : v;
			this.on_apply_text();
		}
	};

	_pCombo.on_apply_text = function () {
		if (this.getElement()) {
			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			var ds = this.type == "filter" ? fds : this._innerdataset;

			if (!ds || (!this.datacolumn && !this.codecolumn)) {
				if (this.comboedit._input_element._value == undefined || this._pretext != "") {
					if (this.value) {
						this._setEditValue(this.text);
					}
					else {
						if (this.displaynulltext || this.text == "") {
							this._setEditValue(undefined);
						}
						else {
							this._setEditValue(this.text);
						}
					}
				}
				this._refreshAccessibilityValue();
				return;
			}

			if (ds && this._is_created) {
				var row_count = ds.getRowCount();
				for (var i = 0; i < row_count; i++) {
					if (this.text == this._getItemText(i)) {
						this.index = i;
						this.value = this._getItemValue(i);

						if (this.applyto_bindSource("value", this.value) === false) {
							this.index = this._preindex;
							this.value = this._prevalue;
						}

						this._preindex = this.index;
						this._prevalue = this.value;

						this.redraw();
						this._refreshAccessibilityValue();
						return;
					}
				}
				this.value = undefined;
				this.text = "";
			}
			this._preindex = this.index;
			this._prevalue = this.value;
			this.redraw();
			this._refreshAccessibilityValue();
		}
	};

	_pCombo.set_codecolumn = function (v) {
		if (v != this.codecolumn) {
			this.codecolumn = v;
			this.on_apply_codecolumn();
		}
	};

	_pCombo.on_apply_codecolumn = function () {
		if (this.combolist) {
			this.combolist.set_codecolumn(this.codecolumn);
		}
		if (this.type == "filter") {
			this._createFilteredDataset();
		}
		this._recheckValue();
		this._is_recheck = true;
	};

	_pCombo.set_datacolumn = function (v) {
		if (v != this.datacolumn) {
			this.datacolumn = v;
			this.on_apply_datacolumn();
		}
	};

	_pCombo.on_apply_datacolumn = function () {
		if (this.combolist) {
			this.combolist.set_datacolumn(this.datacolumn);
		}
		if (this.type == "filter") {
			this._createFilteredDataset();
		}
		this._recheckValue();
		this._is_recheck = true;
	};

	_pCombo.setInnerDataset = function (obj) {
		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset();
		}
		else if (obj instanceof nexacro.Dataset || (typeof obj == "object" && obj._type_name == "Dataset")) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset();
			this._recheckValue();
			this._is_recheck = true;
		}
	};

	_pCombo._setInnerDatasetStr = function (str) {
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

	_pCombo.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pCombo.set_innerdataset = function (str) {
		this.innerdataset = "";

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
	};

	_pCombo.on_apply_innerdataset = function () {
		var ds = this._innerdataset;
		if (this.combolist) {
			this.combolist.setInnerDataset(ds);
		}

		if (ds) {
			ds._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			ds._setEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);

			if (this.type == "filter") {
				this._createFilteredDataset();
			}
		}
	};

	_pCombo.set_displayrowcount = function (v) {
		if (v != this.displayrowcount) {
			this.displayrowcount = v;
		}
	};

	_pCombo.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.autoselect) {
			this.autoselect = v;
			this.on_apply_autoselect();
		}
	};

	_pCombo.on_apply_autoselect = function () {
		if (this.type == "search") {
			this.comboedit && this.comboedit.set_autoselect(this.autoselect);
		}
		else {
			this.comboedit && this.comboedit.set_autoselect(false);
		}
	};

	_pCombo.set_autoskip = function (v) {
		if (v != this.autoskip) {
			this.autoskip = v;
			this.on_apply_autoskip();
		}
	};

	_pCombo.on_apply_autoskip = function () {
		this.comboedit && this.comboedit.set_autoskip(this.autoskip);
	};

	_pCombo.set_displaynulltext = function (v) {
		if (v != this.displaynulltext) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext();
		}
	};

	_pCombo.on_apply_displaynulltext = function () {
		this.comboedit && this.comboedit.set_displaynulltext(this.displaynulltext);
	};

	_pCombo.set_type = function (v) {
		if (v != this.type) {
			this.type = v;
			this.on_apply_type();
		}
	};

	_pCombo.on_apply_type = function () {
		if (this.getElement()) {
			if (this._filtereddataset) {
				this._filtereddataset.filter("");
			}

			if (this.type == "dropdown") {
				this.comboedit.set_readonly(true);
			}
			else {
				this.comboedit.set_readonly(this.readonly);
			}

			this.on_apply_autoselect();
		}
	};

	_pCombo.set_imemode = function (v) {
		this.imemode = nexacro._toString(v);
		this.on_apply_imemode();
	};

	_pCombo.on_apply_imemode = function () {
		this.comboedit && this.comboedit.set_imemode(this.imemode);
	};

	_pCombo.set_inputtype = function (v) {
	};

	_pCombo.set_comboedit = function (v) {
	};

	_pCombo.set_combolist = function (v) {
	};

	_pCombo.set_popupwindow = function (v) {
	};

	_pCombo.set_readonly = function (v) {
		v = nexacro._toBoolean(v);

		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pCombo.on_apply_readonly = function () {
		var v = this.readonly;

		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		if (this.comboedit) {
			if (this.type == "dropdown") {
				this.comboedit.set_readonly(true);
			}
			else {
				this.comboedit.set_readonly(v);
			}
		}
	};


	_pCombo.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);

		if (v != this.usecontextmenu) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu();
		}
	};

	_pCombo.on_apply_usecontextmenu = function () {
		var comboedit = this.comboedit;
		if (comboedit) {
			comboedit.set_usecontextmenu(this.usecontextmenu);
		}
	};

	_pCombo.set_useime = function (v) {
	};

	_pCombo.set_selectchangetype = function (v) {
		this.selectchangetype = nexacro._toString(v);
	};

	_pCombo.redraw = function () {
		var combolist = this.combolist;


		if (this.comboedit) {
			if (this.text) {
				this._setEditValue(this.text);
			}
			else {
				this._setEditValue(undefined);
			}
		}

		this._moverindex = this.index;
		combolist = null;
	};

	_pCombo.dropdown = function () {
		if (this.enable === false || this.readonly === true || this.visible === false) {
			return;
		}

		var ds;
		if (!this.isDropdown()) {
			if (this.type == "filter") {
				ds = this._filtereddataset;
				if (ds) {
					ds.set_filterstr("");
				}
				else {
					ds = this._getFilteredDataset();
				}
			}
			else {
				ds = this._innerdataset;
			}

			if (ds && ds.rowcount == 0) {
				ds = this._innerdataset;
			}

			this.setFocus(false);

			this._showPopup(ds, this.index);
		}
	};

	_pCombo.isDropdown = function () {
		if (!this.popupwindow) {
			return false;
		}
		return this.popupwindow._is_popup();
	};

	_pCombo.getSelect = function () {
		if (this._control_element) {
			return this.comboedit.getSelect();
		}
	};

	_pCombo.getCount = function () {
		if (this._control_element) {
			if (this.combolist) {
				return this.combolist.getCount();
			}
			else if (this._innerdataset) {
				return this._innerdataset.getRowCount();
			}
			else {
				return 0;
			}
		}
	};

	_pCombo.getSelectedText = function () {
		if (this._control_element) {
			return this.comboedit.getSelectedText();
		}
	};

	_pCombo.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		if (this._control_element) {
			return this.comboedit.getCaretPos();
		}
	};

	_pCombo.setSelect = function (start, end) {
		if (this._control_element) {
			return this.comboedit.setSelect(start, end);
		}
	};

	_pCombo.setSelectedText = function (v) {
		if (this._control_element) {
			return this.comboedit.setSelectedText(v);
		}
	};

	_pCombo.closeDropdown = function (obj, e) {
		if (this.isDropdown()) {
			this.popupwindow._closePopup();
		}
	};

	_pCombo.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pCombo.isAboveSelected = function () {
	};

	_pCombo.on_notify_ondropdown = function (obj, e) {
		if (this.readonly) {
			return false;
		}
		var ds = this._innerdataset;

		if (this._isPopupVisible() == true) {
			this.popupwindow._closePopup();
		}
		else {
			var comboedit = this.comboedit;
			if (comboedit) {
				comboedit.setSelect(0, 0);
			}

			if (this.combolist && this.type == "filter") {
				if (this._filtereddataset) {
					this._filtereddataset.set_filterstr("");
				}

				var items = ds.getRowCount();
				for (i = 0; i < items; i++) {
					if (this.text == this._getItemText(i)) {
						this._showPopup(ds, i);
						return false;
					}
					else {
						this._showPopup(ds, this.index);
					}
				}
			}
			else {
				this._showPopup(ds, this.index);
			}
		}

		return false;
	};

	_pCombo.on_notify_item_onlbuttonup = function () {
		if (!this.combolist) {
			return false;
		}

		if (this.selectchangetype != "noboundup") {
			return false;
		}

		if (this._isPopupVisible()) {
			if (!this._scroll_proc) {
				this.popupwindow._closePopup();
			}
		}

		return false;
	};
	_pCombo.on_notify_item_canitemchange = function (obj, e) {
		var eventinfo = e, retv;
		if (this.type == "filter") {
			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			var raw_post_index = this._getRawIndex(fds, e.postindex);
			raw_post_index = (raw_post_index == -1) ? e.postindex : raw_post_index;
		}
		else {
			raw_post_index = e.postindex;
		}

		if (retv = this.on_fire_canitemchange(obj, this.index, this.text, this.value, raw_post_index, e.posttext, e.postvalue)) {
			eventinfo.preindex = eventinfo.postindex;
			eventinfo.pretext = eventinfo.posttext;
			eventinfo.prevalue = eventinfo.postvalue;

			eventinfo.postindex = raw_post_index;
			eventinfo.posttext = e.posttext;
			eventinfo.postvalue = e.postvalue;

			this._setIndex(raw_post_index);

			if (this._isPopupVisible()) {
				if (!this._scroll_proc) {
					this.popupwindow._closePopup();
				}
			}
		}
		else {
			if (this._isPopupVisible()) {
				if (!this._scroll_proc) {
					this.popupwindow._closePopup();
				}
			}

			if (this.type == "filter") {
				fds.set_filterstr("");
			}
		}

		if (this.comboedit) {
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
				var win = this._getWindow();
				if (win) {
					win._removeFromCurrentFocusPath(this, true);
				}
			}
			if (this.parent && (this.parent._last_focused && (this.parent._last_focused.id == this.id))) {
				this.comboedit._setFocus(false);
			}
		}

		return retv;
	};

	_pCombo.on_notify_item_onitemclick = function (obj, e) {
		if (!this.combolist || !this.comboedit) {
			return false;
		}

		this.on_fire_onitemclick(obj, e.index, e.itemtext, e.itemvalue, e.button, e.altKey, e.ctrlKey, e.shiftKey, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY);

		if (e.index == this.index) {
			if (this.type == "filter") {
				var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
				var ds = this.type == "filter" ? fds : this._innerdataset;
				var curidx = this._getRawIndex(ds, e.index);

				if (curidx != this.index) {
					return;
				}
			}

			var eventinfo = e;
			this.on_fire_canitemchange(obj, this.index, this.text, this.value, e.index, e.itemtext, e.itemvalue);

			if (this._isPopupVisible()) {
				if (!this._scroll_proc) {
					this.popupwindow._closePopup();
				}

				if (this.comboedit) {
					if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
						var win = this._getWindow();
						if (win) {
							win._removeFromCurrentFocusPath(this, true);
						}
					}
					this._setFocus(false);
				}
			}
		}
	};

	_pCombo.on_notify_item_onitemchanged = function (obj, e) {
		if (!this.combolist || !this.comboedit) {
			return false;
		}

		var curidx = e.postindex;
		var codecol = this.codecolumn;
		var datacol = this.datacolumn;
		var ds;

		if (this.type == "filter") {
			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			ds = this.type == "filter" ? fds : this._innerdataset;
			curidx = this._getRawIndex(ds, curidx);
			ds = this._filtereddataset;
			fds.set_filterstr("");
		}
		else {
			ds = this._innerdataset;
		}

		var sel_info = this._selectinfo;
		var ei = {
			preindex : this.index, 
			pretext : this.text, 
			prevalue : this.value, 
			postindex : curidx, 
			posttext : ds.getColumn(curidx, datacol || codecol), 
			postvalue : ds.getColumn(curidx, codecol || datacol)
		};

		this._eventinfo.preindex = ei.preindex;
		this._eventinfo.pretext = ei.pretext;
		this._eventinfo.prevalue = ei.prevalue;
		this._eventinfo.postindex = ei.postindex;
		this._eventinfo.posttext = ei.posttext;
		this._eventinfo.postvalue = ei.postvalue;
		this._eventinfo.isselect = true;

		if (this.index != curidx) {
			if (this._isPopupVisible()) {
				if (!this._scroll_proc) {
					this.popupwindow._closePopup();
				}
			}
		}
		else {
			if (this.type != "dropdown") {
				this._setEditValue(this.text);
			}
			if (this._isPopupVisible()) {
				if (!this._scroll_proc) {
					this.popupwindow._closePopup();
				}
			}
		}

		if (this.comboedit) {
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
				var win = this._getWindow();
				if (win) {
					win._removeFromCurrentFocusPath(this, true);
				}
			}
			if (this.parent && (this.parent._last_focused && (this.parent._last_focused.id == this.id))) {
				this.comboedit._setFocus(false);
			}
		}

		return false;
	};

	_pCombo._setEditValue = function (v) {
		this.comboedit.set_value(v);
	};

	_pCombo.on_combo_keydown = function (elem, keycode, altKey, ctrlKey, shiftKey, eventBubbles) {
		if (this.readonly || !this.comboedit) {
			return false;
		}

		var E = nexacro.Event;
		var combolist = this.combolist;
		var popupwindow = this.popupwindow;
		var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
		var ds = this.type == "filter" ? fds : this._innerdataset;
		var datacol = this.datacolumn;
		var codecol = this.codecolumn;
		var nextidx, rawidx, curidx = this._moverindex;

		if (curidx < 0) {
			curidx = this.index;
		}

		if (!ds || (!datacol && !codecol)) {
			return;
		}

		if (keycode == E.KEY_ESC) {
			if (this._isPopupVisible()) {
				popupwindow._closePopup();
				this._setEditValue(this.text);
			}
			return false;
		}

		if (altKey == true && keycode == E.KEY_DOWN) {
			if (this._isPopupVisible()) {
				popupwindow._closePopup();
			}
			else {
				this._showPopup(ds, this.index);
			}
			return false;
		}

		var sel_info = this._selectinfo;
		var ei = {
			preindex : this.index, 
			pretext : this.text, 
			prevalue : this.value, 
			postindex : sel_info.index, 
			posttext : sel_info.text, 
			postvalue : sel_info.value
		};

		if (keycode == E.KEY_ENTER) {
			if (curidx >= 0) {
				if (this.type == "filter") {
					rawidx = this._getRawIndex(ds, curidx);
					rawidx = (rawidx == -1) ? curidx : rawidx;
					fds.set_filterstr("");
				}
				else {
					rawidx = curidx;
				}
			}

			ei.postindex = rawidx;
			ei.postvalue = this._getItemValue(rawidx);
			ei.posttext = this._getItemText(rawidx);

			if (this.on_fire_canitemchange(this, ei.preindex, ei.pretext, ei.prevalue, ei.postindex, ei.posttext, ei.postvalue) == false) {
				this._setEditValue(this.text);
				if (this._isPopupVisible()) {
					popupwindow._closePopup();
				}

				return false;
			}

			this._setIndex(rawidx);

			if (this._isPopupVisible()) {
				this._enterkey = true;
				popupwindow._closePopup();
			}

			this._eventinfo.isselect = true;
		}

		if (keycode == nexacro.Event.KEY_UP || keycode == nexacro.Event.KEY_DOWN) {
			if (!nexacro._enableaccessibility || ctrlKey || this._isPopupVisible()) {
				if (this._isPopupVisible()) {
					var text;
					if (keycode == nexacro.Event.KEY_UP) {
						if (curidx > 0) {
							var overidx = -1;
							if (combolist._overedItem) {
								overidx = combolist._overedItem.index;
							}
							else {
								overidx = curidx;
							}

							if (overidx == curidx) {
								nextidx = curidx - 1;
							}
							else {
								nextidx = overidx - 1;
							}
						}
						else {
							nextidx = 0;
						}
						this._downkey = false;

						text = ds.getColumn(nextidx, datacol || codecol);
						text = text == undefined ? "" : text;
						this._setEditValue(text);

						combolist._reset_item(nextidx);
						combolist._overeditemindex = nextidx;
						this._moverindex = nextidx;
					}
					else {
						var overidx = 0;
						if (combolist._overedItem) {
							overidx = combolist._overedItem.index;
						}
						else {
							overidx = curidx;
						}

						if (overidx == curidx) {
							nextidx = curidx + 1;
						}
						else {
							nextidx = overidx + 1;
						}

						if (nextidx < ds.getRowCount()) {
							text = ds.getColumn(nextidx, datacol || codecol);
							text = text == undefined ? "" : text;
							this._setEditValue(text);

							this._downkey = true;
							combolist._reset_item(nextidx);
							combolist._overeditemindex = nextidx;
							this._moverindex = nextidx;
						}
					}
				}
				else {
					if (keycode == nexacro.Event.KEY_UP) {
						if (curidx > 0) {
							nextidx = curidx - 1;
						}
						else {
							nextidx = 0;
						}
					}
					else {
						if (curidx + 1 < ds.getRowCount()) {
							nextidx = curidx + 1;
						}
						else {
							nextidx = curidx;
						}
					}

					if (nextidx >= 0) {
						if (this.type == "filter") {
							rawidx = this._getRawIndex(ds, nextidx);
							rawidx = (rawidx == -1) ? nextidx : rawidx;
							fds.set_filterstr("");
						}
						else {
							rawidx = nextidx;
						}
					}

					ei.postindex = rawidx;
					ei.postvalue = this._getItemValue(rawidx);
					ei.posttext = this._getItemText(rawidx);

					if (this.index != rawidx) {
						var ret = this.on_fire_canitemchange(this, ei.preindex, ei.pretext, ei.prevalue, ei.postindex, ei.posttext, ei.postvalue);
						if (ret) {
							this._setIndex(rawidx);
						}
					}
				}

				this._getWindow()._keydown_element._event_stop = true;
			}
			this._getWindow()._keydown_element._event_stop = true;
			return false;
		}
		return false;
	};

	if (nexacro.Browser == "Gecko") {
		_pCombo.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
			var popupwindow = this.popupwindow;
			if (this.comboedit.value == null || this.comboedit.value == "") {
				if (popupwindow._is_popup()) {
					popupwindow._closePopup();
				}
			}

			var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);

			if (key_code == nexacro.Event.KEY_UP || key_code == nexacro.Event.KEY_DOWN) {
				if (this.type == "dropdown") {
					this.comboedit.setCaretPos(0);
				}
			}

			return ret;
		};
		_pCombo._eachColosePopup = nexacro._emptyFn;
	}
	else {
		_pCombo._eachColosePopup = function (val) {
			var popupwindow = this.popupwindow;
			if (popupwindow._is_popup()) {
				popupwindow._closePopup();
			}
		};
	}

	_pCombo.on_fire_onkillfocus = function (obj, fromObj) {
		if (this._text_change == true) {
			this._setEditValue(this.text);
		}

		if (this.combolist) {
			this.combolist._reset_item(this.index);
			this.combolist._overeditemindex = -1;
			this._moverindex = -1;
		}

		if (this._isPopupVisible()) {
			this.popupwindow._closePopup();
			this._setEditValue(this.text);
		}

		if (this.comboedit) {
			this.comboedit._stat_change("notfocus", "normal");
		}
		nexacro.Component.prototype.on_fire_onkillfocus.call(this, obj, fromObj);
	};

	_pCombo.on_notify_edit_onlbuttondown = function (obj, e) {
		if (this.readonly) {
			return false;
		}

		if (this._isPopupVisible()) {
			this.popupwindow._closePopup();
		}
		else {
			if (this.type == "dropdown") {
				this._showPopup(this._innerdataset, this.index);
			}
		}

		return false;
	};

	_pCombo._is_fling = false;
	_pCombo._on_bubble_flingstart = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		this._is_fling = true;
		return nexacro.Component.prototype._on_bubble_flingstart.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble);
	};

	_pCombo._on_bubble_flingend = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble) {
		this._is_fling = false;
		return nexacro.Component.prototype._on_bubble_flingend.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, event_bubbles, fire_comp, refer_comp, is_userbubble);
	};

	_pCombo.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pCombo.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		var upelem = this._is_real_upelem;
		this._is_real_upelem = null;

		if (from_refer_comp instanceof nexacro.ScrollBarCtrl) {
			return;
		}
		if (from_refer_comp && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl) {
			return;
		}

		var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);

		var window = this._getWindow();
		var down_id = "";
		var compinfo = window.findComponent(window._cur_ldown_elem, 0, 0);
		if (compinfo && compinfo[0]) {
			down_id = compinfo[0]._unique_id;
		}

		var up_id = "";
		compinfo = window.findComponent(from_elem, 0, 0);
		if (compinfo && compinfo[0]) {
			up_id = compinfo[0]._unique_id;
		}

		if (down_id != up_id) {
			return;
		}

		var moveredidx = -1;
		var preindex = this.index;
		var combolist = this.combolist;
		var comboedit = this.comboedit;
		var sel_info = combolist && combolist._selectinfo;

		if (combolist) {
			moveredidx = combolist._overeditemindex;
		}

		if (this.visible && this._isEnable() && this._isPopupVisible()) {
			if (combolist) {
				if (moveredidx > -1) {
					if (preindex != moveredidx) {
						if (sel_info.index == moveredidx) {
							this._setIndex(preindex);
						}
						else {
							this._setIndex(moveredidx);
						}
						if (upelem && this._isPopupVisible()) {
							if (!this._scroll_proc) {
								this.popupwindow._closePopup();
							}
						}
					}
					else {
						this._setIndex(preindex);
					}

					if (comboedit) {
						if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
							comboedit.on_apply_custom_setfocus();
						}
					}
				}
				else {
					this._setIndex(preindex);
				}
			}
		}
		combolist = null;
		comboedit = null;

		return ret;
	};

	_pCombo.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		if (this._is_fling_stop) {
			return;
		}

		if (this.isDropdown()) {
			var sel_info_list = this.combolist._selectinfo_list;

			if (this._scroll_proc) {
				if (sel_info_list.length) {
					var last = sel_info_list.length - 1;
					var info = sel_info_list[last];

					if (info.index != this.index) {
						info.obj._keep_selecting = false;
						info.obj._stat_change("notselect", "normal");
						sel_info_list.splice(last, 1);
					}
				}
				return;
			}

			while (sel_info_list.length) {
				var down_item = sel_info_list[0].obj;
				if (down_item) {
					down_item._keep_selecting = false;


					if (!down_item.selected) {
						down_item._stat_change("notselect", "normal");
					}
				}
				sel_info_list.shift();
			}
		}
		return;
	};

	_pCombo.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pCombo.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
		this.on_combo_keydown(null, keycode, alt_key, ctrl_key, shift_key, 0);
		return ret;
	};

	_pCombo._on_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll) {
		if (this.popupwindow && this.popupwindow._is_popup()) {
			if (this.combolist) {
				return this.combolist._on_mousewheel(elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll);
			}
		}

		return true;
	};
	_pCombo.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, comp, refer_comp) {
		if (this.readonly) {
			return false;
		}
		var last_focus = this._find_lastFocused();
		if ((this != last_focus && !this._is_subcontrol) || (this.parent != last_focus && this._is_subcontrol)) {
			return;
		}
		if (!this.popupwindow || !this.popupwindow._is_popup()) {
			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			var ds = this.type == "filter" ? fds : this._innerdataset;
			var curidx = this.index;
			var nextidx = 0;

			if (wheelDeltaY > 0) {
				if (curidx > 0) {
					nextidx = curidx - 1;
				}
				else {
					nextidx = 0;
				}
				this._setIndex(nextidx);
			}
			else {
				nextidx = curidx + 1;
				if (nextidx < ds.getRowCount()) {
					this._setIndex(nextidx);
				}
			}
		}

		return true;
	};

	_pCombo.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		this._update_popupwindow_position();

		return (this.popupwindow && this.popupwindow._is_popup()) ? true : false;
	};

	_pCombo.on_fire_sys_onfling = function (elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onfling.call(this, elem, fling_handler, xstartvalue, ystartvalue, xdeltavalue, ydeltavalue, touchlen, from_comp, from_refer_comp);

		this._update_popupwindow_position();

		return ret;
	};

	_pCombo.on_notify_edit_cancharchange = function (obj, e) {
		if (this.cancharchange && this.cancharchange._has_handlers) {
			e.fromobject = this;
			var ret = this.cancharchange._fireCheckEvent(this, e);
			if (!ret) {
				this.value = e.pretext;
				this.text = e.pretext;
				this._setEditValue(this.text);
			}

			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_notify_edit_onchar = function (obj, e) {
		if (this.onchar && this.onchar._has_handlers) {
			var evt = new nexacro.CharEventInfo(obj, "onchar", e.chartext, e.pretext, e.posttext);
			var ret = this.onchar._fireCheckEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_notify_edit_ontextchange = function (obj, e) {
		return this.on_fire_ontextchange(obj, e);
	};

	_pCombo.on_notify_edit_ontextchanged = function (obj, e) {
		return this.on_fire_ontextchanged(obj, e);
	};

	_pCombo.on_fire_ontextchange = function (obj, e) {
		if (this.ontextchange && this.ontextchange._has_handlers) {
			e.fromobject = this;
			var ret = this.ontextchange._fireCheckEvent(this, e);
			if (e.pretext != e.posttext) {
				this._text_change = true;
			}

			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_fire_ontextchanged = function (obj, e) {
		var ret = false;

		if (this.ontextchanged && this.ontextchanged._has_handlers) {
			e.fromobject = this;
			ret = this.ontextchanged._fireEvent(this, e);
		}
		this.on_combo_text_changed(e.pretext, e.posttext);
		return nexacro._toBoolean(ret);
	};


	_pCombo.on_notify_edit_oneditclick = function (obj, e) {
		if (nexacro.isTouchInteraction && nexacro.SupportTouch && !application.enabletouchevent) {
			var evt = new nexacro.EventInfo(this, "oneditclick");
			this.on_notify_edit_onlbuttondown(this, evt);
		}

		if (this.oneditclick && this.oneditclick._has_handlers) {
			e.fromobject = this;
			var ret = this.oneditclick._fireEvent(this, e);
			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_combo_text_changed = function (pretext, posttext) {
		if (this.readonly || !this.comboedit) {
			return false;
		}

		if ((this.type != "dropdown") && (this.onkeydown && this.onkeydown.defaultprevented === true)) {
			this.comboedit.set_value("");
			return;
		}

		var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
		var ds = this.type == "filter" ? fds : this._innerdataset;
		if (!ds) {
			return false;
		}

		if (!this.combolist && this.type != "dropdown") {
			this._createList(ds);
		}

		var col = this.datacolumn || this.codecolumn;
		var keyval = posttext;
		var comboedit = this.comboedit;
		var popupwindow = this.popupwindow;
		this._keyval = keyval;

		if (keyval === "") {
			this._text_change = true;
			this._eachColosePopup();

			return;
		}

		switch (this.type) {
			case "search":
				var index = ds.findRowAs(col, keyval);

				if (index >= 0) {
					var flag_backspace = false;
					if (comboedit._edit_base_api && comboedit._edit_base_api._charcode == nexacro.Event.KEY_BACKSPACE) {
						flag_backspace = true;
					}

					if (!popupwindow._is_popup()) {
						this._text_change = true;
						this._showPopup(ds, index);
					}
					else {
						this._showPopup(ds, index);
					}
				}
				else {
					if (popupwindow._is_popup()) {
						popupwindow._closePopup();
					}
				}
				break;
			case "filter":
				ds.set_filterstr("");
				ds.set_filterstr(col + ".match('" + keyval + "')");

				if (ds.getRowCount() > 0) {
					this.combolist._overeditemindex = 0;
					this._moverindex = 0;
					this._text_change = true;
					this._showPopup(ds, 0);
				}
				else {
					if (popupwindow._is_popup()) {
						popupwindow._closePopup();
					}
				}
				break;
		}
		this._keyval = undefined;
	};

	_pCombo.on_fire_onitemclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(obj, "onitemclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			this.onitemclick._fireEvent(this, evt);
		}

		return false;
	};

	_pCombo.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		this.applyto_bindSource("value", obj.value);

		var sel_info = this._selectinfo;
		sel_info.index = postindex;
		sel_info.text = posttext;
		sel_info.value = postvalue;

		this._eventinfo.preindex = preindex;
		this._eventinfo.pretext = pretext;
		this._eventinfo.prevalue = prevalue;
		this._eventinfo.postindex = postindex;
		this._eventinfo.posttext = posttext;
		this._eventinfo.postvalue = postvalue;
		this._eventinfo.isselect = true;

		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
			this.onitemchanged._fireEvent(this, evt);
		}

		return false;
	};

	_pCombo.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.canitemchange && this.canitemchange._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
			var ret = this.canitemchange._fireCheckEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_fire_ondropdown = function (obj) {
		if (this.ondropdown && this.ondropdown._has_handlers) {
			var evt = new nexacro.EventInfo(this, "ondropdown");
			evt.postvalue = this.value;
			var ret = this.ondropdown._fireEvent(this, evt);
			if (ret == undefined) {
				ret = true;
			}

			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pCombo.on_fire_oncloseup = function (obj, beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect) {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		var listidx;
		if (this.combolist) {
			listidx = this.combolist.index;

			if (this.type == "filter") {
				listidx = this._getRawToListindex(listidx);
			}
			if (!this._enterkey) {
				this.combolist._reset_item(listidx);
			}
			this._enterkey = false;
			this.combolist._overeditemindex = -1;
			this._moverindex = -1;
			if (this.combolist._overedItem) {
				this.combolist._overedItem = null;
			}
		}

		if (isSelect == false && (this.combolist && this.index != listidx)) {
			if ((beforeText == afterText) && (this._keyval !== "") && (this._text_change == false)) {
				this._setEditValue(this.text);
			}

			if (this.combolist) {
				if (this.type == "filter") {
					beforeIndex = this._getRawToListindex(beforeIndex);
				}
				this.combolist.index = beforeIndex;
				this.combolist.on_apply_index(beforeIndex);
			}
		}

		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = new nexacro.ComboCloseUpEventInfo(this, "oncloseup", beforeIndex, beforeText, beforeValue, afterIndex, afterText, afterValue, isSelect);
			var ret = this.oncloseup._fireEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pCombo.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var ret = false;
		if (this._isPopupVisible()) {
			var combolist = this.combolist;
			var items = combolist._get_contents_rows();
			var obj = null;

			if (items) {
				if (direction) {
					combolist._overeditemindex++;
				}
				else {
					combolist._overeditemindex--;
				}

				if (combolist._overeditemindex < 0 || combolist._overeditemindex > items.length - 1) {
					if (this._isPopupVisible()) {
						this._closePopup();
					}
					combolist._overeditemindex = 0;
				}
				else {
					obj = combolist._getItemByRealIdx(items, combolist._overeditemindex).obj;
				}
			}

			if (obj) {
				ret = true;
				obj._setAccessibilityNotifyEvent();
			}
		}
		return ret;
	};

	_pCombo._applyZoomPopup = function () {
		if (this.popupwindow && this.popupwindow._is_popup()) {
			if (this.enable === false || this.readonly === true || this.visible === false) {
				return;
			}

			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			var ds = this.type == "filter" ? fds : this._innerdataset;
			if (ds && ds.rowcount == 0) {
				ds = this._innerdataset;
			}

			this._showPopup(ds, this.index);
		}
	};

	_pCombo._setIndex = function (v, bIgnoreCompareIdx) {
		if (bIgnoreCompareIdx || v != this.index) {
			var ds;
			if (this.type == "filter") {
				ds = this._filtereddataset;
			}
			else {
				ds = this._innerdataset;
			}

			if (ds) {
				v = parseInt(v, 10) | 0;

				this._preindex = this.index;
				this._pretext = this.text;
				this._prevalue = this.value;
				this.index = v;
				this.on_apply_index();

				this.on_fire_onitemchanged(this, this._eventinfo.preindex, this._eventinfo.pretext, this._eventinfo.prevalue, this._eventinfo.postindex, this._eventinfo.posttext, this._eventinfo.postvalue);
			}
		}

		return v;
	};

	_pCombo._recalcLayout = function () {
		if (!this.getElement() || !this._is_created_contents) {
			return;
		}

		var comboedit = this.comboedit;
		var dropbutton = this.dropbutton;
		var btn_size = 0;
		var client_width = this._client_width;
		var client_height = this._client_height;
		var client_left = this._client_left;
		var client_top = this._client_top;

		var style_btnsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);

		if (!style_btnsize || style_btnsize._is_empty) {
			btn_size = client_height;
		}
		else if (parseInt(style_btnsize._value, 10) > client_width) {
			btn_size = client_width;
		}
		else {
			btn_size = parseInt(style_btnsize._value, 10) | 0;
			if (btn_size < 0) {
				btn_size = client_height;
			}
		}

		if (dropbutton) {
			var btn_left = client_width - btn_size;
			var btn_top = client_top;
			var btn_width = btn_size;
			var btn_height = client_height;

			var btn_margin = dropbutton.on_find_CurrentStyle_margin(this._pseudo);
			if (btn_margin && !btn_margin._is_empty) {
				btn_left = btn_left + btn_margin.left;
				btn_top = btn_margin.top;
				btn_width = btn_size - btn_margin.left - btn_margin.right;
				btn_height = client_height - btn_margin.top - btn_margin.bottom;
			}
			dropbutton.move(btn_left, btn_top, btn_width, btn_height, null, null);
		}

		if (comboedit) {
			var edit_left = client_left;
			var edit_top = client_top;
			var edit_width = client_width - btn_size - 1;
			var edit_height = client_height;

			var edit_margin = comboedit.on_find_CurrentStyle_margin(this._pseudo);
			if (edit_margin && !edit_margin._is_empty) {
				edit_left = edit_margin.left;
				edit_top = edit_margin.top;
				edit_width = edit_width - edit_margin.left - edit_margin.right;
				edit_height = edit_height - edit_margin.top - edit_margin.bottom;
			}
			comboedit.move(edit_left, edit_top, edit_width, edit_height, null, null);
		}
	};
	_pCombo._getMaxTextSize = function (ds) {
		var col = this.datacolumn || this.codecolumn;
		var combolist = this.combolist;
		if (!ds || !col || !combolist) {
			return false;
		}

		return combolist._getMaxTextSize();
	};

	_pCombo._isPopupVisible = function () {
		var popupwindow = this.popupwindow;
		if (popupwindow && popupwindow.visible == true) {
			return true;
		}
		else {
			return false;
		}
	};

	_pCombo._createListOnly = function (ds) {
		var datacol = this.datacolumn;
		var codecol = this.codecolumn;
		var combolist = this.combolist;

		if (!ds || ds && ds.getRowCount() <= 0 || (!datacol && !codecol)) {
			return;
		}

		if (!combolist) {
			this._exprcache = {
			};

			combolist = this.combolist = new nexacro.ComboListCtrl("combolist", "absolute", 0, 0, 1, 1, null, null, this);
			combolist.set_scrollbars("autovert");
			combolist.set_codecolumn(codecol);
			combolist.set_datacolumn(datacol);
			this.on_apply_innerdataset();

			combolist.createComponent(true);
			combolist._setEventHandler("onitemclick", this.on_notify_item_onitemclick, this);
			combolist._setEventHandler("canitemchange", this.on_notify_item_canitemchange, this);
			combolist._setEventHandler("onitemchanged", this.on_notify_item_onitemchanged, this);
		}
	};

	_pCombo._createList = function (ds, max_width, max_height) {
		var datacol = this.datacolumn;
		var codecol = this.codecolumn;

		if (!ds || ds && ds.getRowCount() <= 0 || (!datacol && !codecol)) {
			return;
		}

		if (!this.combolist) {
			this._createListOnly(ds);
		}

		var combolist = this.combolist;
		var popupwindow = this.popupwindow;
		if (!popupwindow) {
			popupwindow = this.popupwindow = new nexacro.ComboPopupWindow("combopopup", "absolute", 0, 0, 0, 0, null, null, this);
			popupwindow._track_capture = false;
		}

		if (!popupwindow._is_created) {
			popupwindow.createComponent(true);
			popupwindow._attach(combolist);
			popupwindow.on_created();
		}

		if (!combolist._is_created) {
			var control_elem = combolist._control_element;
			if (control_elem && control_elem._adjust_height == null) {
				if (max_width != undefined && max_height != undefined) {
					control_elem.setElementSize(max_width, max_height);
				}
				else {
					var size = this._getPopuplistSize(ds);
					var width = size.width;
					var height = size.height;
					control_elem.setElementSize(width, height);
				}
			}

			combolist.on_created();
			combolist.getElement().setElementToolTip("", combolist.getElement().tooltiptype);
		}

		popupwindow = null;
		combolist = null;
	};

	_pCombo._update_popupwindow_position = function () {
		var popupwindow = this.popupwindow;
		if (popupwindow) {
			var popup_control_elem = popupwindow._control_element;

			var ds = this.type == "filter" ? (this._filtereddataset ? this._filtereddataset : this._getFilteredDataset()) : this._innerdataset;
			ds = (ds && ds.rowcount == 0) ? this._innerdataset : ds;

			var size = this._getPopuplistSize(ds);
			var height = size.height, width = size.width;
			var pos = nexacro._getElementPositionInFrame(this._control_element);

			{

				var offs = {
					x : 0, 
					y : 0
				};
				var w = this._getWindow();
				var w_w = w.getWidth();
				var w_h = w.getHeight();

				var scale = this._getCumulativeZoomFactor() / 100.0;

				offs.width = w_w - pos.x + (this._adjust_width * scale);
				width = parseInt(Math.min(width, offs.width / scale));

				offs.height = w_h - pos.y + (this._adjust_height * scale);
				height = parseInt(Math.min(height, offs.height / scale));
			}

			var scalepos = popupwindow._getScalePosition(width, height);
			var l = pos.x + scalepos.left, t = pos.y + scalepos.top;

			if (this._getPopupType() == "center") {
				var rootframe = this._getOwnerFrame();
				if (!rootframe) {
					return;
				}

				var rootwindow = rootframe._getWindow();
				rootframe = rootwindow ? rootwindow.frame : null;
				if (!rootframe) {
					return;
				}

				l = ((rootframe.width / 2) - (popup_control_elem.width / 2));
				t = ((rootframe.height / 2) - (popup_control_elem.height / 2));

				t = t < 0 ? 0 : t;
				popup_control_elem.setElementPosition(l / scale, t);
			}
			else {
				popup_control_elem.setElementPosition(l, t);
			}
			popupwindow = null;
		}
	};

	_pCombo._showPopup = function (ds, index) {
		var is_change_index = false;
		var pre_idx = this.index;

		this._eventinfo.preindex = this.index;
		this._eventinfo.pretext = this.text;
		this._eventinfo.prevalue = this.value;

		if (this.on_fire_ondropdown(this) == false) {
			return;
		}

		if (pre_idx != this.index) {
			is_change_index = true;
		}

		if ((this.ondropdown && this.dropdown.preventable && this.ondropdown.defaultprevented === true) || !ds || (ds && ds.getRowCount() == 0) || this._getPopupType() == "none") {
			return;
		}

		if (is_change_index) {
			index = this.index;
		}

		this._createListOnly(ds);

		var size = this._getPopuplistSize(ds);
		var width = parseInt(size.width);
		var height = parseInt(size.height);

		if (height > 700) {
			var offs = {
				x : 0, 
				y : 0
			};
			var w = this._getWindow();
			var w_w = w.getWidth();
			var w_h = w.getHeight();

			var pos = nexacro._getElementPositionInFrame(this._control_element);
			var scale = this._getCumulativeZoomFactor() / 100.0;

			offs.width = w_w - pos.x + (this._adjust_width * scale);
			width = parseInt(Math.min(width, offs.width / scale));

			offs.height = w_h - pos.y + (this._adjust_height * scale);
			height = parseInt(Math.min(height, offs.height / scale));
		}

		this._createList(ds, width, height);

		var combolist = this.combolist;
		var popupwindow = this.popupwindow;

		this.on_apply_prop_rtldirection();

		if (nexacro._enableaccessibility) {
			this._want_arrows = true;
		}

		if (combolist) {
			if (this._getPopupType() == "center") {
				popupwindow._popupCenterAuto(width, height);
			}
			else {
				popupwindow._popupAuto(width, height);
			}

			combolist.setInnerDataset(ds);
			combolist.set_index(index);
			combolist._reset_item(index);

			if (index == -1 && combolist.vscrollbar) {
				combolist.getElement().setElementVScrollPos(0);
			}

			var _window = this._getWindow();
			if (_window && this._track_capture) {
				if (_window._getCaptureComp(true, false) != this) {
					_window._setCaptureLock(this, true, false);
				}
			}

			if (nexacro._enableaccessibility) {
				if (nexacro._accessibilitytype == 4) {
					combolist.setFocus();
				}
				else if (nexacro._accessibilitytype == 5) {
					combolist._setAccessibilityNotifyEvent();
				}
			}


			combolist = null;
		}
	};

	_pCombo._closePopup = function () {
		var popupwindow = this.popupwindow;
		if (popupwindow) {
			popupwindow._closePopup();
		}

		popupwindow = null;
	};

	_pCombo._getPopuplistSize = function (ds) {
		var combolist = this.combolist;
		var ds_cnt = ds.getRowCount();
		var display_cnt = this.displayrowcount < ds_cnt ? this.displayrowcount : ds_cnt;

		var totalw, totalh;
		var textw = this._getMaxTextSize(ds);
		var itemh = parseInt(combolist.currentstyle.itemheight._value, 10);

		var cl_p = combolist.on_find_CurrentStyle_padding(this._pseudo);
		var cl_b = combolist.on_find_CurrentStyle_border(this._pseudo);

		var item_p = combolist.on_find_CurrentStyle_itempadding(this._pseudo);
		var item_b = combolist.on_find_CurrentStyle_itemborder(this._pseudo);

		var cl_pw = cl_p ? cl_p._getPaddingWidth() : 0;
		var cl_ph = cl_p ? cl_p._getPaddingHeight() : 0;
		var cl_bw = cl_b ? cl_b._getBorderWidth() : 0;
		var cl_bh = cl_b ? cl_b._getBorderHeight() : 0;

		var item_pw = item_p ? item_p._getPaddingWidth() : 0;
		var item_bw = item_b ? item_b._getBorderWidth() : 0;

		totalh = display_cnt <= 0 ? itemh * ds_cnt : itemh * display_cnt;
		totalh += cl_ph + cl_bh;
		textw += cl_pw + cl_bw;
		totalw = Math.max(this._adjust_width, textw);

		return {
			width : totalw, 
			height : totalh
		};
	};

	_pCombo._getRawToListindex = function (idx) {
		if (this.type == "filter") {
			var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
			var row_count = fds._viewRecords.length;
			var idsArr = fds._viewRecords;

			for (var i = 0; i < row_count; i++) {
				if (idsArr[i]._rawidx == idx) {
					return i;
				}
			}
		}
		return idx;
	};

	_pCombo._getRawIndex = function (fds, idx) {
		var ids = this._innerdataset;

		if (idx == -1 || (fds._viewRecords.length <= idx)) {
			return -1;
		}

		var rawidx = fds._viewRecords[idx]._rawidx;
		var idsArr = ids._rawRecords;
		var row_count = idsArr.length;

		for (var i = 0; i < row_count; i++) {
			if (idsArr[i]._rawidx == rawidx) {
				return rawidx;
			}
		}
		return -1;
	};

	_pCombo._getFilteredDataset = function () {
		if (!this._filtereddataset) {
			this._createFilteredDataset();
		}
		return this._filtereddataset;
	};

	_pCombo._createFilteredDataset = function () {
		var fds = this._filtereddataset;
		var codecol = this.codecolumn;
		var datacol = this.datacolumn;
		var ids = this._innerdataset;

		if (ids && (!(codecol in ids.colinfos) || !(datacol in ids.colinfos))) {
			return;
		}

		if (!ids || ids && ids.getRowCount() <= 0 || !datacol && !codecol) {
			return;
		}

		var row_count = ids.getRowCount();

		if (!fds) {
			fds = this._filtereddataset = new nexacro.Dataset("filter_" + this.id);
			fds.addColumn(codecol, "string");
			fds.addColumn(datacol, "string");

			for (var i = 0; i < row_count; i++) {
				fds.insertRow(i);
				fds.setColumn(i, codecol, ids.getColumn(i, codecol));
				fds.setColumn(i, datacol, ids.getColumn(i, datacol));
			}
		}
		else {
			if (this.combolist) {
				this.combolist._userDsChange = true;

				fds.clear();
				fds.addColumn(codecol, "string");
				fds.addColumn(datacol, "string");
				for (var i = 0; i < row_count; i++) {
					fds.insertRow(i);
					fds.setColumn(i, codecol, ids.getColumn(i, codecol));
					fds.setColumn(i, datacol, ids.getColumn(i, datacol));
				}

				this.combolist._userDsChange = false;
				this.combolist.redraw();
			}
			else {
				fds.clear();
				fds.addColumn(codecol, "string");
				fds.addColumn(datacol, "string");
				for (var i = 0; i < row_count; i++) {
					fds.insertRow(i);
					fds.setColumn(i, codecol, ids.getColumn(i, codecol));
					fds.setColumn(i, datacol, ids.getColumn(i, datacol));
				}
			}
		}
	};

	_pCombo._getDragData = function () {
		if (this.comboedit && this.comboedit.getSelectedText) {
			return this.comboedit.getSelectedText();
		}
	};

	_pCombo._recheckValue = function () {
		var ds = this._innerdataset;
		if (!this.comboedit) {
			return false;
		}
		if (this.value !== undefined) {
			if (ds) {
				var row_count = ds.getRowCount();
				for (var i = 0; i < row_count; i++) {
					if (this.value == this._getItemValue(i)) {
						this.index = i;
						this.text = this._getItemText(i);
						this.redraw();
						return;
					}
				}

				this.index = -1;
				this.text = "";
				this.redraw();
				return;
			}
		}

		if (this.text != "") {
			if (ds) {
				var row_count = ds.getRowCount();
				for (var i = 0; i < row_count; i++) {
					if (this.text == this._getItemText(i)) {
						this.index = i;
						this.value = this._getItemValue(i);
						this.redraw();
						return;
					}
				}
			}
		}

		if (this.index != -1) {
			if (ds) {
				if (this.index < ds.getRowCount()) {
					this.value = this._getItemValue(this.index);
					this.text = this._getItemText(this.index);
					this.redraw();
					return;
				}
			}
		}

		this.index = -1;
		this.value = undefined;
		this.text = "";

		if (!ds) {
			this.redraw();
		}
	};

	_pCombo._getItemValue = function (index) {
		var ds = this._innerdataset;
		var column = this.codecolumn || this.datacolumn;

		if (ds && column) {
			var rtn = ds.getColumn(index, column);
			if (rtn == undefined && this.type == "filter") {
				rtn = this._innerdataset.getColumn(index, column);
			}

			return rtn;
		}

		return null;
	};

	_pCombo._getItemText = function (index) {
		var ds = this._innerdataset;
		var column = this.datacolumn || this.codecolumn;

		if (ds && column) {
			var rtn = ds.getColumn(index, column);
			if (rtn == undefined && this.type == "filter") {
				rtn = this._innerdataset.getColumn(index, column);
			}

			return rtn;
		}

		return null;
	};

	_pCombo._getIndex = function (value) {
		var fds = this._filtereddataset ? this._filtereddataset : this._getFilteredDataset();
		var ds = this.type == "filter" ? fds : this._innerdataset;

		if (ds) {
			var row_count = ds.getRowCount();
			for (var i = 0; i < row_count; i++) {
				var v = this._getItemValue(i);
				if (value instanceof nexacro.Decimal) {
					value = value.toString();
				}
				if (v instanceof nexacro.Decimal) {
					v = v.toString();
				}

				if (value == v) {
					return i;
				}
			}
		}

		return -1;
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		_pCombo._cancelSelect = function () {
			if (this.comboedit) {
				this.comboedit._cancelSelect();
			}
		};
	}
	else {
		_pCombo._cancelSelect = function () {
			if (this.comboedit) {
				this.comboedit.setCaretPos(0);
			}
		};
	}

	_pCombo._setAccessibilityInfoByHover = function (control) {
		if (this._isPopupVisible()) {
			var combolist = this.combolist;
			return combolist._setAccessibilityInfoByHover(control);
		}
		else {
			return this._setAccessibilityNotifyEvent();
		}
	};

	_pCombo._clearAccessibilityInfoByHover = function () {
		if (this.combolist) {
			this.combolist._clearAccessibilityInfoByHover();
		}
	};

	delete _pCombo;
	_pCombo = null;


	nexacro.ComboListCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ListBoxCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._default_itemheight = nexacro._getCachedStyleObj("itemheight", "20");
		this._overedItem = null;

		this._downItem = null;
		this._is_accessibility_changeIdx = false;
	};

	var _pComboListCtrl = nexacro._createPrototype(nexacro.ListBoxCtrl, nexacro.ComboListCtrl);
	nexacro.ComboListCtrl.prototype = _pComboListCtrl;

	_pComboListCtrl.on_find_CurrentStyle_itemheight = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemheight(pseudo) || this._default_itemheight;
	};

	_pComboListCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this._find_pseudo_obj("border", pseudo, "border");
	};

	_pComboListCtrl.on_find_CurrentStyle_itembackground = function (pseudo) {
		return this.parent._find_pseudo_obj("itembackground", pseudo, "background") || this._find_pseudo_obj("itembackground", pseudo, "background");
	};

	_pComboListCtrl.on_find_CurrentStyle_itemgradation = function (pseudo) {
		return this.parent._find_pseudo_obj("itemgradation", pseudo, "gradation") || this._find_pseudo_obj("itemgradation", pseudo, "gradation");
	};

	_pComboListCtrl.on_find_CurrentStyle_itemborder = function (pseudo) {
		return this.parent._find_pseudo_obj("itemborder", pseudo, "border") || this._find_pseudo_obj("itemborder", pseudo, "border");
	};

	_pComboListCtrl.on_find_CurrentStyle_itembordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("itembordertype", pseudo, "bordertype") || this._find_pseudo_obj("itembordertype", pseudo, "bordertype");
	};

	_pComboListCtrl.on_find_CurrentStyle_itempadding = function (pseudo) {
		return this.parent._find_pseudo_obj("itempadding", pseudo, "padding") || this._find_pseudo_obj("itempadding", pseudo, "padding");
	};

	_pComboListCtrl.on_find_CurrentStyle_itemaccessibility = function (pseudo) {
		return this.parent._find_pseudo_obj("itemaccessibility", pseudo, "accessibility") || this._find_pseudo_obj("itemaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pComboListCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent._find_pseudo_obj("itemcolor", pseudo, "color") || this._find_inherit_pseudo_obj("color", pseudo, "color") || nexacro.Component._default_color;
	};

	_pComboListCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent._find_pseudo_obj("itemfont", pseudo, "font") || this._find_inherit_pseudo_obj("font", pseudo, "font") || nexacro.Component._default_font;
	};

	_pComboListCtrl._on_mousewheel = function (elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll) {
		return nexacro.Component.prototype._on_mousewheel.call(this, elem, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bScroll);
	};

	_pComboListCtrl.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		if (nexacro.isTouchInteraction) {
			if (this._is_fling_stop) {
				return;
			}

			var sel_info_list = this._selectinfo_list;

			if (this.parent._scroll_proc) {
				if (sel_info_list.length) {
					var last = sel_info_list.length - 1;
					var info = sel_info_list[last];

					if (info.index != this.parent.index) {
						info.obj._keep_selecting = false;
						info.obj._stat_change("notselect", "normal");
						sel_info_list.splice(last, 1);
					}
				}
				return;
			}
		}

		var up_obj = this._getWindow().findComponent(from_elem);
		var sel_info = this._selectinfo;

		var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);

		var down_item = sel_info.obj;
		if (down_item) {
			this._is_lbutton_up = true;
			down_item._keep_selecting = false;

			var items = this._get_contents_rows();
			var change_item;

			if (this._contains(from_elem)) {
				this.on_fire_onitemclick(this, up_obj.index, up_obj.text, up_obj.value, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

				if (nexacro._enableaccessibility) {
					if (this._accessibility_index > -1) {
						var sel_item = this._get_rowobj_byrow(this._accessibility_index);
						if (sel_info.index != this._accessibility_index && sel_item && sel_item._selected == true) {
							this._deselect_all(true);
							sel_item._stat_change("notselect", "normal");
						}
					}
				}

				change_item = up_obj;

				var change_index = change_item.index;

				if (this.multiselect) {
					if (this._shiftKey == true || this._ctrlKey == true) {
						this._select_withmouseevent(change_index);
					}
					else {
						this._do_select(change_index, false);
					}
				}
				else {
					if (this._changeIndex(change_index)) {
						this.on_apply_index();
						if (!down_item.selected) {
							down_item._stat_change("notselect", "normal");
						}
					}
					else {
						if (!down_item.selected) {
							down_item._stat_change("notselect", "normal");
						}
					}
				}
			}
			else {
				if (!down_item.selected) {
					down_item._stat_change("notselect", "normal");
				}
			}

			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
				this._is_accessibility_changeIdx = true;
			}
		}

		return ret;
	};

	_pComboListCtrl.on_fire_sys_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (this._is_fling_stop = this.parent._is_fling) {
			return;
		}

		this._downItem = this._getWindow().findComponent(touchinfos[0]._elem);

		var ret = nexacro.Component.prototype.on_fire_sys_ontouchstart.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);
		return ret;
	};

	_pComboListCtrl.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		if (this._is_fling_stop) {
			return;
		}

		var sel_info_list = this._selectinfo_list;

		if (this.parent._scroll_proc) {
			if (sel_info_list.length) {
				var last = sel_info_list.length - 1;
				var info = sel_info_list[last];

				if (info.index != this.parent.index) {
					info.obj._keep_selecting = false;
					info.obj._stat_change("notselect", "normal");
					sel_info_list.splice(last, 1);
				}
			}
			return;
		}

		var up_obj = this._getWindow().findComponent(touchinfos[0]._elem);
		var ret = nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);

		while (sel_info_list.length) {
			var down_item = sel_info_list[0].obj;
			if (down_item) {
				down_item._keep_selecting = false;

				var items = this._get_contents_rows();
				var change_item;

				if (this._contains(up_obj) && this._downItem.index == up_obj.index) {
					var evt = touchinfos[0];
					this.on_fire_onitemclick(this, up_obj.index, up_obj.text, up_obj.value, evt._current_state, this._altKey, this._ctrlKey, this._shiftKey, evt.screenX, evt.screenY, evt.canvasX, evt.canvasY, evt.clientX, evt.clientY);

					change_item = up_obj;

					var change_index = change_item.index;

					if (this.multiselect) {
						if (this._shiftKey == true || this._ctrlKey == true) {
							this._select_withmouseevent(change_index);
						}
						else {
							this._do_select(change_index, false);
						}
					}
					else {
						if (this._changeIndex(change_index)) {
							this.on_apply_index();
							if (!down_item.selected) {
								down_item._stat_change("notselect", "normal");
							}
						}
						else {
							if (!down_item.selected) {
								down_item._stat_change("notselect", "normal");
							}
						}
					}
				}
				else {
					if (!down_item.selected) {
						down_item._stat_change("notselect", "normal");
					}
				}
			}
			sel_info_list.shift();
		}

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
			this._is_accessibility_changeIdx = true;
		}
		return ret;
	};

	_pComboListCtrl.on_fire_sys_ontouchcancel = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		if (this._is_fling_stop) {
			return;
		}

		var sel_info_list = this._selectinfo_list;

		if (this.parent._scroll_proc) {
			if (sel_info_list.length) {
				var last = sel_info_list.length - 1;
				var info = sel_info_list[last];

				if (info.index != this.parent.index) {
					info.obj._keep_selecting = false;
					info.obj._stat_change("notselect", "normal");
					sel_info_list.splice(last, 1);
				}
			}
			return;
		}

		while (sel_info_list.length) {
			var down_item = sel_info_list[0].obj;
			if (down_item) {
				down_item._keep_selecting = false;


				if (!down_item.selected) {
					down_item._stat_change("notselect", "normal");
				}
			}
			sel_info_list.shift();
		}

		return;
	};

	_pComboListCtrl.on_fire_sys_ontouchcancel = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		if (this._is_fling_stop) {
			return;
		}

		var sel_info_list = this._selectinfo_list;

		if (this.parent._scroll_proc) {
			if (sel_info_list.length) {
				var last = sel_info_list.length - 1;
				var info = sel_info_list[last];

				if (info.index != this.parent.index) {
					info.obj._keep_selecting = false;
					info.obj._stat_change("notselect", "normal");
					sel_info_list.splice(last, 1);
				}
			}
			return;
		}

		while (sel_info_list.length) {
			var down_item = sel_info_list[0].obj;
			if (down_item) {
				down_item._keep_selecting = false;


				if (!down_item.selected) {
					down_item._stat_change("notselect", "normal");
				}
			}
			sel_info_list.shift();
		}

		return;
	};

	_pComboListCtrl.on_vscroll = function (obj, e) {
		if (e._evtkind == "fling" || e._evtkind == "slide") {
			if (e.pos != this.parent._start_vscroll_pos) {
				this.parent._scroll_proc = true;
			}
		}
		nexacro.ListBoxCtrl.prototype.on_vscroll.call(this, obj, e);
	};

	_pComboListCtrl.on_hscroll = function (obj, e) {
		this.parent._scroll_proc = true;
		nexacro.ListBoxCtrl.prototype.on_hscroll.call(this, obj, e);
	};

	_pComboListCtrl._is_fling_stop = false;
	_pComboListCtrl.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!nexacro.isTouchInteraction) {
			return;
		}

		if (this._is_fling_stop = this.parent._is_fling) {
			return;
		}

		var obj = elem.parent;

		while (!obj._is_component) {
			obj = obj.parent;
		}

		if (!obj) {
			return;
		}

		obj._keep_selecting = true;
		obj._stat_change("select", "selected");

		var shiftkey = this._shiftKey = shift_key;
		this._ctrlKey = ctrl_key;
		this._altKey = alt_key;
		this._selectinfo.obj = obj;
		this._selectinfo.index = obj.index;
		this._selectinfo.text = obj.text;
		this._selectinfo.value = obj.value;
		this._selectinfo_list[this._selectinfo_list.length] = this._selectinfo;

		if (!shiftkey) {
			this._shift_select_base_index = obj.index;
		}

		this._lbtnDownIdx = obj.index;
	};

	_pComboListCtrl.on_notify_item_onlbuttondown = function (obj, e) {
		if (nexacro.isTouchInteraction) {
			if (this._is_fling_stop = this.parent._is_fling) {
				return;
			}
		}

		this.parent._start_vscroll_pos = this.vscroll && this.vscroll.pos > 0 ? this.vscroll.pos : 0;
		this.parent._scroll_proc = false;

		if (!nexacro.isTouchInteraction) {
			var items = this.getSelectedItems();
			var items_len = items.length;

			for (var i = 0; i < items_len; i++) {
				var rowobj = this._get_rowobj_byrow(items[i]);
				if (rowobj) {
					rowobj.selected = false;
					rowobj._stat_change("notselect", "normal");
				}
			}
		}
		nexacro.ListBoxCtrl.prototype.on_notify_item_onlbuttondown.call(this, obj, e);
	};

	_pComboListCtrl.on_notify_item_onmouseenter = function (obj, e) {
	};

	_pComboListCtrl.on_notify_item_onmouseleave = function (obj, e) {
	};

	_pComboListCtrl._create_item = function (id, position, left, top, width, height, right, bottom, parent) {
		return new nexacro.ComboListItemCtrl(id, position, left, top, width, height, right, bottom, parent);
	};

	_pComboListCtrl._reset_item = function (rowidx) {
		var control_elem = this.getElement();

		var preidx = this.index;

		if (this._overedItem) {
			preidx = this._overedItem.index;
		}

		var currVScrollTopPos = control_elem.scroll_top == undefined ? 0 : control_elem.scroll_top;
		var vpos, nextTopPos, nextBottom;
		var itemHeight = parseInt(this.currentstyle.itemheight._value, 10);
		var rowcount = this._get_rowcount();
		var visible_end = this._get_last_visible_row(true) - 1;

		if (rowidx >= rowcount) {
			return;
		}

		nextTopPos = (rowidx < 0 ? 0 : rowidx) * itemHeight;
		nextBottom = nextTopPos + itemHeight;

		if ((preidx != rowidx) && (nextBottom >= this._client_height + currVScrollTopPos) && (this.parent._downkey == true)) {
			vpos = currVScrollTopPos + itemHeight;
		}
		else if (nextTopPos < currVScrollTopPos) {
			vpos = nextTopPos;
		}

		if (vpos >= 0) {
			this.vscrollbar.set_pos(vpos);
		}

		var items = this._get_contents_rows();
		var currobj = this._getItemByRealIdx(items, this._overeditemindex).obj;
		var nextobj = this._getItemByRealIdx(items, rowidx).obj;

		if (currobj) {
			currobj.on_apply_mouseover(false);
			this._set_overeditemindex(-1);
		}

		if (nextobj) {
			this._overedItem = nextobj;
			nextobj.on_apply_mouseover(true);
			this._set_overeditemindex(nextobj.index);
		}
	};

	_pComboListCtrl._refresh_size = function (is_contents_resize) {
		var control_elem = this.getElement();
		if (control_elem) {
			this._onResetScrollBar();

			var contents_maxwidth = this._contents_maxwidth;
			var contents_maxheight = this._contents_maxheight;
			var org_maxwidth = control_elem.container_maxwidth;
			var org_maxheight = control_elem.container_maxheight;

			contents_maxwidth = Math.max(contents_maxwidth, control_elem.client_width);
			contents_maxheight = Math.max(contents_maxheight, control_elem.client_height);

			if ((control_elem.container_maxwidth != contents_maxwidth || control_elem.container_maxheight != contents_maxheight)) {
				control_elem.setElementScrollMaxSize(contents_maxwidth, contents_maxheight);
			}

			if (is_contents_resize) {
				this._refresh_scroll();
			}
		}
	};

	_pComboListCtrl._set_overeditemindex = function (idx) {
		this._overeditemindex = idx;
		this.parent._moverindex = idx;
	};

	_pComboListCtrl._changeIndex = function (v, bIgnoreCompareIdx, change_by_script, funcname) {
		var parent = this.parent;

		if (bIgnoreCompareIdx || v != this.index || (parent.type == "search" && parent.index != v && v == this.index && !parent._keyval)) {
			var dataset = this._innerdataset;
			var postindex = parseInt(v, 10) | 0;

			var preidx = this.index;
			var pretext = this.text;
			var prevalue = this.value;

			var column = (this.codecolumn || this.datacolumn);
			if (dataset && column) {
				var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
				var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);

				var posttext = datavalue == undefined ? "" : datavalue;
				var postvalue = codevalue;

				if (change_by_script != true) {
					if (this.on_fire_canitemchange(this, preidx, pretext, prevalue, postindex, posttext, postvalue) != false) {
						this._accessibility_index = this.index = postindex;
						this.text = posttext;
						if (!this._is_value_setting) {
							this.value = postvalue;
						}
						this.applyto_bindSource("value", codevalue);
						this.on_fire_onitemchanged(this, preidx, pretext, prevalue, postindex, posttext, postvalue);
						return true;
					}
				}
				else {
					this._accessibility_index = this.index = postindex;
					this.text = posttext;
					if (!this._is_value_setting) {
						this.value = postvalue;
					}
					this.applyto_bindSource("value", codevalue);
					return true;
				}
			}
		}
		else if (parent.type == "filter" && v == this.index && !parent._keyval) {
			if (funcname == "_select_add") {
				return true;
			}

			var dataset = parent._filtereddataset ? parent._filtereddataset : parent._getFilteredDataset();
			v = parent._getRawIndex(dataset, v);

			if (v != parent.index) {
				var postindex = parseInt(this.index, 10) | 0;

				var preidx = this.index;
				var pretext = this.text;
				var prevalue = this.value;

				var column = (this.codecolumn || this.datacolumn);

				if (dataset && column) {
					var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
					var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);

					var posttext = datavalue == undefined ? "" : datavalue;
					var postvalue = codevalue;

					if (this.on_fire_canitemchange(this, preidx, pretext, prevalue, postindex, posttext, postvalue) != false) {
						this._accessibility_index = this.index = postindex;
						this.text = posttext;
						if (!this._is_value_setting) {
							this.value = postvalue;
						}
						this.applyto_bindSource("value", codevalue);

						this.on_fire_onitemchanged(this, preidx, pretext, prevalue, postindex, posttext, postvalue);
						return true;
					}
				}
			}
			else {
				var rowobj = this._get_rowobj_byrow(v);
				if (rowobj && rowobj.selected == false) {
					rowobj.set_selected(true);
				}

				if (parent._isPopupVisible() && !change_by_script) {
					if (!this.parent._scroll_proc) {
						parent.popupwindow._closePopup();
					}
				}
			}
		}
		return false;
	};

	_pComboListCtrl._setAccessibilityNotifyEvent = function (direction) {
		if (this._is_accessibility_changeIdx) {
			this._is_accessibility_changeIdx = false;
			return this.parent._setAccessibilityNotifyEvent(direction);
		}
		else {
			return nexacro.ListBox.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	delete _pComboListCtrl;
	_pComboListCtrl = null;


	nexacro.ComboListItemCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ListItemCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pComboListItemCtrl = nexacro._createPrototype(nexacro.ListItemCtrl, nexacro.ComboListItemCtrl);
	nexacro.ComboListItemCtrl.prototype = _pComboListItemCtrl;

	_pComboListItemCtrl.on_mousemove_basic_action = function () {
		if (nexacro.isTouchInteraction) {
			return;
		}

		var overobj = this.parent._overedItem;

		if (overobj && overobj != this) {
			if (overobj._apply_pushed_pseudo && overobj._is_push) {
				overobj._stat_change("notpush", "normal");
				overobj._is_pushed_area = false;
			}
			else if (!overobj._selected) {
				overobj._stat_change("", "normal");
			}
			overobj = null;
		}

		this.parent._overedItem = this;

		if (this._apply_pushed_pseudo && this._is_push) {
			this._stat_change("push", "pushed");
			this._is_pushed_area = true;
		}
		else {
			this.parent._set_overeditemindex(this.index);
			this._stat_change("", "mouseover");
		}
	};

	_pComboListItemCtrl.on_apply_mouseover = function (isovered) {
		if (this.selected) {
			return;
		}
		if (isovered) {
			this._stat_change("notselect", "mouseover");
		}
		else {
			this._stat_change("notselect", "normal");
		}
	};

	_pComboListItemCtrl.on_apply_selected = function () {
		if (this.selected) {
			this._stat_change("select", "selected");
		}
		else {
			this._stat_change("notselect", "normal");
		}
	};

	_pComboListItemCtrl._common_lbuttonup = function (changedtouchinfos, elem, canvasX, canvasY, from_elem) {
		if (changedtouchinfos) {
			var touchinfo = nexacro._getFirstTouchInfo(changedtouchinfos);

			if (touchinfo) {
				elem = touchinfo._elem;
				canvasX = touchinfo.canvasX;
				canvasY = touchinfo.canvasY;
				from_elem = elem;
				touchinfo = null;
			}
		}

		if (elem != from_elem) {
			this.parent.parent._is_real_upelem = from_elem;
		}

		return true;
	};

	_pComboListItemCtrl._on_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		this._common_lbuttonup(changedtouchinfos, null, null, null, null);
		return nexacro.Component.prototype._on_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
	};

	_pComboListItemCtrl._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		this._common_lbuttonup(null, elem, canvasX, canvasY, from_elem);
		return nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem);
	};

	delete _pComboListItemCtrl;
	_pComboListItemCtrl = null;


	nexacro.ComboEditCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.EditCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._accessibility_role = "combobox";
	};

	var _pComboEditCtrl = nexacro._createPrototype(nexacro.EditCtrl, nexacro.ComboEditCtrl);
	nexacro.ComboEditCtrl.prototype = _pComboEditCtrl;

	_pComboEditCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent.on_find_CurrentStyle_color(pseudo, this) || nexacro.Component._default_color;
	};

	_pComboEditCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_font(pseudo, this) || nexacro.Component._default_font;
	};

	_pComboEditCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent.on_find_CurrentStyle_align(pseudo, this) || nexacro.Component._default_align;
	};

	_pComboEditCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.on_find_CurrentStyle_accessibility(pseudo, this) || nexacro.Component._default_accessibility;
	};

	_pComboEditCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_background(pseudo, this);
	};

	_pComboEditCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_border(pseudo, this);
	};

	_pComboEditCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_bordertype(pseudo, this);
	};

	_pComboEditCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_gradation(pseudo, this);
	};

	_pComboEditCtrl.on_apply_custom_setfocus = function (evt_name) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (nexacro._enableaccessibility) {
				input_elem._setElementInputRole();
			}

			input_elem.setElementFocus(true);
			input_elem = null;
		}
	};

	_pComboEditCtrl.on_get_style_accessibility_label = function () {
		return "";
	};

	_pComboEditCtrl._getFromComponent = function (comp) {
		var parent = comp.parent;
		if (parent && parent._isPopupVisible()) {
			return parent;
		}
		else {
			return nexacro.Component.prototype._getFromComponent.call(this, comp);
		}
	};

	_pComboEditCtrl.set_value = function (v) {
		nexacro.Edit.prototype.set_value.call(this, v);

		this._setAccessibilityValue(this.text, false);

		if (this.parent.type == "dropdown" && this._input_element._is_focused == true) {
			this.setCaretPos(0);
		}
	};

	_pComboEditCtrl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this.parent, from_refer_comp);
	};

	delete _pComboEditCtrl;
	_pComboEditCtrl = null;


	nexacro.ComboButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pComboButtonCtrl = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.ComboButtonCtrl);
	nexacro.ComboButtonCtrl.prototype = _pComboButtonCtrl;

	_pComboButtonCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this._find_ctrl_pseudo_obj("background", pseudo, "background");
	};

	_pComboButtonCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this._find_ctrl_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pComboButtonCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this._find_ctrl_pseudo_obj("border", pseudo, "border");
	};

	_pComboButtonCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this._find_ctrl_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pComboButtonCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this._find_ctrl_pseudo_obj("align", pseudo, "align") || nexacro.Component._default_align;
	};

	_pComboButtonCtrl.on_find_CurrentStyle_margin = function (pseudo) {
		return this._find_ctrl_pseudo_obj("margin", pseudo, "margin") || nexacro.Component._default_margin;
	};

	_pComboButtonCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this._find_ctrl_pseudo_obj("cursor", pseudo, "cursor") || nexacro.Component._default_cursor;
	};

	_pComboButtonCtrl.on_find_CurrentStyle_opacity = function (pseudo) {
		return this._find_ctrl_pseudo_obj("opacity", pseudo, "opacity") || nexacro.Component._default_opacity;
	};

	_pComboButtonCtrl.on_find_CurrentStyle_shadow = function (pseudo) {
		return this._find_ctrl_pseudo_obj("shadow", pseudo, "shadow");
	};

	_pComboButtonCtrl.on_apply_custom_setfocus = function (evt_name) {
		var parent = this.parent;
		if (parent) {
			if (parent.comboedit) {
				if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
					parent.comboedit.on_apply_custom_setfocus(evt_name);
				}
				else {
					nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
				}
			}
			parent = null;
		}
	};

	_pComboButtonCtrl.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (nexacro.isTouchInteraction && nexacro.SupportTouch && !application.enabletouchevent) {
			var evt = new nexacro.EventInfo(this, "ondropdown");
			this.parent.on_notify_ondropdown(this, evt);
		}

		return this.parent.on_fire_onclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pComboButtonCtrl.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return this.parent.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this.parent, from_refer_comp);
	};

	delete _pComboButtonCtrl;
	_pComboButtonCtrl = null;


	nexacro.ComboPopupWindow = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.PopupComponent.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pPopupWindow = nexacro._createPrototype(nexacro.PopupComponent, nexacro.ComboPopupWindow);
	nexacro.ComboPopupWindow.prototype = _pPopupWindow;

	_pPopupWindow.set_visible = function (v) {
		nexacro.PopupComponent.prototype.set_visible.call(this, v);

		var parent = this.parent;
		if (!v) {
			var keyval = parent._keyval;
			var ei = parent._eventinfo;

			if (keyval === null || keyval === undefined) {
				if (parent.displaynulltext != "" && parent.value == undefined) {
					parent._setEditValue(undefined);
				}
				else {
					parent._setEditValue(parent.text);
				}
			}

			parent.on_fire_oncloseup(parent, ei.preindex, ei.pretext, ei.prevalue, ei.postindex, ei.posttext, ei.postvalue, ei.isselect);
		}
		else {
			parent._eventinfo.isselect = false;
		}
		parent = null;
	};

	_pPopupWindow._closePopup = function () {
		if (nexacro._enableaccessibility) {
			this.parent._want_arrows = false;
		}
		nexacro.PopupComponent.prototype._closePopup.call(this);
	};
	_pPopupWindow._getMainFrame = function () {
		var form = this;
		while (form && form instanceof nexacro.MainFrame) {
			form = form.parent;
		}
		return form;
	};

	_pPopupWindow._getScalePosition = function (totalw, totalh) {
		var parent = this.parent;
		var combolist = this._attached_comp;
		if (!combolist) {
			return;
		}

		var rootframe = this._getOwnerFrame();

		if (!rootframe) {
			return;
		}

		var rootwindow = rootframe._getWindow();
		rootframe = rootwindow ? rootwindow.frame : null;
		if (!rootframe) {
			return;
		}

		var scale = this._getCumulativeZoomFactor() / 100.0;
		var combo_ctrl_elem_pos = nexacro._getElementPositionInFrame(parent.getElement());
		var mainframe_ctrl_elem_pos = nexacro._getElementPositionInFrame(rootframe.getElement());
		var mainframe_ctrl_elem_screen_pos = nexacro._getElementScreenPosition(rootframe.getElement());

		var combolist_width = totalw;
		var combolist_height = totalh * scale;
		var combo_width = parent._adjust_width;
		var combo_height = parent._adjust_height * scale;
		var _left, _top, _width, _height;
		var body_width, body_height;
		var pre_height = totalh;
		var vscroll_width, text_width, max_width;

		body_width = mainframe_ctrl_elem_pos.x + rootframe._adjust_width;
		body_height = mainframe_ctrl_elem_pos.y + rootframe._adjust_height;

		var screen_avail_height = nexacro._getScreenAvailHeight();

		_left = 0;
		_top = combo_height;
		_width = combolist_width;
		_height = combolist_height;

		var below_space_height = 0;
		if (screen_avail_height > body_height && mainframe_ctrl_elem_screen_pos.y + body_height > screen_avail_height) {
			below_space_height = screen_avail_height - mainframe_ctrl_elem_screen_pos.y - (combo_ctrl_elem_pos.y + combo_height);
		}
		else {
			below_space_height = body_height - (combo_ctrl_elem_pos.y + combo_height);
		}
		var upper_space_height = combo_ctrl_elem_pos.y;

		var list_pt = list_pb = list_bt = list_bb = 0;
		var list_item_h = (parseInt(combolist.currentstyle.itemheight._value, 10)) * scale;
		if (combolist.currentstyle.padding) {
			list_pt = (parseInt(combolist.currentstyle.padding.top, 10)) * scale;
			list_pb = (parseInt(combolist.currentstyle.padding.bottom, 10)) * scale;
		}
		if (combolist.currentstyle.border) {
			list_bt = (parseInt(combolist.currentstyle.border.top_width, 10)) * scale;
			list_bb = (parseInt(combolist.currentstyle.border.bottom_width, 10)) * scale;
		}
		var list_pd_bd = list_pt + list_pb + list_bt + list_bb;
		var displayrowcount = parent.displayrowcount;
		var rowcnt = 0;
		var need_minimum_height = 0;
		var fds = parent._filtereddataset ? parent._filtereddataset : parent._getFilteredDataset();
		var ds = parent.type == "filter" ? fds : parent._innerdataset;
		if (ds) {
			rowcnt = ds.getRowCount();
		}


		if (displayrowcount == -1) {
			need_minimum_height = (rowcnt < 3 ? rowcnt : 3) * list_item_h + list_pd_bd;
			combolist_height = (rowcnt * list_item_h + list_pd_bd) * scale;

			if (below_space_height > need_minimum_height) {
				if (below_space_height > combolist_height) {
					_height = combolist_height;
				}
				else {
					_height = below_space_height;
				}
			}
			else {
				if (upper_space_height > need_minimum_height) {
					if (upper_space_height > combolist_height) {
						_top = -combolist_height;
						_height = combolist_height;
					}
					else {
						_top = -upper_space_height;
						_height = upper_space_height;
					}
				}
				else {
					if (below_space_height > upper_space_height) {
						_height = below_space_height;
					}
					else {
						_top = -upper_space_height;
						_height = upper_space_height;
					}
				}
			}
		}
		else {
			rowcnt = rowcnt > displayrowcount ? displayrowcount : rowcnt;
			need_minimum_height = rowcnt * list_item_h + list_pd_bd;
			combolist_height = (rowcnt * list_item_h + list_pd_bd) * scale;

			if (below_space_height > need_minimum_height) {
				_height = need_minimum_height;
			}
			else {
				if (upper_space_height > need_minimum_height) {
					_top = -need_minimum_height;
					_height = need_minimum_height;
				}
				else {
					if (below_space_height > upper_space_height) {
						_height = below_space_height;
					}
					else {
						_top = -upper_space_height;
						_height = upper_space_height;
					}
				}
			}
		}



		text_width = this.parent._getMaxTextSize(this.parent._innerdataset);

		if (combolist.vscrollbar) {
			vscroll_width = combolist.vscrollbar.width;
			max_width = text_width + vscroll_width;

			if ((combo_width < max_width) && (_height < pre_height)) {
				_width += vscroll_width;
			}
		}

		if (combo_ctrl_elem_pos.x < mainframe_ctrl_elem_pos.x) {
			var gap = mainframe_ctrl_elem_pos.x - combo_ctrl_elem_pos.x;
			_left += gap;
		}
		else if (combo_ctrl_elem_pos.x + combolist_width > mainframe_ctrl_elem_pos.x + body_width) {
			var gap = (combo_ctrl_elem_pos.x + combolist_width) - (mainframe_ctrl_elem_pos.x + body_width);
			_left -= gap;

			if (combolist.vscrollbar) {
				_left -= vscroll_width;
			}

			if (_left < (mainframe_ctrl_elem_pos.x - combo_ctrl_elem_pos.x)) {
				_left = mainframe_ctrl_elem_pos.x - combo_ctrl_elem_pos.x;
			}
		}

		return {
			left : _left, 
			top : _top, 
			width : _width, 
			height : _height, 
			scale : scale
		};
	};
	_pPopupWindow._popupAuto = function (totalw, totalh) {
		var jsonval = this._getScalePosition(totalw, totalh);
		var scale = jsonval.scale, left = jsonval.left, top = jsonval.top, width = jsonval.width, height = jsonval.height;

		var elem = this.getElement();
		if (elem.setZoom) {
			elem.setZoom(scale * 100);
		}
		else if (nexacro.ScrollableContainerElement.prototype.setZoom) {
			nexacro.ScrollableContainerElement.prototype.setZoom.call(elem, scale * 100);
		}

		this._popupBy(this.parent, left, top, width, (height / scale));
	};

	_pPopupWindow._popupCenterAuto = function (totalw, totalh) {
		var jsonval = this._getScalePosition(totalw, totalh);
		var scale = jsonval.scale, left = jsonval.left, top = jsonval.top, width = jsonval.width, height = jsonval.height;

		var elem = this.getElement();
		if (elem.setZoom) {
			elem.setZoom(scale * 100);
		}
		else if (nexacro.ScrollableContainerElement.prototype.setZoom) {
			nexacro.ScrollableContainerElement.prototype.setZoom.call(elem, scale * 100);
		}

		var rootframe = this._getOwnerFrame();

		if (!rootframe) {
			return;
		}

		var rootwindow = rootframe._getWindow();
		rootframe = rootwindow ? rootwindow.frame : null;

		var pos = nexacro._getElementPositionInFrame(rootframe.getElement());
		var l = ((rootframe.width / 2) - (width / 2));
		var t = ((rootframe.height / 2) - (height / 2));

		t = t < 0 ? 0 : t;

		this._popupBy(rootframe, (l / scale), t, width, (height / scale));
	};

	delete _pPopupWindow;
	_pPopupWindow = null;


	nexacro.ComboCtrl = function (id, absolute, left, top, width, height, right, bottom, parent) {
		nexacro.Combo.call(this, id, absolute, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pComboCtrl = nexacro.ComboCtrl.prototype = nexacro._createPrototype(nexacro.Combo, nexacro.ComboCtrl);
	_pComboCtrl._type_name = "ComboControl";

	nexacro._setForControlStyleFinder(_pComboCtrl);

	_pComboCtrl.on_created_contents = function () {
		nexacro.Combo.prototype.on_created_contents.call(this);

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			this._control_element.setElementAccessibilityHidden(true);
		}
	};

	delete _pComboCtrl;
	_pComboCtrl = null;
}
;
