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


if (!nexacro.TextArea) {
	nexacro.TextArea_Style = function (target) {
		nexacro.Style.call(this);

		if (target) {
			this._target = target;
		}

		this.linespace = null;
		this.caretcolor = null;
		this.compositecolor = null;
		this.displaynulltextcolor = null;
	};

	var _pTextAreaStyle = nexacro._createPrototype(nexacro.Style, nexacro.TextArea_Style);
	nexacro.TextArea_Style.prototype = _pTextAreaStyle;

	eval(nexacro._createValueAttributeEvalStr("_pTextAreaStyle", "linespace"));
	eval(nexacro._createColorAttributeEvalStr("_pTextAreaStyle", "caretcolor"));
	eval(nexacro._createColorAttributeEvalStr("_pTextAreaStyle", "compositecolor"));
	eval(nexacro._createColorAttributeEvalStr("_pTextAreaStyle", "selectcolor"));
	eval(nexacro._createColorAttributeEvalStr("_pTextAreaStyle", "selectbackground"));
	eval(nexacro._createColorAttributeEvalStr("_pTextAreaStyle", "displaynulltextcolor"));

	_pTextAreaStyle.__custom_emptyObject = function () {
		this.linespace = null;
		this.caretcolor = null;
		this.compositecolor = null;
		this.selectcolor = null;
		this.selectbackground = null;
		this.displaynulltextcolor = null;
	};

	_pTextAreaStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.linespace && this.linespace._is_empty) {
			val += "linespace:" + this.linespace._value + "; ";
		}
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

	nexacro.TextArea_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.linespace = null;
		this.caretcolor = null;
		this.compositecolor = null;
		this.displaynulltextcolor = null;
	};

	var _pTextAreaCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.TextArea_CurrentStyle);
	nexacro.TextArea_CurrentStyle.prototype = _pTextAreaCurrentStyle;

	_pTextAreaCurrentStyle.__custom_emptyObject = _pTextAreaStyle.__custom_emptyObject;
	_pTextAreaCurrentStyle.__get_custom_style_value = _pTextAreaStyle.__get_custom_style_value;

	delete _pTextAreaStyle;
	delete _pTextAreaCurrentStyle;

	_pTextAreaStyle = null;
	_pTextAreaCurrentStyle = null;

	nexacro.TextArea = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent, true);

		this.acceptstab = false;
		this.autoselect = false;
		this.autoskip = false;
		this.displaynulltext = "";
		this.imemode = "none";
		this.inputfilter = "none";
		this.inputmode = "normal";
		this.inputtype = "normal";
		this.lengthunit = "utf16";
		this.maxlength = 0;
		this.readonly = false;
		this.scrollbars = "autoboth";
		this.tabindentsize = 4;
		this.undotype = "char";
		this.updatebindingvalue = "default";
		this.usecontextmenu = true;
		this.usecontrolkey = true;
		this.useinputpanel = true;
		this.useime = "global";
		this.value = undefined;
		this.text = "";
		this.wordwrap = "none";
		this.dragscrolltype = "all";


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
			"canchange" : 1, 
			"onchanged" : 1, 
			"oneditclick" : 1, 
			"ontextchange" : 1, 
			"ontextchanged" : 1, 
			"cancharchange" : 1, 
			"onchar" : 1, 
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onmousewheel" : 1, 
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


		this._activate_flag = false;
		this._edit_base_api = new nexacro.MultilineEdit(this);
		this._init_max_scroll_width = 0;
		this._init_max_scroll_height = 0;
		this._input_element = null;
		this._is_scrollable = true;
		this._max_scroll_width = 0;
		this._max_scroll_height = 0;
		this._old_max_height = undefined;
		this._scrollbars = 3;
		this._origin_scrollbars = 3;
		this._wordwrap_scrollbars = 1;
		this._update_scroll_lock = false;
		this._accessibility_role = "textbox";
		this._caret_pos = {
			begin : -1, 
			end : -1
		};
		this._setcaret = false;
		this._textchanging = false;
		this._dsupdate_in_textchanging = false;
		this._dsupdate_cancel = false;
		this._max_line = null;
		this._old_selection = [0, 0];
		this._apply_client_padding = false;
	};

	var _pTextArea = nexacro._createPrototype(nexacro.Component, nexacro.TextArea);
	nexacro.TextArea.prototype = _pTextArea;
	_pTextArea._type_name = "TextArea";

	nexacro.TextArea._default_selectcolor = nexacro._getCachedStyleObj("color", "#3e3e3eff");
	nexacro.TextArea._focused_selectcolor = nexacro._getCachedStyleObj("color", "#ffffffff");
	nexacro.TextArea._default_selectbackground = nexacro._getCachedStyleObj("color", "#ffffffb3");


	_pTextArea.on_apply_custom_pseudo = function (pseudo) {
		if (pseudo) {
			this._pseudo = pseudo;
		}
		else if (this._pseudo) {
			pseudo = this._pseudo;
		}

		var curstyle = this.currentstyle;

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

		var caretcolor = this.on_find_CurrentStyle_caretcolor(pseudo);
		if (caretcolor != curstyle.caretcolor) {
			curstyle.caretcolor = caretcolor;
			this.on_apply_style_caretcolor(caretcolor);
		}

		var compositecolor = this.on_find_CurrentStyle_compositecolor(pseudo);
		if (compositecolor != curstyle.compositecolor) {
			curstyle.compositecolor = compositecolor;
			this.on_apply_style_compositecolor(compositecolor);
		}

		var selectcolor = this.on_find_CurrentStyle_selectcolor(pseudo);
		if (selectcolor != curstyle.selectcolor) {
			curstyle.selectcolor = selectcolor;
			this.on_apply_style_selectcolor(selectcolor);
		}

		var displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(pseudo);
		if (displaynulltextcolor != curstyle.displaynulltextcolor) {
			curstyle.displaynulltextcolor = displaynulltextcolor;
			this.on_apply_style_displaynulltextcolor(displaynulltextcolor);
		}

		var selectbackground = this.on_find_CurrentStyle_selectbackground(pseudo);
		if (selectbackground != curstyle.selectbackground) {
			curstyle.selectbackground = selectbackground;
			this.on_apply_style_selectbackground(selectbackground);
		}

		var linespace = this.on_find_CurrentStyle_linespace(pseudo);
		if (linespace != curstyle.linespace) {
			curstyle.linespace = linespace;
			this.on_apply_style_linespace(linespace);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pTextArea.on_create_custom_style = function () {
		return new nexacro.TextArea_Style(this);
	};

	_pTextArea.on_create_custom_currentStyle = function () {
		return new nexacro.TextArea_CurrentStyle();
	};


	_pTextArea.on_find_CurrentStyle_align = function (pseudo) {
		var align = this._find_pseudo_obj("align", pseudo, "align");
		return (align) ? align : nexacro.Component._default_textarea_align;
	};

	_pTextArea.on_find_CurrentStyle_cursor = function (pseudo) {
		var cursor = "";
		if (!this._isEnable() && this.parent && !this.parent._is_application) {
			if (!this._is_subcontrol) {
				cursor = this.parent._find_pseudo_obj("cursor", pseudo);
			}
			else {
				var p = this.parent;
				while (p && p._is_form) {
					p = p.parent;
				}

				if (p) {
					cursor = p._find_pseudo_obj("cursor", pseudo);
				}
				else {
					cursor = null;
				}
			}
		}
		else {
			cursor = this._find_pseudo_obj("cursor", pseudo);
		}

		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pTextArea.on_find_CurrentStyle_caretcolor = function (pseudo) {
		return this._find_pseudo_obj("caretcolor", pseudo, "color");
	};

	_pTextArea.on_find_CurrentStyle_compositecolor = function (pseudo) {
		return this._find_pseudo_obj("compositecolor", pseudo, "color");
	};

	_pTextArea.on_find_CurrentStyle_selectcolor = function (pseudo) {
		var color = this._find_pseudo_obj("selectcolor", pseudo, "color");
		if (!color) {
			if (pseudo == "focused") {
				color = nexacro.TextArea._focused_selectcolor;
			}
			else {
				color = nexacro.TextArea._default_selectcolor;
			}
		}

		return color;
	};

	_pTextArea.on_find_CurrentStyle_displaynulltextcolor = function (pseudo) {
		var displaynulltextcolor = this._find_pseudo_obj("displaynulltextcolor", pseudo, "color");
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_pseudo_obj("color", pseudo, "color");
		}
		if (!displaynulltextcolor) {
			displaynulltextcolor = this._find_inherit_pseudo_obj("color", pseudo, "color");
		}

		return (displaynulltextcolor) ? displaynulltextcolor : nexacro.Component._default_color;
	};

	_pTextArea.on_find_CurrentStyle_selectbackground = function (pseudo) {
		var bkcolor = this._find_pseudo_obj("selectbackground", pseudo, "background");
		return (bkcolor) ? bkcolor : nexacro.TextArea._default_selectbackground;
	};

	_pTextArea.on_find_CurrentStyle_linespace = function (pseudo) {
		return this._find_pseudo_obj("linespace", pseudo, "value");
	};


	_pTextArea.on_update_style_cursor = function () {
		var cursor = this.on_find_CurrentStyle_cursor(this._pseudo);
		this.currentstyle.cursor = cursor;
		this.on_apply_style_cursor(cursor);
	};

	_pTextArea.on_update_style_caretcolor = function () {
		var caretcolor = this.on_find_CurrentStyle_caretcolor(this._pseudo);
		this.currentstyle.caretcolor = caretcolor;
		this.on_apply_style_caretcolor(caretcolor);
	};

	_pTextArea.on_update_style_compositecolor = function () {
		var compositecolor = this.on_find_CurrentStyle_compositecolor(this._pseudo);
		this.currentstyle.compositecolor = compositecolor;
		this.on_apply_style_compositecolor(compositecolor);
	};

	_pTextArea.on_update_style_selectcolor = function () {
		var selectcolor = this.on_find_CurrentStyle_selectcolor(this._pseudo);
		this.currentstyle.selectcolor = selectcolor;
		this.on_apply_style_selectcolor(selectcolor);
	};

	_pTextArea.on_update_style_displaynulltextcolor = function () {
		var displaynulltextcolor = this.on_find_CurrentStyle_displaynulltextcolor(this._pseudo);
		this.currentstyle.displaynulltextcolor = displaynulltextcolor;
		this.on_apply_style_displaynulltextcolor(displaynulltextcolor);
	};

	_pTextArea.on_update_style_selectbackground = function () {
		var selectbackground = this.on_find_CurrentStyle_selectbackground(this._pseudo);
		this.currentstyle.selectbackground = selectbackground;
		this.on_apply_style_selectbackground(selectbackground);
	};

	_pTextArea.on_update_style_linespace = function () {
		var linespace = this.on_find_CurrentStyle_linespace(this._pseudo);
		this.currentstyle.linespace = linespace;
		this.on_apply_style_linespace(linespace);
	};

	_pTextArea.on_update_style_padding = function () {
		var padding = this.on_find_CurrentStyle_padding(this._pseudo);
		this.currentstyle.padding = padding;
		this.on_apply_style_padding(padding);
	};


	_pTextArea.on_apply_style_align = function (align) {
		var curstyle = this.currentstyle;
		var api = this._edit_base_api;
		var input_elem = this._input_element;
		if (input_elem) {
			if (curstyle.align == null || (curstyle.align && curstyle.align._is_empty)) {
				curstyle.align = nexacro._cloneStyleObject(nexacro.Component._default_left_align);
			}

			api.setPosition();
			api._apply_style(input_elem);
		}
	};

	_pTextArea.on_apply_style_color = function (color) {
		var input_elem = this._input_element;
		if (input_elem) {
			if (this.currentstyle.color == null) {
				this.currentstyle.color = nexacro._cloneStyleObject(nexacro.Component._default_color);
			}
			input_elem.setElementColor(color);
		}
	};

	_pTextArea.on_apply_style_cursor = function (cursor) {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementCursor(cursor);

			var input_elem = this._input_element;
			if (input_elem) {
				input_elem.setElementCursor(cursor);
			}
		}
	};

	_pTextArea.on_apply_style_font = function (font) {
		var api = this._edit_base_api;
		var input_elem = this._input_element;
		if (input_elem) {
			if (this.currentstyle.font == null) {
				this.currentstyle.font = nexacro._cloneStyleObject(nexacro.Component._default_font);
			}
			input_elem.setElementFont(font);
			api.setPosition();
			api._apply_style(input_elem);
		}
	};

	_pTextArea.on_apply_style_caretcolor = function (color) {
	};

	_pTextArea.on_apply_style_compositecolor = function (color) {
	};

	_pTextArea.on_apply_style_selectbackground = function (selectbackground) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSelectBackgroundColor(selectbackground);
		}
	};

	_pTextArea.on_apply_style_selectcolor = function (selectcolor) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSelectColor(selectcolor);
		}
	};

	_pTextArea.on_apply_style_linespace = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			var lineHeight = v ? v : 0;
			input_elem.setElementLineSpace(lineHeight);
			input_elem.setElementValue(this.value, true);
			this._update_scroll();
		}
	};

	_pTextArea.on_apply_style_padding = function (v) {
		var input_elem = this._input_element;
		if (input_elem) {
			this._edit_base_api.setPosition();
			this._update_scroll();
		}
	};

	_pTextArea.on_apply_style_displaynulltextcolor = function (displaynulltextcolor) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementDisplayNullTextColor(displaynulltextcolor);
		}
	};

	_pTextArea.on_apply_style_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_style_accessibility.call(this, accessibility);
		if (this._input_element) {
			this._input_element.setElementAccessibilityRole(accessibility.role);
		}
	};

	_pTextArea.on_apply_style_letterspace = function (letterspace) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementLetterSpace(letterspace);
		}
		this._edit_base_api.onUpdateStyle(this);
	};
	_pTextArea.on_create_contents = function () {
		var control = this.getElement();
		if (control) {
			var curstyle = this.currentstyle;
			var input_elem = this._input_element = new nexacro.TextAreaElement(control);

			input_elem.setElementSize(this._client_width, this._client_height);
			input_elem.setElementFont(curstyle.font);
			input_elem.setElementColor(curstyle.color);

			input_elem.setElementSelectColor(curstyle.selectcolor);
			input_elem.setElementSelectBackgroundColor(curstyle.selectbackground);
			input_elem.setElementDisplayNullTextColor(curstyle.displaynulltextcolor);
			this._setAccessibilityFlagMultiLine(true);

			delete input_elem;
			input_elem = null;
		}
	};

	_pTextArea.on_created_contents = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var val = nexacro._toString(this.value);
			var api = this._edit_base_api;
			var curstyle = this.currentstyle;

			input_elem.setElementReadonly(this.readonly);
			input_elem.setElementMaxLength(this.maxlength);
			input_elem.setElementWordWrap(this.wordwrap);
			input_elem.setElementUseIme(this.useime);
			input_elem.setElementImeMode(this.imemode);
			input_elem.setElementEnable(this._isEnable());
			input_elem._is_prevent_enter = this._is_use_ex_enter;

			if (api) {
				api.setValue(val);
			}

			if (this.currentstyle && this.currentstyle.cursor && this.currentstyle.cursor.value != "auto") {
				this.on_apply_style_cursor(this.currentstyle.cursor);
			}

			input_elem.create();

			this.on_apply_lengthunit();

			input_elem._bindEvent();

			this.on_apply_prop_rtldirection();

			if (api) {
				api.setPosition();
			}

			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
				input_elem._setElementInputLabel();
			}

			this.on_apply_displaynulltext();
			input_elem.setElementLineSpace(this.currentstyle.linespace);
			input_elem.setElementLetterSpace(this.currentstyle.letterspace);
			this._update_scroll();

			this._init_max_scroll_width = this._max_scroll_width = input_elem.getScrollWidth();
			this._init_max_scroll_height = this._max_scroll_height = input_elem.getScrollHeight();

			if (curstyle && curstyle.cursor) {
				this.on_apply_style_cursor(curstyle.cursor);
			}
		}
	};

	_pTextArea.on_destroy_contents = function () {
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

	_pTextArea.on_change_containerRect = function (width, height) {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementSize(width, height);

			if (this._update_scroll_lock == true) {
				return false;
			}

			this._update_scroll_lock = true;
			this._update_scroll();
			this._update_scroll_lock = false;
		}
	};

	_pTextArea.on_getBindableProperties = function () {
		return "value";
	};

	_pTextArea.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this._edit_base_api) {
			this._edit_base_api._set_enable(v);
		}

		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementEnable(v);
			this.on_apply_style_cursor(this.currentstyle.cursor);
		}
	};

	_pTextArea.on_apply_custom_setfocus = function (evt_name) {
		var input_elem = this._input_element;
		var api = this._edit_base_api;
		var bTouch = (nexacro.isTouchInteraction && nexacro.SupportTouch);

		if (input_elem) {
			if (nexacro._enableaccessibility && (evt_name == "downkey" || evt_name == "upkey")) {
				if (this.vscrollbar && this.vscrollbar.visible) {
					this.vscrollbar.set_pos(0);
				}
				this.setCaretPos(0);
			}

			if (api) {
				api._changeFocusText(input_elem);
				api._bChangeFocusText = true;
			}

			if ((!(!bTouch && (nexacro.Browser == "Chrome" && evt_name == "lbuttondown"))) || ((this.value === undefined || this.value === null) && this.displaynulltext && this.displaynulltext.length > 0)) {
				input_elem.setElementFocus();
			}

			var h_pos = this.hscrollbar ? this.hscrollbar.pos : 0;
			var v_pos = this.vscrollbar ? this.vscrollbar.pos : 0;

			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis, function () {
				if (pThis.hscrollbar) {
					pThis.hscrollbar.set_pos(h_pos);
				}
				if (pThis.vscrollbar) {
					pThis.vscrollbar.set_pos(v_pos);
				}
			});
		}
	};

	_pTextArea.on_init_bindSource = function (columnid, propid, ds) {
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

	_pTextArea.on_change_bindSource = function (propid, ds, row, col, index) {
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

	_pTextArea.on_hscroll = function (obj, e) {
		if (this.onhscroll && this.onhscroll._has_handlers) {
			e.fromobject = this;
			this.onhscroll._fireEvent(this, e);
		}

		var control_elem = this._control_element;
		if (control_elem) {
			this._input_element.setScrollLeft(e.pos);
		}

		return true;
	};

	_pTextArea.on_vscroll = function (obj, e) {
		if (this.onvscroll && this.onvscroll._has_handlers) {
			e.fromobject = this;
			this.onvscroll._fireEvent(this, e);
		}

		var control_elem = this._control_element;
		if (control_elem) {
			this._input_element.setScrollTop(e.pos);
		}

		return true;
	};

	_pTextArea.on_get_style_accessibility_label = function () {
		var label = "";
		return label;
	};

	_pTextArea._on_getAccessibilityAdditionalLabel = function () {
		if (this._edit_base_api && this._isAccessibilityEnable()) {
			return this._edit_base_api._on_getAccessibilityAdditionalLabel();
		}
		return "";
	};

	_pTextArea._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
		if (nexacro._accessibilitytype == 4) {
			return "";
		}
		else {
			return role;
		}
	};

	_pTextArea._setAccessibilityStatFocus = function (evt_name) {
		if (this._input_element) {
			var role = this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo));
			if (this._getDescLevel() == "none") {
				role = "none";
			}
			this._input_element.setElementAccessibilityRole(role);
		}
		return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
	};

	_pTextArea._setAccessibilityNotifyEvent = function (direction) {
		if (this._edit_base_api) {
			this._edit_base_api._setAccessibilityNotifyLabel();
		}
		return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
	};

	_pTextArea.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var api = this._edit_base_api;
		if (api) {
			api.setPosition();
		}
	};

	_pTextArea.set_text = function (v) {
	};

	_pTextArea.set_value = function (v) {
		v = nexacro._toString(v);
		if (v && v !== undefined && v != "") {
			v = v.replace(/&quot;/g, "\"");
			if (v.indexOf("\r\n") != -1 || v.indexOf("\n\r") != -1) {
				v = v.replace(/\r\n/g, "\n").replace(/\n\r/g, "\n");
			}
			else {
				if (v.indexOf("\r") != -1) {
					v = v.replace(/\r/g, "");
				}
			}
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

	_pTextArea.on_apply_value = function () {
		var api = this._edit_base_api;

		if (api) {
			api.setValue(this.value);
			api.syncValue();
			api.onUpdateStyle(this);
		}

		this._refreshAccessibilityValue();
	};

	_pTextArea.set_scrollbars = function (v) {
		if (v != this.scrollbars || !this._is_created) {
			switch (v) {
				case "none":
					this._scrollbars = 0;
					break;
				case "autovert":
					this._scrollbars = 1;
					break;
				case "autohorz":
					this._scrollbars = 2;
					break;
				case "autoboth":
					this._scrollbars = 3;
					break;
				case "fixedvert":
					this._scrollbars = 4;
					break;
				case "fixedhorz":
					this._scrollbars = 8;
					break;
				case "fixedboth":
					this._scrollbars = 12;
					break;
				case "alwaysvert":
					this._scrollbars = 16;
					break;
				case "alwayshorz":
					this._scrollbars = 32;
					break;
				default:
					this._scrollbars = 3;
					v = "autoboth";
			}

			this._origin_scrollbars = this._scrollbars;
			if ((this.wordwrap != "none" && this.wordwrap != "false" && this.wordwrap != false) && this._scrollbars == 3) {
				this._scrollbars = this._wordwrap_scrollbars;
			}
			else {
				this._scrollbars = this._origin_scrollbars;
			}

			this.scrollbars = v;
			if (this._control_element && this._is_created) {
				this._onResetScrollBar();
			}
		}

		this._update_scroll();

		return v;
	};

	_pTextArea.set_displaynulltext = function (v) {
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

	_pTextArea.on_apply_displaynulltext = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementDisplayNullText(this.displaynulltext);
		}
	};

	_pTextArea.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly();
		}
	};

	_pTextArea.on_apply_readonly = function (val) {
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

	_pTextArea.set_autoselect = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.autoselect) {
			this.autoselect = v;
		}
	};


	_pTextArea.set_autoskip = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.autoskip) {
			this.autoskip = v;
		}
	};

	_pTextArea.on_apply_autoskip = function () {
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

	_pTextArea.set_acceptstab = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.acceptstab) {
			this.acceptstab = v;
		}
	};

	_pTextArea.set_maxlength = function (v) {
		v = nexacro._toInt(v);
		if (v && v != this.maxlength) {
			if (v < 0) {
				v = 0;
			}
			this.maxlength = v;
			this.on_apply_maxlength();
		}
	};

	_pTextArea.on_apply_maxlength = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementMaxLength(this.maxlength);
		}
	};

	_pTextArea.set_inputmode = function (v) {
		v = nexacro._toString(v);
		if (v && v != this.inputmode) {
			this.inputmode = v;
		}
	};

	_pTextArea.set_inputfilter = function (v) {
		v = nexacro._toString(v);

		if (v && v != this.inputfilter) {
			this.inputfilter = v;
			this.on_apply_inputfilter();
		}
	};

	_pTextArea.on_apply_inputfilter = function () {
		var api = this._edit_base_api;
		if (api) {
			api.setInputfilter(this.inputfilter);
		}
	};

	_pTextArea.set_inputtype = function (v) {
		v = nexacro._toString(v);
		if (v == "") {
			v = "normal";
		}

		if (v && v != this.inputtype) {
			this.inputtype = v;
			this.on_apply_inputtype();
		}
	};

	_pTextArea.on_apply_inputtype = function () {
		var api = this._edit_base_api;
		if (api) {
			api.setInputType(this.inputtype);
		}
	};

	_pTextArea.set_lengthunit = function (v) {
		if (v != this.lengthunit) {
			this.lengthunit = v;
			this.on_apply_lengthunit();
		}
	};

	_pTextArea.on_apply_lengthunit = function () {
		if (this._edit_base_api) {
			this._edit_base_api.setLengthunit(this.lengthunit);
		}
	};

	_pTextArea.set_imemode = function (v) {
		this.imemode = nexacro._toString(v);
		this.on_apply_imemode();
	};

	_pTextArea.on_apply_imemode = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementImeMode(this.imemode);
		}
	};

	_pTextArea.set_useime = function (v) {
		this.useime = nexacro._toString(v);
		this.on_apply_useime();
	};

	_pTextArea.on_apply_useime = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementUseIme(this.useime);
		}
	};

	_pTextArea.set_wordwrap = function (v) {
		if (typeof (v) == "string") {
			v = v.toLowerCase();
		}

		if (v != this.wordwrap) {
			this.wordwrap = v;
			this.on_apply_wordwrap();
		}
	};

	_pTextArea.on_apply_wordwrap = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			input_elem.setElementWordWrap(this.wordwrap);
		}

		if (this.wordwrap != "false" && this.wordwrap != false && this.wordwrap != "none" && this._scrollbars == 3) {
			this._scrollbars = this._wordwrap_scrollbars;
		}
		else {
			this._scrollbars = this._origin_scrollbars;
		}

		this._edit_base_api.onUpdateStyle(this);
		this.on_apply_value();
	};

	_pTextArea.set_linespace = function (v) {
		v = nexacro._toInt(v);
		if (v && v != this.linespace) {
			this.linespace = v;
			this.on_apply_linespace();

			this._update_scroll();
		}
	};

	_pTextArea.on_apply_linespace = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var lineHeight = (this.linespace < 0) ? "" : this.linespace + "px";
			input_elem.setElementLineSpace(lineHeight);
		}
	};

	_pTextArea.set_dragscrolltype = function (v) {
		nexacro.Form.prototype.set_dragscrolltype.call(this, v);
	};

	_pTextArea.set_tabindentsize = function (v) {
		v = nexacro._toInt(v);
		if (v != this.tabindentsize) {
			this.tabindentsize = v;
		}
	};

	_pTextArea.set_undotype = function (v) {
		v = nexacro._toString(v);
		if (v != this.undotype) {
			this.undotype = v;
		}
	};

	_pTextArea.set_usecontrolkey = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.usecontrolkey) {
			this.usecontrolkey = v;
		}
	};

	_pTextArea.set_usecontextmenu = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.usecontextmenu) {
			this.usecontextmenu = v;
		}
	};

	_pTextArea.set_useinputpanel = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.useinputpanel) {
			this.useinputpanel = v;
		}
	};

	_pTextArea.set_updatebindingvalue = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.updatebindingvalue) {
			this.updatebindingvalue = v;
		}
	};

	_pTextArea.getLength = function (v) {
		var api = this._edit_base_api;
		if (api) {
			if (!v) {
				v = this.lengthunit;
			}

			return api.getLength(this._input_element, this.value, false, null, v);
		}

		return -1;
	};

	_pTextArea.getCaretPos = function () {
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

	_pTextArea.getInputElementAttribute = function (attribute) {
		var input_elem = this._input_element;
		if (input_elem) {
			return input_elem.getInputElementAttribute(attribute);
		}

		return undefined;
	};

	_pTextArea.setInputElementAttribute = function (attribute, attrvalue) {
		var input_elem = this._input_element;
		if (input_elem) {
			return input_elem.setInputElementAttribute(attribute, attrvalue);
		}

		return false;
	};

	_pTextArea.setCaretPos = function (v) {
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
						v = this.value.length;
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

	_pTextArea.getSelect = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			if (this._is_focused == false) {
				return this._last_selection;
			}

			var pos = input_elem.getElementCaretPos();
			return [pos.begin, pos.end];
		}
		else {
			return this._defalut_lastselection;
		}
	};

	_pTextArea.setSelect = function (start, end) {
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

	_pTextArea.getSelectedText = function () {
		var input_elem = this._input_element;
		if (input_elem) {
			var pos = this.getSelect();

			if (this.value && pos != undefined) {
				return this.value.substring(pos[0], pos[1]);
			}
		}

		return "";
	};

	_pTextArea.setSelectedText = function (v) {
		v = nexacro._toString(v);

		var input_elem = this._input_element;
		if (v && input_elem) {
			var pos = this.getSelect();

			if (!input_elem._is_focused) {
				pos[0] = this._old_selection[0];
				pos[1] = this._old_selection[1];
			}

			if (pos[0] == pos[1]) {
				return;
			}

			var value = this.value;

			var before = value.substring(0, pos[0]);
			var text = value.substring(pos[0], pos[1]);
			var after = value.substr(pos[1]);
			var newValue = before + v + after;

			this.set_value(newValue);

			if (input_elem._is_focused) {
				this.setSelect(pos[0], pos[0] + v.length);
			}
			else {
				this.applyto_bindSource("value", newValue);
			}

			if (!input_elem._is_focused) {
				this._restoreSelect();
				this._cancelSelect();
			}

			return text;
		}

		return undefined;
	};

	_pTextArea.isAboveSelected = function () {
	};

	_pTextArea.insertText = function (text, position) {
		text = nexacro._toString(text);
		if (text) {
			if (position == null) {
				position = -1;
			}

			var newValue = null;
			var value = this.value;
			if (value) {
				if (position < 0) {
					newValue = value + text;
				}
				else {
					var chars = value.split("");
					chars.splice(position, 0, text);

					newValue = chars.join("");
				}
			}
			else {
				newValue = text;
			}

			this.set_value(newValue);
		}
	};

	_pTextArea.deleteText = function (start, count) {
		start = start === undefined ? 0 : parseInt(start, 10);
		count = count === undefined ? -1 : parseInt(count, 10);

		if (count < -1 || start < 0 || isNaN(start) || isNaN(count)) {
			return false;
		}

		if (start == null) {
			start = 0;
		}

		if (count == null) {
			count = -1;
		}

		var newValue = null;
		var value = this.value;
		var chars = value.split("");

		if (count == -1) {
			chars.splice(start, chars.length);
		}
		else {
			chars.splice(start, count);
		}

		newValue = chars.join("");
		this.set_value(newValue);
	};

	_pTextArea.find = function (text, start) {
		if (start == null) {
			start = 0;
		}

		start = nexacro._toInt(start);
		text = nexacro._toString(text);

		if (start < 0) {
			return -1;
		}

		return text ? this.value.indexOf(text, start) : -1;
	};

	_pTextArea.replace = function (oldText, newText) {
		if (newText == null) {
			newText = "";
		}

		oldText = nexacro._toString(oldText);
		newText = nexacro._toString(newText);

		var value = this.value;

		if (oldText) {
			value = value.split(oldText).join(newText);

			this.set_value(value);
		}

		return value;
	};

	_pTextArea.updateToDataset = function () {
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

	_pTextArea._on_activate = function () {
		if (!this._isSelected()) {
			this._stat_change("focus", "normal");
		}

		this._activate_flag = true;
	};

	_pTextArea._on_killfocus = function (obj, e) {
		if (!this._is_alive) {
			return;
		}

		var api = this._edit_base_api;
		var elem = this._input_element;

		if (api && elem) {
			var focus_text = api._getFocusText();
			var focus_val = api._getFocusValue();
			var cur_text = api._getText();
			var cur_val = api._getValue();

			if (this._activate_flag) {
				this._activate_flag = false;
			}

			if ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && !elem._is_focused) {
				if (focus_text != cur_text) {
					this.applyto_bindSource("value", this.value);
				}
				return;
			}

			api._is_on_killfocus = true;
			this._on_input_blur(elem);
			api._is_on_killfocus = false;

			if (focus_text != cur_text || (application._is_input_paste && this == application._input_paste_comp)) {
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
			else if (focus_val === undefined && focus_text == cur_text) {
				api._setValue(undefined);
				api._setText("");
				api.syncValue();

				elem.setElementValue(api._value);
			}
			else {
				elem.setElementValue(api._value, false, true);
			}
			this._restoreSelect();
			this._cancelSelect();
		}
	};

	_pTextArea._cancelSelect = function () {
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

	_pTextArea._restoreSelect = function () {
		this._old_selection = this.getSelect();
	};

	_pTextArea._on_click = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY) {
		if (!this._is_alive) {
			return;
		}

		if (this.visible && this._isEnable() && this.enableevent) {
			var caretPos = this.getCaretPos();
			var clientXY = this._getClientXY(canvasX, canvasY);
			this.on_fire_oneditclick(this, caretPos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, this);
		}
	};

	_pTextArea._on_input_keyinput = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_keyinput(elem);
			api._on_input_keyinput_after();
		}
	};

	_pTextArea._on_input_focus = function (elem, target) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_focus(elem, target);
		}
	};

	_pTextArea._on_input_blur = function (elem, target) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_blur(elem, target);
		}
	};

	_pTextArea._on_input_keydown = function (elem, keyCode, altKey, ctrlKey, shiftKey) {
		var bRet = false;
		var api = this._edit_base_api;
		if (api) {
			bRet = api._on_input_keydown(elem, keyCode, altKey, ctrlKey, shiftKey);
		}
		return bRet;
	};

	_pTextArea._on_input_keyup = function (elem, keyCode, altKey, ctrlKey, shiftKey) {
		var bRet = false;
		var api = this._edit_base_api;
		if (api) {
			bRet = api._on_input_keyup(elem, keyCode, altKey, ctrlKey, shiftKey);
		}
		return bRet;
	};

	_pTextArea._on_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey) {
		var bRet = false;
		var api = this._edit_base_api;
		if (api) {
			bRet = api._on_input_keypress(elem, keyCode, charCode, altKey, ctrlKey, shiftKey);
		}
		return bRet;
	};

	_pTextArea._on_input_mousedown = function (elem, altkey, ctrlkey, shiftkey) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_mousedown(elem, altkey, ctrlkey, shiftkey);
		}
	};

	_pTextArea._on_input_mouseup = function (elem, altkey, ctrlkey, shiftkey) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_mouseup(elem, altkey, ctrlkey, shiftkey);
		}
	};

	_pTextArea._on_input_mousemove = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_mousemove(elem);
		}
	};

	_pTextArea._on_input_touchstart = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_touchstart(elem);
		}
	};

	_pTextArea._on_input_touchmove = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_touchmove(elem);
		}
	};

	_pTextArea._on_input_touchend = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_touchend(elem);
		}
	};

	_pTextArea._on_input_select = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_select(elem);
		}
	};

	_pTextArea._on_input_copy = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_copy(elem);
		}
	};

	_pTextArea._on_input_cut = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_cut(elem);
		}
	};

	_pTextArea._on_input_paste = function (elem) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_paste(elem);
		}
	};

	_pTextArea._on_input_compositionstart = function (data) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_compositionstart(data);
		}
	};

	_pTextArea._on_input_compositionupdate = function (data) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_compositionupdate(data);
		}
	};

	_pTextArea._on_input_compositionend = function (data) {
		var api = this._edit_base_api;
		if (api) {
			api._on_input_compositionend(data);
		}
	};

	_pTextArea._is_use_ex_enter = false;
	_pTextArea.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			if (nexacro._enableaccessibility) {
				if (keycode == nexacro.Event.KEY_DOWN || keycode == nexacro.Event.KEY_UP) {
					var direction;
					if (keycode == nexacro.Event.KEY_DOWN) {
						direction = 1;
					}
					else if (keycode == nexacro.Event.KEY_UP) {
						direction = 2;
					}

					var line_text = this._getCaretLineString(null, direction);
					if (!line_text) {
						line_text = "#textarea:msg_accessibility_emptyline";
					}
					this._notifyAccessibility(line_text, "valuechange");
				}
			}
		}
		var retn = nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);

		if (this._is_use_ex_enter) {
			if ((ctrl_key || alt_key) && keycode == 13) {
				var cpos = this.getCaretPos();
				var value = this.text;
				var chars = value.split("");
				var api = this._edit_base_api;

				chars.splice(cpos, 0, "\n");
				newValue = chars.join("");

				if (this.maxlength >= newValue.length || this.maxlength == 0) {
					var elem = this._input_element;
					if (elem) {
						elem.text = newValue;
						elem.value = newValue;

						if (api) {
							if (nexacro.Browser == "IE") {
								var old_keyinput_event = api._accept_keyinput_event;
								api._accept_keyinput_event = false;

								elem._updateInputValue();
								api._accept_keyinput_event = old_keyinput_event;
							}
							else {
								elem._updateInputValue();
							}
						}
					}

					api._fire_text_event("\n");
					this.setCaretPos(api._begin_pos);
				}
			}
		}
		return retn;
	};

	_pTextArea.on_fire_cancharchange = function (obj, chartext, pretext, posttext) {
		if (this.cancharchange && this.cancharchange._has_handlers) {
			var evt = new nexacro.CanCharEventInfo(obj, "cancharchange", chartext, pretext, "");
			return this.cancharchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pTextArea.on_fire_canchange = function (obj, bText, bValue, aText, aValue) {
		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "canchange", bText, bValue, aText, aValue);
			return this.canchange._fireCheckEvent(this, evt);
		}

		return true;
	};

	_pTextArea.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged._fireEvent(this, evt);
		}
	};

	_pTextArea.on_fire_oneditclick = function (obj, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.oneditclick && this.oneditclick._has_handlers) {
			var evt = new nexacro.EditClickEventInfo(obj, "oneditclick", caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.oneditclick._fireEvent(this, evt);
		}

		return true;
	};

	_pTextArea.on_fire_ontextchanged = function (obj, pretext, posttext) {
		this._max_line = null;

		if (this.ontextchanged && this.ontextchanged._has_handlers) {
			var evt = new nexacro.TextChangedEventInfo(obj, "ontextchanged", pretext, posttext);
			return this.ontextchanged._fireEvent(this, evt);
		}

		return true;
	};

	_pTextArea.on_fire_ontextchange = function (event_info, evt) {
		if (this.ontextchange && this.ontextchange._has_handlers) {
			if (!evt) {
				var evt = new nexacro.TextChangeEventInfo(this, "ontextchange", event_info.chartext, event_info.pretext, event_info.posttext, event_info.preimetext, event_info.postimetext);
			}
			return this.ontextchange._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pTextArea.on_fire_onchar = function (event_info, evt) {
		if (this.onchar && this.onchar._has_handlers) {
			if (!evt) {
				var evt = new nexacro.TextChangeEventInfo(this, "onchar", event_info.chartext, event_info.prechareventtext, event_info.posttext);
			}
			return this.onchar._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pTextArea._on_fire_textchangeEventSet = function (text_info) {
		var org_chartext = text_info.chartext;
		var changechartext = text_info.chartext;

		var bCancel = false;
		var bInsert = text_info.bInsert;
		var bCut = text_info.bCut;

		var bTextchangeRet = true;
		var bCancahrchangeRet = true;
		var bOncharRet = true;
		var bChartextChange = false;

		var fireCancharEvent = true;

		var api = this._edit_base_api;
		var textEvt = new nexacro.TextChangeEventInfo(this, "ontextchange", text_info.chartext, text_info.pretext, text_info.posttext, text_info.preimetext, text_info.postimetext);
		var charEvt = new nexacro.TextChangeEventInfo(this, "onchar", text_info.chartext, text_info.prechareventtext, text_info.posttext);

		ret = this.on_fire_ontextchange(text_info, textEvt);

		if (ret) {
			if (org_chartext != textEvt.chartext) {
				bChartextChange = true;
				changechartext = textEvt.chartext;
			}

			if (!api._is_composition()) {
				ret = this.on_fire_cancharchange(this, text_info.chartext, text_info.prechareventtext, text_info.posttext);

				if (ret) {
					ret = this.on_fire_onchar(text_info, charEvt);

					if (!ret) {
						bOncharRet = false;
					}

					if (org_chartext != charEvt.chartext) {
						changechartext = charEvt.chartext;
					}
				}
				else {
					bOncharRet = false;
					bCancahrchangeRet = false;
				}
			}
			else {
				fireCancharEvent = false;
			}

			if (org_chartext != changechartext) {
				var chartext = api.applyInputmode(changechartext);
				chartext = api._apply_inputfilter(changechartext);
				chartext = api._apply_inputtype(changechartext);

				if (changechartext.length > 0 && chartext.length == 0) {
					bCancel = true;
				}

				if (!bCancel) {
					bInsert = api._check_maxlength_from_text_event(chartext);

					if (!bInsert) {
						chartext = "";
					}
					else {
						chartext = api._apply_maxlength_from_text_event(chartext);

						if (chartext != changechartext.chartext) {
							bCut = true;
						}
					}
				}

				text_info.chartext = chartext;

				var strFront = text_info.pretext.substr(0, api._begin_pos);
				var strRear = text_info.pretext.substr(api._end_pos, text_info.pretext.length - api._end_pos);

				text_info.posttext = strFront + chartext + strRear;

				if (bChartextChange && bOncharRet && bCancahrchangeRet) {
					ret = this.on_fire_cancharchange(this, text_info.chartext, text_info.prechareventtext, text_info.posttext);

					if (ret) {
						evt = new nexacro.TextChangeEventInfo(this, "onchar", text_info.chartext, text_info.prechareventtext, text_info.posttext);
						ret = this.on_fire_onchar(text_info);

						if (!ret) {
							bOncharRet = false;
						}
					}
					else {
						bOncharRet = false;
						bCancahrchangeRet = false;
					}
				}
			}
		}
		else {
			bTextchangeRet = false;
		}

		var ret = {
			bTextchangeRet : bTextchangeRet, 
			bCancahrchangeRet : bCancahrchangeRet, 
			bOncharRet : bOncharRet, 
			fireCancharEvent : fireCancharEvent, 
			bInsert : bInsert, 
			bCut : bCut
		};

		return ret;
	};

	_pTextArea._on_fire_changeEventSet = function (pretext, prevalue, posttext, postvalue) {
		var api = this._edit_base_api;
		var elem = this._input_element;

		this._textchanging = true;
		var ret = this.on_fire_canchange(this, pretext, prevalue, posttext, postvalue);
		if (!ret) {
			api._setText(pretext);
			api._setValue(prevalue);
			api.syncValue();
			api._setFocusValue();

			elem.setElementValue(api._value);
			this._init_bind_flag();

			return false;
		}

		elem.setElementValue(api._value, false, true);

		if (this._dsupdate_cancel || (!this._dsupdate_in_textchanging && !this.applyto_bindSource("value", this.value))) {
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

	_pTextArea._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_arrow = true;

		if (nexacro._enableaccessibility) {
			if (keycode == nexacro.Event.KEY_UP) {
				var elem = this._input_element;

				if (elem) {
					var caret_line = elem.getCaretLine();
					if (caret_line <= 1) {
						want_arrow = false;
					}
				}
				else {
					want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_DOWN) {
				var elem = this._input_element;

				if (elem) {
					var caret_line = elem.getCaretLine();
					var max_line = parseInt(this._getTextLine());
					if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
						if (caret_line == (max_line - 1)) {
							var cur_text = elem.getElementValue();
							var last_text = cur_text.substr(cur_text.length - 1, 1);

							if (last_text == "\n" || last_text == "\r") {
								caret_line++;
							}
						}
					}

					if (caret_line >= max_line) {
						want_arrow = false;
					}
				}
				else {
					want_arrow = false;
				}
			}
		}

		return {
			want_tab : this.acceptstab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pTextArea._init = function () {
		if (this._edit_base_api) {
			this._edit_base_api._init();
		}

		this.set_value(undefined);
	};

	_pTextArea._init_bind_flag = function () {
		this._textchanging = false;
		this._dsupdate_in_textchanging = false;
		this._dsupdate_cancel = false;
	};

	_pTextArea._getDragData = function () {
		return this.getSelectedText();
	};

	_pTextArea._getHLineInfo = function (idx, scroll_pos) {
		var control_elem = this.getElement();
		var input_elem = this._input_element;
		var curstyle = this.currentstyle;
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);

		var begin_idx = 0;
		var end_idx = 0;
		var i = idx;
		var r;

		var value = input_elem.value;
		if (!value) {
			return 0;
		}

		value = value.replace(/\n/g, "\n\r");
		var len = value.length;

		var ch = "";
		while (i >= 0 && (ch != '\n' && ch != '\r')) {
			ch = value.charAt(--i);
		}
		begin_idx = i + 1;

		ch = "";
		i = idx;
		while (len >= i && (ch != '\n' && ch != '\r')) {
			ch = value.charAt(i++);
		}
		end_idx = i - 1;

		i = begin_idx;
		var s_begin_width = 0;
		while (i < end_idx && s_begin_width <= scroll_pos) {
			r = nexacro._getTextSize2(letterspace, value.charAt(i++), curstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false));
			s_begin_width += r[0];
		}

		if (i > 0) {
			i = i - 1;
		}
		var view_begin_idx = i;

		var s_end_width = 0;
		while (i <= end_idx && s_end_width <= control_elem.client_width) {
			r = nexacro._getTextSize2(letterspace, value.charAt(i++), curstylee.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false));
			s_end_width += r[0];
		}
		var view_end_idx = i - 1;

		if (idx > view_begin_idx && idx < view_end_idx) {
			return -1;
		}

		if (idx > view_begin_idx && s_end_width < control_elem.client_width && s_begin_width > scroll_pos) {
			return -1;
		}

		if (idx == begin_idx) {
			return 0;
		}

		var s_width = -1;

		if (idx == end_idx && value.charAt(idx) == '\n' && idx < view_begin_idx) {
			s_width = 0;
			i = begin_idx;
			while (i < idx) {
				r = nexacro._getTextSize2(letterspace, value.charAt(i++), curstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false));
				s_width += r[0];
			}
		}

		else if (idx >= view_end_idx && s_begin_width > scroll_pos) {
			i = view_end_idx;
			s_width = 0;
			while (i < idx) {
				r = nexacro._getTextSize2(letterspace, value.charAt(i++), curstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false));
				s_width += r[0];
			}
			s_width += scroll_pos;
		}

		else if (idx <= view_begin_idx) {
			i = view_begin_idx;
			s_width = 0;
			while (i >= idx) {
				r = nexacro._getTextSize2(letterspace, value.charAt(i--), curstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false));
				s_width += r[0];
			}

			s_width = scroll_pos - s_width;
			if (s_width < 0) {
				s_width = 0;
			}
		}
		else if (idx > begin_idx) {
			i = begin_idx;
			s_width = 0;
			while (i < idx - 1) {
				r = nexacro._getTextSize2(letterspace, value.charAt(i++), curstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false));
				s_width += r[0];
			}

			if (s_width < 0) {
				s_width = 0;
			}
		}

		return s_width;
	};

	_pTextArea._getVLineInfo = function (pos) {
		var control_elem = this.getElement();
		var curstyle = this.currentstyle;

		var font = curstyle.font;
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
		var font_size = nexacro._getTextSize2(letterspace, "Wj", font);

		var linespace = curstyle.linespace ? nexacro._toInt(curstyle.linespace) : 0;
		var lineheight = font_size[1] + linespace;

		var begin_line = nexacro._toInt(pos / lineheight) + 1;
		var end_line = begin_line + Math.ceil((control_elem.client_height) / lineheight) - 1;

		return {
			begin : begin_line, 
			end : end_line
		};
	};

	_pTextArea._getMaxTextLine = function () {
		var input_elem = this._input_element;
		var curstyle = this.currentstyle;
		var line = 0;

		var scroll_height = input_elem.getScrollHeight();
		if (scroll_height > 0) {
			var linespace = curstyle.linespace ? nexacro._toInt(curstyle.linespace) : 0;
			var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
			var lineheight = nexacro._getTextSize2(letterspace, "Wj", curstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false))[1] + linespace;

			line = scroll_height / lineheight;
		}

		return line;
	};

	_pTextArea._getTextLine = function () {
		var input_elem = this._input_element;
		var text = this.value;
		var line = 0;
		var text_width = 0;
		var client_width = this._client_width;

		var textarr;

		if (text) {
			textarr = text.split("\n");
			line = textarr.length;
		}

		if (input_elem && input_elem._handle && this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") {
			var i = 0;
			var subline = 0;
			var t;
			for (i = 0; i < line; i++) {
				t = textarr[i];
				subline += nexacro._getLineCountWithWordwrap(input_elem, t, this.wordwrap);
			}
			line = subline;
		}

		this._max_line = line;

		return line;
	};

	_pTextArea._getCaretLineString = function (old_caret_pos, direction) {
		var pos = old_caret_pos;
		var caret_line = 1;
		var input_elem = this._input_element;
		if (!pos) {
			pos = this.getCaretPos();

			if (input_elem) {
				caret_line = input_elem.getCaretLine();
			}
		}

		if (direction == 1) {
			var text = this.value;
			if (text) {
				var textarr = text.split("\n");
				var line = textarr.length;
			}

			if (input_elem && input_elem._handle && this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") {
				var i = 0;
				var subline = 0;
				var old_subline = 0;
				var t;
				var substr = "";
				var ch = "";
				var start_caret_index = 0;
				var end_caret_index = 0;

				for (i = 0; i < line; i++) {
					t = textarr[i];
					subline += nexacro._getLineCountWithWordwrap(input_elem, t, this.wordwrap);

					if (subline > caret_line) {
						caret_line = caret_line - old_subline;

						for (j = 0; j < t.length; j++) {
							var temp_line = caret_line;
							ch = t[j];
							substr += ch;
							subline = nexacro._getLineCountWithWordwrap(input_elem, substr, this.wordwrap);
							if (subline > caret_line) {
								start_caret_index = j;
								substr = "";
								for (k = j; k < t.length; k++) {
									ch = t[k];
									substr += ch;
									subline = nexacro._getLineCountWithWordwrap(input_elem, substr, this.wordwrap);
									if (subline > 1) {
										end_caret_index = k;
										substr = t.slice(start_caret_index, end_caret_index);
										break;
									}
								}
								end_caret_index = k;
								break;
							}
						}
						break;
					}
					old_subline = subline;
				}
			}
			else {
				return textarr[caret_line + 1];
			}
		}
		else if (direction == 2) {
			var text = this.value;
			if (text) {
				var textarr = text.split("\n");
				var line = textarr.length;
			}

			if (input_elem && input_elem._handle && this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") {
				var i = 0;
				var subline = 0;
				var old_subline = 0;
				var t;
				var substr = "";
				var ch = "";
				var start_caret_index = 0;
				var end_caret_index = 0;

				for (i = 0; i < line; i++) {
					t = textarr[i];
					subline += nexacro._getLineCountWithWordwrap(input_elem, t, this.wordwrap);

					if (subline >= caret_line - 1) {
						caret_line = caret_line - old_subline - 1;

						for (j = 0; j < t.length; j++) {
							var temp_line = caret_line;
							ch = t[j];
							substr += ch;
							subline = nexacro._getLineCountWithWordwrap(input_elem, substr, this.wordwrap);
							if (subline >= caret_line) {
								start_caret_index = j;
								substr = "";
								for (k = j; k < t.length; k++) {
									ch = t[k];
									substr += ch;
									subline = nexacro._getLineCountWithWordwrap(input_elem, substr, this.wordwrap);
									if (subline > 1) {
										end_caret_index = k;
										substr = t.slice(start_caret_index, end_caret_index);
										break;
									}
								}
								end_caret_index = k;
								break;
							}
						}
						break;
					}
					old_subline = subline;
				}
			}
			else {
				return textarr[caret_line - 1];
			}
		}
		else if (direction == 0) {
			var text = this.value;
			if (text) {
				var textarr = text.split("\n");
				var line = textarr.length;
			}

			if (input_elem && input_elem._handle && this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") {
				var i = 0;
				var subline = 0;
				var old_subline = 0;
				var t;
				var substr = "";
				var ch = "";
				var start_caret_index = 0;
				var end_caret_index = 0;

				for (i = 0; i < line; i++) {
					t = textarr[i];
					subline += nexacro._getLineCountWithWordwrap(input_elem, t, this.wordwrap);

					if (subline >= caret_line) {
						caret_line = caret_line - old_subline;

						for (j = 0; j < t.length; j++) {
							var temp_line = caret_line;
							ch = t[j];
							substr += ch;
							subline = nexacro._getLineCountWithWordwrap(input_elem, substr, this.wordwrap);
							if (subline > caret_line) {
								end_caret_index = j;
								substr = t.slice(start_caret_index, end_caret_index);
								break;
							}
						}
						break;
					}
					old_subline = subline;
				}
			}
			else {
				return (textarr[0]) ? textarr[0] : "";
			}
		}
		return substr;
	};

	_pTextArea._update_scroll = function () {
		var control_elem = this.getElement();
		var input_elem = this._input_element;
		if (control_elem && input_elem) {
			var max_width = input_elem.getScrollWidth();
			var max_height = input_elem.getScrollHeight();

			control_elem.setElementScrollMaxSize(max_width, max_height);
			this._updateClientSize(control_elem);

			this._max_scroll_height = max_height;

			if (this.vscrollbar) {
				var pos = input_elem.getScrollTop();
				this.vscrollbar.set_pos(pos);
			}

			if (this.hscrollbar) {
				var pos = input_elem.getScrollLeft();
				this.hscrollbar.set_pos(pos);
			}

			this._onResetScrollBar();
			this._old_max_height = undefined;
		}
	};

	_pTextArea._reset_hscroll = function () {
		var control_elem = this.getElement();
		var input_elem = this._input_element;

		if (control_elem._hscroll_visible) {
			control_elem.setElementHScrollPos(0);
			input_elem.setScrollLeft(0);
		}
		;
	};

	_pTextArea._setValue = function (v) {
		if (nexacro._isNull(v)) {
			this.text = "";
		}
		else {
			this.text = nexacro._toString(v);
		}

		this.value = v;

		this.on_apply_value();
	};

	_pTextArea._setVScrollDefaultAction = function (vscrollbar, wheelDelta) {
		var currentstyle = this.currentstyle;
		var linespace = currentstyle.linespace ? nexacro._toInt(currentstyle.linespace) : 0;
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
		var lineheight = nexacro._getTextSize2(letterspace, "Wj", currentstyle.font, ((this.wordwrap != "none" && this.wordwrap != false && this.wordwrap != "false") ? true : false))[1] + linespace;
		if (wheelDelta >= 0) {
			var wheelline = 3;
		}
		else {
			var wheelline = -3;
		}
		wheelDelta = lineheight * wheelline;

		vscrollbar.set_pos(vscrollbar.pos - wheelDelta);
	};

	_pTextArea._isWheelScrollable = function (delta) {
		var input_elem = this._input_element;
		if (!input_elem) {
			return false;
		}

		var st = input_elem.getScrollTop();
		var sh = this._max_scroll_height;
		var ch = this._client_height;

		if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0)) {
			return false;
		}
		return true;
	};

	_pTextArea._accept_keydown_event = function (keyCode) {
		return true;
	};

	_pTextArea._recreateInputElement = function () {
		var input_elem = this._input_element;

		if (input_elem) {
			input_elem._destroyInputHandle();
			input_elem._input_handle = input_elem._createInputHandle();
			input_elem._bindEvent(input_elem);
		}
	};

	_pTextArea._set_editbase_focusstat = function (stat) {
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

	delete _pTextArea;
	_pTextArea = null;

	nexacro.TextAreaCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.TextArea.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pTextAreaCtrl = nexacro._createPrototype(nexacro.TextArea, nexacro.TextAreaCtrl);
	nexacro.TextAreaCtrl.prototype = _pTextAreaCtrl;
	nexacro._setForControlStyleFinder(_pTextAreaCtrl);

	delete _pTextAreaCtrl;
	_pTextAreaCtrl = null;
}
;

