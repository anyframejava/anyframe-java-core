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

if (!nexacro.Div) {
	nexacro.Div = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.async = true;
		this.url = null;
		this.applystyletype = "cascade,keep";
		this.scrollbars = "autoboth";

		this._init_width = (right - left) | 0;
		this._init_height = (bottom - top) | 0;

		this._text_elem = null;

		this._url = null;
		this._urlloading = false;
		this._oldstyletype = 3;
		this._styletype = 3;

		this._originStyles = {
		};
		this._linkstyles = {
		};
		this._linkstyles.normal = this.on_create_custom_style();
		this._setstylecomplete = false;
		this._callstylecnt = 0;

		this._cssclass = "";
		this._linkedcssclass = "";
		this._setclasscomplete = false;
		this._callclasscnt = 0;

		if (parent) {
			this._has_parent = true;
		}
		else {
			this._has_parent = false;
		}

		this._scrollbars = 3;

		this._apply_client_padding = true;

		this._accessibility_role = "form";

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
			"onvscroll" : 1, 
			"onhscroll" : 1, 
			"onactivate" : 1, 
			"onbeforeclose" : 1, 
			"onclose" : 1, 
			"ondeactivate" : 1, 
			"onsyscommand" : 1, 
			"ontimer" : 1, 
			"oninit" : 1, 
			"onload" : 1, 
			"canlayoutchange" : 1, 
			"canstepchange" : 1, 
			"onlayoutchanged" : 1, 
			"onstepchanged" : 1, 
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
	};

	var _pDiv = nexacro._createPrototype(nexacro.Form, nexacro.Div);
	nexacro.Div.prototype = _pDiv;
	_pDiv._type_name = "Div";

	_pDiv._find_pseudo_obj = function (styleProp, pseudo, returnType) {
		switch (this._styletype) {
			case 5:
				return this._find_cascade_pseudo_obj(styleProp, pseudo, returnType);
			case 4:
				return this._find_apply_pseudo_obj(styleProp, pseudo, returnType);
			case 1:
				return this._find_keep_pseudo_obj(styleProp, pseudo, returnType);
			case 3:
			default:
				return this._find_cascadekeep_pseudo_obj(styleProp, pseudo, returnType);
		}
		return null;
	};

	_pDiv._find_cascade_pseudo_obj = function (styleProp, pseudo, returnType) {
		var r;
		do {
			if (pseudo != "normal") {
				var lo = this._linkstyles[pseudo];
				if (lo && (r = lo[styleProp]) && (!r._is_empty)) {
					break;
				}
				var po = this._styles[pseudo];
				if (po && (r = po[styleProp]) && (!r._is_empty)) {
					break;
				}
			}

			var no = this._linkstyles["normal"];
			if (no && (r = no[styleProp]) && (!r._is_empty)) {
				break;
			}
			var no = this.style;
			if (no && (r = no[styleProp]) && (!r._is_empty)) {
				break;
			}
		} while (false);

		if (r && !r._is_empty) {
			var foundType = r._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				r = nexacro._getCachedStyleObj(returnType, r._value);
			}
			return r;
		}

		return this._find_comp_pseudo_obj_from_finder(styleProp, pseudo, returnType);
	};

	_pDiv._find_apply_pseudo_obj = function (styleProp, pseudo, returnType) {
		var r;
		do {
			if (pseudo != "normal") {
				var lo = this._linkstyles[pseudo];
				if (lo && (r = lo[styleProp]) && (!r._is_empty)) {
					break;
				}
			}

			var no = this._linkstyles["normal"];
			if (no && (r = no[styleProp]) && (!r._is_empty)) {
				break;
			}
		} while (false);

		if (r && !r._is_empty) {
			var foundType = r._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				r = nexacro._getCachedStyleObj(returnType, r._value);
			}
			return r;
		}
		return this._find_comp_pseudo_obj_from_finder(styleProp, pseudo, returnType);
	};

	_pDiv._find_keep_pseudo_obj = function (styleProp, pseudo, returnType) {
		var r;
		do {
			if (pseudo != "normal") {
				var po = this._styles[pseudo];
				if (po && (r = po[styleProp]) && (!r._is_empty)) {
					break;
				}
			}

			var no = this.style;
			if (no && (r = no[styleProp]) && (!r._is_empty)) {
				break;
			}
		} while (false);

		if (r && !r._is_empty) {
			var foundType = r._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				r = nexacro._getCachedStyleObj(returnType, r._value);
			}
			return r;
		}
		return this._find_comp_pseudo_obj_from_finder(styleProp, pseudo, returnType);
	};

	_pDiv._find_cascadekeep_pseudo_obj = function (styleProp, pseudo, returnType) {
		var r;
		do {
			if (pseudo != "normal") {
				var po = this._styles[pseudo];
				if (po && (r = po[styleProp]) && (!r._is_empty)) {
					break;
				}
				var lo = this._linkstyles[pseudo];
				if (lo && (r = lo[styleProp]) && (!r._is_empty)) {
					break;
				}
			}

			var no = this.style;
			if (no && (r = no[styleProp]) && (!r._is_empty)) {
				break;
			}
			no = this._linkstyles["normal"];
			if (no && (r = no[styleProp]) && (!r._is_empty)) {
				break;
			}
		} while (false);

		if (r && !r._is_empty) {
			var foundType = r._type_name.toLowerCase();
			if (returnType && foundType != returnType) {
				r = nexacro._getCachedStyleObj(returnType, r._value);
			}
			return r;
		}
		return this._find_comp_pseudo_obj_from_finder(styleProp, pseudo, returnType);
	};

	_pDiv.on_apply_custom_pseudo = function (pseudo) {
		var applystyles = applystyles = ["align", "background", "border", "bordertype", "color", "cursor", "font", "letterspace", "glow", "gradation", "margin", "opacity", "padding", "shadow", "accessibility"];
		var findstyle;
		if (!this._url || this._url.length == 0) {
			this._oldstyletype = this._styletype;
			this._styletype = 1;
			findstyle = this._find_style(applystyles);
			this._styletype = this._oldstyletype;

			this._apply_style(findstyle);
		}
		else {
			if (this._setstylecomplete) {
				findstyle = this._find_style(applystyles);

				this._apply_style(findstyle);
			}
		}
		applystyles = null;
	};

	_pDiv.on_update_style_align = function () {
		var align = this.style.align;
		var ret = this.on_update_style("align", align);
		if (ret) {
			this.on_apply_style_align(align);
		}
	};

	_pDiv.on_update_style_background = function () {
		var background = this.style.background;
		var ret = this.on_update_style("background", background);
		if (ret) {
			this.on_apply_style_background(background);
		}
	};

	_pDiv.on_update_style_border = function () {
		var border = this.style.border;
		var ret = this.on_update_style("border", border);
		if (ret) {
			this.on_apply_style_border(border);
		}
	};

	_pDiv.on_update_style_bordertype = function () {
		var bordertype = this.style.bordertype;
		var ret = this.on_update_style("bordertype", bordertype);
		if (ret) {
			this.on_apply_style_bordertype(bordertype);
		}
	};

	_pDiv.on_update_style_color = function () {
		var color = this.style.color;
		var ret = this.on_update_style("color", color);
		if (ret) {
			this.on_apply_style_color(color);
		}
	};

	_pDiv.on_update_style_cursor = function () {
		var cursor = this.style.cursor;
		var ret = this.on_update_style("cursor", cursor);
		if (ret) {
			this.on_apply_style_cursor(cursor);
		}
	};

	_pDiv.on_update_style_font = function () {
		var font = this.style.font;
		var ret = this.on_update_style("font", font);
		if (ret) {
			this.on_apply_style_font(font);
		}
	};

	_pDiv.on_update_style_glow = function () {
		var glow = this.style.glow;
		var ret = this.on_update_style("glow", glow);
		if (ret) {
			this.on_apply_style_glow(glow);
		}
	};

	_pDiv.on_update_style_gradation = function () {
		var gradation = this.style.gradation;
		var ret = this.on_update_style("gradation", gradation);
		if (ret) {
			this.on_apply_style_gradation(gradation);
		}
	};

	_pDiv.on_update_style_margin = function () {
		var margin = this.style.margin;
		var ret = this.on_update_style("margin", margin);
		if (ret) {
			this.on_apply_style_margin(margin);
		}
	};

	_pDiv.on_update_style_opacity = function () {
		var opacity = this.style.opacity;
		var ret = this.on_update_style("opacity", opacity);
		if (ret) {
			this.on_apply_style_opacity(opacity);
		}
	};

	_pDiv.on_update_style_padding = function () {
		var padding = this.style.padding;
		var ret = this.on_update_style("padding", padding);
		if (ret) {
			this.on_apply_style_padding(padding);
		}
	};

	_pDiv.on_update_style_shadow = function () {
		var shadow = this.style.shadow;
		var ret = this.on_update_style("shadow", shadow);
		if (ret) {
			this.on_apply_style_shadow(shadow);
		}
	};

	_pDiv.on_update_style_accessibility = function () {
		var accessibility = this.style.accessibility;
		var ret = this.on_update_style("accessibility", accessibility);
		if (ret) {
			this.on_apply_style_accessibility(this._make_accessibility_value(accessibility));
		}
	};

	_pDiv.on_update_style = function (styleName, styleObj) {
		var pseudo = "normal";
		if (!this._setstylecomplete && this._is_loading) {
			if (!this._linkstyles[pseudo]) {
				var styleclone = nexacro._cloneStyleObject(this.style);
				this._linkstyles[pseudo] = styleclone;
				styleclone = null;
			}
			this._linkstyles[pseudo][styleName] = styleObj;
			if (this._styletype == 4 || this._styletype == 5 || (this._styletype == 3 && this._styles[pseudo] && this._styles[pseudo][styleName] == null)) {
				this.currentstyle[styleName] = styleObj;
				return true;
			}
		}
		else if (this._setstylecomplete && !this._is_loading) {
			var style = styleObj;
			if (!this._styles[pseudo]) {
				var styleclone = nexacro._cloneStyleObject(this.style);
				this._styles[pseudo] = styleclone;
				styleclone = null;
			}
			this._styles[pseudo][styleName] = style;
			if (!this._url || this._url.length == 0) {
				this.currentstyle[styleName] = styleObj;
				return true;
			}
			else {
				if (this._styletype == 1 || this._styletype == 3) {
					this.currentstyle[styleName] = styleObj;
					return true;
				}
				else {
					return false;
				}
			}
		}
	};

	_pDiv.on_apply_style_color = function (color) {
		var textElem = this._text_elem;

		if (textElem) {
			textElem.setElementColor(color);
		}
	};

	_pDiv.on_apply_style_font = function (font) {
		var textElem = this._text_elem;

		if (textElem) {
			textElem.setElementFont(font);
		}
	};

	_pDiv.on_apply_style_align = function (align) {
		var textElem = this._text_elem;

		if (textElem) {
			var halign = align.halign == "" ? "center" : align._halign;
			var valign = align.valign == "" ? "middle" : align._valign;
			textElem.setElementAlignXY(halign, valign);
		}
	};

	_pDiv.on_create_contents = function () {
		if (this.components.length > 0) {
			nexacro.Form.prototype.on_create_contents.call(this);
		}
		else {
			var control_elem = this.getElement();
			if (control_elem) {
				var curstyle = this.currentstyle;

				if (this.text) {
					var text_elem = new nexacro.TextBoxElement(control_elem);
					var halign = ((curstyle.align == null || curstyle.align.halign == "") ? "center" : curstyle.align._halign);
					var valign = ((curstyle.align == null || curstyle.align.valign == "") ? "middle" : curstyle.align._valign);

					text_elem.setElementSize(this._client_width, this._client_height);
					text_elem.setElementFont(curstyle.font);
					text_elem.setElementColor(curstyle.color);
					text_elem.setElementAlignXY(halign, valign);
					text_elem.setElementLetterSpace(curstyle.letterspace);
					this._text_elem = text_elem;

					text_elem = null;
					curstyle = null;
					halign = null;
					valign = null;
				}
				else if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
					this._text_elem = new nexacro.TextBoxElement(control_elem);
					this._text_elem.setElementSize(this._client_width, this._client_height);
				}
			}
			control_elem = null;
		}
		this._setStyle();
		this._setclasscomplete = true;
	};

	_pDiv.on_created_contents = function () {
		this.on_apply_applystyletype();
		if (this.text) {
			this.on_apply_text();
			var text_elem = this._text_elem;

			if (text_elem) {
				text_elem.create();
				text_elem = null;
			}
		}

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4 && this._text_elem) {
			this._text_elem.create();
			this._text_elem._setElementAccessibilityRole();
			this._text_elem._setElementAccessibilityLabel();
		}

		if (this._is_loaded == false && this.url != null && !this._has_parent) {
			this._has_parent = true;
			this.loadForm(this.url, this.async, true, this.parent._url);
		}

		nexacro.Form.prototype.on_created_contents.call(this);
	};
	_pDiv.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}

		this._has_parent = false;
		this._user_property_list = null;

		nexacro.Form.prototype.on_destroy_contents.call(this);

		if (this._originStyles) {
			var originstyles = this._originStyles;
			for (var pseudo in originstyles) {
				var originstyle = originstyles[pseudo];
				if (originstyle.destroy) {
					originstyle.destroy();
					originstyle = null;
				}
			}
			this._originStyles = null;
		}

		if (this._linkstyles) {
			var linkstyles = this._linkstyles;
			for (var pseudo in linkstyles) {
				var linkstyle = linkstyles[pseudo];
				if (linkstyle.destroy) {
					linkstyle.destroy();
					linkstyle = null;
				}
			}
			this._linkstyles = null;
		}
	};


	_pDiv.on_change_containerRect = function (width, height) {
		if (this._text_elem) {
			this._text_elem.setElementSize(width, height);
		}

		nexacro.Form.prototype.on_change_containerRect.call(this, width, height);
	};

	_pDiv.on_update_position = function (resize_flag, move_flag) {
		var child_list = this._child_list;
		var len = child_list ? child_list.length : 0;
		for (var i = 0; i < len; i++) {
			var comp = child_list[i];
			if (comp._isPopupVisible && comp._isPopupVisible()) {
				if (comp._closePopup) {
					comp._closePopup();
				}
			}
			comp = null;
		}

		childe_list = null;
		len = null;

		nexacro.Form.prototype.on_update_position.call(this, resize_flag, move_flag);
	};

	_pDiv._getAccessibilityRole = function (accessibility) {
		var role = accessibility.role ? accessibility.role : this._accessibility_role;
		return role;
	};

	_pDiv.on_get_style_accessibility_label = function () {
		return this.text ? this.text : "";
	};

	_pDiv.getFocus = function () {
		return this.parent ? this.parent.getFocus() : null;
	};

	_pDiv.getParentContext = function () {
		return this.parent;
	};

	_pDiv.reload = function () {
		this.on_apply_url(true);
	};

	_pDiv.addChild = function (id, obj) {
		var ret = nexacro.Form.prototype.addChild.call(this, id, obj);
		if (obj._is_component) {
			this._delete_text();
		}
		return ret;
	};

	_pDiv._delete_text = function () {
		this._apply_client_padding = false;

		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}
		if (this._control_element) {
			this._control_element.setElementPadding(nexacro.Component._default_padding);
		}
	};


	_pDiv._initContents = function (control_elem, pseudo) {
		if (this._urlloading) {
			pseudo = "normal";
			this._pseudo = "normal";
			this._contents_pseudo = "";
		}
		this._urlloading = false;

		nexacro.Component.prototype._initContents.call(this, control_elem, pseudo);
	};

	_pDiv._init = function () {
		this._css_finder = null;
		this._ref_css_finder = null;
		this._cssfinder_cache = {
		};

		if (!this._setstylecomplete && this._callstylecnt == 0) {
			this._setStyle();
		}

		if (this.hscrollbar) {
			this.hscrollbar._setScrollPos(0);
		}
		if (this.vscrollbar) {
			this.vscrollbar._setScrollPos(0);
		}

		this._cssclass = this.cssclass;
		this._callclasscnt++;
	};

	_pDiv._clear = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			this._is_init = true;
			this._pseudo = "normal";
			this.currentstyle._empty();
			this._control_pseudo = "";
			this._contents_pseudo = "";

			this._clearEventListeners();

			if (this._timerManager && this._timerManager.timerList.length > 0) {
				this._timerManager.clearAll();
			}

			if (this._text_elem) {
				this._text_elem.destroy();
				this._text_elem = null;
			}

			control_elem.clearContents();
			control_elem = null;

			if (this.stepcontrol) {
				this._destroyStepControl();
				this.stepcontrol = null;
			}

			var binds = this.binds;
			var len = binds.length;
			for (var i = 0; i < len; i++) {
				var bindname = binds.get_id(i);
				this._bind_manager._setBinditem(binds.get_item(bindname), true);
				this[bindname] = null;
			}
			binds.clear();
			binds = null;

			var components = this.components;
			var objects = this.objects;

			this.all = new nexacro.Collection();
			this.components = new nexacro.Collection();
			this.objects = new nexacro.Collection();

			len = components.length;
			for (var i = 0; i < len; i++) {
				var compname = components.get_id(i);
				if (this[compname]) {
					if (this[compname]._destroy) {
						this[compname]._destroy();
					}
				}
			}
			components.clear();
			components = null;

			len = objects.length;
			for (var i = 0; i < len; i++) {
				var objname = objects.get_id(i);
				if (this[objname]) {
					if (this[objname].destroy) {
						this[objname].destroy();
					}
					delete this[objname];
					this[objname] = null;
				}
			}
			objects.clear();
			objects = null;

			if (this._linkstyles) {
				var linkstyles = this._linkstyles;
				for (pseudo in linkstyles) {
					var linkstyle = linkstyles[pseudo];
					if (linkstyle.destroy) {
						linkstyle.destroy();
						linkstyle = null;
					}
				}
			}


			this.resetScroll();

			this._clear_prop();
			this._last_focused = null;
		}
		this._is_created = false;
	};

	_pDiv._loadInclude = function (mainurl, url) {
		var asyncmode = this.async;
		if (!this._is_created) {
			if (!this.parent || !this.parent._is_created) {
				asyncmode = true;
			}
		}

		application._loadInclude.call(this, mainurl, url, asyncmode);
		asyncmode = null;
	};


	_pDiv.on_apply_text = function () {
		var control_elem = this.getElement();
		var text_elem = this._text_elem;
		var curstyle = this.currentstyle;

		if (control_elem) {
			if (!text_elem && this.text && this.components.length < 1) {
				text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem.create();
			}

			if (text_elem) {
				var halign = (curstyle.align.halign == "" ? "center" : curstyle.align._halign);
				var valign = (curstyle.align.valign == "" ? "middle" : curstyle.align._valign);

				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementFont(curstyle.font);
				text_elem.setElementColor(curstyle.color);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(curstyle.letterspace);

				halign = null;
				valign = null;

				if (this.style.color != "transparent") {
					var text = this._display_text;
					if (text) {
						text_elem.setElementText(text);
					}
					else {
						text_elem.setElementText("");
					}
				}

				if (this._is_created && nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
					text_elem._setElementAccessibilityRole();
					text_elem._setElementAccessibilityLabel();
				}
			}
		}
		control_elem = null;
		text_elem = null;
		curstyle = null;
	};

	_pDiv.set_async = function (v) {
		this.async = nexacro._toBoolean(v);
	};

	_pDiv.set_url = function (v, basync) {
		if ((v != this.url) && !(v == "" && this.url == null)) {
			if (v.substring(v.length - 5) == ".xfdl" || !v) {
				this.url = v;
				this._url = v;
				this.on_apply_url();
			}
		}
	};

	_pDiv.getSetter = function (name, fnname) {
		if (!this._user_property_list) {
			this._user_property_list = [];
		}
		this._user_property_list[name] = 1;
		if (!fnname) {
			fnname = "set_" + name;
		}
		var fn = this[fnname];
		if (fn) {
			return new nexacro.SetterBinder(this, name, fn);
		}
		return new nexacro.PropBinder(this, name);
	};

	_pDiv._clear_prop = function () {
		var list = nexacro._div_property_list;
		var user_list = this._user_property_list;
		var temp_obj = [];

		var proplength = list.length;
		var usr_length = user_list ? user_list.length : 0;
		var i = 0;

		for (i = 0; i < proplength; i++) {
			var propid = list[i];
			temp_obj[i] = this[propid];
			this[propid] = null;
		}
		for (i = 0; i < usr_length; i++) {
			var propid = user_list[i];
			temp_obj[i + proplength] = this[propid];
			this[propid] = null;
		}

		for (var prop in this) {
			if (this.hasOwnProperty(prop) && this[prop] != null) {
				this[prop] = null;
			}
		}

		for (i = 0; i < proplength; i++) {
			var propid = list[i];
			this[propid] = temp_obj[i];
		}
		for (i = 0; i < usr_length; i++) {
			var propid = user_list[i];
			this[propid] = temp_obj[i + proplength];
		}
		temp_obj = null;
	};

	_pDiv.on_apply_url = function (reload) {
		if (this._url && this._url.length > 0) {
			this._urlloading = true;
			this._setstylecomplete = false;

			application.getLayoutManager().clearLayout(this);

			var asyncmode = this.async;

			if (reload != true) {
				var confirm_message = this._on_beforeclose();
				if (this._checkAndConfirmClose(confirm_message) == false) {
					return;
				}
				this._on_close();
			}

			var _parent = this.parent;
			if (_parent != null) {
				while (!_parent._url) {
					_parent = _parent.parent;
				}
				if (this._apply_client_padding) {
					this._delete_text();
				}
				this.loadForm(this._url, asyncmode, true, _parent._url);
				this._has_parent = true;
			}
			else {
				this._has_parent = false;
			}
			_parent = null;
		}
		else {
			var confirm_message = this._on_beforeclose();
			if (this._checkAndConfirmClose(confirm_message) == false) {
				return;
			}
			this._on_close();

			this.on_apply_emptyurl();
			this.on_apply_applystyletype();
		}

		if (this.onactivate && this.onactivate._has_handlers && this._isCompleted) {
			var evt = new ActivateEventInfo(this, "onactivate", true);
			this.onactivate._fireEvent(this, evt);
			evt = null;
		}
	};

	_pDiv.on_apply_emptyurl = function () {
		this._clear();
		var parent_elem = this.parent._control_element;
		if (!parent_elem) {
			return false;
		}

		var control_elem = this._control_element;
		if (control_elem) {
			var pseudo = this._getResultPseudo(this._status, this._pseudo);
			this.cssclass = this._cssclass;
			this._initControl(control_elem, pseudo);
			this._initContents(control_elem, pseudo);
			if (parent_elem._handle) {
				parent_elem.appendChildElement(control_elem);
				this.on_created();
			}
			pseudo = "";
		}

		parent_elem = null;
		control_elem = null;
	};

	_pDiv.set_applystyletype = function (v) {
		if (this.applystyletype != v) {
			this.applystyletype = v;
			this.on_apply_applystyletype();
		}
	};

	_pDiv.on_apply_applystyletype = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var applystyles = ["align", "background", "border", "bordertype", "color", "cursor", "font", "glow", "gradation", "margin", "opacity", "padding", "shadow", "accessibility"];
			var findstyle;
			if (!this._url || this._url.length == 0) {
				this._oldstyletype = this._styletype;
				this._styletype = 1;
				findstyle = this._find_style(applystyles);
				this._styletype = this._oldstyletype;
				this.cssclass = this._cssclass;
			}
			else {
				switch (this.applystyletype) {
					case "keep":
						this._styletype = 1;
						this.cssclass = this._cssclass;
						break;
					case "apply":
						this._styletype = 4;
						this.cssclass = this._linkedcssclass;
						break;
					case "cascade":
						this._styletype = 5;
						this.cssclass = this._linkedcssclass;
						break;
					case "cascade,keep":
						this._styletype = 3;
						this.cssclass = this._linkedcssclass;
						break;
					default:
						this._styletype = 3;
						this.cssclass = this._linkedcssclass;
						v = "cascade,keep";
						break;
				}
				findstyle = this._find_style(applystyles);
			}
			this._apply_style(findstyle);
			applystyles = null;
			findstyle = null;
		}
		control_elem = null;
	};

	_pDiv.set_cssclass = function (cssclass) {
		if (this.cssclass != cssclass) {
			if (!this._setclasscomplete) {
				if (!this._url || this._url.length == 0) {
					this._cssclass = cssclass;
				}
				else {
					if (this._is_loading && this._callclasscnt == 0) {
						this._cssclass = cssclass;
					}
					else if (this._is_loading && this._callclasscnt != 0) {
						this._linkedcssclass = cssclass;
					}
				}
			}
			else {
				if (this._is_loading) {
					this._linkedcssclass = cssclass;
				}
				else {
					this._cssclass = cssclass;
				}
			}

			this.cssclass = cssclass;
			this.on_apply_cssclass(cssclass);
		}
	};

	_pDiv.set_class = _pDiv.set_cssclass;

	_pDiv.on_apply_cssclass = function () {
		var pseudo = this._pseudo;
		var control_elem = this._control_element;

		if (control_elem) {
			this.currentstyle._empty();
			this._css_finder = null;
			this._ref_css_finder = null;
			this._cssfinder_cache = {
			};

			pseudo = this._pseudo == "" ? "normal" : this._pseudo;

			if (this.vscrollbar) {
				this.vscrollbar.on_apply_prop_class();
			}
			if (this.hscrollbar) {
				this.hscrollbar.on_apply_prop_class();
			}

			this._onResetScrollBar();

			this._pseudo = "";
			this._control_pseudo = "";
			this._contents_pseudo = "";

			this._updateControl(control_elem, pseudo);
			this._updateContents(control_elem, pseudo);
		}
	};

	_pDiv._apply_style = function (styleObj) {
		this.on_apply_style_align(styleObj.align);
		this.on_apply_style_background(styleObj.background);
		this.on_apply_style_border(styleObj.border);
		this.on_apply_style_bordertype(styleObj.bordertype);
		this.on_apply_style_color(styleObj.color);
		this.on_apply_style_cursor(styleObj.cursor);
		this.on_apply_style_font(styleObj.font);
		this.on_apply_style_letterspace(styleObj.letterspace);
		this.on_apply_style_glow(styleObj.glow);
		this.on_apply_style_gradation(styleObj.gradation);
		this.on_apply_style_margin(styleObj.margin);
		this.on_apply_style_opacity(styleObj.opacity);
		this.on_apply_style_padding(styleObj.padding);
		this.on_apply_style_shadow(styleObj.shadow);
		this.on_apply_style_accessibility(styleObj.accessibility);
	};

	_pDiv._find_style = function (styleNameArr) {
		var style = {
		};
		var style_len = styleNameArr.length;
		var pseudo = this._pseudo;

		for (var i = 0; i < style_len; i++) {
			var styleName = styleNameArr[i];
			switch (styleName) {
				case "accessibility":
					style["accessibility"] = this._make_accessibility_value(this.on_find_CurrentStyle_accessibility(pseudo));
					if (!style["accessibility"]) {
						style["accessibility"] = nexacro._getCachedAccessibilityObj("");
					}
					break;
				case "align":
					style["align"] = this.on_find_CurrentStyle_align(pseudo);
					if (!style["align"]) {
						style["align"] = nexacro._getCachedAlignObj("");
					}
					break;
				case "background":
					style["background"] = this.on_find_CurrentStyle_background(pseudo);
					if (!style["background"]) {
						style["background"] = nexacro._getCachedBackgroundObj("");
					}
					break;
				case "border":
					style["border"] = this.on_find_CurrentStyle_border(pseudo);
					if (!style["border"]) {
						style["border"] = nexacro._getCachedBorderObj("");
					}
					break;
				case "bordertype":
					style["bordertype"] = this.on_find_CurrentStyle_bordertype(pseudo);
					if (!style["bordertype"]) {
						style["bordertype"] = nexacro._getCachedBordertypeObj("");
					}
					break;
				case "color":
					style["color"] = this.on_find_CurrentStyle_color(pseudo);
					if (!style["color"]) {
						style["color"] = nexacro._getCachedColorObj("");
					}
					break;
				case "cursor":
					style["cursor"] = this.on_find_CurrentStyle_cursor(pseudo);
					if (!style["cursor"]) {
						style["cursor"] = nexacro._getCachedStyleObj("");
					}
				case "font":
					style["font"] = this.on_find_CurrentStyle_font(pseudo);
					if (!style["font"]) {
						style["font"] = nexacro._getCachedFontObj("");
					}
				case "letterspace":
					style["letterspace"] = this.on_find_CurrentStyle_letterspace(pseudo);
					if (!style["letterspace"]) {
						style["letterspace"] = nexacro._getCachedStyleObj("letterspace", "0");
					}
				case "glow":
					style["glow"] = this.on_find_CurrentStyle_glow(pseudo);
					if (!style["glow"]) {
						style["glow"] = nexacro._getCachedGlowObj("");
					}
				case "gradation":
					style["gradation"] = this.on_find_CurrentStyle_gradation(pseudo);
					if (!style["gradation"]) {
						style["gradation"] = nexacro._getCachedGradationObj("");
					}
				case "margin":
					style["margin"] = this.on_find_CurrentStyle_margin(pseudo);
					if (!style["margin"]) {
						style["margin"] = nexacro._getCachedMarginObj("");
					}
				case "opacity":
					style["opacity"] = this.on_find_CurrentStyle_opacity(pseudo);
					if (!style["opacity"]) {
						style["opacity"] = nexacro._getCachedStyleObj("opacity", "100");
					}
				case "padding":
					style["padding"] = this.on_find_CurrentStyle_padding(pseudo);
					if (!style["padding"]) {
						style["padding"] = nexacro._getCachedPaddingObj("");
					}
				case "shadow":
					style["shadow"] = this.on_find_CurrentStyle_shadow(pseudo);
					if (!style["shadow"]) {
						style["shadow"] = nexacro._getCachedShadowObj("");
					}
					break;
			}
			this.currentstyle[styleName] = style[styleName];
		}
		return style;
	};

	_pDiv._setStyle = function () {
		if (!this._setstylecomplete && this._callstylecnt == 0) {
			var styleclone = nexacro._cloneStyleObject(this.style);
			this._originStyles.normal = styleclone;
			for (var pseudoName in this._styles) {
				this._originStyles[pseudoName] = nexacro._cloneStyleObject(this._styles[pseudoName]);
			}

			if (!this._url || this._url.length == 0) {
				this._setstylecomplete = true;
			}
			else {
				this.style._empty();
			}
			this._callstylecnt++;
			styleclone = null;
		}
		else if (!this._setstylecomplete && this._callstylecnt != 0) {
			if (this._url || this._url.length > 0) {
				var styleclone = nexacro._cloneStyleObject(this.style);
				this._linkstyles.normal = styleclone;

				for (var pseudoName in this._styles) {
					this._linkstyles[pseudoName] = nexacro._cloneStyleObject(this._styles[pseudoName]);
				}

				this._setstylecomplete = true;
				this._callstylecnt++;

				for (pseudoName in this._originStyles) {
					var styleclone2 = nexacro._cloneStyleObject(this._originStyles[pseudoName]);
					styleclone2._target = this;
					if (pseudoName == "normal") {
						this.style = styleclone2;
					}
					else {
						this._styles[pseudoName] = styleclone2;
					}
					styleclone2 = null;
				}
				styleclone = null;
			}
			else {
				this.style = nexacro._cloneStyleObject(this._originStyles.normal);
			}
		}
		return;
	};

	delete _pDiv;
	_pDiv = null;

	nexacro.DivCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Div.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};
	var _pDivCtrl = nexacro.DivCtrl.prototype = nexacro._createPrototype(nexacro.Div, nexacro.DivCtrl);

	nexacro._setForControlStyleFinder(_pDivCtrl);
	delete _pDivCtrl;
	_pDivCtrl = null;
}
