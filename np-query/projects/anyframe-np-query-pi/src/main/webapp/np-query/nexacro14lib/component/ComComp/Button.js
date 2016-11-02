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


if (!nexacro.Button) {
	nexacro.Button_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
	};

	var _pButtonStyle = nexacro._createPrototype(nexacro.Style, nexacro.Button_Style);
	nexacro.Button_Style.prototype = _pButtonStyle;

	eval(nexacro._createValueAttributeEvalStr("_pButtonStyle", "image"));
	eval(nexacro._createAlignAttributeEvalStr("_pButtonStyle", "imagealign"));

	_pButtonStyle.__custom_emptyObject = function () {
		this.image = null;
		this.imagealign = null;
	};
	_pButtonStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.image && !this.image._is_empty) {
			val += "image:" + this.image._value + "; ";
		}
		if (this.imagealign && !this.imagealign._is_empty) {
			val += "imagealign:" + this.imagealign._value + "; ";
		}
		return val;
	};


	nexacro.Button_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.image = null;
		this.imagealign = null;
	};

	var _pButtonCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Button_CurrentStyle);
	nexacro.Button_CurrentStyle.prototype = _pButtonCurrentStyle;

	_pButtonCurrentStyle.__custom_emptyObject = _pButtonStyle.__custom_emptyObject;
	_pButtonCurrentStyle.__get_custom_style_value = _pButtonStyle.__get_custom_style_value;

	delete _pButtonStyle;
	delete _pButtonCurrentStyle;

	nexacro.Button = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.defaultbutton = false;
		this.escapebutton = false;
		this.selectStatus = false;
		this.wordwrap = "none";


		this._apply_pushed_pseudo = true;

		this._text_elem = null;
		this._img_elem = null;

		this._text_width = -1;
		this._text_height = -1;

		this._image_width = 0;
		this._image_height = 0;

		this._is_hotkey_click = false;
		this._accessibility_role = "button";
	};


	var _pButton = nexacro._createPrototype(nexacro.Component, nexacro.Button);
	nexacro.Button.prototype = _pButton;

	_pButton._type_name = "Button";

	nexacro.Button._default_image_align = nexacro.Component._default_buttonimg_align;

	_pButton.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

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

		var image = this.on_find_CurrentStyle_image(pseudo);
		if (image) {
			var align = this.on_find_CurrentStyle_align(pseudo);
			var imagealign = this.on_find_CurrentStyle_imagealign(pseudo);
			curstyle.align = align;
			curstyle.imagealign = imagealign;
			if (image != curstyle.image) {
				curstyle.image = image;
				this._load_image(image);
			}
			else {
				this._updateElementPositions(align, imagealign);
			}
		}
		else {
			if (curstyle.image) {
				curstyle.image = null;
				this._load_image(null);
			}
			var align = this.on_find_CurrentStyle_align(pseudo);
			if (align != curstyle.align) {
				curstyle.align = align;
				this.on_apply_style_align(align);
			}
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pButton.on_create_custom_style = function () {
		return new nexacro.Button_Style(this);
	};

	_pButton.on_create_custom_currentStyle = function () {
		return new nexacro.Button_CurrentStyle();
	};

	_pButton.on_find_CurrentStyle_image = function (pseudo) {
		return this._find_pseudo_obj("image", pseudo);
	};
	_pButton.on_find_CurrentStyle_imagealign = function (pseudo) {
		var align = this._find_pseudo_obj("imagealign", pseudo, "align");
		return (align) ? align : nexacro.Button._default_image_align;
	};

	_pButton.on_update_style_image = function () {
		this.on_apply_style_image(this.currentstyle.image = this.on_find_CurrentStyle_image(this._pseudo));
	};

	_pButton.on_update_style_imagealign = function () {
		this.on_apply_style_imagealign(this.currentstyle.imagealign = this.on_find_CurrentStyle_imagealign(this._pseudo));
	};

	_pButton.on_update_style_padding = function () {
		var padding = this.currentstyle.padding = this.on_find_CurrentStyle_padding(this._pseudo);
		this._control_element.setElementPadding(padding);
		this._updateClientSize(this._control_element);
	};
	_pButton.on_apply_style_color = function (color) {
		if (this._text_elem && color) {
			this._text_elem.setElementColor(color);
		}
	};

	_pButton.on_apply_style_font = function (font) {
		if (this._text_elem && font) {
			this._text_elem.setElementFont(font);
			this._text_width = -1;
			this._text_height = -1;
			if (this._img_elem) {
				var curstyle = this.currentstyle;
				if (this._img_elem && curstyle.align && curstyle.imagealign) {
					this._updateElementPositions(curstyle.align, curstyle.imagealign);
				}
			}
		}
	};

	_pButton.on_apply_style_align = function (align) {
		if (this._text_elem && align) {
			if (this._img_elem && this.currentstyle.imagealign) {
				this._updateElementPositions(align, this.currentstyle.imagealign);
			}
			else {
				var halign = (align.halign == "" ? "center" : align._halign);
				var valign = (align.valign == "" ? "middle" : align._valign);
				this._text_elem.setElementAlignXY(halign, valign);
				nexacro._updateTextElementPositions(this);
			}
		}
	};

	_pButton.on_apply_style_image = function (image) {
		this._load_image(this.currentstyle.image);
	};

	_pButton.on_apply_style_imagealign = function (imagealign) {
		if (this._img_elem) {
			this._updateElementPositions(this.currentstyle.align, imagealign);
		}
	};
	_pButton.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;

			if (this.text) {
				var halign = (curstyle.align.halign == "" ? "center" : curstyle.align._halign);
				var valign = (curstyle.align.valign == "" ? "middle" : curstyle.align._valign);

				var text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementFont(curstyle.font);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(curstyle.letterspace);
				this._text_elem = text_elem;
				text_elem = null;
			}
			if (curstyle.image) {
				this._load_image(curstyle.image);
			}

			var mainform = this._getMainForm();
			if (mainform && mainform._defaultbutton == this) {
				this._setAccessibilityFlagDefaultButton(true);
			}
			mainform = null;
		}
	};

	_pButton.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var text_elem = this._text_elem;
			var img_elem = this._img_elem;
			if (img_elem) {
				img_elem.create();
			}
			if (text_elem) {
				text_elem.create();
			}
			if (this.expr) {
				this.on_apply_expr();
			}
			this.on_apply_wordwrap();

			this.on_apply_prop_rtldirection();

			text_elem = null;
			img_elem = null;
		}
		control_elem = null;
		this._preloadImage();
	};
	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 10) {
		_pButton._preloadImage = function () {
			var pseudoarr = ["mouseover", "disabled", "focused", "pushed", "selected"];
			var pseudoarr_len = pseudoarr.length;

			for (var i = 0; i < pseudoarr_len; i++) {
				var image = this.on_find_CurrentStyle_image(pseudoarr[i]);
				var val = image ? image._value : "";

				if (val) {
					val = nexacro._getURIValue(val);
					val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

					nexacro._getImageSize(val, function () {
					}, this, undefined, image);
				}
			}
		};
	}
	else {
		_pButton._preloadImage = function () {
		};
	}

	_pButton.destroyComponent = function () {
		if (!this._is_alive) {
			return;
		}

		var mainform = this._getMainForm();
		if (mainform) {
			if (mainform._defaultbutton == this) {
				mainform._defaultbutton = null;
			}
			if (mainform._escapebutton == this) {
				mainform._escapebutton = null;
			}
		}

		return nexacro.Component.prototype.destroyComponent.call(this);
	};

	_pButton.on_destroy_contents = function () {
		var textElem = this._text_elem;
		var imgElem = this._img_elem;
		if (textElem) {
			textElem.destroy();
			this._text_elem = null;
		}
		if (imgElem) {
			imgElem.destroy();
			this._img_elem = null;
		}
	};

	_pButton.on_change_containerRect = function (width, height) {
		var textElem = this._text_elem;
		var imgElem = this._img_elem;
		if (textElem) {
			textElem.setElementSize(width, height);
			if (imgElem) {
				this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
			}
			else {
				nexacro._updateTextElementPositions(this);
			}
		}
		else if (imgElem) {
			this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
		}

		this.on_apply_custom_pseudo(this._pseudo);
	};



	_pButton._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : false, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false
		};
	};

	_pButton._img_load_completed = function (imgurl) {
		var curstyle = this.currentstyle;
		var cur_imgalign = curstyle.imagealign ? curstyle.imagealign : this.on_find_CurrentStyle_imagealign(this._pseudo);

		curstyle.imagalign = cur_imgalign;
		this._updateElementPositions(curstyle.align, cur_imgalign);
		this._img_elem.setElementImageUrl(imgurl);

		cur_imgalign = null;
		curstyle = null;
	};

	_pButton._on_loadImg = function (imgurl, w, h) {
		if (!this._is_alive) {
			return;
		}

		if (this._lastest_imgurl != imgurl) {
			return;
		}

		this._image_width = w;
		this._image_height = h;
		this._img_load_completed(imgurl);

		this.on_apply_custom_pseudo(this._pseudo);
	};

	_pButton._load_image = function (image) {
		var control_elem = this._control_element;
		if (control_elem && image) {
			var val = image ? image._value : "";
			if (val) {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

				var imgElem = this._img_elem;
				if (!imgElem) {
					imgElem = new nexacro.ImageElement(control_elem);
					this._img_elem = imgElem;
					if (this._is_created) {
						imgElem.create();
					}
				}

				this._lastest_imgurl = val;
				var size = nexacro._getImageSize(val, this._on_loadImg, this, undefined, (image ? image._value : ""));
				if (size) {
					this._image_width = size.width;
					this._image_height = size.height;
					this._img_load_completed(val);
				}
				imgElem = null;
			}
			else {
				if (this._img_elem) {
					this._img_elem.destroy();
					this._img_elem = null;
					this._image_width = 0;
					this._image_height = 0;
					this._lastest_imgurl = "";
					if (this._text_elem) {
						var align = this.currentstyle.align;
						var halign = (align.halign == "" ? "center" : align._halign);
						var valign = (align.valign == "" ? "middle" : align._valign);

						this._text_elem.setElementAlignXY(halign, valign);
					}
				}
			}
		}
	};
	_pButton._updateElementPositions = function (align, imagealign) {
		if (!this._is_created_contents) {
			return;
		}

		var textElem = this._text_elem;
		var imgElem = this._img_elem;
		if (textElem && imgElem && align && imagealign) {
			var client_width = this._client_width;
			var client_height = this._client_height;

			var halign = (align.halign == "" ? "center" : align.halign);
			var valign = (align.valign == "" ? "middle" : align.valign);

			var img_halign = imagealign.halign;
			var img_valign = imagealign.valign;

			var tw, th;
			var font = this.currentstyle.font || nexacro.Component._default_font;
			var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
			var size = nexacro._getTextSize(letterspace, this.text, font);
			tw = this._text_width = size[0];
			th = this._text_height = size[1];
			tw = tw < 0 ? 0 : tw;

			var imgw = this._image_width;
			var imgh = this._image_height;

			var pos;
			var imgpos_x, imgpos_y;
			var textpos_x, textpos_y;
			switch (img_halign) {
				case "lefttext":
					if (halign == "left") {
						pos = 0;
					}
					else if (halign == "right") {
						pos = client_width - tw - imgw;
					}
					else {
						pos = ((client_width - tw - imgw) / 2) | 0;
					}
					pos = pos < 0 ? 0 : pos;
					imgpos_x = pos;
					pos += imgw;
					textpos_x = pos;
					halign = "left";
					break;
				case "righttext":
					if (halign == "left") {
						pos = 0;
					}
					else if (halign == "right") {
						pos = client_width - tw - imgw;
					}
					else {
						pos = ((client_width - tw - imgw) / 2) | 0;
					}
					pos = pos < 0 ? 0 : pos;
					textpos_x = pos;
					pos += tw;
					imgpos_x = pos;
					halign = "left";
					break;
				case "left":
					imgpos_x = 0;
					textpos_x = 0;
					break;
				case "right":
					pos = client_width - imgw;
					imgpos_x = pos;
					textpos_x = 0;
					break;
				default:
					pos = ((client_width - imgw) / 2) | 0;
					imgpos_x = pos;
					textpos_x = 0;
					break;
			}
			switch (img_valign) {
				case "toptext":
					if (valign == "top") {
						pos = 0;
					}
					else if (valign == "bottom") {
						pos = client_height - th - imgh;
					}
					else {
						pos = ((client_height - th - imgh) / 2) | 0;
					}
					imgpos_y = pos;
					pos += imgh;
					textpos_y = pos;
					valign = "top";
					break;
				case "bottomtext":
					if (valign == "top") {
						pos = 0;
					}
					else if (valign == "bottom") {
						pos = client_height - th - imgh;
					}
					else {
						pos = ((client_height - th - imgh) / 2) | 0;
					}
					textpos_y = pos;
					pos += th;
					imgpos_y = pos;
					valign = "top";
					break;
				case "top":
					imgpos_y = 0;
					textpos_y = 0;
					break;
				case "bottom":
					pos = client_height - imgh;
					imgpos_y = pos;
					textpos_y = 0;
					break;
				default:
					pos = ((client_height - imgh) / 2) | 0;
					imgpos_y = pos;
					textpos_y = 0;
					break;
			}

			textpos_x = textpos_x < 0 ? 0 : textpos_x;
			textpos_y = textpos_y < 0 ? 0 : textpos_y;

			imgpos_x = this._convertLeftForRtlLayout(imgpos_x, imgw);

			imgElem.setElementPosition(imgpos_x, imgpos_y);
			imgElem.setElementSize(imgw, imgh);

			textElem.setElementAlignXY(halign, valign);
			textElem.setElementPaddingXY(textpos_x, textpos_y, 0, 0);
		}
		else if (textElem && align) {
			var halign = (align.halign == "" ? "center" : align._halign);
			var valign = (align.valign == "" ? "middle" : align._valign);
			textElem.setElementAlignXY(halign, valign);
		}
		else if (imgElem && imagealign) {
			var client_width = this._client_width;
			var client_height = this._client_height;

			var halign = "center";
			var valign = "middle";
			if (align) {
				halign = align.halign == "" ? "center" : align.halign;
				valign = align.valign == "" ? "middle" : align.valign;
			}

			var img_halign = imagealign.halign;
			var img_valign = imagealign.valign;

			var imgw = this._image_width;
			var imgh = this._image_height;

			var pos;
			var imgpos_x, imgpos_y;
			switch (img_halign) {
				case "lefttext":
				case "righttext":
					if (halign == "left") {
						imgpos_x = 0;
					}
					else if (halign == "right") {
						imgpos_x = client_width - imgw;
					}
					else {
						imgpos_x = ((client_width - imgw) / 2) | 0;
					}
					break;
				case "left":
					imgpos_x = 0;
					break;
				case "right":
					imgpos_x = client_width - imgw;
					break;
				default:
					imgpos_x = ((client_width - imgw) / 2) | 0;
					break;
			}
			switch (img_valign) {
				case "toptext":
				case "bottomtext":
					if (valign == "top") {
						imgpos_y = 0;
					}
					else if (valign == "bottom") {
						imgpos_y = client_height - imgh;
					}
					else {
						imgpos_y = ((client_height - imgh) / 2) | 0;
					}
					break;
				case "top":
					imgpos_y = 0;
					break;
				case "bottom":
					imgpos_y = client_height - imgh;
					break;
				default:
					imgpos_y = ((client_height - imgh) / 2) | 0;
					break;
			}

			imgpos_x = this._convertLeftForRtlLayout(imgpos_x, imgw);

			imgElem.setElementPosition(imgpos_x, imgpos_y);
			imgElem.setElementSize(imgw, imgh);
		}
		textElem = null;
		imgElem = null;
	};

	_pButton.on_apply_text = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			var text_elem = this._text_elem;
			if (!text_elem) {
				text_elem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = text_elem;
				this.on_apply_wordwrap();

				var halign, valign;

				if (curstyle.align) {
					halign = (curstyle.align.halign == "" ? "center" : curstyle.align._halign);
					valign = (curstyle.align.valign == "" ? "middle" : curstyle.align._valign);
				}
				else {
					halign = "center";
					valign = "middle";
				}

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
			else {
				nexacro._updateTextElementPositions(this);
			}

			text_elem = null;
			curstyle = null;
			this._refreshAccessibilityValue();
		}
	};

	_pButton.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pButton.on_apply_prop_rtldirection = function () {
		var control_element = this.getElement();
		var _rtldirection = this._rtldirection;

		if (control_element) {
			control_element.setElementRtlDirection(_rtldirection);
			if (this._img_elem) {
				this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
				this._img_elem.setElementImageMirror(null, true);
			}
			else {
				nexacro._updateTextElementPositions(this);
			}
		}
	};

	_pButton._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this._is_hotkey_click = true;
		this.click();
	};

	_pButton.set_defaultbutton = function (v) {
		this.defaultbutton = nexacro._toBoolean(v);

		var mainform = this._getMainForm();
		if (mainform) {
			if (nexacro._toBoolean(v) == true) {
				mainform._defaultbutton = this;
				this._setAccessibilityFlagDefaultButton(true);
			}
			else {
				if (mainform._defaultbutton == this) {
					mainform._defaultbutton = null;
					this._setAccessibilityFlagDefaultButton(false);
				}
			}
		}
	};
	_pButton.set_escapebutton = function (v) {
		this.escapebutton = nexacro._toBoolean(v);

		var mainform = this._getMainForm();
		if (mainform) {
			var is_ignore = !(this.parent == mainform || this._is_created);
			if (nexacro._toBoolean(v) == true) {
				if (!is_ignore) {
					mainform._escapebutton = this;
				}
			}
			else {
				if (mainform._escapebutton == this) {
					mainform._escapebutton = null;
				}
			}
		}
	};

	_pButton.click = function () {
		this.on_fire_onclick("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
	};

	_pButton.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		var window = this._getWindow();
		var elem = window._cur_ldown_elem || window._keydown_element;

		if (!this._is_subcontrol && !this._is_hotkey_click) {
			if (elem == this._cur_ldown_elem) {
				if (key_code == 13 || key_code == 32) {
					this.click();
				}
			}
		}
		this._cur_ldown_elem = null;

		this._is_hotkey_click = false;

		return ret;
	};

	_pButton._cur_ldown_elem = null;
	_pButton.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		var window = this._getWindow();
		this._cur_ldown_elem = window._cur_ldown_elem || window._keydown_element;
		return ret;
	};

	_pButton.getSelectStatus = function () {
		return this.selectStatus;
	};
	_pButton.setSelectStatus = function (select) {
		var preSelect = this.selectStatus;

		if (select) {
			this._stat_change("select", "selected");
		}
		else {
			this._stat_change("notselect", "normal");
		}
		this.selectStatus = select;
		return preSelect;
	};

	_pButton.toggleSelectStatus = function () {
		var preSelect = this.selectStatus;

		this.setSelectStatus(!preSelect);

		return preSelect;
	};

	_pButton.on_getBindableProperties = function () {
		return "value";
	};

	_pButton.set_wordwrap = function (v) {
		if (typeof (v) == "string") {
			v = v.toLowerCase();
		}

		if (v != this.wordwrap) {
			this.wordwrap = v;

			this.on_apply_wordwrap();
		}
	};

	_pButton.on_apply_wordwrap = function () {
		if (this._text_elem) {
			this._text_elem.setElementWordWrap(this.wordwrap);
		}
	};

	delete _pButton;

	nexacro.ImageButton = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.defaultbutton = false;
		this.escapebutton = false;
		this.selectStatus = false;
		this._img_elem = null;

		this._apply_pushed_pseudo = true;
		this._is_simple_control = true;
	};


	var _pImageButton = nexacro._createPrototype(nexacro.Button, nexacro.ImageButton);
	nexacro.ImageButton.prototype = _pImageButton;

	_pImageButton.on_create_custom_style = function () {
		return new nexacro.Button_Style(this);
	};

	_pImageButton.on_create_custom_currentStyle = function () {
		return new nexacro.Button_CurrentStyle();
	};

	_pImageButton.on_find_CurrentStyle_image = function (pseudo) {
		return this._find_pseudo_obj("image", pseudo);
	};
	_pImageButton.on_find_CurrentStyle_imagealign = function (pseudo) {
		var align = this._find_pseudo_obj("imagealign", pseudo, "align");
		return (align) ? align : nexacro.Button._default_image_align;
	};

	_pImageButton.on_update_style_image = function () {
		this.on_apply_style_image(this.currentstyle.image = this.on_find_CurrentStyle_image(this._pseudo));
	};
	_pImageButton.on_update_style_imagealign = function () {
		this.on_apply_style_imagealign(this.currentstyle.imagealign = this.on_find_CurrentStyle_imagealign(this._pseudo));
	};

	_pImageButton.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;
		var image = this.on_find_CurrentStyle_image(pseudo);
		if (image != curstyle.image) {
			curstyle.image = image;
			this._load_image(image);
		}

		var align = this.on_find_CurrentStyle_align(pseudo);
		var imagealign = this.on_find_CurrentStyle_imagealign(pseudo);
		if (align != curstyle.align || imagealign != curstyle.imagealign) {
			curstyle.align = align;
			curstyle.imagealign = imagealign;
			this._update_align(align, imagealign);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			this.on_apply_style_rtlimagemirroring(curstyle.rtlimagemirroring = rtlimagemirroring);
		}

		curstyle = null;
	};

	_pImageButton.on_apply_style_image = function (image) {
		this._load_image(image);
	};

	_pImageButton.on_apply_style_align = function (align) {
		this._update_align(align, this.currentstyle.imagealign);
	};
	_pImageButton.on_apply_style_imagealign = function (align) {
		this._update_align(align, this.currentstyle.imagealign);
	};


	_pImageButton.on_create_contents = function () {
		var control_elem = this._control_element;
		var imgElem = new nexacro.AlignImageElement(control_elem);
		var curstyle = this.currentstyle;

		imgElem.setElementPosition(this._client_left, this._client_top);
		imgElem.setElementSize(this._client_width, this._client_height);

		this._img_elem = imgElem;

		this._update_align(curstyle.align, curstyle.imagealign);
		this._load_image(curstyle.image);

		imgElem = null;
		control_elem = null;
		curstyle = null;
	};

	_pImageButton.on_created_contents = function () {
		this._img_elem.create();
	};

	_pImageButton.on_destroy_contents = function () {
		if (this._img_elem) {
			this._img_elem.destroy();
			this._img_elem = null;
		}
	};

	_pImageButton.on_change_containerPos = function (left, top) {
		if (this._img_elem && !(this.getElement()._vml_elem)) {
			this._img_elem.setElementPosition(left, top);
		}
	};

	_pImageButton.on_change_containerRect = function (width, height) {
		if (this._img_elem) {
			this._img_elem.setElementSize(width, height);
		}
	};

	_pImageButton._load_image = function (image) {
		var imgElem = this._img_elem;
		if (imgElem) {
			var val = image ? image._value : "";
			if (val) {
				imgElem.setElementImageUrl(val);
			}
			else {
				imgElem.setElementImageUrl("");
			}
		}
		imgElem = null;
	};

	_pImageButton._update_align = function (align, imagealign) {
		if (align == null || imagealign == null) {
			return;
		}

		var imgElem = this._img_elem;
		if (imgElem) {
			var client_width = this._client_width;
			var client_height = this._client_height;

			var halign = align.halign == "" ? "center" : align.halign;
			var valign = align.valign == "" ? "middle" : align.valign;

			var img_halign = imagealign.halign;
			var img_valign = imagealign.valign;

			switch (img_halign) {
				case "left":
				case "right":
					halign = img_halign;
					break;
			}
			switch (img_valign) {
				case "top":
				case "bottom":
					valign = img_valign;
					break;
			}
			imgElem.setElementAlignXY(halign, valign);
		}
		imgElem = null;
	};

	_pImageButton.on_apply_text = function () {
	};
	_pImageButton.on_apply_expr = function () {
	};

	_pImageButton.on_apply_prop_rtldirection = function () {
		var control_element = this.getElement();
		var _rtldirection = this._rtldirection;

		if (control_element) {
			control_element.setElementRtlDirection(_rtldirection);

			var imgElem = this._img_elem;
			if (imgElem) {
				var left = control_element.client_left;
				var top = control_element.client_top;
				var width = control_element.client_width;

				left = this._convertLeftForRtlLayout(left, width);

				imgElem.setElementImageMirror(null, true);
				imgElem.setElementPosition(left, top);
			}
		}
	};

	_pImageButton.click = function () {
		this.on_fire_onclick("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
	};

	_pImageButton.getSelectStatus = function () {
		return this.selectStatus;
	};

	_pImageButton.setSelectStatus = function (select) {
		var preSelect = this.selectStatus;

		if (select) {
			this._stat_change("select", "selected");
		}
		else {
			this._stat_change("notselect", "normal");
		}
		this.selectStatus = select;
		return preSelect;
	};

	_pImageButton.toggleSelectStatus = function () {
		var preSelect = this.selectStatus;

		this.selectStatus = !preSelect;
		return preSelect;
	};

	_pImageButton._setRealEnable = function (enable) {
		if (enable == undefined) {
			enable = this.enable;
		}

		if (this._real_enable != enable) {
			var control_elem = this._control_element;
			this._real_enable = enable;

			if (enable) {
				this._status = "enable";
				this._pseudo = "normal";
			}
			else {
				this._status = "disable";
				this._pseudo = "disabled";
			}

			if (this.visible && control_elem) {
				this._updateControl(control_elem, this._pseudo);
				this._updateContents(control_elem, this._pseudo);
			}
		}
	};

	delete _pImageButton;

	nexacro.ButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Button.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pButtonCtrl = nexacro.ButtonCtrl.prototype = nexacro._createPrototype(nexacro.Button, nexacro.ButtonCtrl);
	_pButtonCtrl._type_name = "ButtonControl";

	nexacro._setForControlStyleFinder(_pButtonCtrl);
	delete _pButtonCtrl;


	nexacro.TrackButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_track = true;
	};
	var _pTrackButtonCtrl = nexacro.TrackButtonCtrl.prototype = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.TrackButtonCtrl);
	delete _pTrackButtonCtrl;


	nexacro.ImageButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButton.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pImageButtonCtrl = nexacro.ImageButtonCtrl.prototype = nexacro._createPrototype(nexacro.ImageButton, nexacro.ImageButtonCtrl);
	_pImageButtonCtrl._type_name = "ButtonControl";

	nexacro._setForControlStyleFinder(_pImageButtonCtrl);

	_pImageButtonCtrl.on_apply_pseudo = function (pseudo) {
		if (this.parent._set_real) {
			return;
		}

		var form = this.parent;
		var enable = this.enable;

		while (form != null) {
			if (form._real_enable == false || form.enable == false) {
				enable = false;
				break;
			}

			if (form.parent && !form.parent._is_application && form._getWindow() != form.parent._getWindow()) {
				break;
			}

			form = form.parent;
		}
		if (this._setEnable(enable)) {
			return;
		}

		this._pseudo = pseudo = this._getResultPseudo(this._status, pseudo);
		var control_elem = this.getElement();
		if (this.visible && control_elem) {
			this._updateControl(control_elem, pseudo);
			this._updateContents(control_elem, pseudo);
		}
		form = null;
		control_elem = null;
	};

	_pImageButtonCtrl.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		var rtlimagemirroring = this.parent.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (!rtlimagemirroring) {
			rtlimagemirroring = this._find_inherit_pseudo_obj("rtlimagemirroring", pseudo);
		}
		return rtlimagemirroring;
	};

	delete _pImageButtonCtrl;

	nexacro.TrackImageButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_track = true;
	};
	var _pTrackImageButtonCtrl = nexacro.TrackImageButtonCtrl.prototype = nexacro._createPrototype(nexacro.ImageButtonCtrl, nexacro.TrackImageButtonCtrl);
	delete _pTrackImageButtonCtrl;


	nexacro.StepImageButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButton.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pStepImageButtonCtrl = nexacro._createPrototype(nexacro.ImageButton, nexacro.StepImageButtonCtrl);
	nexacro.StepImageButtonCtrl.prototype = _pStepImageButtonCtrl;

	_pStepImageButtonCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent._find_pseudo_obj("buttonbackground", pseudo, "background");
		;
	};

	_pStepImageButtonCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent._find_pseudo_obj("buttonborder", pseudo, "border");
		;
	};

	_pStepImageButtonCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("buttonbordertype", pseudo, "bordertype");
		;
	};

	_pStepImageButtonCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent._find_pseudo_obj("buttongradation", pseudo, "gradation");
		;
	};

	_pStepImageButtonCtrl.on_find_CurrentStyle_padding = function (pseudo) {
	};

	_pStepImageButtonCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
	};

	_pStepImageButtonCtrl._on_getAccessibilityAdditionalLabel = function () {
		var parent = this.parent;

		if (parent) {
			var label = this.id + " " + parent.stepcount;
			return label;
		}
		parent = null;
		return "";
	};

	_pStepImageButtonCtrl._on_getAccessibilityAdditionalRole = function () {
		return " Step";
	};


	delete _pStepImageButtonCtrl;
}
