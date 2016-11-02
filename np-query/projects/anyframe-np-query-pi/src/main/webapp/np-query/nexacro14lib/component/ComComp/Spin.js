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


if (!nexacro.Spin) {
	nexacro.SpinEventInfo = function (obj, id, beforeText, beforeValue, afterText, afterValue, isUp) {
		this.id = this.eventid = id || "onspin";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = beforeText;
		this.prevalue = beforeValue;
		this.posttext = afterText;
		this.postvalue = afterValue;
		this.up = isUp;
	};

	var _pSpinEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SpinEventInfo);
	nexacro.SpinEventInfo.prototype = _pSpinEventInfo;
	_pSpinEventInfo._type_name = "SpinEventInfo";

	delete _pSpinEventInfo;
	_pSpinEventInfo = null;

	nexacro.Spin_Style = function (target, idx) {
		nexacro.Style.call(this);

		if (target) {
			this._target = target;
		}

		this.buttonalign = null;
		this.buttonsize = null;
		this.accessibility = null;
		this.displaynulltextcolor = null;
	};

	var _pSpinStyle = nexacro._createPrototype(nexacro.Style, nexacro.Spin_Style);
	nexacro.Spin_Style.prototype = _pSpinStyle;

	eval(nexacro._createAlignAttributeEvalStr("_pSpinStyle", "buttonalign"));
	eval(nexacro._createValueAttributeEvalStr("_pSpinStyle", "buttonsize"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pSpinStyle", "accessibility"));
	eval(nexacro._createColorAttributeEvalStr("_pSpinStyle", "displaynulltextcolor"));

	_pSpinStyle.__custom_emptyObject = function () {
		this.buttonalign = null;
		this.buttonsize = null;
		this.displaynulltextcolor = null;
	};

	_pSpinStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.buttonalign && !this.buttonalign._is_empty) {
			val += "buttonalign:" + this.buttonalign._value + "; ";
		}
		if (this.buttonsize && !this.buttonsize._is_empty) {
			val += "buttonsize:" + this.buttonsize._value + "; ";
		}
		if (this.accessibility && !this.accessibility._is_empty) {
			val += "accessibility:" + this.accessibility._value + "; ";
		}
		if (this.displaynulltextcolor && !this.displaynulltextcolor._is_empty) {
			val += "displaynulltextcolor" + this.displaynulltextcolor._value + "; ";
		}
		return val;
	};

	nexacro.Spin_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.buttonalign = null;
		this.buttonsize = null;
		this.accessibility = null;
		this.displaynulltextcolor = null;
	};

	var _pSpinCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Spin_CurrentStyle);
	nexacro.Spin_CurrentStyle.prototype = _pSpinCurrentStyle;

	_pSpinCurrentStyle.__get_custuom_style_value = _pSpinStyle.__get_custuom_style_value;
	_pSpinCurrentStyle.__custom_emptyObject = _pSpinStyle.__custom_emptyObject;

	delete _pSpinStyle;
	delete _pSpinCurrentStyle;

	_pSpinStyle = null;
	_pSpinCurrentStyle = null;

	nexacro.Spin = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.spinupbutton = null;
		this.spindownbutton = null;
		this.spinedit = null;

		this.type = 0;
		this.enable = true;
		this.value = undefined;
		this.text = "";
		this.readonly = false;
		this.displaynulltext = "";
		this.increment = 1;
		this.max = 10000;
		this.min = 0;
		this.displaymask = "9,999.9999999";
		this.circulation = false;
		this.displaycomma = false;
		this.textchangebindflag = false;
		this.usecontextmenu = true;

		this._old_value = undefined;
		this._accessibility_role = "spin";
		this._want_arrow = false;
		this._has_inputElement = true;
		this.locale = "";

		this._event_list = {
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkeypress" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
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
			"onmove" : 1, 
			"onsize" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onchanged" : 1, 
			"onspin" : 1, 
			"canchange" : 1, 
			"oneditclick" : 1, 
			"ontextchange" : 1, 
			"ontextchanged" : 1, 
			"cancharchange" : 1, 
			"onchar" : 1, 
			"oncontextmenu" : 1, 
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
	};

	var _pSpin = nexacro._createPrototype(nexacro.Component, nexacro.Spin);
	nexacro.Spin.prototype = _pSpin;

	nexacro.Spin._default_buttonalign = nexacro._getCachedStyleObj("buttonalign", "right");
	nexacro.Spin._default_buttonsize = nexacro._getCachedStyleObj("buttonsize", "-1");

	_pSpin._type_name = "Spin";

	_pSpin.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var align = this.on_find_CurrentStyle_align(pseudo);

		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}
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
		var buttonalign = this.on_find_CurrentStyle_buttonalign(pseudo);
		if (curstyle.buttonalign != buttonalign) {
			curstyle.buttonalign = buttonalign;
			this.on_apply_style_buttonalign(buttonalign);
		}
		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);
		if (curstyle.buttonsize != buttonsize) {
			curstyle.buttonsize = buttonsize;
			this.on_apply_style_buttonsize(buttonsize);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}

		var displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(pseudo);
		if (displaynulltextcolor != curstyle.displaynulltextcolor) {
			curstyle.displaynulltextcolor = displaynulltextcolor;
			this.on_apply_style_displaynulltextcolor(displaynulltextcolor);
		}
	};

	_pSpin.on_create_custom_style = function () {
		return new nexacro.Spin_Style(this);
	};

	_pSpin.on_create_custom_currentStyle = function () {
		return new nexacro.Spin_CurrentStyle(this);
	};

	_pSpin.on_find_CurrentStyle_buttonalign = function (pseudo) {
		var align = this._find_pseudo_obj("buttonalign", pseudo, "align");
		return (align) ? align : nexacro.Spin._default_buttonalign;
	};

	_pSpin.on_find_CurrentStyle_buttonsize = function (pseudo) {
		var size = this._find_pseudo_obj("buttonsize", pseudo);
		return (size) ? size : nexacro.Spin._default_buttonsize;
	};

	_pSpin.on_find_CurrentStyle_displaynulltextcolor = function (pseudo) {
		var displaynulltextcolor = this._find_pseudo_obj("displaynulltextcolor", pseudo, "color");
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_pseudo_obj("color", pseudo, "color");
		}
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_inherit_pseudo_obj("color", pseudo, "color");
		}

		return (displaynulltextcolor) ? displaynulltextcolor : nexacro.Component._default_color;
	};

	_pSpin.on_update_style_buttonsize = function () {
		var buttonsize = this.currentstyle.buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);
		this.on_apply_style_buttonsize();
	};

	_pSpin.on_update_style_buttonalign = function () {
		var buttonalign = this.currentstyle.buttonalign = this.on_find_CurrentStyle_buttonalign(this._pseudo);
		this.on_apply_style_buttonalign();
	};

	_pSpin.on_update_style_displaynulltextcolor = function () {
		var displaynulltextcolor = this.currentstyle.displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(this._pseudo);
		this.on_apply_style_displaynulltextcolor(displaynulltextcolor);
	};

	_pSpin.on_apply_style_align = function (align) {
		if (!align) {
			align = this.on_find_CurrentStyle_align(this._pseudo);
		}
		if (this.spinedit) {
			this.spinedit.style.set_align(align._value);
		}
	};

	_pSpin.on_apply_style_color = function (color) {
		if (this.spinedit) {
			this.spinedit.on_apply_style_color(color);
		}
	};

	_pSpin.on_apply_style_font = function (font) {
		if (this.spinedit) {
			this.spinedit.on_apply_style_font(font);
		}
	};

	_pSpin.on_apply_style_buttonsize = function () {
		this._recalcLayout();
	};

	_pSpin.on_apply_style_buttonalign = function () {
		this._recalcLayout();
	};

	_pSpin.on_apply_style_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_style_accessibility.call(this, accessibility);
		if (this.spinedit) {
			this.spinedit.on_apply_style_accessibility(accessibility);
		}
	};

	_pSpin.on_apply_style_rtlimagemirroring = function (rtlimagemirroring) {
		nexacro.Component.prototype.on_apply_style_rtlimagemirroring.call(this, rtlimagemirroring);
	};

	_pSpin.on_apply_style_letterspace = function (letterspace) {
		if (this.spinedit) {
			this.spinedit.on_apply_style_letterspace(letterspace);
		}
	};

	_pSpin.on_apply_style_displaynulltextcolor = function (displaynulltextcolor) {
		if (this.spinedit) {
			this.spinedit.on_apply_style_displaynulltextcolor(displaynulltextcolor);
		}
	};

	_pSpin.on_create_contents = function () {
		if (this._control_element) {
			this.spinupbutton = new nexacro.SpinButtonCtrl("spinupbutton", "absolute", 0, 0, 0, 0, null, null, this);
			this.spindownbutton = new nexacro.SpinButtonCtrl("spindownbutton", "absolute", 0, 0, 0, 0, null, null, this);
			var spinedit = this.spinedit = new nexacro.SpinEditCtrl("spinedit", "absolute", 0, 0, 0, 0, null, null, this);

			this.spinedit.createComponent();
			this.spinupbutton.createComponent();
			this.spindownbutton.createComponent();
		}
	};

	_pSpin.on_created_contents = function () {
		this.on_apply_readonly();
		this.on_apply_circulation();
		this.on_apply_displaycomma();
		this.on_apply_displaynulltext();
		this.on_apply_type();
		this.on_apply_usecontextmenu();
		this.on_apply_style_displaynulltextcolor(this.currentstyle.displaynulltextcolor);

		this.spinupbutton._setEventHandler("onclick", this.on_notify_spinupbutton_click, this);
		this.spindownbutton._setEventHandler("onclick", this.on_notify_spindownbutton_click, this);

		this.spinedit._setEventHandler("ontextchange", this.on_notify_spin_textchange, this);
		this.spinedit._setEventHandler("ontextchanged", this.on_notify_spin_textchanged, this);
		this.spinedit._setEventHandler("cancharchange", this.on_notify_spin_cancharchange, this);
		this.spinedit._setEventHandler("onchar", this.on_notify_spin_char, this);
		this.spinedit._setEventHandler("oneditclick", this.on_notify_spin_editclick, this);
		this.spinedit._setEventHandler("onkeydown", this.on_notify_spin_keydown, this);

		this.spinupbutton.on_created();
		this.spindownbutton.on_created();
		this.spinedit.on_created();
		this.on_apply_style_letterspace(this.currentstyle.letterspace);

		this._setAccessibilityInfoValueMax(this.max);
		this._setAccessibilityInfoValueMin(this.min);
		this._setAccessibilityInfoValueCur(this.value);

		this._setAccessibilityActiveDescendant(this.spinedit);
		this.on_apply_prop_rtldirection();
		this._old_value = this.value;
	};

	_pSpin.on_destroy_contents = function () {
		if (this.spinupbutton) {
			this.spinupbutton.destroy();
			this.spinupbutton = null;
		}

		if (this.spindownbutton) {
			this.spindownbutton.destroy();
			this.spindownbutton = null;
		}

		if (this.spinedit) {
			this.spinedit.destroy();
			this.spinedit = null;
		}
	};

	_pSpin.on_change_containerRect = function () {
		this._recalcLayout();
	};

	_pSpin.on_apply_prop_enable = function (v) {
		this._updateButton();
	};

	_pSpin.on_apply_custom_setfocus = function (evt_name) {
		if (this.spinedit && this.spinedit.enable == true) {
			this.spinedit.on_apply_custom_setfocus(evt_name);
		}
	};

	_pSpin.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			this._setValue(undefined);
			return true;
		}
	};

	_pSpin.on_change_bindSource = function (propid, ds, row, col, index) {
		if (propid == "value") {
			var ds_val = ds.getColumn(row, col);

			var v = parseFloat(ds_val);

			if (isNaN(v)) {
				v = ds_val;
			}
			else if (this.min > v || this.max < v) {
				v = (this.min > v) ? this.min : this.max;
				var ret = this.applyto_bindSource("value", v);
				if (ret == false) {
					return false;
				}
			}

			this._setValue(v);
			return true;
		}
		return false;
	};

	_pSpin.on_getBindableProperties = function () {
		return "value";
	};

	_pSpin.on_get_style_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pSpin._on_getAccessibilityAdditionalLabel = function () {
		var label = "";
		if (this.spinedit && this.spinedit._edit_base_api) {
			label = this.spinedit._edit_base_api._on_getAccessibilityAdditionalLabel();
		}
		return label + " " + this.min + " " + this.max;
	};

	_pSpin._getAccessibilityReadLabel = function (bwholeread) {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (bwholeread && this.spinedit._input_element && this._status != "focus") {
			if (!this.spinedit._input_element._wantAccessibilityAdditionalLabel
				 || !this.spinedit._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}
		return _readlabel;
	};

	_pSpin._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_arrow = this._want_arrow;
		this._want_arrow = false;
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pSpin.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;
		var spinedit = this.spinedit;
		var upbutton = this.spinupbutton;
		var downbutton = this.spindownbutton;

		if (spinedit) {
			spinedit._setRtlDirection(_rtldirection);
		}
		if (upbutton) {
			upbutton._setRtlDirection(_rtldirection);
		}
		if (downbutton) {
			downbutton._setRtlDirection(_rtldirection);
		}
	};

	_pSpin.set_type = function (v) {
		this.type = v;
		this.on_apply_type();
	};

	_pSpin.on_apply_type = function () {
		if (this.spinedit) {
			switch (this.type) {
				case "spinonly":
					this.spinedit.set_visible(false);
					break;
				case "noneditable":
					this.spinedit.set_visible(true);
					this.spinedit.set_readonly(true);
					break;
				case "normal":
				default:
					this.spinedit.set_visible(true);
					this.spinedit.set_readonly(this.readonly);
					break;
			}
		}
		this._recalcLayout();
	};

	_pSpin.set_value = function (v) {
		if (v === null || v === undefined) {
			this._setValue(v);
		}
		else {
			v = parseFloat(v, 10);
			if (isNaN(v)) {
				return;
			}
			else if (this.min > v) {
				v = this.min;
			}
			else if (this.max < v) {
				v = this.max;
			}

			var ret = this.applyto_bindSource("value", v);
			if (ret == false) {
				return;
			}
			this._setValue(v);
		}
	};

	_pSpin._setValue = function (v) {
		this._old_value = this.value = v;

		this.text = nexacro._toString(v);

		this._updateToText();

		this.on_apply_value();
		this._updateButton();
	};

	_pSpin.on_apply_value = function () {
		if (this.spinedit) {
			if (this.value === null || this.value === undefined) {
				this.spinedit.set_value(undefined);
			}
			else {
				this.spinedit.set_value(this.value);
			}
			this.text = this.spinedit.text;
		}
	};


	_pSpin.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pSpin.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		if (this.spinedit) {
			if (this.type != "noneditable") {
				this.spinedit.set_readonly(v);
			}
		}
	};

	_pSpin.set_displaynulltext = function (v) {
		this.displaynulltext = v.toString();
		this.on_apply_displaynulltext();
	};

	_pSpin.on_apply_displaynulltext = function () {
		if (this.spinedit && this.displaynulltext) {
			this.spinedit.set_displaynulltext(this.displaynulltext);
		}
	};

	_pSpin.set_increment = function (v) {
		var increment = parseFloat(v, 10);
		if (isNaN(increment)) {
			return;
		}
		else {
			this.increment = increment;
		}

		this.on_apply_increment();
	};

	_pSpin.on_apply_increment = function () {
		this._updateButton();
	};

	_pSpin.set_max = function (v) {
		var max = parseFloat(v, 10);
		if (isNaN(max)) {
			return;
		}
		else {
			this.max = max;
			this._setAccessibilityInfoValueMax(max);
		}
		this.on_apply_max();
	};

	_pSpin.on_apply_max = function () {
		if (this.value > this.max) {
			this.value = this.max;
		}

		if (this.max < this.min) {
			this.min = this.max;
		}

		this._updateToText();
	};

	_pSpin.set_min = function (v) {
		var min = parseFloat(v, 10);
		if (isNaN(min)) {
			return;
		}
		else {
			this.min = min;
			this._setAccessibilityInfoValueMin(min);
		}
		this.on_apply_min();
	};

	_pSpin.on_apply_min = function () {
		if (this.value < this.min) {
			this.value = this.min;
		}

		if (this.max < this.min) {
			this.max = this.min;
		}

		this._updateToText();
	};

	_pSpin.set_displaycomma = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.displaycomma) {
			this.displaycomma = v;
			this.on_apply_displaycomma();
		}
	};

	_pSpin.on_apply_displaycomma = function () {
		if (this.spinedit) {
			if (this.displaycomma) {
				this.spinedit.set_mask(this.displaymask);
			}
			else {
				this.spinedit.set_mask("");
			}
		}
		this._updateToText();
	};


	_pSpin.set_circulation = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.circulation) {
			this.circulation = v;
			this.on_apply_circulation();
		}
	};

	_pSpin.on_apply_circulation = function () {
		this._updateButton();
	};

	_pSpin.set_text = function (v) {
	};

	_pSpin.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);

		if (v != this.usecontextmenu) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu();
		}
	};

	_pSpin.on_apply_usecontextmenu = function () {
		var spinedit = this.spinedit;
		if (spinedit) {
			spinedit.set_usecontextmenu(this.usecontextmenu);
		}
	};

	_pSpin.set_locale = function (v) {
		if (v != this.locale) {
			this.locale = v;
			if (this._locale != v) {
				this._locale = v;
				this.on_apply_locale();
			}
		}
	};

	_pSpin.on_apply_locale = function () {
		var edit = this.spinedit;
		if (edit) {
			edit._setLocale(this._locale);
		}
	};

	_pSpin.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		return this.spinedit.getCaretPos();
	};

	_pSpin.getSelect = function () {
		return this.spinedit.getSelect();
	};

	_pSpin.getSelectedText = function () {
		return this.spinedit.getSelectedText();
	};

	_pSpin.setCaretPos = function (v) {
		return this.spinedit.setCaretPos(v);
	};

	_pSpin.setSelect = function (startIndex, endIndex) {
		this.spinedit.setSelect(startIndex, endIndex);
	};

	_pSpin.setSelectedText = function (v) {
		this.spinedit.setSelectedText(v);
	};

	_pSpin.setRange = function (min, max) {
		this.set_min(min);
		this.set_max(max);

		if (this.min > this.max) {
			var swap = this.min;
			this.min = this.max;
			this.max = swap;
		}
	};

	_pSpin.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pSpin.on_notify_spin_down = function (obj, e) {
		if (!this.readonly) {
			var bcheck = true;
			this.textchangebindflag = true;
			var value = parseFloat(this.value, 10);

			if (value == undefined || value == null || isNaN(value)) {
				value = 0;
			}

			var preValue = value;
			var decvalue = this._calcValue(value, this.increment, "-");

			if (this.circulation) {
				if (this.increment >= 0) {
					value = (decvalue < this.min) ? this.max : decvalue;
				}
				else {
					value = (decvalue > this.max) ? this.min : decvalue;
				}
			}
			else {
				value = (decvalue < this.min) ? this.min : (decvalue > this.max) ? this.max : decvalue;
			}

			var strPreText = preValue.toString();
			var postValue = this.value = value;
			var strPostText = value.toString();

			bcheck = this.on_fire_onspin(this, strPreText, preValue, strPostText, postValue, false);
			this.spinedit.on_fire_ontextchanged(this, preValue, postValue);

			if (bcheck || bcheck === undefined) {
				this.value = postValue;
			}
			else {
				this.value = preValue;
			}
			this._on_focus(true);
			this._updateToText();
		}
	};

	_pSpin.on_notify_spin_up = function (obj, e) {
		if (!this.readonly) {
			var bcheck = true;
			this.textchangebindflag = true;
			var value = parseFloat(this.value, 10);

			if (value == undefined || value == null || isNaN(value)) {
				value = 0;
			}

			var preValue = value;
			var incvalue = this._calcValue(value, this.increment, "+");

			if (this.circulation) {
				if (this.increment >= 0) {
					value = (incvalue > this.max) ? this.min : incvalue;
				}
				else {
					value = (incvalue < this.min) ? this.max : incvalue;
				}
			}
			else {
				value = (incvalue > this.max) ? this.max : (incvalue < this.min) ? this.min : incvalue;
			}

			var strPreText = preValue.toString();
			var postValue = this.value = value;
			var strPostText = value.toString();

			bcheck = this.on_fire_onspin(this, strPreText, preValue, strPostText, postValue, true);
			this.spinedit.on_fire_ontextchanged(this, preValue, postValue);

			if (bcheck || bcheck === undefined) {
				this.value = postValue;
			}
			else {
				this.value = preValue;
			}

			this._on_focus(true);
			this._updateToText();
		}
	};

	_pSpin.on_notify_spin_textchange = function (obj, e) {
		if (obj.parent == this) {
			this._setFocus(false);
		}
		var ret = this.on_fire_ontextchange(obj, e);

		var val;
		if (this.displaycomma) {
			val = this._commaStrToStr(e.posttext);
		}
		else {
			val = e.posttext;
		}

		if (ret) {
			this.textchangebindflag = true;
			if (isNaN(parseFloat(val, 10))) {
				this.value = this.min;
			}
			else {
				this.value = val;
			}

			this._updateToText(true);
		}
		return ret;
	};

	_pSpin.on_notify_spin_editclick = function (obj, e) {
		this.on_fire_oneditclick(obj, e.caretpos, e.button, e.altKey, e.ctrlKey, e.shiftKey, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, e.fromobject, e.fromreferenceobject);
	};

	_pSpin.on_notify_spin_textchanged = function (obj, e) {
		return this.on_fire_ontextchanged(obj, e);
	};

	_pSpin.on_notify_spin_char = function (obj, e) {
		return this.on_fire_onchar(obj, e);
	};

	_pSpin.on_notify_spin_cancharchange = function (obj, e) {
		return this.on_fire_cancharchange(obj, e);
	};

	_pSpin.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		this._want_arrow = true;
		nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pSpin.on_notify_spin_keydown = function (obj, e) {
		switch (e.keycode) {
			case nexacro.Event.KEY_UP:
				if (!nexacro._enableaccessibility || e.ctrlKey) {
					this.on_notify_spin_up();
				}
				break;
			case nexacro.Event.KEY_DOWN:
				if (!nexacro._enableaccessibility || e.ctrlKey) {
					this.on_notify_spin_down();
				}
				break;
			case nexacro.Event.KEY_ENTER:
				this.textchangebindflag = true;
				this._valuechange();
				break;
		}
		return true;
	};

	_pSpin.on_notify_spinupbutton_click = function (obj, e) {
		this.on_notify_spin_up(obj, e);
	};

	_pSpin.on_notify_spindownbutton_click = function (obj, e) {
		this.on_notify_spin_down(obj, e);
	};

	_pSpin.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.visible && this._isEnable() && this.enableevent) {
			if (this.oneditclick && this.oneditclick._has_handlers) {
				var evt = new nexacro.EditClickEventInfo(this, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, from_refer_comp);
				return this.oneditclick._fireEvent(this, evt);
			}
		}
		return false;
	};

	_pSpin.on_fire_ontextchange = function (obj, e) {
		if (this.ontextchange && this.ontextchange._has_handlers) {
			var evt = new nexacro.TextChangeEventInfo(this, "ontextchange", e.chartext, e.pretext, e.posttext, "", "");
			return this.ontextchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_ontextchanged = function (obj, e) {
		if (this.ontextchanged && this.ontextchanged._has_handlers) {
			var evt = new nexacro.TextChangedEventInfo(this, "ontextchanged", e.pretext, e.posttext);
			return this.ontextchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_onchar = function (obj, e) {
		if (this.onchar && this.onchar._has_handlers) {
			var evt = new nexacro.TextChangeEventInfo(this, "onchar", e.chartext, e.pretext, e.posttext);
			return this.onchar._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_cancharchange = function (obj, e) {
		if (this.cancharchange && this.cancharchange._has_handlers) {
			var evt = new nexacro.CanCharEventInfo(obj, "cancharchange", e.chartext, e.pretext, e.posttext);
			return this.cancharchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(this, "canchange", pretext, prevalue, posttext, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_onchanged = function (obj, preText, preValue, postText, postValue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", preText, preValue, postText, postValue);
			return this.onchanged._fireEvent(this, evt);
		}
		return true;
	};

	_pSpin.on_fire_onsetfocus = function (obj, oldobj) {
		this.on_apply_custom_setfocus();

		if (this.onsetfocus && this.onsetfocus._has_handlers) {
			var evt = new nexacro.SetFocusEventInfo(this, "", obj, oldobj);
			return this.onsetfocus._fireEvent(this, evt);
		}
		return false;
	};


	_pSpin.on_fire_onspin = function (obj, preText, preValue, postText, postValue, isUp) {
		if (this.onspin && this.onspin._has_handlers) {
			var evt = new nexacro.SpinEventInfo(obj, "onspin", preText, preValue, postText, postValue, isUp);
			return this.onspin._fireEvent(this, evt);
		}
		return true;
	};

	_pSpin._on_killfocus = function (obj, fromObj) {
		var win = this._getWindow();
		if (win && win._is_active_window != true && !obj) {
			return;
		}
		this._valuechange();

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
			if (this.spinedit) {
				this.spinedit._is_focusing = false;
			}
		}
	};

	_pSpin._recalcLayout = function () {
		if (this._control_element && this.spinupbutton && this.spindownbutton && this.spinedit) {
			var cw = this._client_width, ch = this._client_height;
			var l = 0, r = 0, t = 0, b = 0;
			var w = 0;
			h = 0;

			var up_top_margin = 0, up_left_margin = 0, up_right_margin = 0, up_bottom_margin = 0;
			var down_top_margin = 0, down_left_margin = 0, down_right_margin = 0, down_bottom_margin = 0;
			var edit_top_margin = 0, edit_left_margin = 0, edit_right_margin = 0, edit_bottom_margin = 0;

			var upmargin = this.spinupbutton.on_find_CurrentStyle_margin();
			;
			if (upmargin) {
				up_top_margin = upmargin.top;
				up_left_margin = upmargin.left;
				up_bottom_margin = upmargin.bottom;
				up_right_margin = upmargin.right;
			}

			var downmargin = this.spindownbutton.on_find_CurrentStyle_margin();
			if (downmargin) {
				down_top_margin = downmargin.top;
				down_left_margin = downmargin.left;
				down_bottom_margin = downmargin.bottom;
				down_right_margin = downmargin.right;
			}

			var editmargin = this.spinedit.on_find_CurrentStyle_margin();
			if (editmargin) {
				edit_top_margin = editmargin.top;
				edit_left_margin = editmargin.left;
				edit_bottom_margin = editmargin.bottom;
				edit_right_margin = editmargin.right;
			}

			var button_size_x = 0;
			var button_size_y = ch;

			if (this.type == "spinonly") {
				button_size_x = cw;
			}
			else {
				button_size_x = button_size_y;
			}

			var curstylebtnsize = this.on_find_CurrentStyle_buttonsize();
			if (curstylebtnsize) {
				curstylebtnsize = parseInt(curstylebtnsize) | 0;
				if (curstylebtnsize > -1) {
					button_size_x = curstylebtnsize;
				}
				else {
					button_size_x = 0;
				}
			}

			var curbuttonalign = this.on_find_CurrentStyle_buttonalign();

			if (curbuttonalign.halign != "left") {
				l = cw - button_size_x;
				t = up_top_margin;
				w = button_size_x - up_right_margin;
				h = button_size_y / 2 - 1;

				this.spinupbutton.move(l, t, w, h, null, null);

				w = button_size_x - down_right_margin;
				t = t + h + down_top_margin + 1;
				h = button_size_y / 2 - 1 - down_bottom_margin;

				this.spindownbutton.move(l, t, w, h, null, null);

				if (this.type != "spinonly") {
					l = edit_left_margin;
					t = edit_top_margin;
					w = cw - button_size_x - edit_right_margin - up_left_margin;
					h = ch - down_bottom_margin;

					this.spinedit.move(l, t, w, h, r, b);
				}
			}
			else {
				l = up_left_margin;
				t = up_top_margin;
				w = button_size_x - up_right_margin;
				h = button_size_y / 2 - 1;

				this.spinupbutton.move(l, t, w, h, null, null);

				w = button_size_x - down_right_margin;
				t = t + h + up_bottom_margin + down_top_margin + 1;
				h = button_size_y / 2 - 1 - down_bottom_margin;

				this.spindownbutton.move(l, t, w, h, null, null);

				if (this.type != "spinonly") {
					l = l + button_size_x + edit_left_margin;
					t = edit_top_margin;
					w = cw - button_size_x - edit_right_margin;
					h = ch - edit_bottom_margin;

					this.spinedit.move(l, t, w, h, null, null);
				}
			}
		}
	};

	_pSpin._updateButton = function () {
		if (this._control_element) {
			var upbutton = this.spinupbutton;
			var downbutton = this.spindownbutton;
			var edit = this.spinedit;
			var val = this.value;

			if (!this._isEnable()) {
				upbutton._setEnable(false);
				downbutton._setEnable(false);
				edit._setEnable(false);
			}
			else {
				edit._setEnable(true);

				if (!this.circulation) {
					if (val == null || val == undefined) {
						downbutton._setEnable(false);
						upbutton._setEnable(true);
						return;
					}

					if (this.increment >= 0) {
						if (this.max > val) {
							upbutton._setEnable(true);
						}
						else {
							upbutton._setEnable(false);
						}

						if (this.min < val) {
							downbutton._setEnable(true);
						}
						else {
							downbutton._setEnable(false);
						}
					}
					else {
						if (this.max > val) {
							downbutton._setEnable(true);
						}
						else {
							downbutton._setEnable(false);
						}

						if (this.min < val) {
							upbutton._setEnable(true);
						}
						else {
							upbutton._setEnable(false);
						}
					}
				}
				else {
					upbutton._setEnable(true);
					downbutton._setEnable(true);
				}
			}
		}
	};

	_pSpin._updateToText = function (skip_setvalue) {
		var v = this.value;
		if (v === null || v === undefined) {
			this.value = undefined;
			this.text = "";
		}
		else if (v.date || v.time || v.blob || v.datetime) {
			v = undefined;
			this.text = "";
		}
		else {
			v = this._commaStrToStr(this.value);
		}
		if (this.spinedit) {
			if (!skip_setvalue) {
				this.spinedit.set_value(v);
				this.text = this.spinedit.text;
			}
			this._setAccessibilityInfoValueCur(v);
		}
		this._updateButton();
	};

	_pSpin._commaStrToStr = function (v) {
		var strComma = nexacro._toString(v);

		if (v == undefined) {
			strComma = "";
		}
		return strComma.replace(/","/g, "");
	};

	_pSpin._valuechange = function () {
		if (!this._is_alive) {
			return;
		}

		var val = this.value;
		if (val <= this.max && val >= this.min) {
			this.value = val;
		}
		else if (val > this.max) {
			this.value = this.max;
		}
		else if (val < this.min) {
			this.value = this.min;
		}
		else {
			this.value = undefined;
		}

		var postValue = this.value;
		var strPostText = nexacro._toString(this.value);

		var preValue = this._old_value;
		var strPreText = nexacro._toString(this._old_value);

		var ret = this.on_fire_canchange(this, strPreText, preValue, strPostText, postValue);
		if (ret === false) {
			this.value = this._old_value;
			this._updateToText();
		}
		else {
			this._setValue(this.value);

			if (this.textchangebindflag) {
				this.applyto_bindSource("value", this.value);
				this.textchangebindflag = false;
			}

			if (preValue != postValue) {
				this.on_fire_onchanged(this, strPreText, preValue, strPostText, postValue);
			}
		}
	};

	_pSpin._calcValue = function (val, inc, sign) {
		var addConst = 1;
		var strVal = val.toString();
		var strInc = inc.toString();
		var bPointVal = strVal.indexOf(".");
		var bPointInc = strInc.indexOf(".");

		if (bPointVal > -1 || bPointInc > -1) {
			var decVal = bPointVal > -1 ? strVal.substring(bPointVal + 1, strVal.length) : "";
			var decInc = bPointInc > -1 ? strInc.substring(bPointInc + 1, strInc.length) : "";
			var maxLength = decVal.length >= decInc.length ? decVal.length : decInc.length;
			addConst = Math.pow(10, maxLength);

			val = Math.round(val * addConst);
			inc = Math.round(inc * addConst);
		}

		if (sign == "+") {
			return (val + inc) / addConst;
		}
		else {
			return (val - inc) / addConst;
		}
	};

	delete _pSpin;
	_pSpin = null;

	nexacro.SpinButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pSpinButtonCtrl = nexacro.SpinButtonCtrl.prototype = nexacro._createPrototype(nexacro.ImageButtonCtrl, nexacro.SpinButtonCtrl);

	_pSpinButtonCtrl.on_apply_custom_setfocus = function (evt_name) {
		var parent = this.parent;
		if (parent) {
			var edit = parent.spinedit;
			if (edit && edit.enable == true) {
				if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
					edit.on_apply_custom_setfocus(evt_name);
				}
				else {
					nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
				}
			}
		}
	};

	delete _pSpinButtonCtrl;
	_pSpinButtonCtrl = null;

	nexacro.SpinEditCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.MaskEditCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._accessibility_role = "spin";
	};

	var _pSpinEditCtrl = nexacro.SpinEditCtrl.prototype = nexacro._createPrototype(nexacro.MaskEditCtrl, nexacro.SpinEditCtrl);


	_pSpinEditCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent._find_pseudo_obj("align", pseudo, "align") || this._find_ctrl_pseudo_obj("align", pseudo, "align") || nexacro.Component._default_align;
	};

	_pSpinEditCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this._find_inherit_pseudo_obj("color", pseudo, "color") || nexacro.Component._default_color;
	};

	_pSpinEditCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this._find_inherit_pseudo_obj("font", pseudo, "font") || nexacro.Component._default_font;
	};

	_pSpinEditCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
		return accessibility ? accessibility : this.parent.on_find_CurrentStyle_accessibility(pseudo);
	};

	_pSpinEditCtrl._getAccessibilityRole = function (accessibility) {
		accessibility = this.parent.on_find_CurrentStyle_accessibility(this._pseudo);
		return this.parent._getAccessibilityRole(accessibility);
	};

	delete _pSpinEditCtrl;
	_pSpinEditCtrl = null;

	nexacro.SpinCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Spin.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._is_subcontrol = true;
	};

	var _pSpinCtrl = nexacro.SpinCtrl.prototype = nexacro._createPrototype(nexacro.Spin, nexacro.SpinCtrl);

	_pSpinCtrl._type_name = "SpinControl";
	nexacro._setForControlStyleFinder(_pSpinCtrl);

	delete _pSpinCtrl;
	_pSpinCtrl = null;
}
;