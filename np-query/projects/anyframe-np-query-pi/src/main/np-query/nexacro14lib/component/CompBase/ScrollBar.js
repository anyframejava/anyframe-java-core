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

if (!nexacro.ScrollBar) {
	nexacro.ScrollBar_Style = function (target) {
		nexacro.Style.call(this, target);

		this.barminsize = null;
		this.baroutsize = null;
		this.incbtnsize = null;
		this.decbtnsize = null;
		this.imgoutsize = null;
		this.scrollbarsize = null;
		this.trackbarsize = null;
	};

	var _pScrollBarStyle = nexacro._createPrototype(nexacro.Style, nexacro.ScrollBar_Style);
	nexacro.ScrollBar_Style.prototype = _pScrollBarStyle;

	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "barminsize"));
	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "baroutsize"));
	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "incbtnsize"));
	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "decbtnsize"));
	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "imgoutsize"));
	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "scrollbarsize"));
	eval(nexacro._createValueAttributeEvalStr("_pScrollBarStyle", "trackbarsize"));

	_pScrollBarStyle.__custom_emptyObject = function () {
		this.barminsize = null;
		this.baroutsize = null;
		this.incbtnsize = null;
		this.decbtnsize = null;
		this.imgoutsize = null;
		this.scrollbarsize = null;
		this.trackbarsize = null;
	};
	_pScrollBarStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.barminsize && !this.barminsize._isEmpty) {
			val += "barminsize:" + this.barminsize._value + "; ";
		}
		if (this.baroutsize && !this.baroutsize._isEmpty) {
			val += "baroutsize:" + this.baroutsize._value + "; ";
		}
		if (this.incbtnsize && !this.incbtnsize._isEmpty) {
			val += "incbtnsize:" + this.incbtnsize._value + "; ";
		}
		if (this.decbtnsize && !this.decbtnsize._isEmpty) {
			val += "decbtnsize:" + this.decbtnsize._value + "; ";
		}
		if (this.imgoutsize && !this.imgoutsize._isEmpty) {
			val += "imgoutsize:" + this.imgoutsize._value + "; ";
		}
		if (this.scrollbarsize && !this.scrollbarsize._isEmpty) {
			val += "scrollbarsize:" + this.scrollbarsize._value + "; ";
		}
		if (this.trackbarsize && !this.trackbarsize._isEmpty) {
			val += "trackbarsize:" + this.trackbarsize._value + "; ";
		}
		return val;
	};

	nexacro.ScrollBar_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.barminsize = null;
		this.baroutsize = null;
		this.incbtnsize = null;
		this.decbtnsize = null;
		this.imgoutsize = null;
		this.scrollbarsize = null;
		this.trackbarsize = null;
	};

	var _pScrollBarCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ScrollBar_CurrentStyle);
	nexacro.ScrollBar_CurrentStyle.prototype = _pScrollBarCurrentStyle;

	_pScrollBarCurrentStyle.__custom_emptyObject = _pScrollBarStyle.__custom_emptyObject;
	_pScrollBarCurrentStyle.__get_custom_style_value = _pScrollBarStyle.__get_custom_style_value;

	delete _pScrollBarStyle;
	delete _pScrollBarCurrentStyle;


	nexacro.ScrollBar = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.incbutton = null;
		this.decbutton = null;
		this.trackbar = null;
		this.barminsize = -1;
		this.baroutsize = -1;
		this.decbtnsize = -1;
		this.imgoutsize = -1;
		this.incbtnsize = -1;
		this.scrollbarsize = -1;
		this.trackbarsize = -1;
		this.direction = "vert";
		this.line = 1;
		this.page = 3;
		this.view = -1;
		this.max = 0;
		this.min = 0;
		this.pos = 0;
		this.onscroll = null;


		this._event_list = {
			"onclick" : 1, 
			"ondblclick" : 1, 
			"onkillfocus" : 1, 
			"onsetfocus" : 1, 
			"onkeypress" : 1, 
			"onkeydown" : 1, 
			"onkeyup" : 1, 
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmousewheel" : 1, 
			"ondrag" : 1, 
			"ondragenter" : 1, 
			"ondragleave" : 1, 
			"ondragmove" : 1, 
			"ondrop" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"ongesture" : 1, 
			"onscroll" : 1
		};


		this._rectShaft = new nexacro.Rect();
		this._mousePoint = {
		};
		this._max = 0;
		this._min = 0;
		this._orgmax = 0;
		this._trackbarsize = -1;
		this._pos = 0;
		this._lineup = 1;
		this._linedown = 1;
		this._pageup = 3;
		this._pagedown = 3;
		this._nTrackOver = 0;
		this._is_repeat = true;
		this._start_page_navi = null;
		this._is_tracking = false;
		this._reset_trackbar_fix = false;
		this._set_real = false;
		this._is_nc_control = true;
	};

	nexacro.ScrollBar.TRACKBAR_SIZE_MIN = 6;
	nexacro.ScrollBar.TRACKFIRSTOVER = 1;
	nexacro.ScrollBar.TRACKLASTOVER = 2;

	var _pScrollBar = nexacro._createPrototype(nexacro.Component, nexacro.ScrollBar);
	nexacro.ScrollBar.prototype = _pScrollBar;

	_pScrollBar._type_name = "ScrollBar";


	_pScrollBar.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;
		var style = this.on_find_CurrentStyle_barminsize(pseudo);
		if (style != curstyle.barminsize) {
			curstyle.barminsize = style;
			this.on_apply_style_barminsize();
		}
		style = this.on_find_CurrentStyle_baroutsize(pseudo);
		if (style != curstyle.baroutsize) {
			curstyle.baroutsize = style;
			this.on_apply_style_baroutsize();
		}
		style = this.on_find_CurrentStyle_decbtnsize(pseudo);
		if (style != curstyle.decbtnsize) {
			curstyle.decbtnsize = style;
			this.on_apply_style_decbtnsize();
		}
		style = this.on_find_CurrentStyle_imgoutsize(pseudo);
		if (style != curstyle.imgoutsize) {
			curstyle.imgoutsize = style;
			this.on_apply_style_imgoutsize();
		}
		style = this.on_find_CurrentStyle_incbtnsize(pseudo);
		if (style != curstyle.incbtnsize) {
			curstyle.incbtnsize = style;
			this.on_apply_style_incbtnsize();
		}
		style = this.on_find_CurrentStyle_scrollbarsize(pseudo);
		if (style != curstyle.scrollbarsize) {
			curstyle.scrollbarsize = style;
			this.on_apply_style_scrollbarsize();
		}
		style = this.on_find_CurrentStyle_trackbarsize(pseudo);
		if (style != curstyle.trackbarsize) {
			curstyle.trackbarsize = style;
			this.on_apply_style_trackbarsize();
		}

		if (this.incbutton) {
			this.incbutton._control_pseudo = "";
			this.incbutton._contents_pseudo = "";
			this.incbutton.on_apply_pseudo(pseudo);
		}
		if (this.decbutton) {
			this.decbutton._control_pseudo = "";
			this.decbutton._contents_pseudo = "";
			this.decbutton.on_apply_pseudo(pseudo);
		}
		if (this.trackbar) {
			this.trackbar._control_pseudo = "";
			this.trackbar._contents_pseudo = "";
			this.trackbar.on_apply_pseudo(pseudo);
		}
	};

	_pScrollBar.on_apply_prop_class = function () {
		if (this.incbutton) {
			this.incbutton._css_finder = null;
			this.incbutton._ref_css_finder = null;
		}
		if (this.decbutton) {
			this.decbutton._css_finder = null;
			this.decbutton._ref_css_finder = null;
		}
		if (this.trackbar) {
			this.trackbar._css_finder = null;
			this.trackbar._ref_css_finder = null;
		}
		nexacro.Component.prototype.on_apply_prop_class.call(this);
	};

	_pScrollBar.on_create_custom_style = function () {
		return new nexacro.ScrollBar_Style(this);
	};
	_pScrollBar.on_create_custom_currentStyle = function () {
		return new nexacro.ScrollBar_CurrentStyle();
	};

	_pScrollBar.on_find_CurrentStyle_barminsize = function (pseudo) {
		return this._find_pseudo_obj("barminsize", pseudo);
	};
	_pScrollBar.on_find_CurrentStyle_baroutsize = function (pseudo) {
		return this._find_pseudo_obj("baroutsize", pseudo);
	};
	_pScrollBar.on_find_CurrentStyle_decbtnsize = function (pseudo) {
		return this._find_pseudo_obj("decbtnsize", pseudo);
	};
	_pScrollBar.on_find_CurrentStyle_imgoutsize = function (pseudo) {
		return this._find_pseudo_obj("imgoutsize", pseudo);
	};
	_pScrollBar.on_find_CurrentStyle_incbtnsize = function (pseudo) {
		return this._find_pseudo_obj("incbtnsize", pseudo);
	};
	_pScrollBar.on_find_CurrentStyle_scrollbarsize = function (pseudo) {
		return this._find_pseudo_obj("scrollbarsize", pseudo);
	};
	_pScrollBar.on_find_CurrentStyle_trackbarsize = function (pseudo) {
		return this._find_pseudo_obj("trackbarsize", pseudo);
	};

	_pScrollBar.on_update_style_barminsize = function () {
		this.currentstyle.barminsize = this.on_find_CurrentStyle_barminsize(this._pseudo);
		this.on_apply_style_barminsize();
	};
	_pScrollBar.on_update_style_baroutsize = function () {
		this.currentstyle.baroutsize = this.on_find_CurrentStyle_baroutsize(this._pseudo);
		this.on_apply_style_baroutsize();
	};
	_pScrollBar.on_update_style_decbtnsize = function () {
		this.currentstyle.decbtnsize = this.on_find_CurrentStyle_decbtnsize(this._pseudo);
		this.on_apply_style_decbtnsize();
	};
	_pScrollBar.on_update_style_imgoutsize = function () {
		this.currentstyle.imgoutsize = this.on_find_CurrentStyle_imgoutsize(this._pseudo);
		this.on_apply_style_imgoutsize();
	};
	_pScrollBar.on_update_style_incbtnsize = function () {
		this.currentstyle.incbtnsize = this.on_find_CurrentStyle_incbtnsize(this._pseudo);
		this.on_apply_style_incbtnsize();
	};
	_pScrollBar.on_update_style_scrollbarsize = function () {
		this.currentstyle.scrollbarsize = this.on_find_CurrentStyle_scrollbarsize(this._pseudo);
		this.on_apply_style_scrollbarsize();
	};
	_pScrollBar.on_update_style_trackbarsize = function () {
		this.currentstyle.trackbarsize = this.on_find_CurrentStyle_trackbarsize(this._pseudo);
		this.on_apply_style_trackbarsize();
	};

	_pScrollBar.on_apply_style_barminsize = function () {
		var cur = this.currentstyle.barminsize;
		if (cur && !cur._isEmpty) {
			this.barminsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};
	_pScrollBar.on_apply_style_baroutsize = function () {
		var cur = this.currentstyle.baroutsize;
		if (cur && !cur._isEmpty) {
			this.baroutsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};
	_pScrollBar.on_apply_style_decbtnsize = function () {
		var cur = this.currentstyle.decbtnsize;
		if (cur && !cur._isEmpty) {
			this.decbtnsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};
	_pScrollBar.on_apply_style_imgoutsize = function () {
		var cur = this.currentstyle.imgoutsize;
		if (cur && !cur._isEmpty) {
			this.imgoutsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};
	_pScrollBar.on_apply_style_incbtnsize = function () {
		var cur = this.currentstyle.incbtnsize;
		if (cur && !cur._isEmpty) {
			this.incbtnsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};
	_pScrollBar.on_apply_style_scrollbarsize = function () {
		var cur = this.currentstyle.scrollbarsize;
		if (cur && !cur._isEmpty) {
			this.scrollbarsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};
	_pScrollBar.on_apply_style_trackbarsize = function () {
		var cur = this.currentstyle.trackbarsize;
		if (cur && !cur._isEmpty) {
			this.trackbarsize = ((+cur._value) != (+cur._value)) ? -1 : (parseInt(cur._value) | 0);
		}
	};

	_pScrollBar._get_css_assumedtypename = function () {
		if (!this._is_subcontrol) {
			if (this.direction == "vert") {
				return "VScrollBar";
			}
			else if (this.direction == "horz") {
				return "HScrollBar";
			}
		}
		return this._type_name;
	};

	_pScrollBar.on_create_contents = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			this.incbutton = new nexacro.ImageButtonCtrl("incbutton", "absolute", 0, 0, 0, 0, null, null, this);
			this.decbutton = new nexacro.ImageButtonCtrl("decbutton", "absolute", 0, 0, 0, 0, null, null, this);
			this.trackbar = new nexacro.TrackImageButtonCtrl("trackbar", "absolute", 0, 0, 0, 0, null, null, this);
			this.trackbar._on_starttrack = this._on_starttrack;
			this.trackbar._on_movetrack = this._on_movetrack;
			this.trackbar._on_endtrack = this._on_endtrack;

			this.trackbar._no_slide_scroll = true;

			this.incbutton.createComponent();
			this.decbutton.createComponent();
			this.trackbar.createComponent();
		}
	};

	_pScrollBar.on_created_contents = function () {
		var incbutton = this.incbutton;
		if (incbutton) {
			incbutton.on_created();
		}

		var decbutton = this.decbutton;
		if (decbutton) {
			decbutton.on_created();
		}

		var trackbar = this.trackbar;
		if (trackbar) {
			trackbar.on_created();
		}

		this._recalcLayout();
	};

	_pScrollBar.on_destroy_contents = function () {
		if (this.incbutton) {
			this.incbutton.destroy();
			this.incbutton = null;
		}

		if (this.decbutton) {
			this.decbutton.destroy();
			this.decbutton = null;
		}

		if (this.trackbar) {
			this.trackbar.destroy();
			this.trackbar = null;
		}

		this._rectShaft = null;
		this._mousePoint = null;
	};

	_pScrollBar.on_change_containerRect = function (width, height) {
		this._recalcLayout();
	};

	_pScrollBar._on_repeat = function (fromComp, x, y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		if (!this._is_alive) {
			return;
		}
		var fromObject = fromComp;
		if (fromObject == this.decbutton) {
			var btn = this.decbutton;
			var left = btn._adjust_left;
			var top = btn._adjust_top;
			var width = btn._adjust_width * scale;
			var height = btn._adjust_height * scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_decbutton_lbuttondown(this);
			}
		}
		else if (fromObject == this.incbutton) {
			var btn = this.incbutton;
			var left = btn._adjust_left;
			var top = btn._adjust_top;
			var width = btn._adjust_width * scale;
			var height = btn._adjust_height * scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_incbutton_lbuttondown(this);
			}
		}
		else if (fromObject == this) {
			this.on_page_click(this, x, y);
		}
	};

	_pScrollBar._on_startrepeat = function (fromComp, x, y) {
		var scale = this._getCumulativeZoomFactor() / 100.0;

		if (!this._is_alive) {
			return;
		}
		var fromObject = fromComp;
		if (fromObject == this.decbutton) {
			var btn = this.decbutton;
			var left = btn._adjust_left;
			var top = btn._adjust_top;
			var width = btn._adjust_width * scale;
			var height = btn._adjust_height * scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_decbutton_lbuttondown(this, null);
			}
		}
		else if (fromObject == this.incbutton) {
			var btn = this.incbutton;
			var left = btn._adjust_left;
			var top = btn._adjust_top;
			var width = btn._adjust_width * scale;
			var height = btn._adjust_height * scale;

			if (left <= x && (left + width) >= x && top <= y && (top + height) >= y) {
				this.on_incbutton_lbuttondown(this, null);
			}
		}
		else if (fromObject == this) {
			var btn = this.trackbar;

			var eType = "";
			if (this.direction == "vert") {
				if (y < btn._adjust_top) {
					eType = "pageup";
				}
				else if (y > (btn._adjust_top + btn._adjust_height)) {
					eType = "pagedown";
				}
				else {
					eType = "";
				}
			}
			else {
				if (x < btn._adjust_left) {
					eType = "pageleft";
				}
				else if (x > (btn._adjust_left + btn._adjust_width)) {
					eType = "pageright";
				}
				else {
					eType = "";
				}
			}
			this._start_page_navi = eType;
			this.on_page_click(this, x, y);
		}
	};



	_pScrollBar.set_barminsize = function (v) {
		if (this.barminsize != v) {
			this.barminsize = v;
		}
	};

	_pScrollBar.set_baroutsize = function (v) {
		if (this.baroutsize != v) {
			this.baroutsize = v;
		}
	};

	_pScrollBar.set_decbtnsize = function (v) {
		if (this.decbtnsize != v) {
			this.decbtnsize = v;
		}
	};

	_pScrollBar.set_imgoutsize = function (v) {
		if (this.imgoutsize != v) {
			this.imgoutsize = v;
		}
	};

	_pScrollBar.set_incbtnsize = function (v) {
		if (this.incbtnsize != v) {
			this.incbtnsize = v;
		}
	};

	_pScrollBar.set_scrollbarsize = function (v) {
		if (this.scrollbarsize != v) {
			this.scrollbarsize = v;

			var p_comp = this.parent;
			if (p_comp) {
				var p_control = p_comp._control_element;
				var vscrollbar = p_comp.vscrollbar;
				var hscrollbar = p_comp.hscrollbar;

				var scroll_default_size = nexacro.Component.SCROLLBAR_DEFAULT_SIZE;
				var width = vscrollbar ? (vscrollbar.scrollbarsize == -1 ? scroll_default_size : vscrollbar.scrollbarsize) : scroll_default_size;
				var height = hscrollbar ? (hscrollbar.scrollbarsize == -1 ? scroll_default_size : hscrollbar.scrollbarsize) : scroll_default_size;
				p_control.setElementScrollbarSize(width, height);
				p_comp._updateClientSize(p_control);
			}
		}
	};

	_pScrollBar.set_trackbarsize = function (v) {
		if (this.trackbarsize != v) {
			this.trackbarsize = v;
		}
	};

	_pScrollBar.set_pos = function (v) {
		this._setPos(v);
	};

	_pScrollBar.on_apply_resize = function () {
		this._recalcLayout();
		this.on_fire_onsize(this._adjust_width, this._adjust_height);
	};

	_pScrollBar.on_apply_move = function () {
		this._recalcLayout();
		this.on_fire_onmove(this._adjust_left, this._adjust_top);
	};

	_pScrollBar.on_apply_prop_enable = function (v) {
		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}

		if (this.incbutton) {
			this.incbutton._setEnable(enable);
		}
		if (this.decbutton) {
			this.decbutton._setEnable(enable);
		}
		if (this.trackbar) {
			this.trackbar._setEnable(enable);
		}
	};


	_pScrollBar.on_fire_onscroll = function (nPos, strType, isscrolling, sdir, evtkind) {
		if (this.onscroll && this.onscroll._has_handlers) {
			nPos = (nPos + 0.5) | 0;
			var eventid = (this.direction == "vert") ? "onvscroll" : "onhscroll";
			var evt = new nexacro.ScrollEventInfo(this, eventid, nPos, strType, this, this.parent);
			if (isscrolling !== undefined) {
				evt.touchscrolling = isscrolling;
				evt.touchscrolldir = sdir;
			}
			evt._evtkind = evtkind;
			var ret = this.onscroll._fireEvent(this, evt);
			return ret;
		}
		return true;
	};

	_pScrollBar.on_incbutton_lbuttondown = function (obj) {
		var nMin = this._min;
		var nMax = this._max;
		var nPos = this._pos;
		var nInc = this.line;
		if (nInc == -1) {
			nInc = this._lineup;
		}
		var nNew = nPos + nInc;

		var temp = this._getIncNewPosPixel();
		if (temp !== undefined) {
			nNew = temp;
		}

		if (nPos >= nMax) {
			var posarr = this._scroll_reverse_convert(nMax);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, "lastover");
		}
		else if (nNew >= nMax) {
			var posarr = this._scroll_reverse_convert(nMax);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vert" ? "linedown" : "lineright"));

			this.on_fire_onscroll(this.pos, "last");
		}
		else {
			var posarr = this._scroll_reverse_convert(nNew);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vert" ? "linedown" : "lineright"));
		}
		var rc = this._rectShaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};

	_pScrollBar.on_decbutton_lbuttondown = function (obj) {
		var nMin = this._min;
		var nMax = this._max;
		var nPos = this._pos;
		var nDec = this.line;
		if (nDec == -1) {
			nDec = this._linedown;
		}
		var nNew = nPos - nDec;

		var temp = this._getDecNewPosPixel();
		if (temp !== undefined) {
			nNew = temp;
		}

		if (nPos <= nMin) {
			var posarr = this._scroll_reverse_convert(nMin);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, "firstover");
		}
		else if (nNew <= nMin) {
			var posarr = this._scroll_reverse_convert(nMin);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vert" ? "lineup" : "lineleft"));
			this.on_fire_onscroll(this.pos, "first");
		}
		else {
			var posarr = this._scroll_reverse_convert(nNew);
			this.pos = posarr[0];
			this._pos = posarr[1];
			this.on_fire_onscroll(this.pos, (this.direction == "vert" ? "lineup" : "lineleft"));
		}

		var rc = this._rectShaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};

	_pScrollBar._on_starttrack = function () {
		if (!this._is_alive) {
			return;
		}
		var p = this.parent;
		p._mousePoint = {
			x : 0, 
			y : 0
		};
		nexacro.ScrollBar.prototype._starttrack.call(p);
		p._is_tracking = true;
	};

	_pScrollBar._on_endtrack = function (x, y, dragdata) {
		if (!this._is_alive) {
			return;
		}
		var p = this.parent;
		nexacro.ScrollBar.prototype._endtrack.call(p);
		p._is_tracking = false;
	};


	_pScrollBar._on_movetrack = function (x, y, dragdata) {
		if (!this._is_alive) {
			return;
		}
		var p = this.parent;
		nexacro.ScrollBar.prototype._movetrack.call(p, x, y);
	};


	_pScrollBar.on_page_click = function (obj, nX, nY) {
		var nMin = this._min;
		var nMax = this._max;
		var nPos = this._pos;
		var nPage = this.page;
		var nPageup = this._pageup;
		var nPagedown = this._pagedown;

		if (nPage != -1) {
			nPageup = nPage;
			nPagedown = nPage;
		}

		var trackbar = this.trackbar;
		if (trackbar._adjust_width <= 0 || trackbar._adjust_height <= 0) {
			return;
		}

		var top = trackbar._adjust_top;
		var left = trackbar._adjust_left;
		var right = trackbar._adjust_left + trackbar._adjust_width;
		var bottom = trackbar._adjust_top + trackbar._adjust_height;

		var nNew = nPos, eType;
		var minPos, maxPos;

		if (this.direction == "vert") {
			if (this._start_page_navi == "pageup" && nY < top) {
				nNew = (nPos - nPageup);
				nNew = (nNew < nMin ? nMin : nNew);
				eType = "pageup";
			}
			else if (this._start_page_navi == "pagedown" && nY > bottom) {
				nNew = (nPos + nPagedown);
				nNew = (nNew > nMax ? nMax : nNew);
				eType = "pagedown";
			}
			else {
				eType = "";
			}
		}
		else {
			if (this._start_page_navi == "pageleft" && nX < left) {
				nNew = (nPos - nPageup);
				nNew = (nNew < nMin ? nMin : nNew);
				eType = "pageleft";
			}
			else if (this._start_page_navi == "pageright" && nX > right) {
				nNew = (nPos + nPagedown);
				nNew = (nNew > nMax ? nMax : nNew);
				eType = "pageright";
			}
			else {
				eType = "";
			}
		}

		if (this._pos == nNew) {
			return;
		}

		var posarr = this._scroll_reverse_convert(nNew);
		this.pos = posarr[0];
		this._pos = posarr[1];

		this.on_fire_onscroll(this.pos, eType);

		if (this.direction == "vert") {
			if (nY < top && nNew == nMin) {
				this.on_fire_onscroll(this.pos, "first");
			}
			else if (nY > bottom && nNew == nMax) {
				this.on_fire_onscroll(this.pos, "last");
			}
			else {
				if (nNew == nMin) {
					this.on_fire_onscroll(this.pos, "first");
				}
				else if (nNew == nMax) {
					this.on_fire_onscroll(this.pos, "last");
				}
			}
		}
		else {
			if (nX < left && nNew == nMin) {
				this.on_fire_onscroll(this.pos, "first");
			}
			else if (nX > right && nNew == nMax) {
				this.on_fire_onscroll(this.pos, "last");
			}
			else {
				if (nNew == nMin) {
					this.on_fire_onscroll(this.pos, "first");
				}
				else if (nNew == nMax) {
					this.on_fire_onscroll(this.pos, "last");
				}
			}
		}
		var rc = this._rectShaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};


	_pScrollBar._setDirection = function (v) {
		if (this.direction != v) {
			switch (v) {
				case "vert":
				case "horz":
					this.direction = v;
					this._recalcLayout();
					break;
			}
		}
		return v;
	};

	_pScrollBar._scroll_convert_pixel = function (v, is_notcheck) {
		return v;
	};

	_pScrollBar._scroll_reverse_convert = function (v, is_notcheck, is_max) {
		return [v, v];
	};

	_pScrollBar._setPos = function (v, evtkind) {
		var str = "none";

		if (evtkind == "mousewheel") {
			str = this._getScrollInfo(v);
		}

		if (v < this.min) {
			v = this.min;
		}
		if (v > this.max) {
			v = this.max;
		}

		if (this.pos != v) {
			this.pos = v;
			this._pos = this._scroll_convert_pixel(v);
			var rc = this._rectShaft;
			this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
		}

		this.on_fire_onscroll(this.pos, str, undefined, undefined, evtkind);
	};

	_pScrollBar._setScrollPos = function (si_pos) {
		if (this._is_tracking) {
			return;
		}

		var posarr = this._scroll_reverse_convert(si_pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}
		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}

		this._recalcLayout();
	};


	_pScrollBar._setScrollInfo = function (left, top, width, height, si_min, si_max, si_line, si_page, si_view, si_enable, si_pos) {
		var posarr = this._scroll_reverse_convert(si_min);
		this.min = posarr[0];
		this._min = posarr[1];

		posarr = this._scroll_reverse_convert(si_max, false, true);
		this.max = posarr[0];
		this._max = posarr[1];
		this._orgmax = si_max;

		this.line = si_line;
		this.page = si_page;
		this.view = si_view;

		posarr = this._scroll_reverse_convert(si_pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		if (this._pos < this._min) {
			this.pos = this.min;
			this._pos = this._min;
		}
		if (this._pos > this._max) {
			this.pos = this.max;
			this._pos = this._max;
		}

		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;

		var bsize = false;

		if (old_left != left || old_top != top || old_width != width || old_height != height) {
			bsize = true;
		}

		if (bsize) {
			this._adjustPosition(left, top, null, null, width, height, this.parent._client_width, this.parent._client_height);

			var control_elem = this._control_element;

			if (control_elem) {
				control_elem.setElementPosition(this._adjust_left, this._adjust_top);
				control_elem.setElementSize(this._adjust_width, this._adjust_height);
				this._updateClientSize(control_elem);

				if (old_left != this._adjust_left || old_top != this._adjust_top) {
					this.on_fire_onmove(this._adjust_left, this._adjust_top);
				}
				if (old_width != this._adjust_width || old_height != this._adjust_height) {
					this.on_fire_onsize(this._adjust_width, this._adjust_height);
				}
			}
		}
		this._recalcLayout();
		this._setEnable(si_enable);
	};

	_pScrollBar._getScrollInfo = function (v) {
		var str = "";
		if (this.pos > v && v > this.min) {
			str = "wheelup";
		}
		else if (this.pos < v && v < this.max) {
			str = "wheeldown";
		}
		else if (v == this.min) {
			str = "wheelfirst";
		}
		else if (v == this.max) {
			str = "wheellast";
		}
		else if (v < this.min) {
			str = "wheelfirstover";
		}
		else if (v > this.max) {
			str = "wheellastover";
		}
		return str;
	};

	_pScrollBar._set_touch_pos = function (v, isScrolling, dir) {
		if (v < this._min) {
			v = this._min;
		}
		if (v > this._max) {
			v = this._max;
		}

		var posarr = this._scroll_reverse_convert(v);
		if (this._pos != posarr[1]) {
			this.pos = posarr[0];
			this._pos = posarr[1];

			this.on_fire_onscroll(this.pos, "touchscroll", isScrolling, dir);
			var rc = this._rectShaft;
			this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
		}
	};

	_pScrollBar._recalcLayout = function () {
		var control_elem = this._control_element;
		if (control_elem && this._is_created_contents) {
			var client_left = control_elem.client_left;
			var client_top = control_elem.client_top;
			var client_width = control_elem.client_width;
			var client_height = control_elem.client_height;
			if (client_width <= 0 || client_height <= 0) {
				return;
			}

			var l = 0, r = 0, t = 0, b = 0, w = 0, h = 0;

			var decsize = this.decbtnsize;
			var incsize = this.incbtnsize;
			var nTrackSize = 0;
			if (this.direction == "vert") {
				if (decsize < 0) {
					decsize = client_width;
				}
				if (incsize < 0) {
					incsize = client_width;
				}

				var diff = client_height - (decsize + incsize);

				if (diff < 0) {
					decsize = ((client_height + (client_height % 2)) / 2) | 0;
					incsize = client_height - decsize;
				}

				var client_bottom = client_top + client_height;

				l = client_left;
				r = l + client_width;
				t = client_top + decsize;
				b = client_bottom - incsize;

				if (decsize == 0) {
					this.decbutton.move(l, -100, client_width, decsize);
				}
				else {
					this.decbutton.move(l, client_top, client_width, decsize);
				}


				if (incsize == 0) {
					this.incbutton.move(l, -100, client_width, client_height - b);
				}
				else {
					this.incbutton.move(l, b, client_width, client_height - b);
				}

				var nShaftSize = b - t;
				if (nShaftSize > 0) {
					var nView = this.view;
					var nBarMin = this.barminsize;
					var nBarOut = this.baroutsize;
					var nSize = this._max - this._min;

					if (nBarOut < 0) {
						nBarOut = r - l;
					}
					if (nBarMin < 0) {
						nBarMin = ((r - l) * 0.60) | 0;
						if (nBarMin < nexacro.ScrollBar.TRACKBAR_SIZE_MIN) {
							nBarMin = nexacro.ScrollBar.TRACKBAR_SIZE_MIN;
						}
					}
					if (nView < 0) {
						nView = 1;
					}

					if (nShaftSize > nBarOut) {
						if (this.trackbarsize > 0) {
							this._trackbarsize = this.trackbarsize;
						}
						else {
							nTrackSize = (nShaftSize * (nView / (nView + nSize))) | 0;
							this._trackbarsize = (nTrackSize < nBarMin) ? nBarMin : nTrackSize;
						}
					}
					else {
						this._trackbarsize = 0;
					}
				}
				else {
					this._trackbarsize = 0;
				}

				if (nShaftSize < this._trackbarsize) {
					this._trackbarsize = nShaftSize;
				}
			}
			else {
				if (decsize < 0) {
					decsize = client_height;
				}
				if (incsize < 0) {
					incsize = client_height;
				}

				var diff = client_width - (decsize + incsize);

				if (diff < 0) {
					decsize = ((client_width + (client_width % 2)) / 2) | 0;
					incsize = client_width - decsize;
				}

				var client_right = client_left + client_width;
				l = client_left + decsize;
				r = client_right - incsize;
				t = client_top;
				b = client_top + client_height;


				if (decsize == 0) {
					this.decbutton.move(client_left, -100, decsize, client_height);
				}
				else {
					this.decbutton.move(client_left, t, decsize, client_height);
				}

				if (incsize == 0) {
					this.incbutton.move(r, -100, client_width - r, client_height);
				}
				else {
					this.incbutton.move(r, t, client_width - r, client_height);
				}

				var nShaftSize = r - l;
				if (nShaftSize > 0) {
					var nView = this.view;
					var nBarMin = this.barminsize;
					var nBarOut = this.baroutsize;
					var nSize = this._max - this._min;

					if (nBarOut < 0) {
						nBarOut = b - t;
					}
					if (nBarMin < 0) {
						nBarMin = parseInt((b - t) * 0.60);
						if (nBarMin < nexacro.ScrollBar.TRACKBAR_SIZE_MIN) {
							nBarMin = nexacro.ScrollBar.TRACKBAR_SIZE_MIN;
						}
					}
					if (nView < 0) {
						nView = 1;
					}

					this._barminsize = nBarMin;
					this._baroutsize = nBarOut;

					if (nShaftSize > nBarOut) {
						if (this.trackbarsize > 0) {
							this._trackbarsize = this.trackbarsize;
						}
						else {
							nTrackSize = (nShaftSize * (nView / (nView + nSize))) | 0;
							this._trackbarsize = (nTrackSize < nBarMin) ? nBarMin : nTrackSize;
						}
					}
					else {
						this._trackbarsize = 0;
					}
				}
				else {
					this._trackbarsize = 0;
				}

				if (nShaftSize < this._trackbarsize) {
					this._trackbarsize = nShaftSize;
				}
			}
			this._rectShaft.set(l, t, r, b);
			this._resetTrackBar(l, t, r, b);
		}
	};

	_pScrollBar._resetTrackBar = function (l, t, r, b) {
		if (this._trackbarsize <= 0) {
			this.trackbar.set_visible(false);
			return;
		}

		this.trackbar.set_visible(true);

		var rl = 0, rt = 0, rr = 0, rb = 0;

		var nMin = this._min;
		var nPos = this._pos;
		var nTrackSize = this._trackbarsize;
		var nSize = this._max - this._min;

		if (nSize > 0) {
			if (this.direction == "vert") {
				var nShaftSize = b - t;
				var nTrackStart = ((nPos - nMin) * (nShaftSize - nTrackSize) / nSize) | 0;

				rl = l;
				rr = r;
				rt = t + nTrackStart;
				rb = rt + nTrackSize;

				if (rb > b) {
					rb = b;
					rt = b - nTrackSize;
				}
			}
			else {
				var nShaftSize = r - l;
				nTrackStart = parseInt((nPos - nMin) * (nShaftSize - nTrackSize) / nSize);

				rl = l + nTrackStart;
				rr = rl + nTrackSize;
				rt = t;
				rb = b;

				if (rr > r) {
					rr = r;
					rl = r - nTrackSize;
				}
			}
		}

		if ((rl <= 0 && rt <= 0 && rr - rl <= 0 && rb - rt <= 0)) {
			this._set_real = true;
			this._setRealEnable(false);
			this.trackbar.set_visible(false);
		}
		else if (this._set_real) {
			this._set_real = false;
			this._setRealEnable(true);
			this.trackbar.set_visible(true);
		}

		if (!this._reset_trackbar_fix) {
			this.trackbar.move(rl, rt, rr - rl, rb - rt);
		}

		this._reset_trackbar_fix = false;
	};

	_pScrollBar._setRealEnable = function (enable) {
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

			if (this.incbutton) {
				this.incbutton._setRealEnable(enable);
			}
			if (this.decbutton) {
				this.decbutton._setRealEnable(enable);
			}
			if (this.trackbar) {
				this.trackbar._setRealEnable(enable);
			}
		}
	};

	_pScrollBar._moveTrackBar = function (rcTrack, rcBound) {
		var width = rcTrack.right - rcTrack.left;
		var height = rcTrack.bottom - rcTrack.top;

		if (rcTrack.left < rcBound.left) {
			rcTrack.left = rcBound.left;
			rcTrack.right = rcTrack.left + width;
		}
		if (rcTrack.right > rcBound.right) {
			rcTrack.right = rcBound.right;
			rcTrack.left = rcTrack.right - width;
		}
		if (rcTrack.top < rcBound.top) {
			rcTrack.top = rcBound.top;
			rcTrack.bottom = rcTrack.top + height;
		}
		if (rcTrack.bottom > rcBound.bottom) {
			rcTrack.bottom = rcBound.bottom;
			rcTrack.top = rcTrack.bottom - height;
		}
		this.trackbar.move(rcTrack.left, rcTrack.top, rcTrack.right - rcTrack.left, rcTrack.bottom - rcTrack.top);
	};

	_pScrollBar._starttrack = function () {
		this.on_fire_onscroll(this.pos, "trackstart");
	};
	_pScrollBar._endtrack = function () {
		this.on_fire_onscroll(this.pos, "trackend");
		var rc = this._rectShaft;
		this._resetTrackBar(rc.left, rc.top, rc.right, rc.bottom);
	};
	_pScrollBar._movetrack = function (x, y) {
		var nX = x;
		var nY = y;
		var nMin = this._min;
		var nMax = this._max;
		var nPos = this._pos;

		var nDiff = 0;
		var nSize = nMax - nMin;
		var nNew = nPos;

		var trackbar = this.trackbar;
		var rcTrackOrigin = {
			left : trackbar._adjust_left, 
			top : trackbar._adjust_top, 
			right : trackbar._adjust_left + trackbar._adjust_width, 
			bottom : trackbar._adjust_top + trackbar._adjust_height
		};

		var w = rcTrackOrigin.right - rcTrackOrigin.left;
		var h = rcTrackOrigin.bottom - rcTrackOrigin.top;
		if (w <= 0 || h <= 0) {
			return;
		}

		var rcTrack = {
			left : rcTrackOrigin.left, 
			top : rcTrackOrigin.top, 
			right : rcTrackOrigin.right, 
			bottom : rcTrackOrigin.bottom
		};

		if (this.direction == "vert") {
			var rc = this._rectShaft;
			nDiff = nY - this._mousePoint.y;
			if ((nDiff < 0 && rcTrackOrigin.top > rc.top) || (nDiff > 0 && rcTrackOrigin.bottom < rc.bottom)) {
				rcTrack.top += nDiff;
				rcTrack.bottom += nDiff;

				nNew = (nSize * (rcTrack.top - rc.top) / ((rc.bottom - rc.top) - (rcTrack.bottom - rcTrack.top)));
				this._moveTrackBar(rcTrack, rc);

				if (trackbar._adjust_top - rcTrackOrigin.top == 0) {
					this._mousePoint.x = nX;
					this._mousePoint.y = nY;
				}
				else {
					this._mousePoint.x = nX;
					this._mousePoint.y = this._mousePoint.y + (trackbar._adjust_top - rcTrackOrigin.top);
				}
			}
		}
		else {
			var rc = this._rectShaft;
			nDiff = nX - this._mousePoint.x;
			if ((nDiff < 0 && rcTrackOrigin.left > rc.left) || (nDiff > 0 && rcTrackOrigin.right < rc.right)) {
				rcTrack.left += nDiff;
				rcTrack.right += nDiff;

				nNew = parseInt(nSize * ((rcTrack.left - rc.left) / ((rc.right - rc.left) - (rcTrack.right - rcTrack.left))));
				this._moveTrackBar(rcTrack, rc);
				if (trackbar._adjust_left - rcTrackOrigin.left == 0) {
					this._mousePoint.x = nX;
					this._mousePoint.y = nY;
				}
				else {
					this._mousePoint.x = this._mousePoint.x + (trackbar._adjust_left - rcTrackOrigin.left);
					this._mousePoint.y = nY;
				}
			}
		}
		if (nNew <= nMin) {
			var posarr = this._scroll_reverse_convert(nMin);
			this.pos = posarr[0];
			this._pos = posarr[1];

			if (!(this._nTrackOver & nexacro.ScrollBar.TRACKFIRSTOVER)) {
				this.on_fire_onscroll(this.pos, "trackfirst");
				this._nTrackOver = nexacro.ScrollBar.TRACKFIRSTOVER;
			}
			else {
				this.on_fire_onscroll(this.pos, "trackfirstover");
			}
		}
		else if (nNew >= nMax) {
			var posarr = this._scroll_reverse_convert(nMax);
			this.pos = posarr[0];
			this._pos = posarr[1];

			if (!(this._nTrackOver & nexacro.ScrollBar.TRACKLASTOVER)) {
				this.on_fire_onscroll(this.pos, "tracklast");
				this._nTrackOver = nexacro.ScrollBar.TRACKLASTOVER;
			}
			else {
				this.on_fire_onscroll(this.pos, "tracklastover");
			}
		}
		else {
			var posarr = this._scroll_reverse_convert(nNew);
			this.pos = posarr[0];
			this._pos = posarr[1];

			this.on_fire_onscroll(this.pos, "track");
			this._nTrackOver = 0;
		}
	};

	_pScrollBar._getIncNewPosPixel = function () {
	};
	_pScrollBar._getDecNewPosPixel = function () {
	};


	_pScrollBar._setScrollLayout = function (min, max, page, line, pos) {
		if (pos < min) {
			pos = min;
		}
		if (pos > max) {
			pos = max;
		}

		var posarr = this._scroll_reverse_convert(min);
		this.min = posarr[0];
		this._min = posarr[1];

		posarr = this._scroll_reverse_convert(max);
		this.max = posarr[0];
		this._max = posarr[1];
		this._orgmax = max;

		posarr = this._scroll_reverse_convert(pos);
		this.pos = posarr[0];
		this._pos = posarr[1];

		this.line = line;
		this.page = page;

		this._recalcLayout();
	};

	delete _pScrollBar;

	nexacro.ScrollBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ScrollBar.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pScrollBarCtrl = nexacro.ScrollBarCtrl.prototype = nexacro._createPrototype(nexacro.ScrollBar, nexacro.ScrollBarCtrl);
	nexacro._setForTypedControlStyleFinder(_pScrollBarCtrl);

	_pScrollBarCtrl._type_name = "ScrollBarControl";
	_pScrollBarCtrl._is_focus_accept = false;

	_pScrollBarCtrl._get_css_assumedtypename = function () {
		if (this.direction == "vert") {
			return "VScrollBarControl";
		}
		else if (this.direction == "horz") {
			return "HScrollBarControl";
		}
		return this._type_name;
	};

	delete _pScrollBarCtrl;
}
