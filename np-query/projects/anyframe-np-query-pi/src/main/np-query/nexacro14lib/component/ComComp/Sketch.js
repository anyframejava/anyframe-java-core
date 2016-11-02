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

if (!nexacro.Sketch) {
	nexacro.SketchLoadEventInfo = function (obj, id, url) {
		this.id = this.eventid = id || "onload";
		this.fromobject = this.fromreferenceobject = obj;
		this.url = url;
	};
	var _pSketchLoadEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.LoadEventInfo);
	nexacro.LoadEventInfo.prototype = _pSketchLoadEventInfo;
	_pSketchLoadEventInfo._type_name = "SketchLoadEventInfo";

	delete _pSketchLoadEventInfo;
	_pSketchLoadEventInfo = null;

	nexacro.SketchErrorEventInfo = function (obj, id, fireerrorcode, errormsg, errortype, locationuri, imageurl, errstatus) {
		this.id = this.eventid = id || "onerror";
		this.errormsg = errormsg;
		this.errorobj = obj;
		this.errortype = errortype;
		this.locationuri = locationuri;
		this.requesturi = imageurl;
		this.statuscode = errstatus;
	};
	var _pSketchErrorEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ErrorEventInfo);
	nexacro.ErrorEventInfo.prototype = _pSketchErrorEventInfo;
	_pSketchErrorEventInfo._type_name = "SketchErrorEventInfo";

	delete _pSketchErrorEventInfo;
	_pSketchErrorEventInfo = null;

	nexacro.SuccessEventInfo = function (obj, id, handle) {
		this.id = this.eventid = id || "onsuccess";
		this.handle = handle;
		this.fromobject = this.fromreferenceobject = obj;
	};
	var _pSketchSuccessEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.SuccessEventInfo);
	nexacro.SuccessEventInfo.prototype = _pSketchSuccessEventInfo;
	_pSketchSuccessEventInfo._type_name = "SketchSuccessEventInfo";
	nexacro.SketchSuccessEventInfo = nexacro.SuccessEventInfo;

	delete _pSketchSuccessEventInfo;
	_pSketchSuccessEventInfo = null;
	nexacro.CharEventInfo = function (obj, id, chartext, pretext, posttext) {
		this.id = this.eventid = id || "onchar";
		this.fromobject = this.fromreferenceobject = obj;

		this.chartext = chartext;
		this.posttext = posttext;
		this.pretext = pretext;
	};
	var _pSketchCharEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.CharEventInfo);
	nexacro.CharEventInfo.prototype = _pSketchCharEventInfo;
	_pSketchCharEventInfo._type_name = "SketchCharEventInfo";

	delete _pSketchCharEventInfo;
	_pSketchCharEventInfo = null;
	nexacro.Sketch = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.value = null;
		this.textedit = null;
		this.undoable = false;
		this.redoable = false;
		this.editmode = "stroke";
		this.imemode = "none";
		this.usecontextmenu = true;
		this.text = "";
		this.updatebindingvalue = "default";
		this.readonly = false;

		this._canvas_elem_bg = null;
		this._canvas_elem = null;
		this._canvas_elem_tmp = null;

		this._history = [];
		this._current_state = -1;
		this._freeze_state = -1;
		this._current_strokes = null;

		this._const_stroke = "stroke";
		this._const_stroke_user = "strokeu";
		this._const_text = "text";
		this._const_erase = "erase";
		this._const_none = "none";
		this._const_erase_user = "eras_handleeu";
		this._const_image = "image";
		this._const_composit_source_over = "source-over";
		this._const_composit_destination_out = "destination-out";
		this._const_form = "this.parent";
		this._const_dot = ".";

		this._default_stroke_style = nexacro._getCachedStyleObj("color", "black");
		this._default_line_cap = "round";
		this._default_line_join = "round";
		this._default_line_width = 1;
		this._default_font_size = 9;
		this._default_font_face = "monaco";
		this._default_edit_gap = 0.5;
		this._default_edit_x = 0;
		this._default_edit_y = 0;
		this._default_edit_width = 100;
		this._default_edit_height = 24;
		this._default_edit_border = "1px solid blue";
		this._default_edit_align = "left";
		this._startDrawStroke = true;
		this._startDrawErase = true;
		this._image_format = ["bmp", "gif", "jpeg", "jpg", "png", "tiff", "icon"];
		this._save_image_formattype = ["BMP", "PNG", "JPG", "GIF", "TIF", "BMP,Mono"];
		this._image = null;
		this._clr_history = true;
		this._currentPath = [];
		this._pre_draw_status = "";
		this._butt_count = 0;

		this._const_code_parameter = "0001";
		this._const_code_io = "1101";
		this._const_code_permission = "1102";
		this._const_code_Irregular = "1103";
		this._const_code_target = "1104";
		this._const_code_loadinvalidimage = "1105";
		this._const_code_incorrectfile = "1106";
		this._const_code_savefile = "1107";
		this._const_errortype_obj = "ObjectError";
		this._const_errortype_type = "TypeError";

		this._const_code_parameter_msg = "comp_fail_parameter";
		this._const_code_loadinvalidimage_msg = "comm_fail_loadinvalidimage";
		this._const_code_incorrectfile_msg = "comp_incorrect_file";
		this._const_code_savefile_msg = "comp_fail_save_file";
		this._is_undo = false;
		this._apply_client_padding = true;
		this._is_touch = false;
		this._img_type = "url";
		this._const_textcolor = "#000000ff";

		this._event_list = {
			"oninit" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"ontouch" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onmousemove" : 1, 
			"onload" : 1, 
			"onerror" : 1, 
			"onsuccess" : 1, 
			"onsize" : 1, 
			"onmove" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmousedown" : 1, 
			"onmouseup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousewheel" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onchar" : 1, 
			"ondrag" : 1, 
			"ondrop" : 1, 
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1
		};


		this._path_style = {
			tool : this._const_stroke, 
			globalCompositeOperation : this._const_composit_source_over, 
			strokeStyle : this._default_stroke_style, 
			lineWidth : this._default_line_width, 
			eraseWidth : this._default_line_width, 
			lineCap : this._default_line_cap, 
			lineJoin : this._default_line_join, 
			fontface : this._default_font_face, 
			fontsize : this._default_font_size, 
			fontfill : this._default_stroke_style, 
			text : ""
		};
	};


	var _pSketch = nexacro._createPrototype(nexacro.Component, nexacro.Sketch);
	nexacro.Sketch.prototype = _pSketch;

	_pSketch._type_name = "Sketch";
	_pSketch.touchStatus = 0;

	_pSketch.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			application.addErrorMessage(system._language, this._const_code_parameter_msg, "Parameter Error.");
			application.addErrorMessage(system._language, this._const_code_savefile_msg, "Failed to save file.");

			this._canvas_elem_bg = new nexacro.CanvasElement(control_elem);
			this._canvas_elem = new nexacro.CanvasElement(control_elem);
			this._canvas_elem_tmp = new nexacro.CanvasElement(control_elem);

			this.textedit = new nexacro.SketchEditCtrl("sketchedit", "absolute", this._default_edit_x, this._default_edit_y, this._default_edit_width, this._default_edit_height, null, null, this);

			this.textedit.createComponent();

			this.textedit._setEventHandler("onchar", this.on_notify_onchar, this);
			this.textedit._setEventHandler("onkillfocus", this.on_notify_edit_onkillfocus, this);

			var curstyle = this.currentstyle;
			if (this.text) {
				var text_elem = new nexacro.TextBoxElement(control_elem);
				var halign = ((curstyle.align == null || curstyle.align.halign == "") ? "center" : curstyle.align._halign);
				var valign = ((curstyle.align == null || curstyle.align.valign == "") ? "middle" : curstyle.align._valign);

				text_elem.setElementSize(this._client_width, this._client_height);
				curstyle.font = this.textedit.on_find_CurrentStyle_font(this._pseudo);
				curstyle.color = this.textedit.on_find_CurrentStyle_color(this._pseudo);
				curstyle.letterspace = this.textedit.on_find_CurrentStyle_letterspace(this._pseudo);

				text_elem.setElementFont(curstyle.font);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementText(this.text);
				text_elem.setElementLetterSpace(curstyle.letterspace);
				this._text_elem = text_elem;

				text_elem = null;
				curstyle = null;
				halign = null;
				valign = null;
			}
			curstyle = null;
		}
		control_elem = null;
	};

	_pSketch.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var args = [this._canvas_elem_bg, this._canvas_elem, this._canvas_elem_tmp];

			for (var i = 0; i < args.length; i++) {
				var obj = args[i];
				if (obj) {
					obj.create();
					obj.setElementLineCap(this._default_line_cap);
					obj.setElementLineJoin(this._default_line_join);
					obj.setElementSize(this._client_width, this._client_height);
				}
			}
			args = null;

			this.on_apply_applystyletype();

			this.on_apply_text();
			var text_elem = this._text_elem;

			if (text_elem) {
				text_elem.create();
				text_elem = null;
			}

			this.textedit.on_created();
			this.textedit.set_width(this._default_edit_width);
			this.textedit.set_height(this._default_edit_height);
			this.textedit.set_imemode(this.imemode);
			this.textedit.set_usecontextmenu(this.usecontextmenu);
			this.textedit.set_readonly(this.readonly);
			this.textedit.set_visible(false);

			this._canvas_elem.setElementTextBaseline("top");
			this._canvas_elem_tmp.setElementTextBaseline("top");
			this._canvas_elem_bg.setElementTextBaseline("top");
		}

		var elem = this._canvas_elem;
		var _handle = elem._handle;
		if (_handle) {
			var _doc = _handle.ownerDocument || _handle.document;
			var canvas_elem_screenXY = nexacro.__getHTMLNodePositionInFrame(_doc, _handle);
			if (canvas_elem_screenXY) {
				this.m_screenX = canvas_elem_screenXY.x;
				this.m_screenY = canvas_elem_screenXY.y;
			}
		}
	};

	_pSketch.on_destroy_contents = function () {
		var args = [this._canvas_elem_bg, this._canvas_elem, this._canvas_elem_tmp, this.textedit];
		for (var i = 0; i < args.length; i++) {
			if (args[i]) {
				args[i].destroy();
				args[i] = null;
			}
		}
		args = null;
	};

	_pSketch.on_change_containerRect = function (width, height) {
		var args = [this._canvas_elem, this._canvas_elem_bg, this._canvas_elem_tmp];
		for (var i = 0; i < args.length; i++) {
			var obj = args[i];
			if (obj) {
				obj.setElementSize(width, height);
			}
		}

		if (this._currentPath.length > 0) {
			this._regenStroke(this._currentPath, this._canvas_elem_tmp);
		}
		args = null;
	};
	_pSketch.on_change_containerPos = function (left, top) {
	};


	_pSketch.on_change_bindSource = function (propid, ds, row, col, index) {
		this.binddataset = ds;
		if (propid == "value") {
			return true;
		}
		return false;
	};


	_pSketch.set_enableredraw = function (v) {
		this.enableredraw = nexacro._toBoolean(v);
		if (this.enableredraw) {
			this._redrawPath();
			this._refresh_style_contents();
		}
		return v;
	};

	_pSketch.set_editmode = function (editmode) {
		var tmp = this._const_stroke;
		switch (editmode) {
			case this._const_text:
			case this._const_erase:
			case this._const_none:
				tmp = editmode;
				break;
			case this._const_stroke:
			default:
				break;
		}
		this.editmode = tmp;
	};

	_pSketch.set_imemode = function (v) {
		if (v != this.imemode) {
			this.imemode = nexacro._toString(v);
			this.on_apply_imemode();
		}
	};

	_pSketch.on_apply_imemode = function () {
		this.textedit.set_imemode(this.imemode);
	};

	_pSketch.set_usecontextmenu = function (v) {
		if (v != this.usecontextmenu) {
			this.usecontextmenu = v;
			this.on_apply_usecontextmenu();
		}
	};

	_pSketch.on_apply_usecontextmenu = function () {
		this.textedit.set_usecontextmenu(this.usecontextmenu);
	};

	_pSketch.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this.on_apply_readonly(v);
		}
	};

	_pSketch.on_apply_readonly = function (v) {
		if (v) {
			this._stat_change("readonly", this._pseudo);
		}
		else {
			this._stat_change("writable", this._pseudo == "readonly" ? "normal" : this._pseudo);
		}

		this.textedit.set_readonly(this.readonly);
	};

	_pSketch.set_value = function (v) {
	};

	_pSketch._setValue = function (v) {
		if (v != this.value) {
			this.value = v;
		}
	};
	_pSketch.on_apply_value = function (v) {
		this.textedit.set_value(this.value);
	};

	_pSketch.set_updatebindingvalue = function (v) {
		if (v != this.updatebindingvalue) {
			this.updatebindingvalue = v;
		}
		this.on_apply_updatebindingvalue(v);
	};

	_pSketch.set_text = function (v) {
		var val = nexacro._toString(v);
		if (val != this.text && this._current_state == -1) {
			this.text = val;
			this._display_text = val;
			this.on_apply_text();
		}
	};

	_pSketch.on_apply_updatebindingvalue = function (v) {
		switch (v) {
			case "nosetvalue":
				break;
			default:
				this.updateToDataset();
				break;
		}
	};


	_pSketch.on_apply_applystyletype = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var applystyles = ["align", "background", "border", "bordertype", "color", "cursor", "font", "letterspace", "glow", "gradation", "margin", "opacity", "padding", "shadow", "accessibility"];
			var findstyle;
			if (!this._url || this._url.length == 0) {
				this._oldstyletype = this._styletype;
				this._styletype = 1;
				findstyle = this._find_style(applystyles);
				this._styletype = this._oldstyletype;
				this.cssclass = this._cssclass;
			}
			else {
				switch (this.applystyletype) {
					case "keep":
						this._styletype = 1;
						this.cssclass = this._cssclass;
						break;
					case "apply":
						this._styletype = 4;
						this.cssclass = this._linkedcssclass;
						break;
					case "cascade":
						this._styletype = 5;
						this.cssclass = this._linkedcssclass;
						break;
					case "cascade,keep":
						this._styletype = 3;
						this.cssclass = this._linkedcssclass;
						break;
					default:
						this._styletype = 3;
						this.cssclass = this._linkedcssclass;
						v = "cascade,keep";
						break;
				}
				findstyle = this._find_style(applystyles);
			}
			this._apply_style(findstyle);
			applystyles = null;
			findstyle = null;
		}
		control_elem = null;
	};


	_pSketch.on_apply_text = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			var text_elem = this._text_elem;
			if (!text_elem) {
				text_elem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = text_elem;
				this.on_apply_wordwrap();

				var halign = (curstyle.align.halign == "" ? "center" : curstyle.align._halign);
				var valign = (curstyle.align.valign == "" ? "middle" : curstyle.align._valign);

				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementFont(curstyle.font);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(curstyle.letterspace);

				if (this._is_created) {
					text_elem.create();
				}
			}

			var expr = this.expr;
			if (expr && expr.length > 0) {
				expr = expr.trim().split(":");
				var parser = new nexacro.ExprParser();
				var conv_expr, exprfn;
				var str;

				if (expr.length == 1) {
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
				exprfn = nexacro._createInlineFunc(this._checkExprFunction(conv_expr, this), ["comp"]);

				if (exprfn) {
					try {
						var val = nexacro._toString(exprfn.call(this, this));
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

			expr = null;

			text_elem.setElementText(this.displaytext);
			if (this.displaytext && this.displaytext != "") {
				this._text_width = -1;
				this._text_height = -1;
			}
			else {
				this._text_width = 0;
				this._text_height = 0;
			}

			if (this._img_elem) {
				this._updateElementPositions(curstyle.align, curstyle.imagealign);
			}
			text_elem = null;
			curstyle = null;
		}
	};

	_pSketch._checkExprFunction = function (conv_expr, comp) {
		try {
			nexacro._executeEvalStr(conv_expr);
			return conv_expr;
		}
		catch (e) {
			try {
				nexacro._executeEvalStr(this._const_form + this._const_dot + conv_expr);
				return conv_expr = this._const_form + this._const_dot + conv_expr;
			}
			catch (e) {
				return conv_expr;
			}
		}
	};
	_pSketch.on_apply_wordwrap = function () {
		if (this._text_elem) {
			this._text_elem.setElementWordWrap(this.wordwrap);
		}
	};

	_pSketch.on_apply_expr = function () {
		if (this._currentPath.length > 0) {
			return;
		}
		this.on_apply_text();
	};
	_pSketch.set_cssclass = function (cssname) {
		cssname = cssname.split(",");

		for (var i = 0; i < cssname.length; i++) {
			if (cssname[i] != this.cssclass) {
				this.className = this.cssclass = cssname[i];

				if (this.parent) {
					if (this._is_created) {
						this.on_apply_prop_class();
					}
				}
				else {
					this.new_class = true;
				}
			}
		}
		this.className = this.cssclass = cssname;
	};

	_pSketch.on_update_style_font = function () {
		var font = this.currentstyle.font = this.on_find_CurrentStyle_font(this._pseudo);
		this.on_apply_style_font(font);
		this.setTextFont(font.face, font.size);
	};
	_pSketch.on_update_style_color = function () {
		var color = this.currentstyle.color = this.on_find_CurrentStyle_color(this._pseudo);
		this.on_apply_style_color(color);
		this.setTextColor(color.value);
	};

	_pSketch._apply_style = function (styleObj) {
		this.on_apply_style_align(styleObj.align);
		this.on_apply_style_background(styleObj.background);
		this.on_apply_style_border(styleObj.border);
		this.on_apply_style_bordertype(styleObj.bordertype);
		this.on_apply_style_color(styleObj.color);
		this.on_apply_style_cursor(styleObj.cursor);
		this.on_apply_style_font(styleObj.font);
		this.on_apply_style_letterspace(styleObj.letterspace);
		this.on_apply_style_glow(styleObj.glow);
		this.on_apply_style_gradation(styleObj.gradation);
		this.on_apply_style_margin(styleObj.margin);
		this.on_apply_style_opacity(styleObj.opacity);
		this.on_apply_style_padding(styleObj.padding);
		this.on_apply_style_shadow(styleObj.shadow);
		this.on_apply_style_accessibility(styleObj.accessibility);
	};


	_pSketch._find_style = function (styleNameArr) {
		var style = {
		};
		var style_len = styleNameArr.length;
		var pseudo = this._pseudo;

		for (var i = 0; i < style_len; i++) {
			var styleName = styleNameArr[i];
			switch (styleName) {
				case "accessibility":
					style["accessibility"] = this._make_accessibility_value(this.on_find_CurrentStyle_accessibility(pseudo));
					if (!style["accessibility"]) {
						style["accessibility"] = nexacro._getCachedAccessibilityObj("");
					}
					break;
				case "align":
					style["align"] = this.on_find_CurrentStyle_align(pseudo);
					if (!style["align"]) {
						style["align"] = nexacro._getCachedAlignObj("");
					}
					break;
				case "background":
					style["background"] = this.on_find_CurrentStyle_background(pseudo);
					if (!style["background"]) {
						style["background"] = nexacro._getCachedBackgroundObj("");
					}
					break;
				case "border":
					style["border"] = this.on_find_CurrentStyle_border(pseudo);
					if (!style["border"]) {
						style["border"] = nexacro._getCachedBorderObj("");
					}
					break;
				case "bordertype":
					style["bordertype"] = this.on_find_CurrentStyle_bordertype(pseudo);
					if (!style["bordertype"]) {
						style["bordertype"] = nexacro._getCachedBordertypeObj("");
					}
					break;
				case "color":
					style["color"] = this.on_find_CurrentStyle_color(pseudo);
					if (!style["color"]) {
						style["color"] = nexacro._getCachedColorObj("");
					}
					break;
				case "cursor":
					style["cursor"] = this.on_find_CurrentStyle_cursor(pseudo);
					if (!style["cursor"]) {
						style["cursor"] = nexacro._getCachedStyleObj("");
					}
				case "font":
					style["font"] = this.on_find_CurrentStyle_font(pseudo);
					if (!style["font"]) {
						style["font"] = nexacro._getCachedFontObj("");
					}
				case "letterspace":
					style["letterspace"] = this.on_find_CurrentStyle_letterspace(pseudo);
					if (!style["letterspace"]) {
						style["letterspace"] = nexacro._getCachedStyleObj("letterspace", "0");
					}
				case "glow":
					style["glow"] = this.on_find_CurrentStyle_glow(pseudo);
					if (!style["glow"]) {
						style["glow"] = nexacro._getCachedGlowObj("");
					}
				case "gradation":
					style["gradation"] = this.on_find_CurrentStyle_gradation(pseudo);
					if (!style["gradation"]) {
						style["gradation"] = nexacro._getCachedGradationObj("");
					}
				case "margin":
					style["margin"] = this.on_find_CurrentStyle_margin(pseudo);
					if (!style["margin"]) {
						style["margin"] = nexacro._getCachedMarginObj("");
					}
				case "opacity":
					style["opacity"] = this.on_find_CurrentStyle_opacity(pseudo);
					if (!style["opacity"]) {
						style["opacity"] = nexacro._getCachedStyleObj("opacity", "100");
					}
				case "padding":
					style["padding"] = this.on_find_CurrentStyle_padding(pseudo);
					if (!style["padding"]) {
						style["padding"] = nexacro._getCachedPaddingObj("");
					}
				case "shadow":
					style["shadow"] = this.on_find_CurrentStyle_shadow(pseudo);
					if (!style["shadow"]) {
						style["shadow"] = nexacro._getCachedShadowObj("");
					}
					break;
			}
			this.currentstyle[styleName] = style[styleName];
		}
		return style;
	};

	_pSketch.loadSketch = function (url) {
		if (this.readonly) {
			return;
		}
		return this._loadSketch(url);
	};

	_pSketch.saveSketch = function () {
		var canvas_elem = this._canvas_elem_tmp;
		if (canvas_elem) {
			if (nexacro.Browser == "Runtime") {
				var handleid = this.saveToImageObject();
				var imgObj = new nexacro.Image();
				imgObj._handle_id = handleid;
				imgObj.width = this.width;
				imgObj.height = this.height;
				this._setValue(imgObj);
				this.on_fire_onsuccess(handleid);
				if (this.updatebindingvalue != "nosetvalue") {
					this.updateToDataset();
				}
				return true;
			}
			else {
				var img = canvas_elem.toDataURL();
				if (img && img.src) {
					img.setBase64String(img.src);
					this._setValue(img);
					if (this.updatebindingvalue != "nosetvalue") {
						this.updateToDataset();
					}
					return true;
				}
			}
		}
		return false;
	};

	_pSketch.saveSketchToFile = function (fileName, fileType, option) {
		if (!fileName) {
			return false;
		}

		fileType = fileType ? fileType : this._save_image_formattype[0];

		if (fileType == this._save_image_formattype[2] && !option) {
			option = 100;
		}

		if (fileName.lastIndexOf(".") < 0) {
			var fileformattype = this._saveImageFileFormatType(fileType);
			fileName = fileName + this._const_dot + fileformattype;
		}

		var rtn = this.parent.saveToImageFile(fileName, fileType, option);
		if (nexacro.Browser == "Runtime") {
			if (rtn) {
				var handleid = this.saveToImageObject();
				var imgObj = new nexacro.Image();
				imgObj._handle_id = handleid;
				this._setValue(imgObj);
				this.on_fire_onsuccess(handleid);
				return true;
			}
			else {
				var errormsg = nexacro._GetSystemErrorMsg(this, this._const_code_savefile_msg);
				this.on_fire_onerror(this, this._const_code_savefile, errormsg, this._const_errortype_obj, this._getRefFormBaseUrl(), url, this._const_code_savefile);
				return false;
			}
		}

		return false;
	};

	_pSketch._saveImageFileFormatType = function (fileType) {
		switch (fileType) {
			case "PNG":
				fileformattype = "png";
				break;
			case "JPG":
				fileformattype = "jpg";
				break;
			case "GIF":
				fileformattype = "gif";
				break;
			case "TIF":
				fileformattype = "tif";
				break;
			case "BMP,Mono":
				fileformattype = "bmp";
				break;
			default:
				fileformattype = "bmp";
				break;
		}
		return fileformattype;
	};
	_pSketch.undo = function () {
		if (this._checkEditmode() == false || this.readonly) {
			return;
		}

		this._undo();
	};

	_pSketch.redo = function () {
		if (this._checkEditmode() == false || this.readonly) {
			return;
		}

		this._redo();
	};

	_pSketch.on_getBindableProperties = function () {
		return "value";
	};

	_pSketch.updateToDataset = function () {
	};

	_pSketch.setBrushType = function (type) {
		if (this._checkEditmode() == false) {
			return;
		}

		switch (type) {
			case "square":
			case "butt":
				this._path_style.lineCap = type;
				break;
			default:
				this._path_style.lineCap = this._default_line_cap;
				break;
		}
	};

	_pSketch.setBrushSize = function (size) {
		if (this._checkEditmode() == false) {
			return;
		}

		if (size > 0) {
			this._path_style.lineWidth = size;
		}
		else {
			this._path_style.lineWidth = this._default_line_width;
		}
	};

	_pSketch.setBrushColor = function (color) {
		if (this._checkEditmode() == false) {
			return;
		}

		this._path_style.strokeStyle = nexacro._getCachedStyleObj("color", color);
	};

	_pSketch.setTextFont = function (fontname, fontsize) {
		if (this._checkEditmode() == false) {
			return;
		}

		fontsize = (fontsize == undefined || fontsize == "") ? this._default_font_size : fontsize;
		this._path_style.fontface = fontname;
		this._path_style.fontsize = fontsize;
		this.style.set_font_face(fontname);
		this.style.set_font_size(fontsize);
		if (this.textedit) {
			this.textedit.style.set_font_face(fontname);
			this.textedit.style.set_font_size(fontsize);
		}
	};

	_pSketch.setTextColor = function (color) {
		if (this._checkEditmode() == false) {
			return;
		}
		color = (this._isCheckColor(color)) ? color : this._const_textcolor;

		this.style.set_color(color);

		if (this.textedit) {
			this.textedit.style.set_color(color);
		}

		this._path_style.fontfill._setValue(color);
	};

	_pSketch._isCheckColor = function (color) {
		color = color.replace(/^'/, "").replace(/'$/, "");

		if (color.substring(1) == "gradation") {
			return true;
		}
		if (color == "transparent") {
			return true;
		}
		if (!color) {
			return false;
		}

		if (nexacro._xreNamedColorList) {
			if (color in nexacro._xreNamedColorList) {
				return true;
			}
		}

		if (color.charAt(0) == "#" && (color.length == 7 || color.length == 9)) {
			return true;
		}
		return false;
	};

	_pSketch.setEraseSize = function (size) {
		if (this._checkEditmode() == false) {
			return;
		}
		this._path_style.eraseWidth = (size > 0) ? size : 1;
	};

	_pSketch.drawText = function (x, y, text, multiline) {
		if (this._checkEditmode() == false) {
			return;
		}
		if (this.readonly) {
			return;
		}

		var canvas_elem = this._canvas_elem;
		if (canvas_elem) {
			this._initPath(this._path_style, this._const_text, x, y, true);

			var coords = this._currentPath[0];
			coords.text = text;
			coords.globalCompositeOperation = this._const_composit_source_over;
			this._drawText(coords, coords.x, coords.y, coords.text, multiline);
		}
	};

	_pSketch.drawStroke = function (x, y, start) {
		if (this._checkEditmode() == false || this.readonly) {
			return;
		}

		if (!x && x == undefined) {
			return;
		}
		if (!y && y == undefined) {
			return;
		}

		x = (x >= 0 || x < 0) ? x : this._default_edit_x;
		y = (y >= 0 || x < 0) ? y : this._default_edit_y;

		start = (!start && start == undefined) ? false : start;

		if (this._startDrawStroke) {
			start = true;
			this._startDrawStroke = false;
		}

		this._drawStroke(this._path_style, this._const_stroke, x, y, start);
	};

	_pSketch.drawErase = function (x, y, start) {
		if (this._checkEditmode() == false || this.readonly) {
			return;
		}

		if (!x && x == undefined) {
			return;
		}
		if (!y && y == undefined) {
			return;
		}

		x = (x >= 0 || x < 0) ? x : this._default_edit_x;
		y = (y >= 0 || x < 0) ? y : this._default_edit_y;

		start = (!start && start == undefined) ? false : start;

		if (this._startDrawErase) {
			start = true;
			this._startDrawErase = false;
		}
		this._drawStroke(this._path_style, this._const_erase, x, y, start);
	};

	_pSketch.clear = function () {
		this._apply_client_padding = true;

		if (this._checkEditmode() == false) {
			return;
		}

		this._clear(this._isEnableRedraw());

		if (this._current_state == -1) {
			this.on_apply_text();
		}
	};

	_pSketch.showTextEditor = function (x, y, width, height, text) {
		if (!(arguments.length >= 4 && arguments.length < 6)) {
			return;
		}
		var multiline = false;

		this._initPath(this._path_style, this._const_text, x, y, null, width, height, text);
		this._drawPath(x - this._default_edit_gap, y);
		this._endPath();

		if (text && text !== undefined && text != "") {
			multiline = true;
		}
		return this._showTextEditor(x, y, width, height, text, multiline);
	};

	_pSketch.hideTextEditor = function (clear) {
		clear = (clear == true || clear == false) ? clear : true;
		return this._hideTextEditor(clear);
	};

	_pSketch.redraw = function () {
		var redraw = this.enableredraw;
		this.enableredraw = true;
		this._refresh_style_contents();
		this._redrawPath();
		this.enableredraw = redraw;
	};

	_pSketch.on_notify_edit_onkillfocus = function (obj, e) {
		var text = obj.text;
		var status = (text.length > 0) ? true : false;
		var multiline = true;
		if (status) {
			var canvas_elem = this._canvas_elem;
			if (canvas_elem) {
				this._initPath(this._path_style, this._const_text, obj._left, obj._top, true);

				var coords = this._currentPath[0];
				coords.text = text;
				coords.globalCompositeOperation = this._const_composit_source_over;
				this._drawText(coords, coords.x, coords.y, coords.text, multiline);
			}
		}
		this._resetTextEdit(status);
		if (this.updatebindingvalue == "nosetvalue") {
			this.updateToDataset();
		}
	};

	_pSketch.on_fire_ontouchmove = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (touchinfos.length == 0) {
			return;
		}

		var evt = touchinfos[0];
		this.on_fire_onmousemove("lbutton", null, null, null, evt.screenX, evt.screenY, evt.canvasX, evt.canvasY, evt.clientX - this.m_screenX, evt.clientY - this.m_screenY, from_comp, from_refer_comp);
	};

	_pSketch.on_fire_sys_ontouchmove = _pSketch.on_fire_ontouchmove;

	_pSketch.on_fire_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		this._moveAction(button, clientX, clientY);
	};

	_pSketch.on_fire_sys_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var retn = nexacro.Component.prototype.on_fire_sys_ondragmove.call(this, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		this._moveAction(button, clientX, clientY);
		return retn;
	};

	_pSketch.on_fire_sys_onmousemove = _pSketch.on_fire_onmousemove;

	_pSketch._moveAction = function (button, clientX, clientY) {
		if (button == "lbutton" || button == "touch") {
			if (this._checkEditmode() == false || this.readonly) {
				return;
			}

			if (button == "touch") {
				if (this.touchStatus == 3) {
					this.touchStatus = 0;
				}
				else if (this.touchStatus == 1) {
					this.touchStatus = 2;
				}


				if (this.touchStatus != 0) {
					if (this._path_style.lineCap == "butt") {
						if (this._butt_count == 3) {
							this._drawPath(clientX, clientY);
							this._butt_count = 0;
						}
						this._butt_count++;
					}
					else {
						this._drawPath(clientX, clientY);
					}
				}
			}
			else {
				if (this._path_style.lineCap == "butt") {
					if (this._butt_count == 3) {
						this._drawPath(clientX, clientY);
						this._butt_count = 0;
					}
					this._butt_count++;
				}
				else {
					this._drawPath(clientX, clientY);
				}
			}
		}
	};

	_pSketch.on_fire_ontouchstart = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (touchinfos.length == 0) {
			return;
		}

		var evt = touchinfos[0];
		this.on_fire_onlbuttondown("lbutton", null, null, null, evt.screenX, evt.screenY, evt.canvasX, evt.canvasY, evt.clientX - this.m_screenX, evt.clientY - this.m_screenY, from_comp, from_refer_comp);
	};

	_pSketch._on_touch_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		application._skipDragEventAfterMsgBox = false;
		var ret;
		var pThis = this._getFromComponent(this);
		if (!pThis.onlbuttondown || (pThis.onlbuttondown && !pThis.onlbuttondown.defaultprevented)) {
			this.on_fire_onlbuttondown(button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, canvasX, canvasY, fire_comp, refer_comp, false);
			ret = this._on_bubble_touch_lbuttondown(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, false);
		}
		return ret;
	};

	_pSketch.on_fire_sys_ontouchstart = _pSketch.on_fire_ontouchstart;

	_pSketch.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._checkEditmode() == false) {
			return;
		}
		if (this.readonly) {
			if (this.textedit.visible) {
				this.textedit.set_visible(false);
			}
			return;
		}
		if (button == "touch") {
			this.touchStatus = 1;
			this._is_touch = true;
		}

		this.button == button;
		this._initPath(this._path_style, this.editmode, clientX, clientY);
		if (this._path_style.lineCap != "butt") {
			this._drawPath(clientX - this._default_edit_gap, clientY);
			this._endPath();
		}
	};

	_pSketch.on_fire_sys_onlbuttondown = _pSketch.on_fire_onlbuttondown;

	_pSketch.on_fire_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (touchinfos.length == 0) {
			return;
		}
		var evt = touchinfos[0];
		this.on_fire_onlbuttonup("lbutton", null, null, null, evt.screenX, evt.screenY, evt.canvasX, evt.canvasY, evt.clientX - this.m_screenX, evt.clientY - this.m_screenY, from_comp, from_refer_comp);
	};

	_pSketch.on_fire_sys_ontouchend = _pSketch.on_fire_ontouchend;

	_pSketch.on_fire_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._checkEditmode() == false || this.readonly) {
			return;
		}

		if (button == "touch") {
			this.touchStatus = 3;
		}
		this._endPath();

		if (button == "touch") {
			this._delete_text();
			this.displaytext = "";
		}
	};

	_pSketch.on_fire_sys_onlbuttonup = _pSketch.on_fire_onlbuttonup;


	_pSketch._on_touch_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem) {
		var ret;
		var pThis = this._getFromComponent(this);
		if (pThis && (!pThis.onlbuttonup || (pThis.onlbuttonup && !pThis.onlbuttonup.defaultprevented))) {
			this.on_fire_onlbuttonup(button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, canvasX, canvasY, from_comp, refer_comp);

			ret = this._on_bubble_touch_lbuttonup(elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, from_elem, false);
		}
		return ret;
	};

	_pSketch._endPath = function () {
		var canvas_elem = this._canvas_elem;
		if (!canvas_elem || this._currentPath.length == 0) {
			return;
		}

		var currentpath = this._currentPath[0];
		var pathstyle = this._path_style;
		if (this.editmode == this._const_text && !this.textedit.visible && currentpath) {
			currentpath.fontface = pathstyle.fontface;
			currentpath.fontsize = pathstyle.fontsize;
			currentpath.fontfill._setValue(pathstyle.fontfill.value);
		}
		this._regenStroke(this._currentPath, canvas_elem);
		this._regenStroke(this._currentPath, this._canvas_elem_tmp);
	};

	_pSketch.on_notify_onchar = function (obj, e) {
		return this.on_fire_onchar(obj, e.chartext, e.pretext, e.posttext);
	};

	_pSketch.on_fire_onchar = function (obj, chartext, pretext, posttext) {
		if (this.onchar && this.onchar._has_handlers) {
			var evt = new nexacro.CharEventInfo(this, "onchar", chartext, pretext, posttext);
			return this.onchar._fireCheckEvent(this, evt);
		}
		return true;
	};

	_pSketch.on_fire_onload = function (obj, imageurl) {
		var event = this.onload;
		if (event && event._has_handlers) {
			var evt = new nexacro.SketchLoadEventInfo(this, "onload", imageurl);
			event._fireEvent(this, evt);
		}
	};

	_pSketch.on_fire_onerror = function (obj, fireerrorcode, errormsg, returncode, locationuri, imageurl, errstatus) {
		var event = this.onerror;
		if (event && event._has_handlers) {
			var evt = new nexacro.SketchErrorEventInfo(this, "onerror", fireerrorcode, errormsg, returncode, locationuri, imageurl, errstatus);
			event._fireEvent(this, evt);
		}
	};

	_pSketch.on_fire_onsuccess = function (handle) {
		var event = this.onsuccess;
		if (event && event._has_handlers) {
			var evt = new nexacro.SuccessEventInfo(this, "onsuccess", handle);
			return this.onsuccess._fireEvent(this, evt);
		}
	};

	_pSketch._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false, 
			want_touchstart : true, 
			want_touchmove : true
		};
	};

	_pSketch._refresh_style_contents = function () {
		this.on_update_style_align();
		this.on_update_style_background();
		this.on_update_style_border();
		this.on_update_style_bordertype();
		this.on_update_style_color();
		this.on_update_style_cursor();
		this.on_update_style_font();
		this.on_update_style_gradation();
		this.on_update_style_opacity();
		this.on_update_style_padding();
		this.on_update_style_shadow();
		if (nexacro._enableaccessibility) {
			this.on_update_style_accessibility();
		}
	};

	_pSketch._setImageValue = function (image) {
		if (image instanceof nexacro.ImageSketchBackGround) {
			var base64 = image.getBase64String();
			if (!base64) {
				var image = this._canvas_elem_bg.toDataURL();
				if (image && image.src) {
					image.setBase64String(image.src);
					this.value = this._image = image;
				}
			}
		}
	};


	_pSketch._setImageType = function (v) {
		if (v) {
			if (v instanceof nexacro.Image) {
				v = v._base64str;
				this._img_type = "base64";
			}
			else {
				v = v.toString();

				var isBase64 = nexacro._checkBase64String(v);
				if (isBase64) {
					if (v.substring(0, 10).toLowerCase() == "data:image") {
						if (v.substring(0, 17).toLowerCase() != "data:image;base64") {
							var comma_idx = v.indexOf(",");
							if (comma_idx > -1) {
								var tmp = v.slice(comma_idx + 1, v.legnth);
								v = "data:image;base64," + tmp;
							}
						}
					}
					else {
						v = "data:image;base64," + v;
					}
					this._img_type = "base64";
				}
				else {
					this._img_type = "url";
				}
			}
		}
		else {
			v = "";
			this._img_type = "url";
		}
	};

	_pSketch._loadSketch = function (url) {
		if (this._image) {
			this._image = null;
		}

		var _url = url;

		this._setImageType(_url);

		var img_type = this._img_type;
		if (img_type == "url") {
			_url = nexacro._getURIValue(_url);
			_url = nexacro._getImageLocation(url, this._getRefFormBaseUrl());
		}

		if (_url == undefined || arguments.length > 1) {
			var errormsg = nexacro._GetSystemErrorMsg(this, this._const_code_parameter_msg);
			this.on_fire_onerror(this, this._const_code_parameter, errormsg, this._const_errortype_obj, this._getRefFormBaseUrl(), _url, this._const_code_parameter);
			return false;
		}

		if (_url && _url !== undefined) {
			var imgformat = _url.substring(_url.lastIndexOf(".") + 1).toLowerCase();
			if ((this._image_format).indexOf(imgformat) == -1) {
				var errormsg = nexacro._GetSystemErrorMsg(this, this._const_code_incorrectfile_msg);
				this.on_fire_onerror(this, this._const_code_incorrectfile, errormsg, this._const_errortype_type, this._getRefFormBaseUrl(), _url, this._const_code_incorrectfile);
				return false;
			}
		}

		var imgsize = nexacro._getImageSize(_url, this._imageload, this, this.parent._getRefFormBaseUrl(), url);

		if (imgsize) {
			this._clearCanvas(this._isEnableRedraw());
			return this._drawImage(_url);
		}
	};


	_pSketch._drawImage = function (url) {
		this._image = new nexacro.ImageSketchBackGround(this);
		var retn = this._image.set_src(url);
		if (retn) {
			if (this._apply_client_padding) {
				this._delete_text();
				this.displaytext = "";
			}

			this._setValue(this._image);
			if (this._clr_history) {
				this._initHistory();
				this._setRedoUndo();
			}
			return true;
		}
		return false;
	};

	_pSketch._imageload = function (url, imgsize, size, imgobj, status) {
		if (imgsize <= 0) {
			this._image = null;
			delete nexacro._ImgInfoCacheList[url];
			nexacro._ImgInfoCacheList[url] = null;
			var errormsg = nexacro._GetSystemErrorMsg(this, this._const_code_loadinvalidimage_msg);
			this.on_fire_onerror(this, this._const_code_loadinvalidimage_msg, errormsg, this._const_errortype_type, this._getRefFormBaseUrl(), url, this._const_code_loadinvalidimage_msg);
		}
		else {
			this._clearCanvas(this._isEnableRedraw());
			this._drawImage(url);
		}
	};

	_pSketch._drawText = function (_style, x, y, text, multiline) {
		if (this.readonly) {
			return;
		}
		if (!text || text.length == 0) {
			return;
		}

		var canvas_elem = this._canvas_elem;
		var canvas_elem_tmp = this._canvas_elem_tmp;
		if (canvas_elem) {
			if (this._apply_client_padding) {
				this._delete_text();
				this.displaytext = "";
			}

			x = (x >= 0 || x < 0) ? x : this._default_edit_x;
			y = (y >= 0 || x < 0) ? y : this._default_edit_y;
			var testedit = this.textedit;
			var texteditcurstyle = testedit.currentstyle;
			var font = this.currentstyle.font;

			if (font == null) {
				var font = new nexacro.Style_font();
			}

			var fontsize = font.size;

			font.set_face(_style.fontface);
			font.set_size(_style.fontsize);

			canvas_elem.setElementFont(font);
			canvas_elem.setElementGlobalCompositeOperation(_style.globalCompositeOperation);

			canvas_elem_tmp.setElementFont(font);
			canvas_elem_tmp.setElementGlobalCompositeOperation(_style.globalCompositeOperation);

			var tcolor;
			if (_style.fontfill instanceof nexacro.Style_color) {
				tcolor = _style.fontfill;
			}
			else {
				tcolor = new nexacro.Style_color(_style.fontfill);
			}

			canvas_elem.setElementFillStyle(tcolor);
			canvas_elem_tmp.setElementFillStyle(tcolor);
			var multiliney = Number(y);

			if (multiline) {
				v = nexacro._toString(text);
				if (text && text !== undefined && text != "") {
					text = text.replace(/&quot;/g, "\"");
					if (text.indexOf("\r\n") != -1 || text.indexOf("\n\r") != -1) {
						text = text.replace(/\r\n/g, "\n").replace(/\n\r/g, "\n");
					}
					else {
						if (text.indexOf("\r") != -1) {
							text = text.replace(/\r/g, "");
						}
					}

					var multitext = (text.replace(/\\n/g, '\n')).split("\n");
					var linespace = texteditcurstyle.linespace.value;

					for (var i = 0; i < multitext.length; i++) {
						if (this._isEnableRedraw()) {
							canvas_elem.drawFillText(multitext[i], x, multiliney);
							canvas_elem_tmp.drawFillText(multitext[i], x, multiliney);
						}
						multiliney += Number(linespace) + Number(fontsize);
					}
				}
			}
			else {
				if (this._isEnableRedraw()) {
					canvas_elem.drawFillText(text, x, multiliney);
					canvas_elem_tmp.drawFillText(text, x, multiliney);
				}
			}
		}
	};

	_pSketch._drawStroke = function (_style, mode, x, y, start) {
		if (this._checkEditmode() == false || this.readonly) {
			return;
		}

		if (this._apply_client_padding) {
			this._delete_text();
			this.displaytext = "";
		}

		var clientX = Number(x);
		var clientY = Number(y);
		if (this._currentPath[0] && this._currentPath[0].tool != mode) {
			start = true;
		}
		switch (start) {
			case true:
				this._initPath(this._path_style, mode, clientX, clientY);
				this._drawPath(clientX - this._default_edit_gap, clientY);
				break;
			default:
				this._drawPath(clientX - this._default_edit_gap, clientY);
				this._endPath();
				break;
		}
	};

	_pSketch._showTextEditor = function (x, y, width, height, text) {
		if (this._checkEditmode() == false) {
			return;
		}
		var caretpos = 0;
		var value = null;
		var rettext = this.textedit.value;
		var textedit = this.textedit;
		var vscrollbarsize = textedit.vscrollbar.scrollbarsize;
		var hscrollbarsize = textedit.hscrollbar.scrollbarsize;

		if (text) {
			value = text;
			caretpos = -1;
		}
		else {
			value = rettext;
		}
		if (x >= 0 || x < 0) {
			this.textedit.set_left(x);
		}
		else {
			this.textedit.set_left(this._default_edit_x);
		}

		if (y >= 0 || x < 0) {
			this.textedit.set_top(y);
		}
		else {
			this.textedit.set_top(this._default_edit_y);
		}

		if (width >= 0 || x < 0) {
			this.textedit.set_width(Number(width) + Number(hscrollbarsize));
		}
		else {
			this.textedit.set_width(Number(this._default_edit_width) + Number(hscrollbarsize));
		}

		if (height >= 0 || x < 0) {
			this.textedit.set_height(Number(height) + Number(vscrollbarsize));
		}
		else {
			this.textedit.set_height(Number(this._default_edit_height) + Number(vscrollbarsize));
		}

		this.textedit.set_value(value);
		if (this._isEnableRedraw()) {
			this.textedit.set_visible(true);
			this.textedit.setFocus(true);
			this.textedit.setCaretPos(caretpos);

			if (text && text !== undefined && text != "") {
				if (text.length > 0) {
					this.textedit.setSelect(0, text.length);
				}
			}
		}
		return rettext;
	};

	_pSketch._hideTextEditor = function (clear) {
		if (this._checkEditmode() == false) {
			return;
		}

		var rettext = this.textedit.value;

		if (clear) {
			this.textedit.set_value(null);
		}

		if (this._isEnableRedraw()) {
			this.textedit.set_visible(false);
			this.textedit.set_left(this._default_edit_x);
			this.textedit.set_top(this._default_edit_y);
			this._control_element.setElementFocus();
		}
		return rettext;
	};

	_pSketch._redrawPathData = function (path) {
		this._clearCanvas(this._isEnableRedraw());

		if (this._image) {
			this._loadSketch(this._image.src);
		}
		var length = path.length;
		for (var n = 0; n < length; n++) {
			this._regenStroke(path[n], this._canvas_elem);
			this._regenStroke(path[n], this._canvas_elem_tmp);
			this._regenStroke(path[n], this._canvas_elem_bg);
		}
	};

	_pSketch._drawBcurve = function (path, ctx) {
		var length = path.length - 1;
		if (length < 1) {
			return;
		}
		for (var n = 0; n < length; n++) {
			var p1 = path[n];
			var p2 = path[n + 1];
			if (n == 0) {
				this._setupCanvasElem(ctx, p1, p1);
			}
			ctx.lineTo(p2.x, p2.y);
		}
		ctx.stroke();
	};

	_pSketch._drawUserStroke = function (path, ctx) {
		var length = path.length - 1;
		if (length < 1) {
			return;
		}
		for (var n = 0; n < length; n++) {
			var p1 = path[n];
			var p2 = path[n + 1];
			if (n == 0) {
				this._setupCanvasElem(ctx, p1, p1);
				ctx.lineTo(p2.x, p2.y);
				ctx.lineTo(p1.x, p1.y);
			}
			ctx.lineTo(p2.x, p2.y);
		}
		ctx.stroke();
	};

	_pSketch._setupCanvasElem = function (ctx, p1, p2) {
		ctx.beginPath();
		ctx.moveTo(p2.x, p2.y);
		ctx.setElementLineCap(p1.lineCap);

		ctx.setElementGlobalCompositeOperation(p1.globalCompositeOperation);

		switch (p1.tool) {
			case this._const_erase:
			case this._const_erase_user:
				ctx.setElementStrokeStyle(this._default_stroke_style);
				ctx.setElementLineWidth(p1.eraseWidth);
				break;
			case this._const_stroke:
			case this._const_stroke_user:
			default:
				ctx.setElementStrokeStyle(p1.strokeStyle);
				ctx.setElementLineWidth(p1.lineWidth);
		}
	};

	_pSketch._regenStroke = function (path, ctx) {
		if (this._isEnableRedraw()) {
			var _path = this._clone(path);

			var tool = (this._is_undo && _path[0].tool != this._const_text) ? this._const_stroke_user : _path[0].tool;
			switch (tool) {
				case this._const_text:
					{

						var tmp = _path[0];
						this._drawText(tmp, tmp.x, tmp.y, tmp.text, true);
					}
					break;
				case this._const_stroke:
				case this._const_erase:
					{

						this._drawBcurve(_path, ctx);
					}
					break;
				case this._const_stroke_user:
				case this._const_erase_user:
					{

						this._drawUserStroke(_path, ctx);
					}
					break;
			}
		}
	};

	_pSketch._clone = function (obj) {
		if (!obj || typeof (obj) !== 'object') {
			return obj;
		}
		var temp = new obj.constructor();
		for (var key in obj) {
			if (!obj[key] || typeof (obj[key]) !== 'object') {
				temp[key] = obj[key];
			}
			else {
				temp[key] = this._clone(obj[key]);
			}
		}
		return temp;
	};

	_pSketch._undo = function () {
		if (this._undoable()) {
			this._current_state--;
			this._current_strokes = null;
			this._is_undo = true;
			this._redrawPath();
			if (this.updatebindingvalue != "nosetvalue") {
				this.updateToDataset();
			}
			this._is_undo = false;

			if (this._current_state == -1) {
				this.on_apply_text();
			}
		}
	};

	_pSketch._redo = function () {
		if (this._redoable()) {
			if (this._current_state == -1) {
				this._delete_text();
				this.displaytext = "";
			}

			this._current_state++;
			this._current_strokes = null;
			this._redrawPath();
			if (this.updatebindingvalue != "nosetvalue") {
				this.updateToDataset();
			}
		}
	};

	_pSketch._redrawPath = function () {
		var path = this._currentStrokes();
		this._clr_history = false;
		this._redrawPathData(path);
		this._setRedoUndo();
		this._clr_history = true;
	};

	_pSketch._checkEditmode = function () {
		if (this.editmode == this._const_none) {
			return false;
		}
		return true;
	};

	_pSketch._clearCanvasElem = function (elem) {
		if (elem) {
			elem.clearRect(elem.left, elem.top, elem.width, elem.height);
		}
	};

	_pSketch._clearCanvas = function (flag) {
		if (flag) {
			var args = [this._canvas_elem, this._canvas_elem_bg, this._canvas_elem_tmp];
			for (var i = 0; i < args.length; i++) {
				this._clearCanvasElem(args[i]);
			}
			args = null;
		}
	};

	_pSketch._clear = function (flag) {
		this._hideTextEditor(true);
		if (flag) {
			this._clearCanvas(flag);
		}
		this._image = null;
		this._initHistory();
		this._setRedoUndo();
		this._setValue(null);
		if (this.updatebindingvalue != "nosetvalue") {
			this.updateToDataset();
		}
	};

	_pSketch._setRedoUndo = function () {
		this.redoable = this._redoable();
		this.undoable = this._undoable();
	};

	_pSketch._drawPath = function (x, y) {
		var coords = {
		};
		coords.x = x;
		coords.y = y;

		var canvas_elem = this._canvas_elem;
		if (!canvas_elem || !this._currentPath[0]) {
			return;
		}

		var dest = canvas_elem;
		var tool = this._currentPath[0].tool;

		if (tool != this._const_text && !this._is_touch) {
			this._delete_text();
			this.displaytext = "";
		}

		switch (tool) {
			case this._const_text:
				return;
			case this._const_erase:
			case this._const_erase_user:
				{

					dest = canvas_elem;
				}
				break;
		}
		this._currentPath.push(coords);

		this._regenStroke(this._currentPath, dest);
		this._regenStroke(this._currentPath, this._canvas_elem_tmp);
	};

	_pSketch._initPath = function (__style, _editmode, clientX, clientY, opt, clientwidth, clientheight, clienttext) {
		switch (this._currentPath[0] && this._currentPath[0].tool) {
			case this._const_stroke_user:
				this._endPath();
				break;
		}

		var _style = this._clone(__style);
		var coords = {
		};
		coords.x = clientX;
		coords.y = clientY;

		coords.beginPath = true;
		_style.tool = _editmode;

		var mode = this._const_composit_source_over;
		if (_style.tool != this._const_text && this.textedit.visible) {
			this._resetTextEdit(true);
			return;
		}

		switch (_style.tool) {
			case this._const_erase:
			case this._const_erase_user:
				mode = this._const_composit_destination_out;
				break;
			case this._const_text:
				{

					if (opt == null) {
						if (this.textedit.visible) {
							this._resetTextEdit(true);
							return;
						}
						else {
							this._showTextEditor(coords.x, coords.y, clientwidth, clientheight, clienttext);
						}
					}
				}
				break;
			case this._const_stroke:
			case this._const_stroke_user:
			default:
				break;
		}
		_style.globalCompositeOperation = mode;

		for (var key in _style) {
			coords[key] = _style[key];
		}

		this._currentPath = this._add({
			type : _editmode, 
			stroke : [coords]
		});
		this._setRedoUndo();
	};

	_pSketch._resetTextEdit = function (arg) {
		if (this.textedit.visible == false) {
			return;
		}
		var editval = this.textedit.value;

		if (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") {
			var elem = this.textedit._input_element;
			editval = elem.getElementValue();
			this.textedit.set_value(editval);
		}

		this._hideTextEditor(true);
		if (editval && arg) {
			this._currentPath[0].text = editval;
		}
		else {
			this._undo();
			this._setRedoUndo();
		}
		this.textedit.set_left(this._default_edit_x);
		this.textedit.set_top(this._default_edit_y);
	};

	_pSketch._initHistory = function () {
		this._history = [];
		this._current_state = -1;
		this._freeze_state = -1;
		this._current_strokes = null;
	};

	_pSketch._add = function (action) {
		if (this._current_state + 1 < this._history.length) {
			this._history.splice(this._current_state + 1, this._history.length - (this._current_state + 1));
		}

		this._history.push(action);
		this._current_state = this._history.length - 1;
		this._current_strokes = null;
		return action.stroke;
	};

	_pSketch._freeze = function (index) {
		if (index === undefined) {
			this._freeze_state = this._current_state;
		}
		else {
			this._freeze_state = index;
		}
	};

	_pSketch._undoable = function () {
		return (this._current_state > -1 && this._current_state > this._freeze_state);
	};

	_pSketch._redoable = function () {
		return this._current_state < this._history.length - 1;
	};

	_pSketch._currentStrokes = function () {
		var cur_strokes = this._current_strokes;
		if (cur_strokes == null) {
			var strokes = [];
			for (var i = 0; i <= this._current_state; i++) {
				var action = this._history[i];
				switch (action.type) {
					case "init":
					case "json":
					case "strokes":
					case "batch":
						break;
					case "clear":
						strokes = [];
						break;
					case this._const_stroke:
					case this._const_stroke_user:
					case this._const_image:
					case this._const_erase:
					case this._const_erase_user:
					case this._const_text:
					default:
						strokes.push(action.stroke);
						break;
				}
			}

			cur_strokes = strokes;
		}
		this._current_strokes = cur_strokes;
		return cur_strokes;
	};


	_pSketch._delete_text = function () {
		this._apply_client_padding = false;

		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		if (this._control_element) {
			this._control_element.setElementPadding(nexacro.Component._default_padding);
		}
	};

	delete _pSketch;
	_pSketch = null;

	nexacro.SketchEditCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.TextArea.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pSketchEditCtrl = nexacro._createPrototype(nexacro.TextArea, nexacro.SketchEditCtrl);
	nexacro.SketchEditCtrl.prototype = _pSketchEditCtrl;

	_pSketchEditCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this._find_inherit_pseudo_obj("border", pseudo, "border") || this.parent._find_pseudo_obj("border", pseudo, "border") || nexacro.Component._default_color;
	};

	_pSketchEditCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent._find_pseudo_obj("color", pseudo, "color") || this._find_inherit_pseudo_obj("color", pseudo, "color") || nexacro.Component._default_color;
	};

	_pSketchEditCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent._find_pseudo_obj("font", pseudo, "font") || this._find_inherit_pseudo_obj("font", pseudo, "font") || nexacro.Component._default_font;
	};

	_pSketchEditCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent._find_pseudo_obj("align", pseudo, "align") || this._find_pseudo_obj("align", pseudo, "align") || nexacro.Component._default_align;
	};

	_pSketchEditCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this._find_inherit_pseudo_obj("background", pseudo, "background") || this.parent._find_pseudo_obj("background", pseudo, "background") || nexacro.Component._default_background;
	};

	_pSketchEditCtrl.on_fire_sys_onlbuttondown = function () {
		nexacro.EditCtrl.prototype.on_fire_sys_onlbuttondown.call(this);
		return true;
	};

	_pSketchEditCtrl.on_fire_sys_ontouchstart = function () {
		nexacro.EditCtrl.prototype.on_fire_sys_ontouchstart.call(this);
		return true;
	};

	_pSketchEditCtrl.on_fire_onclick = function () {
		nexacro.EditCtrl.prototype.on_fire_onclick.call(this);
		return true;
	};

	_pSketchEditCtrl.on_fire_ontab = function () {
		nexacro.EditCtrl.prototype.on_fire_ontab.call(this);
		return true;
	};

	delete _pSketchEditCtrl;
	_pSketchEditCtrl = null;

	nexacro.ImageSketchBackGround = function (target) {
		nexacro.Image.call(target);
		this._is_subcontrol = true;
		this.parent = target;
	};

	var _pImageSketchBackGround = nexacro._createPrototype(nexacro.Image, nexacro.ImageSketchBackGround);
	nexacro.ImageSketchBackGround.prototype = _pImageSketchBackGround;

	_pImageSketchBackGround.on_load = function (imageurl, width, height, _handle, errstatus, fireerrorcode, returncode, locationuri) {
		this.width = width;
		this.height = height;

		var sketch = this.parent;
		if (errstatus && errstatus < 0) {
			var errormsg = "";
			if (fireerrorcode) {
				errormsg = nexacro._GetSystemErrorMsg(this, fireerrorcode);
			}
			else {
				errormsg = nexacro._GetSystemErrorMsg(this, sketch._const_code_loadinvalidimage_msg).replace("%0", sketch._const_code_loadinvalidimage);
			}

			if (!locationuri) {
				locationuri = sketch._getRefFormBaseUrl();
			}

			if (sketch._clr_history) {
				sketch.on_fire_onerror(this, fireerrorcode, errormsg, sketch._const_errortype_obj, locationuri, imageurl, sketch._const_code_loadinvalidimage);
			}
		}
		else {
			if (_handle) {
				this._handle = _handle;
			}

			var canvas_elem = sketch._canvas_elem_bg;
			if (canvas_elem && sketch._image) {
				if (sketch._isEnableRedraw()) {
					canvas_elem.drawImage(sketch._image, 0, 0, width, height);
					if (sketch._canvas_elem_tmp) {
						sketch._canvas_elem_tmp.drawImage(sketch._image, 0, 0, width, height);
					}
					sketch._setImageValue(sketch._image);
				}
				if (sketch._clr_history) {
					sketch.on_fire_onload(this, imageurl);
				}
			}
		}
		if (sketch.updatebindingvalue != "nosetvalue") {
			sketch.updateToDataset();
		}
	};

	_pImageSketchBackGround.set_src = function (v) {
		if (this.src != v) {
			this.src = v;
			this._handle = nexacro._getImageObject(v, this.on_load, this, this.parent._getRefFormBaseUrl());
			if (this._handle) {
				return true;
			}
		}
		return false;
	};

	delete _pImageSketchBackGround;
	_pImageSketchBackGround = null;
}
