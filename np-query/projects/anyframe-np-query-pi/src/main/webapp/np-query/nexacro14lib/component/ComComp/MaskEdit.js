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


if (!nexacro.MaskEdit) {
	nexacro.MaskEdit_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}

		this.caretcolor = null;
		this.compositecolor = null;
		this.displaynulltextcolor = null;
	};

	var _pMaskEditStyle = nexacro._createPrototype(nexacro.Style, nexacro.MaskEdit_Style);
	nexacro.MaskEdit_Style.prototype = _pMaskEditStyle;

	eval(nexacro._createColorAttributeEvalStr("_pMaskEditStyle", "caretcolor"));
	eval(nexacro._createColorAttributeEvalStr("_pMaskEditStyle", "compositecolor"));
	eval(nexacro._createColorAttributeEvalStr("_pMaskEditStyle", "selectcolor"));
	eval(nexacro._createColorAttributeEvalStr("_pMaskEditStyle", "selectbackground"));
	eval(nexacro._createColorAttributeEvalStr("_pMaskEditStyle", "displaynulltextcolor"));

	_pMaskEditStyle.__custom_emptyObject = function () {
		this.caretcolor = null;
		this.compositecolor = null;
		this.selectcolor = null;
		this.selectbackground = null;
		this.displaynulltextcolor = null;
	};

	_pMaskEditStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.caretcolor && !this.caretcolor._is_empty) {
			val += "caretcolor:" + this.caretcolor._value + "; ";
		}
		if (this.compositecolor && !this.compositecolor._is_empty) {
			val += "compositecolor:" + this.compositecolor._value + "; ";
		}
		if (this.selectcolor && !this.selectcolor._is_empty) {
			val += "selectcolor:" + this.selectcolor._value + "; ";
		}
		if (this.selectbackground && !this.selectbackground._is_empty) {
			val += "selectbackground:" + this.selectbackground._value + "; ";
		}
		if (this.displaynulltextcolor && !this.displaynulltextcolor._is_empty) {
			val += "displaynulltextcolor:" + this.displaynulltextcolor._value + "; ";
		}

		return val;
	};

	nexacro.MaskEdit_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.caretcolor = null;
		this.compositecolor = null;
		this.selectcolor = null;
		this.selectbackground = null;
		this.displaynulltextcolor = null;
	};

	var _pMaskEditCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.MaskEdit_CurrentStyle);
	nexacro.MaskEdit_CurrentStyle.prototype = _pMaskEditCurrentStyle;

	_pMaskEditCurrentStyle.__custom_emptyObject = _pMaskEditStyle.__custom_emptyObject;
	_pMaskEditCurrentStyle.__get_custom_style_value = _pMaskEditStyle.__get_custom_style_value;

	delete _pMaskEditStyle;
	delete _pMaskEditCurrentStyle;

	_pMaskEditStyle = null;
	_pMaskEditCurrentStyle = null;

	nexacro.MaskEdit = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.type = "number";
		this.limitbymask = "decimal";
		this.trimtype = "none";
		this.value = undefined;
		this.text = "";
		this.displaynulltext = "";
		this.readonly = false;
		this.autoselect = false;
		this.autoskip = false;
		this.clipmode = "includespace";
		this.mask = "";
		this.maskchar = "_";
		this.updatebindingvalue = "default";
		this.useinputpanel = true;
		this.usecontextmenu = true;
		this._activate_flag = false;
		this._is_focusing = false;

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
			"oneditclick" : 1, 
			"canchange" : 1, 
			"cancharchange" : 1, 
			"onchanged" : 1, 
			"onchar" : 1, 
			"ontextchange" : 1, 
			"ontextchanged" : 1, 
			"oncontextmenu" : 1, 
			"onfling" : 1, 
			"onflingstart" : 1, 
			"onflingend" : 1, 
			"onpinch" : 1, 
			"onpinchstart" : 1, 
			"onpinchend" : 1, 
			"onslide" : 1, 
			"onslidestart" : 1, 
			"onslideend" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onlongpress" : 1
		};

		this._input_element = null;
		this._edit_base_api = null;
		this._accessibility_role = "edit";
		this._caret_pos = {
			begin : -1, 
			end : -1
		};
		this._setcaret = false;
		this._textchanging = false;
		this._dsupdate_in_textchanging = false;
		this._dsupdate_cancel = false;
		this._has_inputElement = true;
		this._locale = "";
	};

	var _pMaskEdit = nexacro._createPrototype(nexacro.Component, nexacro.MaskEdit);
	nexacro.MaskEdit.prototype = _pMaskEdit;
	_pMaskEdit._type_name = "MaskEdit";

	_pMaskEdit.on_apply_custom_pseudo = function (pseudo) {
		if (pseudo) {
			this._pseudo = pseudo;
		}
		else if (this._pseudo) {
			pseudo = this._pseudo;
		}
		var curstyle = this.currentstyle;

		var align = this.on_find_CurrentStyle_align(pseudo) || nexacro.Component._default_left_align;
		if (align != curstyle.align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (font != curstyle.font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}

		var letterspace = this.on_find_CurrentStyle_letterspace(letterspace);
		if (letterspace != curstyle.letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (color != curstyle.color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		color = this.on_find_CurrentStyle_caretcolor(pseudo);
		if (color != curstyle.caretcolor) {
			curstyle.caretcolor = color;
			this.on_apply_style_caretcolor(color);
		}

		color = this.on_find_CurrentStyle_compositecolor(pseudo);
		if (color != curstyle.compositecolor) {
			curstyle.compositecolor = color;
			this.on_apply_style_compositecolor(color);
		}

		color = this.on_find_CurrentStyle_selectcolor(pseudo);
		if (color != curstyle.selectcolor) {
			curstyle.selectcolor = color;
			this.on_apply_style_selectcolor(color);
		}

		color = this.on_find_CurrentStyle_displaynulltextcolor(pseudo);
		if (color != curstyle.displaynulltextcolor) {
			curstyle.displaynulltextcolor = color;
			this.on_apply_style_displaynulltextcolor(color);
		}

		color = this.on_find_CurrentStyle_selectbackground(pseudo);
		if (color != curstyle.selectbackground) {
			curstyle.selectbackground = color;
			this.on_apply_style_selectbackground(color);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pMaskEdit.on_create_custom_style = function () {
		return new nexacro.MaskEdit_Style(this);
	};

	_pMaskEdit.on_create_custom_currentStyle = function () {
		return new nexacro.MaskEdit_CurrentStyle();
	};

	_pMaskEdit.on_find_CurrentStyle_cursor = function (pseudo) {
		var cursor = "";
		if (!this._isEnable() && this.parent && !this.parent._is_application) {
			if (!this._is_subcontrol) {
				cursor = this.parent._find_pseudo_obj("cursor", pseudo, "value");
			}
			else {
				var p = this.parent;
				while (p && p._is_form) {
					p = p.parent;
				}

				if (p) {
					cursor = p._find_pseudo_obj("cursor", pseudo, "value");
				}
				else {
					cursor = null;
				}
			}
		}
		else {
			cursor = this._find_pseudo_obj("cursor", pseudo, "value");
		}

		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pMaskEdit.on_find_CurrentStyle_caretcolor = function (pseudo) {
		return this._find_pseudo_obj("caretcolor", pseudo, "color");
	};

	_pMaskEdit.on_find_CurrentStyle_compositecolor = function (pseudo) {
		return this._find_pseudo_obj("compositecolor", pseudo, "color");
	};

	_pMaskEdit.on_find_CurrentStyle_selectcolor = function (pseudo) {
		var color = this._find_pseudo_obj("selectcolor", pseudo, "color");
		if (!color) {
			if (pseudo == "focused") {
				color = nexacro.Edit._focused_selectcolor;
			}
			else {
				color = nexacro.Edit._default_selectcolor;
			}
		}

		return color;
	};

	_pMaskEdit.on_find_CurrentStyle_displaynulltextcolor = function (pseudo) {
		var displaynulltextcolor = this._find_pseudo_obj("displaynulltextcolor", pseudo, "color");
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_pseudo_obj("color", pseudo, "color");
		}
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_inherit_pseudo_obj("color", pseudo, "color");
		}

		return (displaynulltextcolor) ? displaynulltextcolor : nexacro.Component._default_color;
	};

	_pMaskEdit.on_find_CurrentStyle_selectbackground = function (pseudo) {
		var bkcolor = this._find_pseudo_obj("selectbackground", pseudo, "background");
		return (bkcolor) ? bkcolor : nexacro.Edit._default_selectbackground;
	};

	_pMaskEdit.on_update_style_cursor = function () {
		var cursor = this.on_find_CurrentStyle_cursor(this._pseudo);
		this.currentstyle.cursor = cursor;
		this.on_apply_style_cursor(cursor);
	};

	_pMaskEdit.on_update_style_caretcolor = function () {
		var caretcolor = this.on_find_CurrentStyle_caretcolor(this._pseudo);
		this.currentstyle.caretcolor = caretcolor;
		this.on_apply_style_caretcolor(caretcolor);
	};

	_pMaskEdit.on_update_style_compositecolor = function () {
		var compositecolor = this.on_find_CurrentStyle_compositecolor(this._pseudo);
		this.currentstyle.compositecolor = compositecolor;
		this.on_apply_style_compositecolor(compositecolor);
	};

	_pMaskEdit.on_update_style_selectcolor = function () {
		var selectcolor = this.on_find_CurrentStyle_selectcolor(this._pseudo);
		this.currentstyle.selectcolor = selectcolor;
		this.on_apply_style_selectcolor(selectcolor);
	};

	_pMaskEdit.on_update_style_displaynulltextcolor = function () {
		var displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(this._pseudo);
		this.currentstyle.displaynulltextcolor = displaynulltextcolor;
		this.on_apply_style_displaynulltextcolor(displaynulltextcolor);
	};

	_pMaskEdit.on_update_style_selectbackground = function () {
		var selectbackground = this.on_find_CurrentStyle_selectbackground(this._pseudo);
		this.currentstyle.selectbackground = selectbackground;
		this.on_apply_style_selectbackground(selectbackground);
	};

	_pMaskEdit.on_apply_style_color = function (color) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementColor(color);
		}
	};

	_pMaskEdit.on_apply_style_font = function (font) {
		if (font == null) {
			font = nexacro.Component._default_font;
		}

		var api = this._edit_base_api;
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementFont(font);
			api.setPosition();
			api._apply_style(input_elem);
		}
	};

	_pMaskEdit.on_apply_style_cursor = function (cursor) {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementCursor(cursor);

			var input_elem = this._input_element;
			if (input_elem) {
				input_elem.setElementCursor(cursor);
			}
		}
	};

	_pMaskEdit.on_apply_style_align = function (align) {
		if (align == null) {
			align = nexacro.Component._default_left_align;
		}
		var api = this._edit_base_api;
		var input_elem = this._input_element;
		if (input_elem) {
			api.setPosition();
			api._apply_style(input_elem);
		}
	};

	_pMaskEdit.on_apply_style_caretcolor = function (color) {
	};

	_pMaskEdit.on_apply_style_compositecolor = function (color) {
	};

	_pMaskEdit.on_apply_style_selectbackground = function (selectbackground) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSelectBackgroundColor(selectbackground);
		}
	};

	_pMaskEdit.on_apply_style_selectcolor = function (selectcolor) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSelectColor(selectcolor);
		}
	};

	_pMaskEdit.on_apply_style_displaynulltextcolor = function (displaynulltextcolor) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementDisplayNullTextColor(displaynulltextcolor);
		}
	};

	_pMaskEdit.on_apply_style_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_style_accessibility.call(this, accessibility);
		if (this._input_element) {
			this._input_element.setElementAccessibilityRole(accessibility.role);
		}
	};

	_pMaskEdit.on_apply_style_letterspace = function (letterspace) {
		if (this._input_element) {
			this._input_element.setElementLetterSpace(letterspace);
		}
	};

	_pMaskEdit.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var input_elem = this._input_element = new nexacro.InputElement(control);
			if (this.type == "number") {
				this._edit_base_api = new nexacro.EditMaskNumber(this);
			}
			else {
				this._edit_base_api = new nexacro.EditMaskString(this);
			}

			var curstyle = this.currentstyle;

			input_elem.setElementSize(this._client_width, this._client_height);
			input_elem.setElementFont(curstyle.font);
			input_elem.setElementColor(curstyle.color);
			input_elem.setElementAlign(curstyle.align);
			input_elem.setElementSelectColor(curstyle.selectcolor);
			input_elem.setElementSelectBackgroundColor(curstyle.selectbackground);
			input_elem.setElementDisplayNullTextColor(curstyle.displaynulltextcolor);
		}
	};

	_pMaskEdit.on_created_contents = function (doc) {
		this._default_align = this._default_left_align;
		var api = this._edit_base_api;
		var input_elem = this._input_element;
		if (input_elem) {
			var curstyle = this.currentstyle;

			this.on_apply_limitbymask();
			this.on_apply_trimtype();
			this.on_apply_maskchar();
			this.on_apply_clipmode();
			this.on_apply_mask();
			this.on_apply_value();
			this.on_apply_locale();

			input_elem._is_maskedit = true;
			input_elem.setElementInputType(this.type);

			input_elem.create();

			input_elem.setElementImeMode("disabled");
			input_elem.setElementEnable(this._isEnable());
			input_elem.setElementReadonly(this.readonly);
			input_elem._bindEvent(input_elem);

			if (api) {
				api.setPosition();
			}

			if (nexacro._isDesktop() && ((nexacro.Browser == "Chrome" || nexacro.Browser == "Safari"))) {
				this.setCaretPos(0);
			}

			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
				input_elem._setElementInputLabel();
			}

			this.on_apply_prop_rtldirection();
			this.on_apply_displaynulltext();
			this.on_apply_style_letterspace(curstyle.letterspace);

			if (curstyle && curstyle.cursor) {
				this.on_apply_style_cursor(curstyle.cursor);
			}
		}
	};

	_pMaskEdit.on_destroy_contents = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem._unBindEvent();
			input_elem.destroy();
			this._input_element = null;
		}

		var api = this._edit_base_api;
		if (api) {
			api._destroy();
			this._edit_base_api = null;
		}

		if (application._input_paste_comp == this) {
			application._input_paste_comp = null;
		}

		this._caret_pos = null;
	};

	_pMaskEdit.on_change_containerRect = function (width, height) {
		var input_elem = this._input_element;
		var api = this._edit_base_api;

		if (input_elem && api) {
			api.setPosition();
			api._apply_style(input_elem);
		}
	};

	_pMaskEdit.on_getBindableProperties = function () {
		return "value";
	};

	_pMaskEdit.on_apply_prop_enable = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementEnable(v);
			this.on_apply_style_cursor(this.currentstyle.cursor);
		}
	};

	_pMaskEdit.on_apply_custom_setfocus = function (evt_name) {
		var input_elem = this._input_element;
		var api = this._edit_base_api;

		if (input_elem && api) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				if (this.displaynulltext && this._is_focusing) {
					return;
				}
			}

			this._is_focusing = true;

			if (!(nexacro.Browser == "Gecko" && input_elem._is_mousedown)) {
				api._changeFocusText(input_elem);
				api._bChangeFocusText = true;

				input_elem.setElementFocus();
			}
			else {
				api._bChangeFocusText = false;
			}
		}
	};

	_pMaskEdit.on_init_bindSource = function (columnid, propid, ds) {
		if (propid == "value") {
			var api = this._edit_base_api;
			if (api) {
				if (api._undoStack) {
					api._undoStack.init();
				}
			}

			this._setValue(undefined);
			return true;
		}
	};

	_pMaskEdit.on_change_bindSource = function (propid, ds, row, col, index) {
		if (propid == "value") {
			var v = ds.getColumn(row, col);
			var api = this._edit_base_api;
			var input_elem = this._input_element;

			if (api) {
				var focus_val = api._getFocusValue();
				if (input_elem) {
					if (v === this.value && v === api._value && v === input_elem.value) {
						if (focus_val != v) {
							api._setFocusValue();
						}
						return true;
					}

					if (this._textchanging) {
						return true;
					}
				}

				if (api._undoStack) {
					api._undoStack.init();
				}
			}

			this._setValue(v);

			if (api && input_elem) {
				if (focus_val != v) {
					api._setFocusValue();
				}
			}

			return true;
		}

		return false;
	};

	_pMaskEdit.on_get_style_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pMaskEdit._on_getAccessibilityAdditionalLabel = function () {
		if (this._edit_base_api) {
			return this._edit_base_api._on_getAccessibilityAdditionalLabel();
		}
		return "";
	};

	_pMaskEdit._getAccessibilityReadLabel = function (bwholeread) {
		var _readlabel = nexacro.Component.prototype._getAccessibilityReadLabel.call(this);
		if (bwholeread && this._input_element && this._status != "focus") {
			if (!this._input_element._wantAccessibilityAdditionalLabel
				 || !this._input_element._wantAccessibilityAdditionalLabel()) {
				_readlabel = this.text + " " + _readlabel;
			}
		}
		return _readlabel;
	};

	_pMaskEdit._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
		if (nexacro._accessibilitytype == 4) {
			return "";
		}
		else {
			return role;
		}
	};

	_pMaskEdit._setAccessibilityStatFocus = function (evt_name) {
		if (this._input_element) {
			var role = this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo));
			if (this._getDescLevel() == "none") {
				role = "none";
			}
			this._input_element.setElementAccessibilityRole(role);
		}
		return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pMaskEdit._setAccessibilityNotifyEvent = function (direction) {
		if (this._edit_base_api) {
			this._edit_base_api._setAccessibilityNotifyLabel();
		}
		return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
	};

	_pMaskEdit.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var api = this._edit_base_api;
		if (api) {
			api.setPosition();
		}
	};

	_pMaskEdit.set_text = function (v, checkbind) {
	};

	_pMaskEdit.set_value = function (v) {
		v = nexacro._toString(v);
		if (v && v !== undefined && v != "") {
			v = v.replace(/&quot;/g, "\"");
		}

		if (v != this.value) {
			var form = this._getRootForm();
			var api = this._edit_base_api;

			if (!this.applyto_bindSource("value", v)) {
				return;
			}

			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				if (api) {
					var old_keyinput_event = api._accept_keyinput_event;
					api._accept_keyinput_event = false;

					this._setValue(v);
					api._accept_keyinput_event = old_keyinput_event;
				}
				else {
					this._setValue(v);
				}

				if (nexacro.BrowserVersion <= 8) {
					if (form && form._bFireLoadEvent) {
						this._recreateInputElement();
					}
				}
			}
			else {
				this._setValue(v);
			}
		}
	};

	_pMaskEdit.on_apply_value = function () {
		var api = this._edit_base_api;

		if (api) {
			api.setValue(this.value);
			api.syncValue();
		}

		this._refreshAccessibilityValue();
	};

	_pMaskEdit.set_displaynulltext = function (v) {
		var isNull = nexacro._isNull(v);
		if (isNull) {
			v = "";
		}
		else {
			v = nexacro._toString(v);
			v = v.replace(/&quot;/g, "\"");
		}

		if (v != this.displaynulltext) {
			this.displaynulltext = v;
			this.on_apply_displaynulltext();
		}
	};

	_pMaskEdit.on_apply_displaynulltext = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementDisplayNullText(this.displaynulltext);
		}
	};

	_pMaskEdit.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pMaskEdit.on_apply_readonly = function () {
		var v = this.readonly;
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementReadonly(v);
		}
	};

	_pMaskEdit.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.autoselect) {
			this.autoselect = v;
		}
	};

	_pMaskEdit.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.autoskip) {
			this.autoskip = v;
		}
	};

	_pMaskEdit.on_apply_autoskip = function () {
		var root_comp = this._getRootComponent(this);
		var next_comp = this._refform.getNextComponent(root_comp, true);
		if (next_comp) {
			next_comp.setFocus();
			var api = next_comp._edit_base_api ? next_comp._edit_base_api : null;
			if (api) {
				next_comp.setCaretPos(0);
			}
		}
	};

	_pMaskEdit.set_clipmode = function (v) {
		v = nexacro._toString(v);
		if (v != this.clipmode) {
			this.clipmode = v;
			this.on_apply_clipmode();
		}
	};

	_pMaskEdit.on_apply_clipmode = function () {
		var api = this._edit_base_api;
		if (api && this.type == "string") {
			if (this.clipmode == "includespace") {
				api._FillMaskChar = " ";
			}
			else {
				api._FillMaskChar = undefined;
			}
		}
	};

	_pMaskEdit.set_limitbymask = function (v) {
		v = nexacro._toString(v);
		if (v != this.limitbymask) {
			this.limitbymask = v;
			this.on_apply_limitbymask();
		}
	};

	_pMaskEdit.on_apply_limitbymask = function () {
		var api = this._edit_base_api;
		if (api && this.type == "number") {
			if (this.limitbymask == "both") {
				api._nLimitType = 3;
			}
			else if (this.limitbymask == "integer") {
				api._nLimitType = 1;
			}
			else if (this.limitbymask == "decimal") {
				api._nLimitType = 2;
			}
			else {
				api._nLimitType = 0;
			}
		}
	};

	_pMaskEdit.set_mask = function (v, bApply) {
		v = nexacro._toString(v);
		if (v != this.mask) {
			this.mask = v;
			this.on_apply_mask();
			if (bApply !== false) {
				this.on_apply_value();
			}
		}
	};

	_pMaskEdit.on_apply_mask = function () {
		var api = this._edit_base_api;
		if (api) {
			var strMask = this.mask;
			if (!strMask) {
				strMask = "";
			}
			api.setMask(strMask);
		}
	};

	_pMaskEdit.set_maskchar = function (v) {
		v = nexacro._toString(v);
		if (v == "") {
			v = "_";
		}

		if (v != this.maskchar) {
			this.maskchar = v;
			this.on_apply_maskchar();
			this.on_apply_value();
		}
	};

	_pMaskEdit.on_apply_maskchar = function () {
		var api = this._edit_base_api;
		if (api && this.type == "string") {
			var maskchar = this.maskchar;
			if (maskchar && maskchar.length > 0) {
				api._cMaskChar = maskchar;
			}
			else {
				api._cMaskChar = undefined;
			}
		}
	};

	_pMaskEdit.set_trimtype = function (v) {
		v = nexacro._toString(v);
		if (v != this.trimtype) {
			this.trimtype = v;
			this.on_apply_trimtype();
		}
	};

	_pMaskEdit.on_apply_trimtype = function () {
		var api = this._edit_base_api;
		if (api && this.type == "string") {
			if (this.trimtype == "left") {
				api._nTrimType = 1;
			}
			else if (this.trimtype == "right") {
				api._nTrimType = 2;
			}
			else if (this.trimtype == "both") {
				api._nTrimType = 3;
			}
			else {
				api._nTrimType = 0;
			}
		}
	};

	_pMaskEdit.set_type = function (v) {
		v = nexacro._toString(v);
		if (v != this.type) {
			this.type = v;
			this.on_apply_type();
			this.on_apply_limitbymask();
			this.on_apply_trimtype();
			this.on_apply_maskchar();
			this.on_apply_clipmode();
			this.on_apply_displaynulltext();
			this.on_apply_mask();
			this.on_apply_value();
		}
	};

	_pMaskEdit.on_apply_type = function () {
		var control = this.getElement();
		if (control) {
			if (this.type == "number") {
				this._edit_base_api = null;
				this._edit_base_api = new nexacro.EditMaskNumber(this);
			}
			else {
				this._edit_base_api = null;
				this._edit_base_api = new nexacro.EditMaskString(this);
			}

			this._input_element.setElementInputType(this.type);
		}
	};

	_pMaskEdit.set_useinputpanel = function (v) {
	};

	_pMaskEdit.set_updatebindingvalue = function (v) {
	};

	_pMaskEdit.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);

		if (this.usecontextmenu != v) {
			this.usecontextmenu = v;
		}
	};

	_pMaskEdit.set_locale = function (v) {
		if (v != this.locale) {
			this.locale = v;
			if (this._locale != v) {
				this._locale = v;
				this.on_apply_locale();
			}
		}
	};

	_pMaskEdit.on_apply_locale = function () {
		var api = this._edit_base_api;
		if (api) {
			var locale = this._getLocale();
			api._setLocale(locale);
			this.on_apply_value();
		}
	};

	_pMaskEdit.getLength = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var api = this._edit_base_api;
			var v = api.getValue();
			if (v) {
				var len = v.length;
				if (this.type == "number") {
					if (-1 != v.indexOf("-", 0)) {
						len -= 1;
					}
					if (-1 != v.indexOf(".", 0)) {
						len -= 1;
					}
				}

				return len;
			}
			else {
				return -1;
			}
		}

		return -1;
	};

	_pMaskEdit.getCaretPos = function () {
		if (this.readonly) {
			return -1;
		}

		var input_elem = this._input_element;
		if (input_elem) {
			if (!input_elem._checkActiveElement()) {
				return -1;
			}

			var pos = input_elem.getElementCaretPos();
			if (pos && pos != -1) {
				return pos.begin;
			}
		}

		return -1;
	};

	_pMaskEdit.getInputElementAttribute = function (attribute) {
		var input_elem = this._input_element;
		if (input_elem) {
			return input_elem.getInputElementAttribute(attribute);
		}

		return undefined;
	};

	_pMaskEdit.setInputElementAttribute = function (attribute, attrvalue) {
		var input_elem = this._input_element;
		if (input_elem) {
			return input_elem.setInputElementAttribute(attribute, attrvalue);
		}

		return false;
	};

	_pMaskEdit.setCaretPos = function (v) {
		var api = this._edit_base_api;
		var input_elem = this._input_element;
		if (input_elem) {
			if (arguments.length == 0) {
				v = 0;
			}
			else {
				v = nexacro._toInt(v);
				if (v == -1) {
					if (v) {
						v = this.text.length;
					}
					else {
						v = 0;
					}
				}
			}

			input_elem.setElementSetSelect(v, v);
			api._begin_pos = api._end_pos = v;
			this._caret_pos.begin = v;
			this._caret_pos.end = v;
			this._setcaret = true;

			return true;
		}

		return false;
	};

	_pMaskEdit.getSelect = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var api = this._edit_base_api;
			var start = api._begin_pos !== undefined ? api._begin_pos : 0;
			var end = api._end_pos !== undefined ? api._end_pos : 0;
			return [start, end];
		}
		else {
			return [0, 0];
		}
	};

	_pMaskEdit.setSelect = function (start, end) {
		var input_elem = this._input_element;
		if (input_elem) {
			var api = this._edit_base_api;
			var txt = this.text ? this.text : "";
			var txt_len = txt.length;

			if (nexacro._isNull(start) || start === "") {
				start = 0;
			}
			if (nexacro._isNull(end) || end === "") {
				end = -1;
			}

			if (!nexacro._isNumber(start)) {
				start = nexacro._toInt(start);
			}
			if (!nexacro._isNumber(end)) {
				end = nexacro._toInt(end);
			}

			if (start == -1) {
				start = txt_len;
			}
			if (end == -1) {
				end = txt_len;
			}

			if (start > end) {
				var tmp = start;
				start = end;
				end = tmp;
			}

			api._begin_pos = start;
			api._end_pos = end;
			this._caret_pos.begin = start;
			this._caret_pos.end = end;
			this._setcaret = true;

			input_elem.setElementSetSelect(start, end);

			return true;
		}

		return false;
	};

	_pMaskEdit.getSelectedText = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var api = this._edit_base_api;
			var start = api._begin_pos !== undefined ? api._begin_pos : 0;
			var end = api._end_pos !== undefined ? api._end_pos : 0;

			var txt = api._getText();

			if (txt && (start != end)) {
				return txt.substring(start, end);
			}
			else {
				return "";
			}
		}

		return "";
	};

	_pMaskEdit.isAboveSelected = function () {
	};

	_pMaskEdit.updateToDataset = function () {
		var ret = this.applyto_bindSource("value", this.value);
		if (this._textchanging) {
			this._dsupdate_in_textchanging = true;
			if (!ret) {
				this._dsupdate_cancel = true;
			}
			else {
				this._dsupdate_cancel = false;
			}
		}
		else {
			this._dsupdate_in_textchanging = false;
		}
		return ret;
	};

	_pMaskEdit._on_activate = function () {
		var input_elem = this._input_element;
		var api = this._edit_base_api;

		if (api) {
			api._changeFocusText(input_elem);
			api._bChangeFocusText = true;
		}

		if (!this._isSelected()) {
			this._stat_change("focus", "normal");
		}

		this._activate_flag = true;
	};

	_pMaskEdit._on_killfocus = function (obj, fromObj) {
		if (!this._is_alive) {
			return;
		}

		var api = this._edit_base_api;
		var elem = this._input_element;

		this._is_focusing = false;

		if (api && elem) {
			var focus_text = api._getFocusText();
			var focus_val = api._getFocusValue();
			var cur_text = this.text;
			var cur_val = this.value;

			if (this._activate_flag) {
				this._activate_flag = false;
			}

			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				if (!elem._is_focused) {
					if (focus_text != cur_text || focus_val != cur_val) {
						this.applyto_bindSource("value", this.value);
					}

					return;
				}

				if (api._is_composition()) {
					var data = api._stat_composition.getData();
					api._on_input_compositionend(data);
					if (!api._is_hangul(data)) {
						api._fire_text_event(data);
					}
				}
			}

			api._is_on_killfocus = true;
			this._on_input_blur(elem);
			api._is_on_killfocus = false;

			if (focus_text != cur_text || focus_val != cur_val || (application._is_input_paste && this == application._input_paste_comp)) {
				application._is_input_paste = false;
				application._input_paste_comp = null;

				var win = this._getWindow();
				if (win && win._is_active_window != true && !obj) {
					elem.setElementValue(api._value, false, true);
					return;
				}

				var ret = this._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);
				if (!ret) {
					return;
				}
			}
			else if (focus_val === undefined && focus_text == cur_text && !this._isPasswordUsed(api)) {
				api._setValue(undefined);
				api._setText(focus_text);
				api.syncValue();

				elem.setElementValue(api._value);
			}
			else {
				elem.setElementValue(api._value, false, true);
			}

			this._cancelSelect();
		}
	};

	_pMaskEdit._cancelSelect = function () {
		var api = this._edit_base_api;

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (api._is_selected()) {
				if (this.visible) {
					var form = this._getRootForm();
					var form_elem = form.getElement();

					if (form.vscrollbar) {
						form_elem._recover_vpos = form.vscrollbar.pos;
					}
					if (form.hscrollbar) {
						form_elem._recover_hpos = form.hscrollbar.pos;
					}

					this.setCaretPos(api._begin_pos);

					if (nexacro.BrowserVersion <= 8) {
						form_elem._recover_vpos = undefined;
						form_elem._recover_hpos = undefined;
					}
				}
				else {
					this.setCaretPos(api._begin_pos);
				}
			}
		}
	};

	_pMaskEdit._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		if (this._isEnable() && this.enableevent) {
			var caretPos = this.getCaretPos();
			var clientXY = this._getClientXY(canvasX, canvasY);

			this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
		}
	};

	_pMaskEdit._on_input_keyinput = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_keyinput(elem);
			api._on_input_keyinput_after();
		}
	};

	_pMaskEdit._on_input_focus = function (elem, target) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_focus(elem);
		}
	};

	_pMaskEdit._on_input_blur = function (elem, target) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_blur(elem);
		}
	};

	_pMaskEdit._on_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey) {
		var bRet = false;
		var api = this._edit_base_api;
		if (api) {
			bRet = api._on_input_keypress(elem, keyCode, charCode, altKey, ctrlKey, shiftKey);
		}
		return bRet;
	};

	_pMaskEdit._on_input_keydown = function (elem, keyCode, altKey, ctrlKey, shiftKey) {
		var bRet = false;
		var api = this._edit_base_api;
		if (api) {
			bRet = api._on_input_keydown(elem, keyCode, altKey, ctrlKey, shiftKey);
		}
		return bRet;
	};

	_pMaskEdit._on_input_keyup = function (elem, keyCode, altKey, ctrlKey, shiftKey) {
		var bRet = false;
		var api = this._edit_base_api;
		if (api) {
			bRet = api._on_input_keyup(elem, keyCode, altKey, ctrlKey, shiftKey);
		}
		return bRet;
	};

	_pMaskEdit._on_input_mousedown = function (elem, altkey, ctrlkey, shiftkey) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_mousedown(elem, altkey, ctrlkey, shiftkey);
		}
	};

	_pMaskEdit._on_input_mouseup = function (elem, altkey, ctrlkey, shiftkey) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_mouseup(elem, altkey, ctrlkey, shiftkey);
		}
	};

	_pMaskEdit._on_input_touchstart = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_touchstart(elem);
		}
	};

	_pMaskEdit._on_input_touchmove = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_touchmove(elem);
		}
	};

	_pMaskEdit._on_input_touchend = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_touchend(elem);
		}
	};

	_pMaskEdit._on_input_mousemove = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_mousemove(elem);
		}
	};

	_pMaskEdit._on_input_select = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_select(elem);
		}
	};

	_pMaskEdit._on_input_copy = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_copy(elem);
		}
	};

	_pMaskEdit._on_input_cut = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_cut(elem);
		}
	};

	_pMaskEdit._on_input_paste = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_paste(elem);
		}
	};

	_pMaskEdit._on_input_compositionstart = function (data) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_compositionstart(data);
		}
	};

	_pMaskEdit._on_input_compositionupdate = function (data) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_compositionupdate(data);
		}
	};

	_pMaskEdit._on_input_compositionend = function (data) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_compositionend(data);
		}
	};

	_pMaskEdit.on_fire_cancharchange = function (obj, chartext, pretext, posttext) {
		if (this.cancharchange && this.cancharchange._has_handlers) {
			var evt = new nexacro.CanCharEventInfo(obj, "cancharchange", chartext, pretext, posttext);
			return this.cancharchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pMaskEdit.on_fire_canchange = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "canchange", pretext, prevalue, posttext, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pMaskEdit.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var evt = new nexacro.EditClickEventInfo(obj, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.oneditclick._fireEvent(this, evt);
		}

		return true;
	};

	_pMaskEdit.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
	};
	_pMaskEdit.on_fire_ontextchanged = function (obj, pretext, posttext) {
		if (this.ontextchanged && this.ontextchanged._has_handlers) {
			var evt = new nexacro.TextChangedEventInfo(this, "ontextchanged", pretext, posttext);
			return this.ontextchanged._fireEvent(this, evt);
		}

		return true;
	};

	_pMaskEdit.on_fire_ontextchange = function (event_info) {
		var ret = true;
		var api = this._edit_base_api;
		var api_ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};
		var evt = new nexacro.TextChangeEventInfo(this, "ontextchange", event_info.chartext, event_info.pretext, event_info.posttext, event_info.preimetext, event_info.postimetext);

		if (this.ontextchange && this.ontextchange._has_handlers) {
			ret = this.ontextchange._fireCheckEvent(this, evt);

			if (ret && event_info.chartext != evt.chartext) {
				api._setValue(api._old_value);
				api._setText(api._old_text);
				api.setElementCaretPos(api._old_begin_pos, api._old_end_pos);

				if (this.type == "number") {
					api_ret = api._apply_filter(evt.chartext);
					if (api_ret.bChange) {
						api._setValue(api_ret.value);
						api._setText(api_ret.text);
						api.setElementCaretPos(api_ret.caret, api_ret.caret);
					}

					event_info.setTextInfo(evt.chartext, api._old_text, api._text, "", "");
				}
				else if (this.type == "string") {
					var inputInfo = api.inputText(chartext);

					event_info.setTextInfo(evt.chartext, api._old_text, inputInfo.newText, "", "");
				}
			}
		}
		return ret;
	};

	_pMaskEdit.on_fire_onchar = function (event_info) {
		var ret = true;
		var api = this._edit_base_api;
		var api_ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};
		var evt = new nexacro.TextChangeEventInfo(this, "onchar", event_info.chartext, event_info.prechareventtext, event_info.posttext);

		if (this.onchar && this.onchar._has_handlers) {
			ret = this.onchar._fireCheckEvent(this, evt);

			if (ret && event_info.chartext != evt.chartext) {
				api._setValue(api._old_value);
				api._setText(api._old_text);
				api.setElementCaretPos(api._old_begin_pos, api._old_end_pos);

				if (this.type == "number") {
					api_ret = api._apply_filter(evt.chartext);
					if (api_ret.bChange) {
						api._setValue(api_ret.value);
						api._setText(api_ret.text);
						api.setElementCaretPos(api_ret.caret, api_ret.caret);
					}

					event_info.setTextInfo(evt.chartext, api._old_text, api._text, "", "");
				}
				else if (this.type == "string") {
					var inputInfo = api.inputText(evt.chartext);

					event_info.setTextInfo(evt.chartext, api._old_text, inputInfo.newText, "", "");
				}
			}
		}
		return ret;
	};

	_pMaskEdit._on_fire_changeEventSet = function (pretext, prevalue, posttext, postvalue) {
		var api = this._edit_base_api;
		var elem = this._input_element;

		this._textchanging = true;
		var ret = this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue);
		if (!ret) {
			if (this.type == "string") {
				if (!prevalue) {
					api._setMaskedValue(api.makeMaskedValue(""));
				}
				else {
					api._setMaskedValue(api.makeMaskedValue(prevalue));
				}
			}

			api._setText(pretext);
			api._setValue(prevalue);
			api.syncValue();
			api._setFocusValue();

			elem.setElementValue(api._value);
			this._init_bind_flag();

			return false;
		}

		if (this.type == "string") {
			var newval = api.getValue();
			if (!newval) {
				api._setMaskedValue(api.makeMaskedValue(""));
			}
			else {
				api._setMaskedValue(api.makeMaskedValue(newval));
			}

			api._setText(api.makeText(api._strMaskedValue));
			api._setValue(api.makeValue(api._strMaskedValue));
			api.syncValue();
		}

		elem.setElementValue(api._value);

		if (this._dsupdate_cancel || (!this._dsupdate_in_textchanging && !this.applyto_bindSource("value", this.value))) {
			if (this.type == "string") {
				if (!prevalue) {
					api._setMaskedValue(api.makeMaskedValue(""));
				}
				else {
					api._setMaskedValue(api.makeMaskedValue(prevalue));
				}
			}

			api._setText(pretext);
			api._setValue(prevalue);
			api.syncValue();
			api._setFocusValue();

			elem.setElementValue(api._value);
			this._init_bind_flag();

			return false;
		}

		api._setFocusValue();
		this._init_bind_flag();
		this.on_fire_onchanged(this, pretext, prevalue, this.text, this.value);

		return true;
	};

	_pMaskEdit._init = function () {
		var api = this._edit_base_api;
		if (api) {
			api._init();
		}

		this.set_value(undefined);
	};

	_pMaskEdit._init_bind_flag = function () {
		this._textchanging = false;
		this._dsupdate_in_textchanging = false;
		this._dsupdate_cancel = false;
	};

	_pMaskEdit._getDragData = function () {
		return this.getSelectedText();
	};

	_pMaskEdit._setValue = function (v) {
		if (nexacro._isNull(v)) {
			this.text = "";
		}
		else {
			this.text = nexacro._toString(v);
		}

		this.value = v;

		this.on_apply_value();
	};

	_pMaskEdit._accept_keydown_event = function (keyCode) {
		return true;
	};

	_pMaskEdit._recreateInputElement = function () {
		var input_elem = this._input_element;

		if (input_elem) {
			input_elem._destroyInputHandle();
			input_elem._input_handle = input_elem._createInputHandle();
			input_elem._bindEvent(input_elem);
		}
	};

	_pMaskEdit._isPasswordUsed = function (api) {
		var len = api && api._bufPass ? api._bufPass.length : 0;
		while (len--) {
			if (api._bufPass[len] == true) {
				return true;
			}
		}
		return false;
	};

	_pMaskEdit._set_editbase_focusstat = function (stat) {
		var api = this._edit_base_api;
		if (api) {
			switch (stat) {
				case "focus":
					api._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
					break;
				case "blur":
					api._stat_focus.setStatus(nexacro.EditBase.Status.Blur);
					break;
				default:
					api._stat_focus.setStatus(stat);
					break;
			}
			;
		}
	};

	delete _pMaskEdit;
	_pMaskEdit = null;

	nexacro.MaskEditCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.MaskEdit.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pMaskEditCtrl = nexacro._createPrototype(nexacro.MaskEdit, nexacro.MaskEditCtrl);
	nexacro.MaskEditCtrl.prototype = _pMaskEditCtrl;
	_pMaskEditCtrl._type_name = "MaskEditControl";
	nexacro._setForControlStyleFinder(_pMaskEditCtrl);

	delete _pMaskEditCtrl;
	_pMaskEditCtrl = null;
}
;

