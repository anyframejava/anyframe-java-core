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

if (!nexacro.Plugin) {
	nexacro.Plugin = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._params = new nexacro.Collection();
		this._events = new nexacro.Collection();
	};

	var _pPlugin = nexacro._createPrototype(nexacro.Component, nexacro.Plugin);
	nexacro.Plugin.prototype = _pPlugin;

	_pPlugin._type_name = "Plugin";

	_pPlugin.classid = "";
	_pPlugin.codebase = "";
	_pPlugin.code = "";
	_pPlugin.archive = "";

	_pPlugin.mimetype = "";
	_pPlugin.pluginsrc = "";
	_pPlugin.pluginpage = "";
	_pPlugin.license = "";
	_pPlugin.lpkpath = "";

	_pPlugin.contents = "";
	_pPlugin.adjustalpha = false;
	_pPlugin.usepersistdata = false;

	_pPlugin.windowed = false;
	_pPlugin.popupstyle = false;

	_pPlugin._obj_id = "";
	_pPlugin._obj_elem = null;
	_pPlugin._params = null;

	_pPlugin._event_params = null;

	_pPlugin.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}
		v = nexacro._toBoolean(v);

		nexacro.Component.prototype.set_visible.call(this, v);

		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementVisible(v);
		}
	};
	_pPlugin.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var obj_elem = this._obj_elem = new nexacro.PluginElement(control_elem);
			obj_elem.setElementSize(this._client_width, this._client_height);
		}
	};

	_pPlugin.on_created_contents = function () {
		this.on_apply_classid();
		this.on_apply_codebase();
		this.on_apply_code();
		this.on_apply_archive();
		this.on_apply_mimetype();
		this.on_apply_pluginsrc();
		this.on_apply_pluginpage();
		this.on_apply_plugintype();
		this.on_apply_license();
		this.on_apply_lpkpath();
		this.on_apply_adjustalpha();
		this.on_apply_usepersistdata();
		this.on_apply_windowed();
		this.on_apply_popupstyle();

		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.component = this;

			var params = this._params;
			var param_cnt = params.length;
			for (var i = 0; i < param_cnt; i++) {
				obj_elem.setElementParam(params.get_id(i), params.get_item(i));
			}

			var events = this._events;
			var event_cnt = events.length;
			for (var i = 0; i < event_cnt; i++) {
				obj_elem.addEventHandler(events.get_id(i), events.get_item(i));
			}

			obj_elem.create();
			obj_elem.setElementVisible(this.visible);

			obj_elem.initEvent();
		}
	};

	_pPlugin.on_destroy_contents = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.destroy();
			this._obj_elem = null;
		}
	};

	_pPlugin.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			if (resize_flag || move_flag) {
				obj_elem.on_update_position(resize_flag, move_flag, this._adjust_left, this._adjust_top);
			}
		}
	};

	_pPlugin.on_apply_custom_setfocus = function (focus) {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementFocus();
		}
	};

	_pPlugin.on_change_containerRect = function (width, height) {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.setElementSize(width, height);
		}
	};

	_pPlugin._setContents = function (str) {
		if (str.length) {
			if (str.indexOf("<Contents>") != 0) {
				str = "<Contents>" + str + "</Contents>";
			}
			var doc = nexacro._parseXMLDocument(str);
			if (doc) {
				this._params.clear();

				var elems = doc.getElementsByTagName("Param");
				if (elems) {
					var len = elems.length;
					for (var i = 0; i < len; i++) {
						var param = elems[i];
						var name = param.getAttribute("name");
						var value = param.getAttribute("value");

						var obj_elem = this._obj_elem;
						if (obj_elem) {
							obj_elem.setElementParam(name, value);
						}
						else {
							this._params.add_item(name, value);
						}
					}
				}
			}
		}
	};

	_pPlugin.set_contents = function (str) {
		this.contents = str;
		this._setContents(str);
	};

	_pPlugin.set_classid = function (v) {
		this.classid = v;
		this.on_apply_classid();
	};

	_pPlugin.on_apply_classid = function () {
		var elem = this._obj_elem;
		if (elem) {
			var classid = this.classid;
			elem.setElementClassId(classid);
		}
	};

	_pPlugin.set_codebase = function (v) {
		this.codebase = v;
		this.on_apply_codebase();
	};

	_pPlugin.on_apply_codebase = function () {
		var elem = this._obj_elem;
		if (elem) {
			var codebase = this.codebase;
			if (codebase) {
				elem.setElementCodebase(codebase);
			}
		}
	};

	_pPlugin.set_code = function (v) {
		this.code = v;
		this.on_apply_code();
	};

	_pPlugin.on_apply_code = function () {
		var elem = this._obj_elem;
		if (elem) {
			var code = this.code;
			if (code) {
				elem.setElementCode(code);
			}
		}
	};

	_pPlugin.set_archive = function (v) {
		this.archive = v;
		this.on_apply_archive();
	};

	_pPlugin.on_apply_archive = function () {
		var elem = this._obj_elem;
		if (elem) {
			var archive = this.archive;
			if (archive) {
				elem.setElementArchive(archive);
			}
		}
	};

	_pPlugin.set_mimetype = function (v) {
		this.mimetype = v;
		this.on_apply_mimetype();
	};

	_pPlugin.on_apply_mimetype = function () {
		var elem = this._obj_elem;
		if (elem) {
			var mimetype = this.mimetype;
			if (mimetype) {
				elem.setElementMIMEType(mimetype);
			}
		}
	};

	_pPlugin.set_pluginsrc = function (v) {
		this.pluginsrc = v;
		this.on_apply_pluginsrc();
	};

	_pPlugin.on_apply_pluginsrc = function () {
		var elem = this._obj_elem;
		if (elem) {
			var pluginsrc = this.pluginsrc;
			if (pluginsrc) {
				elem.setElementPluginSrc(pluginsrc);
			}
		}
	};

	_pPlugin.set_plugintype = function (v) {
		this.plugintype = v;
		this.on_apply_plugintype();
	};

	_pPlugin.on_apply_plugintype = function () {
		var elem = this._obj_elem;
		if (elem) {
			var plugintype = this.plugintype;
			if (plugintype) {
				elem.setElementPluginMIMEType(plugintype);
			}
		}
	};

	_pPlugin.set_pluginpage = function (v) {
		this.pluginpage = v;
		this.on_apply_pluginpage();
	};

	_pPlugin.on_apply_pluginpage = function () {
		var elem = this._obj_elem;
		if (elem) {
			var pluginpage = this.pluginpage;
			if (pluginpage) {
				elem.setElementPluginPage(pluginpage);
			}
		}
	};

	_pPlugin.set_license = function (v) {
		this.license = v;
		this.on_apply_license();
	};

	_pPlugin.on_apply_license = function () {
		var elem = this._obj_elem;
		if (elem) {
			var license = this.license;
			if (license) {
				elem.setElementLicense(license);
			}
		}
	};

	_pPlugin.set_lpkpath = function (v) {
		this.lpkpath = v;
		this.on_apply_lpkpath();
	};

	_pPlugin.on_apply_lpkpath = function () {
		var elem = this._obj_elem;
		if (elem) {
			var lpkpath = this.lpkpath;
			if (lpkpath) {
				elem.setElementLicenseFile(lpkpath);
			}
		}
	};

	_pPlugin.set_adjustalpha = function (v) {
		this.adjustalpha = nexacro._toBoolean(v);
		this.on_apply_adjustalpha();
	};
	_pPlugin.on_apply_adjustalpha = function () {
		var elem = this._obj_elem;
		if (elem) {
			var adjustalpha = this.adjustalpha;
			if (adjustalpha) {
				elem.setElementAdjustAlpha(adjustalpha);
			}
		}
	};

	_pPlugin.set_usepersistdata = function (v) {
		this.userpersistdata = v;
		this.on_apply_usepersistdata();
	};

	_pPlugin.on_apply_usepersistdata = function () {
		var elem = this._obj_elem;
		if (elem) {
			var usepersistdata = this.usepersistdata;
			if (usepersistdata) {
				elem.setElementUsePersistData(usepersistdata);
			}
		}
	};


	_pPlugin.set_windowed = function (v) {
		this.windowed = nexacro._toBoolean(v);
	};
	_pPlugin.on_apply_windowed = function () {
		var elem = this._obj_elem;
		if (elem) {
			var windowed = this.windowed;
			if (windowed) {
				elem.setElementWindowed(windowed);
			}
		}
	};

	_pPlugin.set_popupstyle = function (v) {
		this.popupstyle = nexacro._toBoolean(v);
		this.on_apply_popupstyle();
	};
	_pPlugin.on_apply_popupstyle = function () {
		var elem = this._obj_elem;
		if (elem) {
			var popupstyle = this.popupstyle;
			if (popupstyle) {
				elem.setElementPopupStyle(popupstyle);
			}
		}
	};
	_pPlugin.install = function () {
		var elem = this._obj_elem;
		if (elem) {
			elem.install();
		}
	};

	_pPlugin.isInstalled = function () {
		var elem = this._obj_elem;
		if (elem) {
			return elem.isInstalled();
		}
		return false;
	};

	_pPlugin.isLoaded = function () {
		var elem = this._obj_elem;
		if (elem) {
			return elem.isLoaded();
		}
		return false;
	};
	_pPlugin.setProperty = function (propId, val) {
		var fname = "set_" + propId;
		var setFn = this[fname];
		if (setFn) {
			setFn.call(this, val);
		}
		else {
			var obj_elem = this._obj_elem;
			if (obj_elem) {
				obj_elem.setElementParam(propId, val);
			}
			else {
				this._params.add_item(propId, val);
			}
		}
	};

	_pPlugin.getProperty = function (propId) {
		var val;
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			val = obj_elem.getElementParam(propId);
		}
		else {
			this._params.get_item(propId);
		}

		if (val == null) {
			val = this[propId];
		}
		return val;
	};

	_pPlugin.callMethod = function () {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			return obj_elem.callMethod.apply(obj_elem, arguments);
		}
	};

	_pPlugin._fireEvent = function () {
		var i, ret;
		var handlers = this._user_handlers;
		var len = handlers.length;

		for (var i = 0; i < len; i++) {
			h = handlers[i];
			if (h) {
				ret = h.handler.apply(h.target, arguments);
			}
		}
		return ret;
	};

	_pPlugin.addEventHandler = function (evt_id, func, target) {
		var ret = false;
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			ret = obj_elem.addEventHandler(evt_id, func);
		}
		if (ret == false) {
			this._events.add_item(evt_id, func);
		}
		if (evt_id in this._event_list == false) {
			this._event_list[evt_id] = 1;
		}
		nexacro.Component.prototype.addEventHandler.call(this, evt_id, func, target);
		if (this[evt_id]) {
			this[evt_id]._firePluginEvent = _pPlugin._fireEvent;
		}
	};
	_pPlugin.removeEventHandler = function (evt_id, func, target) {
		var obj_elem = this._obj_elem;
		if (obj_elem) {
			obj_elem.removeEventHandler(evt_id, func);
		}
		else {
			this._events.delete_item(evt_id);
		}
		nexacro.Component.prototype.removeEventHandler.call(this, evt_id, func, target);
	};
	delete _pPlugin;
}
