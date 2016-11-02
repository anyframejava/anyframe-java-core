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

if (!nexacro.TitleBar) {
	nexacro.TitleBar_Style = function (target) {
		this.icon = null;


		this._target = target || null;
	};

	var _pTitleBarStyle = nexacro._createPrototype(nexacro.Style, nexacro.TitleBar_Style);
	nexacro.TitleBar_Style.prototype = _pTitleBarStyle;

	eval(nexacro._createValueAttributeEvalStr("_pTitleBarStyle", "icon"));

	_pTitleBarStyle.__custom_emptyObject = function () {
		this.icon = null;
	};

	_pTitleBarStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.icon && !this.icon._is_empty) {
			val += "icon:" + this.icon._value + "; ";
		}
		return val;
	};

	nexacro.TitleBar_CurrentStyle = function () {
		this.icon = null;
	};

	var _pTitleBarCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.TitleBar_CurrentStyle);
	nexacro.TitleBar_CurrentStyle.prototype = _pTitleBarCurrentStyle;

	_pTitleBarCurrentStyle.__custom_emptyObject = _pTitleBarStyle.__custom_emptyObject;
	_pTitleBarCurrentStyle.__get_custom_style_value = _pTitleBarStyle.__get_custom_style_value;


	delete _pTitleBarStyle;
	delete _pTitleBarCurrentStyle;

	nexacro.TitleBar = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.minbutton = null;
		this.normalbutton = null;
		this.maxbutton = null;
		this.closebutton = null;


		this._state_openstatus = 0;

		if (parent && parent._is_frame && parent._is_window) {
			this._is_track = false;
		}
		else {
			this._is_track = true;
		}

		this._icon_elem = null;
		this._text_elem = null;
		this._titletext = "";
		this._is_verticalmin = false;
		this._absolute_style = 0;
		this._iconwidth = 0;
		this._iconheight = 0;
		this._is_scrollable = false;
		this._is_nc_control = true;
		this._is_focus_accept = false;
	};

	var _pTitleBar = nexacro._createPrototype(nexacro.Form, nexacro.TitleBar);
	nexacro.TitleBar.prototype = _pTitleBar;

	_pTitleBar._type_name = "TitleBar";

	nexacro.TitleBar._default_align = nexacro.Component._default_left_align;
	nexacro.TitleBar._default_icon = null;

	_pTitleBar.on_create_custom_style = function () {
		return new nexacro.TitleBar_Style(this);
	};

	_pTitleBar.on_create_custom_currentStyle = function () {
		return new nexacro.TitleBar_CurrentStyle();
	};

	_pTitleBar.on_apply_custom_pseudo = function (pseudo) {
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

		var icon = this.on_find_CurrentStyle_icon(pseudo);
		if (icon != curstyle.icon) {
			curstyle.icon = icon;
			this.on_apply_style_icon(icon);
		}



		var padding = this.on_find_CurrentStyle_padding(pseudo);
		if (curstyle.padding != padding) {
			curstyle.padding = padding;
			this.on_apply_style_padding(padding);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pTitleBar.on_find_CurrentStyle_icon = function (pseudo) {
		var icon = this._find_pseudo_obj("icon", pseudo, "value");
		return icon ? icon : nexacro.TitleBar._default_icon;
	};

	_pTitleBar.on_update_style_icon = function () {
		this.on_apply_style_icon(this.currentstyle.icon = this.on_find_CurrentStyle_icon(this._pseudo));
	};

	_pTitleBar.on_update_style_padding = function () {
		var padding = this.currentstyle.padding = this.on_find_CurrentStyle_padding(this._pseudo);

		if (this._control_element) {
			this._control_element.setElementPadding(padding);
			this._updateClientSize(this._control_element);
		}
	};

	_pTitleBar.on_apply_style_padding = function (padding) {
		if (this._control_element) {
			this._control_element.setElementPadding(padding);
		}
	};

	_pTitleBar.on_apply_style_icon = function (icon) {
		if (this._icon_elem) {
			var ownerframe = this.getOwnerFrame();
			if (ownerframe && ownerframe.currentstyle.icon && !ownerframe.currentstyle.icon._is_empty) {
				icon = ownerframe.currentstyle.icon;
			}
			if (icon == null) {
				icon = this.currentstyle.icon;
			}

			var iconsize = nexacro._getImageSize(icon.value, this._on_loadicon, this, this._getRefFormBaseUrl(), undefined, icon.value);
			if (iconsize) {
				if ((iconsize.width > 0) && (iconsize.height > 0)) {
					this._iconwidth = iconsize.width;
					this._iconheight = iconsize.height;
				}
			}
			if (ownerframe.showtitleicon == false) {
				this._icon_elem.setElementImageUrl("");
			}
			else {
				this._icon_elem.setElementImageUrl(icon.value);
			}

			this._updateControlPosition();
		}
	};

	_pTitleBar.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
		}
	};
	_pTitleBar.on_apply_style_color = function (color) {
		if (this._text_elem) {
			this._text_elem.setElementColor(color);
		}
	};

	_pTitleBar.on_apply_style_align = function (align) {
		if (this._text_elem) {
			this._text_elem.setElementAlign(align);
		}
	};

	_pTitleBar.on_apply_style_rtlimagemirroring = function (rtlimagemirroring) {
		var control_elem = this._control_element;
		var img_elem = this._img_elem;

		if (this.minbutton) {
			this.minbutton.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
		if (this.maxbutton) {
			this.maxbutton.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
		if (this.normalbutton) {
			this.normalbutton.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
		if (this.closebutton) {
			this.closebutton.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pTitleBar.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var ownerframe = this.getOwnerFrame();
			var curstyle = this.currentstyle;

			var iconElem = this._icon_elem = new nexacro.AlignImageElement(control_elem);
			iconElem.setElementAlignXY("center", "middle");

			var textElem = this._text_elem = new nexacro.TextBoxElement(control_elem);
			if (this._titletext) {
				textElem.setElementText(this._titletext);
			}
			textElem.setElementAlign(curstyle.align ? curstyle.align : nexacro.TitleBar._default_align);
			textElem.setElementFont(curstyle.font);
			textElem.setElementColor(curstyle.color);
			textElem.setElementLetterSpace(curstyle.letterspace);

			var minBtn = this.minbutton = new nexacro.ImageButtonCtrl("minbutton", "absolute", 0, 0, 0, 0, null, null, this);
			var maxBtn = this.maxbutton = new nexacro.ImageButtonCtrl("maxbutton", "absolute", 0, 0, 0, 0, null, null, this);
			var normalBtn = this.normalbutton = new nexacro.ImageButtonCtrl("normalbutton", "absolute", 0, 0, 0, 0, null, null, this);
			var closeBtn = this.closebutton = new nexacro.ImageButtonCtrl("closebutton", "absolute", 0, 0, 0, 0, null, null, this);

			normalBtn.set_visible(false);

			if (ownerframe) {
				minBtn._setEventHandler("onclick", ownerframe.on_minbutton_click, ownerframe);
				maxBtn._setEventHandler("onclick", ownerframe.on_maxbutton_click, ownerframe);
				normalBtn._setEventHandler("onclick", ownerframe.on_normalbutton_click, ownerframe);
				closeBtn._setEventHandler("onclick", ownerframe.on_closebutton_click, ownerframe);

				this._setEventHandler("ondblclick", ownerframe._on_titlebar_dblclick, ownerframe);
			}

			var icon;
			if (ownerframe && ownerframe.currentstyle.icon && !ownerframe.currentstyle.icon._is_empty) {
				icon = ownerframe.currentstyle.icon;
			}
			else {
				icon = this.currentstyle.icon;
			}

			if (icon) {
				var val = nexacro._getURIValue(icon._value);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

				if (ownerframe.showtitleicon != false) {
					iconElem.setElementImageUrl(icon.value);
				}

				var iconsize = nexacro._getImageSize(val, this._on_loadicon, this, this._getRefFormBaseUrl(), icon._value);
				if (iconsize) {
					if ((iconsize.width > 0) && (iconsize.height > 0)) {
						this._iconwidth = iconsize.width;
						this._iconheight = iconsize.height;

						if (this._icon_elem) {
							this._updateControlPosition(this._client_width, this._client_height);
						}

						var frame = this.parent;

						if (frame && frame._is_window) {
							var _window = frame._getWindow();
							if (_window) {
								nexacro._setWindowHandleIcon(_window._handle, val);
							}
						}
					}
				}
			}
			this._updateControlPosition(this._client_width, this._client_height);

			minBtn.createComponent();
			maxBtn.createComponent();
			normalBtn.createComponent();
			closeBtn.createComponent();
		}
	};

	_pTitleBar.on_created_contents = function () {
		this._icon_elem.create();
		this._text_elem.create();

		this.minbutton.on_created();
		this.maxbutton.on_created();
		this.normalbutton.on_created();
		this.closebutton.on_created();

		if (this._pseudo) {
			var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(this._pseudo);
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pTitleBar.on_destroy_contents = function () {
		var iconElem = this._icon_elem;
		var textElem = this._text_elem;
		var minBtn = this.minbutton;
		var maxBtn = this.maxbutton;
		var normalBtn = this.normalbutton;
		var closeBtn = this.closebutton;

		if (iconElem) {
			iconElem.destroy();
			this._icon_elem = null;
		}
		if (textElem) {
			textElem.destroy();
			this._text_elem = null;
		}
		if (minBtn) {
			minBtn.destroy();
			this.minbutton = null;
		}
		if (maxBtn) {
			maxBtn.destroy();
			this.maxbutton = null;
		}
		if (normalBtn) {
			normalBtn.destroy();
			this.normalbutton = null;
		}
		if (closeBtn) {
			closeBtn.destroy();
			this.closebutton = null;
		}
	};

	_pTitleBar.on_change_containerRect = function (width, height) {
		this._updateControlPosition(width, height);
	};

	_pTitleBar.set_titletext = function (v) {
		this._titletext = v;
		if (this._text_elem) {
			this._text_elem.setElementText(v);
		}
	};


	_pTitleBar.on_minbutton_click = function (obj, e) {
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe.on_minbutton_click(obj, e);
		}
	};
	_pTitleBar.on_maxbutton_click = function (obj, e) {
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe.on_maxbutton_click(obj, e);
		}
	};
	_pTitleBar.on_normalbutton_click = function (obj, e) {
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe.on_normalbutton_click(obj, e);
		}
	};
	_pTitleBar.on_closebutton_click = function (obj, e) {
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe.on_closebutton_click(obj, e);
		}
	};

	_pTitleBar._on_starttrack = function () {
		if (!this._is_alive) {
			return;
		}
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe._on_titlebar_starttrack();
		}
	};

	_pTitleBar._on_endtrack = function (x, y, dragdata) {
		if (!this._is_alive) {
			return;
		}
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe._on_titlebar_endtrack(x, y, dragdata);
		}
	};

	_pTitleBar._on_movetrack = function (x, y, dragdata, windowX, windowY) {
		if (!this._is_alive) {
			return;
		}
		var ownerframe = this.getOwnerFrame();
		if (ownerframe) {
			ownerframe._on_titlebar_movetrack(x, y, dragdata, windowX, windowY);
		}
	};


	_pTitleBar._on_loadicon = function (url, w, h) {
		if ((w < 1) || (h < 1)) {
			return;
		}

		this._iconwidth = w;
		this._iconheight = h;
		if (this._icon_elem) {
			this._updateControlPosition(this._client_width, this._client_height);
		}

		var frame = this.parent;
		if (frame && frame._is_window) {
			var _window = frame._getWindow();
			if (_window) {
				nexacro._setWindowHandleIcon(_window._handle, url);
			}
		}
	};

	_pTitleBar._updateControlPosition = function (width, height) {
		if (!width || !height) {
			width = this._client_width;
			height = this._client_height;
		}


		var iconleftgap = 10;
		var iconrightgap = 6;
		var buttonwidth = 22;
		var buttonheight = 20;
		var buttongap = 1;
		var rightgap = 2;

		var display_as_minimize = ((this._state_openstatus == 2) || this._is_verticalmin);

		if (!this._is_verticalmin) {
			var itemsize = 24;
			var top = ((height - buttonheight) / 2) | 0;
			if (top < 0) {
				top = 0;
			}

			var curleft = width - (rightgap);
			curleft -= buttonwidth;
			this.closebutton.move(curleft, top, buttonwidth, buttonheight);

			curleft -= buttongap;
			curleft -= buttonwidth;
			this.maxbutton.move(curleft, top, buttonwidth, buttonheight);
			if (!display_as_minimize) {
				this.normalbutton.move(curleft, top, buttonwidth, buttonheight);
			}

			curleft -= buttongap;
			curleft -= buttonwidth;
			this.minbutton.move(curleft, top, buttonwidth, buttonheight);
			if (display_as_minimize) {
				this.normalbutton.move(curleft, top, buttonwidth, buttonheight);
			}

			var curright = curleft;
			curleft = iconleftgap;

			var iconElem = this._icon_elem;
			var iconwidth = this._iconwidth;
			var iconheight = this._iconheight;
			top = ((height - iconheight) / 2) | 0;

			var new_left = this._convertLeftForRtlLayout(curleft, iconwidth);

			iconElem.setElementPosition(new_left, top);
			iconElem.setElementSize(iconwidth, iconheight);

			curleft += iconwidth;
			curleft += iconrightgap;
			var textwidth = (curright - curleft);
			if (textwidth < 0) {
				textwidth = 0;
			}
			var textheight = itemsize;
			top = ((height - textheight) / 2) | 0;

			new_left = this._convertLeftForRtlLayout(curleft, textwidth);

			this._text_elem.setElementPosition(new_left, top);
			this._text_elem.setElementSize(textwidth, textheight);
		}
		else {
			var itemsize = 24;
			var left = ((width - buttonwidth) / 2) | 0;
			if (left < 0) {
				left = 0;
			}

			var curtop = height - (rightgap);
			curtop -= buttonwidth;
			this.closebutton.move(left, curtop, buttonwidth, buttonheight);

			curtop -= buttongap;
			curtop -= buttonwidth;
			this.maxbutton.move(left, curtop, buttonwidth, buttonheight);
			if (!display_as_minimize) {
				this.normalbutton.move(left, curtop, buttonwidth, buttonheight);
			}

			curtop -= buttongap;
			curtop -= buttonwidth;
			this.minbutton.move(left, curtop, buttonwidth, buttonheight);
			if (display_as_minimize) {
				this.normalbutton.move(left, curtop, buttonwidth, buttonheight);
			}

			var curbottom = curtop;
			curtop = iconleftgap;

			var iconElem = this._icon_elem;
			var iconwidth = this._iconwidth;
			var iconheight = this._iconheight;
			left = ((width - iconwidth) / 2) | 0;

			var new_left = this._convertLeftForRtlLayout(left, iconwidth);

			iconElem.setElementPosition(new_left, curtop);
			iconElem.setElementSize(iconwidth, iconheight);

			curtop += iconwidth;
			curtop += iconrightgap;
			var textwidth = (curbottom - curtop);
			if (textwidth < 0) {
				textwidth = 0;
			}
			var textheight = itemsize;
			left = ((width - textheight) / 2) | 0;

			new_left = this._convertLeftForRtlLayout(left, textwidth);

			this._text_elem.setElementPosition(new_left, curtop);
			this._text_elem.setElementSize(textwidth, textheight);
		}
	};

	_pTitleBar._change_state_OpenStatus = function (cur) {
		var pre = this._prestate_openstatus = this._state_openstatus;
		this._state_openstatus = cur;
		if (this._is_verticalmin) {
			cur = 2;
		}

		if (pre != cur) {
			switch (cur) {
				case 0:
					if ((this._absolute_style & 0x0001) == 0) {
						this.minbutton.set_visible(true);
					}
					if ((this._absolute_style & 0x0002) == 0) {
						this.maxbutton.set_visible(true);
					}
					if ((this._absolute_style & 0x0008) == 0) {
						this.closebutton.set_visible(true);
					}
					this.normalbutton.set_visible(false);
					break;
				case 1:
					break;
				case 2:
					this.minbutton.set_visible(false);
					if ((this._absolute_style & 0x0002) == 0) {
						this.maxbutton.set_visible(true);
					}
					if ((this._absolute_style & 0x0008) == 0) {
						this.closebutton.set_visible(true);
					}
					if ((this._absolute_style & 0x0004) == 0) {
						this.normalbutton.set_visible(true);
					}
					break;
				case 3:
					if ((this._absolute_style & 0x0001) == 0) {
						this.minbutton.set_visible(true);
					}
					this.maxbutton.set_visible(false);
					if ((this._absolute_style & 0x0008) == 0) {
						this.closebutton.set_visible(true);
					}
					if ((this._absolute_style & 0x0004) == 0) {
						this.normalbutton.set_visible(true);
					}
					break;
			}

			var control_elem = this.getElement();
			if (control_elem) {
				this.on_change_containerRect(control_elem.client_width, control_elem.client_height);
			}
		}
	};

	_pTitleBar._setVerticalMin = function (v) {
		if (this._is_verticalmin == v) {
			return;
		}

		var pre = -1;
		if (v == false) {
			pre = 2;
		}

		this._is_verticalmin = v;

		var real_openstatus = this._state_openstatus;
		if (pre != (-1)) {
			this._state_openstatus = pre;
		}

		this._change_state_OpenStatus(real_openstatus);
		if (this._control_element) {
			this._updateControlPosition();
		}
	};

	_pTitleBar._setDragMove = function (v, is_windowframe) {
		if (v && is_windowframe) {
			this._hittest_type = "caption";
		}
		else {
			this._hittest_type = "none";
		}

		if (this._control_element) {
			this._control_element.setElementHittestType(this._hittest_type);
		}
	};

	_pTitleBar._setAbsoluteStyle = function (_add, _remove, _apply) {
		this._absolute_style &= ~(_remove);
		this._absolute_style |= _add;

		if (_apply == undefined || _apply == true) {
			this._applyAbsoluteStyle();
		}
	};

	_pTitleBar.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		if (this.minbutton && !((this._absolute_style & 0x0010) > 0)) {
			this.minbutton._setEnable(v);
		}
	};

	_pTitleBar._applyAbsoluteStyle = function () {
		if (this.minbutton) {
			if ((this._absolute_style & 0x0001) > 0) {
				this.minbutton.set_visible(false);
			}
			else if ((this._absolute_style & 0x0100) > 0) {
				this.minbutton.set_visible(true);
			}
			if ((this._absolute_style & 0x0010) > 0) {
				this.minbutton.set_enable(false);
			}
			else if ((this._absolute_style & 0x1000) > 0) {
				this.minbutton.set_enable(true);
			}
		}

		if (this.maxbutton) {
			if ((this._absolute_style & 0x0002) > 0) {
				this.maxbutton.set_visible(false);
			}
			else if ((this._absolute_style & 0x0200) > 0) {
				this.maxbutton.set_visible(true);
			}
			if ((this._absolute_style & 0x0020) > 0) {
				this.maxbutton.set_enable(false);
			}
			else if ((this._absolute_style & 0x2000) > 0) {
				this.maxbutton.set_enable(true);
			}
		}

		if (this.normalbutton) {
			if ((this._absolute_style & 0x0004) > 0) {
				this.normalbutton.set_visible(false);
			}
			else if ((this._absolute_style & 0x0400) > 0) {
				this.normalbutton.set_visible(true);
			}
			if ((this._absolute_style & 0x0040) > 0) {
				this.normalbutton.set_enable(false);
			}
			else if ((this._absolute_style & 0x4000) > 0) {
				this.normalbutton.set_enable(true);
			}
		}

		if (this.closebutton) {
			if ((this._absolute_style & 0x0008) > 0) {
				this.closebutton.set_visible(false);
			}
			else if ((this._absolute_style & 0x08) > 0) {
				this.closebutton.set_visible(true);
			}
			if ((this._absolute_style & 0x0080) > 0) {
				this.closebutton.set_enable(false);
			}
			else if ((this._absolute_style & 0x8000) > 0) {
				this.closebutton.set_enable(true);
			}
		}
	};

	_pTitleBar.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var _rtldirection = this._rtldirection;

		var control_element = this._control_element;
		if (control_element) {
			this._updateControlPosition(control_element.client_width, control_element.client_height);

			var pseudo = this._pseudo;
			var align = this.on_find_CurrentStyle_align(pseudo);
			this.on_apply_style_align(align);
		}

		if (this.minbutton) {
			this.minbutton._setRtlDirection(_rtldirection);
		}
		if (this.maxbutton) {
			this.maxbutton._setRtlDirection(_rtldirection);
		}
		if (this.normalbutton) {
			this.normalbutton._setRtlDirection(_rtldirection);
		}
		if (this.closebutton) {
			this.closebutton._setRtlDirection(_rtldirection);
		}
	};

	_pTitleBar.on_apply_custom_class = function () {
		if (this.minbutton) {
			this.minbutton.on_apply_prop_class();
		}
		if (this.maxbutton) {
			this.maxbutton.on_apply_prop_class();
		}
		if (this.normalbutton) {
			this.normalbutton.on_apply_prop_class();
		}
		if (this.closebutton) {
			this.closebutton.on_apply_prop_class();
		}
	};
	delete _pTitleBar;


	nexacro.TitleBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.TitleBar.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pTitleBarCtrl = nexacro._createPrototype(nexacro.TitleBar, nexacro.TitleBarCtrl);
	nexacro.TitleBarCtrl.prototype = _pTitleBarCtrl;

	_pTitleBarCtrl._type_name = "TitleBarControl";

	nexacro._setForTypedControlStyleFinder(_pTitleBarCtrl);

	delete _pTitleBarCtrl;
}


