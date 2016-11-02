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

if (!nexacro.StatusBar) {
	nexacro.StatusBar_Style = function (target) {
		this._target = target || null;
		this.gripimage = null;
		this.progressbarheight = null;
		this.progressbarwidth = null;
		this.progressbargab = null;
		this.progressbargap = null;
		this.zoomcomboheight = null;
		this.zoomcombowidth = null;
		this.zoomcombogab = null;
		this.zoomcombogap = null;
	};

	var _pStatusBarStyle = nexacro._createPrototype(nexacro.Style, nexacro.StatusBar_Style);
	nexacro.StatusBar_Style.prototype = _pStatusBarStyle;

	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "gripimage"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "progressbarheight"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "progressbarwidth"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "progressbargab"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "progressbargap"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "zoomcomboheight"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "zoomcombowidth"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "zoomcombogab"));
	eval(nexacro._createValueAttributeEvalStr("_pStatusBarStyle", "zoomcombogap"));

	_pStatusBarStyle.__custom_emptyObject = function () {
		this.gripimage = null;
		this.progressbarheight = null;
		this.progressbarwidth = null;
		this.progressbargab = null;
		this.progressbargap = null;
		this.zoomcomboheight = null;
		this.zoomcombowidth = null;
		this.zoomcombogab = null;
		this.zoomcombogap = null;
	};

	_pStatusBarStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.gripimage && !this.gripimage._is_empty) {
			val += "gripimage:" + this.gripimage._value + "; ";
		}
		if (this.progressbarheight && !this.progressbarheight._is_empty) {
			val += "progressbarheight:" + this.progressbarheight._value + "; ";
		}
		if (this.progressbarwidth && !this.progressbarwidth._is_empty) {
			val += "progressbarwidth:" + this.progressbarwidth._value + "; ";
		}
		if (this.progressbargab && !this.progressbargab._is_empty) {
			val += "progressbargab:" + this.progressbargab._value + "; ";
		}
		if (this.progressbargap && !this.progressbargap._is_empty) {
			val += "progressbargap:" + this.progressbargap._value + "; ";
		}
		if (this.zoomcomboheight && !this.zoomcomboheight._is_empty) {
			val += "zoomcomboheight:" + this.zoomcomboheight._value + "; ";
		}
		if (this.zoomcombowidth && !this.zoomcombowidth._is_empty) {
			val += "zoomcombowidth:" + this.zoomcombowidth._value + "; ";
		}
		if (this.zoomcombogab && !this.zoomcombogab._is_empty) {
			val += "zoomcombogab:" + this.zoomcombogab._value + "; ";
		}
		if (this.zoomcombogap && !this.zoomcombogap._is_empty) {
			val += "zoomcombogap:" + this.zoomcombogap._value + "; ";
		}
		return val;
	};

	nexacro.StatusBar_CurrentStyle = function () {
		this.gripimage = null;
		this.progressbarheight = null;
		this.progressbarwidth = null;
		this.progressbargab = null;
		this.progressbargap = null;
		this.zoomcomboheight = null;
		this.zoomcombowidth = null;
		this.zoomcombogab = null;
		this.zoomcombogap = null;
	};

	var _pStatusBarCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.StatusBar_CurrentStyle);
	nexacro.StatusBar_CurrentStyle.prototype = _pStatusBarCurrentStyle;

	_pStatusBarCurrentStyle.__custom_emptyObject = _pStatusBarStyle.__custom_emptyObject;
	_pStatusBarCurrentStyle.__get_custom_style_value = _pStatusBarStyle.__get_custom_style_value;

	delete _pStatusBarStyle;
	delete _pStatusBarCurrentStyle;

	nexacro.StatusBar = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent);


		this.progressbar = null;
		this.zoomcombo = null;
		this.showzoomcombo = false;

		this._is_nc_control = true;
		this._text_elem = null;
		this._gripimage_elem = null;
		this._gripimage_size = {
		};
		this._statustext = "";
		this._resizable = false;
		this._is_scrollable = false;
	};

	var _pStatusBar = nexacro._createPrototype(nexacro.Form, nexacro.StatusBar);
	nexacro.StatusBar.prototype = _pStatusBar;

	_pStatusBar._type_name = "StatusBar";

	nexacro.StatusBar._default_align = nexacro.Component._default_left_align;
	nexacro.StatusBar._default_gripimage = "";
	nexacro.StatusBar._default_progressbarwidth = new nexacro.Style_value("200");
	nexacro.StatusBar._default_progressbarheight = new nexacro.Style_value("20");
	nexacro.StatusBar._default_progressbargab = new nexacro.Style_value("1");
	nexacro.StatusBar._default_progressbargap = new nexacro.Style_value("1");
	nexacro.StatusBar._default_zoomcombowidth = new nexacro.Style_value("70");
	nexacro.StatusBar._default_zoomcomboheight = new nexacro.Style_value("20");
	nexacro.StatusBar._default_zoomcombogap = new nexacro.Style_value("1");
	nexacro.StatusBar._default_zoomcombogab = nexacro.StatusBar._default_zoomcombogap;

	_pStatusBar.on_create_custom_style = function () {
		return new nexacro.StatusBar_Style(this);
	};

	_pStatusBar.on_create_custom_currentStyle = function () {
		return new nexacro.StatusBar_CurrentStyle();
	};

	_pStatusBar.on_apply_custom_pseudo = function (pseudo) {
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

		var gripimage = this.on_find_CurrentStyle_gripimage(pseudo);
		if (gripimage != curstyle.gripimage) {
			curstyle.gripimage = gripimage;
			this.on_apply_style_gripimage(gripimage);
		}
	};

	_pStatusBar.on_find_CurrentStyle_gripimage = function (pseudo) {
		var gripimage = this._find_pseudo_obj("gripimage", pseudo, "value");
		return gripimage ? gripimage : nexacro.StatusBar._default_gripimage;
	};

	_pStatusBar.on_find_CurrentStyle_progressbarwidth = function (pseudo) {
		return this._find_pseudo_obj("progressbarwidth", pseudo, "value") || nexacro.StatusBar._default_progressbarwidth;
	};

	_pStatusBar.on_find_CurrentStyle_progressbarheight = function (pseudo) {
		return this._find_pseudo_obj("progressbarheight", pseudo, "value") || nexacro.StatusBar._default_progressbarheight;
	};

	_pStatusBar.on_find_CurrentStyle_progressbargab = function (pseudo) {
		return this._find_pseudo_obj("progressbargab", pseudo, "value") || nexacro.StatusBar._default_progressbargab;
	};

	_pStatusBar.on_find_CurrentStyle_progressbargap = function (pseudo) {
		return this._find_pseudo_obj("progressbargap", pseudo, "value") || nexacro.StatusBar._default_progressbargap;
	};

	_pStatusBar.on_find_CurrentStyle_zoomcombowidth = function (pseudo) {
		return this._find_pseudo_obj("zoomcombowidth", pseudo, "value") || nexacro.StatusBar._default_zoomcombowidth;
	};

	_pStatusBar.on_find_CurrentStyle_zoomcomboheight = function (pseudo) {
		return this._find_pseudo_obj("zoomcomboheight", pseudo, "value") || nexacro.StatusBar._default_zoomcomboheight;
	};

	_pStatusBar.on_find_CurrentStyle_zoomcombogab = function (pseudo) {
		return this._find_pseudo_obj("zoomcombogab", pseudo, "value") || nexacro.StatusBar._default_zoomcombogab;
	};

	_pStatusBar.on_find_CurrentStyle_zoomcombogap = function (pseudo) {
		return this._find_pseudo_obj("zoomcombogap", pseudo, "value") || nexacro.StatusBar._default_zoomcombogap;
	};

	_pStatusBar.on_update_style_gripimage = function () {
		this.on_apply_style_gripimage(this.currentstyle.gripimage = this.on_find_CurrentStyle_gripimage(this._pseudo));
	};

	_pStatusBar.on_update_style_progressbarwidth = function () {
		this.on_apply_style_progressbarwidth(this.currentstyle.progressbarwidth = this.on_find_CurrentStyle_progressbarwidth(this._pseudo));
	};

	_pStatusBar.on_update_style_progressbarheight = function () {
		this.on_apply_style_progressbarheight(this.currentstyle.progressbarheight = this.on_find_CurrentStyle_progressbarheight(this._pseudo));
	};

	_pStatusBar.on_update_style_progressbargab = function () {
		this.on_apply_style_progressbargab(this.currentstyle.progressbargab = this.on_find_CurrentStyle_progressbargab(this._pseudo));
	};

	_pStatusBar.on_update_style_progressbargap = function () {
		this.on_apply_style_progressbargap(this.currentstyle.progressbargap = this.on_find_CurrentStyle_progressbargap(this._pseudo));
	};

	_pStatusBar.on_update_style_zoomcombowidth = function () {
		this.on_apply_style_zoomcombowidth(this.currentstyle.zoomcombowidth = this.on_find_CurrentStyle_zoomcombowidth(this._pseudo));
	};

	_pStatusBar.on_update_style_zoomcomboheight = function () {
		this.on_apply_style_zoomcomboheight(this.currentstyle.zoomcomboheight = this.on_find_CurrentStyle_zoomcomboheight(this._pseudo));
	};

	_pStatusBar.on_update_style_zoomcombogab = function () {
		this.on_apply_style_zoomcombogab(this.currentstyle.zoomcombogab = this.on_find_CurrentStyle_zoomcombogab(this._pseudo));
	};

	_pStatusBar.on_update_style_zoomcombogap = function () {
		this.on_apply_style_zoomcombogap(this.currentstyle.zoomcombogap = this.on_find_CurrentStyle_zoomcombogap(this._pseudo));
	};

	_pStatusBar.on_apply_style_gripimage = function (_gripimage_elem) {
		if (this.gripimage == null && this._gripimage_elem) {
			this._gripimage_elem.setElementImageUrl(_gripimage_elem.value);
		}
	};

	_pStatusBar.on_apply_style_progressbarwidth = function (v) {
		if (this.progressbar && this.progressbar.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_progressbarheight = function (v) {
		if (this.progressbar && this.progressbar.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_progressbargab = function (v) {
		if (this.progressbar && this.progressbar.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_progressbargap = function (v) {
		if (this.progressbar && this.progressbar.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_zoomcombowidth = function (v) {
		if (this.zoomcombo && this.zoomcombo.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_zoomcomboheight = function (v) {
		if (this.zoomcombo && this.zoomcombo.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_zoomcombogab = function (v) {
		if (this.zoomcombo && this.zoomcombo.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_zoomcombogap = function (v) {
		if (this.zoomcombo && this.zoomcombo.visible && this._is_created) {
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};

	_pStatusBar.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
		}
	};
	_pStatusBar.on_apply_style_color = function (color) {
		if (this._text_elem) {
			this._text_elem.setElementColor(color);
		}
	};

	_pStatusBar.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;

			var textElem = this._text_elem = new nexacro.TextBoxElement(control_elem);

			if (this._statustext) {
				textElem.setElementText(this._statustext);
			}
			textElem.setElementAlign(curstyle.align ? curstyle.align : nexacro.StatusBar._default_align);
			textElem.setElementFont(curstyle.font);
			textElem.setElementColor(curstyle.color);
			textElem.setElementLetterSpace(curstyle.letterspace);

			var progressbar = this.progressbar = new nexacro.ProgressBarCtrl("progressbar", "absolute", 0, 0, 0, 0, null, null, this);
			var zoomcombo = this.zoomcombo = new nexacro.ComboCtrl("zoomcombo", "absolute", 0, 0, 0, 0, null, null, this);
			if (zoomcombo) {
				var dszoomlist = new nexacro.Dataset("dszoomlist", zoomcombo);
				dszoomlist.addColumn("code", "int", "10");
				dszoomlist.addColumn("data", "string", "255");
				var nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "50");
				dszoomlist.setColumn(nRow, "data", "50%");
				nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "75");
				dszoomlist.setColumn(nRow, "data", "75%");
				nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "100");
				dszoomlist.setColumn(nRow, "data", "100%");
				nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "125");
				dszoomlist.setColumn(nRow, "data", "125%");
				nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "150");
				dszoomlist.setColumn(nRow, "data", "150%");
				nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "200");
				dszoomlist.setColumn(nRow, "data", "200%");
				nRow = dszoomlist.addRow();
				dszoomlist.setColumn(nRow, "code", "400");
				dszoomlist.setColumn(nRow, "data", "400%");

				zoomcombo.setInnerDataset(dszoomlist);
				zoomcombo.set_codecolumn("code");
				zoomcombo.set_datacolumn("data");
			}

			var gripimageElem = this._gripimage_elem = new nexacro.AlignImageElement(control_elem);
			gripimageElem.setElementAlignXY("right", "bottom");
			var sGripimage = curstyle.gripimage.value;
			gripimageElem.setElementImageUrl(sGripimage ? sGripimage : this._default_gripimage);

			var ownerframe = this.getOwnerFrame();
			if (ownerframe) {
				zoomcombo._setEventHandler("onitemchanged", this.on_zoomcombo_itemchanged, this);
			}

			progressbar.createComponent();
			if (zoomcombo) {
				zoomcombo.createComponent();
			}

			this._updateControlPosition(this._client_width, this._client_height);
		}
	};
	_pStatusBar.on_created_contents = function () {
		this._text_elem.create();
		this.progressbar.on_created();
		if (this.zoomcombo) {
			this.zoomcombo.on_created();
		}
		this._gripimage_elem.create();
		this._setResizable(this._resizable);
	};

	_pStatusBar.on_destroy_contents = function () {
		var textElem = this._text_elem;
		var progressbar = this.progressbar;
		var zoomcombo = this.zoomcombo;
		var gripimageElem = this._gripimage_elem;

		if (textElem) {
			textElem.destroy();
			this._text_elem = null;
		}
		if (progressbar) {
			progressbar.destroy();
			this.progressbar = null;
		}
		if (zoomcombo) {
			zoomcombo.destroy();
			this.zoomcombo = null;
		}
		if (gripimageElem) {
			gripimageElem.destroy();
			this.gripimageElem = null;
		}
	};

	_pStatusBar.on_zoomcombo_itemchanged = function (obj, e) {
		var zoomcombo = this.zoomcombo;
		if (zoomcombo) {
			var _value = zoomcombo.value;
			this._allFrameSetZoom(application.mainframe, _value);
		}
	};

	_pStatusBar.on_change_containerRect = function (width, height) {
		this._updateControlPosition(width, height);
	};

	_pStatusBar.set_statustext = function (v) {
		this._statustext = v;
		if (this._text_elem) {
			this._text_elem.setElementText(v);
		}
	};

	_pStatusBar.set_gripimage = function (v) {
		this.gripimage = v;
		if (this._gripimage_elem) {
			if (!v) {
				this.currentstyle.gripimage._value = v;
			}
			this._gripimage_elem.setElementImageUrl(v);
		}
	};

	_pStatusBar.set_showzoomcombo = function (v) {
		if (this.showzoomcombo != v) {
			this.showzoomcombo = v;
			this._updateControlPosition(this._client_width, this._client_height);
		}
	};


	_pStatusBar._refreshZoomCombo = function (form) {
		if (!form) {
			form = application.getActiveForm();
		}
		if (form) {
			var value = form.getZoom();
			var zoomcombo = this.zoomcombo;
			if (zoomcombo) {
				zoomcombo.set_value(value);
			}
		}
	};

	_pStatusBar._setResizable = function (resizable) {
		var ownerframe = this.getOwnerFrame();
		if (ownerframe && this._gripimage_elem) {
			if (!this._gripimage_elem._handle) {
				this._resizable = resizable;
				return;
			}

			this._gripimage_elem._is_track = resizable;
			var cursor;
			if (resizable) {
				cursor = new nexacro.Style_value("se-resize");
			}
			else {
				cursor = new nexacro.Style_value("arrow");
			}

			if (resizable && ownerframe._is_window) {
				hittest_type = "resizingborder_bottomright";
			}
			else {
				hittest_type = undefined;
			}

			nexacro.ControlElementBase.prototype.setElementCursor.call(this._gripimage_elem, cursor);
			nexacro.ControlElementBase.prototype.setElementHittestType.call(this._gripimage_elem, hittest_type);

			if (this._gripimage_elem._on_starttrack == undefined) {
				this._gripimage_elem._on_starttrack = function () {
					ownerframe._on_border_starttrack(cursor);
				};
				this._gripimage_elem._on_endtrack = function (x, y, dragdata) {
					ownerframe._on_border_endtrack(x, y, dragdata);
				};
				this._gripimage_elem._on_movetrack = function (x, y, dragdata) {
					ownerframe._on_border_movetrack(x, y, dragdata);
				};
			}
		}
	};

	_pStatusBar._allFrameSetZoom = function (frame, zoom_val) {
		if (frame) {
			if (frame instanceof nexacro.MainFrame || 
				frame instanceof nexacro.FrameSetBase) {
				var all = frame.all;
				var len = (all) ? all.length : 0;

				for (var i = 0; i < len; i++) {
					this._allFrameSetZoom(all[i], zoom_val);
				}
			}
			else if (frame instanceof nexacro.ChildFrame) {
				frame.form.setZoom(zoom_val);
			}
		}
	};
	_pStatusBar._updateControlPosition = function (width, height) {
		var itemsize = 20;
		var top = ((height - itemsize) / 2) | 0;
		if (top < 0) {
			top = 0;
		}

		var left = 5;
		var text_width = width;
		if (text_width < 0) {
			text_width = 0;
		}

		var textElem = this._text_elem;
		textElem.setElementPosition(left, top);
		textElem.setElementSize(text_width, height - top - top);

		var gripElem = this._gripimage_elem;
		left = width - itemsize;
		gripElem.setElementPosition(left, 0);
		gripElem.setElementSize(itemsize, height);

		var zoomcombo_left = left;
		if (this.zoomcombo) {
			if (this.showzoomcombo && this._movezoomcombo) {
				zoomcombo_left = this._movezoomcombo(left, top, width, height);
				this.zoomcombo.set_visible("true");
			}
			else {
				this.zoomcombo.move(left, top, 0, 0);
				this.zoomcombo.set_visible("false");
			}
		}

		var curstyle = this.currentstyle;
		var progressbarwidth = this.on_find_CurrentStyle_progressbarwidth(this._pseudo);
		var progressbarheight = this.on_find_CurrentStyle_progressbarheight(this._pseudo);
		var progressbargap = this.on_find_CurrentStyle_progressbargap(this._pseudo);

		left = zoomcombo_left - progressbarwidth - progressbargap;
		if (left < 0) {
			left = 0;
			progressbarwidth = (zoomcombo_left - progressbargap);
		}
		top = ((height - progressbarheight) / 2) | 0;
		if (top < 0) {
			top = 0;
		}
		if ((top + progressbarheight) < height) {
			progressbarheight = height - top;
		}
		this.progressbar.move(left, top, progressbarwidth, progressbarheight);
	};

	delete _pStatusBar;

	nexacro.StatusBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StatusBar.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pStatusBarCtrl = nexacro._createPrototype(nexacro.StatusBar, nexacro.StatusBarCtrl);
	nexacro.StatusBarCtrl.prototype = _pStatusBarCtrl;

	_pStatusBarCtrl._type_name = "StatusBarControl";

	nexacro._setForTypedControlStyleFinder(_pStatusBarCtrl);

	delete _pStatusBarCtrl;
}

