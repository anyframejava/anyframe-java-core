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

if (nexacro.Browser == "Runtime") {
	if (!nexacro._init_platform_runtime) {
		nexacro._init_platform_runtime = true;
		nexacro.isTouchInteraction = (nexacro._getOS() == "Android");
		nexacro.SupportTouch = nexacro.__getSupportTouch();
		nexacro._resize_popup_inbound = false;

		nexacro._syshandler_onlbuttondown_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_lbuttondown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onlbuttonup_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_lbuttonup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onrbuttondown_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_rbuttondown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onrbuttonup_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_rbuttonup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onmousedown_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_mousedown(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onmouseup_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_mouseup(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};

		nexacro._syshandler_onmousemove_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			_window._cur_client_pos.x = windowX;
			_window._cur_client_pos.y = windowY;

			elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(windowX, windowY) : elem;
			return _window._on_sys_mousemove(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onmouseenter_forward = function (_window, elem, from_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(windowX, windowY) : elem;
			return _window._on_sys_mouseenter(elem, from_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onmouseleave_forward = function (_window, elem, to_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			elem = (elem && elem.setSelectEventPassElement) ? elem.setSelectEventPassElement(windowX, windowY) : elem;
			return _window._on_sys_mouseleave(elem, to_elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_onmousewheel_forward = function (_window, elem, wheelDelta, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_mousewheel(elem, 0, wheelDelta, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_ondragenter_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, filelist) {
			filelist = filelist.split(",");
			_window._on_sys_dragenter(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY, filelist);
		};
		nexacro._syshandler_ondragover_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			_window._on_sys_dragover(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_ondragleave_forward = function (_window) {
			_window._on_sys_dragleave();
		};
		nexacro._syshandler_ondrop_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			_window._on_sys_drop(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};
		nexacro._syshandler_ontouchstart_forward = function (_window, elem, touchid, time, windowX, windowY, screenX, screenY, is_last_changedtouch) {
			return _window._on_sys_touchstart(elem, touchid, windowX, windowY, screenX, screenY, time, time, is_last_changedtouch);
		};
		nexacro._syshandler_ontouchmove_forward = function (_window, elem, touchid, time, windowX, windowY, screenX, screenY, is_last_changedtouch) {
			return _window._on_sys_touchmove(elem, touchid, windowX, windowY, screenX, screenY, time, time, is_last_changedtouch);
		};
		nexacro._syshandler_ontouchend_forward = function (_window, elem, touchid, time, windowX, windowY, screenX, screenY, is_last_changedtouch) {
			return _window._on_sys_touchend(elem, touchid, windowX, windowY, screenX, screenY, time, time, is_last_changedtouch);
		};
		nexacro._syshandler_onmousehover_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			if (elem && elem._handle) {
				nexacro.__showElementHandleTooltip(elem._handle, windowX, windowY);
			}
		};


		nexacro._syshandler_ondblclick_forward = function (_window, elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY) {
			return _window._on_sys_dblclick(elem, strButton, altKey, ctrlKey, shiftKey, windowX, windowY, screenX, screenY);
		};

		nexacro._syshandler_onkeydown_forward = function (_window, elem, keycode, altKey, ctrlKey, shiftKey) {
			return _window._on_sys_keydown(elem, keycode, altKey, ctrlKey, shiftKey);
		};
		nexacro._syshandler_onkeypress_forward = function (_window, elem, keycode, altKey, ctrlKey, shiftKey) {
			return _window._on_sys_keypress(elem, keycode, altKey, ctrlKey, shiftKey);
		};
		nexacro._syshandler_onkeyup_forward = function (_window, elem, keycode, altKey, ctrlKey, shiftKey) {
			return _window._on_sys_keyup(elem, keycode, altKey, ctrlKey, shiftKey);
		};

		nexacro._syshandler_oncontextmenu_forward = function (_window, elem) {
			return _window._on_sys_activate(elem);
		};
		nexacro._syshandler_onresize_forward = function (_window, width, height, wparam) {
			return _window._on_sys_resize(width, height, wparam);
		};
		nexacro._syshandler_onmove_forward = function (_window, left, top) {
			return _window._on_sys_move(left, top);
		};
		nexacro._syshandler_ongetminmaxinfo_forward = function (_window) {
			return _window._on_sys_getminmaxinfo();
		};
		nexacro._syshandler_onactivate_forward = function (_window) {
			return _window._on_sys_activate();
		};
		nexacro._syshandler_ondeactivate_forward = function (_window) {
			return _window._on_sys_deactivate();
		};
		nexacro._syshandler_onclose_forward = function (_window) {
			nexacro._stopWindowEventHandler(_window);
			return _window._on_sys_close();
		};
		nexacro._syshandler_onbeforeclose_forward = function (_window) {
			var confirm_message = _window._on_sys_beforeclose();
			if (confirm_message !== undefined && confirm_message != "") {
				return nexacro._confirm(_window.frame, confirm_message);
			}

			return true;
		};

		nexacro._syshandler_onreload_forward = function (_window, elem) {
			return _window._on_sys_reload(elem);
		};

		nexacro._syshandler_onviewsource_forward = function (_window, elem) {
			if (elem) {
				var comp = _window.findComponent(elem);
				if (comp) {
					var formurl, ref_form = comp;

					while (ref_form._type_name != "Form" && !ref_form.url) {
						ref_form = ref_form.parent;
					}

					if (ref_form) {
						var owner = ref_form.parent;
						if (comp.url) {
							formurl = comp.url;
						}
						else if (owner._is_frame) {
							formurl = owner.formurl;
						}
						else {
							if (ref_form._url) {
								formurl = ref_form._url.replace("xfdl.js", "xfdl");
								formurl = "./" + formurl.substr(application._project_url.length);
							}
						}
						nexacro.__simulatorViewSource(formurl);
					}
				}
			}
		};

		nexacro._syshandler_onsyscommand_forward = function (_window, elem, command) {
			var ret = _window._on_sys_syscommand(command);
			if (_window._handle) {
				nexacro.__refreshDirtyWindow(_window._handle);
			}
			return ret;
		};

		nexacro._syshandler_onncmousedown_forward = function (_window, elem, command) {
			return application._checkClosePopupComponent();
		};

		nexacro._syshandler_onload_forward = function (_window) {
			return _window._on_sys_load(_window);
		};

		nexacro._syshandler_onduplicateexcution_forward = function (_window, _globalvalue) {
			return application.on_fire_onduplicateexcution(_globalvalue);
		};


		nexacro._syshandler_onorientationchange_forward = function (_window, orientation) {
			return _window._on_sys_orientationchange(orientation);
		};

		nexacro._syshandler_onaccessibilitygesture_forward = function (_window, direction) {
			return _window._on_sys_accessibilitygesture(direction);
		};

		nexacro._syshandler_onaccessibilityhover_forward = function (_window, elem, windowX, windowY, screenX, screenY) {
			return _window._on_sys_accessibilityhover(elem, windowX, windowY, screenX, screenY);
		};

		nexacro._initWindowEventHandler = function (_window, _handle) {
			var win_handle = (_handle ? _handle : _window._handle);
			if (win_handle) {
				nexacro._observeSysEvent(win_handle, "lbuttondown", "onlbuttondown", nexacro._syshandler_onlbuttondown_forward);
				nexacro._observeSysEvent(win_handle, "lbuttonup", "onlbuttonup", nexacro._syshandler_onlbuttonup_forward);
				nexacro._observeSysEvent(win_handle, "rbuttondown", "onrbuttondown", nexacro._syshandler_onrbuttondown_forward);
				nexacro._observeSysEvent(win_handle, "rbuttonup", "onrbuttonup", nexacro._syshandler_onrbuttonup_forward);
				nexacro._observeSysEvent(win_handle, "mousedown", "onmousedown", nexacro._syshandler_onmousedown_forward);
				nexacro._observeSysEvent(win_handle, "mouseup", "onmouseup", nexacro._syshandler_onmouseup_forward);

				nexacro._observeSysEvent(win_handle, "mousemove", "onmousemove", nexacro._syshandler_onmousemove_forward);
				nexacro._observeSysEvent(win_handle, "mouseenter", "onmouseenter", nexacro._syshandler_onmouseenter_forward);
				nexacro._observeSysEvent(win_handle, "mouseleave", "onmouseleave", nexacro._syshandler_onmouseleave_forward);
				nexacro._observeSysEvent(win_handle, "mousewheel", "onmousewheel", nexacro._syshandler_onmousewheel_forward);
				nexacro._observeSysEvent(win_handle, "mousehover", "onmousehover", nexacro._syshandler_onmousehover_forward);

				nexacro._observeSysEvent(win_handle, "dragenter", "ondragenter", nexacro._syshandler_ondragenter_forward);
				nexacro._observeSysEvent(win_handle, "dragover", "ondragover", nexacro._syshandler_ondragover_forward);
				nexacro._observeSysEvent(win_handle, "dragleave", "ondragleave", nexacro._syshandler_ondragleave_forward);
				nexacro._observeSysEvent(win_handle, "drop", "ondrop", nexacro._syshandler_ondrop_forward);

				if (nexacro.SupportTouch) {
					nexacro._observeSysEvent(win_handle, "touchstart", "ontouchstart", nexacro._syshandler_ontouchstart_forward);
					nexacro._observeSysEvent(win_handle, "touchmove", "ontouchmove", nexacro._syshandler_ontouchmove_forward);
					nexacro._observeSysEvent(win_handle, "touchend", "ontouchend", nexacro._syshandler_ontouchend_forward);
				}

				nexacro._observeSysEvent(win_handle, "dblclick", "ondblclick", nexacro._syshandler_ondblclick_forward);

				nexacro._observeSysEvent(win_handle, "keydown", "onkeydown", nexacro._syshandler_onkeydown_forward);
				nexacro._observeSysEvent(win_handle, "keypress", "onkeypress", nexacro._syshandler_onkeypress_forward);
				nexacro._observeSysEvent(win_handle, "keyup", "onkeyup", nexacro._syshandler_onkeyup_forward);

				nexacro._observeSysEvent(win_handle, "contextmenu", "oncontextmenu", nexacro._syshandler_oncontextmenu_forward);
				nexacro._observeSysEvent(win_handle, "resize", "onresize", nexacro._syshandler_onresize_forward);
				nexacro._observeSysEvent(win_handle, "move", "onmove", nexacro._syshandler_onmove_forward);
				nexacro._observeSysEvent(win_handle, "getminmaxinfo", "ongetminmaxinfo", nexacro._syshandler_ongetminmaxinfo_forward);

				nexacro._observeSysEvent(win_handle, "activate", "onactivate", nexacro._syshandler_onactivate_forward);
				nexacro._observeSysEvent(win_handle, "deactivate", "ondeactivate", nexacro._syshandler_ondeactivate_forward);
				nexacro._observeSysEvent(win_handle, "close", "onclose", nexacro._syshandler_onclose_forward);
				nexacro._observeSysEvent(win_handle, "beforeclose", "onbeforeclose", nexacro._syshandler_onbeforeclose_forward);

				nexacro._observeSysEvent(win_handle, "tray", "ontray", nexacro._syshandler_ontray_forward);

				nexacro._observeSysEvent(win_handle, "reload", "onreload", nexacro._syshandler_onreload_forward);
				nexacro._observeSysEvent(win_handle, "viewsource", "onviewsource", nexacro._syshandler_onviewsource_forward);

				nexacro._observeSysEvent(win_handle, "syscommand", "onsyscommand", nexacro._syshandler_onsyscommand_forward);

				nexacro._observeSysEvent(win_handle, "ncmousedown", "onncmousedown", nexacro._syshandler_onncmousedown_forward);

				nexacro._observeSysEvent(win_handle, "duplicateexcution", "onduplicateexcution", nexacro._syshandler_onduplicateexcution_forward);

				nexacro._observeSysEvent(win_handle, "orientationchange", "onorientationchange", nexacro._syshandler_onorientationchange_forward);

				nexacro._observeSysEvent(win_handle, "accessibilitygesture", "onaccessibilitygesture", nexacro._syshandler_onaccessibilitygesture_forward);
				nexacro._observeSysEvent(win_handle, "accessibilityhover", "onaccessibilityhover", nexacro._syshandler_onaccessibilityhover_forward);

				nexacro.__refreshDirtyWindow(win_handle);
			}
		};

		nexacro._stopWindowEventHandler = function (_window) {
			var win_handle = _window._handle;
			if (win_handle) {
				nexacro._stopSysObserving(win_handle, "lbuttondown", "onlbuttondown", nexacro._syshandler_onlbuttondown_forward);
				nexacro._stopSysObserving(win_handle, "lbuttonup", "onlbuttonup", nexacro._syshandler_onlbuttonup_forward);
				nexacro._stopSysObserving(win_handle, "rbuttondown", "onrbuttondown", nexacro._syshandler_onrbuttondown_forward);
				nexacro._stopSysObserving(win_handle, "rbuttonup", "onrbuttonup", nexacro._syshandler_onrbuttonup_forward);
				nexacro._stopSysObserving(win_handle, "mousedown", "onmousedown", nexacro._syshandler_onmousedown_forward);
				nexacro._stopSysObserving(win_handle, "mouseup", "onmouseup", nexacro._syshandler_onmouseup_forward);

				nexacro._stopSysObserving(win_handle, "mousemove", "onmousemove", nexacro._syshandler_onmousemove_forward);
				nexacro._stopSysObserving(win_handle, "mouseenter", "onmouseenter", nexacro._syshandler_onmouseenter_forward);
				nexacro._stopSysObserving(win_handle, "mouseleave", "onmouseleave", nexacro._syshandler_onmouseleave_forward);
				nexacro._stopSysObserving(win_handle, "mousewheel", "onmousewheel", nexacro._syshandler_onmousewheel_forward);
				nexacro._stopSysObserving(win_handle, "mousehover", "onmousehover", nexacro._syshandler_onmousehover_forward);

				nexacro._stopSysObserving(win_handle, "dragenter", "ondragenter", nexacro._syshandler_ondragenter_forward);
				nexacro._stopSysObserving(win_handle, "dragover", "ondragover", nexacro._syshandler_ondragover_forward);
				nexacro._stopSysObserving(win_handle, "dragleave", "ondragleave", nexacro._syshandler_ondragleave_forward);
				nexacro._stopSysObserving(win_handle, "drop", "ondrop", nexacro._syshandler_ondrop_forward);

				if (nexacro.SupportTouch) {
					nexacro._stopSysObserving(win_handle, "touchstart", "ontouchstart", nexacro._syshandler_ontouchstart_forward);
					nexacro._stopSysObserving(win_handle, "touchmove", "ontouchmove", nexacro._syshandler_ontouchmove_forward);
					nexacro._stopSysObserving(win_handle, "touchend", "ontouchend", nexacro._syshandler_ontouchend_forward);
				}

				nexacro._stopSysObserving(win_handle, "dblclick", "ondblclick", nexacro._syshandler_ondblclick_forward);

				nexacro._stopSysObserving(win_handle, "keydown", "onkeydown", nexacro._syshandler_onkeydown_forward);
				nexacro._stopSysObserving(win_handle, "keypress", "onkeypress", nexacro._syshandler_onkeypress_forward);
				nexacro._stopSysObserving(win_handle, "keyup", "onkeyup", nexacro._syshandler_onkeyup_forward);

				nexacro._stopSysObserving(win_handle, "contextmenu", "oncontextmenu", nexacro._syshandler_oncontextmenu_forward);
				nexacro._stopSysObserving(win_handle, "resize", "onresize", nexacro._syshandler_onresize_forward);
				nexacro._stopSysObserving(win_handle, "move", "onmove", nexacro._syshandler_onmove_forward);
				nexacro._stopSysObserving(win_handle, "getminmaxinfo", "ongetminmaxinfo", nexacro._syshandler_ongetminmaxinfo_forward);

				nexacro._stopSysObserving(win_handle, "activate", "onactivate", nexacro._syshandler_onactivate_forward);
				nexacro._stopSysObserving(win_handle, "deactivate", "ondeactivate", nexacro._syshandler_ondeactivate_forward);
				nexacro._stopSysObserving(win_handle, "close", "onclose", nexacro._syshandler_onclose_forward);
				nexacro._stopSysObserving(win_handle, "beforeclose", "onbeforeclose", nexacro._syshandler_onbeforeclose_forward);

				nexacro._stopSysObserving(win_handle, "tray", "ontray", nexacro._syshandler_ontray_forward);

				nexacro._stopSysObserving(win_handle, "reload", "onreload", nexacro._syshandler_onreload_forward);
				nexacro._stopSysObserving(win_handle, "viewsource", "onviewsource", nexacro._syshandler_onviewsource_forward);

				nexacro._stopSysObserving(win_handle, "syscommand", "onsyscommand", nexacro._syshandler_onsyscommand_forward);

				nexacro._stopSysObserving(win_handle, "ncmousedown", "onncmousedown", nexacro._syshandler_onncmousedown_forward);

				nexacro._stopSysObserving(win_handle, "duplicateexcution", "onduplicateexcution", nexacro._syshandler_onduplicateexcution_forward);

				nexacro._stopSysObserving(win_handle, "orientationchange", "onorientationchange", nexacro._syshandler_onorientationchange_forward);

				nexacro._stopSysObserving(win_handle, "accessibilitygesture", "onaccessibilitygesture", nexacro._syshandler_onaccessibilitygesture_forward);
				nexacro._stopSysObserving(win_handle, "accessibilityhover", "onaccessibilityhover", nexacro._syshandler_onaccessibilityhover_forward);
			}
		};


		nexacro.__bindEventWindowLoadHandler = function (_window) {
			return function (v1, v2) {
				if (_window == null) {
					_window = v1;
				}
				if (_window) {
					if (!_window._handle) {
						var _handle = v2;
						_window.attachHandle(_handle);
					}
					nexacro._initWindowEventHandler(_window);
					if (nexacro.__mainwindow_handle) {
						nexacro._syshandler_onload_forward(_window);
					}

					var width = nexacro._getWindowHandleOuterWidth(_window._handle);
					var height = nexacro._getWindowHandleOuterHeight(_window._handle);
					if (width != undefined && height != undefined) {
						if (nexacro.OS == "Android" || _window.width != width || _window.height != height) {
							_window._on_default_sys_resize(width, height);
						}
					}
				}
			};
		};
		nexacro.__bindEventPopupWindowLoadHandler = function (_window) {
			return function (v1, v2) {
				if (_window == null) {
					_window = v1;
				}
				if (_window) {
					if (!_window._handle) {
						var _handle = v2;
						_window.attachHandle(_handle);
					}
					nexacro._initWindowEventHandler(_window);

					var childframe = new nexacro.ChildFrame(_window.id);
					childframe._showModeless(_window.id, _window);
				}
			};
		};
		nexacro.__bindEventModalWindowLoadHandler = function (_window, _handle) {
			return function (v1, v2) {
				if (_window == null) {
					_window = v1;
				}
				if (_handle == null) {
					_handle = v2;
				}
				if (_window) {
					_window.attachHandle(_handle);
					nexacro._initWindowEventHandler(_window);
					nexacro._syshandler_onload_forward(_window);
				}
			};
		};
		nexacro.__bindEventModalAsyncWindowLoadHandler = function (_window) {
			return function () {
				if (_window) {
					nexacro._initWindowEventHandler(_window);
					nexacro._syshandler_onload_forward(_window);
				}
			};
		};
		nexacro.__mainwindow_handle = null;
		nexacro._createWindowHandle = function (parent_win, _window, name, left, top, width, height, resizable, layered, taskbar, is_main) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win._handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var callback = nexacro.__bindEventWindowLoadHandler(_window);
			var _handle;
			if (!nexacro.isDesignMode) {
				_handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);
			}
			else {
				_handle = nexacro.__createDesignWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, is_main, callback);
			}

			_window.attachHandle(_handle);
			callback = null;

			nexacro._setViewportScale(_window);

			if (is_main && _handle) {
				nexacro.__mainwindow_handle = _handle;
			}
		};

		nexacro._createModalWindowHandle = function (parent_win, _window, name, left, top, width, height, resizable, layered, lockmode, delayedCreate) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win._handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var window_list = [application.mainframe._getWindow()];
			for (var i = 0; i < application.popupframes.length; i++) {
				var popup_frame = application.popupframes[i];
				var popup_win = popup_frame._window;
				if (popup_win == this || popup_win == null) {
					continue;
				}

				window_list.push(popup_win);
			}

			var frame = _window.frame;
			for (var i = 0; i < window_list.length; i++) {
				nexacro._setWindowModalLock(window_list[i], true, null, frame);
			}

			var callback = nexacro.__bindEventModalWindowLoadHandler(_window, null);

			var _handle = nexacro.__createModalWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback, delayedCreate);
			callback = null;

			for (var i = 0; i < window_list.length; i++) {
				nexacro._setWindowModalLock(window_list[i], false, _handle, frame);
			}
			nexacro.__setModalParentWindowFocusHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback);
			delete window_list;
			return _window.returnValue;
		};

		nexacro._setWindowModalLock = function (_window, is_lock, _except_handle, modal_frame) {
			var _handle = _window._handle;
			if (_handle != _except_handle) {
				if (is_lock) {
					if (_window._disable_ref == 0) {
						var overlaycolor = modal_frame.on_find_CurrentStyle_overlaycolor(modal_frame._pseudo);
						_window._setModalLock(modal_frame, overlaycolor);
					}
					_window._disable_ref++;
				}
				else {
					_window._disable_ref--;
					if (_window._disable_ref == 0) {
						_window._setModalUnlock();
					}
				}
			}

			nexacro.__setWindowHandleLock(_handle, is_lock, _except_handle, false);
		};

		nexacro._createModalAsyncWindowHandle = function (parent_win, _window, name, left, top, width, height, resizable, layered, lockmode) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win._handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var callback = nexacro.__bindEventModalAsyncWindowLoadHandler(_window);
			var _handle = nexacro.__createModalAsyncWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, lockmode, callback);
			_window.attachHandle(_handle);
			callback = null;

			return _handle;
		};

		nexacro._createModalAsyncCallbackHandler = function (_win_handle, frame) {
			if (frame._window_type != 3) {
				return;
			}

			var main_handle = nexacro._getMainWindowHandle();

			var timer_handle = nexacro._setSystemTimer(main_handle, function () {
				var is_prepared = nexacro.__isWindowHandlePrepared(_win_handle);
				if (_win_handle && is_prepared == false) {
					nexacro._removeModalAsyncCallbackHandler(frame);

					frame._runCallback();
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
					nexacro._clearSystemTimer(main_handle, list_item[1]);

					for (var j = i; j < list_length - 1; j++) {
						list[j] = list[j + 1];
					}
					list.pop();
					break;
				}
			}
		};

		nexacro._createOpenWindowHandle = function (parent_win, name, formurl, left, top, width, height, resizable, layered, taskbar, is_main) {
			var parent_handle = null;
			if (parent_win) {
				parent_handle = parent_win._handle;
			}

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var _window = new nexacro.Window(name, parent_win, false);
			if (parent_win) {
				parent_win.addChild(_window);
			}

			var callback = nexacro.__bindEventPopupWindowLoadHandler(_window);
			var _handle = nexacro.__createWindowHandle(parent_handle, _window, name, left, top, width, height, resizable, layered, taskbar, false, callback);
			_window.attachHandle(_handle);
			callback = null;

			return _handle;
		};

		nexacro._refreshWindow = function (_handle) {
			nexacro.__refreshDirtyWindow(_handle);
		};

		nexacro._isWindowHandlePrepared = function (_handle) {
			return nexacro.__isWindowHandlePrepared(_handle);
		};
		nexacro._closeWindowHandle = function (_handle) {
			if (nexacro.__mainwindow_handle == _handle) {
				nexacro.__mainwindow_handle = null;
			}
			nexacro.__closeWindowHandle(_handle);
		};

		nexacro._setLinkedWindow = function (_handle, target_win) {
		};
		nexacro._getMainWindowHandle = function () {
			return nexacro.__mainwindow_handle;
		};

		nexacro._getWindowHandle = function (_handle) {
			return _handle;
		};

		nexacro._getWindowDocumentHandle = function (_handle) {
			return _handle;
		};
		nexacro._getWindowDestinationHandle = function (_handle) {
			return _handle;
		};

		nexacro._getWindowHandlePosX = function (_handle) {
			return nexacro.__getWindowHandlePosX(_handle);
		};
		nexacro._getWindowHandlePosY = function (_handle) {
			return nexacro.__getWindowHandlePosY(_handle);
		};

		nexacro._getWindowHandleOuterWidth = function (_handle) {
			return nexacro.__getWindowHandleOuterWidth(_handle);
		};
		nexacro._getWindowHandleOuterHeight = function (_handle) {
			return nexacro.__getWindowHandleOuterHeight(_handle);
		};

		nexacro._getWindowHandleClientWidth = function (_handle) {
			return nexacro.__getWindowHandleClientWidth(_handle);
		};
		nexacro._getWindowHandleClientHeight = function (_handle) {
			return nexacro.__getWindowHandleClientHeight(_handle);
		};

		nexacro._setWindowHandleArea = function (_handle, x, y, w, h) {
			nexacro.__setWindowHandleArea(_handle, x, y, w, h);
		};
		nexacro._setWindowHandlePos = function (_handle, x, y) {
			nexacro.__setWindowHandlePos(_handle, x, y);
		};
		nexacro._setWindowHandleSize = function (_handle, w, h) {
			nexacro.__setWindowHandleSize(_handle, w, h);
		};
		nexacro._setWindowHandleZIndex = function (_win_handle, zindex) {
		};
		nexacro._findWindow = function (_win_handle) {
			return nexacro.__getWindowFromWindowHandle(_win_handle);
		};

		nexacro._flashWindow = function (hWnd, strType, nCount, nInterval) {
			return nexacro.__flashWindow(hWnd, strType, nCount, nInterval);
		};

		nexacro._setWindowHandleText = function (_win_handle, titletext) {
			return nexacro.__setWindowHandleText(_win_handle, titletext);
		};

		nexacro._setWindowHandleStatusText = nexacro._emptyFn;

		nexacro._setWindowHandleIcon = function (_win_handle, icon_url) {
			return nexacro.__setWindowHandleIcon(_win_handle, icon_url);
		};

		nexacro._setWindowHandleTopmost = function (_win_handle, btopmst) {
			return nexacro.__setWindowHandleTopmost(_win_handle, btopmst);
		};

		nexacro._getMainWindowWidth = function (_win) {
			var win_width = _win.clientWidth;
			if (_win._zoom_factor) {
				win_width = win_width * _win._zoom_factor / 100.0;
			}
			return win_width;
		};

		nexacro._getMainWindowHeight = function (_win) {
			var win_height = _win.clientHeight;
			if (_win._zoom_factor) {
				win_height = win_height * _win._zoom_factor / 100.0;
			}
			return win_height;
		};
		nexacro._createPopupWindowHandle = function (parent_win, target_win, name, left, top, width, height) {
			var parent_handle = parent_win._handle;

			if (left == null) {
				left = Math.floor((nexacro.System.availWidth - width) / 2);
			}
			if (top == null) {
				top = Math.floor((nexacro.System.availHeight - height) / 2);
			}

			var callback = nexacro.__bindEventWindowLoadHandler(target_win);
			var _handle = nexacro.__createPopupWindowHandle(parent_handle, target_win, name, left, top, width, height, callback);
			target_win.attachHandle(_handle);
			callback = null;
		};
		nexacro._closePopupWindowHandle = function (_handle) {
			nexacro.__closeWindowHandle(_handle);
		};

		nexacro._getPopupWindowDocumentHandle = function (_handle) {
			return _handle;
		};
		nexacro._getPopupWindowDestinationHandle = function (_handle) {
			return _handle;
		};

		nexacro._getPopupWindowHandlePosX = function (_handle) {
			return nexacro._getWindowHandlePosX(_handle);
		};
		nexacro._getPopupWindowHandlePosY = function (_handle) {
			return nexacro._getWindowHandlePosY(_handle);
		};

		nexacro._getPopupWindowHandleOuterWidth = function (_handle) {
			return nexacro._getWindowHandleOuterWidth(_handle);
		};
		nexacro._getPopupWindowHandleOuterHeight = function (_handle) {
			return nexacro._getWindowHandleOuterHeight(_handle);
		};

		nexacro._getPopupWindowHandleClientWidth = function (_handle) {
			return nexacro._getWindowHandleClientWidth(_handle);
		};
		nexacro._getPopupWindowHandleClientHeight = function (_handle) {
			return nexacro._getWindowHandleClientHeight(_handle);
		};

		nexacro._setPopupWindowHandleArea = function (_handle, x, y, w, h) {
			nexacro._setWindowHandleArea(_handle, x, y, w, h);
		};
		nexacro._setPopupWindowHandlePos = function (_handle, x, y) {
			nexacro._setWindowHandlePos(_handle, x, y);
		};

		nexacro._setPopupWindowHandleSize = function (_handle, w, h) {
			nexacro._setWindowHandleSize(_handle, w, h);
		};

		nexacro._setPopupWindowHandleVisible = function (_handle, visible_flag) {
			nexacro.__setWindowHandleVisible(_handle, visible_flag);
			nexacro.__refreshDirtyWindow(_handle);
		};

		nexacro._blockScript = function (_handle) {
			nexacro.__blockScript(_handle);
		};

		nexacro._unblockScript = function (_handle) {
			nexacro.__unblockScript(_handle);
		};


		nexacro._setPrivateProfile = function (key, varValue, global) {
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

			return nexacro.__setPrivateProfile(key, value, global);
		};


		nexacro._getPrivateProfile = function (key, global) {
			var retvalue = nexacro.__getPrivateProfile(key, global);
			if (retvalue) {
				var index = retvalue.indexOf(":");
				var type = retvalue.substring(0, index);
				var value = retvalue.substring(index + 1);

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
		};

		nexacro._getGlobalValueData = function (key, url) {
			return application._globalvalue;
		};

		nexacro._showQuickviewMenu = function (comp, sx, sy) {
			var control_element = comp.getElement();
			if (control_element && control_element._handle) {
				var window = comp._getWindow();
				var _win_handle = (window ? window._handle : nexacro._getMainWindowHandle());
				var elem_handle = control_element._handle;
				return nexacro.__showQuickviewMenu(_win_handle, elem_handle, sx, sy);
			}
		};

		nexacro._setSystemMenuResizable = function (_handle, resizable) {
			nexacro.__setSystemMenuResizable(_handle, resizable);
		};

		nexacro._procSysCommand = function (_handle, command) {
			nexacro.__procSysCommand(_handle, command);
		};

		nexacro._setMouseHovertime = function (mousehovertime) {
			nexacro.__setMouseHovertime(mousehovertime);
		};

		nexacro._setWindowHandleBorder = function (_handle, border, bordertype) {
			var top_width, right_width, bottom_width, left_width, type, radiusx, radiusy;
			var left_top, right_top, right_bottom, left_bottom;

			if (border) {
				if (_handle) {
					if (border._linecnt == 1) {
						top_width = border.top_style ? border._top_width : 0;
						right_width = top_width;
						bottom_width = top_width;
						left_width = top_width;
					}
					else {
						if (border._linecnt == 2) {
							top_width = border.top_style ? border._top_width : 0;
							right_width = border.right_style ? border._right_width : 0;
							left_width = right_width;
							bottom_width = top_width;
						}
						else if (border._linecnt == 3) {
							top_width = border.top_style ? border._top_width : 0;
							bottom_width = border.bottom_style ? border._bottom_width : 0;
							right_width = border.right_style ? border._right_width : 0;
							left_width = right_width;
						}
						else {
							top_width = border.top_style ? border._top_width : 0;
							bottom_width = border.bottom_style ? border._bottom_width : 0;
							left_width = border.left_style ? border._left_width : 0;
							right_width = border.right_style ? border._right_width : 0;
						}
					}
				}

				inner_width = this.width - border._getBorderWidth();
				inner_height = this.height - border._getBorderHeight();
				if (inner_width < 0) {
					inner_width = 0;
				}
				if (inner_height < 0) {
					inner_height = 0;
				}
			}

			if (bordertype) {
				type = bordertype.type;
				radiusx = bordertype._radiusx;
				radiusy = bordertype._radiusy;
				left_top = bordertype._lefttop;
				right_top = bordertype._righttop;
				right_bottom = bordertype._rightbottom;
				left_bottom = bordertype._leftbottom;
			}

			if (_handle) {
				nexacro.__setWindowHandleBorder(_handle, top_width, right_width, bottom_width, left_width, type, radiusx, radiusy, left_top, right_top, left_bottom, right_bottom);
			}
		};
		nexacro._deleteTraceLogFile = function () {
			nexacro.__deleteTraceLogFile();
		};

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
			var cnt = 16 - data.length;
			for (var i = 0; i < cnt; i++) {
				data += " ";
			}

			data += message;

			var traceduration = application.traceduration || -1;
			var tracemode = application.tracemode || "none";

			nexacro.__writeTraceLog(data, loglevel, tracemode, traceduration, msglevel);
		};

		nexacro._loadImageBase64 = function (source, target, handler) {
			return nexacro.__loadImageBase64(source, target, handler);
		};

		nexacro._setUseHttpKeepAlive = function (v) {
			var usehttpkeepalive = nexacro._toBoolean(v);
			application.usehttpkeepalive = (usehttpkeepalive == false) ? false : true;
			nexacro.__setUseHttpKeepAlive(application.usehttpkeepalive);
		};

		nexacro._setHttpTimeout = function (v) {
			var timeout = nexacro._parseInt(v);
			application.httptimeout = (timeout > 0) ? timeout : 0;
			nexacro.__setHttpTimeout(application.httptimeout);
		};

		nexacro._setHttpRetry = function (v) {
			var httpretry = nexacro._parseInt(v);
			application.httpretry = (httpretry > 0) ? httpretry : 0;
			nexacro.__setHttpRetry(application.httpretry);
		};

		nexacro._applicationExit = nexacro._emptyFn;

		nexacro._checkWindowActive = function (_window) {
			var is_active;
			var win_handle = _window._handle;
			if (win_handle) {
				is_active = nexacro.__checkWindowHandleActive(win_handle);
				_window._is_active_window = is_active;
			}

			return is_active;
		};

		nexacro._setWindowHandleFocus = function (win_handle) {
			nexacro.__setWindowHandleFocus(win_handle);
		};

		nexacro._getHoverElement = function (_win, clientX, clientY) {
			if (!_win) {
				return null;
			}

			var pointX = _win._cur_client_pos.x;
			var pointY = _win._cur_client_pos.y;

			var frame = _win.frame;
			if (!frame) {
				return null;
			}
			var frame_elem = frame._control_element;
			if (!frame_elem) {
				return null;
			}
			var _handle = frame_elem._handle;
			if (!_handle) {
				return null;
			}

			return nexacro.__HitTestByPoint(_handle, pointX, pointY);
		};

		nexacro._addExtensionModule = function (object, modulepath) {
			return nexacro.__addExtensionModule(object, modulepath);
		};

		nexacro._clearExtensionModule = function (modulepath) {
			nexacro.__clearExtensionModule(modulepath);
		};

		nexacro._deleteCacheDB = function () {
			nexacro.__deleteCacheDB();
		};

		nexacro._searchDeviceExceptionValue = function (exception_type) {
			if (exception_type == "swap_screen") {
				return true;
			}
			return undefined;
		};

		nexacro._setViewportScale = function (_window) {
			if (!_window) {
				return;
			}

			var _handle = _window._handle;

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

			nexacro.__setWindowHandleViewportScale(_handle, is_scalable, ratio, (minimum_scale !== undefined) ? (ratio * minimum_scale) : ratio, (maximum_scale !== undefined) ? (ratio * maximum_scale) : ratio, null);

			_window._zoom_factor = nexacro._zoom_factor;

			if (nexacro._zoom_factor != 0) {
				_window._zoom_factor = nexacro._zoom_factor;
				nexacro.__setWindowHandleZoom(_handle, nexacro._zoom_factor);
			}
		};

		nexacro._createTrayHandle = function (icon, tooltip) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__createTrayHandle(main_handle, icon, tooltip);
		};

		nexacro._removeTrayHandle = function (tray_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__removeTrayHandle(main_handle, tray_handle);
		};

		nexacro._setTrayIconHandle = function (tray_handle, icon) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__setTrayIconHandle(main_handle, tray_handle, icon);
		};

		nexacro._setTrayTooltipHandle = function (tray_handle, tooltip) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__setTrayTooltipHandle(main_handle, tray_handle, tooltip);
		};

		nexacro._showTrayBalloonTipHandle = function (tray_handle, titleicon, title, text, timeout, nosound) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__showTrayBalloonTipHandle(main_handle, tray_handle, titleicon, title, text, timeout, nosound);
		};

		nexacro._createTrayPopupMenuHandle = function (tray_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__createTrayPopupMenuHandle(main_handle, tray_handle);
		};

		nexacro._destroyTrayPopupMenuHandle = function (tray_handle, menu_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__destroyTrayPopupMenuHandle(main_handle, tray_handle, menu_handle);
		};

		nexacro._setTrayPopupMenuItemHandle = function (tray_handle, menu_handle, flags, id, caption, icon) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__setTrayPopupMenuItemHandle(main_handle, tray_handle, menu_handle, flags, id, caption, icon);
		};

		nexacro._displayTrayPopupMenuHandle = function (tray_handle, menu_handle) {
			var main_handle = nexacro._getMainWindowHandle();
			return nexacro.__displayTrayPopupMenuHandle(main_handle, tray_handle, menu_handle);
		};


		nexacro._syshandler_ontray_forward = function (_window, type, id, button, alt_key, ctrl_key, shift_key, screenX, screenY) {
			if (type == "lbuttonup") {
				var tray = application.trays[id];
				return tray.on_fire_onlbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY);
			}
			else if (type == "rbuttonup") {
				var tray = application.trays[id];
				return tray.on_fire_onrbuttonup(button, alt_key, ctrl_key, shift_key, screenX, screenY);
			}
			else if (type == "dblclick") {
				var tray = application.trays[id];
				return tray.on_fire_ondblclick(button, alt_key, ctrl_key, shift_key, screenX, screenY);
			}
			else if (type == "menuclick") {
				var traypopup = application._current_tray_popup;
				return traypopup.on_fire_onmenuclick(id);
			}
			else {
				return;
			}
		};
	}
}
