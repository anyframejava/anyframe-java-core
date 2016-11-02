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


if (!nexacro.ListBox) {
	nexacro.ListBoxClickEventInfo = function (obj, id, index, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		nexacro.ClickEventInfo.call(this, obj, id || "onlistboxclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.index = index;
	};
	var _pListBoxClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.ListBoxClickEventInfo);
	nexacro.ListBoxClickEventInfo.prototype = _pListBoxClickEventInfo;

	_pListBoxClickEventInfo._type_name = "ListBoxClickEventInfo";

	delete _pListBoxClickEventInfo;
	_pListBoxClickEventInfo = null;

	nexacro.ListBox_Style = function (target) {
		nexacro.Style.call(this);

		if (target) {
			this._target = target;
		}
		this.itemheight = null;
		this.itembackground = null;
		this.itemgradation = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itempadding = null;
		this.itemaccessibility = null;
	};

	var _pListBoxStyle = nexacro._createPrototype(nexacro.Style, nexacro.ListBox_Style);
	nexacro.ListBox_Style.prototype = _pListBoxStyle;

	eval(nexacro._createValueAttributeEvalStr("_pListBoxStyle", "itemheight"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pListBoxStyle", "itembackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pListBoxStyle", "itemgradation"));
	eval(nexacro._createBorderAttributeEvalStr("_pListBoxStyle", "itemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pListBoxStyle", "itembordertype"));
	eval(nexacro._createPaddingAttributeEvalStr("_pListBoxStyle", "itempadding"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pListBoxStyle", "itemaccessibility"));

	_pListBoxStyle.__custom_emptyObject = function () {
		this.itemheight = null;
		this.itembackground = null;
		this.itemgradation = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itempadding = null;
		this.itemaccessibility = null;
	};

	_pListBoxStyle.__get_custom_style_value = function () {
		var val = "";
		var style = this.itemheight;
		if (style && style._is_empty) {
			val += "itemheight:" + style._value + "; ";
		}

		style = this.itembackground;
		if (style && style._is_empty) {
			val += "itembackground:" + style._value + "; ";
		}

		style = this.itemgradation;
		if (style && style._is_empty) {
			val += "itemgradation:" + style._value + "; ";
		}

		style = this.itemborder;
		if (style && style._is_empty) {
			val += "itemborder:" + style._value + "; ";
		}

		style = this.itembordertype;
		if (style && style._is_empty) {
			val += "itembordertype:" + style._value + "; ";
		}

		style = this.itempadding;
		if (style && style._is_empty) {
			val += "itempadding:" + style._value + "; ";
		}

		style = this.itemaccessibility;
		if (style && style._is_empty) {
			val += "itemaccessibility:" + style._value + "; ";
		}

		style = null;

		return val;
	};

	nexacro.ListBox_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.itemheight = null;
		this.itembackground = null;
		this.itemgradation = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itempadding = null;
		this.itemaccessibility = null;
	};

	var _pListBoxCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ListBox_CurrentStyle);
	nexacro.ListBox_CurrentStyle.prototype = _pListBoxCurrentStyle;

	_pListBoxCurrentStyle.__custom_emptyObject = _pListBoxStyle.__custom_emptyObject;
	_pListBoxCurrentStyle.__get_custom_style_value = _pListBoxStyle.__get_custom_style_value;

	delete _pListBoxStyle;
	_pListBoxStyle = null;
	delete _pListBoxCurrentStyle;
	_pListBoxCurrentStyle = null;

	nexacro.ListBox = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._selectinfo = {
			index : -1, 
			text : "", 
			value : undefined, 
			obj : null
		};

		this.scrollbars = "autoboth";
		this.isAboveSelected = false;
		this.codecolumn = "";
		this.datacolumn = "";
		this.multiselect = false;
		this.innerdataset = null;
		this.readonly = false;
		this.index = -1;
		this.text = "";
		this.value = undefined;
		this.dragscrolltype = "all";
		this.selectscrollmode = "default";

		this._scrollbars = 3;
		this._is_scrollable = true;
		this._temp_elem = null;
		this._innerdataset = null;
		this._codecolumn = null;
		this._datacolumn = null;
		this._total_page_rowcnt = 0;
		this._total_page_cnt = 0;
		this._contents_maxwidth = null;
		this._contents_maxheight = null;
		this._page_rowcount = 0;
		this._page_rowcount_min = 0;
		this._shiftKey = false;
		this._ctrlKey = false;
		this._altKey = false;
		this._vscrollpos = 0;
		this._prevpos = 0;
		this._refresh_rows = [];
		this._vscrollTask = null;
		this._userDsChange = false;
		this._exprcache = {
		};
		this._overeditemindex = -1;
		this._lbtnDownIdx = -1;
		this._cur_end = -1;
		this._is_redraw = false;
		this._want_tab = true;
		this._want_arrow = false;
		this._accessibility_index = -1;
		this._accessibility_role = "listbox";
		this._shift_select_base_index = null;
		this._is_first_focus = false;
		this._scroll_vpos_queue = [];

		this._select_multi = {
			"items" : [], 
			"map" : {
			}, 
			"keys" : [], 
			"length" : 0, 
			"lastselected" : null
		};
		this._selectinfo_list = [];

		this._keep_scrolling = false;

		this._event_list = {
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
			"onitemclick" : 1, 
			"onitemdblclick" : 1, 
			"canitemchange" : 1, 
			"onitemchanged" : 1, 
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
			"onitemmouseenter" : 1, 
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onmousedown" : 1, 
			"onmouseup" : 1
		};

		this._setEventHandler("onkeydown", this.on_notify_listbox_onkeydown, this);
	};

	var _pListBox = nexacro._createPrototype(nexacro.Component, nexacro.ListBox);
	nexacro.ListBox.prototype = _pListBox;

	_pListBox._type_name = "ListBox";
	_pListBox._default_align = nexacro.Component._default_left_align;
	_pListBox._default_Item_height = 24;


	_pListBox.on_apply_custom_class = function () {
		var items = this._get_contents_rows();
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].on_apply_prop_class();
			}
			items = null;
		}
	};

	_pListBox.on_create_custom_style = function () {
		return new nexacro.ListBox_Style(this);
	};

	_pListBox.on_create_custom_currentStyle = function () {
		return new nexacro.ListBox_CurrentStyle();
	};

	_pListBox.on_apply_custom_pseudo = function (pseudo) {
		if (pseudo) {
			this._pseudo = pseudo;
		}
		else if (this._pseudo) {
			pseudo = this._pseudo;
		}

		var curstyle = this.currentstyle;

		var style = this.on_find_CurrentStyle_itemheight(pseudo);
		if (style != curstyle.itemheight) {
			curstyle.itemheight = style;
			this.on_apply_style_itemheight(style);
		}

		style = this.on_find_CurrentStyle_itembackground(pseudo);
		if (style != curstyle.itembackground) {
			curstyle.itembackground = style;
			this.on_apply_style_itembackground(style);
		}

		style = this.on_find_CurrentStyle_itemgradation(pseudo);
		if (style != curstyle.itemgradation) {
			curstyle.itemgradation = style;
			this.on_apply_style_itemgradation(style);
		}

		style = this.on_find_CurrentStyle_itemborder(pseudo);
		if (style != curstyle.itemborder) {
			curstyle.itemborder = style;
			this.on_apply_style_itemborder(style);
		}

		style = this.on_find_CurrentStyle_itembordertype(pseudo);
		if (style != curstyle.itembordertype) {
			curstyle.itembordertype = style;
			this.on_apply_style_itembordertype(style);
		}

		style = this.on_find_CurrentStyle_itempadding(pseudo);
		if (style != curstyle.itempadding) {
			curstyle.itempadding = style;
			this.on_apply_style_itempadding(style);
		}

		style = this.on_find_CurrentStyle_font(pseudo);
		if (style != curstyle.font) {
			curstyle.font = style;
			this.on_apply_style_font(style);
		}

		style = this.on_find_CurrentStyle_letterspace(pseudo);
		if (style != curstyle.letterspace) {
			curstyle.letterspace = style;
			this.on_apply_style_letterspace(style);
		}

		style = this.on_find_CurrentStyle_color(pseudo);
		if (style != curstyle.color) {
			curstyle.color = style;
			this.on_apply_style_color(style);
		}

		style = this.on_find_CurrentStyle_align(pseudo);
		if (style != curstyle.align) {
			curstyle.align = style;
			this.on_apply_style_align(style);
		}

		style = this.on_find_CurrentStyle_itemaccessibility(pseudo);
		if (style != curstyle.itemaccessibility) {
			curstyle.itemaccessibility = style;
			this.on_apply_style_itemaccessibility(style);
		}

		style = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (style != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = style;
			this.on_apply_style_rtlimagemirroring(style);
		}

		style = null;
	};

	_pListBox.on_apply_style_color = function (v) {
		var items = this._get_contents_rows();
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].style.set_color(v._value);
			}
			items = null;
		}
	};

	_pListBox.on_apply_style_font = function (v) {
		var items = this._get_contents_rows();
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				if (v) {
					v = this._search_style_obj(v, "font", i);
					items[i].style.set_font(v._value);
				}
			}
			items = null;
		}
	};

	_pListBox.on_apply_style_align = function (v) {
		var items = this._get_contents_rows();
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].style.set_align(v._value);
			}
			items = null;
		}
	};

	_pListBox.on_apply_style_cursor = function (v) {
		nexacro.Component.prototype.on_apply_style_cursor.call(this, v);

		var items = this._get_contents_rows();
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				items[i].style.set_cursor(v._value);
			}
			items = null;
		}
	};

	_pListBox.on_apply_style_itembackground = function (v) {
		var items = this._get_contents_rows();
		var rowcount = items.length;
		var ibackground = v;

		for (var i = 0; i < rowcount; i++) {
			ibackground = this._search_style_obj(v, "background", i);
			if (ibackground) {
				items[i].style.set_background(ibackground._value);
			}
		}
	};

	_pListBox.on_apply_style_itemheight = function (v) {
		var vscrollbar = this.vscrollbar;
		if (vscrollbar) {
			vscrollbar._setScrollLayout(vscrollbar.min, vscrollbar.max, vscrollbar.page, this._get_rowheight(), vscrollbar.pos);
		}
		this._recreate_data(true);
	};

	_pListBox.on_apply_style_itemaccessibility = function (v) {
		var items = this._get_contents_rows();
		var rowcount = items.length;

		for (var i = 0; i < rowcount; i++) {
			items[i].on_update_style_accessibility();
		}
		items = null;
	};

	_pListBox.on_apply_style_itemgradation = function (v) {
		if (v == null) {
			return false;
		}
		this.on_apply_style_itembackground(this.currentstyle.itembackground);

		var items = this._get_contents_rows();
		var rowcount = items.length;
		var igradation = v;

		for (var i = 0; i < rowcount; i++) {
			igradation = this._search_style_obj(v, "gradation", i);
			if (igradation) {
				items[i].style.set_gradation(igradation._value);
			}
		}
		items = null;
	};

	_pListBox.on_apply_style_itemborder = function (v) {
		var items = this._get_contents_rows();
		var rowcount = items.length;
		var iborder = v;

		for (var i = 0; i < rowcount; i++) {
			iborder = this._search_style_obj(v, "border", i);
			if (iborder) {
				items[i].style.set_border(iborder._value);
			}
		}
		items = null;
	};

	_pListBox.on_apply_style_itembordertype = function (v) {
		var items = this._get_contents_rows();
		var rowcount = items.length;
		var ibordertype = v;

		for (var i = 0; i < rowcount; i++) {
			ibordertype = this._search_style_obj(v, "bordertype", i);

			if (ibordertype) {
				items[i].on_apply_style_bordertype(ibordertype);
			}
		}
		items = null;
	};

	_pListBox.on_apply_style_itempadding = function (v) {
		var items = this._get_contents_rows();
		var rowcount = items.length;
		var ipadding = v;

		for (var i = 0; i < rowcount; i++) {
			ipadding = this._search_style_obj(v, "padding", i);
			if (ipadding) {
				items[i].style.set_padding(ipadding._value);
			}
		}
		items = null;
	};

	_pListBox.on_apply_style_letterspace = function (v) {
		var items = this._get_contents_rows();
		if (items) {
			var rowcount = items.length;
			for (var i = 0; i < rowcount; i++) {
				if (v) {
					v = this._search_style_obj(v, "letterspace", i);
					items[i].on_apply_style_letterspace(v);
				}
			}
			items = null;
		}
	};

	_pListBox.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		var items = this._get_contents_rows();
		var rowcount = items.length;
		var _rtldirection = this._rtldirection;
		for (var i = 0; i < rowcount.length; i++) {
			items[i]._setRtlDirection(_rtldirection);
		}
	};

	_pListBox.on_find_CurrentStyle_itemheight = function (pseudo) {
		var style = this._find_pseudo_obj("itemheight", pseudo);

		if (!style) {
			style = nexacro._getCachedStyleObj("itemheight", nexacro._default_Item_height);
		}
		else {
			var value = style._value;
			if (value < 0 || value === null || value === "" || value === undefined) {
				var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
				var size = nexacro._getTextSize2(letterspace, "1", this.currentstyle.font);
				style = nexacro._getCachedStyleObj("itemheight", size[1]);
			}
		}

		return style;
	};

	_pListBox.on_find_CurrentStyle_border = function (pseudo) {
		return this._find_pseudo_obj("border", pseudo, "border");
	};

	_pListBox.on_find_CurrentStyle_padding = function (pseudo) {
		return this._find_pseudo_obj("padding", pseudo, "padding");
	};

	_pListBox.on_find_CurrentStyle_itembackground = function (pseudo) {
		return this._find_pseudo_obj("itembackground", pseudo, "background");
	};

	_pListBox.on_find_CurrentStyle_itemgradation = function (pseudo) {
		return this._find_pseudo_obj("itemgradation", pseudo, "gradation");
	};

	_pListBox.on_find_CurrentStyle_itemborder = function (pseudo) {
		return this._find_pseudo_obj("itemborder", pseudo, "border");
	};

	_pListBox.on_find_CurrentStyle_itembordertype = function (pseudo) {
		return this._find_pseudo_obj("itembordertype", pseudo, "bordertype");
	};

	_pListBox.on_find_CurrentStyle_itempadding = function (pseudo) {
		return this._find_pseudo_obj("itempadding", pseudo, "padding");
	};

	_pListBox.on_find_CurrentStyle_itemaccessibility = function (pseudo) {
		return this._find_pseudo_obj("itemaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pListBox.on_update_style_itemheight = function () {
		this.on_apply_style_itemheight(this.currentstyle.itemheight = this.on_find_CurrentStyle_itemheight(this._pseudo));
	};

	_pListBox.on_update_style_itembackground = function () {
		this.on_apply_style_itembackground(this.currentstyle.itembackground = this.on_find_CurrentStyle_itembackground(this._pseudo));
	};

	_pListBox.on_update_style_itemgradation = function () {
		this.on_apply_style_itemgradation(this.currentstyle.itemgradation = this.on_find_CurrentStyle_itemgradation(this._pseudo));
	};

	_pListBox.on_update_style_itemborder = function () {
		this.on_apply_style_itemborder(this.currentstyle.itemborder = this.on_find_CurrentStyle_itemborder(this._pseudo));
	};

	_pListBox.on_update_style_itembordertype = function () {
		this.on_apply_style_itembordertype(this.currentstyle.itembordertype = this.on_find_CurrentStyle_itembordertype(this._pseudo));
	};

	_pListBox.on_update_style_itempadding = function () {
		this.on_apply_style_itempadding(this.currentstyle.itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo));
	};

	_pListBox.on_update_style_itemaccessibility = function () {
		this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
	};

	_pListBox.on_create_contents = function () {
		var control = this.getElement();
		control.setElementSize(this._client_width, this._client_height);

		this._temp_elem = new nexacro.Element(control._client_element);
		this._temp_elem.setElementSize(1, 1);
		this._temp_elem.setElementVisible(false);
	};

	_pListBox.on_created_contents = function () {
		this._temp_elem.create();

		if (this.getElement()) {
			this.on_apply_innerdataset();
		}

		var rowobjs = this._refresh_rows, rowobj;

		for (var i = 0, n = rowobjs.length; i < n; i++) {
			rowobj = rowobjs[i];
			if (rowobj) {
				rowobj.on_created(this._window);
				rowobj._real_visible = false;
			}
		}

		this.on_apply_style_itemheight(this.currentstyle.itemheight);
		this.on_apply_style_letterspace(this.currentstyle.letterspace);

		this._refresh_rows = [];

		if (nexacro._enableaccessibility) {
			this._want_arrow = true;
			this._refreshAccessibilityValue();
		}

		if (this._is_redraw == false) {
			this._recreate_data();
			this._is_redraw = true;
		}

		this._selectinfo.obj = null;
		this._selectinfo.index = this.index;
		this._selectinfo.text = this.text;
		this._selectinfo.value = this.value;

		this.on_apply_prop_rtldirection();
	};

	_pListBox.on_destroy_contents = function () {
		this._clear_contents();

		if (this._vscrollTask) {
			this._vscrollTask.destroy();
			this._vscrollTask = null;
		}

		if (this._temp_elem) {
			this._temp_elem.destroy();
			this._temp_elem = null;
		}

		if (this._innerdataset) {
			this._innerdataset._removeEventHandler("onload", this._callback_onload, this);
			this._innerdataset._removeEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
			this._innerdataset._removeEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);

			this._innerdataset = null;
			this.innerdataset = null;
		}

		this._removeEventHandler("onkeydown", this.on_notify_listbox_onkeydown, this);

		this._selectinfo = null;
		this._select_multi = null;
		this._refresh_rows.length = 0;
		this._exprcache = null;
		this._selectinfo_list.length = 0;
		this._scroll_vpos_queue = null;
	};

	_pListBox.on_change_containerRect = function (width, height) {
		this._recreate_data(true);
	};

	_pListBox._callback_onload = function (obj, e) {
		this._exprcache = {
		};
		switch (e.reason) {
			case 0:
				this._recreate_data();
				this._is_redraw = true;

				if (this.index > -1) {
					if (this._changeIndex(this.index)) {
						this.on_apply_index();
					}
				}
				else if (this.value != "") {
					var row = this._innerdataset.findRow(this.codecolumn, this.value);
					if (this._changeIndex(row)) {
						this.on_apply_index();
					}
				}
				break;
		}
	};

	_pListBox._callback_onvaluechanged = function (obj, e) {
		if (this._userDsChange == false) {
			this._recreate_data();
			this._is_redraw = true;
		}
	};

	_pListBox._callback_onrowsetchanged = function (obj, e) {
		if (this._userDsChange == false) {
			this._recreate_data();
			this._is_redraw = true;
		}
	};

	_pListBox.on_init_bindSource = function (columnid, propid, ds) {
		if (this._is_redraw == false) {
			this._recreate_data();
			this._is_redraw = true;
		}
		if (propid == "value") {
			this.set_value(undefined);
			return true;
		}
		return false;
	};

	_pListBox.on_change_bindSource = function (propid, pSendDataset, rowIdx, colIdx, colArrayIdx) {
		var rtn;

		if (this._is_redraw == false) {
			this._recreate_data();
			this._is_redraw = true;
		}
		if (propid == "value") {
			rtn = pSendDataset.getColumn(rowIdx, colIdx);
			this.set_value(rtn);
			return true;
		}
		return false;
	};

	_pListBox.on_getBindableProperties = function () {
		return "value";
	};

	_pListBox.on_apply_prop_enable = function (v) {
		nexacro.Component.prototype.on_apply_prop_enable.call(this, v);

		var enable = v;
		if (v == undefined) {
			enable = this.enable;
		}

		var items = this._get_contents_rows();
		if (items && items.length > 0) {
			var size = items.length;
			for (var i = 0; i < size; i++) {
				items[i]._setEnable(enable);
			}
			items = null;
		}
	};

	_pListBox._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_tab, _want_arrow;
		if (keycode && (keycode == nexacro.Event.KEY_TAB)) {
			want_tab = this._getPreCalculateWantTab(keycode, shiftKey);
		}
		else {
			_want_arrow = this._getPreCalculateWantArrow(keycode);
		}

		if (this._is_first_focus) {
			this._is_first_focus = false;
		}

		this._want_arrow = _want_arrow;
		this._want_tab = true;

		if (ctrlKey) {
			if (keycode == nexacro.Event.KEY_LEFT) {
				var hscrollbar = this.hscrollbar;
				if (hscrollbar) {
					_want_arrow = hscrollbar.pos > hscrollbar.min ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_UP) {
				var vscrollbar = this.vscrollbar;
				if (vscrollbar) {
					_want_arrow = vscrollbar.pos > vscrollbar.min ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_RIGHT) {
				var hscrollbar = this.hscrollbar;
				if (hscrollbar) {
					_want_arrow = hscrollbar.pos < hscrollbar.max ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
			else if (keycode == nexacro.Event.KEY_DOWN) {
				var vscrollbar = this.vscrollbar;
				if (vscrollbar) {
					_want_arrow = vscrollbar.pos < vscrollbar.max ? true : false;
				}
				else {
					_want_arrow = false;
				}
			}
		}

		return {
			want_tab : want_tab, 
			want_return : false, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : _want_arrow
		};
	};

	_pListBox._setFocus = function (bResetScroll, dir, bInner) {
		this._focus_direction = dir;
		var retn = this.setFocus(bResetScroll, bInner);
		this._focus_direction = -1;
		return retn;
	};

	_pListBox._on_focus = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus) {
		var retn = false;
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

		if (self_flag == false) {
			this._focus_direction = -1;
		}

		if (focusdir >= 0) {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			if (self_flag == false) {
				this._accessibility_index = -1;
				if (this._last_focused) {
					this._do_defocus(this._last_focused, false);
				}
				if (focusdir < 2) {
					var items = this._get_contents_rows();
					if (items.length > 0) {
						var comp;
						if (this.index > -1) {
							this._accessibility_index = this.index;
						}
						else {
							if (focusdir == 0) {
								this._accessibility_index = 0;
							}
							else {
								this._accessibility_index = items.length - 1;
							}
						}
						this._is_first_focus = true;
						comp = items[this._accessibility_index];
						comp._on_focus(true);
						this._shift_select_base_index = this._accessibility_index;
						comp = null;
					}
					items = null;
				}
				else if (focusdir == 2) {
					if (!this._isAccessibilityEnable()) {
						var comp;
						var items = this._get_contents_rows();
						this._is_first_focus = true;
						if (this.index > -1) {
							comp = items[this._accessibility_index = this.index];
							comp._on_focus(true);
							comp.set_selected(true);
							this._shift_select_base_index = this.index;
						}
						else if (items.length > 0) {
							if (this.multiselect) {
								this._do_select(this._getNextAccessibilityOrderIndex(1));
							}
							else if (this._changeIndex(this._getNextAccessibilityOrderIndex(1))) {
								this.on_apply_index();
							}
						}
						items = null;
						comp = null;
					}
				}
				else if (focusdir == 3) {
					this._is_first_focus = true;
					var items = this._get_contents_rows();
					var comp;
					if (this.index == -1) {
						if (items.length > 0) {
							if (this.multiselect) {
								if (this.index > -1) {
									this._accessibility_index = this.index;
								}
								else {
									this._accessibility_index = items.length;
								}
								var idx = this._getNextAccessibilityOrderIndex(-1);
								this._do_select(idx);
							}
							else {
								if (this.index > -1) {
									this._accessibility_index = this.index;
								}
								else {
									this._accessibility_index = items.length;
								}
								var idx = this._getNextAccessibilityOrderIndex(-1);
								comp = items[idx];

								if (this._changeIndex(idx)) {
									this.on_apply_index();
								}
							}
						}
					}
					else {
						comp = items[this._accessibility_index = this.index];
						if (nexacro._enableaccessibility && this.multiselect) {
							this._do_select(this._accessibility_index);
						}
						else {
							comp.set_selected(true);
						}
					}
					items = null;
					comp = null;
				}
			}
		}
		else {
			retn = nexacro.Component.prototype._on_focus.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);
			if (this._last_focused) {
				this._do_defocus(this._last_focused, false);
			}
			else if (this._select_multi.lastselected === undefined && this._accessibility_index > -1) {
				var items = this._get_contents_rows();
				items[this._accessibility_index]._stat_change("notfocus", "normal");
			}
		}

		return retn;
	};

	_pListBox.on_apply_custom_setfocus = function (evt_name) {
		if (nexacro.Browser != "Safari" || (nexacro.Browser == "Safari" && window && window == window.parent)) {
			nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
			return;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			var selffocus = ((evt_name == "lbutton") ? false : nexacro._enableaccessibility);
			if (!(nexacro.Browser == "Safari" && evt_name == "lbuttondown")) {
				control_elem.setElementFocus(selffocus);
			}
		}
	};

	_pListBox.on_get_style_accessibility_label = function () {
		var label = "";
		if (!this._is_first_focus) {
			label = this.text ? this.text : this.value;
		}

		return label;
	};

	_pListBox._setAccessibilityNotifyEvent = function (direction) {
		var items = this._get_contents_rows();

		if (items && items.length > 0) {
			var obj = null;

			if (this._overeditemindex < 0 || this._overeditemindex >= items.length) {
				if (direction == undefined) {
					direction = 1;
				}

				if (direction > 0) {
					this._overeditemindex = 0;
				}
				else {
					this._overeditemindex = items.length - 1;
				}
			}

			obj = this._getItemByRealIdx(items, this._overeditemindex).obj;

			if (obj) {
				return obj._setAccessibilityNotifyEvent();
			}
		}
		else {
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this, direction);
		}
	};

	_pListBox._setAccessibilityInfoByHover = function (control) {
		if (control) {
			this._overeditemindex = control.index;
			return control._setAccessibilityInfoByHover();
		}
		else {
			return nexacro.Component.prototype._setAccessibilityNotifyEvent.call(this);
		}
	};

	_pListBox._clearAccessibilityInfoByHover = function () {
		this._overeditemindex = -1;
		return;
	};

	_pListBox._getAccessibilityRole = function (accessibility) {
		var role = nexacro.Component.prototype._getAccessibilityRole.call(this, accessibility);
		if (nexacro._accessibilitytype == 4) {
			var control_elem = this.getElement();
			var items = this._get_contents_rows();

			if (control_elem && items.length <= 0) {
				role = "static";
			}
		}
		return role;
	};

	_pListBox.setInnerDataset = function (obj) {
		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset();
		}
		else if (obj instanceof nexacro.Dataset || (typeof obj == "object" && obj._type_name == "Dataset")) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this._keep_scrolling = (this.innerdataset != obj.id) ? false : true;
			this.on_apply_innerdataset();
		}
	};

	_pListBox._setInnerDatasetStr = function (str) {
		if (!str) {
			this._innerdataset = null;
			this.innerdataset = "";
		}
		else {
			str = str.replace("@", "");
			this._innerdataset = this._findDataset(str);
			this.innerdataset = str;
		}
	};

	_pListBox.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pListBox.set_innerdataset = function (str) {
		if (typeof str != "string") {
			this.setInnerDataset(str);
			return;
		}
		if (str != this.innerdataset) {
			if (!str) {
				this._innerdataset = null;
				this.innerdataset = "";
			}
			else {
				str = str.replace("@", "");
				this._innerdataset = this._findDataset(str);
				this.innerdataset = str;
			}
			this.on_apply_innerdataset();
		}
		else if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset();
		}
	};

	_pListBox.on_apply_innerdataset = function () {
		var dataset = this._innerdataset;
		if (dataset) {
			if (this.datacolumn || this.codecolumn) {
				if (!this.datacolumn) {
					this._datacolumn = this.codecolumn;
				}
				if (!this.codecolumn) {
					this._codecolumn = this.datacolumn;
				}

				dataset._setEventHandler("onload", this._callback_onload, this);
				dataset._setEventHandler("onvaluechanged", this._callback_onvaluechanged, this);
				dataset._setEventHandler("onrowsetchanged", this._callback_onrowsetchanged, this);

				this._recreate_data(this._keep_scrolling);
				this._is_redraw = true;
			}
		}
	};

	_pListBox.set_visible = function (v) {
		var vscroll = this.vscrollbar;
		var need_refreshDom = nexacro.Browser == "Chrome" && v && this.visible != v && vscroll;

		nexacro.Component.prototype.set_visible.call(this, v);

		if (need_refreshDom) {
			var vscrollPos = vscroll.pos;
			vscroll.set_pos(vscrollPos - 1);
			vscroll.set_pos(vscrollPos);
		}
	};

	_pListBox.set_codecolumn = function (v) {
		if (v && v != this.codecolumn) {
			this.codecolumn = v;
			this.on_apply_innerdataset();
		}
	};

	_pListBox.set_datacolumn = function (v) {
		if (v && v != this.datacolumn) {
			this.datacolumn = v;
			this.on_apply_innerdataset();
		}
	};

	_pListBox.set_multiselect = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.multiselect) {
			this.multiselect = v;
			this.on_apply_multiselect();
		}
	};

	_pListBox.on_apply_multiselect = function () {
		var pre_idx = -1;
		this._select_clear();
		this._shiftKey = false;
		this._ctrlKey = false;

		if (!this.multiselect) {
			pre_idx = this.index;
			this._do_select(pre_idx);
		}
	};

	_pListBox.set_readonly = function (v) {
		v = nexacro._toBoolean(v);
		if (v != this.readonly) {
			this.readonly = v;
			this._setAccessibilityFlagReadOnly(v);
		}
	};

	_pListBox.set_text = function (v) {
	};

	_pListBox.set_index = function (v, bIgnoreCompareIdx) {
		var dataset = this._innerdataset;
		var v = parseInt(v, 10) | 0;

		if (this._is_created) {
			if (!dataset || v < 0 || v > dataset.getRowCount() - 1) {
				v = -1;
			}
		}
		if (this._changeIndex(v, bIgnoreCompareIdx, true)) {
			this.on_apply_index();
		}
		else {
			this._on_last_selectfocuschanged(this.index, true);
		}
	};

	_pListBox.on_apply_index = function () {
		if (!this.multiselect) {
			var index = this.index;
			var items = this._get_contents_rows();
			var length = items.length;
			if (items && index == -1) {
				for (i = 0; i < length; i++) {
					var item = items[i];
					item.set_selected(false);

					if (nexacro._enableaccessibility) {
						item._setAccessibilityInfoIndex(i + 1);
						item._setAccessibilityInfoCount(length);
					}
				}
				items = null;
			}

			var control_elem = this.getElement();
			if (control_elem && index > -1) {
				this._do_select(index);
			}
		}
	};

	_pListBox.set_value = function (v) {
		if (v !== this.value) {
			this.value = v;
		}
		var dataset = this._innerdataset;
		if (dataset) {
			var row = -1;
			if (this.value !== undefined) {
				row = dataset.findRow(this.codecolumn, this.value);
			}
			if (this.index != row) {
				this._is_value_setting = true;
				this.set_index(row);
				this._is_value_setting = false;
			}
		}
	};

	_pListBox.set_dragscrolltype = function (v) {
		nexacro.Form.prototype.set_dragscrolltype.call(this, v);
	};

	_pListBox.set_resizebutton = function () {
	};

	_pListBox.set_selectscrollmode = function (v) {
		this.selectscrollmode = nexacro._toString(v);
	};

	_pListBox.getCount = function () {
		return (this._innerdataset) ? this._innerdataset.getRowCount() : 0;
	};

	_pListBox.getSelectedCount = function () {
		return this._get_selectcount();
	};

	_pListBox.getSelect = function (v) {
		if (v < 0 || v >= this.getCount()) {
			return false;
		}
		var selectedItems = this._select_multi.items;
		var selectedCount = this._select_multi.length;

		for (var i = 0; i < selectedCount; i++) {
			if (selectedItems[i] == v) {
				return true;
			}
		}
		return false;
	};

	_pListBox.getSelectedItems = function () {
		if (this._select_multi && this._select_multi.length > 0) {
			var arrSelect = this._select_multi.items;
			arrSelect.sort();
			return arrSelect;
		}
		else {
			return [];
		}
	};

	_pListBox.clearSelect = function () {
		if (this._select_multi && this._select_multi.length > 0) {
			this._selectinfo.index = -1;

			if (this._changeIndex(-1)) {
				this.on_apply_index();
			}
			this._select_clear();
			if (this._ctrlKey === true) {
				this._recreate_data();
				this._is_redraw = true;
			}
			return true;
		}
		else {
			return false;
		}
	};

	_pListBox.redraw = function () {
		if (this._is_redraw == false) {
			this._recreate_data();
			this._is_redraw = true;
		}
	};
	_pListBox.setSelect = function (index, select) {
		select = nexacro._toBoolean(select);
		index = parseInt(index) | 0;
		var item = this._get_rowobj_byrow(index);

		if (index >= 0) {
			if (select == true) {
				if (!this.multiselect) {
					this._deselect_all(true);

					if (this._changeIndex(index, true)) {
						this.on_apply_index();
					}
				}
				else {
					item.set_selected(select);
					this._changeIndex(index);
					this._select_add(index);
				}
			}
			else {
				item.set_selected(false);
				this._select_remove(index);
				if (this._select_multi && this._select_multi.length == 0) {
					this._changeIndex(-1);
				}
			}
		}
		else {
			if (this._changeIndex(-1)) {
				this.on_apply_index();
			}

			this._select_clear();
		}
	};

	_pListBox.updateToDataset = function () {
		return this.applyto_bindSource("value", this.value);
	};

	_pListBox.isAboveSelected = function () {
	};


	_pListBox.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var accIdx = this._accessibility_index;
		var count = this._get_contents_rows().length;
		if (keycode == nexacro.Event.KEY_TAB) {
			var selecteditem = this._selectinfo;
			if (selecteditem && selecteditem.index > -1) {
				if (shift_key) {
					if (accIdx < 0) {
						this._want_tab = false;
					}
					else {
						var last_focused = this._last_focused;
						this._do_defocus(last_focused, true);
						if (last_focused && last_focused._selected) {
							last_focused._stat_change("select", "selected");
						}

						this._accessibility_index = -1;
					}
				}
				else {
					if (accIdx > -1) {
						this._want_tab = false;
					}
					else {
						var items = this._get_contents_rows();
						var comp = items[this.index];
						if (comp) {
							comp._on_focus(true);
						}
						this._accessibility_index = this.index;
					}
				}
			}
			else {
				if ((shift_key && accIdx < 0) || (!shift_key && accIdx >= count - 1)) {
					this._want_tab = false;
				}
				else {
					if (shift_key) {
						accIdx--;
					}
					else {
						accIdx++;
					}
					var items = this._get_contents_rows();
					var comp = items[accIdx];
					if (comp) {
						comp._on_focus(true);
					}

					this._accessibility_index = accIdx;
				}
			}
			this._getWindow()._keydown_element._event_stop = true;
		}
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pListBox.on_notify_listbox_onkeydown = function (obj, e) {
		if (this.readonly) {
			return false;
		}

		var sel_info = this._selectinfo;
		var nextidx, curidx = this._overeditemindex;
		var ds = this._innerdataset;

		var pre_index = +this.index;
		var pre_text = this.text;
		var pre_value = this.value;
		var post_index, post_text, post_value;
		var items = this._get_contents_rows();

		var shiftKey = this._shiftKey = e.shiftKey;
		this._ctrlKey = e.ctrlKey;
		this._altKey = e.altKey;
		var keycode = e.keycode;

		if (keycode == nexacro.Event.KEY_UP) {
			if (e.ctrlKey) {
				this._do_scroll("up");
				return true;
			}

			if (this.multiselect) {
				if (nexacro._enableaccessibility) {
					nextidx = this._getNextAccessibilityOrderIndex(-1);

					if (this._accessibility_index < 0) {
						var _window = this._getWindow();
						_window._removeFromCurrentFocusPath(this, true);
						if (this._isAccessibilityEnable()) {
							this._on_focus(true);
						}
						this._accessibility_index = -1;
						return;
					}
					else {
						if (this._select_multi.lastselected === undefined && this._accessibility_index < this._get_rowcount()) {
							items[this._accessibility_index]._stat_change("notfocus", "normal");
						}
						this._select_withkeyupevent(e);
					}
					nextidx = this._accessibility_index;
				}
				else {
					this._select_withkeyupevent(e);
					nextidx = this._get_selection_last();
				}

				if (nextidx != null) {
					if (nextidx > -1) {
						this._changeIndex(nextidx);
					}
				}
			}
			else {
				if (nexacro._enableaccessibility) {
					if (this.index == 0) {
						var _window = this._getWindow();
						_window._removeFromCurrentFocusPath(this, true);
						if (this._isAccessibilityEnable()) {
							this._on_focus(true);
						}
						this._accessibility_index = -1;
						return;
					}
					else {
						if (this._accessibility_index != this.index) {
							var prev_item = items[this._accessibility_index];
							if (prev_item) {
								prev_item._stat_change("notfocus", "normal");
							}
						}
						this._accessibility_index = this._getNextAccessibilityOrderIndex(-1);
						nextidx = this._accessibility_index;
					}
				}
				else {
					nextidx = +this.index - 1;
				}

				if (nextidx > -1) {
					if (this._changeIndex(nextidx)) {
						this.on_apply_index();
					}
				}
			}
		}
		else if (keycode == nexacro.Event.KEY_DOWN) {
			if (e.ctrlKey) {
				this._do_scroll("down");
				return true;
			}

			if (this.multiselect) {
				if (nexacro._enableaccessibility) {
					if (this.index > -1 && this._accessibility_index == -1) {
						nextidx = this._accessibility_index = this.index;
						this._do_select(this._accessibility_index);
					}
					else {
						nextidx = this._getNextAccessibilityOrderIndex(1);
						if (this._accessibility_index < ds.getRowCount()) {
							if (this._select_multi.lastselected === undefined && this._accessibility_index > -1) {
								items[this._accessibility_index]._stat_change("notfocus", "normal");
							}
							this._select_withkeydownevent(e);
						}
					}
				}
				else {
					this._select_withkeydownevent(e);
					nextidx = this._get_selection_last();
				}

				if (nextidx != null) {
					if (nextidx < ds.getRowCount()) {
						this._changeIndex(nextidx);
					}
				}
			}
			else {
				if (nexacro._enableaccessibility) {
					if (this.index > -1 && this._accessibility_index == -1) {
						items[this.index]._on_focus(true);
						this._accessibility_index = this.index;
					}
					else {
						if (this._accessibility_index != this.index) {
							var prev_item = items[this._accessibility_index];
							if (prev_item) {
								prev_item._stat_change("notfocus", "normal");
							}
						}
						this._accessibility_index = this._getNextAccessibilityOrderIndex(1);
					}
					nextidx = this._accessibility_index;
				}
				else {
					nextidx = +this.index + 1;
				}

				if (nextidx < ds.getRowCount()) {
					if (this._changeIndex(nextidx)) {
						this.on_apply_index();
					}
				}
			}
		}

		if (!shiftKey) {
			this._shift_select_base_index = obj.index;
		}

		if ((this.multiselect == true) && (this._ctrlKey == true) && (keycode == nexacro.Event.KEY_SPACE)) {
			var cur_item = this._get_rowobj_byrow(this._select_multi.lastselected);
			var is_same = false;
			this._sellist = this._select_multi.items;
			var len = this._sellist.length;
			var del_idx, iv;

			for (var i = 0; i < len; i++) {
				iv = this._sellist[i];

				if (this._select_multi.lastselected == iv) {
					is_same = true;
					cur_item = this._get_rowobj_byrow(iv);
					del_idx = iv;
				}
			}

			if (is_same !== true) {
				if (cur_item) {
					cur_item.set_selected(true);
				}
				this._select_add(this._select_multi.lastselected);
			}
			else {
				this._do_deselect(del_idx, true);
			}
		}
		else if (keycode == nexacro.Event.KEY_SPACE) {
			if (nexacro._enableaccessibility && this._accessibility_index > -1) {
				var items = this._get_contents_rows();
				if (items[this._accessibility_index]._control_pseudo == "focused") {
					items[this._accessibility_index]._stat_change("notfocus", "normal");
				}

				if (this._changeIndex(this._accessibility_index)) {
					this.on_apply_index();
				}
			}
		}

		this.on_apply_style_itemborder(this.currentstyle.itemborder);
	};

	_pListBox.on_notify_item_onlbuttondown = function (obj, e) {
		obj._keep_selecting = true;
		obj._stat_change("select", "selected");

		var shiftkey = this._shiftKey = e.shiftKey;
		this._ctrlKey = e.ctrlKey;
		this._altKey = e.altKey;
		this._selectinfo.obj = obj;
		this._selectinfo.index = obj.index;
		this._selectinfo.text = obj.text;
		this._selectinfo.value = obj.value;

		if (nexacro.isTouchInteraction) {
			this._selectinfo_list[this._selectinfo_list.length] = this._selectinfo;
		}

		if (!shiftkey) {
			this._shift_select_base_index = obj.index;
		}

		this._lbtnDownIdx = obj.index;
	};

	_pListBox.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this._is_alive) {
			return;
		}

		return nexacro.Component.prototype.on_fire_user_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};

	_pListBox.on_fire_sys_ontouchend = function (touchinfos, changedtouchinfos, from_comp, from_refer_comp) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		var sel_info_list = this._selectinfo_list;

		var ret = nexacro.Component.prototype.on_fire_sys_ontouchend.call(this, touchinfos, changedtouchinfos, from_comp, from_refer_comp);

		while (sel_info_list.length) {
			var down_item = sel_info_list[0].obj;
			if (down_item) {
				down_item._keep_selecting = false;

				var items = this._get_contents_rows();
				var change_item;


				var evt = touchinfos[0];

				var canvasX = evt.canvasX;
				var canvasY = evt.canvasY;

				var elem = this.getElement();
				if (elem) {
					var border = this.currentstyle.border;
					var c_l_border = border ? border._left_width : 0;
					var c_t_border = border ? border._top_width : 0;
					canvasX = canvasX - ((elem.scroll_left ? elem.scroll_left : 0) - c_l_border);
					canvasY = canvasY - ((elem.scroll_top ? elem.scroll_top : 0) - c_t_border);

					if (canvasX < 0) {
						canvasX = c_l_border;
					}
					if (canvasY < 0) {
						canvasY = c_t_border;
					}
				}

				var clientXY = this._getClientXY(canvasX, canvasY);

				this.on_fire_onitemclick(this, down_item.index, down_item.text, down_item.value, evt._current_state, this._altKey, this._ctrlKey, this._shiftKey, evt.screenX, evt.screenY, canvasX, canvasY, clientXY[0], clientXY[1]);

				change_item = down_item;

				var change_index = change_item.index;

				if (this.multiselect) {
					if (this._shiftKey == true || this._ctrlKey == true) {
						this._select_withmouseevent(change_index);
					}
					else {
						this._do_select(change_index, false);
					}
				}
				else {
					if (this._changeIndex(change_index)) {
						this.on_apply_index();
					}
					else {
						if (!down_item.selected) {
							down_item._stat_change("notselect", "normal");
						}
					}
				}
			}

			sel_info_list.shift();
		}

		return ret;
	};

	_pListBox.on_fire_sys_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem) {
		if (from_refer_comp && (from_refer_comp instanceof nexacro.ScrollBarCtrl || (from_refer_comp.parent && from_refer_comp.parent instanceof nexacro.ScrollBarCtrl))) {
			return;
		}

		var sel_info = this._selectinfo;

		var ret = nexacro.Component.prototype.on_fire_sys_onlbuttonup.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_elem);

		var down_item = sel_info.obj;
		if (down_item) {
			down_item._keep_selecting = false;

			var items = this._get_contents_rows();
			var change_item;

			this.on_fire_onitemclick(this, down_item.index, down_item.text, down_item.value, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

			if (nexacro._enableaccessibility) {
				if (this._accessibility_index > -1) {
					var sel_item = this._get_rowobj_byrow(this._accessibility_index);
					if (sel_info.index != this._accessibility_index && sel_item && sel_item._selected == true) {
						this._deselect_all(true);
						sel_item._stat_change("notselect", "normal");
					}
				}
			}

			change_item = down_item;

			var change_index = change_item.index;

			if (this.multiselect) {
				if (this._shiftKey == true || this._ctrlKey == true) {
					this._select_withmouseevent(change_index);
				}
				else {
					this._do_select(change_index, false);
				}
			}
			else {
				if (this._changeIndex(change_index)) {
					this.on_apply_index();
				}
				else {
					if (!down_item.selected) {
						down_item._stat_change("notselect", "normal");
					}
				}
			}
		}

		return ret;
	};

	_pListBox.on_fire_sys_onslide = function (elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp) {
		var ret = nexacro.Component.prototype.on_fire_sys_onslide.call(this, elem, touch_manager, touchinfos, xaccvalue, yaccvalue, xdeltavalue, ydeltavalue, from_comp, from_refer_comp);

		if (this.selectscrollmode == "select" && this.multiselect) {
			if (this._innerdataset) {
				var idx = -1;
				if (touchinfos[0]._elem && touchinfos[0]._elem.parent) {
					idx = touchinfos[0]._elem.parent.index;
				}

				if (this._lbtnDownIdx > -1 && idx > -1) {
					this._deselect_all(true);

					var startRow = this._lbtnDownIdx;
					var endRow = idx;
					var finalRow = idx;

					if (!nexacro._isNumber(startRow)) {
						startRow = 0;
					}
					if (!nexacro._isNumber(endRow)) {
						endRow = this._get_rowcount();
					}

					if (startRow > endRow) {
						var tmp = endRow;
						endRow = startRow;
						startRow = tmp;
						finalRow = tmp;
					}

					var rows = [];
					for (i = startRow; i <= endRow; i++) {
						rows.push(i);
					}
					this._do_multi_select(rows, true);
					this._changeIndex(finalRow);
				}
			}

			return true;
		}

		return ret;
	};

	_pListBox.on_notify_item_onmouseenter = function (obj, e) {
		this._overeditemindex = obj.index;
		return false;
	};

	_pListBox.on_notify_item_onmouseleave = function (obj, e) {
		var items = this._get_contents_rows();
		obj = this._getItemByRealIdx(items, this._overeditemindex).obj;

		if (obj) {
			if (!obj.selected) {
				this._overeditemindex = -1;
			}
		}
	};

	_pListBox.on_fire_onitemclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		if (this.readonly) {
			return false;
		}
		if (this.onitemclick && this.onitemclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(obj, "onitemclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			var ret = this.onitemclick._fireEvent(this, evt);
			evt = null;
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pListBox.on_fire_canitemchange = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (this.canitemchange && this.canitemchange._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "canitemchange", preindex, pretext, prevalue, postindex, posttext, postvalue);
			var ret = this.canitemchange._fireCheckEvent(this, evt);
			evt = null;
			return nexacro._toBoolean(ret);
		}

		return true;
	};

	_pListBox._onItemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		this.applyto_bindSource("value", obj.value);
		this.on_fire_onitemchanged(this, preindex, pretext, prevalue, postindex, posttext, postvalue);
		return true;
	};

	_pListBox.on_fire_onitemchanged = function (obj, preindex, pretext, prevalue, postindex, posttext, postvalue) {
		if (!this._selectinfo) {
			return false;
		}

		this._selectinfo.obj = null;
		this._selectinfo.index = obj.index;
		this._selectinfo.text = obj.text;
		this._selectinfo.value = obj.value;

		var sel_info = this._selectinfo;
		sel_info.index = postindex;
		sel_info.text = posttext;
		sel_info.value = postvalue;

		if (this.onitemchanged && this.onitemchanged._has_handlers) {
			var evt = new nexacro.ItemChangeEventInfo(this, "onitemchanged", preindex, pretext, prevalue, postindex, posttext, postvalue);
			var ret = this.onitemchanged._fireEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pListBox.on_notify_item_ondblclick = function (obj, e) {
		if (this.readonly || !this.enableevent) {
			return false;
		}

		e.canvasX += obj._adjust_left - obj._scroll_left || 0;
		e.canvasY += obj._adjust_top - obj._scroll_top || 0;

		var curstyle = obj.currentstyle;

		if (curstyle && curstyle.padding) {
			e.canvasX += curstyle.padding.left;
			e.canvasY += curstyle.padding.top;
		}

		var clientXY = this._getClientXY(e.canvasX, e.canvasY);
		e.clientX = clientXY[0];
		e.clientY = clientXY[1];

		return this.on_fire_onitemdblclick(this, this.index, this.text, this.value, e.button, e.altKey, e.ctrlKey, e.shiftKey, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY);
	};

	_pListBox.on_fire_onitemdblclick = function (obj, index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY) {
		if (this.readonly) {
			return false;
		}
		if (this.onitemdblclick && this.onitemdblclick._has_handlers) {
			var evt = new nexacro.ItemClickEventInfo(obj, "onitemdblclick", index, itemtext, itemvalue, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);
			var ret = this.onitemdblclick._fireEvent(this, evt);
			return nexacro._toBoolean(ret);
		}

		return false;
	};

	_pListBox._adjustScrollRows_callback = function (no_ani) {
		var pos = this.vscrollbar.pos;

		if (no_ani) {
			this._scroll_vpos_queue = [];
		}
		else {
			this._scroll_vpos_queue.pop();

			if (this._scroll_vpos_queue.length > 0) {
				this._aniframe_rowscroll.start();
			}
		}

		var visible_start = this._get_first_visible_row();
		var visible_end = this._get_last_visible_row(true);

		this._draw_contents(visible_start, visible_end);
		this._control_element.setElementVScrollPos(pos);
		this._clearHiddenPage();
	};

	_pListBox.on_vscroll = function (obj, e) {
		if (this.onvscroll && this.onvscroll._has_handlers) {
			e.fromobject = this;
			this.onvscroll._fireEvent(this, e);
		}

		if (e.type == "trackstart" || e.type == "tracklastover" || e.type == "trackfirstover") {
			return;
		}

		if (nexacro.Browser == "Runtime" || (navigator.userAgent.indexOf("Android 4.1") > -1 || navigator.userAgent.indexOf("Android 4.2") > -1 || navigator.userAgent.indexOf("Android 4.3") > -1)) {
			this._adjustScrollRows_callback(true);
		}
		else {
			if (e._evtkind == "fling" || e._evtkind == "slide" || e.type == "track") {
				if (!this._aniframe_rowscroll) {
					var pThis = this;
					this._scroll_vpos_queue = [];

					this._aniframe_rowscroll = new nexacro.AnimationFrame(this, function () {
						pThis._adjustScrollRows_callback();
					});
				}

				var cnt = this._scroll_vpos_queue.push(e.pos);

				if (cnt == 1) {
					this._aniframe_rowscroll.start();
				}
			}
			else {
				this._adjustScrollRows_callback(true);
			}
		}

		return true;
	};

	_pListBox.on_hscroll = function (obj, e) {
		if (this.onhscroll && this.onhscroll._has_handlers) {
			e.fromobject = this;
			this.onhscroll._fireEvent(this, e);
		}

		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementHScrollPos(e.pos);
			control_elem = null;
		}

		return true;
	};

	_pListBox.on_fire_onsize = function (width, height) {
		if (this._is_redraw == false) {
			this._recreate_data();
			this._is_redraw = true;
		}

		return nexacro.Component.prototype.on_fire_onsize.call(this, width, height);
	};

	_pListBox.on_fire_sys_onaccessibilitygesture = function (direction, fire_comp, refer_comp) {
		var ret = false;
		var items = this._get_contents_rows();

		if (items && items.length > 0) {
			var obj = null;

			if (direction > 0) {
				this._overeditemindex++;
			}
			else {
				this._overeditemindex--;
			}

			obj = this._getItemByRealIdx(items, this._overeditemindex).obj;

			if (obj) {
				ret = true;
				obj._setAccessibilityNotifyEvent();
			}
		}

		return ret;
	};

	_pListBox._create_item = function (id, position, left, top, width, height, right, bottom, parent) {
		return new nexacro.ListItemCtrl(id, position, left, top, width, height, right, bottom, parent);
	};

	_pListBox._create_row = function (nRow, left, top, right, bottom) {
		var ds = this._innerdataset;
		var dataCol = this.datacolumn ? this.datacolumn : this._datacolumn;
		var codeCol = this.codecolumn ? this.codecolumn : this._codecolumn;
		var txt = ds.getColumn(nRow, dataCol);
		var val = ds.getColumn(nRow, codeCol);

		var item = this._create_item("item", "absolute", left, top, right - left, bottom - top, null, null, this);
		item.set_value(val);
		item.set_text(txt);
		item.set_index(nRow);
		item.set_selected(false);

		item._setEventHandler("onlbuttondown", this.on_notify_item_onlbuttondown, this);
		item._setEventHandler("ontouchstart", this.on_notify_item_onlbuttondown, this);
		item._setEventHandler("ondblclick", this.on_notify_item_ondblclick, this);
		item._setEventHandler("onmouseenter", this.on_notify_item_onmouseenter, this);
		item._setEventHandler("onmouseleave", this.on_notify_item_onmouseleave, this);
		item.createComponent();

		if (!this._is_created) {
			this._refresh_rows[this._refresh_rows.length] = item;
		}

		if (this.multiselect == true) {
			var selItems = this._select_multi.items;
			var len = this._select_multi.length;

			for (var i = 0; i < len; i++) {
				if (nRow == selItems[i]) {
					item.set_selected(true);
					break;
				}
			}
		}
		else {
			if (this.index == nRow) {
				item.set_selected(true);
				this._set_last_selectfocused(nRow);
			}
		}

		return item;
	};

	_pListBox._refresh_scroll = function () {
		this._contents_maxwidth = null;
		this._contents_maxheight = null;
		this._set_scroll_max_size();
		this._refresh_size(false);
	};

	_pListBox._refresh_row = function (nRow, prop, val) {
		var rowobj = this._get_rowobj_byrow(nRow);
		switch (prop) {
			case "value":
				if (rowobj) {
					rowobj.set_value(val);
				}
				break;
			case "text":
				if (rowobj) {
					rowobj.set_text(val);
				}
				var ret = this._set_scroll_max_width(nRow);
				if (ret) {
					this._refresh_size(true);
				}
				break;
			case "index":
				if (rowobj) {
					rowobj.set_index(val);
				}
				break;
			case "select":
				if (rowobj) {
					rowobj.set_selected(val);
				}
				break;
		}
	};

	_pListBox._get_rowcount = function () {
		var ds = this._innerdataset;
		if (ds && (this.datacolumn || this.codecolumn)) {
			return ds.getRowCount();
		}
		else {
			return 0;
		}
	};

	_pListBox._getMaxTextSize = function () {
		var ds = this._innerdataset;
		var col = this.datacolumn || this.codecolumn;
		if (!ds || !col) {
			return false;
		}

		var font = this.on_find_CurrentStyle_font(this._pseudo) || nexacro.Component._default_font;
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
		var ad_width = this.currentstyle.itempadding ? this.currentstyle.itempadding.left + this.currentstyle.itempadding.right : 0;
		ad_width += this.currentstyle.itemborder ? this.currentstyle.itemborder._left_width + this.currentstyle.itemborder._right_width : 0;
		var itemWidth;
		var ds_cnt = ds.getRowCount();
		var maxWidth = 0;
		if (ds_cnt > 0) {
			for (i = 0; i < ds_cnt; i++) {
				itemWidth = nexacro._getTextSize2(letterspace, ds.getColumn(i, col), font)[0];
				if (maxWidth < itemWidth) {
					maxWidth = itemWidth;
				}
			}

			maxWidth += ad_width;

			if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
				return maxWidth;
			}
			else {
				maxWidth = Math.max(this._contents_maxwidth, maxWidth);
				return maxWidth;
			}
		}
		else {
			return 0;
		}
	};

	_pListBox._get_rowheight = function () {
		var itemheight = this.currentstyle.itemheight;
		return itemheight ? itemheight.value | 0 : 20;
	};

	_pListBox._get_select_mode = function () {
		if (this.multiselect) {
			return "multi";
		}
		else {
			return "single";
		}
	};

	_pListBox._set_scroll_max_size = function () {
		this._set_scroll_max_width();
		this._contents_maxheight = this._get_rowcount() * this._get_rowheight();
		if (this._temp_elem) {
			this._temp_elem.setElementPosition(0, this._contents_maxheight - 1);
		}
	};

	_pListBox._set_scroll_max_width = function (nRow) {
		var font = this.currentstyle.font || this._default_font;
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
		var dataset = this._innerdataset;

		var ad_width = this.currentstyle.itempadding ? this.currentstyle.itempadding.left + this.currentstyle.itempadding.right : 0;
		ad_width += this.currentstyle.itemborder ? this.currentstyle.itemborder._left_width + this.currentstyle.itemborder._right_width : 0;

		if (font && dataset) {
			if (this._contents_maxwidth !== null) {
				if (this._pos_max_width == nRow) {
					var datacolumn = this.datacolumn;

					var size = this._getMaxTextSize();
					var change = false;
					if (this._contents_maxwidth != size) {
						this._contents_maxwidth = Math.max(this._contents_maxwidth, size);
						change = true;
					}
					this._pos_max_width = row;

					return change;
				}
				else {
					var txt = dataset.getColumn(nRow, this.datacolumn);
					var size = nexacro._getTextSize2(letterspace, txt, font);
					if (this._contents_maxwidth < size[0]) {
						this._contents_maxwidth = size[0] + ad_width;
						this._pos_max_width = nRow;
						return true;
					}

					return false;
				}
			}
			else {
				var datacolumn = this.datacolumn;

				var row = dataset.findMaxLengthRow(datacolumn);

				var size = this._getMaxTextSize();
				this._contents_maxwidth = size + ad_width;
				this._pos_max_width = row;

				return true;
			}
		}

		return false;
	};

	_pListBox._getItemByRealIdx = function (arr, target) {
		if (nexacro._isArray(arr)) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].index == target) {
					return {
						"obj" : arr[i], 
						"index" : i
					};
				}
			}
		}

		return {
			"obj" : null, 
			"index" : null
		};
	};

	_pListBox._clearHiddenPage = function () {
		var visible_start = this._get_first_visible_row();
		var visible_end = this._get_last_visible_row(true);

		var spage = this._get_page_from_rowidx(visible_start);
		var epage = this._get_page_from_rowidx(visible_end);
		var remain_cnt = 100;
		var rowcount = this._get_rowcount();

		if (this._buffer_pages) {
			var buffer_pages = this._buffer_pages;
			var rowobjs, rowobj;
			var delrowcnt = 0;

			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				if (i >= spage && i <= epage) {
					continue;
				}

				if ((rowcount - delrowcnt) <= remain_cnt) {
					break;
				}

				rowobjs = buffer_pages[i];
				if (rowobjs) {
					for (var j = 0, jlen = rowobjs.length; j < jlen; j++) {
						rowobj = rowobjs[j];
						if (rowobj) {
							rowobj.destroy();
						}
						delrowcnt++;
					}
					buffer_pages[i] = null;
				}
			}
		}
	};

	_pListBox._draw_contents = function (start, end, dir) {
		if (!this._buffer_pages) {
			this._buffer_pages = [];
		}
		var buffer_page;
		var rowobj;
		var start_row, pos;

		if (!this._has_range(start, end)) {
			var start_page = this._get_page_from_rowidx(start);
			var end_page = this._get_page_from_rowidx(end);
			var page;

			start_row = (start_page - 1) * this._page_rowcount;
			var total_cnt = this._get_rowcount();
			var rowheight = this._get_rowheight();
			var control_elem = this.getElement();
			var row_width = 0;
			var page_rowcount = this._page_rowcount;

			if (control_elem) {
				row_width = control_elem.container_maxwidth;
			}

			for (page = start_page; page <= end_page; page++) {
				if (!(this._buffer_pages[page]) || this._buffer_pages[page].length <= 0) {
					buffer_page = this._buffer_pages[page] = [];

					for (var j = 0; j < page_rowcount; j++) {
						pos = (pos === undefined) ? (start_row * rowheight) : pos;
						rowobj = this._create_row(start_row, 0, pos, row_width, pos + rowheight);
						buffer_page.push(rowobj);
						pos = rowobj._adjust_top + rowobj._adjust_height;
						start_row++;
						if (total_cnt <= start_row) {
							break;
						}
					}
				}
				else {
					buffer_page = this._buffer_pages[page];
					var buf = buffer_page[buffer_page.length - 1];
					pos = buf._adjust_top + buf._adjust_height;
					start_row += buffer_page.length;
				}
			}
		}

		this._previous_start = this._cur_start;
		this._previous_end = this._cur_end;
		this._cur_start = start;
		this._cur_end = end;
	};

	_pListBox._resetDisplayInfo = function () {
		var control_elem = this.getElement();
		if (!control_elem) {
			return;
		}

		this._page_rowcount = Math.ceil((control_elem.client_height) / this._get_rowheight());
		this._page_rowcount_min = Math.floor((control_elem.client_height) / this._get_rowheight());

		var rowcount = this._get_rowcount();
		if (rowcount == 0) {
			this._total_page_cnt = 0;
			this._total_page_rowcnt = 0;
		}
		else {
			this._total_page_cnt = Math.ceil(rowcount / this._page_rowcount);
			this._total_page_rowcnt = (this._page_rowcount * this._total_page_cnt);
		}
	};

	_pListBox._recreate_data = function (keep_scroll) {
		var control_elem = this.getElement();
		if (!control_elem) {
			return;
		}

		this._clear_contents();

		this._resetDisplayInfo();

		var rowcount = this._get_rowcount();
		if (rowcount == 0) {
			return;
		}

		this._refresh_scroll();

		var startrow, endrow;

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			startrow = 0;
			endrow = rowcount - 1;
		}
		else {
			if (keep_scroll) {
				startrow = this._get_first_visible_row();
				endrow = this._get_last_visible_row(true);
			}
			else {
				startrow = 0;
				if (rowcount <= this._total_page_rowcnt) {
					endrow = rowcount - 1;
				}
				else {
					endrow = this._total_page_rowcnt - 1;
				}

				if (this._page_rowcount < endrow) {
					endrow = this._page_rowcount;
				}
			}
		}

		this._draw_contents(startrow, endrow);
		this._refresh_size(false);
	};


	_pListBox._refresh_size = function (is_contents_resize) {
		var control_elem = this.getElement();
		if (control_elem) {
			var contents_maxwidth = this._contents_maxwidth;
			var contents_maxheight = this._contents_maxheight;
			var org_maxwidth = control_elem.container_maxwidth;
			var org_maxheight = control_elem.container_maxheight;

			contents_maxwidth = Math.max(contents_maxwidth, control_elem.client_width);
			contents_maxheight = Math.max(contents_maxheight, control_elem.client_height);

			if ((control_elem.container_maxwidth != contents_maxwidth || control_elem.container_maxheight != contents_maxheight)) {
				control_elem.setElementScrollMaxSize(contents_maxwidth, contents_maxheight);
			}

			if (is_contents_resize) {
				this._refresh_scroll();
			}

			this._onResetScrollBar();
		}
	};

	_pListBox._clear_contents = function () {
		if (this._vscrollTask) {
			this._vscrollTask.stop();
		}
		if (this._buffer_pages) {
			var buffer_pages = this._buffer_pages;
			var rowobjs, rowobj;
			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				rowobjs = buffer_pages[i];
				if (rowobjs) {
					for (var j = 0, jlen = rowobjs.length; j < jlen; j++) {
						rowobj = rowobjs[j];
						if (rowobj) {
							rowobj.destroy();
						}
					}
					buffer_pages[i] = null;
				}
			}
		}
		this._buffer_pages = null;
	};

	_pListBox._get_first_visible_row = function () {
		var scrollTop = (this.vscrollbar) ? this.vscrollbar.pos : 0;
		return Math.floor(scrollTop / this._get_rowheight());
	};

	_pListBox._get_last_visible_row = function (bPrecision) {
		var lastrow;
		if (bPrecision) {
			lastrow = this._get_first_visible_row() + this._page_rowcount;
		}
		else {
			lastrow = this._get_first_visible_row() + this._page_rowcount_min;
		}

		var rowcnt = this._get_rowcount();

		if (lastrow >= rowcnt) {
			lastrow = rowcnt - 1;
		}

		return lastrow;
	};

	_pListBox._get_page_from_rowidx = function (rowidx) {
		return Math.floor(rowidx / this._page_rowcount) + 1;
	};

	_pListBox._has_range = function (start, end) {
		if (!this._buffer_pages) {
			return false;
		}
		var page = this._get_page_from_rowidx(start), end_page = this._get_page_from_rowidx(end);

		for (; page <= end_page; page++) {
			if (!this._has_page(page)) {
				return false;
			}
		}

		return true;
	};

	_pListBox._has_page = function (page) {
		return !!this._buffer_pages[page];
	};

	_pListBox._get_contents_rows = function () {
		var buffer_pages = this._buffer_pages, ret_arr = [];
		if (buffer_pages) {
			var rowobjs, rowobj;
			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				rowobjs = buffer_pages[i];
				if (rowobjs) {
					ret_arr = ret_arr.concat(rowobjs);
				}
			}
		}

		return ret_arr;
	};

	_pListBox._get_rowobj_byrow = function (nRow) {
		var buffer_pages = this._buffer_pages;
		if (buffer_pages) {
			var rowobjs, rowobj;
			for (var i = 0, n = buffer_pages.length; i < n; i++) {
				rowobjs = buffer_pages[i];
				if (rowobjs) {
					for (var j = 0, jlen = rowobjs.length; j < jlen; j++) {
						rowobj = rowobjs[j];
						if (rowobj && rowobj.index == nRow) {
							return rowobj;
						}
					}
				}
			}
		}
	};

	_pListBox._select_withmouseevent = function (idx, e, keepExisting) {
		switch (this._get_select_mode()) {
			case 'multi':
				if (this._shiftKey) {
					if (!this._ctrlKey) {
						this._deselect_all(true);
					}
					this._select_range(this._shift_select_base_index, idx, this._shiftKey);
				}
				else if (this._ctrlKey) {
					var item = this._get_rowobj_byrow(idx);

					if (item) {
						item.set_selected(!item.selected);
					}

					if (item.selected === false) {
						var i, len;
						var sel = this._select_multi;
						len = sel ? sel.length : 0;

						for (i = 0; i < len; i++) {
							if (idx === sel.items[i]) {
								this._select_remove(idx);
							}
						}
					}
					else {
						this._select_add(idx);
					}
					this._set_last_selectfocused(idx);
				}
				else if (this._is_selected(idx) && !this._shiftKey && !this._ctrlKey && this._get_selectcount() > 1) {
					this._do_select(idx, keepExisting, false);
				}
				else {
					this._do_select(idx, false);
				}
				break;
			case 'single':
				this._do_select(idx, false);
				break;
		}
	};

	_pListBox._select_withkeyupevent = function (e) {
		var lastidx = this._select_multi.lastselected === undefined ? nexacro._enableaccessibility ? this._accessibility_index : this._select_multi.lastselected : this._select_multi.lastselected;

		if (lastidx > 0) {
			var idx = lastidx - 1;
			if (e.shiftKey && lastidx) {
				if (this._is_selected(lastidx) && this._is_selected(idx)) {
					this._do_deselect(lastidx, true);
					this._set_last_selectfocused(idx);

					if (this._isAccessibilityEnable()) {
						var item = this._get_contents_rows();
						item[idx]._setFocus(true);
					}
				}
				else if (!this._is_selected(lastidx)) {
					this._do_select(lastidx, true);
					this._do_select(idx, true);
				}
				else {
					this._do_select(idx, true);
				}
			}
			else {
				this._shift_select_base_index = null;
				this._deselect_all(true);
				this._do_select(idx);
			}
		}
	};

	_pListBox._select_withkeydownevent = function (e) {
		var lastidx = this._select_multi.lastselected === undefined ? nexacro._enableaccessibility ? this._accessibility_index : this._select_multi.lastselected : this._select_multi.lastselected;
		var total_cnt = this._get_rowcount();

		if (lastidx + 1 < total_cnt) {
			var idx = lastidx + 1;
			if (e.shiftKey && lastidx >= 0) {
				if (this._shift_select_base_index == lastidx) {
					this._deselect_all(true);
					this._do_select(this._shift_select_base_index, true);
				}

				if (this._is_selected(lastidx) && this._is_selected(idx)) {
					this._do_deselect(lastidx, true);
					this._set_last_selectfocused(idx);
				}
				else if (!this._is_selected(lastidx)) {
					this._do_select(lastidx, true);
					this._do_select(idx, true);
				}
				else {
					this._do_select(idx, true);
				}
			}
			else {
				this._shift_select_base_index = null;
				this._deselect_all(true);
				this._do_select(idx);
			}
		}
	};

	_pListBox._getPreCalculateWantTab = function (keycode, shift_key) {
		if (this._selectinfo && this._selectinfo.index > -1) {
			var sel_index = this._selectinfo.index;
			if (sel_index != -1 && this.index == sel_index) {
				return false;
			}
		}
		else {
			var index = this._accessibility_index;
			if (shift_key) {
				if (index < 0) {
					return false;
				}
			}
			else {
				var totalcnt = this._get_contents_rows().length;
				if (index + 1 > totalcnt) {
					return false;
				}
			}
		}

		return this._want_tab;
	};

	_pListBox._getPreCalculateWantArrow = function (keycode) {
		if (nexacro._enableaccessibility && (nexacro._accessibilitytype == 4 || nexacro._accessibilitytype == 5)) {
			return true;
		}
		else if (keycode == nexacro.Event.KEY_UP) {
			var index = this._accessibility_index;
			if (index == 0 && !this._isAccessibilityEnable()) {
				return false;
			}
			else if (this._accessibility_index == -1) {
				var nex_idx = this._getNextAccessibilityOrderIndex(-1);

				if (nex_idx > -1) {
					return true;
				}
				else {
					return false;
				}
			}
		}
		else if (keycode == nexacro.Event.KEY_DOWN) {
			if (this.index) {
				var totalcnt = this._get_contents_rows().length;
				if (this.index > -1 && this._accessibility_index == -1) {
					return true;
				}
				else if (index >= totalcnt - 1 || this._getNextAccessibilityOrderIndex(1) >= totalcnt || this._getNextAccessibilityOrderIndex(1) < 0) {
					return false;
				}
			}
			else {
				return true;
			}
		}

		return this._want_arrow;
	};

	_pListBox._getNextAccessibilityOrderIndex = function (direction) {
		var cur_idx = this._accessibility_index;
		var ar = this._get_contents_rows();
		if (direction > 0) {
			for (var i = cur_idx + direction; i < ar.length; i++) {
				if (ar[i]._isAccessibilityEnable()) {
					return i;
				}
			}
			cur_idx = -1;
		}
		else if (direction < 0) {
			for (var i = cur_idx + direction; i >= 0; i--) {
				if (ar[i]._isAccessibilityEnable()) {
					return i;
				}
			}
			cur_idx = this._accessibility_index = -1;
		}

		return cur_idx;
	};

	_pListBox._do_scroll = function (dir) {
		var visible_start = this._get_first_visible_row();
		var rowheight = this._get_rowheight();

		var vscrollbar = this.vscrollbar;
		if (vscrollbar) {
			var idx = visible_start;

			if (dir == "down") {
				idx += 1;
			}
			else {
				if (vscrollbar.pos <= idx * rowheight) {
					idx -= 1;
				}
			}

			vscrollbar.set_pos(idx * rowheight);
			vscrollbar = null;
		}
	};

	_pListBox._select_add = function (selectIdx) {
		if (selectIdx < 0 || selectIdx > this._innerdataset.getRowCount() - 1) {
			return;
		}
		var k = selectIdx + "";
		var info = this._select_multi;
		var old = info.map[k];

		if (typeof old != 'undefined') {
			return this._select_replace(k, selectIdx);
		}
		info.map[k] = selectIdx;
		info.length++;
		info.items.push(selectIdx);
		info.keys.push(k);

		this._changeIndex(selectIdx, undefined, undefined, "_select_add");
	};

	_pListBox._select_replace = function (k, selectIdx) {
		var idx = this._select_indexOfkey(k);
		var info = this._select_multi;
		info.items[idx] = selectIdx;
		info.map[k] = selectIdx;
	};

	_pListBox._select_indexOfkey = function (k) {
		k += "";
		return nexacro._indexOf(this._select_multi.keys, k);
	};

	_pListBox._get_selectcount = function () {
		return this._select_multi.length;
	};

	_pListBox._select_remove = function (selectIdx) {
		var idx = this._select_indexOfkey(selectIdx);
		var info = this._select_multi;
		if (idx < info.length && idx >= 0) {
			info.length--;
			info.items.splice(idx, 1);
			var k = info.keys[idx];
			if (typeof k != 'undefined') {
				info.map[k] = undefined;
			}
			info.keys.splice(idx, 1);
			if (!this.multiselect && info.length == 0) {
				this.index = -1;
				this.text = "";
				this.value = undefined;
			}

			return selectIdx;
		}

		return false;
	};

	_pListBox._select_indexOf = function (selectIdx) {
		if (!this.multiselect) {
			return this._selectinfo ? this._selectinfo.index == selectIdx : -1;
		}
		else {
			return nexacro._indexOf(this._select_multi.items, selectIdx);
		}
	};

	_pListBox._get_selection_last = function () {
		var info = this._select_multi;
		return info.items[info.length - 1];
	};

	_pListBox._get_select_range = function (start, end) {
		var info = this._select_multi;
		var items = info.items, range = [], i;

		if (items.length < 1) {
			return range;
		}

		start = start || 0;
		end = Math.min(typeof end == 'undefined' ? info.length - 1 : end, info.length - 1);

		if (start <= end) {
			for (i = start; i <= end; i++) {
				range[range.length] = items[i];
			}
		}
		else {
			for (i = start; i >= end; i--) {
				range[range.length] = items[i];
			}
		}

		return range;
	};

	_pListBox._select_clear = function () {
		var items = this._get_contents_rows();
		var length = items.length;
		if (items) {
			for (var i = 0; i < length; i++) {
				items[i].set_selected(false);
			}
		}
		this._select_multi = {
			"items" : [], 
			"map" : {
			}, 
			"keys" : [], 
			"length" : 0, 
			"lastselected" : null
		};
	};

	_pListBox._is_selected = function (idx) {
		return this._select_indexOf(idx) !== -1;
	};

	_pListBox._select_range = function (startRow, endRow, keepExisting, dir) {
		if (!keepExisting) {
			this._deselect_all(true);
		}

		var selectedCount = 0, i, tmp, dontdeselect, rows = [], FinalRow = endRow;

		if (!nexacro._isNumber(startRow)) {
			startRow = 0;
		}
		if (!nexacro._isNumber(endRow)) {
			endRow = this._get_rowcount();
		}

		if (startRow > endRow) {
			tmp = endRow;
			endRow = startRow;
			startRow = tmp;
			FinalRow = tmp;
		}

		for (i = startRow; i <= endRow; i++) {
			if (this._is_selected(i)) {
				selectedCount++;
			}
		}

		if (!dir) {
			dontdeselect = -1;
		}
		else {
			dontdeselect = (dir == 'up') ? startRow : endRow;
		}

		for (i = startRow; i <= endRow; i++) {
			if (selectedCount == (endRow - startRow + 1)) {
				if (i != dontdeselect) {
					this._do_deselect(i, true);
				}
			}
			else {
				rows.push(i);
			}
		}
		this._do_multi_select(rows, true);
		this._changeIndex(FinalRow);
	};

	_pListBox._deselect_all = function (isNotFireEvent) {
		var i = 0, len = this._get_rowcount();

		for (; i < len; i++) {
			this._do_deselect(i, isNotFireEvent);
		}
	};

	_pListBox._do_select = function (rows, keepExisting, isNotFireEvent) {
		if (this.readonly) {
			return false;
		}
		var idx;

		if (typeof rows === "number") {
			rows = [rows];
		}

		if (this._get_select_mode() == "single" && rows) {
			idx = rows.length ? rows[0] : rows;
			this._do_single_select(idx, isNotFireEvent);
		}
		else {
			this._do_multi_select(rows, keepExisting, isNotFireEvent);
		}
	};

	_pListBox._do_deselect = function (rows, isNotFireEvent) {
		if (nexacro._isNumber(rows)) {
			rows = [rows];
		}
		else if (!nexacro._isArray(rows)) {
			rows = [rows];
		}

		var len = rows.length;
		var idx, i = 0, attempted = 0;
		var params = [0];
		var info = this._select_multi;

		for (; i < len; i++) {
			idx = rows[i];
			if (this._is_selected(idx)) {
				++attempted;
				this._on_select_change(idx, false, "deselect", params, isNotFireEvent);
			}
		}

		return params[0] === attempted;
	};

	_pListBox._select_commit = function (jobgbn, row, params) {
		var info = this._select_multi;

		switch (jobgbn) {
			case "deselect":
				++(params[0]);
				this._select_remove(row);
				break;
			case "singleselect":
				var last_select_row = info.lastselected;
				this._select_add(row);
				if (last_select_row != row && this._get_selectcount() > 0 && this._do_deselect(last_select_row) === false) {
					return false;
				}
				params[0] = true;
				break;
			case "multiselect":
				this._select_add(row);
				params[0] = true;
				break;
		}
	};

	_pListBox._do_single_select = function (idx, isNotFireEvent) {
		var params = [false];
		this._on_select_change(idx, true, "singleselect", params, isNotFireEvent);

		if (params[0]) {
			if (!isNotFireEvent) {
				this._set_last_selectfocused(idx);
			}
		}
	};

	_pListBox._do_multi_select = function (rows, keepExisting, isNotFireEvent) {
		var sel_row = rows[0];
		var single_sel = this._selectinfo.index;

		var len = rows.length;

		if (!keepExisting && this._get_selectcount() > 0) {
			if (this._do_deselect(this._get_select_range(), isNotFireEvent) === false) {
				return;
			}
		}

		var params = [false];
		var i = 0, idx;
		var info = this._select_multi;

		for (; i < len; i++) {
			idx = rows[i];
			if (keepExisting && this._is_selected(idx)) {
				continue;
			}
			this._on_select_change(idx, true, "multiselect", params, isNotFireEvent);
		}
		this._set_last_selectfocused(sel_row, isNotFireEvent);
	};

	_pListBox._set_last_selectfocused = function (idx, isNotFireEvent) {
		var rowBeforeLast = this._select_multi.lastselected;
		this._select_multi.lastselected = idx;

		if (idx !== rowBeforeLast) {
			this._on_last_selectfocuschanged(idx, isNotFireEvent);
		}
	};

	_pListBox._on_select_change = function (idx, isSelected, jobgbn, params, isNotFireEvent) {
		if (this._select_commit(jobgbn, idx, params) !== false) {
			if (isSelected) {
				this._refresh_row(idx, "select", true);
			}
			else {
				this._refresh_row(idx, "select", false);
			}
		}
	};

	_pListBox._on_last_selectfocuschanged = function (newFocused, isNotFireEvent) {
		if (newFocused > -1) {
			var control_elem = this.getElement();
			var visible_start = this._get_first_visible_row();
			var visible_end = this._get_last_visible_row(true);

			if (this.vscrollbar) {
				if (newFocused <= visible_start) {
					this.vscrollbar.set_pos(newFocused * this._get_rowheight());
				}
				else if (newFocused >= visible_end) {
					if (control_elem) {
						var pos = (newFocused + 1) * this._get_rowheight() - control_elem.client_height;
						this.vscrollbar.set_pos(pos);
					}
				}
			}
			else {
				var item = this._get_contents_rows();
				if (item[newFocused]) {
					var item_control_elem = item[newFocused].getElement();
					if (item_control_elem) {
						item_control_elem.setElementFocus();
					}
				}
			}
		}
	};

	_pListBox._search_style_obj = function (propobj, propid, idx) {
		if (propobj && propobj._bindtype != 0) {
			if (this._is_subcontrol) {
				return nexacro._getValueForStyleBindExpr(this.parent, propobj, propid, idx);
			}
			else {
				return nexacro._getValueForStyleBindExpr(this, propobj, propid, idx);
			}
		}
		else {
			return propobj;
		}
	};

	_pListBox._do_defocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, true);
		}
	};

	_pListBox._changeIndex = function (v, bIgnoreCompareIdx, change_by_script) {
		if (bIgnoreCompareIdx || v != this.index) {
			var dataset = this._innerdataset;
			var postindex = parseInt(v, 10) | 0;

			var preidx = this.index;
			var pretext = this.text;
			var prevalue = this.value;

			var column = (this.codecolumn || this.datacolumn);
			if (dataset && column) {
				var datavalue = dataset.getColumn(postindex, this.datacolumn || this.codecolumn);
				var codevalue = dataset.getColumn(postindex, this.codecolumn || this.datacolumn);

				var posttext = datavalue == undefined ? "" : datavalue;
				var postvalue = codevalue;


				this._prevpos = this._vscrollpos;

				if (change_by_script != true) {
					if (this.on_fire_canitemchange(this, preidx, pretext, prevalue, postindex, posttext, postvalue) != false) {
						this._accessibility_index = this.index = postindex;
						this.text = posttext;
						if (!this._is_value_setting) {
							this.value = postvalue;
						}
						this.applyto_bindSource("value", codevalue);
						this.on_fire_onitemchanged(this, preidx, pretext, prevalue, postindex, posttext, postvalue);
						return true;
					}
				}
				else {
					this._accessibility_index = this.index = postindex;
					this.text = posttext;
					if (!this._is_value_setting) {
						this.value = postvalue;
					}
					this.applyto_bindSource("value", codevalue);
					return true;
				}
			}
		}

		return false;
	};

	delete _pListBox;
	_pListBox = null;

	nexacro.ListItemCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
		this._is_reference_control = false;

		this._accessibility_role = "listitem";

		this.index = "";
		this.value = undefined;
		this.selected = false;

		this._keep_selecting = false;
		this.wordwrap = "none";
	};

	var _pListItemCtrl = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.ListItemCtrl);
	nexacro.ListItemCtrl.prototype = _pListItemCtrl;

	_pListItemCtrl.destroy = function () {
		this._removeEventHandler("onlbuttondown", this.parent.on_notify_item_onlbuttondown, this.parent);
		this._removeEventHandler("ontouchstart", this.parent.on_notify_item_onlbuttondown, this.parent);
		this._removeEventHandler("ondblclick", this.parent.on_notify_item_ondblclick, this.parent);
		this._removeEventHandler("onmouseenter", this.parent.on_notify_item_onmouseenter, this.parent);
		this._removeEventHandler("onmouseleave", this.parent.on_notify_item_onmouseleave, this.parent);
		nexacro.Component.prototype.destroy.call(this);
	};

	_pListItemCtrl.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var style = this.on_find_CurrentStyle_font(pseudo);
		if (style != curstyle.font) {
			curstyle.font = style;
			this.on_apply_style_font(style);
		}

		style = this.on_find_CurrentStyle_color(pseudo);
		if (style != curstyle.color) {
			curstyle.color = style;
			this.on_apply_style_color(style);
		}

		style = this.on_find_CurrentStyle_align(pseudo);
		if (style != curstyle.align) {
			curstyle.align = style;
			this.on_apply_style_align(style);
		}

		style = this.on_find_CurrentStyle_linespace(pseudo);
		if (style != curstyle.linespace) {
			curstyle.linespace = style;
			this.on_apply_style_linespace(style);
		}
		style = this.on_find_CurrentStyle_accessibility(pseudo);
		if (style != curstyle.accessibility) {
			curstyle.accessibility = this._make_accessibility_value(style);
			this.on_apply_style_accessibility(curstyle.accessibility);
		}

		style = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (style != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = style;
			this.on_apply_style_rtlimagemirroring(curstyle.rtlimagemirroring);
		}

		style = null;
	};

	_pListItemCtrl.on_find_CurrentStyle_background = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_itembackground(pseudo);
		return this.parent._search_style_obj(propobj, "background", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_itemgradation(pseudo);
		return this.parent._search_style_obj(propobj, "gradation", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_border = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_itemborder(pseudo);
		return this.parent._search_style_obj(propobj, "border", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_itembordertype(pseudo);
		return this.parent._search_style_obj(propobj, "bordertype", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_padding = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_itempadding(pseudo);
		return this.parent._search_style_obj(propobj, "padding", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_color = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_color(pseudo);
		return this.parent._search_style_obj(propobj, "color", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_font = function (pseudo) {
		if ((this._keep_selecting || this.selected) && this.parent.enable) {
			pseudo = "selected";
		}

		var propobj = this.parent.on_find_CurrentStyle_font(pseudo);
		return this.parent._search_style_obj(propobj, "font", this.index);
	};

	_pListItemCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return this.parent.on_find_CurrentStyle_align(pseudo);
	};

	_pListItemCtrl.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemaccessibility(pseudo);
	};

	_pListItemCtrl.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		return this.parent.on_find_CurrentStyle_rtlimagemirroring(pseudo);
	};

	_pListItemCtrl.on_apply_custom_setfocus = function (evt_name) {
		if (!this.parent._is_subcontrol && this.parent._pseudo == "focused") {
			nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
		}
	};

	_pListItemCtrl.isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pListItemCtrl._getAccessibilityLabel = function (accessibility) {
		var flag = this.parent._is_first_focus;
		var label = "";
		if (flag && this._isAccessibilityEnable()) {
			var parent = this.parent;
			var p_accessibility = parent.on_find_CurrentStyle_accessibility(parent._pseudo);
			label = parent._getAccessibilityParentValue(p_accessibility);
		}
		label += " " + nexacro.Component.prototype._getAccessibilityLabel.call(this, accessibility);
		return label;
	};

	_pListItemCtrl._getAccessibilityRole = function (accessibility) {
		var role = "";
		if (this._isAccessibilityEnable()) {
			var parent = this.parent;
			if (parent._is_first_focus) {
				var p_accessibility = parent.on_find_CurrentStyle_accessibility(parent._pseudo);
				role = p_accessibility.role ? p_accessibility.role : parent._accessibility_role;
			}
			else {
				role = accessibility.role ? accessibility.role : this._accessibility_role;
			}
		}
		return role;
	};

	_pListItemCtrl._setAccessibilityStatFocus = function (evt_name) {
		var list = this.parent;

		if (!list._is_subcontrol && list._pseudo == "focused") {
			if (list.multiselect && list._shift_select_base_index && list._shift_select_base_index != this.index) {
				var item = list._get_contents_rows()[list._shift_select_base_index];
				if (item && item._pseudo == "selected") {
					var label = item._getAccessibilityLabel(item.on_find_CurrentStyle_accessibility(this._pseudo));
					label += " " + this._getAccessibilityLabel(this.on_find_CurrentStyle_accessibility(this._pseudo));
					this._setAccessibilityLabel(label);
				}
			}
			return nexacro.Component.prototype._setAccessibilityStatFocus.call(this, evt_name);
		}
	};

	_pListItemCtrl.on_get_style_accessibility_label = function () {
		return this.text;
	};

	_pListItemCtrl.set_index = function (v) {
		if (v !== this.index) {
			this.index = parseInt(v, 10);
		}
	};

	_pListItemCtrl.set_value = function (v) {
		if (v !== this.value) {
			this.value = v;
		}
	};

	_pListItemCtrl.set_selected = function (v) {
		if (v != this.selected) {
			this.selected = v;
			this.on_apply_selected();
		}
	};

	_pListItemCtrl.on_apply_selected = function () {
		this._control_pseudo = "";
		this._contents_pseudo = "";

		if (this.selected) {
			this._stat_change("select", "selected");
		}
		else {
			if (nexacro._enableaccessibility) {
				if (this._control_pseudo == "focused") {
					this._stat_change("notfocus", "normal");
				}
				else {
					this._stat_change("notselect", "normal");
				}
			}
			else {
				this._stat_change("notselect", "normal");
			}
		}
	};

	_pListItemCtrl.on_apply_mouseover = function (isovered) {
		if (isovered) {
			this._stat_change("notselect", "mouseover");
		}
		else {
			if (this.selected) {
				this._stat_change("select", "selected");
			}
			else {
				this._stat_change("notselect", "normal");
			}
		}
	};



	nexacro.ListBoxCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ListBox.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pListBoxCtrl = nexacro.ListBoxCtrl.prototype = nexacro._createPrototype(nexacro.ListBox, nexacro.ListBoxCtrl);

	_pListBoxCtrl._type_name = "ListBoxControl";

	nexacro._setForControlStyleFinder(_pListBoxCtrl);
	delete _pListBoxCtrl;
	_ListBoxCtrl = null;
}
;
