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

if (!nexacro.WebBrowser) {
	nexacro.WebLoadCompEventInfo = function (obj, url, id) {
		this.id = this.eventid = id || "onloadcompleted";
		this.fromobject = this.fromreferenceobject = obj;
		this.url = url;
	};
	var _pWebLoadCompEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.WebLoadCompEventInfo);
	nexacro.WebLoadCompEventInfo.prototype = _pWebLoadCompEventInfo;
	_pWebLoadCompEventInfo._type_name = "WebLoadCompEventInfo";

	delete _pWebLoadCompEventInfo;

	nexacro.WebUserNotifyEventInfo = function (obj, userdata, id) {
		this.id = this.eventid = id || "onusernotify";
		this.fromobject = this.fromreferenceobject = obj;

		this.userdata = userdata;
	};
	var _pWebUserNotifyEventInfo = nexacro._createPrototype(nexacro.Event, nexacro.WebUserNotifyEventInfo);
	nexacro.WebUserNotifyEventInfo.prototype = _pWebUserNotifyEventInfo;
	_pWebUserNotifyEventInfo._type_name = "WebUserNotifyEventInfo";

	delete _pWebUserNotifyEventInfo;


	nexacro.WebBrowser = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._ifrm_elem = null;

		this.window = null;
		this.document = null;
		this.url = "";
		this._url = "";
		this._blockLoadFlag = false;
		this._current_url = "";

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
			"onloadcompleted" : 1, 
			"onusernotify" : 1
		};

		this._accessibility_role = "webbrowser";
	};


	var _pWebBrowser = nexacro._createPrototype(nexacro.Component, nexacro.WebBrowser);
	nexacro.WebBrowser.prototype = _pWebBrowser;

	_pWebBrowser._type_name = "WebBrowser";



	_pWebBrowser.on_get_style_accessibility_label = function () {
		return this.id;
	};



	_pWebBrowser.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			var curstyle = this.currentstyle;

			this._ifrm_elem = new nexacro.WebBrowserPluginElement(control_elem);
			this._ifrm_elem.setElementSize(this._client_width, this._client_height);
		}
	};

	_pWebBrowser.on_created_contents = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.component = this;

			ifrm_elem.create();
			ifrm_elem.initEvent();
			this.document = ifrm_elem._document;
			this.window = ifrm_elem._winodw;

			nexacro._observeSysEvent(ifrm_elem._handle, "mouseover", "onmouseover", this._webbrowser_mouseover);
		}

		if (this._url === "") {
			this._url = "about:blank";
		}

		this.on_apply_style_url();
		this._setAccessibilityOutfocusAction();
	};

	_pWebBrowser.on_destroy_contents = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			nexacro._stopSysObserving(ifrm_elem._handle, "mouseover", "onmouseover", this._webbrowser_mouseover);

			this.window = null;
			this.document = null;
			ifrm_elem.destroy();
			this._ifrm_elem = null;
		}

		var text_elem = this._text_elem;
		if (text_elem) {
			text_elem.destroy();
			this._text_elem = null;
		}
	};

	_pWebBrowser.on_update_position = function (resize_flag, move_flag) {
		nexacro.Component.prototype.on_update_position.call(this, resize_flag, move_flag);
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.on_update_position();
		}
	};


	_pWebBrowser.on_change_containerRect = function (width, height) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.setElementSize(width, height);
		}
	};

	_pWebBrowser.on_fire_onloadcompleted = function (obj, url) {
		if (this.onloadcompleted && this.onloadcompleted._has_handlers) {
			var evt = new nexacro.WebLoadCompEventInfo(obj, url);
			evt.eventid = "onloadcompleted";
			return this.onloadcompleted._fireEvent(this, evt);
		}
		return true;
	};

	_pWebBrowser.on_fire_onusernotify = function (obj, userdata) {
		if (this.onusernotify && this.onusernotify._has_handlers) {
			var evt = new nexacro.WebUserNotifyEventInfo(obj, userdata);
			evt.eventid = "onusernotify";
			return this.onusernotify._fireEvent(this, evt);
		}
		return true;
	};

	_pWebBrowser._getDlgCode = function (keycode, altKey, ctrlKey, shiftKey) {
		var _ifrm_elem = this._ifrm_elem;
		if (_ifrm_elem) {
			if ((!_ifrm_elem._prev_outfocus_message_elem || (_ifrm_elem._prev_outfocus_message_elem._killfocus_flag == true && keycode == nexacro.Event.KEY_UP)) || (!_ifrm_elem._next_outfocus_message_elem || (_ifrm_elem._next_outfocus_message_elem._killfocus_flag == true && keycode == nexacro.Event.KEY_DOWN))) {
				this._want_arrow = false;
			}
			else {
				this._want_arrow = true;
			}
		}

		return {
			want_tab : true, 
			want_return : true, 
			want_escape : false, 
			want_chars : false, 
			want_arrows : this._want_arrow
		};
	};

	_pWebBrowser.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp) {
		var E = nexacro.Event;
		if (keycode == E.KEY_TAB) {
			this._getWindow()._keydown_element._event_stop = false;
		}
		else if (nexacro._enableaccessibility) {
			var ifrm_elem = this._ifrm_elem;
			if (ifrm_elem) {
				if (keycode == E.KEY_UP) {
					if (ifrm_elem._prev_outfocus_message_elem._killfocus_flag == true) {
						ifrm_elem._prev_outfocus_message_elem._killfocus_flag = false;
					}
					else {
						try {
							ifrm_elem._hanle.contentDocument.body.focus();
						}
						catch (e) {
						}
					}
				}
				else if (keycode == E.KEY_DOWN) {
					if (ifrm_elem._next_outfocus_message_elem._killfocus_flag == true) {
						ifrm_elem._next_outfocus_message_elem._killfocus_flag = false;
					}
					else {
						try {
							ifrm_elem._handle.contentDocument.body.focus();
						}
						catch (e) {
						}
					}
				}
			}
		}
		return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
	};

	_pWebBrowser.on_apply_custom_setfocus = function (evt_name) {
		if (nexacro._enableaccessibility) {
			nexacro.Component.prototype.on_apply_custom_setfocus.call(this, evt_name);
		}
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem._setElementFocus();
		}
	};

	_pWebBrowser._webbrowser_mouseover = function (evt) {
		nexacro._cur_drag_info = null;
		nexacro._cur_track_info = null;
	};

	_pWebBrowser.set_text = function (v) {
		v = nexacro._toString(v);

		if (v && v != this.text) {
			this.text = v;
			this._display_text = v.replace(/ /g, "\u00a0");
		}
	};

	_pWebBrowser.set_enable = function (v) {
		v = nexacro._toBoolean(v);
		if (this.enable != v) {
			var control_elem = this._control_element;
			this.enable = v;

			if (this._is_created) {
				var enable_flag = (this.parent._real_enable && v);
				if (this._real_enable != enable_flag) {
					this._real_enable = enable_flag;
					this._stat_change(enable_flag ? "enable" : "disable", this._pseudo);
					this.on_apply_prop_enable(this._real_enable);
					if (this._ifrm_elem) {
						this._ifrm_elem.setElementEnable(enable_flag);
					}
				}
			}
		}
	};

	_pWebBrowser.set_visible = function (v) {
		if (v === undefined || v === null) {
			return;
		}

		v = nexacro._toBoolean(v);

		nexacro.Component.prototype.set_visible.call(this, v);

		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.setElementVisible(v);
		}
	};

	_pWebBrowser.set_cookiesynctype = function (v) {
	};


	_pWebBrowser.set_url = function (v) {
		if (v == undefined) {
			return;
		}

		var val = v.toString();

		if (val != "about:blank" && val.match(/http:\/\/|https:\/\//gi) == null) {
			val = "http://" + val;
		}

		this._url = val;
		this.url = v;

		this.on_apply_style_url();
	};

	_pWebBrowser.on_apply_style_url = function () {
		if (this._url === "http://" || this._url === "https://" || this._url === "") {
			return;
		}

		if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
			var control_elem = this.getElement();
			if (control_elem) {
				if (this._url == "about:blank") {
					if (!this._text_elem) {
						this._text_elem = new nexacro.TextBoxElement(this.getElement());
						this._text_elem.setElementSize(this._client_width, this._client_height);
					}

					this._text_elem.create();
					this._text_elem._setElementAccessibilityRole();
					this._text_elem._setElementAccessibilityLabel();
				}
				else {
					if (this._text_elem) {
						this._text_elem.destroy();
						this._text_elem = null;
					}
				}
			}
		}

		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			this._blockLoadFlag = false;
			ifrm_elem._setUrl(this._url);
		}
	};

	_pWebBrowser.on_apply_style_accessibility = function (accessibility) {
		nexacro.Component.prototype.on_apply_style_accessibility.call(this, accessibility);
		this._setAccessibilityOutfocusAction(accessibility);
	};

	_pWebBrowser.stoploading = function () {
		;
	};

	_pWebBrowser.reload = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			if (this._isCrossDomain(this._current_url, this._getRefFormBaseUrl())) {
				var tmp_url = this._url;
				ifrm_elem._setUrl("");
				ifrm_elem._setUrl(tmp_url);
			}
			else {
				ifrm_elem._setGo();
			}
		}
	};

	_pWebBrowser.goback = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			if (!this._isCrossDomain(this._current_url, this._getRefFormBaseUrl())) {
				ifrm_elem._setBack();
			}
		}
	};

	_pWebBrowser.goforward = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			if (!this._isCrossDomain(this._current_url, this._getRefFormBaseUrl())) {
				ifrm_elem._setForward();
			}
		}
	};

	_pWebBrowser.on_load_handler = function (docurl) {
		if (this._blockLoadFlag) {
			return;
		}
		this._current_url = docurl;
		this.document = this._ifrm_elem._getDoc();
		if (docurl != "about:blank") {
			this._blockLoadFlag = true;
			this.on_fire_onloadcompleted(this, docurl == "" ? this.url : docurl);
		}
	};

	_pWebBrowser.getProperty = function (prop) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			return ifrm_elem.getProperty(prop);
		}
	};

	_pWebBrowser.setProperty = function (prop, value) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.setProperty(prop, value);
		}
	};

	_pWebBrowser.callMethod = function (func) {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			nexacro.WebBrowserPluginElement.prototype.callMethod.apply(ifrm_elem, arguments);
		}
	};

	_pWebBrowser.addEventHandler = function (evt_id, func, target) {
		if (evt_id in this._event_list == false) {
			this._event_list[evt_id] = 1;
		}
		nexacro.Component.prototype.addEventHandler.call(this, evt_id, func, target);
	};

	_pWebBrowser.removeEventHandler = function (evt_id, func, target) {
		nexacro.Component.prototype.removeEventHandler.call(this, evt_id, func, target);
	};

	_pWebBrowser._isCrossDomain = function (url1, url2) {
		if (url1 == "" || url2 == "") {
			return true;
		}
		if (url1.match(regExp)[4] == url2.match(regExp)[4]) {
			return true;
		}
	};
	_pWebBrowser._isCrossDomain = function (url1, url2) {
		if (url1 == "" || url2 == "") {
			return true;
		}
		var regExp = /^(https?):\/\/([^:\/\s]+)(:([^\/]*))?((\/[^\s/\/]+)*)?\/?([^#\s\?]*)(\?([^#\s]*))?(#(\w*))?$/;
		var u1 = url1.match(regExp);
		var u2 = url2.match(regExp);
		if (!u1 || !u2) {
			return true;
		}

		if (u1[2] != u2[2]) {
			return true;
		}
		return false;
	};

	_pWebBrowser._setAccessibilityOutfocusAction = function () {
		var accessibility = this.on_find_CurrentStyle_accessibility("enable");

		if (accessibility) {
			var _ifrm_elem = this._ifrm_elem;
			if (_ifrm_elem) {
				if (_ifrm_elem._prev_outfocus_message_elem) {
					_ifrm_elem._prev_outfocus_message_elem.setElementText(accessibility.action);
				}
				if (_ifrm_elem._next_outfocus_message_elem) {
					_ifrm_elem._next_outfocus_message_elem.setElementText(accessibility.action);
				}
			}
		}
	};

	_pWebBrowser.updateWindow = function () {
		var ifrm_elem = this._ifrm_elem;
		if (ifrm_elem) {
			ifrm_elem.updateWindow();
		}
	};

	delete _pWebBrowser;
}

