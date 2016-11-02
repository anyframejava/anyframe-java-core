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

if (!nexacro.EditBase) {
	nexacro.EditClickEventInfo = function (obj, id, caretpos, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ClickEventInfo.call(this, obj, id || "oneditclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		this.caretpos = (caretpos == null) ? 0 : caretpos;
	};

	var _pEditClickEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.EditClickEventInfo);
	nexacro.EditClickEventInfo.prototype = _pEditClickEventInfo;
	_pEditClickEventInfo._type_name = "EditClickEventInfo";

	delete _pEditClickEventInfo;
	_pEditClickEventInfo = null;

	nexacro.CanCharEventInfo = function (obj, id, chartext, pretext, posttext) {
		this.id = this.eventid = id || "cancharchange";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
	};
	var _pCanCharEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CanCharEventInfo);
	nexacro.CanCharEventInfo.prototype = _pCanCharEventInfo;
	_pCanCharEventInfo._type_name = "TextChangeEventInfo";

	_pCanCharEventInfo.set_chartext = function (v) {
		this.chartext = v;
	};

	delete _pCanCharEventInfo;
	_pCanCharEventInfo = null;

	nexacro.TextChangeEventInfo = function (obj, id, chartext, pretext, posttext, preimetext, postimetext) {
		this.id = this.eventid = id || "ontextchange";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
		this.preimetext = preimetext;
		this.postimetext = postimetext;
	};
	var _pTextChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TextChangeEventInfo);
	nexacro.TextChangeEventInfo.prototype = _pTextChangeEventInfo;
	_pTextChangeEventInfo._type_name = "TextChangeEventInfo";

	_pTextChangeEventInfo.set_chartext = function (v) {
		this.chartext = v;
	};

	delete _pTextChangeEventInfo;
	_pTextChangeEventInfo = null;

	nexacro.TextChangedEventInfo = function (obj, id, pretext, posttext) {
		this.id = this.eventid = id || "ontextchanged";
		this.fromobject = this.fromreferenceobject = obj;

		this.pretext = pretext;
		this.posttext = posttext;
	};
	var _pTextChangedEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.TextChangedEventInfo);
	nexacro.TextChangedEventInfo.prototype = _pTextChangedEventInfo;
	_pTextChangedEventInfo._type_name = "TextChangedEventInfo";

	delete _pTextChangedEventInfo;

	nexacro.EditBase = function (comp) {
		if (comp) {
			this.comp = comp;
		}

		this._init_eventhandler();
		this._init();
	};

	_pEditBase = nexacro.EditBase.prototype;
	_pEditBase._type_name = "EditBase";

	_pEditBase._old_text = "";
	_pEditBase._text = "";
	_pEditBase._old_value = null;
	_pEditBase._value = null;
	_pEditBase._focus_text = "";
	_pEditBase._focus_value = null;
	_pEditBase._strTab = "\t";
	_pEditBase._set_old_prop = false;
	_pEditBase._deleted_char = "";
	_pEditBase._is_on_killfocus = false;
	_pEditBase._is_apply_autoselect = false;
	_pEditBase._imefirsttxt = "";
	_pEditBase._select_text = "";
	_pEditBase._compositionstart_value = "";
	_pEditBase._compositionend_value = "";
	_pEditBase._bChangeFocusText = false;

	_pEditBase._keycode = 0;
	_pEditBase._charcode = 0;
	_pEditBase._altkey = false;
	_pEditBase._ctrlkey = false;
	_pEditBase._shiftkey = false;

	_pEditBase._old_begin_pos = 0;
	_pEditBase._old_end_pos = 0;
	_pEditBase._begin_pos = 0;
	_pEditBase._end_pos = 0;
	_pEditBase._input_begin_pos = 0;

	_pEditBase._accept_keyinput_event = true;
	_pEditBase._accept_focus_event = true;
	_pEditBase._accept_blur_event = true;
	_pEditBase._accept_select_event = true;
	_pEditBase._accept_cut_process = true;

	_pEditBase._stat_mouse = null;
	_pEditBase._stat_focus = null;
	_pEditBase._stat_composition = null;
	_pEditBase._mouseflag = false;

	_pEditBase._is_undo = false;
	_pEditBase._undoStack = null;

	_pEditBase._textEventInfo = null;

	_pEditBase._set_timer_by_killfocus = false;
	_pEditBase._isPasteActionComplete = true;

	_pEditBase._on_input_mousedown = null;
	_pEditBase._on_input_mouseup = null;
	_pEditBase._on_input_mousemove = null;
	_pEditBase._on_input_touchstart = null;
	_pEditBase._on_input_touchmove = null;
	_pEditBase._on_input_touchend = null;

	_pEditBase._on_input_keydown = null;
	_pEditBase._on_input_keypress = null;
	_pEditBase._on_input_keyinput = null;
	_pEditBase._on_input_keyup = null;

	_pEditBase._on_input_focus = null;
	_pEditBase._on_input_blur = null;

	_pEditBase._on_input_copy = null;
	_pEditBase._on_input_cut = null;
	_pEditBase._on_input_paste = null;

	_pEditBase._on_input_compositionstart = null;
	_pEditBase._on_input_compositionend = null;
	_pEditBase._on_input_compositionupdate = null;

	_pEditBase._on_input_select = null;

	_pEditBase._on_default_input_keyup = nexacro._emptyFn;
	_pEditBase._keyup_process_enter = nexacro._emptyFn;
	_pEditBase._focus_process = nexacro._emptyFn;
	_pEditBase._blur_process = nexacro._emptyFn;
	_pEditBase._mouseup_process = nexacro._emptyFn;
	_pEditBase._mousedown_process = nexacro._emptyFn;

	_pEditBase.onUpdateStyle = nexacro._emptyFn;
	_pEditBase.syncValue = nexacro._emptyFn;
	_pEditBase.insertTabChar = nexacro._emptyFn;
	_pEditBase.applyInputmode = nexacro._emptyFn;
	_pEditBase._changeFocusText = nexacro._emptyFn;

	_pEditBase._setLocale = nexacro._emptyFn;

	_pEditBase._init_eventhandler = function () {
		this._on_input_mousedown = this._on_default_input_mousedown;
		this._on_input_mouseup = this._on_default_input_mouseup;
		this._on_input_mousemove = this._on_default_input_mousemove;
		this._on_input_keydown = this._on_default_input_keydown;
		this._on_input_keypress = this._on_default_input_keypress;
		this._on_input_keyinput = this._on_default_input_keyinput;
		this._on_input_keyup = this._on_default_input_keyup;

		this._on_input_touchstart = this._on_default_input_touchstart;
		this._on_input_touchmove = this._on_default_input_touchmove;
		this._on_input_touchend = this._on_default_input_touchend;

		this._on_input_focus = this._on_default_input_focus;
		this._on_input_blur = this._on_default_input_blur;

		this._on_input_copy = this._on_default_input_copy;
		this._on_input_cut = this._on_default_input_cut;
		this._on_input_paste = this._on_default_input_paste;

		this._on_input_compositionstart = this._on_default_input_compositionstart;
		this._on_input_compositionend = this._on_default_input_compositionend;
		this._on_input_compositionupdate = this._on_default_input_compositionupdate;

		this._on_input_select = this._on_default_input_select;
	};

	_pEditBase._init = function () {
		this._old_text = "";
		this._text = "";
		this._old_value = null;
		this._value = null;
		this._focus_text = "";
		this._focus_value = null;
		this._set_old_prop = false;
		this._old_begin_pos = 0;
		this._old_end_pos = 0;
		this._begin_pos = 0;
		this._end_pos = 0;
		this._input_begin_pos = 0;

		this._accept_focus_event = true;
		this._accept_blur_event = true;

		this._set_timer_by_killfocus = false;

		if (!this._stat_mouse) {
			this._stat_mouse = new nexacro.EditBase.Status("mouse");
		}
		else {
			this._stat_mouse.init();
		}

		if (!this._stat_focus) {
			this._stat_focus = new nexacro.EditBase.Status("focus");
		}
		else {
			this._stat_focus.init();
		}

		if (!this._stat_composition) {
			this._stat_composition = new nexacro.EditBase.CompositionStatus("composition");
		}
		else {
			this._stat_composition.init();
		}

		if (!this._undoStack) {
			this._undoStack = new nexacro.EditBase.UndoStack(this.comp);
		}
		else {
			this._undoStack.init();
		}

		if (!this._textEventInfo) {
			this._textEventInfo = new nexacro.EditBase.TextEventInfo(this.comp);
		}
		else {
			this._textEventInfo.init();
		}
	};

	_pEditBase._destroy = function () {
		this.comp = null;

		this._old_value = null;
		this._value = null;
		this._focus_value = null;

		this._stat_mouse = null;
		this._stat_focus = null;
		this._stat_composition = null;

		if (this._undoStack) {
			this._undoStack._destroy();
			this._undoStack = null;
		}

		if (this._textEventInfo) {
			this._textEventInfo._destroy();
			this._textEventInfo = null;
		}
	};

	_pEditBase._on_getAccessibilityAdditionalLabel = function () {
		var comp = this.comp;
		var input_elem = comp._input_element;

		if (input_elem && input_elem._wantAccessibilityAdditionalLabel) {
			if (!input_elem._wantAccessibilityAdditionalLabel()) {
				return "";
			}

			if (comp.text !== undefined && comp.value !== undefined) {
				return comp.text;
			}
		}

		return "";
	};

	_pEditBase._on_getAccessibilityWholeLabel = function () {
		var comp = this.comp;
		var input_elem = comp._input_element;

		if (input_elem) {
			if (comp.text !== undefined && comp.value !== undefined) {
				return comp.text;
			}
		}

		return "";
	};

	_pEditBase.setPosition = function () {
		var comp = this.comp;
		var elem = comp._input_element;
		var control = comp._control_element;

		var container_width = comp._client_width;
		var container_height = comp._client_height;

		if (elem && elem._handle) {
			if (container_width != 0 && container_height != 0) {
				var p = nexacro._getCachedPaddingObj("0 1 0 1");
				var align = comp.on_find_CurrentStyle_align(comp._pseudo);
				var padding = comp.on_find_CurrentStyle_padding(comp._pseudo);

				var valign = align.valign;
				var halign = align.halign;

				if (valign == "") {
					valign = nexacro.Component._default_left_align.valign;
				}

				elem.setElementPosition(0, 0);
				control.setElementPadding(padding);
				elem.setElementPadding(p);
				elem.setElementSize(container_width, container_height);
				elem.setElementAlignXY(halign, valign);
			}
		}
	};

	_pEditBase.setElementCaretPos = function (start, end, elem) {
		if (elem && elem._type == "date") {
			start = 0;
			end = elem.getElementValue().length;
		}

		this._old_begin_pos = this._begin_pos;
		this._old_end_pos = this._end_pos;

		this._begin_pos = start;
		this._end_pos = end;

		if (!this._is_composition()) {
			this._input_begin_pos = start;
		}

		if (elem) {
			pos = elem.setElementSetSelect(start, end);
		}
	};

	if (nexacro.OS == "iOS") {
		if (nexacro.OSVersion.charAt(0) < 7) {
			_pEditBase.getCompositionData = function (elem) {
				var value = elem.getElementValue();

				var start = this._input_begin_pos;
				var end = value.length - this._imefirsttxt.length;

				var data = value.substr(start, end);

				return data;
			};
		}
		else {
			_pEditBase.getCompositionData = function (elem) {
				var pos = elem.getElementCaretPos();
				if (!pos || pos == -1) {
					return "";
				}

				var value = elem.getElementValue();

				var start = this._input_begin_pos;
				var end = pos.begin - this._input_begin_pos;

				var data = value.substr(start, end);

				return data;
			};
		}
	}
	else {
		_pEditBase.getCompositionData = function (elem) {
			var pos = elem.getElementCaretPos();
			if (!pos || pos == -1) {
				return "";
			}

			var value = elem.getElementValue();

			var start = this._input_begin_pos;
			var end = pos.begin - this._input_begin_pos;

			var data = value.substr(start, end);

			return data;
		};
	}

	_pEditBase.getInsertText = function (elem) {
		var insertText = "";
		var element_text = elem.getElementValue();
		var text = this._text;

		if (!text) {
			text = "";
		}

		if (this._pasteAction || this._keycode == 13 || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
			var len = element_text.length - text.length;
			insertText = element_text.substr(this._begin_pos, len);
		}
		else if (this.getCompositionData(elem)) {
			insertText = this.getCompositionData(elem);
		}
		else {
			insertText = this._stat_composition.getData(elem);
		}

		return insertText;
	};

	_pEditBase.clearBuffer = function (text, begin, end) {
		if (text === null || text === undefined) {
			return;
		}

		var newText = text.substr(0, begin) + text.substr(end, text.length - end);
		this._setText(newText);
		this._setValue(newText);
		this.setElementCaretPos(begin, begin);
	};

	_pEditBase.restoreBuffer = function (text, begin, end) {
		if (text === null || text === undefined) {
			return;
		}

		this._setText(text);
		this._setValue(text);
		this.setElementCaretPos(begin, end);
	};

	_pEditBase.writeBuffer = function (elem) {
		var str = this._text;
		if (str === undefined || str === null) {
			str = "";
		}

		str = str.replace(/\r\n/g, "\n");

		var val = elem.getElementValue();
		val = val.replace(/\r\n/g, "\n");

		if (elem && val != str) {
			elem.setElementValue(str);
		}

		return str;
	};

	_pEditBase.setValue = function (v) {
		var elem = this.comp._input_element;

		if (nexacro._isNull(v) || v === "") {
			this._setText("");
			this._setValue(v);
			this._undoStack.push(v);

			if (elem) {
				if (nexacro.Browser == "Runtime") {
					this.setElementCaretPos(0, 0, elem);
				}
				else {
					this.setElementCaretPos(0, 0);
				}
			}
		}
		else {
			this._setText(v);
			this._setValue(v);
			this._undoStack.push(v, v, this._begin_pos, this._end_pos);
		}

		if (elem) {
			elem.setElementValue(v, true);

			if (nexacro.Browser == "Gecko") {
				elem.setElementSetSelect(this._begin_pos, this._end_pos);
			}
		}
	};

	_pEditBase._on_default_input_mousedown = function (elem, altkey, ctrlkey, shiftkey) {
		this._old_text = this._text;
		this._old_value = this._value;

		var mouse_stat = this._stat_mouse.getCurrentStatus();
		if (mouse_stat == "mousedown") {
			this._is_apply_autoselect = false;
		}

		this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseDown);

		this._mousedown_process(elem);

		if (ctrlkey && !this._is_selected()) {
			this.comp.setSelect();
		}
	};

	_pEditBase._on_default_input_mousemove = function (elem) {
		if (this._text == elem.getElementValue()) {
			this._setCaret(elem);
		}
	};

	_pEditBase._on_default_input_mouseup = function (elem, altkey, ctrlkey, shiftkey) {
		this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseUp);

		this._mouseup_process(elem);

		if (this._is_apply_autoselect) {
			this._is_apply_autoselect = false;
			elem._event_stop = true;
		}

		if (elem.readonly) {
			elem._deleteCaret();
		}
	};

	_pEditBase._on_default_input_touchstart = function (elem) {
		this._old_text = this._text;
		this._old_value = this._value;

		this._mousedown_process(elem);
	};

	_pEditBase._on_default_input_touchmove = function (elem) {
	};

	_pEditBase._on_default_input_touchend = function (elem) {
		this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseUp);
		this._setCaret(elem);

		if (elem.readonly) {
			elem._deleteCaret();
		}
	};

	_pEditBase._on_default_input_select = function (elem) {
		if (this._accept_select_event === false) {
			this._accept_select_event = true;
			return;
		}

		if (nexacro.Browser != "Edge") {
			this._setCaret(elem);
		}

		if (this._text && (this._begin_pos != this._end_pos)) {
			this._select_text = this._text.substring(this._begin_pos, this._end_pos);
		}
	};

	_pEditBase._on_default_input_focus = function (elem, target) {
		var mouseflag = false;
		var mouse_status = this._stat_mouse.getCurrentStatus();
		var focus_status = this._stat_focus.getCurrentStatus();

		if (mouse_status == nexacro.EditBase.Status.MouseDown && focus_status != nexacro.EditBase.Status.Focus) {
			mouseflag = true;
		}

		if (this._accept_focus_event === false) {
			this._accept_focus_event = true;

			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);

			if (!mouseflag && elem.readonly) {
				elem._deleteCaret();
			}

			return;
		}

		this._focus_process(elem, mouseflag);

		if (focus_status != nexacro.EditBase.Status.Focus) {
			if (!this.comp._activate_flag) {
				this._setFocusValue();
			}
		}

		if (mouseflag) {
			if (nexacro.Browser != "Edge" && nexacro.Browser != "IE") {
				elem._event_stop = true;
			}
		}

		if (!this._is_composition()) {
			this._compositionend_value = "";
			this._stat_composition.init();
		}

		this.comp._activate_flag = false;

		if (((nexacro.Browser == "Runtime") || (nexacro.Browser != "Runtime" && this._mouseflag && mouse_stat == "mousedown")) && 
			focus_status != nexacro.EditBase.Status.Focus && 
			this._stat_focus.getCurrentStatus() == nexacro.EditBase.Status.Focus) {
			var win = this.comp._getWindow();
			var focus_idx = win ? win._indexOfCurrentFocusPaths(this.comp) : 0;
			if (focus_idx < 0 && this.comp._is_subcontrol) {
				focus_idx = win ? win._indexOfCurrentFocusPaths(this.comp.parent) : 0;
			}
			if (focus_idx < 0 && !application._is_on_alert) {
				this.comp._on_focus(true);
			}
		}
	};

	_pEditBase._on_default_input_blur = function (elem, target) {
		if ((!this.comp._input_element.getRootWindowHandle()) || (target === elem._handle && elem.password)) {
			return true;
		}

		if (this._accept_blur_event === false) {
			this._accept_blur_event = true;
			return false;
		}

		if (this._is_on_killfocus && this._stat_mouse.getCurrentStatus() === nexacro.EditBase.Status.MouseDown) {
			this._stat_mouse.setStatus(nexacro.EditBase.Status.MouseUp);
		}

		this._blur_process(elem);

		this._stat_focus.setStatus(nexacro.EditBase.Status.Blur);

		return true;
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
		if (nexacro.OSVersion >= 6.0) {
			if (nexacro.BrowserVersion == 10) {
				_pEditBase._on_default_input_keyinput = function (elem) {
					if (this._accept_keyinput_event === false) {
						this._accept_keyinput_event = true;
						return false;
					}

					if (elem.readonly) {
						return false;
					}
					if (!this.comp) {
						return false;
					}

					var comp = this.comp;
					var element_value = elem.getElementValue();
					var editbase_text = this._text;
					var editbase_value = this._value;

					if (!editbase_text) {
						editbase_text = "";
					}
					if (!editbase_value) {
						editbase_value = "";
					}

					if (!elem.usemultiline) {
						editbase_text = editbase_text.replace(/\r\n/g, "");
						editbase_text = editbase_text.replace(/\n/g, "");

						editbase_value = editbase_value.replace(/\r\n/g, "");
						editbase_value = editbase_value.replace(/\n/g, "");
					}

					if (element_value == editbase_text && element_value == editbase_value && (element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
						this._setCaret(elem);
						return false;
					}

					if (element_value == editbase_value && this._is_composition()) {
						return false;
					}

					if (!this._set_old_prop) {
						this._old_text = this._text;
						this._old_value = this._value;
						this._old_begin_pos = this._begin_pos;
						this._old_end_pos = this._end_pos;
					}

					if (this._is_selected() && !this._cutAction) {
						this.clearBuffer(this._text, this._begin_pos, this._end_pos);
						this.syncValue();
						this._set_old_prop = true;

						if (this._pasteAction) {
							this._isPasteActionComplete = false;
						}
						return false;
					}

					if (this._keycode == nexacro.KeyCode_ImeInput && (this._stat_composition.getCurrentStatus() != nexacro.EditBase.Status.CompositionEnd)) {
						var data = this.getCompositionData(elem);
						var pos = elem.getElementCaretPos();
						if (!this._is_composition()) {
							if (data != "　") {
								this._on_input_compositionstart(data);
							}
						}
						else {
							if (this._is_hangul(data)) {
								if (pos.begin != this._begin_pos) {
									var insertText = data.substr(0, 1);

									this._on_input_compositionend(insertText);

									var ret = this._fire_text_event(insertText);

									data = this.getCompositionData(elem);
									if (data.length > 0) {
										this._on_input_compositionstart(data);
									}
								}
								else if (this._compositionend_value === element_value) {
									this._on_input_compositionend(data);
								}
								else {
									this._on_input_compositionupdate(data);
								}
							}
							else {
								this._on_input_compositionupdate(data);
							}
						}
					}
					else if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						if (!this._is_hangul(data)) {
							this._on_input_compositionupdate(data);
						}
						else {
							this._on_input_compositionend(data);
						}
					}

					var insertText = "";

					insertText = this.getInsertText(elem);

					var ret = this._fire_text_event(insertText);

					this._compositionend_value = element_value;

					if (!this._is_composition()) {
						this._compositionend_value = "";
						this._stat_composition.init();
					}

					this._set_old_prop = false;
					this.onUpdateStyle(comp);
					return ret;
				};
			}
			else if (nexacro.BrowserVersion == 9) {
				_pEditBase._on_default_input_keyinput = function (elem) {
					if (this._accept_keyinput_event === false) {
						this._accept_keyinput_event = true;
						return false;
					}

					if (elem.readonly) {
						return false;
					}
					if (!this.comp) {
						return false;
					}

					var comp = this.comp;
					var element_value = elem.getElementValue();
					var editbase_text = this._text;
					var editbase_value = this._value;

					if (!editbase_text) {
						editbase_text = "";
					}
					if (!editbase_value) {
						editbase_value = "";
					}

					if (!elem.usemultiline) {
						editbase_text = editbase_text.replace(/\r\n/g, "");
						editbase_text = editbase_text.replace(/\n/g, "");

						editbase_value = editbase_value.replace(/\r\n/g, "");
						editbase_value = editbase_value.replace(/\n/g, "");
					}

					if (element_value == editbase_text && element_value == editbase_value && (element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
						this._setCaret(elem);
						return false;
					}

					this._old_text = this._text;
					this._old_value = this._value;
					this._old_begin_pos = this._begin_pos;
					this._old_end_pos = this._end_pos;

					if (this._is_selected()) {
						this.clearBuffer(this._text, this._begin_pos, this._end_pos);
						this.syncValue();
					}

					if (this._keycode == nexacro.KeyCode_ImeInput) {
						var data = this.getCompositionData(elem);
						var pos = elem.getElementCaretPos();
						if (!this._is_composition()) {
							if (data != "　") {
								this._on_input_compositionstart(data);
							}
						}
						else {
							if (this._is_hangul(data)) {
								if (pos.begin != this._begin_pos) {
									var insertText = data.substr(0, 1);

									this._on_input_compositionend(insertText);

									var ret = this._fire_text_event(insertText);

									data = this.getCompositionData(elem);

									if (data.length > 0) {
										this._on_input_compositionstart(data);
									}
								}
								else if (this._compositionend_value === element_value) {
									this._on_input_compositionend(data);
								}
								else {
									this._on_input_compositionupdate(data);
								}
							}
							else {
								this._on_input_compositionupdate(data);
							}
						}
					}
					else if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						if (!this._is_hangul(data)) {
							this._on_input_compositionupdate(data);
						}
					}

					var insertText = this.getInsertText(elem);
					var ret = this._fire_text_event(insertText);

					this._compositionend_value = element_value;

					if (!this._is_composition()) {
						this._compositionend_value = "";
						this._stat_composition.init();
					}

					this.onUpdateStyle(comp);
					return ret;
				};
			}
			else {
				_pEditBase._on_default_input_keyinput = function (elem) {
					if (this._accept_keyinput_event === false) {
						this._accept_keyinput_event = true;
						return false;
					}

					if (elem.readonly) {
						return false;
					}
					if (!this.comp) {
						return false;
					}

					var comp = this.comp;
					var element_value = elem.getElementValue();
					var editbase_text = this._text;
					var editbase_value = this._value;

					if (!editbase_text) {
						editbase_text = "";
					}
					if (!editbase_value) {
						editbase_value = "";
					}

					if (!elem.usemultiline) {
						if (typeof (editbase_text) == "string") {
							editbase_text = editbase_text.replace(/\r\n/g, "");
							editbase_text = editbase_text.replace(/\n/g, "");
						}
						if (typeof (editbase_value) == "string") {
							editbase_value = editbase_value.replace(/\r\n/g, "");
							editbase_value = editbase_value.replace(/\n/g, "");
						}
					}

					if (element_value == editbase_text && element_value == editbase_value && (element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
						this._setCaret(elem);
						return false;
					}

					if (!this._set_old_prop) {
						this._old_text = this._text;
						this._old_value = this._value;
						this._old_begin_pos = this._begin_pos;
						this._old_end_pos = this._end_pos;
					}

					if (this._is_selected() && !this._cutAction) {
						this.clearBuffer(this._text, this._begin_pos, this._end_pos);
						this.syncValue();
						this._set_old_prop = true;

						return;
					}

					if (this._keycode == nexacro.KeyCode_ImeInput) {
						var data = this.getCompositionData(elem);
						var pos = elem.getElementCaretPos();

						if (!this._is_composition()) {
							if (data && data.charAt(data.length - 1) != "　") {
								if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
									this._on_input_compositionstart(data);
								}
							}
							else {
								this._on_input_compositionend(data);
							}
						}
						else {
							if (data && data.length > 0) {
								if (this._is_hangul(data)) {
									if (pos.begin != this._begin_pos) {
										var insertText = data.substr(0, 1);

										this._on_input_compositionend(insertText);

										var ret = this._fire_text_event(insertText);

										var newCompositionText = data.substring(1, data.length);
										if (newCompositionText.length > 0) {
											this._on_input_compositionstart(newCompositionText);
										}
									}
									else {
										this._on_input_compositionupdate(data);
									}
								}
								else {
									this._on_input_compositionupdate(data);
								}
							}
							else {
							}
						}
					}
					else if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						if (!this._is_hangul(data)) {
							this._on_input_compositionupdate(data);
						}
					}

					var insertText = this.getInsertText(elem);
					var ret = this._fire_text_event(insertText);

					this._compositionend_value = element_value;
					if (!this._is_composition()) {
						this._compositionend_value = "";
						this._stat_composition.init();
					}

					this._set_old_prop = false;
					this.onUpdateStyle(comp);

					return ret;
				};
			}
		}
		else {
			_pEditBase._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;
					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var comp = this.comp;
				var element_value = elem.getElementValue();
				var editbase_text = this._text;
				var editbase_value = this._value;

				if (!editbase_text) {
					editbase_text = "";
				}
				if (!editbase_value) {
					editbase_value = "";
				}

				if (!elem.usemultiline) {
					editbase_text = editbase_text.replace(/\r\n/g, "");
					editbase_text = editbase_text.replace(/\n/g, "");

					editbase_value = editbase_value.replace(/\r\n/g, "");
					editbase_value = editbase_value.replace(/\n/g, "");
				}

				if (element_value == editbase_text && element_value == editbase_value && (element_value && (comp.maxlength == 0 || comp.maxlength >= element_value.length))) {
					this._setCaret(elem);
					return false;
				}

				this._old_text = this._text;
				this._old_value = this._value;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				if (this._is_selected()) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
				}

				if (this._keycode == nexacro.KeyCode_ImeInput) {
					var data = this.getCompositionData(elem);
					if (!this._is_composition()) {
						if (data != "　") {
							this._on_input_compositionstart(data);
						}
					}
					else {
						if (this._is_hangul(data)) {
							if (this._compositionend_value && (this._compositionend_value.length < element_value.length)) {
								var insertText = data.substr(0, 1);

								this._compositionend_value = element_value.substr(0, element_value.length - 1);
								this._on_input_compositionend(insertText);

								var ret = this._fire_text_event(insertText);
								data = data.substr(1, data.length - 1);

								if (data.length > 0) {
									this._on_input_compositionstart(data);
								}
							}
							else {
								this._on_input_compositionupdate(data);
							}
						}
						else {
							this._on_input_compositionupdate(data);
						}
					}
				}
				else if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					if (!this._is_hangul(data)) {
						this._on_input_compositionupdate(data);
					}
				}

				var insertText = this.getInsertText(elem);
				var ret = this._fire_text_event(insertText);

				this._compositionend_value = element_value;

				if (!this._is_composition()) {
					this._compositionend_value = "";
					this._stat_composition.init();
				}

				this.onUpdateStyle(comp);
				return ret;
			};
		}
	}
	else if (nexacro.OS == "iOS") {
		var ver_arr = nexacro.OSVersion.split(".");
		var major_ver = ver_arr[0];

		if (major_ver < 7) {
			_pEditBase._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;
					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var comp = this.comp;
				var elem_value = elem.getElementValue();
				var base_text = this._text;
				var base_value = this._value;

				if (this._is_composition() && this._imefirsttxt == elem_value && (elem_value && (comp.maxlength == 0 || comp.maxlength >= elem_value.length))) {
					return false;
				}

				this._old_text = this._text;
				this._old_value = this._value;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				if (this._is_selected()) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
				}

				if (this._charcode >= 12593 && this._charcode <= 12643) {
					if (!this._is_composition()) {
						this._imefirsttxt = this._text;
						var data = this.getCompositionData(elem);

						this._on_input_compositionstart(data);
					}
					else {
						var data = this.getCompositionData(elem);

						if (this._compositionend_value && (this._compositionend_value.length < elem_value.length)) {
							var insertText = data.substr(0, 1);
							var newData_len = data.length - 1;

							var composition_front = elem_value.substr(0, this._begin_pos);
							var composition_rear = elem_value.substr(this._begin_pos + newData_len, elem_value.length - 1);

							this._compositionend_value = composition_front + composition_rear;
							this._on_input_compositionend(insertText);

							var ret = this._fire_text_event(insertText);
							data = data.substr(1, data.length - 1);

							if (data.length > 0) {
								this._imefirsttxt = this._compositionend_value;
								this._on_input_compositionstart(data);
							}
						}
						else {
							this._on_input_compositionupdate(data);
						}
					}
				}
				else if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					if (!this._is_hangul(data)) {
						this._on_input_compositionupdate(data);
					}
				}

				var insertText = this.getInsertText(elem);

				var ret = this._fire_text_event(insertText);

				this._compositionend_value = elem_value;

				if (!this._is_composition()) {
					this._compositionend_value = "";
					this._stat_composition.init();
				}

				this.onUpdateStyle(comp);
				return ret;
			};
		}
		else {
			_pEditBase._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;
					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var comp = this.comp;
				var elem_value = elem.getElementValue();
				var pos = elem.getElementCaretPos();
				var base_text = this._text;
				var base_value = this._value;

				if (this._is_composition() && this._imefirsttxt == elem_value && (elem_value && (comp.maxlength == 0 || comp.maxlength >= elem_value.length))) {
					return false;
				}

				this._old_text = this._text;
				this._old_value = this._value;
				this._old_begin_pos = this._begin_pos;
				this._old_end_pos = this._end_pos;

				if (this._is_selected()) {
					this.clearBuffer(this._text, this._begin_pos, this._end_pos);
					this.syncValue();
				}

				if (this._charcode >= 12593 && this._charcode <= 12643) {
					if (!this._is_composition()) {
						this._imefirsttxt = this._text;
						this._input_begin_pos = (!pos || pos == -1) ? 0 : pos.begin - 1;
						var data = this.getCompositionData(elem);
						this._on_input_compositionstart(data);
					}
					else {
						var data = this.getCompositionData(elem);

						if (this._compositionend_value && (this._compositionend_value.length < elem_value.length)) {
							var insertText = data.substr(0, 1);
							var newData_len = data.length - 1;

							var composition_front = elem_value.substr(0, this._begin_pos);
							var composition_rear = elem_value.substr(this._begin_pos + newData_len, elem_value.length - 1);

							this._compositionend_value = composition_front + composition_rear;
							this._on_input_compositionend(insertText);

							var ret = this._fire_text_event(insertText);
							data = data.substr(1, data.length - 1);

							if (data.length > 0) {
								this._imefirsttxt = this._compositionend_value;
								this._on_input_compositionstart(data);
							}
						}
						else {
							this._on_input_compositionupdate(data);
						}
					}
				}
				else {
					var data = this._stat_composition.getData(elem);
					if (this._is_composition() && this._is_hangul(data)) {
						this._on_input_compositionend(data);
					}
				}

				var insertText = this.getInsertText(elem);

				var ret = this._fire_text_event(insertText);

				this._compositionend_value = elem_value;

				if (!this._is_composition()) {
					this._compositionend_value = "";
					this._stat_composition.init();
				}

				this.onUpdateStyle(comp);
				return ret;
			};
		}
	}
	else {
		_pEditBase._on_default_input_keyinput = function (elem) {
			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;
				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var comp = this.comp;
			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var editbase_text = this._text;
			var editbase_value = this._value;

			if (!editbase_text) {
				editbase_text = "";
			}
			if (!editbase_value) {
				editbase_value = "";
			}

			if (!this._is_composition() && elem_value == editbase_text && elem_value == editbase_value && (elem_value && (comp.maxlength == 0 || comp.maxlength >= elem_value.length))) {
				this._setCaret(elem);
				this.onUpdateStyle(comp);
				return false;
			}

			this._old_text = this._text;
			this._old_value = this._value;
			this._old_begin_pos = this._begin_pos;
			this._old_end_pos = this._end_pos;

			if (this._is_selected()) {
				this.clearBuffer(this._text, this._begin_pos, this._end_pos);
				this.syncValue();
			}

			if (this._check_backspace(elem)) {
				this.restoreBuffer(elem_value, elem_pos.begin, elem_pos.end);
			}

			var insertText = this.getInsertText(elem);

			var ret = this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}

			this.onUpdateStyle(comp);
			return ret;
		};
	}

	_pEditBase._on_input_keyinput_after = function () {
		if (this._isPasteActionComplete) {
			this._pasteAction = false;
			this._cutAction = false;
		}
	};

	_pEditBase._on_default_input_copy = function (elem) {
		if (application._input_paste_comp) {
			application._input_paste_comp = null;
		}
	};

	_pEditBase._on_default_input_cut = function (elem) {
		this._cutAction = true;

		var pos = elem.getElementCaretPos();
		var val = elem.getElementValue();

		if (!pos || pos == -1) {
			this._undoStack.push(val, val, 0, 0);
		}
		else {
			this._begin_pos = pos.begin;
			this._end_pos = pos.end;
			this._undoStack.push(val, val, pos.begin, pos.end);
		}

		if (application._input_paste_comp) {
			application._input_paste_comp = null;
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis._on_input_keyinput(elem);
			});
		}
	};

	_pEditBase._on_default_input_paste = function (elem) {
		if (application._input_paste_comp) {
			application._input_paste_comp._setFocus();
		}

		this._pasteAction = true;

		var pos = elem.getElementCaretPos();
		var val = elem.getElementValue();

		if (!pos || pos == -1) {
			this._undoStack.push(val, val, 0, 0);
		}
		else {
			this._undoStack.push(val, val, pos.begin, pos.end);
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				if (!(pThis._ctrlkey && pThis._keycode == 86)) {
					pThis.setElementCaretPos(pThis._old_begin_pos, pThis._old_begin_pos);
				}
				pThis._on_input_keyinput(elem);
			});
		}
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
		_pEditBase._on_default_input_compositionstart = function (data) {
			var elem = this.comp._input_element;
			var val = elem.getElementValue();

			if (data == "" || this._is_hangul(data)) {
				if (this._compositionstart_value.length != val.length) {
					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						var compositionend_char = val.substr(this._input_begin_pos, 1);

						this._on_default_input_compositionend(compositionend_char);
					}
				}
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
		_pEditBase._on_default_input_compositionstart = function (data) {
			this._compositionstart_value = this._text;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else if (nexacro.Browser == "Safari") {
		_pEditBase._on_default_input_compositionstart = function (data) {
			if (this._is_compositionfocus) {
				var elem = this.comp._input_element;

				this._is_compositionfocus = false;
				this._accept_focus_event = false;
				this._accept_blur_event = false;

				elem.setElementBlur();
				elem.setElementFocus();
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else if (nexacro.OS == "Android") {
		_pEditBase._on_default_input_compositionstart = function (data) {
			if (this._keycode == 0) {
				this._input_begin_pos = this.comp._input_element.getElementCaretPos().begin;
			}
			else {
				this._input_begin_pos = this._begin_pos;
			}
			this._compositionstart_value = this._text;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}
	else {
		_pEditBase._on_default_input_compositionstart = function (data) {
			this._input_begin_pos = this._begin_pos;
			this._compositionstart_value = this._text;
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionStart, data);
		};
	}

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			var elem = this.comp._input_element;
			var val = elem.getElementValue();
			var pos = elem.getElementCaretPos();

			if (data == "" || this._is_hangul(data)) {
				if (this._compositionstart_value.length != val.length) {
					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate) {
						this._on_default_input_compositionstart(data);
					}
				}

				if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionStart) {
					this._input_begin_pos = pos.end - data.length;
					this._compositionstart_value = val;
				}
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else if (nexacro.Browser == "Safari") {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			if (this._is_compositionfocus) {
				var elem = this.comp._input_element;

				this._is_compositionfocus = false;
				this._accept_focus_event = false;
				this._accept_blur_event = false;

				elem.setElementBlur();
				elem.setElementFocus();
			}

			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}
	else {
		_pEditBase._on_default_input_compositionupdate = function (data) {
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionUpdate, data);
		};
	}

	if (nexacro.Browser == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11)) {
		_pEditBase._on_default_input_compositionend = function (data) {
			this._compositionstart_value = "";
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);

			if (this._bStatChangeOnly) {
				return;
			}

			var elem = this.comp._input_element;
			var val = elem.getElementValue();
			var pos = elem.getElementCaretPos();
			var pThis = this;

			var front_val = val.substr(0, this._input_begin_pos);
			var input_val = val.substr(this._input_begin_pos, 1);
			var rear_val = val.substr(pos.end, val.length - pos.end);
			var newText = front_val + input_val + rear_val;

			if (data == "" || this._is_hangul(data)) {
				if (this._accept_keyinput_event) {
					this._fire_text_event(input_val);
					this._text = newText;
					this._value = newText;
					return true;
				}
				else {
					this._accept_keyinput_event = true;
				}
			}
		};
	}
	else {
		_pEditBase._on_default_input_compositionend = function (data) {
			this._compositionstart_value = "";
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, data);
		};
	}

	_pEditBase._fire_text_event = function (chartext) {
		var ret = true;
		var bInsert = true;
		var bCut = false;
		var bCancel = false;
		var bFilled = false;

		var comp = this.comp;
		var elem = comp._input_element;

		var text = this._cutAction ? this._old_text : this._text;
		var value = this._value;
		var autoskip = comp.autoskip;
		var text_info = this._textEventInfo;
		var newText = this._get_newText_from_text_event(chartext);

		if (!text) {
			text = "";
		}

		var begin_pos = this._input_begin_pos;
		var end_pos = begin_pos + chartext.length;
		var old_chartext = chartext;
		var evt_chartext = chartext;

		var strFront = newText.substr(0, begin_pos);
		var strRear = newText.substr(end_pos, newText.length - end_pos);
		var preImeText = this._stat_composition.getPreviousData();
		var postImeText = this._stat_composition.getData();
		var preCharEventText = strFront + strRear;

		this._initinfo_from_text_event(chartext, newText, begin_pos, end_pos);

		if (this._check_filterable(chartext)) {
			chartext = this.applyInputmode(chartext);

			chartext = this._apply_inputfilter(chartext);

			chartext = this._apply_inputtype(chartext);

			if (old_chartext.length > 0 && chartext.length == 0) {
				bCancel = true;
				chartext = this._select_text;
			}

			this._select_text = "";

			if (!bCancel) {
				bInsert = this._check_maxlength_from_text_event(chartext);
				if (!bInsert) {
					chartext = "";
					newText = comp.text;
				}
				else {
					chartext = this._apply_maxlength_from_text_event(chartext);

					if (chartext != old_chartext) {
						bCut = true;
					}
				}
			}

			newText = strFront + chartext + strRear;
			if (comp.maxlength > 0 && newText.length > comp.maxlength) {
				newText = newText.substring(0, comp.maxlength);
			}
		}

		ret = this._after_filterprocess_from_text_event(chartext, newText, bInsert, bCut);

		if (this._is_composition()) {
			evt_chartext = "";
		}

		text_info.setTextInfo(evt_chartext, text, ret.newText, preImeText, postImeText, preCharEventText, ret.bInsert, ret.bCut);

		if (!bCancel) {
			ret = comp._on_fire_textchangeEventSet(text_info);

			if (ret.bTextchangeRet) {
				if (ret.fireCancharEvent) {
					if (ret.bCancahrchangeRet && ret.bOncharRet) {
						this._setValue(text_info.posttext);
						this.syncValue();

						if (!this._is_undo) {
							var undo_pos = begin_pos + chartext.length;
							this._undoStack.push(this._value, this._value, undo_pos, undo_pos);
						}
					}
					else {
						if (this._is_hangul(chartext)) {
							this._cancel_event_char_from_text_event(begin_pos, begin_pos);
						}
						else {
							this._setText(this._old_value);
							this._setValue(this._old_value);
							this.syncValue();

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}

						return ret;
					}
				}

				if (text_info.pretext != text_info.posttext) {
					this._setText(text_info.posttext);
					this.syncValue();

					if (ret.bChangeInputValue) {
						elem.setElementValue(text_info.posttext);
					}

					comp.on_fire_ontextchanged(comp, this._old_text, this._text);
				}

				if (evt_chartext != text_info.chartext) {
					begin_pos += text_info.chartext.length;
					elem.setElementValue(text_info.posttext);
					this.setElementCaretPos(begin_pos, begin_pos, elem);
				}
				else {
					begin_pos += chartext.length;
					this._after_eventset_fired_from_text_event(begin_pos);
				}
			}
			else {
				this._cancel_event_textchange_from_text_event(begin_pos, end_pos);
			}
		}

		if (!ret.bInsert) {
			this._not_insert_from_text_event(begin_pos, end_pos);
		}

		if (ret.bCut) {
			this._cut_from_text_event(begin_pos, end_pos);
		}

		if (bCancel) {
			this._cancel_from_text_event(newText, begin_pos, end_pos);
		}

		if (autoskip) {
			this._autoskip_from_text_event(old_chartext);
		}

		return ret;
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		if (nexacro.OSVersion >= 6.0) {
			if (nexacro.SystemLang == "ja") {
				if (nexacro.BrowserVersion >= 9) {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					_pEditBase._cancel_event_char_from_text_event = nexacro._emptyFn;

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						if (!this._is_on_killfocus) {
							if (!this._set_timer_by_killfocus) {
								this._accept_keyinput_event = false;
								this._accept_focus_event = false;
								this._accept_blur_event = false;

								elem.setElementBlur();
								if (!this._is_on_killfocus) {
									elem.setElementFocus();
								}

								this._accept_keyinput_event = false;
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}
						else {
							this._set_timer_by_killfocus = true;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(pThis._text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._value);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}
						else {
							this._set_timer_by_killfocus = true;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(pThis._text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}
						else {
							this._set_timer_by_killfocus = true;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(pThis._text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
				else {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						if (!chartext && !this._is_composition() && !this._is_undo) {
							this._text = this._value;
							return {
								newText : this._value, 
								bInsert : false, 
								bCut : false
							};
						}
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					_pEditBase._cancel_event_char_from_text_event = nexacro._emptyFn;

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition()) {
							this._on_input_compositionend("");

							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						if (!this._is_on_killfocus) {
							if (!this._set_timer_by_killfocus) {
								this._accept_focus_event = false;
								this._accept_blur_event = false;

								elem.setElementBlur();

								elem.setElementValue(this._text);

								nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
									pThis._accept_focus_event = false;
									pThis.setElementCaretPos(begin_pos, begin_pos, elem);
								});
							}
						}
						else {
							this._set_timer_by_killfocus = true;

							var text = this._text;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._value);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementValue(this._text);

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis._accept_focus_event = false;
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							this._set_timer_by_killfocus = true;

							var text = this._text;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (!this._is_on_killfocus) {
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementValue(this._text);

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis._accept_focus_event = false;
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							this._set_timer_by_killfocus = true;

							var text = this._text;

							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								elem.setElementValue(text);
								pThis._set_timer_by_killfocus = false;
							});
						}
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
			}
			else {
				if (nexacro.BrowserVersion >= 9) {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					if (nexacro.BrowserVersion == 11) {
						_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
							var elem = this.comp._input_element;

							this._old_begin_pos = begin_pos;
							this._old_end_pos = end_pos;

							var elem = this.comp._input_element;

							this._setText(this._old_value);
							this._setValue(this._old_value);
							this.syncValue();

							this._accept_keyinput_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();

							var pThis = this;
							var oldValue = this._old_value;
							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis._setText(oldValue);
								pThis._setValue(oldValue);
								pThis.syncValue();

								elem.setElementValue(oldValue);
								pThis.setElementCaretPos(begin_pos, end_pos, elem);
							});
						};
					}
					else {
						_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
							this._old_begin_pos = begin_pos;
							this._old_end_pos = begin_pos;

							this._cancel_from_text_event(this._old_value, begin_pos, begin_pos);
						};
					}

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					if (nexacro.Browser == "Edge") {
						_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
							var elem = this.comp._input_element;

							if (this._is_composition()) {
								this._accept_keyinput_event = false;

								this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						};
					}
					else {
						_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
							var elem = this.comp._input_element;

							if (this._is_composition()) {
								this._accept_keyinput_event = false;
								this._accept_focus_event = false;
								this._accept_blur_event = false;

								this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

								elem.setElementBlur();
								elem.setElementFocus();
							}

							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						};
					}

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var pThis = this;
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._text);
						this.syncValue();

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

							elem.setElementBlur();
							elem.setElementFocus();
						}

						if (this._pasteAction && (nexacro.BrowserVersion == 9 || nexacro.BrowserVersion == 10)) {
							elem.setElementValue(this._text);
							nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
								pThis.setElementCaretPos(begin_pos, begin_pos, elem);
							});
						}
						else {
							elem.setElementValue(this._text);
							this.setElementCaretPos(begin_pos, begin_pos, elem);
						}
					};

					_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (nexacro.BrowserVersion == 11) {
							if (this._is_composition()) {
								this._accept_keyinput_event = false;

								this._bStatChangeOnly = true;
								this._on_input_compositionend("");
								this._bStatChangeOnly = false;
							}
						}
						else {
							this._accept_keyinput_event = false;

							this._on_input_compositionend("");
						}

						this._accept_focus_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
				else {
					_pEditBase._get_newText_from_text_event = function (chartext) {
						var elem = this.comp._input_element;

						if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
							var newText = this._compositionend_value;
						}
						else {
							var newText = elem.getElementValue();
						}

						return newText;
					};

					_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

					_pEditBase._check_maxlength_from_text_event = function (chartext) {
						return this._check_maxlength();
					};

					_pEditBase._apply_maxlength_from_text_event = function (chartext) {
						return this._apply_maxlength(chartext);
					};

					_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
						return {
							newText : newText, 
							bInsert : bInsert, 
							bCut : bCut
						};
					};

					_pEditBase._after_eventset_fired_from_text_event = function (pos) {
						this.setElementCaretPos(pos, pos);
					};

					_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
						this._old_begin_pos = begin_pos;
						this._old_end_pos = end_pos;

						var elem = this.comp._input_element;

						this._setText(this._old_value);
						this._setValue(this._old_value);
						this.syncValue();

						this._accept_keyinput_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();

						var pThis = this;
						var oldValue = this._old_value;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							pThis._setText(oldValue);
							pThis._setValue(oldValue);
							pThis.syncValue();

							elem.setElementValue(oldValue);
							pThis.setElementCaretPos(begin_pos, end_pos, elem);
						});
					};

					_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._old_text);
						this._setValue(this._old_value);
						this.syncValue();

						if (this._is_composition()) {
							this._on_input_compositionend("");

							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					};

					_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
						var elem = this.comp._input_element;

						this._setText(this._text);
						this._setValue(this._value);
						this.syncValue();

						if (this._is_composition()) {
							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					};

					_pEditBase._cancel_from_text_event = function (newText) {
						var elem = this.comp._input_element;

						this._setText(newText);
						this._setValue(newText);
						this.syncValue();

						if (this._is_composition()) {
							this._on_input_compositionend("");

							this._accept_keyinput_event = false;
							this._accept_focus_event = false;
							this._accept_blur_event = false;

							elem.setElementBlur();
							elem.setElementFocus();
						}

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);
					};

					_pEditBase._autoskip_from_text_event = function (chartext) {
						var bFilled = this._check_maxlength();
						if (!bFilled) {
							this._apply_autoskip();
						}
					};
				}
			}
		}
		else {
			if (nexacro.SystemLang == "ja") {
				_pEditBase._get_newText_from_text_event = function (chartext) {
					var elem = this.comp._input_element;

					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
						var newText = this._compositionend_value;
					}
					else {
						var newText = elem.getElementValue();
					}

					return newText;
				};

				_pEditBase._initinfo_from_text_event = function (chartext, text, begin, end) {
					if (chartext && !this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd) {
						this._value = text.substr(0, begin) + text.substr(end, text.length - end);
					}
				};
				_pEditBase._check_maxlength_from_text_event = function (chartext) {
					return this._check_maxlength();
				};

				_pEditBase._apply_maxlength_from_text_event = function (chartext) {
					return this._apply_maxlength(chartext);
				};

				_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
					if (!chartext && !this._is_composition() && !this._is_undo) {
						this._text = this._value;
						return {
							newText : this._value, 
							bInsert : false, 
							bCut : false
						};
					}
					return {
						newText : newText, 
						bInsert : bInsert, 
						bCut : bCut
					};
				};

				_pEditBase._after_eventset_fired_from_text_event = function (pos) {
					var elem = this.comp._input_element;

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(pos, pos, elem);
					}
				};

				_pEditBase._cancel_event_char_from_text_event = nexacro._emptyFn;

				_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._old_text);
					this._setValue(this._old_value);
					this.syncValue();

					if (this._is_composition()) {
						this._accept_keyinput_event = false;
						this._accept_focus_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();
						elem.setElementFocus();
					}

					elem.setElementValue(this._text);
					this.setElementCaretPos(begin_pos, begin_pos, elem);
				};

				_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._accept_blur_event = false;
					this._accept_focus_event = false;

					elem.setElementBlur();

					elem.setElementValue(this._text);

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
				};

				_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._text);
					this._setValue(this._value);
					this.syncValue();

					this._accept_blur_event = false;
					this._accept_focus_event = false;

					elem.setElementBlur();

					elem.setElementValue(this._text);

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
				};

				_pEditBase._cancel_from_text_event = function (newText, begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(newText);
					this._setValue(newText);
					this.syncValue();

					this._accept_blur_event = false;
					this._accept_focus_event = false;

					elem.setElementBlur();

					elem.setElementValue(this._text);

					if (!this._is_on_killfocus) {
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
				};

				_pEditBase._autoskip_from_text_event = function (chartext) {
					var bFilled = this._check_maxlength();
					if (!bFilled) {
						this._apply_autoskip();
					}
				};
			}
			else {
				_pEditBase._get_newText_from_text_event = function (chartext) {
					var elem = this.comp._input_element;

					if (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
						var newText = this._compositionend_value;
					}
					else {
						var newText = elem.getElementValue();
					}

					return newText;
				};

				_pEditBase._initinfo_from_text_event = function (chartext, text, begin, end) {
					if (chartext && !this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd) {
						this._value = text.substr(0, begin) + text.substr(end, text.length - end);
					}
				};
				_pEditBase._check_maxlength_from_text_event = function (chartext) {
					return this._check_maxlength();
				};

				_pEditBase._apply_maxlength_from_text_event = function (chartext) {
					return this._apply_maxlength2(chartext);
				};

				_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
					return {
						newText : newText, 
						bInsert : bInsert, 
						bCut : bCut
					};
				};

				_pEditBase._after_eventset_fired_from_text_event = function (pos) {
					if (!this._is_on_killfocus) {
						this.setElementCaretPos(pos, pos);
					}
				};

				_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
					this._old_begin_pos = begin_pos;
					this._old_end_pos = end_pos;

					var elem = this.comp._input_element;

					this._setText(this._old_value);
					this._setValue(this._old_value);
					this.syncValue();

					this._accept_keyinput_event = false;
					this._accept_blur_event = false;

					elem.setElementBlur();

					var pThis = this;
					var oldValue = this._old_value;
					nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
						pThis._setText(oldValue);
						pThis._setValue(oldValue);
						pThis.syncValue();

						elem.setElementValue(oldValue);
						pThis.setElementCaretPos(begin_pos, end_pos, elem);
					});
				};

				_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._old_text);
					this._setValue(this._old_value);
					this.syncValue();

					if (this._is_composition()) {
						this._accept_keyinput_event = false;
						this._accept_focus_event = false;
						this._accept_blur_event = false;

						elem.setElementBlur();
						elem.setElementFocus();
					}

					elem.setElementValue(this._text);
					this.setElementCaretPos(begin_pos, begin_pos, elem);
				};

				_pEditBase._not_insert_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					if (!this._is_on_killfocus) {
						this._accept_keyinput_event = false;
						this._accept_blur_event = false;
						this._accept_focus_event = false;

						this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
					else {
						var pThis = this;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							elem.setElementValue(pThis._text);
						});
					}
				};

				_pEditBase._cut_from_text_event = function (begin_pos, end_pos) {
					var elem = this.comp._input_element;

					this._setText(this._text);
					this._setValue(this._value);
					this.syncValue();

					if (!this._is_on_killfocus) {
						this._accept_blur_event = false;
						this._accept_focus_event = false;

						this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(begin_pos, begin_pos, elem);
					}
					else {
						var pThis = this;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							elem.setElementValue(pThis._text);
						});
					}
				};

				_pEditBase._cancel_from_text_event = function (newText) {
					var elem = this.comp._input_element;

					this._setText(newText);
					this._setValue(newText);
					this.syncValue();

					if (!this._is_on_killfocus) {
						this._accept_blur_event = false;
						this._accept_focus_event = false;

						this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");

						elem.setElementBlur();
						elem.setElementFocus();

						elem.setElementValue(this._text);
						this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
					}
					else {
						var pThis = this;
						nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
							elem.setElementValue(pThis._text);
						});
					}
				};

				_pEditBase._autoskip_from_text_event = function (chartext) {
					var bFilled = this._check_maxlength();
					if (!bFilled) {
						if (!(chartext != "" && !this._is_hangul(chartext))) {
							this._accept_keyinput_event = false;
						}

						this._apply_autoskip();
					}
				};
			}
		}
	}
	else if (nexacro.Browser == "Chrome") {
		_pEditBase._get_newText_from_text_event = function (chartext) {
			var elem = this.comp._input_element;
			var newText = elem.getElementValue();

			return newText;
		};

		_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

		_pEditBase._check_maxlength_from_text_event = function (chartext) {
			return this._check_maxlength();
		};

		_pEditBase._apply_maxlength_from_text_event = function (chartext) {
			return this._apply_maxlength(chartext);
		};

		_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
			return {
				newText : newText, 
				bInsert : bInsert, 
				bCut : bCut
			};
		};

		_pEditBase._after_eventset_fired_from_text_event = function (pos) {
			this.setElementCaretPos(pos, pos);
		};

		_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			this._setText(this._old_value);
			this._setValue(this._old_value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(begin_pos, end_pos, elem);
		};

		_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._not_insert_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cut_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(this._text);
			this._setValue(this._value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cancel_from_text_event = function (newText) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(newText);
			this._setValue(newText);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);

			if (this._is_selected()) {
				this._select_text = this._text.substring(this._begin_pos, this._end_pos);
			}
		};

		_pEditBase._autoskip_from_text_event = function (chartext) {
			var bFilled = this._check_maxlength();
			if (!bFilled) {
				this._apply_autoskip();
			}
		};
	}
	else if (nexacro.Browser == "Gecko") {
		_pEditBase._get_newText_from_text_event = function (chartext) {
			var elem = this.comp._input_element;
			var newText = elem.getElementValue();

			return newText;
		};

		_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

		_pEditBase._check_maxlength_from_text_event = function (chartext) {
			return this._check_maxlength();
		};

		_pEditBase._apply_maxlength_from_text_event = function (chartext) {
			return this._apply_maxlength(chartext);
		};

		_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
			return {
				newText : newText, 
				bInsert : bInsert, 
				bCut : bCut
			};
		};

		_pEditBase._after_eventset_fired_from_text_event = function (pos) {
			this.setElementCaretPos(pos, pos);
		};

		_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			this._old_begin_pos = begin_pos;
			this._old_end_pos = end_pos;

			this._cancel_from_text_event(this._old_value);
		};

		_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			elem.setElementBlur();
			elem.setElementFocus();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._not_insert_from_text_event = function () {
			var elem = this.comp._input_element;

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			if (this._is_composition()) {
				elem.setElementBlur();
				elem.setElementFocus();
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cut_from_text_event = function () {
			var elem = this.comp._input_element;

			this._setText(this._text);
			this._setValue(this._value);
			this.syncValue();

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			if (this._is_composition()) {
				elem.setElementBlur();
				elem.setElementFocus();
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cancel_from_text_event = function (newText) {
			if (!this._accept_cut_process) {
				this._accept_cut_process = true;
				return;
			}

			var elem = this.comp._input_element;

			this._setText(newText);
			this._setValue(newText);
			this.syncValue();

			this._accept_focus_event = false;
			this._accept_blur_event = false;

			if (this._is_composition()) {
				this._accept_keyinput_event = false;
				this._accept_cut_process = false;

				elem.setElementBlur();
				elem.setElementFocus();
			}

			if (this._old_begin_pos != this._old_end_pos) {
				this._accept_select_event = false;
			}

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);

			if (this._is_selected()) {
				this._select_text = this._text.substring(this._begin_pos, this._end_pos);
			}
			this._accept_cut_process = true;
		};

		_pEditBase._autoskip_from_text_event = function (chartext) {
			var bFilled = this._check_maxlength();
			if (!bFilled) {
				this._apply_autoskip();
			}
		};
	}
	else {
		if (nexacro.OS == "iOS") {
			_pEditBase._get_newText_from_text_event = function (chartext) {
				var elem = this.comp._input_element;
				var newText = elem.getElementValue();

				if (this._is_hangul(chartext) && this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionEnd && (this._compositionend_value && this._compositionend_value.length > 0)) {
					newText = this._compositionend_value;
				}

				return newText;
			};
		}
		else {
			_pEditBase._get_newText_from_text_event = function (chartext) {
				var elem = this.comp._input_element;
				var newText = elem.getElementValue();

				return newText;
			};
		}

		_pEditBase._initinfo_from_text_event = nexacro._emptyFn;

		_pEditBase._check_maxlength_from_text_event = function (chartext) {
			return this._check_maxlength();
		};

		_pEditBase._apply_maxlength_from_text_event = function (chartext) {
			return this._apply_maxlength(chartext);
		};

		_pEditBase._after_filterprocess_from_text_event = function (chartext, newText, bInsert, bCut) {
			return {
				newText : newText, 
				bInsert : bInsert, 
				bCut : bCut
			};
		};

		_pEditBase._after_eventset_fired_from_text_event = function (pos) {
			this.setElementCaretPos(pos, pos);
		};

		if (nexacro.Browser == "Safari") {
			_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
				var elem = this.comp._input_element;

				this._setText(this._old_value);
				this._setValue(this._old_value);
				this.syncValue();

				this._accept_focus_event = false;
				this._accept_blur_event = false;
				this._accept_keyinput_event = false;

				elem.setElementBlur();
				elem.setElementValue("");
				elem.setElementFocus();

				elem.setElementValue(this._text);
				this.setElementCaretPos(begin_pos, end_pos, elem);
			};
		}
		else if (nexacro.Browser == "MobileSafari") {
			_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
				var elem = this.comp._input_element;

				this._setText(this._old_value);
				this._setValue(this._old_value);
				this.syncValue();

				this._accept_keyinput_event = false;

				this._on_default_input_compositionend("");

				this.setElementCaretPos(0, 0, elem);
				elem.setElementValue("", true);

				this._old_begin_pos = begin_pos;
				this._old_end_pos = end_pos;
				this._begin_pos = begin_pos;
				this._end_pos = end_pos;
				this._input_begin_pos = begin_pos;

				var pThis = this;
				var oldValue = this._old_value;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis._setText(oldValue);
					pThis._setValue(oldValue);
					pThis.syncValue();

					pThis._old_value = oldValue;
					pThis._old_text = oldValue;

					elem.setElementValue(oldValue, true);
					pThis.setElementCaretPos(begin_pos, end_pos, elem);

					pThis._compositionend_value = elem.getElementValue();
				});
			};
		}
		else {
			_pEditBase._cancel_event_char_from_text_event = function (begin_pos, end_pos) {
				var elem = this.comp._input_element;

				this._old_begin_pos = begin_pos;
				this._old_end_pos = end_pos;

				this._cancel_from_text_event(this._old_value);
			};
		}

		_pEditBase._cancel_event_textchange_from_text_event = function (begin_pos, end_pos) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._not_insert_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._filteredtext = true;
			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._cut_from_text_event = function () {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._filteredtext = true;
			this._setText(this._text);
			this._setValue(this._value);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
		};

		_pEditBase._cancel_from_text_event = function (newText) {
			var elem = this.comp._input_element;

			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
				elem.setInputElementCompositeClear();
			}

			this._filteredtext = true;
			this._setText(newText);
			this._setValue(newText);
			this.syncValue();

			elem.setElementValue(this._text);
			this.setElementCaretPos(this._old_begin_pos, this._old_end_pos, elem);
		};

		_pEditBase._autoskip_from_text_event = function (chartext) {
			var bFilled = this._check_maxlength();
			if (!bFilled) {
				this._apply_autoskip();
			}
		};
	}
	;

	_pEditBase._is_composition = function () {
		return (this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionStart || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.CompositionUpdate);
	};

	_pEditBase._is_selected = function () {
		return this._begin_pos != this._end_pos;
	};

	_pEditBase._is_cleared = function (elem) {
		var cur_text = elem.getElementValue();
		if (cur_text == "" && cur_text != this._text) {
			return true;
		}
		return false;
	};

	_pEditBase._check_filterable = function (data) {
		if (data == null) {
			return false;
		}

		if (this._is_hangul(data) || !this._is_composition()) {
			return true;
		}

		return false;
	};

	_pEditBase._set_enable = function (v) {
		if (this.comp && this.comp._input_element) {
			this.comp._input_element.setElementEnable(v);
		}
	};

	_pEditBase._setText = function (v) {
		if (!nexacro._isNull(v)) {
			if (!(typeof v == "string")) {
				v = nexacro._toString(v);
			}
			v = v.replace(/\r\n/g, "\n");
		}
		this._text = v;
	};

	_pEditBase._setValue = function (v) {
		if (!nexacro._isNull(v)) {
			if (!(typeof v == "string")) {
				v = nexacro._toString(v);
			}
		}
		this._value = v;
	};

	_pEditBase._getText = function () {
		return this._text;
	};

	_pEditBase._getValue = function () {
		return this._value;
	};

	_pEditBase._getFocusText = function () {
		return this._focus_text;
	};

	_pEditBase._getFocusValue = function () {
		return this._focus_value;
	};

	_pEditBase._setCaret = function (elem) {
		var pos = elem.getElementCaretPos();

		if (pos && pos != -1) {
			this._old_begin_pos = this._begin_pos;
			this._old_end_pos = this._end_pos;

			this._begin_pos = pos.begin;
			this._end_pos = pos.end;

			if (!this._is_composition()) {
				this._input_begin_pos = pos.begin;
			}
		}
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		_pEditBase._apply_autoselect = function (elem) {
			var comp = this.comp;

			if (comp.autoselect) {
				var text = this._select_text = this._text;
				this.setElementCaretPos(0, text.length, elem);
				this.onUpdateStyle(comp);
			}
		};
	}
	else if (nexacro.OS == "Android") {
		_pEditBase._apply_autoselect = function (elem) {
			var comp = this.comp;

			if (comp.autoselect) {
				var pThis = this;
				var text = this._select_text = this._text;
				this._is_apply_autoselect = true;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis.setElementCaretPos(0, text.length, elem);
				}, 0);
			}
		};
	}
	else {
		_pEditBase._apply_autoselect = function (elem, mflag) {
			var comp = this.comp;

			if (comp.autoselect) {
				var text = this._select_text = this._text;
				this._is_apply_autoselect = true;


				this.setElementCaretPos(0, text.length, elem);
			}
		};
	}

	if (nexacro.Browser == "Edge" || nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari" || nexacro.Browser == "IE") {
		_pEditBase._apply_autoskip = function () {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis.comp.on_apply_autoskip();
			}, 0);
		};
	}
	else {
		_pEditBase._apply_autoskip = function () {
			var comp = this.comp;
			comp.on_apply_autoskip();
		};
	}

	_pEditBase.applyInputmode = function (v) {
		if (!v) {
			return v;
		}

		var gbn = this.comp.inputmode;

		if (gbn) {
			switch (gbn.toLowerCase()) {
				case "upper":
					v = v.toUpperCase();
					break;
				case "lower":
					v = v.toLowerCase();
					break;
				default:
					break;
			}
		}
		return v;
	};

	_pEditBase._setFocusValue = function () {
		this._focus_text = this._text;
		this._focus_value = this._value;
	};

	_pEditBase._calcCaret = function (pos, halign, pretext, posttext) {
		if (pos && pos != -1) {
			var begin = pos.begin;

			var pre_len = pretext.length;
			var post_len = posttext.length;

			if (pre_len > post_len) {
				var diff_len = pre_len - post_len;
				var is_odd = diff_len % 2 ? true : false;

				if (halign == "center") {
					if (is_odd) {
						var post_caret = begin - diff_len;

						if (post_caret < 0) {
							begin = 0;
						}
						else if (post_caret >= post_len) {
							begin = post_len;
						}
						else {
							begin = post_caret + 1;
						}
					}
					else {
						var correct_caret = diff_len / 2;
						var post_caret = begin - correct_caret;

						if (post_caret <= 0) {
							begin = 0;
						}
						else if (post_caret >= post_len) {
							begin = post_len;
						}
						else {
							begin = post_caret;
						}
					}
				}
				else if (halign == "right") {
					if ((begin - diff_len) <= 0) {
						begin = 0;
					}
					else {
						begin -= diff_len;
					}
				}
			}
			else if (pre_len < post_len) {
				begin = pos.begin;
			}
		}
		else {
			var begin = 0;
		}

		return {
			begin : begin, 
			end : begin
		};
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
		_pEditBase._apply_style = function (elem) {
			var comp = this.comp;
			if (comp && comp._is_created) {
				var bWidthChange = (elem.width <= 0) ? false : true;
				var cur_width = elem.width;

				elem.setElementSize((cur_width > 0) ? cur_width = cur_width - 1 : cur_width, elem.height);

				nexacro.OnceCallbackTimer.callonce(this.comp, function () {
					elem.setElementSize(bWidthChange ? cur_width + 1 : cur_width, elem.height);
				}, 0);
			}
		};
	}
	else {
		_pEditBase._apply_style = nexacro._emptyFn;
	}

	_pEditBase._apply_elementtype = function (elem) {
		if (elem && !elem.password) {
			elem.setElementInputType(this.comp.inputtype);
		}
	};

	_pEditBase._check_backspace = function (elem) {
		var elem_value = elem.getElementValue();
		if (elem_value.length == (this._text.length - 1)) {
			if (this._keycode == 0) {
				if (!this._cutAction && !this._pasteAction && !this._is_composition()) {
					return true;
				}
			}
		}

		return false;
	};

	_pEditBase._setAccessibilityNotifyLabel = function () {
		var comp = this.comp;
		if (comp) {
			comp._refreshAccessibilityValue();
			var accessibility = comp.on_find_CurrentStyle_accessibility(comp._pseudo);
			var label = comp._getAccessibilityLabel(accessibility);
			if (comp.value == null && comp.displaynulltext.length > 0) {
				label = label + " " + comp.displaynulltext;
				comp._setAccessibilityLabel(label);
			}
			return label;
		}
		return null;
	};

	_pEditBase._setAccessibilityNotifyLabel = function () {
		var comp = this.comp;
		if (comp) {
			comp._refreshAccessibilityValue();
			var accessibility = comp.on_find_CurrentStyle_accessibility(comp._pseudo);
			var label = comp._getAccessibilityLabel(accessibility);
			if (comp.value == null && comp.displaynulltext.length > 0) {
				label = label + " " + comp.displaynulltext;
				comp._setAccessibilityLabel(label);
			}
			return label;
		}
		return null;
	};

	_pEditBase._setAccessibilityNotifyLabel = function () {
		var comp = this.comp;
		if (comp) {
			comp._refreshAccessibilityValue();
			var accessibility = comp.on_find_CurrentStyle_accessibility(comp._pseudo);
			var label = comp._getAccessibilityLabel(accessibility);
			if (comp.value == null && comp.displaynulltext.length > 0) {
				label = label + " " + comp.displaynulltext;
				comp._setAccessibilityLabel(label);
			}
			return label;
		}
		return null;
	};

	delete _pEditBase;
	_pEditBase = null;

	nexacro.EditNormal = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}

		this._pre_char = "";

		this._typeRegex = undefined;
		this._typeRegex1 = undefined;
	};

	_pEditNormal = nexacro._createPrototype(nexacro.EditBase, nexacro.EditNormal);
	nexacro.EditNormal.prototype = _pEditNormal;

	_pEditNormal._type_name = "EditNormal";

	_pEditNormal._filterRegexMap = {
		alpha : "a-zA-Z", 
		comma : ",", 
		digit : "0-9", 
		symbol : "!\"#$%&'()*\\/;:<=>?@\\[\\\\\\]\\^_`{|}~'\\\\\\u20a9", 
		sign : "+\\-", 
		space : " \t", 
		dot : "."
	};

	_pEditNormal._typeRegexMap = {
		alpha : "a-zA-Z", 
		comma : ",", 
		digit : "0-9", 
		dot : ".", 
		english : "a-zA-Z", 
		symbol : "!\"#$%&+,.'()*\\-/;:<=>?@[\\\\\\]\\^_`{|}~'\\u20a9", 
		number : "0-9\\-.,", 
		numberandenglish : "0-9\\-.,\\a-zA-Z", 
		sign : "+\\-", 
		space : " \t", 
		half : "\\uff61-\\uff9f\\uffe8-\\uffee\\!\"#$%&'()*+,\\-./;:<=>?@[\\\\\\]\\^_`{|}~'\\a-zA-Z\\0-9+", 
		full : "\\uff01-\\uff60\\uffe0-\\uffe6"
	};

	_pEditNormal._destroy = function () {
		this._filterRegexMap = null;
		this._typeRegexMap = null;

		this._typeRegex = null;
		this._typeRegex1 = null;

		nexacro.EditBase.prototype._destroy.call(this);
	};

	_pEditNormal.getWCharLen = function (v) {
		var c = v.charCodeAt(0);

		if (((c & 0xff80) == 0) || c == 0x20a9) {
			return 1;
		}
		else if ((c & 0xff00) < 0x0800) {
			return 2;
		}
		else {
			return 3;
		}
	};

	_pEditNormal._is_hangul = function (v) {
		var r = new RegExp("[\\uac00-\\ud7af\\u3130-\\u318f\\u1100-\\u11ff]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal._is_english = function (v) {
		var r = new RegExp("[\\u0041-\\u007a]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal._is_half_japaness = function (v) {
		var r = new RegExp("[\\uff61-\\uff9f]");
		if (r.test(v)) {
			return true;
		}

		return false;
	};

	_pEditNormal.setInputfilter = function (strInputfilter) {
		var arr = strInputfilter.split(",");
		var buffer = "";
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var regex = this._filterRegexMap[arr[i]];
			if (regex) {
				buffer += regex;
			}
		}
		if (buffer.length) {
			this._filterRegex = new RegExp("[" + buffer + "]");
		}
		else {
			this._filterRegex = undefined;
		}
	};

	_pEditNormal.setInputType = function (v) {
		var arr = v.split(/\s*,\s*/);
		var buffer = "";
		var len = arr.length;
		for (var i = 0; i < len; i++) {
			var regex = this._typeRegexMap[arr[i]];
			if (regex) {
				buffer += regex;
			}
		}

		if (buffer.length) {
			this._typeRegex = new RegExp("[" + buffer + "]");
			if (v.indexOf("full") != -1) {
				var f = this._typeRegexMap["half"];
				this._typeRegex1 = new RegExp("[" + f + "]");
			}
		}
		else {
			this._typeRegex = undefined;
			this._typeRegex1 = undefined;
		}
	};

	_pEditNormal.syncValue = function () {
		var comp = this.comp;
		var elem = comp._input_element;

		comp.value = this._value;

		if (comp.password) {
			comp.text = this._text.replace(/./gi, "*");
			if (elem) {
				elem.setElementPassword(comp.password);
			}
		}
		else {
			comp.text = this._text;
		}
	};

	_pEditNormal.setSelectText = function (elem, v) {
		if (v && v.length > 0) {
			var comp = this.comp;
			var start = this._begin_pos !== undefined ? this._begin_pos : 0;
			var end = this._end_pos !== undefined ? this._end_pos : 0;

			if (start == end) {
				return "";
			}

			var curTxt = this._text;
			if (comp.maxlength && !((+comp.maxlength) != (+comp.maxlength))) {
				var ret = this.getLength(elem, curTxt);
				if (comp.maxlength <= ret) {
					return "";
				}
			}
			var curArr = curTxt.split("");
			var ret = [];
			var c = "";

			for (var i = 0, n = v.length; i < n; i++) {
				c = v.charAt(i);

				if (this._filterRegex) {
					if (this._filterRegex.test(c)) {
						continue;
					}
				}
				if (this._typeRegex) {
					if (!this._typeRegex.test(c)) {
						if (comp.inputtype == "full") {
							if (this.getWCharLen(c) == 1 || this._typeRegex1.test(c)) {
								continue;
							}
						}
						else {
							continue;
						}
					}

					if (comp.inputtype != "full" && this.getWCharLen(c) > 1) {
						continue;
					}
				}
				ret.push(c);
			}

			var selText = comp.getSelectedText();
			var str = ret.join("");
			if (str.length > 0) {
				var newText = curTxt.substring(0, start) + str + curTxt.substr(end);
				if (this._text != newText) {
					this._setText(newText);

					this.writeBuffer(elem);
					this._setValue(this._text);
					this.syncValue();

					this._begin_pos = start;
					this._end_pos = start + str.length;

					elem.setElementSetSelect(this._begin_pos, this._end_pos);
				}

				return selText;
			}
		}
		return "";
	};

	_pEditNormal.applyInputmode = function (v) {
		if (!v) {
			return v;
		}

		var gbn = this.comp.inputmode;
		var text = "";
		var i = 0;

		if (gbn) {
			switch (gbn.toLowerCase()) {
				case "upper":
					{

						for (i = 0; i < v.length; i++) {
							var c = v.charAt(i);
							var len = this.getWCharLen(c);
							if (len == 1) {
								c = c.toUpperCase();
							}

							text += c;
						}
					}
					break;
				case "lower":
					{

						for (i = 0; i < v.length; i++) {
							var c = v.charAt(i);
							var len = this.getWCharLen(c);
							if (len == 1) {
								c = c.toLowerCase();
							}

							text += c;
						}
					}
					break;
				default:
					{

						text = v;
					}
					break;
			}
		}
		return text;
	};

	_pEditNormal.setLengthunit = function (v) {
		this._lengthunit = v;
	};

	_pEditNormal.getLength = function (elem, str, bStr, checkLen, unitGbn) {
		if (str === undefined) {
			return 0;
		}

		if (unitGbn === undefined) {
			unitGbn = this._lengthunit;
		}
		if (bStr) {
			if (unitGbn == "utf8") {
				return this.utf8ByteCount(elem, str, bStr, checkLen);
			}
			else if (unitGbn == "ascii") {
				return this.asciiByteCount(elem, str, bStr, checkLen);
			}
			else {
				var comp = this.comp;

				if (checkLen === undefined) {
					checkLen = comp.maxlength;
				}
				var ret = str;
				if (checkLen < str.length) {
					ret = ret.substring(0, checkLen);
				}
				return {
					"len" : str.length, 
					"str" : ret
				};
			}
		}
		else {
			if (unitGbn == "utf8") {
				return this.utf8ByteCount(elem, str);
			}
			else if (unitGbn == "ascii") {
				return this.asciiByteCount(elem, str);
			}
			else {
				return str.length;
			}
		}
	};

	_pEditNormal.utf8Len = function (codePoint) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			throw new Error("Illegal argument: " + codePoint);
		}
		if (codePoint < 0) {
			throw new Error("Illegal argument: " + codePoint);
		}
		if (codePoint <= 0x7F) {
			return 1;
		}
		if (codePoint <= 0x7FF) {
			return 2;
		}
		if (codePoint <= 0xFFFF) {
			return 3;
		}
		if (codePoint <= 0x1FFFFF) {
			return 4;
		}
		if (codePoint <= 0x3FFFFFF) {
			return 5;
		}
		if (codePoint <= 0x7FFFFFFF) {
			return 6;
		}
		throw new Error("Illegal argument: " + codePoint);
	};

	_pEditNormal.isHighSurrogate = function (codeUnit) {
		return codeUnit >= 0xD800 && codeUnit <= 0xDBFF;
	};

	_pEditNormal.isLowSurrogate = function (codeUnit) {
		return codeUnit >= 0xDC00 && codeUnit <= 0xDFFF;
	};

	_pEditNormal.toCodepoint = function (highCodeUnit, lowCodeUnit) {
		if (!this.isHighSurrogate(highCodeUnit)) {
			throw new Error("Illegal argument: " + highCodeUnit);
		}
		if (!this.isLowSurrogate(lowCodeUnit)) {
			throw new Error("Illegal argument: " + lowCodeUnit);
		}
		highCodeUnit = (0x3FF & highCodeUnit) << 10;
		var u = highCodeUnit | (0x3FF & lowCodeUnit);
		return u + 0x10000;
	};

	_pEditNormal.utf8ByteCount = function (elem, str, bRetStr, checkLen) {
		if (str === undefined) {
			return 0;
		}

		var count = 0;

		if (bRetStr) {
			var comp = this.comp;

			if (checkLen === undefined) {
				checkLen = comp.maxlength;
			}
			var stopPos = str.length;
			for (var i = 0; i < str.length; i++) {
				var ch = str.charCodeAt(i);
				if (this.isHighSurrogate(ch)) {
					var high = ch;
					var low = str.charCodeAt(++i);
					count += this.utf8Len(this.toCodepoint(high, low));
				}
				else {
					count += this.utf8Len(ch);
				}
				if (checkLen == count) {
					stopPos = i;
					break;
				}
				else if (checkLen < count) {
					stopPos = i - 1;
					break;
				}
			}
			return {
				"len" : count, 
				"str" : str.substring(0, stopPos + 1)
			};
		}

		for (var i = 0; i < str.length; i++) {
			var ch = str.charCodeAt(i);

			if (this.isHighSurrogate(ch)) {
				var high = ch;
				var low = str.charCodeAt(++i);
				count += this.utf8Len(this.toCodepoint(high, low));
			}
			else {
				count += this.utf8Len(ch);
			}
		}
		return count;
	};

	_pEditNormal.asciiByteCount = function (elem, str, bRetStr, checkLen) {
		if (str === undefined) {
			return 0;
		}

		var i, j = 0, val;
		if (bRetStr) {
			var comp = this.comp;

			if (checkLen === undefined) {
				checkLen = comp.maxlength;
			}
			var stopPos = str.length;
			for (i = 0; i < str.length; i++) {
				val = str.charCodeAt(i);
				if (val > 255) {
					j++;
					if (checkLen >= j) {
						stopPos = i - 1;
					}
				}
				j++;
				if (checkLen >= j) {
					stopPos = i;
				}
			}
			return {
				"len" : j, 
				"str" : str.substring(0, stopPos + 1)
			};
		}
		else {
			for (i = 0; i < str.length; i++) {
				val = str.charCodeAt(i);
				if (val > 255) {
					j++;
				}
				j++;
			}
			return j;
		}
	};

	_pEditNormal.deleteChar = function (bBack) {
		var text = this._text ? this._text : "";

		var begin_pos = this._begin_pos;
		var end_pos = this._end_pos;

		if (bBack) {
			if (begin_pos == end_pos) {
				begin_pos--;
			}
		}
		else {
			if (begin_pos == end_pos) {
				end_pos++;
			}
		}

		var strFront = text.substr(0, begin_pos);
		var strRear = text.substr(end_pos, text.length - end_pos);
		var newText = strFront + strRear;

		this._setText(newText);
		this._setValue(newText);
		this.setElementCaretPos(begin_pos, begin_pos);
	};

	_pEditNormal._on_default_input_keydown = function (elem, keyCode, altkey, ctrlkey, shiftkey) {
		var comp = this.comp;
		if (!comp) {
			return false;
		}

		var readonly = comp.readonly;

		var ret = true;

		if (readonly == true) {
			this.onUpdateStyle(comp);
			if (ctrlkey && keyCode == 67 || ctrlkey && keyCode == 65) {
				return true;
			}

			return false;
		}

		if (this._check_maxlength()) {
			this._setCaret(elem);
		}

		if (keyCode == nexacro.KeyCode_ImeInput) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				if (nexacro.OSVersion < 6.0 && !this._is_composition()) {
					this._input_begin_pos = this._old_begin_pos;
				}
			}
		}
		else {
			if (this._is_composition() && (keyCode == 8 || keyCode == 46 || keyCode == 32 || (keyCode >= 33 && keyCode <= 40))) {
				if (this._is_hangul(this.getCompositionData(elem))) {
					this._on_input_compositionend("");
					this._stat_composition.init();
					this._compositionend_value = "";
				}
			}

			if (keyCode == 9) {
				if (this._is_composition()) {
					var data = this.getCompositionData(elem);
					this._on_input_compositionend(data);
					this._fire_text_event(data);
				}

				if (comp.acceptstab || (ctrlkey && !comp.acceptstab)) {
					this.insertTabChar(elem);
					this._on_input_keyinput(elem);

					elem._event_stop = true;
					return false;
				}
			}

			if (ctrlkey && (keyCode == 90)) {
				this._is_undo = true;
				this._undoStack.doUndo();
				this._setCaret(elem);
				this._on_input_keyinput(elem);
				this._is_undo = false;

				elem._event_stop = true;
				return false;
			}
			else if (ctrlkey && (keyCode == 89)) {
				this._is_undo = true;
				this._undoStack.doRedo();
				this._setCaret(elem);
				this._on_input_keyinput(elem);
				this._is_undo = false;

				elem._event_stop = true;
				return false;
			}
		}

		if (keyCode == 229) {
			this._accept_select_event = false;
		}

		this.onUpdateStyle(comp);
		this._keycode = keyCode;
		this._altkey = altkey;
		this._ctrlkey = ctrlkey;
		this._shiftkey = shiftkey;
	};

	_pEditNormal._on_default_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey) {
		var k = charCode || keyCode;
		var ret = true;
		var bEvtRet;
		var bFireEvt = false;
		var bPrevent = false;
		var bMaxlength = false;

		var comp = this.comp;
		var cur_text = elem.getElementValue();
		var text = this._text ? this._text : "";
		var text_info = this._textEventInfo;

		var begin_pos = this._input_begin_pos;
		var end_pos = this._end_pos;
		var undo_pos = begin_pos;

		this._charcode = charCode;

		if (!comp) {
			return false;
		}

		if (elem.readonly) {
			if (k == nexacro.Event.KEY_BACKSPACE) {
				elem._event_stop = true;
			}
			return false;
		}

		if (k == nexacro.Event.KEY_BACKSPACE || (k == nexacro.Event.KEY_DELETE && k == this._keycode) || (nexacro.Browser == "MobileSafari" && k == 127)) {
			this.deleteChar(k == 8 ? true : false);
			this._select_text = "";

			text_info.setTextInfo("", text, this._text, "", "", text);
			undo_pos = this._begin_pos;
			bFireEvt = true;
		}
		else if (k != nexacro.KeyCode_ImeInput && k != nexacro.Event.KEY_ENTER && charCode != 0) {
			if (elem.password && elem.maxlength > 0) {
				var chartext = String.fromCharCode(k);
				var old_chartext = chartext;

				chartext = this.applyInputmode(chartext);

				chartext = this._apply_inputfilter(chartext);

				chartext = this._apply_inputtype(chartext);

				if (old_chartext != chartext && chartext.length == 0) {
					bFireEvt = false;
				}
				else {
					var strFront = text.substr(0, begin_pos);
					var strRear = text.substr(end_pos, text.length - end_pos);

					var preCharEventText = strFront + strRear;
					var newText = strFront + chartext + strRear;

					text_info.setTextInfo("", text, newText, "", "", text);
					undo_pos = begin_pos + text_info.chartext.length;

					if (newText.length > elem.maxlength) {
						bMaxlength = true;
					}
					bFireEvt = true;
					if (nexacro.Browser == "MobileSafari") {
						this._accept_keyinput_event = false;
					}
				}

				if ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && keyCode == 27) {
					if (cur_text != text) {
						text_info.setTextInfo("", text, cur_text, "", "", text);
						bFireEvt = true;
					}
				}
			}
		}

		if (bFireEvt) {
			bEvtRet = comp.on_fire_ontextchange(text_info);

			if (bEvtRet) {
				bEvtRet = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext);

				if (bEvtRet) {
					bEvtRet = comp.on_fire_onchar(text_info);

					if (bEvtRet) {
						if (bMaxlength) {
							bEvtRet = false;
						}
						else if (text_info.pretext != text_info.posttext) {
							this._setText(text_info.posttext);
							this._setValue(text_info.posttext);
							this.setElementCaretPos(this._begin_pos, this._begin_pos);
							this.syncValue();

							if (!this._is_undo) {
								this._undoStack.push(this._value, this._text, undo_pos, undo_pos);
							}

							comp._textchanging = true;
							comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
							comp._textchanging = false;
						}
						else {
							ret = false;
							bPrevent = true;
						}
					}
				}
			}

			if (!bEvtRet) {
				ret = false;
				bPrevent = true;

				this._setText(text);
				this._setValue(text);
				this.syncValue();

				this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);
			}
		}
		else if ((nexacro.OS == "iOS" && ((this.comp.inputtype == "number" && !(keyCode == nexacro.Event.KEY_ENTER)) || (charCode >= 12593 && charCode <= 12643))) || keyCode == nexacro.Event.KEY_SPACE) {
			bPrevent = this._check_keypressPrevent(keyCode);
			if (bPrevent) {
				ret = false;
			}
		}

		if (bPrevent) {
			elem._event_stop = true;
		}

		this.onUpdateStyle(this.comp);
		return ret;
	};

	_pEditNormal._on_default_input_keyup = function (elem, keycode, altkey, ctrlkey, shiftkey) {
		var comp = this.comp;
		var k = keycode;
		var curTxt = this._val;
		var pos = elem.getElementCaretPos();

		this._accept_select_event = true;
		this._altkey = altkey;
		this._ctrlkey = ctrlkey;
		this._shiftkey = shiftkey;

		if (!shiftkey && (k >= 37 && k <= 40)) {
			this._select_text = "";
		}

		if ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && nexacro.BrowserVersion >= 9 && (k == 8 || k == 46)) {
			this._text = elem.getElementValue();
		}

		if ((k == 0 || k == 13) || (ctrlkey && k == 90)) {
			if (!curTxt || (curTxt && !this._is_hangul(curTxt.charAt(this._begin_pos)))) {
				if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
					if (this._is_composition()) {
						var data = this.getCompositionData(elem);
						this._on_input_compositionend(data);

						this._fire_text_event(data);
						this.onUpdateStyle(this.comp);
					}
				}
			}
		}

		if (k == 13) {
			this._keyup_process_enter(elem);
		}

		if (k == 27) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				if (this._is_composition()) {
					var data = this._stat_composition.getData();

					if (this._is_hangul(data)) {
						this._on_input_compositionend("");
					}
					else {
						this._on_input_compositionend("");
						data = "";
					}
					this._fire_text_event(data);
				}
			}
		}

		if (k == 8) {
			if ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && nexacro.OSVersion >= 6.0) {
				if (this._is_composition() && (pos.begin != this._begin_pos)) {
					if ((this._compositionstart_value == this._text) && (this.getCompositionData(elem) == "")) {
						this._on_input_compositionend("");
						this._fire_text_event("");
					}
				}
			}
			else {
				if (this._is_composition()) {
					if ((this._compositionstart_value == this._text) && (this.getCompositionData(elem) == "")) {
						this._on_input_compositionend("");
						this._fire_text_event("");
					}
				}
			}
		}

		if (nexacro.Browser == "IE" && nexacro.OSVersion < 6.0) {
			var data = this.getCompositionData(elem);
			if ((keycode == 121 || keycode == 120) && this._is_composition() && !this._is_hangul(data)) {
				this._on_input_compositionupdate(data);
			}
			else {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
					pThis._setCaret(elem);
				}, 0);
			}
		}
		else if (nexacro.OS == "iOS") {
			if (this._filteredtext) {
				this._filteredtext = false;
				this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
			}
			else {
				this._setCaret(elem);
			}
		}
		else {
			var bInsert = this._check_maxlength_from_text_event();

			if (!bInsert) {
				var maxlength = this.comp.maxlength;
				if (maxlength && this._text.length > maxlength) {
					if (!(this._is_composition() && !this._is_hangul(this.getCompositionData(elem)))) {
						var text = this._text.substr(0, maxlength);

						elem.setElementValue(text);
					}
				}
			}

			this._setCaret(elem);
		}

		if (!this._is_composition()) {
			this._compositionend_value = "";
			this._stat_composition.init();
		}

		this._charcode = 0;
	};

	_pEditNormal._check_maxlength = function () {
		var comp = this.comp;
		var elem = comp._input_element;
		var value = this._value;

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			if (value.length) {
				var str = this.getLength(elem, value, true);

				if (comp.maxlength <= str.len) {
					return false;
				}
			}
		}
		return true;
	};

	_pEditNormal._check_maxlength2 = function (insertText) {
		if (!insertText || insertText.length == 0) {
			return true;
		}

		var comp = this.comp;
		var elem = comp._input_element;
		var value = elem.getElementValue();

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			var begin_pos = this._input_begin_pos;
			var end_pos = begin_pos + insertText.length;
			value = value.substr(0, begin_pos) + value.substr(end_pos, value.length - end_pos);

			if (value.length) {
				var str = this.getLength(elem, value, true);

				if (comp.maxlength <= str.len) {
					return false;
				}
			}
		}
		return true;
	};

	_pEditNormal._apply_maxlength = function (insertText) {
		var comp = this.comp;
		var elem = comp._input_element;
		var text = insertText;
		var value = this._value;

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			var str = this.getLength(elem, value, true);

			if (comp.maxlength > str.len) {
				text = this.getLength(elem, insertText, true, comp.maxlength - str.len).str;
			}
		}

		return text;
	};

	_pEditNormal._apply_maxlength2 = function (insertText) {
		var comp = this.comp;
		var elem = comp._input_element;
		var text = insertText;
		var value = elem.getElementValue();

		if (!value) {
			value = "";
		}

		if (comp.maxlength > 0) {
			var begin_pos = this._input_begin_pos;
			var end_pos = begin_pos + insertText.length;
			value = value.substr(0, begin_pos) + value.substr(end_pos, value.length - end_pos);

			var str = this.getLength(elem, value, true);

			if (comp.maxlength > str.len) {
				text = this.getLength(elem, insertText, true, comp.maxlength - str.len).str;
			}
		}

		return text;
	};

	_pEditNormal._apply_inputfilter = function (v) {
		if (!v) {
			v = "";
		}

		var len = v ? v.length : 0;
		var valArr = v.split("");
		var text = [];

		for (var i = 0; i < len; i++) {
			var c = valArr[i];

			if (this._filterRegex) {
				if (this._filterRegex.test(c)) {
					continue;
				}
			}
			text.push(c);
		}

		text = text.join("");

		return text;
	};

	_pEditNormal._apply_inputtype = function (v) {
		if (!v) {
			v = "";
		}

		v = v.replace(/\r\n/g, "\n");

		var inputtype = this.comp.inputtype;
		var len = v ? v.length : 0;
		var valArr = v.split("");
		var text = [];

		for (var i = 0; i < len; i++) {
			var c = valArr[i];

			if (c != '\n' && this._typeRegex) {
				if (!this._typeRegex.test(c)) {
					if (inputtype.indexOf("full") != -1) {
						if (this.getWCharLen(c) == 1 || (this._typeRegex1 && this._typeRegex1.test(c))) {
							continue;
						}
					}
					else {
						continue;
					}
				}
				if ((inputtype.indexOf("full") == -1) && this.getWCharLen(c) > 1) {
					if (!(this._is_half_japaness(c))) {
						continue;
					}
				}
			}
			text.push(c);
		}

		text = text.join("");

		return text;
	};

	_pEditNormal._focus_process = function (elem, mflag) {
		var comp = this.comp;
		var win = comp._getWindow();
		var cur_text = elem.getElementValue();

		this._setText(cur_text);

		if (win && win._keydown_element && comp._setcaret) {
			this.setElementCaretPos(comp._caret_pos.begin, comp._caret_pos.end, elem);
			comp._setcaret = false;
		}

		if (nexacro.Browser == "Safari") {
			if (this._is_composition()) {
				this._is_compositionfocus = true;
			}
			else {
				this._is_compositionfocus = false;
			}
		}

		this._apply_autoselect(elem, mflag);
		this._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
	};

	_pEditNormal._blur_process = function (elem) {
		if (this._is_composition()) {
			if (this.getCompositionData(elem)) {
				var data = this.getCompositionData(elem);
			}
			else {
				var data = this._stat_composition.getData(elem);
				if (data == elem.getElementValue()) {
					data = "";
				}
			}
			var proc_fire_text_event = this._on_input_compositionend(data);

			elem.setInputElementCompositeClear();

			if (!proc_fire_text_event) {
				this._fire_text_event(data);
			}

			this._stat_composition.init();
			this._compositionend_value = "";

			this.onUpdateStyle(this.comp);
		}

		this._setCaret(elem);

		if (nexacro.Browser == "Gecko") {
			if (this._is_composition()) {
				if (this._is_on_killfocus) {
					elem.setElementBlur();
				}
			}
		}
	};

	_pEditNormal._mouseup_process = function (elem) {
		var caret = elem.getElementCaretPos();

		if (this._is_composition() || (caret.begin != this._begin_pos && caret.end != this._end_pos)) {
			elem._useTimer = false;
			this._setCaret(elem);
		}
		else if (nexacro._isDesktop() && nexacro.Browser == "Runtime") {
			elem._useTimer = false;
			this._setCaret(elem);

			if (this._text) {
				if (this._begin_pos == this._end_pos) {
					this._select_text = "";
				}
				else {
					this._select_text = this._text.substring(this._begin_pos, this._end_pos);
				}
			}
		}
		else {
			elem._useTimer = true;

			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
					var cur_text = elem.getElementValue();
					if (cur_text == "" && cur_text != pThis._text) {
						pThis._setText(cur_text);
						pThis._setValue(cur_text);
						pThis.syncValue();
					}
				}

				pThis._setCaret(elem);

				if (pThis._text) {
					if (pThis._begin_pos == pThis._end_pos) {
						pThis._select_text = "";
					}
					else {
						pThis._select_text = pThis._text.substring(pThis._begin_pos, pThis._end_pos);
					}
				}
			});
		}
	};

	_pEditNormal._mousedown_process = function (elem) {
		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (this._is_composition()) {
				var data = this._stat_composition.getData();

				this._on_input_compositionend(data);
				this._fire_text_event(data);

				this._compositionend_value = "";
				this._stat_composition.init();
			}
		}
	};

	_pEditNormal._keyup_process_enter = function (elem) {
		var focus_text = this._getFocusText();
		var focus_val = this._getFocusValue();
		var cur_text = this._getText();
		var cur_val = this._getValue();

		if (focus_text != cur_text) {
			this.comp._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);
		}
	};

	_pEditNormal._check_keypressPrevent = function (keyCode) {
		var ret = false;
		var chartext = String.fromCharCode(keyCode);
		var old_chartext = chartext;

		chartext = this._apply_inputfilter(chartext);

		chartext = this._apply_inputtype(chartext);

		if (old_chartext != chartext) {
			ret = true;
		}

		return ret;
	};

	delete _pEditNormal;
	_pEditNormal = null;

	nexacro.MultilineEdit = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}
	};

	_pMultilineEdit = nexacro._createPrototype(nexacro.EditNormal, nexacro.MultilineEdit);
	nexacro.MultilineEdit.prototype = _pMultilineEdit;

	_pMultilineEdit._type_name = "MultilineEdit";

	_pMultilineEdit.setPosition = function () {
		var comp = this.comp;
		var elem = comp._input_element;
		var control = comp._control_element;

		var container_width = comp._client_width;
		var container_height = comp._client_height;
		if (container_width == 0 || container_height == 0) {
			return;
		}

		if (elem && elem._handle) {
			var p = nexacro._getCachedPaddingObj("0 1 0 1");
			var align = comp.on_find_CurrentStyle_align(comp._pseudo);
			var padding = comp.on_find_CurrentStyle_padding(comp._pseudo);

			var valign = nexacro.Component._default_textarea_align.valign;
			var halign = align.halign;

			elem.setElementPosition(0, 0);
			elem.setElementSize(container_width, container_height);
			if (padding && (padding.top || padding.right || padding.bottom || padding.left)) {
				elem.setElementPadding(padding);
			}
			else {
				elem.setElementPadding(p);
			}
			elem.setElementAlignXY(halign, valign);
		}
	};

	_pMultilineEdit.onUpdateStyle = function (comp) {
		this.setPosition();

		if (nexacro.SystemLang == "ja") {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
				comp._update_scroll();
			}
		}

		nexacro.OnceCallbackTimer.callonce(comp, function () {
			comp._update_scroll();
		});
	};

	_pMultilineEdit.onResetHScroll = function (comp) {
		comp._reset_hscroll();
	};

	_pMultilineEdit.insertTabChar = function (elem) {
		var newText = elem.getElementValue();
		var begin_pos = this._begin_pos;
		var end_pos = this._end_pos;

		var strFront = newText.substr(0, this._begin_pos);
		var strRear = newText.substr(this._end_pos, newText.length - this._end_pos);
		newText = strFront + this._strTab + strRear;

		begin_pos = begin_pos + this._strTab.length;

		this._text = newText;
		elem.setElementValue(newText);
		this.setElementCaretPos(begin_pos, begin_pos, elem);
	};

	_pMultilineEdit._keyup_process_enter = function (elem) {
		return;
	};

	_pMultilineEdit._on_getAccessibilityAdditionalLabel = function (direction) {
		var comp = this.comp;
		var input_elem = comp._input_element;

		if (input_elem && input_elem._wantAccessibilityAdditionalLabel) {
			if (!input_elem._wantAccessibilityAdditionalLabel()) {
				return "";
			}

			if (comp.text !== undefined && comp.value !== undefined) {
				if (!direction) {
					direction = 0;
				}
				return comp._getCaretLineString(null, direction);
			}
		}

		return "";
	};

	delete _pMultilineEdit;
	_pMultilineEdit = null;

	nexacro.EditMaskString = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}

		this._mask_PassWDST = "{";
		this._mask_PassWDED = "}";
		this._mask_MARKCHAR = "_";
		this._mask_PASSCHAR = "*";
		this._chkEmpty = String.fromCharCode(0x08);

		this._isPWInput = false;
		this._cPassChar = null;
		this._cMaskChar = null;

		this._value = null;
		this._text = "";
		this._strMaskedValue = [];

		this._bufMask = [];
		this._bufPass = [];
		this._strMask = [];
	};

	_pEditMaskString = nexacro._createPrototype(nexacro.EditBase, nexacro.EditMaskString);
	nexacro.EditMaskString.prototype = _pEditMaskString;

	_pEditMaskString._type_name = "EditMaskString";

	_pEditMaskString._maskChr = {
		"@" : /[\u0020-\u00ff]/, 
		"#" : /[0-9]/, 
		"*" : /[a-zA-Z]/, 
		"9" : /[a-zA-Z0-9]/, 
		"A" : /[A-Z]/, 
		"a" : /[a-z]/, 
		"Z" : /[A-Z0-9]/, 
		"z" : /[a-z0-9]/, 
		"!" : /[0-9]/, 
		"~" : /[uAC00-\uFAFF]/, 
		"^" : /[uAC00-\uFAFF]/
	};

	_pEditMaskString._on_default_input_compositionstart = nexacro._emptyFn;
	_pEditMaskString._on_default_input_compositionupdate = nexacro._emptyFn;
	_pEditMaskString._on_default_input_compositionend = nexacro._emptyFn;

	_pEditMaskString._init = function () {
		nexacro.EditBase.prototype._init.call(this);

		if (!this._cPassChar) {
			this._cPassChar = this._mask_PASSCHAR;
		}
		if (!this._cMaskChar) {
			this._cMaskChar = this._mask_MARKCHAR;
		}

		this._value = null;
		this._text = "";
		this._strMaskedValue = [];

		this._bufMask = [];
		this._bufPass = [];
		this._strMask = [];
	};

	_pEditMaskString._destroy = function () {
		this._cPassChar = null;
		this._cMaskChar = null;

		this._strMaskedValue = null;

		this._bufMask = null;
		this._bufPass = null;
		this._strMask = null;
		this._maskChr = null;

		nexacro.EditBase.prototype._destroy.call(this);
	};

	_pEditMaskString.setMask = function (strMask) {
		this._init();

		var bQuote = false;
		var bEscape = false;
		var bPasswd = false;

		var nLen = strMask.length;
		var cMasks = strMask.split("");
		var defs = this._maskChr;
		var Mask = 0;
		var i = 0;
		var nIdx = 0;

		for (i = 0; i < nLen; i++) {
			Mask = 0;

			if (bEscape == false && cMasks[i] == "'") {
				if (bQuote == false) {
					bQuote = true;
				}
				else {
					bQuote = false;
				}
				continue;
			}

			if (bEscape == false && cMasks[i] == "\\" && !bQuote) {
				bEscape = true;
				continue;
			}
			else if (bEscape) {
				bEscape = false;
			}
			else if (bQuote == false) {
				if (defs[cMasks[i]]) {
					Mask = defs[cMasks[i]];
				}
				if (cMasks[i] == this._mask_PassWDST) {
					bPasswd = true;
					continue;
				}
				if (cMasks[i] == this._mask_PassWDED) {
					bPasswd = false;
					continue;
				}
			}
			this._bufMask[nIdx] = Mask;
			this._bufPass[nIdx] = bPasswd;
			this._strMask[nIdx] = cMasks[i];
			nIdx++;
		}
		this._nMaxedLength = strMask.length;
	};

	_pEditMaskString.setValue = function (strValue) {
		var elem = this.comp._input_element;

		if (nexacro._isNull(strValue)) {
			this._setValue(strValue);
			this._setMaskedValue(this.makeMaskedValue(""));
			this._setText(this.makeText(this._strMaskedValue));
		}
		else {
			this._setValue(strValue.toString());
			this._setMaskedValue(this.makeMaskedValue(this._value));
			this._setText(this.makeText(this._strMaskedValue));
		}

		this._undoStack.push(this._value, this._text);

		if (elem) {
			elem.setElementValue(this._value, true);
		}
	};

	_pEditMaskString.isFilled = function () {
		var bufMask = this._bufMask;
		var nLen = bufMask.length;
		var val = this._strMaskedValue;

		if (nLen == 0) {
			return false;
		}

		for (var i = 0; i < nLen; i++) {
			if (bufMask[i] != 0 && val[i] == this._chkEmpty) {
				return false;
			}
		}
		return true;
	};

	_pEditMaskString.inputText = function (txt) {
		var isMax = false;
		var nLeft = this._begin_pos;
		var nRight = this._end_pos;

		var strText = this._text;
		var strMaskedValue = this._strMaskedValue.concat();

		if (nLeft != nRight) {
		}
		else {
			nLeft = this.findNextPos(strMaskedValue, nLeft - 1);
		}

		if (this._nMaxedLength <= nLeft) {
			isMax = true;
		}

		var nNewLeft = nLeft;
		var nLen = txt.length;
		var tmpArr = txt.split("");

		if (!isMax) {
			for (var i = 0; i < nLen; i++) {
				nNewLeft = this.onInputChar(strMaskedValue, tmpArr[i], nNewLeft);
			}

			strText = this.makeText(strMaskedValue);
		}

		return {
			newText : strText, 
			newMaskedValue : strMaskedValue, 
			end : nNewLeft
		};
	};

	_pEditMaskString.onInputChar = function (strMaskedValue, c, nPos) {
		var bUse = true;
		var Mask = this._bufMask[nPos];
		var strMask = this._strMask[nPos];
		if (Mask !== undefined && Mask != 0) {
			if (strMask == "A" || strMask == "Z") {
				c = c.toUpperCase();
			}
			else if (strMask == "a" || strMask == "z") {
				c = c.toLowerCase();
			}
			if (!Mask.test(c)) {
				bUse = false;
			}
		}
		else {
			return nPos;
		}

		if (bUse) {
			strMaskedValue[nPos] = c;
			nPos = this.findNextPos(strMaskedValue, nPos);
		}

		return nPos;
	};

	_pEditMaskString.deleteChar = function (bBack) {
		var text = this._text;
		var begin = this._begin_pos;
		var end = this._end_pos;

		if (bBack) {
			if (end == begin && begin != 0) {
				begin--;
			}
			this.clearBuffer2(this._text, this._strMaskedValue, begin, end);
		}
		else {
			if (end == begin && end < text.length) {
				end++;
			}
			this.clearBuffer2(this._text, this._strMaskedValue, begin, end);
		}
	};

	_pEditMaskString.syncValue = function () {
		var comp = this.comp;

		comp.value = this._value;
		comp.text = this._text;
	};

	_pEditMaskString.getValue = function () {
		if (!this._value) {
			return;
		}

		var str = this._value;

		if (this._nTrimType) {
			if (this._nTrimType == 1) {
				str = str.replace(/^\s+/, "");
			}
			else if (this._nTrimType == 2) {
				str = str.replace(/\s+$/, "");
			}
			else if (this._nTrimType == 3) {
				str = str.replace(/^\s+/, "");
				str = str.replace(/\s+$/, "");
			}
			return str;
		}
		return str;
	};

	_pEditMaskString.makeMaskedValue = function (strValue) {
		var strMask = this._strMask;
		var bufMask = this._bufMask;
		var defs = this._maskChr;

		strValue = strValue.split("");
		var maskLen = strMask.length;
		var nLen = strValue.length;

		var bOverlappedValue = false;
		var strMaskedValue = [];
		var Mask;
		var c, i, j;

		if (nLen == maskLen) {
			for (i = 0; i < nLen; i++) {
				if (bufMask[i] == 0 && strValue[i] == strMask[i]) {
					continue;
				}
				else if (bufMask[i] == 0) {
					break;
				}
			}
			if (i == strValue.length) {
				bOverlappedValue = true;
			}
		}

		for (i = 0, j = 0; i < maskLen; i++) {
			c = strMask[i];
			Mask = bufMask[i];

			if (Mask != 0 && defs[c]) {
				do {
					c = strValue[j];
					j++;
				} while (c && !Mask.test(c) && !(c == this._FillMaskChar) && !(c == "\u200e"));

				if (nexacro._isNull(c) || (c == this._FillMaskChar)) {
					c = this._chkEmpty;
				}
			}
			else if (bOverlappedValue && strMask[i] == c) {
				j++;
			}
			strMaskedValue[i] = c;
		}

		return strMaskedValue;
	};

	_pEditMaskString.makeText = function (strMaskedValue) {
		var i;
		var strText = [];
		var c;
		var Mask, Pass, strMask;

		var nLen = this._strMask.length;
		for (i = 0; i < nLen; i++) {
			c = strMaskedValue[i];
			Mask = this._bufMask[i];
			Pass = this._bufPass[i];
			strMask = this._strMask[i];
			if (Mask != 0) {
				if (nexacro._isNull(c) || c == this._chkEmpty || c == this._FillMaskChar) {
					c = this._cMaskChar;
				}
				else if (Pass) {
					c = this._cPassChar;
					this._isPWInput = true;
				}
				else if (strMask == "A" || strMask == "Z") {
					c = c.toUpperCase();
				}
				else if (strMask == "a" || strMask == "z") {
					c = c.toLowerCase();
				}
			}
			strText[i] = c;
		}

		return strText.join("");
	};

	_pEditMaskString.makeValue = function (strMaskedValue) {
		var i, j;
		var c;
		var Mask;
		var nLen = this._strMask.length;
		var strValue = [];

		for (i = 0, j = 0; i < nLen; i++) {
			Mask = this._bufMask[i];
			if (Mask != 0) {
				c = strMaskedValue[i];
				if (!nexacro._isNull(c) && c != this._chkEmpty) {
					strValue[j] = c;
					j++;
				}
				else if (!nexacro._isNull(this._FillMaskChar)) {
					strValue[j] = this._FillMaskChar;
					j++;
				}
			}
		}

		var newStr = strValue.join("");

		if (this._nTrimType) {
			if (this._nTrimType == 1) {
				newStr = newStr.replace(/^\s+/, "");
			}
			else if (this._nTrimType == 2) {
				newStr = newStr.replace(/\s+$/, "");
			}
			else if (this._nTrimType == 3) {
				newStr = newStr.replace(/^\s+/, "");
				newStr = newStr.replace(/\s+$/, "");
			}
		}

		return newStr;
	};

	_pEditMaskString.findFirstInputPos = function (strMaskedValue) {
		var i;
		var nLen = this._strMask.length;
		var c;
		var bHasSpace = false;

		for (i = 0; i < nLen; i++) {
			var Mask = this._bufMask[i];
			if (Mask != 0) {
				bHasSpace = true;
				c = strMaskedValue[i];
				if (c == this._chkEmpty || nexacro._isNull(c)) {
					return i;
				}
			}
		}

		if (bHasSpace) {
			return this.findPrevPos(strMaskedValue, nLen) + 1;
		}

		return 0;
	};

	_pEditMaskString.findNextPos = function (strMaskedValue, nPos) {
		var i;
		var nLen = this._strMask.length;
		var Mask;

		for (i = nPos + 1; i < nLen; i++) {
			Mask = this._bufMask[i];
			if (Mask != 0) {
				return i;
			}
		}
		for (i = 0; i < nLen; i++) {
			if (this._bufMask[i] != 0) {
				return this.findPrevPos(strMaskedValue, nLen) + 1;
			}
		}

		return nLen;
	};

	_pEditMaskString.findPrevPos = function (strMaskedValue, nPos) {
		var i;
		var nLen = this._strMask.length;
		var Mask;
		for (i = nPos - 1; i >= 0; i--) {
			Mask = this._bufMask[i];
			if (Mask != 0) {
				return i;
			}
		}
		for (i = nLen - 1; i >= 0; i--) {
			if (this._bufMask[i] != 0) {
				return this.findFirstInputPos(strMaskedValue);
			}
		}

		return 0;
	};

	_pEditMaskString.writeBuffer = function (elem) {
		var str;
		if (this._text) {
			str = this._text;
		}
		else {
			str = "";
		}
		var comp = this.comp;
		var displaynulltext = comp.displaynulltext;

		var val = elem.getElementValue();
		if (elem && val != str) {
			elem.setElementValue(str);
		}

		return str;
	};

	_pEditMaskString.clearBuffer = function (strText, begin, end) {
		var newText = strText.substr(0, begin) + strText.substr(end, strText.length - end);

		this._setMaskedValue(this.makeMaskedValue(newText));
		this._setText(newText);
		this._setValue(newText);
		this.setElementCaretPos(begin, begin);
	};

	_pEditMaskString.clearBuffer2 = function (strText, strMaskedValue, begin, end) {
		var nCaret = -1;
		var Mask;
		var cMask;
		var strDeleted = [];
		for (var nPos = begin; nPos < end; nPos++) {
			Mask = this._bufMask[nPos];
			cMask = this._strMask[nPos];
			if (Mask != 0 && cMask != "^") {
				strDeleted.push(strMaskedValue[nPos]);
				strMaskedValue[nPos] = this._chkEmpty;
				strText[nPos] = this._cMaskChar;
				if (nCaret == -1) {
					nCaret = nPos;
				}
			}
			else {
				if ((end - begin) < 2) {
					var nDelLength = 0;
					var nCurrentPos = nPos;
					while (this._bufMask[nCurrentPos] == 0 || this._strMask[nCurrentPos] == "^") {
						nCurrentPos--;
						nDelLength++;
					}

					strDeleted.push(strMaskedValue[nPos - nDelLength]);
					strMaskedValue[nPos - nDelLength] = this._chkEmpty;
					strText[nPos - nDelLength] = this._cMaskChar;

					if (nCaret == -1) {
						nCaret = nPos - nDelLength;
					}
				}
				else {
					strDeleted.push(strMaskedValue[nPos]);
					if (nCaret == -1) {
						nCaret = nPos;
					}
				}
			}
		}

		if (nCaret == -1) {
			nCaret = begin;
		}

		this._deleted_char = strDeleted.join("");
		this._setMaskedValue(strMaskedValue);
		this._setText(this.makeText(this._strMaskedValue));
		this._setValue(this.makeValue(this._strMaskedValue));
		this.setElementCaretPos(nCaret, nCaret);
	};

	_pEditMaskString._setMaskedValue = function (v) {
		this._strMaskedValue = v;
	};

	_pEditMaskString._set_old_info = function () {
		this._old_text = this._text;
		this._old_value = this._value;

		this._oldMaskedValue = this._strMaskedValue;

		this._old_begin_pos = this._begin_pos;
		this._old_end_pos = this._end_pos;
	};

	_pEditMaskString._apply_input_filter = function (txt) {
		var isChange = false;
		var isMax = false;
		var nLeft = this._begin_pos;
		var nRight = this._end_pos;

		var strText = this._text;
		var strMaskedValue = this._strMaskedValue.concat();

		if (nLeft != nRight) {
		}
		else {
			nLeft = this.findNextPos(strMaskedValue, nLeft - 1);
		}

		if (this._nMaxedLength <= nLeft) {
			isMax = true;
		}

		var nNewLeft = nLeft;
		var nLen = txt.length;
		var tmpArr = txt.split("");

		if (!isMax) {
			for (var i = 0; i < nLen; i++) {
				nNewLeft = this.onInputChar(strMaskedValue, tmpArr[i], nNewLeft);
			}

			strText = this.makeText(strMaskedValue);
		}

		for (i = 0; i < strMaskedValue.length; i++) {
			if (strMaskedValue[i] != this._strMaskedValue[i]) {
				isChange = true;
				break;
			}
		}

		if (isChange) {
			this._setMaskedValue(strMaskedValue);
			this._setText(this.makeText(this._strMaskedValue));
			this._setValue(this.makeValue(this._strMaskedValue));
		}
		this.setElementCaretPos(nNewLeft, nNewLeft);
	};

	_pEditMaskString._check_value = function () {
		var maskedValue = this._strMaskedValue;
		var bufMask = this._bufMask;
		var bNull = true;

		for (var i = 0; i < maskedValue.length; i++) {
			if (bufMask[i] != 0 && maskedValue[i] != this._chkEmpty) {
				bNull = false;
			}
		}

		return bNull;
	};

	_pEditMaskString.getInsertText = function (elem) {
		var insertText = "";
		var element_text = elem.getElementValue();
		var text = this._text;

		if (!text) {
			text = "";
		}

		var old_text = this._text;
		var cur_text = elem.getElementValue();
		var str_mask = this._strMask;
		var len = element_text.length - text.length;
		var deleted_char_length = this._deleted_char.length;

		if (this._pasteAction) {
			if (len == 0) {
				var bFind = false;
				var i = 0;
				for (i = 0; i < element_text.length; i++) {
					if (!bFind && element_text[i] != text[i]) {
						insertText += element_text[i];
						bFind = true;
					}
					else if (bFind) {
						insertText += element_text[i];
					}
				}
			}
			else if (len < 0) {
				var strFront = text.substr(0, this._begin_pos);
				var strRear = text.substr(this._begin_pos + deleted_char_length, text.length - (this._begin_pos + deleted_char_length));

				insertText = element_text.substr(strFront.length, element_text.length - (strFront.length + strRear.length));
			}
			else {
				insertText = element_text.substr(this._begin_pos, len + deleted_char_length);
			}
		}
		else if (this._keycode == 13 || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
			if (len == 0) {
				var bFind = false;
				var i = 0;

				for (i = 0; i < element_text.length; i++) {
					if (element_text[i] != text[i]) {
						insertText += element_text[i];
						bFind = true;
					}
					else if (bFind) {
						break;
					}
				}
			}
			else if (len < 0) {
				var strFront = text.substr(0, this._begin_pos);
				var strRear = text.substr(this._begin_pos + deleted_char_length, text.length - (this._begin_pos + deleted_char_length));

				insertText = element_text.substr(strFront.length, element_text.length - (strFront.length + strRear.length));
			}
			else {
				insertText = element_text.substr(this._begin_pos, len);
			}
		}
		else {
			insertText = this._stat_composition.getData(elem);
		}

		return insertText;
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		_pEditMaskString._setElementValue = function (elem, begin, end, caretApply, valApply) {
			if (valApply) {
				elem.setElementValue(this._text, true);
			}
			else {
				elem.setElementValue(this._text);
			}

			if (caretApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else if (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") {
		_pEditMaskString._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(this.comp, function () {
					pThis._accept_focus_event = false;
					pThis.setElementCaretPos(begin, end, elem);
				});
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else {
		_pEditMaskString._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}

	_pEditMaskString._changeFocusText = function (elem) {
		var cur_val = this._value;
		var cur_text = elem.getElementValue();
		var cur_pos = elem.getElementCaretPos();

		if (!cur_val) {
			this._setMaskedValue(this.makeMaskedValue(""));
		}
		else {
			this._setMaskedValue(this.makeMaskedValue(cur_val));
		}

		var focus_text = this.makeText(this._strMaskedValue);

		this._setText(focus_text);
		this.syncValue();

		if (cur_text != focus_text) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				this._accept_blur_event = false;
			}

			elem.setElementValue(cur_val);

			if (nexacro.Browser == "Gecko") {
				this.setElementCaretPos(cur_pos.begin, cur_pos.end, elem);
			}
		}
	};

	_pEditMaskString._check_backspace = function (elem) {
		var elem_value = elem.getElementValue();
		if (this._select_text.length == 0 && (elem_value.length == (this._text.length - 1))) {
			if (!this._cutAction && !this._pasteAction && !this._is_composition()) {
				return true;
			}
		}

		return false;
	};

	_pEditMaskString._mousedown_process = function (elem) {
		this._oldMaskedValue = this._strMaskedValue.concat();
	};

	_pEditMaskString._mouseup_process = function (elem) {
		if (this._is_composition()) {
			this._setCaret(elem);
		}
		else {
			var pThis = this;
			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis._setCaret(elem);

				if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
					var cur_text = elem.getElementValue();
					if (cur_text == "" && cur_text != pThis._text) {
						pThis._setMaskedValue(pThis.makeMaskedValue(cur_text));
						pThis._setText(pThis.makeText(pThis._strMaskedValue));
						if (pThis._value) {
							pThis._setValue(pThis.makeValue(pThis._strMaskedValue));
						}
						pThis.syncValue();

						pThis._setElementValue(elem, pThis._begin_pos, pThis._end_pos);
						pThis.setElementCaretPos(pThis._begin_pos, pThis._begin_pos, elem);
					}
				}

				if (pThis._text) {
					if (pThis._begin_pos == pThis._end_pos) {
						pThis._select_text = "";
					}
					else {
						pThis._select_text = pThis._text.substring(pThis._begin_pos, pThis._end_pos);
					}
				}
			});
		}
	};

	_pEditMaskString._focus_process = function (elem, mflag) {
		var comp = this.comp;
		var win = comp._getWindow();
		var cur_text = elem.getElementValue();

		if (!this._bChangeFocusText) {
			this._changeFocusText(elem);
			this._bChangeFocusText = true;
		}
		else {
			this._setText(cur_text);
		}

		if (win && win._keydown_element && comp._setcaret) {
			this.setElementCaretPos(comp._caret_pos.begin, comp._caret_pos.end, elem);
			comp._setcaret = false;
		}

		this._apply_autoselect(elem, mflag);
		this._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
	};

	_pEditMaskString._blur_process = function (elem) {
		var cur_text = elem.getElementValue();

		if (!this._value) {
			this._setMaskedValue(this.makeMaskedValue(""));
		}
		else {
			this._setMaskedValue(this.makeMaskedValue(this._value));
		}

		var blur_text = this.makeText(this._strMaskedValue);

		this._setText(blur_text);
		this.syncValue();
		this._bChangeFocusText = false;

		if (cur_text != blur_text || !this._value) {
			elem.setElementValue(this._value);
		}
	};

	_pEditMaskString._keyup_process_enter = function (elem) {
		var focus_text = this._getFocusText();
		var focus_val = this._getFocusValue();
		var cur_text = this._getText();
		var cur_val = this._getValue();

		if (focus_text != cur_text || focus_val != cur_val) {
			if (nexacro.OSVersion >= 6.0 && nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
				this._accept_keyinput_event = false;
			}

			this.comp._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);

			this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
		}
	};

	_pEditMaskString._on_default_input_keydown = function (elem, keyCode, altkey, ctrlkey, shiftkey) {
		var comp = this.comp;

		this._setCaret(elem);

		this._keycode = keyCode;
		this._altkey = altkey;
		this._ctrlkey = ctrlkey;
		this._shiftkey = shiftkey;

		if (ctrlkey && (keyCode == 90)) {
			this._is_undo = true;
			this._undoStack.doUndo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}
		else if (ctrlkey && (keyCode == 89)) {
			this._is_undo = true;
			this._undoStack.doRedo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}

		if (!comp._accept_keydown_event(keyCode)) {
			elem._event_stop = true;
		}
	};

	_pEditMaskString._on_default_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey) {
		var ret = true;
		var k = charCode || keyCode;
		var comp = this.comp;

		if (!comp) {
			return false;
		}
		if (elem.readonly) {
			if (k == nexacro.Event.KEY_BACKSPACE) {
				elem._event_stop = true;
			}
			return false;
		}

		if (k == nexacro.Event.KEY_BACKSPACE || (k == nexacro.Event.KEY_DELETE && k == this._keycode) || (nexacro.Browser == "MobileSafari" && k == 127)) {
			var preValue = this._value;
			var preText = this._text;
			var delInfo = this.deleteChar(k == 8 ? true : false);
			var postText = this._text;

			var text_info = this._textEventInfo;
			text_info.setTextInfo("", preText, postText, "", "", preText);

			ret = comp.on_fire_ontextchange(text_info);
			if (ret) {
				ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext);

				if (ret) {
					ret = comp.on_fire_onchar(text_info);
				}

				if (ret) {
					this.syncValue();

					this._setElementValue(elem, this._begin_pos, this._end_pos, true, true);

					if (text_info.pretext != text_info.posttext) {
						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._begin_pos, this._begin_pos);
						}

						comp._textchanging = true;
						comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
						comp._textchanging = false;
					}
				}
			}

			if (!ret) {
				this._setMaskedValue(this._oldMaskedValue);
				this._setText(preText);
				this._setValue(preValue);
				this.syncValue();

				this.setElementCaretPos(this._begin_pos, this._end_pos);
			}

			this._select_text = "";
			elem._event_stop = true;
		}
		return ret;
	};

	_pEditMaskString._on_default_input_keyup = function (elem, keycode, altkey, ctrlkey, shiftkey) {
		var comp = this.comp;

		this._altkey = altkey;
		this._ctrlkey = ctrlkey;
		this._shiftkey = shiftkey;

		if (!shiftkey && (keycode >= 37 && keycode <= 40)) {
			this._select_text = "";
		}

		if (keycode == 13) {
			this._keyup_process_enter(elem);
			return;
		}

		this._setCaret(elem);
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		if (nexacro.BrowserVersion == 10) {
			_pEditMaskString._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);

					if (!this._cutAction) {
						if (this._pasteAction) {
							this._isPasteActionComplete = false;
						}
						return;
					}
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}
				this._isPasteActionComplete = true;
			};
		}
		else if (nexacro.BrowserVersion >= 9) {
			_pEditMaskString._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}
			};
		}
		else {
			_pEditMaskString._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);

					if (!this._cutAction) {
						return;
					}
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}
			};
		}
	}
	else {
		_pEditMaskString._on_default_input_keyinput = function (elem) {
			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;

				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var text = this._text;
			if (!text) {
				text = "";
			}
			var insertText = "";

			if (elem_value == text) {
				this._setCaret(elem);
				return false;
			}

			this._set_old_info();

			if (this._is_selected()) {
				this.clearBuffer2(this._text, this._strMaskedValue, this._begin_pos, this._end_pos);
			}

			if (this._check_backspace(elem)) {
				this.clearBuffer2(elem_value, this._strMaskedValue, elem_pos.begin, elem_pos.begin + 1);
			}

			if (elem._type == "date") {
				insertText = elem_value;
			}
			else {
				insertText = this.getInsertText(elem);
			}

			this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}
		};
	}

	_pEditMaskString._fire_text_event = function (chartext) {
		var comp = this.comp;
		var elem = comp._input_element;
		var elem_value = elem.getElementValue();

		var text_info = this._textEventInfo;
		var autoskip = comp.autoskip;
		var bFilled = false;

		if (this._is_undo) {
			this._setMaskedValue(this.makeMaskedValue(elem_value));
			this._setText(this.makeText(this._strMaskedValue));
			this._setValue(this.makeValue(this._strMaskedValue));
		}
		else {
			this._apply_input_filter(chartext);
		}

		text_info.setTextInfo(chartext, this._old_text, this._text, "", "", this._old_text);

		var ret = comp.on_fire_ontextchange(text_info);
		if (ret) {
			ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext, text_info.pretext);
			if (ret) {
				ret = comp.on_fire_onchar(text_info);
				if (ret) {
					if (text_info.pretext != text_info.posttext || this._isPWInput) {
						this._isPWInput = false;
						this.syncValue();

						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._begin_pos, this._begin_pos);
						}

						this._setElementValue(elem, this._begin_pos, this._end_pos, true);

						comp.on_fire_ontextchanged(comp, this._old_text, this._text);
					}
					else {
						this._setElementValue(elem, this._begin_pos, this._end_pos, true);
					}
				}
			}
		}

		if (!ret) {
			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setMaskedValue(this._oldMaskedValue);
			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			this._setElementValue(elem, this._old_begin_pos, this._old_end_pos, true);

			return;
		}

		if (this._is_composition()) {
			this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
		}

		if (autoskip) {
			bFilled = this.isFilled();
			if (bFilled) {
				this._apply_autoskip();
			}
		}
	};

	delete _pEditMaskString;
	_pEditMaskString = null;

	nexacro.EditMaskNumber = function (comp) {
		nexacro.EditBase.call(this, comp);

		if (comp) {
			this.comp = comp;
		}

		this._dispComponent = false;
		this._dispComma = false;
		this._nMin = 0;
		this._nMax = 0;
		this._nDecimalMin = -1;
		this._nDecimalMax = 0;

		this._default_grouping = [3];
		this._default_decimal_point = ".";
		this._default_thousands_sep = ",";
		this._default_positive_sign = "";
		this._default_negative_sign = "-";
		this._default_positive_sign_posn = 1;
		this._default_negative_sign_posn = 1;

		this._positive_sign = this._default_positive_sign;
		this._negative_sign = this._default_negative_sign;
		this._positive_sign_posn = this._default_positive_sign_posn;
		this._negative_sign_posn = this._default_negative_sign_posn;

		this._grouping = this._default_grouping;
		this._strPoint = this._default_decimal_point;
		this._strSeparator = this._default_thousands_sep;
		this._nSignType = 3;
	};

	_pEditMaskNumber = nexacro._createPrototype(nexacro.EditBase, nexacro.EditMaskNumber);
	nexacro.EditMaskNumber.prototype = _pEditMaskNumber;

	_pEditMaskNumber._type_name = "EditMaskNumber";

	_pEditMaskNumber._init = function () {
		nexacro.EditBase.prototype._init.call(this);

		this._dispComponent = false;
		this._dispComma = false;
		this._nMin = 0;
		this._nMax = 0;
		this._nDecimalMin = -1;
		this._nDecimalMax = 0;
	};

	_pEditMaskNumber.isFilled = function () {
		var nLength = this._text.length;
		var nPoint = this._text.indexOf(this._strPoint);

		if (this._nDecimalMax == -1) {
			return false;
		}
		else if (this._nDecimalMax == 0) {
			if (this._nMax > 0 && (this._nMax <= nLength)) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			if (nPoint == -1) {
				return false;
			}
			if ((nLength - nPoint - 1) >= this._nDecimalMax) {
				return true;
			}
		}

		return false;
	};

	_pEditMaskNumber.filterChar = function (c) {
		if (this.isDigit(c)) {
			return c;
		}
		else if (c == this._strPoint) {
			return c;
		}
		else if (c == this._strSeparator) {
			return c;
		}
		else if (c == '-' && (this._nSignType == 3 || this._nSignType == 0)) {
			return c;
		}
		else if (c == '+' && (this._nSignType == 3 || this._nSignType == 1)) {
			return c;
		}

		return "";
	};

	_pEditMaskNumber.setMask = function (strMask) {
		var strSMask = this.trimLeft(strMask);
		var cSignMask = strSMask.charAt(0);

		if (cSignMask == '!') {
			this._nSignType = 2;
		}
		else if (cSignMask == '+') {
			this._nSignType = 1;
		}
		else if (cSignMask == '-') {
			this._nSignType = 0;
		}
		else {
			this._nSignType = 3;
		}

		if (strMask.length <= 0) {
			this._nMin = 0;
			this._nMax = 0;
			this._nDecimalMax = -1;
			this._nDecimalMin = 0;

			return;
		}

		this._nMin = 0;
		this._nMax = 0;
		this._nDecimalMax = 0;
		this._nDecimalMin = 0;
		this._dispComma = (strMask.indexOf(",") >= 0);

		var c;
		var bFindPoint = false;
		for (var i = 0, n = strMask.length; i < n; i++) {
			c = strMask.charAt(i);
			if (c == '.') {
				bFindPoint = true;
			}
			else if (c == '#' || c == '0' || c == '9' || c == ',') {
				if (bFindPoint) {
					this._nDecimalMax++;
					if (c == '0') {
						this._nDecimalMin = this._nDecimalMax;
					}
				}
				else {
					if (c == '0' || this._nMin > 0) {
						this._nMin++;
					}

					this._nMax++;
				}
			}
		}
	};

	_pEditMaskNumber.setDisplayMask = function (strMask) {
		var c, i;
		var bFindNineMask = false;
		var bFindPoint = false;
		var strMaskLen = strMask.length;
		var strSMask = this.trimLeft(strMask);
		var cSignMask = strSMask.charAt(0);
		var intNineMaskCnt = 0;
		var decNineMaskCnt = 0;

		this._init();

		this._dispComponent = true;

		if (cSignMask == '!') {
			this._nSignType = 2;
		}
		else if (cSignMask == '+') {
			this._nSignType = 1;
		}
		else if (cSignMask == '-') {
			this._nSignType = 0;
		}
		else {
			this._nSignType = 3;
		}

		if (strMask.length <= 0) {
			this._dispComma = true;

			this._nDecimalMax = -1;
			this._nDecimalMin = 0;
		}
		else {
			this._dispComma = (strMask.indexOf(this._strSeparator) >= 0);

			for (i = 0; i < strMaskLen; i++) {
				c = strMask.charAt(i);
				if (c == ".") {
					bFindPoint = true;
				}
				else if (c == "#" || c == "0" || c == "9") {
					if (bFindPoint) {
						this._nDecimalMax++;
						if (c == "0") {
							this._nDecimalMin = this._nDecimalMax;
						}
						else if (c == "9") {
							decNineMaskCnt++;
						}
					}
					else {
						if (c == "9") {
							intNineMaskCnt++;
							this._nMin = 1;
						}
						else if (c == "0" || this._nMin > 0) {
							this._nMin++;
						}

						this._nMax++;
					}
				}
			}

			if (this._nMax == intNineMaskCnt) {
				if (this._nDecimalMax == decNineMaskCnt) {
					this._nMin = 0;
				}
			}
		}
	};

	_pEditMaskNumber.syncValue = function () {
		var comp = this.comp;

		comp.value = this._value;
		comp.text = this._text;
	};

	_pEditMaskNumber.getValue = function () {
		return this._value;
	};
	_pEditMaskNumber.setValue = function (strValue) {
		var elem = this.comp ? this.comp._input_element : null;

		if (nexacro._isNull(strValue)) {
			this._setValue(strValue);
			this._setText(this.makeText("", false));
		}
		else {
			strValue = strValue.toString();
			strValue = strValue.replace('.', this._strPoint);

			this._setValue(this.normalizeValue(strValue, true));
			this._setText(this.makeText(this._value, false));
		}

		this._undoStack.push(this._value, this._text);

		if (elem) {
			elem.setElementValue(this._value, true);
		}
	};

	_pEditMaskNumber.deleteChar = function (bBack) {
		var text = this._text;
		var begin_pos = this._begin_pos;
		var end_pos = this._end_pos;
		var ret = {
		};

		if (bBack) {
			if (end_pos == begin_pos && begin_pos != 0) {
				begin_pos--;

				var delText = text.charAt(begin_pos);
				if (delText == this._strSeparator) {
					begin_pos--;
				}
			}
			this.clearBuffer(text, begin_pos, end_pos);
		}
		else {
			if (end_pos == begin_pos && begin_pos != text.length) {
				var delText = text.charAt(end_pos);
				if (delText == this._strSeparator) {
					end_pos++;
				}
				end_pos++;
			}
			this.clearBuffer(text, begin_pos, end_pos);
		}
	};

	_pEditMaskNumber.makeText = function (strValue, bEditing) {
		if (bEditing === undefined) {
			bEditing = true;
		}

		var nSign = 0;
		var nSignPos = -1;
		var bPoint = false;
		var nDecimalLen = 0;
		var nIntegerLen = 0;

		var strText = strValue;

		var ret = this.split(strText);
		nSign = ret.sign;
		bPoint = ret.pointexist;
		var strNumber = ret.numVal;
		var strDecimal = ret.decVal;

		nIntegerLen = strNumber.length;
		nDecimalLen = strDecimal ? strDecimal.length : 0;

		if (this._nMin > nIntegerLen) {
			var tmpStr = "";
			for (var i = 0, n = this._nMin - nIntegerLen; i < n; i++) {
				tmpStr += "0";
			}
			if (!bEditing) {
				strNumber = tmpStr + strNumber;
			}
		}

		if (this._nDecimalMin > nDecimalLen) {
			var tmpStr = "";
			for (var i = 0, n = this._nDecimalMin - nDecimalLen; i < n; i++) {
				tmpStr += "0";
			}
			if (!bEditing) {
				strDecimal = strDecimal + tmpStr;
			}
		}
		else if (this._nDecimalMax != -1 && this._nDecimalMax < nDecimalLen) {
			if (!bEditing && (this._nLimitType != 3 + 1 || this._nDecimalMax == 0)) {
				strDecimal = strDecimal.substring(0, this._nDecimalMax) + strDecimal.substr(nDecimalLen, strDecimal.length);
			}
		}

		if (this._dispComma) {
			strNumber = this.applyComma(strNumber);
		}

		if (nSign < 0) {
			strSign = this._negative_sign;
			nSignPos = this._negative_sign_posn;
		}
		else if (nSign > 0) {
			strSign = this._positive_sign;
			nSignPos = this._negative_sign_posn;
		}
		else {
			strSign = "";
		}

		if (strDecimal.length > 0) {
			strNumber += this._strPoint;
			strNumber += strDecimal;
		}
		else {
			if (bEditing && bPoint && this._nDecimalMax > 0) {
				strNumber += this._strPoint;
			}
			else if (!bEditing && bPoint) {
				var nLen = strNumber.length;
				this._begin_pos = (this._begin_pos > nLen) ? nLen : this._begin_pos;
				this._end_pos = (this._end_pos > nLen) ? nLen : this._begin_pos;
			}
		}

		switch (nSignPos) {
			case 0:
				strNumber = "(" + strNumber + ")";
				break;
			case 1:
			case 3:
			case 4:
				strNumber = strSign + strNumber;
				break;
			case 2:
				strNumber += strSign;
				break;
			default:
				strNumber = strSign + strNumber;
				break;
		}

		return strNumber;
	};

	_pEditMaskNumber.makeDisplayText = function (strValue, bApplyLocale) {
		var ret = this.split(strValue, bApplyLocale);

		var i, zeroLen;
		var tmpStr = "";
		var nSignPos = -1;
		var nSign = ret.sign;
		var bPoint = ret.pointexist;
		var strInteger = ret.numVal;
		var strDecimal = ret.decVal;
		var nIntegerLen = strInteger.length;
		var nDecimalLen = strDecimal ? strDecimal.length : 0;

		if (this._nMin > nIntegerLen) {
			zeroLen = this._nMin - nIntegerLen;
			for (i = 0; i < zeroLen; i++) {
				tmpStr += "0";
			}

			strInteger = tmpStr + strInteger;
		}
		else if (this._nMin == 0 && this._nMin != this._nMax) {
			if (strInteger == "0") {
				strInteger = "";
			}
		}

		if (this._nDecimalMin > nDecimalLen) {
			tmpStr = "";
			zeroLen = this._nDecimalMin - nDecimalLen;
			for (i = 0; i < zeroLen; i++) {
				tmpStr += "0";
			}

			strDecimal = strDecimal + tmpStr;
		}
		else if (this._nDecimalMax != -1 && this._nDecimalMax < nDecimalLen) {
			if ((this._nLimitType != 3 + 1 || this._nDecimalMax == 0)) {
				strDecimal = strDecimal.substring(0, this._nDecimalMax) + strDecimal.substr(nDecimalLen, strDecimal.length);
			}
		}

		if (this._dispComma) {
			strInteger = this.applyComma(strInteger);
		}

		if (strDecimal.length > 0) {
			strInteger += this._strPoint;
			strInteger += strDecimal;
		}

		if (nSign < 0) {
			strSign = this._negative_sign;
			nSignPos = this._negative_sign_posn;
		}
		else if (nSign > 0) {
			strSign = this._positive_sign;
			nSignPos = this._negative_sign_posn;
		}
		else {
			strSign = "";
		}

		switch (nSignPos) {
			case 0:
				strInteger = "(" + strInteger + ")";
				break;
			case 1:
			case 3:
			case 4:
				strInteger = strSign + strInteger;
				break;
			case 2:
				strInteger += strSign;
				break;
			default:
				strInteger = strSign + strInteger;
				break;
		}

		return strInteger;
	};

	_pEditMaskNumber.normalizeValue = function (strValue, bTrim) {
		if (strValue.length <= 0) {
			return strValue;
		}

		if (this._dispComponent && isFinite(strValue) == false) {
			return strValue;
		}

		if (bTrim === undefined) {
			bTrim = true;
		}

		strValue = this.removeMask(strValue);
		if (strValue.charAt(strValue.length - 1) == this._strPoint) {
			strValue = strValue + "0";
		}

		if (bTrim) {
			var bSign = (strValue.charAt(0) == '-') ? 1 : 0;

			while (strValue.charAt(0 + bSign) == '0'
				 && strValue.charAt(1 + bSign) != this._strPoint
				 && strValue.length != (1 + bSign)) {
				strValue = strValue.substring(0, 0 + bSign) + strValue.substr(0 + bSign + 1, strValue.length);
			}

			var nPoint = strValue.indexOf(this._strPoint);
			if (nPoint >= 0) {
				var i;
				for (i = strValue.length - 1; i > nPoint + 1; i--) {
					if (strValue.charAt(i) != '0') {
						break;
					}
				}
				strValue = strValue.substring(0, i + 1);
			}
		}

		if (strValue.charAt(0) == '+') {
			strValue = strValue.substr(1);
		}
		else if (strValue.length <= 0 || parseFloat(strValue) == 0.0) {
			if (strValue.charAt(0) == '-') {
				strValue = strValue.substr(1);
			}
		}

		strValue = strValue.replace(this._strPoint, this._default_decimal_point);

		return strValue;
	};

	_pEditMaskNumber.split = function (strText, bApplyLocale) {
		var nBegin = 0;
		var nSign;
		if ((nBegin = strText.indexOf('+')) >= 0) {
			nSign = +1;
			nBegin = 1;
		}
		else if ((nBegin = strText.indexOf('-')) >= 0) {
			nSign = -1;
			nBegin = 1;
		}
		else {
			nSign = 0;
			nBegin = 0;
		}

		var nPoint;
		if (bApplyLocale) {
			nPoint = strText.indexOf(this._strPoint, nBegin);
		}
		else {
			nPoint = strText.indexOf(this._default_decimal_point, nBegin);
		}

		var strNumber = "", bPoint, strDecimal = "";
		if (nPoint < 0) {
			strNumber = strText.substr(nBegin);
			bPoint = false;
		}
		else {
			strNumber = strText.substr(nBegin, nPoint - nBegin);
			strDecimal = strText.substr(nPoint + 1);
			bPoint = true;
		}
		return {
			"sign" : nSign, 
			"pointexist" : bPoint, 
			"numVal" : strNumber, 
			"decVal" : strDecimal
		};
	};

	_pEditMaskNumber.writeBuffer = function (elem) {
		var str = this._text;
		var comp = this.comp;
		var displaynulltext = comp.displaynulltext;

		var val = elem.getElementValue();

		if (elem && val != str) {
			elem.setElementValue(str);

			var elem_val = elem.getElementValue();
		}

		return str;
	};

	_pEditMaskNumber.clearBuffer = function (text, begin, end) {
		var tmpText = text.substr(0, begin) + text.substr(end, text.length - end);
		var intText = tmpText;
		var decText = "";

		var newValue = this.normalizeValue(tmpText, false);

		var point_idx = tmpText.indexOf(this._strPoint);
		if (point_idx > 0) {
			intText = tmpText.substring(0, point_idx);
			decText = tmpText.substring(point_idx + 1, tmpText.length);
		}

		var intValue = this.normalizeValue(intText, false);
		var newText = this.makeText(intValue, true);

		if (intText.length != newText.length) {
			var tmp = intText.length - newText.length;
			if (begin != 0) {
				begin = begin - tmp;
			}
		}

		if (point_idx > 0) {
			newText = newText + this._strPoint + decText;
		}

		this._setText(newText);
		this._setValue(newValue);
		this.setElementCaretPos(begin, begin);
	};

	_pEditMaskNumber.clearBuffer2 = function (str, start, end) {
		if (start == end) {
			return {
				"text" : str, 
				"end" : end
			};
		}

		if (start > end) {
			var tmpVal = start;
			start = end;
			end = tmpVal;
		}

		var strTemp = str.substr(start, end - start);
		var strPost = str.substring(0, start) + str.substring(end);
		var pstrDeleted = strTemp;
		if (strTemp.indexOf(this._strPoint) > 0) {
			strTemp = this.makeText(this.normalizeValue(strPost));
			end = this.findIndex(strPost, strTemp, start, true);
			strPost = strTemp;

			if (end < 0) {
				end = 0;
			}
			else if (strTemp.length < end) {
				end = strTemp.length;
			}
		}
		else if (this._is_selected() && pstrDeleted == this._strSeparator) {
			end = start;
			strPost = str;
		}
		else {
			var nPoint = strPost.indexOf(this._strPoint);
			if (nPoint < 0) {
				nPoint = strPost.length;
			}
			if (start <= nPoint) {
				strTemp = this.makeText(this.normalizeValue(strPost));
				end = this.findIndex(strPost, strTemp, start, false);
				strPost = strTemp;
			}
			else {
				end = start;
				var nAppendCount = this._nDecimalMin - (strPost.length - (nPoint + 1));
				var addstr = "";
				if (nAppendCount > 0) {
					for (var i = 0; i < nAppendCount; i++) {
						addstr += "0";
					}
				}
				strPost += addstr;
			}
		}
		return {
			"text" : strPost, 
			"end" : end, 
			"pstrDeleted" : pstrDeleted
		};
	};

	_pEditMaskNumber.isDigit = function (c) {
		if (!this._digit) {
			this._digit = /[0-9]/;
		}
		if (this._digit.test(c)) {
			return true;
		}
		return false;
	};


	_pEditMaskNumber.isPlusSign = function (c) {
		if (c == "+") {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.isMinusSign = function (c) {
		if (c == "-") {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.isComma = function (c) {
		if (c == this._strPoint) {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.isSign = function (c) {
		if (this.isPlusSign(c) || this.isMinusSign(c)) {
			return true;
		}
		return false;
	};

	_pEditMaskNumber.trim = function (str) {
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	};

	_pEditMaskNumber.trimLeft = function (str) {
		return str.replace(/^\s\s*/, '');
	};

	_pEditMaskNumber.trimRight = function (str) {
		return str.replace(/\s\s*$/, '');
	};

	_pEditMaskNumber.removeMask = function (str) {
		str = this.trim(str);
		var ntxtLen = str.length;
		var i;
		var bPoint = false;
		var bInside = false;
		var buf = [];
		for (i = 0; i < ntxtLen; i++) {
			var c = str.charAt(i);
			if ((c == '+' || c == '-') && (bInside === false)) {
				buf.push(c);
				bInside = true;
			}
			else if (this.isDigit(c)) {
				buf.push(c);
				bInside = true;
			}
			else if (c == this._strPoint && bPoint === false) {
				buf.push(c);
				bPoint = true;
				bInside = true;
			}
			else if (c != this._strSeparator) {
				if (!this._pasteAction) {
					return "";
				}
			}
		}
		return buf.join("");
	};

	_pEditMaskNumber.applyComma = function (strNumber) {
		var grouping = this._grouping;
		var thousands_sep = this._strSeparator;
		if (thousands_sep.length > 0) {
			var dec_buf = strNumber.split("");
			var dec_size = strNumber.length;
			var out_size = (thousands_sep.length + 1) * strNumber.length;
			var out_buf = [];
			var cur_group = 0, d_size = dec_size;
			var endpos = out_size;
			var groupingIdx = 0;
			while (grouping[groupingIdx] && d_size > 0) {
				var g = grouping[groupingIdx];
				if (g == "\\") {
					groupingIdx++;
					g = parseInt(grouping[groupingIdx]) | 0;
				}
				if (g > 0) {
					cur_group = g;
					while (g-- > 0 && d_size > 0) {
						out_buf[--endpos] = dec_buf[--d_size];
					}
					if (d_size > 0) {
						out_buf[--endpos] = thousands_sep;
					}
				}
				else if (g == 0 && d_size > cur_group) {
					g = cur_group;
					while (g-- > 0) {
						out_buf[--endpos] = dec_buf[--d_size];
					}
					if (d_size > 0) {
						out_buf[--endpos] = thousands_sep;
					}
				}
				else if (g == 0 && d_size <= cur_group && d_size > 0) {
					g = d_size;
					while (g-- > 0) {
						out_buf[--endpos] = dec_buf[--d_size];
					}
				}
				else {
					break;
				}


				if (grouping.length == 2 && groupingIdx == 0) {
					groupingIdx++;
				}
			}
			return out_buf.slice(endpos, out_size + endpos).join("");
		}
		return strNumber;
	};

	_pEditMaskNumber.findIndex = function (strSource, strTarget, nPos, bDeleteComma) {
		var nFindPos = 0;

		var nSource = strSource.indexOf(this._strPoint);
		var nTarget = strTarget.indexOf(this._strPoint);
		if (nSource < 0) {
			nSource = strSource.length - 1;
		}
		if (nTarget < 0) {
			nTarget = strTarget.length - 1;
		}

		if (bDeleteComma) {
			var regexpr = new RegExp(this._strSeparator, "g");
			var xstrSource = strSource;
			if (this._dispComma) {
				xstrSource = xstrSource.replace(regexpr, "");
			}

			var xstrTarget = strTarget.substring(0, nTarget + 1);
			if (this._dispComma) {
				xstrTarget = xstrTarget.replace(regexpr, "");
			}
			xstrTarget.replace(this._strPoint, "");

			var nFixPos = nPos + xstrTarget.length - xstrSource.length;

			if (this._dispComma) {
				var nCount = nSource - nPos;
				for (var i = nPos; i < nSource; i++) {
					if (strSource.charAt(i) == this._strSeparator) {
						nCount--;
					}
					if (strTarget.charAt(i) == this._strSeparator) {
						nCount++;
					}
				}
				nFindPos = nTarget - nCount;

				if (strTarget.indexOf(this._strPoint) >= 0) {
					nFindPos = nTarget;
				}
			}
			else {
				nFindPos = nFixPos;
			}
		}
		else {
			if (nPos == nSource) {
				nFindPos = nTarget;
			}
			else if (this._dispComma) {
				var nCount = nSource - nPos;
				for (var i = nPos; i < nSource; i++) {
					if (strSource.charAt(i) == this._strSeparator) {
						nCount--;
					}
					if (strTarget.charAt(i) == this._strSeparator) {
						nCount++;
					}
				}
				nFindPos = nTarget - nCount;
			}
			else {
				nFindPos = nTarget - (nSource - nPos);
			}
		}

		return nFindPos;
	};

	_pEditMaskNumber.onInputDigit = function (strText, xchNum, nCaret) {
		var nPoint = strText.indexOf(this._strPoint);
		var bPoint = nPoint >= 0;
		if (!bPoint) {
			nPoint = strText.length;
		}

		if (nPoint < nCaret) {
			if (!this.isLimit(strText)) {
				strText = strText.substring(0, nCaret) + xchNum + strText.substr(nCaret, strText.length);
				nCaret++;
			}
		}
		else {
			if (!this.isLimit(strText)) {
				if (this._dispComma) {
					strText = strText.substring(0, nCaret) + xchNum + strText.substr(nCaret, strText.length);
					nCaret++;
					nPoint++;
					var nOldLength = strText.length;
					var nIndex = strText.indexOf("-");
					var strSign = "";

					if (0 <= nIndex) {
						strSign += "-";
					}
					if (strSign != "") {
						strText = this.normalizeValue(strText);
						if (strText.charAt(1) == 0) {
							strText = strSign + strText;
						}
						strText = this.makeText(strText);
					}
					else {
						strText = this.makeText(this.normalizeValue(strText));
					}
					var nNewLength = strText.length;

					nPoint = strText.indexOf(this._strPoint);

					if (nOldLength != nNewLength) {
						nCaret++;
					}
				}
				else {
					strText = strText.substring(0, nCaret) + xchNum + strText.substr(nCaret, strText.length);
					nCaret++;
					nPoint++;
				}
			}
		}


		if (nPoint > this._nMin && nPoint > 1) {
			if (strText.charAt(0) == '0') {
				if (strText.charAt(1) == this._strSeparator) {
					strText = strText.substr(2);
					nCaret -= 2;
				}
				else if ((this._nMin <= 0) && (strText.charAt(1) != this._strPoint)) {
					strText = strText.substr(1);
					nCaret--;
				}
			}
			else if (strText.charAt(0) == '+' || strText.charAt(0) == '-') {
				if (strText.charAt(1) == '0' && strText.charAt(2) == '0') {
					strText = strText.substring(0, 1) + strText.substr(2, strText.length);
					nCaret--;
				}
			}
		}
		return {
			"text" : strText, 
			"pos" : nCaret
		};
	};

	_pEditMaskNumber.isLimit = function (strText) {
		var nLength = strText.length;
		var nPoint = strText.indexOf(this._strPoint);
		var nIntLength = 0;
		var nDecLength = 0;
		if (nPoint != -1) {
			nIntLength = nPoint;
			nDecLength = nLength - (nPoint + 1);
		}

		var bSign = (strText.charAt(0) == '-' || strText.charAt(0) == '+') ? true : false;
		if (bSign) {
			nLength--;
			if (this._end_pos <= nPoint) {
				nIntLength--;
			}
		}

		if (this._nLimitType == 3) {
			if (this._nDecimalMax == 0 || nPoint == -1) {
				return (nLength >= this._nMax);
			}

			if (this._nMax > 0 && this._nDecimalMax > 0) {
				if (this._end_pos <= nPoint) {
					return (nIntLength >= this._nMax);
				}
				else if (this._end_pos > nPoint) {
					return (nDecLength >= this._nDecimalMax);
				}
				else {
					return false;
				}
			}
		}
		else if (this._nLimitType == 2) {
			if (this._nMax > 0 && this._nDecimalMax > 0) {
				if (this._begin_pos > nPoint) {
					return (nDecLength >= this._nDecimalMax);
				}
			}
		}
		else if (this._nLimitType == 1) {
			if (this._nDecimalMax == 0 || nPoint == -1) {
				return (nLength >= this._nMax);
			}
			if (this._nMax > 0 && this._nDecimalMax > 0) {
				if (this._end_pos <= nPoint) {
					return (nIntLength >= this._nMax);
				}
				else {
					return false;
				}
			}
		}
		else if (this._nLimitType == 0) {
			return false;
		}
		return false;
	};

	_pEditMaskNumber._set_old_info = function () {
		this._old_text = this._text;
		this._old_value = this._value;
		this._old_begin_pos = this._begin_pos;
		this._old_end_pos = this._end_pos;
	};

	_pEditMaskNumber._is_maskchar = function (c) {
		if (this.isDigit(c) || c == this._strPoint) {
			return c;
		}
		else if (this.isSign(c) && (this._nSignType == 3 || this._nSignType == 0)) {
			return c;
		}
		else if (this.isSign(c) && (this._nSignType == 3 || this._nSignType == 1)) {
			return c;
		}

		return "";
	};

	_pEditMaskNumber._apply_filter = function (ch) {
		var bChange = false;
		var ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};
		var filterChar = this._is_maskchar(ch);

		if (this.isSign(filterChar)) {
			ret = this._apply_sign_filter(filterChar, (this._value ? this._value : ""), this._text, this._input_begin_pos);
		}
		else if (this.isComma(filterChar)) {
			ret = this._apply_comma_filter(filterChar, (this._value ? this._value : ""), this._text, this._input_begin_pos);
		}
		else if (this.isDigit(filterChar)) {
			ret = this._apply_digit_filter(filterChar, (this._value ? this._value : ""), this._text, this._input_begin_pos);
		}

		return ret;
	};

	_pEditMaskNumber._apply_sign_filter = function (c, value, text, begin_pos) {
		var firstText = text.charAt(0);

		if (this.isPlusSign(c) && (this._nSignType == 1 || this._nSignType == 3)) {
			if (this.isPlusSign(firstText)) {
				value = this.normalizeValue(text, true);
				text = this.makeText(value);
				begin_pos -= 1;
			}
			else if (this.isMinusSign(firstText)) {
				value = this.normalizeValue(text.substr(1), true);
				text = c + this.makeText(value);
			}
			else {
				text = c + this.makeText(value);
				begin_pos += 1;
			}
		}
		else if (this.isMinusSign(c) && (this._nSignType == 0 || this._nSignType == 3)) {
			if (this.isMinusSign(firstText)) {
				value = this.normalizeValue(text.substr(1), true);
				text = this.makeText(value);
				begin_pos -= 1;
			}
			else if (this.isPlusSign(firstText)) {
				value = this.normalizeValue(text.substr(1), true);
				text = c + this.makeText(value);
			}
			else {
				value = c + this.normalizeValue(text, true);
				text = this.makeText(value);
				begin_pos += 1;
			}
		}

		return {
			value : value, 
			text : text, 
			caret : begin_pos, 
			bChange : true
		};
	};

	_pEditMaskNumber._apply_comma_filter = function (c, value, text, begin_pos) {
		var bNormalize = true;
		var comma_idx = value.indexOf(c);

		if (comma_idx == -1) {
			var bInput = true;
			var dec_begin_pos = this._input_begin_pos;
			var intText = text.substr(0, dec_begin_pos);
			var decText = text.substr(dec_begin_pos);
			var decLen = decText.length;

			if (this._nDecimalMax == 0) {
				bInput = false;
			}
			else if (this._nLimitType == 2 || this._nLimitType == 3) {
				bInput = (decLen <= this._nDecimalMax) ? true : false;
			}

			if (bInput) {
				text = intText + c + decText;
				if (decLen == 0) {
					bNormalize = false;
				}
			}
		}

		if (bNormalize) {
			value = this.normalizeValue(text, false);
		}

		if (comma_idx > -1 || (comma_idx == -1 && bInput)) {
			begin_pos = text.indexOf(c) + 1;
		}

		return {
			value : value, 
			text : text, 
			caret : begin_pos, 
			bChange : true
		};
	};

	_pEditMaskNumber._apply_digit_filter = function (c, value, text, begin_pos) {
		var ret = this.onInputDigit(text, c, begin_pos);
		var text = ret.text;

		return {
			value : this.normalizeValue(text), 
			text : text, 
			caret : ret.pos, 
			bChange : true
		};
	};

	_pEditMaskNumber._setLocale = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);

		this._strPoint = locale_info.decimal_point;

		if (locale_info.thousands_sep) {
			this._strSeparator = locale_info.thousands_sep;
		}
		else {
			this._strSeparator = this._default_thousands_sep;
		}

		if (!locale_info.grouping || locale_info.grouping[0] == 0) {
			this._grouping = this._default_grouping;
		}
		else {
			this._grouping = locale_info.grouping;
		}

		if (locale_info.positive_sign) {
			this._positive_sign = locale_info.positive_sign;
		}
		else {
			this._positive_sign = this._default_positive_sign;
		}

		if (locale_info.negative_sign) {
			this._negative_sign = locale_info.negative_sign;
		}
		else {
			this._negative_sign = this._default_negative_sign;
		}

		if (locale_info.p_sign_posn != undefined || locale_info.p_sign_posn != null) {
			this._positive_sign_posn = locale_info.p_sign_posn;
		}
		else {
			this._positive_sign_posn = this._default_positive_sign_posn;
		}

		if (locale_info.n_sign_posn != undefined || locale_info.n_sign_posn != null) {
			this._negative_sign_posn = locale_info.n_sign_posn;
		}
		else {
			this._negative_sign_posn = this._default_negative_sign_posn;
		}
	};

	_pEditMaskNumber.getInsertText = function (elem) {
		var insertText = "";
		var element_text = elem.getElementValue();
		var text = this._text;

		if (!text) {
			text = "";
		}

		var old_text = this._text;
		var cur_text = elem.getElementValue();

		if (this._pasteAction || this._keycode == 13 || this._stat_composition.getCurrentStatus() == nexacro.EditBase.Status.None) {
			var len = element_text.length - text.length;

			if (len == 0) {
				var bFind = false;
				var i = 0;

				for (i = 0; i < element_text.length; i++) {
					if (element_text[i] != text[i]) {
						insertText += element_text[i];
						bFind = true;
					}
					else if (bFind) {
						break;
					}
				}
			}
			else {
				insertText = element_text.substr(this._begin_pos, len);
			}
		}
		else {
			insertText = this._stat_composition.getData(elem);
		}

		return insertText;
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		_pEditMaskNumber._setElementValue = function (elem, begin, end, caretApply, valApply) {
			if (valApply) {
				elem.setElementValue(this._text, true);
			}
			else {
				elem.setElementValue(this._text);
			}

			if (caretApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else if (nexacro.Browser == "Safari") {
		_pEditMaskNumber._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				var pThis = this;
				nexacro.OnceCallbackTimer.callonce(this.comp, function () {
					pThis._accept_focus_event = false;
					pThis.setElementCaretPos(begin, end, elem);
				});
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}
	else {
		_pEditMaskNumber._setElementValue = function (elem, begin, end, bApply) {
			elem.setElementValue(this._text);

			if (bApply) {
				this.setElementCaretPos(begin, end, elem);
			}
			else {
				this.setElementCaretPos(begin, end);
			}
		};
	}

	_pEditMaskNumber._changeFocusText = function (elem) {
		var cur_val = this._value;
		var cur_text = elem.getElementValue();
		var cur_pos = elem.getElementCaretPos();
		var focus_text = "";

		if (!cur_val) {
			focus_text = this.makeText("", true);
		}
		else {
			if (elem.readonly) {
				focus_text = this.makeText(cur_val, false);
			}
			else {
				focus_text = this.makeText(cur_val, true);
			}
		}

		this._setText(focus_text);
		this.syncValue();

		if (elem && cur_text != focus_text) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				this._accept_blur_event = false;
			}

			elem.setElementValue(cur_val);

			if (nexacro.Browser == "Gecko") {
				this.setElementCaretPos(cur_pos.begin, cur_pos.end, elem);
			}
		}
	};

	_pEditMaskNumber._check_keypressPrevent = function (keyCode) {
		var ret = false;
		var filter_ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};
		var chartext = String.fromCharCode(keyCode);
		var old_chartext = chartext;

		filter_ret = this._apply_filter(chartext);

		if (!filter_ret.bChange) {
			ret = true;
		}

		return ret;
	};

	_pEditMaskNumber._check_backspace = function (elem) {
		var elem_value = elem.getElementValue();
		if (elem_value.length == (this._text.length - 1)) {
			if (!this._cutAction && !this._pasteAction && !this._is_composition()) {
				return true;
			}
		}

		return false;
	};

	_pEditMaskNumber._mouseup_process = function (elem) {
		if (this._is_composition()) {
			this._setCaret(elem);
		}
		else {
			var pThis = this;

			nexacro.OnceCallbackTimer.callonce(pThis.comp, function () {
				pThis._setCaret(elem);

				if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
					var cur_text = elem.getElementValue();
					if (cur_text == "" && cur_text != pThis._text) {
						pThis._setText(pThis.makeText(cur_text, true));
						if (pThis._value) {
							pThis._setValue(pThis.normalizeValue(pThis._text));
						}
						pThis.syncValue();

						pThis._setElementValue(elem, pThis._begin_pos, pThis._end_pos);
						pThis.setElementCaretPos(pThis._begin_pos, pThis._begin_pos, elem);
					}
				}

				if (pThis._text) {
					if (pThis._begin_pos == pThis._end_pos) {
						pThis._select_text = "";
					}
					else {
						pThis._select_text = pThis._text.substring(pThis._begin_pos, pThis._end_pos);
					}
				}
			});
		}
	};

	_pEditMaskNumber._focus_process = function (elem, mflag) {
		var comp = this.comp;
		var win = comp._getWindow();
		var cur_text = elem.getElementValue();

		if (!this._bChangeFocusText) {
			this._changeFocusText(elem);
			this._bChangeFocusText = true;
		}
		else {
			this._setText(cur_text);
		}

		if (win && win._keydown_element && comp._setcaret) {
			this.setElementCaretPos(comp._caret_pos.begin, comp._caret_pos.end, elem);
			comp._setcaret = false;
		}

		this._apply_autoselect(elem, mflag);
		this._stat_focus.setStatus(nexacro.EditBase.Status.Focus);
	};

	_pEditMaskNumber._blur_process = function (elem) {
		var cur_text = elem.getElementValue();

		if (!this._value) {
			var blur_text = this.makeText("", false);
		}
		else {
			var blur_text = this.makeText(this._value, false);
		}

		this._setText(blur_text);
		this.syncValue();
		this._bChangeFocusText = false;

		if (cur_text != blur_text || !this._value) {
			elem.setElementValue(this._value, true);
		}
	};

	_pEditMaskNumber._keyup_process_enter = function (elem) {
		var focus_text = this._getFocusText();
		var focus_val = this._getFocusValue();
		var cur_text = this._getText();
		var cur_val = this._getValue();

		if (focus_text != cur_text || focus_val != cur_val) {
			if (nexacro.OSVersion >= 6.0 && nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
				this._accept_keyinput_event = false;
			}

			this.comp._on_fire_changeEventSet(focus_text, focus_val, cur_text, cur_val);

			this.setElementCaretPos(this._begin_pos, this._begin_pos, elem);
		}
	};

	_pEditMaskNumber._on_default_input_keydown = function (elem, keyCode, altkey, ctrlkey, shiftkey) {
		this._setCaret(elem);

		this._keycode = keyCode;
		this._altkey = altkey;
		this._ctrlkey = ctrlkey;
		this._shiftkey = shiftkey;

		if (ctrlkey && (keyCode == 90)) {
			this._is_undo = true;
			this._undoStack.doUndo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}
		else if (ctrlkey && (keyCode == 89)) {
			this._is_undo = true;
			this._undoStack.doRedo();
			this._setCaret(elem);
			this._on_input_keyinput(elem);
			this._is_undo = false;

			elem._event_stop = true;
			return;
		}
	};

	_pEditMaskNumber._on_default_input_keypress = function (elem, keyCode, charCode, altKey, ctrlKey, shiftKey) {
		var ret = true;
		var k = charCode || keyCode;
		var comp = this.comp;
		var text_info = this._textEventInfo;
		var evt_fire = false;

		if (!comp) {
			return false;
		}
		if (elem.readonly) {
			if (k == nexacro.Event.KEY_BACKSPACE) {
				elem._event_stop = true;
			}
			return false;
		}

		this._set_old_info();

		if (keyCode == nexacro.Event.KEY_SPACE) {
			if (nexacro._isNull(this._value)) {
				var text = this.makeText("", false);
			}
			else {
				var text = this.makeText(this._value, false);
			}

			this._filteredtext = false;
			text_info.setTextInfo("", this._old_text, text, "", "", this._old_text);
			evt_fire = true;
		}

		if (k == nexacro.Event.KEY_BACKSPACE || (k == nexacro.Event.KEY_DELETE && k == this._keycode) || (nexacro.Browser == "MobileSafari" && k == 127)) {
			this.deleteChar(k == 8 ? true : false);
			text_info.setTextInfo("", this._old_text, this._text, "", "", this._old_text);
			evt_fire = true;
		}

		if (evt_fire) {
			ret = comp.on_fire_ontextchange(text_info);
			if (ret) {
				ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext);

				if (ret) {
					ret = comp.on_fire_onchar(text_info);
				}

				if (ret) {
					this._setText(text_info.posttext);
					this._setValue(this.normalizeValue(text_info.posttext));
					this.syncValue();

					if (nexacro.OSVersion >= 6.0 && nexacro.Browser == "IE" && (nexacro.BrowserVersion == 10 || nexacro.BrowserVersion == 9)) {
						this._accept_keyinput_event = false;
					}

					elem.setElementValue(this._text, true);
					this.setElementCaretPos(this._end_pos, this._end_pos, elem);

					if (text_info.pretext != text_info.posttext) {
						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._end_pos, this._end_pos);
						}

						comp._textchanging = true;
						comp.on_fire_ontextchanged(comp, text_info.pretext, text_info.posttext);
						comp._textchanging = false;
					}
				}
			}

			if (!ret) {
				this._setText(this._old_text);
				this._setValue(this.normalizeValue(this._old_text));
				this.syncValue();

				this.setElementCaretPos(this._old_begin_pos, this._old_end_pos);
			}

			this._select_text = "";
			elem._event_stop = true;
		}
		else if (nexacro.OS == "iOS") {
			bPrevent = this._check_keypressPrevent(keyCode);

			if (bPrevent) {
				elem._event_stop = true;
			}
		}

		return ret;
	};

	_pEditMaskNumber._on_default_input_keyup = function (elem, keycode, altkey, ctrlkey, shiftkey) {
		var comp = this.comp;

		this._altkey = altkey;
		this._ctrlkey = ctrlkey;
		this._shiftkey = shiftkey;

		if (!shiftkey && (keycode >= 37 && keycode <= 40)) {
			this._select_text = "";
		}

		if (keycode == 13) {
			this._keyup_process_enter(elem);

			return;
		}

		if (nexacro.OS == "iOS" || nexacro.OS == "Android") {
			if (this._filteredtext) {
				this._filteredtext = false;
				this.setElementCaretPos(this._begin_pos, this._end_pos, elem);
			}
			else {
				this._setCaret(elem);
			}
		}
		else {
			this._setCaret(elem);
		}
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
		if (nexacro.BrowserVersion == 10) {
			_pEditMaskNumber._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				if (!this._set_old_prop) {
					this._set_old_info();
				}

				if (this._is_selected()) {
					this.clearBuffer(text, this._begin_pos, this._end_pos);
					this._set_old_prop = true;

					if (!this._cutAction) {
						if (this._pasteAction) {
							this._isPasteActionComplete = false;
						}
						return;
					}
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}

				this._set_old_prop = false;
			};
		}
		else if (nexacro.BrowserVersion >= 9) {
			_pEditMaskNumber._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				this._set_old_info();

				if (this._is_selected()) {
					this.clearBuffer(text, this._begin_pos, this._end_pos);
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}
			};
		}
		else {
			_pEditMaskNumber._on_default_input_keyinput = function (elem) {
				if (this._accept_keyinput_event === false) {
					this._accept_keyinput_event = true;

					return false;
				}

				if (elem.readonly) {
					return false;
				}
				if (!this.comp) {
					return false;
				}

				var elem_value = elem.getElementValue();
				var text = this._text;
				if (!text) {
					text = "";
				}
				var insertText = "";

				if (elem_value == text) {
					this._setCaret(elem);
					return false;
				}

				if (!this._set_old_prop) {
					this._set_old_info();
				}

				if (this._is_selected()) {
					this.clearBuffer(text, this._begin_pos, this._end_pos);
					this._set_old_prop = true;

					return;
				}

				if (this._is_cleared(elem) && !this._cutAction) {
					this.clearBuffer(elem_value, this._begin_pos, this._end_pos);
				}

				insertText = this.getInsertText(elem);

				this._fire_text_event(insertText);

				if (!this._is_composition()) {
					this._stat_composition.init();
				}

				this._set_old_prop = false;
			};
		}
	}
	else {
		_pEditMaskNumber._on_default_input_keyinput = function (elem) {
			if (this._accept_keyinput_event === false) {
				this._accept_keyinput_event = true;

				return false;
			}

			if (elem.readonly) {
				return false;
			}
			if (!this.comp) {
				return false;
			}

			var elem_value = elem.getElementValue();
			var elem_pos = elem.getElementCaretPos();
			var text = this._text;
			if (!text) {
				text = "";
			}
			var insertText = "";

			if (elem_value == text) {
				this._setCaret(elem);
				return false;
			}

			this._set_old_info();

			if (this._is_selected()) {
				this.clearBuffer(text, this._begin_pos, this._end_pos);
			}

			if (this._check_backspace(elem)) {
				this.clearBuffer(elem_value, elem_pos.begin, elem_pos.end);
			}

			insertText = this.getInsertText(elem);

			this._fire_text_event(insertText);

			if (!this._is_composition()) {
				this._stat_composition.init();
			}
		};
	}

	_pEditMaskNumber._fire_text_event = function (chartext) {
		var comp = this.comp;
		var elem = comp._input_element;
		var elem_value = elem.getElementValue();

		var text_info = this._textEventInfo;
		var autoskip = comp.autoskip;
		var bFilter = false;
		var bFilled = false;
		var changeChartext = false;
		var ret = {
			value : null, 
			text : "", 
			begin_pos : this._input_begin_pos, 
			bChange : false
		};

		if (this._is_undo) {
			this._setText(elem_value);
			this._setValue(this.normalizeValue(this._text));
		}
		else if (this._pasteAction) {
			var i = 0;
			while (i < chartext.length) {
				var ch = chartext.charAt(i);

				ret = this._apply_filter(ch);

				if (ret.bChange) {
					this._setValue(ret.value);
					this._setText(ret.text);
					this.setElementCaretPos(ret.caret, ret.caret);
				}

				i++;
			}
		}
		else {
			ret = this._apply_filter(chartext);

			if (ret.bChange) {
				this._setValue(ret.value);
				this._setText(ret.text);
				this.setElementCaretPos(ret.caret, ret.caret);
			}
		}

		if (elem_value != this._text) {
			bFilter = true;
			this._filteredtext = true;
		}

		text_info.setTextInfo(chartext, this._old_text, this._text, "", "", this._old_text);

		var ret = comp.on_fire_ontextchange(text_info);
		if (ret) {
			ret = comp.on_fire_cancharchange(comp, text_info.chartext, text_info.pretext, text_info.posttext, text_info.pretext);
			if (ret) {
				ret = comp.on_fire_onchar(text_info);
				if (ret) {
					if (elem_value != text_info.posttext) {
						changeChartext = true;
					}

					if (text_info.pretext != text_info.posttext) {
						this.syncValue();

						if (!this._is_undo) {
							this._undoStack.push(this._value, this._text, this._begin_pos, this._begin_pos);
						}

						this.setElementCaretPos(this._begin_pos, this._end_pos, elem);

						comp.on_fire_ontextchanged(comp, this._old_text, this._text);
					}
				}
			}
		}

		if (!ret) {
			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this._setText(this._old_text);
			this._setValue(this._old_value);
			this.syncValue();

			this._setElementValue(elem, this._old_begin_pos, this._old_end_pos, true);

			return;
		}

		if (bFilter || changeChartext) {
			if (this._is_composition()) {
				this._stat_composition.setStatus(nexacro.EditBase.Status.CompositionEnd, "");
			}

			this.syncValue();

			this._setElementValue(elem, this._begin_pos, this._end_pos, true);
		}

		if (autoskip) {
			bFilled = this.isFilled();
			if (bFilled) {
				this._apply_autoskip();
			}
		}
	};

	delete _pEditMaskNumber;
	_pEditMaskNumber = null;


	nexacro.EditBase.Status = function (id) {
		this.id = id;
		this.init();
	};

	var _pEditBaseStatus = nexacro._createPrototype(nexacro.Object, nexacro.EditBase.Status);
	nexacro.EditBase.Status.prototype = _pEditBaseStatus;
	_pEditBaseStatus._type_name = "EditBaseStatus";

	_pEditBaseStatus._prev_stat = "";
	_pEditBaseStatus._curr_stat = "";

	_pEditBaseStatus.init = function () {
		this._prev_stat = nexacro.EditBase.Status.None;
		this._curr_stat = nexacro.EditBase.Status.None;
	};

	_pEditBaseStatus.setStatus = function (status) {
		this._prev_stat = this._curr_stat;
		this._curr_stat = status;
	};

	_pEditBaseStatus.getCurrentStatus = function () {
		return this._curr_stat;
	};

	_pEditBaseStatus.getPreviousStatus = function () {
		return this._prev_stat;
	};

	delete _pEditBaseStatus;
	_pEditBaseStatus = null;

	nexacro.EditBase.CompositionStatus = function (id) {
		nexacro.EditBase.Status.call(this, id);
	};
	var _pEditBaseCompositionStatus = nexacro._createPrototype(nexacro.EditBase.Status, nexacro.EditBase.CompositionStatus);
	nexacro.EditBase.CompositionStatus.prototype = _pEditBaseCompositionStatus;
	_pEditBaseCompositionStatus._type_name = "EditBaseCompositionStatus";

	_pEditBaseCompositionStatus._prev_stat = "";
	_pEditBaseCompositionStatus._curr_stat = "";
	_pEditBaseCompositionStatus._prev_data = "";
	_pEditBaseCompositionStatus._curr_data = "";

	_pEditBaseCompositionStatus.init = function () {
		this._prev_stat = nexacro.EditBase.Status.None;
		this._curr_stat = nexacro.EditBase.Status.None;
		this._prev_data = "";
		this._curr_data = "";
	};

	_pEditBaseCompositionStatus.setStatus = function (status, data) {
		this._prev_stat = this._curr_stat;
		this._curr_stat = status;
		this._prev_data = this._curr_data;
		this._curr_data = data;
	};

	_pEditBaseCompositionStatus.getData = function () {
		return this._curr_data;
	};

	_pEditBaseCompositionStatus.getPreviousData = function () {
		return this._prev_data;
	};

	delete _pEditBaseCompositionStatus;
	_pEditBaseCompositionStatus = null;

	nexacro.EditBase.Status.None = "none";
	nexacro.EditBase.Status.MouseDown = "mousedown";
	nexacro.EditBase.Status.MouseUp = "mouseup";
	nexacro.EditBase.Status.Click = "click";
	nexacro.EditBase.Status.Select = "select";
	nexacro.EditBase.Status.MouseMove = "mousemove";
	nexacro.EditBase.Status.MouseDrag = "drag";
	nexacro.EditBase.Status.MouseDragMove = "dragmove";
	nexacro.EditBase.Status.MouseDrop = "drop";
	nexacro.EditBase.Status.NoSelectDrag = "noselectdrag";

	nexacro.EditBase.Status.Focus = "focus";
	nexacro.EditBase.Status.Blur = "blur";

	nexacro.EditBase.Status.CompositionStart = "start";
	nexacro.EditBase.Status.CompositionUpdate = "update";
	nexacro.EditBase.Status.CompositionEnd = "end";

	nexacro.EditBase.UndoStack = function (comp) {
		this.init();

		this.comp = comp;
	};

	var _pEditBaseUndoStack = nexacro._createPrototype(nexacro.Object, nexacro.EditBase.UndoStack);
	nexacro.EditBase.UndoStack.prototype = _pEditBaseUndoStack;
	_pEditBaseUndoStack._type_name = "EditBaseUndoStack";

	_pEditBaseUndoStack.undoStack = [{
		value : 0, 
		selectionStart : 0, 
		selectionEnd : 0
	}];
	_pEditBaseUndoStack.comp = null;
	_pEditBaseUndoStack.undoPosition = 0;

	_pEditBaseUndoStack.init = function () {
		this.undoStack = [{
			value : 0, 
			text : 0, 
			selectionStart : 0, 
			selectionEnd : 0
		}];

		this.undoPosition = 0;
	};

	_pEditBaseUndoStack._destroy = function () {
		this.comp = null;
		this.undoStack = null;
	};

	_pEditBaseUndoStack.push = function (value, text, start, end) {
		if (!text) {
			if (!value) {
				text = "";
			}
			else {
				text = value;
			}
		}

		var undoItem = {
			value : value, 
			text : text, 
			selectionStart : start, 
			selectionEnd : end
		};
		var curUndoItem = this.undoStack[this.undoPosition];

		if (curUndoItem.value === value) {
			this.refreshUndoItem(undoItem);
		}
		else {
			this.undoStack.length = ++this.undoPosition;
			this.undoStack.push(undoItem);
		}
	};

	_pEditBaseUndoStack.restoreUndoItem = function (item) {
		var elem = this.comp._input_element;
		if (elem) {
			elem.text = item.text;
			elem.value = item.value;

			elem._updateInputValue();
			elem.setElementSetSelect(item.selectionStart, item.selectionEnd);
		}
	};

	_pEditBaseUndoStack.refreshUndoItem = function (item) {
		var bChange = false;
		var curUndoItem = this.undoStack[this.undoPosition];

		if (curUndoItem.value !== item.value || curUndoItem.text !== item.text || curUndoItem.selectionStart !== item.selectionStart || curUndoItem.selectionEnd !== item.selectionEnd) {
			bChange = true;
		}

		if (bChange) {
			this.undoStack[this.undoPosition] = item;
		}
	};

	_pEditBaseUndoStack.doUndo = function () {
		if (this.comp && this.comp.readonly) {
			return;
		}
		if (this.undoPosition > 1) {
			this.restoreUndoItem(this.undoStack[--this.undoPosition]);
		}
	};

	_pEditBaseUndoStack.doRedo = function () {
		if (this.comp && this.comp.readonly) {
			return;
		}
		if (this.undoPosition < this.undoStack.length - 1) {
			this.restoreUndoItem(this.undoStack[++this.undoPosition]);
		}
	};

	delete _pEditBaseUndoStack;
	_pEditBaseUndoStack = null;

	nexacro.EditBase.TextEventInfo = function (comp) {
		this.init();

		this.comp = comp;
	};

	var _pEditBaseTextEventInfo = nexacro._createPrototype(nexacro.Object, nexacro.EditBase.TextEventInfo);
	nexacro.EditBase.TextEventInfo.prototype = _pEditBaseTextEventInfo;
	_pEditBaseTextEventInfo._type_name = "EditBaseTextEventInfo";

	_pEditBaseTextEventInfo.init = function () {
		this.chartext = null;

		this.pretext = null;
		this.posttext = null;

		this.preimetext = null;
		this.postimetext = null;

		this.prechareventtext = null;

		this.bInsert = true;
		this.bCut = false;
	};

	_pEditBaseTextEventInfo._destroy = function () {
		this.comp = null;

		this.chartext = null;

		this.pretext = null;
		this.posttext = null;

		this.preimetext = null;
		this.postimetext = null;

		this.prechareventtext = null;

		this.bInsert = true;
		this.bCut = false;
	};

	_pEditBaseTextEventInfo.setTextInfo = function (chartext, pretext, posttext, preimetext, postimetext, prechareventtext, bInsert, bCut) {
		this.chartext = chartext;

		this.pretext = pretext;
		this.posttext = posttext;

		this.preimetext = preimetext;
		this.postimetext = postimetext;

		this.prechareventtext = prechareventtext;

		this.bInsert = bInsert;
		this.bCut = bCut;
	};

	delete _pEditBaseTextEventInfo;
	_pEditBaseTextEventInfo = null;
}
