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

nexacro.TabIndexChangeEventInfo = function (obj, id, postindex, preindex) {
	this.id = this.eventid = id || "ontabindexchange";
	this.fromobject = this.fromreferenceobject = obj;

	this.postindex = postindex;
	this.preindex = preindex;
};
var _pTabIndexChangeEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.ChangeEventInfo);
nexacro.TabIndexChangeEventInfo.prototype = _pTabIndexChangeEventInfo;
_pTabIndexChangeEventInfo._type_name = "TabIndexChangeEventInfo";

delete _pTabIndexChangeEventInfo;

nexacro.TabMouseEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
	nexacro.MouseEventInfo.call(this, obj, id || "onextrabuttonclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

	this.index = index;
};
var _pTabMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MouseEventInfo);
nexacro.TabMouseEventInfo.prototype = _pTabMouseEventInfo;
_pTabMouseEventInfo._type_name = "TabMouseEventInfo";

delete _pTabMouseEventInfo;

if (!nexacro.TabComponent) {
	nexacro.TabComponent = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.spinupbutton = null;
		this.spindownbutton = null;
		this.multiline = false;
		this.tabindex = -1;
		this.focusacceptable = false;
		this.usecontrolkey = true;
		this.rotatetext = false;
		this.tabjustify = false;
		this.selectchangetype = "down";
		this.tabposition = "top";
		this.extrabutton = null;

		this._org_status = "";
		this._pre_scrollIndex = -1;

		this._imagewidth = 0;
		this._imageheight = 0;
		this._setidx = 0;
		this._oldtabindex = 0;
		this._tabpagearea = null;
		this._css_finder = null;
		this._tabButtons = [];
		this._buttonRect = [];
		this._tabextrabuttons = [];
		this._tabBorders = [];
		this._tabButtonBorders = [];
		this._tabButtonLeftBorders = [];
		this._buttonWidth = [];
		this._buttonHeight = [];

		this._scrollIndex = -1;
		this._lastIndex = -1;
		this._bSpin = false;
		this._focusobj = null;

		this._spinflagup = false;
		this._spinflagdown = false;


		this._is_canchange = false;

		this._accessibility_role = "tab";
	};

	var _pTabComponent = nexacro._createPrototype(nexacro.Form, nexacro.TabComponent);
	nexacro.TabComponent.prototype = _pTabComponent;

	_pTabComponent._type_name = "Tabcomponent";

	_pTabComponent.on_update_style_cursor = function () {
		var tabbtns = this._tabButtons;
		var tabbtnsLen = tabbtns.length;
		var tabbtn;

		for (var i = 0; i < tabbtnsLen; i++) {
			tabbtn = tabbtns[i];
			tabbtn.on_update_style_cursor();
		}

		for (var i = 0, n = this.tabpages.length; i < n; i++) {
			this.tabpages[i].on_update_style_cursor();
		}

		this._tabpagearea.on_apply_style_cursor(this.currentstyle.cursor = this.on_find_CurrentStyle_cursor(this._pseudo));

		this.on_apply_style_cursor(this.currentstyle.cursor);
	};

	_pTabComponent.on_change_containerRect = function (width, height) {
	};

	_pTabComponent.set_visible = function (v) {
		var child_list = this._child_list;
		if (child_list && child_list.length == 0 && nexacro._toBoolean(v)) {
			return;
		}

		nexacro.Component.prototype.set_visible.call(this, v);
	};

	_pTabComponent.set_multiline = function (v) {
		this.multiline = nexacro._toBoolean(v);

		if (this.multiline == false && this._buttonWidth) {
			var s = 0;
			for (var i = 0, n = this._buttonWidth.length; i < n; i++) {
				s += this._buttonWidth[i];
				if (this._orgwidth < s) {
					break;
				}
			}
			if (n > 0) {
				this._scrollIndex = this.tabindex - (i - 1);
			}
		}

		this._recalcLayout();
	};

	_pTabComponent.set_rotatetext = function (v) {
		this.rotatetext = v;
	};

	_pTabComponent.set_usecontrolkey = function (v) {
		this.usecontrolkey = v;
	};

	_pTabComponent.set_focusacceptable = function (v) {
		if (this.focusacceptable != v) {
			this.focusacceptable = v;
		}
	};

	_pTabComponent.set_tabindex = function (v) {
		var idx = parseInt(v) | 0;
		this._oldtabindex = this.tabindex;
		this._setidx = idx;
		this.on_apply_tabindex();
	};

	_pTabComponent.on_apply_tabindex = function () {
		var is_apply_focus = false;

		var form = this._getForm();
		if (form._getTabOrderFirst() instanceof nexacro.Tab && this.parent._last_focused && this.parent._last_focused.name == this.name) {
			is_apply_focus = true;
		}

		var ret = this._changeTabIndex(this._setidx, is_apply_focus);
		if (ret && this.enableevent && this._is_created && this._oldtabindex > -1) {
			this.on_fire_onchanged(this, this._setidx, this._oldtabindex);
		}
	};

	_pTabComponent.set_tabjustify = function (v) {
		v = nexacro._toBoolean(v);

		if (this.tabjustify != v) {
			this.tabjustify = v;
		}
		else {
			return;
		}

		this.on_apply_tabjustify();
	};

	_pTabComponent.on_apply_tabjustify = function () {
		this._recalcLayout();
	};

	_pTabComponent.set_tabposition = function (v) {
		this.tabposition = v.toString();

		var child_list = this._child_list;
		var tabpagecnt = child_list.length;

		for (var i = 0; i < tabpagecnt; i++) {
			var pagecontrol = child_list[i];
			if (pagecontrol != null) {
				pagecontrol._adjust_width = 0;
				pagecontrol._adjust_height = 0;
			}
		}

		this.on_apply_tabposition();
	};

	_pTabComponent.on_apply_tabposition = function () {
		this._recalcLayout();
	};

	_pTabComponent.set_selectchangetype = function (v) {
		this.selectchangetype = v;
	};

	nexacro._is_enable_setting = false;
	_pTabComponent.set_enable = function (v) {
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

			var enable_flag = (this.parent._real_enable && v);
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
	};

	_pTabComponent.on_notify_spinup_onclick = function (obj, e) {
		this._spinup();
	};

	_pTabComponent.on_notify_spindown_onclick = function (obj, e) {
		this._spindown();
	};

	_pTabComponent.on_fire_onextrabuttonclick = function (obj, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onextrabuttonclick && this.onextrabuttonclick._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onextrabuttonclick", index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this, this);
			return this.onextrabuttonclick._fireEvent(this, evt);
		}
		return true;
	};

	_pTabComponent.getOwnerFrame = function () {
		return this.parent.getOwnerFrame();
	};

	_pTabComponent._created = function () {
		this._recalcLayout();
	};

	_pTabComponent._createSubComp = function () {
		this.spindownbutton = new nexacro.ButtonCtrl("spindownbutton", this.position, 0, 0, 0, 0, null, null, this);

		this.spinupbutton = new nexacro.ButtonCtrl("spinupbutton", this.position, 0, 0, 0, 0, null, null, this);

		this.spinupbutton.createComponent();
		this.spindownbutton.createComponent();

		this.spinupbutton.set_visible(false);
		this.spindownbutton.set_visible(false);

		this.spinupbutton._setEventHandler("onclick", this.on_notify_spinup_onclick, this);
		this.spindownbutton._setEventHandler("onclick", this.on_notify_spindown_onclick, this);

		this._createTabBorder();
	};

	_pTabComponent._getTabPosition = function () {
		return this.tabposition.toString();
	};

	_pTabComponent._isMultiLine = function () {
		return this.multiline;
	};

	_pTabComponent._isTabButtonJustify = function () {
		return this.tabjustify;
	};

	_pTabComponent._isRotateText = function () {
		return this.rotatetext;
	};

	_pTabComponent._isUseCtrlKey = function () {
		return this.usecontrolkey;
	};

	_pTabComponent._isExtraButton = function () {
		return nexacro._toBoolean(this.currentstyle.showextrabutton ? this.currentstyle.showextrabutton._value : "false");
	};

	_pTabComponent._ptInRect = function (rc, nx, ny) {
		if (rc.left <= nx && rc.right >= nx && rc.top <= ny && rc.bottom >= ny) {
			return true;
		}
		return false;
	};

	_pTabComponent._GetTabIndex = function (nx, ny) {
		var compMousePoint = [];
		var scrMousePoint = [];

		compMousePoint[0] = nx;
		compMousePoint[1] = ny;

		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0) {
			return;
		}

		var index, tabindex = -1;

		var bmleft = 0, bmright = 0;
		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);
		if (buttonmargin) {
			bmleft = buttonmargin.left;
			bmright = buttonmargin.right;
		}

		var prop_width = this._client_width;
		var prop_height = this._client_height;

		var tabs_width = prop_width - (Math.ceil(this._getToolBarSize()) | 0);
		var tabs_height = prop_height - (Math.ceil(this._getToolBarSize()) | 0);

		if (!this._isTabButtonJustify() && !this._isMultiLine() && this._isSpinButtonVisible()) {
			var spinsize = null;
			spinsize = this._getSpinSize();

			tabs_width -= 2 * spinsize[0] + 2;
			tabs_height -= 2 * spinsize[1] + 2;
		}

		switch (this._getTabPosition()) {
			case "top":
			case "bottom":
				if (this._scrollIndex == -1) {
					scrMousePoint = compMousePoint;
				}
				else {
					scrMousePoint[0] = compMousePoint[0] + this._buttonRect[this._scrollIndex].left - bmleft;
					scrMousePoint[1] = compMousePoint[1];
				}

				for (index = 0; index < tabpagecnt; index++) {
					if (this._ptInRect(this._buttonRect[index], scrMousePoint[0], scrMousePoint[1])) {
						if (this._isMultiLine()) {
							tabindex = index;
						}
						else if (this._scrollIndex != -1) {
							if ((this._buttonRect[index].right - this._buttonRect[index].left) <= tabs_width) {
								tabindex = index;
							}
						}
						else {
							if (this._buttonRect[index].right <= prop_width) {
								tabindex = index;
							}
						}

						break;
					}
				}
				break;
			case "left":
			case "right":
				if (this._scrollIndex == -1) {
					scrMousePoint = compMousePoint;
				}
				else {
					scrMousePoint[0] = compMousePoint[0];
					scrMousePoint[1] = compMousePoint[1] + this._buttonRect[this._scrollIndex].top;
				}

				for (index = 0; index < tabpagecnt; index++) {
					if (this._ptInRect(this._buttonRect[index], scrMousePoint[0], scrMousePoint[1])) {
						if (this._isMultiLine()) {
							tabindex = index;
						}
						else if (this._scrollIndex != -1) {
							if ((this._buttonRect[index].bottom - this._buttonRect[this._scrollIndex].top) <= tabs_height) {
								tabindex = index;
							}
						}
						else {
							if (this._buttonRect[index].bottom <= prop_height) {
								tabindex = index;
							}
						}
						break;
					}
				}
				break;
		}

		return tabindex;
	};

	_pTabComponent._rearrangeBorder = function () {
		if (this._buttonRect.length - 1 < this.tabindex) {
			return;
		}

		var upleftborder = this._tabBorders[0];
		var downrightborder = this._tabBorders[1];
		var middlecenterborder = this._tabBorders[2];

		if (!upleftborder) {
			return;
		}
		if (!downrightborder) {
			return;
		}

		upleftborder._control_pseudo = "";
		downrightborder._control_pseudo = "";
		middlecenterborder._control_pseudo = "";

		var begin = -1, end = -1;

		var tabButtons = this._tabButtons;
		for (var i = 0, len = tabButtons.length; i < len; i++) {
			if (tabButtons[i] && tabButtons[i].visible) {
				var tabbutton = tabButtons[i];
				tabbutton._setElementBorder(tabbutton.getElement(), tabbutton.currentstyle.border, tabbutton.currentstyle.bordertype);

				if (begin == -1) {
					begin = i;
					end = i;
					continue;
				}

				end = i;
			}
		}

		var tabpos = this._getTabPosition();
		var rc;
		var visible_flag = true;
		if (this.tabindex >= begin && this.tabindex <= end) {
			rc = this._buttonRect[this.tabindex];
		}
		else {
			rc = this._buttonRect[begin];
			visible_flag = false;
		}

		var type = "";

		var buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo);
		var buttonborder_w = 0;
		if (buttonborder) {
			buttonborder_w = buttonborder._top_width;
		}

		var borderwidth = 0;
		var border = this.on_find_CurrentStyle_border(this._pseudo);
		var b_left = 0, b_top = 0, b_right = 0, b_bottom = 0;
		if (border) {
			b_left = border._left_width || border._top_width;
			b_top = border._top_width;
			b_right = border._right_width || border._top_width;
			b_bottom = border._bottom_width || border._top_width;
		}

		switch (tabpos) {
			case "top":
				if (!visible_flag || rc.left < 0 || (rc.left + buttonborder_w - b_left) == 0) {
					upleftborder.set_visible(false);
				}
				else {
					upleftborder.set_visible(true);
				}

				upleftborder.move(0, rc.bottom, rc.left + buttonborder_w, b_top);

				if (rc.left < 0 || !visible_flag) {
					downrightborder.move(0, rc.bottom, this._adjust_width - b_right, b_top);
				}
				else {
					downrightborder.move(rc.right - buttonborder_w, rc.bottom, this._adjust_width - rc.right, b_top);
				}

				if (!visible_flag) {
					middlecenterborder.set_visible(false);
				}
				else {
					middlecenterborder.set_visible(true);
				}

				middlecenterborder.move((rc.left + buttonborder_w), rc.bottom, ((rc.right - buttonborder_w) - (rc.left + buttonborder_w)), b_top);

				break;
			case "bottom":
				if (!visible_flag || rc.left < 0 || (rc.left + buttonborder_w - b_left == 0)) {
					upleftborder.set_visible(false);
				}
				else {
					upleftborder.set_visible(true);
				}

				upleftborder.move(b_left, rc.top - buttonborder_w, rc.left + buttonborder_w - b_left, b_bottom);

				if (rc.left < 0 || !visible_flag) {
					downrightborder.move(b_left, rc.top - buttonborder_w, this._adjust_width - b_left - b_right, b_bottom);
				}
				else {
					downrightborder.move(rc.right - buttonborder_w, rc.top - buttonborder_w, this._adjust_width - rc.right, b_bottom);
				}

				if (!visible_flag) {
					middlecenterborder.set_visible(false);
				}
				else {
					middlecenterborder.set_visible(true);
				}

				middlecenterborder.move((rc.left + buttonborder_w), (rc.top - buttonborder_w), ((rc.right - buttonborder_w) - (rc.left + buttonborder_w)), b_bottom);

				break;
			case "left":
				if (!visible_flag || rc.top < 0) {
					upleftborder.set_visible(false);
				}
				else {
					upleftborder.set_visible(true);
				}

				upleftborder.move(rc.right, b_top, b_right, rc.top + buttonborder_w - b_top);

				if (rc.top < 0 || !visible_flag) {
					downrightborder.move(rc.right, b_top, b_right, this._adjust_height - b_top - b_bottom);
				}
				else {
					downrightborder.move(rc.right, rc.bottom - buttonborder_w, b_right, this._adjust_height - rc.bottom + buttonborder_w - b_bottom);
				}

				if (!visible_flag) {
					middlecenterborder.set_visible(false);
				}
				else {
					middlecenterborder.set_visible(true);
				}

				middlecenterborder.move(rc.right, (rc.top + buttonborder_w), b_right, ((rc.bottom - buttonborder_w) - (rc.top + buttonborder_w)));

				break;
			case "right":
				if (!visible_flag || rc.top < 0) {
					upleftborder.set_visible(false);
				}
				else {
					upleftborder.set_visible(true);
				}

				upleftborder.move(rc.left - b_right, b_top, b_right, rc.top + buttonborder_w - b_top);

				if (rc.top < 0 || !visible_flag) {
					downrightborder.move(rc.left - b_right, b_top, b_right, this._adjust_height - b_top - b_bottom);
				}
				else {
					downrightborder.move(rc.left - b_right, rc.bottom - buttonborder_w, b_right, this._adjust_height - rc.bottom + buttonborder_w - b_bottom);
				}

				if (!visible_flag) {
					middlecenterborder.set_visible(false);
				}
				else {
					middlecenterborder.set_visible(true);
				}

				middlecenterborder.move((rc.left - b_right), (rc.top + buttonborder_w), b_right, ((rc.bottom - buttonborder_w) - (rc.top + buttonborder_w)));

				break;
		}
	};

	_pTabComponent._rearrangeButton = function () {
		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0) {
			return;
		}

		if (this._buttonRect.length <= 0) {
			return;
		}

		switch (this._getTabPosition()) {
			case "top":
				this._rearrangeTopButton();
				break;
			case "bottom":
				this._rearrangeBottomButton();
				break;
			case "left":
				this._rearrangeLeftButton();
				break;
			case "right":
				this._rearrangeRightButton();
				break;
		}

		this._resetTabPage();
		if (this.enable == false) {
			if (this.spinupbutton) {
				this.spinupbutton.set_enable(false);
			}
			if (this.spindownbutton) {
				this.spindownbutton.set_enable(false);
			}
		}

		if (!this._bSpin) {
			this._scrollIndex = 0;
			if (this.spindownbutton) {
				this.spindownbutton.set_visible(false);
			}
			if (this.spinupbutton) {
				this.spinupbutton.set_visible(false);
			}
		}

		var border = this.on_find_CurrentStyle_border(this._pseudo);
		if (border && border._top_width != 0) {
			this._rearrangeBorder();
		}

		var buttonWidth = this._buttonWidth;
		var buttonRect = this._buttonRect;
		for (var i = 0; i < tabpagecnt; i++) {
			buttonWidth[i] = buttonRect[i].right - buttonRect[i].left;
		}
	};


	_pTabComponent._resetTabPage = function () {
		var child_list = this._child_list;
		var child_list_len = child_list ? child_list.length : 0;
		if (child_list_len <= 0 || this._tabButtons.length <= 0) {
			return;
		}

		for (var i = 0; i < child_list_len; i++) {
			var pagecontrol = child_list[i];
			var btncontrol = this._tabButtons[i];
			if (pagecontrol != null) {
				if (!btncontrol) {
					break;
				}


				if (this.enable) {
					if (pagecontrol.enable) {
						if (i == this.tabindex) {
							pagecontrol.set_visible(true);
							btncontrol._stat_change("select", "selected");
						}
						else {
							pagecontrol.set_visible(false);
							btncontrol._pseudo = "normal";
							btncontrol._status = "notselect";
							btncontrol._stat_change(btncontrol._pseudo, btncontrol._status);
						}
					}
					else {
						btncontrol._pseudo = "disable";
						btncontrol._status = "disabled";
						btncontrol._stat_change(btncontrol._pseudo, btncontrol._status);
					}
				}
				else {
					btncontrol._pseudo = "disable";
					btncontrol._status = "disabled";
					btncontrol._stat_change("disable", "disabled");
				}
			}
		}
	};


	_pTabComponent._getToolBarSize = function () {
		return 0;
	};

	_pTabComponent._rearrangeTopButton = function () {
		var pseudo = this._pseudo;
		var type = "", radiusX = 0, radiusY = 0;
		var rtTab = null;

		var padding = this.on_find_CurrentStyle_padding(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttonborder_w = buttonborder ? (buttonborder._left_width + buttonborder._right_width) : 0;
		var buttonpadding = this.on_find_CurrentStyle_buttonpadding("normal");
		var buttonpadding_w = buttonpadding ? (buttonpadding.left + buttonpadding.right) : 0;

		var bordertype = this.on_find_CurrentStyle_bordertype(pseudo);
		type = bordertype ? bordertype.type : "";
		if (bordertype != null && type == "round") {
			radiusX = bordertype.radiusx;
			radiusY = bordertype.radiusy;
		}

		var clientWidth = this._adjust_width;
		var clientHeight = this._adjust_height;
		var tabpagecnt = this._child_list.length;

		var total_width = 0;
		var maxWidth = clientWidth - (Math.ceil(this._getToolBarSize()) | 0) - radiusX;
		var maxHeight = 0;

		var bmleft = 0, bmright = 0, bmtop = 0, bmbottom = 0;
		var btnbuttonmargin = this.on_find_CurrentStyle_buttonmargin(pseudo);
		if (btnbuttonmargin) {
			bmleft = btnbuttonmargin.left;
			bmright = btnbuttonmargin.right;
			bmbottom = btnbuttonmargin.bottom;
			bmtop = btnbuttonmargin.top;
		}
		var rtButton = [], rtText;
		for (var i = 0; i < tabpagecnt; i++) {
			rtText = this._getButtonSize(i);
			rtButton[i] = rtText;
			maxHeight = ((rtText.bottom - rtText.top) > maxHeight) ? (rtText.bottom - rtText.top) : maxHeight;
		}

		maxHeight += buttonborder ? (buttonborder._top_width + buttonborder._bottom_width) : 0;

		var buttonRect = this._buttonRect;
		var isextrabutton = this._isExtraButton();
		for (var i = 0; i < tabpagecnt; i++) {
			rtText = rtButton[i];

			var button_rect = buttonRect[i];

			if (!button_rect) {
				break;
			}

			button_rect.left = total_width + bmleft;
			button_rect.bottom = maxHeight;
			button_rect.right = button_rect.left + (rtText.right - rtText.left) + buttonborder_w;
			button_rect.top = bmtop;

			if (isextrabutton) {
				button_rect.right += maxHeight;
			}
			total_width = button_rect.right + bmright;
		}


		if ((total_width - bmright) >= maxWidth) {
			if (this._isMultiLine()) {
				this._scrollIndex = -1;
				this._lastIndex = tabpagecnt - 1;
				var row_cnt = (total_width / maxWidth + 1) | 0;
				var avrSize = (Math.ceil(total_width / row_cnt) | 0);
				var count = 0;
				var fromtab = 0;
				var tilltab = 0;
				for (var i = 0; i < row_cnt; i++) {
					while (count < tabpagecnt) {
						var button_rect = buttonRect[count];
						if (!button_rect) {
							break;
						}

						if (button_rect.right > (total_width / row_cnt) * (i + 1) || count == tabpagecnt - 1) {
							if (count == tabpagecnt - 1) {
								tilltab = count;
							}
							else if (((total_width / row_cnt) * (i + 1) - button_rect.left) < (button_rect.right - (total_width / row_cnt)
								 * (i + 1))) {
								tilltab = Math.ceil(count - 1) | 0;
							}
							else {
								tilltab = count;
							}

							if (tilltab < 0) {
								tilltab = 0;
							}

							var total_height = 0;
							var inc_width = 0;
							var line_width = buttonRect[tilltab].right - (buttonRect[fromtab] ? buttonRect[fromtab].left : 0);

							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.right = Math.ceil(inc_width + (button_rect.right - button_rect.left) * maxWidth / line_width) | 0;
								button_rect.left = inc_width;
								if (button_rect.bottom > total_height) {
									total_height = button_rect.bottom;
								}

								inc_width = button_rect.right;
							}


							buttonRect[tilltab].right = maxWidth - 1;

							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.bottom = total_height;
							}

							for (var j = tilltab + 1; j < tabpagecnt; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.bottom = (button_rect.bottom - button_rect.top) + total_height;
								button_rect.top = total_height;
							}

							fromtab = tilltab + 1;

							break;
						}
						count++;
					}
				}

				this._rollButtonUp();
				this._bSpin = false;
			}
			else {
				var spinsize = this._getSpinSize();

				var rcButton = {
					left : 0, 
					top : 0, 
					right : 0, 
					bottom : 0
				};
				rcButton.left = maxWidth - spinsize[0] * 2 - 2;

				var scrollidx = this._scrollIndex;

				if (this._scrollIndex < 0 || this._scrollIndex >= this._child_list.length) {
					scrollidx = this._child_list.length - 1;
				}

				var buttonRect_scroll = buttonRect[scrollidx];
				if (!buttonRect_scroll) {
					return;
				}

				rcButton.top = buttonRect_scroll.bottom - spinsize[1] - 2;
				rcButton.right = maxWidth - spinsize[0] - 2;
				rcButton.bottom = buttonRect_scroll.bottom - 2;

				if (this.spinupbutton) {
					this.spinupbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
					this.spinupbutton.set_visible(true);

					if (this._scrollIndex <= 0) {
						this.spinupbutton.set_enable(false);
					}
					else {
						this.spinupbutton.set_enable(true);
					}
				}

				rcButton.left = maxWidth - spinsize[0];
				rcButton.top = buttonRect[scrollidx].bottom - spinsize[1] - 2;
				rcButton.right = maxWidth;
				rcButton.bottom = buttonRect[scrollidx].bottom - 2;

				if (this.spindownbutton) {
					var spinpos = this.spindownbutton.position;

					if (spinpos.left != rcButton.left || spinpos.right != rcButton.right || spinpos.top != rcButton.top || spinpos.bottom != rcButton.bottom) {
						this.spindownbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
					}

					this.spindownbutton.set_visible(true);

					if (this._scrollIndex == tabpagecnt - 1) {
						this.spindownbutton.set_enable(false);
					}
					else {
						this.spindownbutton.set_enable(true);
					}
				}
				this._bSpin = true;
			}
		}
		else {
			this._lastIndex = tabpagecnt - 1;
			if (this._isTabButtonJustify()) {
				var total_buttonWidth = 0;
				var buttonWidth = this._buttonWidth;
				var buttonWidth_len = buttonWidth ? buttonWidth.length : 0;
				for (var i = 0; i < buttonWidth_len; i++) {
					total_buttonWidth += buttonWidth[i];
				}

				var inc_width = 0;
				for (var i = 0; i < tabpagecnt; i++) {
					var button_rect = buttonRect[i];
					if (!button_rect) {
						break;
					}

					button_rect.left = inc_width;
					inc_width = button_rect.right = button_rect.left + (Math.floor(maxWidth * (this._buttonWidth[i] / total_buttonWidth)) | 0);
				}

				if (buttonRect && buttonRect.length >= tabpagecnt) {
					buttonRect[tabpagecnt - 1].right = maxWidth - 1;
				}
			}
			this._bSpin = false;
		}

		var iMaxBottom = 0;
		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			if (iMaxBottom < button_rect.bottom) {
				iMaxBottom = button_rect.bottom;
			}
		}

		var pagerect = {
			left : 0, 
			top : iMaxBottom, 
			right : clientWidth, 
			bottom : clientHeight
		};
		var btnrect = null;

		var border = this.on_find_CurrentStyle_border(pseudo);
		var b_left = 0, b_top = 0, b_right = 0, b_bottom = 0;

		if (border) {
			b_left = border._left_width || border._top_width;
			b_top = border._top_width;
			b_right = border._right_width || border._top_width;
			b_bottom = border._bottom_width || border._top_width;
		}

		pagerect = this._getTabpageClientRectBorder(pagerect, border, bordertype, padding, "top");

		if (this._tabpagearea) {
			var pageborder = this._tabpagearea.on_find_CurrentStyle_border(this._pseudo);
			this._tabpagearea.on_apply_style_border(pageborder);
			this._tabpagearea.move(pagerect.left, pagerect.top, pagerect.right - pagerect.left, pagerect.bottom - pagerect.top);
		}

		var margin = this._child_list[0].on_find_CurrentStyle_margin(pseudo);
		var m_l = 0, m_t = 0, m_r = 0, m_b = 0;
		if (margin) {
			m_l = margin.left;
			m_t = margin.top;
			m_r = margin.right;
			m_b = margin.bottom;
		}

		var page_l = pagerect.left + b_left + m_l;
		var page_t = pagerect.top + b_top + m_t;
		var page_w = pagerect.right - b_right - pagerect.left - b_left - m_r - m_l;
		var page_h = pagerect.bottom - pagerect.top - b_bottom - b_top - m_b - m_t;
		var child_list = this._child_list;
		for (var i = 0; i < tabpagecnt; i++) {
			var pagecontrol = child_list[i];
			if (pagecontrol != null) {
				var page_ad_w = pagecontrol._adjust_width;
				var page_ad_h = pagecontrol._adjust_height;

				if (pagecontrol._adjust_left != page_l || pagecontrol._adjust_top != page_t || pagecontrol._getPosRight() != page_w || pagecontrol._getPosBottom() != page_h) {
					pagecontrol.move(page_l, page_t, page_w, page_h);
				}
				else {
					pagecontrol.move(page_l, page_t, page_ad_w, page_ad_h);
				}
			}
		}
	};

	_pTabComponent._drawButton = function () {
		if (this._buttonRect.length <= 0) {
			return;
		}

		switch (this._getTabPosition()) {
			case "top":
			case "bottom":
				this._drawClientTopBottom();
				break;
			case "left":
			case "right":
				this._drawClientLeftRight();
				break;
		}
	};
	_pTabComponent._drawClientTopBottom = function () {
		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0) {
			return;
		}

		var clientWidth = this._adjust_width;
		var clientHeight = this._adjust_height;

		if (clientWidth <= 0 || clientHeight <= 0) {
			return;
		}

		if (this._scrollIndex < 0) {
			this._scrollIndex = 0;
		}

		if (this._scrollIndex >= this._child_list.length) {
			this._scrollIndex = this._child_list.length - 1;
		}

		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);
		var bmleft = 0, bmright = 0, bmbottom = 0, bmtop = 0;
		if (buttonmargin != null || buttonmargin != undefined) {
			bmleft = buttonmargin.left;
			bmright = buttonmargin.right;
			bmtop = buttonmargin.top;
			bmbottom = buttonmargin.bottom;
		}

		var lPassing = this._buttonRect[this._scrollIndex].left - bmleft;

		var buttonRect = this._buttonRect;
		var len = buttonRect.length;
		for (var i = 0; i < len; i++) {
			if (this._scrollIndex != -1) {
				buttonRect[i].left -= lPassing;
				buttonRect[i].right -= lPassing;
			}
		}


		if (this._isMultiLine() || !this._bSpin) {
			for (var i = 0; i < tabpagecnt; i++) {
				this._drawTabButton(i);
			}
		}
		else {
			var border = this.on_find_CurrentStyle_border(this._pseudo);
			var bmborderleft = 0;

			if (border) {
				bmborderleft = border._left_width || border._top_width;
			}

			var spinsize = this._getSpinSize();
			var tabs_width = clientWidth - (Math.ceil(this._getToolBarSize()) | 0) - (spinsize[0] * 2) - 2;
			var start = 0, end = 0;
			this._lastIndex = start = this._scrollIndex;

			for (var i = tabpagecnt - 1; i >= start; i--) {
				if (!buttonRect[i]) {
					break;
				}

				if ((buttonRect[i].right - buttonRect[this._scrollIndex].left + bmborderleft) <= tabs_width) {
					this._lastIndex = end = i;
					break;
				}
				else if (i == this._scrollIndex) {
					this._lastIndex = end = i;
					break;
				}
			}

			var tabButtons = this._tabButtons;
			var tabextrabutton = this._tabextrabuttons;

			var isextrabutton = this._isExtraButton();

			for (var i = 0; i < start; i++) {
				tabButtons[i].set_visible(false);
				if (isextrabutton && tabextrabutton[i]) {
					tabextrabutton[i].set_visible(false);
				}
			}

			for (var i = len - 1; i > end; i--) {
				tabButtons[i].set_visible(false);
				if (isextrabutton && tabextrabutton[i]) {
					tabextrabutton[i].set_visible(false);
				}
			}

			for (var i = end; i >= start; i--) {
				tabButtons[i].set_visible(true);
				if (isextrabutton && tabextrabutton[i]) {
					tabextrabutton[i].set_visible(true);
				}
				this._drawTabButton(i);
			}

			this._rearrangeBorder();

			if (end == tabpagecnt - 1 && this.spindownbutton.enable) {
				this.spindownbutton.set_enable(false);
			}

			if (start == 0 && this.spinupbutton.enable) {
				this.spinupbutton.set_enable(false);
			}
			else if (start != 0 && !this.spinupbutton.enable) {
				this.spinupbutton.set_enable(true);
			}
		}
	};

	_pTabComponent._drawClientLeftRight = function () {
		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0) {
			return;
		}

		var clientHeight = this._adjust_height;
		if (clientHeight <= 0) {
			return;
		}

		if (this._scrollIndex < 0) {
			this._scrollIndex = 0;
		}

		var buttonRect = this._buttonRect;
		var lPassing = buttonRect[this._scrollIndex].top;

		var len = buttonRect.length;
		for (var i = 0; i < len; i++) {
			if (this._scrollIndex != -1) {
				buttonRect[i].top -= lPassing;
				buttonRect[i].bottom -= lPassing;
			}
		}


		if (this._isMultiLine() || !this._bSpin) {
			for (var i = tabpagecnt - 1; i >= 0; i--) {
				if (i != this.tabindex) {
					this._drawTabButton(i);
				}
			}
			this._drawTabButton(this.tabindex);
		}
		else {
			var border = this.on_find_CurrentStyle_border(this._pseudo);
			var bmtop = 0;

			if (border) {
				bmtop = border._top_width;
			}

			var spinsize = this._getSpinSize();
			var tabs_height = clientHeight - (Math.ceil(this._getToolBarSize()) | 0) - (spinsize[1] * 2) - 2;

			var start = 0, end = 0;
			this._lastIndex = start = this._scrollIndex;

			for (var i = tabpagecnt - 1; i >= start; i--) {
				if ((buttonRect[i].bottom - buttonRect[this._scrollIndex].top + bmtop) <= tabs_height) {
					this._lastIndex = end = i;
					break;
				}
			}

			var tabButtons = this._tabButtons;
			var tabextrabutton = this._tabextrabuttons;
			var isextrabutton = this._isExtraButton();
			for (var i = 0; i < len; i++) {
				tabButtons[i].set_visible(false);
				if (isextrabutton) {
					tabextrabuttons[i].set_visible(false);
				}
			}

			for (var i = end; i >= start; i--) {
				this._drawTabButton(i);
				tabButtons[i].set_visible(true);
				if (isextrabutton) {
					tabextrabuttons[i].set_visible(true);
				}
			}



			this._rearrangeBorder();

			if (end == tabpagecnt - 1 && this.spindownbutton.enable) {
				this.spindownbutton.set_enable(false);
			}

			if (start == 0 && this.spinupbutton.enable) {
				this.spinupbutton.set_enable(false);
			}
			else if (start != 0 && !this.spinupbutton.enable) {
				this.spinupbutton.set_enable(true);
			}
		}
	};

	_pTabComponent._drawTabButton = function (index) {
		var button_rect = this._buttonRect[index];
		if (!button_rect) {
			return;
		}

		if (button_rect.bottom > 0) {
			if (index < 0 || index >= this._child_list.length) {
				return;
			}
			var btnrect = null;
			var tabbutton = this._tabButtons[index];
			if (tabbutton != null) {
				btnrect = this._getExtraButtonArea(button_rect);
				var isextrabutton = this._isExtraButton();
				if (isextrabutton) {
					this._drawExtraButton(btnrect, index, true);
				}

				var align = nexacro._getCachedAlignObj("center middle");
				tabbutton.on_apply_style_align(align);

				if (tabbutton.left != button_rect.left || tabbutton.top != button_rect.top
					 || tabbutton.right != button_rect.right || tabbutton.bottom != button_rect.bottom) {
					tabbutton.move(button_rect.left, button_rect.top, button_rect.right - button_rect.left, button_rect.bottom - button_rect.top);
				}

				if (isextrabutton) {
					var extrabutton_w = this._tabextrabuttons ? (this._tabextrabuttons[index] ? this._tabextrabuttons[index].width : 20) : 20;
					var right = Math.ceil(button_rect.right - extrabutton_w) | 0;
					var control = tabbutton._text_elem;
					if (control) {
						if (control) {
							var buttonpadding = this.on_find_CurrentStyle_buttonpadding(tabbutton._pseudo);
							var p_w = buttonpadding ? (buttonpadding.left + buttonpadding.right) : 0;
							var p_h = buttonpadding ? (buttonpadding.top + buttonpadding.bottom) : 0;
							control.setElementSize(right - button_rect.left - p_w, control.height);
						}
					}
				}
				if (!tabbutton.visible) {
					tabbutton.set_visible(true);
				}
			}
		}
	};

	_pTabComponent._drawExtraButton = function (rect, idx, showflag) {
		if (this._tabextrabuttons[idx]) {
			var width = rect.right - rect.left;
			var height = rect.bottom - rect.top;

			var img_width = 12;
			var img_height = 12;

			var img_y = Math.ceil(img_height / 2) | 0;
			var half_height = Math.ceil(height / 2) | 0;

			if (width <= 0 || height <= 0) {
				return;
			}

			var extrabutton = this._tabextrabuttons[idx];
			extrabutton.set_visible(showflag);
			if (showflag) {
				extrabutton.move(rect.left, rect.top + half_height - img_y, rect.right - rect.left, img_y * 2);
			}
		}
	};

	_pTabComponent._getClientRectPadding = function (rect, buttonpaddingvalue) {
		var rc = rect;
		switch (this._getTabPosition()) {
			case "top":
			case "bottom":
				rc.right += buttonpaddingvalue.left + buttonpaddingvalue.right;
				rc.bottom += buttonpaddingvalue.top + buttonpaddingvalue.bottom;
				break;
			case "right":
			case "left":
				rc.right += buttonpaddingvalue.left + buttonpaddingvalue.right;
				rc.bottom += buttonpaddingvalue.top + buttonpaddingvalue.bottom;
				break;
		}
		return rc;
	};

	_pTabComponent._getExtraButtonArea = function (rect) {
		var btnrect = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0
		};
		var nAreaWidth = rect.right - rect.left;
		var nAreaHeight = rect.bottom - rect.top;

		var margin = this.on_find_CurrentStyle_margin(this._pseudo);

		var nLeftMargin = 0, nRightMargin = 0, nTopMargin = 0, nBottomMargin = 0;
		if (margin) {
			nLeftMargin = margin.left;
			nRightMargin = margin.right;
			nTopMargin = margin.top;
			nBottomMargin = margin.bottom;
		}

		switch (this._getTabPosition()) {
			case "top":
			case "bottom":
				btnrect.top = rect.top + nTopMargin;
				btnrect.bottom = rect.bottom - nBottomMargin;
				btnrect.left = rect.right - nAreaHeight + nLeftMargin;
				btnrect.right = rect.right - nRightMargin;
				break;
			case "left":
				if (this._isRotateText()) {
					btnrect.left = rect.left + nLeftMargin;
					btnrect.right = rect.right - nRightMargin;
					btnrect.top = rect.top + nTopMargin;
					btnrect.bottom = rect.top + nAreaWidth - nBottomMargin;
				}
				else {
					btnrect.top = rect.top + nTopMargin;
					btnrect.bottom = rect.bottom - nBottomMargin;
					btnrect.left = rect.right - nAreaHeight + nLeftMargin;
					btnrect.right = rect.right - nRightMargin;
				}
				break;
			case "right":
				if (this._isRotateText()) {
					btnrect.left = rect.left + nLeftMargin;
					btnrect.right = rect.right - nRightMargin;
					btnrect.bottom = rect.bottom - nBottomMargin;
					btnrect.top = rect.bottom - nAreaWidth + nTopMargin;
				}
				else {
					btnrect.top = rect.top + nTopMargin;
					btnrect.bottom = rect.bottom - nBottomMargin;
					btnrect.left = rect.right - nAreaHeight + nLeftMargin;
					btnrect.right = rect.right - nRightMargin;
				}
				break;
		}
		return btnrect;
	};

	_pTabComponent._rearrangeBottomButton = function () {
		var pseudo = this._pseudo;
		var border = this.on_find_CurrentStyle_border(pseudo);
		var bordertype = this.on_find_CurrentStyle_bordertype(pseudo);
		var padding = this.on_find_CurrentStyle_padding(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttonborder_w = buttonborder ? buttonborder._top_width : 0;
		var buttonpadding = this.on_find_CurrentStyle_buttonpadding("normal");
		var buttonpadding_w = buttonpadding ? (buttonpadding.left + buttonpadding.right) : 0;

		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(pseudo);

		var bmtop = 0, bmright = 0, bmbottom = 0, bmleft = 0;
		if (buttonmargin) {
			bmleft = buttonmargin.left;
			bmtop = buttonmargin.top;
			bmright = buttonmargin.right;
			bmbottom = buttonmargin.bottom;
		}

		var borderwidth = 0;

		var b_left = 0, b_top = 0, b_right = 0, b_bottom = 0;
		if (border) {
			b_left = border._left_width || border._top_width;
			b_top = border._top_width;
			b_right = border._right_width || border._top_width;
			b_bottom = border._bottom_width || border._top_width;
		}

		var radiusX = 0, radiusY = 0;
		if (this.bordertype && this.bordertype.type == "round") {
			radiusX = this.bordertype.radiusx;
			radiusY = this.bordertype.radiusy;
		}

		var clientWidth = this._adjust_width;
		var clientHeight = this._adjust_height;
		var tabpagecnt = this._child_list.length;

		var total_width = 0;
		var maxWidth = clientWidth - (Math.ceil(this._getToolBarSize()) | 0) - radiusX;
		var maxHeight = 0;
		var btnText = [];
		var rtText;

		for (var i = 0; i < tabpagecnt; i++) {
			rtText = this._getButtonSize(i);
			btnText[i] = rtText;
			maxHeight = ((rtText.bottom - rtText.top) > maxHeight) ? (rtText.bottom - rtText.top) : maxHeight;
		}


		var buttonRect = this._buttonRect;
		var isextrabutton = this._isExtraButton();
		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			rtText = btnText[i];

			button_rect.left = total_width + bmleft;
			button_rect.bottom = clientHeight - bmbottom;
			button_rect.right = button_rect.left + (rtText.right - rtText.left);
			button_rect.top = button_rect.bottom - maxHeight;

			if (isextrabutton) {
				button_rect.right += maxHeight;
			}

			total_width = button_rect.right + bmright;
		}

		if ((total_width - bmright) >= maxWidth) {
			if (this._isMultiLine()) {
				this._scrollIndex = -1;
				this._lastIndex = tabpagecnt - 1;
				var row_cnt = (total_width / maxWidth + 1) | 0;
				var avrSize = Math.ceil(total_width / row_cnt) | 0;
				var count = 0;
				var fromtab = 0;
				var tilltab = 0;
				for (var i = 0; i < row_cnt; i++) {
					while (count < tabpagecnt) {
						var button_rect = buttonRect[count];
						if (!button_rect) {
							break;
						}

						if (button_rect.right > Math.ceil(total_width / row_cnt) * (i + 1) || count == tabpagecnt - 1) {
							if (count == tabpagecnt - 1) {
								tilltab = count;
							}
							else if (((total_width / row_cnt) * (i + 1) - button_rect.left) < (button_rect.right - (total_width / row_cnt)
								 * (i + 1))) {
								tilltab = count - 1;
							}
							else {
								tilltab = count;
							}

							var total_height = clientHeight;
							var inc_width = 0;
							var line_width = buttonRect[tilltab].right - buttonRect[fromtab].left;

							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.right = Math.ceil(inc_width + (button_rect.right - button_rect.left) * maxWidth / line_width) | 0;
								button_rect.left = inc_width;
								if (button_rect.top < total_height) {
									total_height = button_rect.top;
								}

								inc_width = button_rect.right;
							}

							buttonRect[tilltab].right = maxWidth - 1;
							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.top = total_height;
							}

							for (var j = tilltab + 1; j < tabpagecnt; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.top = total_height - (button_rect.bottom - button_rect.top);
								button_rect.bottom = total_height;
							}

							fromtab = tilltab + 1;
							break;
						}
						count++;
					}
				}
				this._rollButtonUp();
				this._bSpin = false;
			}
			else {
				var spinsize;
				spinsize = this._getSpinSize();

				var tabs_width = clientWidth - (Math.ceil(this._getToolBarSize()) | 0) - (spinsize[0] * 2) - 2;

				var tabindex = this.tabindex;

				var scrollidx = this._scrollIndex;

				if (this._scrollIndex < 0 || this._scrollIndex >= this._child_list.length) {
					scrollidx = this._child_list.length - 1;
				}

				var buttonRect_scroll = buttonRect[scrollidx];
				if (!buttonRect_scroll) {
					return;
				}

				var rcButton = {
					left : 0, 
					top : 0, 
					right : 0, 
					bottom : 0
				};

				rcButton.left = maxWidth - spinsize[0] * 2 - 2;
				rcButton.top = buttonRect_scroll.top + 2;
				rcButton.right = maxWidth - spinsize[0] - 2;
				rcButton.bottom = buttonRect_scroll.top + spinsize[1] + 2;

				this.spinupbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
				this.spinupbutton.set_visible(true);

				if (this._scrollIndex == 0) {
					this.spinupbutton.set_enable(false);
				}
				else {
					this.spinupbutton.set_enable(true);
				}

				rcButton.left = maxWidth - spinsize[0];
				rcButton.top = buttonRect[scrollidx].top + 2;
				rcButton.right = maxWidth;
				rcButton.bottom = buttonRect[scrollidx].top + spinsize[1] + 2;

				var spinpos = this.spindownbutton.position;

				if (spinpos.left != rcButton.left || spinpos.right != rcButton.right || spinpos.top != rcButton.top || spinpos.bottom != rcButton.bottom) {
					this.spindownbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
					this.spindownbutton.set_visible(true);

					if (this._scrollIndex == tabpagecnt - 1) {
						this.spindownbutton.set_enable(false);
					}
					else {
						this.spindownbutton.set_enable(true);
					}
				}

				this._bSpin = true;
			}
		}
		else {
			this._scrollIndex = -1;
			this._lastIndex = tabpagecnt - 1;
			if (this._isTabButtonJustify()) {
				var total_buttonWidth = 0;
				var buttonWidth = this._buttonWidth;
				var buttonWidth_len = buttonWidth ? buttonWidth.length : 0;
				for (var i = 0; i < buttonWidth_len; i++) {
					total_buttonWidth += buttonWidth[i];
				}

				var inc_width = 0;
				for (var i = 0; i < tabpagecnt; i++) {
					var button_rect = buttonRect[i];
					if (!button_rect) {
						break;
					}

					button_rect.left = inc_width + bmleft;
					inc_width = button_rect.right = button_rect.left + bmright + (Math.floor(maxWidth * (this._buttonWidth[i] / total_buttonWidth)) | 0);
				}

				if (buttonRect && buttonRect.length >= tabpagecnt) {
					buttonRect[tabpagecnt - 1].right = maxWidth - 1;
				}
			}

			this._bSpin = false;
		}

		var iMinTop = clientHeight;
		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			if (iMinTop > button_rect.top) {
				iMinTop = button_rect.top;
			}
		}

		var pagerect = {
			left : 0, 
			top : 0, 
			right : clientWidth, 
			bottom : iMinTop
		};
		var btnrect = null;
		pagerect = this._getTabpageClientRectBorder(pagerect, border, bordertype, padding, "bottom");

		if (this._tabpagearea) {
			var pageborder = this._tabpagearea.on_find_CurrentStyle_border(this._pseudo);
			this._tabpagearea.on_apply_style_border(pageborder);
			this._tabpagearea.move(pagerect.left, pagerect.top, pagerect.right - pagerect.left, pagerect.bottom - pagerect.top);
		}

		var margin = this._child_list[0].on_find_CurrentStyle_margin(pseudo);
		var m_l = 0, m_t = 0, m_r = 0, m_b = 0;
		if (margin) {
			m_l = margin.left;
			m_t = margin.top;
			m_r = margin.right;
			m_b = margin.bottom;
		}

		var page_l = pagerect.left + b_left + m_l;
		var page_t = pagerect.top + b_top + m_t;
		var page_w = pagerect.right - b_right - pagerect.left - b_left - m_r - m_l;
		var page_h = pagerect.bottom - pagerect.top - b_bottom - b_top - m_b - m_t;
		if (page_h < 0) {
			page_h = 0;
		}
		var child_list = this._child_list;
		for (var i = 0; i < tabpagecnt; i++) {
			var pagecontrol = child_list[i];
			if (pagecontrol != null) {
				pagecontrol.move(page_l, page_t, page_w, page_h);
			}
		}
	};

	_pTabComponent._getSpinSize = function () {
		var size = [];
		size[0] = 14;
		size[1] = 14;
		return size;
	};

	_pTabComponent._rearrangeLeftButton = function () {
		var type = "", radiusX = 0, radiusY = 0;

		var pseudo = this._pseudo;
		var border = this.on_find_CurrentStyle_border(pseudo);
		var bordertype = this.on_find_CurrentStyle_bordertype(pseudo);
		var padding = this.on_find_CurrentStyle_padding(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(pseudo);
		var buttonborder_w = buttonborder ? buttonborder._top_width : 0;
		var buttonpadding = this.on_find_CurrentStyle_buttonpadding("normal");
		var buttonpadding_w = buttonpadding ? (buttonpadding.left + buttonpadding.right) : 0;


		var bmtop = 0, bmright = 0, bmbottom = 0, bmleft = 0;
		if (buttonmargin) {
			bmleft = buttonmargin.left;
			bmtop = buttonmargin.top;
			bmright = buttonmargin.right;
			bmbottom = buttonmargin.bottom;
		}

		var radiusX = 0, radiusY = 0;
		if (this.bordertype != null && this.bordertype.type == "round") {
			radiusX = this.bordertype.radiusx;
			radiusY = this.bordertype.radiusy;
		}

		var clientWidth = this._adjust_width;
		var clientHeight = this._adjust_height;
		var tabpagecnt = this._child_list.length;

		var total_height = 0;
		var maxWidth = 0, maxHeight = clientHeight - (Math.ceil(this._getToolBarSize()) | 0) - radiusY;
		var btnWidth = 0;
		var textwidth, textheight;

		var btnText = [];
		var rtText = null;
		for (var i = 0; i < tabpagecnt; i++) {
			rtText = this._getButtonSize(i);
			btnText[i] = rtText;

			if (this._isRotateText()) {
				textwidth = rtText.right - rtText.left;
				textheight = rtText.bottom - rtText.top;
				rtText.left = rtText.right - textheight;
				rtText.bottom = rtText.top + textwidth;
			}

			maxWidth = ((rtText.right - rtText.left) > maxWidth) ? (rtText.right - rtText.left) : maxWidth;
		}

		var max_txt_width = 0, max_txt_height = 0;
		var buttonRect = this._buttonRect;
		var isextrabutton = this._isExtraButton();
		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			rtText = btnText[i];

			button_rect.left = bmleft;
			button_rect.top = total_height + bmtop;
			button_rect.bottom = button_rect.top + (rtText.bottom - rtText.top);
			button_rect.right = button_rect.left + maxWidth;

			if (isextrabutton) {
				if (this._isRotateText()) {
					if (max_txt_width < rtText.right - rtText.left) {
						max_txt_width = rtText.right - rtText.left;
						i = -1;
						continue;
					}

					button_rect.bottom += max_txt_width;
				}
				else {
					if (max_txt_height < rtText.bottom - rtText.top) {
						max_txt_height = rtText.bottom - rtText.top;
						i = -1;
						continue;
					}
					button_rect.right += max_txt_height;
				}
			}

			btnWidth = ((button_rect.right - button_rect.left) > btnWidth) ? (button_rect.right - button_rect.left) : btnWidth;

			total_height = button_rect.bottom + bmbottom;
		}

		if ((total_height - bmbottom) >= maxHeight) {
			if (this._isMultiLine()) {
				this._scrollIndex = -1;
				this._lastIndex = tabpagecnt - 1;
				var row_cnt = (total_height / maxHeight + 1) | 0;
				var avrSize = Math.ceil(total_height / row_cnt) | 0;
				var count = 0;
				var fromtab = 0;
				var tilltab = 0;

				for (var i = 0; i < row_cnt; i++) {
					while (count < tabpagecnt) {
						var button_rect = buttonRect[count];
						if (!button_rect) {
							break;
						}

						if (button_rect.bottom > Math.ceil(total_height / row_cnt) * (i + 1) || count == tabpagecnt - 1) {
							if (count == tabpagecnt - 1) {
								tilltab = count;
							}
							else if (((total_height / row_cnt) * (i + 1) - button_rect.top) < (button_rect.bottom - (total_height / row_cnt)
								 * (i + 1))) {
								tilltab = count - 1;
							}
							else {
								tilltab = count;
							}

							var total_width = 0;
							var inc_height = 0;
							var line_height = buttonRect[tilltab].bottom - buttonRect[fromtab].top;

							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.bottom = Math.ceil(inc_height + (button_rect.bottom - button_rect.top) * maxHeight / line_height) | 0;
								button_rect.top = inc_height;
								if (button_rect.right > total_width) {
									total_width = button_rect.right;
								}

								inc_height = button_rect.bottom;
							}

							buttonRect[tilltab].bottom = maxHeight - 1;
							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.right = total_width;
							}

							for (var j = tilltab + 1; j < tabpagecnt; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.right = (button_rect.right - button_rect.left) + total_width;
								button_rect.left = total_width;
							}

							fromtab = tilltab + 1;
							break;
						}
						count++;
					}
				}

				this._rollButtonUp();
				this._bSpin = false;
			}
			else {
				this._scrollIndex = 0;
				var spinsize = null;
				spinsize = this._getSpinSize();

				var tabs_height = clientHeight - (Math.ceil(this._getToolBarSize()) | 0) - (spinsize[1] * 2) - 2;
				for (var i = 0; i <= this.tabindex; i++) {
					var button_rect = buttonRect[i];
					if (!button_rect) {
						break;
					}

					if ((buttonRect[this.tabindex].bottom - button_rect.top + bmtop) < tabs_height) {
						this._scrollIndex = i;
						break;
					}
				}

				var rcButton = {
					left : 0, 
					top : 0, 
					right : 0, 
					bottom : 0
				};
				rcButton.left = buttonRect[this._scrollIndex].right - spinsize[0] - 2;
				rcButton.top = maxHeight - spinsize[1] * 2 - 2;
				rcButton.right = buttonRect[this._scrollIndex].right - 2;
				rcButton.bottom = maxHeight - spinsize[1] - 2;

				this.spinupbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
				this.spinupbutton.set_visible(true);

				if (this._scrollIndex == 0) {
					this.spinupbutton.set_enable(false);
				}
				else {
					this.spinupbutton.set_enable(true);
				}

				rcButton.left = buttonRect[this._scrollIndex].right - spinsize[0] - 2;
				rcButton.top = maxHeight - spinsize[1];
				rcButton.right = buttonRect[this._scrollIndex].right - 2;
				rcButton.bottom = maxHeight;

				var spindownbutton = this.spindownbutton;
				var s_right = spindownbutton._adjust_left + spindownbutton._adjust_width;
				var s_bottom = spindownbutton._adjust_top + spindownbutton._adjust_height;

				if (spindownbutton._adjust_left != rcButton.left || s_right != rcButton.right || 
					spindownbutton._adjust_top != rcButton.top || s_bottom != rcButton.bottom) {
					this.spindownbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
					this.spindownbutton.set_visible(true);

					if (this._scrollIndex == tabpagecnt - 1) {
						this.spindownbutton.set_enable(false);
					}
					else {
						this.spindownbutton.set_enable(true);
					}
				}

				this._bSpin = true;
			}
		}
		else {
			this._scrollIndex = -1;
			this._lastIndex = tabpagecnt - 1;
			if (this._isTabButtonJustify()) {
				var inc_height = 0;
				for (var i = 0; i < tabpagecnt; i++) {
					var button_rect = buttonRect[i];
					if (!button_rect) {
						break;
					}

					button_rect.top = inc_height;
					inc_height = button_rect.bottom = button_rect.bottom * maxHeight / total_height;
				}

				if (buttonRect && buttonRect.length >= tabpagecnt) {
					buttonRect[tabpagecnt - 1].bottom = maxHeight - 1;
				}
			}

			this._bSpin = false;
		}

		var iMaxRight = 0;
		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			if (iMaxRight < button_rect.right) {
				iMaxRight = button_rect.right;
			}
		}

		var b_left = 0, b_top = 0, b_right = 0, b_bottom = 0;
		if (border) {
			b_left = border._left_width || border._top_width;
			b_top = border._top_width;
			b_right = border._right_width || border._top_width;
			b_bottom = border._bottom_width || border._top_width;
		}

		var pagerect = {
			left : iMaxRight, 
			top : 0, 
			right : clientWidth, 
			bottom : clientHeight
		};
		pagerect = this._getTabpageClientRectBorder(pagerect, buttonborder, bordertype, padding, "left");

		if (this._tabpagearea) {
			var pageborder = this._tabpagearea.on_find_CurrentStyle_border(this._pseudo);
			this._tabpagearea.on_apply_style_border(pageborder);
			this._tabpagearea.move(pagerect.left, pagerect.top, pagerect.right - pagerect.left, pagerect.bottom - pagerect.top);
		}

		var margin = this._child_list[0].on_find_CurrentStyle_margin(pseudo);
		var m_l = 0, m_t = 0, m_r = 0, m_b = 0;
		if (margin) {
			m_l = margin.left;
			m_t = margin.top;
			m_r = margin.right;
			m_b = margin.bottom;
		}

		var page_l = pagerect.left + b_left + m_l;
		var page_t = pagerect.top + b_top + m_t;
		var page_w = pagerect.right - b_right - pagerect.left - b_left - m_r - m_l;
		var page_h = pagerect.bottom - pagerect.top - b_bottom - b_top - m_b - m_t;
		var child_list = this._child_list;
		for (var i = 0; i < tabpagecnt; i++) {
			var pagecontrol = child_list[i];
			if (pagecontrol != null) {
				var page_ad_w = pagecontrol._adjust_width;
				var page_ad_h = pagecontrol._adjust_height;

				if (pagecontrol._adjust_left != page_l || pagecontrol._adjust_top != page_t || pagecontrol._getPosRight() != page_w || pagecontrol._getPosBottom() != page_h) {
					pagecontrol.move(page_l, page_t, page_w, page_h);
				}
				else {
					pagecontrol.move(page_l, page_t, page_ad_w, page_ad_h);
				}
			}
		}
	};

	_pTabComponent._rearrangeRightButton = function () {
		var tabpagecnt = this._child_list.length;

		var pseudo = this._pseudo;
		var border = this.on_find_CurrentStyle_border(pseudo);
		var bordertype = this.on_find_CurrentStyle_bordertype(pseudo);
		var padding = this.on_find_CurrentStyle_padding(pseudo);
		var buttonborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(pseudo);

		var rtText = null;

		var bmtop = 0, bmright = 0, bmbottom = 0, bmleft = 0;

		if (buttonmargin != null) {
			bmleft = buttonmargin.left;
			bmtop = buttonmargin.top;
			bmright = buttonmargin.right;
			bmbottom = buttonmargin.bottom;
		}

		var radiusX = 0, radiusY = 0;
		if (bordertype != null && bordertype.type == "round") {
			radiusX = bordertype.radiusx;
			radiusY = bordertype.radiusy;
		}

		var borderwidth = 0;
		if (buttonborder) {
			borderwidth = buttonborder._top_width;
		}

		var b_left = 0, b_top = 0, b_right = 0, b_bottom = 0;
		if (border) {
			b_left = border._left_width || border._top_width;
			b_top = border._top_width;
			b_right = border._right_width || border._top_width;
			b_bottom = border._bottom_width || border._top_width;
		}


		var clientWidth = this._adjust_width;
		var clientHeight = this._adjust_height;

		var total_height = 0;
		var maxWidth = 0, maxHeight = clientHeight - (Math.ceil(this._getToolBarSize()) | 0) - radiusY;
		var btnWidth = 0;
		var textwidth, textheight;
		var btnRect = [];
		for (var i = 0; i < tabpagecnt; i++) {
			rtText = this._getButtonSize(i);
			btnRect[i] = rtText;
			if (this._isRotateText()) {
				textwidth = rtText.right - rtText.left;
				textheight = rtText.bottom - rtText.top;
				rtText.right = rtText.left + textheight;
				rtText.bottom = rtText.top + textwidth;
			}

			maxWidth = ((rtText.right - rtText.left) > maxWidth) ? (rtText.right - rtText.left)
				 : maxWidth;
		}

		var buttonRect = this._buttonRect;
		var isextrabutton = this._isExtraButton();
		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			rtText = btnRect[i];

			button_rect.right = clientWidth - bmright;
			button_rect.left = button_rect.right - (rtText.right - rtText.left);
			button_rect.top = total_height + bmtop;
			button_rect.bottom = button_rect.top + (rtText.bottom - rtText.top);

			if (isextrabutton) {
				if (this._isRotateText()) {
					button_rect.bottom += (rtText.right - rtText.left);
				}
				else {
					button_rect.left -= (rtText.bottom - rtText.top);
				}
			}

			btnWidth = ((button_rect.right - button_rect.left) > btnWidth) ? (button_rect.right - button_rect.left)
				 : btnWidth;

			total_height = button_rect.bottom + bmbottom;
		}

		for (var i = 0; i < tabpagecnt; i++) {
			var button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			button_rect.left = button_rect.right - btnWidth;
		}

		if ((total_height - bmbottom) >= maxHeight) {
			if (this._isMultiLine()) {
				this._scrollIndex = -1;
				this._lastIndex = tabpagecnt - 1;
				var row_cnt = (total_height / maxHeight + 1) | 0;
				var avrSize = Math.ceil(total_height / row_cnt) | 0;
				var count = 0;
				var fromtab = 0;
				var tilltab = 0;
				for (var i = 0; i < row_cnt; i++) {
					while (count < tabpagecnt) {
						var button_rect = buttonRect[count];
						if (!button_rect) {
							break;
						}

						if (button_rect.bottom > (total_height / row_cnt) * (i + 1) || count == tabpagecnt - 1) {
							if (count == tabpagecnt - 1) {
								tilltab = count;
							}
							else if (((total_height / row_cnt) * (i + 1) - button_rect.top) < (button_rect.bottom - (total_height / row_cnt) * (i + 1))) {
								tilltab = count - 1;
							}
							else {
								tilltab = count;
							}

							var total_width = clientWidth;
							var inc_height = 0;
							var line_height = buttonRect[tilltab].bottom - buttonRect[fromtab].top;

							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.bottom = Math.ceil(inc_height + (button_rect.bottom - button_rect.top) * maxHeight / line_height) | 0;
								button_rect.top = inc_height;
								if (button_rect.left < total_width) {
									total_width = button_rect.left;
								}

								inc_height = button_rect.bottom;
							}

							buttonRect[tilltab].bottom = maxHeight - 1;
							for (var j = fromtab; j <= tilltab; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.left = total_width;
							}

							for (var j = tilltab + 1; j < tabpagecnt; j++) {
								button_rect = buttonRect[j];
								if (!button_rect) {
									break;
								}

								button_rect.left = total_width - (button_rect.right - button_rect.left);
								button_rect.right = total_width;
							}

							fromtab = tilltab + 1;
							break;
						}
						count++;
					}
				}

				this._rollButtonUp();

				this._bSpin = false;
			}
			else {
				this._scrollIndex = 0;
				var spinsize = null;
				spinsize = this._getSpinSize();

				var tabs_height = clientHeight - (Math.ceil(this._getToolBarSize()) | 0) - (spinsize[1] * 2) - 2;
				for (var i = 0; i <= this.tabindex; i++) {
					var button_rect = buttonRect[i];
					if (!button_rect) {
						break;
					}

					if ((buttonRect[this.tabindex].bottom - button_rect.top + bmtop) < tabs_height) {
						this._scrollIndex = i;
						break;
					}
				}

				var rcButton = {
					left : 0, 
					top : 0, 
					right : 0, 
					bottom : 0
				};

				rcButton.left = buttonRect[this._scrollIndex].left + 2;
				rcButton.top = maxHeight - spinsize[1] * 2 - 2;
				rcButton.right = buttonRect[this._scrollIndex].left + spinsize[0] + 2;
				rcButton.bottom = maxHeight - spinsize[1] - 2;

				this.spinupbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
				this.spinupbutton.set_visible(true);

				if (this._scrollIndex == 0) {
					this.spinupbutton.set_enable(false);
				}
				else {
					this.spinupbutton.set_enable(true);
				}

				rcButton.left = buttonRect[this._scrollIndex].left + 2;
				rcButton.top = maxHeight - spinsize[1];
				rcButton.right = buttonRect[this._scrollIndex].left + spinsize[0] + 2;
				rcButton.bottom = maxHeight;

				var spindownbutton = this.spindownbutton;
				var s_right = spindownbutton._adjust_left + spindownbutton._adjust_width;
				var s_bottom = spindownbutton._adjust_top + spindownbutton._adjust_height;

				if (spindownbutton._adjust_left != rcButton.left || s_right != rcButton.right || 
					spindownbutton._adjust_top != rcButton.top || s_bottom != rcButton.bottom) {
					this.spindownbutton.move(rcButton.left, rcButton.top, rcButton.right - rcButton.left, rcButton.bottom - rcButton.top);
					this.spindownbutton.set_visible(true);

					if (this._scrollIndex == tabpagecnt - 1) {
						this.spindownbutton.set_enable(false);
					}
					else {
						this.spindownbutton.set_enable(true);
					}
				}

				this._bSpin = true;
			}
		}
		else {
			this._scrollIndex = -1;
			this._lastIndex = tabpagecnt - 1;
			if (this._isTabButtonJustify()) {
				var inc_height = 0;
				for (var i = 0; i < tabpagecnt; i++) {
					var button_rect = buttonRect[i];
					if (!button_rect) {
						break;
					}

					button_rect.top = inc_height;
					inc_height = button_rect.bottom = button_rect.bottom * maxHeight / total_height;
				}

				if (buttonRect && buttonRect.length >= tabpagecnt) {
					buttonRect[tabpagecnt - 1].bottom = maxHeight - 1;
				}
			}

			this._bSpin = false;
		}

		var iMinLeft = clientWidth;
		for (var i = 0; i < tabpagecnt; i++) {
			button_rect = buttonRect[i];
			if (!button_rect) {
				break;
			}

			if (iMinLeft > button_rect.left) {
				iMinLeft = button_rect.left;
			}
		}
		var borderwidth = 0;
		if (buttonborder) {
			borderwidth = buttonborder._top_width;
		}

		var b_left = 0, b_top = 0, b_right = 0, b_bottom = 0;
		if (border) {
			b_left = border._left_width || border._top_width;
			b_top = border._top_width;
			b_right = border._right_width || border._top_width;
			b_bottom = border._bottom_width || border._top_width;
		}

		var pagerect = {
			left : 0, 
			top : 0, 
			right : iMinLeft, 
			bottom : clientHeight
		};
		pagerect = this._getTabpageClientRectBorder(pagerect, buttonborder, bordertype, padding, "right");

		if (this._tabpagearea) {
			var pageborder = this._tabpagearea.on_find_CurrentStyle_border(this._pseudo);
			this._tabpagearea.on_apply_style_border(pageborder);
			this._tabpagearea.move(0, pagerect.top, pagerect.right, pagerect.bottom - pagerect.top);
		}

		var margin = this._child_list[0].on_find_CurrentStyle_margin(pseudo);
		var m_l = 0, m_t = 0, m_r = 0, m_b = 0;
		if (margin) {
			m_l = margin.left;
			m_t = margin.top;
			m_r = margin.right;
			m_b = margin.bottom;
		}

		var page_l = pagerect.left + b_left + m_l;
		var page_t = pagerect.top + b_top + m_t;
		var page_w = pagerect.right - b_right - pagerect.left - b_left - m_r - m_l;
		var page_h = pagerect.bottom - pagerect.top - b_bottom - b_top - m_b - m_t;
		var child_list = this._child_list;
		for (var i = 0; i < tabpagecnt; i++) {
			var pagecontrol = child_list[i];
			if (pagecontrol != null) {
				var page_ad_w = pagecontrol._adjust_width;
				var page_ad_h = pagecontrol._adjust_height;

				if (pagecontrol._adjust_left != page_l || pagecontrol._adjust_top != page_t || pagecontrol._getPosRight() != page_w || pagecontrol._getPosBottom() != page_h) {
					pagecontrol.move(page_l, page_t, page_w, page_h);
				}
				else {
					pagecontrol.move(page_l, page_t, page_ad_w, page_ad_h);
				}
			}
		}
	};

	_pTabComponent._getTabpageClientRectBorder = function (rcPage, border, bordertype, padding, tabpos) {
		if (padding != null) {
			rcPage.left += Math.ceil(padding.left) | 0;
			rcPage.top += Math.ceil(padding.top) | 0;
			rcPage.right -= Math.ceil(padding.right) | 0;
			rcPage.bottom -= Math.ceil(padding.bottom) | 0;
		}


		return rcPage;
	};

	_pTabComponent._setScrollIndex = function (scrollindex) {
		var childlist = this._child_list;
		if (scrollindex < 0 || scrollindex >= childlist.length) {
			return;
		}

		this._scrollIndex = scrollindex;

		if (this.spinupbutton != null && this.spindownbutton != null) {
			this.spinupbutton.set_enable(this._isSpinUpEnable());
			this.spindownbutton.set_enable(this._isSpinDownEnable());
		}
	};

	_pTabComponent._changeScrollIndex = function (tabindex) {
		this._resetScrollIndex(tabindex);

		if (this.spinupbutton != null && this.spindownbutton != null) {
			this.spinupbutton.set_enable(this._isSpinUpEnable());
			this.spindownbutton.set_enable(this._isSpinDownEnable());
		}
	};

	_pTabComponent._setScrollIndexByObj = function (tabpage) {
		var childlist = this._child_list;
		for (var scrollindex = 0; scrollindex < childlist.length; scrollindex++) {
			var page = childlist[scrollindex];
			if (page == tabpage) {
				if (scrollindex < this._scrollIndex || scrollindex > this._lastIndex) {
					this._scrollIndex = scrollindex;

					if (this.spinupbutton != null && this.spindownbutton != null) {
						this.spinupbutton.set_enable(this._isSpinUpEnable());
						this.spindownbutton.set_enable(this._isSpinDownEnable());
					}
				}
			}
		}
	};

	_pTabComponent._getButtonSize = function (index) {
		var pseudo = this._pseudo;
		var btnpadding = this.on_find_CurrentStyle_buttonpadding("normal");
		var btnborder = this.on_find_CurrentStyle_buttonborder(pseudo);
		var btnbackground = this.on_find_CurrentStyle_buttonbackground(pseudo);
		var btnmargin = this.on_find_CurrentStyle_buttonmargin(pseudo);
		var rc = {
			left : 0, 
			top : 0, 
			right : 0, 
			bottom : 0
		};

		var strTitle = this._child_list[index].text.toString();
		var font = this.on_find_CurrentStyle_font("normal");

		var bpleft = 0, bpright = 0, bptop = 0, bpbottom = 0;
		if (btnpadding) {
			bpleft = btnpadding.left;
			bpright = btnpadding.right;
			bptop = btnpadding.top;
			bpbottom = btnpadding.bottom;
		}

		var btnborderwidth = 0;
		if (btnborder) {
			btnborderwidth = btnborder._top_width;
		}

		if (font) {
			var multi = false;
			if (strTitle) {
				var ret = strTitle.search("\n");
			}
			multi = (ret == -1) ? false : true;
			var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);

			var size = nexacro._getTextSize2(letterspace, strTitle, font, multi);

			if (btnbackground && (btnbackground.repeat == "stretch" || btnbackground.repeat == "quad")) {
				var btn_height = (Math.ceil(size[1]) | 0) + bptop + bpbottom;
				if (this._imageheight == 0) {
					rc.right = (Math.ceil(size[0]) | 0) + bpleft + bpright;
					rc.bottom = btn_height;
				}
				else {
					rc.right = (Math.ceil(size[0]) | 0) + bpleft + bpright;
					if (btn_height < this._imageheight) {
						rc.bottom = this._imageheight;
					}
					else {
						rc.bottom = btn_height;
					}
				}
			}
			else {
				rc.right = (Math.ceil(size[0]) | 0) + bpleft + bpright + btnborderwidth * 2;
				rc.bottom = (Math.ceil(size[1]) | 0) + bptop + bpbottom;
			}
			return rc;
		}
	};

	_pTabComponent._rollButtonUp = function () {
		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0 || this.tabindex < 0) {
			return;
		}

		var rcRect;

		var prop_width = this._client_width;
		var prop_height = this._client_height;
		var first_index = -1;
		var idx = 0;

		var buttonRect = this._buttonRect;
		var tabPos = this._getTabPosition();
		if (tabPos == "top") {
			for (var i = 1; i < tabpagecnt; i++) {
				idx = (i + this.tabindex) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.bottom < buttonRect[this.tabindex].bottom) {
					return;
				}
				else if (button_rect.bottom > buttonRect[this.tabindex].bottom) {
					first_index = (i + this.tabindex) % tabpagecnt;
					break;
				}
			}

			if (first_index == -1) {
				return;
			}

			var linetop = buttonRect[first_index].top;
			var max_bottom = 0, bottom_value = 0;

			for (var i = 0; i < tabpagecnt; i++) {
				idx = (i + first_index) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.top != linetop) {
					bottom_value = max_bottom;
					linetop = button_rect.top;
					max_bottom = 0;
				}

				button_rect.bottom = bottom_value + (button_rect.bottom - button_rect.top);
				button_rect.top = bottom_value;
				if (button_rect.bottom > max_bottom) {
					max_bottom = button_rect.bottom;
				}
			}
		}
		else if (tabPos == "bottom") {
			for (var i = 1; i < tabpagecnt; i++) {
				idx = (i + this.tabindex) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.bottom > buttonRect[this.tabindex].bottom) {
					return;
				}
				else if (button_rect.bottom < buttonRect[this.tabindex].bottom) {
					first_index = (i + this.tabindex) % tabpagecnt;
					break;
				}
			}

			if (first_index == -1) {
				return;
			}

			var linebottom = buttonRect[first_index].bottom;
			var min_top = prop_height;
			var top_value = prop_height;
			for (var i = 0; i < tabpagecnt; i++) {
				idx = (i + first_index) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.bottom != linebottom) {
					top_value = min_top;
					linebottom = button_rect.bottom;
					min_top = prop_height;
				}
				button_rect.top = top_value - (button_rect.bottom - button_rect.top);
				button_rect.bottom = top_value;
				if (button_rect.top < min_top) {
					min_top = button_rect.top;
				}
			}
		}
		else if (tabPos == "left") {
			for (var i = 1; i < tabpagecnt; i++) {
				idx = (i + this.tabindex) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.right < buttonRect[this.tabindex].right) {
					return;
				}
				else if (button_rect.right > buttonRect[this.tabindex].right) {
					first_index = (i + this.tabindex) % tabpagecnt;
					break;
				}
			}

			if (first_index == -1) {
				return;
			}

			var lineleft = buttonRect[first_index].left;
			var max_right = 0;
			var right_value = 0;
			for (var i = 0; i < tabpagecnt; i++) {
				idx = (i + first_index) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.left != lineleft) {
					right_value = max_right;
					lineleft = button_rect.left;
					max_right = 0;
				}

				button_rect.right = right_value + (button_rect.right - button_rect.left);
				button_rect.left = right_value;
				if (button_rect.right > max_right) {
					max_right = button_rect.right;
				}
			}
		}
		else if (tabPos == "right") {
			for (var i = 1; i < tabpagecnt; i++) {
				idx = (i + this.tabindex) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.right > buttonRect[this.tabindex].right) {
					return;
				}
				else if (button_rect.right < buttonRect[this.tabindex].right) {
					first_index = (i + this.tabindex) % tabpagecnt;
					break;
				}
			}

			if (first_index == -1) {
				return;
			}

			var lineright = buttonRect[first_index].right;
			var min_left = prop_width;
			var left_value = prop_width;
			for (var i = 0; i < tabpagecnt; i++) {
				idx = (i + first_index) % tabpagecnt;
				var button_rect = buttonRect[idx];
				if (!button_rect) {
					break;
				}

				if (button_rect.right != lineright) {
					left_value = min_left;
					lineright = button_rect.right;
					min_left = prop_width;
				}

				button_rect.left = left_value - (button_rect.right - button_rect.left);
				button_rect.right = left_value;
				if (button_rect.left < min_left) {
					min_left = button_rect.left;
				}
			}
		}
	};

	_pTabComponent._set_child_focus = function () {
		var idx = this.tabindex;
		var child_list = this._child_list;
		if (child_list && child_list.length > 0) {
			var tabpage_child_list = child_list[idx]._getSortedDecendants(child_list[idx]);
			if (tabpage_child_list && tabpage_child_list.length > 0) {
				for (var i = 0; i < tabpage_child_list.length; i++) {
					if (tabpage_child_list[i] instanceof nexacro.Grid) {
						var row = tabpage_child_list[i]._selectinfo.curdsrow;
						if (row == -1) {
							row = 0;
						}
						tabpage_child_list[i]._selectRow(row, true);
					}
				}
				if (child_list[idx]._last_focused) {
					child_list[idx]._on_focus(true);
				}
				else {
					tabpage_child_list[0]._on_focus(true);
				}
			}
		}
	};

	_pTabComponent._changeTabIndex = function (index, is_apply_focus) {
		if (!this._is_created || this.tabindex == index || ((+index) != (+index)) || index < 0 || (this._child_list && index >= this._child_list.length)) {
			return;
		}

		var oldindex = this.tabindex;
		if (oldindex > -1 && this.enableevent) {
			var ret = this.on_fire_canchange(this, index, oldindex);
			if (ret == false) {
				this._tabButtons[index]._stat_change("notselect", "normal");

				this._tabButtons[oldindex]._setFocus(false);

				return false;
			}
		}

		var oldtabpage = oldindex > -1 ? this._child_list[oldindex] : undefined;
		var newtabpage = this._child_list[index];

		var oldtabtn = oldindex > -1 ? this._tabButtons[oldindex] : undefined;
		var newtabbtn = this._tabButtons[index];

		if (oldtabpage) {
			if (oldtabpage.enable) {
				oldtabtn._stat_change("notselect", "normal");
			}
			else {
				oldtabtn._stat_change("disable", "disabled");
			}
			oldtabpage.set_visible(false);

			oldtabtn._setAccessibilityStatSelected(false);
		}

		this._oldtabindex = oldindex;
		this.tabindex = index;

		if (this._isMultiLine()) {
			this._rollButtonUp();
		}

		if (newtabpage) {
			if (!newtabpage.visible) {
				newtabpage.set_visible(true);
			}

			if (!this.preload) {
				if (newtabpage._isLoaded == false) {
					if (newtabpage.url != "" && newtabpage.url != undefined) {
						newtabpage._url = newtabpage.url;
						newtabpage.on_apply_url(false);

						newtabpage._isLoaded = true;
					}
				}
				this._createTabpage(index, newtabpage.id, newtabpage);
			}

			newtabbtn._setAccessibilityStatSelected(true);

			if (is_apply_focus) {
				newtabbtn._on_focus(true);
			}


			if (newtabpage.enable) {
				newtabpage._stat_change(newtabpage._status, newtabpage._pseudo);
			}
			else {
				newtabpage._stat_change("disable", "disabled");
			}
		}
		else {
			if (oldtabpage) {
				if (oldtabtn.enable) {
					oldtabtn._stat_change("focus", "focused");
				}
				else {
					oldtabtn._stat_change("disable", "disabled");
				}
				oldtabpage.set_visible(true);
			}
		}

		var spinsize = this._getSpinSize();
		var spincnt = this._isSpinButtonVisible() ? 2 : 0;

		var clientWidth = this._client_width - spinsize[0] * spincnt;
		var tabs_width = clientWidth - (Math.ceil(this._getToolBarSize()) | 0) - (spinsize[0] * spincnt) - 2;


		if (this._tabButtons.length - 1 == index && this.spindownbutton.enable == true) {
			this.spindownbutton.set_enable(false);
			this.spinupbutton.set_enable(true);
		}
		else if (index == 0 && this.spinupbutton.enable == true) {
			this.spinupbutton.set_enable(false);
			this.spindownbutton.set_enable(true);
		}
		else {
			if (!this.spinupbutton.enable) {
				this.spinupbutton.set_enable(true);
			}
			if (!this.spindownbutton.enable) {
				this.spindownbutton.set_enable(true);
			}
		}

		if (index < this._scrollIndex || (this._lastIndex != -1 && index > this._lastIndex)) {
			var margin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);
			var button_margin = margin.left + margin.right;

			var total_width = 0;
			this._scrollIndex = 0;
			var buttonRect = this._buttonRect;
			for (var i = index; i >= 0; i--) {
				var button_rect = buttonRect[i];
				total_width += (Math.ceil(button_rect.right - button_rect.left) | 0) + button_margin;
				if (total_width > clientWidth) {
					this._scrollIndex = i + 1;
					this._lastIndex = index;
					break;
				}
			}
		}

		this._rearrangeButton();
		this._drawButton();
		this._rearrangeBorder();

		var lastfocus = this._find_lastFocused();
		if (lastfocus == this) {
			if (this._isBtnFocusAcceptable() && this._focusobj instanceof nexacro.TabButtonCtrl) {
				this._focusobj._setFocus(false);
			}
			else {
				this._set_child_focus();
			}
		}
		if (nexacro._accessibilitywholereadtype > 1) {
			newtabpage._playAccessibilityWholeReadLabel("wholeread");
		}

		return true;
	};

	_pTabComponent._resetLastIndex = function () {
		this._lastIndex = -1;
		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0 || this._isMultiLine()) {
			return;
		}

		var prop_width = this._client_width;
		var prop_height = this._client_height;

		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);
		var bmtop = 0, bmright = 0, bmbottom = 0, bmleft = 0;

		if (buttonmargin != null) {
			bmleft = buttonmargin.left;
			bmtop = buttonmargin.top;
			bmright = buttonmargin.right;
			bmbottom = buttonmargin.bottom;
		}

		var buttonpadding = this.on_find_CurrentStyle_buttonpadding(this._pseudo);
		var bptop = 0, bpright = 0, bpbottom = 0, bpleft = 0;
		if (buttonpadding) {
			bpleft = buttonpadding.left;
			bptop = buttonpadding.top;
			bpright = buttonpadding.right;
			bpbottom = buttonpadding.bottom;
		}

		var rect;
		var spinsize;

		spinsize = this._getSpinSize();

		var tabs_width = prop_width - (Math.ceil(this._getToolBarSize()) | 0) - 2 * spinsize[0] - 2;
		var tabs_height = prop_height - (Math.ceil(this._getToolBarSize()) | 0) - 2 * spinsize[1] - 2;
		var scrollpos = 0, lastpos = 0;

		switch (this._getTabPosition()) {
			case "top":
			case "bottom":
				var buttonWidth = this._buttonWidth;
				var extrabutton_size = 0;
				var isextrabutton = this._isExtraButton();
				for (var tabcnt = this._scrollIndex; tabcnt < tabpagecnt; tabcnt++) {
					lastpos += buttonWidth[tabcnt];

					extrabutton_size = isextrabutton ? this.extrabutton._client_width : 0;
					if (lastpos + (bmleft + bmright) * tabcnt + (bpleft + bpright) * tabcnt + extrabutton_size * tabcnt > tabs_width) {
						break;
					}
					this._lastIndex = tabcnt;
				}
				break;
			case "left":
			case "right":
				var buttonHeight = this._buttonHeight;
				for (var tabcnt = this._scrollIndex; tabcnt < tabpagecnt; tabcnt++) {
					lastpos += Math.ceil(buttonHeight[tabcnt]) | 0;
					if (lastpos + (bmtop + bmbottom) * tabcnt + (bptop + bpbottom) * tabcnt > tabs_height) {
						break;
					}
					this._lastIndex = tabcnt;
				}
				break;
		}
	};

	_pTabComponent._resetScrollIndex = function (tabindex) {
		this._scrollIndex = -1;
		this._lastIndex = -1;

		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0 || this._isMultiLine()) {
			return;
		}

		if (!this._buttonRect || this._buttonRect.length == 0 || this._buttonRect.length != this._child_list.length) {
			return;
		}

		var prop_width = this._client_width;
		var prop_height = this._client_height;

		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);

		var bmtop = 0, bmright = 0, bmbottom = 0, bmleft = 0;

		if (buttonmargin != null) {
			bmleft = buttonmargin.left;
			bmtop = buttonmargin.top;
			bmright = buttonmargin.right;
			bmbottom = buttonmargin.bottom;
		}



		var rect;
		var spinsize;

		spinsize = this._getSpinSize();

		var tabs_width = prop_width - Math.ceil(this._getToolBarSize()) - 2 * spinsize[0] - 2;
		var tabs_height = prop_height - Math.ceil(this._getToolBarSize()) - 2 * spinsize[1] - 2;
		var scrollpos = 0, lastpos;

		var buttonRect = this._buttonRect;
		switch (this._getTabPosition()) {
			case "top":
			case "bottom":
				for (var scrollindex = 0; scrollindex < tabpagecnt && this._scrollIndex == -1; scrollindex++) {
					for (var tabcnt = scrollindex; tabcnt < tabpagecnt; tabcnt++) {
						scrollpos = buttonRect[scrollindex].left;
						lastpos = buttonRect[tabcnt].right;
						lastpos -= scrollpos;

						if (lastpos + bmleft > tabs_width) {
							if (this._scrollIndex != -1) {
								return;
							}
							if (this._isSpinButtonVisible()) {
								break;
							}
						}

						if (tabcnt == tabindex) {
							this._scrollIndex = scrollindex;
						}
						this._lastIndex = tabcnt;
					}
				}
				break;
			case "left":
			case "right":
				for (var scrollindex = 0; scrollindex < tabpagecnt && this._scrollIndex == -1; scrollindex++) {
					for (var tabcnt = scrollindex; tabcnt < tabpagecnt; tabcnt++) {
						scrollpos = buttonRect[scrollindex].top;
						lastpos = buttonRect[tabcnt].bottom;
						lastpos -= scrollpos;

						if (lastpos + bmtop > tabs_height) {
							if (this._scrollIndex != -1) {
								return;
							}
							break;
						}
						if (tabcnt == tabindex) {
							this._scrollIndex = scrollindex;
						}
						this._lastIndex = tabcnt;
					}
				}
				break;
		}
	};

	_pTabComponent._getTabIndex = function () {
		return this.tabindex;
	};

	_pTabComponent._getButtonRect = function (index, bBorder) {
		if (index != -1) {
			if (this._buttonRect == null) {
				return;
			}

			var button_rect = this._buttonRect[index];

			var buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);

			var bmtop = 0, bmright = 0, bmbottom = 0, bmleft = 0;
			var nOffsetX = 0, nOffsetY = 0;

			if (buttonmargin != null) {
				bmleft = buttonmargin.left;
				bmtop = buttonmargin.top;
				bmright = buttonmargin.right;
				bmbottom = buttonmargin.bottom;
			}

			if (this._scrollIndex >= 0) {
				var buttonWidth = this._buttonWidth;
				var off = 0;
				switch (this._getTabPosition()) {
					case "top":
					case "bottom":
						{

							if (this._spinflagup) {
								nOffsetX = buttonWidth[this._scrollIndex] + bmright;
							}
							else if (this._spinflagdown) {
								nOffsetX = buttonWidth[this._scrollIndex - 1] + bmright;
							}
							break;
						}
					case "left":
					case "right":
						{

							nOffsetY = this._buttonHeight[this._scrollIndex];
							break;
						}
				}
			}

			if (this._spinflagup) {
				button_rect.left += nOffsetX;
				button_rect.right += nOffsetX;
				button_rect.top += nOffsetY;
				button_rect.bottom += nOffsetY;
			}
			else if (this._spinflagdown) {
				button_rect.left -= nOffsetX;
				button_rect.right -= nOffsetX;
				button_rect.top -= nOffsetY;
				button_rect.bottom -= nOffsetY;
			}
		}
		else {
			var len = this._child_list.length;
			for (var idx = 0; idx < len; idx++) {
				this._getButtonRect(idx);
			}
		}
	};

	_pTabComponent._isBtnFocusAcceptable = function () {
		return nexacro._toBoolean(this.focusacceptable);
	};

	_pTabComponent._spinup = function () {
		if (this._isSpinUpEnable()) {
			this._getButtonRect(-1, true);
			this._scrollIndex--;
			this._resetLastIndex();
			this.spinupbutton.set_enable(this._isSpinUpEnable());
			this.spindownbutton.set_enable(this._isSpinDownEnable());
			this._spinflagup = true;
			this._getButtonRect(-1, true);
			this._spinflagup = false;

			this._drawButton();
			this._rearrangeBorder();

			if (this._isBtnFocusAcceptable() && this._setFocusTabButton) {
				this._setFocusTabButton(this._scrollIndex, this._scrollIndex + 1);
			}
		}
	};

	_pTabComponent._spindown = function () {
		if (this._isSpinDownEnable()) {
			this._getButtonRect(-1, true);
			this._scrollIndex++;
			this._resetLastIndex();
			this.spinupbutton.set_enable(this._isSpinUpEnable());
			this.spindownbutton.set_enable(this._isSpinDownEnable());
			this._spinflagdown = true;
			this._getButtonRect(-1, true);
			this._spinflagdown = false;

			this._drawButton();
			this._rearrangeBorder();

			if (this._isBtnFocusAcceptable() && this._setFocusTabButton) {
				this._setFocusTabButton(this._scrollIndex, this._scrollIndex - 1);
			}
		}
	};

	_pTabComponent._isSpinUpEnable = function () {
		if (this._scrollIndex > 0 && this._isMultiLine() != true) {
			return true;
		}
		else {
			return false;
		}
	};

	_pTabComponent._isSpinDownEnable = function () {
		if (this._lastIndex < this._child_list.length - 1 && this._isMultiLine() != true) {
			return true;
		}
		else {
			return false;
		}
	};

	_pTabComponent._isSpinButtonVisible = function () {
		if (this.spindownbutton.visible || this.spinupbutton.visible) {
			return true;
		}
		else {
			return false;
		}
	};

	_pTabComponent._recalcLayout = function () {
		if (this._org_status == "notfocus") {
			this._pre_scrollIndex = this._scrollIndex;
		}
		else {
			this._pre_scrollIndex = -1;
		}

		this._rearrangeButton();
		this._drawButton();

		var bckscrollIndex = this._scrollIndex;
		this._resetScrollIndex(this.tabindex);

		if (this._pre_scrollIndex != -1) {
			this._setScrollIndex(this._pre_scrollIndex);
		}
		else if (bckscrollIndex != this._scrollIndex) {
			this._setScrollIndex(bckscrollIndex);
		}

		this._rearrangeButton();
	};



	_pTabComponent._keydown_filter = function (elem, keycode, alt_key, ctrl_key, shift_key, event_bubbles, fire_comp, refer_comp) {
		var tabpagecnt = this._child_list.length;
		if (tabpagecnt <= 0) {
			return false;
		}

		var tabindex = this._getTabIndex();
		var oldindex = this.tabindex;

		var resetindex = -1;

		switch (keycode) {
			case 9:
				if (ctrl_key == true && this.usecontrolkey) {
					{

						if (shift_key != true) {
							if (tabindex < tabpagecnt - 1) {
								resetindex = tabindex + 1;
							}
							else {
								resetindex = 0;
							}
						}
						else {
							if (tabindex > 0) {
								resetindex = tabindex - 1;
							}
							else {
								resetindex = tabpagecnt - 1;
							}
						}

						if (this._focusobj instanceof nexacro.TabButtonCtrl) {
							this._setTabFocusObj(this._tabButtons[resetindex]);
						}
						else if (this._focusobj instanceof nexacro.Tabpage) {
							this._setTabFocusObj(this._child_list[resetindex]);
						}
						break;
					}
				}
				else {
					if (this._focusobj instanceof nexacro.TabComponent) {
						if (shift_key == false) {
							if (this._isBtnFocusAcceptable() == true) {
								this._setTabFocusObj(this._tabButtons[tabindex]);
								this._setFocusTabButton();
							}
							else {
								var obj = this._child_list[tabindex];
								var page_first_comp = this._getTabFocusObj()._getTabOrderFirst();
								if (page_first_comp) {
									if (obj instanceof nexacro.Form && obj._last_focused) {
										var win = this._getWindow();
										win._removeFromCurrentFocusPath(obj._last_focused);
									}
									page_first_comp._setFocus(false, 0);
								}
								this._setTabFocusObj(obj);
							}
						}
						else {
							var newfocus_comp = this.parent._searchPrevTabFocus(this);
							if (newfocus_comp) {
								if (newfocus_comp[0] == null) {
									if (newfocus_comp[2] == 1) {
										var text = application.accessibilitylastovertext;
										nexacro.__notifyAccessibility(this._control_element, text);
									}
									else if (newfocus_comp[2] == -1) {
										var text = application.accessibilityfirstovertext;
										nexacro.__notifyAccessibility(this._control_element, text);
									}
								}
								else {
									if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
										var win = this._getWindow();
										win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
									}

									newfocus_comp[0]._setFocus(true, 1, true);
								}
							}
						}
					}
					else if (this._focusobj instanceof nexacro.TabButtonCtrl) {
						if (shift_key == false) {
							var tabpage = this._child_list[tabindex];

							if (tabpage) {
								var newfocus_comp = tabpage._getTabOrderFirst();

								if (newfocus_comp) {
									newfocus_comp._setFocus(true, 0, true);
									this._setFocusTabButton(-1, this.tabindex);
								}
								this._setTabFocusObj(tabpage);
							}
						}
						else {
							return false;
						}
					}
					else if (this._focusobj instanceof nexacro.Tabpage) {
						var page_last_comp = this._focusobj._getLastFocused();
						var page_first_comp = this._focusobj._getTabOrderFirst();
						var dlgc = undefined;

						if (page_last_comp) {
							dlgc = page_last_comp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);
						}

						if (!dlgc || (dlgc.want_tab == false)) {
							if (shift_key == false) {
								if (page_last_comp == null && page_first_comp) {
									page_first_comp._setFocus(true, 0);
								}
								else {
									var page_next_comp = this._focusobj._searchNextTabFocus(page_last_comp);
									if (page_next_comp && page_next_comp[0]) {
										page_next_comp[0]._setFocus(true, 0);
									}
								}
							}
							else {
								if (page_last_comp == null) {
									if (this._isBtnFocusAcceptable()) {
										this._setTabFocusObj(this._tabButtons[tabindex]);
									}
									else {
										this._setTabFocusObj(this);
									}
									this._focusobj._setFocus(true, 1);
								}
								else if (page_last_comp == page_first_comp) {
									if (this._isBtnFocusAcceptable()) {
										this._setTabFocusObj(this._tabButtons[tabindex]);
									}
									else {
										this._setTabFocusObj(this);
									}
									this._focusobj._setFocus(true, 1);
								}
								else {
									var page_prev_comp = this._focusobj._searchPrevTabFocus(page_last_comp);
									if (page_prev_comp && page_prev_comp[0]) {
										page_prev_comp[0]._setFocus(true, 1);
									}
								}
							}
						}
					}
					return true;
				}
				break;
			case 8:
				if (ctrl_key == true && this.usecontrolkey) {
					this.on_fire_onextrabuttonclick(this, tabindex, "", false, false, false, -1, -1, -1, -1, -1, -1, this, this);

					return true;
				}
				break;
			case 38:
				{

					if (nexacro._enableaccessibility) {
						var focusobj = this._focusobj;
						var newcomp;
						if (focusobj instanceof nexacro.TabButtonCtrl) {
							if (this._isAccessibilityEnable()) {
								newcomp = this;
							}

							if (newcomp) {
								newcomp._setFocus(true, 3, true);
								this._setTabFocusObj(newcomp);
							}
							else {
								return false;
							}
						}
						else if (focusobj instanceof nexacro.Tabpage) {
							var page_last_comp = focusobj._getLastFocused();

							if (page_last_comp) {
								var dlg = page_last_comp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);
								if (dlg.want_arrows == false) {
									newcomp = focusobj._searchPrevTabFocus(focusobj._last_focused, undefined, undefined, true)[0];

									if (newcomp) {
										if (newcomp == focusobj) {
											var win = newcomp._getWindow();
											win._removeFromCurrentFocusPath(newcomp);
											newcomp._setFocus(true, 3, true);
											this._setTabFocusObj(newcomp);
										}
										else {
											newcomp._setFocus(true, 3, true);
										}
									}
									else {
										return false;
									}
								}
							}
							else {
								if (focusobj.parent._isBtnFocusAcceptable()) {
									newcomp = focusobj.parent._tabButtons[focusobj.parent.tabindex];
								}
								else {
									newcomp = focusobj.parent;
								}

								if (newcomp) {
									newcomp._setFocus(true, 3, true);
									this._setTabFocusObj(newcomp);
								}
								else {
									return false;
								}
							}
						}
						return true;
					}
				}
				break;
			case 40:
				{

					if (nexacro._enableaccessibility) {
						var focusobj = this._focusobj;
						var newcomp;
						var newcompobj = null;
						if (focusobj instanceof nexacro.Tab) {
							if (this._isBtnFocusAcceptable()) {
								newcomp = this._tabButtons[this.tabindex];
							}
							else {
								newcomp = this.tabpages[this.tabindex];
								if (newcomp._last_focused) {
									newcomp._last_focused = null;
								}
								if (!newcomp._isAccessibilityEnable()) {
									newcompobj = newcomp._searchNextTabFocus(focusobj._last_focused, undefined, undefined, true);
								}
							}
						}
						else if (focusobj instanceof nexacro.TabButtonCtrl) {
							newcomp = this.tabpages[this.tabindex];
							if (newcomp._last_focused) {
								newcomp._last_focused = null;
							}
							if (!newcomp._isAccessibilityEnable()) {
								newcompobj = newcomp._searchNextTabFocus(focusobj._last_focused, undefined, undefined, true);
							}
						}
						else if (focusobj instanceof nexacro.Tabpage) {
							var page_last_comp = focusobj._getLastFocused();
							var dlgc = undefined;
							if (page_last_comp) {
								dlgc = page_last_comp._getDlgCode(keycode, alt_key, ctrl_key, shift_key);
							}

							if (!dlgc || dlgc.want_arrows == false) {
								newcompobj = focusobj._searchNextTabFocus(focusobj._last_focused, undefined, undefined, true);
							}
						}

						if (newcompobj && newcompobj[0]) {
							newcomp = newcompobj[0];
							newcomp._setFocus(true, 2, true);
						}
						else {
							if (newcomp) {
								newcomp._setFocus(true, 2, true);
								this._setTabFocusObj(newcomp);
							}
						}
						return true;
					}
				}
				break;
			case 39:
				if (this._isBtnFocusAcceptable() && ctrl_key == false) {
					var focusobj = this._focusobj;
					if (focusobj instanceof nexacro.TabButtonCtrl) {
						if (tabindex < tabpagecnt - 1) {
							resetindex = tabindex + 1;
						}
						else {
							resetindex = 0;
						}
						this._setTabFocusObj(this._tabButtons[resetindex]);
					}
				}
				break;
			case 37:
				if (this._isBtnFocusAcceptable() && ctrl_key == false) {
					var focusobj = this._focusobj;
					if (focusobj instanceof nexacro.TabButtonCtrl) {
						if (tabindex > 0) {
							resetindex = tabindex - 1;
						}
						else {
							resetindex = tabpagecnt - 1;
						}
						this._setTabFocusObj(this._tabButtons[resetindex]);
					}
				}
				break;
			default:
				break;
		}

		if (resetindex > -1) {
			if (this._changeTabIndex(resetindex, true) == true) {
				if (this.enableevent) {
					this.on_fire_onchanged(this, resetindex, oldindex);
				}

				if (this._setFocusTabButton) {
					this._setFocusTabButton(resetindex, oldindex);
				}
				this._changeScrollIndex(resetindex);
			}
		}
	};

	_pTabComponent._setElementBorder = function (control, border, bordertype, btabborder) {
		if (!border) {
			return;
		}

		var b = border.clone();
		var position = this._getTabPosition();

		b._linecnt = 1;
		b._copytoSubObjects();
		b._linecnt = 4;

		{

			if (position == "top") {
				b.set_top_width("0");
			}
			else if (position == "bottom") {
				b.set_bottom_width("0");
			}
			else if (position == "left") {
				b.set_left_width("0");
			}
			else if (position == "right") {
				b.set_right_width("0");
			}

			control.setElementBorder(b, bordertype);
		}
	};

	delete _pTabComponent;
}

if (!nexacro.Tab_Style) {
	nexacro.Tab_Style = function (target, id) {
		nexacro.Style.call(this, target, id);

		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.showextrabutton = null;
		this.focusborder = null;
	};

	var _pTabStyle = nexacro.Tab_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.Tab_style);

	eval(nexacro._createBackgroundAttributeEvalStr("_pTabStyle", "buttonbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pTabStyle", "buttongradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pTabStyle", "buttonborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pTabStyle", "buttonbordertype"));
	eval(nexacro._createPaddingAttributeEvalStr("_pTabStyle", "buttonpadding"));
	eval(nexacro._createMarginAttributeEvalStr("_pTabStyle", "buttonmargin"));
	eval(nexacro._createValueAttributeEvalStr("_pTabStyle", "showextrabutton"));
	eval(nexacro._createValueAttributeEvalStr("_pTabStyle", "focusborder"));

	_pTabStyle.__custom_emptyObject = function () {
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.showextrabutton = null;
		this.focusborder = null;
	};

	_pTabStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.buttonbackground && this.buttonbackground._value.length) {
			val += "buttonbackground:" + this.buttonbackground._value + "; ";
		}
		if (this.buttongradation && this.buttongradation._value.length) {
			val += "buttongradation:" + this.buttongradation._value + "; ";
		}
		if (this.buttonborder && this.buttonborder._value.length) {
			val += "buttonborder:" + this.buttonborder._value + "; ";
		}
		if (this.buttonbordertype && this.buttonbordertype._value.length) {
			val += "buttonbordertype:" + this.buttonbordertype._value + "; ";
		}
		if (this.buttonpadding && this.buttonpadding._value.length) {
			val += "buttonpadding:" + this.buttonpadding._value + "; ";
		}
		if (this.buttonmargin && this.buttonmargin._value.length) {
			val += "buttonmargin:" + this.buttonmargin._value + "; ";
		}
		if (this.showextrabutton && this.showextrabutton._value.length) {
			val += "showextrabutton:" + this.showextrabutton._value + "; ";
		}
		if (this.focusborder && this.focusborder._value.length) {
			val += "focusborder:" + this.focusborder._value + "; ";
		}

		return val;
	};


	_pTabStyle._update_background = function (idx) {
		var target = this._target;

		if (target) {
			if (idx == 1) {
				target.on_update_style_buttonbackground();
			}
			else {
				target.on_update_style_background();
			}

			if (this.buttonbackground && this.buttonbackground.image && target.imagewidth == 0 && target.imageheight == 0) {
				target._getImgSize();
			}
		}
	};

	_pTabStyle._update_border = function (idx) {
		if (this._target) {
			if (idx == 1) {
				this._target.on_update_style_buttonborder();
			}
			else {
				this._target.on_update_style_border();
			}
		}
	};

	_pTabStyle._update_bordertype = function (idx) {
		if (this._target) {
			if (idx == 1) {
				this._target.on_update_style_buttonbordertype();
			}
			else {
				this._target.on_update_style_bordertype();
			}
		}
	};

	_pTabStyle._update_gradation = function (idx) {
		if (this._target) {
			if (idx == 1) {
				this._target.on_update_style_buttongradation();
			}
			else {
				this._target.on_update_style_gradation();
			}
		}
	};

	_pTabStyle._update_style_padding = function (idx) {
		if (this._target) {
			if (idx == 1) {
				this._target.on_update_style_buttonpadding();
			}
			else {
				this._target.on_update_style_padding();
			}
		}
	};

	delete _pTabStyle;

	nexacro.Tab_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.showextrabutton = null;
		this.focusborder = null;
	};

	var _pTabCurrentStyle = nexacro.Tab_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Tab_CurrentSTyle);

	_pTabCurrentStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.buttonbackground && this.buttonbackground._value.length) {
			val += "buttonbackground:" + this.buttonbackground._value + "; ";
		}
		if (this.buttongradation && this.buttongradation._value.length) {
			val += "buttongradation:" + this.buttongradation._value + "; ";
		}
		if (this.buttonbordertype && this.buttonbordertype._value.length) {
			val += "buttonbordertype:" + this.buttonbordertype._value + "; ";
		}
		if (this.buttonborder && this.buttonborder._value.length) {
			val += "buttonborder:" + this.buttonborder._value + "; ";
		}
		if (this.buttonpadding && this.buttonpadding._value.length) {
			val += "buttonpadding:" + this.buttonpadding._value + "; ";
		}
		if (this.buttonmargin && this.buttonmargin._value.length) {
			val += "buttonmargin:" + this.buttonmargin._value + "; ";
		}
		if (this.showextrabutton && this.showextrabutton._value.length) {
			val += "showextrabutton:" + this.showextrabutton._value + "; ";
		}
		if (this.focusborder && this.focusborder._value.length) {
			val += "focusborder:" + this.focusborder._value + "; ";
		}

		return val;
	};

	_pTabCurrentStyle.__custom_emptyObject = function () {
		this.buttonbackground = null;
		this.buttongradation = null;
		this.buttonborder = null;
		this.buttonbordertype = null;
		this.buttonpadding = null;
		this.buttonmargin = null;
		this.showextrabutton = null;
		this.focusborder = null;
	};

	delete _pTabCurrentStyle;
}


if (!nexacro.Tab) {
	nexacro.Tab = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.TabComponent.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.preload = false;
		this.tabpages = new nexacro.Collection();

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
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"onrbuttondown" : 1, 
			"onrbuttonup" : 1, 
			"onchanged" : 1, 
			"onspin" : 1, 
			"canchange" : 1, 
			"oneditclick" : 1, 
			"onextrabuttonclick" : 1, 
			"onmouseup" : 1, 
			"onmousedown" : 1, 
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
			"onslideend" : 1, 
			"onzoom" : 1
				
		};

		this._tabbutton_obj = null;

		if (right) {
			this._orgwidth = right - left;
		}
		else {
			this._orgwidth = width;
		}

		if (bottom) {
			this._orgheight = bottom - top;
		}
		else {
			this._orgheight = height;
		}
	};

	var _pTab = nexacro.Tab.prototype = nexacro._createPrototype(nexacro.TabComponent, nexacro.Tab);

	_pTab._type_name = "Tab";

	nexacro.Tab._default_showextrabutton = nexacro._getCachedStyleObj("showextrabutton", "false");

	_pTab.killTimer = null;
	_pTab.setTimer = null;
	_pTab.loadStyle = null;
	_pTab.setWaitCursor = null;


	_pTab._accessibility_tabindex = -1;
	_pTab._accessibility_is_next = false;

	_pTab.on_create_custom_style = function () {
		return new nexacro.Tab_Style(this);
	};

	_pTab.on_create_custom_currentStyle = function () {
		return new nexacro.Tab_CurrentStyle();
	};

	_pTab.on_apply_custom_pseudo = function (pseudo) {
		var curr_style = this.currentstyle;
		var change = false;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curr_style.font != font) {
			curr_style.font = font;
			change = true;
		}

		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (curr_style.letterspace != letterspace) {
			curr_style.letterspace = letterspace;
			change = true;
		}

		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curr_style.color != color) {
			curr_style.color = color;
			change = true;
		}

		var btn_bk = this.on_find_CurrentStyle_buttonbackground(pseudo);
		if (curr_style.buttonbackground != btn_bk) {
			curr_style.buttonbackground = btn_bk;
			change = true;
		}

		var btn_gradation = this.on_find_CurrentStyle_buttongradation(pseudo);
		if (curr_style.buttongradation != btn_gradation) {
			curr_style.buttongradation = btn_gradation;
			change = true;
		}

		var btn_border = this.on_find_CurrentStyle_buttonborder(pseudo);
		if (curr_style.buttonborder != btn_border) {
			curr_style.buttonborder = btn_border;
			change = true;
		}

		var btn_bordertype = this.on_find_CurrentStyle_buttonbordertype(pseudo);
		if (curr_style.buttonbordertype != btn_bordertype) {
			curr_style.buttonbordertype = btn_bordertype;
			change = true;
		}

		var btn_margin = this.on_find_CurrentStyle_buttonmargin(pseudo);
		if (curr_style.buttonmargin != btn_margin) {
			curr_style.buttonmargin = btn_margin;
			change = true;
		}

		if (change) {
			this._updateAllTabButton(pseudo);
		}

		var btn_padding = this.on_find_CurrentStyle_buttonpadding(pseudo);
		if (curr_style.buttonpadding != btn_padding) {
			curr_style.buttonpadding = btn_padding;
			this.on_apply_style_buttonpadding(btn_padding);
		}

		var showextrabutton = this.on_find_CurrentStyle_showextrabutton(pseudo);
		if (curr_style.showextrabutton != showextrabutton) {
			curr_style.showextrabutton = showextrabutton;
			this.on_apply_style_showextrabutton(showextrabutton);
		}

		var focusborder = this.on_find_CurrentStyle_focusborder(pseudo);
		if (curr_style.focusborder != focusborder) {
			curr_style.focusborder = focusborder;
			this.on_apply_style_focusborder(focusborder);
		}
	};

	_pTab._updateAllTabButton = function (pseudo) {
		var button = this._tabButtons;
		var child_list = this._child_list;
		var len = button.length;

		pseudo = (pseudo == null || pseudo == "focused") ? "normal" : pseudo;

		if (pseudo == "mouseover") {
			return;
		}

		for (var i = 0; i < len; i++) {
			var pagecontrol = child_list[i];

			if (pagecontrol.enable) {
				this._tabButtons[i]._updateAll(pseudo);
			}
			else {
				this._tabButtons[i]._status = "disable";
				this._tabButtons[i]._updateAll("disabled");
			}
		}
	};

	_pTab.on_find_CurrentStyle_buttonbackground = function (pseudo) {
		return this._find_pseudo_obj("buttonbackground", pseudo, "background");
	};

	_pTab.on_find_CurrentStyle_buttongradation = function (pseudo) {
		return this._find_pseudo_obj("buttongradation", pseudo, "gradation");
	};

	_pTab.on_find_CurrentStyle_buttonborder = function (pseudo) {
		return this._find_pseudo_obj("buttonborder", pseudo, "border");
	};

	_pTab.on_find_CurrentStyle_buttonbordertype = function (pseudo) {
		var bordertype = this._find_pseudo_obj("buttonbordertype", pseudo, "bordertype");
		return (bordertype) ? bordertype : null;
	};

	_pTab.on_find_CurrentStyle_buttonpadding = function (pseudo) {
		var padding = this._find_pseudo_obj("buttonpadding", pseudo, "padding");
		return (padding) ? padding : nexacro.Component._default_padding;
	};

	_pTab.on_find_CurrentStyle_buttonmargin = function (pseudo) {
		var margin = this._find_pseudo_obj("buttonmargin", pseudo, "margin");
		return (margin) ? margin : nexacro.Component._default_margin;
	};

	_pTab.on_find_CurrentStyle_showextrabutton = function (pseudo) {
		var showextrabutton = this._find_pseudo_obj("showextrabutton", pseudo);
		return (showextrabutton) ? showextrabutton : nexacro.Tab._default_showextrabutton;
	};

	_pTab.on_find_CurrentStyle_focusborder = function (pseudo) {
		return this._find_pseudo_obj("focusborder", pseudo, "border");
	};

	_pTab.on_find_CurrentStyle_border = function (pseudo) {
		var border = this._find_pseudo_obj("border", pseudo, "border");

		if (this._tabpagearea && border) {
			var b = border.clone();
			b._linecnt = 4;
			b.set_top_width("0");
			b.set_right_width("0");
			b.set_bottom_width("0");
			b.set_left_width("0");

			this.getElement().setElementBorder(b, this.currentstyle.bordertype);
		}

		return border;
	};

	_pTab.on_update_style_buttonbackground = function () {
		this.on_apply_style_buttonbackground(this.currentstyle.buttonbackground = this.on_find_CurrentStyle_buttonbackground(this._pseudo));
	};
	_pTab.on_update_style_buttongradation = function () {
		this.on_apply_style_buttongradation(this.currentstyle.buttongradation = this.on_find_CurrentStyle_buttongradation(this._pseudo));
	};
	_pTab.on_update_style_buttonborder = function () {
		this.on_apply_style_buttonborder(this.currentstyle.buttonborder = this.on_find_CurrentStyle_buttonborder(this._pseudo));
	};
	_pTab.on_update_style_buttonbordertype = function () {
		this.on_apply_style_buttonbordertype(this.currentstyle.buttonbordertype = this.on_find_CurrentStyle_buttonbordertype(this._pseudo));
	};
	_pTab.on_update_style_buttonpadding = function () {
		this.on_apply_style_buttonpadding(this.currentstyle.buttonpadding = this.on_find_CurrentStyle_buttonpadding(this._pseudo));
	};
	_pTab.on_update_style_buttonmargin = function () {
		this.on_apply_style_buttonmargin(this.currentstyle.buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo));
	};

	_pTab.on_update_style_showextrabutton = function () {
		this.on_apply_style_showextrabutton(this.currentstyle.showextrabutton = this.on_find_CurrentStyle_showextrabutton(this._pseudo));
	};

	_pTab.on_update_style_focusborder = function () {
		this.on_apply_style_focusborder(this.currentstyle.focusborder = this.on_find_CurrentStyle_focusborder(this._pseudo));
	};

	_pTab.on_update_style_font = function () {
		var tabbtn = null;
		var len = this._tabButtons.length;
		for (var i = 0; i < len; i++) {
			tabbtn = this._tabButtons[i];
			tabbtn.on_apply_style_font(this.style.font);
		}
	};

	_pTab.on_update_style_letterspace = function () {
		var tabbtn = null;
		var len = this._tabButtons.length;
		for (var i = 0; i < len; i++) {
			tabbtn = this._tabButtons[i];
			tabbtn.on_apply_style_letterspace(this.style.letterspace);
		}
		this._updateAllTabButton();
		this._recalcLayout();
	};

	_pTab.on_apply_style_buttonbackground = function (v) {
		this._updateAllTabButton();
	};
	_pTab.on_apply_style_buttongradation = function (v) {
		this._updateAllTabButton();
	};
	_pTab.on_apply_style_buttonborder = function (v) {
		this._updateAllTabButton();
		this._recalcLayout();
	};
	_pTab.on_apply_style_buttonbordertype = function (v) {
		this._updateAllTabButton();
	};
	_pTab.on_apply_style_buttonpadding = function (v) {
		this._updateAllTabButton();
		this._recalcLayout();
	};
	_pTab.on_apply_style_buttonmargin = function (v) {
		this._updateAllTabButton();
	};

	_pTab.on_apply_style_showextrabutton = function (v) {
		var isextrabutton = this._isExtraButton();
		if (isextrabutton && this._tabextrabuttons.length <= 0) {
			var len = this._tabButtons.length;
			for (var i = 0; i < len; i++) {
				var extrabutton = this._createtabextrabutton(i);
				extrabutton.createComponent();
			}
		}
		else if (!isextrabutton) {
			var extButton = this._tabextrabuttons;
			var len = 0;
			if (extButton) {
				len = extButton.length;
			}

			for (var i = 0; i < len; i++) {
				extButton[i].set_visible(false);
			}
		}
		this._recalcLayout();
	};

	_pTab.on_apply_style_focusborder = function (v) {
		if (this._isBtnFocusAcceptable()) {
			this._setFocusTabButton();
		}
	};


	_pTab.on_apply_style_color = function (v) {
		this._updateAllTabButton();
	};


	_pTab.on_apply_prop_enable = function (v) {
		var buttons = this._tabButtons;
		var pages = this._child_list;
		var extrabuttons = this._tabextrabuttons;
		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}
		var len = buttons.length;
		if (len > 0) {
			for (var i = 0; i < len; i++) {
				buttons[i].enable = enable;
				buttons[i]._setEnable(enable);

				if (this.tabindex == i && enable == true) {
					if (buttons[i]._pseudo != "selected") {
						buttons[i]._stat_change("focus", "focused");
					}
				}

				pages[i].set_enable(enable);
				if (extrabuttons.length > 0) {
					extrabuttons[i]._setEnable(enable);
				}
			}
		}

		if (!enable) {
			if (this.spinupbutton) {
				this.spinupbutton.set_enable(enable);
			}
			if (this.spindownbutton) {
				this.spinupbutton.set_enable(enable);
			}
		}
	};

	_pTab.on_create_contents = function () {
		var control = this.getElement();
		control.setElementSize(this._adjust_width, this._adjust_height);
	};

	_pTab.on_created_contents = function () {
		var control = this.getElement();
		if (control) {
			this._getImgSize();

			this._tabpagearea = new nexacro.TabPageArea("tabpagearea", this.position, 0, 0, 0, 0, null, null, this);
			this._tabpagearea.createComponent();

			this._createSubComp();

			this.on_apply_style_buttonbordertype(this.currentstyle.buttonbordertype);
			this.on_apply_style_buttonbackground(this.currentstyle.buttonbackground);

			this.on_apply_addChild();

			this._is_created = true;

			this.on_apply_tabindex();
			this.on_apply_prop_rtldirection();
			this.on_apply_style_letterspace(this.currentstyle.letterspace);
		}
	};

	_pTab.on_destroy_contents = function () {
		if (this._timerManager) {
			this._timerManager.destroy();
			this._timerManager = null;
		}

		if (this._load_manager) {
			var load_manager = this._load_manager;
			var tr_list = load_manager.transactionList;
			if (tr_list) {
				for (var i = tr_list.length - 1; i >= 0; i--) {
					var tr_item = tr_list[i];
					if (tr_item._usewaitcursor) {
						tr_item._hideWaitCursor(this);
					}

					tr_item = null;
				}

				tr_list = null;
			}
			this._load_manager.destroy();
			this._load_manager = null;
		}

		if (this._bind_manager) {
			this._bind_manager.destroy();
			this._bind_manager = null;
		}

		if (this._tabpagearea) {
			this._tabpagearea.destroy();
			this._tabpagearea = null;
		}
		if (this.spindownbutton) {
			this.spindownbutton.destroy();
			this.spindownbutton = null;
		}
		if (this.spinupbutton) {
			this.spinupbutton.destroy();
			this.spinupbutton = null;
		}

		var comps = this._tabButtons;
		var comp;
		var len = comps.length;
		for (var i = 0; i < len; i++) {
			comp = comps[i];
			if (comp) {
				comp.destroy();
				comps[i] = null;
			}
		}
		comps = this._tabButtonBorders;
		len = comps.length;
		for (var i = 0; i < len; i++) {
			comp = comps[i];
			if (comp) {
				comp.destroy();
				comps[i] = null;
			}
		}
		comps = this._tabButtonLeftBorders;
		len = comps.length;
		for (var i = 0; i < len; i++) {
			comp = comps[i];
			if (comp) {
				comp.destroy();
				comps[i] = null;
			}
		}
		comps = this._tabBorders;
		len = comps.length;
		for (var i = 0; i < len; i++) {
			comp = comps[i];
			if (comp) {
				comp.destroy();
				comps[i] = null;
			}
		}
		comps = this._tabextrabuttons;
		len = comps.length;
		for (var i = 0; i < len; i++) {
			comp = comps[i];
			if (comp) {
				comp.destroy();
				comps[i] = null;
			}
		}

		comps = this.components;
		len = comps.length;
		for (var i = 0; i < len; i++) {
			var compname = comps.get_id(0);
			if (this[compname]) {
				this[compname]._is_loaded = false;
				if (this[compname].destroy) {
					this[compname].destroy();
				}
			}
		}

		var tabpages = this.tabpages;
		var len = tabpages.length;
		for (var i = 0; i < len; i++) {
			tabpages[i] = null;
		}
		this.tabpages = null;
		tabpages = null;

		delete this._tabButtons;
		delete this._tabButtonBorders;
		delete this._tabButtonLeftBorders;
		delete this._tabBorders;
		delete this._tabextrabuttons;

		if (this._tabbutton_obj) {
			this._tabbutton_obj = null;
		}

		this._buttonWidth = null;
		this._buttonRect = null;
		this._buttonHeight = null;
		this._layout_list.clear();
		this._layout_list = null;
		this.binds = null;
		this.objects = null;

		this._find_csslist = null;
		this._css_selectors = null;
		this._cssfinder_cache = null;
		this._child_list = null;
		this._executescriptlist = null;
		this._includescriptlist = null;
		this._hotkey_list = null;

		this._load_callbacklist = null;

		this.all.clear();
		this.all = null;
		this.components.clear();
		this.components = null;
	};

	_pTab.on_change_containerRect = function (width, height) {
		this._recalcLayout();
		this._stat_change(this._status, this._pseudo);
	};

	_pTab.on_apply_custom_setfocus = function (evt_name) {
		nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);

		if (!this._focusobj) {
			if (nexacro._enableaccessibility) {
				if (this._isAccessibilityEnable()) {
					this._setTabFocusObj(this);
				}
				else {
					if (this._isBtnFocusAcceptable()) {
						this._setTabFocusObj(this._tabButtons[this.tabindex]);
					}
					else {
						this._setTabFocusObj(this._child_list[this.tabindex]);
						if (this._focusobj._isAccessibilityEnable()) {
							this._focusobj._setFocus(false);
						}
						else {
							var page_first_comp = this._focusobj._getTabOrderFirst();
							if (page_first_comp) {
								page_first_comp._setFocus(false);
							}
						}
					}
				}
			}
			else {
				if (this._isBtnFocusAcceptable()) {
					this._setTabFocusObj(this._tabButtons[this.tabindex]);
					this._setFocusTabButton();
				}
				else {
					this._setTabFocusObj(this._child_list[this.tabindex]);
				}
			}
		}
	};

	_pTab._stat_change = function (status, pseudo) {
		this._org_status = status;
		this.on_change_status(status, pseudo);

		if (this._tabpagearea && this.currentstyle.border) {
			var b = this.currentstyle.border.clone();
			b._linecnt = 4;
			b.set_top_width("0");
			b.set_right_width("0");
			b.set_bottom_width("0");
			b.set_left_width("0");

			this.getElement().setElementBorder(b, this.currentstyle.bordertype);
		}
	};

	_pTab.set_preload = function (v) {
		if (v === false || v == "false") {
			this.preload = false;
		}
		else {
			this.preload = true;
		}
	};

	_pTab.set_tabpages = function (v) {
	};

	_pTab.on_fire_user_onmousedown = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmousedown", button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_sys_onmousedown = function (button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmousedown", button, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmousedown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var rootComp = this._getRootComponent(from_comp);

			if (from_comp instanceof nexacro.Tabpage) {
				rootComp = from_comp;
			}
			var evt = new nexacro.MouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onmouseup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab._on_killfocus = function (new_focus, new_ref_focus) {
		if (new_focus === this) {
			return;
		}

		if (new_focus == null && new_ref_focus == null) {
			return;
		}

		this._focusobj = null;

		for (i = 0; i < this._tabButtonBorders.length; i++) {
			this._tabButtonBorders[i].set_visible(false);
		}

		if (this._focusobj instanceof nexacro.TabButtonCtrl) {
			this._setFocusTabButton(-1, this.tabindex);
		}
	};

	_pTab.on_fire_user_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		var ret = false;
		if (this.onkeydown && this.onkeydown._has_handlers) {
			var page = this._child_list[this.tabindex];
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, page, page);
			ret = this.onkeydown._fireUserEvent(this, evt);
		}


		if (!this.onkeydown || (this.onkeydown && !this.onkeydown.defaultprevented)) {
			if (key_code == nexacro.Event.KEY_TAB) {
				if (this._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp)) {
					this._getWindow()._keydown_element._event_stop = true;
					return true;
				}
			}
			else if (nexacro._enableaccessibility) {
				if (key_code == nexacro.Event.KEY_DOWN || key_code == nexacro.Event.KEY_UP) {
					if (this._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp)) {
						return true;
					}
				}
			}
		}
		return ret;
	};

	_pTab.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeydown && this.onkeydown._has_handlers) {
			var page = this._child_list[this.tabindex];
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, page, page);
			return this.onkeydown._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var page = this._child_list[this.tabindex];

			var evt = new nexacro.KeyEventInfo(page, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeyup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_sys_onkeyup = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.onkeyup && this.onkeyup._has_handlers) {
			var page = this._child_list[this.tabindex];

			var evt = new nexacro.KeyEventInfo(page, "onkeyup", alt_key, ctrl_key, shift_key, key_code, from_comp, from_refer_comp);
			return this.onkeyup._fireSysEvent(this, evt);
		}
		return false;
	};

	_pTab._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._tabbutton_obj = null;
		return nexacro.Component.prototype._on_lbuttondown.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pTab._on_btn_lbuttondown = function (obj, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._tabbutton_obj = obj;
		var ret = nexacro.Component.prototype._on_lbuttondown.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
		this._setTabFocusObj(this._tabButtons[obj._index]);

		if (this.focusacceptable) {
			this._child_list[obj._index]._last_focused = null;
		}

		return ret;
	};

	_pTab._on_btn_touchstart = function (obj, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		this._tabbutton_obj = obj;
		var ret = nexacro.Component.prototype._on_touchstart.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
		this._setTabFocusObj(obj);
		if (this.focusacceptable) {
			this._child_list[obj._index]._last_focused = null;
		}
		return ret;
	};

	_pTab._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var focusdir = this._focus_direction;
		if (evt_name == "tabkey") {
			focusdir = 0;
		}
		else if (evt_name == "shifttabkey") {
			focusdir = 1;
		}
		else if (evt_name == "downkey") {
			focusdir = 2;
		}
		else if (evt_name == "upkey") {
			focusdir = 3;
		}
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		if (focusdir == 2) {
			if (!this._isAccessibilityEnable()) {
				var focus_comp;
				if (this._isBtnFocusAcceptable()) {
					focus_comp = this._tabButtons[this.tabindex];
					focus_comp._setFocus(true);
				}
				else {
					focus_comp = this.tabpages[this.tabindex];
					if (focus_comp._isAccessibilityEnable()) {
						focus_comp._setFocus(true);
					}
					else {
						focus_comp = focus_comp._searchNextTabFocus(null, undefined, undefined, true);
						if (focus_comp) {
							focus_comp[0]._setFocus(true);
							focus_comp = focus_comp[0];
						}
						else {
							focus_comp = this;
						}
					}
				}

				if (focus_comp) {
					this._setTabFocusObj(focus_comp);
				}
			}
		}
	};

	_pTab.on_get_prop_tabstop = function () {
		if (!this.tabstop) {
			return false;
		}
		else {
			var my_tabstop_childs = this._getSortedDecendants(this);
			if (my_tabstop_childs && my_tabstop_childs.length > 0) {
				return true;
			}
		}

		return false;
	};


	_pTab._setTabFocusObj = function (focusobj) {
		this._focusobj = focusobj;
	};

	_pTab._getTabFocusObj = function () {
		return this._focusobj;
	};

	_pTab._getTabOrderNext = function (current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite) {
		if (direction > 0) {
			return nexacro.FormBase.prototype._getTabOrderNext.call(this, current, direction, bAccessibility, bEditable, edittype, bhotkey, bComposite);
		}
		else if (direction < 0) {
			if (this._isBtnFocusAcceptable()) {
				return this._tabButtons[this.tabindex];
			}
			return this.tabpages[this.tabindex];
		}
	};

	_pTab._getTabOrderFirst = function () {
		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5 && this._accessibility_is_next) {
			this._accessibility_is_next = false;
			return null;
		}

		if (this._isBtnFocusAcceptable()) {
			return this._tabButtons[this.tabindex];
		}
		return this.tabpages[this.tabindex];
	};

	_pTab._on_btn_mousemove = function (obj, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = nexacro.Component.prototype._on_mousemove.call(this._tabButtons[obj._index], elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pTab._on_btn_mousemove = function (obj, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = nexacro.Component.prototype._on_mousemove.call(this._tabButtons[obj._index], elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pTab.on_touchstart_default_action = function () {
		if (this._tabbutton_obj) {
			var obj = this._tabbutton_obj;
			var idx = obj._index;

			if (obj.name == "extrabutton") {
				idx = this._getExtrabuttonIdx(obj);
				if (idx >= 0) {
					this.on_fire_onextrabuttonclick(obj, idx);
				}
			}
		}
	};

	_pTab.on_touchstart_basic_action = function (touch_manager, changedtouchinfos) {
		nexacro.Component.prototype.on_touchstart_basic_action.call(this, touch_manager, changedtouchinfos);

		if (!this.visible || this._isEnable() == false) {
			return ret;
		}

		if (this._tabbutton_obj && this.selectchangetype == "down") {
			var obj = this._tabbutton_obj;
			var idx = obj._index;

			if (obj.name == "extrabutton") {
				idx = this._getExtrabuttonIdx(obj);
			}

			oldindex = this.tabindex;
			this._iscanchange = this._changeTabIndex(idx, true);
			if (this._iscanchange == true) {
				if (this.enableevent && oldindex != this.tabindex) {
					this.on_fire_onchanged(obj, idx, oldindex);
				}
			}
		}

		if (this._isBtnFocusAcceptable()) {
			this._setFocusTabButton();
		}
	};

	_pTab.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this._tabbutton_obj) {
			var obj = this._tabbutton_obj;
			var idx = obj._index;

			if (obj.name == "extrabutton") {
				idx = this._getExtrabuttonIdx(obj);
				if (idx >= 0) {
					this.on_fire_onextrabuttonclick(obj, idx, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
				}
			}
		}

		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onlbuttondown", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;

		return ret;
	};

	_pTab.on_lbuttondown_default_action = function (elem, refer_comp, canvasX, canvasY) {
		var ret = nexacro.Component.prototype.on_lbuttondown_default_action.call(this, elem, refer_comp, canvasX, canvasY);

		if (!this.visible || this._isEnable() == false) {
			return ret;
		}

		var tabbutton_obj = this._tabbutton_obj;
		if (tabbutton_obj && tabbutton_obj.name == "extrabutton") {
			if (this._tabButtons[tabbutton_obj._index]) {
				this._tabButtons[tabbutton_obj._index]._setFocus();
			}
		}

		if (tabbutton_obj && this.selectchangetype == "down") {
			var idx = tabbutton_obj._index;


			oldindex = this.tabindex;
			this._iscanchange = this._changeTabIndex(idx, true);
			if (this._iscanchange == true) {
				if (this.enableevent && oldindex != this.tabindex) {
					this.on_fire_onchanged(tabbutton_obj, idx, oldindex);
				}
			}
		}

		if (this._isBtnFocusAcceptable()) {
			this._setFocusTabButton();
		}

		return ret;
	};

	_pTab._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._tabbutton_obj = null;
		return nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pTab._on_btn_lbuttonup = function (obj, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		this._tabbutton_obj = null;
		return nexacro.Component.prototype._on_lbuttonup.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pTab._on_btn_touchend = function (obj, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		this._tabbutton_obj = obj;
		return nexacro.Component.prototype._on_touchend.call(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
	};

	_pTab.on_lbuttonup_default_action = function (elem, refer_comp, canvasX, canvasY) {
		var ret = nexacro.Component.prototype.on_lbuttonup_default_action.call(this, elem, refer_comp, canvasX, canvasY);

		if (!this.visible || this._isEnable() == false) {
			return ret;
		}

		if (this._tabbutton_obj && this.selectchangetype == "up") {
			this._onclick_basic_action(this._tabbutton_obj);
		}
	};

	_pTab.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onlbuttonup", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onrbuttondown", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evt = new nexacro.TabMouseEventInfo(this, "onrbuttonup", this.tabindex, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pTab._onclick_basic_action = function (obj, is_tap, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp) {
		var idx = obj._index;

		if (idx == undefined) {
			idx = this._getExtrabuttonIdx(obj);
			if (idx >= 0 && is_tap == true) {
				this.on_fire_onextrabuttonclick(obj, idx, "none", false, false, false, screenX, screenY, canvasX, canvasY, -1, -1, fire_comp, refer_comp);
			}
		}

		oldindex = this.tabindex;

		this._iscanchange = this._changeTabIndex(idx, true);
		if (this._iscanchange == true) {
			if (this.enableevent && oldindex != this.tabindex) {
				this.on_fire_onchanged(obj, idx, oldindex);
			}
		}
	};


	_pTab.on_fire_canchange = function (obj, postindex, preindex) {
		this._is_canchange = true;

		if (this.canchange && this.canchange._has_handlers) {
			var evt = new nexacro.TabIndexChangeEventInfo(obj, "canchange", postindex, preindex);

			this._is_canchange = this.canchange._fireCheckEvent(this, evt);
			return this._is_canchange;
		}

		return true;
	};

	_pTab.on_fire_onchanged = function (obj, postindex, preindex) {
		if (this.onchanged && this.onchanged._has_handlers) {
			var evt = new nexacro.TabIndexChangeEventInfo(this, "onchanged", postindex, preindex);
			return this.onchanged._fireEvent(this, evt);
		}

		return true;
	};

	_pTab.getParentContext = function () {
		return this.parent;
	};

	_pTab.insertTabpage = function (strID, nIndex, strURL, strText) {
		if (!this._is_created) {
			return -1;
		}

		var _nIndex = parseInt(nIndex) | 0;
		var count = this._child_list.length;
		var oldtabidx = 0;

		for (var i = 0; i < count; i++) {
			var pChild = this._child_list[i];
			if (strID == pChild.text) {
				return -1;
			}
		}
		var pTabPage = new nexacro.Tabpage(strID, this);
		this._createTabpage(_nIndex, strID, pTabPage);

		if (pTabPage == null) {
			return -1;
		}

		if (_nIndex >= count) {
			_nIndex = -1;
		}

		oldtabidx = this.tabindex;

		if (this[strID]) {
			if (this[strID].name == pTabPage.name) {
				return -1;
			}
		}

		if (_nIndex == -1) {
			this[strID] = pTabPage;
			this.all.add_item(strID, pTabPage);
			this.components.add_item(strID, pTabPage);
			this.tabpages.add_item(strID, pTabPage);
			this._child_list.push(pTabPage);
			this.tabindex = _nIndex = this._child_list.length - 1;
			this._tabpagearea.set_visible(true);
			this._tabBorders[0].set_visible(true);
			this._tabBorders[1].set_visible(true);
			this._tabBorders[2].set_visible(true);
		}
		else {
			this[strID] = pTabPage;
			this.all.add_item(strID, pTabPage);

			var tabbuttonborders = this._tabButtonBorders;
			var tabextrabuttons = this._tabextrabuttons;
			var bextra = tabextrabuttons.length > 0 ? true : false;

			for (i = this._child_list.length; i > nIndex; i--) {
				this._child_list[i] = this._child_list[i - 1];
				this._buttonRect[i] = this._buttonRect[i - 1];
				this._tabButtons[i] = this._tabButtons[i - 1];
				this._tabButtons[i]._index += 1;

				if (bextra) {
					tabextrabuttons[i] = tabextrabuttons[i - 1];
					if (tabextrabuttons[i]) {
						tabextrabuttons[i]._index += 1;
					}
				}

				this._buttonWidth[i] = this._buttonWidth[i - 1];
				this._buttonHeight[i] = this._buttonHeight[i - 1];

				tabbuttonborders[i] = tabbuttonborders[i - 1];
				if (tabextrabuttons[i]) {
					tabbuttonborders[i]._index += 1;
				}
			}

			if (bextra) {
				tabextrabuttons[i] = null;
			}

			this._child_list[nIndex] = pTabPage;
			this.tabpages.insert_item(nIndex, strID, pTabPage);
			this.tabindex = _nIndex;
		}

		if (strURL) {
			pTabPage.set_url(strURL);
		}

		if (parseInt(this.tabindex) == _nIndex) {
			var oldtab = this._child_list[oldtabidx];
			if (oldtab) {
				oldtab.set_visible(false);
			}
			pTabPage.set_visible(true);
		}
		else {
			pTabPage.set_visible(false);
		}

		var tabbutton = this._tabButtons[_nIndex] = this._createTabbutton(_nIndex);
		tabbutton.createComponent();

		pTabPage._index = _nIndex;

		if (strText) {
			pTabPage.set_text(strText);
		}
		else {
			pTabPage.set_text(strID);
		}

		this._buttonRect[_nIndex] = this._getButtonSize(_nIndex);
		this._buttonHeight[_nIndex] = this._buttonRect[_nIndex].bottom - this._buttonRect[_nIndex].top;
		this._buttonWidth[_nIndex] = this._buttonRect[_nIndex].right - this._buttonRect[_nIndex].left;

		if (this._tabButtons.length == 1) {
			this.tabindex = 0;
			this._tabButtons[0]._stat_change("focus", "focused");
		}

		var buttonmargin = null;
		var right = 0;
		buttonmargin = this.currentstyle.buttonmargin;
		if (buttonmargin) {
			right = buttonmargin.right;
		}

		for (var i = this._child_list.length - 1; i > _nIndex; i--) {
			this._buttonRect[i].left += this._buttonWidth[_nIndex] + right;
			this._buttonRect[i].right += this._buttonWidth[_nIndex] + right;
		}
		if (this._isExtraButton()) {
			var extrabutton = this._createtabextrabutton(_nIndex);
			extrabutton.createComponent();

			this.on_apply_style_showextrabutton(this.currentstyle.showextrabutton);
		}

		this.extrabutton = this._tabextrabuttons ? this._tabextrabuttons[0] : null;

		if (this._child_list.length == 1) {
			this.set_visible(true);
		}

		this._rearrangeButton();
		var total = 0;
		var total_width = this._adjust_width;
		if (this.spinupbutton.visible) {
			total_width = this.spinupbutton.left;
		}

		if (nIndex < 0 || this._buttonRect[_nIndex].right > total_width) {
			total = 0;
			this._lastIndex = _nIndex;

			total = this._buttonRect[_nIndex].right;
			if (total > total_width) {
				this._resetScrollIndex(_nIndex);
			}
		}

		this._drawButton();

		return _nIndex;
	};

	_pTab.removeTabpage = function (nIndex) {
		var idx = parseInt(nIndex) | 0;
		var child_list = this._child_list;
		var len = child_list.length;
		if (len == 0) {
			return -1;
		}

		if (len > 0) {
			var tabpage = child_list[idx];

			if (!tabpage) {
				return -1;
			}

			var confirm_message = tabpage._on_beforeclose();
			if (tabpage._checkAndConfirmClose(confirm_message) == false) {
				return -1;
			}

			if (tabpage == this._last_focused) {
				this._last_focused = null;
			}

			tabpage._on_close();

			if (idx + 1 != len) {
				child_list[idx + 1].set_visible(true);
			}

			this[tabpage.id] = null;
			delete this[tabpage.id];
			this.all.delete_item(tabpage.id);
			this.components.delete_item(tabpage.id);
			this.tabpages.delete_item(tabpage.id);

			if (child_list[idx] != undefined) {
				child_list[idx].destroy();
				delete child_list[idx];
			}

			var tabButtons = this._tabButtons;
			if (tabButtons[idx] != undefined) {
				if (tabButtons[idx] == this._tabbutton_obj) {
					this._tabbutton_obj = null;
				}
				if (tabButtons[idx] == this._last_focused) {
					this._last_focused = null;
				}

				tabButtons[idx].destroy();
				delete tabButtons[idx];
			}

			var tabextrabuttons = this._tabextrabuttons;
			if (tabextrabuttons[idx] != undefined) {
				if (tabextrabuttons[idx] == this._tabbutton_obj) {
					this._tabbutton_obj = null;
				}
				if (tabextrabuttons[idx] == this._last_focused) {
					this._last_focused = null;
				}

				tabextrabuttons[idx].parent = null;
				tabextrabuttons[idx].destroy();
				tabextrabuttons[idx] = null;
				delete tabextrabuttons[idx];
			}

			var tabbuttonborders = this._tabButtonBorders;
			if (tabbuttonborders[idx] != undefined) {
				tabbuttonborders[idx].parent = null;
				tabbuttonborders[idx].destroy();
				tabbuttonborders[idx] = null;
				delete tabbuttonborders[idx];
			}
			var tabButtonleftborders = this._tabButtonLeftBorders;
			if (tabButtonleftborders[idx] != undefined) {
				tabButtonleftborders[idx].parent = null;
				tabButtonleftborders[idx].destroy();
				delete tabButtonleftborders[idx];
			}


			child_list.splice(idx, 1);
			tabButtons.splice(idx, 1);
			var bextra = false;
			if (tabextrabuttons.length > 0) {
				tabextrabuttons.splice(idx, 1);
				bextra = true;
			}
			this._buttonRect.splice(idx, 1);
			this._buttonWidth.splice(idx, 1);
			this._buttonHeight.splice(idx, 1);
			tabbuttonborders.splice(idx, 1);

			len = child_list.length;
			for (var i = 0; i < len; i++) {
				tabButtons[i]._index = i;
				child_list[i]._index = i;

				if (bextra) {
					tabextrabuttons[i]._index = i;
				}

				tabbuttonborders[i]._index = i;
			}

			if (tabextrabuttons[idx] != undefined) {
				this._tabbutton_obj = null;
			}
		}

		if (this._scrollIndex != 0) {
			this._scrollIndex--;
		}

		if (this._lastIndex != 0) {
			this._lastIndex--;
		}

		if (idx != 0 && this.tabindex == idx && this.tabindex == this._tabButtons.length) {
			this.tabindex = idx - 1;
		}
		else if (this.tabindex > idx) {
			this.tabindex -= 1;
		}


		var newtabpage = child_list[this.tabindex];
		if (newtabpage) {
			if (!this.preload) {
				if (newtabpage._isLoaded == false) {
					if (newtabpage.url != "" && newtabpage.url != undefined) {
						newtabpage._url = newtabpage.url;
						newtabpage.on_apply_url(false);
						newtabpage._isLoaded = true;
					}
				}
				this._createTabpage(this.tabindex, newtabpage.id, newtabpage);
			}
		}


		if (idx != 0 && this.tabindex == idx - 1) {
			tabButtons[idx - 1]._stat_change("focus", "focused");
		}

		this.extrabutton = this._tabextrabuttons ? this._tabextrabuttons[0] : null;

		this._rearrangeButton();
		this._drawButton();

		if (child_list.length == 0) {
			this.set_visible(false);
		}

		return 0;
	};

	_pTab.exchangeTabpage = function (nFromIndex, nToIndex) {
		var buttonmargin = this.currentstyle.buttonmargin;

		var child_list = this._child_list;
		if (child_list[nToIndex] && child_list[nFromIndex]) {
			var temp = child_list[nFromIndex];
			child_list[nFromIndex] = child_list[nToIndex];
			child_list[nToIndex] = temp;

			var tabButtons = this._tabButtons;
			temp = tabButtons[nFromIndex];
			tabButtons[nFromIndex] = tabButtons[nToIndex];
			tabButtons[nToIndex] = temp;

			var buttonRect = this._buttonRect;
			temp = buttonRect[nFromIndex];
			buttonRect[nFromIndex] = buttonRect[nToIndex];
			buttonRect[nToIndex] = temp;

			var start = nFromIndex > nToIndex ? nToIndex : nFromIndex;
			var end = nFromIndex > nToIndex ? nFromIndex : nToIndex;

			var fromrc = this._buttonRect[start];
			var torc = this._buttonRect[end];

			fromrc.left = torc.left;
			fromrc.right = fromrc.left + this._buttonWidth[end];

			var gap = buttonRect[start].right - buttonRect[start + 1].left + buttonmargin.right;
			if (gap != buttonmargin.right) {
				for (var i = start + 1; i <= end; i++) {
					buttonRect[i].left += gap;
					buttonRect[i].right += gap;
				}
			}

			torc.left = buttonRect[end - 1].right + buttonmargin.right;
			torc.right = torc.left + this._buttonWidth[start];

			if (buttonRect[end + 1]) {
				gap = buttonRect[end].right - buttonRect[end + 1].left + buttonmargin.right;
				if (gap != buttonmargin.right) {
					var len = buttonRect.length;
					for (var i = end + 1; i < len; i++) {
						buttonRect[i].left += gap;
						buttonRect[i].right += gap;
					}
				}
			}

			var tabextrabuttons = this._tabextrabuttons;
			temp = tabextrabuttons[nFromIndex];
			tabextrabuttons[nFromIndex] = tabextrabuttons[nToIndex];
			tabextrabuttons[nToIndex] = temp;

			var buttonWidth = this._buttonWidth;
			temp = buttonWidth[nFromIndex];
			buttonWidth[nFromIndex] = buttonWidth[nToIndex];
			buttonWidth[nToIndex] = temp;

			var buttonHeight = this._buttonHeight;
			temp = buttonHeight[nFromIndex];
			buttonHeight[nFromIndex] = buttonHeight[nToIndex];
			buttonHeight[nToIndex] = temp;

			if (this.tabindex == nFromIndex) {
				this.tabindex = nToIndex;
			}
			else if (this.tabindex == nToIndex) {
				this.tabindex = nFromIndex;
			}

			this.extrabutton = this._tabextrabuttons ? this._tabextrabuttons[0] : null;

			this._rearrangeButton();
			this._drawButton();
		}
	};

	_pTab.moveTabpage = function (nFromIndex, nToIndex) {
		var child_list = this._child_list;
		var len = child_list.length;
		if (nToIndex < 0 || len <= nToIndex || len <= nFromIndex || nFromIndex < 0) {
			return -1;
		}

		if (nFromIndex == nToIndex) {
			return -1;
		}

		var tabindex = this.tabindex;
		var tabpage = null, tabbutton = null, buttonrc = null, buttonwidth = null, buttonheight = null;
		tabpage = child_list[tabindex];

		var idxtabpage = tabpage.id;

		var totabpage = child_list[nToIndex];
		var fromtabpage = child_list[nFromIndex];

		var tabButtons = this._tabButtons;
		var tobutton = tabButtons[nToIndex];
		var frombutton = tabButtons[nFromIndex];

		var buttonRect = this._buttonRect;
		var tobuttonrc = buttonRect[nToIndex];
		var frombuttonrc = buttonRect[nFromIndex];

		var buttonWidth = this._buttonWidth;
		var tobuttonwidth = buttonWidth[nToIndex];
		var frombuttonwidth = buttonWidth[nFromIndex];

		var buttonHeight = this._buttonHeight;
		var tobuttonheight = buttonHeight[nToIndex];
		var frombuttonheight = buttonHeight[nFromIndex];

		if (nFromIndex < nToIndex) {
			for (var i = nFromIndex + 1; i < len; i++) {
				child_list[i - 1] = child_list[i];
				child_list[i - 1]._index = i - 1;
				tabButtons[i - 1] = tabButtons[i];
				tabButtons[i - 1]._index = i - 1;
				buttonRect[i - 1] = buttonRect[i];
				buttonWidth[i - 1] = buttonWidth[i];
				buttonHeight[i - 1] = buttonHeight[i];

				if (i == nToIndex) {
					child_list[i] = fromtabpage;
					child_list[i]._index = i;
					tabButtons[i] = frombutton;
					tabButtons[i]._index = i;
					buttonRect[i] = frombuttonrc;
					buttonWidth[i] = frombuttonwidth;
					buttonHeight[i] = frombuttonheight;
					break;
				}
			}
		}
		else {
			for (var i = nFromIndex; i > nToIndex; i--) {
				child_list[i] = child_list[i - 1];
				child_list[i]._index = i;
				tabButtons[i] = tabButtons[i - 1];
				tabButtons[i]._index = i;
				buttonRect[i] = buttonRect[i - 1];
				buttonWidth[i] = buttonWidth[i - 1];
				buttonHeight[i] = buttonHeight[i - 1];
			}

			child_list[i] = fromtabpage;
			child_list[i]._index = i;
			tabButtons[i] = frombutton;
			tabButtons[i]._index = i;
			buttonRect[i] = frombuttonrc;
			buttonWidth[i] = frombuttonwidth;
			buttonHeight[i] = frombuttonheight;
		}

		len = child_list.length;
		for (var i = 0; i < len; i++) {
			if (idxtabpage == child_list[i].id) {
				this.tabindex = i;
			}
		}

		this._scrollIndex = 0;
		var spinsize = this._getSpinSize();
		var s = 2 * spinsize[0] + 2;

		var spinsize = this._getSpinSize();
		var s = 2 * spinsize[0] + 2;
		var buttonSize = 0;
		var viewCount = 0;
		for (var i = 0, n = buttonWidth.length; i < n; i++) {
			buttonSize += buttonWidth[i];
			s += buttonSize;

			if (this._orgwidth < buttonSize) {
				if (this._orgwidth < s) {
					viewCount = i - 1;
					break;
				}
			}

			viewCount = i;
		}

		if (viewCount >= this.tabindex) {
			this._scrollIndex = 0;
		}
		else {
			this._scrollIndex = this.tabindex - (this._scrollIndex + viewCount);
		}

		this.extrabutton = this._tabextrabuttons ? this._tabextrabuttons[0] : null;

		this._rearrangeButton();
		this._drawButton();

		return 0;
	};

	_pTab.getTabpageCount = function () {
		return this._child_list.length;
	};

	_pTab.getIndex = function (nXPos, nYPos) {
		var tabindex = this._GetTabIndex(parseInt(nXPos, 10), parseInt(nYPos, 10));
		return tabindex;
	};

	_pTab.addChild = function (id, obj) {
		var ret = -1;

		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			return -1;
		}

		if (this[id]) {
			return -1;
		}
		if (!(obj instanceof nexacro.Tabpage)) {
			return -1;
		}

		obj._refform = this;
		obj._index = this._child_list ? this._child_list.length : 0;

		this[id] = obj;
		this.all.add_item(id, obj);

		ret = this.components.add_item(id, obj);
		this.tabpages = this.components;
		this._child_list.push(obj);

		if (this.preload || this._child_list[this._setidx] == obj) {
			obj._url = obj.url;
			obj.on_apply_url(obj.async);
		}

		if (!obj._url) {
			obj._is_loaded = true;
		}
	};

	_pTab._on_beforeclose = function (root_closing_comp) {
		if (!this._is_alive) {
			return;
		}

		if (!root_closing_comp) {
			root_closing_comp = this;
		}
		var msg = "";

		var tabpages = this.tabpages;
		var len = tabpages.length;
		for (var i = 0; i < len; i++) {
			var tabpage = tabpages[i];
			if (!tabpage._isLoaded) {
				continue;
			}
			var tabpage_msg = tabpage._on_beforeclose(root_closing_comp);
			msg = this._appendBeforeCloseMsg(msg, tabpage_msg);
		}

		return msg;
	};

	_pTab._on_close = function () {
		if (!this._is_alive) {
			return;
		}

		var tabpages = this.tabpages;
		var len = tabpages.length;
		for (var i = 0; i < len; i++) {
			var tabpage = tabpages[i];
			if (!tabpage._isLoaded) {
				continue;
			}
			tabpage._on_close();
		}
	};

	_pTab.on_apply_addChild = function () {
		var id, obj;
		var comps = this.components;
		var len = comps.length;
		var pseudo = this._pseudo;


		for (var i = 0; i < len; i++) {
			var tabbutton = this._createTabbutton(i);
			tabbutton.createComponent();
			this._tabButtonBorders[i].createComponent();
		}

		this._rearrangeButton();

		if (this._child_list[0]) {
			this._child_list[0]._on_activate();
		}

		this._drawButton();


		var isextrabutton = this._isExtraButton();
		for (var i = 0; i < len; i++) {
			obj = comps[i];
			id = obj.id;

			if (isextrabutton) {
				var extrabutton = this._createtabextrabutton(i);
				extrabutton.createComponent();

				this.on_apply_style_showextrabutton(this.currentstyle.showextrabutton);
			}

			if (this._setidx == i) {
				if (obj.url != "" && obj.url != undefined) {
					obj._url = obj.url;
					obj._isLoaded = true;
				}

				obj.set_visible(true);
				this._createTabpage(i, id, obj);
				obj.initProperties();
			}
			else {
				if (this.preload) {
					this._createTabpage(i, id, obj);
				}

				obj.set_visible(false);
			}
		}

		this.extrabutton = this._tabextrabuttons ? this._tabextrabuttons[0] : null;
	};

	_pTab._getExtrabuttonIdx = function (extrBtnObj) {
		var btns = this._tabextrabuttons;
		var len = btns.length;

		for (var i = 0; i < len; i++) {
			if (btns[i] == extrBtnObj) {
				return i;
			}
		}
		return -1;
	};

	_pTab._saveImageSize = function (imgurl, w, h) {
		this._imagewidth = w;
		this._imageheight = h;

		this._rearrangeButton();
		this._drawButton();
	};

	_pTab._getImgSize = function () {
		var back = this._find_pseudo_obj("buttonbackground", this._pseudo, "background");
		if (!back) {
			return;
		}

		var imagesize = null;

		imagesize = nexacro._getImageSize(back.image, this._saveImageSize, this, undefined, back.image);
		if (imagesize) {
			this._imagewidth = imagesize.width;
			this._imageheight = imagesize.height;
		}
	};

	_pTab._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var focusobj = this._focusobj;
		if (focusobj && !(focusobj instanceof nexacro.TabComponent)) {
			return focusobj._getDlgCode(keycode, altKey, ctrlKey, shiftKey);
		}
		else {
			return {
				want_tab : shiftKey ? false : true, 
				want_return : false, 
				want_escape : false, 
				want_chars : false, 
				want_arrows : keycode == nexacro.Event.KEY_UP ? false : true
			};
		}
	};

	_pTab._createTabBorder = function () {
		var leftborder = new nexacro.TabBorderCtrl("tableftborder", this.position, 0, 0, 0, 0, null, null, this);
		this._tabBorders[0] = leftborder;
		leftborder._is_subcontrol = true;

		var rightborder = new nexacro.TabBorderCtrl("tabrightborder", this.position, 0, 0, 0, 0, null, null, this);
		this._tabBorders[1] = rightborder;
		rightborder._is_subcontrol = true;

		var centerborder = new nexacro.TabBorderCtrl("tabcenterborder", this.position, 0, 0, 0, 0, null, null, this);
		this._tabBorders[2] = centerborder;
		centerborder._is_subcontrol = true;

		leftborder.createComponent();
		rightborder.createComponent();
		centerborder.createComponent();
	};

	_pTab._createTabbutton = function (idx) {
		if (idx < 0) {
			idx = this._child_list.length - 1;
		}

		var btnOrgWidth = 0;

		var tabpage = this._child_list[idx];
		var tabWidth = 0;
		var buttonmargin = this.on_find_CurrentStyle_buttonmargin(this._pseudo);

		if (idx == 0) {
			tabWidth = 0;
		}
		else {
			tabWidth = this._buttonRect[idx - 1].right + buttonmargin.right;
		}

		var rc = this._getButtonSize(idx);

		switch (this._getTabPosition()) {
			case "top":
				this._buttonRect[idx] = {
					left : tabWidth, 
					top : 0, 
					right : tabWidth + rc.right, 
					bottom : rc.bottom
				};
				break;
			case "left":
				this._buttonRect[idx] = {
					left : tabWidth, 
					top : 0, 
					right : tabWidth + rc.right, 
					bottom : rc.bottom
				};
				break;
			case "bottom":
				this._buttonRect[idx] = {
					left : tabWidth, 
					top : 0, 
					right : tabWidth + rc.right, 
					bottom : rc.bottom
				};
				break;
			case "right":
				this._buttonRect[idx] = {
					left : tabWidth, 
					top : 0, 
					right : tabWidth + rc.right, 
					bottom : rc.bottom
				};
				break;
		}

		var btn = new nexacro.TabButtonCtrl(tabpage.id + "_tabbutton", this.position, 0, 0, 1, 1, null, null, this);

		var rc = this._buttonRect[idx];
		var l = rc.left;
		var t = rc.top;
		var r = rc.right;
		var b = rc.bottom;
		var rctemp = {
			left : l, 
			top : t, 
			right : r, 
			bottom : b
		};

		this._buttonWidth[idx] = rctemp.right - rctemp.left;
		this._buttonHeight[idx] = rctemp.bottom - rctemp.top;

		this._tabButtons[idx] = btn;
		btn.selected = true;
		btn._is_subcontrol = true;
		btn._index = idx;
		btn.set_text(tabpage.text);

		var button_rect = this._buttonRect[idx];
		this._tabButtonBorders[idx] = new nexacro.TabButtonBorderCtrl(tabpage.id + "tabbuttonborder", this.position, button_rect.left, button_rect.top, button_rect.width, button_rect.height, null, null, this);
		this._tabButtonBorders[idx]._index = idx;

		this._tabButtonBorders[idx].set_visible(false);
		this._tabButtonLeftBorders[idx] = new nexacro.TabButtonBorderCtrl("tabbuttonleftborder", this.position, button_rect.left, button_rect.top, button_rect.width, button_rect.height, null, null, this);
		this._tabButtonLeftBorders[idx].createComponent();
		this._tabButtonLeftBorders[idx].set_visible(false);

		return btn;
	};

	_pTab._setFocusTabButton = function (newindex, oldindex) {
		if (newindex == null) {
			newindex = this.tabindex;
		}
		if (oldindex == null) {
			oldindex = this._oldtabindex;
		}

		if (this._tabButtonBorders[oldindex] != null) {
			this._tabButtonBorders[oldindex].set_visible(false);
		}

		if (this._tabButtonBorders[newindex] != null) {
			if (newindex == this.tabindex) {
				this._tabButtonBorders[newindex].set_visible(true);
				var bordertype = this.on_find_CurrentStyle_buttonbordertype(this._pseudo);
				if (bordertype) {
					this._tabButtonBorders[newindex].style.set_bordertype(bordertype);
				}
				if (this.style.focusborder) {
					this._tabButtonBorders[newindex].style.set_border(this.style.focusborder._value);
				}
				if (this._buttonRect[newindex] != null) {
					var rc = this._buttonRect[newindex];
					var border = this.on_find_CurrentStyle_buttonborder(this._pseudo);
					var addsize = 1;
					if (border) {
						addsize += border._top_width;
					}

					var left = rc.left + addsize;
					var top = rc.top + addsize;
					var width = rc.right - left - addsize;
					var height = rc.bottom - top - addsize;

					this._tabButtonBorders[newindex].move(left, top, width, height);
				}
			}
			else {
				this._tabButtonBorders[newindex].set_visible(false);
			}
		}
	};

	_pTab._createtabextrabutton = function (idx) {
		var extrabtn = null;
		if (this._tabextrabuttons[idx]) {
			extrabtn = this._tabextrabuttons[idx];
		}
		else {
			extrabtn = new nexacro.TabExtraButtonCtrl("extrabutton", this.position, 0, 0, 20, 10, null, null, this);
			this._tabextrabuttons[idx] = extrabtn;
			extrabtn._is_subcontrol = true;
			extrabtn._index = idx;
			extrabtn.set_visible(false);
		}
		this._buttonWidth[idx] += extrabtn._client_width;

		extrabtn.parent = this;


		return extrabtn;
	};

	_pTab._createTabpage = function (idx, id, obj) {
		if (obj == null) {
			return obj;
		}

		obj._refobj = this;
		obj._index = idx;

		obj._applyClientPadding = false;
		obj._preLoad(this.preload);

		obj.createComponent();

		obj.on_apply_prop_tooltip();
	};

	_pTab._checkContainerTabFocus = function () {
		if (nexacro._enableaccessibility && this._isAccessibilityEnable() == true) {
			return true;
		}

		return this._isBtnFocusAcceptable();
	};

	_pTab._on_getAccessibilityAdditionalLabel = function () {
		return this.tabindex + " " + this.tabpages.length;
	};

	_pTab.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var next_obj = null;
		var tabindex = this._getTabIndex();

		if (direction) {
			if (this._accessibility_tabindex == tabindex) {
				next_obj = this._child_list[tabindex];
			}
			else {
				this._accessibility_tabindex++;
				if (this._accessibility_tabindex < this.tabpages.length) {
					next_obj = this._tabButtons[this._accessibility_tabindex];
				}
				else {
					this._accessibility_tabindex = -1;
					this._accessibility_is_next = true;
					next_obj = this.parent._searchNextTabFocus(this, undefined, undefined, true)[0];
				}
			}
		}
		else {
			if (this._accessibility_tabindex == tabindex) {
				this._accessibility_tabindex--;
				next_obj = this._tabButtons[this._accessibility_tabindex];
			}
			else {
				this._accessibility_tabindex--;
				if (this._accessibility_tabindex >= 0) {
					if (this._accessibility_tabindex == tabindex) {
						next_obj = this._child_list[tabindex];
					}
					else {
						next_obj = this._tabButtons[this._accessibility_tabindex];
					}
				}
			}
		}

		if (next_obj) {
			next_obj._setAccessibilityNotifyEvent(direction);
			return true;
		}
		return false;
	};

	_pTab._setRtlDirectionOfComps = function (comps) {
		var _rtldirection = this._rtldirection;

		var len = comps.length;
		for (var i = 0; i < len; i++) {
			var comp = comps[i];
			if (comp) {
				comp._setRtlDirection(_rtldirection);
			}
		}
	};

	_pTab.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;

		if (this._tabpagearea) {
			this._tabpagearea._setRtlDirection(_rtldirection);
		}

		if (this.spinupbutton) {
			this.spinupbutton._setRtlDirection(_rtldirection);
		}
		if (this.spindownbutton) {
			this.spindownbutton._setRtlDirection(_rtldirection);
		}

		this._setRtlDirectionOfComps(this.tabpages);
		this._setRtlDirectionOfComps(this._tabButtons);
		this._setRtlDirectionOfComps(this._tabButtonBorders);
		this._setRtlDirectionOfComps(this._tabButtonLeftBorders);
		this._setRtlDirectionOfComps(this._tabBorders);
		this._setRtlDirectionOfComps(this._tabextrabuttons);

		if (this.extrabutton) {
			this.extrabutton._setRtlDirection(_rtldirection);
		}
	};

	delete _pTab;
}

if (!nexacro.TabExtraButtonCtrl) {
	nexacro.TabExtraButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._index = 0;
		this._flag = false;
		this._is_reference_control = false;
		this._accessibility_role = "tabitem";
	};

	var _pTabExtraButtonCtrl = nexacro.TabExtraButtonCtrl.prototype = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.TabExtraButtonCtrl);

	_pTabExtraButtonCtrl._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return this.parent._on_btn_lbuttondown(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);
	};
	_pTabExtraButtonCtrl._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return this.parent._on_btn_lbuttonup(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);
	};
	_pTabExtraButtonCtrl._on_touchstart = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return this.parent._on_btn_touchstart(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
	};
	_pTabExtraButtonCtrl._on_touchend = function (touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return this.parent._on_btn_touchend(this, touch_manager, touchinfos, changedtouchinfos, event_bubbles, fire_comp, refer_comp);
	};
	_pTabExtraButtonCtrl._on_mousemove = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return this.parent._on_btn_mousemove(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};
	_pTabExtraButtonCtrl.on_apply_style_align = function (align) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_align(align);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_align.call(this, align);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_background = function (background) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_background(background);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_background.call(this, background);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_border = function (border) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_border(border);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_border.call(this, border);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_bordertype = function (bordertype) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_bordertype(bordertype);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_bordertype.call(this, bordertype);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_color = function (color) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_color(color);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_color.call(this, color);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_cursor = function (cursor) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_cursor(cursor);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_cursor.call(this, cursor);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_font = function (font) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_font(font);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_font.call(this, font);
		}
	};

	_pTabExtraButtonCtrl.on_apply_style_letterspace = function (letterspace) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_letterspace(letterspace);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_letterspace.call(this, letterspace);
		}
	};

	_pTabExtraButtonCtrl.on_apply_style_gradation = function (gradation) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_gradation(gradation);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_gradation.call(this, gradation);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_image = function (image) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_image(image);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_image.call(this, image);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_imagealign = function (imagealign) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_imagealign(imagealign);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_imagealign.call(this, imagealign);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_opacity = function (opacity) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_opacity(opacity);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_opacity.call(this, opacity);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_padding = function (padding) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_padding(padding);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_padding.call(this, padding);
		}
	};
	_pTabExtraButtonCtrl.on_apply_style_shadow = function (shadow) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].on_apply_style_shadow(shadow);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Button.prototype.on_apply_style_shadow.call(this, shadow);
		}
	};
	_pTabExtraButtonCtrl.set_style = function (v) {
		var extrabuttons = this.parent._tabextrabuttons;
		var len = extrabuttons ? extrabuttons.length : 0;
		if (len > 0) {
			if (this._index == 0 && !extrabuttons[this._index]._flag) {
				for (var i = 0; i < len; i++) {
					extrabuttons[i]._flag = true;
					extrabuttons[i].set_style(v);
					extrabuttons[i]._flag = false;
				}
				return;
			}

			nexacro.Component.prototype.set_style.call(this, v);
		}
	};
	delete _pTabExtraButtonCtrl;
}

if (!nexacro.TabButtonCtrl) {
	nexacro.TabButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._iscanchange = true;
		this._index = 0;
		this._is_reference_control = false;
		this._accessibility_role = "tabitem";
	};

	var _pTabButtonCtrl = nexacro.TabButtonCtrl.prototype = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.TabButtonCtrl);

	_pTabButtonCtrl.on_find_CurrentStyle_align = function (pseudo) {
		var align = this._find_pseudo_obj("align", pseudo, "align");
		if (!align) {
			align = nexacro._getCachedStyleObj("align", "center middle");
		}
		return align;
	};

	_pTabButtonCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent._find_pseudo_obj("buttonbackground", pseudo, "background");
	};
	_pTabButtonCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent._find_pseudo_obj("buttongradation", pseudo, "gradation");
	};
	_pTabButtonCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent._find_pseudo_obj("buttonborder", pseudo, "border");
	};
	_pTabButtonCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("buttonbordertype", pseudo, "bordertype");
	};
	_pTabButtonCtrl.on_find_CurrentStyle_padding = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonpadding(pseudo);
	};
	_pTabButtonCtrl.on_find_CurrentStyle_margin = function (pseudo) {
		return this.parent.on_find_CurrentStyle_buttonmargin(pseudo);
	};
	_pTabButtonCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent.on_find_CurrentStyle_color(pseudo);
	};

	_pTabButtonCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pTabButtonCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_font(pseudo);
	};

	_pTabButtonCtrl.on_find_CurrentStyle_letterspace = function (pseudo) {
		return this.parent.on_find_CurrentStyle_letterspace(pseudo);
	};

	_pTabButtonCtrl.on_apply_style_border = function (border) {
		var control_elem = this._control_element;
		if (control_elem) {
			var curstyle = this.currentstyle;
			this._setElementBorder(this.getElement(), border, curstyle.bordertype);
			control_elem.setElementBackground(curstyle.background, curstyle.gradation);
			this._updateClientSize(control_elem);
		}
	};

	_pTabButtonCtrl.on_apply_style_color = function (color) {
		if (this._text_elem) {
			this._text_elem.setElementColor(color);
		}
	};

	_pTabButtonCtrl.on_apply_style_align = function (align) {
		if (this._text_elem && align) {
			var halign = align.halign == "" ? "center" : align._halign;
			var valign = align.valign == "" ? "middle" : align._valign;
			if (this._img_elem && this.currentstyle.imagealign) {
				this._updateElementPositions(align, this.currentstyle.imagealign);
			}
			else {
				this._text_elem.setElementAlignXY(halign, valign);
				nexacro._updateTextElementPositions(this);
			}
		}
		else {
			this.currentstyle.align = "";
		}
	};

	_pTabButtonCtrl.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
			if (this._img_elem && this.currentstyle.align && this.currentstyle.imagealign) {
				this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
			}
		}
	};

	_pTabButtonCtrl.on_apply_style_letterspace = function (letterspace) {
		if (this._text_elem) {
			this._text_elem.setElementLetterSpace(letterspace);
			if (this._img_elem && this.currentstyle.align && this.currentstyle.imagealign) {
				this._updateElementPositions(this.currentstyle.align, this.currentstyle.imagealign);
			}
		}
	};

	_pTabButtonCtrl.on_change_status = function (status, pseudo) {
		var objTab = this.parent;

		if ((pseudo == "normal" || pseudo == "mouseover" || pseudo == "pushed") && (objTab._tabButtons && objTab._tabButtons[objTab.tabindex] && this.name == objTab._tabButtons[objTab.tabindex].name)) {
			status = "select";
		}

		if (status == "") {
			this._status = "enable";
		}


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
				this.enable = false;
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
				if (this._status != "disable" || this._use_enable) {
					this._status = "enable";
					pseudo = "selected";
				}
				break;
			case "notselect":
				this._selected = false;
				if (this._status != "disable") {
					this._status = "enable";
				}
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
		this._setElementBorder(this.getElement(), this.currentstyle.border, this.currentstyle.bordertype);
		this.parent._drawButton();
	};

	_pTabButtonCtrl._setElementBorder = function (control, border, bordertype) {
		if (!border) {
			return;
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			return;
		}

		var b = border.clone();

		b._linecnt = 4;

		var position = this.parent._getTabPosition();

		if (position == "top") {
			b.set_bottom_width("0");
		}
		else if (position == "bottom") {
			b.set_top_width("0");
		}
		else if (position == "left") {
			b.set_right_width("0");
		}
		else if (position == "right") {
			b.set_left_width("0");
		}

		control.setElementBorder(b, bordertype);
	};


	_pTabButtonCtrl._setElementPosition = function (control, l, t, w, h, noStep) {
		if (this._popup) {
			l = 0;
			t = 0;
		}

		if (w < 0) {
			w = 0;
		}

		if (h < 0) {
			h = 0;
		}

		control.setElementPosition(l, t);
		control.setElementSize(w, h);
		this._updateClientSize(control);
	};

	_pTabButtonCtrl._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_arrow = true;
		if (keycode == nexacro.Event.KEY_UP) {
			var _tab = this.parent;
			if (!_tab._isAccessibilityEnable()) {
				_want_arrow = false;
			}
		}

		return {
			want_tab : shiftKey ? false : true, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrow
		};
	};

	_pTabButtonCtrl._updateAll = function (pseudo) {
		this._control_pseudo = "";
		this._contents_pseudo = "";
		this._stat_change(this._status, pseudo);
	};

	_pTabButtonCtrl.on_apply_custom_setfocus = function (evt_name) {
		if (this.parent._isBtnFocusAcceptable()) {
			nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
		}
		else {
			this.parent.tabpages[this._index].on_apply_custom_setfocus(evt_name);
		}
	};

	_pTabButtonCtrl._setAccessibilityNotifyEvent = function (direction) {
		var tab_comp = this.parent;
		if (tab_comp._accessibility_tabindex < 0 && tab_comp._tabButtons && tab_comp._tabButtons.length > 0) {
			if (direction) {
				tab_comp._accessibility_tabindex = 0;
			}
			else {
				tab_comp._accessibility_tabindex = tab_comp.tabpages.length - 1;
			}
			return tab_comp._tabButtons[tab_comp._accessibility_tabindex]._setAccessibilityNotifyEvent(direction);
		}
		else {
			tab_comp._accessibility_tabindex = this._index;
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	_pTabButtonCtrl._on_sys_lbuttondown = function (node, e) {
		var ret = this._on_lbuttondown(node, e);
		return ret;
	};

	_pTabButtonCtrl._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		this._on_focus(true);

		var ret = this.parent._on_btn_lbuttondown(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);



		return ret;
	};

	_pTabButtonCtrl._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return this.parent._on_btn_lbuttonup(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);
	};

	_pTabButtonCtrl._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		this._setTabFocusObj(this);

		if (this.parent._isBtnFocusAcceptable()) {
			this.parent._child_list[this._index]._last_focused = null;
		}
	};

	_pTabButtonCtrl._on_touch_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, isTap) {
		if (!this._is_alive) {
			return;
		}

		this._on_focus(true);

		var ret = this.parent._on_btn_lbuttondown(this, elem, button, alt_key, ctrl_key, shift_key, canvasX + this._adjust_left, canvasY, screenX + this._adjust_left, screenY, event_bubbles, fire_comp, refer_comp);
	};


	_pTabButtonCtrl._setTabFocusObj = function (focusobj) {
		if (!this._is_alive) {
			return;
		}

		this.parent._focusobj = focusobj;
	};

	_pTabButtonCtrl._getTabFocusObj = function () {
		if (!this._is_alive) {
			return;
		}

		return this.parent._focusobj;
	};

	_pTabButtonCtrl.on_tap_basic_action = function (elem, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp) {
		if (!this._is_alive) {
			return;
		}

		var ret = nexacro.Component.prototype.on_tap_basic_action.call(this, elem, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp);
		this.parent._onclick_basic_action(this, true, canvasX, canvasY, screenX, screenY, fire_comp, refer_comp);

		return ret;
	};

	_pTabButtonCtrl.on_fire_sys_onkeydown = function (key_code, alt_key, ctrl_key, shift_key, from_comp, from_refer_comp) {
		if (this.parent._keydown_filter(null, key_code, alt_key, ctrl_key, shift_key, undefined, from_comp, from_refer_comp)) {
			return true;
		}

		if (this.parent.onkeydown && this.parent.onkeydown._has_handlers) {
			var page = this.parent._child_list[this.tabindex];
			var evt = new nexacro.KeyEventInfo(this, "onkeydown", alt_key, ctrl_key, shift_key, key_code, page, page);

			this._on_focus(true);

			return this.parent.onkeydown._fireSysEvent(this, evt);
		}


		return true;
	};

	delete _pTabButtonCtrl;
}
if (!nexacro.TabPageArea) {
	nexacro.TabPageArea = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.DivCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._is_reference_control = false;
	};

	var _pTabPageArea = nexacro._createPrototype(nexacro.DivCtrl, nexacro.TabPageArea);
	nexacro.TabPageArea.prototype = _pTabPageArea;

	_pTabPageArea._type_ame = "TabPageArea";

	_pTabPageArea.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent.on_find_CurrentStyle_cursor(pseudo);
	};

	_pTabPageArea.on_find_CurrentStyle_border = function (pseudo) {
		var border = this.parent._find_pseudo_obj("border", pseudo, "border");

		var b = border.clone();
		var position = this.parent._getTabPosition();

		b._linecnt = 4;

		if (position == "top") {
			b.set_top_width("0");
		}
		else if (position == "bottom") {
			b.set_bottom_width("0");
		}
		else if (position == "left") {
			b.set_left_width("0");
		}
		else if (position == "right") {
			b.set_right_width("0");
		}

		return b;
	};

	_pTabPageArea.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pTabPageArea.resetScroll = function () {
		this._onRecalcScrollSize();
		this._onResetScrollBar();
	};

	_pTabPageArea._onRecalcScrollSize = function (fromComp) {
		var control_elem = this._control_element;
		if (control_elem && this._is_scrollable) {
			var w = 0, h = 0;
			if (!fromComp) {
				var comps = this.components;
				for (var i = 0, n = comps.length; i < n; i++) {
					var comp = comps[i];
					if (comp && comp.visible) {
						w = Math.max(w, comp.getOffsetRight());
						h = Math.max(h, comp.getOffsetBottom());
					}
				}
				control_elem.setElementScrollMaxSize(w, h);
			}
			else if (fromComp.visible) {
				var curMaxWidth = control_elem.container_maxwidth;
				var curMaxHeight = control_elem.container_maxheight;

				var offsetRight = fromComp.getOffsetRight();
				var offsetBottom = fromComp.getOffsetBottom();

				if (curMaxWidth < offsetRight || curMaxHeight < offsetBottom) {
					w = Math.max(curMaxWidth, offsetRight);
					h = Math.max(curMaxHeight, offsetBottom);
					control_elem.setElementScrollMaxSize(w, h);
				}
			}
		}
	};

	_pTabPageArea.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		this.resetScroll();
	};

	delete _pTabPageArea;
}

if (!nexacro.Tabpage) {
	nexacro.Tabpage = function (id, parent) {
		nexacro.Div.call(this, id, "absolute", 0, 0, 0, 0, null, null, parent);

		this._isSelfstyle = true;
		this._isLoaded = false;

		this.enableflag = true;
		this._index = 0;
		this.text = "";
		this._url = "";

		this._is_reference_control = false;
		this._accessibility_role = "tabpage";
		this._want_tab = false;
		this._want_arrow = true;

		this._apply_client_padding = false;
	};

	var _pTabPage = nexacro._createPrototype(nexacro.Div, nexacro.Tabpage);
	nexacro.Tabpage.prototype = _pTabPage;

	_pTabPage._type_name = "Tabpage";

	_pTabPage.bringToFront = null;
	_pTabPage.bringToPrev = null;
	_pTabPage.moveToNext = null;
	_pTabPage.moveToPrev = null;
	_pTabPage.sendToBack = null;
	_pTabPage.sendToNext = null;

	_pTabPage.on_find_CurrentStyle_background = function (pseudo) {
		return this._find_pseudo_obj("background", pseudo, "background");
	};

	_pTabPage.on_find_CurrentStyle_gradation = function (pseudo) {
		return this._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pTabPage.on_find_CurrentStyle_margin = function (pseudo) {
		return this._find_pseudo_obj("margin", pseudo, "margin");
	};

	_pTabPage.on_find_CurrentStyle_padding = function (pseudo) {
		return this._find_pseudo_obj("padding", pseudo, "padding");
	};

	_pTabPage.on_get_style_accessibility_label = function () {
		return this.text;
	};

	_pTabPage.addChild = function (id, obj) {
		var ret = -1;

		if (id && id.length <= 0) {
			return -1;
		}
		if (!obj) {
			return -1;
		}

		if (this[id]) {
			return -1;
		}
		if (!obj._type_name) {
			return -1;
		}

		obj.parent = this;
		obj._refform = this;

		this[id] = obj;
		this.all.add_item(id, obj);

		if (obj._is_component) {
			ret = this.components.add_item(id, obj);
			this._child_list.push(obj);
		}
		else if (obj instanceof nexacro.BindItem) {
			ret = this.binds.add_item(id, obj);
		}
		else {
			ret = this.objects.add_item(id, obj);
		}

		return ret;
	};

	_pTabPage.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;

		var child_list = this._child_list;
		var len = child_list.length;

		for (var i = 0; i < len; i++) {
			var comp = child_list[i];
			comp._setRtlDirection(_rtldirection);
		}
	};

	_pTabPage.set_url = function (v) {
		if (v != this.url) {
			this.url = v;
			if ((this.parent instanceof nexacro.TabComponent) && this.parent._is_created == true) {
				if (v.substring(0, 4).toLowerCase() == "url(") {
					v = v.substring(4, v.length - 1);
				}

				this._url = v;
				this.on_apply_url(this.async);
			}
		}
	};


	_pTabPage.on_apply_url = function (bsync) {
		if (this._url && this._url.length > 0) {
			this._urlloading = true;
			this._setstylecomplete = false;

			application.getLayoutManager().clearLayout(this);

			var _parent = this.parent;
			while (!_parent._url) {
				_parent = _parent.parent;
			}
			if (this._apply_client_padding) {
				this._delete_text();
			}

			this.loadForm(this._url, bsync, true, _parent._url);

			this._isLoaded = true;
		}
		else {
			this.on_apply_emptyurl();
			this.on_apply_applystyletype();
		}
	};

	_pTabPage.set_text = function (v) {
		var text = nexacro._toString(v);
		if (this.text == text) {
			return;
		}

		this.text = text;

		var TabComp = this.parent;
		var btn = null;
		if (TabComp) {
			if (TabComp._tabButtons.length > 0) {
				btn = TabComp._tabButtons[this._index];
				if (btn && btn.id != this.id) {
					btn.set_text(this.text);
					TabComp._recalcLayout();
				}
			}
		}
	};

	nexacro._is_enable_setting = false;
	_pTabPage.set_enable = function (v) {
		v = nexacro._toBoolean(v);
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
			var enable_flag = (this.parent._real_enable && v);
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
	};

	_pTabPage.on_apply_text = function () {
	};

	_pTabPage.on_apply_prop_tooltip = function () {
		var control = this.getElement();
		if (control) {
			control.setElementToolTip(this.tooltiptext);
		}
	};

	_pTabPage.on_apply_prop_enable = function (v) {
		nexacro.Form.prototype.on_apply_prop_enable.call(this, v);
		this._resetTabPage(v);
	};

	_pTabPage._resetTabPage = function (v) {
		var TabComp = this.parent;

		if (TabComp) {
			var child_list = TabComp._child_list;
			var tab_index = this._index;
			if (TabComp._tabButtons.length > 0) {
				var pagecontrol = child_list[tab_index];
				var btncontrol = TabComp._tabButtons[tab_index];
				if (btncontrol && btncontrol.id != this.id) {
					if (pagecontrol != null) {
						if (TabComp.enable) {
							if (v) {
								if (tab_index == TabComp.tabindex) {
									btncontrol._use_enable = true;
									pagecontrol.set_visible(true);
									btncontrol._stat_change("select", "selected");
									btncontrol._use_enable = null;
								}
								else {
									pagecontrol.set_visible(false);
									btncontrol._pseudo = "normal";
									btncontrol._status = "notselect";
									btncontrol._stat_change(btncontrol._pseudo, btncontrol._status);
								}
							}
							else {
								btncontrol._pseudo = "disable";
								btncontrol._status = "disabled";
								btncontrol._stat_change(btncontrol._pseudo, btncontrol._status);
							}
						}
						else {
							btncontrol._pseudo = "disable";
							btncontrol._status = "disabled";
							btncontrol._stat_change("disable", "disabled");
						}
					}
				}
			}
		}
	};

	_pTabPage.set_visible = function (v, skip_focus) {
		if (v === undefined || v === null) {
			return;
		}

		var control_elem = this._control_element;
		v = nexacro._toBoolean(v);


		if (this.visible != v) {
			this.visible = v;
			if (control_elem) {
				control_elem.setElementVisible(v);
				this._setAccessibilityStatHidden(v);

				if (this.visible) {
					nexacro._resetVML(this);

					this._on_activate();

					if (!this._is_subcontrol && this._is_created && this.parent && this.parent._is_created && !skip_focus) {
						if (this.parent._focusobj instanceof nexacro.Tabpage) {
							this._on_focus(true);
						}
					}
				}
			}
		}
	};

	_pTabPage.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onclick && this.onclick._has_handlers) {
			var evt = new nexacro.ClickEventInfo(this, "onclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
			return this.onclick._fireEvent(this, evt);
		}
		return false;
	};

	_pTabPage._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
		this._setTabFocusObj(this);
	};

	_pTabPage._setTabFocusObj = function (focusobj) {
		this.parent._focusobj = focusobj;
	};

	_pTabPage._getTabFocusObj = function () {
		return this.parent._focusobj;
	};

	_pTabPage._preLoad = function (flag) {
		this.preload = flag;
	};

	_pTabPage._loadURL = function () {
		if (this.parent.preload != true) {
			return;
		}
		this.on_apply_url(true);
	};

	_pTabPage._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _want_tab = true;
		var _want_arrow = this._want_arrow;
		if (keycode == nexacro.Event.KEY_TAB) {
			if (shiftKey) {
				var page_last_comp = this._getLastFocused();
				var page_first_comp = this._getTabOrderFirst();

				if (page_last_comp == null) {
					if (!this.parent._isBtnFocusAcceptable()) {
						_want_tab = false;
					}
				}
				else if (page_last_comp == page_first_comp) {
					if (!this.parent._isBtnFocusAcceptable()) {
						_want_tab = false;
					}
				}
			}
			else {
				if (!this._getLastFocused() && !this._getTabOrderFirst()) {
					_want_tab = false;
				}
			}
		}
		return {
			want_tab : _want_tab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrow
		};
	};

	_pTabPage._on_bubble_dragenter = function (elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				this._dragenter_first_comp = this;
				refer_comp = this;
				if (!refer_comp._is_reference_control) {
					refer_comp = this._getReferenceComponent(refer_comp);
				}
			}

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
				if (from_comp && this._contains(from_comp)) {
					return;
				}
				if (from_comp == this) {
					this.on_dragenter_basic_action();
				}
			}
			else {
				is_subcontrol_bubble = false;
				from_comp = this._getRootComponent(from_comp);
				if (from_comp && this._contains(from_comp)) {
					return;
				}

				if (this.visible && this._isEnable()) {
					this.on_dragenter_basic_action();

					var clientXY = this._getClientXY(canvasX, canvasY);
					if (bubble_scope) {
						event_bubbles = this.on_fire_user_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
					else {
						event_bubbles = this.on_fire_sys_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
				}
			}
			if ((!this.ondragenter || (this.ondragenter && !this.ondragenter.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);

				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondragenter(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}

				this._stat_change("", "mouseover");
			}
			if ((!this.ondragenter || (this.ondragenter && !this.ondragenter.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				canvasX += this._adjust_left - this._scroll_left || 0;
				canvasY += this._adjust_top - this._scroll_top || 0;
				return this.parent._on_bubble_dragenter(elem, from_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pTabPage._on_bubble_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp, bubble_scope) {
		if (!this._is_alive) {
			return;
		}

		if (event_bubbles === undefined) {
			var is_subcontrol_bubble;

			if (!refer_comp) {
				refer_comp = this;
				if (!refer_comp._is_reference_control) {
					refer_comp = this._getReferenceComponent(refer_comp);
				}
			}

			if (this._is_subcontrol) {
				is_subcontrol_bubble = true;
				if (to_comp && this._contains(to_comp)) {
					return;
				}
				if (fire_comp == this) {
					this.on_dragleave_basic_action();
				}
			}
			else {
				is_subcontrol_bubble = false;
				to_comp = this._getRootComponent(to_comp);
				if (to_comp && this._contains(to_comp)) {
					return;
				}

				if (this.visible && this._isEnable()) {
					this.on_dragleave_basic_action();

					var clientXY = this._getClientXY(canvasX, canvasY);
					if (bubble_scope) {
						event_bubbles = this.on_fire_user_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
					else {
						event_bubbles = this.on_fire_sys_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], this, refer_comp);
					}
				}
			}

			if ((!this.ondragleave || (this.ondragleave && !this.ondragleave.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				var canvas = this._getRecalcCanvasXY(elem, canvasX, canvasY);

				canvasX = canvas[0];
				canvasY = canvas[1];

				if (is_subcontrol_bubble) {
					return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, null, refer_comp, bubble_scope);
				}
				else {
				}
			}
		}
		else {
			if (this.visible && this._isEnable()) {
				var clientXY = this._getClientXY(canvasX, canvasY);
				if (bubble_scope) {
					event_bubbles = this.on_fire_user_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}
				else {
					event_bubbles = this.on_fire_sys_ondragleave(src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientXY[0], clientXY[1], fire_comp, refer_comp);
				}

				if (!to_comp || !this._contains(to_comp)) {
					this._stat_change("", "normal");
				}
			}
			if ((!this.ondragleave || (this.ondragleave && !this.ondragleave.stoppropagation)) && event_bubbles !== true && this.parent && !this.parent._is_application) {
				canvasX += this._adjust_left - this._scroll_left || 0;
				canvasY += this._adjust_top - this._scroll_top || 0;
				return this.parent._on_bubble_dragleave(elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, false, fire_comp, refer_comp, bubble_scope);
			}
		}
	};

	_pTabPage.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var next_obj = null;
		var tab_comp = this.parent;
		var index = tab_comp._getTabIndex();
		var button_len = tab_comp._tabButtons.length;

		var _window = this._getWindow();
		var last_notify = _window._accessibility_last_focused_comp;
		if (direction) {
			next_obj = this._searchNextTabFocus(last_notify, undefined, undefined, true)[0];
			if (next_obj.parent != fire_comp) {
				index++;
				tab_comp._accessibility_tabindex = index;
				next_obj = (button_len > index) ? tab_comp._tabButtons[index] : next_obj;
			}
		}
		else {
			next_obj = this._searchPrevTabFocus(last_notify, undefined, undefined, true)[0];
			if (next_obj == fire_comp) {
				next_obj = tab_comp._tabButtons[index];
			}
		}

		if (next_obj) {
			next_obj._setAccessibilityNotifyEvent(direction);
			return true;
		}
		return false;
	};

	_pTabPage._setAccessibilityNotifyEvent = function (direction) {
		var next_obj = null;
		var index = this._index;
		var tab_comp = this.parent;
		var tabindex = tab_comp._getTabIndex();

		if (direction) {
			if (index != tabindex) {
				next_obj = tab_comp._tabButtons[index];
			}
			else {
				next_obj = this._getTabOrderFirst(true, false);
			}
		}
		else {
			if (index != tabindex) {
				next_obj = tab_comp._tabButtons[index];
			}
			else {
				next_obj = this._getTabOrderLast(true, false);
			}
		}

		if (next_obj) {
			next_obj._setAccessibilityNotifyEvent(direction);
		}
	};

	delete _pTabPage;

	nexacro.TabpageCtrl = function (id, parent) {
		nexacro.Tabpage.call(this, id, parent);
		this._is_subcontrol = true;
	};
	var _pTabpageCtrl = nexacro.TabpageCtrl.prototype = nexacro._createPrototype(nexacro.Tabpage, nexacro.TabpageCtrl);
	nexacro._setForControlStyleFinder(_pTabpageCtrl);

	delete _pTabpageCtrl;
}


if (!nexacro.TabBorderCtrl) {
	nexacro.TabBorderCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pTabBorderCtrl = nexacro._createPrototype(nexacro.Component, nexacro.TabBorderCtrl);
	nexacro.TabBorderCtrl.prototype = _pTabBorderCtrl;

	_pTabBorderCtrl.on_find_CurrentStyle_border = function (pseudo) {
		var border = this.parent._find_pseudo_obj("border", pseudo, "border");
		var b = border.clone();
		var position = this.parent._getTabPosition();

		b._linecnt = 1;
		b._copytoSubObjects();
		b._linecnt = 4;

		if (this.name == "tableftborder") {
			if (position == "top" || position == "left") {
				b.set_bottom_width("0");
				b.set_right_width("0");
			}
			else if (position == "bottom") {
				b.set_top_width("0");
				b.set_right_width("0");
			}
			else if (position == "right") {
				b.set_left_width("0");
				b.set_bottom_width("0");
			}
		}
		else if (this.name == "tabcenterborder") {
			if (position == "top") {
				b.set_bottom_width("0");
				b.set_left_width("0");
				if (this.parent._tabButtons && this.parent._tabButtons.length > 0 && this.parent.tabindex > -1) {
					var border_color = this.parent.on_find_CurrentStyle_buttonbackground("selected").color;
					if (border_color) {
						b.set_top_color(border_color);
						b.set_right_color(border_color);
					}
				}
			}
			else if (position == "bottom" || position == "right") {
				b.set_top_width("0");
				b.set_left_width("0");
				if (this.parent._tabButtons && this.parent._tabButtons.length > 0 && this.parent.tabindex > -1) {
					var border_color = this.parent.on_find_CurrentStyle_buttonbackground("selected").color;
					if (border_color) {
						b.set_bottom_color(border_color);
						b.set_right_color(border_color);
					}
				}
			}
			else if (position == "left") {
				b.set_top_width("0");
				b.set_right_width("0");
				if (this.parent._tabButtons && this.parent._tabButtons.length > 0 && this.parent.tabindex > -1) {
					var border_color = this.parent.on_find_CurrentStyle_buttonbackground("selected").color;
					if (border_color) {
						b.set_bottom_color(border_color);
						b.set_left_color(border_color);
					}
				}
			}
		}
		else {
			if (position == "top") {
				b.set_bottom_width("0");
				b.set_left_width("0");
			}
			else if (position == "bottom" || position == "right") {
				b.set_top_width("0");
				b.set_left_width("0");
			}
			else if (position == "left") {
				b.set_top_width("0");
				b.set_right_width("0");
			}
		}

		return b;
	};

	_pTabBorderCtrl.on_find_CurrentStyle_bordertype = function () {
		var b_type = this.parent._find_pseudo_obj("bordertype", this.pseudo, "bordertype");
		if (!b_type) {
			return null;
		}

		var bordertype = b_type.clone();

		var position = this.parent._getTabPosition();

		bordertype.set_lefttop(false);
		bordertype.set_leftbottom(false);
		bordertype.set_righttop(false);
		bordertype.set_rightbottom(false);

		return bordertype;
	};

	delete _pTabBorderCtrl;
}

if (!nexacro.TabButtonBorderCtrl) {
	nexacro.TabButtonBorderCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		this._index = -1;
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pTabButtonBorderCtrl = nexacro._createPrototype(nexacro.Component, nexacro.TabButtonBorderCtrl);
	nexacro.TabButtonBorderCtrl.prototype = _pTabButtonBorderCtrl;

	_pTabButtonBorderCtrl._setElementBorder = function (control, border, bordertype) {
		var b = border.clone();

		b._linecnt = 1;
		b._copytoSubObjects();
		b._linecnt = 4;

		var topcolor = nexacro._getWebColorFromXreColor(border.top_color);
		if (border.top_width && topcolor != "") {
		}
		else if (border.top_width != "") {
			b.set_top_width("0");
		}

		b.set_bottom_width("0");
		b.set_left_width("0");
		b.set_right_width("0");

		control.setElementBorder(b, bordertype);
	};

	_pTabButtonBorderCtrl._on_sys_lbuttondown = function (node, e) {
		var ret = this._on_lbuttondown(node, e);
		return ret;
	};

	_pTabButtonBorderCtrl._on_lbuttondown = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var parent = this.parent;
		var ret = parent._on_btn_lbuttondown(parent._tabButtons[this._index], parent._tabButtons[this._index]._text_elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);

		parent._tabButtons[this._index]._on_focus(true);


		return ret;
	};

	_pTabButtonBorderCtrl._on_lbuttonup = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var parent = this.parent;
		return parent._on_btn_lbuttonup(parent._tabButtons[this._index], parent._tabButtons[this._index]._text_elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);
	};

	delete _pTabButtonBorderCtrl;
}
