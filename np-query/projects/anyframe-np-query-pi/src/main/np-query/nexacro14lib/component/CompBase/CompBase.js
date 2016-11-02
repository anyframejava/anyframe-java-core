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

if (!nexacro.Component) {
	nexacro.__position9xObj = function (target) {
		if (target) {
			this._target = target;
		}

		this.left = 0;
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
		this.width = 0;
		this.height = 0;
		this.x = 0;
		this.y = 0;

		this._value = "absolute 0 0 0 0";
	};

	__pPosition9xObj = nexacro._createPrototype(nexacro.Object, nexacro.__position9xObj);
	nexacro.__position9xObj.prototype = __pPosition9xObj;

	__pPosition9xObj.style = "absolute";
	__pPosition9xObj.x = 0;
	__pPosition9xObj.y = 0;

	__pPosition9xObj._bsize = false;
	__pPosition9xObj._bmove = false;

	__pPosition9xObj.toString = function () {
		return this._value;
	};

	__pPosition9xObj._emptyObject = function () {
		this._value = "absolute 0 0 0 0";
		this.style = "absolute";
		this.left = 0;
		this.right = 0;
		this.top = 0;
		this.bottom = 0;
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
	};

	__pPosition9xObj._updateValue = function () {
		this.width = this.right - this.left;
		this.height = this.bottom - this.top;

		this.x = this.left;
		this.y = this.top;

		this._value = "absolute " + this.left + ' ' + this.top + ' ' + this.right + ' ' + this.bottom;
	};

	__pPosition9xObj._update = function () {
		this.width = this.right - this.left;
		this.height = this.bottom - this.top;

		this.x = this.left;
		this.y = this.top;

		var str = "absolute " + this.left + ' ' + this.top + ' ' + this.right + ' ' + this.bottom;

		if (str != this._value) {
			this._value = str;
			if (this._target != null) {
				this._target._adjustPosition(this.left, this.top, null, null, this.width, this.height, this._target.parent._client_width, this._target.parent._client_height);
				this._target.on_update_position(this._bsize, this._bmove);
				this._bsize = false;
				this._bmove = false;
			}
		}
	};

	__pPosition9xObj._set = function (v) {
		var val = (v == null) ? "" : v.toString().trim();
		if (val != this._value) {
			if (val == "") {
				this._emptyObject();
			}
			else {
				var valarr = val.split(/\s+/);
				switch (valarr.length) {
					case 4:
						this.left = parseInt(valarr[0]) | 0;
						this.top = parseInt(valarr[1]) | 0;
						this.right = parseInt(valarr[2]) | 0;
						this.bottom = parseInt(valarr[3]) | 0;
						break;
					case 5:
						this.left = parseInt(valarr[1]) | 0;
						this.top = parseInt(valarr[2]) | 0;
						this.right = parseInt(valarr[3]) | 0;
						this.bottom = parseInt(valarr[4]) | 0;
						break;
					default:
						this._emptyObject();
						break;
				}
				this._update();
			}
		}
	};

	__pPosition9xObj.set_style = function (v) {
		if (v != this.style) {
			if (v == "absolute") {
				this.style = "absolute";
			}
		}
	};

	__pPosition9xObj.set_left = function (v) {
		var val = parseInt(v) | 0;

		if (val > this.right) {
			this.right = val;
		}

		if (val != this.left) {
			this.left = val;
			this._bmove = true;
			this._bsize = true;
			this._update();
		}
	};

	__pPosition9xObj.set_top = function (v) {
		var val = parseInt(v) | 0;

		if (val > this.bottom) {
			this.bottom = val;
		}

		if (val != this.top) {
			this.top = val;
			this._bmove = true;
			this._bsize = true;
			this._update();
		}
	};

	__pPosition9xObj.set_right = function (v) {
		var val = parseInt(v) | 0;

		if (this.left > val) {
			this.left = val;
		}
		if (val != this.right) {
			this.right = val;
			this._bsize = true;
			this._update();
		}
	};

	__pPosition9xObj.set_bottom = function (v) {
		var val = parseInt(v) | 0;

		if (this.top > val) {
			this.top = val;
		}

		if (val != this.bottom) {
			this.bottom = val;
			this._bsize = true;
			this._update();
		}
	};
	__pPosition9xObj.set_x = function (v) {
		var val = parseInt(v) | 0;
		if (val != this.left) {
			this.left = val;
			this.right = this.left + this.width;
			this._bsize = true;
			this._bmove = true;
			this._update();
		}
	};

	__pPosition9xObj.set_y = function (v) {
		var val = parseInt(v) | 0;
		if (val != this.top) {
			this.top = val;
			this.bottom = this.top + this.height;
			this._bsize = true;
			this._bmove = true;
			this._update();
		}
	};

	__pPosition9xObj.set_width = function (v) {
		if (v < 0) {
			v = 0;
		}
		var val = this.left + (parseInt(v) | 0);
		if (val != this.right) {
			this.right = val;
			this._bsize = true;
			this._update();
		}
	};
	__pPosition9xObj.set_height = function (v) {
		if (v < 0) {
			v = 0;
		}
		var val = this.top + (parseInt(v) | 0);
		if (val != this.bottom) {
			this.bottom = val;
			this._bsize = true;
			this._update();
		}
	};

	delete __pPosition9xObj;



	nexacro.__position29xObj = function (target) {
		if (target) {
			this._target = target;
		}

		this._value = "absolute l:0 w:0 t:0 h:0";
	};

	__pPosition29xObj = nexacro._createPrototype(nexacro.Object, nexacro.__position29xObj);
	nexacro.__position29xObj.prototype = __pPosition29xObj;

	__pPosition29xObj.style = "absolute";
	__pPosition29xObj.left = null;
	__pPosition29xObj.right = null;
	__pPosition29xObj.top = null;
	__pPosition29xObj.bottom = null;
	__pPosition29xObj.width = null;
	__pPosition29xObj.height = null;

	__pPosition29xObj._bsize = false;
	__pPosition29xObj._bmove = false;

	__pPosition29xObj.toString = function () {
		return this._value;
	};

	__pPosition29xObj._emptyObject = function () {
		this._value = "absolute l:0 t:0 w:0 h:0";
		this.style = "absolute";
		this.left = null;
		this.right = null;
		this.top = null;
		this.bottom = null;
		this.width = null;
		this.height = null;
	};

	__pPosition29xObj._updateValue = function () {
		var l = this.left, r = this.right, t = this.top, b = this.bottom, w = this.width, h = this.height;
		var valarr = [];
		var idx = 0;

		if (l != undefined) {
			valarr[idx++] = "l:" + l;
		}
		if (r != undefined) {
			valarr[idx++] = "r:" + r;
		}
		if (w != undefined) {
			valarr[idx++] = "w:" + w;
		}
		if (t != undefined) {
			valarr[idx++] = "t:" + t;
		}
		if (b != undefined) {
			valarr[idx++] = "b:" + b;
		}
		if (h != undefined) {
			valarr[idx++] = "h:" + h;
		}

		this._value = "absolute " + valarr[0] + ' ' + valarr[1] + ' ' + valarr[2] + ' ' + valarr[3];
	};

	__pPosition29xObj.set_left = function (v) {
		if (this.left != v) {
			this.left = v;
			this._target.set_left(v);
		}
	};

	__pPosition29xObj.set_top = function (v) {
		if (this.top != v) {
			this.top = v;
			this._target.set_top(v);
		}
	};

	__pPosition29xObj.set_right = function (v) {
		if (this.right != v) {
			this.right = v;
			this._target.set_right(v);
		}
	};

	__pPosition29xObj.set_bottom = function (v) {
		if (this.bottom != v) {
			this.bottom = v;
			this._target.set_bottom(v);
		}
	};

	__pPosition29xObj.set_width = function (v) {
		if (this.width != v) {
			this.width = v;
			this._target.set_width(v);
		}
	};

	__pPosition29xObj.set_height = function (v) {
		if (this.height != v) {
			this.height = v;
			this._target.set_height(v);
		}
	};

	delete __pPosition29xObj;



	nexacro.Component = function (id, position, left, top, width, height, right, bottom, parent) {
		this.id = this.name = id || null;

		if (parent) {
			this.parent = parent;
			this._refform = this._findForm(parent);
		}
		else {
			this.parent = null;
			this._refform = null;
		}

		this.position = position ? position : "absolute";

		var parent_width = parent ? this.parent._adjust_width : null;
		var parent_height = parent ? this.parent._adjust_height : null;

		this._adjustPosition(left, top, right, bottom, width, height, parent_width, parent_height);

		this.style = this.on_create_custom_style();
		this.currentstyle = this.on_create_custom_currentStyle();
		this._styles = {
		};
		this._enable_redraw_history = {
		};
	};

	var _pComponent = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Component);
	nexacro.Component.prototype = _pComponent;
	_pComponent._type_name = "Component";

	_pComponent.expr = "";
	_pComponent.cssclass = "";
	_pComponent.visible = true;
	_pComponent.enable = true;
	_pComponent.taborder = "";
	_pComponent.tabstop = true;
	_pComponent.hotkey = "";
	_pComponent.transparenthittest = false;
	_pComponent.enableredraw = true;
	_pComponent.enableevent = true;
	_pComponent.tooltiptype = "default";
	_pComponent.tooltiptext = "";
	_pComponent.scrollbars = "none";
	_pComponent.hotkey = null;
	_pComponent.rtldirection = null;
	_pComponent.positionstep = 0;
	_pComponent._css_finder = null;
	_pComponent._ref_css_finder = null;
	_pComponent._refcssobj = null;
	_pComponent._refcssid = "";

	_pComponent._client_left = 0;
	_pComponent._client_top = 0;
	_pComponent._client_width = 0;
	_pComponent._client_height = 0;

	_pComponent._adjust_left = -1;
	_pComponent._adjust_top = -1;
	_pComponent._adjust_width = -1;
	_pComponent._adjust_height = -1;

	_pComponent._client_left_ltr = 0;
	_pComponent._adjust_left_ltr = -1;

	_pComponent._is_loading = false;
	_pComponent._is_created = false;
	_pComponent._is_alive = true;
	_pComponent._status = "enable";
	_pComponent._selected = false;
	_pComponent._pushed = false;
	_pComponent._readonly = false;
	_pComponent._is_created_contents = false;
	_pComponent._has_dirty_pos = false;
	_pComponent._has_dirty_rect = false;
	_pComponent._pseudo = "normal";
	_pComponent._control_pseudo = "";
	_pComponent._contents_pseudo = "";
	_pComponent._apply_pushed_pseudo = false;
	_pComponent._apply_client_padding = true;
	_pComponent._apply_client_border = false;

	_pComponent._is_component = true;
	_pComponent._is_subcontrol = false;
	_pComponent._is_reference_control = true;
	_pComponent._is_form = false;
	_pComponent._is_frame = false;
	_pComponent._is_window = false;
	_pComponent._is_nc_control = false;
	_pComponent._is_simple_control = false;
	_pComponent._is_scrollable = false;
	_pComponent._is_popup_control = false;
	_pComponent._is_band_control = false;
	_pComponent._is_band_vert_paging = false;
	_pComponent._is_area_scroll = false;
	_pComponent._is_focus_accept = true;
	_pComponent._is_comp_focus = false;
	_pComponent._control_element = null;
	_pComponent._zindex = null;
	_pComponent._bind_event = null;
	_pComponent._taborder = -1;
	_pComponent._display_text = "";
	_pComponent._real_enable = null;
	_pComponent._real_visible = false;
	_pComponent._vml_visible = true;
	_pComponent._last_focused = null;
	_pComponent._hotkey = null;
	_pComponent._track_capture = true;
	_pComponent._focus_direction = -1;
	_pComponent._rtldirection = undefined;
	_pComponent._re_focus = false;

	_pComponent._scrollbars = 0;
	_pComponent._scroll_showtype = -1;
	_pComponent._scroll_top = 0;
	_pComponent._scroll_left = 0;
	_pComponent._scroll_height = 0;
	_pComponent.hscrollbar = null;
	_pComponent.vscrollbar = null;
	_pComponent._event_list = {
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
		"ontouchstart" : 1, 
		"ontouchmove" : 1, 
		"ontouchend" : 1, 
		"ontap" : 1, 
		"ondbltap" : 1, 
		"onpinchstart" : 1, 
		"onpinch" : 1, 
		"onpinchend" : 1, 
		"onflingstart" : 1, 
		"onfling" : 1, 
		"onflingend" : 1, 
		"onlongpress" : 1, 
		"onslidestart" : 1, 
		"onslide" : 1, 
		"onslideend" : 1
	};

	_pComponent.initProperties = function () {
	};
	_pComponent.initEvents = function () {
	};
	_pComponent._resizePopupInbound = nexacro._emptyFn;

	nexacro.Component._default_color = nexacro._getCachedStyleObj("color", "red");
	nexacro.Component._default_margin = nexacro._getCachedStyleObj("margin", "0 0 0 0");
	nexacro.Component._default_padding = nexacro._getCachedStyleObj("padding", "0 0 0 0");
	nexacro.Component._default_font = nexacro._getCachedStyleObj("font", "Dotum,9");
	nexacro.Component._default_center_align = nexacro._getCachedStyleObj("align", "center middle");
	nexacro.Component._default_left_align = nexacro._getCachedStyleObj("align", "left middle");
	nexacro.Component._default_right_align = nexacro._getCachedStyleObj("align", "right middle");
	nexacro.Component._default_step_align = nexacro._getCachedStyleObj("align", "center bottom");
	nexacro.Component._default_textarea_align = nexacro._getCachedStyleObj("align", "left top");
	nexacro.Component._default_align = nexacro.Component._default_center_align;
	nexacro.Component._default_buttonimg_align = nexacro._getCachedStyleObj("align", "lefttext middle");
	nexacro.Component._default_opacity = nexacro._getCachedStyleObj("opacity", "100");
	nexacro.Component._default_cursor = nexacro._getCachedStyleObj("cursor", "auto");
	nexacro.Component._wait_cursor = nexacro._getCachedStyleObj("cursor", "wait");
	nexacro.Component._default_accessibility = nexacro._getCachedStyleObj("accessibility", "");
	nexacro.Component._default_shadow = nexacro._getCachedStyleObj("shadow", "");
	nexacro.Component._default_rtlimagemirroring = nexacro._getCachedStyleObj("rtlimagemirroring", "false");
	nexacro.Component._default_letterspace = nexacro._getCachedStyleObj("letterspace", "0");

	nexacro.Component.SCROLLBAR_DEFAULT_SIZE = 17;

	nexacro.Component._status_table = {
		"enable_normal" : "normal", 
		"enable_disabled" : "normal", 
		"enable_focused" : "focused", 
		"enable_mouseover" : "mouseover", 
		"enable_selected" : "selected", 
		"enable_pushed" : "pushed", 
		"enable_readonly" : "readonly", 
		"enable_deactivate" : "deactivate", 
		"disable_normal" : "disabled", 
		"disable_disabled" : "disabled", 
		"disable_focused" : "disabled", 
		"disable_mouseover" : "disabled", 
		"disable_selected" : "disabled", 
		"disable_pushed" : "disabled", 
		"disable_readonly" : "disabled", 
		"focus_normal" : "focused", 
		"focus_disabled" : "disabled", 
		"focus_focused" : "focused", 
		"focus_mouseover" : "mouseover", 
		"focus_selected" : "selected", 
		"focus_pushed" : "pushed", 
		"focus_readonly" : "focused", 
		"readonly_normal" : "readonly", 
		"readonly_disabled" : "disabled", 
		"readonly_focused" : "focused", 
		"readonly_mouseover" : "mouseover", 
		"readonly_selected" : "selected", 
		"readonly_pushed" : "pushed", 
		"readonly_readonly" : "readonly"
	};

	_pComponent._width = null;
	_pComponent._height = null;
	_pComponent._left = null;
	_pComponent._top = null;
	_pComponent._right = null;
	_pComponent._bottom = null;

	_pComponent.left = null;
	_pComponent.top = null;
	_pComponent.right = null;
	_pComponent.bottom = null;
	_pComponent.width = null;
	_pComponent.height = null;

	_pComponent._overedobj = null;

	_pComponent._dragging_cursor = null;
	_pComponent.__setPosition9x = function (val) {
		if (val.indexOf(":") >= 0) {
			var valarr = val.split(/\s+/);
			var i = 0;
			var v = "", prestr = "";
			var idx = 0;

			var pos = {
				left : null, 
				top : null, 
				right : null, 
				bottom : null, 
				width : null, 
				height : null
			};

			var old_left = this._adjust_left;
			var old_top = this._adjust_top;
			var old_width = this._adjust_width;
			var old_height = this._adjust_height;
			var bsize = false, bmove = false;

			this.position = "absolute";

			if (valarr.length == 5) {
				this.position = valarr[0];
				i = 1;
			}

			for (i; i < valarr.length; i++) {
				v = valarr[i].toString();

				idx = v.indexOf(":");
				prestr = v.substring(0, idx);
				v = v.substring(idx + 1);

				switch (prestr) {
					case "l":
						pos.left = v;
						break;
					case "t":
						pos.top = v;
						break;
					case "r":
						pos.right = v;
						break;
					case "b":
						pos.bottom = v;
						break;
					case "w":
						pos.width = v;
						break;
					case "h":
						pos.height = v;
						break;
				}
			}
			this._adjustPosition(pos.left, pos.top, pos.right, pos.bottom, pos.width, pos.height, this.parent._client_width, this.parent._client_height);
		}
		else {
			var valarr = val.split(/\s+/);

			var pos = {
				left : 0, 
				top : 0, 
				right : 0, 
				bottom : 0
			};
			var old_left = this._adjust_left;
			var old_top = this._adjust_top;
			var old_width = this._adjust_width;
			var old_height = this._adjust_height;
			var bsize = false, bmove = false;

			switch (valarr.length) {
				case 4:
					this.position = "absolute";
					pos.left = (parseInt(valarr[0]) | 0);
					pos.top = (parseInt(valarr[1]) | 0);
					pos.right = (parseInt(valarr[2]) | 0);
					pos.bottom = (parseInt(valarr[3]) | 0);
					break;
				case 5:
					this.position = (parseInt(valarr[0]) || "absolute");
					pos.left = (parseInt(valarr[1]) | 0);
					pos.top = (parseInt(valarr[2]) | 0);
					pos.right = (parseInt(valarr[3]) | 0);
					pos.bottom = (parseInt(valarr[4]) | 0);
					break;
				default:
					this.position = "absolute";
					pos.left = 0;
					pos.top = 0;
					pos.right = 0;
					pos.bottom = 0;
					break;
			}
			var w = pos.right - pos.left;
			var h = pos.bottom - pos.top;
			this._adjustPosition(pos.left, pos.top, null, null, w, h, this.parent._client_width, this.parent._client_height);
		}

		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;
		}
		if (this._adjust_left != old_left || this._adjust_top != old_top) {
			bmove = true;
		}

		this.on_update_position(bsize, bmove);
	};

	_pComponent.__getPosition9x = function (target) {
		var obj = new nexacro.__position9xObj(target);

		obj.left = this._adjust_left;
		obj.top = this._adjust_top;
		obj.right = this._adjust_left + this._adjust_width;
		obj.bottom = this._adjust_top + this._adjust_height;
		obj._updateValue();

		return obj;
	};

	_pComponent.__getPosition29x = function (target) {
		var obj = new nexacro.__position29xObj(target);

		obj.left = this.left;
		obj.top = this.top;
		obj.right = this.right;
		obj.bottom = this.bottom;
		obj.width = this.width;
		obj.height = this.height;
		obj._updateValue();

		return obj;
	};

	_pComponent.set_position = function (v) {
		if (this.position != v) {
			this.position = v;
			this.on_apply_position(v);
		}
	};

	_pComponent.on_apply_position = function (v) {
		var control_elem = this.getElement();
		if (control_elem) {
			control_elem.setElementPositionBasis(v);
		}
	};

	_pComponent._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
		var val = null;

		var _left = left;
		var _right = right;

		var bRtl = this._isRtl(this.parent);
		if (bRtl) {
			var swap = _left;
			_left = _right;
			_right = swap;
		}

		if (this.parent && this.parent._is_form && this.parent.parent && this.parent.parent._is_frame) {
			var form = this.parent;
			var zoom_factor = form.getZoom();
			if (zoom_factor != 100) {
				parentWidth = (parentWidth * 100) / zoom_factor;
				parentHeight = (parentHeight * 100) / zoom_factor;
			}
		}

		for (var i = 0; i < 6; i++) {
			switch (i) {
				case 0:
					val = _left;
					if (val != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(val, parentWidth);
						}
						else {
							val = this._convToPixel(val, parentHeight);
						}
					}
					if (isNumber(val) || val == null) {
						this.left = left;
						this._left = val;
					}
					break;
				case 1:
					val = top;
					if (val != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(val, parentWidth);
						}
						else {
							val = this._convToPixel(val, parentHeight);
						}
					}
					if (isNumber(val) || val == null) {
						this.top = top;
						this._top = val;
					}
					break;
				case 2:
					val = _right;
					if (val != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(val, parentWidth);
						}
						else {
							val = this._convToPixel(val, parentHeight);
						}
					}
					if (isNumber(val) || val == null) {
						this.right = right;
						this._right = val;
					}
					break;
				case 3:
					val = bottom;
					if (val != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(val, parentWidth);
						}
						else {
							val = this._convToPixel(val, parentHeight);
						}
					}
					if (isNumber(val) || val == null) {
						this.bottom = bottom;
						this._bottom = val;
					}
					break;
				case 4:
					val = width;
					if (val != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(val, parentWidth);
						}
						else {
							val = this._convToPixel(val, parentHeight);
						}
					}
					if (isNumber(val) || val == null) {
						this.width = width;
						this._width = val;
					}
					break;
				case 5:
					val = height;
					if (val != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(val, parentWidth);
						}
						else {
							val = this._convToPixel(val, parentHeight);
						}
					}
					if (isNumber(val) || val == null) {
						this.height = height;
						this._height = val;
					}
					break;
			}
		}

		if (this._width != null || (this._right != null && this._left != null)) {
			this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
		}

		if (this._height != null || this._bottom != null) {
			this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;
		}

		if (this._left != null || this._right != null) {
			this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;
			if (bRtl) {
				this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
			}
		}

		if (this.top != null || this._bottom != null) {
			this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;
		}

		if (this.left && this.width && this.right) {
			this._right = 0;
			this.right = null;
		}

		if (this.top && this.height && this.bottom) {
			this._bottom = 0;
			this.bottom = null;
		}
	};

	_pComponent._convToPixel = function (val, parentsize) {
		if (typeof (val) == "string" && val.indexOf("%") >= 0) {
			return parseInt(parentsize * (parseFloat(val) / 100));
		}

		return (parseInt(val) | 0);
	};

	_pComponent._setAllZeroPixel = function () {
		var bmove = false, bsize = false;

		if (this._adjust_left != 0 || this._adjust_top != 0) {
			this.left = 0;
			this.top = 0;
			bmove = true;
		}
		if (this._adjust_width != 0 || this._adjust_height != 0) {
			this.width = 0;
			this.height = 0;
			bsize = true;
		}

		this._update_position(bsize, bmove);
	};

	_pComponent.set_left = function (propVal) {
		if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal))) {
			return;
		}

		if (this.left != propVal) {
			this.left = propVal;
			if (propVal === null || propVal === undefined) {
				this._left = null;
				if (this._right && !this._width) {
					this.set_width(this._adjust_width);
				}
				else if (!this._right && this._width) {
					var right = this._adjust_left + this._adjust_width;
					this.set_right(this.parent._client_width - right);
				}

				return;
			}

			if (this.right && this.width) {
				this.width = null;
				this._width = null;
			}

			this._update_position(false, true);
		}
	};

	_pComponent.set_top = function (propVal) {
		if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal))) {
			return;
		}

		if (this.top != propVal) {
			this.top = propVal;
			if (propVal === null || propVal === undefined) {
				this._top = null;
				if (this._bottom && !this._height) {
					this.set_height(this._adjust_height);
				}
				else if (!this._bottom && this._height) {
					var bottom = this._adjust_top + this._adjust_height;

					this.set_bottom(this.parent._client_height - bottom);
				}

				return;
			}

			if (this.bottom && this.height) {
				this.height = null;
				this._height = null;
			}

			this._update_position(false, true);
		}
	};

	_pComponent.set_right = function (propVal) {
		if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal))) {
			return;
		}

		if (this.right != propVal) {
			this.right = propVal;
			if (propVal === null || propVal === undefined) {
				this._right = null;
				if (this._left && !this._width) {
					this.set_width(this._adjust_width);
				}
				else if (!this._left && this._width) {
					this.set_left(this._adjust_left);
				}

				return;
			}


			if (!nexacro._isNull(this.left) && !nexacro._isNull(this.width)) {
				this.width = null;
				this._width = null;
			}

			this._update_position(true, true);
		}
	};

	_pComponent.set_bottom = function (propVal) {
		if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal))) {
			return;
		}

		if (this.bottom != propVal) {
			this.bottom = propVal;
			if (propVal === null || propVal === undefined) {
				this._bottom = null;
				if (this._top && !this._height) {
					this.set_height(this._adjust_height);
				}
				else if (!this._top && this._height) {
					this.set_top(this._adjust_top);
				}

				return;
			}

			if (!nexacro._isNull(this.top) && !nexacro._isNull(this.height)) {
				this.height = null;
				this._height = null;
			}

			this._update_position(true, true);
		}
	};

	_pComponent.set_width = function (propVal) {
		if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal))) {
			return;
		}

		if (this.width != propVal) {
			this.width = propVal;

			if (propVal === null || propVal === undefined) {
				this._width = null;

				if (this._left > -1 && !this._right) {
					var right = this._adjust_left + this._adjust_width;
					this.set_right(this.parent._client_width - right);
				}
				else if (!this._left && this._right > -1) {
					this.set_left(this._adjust_left);
				}

				return;
			}

			if (!nexacro._isNull(this.left) && !nexacro._isNull(this.right)) {
				this.right = null;
				this._right = null;
			}
			this._update_position(true, false);
		}
	};

	_pComponent.set_height = function (propVal) {
		if (propVal !== null && propVal !== undefined && isNaN(parseInt(propVal))) {
			return;
		}

		if (this.height != propVal) {
			this.height = propVal;
			if (propVal === null || propVal === undefined) {
				this._height = null;

				if (this._top && !this._bottom) {
					var bottom = this._adjust_top + this._adjust_height;
					this.set_bottom(this.parent._client_height - bottom);
				}
				else if (!this._top && this._bottom) {
					this.set_top(this._adjust_top);
				}

				return;
			}

			if (!nexacro._isNull(this.top) && !nexacro._isNull(this.bottom)) {
				this.bottom = null;
				this._bottom = null;
			}

			this._update_position(true, false);
		}
	};

	_pComponent.getPixelLeft = function () {
		return this._left;
	};
	_pComponent.getPixelTop = function () {
		return this._top;
	};
	_pComponent.getPixelRight = function () {
		return this._right;
	};
	_pComponent.getPixelBottom = function () {
		return this._bottom;
	};
	_pComponent.getPixelWidth = function () {
		return this._width;
	};
	_pComponent.getPixelHeight = function () {
		return this._height;
	};

	_pComponent.getOffsetLeft = function () {
		return this._adjust_left;
	};
	_pComponent.getOffsetTop = function () {
		return this._adjust_top;
	};
	_pComponent.getOffsetRight = function () {
		return this._adjust_left + this._adjust_width;
	};
	_pComponent.getOffsetBottom = function () {
		return this._adjust_top + this._adjust_height;
	};
	_pComponent.getOffsetWidth = function () {
		return this._adjust_width;
	};
	_pComponent.getOffsetHeight = function () {
		return this._adjust_height;
	};

	_pComponent.setOffsetLeft = function (v) {
		return this.set_left(v);
	};
	_pComponent.setOffsetTop = function (v) {
		this.set_top(v);
	};
	_pComponent.setOffsetRight = function (v) {
		this.set_width((v | 0) - this._adjust_left);
	};
	_pComponent.setOffsetBottom = function (v) {
		this.set_height((v | 0) - this._adjust_top);
	};
	_pComponent.setOffsetWidth = function (v) {
		this.set_width(v);
	};
	_pComponent.setOffsetHeight = function (v) {
		this.set_height(v);
	};

	_pComponent._getAccessibilityRole = function (accessibility) {
		return accessibility.role ? accessibility.role : this._accessibility_role;
	};

	_pComponent._getAccessibilityLabel = function (accessibility) {
		var label = "";
		return (label = this._getLinkedLabel(accessibility.label)) ? label : this.on_get_style_accessibility_label();
	};

	_pComponent._on_getAccessibilityAdditionalLabel = function () {
		return "";
	};

	_pComponent._on_getAccessibilityAdditionalRole = function () {
		if (this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo)) == "heading") {
			return " heading";
		}
		return "";
	};

	_pComponent._getAccessibilityDescLevel = function (desclevel) {
		if (desclevel == "none" || desclevel == "child") {
			return desclevel;
		}
		var comp = this.parent;
		if (comp && comp._getDescLevel) {
			return comp._getDescLevel();
		}
		else {
			return desclevel;
		}
	};

	_pComponent._getAccessibilityDescription = function (accessibility) {
		var description = "";
		return (description = this._getLinkedDescription(accessibility.description)) ? description : this.on_get_style_accessibility_description();
	};
	_pComponent._getAccessibilityAction = function (accessibility) {
		var action = this._getLinkedAction(accessibility.action);
		return action ? action : (action = this.on_get_style_accessibility_action()) ? action : "";
	};
	_pComponent._getAccessibilityReadLabel = function () {
		var control = this.getElement();
		if (control && control.accessibility_readlabel) {
			return control.accessibility_readlabel;
		}
		return "";
	};

	_pComponent.on_get_style_accessibility_label = function () {
		var label = "";
		label = this.text ? this.text : this.value;
		return label;
	};

	_pComponent.on_get_style_accessibility_description = function () {
		return this.tooltiptext;
	};
	_pComponent.on_get_style_accessibility_action = function () {
		return "";
	};
	_pComponent._getLinkedLabel = function (label) {
		if (label) {
			if (label.match("@")) {
				var linkedId = label.substr(label.search("@") + 1, label.length);
				var linkedComp = this._getFormChildById(linkedId);
				if (linkedComp) {
					var linkedaccessibility = linkedComp.on_find_CurrentStyle_accessibility(linkedComp._pseudo);
					return linkedComp._getAccessibilityLabel(linkedaccessibility);
				}
				else {
					return;
				}
			}
		}
		return label;
	};

	_pComponent._getLinkedDescription = function (description) {
		if (description) {
			if (description.match("@")) {
				var linkedId = description.substr(description.search("@") + 1, description.length);
				var linkedComp = this._getFormChildById(linkedId);
				if (linkedComp) {
					var linkedaccessibility = linkedComp.on_find_CurrentStyle_accessibility(linkedComp._pseudo);
					return linkedComp._getAccessibilityDescription(linkedaccessibility);
				}
				else {
					return;
				}
			}
		}
		return description;
	};

	_pComponent._getDescLevel = function () {
		if (this != application) {
			var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
			if (accessibility) {
				var desclevel = accessibility.desclevel;
				var comp = this.parent;
				if (desclevel == "none" || desclevel == "self") {
					return "none";
				}
				else if (comp && comp._getDescLevel) {
					return comp._getDescLevel();
				}
			}
		}
		return "all";
	};

	_pComponent._getLinkedAction = function (action) {
		if (action) {
			if (action.match("@")) {
				var linkedId = action.substr(action.search("@") + 1, action.length);
				var linkedComp = this._getFormChildById(linkedId);
				if (linkedComp) {
					var linkedaccessibility = linkedComp.on_find_CurrentStyle_accessibility(linkedComp._pseudo);
					return linkedComp._getAccessibilityAction(linkedaccessibility);
				}
				else {
					return;
				}
			}
		}
		return action;
	};

	_pComponent._getFormChildById = function (id) {
		return this.parent[id];
	};

	_pComponent._getAccessibilityParentValue = function (accessibility) {
		var label = "";
		var type = nexacro._accessibilitydescreadtype;
		if ((type & 0x01) == 0x01) {
			var _label = this._getAccessibilityLabel(accessibility);
			if (_label) {
				label = _label;
			}
		}
		if ((type & 0x02) == 0x02 && this.accessibility_action) {
			var _action = " " + this._getAccessibilityAction(accessibility);
			if (_action) {
				label += _action;
			}
		}
		if ((type & 0x04) == 0x04 && this.accessibility_description) {
			var _description = " " + this._getAccessibilityDescription(accessibility);
			if (_description) {
				label += _description;
			}
		}
		return label;
	};

	_pComponent._make_accessibility_value = function (accessibility) {
		var desclevel = this._getAccessibilityDescLevel(accessibility.desclevel);
		var role = "none";
		var label = " ";
		var description = "";
		var action = "";

		if (accessibility.enable && (desclevel != "none" && desclevel != "child")) {
			role = this._getAccessibilityRole(accessibility);
			label = this._getAccessibilityLabel(accessibility);

			description = this._getAccessibilityDescription(accessibility);
			action = this._getAccessibilityAction(accessibility);
		}

		var enable = accessibility.enable ? "enable" : "disable";
		if (!role) {
			role = "none";
		}
		if (!label) {
			label = " ";
		}

		var val = role + " " + enable + " " + desclevel + " '" + label + "' '" + description + "' '" + action + "'";

		var realrole = nexacro._roleList[role];
		var cachedAccessibility = nexacro._getCachedStyleObj("accessibility", val);
		if (!cachedAccessibility._role || 
			cachedAccessibility.desclevel != accessibility.desclevel || 
			cachedAccessibility._role != realrole || 
			cachedAccessibility._label != label || 
			cachedAccessibility._description != description || 
			cachedAccessibility._action != action) {
			cachedAccessibility._role = nexacro._roleList[role];
			cachedAccessibility._label = label;
			cachedAccessibility._description = description;
			cachedAccessibility._action = action;
			cachedAccessibility._desclevel = desclevel;
			return cachedAccessibility;
		}
		else {
			return cachedAccessibility;
		}

		return accessibility;
	};

	_pComponent._refreshAccessibilityValue = function () {
		if (nexacro._enableaccessibility && (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5)) {
			var control_elem = this.getElement();
			var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
			if (accessibility && control_elem) {
				accessibility = this._make_accessibility_value(accessibility);
				control_elem.setAccessibility(accessibility);
			}
		}
	};

	_pComponent._setAccessibilityRole = nexacro._emptyFn;
	_pComponent._setAccessibilityLabel = nexacro._emptyFn;
	_pComponent._setAccessibilityEnable = nexacro._emptyFn;
	_pComponent._setAccessibilityDescription = nexacro._emptyFn;
	_pComponent._setAccessibilityDescLevel = nexacro._emptyFn;
	_pComponent._setAccessibilityStatDisabled = nexacro._emptyFn;
	_pComponent._setAccessibilityStatHidden = nexacro._emptyFn;
	_pComponent._setAccessibilityStatChecked = nexacro._emptyFn;
	_pComponent._setAccessibilityStatPressed = nexacro._emptyFn;
	_pComponent._setAccessibilityStatSelected = nexacro._emptyFn;
	_pComponent._setAccessibilityStatExpanded = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagHasPopup = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagFocusable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagReadOnly = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagPassword = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagMultiSelectable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagSelectable = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagDefaultButton = nexacro._emptyFn;
	_pComponent._setAccessibilityFlagMultiLine = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoCount = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoIndex = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueMax = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueMin = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoValueCur = nexacro._emptyFn;
	_pComponent._setAccessibilityInfoLevel = nexacro._emptyFn;
	_pComponent._setAccessibilityHotKey = nexacro._emptyFn;
	_pComponent._setAccessibilityActiveDescendant = nexacro._emptyFn;
	_pComponent._notifyAccessibility = nexacro._emptyFn;
	_pComponent._setAccessibilityStatFlag = nexacro._emptyFn;
	_pComponent._isAccessibilityEnable = nexacro._echoFn;
	_pComponent._isItemAccessibilityEnable = nexacro._echoFn;
	_pComponent._setAccessibilityValue = nexacro._emptyFn;
	_pComponent._setAccessibilityStatFocus = nexacro._emptyFn;
	_pComponent._getNextAccessibilityOrderIndex = nexacro._emptyFn;


	_pComponent._get_css_typename = function () {
		return this._type_name;
	};
	_pComponent._get_css_assumedtypename = function () {
		return this._type_name;
	};
	_pComponent._make_css_finder = function () {
		var _f;

		if (this._is_popup_frame) {
			_f = this;
		}
		else {
			_f = this._refform;
		}

		if (!_f) {
			return null;
		}
		else {
			if (_f._is_frame) {
				if (_f._is_popup_frame) {
					_f = this;
				}
				else {
					_f = application;
				}
			}
			else {
				while (_f && !_f._is_form) {
					if (_f._is_application) {
						break;
					}
					_f = _f.parent;
					if (!_f) {
						return null;
					}
				}
			}
		}

		var ref_finder = this._ref_css_finder;
		if (!ref_finder) {
			this._makeCssRefInfo();
		}

		var finder = this._css_finder;
		if (!finder) {
			var selectors = [];
			var flist = _f._find_csslist;
			if (!flist) {
				flist = _f._make_find_csslist();
			}
			var cnt = flist.length;

			var cls_name = "";
			var type_name = this._get_css_typename();
			var assumed_name = this._get_css_assumedtypename();

			var type_name2 = "";
			if (type_name != assumed_name) {
				type_name2 = assumed_name;
			}

			var cls_flag = false, id_flag = false;
			var type_flag = false, type_flag2 = false;

			var css;
			var css_id;
			var css_type;
			var css_cls;
			var css_typecls;

			var refid = this._refcssid;
			if (this._refcssid) {
				for (var i = 0; i < cnt; i++) {
					css = flist[i];
					css_id = css[refid];
					if (css_id) {
						selectors.push(css_id);
						id_flag = true;
					}
				}
			}

			cls_name = this.cssclass;
			if (cls_name) {
				cls_name = "." + cls_name;

				if (type_name2) {
					var typecls_name2 = type_name2 + cls_name;
					for (var i = 0; i < cnt; i++) {
						css = flist[i];
						css_typecls = css[typecls_name2];
						if (css_typecls) {
							selectors.push(css_typecls);
							type_flag2 = true;
							cls_flag = true;
						}
					}
				}

				if (type_name) {
					var typecls_name = type_name + cls_name;
					for (var i = 0; i < cnt; i++) {
						css = flist[i];
						css_typecls = css[typecls_name];
						if (css_typecls) {
							selectors.push(css_typecls);
							type_flag = true;
							cls_flag = true;
						}
					}
				}

				for (var i = 0; i < cnt; i++) {
					css = flist[i];
					css_cls = css[cls_name];
					if (css_cls) {
						selectors.push(css_cls);
						cls_flag = true;
					}
				}
			}

			if (type_name2) {
				for (var i = 0; i < cnt; i++) {
					css = flist[i];
					css_type = css[type_name2];
					if (css_type) {
						selectors.push(css_type);
						type_flag2 = true;
					}
				}
			}

			if (type_name) {
				for (var i = 0; i < cnt; i++) {
					css = flist[i];
					css_type = css[type_name];
					if (css_type) {
						selectors.push(css_type);
						type_flag = true;
					}
				}
			}

			var finder_name = "";
			if (cls_flag || id_flag || type_flag || type_flag2) {
				if (type_name2) {
					finder_name += type_name2;
				}
				else {
					finder_name += type_name;
				}
				if (id_flag) {
					finder_name += "_" + refid;
					this._cssfind_useid = true;
				}
				if (cls_flag) {
					finder_name += "_" + this.cssclass;
				}
			}

			if (!finder_name) {
				finder = {
				};
				finder._finder_name = type_name;
			}
			else {
				finder = _f._cssfinder_cache[finder_name];
				if (!finder) {
					finder = {
					};

					var pseudo, pitem;
					var len = selectors.length;
					for (var i = len - 1; i >= 0; i--) {
						var sel = selectors[i];
						for (var attr in sel) {
							if (!sel.hasOwnProperty(attr)) {
								continue;
							}
							var item = sel[attr];
							if (item._is_selector) {
								continue;
							}

							for (pseudo in item) {
								if (!item.hasOwnProperty(pseudo)) {
									continue;
								}
								pitem = item[pseudo];

								if (!finder[pseudo]) {
									finder[pseudo] = {
									};
								}
								finder[pseudo][attr] = pitem;
							}
						}
					}
					finder._finder_name = finder_name;
					finder._find_selectors = selectors;

					_f._cssfinder_cache[finder_name] = finder;
				}
			}
			this._css_finder = finder;
		}

		if (!ref_finder) {
			var parent = this._refcssobj;
			var id_name = this._refcssid;

			if (parent && parent._is_component && id_name) {
				if (!this._is_frame || (this._is_frame && !this._is_popup_frame)) {
					this._ref_css_finder = parent._make_refcss_finder(id_name, 4);
				}
			}
		}
		return finder;
	};


	_pComponent._make_refcss_finder = function (refid, recursive) {
		var _f;
		if (this._is_popup_frame) {
			_f = this;
		}
		else {
			_f = this._refform;
		}
		if (!_f) {
			return null;
		}

		this._makeCssRefInfo();
		var id_name = this._refcssid;
		var _refid = refid;
		var prefid = id_name ? (id_name + refid) : refid;
		var pref_finder = null;

		var parent = this._refcssobj;
		if (recursive-- > 0 && parent && parent._is_component && id_name) {
			if (!this._is_frame || (this._is_frame && !this._is_popup_frame)) {
				pref_finder = parent._make_refcss_finder(prefid, recursive);
			}
		}

		var finder = this._css_finder;
		var ref_name;

		if (!pref_finder) {
			if (!finder) {
				finder = this._make_css_finder();
			}

			if (this._cssfind_useid) {
				ref_name = finder._finder_name + "_" + prefid;
			}
			else {
				ref_name = finder._finder_name + "_" + _refid;
			}
		}
		else {
			if (this._cssfind_useid) {
				ref_name = pref_finder._finder_name + "_" + prefid;
			}
			else {
				ref_name = pref_finder._finder_name + "_" + _refid;
			}
		}

		var ref_finder = _f._cssfinder_cache[ref_name];
		if (!ref_finder) {
			var sub_selectors = [];

			if (pref_finder) {
				var pref_selectors = pref_finder._find_selectors;
				if (pref_selectors) {
					var css;
					var cnt = pref_selectors.length;
					for (var i = 0; i < cnt; i++) {
						css = pref_selectors[i];
						sub_selectors.push(css);
					}
				}
			}

			if (id_name) {
				var flist = _f._find_csslist;
				if (!flist) {
					flist = _f._make_find_csslist();
				}

				var css;
				var css_pid;
				var cnt = flist.length;
				for (var i = 0; i < cnt; i++) {
					css = flist[i];
					if (css_pid = css[prefid]) {
						sub_selectors.push(css_pid);
					}
				}
			}

			var selectors = finder._find_selectors;
			if (selectors) {
				var css, css2;
				var cnt = selectors.length;
				for (var i = 0; i < cnt; i++) {
					css = selectors[i];
					if (css2 = css[refid]) {
						sub_selectors.push(css2);
					}
				}
			}

			var pseudo, pitem;
			var len = sub_selectors.length;
			if (len > 0) {
				ref_finder = {
				};
				for (var i = len - 1; i >= 0; i--) {
					var sel = sub_selectors[i];
					for (var attr in sel) {
						if (attr.charAt(0) == '$') {
							continue;
						}
						var item = sel[attr];
						if (item._is_selector) {
							continue;
						}

						for (pseudo in item) {
							if (!item.hasOwnProperty(pseudo)) {
								continue;
							}
							pitem = item[pseudo];

							if (!ref_finder[pseudo]) {
								ref_finder[pseudo] = {
								};
							}
							ref_finder[pseudo][attr] = pitem;
						}
					}
				}
				if (this._cssfind_useid && this._is_component && this._is_subcontrol) {
					ref_name = finder._finder_name + "_" + "#" + this.parent.id + prefid;
				}
				ref_finder._finder_name = ref_name;
				ref_finder._find_selectors = sub_selectors;

				_f._cssfinder_cache[ref_name] = ref_finder;
			}
		}

		return ref_finder;
	};


	_pComponent._find_comp_pseudo_obj = function (styleProp, pseudo, returnType) {
		var r;
		var finder = this._css_finder;

		do {
			if (pseudo != "normal") {
				var po = this._styles[pseudo];
				if (po && (r = po[styleProp]) && (!r._is_empty)) {
					break;
				}

				var find_readonly = (this._readonly && pseudo != "readonly");
				if (find_readonly) {
					var ro = this._styles["readonly"];
					if (ro && (r = ro[styleProp]) && (!r._is_empty)) {
						break;
					}
				}

				var no = this.style;
				if ((r = no[styleProp]) && (!r._is_empty)) {
					break;
				}

				if (!finder) {
					finder = this._make_css_finder();
				}

				var ref_finder = this._ref_css_finder;

				var ref_finder_pseudo = (ref_finder ? ref_finder[pseudo] : null);
				if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				var finder_pseudo = (finder ? finder[pseudo] : null);
				if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				if (find_readonly) {
					ref_finder_pseudo = (ref_finder ? ref_finder["readonly"] : null);
					if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}

					finder_pseudo = (finder ? finder["readonly"] : null);
					if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}
				}

				ref_finder_pseudo = (ref_finder ? ref_finder["normal"] : null);
				if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				finder_pseudo = (finder ? finder["normal"] : null);
				if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}
			}
			else {
				if (this._readonly) {
					var ro = this._styles["readonly"];
					if (ro && (r = ro[styleProp]) && (!r._is_empty)) {
						break;
					}
				}

				var no = this.style;
				if ((r = no[styleProp]) && (!r._is_empty)) {
					break;
				}


				if (!finder) {
					finder = this._make_css_finder();
				}

				var ref_finder = this._ref_css_finder;
				var ref_finder_pseudo, finder_pseudo;

				if (this._readonly) {
					ref_finder_pseudo = (ref_finder ? ref_finder["readonly"] : null);
					if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}

					finder_pseudo = (finder ? finder["readonly"] : null);
					if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}
				}

				ref_finder_pseudo = (ref_finder ? ref_finder["normal"] : null);
				if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				finder_pseudo = (finder ? finder["normal"] : null);
				if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}
			}
		} while (false);

		if (r && !r._is_empty) {
			var foundType = r._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				r = nexacro._getCachedStyleObj(returnType, r._value);
			}
			return r;
		}
		return null;
	};
	_pComponent._find_comp_pseudo_obj_from_finder = function (styleProp, pseudo, returnType) {
		var r;
		var finder = this._css_finder;

		do {
			if (pseudo != "normal") {
				if (!finder) {
					finder = this._make_css_finder();
				}

				var ref_finder = this._ref_css_finder;

				var ref_finder_pseudo = (ref_finder ? ref_finder[pseudo] : null);
				if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				var finder_pseudo = (finder ? finder[pseudo] : null);
				if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				if (this._readonly && pseudo != "readonly") {
					ref_finder_pseudo = (ref_finder ? ref_finder["readonly"] : null);
					if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}

					finder_pseudo = (finder ? finder["readonly"] : null);
					if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}
				}

				ref_finder_pseudo = (ref_finder ? ref_finder["normal"] : null);
				if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				finder_pseudo = (finder ? finder["normal"] : null);
				if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}
			}
			else {
				if (!finder) {
					finder = this._make_css_finder();
				}

				var ref_finder = this._ref_css_finder;
				var ref_finder_pseudo, finder_pseudo;

				if (this._readonly) {
					ref_finder_pseudo = (ref_finder ? ref_finder["readonly"] : null);
					if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}

					finder_pseudo = (finder ? finder["readonly"] : null);
					if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
						break;
					}
				}

				ref_finder_pseudo = (ref_finder ? ref_finder["normal"] : null);
				if (ref_finder_pseudo && (r = ref_finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}

				finder_pseudo = (finder ? finder["normal"] : null);
				if (finder_pseudo && (r = finder_pseudo[styleProp]) && (!r._is_empty)) {
					break;
				}
			}
		} while (false);

		if (r && !r._is_empty) {
			var foundType = r._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				r = nexacro._getCachedStyleObj(returnType, r._value);
			}
			return r;
		}
		return null;
	};
	_pComponent._makeCssRefInfo = function () {
		if (!this._refcssobj) {
			var comp = this.parent;
			if (comp && comp._is_component) {
				this._refcssobj = comp;
			}
		}

		if (!this._refcssid && this.id) {
			this._refcssid = "#" + this.id;
		}

		return this._refcssobj;
	};

	_pComponent._find_ctrl_pseudo_obj = _pComponent._find_comp_pseudo_obj;
	_pComponent._find_typedctrl_pseudo_obj = _pComponent._find_comp_pseudo_obj;

	_pComponent._contains = function (oDescendant) {
		while (oDescendant) {
			if (oDescendant == this) {
				return true;
			}
			oDescendant = oDescendant.parent;
		}
		return false;
	};

	_pComponent._getRootComponent = function (component) {
		var comp = component;
		while (comp && (comp._is_subcontrol || !comp._is_component)) {
			if (comp == comp.parent) {
				return null;
			}
			comp = comp.parent;
		}
		return comp;
	};

	_pComponent._getPopupRootComponent = function (component) {
		var comp = component;
		while (comp && (comp._is_subcontrol || !comp._is_component) && !comp.popupwindow) {
			if (comp == comp.parent) {
				return null;
			}
			comp = comp.parent;
		}
		return comp;
	};

	_pComponent._getElementRootControl = function (element) {
		var control_elem = element;

		while (control_elem && !control_elem.linkedcontrol) {
			control_elem = control_elem.parent;
		}

		var comp = control_elem.linkedcontrol;

		while (comp && !comp._is_subcontrol) {
			if (comp == comp.parent) {
				break;
			}
			comp = comp.parent;
		}
		return comp;
	};

	_pComponent._getMainForm = function () {
		var comp = this;
		while (comp) {
			if (comp._is_frame) {
				return comp.form;
			}
			if (!comp._is_form && comp._refform) {
				comp = comp._refform;
			}
			else if (comp.parent) {
				comp = comp.parent;
			}
			else {
				if (comp._is_form) {
					return comp;
				}
				return null;
			}
		}

		return null;
	};

	_pComponent._getRootWindowComponent = function (component) {
		var comp = component ? component : this;
		while (comp) {
			if (comp._is_window) {
				return comp;
			}
			if (comp._isPopupVisible()) {
				return comp;
			}
			if (comp == comp.parent) {
				break;
			}
			comp = comp.parent;
		}
		return null;
	};

	_pComponent._isPopupVisible = function () {
		return false;
	};

	_pComponent._closePopup = function () {
		var popup = this.popupwindow;
		if (popup) {
			popup._closePopup();
		}
	};

	_pComponent._getReferenceComponent = function (component) {
		var comp = component;
		while (comp && !comp._is_reference_control) {
			if (comp == comp.parent) {
				return null;
			}
			comp = comp.parent;
		}
		return comp;
	};
	_pComponent._getReferenceContext = function () {
		return this._refform;
	};

	_pComponent._centerPopup = function (win, w, h) {
		var rootframe = this._getOwnerFrame();
		if (!rootframe) {
			return;
		}

		var rootwindow = rootframe._getWindow();
		rootframe = rootwindow ? rootwindow.frame : null;
		if (!rootframe) {
			return;
		}

		var pos = nexacro._getElementPositionInFrame(rootframe.getElement());
		var l = ((rootframe.width / 2) - (w / 2));
		var t = ((rootframe.height / 2) - (h / 2));
		t = t < 0 ? 0 : t;

		h = h > rootframe.height ? rootframe.height : h;
		win._popup((l + pos.x), (t + pos.y), w, h);
	};

	_pComponent._getPopupType = function () {
		var popuptype = this.on_find_CurrentStyle_popuptype(this._pseudo);
		if (!popuptype) {
			return application.popuptype;
		}
		return popuptype._value;
	};

	_pComponent._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		return {
			want_tab : false, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : false, 
			want_touchstart : false, 
			want_touchmove : false
		};
	};

	_pComponent.set_scrollbars = function (v) {
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
			this.scrollbars = v;
			if (this._control_element && this._is_created) {
				this._onResetScrollBar();
			}
		}
		return v;
	};

	_pComponent.on_vscroll = function (obj, e) {
		if (this.onvscroll && this.onvscroll._has_handlers) {
			e.fromobject = this;
			this.onvscroll._fireEvent(this, e);
		}
		return true;
	};
	_pComponent.on_hscroll = function (obj, e) {
		if (this.onhscroll && this.onhscroll._has_handlers) {
			e.fromobject = this;
			this.onhscroll._fireEvent(this, e);
		}
		return true;
	};

	_pComponent._onRecalcScrollSize = nexacro._emptyFn;

	_pComponent._onResetScrollBar = function () {
		if (!this._is_scrollable) {
			return;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			var new_hbar = false;
			var new_vbar = false;

			var scroll_default_size = nexacro.Component.SCROLLBAR_DEFAULT_SIZE;
			var hscroll_size = scroll_default_size;
			var vscroll_size = scroll_default_size;

			var show_type = 0;
			var bShowVScroll = false;
			var bShowHScroll = false;
			switch (this._scrollbars) {
				case 0:
					break;
				case 1:
					bShowVScroll = true;
					show_type = 1;
					break;
				case 2:
					bShowHScroll = true;
					show_type = 1;
					break;
				case 3:
					bShowVScroll = true;
					bShowHScroll = true;
					show_type = 1;
					break;
				case 4:
					bShowVScroll = true;
					show_type = 2;
					break;
				case 8:
					bShowHScroll = true;
					show_type = 2;
					break;
				case 12:
					bShowVScroll = true;
					bShowHScroll = true;
					show_type = 2;
					break;
				case 16:
					bShowVScroll = true;
					bShowHScroll = true;
					show_type = 31;
					break;
				case 32:
					bShowVScroll = true;
					bShowHScroll = true;
					show_type = 32;
					break;
			}

			if (bShowHScroll && !this.hscrollbar) {
				this.hscrollbar = this._createHScrollBar(scroll_default_size);
				if (this.hscrollbar.scrollbarsize > 0) {
					hscroll_size = this.hscrollbar.scrollbarsize;
					this.hscrollbar.resize(this._client_width, hscroll_size);
				}
				new_hbar = true;
			}
			else if (bShowHScroll && this.hscrollbar) {
				if (this.hscrollbar.scrollbarsize > 0) {
					hscroll_size = this.hscrollbar.scrollbarsize;
					this.hscrollbar.resize(this._client_width, hscroll_size);
					control_elem._hscroll_height = hscroll_size;
				}
			}
			else if (!bShowHScroll && this.hscrollbar) {
				this.hscrollbar.destroy();
				this.hscrollbar = null;
			}

			if (bShowVScroll && !this.vscrollbar) {
				this.vscrollbar = this._createVScrollBar(scroll_default_size);
				if (this.vscrollbar.scrollbarsize > 0) {
					vscroll_size = this.vscrollbar.scrollbarsize;
					this.vscrollbar.resize(vscroll_size, this._client_height);
				}
				new_vbar = true;
			}
			else if (bShowVScroll && this.vscrollbar) {
				if (this.vscrollbar.scrollbarsize > 0) {
					vscroll_size = this.vscrollbar.scrollbarsize;
					this.vscrollbar.resize(vscroll_size, this._client_height);
					control_elem._vscroll_width = vscroll_size;
				}
			}
			else if (!bShowVScroll && this.vscrollbar) {
				this.vscrollbar.destroy();
				this.vscrollbar = null;
			}

			control_elem.setScrollControls(this.hscrollbar, this.vscrollbar, hscroll_size, vscroll_size, show_type);

			if (new_hbar) {
				this.hscrollbar.createComponent();
			}
			if (new_vbar) {
				this.vscrollbar.createComponent();
			}

			if (control_elem._handle) {
				if (this.hscrollbar && !this.hscrollbar._is_created) {
					this.hscrollbar.on_created();
				}
				if (this.vscrollbar && !this.vscrollbar._is_created) {
					this.vscrollbar.on_created();
				}
			}

			this._updateClientSize(control_elem);
		}
	};

	_pComponent._cancelEvent = function (target_comp) {
	};

	_pComponent._createVScrollBar = function (scroll_size) {
		var vscrollbar = new nexacro.ScrollBarCtrl("vscrollbar", "absolute", 0, 0, scroll_size, this._client_width, null, null, this);
		vscrollbar._setDirection("vert");
		vscrollbar._setEventHandler("onscroll", this.on_vscroll, this);
		vscrollbar.on_update_style_scrollbarsize();
		return vscrollbar;
	};

	_pComponent._createHScrollBar = function (scroll_size) {
		var hscrollbar = new nexacro.ScrollBarCtrl("hscrollbar", "absolute", 0, 0, this._client_width, scroll_size, null, null, this);
		hscrollbar._setDirection("horz");
		hscrollbar._setEventHandler("onscroll", this.on_hscroll, this);
		hscrollbar.on_update_style_scrollbarsize();
		return hscrollbar;
	};

	_pComponent._isWheelScrollable = function (delta) {
		var control_elem = this._control_element;
		if (!control_elem) {
			return false;
		}

		var st = control_elem.scroll_top;
		var sh = control_elem.container_maxheight;
		var ch = this._client_height;

		if ((st + ch >= sh && delta < 0) || (st == 0 && delta > 0)) {
			return false;
		}
		return true;
	};

	_pComponent._getResultPseudo = function (status, pseudo) {
		if (pseudo == "") {
			pseudo = "normal";
		}
		return nexacro.Component._status_table[status + "_" + pseudo];
	};

	_pComponent.getCurrentPseudo = function () {
		return this._pseudo;
	};

	_pComponent.setCurrentPseudo = function (pseudo) {
		var prevPseudo = this._getResultPseudo(this._status, pseudo);
		if (prevPseudo) {
			this._stat_change(this.status, pseudo);
		}
		return prevPseudo;
	};

	_pComponent._stat_change = function (status, pseudo) {
		this.on_change_status(status, pseudo);
	};
	_pComponent.on_change_status = function (status, pseudo) {
		var ps;
		switch (status) {
			case "enable":
				if (this._status != "focus") {
					if (this._readonly) {
						this._status = "readonly";
					}
					else {
						this._status = "enable";
					}
				}
				break;
			case "disable":
				this._status = "disable";
				break;
			case "focus":
				if (this._status != "disable") {
					this._status = "focus";
				}
				break;
			case "notfocus":
				if (this._status != "disable") {
					if (this._readonly) {
						this._status = "readonly";
					}
					else {
						this._status = "enable";
					}
				}
				break;
			case "select":
				this._selected = true;
				break;
			case "notselect":
				this._selected = false;
				break;
			case "push":
				this._pushed = true;
				break;
			case "notpush":
				this._pushed = false;
				if (this._selected && pseudo == "normal") {
					pseudo = "selected";
				}
				break;
			case "readonly":
				if (!this._readonly) {
					this._readonly = true;
					this._control_pseudo = "";
					this._contents_pseudo = "";
				}
				if (this._status == "enable") {
					this._status = "readonly";
				}
				break;
			case "writable":
				if (this._readonly) {
					this._readonly = false;
					this._control_pseudo = "";
					this._contents_pseudo = "";
				}
				if (this._status == "readonly") {
					this._status = "enable";
				}
				break;
		}

		this.on_apply_pseudo(pseudo);

		this._setAccessibilityStatFlag(this._status, pseudo);
	};



	_pComponent.on_apply_custom_pseudo = function (pseudo) {
	};
	_pComponent.on_apply_pseudo = function (pseudo, is_only_contents) {
		var form = this.parent;
		var enable = (nexacro._is_enable_setting) ? this.enable : this.enable && this._real_enable;

		if (form && !form._is_application && this._getWindow() == form._getWindow()) {
			while (form != null) {
				if (!form._is_frame || (form._is_frame && !form._is_popup_frame)) {
					if (form._is_subcontrol == false) {
						if (form._real_enable == false || form.enable == false) {
							enable = false;
							break;
						}
					}

					if (form.parent && !form.parent._is_application && form._getWindow() != form.parent._getWindow()) {
						break;
					}

					form = form.parent;
				}
				else {
					break;
				}
			}
		}

		if (this._setEnable(enable)) {
			return;
		}

		this._pseudo = pseudo = this._getResultPseudo(this._status, pseudo);
		var control_elem = this._control_element;
		if (this.visible && control_elem) {
			if (!is_only_contents) {
				this._updateControl(control_elem, pseudo);
			}

			this._updateContents(control_elem, pseudo);
		}
	};

	_pComponent._find_pseudo_obj = _pComponent._find_comp_pseudo_obj;

	_pComponent.on_create_custom_style = function () {
		return new nexacro.Style(this);
	};
	_pComponent.on_create_custom_currentStyle = function () {
		return new nexacro.CurrentStyle(this);
	};

	_pComponent._updateCurrentStyle = function (styleProp) {
		var cur = this._find_pseudo_obj(styleProp, this._pseudo);
		if (cur) {
			if (cur != this.currentstyle[styleProp]) {
				this.currentstyle[styleProp] = cur;
				return true;
			}
		}
		return false;
	};


	_pComponent.on_find_CurrentStyle_background = function (pseudo) {
		return this._find_pseudo_obj("background", pseudo, "background");
	};
	_pComponent.on_find_CurrentStyle_border = function (pseudo) {
		return this._find_pseudo_obj("border", pseudo, "border");
	};
	_pComponent.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};
	_pComponent.on_find_CurrentStyle_gradation = function (pseudo) {
		return this._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pComponent.on_find_CurrentStyle_opacity = function (pseudo) {
		var opacity = this._find_pseudo_obj("opacity", pseudo, "opacity");
		return (opacity) ? opacity : nexacro.Component._default_opacity;
	};

	_pComponent.on_find_CurrentStyle_shadow = function (pseudo) {
		return this._find_pseudo_obj("shadow", pseudo, "shadow");
	};

	_pComponent.on_find_CurrentStyle_cursor = function (pseudo) {
		var cursor = "";
		if (!this._isEnable() && this.parent && !this.parent._is_application) {
			if (!this._is_subcontrol) {
				cursor = this.parent._find_pseudo_obj("cursor", pseudo, "cursor");
			}
			else {
				var p = this.parent;
				while (p && p._is_form) {
					p = p.parent;
				}

				if (p) {
					cursor = p._find_pseudo_obj("cursor", pseudo, "cursor");
				}
				else {
					cursor = null;
				}
			}
		}
		else {
			cursor = this._find_pseudo_obj("cursor", pseudo, "cursor");
		}

		return (cursor) ? cursor : nexacro.Component._default_cursor;
	};

	_pComponent.on_find_CurrentStyle_margin = function (pseudo) {
		var margin = this._find_pseudo_obj("margin", pseudo, "margin");
		return (margin) ? margin : nexacro.Component._default_margin;
	};

	_pComponent.on_find_CurrentStyle_padding = function (pseudo) {
		var padding = this._find_pseudo_obj("padding", pseudo, "padding");
		return (padding) ? padding : nexacro.Component._default_padding;
	};
	_pComponent.on_find_CurrentStyle_align = function (pseudo) {
		var align = this._find_pseudo_obj("align", pseudo, "align");
		return (align) ? align : nexacro.Component._default_align;
	};

	_pComponent.on_find_CurrentStyle_font = function (pseudo) {
		var font = this._find_pseudo_obj("font", pseudo, "font");
		if (!font) {
			font = this._find_inherit_pseudo_obj("font", pseudo, "font");
		}
		return (font) ? font : nexacro.Component._default_font;
	};
	_pComponent.on_find_CurrentStyle_color = function (pseudo) {
		var color = this._find_pseudo_obj("color", pseudo, "color");
		if (!color) {
			color = this._find_inherit_pseudo_obj("color", pseudo, "color");
		}
		return (color) ? color : nexacro.Component._default_color;
	};

	_pComponent.on_find_CurrentStyle_accessibility = function (pseudo) {
		var accessibility = this._find_pseudo_obj("accessibility", pseudo, "accessibility");
		return accessibility ? accessibility : nexacro.Component._default_accessibility;
	};

	_pComponent.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		var rtlimagemirroring = this._find_pseudo_obj("rtlimagemirroring", pseudo, "rtlimagemirroring");

		return rtlimagemirroring ? rtlimagemirroring : nexacro.Component._default_rtlimagemirroring;
	};

	_pComponent.on_find_CurrentStyle_letterspace = function (pseudo) {
		var letterspace = this._find_pseudo_obj("letterspace", pseudo, "letterspace");

		return letterspace ? letterspace : nexacro.Component._default_letterspace;
	};

	_pComponent._find_inherit_pseudo_obj = function (styleProp, pseudo, returnType) {
		var obj = this._find_pseudo_obj(styleProp, pseudo, returnType);
		if (!obj) {
			var refcssobj = this._refcssobj;
			if (!refcssobj) {
				refcssobj = this._makeCssRefInfo();
			}
			if (refcssobj && refcssobj._is_component) {
				obj = refcssobj._find_inherit_pseudo_obj(styleProp, pseudo, returnType);
			}
		}

		if (obj && !obj._is_empty) {
			var foundType = obj._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				obj = nexacro._getCachedStyleObj(returnType, obj._value);
			}
		}
		return obj;
	};

	_pComponent.on_find_CurrentStyle_glow = function () {
	};
	_pComponent.on_find_CurrentStyle_blur = function () {
	};

	_pComponent.on_update_style_margin = function () {
		this.on_apply_style_margin(this.currentstyle.margin = this.on_find_CurrentStyle_margin(this._pseudo));
	};

	_pComponent.on_update_style_border = function () {
		this.on_apply_style_border(this.currentstyle.border = this.on_find_CurrentStyle_border(this._pseudo));
	};
	_pComponent.on_update_style_bordertype = function () {
		this.on_apply_style_bordertype(this.currentstyle.bordertype = this.on_find_CurrentStyle_bordertype(this._pseudo));
	};
	_pComponent.on_update_style_background = function () {
		this.on_apply_style_background(this.currentstyle.background = this.on_find_CurrentStyle_background(this._pseudo));
	};
	_pComponent.on_update_style_gradation = function () {
		this.on_apply_style_gradation(this.currentstyle.gradation = this.on_find_CurrentStyle_gradation(this._pseudo));
	};

	_pComponent.on_update_style_opacity = function () {
		this.on_apply_style_opacity(this.currentstyle.opacity = this.on_find_CurrentStyle_opacity(this._pseudo));
	};
	_pComponent.on_update_style_shadow = function () {
		this.on_apply_style_shadow(this.currentstyle.shadow = this.on_find_CurrentStyle_shadow(this._pseudo));
	};
	_pComponent.on_update_style_cursor = function () {
		this.on_apply_style_cursor(this.currentstyle.cursor = this.on_find_CurrentStyle_cursor(this._pseudo));
	};

	_pComponent.on_update_style_padding = function () {
		var padding = this.currentstyle.padding = this.on_find_CurrentStyle_padding(this._pseudo);

		if (this._apply_client_padding) {
			var control_elem = this._control_element;
			control_elem.setElementPadding(padding);
			this._updateClientSize(control_elem);
		}
		else {
			this.on_apply_style_padding(padding);
		}
	};

	_pComponent.on_update_style_align = function () {
		this.on_apply_style_align(this.currentstyle.align = this.on_find_CurrentStyle_align(this._pseudo));
	};

	_pComponent.on_update_style_font = function () {
		this.on_apply_style_font(this.currentstyle.font = this.on_find_CurrentStyle_font(this._pseudo));
	};
	_pComponent.on_update_style_color = function () {
		this.on_apply_style_color(this.currentstyle.color = this.on_find_CurrentStyle_color(this._pseudo));
	};

	_pComponent.on_update_style_accessibility = function () {
		var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
		this.on_apply_style_accessibility(this.currentstyle.accessibility = this._make_accessibility_value(accessibility));
	};

	_pComponent.on_update_style_rtlimagemirroring = function () {
		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(this._pseudo);
		this.on_apply_style_rtlimagemirroring(this.currentstyle.rtlimagemirroring = rtlimagemirroring);
	};

	_pComponent.on_update_style_letterspace = function () {
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
		this.on_apply_style_letterspace(this.currentstyle.letterspace = letterspace);
	};

	_pComponent.on_update_style_glow = function () {
	};
	_pComponent.on_update_style_blur = function () {
	};

	_pComponent.on_apply_style_margin = function (margin) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem && this._margin != margin) {
			this._margin = margin;
			this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._client_width, this.parent._client_height);
			control_elem.setElementVisible(this.visible);
			control_elem.setElementPosition(this._adjust_left, this._adjust_top);
			control_elem.setElementSize(this._adjust_width, this._adjust_height);
		}
	};

	_pComponent.on_apply_style_border = function (border) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			control_elem.setElementBorder(border, curstyle.bordertype);
			control_elem.setElementBackground(curstyle.background, curstyle.gradation);
			this._updateClientSize(control_elem);
		}
	};

	_pComponent.on_apply_style_bordertype = function (bordertype) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			control_elem.setElementBorder(curstyle.border, bordertype);
			control_elem.setElementBackground(curstyle.background, curstyle.gradation);
			this._updateClientSize(control_elem);
		}
	};

	_pComponent.on_apply_style_background = function (background) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBackground(background, this.currentstyle.gradation);
		}
	};

	_pComponent.on_apply_style_gradation = function (gradation) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementBackground(this.currentstyle.background, gradation);
		}
	};

	_pComponent.on_apply_style_opacity = function (opacity) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementOpacity(opacity);
		}
	};

	_pComponent.on_apply_style_shadow = function (shadow) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem) {
			shadow = (shadow == undefined) ? nexacro.Component._default_shadow : shadow;
			control_elem.setElementShadow(shadow);
		}
	};

	_pComponent.on_apply_style_cursor = function (cursor) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementCursor(cursor);
		}
	};

	_pComponent.on_apply_style_control_padding = function (padding) {
		if (!this._isEnableRedraw()) {
			return;
		}
		var control_elem = this._control_element;
		if (control_elem && padding) {
			control_elem.setElementPadding(padding);
		}
	};

	_pComponent.on_apply_style_accessibility = function (accessibility) {
		var control_elem = this._control_element;
		if (control_elem && accessibility) {
			control_elem.setAccessibility(accessibility);
		}
	};

	_pComponent.on_apply_style_rtlimagemirroring = function (rtlimagemirroring) {
		var control_elem = this._control_element;
		var img_elem = this._img_elem;

		if (control_elem && rtlimagemirroring) {
			control_elem.setElementImageMirror(rtlimagemirroring);

			if (img_elem) {
				img_elem.setElementImageMirror(rtlimagemirroring);
			}
		}
	};

	_pComponent.on_apply_style_letterspace = function (letterspace) {
		var elem = this._text_elem;
		if (elem && letterspace) {
			elem.setElementLetterSpace(letterspace);
		}
	};

	_pComponent.on_apply_style_padding = function (padding) {
	};
	_pComponent.on_apply_style_align = function (align) {
	};
	_pComponent.on_apply_style_font = function (font) {
	};
	_pComponent.on_apply_style_color = function (color) {
	};

	_pComponent.on_apply_style_glow = function (glow) {
	};
	_pComponent.on_apply_style_blur = function (blur) {
	};
	_pComponent.on_apply_custom_class = function () {
	};

	_pComponent.on_apply_text = function () {
	};
	_pComponent.on_apply_expr = function () {
	};
	_pComponent.on_apply_prop_enable = function (v) {
		if (this._is_scrollable == true) {
			if (this.vscrollbar) {
				this.vscrollbar._setEnable(v);
			}
			if (this.hscrollbar) {
				this.hscrollbar._setEnable(v);
			}
		}
	};

	_pComponent.on_apply_prop_class = function () {
		this.currentstyle._empty();
		this._css_finder = null;
		this._ref_css_finder = null;

		this._control_pseudo = "";
		this._contents_pseudo = "";
		this._cssfinder_cache = {
		};

		var pseudo = (!this._pseudo) ? "normal" : this._pseudo;

		if (this.vscrollbar) {
			this.vscrollbar.on_apply_prop_class();
		}
		if (this.hscrollbar) {
			this.hscrollbar.on_apply_prop_class();
		}

		this._onResetScrollBar();


		this.on_apply_pseudo(pseudo);

		this.on_apply_custom_class(pseudo);
	};

	_pComponent.on_apply_prop_taborder = function () {
		if (this.tabstop) {
			this._setAccessibilityFlagFocusable(this._taborder >= 0 ? true : false);
		}
	};

	_pComponent.on_apply_custom_setfocus = function (evt_name) {
		var control_elem = this._control_element;
		if (control_elem) {
			var selffocus = ((evt_name == "lbutton") ? false : nexacro._enableaccessibility);
			control_elem.setElementFocus(selffocus);
		}
	};

	_pComponent.on_apply_prop_tooltip = function () {
		var control_elem = this._control_element;
		if (control_elem && !this._is_subcontrol) {
			control_elem.setElementToolTip(this.tooltiptext, this.tooltiptype);
		}
	};

	_pComponent.on_apply_prop_rtldirection = function () {
		var control_elem = this._control_element;
		var _rtldirection = this._rtldirection;

		if (control_elem) {
			control_elem.setElementRtlDirection(_rtldirection);
		}
	};

	_pComponent.on_apply_locale = nexacro._emptyFn;


	_pComponent.on_create_contents = function () {
	};

	_pComponent.on_created_contents = function () {
	};
	_pComponent.on_destroy_contents = function () {
	};
	_pComponent.on_created = function (_window) {
		if (!this._is_loading) {
			var parent_elem = null;
			if (!this._is_window) {
				parent_elem = this.parent ? this.parent._control_element : null;
				if (!parent_elem) {
					return false;
				}
			}

			if (!_window) {
				_window = this._getWindow();
			}

			var control_elem = this._control_element;
			var enable = this._isEnable();


			if ((this._real_enable == null && enable == false) || (this._real_enable && this._real_enable != enable)) {
				this._real_enable = enable;
				this._stat_change(enable ? "enable" : "disable", this._pseudo);
				this.on_apply_prop_enable(enable);
			}
			else {
				this._real_enable = enable;
			}

			if (control_elem) {
				control_elem.create(_window);
				if (!control_elem._handle) {
					return;
				}
			}

			if (!this._is_subcontrol) {
				this._registerHotkey();
			}

			if (this._is_created != true) {
				this.on_created_contents();
			}

			this._is_created = true;

			if (this._is_subcontrol) {
				nexacro._addSubComponent(this);
			}
		}
	};

	_pComponent.on_change_containerPos = function (left, top) {
	};
	_pComponent.on_change_containerRect = function (width, height) {
	};

	_pComponent.on_create_normal_control_element = function (parent_elem) {
		var control_elem = new nexacro.ControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_scrollable_control_element = function (parent_elem) {
		var control_elem = new nexacro.ScrollableControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_frame_control_element = function (parent_elem) {
		var control_elem = new nexacro.FrameControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_tablecell_control_element = function (parent_elem) {
		var control_elem = new nexacro.CellControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_simple_control_element = function (parent_elem) {
		var control_elem = new nexacro.SimpleControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_popup_control_element = function (parent_elem) {
		var control_elem = new nexacro.PopupControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_popupscrollable_control_element = function (parent_elem) {
		var control_elem = new nexacro.PopupScrollableControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_band_control_element = function (parent_elem) {
		var control_elem = new nexacro.BandControlElement(parent_elem, this._is_band_vert_paging);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};
	_pComponent.on_create_area_scroll_control_element = function (parent_elem) {
		var control_elem = new nexacro.ScrollableAreaControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	_pComponent.on_create_control_element = function (parent_elem) {
		var control_elem = null;
		if (this._is_simple_control) {
			control_elem = this.on_create_simple_control_element(parent_elem);
		}
		else if (this._is_tablecell) {
			control_elem = this.on_create_tablecell_control_element(parent_elem);
		}
		else if (this._is_frame) {
			control_elem = this.on_create_frame_control_element(parent_elem);
		}
		else if (this._is_scrollable) {
			control_elem = this.on_create_scrollable_control_element(parent_elem);
		}
		else if (this._is_band_control) {
			control_elem = this.on_create_band_control_element(parent_elem);
		}
		else if (this._is_area_scroll) {
			this._is_scrollable = true;
			control_elem = this.on_create_area_scroll_control_element(parent_elem);
		}
		else if (this._is_popup_control) {
			control_elem = this.on_create_popup_control_element(parent_elem);
		}
		else {
			control_elem = this.on_create_normal_control_element(parent_elem);
		}

		return control_elem;
	};


	_pComponent.createComponent = function (bCreateOnly) {
		var parent_elem = null;
		if (!this._is_window) {
			parent_elem = this.parent ? this.parent._control_element : null;
			if (!parent_elem) {
				return false;
			}
		}

		var control_elem = this._control_element;
		if (!control_elem) {
			control_elem = this.on_create_control_element(parent_elem);
			if (this._is_nc_control) {
				control_elem._is_nc_element = true;
			}

			var pseudo = this._getResultPseudo(this._status, this._pseudo);
			this._initControl(control_elem, pseudo);
			this._initContents(control_elem, pseudo);

			if (this.text || this.expr) {
				this.on_apply_text();
			}
			if (this._taborder >= 0) {
				this.on_apply_prop_taborder();
			}
			if (this.tooltiptext) {
				this.on_apply_prop_tooltip();
			}

			this.on_apply_positionstep(this.positionstep);

			if (!bCreateOnly && parent_elem && parent_elem._handle) {
				var window = this._getWindow();
				this.on_created(window);
			}
		}

		return true;
	};

	_pComponent.destroyComponent = function () {
		if (!this._is_alive) {
			return;
		}

		this._is_alive = false;
		if (!this._is_subcontrol) {
			this._unregisterHotkey();
		}

		if (nexacro._enableaccessibility) {
			if (application._accessibilityHistoryList) {
				application._remove_accessibility_history(this);
			}
		}

		this._clearEventListeners();

		if (this.parent && this.parent._overedobj && this.parent._overedobj == this) {
			this.parent._overedobj = null;
		}

		if (this.parent && this.parent.removeChild) {
			this.parent.removeChild(this.id);
		}
		else {
			var win = this._getWindow();
			if (win) {
				win._removeFromCurrentFocusPath(this);
			}
		}
		if (this._control_element) {
			this._control_element.destroy();
			this._control_element = null;
		}

		if (this.vscrollbar) {
			this.vscrollbar.destroy();
			this.vscrollbar = null;
		}
		if (this.hscrollbar) {
			this.hscrollbar.destroy();
			this.hscrollbar = null;
		}

		this.on_destroy_contents();

		if (this._subctrlitems) {
			nexacro._deleteAllSubComponent(this);
		}

		if (this._is_subcontrol && this.parent && this.parent._subctrlitems) {
			nexacro._deleteSubComponent(this, this.parent);
		}

		this._is_created = false;

		if (this._refform) {
			this._refform = null;
		}
		if (this.parent) {
			this.parent = null;
		}
		if (this._refobj) {
			this._refobj = null;
		}


		if (this.hotkey) {
			this.hotkey = null;
		}
		if (this.rtldirection) {
			this.rtldirection = null;
		}
		if (this._refcssobj) {
			this._refcssobj = null;
		}
		if (this._overedobj) {
			this._overedobj = null;
		}
		if (this._event_list) {
			this._event_list = null;
		}
		if (this._last_focused) {
			this._last_focused = null;
		}

		this._delete_style();

		if (this.currentstyle) {
			this.currentstyle._empty();
			this.currentstyle = null;
		}
		this._css_finder = null;
		this._ref_css_finder = null;

		this._enable_redraw_history = null;

		return true;
	};

	_pComponent._delete_style = function () {
		if (this.style) {
			this.style.destroy();
			this.style = null;
		}

		if (this._styles) {
			var styles = this._styles;
			for (var pseudo in styles) {
				var style = styles[pseudo];
				if (style.destroy) {
					style.destroy();
					style = null;
				}
			}
			this._styles = null;
		}
	};

	_pComponent._initControl = function (control_elem, pseudo) {
		var visible = this.visible;
		if (!this.visible) {
			control_elem.setElementVisible(false);
		}
		else {
			control_elem.setElementVisible(true);
		}

		var margin = this.on_find_CurrentStyle_margin(pseudo);
		var curstyle = this.currentstyle;
		if (margin && margin != curstyle.margin) {
			curstyle.margin = margin;
			this._margin = margin;
		}

		if (this.parent) {
			this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._client_width || this.parent._init_width, this.parent._client_height || this.parent._init_height);
		}
		else {
			this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
		}

		control_elem.setElementPosition(this._adjust_left, this._adjust_top);
		control_elem.setElementSize(this._adjust_width, this._adjust_height);

		this._updateControl(control_elem, pseudo);
	};

	_pComponent._isEnableRedraw = function () {
		var comp = this._getFromComponent(this);

		if (!comp.enableredraw) {
			if (!comp._enable_redraw_history["common_updatestyle"]) {
				comp._enable_redraw_history["common_updatestyle"] = [];
			}

			this._is_applyenableredraw = false;
			comp._enable_redraw_history["common_updatestyle"].push(this);
		}
		return comp.enableredraw;
	};

	_pComponent._updateCursor = function (cursor) {
		if (nexacro._cur_track_info || nexacro._cur_extra_track_info) {
			return;
		}

		var curstyle = this.currentstyle;

		if (!cursor) {
			cursor = this.on_find_CurrentStyle_cursor(this._pseudo);
		}

		curstyle.cursor = cursor;
		this._control_element.setElementCursor(cursor);

		cursor = null;
	};

	_pComponent._updateControl = function (control_elem, pseudo) {
		if (!this._isEnableRedraw()) {
			return;
		}
		if (nexacro._cur_track_info && pseudo == "mouseover") {
			return;
		}

		var apply_element = false;
		if (this._adjust_width != 0 && this._adjust_height != 0) {
			apply_element = true;
		}

		if (control_elem && this._control_pseudo != pseudo) {
			this._control_pseudo = pseudo;
			var curstyle = this.currentstyle;

			var border = this.on_find_CurrentStyle_border(pseudo);
			var bordertype = this.on_find_CurrentStyle_bordertype(pseudo);
			var background = this.on_find_CurrentStyle_background(pseudo);
			var gradation = this.on_find_CurrentStyle_gradation(pseudo);

			var background_flag = (background != curstyle.background);
			var bordertype_flag = (bordertype != curstyle.bordertype);
			var border_flag = (border != curstyle.border);
			var gradation_flag = (gradation != curstyle.gradation);

			if (border_flag || bordertype_flag || background_flag || gradation_flag) {
				this._apply_client_border = border_flag;
				curstyle.bordertype = bordertype;
				curstyle.border = border;
				curstyle.background = background;
				curstyle.gradation = gradation;

				if (apply_element) {
					control_elem.setElementBorder(border, bordertype);
					control_elem.setElementBackground(background, gradation);
				}
			}

			border = bordertype = background = gradation = null;
			background_flag = bordertype_flag = border_flag = gradation_flag = null;

			var opacity = this.on_find_CurrentStyle_opacity(pseudo);
			if (opacity && opacity != curstyle.opacity) {
				curstyle.opacity = opacity;
				if (apply_element) {
					control_elem.setElementOpacity(opacity);
				}
			}
			opacity = null;

			var shadow = this.on_find_CurrentStyle_shadow(pseudo);
			if (shadow && shadow != curstyle.shadow) {
				curstyle.shadow = shadow;
				if (apply_element) {
					control_elem.setElementShadow(shadow);
				}
			}
			shadow = null;

			if (!nexacro._cur_track_info && !nexacro._cur_extra_track_info) {
				var cursor = this.on_find_CurrentStyle_cursor(pseudo);
				if (cursor && cursor != curstyle.cursor) {
					curstyle.cursor = cursor;
					if (apply_element) {
						control_elem.setElementCursor(cursor);
					}
				}
				cursor = null;
			}

			if (nexacro._enableaccessibility) {
				var accessibility = this.on_find_CurrentStyle_accessibility(pseudo);
				if (accessibility && accessibility != curstyle.accessibility) {
					curstyle.accessibility = this._make_accessibility_value(accessibility);
					if (apply_element) {
						control_elem.setAccessibility(curstyle.accessibility);
					}
				}
				accessibility = null;
			}

			if (this._apply_client_padding) {
				var padding = this.on_find_CurrentStyle_padding(pseudo);
				if (padding && padding != curstyle.padding) {
					curstyle.padding = padding;
					if (apply_element) {
						control_elem.setElementPadding(padding);
					}
				}
				padding = null;
			}
			if (apply_element) {
				this._updateClientSize(control_elem);
			}

			curstyle = null;
			return true;
		}
		return false;
	};

	_pComponent._initContents = function (control_elem, pseudo) {
		if (this._contents_pseudo != pseudo) {
			this._contents_pseudo = pseudo;
			var curstyle = this.currentstyle;


			this.on_apply_custom_pseudo(pseudo);

			this.on_create_contents();
			this._is_created_contents = true;

			if (this._has_dirty_pos) {
				this.on_change_containerPos(this._adjust_left, this._adjust_top);
				this._has_dirty_pos = false;
			}
			if (this._has_dirty_rect) {
				this.on_change_containerRect(this._client_width, this._client_height);
				this._has_dirty_rect = false;
			}
		}
		this._is_loading = false;
	};

	_pComponent._updateContents = function (control_elem, pseudo) {
		if (!this._isEnableRedraw()) {
			return;
		}
		if (nexacro._cur_track_info && pseudo == "mouseover") {
			return;
		}

		if (this._contents_pseudo != pseudo && this._adjust_width != 0 && this._adjust_height != 0) {
			this._contents_pseudo = pseudo;
			var curstyle = this.currentstyle;

			this.on_apply_custom_pseudo(pseudo);
		}
	};

	_pComponent._updateClientSize = function (control_elem) {
		var client_left = control_elem.client_left;
		var client_top = control_elem.client_top;
		var client_width = control_elem.client_width;
		var client_height = control_elem.client_height;

		if (this._client_left != client_left || this._client_top != client_top) {
			this._client_left = client_left;
			this._client_top = client_top;

			if (this._is_created_contents) {
				this.on_change_containerPos(client_left, client_top);
			}
			else {
				this._has_dirty_pos = true;
			}
		}

		if (this._client_width != client_width || this._client_height != client_height) {
			this._client_width = client_width;
			this._client_height = client_height;

			if (this._is_created_contents) {
				this.on_change_containerRect(client_width, client_height);
				nexacro._redrawVMLBorder(this);
			}
			else {
				this._has_dirty_rect = true;
			}
		}
	};

	_pComponent._applyZoomPopup = nexacro._emptyFn;

	_pComponent.on_update_position = function (resize_flag, move_flag) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(this._adjust_left, this._adjust_top);
			if (!isNaN(this._adjust_width) || !isNaN(this._adjust_height)) {
				control_elem.setElementSize(this._adjust_width, this._adjust_height);
			}
			this._updateClientSize(control_elem);
			if (move_flag) {
				this.on_fire_onmove(this._adjust_left, this._adjust_top);
			}
			if (resize_flag) {
				this.on_fire_onsize(this._adjust_width, this._adjust_height);
			}
		}
	};

	_pComponent._applysetPosition = function (left, top, width, height) {
		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;

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
	};

	_pComponent.set_positionstep = function (v) {
		if (v === "" || v === null || v === undefined) {
			v = 0;
		}
		else {
			v = parseInt(v) | 0;
		}

		if (this.positionstep !== v) {
			this._beforepositionstep = this.positionstep;
			this.positionstep = v;
			this.on_apply_positionstep(v);
		}
	};

	_pComponent.on_apply_positionstep = function (index) {
		var control_elem = this.getElement();
		if (control_elem) {
			if (index == null) {
				index = 0;
			}
			control_elem.setElementPositionStep(index);
		}
	};

	_pComponent.set_style = function (v) {
		v = nexacro._decodeXml(v);

		var blocks = v.split("}");
		var s = blocks[0].trim();

		var _styles = this._styles = {
		};

		blocks.pop();

		var i, len = blocks.length;
		var definition_block, pseudo, normal_style;

		definition_block = s.split("{");
		normal_style = definition_block[0].substring(0, definition_block[0].lastIndexOf(";") + 1).trim();

		if (normal_style.length == 0) {
			normal_style = definition_block[0].substring(0, definition_block[0].length).trim();
		}

		var change = (this.style._value != normal_style);
		if (change) {
			this.style._setValue(normal_style);
		}

		if (len > 0) {
			for (i = 0; i < len; i++) {
				definition_block = blocks[i].split("{");
				pseudo = definition_block[0].substring(definition_block[0].lastIndexOf(":") + 1).trim();
				var style2 = this.on_create_custom_style();
				style2._setValue(definition_block[1]);
				_styles[pseudo] = style2;
			}
		}
		if (change) {
			this.currentstyle._empty();
			this._control_pseudo = "";
			this._contents_pseudo = "";
			this.on_apply_pseudo(this._pseudo);
		}
		return this.style._value;
	};


	_pComponent.set_name = function (v) {
		this.name = v;
	};

	_pComponent.set_text = function (v) {
		var val = nexacro._toString(v);
		if (val != this.text) {
			this.text = val;
			this._display_text = val;
			this.on_apply_text();
		}
	};

	_pComponent.set_expr = function (v) {
		var val = nexacro._toString(v);
		if (val != this.expr) {
			this.expr = val;
			this.on_apply_expr();
		}
	};



	_pComponent.set_cssclass = function (cssname) {
		if (cssname != this.cssclass) {
			this.cssclass = cssname;
			if (this.parent) {
				if (this._is_created) {
					this.on_apply_prop_class();
				}
			}
		}
	};



	_pComponent.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		var control_elem = this._control_element;
		v = nexacro._toBoolean(v);
		if (this.visible != v) {
			var _window = this._getWindow();
			var newfocus_comp;
			if (!v && this._is_created && this.parent) {
				if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
					var _form = this._getForm();
					var cur_tabstop = this.tabstop;
					this.tabstop = false;
					newfocus_comp = _form._searchNextTabFocus();
					this.tabstop = cur_tabstop;
				}
			}

			this.visible = v;
			if (control_elem) {
				control_elem.setElementVisible(v);
				this._setAccessibilityStatHidden(!v);


				if (this.visible) {
					nexacro._resetVML(this);



					var parent = this.parent;
					if (!this._is_subcontrol && this._is_created && parent && parent._is_created) {
						if (_window && _window._focus_list && _window._indexOfCurrentFocusPaths(parent) == _window._getCurrentFocusPathsLength() - 1) {
							this._on_focus(true);
						}
					}
					this.on_apply_pseudo(this._pseudo);
				}
				else {
					var parent = this.parent;

					if (!this._is_subcontrol && parent) {
						if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
							_window._removeFromCurrentFocusPath(this, false);
							if (newfocus_comp && newfocus_comp[0]) {
								newfocus_comp[0]._on_focus(true);
							}
						}
					}
				}
			}
		}
	};

	nexacro._is_enable_setting = false;
	_pComponent.set_enable = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enable != v) {
			var _window = this._getWindow();
			var newfocus_comp;
			if (!this._is_subcontrol && !v && this._is_created && this.parent) {
				if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
					var _form = this._getForm();
					var cur_tabstop = this.tabstop;
					this.tabstop = false;
					newfocus_comp = _form._searchNextTabFocus();
					this.tabstop = cur_tabstop;
				}
			}

			var control_elem = this._control_element;
			this.enable = v;

			if (this._is_created) {
				var enable_flag = v;
				if (this.parent && this.parent._real_enable) {
					enable_flag = this.parent._real_enable && v;
				}

				if (this._real_enable != enable_flag) {
					nexacro._is_enable_setting = true;
					this._setEnable(enable_flag);
					nexacro._is_enable_setting = false;
					var parent = this.parent;
					if (!this._is_subcontrol && this._is_created && parent && parent._is_created) {
						if (enable_flag) {
							if (_window && _window._indexOfCurrentFocusPaths(parent) == _window._getCurrentFocusPathsLength() - 1
								 && !parent._last_focused) {
								this._on_focus(true);
							}
						}
						else {
							if (_window && _window._indexOfCurrentFocusPaths(this) > -1) {
								_window._removeFromCurrentFocusPath(this, false);
								if (newfocus_comp && newfocus_comp[0]) {
									newfocus_comp[0]._on_focus(true);
								}
							}
						}
					}
				}
			}
		}
	};
	_pComponent._is_enable_changing = false;
	_pComponent._setEnable = function (v) {
		if (this._is_enable_changing) {
			return false;
		}

		var enable_flag = (v && this.enable);
		if (this._real_enable != enable_flag) {
			var control_elem = this._control_element;
			this._real_enable = enable_flag;

			if (enable_flag) {
				this._status = "enable";
				this._pseudo = "normal";
			}
			else {
				this._status = "disable";
				this._pseudo = "disabled";
			}

			this._is_enable_changing = true;
			this._stat_change(this._status, this._pseudo);
			this._is_enable_changing = false;

			this.on_apply_prop_enable(this._real_enable);

			return true;
		}
		return false;
	};

	_pComponent.set_taborder = function (v) {
		if (v >= 0 && v != this.taborder) {
			this.taborder = v;
			this._taborder = ((+v) != (+v)) ? -1 : parseInt(v);
			this.on_apply_prop_taborder();
		}
		return v;
	};

	_pComponent.set_tabstop = function (v) {
		v = nexacro._toBoolean(v);
		if (this.tabstop) {
			if (!v) {
				this.tabstop = v;
				this.on_apply_prop_taborder();
			}
		}
		else {
			if (v) {
				this.tabstop = v;
				this.on_apply_prop_taborder();
			}
		}
		return v;
	};

	_pComponent.on_get_prop_tabstop = function () {
		return this.tabstop;
	};

	_pComponent._isFocusAcceptable = function () {
		return this._is_focus_accept;
	};

	_pComponent.set_tooltiptext = function (v) {
		if (v != this.tooltiptext) {
			if (!v) {
				v = "";
			}
			this.tooltiptext = v;
			this.on_apply_prop_tooltip();
		}
		return v;
	};

	_pComponent.set_tooltiptype = function (v) {
		if (v != this.tooltiptype) {
			this.tooltiptype = v;
			this.on_apply_prop_tooltip();
		}
		return v;
	};

	_pComponent.set_enableevent = function (v) {
		this.enableevent = nexacro._toBoolean(v);
		return v;
	};

	_pComponent.set_enableredraw = function (v) {
		this.enableredraw = nexacro._toBoolean(v);

		if (this.enableredraw) {
			this.on_apply_enableredraw();
		}

		return v;
	};

	_pComponent.on_apply_enableredraw = function () {
		if (this._enable_redraw_history["common_updatestyle"]) {
			var comps = this._enable_redraw_history["common_updatestyle"];
			var comps_len = comps.length;

			for (var i = 0; i < comps_len; i++) {
				var comp = comps[i];

				if (comp._is_applyenableredraw) {
					continue;
				}

				comp._control_pseudo = "";
				comp._contents_pseudo = "";
				comp.on_apply_pseudo(comp._pseudo);
				comp._is_applyenableredraw = true;
			}

			this._enable_redraw_history["common_updatestyle"] = [];
		}
		this._enable_redraw_history = {
		};
	};
	_pComponent.set_transparenthittest = function (v) {
	};

	_pComponent._on_last_lbuttonup = nexacro._emptyFn;
	_pComponent._on_last_keyup = nexacro._emptyFn;

	_pComponent.set_hotkey = function (v) {
		var cur_hotkey = this._hotkey;
		if (cur_hotkey) {
			this._unregisterHotkey();
		}

		var hotkey = new nexacro.HotKey(v);
		if (hotkey._isEmpty()) {
			this.hotkey = null;
			this._hotkey = null;
			delete hotkey;
		}
		else {
			this.hotkey = hotkey._toString();
			this._hotkey = hotkey;

			if (this._is_created) {
				this._registerHotkey();
			}
		}
	};

	_pComponent.set_rtldirection = function (v) {
		var rtldirection = this.rtldirection;

		if (rtldirection != v) {
			this.rtldirection = v;

			this._setRtlDirection(v);
		}
		return v;
	};

	_pComponent.set_locale = nexacro._emptyFn;

	_pComponent._registerHotkey = function () {
		var hotkey = this._hotkey;
		if (!hotkey || hotkey._is_registered) {
			return;
		}

		this._setAccessibilityHotKey(this.hotkey);

		var _form = this._getMainForm();
		if (this._is_frame || this == _form) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				nexacro._registerHotkeyComp(owner_frame, this, hotkey);
			}
		}
		else {
			if (_form) {
				nexacro._registerHotkeyComp(_form, this, hotkey);
			}
		}
	};

	_pComponent._unregisterHotkey = function () {
		var hotkey = this._hotkey;
		if (!hotkey || !hotkey._is_registered) {
			return;
		}
		var _form = this._getMainForm();
		if (this._is_frame || this == _form) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				nexacro._unregisterHotkeyComp(owner_frame, this, hotkey);
			}
		}
		else {
			if (_form) {
				nexacro._unregisterHotkeyComp(_form, this, hotkey);
			}
			else {
				delete this._hotkey;
				this._hotkey = null;
			}
		}
	};

	_pComponent._processHotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		var _form = this._getMainForm();
		if (!this._is_frame && this != _form) {
			if (_form) {
				return _form._processHotkey(keycode, altKey, ctrlKey, shiftKey, this);
			}
		}
	};

	_pComponent._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this.setFocus();
	};

	_pComponent._saveScrollPos = function () {
	};
	_pComponent._applyScrollPos = function () {
	};

	_pComponent.bringToFront = function () {
		if (this.parent) {
			var parent = this.parent;
			var parent_child_list = parent._child_list;
			var child_list = this._child_list;
			var len = parent_child_list.length;
			var last_Idx = len - 1;

			var cur_Index = nexacro._indexOf(parent_child_list, this);

			if (cur_Index >= 0 && cur_Index < last_Idx) {
				parent_child_list.splice(cur_Index, 1);
				parent_child_list.splice(last_Idx, 0, this);

				var parent_elem = parent.getElement();
				var cur_elem = this._control_element;

				if (child_list != null || child_list != undefined) {
					for (var i = 0; i < child_list.length; i++) {
						var comp = child_list[i];
						comp._saveScrollPos();
					}
				}

				parent_elem.bringToFrontElement(cur_elem);

				if (child_list != null || child_list != undefined) {
					for (var i = 0; i < child_list.length; i++) {
						var comp = child_list[i];
						comp._applyScrollPos();
					}
				}
			}
		}
	};

	_pComponent.bringToPrev = function () {
		if (this.parent) {
			var parent = this.parent;
			var parent_child_list = parent._child_list;
			var child_list = this._child_list;
			var len = parent_child_list.length;
			var last_Idx = len - 1;

			var cur_Index = nexacro._indexOf(parent_child_list, this);

			if (cur_Index >= 0 && cur_Index < last_Idx) {
				if (child_list != null || child_list != undefined) {
					for (var i = 0; i < child_list.length; i++) {
						var comp = child_list[i];
						comp._saveScrollPos();
					}
				}

				this.moveToPrev(parent_child_list[cur_Index + 1]);

				if (child_list != null || child_list != undefined) {
					for (var i = 0; i < child_list.length; i++) {
						var comp = child_list[i];
						comp._applyScrollPos();
					}
				}
			}
		}
	};

	_pComponent.moveToNext = function (objOrId) {
		if (this.parent) {
			var parent = this.parent;
			var target = (nexacro._isString(objOrId)) ? parent[objOrId] : objOrId;

			if (target == null) {
				return;
			}

			var child_list = parent._child_list;
			var cur_idx = nexacro._indexOf(child_list, this);
			var target_idx = nexacro._indexOf(child_list, target);

			if (cur_idx < 0 || target_idx < 0) {
				return;
			}

			if (cur_idx > -1 && target_idx > -1 && cur_idx != target_idx - 1) {
				child_list.splice(cur_idx, 1);
				var idx = nexacro._indexOf(child_list, target);

				child_list.splice(idx, 0, this);

				var parent_elem = parent.getElement();
				parent_elem.moveToNextElement(this._control_element, target.getElement());
			}
		}
	};
	_pComponent.moveToPrev = function (objOrId) {
		if (this.parent) {
			var parent = this.parent;
			var target = (nexacro._isString(objOrId)) ? parent[objOrId] : objOrId;

			if (target == null) {
				return;
			}

			var child_list = parent._child_list;
			var cur_idx = nexacro._indexOf(child_list, this);
			var target_idx = nexacro._indexOf(child_list, target);

			if (cur_idx < 0 || target_idx < 0) {
				return;
			}

			if (cur_idx > -1 && target_idx > -1 && cur_idx != target_idx + 1) {
				child_list.splice(cur_idx, 1);

				var index = nexacro._indexOf(child_list, target);
				child_list.splice(index + 1, 0, this);

				var parent_elem = parent.getElement();
				parent_elem.moveToPrevElement(this._control_element, target.getElement());
			}
		}
	};

	_pComponent.sendToBack = function () {
		if (this.parent) {
			var parent = this.parent;
			var child_list = parent._child_list;

			var cur_idx = nexacro._indexOf(child_list, this);
			if (cur_idx > 0) {
				child_list.splice(cur_idx, 1);
				child_list.splice(0, 0, this);

				var parent_elem = parent.getElement();
				parent_elem.sendToBackElement(this._control_element);
			}
		}
	};
	_pComponent.sendToNext = function () {
		if (this.parent) {
			var p = this.parent;
			var child_list = p._child_list;
			var cur_idx = nexacro._indexOf(child_list, this);
			if (cur_idx > 0) {
				this.moveToNext(child_list[cur_idx - 1]);
			}
		}
	};


	_pComponent.create = function () {
		this.initProperties();
		this.initEvents();
	};

	_pComponent._destroy = function () {
		return this.destroy();
	};

	_pComponent.destroy = function () {
		if (!this._is_alive) {
			return;
		}

		return this.destroyComponent();
	};

	_pComponent.init = function (id, position, left, top, width, height, right, bottom) {
		if (id) {
			this.id = this.name = id;
		}

		this.position = position ? position : "absolute";

		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;

		if (arguments.length >= 6) {
			this._adjustPosition(left, top, right, bottom, width, height, this.parent ? this.parent._client_width : 0, this.parent ? this.parent._client_height : 0);

			if (this._adjust_width != old_width || this._adjust_height != old_height) {
				bsize = true;
			}
			if (this._adjust_left != old_left || this._adjust_top != old_top) {
				bmove = true;
			}
			this.on_update_position(bsize, bmove);
		}
	};

	_pComponent._getPosRight = function () {
		return this._adjust_left + this._adjust_width;
	};

	_pComponent._getPosBottom = function () {
		return this._adjust_top + this._adjust_height;
	};

	_pComponent.move = function (left, top, width, height, right, bottom) {
		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;
		var update = false;

		this._adjustPosition(left, top, right, bottom, width, height, this.parent._client_width, this.parent._client_height);
		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;
			if (old_width == 0 || old_height == 0) {
				update = true;
			}
		}
		if (this._adjust_left != old_left || this._adjust_top != old_top) {
			bmove = true;
		}

		if (this._isPopupVisible && this._isPopupVisible()) {
			bsize = true;
		}
		this.on_update_position(bsize, bmove);

		if (this._control_element) {
			if (update) {
				this.currentstyle._empty();
				this._control_pseudo = "";
				this._contents_pseudo = "";
			}
			var pseudo = this._getResultPseudo(this._status, this._pseudo);
			this._updateControl(this._control_element, pseudo);
			this._updateContents(this._control_element, pseudo);
		}
	};

	_pComponent.move_default = null;

	_pComponent._setFocus = function (bResetScroll, calledby, block_inner_focus) {
		if (calledby > -1 || calledby < 4) {
			this._focus_direction = calledby;
		}
		else {
			this._focus_direction = -1;
		}
		if (block_inner_focus == true) {
			this._block_inner_focus = true;
			this.setFocus(bResetScroll);
			this._block_inner_focus = false;
		}
		else {
			return this.setFocus(bResetScroll);
		}
	};

	_pComponent.setFocus = function (bResetScroll, bInnerFocus) {
		var win = this._getRootWindow();
		if (!this.getElement()) {
			return;
		}

		var is_active_layer = win._isActiveLayerComponent(this);
		if (!is_active_layer) {
			return;
		}

		if (!this._isVisible() || !this._isEnable() || !this.enableevent || !this._isFocusAcceptable()) {
			return;
		}

		if (bResetScroll === undefined) {
			bResetScroll = true;
		}

		var bContainerFocus;
		if (bInnerFocus === undefined) {
			bContainerFocus = nexacro._enableaccessibility;
		}
		else {
			bContainerFocus = !bInnerFocus;
		}

		var block_inner, from_child = false;
		if (bContainerFocus) {
			if (this instanceof nexacro.Form) {
				if (this._block_inner_focus) {
					block_inner = true;
				}
				this._block_inner_focus = true;

				if (this._last_focused) {
					if (win._indexOfCurrentFocusPaths(this._last_focused) >= 0) {
						from_child = true;
						win._removeFromCurrentFocusPath(this._last_focused);
					}
					else {
						this._last_focused = null;
					}
				}
			}
		}

		var focus_direction = this._focus_direction;
		if (bResetScroll) {
			var c = this, c_temp, target_comp = this;
			if (!this._block_inner_focus) {
				while (c) {
					c_temp = c._getLastFocused();
					if (!c_temp) {
						c_temp = c._getTabOrderFirst();
					}
					if (c_temp) {
						target_comp = c_temp;
					}
					c = c_temp;
				}

				target_comp._resetScrollPos(target_comp, target_comp._adjust_left, target_comp._adjust_top, target_comp._adjust_left + target_comp._adjust_width, target_comp._adjust_top + target_comp._adjust_height, focus_direction);
			}
			else {
				nexacro.Component.prototype._resetScrollPos.call(this, this, this._adjust_left, this._adjust_top, this._adjust_left + this._adjust_width, this._adjust_top + this._adjust_height, focus_direction);
			}
		}

		var last_focused = this._find_lastFocused(this);
		var evt_name = "focus";

		if (focus_direction == 0) {
			evt_name = "tabkey";
		}
		else if (focus_direction == 1) {
			evt_name = "shifttabkey";
		}
		else if (focus_direction == 2) {
			evt_name = "downkey";
		}
		else if (focus_direction == 3) {
			evt_name = "upkey";
		}
		this._focus_direction = -1;

		var form = this._getRootForm();
		form._is_comp_focus = true;
		this._on_focus(true, evt_name);
		form._is_comp_focus = false;
		if (from_child) {
			this.on_apply_custom_setfocus();
		}

		if (this._block_inner_focus && !block_inner) {
			this._block_inner_focus = false;
		}

		return last_focused;
	};

	_pComponent.redraw = function () {
	};
	_pComponent.resize = function (w, h) {
		if (w < 0 || h < 0) {
			return;
		}

		if (w == this._adjust_width && h == this._adjust_height) {
			var control_elem = this.getElement();
			if (control_elem && control_elem._handle && control_elem._vml_elem) {
				control_elem._refreshVMLContainerElement(control_elem, control_elem._vml_elem);
			}
			return;
		}
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;

		var bsize = false;
		if (old_width != this._adjust_left + w || old_height != this._adjust_top + h) {
			this.width = w;
			this.height = h;
			bsize = true;
		}

		this._update_position(bsize, false);
	};

	_pComponent._update_position = function (bsize, bmove) {
		var old_left = this._adjust_left;
		var old_top = this._adjust_top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var update = false;

		if (this.parent) {
			this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, this.parent._client_width, this.parent._client_height);
		}
		else {
			this._adjustPosition(this.left, this.top, this.right, this.bottom, this.width, this.height, 0, 0);
		}

		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;

			if (old_width == 0 || old_height == 0) {
				update = true;
			}
		}
		if (this._adjust_left != old_left || this._adjust_top != old_top) {
			bmove = true;
		}
		this.on_update_position(bsize, bmove);

		if (update) {
			this.currentstyle._empty();
			this.on_apply_pseudo();
		}
	};

	_pComponent._on_afterHideWaitComp = function (pseudo) {
		if (this._pseudo != pseudo) {
			this._stat_change(this._status, pseudo);
		}
	};

	_pComponent.saveToImage = function (fileName, fileType, compressOption) {
		if (this._control_element) {
			return this._control_element.saveToImageFile(fileName, fileType, compressOption);
		}
	};

	_pComponent.saveToImageFile = function (fileName, fileType, compressOption) {
		if (this._control_element) {
			return this._control_element.saveToImageFile(fileName, fileType, compressOption);
		}
	};

	_pComponent.saveToImageObject = function () {
		if (this._control_element) {
			return this._control_element.saveToImageObject();
		}
	};


	_pComponent.applyto_bindSource = function (propid, Val) {
		if (!this._bind_event) {
			return true;
		}

		var evt = {
			propid : propid, 
			val : Val
		};
		var ret = this._bind_event._fireEvent(this, evt);
		return ret;
	};

	_pComponent.on_getBindableProperties = function () {
	};



	_pComponent.show = function () {
		var parent = this.parent;
		if (parent) {
			var control_element = this._control_element;
			if (!control_element) {
				if (this.createComponent(true)) {
					this.on_created();
				}
			}
			else {
			}
		}
	};


	_pComponent._resizeBorder = function () {
		var width = this._adust_width;
		var height = this._adjust_height;
		var cur_border = this.on_find_CurrentStyle_border(this._pseudo);

		if (cur_border) {
			var new_border = nexacro._cloneStyleObject(cur_border);

			var update_flag = false;
			if (width < (new_border.left_width + new_border.right_width)) {
				new_border.left_width = width;
				new_border.right_width = 0;
				update_flag = true;
			}
			if (height < (new_border.top_width + new_border.bottom_width)) {
				new_border.top_width = height;
				new_border.bottom_width = 0;
				update_flag = true;
			}

			if (update_flag) {
				this._control_element.setElementBorder(new_border, this.currentstyle.bordertype);
			}
		}
	};

	_pComponent._isVisible = function () {
		var form = this;
		while (form != null) {
			if (form._is_frame && form._is_popup_frame) {
				break;
			}

			if (form.visible == false) {
				return false;
			}

			form = form.parent;
		}
		return true;
	};

	_pComponent._isEnable = function () {
		var form = this;
		while (form != null) {
			if (form._is_frame && form._is_popup_frame) {
				break;
			}

			if (form._real_enable == false || form.enable == false) {
				return false;
			}

			form = form.parent;
		}
		return true;
	};

	_pComponent._isPropEnable = function () {
		var form = this;
		while (form != null) {
			if (form._is_frame && form._is_popup_frame) {
				break;
			}

			if (form.enable == false) {
				return false;
			}

			form = form.parent;
		}
		return true;
	};

	_pComponent._isAccessibilityRoleHeading = function () {
		if (this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo)) == "heading") {
			return true;
		}
		else {
			return false;
		}
	};


	_pComponent._isEditableComponent = function (edittype) {
		if (this.readonly !== undefined) {
			if (edittype && edittype.match(this._type_name)) {
				if (this._type_name == "Edit") {
					var obj = edittype.split(",");
					for (var i = 0; i < obj.length; i++) {
						if (obj[i].trim() == this._type_name) {
							return true;
						}
					}
				}
				else {
					return true;
				}
			}
			else if (edittype == "All" || edittype == "") {
				return true;
			}
			else {
				return false;
			}
		}
		return false;
	};

	_pComponent._getForm = function () {
		return this._refform;
	};

	_pComponent._getRootForm = function () {
		var form = this._refform;
		while ((form && form._is_form == false) || (form && form._is_form && (form instanceof nexacro.Div || form instanceof nexacro.Tabpage || form instanceof nexacro.Tab))) {
			form = form.parent;
		}

		return form;
	};

	_pComponent._findDataset = function (id) {
		if (id && id.length > 0) {
			var ds = this[id];

			if (ds && (ds._type_name == "Dataset")) {
				return ds;
			}

			if (this._refform) {
				var ds = this._refform.lookup(id);
				if (ds && (ds._type_name == "Dataset")) {
					return ds;
				}
			}
		}

		return undefined;
	};
	_pComponent._findForm = function (comp) {
		var form = comp;
		while (form && form._is_form == false) {
			form = form.parent;
		}
		return form;
	};

	_pComponent._getOwnerFrame = function () {
		var form = this;
		while (form && !form._is_frame) {
			form = form.parent;
		}
		return form;
	};

	_pComponent._getWindow = function () {
		var parent = this.parent;
		if (parent) {
			return parent._getWindow();
		}

		var form = this._refform;
		if (form && form != this) {
			return form._getWindow();
		}

		return nexacro._findWindow(nexacro._getMainWindowHandle());
	};

	_pComponent._getRootWindow = function () {
		var _window = this._getWindow();
		while (_window) {
			if (_window.frame) {
				return _window;
			}

			_window = _window.parent;
		}

		return this._getWindow();
	};

	_pComponent._getWindowHandle = function () {
		var _window = this._getWindow();
		if (_window) {
			return _window._handle;
		}
		return null;
	};

	_pComponent._getLastFocused = function () {
		return this._last_focused;
	};
	_pComponent._find_lastFocused = function () {
		var form = this._getMainForm();
		if (!form) {
			return null;
		}

		var last_focus = form._last_focused;
		while (last_focus && last_focus._is_form) {
			var child_last_focus = last_focus._getLastFocused();
			if (!child_last_focus) {
				break;
			}
			last_focus = child_last_focus;
		}

		return last_focus;
	};

	_pComponent._getDragData = function () {
		if (this.text) {
			return this.text;
		}
		return null;
	};

	_pComponent.getElement = function () {
		return this._control_element;
	};

	_pComponent.getMainframe = function () {
		if (application._is_attach_childframe) {
			return this._getWindow().frame;
		}
		return application.mainframe;
	};
	_pComponent._getScrollable = function (hscroll, vscroll, x, y) {
		if (!this._is_scrollable) {
			return false;
		}

		var ret, pos, v = this.vscrollbar;

		if (vscroll && v && v.enable) {
			pos = v.pos + y;
			if (pos < v._max && pos >= v._min) {
				ret = {
					y : true
				};
			}
		}
		var h = this.hscrollbar;

		if (hscroll && h && h.enable) {
			pos = h.pos + x;
			if (pos < h._max && pos > h._min) {
				if (ret) {
					ret.x = true;
				}
				else {
					ret = {
						x : true
					};
				}
			}
		}
		return ret;
	};


	_pComponent._getRefFormBaseUrl = function () {
		if (this._refform) {
			return this._refform._getFormBaseUrl();
		}
	};


	_pComponent._getScreenPosition = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var border = this.on_find_CurrentStyle_border(this._pseudo);
			var elem_pos = nexacro._getElementScreenPosition(control_elem);

			var screenLeft = elem_pos.x;
			var screenTop = elem_pos.y;
			return {
				x : screenLeft, 
				y : screenTop
			};
		}
		return {
			x : 0, 
			y : 0
		};
	};
	_pComponent._getWindowPosition = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var border = this.on_find_CurrentStyle_border(this._pseudo);
			var elem_pos = nexacro._getElementXYInWindow(control_elem._handle);
			var windowLeft = elem_pos[0] - (border ? border._getBorderLeftWidth() : 0);
			var windowTop = elem_pos[1] - (border ? border._getBorderTopWidth() : 0);
			return {
				x : windowLeft, 
				y : windowTop
			};
		}
		return {
			x : 0, 
			y : 0
		};
	};
	_pComponent._isRtl = function (comp) {
		if (!comp) {
			comp = this;
		}


		return comp._rtldirection == "rtl";
	};

	_pComponent._setRtlDirection = function (v) {
		var rtldirection = this.rtldirection;
		var _rtldirection = this._rtldirection;

		if (v == "inherit") {
			var _parent_rtldirection = this.parent._rtldirection;
			if (_rtldirection != _parent_rtldirection) {
				_rtldirection = _parent_rtldirection;
			}
		}
		else if (_rtldirection != v) {
			if (rtldirection == v) {
				_rtldirection = v;
			}
			else if (!rtldirection || rtldirection == "inherit") {
				_rtldirection = v;
			}
		}

		if (_rtldirection != this._rtldirection) {
			this._rtldirection = _rtldirection;
			this.on_apply_prop_rtldirection();
		}
	};


	_pComponent._convertLeftForRtlLayout = function (left, width) {
		var control_elem = this._control_element;

		if (this._isRtl()) {
			left = control_elem.client_width - width - left;
		}
		return left;
	};

	_pComponent._setLocale = function (v) {
		if (!this.locale) {
			this._locale = v;
			this.on_apply_locale();
		}
	};

	_pComponent._getLocale = function () {
		if (this._locale === undefined) {
			return undefined;
		}

		var locale = nexacro.System.locale;
		var _parent = this;

		while (_parent) {
			if (_parent._locale) {
				locale = _parent._locale;
				break;
			}
			_parent = _parent.parent;
		}

		return locale;
	};

	_pComponent._getCumulativeZoomFactor = function () {
		var comp = this;
		var zoomfactor = 100;
		while (comp && !(comp instanceof nexacro.Frame)) {
			if (comp.getZoom) {
				var value = comp.getZoom();
				if (value != 100) {
					zoomfactor *= (value / 100.0);
				}
			}
			comp = comp.parent;
		}

		return zoomfactor;
	};

	_pComponent._getFixedOffsetValue = function () {
		var r = 0, b = 0;

		if (this.right != null) {
			r = 0;
		}
		else if (this.width != null) {
			var val = this.width;
			if (typeof (val) == "string" && val.indexOf("%") >= 0) {
				if (parseFloat(val) <= 100) {
					r = 0;
				}
				else {
					r = this.getOffsetRight();
				}
			}
			else {
				r = this.getOffsetRight();
			}
		}

		if (this.bottom != null) {
			b = 0;
		}
		else if (this.height != null) {
			var val = this.height;
			if (typeof (val) == "string" && val.indexOf("%") >= 0) {
				if (parseFloat(val) <= 100) {
					b = 0;
				}
				else {
					b = this.getOffsetBottom();
				}
			}
			else {
				b = this.getOffsetBottom();
			}
		}

		return {
			right : r, 
			bottom : b
		};
	};

	_pComponent._setAccessibilityNotifyEvent = function (direction) {
		var control_element = this.getElement();

		if (control_element && control_element.accessibility_enable) {
			if (direction !== undefined) {
				this._resetScrollPos(this, this._adjust_left, this._adjust_top, this._adjust_left + this._adjust_width, this._adjust_top + this._adjust_height, (direction > 0) ? 0 : 1);
			}

			control_element.setElementAccessibilityNotifyEvent();
			var form = this._getForm();
			if (form) {
				var _window = form._getWindow();
				_window._accessibility_last_focused_comp = this._getRootComponent(this);
			}
			return true;
		}
		return false;
	};

	_pComponent._setAccessibilityInfoByHover = function () {
		return this._setAccessibilityNotifyEvent();
	};

	_pComponent._clearAccessibilityInfoByHover = nexacro._emptyFn;

	delete _pComponent;
}


if (!nexacro.PopupComponent) {
	nexacro.PopupComponent = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this.visible = false;

		this._is_window = true;
		this._attached_comp = null;
		this._is_subcontrol = true;
		this._call_comp = null;
	};

	var _pPopupComponent = nexacro.PopupComponent.prototype = nexacro._createPrototype(nexacro.Component, nexacro.PopupComponent);
	_pPopupComponent._type_name = "PopupComponent";

	_pPopupComponent._is_popup_control = true;
	_pPopupComponent._is_selfclose = true;
	_pPopupComponent._default_zindex = nexacro._zindex_popup;
	_pPopupComponent._track_capture = true;


	_pPopupComponent.on_create_control_element = function (parent_elem) {
		var control_elem = this.on_create_popup_control_element(parent_elem);
		if (control_elem && this._default_zindex > 0) {
			control_elem.setElementZIndex(this._default_zindex);
		}
		return control_elem;
	};

	_pPopupComponent.on_created = function (_window) {
		if (!this._is_created) {
			nexacro.Component.prototype.on_created.call(this, _window);
		}

		var control_elem = this._control_element;
		if (!this.visible && control_elem) {
			control_elem.setElementPosition(0, 0);
			control_elem.setElementSize(1, 1);
		}
	};

	_pPopupComponent.destroyComponent = function () {
		this._is_alive = false;

		if (this.visible) {
			application._removePopupComponent(this);
			this.visible = false;
		}

		if (nexacro._enableaccessibility) {
			if (application._accessibilityHistoryList && !this._is_subcontrol) {
				application._remove_accessibility_history(this);
			}
		}

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
			_window._releaseCaptureLock(this._attached_comp);
			this._track_capture = false;
		}

		if (this._subctrlitems) {
			nexacro._deleteAllSubComponent(this);
		}

		if (this._is_subcontrol && this.parent && this.parent._subctrlitems) {
			nexacro._deleteSubComponent(this, this.parent);
		}

		if (this.parent && this.parent.removeChild) {
			this.parent.removeChild(this.id);
		}

		if (this._control_element) {
			this._control_element.destroy();
			this._control_element = null;
		}
		this._clearEventListeners();
		this.on_destroy_contents();

		this._is_created = false;

		return true;
	};

	_pPopupComponent.on_change_containerRect = function (container_width, container_height) {
		var comp = this._attached_comp;
		if (comp) {
			var old_left = comp._adjust_left;
			var old_top = comp._adjust_top;
			var old_width = comp._adjust_width;
			var old_height = comp._adjust_height;
			var bsize = false, bmove = false;
			var update = false;

			comp._adjustPosition(0, 0, null, null, container_width, container_height, this._client_width, this._client_height);
			if (comp._adjust_width != old_width || comp._adjust_height != old_height) {
				bsize = true;
				if (old_width == 0 || old_height == 0) {
					update = true;
				}
			}

			if (comp._adjust_left != old_left || comp._adjust_top != old_top) {
				bmove = true;
			}

			if (comp._isPopupVisible && comp._isPopupVisible()) {
				bsize = true;
			}

			comp.on_update_position(bsize, bmove);

			if (comp._control_element) {
				if (update) {
					comp.currentstyle._empty();
					comp._control_pseudo = "";
					comp._contents_pseudo = "";
				}
				var pseudo = comp._getResultPseudo(comp._status, comp._pseudo);
				comp._updateControl(comp._control_element, pseudo);
				comp._updateContents(comp._control_element, pseudo);
			}
		}
	};

	_pPopupComponent._contains = function (oDescendant) {
		while (oDescendant) {
			if (oDescendant == this._attached_comp) {
				return true;
			}
			oDescendant = oDescendant.parent;
		}
		return false;
	};

	_pPopupComponent.set_visible = function (v) {
		if (this.visible != v) {
			this.visible = v;
			var control_elem = this._control_element;

			if (control_elem) {
				control_elem.setElementVisible(v);

				if (this.visible) {
					if (!this._is_subcontrol) {
						if (this.parent._last_focused) {
							this._call_comp = this.parent._last_focused;
						}
						else {
							this._call_comp = this.parent;
						}
					}

					var pseudo = this._getResultPseudo(this._status, this._pseudo);
					this._updateControl(control_elem, pseudo);
					this._updateContents(control_elem, pseudo);
				}
				else {
					if (this instanceof nexacro.WaitComponent) {
						var pseudo = this._getResultPseudo(this._status, this._pseudo);
						this._updateControl(control_elem, pseudo);
					}

					control_elem.setElementPosition(0, 0);
					control_elem.setElementSize(1, 1);
				}

				if (nexacro._enableaccessibility && this._attached_comp) {
					this._attached_comp._setAccessibilityStatExpanded(v);
					this._attached_comp._setAccessibilityStatHidden(v);
				}

				if (this.visible) {
					nexacro._resetVML(this);
				}

				if (this._is_selfclose) {
					if (!v) {
						var _attached_comp = this._attached_comp;
						if (_attached_comp && _attached_comp.on_fire_oncloseup) {
							_attached_comp.on_fire_oncloseup(_attached_comp);
						}

						application._removePopupComponent(this);
						var _window = this._getWindow();
						_window._removeFromCurrentFocusPath(this, false);
						if (!this._is_subcontrol) {
							this._call_comp._on_focus(true);
						}
					}
					else {
						application._appendPopupComponent(this);
					}
				}
			}
		}
	};


	_pPopupComponent._attach = function (comp) {
		this._attached_comp = comp;
		nexacro._addSubComponent(this, comp);
		var contrl_element = this._control_element;
		if (comp && comp != this && comp._control_element && contrl_element) {
			var sub_control_element = comp._control_element;
			if (sub_control_element) {
				var sub_parent = sub_control_element._parent_elem;
				if (comp._is_created && sub_parent != contrl_element) {
					sub_control_element._removeFromContainer();
				}

				sub_control_element._parent_elem = contrl_element;
			}

			if (comp._is_created) {
				sub_control_element._appendToContainer(contrl_element);
			}
		}
	};
	_pPopupComponent._detach = function (comp) {
		if (this._attached_comp == comp && comp != this) {
			this._attached_comp = null;

			var contrl_element = this._control_element;
			var sub_control_element = comp._control_element;
			if (sub_control_element && contrl_element) {
				if (comp._is_created) {
					sub_control_element._removeFromContainer();
				}
				sub_control_element._parent_elem = null;
			}
		}
	};

	_pPopupComponent._is_popup = function (comp) {
		return this.visible;
	};


	_pPopupComponent._popup = function (left, top, width, height) {
		if (!this._attached_comp) {
			return;
		}

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._setCaptureLock(this._attached_comp, true, false);
		}

		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(left, top);
			control_elem.setElementSize(width, height);
			this._updateClientSize(control_elem);
		}

		this.set_visible(true);
	};

	_pPopupComponent._popupBy = function (from_comp, left, top, width, height) {
		if (!this._attached_comp || !from_comp) {
			return;
		}

		var win_left, win_top;


		var p = nexacro._getElementPositionInFrame(from_comp.getElement());
		var border = from_comp.on_find_CurrentStyle_border(from_comp._pseudo);
		var elem_pos = {
			x : p.x, 
			y : p.y
		};

		var _window = this._getWindow();

		win_left = elem_pos.x + left - (_window ? _window._custom_node_left : 0);
		win_top = elem_pos.y + top - (_window ? _window._custom_node_top : 0);

		if (_window && this._track_capture) {
			_window._setCaptureLock(this._attached_comp, true, false);
		}


		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPosition(win_left, win_top);
			control_elem.setElementSize(width, height);
			this._updateClientSize(control_elem);
		}

		this.set_visible(true);
	};

	_pPopupComponent._closePopup = function () {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this._attached_comp);
		}
		this.set_visible(false);
	};


	_pPopupComponent._findOwnerElementHandle = function () {
		var ret = {
		};
		ret.owner_handle = null;
		ret.is_append = true;
		ret.ref_handle = null;

		var win = this._getWindow();
		if (win) {
			var layer_info;
			if (this instanceof nexacro.WaitComponent) {
				layer_info = {
				};
				layer_info.popup_zindex = nexacro._zindex_waitcursor;
			}
			else {
				layer_info = win._getComponentLayerInfo(this);
			}

			if (layer_info.is_modal) {
				var frame = layer_info.frame;
				var overlay_elem = frame._modal_overlay_elem;
				ret.owner_handle = overlay_elem._handle;
				ret.is_append = true;
			}
			else {
				if (layer_info.ref_first_modal_frame) {
					var frame = layer_info.ref_first_modal_frame;
					ret.owner_handle = win._dest_handle;
					ret.is_append = false;
					ret.ref_handle = frame._modal_overlay_elem._handle;
				}
				else {
					ret.owner_handle = win._dest_handle;
					ret._is_append = true;
				}
			}
		}

		return ret;
	};

	delete _pPopupComponent;
}

if (!nexacro.WaitComponent) {
	nexacro.WaitComponent = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.PopupComponent.call(this, id, position, left, top, width, height, right, bottom, parent);
		this.visible = false;

		this._img_elem = null;
		this._image_width = 0;
		this._image_height = 0;
		this._context_list = [];
		this._is_subcontrol = false;
		this._is_focus_accept = false;
	};

	var _pWaitComponent = nexacro.WaitComponent.prototype = nexacro._createPrototype(nexacro.PopupComponent, nexacro.WaitComponent);
	_pWaitComponent._type_name = "WaitComponent";

	_pWaitComponent._is_popup_control = true;
	_pWaitComponent._is_selfclose = false;
	_pWaitComponent._default_zindex = nexacro._zindex_waitcursor;

	_pWaitComponent.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._img_elem = new nexacro.ImageElement(control_elem);
		}
	};

	_pWaitComponent.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var img_elem = this._img_elem;
			if (img_elem) {
				img_elem.setElementVisible(true);
				img_elem.create();
			}
		}

		if (nexacro._enableaccessibility) {
			var curstyle = this.currentstyle;
			var accessibility = nexacro.Component._default_accessibility;
			if (accessibility && accessibility != curstyle.accessibility) {
				curstyle.accessibility = this._make_accessibility_value(accessibility);
				control_elem.setAccessibility(curstyle.accessibility);
			}

			if (nexacro._accessibilitytype == 4) {
				if (control_elem && control_elem._handle) {
					nexacro.__setDOMNodeAccessibilityHidden(control_elem._handle, true);
				}
			}
		}
	};

	_pWaitComponent.on_change_containerRect = function (container_width, container_height) {
		var img_elem = this._img_elem;
		if (img_elem) {
			var left = Math.round((container_width - this._image_width) / 2);
			var top = Math.round((container_height - this._image_height) / 2);

			img_elem.setElementPosition(left, top);
			img_elem.setElementSize(this._image_width, this._image_height);
		}
	};

	_pWaitComponent._getAccessibilityLabel = function (accessibility) {
		return "Wait Cursor";
	};

	_pWaitComponent._on_loadimage = function (imgurl, w, h) {
		if (!this._is_alive) {
			return;
		}

		var img_elem = this._img_elem;
		if (img_elem && w > 0 && h > 0) {
			this._image_width = w;
			this._image_height = h;

			var bw = this._adjust_width;
			var bh = this._adjust_height;
			var left = Math.round((bw - w) / 2);
			var top = Math.round((bh - h) / 2);

			img_elem.setElementPosition(left, top);
			img_elem.setElementSize(w, h);
			img_elem.setElementImageUrl(imgurl);
		}
	};

	_pWaitComponent.setImage = function (imageurl) {
		var img_elem = this._img_elem;
		if (img_elem) {
			var imagesize = nexacro._getImageSize(imageurl, this._on_loadimage, this);
			if (imagesize) {
				this._image_width = imagesize.width;
				this._image_height = imagesize.height;

				var bw = this._adjust_width;
				var bh = this._adjust_height;

				var left = Math.round((bw - imagesize.width) / 2);
				var top = Math.round((bh - imagesize.height) / 2);

				img_elem.setElementPosition(left, top);
				img_elem.setElementSize(imagesize.width, imagesize.height);

				img_elem.setElementImageUrl(imageurl);
			}
		}
	};

	_pWaitComponent._updateControl = function (control_elem, pseudo) {
		if (control_elem) {
			this._control_pseudo = pseudo;
			if (this._control_pseudo != pseudo) {
				if (nexacro.Browser == "Runtime") {
					var background = nexacro._getCachedStyleObj("background", "#ffffff01");
					control_elem.setElementBackground(background, null);
				}
			}
			return true;
		}
		return false;
	};

	_pWaitComponent.on_destroy_contents = function () {
		if (this._img_elem) {
			this._img_elem.destroy();
			this._img_elem = null;
		}
	};

	_pWaitComponent.show = function () {
		if (!this._is_created || !this.parent) {
			return;
		}

		var _window = this._getWindow();
		if (_window) {
			var left, top, width, height;

			left = _window.getLeft();
			top = _window.getTop();

			if (_window.frame) {
				var frame = _window.frame;
				width = frame.getOffsetWidth();
				height = frame.getOffsetHeight();
			}
			else {
				width = _window.getClientWidth();
				height = _window.getClientHeight();
			}

			_window._setCaptureLock(this, true, true);

			this._adjustPosition(0, 0, null, null, width, height, width, height);
			this.on_update_position(true, true);

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementPosition(0, 0);
				control_elem.setElementSize(width, height);
				this._updateClientSize(control_elem);

				var cursor = nexacro.Component._wait_cursor;
				var curstyle = this.currentstyle;
				if (cursor && curstyle.cursor != cursor) {
					curstyle.cursor = cursor;
					control_elem.setElementCursor(cursor);
				}
			}

			this.set_visible(true);
		}
	};
	_pWaitComponent.hide = function () {
		var _window = this._getWindow();
		if (_window) {
			_window._releaseCaptureLock(this);

			var control_elem = this._control_element;
			if (control_elem) {
				control_elem.setElementSize(1, 1);
				this._updateClientSize(control_elem);
			}
		}

		if (this._is_created && this._is_alive) {
			var form = this.parent;

			while (form) {
				if (form._is_form) {
					break;
				}

				form = form._last_focused;
			}


			this.set_visible(false);


			var hover_elem = nexacro._getHoverElement(_window);
			var hover_comp = _window.findComponent(hover_elem, 0, 0)[0];
			if (form) {
				var last_focus = form._last_focused;
				if (last_focus) {
					var cursor;
					if (form._obj_mousemove && (form._obj_mousemove != last_focus)) {
						last_focus._on_afterHideWaitComp("normal");

						if (form._obj_mousemove instanceof nexacro.WaitComponent) {
							cursor = nexacro._getCachedStyleObj("cursor", "arrow");
						}
						else {
							cursor = form._obj_mousemove.currentstyle.cursor;
						}
					}
					else {
						var is_contain = false;
						var temp = hover_comp;
						while (temp) {
							if (temp == last_focus) {
								is_contain = true;
								break;
							}
							temp = temp.parent;
						}

						if (is_contain) {
							last_focus._on_afterHideWaitComp(last_focus._pseudo);
							cursor = last_focus.currentstyle ? last_focus.currentstyle.cursor : null;
						}
						else {
							last_focus._on_afterHideWaitComp("normal");

							if (hover_comp) {
								hover_comp._on_afterHideWaitComp("mouseover");
								cursor = hover_comp ? hover_comp.currentstyle ? hover_comp.currentstyle.cursor : null : null;
							}
						}
					}

					var curstyle = this.currentstyle;
					if (cursor != curstyle.cursor) {
						curstyle.cursor = cursor;
						this._control_element.setElementCursor(cursor);
					}
				}
				else {
					cursor = hover_comp ? hover_comp.currentstyle ? hover_comp.currentstyle.cursor : null : null;
					var curstyle = this.currentstyle;
					if (cursor != curstyle.cursor) {
						curstyle.cursor = cursor;
						this._control_element.setElementCursor(cursor);
					}
				}
			}
		}
	};

	_pWaitComponent._addContext = function (context) {
		if (context) {
			this._context_list.push(context);
		}
	};

	_pWaitComponent._removeContext = function (context) {
		if (!context) {
			return;
		}
		var idx = nexacro._indexOf(this._context_list, context);
		if (idx >= 0) {
			this._context_list[idx] = null;
			delete this._context_list[idx];
			this._context_list.shift();
		}
	};

	_pWaitComponent.on_fire_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		return true;
	};

	_pWaitComponent._on_keydown = function (elem, keycode, altKey, ctrlKey, shiftKey) {
		if (keycode == nexacro.Event.KEY_TAB) {
			elem._event_stop = true;
		}
		else if (keycode == nexacro.Event.KEY_ESC) {
			var context_list = this._context_list;
			var len = context_list.length;
			for (var i = 0; i < len; i++) {
				var context = context_list[i];
				if (context instanceof nexacro.Form) {
					context._stopTransaction();
				}
			}
		}

		return true;
	};

	delete _pWaitComponent;
}

if (!nexacro.CanvasComponent) {
	nexacro.CanvasComponent = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.id = this.name = id || null;

		this.enableevent = false;

		this._apply_client_padding = false;
		this._canvas = null;
		this._drawn = false;

		this._control_element = null;
		this._inner_elem = null;
	};
	var _pCanvasComponent = nexacro._createPrototype(nexacro.Component, nexacro.CanvasComponent);
	nexacro.CanvasComponent.prototype = _pCanvasComponent;
	_pCanvasComponent._type_name = "CanvasComp";

	_pCanvasComponent.on_create_contents = function () {
		var control = this.getElement();
		var tcanvas = new nexacro.CanvasElement(control);
		if (tcanvas) {
			tcanvas.setElementPosition(0, 0);
			tcanvas.setElementSize(this._client_width, this._client_height);
		}
		this._canvas = tcanvas;
	};

	if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
		_pCanvasComponent.on_created_contents = function () {
			var pCanvas = this._canvas;
			if (pCanvas) {
				pCanvas.create();
			}
			this.ondraw(pCanvas);
		};
	}
	else {
		_pCanvasComponent.on_created_contents = function () {
			var pCanvas = this._canvas;
			if (pCanvas) {
				pCanvas.create();
			}
			this.ondraw(pCanvas);
		};
	}

	_pCanvasComponent._initInner = function () {
		this.on_apply_pseudo();
		this.on_apply_custom_pseudo();
	};


	_pCanvasComponent.on_destroy_contents = function () {
		if (this._canvas) {
			this._canvas.destroy();
			this._canvas = null;
		}
	};


	_pCanvasComponent.on_change_containerRect = function (width, height) {
		if (this._canvas) {
			this._canvas._moveCanvas(0, 0, width, height);
			this._drawn = false;
			this.ondraw(this._canvas);
		}
	};

	_pCanvasComponent.ondraw = function (canvas) {
	};

	_pCanvasComponent.redraw = function () {
		this.ondraw(this._canvas);
	};

	delete _pCanvasComponent;
	nexacro.CanvasCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.CanvasComponent.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pCanvasCtrl = nexacro.CanvasCtrl.prototype = nexacro._createPrototype(nexacro.CanvasComponent, nexacro.CanvasCtrl);
	nexacro._setForControlStyleFinder(_pCanvasCtrl);

	delete _pCanvasCtrl;
}
