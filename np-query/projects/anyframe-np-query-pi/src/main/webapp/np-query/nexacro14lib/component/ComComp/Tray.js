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


if (!nexacro.Tray) {
	nexacro.Tray = function (id, parent) {
		this.id = id;
		this.icon = "default";
		this.tooltip = "";
		this.items = new nexacro.Collection();
		this.name = id;

		this._handle = null;
		this._init_flag = false;

		this._event_list = 
			{
			"onlbuttonup" : 1, 
			"onrbuttonup" : 1, 
			"ondblclick" : 1
		};
	};


	var _pTray = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Tray);
	nexacro.Tray.prototype = _pTray;

	_pTray._type_name = "Tray";

	_pTray.on_created = function () {
		this._handle = nexacro._createTrayHandle(this.icon, this.tooltip);

		var cnt = this.items.length;
		for (var i = 0; i < cnt; i++) {
			this.items[i].on_created();
		}
	};

	_pTray._destroy = function () {
		var cnt = this.items.length;
		for (var i = cnt - 1; i >= 0; i--) {
			this.items.delete_item(i);
		}

		nexacro._removeTrayHandle(this._handle);

		application.trays.delete_item(this.id);
		application.all.delete_item(this.id);
	};




	_pTray.set_id = function (v) {
		if (v != this.id) {
			this.id = this.name = v;
		}
	};

	_pTray.set_name = function (v) {
		if (v != this.name) {
			this.id = this.name = v;
		}
	};

	_pTray.set_icon = function (v) {
		if (v != this.icon) {
			this.icon = v;
		}

		if (this._handle) {
			nexacro._setTrayIconHandle(this._handle, this.icon);
		}
	};

	_pTray.set_tooltip = function (v) {
		if (v != this.tooltip) {
			this.tooltip = v;
		}

		if (this._handle) {
			nexacro._setTrayTooltipHandle(this._handle, this.tooltip);
		}
	};





	_pTray.show = function () {
		if (this._init_flag) {
			this.on_created();
		}
	};

	_pTray.destroy = function () {
		this._destroy();
	};

	_pTray.init = function (id, icon, tooltip) {
		var obj = application.trays[id];
		if (obj && obj._handle == null) {
			this.set_id(id);
			this.set_icon(icon);
			this.set_tooltip(tooltip);

			this._init_flag = true;
		}
	};

	_pTray.showBalloonTip = function (titleicon, title, text, nosound) {
		var bRet = false;
		var timeout = -1;
		if (!nosound) {
			nosound = false;
		}

		nexacro._showTrayBalloonTipHandle(this._handle, titleicon, title, text, timeout, nosound);
	};


	_pTray.addItem = function (id, obj) {
		if (obj._type_name == "TrayPopupMenu") {
			if (this.items.indexOf(id) >= 0) {
				return -1;
			}
			else {
				return this.items.add_item(id, obj);
			}
		}
	};

	_pTray.insertItem = function (index, id, obj) {
		if (obj._type_name == "TrayPopupMenu") {
			if (this.items.indexOf(id) >= 0) {
				return -1;
			}
			else {
				return this.items.insert_item(index, id, obj);
			}
		}
	};

	_pTray.deleteItem = function (id) {
		return this.items.delete_item(id);
	};

	_pTray.findItem = function (id) {
		var find_pos = this.items.indexOf(id);

		if (find_pos == undefined) {
			find_pos = -1;
		}

		return find_pos;
	};

	_pTray.getItemCount = function () {
		var count = this.items.size();
		return count;
	};

	_pTray.destroy = function () {
		this._destroy();
	};

	_pTray.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY) {
		if (this.ondblclick && this.ondblclick._has_handlers) {
			var evt = new nexacro.ClickEventInfo(this, "ondblclick", "lbutton", alt_key, ctrl_key, shift_key, screenX, screenY, -1, -1, -1, -1, this, this);
			return this.ondblclick._fireEvent(this, evt);
		}
		return false;
	};
	_pTray.on_fire_onlbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY) {
		if (this.onlbuttonup && this.onlbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onlbuttonup", "lbutton", alt_key, ctrl_key, shift_key, screenX, screenY, -1, -1, -1, -1, this, this);
			return this.onlbuttonup._fireEvent(this, evt);
		}
		return false;
	};

	_pTray.on_fire_onrbuttonup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY) {
		if (this.onrbuttonup && this.onrbuttonup._has_handlers) {
			var evt = new nexacro.MouseEventInfo(this, "onrbuttonup", "rbutton", alt_key, ctrl_key, shift_key, screenX, screenY, -1, -1, -1, -1, this, this);
			return this.onrbuttonup._fireEvent(this, evt);
		}
		return false;
	};

	delete _pTray;
}
;









if (!nexacro.TrayPopupMenu) {
	nexacro.TrayPopupMenu = function (id, parent) {
		this.id = id;
		this.parent = parent;

		this._popupmenu = null;
		this._handle = null;

		this.innerdataset = "";

		this._innerdataset = "";
		this._level = 0;
		this._rowindex = 0;

		this.captioncolumn = "";
		this.checkboxcolumn = "";
		this.enablecolumn = "";
		this.hotkeycolumn = "";
		this.iconcolumn = "";
		this.idcolumn = "";
		this.levelcolumn = "";
		this.userdatacolumn = "";

		this._event_list = 
			{
			"onmenuclick" : 1
		};
	};

	var _pTrayPopupMenu = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.TrayPopupMenu);
	nexacro.TrayPopupMenu.prototype = _pTrayPopupMenu;

	_pTrayPopupMenu._type_name = "TrayPopupMenu";


	_pTrayPopupMenu.on_created = function () {
		if (this._innerdataset == null && this.innerdataset != null) {
			var str = this.innerdataset;
			this._innerdataset = application._getDatasetObject(str);

			this.on_apply_innerdataset();
		}

		this._handle = nexacro._createTrayPopupMenuHandle(this.parent._handle);
		this._createPopupMenu(this._handle);
	};


	_pTrayPopupMenu._createPopupMenu = function (handle) {
		var ds = this._innerdataset;
		if (ds && this.levelcolumn && this.captioncolumn && this.idcolumn) {
			var len = ds.getRowCount();

			for (var rowindex = this._rowindex; rowindex < len; rowindex++) {
				var level = ds.getColumn(rowindex, this.levelcolumn);

				if (level == this._level) {
					var flags = "string";

					var caption = ds.getColumn(rowindex, this.captioncolumn);
					if (caption == "-") {
						flags = "separator";
					}

					var icon = ds.getColumn(rowindex, this.iconcolumn);
					if (icon) {
						flags = "bitmap";
					}

					var enable = ds.getColumn(rowindex, this.enablecolumn);
					if (enable) {
						if (!nexacro._toBoolean(enable)) {
							flags = "disabled";
						}
					}

					var id = ds.getColumn(rowindex, this.idcolumn);
					if (id) {
						id = rowindex;
					}

					var checkbox = ds.getColumn(rowindex, this.checkboxcolumn);
					if (checkbox) {
						if (nexacro._toBoolean(checkbox)) {
							flags = "checked";
						}
					}

					var userdata = ds.getColumn(rowindex, this.userdatacolumn);
					var icon = ds.getColumn(rowindex, this.iconcolumn);

					var nextlevel = ds.getColumn(rowindex + 1, this.levelcolumn);

					if (nextlevel - level == 1) {
						flags = "popup";

						var sub_handle = nexacro._createTrayPopupMenuHandle(this.parent._handle);

						this._level++;
						this._rowindex = rowindex + 1;
						this._createPopupMenu(sub_handle);

						nexacro._setTrayPopupMenuItemHandle(this.parent._handle, handle, flags, sub_handle, caption, icon);
						this._level--;

						nextlevel = ds.getColumn(this._rowindex + 1, this.levelcolumn);
						if (nextlevel - level < 0) {
							break;
						}
					}
					else if (nextlevel - level < 0) {
						nexacro._setTrayPopupMenuItemHandle(this.parent._handle, handle, flags, id, caption, icon);
						this._rowindex = rowindex;
						break;
					}
					else {
						nexacro._setTrayPopupMenuItemHandle(this.parent._handle, handle, flags, id, caption, icon);
					}
				}
			}
		}
	};

	_pTrayPopupMenu._updatePopupMenu = function (handle) {
		this._level = 0;
		this._rowindex = 0;

		nexacro._destroyTrayPopupMenuHandle(this.parent._handle, handle);

		this._handle = nexacro._createTrayPopupMenuHandle(this.parent._handle);
		this._createPopupMenu(this._handle);
	};

	_pTrayPopupMenu.trackPopup = function () {
		if (this._handle) {
			nexacro._displayTrayPopupMenuHandle(this.parent._handle, this._handle);
			application._current_tray_popup = this;
		}
	};




	_pTrayPopupMenu.set_innerdataset = function (str) {
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
				this._innerdataset = application._getDatasetObject(str);
				this.innerdataset = str;
			}
			this.on_apply_innerdataset();
		}
		else if (this.innerdataset && !this._innerdataset) {
			this._setInnerDatasetStr(this.innerdataset);
			this.on_apply_innerdataset();
		}
	};

	_pTrayPopupMenu.on_apply_innerdataset = function () {
		var ds = this._innerdataset;
		if (ds) {
			var callback = this._callbackFromDataset;
			ds._setEventHandler("onrowposchanged", callback, this);
			ds._setEventHandler("oncolumnchanged", callback, this);
			ds._setEventHandler("onrowsetchanged", callback, this);

			if (this._handle) {
				this._updatePopupMenu(this._handle);
			}
		}
	};

	_pTrayPopupMenu._setInnerDatasetStr = function (str) {
		if (!str) {
			this._innerdataset = null;
			this.innerdataset = "";
		}
		else {
			str = str.replace("@", "");
			this._innerdataset = application._getDatasetObject(str);
			this.innerdataset = str;
		}
	};

	_pTrayPopupMenu.getInnerDataset = function () {
		return this._innerdataset;
	};

	_pTrayPopupMenu.setInnerDataset = function (obj) {
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

	_pTrayPopupMenu.set_captioncolumn = function (v) {
		if (v != this.captioncolumn) {
			this.captioncolumn = v;
			this.on_apply_captioncolumn();
		}
	};

	_pTrayPopupMenu.on_apply_captioncolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_checkboxcolumn = function (v) {
		if (v != this.checkboxcolumn) {
			this.checkboxcolumn = v;
			this.on_apply_checkboxcolumn();
		}
	};

	_pTrayPopupMenu.on_apply_checkboxcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_enablecolumn = function (v) {
		if (v != this.enablecolumn) {
			this.enablecolumn = v;
			this.on_apply_enablecolumn();
		}
	};

	_pTrayPopupMenu.on_apply_enablecolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_hotkeycolumn = function (v) {
		if (v != this.hotkeycolumn) {
			this.hotkeycolumn = v;
			this.on_apply_hotkeycolumn();
		}
	};

	_pTrayPopupMenu.on_apply_hotkeycolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_iconcolumn = function (v) {
		if (v != this.iconcolumn) {
			this.iconcolumn = v;
			this.on_apply_iconcolumn();
		}
	};

	_pTrayPopupMenu.on_apply_iconcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_idcolumn = function (v) {
		if (v != this.idcolumn) {
			this.idcolumn = v;
			this.on_apply_idcolumn();
		}
	};

	_pTrayPopupMenu.on_apply_idcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_levelcolumn = function (v) {
		if (v != this.levelcolumn) {
			this.levelcolumn = v;
			this.on_apply_levelcolumn();
		}
	};

	_pTrayPopupMenu.on_apply_levelcolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};

	_pTrayPopupMenu.set_userdatacolumn = function (v) {
		if (v != this.userdatacolumn) {
			this.userdatacolumn = v;
			this.on_apply_userdatacolumn();
		}
	};

	_pTrayPopupMenu.on_apply_userdatacolumn = function () {
		var ds = this._innerdataset;
		if (ds) {
			this._updatePopupMenu(this._handle);
		}
	};


	_pTrayPopupMenu.on_fire_onmenuclick = function (id) {
		var ds = this._innerdataset;
		var index = id;
		var itemid = ds.getColumn(index, this.idcolumn);
		var itemuserdata = ds.getColumn(index, this.userdatacolumn);
		var level = ds.getColumn(index, this.levelcolumn);

		if (this.onmenuclick && this.onmenuclick._has_handlers) {
			var evt = new nexacro.MenuClickEventInfo(this, "onmenuclick", itemid, itemuserdata, index, level);
			this.onmenuclick._fireEvent(this, evt);
		}
	};
	delete _pTrayPopupMenu;
}
;
