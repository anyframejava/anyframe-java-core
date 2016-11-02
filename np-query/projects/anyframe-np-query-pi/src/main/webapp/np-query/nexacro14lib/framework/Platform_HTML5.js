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

if (nexacro.Browser != "Runtime") {
	if (!nexacro._init_platform_HTML5) {
		nexacro._init_platform_HTML5 = true;
		nexacro.isTouchInteraction = (nexacro.Browser == "MobileSafari" || nexacro.OS == "Android" || nexacro.OS == "iOS" || nexacro.OS == "Windows Phone");
		nexacro.SupportOrientation = ((typeof window.orientation != 'undefined') && ('onorientationchange' in window));
		nexacro.SupportTouch = ("ontouchstart" in window || window.navigator.msPointerEnabled || (window.navigator.maxTouchPoints > 1));
		nexacro.SupportAnimationFrame = (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame) ? true : false;
		nexacro._resize_popup_inbound = true;

		nexacro._custom_node_id = null;

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._createSysEvent_ForwardFuncs = function (_cur_win) {
				_cur_win._is_capture = false;
				_cur_win._syshandler_onmousedown_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);

					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var elem = nexacro.__findParentElement(evt.srcElement);
					if (nexacro.Browser != "Edge" && evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON) && !_cur_win._is_capture && !(elem instanceof nexacro.InputElement)) {
						var body = id ? _cur_win.document.getElementById(id) : _cur_win.document.body;
						body.setCapture(false);
						nexacro._observeSysEvent(body, "losecapture", "onlosecapture", _cur_win._syshandler_onlosecapture_forward);
						_cur_win._is_capture = true;
					}

					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);

					return nexacro._syshandler_onmousedown(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_onmouseup_forward = function (evt) {
					evt = _cur_win.event ? _cur_win.event : evt;
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					if (_cur_win._is_capture) {
						var body = id ? _cur_win.document.getElementById(id) : _cur_win.document.body;
						_cur_win._is_capture = false;
						body.releaseCapture();
						nexacro._stopSysObserving(body, "losecapture", "onlosecapture", _cur_win._syshandler_onlosecapture_forward);
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmouseup(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_onlosecapture_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					if (_cur_win._is_capture) {
						_cur_win._is_capture = false;
						var body = id ? _cur_win.document.getElementById(id) : _cur_win.document.body;
						var win = nexacro._findWindow(application._is_attach_childframe ? _cur_win.nexacro_HTMLSysEvent[id]._cur_win : _cur_win.nexacro_HTMLSysEvent._cur_win, id);
						var elem = nexacro.__findParentElement(evt.srcElement);
						body.releaseCapture();

						_cur_win.__clearGC();

						nexacro._stopSysObserving(body, "losecapture", "onlosecapture", _cur_win._syshandler_onlosecapture_forward);

						var ret = win._on_sys_lbuttonup(win._cur_ldown_elem, evt.button, evt.alt, evt.ctrl, evt.shift, evt.wx, evt.wy, evt.sx, evt.sy);

						if (!(elem instanceof nexacro.InputElement)) {
							nexacro._stopSysEvent(evt);
						}

						return ret;
					}
					return true;
				};

				_cur_win._syshandler_lock_onmouseup_forward = nexacro._emptyFn;
				_cur_win._syshandler_onmousemove_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmousemove(htmlSysEvent, evt.srcElement, evt);
				};
				_cur_win._syshandler_lock_onmousemove_forward = nexacro._emptyFn;

				_cur_win._syshandler_ontouchstart_forward = function (evt) {
					if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
						return;
					}

					var id = nexacro._getEvtId(evt);

					var orgevt = evt;

					var evt2 = {
					};
					evt2.srcElement = evt.srcElement;
					evt2.changedTouches = [];

					var touch = {
					};
					touch.clientX = evt.clientX;
					touch.clientY = evt.clientY;
					touch.screenX = evt.screenX;
					touch.screenY = evt.screenY;
					touch.timeStamp = evt.timeStamp;
					touch.identifier = evt.pointerId;

					if (application._is_attach_childframe) {
						touch.currentTarget = evt.currentTarget;
					}

					evt2.changedTouches.push(touch);
					evt = evt2;

					var elem = nexacro.__findParentElement(evt.srcElement);
					if ((elem instanceof nexacro.InputElement) && elem.enable) {
						elem._is_input_touchstart = true;
						elem._on_sys_touchstart();
					}

					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchstart(htmlSysEvent, evt.srcElement, evt, orgevt);
				};
				_cur_win._syshandler_ontouchend_forward = function (evt) {
					if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
						return;
					}

					var id = nexacro._getEvtId(evt);

					var orgevt = evt;

					var evt2 = {
					};
					evt2.srcElement = evt.srcElement;
					evt2.changedTouches = [];

					var touch = {
					};
					touch.clientX = evt.clientX;
					touch.clientY = evt.clientY;
					touch.screenX = evt.screenX;
					touch.screenY = evt.screenY;
					touch.timeStamp = evt.timeStamp;
					touch.identifier = evt.pointerId;

					if (application._is_attach_childframe) {
						touch.currentTarget = evt.currentTarget;
					}

					evt2.changedTouches.push(touch);
					evt = evt2;

					var elem = nexacro.__findParentElement(evt.srcElement);
					if ((elem instanceof nexacro.InputElement) && elem.enable) {
						elem._on_sys_touchend();
					}

					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchend(htmlSysEvent, evt.srcElement, evt, orgevt);
				};
				_cur_win._syshandler_ontouchmove_forward = function (evt) {
					if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
						return;
					}

					var id = nexacro._getEvtId(evt);

					var orgevt = evt;

					var evt2 = {
					};
					evt2.srcElement = evt.srcElement;
					evt2.changedTouches = [];

					var touch = {
					};
					touch.clientX = evt.clientX;
					touch.clientY = evt.clientY;
					touch.screenX = evt.screenX;
					touch.screenY = evt.screenY;
					touch.timeStamp = evt.timeStamp;
					touch.identifier = evt.pointerId;

					if (application._is_attach_childframe) {
						touch.currentTarget = evt.currentTarget;
					}

					evt2.changedTouches.push(touch);
					evt = evt2;

					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchmove(htmlSysEvent, evt.srcElement, evt, orgevt);
				};
				_cur_win._syshandler_ontouchcancel_forward = function (evt) {
					if (evt.pointerType == evt.MSPOINTER_TYPE_MOUSE || evt.pointerType == "mouse") {
						return;
					}

					var evt2 = {
					};
					evt2.srcElement = evt.srcElement;
					evt2.changedTouches = [];

					var id = nexacro._getEvtId(evt);

					var touch = {
					};
					touch.clientX = evt.clientX;
					touch.clientY = evt.clientY;
					touch.screenX = evt.screenX;
					touch.screenY = evt.screenY;
					touch.timeStamp = evt.timeStamp;
					touch.identifier = evt.pointerId;

					if (application._is_attach_childframe) {
						touch.currentTarget = evt.currentTarget;
					}

					evt2.changedTouches.push(touch);
					evt = evt2;

					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchcancel(htmlSysEvent, evt.srcElement, evt);
				};



				_cur_win._syshandler_ondblclick_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ondblclick(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_onmouseover_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmouseover(htmlSysEvent, evt.srcElement, evt.fromElement, evt);
				};
				_cur_win._syshandler_onmouseout_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmouseout(htmlSysEvent, evt.srcElement, evt.toElement, evt);
				};

				_cur_win._syshandler_onkeydown_forward = function (evt) {
					if (_cur_win.event) {
						evt = _cur_win.event;
					}
					var id = nexacro._getEvtId(evt);
					var linked_window = application._is_attach_childframe ? _cur_win._linked_window[id] : _cur_win._linked_window;
					if (linked_window && linked_window.frame._is_popup_frame && nexacro._getSysEventKeyCode(evt) == 116) {
						evt.keyCode = 0;
						evt.cancelBubble = true;
						evt.returnValue = false;
					}

					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onkeydown(htmlSysEvent, evt.srcElement, evt);
				};


				_cur_win._syshandler_onkeypress_forward = function (evt) {
					if (_cur_win.event) {
						evt = _cur_win.event;
					}

					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onkeypress(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_onkeyup_forward = function (evt) {
					if (_cur_win.event) {
						evt = _cur_win.event;
					}

					var id = nexacro._getEvtId(evt);

					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onkeyup(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_onmousewheel_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmousewheel(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_oncontextmenu_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_oncontextmenu(htmlSysEvent, evt.srcElement, evt);
				};
				_cur_win._syshandler_dragstart_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_dragstart(htmlSysEvent, evt.srcElement, evt);
				};
				_cur_win._syshandler_onselectstart_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onselectstart(htmlSysEvent, evt.srcElement, evt);
				};

				_cur_win._syshandler_onactivate_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);

					if (application._is_attach_childframe) {
						if (id == 0) {
							var sysEvents = _cur_win.nexacro_HTMLSysEvent;
							var len = sysEvents.length;
							for (var i = 0; i < len; i++) {
								var sysEvent = sysEvents[i];
								var e_id = sysEvent._custom_node_id;
								var win = nexacro._findWindow(sysEvent._win_win, e_id);
								if (win._is_active_window) {
									id = e_id;
									break;
								}
							}
						}
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onactivate(htmlSysEvent, evt);
				};

				if (nexacro.BrowserVersion <= 8) {
					_cur_win._syshandler_ondeactivate_forward = function (evt) {
						try {
							evt = _cur_win.event;
							var id = nexacro._getEvtId(evt);
							if (evt.toElement || evt.relatedTarget) {
								return true;
							}
							var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
							return nexacro._syshandler_ondeactivate(htmlSysEvent, evt);
						}
						catch (e) {
						}
					};
				}
				else {
					_cur_win._syshandler_ondeactivate_forward = function (evt) {
						evt = _cur_win.event;
						var id = nexacro._getEvtId(evt);
						if (evt.toElement || evt.relatedTarget) {
							return true;
						}
						var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
						return nexacro._syshandler_ondeactivate(htmlSysEvent, evt);
					};
				}

				_cur_win._syshandler_onbeforeclose_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onbeforeclose(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onclose_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onclose(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onresize_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onresize(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onorientationchange_forward = function (evt) {
					evt = _cur_win.event;
					return nexacro._syshandler_onorientationchange(application._is_attach_childframe ? _cur_win.nexacro_HTMLSysEvent[evt.currentTarget.id] : _cur_win.nexacro_HTMLSysEvent, evt);
				};
				_cur_win._syshandler_onmove_forward = function (evt) {
					try {
						var oldX = _cur_win._old_screenx;
						var oldY = _cur_win._old_screeny;

						if (oldX != _cur_win.screenLeft || oldY != _cur_win.screenTop) {
							_cur_win._old_screenx = _cur_win.screenLeft;
							_cur_win._old_screeny = _cur_win.screenTop;

							evt = _cur_win.event;
							var id = nexacro._getEvtId(evt);
							var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
							return nexacro._syshandler_onmove(htmlSysEvent, evt);
						}
					}
					catch (e) {
					}
				};
				_cur_win._syshandler_onload_forward = function (evt) {
					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onload(htmlSysEvent, evt);
				};
			};
		}
		else if (nexacro.Browser != "IE") {
			nexacro._createSysEvent_ForwardFuncs = function (_cur_win) {
				_cur_win._syshandler_onmousedown_forward = function (evt) {
					var id = nexacro._getEvtId(evt);

					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					if (nexacro.isTouchInteraction) {
						if (nexacro.OS == "Android") {
							var win = nexacro._findWindow(_cur_win, id);
							var elem = nexacro.__findParentElement(evt.target);

							if (elem) {
								if ((elem instanceof nexacro.InputElement) && elem.enable) {
									if (elem._checkInputAutoSelect()) {
									}
								}
								else {
									var last_focused_elem = win._last_focused_elem;
									if (last_focused_elem && (last_focused_elem instanceof nexacro.InputElement)) {
										nexacro.__setDOMNodeReadOnly(last_focused_elem._input_handle, true);
									}
									evt.preventDefault();
								}
							}
						}
						else {
							if (elem && !(elem instanceof nexacro.InputElement)) {
								evt.stopPropagation();
								evt.preventDefault();
							}
						}
						return false;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmousedown(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_onmouseup_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					if (nexacro.isTouchInteraction) {
						if (nexacro.OS == "Android") {
						}
						else {
							evt.stopPropagation();
							evt.preventDefault();
						}
						return false;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmouseup(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_lock_onmouseup_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_lock_onmouseup(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_onmousemove_forward = function (evt) {
					var id = nexacro._getEvtId(evt);

					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					if (nexacro.isTouchInteraction) {
						if (nexacro.OS == "Android") {
						}
						else {
							evt.stopPropagation();
							evt.preventDefault();
						}
						return false;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmousemove(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_lock_onmousemove_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_lock_onmousemove(htmlSysEvent, evt.target, evt);
				};

				_cur_win._syshandler_ontouchstart_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var elem = nexacro.__findParentElement(evt.target);
					if ((elem instanceof nexacro.InputElement) && elem.enable) {
						elem._is_input_touchstart = true;
						elem._on_sys_touchstart();
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchstart(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_ontouchend_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var elem = nexacro.__findParentElement(evt.target);
					if ((elem instanceof nexacro.InputElement) && elem.enable) {
						elem._on_sys_touchend();
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchend(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_ontouchmove_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var elem = nexacro.__findParentElement(evt.target);
					if ((elem instanceof nexacro.InputElement) && elem.enable) {
						elem._on_sys_touchmove();
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchmove(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_ontouchcancel_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var elem = nexacro.__findParentElement(evt.target);
					if ((elem instanceof nexacro.InputElement) && elem.enable) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ontouchcancel(htmlSysEvent, evt.target, evt);
				};


				_cur_win._syshandler_ondblclick_forward = function (evt) {
					var id = nexacro._getEvtId(evt);

					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					if (nexacro.isTouchInteraction) {
						if (nexacro.OS == "Android") {
						}
						else {
							evt.stopPropagation();
							evt.preventDefault();
						}
						return false;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ondblclick(htmlSysEvent, evt.target, evt);
				};

				_cur_win._syshandler_onmouseover_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmouseover(htmlSysEvent, evt.target, evt.relatedTarget, evt);
				};
				_cur_win._syshandler_onmouseout_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmouseout(htmlSysEvent, evt.target, evt.relatedTarget, evt);
				};

				_cur_win._syshandler_onkeydown_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var linked_window = application._is_attach_childframe ? _cur_win._linked_window[id] : _cur_win._linked_window;
					if (!nexacro.__getWindowHandleEnable(_cur_win, id) || (linked_window.frame._is_popup_frame && nexacro._getSysEventKeyCode(evt) == 116)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onkeydown(htmlSysEvent, evt.target, evt);
				};

				_cur_win._syshandler_onkeypress_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onkeypress(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_onkeyup_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onkeyup(htmlSysEvent, evt.target, evt);
				};

				_cur_win._syshandler_onmousewheel_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					if (!nexacro.__getWindowHandleEnable(_cur_win, id)) {
						nexacro._stopSysEvent(evt);
						return;
					}
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onmousewheel(htmlSysEvent, evt.target, evt);
				};

				_cur_win._syshandler_oncontextmenu_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_oncontextmenu(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_dragstart_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_dragstart(htmlSysEvent, evt.target, evt);
				};
				_cur_win._syshandler_onselectstart_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onselectstart(htmlSysEvent, evt.target, evt);
				};

				_cur_win._syshandler_onactivate_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onactivate(htmlSysEvent, evt);
				};
				_cur_win._syshandler_ondeactivate_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_ondeactivate(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onbeforeclose_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onbeforeclose(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onclose_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onclose(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onresize_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onresize(htmlSysEvent, evt);
				};
				_cur_win._syshandler_onorientationchange_forward = function (evt) {
					var reset_viewport = nexacro._searchDeviceExceptionValue("orientationchange_reset_viewport");
					if (nexacro.OS == "Android" && reset_viewport) {
						var _tester = nexacro._device_exception_tester;
						if (_tester.screen_checked && _tester.screen_swap_checked == false) {
							if (_tester.is_init_screen_portrait != nexacro._isPortrait()) {
								if (_tester.init_screen_width == nexacro._getScreenWidth()) {
									_tester.swap_screen = false;
								}
								else {
									_tester.swap_screen = true;
								}
								_tester.screen_swap_checked = true;
							}
						}

						var delayed_swap_screen = _tester.delayed_swap_screen;
						if (delayed_swap_screen === undefined) {
							delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
						}
						if (delayed_swap_screen == true) {
							_tester.swap_screen_timer = setInterval(function () {
								var p_w = _tester["portrait_screen_width"];
								var l_w = _tester["landscape_screen_width"];
								var is_changed = false;
								if (!nexacro._isPortrait() && ((p_w && p_w != nexacro._getScreenWidth()) || (l_w && l_w == nexacro._getScreenWidth()))) {
									is_changed = true;
								}
								else if (nexacro._isPortrait() && ((l_w && l_w != nexacro._getScreenWidth()) || (p_w && p_w == nexacro._getScreenWidth()))) {
									is_changed = true;
								}
								if (is_changed) {
									clearInterval(_tester.swap_screen_timer);
									_tester.swap_screen_timer = null;

									nexacro.__setViewportScale();
								}
							}, 100);
						}
						else {
							var reset_viewport_delay = nexacro._searchDeviceExceptionValue("reset_viewport_delay");
							if (reset_viewport_delay <= 0) {
								nexacro.__setViewportScale();
							}
							else {
								setTimeout(function () {
									nexacro.__setViewportScale();
								}, parseInt(reset_viewport_delay));
							}

							if (_tester.swap_screen == false && _tester.delayed_swap_screen_checked == false) {
								_tester.delayed_swap_screen_check_cnt = 0;
								if (_tester.swap_screen_timer) {
									clearInterval(_tester.swap_screen_timer);
								}
								_tester.swap_screen_timer = setInterval(function () {
									var p_w = _tester["portrait_screen_width"];
									var l_w = _tester["landscape_screen_width"];
									var is_changed = false;
									if (!nexacro._isPortrait() && ((p_w && p_w != nexacro._getScreenWidth()) || (l_w && l_w == nexacro._getScreenWidth()))) {
										is_changed = true;
									}
									else if (nexacro._isPortrait() && ((l_w && l_w != nexacro._getScreenWidth()) || (p_w && p_w == nexacro._getScreenWidth()))) {
										is_changed = true;
									}
									if (is_changed || _tester.delayed_swap_screen_check_cnt == 10) {
										clearInterval(_tester.swap_screen_timer);
										_tester.swap_screen_timer = null;
										_tester.delayed_swap_screen = is_changed;
										_tester.delayed_swap_screen_checked = true;

										if (is_changed) {
											nexacro.__setViewportScale();
										}
										return;
									}

									_tester.delayed_swap_screen_check_cnt++;
								}, 100);
							}
						}
					}

					evt = _cur_win.event;
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onorientationchange(htmlSysEvent, evt);
				};

				_cur_win._syshandler_onmove_forward = function (evt) {
					try {
						var oldX = _cur_win._old_screenx;
						var oldY = _cur_win._old_screeny;

						if (oldX != _cur_win.screenX || oldY != _cur_win.screenY) {
							_cur_win._old_screenx = _cur_win.screenX;
							_cur_win._old_screeny = _cur_win.screenY;

							evt = _cur_win.event;
							var id = nexacro._getEvtId(evt);
							var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
							return nexacro._syshandler_onmove(htmlSysEvent, evt);
						}
					}
					catch (e) {
					}
				};
				_cur_win._syshandler_onload_forward = function (evt) {
					var id = nexacro._getEvtId(evt);
					var htmlSysEvent = nexacro._getHtmlSysEvent(_cur_win.nexacro_HTMLSysEvent, id);
					return nexacro._syshandler_onload(htmlSysEvent, evt);
				};
			};
		}


		nexacro.HTMLSysEvent = function (_win_win, _win_doc, _cur_win, _cur_doc) {
			this._win_win = _win_win;
			this._win_doc = _win_doc;
			this._cur_win = _cur_win;
			this._cur_doc = _cur_doc;

			this._cur_over_elem = null;

			this._custom_node_id = null;

			this._syshandler_onmousedown_forward = _cur_win._syshandler_onmousedown_forward;
			this._syshandler_onmouseup_forward = _cur_win._syshandler_onmouseup_forward;
			this._syshandler_lock_onmouseup_forward = _cur_win._syshandler_lock_onmouseup_forward;
			this._syshandler_onmousemove_forward = _cur_win._syshandler_onmousemove_forward;
			this._syshandler_lock_onmousemove_forward = _cur_win._syshandler_lock_onmousemove_forward;
			this._syshandler_ontouchstart_forward = _cur_win._syshandler_ontouchstart_forward;
			this._syshandler_ontouchend_forward = _cur_win._syshandler_ontouchend_forward;
			this._syshandler_ontouchmove_forward = _cur_win._syshandler_ontouchmove_forward;
			this._syshandler_ontouchcancel_forward = _cur_win._syshandler_ontouchcancel_forward;
			this._syshandler_ondblclick_forward = _cur_win._syshandler_ondblclick_forward;
			this._syshandler_onmouseover_forward = _cur_win._syshandler_onmouseover_forward;
			this._syshandler_onmouseout_forward = _cur_win._syshandler_onmouseout_forward;
			this._syshandler_onkeydown_forward = _cur_win._syshandler_onkeydown_forward;
			this._syshandler_onkeypress_forward = _cur_win._syshandler_onkeypress_forward;
			this._syshandler_onkeyup_forward = _cur_win._syshandler_onkeyup_forward;
			this._syshandler_onmousewheel_forward = _cur_win._syshandler_onmousewheel_forward;
			this._syshandler_oncontextmenu_forward = _cur_win._syshandler_oncontextmenu_forward;
			this._syshandler_dragstart_forward = _cur_win._syshandler_dragstart_forward;
			this._syshandler_onselectstart_forward = _cur_win._syshandler_onselectstart_forward;
			this._syshandler_onactivate_forward = _cur_win._syshandler_onactivate_forward;
			this._syshandler_ondeactivate_forward = _cur_win._syshandler_ondeactivate_forward;
			this._syshandler_onbeforeclose_forward = _cur_win._syshandler_onbeforeclose_forward;
			this._syshandler_onclose_forward = _cur_win._syshandler_onclose_forward;
			this._syshandler_onresize_forward = _cur_win._syshandler_onresize_forward;
			this._syshandler_onorientationchange_forward = _cur_win._syshandler_onorientationchange_forward;
			this._syshandler_onmove_forward = _cur_win._syshandler_onmove_forward;
			this._syshandler_onload_forward = _cur_win._syshandler_onload_forward;

			_cur_win._syshandler_onmousedown_forward = null;
			_cur_win._syshandler_onmouseup_forward = null;
			_cur_win._syshandler_lock_onmouseup_forward = null;
			_cur_win._syshandler_onmousemove_forward = null;
			_cur_win._syshandler_lock_onmousemove_forward = null;
			_cur_win._syshandler_ontouchstart_forward = null;
			_cur_win._syshandler_ontouchend_forward = null;
			_cur_win._syshandler_ontouchmove_forward = null;
			_cur_win._syshandler_ontouchcancel_forward = null;
			_cur_win._syshandler_ondblclick_forward = null;
			_cur_win._syshandler_onmouseover_forward = null;
			_cur_win._syshandler_onmouseout_forward = null;
			_cur_win._syshandler_onkeydown_forward = null;
			_cur_win._syshandler_onkeypress_forward = null;
			_cur_win._syshandler_onkeyup_forward = null;
			_cur_win._syshandler_onmousewheel_forward = null;
			_cur_win._syshandler_oncontextmenu_forward = null;
			_cur_win._syshandler_dragstart_forward = null;
			_cur_win._syshandler_onselectstart_forward = null;
			_cur_win._syshandler_onactivate_forward = null;
			_cur_win._syshandler_ondeactivate_forward = null;
			_cur_win._syshandler_onbeforeclose_forward = null;
			_cur_win._syshandler_onclose_forward = null;
			_cur_win._syshandler_onresize_forward = null;
			_cur_win._syshandler_onorientationchange_forward = null;
			_cur_win._syshandler_onmove_forward = null;
			_cur_win._syshandler_onload_forward = null;
		};
		var _pHTMLSysEvent = nexacro.HTMLSysEvent.prototype;

		_pHTMLSysEvent.KEY_BACKSPACE = 8;
		_pHTMLSysEvent.KEY_TAB = 9;
		_pHTMLSysEvent.KEY_RETURN = 13;
		_pHTMLSysEvent.KEY_ESC = 27;
		_pHTMLSysEvent.KEY_SPACE = 32;
		_pHTMLSysEvent.KEY_LEFT = 37;
		_pHTMLSysEvent.KEY_UP = 38;
		_pHTMLSysEvent.KEY_RIGHT = 39;
		_pHTMLSysEvent.KEY_DOWN = 40;
		_pHTMLSysEvent.KEY_DELETE = 46;
		_pHTMLSysEvent.KEY_HOME = 36;
		_pHTMLSysEvent.KEY_END = 35;
		_pHTMLSysEvent.KEY_PAGEUP = 33;
		_pHTMLSysEvent.KEY_PAGEDOWN = 34;
		_pHTMLSysEvent.KEY_INSERT = 45;

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 11) {
			_pHTMLSysEvent.MOUSE_LBUTTON = 1;
			_pHTMLSysEvent.MOUSE_MBUTTON = 4;
			_pHTMLSysEvent.MOUSE_RBUTTON = 2;
		}
		else {
			_pHTMLSysEvent.MOUSE_LBUTTON = 0;
			_pHTMLSysEvent.MOUSE_MBUTTON = 1;
			_pHTMLSysEvent.MOUSE_RBUTTON = 2;
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pHTMLSysEvent._initDocEventHandler = function () {
				var _cur_win = this._cur_win;
				var _cur_doc = this._cur_doc;
				var body = this._custom_node_id ? this._cur_doc.getElementById(this._custom_node_id) : this._cur_doc.body;
				nexacro._observeSysEvent(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
				nexacro._observeSysEvent(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
				nexacro._observeSysEvent(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
				if (nexacro.SupportTouch) {
					if (nexacro.Browser == "Edge") {
						nexacro._observeSysEvent(_cur_win, "pointerdown", "ontouchstart", this._syshandler_ontouchstart_forward);
						nexacro._observeSysEvent(_cur_win, "pointerup", "ontouchend", this._syshandler_ontouchend_forward);
						nexacro._observeSysEvent(_cur_win, "pointermove", "ontouchmove", this._syshandler_ontouchmove_forward);
						nexacro._observeSysEvent(_cur_win, "pointercancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
					}
					else {
						nexacro._observeSysEvent(_cur_win, "MSPointerDown", "ontouchstart", this._syshandler_ontouchstart_forward);
						nexacro._observeSysEvent(_cur_win, "MSPointerUp", "ontouchend", this._syshandler_ontouchend_forward);
						nexacro._observeSysEvent(_cur_win, "MSPointerMove", "ontouchmove", this._syshandler_ontouchmove_forward);
						nexacro._observeSysEvent(_cur_win, "MSPointerCancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
					}
				}
				nexacro._observeSysEvent(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
				nexacro._observeSysEvent(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
				nexacro._observeSysEvent(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
				nexacro._observeSysEvent(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
				nexacro._observeSysEvent(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
				nexacro._observeSysEvent(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
				nexacro._observeSysEvent(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
				if (!nexacro.isTouchInteraction) {
					nexacro._observeSysEvent(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
				}
				nexacro._observeSysEvent(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
				nexacro._observeSysEvent(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);
				nexacro._observeSysEvent(body, "select", "onselect", this._syshandler_onselectstart_forward);

				nexacro._observeSysEvent(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
				nexacro._observeSysEvent(_cur_doc, "focusout", "onfocusout", this._syshandler_ondeactivate_forward);
				nexacro._observeSysEvent(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
				nexacro._observeSysEvent(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
				nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
				nexacro._observeSysEvent(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);

				nexacro._observeSysEvent(body, "load", "onload", this._syshandler_onload_forward);

				this._startDetectWindowMove();
			};
			_pHTMLSysEvent._stopDocEventHandler = function () {
				var _cur_win = this._cur_win;
				var _cur_doc = this._cur_doc;
				var body = this._custom_node_id ? this._cur_doc.getElementById(this._custom_node_id) : this._cur_doc.body;

				this._stopDetectWindowMove();

				nexacro._stopSysObserving(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
				nexacro._stopSysObserving(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
				nexacro._stopSysObserving(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
				if (nexacro.SupportTouch) {
					if (nexacro.Browser == "Edge") {
						nexacro._stopSysObserving(_cur_win, "pointerdown", "ontouchstart", this._syshandler_ontouchstart_forward);
						nexacro._stopSysObserving(_cur_win, "pointerup", "ontouchend", this._syshandler_ontouchend_forward);
						nexacro._stopSysObserving(_cur_win, "pointermove", "ontouchmove", this._syshandler_ontouchmove_forward);
						nexacro._stopSysObserving(_cur_win, "pointercancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
					}
					else {
						nexacro._stopSysObserving(_cur_win, "MSPointerDown", "ontouchstart", this._syshandler_ontouchstart_forward);
						nexacro._stopSysObserving(_cur_win, "MSPointerUp", "ontouchend", this._syshandler_ontouchend_forward);
						nexacro._stopSysObserving(_cur_win, "MSPointerMove", "ontouchmove", this._syshandler_ontouchmove_forward);
						nexacro._stopSysObserving(_cur_win, "MSPointerCancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
					}
				}
				nexacro._stopSysObserving(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
				nexacro._stopSysObserving(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
				nexacro._stopSysObserving(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
				nexacro._stopSysObserving(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
				nexacro._stopSysObserving(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
				nexacro._stopSysObserving(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
				nexacro._stopSysObserving(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
				if (!nexacro.isTouchInteraction) {
					nexacro._stopSysObserving(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
				}
				nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
				nexacro._stopSysObserving(body, "select", "onselect", this._syshandler_onselectstart_forward);
				nexacro._stopSysObserving(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);

				nexacro._stopSysObserving(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
				nexacro._stopSysObserving(_cur_doc, "focusout", "onfocusout", this._syshandler_ondeactivate_forward);
				nexacro._stopSysObserving(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
				nexacro._stopSysObserving(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
				nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
				nexacro._stopSysObserving(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);

				nexacro._stopSysObserving(body, "load", "onload", this._syshandler_onload_forward);
			};

			_pHTMLSysEvent.lockMouseMove = function (node) {
			};
			_pHTMLSysEvent.unloackMouseMove = function (node) {
			};
		}
		else if (nexacro.Browser != "IE") {
			_pHTMLSysEvent._initDocEventHandler = function () {
				var _cur_win = this._cur_win;
				var body = this._custom_node_id ? this._cur_doc.getElementById(this._custom_node_id) : this._cur_doc.body;

				nexacro._observeSysEvent(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
				nexacro._observeSysEvent(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
				nexacro._observeSysEvent(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
				if (nexacro.SupportTouch) {
					nexacro._observeSysEvent(body, "touchstart", "ontouchstart", this._syshandler_ontouchstart_forward);
					nexacro._observeSysEvent(body, "touchend", "ontouchend", this._syshandler_ontouchend_forward);
					nexacro._observeSysEvent(body, "touchmove", "ontouchmove", this._syshandler_ontouchmove_forward);
					nexacro._observeSysEvent(body, "touchcancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
				}
				nexacro._observeSysEvent(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
				nexacro._observeSysEvent(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
				nexacro._observeSysEvent(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
				nexacro._observeSysEvent(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
				nexacro._observeSysEvent(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
				nexacro._observeSysEvent(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
				nexacro._observeSysEvent(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
				nexacro._observeSysEvent(body, "DOMMouseScroll", "onDOMMouseScroll", this._syshandler_onmousewheel_forward);
				if (!nexacro.isTouchInteraction) {
					nexacro._observeSysEvent(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
				}
				nexacro._observeSysEvent(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
				nexacro._observeSysEvent(body, "select", "onselect", this._syshandler_onselectstart_forward);
				nexacro._observeSysEvent(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);

				nexacro._observeSysEvent(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
				nexacro._observeSysEvent(_cur_win, "blur", "onblur", this._syshandler_ondeactivate_forward);
				nexacro._observeSysEvent(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
				nexacro._observeSysEvent(_cur_win, "beforeunload", "onbeforeunload", this._syshandler_onbeforeclose_forward);
				if (nexacro.SupportOrientation) {
					nexacro._observeSysEvent(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);
					nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
				}
				else {
					nexacro._observeSysEvent(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
				}

				nexacro._observeSysEvent(body, "load", "onload", this._syshandler_onload_forward);

				this._startDetectWindowMove();
			};
			_pHTMLSysEvent._stopDocEventHandler = function () {
				var _cur_win = this._cur_win;
				var body = this._custom_node_id ? this._cur_doc.getElementById(this._custom_node_id) : this._cur_doc.body;

				this._stopDetectWindowMove();

				nexacro._stopSysObserving(body, "mousedown", "onmousedown", this._syshandler_onmousedown_forward);
				nexacro._stopSysObserving(body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
				nexacro._stopSysObserving(body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
				if (nexacro.SupportTouch) {
					nexacro._stopSysObserving(body, "touchstart", "ontouchstart", this._syshandler_ontouchstart_forward);
					nexacro._stopSysObserving(body, "touchend", "ontouchend", this._syshandler_ontouchend_forward);
					nexacro._stopSysObserving(body, "touchmove", "ontouchmove", this._syshandler_ontouchmove_forward);
					nexacro._stopSysObserving(body, "touchcancel", "ontouchcancel", this._syshandler_ontouchcancel_forward);
				}
				nexacro._stopSysObserving(body, "dblclick", "ondblclick", this._syshandler_ondblclick_forward);
				nexacro._stopSysObserving(body, "mouseover", "onmouseover", this._syshandler_onmouseover_forward);
				nexacro._stopSysObserving(body, "mouseout", "onmouseout", this._syshandler_onmouseout_forward);
				nexacro._stopSysObserving(body, "keydown", "onkeydown", this._syshandler_onkeydown_forward);
				nexacro._stopSysObserving(body, "keypress", "onkeypress", this._syshandler_onkeypress_forward);
				nexacro._stopSysObserving(body, "keyup", "onkeyup", this._syshandler_onkeyup_forward);
				nexacro._stopSysObserving(body, "mousewheel", "onmousewheel", this._syshandler_onmousewheel_forward);
				nexacro._stopSysObserving(body, "DOMMouseScroll", "onDOMMouseScroll", this._syshandler_onmousewheel_forward);
				if (!nexacro.isTouchInteraction) {
					nexacro._stopSysObserving(body, "contextmenu", "oncontextmenu", this._syshandler_oncontextmenu_forward);
				}
				nexacro._stopSysObserving(body, "dragstart", "ondragstart", this._syshandler_dragstart_forward);
				nexacro._stopSysObserving(body, "select", "onselect", this._syshandler_onselectstart_forward);
				nexacro._stopSysObserving(body, "selectstart", "onselectstart", this._syshandler_onselectstart_forward);

				nexacro._stopSysObserving(_cur_win, "focus", "onfocus", this._syshandler_onactivate_forward);
				nexacro._stopSysObserving(_cur_win, "blur", "onblur", this._syshandler_ondeactivate_forward);
				nexacro._stopSysObserving(_cur_win, "unload", "onunload", this._syshandler_onclose_forward);
				if (nexacro.SupportOrientation) {
					nexacro._stopSysObserving(_cur_win, "orientationchange", "onorientationchange", this._syshandler_onorientationchange_forward);
					nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
				}
				else {
					nexacro._stopSysObserving(_cur_win, "resize", "onresize", this._syshandler_onresize_forward);
				}

				nexacro._stopSysObserving(body, "load", "onload", this._syshandler_onload_forward);
			};

			_pHTMLSysEvent.lockMouseMove = function (node) {
				var _cur_body = this._custom_node_id ? this._cur_doc.getElementById(this._custom_node_id) : this._cur_doc.body;
				nexacro._stopSysObserving(_cur_body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
				nexacro._stopSysObserving(_cur_body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
				nexacro._observeSysEvent(this._custom_node_id ? _cur_body : this._win_win, "mousemove", "onmousemove", this._syshandler_lock_onmousemove_forward, true);
				nexacro._observeSysEvent(this._custom_node_id ? _cur_body : this._win_win, "mouseup", "onmouseup", this._syshandler_lock_onmouseup_forward, true);
			};
			_pHTMLSysEvent.unlockMouseMove = function (node) {
				var _cur_body = this._custom_node_id ? this._cur_doc.getElementById(this._custom_node_id) : this._cur_doc.body;
				nexacro._stopSysObserving(this._custom_node_id ? _cur_body : this._win_win, "mousemove", "onmousemove", this._syshandler_lock_onmousemove_forward, true);
				nexacro._stopSysObserving(this._custom_node_id ? _cur_body : this._win_win, "mouseup", "onmouseup", this._syshandler_lock_onmouseup_forward, true);
				nexacro._observeSysEvent(_cur_body, "mousemove", "onmousemove", this._syshandler_onmousemove_forward);
				nexacro._observeSysEvent(_cur_body, "mouseup", "onmouseup", this._syshandler_onmouseup_forward);
			};
		}

		_pHTMLSysEvent._move_detect_timer = -1;
		_pHTMLSysEvent._startDetectWindowMove = function () {
			var _cur_win = this._cur_win;
			_cur_win._old_screenx = _cur_win.screenX ? _cur_win.screenX : _cur_win.screenLeft;
			_cur_win._old_screeny = _cur_win.screenY ? _cur_win.screenY : _cur_win.screenTop;

			var interval = setInterval(this._syshandler_onmove_forward, 500);
			this._move_detect_timer = interval;
		};
		_pHTMLSysEvent._stopDetectWindowMove = function () {
			if (this._move_detect_timer) {
				clearInterval(this._move_detect_timer);
				this._move_detect_timer = null;
			}
		};

		_pHTMLSysEvent.clearAll = function () {
			this._stopDetectWindowMove();

			this._win_win = null;
			this._win_doc = null;
			this._cur_win = null;
			this._cur_doc = null;

			this._cur_over_elem = null;

			this._custom_node_id = null;

			this._syshandler_onmousedown_forward = null;
			this._syshandler_onmouseup_forward = null;
			this._syshandler_lock_onmouseup_forward = null;
			this._syshandler_onmousemove_forward = null;
			this._syshandler_lock_onmousemove_forward = null;
			this._syshandler_ontouchstart_forward = null;
			this._syshandler_ontouchend_forward = null;
			this._syshandler_ontouchmove_forward = null;
			this._syshandler_ontouchcancel_forward = null;
			this._syshandler_ondblclick_forward = null;
			this._syshandler_onmouseover_forward = null;
			this._syshandler_onmouseout_forward = null;
			this._syshandler_onkeydown_forward = null;
			this._syshandler_onkeypress_forward = null;
			this._syshandler_onkeyup_forward = null;
			this._syshandler_onmousewheel_forward = null;
			this._syshandler_oncontextmenu_forward = null;
			this._syshandler_dragstart_forward = null;
			this._syshandler_onselectstart_forward = null;
			this._syshandler_onactivate_forward = null;
			this._syshandler_ondeactivate_forward = null;
			this._syshandler_onbeforeclose_forward = null;
			this._syshandler_onclose_forward = null;
			this._syshandler_onresize_forward = null;
			this._syshandler_onorientationchange_forward = null;
			this._syshandler_onmove_forward = null;
			this._syshandler_onload_forward = null;
		};

		delete _pHTMLSysEvent;

		nexacro.__getRealWindowHandle = function (_cur_win) {
			var _cur_nexacro = _cur_win.nexacro;
			var p = _cur_win;
			try {
				while (true) {
					if (p.parent && p != p.parent && p.parent.nexacro && p.parent.nexacro == _cur_nexacro) {
						p = p.parent;
					}
					else {
						break;
					}
				}
			}
			catch (e) {
			}

			return p;
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 6) {
			nexacro._initHTMLSysEvent = function (_cur_win, _cur_doc) {
				document.execCommand('BackgroundImageCache', false, true);

				if (application._is_attach_childframe) {
					if (!_cur_win.nexacro_HTMLSysEvent) {
						_cur_win.nexacro_HTMLSysEvent = new nexacro.Collection();
					}
				}

				var _win_win = nexacro.__getRealWindowHandle(_cur_win);
				var _win_doc = _win_win ? _win_win.document : document;

				nexacro._createWindowGC_Funcs(_cur_win);
				_cur_win.__createGC();

				nexacro._createSysEvent_ForwardFuncs(_cur_win);
				var _sysEvent;
				if (application._is_attach_childframe) {
					var _sysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
					_cur_win.nexacro_HTMLSysEvent.add_item(nexacro._custom_node_id, _sysEvent);
				}
				else {
					_sysEvent = _cur_win.nexacro_HTMLSysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
				}
				_sysEvent._custom_node_id = nexacro._custom_node_id;
				_sysEvent._initDocEventHandler();
			};
		}
		else {
			nexacro._initHTMLSysEvent = function (_cur_win, _cur_doc) {
				if (application._is_attach_childframe) {
					if (!_cur_win.nexacro_HTMLSysEvent) {
						_cur_win.nexacro_HTMLSysEvent = new nexacro.Collection();
					}
				}
				else {
					_cur_win.nexacro_HTMLSysEvent = [];
				}
				var _win_win = nexacro.__getRealWindowHandle(_cur_win);
				var _win_doc = _win_win ? _win_win.document : document;

				nexacro._createWindowGC_Funcs(_cur_win);
				_cur_win.__createGC();

				nexacro._initHTMLSysTimerManager(_cur_win);

				nexacro._createSysEvent_ForwardFuncs(_cur_win);

				var _sysEvent;
				if (application._is_attach_childframe) {
					_sysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
					_cur_win.nexacro_HTMLSysEvent.add_item(nexacro._custom_node_id, _sysEvent);
				}
				else {
					_sysEvent = _cur_win.nexacro_HTMLSysEvent = new nexacro.HTMLSysEvent(_win_win, _win_doc, _cur_win, _cur_doc);
				}
				_sysEvent._custom_node_id = nexacro._custom_node_id;
				_sysEvent._initDocEventHandler();
			};
		}

		nexacro._finalizeHTMLSysEvent = function (_cur_win, id) {
			_cur_win.__createGC = null;
			_cur_win.__clearGC = null;
			_cur_win.__destroyGC = null;

			if (application && application._is_attach_childframe) {
				var htmlsysevent = _cur_win.nexacro_HTMLSysEvent;
				htmlsysevent.delete_item(id);
				if (htmlsysevent && htmlsysevent.length == 0) {
					htmlsysevent = null;
				}
			}
			else {
				_cur_win.nexacro_HTMLSysEvent = null;
			}
		};

		nexacro._preparePopupFrame = function (_cur_win, _cur_doc) {
			nexacro._initHTMLSysEvent(_cur_win, _cur_doc);
			nexacro._prepareManagerFrame();
			nexacro._initializeGlobalObjects(_cur_win);
			application._RegisterClass(_cur_win);
		};

		nexacro._createPopupFrame = function (_cur_win, urlparams) {
			var name = urlparams["framename"];

			var parent_win = nexacro._findWindow(_cur_win.opener | parent);
			var _win = new nexacro.Window(name, parent_win);
			_win.setLinkedWindow(_cur_win);
			if (parent_win) {
				parent_win.addChild(_win);
			}

			nexacro.__setViewportScale();

			var childframe = new nexacro.ChildFrame(name);
			childframe._showModeless(name, _win);
		};

		nexacro.__attachChildFrame = function (_cur_win, _doc, key, adl_url, div_id, fdl_url) {
			var name = div_id + "_userframe";

			if (_doc.getElementById(name)) {
				return;
			}

			if (!application._is_attach_childframe) {
				nexacro._prepareManagerFrame();
			}

			application._is_attach_childframe = true;

			nexacro._custom_node_id = div_id;
			nexacro._initHTMLSysEvent(_cur_win, _doc);

			application.load(key, adl_url);

			var obj_div = _doc.getElementById(div_id);
			nexacro.__setDOMNodeStyleAbsolute(obj_div.style);

			var width = obj_div.offsetWidth;
			var height = obj_div.offsetHeight;

			var childframe = new nexacro.ChildFrame(name);
			childframe._is_main = true;
			childframe._is_window = true;
			childframe._window_type = 0;
			childframe.showtitlebar = false;
			childframe.showstatusbar = false;


			var _win = childframe._window = new nexacro.Window(name, null, true);
			_win._custom_node = obj_div;
			_win._custom_node_id = div_id;
			_win._custom_node_left = obj_div.offsetLeft;
			_win._custom_node_top = obj_div.offsetTop;

			_win.create(null, name, width, height, 0, 0);
			_win.attachFrame(childframe, false);

			childframe.createComponent();

			setTimeout(function () {
				childframe.init(name, "absolute", 0, 0, width, height, null, null, fdl_url);
				childframe.on_created();
				obj_div.appendChild(childframe._control_element._handle);
			}, 500);
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._syshandler_onmousedown = function (_sysEvent, node, evt) {
				var id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._win_win, id);
				var elem = nexacro.__findParentElement(node);
				elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(evt.clientX, evt.clientY) : elem;

				if (application._is_attach_childframe) {
					var len = nexacro_HTMLSysEvent.length;
					for (var i = 0; i < len; i++) {
						var sysEvent = nexacro_HTMLSysEvent[i];
						if (sysEvent._custom_node_id == id) {
							continue;
						}

						var w1 = nexacro._findWindow(sysEvent._win_win, sysEvent._custom_node_id);
						if (w1._is_active_window) {
							w1._is_active_window = false;
							w1._on_sys_deactivate();
						}
					}
				}

				if (win && elem) {
					_sysEvent._cur_win.__clearGC();
					if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
						if (win._is_active_window == false) {
							win._on_sys_activate();
						}

						if (_sysEvent._cur_win.document.hasFocus) {
							if (false == _sysEvent._cur_win.document.hasFocus()) {
								_sysEvent._cur_win.focus();
							}
						}

						var ret = win._on_sys_lbuttondown(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

						if (nexacro.SystemLang != "ja") {
							if (win._last_focused_elem != elem && win._last_focused_elem instanceof nexacro.InputElement && win._last_focused_elem.parent) {
								win._last_focused_elem._on_sys_mousedown(evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
							}
						}

						if (!(elem instanceof nexacro.InputElement && elem.enable)) {
							nexacro._stopSysEvent(evt);
						}


						return ret;
					}
					else if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_RBUTTON : nexacro_HTMLSysEvent.MOUSE_RBUTTON) || evt.button == 0) {
						var ret = win._on_sys_rbuttondown(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

						if (win._last_focused_elem != elem && win._last_focused_elem instanceof nexacro.InputElement && win._last_focused_elem.parent) {
							win._last_focused_elem._on_sys_mousedown(evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
						}

						if (!(elem instanceof nexacro.InputElement && elem.enable)) {
							nexacro._stopSysEvent(evt);
						}


						return ret;
					}
					else {
						var ret = win._on_sys_mousedown(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

						if (nexacro.SystemLang != "ja" && nexacro.OSVersion >= 6.0) {
							if (win._last_focused_elem != elem && win._last_focused_elem instanceof nexacro.InputElement && win._last_focused_elem.parent) {
								win._last_focused_elem._on_sys_mousedown(evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);
							}
						}


						if (!(elem instanceof nexacro.InputElement && elem.enable)) {
							nexacro._stopSysEvent(evt);
						}


						return ret;
					}
				}
				return false;
			};
			nexacro._syshandler_onmouseup = function (_sysEvent, node, evt) {
				var id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._cur_win, id);
				var elem = nexacro.__findParentElement(node);
				if (win) {
					if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
						var doc = _sysEvent._cur_doc;
						var _win = _sysEvent._cur_win;

						return win._on_sys_lbuttonup(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					}
					else if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_RBUTTON : nexacro_HTMLSysEvent.MOUSE_RBUTTON)) {
						return win._on_sys_rbuttonup(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					}
					else {
						return win._on_sys_mouseup(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					}
				}
				return false;
			};

			nexacro._syshandler_lock_onmouseup = nexacro._emptyFn;
			nexacro._syshandler_onmousemove = function (_sysEvent, node, evt) {
				var id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._cur_win, id);
				var elem = nexacro.__findParentElement(node);
				if (!win) {
					return false;
				}


				elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(evt.clientX, evt.clientY) : elem;
				var w_x = nexacro._getWindowHandlePosX(win._handle, id);
				var w_y = nexacro._getWindowHandlePosY(win._handle, id);
				var w_width = nexacro._getMainWindowWidth(win, id);
				var w_height = nexacro._getMainWindowHeight(win, id);

				if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY) {
					return false;
				}
				else if (evt.screenX < w_x || evt.screenX > (w_x + w_width) || evt.screenY < w_y || evt.screenY > (w_y + w_height)) {
					if (nexacro._cur_track_info && nexacro._cur_track_info.target instanceof nexacro.TitleBar) {
						return false;
					}
				}

				win._cur_screen_pos.x = evt.screenX;
				win._cur_screen_pos.y = evt.screenY;
				win._cur_client_pos.x = evt.clientX;
				win._cur_client_pos.y = evt.clientY;

				var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none")));
				_sysEvent._cur_win.__clearGC();
				if (elem) {
					win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					return true;
				}
				else if (win._cur_ldown_elem) {
					win._on_sys_mousemove(null, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
				}
				return false;
			};
			nexacro._syshandler_lock_onmousemove = nexacro._emptyFn;

			nexacro._syshandler_onmousewheel = function (_sysEvent, node, evt) {
				var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
				var elem = nexacro.__findParentElement(node);
				if (win && elem) {
					_sysEvent._cur_win.__clearGC();

					var ret = win._on_sys_mousewheel(elem, nexacro.__getWheelDeltaX(evt), nexacro.__getWheelDeltaY(evt), nexacro._getSysEventBtnString({
						button : 4, 
						which : 2
					}), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					if (ret === false) {
						nexacro._stopSysEvent(evt);
					}
					return;
				}
				return false;
			};
		}
		else if (nexacro.Browser != "IE") {
			nexacro._syshandler_onmousedown = function (_sysEvent, node, evt) {
				var id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._win_win, id);

				if (application._is_attach_childframe) {
					var len = nexacro_HTMLSysEvent.length;
					for (var i = 0; i < len; i++) {
						var sysEvent = nexacro_HTMLSysEvent[i];
						if (sysEvent._custom_node_id == id) {
							continue;
						}

						var w1 = nexacro._findWindow(sysEvent._win_win, sysEvent._custom_node_id);
						if (w1._is_active_window) {
							w1._is_active_window = false;
							w1._on_sys_deactivate();
						}
					}
				}

				var elem = nexacro.__findParentElement(node);
				if (win && elem) {
					if (win._is_active_window == false) {
						win._on_sys_activate();
					}

					if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
						var ret = win._on_sys_lbuttondown(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
						_sysEvent.lockMouseMove(node);


						if (!(elem instanceof nexacro.InputElement && elem.enable)) {
							nexacro._stopSysEvent(evt);
						}

						return ret;
					}
					else if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_RBUTTON : nexacro_HTMLSysEvent.MOUSE_RBUTTON)) {
						var ret = win._on_sys_rbuttondown(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
						if (!(elem instanceof nexacro.InputElement && elem.enable)) {
							nexacro._stopSysEvent(evt);
						}

						return ret;
					}
					else {
						var ret = win._on_sys_mousedown(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
						if (!(elem instanceof nexacro.InputElement && elem.enable)) {
							nexacro._stopSysEvent(evt);
						}

						return ret;
					}
				}
				return false;
			};
			nexacro._syshandler_onmouseup = function (_sysEvent, node, evt) {
				var node_id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._win_win, node_id);
				var elem = nexacro.__findParentElement(node);
				if (win && elem) {
					if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[node_id].MOUSE_RBUTTON : nexacro_HTMLSysEvent.MOUSE_RBUTTON)) {
						return win._on_sys_rbuttonup(elem, "rbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					}
					else {
						return win._on_sys_mouseup(elem, "mbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					}
				}
				return false;
			};
			nexacro._syshandler_lock_onmouseup = function (_sysEvent, node, evt) {
				var node_id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._win_win, node_id);
				var elem = nexacro.__findParentElement(node);

				_sysEvent.unlockMouseMove(node);
				var ret = false;
				if (win) {
					if (evt.button == (application._is_attach_childframe ? nexacro_HTMLSysEvent[node_id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
						ret = win._on_sys_lbuttonup(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					}
				}
				return ret;
			};
			nexacro._syshandler_onmousemove = function (_sysEvent, node, evt) {
				var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
				var elem = nexacro.__findParentElement(node);
				if (!win) {
					return false;
				}



				if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY) {
					return false;
				}

				win._cur_screen_pos.x = evt.screenX;
				win._cur_screen_pos.y = evt.screenY;
				win._cur_client_pos.x = evt.clientX;
				win._cur_client_pos.y = evt.clientY;

				var button = (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none"));

				if (elem) {
					win._on_sys_mousemove(elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					return true;
				}
				return false;
			};
			nexacro._syshandler_lock_onmousemove = function (_sysEvent, node, evt) {
				var node_id = _sysEvent._custom_node_id;
				var win = nexacro._findWindow(_sysEvent._win_win, node_id);
				var elem = nexacro.__findParentElement(node);
				if (!win) {
					return false;
				}


				var w_x = nexacro._getWindowHandlePosX(win._handle, node_id);
				var w_y = nexacro._getWindowHandlePosY(win._handle, node_id);
				var w_width = nexacro._getMainWindowWidth(win, node_id);
				var w_height = nexacro._getMainWindowHeight(win, node_id);

				if (win._cur_screen_pos.x == evt.screenX && win._cur_screen_pos.y == evt.screenY) {
					return false;
				}
				else if (evt.screenX < w_x || evt.screenX > (w_x + w_width) || evt.screenY < w_y || evt.screenY > (w_y + w_height)) {
					if (nexacro._cur_track_info && nexacro._cur_track_info.target instanceof nexacro.TitleBar) {
						return false;
					}
				}

				win._cur_screen_pos.x = evt.screenX;
				win._cur_screen_pos.y = evt.screenY;
				win._cur_client_pos.x = evt.clientX;
				win._cur_client_pos.y = evt.clientY;

				if (elem) {
					win._on_sys_mousemove(elem, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					return true;
				}
				else {
					win._on_sys_mousemove(null, "lbutton", evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
				}
				return false;
			};

			nexacro._syshandler_onmousewheel = function (_sysEvent, node, evt) {
				var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
				var elem = nexacro.__findParentElement(node);
				if (win && elem) {
					var ret = win._on_sys_mousewheel(elem, nexacro.__getWheelDeltaX(evt), nexacro.__getWheelDeltaY(evt), nexacro._getSysEventBtnString({
						button : 1, 
						which : 2
					}), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
					if (ret === false) {
						nexacro._stopSysEvent(evt);
					}
					return;
				}
				return false;
			};
		}

		nexacro._syshandler_ontouchstart = function (_sysEvent, node, evt, orgevt) {
			if (evt.stopped === true) {
				return;
			}

			if (orgevt && orgevt.stopped === true) {
				return;
			}


			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			if (!win || win._isFrozen) {
				return;
			}



			if (evt.touches && evt.changedTouches && 
				evt.touches.length == 1 && evt.changedTouches.length == 1 && 
				evt.touches.length == evt.changedTouches.length) {
				var manager = win._getTouchManager();
				var curTouches = manager._currentTouches;
				var curTime = (evt.timeStamp || new Date().getTime());
				var len = curTouches ? curTouches.length : 0;
				if (len > 0) {
					if (len == 2) {
						if (!manager._ignore_touchstart) {
							manager._ignore_touchstart = true;
						}
						else {
							for (var i = len - 1; i >= 0; i--) {
								win._on_sys_touchcancel(elem, curTouches[i].touchid.slice(1), 0, 0, 0, 0, (evt.timeStamp || new Date().getTime()), (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime, (i == 0));
							}

							manager._ignore_touchstart = false;
						}
					}
					else if (len == 1) {
						for (var i = len - 1; i >= 0; i--) {
							win._on_sys_touchcancel(elem, curTouches[i].touchid.slice(1), 0, 0, 0, 0, (evt.timeStamp || new Date().getTime()), (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime, (i == 0));
						}
					}
				}
			}

			if (elem) {
				var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
				var ret = false;

				var first_touchid = evt.touches ? evt.touches[0].identifier : null;
				for (var i = 0; i < touchlen; i++) {
					var touch = evt.changedTouches ? evt.changedTouches[i] : (evt.touches ? evt.touches[0] : evt);
					var clientX = touch.pageX || touch.clientX;
					var clientY = touch.pageY || touch.clientY;
					var screenX = touch.screenX || clientX;
					var screenY = touch.screenY || clientY;
					var curTime = (evt.timeStamp || new Date().getTime());
					var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
					var touchid = touch.identifier;
					ret |= win._on_sys_touchstart(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1), first_touchid);
				}

				if (ret) {
					if (orgevt) {
						evt = orgevt;
					}
					nexacro._stopSysEvent(evt);
					return true;
				}
			}

			return false;
		};
		nexacro._syshandler_ontouchend = function (_sysEvent, node, evt, orgevt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			if (!win || win._isFrozen) {
				return;
			}

			var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
			var ret = false;
			for (var i = 0; i < touchlen; i++) {
				var touch = evt.changedTouches ? evt.changedTouches[i] : evt;
				var clientX = touch.pageX || touch.clientX;
				var clientY = touch.pageY || touch.clientY;
				var screenX = touch.screenX || clientX;
				var screenY = touch.screenY || clientY;
				var curTime = (evt.timeStamp || new Date().getTime());
				var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
				var touchid = touch.identifier;
				var pointX = clientX;
				var pointY = clientY;

				if (!(nexacro.Browser == "Chrome" && nexacro.BrowserVersion > 42)) {
					if (window.pageXOffset > 0) {
						pointX -= window.pageXOffset;
					}
					if (window.pageYOffset > 0) {
						pointY -= window.pageYOffset;
					}
				}

				var hover_elem = nexacro.__getElementFromPoint(win._handle, pointX, pointY);
				if (hover_elem) {
					elem = hover_elem;
				}

				ret |= win._on_sys_touchend(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
			}

			if (ret) {
				if (orgevt) {
					evt = orgevt;
				}
				nexacro._stopSysEvent(evt);
				return true;
			}
		};
		nexacro._syshandler_ontouchmove = function (_sysEvent, node, evt, orgevt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			if (!win && win._isFrozen) {
				return;
			}

			var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
			var ret = false;
			for (var i = 0; i < touchlen; i++) {
				var touch = evt.changedTouches ? evt.changedTouches[i] : evt;
				var clientX = touch.pageX || touch.clientX;
				var clientY = touch.pageY || touch.clientY;
				var screenX = touch.screenX || clientX;
				var screenY = touch.screenY || clientY;
				var curTime = (evt.timeStamp || new Date().getTime());
				var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
				var touchid = touch.identifier;
				var pointX = clientX;
				var pointY = clientY;

				if (!(nexacro.Browser == "Chrome" && nexacro.BrowserVersion > 42)) {
					if (window.pageXOffset > 0) {
						pointX -= window.pageXOffset;
					}
					if (window.pageYOffset > 0) {
						pointY -= window.pageYOffset;
					}
				}

				var hover_elem = nexacro.__getElementFromPoint(win._handle, pointX, pointY);
				if (hover_elem) {
					elem = hover_elem;
				}

				ret |= win._on_sys_touchmove(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
			}

			if (ret) {
				if (orgevt) {
					evt = orgevt;
				}
				nexacro._stopSysEvent(evt);
				return true;
			}
		};
		nexacro._syshandler_ontouchcancel = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			if (!win || win._isFrozen) {
				return;
			}

			var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
			var ret = false;
			for (var i = 0; i < touchlen; i++) {
				var touch = evt.changedTouches ? evt.changedTouches[i] : evt;
				var clientX = touch.pageX || touch.clientX;
				var clientY = touch.pageY || touch.clientY;
				var screenX = touch.screenX || clientX;
				var screenY = touch.screenY || clientY;
				var curTime = (evt.timeStamp || new Date().getTime());
				var orgTime = (evt.originalTimeStamp) ? evt.originalTimeStamp : curTime;
				var touchid = touch.identifier;
				var pointX = clientX;
				var pointY = clientY;

				if (!(nexacro.Browser == "Chrome" && nexacro.BrowserVersion > 42)) {
					if (window.pageXOffset > 0) {
						pointX -= window.pageXOffset;
					}
					if (window.pageYOffset > 0) {
						pointY -= window.pageYOffset;
					}
				}

				var hover_elem = nexacro.__getElementFromPoint(win._handle, pointX, pointY);
				if (hover_elem) {
					elem = hover_elem;
				}

				ret |= win._on_sys_touchcancel(elem, touchid, clientX, clientY, screenX, screenY, curTime, orgTime, (i == touchlen - 1));
			}
		};

		nexacro._syshandler_ondblclick = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			if (win && elem) {
				_sysEvent._cur_win.__clearGC();
				var ret = win._on_sys_dblclick(elem, nexacro._getSysEventBtnString({
					button : 1, 
					which : 1
				}), evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

				return ret;
			}
			return false;
		};

		nexacro._syshandler_onmouseover = function (_sysEvent, node, fromnode, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			if (!application) {
				return false;
			}


			elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(evt.clientX, evt.clientY) : elem;
			var from_elem = _sysEvent._cur_over_elem;

			var elem_comp = win ? win.findComponent(elem, 0, 0)[0] : null;
			var from_elem_comp = win ? win.findComponent(from_elem, 0, 0)[0] : null;

			if (win && elem && from_elem != elem && from_elem_comp != elem_comp) {
				var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none")));

				if (from_elem && from_elem._handle) {
					win._on_sys_mouseleave(from_elem, elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);
				}
				else {
					from_elem = nexacro.__findParentElement(fromnode);
				}
				_sysEvent._cur_over_elem = elem;
				var ret = win._on_sys_mouseenter(elem, from_elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

				return ret;
			}
			return false;
		};
		nexacro._syshandler_onmouseout = function (_sysEvent, node, tonode, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElement(node);
			elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(evt.clientX, evt.clientY) : elem;
			if (win && elem && _sysEvent._cur_over_elem == elem) {
				var to_elem = nexacro.__findParentElement(tonode);
				var elem_comp = win.findComponent(elem, 0, 0)[0];
				var to_elem_comp = win.findComponent(to_elem, 0, 0)[0];

				if (to_elem != elem && to_elem_comp != elem_comp) {
					_sysEvent._cur_over_elem = null;
					var button = (win._cur_ldown_elem ? "lbutton" : (win._cur_rdown_elem ? "rbutton" : (win._cur_mdown_elem ? "mbutton" : "none")));
					var ret = win._on_sys_mouseleave(elem, to_elem, button, evt.altKey, evt.ctrlKey, evt.shiftKey, evt.clientX, evt.clientY, evt.screenX, evt.screenY);

					return ret;
				}
			}
			return false;
		};

		if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.OSVersion >= 6.0)) {
			nexacro._syshandler_onkeydown = function (_sysEvent, node, evt) {
				var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
				var elem = nexacro.__findParentElementForKeyEvent(node, win);
				if (win && elem) {
					_sysEvent._cur_win.__clearGC();
					win._on_sys_keydown(elem, nexacro._getSysEventKeyCode(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);
					if (elem._event_stop) {
						nexacro._stopSysEvent(evt);
						elem._event_stop = false;
					}


					return true;
				}
				return false;
			};
		}
		else {
			nexacro._syshandler_onkeydown = function (_sysEvent, node, evt) {
				var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
				var elem = nexacro.__findParentElementForKeyEvent(node, win);
				if (win && elem) {
					_sysEvent._cur_win.__clearGC();
					var keycode = nexacro._getSysEventKeyCode(evt);
					win._on_sys_keydown(elem, keycode, evt.altKey, evt.ctrlKey, evt.shiftKey);
					if (elem._event_stop) {
						nexacro._stopSysEvent(evt, evt.altKey, evt.ctrlKey, evt.shiftKey);
						elem._event_stop = false;
					}


					return true;
				}
				return false;
			};
		}
		nexacro._syshandler_onkeypress = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElementForKeyEvent(node, win);
			if (win && elem) {
				_sysEvent._cur_win.__clearGC();
				var ret = win._on_sys_keypress(elem, nexacro._getSysEventKeyCode(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);

				return ret;
			}
			return false;
		};
		nexacro._syshandler_onkeyup = function (_sysEvent, node, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			var elem = nexacro.__findParentElementForKeyEvent(node, win);
			if (win && elem) {
				return win._on_sys_keyup(elem, nexacro._getSysEventKeyCode(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);
			}
			return false;
		};

		nexacro._syshandler_onactivate = function (_sysEvent, evt) {
			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._win_win, id);

			if (application._is_attach_childframe) {
				var len = nexacro_HTMLSysEvent.length;
				for (var i = 0; i < len; i++) {
					var sysEvent = nexacro_HTMLSysEvent[i];
					if (sysEvent._custom_node_id == id) {
						continue;
					}

					var w1 = nexacro._findWindow(sysEvent._win_win, sysEvent._custom_node_id);
					if (w1._is_active_window) {
						w1._is_active_window = false;
						w1._on_sys_deactivate();
					}
				}
			}

			if (win && win._on_sys_activate) {
				_sysEvent._cur_win.__clearGC();
				var ret = win._on_sys_activate();

				return ret;
			}
			return false;
		};

		nexacro._syshandler_ondeactivate = function (_sysEvent, evt) {
			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._win_win, id);

			if (win) {
				var active_node = win._dest_doc.activeElement;

				if (active_node) {
					var active_elem = active_node._linked_element;
					if (active_elem && active_elem instanceof nexacro.WebBrowserPluginElement) {
						return false;
					}
				}

				if (win._on_sys_deactivate) {
					_sysEvent._cur_win.__clearGC();
					var ret = win._on_sys_deactivate();

					return ret;
				}
			}
			return false;
		};

		nexacro._syshandler_onbeforeclose = function (_sysEvent, evt) {
			var win = nexacro._findWindow(_sysEvent._cur_win, _sysEvent._custom_node_id);
			var confirm_message;
			if (win && win._on_sys_beforeclose) {
				confirm_message = win._on_sys_beforeclose();
			}

			if (confirm_message !== undefined && confirm_message != "" && confirm_message !== null) {
				if (evt) {
					evt.returnValue = confirm_message;
				}
				return confirm_message;
			}
		};

		nexacro._syshandler_onclose = function (_sysEvent, evt) {
			_sysEvent._stopDetectWindowMove();

			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._cur_win, id);
			if (win) {
				var _cur_win = _sysEvent._cur_win;
				_sysEvent._stopDocEventHandler();
				_sysEvent.clearAll();

				var ret = false;
				if (win._on_sys_close) {
					ret = win._on_sys_close();
				}

				if (_cur_win.__destroyGC) {
					_cur_win.__destroyGC();
				}

				nexacro._finalizeHTMLSysTimerManager(_cur_win);
				nexacro._finalizeHTMLSysEvent(_cur_win, id);
				nexacro._finalizeGlobalObjects(_cur_win);


				return ret;
			}
			return false;
		};

		nexacro._syshandler_onresize = function (_sysEvent, evt) {
			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._win_win, id);
			if (win) {
				var w = nexacro._getWindowHandleClientWidth(win._handle, id);
				var h = nexacro._getWindowHandleClientHeight(win._handle, id);

				if (w != win.clientWidth || h != win.clientHeight) {
					if (nexacro.OS == "Android" && win._is_active_window) {
						var is_input_focused = false;
						if (win._last_focused_elem && (win._last_focused_elem instanceof nexacro.InputElement || win._last_focused_elem instanceof nexacro.TextAreaElement)) {
							is_input_focused = true;
						}

						if (is_input_focused && (w == win.clientWidth && h < win.clientHeight)) {
							return false;
						}
					}

					_sysEvent._cur_win.__clearGC();
					var ret = win._on_sys_resize(w, h);

					if (nexacro.OS == "iOS" && parseFloat(nexacro.OSVersion) >= 8) {
						if (window.innerWidth == nexacro._getWindowHandleClientWidth(win._handle) && 
							window.innerHeight == nexacro._getWindowHandleClientHeight(win._handle)) {
							document.body.scrollLeft = 0;
						}
					}

					return ret;
				}
			}

			return false;
		};

		nexacro._syshandler_onmove = function (_sysEvent, evt) {
			var id = _sysEvent._custom_node_id;
			var win = nexacro._findWindow(_sysEvent._win_win, id);
			if (win) {
				var x = nexacro._getWindowHandlePosX(win._handle, id);
				var y = nexacro._getWindowHandlePosY(win._handle, id);

				if (x != win.left || y != win.top) {
					return win._on_sys_move(x, y);
				}
			}
			return false;
		};

		nexacro._syshandler_onload = function (_sysEvent, evt) {
			var win = nexacro._findWindow(_sysEvent._cur_win, _sysEvent._custom_node_id);
			if (win) {
				var _cur_win = _sysEvent._cur_win;

				var ret = false;
				if (win._on_sys_load) {
					ret = win._on_sys_load(_cur_win);
				}
				_cur_win.__destroyGC();
				return ret;
			}
			return false;
		};


		if (!nexacro.isTouchInteraction) {
			nexacro._syshandler_oncontextmenu = function (_sysEvent, node, evt) {
				var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
				var elem = nexacro.__findParentElement(node);
				if (win && elem) {
					var ret = win._on_sys_contextmenu(elem);
					if (!ret) {
						ret = nexacro._stopSysEvent(evt);
					}
					else {
						ret = true;
					}

					return ret;
				}
				return true;
			};
		}
		else {
			nexacro._syshandler_oncontextmenu = nexacro._emptyFn;
		}

		nexacro._syshandler_onorientationchange = function (_sysEvent, evt) {
			var win = nexacro._findWindow(_sysEvent._win_win, _sysEvent._custom_node_id);
			if (win && win.frame) {
				win.frame._on_orientationchange(nexacro._getMobileOrientation());
			}
		};

		nexacro._syshandler_onselectstart = function (_sysEvent, node, evt) {
			if (node && ((node.tagName == "INPUT" && (node.type == "text" || node.type == "password")) || 
				node.tagName == "TEXTAREA")) {
				return true;
			}
			return nexacro._stopSysEvent(evt);
		};
		nexacro._syshandler_dragstart = function (_sysEvent, node, evt) {
			return nexacro._stopSysEvent(evt);
		};


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._doc_init_html = "<html lang=\"" + nexacro.BrowserLang.substr(0, 2) + "\" xmlns:v='urn:schemas-microsoft-com:vml' xmlns:o='urn:schemas-microsoft-com:office:office'>\n"
				 + "<head>\n"
				 + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
				 + "<style>\n"
				 + "v\\:shape{behavior:url(#default#VML);}\n"
				 + "v\\:fill{behavior:url(#default#VML);}\n"
				 + "v\\:path{behavior:url(#default#VML);}\n"
				 + "v\\:line{behavior:url(#default#VML);}\n"
				 + "v\\:textpath{behavior:url(#default#VML);}\n"
				 + "o\\:opacity2{behavior:url(#default#VML);}\n"
				 + "</style>\n"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;background:transparent;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "var nexacro;"
				 + "if (window.dialogArguments) nexacro = window.dialogArguments.nexacro;\n"
				 + "if (!nexacro) nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro && window.opener) nexacro = window.opener.nexacro;"
				 + "nexacro_HTMLSysEvent={};\n"
				 + "nexacro._initHTMLSysEvent(window, document);"
				 + "nexacro._preparePopupManagerFrame(window);"
				 + 'function _inputDOM_nodeClick(_input){ _input.click();}'
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) {
			nexacro._doc_init_html = "<html lang=\"" + nexacro.BrowserLang.substr(0, 2) + "\">\n"
				 + "<head>\n"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro) nexacro = window.opener.nexacro;"
				 + "nexacro_HTMLSysEvent={};\n"
				 + "nexacro._initHTMLSysEvent(window, document);"
				 + "nexacro._preparePopupManagerFrame(window);"
				 + 'function _inputDOM_nodeClick(_input){ _input.click();}'
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else if (nexacro.isTouchInteraction) {
			nexacro._doc_init_html = "<html lang=\"" + nexacro.BrowserLang.substr(0, 2) + "\">\n"
				 + "<head>\n"
				 + "<style>\n"
				 + "div {\n"
				 + "-moz-user-select:none;\n"
				 + "-webkit-user-select:none;\n"
				 + "-webkit-touch-callout:none;\n"
				 + "-webkit-appearance:none;\n"
				 + "-webkit-tap-highlight-color:rgba(0,0,0,0);\n"
				 + "outline: none;\n"
				 + "}\n"
				 + "</style>\n"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + "window.nexacro_HTMLSysEvent={};\n"
				 + "nexacro._initHTMLSysEvent(window, document);"
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else {
			nexacro._doc_init_html = "<html lang=\"" + nexacro.BrowserLang.substr(0, 2) + "\">\n"
				 + "<head>\n"
				 + "<style>\n"
				 + "div {\n"
				 + "outline: none;\n"
				 + "}\n"
				 + "</style>\n"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro; if (!nexacro) nexacro = window.nexacro; if (!nexacro) nexacro = window.opener.nexacro;"
				 + "window.nexacro_HTMLSysEvent={};\n"
				 + "nexacro._initHTMLSysEvent(window, document);"
				 + "nexacro._preparePopupManagerFrame(window);"
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._doc_head_style = "v\\:shape{behavior:url(#default#VML);}\n"
				 + "v\\:fill{behavior:url(#default#VML);}\n"
				 + "v\\:path{behavior:url(#default#VML);}\n"
				 + "v\\:line{behavior:url(#default#VML);}\n"
				 + "v\\:textpath{behavior:url(#default#VML);}\n"
				 + "o\\:opacity2{behavior:url(#default#VML);}\n";
		}
		else if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 9) {
			nexacro._doc_head_style = "";
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 10) {
			nexacro._doc_head_style = " body { \n"
				 + "touch-action: none;\n"
				 + "}\n"
				 + "input::-ms-clear { display: none; }\n"
				 + "input::-ms-reveal { display: none; }\n";
		}
		else if (nexacro.isTouchInteraction) {
			nexacro._doc_head_style = "div {\n"
				 + "-moz-user-select:none;\n"
				 + "-webkit-user-select:none;\n"
				 + "-webkit-touch-callout:none;\n"
				 + "-webkit-appearance:none;\n"
				 + "-webkit-tap-highlight-color:rgba(0,0,0,0);\n"
				 + "outline: none;\n"
				 + "}\n";
		}
		else {
			nexacro._doc_head_style = "div {\n"
				 + "outline: none;\n"
				 + "}\n"
				 + "Textarea::-webkit-scrollbar {\n"
				 + "display: none; }";
		}

		nexacro._createWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, taskbar, is_main) {
			var _win_handle = null;
			if (is_main == true) {
				_win_handle = nexacro._getMainWindowHandle();
				application._mainwindow_handle = _win_handle;
			}
			else {
				var parent_handle = null;
				if (parent_win) {
					parent_handle = parent_win._dest_handle;
				}
				_win_handle = nexacro.__createWindowHandle(parent_handle, target_win, name, left, top, width, height, resizable, layered, taskbar);

				if (!_win_handle) {
					return;
				}
			}

			nexacro.__setViewportScale();

			_win_handle.document.body.style.overflow = "visible";

			var head = _win_handle.document.head;
			if (head && head.children) {
				var child = head.children;
				for (var i = 0; i < child.length; i++) {
					if (child[i].nodeName == "STYLE") {
						if (!target_win._custom_node_id) {
							child[i].innerHTML = nexacro._doc_head_style;
						}
						else {
							child[i].innerHTML += nexacro._doc_head_style;
						}
						break;
					}
				}
			}

			if (application._is_attach_childframe) {
				if (!_win_handle._linked_window) {
					_win_handle._linked_window = new nexacro.Collection();
				}
				_win_handle._linked_window.add_item(target_win._custom_node_id, target_win);
			}
			else {
				_win_handle._linked_window = target_win;
			}
			target_win.attachHandle(_win_handle);
			if (!is_main) {
				setTimeout(function () {
					nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload');
				}, 10);
			}
		};

		nexacro._setLinkedWindow = function (_handle, target_win) {
			_handle._linked_window = target_win;
		};
		nexacro._createOpenWindowHandle = function (parent_win, name, formurl, left, top, width, height, resizable, layered, taskbar, is_main) {
			var _win_handle = null;
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win._dest_handle;
			}
			return nexacro.__createOpenWindowHandle(parent_handle, name, formurl, left, top, width, height, resizable, layered, taskbar);
		};

		nexacro.__createOpenWindowHandle = function (_handleParent, name, formurl, left, top, width, height, resizable, layered, taskbar) {
			if (left == null) {
				left = Math.floor((screen.availWidth - width) / 2);
			}

			if (top == null) {
				top = Math.floor((screen.availHeight - height) / 2);
			}

			var dochandle = _handleParent ? _handleParent.ownerDocument : null;
			var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
			var _win_handle;

			var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
				 + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
				 + "resizable=" + (resizable ? "yes" : "no");

			var popupurl = "./popup.html";

			if (formurl) {
				popupurl += "?formname=" + encodeURIComponent(formurl);
				popupurl += "&framename=" + name;
			}

			var url = application._transfullurl(application._project_uri, popupurl);
			_win_handle = _parent_win.open(url, name, opt);

			if (!_win_handle) {
				return null;
			}

			return _win_handle;
		};


		nexacro.__createWindowHandle = function (_handleParent, target_win, name, left, top, width, height, resizable, layered, taskbar) {
			if (left == null) {
				left = Math.floor((screen.availWidth - width) / 2);
			}

			if (top == null) {
				top = Math.floor((screen.availHeight - height) / 2);
			}

			var dochandle = _handleParent ? _handleParent.ownerDocument : null;
			var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
			var _win_handle;
			if (false && _parent_win.showModelessDialog) {
				var opt = "dialogHeight:" + height + "px" + "; dialogLeft:" + left + "px" + "; dialogTop:" + top + "px" + "; dialogWidth:" + width + "px"
					 + "; center:no" + (resizable ? "; resizable:yes" : "")
					 + "; status:no";
				_win_handle = _parent_win.showModelessDialog(document.URL + "empty.html", {
					nexacro : _parent_win.nexacro, 
					parent : _parent_win
				}, opt);
			}
			else {
				var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
					 + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
					 + "resizable=" + (resizable ? "yes" : "no");
				_win_handle = _parent_win.open("", name, opt);
			}

			if (!_win_handle) {
				return null;
			}

			_win_handle.nexacro = _parent_win.nexacro;
			_win_handle.system = _parent_win.system;
			_win_handle.application = _parent_win.application;

			_win_handle._linked_window = target_win;

			_win_handle.document.open();


			_win_handle.document.write(nexacro._doc_init_html);
			_win_handle.document.close();

			return _win_handle;
		};

		nexacro._createModalWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, lockmode, delayedCreate) {
		};

		nexacro._createModalAsyncWindowHandle = function (parent_win, target_win, name, left, top, width, height, resizable, layered, lockmode) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win._dest_handle;
			}
			var _win_handle = nexacro.__createModalAsyncWindowHandle(parent_handle, target_win, name, left, top, width, height, resizable, layered, lockmode);

			if (!_win_handle) {
				return;
			}

			_win_handle.document.body.style.overflow = "visible";
			_win_handle._linked_window = target_win;

			target_win.attachHandle(_win_handle);
			setTimeout(function () {
				nexacro.__fireHTMLEvent(_win_handle.document.body, 'load', 'onload');
			}, 10);
		};

		nexacro.__createModalAsyncWindowHandle = function (_handleParent, target_win, name, left, top, width, height, resizable, layered, lockmode) {
			if (left == null) {
				left = Math.floor((screen.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((screen.availHeight - height) / 2);
			}

			var opt = "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ","
				 + "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=no,"
				 + "resizable=" + (resizable ? "yes" : "no");

			var dochandle = _handleParent ? _handleParent.ownerDocument : null;
			var _parent_win = dochandle ? (dochandle.defaultView || dochandle.parentWindow) : window;
			var _win_handle = _parent_win.open("", name, opt);

			if (!_win_handle) {
				return null;
			}


			if (_parent_win) {
				_win_handle.nexacro = _parent_win.nexacro;
				_win_handle.system = _parent_win.system;
				_win_handle.application = _parent_win.application;
			}

			_win_handle._linked_window = target_win;

			_win_handle.document.open();
			_win_handle.document.write(nexacro._doc_init_html);
			_win_handle.document.close();

			return _win_handle;
		};

		nexacro._createModalAsyncCallbackHandler = function (_win_handle, frame) {
			if (frame._window_type != 3) {
				return;
			}

			var main_handle = nexacro._getMainWindowHandle();

			var timer_handle = main_handle.setInterval(function () {
				if (_win_handle && _win_handle.closed) {
					frame._runCallback();

					nexacro._removeModalAsyncCallbackHandler(frame);
				}
			}, 100);

			application._closedmodalasync_list.push([frame, timer_handle]);
		};

		nexacro._removeModalAsyncCallbackHandler = function (frame) {
			var list = application._closedmodalasync_list;
			var list_length = list.length;
			for (var i = 0; i < list_length; i++) {
				var list_item = list[i];
				if (list_item[0] == frame) {
					var main_handle = nexacro._getMainWindowHandle();
					main_handle.clearInterval(list_item[1]);

					for (var j = i; j < list_length - 1; j++) {
						list[j] = list[j + 1];
					}
					list.pop();
					break;
				}
			}
		};

		nexacro._isWindowHandlePrepared = function (_win_handle, id) {
			var body = application._is_attach_childframe ? _win_handle.document.getElementById(id) : _win_handle.document.body;
			return (body != null);
		};

		nexacro._closeWindowHandle = function (_win_handle) {
			if (_win_handle) {
				if (nexacro._getMainWindowHandle() != _win_handle) {
					_win_handle.open('', '_self');
					_win_handle.close();
				}
			}
		};

		nexacro._refreshWindow = nexacro._emptyFn;

		nexacro._getMainWindowHandle = function () {
			if (application._mainwindow_handle) {
				return application._mainwindow_handle;
			}
			else {
				if (window._popup == true) {
					return window.opener | window.parent;
				}
				return window;
			}
		};

		nexacro._getWindowHandle = function (_win_handle, id) {
			var link_window = application._is_attach_childframe ? _win_handle._linked_window[id] : _win_handle._linked_window;
			if (link_window && link_window._is_main) {
				return _win_handle;
			}
			return window;
		};

		nexacro._getWindowDocumentHandle = function (_win_handle) {
			return _win_handle.document;
		};

		nexacro._getWindowDestinationHandle = function (_win_handle, id) {
			return application._is_attach_childframe ? _win_handle.document.getElementById(id) : _win_handle.document.body;
		};

		if (nexacro.Browser == "Gecko") {
			nexacro._getWindowHandlePosX = function (_win_handle, id) {
				return application._is_attach_childframe ? _win_handle.document.getElementById(id).mozInnerScreenX : _win_handle.mozInnerScreenX;
			};
			nexacro._getWindowHandlePosY = function (_win_handle, id) {
				return application._is_attach_childframe ? _win_handle.document.getElementById(id).mozInnerScreenY : _win_handle.mozInnerScreenY;
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._getWindowHandlePosX = function (_win_handle, id) {
				return application._is_attach_childframe ? _win_handle.document.getElementById(id).screenLeft : _win_handle.screenLeft;
			};
			nexacro._getWindowHandlePosY = function (_win_handle, id) {
				return application._is_attach_childframe ? _win_handle.document.getElementById(id).screenTop : _win_handle.screenTop;
			};
		}
		else {
			nexacro._getWindowHandlePosX = function (_win_handle) {
				return nexacro._gap_client_width;
			};
			nexacro._getWindowHandlePosY = function (_win_handle) {
				return nexacro._gap_client_height;
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._getWindowHandleOuterWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).offsetWidth;
				}
				return _win_handle.document.documentElement.offsetWidth;
			};
			nexacro._getWindowHandleOuterHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).offsetHeight;
				}
				return _win_handle.document.documentElement.offsetHeight;
			};
		}
		else if (nexacro.OS == "iOS" && parseFloat(nexacro.OSVersion) >= 8) {
			nexacro._getWindowHandleOuterWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).offsetWidth;
				}
				return _win_handle.document.documentElement.offsetWidth;
			};
			nexacro._getWindowHandleOuterHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).offsetHeight;
				}
				return _win_handle.document.documentElement.offsetHeight;
			};
		}
		else {
			nexacro._getWindowHandleOuterWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientWidth;
				}
				return _win_handle.outerWidth;
			};
			nexacro._getWindowHandleOuterHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientHeight;
				}
				return _win_handle.outerHeight;
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
			nexacro._getWindowHandleClientWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientWidth;
				}
				return _win_handle.document.documentElement.clientWidth;
			};
			nexacro._getWindowHandleClientHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientHeight;
				}
				return _win_handle.document.documentElement.clientHeight;
			};
		}
		else if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 8) {
			nexacro._getWindowHandleClientWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).offsetWidth;
				}
				return _win_handle.document.documentElement.offsetWidth;
			};
			nexacro._getWindowHandleClientHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).offsetHeight;
				}
				return _win_handle.document.documentElement.offsetHeight;
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._getWindowHandleClientWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientWidth;
				}
				return _win_handle.innerWidth;
			};
			nexacro._getWindowHandleClientHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientHeight;
				}
				return _win_handle.innerHeight;
			};
		}
		else if (nexacro.OS == "iOS" && nexacro.Browser == "MobileSafari") {
			nexacro._getWindowHandleClientWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientWidth;
				}
				return _win_handle.document.documentElement.clientWidth;
			};
			nexacro._getWindowHandleClientHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientHeight;
				}
				return _win_handle.document.documentElement.clientHeight;
			};
		}
		else {
			nexacro._getWindowHandleClientWidth = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientWidth;
				}

				var _tester = nexacro._device_exception_tester;
				if (nexacro._allow_default_pinchzoom || (_tester && _tester.use_windowsize_as_bodysize)) {
					return _win_handle.document.body.clientWidth;
				}
				else {
					return _win_handle.innerWidth;
				}
			};
			nexacro._getWindowHandleClientHeight = function (_win_handle, id) {
				if (application._is_attach_childframe) {
					return _win_handle.document.getElementById(id).clientHeight;
				}

				var _tester = nexacro._device_exception_tester;
				if (nexacro._allow_default_pinchzoom || (_tester && _tester.use_windowsize_as_bodysize)) {
					return _win_handle.document.body.clientHeight;
				}
				else {
					return _win_handle.innerHeight;
				}
			};
		}

		nexacro._setWindowHandleArea = function (_win_handle, x, y, w, h) {
			_win_handle.moveTo(x, y);
			_win_handle.resizeTo(w, h);
		};

		nexacro._setWindowHandlePos = function (_win_handle, x, y) {
			_win_handle.moveTo(x, y);
		};

		nexacro._setWindowHandleSize = function (_win_handle, w, h) {
			_win_handle.resizeTo(w, h);
		};

		nexacro._setWindowHandleZIndex = function (_win_handle, zindex) {
			if (_win_handle.style) {
				_win_handle.style.zIndex = zindex;
			}
		};

		nexacro._findWindow = function (_win_handle, id) {
			if (application._is_attach_childframe) {
				return _win_handle._linked_window[id];
			}

			return _win_handle._linked_window;
		};

		nexacro._findDocumentWindow = function (_doc, id) {
			var _win_handle = (_doc.defaultView || _doc.parentWindow);
			if (application._is_attach_childframe) {
				return _win_handle._linked_window[id];
			}
			return _win_handle._linked_window;
		};

		nexacro._flashWindow = function (_win_handle, type, count, interval) {
		};

		nexacro._setMouseHovertime = function (mousehovertime) {
		};

		nexacro._setWindowHandleText = function (_win_handle, titletext) {
			var doc = _win_handle.document;

			if (doc) {
				return doc.title = titletext;
			}
		};

		nexacro._setWindowHandleStatusText = function (_win_handle, statustext) {
			if (window) {
				return window.status = statustext;
			}
		};

		nexacro._setWindowHandleIcon = nexacro._emptyFn;
		nexacro._setWindowHandleTopmost = nexacro._emptyFn;

		if (!nexacro.isTouchInteraction) {
			nexacro._getMainWindowWidth = function (_win, id) {
				var doc = _win._doc;
				if (application._is_attach_childframe && doc) {
					return doc.getElementById(id).clientWidth;
				}

				return _win.clientWidth;
			};
			nexacro._getMainWindowHeight = function (_win, id) {
				var doc = _win._doc;
				if (application._is_attach_childframe && doc) {
					return doc.getElementById(id).clientHeight;
				}

				return _win.clientHeight;
			};
		}
		else {
			nexacro._getMainWindowWidth = function (_win, id) {
				var client_width = nexacro._getWindowHandleClientWidth(_win._handle, id);
				if (client_width != 0) {
					return client_width;
				}

				var doc = _win._doc;
				if (doc) {
					if (application._is_attach_childframe) {
						return doc.getElementById(id).clientWidth;
					}

					var doc_elem = doc.documentElement;
					var width = 0;
					if (nexacro.OS == "iOS") {
						if (doc_elem.clientWidth) {
							width = doc_elem.clientWidth;
						}
						else if (_win.innerWidth) {
							width = doc.body.clientWidth;
						}
						else if (doc.body.clientWidth > 0) {
							width = _win.innerWidth;
						}
					}
					else {
						var w1 = _win.innerWidth ? _win.innerWidth : 0;
						var w2;
						var w3 = doc.body.clientWidth ? doc.body.clientWidth : 0;

						if (doc_elem && doc_elem.clientWidth) {
							w2 = doc_elem.clientWidth ? doc_elem.clientWidth : 0;
						}

						if (w1 < w2) {
							if (w2 < w3) {
								width = doc.body.clientWidth;
							}
							else {
								width = doc_elem.clientWidth;
							}
						}
						else {
							if (w1 < w3) {
								width = doc.body.clientWidth;
							}
							else {
								width = _win.innerWidth;
							}
						}
					}


					return width;
				}
				return _win.clientWidth;
			};

			nexacro._getMainWindowHeight = function (_win, id) {
				var client_height = nexacro._getWindowHandleClientHeight(_win._handle, id);
				if (client_height != 0) {
					return client_height;
				}

				var doc = _win._doc;
				if (doc) {
					if (application._is_attach_childframe) {
						return doc.getElementById(id).clientHeight;
					}

					var doc_elem = doc.documentElement;
					var height = 0;
					if (nexacro.OS == "iOS") {
						if (doc_elem.clientHeight) {
							height = doc_elem.clientHeight;
						}
						else if (_win.innerHeight) {
							height = doc.body.clientHeight;
						}
						else if (doc.body.clientHeight > 0) {
							height = _win.innerHeight;
						}
					}
					else {
						var w1 = _win.innerWidth ? _win.innerWidth : 0;
						var w2;
						var w3 = doc.body.clientWidth ? doc.body.clientWidth : 0;

						if (doc_elem && doc_elem.clientWidth) {
							w2 = doc_elem.clientWidth ? doc_elem.clientWidth : 0;
						}

						if (w1 < w2) {
							if (w2 < w3) {
								height = doc.body.clientHeight;
							}
							else {
								height = doc_elem.clientHeight;
							}
						}
						else {
							if (w1 < w3) {
								height = doc.body.clientHeight;
							}
							else {
								height = _win.innerHeight;
							}
						}
					}
					return height;
				}
				return _win.clientHeight;
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 6) {
			nexacro._setPrivateProfile = nexacro._emptyFn;
		}
		else if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 7) {
			nexacro._setPrivateProfile = function (key, varValue, global) {
				var localstoragekey;

				if (global) {
					localstoragekey = window.location.href;
				}
				else {
					localstoragekey = application.key + application.xadl;
				}

				var iframenode = nexacro._managerFrameNode;
				if (iframenode) {
					var value;
					var type = (typeof varValue);
					if (type == "object") {
						if (varValue instanceof nexacro.Date) {
							type = "nexacrodate";
						}
						else if (varValue instanceof Date) {
							type = "date";
						}
						else if (varValue instanceof nexacro.Decimal) {
							type = "decimal";
						}
					}
					value = type + ":" + varValue;

					iframenode.setAttribute(key, value);
					iframenode.save(localstoragekey);
					return true;
				}
				return false;
			};
		}
		else {
			nexacro._setPrivateProfile = function (key, varValue, global) {
				var localstorage = window.localStorage;
				if (localstorage) {
					var localstoragekey;

					if (global) {
						localstoragekey = window.location.href;
					}
					else {
						localstoragekey = application.key + application.xadl;
					}

					if (localstoragekey) {
						var localstoragedata = localstorage.getItem(localstoragekey);
						var jsondata = {
						};
						if (localstoragedata) {
							jsondata = JSON.parse(localstoragedata);
						}

						var findkey = jsondata[key];
						if (findkey) {
							var type = (typeof varValue);
							if (type == "object") {
								if (varValue instanceof nexacro.Date) {
									type = "nexacrodate";
								}
								else if (varValue instanceof Date) {
									type = "date";
								}
							}
							findkey.type = type;
							findkey.value = varValue + "";
						}
						else {
							var type = (typeof varValue);
							if (type == "object") {
								if (varValue instanceof nexacro.Date) {
									type = "nexacrodate";
								}
								else if (varValue instanceof Date) {
									type = "date";
								}
								else if (varValue instanceof nexacro.Decimal) {
									type = "decimal";
								}
							}

							jsondata[key] = {
								"type" : type, 
								"value" : varValue + ""
							};
						}

						localstorage.setItem(localstoragekey, JSON.stringify(jsondata));
						return true;
					}
				}
				return false;
			};
		}
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 6) {
			nexacro._getPrivateProfile = nexacro._emptyFn;
		}
		else if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 7) {
			nexacro._getPrivateProfile = function (key, global) {
				var localstoragekey;

				if (global) {
					localstoragekey = window.location.href;
				}
				else {
					localstoragekey = application.key + application.xadl;
				}

				var iframenode = nexacro._managerFrameNode;
				if (iframenode) {
					iframenode.load(localstoragekey);
					var attribute = iframenode.getAttribute(key);
					if (attribute) {
						var index = attribute.indexOf(":");
						var type = attribute.substring(0, index);
						var value = attribute.substring(index + 1);

						if (type && value) {
							if (type == "number") {
								return Number(value);
							}
							else if (type == "boolean") {
								return (value == "true") ? true : false;
							}
							else if (type == "nexacrodate") {
								var year = value.substring(0, 4);
								var month = value.substring(4, 6);
								var date = value.substring(6, 8);
								var hour = value.substring(8, 10);
								var minute = value.substring(10, 12);
								var second = value.substring(12, 14);
								var millisecond = value.substring(14, 16);
								return new nexacro.Date(year, month, date, hour, minute, second, millisecond);
							}
							else if (type == "date") {
								return new Date(value);
							}
							else if (type == "decimal") {
								return new nexacro.Decimal(value);
							}
							return value;
						}
					}
				}
			};
		}
		else {
			nexacro._getPrivateProfile = function (key, global) {
				var localstorage = window.localStorage;
				if (localstorage) {
					var localstoragekey;

					if (global) {
						localstoragekey = window.location.href;
					}
					else {
						localstoragekey = application.key + application.xadl;
					}

					if (localstoragekey) {
						var localstoragedata = localstorage.getItem(localstoragekey);
						var jsondata = {
						};
						if (localstoragedata) {
							jsondata = JSON.parse(localstoragedata);
						}

						var findkey = jsondata[key];
						if (findkey) {
							var type = findkey.type;
							var value = findkey.value;
							if (value && type) {
								if (type == "number") {
									return Number(value);
								}
								else if (type == "boolean") {
									return (value == "true") ? true : false;
								}
								else if (type == "nexacrodate") {
									var year = value.substring(0, 4);
									var month = value.substring(4, 6);
									var date = value.substring(6, 8);
									var hour = value.substring(8, 10);
									var minute = value.substring(10, 12);
									var second = value.substring(12, 14);
									var millisecond = value.substring(14, 16);
									return new nexacro.Date(year, month, date, hour, minute, second, millisecond);
								}
								else if (type == "date") {
									return new Date(value);
								}
								else if (type == "decimal") {
									return new nexacro.Decimal(value);
								}
								return value;
							}
						}
					}
				}
			};
		}


		nexacro._getGlobalValueData = function (key, url) {
			if (application._globalvalue) {
				return application._globalvalue;
			}

			if (window.name && key && url) {
				var globalvars = "";
				var items = window.name.split(',');
				if (items.length) {
					var fields = items[0].split(':');
					if (fields[0] == key && unescape(fields[1]) == url) {
						globalvars = items.splice(1, items.length - 1).join(',');
					}
				}
				application._globalvalue = globalvars;
				return globalvars;
			}
		};

		nexacro._createPopupWindowHandle = function (parent_win, target_win, name, left, top, width, height) {
			var _doc = parent_win._dest_doc;
			var _dest_handle = parent_win._dest_handle;

			var parent_width = parent_win.clientWidth;
			var parent_height = parent_win.clientHeight;

			var _handle = null;
			if (left == null) {
				left = Math.floor((parent_width - width) / 2);
			}
			if (top == null) {
				top = Math.floor((parent_height - height) / 2);
			}

			_handle = _doc.createElement("div");
			_handle.id = 'popupwindow_' + name;

			var layer_info;
			if (target_win.comp && target_win.comp instanceof nexacro.WaitComponent) {
				layer_info = {
				};
				layer_info.popup_zindex = nexacro._zindex_waitcursor;
			}
			else if (target_win.comp) {
				layer_info = target_win._getComponentLayerInfo(target_win.comp);
			}

			if (layer_info) {
				if (layer_info.is_modal) {
					var frame = layer_info.frame;
					var overlay_elem = frame._modal_overlay_elem;
					_dest_handle = overlay_elem._handle;
					_dest_handle.appendChild(_handle);
				}
				else {
					if (layer_info.ref_first_modal_frame) {
						var frame = layer_info.ref_first_modal_frame;
						_ref_handle = frame._modal_overlay_elem._handle;
						_dest_handle = nexacro._getPopupWindowDestinationHandle(_handle);
						_dest_handle.insertBefore(_handle, _ref_handle);
					}
					else {
						_dest_handle = nexacro._getPopupWindowDestinationHandle(_handle);
						_dest_handle.appendChild(_handle);
					}
				}
			}
			else {
				_dest_handle = nexacro._getPopupWindowDestinationHandle(_handle);
				_dest_handle.appendChild(_handle);
			}

			_handle._dest_handle = _dest_handle;
			_handle._linked_window = target_win;

			var handle_style = _handle.style;
			handle_style.position = "absolute";
			handle_style.overflow = "hidden";
			handle_style.margin = "0px";
			handle_style.border = "0px";

			handle_style.left = (left | 0) + "px";
			handle_style.top = (top | 0) + "px";
			handle_style.width = (width | 0) + "px";
			handle_style.height = (height | 0) + "px";

			handle_style.zIndex = layer_info ? layer_info.popup_zindex : nexacro._zindex_popup;

			target_win.attachHandle(_handle);
		};
		nexacro._closePopupWindowHandle = function (_handle) {
			if (_handle) {
				var _dest_handle = _handle._dest_handle;
				{

					nexacro.__removeDOMNode(_dest_handle, _handle);
				}
				_handle._linked_window = null;
			}
		};

		nexacro._getPopupWindowDocumentHandle = function (_handle) {
			var _doc = (_handle.ownerDocument || _handle.document);
			return _doc;
		};

		nexacro._getPopupWindowDestinationHandle = function (_handle) {
			var _doc = (_handle.ownerDocument || _handle.document);
			return _doc.body;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__getRootWindowHandleOfPopupWindow = function (_handle) {
				var _doc = (_handle.ownerDocument || _handle.document);
				return _doc.parentWindow;
			};
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro.__getRootWindowHandleOfPopupWindow = function (_handle) {
				var _doc = (_handle.ownerDocument || _handle.document);
				return _doc.defaultView;
			};
		}
		else {
			nexacro.__getRootWindowHandleOfPopupWindow = function (_handle) {
				var _doc = (_handle.ownerDocument || _handle.document);
				return _doc.defaultView;
			};
		}

		nexacro._getPopupWindowHandlePosX = function (_handle) {
			var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(_handle);
			return nexacro._getWindowHandlePosX(_win_handle) + _handle.offsetLeft;
		};
		nexacro._getPopupWindowHandlePosY = function (_handle) {
			var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(_handle);
			return nexacro._getWindowHandlePosY(_win_handle) + _handle.offsetTop;
		};

		nexacro._getPopupWindowHandleOuterWidth = function (_handle) {
			return _handle.offsetWidth;
		};
		nexacro._getPopupWindowHandleOuterHeight = function (_handle) {
			return _handle.offsetHeight;
		};

		nexacro._getPopupWindowHandleClientWidth = function (_handle) {
			return _handle.clientWidth;
		};
		nexacro._getPopupWindowHandleClientHeight = function (_handle) {
			return _handle.clientHeight;
		};

		nexacro._setPopupWindowHandleArea = function (_handle, x, y, w, h) {
			if (_handle) {
				var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(_handle);
				x -= nexacro._getWindowHandlePosX(_win_handle);
				y -= nexacro._getWindowHandlePosY(_win_handle);

				var handle_style = _handle.style;
				handle_style.left = (x | 0) + "px";
				handle_style.top = (y | 0) + "px";
				handle_style.width = (w | 0) + "px";
				handle_style.height = (h | 0) + "px";
			}
		};
		nexacro._setPopupWindowHandlePos = function (_handle, x, y) {
			if (_handle) {
				var _win_handle = nexacro.__getRootWindowHandleOfPopupWindow(_handle);
				x -= nexacro._getWindowHandlePosX(_win_handle);
				y -= nexacro._getWindowHandlePosY(_win_handle);

				var handle_style = _handle.style;
				handle_style.left = (x | 0) + "px";
				handle_style.top = (y | 0) + "px";
			}
		};

		nexacro._setPopupWindowHandleSize = function (_handle, w, h) {
			if (_handle) {
				var handle_style = _handle.style;
				handle_style.width = (w | 0) + "px";
				handle_style.height = (h | 0) + "px";
			}
		};

		nexacro._blockScript = function () {
		};

		nexacro._unblockScript = function () {
		};

		nexacro._setPopupWindowHandleVisible = function (_handle, visible_flag) {
			if (_handle) {
				var handle_style = _handle.style;
				if (handle_style) {
					handle_style.visibility = (visible_flag === true) ? "" : "hidden";
				}
			}
		};

		nexacro._showQuickviewMenu = function (comp, sx, sy) {
		};
		nexacro._setSystemMenuResizable = function (_handle, resizable) {
		};
		nexacro._procSysCommand = function (_handle, command) {
		};
		nexacro._setWindowHandleLock = function (_handle, is_lock, _except_handle, is_modal_async) {
			nexacro.__setWindowHandleLock(_handle, is_lock, _except_handle, is_modal_async);
		};

		nexacro.__setWindowHandleLock = function (_handle, is_lock, _except_handle, is_modal_async) {
			var __handle = _handle;
			if (__handle == null) {
				__handle = window;
			}

			var _window = __handle._linked_window;
			while (_window) {
				if (_window.parent) {
					_window = _window.parent;
				}
				else {
					break;
				}
			}

			if (_window == null) {
				return;
			}

			var _except_window = _except_handle ? _except_handle._linked_window : null;
			nexacro.__setWindowHandleEnableByRef(_window, !is_lock, _except_window, true, true);
		};

		nexacro.__setWindowHandleEnableByRef = function (_window, is_enable, _except_window, is_recursive, is_modal_async) {
			if (_window != _except_window) {
				if (is_enable) {
					_window._disable_ref--;
					if (_window._disable_ref == 0) {
						_window._coverUnlock(_except_window);
					}
				}
				else {
					if (_window._disable_ref == 0) {
						_window._coverLock(_except_window);
					}
					_window._disable_ref++;
				}
			}

			if (is_recursive) {
				for (var i = 0; i < _window._child_list.length; i++) {
					var child = _window._child_list[i];
					if (child.frame) {
						nexacro.__setWindowHandleEnableByRef(child, is_enable, _except_window, true, true);
					}
				}
			}
		};

		nexacro._requestAnimationFrame = function (_window, callback) {
			if (!_window) {
				return;
			}
			var win_handle = _window._handle;
			if (!win_handle) {
				return;
			}
			var requestAnimationFrame = win_handle.requestAnimationFrame || win_handle.mozRequestAnimationFrame || win_handle.webkitRequestAnimationFrame || win_handle.msRequestAnimationFrame;
			if (!requestAnimationFrame) {
				return;
			}
			var requestid = requestAnimationFrame.call(win_handle, callback);
			return requestid;
		};

		nexacro._cancelAnimationFrame = function (_window, requestid) {
			if (!_window) {
				return;
			}
			var win_handle = _window._handle;
			if (!win_handle) {
				return;
			}
			var cancelAnimationFrame = win_handle.cancelAnimationFrame || win_handle.mozCancelAnimationFrame || win_handle.webkitCancelAnimationFrame;
			if (cancelAnimationFrame) {
				cancelAnimationFrame.call(win_handle, requestid);
			}
		};

		nexacro.__setViewportScale = function () {
			var _tester = nexacro._device_exception_tester;
			if (_tester.screen_checked == false) {
				var orientation_str = nexacro._isPortrait() ? "portrait" : "landscape";
				_tester.init_screen_width = nexacro._getScreenWidth();
				_tester.is_init_screen_portrait = nexacro._isPortrait();
				_tester[orientation_str + "_screen_width"] = nexacro._getScreenWidth();
				_tester.screen_checked = true;
			}

			var use_autozoom = (nexacro._zoom_factor == 0 ? false : true);
			var ratio = (use_autozoom ? nexacro._zoom_factor / 100 : 1.0);
			var minimum_scale = nexacro._minimum_scale;
			var maximum_scale = nexacro._maximum_scale;
			var is_scalable = (minimum_scale < maximum_scale ? 1 : 0);
			if (minimum_scale == undefined && maximum_scale == undefined) {
				is_scalable = (use_autozoom ? false : true);
			}

			if (nexacro._isDesktop()) {
				use_autozoom = false;
				ratio = 1.0;
				is_scalable = false;
			}

			if (is_scalable) {
				nexacro._allow_default_pinchzoom = true;
			}
			else {
				if (minimum_scale == undefined) {
					minimum_scale = 1;
				}
				if (maximum_scale == undefined) {
					maximum_scale = 1;
				}
			}


			var elems = document.getElementsByName("viewport");
			var viewport;
			if (elems && elems[0]) {
				viewport = elems[0];
			}

			var contents = [];
			if (!viewport) {
				var head = document.getElementsByTagName("head")[0];
				viewport = document.createElement("meta");
				viewport.name = "viewport";
				head.appendChild(viewport);

				viewport.content = "initial-scale=1.0, user-scalable=" + is_scalable;
				contents = viewport.content.split(",");
			}
			else {
				contents = viewport.content.split(",");
			}

			function __remove_attribute (attr_name) {
				for (var i = 0; i < contents.length; i++) {
					var name = nexacro.trim(contents[i].split("=")[0]);
					if (name == attr_name) {
						contents.splice(i, 1);
						break;
					}
				}
			}
			function __set_attribute (attr_name, attr_value) {
				var content = attr_name + "=" + attr_value;
				var is_found = false;
				for (var i = 0; i < contents.length; i++) {
					var name = nexacro.trim(contents[i].split("=")[0]);
					if (name == attr_name) {
						is_found = true;
						contents[i] = content;
						break;
					}
				}
				if (!is_found) {
					contents.push(content);
				}
			}

			if (ratio == 1.0) {
				if (use_autozoom === false) {
					if (is_scalable) {
						contents = ["user-scalable=1", "target-densitydpi=device-dpi"
						];

						if (minimum_scale != undefined) {
							__set_attribute("initial-scale", minimum_scale);
							__set_attribute("minimum-scale", minimum_scale);
						}
						if (maximum_scale != undefined) {
							__set_attribute("maximum-scale", maximum_scale);
						}

						if (nexacro.OS == "iOS") {
							__set_attribute("initial-scale", "1");
						}
					}
					else {
						contents = ["user-scalable=0", "target-densitydpi=device-dpi"
						];

						if (nexacro.OS == "iOS") {
							__set_attribute("initial-scale", "1");
						}
					}
				}
				else {
					contents = ["intial-scale=1.0", "user-scalable=" + is_scalable, "width=device-width", "minimum-scale=" + minimum_scale, "maximum-scale=" + maximum_scale, "target-densitydpi=device-dpi"
					];
				}

				viewport.setAttribute('content', contents.toString());
				return;
			}

			__set_attribute("user-scalable", is_scalable);

			__set_attribute("initial-scale", ratio);

			__set_attribute("minimum-scale", ratio * minimum_scale);
			__set_attribute("maximum-scale", ratio * maximum_scale);

			var screen_width = nexacro._getScreenWidth();
			if (nexacro.OS == "Android") {
				var cur_orientation = nexacro._getMobileOrientation();
				if (cur_orientation == 2 || cur_orientation == 3) {
					is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
					var force_swap = nexacro._searchDeviceExceptionValue("force_swap");
					if (is_swap_screen == false || force_swap) {
						screen_width = nexacro._getScreenHeight();
					}
				}
				__set_attribute("target-densitydpi", "device-dpi");
			}

			__set_attribute("width", screen_width / ratio);

			if (window._linked_window == undefined) {
				var win_handle = window;
				var win = win_handle._linked_window;
				var old_window_width = nexacro._getWindowHandleClientWidth(win_handle);

				_tester._viewport_resize_observer = setInterval(function () {
					cur_window_width = nexacro._getWindowHandleClientWidth(win_handle);
					if (old_window_width != cur_window_width) {
						clearInterval(_tester._viewport_resize_observer);
						_tester._viewport_resize_observer = null;

						if (!win) {
							win = win_handle._linked_window;
						}
						if (win) {
							win.frame._setSize(nexacro._getWindowHandleClientWidth(win_handle), nexacro._getWindowHandleClientHeight(win_handle), 0);
						}
					}
				}, 100);

				var use_windowsize_as_bodysize = nexacro._searchDeviceExceptionValue("use_windowsize_as_bodysize");
				if (use_windowsize_as_bodysize) {
					_tester.use_windowsize_as_bodysize = true;
				}
			}

			var set_viewport_twice_ranged_scale = nexacro._searchDeviceExceptionValue("set_vp_twice_ranged_scale");

			if (set_viewport_twice_ranged_scale && minimum_scale < maximum_scale) {
				var ranged_scale_viewport_delay = 500;
				if (nexacro.OS == "iOS") {
					ranged_scale_viewport_delay = 100;
				}


				setTimeout(function () {
					__set_attribute("maximum-scale", ratio);
					viewport.setAttribute('content', contents.toString());
				}, 1);

				setTimeout(function () {
					__set_attribute("maximum-scale", maximum_scale * ratio);
					viewport.setAttribute('content', contents.toString());
				}, ranged_scale_viewport_delay);
			}
			else {
				viewport.setAttribute('content', contents.toString());
			}
		};

		nexacro._deleteTraceLogFile = nexacro._emptyFn;
		nexacro._writeTraceLog = function (msglevel, message, bsystemlog, loglevel) {
			var data;
			data = (bsystemlog == true) ? "S" : "U";

			if (msglevel == 0) {
				data += "F";
			}
			else if (msglevel == 1) {
				data += "E";
			}
			else if (msglevel == 2) {
				data += "W";
			}
			else if (msglevel == 3) {
				data += "I";
			}
			else {
				data += "D";
			}

			var curdate = new Date();
			data = data + " " + curdate.getHours() + ":" + curdate.getMinutes() + ":" + curdate.getSeconds() + ":" + curdate.getMilliseconds() + " ";
			data += message;

			if (window.console) {
				window.console.log(data);
			}
		};


		nexacro._applicationExit = function (is_close_window) {
			window.system = null;
			window.application = null;

			if (is_close_window === true) {
				window.open('', '_self');
				window.close();
			}

			if (nexacro.Device) {
				nexacro.Device.exit();
			}
		};

		nexacro._setUseHttpKeepAlive = nexacro._emptyFn;

		nexacro._setHttpTimeout = function (v) {
			var timeout = nexacro._parseInt(v);
			application.httptimeout = (timeout > 0) ? timeout : 0;
		};

		nexacro._setHttpRetry = function (v) {
			var httpretry = nexacro._parseInt(v);
			application.httpretry = (httpretry > 0) ? httpretry : 0;
		};

		nexacro.__getWindowHandleEnable = function (win_handle, id) {
			if (!win_handle) {
				return false;
			}

			var _window = application._is_attach_childframe ? win_handle._linked_window[id] : win_handle._linked_window;
			if (!_window) {
				return false;
			}

			if (_window._disable_ref > 0) {
				return false;
			}

			return true;
		};

		nexacro._setWindowHandleFocus = function (win_handle) {
			if (!win_handle) {
				return;
			}

			if (win_handle.setActive) {
				win_handle.setActive();
			}
			else if (win_handle.focus) {
				win_handle.focus();
			}
		};

		nexacro.__getElementFromPoint = function (_win_handle, x, y) {
			if (x === undefined || y === undefined) {
				return null;
			}
			var doc = _win_handle.document;
			var elem_handle = doc.elementFromPoint(x, y);
			if (elem_handle) {
				return nexacro.__findParentElement(elem_handle);
			}

			return null;
		};

		nexacro._getHoverElement = function (_win) {
			if (!_win) {
				return null;
			}

			var pointX = _win._cur_client_pos.x;
			var pointY = _win._cur_client_pos.y;
			if (!(nexacro.Browser == "Chrome" && nexacro.BrowserVersion > 42)) {
				if (window.pageXOffset > 0) {
					pointX -= window.pageXOffset;
				}
				if (window.pageYOffset > 0) {
					pointY -= window.pageYOffset;
				}
			}

			return nexacro.__getElementFromPoint(_win._handle, pointX, pointY);
		};

		nexacro._getEvtId = function (evt) {
			var id = null;
			if (evt) {
				var id = evt.id;
				if (!id) {
					id = evt.currentTarget ? evt.currentTarget.id : 0;
				}
			}

			return id ? id : 0;
		};

		nexacro._getHtmlSysEvent = function (event, id) {
			if (application._is_attach_childframe) {
				return event ? event[id] : null;
			}

			return event;
		};

		nexacro._addExtensionModule = nexacro._emptyFn;
		nexacro._loadExtensionModules = nexacro._emptyFn;
		nexacro._deleteCacheDB = nexacro._emptyFn;




		nexacro._device_exception_tester = {
			init_screen_width : undefined, 
			is_init_screen_portrait : undefined, 
			screen_checked : false, 
			screen_swap_checked : false, 
			delayed_swap_screen_checked : false, 
			swap_screen : undefined, 
			delayed_swap_screen : undefined, 
			swap_screen_timer : null, 
			use_windowsize_as_bodysize : false
		};
		nexacro._device_exception_table = [{
			orientationchange_reset_viewport : (nexacro.OS == "Android") ? true : false, 
			swap_screen : (nexacro.OS == "Android") ? true : false, 
			delayed_reset_viewport : false, 
			delayed_swap_screen : false, 
			is_portrait_device : (nexacro.OS == "Android") ? (((nexacro.Browser == "Runtime" && nexacro.__isPhone && nexacro.__isPhone()) || (nexacro.Browser != "Runtime" && nexacro._isMobile())) ? (true) : (undefined)
)
				 : (undefined), 
			reset_viewport_delay : 0, 
			use_windowsize_as_bodysize : false, 
			set_vp_twice_ranged_scale : true, 
			force_swap : false
		}, {
			model : "SM-T800", 
			browser : "stock", 
			is_portrait_device : true, 
			force_swap : true
		}, {
			model : "SM-T800", 
			browser : "Chrome", 
			is_portrait_device : true, 
			force_swap : true
		}, {
			model : "SHW-M380S", 
			browser : "stock", 
			is_portrait_device : false
		}, {
			model : "SHW-M380S", 
			browser : "Chrome", 
			is_portrait_device : false
		}, {
			model : "LG-F320S", 
			browser : "stock", 
			swap_screen : false
		}, {
			model : "LG-F320S", 
			browser : "Chrome", 
			delayed_swap_screen : true
		}, {
			model : "LG-F320L", 
			browser : "Chrome", 
			delayed_swap_screen : true
		}, {
			model : "LG-F320K", 
			browser : "Chrome", 
			delayed_swap_screen : true
		}, {
			model : "SHW-M440S", 
			browser : "stock", 
			os_version : "4.3", 
			swap_screen : false
		}, {
			model : "SHV-E250S", 
			browser : "stock", 
			os_version : "4.4.2", 
			swap_screen : false, 
			use_windowsize_as_bodysize : true
		}, {
			model : "SAMSUNG SM-N900S", 
			browser : "Chrome", 
			os_version : "4.4.2", 
			swap_screen : false, 
			use_windowsize_as_bodysize : true
		}, {
			model : "LG-F400K", 
			browser : "Chrome", 
			delayed_swap_screen : true
		}, {
			model : "LG-F410S", 
			browser : "Chrome", 
			set_vp_twice_ranged_scale : false
		}, {
			model : "SAMSUNG SHV-E300S", 
			browser : "Chrome", 
			reset_viewport_delay : 0
		}, {
			model : "SHV-E300S", 
			browser : "Chrome", 
			reset_viewport_delay : 300, 
			is_portrait_device : true
		}, {
			model : "SHV-E300K", 
			browser : "Chrome", 
			reset_viewport_delay : 300, 
			is_portrait_device : true
		}, {
			model : "SHV-E300L", 
			browser : "Chrome", 
			reset_viewport_delay : 300, 
			is_portrait_device : true
		}, {
			model : "SAMSUNG SHV-E330S", 
			browser : "Chrome", 
			reset_viewport_delay : 0
		}, {
			model : "SHV-E330S", 
			browser : "Chrome", 
			reset_viewport_delay : 300, 
			is_portrait_device : true
		}, {
			model : "LG-F240L", 
			browser : "Chrome", 
			delayed_swap_screen : true
		}, {
			model : "IM-A910K", 
			browser : "Chrome", 
			delayed_swap_screen : true
		}, {
		}
		];

		nexacro._searchDeviceExceptionTable = function () {
			if (nexacro.OS != "Android") {
				return null;
			}

			var browser = nexacro.Browser == "Chrome" ? nexacro.Browser : "stock";

			var table = nexacro._device_exception_table;
			var len = table.length;
			for (var i = 0; i < len; i++) {
				if (table[i].model === undefined) {
					continue;
				}

				if (browser != table[i].browser) {
					continue;
				}

				if (table[i]["os_version"]) {
					if (table[i].os_version != nexacro.OSVersion) {
						continue;
					}
				}

				var userAgent = nexacro._getUserAgent();

				if (userAgent.indexOf(table[i].model) >= 0) {
					return table[i];
				}
			}

			return null;
		};

		nexacro._searchDeviceExceptionValue = function (exception_type) {
			var exception = nexacro._searchDeviceExceptionTable();
			if (exception && exception[exception_type] !== undefined) {
				return exception[exception_type];
			}

			exception = nexacro._device_exception_table[0];
			return exception[exception_type];
		};


		if (nexacro.isTouchInteraction && nexacro.Browser == "Chrome" && nexacro.BrowserVersion > 42) {
			nexacro.__adjustBoundingClientRect = function (_doc) {
				return [_doc.defaultView.pageXOffset, _doc.defaultView.pageYOffset];
			};
		}
		else {
			nexacro.__adjustBoundingClientRect = function (_doc) {
				return [0, 0];
			};
		}

		nexacro.__setWindowHandleBaseScrollOffset = nexacro._emptyFn;
		nexacro.__getWindowHandleBaseScrollPositionX = nexacro._emptyFn;
		nexacro.__getWindowHandleBaseScrollPositionY = nexacro._emptyFn;

		nexacro._createTrayHandle = nexacro._emptyFn;
		nexacro._removeTrayHandle = nexacro._emptyFn;
		nexacro._setTrayIconHandle = nexacro._emptyFn;
		nexacro._setTrayTooltipHandle = nexacro._emptyFn;
		nexacro._showTrayBalloonTipHandle = nexacro._emptyFn;
		nexacro._createTrayPopupMenuHandle = nexacro._emptyFn;
		nexacro._destroyTrayPopupMenuHandle = nexacro._emptyFn;
		nexacro._setTrayPopupMenuItemHandle = nexacro._emptyFn;
		nexacro._displayTrayPopupMenuHandle = nexacro._emptyFn;

		nexacro._syshandler_ontray_forward = nexacro._emptyFn;
	}
}
