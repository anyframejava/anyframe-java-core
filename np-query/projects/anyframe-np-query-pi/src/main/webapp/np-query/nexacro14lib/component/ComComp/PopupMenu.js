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

if (!nexacro.PopupMenuItem) {
	nexacro.PopupMenuItem = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.MenuItem.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.chkimgctrl = null;
		this.imgctrl = null;
		this.expimgelem = null;
		this.gap = 5;

		this.chkwidth = 0;
		this.textwidth = 0;
		this.hotkeywidth = 0;
		this.expwidth = 0;
		this.expheight = 0;
		this.index = 0;
		this.datarow = 0;
		this.notexpand = false;

		this.value = false;
		this.expandimage = "";
		this.checkimage = "";
		this.id = "";
		this.enable = true;

		this.icon = "";
		this.userdata = null;
		this.buttonalign = "";

		this._text_elem = null;
		this._hotkey_txtelem = null;
		this._hotkey_string = "";
		this._accessibility_role = "menuitem";
	};

	var _pPopupMenuItem = nexacro._createPrototype(nexacro.MenuItem, nexacro.PopupMenuItem);
	nexacro.PopupMenuItem.prototype = _pPopupMenuItem;

	_pPopupMenuItem._type_name = "PopupMenuItem";


	_pPopupMenuItem.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemborder(pseudo);
	};
	_pPopupMenuItem.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itembackground(pseudo);
	};
	_pPopupMenuItem.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itembordertype(pseudo);
	};
	_pPopupMenuItem.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemgradation(pseudo);
	};
	_pPopupMenuItem.on_find_CurrentStyle_padding = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itempadding(pseudo);
	};
	_pPopupMenuItem.on_find_CurrentStyle_accessibility = function (pseudo) {
		return this.parent.on_find_CurrentStyle_itemaccessibility(pseudo);
	};

	_pMenuItem.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		return this.parent.on_find_CurrentStyle_rtlimagemirroring(pseudo);
	};

	_pPopupMenuItem.on_apply_style_color = function (v) {
		if (this._text_elem) {
			this._text_elem.setElementColor(v);
		}
		if (this._hotkey_txtelem) {
			this._hotkey_txtelem.setElementColor(v);
		}
	};

	_pPopupMenuItem.on_apply_style_font = function (v) {
		if (this._text_elem) {
			this._text_elem.setElementFont(v);
		}
		if (this._hotkey_txtelem) {
			this._hotkey_txtelem.setElementFont(v);
		}
	};

	_pPopupMenuItem.on_apply_style_letterspace = function (v) {
		if (this._text_elem) {
			this._text_elem.setElementLetterSpace(v);
		}
		if (this._hotkey_txtelem) {
			this._hotkey_txtelem.setElementLetterSpace(v);
		}
	};

	_pPopupMenuItem.on_apply_style_accessibility = function (accessibility) {
		var control_elem = this._control_element;
		if (control_elem && accessibility) {
			control_elem.setAccessibility(accessibility);

			this._updateAccessibilityLabel(this);
		}
	};

	_pPopupMenuItem._getWindowPosition = function () {
		return nexacro.Component.prototype._getWindowPosition.call(this);
	};

	_pPopupMenuItem.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;

			if (this.checkimage) {
				var chkimgctrl = this.chkimgctrl = new nexacro.ImageViewerCtrl("chkimg", "absolute", 0, 0, 0, 0, null, null, this);
				this.on_apply_checkimage();
				chkimgctrl.createComponent();
			}
			else if (this.icon) {
				this._load_image(this.icon, "icon");

				var imgctrl = this.imgctrl = new nexacro.ImageViewerCtrl("iconimg", "absolute", 0, 0, 0, 0, null, null, this);
				this.on_apply_icon();
				imgctrl.createComponent();
			}

			if (this.text) {
				var txtelem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				txtelem.setElementFont(curstyle.font);
				txtelem.setElementColor(curstyle.color);
				txtelem.setElementLetterSpace(curstyle.letterspace);
			}

			if (this._hotkey_string) {
				var hotkey_txt_elem = this._hotkey_txtelem = new nexacro.TextBoxElement(control_elem);
				hotkey_txt_elem.setElementFont(curstyle.font);
				hotkey_txt_elem.setElementColor(curstyle.color);
				hotkey_txt_elem.setElementLetterSpace(curstyle.letterspace);
			}

			var exp_img_url = this.expandimage;
			if (exp_img_url) {
				this._load_image(exp_img_url._value);
			}
		}
	};

	_pPopupMenuItem.on_created_contents = function () {
		var txtelem = this._text_elem;
		var hotkey_txtelem = this._hotkey_txtelem;
		var chkimgctrl = this.chkimgctrl;
		var imgctrl = this.imgctrl;
		var expimgelem = this.expimgelem;

		if (chkimgctrl) {
			chkimgctrl.on_created();
		}

		if (imgctrl) {
			imgctrl.on_created();
		}

		if (expimgelem) {
			expimgelem.create();
		}

		if (hotkey_txtelem) {
			this.on_apply_hotkeytext();
			hotkey_txtelem.create();
		}

		if (txtelem) {
			txtelem.create();
		}
	};

	_pPopupMenuItem.on_destroy_contents = function () {
		if (this.imgctrl) {
			this.imgctrl.destroy();
			this.imgctrl = null;
		}

		if (this.chkimgctrl) {
			this.chkimgctrl.destroy();
			this.chkimgctrl = null;
		}
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}

		if (this._hotkey_txtelem) {
			this._hotkey_txtelem.destroy();
			this._hotkey_txtelem = null;
		}

		if (this.expimgelem) {
			this.expimgelem.destroy();
			this.expimgelem = null;
		}
	};

	_pPopupMenuItem.on_change_containerRect = function (width, height) {
		var txtelem = this._text_elem, hotkey_txtelem = this._hotkey_txtelem;
		var text_height = 0, parent_height = 0;

		if (this.parent && this.parent.text_height) {
			text_height = this.parent.text_height;
		}

		if (this.parent) {
			parent_height = this.parent.on_find_CurrentStyle_itemheight();
		}
	};


	_pPopupMenuItem._setValue = function (v) {
		if (this.value != v) {
			this.value = v;
			this.on_apply_value();
		}
	};

	_pPopupMenuItem.on_apply_value = function () {
		var checkimage = this.parent.on_find_CurrentStyle_checkboximage(this._pseudo);
		this._setCheckimage(checkimage);
	};

	_pPopupMenuItem._setIcon = function (v) {
		if (this.icon != v) {
			this.icon = v;
			this.on_apply_icon();
		}
	};

	_pPopupMenuItem.on_apply_icon = function () {
		if (this.imgctrl) {
			this.imgctrl.set_image(this.icon);
		}
	};

	_pPopupMenuItem._setExpandimage = function (v) {
		if (this.expandimage != v) {
			this.expandimage = v;
			this.on_apply_expandimage();
		}
	};

	_pPopupMenuItem.on_apply_expandimage = function () {
		var elem = this.expimgelem;
		var img_url = this.expandimage;

		if (elem) {
			if (!this.notexpand) {
				if (img_url != "") {
					this._load_image(img_url);
				}
				else {
					elem = new nexacro.TextBoxElement(control_elem);
					this.expimgelem = elem;
					elem.setElementText(">");
					elem.setElementFont(this.currentstyle.font);

					if (this._is_created) {
						elem.create();
					}
				}
			}
		}
	};

	_pPopupMenuItem._setCheckimage = function (v) {
		if (this.checkimage != v) {
			this.checkimage = v;
			this.on_apply_checkimage();
		}
	};

	_pPopupMenuItem.on_apply_checkimage = function () {
		if (this.chkimgctrl) {
			if (this._isChecked() == true) {
				this.chkimgctrl.set_image(this.checkimage);
			}
			else {
				this.chkimgctrl.set_image("");
			}
		}
	};

	_pPopupMenuItem._setText = function (v) {
		if (v != this.text) {
			this.text = v;
			this.on_apply_text();
		}
	};

	_pPopupMenuItem.on_apply_text = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var txtelem = this._text_elem;
			if (!txtelem) {
				txtelem = new nexacro.TextBoxElement(control_elem);
				this._text_elem = txtelem;
				txtelem.setElementSize(this._width, this._client_height);
				txtelem.setElementColor(this.currentstyle.color);
				txtelem.setElementFont(this.currentstyle.font);
				txtelem.setElementLetterSpace(this.curstyle.letterspace);

				if (this._is_created) {
					txtelem.create();
				}
			}

			if (this.text || this.text === "") {
				txtelem.setElementText(this.text);
			}
		}
	};

	_pPopupMenuItem._setHotkey = function (v) {
		if (v != this._hotkey_string) {
			this._hotkey_string = v;
			this.on_apply_hotkeytext();
		}
	};

	_pPopupMenuItem.on_apply_hotkeytext = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var elem = this._hotkey_txtelem;

			if (!elem) {
				elem = new nexacro.TextBoxElement(control_elem);
				this._hotkey_txtelem = elem;
				elem.setElementSize(this._width, this._client_height);
				elem.setElementColor(this.currentstyle.color);
				elem.setElementFont(this.currentstyle.font);
				elem.setElementLetterSpace(this.currentstyle.letterspace);

				if (this._is_created) {
					elem.create();
				}
			}

			if (this._hotkey_string || this._hotkey_string === "") {
				elem.setElementText(this._hotkey_string);
			}
		}
	};

	_pPopupMenuItem._setUserdata = function (v) {
		if (v != this.userdata) {
			this.userdata = v;
		}
	};

	_pPopupMenuItem.on_apply_mouseover = function (isovered) {
		if (isovered) {
			this._stat_change("normal", "mouseover");
		}
		else {
			this._stat_change("normal", "normal");
		}
	};

	_pPopupMenuItem.on_apply_style_rtlimagemirroring = function (rtlimagemirroring) {
		var control_elem = this._control_element;
		var exp_img_elem = this.expimg;

		if (control_elem && rtlimagemirroring) {
			control_elem.setElementImageMirror(rtlimagemirroring);

			if (exp_img_elem) {
				exp_img_elem.setElementImageMirror(rtlimagemirroring);
			}
		}
	};

	_pPopupMenuItem.on_apply_prop_rtldirection = function () {
		var control_element = this.getElement();
		var _rtldirection = this._rtldirection;
		var exp_img_elem = this.expimg;

		if (control_element) {
			control_element.setElementRtlDirection(_rtldirection);
			if (exp_img_elem) {
				exp_img_elem.setElementImageMirror(null, true);
			}
		}
	};

	_pPopupMenuItem.on_apply_style_rtlimagemirroring = function (rtlimagemirroring) {
		var control_elem = this._control_element;
		var exp_img_elem = this.expimg;

		if (control_elem && rtlimagemirroring) {
			control_elem.setElementImageMirror(rtlimagemirroring);

			if (exp_img_elem) {
				exp_img_elem.setElementImageMirror(rtlimagemirroring);
			}
		}
	};

	_pPopupMenuItem.on_apply_prop_rtldirection = function () {
		var control_element = this.getElement();
		var _rtldirection = this._rtldirection;
		var exp_img_elem = this.expimg;

		if (control_element) {
			control_element.setElementRtlDirection(_rtldirection);
			if (exp_img_elem) {
				exp_img_elem.setElementImageMirror(null, true);
			}
		}
	};


	_pPopupMenuItem._isChecked = function () {
		var v = this.value;
		if (!!v || v.toString().toLowerCase() == "true") {
			return true;
		}

		return false;
	};

	_pPopupMenuItem._verticalAlign = function (valign) {
		if (this.chkimgctrl) {
			this.chkimgctrl.set_imagealign("center " + valign.toString());
		}
	};

	_pPopupMenuItem._load_image = function (val) {
		var control_elem = this._control_element;
		if (control_elem) {
			if (val) {
				var expimgelem = this.expimgelem;
				if (!expimgelem) {
					expimgelem = new nexacro.ImageElement(control_elem);
					this.expimgelem = expimgelem;
					expimgelem.setElementImageUrl(val);
					var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(this._pseudo);
					expimgelem.setElementImageMirror(rtlimagemirroring, true);
					if (this._is_created) {
						expimgelem.create();
					}
				}
				else {
					expimgelem.setElementImageUrl(val);
				}
			}
		}
	};

	_pPopupMenuItem._updateElementPositions = function (txtwidth, hotkeywidth, itemheight, defaultgap) {
		if (!this._is_created_contents) {
			return;
		}

		var txtelem = this._text_elem;

		if (txtelem) {
			var client_width = this._client_width;
			var adjust_height = this._adjust_height;
			var client_height = this._client_height;
			var chkwidth = this.chkwidth, expwidth = this.expwidth, expheight = this.expheight, iconimgwidth = this.iconimgwidth;

			var halign = "left", valign = "middle";
			var img_halign = "lefttext", img_valign = "middle";

			var textpos_x, textpos_y, hottextpos_x, expimgpos_x;
			var _po = 0, _height = itemheight;

			var imgctrl = this.chkimgctrl;
			var expimgelem = this.expimgelem, hotkeyelem = this._hotkey_txtelem;

			textpos_x = chkwidth == 0 ? iconimgwidth : chkwidth;
			textpos_y = 0;
			hottextpos_x = chkwidth + iconimgwidth + txtwidth;
			expimgpos_x = hottextpos_x + hotkeywidth;

			if (imgctrl) {
				imgctrl.move(0, 0, chkwidth, client_height, null, null);
			}

			if (this.imgctrl) {
				this.imgctrl.move(0, 0, iconimgwidth, client_height, null, null);
			}

			if (!this.notexpand && expimgelem) {
				var imgpos_x = this._convertLeftForRtlLayout((client_width - expwidth), expwidth);
				expimgelem.setElementPosition(imgpos_x, ((client_height - expheight) / 2) | 0);
				expimgelem.setElementSize(expwidth, expheight);
				if (hotkeyelem) {
					hotkeyelem.setElementVisible(false);
				}
			}
			else if (hotkeyelem) {
				hotkeyelem.setElementVisible(true);
				hotkeyelem.setElementPosition(defaultgap, 0);
				hotkeyelem.setElementSize(client_width, client_height);
				hotkeyelem.setElementAlignXY(halign, valign);
				hotkeyelem.setElementPaddingXY(hottextpos_x, textpos_y, 0, 0);
			}

			if (client_height <= itemheight) {
				txtelem.setElementPosition(0, 0);
			}
			txtelem.setElementSize(client_width, client_height);

			txtelem.setElementAlignXY(halign, valign);
			txtelem.setElementPaddingXY(textpos_x, textpos_y, 0, 0);
		}
	};

	_pPopupMenuItem._getWidth = function () {
		var width = this.chkwidth;
		if (this.textwidth > 0) {
			width += (this.textwidth + this.gap);
		}

		if (this.hotkeywidth > 0 && this.expwidth > 0) {
			var maxWidth = Math.max(this.hotkeywidth, this.expwidth);
			width += (maxWidth + this.gap);
		}
		else {
			if (this.hotkeywidth > 0) {
				width += (this.hotkeywidth + this.gap);
			}

			width += this.expwidth;
		}
		return width;
	};

	_pPopupMenuItem._updateAccessibilityLabel = function (item) {
		var rootComp = this._getRootComponent(this);
		var dataLen = rootComp._innerdataset.getRowCount();
		item._setAccessibilityInfoIndex(item.datarow + 1);
		item._setAccessibilityInfoCount(dataLen);
		item._setAccessibilityFlagHasPopup(item.notexpand ? false : true);
	};

	delete _pPopupMenuItem;
}

if (!nexacro.PopupMenu_Style) {
	nexacro.PopupMenu_Style = function (target, idx) {
		nexacro.Style.call(this, target, idx);
		if (target) {
			this._target = target;
		}
	};

	var _pPopupMenuStyle = nexacro.PopupMenu_Style.prototype = nexacro._createPrototype(nexacro.Style, nexacro.PopupMenu_Style);

	eval(nexacro._createAlignAttributeEvalStr("_pPopupMenuStyle", "itemalign"));
	eval(nexacro._createValueAttributeEvalStr("_pPopupMenuStyle", "itemheight"));
	eval(nexacro._createBackgroundAttributeEvalStr("_pPopupMenuStyle", "itembackground"));
	eval(nexacro._createBorderAttributeEvalStr("_pPopupMenuStyle", "itemborder"));
	eval(nexacro._createBordertypeAttributeEvalStr("_pPopupMenuStyle", "itembordertype"));
	eval(nexacro._createGradationAttributeEvalStr("_pPopupMenuStyle", "itemgradation"));
	eval(nexacro._createPaddingAttributeEvalStr("_pPopupMenuStyle", "itempadding"));
	eval(nexacro._createValueAttributeEvalStr("_pPopupMenuStyle", "checkboximage"));
	eval(nexacro._createValueAttributeEvalStr("_pPopupMenuStyle", "expandimage"));
	eval(nexacro._createAccessibilityAttributeEvalStr("_pPopupMenuStyle", "itemaccessibility"));
	eval(nexacro._createValueAttributeEvalStr("_pPopupMenuStyle", "popuptype"));

	_pPopupMenuStyle.__custom_emptyObject = function () {
		this.itemalign = null;
		this.itemheight = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.checkboximage = null;
		this.expandimage = null;
		this.itemaccessibility = null;
		this.popuptype = null;
	};

	_pPopupMenuStyle.__get_custom_style_value = function () {
		var val = "";
		var itemalign = this.itemalign;
		if (itemalign && itemalign._value.length) {
			val += "itemalign:" + itemalign._value + "; ";
		}

		var itemheight = this.itemheight;
		if (itemheight && itemheight._value.length) {
			val += "itemheight:" + itemheight._value + "; ";
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

		var checkboximage = this.checkboximage;
		if (checkboximage && checkboximage._value.length) {
			val += "checkboximage:" + checkboximage._value + "; ";
		}

		var expandimage = this.expandimage;
		if (expandimage && this.expandimage._value.length) {
			val += "expandimage:" + expandimage._value + "; ";
		}

		var itemaccessibility = this.itemaccessibility;
		if (itemaccessibility && itemaccessibility._value.length) {
			val += "itemaccessibility:" + itemaccessibility._value + "; ";
		}

		var popuptype = this.popuptype;
		if (popuptype && popuptype._value.length) {
			val += "itemaccessibility:" + popuptype._value + "; ";
		}

		return val;
	};

	nexacro.PopupMenu_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.itemalign = null;
		this.itemheight = null;
		this.itembackground = null;
		this.itemborder = null;
		this.itembordertype = null;
		this.itemgradation = null;
		this.itempadding = null;
		this.checkboximage = null;
		this.expandimage = null;
		this.itemaccessibility = null;
		this.popuptype = null;
	};

	var _pPopupMenuCurrentStyle = nexacro.PopupMenu_CurrentStyle.prototype = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.PopupMenu_CurrentStyle);

	_pPopupMenuCurrentStyle.__custom_emptyObject = _pPopupMenuStyle.__custom_emptyObject;
	_pPopupMenuCurrentStyle.__get_custom_style_value = _pPopupMenuStyle.__get_custom_style_value;

	delete _pPopupMenuStyle;
	delete _pPopupMenuCurrentStyle;
}

if (!nexacro.PopupMenu) {
	nexacro.MenuCloseUpEventInfo = function (obj, id, isselect) {
		this.id = this.eventid = id || "oncloseup";
		this.fromobject = obj;
		this.fromreferenceobject = obj;
		this.isselect = isselect;
	};
	var _pMenuCloseUpEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuCloseUpEventInfo);
	nexacro.MenuCloseUpEventInfo.prototype = _pMenuCloseUpEventInfo;
	_pMenuCloseUpEventInfo._type_name = "MenuCloseUpEventInfo";

	delete _pMenuCloseUpEventInfo;

	nexacro.MenuClickEventInfo = function (obj, id, itemid, itemuserdata, index, level) {
		this.eventid = id || "onmenuclick";
		this.id = itemid;
		this.fromobject = this.fromreferenceobject = obj;
		this.index = index;
		this.level = level;
		this.userdata = itemuserdata;
	};

	var _pMenuClickEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.MenuClickEventInfo);
	nexacro.MenuClickEventInfo.prototype = _pMenuClickEventInfo;
	_pMenuClickEventInfo._type_name = "MenuClickEventInfo";

	delete _pMenuClickEventInfo;

	nexacro.PopupMenu = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.PopupComponent.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.datarow = 0;
		this.level = 0;
		this.selfpopup = true;
		this.beforeindex = -1;
		this.innerdataset = "";
		this.autohotkey = false;
		this.captioncolumn = "";
		this.checkboxcolumn = "";
		this.enablecolumn = "";
		this.hotkeycolumn = "";
		this.iconcolumn = "";
		this.idcolumn = "";
		this.levelcolumn = "";
		this.userdatacolumn = "";


		this._popupmenu = null;
		this._hot_key_list = [];
		this._items = [];
		this._attached_comp = this;
		this._is_subcontrol = false;
		this._previousitem = 0;
		this._popupitemindex = -1;
		this._popupitempreviousindex = -1;
		this._closeflag = true;
		this._want_tab = true;
		this._selected_itemindex = -1;
		this._last_mouseleave_iteminfo = {
			bindindex : -1, 
			index : -1, 
			level : -1
		};
		this._iconImage_width = 0;
		this._iconImage_height = 0;
		this._innerdataset = "";
		this._lineItems = [];

		this.spinupbutton = null;
		this.spindownbutton = null;

		this._spin_height = 20;
		this._scrollIndex = 0;
		this._buttonRect = [];
		this._buttonRect_elem = [];


		this._accessibility_role = "menu";
		this._want_arrow = true;

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
			"onpopup" : 1, 
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
			"onslideend" : 1, 
			"oncloseup" : 1
		};
	};

	var _pPopupMenu = nexacro._createPrototype(nexacro.PopupComponent, nexacro.PopupMenu);
	nexacro.PopupMenu.prototype = _pPopupMenu;

	_pPopupMenu._type_name = "PopupMenu";


	_pPopupMenu.on_create_custom_style = function () {
		return new nexacro.PopupMenu_Style(this);
	};

	_pPopupMenu.on_create_custom_currentStyle = function () {
		return new nexacro.PopupMenu_CurrentStyle();
	};

	_pPopupMenu.on_apply_custom_pseudo = function (pseudo) {
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

		var itemalign = this.on_find_CurrentStyle_itemalign(pseudo);
		if (itemalign && curstyle.itemalign != itemalign) {
			curstyle.itemalign = itemalign;
			this.on_apply_style_itemalign(itemalign);
		}

		var itemheight = this.on_find_CurrentStyle_itemheight(pseudo);
		if (itemheight && curstyle.itemheight != itemheight) {
			curstyle.itemheight = itemheight;
			this.on_apply_style_itemheight(itemheight);
		}

		var itemborder = this.on_find_CurrentStyle_itemborder(pseudo);
		if (itemborder && this._compareitemBorder(curstyle.itemborder, itemborder)) {
			curstyle.itemborder = itemborder;
			this.on_apply_style_itemborder(itemborder);
		}

		var itembordertype = this.on_find_CurrentStyle_itembordertype(pseudo);
		if (itembordertype && curstyle.itembordertype != itembordertype) {
			curstyle.itembordertype = itembordertype;
			this.on_apply_style_itembordertype(itembordertype);
		}

		var itemgradation = this.on_find_CurrentStyle_itemgradation(pseudo);
		if (itemgradation && curstyle.itemgradation != itemgradation) {
			curstyle.itemgradation = itemgradation;
			this.on_apply_style_itemgradation(itemgradation);
		}

		var itempadding = this.on_find_CurrentStyle_itempadding(pseudo);
		if (itempadding && this._compareitemPadding(curstyle.itempadding, itempadding)) {
			curstyle.itempadding = itempadding;
			this.on_apply_style_itempadding(itempadding);
		}

		var checkboximage = this.on_find_CurrentStyle_checkboximage(pseudo);
		if (checkboximage && curstyle.checkboximage != checkboximage) {
			curstyle.checkboximage = checkboximage;
			this.on_apply_style_checkboximage(checkboximage);
		}

		var expandimage = this.on_find_CurrentStyle_expandimage(pseudo);
		if (expandimage && curstyle.expandimage != expandimage) {
			curstyle.expandimage = expandimage;
			this.on_apply_style_expandimage(expandimage);
		}

		var itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(pseudo);
		if (itemaccessibility && curstyle.itemaccessibility != itemaccessibility) {
			curstyle.itemaccessibility = itemaccessibility;
			this.on_apply_style_itemaccessibility(itemaccessibility);
		}

		var popuptype = this.on_find_CurrentStyle_popuptype(pseudo);
		if (popuptype && curstyle.popuptype != popuptype) {
			curstyle.popuptype = popuptype;
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

	_pPopupMenu._compareitemPadding = function (curpadding, padding) {
		if (!curpadding) {
			return true;
		}
		if (curpadding.top != padding.top || curpadding.left != padding.left || curpadding.right != padding.right || curpadding.bottom != padding.bottom) {
			return true;
		}
		return false;
	};

	_pPopupMenu._compareitemBorder = function (curborder, border) {
		if (!curborder) {
			return true;
		}
		if (curborder._value != border._value) {
			return true;
		}
		return false;
	};

	_pPopupMenu.on_find_CurrentStyle_popuptype = function (pseudo) {
		if (this.parent instanceof nexacro.Menu || this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_popuptype(pseudo);
		}

		return this._find_pseudo_obj("popuptype", pseudo);
	};

	_pPopupMenu.on_find_CurrentStyle_itemalign = function (pseudo) {
		if (this.parent instanceof nexacro.Menu || this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itemalign(pseudo);
		}

		return this._find_pseudo_obj("itemalign", pseudo, "align");
	};

	_pPopupMenu.on_find_CurrentStyle_itemheight = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupitemheight(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itemheight(pseudo);
		}
		return this._find_pseudo_obj("itemheight", pseudo);
	};

	_pPopupMenu.on_find_CurrentStyle_itembackground = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupitembackground(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itembackground(pseudo);
		}
		return itembackground = this._find_pseudo_obj("itembackground", pseudo, "background");
	};

	_pPopupMenu.on_find_CurrentStyle_itemborder = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupitemborder(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itemborder(pseudo);
		}
		return this._find_pseudo_obj("itemborder", pseudo, "border");
	};

	_pPopupMenu.on_find_CurrentStyle_itembordertype = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupitembordertype(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itembordertype(pseudo);
		}
		return this._find_pseudo_obj("itembordertype", pseudo, "bordertype");
	};

	_pPopupMenu.on_find_CurrentStyle_itemgradation = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupitemgradation(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itemgradation(pseudo);
		}
		return this._find_pseudo_obj("itemgradation", pseudo, "gradation");
	};

	_pPopupMenu.on_find_CurrentStyle_itempadding = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupitempadding(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itempadding(pseudo);
		}
		return this._find_pseudo_obj("itempadding", pseudo, "padding");
	};

	_pPopupMenu.on_find_CurrentStyle_checkboximage = function (pseudo) {
		if (this.parent instanceof nexacro.Menu || this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_checkboximage(pseudo);
		}
		return this._find_pseudo_obj("checkboximage", pseudo);
	};

	_pPopupMenu.on_find_CurrentStyle_expandimage = function (pseudo) {
		if (this.parent instanceof nexacro.Menu || this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_expandimage(pseudo);
		}
		return this._find_pseudo_obj("expandimage", pseudo);
	};

	_pPopupMenu.on_find_CurrentStyle_popupitembackground = function (pseudo) {
		if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_popupitembackground(pseudo);
		}
		return this.parent._find_pseudo_obj("popupitembackground", pseudo, "background");
	};

	_pPopupMenu.on_find_CurrentStyle_popupitempadding = function (pseudo) {
		if (this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_popupitempadding(pseudo);
		}
		return this.parent._find_pseudo_obj("popupitempadding", pseudo, "padding");
	};

	_pPopupMenu.on_find_CurrentStyle_background = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupbackground(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_pseudo_obj("background", pseudo, "background");
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("popupbackground", pseudo, "background");
			}
		}
		return this._find_pseudo_obj("background", pseudo, "background");
	};

	_pPopupMenu.on_find_CurrentStyle_font = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupfont(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_inherit_pseudo_obj("font", pseudo, "font");
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("popupfont", pseudo, "font");
			}
		}
		return this._find_inherit_pseudo_obj("font", pseudo, "font");
	};

	_pPopupMenu.on_find_CurrentStyle_letterspace = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_letterspace(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_inherit_pseudo_obj("letterspace", pseudo, "letterspace");
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("letterspace", pseudo, "letterspace");
			}
		}
		return this._find_inherit_pseudo_obj("letterspace", pseudo, "letterspace");
	};

	_pPopupMenu.on_find_CurrentStyle_color = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupcolor(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_inherit_pseudo_obj("color", pseudo, "color") || this._defaultcolor;
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("popupcolor", pseudo, "color") || this._defaultcolor;
			}
		}
		return this._find_inherit_pseudo_obj("color", pseudo, "color") || this._defaultcolor;
	};

	_pPopupMenu.on_find_CurrentStyle_border = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupborder(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_pseudo_obj("border", pseudo, "border");
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("popupborder", pseudo, "border");
			}
		}
		return this._find_pseudo_obj("border", pseudo, "border");
	};

	_pPopupMenu.on_find_CurrentStyle_bordertype = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popupbordertype(pseudo);
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_pseudo_obj("bordertype", pseudo, "bordertype");
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("popupbordertype", pseudo, "bordertype");
			}
		}
		return this._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pPopupMenu.on_find_CurrentStyle_padding = function (pseudo) {
		if (this.parent instanceof nexacro.Menu) {
			return this.parent.on_find_CurrentStyle_popuppadding();
		}
		else if (this.parent instanceof nexacro.PopupMenu) {
			if (this.selfpopup) {
				var p = this;
				while (p._is_subcontrol != false) {
					p = p.parent;
				}
				return p._find_pseudo_obj("padding", pseudo, "padding");
			}
			else {
				return this._getMenuObj()._find_pseudo_obj("popuppadding", pseudo, "padding");
			}
		}
		return this._find_pseudo_obj("padding", pseudo, "padding");
	};

	_pPopupMenu.on_find_CurrentStyle_itemaccessibility = function (pseudo) {
		if (this.parent instanceof nexacro.Menu || this.parent instanceof nexacro.PopupMenu) {
			return this.parent.on_find_CurrentStyle_itemaccessibility(pseudo) || nexacro.Component._default_accessibility;
		}
		return this._find_pseudo_obj("itemaccessibility", pseudo, "accessibility") || nexacro.Component._default_accessibility;
	};

	_pPopupMenu.on_find_CurrentStyle_cusor = function (pseudo) {
		return nexacro.Component.prototype.on_find_CurrentStyle_cusor.call(this._getRootComponent(this));
	};

	_pPopupMenu.on_find_CurrentStyle_opacity = function (pseudo) {
		return nexacro.Component.prototype.on_find_CurrentStyle_opacity.call(this._getRootComponent(this));
	};

	_pPopupMenu.on_find_CurrentStyle_rtlimagemirroring = function (pseudo) {
		var rootComp = this._getRootComponent(this);
		return nexacro.Component.prototype.on_find_CurrentStyle_rtlimagemirroring.apply(rootComp, arguments);
	};

	_pPopupMenu.on_apply_custom_class = function () {
		if (this._popupmenu) {
			this._popupmenu.on_apply_prop_class();
		}
	};

	_pPopupMenu.on_apply_style_color = function (color) {
		var items = this._items;
		if (items) {
			var len = items.length;

			for (var i = 0; i < len; i++) {
				color = this.on_find_CurrentStyle_color(items[i]._pseudo);
				items[i].on_apply_style_color(color);
			}
		}
	};

	_pPopupMenu.on_apply_style_font = function (font) {
		var items = this._items;
		if (items) {
			var len = items.length;

			for (var i = 0; i < len; i++) {
				font = this.on_find_CurrentStyle_font(items[i]._pseudo);
				items[i].on_apply_style_font(font);
			}
		}
	};

	_pPopupMenu.on_apply_style_letterspace = function (letterspace) {
		var items = this._items;
		if (items) {
			var len = items.length;

			for (var i = 0; i < len; i++) {
				letterspace = this.on_find_CurrentStyle_letterspace(items[i]._pseudo);
				items[i].on_apply_style_letterspace(letterspace);
			}
		}
	};

	_pPopupMenu.on_apply_style_cursor = function (cursor) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setElementCursor(cursor);
		}
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_cursor(cursor);
			}
		}
	};

	_pPopupMenu.on_apply_style_opacity = function (opacity) {
		nexacro.Component.prototype.on_apply_style_opacity.call(this);

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_opacity(opacity);
		}
	};

	_pPopupMenu.on_apply_style_padding = function (padding) {
		nexacro.Component.prototype.on_apply_style_padding.call(this);

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_padding(padding);
		}
	};

	_pPopupMenu.on_apply_style_itemalign = function (itemalign) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_align(itemalign);
			}
		}
	};

	_pPopupMenu.on_apply_style_itembackground = function (itembackground) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_background(itembackground);
			}
		}
	};

	_pPopupMenu.on_apply_style_itemborder = function (itemborder) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_border(itemborder);
			}
		}
	};

	_pPopupMenu.on_apply_style_itembordertype = function (itembordertype) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_bordertype(itembordertype);
			}
		}
	};

	_pPopupMenu.on_apply_style_itemgradation = function (itemgradation) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_gradation(itemgradation);
			}
		}
	};

	_pPopupMenu.on_apply_style_itempadding = function (itempadding) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_padding(itempadding);
			}

			this._reCalcSize();
			this._calcSpinButton();
			this._updateMenuItemPosition();
		}
	};

	_pPopupMenu.on_apply_style_itemheight = nexacro._emptyFn;

	_pPopupMenu.on_apply_style_checkboximage = function (checkboximage) {
		if (!checkboximage) {
			checkboximage = this.currentstyle.checkboximage;
		}

		this._load_image(checkboximage, "chk");

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i]._setCheckimage(checkboximage._value);
			}
		}

		if (this._popupmenu) {
			this._popupmenu.style.set_checkboximage(checkboximage);
		}

		this._reCalcSize();
		this._calcSpinButton();
		this._updateMenuItemPosition();
	};

	_pPopupMenu.on_apply_style_expandimage = function (expandimage) {
		if (!expandimage) {
			expandimage = this.currentstyle.expandimage;
		}

		var img_url = this._load_image(expandimage, "exp");

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i]._setExpandimage(img_url);
			}
		}

		if (this._popupmenu) {
			this._popupmenu.style.set_expandimage(expandimage);
		}
	};

	_pPopupMenu.on_apply_style_itemaccessibility = function (itemaccessibility) {
		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_apply_style_accessibility(itemaccessibility);
			}
		}
	};

	_pPopupMenu.on_apply_style_rtlimagemirroring = function (rtlimagemirroring) {
		var len = this._items.length;
		for (var i = 0; i < len; i++) {
			var item = this._getItem(i);
			item.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pPopupMenu.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);

		var _rtldirection = this._rtldirection;

		var len = this._items.length;
		var item = null;
		for (var i = 0; i < len; i++) {
			item = this._getItem(i);
			item._setRtlDirection(_rtldirection);
		}

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu._setRtlDirection(_rtldirection);
		}
	};

	_pPopupMenu.on_update_style_color = function () {
		if (!this._is_subcontrol) {
			this.currentstyle.color = this.on_find_CurrentStyle_color(this._pseudo);
		}

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_update_style_color();
			}
		}

		if (this._popupmenu) {
			this._popupmenu.on_update_style_color();
		}
	};

	_pPopupMenu.on_update_style_font = function () {
		if (!this._is_subcontrol) {
			this.currentstyle.font = this.on_find_CurrentStyle_font(this._pseudo);
		}

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_update_style_font();
			}
		}
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_font();
		}
	};

	_pPopupMenu.on_update_style_align = function () {
		if (!this._is_subcontrol) {
			this.currentstyle.align = this.on_find_CurrentStyle_align(this._pseudo);
		}

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].on_update_style_align();
			}
		}

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_align();
		}
	};

	_pPopupMenu.on_update_style_border = function () {
		this.on_apply_style_border(this.currentstyle.border = this.on_find_CurrentStyle_border(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_border();
		}
	};
	_pPopupMenu.on_update_style_bordertype = function () {
		this.on_apply_style_bordertype(this.currentstyle.bordertype = this.on_find_CurrentStyle_bordertype(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_bordertype();
		}
	};
	_pPopupMenu.on_update_style_background = function () {
		this.on_apply_style_background(this.currentstyle.background = this.on_find_CurrentStyle_background(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_background();
		}
	};
	_pPopupMenu.on_update_style_gradation = function () {
		this.on_apply_style_gradation(this.currentstyle.gradation = this.on_find_CurrentStyle_gradation(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_gradation();
		}
	};

	_pPopupMenu.on_update_style_opacity = function () {
		this.on_apply_style_opacity(this.currentstyle.opacity = this.on_find_CurrentStyle_opacity(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_opacity();
		}
	};

	_pPopupMenu.on_update_style_shadow = function () {
		this.on_apply_style_shadow(this.currentstyle.shadow = this.on_find_CurrentStyle_shadow(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_shadow();
		}
	};
	_pPopupMenu.on_update_style_cursor = function () {
		this.on_apply_style_cursor(this.currentstyle.cursor = this.on_find_CurrentStyle_cursor(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_cursor();
		}
	};

	_pPopupMenu.on_update_style_padding = function () {
		nexacro.Component.prototype.on_update_style_padding.call(this);

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_padding();
		}
	};

	_pPopupMenu.on_update_style_popuptype = function () {
		this.currentstyle.popuptype = this.on_find_CurrentStyle_popuptype(this._pseudo);
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_popuptype();
		}
	};

	_pPopupMenu.on_update_style_itemheight = function () {
		this.on_apply_style_itemheight(this.currentstyle.itemheight = this.on_find_CurrentStyle_itemheight(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itemheight();
		}
	};

	_pPopupMenu.on_update_style_itembackground = function () {
		this.on_apply_style_itembackground(this.currentstyle.itembackground = this.on_find_CurrentStyle_itembackground(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itembackground();
		}
	};

	_pPopupMenu.on_update_style_itemborder = function () {
		this.on_apply_style_itemborder(this.currentstyle.itemborder = this.on_find_CurrentStyle_itemborder(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itemborder();
		}
	};

	_pPopupMenu.on_update_style_itembordertype = function () {
		this.on_apply_style_itembordertype(this.currentstyle.itembordertype = this.on_find_CurrentStyle_itembordertype(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itembordertype();
		}
	};

	_pPopupMenu.on_update_style_itemgradation = function () {
		this.on_apply_style_itemgradation(this.currentstyle.itemgradation = this.on_find_CurrentStyle_itemgradation(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itemgradation();
		}
	};

	_pPopupMenu.on_update_style_itempadding = function () {
		this.on_apply_style_itempadding(this.currentstyle.itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itempadding();
		}
	};

	_pPopupMenu.on_update_style_checkboximage = function () {
		this.on_apply_style_checkboximage(this.currentstyle.checkboximage = this.on_find_CurrentStyle_checkboximage(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_checkboximage();
		}
	};

	_pPopupMenu.on_update_style_expandimage = function () {
		this.on_apply_style_expandimage(this.currentstyle.expandimage = this.on_find_CurrentStyle_expandimage(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_expandimage();
		}
	};

	_pPopupMenu.on_update_style_itemaccessibility = function () {
		this.on_apply_style_itemaccessibility(this.currentstyle.itemaccessibility = this.on_find_CurrentStyle_itemaccessibility(this._pseudo));

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu.on_update_style_itemaccessibility();
		}
	};


	_pPopupMenu.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._createPopupMenu();
		}

		if (!this._is_subcontrol) {
			var curstyle = this.currentstyle;
			if (curstyle.checkboximage) {
				this._load_image(curstyle.checkboximage, "chk");
			}

			if (curstyle.expandimage) {
				this._load_image(curstyle.expandimage, "exp");
			}
		}

		if (this._innerdataset && this.enablecolumn) {
			this.on_apply_enablecolumn();
		}
	};

	_pPopupMenu.on_created_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (!this._innerdataset && this.innerdataset) {
				this._innerdataset = this._findDataset(this.innerdataset);
				this.on_apply_innerdataset();
			}

			var items = this._lineItems;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i].on_created();
				}
			}

			if (nexacro._enableaccessibility) {
				this.on_apply_style_itemaccessibility(this.on_find_CurrentStyle_itemaccessibility(this._pseudo));
				this._setAccessibilityInfoLevel(this.level);
			}
		}
	};

	_pPopupMenu.on_destroy_contents = function () {
		var items = this._items;
		var len = items.length;
		for (var i = 0; i < len; i++) {
			items[i].destroyComponent();
			items[i] = null;
		}
		this._items = [];

		if (this._popupmenu) {
			this._popupmenu.destroy();
			this._popupmenu = null;
		}
	};


	_pPopupMenu.set_autohotkey = function (v) {
		if (v != this.autohotkey) {
			this.autohotkey = v;
		}
	};

	_pPopupMenu.set_captioncolumn = function (v) {
		if (v != this.captioncolumn) {
			this.captioncolumn = v;
			var popupmenu = this._popupmenu;
			if (popupmenu) {
				popupmenu.set_captioncolumn(v);
			}

			this.on_apply_captioncolumn();
		}
	};

	_pPopupMenu.on_apply_captioncolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();

			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i]._setText(ds.getColumn(items[i].datarow, this.captioncolumn) || "");
				}
			}
		}
	};

	_pPopupMenu.set_checkboxcolumn = function (v) {
		if (v != this.checkboxcolumn) {
			this.checkboxcolumn = v;
			var popupmenu = this._popupmenu;
			if (popupmenu) {
				popupmenu.set_checkboxcolumn(v);
			}

			this.on_apply_checkboxcolumn();
		}
	};

	_pPopupMenu.on_apply_checkboxcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();

			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i]._setValue(ds.getColumn(items[i].datarow, this.checkboxcolumn) || false);
				}
			}
		}
	};

	_pPopupMenu.set_enablecolumn = function (v) {
		if (v != this.enablecolumn) {
			this.enablecolumn = v;
			var popupmenu = this._popupmenu;
			if (popupmenu) {
				popupmenu.set_enablecolumn(v);
			}

			this.on_apply_enablecolumn();
		}
	};

	_pPopupMenu.on_apply_enablecolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();

			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					var enabletext = ds.getColumn(items[i].datarow, this.enablecolumn);

					enabletext = enabletext == false || enabletext == "false" ? false : true;

					items[i].set_enable(enabletext);
				}
			}
		}
	};

	_pPopupMenu.set_hotkeycolumn = function (v) {
		if (v != this.hotkeycolumn) {
			this.hotkeycolumn = v;
			var popupmenu = this._popupmenu;
			if (popupmenu) {
				popupmenu.set_hotkeycolumn(v);
			}

			this.on_apply_hotkeycolumn();
		}
	};

	_pPopupMenu.on_apply_hotkeycolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();

			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i]._setHotkey(ds.getColumn(items[i].datarow, this.hotkeycolumn) || "");
				}
			}
		}
	};

	_pPopupMenu.set_iconcolumn = function (v) {
		if (v != this.iconcolumn) {
			this.iconcolumn = v;
			if (this._popupmenu) {
				this._popupmenu.set_iconcolumn(v);
			}
			this.on_apply_iconcolumn();
		}
	};

	_pPopupMenu.on_apply_iconcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();
			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i]._setIcon(ds.getColumn(items[i].datarow, this.iconcolumn) || "");
				}
			}
		}
	};

	_pPopupMenu.set_idcolumn = function (v) {
		if (v != this.idcolumn) {
			this.idcolumn = v;
			if (this._popupmenu) {
				this._popupmenu.set_idcolumn(v);
			}
			this.on_apply_idcolumn();
		}
	};

	_pPopupMenu.on_apply_idcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();
			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i].id = ds.getColumn(items[i].datarow, this.idcolumn) || "";
				}
			}
		}
	};

	_pPopupMenu.set_levelcolumn = function (v) {
		if (v != this.levelcolumn) {
			this.levelcolumn = v;
			this.on_apply_levelcolumn();
		}
	};

	_pPopupMenu.on_apply_levelcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();

			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i].level = ds.getColumn(items[i].datarow, this.levelcolumn) || -1;
				}
			}
		}
	};

	_pPopupMenu.set_userdatacolumn = function (v) {
		if (v != this.userdatacolumn) {
			this.userdatacolumn = v;
			var popupmenu = this._popupmenu;
			if (popupmenu) {
				popupmenu.set_userdatacolumn(v);
			}

			this.on_apply_userdatacolumn();
		}
	};

	_pPopupMenu.on_apply_userdatacolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._createPopupMenu();

			var items = this._items;
			if (items) {
				var len = items.length;
				for (var i = 0; i < len; i++) {
					items[i].userdata = ds.getColumn(items[i].datarow, this.userdatacolumn) || null;
				}
			}
		}
	};

	_pPopupMenu.setInnerDataset = function (obj) {
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

	_pPopupMenu._setInnerDatasetStr = function (str) {
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

	_pPopupMenu.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pPopupMenu.set_innerdataset = function (str) {
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

	_pPopupMenu.on_apply_innerdataset = function () {
		var ds = this._innerdataset;
		if (ds) {
			var callback = this._callbackFromDataset;
			ds._setEventHandler("onrowposchanged", callback, this);
			ds._setEventHandler("oncolumnchanged", callback, this);
			ds._setEventHandler("onrowsetchanged", callback, this);
		}
		this._createPopupMenu();
		this.beforeindex = -1;
		this.beforevalue = "";
		this.beforeText = "";
	};

	_pPopupMenu.on_fire_user_onlbuttondown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttondown && this.onlbuttondown._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onlbuttondown", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.onlbuttondown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(button, "onlbuttonup", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.onlbuttonup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_onmousedown = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousedown && this.onmousedown._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmousedown", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.onmousedown._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseup && this.onmouseup._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseup", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.onmouseup._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_onmouseenter = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseenter && this.onmouseenter._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseenter", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.onmouseenter._fireUserEvent(this, evt);
		}
	};

	_pPopupMenu.on_fire_user_onmouseleave = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmouseleave && this.onmouseleave._has_handlers) {
			var iteminfo = this._last_mouseleave_iteminfo;
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmouseleave", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, iteminfo.level, iteminfo.index, iteminfo.bindindex);
			return this.onmouseleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_onmousemove = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.onmousemove && this.onmousemove._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuMouseEventInfo(this, "onmousemove", refer_comp.id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, from_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.onmousemove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_ondrag = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, refer_comp, self_refer_comp) {
		if (this.ondrag && this.ondrag._has_handlers) {
			var dragData = this._getDragData();
			var self_refer = self_refer_comp._overedobj || self_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondrag", refer_comp.id, dragData, null, this, self_refer_comp, from_comp, refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, self_refer_comp.parent.level, self_refer.index, self_refer._bindindex);
			return [this.ondrag._fireUserEvent(this, evt), this, self_refer_comp, dragData, evt.userdata];
		}
		return [false];
	};

	_pPopupMenu.on_fire_user_ondrop = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondrop && this.ondrop._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondrop", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.ondrop._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_ondragenter = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragenter && this.ondragenter._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondragenter", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.ondragenter._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_ondragleave = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragleave && this.ondragleave._has_handlers) {
			var iteminfo = this._last_mouseleave_iteminfo;
			var evt = new nexacro.MenuDragEventInfo(this, "ondragleave", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, iteminfo.level, iteminfo.index, iteminfo.bindindex);

			return this.ondragleave._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_ondragmove = function (src_comp, src_refer_comp, dragdata, userdata, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (this.ondragmove && this.ondragmove._has_handlers) {
			var refer_comp = from_refer_comp._overedobj || from_refer_comp;
			var evt = new nexacro.MenuDragEventInfo(this, "ondragmove", refer_comp.id, dragdata, userdata, src_comp, src_refer_comp, from_comp, from_refer_comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_refer_comp.parent.level, refer_comp.index, refer_comp._bindindex);
			return this.ondragmove._fireUserEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var pThis = this._popupmenu_find(this);
		var item = this._item_find(pThis);
		var popupvisible = this._popupmenu_visible(this);

		var item_len = item.length - 1;
		var pitemindex, nitemindex = this._popupitemindex;
		var popuptype = this._getPopupType();

		var rootComp = this._getRootComponent(this);
		var E = nexacro.Event;

		switch (keycode) {
			case E.KEY_TAB:
				if (!popupvisible) {
					if (!shift_key && this._popupitemindex == item_len || shift_key && this._popupitemindex < 0) {
						this._want_tab = false;
						this._closePopup();
					}
					else {
						pThis._item_focus(item[pThis._popupitemindex], false);
						if (shift_key == false) {
							this._popupitemindex++;
						}
						else {
							this._popupitemindex--;
						}

						if (item[this._popupitemindex]) {
							rootComp._menuitemonmouseenter = item[this._popupitemindex];
							this._item_focus(item[this._popupitemindex], true);
						}
						else {
							this._do_defocus(this._last_focused, true);
							this._on_focus(true);
						}
					}
					this.parent._getWindow()._keydown_element._event_stop = true;
					break;
				}
				else {
					if (!shift_key && pThis._popupitemindex == item_len || shift_key && pThis._popupitemindex == 0) {
						pThis._item_focus(item[pThis._popupitemindex], false);
						pThis._closePopup();
						var pThis = this._popupmenu_find(this);
						var item = this._item_find(pThis);
						pThis._item_focus(item[pThis._previousitem], true);
						pThis._popupitemindex = pThis._previousitem;
					}
					else {
						pThis._item_focus(item[pThis._popupitemindex], false);
						if (shift_key) {
							pThis._popupitemindex--;
						}
						else {
							pThis._popupitemindex++;
						}

						rootComp._menuitemonmouseenter = item[pThis._popupitemindex];
						pThis._item_focus(item[pThis._popupitemindex], true);
					}

					this.parent._getWindow()._keydown_element._event_stop = true;
					break;
				}
			default:
				break;
		}

		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pPopupMenu.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		if (this._is_subcontrol == false) {
			var pThis = this._popupmenu_find(this);
			var item = this._item_find(pThis);

			var item_len = item.length - 1;
			var pitemindex, nitemindex = this._popupitemindex;
			var popuptype = this._getPopupType();

			var rootComp = this._getRootComponent(this);
			var E = nexacro.Event;

			if (nexacro._enableaccessibility) {
				switch (keycode) {
					case E.KEY_UP:
						this._popupitemindex = rootComp._popupitemindex;
						this._item_focus(item[this._popupitemindex], false);
						this._popupitemindex--;

						if (this._popupitemindex < 0) {
							this._popupitemindex = item_len;
						}

						rootComp._menuitemonmouseenter = item[this._popupitemindex];
						pThis._previousitem = this._popupitemindex;
						pThis._item_focus(item[this._popupitemindex], true);
						break;
					case E.KEY_DOWN:
						this._popupitemindex = rootComp._popupitemindex;
						this._item_focus(item[this._popupitemindex], false);
						this._popupitemindex++;

						if (this._popupitemindex > item_len) {
							this._popupitemindex = 0;
						}

						rootComp._menuitemonmouseenter = item[this._popupitemindex];
						pThis._previousitem = this._popupitemindex;
						pThis._item_focus(item[this._popupitemindex], true);
						break;
					case E.KEY_LEFT:
						if ((pThis.parent instanceof nexacro.PopupMenu) == false) {
							break;
						}
						else {
							pThis._closePopup();
							this._popupitemindex = pThis.parent._previousitem;
							var item = this._item_find(pThis.parent);

							rootComp._menuitemonmouseenter = item[this._popupitemindex];
							item[this._popupitemindex].parent._item_focus(item[this._popupitemindex], true);
							item[this._popupitemindex].parent._popupitemindex = this._popupitemindex;
						}
						break;
					case E.KEY_RIGHT:
						if (popuptype == "none" || this._popupitemindex == -1) {
							break;
						}

						this._popupitemindex = rootComp._popupitemindex;
						var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);

						if (popupexpand == false) {
							pThis.on_notify_menuitem_onmouseenter(item[this._popupitemindex]);

							this._item_focus(item[this._popupitemindex], false);

							pThis._previousitem = this._popupitemindex;
							this._popupitemindex = 0;

							var rThis = this._popupmenu_find(this);
							var item = this._item_find(pThis);

							rootComp._menuitemonmouseenter = item[this._popupitemindex];
							rThis._item_focus(item[this._popupitemindex], true);
							rThis._popupitemindex = this._popupitemindex;
						}
						break;
					case E.KEY_ENTER:
						if (popuptype == "none") {
							break;
						}

						var rThis = rootComp._menuitemonmouseenter.parent;

						if (pThis instanceof nexacro.Menu) {
							pThis.on_notify_menuitem_onlbuttondown(rootComp._menuitemonmouseenter);
						}
						else {
							var popupexpand = this._popupmenuitem_extend(rootComp._menuitemonmouseenter);
							if (!popupexpand) {
								this._item_focus(rootComp._menuitemonmouseenter, false);
							}
							rThis.on_notify_menuitem_onlbuttondown(rootComp._menuitemonmouseenter);
						}
						break;
					default:
						break;
				}
			}
			else {
				switch (keycode) {
					case E.KEY_UP:
						this._popupitemindex--;


						if (this._popupitemindex < 0) {
							this._popupitemindex = item_len;
						}

						rootComp._menuitemonmouseenter = item[this._popupitemindex];
						pThis._previousitem = this._popupitemindex;
						pThis._item_focus(item[this._popupitemindex], true);

						if (this._popupitemindex > -2 && nitemindex != -1) {
							if (item_len <= nitemindex) {
								nitemindex = item_len;
							}

							if (item_len > 0) {
								this._item_focus(item[nitemindex], false);
							}
						}

						this._popupitempreviousindex = this._popupitemindex;
						break;
					case E.KEY_DOWN:
						this._popupitemindex++;

						if (this._popupitemindex > item_len) {
							this._popupitemindex = 0;
						}

						rootComp._menuitemonmouseenter = item[this._popupitemindex];
						pThis._previousitem = this._popupitemindex;
						pThis._item_focus(item[this._popupitemindex], true);

						if (this._popupitemindex >= 0 && nitemindex != -1) {
							if (item_len <= nitemindex) {
								nitemindex = item_len;
							}

							if (item_len > 0) {
								this._item_focus(item[nitemindex], false);
							}
						}

						this._popupitempreviousindex = this._popupitemindex;
						break;
					case E.KEY_LEFT:
						if (pThis.parent instanceof nexacro.PopupMenu) {
							break;
						}
						else {
							pThis._closePopup();
							this._popupitemindex = pThis.parent._previousitem;
							var item = this._item_find(pThis.parent);

							rootComp._menuitemonmouseenter = item[this._popupitemindex];
							item[this._popupitemindex].parent._item_focus(item[this._popupitemindex], true);
							item[this._popupitemindex].parent._popupitemindex = this._popupitemindex;
							this._popupitempreviousindex = this._popupitemindex;
						}
						break;
					case E.KEY_RIGHT:
						if (popuptype == "none" || this._popupitemindex == -1) {
							break;
						}
						var popupexpand = this._popupmenuitem_extend(item[this._popupitemindex]);

						if (popupexpand == false) {
							pThis._closeflag = true;
							pThis._showPopup(item[this._popupitemindex]);

							this._item_focus(item[this._popupitemindex], false);

							pThis._previousitem = this._popupitemindex;
							this._popupitemindex = 0;

							var rThis = this._popupmenu_find(this);
							var item = this._item_find(rThis);

							rootComp._menuitemonmouseenter = item[this._popupitemindex];
							rThis._item_focus(item[this._popupitemindex], true);
							rThis._popupitemindex = this._popupitemindex;
							this._popupitempreviousindex = this._popupitemindex;
						}
						break;
					case E.KEY_ENTER:
						if (popuptype == "none") {
							break;
						}

						var rThis = rootComp._menuitemonmouseenter.parent;

						if (pThis instanceof nexacro.Menu) {
							pThis.on_notify_menuitem_onlbuttondown(rootComp._menuitemonmouseenter);
						}
						else {
							var popupexpand = this._popupmenuitem_extend(rootComp._menuitemonmouseenter);
							if (!popupexpand) {
							}
							rThis.on_notify_menuitem_onlbuttondown(rootComp._menuitemonmouseenter);

							var eThis = this._popupmenu_find(this);
							var item = this._item_find(eThis);
							this._popupitemindex = 0;

							rootComp._menuitemonmouseenter = item[this._popupitemindex];
							eThis._item_focus(item[this._popupitemindex], true);
							eThis._popupitemindex = this._popupitemindex;
							this._popupitempreviousindex = this._popupitemindex;
						}
						break;
					default:
						break;
				}
			}

			return nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
		}
	};

	_pPopupMenu._do_defocus = function (target, bParent) {
		var _window = this._getWindow();
		_window._removeFromCurrentFocusPath(target, true);
		if (bParent) {
			_window._removeFromCurrentFocusPath(this, false);
		}
	};


	_pPopupMenu.on_notify_menuitem_onclick = function (obj, e) {
		var popuptype = this._getPopupType();
		this._previousitem = obj.index;

		if (obj.enable == false || popuptype == "none") {
			return;
		}

		if (obj.notexpand == true) {
			if (this.parent && this.parent.enable == true) {
				if (this.parent instanceof nexacro.Menu) {
					if (this.parent.onmenuclick && this.parent.onmenuclick._has_handlers) {
						this.parent.on_notify_menuitem_onclick(obj, e);
					}
				}
				else if (!(this.parent instanceof nexacro.PopupMenu)) {
					if (this.onmenuclick && this.onmenuclick._has_handlers) {
						var rootComp = this._getRootComponent(obj);
						this.on_fire_onitemclick(rootComp, "onmenuclick", obj.id, obj.userdata, obj.index, obj.parent.level);
						this._popupitemindex = -1;
					}
				}
				else {
					this.parent.on_notify_menuitem_onclick(obj, e);
				}
				this._closeAllPopup();
			}
		}
	};

	_pPopupMenu.on_notify_menuitem_onmouseenter = function (obj, e) {
		var popupmenu = this._popupmenu;
		var pobj = this._getRootComponent(obj);
		pobj._popupitemindex = obj.index;
		pobj._menuitemonmouseenter = obj;

		if (popupmenu && popupmenu._is_popup()) {
			if (this.beforeindex != obj.index) {
				popupmenu.cancelPopup();
				this._closeflag = true;
				this._showPopup(obj);
			}
		}
		else {
			if (this._getPopupType() != "none") {
				this._closeflag = true;
				this._showPopup(obj);
			}
		}

		this.beforeindex = obj.index;

		if (!nexacro._enableaccessibility) {
			var item = this._items;
			var pitem = this.parent._items;

			this._item_focus(item[obj.index], true);

			if (this._popupitempreviousindex == -1 || this._popupitemindex == -1) {
				this._popupitempreviousindex = 0;
				this._popupitemindex = 0;
			}

			if (item.length <= this._popupitemindex) {
				this._popupitemindex = item.length - 1;
				this._popupitempreviousindex = this._popupitemindex;
			}

			if (item[this._popupitemindex]) {
				this._item_focus(item[this._popupitemindex], false);
			}
			if (item[this._previousitem]) {
				this._item_focus(item[this._previousitem], false);
			}


			if (pitem && pitem[this.parent._previousitem]) {
				this._item_focus(pitem[this.parent._previousitem], true);
			}

			if (popupmenu && popupmenu._is_popup() == true) {
				this._popupitemindex = -1;
			}
			else {
				this._popupitemindex = obj.index;
			}

			this._previousitem = obj.index;
		}
	};

	_pPopupMenu.on_notify_menuitem_onmouseleave = function (obj, e) {
		var rootCom = this._getRootComponent(this);
		rootCom._last_mouseleave_iteminfo.index = obj.index;
		rootCom._last_mouseleave_iteminfo.bindindex = obj._bindindex;
		rootCom._last_mouseleave_iteminfo.level = obj.parent.level;
	};

	_pPopupMenu.on_notify_menuitem_onlbuttondown = function (obj, e) {
		this._item_focus(this._items[this._previousitem], false);
		this._item_focus(this._items[this._selected_itemindex], false);

		this._menuitemonmouseenter = obj;
		this._previousitem = obj.index;

		var popupmenu = this._popupmenu;
		if (popupmenu) {
			if (popupmenu._is_popup()) {
				if (this.beforeindex != obj.index) {
					this.beforeindex = obj.index;
				}
				popupmenu.cancelPopup();
				this._menuitemindex = obj.index;
				this._popupitemindex = -1;
			}
		}

		if (!obj.notexpand) {
			this._closeflag = true;
			this._showPopup(obj);

			if (this._getRootComponent(obj) instanceof nexacro.Menu) {
				this._getRootComponent(obj)._popupitemindex = obj.index;
			}
		}
		this._item_focus(obj, true);
	};

	_pPopupMenu.on_fire_onitemclick = function (obj, id, itemid, itemuserdata, index, level) {
		this._selected_itemindex = index;
		var evt = new nexacro.MenuClickEventInfo(obj, id, itemid, itemuserdata, index, level);
		this.onmenuclick._fireEvent(this, evt);
	};


	_pPopupMenu.cancelPopup = function () {
		this._closePopup();

		if (nexacro._enableaccessibility == false) {
			var rootComp = this._getRootComponent(this);
			if (rootComp instanceof nexacro.Menu) {
				var items = rootComp._items;
				for (var i = 0; i < items.length; i++) {
					this._item_focus(items[i], false);
				}
			}
		}
	};

	_pPopupMenu.isPopup = function () {
		return this._is_popup();
	};

	_pPopupMenu.trackPopup = function (x, y, align, bcapture) {
		this._selected_itemindex = -1;
		this._track_capture = bcapture === false ? false : true;

		this._reCalcSize();
		this.on_created();

		this._calcSpinButton();
		this._updateMenuItemPosition();

		this._adjustPopupPosition(+x, +y, align);
		this._closeflag = true;
		this.setFocus();
	};


	_pPopupMenu.trackPopupByComponent = function (obj, x, y, align) {
		this._selected_itemindex = -1;

		this._reCalcSize();
		this.on_created();

		this._track_on = true;
		var alignPosition = this._getAlignPosition(x, y, align);
		this._updateMenuItemPosition();
		this._popupBy(obj, alignPosition[0], alignPosition[1], this._width, this._height);

		this._closeflag = true;
		this.setFocus();
	};

	_pPopupMenu.on_change_containerRect = function () {
	};


	_pPopupMenu._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var want_arrow = this._want_arrow;
		var want_tab = this._want_tab;
		this._want_tab = true;
		return {
			want_tab : want_tab, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : want_arrow
		};
	};

	_pPopupMenu._get_apply_padding_size = function () {
		var padding = this.on_find_CurrentStyle_padding(this._pseudo);
		var padding_l = 0, padding_r = 0, padding_b = 0, padding_t = 0;
		if (padding) {
			padding_l = padding.left;
			padding_r = padding.right;
			padding_b = padding.bottom;
			padding_t = padding.top;
		}
		var _width = this._width + (padding_l + padding_r);
		var _height = this._height + (padding_t + padding_b);

		return {
			width : _width, 
			height : _height
		};
	};

	_pPopupMenu._loaded_expImage = function (imgurl, w, h) {
		this._expImage_width = w;
		this._expImage_height = h;

		if (this._is_popup()) {
			var _control_element = this.getElement();

			if (_control_element) {
				this._reCalcSize();
				this._updateMenuItemPosition();
				var size = this._get_apply_padding_size();
				_control_element.setElementSize(size.width, size.height);
			}
		}
	};

	_pPopupMenu._loaded_chkImage = function (imgurl, w, h) {
		this._chkImage_width = w;
		this._chkImage_height = h;

		if (this._is_popup()) {
			var _control_element = this.getElement();

			if (_control_element) {
				this._reCalcSize();
				this._updateMenuItemPosition();
				var size = this._get_apply_padding_size();
				_control_element.setElementSize(size.width, size.height);
			}
		}
	};

	_pPopupMenu._loaded_iconImage = function (imgurl, w, h) {
		this._iconImage_width = w;
		this._iconImage_height = h;

		if (this._is_popup()) {
			var _control_element = this.getElement();

			if (_control_element) {
				this._reCalcSize();
				this._updateMenuItemPosition();
				var size = this._get_apply_padding_size();
				_control_element.setElementSize(size.width, size.height);
			}
		}
	};

	_pPopupMenu._load_image = function (image, strflag) {
		var control_elem = this._control_element;
		if (control_elem) {
			var val = (image && image != "") ? image._value : "";
			if (val) {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());

				var size;
				if (strflag == "exp") {
					size = nexacro._getImageSize(val, this._loaded_expImage, this, undefined, (image ? image._value : ""));
					if (size) {
						this._expImage_width = size.width;
						this._expImage_height = size.height;
					}
				}
				else if (strflag == "chk") {
					size = nexacro._getImageSize(val, this._loaded_chkImage, this, undefined, (image ? image._value : ""));
					if (size) {
						this._chkImage_width = size.width;
						this._chkImage_height = size.height;
					}
				}
				else if (strflag == "icon") {
					size = nexacro._getImageSize(val, this._loaded_iconImage, this, undefined, (image ? image._value : ""));
					if (size) {
						this._iconImage_width = size.width;
						this._iconImage_height = size.height;
					}
				}
				return val;
			}
		}
	};

	_pPopupMenu._getMaxTextSize = function (column) {
		var size = [];
		size[0] = 0;
		size[1] = 0;
		var ds = this._innerdataset;

		if (ds) {
			var items = this._items;
			if (items) {
				var len = items.length;
				var font = this.on_find_CurrentStyle_font(this._pseudo);
				var letterspace = this.on_find_CurrentStyle_letterspace(this._pseudo);
				for (var i = 0; i < len; i++) {
					var text = ds.getColumn(items[i].datarow, column);
					if (text === undefined) {
						break;
					}

					var size2 = nexacro._getTextSize2(letterspace, text, font);

					size[0] = size2[0] > size[0] ? size2[0] : size[0];
					size[1] = size2[1] > size[1] ? size2[1] : size[1];
				}
			}
		}
		return size;
	};

	_pPopupMenu._createPopupMenu = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._deletePopupMenu();
			var ds = this._innerdataset;
			if (ds && this.levelcolumn && this.captioncolumn && this.idcolumn) {
				var top = 0;
				var height = 0;

				if (this.currentstyle.itemheight && this.currentstyle.itemheight._value != "") {
					height = parseInt(this.currentstyle.itemheight._value, 10) | 0;
				}

				var index = 0, len = ds.getRowCount();
				var datarow = this.datarow;

				for (var rowlength = datarow; rowlength < len; rowlength++) {
					var level = thislevel = ds.getColumn(rowlength, this.levelcolumn);

					if (level == this.level) {
						var text = ds.getColumn(rowlength, this.captioncolumn);
						if (text == "-") {
							var lineItem = new nexacro.StaticCtrl("-", "absolute", 0, top, 0, 1, null, null, this);
							lineItem.style.set_background("black");
							lineItem.createComponent();
							lineItem._bLine = true;
							top += 1;
							this._lineItems.push(lineItem);
							continue;
						}

						var popupmenuitem = new nexacro.PopupMenuItem("popup", "absolute", 0, top, 0, height, null, null, this);
						popupmenuitem._is_subcontrol = true;

						top += height;

						popupmenuitem._bindindex = rowlength;
						popupmenuitem.index = index++;
						popupmenuitem.datarow = rowlength;

						var enable = ds.getColumn(rowlength, this.enablecolumn);
						popupmenuitem.set_enable(enable == false || enable == "false" ? false : true);

						if (text) {
							popupmenuitem._setText(text);
						}

						var checkimg = ds.getColumn(rowlength, this.checkboxcolumn);
						if (checkimg) {
							popupmenuitem._setValue(nexacro._toBoolean(checkimg));
						}

						var id = ds.getColumn(rowlength, this.idcolumn);
						if (id) {
							popupmenuitem.id = id;
						}

						var hotkey = ds.getColumn(rowlength, this.hotkeycolumn);
						if (hotkey) {
							popupmenuitem._setHotkey(hotkey);
						}

						var userdata = ds.getColumn(rowlength, this.userdatacolumn);
						popupmenuitem.userdata = userdata;
						if (userdata) {
							popupmenuitem._setUserdata(userdata);
						}

						var icon = ds.getColumn(rowlength, this.iconcolumn);
						if (icon) {
							if (!nexacro._toBoolean(checkimg) && !popupmenuitem.imgctrl) {
								var imgctrl = popupmenuitem.imgctrl = new nexacro.ImageViewerCtrl("imgctrl", "absolute", 0, 0, 0, 0, null, null, popupmenuitem);
								popupmenuitem._setIcon(icon);
								popupmenuitem.imgctrl.createComponent();
							}
						}

						if (rowlength == ds.getRowCount() - 1) {
							popupmenuitem.notexpand = true;
						}
						else {
							level = ds.getColumn(rowlength + 1, this.levelcolumn);
							if (level <= this.level) {
								popupmenuitem.notexpand = true;
							}
							else {
								popupmenuitem._setExpandimage(this.on_find_CurrentStyle_expandimage(this._pseudo));
							}
						}

						popupmenuitem._setEventHandler("onlbuttonup", this.on_notify_menuitem_onclick, this);
						popupmenuitem._setEventHandler("onlbuttondown", this.on_notify_menuitem_onlbuttondown, this);

						if (!(nexacro.isTouchInteraction && nexacro.SupportTouch)) {
							popupmenuitem._setEventHandler("onmouseenter", this.on_notify_menuitem_onmouseenter, this);
							var rootCom = this._getRootComponent(this);
							if (rootCom.onmouseleave) {
								popupmenuitem._setEventHandler("onmouseleave", this.on_notify_menuitem_onmouseleave, this);
							}
						}

						popupmenuitem.createComponent();

						this._items.push(popupmenuitem);
						this._lineItems.push(popupmenuitem);

						popupmenuitem._real_visible = false;
						popupmenuitem._setRtlDirection(this._rtldirection);
					}
					else if (level < this.level) {
						break;
					}

					if (!this._is_subcontrol && hotkey) {
						if (rowlength == len - 1 || thislevel >= ds.getColumn(rowlength + 1, this.levelcolumn)) {
							this._set_hotkey(id, hotkey);
						}
					}
				}
			}
		}
	};

	_pPopupMenu._deletePopupMenu = function () {
		if (!this._is_subcontrol) {
			var list = this._hot_key_list;
			var len = list.length;
			var _form = this._getMainForm();
			for (var i = 0; i < len; i++) {
				nexacro._unregisterHotkeyComp(_form, this, list[i].key);
			}

			this._hot_key_list = [];
		}

		var items = this._items;
		if (items) {
			var len = items.length;
			for (var i = 0; i < len; i++) {
				items[i].destroyComponent();
				items[i] = null;
			}

			this._items = [];
		}
		var lineitems = this._lineItems;
		if (lineitems) {
			var len = lineitems.length;
			for (var i = 0; i < len; i++) {
				lineitems[i].destroyComponent();
				lineitems[i] = null;
			}

			this._lineItems = [];
		}
		if (this._popupmenu) {
			this._popupmenu.destroyComponent();
			this._popupmenu = null;
		}

		this._buttonRect = [];
		this._buttonRect_elem = [];
		this._scrollIndex = 0;
		this._is_spin_visible = false;
	};

	_pPopupMenu._createSpinbutton = function () {
		if (!this.spinupbutton) {
			this.spinupbutton = new nexacro.ImageButtonCtrl("decbutton", this.position, 0, 0, 0, 0, null, null, this);
			this.spinupbutton.createComponent();
			this.spinupbutton.set_visible(false);
			this.spinupbutton._setEventHandler("onclick", this.on_notify_spinup_onclick, this);
			this.spinupbutton.on_created();
		}
		if (!this.spindownbutton) {
			this.spindownbutton = new nexacro.ImageButtonCtrl("incbutton", this.position, 0, 0, 0, 0, null, null, this);
			this.spindownbutton.createComponent();
			this.spindownbutton.set_visible(false);
			this.spindownbutton._setEventHandler("onclick", this.on_notify_spindown_onclick, this);
			this.spindownbutton.on_created();
		}
	};

	_pPopupMenu._destroySpinButton = function () {
		if (this.spinupbutton) {
			this.spinupbutton.destroy();
			this.spinupbutton = null;
		}
		if (this.spindownbutton) {
			this.spindownbutton.destroy();
			this.spindownbutton = null;
		}
	};

	_pPopupMenu._showPopup = function (obj) {
		if (this._innerdataset && this.levelcolumn && this.captioncolumn && this.idcolumn && obj.notexpand == false && this.visible) {
			var popupmenu = this._popupmenu;
			if (!popupmenu) {
				popupmenu = this._popupmenu = new nexacro.PopupMenuCtrl("popup", "absolute", 0, 0, 0, 0, null, null, this);

				popupmenu._scrollIndex = 0;

				popupmenu.level = this.level + 1;
				popupmenu.datarow = obj.datarow + 1;
				popupmenu.selfpopup = this.selfpopup;
				popupmenu._closeflag = this._closeflag;
				popupmenu._is_subcontrol = true;

				popupmenu._track_capture = false;
				popupmenu.parentPopupMenu = this;
				popupmenu._is_loading = true;
				popupmenu.setInnerDataset(this._innerdataset);

				popupmenu.set_captioncolumn(this.captioncolumn);
				popupmenu.set_checkboxcolumn(this.checkboxcolumn);
				popupmenu.set_hotkeycolumn(this.hotkeycolumn);
				popupmenu.set_idcolumn(this.idcolumn);
				popupmenu.set_levelcolumn(this.levelcolumn);
				popupmenu.set_userdatacolumn(this.userdatacolumn);
				popupmenu.set_enablecolumn(this.enablecolumn);
				popupmenu.set_iconcolumn(this.iconcolumn);
				popupmenu._is_loading = true;

				if (this.currentstyle.checkboximage) {
					popupmenu.style.set_checkboximage(this.currentstyle.checkboximage._value);
				}
				if (this.currentstyle.expandimage) {
					popupmenu.style.set_expandimage(this.currentstyle.expandimage._value);
				}

				popupmenu.createComponent();

				popupmenu.currentstyle.popuptype = this.currentstyle.popuptype;
				popupmenu._setRtlDirection(this._rtldirection);

				popupmenu._trackPopup(obj, "horizontal");
			}
			else {
				popupmenu.datarow = obj.datarow + 1;

				if (this.selfpopup == true) {
					popupmenu.style = this.style;
					popupmenu.currentstyle = this.currentstyle;
				}

				if (this._closeflag) {
					popupmenu._trackPopup(obj, "horizontal");
				}
			}
		}
	};

	_pPopupMenu._set_hotkey = function (id, hotkey) {
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

	_pPopupMenu._on_hotkey = function (keycode, altKey, ctrlKey, shiftKey) {
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

	_pPopupMenu._adjustPopupPosition = function (x, y, align, obj) {
		var alignPosition = this._getAlignPosition(x, y, align);

		var popup_left = alignPosition[0] < 0 ? 0 : alignPosition[0];
		var popup_top = alignPosition[1] < 0 ? 0 : alignPosition[1];
		var popup_width = this._width;
		var popup_height = this._height;

		var popup_winpos_right = popup_left + popup_width;
		var popup_winpos_bottom = popup_top + popup_height;

		var _window = this._getWindow();
		var win_width = _window.clientWidth;
		var win_height = _window.clientHeight;

		var width_gap = popup_winpos_right - win_width;
		if (popup_winpos_right > win_width && popup_left > width_gap) {
			popup_left = popup_left - width_gap;
		}

		if (popup_top > popup_height && popup_winpos_bottom > win_height) {
			popup_top = win_height - popup_height;
		}

		this._track_on = true;

		var scale = this._getCumulativeZoomFactor() / 100.0;
		var elem = this.getElement();
		if (elem.setZoom) {
			elem.setZoom(scale * 100);
		}
		else if (nexacro.ScrollableContainerElement.prototype.setZoom) {
			nexacro.ScrollableContainerElement.prototype.setZoom.call(elem, scale * 100);
		}

		this._popup(popup_left, popup_top, popup_width, popup_height);
	};

	_pPopupMenu._callbackFromDataset = function (obj, e) {
		this._createPopupMenu();
	};

	_pPopupMenu._getMainFrame = function () {
		var pThis = this;
		while (pThis && !pThis._is_main) {
			pThis = pThis.parent;
		}
		return pThis;
	};

	_pPopupMenu._trackPopup = function (obj, direction, x, y) {
		this._createPopupMenu();
		this._reCalcSize();
		this.on_created();

		var _left, _top, _width, _height;
		var parent = this.parent;
		var mainframe = this._getMainFrame();

		var s = nexacro._getElementPositionInFrame(mainframe.getElement());
		var padding = this.on_find_CurrentStyle_padding(this._pseudo);
		var padding_l = 0, padding_r = 0, padding_b = 0, padding_t = 0;
		if (padding) {
			padding_l = padding.left;
			padding_r = padding.right;
			padding_b = padding.bottom;
			padding_t = padding.top;
		}

		var scale = this._getCumulativeZoomFactor() / 100.0;

		var p_width, p_height, p;

		var popup_width = this._width;
		var popup_height = this._height;

		var curr_frame = mainframe;
		if (!curr_frame) {
			var win = this._getWindow();
			var frame = win.frame;
			var childframe = frame;
			if (frame instanceof nexacro.MainFrame) {
				childframe = frame.frame;
			}
			if (!childframe) {
				childframe = frame;
			}

			curr_frame = childframe;
		}

		var bodyWidth = s.x + curr_frame._adjust_width;
		var bodyHeight = s.y + curr_frame._adjust_height;


		_width = popup_width + padding_l + padding_r;
		_height = popup_height + padding_b + padding_t;

		if (direction == "horizontal") {
			p = nexacro._getElementPositionInFrame(parent.getElement());

			p_width = parent._client_width;
			p_height = parent._client_height;
			_left = p_width;
			_top = 0;
			if (!y) {
				var tmp = p.y + obj._adjust_top + popup_height;
				if (tmp > bodyHeight) {
					_top = bodyHeight - tmp;
				}

				_top = _top * scale;
			}
			else {
				_top = y;
			}

			if (!x) {
				var px = p.x;
				var px_width = px + p_width;
				if (px_width + popup_width > bodyWidth) {
					if (px - popup_width > 0) {
						_left = -popup_width;
					}
				}

				_left = _left * scale;
			}
			else {
				_left = x;
			}
		}
		else {
			p = nexacro._getElementPositionInFrame(obj.getElement());

			p_width = 0;

			p_height = obj._adjust_height;
			_left = 0, _top = p_height;

			if (!y) {
				var tmp = p.y + p_height + popup_height;
				if (tmp > bodyHeight) {
					if (s.y < (p.y - popup_height)) {
						_top = -popup_height;
					}
					else {
						_top = 10;
					}
				}

				_top = _top * scale;
			}
			else {
				_top = y;
			}

			if (!x) {
				var px = p.x;
				if (px + popup_width > bodyWidth) {
					_left = bodyWidth - px - popup_width;
				}

				_left = _left * scale;
			}
			else {
				_left = x;
			}
		}

		var elem = this.getElement();
		if (elem.setZoom) {
			elem.setZoom(scale * 100);
		}
		else if (nexacro.ScrollableContainerElement.prototype.setZoom) {
			nexacro.ScrollableContainerElement.prototype.setZoom.call(elem, scale * 100);
		}

		if (this._getPopupType() == "center") {
			var left = (curr_frame._adjust_width / 2) - (_width / 2);
			var top = (curr_frame._adjust_height / 2) - (_height / 2);
			this._adjustPopupPosition(left, top);
		}
		else {
			this._track_on = true;
			this._popupBy(obj, _left, _top, _width, _height);
		}

		this._destroySpinButton();
		this._createSpinbutton();

		this._calcSpinButton();
		this._updateMenuItemPosition();
	};

	_pPopupMenu._getMenuObj = function () {
		var p = this.parent;
		while (!(p instanceof nexacro.Menu)) {
			p = p.parent;
		}

		return p;
	};

	_pPopupMenu.iconimgwidth = 0;

	_pPopupMenu._reCalcSize = function () {
		var ds = this._innerdataset;
		if (ds && this.captioncolumn) {
			var items = this._items;
			if (!items || items.length == 0) {
				return;
			}

			var len = items.length;
			var size = this._getMaxTextSize(this.captioncolumn);
			this.text_height = size[1];
			var textwidth = size[0];
			var hotkeywidth = 0;
			var rootComp = this._getRootComponent(this);
			var chkimgwidth = 0, expimgwidth = 0, expimgheight = 0, iconimgwidth = 0;

			var curstyle = this.currentstyle;
			var h = this.on_find_CurrentStyle_itemheight(this._pseudo);
			var item_h = h ? parseInt(h._value, 10) : 20;

			var _expandimage = rootComp.on_find_CurrentStyle_expandimage(this._pseudo);
			if (_expandimage) {
				expimgwidth = rootComp._expImage_width ? rootComp._expImage_width : item_h;
				expimgheight = rootComp._expImage_height ? rootComp._expImage_height : item_h;
				if (expimgwidth == undefined) {
					expimgwidth = 0;
				}
				if (expimgheight == undefined) {
					expimgheight = 0;
				}
			}

			if (this.hotkeycolumn) {
				size = this._getMaxTextSize(this.hotkeycolumn);
				hotkeywidth = size[0];
			}

			this._spin_height = item_h;

			for (var i = 0; i < len; i++) {
				if (items[i].value) {
					if (curstyle.checkboximage) {
						chkimgwidth = item_h;
					}
					break;
				}
			}

			for (var i = 0; i < len; i++) {
				if (items[i].icon) {
					iconimgwidth = item_h;
					break;
				}
			}

			var itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo);
			var border = this.on_find_CurrentStyle_border(this._pseudo);

			var itempadding_l = 0, itempadding_r = 0;
			if (itempadding) {
				itempadding_l = itempadding.left;
				itempadding_r = itempadding.right;
			}

			var border_left = 0, border_top = 0, border_right = 0, border_bottom = 0;
			if (border) {
				border_left = border._left_width;
				border_top = border._top_width;
				border_right = border._right_width;
				border_bottom = border._bottom_width;
			}

			var _default_gap = 20;

			var width = itempadding_l + chkimgwidth + iconimgwidth + textwidth + (hotkeywidth == 0 ? 0 : _default_gap + hotkeywidth) + item_h + expimgwidth + itempadding_r;

			var lineCnt = 0;
			for (var i = 0; i < this._lineItems.length; i++) {
				var item = this._lineItems[i];
				if (item._bLine) {
					lineCnt++;
				}
			}

			var height = (item_h * len) + lineCnt;

			var mainframe = this._getMainFrame();

			var curr_frame = mainframe;

			if (!curr_frame) {
				var win = this._getWindow();
				var frame = win.frame;
				var childframe = frame;
				if (frame instanceof nexacro.MainFrame) {
					childframe = frame.frame;
				}
				if (!childframe) {
					childframe = frame;
				}

				curr_frame = childframe;
			}

			var bodyHeight = curr_frame._adjust_height;
			var resize_height = height + border_top + border_bottom;
			var menu_bottom = 0;
			var comp = this.parent;
			var form = comp._getForm();
			var form_top = 0;
			while (form) {
				if (form._is_form) {
					form_top += form._adjust_top;
				}
				form = form.parent;

				if (form instanceof nexacro.ChildFrame || form instanceof nexacro.MainFrame) {
					break;
				}
			}

			while (comp) {
				if (comp instanceof nexacro.Menu) {
					menu_bottom = form_top + comp._adjust_top + comp._adjust_height;
					break;
				}

				comp = comp.parent;
			}

			if (resize_height > (bodyHeight - menu_bottom)) {
				if (form_top + comp._adjust_top < (bodyHeight - menu_bottom)) {
					resize_height = bodyHeight - menu_bottom;
				}
				else {
					if (form_top + comp._adjust_top < resize_height) {
						resize_height = form_top + comp._adjust_top;
					}
				}
			}

			this._width = width + border_left + border_right;
			if (!this.visible) {
				this.resize(this._width, resize_height);
			}

			var _item_top = 0;

			var _buttonRect = this._buttonRect;
			var _buttonRect_elem = this._buttonRect_elem;
			var _buttonRect_line = this._buttonRect_line;

			if (_buttonRect[0]) {
				for (var i = 0; i < this._scrollIndex; i++) {
					_item_top -= _buttonRect[i].height;
				}

				if (this._is_spin_visible) {
					if (this._scrollIndex == 0) {
						_item_top = this._spin_height;
					}
					else {
						_item_top = -this._spin_height * this._scrollIndex;
					}
				}
			}

			var spin_flag = false;
			for (var i = 0; i < this._lineItems.length; i++) {
				var item = this._lineItems[i];
				if (item._bLine) {
					var rect = {
						left : 0, 
						top : 0, 
						right : 0, 
						bottom : 0, 
						width : 0, 
						height : 0
					};
					rect.left = 0;
					rect.top = _item_top;
					rect.right = this._width;
					rect.bottom = _item_top + 1;
					rect.width = this._width;
					rect.height = 1;
					_buttonRect[i] = rect;

					var rect1 = {
						textWidth : 0, 
						hotkeyWidth : 0, 
						itemHeight : 0, 
						defaultGap : 0
					};
					rect1.textWidth = textwidth;
					rect1.hotkeyWidth = hotkeywidth;
					rect1.itemHeight = item_h;
					rect1.defaultGap = _default_gap;
					_buttonRect_elem[i] = rect1;

					_item_top += 1;
				}
				else {
					item.chkwidth = chkimgwidth;
					item.iconimgwidth = iconimgwidth;
					item.textwidth = textwidth;
					item.hotkeywidth = hotkeywidth;

					item.expwidth = expimgwidth;
					item.expheight = expimgheight;

					var rect = {
						left : 0, 
						top : 0, 
						right : 0, 
						bottom : 0, 
						width : 0, 
						height : 0
					};
					rect.left = 0;
					rect.top = _item_top;
					rect.right = this._width;
					rect.bottom = _item_top + item_h;
					rect.width = this._width;
					rect.height = item_h;
					_buttonRect[i] = rect;


					var rect1 = {
						textWidth : 0, 
						hotkeyWidth : 0, 
						itemHeight : 0, 
						defaultGap : 0
					};
					rect1.textWidth = textwidth;
					rect1.hotkeyWidth = hotkeywidth;
					rect1.itemHeight = item_h;
					rect1.defaultGap = _default_gap;
					_buttonRect_elem[i] = rect1;


					if (nexacro._enableaccessibility) {
						item._updateAccessibilityLabel(item);
					}
					_item_top += item_h;

					if (!spin_flag && this._scrollIndex > 0 && _item_top >= 0) {
						spin_flag = true;
						_item_top += item_h;
					}
				}
			}
		}
	};

	_pPopupMenu._calcSpinButton = function () {
		if (!this.spindownbutton && !this.spinupbutton) {
			return;
		}

		var itempadding = this.on_find_CurrentStyle_itempadding(this._pseudo);
		var border = this.on_find_CurrentStyle_border(this._pseudo);

		var gap_height = (itempadding ? itempadding.bottom : 0) + (border ? border._bottom_width : 0);

		var _buttonRect = this._buttonRect;
		var len = _buttonRect.length;
		if (_buttonRect[len - 1].bottom - gap_height > this._adjust_height || this._is_spin_visible) {
			this.spinupbutton.set_visible(true);
			this.spinupbutton.move(0, 0, this._client_width, this._spin_height);

			var bottom = 0;
			var spindownbutton_top = 0;
			var top = this._spin_height;
			var _items = this._lineItems;
			var len = _items ? _items.length : 0;
			if (this._is_spin_visible) {
				top = 0;
			}

			for (var i = 0; i < len; i++) {
				var buttonRect = _buttonRect[i];
				if (buttonRect.bottom > this._adjust_height - this._spin_height * (top == 0 ? 1 : 2)) {
					if (bottom == 0) {
						bottom = this._adjust_height;
					}
				}

				if (bottom == 0) {
					buttonRect.top += top;
					buttonRect.bottom += top;
				}
				else {
					buttonRect.top = bottom;
					buttonRect.bottom = bottom + top;
				}
			}

			this.spindownbutton.set_visible(true);
			this.spindownbutton.move(0, this._adjust_height - this._spin_height - gap_height, this._client_width, this._spin_height);

			this._is_spin_visible = true;
		}
		else {
			this._is_spin_visible = false;
			this.spinupbutton.set_visible(false);
			this.spindownbutton.set_visible(false);
		}
	};

	_pPopupMenu._updateMenuItemPosition = function () {
		var _buttonRect = this._buttonRect;
		var _buttonRect_elem = this._buttonRect_elem;
		var _lineitems = this._lineItems;
		var len = _lineitems ? _lineitems.length : 0;
		for (var i = 0; i < len; i++) {
			var lineitem = _lineitems[i];
			var buttonRect = _buttonRect[i];
			lineitem.move(buttonRect.left, buttonRect.top, buttonRect.width, buttonRect.height);

			var buttonRect_elem = _buttonRect_elem[i];
			if (lineitem instanceof nexacro.PopupMenuItem) {
				lineitem._updateElementPositions(buttonRect_elem.textWidth, buttonRect_elem.hotkeyWidth, buttonRect_elem.itemHeight, buttonRect_elem.defaultGap);
			}
		}
	};

	_pPopupMenu._getAlignPosition = function (x, y, align) {
		if (align) {
			var width = this._width;
			var height = this._height;
			var popup_align = align.split(/\s+/);
			var align_len = popup_align.length;
			var horizon = parseInt(x, 10) | 0;
			var vertical = parseInt(y, 10) | 0;
			switch (align_len) {
				case 0:
					break;
				case 1:
					if (popup_align[0] == "left") {
						x = horizon - width;
					}
					else if (popup_align[0] == "center") {
						x = horizon - (width / 2);
					}
					else if (popup_align[0] == "top") {
						y = vertical - height;
					}
					else if (popup_align[0] == "middle") {
						y = vertical - (height / 2);
					}
					break;
				case 2:
					if (popup_align[0] == "left" || popup_align[0] == "center" || popup_align[0] == "right") {
						if (popup_align[0] == "left") {
							x = horizon - width;
						}
						else if (popup_align[0] == "center") {
							x = horizon - (width / 2);
						}
					}
					else if (popup_align[0] == "top" || popup_align[0] == "middle" || popup_align[0] == "bottom") {
						if (popup_align[0] == "top") {
							y = vertical - height;
						}
						else if (popup_align[0] == "middle") {
							y = vertical - (height / 2);
						}
					}

					if (popup_align[1] == "left" || popup_align[1] == "center" || popup_align[1] == "right") {
						if (popup_align[1] == "left") {
							x = horizon - width;
						}
						else if (popup_align[1] == "center") {
							x = horizon - (width / 2);
						}
					}
					else if (popup_align[1] == "top" || popup_align[1] == "middle" || popup_align[1] == "bottom") {
						if (popup_align[1] == "top") {
							y = vertical - height;
						}
						else if (popup_align[1] == "middle") {
							y = vertical - (height / 2);
						}
					}
					break;
				default:
					break;
			}
		}
		return [x, y];
	};

	_pPopupMenu.set_visible = function (v) {
		if (this._track_on) {
			nexacro.PopupComponent.prototype.set_visible.apply(this, arguments);
		}
	};
	_pPopupMenu._closePopup = function () {
		var popupmenu = this._popupmenu;
		if (popupmenu) {
			popupmenu._closePopup();

			popupmenu._destroySpinButton();
		}

		var _window = this._getWindow();
		if (_window && this._track_capture) {
			_window._releaseCaptureLock(this);
		}

		var items = this._item_find(this);
		if (nexacro._enableaccessibility) {
			this._item_focus(items[this._popupitemindex], false);
			this._popupitemindex = -1;
		}
		else {
			var itemLen = items.length;
			for (var i = 0; i < itemLen; i++) {
				this._item_focus(items[i], false);
			}
			this._popupitemindex = -1;
		}

		this.set_visible(false);
		this._track_on = false;
		this._closeflag = false;
	};

	_pPopupMenu.closePopup = _pPopupMenu._closePopup;

	_pPopupMenu._closeAllPopup = function () {
		this._closePopup();

		var parent = this.parent;
		if (parent) {
			if (parent instanceof nexacro.Menu) {
				if (parent._is_menu_click) {
					parent._is_menu_click = false;
				}
			}
		}
	};

	_pPopupMenu.on_fire_oncloseup = function (obj) {
		if (this.oncloseup && this.oncloseup._has_handlers) {
			var evt = new nexacro.MenuCloseUpEventInfo(obj, "oncloseup", (this._selected_itemindex >= 0));
			evt.eventid = "oncloseup";
			return this.oncloseup._fireEvent(this, evt);
		}
		return false;
	};

	_pPopupMenu.on_notify_spinup_onclick = function (obj, e) {
		this._spinup();
	};

	_pPopupMenu.on_notify_spindown_onclick = function (obj, e) {
		this._spindown();
	};

	_pPopupMenu._spinup = function () {
		if (this._scrollIndex > 0) {
			this._scrollIndex--;

			this._reCalcSize();
			this._calcSpinButton();
			this._updateMenuItemPosition();
		}
	};

	_pPopupMenu._spindown = function () {
		var _buttonRect = this._buttonRect;
		var len = _buttonRect ? _buttonRect.length : 0;
		if (len == 0) {
			return;
		}

		if (_buttonRect[len - 1].bottom > this._client_height) {
			this._scrollIndex++;

			this._reCalcSize();
			this._calcSpinButton();
			this._updateMenuItemPosition();
		}
	};

	_pPopupMenu._item_focus = function (obj, bflag) {
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
				obj.on_apply_mouseover(bflag);
			}
		}
	};

	_pPopupMenu._popupmenu_visible = function (obj) {
		if (obj._popupmenu == null || obj._popupmenu.visible == false) {
			return false;
		}
		return true;
	};

	_pPopupMenu._item_find = function (obj) {
		if (obj._popupmenu == null || obj._popupmenu.visible == false) {
			return obj._items;
		}
		return obj._popupmenu._items;
	};

	_pPopupMenu._popupmenu_find = function (obj) {
		var pThis = obj;

		while (pThis) {
			if (pThis._popupmenu === null || pThis._popupmenu.visible == false) {
				break;
			}
			var pThis = pThis._popupmenu;
		}
		return pThis;
	};

	_pPopupMenu._popupmenuitem_extend = function (obj) {
		return obj.notexpand;
	};

	_pPopupMenu._popupmenuitem_find = function (obj) {
		var pThis = obj._overedobj;

		while (pThis) {
			if (pThis._overedobj === null) {
				break;
			}
			var pThis = pThis._overedobj;
		}

		return pThis;
	};

	delete _pPopupMenu;

	nexacro.PopupMenuCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.PopupMenu.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
		this.level = 1;
		this._previousitem = 0;
	};
	var _pPopupMenuCtrl = nexacro.PopupMenuCtrl.prototype = nexacro._createPrototype(nexacro.PopupMenu, nexacro.PopupMenuCtrl);

	nexacro._setForControlStyleFinder(_pPopupMenuCtrl);

	delete _pPopupMenuCtrl;
}
