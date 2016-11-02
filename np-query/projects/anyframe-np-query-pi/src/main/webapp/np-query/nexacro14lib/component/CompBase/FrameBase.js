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

if (!nexacro.Frame) {
	nexacro.Frame_Style = function (target) {
		nexacro.Style.call(this, target);

		this.icon = null;
		this.showzoomcombo = null;
		this.statusbarheight = null;
		this.titlebarheight = null;
		this.openstatuseffect = null;
		this.moveeffect = null;
	};

	var _pFrameStyle = nexacro._createPrototype(nexacro.Style, nexacro.Frame_Style);
	nexacro.Frame_Style.prototype = _pFrameStyle;

	eval(nexacro._createValueAttributeEvalStr("_pFrameStyle", "icon"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameStyle", "showzoomcombo"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameStyle", "statusbarheight"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameStyle", "titlebarheight"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameStyle", "openstatuseffect"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameStyle", "moveeffect"));

	_pFrameStyle.__custom_emptyObject = function () {
		this.icon = null;
		this.showzoomcombo = null;
		this.statusbarheight = null;
		this.titlebarheight = null;
		this.openstatuseffect = null;
		this.moveeffect = null;
	};

	_pFrameStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.icon && !this.icon._is_empty) {
			val += "icon:" + this.icon._value + "; ";
		}
		if (this.showzoomcombo && !this.showzoomcombo._is_empty) {
			val += "showzoomcombo:" + this.showzoomcombo._value + "; ";
		}
		if (this.statusbarheight && !this.statusbarheight._is_empty) {
			val += "statusbarheight:" + this.statusbarheight._value + "; ";
		}
		if (this.titlebarheight && !this.titlebarheight._is_empty) {
			val += "titlebarheight:" + this.titlebarheight._value + "; ";
		}
		if (this.openstatuseffect && !this.openstatuseffect._is_empty) {
			val += "openstatuseffect:" + this.openstatuseffect._value + "; ";
		}
		if (this.moveeffect && !this.moveeffect._is_empty) {
			val += "moveeffect:" + this.moveeffect._value + "; ";
		}
		return val;
	};

	nexacro.Frame_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.icon = null;
		this.titlebarheight = null;
		this.statusbarheight = null;
		this.showzoomcombo = null;
		this.openstatuseffect = null;
		this.moveeffect = null;
	};

	var _pFrameCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Frame_CurrentStyle);
	nexacro.Frame_CurrentStyle.prototype = _pFrameCurrentStyle;

	_pFrameCurrentStyle.__custom_emptyObject = _pFrameStyle.__custom_emptyObject;
	_pFrameCurrentStyle.__get_custom_style_value = _pFrameStyle.__get_custom_style_value;

	delete _pFrameStyle;
	delete _pFrameCurrentStyle;

	nexacro.Frame = function (id, position, left, top, width, height, right, bottom, parent, is_main) {
		nexacro.FormBase.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.titlebar = null;
		this.statusbar = null;
		this.openalign = null;

		this.openstatus = "normal";
		this.showcascadestatustext = false;
		this.showcascadetitletext = true;
		this.showstatusbar = false;
		this.showtitlebar = true;
		this.showtitleicon = true;
		this.statustext = "";
		this.titletext = "";
		this.topmost = false;


		this._event_list = 
			{
			"onactivate" : 1, 
			"ondeactivate" : 1, 
			"onbeforeclose" : 1, 
			"onclose" : 1, 
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
			"ondevicebuttondown" : 1, 
			"ondevicebuttonpush" : 1, 
			"ondevicebuttonup" : 1, 
			"onsyscommand" : 1, 
			"onorientationchange" : 1
		};


		this._frames = new nexacro.Collection();

		this._is_main = is_main;
		if (parent) {
			this._is_top_frame = (parent._type_name == "Application");
		}

		this._applied_title_height = -1;
		this._applied_status_height = -1;
		this._state_openstatus = 0;
		this._is_click_openstatus = false;
		this._is_verticalmin = false;

		this._restore_position = null;
		this._starttrack_position = null;
		this._resizemode = null;

		this._defaultTitleHeight = 20;
		this._defaultStatusHeight = 20;

		this._minWidth = 100;
		this._minHeight = 100;
		this._defaultWidth = 100;
		this._defaultHeight = 100;

		this._is_frameset = false;
		this._is_frame = true;
		this._is_form = false;
		this._window = null;
		this._activate = false;
		this._window_type = -1;

		this._accessibility_role = "frame";
		this._is_closing = false;
		this._is_destroying = false;
	};

	_pFrame = nexacro._createPrototype(nexacro.FormBase, nexacro.Frame);
	nexacro.Frame.prototype = _pFrame;

	_pFrame._type_name = "Frame";

	nexacro.Frame._default_titlebarheight = nexacro._getCachedStyleObj("value", "20");
	nexacro.Frame._default_statusbarheight = nexacro._getCachedStyleObj("value", "20");

	_pFrame.on_apply_custom_pseudo = function (pseudo) {
		if (pseudo) {
			this._pseudo = pseudo;
		}
		else if (this._pseudo) {
			pseudo = this._pseudo;
		}

		var curstyle = this.currentstyle;
		var icon = this.on_find_CurrentStyle_icon(pseudo);
		var showzoomcombo = this.on_find_CurrentStyle_showzoomcombo(pseudo);
		var statusbarheight = this.on_find_CurrentStyle_statusbarheight(pseudo);
		var titlebarheight = this.on_find_CurrentStyle_titlebarheight(pseudo);
		var openstatuseffect = this.on_find_CurrentStyle_openstatuseffect(pseudo);
		var moveeffect = this.on_find_CurrentStyle_moveeffect(pseudo);

		if (icon != curstyle.icon) {
			curstyle.icon = icon;
			this.on_apply_style_icon();
		}
		if (showzoomcombo != curstyle.showzoomcombo) {
			curstyle.showzoomcombo = showzoomcombo;
			this.on_apply_style_showzoomcombo();
		}
		if (statusbarheight != curstyle.statusbarheight) {
			curstyle.statusbarheight = statusbarheight;
			if (this.showstatusbar) {
				this.on_apply_style_statusbarheight();
			}
		}
		if (titlebarheight != curstyle.titlebarheight) {
			curstyle.titlebarheight = titlebarheight;
			if (this.showtitlebar) {
				this.on_apply_style_titlebarheight();
			}
		}
		if (openstatuseffect != curstyle.openstatuseffect) {
			curstyle.openstatuseffect = openstatuseffect;
			this.on_apply_style_openstatuseffect();
		}
		if (moveeffect != curstyle.moveeffect) {
			curstyle.moveeffect = moveeffect;
			this.on_apply_style_moveeffect();
		}
	};

	_pFrame.on_create_custom_style = function () {
		return new nexacro.Frame_Style(this);
	};

	_pFrame.on_create_custom_currentStyle = function () {
		return new nexacro.Frame_CurrentStyle();
	};

	_pFrame.on_find_CurrentStyle_icon = function (pseudo) {
		return this._find_pseudo_obj("icon", pseudo, "value");
	};

	_pFrame.on_find_CurrentStyle_titlebarheight = function (pseudo) {
		var titlebarheight = this._find_pseudo_obj("titlebarheight", pseudo, "value");
		return titlebarheight ? titlebarheight : nexacro.Frame._default_titlebarheight;
	};

	_pFrame.on_find_CurrentStyle_statusbarheight = function (pseudo) {
		var statusbarheight = this._find_pseudo_obj("statusbarheight", pseudo, "value");
		return statusbarheight ? statusbarheight : nexacro.Frame._default_statusbarheight;
	};

	_pFrame.on_find_CurrentStyle_showzoomcombo = function (pseudo) {
		return this._find_pseudo_obj("showzoomcombo", pseudo, "value");
	};

	_pFrame.on_find_CurrentStyle_openstatuseffect = function (pseudo) {
		return this._find_pseudo_obj("openstatuseffect", pseudo, "value");
	};

	_pFrame.on_find_CurrentStyle_moveeffect = function (pseudo) {
		return this._find_pseudo_obj("moveeffect", pseudo, "value");
	};

	_pFrame.on_update_style_icon = function () {
		this.on_apply_style_icon(this.currentstyle.icon = this.on_find_CurrentStyle_icon(this._pseudo));
	};

	_pFrame.on_update_style_titlebarheight = function () {
		this.on_apply_style_titlebarheight(this.currentstyle.titlebarheight = this.on_find_CurrentStyle_titlebarheight(this._pseudo));
	};

	_pFrame.on_update_style_statusbarheight = function () {
		this.on_apply_style_statusbarheight(this.currentstyle.statusbarheight = this.on_find_CurrentStyle_statusbarheight(this._pseudo));
	};

	_pFrame.on_update_style_showzoomcombo = function () {
		this.on_apply_style_showzoomcombo(this.currentstyle.showzoomcombo = this.on_find_CurrentStyle_showzoomcombo(this._pseudo));
	};

	_pFrame.on_update_style_openstatuseffect = function () {
		this.on_apply_style_openstatuseffect(this.currentstyle.openstatuseffect = this.on_find_CurrentStyle_openstatuseffect(this._pseudo));
	};

	_pFrame.on_update_style_moveeffect = function () {
		this.on_apply_style_moveeffect(this.currentstyle.moveeffect = this.on_find_CurrentStyle_moveeffect(this._pseudo));
	};

	_pFrame.on_apply_style_icon = function () {
		var v = this.currentstyle.icon;
		if (this.titlebar) {
			this.titlebar.on_apply_style_icon(v);
		}

		if (this._is_main) {
		}
	};

	_pFrame.on_apply_style_letterspace = function () {
		var v = this.currentstyle.letterspace;
		if (this.titlebar) {
			this.titlebar.on_apply_style_letterspace(v);
		}
		if (this.statusbar) {
			this.statusbar.on_apply_style_letterspace(v);
		}
	};

	_pFrame.on_apply_style_titlebarheight = function () {
		var v = this.currentstyle.titlebarheight;
		var h = nexacro.getStyleValueInt(v, this._defaultTitleHeight);
		if (this._setTitleBarHeight(h)) {
			this._updateClientSize(this._control_element);
		}
	};

	_pFrame.on_apply_style_statusbarheight = function () {
		var v = this.currentstyle.statusbarheight;
		var h = nexacro.getStyleValueInt(v, this._defaultStatusHeight);
		if (this._setStatusBarHeight(h)) {
			this._updateClientSize(this._control_element);
		}
	};

	_pFrame.on_apply_style_showzoomcombo = function () {
		var v = this.currentstyle.showzoomcombo;
		if (v && this.statusbar) {
			var show = nexacro._toBoolean(v.value);
			this.statusbar.set_showzoomcombo(show);
		}
	};

	_pFrame.on_apply_style_openstatuseffect = function () {
		var v = this.currentstyle.openstatuseffect;
		if (v) {
			var val = v._value;
		}
	};

	_pFrame.on_apply_style_moveeffect = function () {
		var v = this.currentstyle.moveeffect;
		if (v) {
			var val = v._value;
		}
	};


	_pFrame._on_window_loaded = nexacro._emptyFn;

	_pFrame.on_created_contents = function () {
		if (this.titlebar) {
			this.titlebar.on_created();
		}
		if (this.statusbar) {
			this.statusbar.on_created();
		}

		this._resetTitleAbsoluteStyle();
	};

	_pFrame.on_create_control_element = function (parent_elem) {
		var control_elem = this.on_create_frame_control_element(parent_elem);
		return control_elem;
	};

	_pFrame.createComponent = function (bCreateOnly) {
		var parent_elem = null;
		if (this._is_window == false) {
			parent_elem = this.parent._control_element;
			if (!parent_elem) {
				return false;
			}
		}
		else {
			if (this._window) {
				nexacro._checkWindowActive(this._window);
			}
		}

		var control_elem = this._control_element;
		if (!control_elem) {
			var control_elem = this.on_create_control_element(parent_elem);

			var pseudo = this._getResultPseudo(this._status, this._pseudo);
			this._initControl(control_elem, pseudo);
			this._initContents(control_elem, pseudo);

			if (!bCreateOnly && parent_elem && parent_elem._handle) {
				this.on_created();
			}
		}
		return true;
	};

	_pFrame.on_create_contents = function () {
		if (this.titlebar) {
			this.titlebar.set_titletext(this.titletext);
			this.on_apply_style_letterspace();
		}
		if (this.statusbar) {
			this.statusbar.set_statustext(this.statustext);
			this.on_apply_style_showzoomcombo();
			this.on_apply_style_letterspace();
		}

		var flag = false;
		if (this.showtitlebar) {
			var theight;
			if (this._applied_title_height < 0) {
				var cur_titleheight = parseInt(this.currentstyle.titlebarheight) | 0;
				if (cur_titleheight < 0) {
					theight = this._defaultTitleHeight;
				}
				else {
					theight = cur_titleheight;
				}
			}
			else {
				theight = this._applied_title_height;
			}

			flag = this._setTitleBarHeight(theight);
		}
		if (this.showstatusbar) {
			var sheight;
			if (this._applied_status_height < 0) {
				var cur_statusheight = parseInt(this.currentstyle.statusbarheight) | 0;
				if (cur_statusheight < 0) {
					sheight = this._defaultStatusHeight;
				}
				else {
					sheight = cur_statusheight;
				}
			}
			else {
				sheight = this._applied_status_height;
			}

			flag = (this._setStatusBarHeight(sheight) || flag);
		}
		if (flag) {
			this._updateClientSize(this._control_element);
		}
		if (!application._is_loaded) {
			this._on_focus(true, this);
		}
	};

	_pFrame.on_created = function (_window) {
		var is_created = this._is_created;

		nexacro.FormBase.prototype.on_created.call(this, _window);

		if (this.form) {
			if (this.form._control_element) {
				this.form._on_load(this, this._url);
			}
		}
		else {
			if (this._init_formurl) {
				this.set_formurl(this._init_formurl);
			}
		}

		if (!is_created && this._state_openstatus != 0) {
			var cur_enableevent = this.enableevent;
			var cur_openstatus = this.openstatus;
			var cur_state_openstatus = this._state_openstatus;

			this.enableevent = false;
			this.openstatus = "normal";
			this._state_openstatus = 0;

			this.on_syscommand(this._control_element, cur_openstatus);

			this.enableevent = cur_enableevent;
		}

		if (this._control_element) {
			this._control_element._setResizable(this._canDragResize());
		}

		if (this._is_window) {
			this._applyTitleText();
			this._applyStatusText();
		}
	};

	_pFrame.on_destroy_contents = function () {
		if (this.statusbar) {
			this.statusbar.destroyComponent();
			this.statusbar = null;
		}
		if (this.titlebar) {
			this.titlebar.destroyComponent();
			this.titlebar = null;
		}
	};

	_pFrame.createTitleBar = function () {
		var titlebar;
		if (this._isTopFrame()) {
			titlebar = new nexacro.MainTitleBarCtrl("titlebar", "absolute", 0, 0, this._adjust_width, 0, null, null, this);
		}
		else {
			titlebar = new nexacro.ChildTitleBarCtrl("titlebar", "absolute", 0, 0, this._adjust_width, 0, null, null, this);
		}
		return titlebar;
	};

	_pFrame.createStatusBar = function () {
		var statusbar;
		if (this._isTopFrame()) {
			statusbar = new nexacro.MainStatusBarCtrl("statusbar", "absolute", 0, 0, this._adjust_width, 0, null, null, this);
		}
		else {
			statusbar = new nexacro.ChildStatusBarCtrl("statusbar", "absolute", 0, 0, this._adjust_width, 0, null, null, this);
		}
		return statusbar;
	};


	_pFrame._stat_change = function (status, pseudo) {
		if (status == "activate") {
			if (pseudo == "activate" || pseudo === true) {
				this._change_state_activate(true);
			}
			else if (pseudo == "deactivate" || pseudo === false) {
				this._change_state_activate(false);
			}

			return;
		}

		nexacro.FormBase.prototype._stat_change.call(this, status, pseudo);

		if (status == "focus" && (pseudo == "focused" || pseudo == "pushed") && !this._activate) {
			this._change_state_activate(true);
		}
	};

	_pFrame.setFocus = function (bResetScroll) {
		var win = this._window;
		if (this._is_window && win && win._handle) {
			win._setFocus();
		}
		else {
			if (this.form) {
				this.form._setFocus();
			}
		}
	};

	_pFrame._update_position = function (bsize, bmove) {
		var old_left = this._left;
		var old_top = this._top;
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
		if (this._left != old_left || this._top != old_top) {
			bmove = true;
		}
		this.on_update_position(bsize, bmove);

		if (update) {
			this.currentstyle._empty();
			this.on_apply_pseudo();
		}
	};

	_pFrame._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
		var val = null;

		if (this._is_window) {
			if (this._window) {
				var id = application._is_attach_childframe ? this._getWindow()._custom_node_id : null;
				width = parentWidth = width ? width : nexacro._getWindowHandleClientWidth(this._window._handle, id);
				height = parentHeight = height ? height : nexacro._getWindowHandleClientHeight(this._window._handle, id);
			}
		}

		var _left = left;
		var _right = right;

		var bRtl = this._isRtl(this.parent);

		if (bRtl) {
			var swap = _left;
			_left = _right;
			_right = swap;
		}

		for (var i = 0; i < 6; i++) {
			switch (i) {
				case 0:
					val = _left;
					if (_left != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(_left, parentWidth);
						}
						else {
							val = this._convToPixel(_left, parentHeight);
						}
					}
					this.left = left;
					this._left = val;
					this._adjust_left = val;
					break;
				case 1:
					val = top;
					if (top != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(top, parentWidth);
						}
						else {
							val = this._convToPixel(top, parentHeight);
						}
					}
					this.top = top;
					this._top = val;
					this._adjust_top = val;
					break;
				case 2:
					val = _right;
					if (_right != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(_right, parentWidth);
						}
						else {
							val = this._convToPixel(_right, parentHeight);
						}
					}
					this.right = right;
					this._right = val;
					break;
				case 3:
					val = bottom;
					if (bottom != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(bottom, parentWidth);
						}
						else {
							val = this._convToPixel(bottom, parentHeight);
						}
					}
					this.bottom = bottom;
					this._bottom = val;
					break;
				case 4:
					val = width;
					if (width != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(width, parentWidth);
						}
						else {
							val = this._convToPixel(width, parentHeight);
						}
					}
					this.width = width;
					this._width = val;
					break;
				case 5:
					val = height;
					if (height != null) {
						if (i % 2 == 0) {
							val = this._convToPixel(height, parentWidth);
						}
						else {
							val = this._convToPixel(height, parentHeight);
						}
					}
					this.height = height;
					this._height = val;
					break;
			}
		}

		var old_width = this._adjust_width;
		var old_height = this._adjust_height;

		this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
		this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;

		if (this._is_window) {
			this._adjust_top = this._adjust_left = 0;
		}
		else {
			this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;
			this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;

			if (bRtl) {
				this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
			}
		}
	};

	_pFrame._waitCursor = function (wait_flag, context) {
		var owner_frame = this.getOwnerFrame();
		if (owner_frame) {
			owner_frame._waitCursor(wait_flag, context);
		}
	};

	_pFrame.on_get_style_accessibility_label = function () {
		return this._getTitleText(this.showcascadetitletext);
	};

	_pFrame.on_update_position = function (resize_flag, move_flag) {
		var ret = nexacro.FormBase.prototype.on_update_position.call(this, resize_flag, move_flag);

		if (this._is_window && nexacro.Browser == "Runtime") {
			var _window = this._window;
			if (_window) {
				if (resize_flag) {
					_window.setSize(this._adjust_width, this._adjust_height);
				}
				if (move_flag) {
					_window.moveTo(this._left, this._top);
				}
			}
		}

		return ret;
	};

	_pFrame.set_left = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_left.call(this, propVal);
	};

	_pFrame.set_top = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_top.call(this, propVal);
	};

	_pFrame.set_right = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_right.call(this, propVal);
	};

	_pFrame.set_bottom = function (propVal) {
		if (!this._canMove()) {
			return;
		}
		return nexacro.FormBase.prototype.set_bottom.call(this, propVal);
	};

	_pFrame.set_width = function (propVal) {
		if (!this._canResize()) {
			return;
		}
		return nexacro.FormBase.prototype.set_width.call(this, propVal);
	};

	_pFrame.set_height = function (propVal) {
		if (!this._canResize()) {
			return;
		}
		return nexacro.FormBase.prototype.set_height.call(this, propVal);
	};

	_pFrame.set_openstatus = function (v) {
		if (this.openstatus != v) {
			switch (v) {
				case "minimize":
					this.on_syscommand(this._control_element, v);
					break;
				case "maximize":
					this.on_syscommand(this._control_element, v);
					break;
				case "normal":
					if (this._state_openstatus == 2 || this._state_openstatus == 3) {
						v = "restore";
					}
					this.on_syscommand(this._control_element, v);
					break;
			}
		}
		return this.openstatus;
	};

	_pFrame.set_showcascadestatustext = function (v) {
		var showcascadestatustext = nexacro._toBoolean(v);
		if (this.showcascadestatustext != showcascadestatustext) {
			this.showcascadestatustext = showcascadestatustext;
			this._applyStatusText();
		}
	};

	_pFrame.set_showcascadetitletext = function (v) {
		var showcascadetitletext = nexacro._toBoolean(v);
		if (this.showcascadetitletext != showcascadetitletext) {
			this.showcascadetitletext = showcascadetitletext;
			this._applyTitleText();
		}
	};

	_pFrame.set_showstatusbar = function (v) {
		var showstatusbar = nexacro._toBoolean(v);
		if (this.showstatusbar != showstatusbar) {
			this.showstatusbar = showstatusbar;
			this.showStatusbar(showstatusbar);
		}
	};

	_pFrame.set_showtitlebar = function (v) {
		var showtitlebar = nexacro._toBoolean(v);
		if (this.showtitlebar != showtitlebar) {
			this.showtitlebar = showtitlebar;
			this.showTitlebar(showtitlebar);
		}
	};

	_pFrame.set_showtitleicon = function (v) {
		var showtitleicon = nexacro._toBoolean(v);
		if (this.showtitleicon != showtitleicon) {
			this.showtitleicon = showtitleicon;
		}
	};

	_pFrame.set_statustext = function (v) {
		if (this.statustext != v) {
			this.statustext = v;
			this._applyStatusText();
		}
	};

	_pFrame.set_titletext = function (v) {
		if (this.titletext != v) {
			this.titletext = v;
			this._applyTitleText();
		}
	};

	_pFrame.set_topmost = function (v) {
		var topmost = nexacro._toBoolean(v);
		if (this.topmost != topmost) {
			this.topmost = topmost;
		}
	};

	_pFrame.set_visible = function (v) {
		nexacro.FormBase.prototype.set_visible.call(this, v);

		v = nexacro._toBoolean(v);

		var parent = this.parent;
		if (parent && parent._is_frameset && this._state_openstatus == 3 && !v) {
			var nextframe = parent._getNextOrderFrame(this);
			if (nextframe) {
				nextframe._change_state_OpenStatus(3);
			}
		}

		if (v && this.form && !nexacro._isDesktop()) {
			this.form._fitLayoutToParent();
		}
	};

	_pFrame.alert = function (strText, strCaption, strType) {
		nexacro._alert(this, strText, strCaption, strType);
	};

	_pFrame.confirm = function (strText, strCaption, strType) {
		return nexacro._confirm(this, strText, strCaption, strType);
	};

	_pFrame.getHandle = function () {
		return -1;
	};

	_pFrame.getOwnerFrame = function () {
		if (this.parent && this.parent._is_frame) {
			return this.parent;
		}

		return null;
	};

	_pFrame.addChild = function (id, obj) {
		var ret = -1;

		if (id && id.length <= 0) {
			return -1;
		}

		if (!obj) {
			throw nexacro.MakeReferenceError(this, "reference_not_define", id);
		}

		if (this[id]) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (!obj._is_frame) {
			throw nexacro.MakeTypeError(this, "type_invalid", id);
		}

		obj.parent = this;

		this[id] = obj;
		this.all.add_item(id, obj);
		var idx = this._frames.add_item(id, obj);

		obj._setRtlDirection(this._rtldirection);

		if (this._is_frameset) {
			this.frames.add_item(id, obj);
			this._zorderMap.add_item(id, obj);

			if (this._max_frame && obj._state_openstatus == 3) {
				this._max_frame._change_state_OpenStatus(0);
			}

			if (this._state_openstatus == 2 || this._is_autorecalc_frame == true) {
				if (this._control_element) {
					this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
				}
			}
		}

		return idx;
	};

	_pFrame.insertChild = function (idx, id, obj) {
		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			throw nexacro.MakeReferenceError(this, "reference_not_define", id);
		}

		if (this[id]) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (!obj._is_frame) {
			throw nexacro.MakeTypeError(this, "type_invalid", id);
		}

		obj.parent = this;

		this[id] = obj;
		this.all.add_item(id, obj);
		var idx = this._frames.insert_item(idx, id, obj);


		if (this._is_frameset) {
			this.frames.insert_item(idx, id, obj);

			if (this._is_autorecalc_frame == true) {
				if (this._control_element) {
					this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
				}
			}
		}

		return idx;
	};

	_pFrame.removeChild = function (id) {
		if (id && id.length <= 0) {
			return null;
		}
		if (!this[id]) {
			return null;
		}
		var obj = this[id];
		if (obj) {
			var is_focused = false;
			var _window = this._getWindow();
			if (_window) {
				is_focused = (_window._indexOfCurrentFocusPaths(obj) > -1);
			}

			var nextframe = null;
			if (this._is_frameset) {
				nextframe = this._getNextOrderFrame(obj);
			}

			if (obj._is_frame && obj._activate == true) {
				obj._change_state_activate(false);

				if (this._is_alive && _window.id == obj._getWindow().id) {
					_window._removeFromCurrentFocusPath(obj, true);
					_window._last_focused_elem = this._control_element;
				}
			}

			this._frames.remove_item(id);
			delete this[id];
			this.all.remove_item(id);
			if (this._is_frameset) {
				this.frames.remove_item(id);
				this._zorderMap.remove_item(id);
			}

			if (this._is_alive && obj._control_element) {
				obj._control_element._removeFromContainer();
			}

			if (this._is_frameset) {
				var maximized = false;
				if (this._max_frame == obj) {
					this._max_frame = null;
					maximized = true;
				}

				if (this._active_frame == obj) {
					this._active_frame = null;
				}

				if (maximized && nextframe) {
					nextframe._change_state_OpenStatus(3);
				}
			}

			if (this._is_frameset && (this._state_openstatus == 2 || this._is_autorecalc_frame == true)) {
				if (this._control_element) {
					this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
				}
			}

			if (nextframe) {
				nextframe.setFocus();
			}
			this._applyTitleText();
		}
		return obj;
	};


	_pFrame.showTitlebar = function (bshow) {
		if (bshow) {
			var v = this.currentstyle.titlebarheight;
			var h = nexacro.getStyleValueInt(v, this._defaultTitleHeight);

			if (this._setTitleBarHeight(h)) {
				this._updateClientSize(this._control_element);
			}
		}
		else {
			if (this._setTitleBarHeight(0)) {
				this._updateClientSize(this._control_element);
			}
		}

		this._applyDragMoveType();
	};

	_pFrame.showStatusbar = function (bshow) {
		if (bshow) {
			var v = this.currentstyle.statusbarheight;
			var h = nexacro.getStyleValueInt(v, this._defaultStatusHeight);

			if (this._setStatusBarHeight(h)) {
				this._updateClientSize(this._control_element);
			}
		}
		else {
			if (this._setStatusBarHeight(0)) {
				this._updateClientSize(this._control_element);
			}
		}
	};

	_pFrame.move = function (left, top, width, height, right, bottom) {
		if (!this._canMove()) {
			return;
		}

		this._move(left, top, width, height, right, bottom);
	};

	_pFrame._move = function (left, top, width, height, right, bottom) {
		var old_left = this._left;
		var old_top = this._top;
		var old_width = this._adjust_width;
		var old_height = this._adjust_height;
		var bsize = false, bmove = false;
		var update = false;

		if (this.parent) {
			this._adjustPosition(left, top, right, bottom, width, height, this.parent._client_width, this.parent._client_height);
		}
		else {
			this._adjustPosition(left, top, right, bottom, width, height, null, null);
		}

		if (this._adjust_width != old_width || this._adjust_height != old_height) {
			bsize = true;
			if (old_width == 0 || old_height == 0) {
				update = true;
			}
		}
		if (this._left != old_left || this._top != old_top) {
			bmove = true;
		}

		this.on_update_position(bsize, bmove);

		if (this._control_element) {
			if (update) {
				this.currentstyle._empty();
				this._control_pseudo = "";
			}
			var pseudo = this._getResultPseudo(this._status, this._pseudo);
			this._updateControl(this._control_element, pseudo);
			this._updateContents(this._control_element, pseudo);
		}
	};

	_pFrame.resize = function (w, h) {
		if (!this._canResize()) {
			return;
		}
		return nexacro.FormBase.prototype.resize.call(this, w, h);
	};


	_pFrame._on_titlebar_dblclick = function (obj, e) {
		if (this.resizable == false) {
			return;
		}

		switch (this._state_openstatus) {
			case 0:
				this.on_maxbutton_click();
				break;
			case 2:
			case 3:
				this.on_normalbutton_click();
				break;
		}
	};

	_pFrame._on_titlebar_starttrack = function () {
		if (!this._canDragMove()) {
			this._starttrack_position = null;
			return false;
		}

		this._starttrack_position = {
			left : this._adjust_left_ltr, 
			top : this._adjust_top, 
			width : this._adjust_width, 
			height : this._adjust_height
		};

		var owner_frame = this.getOwnerFrame();
		if (owner_frame && owner_frame._is_frameset) {
			owner_frame._on_child_starttrack(this);
		}
	};

	_pFrame._on_titlebar_endtrack = function (x, y, dragdata) {
		if (this._starttrack_position == null) {
			return;
		}

		var owner_frame = this.getOwnerFrame();
		if (owner_frame && owner_frame._is_frameset) {
			owner_frame._on_child_endtrack(this, x, y, dragdata);
		}

		delete this._starttrack_position;
	};

	_pFrame._on_titlebar_movetrack = function (x, y, dragdata, windowX, windowY) {
		var _pos = this._starttrack_position;
		if (_pos == null) {
			return;
		}

		if (windowX != undefined && windowY != undefined) {
			var winX = (windowX ? windowX : 0) + parseInt(application.mainframe.left);
			var winY = (windowY ? windowY : 0) + parseInt(application.mainframe.top);
			var r = parseInt(application.mainframe.left) + application.mainframe._adjust_width;
			var b = parseInt(application.mainframe.top) + application.mainframe._adjust_height;

			if (!(application.mainframe.left <= winX && r >= winX && application.mainframe.top <= winY && b >= winY)) {
				return;
			}
		}

		if (!this._is_window) {
			this._move(_pos.left + x, _pos.top + y, _pos.width, _pos.height);
		}

		var owner_frame = this.getOwnerFrame();
		if (owner_frame && owner_frame._is_frameset) {
			owner_frame._on_child_movetrack(this, x, y, dragdata);
		}
	};

	_pFrame._on_border_starttrack = function (resize_cursor) {
		if (!this._canDragResize()) {
			this._starttrack_position = null;
			return false;
		}

		this._starttrack_position = {
			left : this._adjust_left, 
			top : this._adjust_top, 
			width : this._adjust_width, 
			height : this._adjust_height
		};

		this._resizemode = resize_cursor;
		if (this.form) {
			this.form._on_focus(true, "lbuttondown");
		}
	};

	_pFrame._on_border_endtrack = function (x, y, dragdata) {
		if (this._starttrack_position == null) {
			return;
		}

		this._resizemode = null;

		delete this._starttrack_position;
	};

	_pFrame._on_border_movetrack = function (x, y, dragdata) {
		if (this._starttrack_position == null) {
			return;
		}

		var left, top, width, bottom;
		left = this._starttrack_position.left;
		top = this._starttrack_position.top;
		width = this._starttrack_position.width;
		height = this._starttrack_position.height;

		var minmaxinfo = this._getMinMaxInfo();
		if (this._resizemode._value == "n-resize" || this._resizemode._value == "nw-resize" || this._resizemode._value == "ne-resize") {
			top += y;
			height -= y;
			if (height < minmaxinfo.cy) {
				top -= (minmaxinfo.cy - height);
				height = minmaxinfo.cy;
			}
		}
		if (this._resizemode._value == "s-resize" || this._resizemode._value == "sw-resize" || this._resizemode._value == "se-resize") {
			height += y;
			if (height < minmaxinfo.cy) {
				height += (minmaxinfo.cy - height);
			}
		}
		if (this._resizemode._value == "w-resize" || this._resizemode._value == "nw-resize" || this._resizemode._value == "sw-resize") {
			left += x;
			width -= x;
			if (width < minmaxinfo.cx) {
				left -= (minmaxinfo.cx - width);
				width = minmaxinfo.cx;
			}
		}
		if (this._resizemode._value == "e-resize" || this._resizemode._value == "ne-resize" || this._resizemode._value == "se-resize") {
			width += x;
			if (width < minmaxinfo.cx) {
				width += (minmaxinfo.cx - width);
			}
		}

		this._move(left, top, width, height);
	};

	_pFrame.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._stat_change("activate", "activate");
	};


	_pFrame.on_minbutton_click = function (obj, e) {
		this._is_click_openstatus = true;
		this.on_syscommand(this._control_element, "minimize", undefined, this, obj);
		this._is_click_openstatus = false;
	};

	_pFrame.on_maxbutton_click = function (obj, e) {
		this._is_click_openstatus = true;
		this.on_syscommand(this._control_element, "maximize", undefined, this, obj);
		this._is_click_openstatus = false;
	};

	_pFrame.on_normalbutton_click = function (obj, e) {
		this._is_click_openstatus = true;
		this.on_syscommand(this._control_element, "restore", undefined, this, obj);
		this._is_click_openstatus = false;
	};

	_pFrame.on_closebutton_click = function (obj, e) {
		var confirm_message = this._on_beforeclose();
		if (this._checkAndConfirmClose(confirm_message) == false) {
			return;
		}

		this._on_close();

		var owner_frame = this.getOwnerFrame();
		if (owner_frame) {
			owner_frame.removeChild(this.id);

			if (owner_frame._control_element) {
				owner_frame.on_change_containerRect(owner_frame._control_element.client_width, owner_frame._control_element.client_height);
			}
		}

		if (this._is_window && this._window && this._window._is_alive) {
			this._window.destroy();
		}
		else {
			this._destroy();
		}

		if (this._control_element) {
			this._control_element.destroy();
		}
		this._control_element = null;
	};

	_pFrame._on_beforeclose = function (root_closing_comp) {
		if (!root_closing_comp) {
			root_closing_comp = this;
		}
		var msg = "";

		if (this.form) {
			var form_msg = this.form._on_beforeclose(root_closing_comp);
			msg = this.form._appendBeforeCloseMsg(msg, form_msg);
		}

		if (this.frames) {
			var frames = this.frames;
			var len = frames.length;
			for (var i = 0; i < len; i++) {
				var child_msg = frames[i]._on_beforeclose(root_closing_comp);
				msg = this._appendBeforeCloseMsg(msg, child_msg);
			}
		}

		if (this.frame) {
			var child_msg = this.frame._on_beforeclose(root_closing_comp);
			msg = this._appendBeforeCloseMsg(msg, child_msg);
		}

		var self_msg = this._on_bubble_beforeclose(root_closing_comp);
		msg = this._appendBeforeCloseMsg(msg, self_msg);

		return msg;
	};

	_pFrame._on_close = function () {
		if (this._is_closing) {
			return;
		}
		this._is_closing = true;
		if (this.form) {
			this.form._on_close();
		}

		if (this.frames) {
			var frames = this.frames;
			var len = frames.length;
			for (var i = 0; i < len; i++) {
				if (frames[i]) {
					if (this._getWindow() != frames[i]._getWindow()) {
						continue;
					}

					frames[i]._on_close();
				}
			}
		}

		if (this.frame) {
			this.frame._on_close();
		}

		this._on_bubble_close();

		this._is_closing = false;
		return true;
	};

	_pFrame._canMove = function () {
		if (this._state_openstatus != 0) {
			return false;
		}
		return true;
	};

	_pFrame._canDragMove = function () {
		if (nexacro.isTouchInteraction) {
			return false;
		}

		if (!this._canMove()) {
			return false;
		}


		if (!this._is_window) {
			if (this._window_type == 1 || this._window_type == 4) {
				return true;
			}

			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				if (owner_frame._on_child_starttrack == undefined) {
					return false;
				}
			}
		}

		if (this._dragmovetype == 0) {
			return false;
		}

		return true;
	};

	_pFrame._canResize = function () {
		if (this._state_openstatus != 0) {
			return false;
		}
		return true;
	};

	_pFrame._canDragResize = function () {
		if (nexacro.isTouchInteraction) {
			return false;
		}

		if (!this._canResize()) {
			return false;
		}

		if (nexacro.Browser != "Runtime" && this._is_window) {
			return false;
		}

		if (this.resizable == false) {
			return false;
		}


		var owner_frame = this.getOwnerFrame();
		if (owner_frame && !this._is_window && (this._window_type != 1 && this._window_type != 4)) {
			if (owner_frame._is_autorecalc_frame) {
				return false;
			}
		}

		return true;
	};

	_pFrame._procSysCommand = function (systemcommand) {
		var statevalue = -1;
		switch (systemcommand) {
			case "restore":
				statevalue = 1;
				break;
			case "minimize":
				statevalue = 2;
				break;
			case "maximize":
				statevalue = 3;
				break;
		}

		if (this._is_window && this._window) {
			if (statevalue != (-1)) {
				this._window._procSysCommand(statevalue);
			}
		}

		if (statevalue == 1) {
			if (this._is_window && this._window && this._state_openstatus == 2) {
				systemcommand = ["normal", "restore", "minimize", "maximize"][this._prestate_openstatus];
				statevalue = this._prestate_openstatus;
			}
			else {
				systemcommand = "normal";
				statevalue = 0;
			}
		}

		if (statevalue != (-1)) {
			this.openstatus = systemcommand;
			this._change_state_OpenStatus(statevalue);
		}
	};

	_pFrame.on_syscommand = function (elem, systemcommand, event_bubbles, fire_comp, refer_comp) {
		if (event_bubbles === undefined) {
			if (!refer_comp) {
				refer_comp = this;
			}
		}

		if (this.visible && this._isEnable() && this.enableevent) {
			event_bubbles = this.on_fire_syscommand(this, systemcommand);
			if (event_bubbles === false) {
				return false;
			}
		}

		if ((event_bubbles !== false) && this.parent && !this.parent._is_application && !this.parent._is_form) {
			var ret = this.parent.on_syscommand(elem, systemcommand, false, fire_comp ? fire_comp : this, refer_comp);
			if (ret == false) {
				return false;
			}
		}

		if (fire_comp && fire_comp != this) {
			return true;
		}

		this._procSysCommand(systemcommand);
	};

	_pFrame._on_activate = function () {
		if (this._activate == false) {
			return;
		}


		nexacro.FormBase.prototype._on_activate.call(this);

		if (this.form) {
			this.form._on_activate();
		}

		return true;
	};

	_pFrame._on_deactivate = function () {
		if (this._activate == false) {
			return;
		}

		if (this.form) {
			this.form._on_deactivate();
		}

		nexacro.FormBase.prototype._on_deactivate.call(this);

		return true;
	};

	_pFrame._on_orientationchange = function (orientation) {
		this.on_fire_onorientationchange(orientation);

		if (this.form) {
			this.form._on_orientationchange(orientation);
		}

		if (this.frames) {
			var frames = this.frames;
			var len = frames.length;
			for (var i = 0; i < len; i++) {
				if (frames[i]) {
					if (this._getWindow() != frames[i]._getWindow()) {
						continue;
					}

					frames[i]._on_orientationchange(orientation);
				}
			}
		}

		if (this.frame) {
			this.frame._on_orientationchange(orientation);
		}

		return true;
	};

	_pFrame._getRootLayerFrame = function () {
		var frame = this;
		while (frame) {
			if (frame._is_window) {
				return frame;
			}
			if (frame._window_type == 1 || frame._window_type == 4) {
				return frame;
			}
			if (frame.getOwnerFrame()) {
				frame = frame.getOwnerFrame();
			}
			else {
				break;
			}
		}
		return frame;
	};

	_pFrame._isRootLayerFrame = function () {
		if (this._is_window) {
			return true;
		}
		if (this._window_type == 1 || this._window_type == 4) {
			return true;
		}

		return false;
	};

	_pFrame.on_fire_syscommand = function (obj, state) {
		if (this.onsyscommand && this.onsyscommand._has_handlers) {
			var evt = new nexacro.SysCommandEventInfo(obj, "onsyscommand", state);
			var ret = this.onsyscommand._fireCheckEvent(this, evt);
			if (!ret) {
				return false;
			}
		}
		if (this.form && this.form.onsyscommand && this.form.onsyscommand._has_handlers) {
			var evt = new nexacro.SysCommandEventInfo(obj, "onsyscommand", state);
			var ret = this.form.onsyscommand._fireCheckEvent(this.form, evt);
			if (!ret) {
				return false;
			}
		}

		return true;
	};

	_pFrame._applyDragMoveType = nexacro._emptyFn;
	_pFrame.lookup = nexacro._emptyFn;
	_pFrame.lookupSetter = nexacro._emptyFn;
	_pFrame.lookupFunc = nexacro._emptyFn;

	_pFrame._setTitleBarHeight = function (height) {
		var control_elem = this._control_element;
		if (control_elem && this._applied_title_height != height) {
			this._applied_title_height = height;
			if (height > 0) {
				var apply_height = this._getAppliedTitleHeight(height);
				if (!this.titlebar) {
					this.titlebar = this.createTitleBar();
					var titletext = this._getTitleText(this.showcascadetitletext);
					this.titlebar.set_titletext(titletext);
					control_elem.setTitleBarControl(this.titlebar, apply_height);
					this.titlebar.createComponent();
				}
				else {
					control_elem.setTitleBarControl(this.titlebar, apply_height);
				}
			}
			else {
				if (this.titlebar) {
					this.titlebar.destroyComponent();
					this.titlebar = null;
					control_elem.setTitleBarControl(null, 0);
				}
			}
			return true;
		}
		return false;
	};

	_pFrame._setStatusBarHeight = function (height) {
		var control_elem = this._control_element;
		if (control_elem && this._applied_status_height != height) {
			this._applied_status_height = height;
			if (height > 0) {
				var apply_height = this._getAppliedStatusHeight(height);
				if (!this.statusbar) {
					this.statusbar = this.createStatusBar();
					var statustext = this._getStatusText(this.showcascadestatustext);
					this.statusbar.set_statustext(statustext);
					control_elem.setStatusBarControl(this.statusbar, apply_height);
					this.statusbar.createComponent();
					this.statusbar._setResizable(this._canDragResize());
				}
				else if (this._applied_status_height != apply_height) {
					control_elem.setStatusBarControl(this.statusbar, apply_height);
				}
			}
			else {
				if (this.statusbar) {
					this.statusbar.destroyComponent();
					this.statusbar = null;
					control_elem.setStatusBarControl(null, 0);
				}
			}
			return true;
		}
		return false;
	};

	_pFrame._setVerticalMin = function (v) {
		if (this._is_verticalmin == v) {
			return;
		}

		this._is_verticalmin = v;
		if (this._control_element) {
			this._control_element._is_verticalmin = v;
			if (this.titlebar) {
				nexacro.ContainerElement.prototype.bringToFrontElement.call(this._control_element, this.titlebar._control_element);
			}
		}

		if (this.titlebar) {
			this.titlebar._setVerticalMin(v);
		}
	};

	_pFrame._resetTitleAbsoluteStyle = function () {
		var titlebar = this.titlebar;
		if (!titlebar) {
			return;
		}

		var _style = 0;
		var owner_frame = this.getOwnerFrame();
		var is_modal = (this._window_type == 1 || this._window_type == 4 || this._window_type == 5);
		if (!this.resizable) {
			if (this._isNested()) {
				_style |= 0x0020;
			}
			else {
				_style |= 0x0001 | 0x0002;
			}
		}
		else {
			_style |= 0x0100 | 0x0200;
		}

		if (owner_frame && !this._isRootLayerFrame()) {
			if (owner_frame._isTopFrame()) {
				_style |= 0x0010 | 0x0020 | 0x0040;
			}

			if (owner_frame.fullframemaximize == false) {
				_style |= 0x0001;
			}
		}

		if (is_modal) {
			_style |= 0x0001;
			if (!this.resizable) {
				_style |= 0x0002;
			}
		}

		titlebar._setAbsoluteStyle(_style, 0xffff);
	};

	_pFrame._getMinMaxInfo = function () {
		var cx = 110, cy = 0;
		var border = this.on_find_CurrentStyle_border();

		if (border) {
			cx += border._getBorderWidth();
			cy += border._getBorderHeight();
		}

		if (this.showtitlebar) {
			cy += this._getTitlebarHeight();
		}
		if (this.showstatusbar) {
			cy += this._getStatusbarHeight();
		}

		return {
			cx : cx, 
			cy : cy
		};
	};

	_pFrame._isTopFrame = function () {
		return (this._is_top_frame);
	};
	_pFrame._getWindow = function () {
		if (this._is_window) {
			return this._window;
		}

		var parent = this.parent;
		if (parent) {
			return parent._getWindow();
		}
		return null;
	};

	_pFrame._getTitlebarHeight = function () {
		if (this.showtitlebar) {
			var ret = 20;
			if (this.style._applied_title_height > 0) {
				ret = this.style._applied_title_height;
			}
			else if (this.titlebar) {
				ret = this.titlebar._adjust_height;
			}
			return ret;
		}
		return 0;
	};

	_pFrame._getStatusbarHeight = function () {
		if (this.showtitlebar) {
			var ret = 20;
			if (this.style._applied_status_height > 0) {
				ret = this.style._applied_status_height;
			}
			else if (this.statusbar) {
				ret = this.statusbar._adjust_height;
			}
			return ret;
		}
		return 0;
	};

	_pFrame._isEnable = function () {
		return nexacro.FormBase.prototype._isEnable.call(this);
	};

	_pFrame._isNested = function () {
		return !this._is_window;
	};

	_pFrame._getTitleText = function (brecursive) {
		return this.titletext;
	};

	_pFrame._applyTitleText = function () {
		if (this._control_element) {
			var cascade = this.showcascadetitletext;
			var titletext = this._getTitleText(cascade);
			if (this.titlebar) {
				this.titlebar.set_titletext(titletext);
			}

			if (this.parent && this.parent._is_frame) {
				this.parent._applyTitleText();
			}

			if (this._is_window) {
				this._window._setTitleText(titletext);
			}
		}
	};

	_pFrame._applyStatusText = function () {
		if (this._control_element) {
			var cascade = this.showcascadestatustext;
			var statustext = this._getStatusText(cascade);
			if (this.statusbar) {
				this.statusbar.set_statustext(statustext);
			}

			if (this.parent && this.parent._is_frame) {
				this.parent._applyStatusText();
			}

			if (this._is_window) {
				this._window._setStatusText(statustext);
			}
		}
	};

	_pFrame._change_state_OpenStatus = function (cur) {
		var pre = this._prestate_openstatus = this._state_openstatus;
		this._state_openstatus = cur;

		if (cur == 1) {
			alert("_change_state_OpenStatus(1) called");
		}

		if (pre != cur) {
			var owner_frame = this.getOwnerFrame();

			if (pre == 2) {
				this._setVerticalMin(false);
			}

			if (pre == 3 && !this._is_window) {
				if (owner_frame && owner_frame._is_frame == true && owner_frame._is_frameset == true) {
					owner_frame._max_frame = null;
				}
			}

			if (pre == 0 && (cur == 2 || cur == 3)) {
				if (!this._is_window) {
					if (this._restore_position) {
						this._restore_position = null;
					}

					if ((owner_frame && owner_frame._is_frameset && !owner_frame._is_autorecalc_frame) || (this._window_type == 1 || this._window_type == 4)) {
						this._restore_position = {
							left : this.left, 
							top : this.top, 
							width : this.width, 
							height : this.height, 
							right : this.right, 
							bottom : this.bottom
						};
					}
				}

				if (this._control_element) {
					this._control_element._setResizable(false);
				}
			}

			if ((pre == 2 || pre == 3) && cur == 0) {
				if (!this._is_window) {
					var restore = this._restore_position;
					if (restore) {
						this._move(restore.left, restore.top, restore.width, restore.height, restore.right, restore.bottom);

						this._restore_position = null;
					}
				}

				if (this._control_element) {
					this._control_element._setResizable(this._canDragResize());
				}
			}

			if (cur == 3 && !this._is_window) {
				if (owner_frame && owner_frame._is_frame == true && owner_frame._is_frameset == true) {
					if (owner_frame._max_frame && owner_frame._max_frame != this) {
						owner_frame._max_frame._change_state_OpenStatus(0);
					}
					owner_frame._max_frame = this;
				}
				else if (this._window_type == 1 || this._window_type == 4) {
					var win = this._getWindow();
					this._move(0, 0, win.clientWidth, win.clientHeight);
				}
			}

			if (this.titlebar) {
				this.titlebar._change_state_OpenStatus(cur);
			}

			if (this._prestate_openstatus != this._state_openstatus) {
				if (owner_frame && owner_frame._control_element) {
					owner_frame.on_change_containerRect(owner_frame._control_element.client_width, owner_frame._control_element.client_height);
				}
			}

			if (cur == 3 && !this._is_window) {
				if (owner_frame && owner_frame._is_frameset == true) {
					this.setFocus();
				}
			}

			this.openstatus = ["normal", "restore", "minimize", "maximize"][cur];
		}
	};

	_pFrame._change_state_activate = function (cur) {
		if (this._activate == false && cur == true) {
			if (this._control_element) {
				var owner_frame = this.getOwnerFrame();
				if (owner_frame) {
					var _win = this._getWindow();
					var owner_win = owner_frame._getWindow();
					if (_win == owner_win) {
						owner_frame._change_state_activate(cur, this);
					}
				}

				if (this.form) {
					var root_frame = this;
					while (root_frame) {
						if (root_frame._is_window) {
							break;
						}
						root_frame = root_frame.getOwnerFrame();
					}

					if (root_frame && root_frame.statusbar) {
						root_frame.statusbar._refreshZoomCombo(this.form);
					}
				}

				this._applyTitleText();
				this._applyStatusText();
			}

			this._activate = cur;

			this._on_activate();
		}
		else if (this._activate == true && cur == false) {
			this._on_deactivate();

			this._activate = cur;
		}
	};

	_pFrame._getAppliedTitleHeight = function (h) {
		return nexacro._AppliedTitleBarHeight(this, h);
	};

	_pFrame._getAppliedStatusHeight = function (h) {
		return nexacro._AppliedStatusBarHeight(this, h);
	};

	nexacro.MainFrame_Style = function (target) {
		nexacro.Frame_Style.call(this, target);

		this.menubarheight = null;
	};

	var _pMainFrameStyle = nexacro._createPrototype(nexacro.Frame_Style, nexacro.MainFrame_Style);
	nexacro.MainFrame_Style.prototype = _pMainFrameStyle;

	eval(nexacro._createValueAttributeEvalStr("_pMainFrameStyle", "menubarheight"));

	_pMainFrameStyle.__custom_emptyObject = function () {
		this.menubarheight = null;
	};

	_pMainFrameStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.menubarheight && !this.menubarheight._is_empty) {
			val += "menubarheight:" + this.menubarheight._value + "; ";
		}
		return val;
	};

	nexacro.MainFrame_CurrentStyle = function () {
		nexacro.Frame_CurrentStyle.call(this);

		this.menubarheight = null;
	};

	var _pMainFrameCurrentStyle = nexacro._createPrototype(nexacro.Frame_CurrentStyle, nexacro.MainFrame_CurrentStyle);
	nexacro.MainFrame_CurrentStyle.prototype = _pMainFrameCurrentStyle;

	_pMainFrameCurrentStyle.__custom_emptyObject = _pMainFrameStyle.__custom_emptyObject;
	_pMainFrameCurrentStyle.__get_custom_style_value = _pMainFrameStyle.__get_custom_style_value;

	delete _pMainFrameStyle;
	delete _pMainFrameCurrentStyle;

	nexacro.MainFrame = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Frame.call(this, id, position, left, top, width, height, right, bottom, parent, true);
		this.openalign = new nexacro.Style_align();
		this.applicationmenu = null;
		this.frame = null;
		this.menubar = null;
		this.resizable = true;
		this.layered = false;


		this._window = new nexacro.Window(id, null, true);

		this._menu_height = 0;
		this._applied_menu_height = 0;
		this._ref_comm = 0;
		this._defaultTitleHeight = 30;
		this._defaultStatusHeight = 30;
		this._is_window = true;
		this._is_autorecalc_frame = true;
		this._accessibility_role = "application";
	};

	_pMainFrame = nexacro._createPrototype(nexacro.Frame, nexacro.MainFrame);
	nexacro.MainFrame.prototype = _pMainFrame;

	_pMainFrame._type_name = "MainFrame";


	_pMainFrame.getActiveFrame = function () {
		return this.frame;
	};

	_pMainFrame.on_apply_custom_pseudo = function (pseudo) {
		nexacro.Frame.prototype.on_apply_custom_pseudo.call(this);

		var curstyle = this.currentstyle;

		var menubarheight = this.on_find_CurrentStyle_menubarheight(pseudo);

		if (menubarheight != curstyle.menubarheight) {
			curstyle.menubarheight = menubarheight;
			this.on_apply_style_menubarheight();
		}
	};

	_pMainFrame.on_create_custom_style = function () {
		return new nexacro.MainFrame_Style(this);
	};
	_pMainFrame.on_create_custom_currentStyle = function () {
		return new nexacro.MainFrame_CurrentStyle();
	};

	_pMainFrame.on_find_CurrentStyle_menubarheight = function (pseudo) {
		return this._find_pseudo_obj("menubarheight", pseudo, "value");
	};

	_pMainFrame.on_update_style_menubarheight = function () {
		this.on_apply_style_menubarheight(this.currentstyle.menubarheight = this.on_find_CurrentStyle_menubarheight(this._pseudo));
	};

	_pMainFrame.on_apply_style_menubarheight = function () {
		var v = this.currentstyle.menubarheight;
		var h = nexacro.getStyleValueInt(v, 0);
		this._menu_height = h;
		if (this._setMenuBarHeight(h)) {
			this._updateClientSize(this._control_element);
		}
	};

	_pMainFrame.on_createBodyFrame = nexacro._emptyFn;

	_pMainFrame.createComponent = function () {
		this.createWindow();
		return nexacro.Frame.prototype.createComponent.call(this);
	};

	_pMainFrame.createWindow = function () {
		var _win = this._window;
		if (_win == null) {
			_win = this._window = new nexacro.Window(this.name, null, true);
		}

		_win.create(null, this.name, this._adjust_width, this._adjust_height, this._adjust_left, this._adjust_top, this.resizable);
		_win.attachFrame(this, false);
		_win._setSystemMenuResizable(this.resizable);

		var width = nexacro._getMainWindowWidth(_win);
		var height = nexacro._getMainWindowHeight(_win);
		this._setSize(width, height);
	};

	_pMainFrame.createMenuBar = function () {
		var menubar = new nexacro.Form("menubar", 0, 0, 0, this._menubar_height, this);
		this._applied_menu_height = this._menubar_height;
		menubar.set_style("background:green;");
		menubar.set_text("menubar");
		this.manubar = menubar;
		return menubar;
	};

	_pMainFrame.createBodyFrame = function () {
		this.on_createBodyFrame();
	};

	_pMainFrame.on_create_contents = function () {
		nexacro.Frame.prototype.on_create_contents.call(this);

		if (this.menubar) {
			this._control_element.setMenuBarControl(this.menubar, this._applied_menu_height);
			this.menubar.createComponent();
			if (this._applied_menu_height > 0) {
			}
			this._updateClientSize(this._control_element);
		}
		if (this.frame) {
			this.frame._setPos(0, 0);
			this.frame._setSize(this._client_width, this._client_height);
			this.frame.createComponent();

			this.frame._change_state_OpenStatus(3);
		}
	};

	_pMainFrame.on_created_contents = function () {
		nexacro.Frame.prototype.on_created_contents.call(this);
		if (this.menubar) {
			this.menubar.on_created();
		}
		if (this.frame) {
			this.frame.on_created();
		}

		var control_element = this._control_element;
		if (control_element) {
			control_element.setElementRtlDirection(application.rtldirection);
		}

		if (nexacro.Browser == "Runtime" && nexacro._isDesktop()) {
			var left = this._adjust_left;
			var top = this._adjust_top;
			var width = this._adjust_width;
			var height = this._adjust_height;

			var after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
			if (after_align_pos) {
				left = after_align_pos.left;
				top = after_align_pos.top;
			}
			this._move(left, top, width, height);
		}
	};

	_pMainFrame.destroyComponent = function () {
		if (this._waitcomp) {
			this._waitcomp.destroy();
			this._waitcomp = null;
		}

		if (application._com_waiting) {
			application._com_waiting = false;
		}

		this._is_destroying = true;

		if (this._window && this._window._is_alive) {
			this._window.destroy();
			this._window = null;
		}
		else if (this._is_alive) {
			nexacro.Frame.prototype.destroyComponent.call(this);
		}

		this._is_destroying = false;
		return true;
	};

	_pMainFrame.on_destroy_contents = function () {
		nexacro.Frame.prototype.on_destroy_contents.call(this);
		if (this.menubar) {
			this.menubar.destroyComponent();
			this.menubar = null;
		}
		if (this.frame) {
			this.frame.destroyComponent();
			this.frame = null;
		}
	};

	_pMainFrame.on_change_containerPos = function (left, top) {
		if (this.frame) {
			this.frame._setPos(0, 0);
		}
	};

	_pMainFrame.on_change_containerRect = function (width, height) {
		if (this.frame) {
			this.frame._setSize(width, height);
		}

		if (this.titlebar) {
			this.titlebar._update_position(false, true);
		}
	};

	_pMainFrame.on_update_position = function (resize_flag, move_flag) {
		var ret = nexacro.FormBase.prototype.on_update_position.call(this, resize_flag, move_flag);

		if (resize_flag || move_flag) {
			var frames = this._frames;
			var frames_len = frames.length;
			for (var i = 0; i < frames_len; i++) {
				if (this.frame.id == frames[i].id) {
					continue;
				}
				var form = frames[i].form;
				form.on_change_containerRect(form._client_width, form._client_height);
			}
		}

		if (this._is_window && nexacro.Browser == "Runtime") {
			var _window = this._window;
			if (_window) {
				if (resize_flag) {
					if (nexacro._isDesktop()) {
						_window.setSize(this._adjust_width, this._adjust_height);
					}
				}

				if (move_flag) {
					_window.moveTo(this._left, this._top);
				}
			}
		}

		return ret;
	};


	_pMainFrame._waitCursor = function (wait_flag, context) {
		if (this._window) {
			if (wait_flag == true) {
				var waitcomp = this._waitcomp;
				if (this._ref_comm == 0) {
					application._com_waiting = true;

					if (waitcomp == null) {
						waitcomp = this._waitcomp = new nexacro.WaitComponent("waitwindow", "absolute", 0, 0, 0, 0, null, null, this);
						waitcomp.createComponent();
						waitcomp.on_created();
					}

					var waitcursor_imgurl = application._getLoadingImageUrl();
					waitcomp.setImage(waitcursor_imgurl);
					waitcomp.show();
				}
				waitcomp._addContext(context);
				this._ref_comm++;
			}
			else {
				if (this._ref_comm > 0) {
					this._ref_comm--;
				}

				var waitcomp = this._waitcomp;
				if (waitcomp) {
					waitcomp._removeContext(context);
					if (this._ref_comm <= 0) {
						this._ref_comm = 0;
						application._com_waiting = false;
						waitcomp.hide();
					}
				}
			}
		}
	};

	_pMainFrame.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		if (this.visible != v) {
			nexacro.Component.prototype.set_visible.call(this, v);

			var _win = this._getRootWindow();
			if (_win && _win._handle) {
				nexacro._setPopupWindowHandleVisible(_win._handle, v);
			}
		}
	};
	_pMainFrame.set_openalign = function (v) {
		if (this.openalign._is_empty && this.openalign._value != v) {
			this.openalign._setValue(v);
			this.on_apply_prop_openalign();
		}
	};

	_pMainFrame.set_resizable = function (v) {
		var resizable = nexacro._toBoolean(v);
		if (this.resizable != resizable) {
			this.resizable = resizable;
			this._resetTitleAbsoluteStyle();

			if (this._control_element) {
				this._control_element._setResizable(this._canDragResize());
			}
		}
	};

	_pMainFrame.set_layered = function (v) {
		var layered = nexacro._toBoolean(v);
		if (this.layered != layered) {
			this.layered = layered;
		}
	};


	_pMainFrame.on_apply_prop_openalign = function () {
		if (!this.openalign._is_empty) {
		}
	};

	_pMainFrame.on_apply_prop_enable = function (v) {
		if (this.frame) {
			this.frame._setEnable(v);
		}
	};

	_pMainFrame.on_apply_prop_rtldirection = function () {
		var _rtldirection = this._rtldirection;

		var titlebar = this.titlebar;
		if (titlebar) {
			titlebar._setRtlDirection(_rtldirection);
		}
		var statusbar = this.statusbar;
		if (statusbar) {
			statusbar._setRtlDirection(_rtldirection);
		}

		var menubar = this.menubar;
		if (menubar) {
			menubar._setRtlDirection(_rtldirection);
		}

		var frame = this.frame;
		if (frame) {
			frame._setRtlDirection(_rtldirection);

			var owner_frame = this.frame.getOwnerFrame();
			var width = owner_frame._control_element.client_width;
			var height = owner_frame._control_element.client_height;
			this.frame._setSize(width, height);
		}
	};



	_pMainFrame._on_beforeclose = function (root_closing_comp) {
		if (!root_closing_comp) {
			root_closing_comp = this;
		}

		var application_msg = application.on_fire_onbeforeexit();
		var msg = nexacro.Frame.prototype._on_beforeclose.call(this, root_closing_comp);
		msg = this._appendBeforeCloseMsg(msg, application_msg);

		return msg;
	};
	_pMainFrame.on_syscommand = function (elem, systemcommand, event_bubbles, fire_comp, refer_comp) {
		var ret = this.on_fire_syscommand(this, systemcommand);
		if (!ret) {
			return false;
		}

		if (fire_comp && fire_comp != this) {
			return true;
		}

		this._procSysCommand(systemcommand);
	};

	_pMainFrame.on_closebutton_click = function (obj, e) {
		application.exit();
	};

	_pMainFrame._getOpenAlignPos = function (parent_win, left, top, width, height) {
		if (!this.openalign._is_empty) {
			var monitor_idx = nexacro._getMonitorIndex(parent_win.left + width / 2, parent_win.top + height / 2);

			var screen_rect = nexacro._getScreenRect(monitor_idx);

			var p_l = screen_rect.left;
			var p_t = screen_rect.top;
			var p_w = nexacro._getScreenWidth(monitor_idx);
			var p_h = nexacro._getScreenHeight(monitor_idx);

			switch (this.openalign.halign) {
				case "left":
					left = p_l;
					break;
				case "center":
					left = p_l + Math.round((p_w - width) / 2);
					break;
				case "right":
					left = p_l + p_w - width;
					break;
			}
			switch (this.openalign.valign) {
				case "top":
					top = p_t;
					break;
				case "middle":
					top = p_t + Math.round((p_h - height) / 2);
					break;
				case "bottom":
					top = p_t + p_h - height;
					break;
			}

			return {
				left : left, 
				top : top
			};
		}

		return null;
	};

	_pMainFrame._setMenuBarHeight = function (height) {
		if (this._applied_menu_height != height) {
			if (height > 0 && this.menubar) {
				this._applied_menu_height = height;
				var control_elem = this._control_element;
				if (control_elem) {
					control_elem.setMenuBarControl(this.menubar, height);
					return true;
				}
				this.menubar.set_visible(true);
			}
			else if (this._applied_menu_height > 0 && this.menubar) {
				this._applied_menu_height = 0;
				this.menubar.set_visible(false);
				this.menubar = null;
				if (control_elem) {
					control_elem.setMenuBarControl(null, 0);
					return true;
				}
			}
		}
		return false;
	};

	_pMainFrame._change_state_activate = function (cur) {
		if (cur == false) {
			if (this.frame) {
				this.frame._change_state_activate(false);
			}
		}

		nexacro.Frame.prototype._change_state_activate.call(this, cur);
	};

	_pMainFrame._getTitleText = function (brecursive) {
		var titletext;
		titletext = this.titletext;
		if (brecursive) {
			if (this.frame) {
				var subtitletext = this.frame._getTitleText(true);
				if (subtitletext.length > 0) {
					if (titletext.length > 0) {
						titletext += " - ";
					}
					titletext += subtitletext;
				}
			}
		}
		return titletext;
	};

	_pMainFrame._getStatusText = function (brecursive) {
		var statustext;
		statustext = this.statustext;
		if (brecursive) {
			if (this.frame) {
				var substatustext = this.frame._getStatusText(true);
				if (substatustext.length > 0) {
					if (statustext.length > 0) {
						statustext += " - ";
					}
					statustext += substatustext;
				}
			}
		}
		return statustext;
	};

	delete _pMainFrame;

	nexacro.ChildFrame_Style = function (target) {
		nexacro.Frame_Style.call(this, target);
		this.overlaycolor = null;
	};

	var _pChildFrameStyle = nexacro._createPrototype(nexacro.Frame_Style, nexacro.ChildFrame_Style);
	nexacro.ChildFrame_Style.prototype = _pChildFrameStyle;

	eval(nexacro._createValueAttributeEvalStr("_pChildFrameStyle", "overlaycolor"));

	_pChildFrameStyle.__custom_emptyObject = function () {
		nexacro.Frame_Style.prototype.__custom_emptyObject.call(this);
		this.overlaycolor = null;
	};

	_pChildFrameStyle.__get_custom_style_value = function () {
		var val = nexacro.Frame_Style.prototype.__get_custom_style_value.call(this);
		if (this.overlaycolor && !this.overlaycolor._is_empty) {
			val += "overlaycolor:" + this.overlaycolor._value + "; ";
		}
		return val;
	};

	nexacro.ChildFrame_CurrentStyle = function () {
		nexacro.Frame_CurrentStyle.call(this);
		this.overlaycolor = null;
	};

	var _pChildFrameCurrentStyle = nexacro._createPrototype(nexacro.Frame_CurrentStyle, nexacro.ChildFrame_CurrentStyle);
	nexacro.ChildFrame_CurrentStyle.prototype = _pChildFrameCurrentStyle;

	_pChildFrameCurrentStyle.__custom_emptyObject = _pChildFrameStyle.__custom_emptyObject;
	_pChildFrameCurrentStyle.__get_custom_style_value = _pChildFrameStyle.__get_custom_style_value;

	delete _pChildFrameStyle;
	delete _pChildFrameCurrentStyle;

	nexacro.ChildFrame = function (id, position, left, top, width, height, right, bottom, url, parent) {
		nexacro.Frame.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.openalign = new nexacro.Style_align();
		this.opener = null;
		this.form = null;
		this.autosize = true;
		this.resizable = false;
		this.layered = false;
		this.showontaskbar = null;
		this.widget = false;
		this.dragmovetype = "normal";


		this._ref_comm = 0;
		this._waitcomp = null;
		this._window_type = 0;
		this._dragmovetype = 1;

		this._is_popup_frame = false;
		this._is_loadform_failed = false;
		this._init_formurl = url;
	};

	_pChildFrame = nexacro._createPrototype(nexacro.Frame, nexacro.ChildFrame);
	nexacro.ChildFrame.prototype = _pChildFrame;

	_pChildFrame._type_name = "ChildFrame", 
		
		nexacro.ChildFrame._default_overlaycolor = nexacro._getCachedStyleObj("color", "#00000090");

	_pChildFrame._close_callback = null;
	_pChildFrame._close_argument = undefined;


	_pChildFrame.on_create_custom_style = function () {
		return new nexacro.ChildFrame_Style(this);
	};

	_pChildFrame.on_create_custom_currentStyle = function () {
		return new nexacro.ChildFrame_CurrentStyle();
	};


	_pChildFrame.on_update_style_align = function (idx) {
		if (idx == 0) {
			this._updateCurrentStyle("align");
			this.on_apply_style_align();
		}
		else if (idx == 2) {
			this.on_apply_prop_openalign();
		}
	};

	_pChildFrame.on_apply_prop_openalign = function () {
		if (!this.openalign._is_empty) {
		}
	};

	_pChildFrame.on_apply_prop_enable = function (v) {
		if (this.form) {
			this.form._setEnable(v);
		}
	};

	_pChildFrame.on_apply_prop_rtldirection = function () {
		var _rtldirection = this._rtldirection;

		var titlebar = this.titlebar;
		if (titlebar) {
			titlebar._setRtlDirection(_rtldirection);
		}
		var statusbar = this.statusbar;
		if (statusbar) {
			statusbar._setRtlDirection(_rtldirection);
		}

		var form = this.form;
		if (form) {
			form._setRtlDirection(_rtldirection);
		}
	};

	_pChildFrame.on_apply_style_overlaycolor = function (color) {
		if (this._modal_overlay_elem) {
			this._modal_overlay_elem.setElementColor(color);
		}
	};

	_pChildFrame.on_find_CurrentStyle_overlaycolor = function (pseudo) {
		var overlaycolor = this._find_pseudo_obj("overlaycolor", pseudo, "color");
		if (overlaycolor) {
			return overlaycolor;
		}
		return nexacro.ChildFrame._default_overlaycolor;
	};

	_pChildFrame.on_update_style_overlaycolor = function () {
		this.on_apply_style_overlaycolor(this.currentstyle.overlaycolor = this.on_find_CurrentStyle_overlaycolor(this._pseudo));
	};


	_pChildFrame.on_create_contents = function () {
		nexacro.Frame.prototype.on_create_contents.call(this);

		if (this.form) {
			this.form._setPos(0, 0);
			this.form._setSize(this._client_width, this._client_height);
			this.form.createComponent();
		}
	};

	_pChildFrame.destroyComponent = function () {
		if (this._window_type == 1 || this._window_type == 4) {
			this._setModalUnlock();
			this._runCallback();

			if (this._window_type == 4) {
				var _win = this._getWindow();
				nexacro._unblockScript(_win._handle);
			}
		}

		if (this._waitcomp) {
			this._waitcomp.destroy();
			this._waitcomp = null;
		}
		this._is_destroying = true;
		if (application._com_waiting) {
			application._com_waiting = false;
		}

		if (this._window && this._window._is_alive) {
			this._window.destroy();
			this._window = null;
			this._is_destroying = false;
			return true;
		}
		else {
			this._is_destroying = false;
			return nexacro.Frame.prototype.destroyComponent.call(this);
		}
	};

	_pChildFrame.on_destroy_contents = function () {
		if (this._waitcomp) {
			this._waitcomp.destroy();
			this._waitcomp = null;
		}

		nexacro.Frame.prototype.on_destroy_contents.call(this);

		if (this._variables) {
			var len = this._variables.length;
			for (var i = 0; i < len; i++) {
				delete this[this._variables[i]];
			}
		}

		if (this.form) {
			this.form.destroyComponent();
			this.form = null;
		}
	};

	_pChildFrame._runCallback = function () {
		var callback = this._close_callback;
		if (callback) {
			if (typeof (callback) == "string") {
				if (this.opener) {
					var _call_callback_fn = this.opener[callback];
					if (_call_callback_fn) {
						_call_callback_fn.call(this.opener, this.name, this._close_argument);
					}
				}
			}
			else if (typeof (callback) == "function") {
				callback.call(this.opener, this.name, this._close_argument);
			}
		}
	};


	_pChildFrame.on_created_contents = function () {
		if (this._is_window && this._window) {
			var window = this._window;
			if (this._delayed_window_pos && window._handle) {
				window.setArea(this._delayed_window_pos.left, this._delayed_window_pos.top, this._delayed_window_pos.width, this._delayed_window_pos.height);

				delete this._delayed_window_pos;
			}

			this._setSize(this._adjust_width, this._adjust_height);

			if (window._handle) {
				window._setSystemMenuResizable(this.resizable);
			}
		}
		else if ((this._window_type == 1 || this._window_type == 4) && this.form && this.autosize) {
			var left = this._adjust_left;
			var top = this._adjust_top;
			var calculated_size = this._getAutosizedFrameSize(true);
			var width = calculated_size.width;
			var height = calculated_size.height;

			var after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
			if (after_align_pos) {
				left = after_align_pos.left;
				top = after_align_pos.top;
			}

			var recalculated_pos = this._recalcModalPosition(left, top, width, height);
			this._move(recalculated_pos.left, recalculated_pos.top, recalculated_pos.width, recalculated_pos.height);
		}

		nexacro.Frame.prototype.on_created_contents.call(this);
	};

	_pChildFrame.on_change_containerPos = function (left, top) {
		if (this.form) {
			this.form._setPos(0, 0);
		}
	};
	_pChildFrame.on_change_containerRect = function (width, height) {
		if (this.form) {
			this.form._setSize(width, height);

			if (!nexacro._isDesktop()) {
				this.form._fitLayoutToParent();
			}

			if (this._is_window) {
				this.form.resetScroll();
			}
		}

		if (this.titlebar) {
			this.titlebar._update_position(false, true);
		}
	};

	_pChildFrame.createComponent = function (bCreateOnly) {
		if (this._window_type != 1 && this._window_type != 4 && this._window_type != 5) {
			return nexacro.Frame.prototype.createComponent.call(this, bCreateOnly);
		}

		var modal_overlay_elem = this._modal_overlay_elem;
		var parent_elem = modal_overlay_elem;
		var control_elem = this._control_element;
		if (!control_elem) {
			var control_elem = this.on_create_control_element(parent_elem);

			var pseudo = this._getResultPseudo(this._status, this._pseudo);
			this._initControl(control_elem, pseudo);
			this._initContents(control_elem, pseudo);

			if (!bCreateOnly && parent_elem && parent_elem._handle) {
				this.on_created();
			}
		}
		return true;
	};

	_pChildFrame._checkValidLayout = function () {
		if (this.form != null) {
			this.form._checkValidLayout();
		}
	};

	_pChildFrame._waitCursor = function (wait_flag, context) {
		if (this._isNested()) {
			return nexacro.Frame.prototype._waitCursor.call(this, wait_flag, context);
		}

		if (this._window) {
			if (wait_flag == true) {
				var waitcomp = this._waitcomp;
				if (waitcomp == null) {
					waitcomp = this._waitcomp = new nexacro.WaitComponent("waitwindow", "absolute", 0, 0, 0, 0, null, null, this);
					waitcomp.createComponent();
					waitcomp.on_created();
				}

				if (this._ref_comm == 0) {
					application._com_waiting = true;

					var waitcursor_imgurl = application._getLoadingImageUrl();
					waitcomp.setImage(waitcursor_imgurl);
					waitcomp.show();
				}
				waitcomp._addContext(context);
				this._ref_comm++;
			}
			else {
				if (this._ref_comm > 0) {
					this._ref_comm--;
				}

				var waitcomp = this._waitcomp;
				if (waitcomp) {
					waitcomp._removeContext(context);
					if (this._ref_comm <= 0) {
						this._ref_comm = 0;
						application._com_waiting = false;
						waitcomp.hide();
					}
				}
			}
		}
	};
	_pChildFrame.set_autosize = function (v) {
		if (this.autosize != v) {
			this.autosize = nexacro._toBoolean(v);
		}
	};

	_pChildFrame.set_dragmovetype = function (v) {
		if (this.dragmovetype != v) {
			var allow_dragform = false;
			switch (v) {
				case "all":
					this.dragmovetype = v;
					this._dragmovetype = 2;
					allow_dragform = true;
					break;
				case "normal":
					this.dragmovetype = v;
					this._dragmovetype = 1;
					break;
				case "none":
					this.dragmovetype = v;
					this._dragmovetype = 0;
					break;
			}

			this._applyDragMoveType();
		}
	};

	_pChildFrame.set_openalign = function (v) {
		if (this.openalign._is_empty && this.openalign._value != v) {
			this.openalign._setValue(v);
			this.on_update_style_align(2);
		}
	};

	_pChildFrame.set_formurl = function (url) {
		var realurl = application._getFDLLocation(url);
		if (this._formurl != realurl) {
			if (this.form && this.form._control_element) {
				var confirm_message = this._on_beforeclose();
				if (this._checkAndConfirmClose(confirm_message) == false) {
					return;
				}
				this._on_close();
			}

			this.formurl = url;
			this._formurl = realurl;
			this._is_loadform_failed = false;
			this._createForm();
		}
	};

	_pChildFrame.set_resizable = function (v) {
		var resizable = nexacro._toBoolean(v);
		if (this.resizable != resizable) {
			this.resizable = resizable;
			this._resetTitleAbsoluteStyle();

			if (this._control_element) {
				this._control_element._setResizable(this._canDragResize());
			}

			if (this._window) {
				this._window._setSystemMenuResizable(resizable);
			}
		}
	};

	_pChildFrame.set_layered = function (v) {
		var layered = nexacro._toBoolean(v);
		if (this.layered != layered) {
			this.layered = layered;
		}
	};

	_pChildFrame.set_showontaskbar = function (v) {
		var showontaskbar = nexacro._toBoolean(v);
		if (this.showontaskbar != showontaskbar) {
			this.showontaskbar = showontaskbar;
		}
	};

	_pChildFrame.set_widget = function (v) {
		var widget = nexacro._toBoolean(v);
		if (this.widget != widget) {
			this.widget = widget;
		}
	};

	_pChildFrame.init = function (id, position, left, top, width, height, right, bottom, strurl) {
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

		if (strurl) {
			this._init_formurl = strurl;
		}
	};

	_pChildFrame.loadForm = function (strformurl, objframe, basync, callback) {
		return this.getApplication().loadFormurl(strformurl, null, objframe, basync, callback);
	};

	_pChildFrame._on_loadform_failed = function () {
		this._is_loadform_failed = true;

		if (this._window_type > 0) {
			if (!this.showtitlebar) {
				this.set_showtitlebar(true);
			}
			if (!this.visible) {
				this.set_visible(true);
			}

			var left = this._adjust_left;
			var top = this._adjust_top;
			var right = this._adjust_left + this._adjust_width;
			var bottom = this._adjust_top + this._adjust_height;
			var width = this._adjust_width;
			var height = this._adjust_height;
			var opener_width = application.mainframe._adjust_width;
			var opener_height = application.mainframe._adjust_height;

			var bmove = false;
			var opener = this.opener;
			if (opener) {
				opener_width = opener._adjust_width;
				opener_height = opener._adjust_height;
			}

			if (right < 0 || bottom < 0 || top > opener_height || left > opener_width) {
				left = 0;
				top = 0;

				bmove = true;
			}

			if (this._adjust_width < this._minWidth || this._adjust_height < this._minHeight) {
				width = this._defaultWidth;
				height = this._defaultHeight;

				bmove = true;
			}

			if (bmove) {
				this.move(left, top, width, height);
			}
		}
	};

	_pChildFrame._addVariable = function (id, val) {
		this[id] = val;
		if (!this._variables) {
			this._variables = [];
		}
		this._variables.push(id);
	};


	_pChildFrame.showModal = function (str_id, _parent_frame, arr_arg, opener, callback, is_async) {
		var ret, parent_frame, id, arg;
		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			this.id = id = arguments[0];
			parent_frame = arguments[1];
			this._arg = arguments[2];
			this.opener = arguments[3];
			this._close_callback = arguments[4];
		}
		else {
			id = this.id;
			parent_frame = arguments[0];
			this._arg = arguments[1];
			this.opener = arguments[2];
			this._close_callback = arguments[3];
		}

		var child_frame = null;

		if (parent_frame == null) {
			parent_frame = application.mainframe;
		}
		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			return false;
		}
		else {
			child_frame = this;
		}

		if (child_frame && child_frame._arg) {
			for (var param in child_frame._arg) {
				child_frame._addVariable(param, child_frame._arg[param]);
			}
		}

		if (application._registerPopupFrame(id, this) < 0) {
			nexacro.FireSystemError(this, "0x8001002A", id);
			return false;
		}

		var strurl = this.formurl;
		if (strurl) {
			this.set_formurl(strurl);
		}

		child_frame._is_window = false;
		child_frame._window_type = 1;

		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;


		if (this.autosize) {
			var calculated_size = this._getAutosizedFrameSize(true);
			this.width = width = calculated_size.width;
			this.height = height = calculated_size.height;
		}

		var after_align_pos = child_frame._getOpenAlignPos(this._getWindow(), left, top, width, height);
		if (after_align_pos) {
			this.left = after_align_pos.left;
			this.top = after_align_pos.top;
		}

		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			var _focus_obj = null;
			if (parent_frame && parent_frame._focusManager) {
				_focus_obj = parent_frame._focusManager[0];
			}

			if (_focus_obj) {
				if (_focus_obj.parent._is_form) {
					this.opener = _focus_obj.parent;
				}
				else {
					this.opener = parent_frame ? parent_frame.form : null;
				}
			}
			else {
				this.opener = parent_frame ? parent_frame.form : null;
			}
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		var recalculated_pos = this._recalcModalPosition(this.left, this.top, this.width, this.height);
		this.left = recalculated_pos.left;
		this.top = recalculated_pos.top;
		this.width = recalculated_pos.width;
		this.height = recalculated_pos.height;

		this._setModalLock();
		this.createComponent(true);
		this.on_created();

		this._change_state_activate(true);

		return true;
	};

	_pChildFrame._showModalSync = function (str_id, _parent_frame, arr_arg, opener) {
		var ret, parent_frame, id, arg;
		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			this.id = id = arguments[0];
			parent_frame = arguments[1];
			this._arg = arguments[2];
			this.opener = arguments[3];
		}
		else {
			id = this.id;
			parent_frame = arguments[0];
			this._arg = arguments[1];
			this.opener = arguments[2];
		}

		var child_frame = null;

		if (parent_frame == null) {
			parent_frame = application.mainframe;
		}
		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			return false;
		}
		else {
			child_frame = this;
		}

		if (child_frame && child_frame._arg) {
			for (var param in child_frame._arg) {
				child_frame._addVariable(param, child_frame._arg[param]);
			}
		}

		if (application._registerPopupFrame(id, this) < 0) {
			nexacro.FireSystemError(this, "0x8001002A", id);
			return false;
		}

		child_frame._is_window = false;
		child_frame._window_type = 4;

		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;


		if (this.autosize) {
			var calculated_size = this._getAutosizedFrameSize(true);
			this.width = width = calculated_size.width;
			this.height = height = calculated_size.height;
		}

		var after_align_pos = child_frame._getOpenAlignPos(this._getWindow(), left, top, width, height);
		if (after_align_pos) {
			this.left = after_align_pos.left;
			this.top = after_align_pos.top;
		}

		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			var _focus_obj = null;
			if (parent_frame && parent_frame._focusManager) {
				_focus_obj = parent_frame._focusManager[0];
			}

			if (_focus_obj) {
				if (_focus_obj.parent._is_form) {
					this.opener = _focus_obj.parent;
				}
				else {
					this.opener = parent_frame ? parent_frame.form : null;
				}
			}
			else {
				this.opener = parent_frame ? parent_frame.form : null;
			}
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		var recalculated_pos = this._recalcModalPosition(this.left, this.top, this.width, this.height);
		this.left = recalculated_pos.left;
		this.top = recalculated_pos.top;
		this.width = recalculated_pos.width;
		this.height = recalculated_pos.height;

		this._setModalLock();
		this.createComponent(true);
		this.on_created();

		this._change_state_activate(true);

		var win = this._getWindow();
		if (win && win._handle) {
			nexacro._blockScript(win._handle);
		}

		return true;
	};



	_pChildFrame.showModeless = function (str_id, _parent_frame, arr_arg, opener) {
		var ret, parent_frame, id, arg;
		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			parent_frame = _parent_frame;
			id = str_id;
			this.id = id;
			this._arg = arr_arg;
			if (opener) {
				this.opener = opener;
			}
		}
		else {
			parent_frame = str_id;
			id = this.id;
			this._arg = _parent_frame;
			if (arr_arg) {
				this.opener = arr_arg;
			}
		}

		var child_frame;
		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			return false;
		}
		else {
			child_frame = this;
		}

		if (child_frame && child_frame._arg) {
			for (var param in child_frame._arg) {
				child_frame._addVariable(param, child_frame._arg[param]);
			}
		}

		if (application._registerPopupFrame(id, this) < 0) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (this._init_formurl) {
			this.set_formurl(this._init_formurl);
		}

		child_frame._is_window = true;
		child_frame._window_type = 2;

		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;

		var is_form_loaded = false;
		if (this.autosize && this.form && !this.form._is_loading) {
			var calculated_size = this._getAutosizedFrameSize(nexacro.Browser == "Runtime");
			this.width = width = calculated_size.width;
			this.height = height = calculated_size.height;

			is_form_loaded = true;
		}

		if (!is_form_loaded) {
			var after_align_pos = child_frame._getOpenAlignPos(child_frame._window, left, top, width, height);
			if (after_align_pos) {
				left = after_align_pos.left;
				top = after_align_pos.top;
			}
		}

		var option;
		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			var _focus_obj = null;
			if (parent_frame && parent_frame._focusManager) {
				_focus_obj = parent_frame._focusManager[0];
			}
			if (_focus_obj) {
				if (_focus_obj.parent._is_form) {
					this.opener = _focus_obj.parent;
				}
				else {
					this.opener = parent_frame ? parent_frame.form : null;
				}
			}
			else {
				this.opener = parent_frame ? parent_frame.form : null;
			}
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		this._accessibility_role = "dialog";

		var parent_window = parent_frame ? parent_frame._getWindow() : null;
		if (!this.autosize || is_form_loaded) {
			this._window = new nexacro.Window(this.name, parent_window, false);
			this._window.attachFrame(this, false);
			this._window.create(parent_window, this.id, width, height, left, top, this.resizable, this.layered, this.showontaskbar);
			if (this._is_created) {
				this._control_element._parent_elem = null;
			}
		}
		else {
			this._delayed_create_window = true;
			this._delayed_create_parent = parent_window;
		}

		return true;
	};

	_pChildFrame._showModalWindow = function (str_id, _parent_frame, arr_arg, opener, _lockmode) {
		this._is_popup_frame = true;
		var ret, parent_frame, id, arg, lockmode;
		var shift_argument = 0;

		if (!(str_id instanceof nexacro.Frame) && str_id != null) {
			this.id = id = arguments[0];
		}
		else {
			shift_argument = -1;
			id = this.id;
		}

		parent_frame = arguments[1 + shift_argument];
		this._arg = arguments[2 + shift_argument];
		if (arguments[3 + shift_argument]) {
			this.opener = arguments[3 + shift_argument];
		}
		lockmode = arguments[4 + shift_argument];

		lockmode = 1;



		if (parent_frame) {
			ret = parent_frame.addChild(id, this);
		}

		if (ret == -1) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (this && this._arg) {
			for (var param in this._arg) {
				this._addVariable(param, this._arg[param]);
			}
		}

		if (application._registerPopupFrame(id, this) < 0) {
			throw nexacro.MakeNativeError(this, "native_exist_id", id);
		}

		if (this._init_formurl) {
			this.set_formurl(this._init_formurl);
		}

		this._is_window = true;
		this._window_type = 5;

		var left = this._adjust_left;
		var top = this._adjust_top;
		var width = this._adjust_width;
		var height = this._adjust_height;


		var win = _parent_frame._getWindow();
		if (win) {
			left = win.getLeft();
			top = win.getTop();
		}

		var is_form_loaded = false;
		if (this.autosize && this.form && this.form._control_element) {
			width = this.form._init_width;
			height = this.form._init_height;
			is_form_loaded = true;
		}

		if (!is_form_loaded) {
			var after_align_pos = this._getOpenAlignPos(this._window, left, top, width, height);
			if (after_align_pos) {
				left = after_align_pos.left;
				top = after_align_pos.top;
			}
		}

		if (!this.opener || (this.opener && !this.opener._is_form && !this.opener._is_application)) {
			this.opener = parent_frame ? parent_frame.form : null;
		}

		if (this.form) {
			this.form.opener = this.opener;
		}

		var parent_window = parent_frame ? parent_frame._getWindow() : null;
		if (this.autosize && !is_form_loaded) {
			this._delayed_create_window = true;
			this._delayed_create_parent = parent_window;
		}

		this._window = new nexacro.Window(this.name, parent_window, false);
		this._window.attachFrame(this, false);

		if (this.form && this.form._load_manager.status >= 7) {
			this._loadedForm();
		}
		return this._window.createModal(parent_window, this.id, width, height, left, top, this.resizable, this.layered, lockmode);
	};

	_pChildFrame._on_init = nexacro._emptyFn;
	_pChildFrame._on_load = function () {
		this.createComponent();
		this.on_created();
		this._change_state_activate(true);
	};

	_pChildFrame._showModeless = function (name, target_win) {
		application._registerPopupFrame(name, this);

		this._is_popup_frame = true;
		this._is_window = true;
		this._window = target_win;
		this._window.frame = this;
		this._window_type = 2;

		this._load_manager.status = 2;
		var cnt = application._cssurls.length;
		if (cnt == 0) {
			this._load_manager._is_mainloaded = true;
		}

		var cssurl = application._theme_uri + "/theme.css";
		this.loadCss(cssurl, application._project_url);

		if (cnt > 0) {
			this._load_manager._is_mainloaded = true;
		}

		for (var i = 0; i < cnt; i++) {
			cssurl = application._cssurls[i];
			this.loadCss(cssurl, application._project_url);
		}

		var formurl;
		var openstyle;
		var parent_frame;
		var left, top, width, height;
		var arr_args;
		var opener;
		var popupframeoption = application._popupframeoption[name];
		if (popupframeoption) {
			delete application._popupframeoption[name];

			formurl = popupframeoption._formurl;
			openstyle = popupframeoption._openstyles;
			parent_frame = popupframeoption._parentframe;
			left = popupframeoption._left;
			top = popupframeoption._top;
			width = popupframeoption._width;
			height = popupframeoption._height;
			arr_args = popupframeoption._args;
			this.opener = opener = popupframeoption._opener;
		}
		if (parent_frame) {
			ret = parent_frame.addChild(name, this);
		}

		if (arr_args) {
			for (var param in arr_args) {
				this._addVariable(param, arr_args[param]);
			}
		}

		this.init(name, "absolute", left, top, width, height, null, null, formurl);
		if (formurl) {
			this.set_formurl(formurl);
		}

		if (openstyle) {
			var openlist = openstyle.split(" ");
			for (var i = 0; i < openlist.length; i++) {
				var style = openlist[i].split("=");
				if (this["set_" + style[0]]) {
					this["set_" + style[0]](style[1]);
				}
			}
		}
	};

	_pChildFrame.hideModal = function () {
	};

	_pChildFrame.hideModeless = function () {
	};

	_pChildFrame.getForm = function () {
		return this.form ? this.form : null;
	};

	_pChildFrame.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onkeydown.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onkeyup.call(this, key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onlbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_loadform_failed && this.showtitlebar == false) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				owner_frame.removeChild(this.id);

				if (owner_frame._control_element) {
					owner_frame.on_change_containerRect(owner_frame._control_element.client_width, owner_frame._control_element.client_height);
				}
			}

			if (this._is_window && this._window && this._window._is_alive) {
				this._window.destroy();
			}
			else {
				this._destroy();
			}

			if (this._control_element) {
				this._control_element.destroy();
			}
			this._control_element = null;
		}

		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onrbuttondown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onrbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmousedown.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmouseup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmouseenter.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmouseleave.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmousemove.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};

	_pChildFrame.on_fire_sys_onmousewheel = function (wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		var ret = nexacro.Frame.prototype.on_fire_sys_onmousewheel.call(this, wheelDeltaX, wheelDeltaY, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
		if (this._is_window) {
			return true;
		}
		return ret;
	};


	_pChildFrame._createForm = function () {
		var formurl = this.formurl;
		if (!formurl) {
			formurl = "";
		}
		var form = this.form;
		if (form) {
			if (form._url != this._formurl) {
				form.destroyComponent();
				form = new Form("form", "absolute", 0, 0, this._client_width, this._client_height, null, null, this);
				form._is_init = true;
				form.opener = this.opener;
				this.form = form;
				form.loadForm(formurl);
				if (this._control_element) {
					form.createComponent();
				}
			}
		}
		else {
			form = new Form("form", "absolute", 0, 0, this._client_width, this._client_height, null, null, this);
			form.opener = this.opener;
			this.form = form;
			if (this._formurl) {
				form.loadForm(formurl);
			}

			if (this._control_element) {
				form.createComponent();
			}
		}
		return form;
	};

	_pChildFrame._closeForm = function (arg) {
		if (this._is_window) {
			if (arg !== undefined) {
				this._close_argument = arg;
				this._window.returnValue = arg;
			}

			var allobj = this.all;
			var allcnt = allobj.length;
			for (var i = 0; i < allcnt; i++) {
				var childid = allobj.get_id(i);
				var child = allobj[i];

				if (child._is_window && child._window && child._is_alive) {
					this.removeChild(childid);

					child._window.destroy();
					child._window = null;
				}
			}

			var ownerframe = this.getOwnerFrame();
			if (ownerframe) {
				ownerframe.removeChild(this.id);
			}

			if (this.form && this.form._is_alive) {
				this.form._destroy();
				this.form = null;
			}

			if (this._window && this._window._is_alive) {
				this._window.destroy();
				this._window = null;
			}
		}
		else {
			if (arg !== undefined) {
				this._close_argument = arg;
			}

			var ownerframe = this.getOwnerFrame();
			if (ownerframe) {
				ownerframe.removeChild(this.id);
			}

			if (this.form && this.form._is_alive) {
				this.form._destroy();
				this.form = null;
			}

			this._destroy();
		}
	};

	_pChildFrame._destroyForm = function () {
		if (this.form) {
			this.form._destroy();
			this.form = null;
		}
	};

	_pChildFrame._loadedForm = function () {
		this._last_focused = this.form;

		if (this._is_loadform_failed) {
			return;
		}

		this._applyDragMoveType();

		if (this.autosize) {
			var parent_window = this._delayed_create_parent;
			var left = this._left;
			var top = this._top;
			var width = this.form._init_width;
			var height = this.form._init_height;

			if (this._is_window && this._window_type == 2) {
				if (this._delayed_create_window) {
					var calculated_size = this._getAutosizedFrameSize(nexacro.Browser == "Runtime");
					width = calculated_size.width;
					height = calculated_size.height;

					var after_align_pos = this._getOpenAlignPos(parent_window, left, top, width, height);
					if (after_align_pos) {
						left = after_align_pos.left;
						top = after_align_pos.top;
					}

					this._move(this._adjust_left, this._adjust_top, width, height);

					var _window = this._window = new nexacro.Window(this.name, parent_window, false);
					_window.attachFrame(this, false);
					_window.create(parent_window, this.id, width, height, left, top, this.resizable, this.layered, this.showontaskbar);

					delete this._delayed_create_parent;
					delete this._delayed_create_window;
				}
				else {
					if (this._window) {
						var after_align_pos = this._getOpenAlignPos(this._window.parent, left, top, width, height);
						if (after_align_pos) {
							left = after_align_pos.left;
							top = after_align_pos.top;
						}

						var calculated_size = this._getAutosizedFrameSize(nexacro.Browser == "Runtime");
						width = calculated_size.width;
						height = calculated_size.height;

						this._move(left, top, width, height);

						var _adjust_width = width + this._window._gap_client_width;
						var _adjust_height = height + this._window._gap_client_height;

						if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
							function getWindowSize (win) {
								var win_handle = win._handle;
								var wW, wH;
								if (win_handle.outerWidth) {
									wW = win_handle.outerWidth;
									wH = win_handle.outerHeight;
								}
								else {
									win.setSize(_adjust_width, _adjust_height);
									var barsW = _adjust_width - nexacro._getWindowHandleOuterWidth(win_handle);
									var barsH = _adjust_height - nexacro._getWindowHandleOuterHeight(win_handle);

									wW = barsW + _adjust_width;
									wH = barsH + _adjust_height;
								}
								return {
									width : wW, 
									height : wH
								};
							}
							;

							var win_rect = getWindowSize(this._window);

							if (win_rect.width != _adjust_width || win_rect.height != _adjust_height) {
								this._window.setSize(win_rect.width, win_rect.height);
							}
						}
						else {
							this._window.setSize(_adjust_width, _adjust_height);
						}
					}
				}
			}
			else if (this._window_type == 5) {
				if (this._delayed_create_window) {
					var calculated_size = this._getAutosizedFrameSize(nexacro.Browser == "Runtime");
					width = calculated_size.width;
					height = calculated_size.height;

					var after_align_pos = this._getOpenAlignPos(parent_window, left, top, width, height);
					if (after_align_pos) {
						left = after_align_pos.left;
						top = after_align_pos.top;
					}

					if (this._window._handle) {
						this._window.moveTo(left, top);
						if (this._state_openstatus == 0) {
							this._window.setSize(width, height);
						}
						else {
							this._restore_position = {
								left : left, 
								top : top, 
								width : width, 
								height : height, 
								right : this.right, 
								bottom : this.bottom
							};
						}
					}
					else {
						this._delayed_window_pos = {
							left : left, 
							top : top, 
							width : width, 
							height : height
						};
					}

					delete this._delayed_create_parent;
					delete this._delayed_create_window;
				}
				else {
					if (this._window) {
						var after_align_pos = this._getOpenAlignPos(this._window.parent, left, top, width, height);
						if (after_align_pos) {
							left = after_align_pos.left;
							top = after_align_pos.top;
						}
						this._move(left, top, width, height);

						var _adjust_width = width + this._window._gap_client_width;
						var _adjust_height = height + this._window._gap_client_height;
						this._window.setSize(_adjust_width, _adjust_height);
					}
				}
			}
			else if (this._window_type == 1 || this._window_type == 4) {
				var calculated_size = this._getAutosizedFrameSize(true);
				width = calculated_size.width;
				height = calculated_size.height;

				var after_align_pos = this._getOpenAlignPos(this._getWindow(), left, top, width, height);
				if (after_align_pos) {
					left = after_align_pos.left;
					top = after_align_pos.top;
				}

				var recalculated_pos = this._recalcModalPosition(left, top, width, height);
				this._move(recalculated_pos.left, recalculated_pos.top, recalculated_pos.width, recalculated_pos.height);
			}
		}
	};

	_pChildFrame._on_window_loaded = function () {
		this._checkValidWindowSize();

		if (!this._is_created) {
			this.createComponent();
			this.on_created();
			this._change_state_activate(true);
		}

		if (this._lockmode) {
			delete this._lockmode;
			this._lockmode = null;
		}
	};

	_pChildFrame._createdForm = function () {
		if (this._state_openstatus != 2) {
			var owner_frame = this.getOwnerFrame();
			if (owner_frame) {
				var proc_focus = false;

				if (owner_frame._is_frameset && owner_frame._getTopOrderFrame() == this) {
					proc_focus = true;
				}
				else if (!owner_frame._is_frameset && owner_frame._is_frame) {
					proc_focus = true;
				}

				if (proc_focus) {
					if (this._getWindow() == owner_frame._getWindow()) {
						this._change_state_activate(true);
					}

					if (nexacro._enableaccessibility && (nexacro._accessibilitywholereadtype == 1 || 
						nexacro._accessibilitywholereadtype == 3)) {
						this._setFocus();
						this.form._playAccessibilityWholeReadLabel("focus");
					}
					else {
						this.form._on_focus(true);
					}
				}
			}
			else {
				this._change_state_activate(true);

				if (nexacro._enableaccessibility && (nexacro._accessibilitywholereadtype == 1 || 
					nexacro._accessibilitywholereadtype == 3)) {
					this._setFocus();
					this.form._playAccessibilityWholeReadLabel("focus");
				}
				else {
					this.form._on_focus(true);
				}
			}
		}

		if (this._is_window && this.autosize != true) {
			this._checkValidWindowSize();
		}
	};

	_pChildFrame._applyDragMoveType = function () {
		var form = this.form;
		if (form) {
			var allow_dragform = false;
			if (this._dragmovetype == 2 || (this._dragmovetype == 1 && !this.showtitlebar)) {
				allow_dragform = true;
			}

			{

				form._setDragMove(allow_dragform, this._is_window);
			}
		}

		if (this.titlebar) {
			this.titlebar._setDragMove(this._dragmovetype != 0, this._is_window);
		}
	};


	_pChildFrame._getTitleText = function (brecursive) {
		var titletext;
		titletext = this.titletext;
		if (brecursive) {
			if (this.form && this.form.titletext.length > 0) {
				if (titletext.length > 0) {
					titletext += " - ";
				}
				titletext += this.form.titletext;
			}
		}
		return titletext;
	};
	_pChildFrame._getStatusText = function (brecursive) {
		var statustext;
		statustext = this.statustext;
		if (brecursive) {
			if (this.form && this.form.statustext.length > 0) {
				if (statustext.length > 0) {
					statustext += " - ";
				}
				statustext += this.form.statustext;
			}
		}
		return statustext;
	};
	_pChildFrame._getOpenAlignPos = function (parent_win, left, top, width, height) {
		if (!this.openalign._is_empty) {
			if (parent_win == null) {
				return;
			}

			var is_modal = (this._window_type == 1 || this._window_type == 4);
			var p_l = is_modal ? 0 : (parent_win.left | 0);
			var p_t = is_modal ? 0 : (parent_win.top | 0);
			var p_w = parent_win.clientWidth;
			var p_h = parent_win.clientHeight;
			switch (this.openalign.halign) {
				case "left":
					left = p_l;
					break;
				case "center":
					left = p_l + Math.round((p_w - width) / 2);
					break;
				case "right":
					left = p_l + p_w - width;
					break;
			}
			switch (this.openalign.valign) {
				case "top":
					top = p_t;
					break;
				case "middle":
					top = p_t + Math.round((p_h - height) / 2);
					break;
				case "bottom":
					top = p_t + p_h - height;
					break;
			}

			return {
				left : left, 
				top : top
			};
		}

		return null;
	};

	if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" || nexacro.Browser == "Gecko") {
		_pChildFrame._checkValidWindowSize = function () {
			var _window = this._window;
			if (!_window) {
				return;
			}

			var width = this._adjust_width;
			var height = this._adjust_height;
			if ((_window.clientWidth != width || _window.clientHeight != height) && (_window.clientWidth != 0 && _window.clientHeight != 0)) {
				if (this.autosize != true && this._control_element) {
					var control_elem = this._control_element;
					control_elem.setElementSize(width, height);
					control_elem.setElementSize(this._adjust_width, this._adjust_height);
					control_elem._updateClientSize();
				}

				this._move(this._adjust_left, this._adjust_top, _window.clientWidth, _window.clientHeight);

				if (this.autosize != true) {
					this.on_change_containerRect(this._adjust_width, this._adjust_height);
				}

				return false;
			}

			return true;
		};
	}
	else {
		_pChildFrame._checkValidWindowSize = nexacro._emptyFn;
	}
	;

	_pChildFrame._setModalLock = function () {
		var win = this._getWindow();
		if (!win) {
			win = nexacro._getMainWindowHandle() ? nexacro._getMainWindowHandle()._linked_window : null;
		}
		if (!win) {
			return;
		}

		win._on_modalLock();

		var cur_focus_path = win.getCurrentFocusPaths() ? win.getCurrentFocusPaths().slice(0) : null;

		win._removeFromCurrentFocusPath(null, false);

		var overlaycolor = this.on_find_CurrentStyle_overlaycolor(this._pseudo);

		var zindex = nexacro._zindex_firstmodal;
		var modal_stack = win._modal_frame_stack;
		if (modal_stack.length > 0) {
			var modal_info = modal_stack[modal_stack.length - 1];
			zindex = modal_info[1] + 1;
		}

		var parent = this.parent;
		if (!parent) {
			parent = application.mainframe;
		}

		var ref_dest_handle;
		if (win.frame && win.frame._waitcomp) {
			var waitcomp = win.frame._waitcomp;
			if (waitcomp._control_element && waitcomp._control_element._handle) {
				ref_dest_handle = waitcomp._control_element._handle;
			}
		}

		var modal_overlay_elem = this._modal_overlay_elem = new nexacro.ModalOverlayElement(parent._control_element);
		modal_overlay_elem.setLinkedControl(this);
		modal_overlay_elem.create(zindex, overlaycolor, ref_dest_handle);

		win._modal_frame_stack.push([this, zindex, cur_focus_path]);

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			if (this.opener) {
				var form = this.opener._getRootForm();
				form._setAccessibilityHidden(true);
			}
		}
	};

	_pChildFrame._setModalUnlock = function () {
		var win = this._getWindow();
		if (!win) {
			win = nexacro._getMainWindowHandle() ? nexacro._getMainWindowHandle()._linked_window : null;
		}
		if (!win) {
			return;
		}

		var modal_stack = win._modal_frame_stack;
		var modal_stack_len = modal_stack.length;
		var modal_info;
		for (var i = 0; i < modal_stack_len; i++) {
			modal_info = modal_stack[i];
			if (modal_info[0] == this) {
				for (var j = i; j < modal_stack_len - 1; j++) {
					modal_stack[j] = modal_stack[j + 1];
				}
				modal_stack.length = modal_stack_len - 1;
				break;
			}
		}

		application._unregisterPopupFrame(this.id);

		var old_focus_path = modal_info[2];
		if (old_focus_path && old_focus_path.length > 0) {
			var old_focus_path_len = old_focus_path.length;
			for (i = 0; i < old_focus_path_len; i++) {
				var comp = old_focus_path[i];
				if (comp instanceof nexacro.ChildFrame) {
					comp._on_activate();
					continue;
				}
				else if (comp._is_form) {
					comp._on_focus(true);
					break;
				}

				if (i == (old_focus_path_len - 1)) {
					comp._on_focus(true);
				}
			}
		}

		if (this._modal_overlay_elem) {
			this._modal_overlay_elem.destroy();
			this._modal_overlay_elem = null;
		}

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			if (this.opener) {
				var form = this.opener._getRootForm();
				form._setAccessibilityHidden(false);
			}
		}
	};

	_pChildFrame._setModalOverlaySize = function (width, height) {
		this._modal_overlay_elem.setElementSize(width, height);

		if (this._state_openstatus == 3) {
			this._setSize(width, height);
		}
	};

	_pChildFrame._recalcModalPosition = function (left, top, width, height) {
		left = parseInt(left);
		top = parseInt(top);
		width = parseInt(width);
		height = parseInt(height);

		var win = this._getWindow();
		if (!win) {
			return {
				left : left, 
				top : top, 
				width : width, 
				height : height
			};
		}

		var titleheight = parseInt(this.on_find_CurrentStyle_titlebarheight().value) | 0;
		if (titleheight <= 0) {
			titleheight = this._defaultTitleHeight;
		}

		if (left + width > win.clientWidth) {
			left = win.clientWidth - width;
		}
		if (top + titleheight > win.clientHeight) {
			top = win.clientHeight - titleheight;
		}
		if (left < 0) {
			left = 0;
		}
		if (top < 0) {
			top = 0;
		}

		return {
			left : left, 
			top : top, 
			width : width, 
			height : height
		};
	};

	_pChildFrame._getAutosizedFrameSize = function (include_frame_nc) {
		var width = this._adjust_width;
		var height = this._adjust_height;

		var form = this.form;
		if (form && form._is_loading == false) {
			width = form._init_width;
			height = form._init_height;
		}

		if (include_frame_nc) {
			var titleheight = 0, statusheight = 0;
			if (this.showtitlebar) {
				titleheight = parseInt(this.on_find_CurrentStyle_titlebarheight().value) | 0;
			}
			if (this.showstatusbar) {
				statusheight = parseInt(this.on_find_CurrentStyle_statusbarheight().value) | 0;
			}
			var border = this.on_find_CurrentStyle_border();
			if (border) {
				width += border._getBorderLeftWidth() + border._getBorderRightWidth();
				height += border._getBorderTopWidth() + border._getBorderBottomWidth();
			}
			height += titleheight + statusheight;
		}

		return {
			"width" : width, 
			"height" : height
		};
	};

	nexacro.FrameSetBase_Style = function (target) {
		nexacro.Frame_Style.call(this, target);
		this.childmoveeffect = null;
		this.childopenstatuseffect = null;
	};


	var _pFrameSetBaseStyle = nexacro._createPrototype(nexacro.Frame_Style, nexacro.FrameSetBase_Style);
	nexacro.FrameSetBase_Style.prototype = _pFrameSetBaseStyle;

	eval(nexacro._createValueAttributeEvalStr("_pFrameSetBaseStyle", "childmoveeffect"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameSetBaseStyle", "childopenstatuseffect"));

	_pFrameSetBaseStyle.__custom_emptyObject = function () {
		this.childmoveeffect = null;
		this.childopenstatuseffect = null;
	};

	_pFrameSetBaseStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.childmoveeffect && !this.childmoveeffect._is_empty) {
			val += "childmoveeffect:" + this.childmoveeffect._value + "; ";
		}
		if (this.childopenstatuseffect && !this.childopenstatuseffect._is_empty) {
			val += "childopenstatuseffect:" + this.childopenstatuseffect._value + "; ";
		}
		return val;
	};

	nexacro.FrameSetBase_CurrentStyle = function () {
		nexacro.Frame_CurrentStyle.call(this);
	};

	var _pFrameSetBaseCurrentStyle = nexacro._createPrototype(nexacro.Frame_CurrentStyle, nexacro.FrameSetBase_CurrentStyle);
	nexacro.FrameSetBase_CurrentStyle.prototype = _pFrameSetBaseCurrentStyle;

	_pFrameSetBaseCurrentStyle.__custom_emptyObject = _pFrameSetBaseStyle.__custom_emptyObject;
	_pFrameSetBaseCurrentStyle.__get_custom_style_value = _pFrameSetBaseStyle.__get_custom_style_value;

	delete _pFrameSetBaseStyle;
	delete _pFrameSetBaseCurrentStyle;

	nexacro.FrameSetBase = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Frame.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.frames = new nexacro.Collection();

		this.separatesize = "";
		this.keepseparatesizewhenswap = false;

		this.ctrltaborder = "active";
		this.ctrltabtype = "order";

		this.showstatusbar = false;
		this.showtitlebar = false;


		this._separatesize = [];
		this._max_frame = null;
		this._track_frame = null;
		this._active_frame = null;
		this._zorderMap = new nexacro.Collection();
		this._is_frameset = true;
		this._is_autorecalc_frame = true;
	};

	var _pFrameSetBase = nexacro._createPrototype(nexacro.Frame, nexacro.FrameSetBase);
	nexacro.FrameSetBase.prototype = _pFrameSetBase;

	_pFrameSetBase._type_name = "FrameSetBase";


	_pFrameSetBase.on_apply_custom_pseudo = function (pseudo) {
		nexacro.Frame.prototype.on_apply_custom_pseudo.call(this);

		var curstyle = this.currentstyle;

		var childmoveeffect = this.on_find_CurrentStyle_childmoveeffect(pseudo);
		if (childmoveeffect != curstyle.childmoveeffect) {
			curstyle.childmoveeffect = childmoveeffect;
		}

		var childopenstatuseffect = this.on_find_CurrentStyle_childopenstatuseffect(pseudo);
		if (childopenstatuseffect != curstyle.childopenstatuseffect) {
			curstyle.childopenstatuseffect = childopenstatuseffect;
		}
	};

	_pFrameSetBase.on_create_custom_style = function () {
		return new nexacro.FrameSetBase_Style(this);
	};

	_pFrameSetBase.on_create_custom_currentStyle = function () {
		return new nexacro.FrameSetBase_CurrentStyle();
	};

	_pFrameSetBase.on_find_CurrentStyle_childmoveeffect = function (pseudo) {
		return this._find_pseudo_obj("childmoveeffect", pseudo, "value");
	};

	_pFrameSetBase.on_find_CurrentStyle_childopenstatuseffect = function (pseudo) {
		return this._find_pseudo_obj("childopenstatuseffect", pseudo, "value");
	};

	_pFrameSetBase.on_create_contents = function () {
		nexacro.Frame.prototype.on_create_contents.call(this);

		var cnt = this.frames.length;
		for (var i = 0; i < cnt; i++) {
			var frame = this.frames[i];
			if (frame.set_resizable) {
				frame.set_resizable(true);
			}
			frame.createComponent();
			this._zorderMap.add_item(frame.name, frame);
		}
	};

	_pFrameSetBase.on_change_containerRect = function (width, height) {
		var control_elem = this._control_element;
		if (control_elem) {
			;
		}
	};

	_pFrameSetBase.on_created_contents = function () {
		nexacro.Frame.prototype.on_created_contents.call(this);

		var lastx = 0, lasty = 0;
		var defaultwidth = 0, defaultheight = 0;
		var control_elem = this._control_element;
		if (control_elem) {
			defaultwidth = control_elem.client_width / 5 * 3;
			defaultheight = control_elem.client_height / 5 * 3;

			lasty = this._control_element.client_top;
		}

		var cascadegap = this._getTitlebarHeight();
		var cnt = this.frames.length;
		for (var i = 0; i < cnt; i++) {
			var frame_item = this.frames[i];
			if (frame_item.position) {
				if (frame_item._adjsut_width == 0 && frame_item._adjsut_height == 0) {
					frame_item._move(lastx, lasty, defaultwidth, defaultheight);

					lastx += cascadegap;
					lasty += cascadegap;
				}
			}
			frame_item.on_created();
		}
	};

	_pFrameSetBase.on_destroy_contents = function () {
		nexacro.Frame.prototype.on_destroy_contents.call(this);

		var cnt = this.frames.length;
		for (var i = cnt - 1; i >= 0; i--) {
			var frame_item = this.frames[i];
			if (frame_item) {
				frame_item.destroyComponent();
				frame_item = null;
			}
		}
		this.frames = null;
	};

	_pFrameSetBase._updateClientSize = function (control_elem) {
		var client_left = control_elem.client_left;
		var client_top = control_elem.client_top;
		var client_width = control_elem.client_width;
		var client_height = control_elem.client_height;

		var apply_flag = false;
		if (this._client_left != client_left || this._client_top != client_top) {
			this._client_left = client_left;
			this._client_top = client_top;
			apply_flag = true;
		}
		if (this._client_width != client_width || this._client_height != client_height) {
			this._client_width = client_width;
			this._client_height = client_height;
			apply_flag = true;
		}

		if (apply_flag) {
			this.on_change_containerRect(client_width, client_height);
		}
	};


	_pFrameSetBase.set_ctrltaborder = function () {
		;
	};

	_pFrameSetBase.set_ctrltabtype = function () {
		;
	};

	_pFrameSetBase.set_separatesize = function (v) {
		if (this.separatesize != v) {
			this.separatesize = v;
			this._separatesize = v.split(",");

			var control_elem = this._control_element;
			if (control_elem) {
				this.on_change_containerRect(control_elem.client_width, control_elem.client_height);
			}
		}
	};

	_pFrameSetBase.set_keepseparatesizewhenswap = function (v) {
		var keepseparatesizewhenswap = nexacro._toBoolean(v);
		if (this.keepseparatesizewhenswap != keepseparatesizewhenswap) {
			this.keepseparatesizewhenswap = keepseparatesizewhenswap;
		}
	};

	_pFrameSetBase.set_minimizedchildposition = function (v) {
		var pre = this.minimizedchildposition;
		if (pre == v) {
			return;
		}

		switch (v) {
			case "left":
				this._minimizedchildposition = 0;
				this.minimizedchildposition = v;
				break;
			case "top":
				this._minimizedchildposition = 1;
				this.minimizedchildposition = v;
				break;
			case "right":
				this._minimizedchildposition = 2;
				this.minimizedchildposition = v;
				break;
			case "bottom":
				this._minimizedchildposition = 3;
				this.minimizedchildposition = v;
				break;
		}

		var control_elem = this._control_element;
		if (this.minimizedchildposition == v && control_elem) {
			this.on_change_containerRect(control_elem.client_width, control_elem.client_height);
		}

		return this.minimizedchildposition;
	};


	_pFrameSetBase._on_child_movetrack = function (child, x, y, dragdata) {
		var checkx = (this._type_name == "VFrameSet") ? false : true;
		var checky = (this._type_name == "HFrameSet") ? false : true;
		var curx = child._adjust_left + (child._adjust_width / 2);
		var cury = child._adjust_top + (child._adjust_height / 2);
		var hitidx = -1;
		for (var i = 0; i < this.frames.length; i++) {
			var frame = this.frames[i];
			if (frame == child) {
				continue;
			}

			if (frame._state_openstatus == 2) {
				continue;
			}

			if (checkx) {
				var loopleft = frame._adjust_left;
				var loopright = loopleft + frame._adjust_width;
				if (loopleft > curx) {
					continue;
				}

				if (loopright < curx) {
					continue;
				}
			}

			if (checky) {
				var looptop = frame._adjust_top;
				var loopbottom = looptop + frame._adjust_height;
				if (looptop > cury) {
					continue;
				}

				if (loopbottom < cury) {
					continue;
				}
			}

			hitidx = i;
			break;
		}

		if (hitidx != (-1)) {
			var frames = this.frames;
			var curidx = frames.indexOf(child.name);
			var hitchild = frames[hitidx];

			frames.remove_item(hitchild.name);
			frames.insert_item(curidx, hitchild.name, hitchild);

			frames.remove_item(child.name);
			frames.insert_item(hitidx, child.name, child);



			if (this._control_element) {
				this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
			}
		}
	};

	_pFrameSetBase._on_child_starttrack = function (child, x, y, dragdata) {
		if (child) {
			this._track_frame = child;
		}
	};

	_pFrameSetBase._on_child_endtrack = function (child, x, y, dragdata) {
		this._track_frame = null;

		if (this._control_element) {
			this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
		}
	};

	_pFrameSetBase._change_state_activate = function (cur, activated_child) {
		if (cur == true) {
			if (activated_child) {
				var cur_active = this.getActiveFrame();
				if (cur_active && cur_active != activated_child) {
					cur_active._change_state_activate(false, null);
				}

				this._active_frame = activated_child;
				if (activated_child._control_element) {
					if (this._zorderMap.indexOf(activated_child) < 0) {
						alert("zorder missed: " + activated_child.id);
						this._zorderMap.insert_item(0, activated_child, activated_child.id);
					}

					if (this._zorderMap.length > 1) {
						if (this._control_element) {
							this._control_element.bringToFrontElement(activated_child._control_element);
						}

						this._zorderMap.remove_item(activated_child.id);
						this._zorderMap.add_item(activated_child.id, activated_child);
					}

					if (this._max_frame && this._max_frame != activated_child) {
						activated_child._change_state_OpenStatus(3);
					}
				}
			}
		}
		else if (cur == false) {
			var frames = this.frames;
			var frames_len = frames.length;
			for (var i = 0; i < frames_len; i++) {
				var child = frames[i];
				if (child._isNested()) {
					child._change_state_activate(false);
				}
			}
		}

		nexacro.Frame.prototype._change_state_activate.call(this, cur);
	};

	_pFrameSetBase.on_apply_prop_enable = function (v) {
		var frames = this.frames;
		for (var i = 0; i < frames.length; i++) {
			var frame = frames[i];
			frame._setEnable(v);
		}
	};

	_pFrameSetBase.on_apply_prop_rtldirection = function () {
		var control_elem = this._control_element;

		if (control_elem) {
			this.on_change_containerRect(control_elem.client_width, control_elem.client_height);
		}

		var _rtldirection = this._rtldirection;
		var frames = this.frames;
		if (frames) {
			var i;

			for (i = 0; i < frames.length; i++) {
				var frame = frames[i];
				if (frame) {
					frame._setRtlDirection(_rtldirection);
				}
			}
		}
	};

	_pFrameSetBase.getActiveFrame = function () {
		if (this._active_frame) {
			return this._active_frame;
		}

		return this._getTopOrderFrame();
	};

	_pFrameSetBase.getHandle = function () {
	};


	_pFrameSetBase._getTopOrderFrame = function () {
		var len = this._zorderMap.length;
		if (len > 0) {
			var obj = this._zorderMap.get_item(len - 1);
			return obj;
		}

		return null;
	};

	_pFrameSetBase._getNextOrderFrame = function (target) {
		var len = this._zorderMap.length;
		if (len > 0) {
			var idx = this._zorderMap.indexOf(target.id);
			if (idx - 1 > len - 1 && idx - 1 < 0) {
				return null;
			}

			var obj = this._zorderMap.get_item(idx - 1);
			return obj;
		}
		return null;
	};

	_pFrameSetBase._visibleFrameCount = function () {
		return this.frames.length;
	};

	_pFrameSetBase._getMinimizeFrameCount = function () {
		var cnt = 0;
		for (var i = 0; i < this.frames.length; i++) {
			if (this.frames[i]._state_openstatus == 2) {
				cnt++;
			}
		}
		return cnt;
	};

	_pFrameSetBase._recalcSeparateFrameSize = function (totalsize, inframecnt, inseparatecnt) {
		var separateframesize = [];

		var separatesizecnt = ((inseparatecnt) ? inseparatecnt : this._separatesize.length);
		var framecnt = ((inframecnt) ? inframecnt : this._visibleFrameCount());

		var dividecnt = 0, fixedcnt = 0;
		var totalfixedsize = 0, dividesize = 0;

		var separatesize = this._separatesize;
		for (var i = 0; i < framecnt; i++) {
			var str = separatesize[i];
			var pos = -1;
			var size = -1;
			if (str) {
				str.trim();
				size = ((str.indexOf("*") < 0) && (str.length > 0)) ? nexacro._parseInt(str) : -1;
			}
			if (size == -1) {
				var ntimes = -1;
				if (str) {
					ntimes = nexacro._parseInt(str.substring(0, pos));
				}

				if (ntimes > 0) {
					dividecnt += ntimes;
					separateframesize[i] = ntimes * size;
				}
				else {
					dividecnt++;
					separateframesize[i] = size;
				}
			}
			else {
				fixedcnt++;
				totalfixedsize += size;
				if (totalfixedsize <= totalsize) {
					separateframesize[i] = size;
				}
				else if (fixedcnt == 1) {
					separateframesize[i] = totalsize;
				}
				else {
					totalfixedsize -= size;
				}
			}
		}

		dividesize = dividecnt > 0 ? (totalsize - totalfixedsize) / dividecnt : 0;

		for (var i = 0; i < framecnt; i++) {
			if (separateframesize[i] < 0) {
				separateframesize[i] = Math.abs(separateframesize[i]) * dividesize;
			}
			else if (separateframesize[i] == undefined) {
				separateframesize[i] = 0;
			}
		}

		return separateframesize;
	};

	_pFrameSetBase._getTitleText = function (brecursive) {
		var titletext;
		titletext = this.titletext;
		if (brecursive) {
			var activeframe = this.getActiveFrame();
			if (activeframe) {
				var subtitletext = activeframe._getTitleText(true);
				if (subtitletext.length > 0) {
					if (titletext.length > 0) {
						titletext += " - ";
					}
					titletext += subtitletext;
				}
			}
		}
		return titletext;
	};

	_pFrameSetBase._getStatusText = function (brecursive) {
		var statustext;
		statustext = this.statustext;
		if (brecursive) {
			var activeframe = this.getActiveFrame();
			if (activeframe) {
				var substatustext = activeframe._getStatusText(true);
				if (substatustext.length > 0) {
					if (statustext.length > 0) {
						statustext += " - ";
					}
					statustext += substatustext;
				}
			}
		}
		return statustext;
	};

	delete _pFrameSetBase;

	nexacro.FrameSet_Style = function (target) {
		nexacro.FrameSetBase_Style.call(this, target);
	};

	var _pFrameSetStyle = nexacro._createPrototype(nexacro.FrameSetBase_Style, nexacro.FrameSet_Style);
	nexacro.FrameSet_Style.prototype = _pFrameSetStyle;

	eval(nexacro._createValueAttributeEvalStr("_pFrameSetStyle", "minimizewidth"));
	eval(nexacro._createValueAttributeEvalStr("_pFrameSetStyle", "minimizeheight"));

	_pFrameSetStyle.__custom_emptyObject = function () {
		this.minimizewidth = null;
		this.minimizeheight = null;
	};

	_pFrameSetStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.minimizewidth && !this.minimizewidth._is_empty) {
			val += "minimizewidth:" + this.minimizewidth._value + "; ";
		}
		if (this.minimizeheight && !this.minimizeheight._is_empty) {
			val += "minimizeheight:" + this.minimizeheight._value + "; ";
		}
		return val;
	};

	nexacro.FrameSet_CurrentStyle = function () {
		nexacro.FrameSetBase_CurrentStyle.call(this);
	};

	var _pFrameSetCurrentStyle = nexacro._createPrototype(nexacro.FrameSetBase_CurrentStyle, nexacro.FrameSet_CurrentStyle);
	nexacro.FrameSet_CurrentStyle.prototype = _pFrameSetCurrentStyle;

	_pFrameSetCurrentStyle.__custom_emptyObject = _pFrameSetStyle.__custom_emptyObject;
	_pFrameSetCurrentStyle.__get_custom_style_value = _pFrameSetStyle.__get_custom_style_value;

	delete _pFrameSetStyle;
	delete _pFrameSetCurrentStyle;

	nexacro.FrameSet = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, position, left, top, width, height, right, bottom, parent);
		this.separatesize = "";
		this.keepseparatesizewhenswap = false;
		this.childmoveeffect = null;
		this.childopenstatuseffect = null;

		this.ctrltaborder = 0;
		this.ctrltabtype = 0;
		this.minimizedchildposition = "bottom";

		this._separatesize = [];
		this._minimizedchildposition = 3;
		this._is_autorecalc_frame = false;
	};

	var _pFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.FrameSet);
	nexacro.FrameSet.prototype = _pFrameSet;

	_pFrameSet._type_name = "FrameSet";



	_pFrameSet.on_apply_custom_pseudo = function (pseudo) {
		nexacro.Frame.prototype.on_apply_custom_pseudo.call(this);

		var curstyle = this.currentstyle;

		var minimizewidth = this.on_find_CurrentStyle_minimizewidth(pseudo);
		var apply_flag = false;
		if (minimizewidth != curstyle.minimizewidth) {
			curstyle.minimizewidth = minimizewidth;
			apply_flag = true;
		}

		var minimizeheight = this.on_find_CurrentStyle_minimizeheight(pseudo);
		if (minimizeheight != curstyle.minimizeheight) {
			curstyle.minimizeheight = minimizeheight;
			apply_flag = true;
		}

		if (apply_flag) {
			this.on_change_containerRect(this._client_width, this._client_height);
		}
	};

	_pFrameSet.on_create_custom_style = function () {
		return new nexacro.FrameSet_Style(this);
	};

	_pFrameSet.on_create_custom_currentStyle = function () {
		return new nexacro.FrameSet_CurrentStyle();
	};

	_pFrameSet.on_find_CurrentStyle_minimizewidth = function (pseudo) {
		return this._find_pseudo_obj("minimizewidth", pseudo, "value");
	};

	_pFrameSet.on_find_CurrentStyle_minimizeheight = function (pseudo) {
		return this._find_pseudo_obj("minimizeheight", pseudo, "value");
	};

	_pFrameSet.on_apply_style_minimizewidth = function () {
	};

	_pFrameSet.on_apply_style_minimizeheight = function () {
	};


	_pFrameSet.on_change_containerRect = function (width, height) {
		var control_elem = this._control_element;
		if (control_elem) {
			var frameleft = 0;
			var frametop = 0;
			var framewidth = control_elem.client_width;
			var frameheight = control_elem.client_height;
			var frameright = frameleft + control_elem.client_width;
			var framebottom = frametop + control_elem.client_height;

			if (this._max_frame) {
				this._max_frame._move(frameleft, frametop, framewidth, frameheight);
			}

			var i = 0;
			for (i = 0; i < this.frames.length; i++) {
				var child = this.frames[i];
				if (child == this._max_frame) {
					continue;
				}

				if (child._state_openstatus == 2) {
					child._setVerticalMin(false);

					var minwidth = 25 * 5;

					var minheight = -1;
					if (minheight == (-1)) {
						var titleheight = child.on_find_CurrentStyle_titlebarheight();
						minheight = parseInt(titleheight.value) | 0;

						var borderval = child.on_find_CurrentStyle_border();
						minheight += borderval._getBorderTopWidth();
						minheight += borderval._getBorderBottomWidth();
					}

					switch (this._minimizedchildposition) {
						case 0:
							framebottom = frametop + minheight;
							child._move(frameleft, frametop, minwidth, minheight);
							frametop = framebottom;
							break;
						case 1:
							frameright = frameleft + minwidth;
							child._move(frameleft, frametop, minwidth, minheight);
							frameleft = frameright;
							break;
						case 2:
							framebottom = frametop + minheight;
							child._move(frameright - minwidth, frametop, minwidth, minheight);
							frametop = framebottom;
							break;
						case 3:
							frameright = frameleft + minwidth;
							child._move(frameleft, framebottom - minheight, minwidth, minheight);
							frameleft = frameright;
							break;
					}
				}
			}
		}
	};



	_pFrameSet.set_minimizewidth = function () {
		;
	};

	_pFrameSet.set_minimizeheight = function () {
		;
	};


	_pFrameSet.arrange = function (v) {
		if (this._max_frame) {
			this._max_frame.on_syscommand(this._max_frame._control_element, "restore", true, this._max_frame, null);
		}

		var arrangecnt = 0;
		for (var i = 0; i < this.frames.length; i++) {
			var child = this._zorderMap[i];
			if (child.visible == false || child._state_openstatus == 2) {
				continue;
			}
			arrangecnt++;
		}

		var frameleft = 0;
		var frametop = 0;
		var framewidth = this._client_width;
		var frameheight = this._client_height;
		if (v == "cascade") {
			var cascadecnt = 0;
			for (var temp = 100; ; cascadecnt++) {
				if (this._client_height < temp) {
					break;
				}
				temp += (60 + (cascadecnt * 10));
			}

			var cascadegapx = this._getTitlebarHeight() > 0 ? this._getTitlebarHeight() : 20;
			var cascadegapy = cascadegapx;
			framewidth = this._client_width - (cascadegapx * cascadecnt);
			frameheight = this._client_height - (cascadegapy * cascadecnt);
			for (var i = 0, j = 0; i < this.frames.length; i++) {
				var child = this._zorderMap[i];
				if (child.visible == false || child._state_openstatus == 2) {
					continue;
				}

				frameleft = cascadegapx * (j % (cascadecnt + 1));
				frametop = cascadegapy * (j % (cascadecnt + 1));

				child._move(frameleft, frametop, framewidth, frameheight);

				j++;
			}
		}
		if (v == "tilevertical") {
			var fixed = true;
			var rowcnt = parseInt(Math.sqrt(arrangecnt)) | 0;
			var colcnt = parseInt(arrangecnt / rowcnt) | 0;

			if ((arrangecnt % rowcnt) != 0) {
				rowcnt += 1;
				fixed = false;
			}

			var left = arrangecnt;
			for (var col = 0, i = 0; col < colcnt; col++) {
				for (var row = 0; row < rowcnt; ) {
					var child = this._zorderMap[i];
					if (child.visible == false || child._state_openstatus == 2) {
						i++;
						continue;
					}

					var rc = {
						left : frameleft, 
						top : frametop, 
						right : frameleft + framewidth, 
						bottom : frametop + frameheight
					};
					rc.right = rc.left + ((rc.right - rc.left) / colcnt);
					rc.bottom = rc.top + ((rc.bottom - rc.top) / rowcnt);

					var width = rc.right - rc.left;
					var height = rc.bottom - rc.top;
					rc.left += (colcnt - col - 1) * width;
					rc.top += (rowcnt - row - 1) * height;
					rc.right += (colcnt - col - 1) * width;
					rc.bottom += (rowcnt - row - 1) * height;

					child._move(rc.left, rc.top, rc.right - rc.left, rc.bottom - rc.top);
					row++, i++, left--;
				}

				if (!fixed && rowcnt > 2 && (left % (rowcnt - 1)) == 0) {
					rowcnt--;
					fixed = true;
				}
			}
		}
		if (v == "tilehorizontal") {
			var fixed = true;
			var colcnt = parseInt(Math.sqrt(arrangecnt)) | 0;
			var rowcnt = parseInt(arrangecnt / colcnt) | 0;

			if ((arrangecnt % colcnt) != 0) {
				rowcnt += 1;
				fixed = false;
			}

			var left = arrangecnt;
			for (var col = 0, i = 0; col < colcnt; col++) {
				for (var row = 0; row < rowcnt; ) {
					var child = this._zorderMap[i];
					if (child.visible == false || child._state_openstatus == 2) {
						continue;
					}

					var rc = {
						left : frameleft, 
						top : frametop, 
						right : frameleft + framewidth, 
						bottom : frametop + frameheight
					};
					rc.right = rc.left + ((rc.right - rc.left) / colcnt);
					rc.bottom = rc.top + ((rc.bottom - rc.top) / rowcnt);

					var width = rc.right - rc.left;
					var height = rc.bottom - rc.top;
					rc.left += (colcnt - col - 1) * width;
					rc.top += (rowcnt - row - 1) * height;
					rc.right += (colcnt - col - 1) * width;
					rc.bottom += (rowcnt - row - 1) * height;

					child._move(rc.left, rc.top, rc.right - rc.left, rc.bottom - rc.top);
					row++, i++, left--;
				}

				if (!fixed && rowcnt > 2 && (left % (rowcnt - 1)) == 0) {
					rowcnt--;
					fixed = true;
				}
			}
		}
		if (v == "vertical") {
			for (var i = 0, j = 0; i < this.frames.length; i++) {
				var child = this._zorderMap[i];
				if (child.visible == false || child._state_openstatus == 2) {
					continue;
				}

				child._move(frameleft + (j * (framewidth / arrangecnt)), frametop, (framewidth / arrangecnt), frameheight);
				j++;
			}
		}
		if (v == "horizontal") {
			var top = frametop;
			for (var i = 0; i < this.frames.length; i++) {
				var child = this._zorderMap[i];
				if (child.visible == false || child._state_openstatus == 2) {
					continue;
				}

				var rc = {
					left : frameleft, 
					top : frametop, 
					right : frameleft + framewidth, 
					bottom : frametop + frameheight
				};
				rc.top = top;
				rc.bottom = rc.top + (frameheight / arrangecnt);

				var minx = 0, miny = 0;

				if (rc.bottom - rc.top < miny) {
					rc.bottom = rc.top + miny;
				}

				top = rc.bottom + 1;
				child._move(frameleft, rc.top, framewidth, rc.bottom - rc.top);
			}
		}
	};

	delete _pFrameSet;

	nexacro.VFrameSet = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, position, left, top, width, height, right, bottom, parent);
	};
	var _pVFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.VFrameSet);
	nexacro.VFrameSet.prototype = _pVFrameSet;

	_pVFrameSet._type_name = "VFrameSet";

	_pVFrameSet.on_change_containerRect = function (width, height) {
		nexacro.Frame.prototype.on_change_containerRect.call(this, width, height);

		var control_elem = this._control_element;
		if (control_elem) {
			var framesize = this._recalcSeparateFrameSize(height);
			var cnt = this.frames.length;
			var frameleft = 0;
			var frametop = 0;
			var framebottom = 0;
			var frameright = frameleft + width;

			var maxframeheight = this._client_height;
			if (this._max_frame) {
				var maxidx = -1;
				var minheight = 0;
				for (var i = 0; i < cnt; i++) {
					var child = this.frames[i];
					if (child == this._max_frame) {
						maxidx = i;
						continue;
					}
					var titleheight = child.on_find_CurrentStyle_titlebarheight();
					minheight = parseInt(titleheight.value) | 0;

					var borderval = child.on_find_CurrentStyle_border();
					if (borderval) {
						minheight += borderval._getBorderTopWidth();
						minheight += borderval._getBorderBottomWidth();
					}

					maxframeheight -= minheight;
					framesize[i] = minheight;
				}

				framesize[maxidx] = maxframeheight;
			}

			var preframe_minimized = false;
			var gap = 0;
			for (var i = 0; i < cnt; i++) {
				var child = this.frames[i];

				if (preframe_minimized) {
					frametop = framebottom;
					preframe_minimized = false;
				}

				if (child._state_openstatus == 2) {
					child._setVerticalMin(false);

					var minheight = 0;
					var titleheight = child.on_find_CurrentStyle_titlebarheight();
					minheight = parseInt(titleheight.value) | 0;

					var borderval = child.on_find_CurrentStyle_border();
					if (borderval) {
						minheight += borderval._getBorderTopWidth();
						minheight += borderval._getBorderBottomWidth();
					}

					gap += framesize[i] - minheight;
					framesize[i] = minheight;
					preframe_minimized = true;
				}

				if (child._state_openstatus != 2) {
					framesize[i] += gap;
					gap = 0;
				}

				framebottom = framesize[i] + frametop;
				if (child != this._track_frame) {
					child._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
				}
				frametop = framebottom;
			}
		}
	};

	_pVFrameSet.arrange = nexacro._emptyFn;

	_pVFrameSet.set_minimizedchildposition = nexacro._emptyFn;

	delete _pVFrameSet;

	nexacro.HFrameSet = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, position, left, top, width, height, right, bottom, parent);
	};
	var _pHFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.HFrameSet);
	nexacro.HFrameSet.prototype = _pHFrameSet;

	_pHFrameSet._type_name = "HFrameSet";

	_pHFrameSet.on_change_containerRect = function (width, height) {
		nexacro.Frame.prototype.on_change_containerRect.call(this, width, height);

		var control_elem = this._control_element;
		if (control_elem) {
			var framesize = this._recalcSeparateFrameSize(width);
			var cnt = this.frames.length;
			var frameleft = 0;
			var frametop = 0;
			var frameright = 0;
			var framebottom = frametop + height;

			var maxframewidth = this._client_width;
			if (this._max_frame) {
				var maxidx = -1;
				var minwidth = 0;
				for (var i = 0; i < cnt; i++) {
					var child = this.frames[i];
					if (child == this._max_frame) {
						maxidx = i;
						continue;
					}
					var titleheight = child.on_find_CurrentStyle_titlebarheight();
					minwidth = parseInt(titleheight.value) | 0;

					var borderval = child.on_find_CurrentStyle_border();
					if (boderval) {
						minwidth += borderval._getBorderLeftWidth();
						minwidth += borderval._getBorderRightWidth();
					}

					maxframewidth -= minwidth;
					framesize[i] = minwidth;
				}

				framesize[maxidx] = maxframewidth;
			}

			var preframe_minimized = false;
			var gap = 0;
			for (var i = 0; i < cnt; i++) {
				var child = this.frames[i];

				if (preframe_minimized) {
					frameleft = frameright;
					preframe_minimized = false;
				}

				if (child._state_openstatus == 2) {
					child._setVerticalMin(true);

					var minwidth = 0;
					var titleheight = child.on_find_CurrentStyle_titlebarheight();
					minwidth = parseInt(titleheight.value) | 0;

					var borderval = child.on_find_CurrentStyle_border();
					if (borderval) {
						minwidth += borderval._getBorderLeftWidth();
						minwidth += borderval._getBorderRightWidth();
					}

					gap += framesize[i] - minwidth;
					framesize[i] = minwidth;
					preframe_minimized = true;
				}

				if (child._state_openstatus != 2) {
					if (this._max_frame && child != this._max_frame) {
						child._setVerticalMin(true);
					}
					else {
						child._setVerticalMin(false);
					}

					framesize[i] += gap;
					gap = 0;
				}

				frameright = framesize[i] + frameleft;
				if (child != this._track_frame) {
					child._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
				}
				frameleft = frameright;
			}
		}
	};

	_pHFrameSet.arrange = nexacro._emptyFn;

	_pHFrameSet.set_minimizedchildposition = nexacro._emptyFn;

	delete _pHFrameSet;

	nexacro.TileFrameSet = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.FrameSetBase.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.separatetype = "horizontal";
		this.separatecount = 1;
		this.fullframemaximize = true;
		this.minimizedchildposition = "bottom";


		this._separatetype = 0;
		this._minimizedchildposition = 3;
	};
	var _pTileFrameSet = nexacro._createPrototype(nexacro.FrameSetBase, nexacro.TileFrameSet);
	nexacro.TileFrameSet.prototype = _pTileFrameSet;

	_pTileFrameSet._type_name = "TileFrameSet";

	_pTileFrameSet.on_change_containerRect = function (width, height) {
		nexacro.Frame.prototype.on_change_containerRect.call(this, width, height);

		var control_elem = this._control_element;
		if (control_elem) {
			var framecnt = this.frames.length;

			var fullframewidth = control_elem.client_width;
			var fullframeheight = control_elem.client_height;

			if (this.fullframemaximize == false) {
				if (this._max_frame) {
					for (var i = 0; i < this.frames.length; i++) {
						if (this._max_frame != this.frames[i] && this.frames[i]._state_openstatus != 2) {
							this.frames[i].openstatus = "minimize";
							this.frames[i]._change_state_OpenStatus(2);
						}
					}
				}
				else {
					for (var i = 0; i < this.frames.length; i++) {
						if (this.frames[i]._state_openstatus == 2) {
							this.frames[i].openstatus = "normal";
							this.frames[i]._change_state_OpenStatus(0);
						}
					}
				}
			}

			var minimizeframecnt = this._getMinimizeFrameCount();
			var normalframecnt = (framecnt - minimizeframecnt) > 0 ? framecnt - minimizeframecnt : 1;
			var separatecnt = this.separatecount > 0 ? this.separatecount : 1;
			var framerowcnt = parseInt(normalframecnt / separatecnt) + (parseInt(normalframecnt % separatecnt) > 0 ? 1 : 0);

			var horzminarea = false;
			if (this._minimizedchildposition == 1 || this._minimizedchildposition == 3) {
				horzminarea = true;
			}

			var minareawidth = 0, minareaheight = 0;
			if (horzminarea) {
				minareawidth = width;
				if (minimizeframecnt > 0) {
					minareaheight = this._getMaxMinimizedHeight();
					if (minareaheight == (-1)) {
						minareaheight = 25;
					}
				}
			}
			else {
				minareaheight = height;
				if (minimizeframecnt > 0) {
					minareawidth = this._getMaxMinimizedWidth();
					if (minareawidth == (-1)) {
						minareawidth = 150;
					}
				}
			}

			var displayframewidth = 0, displayframeheight = 0;
			if (this._separatetype == 1) {
				displayframewidth = (width - (horzminarea ? 0 : minareawidth)) / framerowcnt;
				displayframeheight = height - (horzminarea ? minareaheight : 0);
			}
			else {
				displayframewidth = width - (horzminarea ? 0 : minareawidth);
				displayframeheight = (height - (horzminarea ? minareaheight : 0)) / framerowcnt;
			}

			var newcnt = framecnt - separatecnt > 0 ? separatecnt : framecnt;
			var realcolcnt = normalframecnt - separatecnt > 0 ? separatecnt : normalframecnt;

			var realtotalsize = 0;
			if (this._separatetype == 1) {
				realtotalsize = height;
				if (horzminarea) {
					realtotalsize -= minareaheight;
				}
			}
			else {
				realtotalsize = width;
				if (!horzminarea) {
					realtotalsize -= minareawidth;
				}
			}

			var framesize = this._recalcSeparateFrameSize(realtotalsize, realcolcnt, realcolcnt);
			var frameleft = 0;
			var frametop = 0;
			var frameright = frameleft + width;
			var framebottom = frametop + height;
			if (minimizeframecnt > 0) {
				switch (this._minimizedchildposition) {
					case 0:
						frameleft += minareawidth;
						break;
					case 1:
						frametop += minareaheight;
						break;
					case 2:
						frameright -= minareawidth;
						break;
					case 3:
						framebottom -= minareaheight;
						break;
				}
			}

			if (this._separatetype == 1) {
				frameright = frameleft + displayframewidth;
			}
			else {
				framebottom = frametop + displayframeheight;
			}

			if (this._max_frame) {
				if (this.fullframemaximize) {
					this._max_frame._move(0, 0, fullframewidth, fullframeheight);
				}
				else {
					this._max_frame._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
				}

				if (this._control_element && this._max_frame._control_element) {
					this._control_element.bringToFrontElement(this._max_frame._control_element);
				}
			}
			else if (this.fullframemaximize == false) {
				for (var i = 0; i < this.frames.length; i++) {
					if (this.frames[i]._state_openstatus == 2) {
						this.frames[i]._change_state_OpenStatus(1);
					}
				}
			}

			var i = 0, j = 0, k = 0;
			for (i = 0; i < framerowcnt; i++) {
				for (j = 0; j < realcolcnt && k < framecnt; k++) {
					var child = this.frames[k];
					if (child == this._max_frame) {
						continue;
					}

					if (child._state_openstatus == 2) {
						continue;
					}

					if (this._separatetype == 1) {
						framebottom = framesize[j] + frametop;
					}
					else {
						frameright = framesize[j] + frameleft;
					}

					if (child != this._track_frame) {
						child._move(frameleft, frametop, frameright - frameleft, framebottom - frametop);
					}

					if (this._separatetype == 1) {
						frametop = framebottom;
					}
					else {
						frameleft = frameright;
					}

					j++;
				}

				if (this._separatetype == 1) {
					frametop = 0;
					frameleft = frameright;
					frameright = frameleft + displayframewidth;

					if (this._minimizedchildposition == 1) {
						frametop += minareaheight;
					}
				}
				else {
					frameleft = 0;
					frametop = framebottom;
					framebottom = frametop + displayframeheight;

					if (this._minimizedchildposition == 0) {
						frameleft += minareawidth;
					}
				}
			}

			if (minimizeframecnt <= 0) {
				return;
			}

			var minframeleft = 0;
			var minframetop = 0;
			var minframeright = minframeleft + this._client_width;
			var minframebottom = minframetop + this._client_height;
			switch (this._minimizedchildposition) {
				case 0:
					minframeright = minframeleft + minareawidth;
					break;
				case 1:
					minframebottom = minframetop + minareaheight;
					break;
				case 2:
					minframeleft = minframeright - minareawidth;
					break;
				case 3:
					minframetop = minframebottom - minareaheight;
					break;
			}


			var defaultminwidth = 150;
			var minwidth = width - (minimizeframecnt * defaultminwidth);
			minwidth = minwidth > 0 ? defaultminwidth : (width / minimizeframecnt);
			minwidth = minwidth < 100 ? 100 : minwidth;

			for (i = 0; i < framecnt; i++) {
				var child = this.frames[i];
				if (child._state_openstatus == 2) {
					child._setVerticalMin(false);

					var minheight = -1;
					if (minheight == (-1)) {
						var titleheight = child.on_find_CurrentStyle_titlebarheight();
						minheight = parseInt(titleheight.value) | 0;

						var borderval = child.on_find_CurrentStyle_border();
						minheight += borderval._getBorderTopWidth();
						minheight += borderval._getBorderBottomWidth();
					}

					switch (this._minimizedchildposition) {
						case 0:
							minframebottom = minframetop + minheight;
							child._move(minframeleft, minframetop, minframeright - minframeleft, minheight);
							minframetop = minframebottom;
							break;
						case 1:
							minframeright = minframeleft + minwidth;
							child._move(minframeleft, minframetop, minwidth, minframebottom - minframeleft);
							minframeleft = minframeright;
							break;
						case 2:
							minframebottom = minframetop + minheight;
							child._move(minframeleft, minframetop, minframeright - minframeleft, minheight);
							minframetop = minframebottom;
							break;
						case 3:
							minframeright = minframeleft + minwidth;
							child._move(minframeleft, minframetop, minwidth, minframebottom - minframetop);
							minframeleft = minframeright;
							break;
					}
				}
			}
		}
	};

	_pTileFrameSet.set_separatetype = function (v) {
		if (this.separatetype != v) {
			this.separatetype = v;
			this._separatetype = (v == "vertical" ? 1 : 0);

			if (this._control_element) {
				this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
			}
		}
	};

	_pTileFrameSet.set_separatecount = function (v) {
		var separatecount = nexacro._parseInt(v);
		if (this.separatecount != separatecount) {
			if (separatecount < 0) {
				this.separatecount = 1;
			}
			else {
				this.separatecount = separatecount;
			}

			if (this._control_element) {
				this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
			}
		}
	};

	_pTileFrameSet.set_fullframemaximize = function (v) {
		var fullframemaximize = nexacro._toBoolean(v);
		if (this.fullframemaximize != fullframemaximize) {
			this.fullframemaximize = fullframemaximize;

			for (var i = 0; i < this.frames.length; i++) {
				var child = this.frames[i];
				if (child.titlebar) {
					if (fullframemaximize == false) {
						child.titlebar._setAbsoluteStyle(0x0001, 0);
					}
					else {
						child.titlebar._setAbsoluteStyle(0x0100, 0x0001);
						child.titlebar._setAbsoluteStyle(0, 0x0100);
					}
				}
			}

			if (this._control_element) {
				this.on_change_containerRect(this._control_element.client_width, this._control_element.client_height);
			}
		}
	};

	_pTileFrameSet.arrange = nexacro._emptyFn;



	_pTileFrameSet._getMaxMinimizedWidth = function () {
		var max = -1;
		for (var i = 0; i < this.frames.length; i++) {
			var child = this.frames[i];
			if (child._state_openstatus != 2) {
				continue;
			}
		}
		return max;
	};

	_pTileFrameSet._getMaxMinimizedHeight = function () {
		var max = -1;
		for (var i = 0; i < this.frames.length; i++) {
			var child = this.frames[i];
			if (child._state_openstatus != 2) {
				continue;
			}


			var minheight = -1;

			if (minheight == (-1)) {
				var titleheight = child.on_find_CurrentStyle_titlebarheight();
				minheight = parseInt(titleheight.value) | 0;

				var borderval = child.on_find_CurrentStyle_border();
				minheight += borderval._getBorderTopWidth();
				minheight += borderval._getBorderBottomWidth();

				if (minheight > max) {
					max = minheight;
				}
			}
		}
		return max;
	};

	delete _pTileFrameSet;


	if (!nexacro.MainTitleBarCtrl) {
		nexacro.MainTitleBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
			nexacro.TitleBarCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);


			this._hittest_type = "caption";
		};

		var _pMainTitleBarCtrl = nexacro._createPrototype(nexacro.TitleBarCtrl, nexacro.MainTitleBarCtrl);
		nexacro.MainTitleBarCtrl.prototype = _pMainTitleBarCtrl;

		delete _pMainTitleBarCtrl;
	}

	if (!nexacro.ChildTitleBarCtrl) {
		nexacro.ChildTitleBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
			nexacro.TitleBarCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
			this._is_subcontrol = true;

			if (parent && parent._is_frame && parent._is_window && parent._dragmovetype != 0) {
				this._hittest_type = "caption";
			}
		};

		var _pChildTitleBarCtrl = nexacro._createPrototype(nexacro.TitleBarCtrl, nexacro.ChildTitleBarCtrl);
		nexacro.ChildTitleBarCtrl.prototype = _pChildTitleBarCtrl;

		delete _pChildTitleBarCtrl;
	}


	if (!nexacro.MainStatusBarCtrl) {
		nexacro.MainStatusBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
			nexacro.StatusBarCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

			this.zoomcombo = null;
			this.zoomcombogap = 1;
			this.zoomcomboheight = 20;
			this.zoomcombowidth = 70;

			this._comm_progress_ref = 0;
			this._comm_progress_timer = null;
		};

		var _pMainStatusBarCtrl = nexacro._createPrototype(nexacro.StatusBarCtrl, nexacro.MainStatusBarCtrl);
		nexacro.MainStatusBarCtrl.prototype = _pMainStatusBarCtrl;

		_pMainStatusBarCtrl._movezoomcombo = function (left, top, bar_width, bar_height) {
			if (!this.zoomcombo) {
				return;
			}
			var curstyle = this.currentstyle;
			var zoomcombowidth = curstyle.zoomcombowidth > 0 ? curstyle.zoomcombowidth._value : 70;
			var zoomcomboheight = curstyle.zoomcomboheight > 0 ? curstyle.zoomcomboheight._value : 20;
			var zoomcombogap = curstyle.zoomcombogap > 0 ? curstyle.zoomcombogap._value : 2;

			left = left - zoomcombowidth - zoomcombogap;
			left = left > 0 ? left : 0;
			top = ((bar_height - zoomcomboheight) / 2) | 0;
			if (top < 0) {
				top = 0;
			}
			this.zoomcombo.move(left, top, zoomcombowidth, zoomcomboheight);

			return left;
		};

		if (nexacro.Browser == "Runtime") {
			_pMainStatusBarCtrl._beginCommProgress = function () {
				var cur_ref = ++this._comm_progress_ref;
				if (cur_ref == 1) {
					var progressbar = this.progressbar;
					if (progressbar) {
						progressbar.set_max(1000);
						progressbar.set_pos(0);
					}

					var progress_timer = new nexacro.CallbackTimer(this, function () {
						var progressbar = this.progressbar;
						if (!progressbar) {
							return;
						}

						var cur_pos = progressbar.pos;
						cur_pos += Math.max(1, (1000 - cur_pos) / (100 * this._comm_progress_ref));
						if (cur_pos > 990) {
							cur_pos = 990;
						}

						progressbar.set_pos(cur_pos);
					}, 500);
					progress_timer.start();
					this._comm_progress_timer = progress_timer;
				}
			};

			_pMainStatusBarCtrl._stepCommProgress = function (current, overall) {
				var progressbar = this.progressbar;
				if (progressbar) {
					progressbar.set_max(overall);
					progressbar.set_pos(current);
				}
			};

			_pMainStatusBarCtrl._endCommProgress = function () {
				var cur_ref = --this._comm_progress_ref;
				if (cur_ref == 0) {
					var progressbar = this.progressbar;
					if (progressbar) {
						progressbar.set_pos(0);
					}

					if (this._comm_progress_timer) {
						this._comm_progress_timer.stop();
					}
				}
			};
		}
		else {
			_pMainStatusBarCtrl._beginCommProgress = nexacro._emptyFn;
			_pMainStatusBarCtrl._stepCommProgress = nexacro._emptyFn;
			_pMainStatusBarCtrl._endCommProgress = nexacro._emptyFn;
		}
		delete _pMainStatusBarCtrl;
	}

	if (!nexacro.ChildStatusBarCtrl) {
		nexacro.ChildStatusBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
			nexacro.StatusBarCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);


			this._showzoomcombo = false;
		};

		var _pChildStatusBarCtrl = nexacro._createPrototype(nexacro.StatusBarCtrl, nexacro.ChildStatusBarCtrl);
		nexacro.ChildStatusBarCtrl.prototype = _pChildStatusBarCtrl;

		delete _pChildStatusBarCtrl;
	}
}

