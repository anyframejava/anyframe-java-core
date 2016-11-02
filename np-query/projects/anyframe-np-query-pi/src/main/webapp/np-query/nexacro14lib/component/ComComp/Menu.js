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

if (!nexacro.MenuItem) {
	nexacro.MenuItem = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.index = 0;
		this.datarow = 0;
		this.notexpand = false;
		this.id = "";
		this.enable = true;
		this.level = "";
		this.userdata = null;
		this.selected = false;

		this._init_padding = false;
		this._accessibility_role = "menuitem";
	};

	var _pMenuItem = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.MenuItem);
	nexacro.MenuItem.prototype = _pMenuItem;

	_pMenuItem._type_name = "MenuItem";

	_pMenuItem._updateControl = function (control_elem, pseudo) {
		if (!this._isEnableRedraw()) {
			return;
		}
		if (application._cur_track_info && pseudo == "mouseover") {
			return;
		}

		if (control_elem && this._control_pseudo != pseudo && this._adjust_width != 0 && this._adjust_height != 0) {
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

				control_elem.setElementBorder(border, bordertype);
				control_elem.setElementBackground(background, gradation);
			}

			var opacity = this.on_find_CurrentStyle_opacity(pseudo);
			if (opacity && opacity != curstyle.opacity) {
				curstyle.opacity = opacity;
				control_elem.setElementOpacity(opacity);
			}
			var shadow = this.on_find_CurrentStyle_shadow(pseudo);
			if (shadow && shadow != curstyle.shadow) {
				curstyle.shadow = shadow;
				control_elem.setElementShadow(shadow);
			}
			var cursor = this.on_find_CurrentStyle_cursor(pseudo);
			if (cursor && cursor != curstyle.cursor) {
				curstyle.cursor = cursor;
				control_elem.setElementCursor(cursor);
			}
			if (nexacro._enableaccessibility) {
				var accessibility = this.on_find_CurrentStyle_accessibility(pseudo);
				if (accessibility && accessibility != curstyle.accessibility) {
					curstyle.accessibility = this._make_accessibility_value(accessibility);
					control_elem.setAccessibility(curstyle.accessibility);
				}
			}

			if (this._apply_client_padding) {
				var padding = this.on_find_CurrentStyle_padding(pseudo);

				if ((padding && padding != curstyle.padding) || border_flag) {
					curstyle.padding = padding;
					control_elem.setElementPadding(padding);
				}
			}
			this._updateClientSize(control_elem);
			return true;
		}
		return false;
	};

	_pMenuItem.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent.on_find_CurrentStyle_color(pseudo);
	};
	_pMenuItem.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent.on_find_CurrentStyle_font(pseudo);
	};
	_pMenuItem.on_find_CurrentStyle_letterspace = function (pseudo) {
		return this.parent.on_find_CurrentStyle_letterspace(pseudo);
	};
	_pMenuItem.on_find_CurrentStyle_align = function (pseudo) {
		var align = this.parent.on_find_CurrentStyle_itemalign(pseudo);
		return (align) ? align : nexacro.Component._default_align;
	};
	_pMenuItem.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itembackground(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_padding = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itempadding(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemgradation(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemborder(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itembordertype(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_cursor = function (pseudo) {
		var rootComp = this._getRootComponent(this);
		return rootComp.on_find_CurrentStyle_cursor(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemaccessibility(pseudo);
	};


	_pMenuItem.on_apply_style_padding = function (padding) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementPadding(padding);
			this._updateClientSize(control_elem);
		}
	};

	_pMenuItem.on_apply_style_accessibility = function (accessibility) {
		var control_elem = this._control_element;
		if (control_elem && accessibility) {
			control_elem.setAccessibility(accessibility);

			this._updateAccessibilityLabel(this);
		}
	};

	_pMenuItem.on_apply_mouseover = function (isovered, is_enter) {
		if (this.selected && !is_enter) {
			this._stat_change("normal", "selected");
		}
		else {
			if (isovered) {
				this._stat_change("normal", "mouseover");
			}
			else {
				this._stat_change("normal", "normal");
			}
		}
	};

	_pMenuItem.on_tap_basic_action = function () {
		var parent = this.parent;
		var popupmenu = parent._popupmenu;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				if (parent.beforeindex != this.index) {
					parent.beforeindex = this.index;
				}
				popupmenu.cancelPopup();

				parent._menuitemindex = this.index;
				parent._popupitemindex = -1;
			}
		}

		var rootComp = this._getRootComponent(this);
		if (!this.notexpand) {
			parent._closeflag = true;
			parent._showPopup(this);

			if (rootComp instanceof nexacro.Menu) {
				rootComp._popupitemindex = this.index;
			}
		}
		else {
			if (this.enable == false || rootComp._getPopupType() == "none") {
				return;
			}

			if (rootComp.onmenuclick && rootComp.onmenuclick._has_handlers) {
				rootComp.on_fire_onitemclick(rootComp, "onmenuclick", this.id, this.userdata, this.index, this.parent.level);
				rootComp._popupitemindex = -1;
			}
			rootComp._closePopup();
		}
		return nexacro.Component.prototype.on_tap_basic_action.apply(this, arguments);
	};

	_pMenuItem._getWindowPosition = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var border = this.on_find_CurrentStyle_border(this._pseudo);
			var elem_pos = nexacro._getElementXYInWindow(control_elem._handle);
			var windowLeft = elem_pos[0];
			var windowTop = elem_pos[1];
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


	_pMenuItem._on_dragleave = function (elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp) {
		var ret = nexacro.Component.prototype._on_dragleave.call(this, elem, to_comp, src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, event_bubbles, fire_comp, refer_comp);

		var rootCom = this._getRootComponent(this);
		if (rootCom.ondragleave) {
			rootCom._last_mouseleave_iteminfo.index = this.index;
			rootCom._last_mouseleave_iteminfo.bindindex = this._bindindex;
			rootCom._last_mouseleave_iteminfo.level = this.parent.level;
		}

		return ret;
	};

	_pMenuItem._updateAccessibilityLabel = function (item) {
		var rootComp = this._getRootComponent(this);
		var dataLen = rootComp._innerdataset.getRowCount();
		item._setAccessibilityInfoIndex(item.datarow + 1);
		item._setAccessibilityInfoCount(dataLen);
		item._setAccessibilityFlagHasPopup(item.notexpand ? false : true);
	};

	delete _pMenuItem;
}

if (!nexacro.Menu) {
	nexacro.MenuClickEventInfo = function (obj, id, itemid, itemuserdata, index, level) {
		this.eventid = id || "onmenuclick";
		this.id = itemid;
		this.fromobject = obj;
		this.fromreferenceobject = obj;
		this.index = index;
		this.level = level;

		this.userdata = itemuserdata;
	};
	var _pMenuClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuClickEventInfo);
	nexacro.MenuClickEventInfo.prototype = _pMenuClickEventInfo;
	_pMenuClickEventInfo._type_name = "MenuClickEventInfo";

	delete _pMenuClickEventInfo;

	nexacro.MenuDragEventInfo = function (obj, id, itemid, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, level, index, bindindex) {
		this.id = itemid;
		this.eventid = id || "onmenudrag";

		if (!from_refer_comp) {
			from_refer_comp = from_comp;
		}

		this.cancelable = true;
		this.bubbles = true;

		this.dragdata = dragdata;
		this.userdata = userdata;
		this.sourceobject = src_comp;
		this.sourcereferenceobject = src_refer_comp;
		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = alt_key || false;
		this.ctrlKey = ctrl_key || false;
		this.button = button || "";
		this.shiftKey = shift_key || false;
		this.screenX = screenX || -1;
		this.screenY = screenY || -1;
		this.canvasX = canvasX || -1;
		this.canvasY = canvasY || -1;
		this.clientX = clientX || -1;
		this.clientY = clientY || -1;

		this.level = level;
		this.index = index;
		this.bindindex = bindindex;
	};
	var _pEventMenuDragEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuDragEventInfo);
	nexacro.MenuDragEventInfo.prototype = _pEventMenuDragEventInfo;
	_pEventMenuDragEventInfo._type_name = "MenuDragEventInfo";

	delete _pEventMenuDragEventInfo;

	nexacro.MenuMouseEventInfo = function (obj, id, itemid, strButton, altKey, ctrlKey, shiftKey, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, level, index, bindindex) {
		this.id = itemid;
		this.eventid = id || "onmenumouse";
		this.cancelable = true;
		this.bubbles = true;

		this.fromobject = from_comp;
		this.fromreferenceobject = from_refer_comp;
		this.altKey = altKey || false;
		this.ctrlKey = ctrlKey || false;
		this.button = strButton || "";
		this.shiftKey = shiftKey || false;
		this.screenX = screenX || -1;
		this.screenY = screenY || -1;
		this.canvasX = canvasX || -1;
		this.canvasY = canvasY || -1;
		this.clientX = clientX || -1;
		this.clientY = clientY || -1;

		this.level = level;
		this.index = index;
		this.bindindex = bindindex;
	};

	var _pEventMenuMouseEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuMouseEventInfo);
	nexacro.MenuMouseEventInfo.prototype = _pEventMenuMouseEventInfo;
	_pEventMenuMouseEventInfo._type_name = "MenuMouseEventInfo";

	delete _pEventMenuMouseEventInfo;

	nexacro.Menu_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
	};

	var _pMenuStyle = nexacro._createPrototype(nexacro.Style, nexacro.Menu_Style);
	nexacro.Menu_Style.prototype = _pMenuStyle;

	eval(nexacro._createValueAttributeEvalStr("_pMenuStyle", "autohotkey"));
	eval(nexacro._createValueAttributeEvalStr("_pMenuStyle", "buttonimage"));
	eval(nexacro._createColorAttributeEvalStr("_pMenuStyle", "popupcolor"));
	eval(nexacro._createBorderAttributeEvalStr("_pMenuStyle", "popupborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pMenuStyle", "popupbordertype"));
	eval(nexacro._createPaddingAttributeEvalStr("_pMenuStyle", "popuppadding"));
	eval(nexacro._createFontAttributeEvalStr("_pMenuStyle", "popupfont"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pMenuStyle", "popupbackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pMenuStyle", "popupgradation"));
	eval(nexacro._createAlignAttributeEvalStr("_pMenuStyle", "itemalign"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pMenuStyle", "itembackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pMenuStyle", "itemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pMenuStyle", "itembordertype"));
	eval(nexacro._createGradationAttributeEvalStr("_pMenuStyle", "itemgradation"));
	eval(nexacro._createPaddingAttributeEvalStr("_pMenuStyle", "itempadding"));
	eval(nexacro._createValueAttributeEvalStr("_pMenuStyle", "checkboximage"));
	eval(nexacro._createValueAttributeEvalStr("_pMenuStyle", "expandimage"));
	eval(nexacro._createValueAttributeEvalStr("_pMenuStyle", "popupitemheight"));
	eval(nexacro._createAlignAttributeEvalStr("_pMenuStyle", "popupitemalign"));
	eval(nexacro._createPaddingAttributeEvalStr("_pMenuStyle", "popupitempadding"));
	eval(nexacro._createBorderAttributeEvalStr("_pMenuStyle", "popupitemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pMenuStyle", "popupitembordertype"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pMenuStyle", "popupitembackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pMenuStyle", "popupitemgradation"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pMenuStyle", "itemaccessibility"));
	eval(nexacro._createValueAttributeEvalStr("_pMenuStyle", "popuptype"));

	_pMenuStyle.__custom_emptyObject = function () {
		this.autohotkey = false;
		this.buttonimage = null;
		this.popupcolor = null;
		this.popupborder = null;
		this.popupbordertype = null;
		this.popuppadding = null;
		this.popupfont = null;
		this.popupbackground = null;
		this.popupgradation = null;

		this.itemalign = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;

		this.itempadding = null;
		this.checkboximage = null;
		this.expandimage = null;

		this.popupitemheight = null;
		this.popupitemalign = null;
		this.popupitempadding = null;
		this.popupitemborder = null;
		this.popupitembordertype = null;
		this.popupitembackground = null;
		this.popupitemgradation = null;
		this.itemaccessibility = null;

		this.popuptype = null;
	};

	_pMenuStyle.__get_custom_style_value = function () {
		var val = "";
		var popupitempadding = this.popupitempadding;
		if (popupitempadding && popupitempadding._value.length) {
			val += "popupitempadding:" + this.popupitempadding._value + "; ";
		}

		var popupborder = this.popupborder;
		if (popupborder && popupborder._value.length) {
			val += "popupborder:" + popupborder._value + "; ";
		}
		var popupbordertype = this.popupbordertype;
		if (popupbordertype && popupbordertype._value.length) {
			val += "popupbordertype:" + popupbordertype._value + "; ";
		}
		var popupfont = this.popupfont;
		if (popupfont && popupfont._value.length) {
			val += "popupfont:" + popupfont._value + "; ";
		}
		var popuppadding = this.popuppadding;
		if (popuppadding && popuppadding._value.length) {
			val += "popuppadding:" + popuppadding._value + "; ";
		}
		var popupcolor = this.popupcolor;
		if (popupcolor && popupcolor._value.length) {
			val += "popupcolor:" + popupcolor._value + "; ";
		}
		var popupbackground = this.popupbackground;
		if (popupbackground && popupbackground._value.length) {
			val += "popupbackground:" + popupbackground._value + "; ";
		}
		var popupgradation = this.popupgradation;
		if (popupgradation && popupgradation._value.length) {
			val += "popupgradation:" + popupgradation._value + "; ";
		}

		var itemalign = this.itemalign;
		if (itemalign && itemalign._value.length) {
			val += "itemalign:" + itemalign._value + "; ";
		}
		var itembackground = this.itembackground;
		if (itembackground && itembackground._value.length) {
			val += "itembackground:" + itembackground._value + "; ";
		}
		var itemborder = this.itemborder;
		if (itemborder && itemborder._value.length) {
			val += "itemborder:" + itemborder._value + "; ";
		}
		var itembordertype = this.itembordertype;
		if (itembordertype && itembordertype._value.length) {
			val += "itembordertype:" + itembordertype._value + "; ";
		}
		var itemgradation = this.itemgradation;
		if (itemgradation && itemgradation._value.length) {
			val += "itemgradation:" + itemgradation._value + "; ";
		}
		var itempadding = this.itempadding;
		if (itempadding && itempadding._value.length) {
			val += "itempadding:" + itempadding._value + "; ";
		}

		var popuptype = this.popuptype;
		if (popuptype && popuptype._value.length) {
			val += "popuptype:" + popuptype._value + "; ";
		}

		var checkboximage = this.checkboximage;
		if (checkboximage && checkboximage._value.length) {
			val += "checkboximage:" + checkboximage._value + "; ";
		}
		var expandimage = this.expandimage;
		if (expandimage && expandimage._value.length) {
			val += "expandimage:" + expandimage._value + "; ";
		}

		var popupitembackground = this.popupitembackground;
		if (popupitembackground && popupitembackground._value.length) {
			val += "popupitembackground:" + popupitembackground._value + "; ";
		}
		var popupitemheight = this.popupitemheight;
		if (popupitemheight && popupitemheight._value.length) {
			val += "popupitemheight:" + popupitemheight._value + "; ";
		}
		var popupitemalign = this.popupitemalign;
		if (popupitemalign && popupitemalign._value.length) {
			val += "popupitemalign:" + popupitemalign._value + "; ";
		}
		var popupitemborder = this.popupitemborder;
		if (popupitemborder && popupitemborder._value.length) {
			val += "popupitemborder:" + popupitemborder._value + "; ";
		}
		var popupitembordertype = this.popupitembordertype;
		if (popupitembordertype && popupitembordertype._value.length) {
			val += "popupitembordertype:" + popupitembordertype._value + "; ";
		}
		var popupitemgradation = this.popupitemgradation;
		if (popupitemgradation && popupitemgradation._value.length) {
			val += "popupitemgradation:" + popupitemgradation._value + "; ";
		}

		if (autohotkey && autohotkey._value.length) {
			val += "autohotkey:" + autohotkey._value + "; ";
		}

		var itemaccessibility = this.itemaccessibility;
		if (itemaccessibility && itemaccessibility._value.length) {
			val += "itemaccessibility:" + itemaccessibility._value + "; ";
		}

		return val;
	};

	nexacro.Menu_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.autohotkey = false;
		this.buttonimage = null;
		this.popupcolor = null;
		this.popupborder = null;
		this.popupbordertype = null;
		this.popuppadding = null;
		this.popupfont = null;
		this.popupbackground = null;
		this.popupgradation = null;

		this.itemalign = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;
		this.itempadding = null;

		this.checkboximage = null;
		this.expandimage = null;

		this.popupitemheight = null;
		this.popupitemalign = null;
		this.popupitempadding = null;
		this.popupitemborder = null;
		this.popupitembordertype = null;
		this.popupitembackground = null;
		this.popupitemgradation = null;
		this.itemaccessibility = null;

		this.popuptype = null;
	};

	var _pMenuCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.Menu_CurrentStyle);
	nexacro.Menu_CurrentStyle.prototype = _pMenuCurrentStyle;


	_pMenuCurrentStyle.__custom_emptyObject = _pMenuStyle.__custom_emptyObject;
	_pMenuCurrentStyle.__get_custom_style_value = _pMenuStyle.__get_custom_style_value;

	_pMenuStyle = null;
	_pMenuCurrentStyle = null;


	nexacro.Menu = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.captioncolumn = "";
		this.checkboxcolumn = "";
		this.enablecolumn = "";
		this.hotkeycolumn = "";
		this.iconcolumn = "";
		this.idcolumn = "";
		this.levelcolumn = "";
		this.userdatacolumn = "";
		this.beforeindex = -1;
		this.level = 0;
		this.innerdataset = "";

		this._is_menu_click = false;
		this._innerdataset = "";
		this._popupmenu = null;
		this._items = [];
		this._want_tab = true;
		this._want_arrow = true;
		this._hot_key_list = [];
		this._last_mouseleave_iteminfo = {
			bindindex : -1, 
			index : -1, 
			level : -1
		};

		this.spinupbutton = null;
		this.spindownbutton = null;

		this._spin_width = 15;
		this._scrollIndex = 0;
		this._scrollIndex_tmp = 0;
		this._buttonRect = [];
		this._item_total_width = 0;


		this._accessibility_role = "menubar";
		this._focus_obj = null;


		this._menuitemindex = -1;
		this._menuitemonmouseenter = null;
		this._popupitemLR = -1;
		this._popupitemindex = -1;
		this._popupitempreviousindex = 0;
		this._previousitem = 0;
		this._clickitemindex = -1;

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
			"onmenuclick" : 1, 
			"onmousedown" : 1, 
			"onmouseup" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onflingstart" : 1, 
			"onfling" : 1, 
			"onflingend" : 1, 
			"onpinchstart" : 1, 
			"onpinch" : 1, 
			"onpinchend" : 1, 
			"onlongpress" : 1, 
			"onslidestart" : 1, 
			"onslide" : 1, 
			"onslideend" : 1
		};
	};

	var _pMenu = nexacro._createPrototype(nexacro.Component, nexacro.Menu);
	nexacro.Menu.prototype = _pMenu;

	_pMenu._type_name = "Menu";
	nexacro.Menu._default_image_align = nexacro.Component._default_buttonimg_align;

	_pMenu.on_apply_custom_pseudo = function (pseudo) {
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

		var align = this.on_find_CurrentStyle_align(pseudo);
		if (align != curstyle.align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var itemalign = this.on_find_CurrentStyle_itemalign(pseudo);
		if (curstyle.itemalign != itemalign) {
			curstyle.itemalign = itemalign;
		}

		var itembackground = this.on_find_CurrentStyle_itembackground(pseudo);
		if (curstyle.itembackground != itembackground) {
			curstyle.itembackground = itembackground;
		}

		var itemborder = this.on_find_CurrentStyle_itemborder(pseudo);
		if (curstyle.itemborder != itemborder) {
			curstyle.itemborder = itemborder;
		}

		var itembordertype = this.on_find_CurrentStyle_itembordertype(pseudo);
		if (curstyle.itembordertype != itembordertype) {
			curstyle.itembordertype = itembordertype;
		}

		var itemgradation = this.on_find_CurrentStyle_itemgradation(pseudo);
		if (curstyle.itemgradation != itemgradation) {
			curstyle.itemgradation = itemgradation;
		}

		var itempadding = this.on_find_CurrentStyle_itempadding(pseudo);
		if (curstyle.itempadding != itempadding) {
			curstyle.itempadding = itempadding;
		}

		var checkboximage = this.on_find_CurrentStyle_checkboximage(pseudo);
		if (curstyle.checkboximage != checkboximage) {
			curstyle.checkboximage = checkboximage;
		}

		var expandimage = this.on_find_CurrentStyle_expandimage(pseudo);
		if (curstyle.expandimage != expandimage) {
			curstyle.expandimage = expandimage;
		}

		var popupborder = this.on_find_CurrentStyle_popupborder(pseudo);
		if (curstyle.popupborder != popupborder) {
			curstyle.popupborder = popupborder;
		}

		var popupbordertype = this.on_find_CurrentStyle_popupbordertype(pseudo);
		if (curstyle.popupbordertype != popupbordertype) {
			curstyle.popupbordertype = popupbordertype;
		}

		var popuppadding = this.on_find_CurrentStyle_popuppadding(pseudo);
		if (curstyle.popuppadding != popuppadding) {
			curstyle.popuppadding = popuppadding;
		}

		var popupfont = this.on_find_CurrentStyle_popupfont(pseudo);
		if (curstyle.popupfont != popupfont) {
			curstyle.popupfont = popupfont;
		}

		var popupcolor = this.on_find_CurrentStyle_popupcolor(pseudo);
		if (curstyle.popupcolor != popupcolor) {
			curstyle.popupcolor = popupcolor;
		}

		var popupbackground = this.on_find_CurrentStyle_popupbackground(pseudo);
		if (curstyle.popupbackground != popupbackground) {
			curstyle.popupbackground = popupbackground;
		}

		var popupgradation = this.on_find_CurrentStyle_popupgradation(pseudo);
		if (curstyle.popupgradation != popupgradation) {
			curstyle.popupgradation = popupgradation;
		}

		var popupitemheight = this.on_find_CurrentStyle_popupitemheight(pseudo);
		if (curstyle.popupitemheight != popupitemheight) {
			curstyle.popupitemheight = popupitemheight;
		}

		var popupitempadding = this.on_find_CurrentStyle_popupitempadding(pseudo);
		if (curstyle.popupitempadding != popupitempadding) {
			curstyle.popupitempadding = popupitempadding;
		}

		var popupitembackground = this.on_find_CurrentStyle_popupitembackground(pseudo);
		if (curstyle.popupitembackground != popupitembackground) {
			curstyle.popupitembackground = popupitembackground;
		}

		var popupitemalign = this.on_find_CurrentStyle_popupitemalign(pseudo);
		if (curstyle.popupitemalign != popupitemalign) {
			curstyle.popupitemalign = popupitemalign;
		}

		var popupitemborder = this.on_find_CurrentStyle_popupitemborder(pseudo);
		if (curstyle.popupitemborder != popupitemborder) {
			curstyle.popupitemborder = popupitemborder;
		}

		var popupitembordertype = this.on_find_CurrentStyle_popupitembordertype(pseudo);
		if (curstyle.popupitembordertype != popupitembordertype) {
			curstyle.popupitembordertype = popupitembordertype;
		}

		var popupitemgradation = this.on_find_CurrentStyle_popupitemgradation(pseudo);
		if (curstyle.popupitemgradation != popupitemgradation) {
			curstyle.popupitemgradation = popupitemgradation;
		}

		var autohotkey = this.on_find_CurrentStyle_autohotkey(pseudo);
		if (curstyle.autohotkey != autohotkey) {
			curstyle.autohotkey = autohotkey;
		}

		var accessibility = this.on_find_CurrentStyle_accessibility(pseudo);
		if (curstyle.accessibility != accessibility) {
			curstyle.accessibility = accessibility;
		}

		var itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(pseudo);
		if (curstyle.itemaccessibility != itemaccessibility) {
			curstyle.itemaccessibility = itemaccessibility;
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}

		if (this.spinupbutton) {
			this.spinupbutton._control_pseudo = "";
			this.spinupbutton._contents_pseudo = "";
			this.spinupbutton.on_apply_pseudo(pseudo);
		}
		if (this.spindownbutton) {
			this.spindownbutton._control_pseudo = "";
			this.spindownbutton._contents_pseudo = "";
			this.spindownbutton.on_apply_pseudo(pseudo);
		}
	};

	_pMenu.on_create_custom_style = function () {
		return new nexacro.Menu_Style(this);
	};

	_pMenu.on_create_custom_currentStyle = function () {
		return new nexacro.Menu_CurrentStyle();
	};

	_pMenu.on_find_CurrentStyle_buttonimage = function (pseudo) {
		return this._find_pseudo_obj("buttonimage", pseudo);
	};

	_pMenu.on_find_CurrentStyle_popupcolor = function (pseudo) {
		return this._find_pseudo_obj("popupcolor", pseudo, "color");
	};

	_pMenu.on_find_CurrentStyle_popupborder = function (pseudo) {
		return this._find_pseudo_obj("popupborder", pseudo, "border");
	};

	_pMenu.on_find_CurrentStyle_popupbordertype = function (pseudo) {
		return this._find_pseudo_obj("popupbordertype", pseudo, "bordertype");
	};

	_pMenu.on_find_CurrentStyle_popuppadding = function (pseudo) {
		return this._find_pseudo_obj("popuppadding", pseudo, "padding");
	};

	_pMenu.on_find_CurrentStyle_popupfont = function (pseudo) {
		return this._find_pseudo_obj("popupfont", pseudo, "font");
	};

	_pMenu.on_find_CurrentStyle_letterspace = function (pseudo) {
		return this._find_pseudo_obj("letterspace", pseudo, "letterspace");
	};

	_pMenu.on_find_CurrentStyle_popupbackground = function (pseudo) {
		return this._find_pseudo_obj("popupbackground", pseudo, "background");
	};

	_pMenu.on_find_CurrentStyle_popupgradation = function (pseudo) {
		return this._find_pseudo_obj("popupgradation", pseudo, "gradation");
	};

	_pMenu.on_find_CurrentStyle_itemalign = function (pseudo) {
		return this._find_pseudo_obj("itemalign", pseudo, "align");
	};

	_pMenu.on_find_CurrentStyle_itembackground = function (pseudo) {
		return this._find_pseudo_obj("itembackground", pseudo, "background");
	};

	_pMenu.on_find_CurrentStyle_itemborder = function (pseudo) {
		return this._find_pseudo_obj("itemborder", pseudo, "border");
	};

	_pMenu.on_find_CurrentStyle_itembordertype = function (pseudo) {
		return this._find_pseudo_obj("itembordertype", pseudo, "bordertype");
	};

	_pMenu.on_find_CurrentStyle_itemgradation = function (pseudo) {
		return this._find_pseudo_obj("itemgradation", pseudo, "gradation");
	};

	_pMenu.on_find_CurrentStyle_itempadding = function (pseudo) {
		return this._find_pseudo_obj("itempadding", pseudo, "padding");
	};

	_pMenu.on_find_CurrentStyle_checkboximage = function (pseudo) {
		return this._find_pseudo_obj("checkboximage", pseudo);
	};

	_pMenu.on_find_CurrentStyle_expandimage = function (pseudo) {
		return this._find_pseudo_obj("expandimage", pseudo);
	};

	_pMenu.on_find_CurrentStyle_popupitemheight = function (pseudo) {
		return this._find_pseudo_obj("popupitemheight", pseudo);
	};

	_pMenu.on_find_CurrentStyle_popupitemalign = function (pseudo) {
		return this._find_pseudo_obj("popupitemalign", pseudo);
	};

	_pMenu.on_find_CurrentStyle_popupitempadding = function (pseudo) {
		return this._find_pseudo_obj("popupitempadding", pseudo, "padding");
	};

	_pMenu.on_find_CurrentStyle_popupitemborder = function (pseudo) {
		return this._find_pseudo_obj("popupitemborder", pseudo, "border");
	};

	_pMenu.on_find_CurrentStyle_popupitembordertype = function (pseudo) {
		return this._find_pseudo_obj("popupitembordertype", pseudo, "bordertype");
	};

	_pMenu.on_find_CurrentStyle_popupitembackground = function (pseudo) {
		return this._find_pseudo_obj("popupitembackground", pseudo, "background");
	};

	_pMenu.on_find_CurrentStyle_popupitemgradation = function (pseudo) {
		return this._find_pseudo_obj("popupitemgradation", pseudo, "gradation");
	};

	_pMenu.on_find_CurrentStyle_autohotkey = function (pseudo) {
		return this._find_pseudo_obj("autohotkey", pseudo);
	};

	_pMenu.on_find_CurrentStyle_itemaccessibility = function (pseudo) {
		return this._find_pseudo_obj("itemaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pMenu.on_find_CurrentStyle_popuptype = function (pseudo) {
		return this._find_pseudo_obj("popuptype", pseudo);
	};


	_pMenu.on_update_style_popuptype = function () {
		this.currentstyle.popuptype = this.on_find_CurrentStyle_popuptype(this._pseudo);
	};

	_pMenu.on_update_style_color = function () {
		this.currentstyle.color = this.on_find_CurrentStyle_color(this._pseudo);

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				if (items[i] && items[i].enable) {
					items[i].on_update_style_color();
				}
			}
		}
	};

	_pMenu.on_update_style_font = function () {
		this.currentstyle.font = this.on_find_CurrentStyle_font(this._pseudo);

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				if (items[i]) {
					items[i].on_apply_style_font(this.currentstyle.font);
				}
			}
			this._createMenu(false);
		}
	};

	_pMenu.on_update_style_align = function () {
		this.currentstyle.align = this.on_find_CurrentStyle_align(this._pseudo);

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				if (items[i]) {
					items[i].on_update_style_align();
				}
			}
		}
	};

	_pMenu.on_update_style_buttonimage = function () {
		this.on_apply_style_buttonimage(this.currentstyle.buttonimage = this.on_find_CurrentStyle_buttonimage(this._pseudo));
	};

	_pMenu.on_update_style_popupcolor = function () {
		this.currentstyle.popupcolor = this.on_find_CurrentStyle_popupcolor(this._pseudo);
		if (this._popupmenu) {
			this._popupmenu.on_update_style_color();
		}
	};

	_pMenu.on_update_style_popupborder = function () {
		this.currentstyle.popupborder = this.on_find_CurrentStyle_popupborder(this._pseudo);
		if (this._popupmenu) {
			this._popupmenu.on_update_style_border();
		}
	};

	_pMenu.on_update_style_popupbordertype = function () {
		this.currentstyle.popupbordertype = this.on_find_CurrentStyle_popupbordertype(this._pseudo);
		if (this._popupmenu) {
			this._popupmenu.on_update_style_bordertype();
		}
	};

	_pMenu.on_update_style_popuppadding = function () {
		this.currentstyle.popuppadding = this.on_find_CurrentStyle_popuppadding(this._pseudo);
		if (this._popupmenu) {
			this._popupmenu.on_update_style_padding();
		}
	};

	_pMenu.on_update_style_popupfont = function () {
		this.currentstyle.popupfont = this.on_find_CurrentStyle_popupfont(this._pseudo);
		if (this._popupmenu) {
			this._popupmenu.on_update_style_font();
		}
	};

	_pMenu.on_update_style_popupbackground = function () {
		this.on_apply_style_popupbackground(this.currentstyle.popupbackground = this.on_find_CurrentStyle_popupbackground(this._pseudo));
		if (this._popupmenu) {
			this._popupmenu.on_update_style_background();
		}
	};

	_pMenu.on_update_style_popupgradation = function () {
		this.currentstyle.popupgradation = this.on_find_CurrentStyle_popupgradation(this._pseudo);
		if (this._popupmenu) {
			this._popupmenu.on_update_style_gradation();
		}
	};

	_pMenu.on_update_style_itemalign = function () {
		this.on_apply_style_itemalign(this.currentstyle.itemalign = this.on_find_CurrentStyle_itemalign(this._pseudo));
	};

	_pMenu.on_update_style_itembackground = function () {
		this.on_apply_style_itembackground(this.currentstyle.itembackground = this.on_find_CurrentStyle_itembackground(this._pseudo));
	};

	_pMenu.on_update_style_itemborder = function () {
		this.on_apply_style_itemborder(this.currentstyle.itemborder = this.on_find_CurrentStyle_itemborder(this._pseudo));
	};

	_pMenu.on_update_style_itembordertype = function () {
		this.on_apply_style_itembordertype(this.currentstyle.itembordertype = this.on_find_CurrentStyle_itembordertype(this._pseudo));
	};

	_pMenu.on_update_style_itemgradation = function () {
		this.on_apply_style_itemgradation(this.currentstyle.itemgradation = this.on_find_CurrentStyle_itemgradation(this._pseudo));
	};

	_pMenu.on_update_style_itempadding = function () {
		this.on_apply_style_itempadding(this.currentstyle.itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo));
	};

	_pMenu.on_update_style_checkboximage = function () {
		this.on_apply_style_checkboximage(this.currentstyle.checkboximage = this.on_find_CurrentStyle_checkboximage(this._pseudo));
	};

	_pMenu.on_update_style_expandimage = function () {
		this.on_apply_style_expandimage(this.currentstyle.expandimage = this.on_find_CurrentStyle_expandimage(this._pseudo));
	};

	_pMenu.on_update_style_popupitemheight = function () {
		this.on_apply_style_popupitemheight(this.currentstyle.popupitemheight = this.on_find_CurrentStyle_popupitemheight(this._pseudo));
	};

	_pMenu.on_update_style_popupitemalign = function () {
		this.on_apply_style_popupitemalign(this.currentstyle.popupitemalign = this.on_find_CurrentStyle_popupitemalign(this._pseudo));
	};

	_pMenu.on_update_style_popupitempadding = function () {
		this.on_apply_style_popupitempadding(this.currentstyle.popupitempadding = this.on_find_CurrentStyle_popupitempadding(this._pseudo));
	};

	_pMenu.on_update_style_popupitemborder = function () {
		this.on_apply_style_popupitemborder(this.currentstyle.popupitemborder = this.on_find_CurrentStyle_popupitemborder(this._pseudo));
	};

	_pMenu.on_update_style_popupitembordertype = function () {
		this.on_apply_style_popupitembordertype(this.currentstyle.popupitembordertype = this.on_find_CurrentStyle_popupitembordertype(this._pseudo));
	};

	_pMenu.on_update_style_popupitembackground = function () {
		this.on_apply_style_popupitembackground(this.currentstyle.popupitembackground = this.on_find_CurrentStyle_popupitembackground(this._pseudo));
	};

	_pMenu.on_update_style_popupitemgradation = function () {
		this.on_apply_style_popupitemgradation(this.currentstyle.popupitemgradation = this.on_find_CurrentStyle_popupitemgradation(this._pseudo));
	};

	_pMenu.on_update_style_autohotkey = function () {
		this.on_apply_style_autohotkey(this.currentstyle.autohotkey = this.on_find_CurrentStyle_autohotkey(this._pseudo));
	};

	_pMenu.on_update_style_itemaccessibility = function () {
		this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
	};

	_pMenu.on_apply_style_color = function (color) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				color = this.on_find_CurrentStyle_color(items[i]._pseudo);
				items[i].on_apply_style_color(color);
			}
		}
	};

	_pMenu.on_apply_style_font = function (font) {
		this._createMenu();
	};

	_pMenu.on_apply_style_letterspace = function (letterspace) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_letterspace(letterspace);
			}
		}
		this._calcMenuItem();
		this._updateMenuItemPosition();

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_letterspace(letterspace);
		}
	};

	_pMenu.on_apply_style_itemalign = function (itemalign) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_align(itemalign);
			}
		}
	};

	_pMenu.on_apply_style_itembackground = function (itembackground) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_background(itembackground);
			}
		}
	};

	_pMenu.on_apply_style_itemborder = function (itemborder) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_border(itemborder);
			}
		}
	};

	_pMenu.on_apply_style_itembordertype = function (itembordertype) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_bordertype(itembordertype);
			}
		}
	};

	_pMenu.on_apply_style_itemgradation = function (itemgradation) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_gradation(itemgradation);
			}
		}
	};

	_pMenu.on_apply_style_itempadding = function (itempadding) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_padding(itempadding);
			}
			this._createMenu(false);
		}
	};

	_pMenu.on_apply_style_checkboximage = function (checkboximage) {
		if (checkboximage) {
			this._load_image(checkboximage, 0);
		}

		if (this._popupmenu) {
			this._popupmenu.on_apply_style_checkboximage(checkboximage);
		}
	};

	_pMenu.on_apply_style_expandimage = function (expandimage) {
		if (expandimage) {
			this._load_image(expandimage, 1);
		}

		if (this._popupmenu) {
			this._popupmenu.on_apply_style_expandimage(expandimage);
		}
	};

	_pMenu.on_apply_style_popupborder = function (popupborder) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_border(popupborder);
		}
	};

	_pMenu.on_apply_style_popupbordertype = function (popupbordertype) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_bordertype(popupbordertype);
		}
	};

	_pMenu.on_apply_style_popupfont = function (popupfont) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_font(popupfont);
		}
	};

	_pMenu.on_apply_style_popuppadding = function (popuppadding) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_padding(popuppadding);
		}
	};

	_pMenu.on_apply_style_popupcolor = function (popupcolor) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_color(popupcolor);
		}
	};

	_pMenu.on_apply_style_popupgradation = function (popupgradation) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_gradation(popupgradation);
		}
	};

	_pMenu.on_apply_style_popupbackground = function (popupbackground) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_background(popupbackground);
		}
	};

	_pMenu.on_apply_style_popupitembackground = function (popupitembackground) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itembackground(popupitembackground);
		}
	};

	_pMenu.on_apply_style_popupitemalign = function (popupitemalign) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itemalign(popupitemalign);
		}
	};

	_pMenu.on_apply_style_popupitemborder = function (popupitemborder) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itemborder(popupitemborder);
		}
	};

	_pMenu.on_apply_style_popupitembordertype = function (popupitembordertype) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itembordertype(popupitembordertype);
		}
	};

	_pMenu.on_apply_style_popupitemgradation = function (popupitemgradation) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itemgradation(popupitemgradation);
		}
	};

	_pMenu.on_apply_style_autohotkey = function (autohotkey) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_autohotkey(autohotkey);
		}
	};

	_pMenu.on_apply_style_popupitemheight = function (popupitemheight) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itemheight(popupitemheight);
		}
	};

	_pMenu.on_apply_style_popupitempadding = function (popupitempadding) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_itempadding(popupitempadding);
		}
	};

	_pMenu.on_apply_style_itemaccessibility = function (itemaccessibility) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_accessibility(itemaccessibility);
			}
		}
	};

	_pMenu.on_create_contents = function () {
		var curstyle = this.currentstyle;
		this._createMenu(true);
		if (curstyle.checkboximage) {
			this._load_image(curstyle.checkboximage, 0);
		}

		if (curstyle.expandimage) {
			this._load_image(curstyle.expandimage, 1);
		}
	};

	_pMenu.on_created_contents = function () {
		var control = this.getElement();
		if (control) {
			var items = this._items;
			if (items) {
				var len = this._items.length;
				var item = null;


				for (var i = 0; i < len; i++) {
					items[i].on_created();
				}
			}

			if (nexacro._enableaccessibility) {
				this._want_arrow = true;
				this._setAccessibilityInfoLevel(this.level);
			}

			if (this._innerdataset && this.enablecolumn) {
				this.on_apply_enablecolumn();
			}

			this._createMenu(false);
		}
	};

	_pMenu.on_destroy_contents = function () {
		if (this._popupmenu) {
			this._popupmenu.destroy();
			this._popupmenu = null;
		}

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].destroy();
				items[i] = null;
			}

			this._items = null;
		}
		items = null;

		this._destroySpinButton();
	};

	_pMenu.on_change_containerRect = function (width, height) {
		this._createMenu(false);

		var items = this._items;
		var len = items.length;
		var padding = this.on_find_CurrentStyle_padding(this._pseudo);

		if (padding) {
			height = height - padding.top - padding.bottom;
		}

		for (var i = 0; i < len; i++) {
			items[i].resize(items[i]._adjust_width, height);
		}
	};


	_pMenu.set_autohotkey = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu._setAutohotkey(v);
		}

		if (v != this.autohotkey) {
			this.autohotkey = v;
		}
	};

	_pMenu.set_captioncolumn = function (v) {
		var val = v;
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_captioncolumn(val);
		}

		if (val != this.captioncolumn) {
			this.captioncolumn = val;
			this.on_apply_captioncolumn();
		}
	};

	_pMenu.on_apply_captioncolumn = function () {
		var val = this.captioncolumn;

		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var text = this._innerdataset.getColumn(items[i].datarow, this.captioncolumn);
				if (text) {
					items[i].set_text(text);
				}
				else {
					items[i].set_text("");
				}
			}
		}
	};

	_pMenu.set_checkboxcolumn = function (v) {
		var val = v;
		if (this._popupmenu) {
			this._popupmenu.set_checkboxcolumn(val);
		}

		if (val != this.checkboxcolumn) {
			this.checkboxcolumn = val;
			this._createMenu(false);
		}
		return this.checkboxcolumn;
	};

	_pMenu.set_enablecolumn = function (v) {
		if (v != this.enablecolumn) {
			this.enablecolumn = v;
			this.on_apply_enablecolumn();
		}
		return this.enablecolumn;
	};

	_pMenu.on_apply_enablecolumn = function () {
		var val = this.enablecolumn;

		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var enabletext = this._innerdataset.getColumn(items[i].datarow, this.enablecolumn);

				enabletext = enabletext == false || enabletext == "false" ? false : true;

				items[i].set_enable(enabletext);
			}
		}
		if (this._popupmenu) {
			this._popupmenu.set_enablecolumn(this.enablecolumn);
		}
	};

	_pMenu.set_hotkeycolumn = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_hotkeycolumn(v);
		}

		if (v != this.hotkeycolumn) {
			this.hotkeycolumn = v;
			this._createMenu(false);
		}
		return this.hotkeycolumn;
	};

	_pMenu.set_iconcolumn = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_iconcolumn(v);
		}

		if (v != this.iconcolumn) {
			this.iconcolumn = v;
			this._createMenu(false);
		}
		return this.iconcolumn;
	};

	_pMenu.set_idcolumn = function (v) {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_idcolumn(v);
		}

		if (v != this.idcolumn) {
			this.idcolumn = v;
			this.on_apply_idcolumn();
		}
		return this.idcolumn;
	};

	_pMenu.on_apply_idcolumn = function () {
		var val = this.idcolumn;

		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var id = this._innerdataset.getColumn(items[i].datarow, this.idcolumn);
				items[i].id = id ? id : "";
			}
		}
	};

	_pMenu.set_levelcolumn = function (v) {
		var val = v;
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_levelcolumn(val);
		}

		if (val != this.levelcolumn) {
			this.levelcolumn = val;
			this.on_apply_levelcolumn();
		}
		return this.levelcolumn;
	};

	_pMenu.on_apply_levelcolumn = function () {
		var val = this.levelcolumn;

		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var level = this._innerdataset.getColumn(items[i].datarow, this.levelcolumn);
				items[i].level = level ? level : -1;
			}
		}
	};

	_pMenu.set_userdatacolumn = function (v) {
		var val = v;
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.set_userdatacolumn(val);
		}

		if (val != this.userdatacolumn) {
			this.userdatacolumn = val;
			this.on_apply_userdatacolumn();
		}
		return this.userdatacolumn;
	};

	_pMenu.on_apply_userdatacolumn = function () {
		var val = this.userdatacolumn;

		if (this._innerdataset) {
			this._createMenu(false);

			var items = this._items;
			var len = items.length;
			for (var i = 0; i < len; i++) {
				var userdata = this._innerdataset.getColumn(items[i].datarow, this.userdatacolumn);
				if (userdata) {
					items[i].userdata = userdata;
				}
			}
		}
	};

	_pMenu.setInnerDataset = function (obj) {
		if (!obj) {
			this._innerdataset = null;
			this.innerdataset = "";
			this.on_apply_innerdataset();
		}
		else if (obj instanceof nexacro.Dataset) {
			this._innerdataset = obj;
			this.innerdataset = obj.id;
			this.on_apply_innerdataset();
		}
	};

	_pMenu._setInnerDatasetStr = function (str) {
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

	_pMenu.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pMenu.set_innerdataset = function (str) {
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
		return this.innerdataset;
	};

	_pMenu.on_apply_innerdataset = function () {
		var ds = this._innerdataset;
		if (ds) {
			var callback = this._callbackFromDataset;
			ds._setEventHandler("onrowposchanged", callback, this);
			ds._setEventHandler("oncolumnchanged", callback, this);
			ds._setEventHandler("onrowsetchanged", callback, this);
		}
		var control = this.getElement();
		if (control && this.innerdataset) {
			this._createMenu(true);
			this.beforeindex = -1;
			this.beforevalue = "";
			this.beforeText = "";
		}
	};

	_pMenu.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;

		var items = this._items;
		var iLen = items.length;
		for (var i = 0; i < iLen; i++) {
			items[i]._setRtlDirection(_rtldirection);
		}

		if (this._popupmenu) {
			this._popupmenu._setRtlDirection(_rtldirection);
		}
	};

	_pMenu.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttondown", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttonup", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onrbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttondown && this.onrbuttondown._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onrbuttondown", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onrbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onrbuttonup", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onrbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseup", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmousedown", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseenter", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onmouseenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseleave", from_refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, this._last_mouseleave_iteminfo.level, this._last_mouseleave_iteminfo.index, this._last_mouseleave_iteminfo.bindindex);
			return this.onmouseleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmousemove", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.onmousemove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();

			var self_refer = self_refer_comp._overedobj || self_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondrag", refer_comp.id, dragData, null, this, self_refer_comp, from_comp, refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, self_refer_comp.level, self_refer.index, self_refer._bindindex);
			return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
		}
		return [false];
	};

	_pMenu.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondrop && this.ondrop._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondrop", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondragenter", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.ondragenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var evt = new nexacro.MenuDragEventInfo(this, "ondragleave", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, this._last_mouseleave_iteminfo.level, this._last_mouseleave_iteminfo.index, this._last_mouseleave_iteminfo.bindindex);

			return this.ondragleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondragmove", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp.level, refer_comp.index, refer_comp._bindindex);
			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pMenu.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var pThis = this._popupmenu_find(this);
		var item = this._item_find(pThis);
		var popupvisible = this._popupmenu_visible(this);
		var menuitem = this._items;

		var item_len = item.length - 1;
		var menuitem_len = menuitem.length - 1;

		var E = nexacro.Event;

		var rootComp = this._getRootComponent(this);

		switch (keycode) {
			case E.KEY_TAB:
				if (!popupvisible) {
					this._item_focus(menuitem[this._previousitem], false);
					if (!shift_key && this._menuitemindex == menuitem_len || shift_key && this._menuitemindex < 0) {
						this._want_tab = false;
						this._previousitem = 0;
						this._menuitemindex = -1;
					}
					else {
						if (shift_key) {
							this._menuitemindex--;
						}
						else {
							this._menuitemindex++;
						}

						if (menuitem[this._menuitemindex]) {
							if (nexacro._enableaccessibility) {
								this._focus_obj = menuitem[this._menuitemindex];
							}
							this._previousitem = this._menuitemindex;
							this._menuitemonmouseenter = menuitem[this._menuitemindex];
							this._item_focus(menuitem[this._menuitemindex], true);
						}
						else {
							if (nexacro._enableaccessibility) {
								this._focus_obj = this;
							}
							this._want_tab = false;
							this._previousitem = 0;
							this._menuitemindex = -1;
						}
					}

					this._getWindow()._keydown_element._event_stop = true;
					return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
					break;
				}
				else {
					if (this._popupitemindex > -1 && this._popupitemindex <= item_len) {
						this._item_focus(item[this._popupitemindex], false);
					}

					if (shift_key) {
						this._popupitemindex--;
					}
					else {
						this._popupitemindex++;
					}

					if (this._popupitemindex > item_len) {
						if (popupvisible) {
							if (pThis.parent instanceof nexacro.PopupMenu) {
								this._popupitemindex = pThis.parent._previousitem + 1;
								var item = pThis.parent._items;

								pThis._closePopup();

								if (item.length - 1 < this._popupitemindex) {
									this._popupitemindex = item_len;
								}
								this._menuitemonmouseenter = item[this._popupitemindex];
								this._item_focus(item[this._popupitemindex], true);
							}
							else {
								this._item_focus(menuitem[this._previousitem], false);
								this._popupitemindex = -1;
								this._menuitemindex++;
								pThis._closePopup();
								if (menuitem[this._menuitemindex]) {
									if (nexacro._enableaccessibility) {
										this._focus_obj = menuitem[this._menuitemindex];
									}
									this._previousitem = this._menuitemindex;
									this._item_focus(menuitem[this._menuitemindex], true);
								}
								else {
									this._want_tab = false;
									this._previousitem = 0;
									this._menuitemindex = -1;
									this.parent._last_focused = this;
								}
							}
						}
						else {
							this._popupitemindex = -1;
							this._menuitemindex++;
							pThis._closePopup();
							if (nexacro._enableaccessibility) {
								this._focus_obj = menuitem[this._menuitemindex];
							}
							this._previousitem = this._menuitemindex;
							this._item_focus(menuitem[this._menuitemindex], true);
						}
					}
					else {
						if (this._popupitemindex < 0) {
							if (pThis.parent instanceof nexacro.Menu) {
								pThis._closePopup();
								this._previousitem = this._menuitemindex;
								this._item_focus(menuitem[this._menuitemindex], true);
							}
							else {
								this._popupitemindex = pThis.parent._previousitem - 1;
								var item = pThis.parent._items;

								pThis._closePopup();

								this._item_focus(item[this._popupitemindex], true);
							}
						}
						else {
							this._item_focus(item[this._popupitemindex], true);
						}
					}
					this._getWindow()._keydown_element._event_stop = true;
					break;
				}
			default:
				break;
		}

		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};


	_pMenu.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var pThis = this._popupmenu_find(this);
		var item = this._item_find(pThis);
		var popupvisible = this._popupmenu_visible(this);
		var menuitem = this._items;

		if (menuitem[this._menuitemindex]) {
			var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
		}

		if (item[this._popupitemindex]) {
			var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);
		}

		var item_len = item.length - 1;
		var menuitem_len = menuitem.length - 1;


		var E = nexacro.Event;

		if (nexacro._enableaccessibility) {
			switch (keycode) {
				case E.KEY_UP:
					if (this._focus_obj instanceof nexacro.Menu) {
						this._menuitemindex = -1;
						var prev_comp = this.parent.getPrevAccessibilityComponent(pThis);
						prev_comp._setFocus(false);
					}
					else if (this._focus_obj instanceof nexacro.PopupMenuItem) {
						item = this._item_find(pThis);

						this._item_focus(item[this._popupitemindex], false);

						this._popupitemindex--;
						if (this._popupitemindex < 0) {
							this._popupitemindex = item_len;
						}
						this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
						this._item_focus(item[this._popupitemindex], true);
					}
					else if (this._focus_obj instanceof nexacro.MenuItem) {
						if (popupvisible) {
							this._showPopup(this._focus_obj);
							item = this._item_find(pThis);

							this._item_focus(item[this._popupitemindex], false);

							this._popupitemindex--;
							if (this._popupitemindex < 0) {
								this._popupitemindex = item_len;
							}
							this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
							this._item_focus(item[this._popupitemindex], true);
						}
						else {
							this._focus_obj = pThis;
							this._item_focus(this._focus_obj);
						}
					}

					break;
				case E.KEY_DOWN:
					if (this._focus_obj instanceof nexacro.Menu) {
						this._menuitemindex = 0;
						this._focus_obj = menuitem[this._menuitemindex];
						this._item_focus(this._focus_obj, true);
					}
					else if (this._focus_obj instanceof nexacro.PopupMenuItem) {
						item = this._item_find(pThis);

						this._item_focus(item[this._popupitemindex], false);

						this._popupitemindex++;
						if (this._popupitemindex > item_len) {
							this._popupitemindex = 0;
						}
						this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
						this._item_focus(item[this._popupitemindex], true);
					}
					else if (this._focus_obj instanceof nexacro.MenuItem) {
						if (menuexpand == false) {
							var obj = this._focus_obj;
							this._showPopup(obj);
							item = this._item_find(pThis);
							this._previousitem = this._menuitemindex;
							popupvisible = true;
						}

						if (popupvisible) {
							this._item_focus(item[this._popupitemindex], false);

							this._popupitemindex++;
							if (this._popupitemindex > item_len) {
								this._popupitemindex = 0;
							}
							this._focus_obj = this._menuitemonmouseenter = item[this._popupitemindex];
							if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
								nexacro.OnceCallbackTimer.callonce(this, function () {
									this._item_focus(this._focus_obj, true);
								});
							}
							else {
								this._item_focus(this._focus_obj, true);
							}
						}
					}

					break;
				case E.KEY_LEFT:
					if (popupvisible) {
						this._previousitem = this._menuitemindex;
					}
					else {
						this._menuitemindex--;
						this._previousitem = this._menuitemindex;
					}

					if (this._menuitemindex < 0) {
						this._menuitemindex = menuitem_len;
					}

					if (popupvisible) {
						if (pThis.parent instanceof nexacro.PopupMenu) {
							this._item_focus(item[this._popupitemindex], false);
							this._popupitemindex = pThis.parent._previousitem;
							var item = pThis.parent._items;

							pThis._closePopup();

							this._focus_obj = item[this._popupitemindex];
							this._menuitemonmouseenter = this._focus_obj;
							this._item_focus(this._focus_obj, true);
						}
						else {
							this._previousitem--;

							if (this._previousitem < 0) {
								this._previousitem = menuitem_len;
							}

							this._menuitemindex = this._previousitem;

							var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
							this.on_notify_menuitem_onmouseenter(menuitem[this._menuitemindex]);

							this._popupitemindex = 0;

							if (menuexpand) {
								this._focus_obj = menuitem[this._menuitemindex];
								this._menuitemonmouseenter = this._focus_obj;
								this._item_focus(this._focus_obj, true);
							}
							else {
								var rThis = this._popupmenu_find(this);
								var rItem = this._item_find(rThis);

								this._item_focus(this, false);

								this._focus_obj = rItem[this._popupitemindex];
								this._menuitemonmouseenter = this._focus_obj;
								if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
									nexacro.OnceCallbackTimer.callonce(this, function () {
										this._item_focus(this._focus_obj, true);
									});
								}
								else {
									this._item_focus(this._focus_obj, true);
								}
							}
						}
					}
					else {
						pThis._previousitem = this._menuitemindex;
						this._focus_obj = menuitem[this._menuitemindex];
						this._menuitemonmouseenter = this._focus_obj;
						this._item_focus(this._focus_obj, true);
					}
					break;
				case E.KEY_RIGHT:
					if (popupvisible) {
						this._popupitemLR++;
					}
					else {
						this._menuitemindex++;
						this._previousitem = this._menuitemindex;
					}

					if (this._menuitemindex > menuitem_len) {
						this._menuitemindex = 0;
					}

					if (!menuexpand && popupvisible == true) {
						if (this._popupitemindex == -1) {
							this._popupitemindex = 0;
						}

						var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);
						if (popupexpand) {
							this._popupitemLR = 0;
							this._menuitemindex++;

							if (this._menuitemindex > menuitem_len) {
								this._menuitemindex = 0;
							}

							this.on_notify_menuitem_onmouseenter(menuitem[this._menuitemindex]);

							var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
							if (menuexpand) {
								this._focus_obj = menuitem[this._menuitemindex];
								this._item_focus(this._focus_obj, true);
							}
							else {
								var rThis = this._popupmenu_find(this);
								var rItem = this._item_find(rThis);

								this._item_focus(this, false);

								this._popupitemindex = 0;
								this._focus_obj = rItem[this._popupitemindex];
								if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
									nexacro.OnceCallbackTimer.callonce(this, function () {
										this._item_focus(this._focus_obj, true);
									});
								}
								else {
									this._item_focus(this._focus_obj, true);
								}
							}
						}
						else {
							pThis.on_notify_menuitem_onmouseenter(item[this._popupitemindex]);

							var rItem = this._item_find(pThis);

							this._item_focus(this, false);

							this._popupitemindex = 0;
							this._focus_obj = rItem[this._popupitemindex];
							this._menuitemonmouseenter = this._focus_obj;
							this._item_focus(this._focus_obj, true);
						}
					}
					else {
						this._focus_obj = menuitem[this._menuitemindex];
						this._menuitemonmouseenter = menuitem[this._menuitemindex];
						this._item_focus(this._focus_obj, true);
					}
					break;
				case E.KEY_ENTER:
					if (this._menuitemonmouseenter) {
						if (pThis instanceof nexacro.Menu) {
							pThis.on_notify_menuitem_onclick(this._menuitemonmouseenter);
						}
						else {
							var rThis = this._menuitemonmouseenter.parent;
							rThis.on_notify_menuitem_onclick(this._menuitemonmouseenter);
						}
					}

					break;
				case E.KEY_ESC:
					if (popupvisible) {
						this._popupitemindex = -1;
						pThis._closePopup();
						var item = pThis.parent._items[pThis.parent._previousitem];
						this._item_focus(item, false);
						this._focus_obj = item;
						this._item_focus(item, true);
					}
					break;
				default:
					break;
			}
		}
		else {
			switch (keycode) {
				case E.KEY_UP:
					if (this._menuitemindex > -1) {
						if (popupvisible) {
							this._popupitemindex--;

							if (this._popupitemindex < 0) {
								this._popupitemindex = item_len;
							}

							this._menuitemonmouseenter = item[this._popupitemindex];

							if (this._popupitempreviousindex > -1) {
								this._item_focus(item[this._popupitempreviousindex], false);
							}

							this._item_focus(item[this._popupitemindex], true);
							this._popupitempreviousindex = this._popupitemindex;
						}
					}
					break;
				case E.KEY_DOWN:
					if (this._menuitemindex > -1) {
						if (!menuexpand) {
							if (menuexpand == false && !this._popupmenu) {
								this.on_notify_menuitem_onlbuttondown(menuitem[this._menuitemindex]);
								this._previousitem = this._menuitemindex;
							}
							else if (popupvisible == true) {
								this._popupitemindex++;

								if (this._popupitemindex > item_len) {
									this._popupitemindex = 0;
								}

								this._menuitemonmouseenter = item[this._popupitemindex];

								if (this._popupitempreviousindex > -1) {
									this._item_focus(item[this._popupitempreviousindex], false);
								}

								this._item_focus(item[this._popupitemindex], true);
								this._popupitempreviousindex = this._popupitemindex;
							}
							else if (popupvisible == false) {
								this.on_notify_menuitem_onlbuttondown(menuitem[this._menuitemindex]);
								this._popupitemindex = -1;
							}
						}
					}
					break;
				case E.KEY_LEFT:
					if (popupvisible) {
						this._previousitem = this._menuitemindex;
					}
					else {
						this._menuitemindex--;
					}

					if (this._menuitemindex < 0) {
						this._menuitemindex = menuitem_len;
					}

					if (popupvisible) {
						if (pThis.parent instanceof nexacro.PopupMenu) {
							this._popupitemindex = pThis.parent._previousitem;
							var item = pThis.parent._items;

							pThis._closePopup();

							this._menuitemonmouseenter = item[this._popupitemindex];
							this._item_focus(item[this._popupitemindex], true);
							this._popupitempreviousindex = this._popupitemindex;
						}
						else {
							this._previousitem--;

							if (this._previousitem < 0) {
								this._previousitem = menuitem_len;
							}

							this._menuitemindex = this._previousitem;

							var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
							this.on_notify_menuitem_onmouseenter(menuitem[this._menuitemindex]);
							this._item_focus(menuitem[this._menuitemindex], true);

							this._popupitemindex = 0;

							if (menuexpand) {
								this._menuitemonmouseenter = menuitem[this._menuitemindex];
								this._item_focus(menuitem[this._menuitemindex], true);
							}
							else {
								var rThis = this._popupmenu_find(this);
								var rItem = this._item_find(rThis);

								this._menuitemonmouseenter = rItem[this._popupitemindex];
								this._item_focus(rItem[this._popupitemindex], true);
								this._popupitempreviousindex = this._popupitemindex;
							}
						}
					}
					else {
						this._menuitemonmouseenter = menuitem[this._menuitemindex];

						if (this._previousitem > -1) {
							this._item_focus(menuitem[this._previousitem], false);
						}
						this._item_focus(menuitem[this._menuitemindex], true);
						this._previousitem = this._menuitemindex;
					}
					break;
				case E.KEY_RIGHT:
					if (popupvisible) {
						this._popupitemLR++;
					}
					else {
						this._menuitemindex++;
					}

					if (this._menuitemindex > menuitem_len) {
						this._menuitemindex = 0;
					}

					if (!menuexpand && popupvisible == true) {
						if (this._popupitemindex == -1) {
							this._popupitemindex = 0;
							var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);
						}

						if (popupexpand) {
							this._popupitemLR = 0;
							this._menuitemindex++;

							if (this._menuitemindex > menuitem_len) {
								this._menuitemindex = 0;
							}

							this._previousitem = this._menuitemindex;
							var menuexpand = this._popupmenuitem_extend(menuitem[this._menuitemindex]);
							this.on_notify_menuitem_onmouseenter(menuitem[this._menuitemindex]);
							this._item_focus(menuitem[this._menuitemindex], true);

							if (menuexpand) {
								this._menuitemonmouseenter = menuitem[this._menuitemindex];
								this._item_focus(menuitem[this._menuitemindex], true);
							}
							else {
								var rThis = this._popupmenu_find(this);
								var rItem = this._item_find(rThis);

								this._popupitemindex = 0;

								this._menuitemonmouseenter = rItem[this._popupitemindex];
								this._item_focus(rItem[this._popupitemindex], true);
								this._popupitempreviousindex = this._popupitemindex;
							}
						}
						else {
							pThis._previousitem = this._popupitemindex;
							pThis._closeflag = true;
							pThis._showPopup(item[this._popupitemindex]);

							var rItem = this._item_find(pThis);

							this._popupitemindex = 0;

							this._menuitemonmouseenter = rItem[this._popupitemindex];
							this._item_focus(rItem[this._popupitemindex], true);
							this._popupitempreviousindex = this._popupitemindex;
						}
					}
					else {
						this._menuitemonmouseenter = menuitem[this._menuitemindex];

						if (this._previousitem > -1) {
							this._item_focus(menuitem[this._previousitem], false);
						}
						this._item_focus(menuitem[this._menuitemindex], true);
						this._previousitem = this._menuitemindex;
					}
					break;
				case E.KEY_ENTER:
					if (this._menuitemonmouseenter) {
						if (menuexpand == false && !this._popupmenu) {
							this.on_notify_menuitem_onlbuttondown(menuitem[this._menuitemindex]);
							this._previousitem = this._menuitemindex;
						}
						else if (pThis instanceof nexacro.Menu) {
							pThis.on_notify_menuitem_onclick(this._menuitemonmouseenter);
						}
						else {
							var rThis = this._menuitemonmouseenter.parent;
							rThis.on_notify_menuitem_onclick(this._menuitemonmouseenter);
						}
					}
					break;
				case E.KEY_ESC:
					if (popupvisible) {
						pThis._closePopup();
						var item = pThis.parent._items[pThis.parent._previousitem];
						this._item_focus(item, true);
					}
					break;
				default:
					break;
			}
		}
		return nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pMenu._do_defocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, false);
		}
	};

	_pMenu._setFocus = function (bResetScroll, dir, bInner) {
		var retn = this.setFocus(bResetScroll);
		var menuitem = this._items;
		var menuitem_len = menuitem.length - 1;

		if (menuitem_len > 0) {
			if (dir >= 2) {
				this._focus_obj = this;
				this._menuitemindex = -1;
			}
			else {
				if (dir == 0) {
					this._previousitem = this._menuitemindex = 0;
				}
				else if (dir == 1) {
					this._previousitem = this._menuitemindex = menuitem_len;
				}
				this._focus_obj = menuitem[this._menuitemindex];
				this._menuitemonmouseenter = this._focus_obj;
				this._item_focus(this._focus_obj, true);
			}
		}
		else {
			if (nexacro._enableaccessibility) {
				this._focus_obj = this;
			}
			this._previousitem = 0;
			this._menuitemindex = -1;
			this._do_defocus(this._last_focused, true);
			this._on_focus(true);
		}

		return retn;
	};

	_pMenu.on_notify_menuitem_onmouseleave = function (obj, e) {
		if (obj.selected || (this._popupmenu && this._popupmenu._isVisible())) {
			this._item_focus(obj, true);
		}
		this._last_mouseleave_iteminfo.index = obj.index;
		this._last_mouseleave_iteminfo.bindindex = obj._bindindex;
		this._last_mouseleave_iteminfo.level = obj.parent.level;
	};

	_pMenu.on_notify_menuitem_onmouseenter = function (obj, e) {
		var popupmenu = this._popupmenu;
		this._menuitemonmouseenter = obj;
		this._previousitem = obj.index;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				if (this.beforeindex != obj.index) {
					this.beforeindex = obj.index;
				}
				popupmenu.cancelPopup();
				this._showPopup(obj);

				this._menuitemindex = obj.index;
				this._popupitemindex = -1;
			}
		}

		var item = this._items;
		this._menuitemindex = obj.index;
		for (var i = 0; i < item.length; i++) {
			if (!e || (item[i].index != this._menuitemindex && item[i].index != this._clickitemindex)) {
				this._item_focus(item[i], false);
			}
		}

		this._item_focus(item[obj.index], true, true);
		this._previousitem = obj.index;
		return true;
	};

	_pMenu.on_notify_menuitem_onclick = function (obj, e) {
		if (obj.enable == false || this._getPopupType() == "none") {
			return;
		}

		if (nexacro._enableaccessibility) {
			this._want_tab = true;
		}

		if (!this._is_alive) {
			return;
		}
		if (this.visible && this._isEnable() && this.enableevent) {
			var rootComp = this._getRootComponent(obj);
			if (obj.notexpand) {
				this.on_fire_onitemclick(rootComp, "onmenuclick", obj.id, obj.userdata, obj.index, obj.parent.level);
			}

			if (this._items) {
				var item = this._items[this._menuitemindex];
				if (item) {
					if (item == obj && e) {
						this._item_focus(item, true, true);
					}
					else {
						this._item_focus(item, false);
					}
				}
				else {
					this._item_focus(this._items[this._previousitem], false);
					this._item_focus(this._items[this._clickitemindex], false);
				}
			}

			this._menuitemindex = -1;
			this._menuitemonmouseenter = null;
			this._popupitemLR = -1;
			this._popupitemindex = -1;
			this._popupitempreviousindex = 0;
			this._previousitem = 0;
			this._clickitemindex = obj.index;
		}

		this._previousitem = obj.index;
	};

	_pMenu.on_notify_menuitem_onlbuttondown = function (obj, e) {
		if (!(this._find_lastFocused() instanceof nexacro.Menu)) {
			this._setFocus(false);
		}

		this._item_focus(this._items[this._previousitem], false);
		this._item_focus(this._items[this._clickitemindex], false);

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				if (this.beforeindex != obj.index) {
					this.beforeindex = obj.index;
				}
				popupmenu.cancelPopup();
				this._previousitem = this._menuitemindex = obj.index;
				this._popupitemindex = -1;
			}
		}
		else {
			this._menuitemonmouseenter = obj;
			this._previousitem = this._menuitemindex = obj.index;
		}

		if (!obj.notexpand) {
			this._showPopup(obj);
			this._is_menu_click = true;
			this._menuitemindex = obj.index;
		}
		this._item_focus(obj, true);
	};

	_pMenu.on_fire_onitemclick = function (obj, id, itemid, itemuserdata, index, level) {
		if (this.onmenuclick && this.onmenuclick._has_handlers) {
			var evt = new nexacro.MenuClickEventInfo(obj, id, itemid, itemuserdata, index, level);
			this.onmenuclick._fireEvent(this, evt);
		}
	};

	_pMenu.cancelPopup = function () {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			if (popupmenu.isPopup()) {
				popupmenu.cancelPopup();
			}
			if (this._is_menu_click) {
				this._is_menu_click = false;
			}
		}
		return true;
	};

	_pMenu.isPopup = function () {
		return this._isPopupVisible();
	};

	_pMenu.trackPopup = function (index, x, y, bcapture) {
		index = parseInt(index);
		this._track_capture = bcapture = (bcapture === false || bcapture == "false") ? false : true;
		var align = this.on_find_CurrentStyle_popupitemalign();
		var items = this._items;
		if (items) {
			this._showPopup(items[index], x, y, bcapture);
			this._menuitemindex = items[index].index;
			return true;
		}
		return false;
	};

	_pMenu._calcMenuItem = function () {
		var ds = this._innerdataset;
		var left = 0;
		var index = 0;
		var len = ds.getRowCount();
		var text, id, level, padding, width, border;

		var _buttonRect = this._buttonRect;

		if (_buttonRect[0]) {
			for (var i = 0; i < this._scrollIndex; i++) {
				left -= _buttonRect[i].width;
			}

			if (this._is_spin_visible) {
				if (this._scrollIndex == 0) {
					left = this._spin_width;
				}
			}
		}

		var j = 0;
		var spin_flag = false;
		this._item_total_width = 0;
		for (var i = 0; i < len; i++) {
			id = ds.getColumn(i, this.idcolumn);
			level = ds.getColumn(i, this.levelcolumn);

			if (level == 0) {
				text = ds.getColumn(i, this.captioncolumn);

				size = this._getTextSize(text);

				border = this.on_find_CurrentStyle_itemborder(this._pseudo);
				padding = this.on_find_CurrentStyle_itempadding(this._pseudo);

				width = Math.ceil(size[0]) + (border ? border._left_width + border._right_width : 0) + (padding ? padding.left + padding.right : 0);

				if (this._is_spin_visible && (left + width > this._client_width - this._spin_width)) {
					left = this._client_width;
				}

				var rect = {
					left : 0, 
					top : 0, 
					right : 0, 
					bottom : 0, 
					width : 0
				};
				rect.left = left;
				rect.top = 0;
				rect.right = left + width;
				rect.bottom = this._client_height;
				rect.width = width;

				left += width;

				this._item_total_width += width;

				if (!spin_flag && this._is_spin_visible && this._scrollIndex > 0 && left >= 0) {
					spin_flag = true;
					left += this._spin_width;
				}

				_buttonRect[j] = rect;

				j++;
			}
		}
	};

	_pMenu._calcSpinButton = function () {
		if (!this.spindownbutton && !this.spinupbutton) {
			return;
		}

		var _buttonRect = this._buttonRect;
		var len = _buttonRect.length;

		if (len > 0 && (this._item_total_width > this._client_width)) {
			this._is_spin_visible = true;

			this.spinupbutton.set_visible(true);
			this.spinupbutton.move(0, 0, this._spin_width, this._client_height);

			var left = this._spin_width;
			var client_width = this._client_width;

			this.spindownbutton.set_visible(true);
			this.spindownbutton.move(client_width - left, 0, left, this._client_height);

			this._scrollIndex = this._scrollIndex_tmp;

			var scroll_item_width = 0;
			for (var i = this._scrollIndex; i < len; i++) {
				if (_buttonRect[i].right > (this._client_width - (this._spin_width * 2))) {
					break;
				}

				scroll_item_width += _buttonRect[i].width;
			}

			if (i == len) {
				for (var j = this._scrollIndex - 1; j >= 0; j--) {
					scroll_item_width += _buttonRect[j].width;
					if (scroll_item_width > (this._client_width - (this._spin_width * 2))) {
						break;
					}

					--this._scrollIndex;
				}
				this._scrollIndex_tmp = this._scrollIndex;
			}
		}
		else {
			this._scrollIndex = 0;
			this._is_spin_visible = false;
			this.spinupbutton.set_visible(false);
			this.spindownbutton.set_visible(false);
		}
	};

	_pMenu._updateMenuItemPosition = function () {
		var _buttonRect = this._buttonRect;
		var _items = this._items;
		var len = _items ? _items.length : 0;
		for (var i = 0; i < len; i++) {
			_items[i].move(_buttonRect[i].left, _buttonRect[i].top, _buttonRect[i].width, _buttonRect[i].bottom);
		}
	};

	_pMenu._createMenu = function (init) {
		var control = this.getElement();
		if (control) {
			this._destroySpinButton();
			this._createSpinbutton();

			this._deleteMenu();
			var ds = this._innerdataset;

			if (ds && this.captioncolumn && this.captioncolumn && this.idcolumn) {
				var index = 0;
				var len = ds.getRowCount();
				var text, enable, hotkey, id, level, userdata, size, padding, width, border;
				var item;
				var _buttonRect = this._buttonRect;

				this._calcMenuItem();
				this._calcSpinButton();
				this._calcMenuItem();

				var j = 0;
				for (var i = 0; i < len; i++) {
					hotkey = ds.getColumn(i, this.hotkeycolumn);
					id = ds.getColumn(i, this.idcolumn);
					level = ds.getColumn(i, this.levelcolumn);

					if (hotkey && (i == len - 1 || level >= ds.getColumn(i + 1, this.levelcolumn))) {
						this._set_hotkey(id, hotkey);
					}

					if (level == 0) {
						text = ds.getColumn(i, this.captioncolumn);
						enable = ds.getColumn(i, this.enablecolumn);
						userdata = ds.getColumn(i, this.userdatacolumn);





						var item = new nexacro.MenuItem("item", "absolute", _buttonRect[j].left, 0, _buttonRect[j].width, _buttonRect[j].bottom, null, null, this);
						item._is_subcontrol = true;

						item.userdata = userdata;
						item._bindindex = i;
						item.index = index++;
						item.datarow = i;
						item.id = id ? id : "";

						if (text) {
							item.set_text(text);
						}

						item._setEventHandler("onlbuttondown", this.on_notify_menuitem_onlbuttondown, this);
						item._setEventHandler("onlbuttonup", this.on_notify_menuitem_onclick, this);

						if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
							item._setEventHandler("onmouseenter", this.on_notify_menuitem_onmouseenter, this);
							item._setEventHandler("onmouseleave", this.on_notify_menuitem_onmouseleave, this);
						}

						if (i == ds.getRowCount() - 1) {
							item.notexpand = true;
						}
						else {
							level = ds.getColumn(i + 1, this.levelcolumn);
							if (level <= this.level) {
								item.notexpand = true;
							}
						}

						item.set_enable(enable == false || enable == "false" ? false : true);
						item.createComponent();

						this._items.push(item);
						item = null;
						j++;
					}
				}
			}
		}
	};

	_pMenu._deleteMenu = function () {
		var list = this._hot_key_list;
		var len = list.length;
		var _form = this._getMainForm();

		for (var i = 0; i < len; i++) {
			nexacro._unregisterHotkeyComp(_form, this, list[i].key);
		}

		this._hot_key_list = [];

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].destroy();
				items[i] = null;
			}

			this._items = [];
		}
	};

	_pMenu._createSpinbutton = function () {
		if (!this.spinupbutton) {
			this.spinupbutton = new nexacro.ImageButtonCtrl("decbutton", this.position, 0, 0, 0, 0, null, null, this);
			this.spinupbutton.createComponent();
			this.spinupbutton.set_visible(false);
			this.spinupbutton._setEventHandler("onclick", this.on_notify_spinup_onclick, this);
			this.spinupbutton.on_created();
			this._is_spin_visible = false;
		}
		if (!this.spindownbutton) {
			this.spindownbutton = new nexacro.ImageButtonCtrl("incbutton", this.position, 0, 0, 0, 0, null, null, this);
			this.spindownbutton.createComponent();
			this.spindownbutton.set_visible(false);
			this.spindownbutton._setEventHandler("onclick", this.on_notify_spindown_onclick, this);
			this.spindownbutton.on_created();
			this._is_spin_visible = false;
		}
	};

	_pMenu._destroySpinButton = function () {
		if (this.spinupbutton) {
			this.spinupbutton.destroy();
			this.spinupbutton = null;
		}
		if (this.spindownbutton) {
			this.spindownbutton.destroy();
			this.spindownbutton = null;
		}
	};

	_pMenu._getTextSize = function (text) {
		var font = this.on_find_CurrentStyle_font(this._pseudo) || nexacro.Component._default_font;
		var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
		return nexacro._getTextSize2(letterspace, text, font);
	};

	_pMenu._loaded_expImage = function (imgurl, w, h) {
		this._expImage_width = w;
		this._expImage_height = h;
	};

	_pMenu._loaded_chkImage = function (imgurl, w, h) {
		this._chkImage_width = w;
		this._chkImage_height = h;
	};

	_pMenu._load_image = function (image, flag) {
		var control_elem = this._control_element;
		if (control_elem) {
			var val = (image && image != "") ? image._value : "";
			if (val) {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

				var size;
				if (flag) {
					size = nexacro._getImageSize(val, this._loaded_expImage, this, undefined, (image ? image._value : ""));
					if (size) {
						this._expImage_width = size.width;
						this._expImage_height = size.height;
					}
				}
				else {
					size = nexacro._getImageSize(val, this._loaded_chkImage, this, undefined, (image ? image._value : ""));
					if (size) {
						this._chkImage_width = size.width;
						this._chkImage_height = size.height;
					}
				}
			}
		}
	};

	_pMenu._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_tab = this._want_tab;
		var want_arrow = this._want_arrow;
		this._want_tab = true;
		this._want_arrow = nexacro._enableaccessibility;
		return {
			want_tab : want_tab, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pMenu._showPopup = function (obj, x, y, bcapture) {
		if (this._innerdataset && this.levelcolumn && this.captioncolumn && this.idcolumn && obj.notexpand == false) {
			var popupmenu = this._popupmenu;

			if (popupmenu == null) {
				popupmenu = this._popupmenu = new nexacro.PopupMenuCtrl("popupmenu", "absolute", 0, 0, 0, 0, null, null, this);
				popupmenu._is_subcontrol = true;

				popupmenu._scrollIndex = 0;
				popupmenu._scrollIndex_tmp = 0;
				popupmenu.level = 1;
				popupmenu.index = obj.index;
				popupmenu.datarow = obj.datarow + 1;
				popupmenu.selfpopup = false;

				popupmenu.setInnerDataset(this._innerdataset);

				popupmenu.set_captioncolumn(this.captioncolumn);
				popupmenu.set_checkboxcolumn(this.checkboxcolumn);
				popupmenu.set_hotkeycolumn(this.hotkeycolumn);
				popupmenu.set_idcolumn(this.idcolumn);
				popupmenu.set_levelcolumn(this.levelcolumn);
				popupmenu.set_userdatacolumn(this.userdatacolumn);

				popupmenu.set_enablecolumn(this.enablecolumn);

				popupmenu.style.set_checkboximage(this.currentstyle.checkboximage);
				popupmenu.style.set_expandimage(this.currentstyle.expandimage);

				popupmenu._track_capture = bcapture;
				popupmenu.createComponent();
				popupmenu._setRtlDirection(this._rtldirection);

				popupmenu._setEventHandler("oncloseup", this.on_notify_onclosepopup, this);
				popupmenu.style.popuptype = this.style.popuptype;
				popupmenu._trackPopup(obj, "vertical", x, y);
			}
			else {
				popupmenu.datarow = obj.datarow + 1;
				popupmenu.style.popuptype = this.style.popuptype;
				popupmenu._track_capture = bcapture;
				popupmenu._trackPopup(obj, "vertical", x, y);
			}


			if (popupmenu._is_popup()) {
				var _window = this._getWindow();
				if (_window) {
					if (this._track_capture) {
						_window._setCaptureLock(this, true, false);
					}
					else {
						_window._releaseCaptureLock();
					}
				}
				this._clickitemindex = obj.index;
			}
		}
	};

	_pMenu._isPopupVisible = function () {
		var popupmenu = this._popupmenu;
		return popupmenu ? popupmenu._is_popup() : false;
	};

	_pMenu._callbackFromDataset = function (obj, e) {
		this._createMenu();
	};

	_pMenu._closePopup = function () {
		var popup = this._popupmenu;

		if (this._is_menu_click) {
			this._is_menu_click = false;
		}

		if (popup) {
			popup.cancelPopup();

			var _window = this._getWindow();
			if (_window && this._track_capture) {
				_window._releaseCaptureLock(this);
			}
		}
		this._popupitemindex = -1;
	};

	_pMenu.on_fire_onkillfocus = function (obj, fromObj) {
		if (!(fromObj && fromObj.parent && (fromObj.parent instanceof nexacro.PopupMenu || fromObj.parent instanceof nexacro.PopupMenuCtrl))) {
			this._closePopup();
		}
		var items = this._items;
		if (items) {
			this._item_focus(items[this._previousitem], false);
			this._item_focus(items[this._clickitemindex], false);
		}
		items = null;
		this._clickitemindex = -1;
		nexacro.Component.prototype.on_fire_onkillfocus.call(this, obj, fromObj);
	};

	_pMenu.on_notify_onclosepopup = function (obj, e) {
		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}
	};

	_pMenu.on_notify_spinup_onclick = function (obj, e) {
		this._closePopup();
		this._spinup();
	};

	_pMenu.on_notify_spindown_onclick = function (obj, e) {
		this._closePopup();
		this._spindown();
	};

	_pMenu._spinup = function () {
		if (this._scrollIndex > 0) {
			this._scrollIndex--;

			this._scrollIndex_tmp = this._scrollIndex;

			this._calcMenuItem();
			this._updateMenuItemPosition();
		}
	};

	_pMenu._spindown = function () {
		var _buttonRect = this._buttonRect;
		var len = _buttonRect ? _buttonRect.length : 0;
		if (len == 0) {
			return;
		}

		if (_buttonRect[len - 1].right > this._client_width) {
			this._scrollIndex++;
			this._scrollIndex_tmp = this._scrollIndex;

			this._calcMenuItem();
			this._updateMenuItemPosition();
		}
	};

	_pMenu._on_killfocus = function (new_focus, new_ref_focus) {
		this._closePopup();
	};

	_pMenu._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
		this.setFocus();
		var list = this._hot_key_list;
		var len = list.length;
		var key = null;
		var modifykey = null;
		for (var i = 0; i < len; i++) {
			key = list[i].key;
			if (key._keycode == keycode) {
				modifykey = key._modifierkey;
				if (altKey == ((modifykey & 0x02) == 0x02) && ctrlKey == ((modifykey & 0x01) == 0x01) && shiftKey == ((modifykey & 0x04) == 0x04)) {
					this.on_fire_onitemclick(this, "onmenuclick", list[i].id, "", list[i].index, list.level);
					break;
				}
			}
		}
	};

	_pMenu._set_hotkey = function (id, hotkey) {
		var hkey = this.hotkey;
		this._hotkey = null;

		this.set_hotkey(hotkey);

		var hk = this._hotkey;

		this.hotkey = hkey ? hkey : null;
		this._hotkey = hkey;

		var list = {
			id : id, 
			key : hk
		};
		this._hot_key_list.push(list);
	};

	_pMenu._item_focus = function (obj, bflag, is_enter) {
		if (obj) {
			if (nexacro._enableaccessibility) {
				if (bflag) {
					if (obj instanceof nexacro.PopupMenuItem) {
						obj._on_focus(false);
					}
					else {
						obj._on_focus(true);
					}
				}
				else {
					var _window = this._getWindow();
					if (_window) {
						_window._removeFromCurrentFocusPath(obj, true);
					}
				}
			}

			if (obj.on_apply_mouseover) {
				obj.selected = (is_enter) ? obj.selected : bflag;
				obj.on_apply_mouseover(bflag, is_enter);
			}
		}
	};

	_pMenu._item_find = function (obj) {
		if (obj._popupmenu == null || obj._popupmenu.visible == false) {
			return obj._items;
		}
		return obj._popupmenu._items;
	};

	_pMenu._popupmenu_visible = function (obj) {
		if (obj._popupmenu == null || obj._popupmenu.visible == false) {
			return false;
		}
		return true;
	};

	_pMenu._popupmenu_find = function (obj) {
		var pThis = obj;
		while (pThis) {
			if (pThis._popupmenu === null || pThis._popupmenu.visible == false) {
				break;
			}
			var pThis = pThis._popupmenu;
		}
		return pThis;
	};

	_pMenu._popupmenuitem_extend = function (obj) {
		return obj.notexpand;
	};

	_pMenu._popupmenuitem_find = function (obj) {
		var pThis = obj._overedobj;
		while (pThis) {
			if (pThis._overedobj === null) {
				break;
			}
			var pThis = pThis._overedobj;
		}
		return pThis;
	};

	delete _pMenu;

	nexacro.SpinButtonCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
	};

	var _pSpinButtonCtrl = nexacro.SpinButtonCtrl.prototype = nexacro._createPrototype(nexacro.ImageButtonCtrl, nexacro.SpinButtonCtrl);

	_pSpinButtonCtrl.on_apply_custom_setfocus = function (evt_name) {
		var parent = this.parent;
		if (parent) {
			var edit = parent.spinedit;
			if (edit) {
				if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
					edit.on_apply_custom_setfocus(evt_name);
				}
				else {
					nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
				}
			}
		}
	};

	delete _pSpinButtonCtrl;
	_pSpinButtonCtrl = null;

	nexacro.MenuCtrl = function (id, left, top, right, bottom, parent) {
		nexacro.Menu.call(this, id, left, top, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pMenuCtrl = nexacro.MenuCtrl.prototype = nexacro._createPrototype(nexacro.Menu, nexacro.MenuCtrl);

	_pMenuCtrl._type_name = "MenuControl";

	nexacro._setForControlStyleFinder(_pMenuCtrl);

	delete _pMenuCtrl;
}
;