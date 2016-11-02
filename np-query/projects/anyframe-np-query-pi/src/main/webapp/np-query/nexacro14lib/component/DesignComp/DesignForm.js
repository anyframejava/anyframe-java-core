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

if (!nexacro.DesignForm) {
	nexacro.isDesignMode = true;

	nexacro._design_notify_layoutchange = 1;
	nexacro._design_notify_div_urlload = 2;
	nexacro._design_notify_div_httperror = 3;
	nexacro._design_notify_theme_change = 4;
	nexacro._design_notify_theme_updated = 5;
	nexacro._design_notify_css_change = 6;
	nexacro._design_notify_css_updated = 7;

	nexacro._design_sublayout_overlaycolor = new nexacro.Style_color("#00000090");

	nexacro._design_css_cache = new nexacro.Collection();
	nexacro._design_themeid_map = new nexacro.Collection();

	nexacro.DesignForm_Style = function (target) {
		nexacro.Form_Style.call(this, target);
	};

	var _pDesignFormStyle = nexacro._createPrototype(nexacro.Style, nexacro.DesignForm_Style);
	nexacro.DesignForm_Style.prototype = _pDesignFormStyle;

	eval(nexacro._createAlignAttributeEvalStr("_pDesignFormStyle", "stepalign"));
	eval(nexacro._createValueAttributeEvalStr("_pDesignFormStyle", "stepshowtype"));

	_pDesignFormStyle.__custom_emptyObject = function () {
		this.stepalign = null;
		this.stepshowtype = null;
	};
	_pDesignFormStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.stepalign && !this.stepalign._is_empty) {
			val += "stepalign:" + this.stepalign._value + "; ";
		}
		if (this.stepshowtype && !this.stepshowtype._is_empty) {
			val += "stepshowtype:" + this.stepshowtype._value + "; ";
		}
		return val;
	};


	nexacro.DesignForm_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.stepalign = null;
		this.stepshowtype = null;
	};

	var _pDesignFormCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.DesignForm_CurrentStyle);
	nexacro.DesignForm_CurrentStyle.prototype = _pDesignFormCurrentStyle;

	_pDesignFormCurrentStyle.__custom_emptyObject = _pDesignFormStyle.__custom_emptyObject;
	_pDesignFormCurrentStyle.__get_custom_style_value = _pDesignFormStyle.__get_custom_style_value;

	delete _pDesignFormStyle;
	delete _pDesignFormCurrentStyle;


	nexacro.DesignForm = function (id, position, left, top, width, height, right, bottom, parent) {
		this._inner_form = null;
		this._root_left = 20;
		this._root_top = 20;
		this._scroll_horz = 0;
		this._scroll_vert = 0;
		this._inner_form_width = 0;
		this._inner_form_height = 0;

		this._dot_size_x = 0;
		this._dot_size_y = 0;

		this._sublayoutmode_stack = [];
		this._active_editing_form = null;

		this._outer_background_value = "#DCDCDC";
		this._inner_background_value = "#eeeeee";

		nexacro.Form.call(this, id, position, left, top, width, height, right, bottom, parent, true);

		this.set_scrollbars("none");
	};

	var _pDesignForm = nexacro._createPrototype(nexacro.Form, nexacro.DesignForm);
	nexacro.DesignForm.prototype = _pDesignForm;

	_pDesignForm._type_name = "DesignForm";


	eval(nexacro._createAlignAttributeEvalStr("_pDesignForm", "stepalign"));
	eval(nexacro._createValueAttributeEvalStr("_pDesignForm", "stepshowtype"));


	_pDesignForm.on_create_custom_style = function () {
		return new nexacro.DesignForm_Style(this);
	};

	_pDesignForm.on_create_custom_currentStyle = function () {
		return new nexacro.DesignForm_CurrentStyle();
	};


	_pDesignForm.on_create_contents = function () {
		nexacro.Form.prototype.on_create_contents.call(this);
	};

	_pDesignForm.on_destroy_contents = function () {
		this.accessport = null;
		nexacro.Form.prototype.on_destroy_contents.call(this);
	};

	_pDesignForm.destroy = function () {
		if (this._inner_form) {
			this._inner_form.destroy();
			this._inner_form = null;
		}

		var design_frame = this.parent;
		if (design_frame._window) {
			design_frame._window.destroy();
		}

		design_frame.destroy();

		nexacro.Form.prototype.destroy.call(this);
	};

	_pDesignForm._init = function () {
		if (application.accessport) {
			this._setEventHandler("oninit", this.on_notify_init, this);
		}
	};

	_pDesignForm._get_css_typename = function () {
		return "Form";
	};



	_pDesignForm.reloadForm = function () {
		var active_form = this._active_editing_form;
		if (active_form) {
			var elem = active_form._control_element;
			if (elem) {
				if (elem._step_container_elements) {
					var list = elem._step_container_elements;
					var list_len = list.length;
					for (var i = 0; i < list_len; i++) {
						var step_container_elem = list[i];
						step_container_elem.destroy();
					}
				}
			}
		}

		var inner_form = this._inner_form;
		if (inner_form) {
			inner_form.destroy();
		}

		this._inner_form = null;
		this._createInnerForm();

		this.setOverflowClip(this._overflowclip);
	};

	_pDesignForm.createComponentByRect = function (classname, parentid, left, top, width, height, compid) {
		var parent;
		if (parentid) {
			parent = this._getChild(parentid);
		}

		if (!parent) {
			parent = this._inner_form;
		}

		if (!compid || compid.length == 0) {
			compid = this._getNextChildID(parent, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = new classnameobj(compid, null, left, top, width, height, null, null, parent);
			parent.addChild(compid, obj);

			if (obj["set_text"]) {
				obj["set_text"](compid);
			}

			if (obj["set_taborder"]) {
				obj["set_taborder"](this._getNextChildTaborder(parent));
			}

			obj.show();

			return compid;
		}
	};

	_pDesignForm.createTabpage = function (classname, parentid, compid) {
		var parent;
		if (parentid) {
			parent = this._getChild(parentid);
		}

		if (!parent) {
			return;
		}

		if (!compid || compid.length == 0) {
			compid = this._getNextChildID(parent, classname);
		}

		if (parent instanceof nexacro.Tab) {
			parent.insertTabpage(compid, parent.getTabpageCount(), "", compid);
			return compid;
		}

		return;
	};

	_pDesignForm.createInvisibleObject = function (classname, objid) {
		if (!objid || objid.length == 0) {
			objid = this._getNextChildID(this._inner_form, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = new classnameobj(objid, this._inner_form);
			this._inner_form.addChild(objid, obj);

			return obj.name;
		}
	};

	_pDesignForm.deleteObject = function (objid) {
		var obj = this._getChild(objid);
		var parent = obj.parent;
		if (obj && parent) {
			parent.removeChild(obj.id);
			return obj.destroyComponent();
		}
	};

	_pDesignForm.setProperty = function (compid, propid, propval, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			var propids = propid.split(".");
			if (propids.length == 1 && propid == "style") {
				obj.style._empty();
				obj.style._is_empty = false;
			}
			else if (propids.length > 1 && propids[0] == "style") {
				var _style;
				if (!pseudo) {
					_style = obj.style;
				}
				else {
					_style = obj._styles[pseudo];
					if (!_style) {
						_style = obj._styles[pseudo] = obj.on_create_custom_style();
					}
				}

				if (_style) {
					if (propids.length > 2) {
						var is_avail = true;
						var curobj = _style;
						for (var i = 0; i < propids.length - 1; i++) {
							curobj = curobj[propids[i + 1]];
							if (!curobj) {
								is_avail = false;
								break;
							}
						}

						if (!is_avail || !curobj) {
							var parent_propids = propids.slice(0);
							parent_propids.length = parent_propids.length - 1;
							parent_propids[0] = "currentstyle";
							var parent_attr = parent_propids.join(".");

							var current_pseudo = obj._pseudo;
							if (pseudo) {
								obj.setCurrentPseudo(pseudo);
							}
							var current_value = eval("obj." + parent_attr);
							if (pseudo && current_pseudo) {
								obj.setCurrentPseudo(current_pseudo);
							}

							parent_propids[0] = "style";
							this.setProperty(compid, parent_propids.join("."), current_value._value, pseudo);
						}
					}

					propids[0] = "set";
					var setter = propids.join("_");

					if (_style[setter]) {
						_style[setter](propval);
					}

					this._on_update_property(obj, propid);

					return;
				}
			}

			if (propid == "id") {
				propid == "name";
			}

			if (obj["set_" + propid]) {
				obj["set_" + propid](propval);
			}

			this._on_update_property(obj, propid);
			return obj[propid];
		}
	};

	_pDesignForm.appendInlineStyleValue = function (base_value, append_value) {
		var style_value = null;
		if (append_value == null) {
			style_value = base_value;
		}
		else if (base_value == null) {
			style_value = append_value;
		}
		else {
			style_value = this._appendInlineStyleValue(base_value, append_value);
		}

		return style_value;
	};

	_pDesignForm.setLayoutStyle = function (compid, base_value, append_value) {
		var style_value = this.appendInlineStyleValue(base_value, append_value);

		this.setProperty(compid, "style", style_value);
	};

	_pDesignForm.getProperty = function (compid, propid, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			var propids = propid.split(".");
			if (propids.length == 1 && propid == "style") {
				return this._getInlineStyleValue(obj);
			}
			else if (propids.length > 1 && propids[0] == "style") {
				var curobj;
				if (!pseudo) {
					curobj = obj.style;
				}
				else if (obj._styles[pseudo]) {
					curobj = obj._styles[pseudo];
				}

				for (var i = 0; i < propids.length - 1; i++) {
					curobj = curobj[propids[i + 1]];
					if (!curobj) {
						return;
					}
				}

				return curobj._value ? curobj._value : curobj;
			}

			return obj[propid];
		}
	};

	_pDesignForm.getCurrentStyleValue = function (compid, propid, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			var propids = propid.split(".");
			if (propids.length <= 1) {
				return;
			}
			if (propids[0] != "style") {
				return;
			}
			if (!pseudo) {
				pseudo = "normal";
			}


			var cur_pseudo = obj._pseudo;
			obj.setCurrentPseudo(pseudo);

			propids[0] = "currentstyle";
			var attrstr = propids.join(".");
			var style_obj = eval("obj." + attrstr);

			obj.setCurrentPseudo(cur_pseudo);

			if (style_obj) {
				return style_obj._value ? style_obj._value : style_obj;
			}
		}
	};

	_pDesignForm.moveComponentByRect = function (compid, left, top, width, height) {
		var obj = this._getChild(compid);
		if (obj) {
			var _left = obj.left;
			var _top = obj.top;
			var _width = obj.width;
			var _height = obj.height;
			var _right = obj.right;
			var _bottom = obj.bottom;
			obj.move(left, top, width, height, null, null);
			var parent = obj.parent;
			var val;

			function _restorePositionValueUnit (pos) {
				var _w_or_h;
				if (pos == "left" || pos == "width" || pos == "right") {
					_w_or_h = "width";
				}
				else {
					_w_or_h = "height";
				}

				var adjust_pos;
				if (pos == "right") {
					adjust_pos = obj._adjust_width + obj._adjust_left;
				}
				else if (pos == "bottom") {
					adjust_pos = obj._adjust_height + obj._adjust_top;
				}
				else {
					adjust_pos = eval("obj._adjust_" + pos);
				}

				eval("if (undefined === _" + pos + " || null === _" + pos + ") {\n"
					 + "   obj.set_" + pos + "(null);\n"
					 + "} else {\n"
					 + "   val = _" + pos + ";\n"
					 + "   if (typeof(val) == 'string' && val.indexOf('%') >= 0) {\n"
					 + "      val = ((adjust_pos * 100) / parent._client_" + _w_or_h + ");\n"
					 + "      if (pos == 'right' || pos == 'bottom') {\n"
					 + "         val = 100.0 - val;\n"
					 + "      }\n"
					 + "      val = nexacro.round(val, 2);\n"
					 + "      obj.set_" + pos + "(val + '%');\n"
					 + "   }\n"
					 + "}"
				);
			}

			if (obj.positionstep > 0) {
				obj._adjust_left -= (obj.parent._adjust_width * obj.positionstep);
			}

			_restorePositionValueUnit("left");
			_restorePositionValueUnit("top");
			_restorePositionValueUnit("width");
			_restorePositionValueUnit("height");
			_restorePositionValueUnit("right");
			_restorePositionValueUnit("bottom");

			if (obj.positionstep > 0) {
				obj._adjust_left += (obj.parent._adjust_width * obj.positionstep);
			}

			obj._adjustPosition(obj.left, obj.top, obj.right, obj.bottom, obj.width, obj.height, obj.parent._client_width, obj.parent._client_height
			);
		}
	};

	_pDesignForm.swapPositionUnit = function (compid, pos) {
		var obj = this._getObject(compid);
		if (obj) {
			this._swapPositionUnit(obj, pos);
		}
	};

	_pDesignForm.moveComponent = function (compid, left, top, width, height, right, bottom) {
		var obj = this._getChild(compid);
		if (obj) {
			return obj.move(left, top, width, height, right, bottom);
		}
	};

	_pDesignForm.resizeComponent = function (compid, width, height) {
		var obj = this._getObject(compid);
		if (obj) {
			return obj.resize(width, height);
		}
	};

	_pDesignForm.hitTestByPoint = function (x, y, rootcompid) {
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = 0;
			var stepwidt = 0;
			var mlm = application.getLayoutManager();
			var layout = mlm.getCurrentLayout(rootobj);
			if (layout) {
				stepcount = layout.stepcount ? layout.stepcount : 0;

				stepwidth = rootobj._adjust_width;
				var scale = this.getZoom() / 100;
				stepwidth *= scale;
				stepwidth = parseInt(stepwidth);
			}

			var comps = this._getChilds(rootobj);
			var comp_len = comps ? comps.length : 0;

			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				var _x = x;
				var _y = y;
				var hit = this._hitTestByPoint(comp, _x, _y);
				if (hit == false) {
					var positionstep = comp.positionstep ? comp.positionstep : 0;
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_x -= stepwidth;
							hit = this._hitTestByPoint(comp, _x, _y);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					var url = comp.url;
					if (url) {
						return this._getScopeName(comp);
					}

					var childs = this._getChilds(comp);
					var child_len = childs ? childs.length : 0;
					if (child_len > 0) {
						return this.hitTestByPoint(_x, _y, this._getScopeName(comp));
					}
					else {
						return this._getScopeName(comp);
					}
				}
			}
		}

		return rootcompid;
	};
	_pDesignForm.hitTestByRect = function (left, top, width, height, rootcompid, type) {
		var hitcomplist = "";
		var rootobj = this._getObject(rootcompid);
		if (rootobj) {
			var stepcount = 0;
			var stepwidt = 0;
			var mlm = application.getLayoutManager();
			var layout = mlm.getCurrentLayout(rootobj);
			if (layout) {
				stepcount = layout.stepcount ? layout.stepcount : 0;

				stepwidth = rootobj._adjust_width;
				var scale = this.getZoom() / 100;
				stepwidth *= scale;
				stepwidth = parseInt(stepwidth);
			}

			var hitcomps = [];

			var comps = this._getChilds(rootobj);
			var comp_len = comps.length;
			for (var i = comp_len - 1; i >= 0; i--) {
				var comp = comps[i];
				if (!comp) {
					continue;
				}

				var _left = left;
				var _top = top;
				var _width = width;
				var _height = height;

				var positionstep = comp.positionstep ? comp.positionstep : 0;

				var hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, type);
				if (hit == false) {
					if (positionstep < 0) {
						for (var j = 1; j < stepcount; j++) {
							_left -= stepwidth;
							hit = this._hitTestByRect(comp, _left, _top, _left + _width, _top + _height, type);
							if (hit) {
								break;
							}
						}
					}
				}

				if (hit) {
					hitcomps.push(this._getScopeName(comp));
				}

				var url = comp.url;
				if (url) {
					continue;
				}

				var childs = this._getChilds(comp);
				var child_len = childs ? childs.length : 0;
				if (child_len > 0) {
					var childlist = this.hitTestByRect(left, top, width, height, this._getScopeName(comp), type);
					if (childlist && childlist.length > 0) {
						if (hitcomplist.length > 0) {
							hitcomplist += ",";
						}
						hitcomplist += childlist;
					}
					if (positionstep < 0) {
						_left = left;
						for (var j = 1; j < stepcount; j++) {
							_left -= stepwidth;
							childlist = this.hitTestByRect(_left, top, width, height, this._getScopeName(comp), type);
							if (childlist && childlist.length > 0) {
								if (hitcomplist.length > 0) {
									hitcomplist += ",";
								}
								hitcomplist += childlist;
							}
						}
					}
				}
			}

			if (hitcomps.length > 0) {
				if (hitcomplist.length > 0) {
					hitcomplist += ",";
				}
				hitcomplist += hitcomps.join(",");
			}
		}



		return hitcomplist;
	};


	_pDesignForm.hitTestTracker = function (x, y, rootcompid, compid) {
		var obj = this._getObject(compid);
		if (obj) {
			var hit = false;
			var rect = this._getClientRect(obj);
			if (rect[0] - 7 <= x && x <= rect[0] + rect[2] + 7 && 
				rect[1] - 7 <= y && y <= rect[1] + rect[3] + 7) {
				hit = true;
			}

			if (!hit) {
				var rootobj = this._getObject(rootcompid);
				if (!rootobj) {
					return;
				}

				var mlm = application.getLayoutManager();
				var layout = mlm.getCurrentLayout(rootobj);
				if (!layout) {
					return;
				}

				var stepcount = layout.stepcount ? layout.stepcount : 0;
				if (stepcount < 2) {
					return;
				}

				var stepwidth = rootobj._adjust_width;
				var scale = this.getZoom() / 100;
				stepwidth *= scale;
				stepwidth = parseInt(stepwidth);

				var check_obj = obj;
				while (check_obj && check_obj.parent && rootobj != check_obj.parent) {
					check_obj = check_obj.parent;
				}


				if (!check_obj) {
					return;
				}

				var positionstep = check_obj.positionstep ? check_obj.positionstep : 0;
				if (positionstep >= 0) {
					return;
				}

				if (positionstep < 0) {
					for (var j = 1; j < stepcount; j++) {
						rect[0] += stepwidth;
						if (rect[0] - 7 <= x && x <= rect[0] + rect[2] + 7 && 
							rect[1] - 7 <= y && y <= rect[1] + rect[3] + 7) {
							hit = true;
							break;
						}
					}
				}
			}

			if (hit) {
				return rect;
			}
		}

		return -1;
	};

	_pDesignForm.setScroll = function (is_horz, size) {
		if (is_horz) {
			this._scroll_left = size;
		}
		else {
			this._scroll_top = size;
		}

		this._recalcDesignLayout();
	};

	_pDesignForm.getComponentRect = function (compid, isroot) {
		var obj = this._getObject(compid);
		if (obj == this._inner_form) {
			var _adjust_left = 0;
			var _adjust_top = 0;
			var _adjust_width = this._inner_form_width;
			var _adjust_height = this._inner_form_height;

			return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
		}
		else if (isroot) {
			var _adjust_left = obj._adjust_left;
			var _adjust_top = obj._adjust_top;
			var _adjust_width = obj._adjust_width;
			var _adjust_height = obj._adjust_height;

			var sublayoutmode_info = this._findSubLayoutMode(obj);
			if (sublayoutmode_info) {
				_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
				_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
			}

			var parent = obj.parent;
			while (parent && parent != this._inner_form) {
				_adjust_left += parent._adjust_left;
				_adjust_top += parent._adjust_top;

				{

					var border = parent.on_find_CurrentStyle_border(parent._pseudo);
					var borderWidth = (border ? border._getBorderLeftWidth() : 0);
					_adjust_left += borderWidth;
					_adjust_top += borderWidth;
				}

				if (parent instanceof nexacro.Div) {
					sublayoutmode_info = this._findSubLayoutMode(parent);
					if (sublayoutmode_info) {
						_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
						_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
					}
				}

				parent = parent.parent;
			}

			return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
		}
		else {
			return [obj._adjust_left, obj._adjust_top, obj._adjust_width, obj._adjust_height];
		}
	};

	_pDesignForm.getClientRect = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			return this._getClientRect(obj);
		}
	};

	_pDesignForm._get_real_dot_size = function (measure, size, v) {
		if (measure == 0) {
			return size;
		}

		var form = this._inner_form;
		var formsize = eval("form._adjust_" + v);

		size = parseInt(formsize * size / 100);

		return size;
	};

	_pDesignForm.setDotSize = function (measure, size) {
		var x = this._get_real_dot_size(measure, size, "width");
		var y = this._get_real_dot_size(measure, size, "height");

		var control_element = this._active_editing_form._control_element;
		if (control_element && control_element._handle) {
			nexacro.__setElementHandleDotSize(control_element._handle, x, y);
		}

		if (control_element && control_element._step_container_elements && control_element._step_container_elements.length > 0) {
			var step_container_elems = control_element._step_container_elements;
			for (var i = 0; i < step_container_elems.length; i++) {
				var elem = step_container_elems[i];
				if (elem && elem._handle) {
					nexacro.__setElementHandleDotSize(elem._handle, x, y);
				}
			}
		}

		this._dot_size_x = x;
		this._dot_size_y = y;
	};

	_pDesignForm.setDotStyle = function (dot_style) {
		var control_element = this._active_editing_form._control_element;
		if (control_element && control_element._handle) {
			nexacro.__setElementHandleDotStyle(control_element._handle, dot_style);
		}

		if (control_element && control_element._step_container_elements && control_element._step_container_elements.length > 0) {
			var step_container_elems = control_element._step_container_elements;
			for (var i = 0; i < step_container_elems.length; i++) {
				var elem = step_container_elems[i];
				if (elem && elem._handle) {
					nexacro.__setElementHandleDotStyle(elem._handle, dot_style);
				}
			}
		}

		this._dot_style = dot_style;
	};

	_pDesignForm.setDotVisible = function (visible) {
		var control_element = this._active_editing_form._control_element;
		if (control_element && control_element._handle) {
			nexacro.__setElementHandleDotVisible(control_element._handle, visible);
		}

		if (control_element && control_element._step_container_elements && control_element._step_container_elements.length > 0) {
			var step_container_elems = control_element._step_container_elements;
			for (var i = 0; i < step_container_elems.length; i++) {
				var elem = step_container_elems[i];
				if (elem && elem._handle) {
					nexacro.__setElementHandleDotVisible(elem._handle, visible);
				}
			}
		}

		this._dot_visible = visible;
	};

	_pDesignForm.getFormBitmap = function () {
		var control_element = this._control_element;
		if (control_element && control_element._handle) {
			return nexacro.__getWindowBitmap(control_element._handle);
		}
	};

	_pDesignForm.setBitmapSize = function (width, height) {
		var cf = this.parent;
		if (!cf) {
			return;
		}
		var win = cf._window;
		if (!win || !win._handle) {
			return;
		}
		cf.move(0, 0, nexacro._getWindowHandleClientWidth(win._handle), nexacro._getWindowHandleClientHeight(win._handle));
	};
	_pDesignForm.setFormSize = function (width, height) {
		this._inner_form_width = width;
		this._inner_form_height = height;

		var form = this._inner_form;
		if (form) {
			form.resize(this._inner_form_width, this._inner_form_height);
		}
	};

	_pDesignForm.DrawOffset = function (offsetx, offsety) {
		var control_element = this._control_element;
		if (control_element && control_element._handle) {
			nexacro.__setElementHandleOffset(control_element._handle, offsetx, offsety);
		}
	};

	_pDesignForm.setRoot = function (left, top) {
		this._root_left = left;
		this._root_top = top;

		this._recalcDesignLayout();
	};

	_pDesignForm.setDesignZoom = function (scale) {
		var control_elem = this._control_element;
		if (control_elem) {
			control_elem.setZoom(scale);

			this._recalcDesignLayout(true, false);
		}

		var _stack = this._sublayoutmode_stack;
		if (_stack.length > 0) {
			for (var i = 0; i < _stack.length; i++) {
				var pt_offset = [0, 0];
				var owner_elem = _stack[i].owner_elem;
				var temp = owner_elem;
				while (temp && temp != this) {
					pt_offset[0] += temp.left;
					pt_offset[1] += temp.top;
					temp = temp._owner_elem;
				}
				;
				_stack[i].offset_pos = pt_offset;

				var overlay_elem = _stack[i].overlay_elem;
				var overlay_container_elem = overlay_elem.getContainerElement();
				nexacro.__setElementHandleScale(overlay_container_elem._handle, scale);
			}

			this._recalcDesignLayout(false, true);
		}
	};

	_pDesignForm.getBorderWidth = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return 0;
		}

		var border = obj.on_find_CurrentStyle_border(obj._pseudo);
		var left = (border ? border._getBorderLeftWidth() : 0);
		return left;
	};

	_pDesignForm.setName = function (compid, propval) {
		var obj = this._getChild(compid);
		if (obj) {
			obj.set_id(propval);
			this._changeChildID(obj.name, propval, obj);
			obj.name = propval;
			return propval;
		}
	};

	_pDesignForm.setOverflowClip = function (overflowclip) {
		if (!this._inner_form) {
			return;
		}

		var control_element = this._inner_form._control_element;
		if (control_element && control_element._handle) {
			nexacro.__setElementHandleOverflowClip(control_element._handle, overflowclip);
		}

		this._overflowclip = overflowclip;
	};

	_pDesignForm.showSubLayout = function (compid, bShow) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Div)) {
			return;
		}

		if (bShow) {
			if (this._findSubLayoutMode(obj)) {
				return;
			}

			var overlay_elem = new nexacro.SubLayoutOverlayElement(this._control_element);
			overlay_elem.setLinkedControl(this);
			overlay_elem.create(nexacro._design_sublayout_overlaycolor);

			var overlay_container_elem = overlay_elem.getContainerElement();
			nexacro.__setElementHandleScale(overlay_container_elem._handle, this.getZoom());

			var pt_offset = [0, 0];
			var div_elem = obj._control_element;
			var owner_elem = div_elem._owner_elem;
			var temp = owner_elem;
			while (temp && temp != this._control_element) {
				pt_offset[0] += temp.left;
				pt_offset[1] += temp.top;

				var linkedcontrol = temp.linkedcontrol;
				if (linkedcontrol) {
					var border = linkedcontrol.on_find_CurrentStyle_border(linkedcontrol._pseudo);
					pt_offset[0] += (border ? border._getBorderLeftWidth() : 0);
					pt_offset[1] += (border ? border._getBorderTopWidth() : 0);
				}

				temp = temp._owner_elem;
			}
			;

			var sublayoutmode_info = {
				comp : obj, 
				elem : div_elem, 
				owner_elem : owner_elem, 
				overlay_elem : overlay_elem, 
				elem_pos : [div_elem.left, div_elem.top], 
				offset_pos : [pt_offset[0], pt_offset[1]]
			};

			obj._sublayoutmode_info = sublayoutmode_info;
			div_elem._removeFromContainer();
			div_elem._appendToContainer(overlay_container_elem);

			if (this._dot_visible) {
				this._showDotGrid(obj, true);
			}

			var design_form = this;

			if (obj.vscrollbar) {
				obj.vscrollbar.destroy();
				obj.vscrollbar = null;
			}
			if (obj.hscrollbar) {
				obj.hscrollbar.destroy();
				obj.hscrollbar = null;
			}
			obj._control_element._vscroll_control = null;
			obj._control_element._hscroll_control = null;
			obj._onResetScrollBar = nexacro._emptyFn;

			obj._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
				var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);

				nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);
				var bRtl = this._isRtl(this.parent);
				if (this._width != null || (this._right != null && this._left != null)) {
					this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
				}

				if (this._height != null || this._bottom != null) {
					this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;
				}

				var scale = design_form.getZoom();
				var sublayoutmode_info = this._sublayoutmode_info;
				if (this._left != null || this._right != null) {
					this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;

					var offset_left = (sublayoutmode_info.offset_pos[0] - design_form._scroll_left) + step_logical_offset;
					this._adjust_left_ltr = this._adjust_left = (this._adjust_left + offset_left);

					if (bRtl) {
						this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
					}
				}

				if (this.top != null || this._bottom != null) {
					this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;

					var offset_top = (sublayoutmode_info.offset_pos[1] - design_form._scroll_top);
					this._adjust_top = (this._adjust_top + offset_top);
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

			obj.move(obj.left, obj.top, obj.width, obj.height, obj.right, obj.bottom);
			obj.on_update_position(false, true);

			if (this._active_editing_form) {
				this._showDotGrid(this._active_editing_form, false);
			}

			this._sublayoutmode_stack.push(sublayoutmode_info);
			this._active_editing_form = obj;

			nexacro.__setElementHandleOverflowClip(div_elem._handle, true);
		}
		else {
			var _stack = this._sublayoutmode_stack;
			var sublayoutmode_info;
			for (var i = 0; i < _stack.length; i++) {
				if (_stack[i].comp == obj) {
					sublayoutmode_info = _stack[i];
					break;
				}
			}

			if (sublayoutmode_info) {
				var overlay_elem = sublayoutmode_info.overlay_elem;
				var owner_elem = sublayoutmode_info.owner_elem;
				var elem_pos = sublayoutmode_info.elem_pos;
				var div_elem = sublayoutmode_info.elem;
				var obj = sublayoutmode_info.comp;

				div_elem._removeFromContainer();
				div_elem._appendToContainer(owner_elem);

				nexacro.__setElementHandlePosition(div_elem._handle, elem_pos[0], elem_pos[1]);
				nexacro.__setElementHandleOverflowClip(div_elem._handle, false);

				this._showDotGrid(obj, false);

				overlay_elem._removeFromContainer();
				overlay_elem.destroy();

				_stack.length = _stack.length - 1;

				if (_stack.length > 0) {
					this._active_editing_form = _stack[_stack.length - 1].comp;
				}
				else {
					this._active_editing_form = this._inner_form;
				}

				if (this._active_editing_form) {
					this._showDotGrid(this._active_editing_form, this._dot_visible);
				}

				obj._adjustPosition = nexacro.Component.prototype._adjustPosition;

				obj.move(obj.left, obj.top, obj.width, obj.height, obj.right, obj.bottom);
				obj.on_update_position(false, true);

				obj._onResetScrollBar = nexacro.Component.prototype._onResetScrollBar;

				var scrollbars = obj.scrollbars;
				obj.set_scrollbars("none");
				obj.set_scrollbars(scrollbars);
			}
		}
	};

	_pDesignForm.moveComponentToFront = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.bringToFront();
		}
	};

	_pDesignForm.moveComponentToPrev = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.bringToPrev();
		}
	};

	_pDesignForm.moveComponentToNext = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.sendToNext();
		}
	};

	_pDesignForm.moveComponentToBack = function (compid) {
		var obj = this._getObject(compid);
		if (obj) {
			obj.sendToBack();
		}
	};

	_pDesignForm.getPseudo = function (compid) {
		var obj = this._getChild(compid);
		if (obj) {
			return obj._pseudo;
		}
	};

	_pDesignForm.setPseudo = function (compid, pseudo) {
		var obj = this._getObject(compid);
		if (obj) {
			obj._stat_change(pseudo == "disabled" ? "disable" : "enable", pseudo);

			if (obj._pseudo == pseudo) {
				return true;
			}
		}
	};

	_pDesignForm.addLayout = function (compid, layoutname, width, height, screenid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		var layout = new Layout(layoutname, screenid, width, height, obj, function (p) {
		});
		obj.addLayout(layout.name, layout);
	};

	_pDesignForm.removeLayout = function (compid, layoutname) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		if (obj._current_layout_name == layoutname) {
			obj._current_layout_name = "";
		}

		if (layoutname == "default") {
		}
		else {
			delete obj._layout_list[layoutname];
		}
	};

	_pDesignForm.removeAllLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		if (obj._current_layout_name == layoutname) {
			obj._current_layout_name = "";
		}


		obj._layout_list.clear();
	};

	_pDesignForm.setLayoutProperty = function (compid, layoutname, propid, propval) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		var layout = this._getLayout(obj, layoutname);
		if (!layout) {
			return;
		}

		if (propid == "name" && layoutname == "default") {
			return;
		}

		if (layout["set_" + propid]) {
			layout["set_" + propid](propval);
		}

		if (propid == "stepcount") {
			this._refreshStepContainer(obj, layout.stepcount);
		}

		if (propid == "name" && layoutname != "default") {
			var idx = obj._layout_list.indexOf(layoutname);
			obj._layout_list.update_id(idx, propval);
		}

		return layout[propid];
	};

	_pDesignForm.getLayoutProperty = function (compid, layoutname, propid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		var layout = this._getLayout(obj, layoutname);
		if (!layout) {
			return;
		}

		return layout[propid];
	};

	_pDesignForm.changeLayout = function (compid, layoutname) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		var layout = this._getLayout(layoutname);
		if (!layout) {
			return;
		}

		var layout_manager = application.getLayoutManager();
		layout_manager.changeLayout(obj, layout);
	};

	_pDesignForm.getCurrentLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		return obj._current_layout_name;
	};

	_pDesignForm.setAutoLayoutChange = function (compid, is_auto) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (!(obj instanceof nexacro.Form)) {
			return;
		}

		obj._auto_layoutchange = is_auto;

		if (is_auto) {
			obj._checkValidLayout = nexacro.FormBase.prototype._checkValidLayout;
		}
		else {
			obj._checkValidLayout = function () {
				return obj._current_layout_name;
			};
		}
	};

	_pDesignForm.refreshLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}
	};

	_pDesignForm.recalcLayout = function (compid) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj.resetScroll) {
			obj.resetScroll();
		}
	};

	_pDesignForm.setContents = function (compid, contents) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		obj._setContents(contents);
	};

	_pDesignForm.setFormats = function (compid, contents) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		obj.set_formats(contents);
	};

	_pDesignForm.setInnerDataset = function (compid, contents) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		var innerdatasetid = obj.id + "_innerdataset";
		var innerdataset = new Dataset(innerdatasetid, obj);
		innerdataset._setContents(contents);

		obj.set_innerdataset(innerdataset);
	};

	_pDesignForm.setActiveTabPage = function (compid, index) {
		var obj = this._getObject(compid);
		if (!obj) {
			return;
		}

		if (obj instanceof nexacro.Tab) {
			obj.set_tabindex(index);
		}
	};

	_pDesignForm.refreshTheme = function (is_clear) {
		var form;
		form = this;
		form._clearCssInfo(!is_clear);
		form._apply_formstyle(form);

		form = form._inner_form;
		this._refreshTheme(form, is_clear);
	};

	_pDesignForm.insertCSS = function (url) {
		var form = this._inner_form;

		var cssurls = form._cssurls;
		var idx = cssurls ? cssurls.indexOf(url) : -1;

		this._loadCss(url, true, (idx >= 0 ? false : true));
	};

	_pDesignForm.removeCSS = function (url) {
		var form = this._inner_form;

		var cssurls = form._cssurls;
		if (!cssurls) {
			cssurls = form._cssurls = [];
		}
		var idx = cssurls.indexOf(url);
		if (idx >= 0) {
			cssurls.splice(idx, 1);
		}
		else {
			return;
		}

		form._clearCssInfo(false);

		for (var i = 0; i < cssurls.length; i++) {
			this._loadCss(cssurls[i], false, false);
		}

		this._refreshTheme(form, false);
	};

	_pDesignForm.updateCSS = function (url) {
		nexacro._design_css_cache.delete_item(url);

		var form = this._inner_form;
		var cssurls = form._cssurls;
		if (!cssurls) {
			cssurls = form._cssurls = [];
		}

		form._clearCssInfo(false);

		for (var i = 0; i < cssurls.length; i++) {
			this._loadCss(cssurls[i], false, false);
		}

		this._refreshTheme(form, false);
	};


	_pDesignForm._on_update_property = function (obj, propid) {
		if (!obj || !propid) {
			return;
		}

		switch (propid) {
			case "name":
				if (obj == this._inner_form) {
					obj.id = obj.name;
				}
				break;
			case "positionstep":
				var parent = obj.parent;
				if (parent) {
					var parent_elem = parent._control_element;
					if (parent_elem && parent_elem._step_container_elements && parent_elem._step_container_elements.length > 0) {
						var elem = obj._control_element;
						var elem_handle = elem ? elem._handle : null;

						if (obj.positionstep == -1) {
							nexacro.__setElementHandleFixedStepNode(elem_handle, true);
							nexacro.__setElementHandleStepCount(elem_handle, parent_elem._step_container_elements.length + 1);
							nexacro.__setElementHandleStepWidth(elem_handle, parent._adjust_width);
						}
						else {
							nexacro.__setElementHandleFixedStepNode(elem_handle, false);
						}
					}
					else {
						var elem = obj._control_element;
						var elem_handle = elem ? elem._handle : null;

						nexacro.__setElementHandleFixedStepNode(elem_handle, false);
					}

					obj._adjustPosition(obj.left, obj.top, obj.right, obj.bottom, obj.width, obj.height, parent._adjust_width, parent._adjust_height);
					obj.on_update_position(false, true);
				}
				return;
				break;
		}

		if (obj._control_element && obj._control_element._step_container_elements && obj._control_element._step_container_elements.length > 0) {
			if (propid == "style") {
				this._updateStepContainerStyle(obj._control_element, 0xffffffff);
			}
			else {
				var propids = propid.split(".");
				if (propids.length > 1 && propids[0] == "style") {
					switch (propids[1]) {
						case "border":
						case "bordertype":
							this._updateStepContainerStyle(obj._control_element, 0x01);
							break;
						case "background":
						case "gradation":
							this._updateStepContainerStyle(obj._control_element, 0x02);
							break;
						case "color":
							this._updateStepContainerStyle(obj._control_element, 0x04);
							break;
						case "opacity":
							this._updateStepContainerStyle(obj._control_element, 0x08);
							break;
					}
				}
			}
		}
	};

	_pDesignForm._hitTestByPoint = function (obj, x, y) {
		if (obj) {
			var control_elem = obj._control_element;
			if (control_elem) {
				var elem = control_elem;
				while (elem) {
					if (elem._design_visible === false) {
						return false;
					}
					elem = elem._parent_elem;
				}
			}

			var rect = this._getClientRect(obj);
			if (rect[0] <= x && x <= rect[0] + rect[2] && 
				rect[1] <= y && y <= rect[1] + rect[3]) {
				return true;
			}
		}

		return false;
	};

	_pDesignForm._hitTestByRect = function (obj, left, top, right, bottom, type) {
		if (obj) {
			var control_elem = obj._control_element;
			if (control_elem) {
				var elem = control_elem;
				while (elem) {
					if (elem._design_visible === false) {
						return false;
					}
					elem = elem._parent_elem;
				}
			}

			var rect = this._getClientRect(obj);
			var _left = rect[0];
			var _right = rect[0] + rect[2];
			var _top = rect[1];
			var _bottom = rect[1] + rect[3];
			if (type == 0) {
				if (left <= _left && _right <= right && 
					top <= _top && _bottom <= bottom) {
					return true;
				}
			}
			else {
				if (left > _right) {
					return false;
				}

				if (top > _bottom) {
					return false;
				}

				if (right < _right) {
					return false;
				}

				if (bottom < _bottom) {
					return false;
				}

				return true;
			}
		}

		return false;
	};

	_pDesignForm._getClientRect = function (obj) {
		var _adjust_left = obj._adjust_left;
		var _adjust_top = obj._adjust_top;
		var _adjust_width = obj._adjust_width;
		var _adjust_height = obj._adjust_height;

		var sublayoutmode_info = this._findSubLayoutMode(obj);
		if (sublayoutmode_info) {
			_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
			_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
		}

		var parent = obj.parent;
		while (parent && parent != this) {
			_adjust_left += parent._adjust_left;
			_adjust_top += parent._adjust_top;

			{

				var border = parent.on_find_CurrentStyle_border(parent._pseudo);
				var borderWidth = (border ? border._getBorderLeftWidth() : 0);
				_adjust_left += borderWidth;
				_adjust_top += borderWidth;
			}

			if (parent instanceof nexacro.Div) {
				sublayoutmode_info = this._findSubLayoutMode(parent);
				if (sublayoutmode_info) {
					_adjust_left = _adjust_left + this._scroll_left - sublayoutmode_info.offset_pos[0];
					_adjust_top = _adjust_top + this._scroll_top - sublayoutmode_info.offset_pos[1];
				}
			}

			parent = parent.parent;
		}

		var scale = this.getZoom() / 100;

		_adjust_left *= scale;
		_adjust_top *= scale;
		_adjust_width *= scale;
		_adjust_height *= scale;

		_adjust_left = parseInt(_adjust_left);
		_adjust_top = parseInt(_adjust_top);
		_adjust_width = parseInt(_adjust_width);
		_adjust_height = parseInt(_adjust_height);

		return [_adjust_left, _adjust_top, _adjust_width, _adjust_height];
	};

	_pDesignForm._recalcDesignLayout = function (recalc_innerform, recalc_sublayout) {
		var form = this._inner_form;
		if (recalc_innerform !== false && form) {
			form.move(0, 0);
			form.on_update_position(false, true);
		}

		var _stack = this._sublayoutmode_stack;
		if (recalc_sublayout !== false && _stack.length > 0) {
			for (var i = 0; i < _stack.length; i++) {
				var comp = _stack[i].comp;
				comp.move(comp.left, comp.top, comp.width, comp.height, comp.right, comp.bottom);
				comp.on_update_position(false, true);
			}
		}

		this._recalcStepContainer(form);
	};

	_pDesignForm._getNextChildID = function (parent, classname) {
		if (!parent || !classname) {
			trace("parent or classname is missing");
			return "error";
		}

		var nextnum = 0;
		var nextid;
		while (true) {
			nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
			if (!parent[nextid]) {
				break;
			}
			nextnum++;
		}

		return nextid;
	};

	_pDesignForm._changeChildID = function (oldid, newid, obj) {
		var idx = this.all.indexOf(oldid);
		if (idx < 0) {
			return;
		}
		this.all.update_id(idx, newid);

		idx = this.components.indexOf(oldid);
		if (idx >= 0) {
			this.components.update_id(idx, newid);
		}

		idx = this.objects.indexOf(oldid);
		if (idx >= 0) {
			return;
		}
		{

			this.objects.update_id(idx, newid);
		}

		idx = this.binds.indexOf(oldid);
		if (idx >= 0) {
			return;
		}
		{

			this.binds.update_id(idx, newid);
		}

		delete this[oldid];
		this[newid] = obj;
	};

	_pDesignForm._getNextChildTaborder = function (parent) {
		if (!parent) {
			return -1;
		}

		var taborder = -1;
		var comps = this._getChilds(parent);
		var comp_len = comps.length;
		for (var i = 0; i < comp_len; i++) {
			var comp = comps[i];
			if (!comp) {
				continue;
			}
			if (comp._taborder >= taborder) {
				taborder = comp._taborder;
			}
		}

		return (taborder + 1);
	};

	_pDesignForm._getChilds = function (obj) {
		if (obj instanceof nexacro.Tab) {
			return obj.tabpages;
		}

		return obj.components;
	};

	_pDesignForm._getChild = function (childname) {
		return eval("this._inner_form." + childname);
	};

	_pDesignForm._getObject = function (name) {
		if (!name || name == "this") {
			return this._inner_form;
		}

		if (name.substring(0, 4) == "this.") {
			name = name.substring(5);
		}

		var obj = eval("this._inner_form." + name);



		return obj;
	};

	_pDesignForm._getInlineStyleValue = function (comp) {
		var str = "";

		var _style = comp.style;
		if (_style) {
			var _pStyle = nexacro.Style.prototype;
			for (prop in _style) {
				if (prop[0] == "_") {
					continue;
				}
				if (typeof (_style[prop]) == "function") {
					continue;
				}
				if (_style[prop] == null) {
					continue;
				}
				if (_pStyle[prop] == _style[prop]) {
					continue;
				}
				str += prop + ": " + _style[prop]._value + "; ";
			}
		}

		var pseudo_styles = comp._styles;
		if (pseudo_styles) {
			for (pseudo_style in pseudo_styles) {
				if (pseudo_style[0] == "_") {
					continue;
				}
				if (pseudo_style == "normal") {
					continue;
				}
				_style = pseudo_styles[pseudo_style];
				str += ":" + pseudo_style + " { ";
				for (prop in _style) {
					if (prop[0] == "_") {
						continue;
					}
					if (typeof (_style[prop]) == "function") {
						continue;
					}
					if (_style[prop] == null) {
						continue;
					}
					str += prop + ": " + _style[prop]._value + "; ";
				}
				str += " }; ";
			}
		}

		return str;
	};

	_pDesignForm._getScopeName = function (comp) {
		if (comp instanceof nexacro.DesignForm) {
			return;
		}

		var parent = comp.parent;
		var fullname = [];

		fullname.push(comp.id);
		while (parent && parent != this && parent != this._inner_form) {
			fullname.push(parent.id);
			parent = parent.parent;
		}

		fullname.reverse();
		return fullname.join(".");
	};

	_pDesignForm._findURlLoadedAncestor = function (comp) {
		if (!comp) {
			return null;
		}

		var found_comp = null;
		while (comp) {
			if (comp == this._inner_form) {
				break;
			}

			if (comp instanceof nexacro.Div && comp._url) {
				found_comp = comp;
			}
			comp = comp.parent;
		}

		return found_comp;
	};

	_pDesignForm._appendInlineStyleValue = function (base_value, append_value) {
		base_value = nexacro._decodeXml(base_value);
		append_value = nexacro._decodeXml(append_value);

		var base_styles = this._parseInlineStyleValue(base_value);
		var append_styles = this._parseInlineStyleValue(append_value);

		for (var pseudo in base_styles) {
			if (!append_styles[pseudo]) {
				continue;
			}

			var base_tokens = base_styles[pseudo].split(";");
			var append_tokens = append_styles[pseudo].split(";");

			var base_style = this._parseStyleToken(base_tokens);
			var append_style = this._parseStyleToken(append_tokens, base_style);

			var append_str = "";
			for (var prop in append_style) {
				append_str += prop + ":" + append_style[prop] + "; ";
			}

			base_styles[pseudo] = append_str;
		}

		for (var pseudo in append_styles) {
			if (base_styles[pseudo]) {
				continue;
			}

			base_styles[pseudo] = append_styles[pseudo];
		}

		var ret = "";
		for (var pseudo in base_styles) {
			if (pseudo == "normal") {
				ret += base_styles[pseudo];
			}
			else {
				ret += ":" + pseudo + "{ " + base_styles[pseudo] + "} ";
			}
		}

		return ret;
	};

	_pDesignForm._parseStyleToken = function (v, source_obj) {
		var ret = source_obj ? source_obj : {
		};
		for (var i = 0; i < v.length; i++) {
			var name_and_value = v[i].split(":");
			var name = name_and_value[0].trim();

			if (name == "" && name_and_value.length == 1) {
				continue;
			}

			var value = name_and_value[1].trim();
			ret[name] = value;
		}

		return ret;
	};

	_pDesignForm._parseInlineStyleValue = function (v) {
		var v = nexacro._decodeXml(v);
		var blocks = v.split("}");
		var s = blocks[0].trim();

		var _styles = {
		};
		blocks.pop();

		var i, len = blocks.length;
		var definition_block, pseudo, normal_style;

		definition_block = s.split("{");
		normal_style = definition_block[0].substring(0, definition_block[0].lastIndexOf(";") + 1).trim();

		if (normal_style.length == 0) {
			normal_style = definition_block[0].substring(0, definition_block[0].length).trim();
		}

		_styles["normal"] = normal_style;
		if (len > 0) {
			for (i = 0; i < len; i++) {
				definition_block = blocks[i].split("{");
				pseudo = definition_block[0].substring(definition_block[0].lastIndexOf(":") + 1).trim();
				_styles[pseudo] = definition_block[1];
			}
		}
		return _styles;
	};

	_pDesignForm._swapPositionUnit = function (obj, pos) {
		if (pos != "left" && pos != "top" && pos != "width" && pos != "height" && pos != "right" && pos != "bottom") {
			return;
		}

		var parent = obj.parent;
		if (!parent) {
			return;
		}

		var parent_size;
		if (pos == "left" || pos == "width" || pos == "right") {
			parent_size = parent._client_width;
		}
		else {
			parent_size = parent._client_height;
		}

		var adjust_pos;
		if (pos == "right") {
			adjust_pos = parent_size - (obj._adjust_width + obj._adjust_left);
		}
		else if (pos == "bottom") {
			adjust_pos = parent_size - (obj._adjust_height + obj._adjust_top);
		}
		else {
			adjust_pos = eval("obj._adjust_" + pos);
		}

		var cur_prop_val = eval("obj." + pos);
		if (typeof (cur_prop_val) == 'string' && cur_prop_val.indexOf('%') >= 0) {
			var new_prop_val = adjust_pos;
			eval("obj.set_" + pos + "(" + new_prop_val + ");");
		}
		else if (cur_prop_val != null) {
			var new_prop_val = nexacro.round((adjust_pos * 100) / parent_size, 2);
			eval("obj.set_" + pos + "(" + new_prop_val + " + '%');");
		}
	};

	_pDesignForm._findSubLayoutMode = function (obj) {
		if (obj instanceof nexacro.Div) {
			for (var i = 0; i < this._sublayoutmode_stack.length; i++) {
				if (obj == this._sublayoutmode_stack[i].comp) {
					return this._sublayoutmode_stack[i];
				}
			}
		}
	};

	_pDesignForm._getLayout = function (obj, layoutname) {
		if (!obj) {
			return;
		}

		if (!layoutname || layoutname == "" || layoutname == "default") {
			return obj._default_layout;
		}
		else {
			return obj._layout_list[layoutname];
		}
	};

	_pDesignForm._refreshStepContainer = function (obj, stepcount) {
		if (!obj) {
			return;
		}

		if (this._active_editing_form != obj) {
			return;
		}

		var control_elem = obj._control_element;
		if (!control_elem) {
			return;
		}

		if (!control_elem._step_container_elements) {
			control_elem._step_container_elements = [];
		}

		var list = control_elem._step_container_elements;
		var list_len = list.length;
		if (list_len + 1 < stepcount) {
			var parent_elem = control_elem._parent_elem;
			var width = obj._adjust_width;
			var height = obj._adjust_height;
			for (var i = list_len; i < stepcount - 1; i++) {
				var elem = new nexacro.ScrollableControlElement(parent_elem);
				elem.setLinkedControl(this);

				elem.setElementPosition(control_elem.left + ((i + 1) * width), control_elem.top);
				elem.setElementSize(width, height);

				elem.create();
				list.push(elem);


				parent_elem.sendToBackElement(elem);

				nexacro.__setElementHandleDotSize(elem._handle, this._dot_size_x, this._dot_size_y);
				nexacro.__setElementHandleDotStyle(elem._handle, this._dot_style);
				nexacro.__setElementHandleDotVisible(elem._handle, this._dot_visible);
			}
		}
		else if (list_len > stepcount - 1) {
			for (var i = list_len - 1; i >= stepcount - 1 && i >= 0; i--) {
				var elem = list[i];
				elem.destroy();
				list[i] = null;
				delete elem;
			}

			list.length = Math.max(0, stepcount - 1);
		}

		var comps = obj.components;
		var comps_len = comps ? comps.length : 0;
		for (var i = 0; i < comps_len; i++) {
			this._on_update_property(comps[i], "positionstep");
		}

		{

			var parent_elem = control_elem._parent_elem;
			for (var i = 0; i < stepcount - 1; i++) {
				var elem = list[i];
				parent_elem.sendToBackElement(elem);
			}
		}

		this._updateStepContainerStyle(control_elem, 0xffffffff);
	};

	_pDesignForm._recalcStepContainer = function (obj) {
		if (!obj) {
			return;
		}

		var control_elem = obj._control_element;
		var list = control_elem._step_container_elements;
		if (!list || list.length < 1) {
			return;
		}

		var parent_elem = control_elem._parent_elem;
		var width = obj._adjust_width;
		var height = obj._adjust_height;
		for (var i = 0; i < list.length; i++) {
			var elem = list[i];

			elem.setElementPosition(control_elem.left + ((i + 1) * width), control_elem.top);
			elem.setElementSize(width, height);
			parent_elem.sendToBackElement(elem);
		}

		var comps = this._getChilds(obj);
		var comps_len = comps ? comps.length : 0;
		for (var i = 0; i < comps_len; i++) {
			var comp = comps[i];
			if (comp.positionstep == -1) {
				var elem = comp._control_element;
				var elem_handle = elem ? elem._handle : null;
				if (elem_handle) {
					nexacro.__setElementHandleStepWidth(elem_handle, width);
				}
			}
		}
	};

	_pDesignForm._showDotGrid = function (obj, is_show) {
		if (!obj) {
			return;
		}

		var control_elem = obj._control_element;
		if (!control_elem) {
			return;
		}

		if (is_show) {
			nexacro.__setElementHandleDotSize(control_elem._handle, this._dot_size_x, this._dot_size_y);
			nexacro.__setElementHandleDotStyle(control_elem._handle, this._dot_style);
			nexacro.__setElementHandleDotVisible(control_elem._handle, this._dot_visible);

			var step_container_elems = control_elem._step_container_elements;
			if (step_container_elems && step_container_elems.length > 0) {
				for (var i = 0; i < step_container_elems.length; i++) {
					control_elem = step_container_elems[i];
					nexacro.__setElementHandleDotSize(control_elem._handle, this._dot_size_x, this._dot_size_y);
					nexacro.__setElementHandleDotStyle(control_elem._handle, this._dot_style);
					nexacro.__setElementHandleDotVisible(control_elem._handle, this._dot_visible);
				}
			}
		}
		else {
			nexacro.__setElementHandleDotVisible(control_elem._handle, false);

			var step_container_elems = control_elem._step_container_elements;
			if (step_container_elems && step_container_elems.length > 0) {
				for (var i = 0; i < step_container_elems.length; i++) {
					control_elem = step_container_elems[i];
					nexacro.__setElementHandleDotVisible(control_elem._handle, false);
				}
			}
		}
	};

	_pDesignForm._updateStepContainerStyle = function (control_elem, option) {
		if (!control_elem) {
			return;
		}

		var obj = control_elem.linkedcontrol;
		var list = control_elem._step_container_elements;
		for (var i = 0; i < list.length; i++) {
			var elem = list[i];
			if (option & 0x01) {
				var border = obj.on_find_CurrentStyle_border(obj._pseudo);
				var bordertype = obj.on_find_CurrentStyle_bordertype(obj._pseudo);
				elem.setElementBorder(border, bordertype);
			}
			if (option & 0x02) {
				var background = obj.on_find_CurrentStyle_background(obj._pseudo);
				var gradation = obj.on_find_CurrentStyle_gradation(obj._pseudo);
				elem.setElementBackground(background, gradation);
			}
			if (option & 0x04) {
				if (control_elem.color && !control_elem.color.isEmpty()) {
					elem.setElementColor(control_elem.color);
				}
			}
			if (option & 0x08) {
				var opacity = obj.on_find_CurrentStyle_opacity(obj._pseudo);
				if (opacity) {
					elem.setElementOpacity(opacity);
				}
			}
			if (option & 0x10) {
			}
			if (option & 0x20) {
			}
		}
	};

	_pDesignForm._getCompStepLogicalOffset = function (comp) {
		var parent = comp.parent;
		var step_logical_offset = 0;
		if (parent._is_form && !(parent instanceof nexacro.DesignForm)) {
			var mlm = application.getLayoutManager();
			var layout = mlm.getCurrentLayout(parent);
			if (layout && layout.stepcount > 1) {
				var positionstep = comp.positionstep;
				if (positionstep === undefined) {
					positionstep = 0;
				}

				if (positionstep !== undefined) {
					if (positionstep < 0) {
						positionstep = 0;
					}
					step_logical_offset = parent._adjust_width * positionstep;
				}
			}
		}

		return step_logical_offset;
	};

	_pDesignForm._refreshTheme = function (comp, is_clear) {
		if (comp._is_form) {
			comp._clearCssInfo(!is_clear);
		}

		comp.currentstyle._empty();
		comp._control_pseudo = "";
		comp._contents_pseudo = "";
		comp._css_finder = null;
		comp._ref_css_finder = null;
		comp.on_apply_pseudo("");

		var comps = comp.components;
		var len = comps ? comps.length : 0;
		for (var i = 0; i < len; i++) {
			var child = comps[i];
			this._refreshTheme(child, is_clear);
		}

		for (var p in comp) {
			if (typeof (comp[p]) == "object" && comp[p] instanceof nexacro.Component) {
				var control = comp[p];
				if (comp == control) {
					continue;
				}

				if (control.parent != comp) {
					continue;
				}

				if (control._is_subcontrol) {
					this._refreshTheme(control, is_clear);
				}
			}
		}

		if (comp == this._inner_form) {
			var win = this._getWindow();
			nexacro.__notifyToDesignWindow(win._handle, nexacro._design_notify_css_updated, this.id, this.id);
		}
	};


	_pDesignForm._loadCss = function (url, refresh_designform, add_to_cssurls) {
		var form = this._inner_form;

		var cssurl = application._getServiceLocation(url) + ".js";
		var service = application._getServiceObject(url);

		var _load_manager = form._load_manager;
		if (add_to_cssurls !== false) {
			if (!form._cssurls) {
				form._cssurls = [];
			}
			form._cssurls.push(url);
		}

		var load_item = _load_manager.getLocalItem(url);
		if (!load_item) {
			load_item = new nexacro.LoadItem(cssurl, "css", _load_manager.context);
			load_item._refresh_designform = refresh_designform;
			_load_manager.localList.push(load_item);

			var cur_cachelevel = service.cachelevel;
			service.cachelevel = "none";
			load_item._handle = nexacro._loadJSModule(cssurl, _load_manager, this._on_load_cssmodule, false, service, false);
			service.cachelevel = cur_cachelevel;
		}
	};

	_pDesignForm._on_load_cssmodule = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
		var _load_manager = this;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					module.call(_load_manager.context);

					if (load_Item._refresh_designform) {
						var ctx = _load_manager.context;
						ctx.parent.refreshTheme(false);
					}
				}
			}
			else {
				load_Item.errcode = errstatus;
				application._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri);
			}

			return;
		}
	};


	_pDesignForm.on_notify_init = function (obj, e) {
		if (!application.accessport) {
			return;
		}

		var accessport = application.accessport.getFormAccessPort(this._url);
		if (accessport) {
			this.accessport = accessport;
			accessport._setTarget(this);
		}

		this._createInnerForm();
	};

	_pDesignForm._createInnerForm = function () {
		var form = new nexacro.Form("_inner_form", "absolute", this._root_left, this._root_top, this._inner_form_width, this._inner_form_height, null, null, this);

		this.addChild(form.name, form);
		form.show();
		this._inner_form = form;
		this._active_editing_form = form;

		form.on_create_control_element = function (parent_elem) {
			if (!parent_elem) {
				return null;
			}

			var control_elem;
			if (this._is_scrollable) {
				control_elem = this.on_create_scrollable_control_element(parent_elem);
			}
			else {
				control_elem = this.on_create_normal_control_element(parent_elem);
			}

			return control_elem;
		};

		this.style.set_background(this._outer_background_value);
		this.style.set_border("none");

		form.set_scrollbars("none");


		form._design_form = this;

		form._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
			nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);
			var bRtl = this._isRtl(this.parent);

			if (this._width != null || (this._right != null && this._left != null)) {
				this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
			}

			if (this._height != null || this._bottom != null) {
				this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;
			}

			var design_form = this._design_form;
			var scale = design_form.getZoom();
			if (this._left != null || this._right != null) {
				this._adjust_left_ltr = this._adjust_left = this._left != null ? this._left : parentWidth - this._right - this._adjust_width;

				var temp = this._adjust_left_ltr;
				temp = design_form._root_left / (scale / 100) - design_form._scroll_left;
				this._adjust_left_ltr = this._adjust_left = temp;

				if (bRtl) {
					this._adjust_left_ltr = this._right != null ? this._right : parentWidth - this._left - this._adjust_width;
				}
			}

			if (this.top != null || this._bottom != null) {
				this._adjust_top = this._top != null ? this._top : parentHeight - this._bottom - this._adjust_height;

				var temp = this._adjust_top;
				temp = design_form._root_top / (scale / 100) - design_form._scroll_top;
				this._adjust_top = temp;
			}

			if (this.left && this.width && this.right) {
				this._right = 0;
				this.right = null;
			}

			if (this.top && this.height && this.bottom) {
				this._bottom = 0;
				this.bottom = null;
			}

			design_form._recalcStepContainer(this);
		};
	};

	_pDesignForm._adjustPosition_assignPart = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
		var val = null;

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
	};

	_pDesignForm._on_designform_onsize = function () {
		var _stack = this._sublayoutmode_stack;
		if (_stack.length > 0) {
			var _win = this._getWindow();
			if (!_win || !_win._handle) {
				return;
			}

			for (var i = 0; i < _stack.length; i++) {
				var overlay_elem = _stack[i].overlay_elem;
				var parent_elem = overlay_elem._parent_elem;

				var width = nexacro.__getWindowHandleClientWidth(_win._handle);
				var height = nexacro.__getWindowHandleClientHeight(_win._handle);

				nexacro.__setElementHandleSize(overlay_elem._handle, width, height);
			}
		}
	};

	delete _pDesignForm;

	nexacro.ApplicationAccessPort = function (target) {
		this.target = target;
		this._formaccessport = [];
		this._block_css_notify = false;
		this._refresh_css = false;
	};

	var _pApplicationAccessPort = nexacro._createPrototype(nexacro.Object, nexacro.ApplicationAccessPort);
	nexacro.ApplicationAccessPort.prototype = _pApplicationAccessPort;
	_pApplicationAccessPort.setInspectorHandle = function (handle) {
	};

	_pApplicationAccessPort.getObjectList = function (type) {
	};

	_pApplicationAccessPort.getObjectCount = function (type) {
	};

	_pApplicationAccessPort.getObjectByID = function (type, objid) {
	};

	_pApplicationAccessPort.getObjectByIndex = function (type, index) {
	};

	_pApplicationAccessPort.getVariant = function (varid) {
	};

	_pApplicationAccessPort.notifySelect = function (command, obj) {
	};

	_pApplicationAccessPort.setDotSize = function (measure, size) {
		var form_aps = this._formaccessport;
		var len = form_aps.length;
		for (var i = 0; i < len; i++) {
			var form_ap = form_aps[i].accessport;
			form_ap.setDotSize(measure, size);
		}
	};

	_pApplicationAccessPort.createFormAccessPort = function (url) {
		var realurl = application._getFDLLocation(url);
		if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl") {
			realurl = realurl + ".js";
		}

		var len = this._formaccessport.length;
		for (var i = 0; i < len; i++) {
			if (this._formaccessport[i].url == realurl) {
				return this._formaccessport[i].accessport;
			}
		}

		this._formaccessport.push({
			url : realurl, 
			accessport : new nexacro.FormAccessPort()
		});
	};

	_pApplicationAccessPort.removeFormAccessPort = function (url) {
		var realurl = application._getFDLLocation(url);
		if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl") {
			realurl = realurl + ".js";
		}

		var form_aps = this._formaccessport;
		var form_aps_len = form_aps ? form_aps.length : 0;
		for (var i = 0; i < form_aps_len; i++) {
			var form_ap = form_aps[i];
			if (form_ap.url == realurl) {
				form_ap.accessport.destroy();
				form_ap.accessport = null;

				delete form_ap;
				form_aps[i] = null;

				form_aps.splice(i, 1);
				break;
			}
		}
	};

	_pApplicationAccessPort.getFormAccessPort = function (url) {
		var realurl = application._getFDLLocation(url);
		if (realurl.length > 5 && realurl.substring(realurl.length - 5) == ".xfdl") {
			realurl = realurl + ".js";
		}

		var len = this._formaccessport.length;
		for (var i = 0; i < len; i++) {
			if (this._formaccessport[i].url == realurl) {
				return this._formaccessport[i].accessport;
			}
		}

		return null;
	};

	_pApplicationAccessPort.createDesignFrame = function (url, _handle, width, height) {
		var obj = new ChildFrame("childdesignframe", "absolute", null, null, width, height, null, null, "", this.target.mainframe);

		obj.set_formurl(url);
		obj.set_autosize("false");
		obj.set_showtitlebar("false");
		obj.set_showstatusbar("false");
		obj.style.set_border("none");

		obj.showDesign(url, this.target.mainframe, null, null, _handle);
	};

	_pApplicationAccessPort.addConstColumn = function (datasetid, columnid, type, size, value) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds._addConstColumn(columnid, nexacro._decodeXml(value), type);
		}
	};

	_pApplicationAccessPort.insertConstColumn = function (datasetid, index, columnid, type, size, value) {
	};

	_pApplicationAccessPort.deleteConstColumn = function (datasetid, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
				ds._constVars.delete_item(id);
			}
		}
	};

	_pApplicationAccessPort.setConstColumnProperty = function (datasetid, col, propid, propval) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
			}
		}
	};

	_pApplicationAccessPort.getConstColumnProperty = function (datasetid, col, propid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var constVar = ds.getConstColumn(col);
			if (constVar) {
				if (constVar[propid]) {
					return constVar[propid];
				}
			}
		}
	};

	_pApplicationAccessPort.addColumn = function (datasetid, columnid, type, size, prop, sumtext) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds._addColumn(columnid, type, size, prop, sumtext);
		}
	};

	_pApplicationAccessPort.insertColumn = function (datasetid, idx, id, strtype, size, prop, text) {
		var ds = this._getObject(datasetid);
		if (!ds || !(ds instanceof nexacro.Dataset)) {
			return;
		}

		if ((id in ds.colinfos) || (id in ds._constVars)) {
			return -1;
		}

		var type;
		if (strtype == undefined) {
			type = 1;
			strtype = "STRING";
		}
		else {
			type = nexacro.DataUtils._typeint[strtype.toLowerCase()];
		}

		if (type == null) {
			type = 1;
		}
		if ((+size) != (+size)) {
			size = 256;
		}

		var len = ds.colinfos.length;
		for (var i = idx; i < len; i++) {
			var colinfo = ds.colinfos[i];
			colinfo._index++;
		}

		var newcolinfo = new nexacro.DSColumnInfo(id, strtype, type, size, prop, text, idx);
		ds.colcount++;
		return ds.colinfos.insert_item(idx, id, newcolinfo);
	};

	_pApplicationAccessPort.deleteColumn = function (datasetid, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.deleteColumn(columnid);
		}
	};

	_pApplicationAccessPort.setColumnProperty = function (datasetid, col, propid, propval) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var colinfo = ds.getColumnInfo(col);
			if (colinfo) {
				if (propid == "id") {
					if (ds.getColumnInfo(propval)) {
						return false;
					}


					var idx = ds.colinfos._idxMap[colinfo.id];
					ds.colinfos.update_id(idx, propval);
				}
				else if (propid == "type") {
					colinfo[propid] = propval;

					nexacro.DSColumnInfo.call(colinfo, colinfo.id, colinfo.type, colinfo.ntype, colinfo.size, colinfo.prop, colinfo.sumtext, colinfo._index);
				}
				else {
					colinfo[propid] = propval;
				}
			}
		}
	};

	_pApplicationAccessPort.getColumnProperty = function (datasetid, col, propid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			var colinfo = ds.getColumnInfo(col);
			if (colinfo) {
				if (colinfo[propid]) {
					return colinfo[propid];
				}
			}
		}
	};

	_pApplicationAccessPort.addRow = function (datasetid) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.addRow();
		}
	};

	_pApplicationAccessPort.insertRow = function (datasetid, index) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.insertRow(index);
		}
	};

	_pApplicationAccessPort.deleteRow = function (datasetid, row) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			ds.deleteRow(row);
		}
	};

	_pApplicationAccessPort.setColumn = function (datasetid, row, col, value) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			return ds.setColumn(row, col, value);
		}
	};

	_pApplicationAccessPort.getColumn = function (datasetid, row, col) {
		var ds = this._getObject(datasetid);
		if (ds && ds instanceof nexacro.Dataset) {
			return ds.getColumn(row, col);
		}
	};

	_pApplicationAccessPort.createFrame = function (classname, parentid, frameid) {
		var parent;
		if (parentid) {
			parent = this._getObject(parentid);
		}

		if (!parent) {
			parent = application;
		}

		if (!frameid || frameid.length == 0) {
			frameid = this._getNextChildID(parent, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = null;

			if (classname == "MainFrame") {
				if (application.mainframe) {
					application.mainframe._destroy();
					application.mainframe = null;
				}

				obj = application.createMainFrame(frameid, null, null, null, null, null, null, null, parent);

				return frameid;
			}
			else if (classname == "ChildFrame") {
				obj = new classnameobj(frameid, null, null, null, null, null, null, null, "", parent);
			}
			else {
				obj = new classnameobj(frameid, null, null, null, null, null, null, null, parent);
			}

			parent.addChild(frameid, obj);

			return frameid;
		}
	};

	_pApplicationAccessPort.deleteFrame = function (frameid) {
		var frame = this._getObject(frameid);
		var parent = frame.parent;
		if (frame && parent) {
			if (!parent.removeChild) {
				trace("* no method: 'removeChild' / " + parent);
				return;
			}
			parent.removeChild(frame.name);
			return frame.destroyComponent();
		}
	};

	_pApplicationAccessPort.createObject = function (classname, objid) {
		if (!objid || objid.length == 0) {
			objid = this._getNextChildID(this, classname);
		}

		var classnameobj = eval(classname);
		if (classnameobj) {
			var obj = new classnameobj(objid, application);
			if (obj instanceof nexacro.Dataset) {
				application._addDataset(obj.name, obj);
			}

			else {
				application._addObject(obj.name, obj);
			}

			return obj.name;
		}
	};

	_pApplicationAccessPort.deleteObject = function (objid) {
		if (application._datasets[objid]) {
			var idx = application._datasets.indexOf(objid);
			application._datasets.splice(idx, 1);

			delete application[objid];
			application.all.delete_item(objid);
		}
		else if (application.images.indexOf(objid)) {
			application.images.delete_item(objid);
		}
		else {
			delete application[objid];
			application.all.delete_item(objid);
		}
	};

	_pApplicationAccessPort.getProperty = function (objid, propid) {
		var obj = this._getObject(objid);
		if (obj) {
			return obj[propid];
		}
	};

	_pApplicationAccessPort.setProperty = function (objid, propid, propval) {
		var obj = this._getObject(objid);
		if (obj) {
			if (obj["set_" + propid]) {
				obj["set_" + propid](propval);
			}
		}
	};

	_pApplicationAccessPort._getObject = function (objid) {
		if (!objid || objid == "this" || objid == "application") {
			return application;
		}

		var obj = eval("application." + objid);
		if (obj) {
			return obj;
		}

		return application.all.get_item(objid);
	};

	_pApplicationAccessPort._getNextChildID = function (parent, classname) {
		if (!parent || !classname) {
			trace("parent or classname is missing");
			return "error";
		}

		var nextnum = 0;
		var nextid;
		while (true) {
			nextid = classname + ((nextnum < 10) ? "0" : "") + nextnum;
			if (!parent[nextid]) {
				break;
			}
			nextnum++;
		}

		return nextid;
	};

	_pApplicationAccessPort.changeTheme = function (themeid) {
		this._loadTheme(themeid);

		this._notifyThemeChange(themeid, true);

		return true;
	};
	_pApplicationAccessPort.refreshFormTheme = function (themeid, formurl) {
		trace("_pApplicationAccessPort.refreshFormTheme : " + themeid + ", " + formurl);
		var formap = this.getFormAccessPort(formurl);
		if (!formap) {
			return false;
		}

		var oldthemeid = application.themeid;


		trace("_pApplicationAccessPort.refreshFormTheme : " + oldthemeid + " to " + themeid);

		this._block_css_notify = true;

		this._loadTheme(themeid);
		formap.refreshTheme();


		this._block_css_notify = false;

		return true;
	};
	_pApplicationAccessPort._loadTheme = function (themeid, delete_cache) {
		application._css_selectors = {
			_is_selector : true, 
			_has_items : false, 
			_has_attr_items : false
		};

		var curthemeid = themeid;
		var themename;
		var idx = curthemeid.indexOf(".xtheme");
		if (idx < 0) {
			themename = curthemeid;
		}
		else if (idx > 0) {
			themename = curthemeid.substring(0, idx);
		}

		var cssurl, base_url;
		if (themename) {
			application._clearLocalThemeCache();

			var idx = themename.indexOf("::");
			if (idx > 0) {
				var prefixurl = themename.substring(0, idx);
				themename = themename.substring(idx + 2);

				application._theme_uri = "./_theme_/" + prefixurl + "/" + themename;
			}
			else {
				application._theme_uri = "./_theme_/" + themename;
			}

			var bLocalCacheType = false;
			if (application._localcache_path && application._hasLocalCacheUrl(curthemeid)) {
				cssurl = application._getLocalCacheUrl(curthemeid);
				if (cssurl) {
					var service = application._getServiceObject(curthemeid);
					application._load_manager.loadCssModule(cssurl, null, null, service);
					return;
				}

				bLocalCacheType = true;
				base_url = this._localcache_path;
			}

			cssurl = application._theme_uri + "/theme.css";
			cssurl = application._getServiceLocation(cssurl, base_url);
			cssurl += ".js";

			if (bLocalCacheType) {
				application._addLocalCacheUrl(curthemeid, cssurl);
			}

			nexacro._design_themeid_map.add_item(cssurl, curthemeid);

			var service = application._getServiceObject(cssurl);
			var _load_manager = application._load_manager;
			var load_item = _load_manager.getLocalItem(cssurl);
			if (load_item) {
				var cached_item = nexacro._design_css_cache.get_item(cssurl);
				if (cached_item) {
					if (delete_cache) {
						nexacro._design_css_cache.delete_item(cssurl);
					}
					else {
						trace("* cached css: " + cssurl);
						this._on_load_thememodule(cssurl, 0, cached_item, 0, 0, 0, 0);
						return;
					}
				}

				var idx = -1;
				var locals = _load_manager.localList;
				var cnt = locals.length;
				for (var i = 0; i < cnt; i++) {
					var item = locals[i];
					if (item.url == cssurl) {
						idx = i;
						break;
					}
				}

				if (idx >= 0) {
					_load_manager.localList.splice(idx, 1);
					load_item = null;
				}
			}

			if (!load_item) {
				application.themeid = themeid;

				load_item = new nexacro.LoadItem(cssurl, "css", _load_manager.context);
				_load_manager.localList.push(load_item);
				_load_manager.localCnt++;

				var cur_cachelevel = service.cachelevel;
				service.cachelevel = "none";
				load_item._handle = nexacro._loadJSModule(cssurl, _load_manager, this._on_load_thememodule, false, service, false);
				service.cachelevel = cur_cachelevel;
			}
		}
	};

	_pApplicationAccessPort._loadCss = function (url, refresh_designform, add_to_cssurls) {
		var cssurl = application._getServiceLocation(url) + ".js";
		var service = application._getServiceObject(url);

		var _load_manager = application._load_manager;
		if (add_to_cssurls !== false) {
			application._cssurls.push(url);
		}

		var load_item = _load_manager.getLocalItem(cssurl);
		if (load_item) {
			var cached_item = nexacro._design_css_cache.get_item(cssurl);
			if (cached_item) {
				trace("* cached css: " + cssurl);
				this._on_load_cssmodule(cssurl, 0, cached_item, 0, 0, 0, 0);
				return;
			}

			var idx = -1;
			var locals = _load_manager.localList;
			var cnt = locals.length;
			for (var i = 0; i < cnt; i++) {
				var item = locals[i];
				if (item.url == cssurl) {
					idx = i;
					break;
				}
			}

			if (idx >= 0) {
				_load_manager.localList.splice(idx, 1);
				load_item = null;
			}
		}

		if (!load_item) {
			load_item = new nexacro.LoadItem(cssurl, "css", _load_manager.context);
			load_item._refresh_designform = refresh_designform;
			_load_manager.localList.push(load_item);

			var cur_cachelevel = service.cachelevel;
			service.cachelevel = "none";
			load_item._handle = nexacro._loadJSModule(cssurl, _load_manager, this._on_load_cssmodule, false, service, false);
			service.cachelevel = cur_cachelevel;
		}
	};

	_pApplicationAccessPort._on_load_thememodule = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
		var _load_manager = application._load_manager;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					nexacro._design_css_cache.add_item(url, module);

					trace("* apply CSS: " + url);
					module.call(_load_manager.context);

					var app_ap = application.accessport;
					var cssurls_len = application._cssurls.length;
					for (var i = 0; i < cssurls_len; i++) {
						var cssurl = application._cssurls[i];
						var cssfullurl = application._getServiceLocation(cssurl) + ".js";

						var css_load_item = _load_manager.getLocalItem(cssfullurl);
						if (css_load_item) {
							application.accessport._loadCss(cssurl, app_ap._refresh_css, false);
						}
						else {
							trace("not found: " + cssfullurl);
						}
					}
				}
			}
			else {
				load_Item.errcode = errstatus;
				application._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri);
			}

			return;
		}
	};

	_pApplicationAccessPort._on_load_cssmodule = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
		var _load_manager = application._load_manager;
		var load_Item = _load_manager.getLocalItem(url);
		if (load_Item) {
			var _handle = load_Item._handle;
			load_Item._handle = null;
			if (errstatus == 0 && module && typeof (module) == "function") {
				if (load_Item.type != "include") {
					nexacro._design_css_cache.add_item(url, module);

					trace("* apply CSS: " + url);
					module.call(_load_manager.context);
				}
			}
			else {
				load_Item.errcode = errstatus;
				application._onHttpSystemError(_load_manager.context, true, _load_manager.context, fireerrorcode, url, returncode, requesturi, locationuri);
			}

			return;
		}
	};


	_pApplicationAccessPort._notifyThemeChange = function (themeid, is_themeid_changed) {
		if (!this._block_css_notify) {
			var form_aps = this._formaccessport;
			var form_aps_len = form_aps ? form_aps.length : 0;
			for (var i = form_aps_len - 1; i >= 0; i--) {
				var form_ap = form_aps[i].accessport;
				if (form_ap) {
					var designform = form_ap.target;
					var win = designform._getWindow();
					var notify_type = is_themeid_changed ? nexacro._design_notify_theme_change : nexacro._design_notify_theme_updated;
					nexacro.__notifyToDesignWindow(win._handle, notify_type, designform.id, themeid);
				}
			}
		}
	};

	_pApplicationAccessPort._notifyCSSChange = function () {
		if (!this._block_css_notify) {
			var form_aps = this._formaccessport;
			var form_aps_len = form_aps ? form_aps.length : 0;
			for (var i = form_aps_len - 1; i >= 0; i--) {
				var form_ap = form_aps[i].accessport;
				if (form_ap) {
					var designform = form_ap.target;
					var win = designform._getWindow();
					nexacro.__notifyToDesignWindow(win._handle, nexacro._design_notify_css_change, designform.id, null);
				}
			}
		}
	};

	_pApplicationAccessPort.insertCSS = function (url) {
		var cssurls = application._cssurls;
		var idx = cssurls.indexOf(url);

		this._loadCss(url, true, (idx >= 0 ? false : true));

		this._notifyCSSChange();
	};

	_pApplicationAccessPort.removeCSS = function (url) {
		var cssurls = application._cssurls;
		var idx = cssurls.indexOf(url);
		if (idx >= 0) {
			cssurls.splice(idx, 1);
		}
		else {
			return;
		}

		this._loadTheme(application.themeid);

		this._notifyCSSChange();
	};

	_pApplicationAccessPort.updateCSS = function (url, global) {
		var cssurl = application._getServiceLocation(url) + ".js";

		nexacro._design_css_cache.delete_item(cssurl);

		if (global) {
			var cssurls = application._cssurls;
			var idx = cssurls.indexOf(url);
			if (idx < 0) {
				return;
			}

			this._refresh_css = true;
			this._loadTheme(application.themeid);
			trace("_pApplicationAccessPort.updateCSS : " + application.themeid);
			this._refresh_css = false;

			this._notifyCSSChange();
		}
		else {
			var form_aps = this._formaccessport;
			var len = form_aps.length;
			for (var i = 0; i < len; i++) {
				var form_ap = form_aps[i].accessport;
				if (form_ap) {
					form_ap.updateCSS(url);
				}
			}
		}
	};

	_pApplicationAccessPort.updateTheme = function (themeid) {
		this._refresh_css = false;
		this._loadTheme(themeid, true);

		this._notifyThemeChange(themeid, false);
	};

	delete _pApplicationAccessPort;

	nexacro.FormAccessPort = function (target) {
		this.target = target;
		this.notify_handle = null;
	};

	var _pFormAccessPort = nexacro._createPrototype(nexacro.Object, nexacro.FormAccessPort);
	nexacro.FormAccessPort.prototype = _pFormAccessPort;

	_pFormAccessPort.destroy = function () {
		if (this.target) {
			this.target.destroy();
			this.target = null;
		}
	};

	_pFormAccessPort.reloadForm = function () {
		return this.target.reloadForm();
	};

	_pFormAccessPort.setInspectorHandle = function (handle) {
		this.notify_handle = handle;
	};

	_pFormAccessPort.getObjectList = function (type) {
		var form = this.target;
		var len = form.all.length;
		var objlist = [];
		for (var i = 0; i < len; i++) {
			var obj = form.all[i];
			if (obj && obj._type_name == type) {
				objlist.push(comp);
			}
		}
		return objlist;
	};


	_pFormAccessPort.getObjectCount = function (type) {
		var form = this.target;
		var len = form.all.length;
		var cnt = 0;
		for (var i = 0; i < len; i++) {
			var obj = form.all[i];
			if (obj && obj._type_name == type) {
				cnt++;
			}
		}
		return cnt;
	};

	_pFormAccessPort.getObjectByID = function (type, objid) {
		var evalstr = objid;
		var obj = evalstr.replace("this._inner_form", "this._inner_form.target");


		if (obj && obj._type_name == type) {
			return obj;
		}
	};

	_pFormAccessPort.getObjectByIndex = function (type, index) {
	};

	_pFormAccessPort.getVariant = function (varid) {
		var evalstr = varid;
		evalstr.replace("this._inner_form", "this._inner_form.target");
		return eval(evalstr);
	};

	_pFormAccessPort.notifySelect = function (command, obj) {
	};

	_pFormAccessPort._setTarget = function (target) {
		this.target = target;
	};

	_pFormAccessPort.getObject = function () {
		return this.target;
	};

	_pFormAccessPort.createComponent = function (classname, parentid, left, top, width, height, compid) {
		return this.target.createComponentByRect(classname, parentid, left, top, width, height, compid);
	};

	_pFormAccessPort.createTabpage = function (classname, parentid, compid) {
		return this.target.createTabpage(classname, parentid, compid);
	};

	_pFormAccessPort.createInvisibleObject = function (classname, objid) {
		return this.target.createInvisibleObject(classname, objid);
	};

	_pFormAccessPort.deleteObject = function (compid) {
		return this.target.deleteObject(compid);
	};

	_pFormAccessPort.setProperty = function (compid, propid, propval, pseudo) {
		return this.target.setProperty(compid, propid, propval, pseudo);
	};

	_pFormAccessPort.appendInlineStyleValue = function (base_value, append_value) {
		return this.target.appendInlineStyleValue(base_value, append_value);
	};

	_pFormAccessPort.setLayoutStyle = function (compid, base_value, append_value) {
		return this.target.setLayoutStyle(compid, base_value, append_value);
	};

	_pFormAccessPort.getProperty = function (compid, propid, pseudo) {
		return this.target.getProperty(compid, propid, pseudo);
	};

	_pFormAccessPort.getCurrentStyleValue = function (compid, propid, pseudo) {
		return this.target.getCurrentStyleValue(compid, propid, pseudo);
	};

	_pFormAccessPort.moveComponentByRect = function (compid, left, top, width, height) {
		this.target.moveComponentByRect(compid, left, top, width, height);
	};

	_pFormAccessPort.moveComponent = function (compid, left, top, width, height, right, bottom) {
		this.target.moveComponent(compid, left, top, width, height, right, bottom);
	};

	_pFormAccessPort.resizeComponent = function (compid, width, height) {
		this.target.resizeComponent(compid, width, height);
	};

	_pFormAccessPort.swapPositionUnit = function (compid, propid) {
		this.target.swapPositionUnit(compid, propid);
	};

	_pFormAccessPort.hitTestByPoint = function (x, y, rootcompid) {
		return this.target.hitTestByPoint(x, y, rootcompid);
	};

	_pFormAccessPort.hitTestByRect = function (left, top, width, height, rootcompid, type) {
		return this.target.hitTestByRect(left, top, width, height, rootcompid, type);
	};

	_pFormAccessPort.hitTestTracker = function (x, y, rootcompid, compid) {
		return this.target.hitTestTracker(x, y, rootcompid, compid);
	};

	_pFormAccessPort.setScroll = function (horz, size) {
		return this.target.setScroll(horz, size);
	};

	_pFormAccessPort.getComponentRect = function (compid, isroot) {
		return this.target.getComponentRect(compid, isroot);
	};

	_pFormAccessPort.getClientRect = function (compid) {
		return this.target.getClientRect(compid);
	};

	_pFormAccessPort.drawWindow = function () {
		var win = this.target._getWindow();
		if (win && win._handle) {
			nexacro.__refreshDirtyRectWithCallBack(win._handle, this.drawWindowCallBack);
		}
	};

	_pFormAccessPort.drawWindowCallBack = function (pwin) {
		if (pwin) {
			nexacro.__finishDrawDesignWindow(pwin);
		}
	};

	_pFormAccessPort.setDotSize = function (measure, size) {
		this.target.setDotSize(measure, size);
	};

	_pFormAccessPort.setDotStyle = function (style) {
		this.target.setDotStyle(style);
	};

	_pFormAccessPort.setDotVisible = function (visible) {
		this.target.setDotVisible(visible);
	};

	_pFormAccessPort.getFormBitmap = function () {
		return this.target.getFormBitmap();
	};

	_pFormAccessPort.setBitmapSize = function (width, height) {
		return this.target.setBitmapSize(width, height);
	};

	_pFormAccessPort.setFormSize = function (width, height) {
		return this.target.setFormSize(width, height);
	};

	_pFormAccessPort.DrawOffset = function (offsetx, offsety) {
		return this.target.DrawOffset(offsetx, offsety);
	};

	_pFormAccessPort.setRoot = function (left, top) {
		return this.target.setRoot(left, top);
	};

	_pFormAccessPort.setDesignZoom = function (scale) {
		return this.target.setDesignZoom(scale);
	};

	_pFormAccessPort.getBorderWidth = function (compid) {
		return this.target.getBorderWidth(compid);
	};

	_pFormAccessPort.setName = function (compid, propval) {
		return this.target.setName(compid, propval);
	};

	_pFormAccessPort.attachDesignWindow = function (_handle) {
		var win = this.target._getWindow();
		if (win && win._handle) {
			nexacro.__attachDesignWindowHandle(win._handle, _handle);
		}
	};

	_pFormAccessPort.detachDesignWindow = function () {
		var win = this.target._getWindow();
		if (win && win._handle) {
			nexacro.__detachDesignWindowHandle(win._handle);
		}
	};

	_pFormAccessPort.setOverflowClip = function (overflowclip) {
		this.target.setOverflowClip(overflowclip);
	};

	_pFormAccessPort.showSubLayout = function (compid, bShow) {
		this.target.showSubLayout(compid, bShow);
	};

	_pFormAccessPort.moveComponentToFront = function (compid) {
		this.target.moveComponentToFront(compid);
	};

	_pFormAccessPort.moveComponentToPrev = function (compid) {
		this.target.moveComponentToPrev(compid);
	};

	_pFormAccessPort.moveComponentToNext = function (compid) {
		this.target.moveComponentToNext(compid);
	};

	_pFormAccessPort.moveComponentToBack = function (compid) {
		this.target.moveComponentToBack(compid);
	};

	_pFormAccessPort.setPseudo = function (compid, pseudo) {
		return this.target.setPseudo(compid, pseudo);
	};

	_pFormAccessPort.getPseudo = function (compid) {
		return this.target.getPseudo(compid);
	};

	_pFormAccessPort.addLayout = function (compid, layoutname, width, height, screenid) {
		return this.target.addLayout(compid, layoutname, width, height, screenid);
	};

	_pFormAccessPort.removeLayout = function (compid, layoutname) {
		return this.target.removeLayout(compid, layoutname);
	};

	_pFormAccessPort.removeAllLayout = function (compid) {
		return this.target.removeAllLayout(compid);
	};

	_pFormAccessPort.setLayoutProperty = function (compid, layoutname, propid, propval) {
		return this.target.setLayoutProperty(compid, layoutname, propid, propval);
	};

	_pFormAccessPort.getLayoutProperty = function (compid, layoutname, propid) {
		return this.target.getLayoutProperty(compid, layoutname, propid);
	};

	_pFormAccessPort.changeLayout = function (compid, layoutname) {
		return this.target.changeLayout(compid, layoutname);
	};

	_pFormAccessPort.getCurrentLayout = function (compid) {
		return this.target.getCurrentLayout(compid);
	};

	_pFormAccessPort.setAutoLayoutChange = function (compid, is_auto) {
		return this.target.setAutoLayoutChange(compid, is_auto);
	};

	_pFormAccessPort.refreshLayout = function (compid) {
		this.target.refreshLayout(compid);
	};

	_pFormAccessPort.recalcLayout = function (compid) {
		this.target.recalcLayout(compid);
	};

	_pFormAccessPort.setContents = function (compid, contents) {
		this.target.setContents(compid, contents);
	};

	_pFormAccessPort.setFormats = function (compid, contents) {
		this.target.setFormats(compid, contents);
	};

	_pFormAccessPort.setInnerDataset = function (compid, contents) {
		this.target.setInnerDataset(compid, contents);
	};

	_pFormAccessPort.setActiveTabPage = function (compid, index) {
		this.target.setActiveTabPage(compid, index);
	};

	_pFormAccessPort.refreshTheme = function () {
		this.target.refreshTheme();
	};

	_pFormAccessPort.addConstColumn = function (datasetid, columnid, type, size, value) {
		nexacro.ApplicationAccessPort.prototype.addConstColumn.call(this.target, datasetid, columnid, type, size, value);
	};

	_pFormAccessPort.insertConstColumn = function (datasetid, index, columnid, type, size, value) {
		nexacro.ApplicationAccessPort.prototype.insertConstColumn.call(this.target, datasetid, index, columnid, type, size, value);
	};

	_pFormAccessPort.deleteConstColumn = function (datasetid, col) {
		nexacro.ApplicationAccessPort.prototype.deleteConstColumn.call(this.target, datasetid, col);
	};

	_pFormAccessPort.setConstColumnProperty = function (datasetid, col, propid, propval) {
		nexacro.ApplicationAccessPort.prototype.setConstColumnProperty.call(this.target, datasetid, col, propid, propval);
	};

	_pFormAccessPort.getConstColumnProperty = function (datasetid, col, propid) {
		nexacro.ApplicationAccessPort.prototype.getConstColumnProperty.call(this.target, datasetid, col, propid);
	};

	_pFormAccessPort.addColumn = function (datasetid, columnid, type, size, prop, sumtext) {
		nexacro.ApplicationAccessPort.prototype.addColumn.call(this.target, datasetid, columnid, type, size, prop, sumtext);
	};

	_pFormAccessPort.insertColumn = function (datasetid, index, columnid, type, size, prop, sumtext) {
		nexacro.ApplicationAccessPort.prototype.insertColumn.call(this.target, datasetid, index, columnid, type, size, prop, sumtext);
	};

	_pFormAccessPort.deleteColumn = function (datasetid, col) {
		nexacro.ApplicationAccessPort.prototype.deleteColumn.call(this.target, datasetid, col);
	};

	_pFormAccessPort.setColumnProperty = function (datasetid, col, propid, propval) {
		nexacro.ApplicationAccessPort.prototype.setColumnProperty.call(this.target, datasetid, col, propid, propval);
	};

	_pFormAccessPort.getColumnProperty = function (datasetid, col, propid) {
		nexacro.ApplicationAccessPort.prototype.getColumnProperty.call(this.target, datasetid, col, propid);
	};

	_pFormAccessPort.addRow = function (datasetid) {
		nexacro.ApplicationAccessPort.prototype.addRow.call(this.target, datasetid);
	};

	_pFormAccessPort.insertRow = function (datasetid, index) {
		nexacro.ApplicationAccessPort.prototype.insertRow.call(this.target, datasetid, index);
	};

	_pFormAccessPort.deleteRow = function (datasetid, row) {
		nexacro.ApplicationAccessPort.prototype.deleteRow.call(this.target, datasetid, row);
	};

	_pFormAccessPort.setColumn = function (datasetid, row, col, value) {
		nexacro.ApplicationAccessPort.prototype.setColumn.call(this.target, datasetid, row, col, value);
	};

	_pFormAccessPort.getColumn = function (datasetid, row, col) {
		nexacro.ApplicationAccessPort.prototype.getColumn.call(this.target, datasetid, row, col);
	};

	_pFormAccessPort.insertCSS = function (url) {
		this.target.insertCSS(url);
	};

	_pFormAccessPort.removeCSS = function (url) {
		this.target.removeCSS(url);
	};

	_pFormAccessPort.updateCSS = function (url) {
		this.target.updateCSS(url);
	};

	delete _pFormAccessPort;


	nexacro.createApplicationAccessPort = function () {
		if (!application.accessport) {
			application.accessport = new nexacro.ApplicationAccessPort(application);
		}
	};

	nexacro.destroyApplicationAccessPort = function () {
		var app_ap = application.accessport;
		if (app_ap) {
			var form_aps = app_ap._formaccessport;
			var form_aps_len = form_aps ? form_aps.length : 0;
			for (var i = form_aps_len - 1; i >= 0; i--) {
				var form_ap = form_aps[i].accessport;
				if (!form_ap) {
					continue;
				}

				form_ap.destroy();
				delete form_ap;
			}

			form_aps = [];

			delete application.accessport;
			application.accessport = null;
		}
	};

	nexacro.closeApplication = function () {
		if (application) {
			var mainframe = application.mainframe;
			if (mainframe) {
				mainframe._destroy();
			}

			application.exit();
			delete application;
			application = null;
		}
	};

	nexacro.getApplicationAccessPort = function () {
		return application.accessport;
	};

	nexacro.ChildFrame.prototype.set_formurl = function (url) {
		var realurl = application._getFDLLocation(url);
		if (this._formurl != realurl) {
			this.formurl = url;
			this._formurl = realurl;

			var form = this.form;
			if (form) {
				form.destroyComponent();
			}

			form = new nexacro.DesignForm("form", "absolute", 0, 0, this._client_width, this._client_height, null, null, this);
			form.opener = this.opener;
			this.form = form;
			this.form._url = this._formurl;
			this._is_loading = false;
			this.form.on_notify_init();
			this._is_loaded = true;

			return form;
		}
	};

	nexacro.ChildFrame.prototype.showDesign = function (str_id, _parent_frame, arr_arg, opener, _parent_handle) {
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
			child_frame = parent_frame[id];
			if (child_frame && child_frame._window && !child_frame._window._is_alive) {
				if (child_frame._window.setActive) {
					child_frame._window.setActive();
				}
				else {
					child_frame._window.focus();
				}
				return;
			}
		}
		else {
			child_frame = this;
		}

		application._registerPopupFrame(id, this);
		child_frame._is_window = true;
		child_frame._window_type = 2;

		var left = child_frame._adjust_left;
		var top = child_frame._adjust_top;
		var width = child_frame._adjust_width;
		var height = child_frame._adjust_height;

		var option;
		if (this.form) {
			this.form.opener = this.opener;
		}

		var parent_window = new nexacro.Window(this.name, null, false);
		parent_window._handle = _parent_handle;

		if (!this.autosize) {
			this._window = new nexacro.Window(this.name, parent_window, false);
			this._window.attachFrame(this, false);

			this._window.create(parent_window, this.id, width, height, left, top, this.resizable, this.layered, this.showontaskbar);
			if (this._is_created) {
				this._control_element._parent_elem = null;
			}
			this.createComponent();
			this.on_created();

			var pThis = this;

			nexacro._observeSysEvent(this._window._handle, "resize", "onresize", function () {
				if (pThis.form) {
					pThis.form._on_designform_onsize();
				}
			});
		}
	};



	nexacro.Form.prototype.on_fire_onlayoutchanged = function (obj, eventid, curlayoutname, newlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight) {
		trace(obj.name + ".on_fire_onlayoutchanged : " + curlayoutname + "->" + newlayoutname);

		if (this.onlayoutchanged && this.onlayoutchanged._has_handlers) {
			var evt = new nexacro.LayoutChangeEventInfo(obj, eventid, curlayoutname, curlayoutname, curlayoutwidth, newlayoutwidth, curlayoutheight, newlayoutheight);
			return this.onlayoutchanged._fireEvent(this, evt);
		}

		var win = this._getWindow();
		var frame = this.getOwnerFrame();
		var designform = frame.form;

		var extra_info = obj.id + ":" + newlayoutname;
		nexacro.__notifyToDesignWindow(win._handle, nexacro._design_notify_layoutchange, designform.id, extra_info);

		return true;
	};



	nexacro.LoadManager.prototype.on_load_main = function (url, errstatus, module, fireerrorcode, returncode, requesturi, locationuri) {
		if (url == this.main_url) {
			this.status = 2;
			this._main_handle = null;
			this._is_mainloaded = false;
			if (errstatus == 0 && module && typeof (module) == "function") {
				module.call(this.context);

				var obj = this.context;
				if (obj instanceof nexacro.Div) {
					var win = obj._getWindow();
					var frame = obj.getOwnerFrame();
					var designform = frame.form;
					var extra_info = designform._getScopeName(obj);

					nexacro.__notifyToDesignWindow(win._handle, nexacro._design_notify_div_urlload, designform.id, extra_info);
				}
			}
			else {
				if (this.context == application) {
					application._onHttpSystemError(this.context, true, this.context, "0x80010006", url, returncode, requesturi, locationuri);
					return;
				}
				else {
					application._onHttpSystemError(this.context, true, this.context, fireerrorcode, url, returncode, requesturi, locationuri);

					var obj = this.context;
					if (obj instanceof nexacro.Div) {
						var win = obj._getWindow();
						var frame = obj.getOwnerFrame();
						var designform = frame.form;
						var extra_info = designform._getScopeName(obj);

						nexacro.__notifyToDesignWindow(win._handle, nexacro._design_notify_div_httperror, designform.id, extra_info);
					}
				}
			}

			this._is_mainloaded = true;
			this._check_fire_oninit();
		}
	};

	nexacro.Component.prototype._adjustPosition = function (left, top, right, bottom, width, height, parentWidth, parentHeight) {
		var step_logical_offset = nexacro.DesignForm.prototype._getCompStepLogicalOffset(this);
		nexacro.DesignForm.prototype._adjustPosition_assignPart.call(this, left, top, right, bottom, width, height, parentWidth, parentHeight);

		var bRtl = this._isRtl(this.parent);
		if (this._width != null || (this._right != null && this._left != null)) {
			this._adjust_width = this._width != null ? this._width : parentWidth - this._left - this._right;
		}

		if (this._height != null || this._bottom != null) {
			this._adjust_height = this._height != null ? this._height : parentHeight - this._top - this._bottom;
		}

		if (this._left != null || this._right != null) {
			this._adjust_left_ltr = this._adjust_left = (this._left != null) ? (step_logical_offset + this._left) : (step_logical_offset + (parentWidth - this._right - this._adjust_width));
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

	this.Form = nexacro.DesignForm;

	nexacro.Component.prototype.on_create_popup_control_element = function (parent_elem) {
		var control_elem = new nexacro.ControlElement(parent_elem);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	nexacro.PopupScrollableControlElement.prototype.create = nexacro.ScrollableControlElement.prototype.create;

	nexacro.Component.prototype.on_create_popupscrollable_control_element = function (parent_elem) {
		this._is_popup = false;
		this._is_window = false;
		this._track_on = true;

		var control_elem = new nexacro.PopupScrollableControlElement(this.parent._control_element);
		control_elem.setLinkedControl(this);
		this._control_element = control_elem;
		return control_elem;
	};

	if (nexacro.Browser == "Runtime") {
		if (nexacro.Element) {
			var _pElement = nexacro.Element.prototype;
			_pElement.setElementVisible = function (visible) {
				if (this.visible != visible) {
					this.visible = visible;
					var design_visible = visible;
					var _handle = this._handle;
					if (_handle) {
						design_visible = true;

						if (this.linkedcontrol) {
							if (this.linkedcontrol instanceof nexacro.Tabpage) {
								design_visible = visible;
							}
						}
						else {
							design_visible = visible;
						}

						nexacro.__setElementHandleVisible(_handle, design_visible);
					}

					this._design_visible = design_visible;
				}
			};
		}


		nexacro.SubLayoutOverlayElement = function (parent_elem) {
			this._parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;
		};

		var _pSubLayoutOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.SubLayoutOverlayElement);
		nexacro.SubLayoutOverlayElement.prototype = _pSubLayoutOverlayElement;
		_pSubLayoutOverlayElement._type_name = "SubLayoutOverlayElement";

		_pSubLayoutOverlayElement.create = function (color) {
			var parent_elem = this._parent_elem;
			if (this._parent_elem && !this._handle) {
				var _win = this.linkedcontrol._getWindow();
				this._win_handle = _win._handle;

				this.left = 0;
				this.top = 0;
				this.width = parent_elem.width;
				this.height = parent_elem.height;

				var _handle = this._handle = this._dest_handle = nexacro.__createControlElementHandle(this, this._win_handle, this.left, this.top, this.width, this.height);
				_handle._linked_element = this;

				var handle_style = _handle.style;
				this.setElementColor(color);

				this._owner_elem = parent_elem;
				nexacro.__appendElementHandle(parent_elem._handle, _handle);

				this._refreshForeground(_handle);

				var client_elem = this._client_element;
				client_elem.left = this.left;
				client_elem.top = this.top;
				client_elem.width = this.width;
				client_elem.height = this.height;

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};

		_pSubLayoutOverlayElement.destroy = function () {
			if (this._handle) {
				nexacro.__destroyElementHandle(this._parent_elem._handle, this._handle);
				this._handle = null;

				this._client_element.destroy();
			}
		};

		_pSubLayoutOverlayElement.setElementColor = function (color) {
			nexacro.__setElementHandleBackgroundColor(this._handle, color ? color._syscolor : 0);
		};

		_pSubLayoutOverlayElement.getContainerElement = function () {
			return this._client_element;
		};

		_pSubLayoutOverlayElement.getRootWindowHandle = function () {
			return this._win_handle;
		};

		delete _pSubLayoutOverlayElement;
	}
}

