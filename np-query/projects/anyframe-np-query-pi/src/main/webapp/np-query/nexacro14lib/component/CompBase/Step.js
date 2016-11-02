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

if (!nexacro.Step) {
	nexacro.StepChangeEventInfo = function (obj, id, preindex, postindex) {
		this.id = this.eventid = id || "onstepchanged";
		this.fromobject = obj._form || obj;
		this.fromreferenceobject = obj;

		this.preindex = preindex;
		this.postindex = postindex;
	};


	var _pEventStepChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.StepChangeEventInfo);
	nexacro.StepChangeEventInfo.prototype = _pEventStepChangeEventInfo;
	_pEventStepChangeEventInfo._type_name = "StepChangeEventInfo";
	delete _pEventStepChangeEventInfo;

	nexacro.StepMouseEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		nexacro.ClickEventInfo.call(this, obj, id || "onstepmouse", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

		this.index = index < 0 ? -1 : index;
	};
	var _pEventStepMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.StepMouseEventInfo);
	nexacro.StepMouseEventInfo.prototype = _pEventStepMouseEventInfo;
	_pEventStepMouseEventInfo._type_name = "StepMouseEventInfo";
	delete _pEventStepMouseEventInfo;

	nexacro.StepDragEventInfo = function (obj, id, index, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		nexacro.DragEventInfo.call(this, obj, id || "onstepdrag", dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
		this.index = index ? -1 : index;
	};

	var _pEventStepDragEventInfo = nexacro._createPrototype(nexacro.DragEventInfo, nexacro.StepDragEventInfo);
	nexacro.StepDragEventInfo.prototype = _pEventStepDragEventInfo;
	_pEventStepDragEventInfo._type_name = "StepDragEventInfo";
	delete _pEventStepDragEventInfo;

	nexacro.Step_Style = function (target) {
		nexacro.Style.call(this, target);
		this._initStyle();
	};

	var _pStepStyle = nexacro._createPrototype(nexacro.Style, nexacro.Step_Style);
	nexacro.Step_Style.prototype = _pStepStyle;

	_pStepStyle._initStyle = function () {
		this.buttonalign = null;
		this.buttonbackground = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttongradation = null;
		this.buttonimage = null;
		this.buttonpadding = null;
		this.buttonsize = null;
	};

	eval(nexacro._createAlignAttributeEvalStr("_pStepStyle", "buttonalign"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pStepStyle", "buttonbackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pStepStyle", "buttonborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pStepStyle", "buttonbordertype"));
	eval(nexacro._createGradationAttributeEvalStr("_pStepStyle", "buttongradation"));
	eval(nexacro._createValueAttributeEvalStr("_pStepStyle", "buttonimage"));
	eval(nexacro._createPaddingAttributeEvalStr("_pStepStyle", "buttonpadding"));
	eval(nexacro._createValueAttributeEvalStr("_pStepStyle", "buttonsize"));

	_pStepStyle.__custom_emptyObject = function () {
		this._initStyle();
	};

	_pStepStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.buttonalign && this.buttonalign._is_empty) {
			val += "buttonalign:" + this.buttonalign._value + "; ";
		}
		if (this.buttonbackground && this.buttonbackground._is_empty) {
			val += "buttonbackground:" + this.buttonbackground._value + "; ";
		}
		if (this.buttonborder && this.buttonborder._is_empty) {
			val += "buttonborder:" + this.buttonborder._value + "; ";
		}
		if (this.buttonbordertype && this.buttonbordertype._is_empty) {
			val += "buttonbordertype:" + this.buttonbordertype._value + "; ";
		}
		if (this.buttongradation && this.buttongradation._is_empty) {
			val += "buttongradation:" + this.buttongradation._value + "; ";
		}
		if (this.buttonimage && this.buttonimage._is_empty) {
			val += "buttonimage:" + this.buttonimage._value + "; ";
		}
		if (this.buttonpadding && this.buttonpadding._is_empty) {
			val += "buttonpadding:" + this.buttonpadding._value + "; ";
		}
		if (this.buttonsize && this.buttonsize._is_empty) {
			val += "buttonsize:" + this.buttonsize._value + "; ";
		}

		return val;
	};


	nexacro.Step_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		nexacro.Step_Style.prototype._initStyle.call(this);
	};

	var _pStepCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Step_CurrentStyle);
	nexacro.Step_CurrentStyle.prototype = _pStepCurrentStyle;

	_pStepCurrentStyle.__get_custom_style_value = _pStepStyle.__get_custom_style_value;
	_pStepCurrentStyle.__custom_emptyObject = _pStepStyle.__custom_emptyObject;

	delete _pStepStyle;
	delete _pStepCurrentStyle;

	nexacro.Step = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.stepcount = 0;
		this.stepindex = 0;
		this.text = "";
		this.canstepchange = null;
		this.onstepchanged = null;
		35;
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
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1, 
			"ondrop" : 1, 
			"ondragend" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmousedown" : 1, 
			"onmouseup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"canstepchange" : 1, 
			"onstepchanged" : 1, 
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
			"ontap" : 1, 
			"onlongpress" : 1
		};


		this._items = [];
		this._btn_img_info = 
			{
			width : 0, 
			height : 0, 
			isimg : false
		};
		this._prestepindex = null;
		this._poststepindex = null;
		this._prestepcount = null;
		this._poststepcount = null;

		this._ischange = false;

		this._accessibility_role = "step";
	};

	var _pStep = nexacro._createPrototype(nexacro.Component, nexacro.Step);
	nexacro.Step.prototype = _pStep;
	_pStep._type_name = "Step";

	_pStep.on_apply_custom_pseudo = function (pseudo) {
		var currentstyle = this.currentstyle;
		var align = this.on_find_CurrentStyle_align(pseudo);
		var color = this.on_find_CurrentStyle_color(pseudo);
		var cursor = this.on_find_CurrentStyle_cursor(pseudo);
		var font = this.on_find_CurrentStyle_font(pseudo);
		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		var padding = this.on_find_CurrentStyle_padding(pseudo);

		var buttonalign = this.on_find_CurrentStyle_buttonalign(pseudo);
		var buttonbackground = this.on_find_CurrentStyle_buttonbackground(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(pseudo);
		var buttongradation = this.on_find_CurrentStyle_buttongradation(pseudo);
		var buttonimage = this.on_find_CurrentStyle_buttonimage(pseudo);
		var buttonpadding = this.on_find_CurrentStyle_buttonpadding(pseudo);
		var buttonsize = this.on_find_CurrentStyle_buttonsize(pseudo);

		if (align != currentstyle.align) {
			currentstyle.align = align;
		}
		if (color != currentstyle.color) {
			currentstyle.color = color;
		}
		if (font != currentstyle.font) {
			currentstyle.font = font;
		}
		if (letterspace != currentstyle.letterspace) {
			currentstyle.letterspace = letterspace;
		}
		if (padding != currentstyle.padding) {
			currentstyle.padding = padding;
		}

		if (buttonalign != currentstyle.buttonalign) {
			currentstyle.buttonalign = buttonalign;
		}
		if (buttonbackground != currentstyle.buttonbackground) {
			currentstyle.buttonbackground = buttonbackground;
		}
		if (buttonborder != currentstyle.buttonborder) {
			currentstyle.buttonborder = buttonborder;
		}
		if (buttonbordertype != currentstyle.buttonbordertype) {
			currentstyle.buttonbordertype = buttonbordertype;
		}
		if (buttongradation != currentstyle.buttongradation) {
			currentstyle.buttongradation = buttongradation;
		}
		if (buttonimage != currentstyle.buttonimage) {
			currentstyle.buttonimage = buttonimage;
		}
		if (buttonpadding != currentstyle.buttonpadding) {
			currentstyle.buttonpadding = buttonpadding;
		}
		if (buttonsize != currentstyle.buttonsize) {
			currentstyle.buttonsize = buttonsize;
		}

		this.on_apply_style_align(align);
		this.on_apply_style_color(color);
		this.on_apply_style_font(font);
		this.on_apply_style_letterspace(letterspace);
		this.on_apply_style_cursor(cursor);
		this.on_apply_style_padding(padding);
	};


	_pStep.on_find_CurrentStyle_buttonalign = function (pseudo) {
		var buttonalign = this._find_pseudo_obj("buttonalign", pseudo, "align");
		return buttonalign;
	};

	_pStep.on_find_CurrentStyle_buttonbackground = function (pseudo) {
		var buttonbackground = this._find_pseudo_obj("buttonbackground", pseudo, "background");
		return buttonbackground;
	};

	_pStep.on_find_CurrentStyle_buttonborder = function (pseudo) {
		var buttonborder = this._find_pseudo_obj("buttonborder", pseudo, "border");
		return buttonborder;
	};

	_pStep.on_find_CurrentStyle_buttonbordertype = function (pseudo) {
		var buttonbordertype = this._find_pseudo_obj("buttonbordertype", pseudo, "bordertype");
		return buttonbordertype;
	};

	_pStep.on_find_CurrentStyle_buttongradation = function (pseudo) {
		var buttongradation = this._find_pseudo_obj("buttongradation", pseudo, "gradation");
		return buttongradation;
	};

	_pStep.on_find_CurrentStyle_buttonimage = function (pseudo) {
		var buttonimage = this._find_pseudo_obj("buttonimage", pseudo);
		return buttonimage;
	};

	_pStep.on_find_CurrentStyle_buttonpadding = function (pseudo) {
		var buttonpadding = this._find_pseudo_obj("buttonpadding", pseudo, "padding");
		return buttonpadding;
	};

	_pStep.on_find_CurrentStyle_buttonsize = function (pseudo) {
		var buttonsize = this._find_pseudo_obj("buttonsize", pseudo);
		return buttonsize;
	};


	_pStep.on_update_style_buttonalign = function () {
		var buttonalign = this.on_find_CurrentStyle_buttonalign(this._pseudo);
		this.currentstyle.buttonalign = buttonalign;
		this.on_apply_style_buttonalign(buttonalign);
	};

	_pStep.on_update_style_buttonbackground = function () {
		var buttonbackground = this.on_find_CurrentStyle_buttonbackground(this._pseudo);
		this.currentstyle.buttonbackground = buttonbackground;
		this.on_apply_style_buttonbackground(buttonbackground);
	};

	_pStep.on_update_style_buttonborder = function () {
		var buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo);
		this.currentstyle.buttonborder = buttonborder;
		this.on_apply_style_buttonborder(buttonborder);
	};

	_pStep.on_update_style_buttonbordertype = function () {
		var buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(this._pseudo);
		this.currentstyle.buttonbordertype = buttonbordertype;
		this.on_apply_style_buttonbordertype(buttonbordertype);
	};

	_pStep.on_update_style_buttongradation = function () {
		var buttongradation = this.on_find_CurrentStyle_buttongradation(this._pseudo);
		this.currentstyle.buttongradation = buttongradation;
		this.on_apply_style_buttongradation(buttongradation);
	};

	_pStep.on_update_style_buttonimage = function () {
		var buttonimage = this.on_find_CurrentStyle_buttonimage(this._pseudo);
		this.currentstyle.buttonimage = buttonimage;
		this.on_apply_style_buttonimage(buttonimage);
	};

	_pStep.on_update_style_buttonpadding = function () {
		var buttonpadding = this.on_find_CurrentStyle_buttonpadding(this._pseudo);
		this.currentstyle.buttonpadding = buttonpadding;
		this.on_apply_style_buttonpadding(buttonpadding);
	};

	_pStep.on_update_style_buttonsize = function () {
		var buttonsize = this.on_find_CurrentStyle_buttonsize(this._pseudo);
		this.currentstyle.buttonsize = buttonsize;
		this.on_apply_style_buttonsize(buttonsize);
	};


	_pStep.on_apply_style_cursor = function (v) {
		nexacro.Component.prototype.on_apply_style_cursor.call(this, v);
		var item = this._items;
		var item_len = item.length;

		for (var i = 0; i < item_len; i++) {
			item[i].on_apply_style_cursor(v);
		}
	};

	_pStep.on_apply_style_buttonalign = function (v) {
		this.on_apply_stepcount();
	};

	_pStep.on_apply_style_buttonbackground = function (v) {
		var item = this._items;
		var item_len = item.length;

		for (var i = 0; i < item_len; i++) {
			item[i].on_apply_style_background(v);
		}
	};

	_pStep.on_apply_style_buttonborder = function (v) {
		var item = this._items;
		var item_len = item.length;

		for (var i = 0; i < item_len; i++) {
			item[i].on_apply_style_border(v);
		}
	};

	_pStep.on_apply_style_buttonbordertype = function (v) {
		var item = this._items;
		var item_len = item.length;

		for (var i = 0; i < item_len; i++) {
			item[i].on_apply_style_bordertype(v);
		}
	};

	_pStep.on_apply_style_buttongradation = function (v) {
		var item = this._items;
		var item_len = item.length;

		for (var i = 0; i < item_len; i++) {
			item[i].on_apply_style_gradation(v);
		}
	};

	_pStep.on_apply_style_buttonimage = function (v) {
		var button = this._items[this.stepindex];
		button.style.set_image(v);
	};

	_pStep.on_apply_style_buttonpadding = function (v) {
		this.on_apply_stepcount();
	};

	_pStep.on_apply_style_buttonsize = function (v) {
		this.on_apply_stepcount();
	};


	_pStep.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;
			var info = this._btn_img_info;
			var img = this.on_find_CurrentStyle_buttonimage(this._pseudo);
			var size = 0;
			if (img) {
				size = nexacro._getImageSize(img.value, this._loadImage, this, this._getRefFormBaseUrl());
			}

			if (this.text) {
				var text_elem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = text_elem;
				var halign = curstyle.align.halign == "" ? "center" : curstyle.align._halign;
				var valign = curstyle.align.valign == "" ? "middle" : curstyle.align._valign;
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementFont(curstyle.font);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(curstyle.letterspace);
			}
			if (size) {
				info.width = size.width;
				info.height = size.height;
				info.isimg = true;
			}
		}
	};

	_pStep.on_created_contents = function () {
		if (this.text || this.expr) {
			this.on_apply_text();
			var text_elem = this._text_elem;
			if (text_elem) {
				text_elem.create();
			}
		}

		if (this._btn_img_info.isimg) {
			this.on_apply_stepcount();
			this.on_apply_stepindex();
		}

		this._setEventHandler("onsize", this.__onSize);
	};

	_pStep.on_destroy_contents = function () {
		var text_elem = this._text_elem;

		this._deleteStepButton();
		if (text_elem) {
			text_elem.destroy();
		}

		this._text_elem = null;
	};

	_pStep.on_change_containerRect = function () {
	};

	_pStep.on_create_custom_style = function () {
		return new nexacro.Step_Style(this);
	};

	_pStep.on_create_custom_currentstyle = function () {
		return new nexacro.Step_CurrentStyle();
	};

	_pStep._on_getAccessibilityAdditionalLabel = function () {
		return this.stepindex + " " + this.stepcount;
	};

	_pStep.set_stepcount = function (v) {
		if (v != this.stepcount) {
			if ((+v) != (+v)) {
				v = 0;
			}
			else {
				v = parseInt(v) | 0;
			}
			this._prestepindex = this.stepindex;
			this._prestepcount = this.stepcount;

			this._poststepcount = v;

			if (this._prestepcount != this._poststepcount) {
				this.stepcount = this._poststepcount;

				if (this.stepindex >= this.stepcount) {
					this.stepindex = this.stepcount - 1;
				}

				var form = this._form;
				if (form) {
					form._apply_stepcount();
				}
				else {
					this.on_apply_stepcount();
				}
			}
		}
	};

	_pStep.set_stepindex = function (v) {
		if ((+v) != (+v)) {
			v = 0;
		}
		else {
			v = parseInt(v) | 0;
		}

		this._ischange = false;
		if (v != this.stepindex) {
			var check_count = this.stepcount <= v || v < 0;
			if (!check_count) {
				this._prestepindex = this.stepindex;
				this._poststepindex = v;

				var ret = this.on_fire_canstepchange(this);

				if (ret !== false) {
					this.stepindex = this._poststepindex;
					this.on_apply_stepindex();
					this.on_fire_onstepchanged(this);
				}
			}
		}
	};

	_pStep.on_apply_stepcount = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this._btn_img_info.isimg) {
				var item = this._items;
				var item_len = item.length;
				if (item_len > 0) {
					this._deleteStepButton();
				}
				this._drawStepButton();
			}
		}
	};

	_pStep.on_apply_stepindex = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var oldstep_idx = this._prestepindex;
			var step_idx = this.stepindex;
			if (oldstep_idx != step_idx) {
				this._changeStepIndex(oldstep_idx, step_idx);
				this._ischange = true;
			}
			else {
				this._ischange = false;
			}
		}
	};

	_pStep.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pStep.on_apply_text = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem;
			if (!text_elem) {
				text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem.setElementSize(this._client_width, this._client_height);
				this._text_elem = text_elem;

				if (this._is_created) {
					var currentstyle = this.currentstyle;
					var halign = currentstyle.align.halign == "" ? "center" : currentstyle.align._halign;
					var valign = currentstyle.align.valign == "" ? "middle" : currentstyle.align._valign;
					text_elem.setElementColor(currentstyle.color);
					text_elem.setElementFont(currentstyle.font);
					text_elem.setElementAlignXY(halign, valign);
					text_elem.setElementLetterSpace(currentstyle.letterspace);
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
		}
	};


	_pStep.on_fire_canstepchange = function (obj) {
		if (this.canstepchange && this.canstepchange._has_handlers) {
			var evt = new nexacro.StepChangeEventInfo(obj, "canstepchange", obj._prestepindex, obj._poststepindex);
			return this.canstepchange._fireCheckEvent(this, evt);
		}
	};

	_pStep.on_fire_onstepchanged = function (obj) {
		if (this.onstepchanged && this.onstepchanged._has_handlers) {
			var evt = new nexacro.StepChangeEventInfo(obj, "onstepchanged", obj._prestepindex, obj._poststepindex);
			return this.onstepchanged._fireEvent(this, evt);
		}
	};


	_pStep.getStepCount = function () {
		return this.stepcount;
	};

	_pStep.getStepIndex = function () {
		return this.stepindex;
	};

	_pStep.setStepIndex = function (v) {
		this.set_stepindex(v);
		return this._ischange;
	};

	_pStep.stepIt = function (forward, rotate) {
		var stepindex = this.stepindex;
		var max_step = this.stepcount;
		if (forward == undefined) {
			forward = true;
		}
		else {
			forward = nexacro._toBoolean(forward);
		}

		rotate = nexacro._toBoolean(rotate);
		if (forward) {
			stepindex++;
			if (stepindex >= max_step) {
				stepindex = max_step - 1;
				if (rotate) {
					stepindex = 0;
				}
			}
		}
		else {
			stepindex--;
			if (stepindex < 0) {
				stepindex = 0;
				if (rotate) {
					stepindex = max_step - 1;
				}
			}
		}
		this.set_stepindex(stepindex);
		return this._ischange;
	};


	_pStep._deleteStepButton = function () {
		var item = this._items;
		var item_len = item.length;

		for (var i = 0; i < item_len; i++) {
			item[i].destroy();
		}
		this._items = [];
	};

	_pStep._drawStepButton = function () {
		var stepcount = this.stepcount;
		if (stepcount > 0) {
			var items = this._items;
			var stepindex = this.stepindex;
			var img_info = this._btn_img_info;

			var pseudo = this._pseudo;
			var align = this.on_find_CurrentStyle_align(pseudo);
			var btn_align = this.on_find_CurrentStyle_buttonalign(pseudo);
			var btn_padding = this.on_find_CurrentStyle_buttonpadding(pseudo);

			var text = this.text;
			var font = this.on_find_CurrentStyle_font(pseudo);
			var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
			var txt_size = nexacro._getTextSize2(letterspace, text, font);
			var txtArea_width = txt_size[0];
			var txtArea_height = txt_size[1];

			var client_width = this._client_width;
			var client_height = this._client_height;

			var btn_size = this._getButtonSize();
			var btnArea = this._getButtonAreaSize(btn_size, stepcount);
			var btnArea_width = btnArea.btnArea_width;
			var btnArea_height = btnArea.btnArea_height;

			var btn_l = 0;
			var btn_t = 0;
			var btn_r = 0;
			var btn_b = 0;

			if (btn_align) {
				switch (btn_align.halign) {
					case "left":
						btn_l = btn_padding.left;
						break;
					case "lefttext":
						switch (align.halign) {
							case "left":
								btn_l = btn_padding.left;
								break;
							case "center":
								btn_l = (client_width / 2) - ((btnArea_width + txtArea_width) / 2) + btn_padding.left;
								break;
							case "right":
								btn_l = client_width - btnArea_width - txtArea_width + btn_padding.left;
								break;
						}
						break;
					case "center":
						btn_l = (client_width / 2) - (btnArea_width / 2) + btn_padding.left;
						break;
					case "right":
						btn_l = client_width - btnArea_width + btn_padding.left;
						break;
					case "righttext":
						switch (align.halign) {
							case "left":
								btn_l = txtArea_width + btn_padding.left;
								break;
							case "center":
								btn_l = (client_width / 2) - ((btnArea_width + txtArea_width) / 2) + txtArea_width + btn_padding.left;
								break;
							case "right":
								btn_l = client_width - btnArea_width + btn_padding.left;
								break;
						}
						break;
					default:
						break;
				}

				switch (btn_align.valign) {
					case "top":
						btn_t = btn_padding.top;
						break;
					case "toptext":
						switch (align.valign) {
							case "top":
								btn_t = btn_padding.top;
								break;
							case "middle":
								btn_t = (client_height / 2) - ((btnArea_height + txtArea_height) / 2) + btn_padding.top;
								break;
							case "bottom":
								btn_t = client_height - btnArea_height - txtArea_height + btn_padding.top;
								break;
						}
						break;
					case "middle":
						btn_t = (client_height / 2) - (btnArea_height / 2) + btn_padding.top;
						break;
					case "bottom":
						btn_t = client_height - btnArea_height + btn_padding.top;
						break;
					case "bottomtext":
						switch (align.valign) {
							case "top":
								btn_t = txtArea_height + btn_padding.top;
								break;
							case "middle":
								btn_t = (client_height / 2) - ((btnArea_height + txtArea_height) / 2) + txtArea_height + btn_padding.top;
								break;
							case "bottom":
								btn_t = client_height - btnArea_height + btn_padding.top;
								break;
						}
						break;
					default:
						break;
				}
			}

			btn_w = btn_size;
			btn_h = btn_size;

			for (var i = 0; i < stepcount; i++) {
				var stepButton = new nexacro.StepImageButtonCtrl("" + i, "absolute", btn_l, btn_t, btn_w, btn_h, null, null, this);
				stepButton._setEventHandler("onclick", this.__onStepButtonClick, this);
				stepButton.createComponent();
				stepButton.on_created();
				if (i == stepindex) {
					var btn_image = this.on_find_CurrentStyle_buttonimage(pseudo);
					stepButton.style.set_image(btn_image);
				}

				items[i] = stepButton;
				btn_l = btn_l + btn_w + btn_padding.left + btn_padding.right;
			}

			this._items = items;
			this.on_apply_style_buttonbordertype(this.on_find_CurrentStyle_buttonbordertype(pseudo));
		}
	};

	_pStep._changeStepIndex = function (pre_step_idx, post_step_idx) {
		var button_image = this.on_find_CurrentStyle_buttonimage(this._pseudo);
		var pre_button = this._items[pre_step_idx];
		var post_button = this._items[post_step_idx];

		if (pre_button) {
			pre_button.style.set_image("");
		}
		if (post_button && button_image && !button_image._is_empty) {
			post_button.style.set_image(button_image);
		}
		else {
		}
	};

	_pStep._loadImage = function (url, width, height) {
		var info = this._btn_img_info;
		info.width = width;
		info.height = height;
		info.isimg = true;
		this.on_apply_stepcount();
	};

	_pStep.__onStepButtonClick = function (obj, e) {
		this.set_stepindex(obj.id);
	};

	_pStep.__onSize = function (obj, e) {
		this.on_apply_stepcount();
	};

	_pStep._getButtonSize = function () {
		var pseudo = this._pseudo;
		var img_info = this._btn_img_info;
		var btn_size = this.on_find_CurrentStyle_buttonsize(pseudo);
		btn_size = btn_size ? (parseInt(btn_size) | 0) : btn_size;

		if (img_info.width > btn_size || img_info.height > btn_size) {
			var max = Math.max(img_info.width, img_info.height);
			btn_size = max;
		}
		return btn_size;
	};

	_pStep._getButtonAreaSize = function (stepcount, btn_size) {
		var btn_padding = this.on_find_CurrentStyle_buttonpadding(this._pseudo);
		var step_padding = this.on_find_CurrentStyle_padding(this._pseudo);

		var btnArea_width = step_padding.left + step_padding.right;
		btnArea_width = btnArea_width + ((btn_padding.left + btn_padding.right + btn_size) * stepcount);

		var btnArea_height = step_padding.top + step_padding.bottom;
		btnArea_height = btnArea_height + btn_padding.top + btn_padding.bottom + btn_size;

		return {
			width : btnArea_width, 
			height : btnArea_height
		};
	};

	delete _pStep;


	nexacro.StepCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Step.call(this, id, position, left, top, width, height, right, bottom, parent);


		this._is_nc_control = true;
		this._is_subcontrol = true;
		this._form = parent;
		this._refform = parent;
	};

	var _pStepCtrl = nexacro._createPrototype(nexacro.Step, nexacro.StepCtrl);
	nexacro.StepCtrl.prototype = _pStepCtrl;
	nexacro._setForControlStyleFinder(_pStepCtrl);

	_pStepCtrl._type_name = "StepControl";

	_pStepCtrl.on_created_contents = function () {
		if (this._btn_img_info.isimg) {
			this.on_apply_stepcount();
			this.on_apply_stepindex();
		}

		this.on_apply_text();
		this.on_apply_expr();

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.create();
		}

		this.on_apply_stepcount();
	};

	_pStepCtrl.on_change_containerRect = function (width, height) {
		var control_elem = this.getElement();
		if (control_elem) {
			var form = this._form;
			if (form) {
				this.on_apply_stepcount();
			}
		}
	};

	_pStepCtrl.set_stepindex = function (v) {
		if ((+v) != (+v)) {
			v = 0;
		}
		else {
			v = parseInt(v) | 0;
		}

		if (v != this.stepindex) {
			var check_count = this.stepcount <= v || v < 0;
			if (!check_count) {
				this._prestepindex = this.stepindex;
				this._poststepindex = v;

				var ret = this._form.on_fire_canstepchange(this);

				if (ret !== false) {
					this.stepindex = this._poststepindex;
					this.on_apply_stepindex();
					this._form.on_fire_onstepchanged(this);
					return true;
				}
			}
		}
		return false;
	};

	_pStepCtrl.on_apply_stepindex = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var form = this._form;
			var oldstep_idx = this._prestepindex;
			var step_idx = this.stepindex;
			var layoutmanager = application.getLayoutManager();

			if (oldstep_idx != step_idx) {
				this._changeStepIndex(oldstep_idx, step_idx);
				if (layoutmanager) {
					layoutmanager.setStepIndex(form, step_idx);
				}
			}
		}
	};

	_pStepCtrl._drawStepButton = function () {
		var stepcount = this.stepcount;
		if (stepcount > 0) {
			var stepindex = this.stepindex;
			var items = this._items;
			var pseudo = this._pseudo;
			var layout = this.parent;
			var client_width = this._client_width;
			var client_height = this._client_height;
			var layout_width = layout._client_width;
			var layout_height = layout._client_height;

			var btn_size = this._getButtonSize();
			var btn_padding = this.on_find_CurrentStyle_buttonpadding(pseudo);
			var step_padding = this.on_find_CurrentStyle_padding(pseudo);

			var btn_l = btn_padding.left;
			var btn_t = (((client_height - btn_size) / 2) + btn_padding.top) - btn_padding.bottom;
			var btn_w = btn_size;
			var btn_h = btn_size;

			for (var i = 0; i < stepcount; i++) {
				var stepButton = new nexacro.StepImageButtonCtrl("" + i, "absolute", btn_l, btn_t, btn_w, btn_h, null, null, this);
				stepButton._setEventHandler("onclick", this.__onStepButtonClick, this);
				stepButton.createComponent();
				stepButton.on_created();

				if (i == stepindex) {
					var btn_image = this.on_find_CurrentStyle_buttonimage(pseudo);
					stepButton.style.set_image(btn_image);
				}

				items[i] = stepButton;
				btn_l = btn_l + btn_w + btn_padding.left + btn_padding.right;
			}

			this._items = items;
			this.on_apply_style_buttonbordertype(this.on_find_CurrentStyle_buttonbordertype(pseudo));
		}
	};

	delete _pStepCtrl;
}
;