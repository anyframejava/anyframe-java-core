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
	if (window._popup && window.opener && window.opener != window) {
		window.application = window.opener.application;
		window.system = window.opener.system;


		window.nexacro._typedefinition_url = window.opener.nexacro._typedefinition_url;
		window.nexacro._project_url = window.opener.nexacro._project_url;
		window.nexacro._addlocalthemecacheurl = window.opener.nexacro._addlocalthemecacheurl;

		if (window.opener.nexacro.Application) {
			window._pApplication = window.opener.nexacro.Application;
		}
		else {
			var _parent = window.opener;
			while (!_parent.nexacro.Application) {
				_parent = _parent.opener;
			}

			if (_parent) {
				window._pApplication = _parent.nexacro.Application;
			}
		}
	}


	if (!nexacro.Init_systembase_html) {
		nexacro.Init_systembase_html = true;

		if (window.console) {
			trace = function () {
				var a = arguments;
				var n = arguments.length;
				switch (n) {
					case 1:
						window.console.log(a[0] + '');
						break;
					case 2:
						window.console.log(a[0], ' ', a[1]);
						break;
					case 3:
						window.console.log(a[0], ' ', a[1], ' ', a[2]);
						break;
					case 4:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3]);
						break;
					case 5:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4]);
						break;
					case 6:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5]);
						break;
					case 7:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6]);
						break;
					case 8:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6], ' ', a[7]);
						break;
					case 9:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6], ' ', a[7], ' ', a[8]);
						break;
					case 10:
						window.console.log(a[0], ' ', a[1], ' ', a[2], ' ', a[3], ' ', a[4], ' ', a[5], ' ', a[6], ' ', a[7], ' ', a[8], ' ', a[9]);
						break;
				}
			};
		}
		else {
			trace = function () {
				if (nexacro.OS == "Windows Phone") {
					var str = arguments[0];
					var params = '{"message":"' + str + '"}';
					var jsonstr = 'DebugConsole,Debug,' + this._id + ',' + params;
					window.external.Notify(jsonstr);
				}
				else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
					var str = "";
					var a = arguments;
					for (var i = 0; i < a.length; i++) {
						str += a[i];
						str += ' ';
					}

					var aa = 0;
				}
			};
		}

		nexacro._updateWindow = nexacro._emptyFn;

		nexacro._nexacroconsole = function (str, w, h) {
			var target = document.getElementById("mainframe_childframe_form");
			var console = document.getElementById("nexacroconsole");
			if (!console) {
				console = document.createElement("div");
				console.id = "nexacroconsole";
				console.className = "nexacroconsole";

				if (w) {
					console.style.width = (parseInt(w) | 0) + "%";
				}
				if (h) {
					console.style.height = (parseInt(h) | 0) + "%";
				}

				target && target.appendChild(console);
			}
			console.innerHTML += str + "<br>";
		};

		nexacro.Browser_RoundBorder = 0;
		nexacro.Browser_BorderImage = 0;
		nexacro.Browser_Gradation = 0;
		nexacro.Browser_RoundShadow = false;
		nexacro.Browser_ColorAlpha = false;

		nexacro.OS = "";
		nexacro.OSVersion = "";
		nexacro.DEVICE = "";
		nexacro.SystemType = "";
		nexacro.BrowserLang = "";

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion >= 9) {
				nexacro.Browser_RoundBorder = 1;
				nexacro.Browser_BorderImage = 1;
				nexacro.Browser_RoundShadow = true;
				nexacro.Browser_ColorAlpha = true;
			}
			else {
				nexacro.Browser_RoundBorder = 0;
				nexacro.Browser_BorderImage = 0;
				nexacro.Browser_RoundShadow = false;
				nexacro.Browser_ColorAlpha = false;
			}
			nexacro.Browser_Gradation = 2;
		}
		else if (nexacro.Browser == "Opera") {
			nexacro.Browser_RoundBorder = 1;
			nexacro.Browser_BorderImage = 1;
			nexacro.Browser_RoundShadow = true;
			nexacro.Browser_ColorAlpha = true;
			nexacro.Browser_Gradation = 1;
		}
		else if (nexacro.Browser == "Chrome") {
			nexacro.Browser_RoundBorder = 1;
			nexacro.Browser_BorderImage = 2;
			nexacro.Browser_Gradation = 2;
			nexacro.Browser_RoundShadow = true;
			nexacro.Browser_ColorAlpha = true;
		}
		else if (nexacro.Browser == "MobileSafari") {
			nexacro.Browser_RoundBorder = 1;
			nexacro.Browser_BorderImage = 2;
			nexacro.Browser_Gradation = 2;
			nexacro.Browser_RoundShadow = true;
			nexacro.Browser_ColorAlpha = true;
		}
		else if (nexacro.Browser == "Safari") {
			nexacro.Browser_RoundBorder = 4;
			nexacro.Browser_BorderImage = 2;
			nexacro.Browser_Gradation = 1;
			nexacro.Browser_RoundShadow = true;
			nexacro.Browser_ColorAlpha = true;
		}
		else if (nexacro.Browser == "WebKit") {
			nexacro.Browser_RoundBorder = 1;
			nexacro.Browser_BorderImage = 2;
			nexacro.Browser_Gradation = 2;
			nexacro.Browser_RoundShadow = true;
			nexacro.Browser_ColorAlpha = true;
		}
		else if (nexacro.Browser == "Gecko") {
			if (nexacro.BrowserVersion < 2) {
				nexacro.Browser_RoundBorder = 4;
			}
			else if (nexacro.BrowserVersion >= 10) {
				nexacro.Browser_RoundBorder = 1;
			}
			else {
				nexacro.Browser_RoundBorder = 1;
			}
			nexacro.Browser_BorderImage = 3;
			nexacro.Browser_Gradation = 3;
			nexacro.Browser_RoundShadow = true;
			nexacro.Browser_ColorAlpha = true;
		}
		(function () {
			var _regexp_detectos = [{
				OS : "Windows", 
				systype : "win32", 
				expr : "Windows\\sNT\\s([0-9\\.]*)"
			}, {
				OS : "Windows Phone", 
				systype : "win32", 
				expr : "Windows Phone.*OS\\s([\\d_]+)"
			}, {
				OS : "Mac OS", 
				systype : "mac", 
				expr : "Mac\\sOS[\\s|a-z|A-Z]+\\s([\\d_]+)"
			}, {
				OS : "iOS", 
				systype : "ipad", 
				expr : "iPad[\\s|a-z|A-Z|;]+OS\\s([\\d_]+)"
			}, {
				OS : "iOS", 
				systype : "iphone", 
				expr : "iPhone\\sOS\\s([\\d_]+)"
			}, {
				OS : "Android", 
				systype : "android", 
				expr : "Android\\s+([\\d.]+)"
			}, {
				OS : "Linux", 
				systype : "linux", 
				expr : "Linux\\s+([\\w]+)"
			}
			];

			var cnt = _regexp_detectos.length;
			for (var i = 0; i < cnt; i++) {
				var info = _regexp_detectos[i];
				var version = navigator.userAgent.match(new RegExp(info.expr, 'i'));
				if (version) {
					nexacro.OS = info.OS;
					nexacro.SystemType = info.systype;
					nexacro.OSVersion = version[1].replace(/_/g, '.');
					break;
				}
			}

			if (nexacro.OS == "") {
				var version = navigator.userAgent.match("Android");

				if (version) {
					nexacro.OS = version[0];
				}
			}
		})();


		if (navigator) {
			nexacro.BrowserLang = (navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage);
			nexacro.SystemLang = (navigator.systemLanguage || navigator.BrowserLang);
		}

		nexacro.checkDocument = 
			{
			hasInnerText : document.documentElement.innerText !== undefined, 
			hasTextContent : document.documentElement.textContent !== undefined, 
			hasElementFromPoint : document.documentElement.elementFromPoint !== undefined, 
			hasScreenLeftTop : (document.defaultView || document.parentWindow).screenLeft !== undefined, 
			hasGetBoxObjectFor : document.getBoxObjectFor !== undefined, 
			hasGetBoundingClientRect : document.documentElement.getBoundingClientRect !== undefined, 
			hasOnInput : document.documentElement.oninput !== undefined, 
			quirksMode : document.compatMode === "BackCompat", 
			strictMode : document.compatMode === "CSS1Compat"
		};

		if (nexacro.Browser == "MobileSafari") {
			nexacro.KeyCode_ImeInput = 0;
		}
		else {
			nexacro.KeyCode_ImeInput = 229;
		}

		nexacro._error = function (e, at) {
			var msg = [];
			msg.push(e.toString());
			if (at && at.length) {
				msg.push("at : " + at);
			}
			if (e.fileName) {
				msg.push("at : " + e.fileName + ": " + e.lineNumber);
			}
			if (self.__debuginfo) {
				msg.push("at : " + self.__debuginfo);
			}
			alert(msg.join('\n'));
		};


		nexacro._alert = function (cur_frame, str, caption, type) {
			var _handle, _window;
			if (cur_frame instanceof nexacro.Frame) {
				_window = cur_frame._getWindow();
				if (_window) {
					_window._cancelEvent();
					_handle = _window._handle;
				}
				else {
					_handle = nexacro._getMainWindowHandle();
				}
			}
			else {
				_handle = nexacro._getMainWindowHandle();
			}

			str = nexacro._toString(str);
			_handle.alert(str);
		};

		nexacro._confirm = function (cur_frame, str, caption, type) {
			var _handle, _window;
			if (cur_frame instanceof nexacro.Frame) {
				_window = cur_frame._getWindow();
				if (_window) {
					_window._cancelEvent();
					_handle = _window._handle;
				}
				else {
					_handle = nexacro._getMainWindowHandle();
				}
			}
			else {
				_handle = nexacro._getMainWindowHandle();
			}

			return _handle.confirm(str);
		};

		nexacro._setCookie = function (name, value, days) {
			var expires = "";
			if (days) {
				if (typeof (days) == "string") {
					expires = "; expires=" + days;
				}
				else if ((typeof days) == "object" && (days instanceof Date)) {
					expires = "; expires=" + days.toGMTString();
				}
			}
			else {
				expires = "";
			}

			document.cookie = name + "=" + value + expires + "; path=/";
		};

		nexacro._getCookie = function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');

			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length);
				}
			}
			return null;
		};

		nexacro._removeCookie = function (name) {
			this.setCookie(name, "", -1);
		};

		nexacro._setFileSecureLevel = function (lvl) {
			application.filesecurelevel = nexacro._parseInt(lvl);
		};
		nexacro._setNetworkSecureLevel = function (lvl) {
			application.networksecurelevel = nexacro._parseInt(lvl);
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._getExceptionMessage = function (e) {
				var msg = e.message;
				if (e.stack) {
					msg += "\r\n" + e.stack;
				}

				return msg;
			};
			nexacro._getEvalExceptionMessage = function (e, src_url, base_line) {
				var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
				return msg;
			};
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro._getExceptionMessage = function (e) {
				var msg = e.toString() + "\r\n";
				msg += "\r\n" + e.stack;

				return msg;
			};
			nexacro._getEvalExceptionMessage = function (e, src_url, base_line) {
				var msg = e.toString() + '\r\nat line ' + (e.lineNumber - base_line);
				msg += ', in eval script(' + decodeURI(src_url) + ')';
				return msg;
			};
		}
		else if (nexacro.Browser == "Chrome") {
			Error.prepareStackTrace = function (error, stack) {
				return stack;
			};

			nexacro._getExceptionMessage = function (e) {
				var msg = e.toString();
				if (e.stack && e.stack.length > 0) {
					var frame = e.stack[0];
					var url = frame.getEvalOrigin();
					msg += "\r\nat line " + frame.getLineNumber() + ", in function: " + frame.getMethodName() + " in " + decodeURI(url);
				}
				return msg;
			};
			nexacro._getEvalExceptionMessage = function (e, src_url, base_line) {
				var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
				return msg;
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro._getExceptionMessage = function (e) {
				var sourceName = e.sourceURL ? decodeURI(e.sourceURL) : "(anonymous)";
				var lineNumber = e.line;

				var msg = e.toString() + "\r\n" + sourceName + ' (at line ' + lineNumber + ')';
				if (e.stack) {
					msg += "\r\n" + e.stack;
				}
				return msg;
			};
			nexacro._getEvalExceptionMessage = function (e, src_url, base_line) {
				var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
				return msg;
			};
		}
		else {
			nexacro._getExceptionMessage = function (e) {
				var msg = e.toString();
				if (e.stack) {
					msg += "\r\n" + e.stack;
				}
				return msg;
			};
			nexacro._getEvalExceptionMessage = function (e, src_url, base_line) {
				var msg = e.toString() + '\r\nin eval script(' + decodeURI(src_url) + ')';
				return msg;
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__pseudoGarbageCollector = function () {
				this._handle = null;
				this._hasGargageNode = false;
			};
			var _pGarbageCollector = nexacro.__pseudoGarbageCollector.prototype;
			_pGarbageCollector.init = function (_cur_doc, id) {
				if (_cur_doc) {
					var gc = _cur_doc.getElementById(id);
					if (!gc) {
						gc = _cur_doc.createElement('div');
						gc.id = id;
						gc.style.display = 'none';
						_cur_doc.body.appendChild(gc);
						this._hasGargageNode = false;
					}
					this._handle = gc;
				}
			};
			_pGarbageCollector.append = function (node) {
				if (this._handle && node) {
					this._handle.appendChild(node);
					this._hasGargageNode = true;
				}
			};
			_pGarbageCollector.clear = function () {
				if (this._handle && this._hasGargageNode) {
					this._handle.innerText = "";
					this._hasGargageNode = false;
				}
			};
			_pGarbageCollector.destroy = function () {
				if (this._handle) {
					this.clear();
					this._handle = null;
				}
			};

			delete _pGarbageCollector;

			nexacro._createWindowGC_Funcs = function (_cur_win) {
				_cur_win.__createGC = function () {
					var _doc = _cur_win.document;
					var gc = new nexacro.__pseudoGarbageCollector();
					gc.init(_doc, 'nexacro__pseudoGarbageCollector');
					_doc.__nexacro_gc = gc;

					var unlinkgc = new nexacro.__pseudoGarbageCollector();
					unlinkgc.init(_doc, 'nexacro__unlinkGarbageCollector');
					_doc.__nexacro_unlinkgc = unlinkgc;
				};
				_cur_win.__clearGC = function () {
					var _doc = _cur_win.document;
					var gc = _doc.__nexacro_gc;
					if (gc) {
						gc.clear();
					}
				};
				_cur_win.__destroyGC = function () {
					var _doc = _cur_win.document;

					var unlinkgc = _doc.__nexacro_unlinkgc;
					if (unlinkgc && unlinkgc._handle) {
						var node = unlinkgc._handle.firstChild;
						while (node) {
							var next = node.nextSibling;
							var elem = node._linked_element;
							if (elem) {
								if (elem.linkedcontrol) {
									elem.linkedcontrol.destroy();
								}
								else {
									elem.destroy();
								}
							}
							node = next;
						}
						unlinkgc.destroy();
					}
					_doc.__nexacro_unlinkgc = null;

					var gc = _doc.__nexacro_gc;
					if (gc) {
						gc.destroy();
					}
					_doc.__nexacro_gc = null;
				};
			};

			nexacro.__appendDOMNode = function (parent_node, node) {
				parent_node.appendChild(node);
			};
			nexacro.__insertDOMNode = function (parent_node, node, before_node) {
				if (before_node) {
					parent_node.insertBefore(node, before_node);
				}
				else {
					parent_node.appendChild(node);
				}
			};

			nexacro.__removeDOMNode = function (parent_node, node) {
				if (node) {
					if (!parent_node) {
						parent_node = node.parentNode;
					}

					try {
						parent_node.removeChild(node);
						var gc = node.ownerDocument.__nexacro_gc;
						if (gc) {
							gc.append(node);
						}
						else {
							gc = document.__nexacro_gc;
							if (gc) {
								gc.append(node);
							}
						}
					}
					catch (e) {
					}
				}
			};
			nexacro.__unlinkDOMNode = function (parent_node, node) {
				if (node) {
					if (!parent_node) {
						parent_node = node.parentNode;
					}
					parent_node.removeChild(node);
					var gc = node.ownerDocument.__nexacro_unlinkgc;
					if (gc) {
						gc.append(node);
					}
				}
			};
		}
		else {
			nexacro._createWindowGC_Funcs = function (_cur_win) {
				_cur_win.__createGC = nexacro._emptyFn;
				_cur_win.__clearGC = nexacro._emptyFn;
				_cur_win.__destroyGC = nexacro._emptyFn;
			};

			nexacro.__appendDOMNode = function (parent_node, node) {
				parent_node.appendChild(node);
			};
			nexacro.__insertDOMNode = function (parent_node, node, before_node) {
				if (before_node) {
					parent_node.insertBefore(node, before_node);
				}
				else {
					parent_node.appendChild(node);
				}
			};

			nexacro.__removeDOMNode = function (parent_node, node) {
				if (node && parent_node) {
					try {
						parent_node.removeChild(node);
					}
					catch (e) {
					}
				}
			};
			nexacro.__unlinkDOMNode = function (parent_node, node) {
				if (node && parent_node) {
					parent_node.removeChild(node);
				}
			};
		}

		nexacro.__getPrevDOMNode = function (node) {
			do {
				node = node.prevSibling;
			} while (node && node.nodeType != 1);
			return node;
		};
		nexacro.__getNextDOMNode = function (node) {
			do {
				node = node.nextSibling;
			} while (node && node.nodeType != 1);
			return node;
		};

		nexacro.__getFirstChildDOMNode = function (node) {
			var child_node = node.firstChild;
			while (child_node && child_node.nodeType != 1) {
				child_node = child_node.nextSibling;
			}
			return child_node;
		};
		nexacro.__getLastChildDOMNode = function (node) {
			var child_node = node.lastChild;
			while (child_node && child_node.nodeType != 1) {
				child_node = child_node.prevSibling;
			}
			return child_node;
		};

		nexacro.__bringDOMNodeToFront = function (node) {
			var parent_node = node.parentNode;
			if (parent_node) {
				var last_node = nexacro.__getLastChildDOMNode(parent_node);
				if (node != last_node) {
					parent_node.appendChild(node);
				}
			}
		};
		nexacro.__sendDOMNodeToBack = function (node) {
			var parent_node = node.parentNode;
			if (parent_node) {
				var first_node = parent_node.firstChild;
				if (node != first_node) {
					parent_node.insertBefore(node, first_node);
				}
			}
		};

		nexacro.__moveDOMNodeToPrev = function (node, target_node) {
			if (target_node && target_node != node) {
				var parent_node = node.parentNode;
				if (parent_node && parent_node == target_node.parentNode) {
					var next_node = nexacro.__getNextDOMNode(target_node);
					if (next_node != node) {
						if (next_node) {
							parent_node.insertBefore(node, next_node);
						}
						else {
							parent_node.appendChild(node);
						}
					}
				}
			}
		};
		nexacro.__moveDOMNodeToNext = function (node, target_node) {
			if (target_node && target_node != node) {
				var parent_node = node.parentNode;
				if (parent_node && parent_node == target_node.parentNode) {
					var target_prev_node = nexacro.__getPrevDOMNode(target_node);
					if (target_prev_node != node) {
						parent_node.insertBefore(node, target_node);
					}
				}
			}
		};

		nexacro.__setDOMNodeStyleFilterTransparent = function (node_style) {
			node_style.filter = "alpha(Opacity=0)";
			node_style.backgroundColor = "#FFFFFF";
		};
		nexacro.__setDOMNodeStyleAbsolute = function (node_style) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
		};
		nexacro.__setDOMNodeStyleRelative = function (node_style) {
			node_style.position = "relative";
			node_style.overflow = "hidden";
		};
		nexacro.__setDOMNodeStyleFixed = function (node_style) {
			node_style.position = "fixed";
			node_style.overflow = "hidden";
		};

		nexacro.__setDOMNodeStyleAbsoluteTransparent = function (node_style) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";

			node_style.overflowX = "hidden";
			node_style.overflowY = "hidden";

			node_style.backgroundColor = "transparent";
		};
		nexacro.__setDOMNodeStyleTextOverFlow = function (node_style) {
			node_style.textOverflow = "ellipsis";
			node_style.whiteSpace = "nowrap";
			node_style.overflow = "hidden";
		};

		if (nexacro.OS == "Android" || nexacro.Browser == "Opera") {
			nexacro.__setTextAreaDOMNodeStyleAbsoluteTransparent = function (node_style) {
				node_style.position = "absolute";
				node_style.overflow = "hidden";
				node_style.backgroundColor = "transparent";
			};
		}
		else {
			nexacro.__setTextAreaDOMNodeStyleAbsoluteTransparent = function (node_style) {
				node_style.position = "absolute";
				node_style.overflow = "scroll";
				node_style.backgroundColor = "transparent";
			};
		}

		nexacro.__setMobileIframeDOMNodeStyleScroll = function (node_style) {
			node_style.overflow = "auto";
			node_style.webkitOverflowScrolling = "touch";
		};

		nexacro.__setDOMNodeStylePosLeftTop = function (node_style, left, top) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
			node_style.left = (left | 0) + "px";
			node_style.top = (top | 0) + "px";
		};
		nexacro.__setDOMNodeStylePosRightTop = function (node_style, right, top) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
			node_style.right = (right | 0) + "px";
			node_style.top = (top | 0) + "px";
		};
		nexacro.__setDOMNodeStylePosLeftBottom = function (node_style, left, bottom) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
			node_style.left = (left | 0) + "px";
			node_style.bottom = (bottom | 0) + "px";
		};
		nexacro.__setDOMNodeStylePosRightBottom = function (node_style, right, bottom) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
			node_style.right = (right | 0) + "px";
			node_style.bottom = (bottom | 0) + "px";
		};

		nexacro.__setDOMNodeStylePosSize = function (node_style, left, top, width, height) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
			node_style.left = (left | 0) + "px";
			node_style.top = (top | 0) + "px";
			node_style.width = (width | 0) + "px";
			node_style.height = (height | 0) + "px";
		};
		nexacro.__setDOMNodeStylePosUnitSize = function (node_style, left, top, width, height) {
			node_style.position = "absolute";
			node_style.overflow = "hidden";
			node_style.left = (left | 0) + "px";
			node_style.top = (top | 0) + "px";
			node_style.width = width;
			node_style.height = height;
		};

		nexacro.__setDOMNodeStylePos = function (node_style, left, top) {
			node_style.left = (left | 0) + "px";
			node_style.top = (top | 0) + "px";
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__setCanvasNodeStylePos = function (node_style, left, top) {
				node_style.left = (left | 0) + "px";
				node_style.top = (top | 0) + "px";
			};
		}
		else {
			nexacro.__setCanvasNodeStylePos = function (node_style, left, top) {
				node_style.left = (left | 0);
				node_style.top = (top | 0);
			};
		}
		;
		nexacro.__setDOMNodeStyleSize = function (node_style, width, height) {
			if (width >= 0 && height >= 0) {
				node_style.width = (width | 0) + "px";
				node_style.height = (height | 0) + "px";
			}
		};
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 8) {
			nexacro.__setDOMNodeStyleTextSize = function (node_style, height) {
				node_style.maxHeight = (height | 0) + "px";
				node_style.height = (height | 0) + "px";
			};
		}
		else {
			nexacro.__setDOMNodeStyleTextSize = function (node_style, height) {
				node_style.maxHeight = (height | 0) + "px";
			};
		}
		;
		nexacro.__setDOMNodeStyleUnitSize = function (node_style, width, height) {
			node_style.width = width;
			node_style.height = height;
		};

		nexacro.__setDOMNodeStyleDirection = function (node_style, direction) {
			if (direction) {
				node_style.direction = direction;
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 10) {
			if (nexacro.BrowserVersion == 9) {
				nexacro.__setDOMNodeStyleTransformMirror = function (node_style, bMirror) {
					var value = "";
					if (bMirror) {
						value = "ScaleX(-1)";
					}
					node_style.msTransform = value;
				};
				nexacro.__setDOMNodeStyleTransformScale = function (node_style, scale) {
					node_style.MsTransformOrigin = "0 0";
					node_style.MsTransform = "scale(" + scale + ", " + scale + ")";
				};
			}
			else {
				nexacro.__setDOMNodeStyleTransformMirror = function (node_style, bMirror) {
					var value = "";
					if (bMirror) {
						value = "progid:DXImageTransform.Microsoft.BasicImage(mirror=1)";
					}
					node_style.filter += value;
				};
				nexacro.__setDOMNodeStyleTransformScale = function (node_style, scale) {
					nexacro.__setDOMNodeZoom(node_style, scale * 100);
				};
			}
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__setDOMNodeStyleTransformMirror = function (node_style, bMirror) {
				var value = "";
				if (bMirror) {
					value = "ScaleX(-1)";
				}
				node_style.WebkitTransform = value;
			};
			nexacro.__setDOMNodeStyleTransformScale = function (node_style, scale) {
				node_style.WebkitTransformOriginX = 0;
				node_style.WebkitTransformOriginY = 0;
				node_style.WebkitTransform = "scale(" + scale + ", " + scale + ")";
			};
		}
		else if (nexacro.BrowserType == "Gecko") {
			nexacro.__setDOMNodeStyleTransformMirror = function (node_style, bMirror) {
				var value = "";
				if (bMirror) {
					value = "ScaleX(-1)";
				}
				node_style.MozTransform = value;
			};
			nexacro.__setDOMNodeStyleTransformScale = function (node_style, scale) {
				node_style.MozTransformOrigin = "0px 0px";
				node_style.MozTransform = "scale(" + scale + ", " + scale + ")";
			};
		}
		else if (nexacro.BrowserType == "Opera") {
			nexacro.__setDOMNodeStyleTransformMirror = function (node_style, bMirror) {
				var value = "";
				if (bMirror) {
					value = "ScaleX(-1)";
				}
				node_style.OTransform = value;
			};
			nexacro.__setDOMNodeStyleTransformScale = function (node_style, scale) {
				node_style.OTransformOriginX = 0;
				node_style.OTransformOriginY = 0;
				node_style.OTransform = "scale(" + scale + ", " + scale + ")";
			};
		}
		else {
			nexacro.__setDOMNodeStyleTransformMirror = function (node_style, bMirror) {
				var value = "";
				if (bMirror) {
					value = "ScaleX(-1)";
				}
				node_style.transform = value;
			};
			nexacro.__setDOMNodeStyleTransformScale = function (node_style, scale) {
				node_style.transformOriginX = 0;
				node_style.transformOriginY = 0;
				node_style.transformOrigin = "0 0";
				node_style.transform = "scale(" + scale + ", " + scale + ")";
			};
		}

		nexacro.__setDOMNodeStylePointerEvents = function (node_style, value) {
			node_style.pointerEvents = value;
		};
		nexacro.__setDOMNodeSize = function (node, width, height) {
			if (width >= 0 && height >= 0) {
				node.width = width + "px";
				node.height = height + "px";
			}
		};
		nexacro.__setCanvasNodeSize = function (node, width, height) {
			if (width >= 0 && height >= 0) {
				node.width = width;
				node.height = height;
			}
		};

		nexacro.__setDOMNodeOffset = function (node, offset_x, offset_y) {
			node.scrollLeft = offset_x;
			node.scrollTop = offset_y;
		};
		nexacro.__setDOMNodeHScrollPos = function (node, pos) {
			node.scrollLeft = pos;
		};
		nexacro.__setDOMNodeVScrollPos = function (node, pos) {
			node.scrollTop = pos;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion >= 9) {
				nexacro.__setDOMNodeStyleTranslate = function (node_style, offset_x, offset_y) {
					node_style.msTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
				};
				nexacro.__setDOMNodeStyleTranslateX = function (node_style, pos) {
					node_style.msTransform = "translateX(" + pos + "px)";
				};
				nexacro.__setDOMNodeStyleTranslateY = function (node_style, pos) {
					node_style.msTransform = "translateY(" + pos + "px)";
				};
			}
			else {
				nexacro.__setDOMNodeStyleTranslate = function (node_style, offset_x, offset_y) {
					nexacro.__setDOMNodeStylePos(node_style, offset_x, offset_y);
				};
				nexacro.__setDOMNodeStyleTranslateX = function (node_style, pos) {
					node_style.left = pos + "px";
				};
				nexacro.__setDOMNodeStyleTranslateY = function (node_style, pos) {
					node_style.top = pos + "px";
				};
			}
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__setDOMNodeStyleTranslate = function (node_style, offset_x, offset_y) {
				node_style.WebkitTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
			};
			nexacro.__setDOMNodeStyleTranslateX = function (node_style, pos) {
				node_style.WebkitTransform = "translateX(" + pos + "px)";
			};
			nexacro.__setDOMNodeStyleTranslateY = function (node_style, pos) {
				node_style.WebkitTransform = "translateY(" + pos + "px)";
			};
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro.__setDOMNodeStyleTranslate = function (node_style, offset_x, offset_y) {
				node_style.MozTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
			};
			nexacro.__setDOMNodeStyleTranslateX = function (node_style, pos) {
				node_style.MozTransform = "translateX(" + pos + "px)";
			};
			nexacro.__setDOMNodeStyleTranslateY = function (node_style, pos) {
				node_style.MozTransform = "translateY(" + pos + "px)";
			};
		}
		else if (nexacro.Browser == "Opera") {
			nexacro.__setDOMNodeStyleTranslate = function (node_style, offset_x, offset_y) {
				node_style.OTransform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
			};
			nexacro.__setDOMNodeStyleTranslateX = function (node_style, pos) {
				node_style.OTransform = "translateX(" + pos + "px)";
			};
			nexacro.__setDOMNodeStyleTranslateY = function (node_style, pos) {
				node_style.OTransform = "translateY(" + pos + "px)";
			};
		}
		else {
			nexacro.__setDOMNodeStyleTranslate = function (node_style, offset_x, offset_y) {
				node_style.transform = "translate3d(" + offset_x + "px, " + offset_y + "px, 0)";
			};
			nexacro.__setDOMNodeStyleTranslateX = function (node_style, pos) {
				node_style.transform = "translateX(" + pos + "px)";
			};
			nexacro.__setDOMNodeStyleTranslateY = function (node_style, pos) {
				node_style.transform = "translateY(" + pos + "px)";
			};
		}

		nexacro.__setDOMNodeStyleZindex = function (node_style, zindex) {
			node_style.zIndex = zindex;
		};

		nexacro.__getDOMNodeZoom = function (node_style) {
			return node_style.zoom;
		};

		nexacro.__setDOMNodeZoom = function (node_style, zoomFactor) {
			node_style.zoom = zoomFactor + "%";
		};

		nexacro.__setDOMNodeStyleVisible = function (node_style, visible_flag) {
			node_style.visibility = (visible_flag == true) ? "" : "hidden";
		};
		nexacro.__setDOMNodeStyleForceVisibility = function (node_style, visible_flag) {
			node_style.visibility = (visible_flag == true) ? "visible" : "hidden";
		};
		nexacro.__setDOMNodeStyleDisplay = function (node_style, v) {
			node_style.display = v;
		};

		nexacro.__setDOMNodeEnable = function (node, enable_flag) {
			node.disabled = (enable_flag ? false : true);
		};
		nexacro.__setTextAreaDOMNodeEnable = function (node, enable_flag) {
			node.disabled = (enable_flag ? false : true);
			nexacro.__setDOMNodeSelectable(node, enable_flag);
		};
		nexacro.__setDOMNodeReadOnly = function (node, readonly_flag) {
			node.readOnly = readonly_flag;
		};
		nexacro.__setDOMNodeTabIndex = function (node, index) {
			node.tabIndex = index;
		};
		nexacro.__setDOMNodeId = function (node, parentid, id) {
			node.id = parentid + id;
		};
		nexacro.__setDOMNodeToolTip = function (node, tooltiptext, tooltiptype) {
			node.title = tooltiptext;
		};

		nexacro.__getDOMNodeToolTip = function (node) {
			if (node) {
				return node.title;
			}
			return "";
		};
		if ((nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) || nexacro.Browser == "Opera") {
			nexacro.__setDOMNodeSelectable = function (node, selectable_flag) {
				node.unselectable = selectable_flag ? "off" : "on";
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 9) {
			nexacro.__setDOMNodeSelectable = function (node, selectable_flag) {
				node.style.msUserSelect = selectable_flag ? "text" : "none";
			};
		}
		else if (nexacro.BrowserType == "Gecko") {
			nexacro.__setDOMNodeSelectable = function (node, selectable_flag) {
				node.style.MozUserSelect = selectable_flag ? "" : "none";
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__setDOMNodeSelectable = function (node, selectable_flag) {
				node.style.webkitUserSelect = selectable_flag ? "" : "none";
			};
		}
		else {
			nexacro.__setDOMNodeSelectable = function (node, selectable_flag) {
				node.style.userSelect = selectable_flag ? "" : "none";
			};
		}

		if ((nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) || nexacro.Browser == "Opera") {
			nexacro.__isDOMNodeSelectable = function (node) {
				return (node.unselectable == "off");
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 9) {
			nexacro.__isDOMNodeSelectable = function (node) {
				return (node.style.msUserSelect == "");
			};
		}
		else if (nexacro.BrowserType == "Gecko") {
			nexacro.__isDOMNodeSelectable = function (node) {
				return (node.style.MozUserSelect == "");
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__isDOMNodeSelectable = function (node) {
				return (node.style.webkitUserSelect == "");
			};
		}
		else {
			nexacro.__isDOMNodeSelectable = function (node) {
				return (node.style.userSelect == "");
			};
		}

		nexacro.__setDOMNodeTitle = function (node, text) {
			if (!text) {
				text = "";
			}

			if (!node.title || node.title != text) {
				return node.title = text;
			}
		};

		nexacro.__setDOMNodeAlt = function (node, text) {
			if (!text) {
				text = "";
			}

			if (!node.alt || node.alt != text) {
				return node.alt = text;
			}
		};

		if (nexacro.Browser == "Chrome") {
			nexacro.__setImageDOMNodeImageUrl = function (node, imageurl) {
				if (imageurl && imageurl.substring(0, 17) == "data:image;base64") {
					var frontStr = imageurl.substr(0, 10);
					var rearStr = imageurl.substr(10, imageurl.length - 1);

					imageurl = frontStr + "/*" + rearStr;
				}
				node.src = imageurl;
			};
		}
		else {
			nexacro.__setImageDOMNodeImageUrl = function (node, imageurl) {
				if (!imageurl && nexacro.Browser == "Safari") {
					node.src = null;
				}
				else {
					node.src = imageurl;
				}
			};
		}
		nexacro.__setBKImageDOMNodeStyleImageUrl = function (node_style, imageurl) {
			node_style.backgroundImage = imageurl ? "url(" + imageurl + ")" : "";
		};

		nexacro.__setDOMNodeValue = function (node, value) {
			node.value = value;
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			(function () {
				var re_check = /\r|\n/;
				var re_newline = /\r\n|\n|\r/g;

				nexacro.__setDOMNodeSinglelineText = function (node, text) {
					if (re_check.test(text)) {
						node.innerText = text.replace(re_newline, " ");
					}
					else {
						node.innerText = text;
					}
				};
				nexacro.__setDOMNodeMultilineText = function (node, text) {
					node.innerText = text;
				};
			})();
		}
		else {
			(function () {
				var re_check = /\r|\n/;
				var re_newline = /\r\n|\n|\r/g;

				nexacro.__setDOMNodeSinglelineText = function (node, text) {
					if (re_check.test(text)) {
						node.textContent = text.replace(re_newline, " ");
					}
					else {
						node.textContent = text;
					}
				};
				nexacro.__setDOMNodeMultilineText = function (node, text) {
					node.textContent = text;
				};
			})();
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" || nexacro.Browser == "Gecko") {
			(function () {
				var re_check = /\r|\n/;
				var re_amp = /&/g;
				var re_lt = /</g;
				var re_gt = />/g;
				var re_quat = /\"/g;
				var re_apos = /\'/g;
				var re_newline = /\r\n|\r|\n/g;
				var re_space = / /g;

				if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
					nexacro.__setDOMNodeMultilineTextWithoutWordwrap = function (node, text) {
						var ch = text.charAt(text.length - 1);
						if (ch == "\n" || ch == "\r") {
							text += "\n";
						}

						node.innerHTML = text.replace(re_amp, "&amp;").replace(re_lt, "&lt;").replace(re_gt, "&gt;").replace(re_quat, "&quot;").replace(re_apos, "&#39;").replace(re_newline, "<br/>").replace(re_space, "&nbsp;");
					};
				}
				else {
					nexacro.__setDOMNodeMultilineTextWithoutWordwrap = function (node, text) {
						var ch = text.charAt(text.length - 1);
						if (ch == "\n" || ch == "\r") {
							text += "\n";
						}

						node.innerHTML = text.replace(re_amp, "&amp;").replace(re_lt, "&lt;").replace(re_gt, "&gt;").replace(re_quat, "&quot;").replace(re_apos, "&#39;").replace(re_newline, "<br/>");
					};
				}
			})();
		}
		else {
			nexacro.__setDOMNodeMultilineTextWithoutWordwrap = function (node, text) {
				var ch = text.charAt(text.length - 1);
				if (ch == "\n" || ch == "\r") {
					text += "\n";
				}

				node.innerText = text;
			};
		}

		nexacro.__setDOMNodeText = function (node, text, _multi_line, _wordwrap) {
			if (_multi_line) {
				if (_wordwrap != "none") {
					nexacro.__setDOMNodeMultilineText(node, text);
				}
				else {
					nexacro.__setDOMNodeMultilineTextWithoutWordwrap(node, text);
				}
			}
			else {
				nexacro.__setDOMNodeSinglelineText(node, text);
			}
		};

		nexacro.__setDOMNodeStyleDecorateText = function (node, text) {
			node.innerHTML = nexacro._decorateString(text);
		};

		nexacro.__setDOMNodeMaxLength = function (node, maxlength) {
			node.maxLength = (maxlength > 0) ? maxlength : 65535;
		};
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__setDOMNodeStyleBorderType = nexacro._emptyFn;
			nexacro.__clearDOMNodeStyleBorderType = nexacro._emptyFn;
		}
		else if (nexacro.Browser == "Gecko" && nexacro.BrowserVersion < 2) {
			nexacro.__setDOMNodeStyleBorderType = function (node_style, bordertype, target) {
				if (bordertype.type != "normal" && bordertype.type != "") {
					var radius_str = bordertype._radiusx + "px " + bordertype._radiusy + "px";
					if (bordertype._lefttop && bordertype._righttop && bordertype._rightbottom && bordertype._leftbottom && bordertype._radiusx == bordertype._radiusy) {
						node_style.MozBorderRadius = radius_str;
					}
					else {
						if (bordertype._lefttop) {
							node_style.MozBorderRadiusTopleft = radius_str;
						}
						else {
							node_style.MozBorderRadiusTopleft = "0px";
						}
						if (bordertype._righttop) {
							node_style.MozBorderRadiusTopright = radius_str;
						}
						else {
							node_style.MozBorderRadiusTopright = "0px";
						}
						if (bordertype._rightbottom) {
							node_style.MozBorderRadiusBottomright = radius_str;
						}
						else {
							node_style.MozBorderRadiusBottomright = "0px";
						}
						if (bordertype._leftbottom) {
							node_style.MozBorderRadiusBottomleft = radius_str;
						}
						else {
							node_style.MozBorderRadiusBottomleft = "0px";
						}
					}
				}
				else {
					nexacro.__clearDOMNodeStyleBorderType(node_style);
				}
			};
			nexacro.__clearDOMNodeStyleBorderType = function (node_style) {
				node_style.MozBorderRadius = "0px";
			};
		}
		else {
			nexacro.__setDOMNodeStyleBorderType = function (node_style, bordertype, target) {
				if (bordertype.type != "normal" && bordertype.type != "") {
					var radius_str = bordertype._radiusx + "px " + bordertype._radiusy + "px";
					if (bordertype._lefttop && bordertype._righttop && bordertype._rightbottom && bordertype._leftbottom && bordertype._radiusx == bordertype._radiusy) {
						node_style.borderRadius = radius_str;
					}
					else {
						if (bordertype._lefttop) {
							node_style.borderTopLeftRadius = radius_str;
						}
						else {
							node_style.borderTopLeftRadius = "0px";
						}
						if (bordertype._righttop) {
							node_style.borderTopRightRadius = radius_str;
						}
						else {
							node_style.borderTopRightRadius = "0px";
						}
						if (bordertype._rightbottom) {
							node_style.borderBottomRightRadius = radius_str;
						}
						else {
							node_style.borderBottomRightRadius = "0px";
						}
						if (bordertype._leftbottom) {
							node_style.borderBottomLeftRadius = radius_str;
						}
						else {
							node_style.borderBottomLeftRadius = "0px";
						}
					}
				}
				else {
					nexacro.__clearDOMNodeStyleBorderType(node_style);
				}

				if (nexacro.BrowserType == "WebKit") {
					(function (node, recursive) {
						if (node && node.style) {
							var _display = node.style.display;
							node.style.display = 'initial';
							var _offsetHeight = node.offsetHeight;
							node.style.display = _display;
						}

						if (node && node.hasChildNodes && node.hasChildNodes() && recursive) {
							for (var child in node.childNodes) {
								arguments.callee(child, recursive);
							}
						}
					})(target, false);
				}
			};
			nexacro.__clearDOMNodeStyleBorderType = function (node_style) {
				node_style.borderRadius = "0px";
			};
		}

		nexacro.__setDOMNodeStyleBorder = function (node_style, border) {
			if (border && !border._is_real_empty()) {
				if (border._linecnt == 1) {
					node_style.border = border._systop;
				}
				else {
					node_style.borderTop = border._systop;
					node_style.borderRight = border._sysright;
					node_style.borderBottom = border._sysbottom;
					node_style.borderLeft = border._sysleft;
				}
			}
			else {
				node_style.border = "";
			}
		};

		nexacro.__setDOMNodeStyleBackgroundColor = function (node_style, color) {
			node_style.backgroundColor = (color ? color : "transparent");
		};
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__setDOMNodeStyleBackgroundImage = function (node_style, url, repeat, bkpos) {
				if (url) {
					node_style.backgroundImage = "url(" + url + ")";
					node_style.backgroundRepeat = repeat;
					node_style.backgroundPosition = bkpos;
				}
				else {
					node_style.backgroundImage = "";
				}
			};
			nexacro.__setDOMNodeStyleBackgroundGradation = function (node_style, sysgradation) {
			};
			nexacro.__setDOMNodeStyleBackgroundImageGradation = function (node_style, url, sysgradation, repeat, bkpos) {
				if (url) {
					node_style.backgroundImage = "url(" + url + ")";
					node_style.backgroundRepeat = repeat;
					node_style.backgroundPosition = bkpos;
				}
				else {
					node_style.backgroundImage = "";
				}
			};
		}
		else {
			nexacro.__setDOMNodeStyleBackgroundImage = function (node_style, url, repeat, bkpos) {
				if (url) {
					if (repeat == "stretch") {
						node_style.backgroundImage = "url(" + url + ")";
						node_style.backgroundRepeat = "";
						node_style.backgroundPosition = "";
						node_style.backgroundSize = "100% 100%";
					}
					else {
						node_style.backgroundImage = "url(" + url + ")";
						node_style.backgroundRepeat = repeat;
						node_style.backgroundPosition = bkpos;
					}
				}
				else {
					node_style.backgroundImage = "";
				}
			};
			nexacro.__setDOMNodeStyleBackgroundGradation = function (node_style, sysgradation) {
				if (sysgradation) {
					node_style.backgroundImage = sysgradation;
					node_style.backgroundRepeat = "";
					node_style.backgroundPosition = "";
					node_style.backgroundSize = "";
				}
				else {
					node_style.backgroundImage = "";
				}
			};
			nexacro.__setDOMNodeStyleBackgroundImageGradation = function (node_style, url, sysgradation, repeat, bkpos) {
				if (url && sysgradation) {
					if (repeat == "stretch") {
						node_style.backgroundImage = "url(" + url + ")," + sysgradation;
						node_style.backgroundRepeat = "no-repeat";
						node_style.backgroundPosition = "";
						node_style.backgroundSize = "100% 100%";
					}
					else {
						node_style.backgroundImage = "url(" + url + ")," + sysgradation;
						node_style.backgroundRepeat = repeat;
						node_style.backgroundPosition = bkpos;
						node_style.backgroundSize = "";
					}
				}
				else if (url) {
					if (repeat == "stretch") {
						node_style.backgroundImage = "url(" + url + ")";
						node_style.backgroundRepeat = "no-repeat";
						node_style.backgroundPosition = "";
						node_style.backgroundSize = "100% 100%";
					}
					else {
						node_style.backgroundImage = "url(" + url + ")";
						node_style.backgroundRepeat = repeat;
						node_style.backgroundPosition = bkpos;
						node_style.backgroundSize = "";
					}
				}
				else if (sysgradation) {
					node_style.backgroundImage = sysgradation;
					node_style.backgroundRepeat = "no-repeat";
					node_style.backgroundPosition = "";
					node_style.backgroundSize = "";
				}
				else {
					node_style.backgroundImage = "";
				}
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
			nexacro.__setDOMNodeStyleEdgeBorder = nexacro._emptyFn;
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro.__setDOMNodeStyleEdgeBorder = function (node_style, url, edgex, edgey, zoomedgex, zoomedgey) {
				var edge = (zoomedgex != undefined && zoomedgey != undefined) ? zoomedgey + ' ' + zoomedgex : edgey + ' ' + edgex;
				node_style.borderWidth = edge;
				node_style.backgroundImage = "";
				node_style.backgroundSize = "";
				node_style.borderStyle = "solid";
				edge = edgey + ' ' + edgex;
				node_style.MozBorderImage = "url(" + url + ") " + edge + " stretch";
				node_style.borderImageSlice = edge + " fill";
			};
		}
		else if (nexacro.Browser == "WebKit" || nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") {
			nexacro.__setDOMNodeStyleEdgeBorder = function (node_style, url, edgex, edgey, zoomedgex, zoomedgey) {
				var edge = (zoomedgex != undefined && zoomedgey != undefined) ? zoomedgey + ' ' + zoomedgex : edgey + ' ' + edgex;
				node_style.borderWidth = edge;
				node_style.backgroundImage = "";
				node_style.backgroundSize = "";
				node_style.borderStyle = "solid";
				edge = edgey + ' ' + edgex;
				node_style.webkitBorderImage = "url(" + url + ") " + edge + " stretch";
				node_style.webkitBorderImageSlice = edge + " fill";
			};
		}
		else if (nexacro.Browser == "Opera") {
			nexacro.__setDOMNodeStyleEdgeBorder = function (node_style, url, edgex, edgey, zoomedgex, zoomedgey) {
				var edge = (zoomedgex != undefined && zoomedgey != undefined) ? zoomedgey + ' ' + zoomedgex : edgey + ' ' + edgex;
				node_style.borderWidth = edge;
				node_style.backgroundImage = "";
				node_style.backgroundSize = "";
				node_style.borderStyle = "solid";
				edge = edgey + ' ' + edgex;
				node_style.OBorderImage = "url(" + url + ") " + edge + " stretch";
			};
		}
		else {
			nexacro.__setDOMNodeStyleEdgeBorder = function (node_style, url, edgex, edgey, zoomedgex, zoomedgey) {
				var edge = (zoomedgex != undefined && zoomedgey != undefined) ? zoomedgey + ' ' + zoomedgex : edgey + ' ' + edgex;
				node_style.borderWidth = edge;
				node_style.backgroundImage = "";
				node_style.backgroundSize = "";
				node_style.borderStyle = "solid";
				edge = edgey + ' ' + edgex;
				node_style.borderImage = "url(" + url + ") " + edge + " stretch";
				node_style.borderImageSlice = edge + " fill";
			};
		}

		nexacro.__setDOMNodeStyleAlign = function (node_style, align) {
			node_style.textAlign = align._halign;
			node_style.verticalAlign = align._valign;
		};
		nexacro.__setDOMNodeStyleAlignXY = function (node_style, halign, valign) {
			if (halign) {
				node_style.textAlign = halign;
			}
			if (valign) {
				node_style.verticalAlign = valign;
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
			nexacro.__setTextDOMNodeStyleAlign = function (node_style, align) {
				if (node_style.textAlign == align._halign) {
					node_style.textAlign = "";
				}
				node_style.textAlign = align._halign;
				node_style.verticalAlign = align._valign;
			};
			nexacro.__setTextDOMNodeStyleAlignXY = function (node_style, halign, valign) {
				if (halign != node_style.textAlign) {
					node_style.textAlign = "";
					if (halign) {
						node_style.textAlign = halign;
					}
				}
				if (valign) {
					node_style.verticalAlign = valign;
				}
			};
		}
		else {
			nexacro.__setTextDOMNodeStyleAlign = nexacro.__setDOMNodeStyleAlign;
			nexacro.__setTextDOMNodeStyleAlignXY = nexacro.__setDOMNodeStyleAlignXY;
		}



		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion < 9) {
				nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height) {
					if (halign != node_style.textAlign) {
						node_style.textAlign = "";
						if (halign) {
							node_style.textAlign = halign;
						}
					}
					var offset_top = 0;
					if (valign && parent_height && txt_height) {
						switch (valign) {
							case "middle":
								if (parent_height <= txt_height) {
									break;
								}
								offset_top = ((parent_height - txt_height) / 2);
								break;
							case "bottom":
								offset_top = (parent_height - txt_height);
								break;
						}
						node_style.paddingTop = offset_top + "px";
						node_style.paddingBottom = "";
						node_style.height = (parent_height - offset_top) + "px";
						node_style.width = parent_width + "px";
					}
				};
			}
			else if (nexacro.BrowserVersion < 11) {
				nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height) {
					node_style.textAlign = halign;
					if (valign && parent_height && txt_height) {
						var offset_top = 0, offset_bottom = 0;
						switch (valign) {
							case "top":
								offset_bottom = (parent_height - txt_height);
								break;
							case "bottom":
								offset_top = (parent_height - txt_height);
								break;
						}
						node_style.paddingTop = offset_top + "px";
						node_style.paddingBottom = offset_bottom + "px";
						node_style.height = (parent_height - offset_top - offset_bottom) + "px";
						node_style.width = parent_width + "px";
					}
				};
			}
			else {
				nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height) {
					node_style.textAlign = halign;
					if (valign && parent_height && txt_height) {
						switch (valign) {
							case "top":
								node_style.paddingTop = "0px";
								node_style.paddingBottom = (parent_height - txt_height) > 0 ? (parent_height - txt_height) + "px" : "0px";
								break;
							case "middle":
								node_style.paddingTop = "0px";
								node_style.paddingBottom = "0px";
								break;
							case "bottom":
								node_style.paddingTop = (parent_height - txt_height) + "px";
								node_style.paddingBottom = "0px";
								break;
						}
					}
				};
			}
		}
		else if (nexacro.Browser == "WebKit" || nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") {
			nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height) {
				node_style.textAlign = halign;
				if (valign && parent_height && txt_height) {
					switch (valign) {
						case "top":
							node_style.top = "0px";
							node_style.height = txt_height + "px";
							break;
						case "middle":
							node_style.top = "0px";
							node_style.height = parent_height + "px";
							break;
						case "bottom":
							node_style.top = (parent_height - txt_height) + "px";
							node_style.height = txt_height + "px";
							break;
					}
				}
			};
		}
		else {
			nexacro.__setInputDOMNodeStyleAlignXY = function (node_style, halign, valign, parent_height, parent_width, txt_height) {
				node_style.textAlign = halign;
				if (valign && parent_height && txt_height) {
					switch (valign) {
						case "top":
							node_style.paddingTop = "0px";
							node_style.paddingBottom = (parent_height - txt_height) > 0 ? (parent_height - txt_height) + "px" : "0px";
							break;
						case "middle":
							node_style.paddingTop = "0px";
							node_style.paddingBottom = "0px";
							break;
						case "bottom":
							node_style.paddingTop = (parent_height - txt_height) + "px";
							node_style.paddingBottom = "0px";
							break;
					}
				}
			};
		}

		nexacro.__setTextAreaDOMNodeStyleAlignXY = function (node_style, halign, valign, blank_height, padding) {
			node_style.textAlign = halign;

			var padding_top = 0;
			var padding_bottom = 0;

			if (padding) {
				padding_top = padding.top;
				padding_bottom = padding.bottom;
			}

			switch (valign) {
				case "top":
					node_style.paddingTop = padding_top + "px";
					node_style.paddingBottom = padding_bottom + "px";
					break;
				case "middle":
					node_style.paddingTop = (padding_top + (blank_height / 2)) + "px";
					node_style.paddingBottom = padding_bottom + "px";
					break;
				case "bottom":
					node_style.paddingTop = padding_top + blank_height + "px";
					node_style.paddingBottom = padding_bottom + "px";
					break;
			}
		};

		nexacro.__setBKImageDOMNodeStyleAlign = function (node_style, align) {
			node_style.backgroundPosition = align.halign + ' ' + (align.valign == "middle" ? "center" : align.valign);
		};
		nexacro.__setBKImageDOMNodeStyleAlignXY = function (node_style, halign, valign) {
			node_style.backgroundPosition = halign + ' ' + (valign == "middle" ? "center" : valign);
		};

		nexacro.__setDOMNodeStyleColor = function (node_style, color) {
			node_style.color = color._syscolor;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__setDOMNodeStyleFont = function (node_style, font) {
				if (font._bold) {
					node_style.fontWeight = "bold";
				}
				else {
					node_style.fontWeight = "normal";
				}

				if (font._italic) {
					node_style.fontStyle = "italic";
				}
				else {
					node_style.fontStyle = "normal";
				}

				node_style.fontFamily = font.face;
				node_style.fontSize = font.size >= 0 ? font.size + "pt" : Math.abs(font.size) + "px";
				node_style.textDecoration = font._sysdecoration;
			};
		}
		else {
			nexacro.__setDOMNodeStyleFont = function (node_style, font) {
				node_style.font = font._sysvalue;
				node_style.textDecoration = font._sysdecoration;
			};
		}

		nexacro.__setDOMNodeStylePadding = function (node_style, padding) {
			if (padding) {
				node_style.paddingLeft = ((padding.left < 0) ? 0 : padding.left) + "px";
				node_style.paddingTop = ((padding.top < 0) ? 0 : padding.top) + "px";
				node_style.paddingRight = ((padding.right < 0) ? 0 : padding.right) + "px";
				node_style.paddingBottom = ((padding.bottom < 0) ? 0 : padding.bottom) + "px";
			}
			else {
				node_style.padding = "0px";
			}
		};
		nexacro.__setDOMNodeStylePaddingXY = function (node_style, left, top, right, bottom) {
			node_style.paddingLeft = left + "px";
			node_style.paddingTop = top + "px";
			node_style.paddingRight = right + "px";
			node_style.paddingBottom = bottom + "px";
		};

		nexacro.__setDOMNodeStyleMargin = function (node_style, margin) {
			if (margin) {
			}
			else {
				node_style.margin = "0px";
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__setDOMNodeStyleCursor = function (node_style, cursor, deftype) {
				var cur_type = (cursor && !cursor._is_empty) ? cursor._value : (deftype ? deftype : "arrow");
				if (cur_type == "auto") {
					cur_type = "default";
				}
				else if (cur_type == "no") {
					cur_type = "not-allowed";
				}
				else if (cur_type == "pointer") {
					cur_type = "hand";
				}
				else if (cur_type == "arrowwait") {
					cur_type = "progress";
				}
				else if (cur_type == "arrow") {
					cur_type = "default";
				}
				else if (cur_type == "coll-resize" || cur_type == "colr-resize") {
					cur_type = "col-resize";
				}
				else if (cur_type == "rowt-resize" || cur_type == "rowb-resize") {
					cur_type = "row-resize";
				}

				node_style.cursor = cur_type;
			};
		}
		else if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9)) {
			nexacro.__setDOMNodeStyleCursor = function (node_style, cursor, deftype) {
				var cur_type = (cursor && !cursor._is_empty) ? cursor._value : (deftype ? deftype : "arrow");
				if (cur_type == "auto") {
					cur_type = "default";
				}
				else if (cur_type == "no") {
					cur_type = "not-allowed";
				}
				else if (cur_type == "hand") {
					cur_type = "pointer";
				}
				else if (cur_type == "text") {
					cur_type = "text";
				}
				else if (cur_type == "arrow") {
					cur_type = "default";
				}
				else if (cur_type == "arrowwait") {
					cur_type = "progress";
				}
				else if (cur_type == "coll-resize" || cur_type == "colr-resize") {
					cur_type = "col-resize";
				}
				else if (cur_type == "rowt-resize" || cur_type == "rowb-resize") {
					cur_type = "row-resize";
				}

				node_style.cursor = cur_type;
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__setDOMNodeStyleShadow = function (node_style, shadow) {
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) {
			nexacro.__setDOMNodeStyleShadow = function (node_style, shadow) {
				node_style.boxShadow = shadow._sysvalue;
			};
		}
		else if (nexacro.Browser == "Gecko" && nexacro.BrowserVersion < 2) {
			nexacro.__setDOMNodeStyleShadow = function (node_style, shadow) {
				node_style.MozBoxShadow = shadow._sysvalue;
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__setDOMNodeStyleShadow = function (node_style, shadow) {
				node_style.webkitBoxShadow = shadow._sysvalue;
			};
		}
		else {
			nexacro.__setDOMNodeStyleShadow = function (node_style, shadow) {
				node_style.boxShadow = shadow._sysvalue;
			};
		}

		nexacro.__setDOMNodeStyleLineSpace = function (node_style, linespace) {
			node_style.lineHeight = (linespace < 0) ? "" : linespace + "px";
		};

		nexacro.__setDOMNodeStyleLetterSpace = function (node_style, letterspace) {
			node_style.letterSpacing = letterspace + "px";
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 8) {
			nexacro.__setDOMNodeWordWrap = function (node, use_wordwrap) {
				var node_style = node.style;

				if (use_wordwrap == "char") {
					node_style.whiteSpace = "pre";
					node_style.wordWrap = "break-word";
					node_style.wordBreak = "break-all";
				}
				else if (use_wordwrap == "english") {
					node_style.whiteSpace = "pre";
					node_style.wordWrap = "break-word";
					node_style.wordBreak = "";
				}
				else {
					node_style.whiteSpace = "pre";
					node_style.wordWrap = "normal";
				}
			};
		}
		else {
			nexacro.__setDOMNodeWordWrap = function (node, use_wordwrap) {
				var node_style = node.style;

				if (use_wordwrap == "char") {
					node_style.whiteSpace = "pre-wrap";
					node_style.wordWrap = "break-word";
					node_style.wordBreak = "break-all";
				}
				else if (use_wordwrap == "english") {
					node_style.whiteSpace = "pre-wrap";
					node_style.wordWrap = "break-word";
					node_style.wordBreak = "";
				}
				else {
					node_style.whiteSpace = "pre";
					node_style.wordWrap = "normal";
					node_style.wordBreak = "";
				}
			};
		}

		nexacro.__setTextAreaDOMNodeWordWrap = function (node, use_wordwrap) {
			var node_style = node.style;

			if (use_wordwrap == "char" || use_wordwrap == "english") {
				node.wrap = "hard";
			}
			else {
				node.wrap = "off";
			}

			nexacro.__setDOMNodeWordWrap(node, use_wordwrap);
		};

		nexacro.__setDOMNodeFocusBorder = function (node, border) {
		};

		nexacro.__setDOMNodeTabIndentSize = function (node, nTabSize) {
			var node_style = node.style;

			node_style.tabSize = nTabSize;
		};

		nexacro.__setDOMNodeSelectBackgroundColor = function (node, color) {
		};
		nexacro.__setDOMNodeSelectColor = function (node, color) {
		};
		nexacro.__setDOMNodeCaretColor = function (node, color) {
		};
		nexacro.__setDOMNodeCompositeColor = function (node, color) {
		};


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__changeInputDOMNodeType = function (node, type) {
				if (node.type == type) {
					return node;
				}

				var doc = node.ownerDocument;
				var parent = (node.parentNode || node.parentElement);
				var outerHTML = node.outerHTML;

				outerHTML = outerHTML.replace(/type=[a-z]*/, "");
				outerHTML = outerHTML.replace(/value=""/, "value=\"" + node.value + "\"");

				var new_node = doc.createElement(outerHTML);
				new_node.setAttribute("type", type ? type : "text");

				nexacro.__insertDOMNode(parent, new_node, node);
				nexacro.__removeDOMNode(parent, node);

				return new_node;
			};
		}
		else {
			nexacro.__changeInputDOMNodeType = function (node, type) {
				if (node.type != type) {
					node.type = type;
				}
				return node;
			};
		}

		nexacro.__setDOMNodeImeMode = function (node, mode) {
			var imemodestr = null;
			if (mode == "alpha" || mode == "alpha,full") {
				imemodestr = "inactive";
			}
			else if (mode == "hangul" || mode == "hangul,full") {
				imemodestr = "active";
			}
			else if (mode == "katakana" || mode == "katakana,full") {
				imemodestr = "auto";
			}
			else if (mode == "hiragana") {
				imemodestr = "active";
			}
			else if (mode == "direct") {
				imemodestr = "inactive";
			}
			else if (mode == "disabled") {
				imemodestr = "disabled";
			}
			else {
				imemodestr = "";
			}
			node.style.imeMode = imemodestr;
		};

		nexacro.__setDOMNodeSelect = function (_doc, node) {
			node.select();
		};

		if (nexacro.Browser == "IE") {
			nexacro.__setDOMNodeSetSelect = function (_doc, node, start, end) {
				if (typeof start == 'number') {
					end = (typeof end == 'number') ? end : start;
					if (node.createTextRange) {
						var range = node.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', start);
						range.select();
					}
				}
			};

			nexacro.__setTextAreaDOMNodeSetSelect = function (_doc, node, start, end) {
				if (typeof start == 'number') {
					if (node.createTextRange) {
						var range = node.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', start);
						range.select();
					}
				}
			};
		}
		else {
			nexacro.__setDOMNodeSetSelect = function (_doc, node, start, end) {
				if (node.type == "date") {
					return;
				}

				if (typeof start == 'number') {
					end = (typeof end == 'number') ? end : start;
					if (node.setSelectionRange) {
						node.setSelectionRange(start, end);
					}
					else if (node.createTextRange) {
						var range = node.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', start);
						range.select();
					}
				}
			};

			nexacro.__setTextAreaDOMNodeSetSelect = function (_doc, node, start, end) {
				if (typeof start == 'number') {
					if (node.setSelectionRange) {
						node.setSelectionRange(start, end);
					}
					else if (node.createTextRange) {
						var range = node.createTextRange();
						range.collapse(true);
						range.moveEnd('character', end);
						range.moveStart('character', start);
						range.select();
					}
				}
			};
		}

		nexacro.__getNodeSelectionStart = function (node) {
			return node.selectionStart;
		};
		nexacro.__getNodeSelectionEnd = function (node) {
			return node.selectionEnd;
		};

		nexacro.__getDOMNodeCaretPos = function (_doc, node) {
			if (node.type === "date") {
				return -1;
			}

			var begin = 0, end = 0;

			if (node.setSelectionRange) {
				begin = nexacro.__getNodeSelectionStart(node);
				end = nexacro.__getNodeSelectionEnd(node);
			}
			else if (_doc.selection && _doc.selection.createRange) {
				var range = _doc.selection.createRange();
				begin = 0 - range.duplicate().moveStart('character', -100000);
				end = begin + range.text.length;
			}

			return {
				begin : begin, 
				end : end
			};
		};

		nexacro.__getTextAreaDOMNodeCaretPos = function (_doc, node) {
			var begin = 0, end = 0;
			var value = node.value;

			if (node.setSelectionRange) {
				begin = nexacro.__getNodeSelectionStart(node);
				end = nexacro.__getNodeSelectionEnd(node);

				if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
					var len = value.length;
					if (begin > len) {
						begin = len;
					}
					if (end > len) {
						end = len;
					}
				}
			}
			else if (_doc.selection && _doc.selection.createRange) {
				var range = _doc.selection.createRange();
				var n_value = value.replace(/\r\n/g, '\n');
				var len = n_value.length;

				var txtRange = node.createTextRange();
				txtRange.moveToBookmark(range.getBookmark());
				var endRange = node.createTextRange();
				endRange.collapse(false);

				if (txtRange.compareEndPoints('StartToEnd', endRange) > -1) {
					begin = end = len;
				}
				else {
					begin = -txtRange.moveStart('character', -len);
					if (txtRange.compareEndPoints('EndToEnd', endRange) > -1) {
						end = len;
					}
					else {
						end = -txtRange.moveEnd('character', -len);
					}
				}
			}

			return {
				begin : begin, 
				end : end
			};
		};

		nexacro.__getDOMNodeCaretLine = function (_doc, node) {
			var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;
			var selectionStart = nexacro.__getNodeSelectionStart(node);
			var selectionEnd = nexacro.__getNodeSelectionEnd(node);

			if (typeof selectionStart == "number" && typeof selectionEnd == "number") {
				if (nexacro.Browser != "IE" && node.selectionDirection == "forward") {
					start = selectionEnd;
				}
				else {
					start = selectionStart;
				}

				var text = node.value.slice(0, start);
				var textarr = text.split("\n");
				var line = textarr.length;
				var element = node._linked_element;

				if (element.wordwrap != "none") {
					var i = 0;
					var curline = 0;
					var checkline = 0;
					var subline = 0;
					for (i = 0; i < line; i++) {
						var t = textarr[i];
						curline = nexacro._getLineCountWithWordwrap(element, t, element.wordwrap);
						subline += curline;
					}


					if (line == textarr.length) {
						textarr = node.value.slice(0, start + 2).split("\n");

						var text_temp = textarr[line - 1];
						checkline = nexacro._getLineCountWithWordwrap(element, text_temp, element.wordwrap);
						if (checkline > curline) {
							subline++;
						}
					}
					line = subline;
				}
				return line;
			}
			else {
				node.setActive();

				var element = node._linked_element;
				var line = 0;
				range = _doc.selection.createRange();
				if (range && range.parentElement() == node) {
					len = node.value.length;
					normalizedValue = node.value.replace(/\r\n/g, "\n");

					textInputRange = node.createTextRange();
					textInputRange.moveToBookmark(range.getBookmark());

					endRange = node.createTextRange();
					endRange.collapse(false);

					var text;

					if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
						textarr = normalizedValue.slice(0, len).split("\n");
					}
					else {
						start = -textInputRange.moveStart("character", -len);
						textarr = normalizedValue.slice(0, start).split("\n");
					}

					if (textarr === undefined || textarr == null) {
						return 1;
					}

					line = textarr.length;

					if (element.wordwrap != "none") {
						var i = 0;
						var curline = 0;
						var checkline = 0;
						var subline = 0;
						for (i = 0; i < line; i++) {
							var t = textarr[i];
							curline = nexacro._getLineCountWithWordwrap(element, t, element.wordwrap);
							subline += curline;
						}

						var text_temp;
						if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
							textarr = normalizedValue.slice(0, len + 2).split("\n");
						}
						else {
							textarr = normalizedValue.slice(0, start + 2).split("\n");
						}

						if (line == textarr.length) {
							text_temp = textarr[line - 1];
							checkline = nexacro._getLineCountWithWordwrap(element, text_temp, element.wordwrap);
							if (checkline > curline) {
								subline++;
							}
						}

						line = subline;
					}
				}
				return line;
			}
		};

		nexacro.__getDOMNodeValue = function (node) {
			if (node) {
				return node.value;
			}
		};



		nexacro.__getHTMLStyleAbsolute = function () {
			return "position:absolute;overflow:hidden;";
		};
		nexacro.__getHTMLStyleRelative = function () {
			return "position:relative;overflow:hidden;";
		};
		nexacro.__getHTMLStyleAbsoluteTransparent = function () {
			return "position:absolute;overflow:hidden;background-color:transparent;";
		};


		nexacro.__getTextAreaHTMLStyleAbsoluteTransparent = function () {
			return "position:relative;overflow:scroll;background-color:transparent;";
		};


		nexacro.__getMobileIframeHTMLStyleScroll = function () {
			return "overflow:auto;-webkit-overflow-scrolling:touch;";
		};

		nexacro.__getHTMLStylePosLeftTop = function (left, top) {
			return "position:absolute;overflow:hidden;left:" + (left | 0) + "px;top:" + (top | 0) + "px;";
		};
		nexacro.__getHTMLStylePosRightTop = function (right, top) {
			return "position:absolute;overflow:hidden;right:" + (right | 0) + "px;top:" + (top | 0) + "px;";
		};
		nexacro.__getHTMLStylePosLeftBottom = function (left, bottom) {
			return "position:absolute;overflow:hidden;left:" + (left | 0) + "px;bottom:" + (bottom | 0) + "px;";
		};
		nexacro.__getHTMLStylePosRightBottom = function (right, bottom) {
			return "position:absolute;overflow:hidden;right:" + (right | 0) + "px;bottom:" + (bottom | 0) + "px;";
		};

		nexacro.__getHTMLStylePosSize = function (left, top, width, height) {
			return "position:absolute;overflow:hidden;" + 
				"left:" + (left | 0) + "px;" + "top:" + (top | 0) + "px;" + 
				"width:" + (width | 0) + "px;" + "height:" + (height | 0) + "px;";
		};
		nexacro.__getHTMLStylePosUnitSize = function (left, top, width, height) {
			return "position:absolute;overflow:hidden;" + 
				"left:" + (left | 0) + "px;" + "top:" + (top | 0) + "px;" + 
				"width:" + width + ";" + "height:" + height + ";";
		};

		nexacro.__getHTMLStylePos = function (left, top) {
			return "left:" + (left | 0) + "px;" + "top:" + (top | 0) + "px;";
		};
		nexacro.__getHTMLStyleSize = function (width, height) {
			if (width >= 0 && height >= 0) {
				return "width:" + (width | 0) + "px;" + "height:" + (height | 0) + "px;";
			}
			return "";
		};
		nexacro.__getHTMLStyleUnitSize = function (width, height) {
			return "width:" + (width | 0) + ";" + "height:" + (height | 0) + ";";
		};

		nexacro.__getHTMLAttrSize = function (width, height) {
			if (width >= 0 && height >= 0) {
				return " width='" + width + "px' height='" + height + "px'";
			}
			return "";
		};
		nexacro.__getHTMLCanvasAttrSize = function (width, height) {
			if (width >= 0 && height >= 0) {
				return " width='" + width + "' height='" + height + "'";
			}
			return "";
		};

		nexacro.__getHTMLStyleVisible = function (width, height) {
			return (visible_flag == true) ? "" : "visibility:hidden;";
		};
		nexacro.__getHTMLStyleDisplay = function (width, height) {
			return "display:" + v + ";";
		};

		nexacro.__getHTMLAttrEnable = function (enable_flag) {
			return enable_flag ? "" : " disabled='true'";
		};
		nexacro.__getTextAreaHTMLAttrEnable = function (enable_flag) {
			return enable_flag ? nexacro.__getHTMLAttrSelectable(enable_flag) : (" disabled='true'" + nexacro.__getHTMLAttrSelectable(enable_flag));
		};

		nexacro.__getHTMLAttrReadOnly = function (readonly_flag) {
			return readonly_flag ? " readOnly='true'" : "";
		};
		nexacro.__getHTMLAttrTabIndex = function (index) {
			return index > -1 ? " tabIndex='" + index + "'" : "";
		};
		nexacro.__getHTMLAttrToolTip = function (tooltiptext, tooltiptype) {
			return " title='" + nexacro._encodeXML(tooltiptext) + "'";
		};

		if ((nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) || nexacro.Browser == "Opera") {
			nexacro.__getHTMLAttrSelectable = function (selectable_flag) {
				return " unselectable=" + (selectable_flag ? "'off'" : "'on'");
			};
			nexacro.__getHTMLStyleSelectable = function (selectable_flag) {
				return "";
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 9) {
			nexacro.__getHTMLAttrSelectable = function (selectable_flag) {
				return "";
			};
			nexacro.__getHTMLStyleSelectable = function (selectable_flag) {
				return selectable_flag ? "" : "-ms-user-select:none;";
			};
		}
		else if (nexacro.BrowserType == "Gecko") {
			nexacro.__getHTMLAttrSelectable = function (selectable_flag) {
				return "";
			};
			nexacro.__getHTMLStyleSelectable = function (selectable_flag) {
				return selectable_flag ? "" : "-moz-user-select:none;";
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__getHTMLAttrSelectable = function (selectable_flag) {
				return "";
			};
			nexacro.__getHTMLStyleSelectable = function (selectable_flag) {
				return selectable_flag ? "" : "-webkit-user-select:none;";
			};
		}
		else {
			nexacro.__getHTMLAttrSelectable = function (selectable_flag) {
				return "";
			};
			nexacro.__getHTMLStyleSelectable = function (selectable_flag) {
				return selectable_flag ? "" : "user-select:none;";
			};
		}

		nexacro.__getImageHTMLImageUrl = function (imageurl) {
			return " src='" + nexacro._encodeXML(imageurl) + "'";
		};
		nexacro.__getBKImageHTMLStyleImageUrl = function (imageurl) {
			return "background-image:url(" + nexacro._encodeXML(imageurl) + ");";
		};
		nexacro.__getHTMLAttrValue = function (value) {
			return " value='" + nexacro._encodeXML(value) + "'";
		};
		(function () {
			var re_check = /\r|\n/;
			var re_newline = /\r\n|\n|\r/g;
			nexacro.__getSinglelineText = function (text) {
				if (re_check.test(text)) {
					return text.replace(re_newline, " ");
				}
				else {
					return text;
				}
			};
		})();
		nexacro.__getHTMLText = function (text, _new_line) {
			if (_new_line) {
				return nexacro.__toInnerHTMLText(nexacro.__getSinglelineText(text));
			}
			else {
				return nexacro.__toInnerHTMLText(text);
			}
		};
		nexacro.__getHTMLStyleDecorateText = function (text, _new_line) {
			return "text-decoration:" + nexacro._encodeXML(nexacro._decorateString(text));
		};
		nexacro.__getHTMLAttrMaxLength = function (maxlength) {
			return " maxlength='" + ((maxlength > 0) ? maxlength : 65535) + "'";
		};
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__getHTMLStyleBorderType = function (bordertype) {
				return "";
			};
		}
		else if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9)) {
			if (nexacro.Browser == "Gecko" && nexacro.BrowserVersion < 2) {
				nexacro.__getHTMLStyleBorderType = function (bordertype) {
					if (bordertype.type != "normal" && bordertype.type != "") {
						var radius_str = bordertype._radiusx + "px " + bordertype._radiusy + "px";
						if (bordertype._lefttop && bordertype._righttop && bordertype._rightbottom && bordertype._leftbottom) {
							return "-moz-border-radius:" + radius_str + ";";
						}
						else {
							return "-moz-border-radius-topleft:" + ((bordertype._lefttop) ? radius_str : "0px") + ";" + 
								"-moz-border-radius-topright:" + ((bordertype._righttop) ? radius_str : "0px") + ";" + 
								"-moz-border-radius-bottomright:" + ((bordertype._rightbottom) ? radius_str : "0px") + ";" + 
								"-moz-border-radius-bottomleft:" + ((bordertype._leftbottom) ? radius_str : "0px") + ";";
						}
					}
					else {
						return "";
					}
				};
			}
			else {
				nexacro.__getHTMLStyleBorderType = function (bordertype) {
					if (bordertype.type != "normal" && bordertype.type != "") {
						var radius_str = bordertype._radiusx + "px " + bordertype._radiusy + "px";
						if (bordertype._lefttop && bordertype._righttop && bordertype._rightbottom && bordertype._leftbottom) {
							return "border-radius:" + radius_str + ";";
						}
						else {
							return "border-top-left-radius:" + ((bordertype._lefttop) ? radius_str : "0px") + ";" + 
								"border-top-right-radius:" + ((bordertype._righttop) ? radius_str : "0px") + ";" + 
								"border-bottom-right-radius:" + ((bordertype._rightbottom) ? radius_str : "0px") + ";" + 
								"border-bottom-left-radius:" + ((bordertype._leftbottom) ? radius_str : "0px") + ";";
						}
					}
					else {
						return "";
					}
				};
			}
		}

		nexacro.__getHTMLStyleBorder = function (border) {
			if (border && !border._is_real_empty()) {
				if (border._linecnt == 1) {
					return "border:" + border._systop + ";";
				}
				else {
					return "border-top:" + border._systop + ";" + 
						"border-right:" + border._sysright + ";" + 
						"border-bottom:" + border._sysbottom + ";" + 
						"border-left:" + border._sysleft + ";";
				}
			}
			else {
				return "";
			}
		};

		nexacro.__getHTMLStyleBackgroundColor = function (color) {
			if (color) {
				return "background-color:" + color + ";";
			}
			else {
				return "";
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__getHTMLStyleBackgroundImage = function (url, repeat, bkpos) {
				if (url) {
					return "background-image:" + "url(" + url + ")" + ";" + 
						"background-repeat:" + repeat + ";" + 
						"background-position:" + bkpos + ";";
				}
				else {
					return "";
				}
			};
			nexacro.__getHTMLStyleBackgroundGradation = function (sysgradation) {
				return "";
			};
			nexacro.__getHTMLStyleBackgroundImageGradation = function (url, sysgradation, repeat, bkpos) {
				if (url) {
					return "background-image:" + "url(" + url + ")" + ";" + 
						"background-repeat:" + repeat + ";" + 
						"background-position:" + bkpos + ";";
				}
				else {
					return "";
				}
			};
		}
		else {
			nexacro.__getHTMLStyleBackgroundImage = function (url, repeat, bkpos) {
				if (url) {
					if (repeat == "stretch") {
						return "background-image:" + "url(" + url + ")" + ";" + 
							"background-size:100% 100%;";
					}
					else {
						return "background-image:" + "url(" + url + ")" + ";" + 
							"background-repeat:" + repeat + ";" + 
							"background-position:" + bkpos + ";";
					}
				}
				else {
					return "";
				}
			};
			nexacro.__getHTMLStyleBackgroundGradation = function (sysgradation) {
				if (sysgradation) {
					return "background-image:" + sysgradation + ";";
				}
				else {
					return "";
				}
			};
			nexacro.__getHTMLStyleBackgroundImageGradation = function (url, sysgradation, repeat, bkpos) {
				if (url && sysgradation) {
					if (repeat == "stretch") {
						return "background-image:" + "url(" + url + ")," + sysgradation + ";" + 
							"background-size:100% 100%;";
					}
					else {
						return "background-image:" + "url(" + url + ")," + sysgradation + ";" + 
							"background-repeat:" + repeat + ";" + 
							"background-position:" + bkpos + ";";
					}
				}
				else if (url) {
					if (repeat == "stretch") {
						return "background-image:" + "url(" + url + ");" + 
							"background-size:100% 100%;";
					}
					else {
						return "background-image:" + "url(" + url + ");" + 
							"background-repeat:" + repeat + ";" + 
							"background-position:" + bkpos + ";";
					}
				}
				else if (sysgradation) {
					return "background-image:" + sysgradation + ";";
				}
				else {
					return "";
				}
			};
		}
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
			nexacro.__getHTMLStyleOpacity = function (sysopacity) {
				"";
			};
		}
		else {
			nexacro.__getHTMLStyleOpacity = function (sysopacity) {
				if (sysopacity < 100) {
					return "opacity:" + (sysopacity / 100) + ";";
				}
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
			nexacro.__getHTMLStyleEdgeBorder = function (url, edgex, edgey) {
				return "";
			};
		}
		else {
			if (nexacro.Browser == "Gecko") {
				nexacro.__getHTMLStyleEdgeBorder = function (node_style, url, edgex, edgey) {
					var edge = edgey + ' ' + edgex;
					return "border-style:solid;" + 
						"border-width:" + edge + ";" + 
						"-moz-border-image:" + "url(" + url + ") " + edge + " stretch;" + 
						"border-border-image-slice:" + edge + " fill;";
				};
			}
			else if (nexacro.Browser == "WebKit" || nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") {
				nexacro.__getHTMLStyleEdgeBorder = function (node_style, url, edgex, edgey) {
					var edge = edgey + ' ' + edgex;
					return "border-style:solid;" + 
						"border-width:" + edge + ";" + 
						"-webkit-border-image:" + "url(" + url + ") " + edge + " stretch;" + 
						"-webkit-border-image-slice:" + edge + " fill;";
				};
			}
			else if (nexacro.Browser == "Opera") {
				nexacro.__getHTMLStyleEdgeBorder = function (node_style, url, edgex, edgey) {
					var edge = edgey + ' ' + edgex;
					return "border-style:solid;" + 
						"border-width:" + edge + ";" + 
						"-o-border-image:" + "url(" + url + ") " + edge + " stretch;";
				};
			}
			else {
				nexacro.__getHTMLStyleEdgeBorder = function (node_style, url, edgex, edgey) {
					var edge = edgey + ' ' + edgex;
					return "border-style:solid;" + 
						"border-width:" + edge + ";" + 
						"border-image:" + "url(" + url + ") " + edge + " stretch;" + 
						"border-image-slice:" + edge + " fill;";
				};
			}
		}

		nexacro.__getHTMLStyleAlign = function (align) {
			return "text-align:" + align._halign + ";vertical-align:" + align._valign + ";";
		};
		nexacro.__getHTMLStyleAlignXY = function (halign, valign) {
			return ((halign) ? ("text-align:" + halign + ";") : "") + ((valign) ? ("vertical-align:" + align._valign + ";") : "");
		};

		nexacro.__getBKImageHTMLStyleAlign = function (align) {
			return (align) ? ("background-position:" + align._halign + ' ' + (align.valign == "middle" ? "center" : align.valign) + ";") : "";
		};
		nexacro.__getBKImageHTMLStyleAlignXY = function (halign, valign) {
			return "background-position:" + halign + ' ' + (valign == "middle" ? "center" : valign) + ";";
		};

		nexacro.__getHTMLStyleColor = function (color) {
			return (color) ? ("color:" + color._syscolor + ";") : "";
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__getHTMLStyleFont = function (font) {
				return (font) ? ((font._bold ? "font-weight:bold;" : "") + (font._italic ? "font-style:italic;" : "") + "font-family:" + font.face + ";" + "font-size:" + (font.size >= 0 ? font.size + "pt;" : Math.abs(font.size) + "px;") + (font._sysdecoration ? ("text-decoration:" + font._sysdecoration + ";") : "")) : "";
			};
		}
		else {
			nexacro.__getHTMLStyleFont = function (font) {
				return (font) ? ("font:" + font._sysvalue + ";" + (font._sysdecoration ? ("text-decoration:" + font._sysdecoration + ";") : "")) : "";
			};
		}

		nexacro.__getHTMLStylePadding = function (padding) {
			return (padding) ? ("padding:" + padding.top + "px " + padding.right + "px " + padding.bottom + "px " + padding.left + "px;") : 
				"padding:0px;";
		};

		nexacro.__getHTMLStylePaddingXY = function (left, top, right, bottom) {
			return "padding:" + top + "px " + right + "px " + bottom + "px " + left + "px;";
		};

		nexacro.__getHTMLStyleMargin = function (margin) {
			if (margin) {
				return "";
			}
			else {
				return "";
			}
		};

		nexacro.__getHTMLStyleHAlign = function (halign) {
			return "text-align:" + halign + ";";
		};
		nexacro.__getHTMLStyleAlign = function (align) {
			return "text-align:" + align._halign + ";vertical-align:" + align._valign + ";";
		};
		nexacro.__getHTMLStyleAlignXY = function (halign, valign) {
			return "text-align:" + halign + ";vertical-align:" + valign + ";";
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			nexacro.__getInputHTMLStyleAlignXY = function (halign, valign, container_height, txt_height) {
				var halign_str = "text-align:" + halign + ";";
				if (valign == "top") {
					return halign_str + "padding-top:0px;";
				}
				else if (valign == "middle") {
					return halign_str + ((container_height > txt_height) ? 
						"padding-top:" + ((container_height - txt_height) / 2) + "px;" : "");
				}
				else if (valign == "bottom") {
					return halign_str + ((container_height - txt_height) ? 
						"padding-top:" + (container_height - txt_height) + "px;" : "");
				}
				return halign_str;
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__getInputHTMLStyleAlignXY = function (halign, valign, container_height, txt_height) {
				var halign_str = "text-align:" + halign + ";";
				if (valign == "top") {
					return halign_str + "top:0px;height:" + txt_height + "px;";
				}
				else if (valign == "middle") {
					return halign_str + "top:0px;height:" + container_height + "px;";
				}
				else if (valign == "bottom") {
					return halign_str + "top:" + (container_height - txt_height) + "px;height:" + txt_height + "px;";
				}
				return halign_str;
			};
		}
		else {
			nexacro.__getInputHTMLStyleAlignXY = function (halign, valign, container_height, txt_height) {
				var halign_str = "text-align:" + halign + ";";
				if (valign == "top") {
					return halign_str + "padding-top:0px;padding-bottom:" + (container_height - txt_height) + "px;";
				}
				else if (valign == "middle") {
					return halign_str + "padding-top:0px;padding-bottom:0px;";
				}
				else if (valign == "bottom") {
					return halign_str + "padding-top:" + (container_height - txt_height) + "px;padding-bottom:0px;";
				}
				return halign_str;
			};
		}

		nexacro.__getTextAreaHTMLStyleAlignXY = function (halign, valign, blank_height) {
			blank_height = blank_height >= 0 ? blank_height : 0;
			if (valign == "top") {
				return "text-align:" + halign + ";padding-top:0px;padding-bottom:0px;";
			}
			else if (valign == "middle") {
				return "text-align:" + halign + ";padding-top:" + (blank_height / 2) + "px;padding-bottom:0px;";
			}
			else if (valign == "bottom") {
				return "text-align:" + halign + ";padding-top:" + blank_height + "px;padding-bottom:0px;";
			}
			return "text-align:" + halign + ";";
		};

		nexacro.__getHTMLStyleVAlignMargin = function (valign, container_height, txt_height) {
			var offset = 0;
			if (valign == "middle") {
				offset = (container_height - txt_height) / 2;
			}
			else if (valign == "bottom") {
				offset = (container_height - txt_height);
			}
			return "margin-top:" + offset + "px;";
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__getHTMLStyleCursor = function (cursor, deftype) {
				var cur_type = (cursor && !cursor._is_empty) ? cursor._value : (deftype ? deftype : "arrow");
				if (cur_type == "no") {
					cur_type = "not-allowed";
				}
				else if (cur_type == "pointer") {
					cur_type = "hand";
				}
				else if (cur_type == "arrowwait") {
					cur_type = "progress";
				}
				else if (cur_type == "arrow") {
					cur_type = "default";
				}
				return "cursor:" + cur_type + ";";
			};
		}
		else if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9)) {
			nexacro.__getHTMLStyleCursor = function (cursor, deftype) {
				var cur_type = (cursor && !cursor._is_empty) ? cursor._value : (deftype ? deftype : "arrow");
				if (cur_type == "no") {
					cur_type = "not-allowed";
				}
				else if (cur_type == "hand") {
					cur_type = "pointer";
				}
				else if (cur_type == "text") {
					cur_type = "text";
				}
				else if (cur_type == "arrow") {
					cur_type = "default";
				}
				else if (cur_type == "arrowwait") {
					cur_type = "progress";
				}
				return "cursor:" + cur_type + ";";
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__getHTMLStyleShadow = function (shadow) {
				return "";
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) {
			nexacro.__getHTMLStyleShadow = function (shadow) {
				return "box-shadow:" + shadow._sysvalue + ";";
			};
		}
		else if (nexacro.Browser == "Gecko" && nexacro.BrowserVersion < 2) {
			nexacro.__getHTMLStyleShadow = function (shadow) {
				return "-moz-box-shadow:" + shadow._sysvalue + ";";
			};
		}
		else if (nexacro.BrowserType == "WebKit") {
			nexacro.__getHTMLStyleShadow = function (shadow) {
				return "-webkit-box-shadow:" + shadow._sysvalue + ";";
			};
		}
		else {
			nexacro.__getHTMLStyleShadow = function (shadow) {
				return "box-shadow:" + shadow._sysvalue + ";";
			};
		}

		nexacro.__getHTMLStyleLineSpace = function (linespace) {
			return (linespace < 0) ? "" : "line-height:" + linespace;
		};

		nexacro.__getHTMLStyleLetterSpace = function (letterspace) {
			return "letter-spacing:" + letterspace + ";";
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__getHTMLAttrWordWrap = function (use_wordwrap) {
				if (use_wordwrap != "none") {
					return " wrap='hard'";
				}
				else {
					return " wrap='off'";
				}
			};
		}
		else {
			nexacro.__getHTMLAttrWordWrap = function (use_wordwrap) {
				return "";
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 8) {
			nexacro.__getHTMLStyleWordWrap = function (use_wordwrap) {
				if (use_wordwrap == "char" || use_wordwrap == "english") {
					return "white-space:pre;word-wrap:break-word;";
				}
				else {
					return "white-space:pre;word-wrap:normal;";
				}
			};
		}
		else {
			nexacro.__getHTMLStyleWordWrap = function (use_wordwrap) {
				if (use_wordwrap == "char") {
					return "white-space:pre;word-wrap:break-word;";
				}
				else if (use_wordwrap == "english") {
					return "white-space:pre-wrap;word-wrap:break-word;";
				}
				else {
					return "white-space:pre;word-wrap:normal;";
				}
			};
		}

		nexacro.__getHTMLAttrFocusBorder = function (shadow) {
			return "";
		};

		nexacro.__getHTMLAttrTabIndentSize = function (nTabSize) {
			return "";
		};

		nexacro.__getHTMLStyleDecorateText = function (text) {
			"text-decoration:" + nexacro._encodeXML(nexacro._decorateString(text)) + ";";
		};

		nexacro.__getHTMLStylemeMode = function (mode) {
			var imemodestr = null;
			if (mode == "alpha" || mode == "alpha,full") {
				imemodestr = "inactive";
			}
			else if (mode == "hangul" || mode == "hangul,full") {
				imemodestr = "active";
			}
			else if (mode == "katakana" || mode == "katakana,full") {
				imemodestr = "auto";
			}
			else if (mode == "hiragana") {
				imemodestr = "active";
			}
			else if (mode == "direct") {
				imemodestr = "inactive";
			}
			else if (mode == "disabled") {
				imemodestr = "disabled";
			}
			else {
				return "";
			}
			return "ime-mode:" + imemodestr + ";";
		};

		nexacro.__getHTMLAttrSelectBackgroundColor = function (color) {
			return "";
		};
		nexacro.__getHTMLAttrSelectColor = function (color) {
			return "";
		};
		nexacro.__getHTMLAttrCaretColor = function (color) {
			return "";
		};
		nexacro.__getHTMLAttrCompositeColor = function (color) {
			return "";
		};


		nexacro._firstLoadFocus = true;
		nexacro.__isActiveWindow = function (_doc) {
			if (_doc.hasFocus) {
				return _doc.hasFocus();
			}
		};

		nexacro._checkWindowActive = function (_window) {
			var is_active;
			var _doc = _window._doc;
			if (_doc) {
				if (_doc.hasFocus) {
					is_active = _doc.hasFocus();
					_window._is_active_window = is_active;
				}

				if (is_active === undefined) {
					is_active = _window._is_active_window;
				}
			}

			return is_active;
		};


		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion <= 8) {
				nexacro.__setDOMNodeFocus = function (node) {
					var is_active_window;
					var owner_doc = (node.ownerDocument || node.document);
					if (owner_doc.hasFocus) {
						is_active_window = owner_doc.hasFocus();
					}
					if (is_active_window === undefined) {
						if (!node || !node._linked_element || !node._linked_element._parent_elem) {
							return;
						}

						var comp = node._linked_element._parent_elem.linkedcontrol;
						var _window = comp ? comp._getWindow() : null;
						if (_window) {
							is_active_window = _window._is_active_window;
						}
					}

					if (is_active_window) {
						owner_doc.focus();

						if (node.unselectable == "on") {
							node.unselectable == "off";
							try {
								node.setActive();
							}
							catch (e) {
							}
							node.unselectable == "on";
						}
						else {
							node.setActive();
						}
					}
				};
				nexacro.__setInputDOMNodeFocus = function (node) {
					var is_active_window;
					var owner_doc = (node.ownerDocument || node.document);
					if (owner_doc.hasFocus) {
						is_active_window = owner_doc.hasFocus();
					}
					if (is_active_window === undefined) {
						if (!node || !node._linked_element || !node._linked_element._parent_elem) {
							return;
						}

						var comp = node._linked_element._parent_elem.linkedcontrol;
						var _window = comp ? comp._getWindow() : null;
						if (_window) {
							is_active_window = _window._is_active_window;
						}
					}

					if (is_active_window) {
						owner_doc.focus();

						if (node.style.visibility == "hidden" || node.style.display == "none") {
							node.setActive();
						}
						else if (node.offsetWidth == 0 || node.offsetHeight == 0) {
							node.setActive();
						}
						else if (node.readOnly || node.disabled) {
							node.setActive();
						}
						else {
							node.setActive();
							node.blur();

							try {
								node.focus();
							}
							catch (e) {
								;
							}
						}
					}
				};
			}
			else {
				nexacro.__setDOMNodeFocus = function (node, selffocus) {
					var is_active_window;
					var owner_doc = (node.ownerDocument || node.document);

					if (!node || !node._linked_element || !node._linked_element._parent_elem) {
						return;
					}

					var comp = node._linked_element._parent_elem.linkedcontrol;
					var _window = comp ? comp._getWindow() : null;
					if (owner_doc.hasFocus) {
						is_active_window = _window ? (_window._is_active_window || owner_doc.hasFocus()) : owner_doc.hasFocus();
					}
					if (is_active_window === undefined && _window) {
						is_active_window = _window._is_active_window;
					}

					if (is_active_window) {
						if (selffocus) {
							owner_doc.focus();
							node.focus();
						}
						else {
							var owner_bodynode = owner_doc.body;
							if (owner_bodynode) {
								owner_bodynode.focus();
							}
						}
					}
				};
				nexacro.__setInputDOMNodeFocus = function (node) {
					var is_active_window;
					var owner_doc = (node.ownerDocument || node.document);
					if (owner_doc.hasFocus) {
						is_active_window = owner_doc.hasFocus();
					}
					if (is_active_window === undefined) {
						if (!node || !node._linked_element || !node._linked_element._parent_elem) {
							return;
						}

						var comp = node._linked_element._parent_elem.linkedcontrol;
						var _window = comp ? comp._getWindow() : null;
						if (_window) {
							is_active_window = _window._is_active_window;
						}
					}

					if (is_active_window) {
						owner_doc.focus();
						node.focus();
					}

					if (nexacro.BrowserVersion >= 10) {
						if (!is_active_window && nexacro._firstLoadFocus) {
							owner_doc.focus();
							node.focus();
							nexacro._firstLoadFocus = false;
						}
					}
				};
			}
		}
		else {
			nexacro.__setDOMNodeFocus = function (node, selffocus) {
				var is_active_window;

				var owner_doc = (node.ownerDocument || node.document);

				if (!node || !node._linked_element || !node._linked_element._parent_elem) {
					return;
				}

				var comp = node._linked_element._parent_elem.linkedcontrol;
				var _window = comp ? comp._getWindow() : null;
				if (_window) {
					if (owner_doc.hasFocus) {
						is_active_window = _window._is_active_window || owner_doc.hasFocus();
					}
					else {
						is_active_window = _window._is_active_window;
					}
				}

				if (is_active_window || (nexacro.OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid())) {
					if (selffocus) {
						node.focus();
					}
					else {
						var owner_body = owner_doc.body;
						if (owner_body) {
							owner_body.focus();
						}
					}
				}
			};
			nexacro.__setInputDOMNodeFocus = function (node) {
				var is_active_window;

				var owner_doc = (node.ownerDocument || node.document);

				if (!node || !node._linked_element || !node._linked_element._parent_elem) {
					return;
				}

				var comp = node._linked_element._parent_elem.linkedcontrol;
				var _window = comp ? comp._getWindow() : null;
				if (_window) {
					if (owner_doc.hasFocus) {
						is_active_window = _window._is_active_window || owner_doc.hasFocus();
					}
					else {
						is_active_window = _window._is_active_window;
					}
				}

				if (is_active_window || (nexacro.OS == "iOS" && nexacro._isHybrid && nexacro._isHybrid())) {
					node.focus();
				}
			};
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion <= 8) {
				nexacro.__setDOMNodeBlur = function (node) {
					try {
						node.blur();
					}
					catch (e) {
					}
				};
			}
			else {
				nexacro.__setDOMNodeBlur = function (node) {
					node.blur();
				};
			}
		}
		else {
			nexacro.__setDOMNodeBlur = function (node) {
				node.blur();
			};
		}


		nexacro._setDOMNodeRemoveCaret = function () {
			document.selection.empty();
		};


		nexacro._degreesToRadians = function (degrees) {
			return degrees * (Math.PI / 180);
		};

		nexacro._radiansToDegrees = function (radians) {
			return radians * (180 / Math.PI);
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._createMatrixIdentity = function () {
				return [[1, 0, 0], [0, 1, 0], [0, 0, 1]
				];
			};

			nexacro._matrixMultiply = function (m1, m2) {
				var result = nexacro._createMatrixIdentity();

				for (var x = 0; x < 3; x++) {
					for (var y = 0; y < 3; y++) {
						var sum = 0;

						for (var z = 0; z < 3; z++) {
							sum += m1[x][z] * m2[z][y];
						}
						result[x][y] = sum;
					}
				}
				return result;
			};

			nexacro._setMatrix = function (canvas, m, updateLineScale) {
				if (!nexacro._matrixIsFinite(m)) {
					return;
				}
				canvas._matrix = m;

				if (updateLineScale) {
					var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
					canvas._line_scale = Math.sqrt(Math.abs(det));
				}
			};

			nexacro._matrixIsFinite = function (m) {
				for (var i = 0; i < 3; i++) {
					for (var j = 0; j < 2; j++) {
						if (!isFinite(m[i][j]) || isNaN(m[i][j])) {
							return false;
						}
					}
				}
				return true;
			};

			nexacro._isPointInPath = function (path, pt) {
				for (var c = false, i = -1, l = path.length, j = l - 1; ++i < l; j = i) {
					if (((path[i].y <= pt.y && pt.y < path[j].y) || (path[j].y <= pt.y && pt.y < path[i].y))
						 && (pt.x < (path[j].x - path[i].x) * (pt.y - path[i].y) / (path[j].y - path[i].y) + path[i].x)
						 && (c = !c)) {
						c = true;
					}
				}
				return c;
			};

			nexacro.CanvasGradient = function (type) {
				this.type_ = type;
				this.x0 = 0;
				this.y0 = 0;
				this.r0 = 0;
				this.x1 = 0;
				this.y1 = 0;
				this.r1 = 0;
				this.colors = [];
			};

			var _pCanvasGradient = nexacro.CanvasGradient.prototype;

			_pCanvasGradient.addColorStop = function (aOffset, aColor) {
				var color = nexacro._getWebColorFromXreColor(aColor);
				var alpha = nexacro._getXreColorAlpha(aColor) / 255;
				this.colors.push({
					offset : aOffset, 
					color : color, 
					alpha : alpha
				});
			};

			delete _pCanvasGradient;

			nexacro.__setCanvasFillStyle = function (canvas, clrrgb, clra) {
			};
			nexacro.__setCanvasStrokeStyle = function (canvas, strokecolor) {
				canvas._stroke_color = nexacro._getWebColorFromXreColor(strokecolor.value);
				canvas._stroke_alpha = nexacro._getXreColorAlpha(strokecolor.value) / 255;
			};
			nexacro.__setCanvasLineCap = function (canvas, eCapType) {
			};
			nexacro.__setCanvasLineJoin = function (canvas, eJoinType) {
			};
			nexacro.__setCanvasLineWidth = function (canvas, nSize) {
			};
			nexacro.__setCanvasMiterLimit = function (canvas, nLimit) {
			};
			nexacro.__setCanvasShadowColor = function (canvas, clrRGA, clrA) {
			};
			nexacro.__setCanvasShadowOffsetX = function (canvas, sX) {
			};
			nexacro.__setCanvasShadowOffsetY = function (canvas, sY) {
			};
			nexacro.__setCanvasShadowBlur = function (canvas, nFact) {
			};
			nexacro.__setCanvasFont = function (canvas, font, sysvalue) {
			};

			nexacro.__setCanvasFillColor = function (canvas, fillstyle) {
				canvas._fill_type = 1;
				canvas._fill_color = nexacro._getWebColorFromXreColor(fillstyle.value);
				canvas._fill_alpha = nexacro._getXreColorAlpha(fillstyle.value) / 255;
			};

			nexacro.__setCanvasFillGradation = function (canvas, fillstyle) {
				canvas._fill_type = 2;
				canvas._fill_gradation = fillstyle;
			};

			nexacro.__setCanvasTextAlign = function (canvas, eAlignValue) {
				if (eAlignValue == "center") {
					canvas._textAlign = 0;
				}
				else if (eAlignValue == "end") {
					canvas._textAlign = 1;
				}
				else if (eAlignValue == "start") {
					canvas._textAlign = 2;
				}
				else if (eAlignValue == "right") {
					canvas._textAlign = 3;
				}
				else if (eAlignValue == "left") {
					canvas._textAlign = 4;
				}
			};
			nexacro.__setCanvasTextBaseline = function (canvas, eBaseValue) {
				if (eBaseValue == "alphabetic") {
					canvas._textBaseline = 0;
				}
				else if (eBaseValue == "hanging") {
					canvas._textBaseline = 1;
				}
				else if (eBaseValue == "top") {
					canvas._textBaseline = 2;
				}
				else if (eBaseValue == "bottom") {
					canvas._textBaseline = 3;
				}
				else if (eBaseValue == "middle") {
					canvas._textBaseline = 4;
				}
			};

			nexacro.__drawCanvasBeginPath = function (canvas) {
				canvas._path_str = "";
			};
			nexacro.__drawCanvasClosePath = function (canvas) {
				canvas._path_str += 'x ';
			};

			nexacro.__drawCanvasStrokeRect = function (canvas, x, y, dx, dy) {
				nexacro.__rectCanvas(canvas, x, y, dx, dy, true);
				nexacro.__strokeCanvas(canvas);
				nexacro.__drawCanvasBeginPath(canvas);
			};
			nexacro.__drawCanvasFillRect = function (canvas, x, y, dx, dy) {
				nexacro.__drawCanvasmoveTo(canvas, x, y);
				nexacro.__drawCanvaslineTo(canvas, x + dx, y);
				nexacro.__drawCanvaslineTo(canvas, x + dx, y + dy);
				nexacro.__drawCanvaslineTo(canvas, x, y + dy);
				nexacro.__drawCanvasClosePath(canvas);
				nexacro.__fillCanvas(canvas);
			};
			nexacro.__drawCanvasRect = nexacro.__drawCanvasStrokeRect;
			nexacro.__drawCanvasClearRect = function (canvas) {
			};

			nexacro.__drawCanvaslineTo = function (canvas, x, y) {
				var elem = canvas._linked_element;
				var pt = elem._getCoordSize(x, y);
				canvas._pathArray.push({
					x : canvas._curx, 
					y : canvas._cury
				});
				canvas._pathArray.push({
					x : pt.x, 
					y : pt.y
				});
				var sub = 'l ' + pt.x + ',' + pt.y + ' ';
				canvas._path_str += sub;
				canvas._curx = pt.x;
				canvas._cury = pt.y;
			};
			nexacro.__drawCanvasmoveTo = function (canvas, x, y) {
				var elem = canvas._linked_element;
				var pt = elem._getCoordSize(x, y);
				var sub = 'm ' + pt.x + ',' + pt.y + ' ';
				canvas._path_str += sub;
				canvas._curx = pt.x;
				canvas._cury = pt.y;
			};
			nexacro.__drawCanvasQuadraticCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y) {
				if (!canvas._curx) {
					nexacro.__drawCanvasmoveTo(canvas, cp1x, cp1y);
				}
				var elem = canvas._linked_element;
				var cp = elem._getCoordSize(cp1x, cp1y);
				var p = elem._getCoordSize(cp2x, cp2y);

				var cp1 = {
					x : Math.round(canvas._curx + 2.0 / 3.0 * (cp.x - canvas._curx)), 
					y : Math.round(canvas._cury + 2.0 / 3.0 * (cp.y - canvas._cury))
				};
				var cp2 = {
					x : Math.round(cp1.x + (p.x - canvas._curx) / 3.0), 
					y : Math.round(cp1.y + (p.y - canvas._cury) / 3.0)
				};

				canvas._pathArray.push({
					x : cp1.x, 
					y : cp1.y
				});
				canvas._pathArray.push({
					x : cp2.x, 
					y : cp2.y
				});
				canvas._pathArray.push({
					x : p.x, 
					y : p.y
				});

				var sub = 'c ' + cp1.x + ',' + cp1.y + ',' + cp2.x + ',' + cp2.y + ',' + p.x + ',' + p.y + ' ';

				canvas._path_str += sub;
				canvas._curx = p.x;
				canvas._cury = p.y;
			};
			nexacro.__drawCanvasBezierCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y, x, y) {
				if (!canvas._curx) {
					nexacro.__drawCanvasmoveTo(canvas, cp1x, cp1y);
				}
				var elem = canvas._linked_element;
				var p = elem._getCoordSize(cp1x, cp1y);
				canvas._pathArray.push({
					x : p.x, 
					y : p.y
				});
				var cp1 = elem._getCoordSize(cp2x, cp2y);
				canvas._pathArray.push({
					x : cp1.x, 
					y : cp1.y
				});
				var cp2 = elem._getCoordSize(x, y);
				canvas._pathArray.push({
					x : cp2.x, 
					y : cp2.y
				});
				var sub = 'c ' + p.x + ',' + p.y + ',' + cp1.x + ',' + cp1.y + ',' + cp2.x + ',' + cp2.y + ' ';

				canvas._path_str += sub;
				canvas._curx = cp2.x;
				canvas._cury = cp2.y;
			};
			nexacro.__darwCanvasArc = function (canvas, x, y, r, sA, eA, eCw) {
				var _canvas = canvas;
				var scale = canvas._scale;
				var hscale = canvas._half_scale;
				var _r = r * scale;
				var arcType = eCw ? 'at' : 'wa';
				var xStart = x + Math.cos(sA) * _r - hscale;
				var yStart = y + Math.sin(sA) * _r - hscale;
				var xEnd = x + Math.cos(eA) * _r - hscale;
				var yEnd = y + Math.sin(eA) * _r - hscale;
				var elem = canvas._linked_element;
				var p = elem._getCoordSize(x, y);
				var pStart = elem._getCoordSize(xStart, yStart);
				var pEnd = elem._getCoordSize(xEnd, yEnd);

				if (parseInt(xStart) == parseInt(xStart) && eCw) {
					pStart.x -= 1;
					pStart.y -= 1;
				}
				else {
					pStart.x += 1;
					pStart.y += 1;
				}
				var sub = arcType + ' ' + (p.x - _r) + ',' + (p.y - _r) + ' ' + (p.x + _r) + ',' + (p.y + _r) + ' ' + 
					parseInt(pStart.x) + ',' + parseInt(pStart.y) + ' ' + parseInt(pEnd.x) + ',' + parseInt(pEnd.y) + ' ';

				canvas._curx = pEnd.x;
				canvas._cury = pEnd.y;
				canvas._path_str += sub;
			};
			nexacro.__drawCanvasArcTo = function (canvas, x, y, x2, y2, r) {
				if (canvas._curx) {
					var p0 = {
						x : canvas._curx / 10, 
						y : canvas._cury / 10
					};
					var p1 = {
						x : x, 
						y : y
					};
					var p2 = {
						x : x2, 
						y : y2
					};

					var radius = r;

					if ((p1.x == p0.x && p1.y == p0.y) || (p1.x == p2.x && p1.y == p2.y) || radius == 0) {
						nexacro.__drawCanvaslineTo(canvas, p1.x, p1.y);
						return true;
					}

					var p1p0 = {
						x : (p0.x - p1.x), 
						y : (p0.y - p1.y)
					};
					var p1p2 = {
						x : (p2.x - p1.x), 
						y : (p2.y - p1.y)
					};
					var p1p0_length = Math.sqrt(p1p0.x * p1p0.x + p1p0.y * p1p0.y);
					var p1p2_length = Math.sqrt(p1p2.x * p1p2.x + p1p2.y * p1p2.y);

					var cos_phi = (p1p0.x * p1p2.x + p1p0.y * p1p2.y) / (p1p0_length * p1p2_length);
					if (-1 == cos_phi) {
						element.lineTo(p1.x, p1.y);
						return true;
					}

					if (1 == cos_phi) {
						var max_length = 65535;
						var factor_max = max_length / p1p0_length;
						var ep = {
							x : (p0.x + factor_max * p1p0.x), 
							y : (p0.y + factor_max * p1p0.y)
						};
						nexacro.__drawCanvaslineTo(canvas, Math.round(ep.x), Math.round(ep.y));
						return true;
					}

					var tangent = radius / Math.tan(Math.acos(cos_phi) / 2);
					var factor_p1p0 = tangent / p1p0_length;
					var t_p1p0 = {
						x : (p1.x + factor_p1p0 * p1p0.x), 
						y : (p1.y + factor_p1p0 * p1p0.y)
					};

					var orth_p1p0 = {
						x : p1p0.y, 
						y : -p1p0.x
					};
					var orth_p1p0_length = Math.sqrt(orth_p1p0.x * orth_p1p0.x + orth_p1p0.y * orth_p1p0.y);
					var factor_ra = radius / orth_p1p0_length;

					var cos_alpha = (orth_p1p0.x * p1p2.x + orth_p1p0.y * p1p2.y) / (orth_p1p0_length * p1p2_length);
					if (cos_alpha < 0) {
						orth_p1p0.x = -orth_p1p0.x;
						orth_p1p0.y = -orth_p1p0.y;
					}

					var p = {
						x : (t_p1p0.x + factor_ra * orth_p1p0.x), 
						y : (t_p1p0.y + factor_ra * orth_p1p0.y)
					};

					orth_p1p0.x = -orth_p1p0.x;
					orth_p1p0.y = -orth_p1p0.y;

					var sa = Math.acos(orth_p1p0.x / orth_p1p0_length);
					if (orth_p1p0.y < 0) {
						sa = 2 * Math.PI - sa;
					}

					var anticlockwise = false;

					var factor_p1p2 = tangent / p1p2_length;
					var t_p1p2 = {
						x : p1.x + factor_p1p2 * p1p2.x, 
						y : p1.y + factor_p1p2 * p1p2.y
					};
					var orth_p1p2 = {
						x : t_p1p2.x - p.x, 
						y : t_p1p2.y - p.y
					};
					var orth_p1p2_length = Math.sqrt(orth_p1p2.x * orth_p1p2.x + orth_p1p2.y * orth_p1p2.y);
					var ea = Math.acos(orth_p1p2.x / orth_p1p2_length);

					if (orth_p1p2.y < 0) {
						ea = 2 * Math.PI - ea;
					}
					if ((sa > ea) && ((sa - ea) < Math.PI)) {
						anticlockwise = true;
					}
					if ((sa < ea) && ((ea - sa) > Math.PI)) {
						anticlockwise = true;
					}

					nexacro.__drawCanvaslineTo(canvas, Math.round(t_p1p0.x), Math.round(t_p1p0.y));
					nexacro.__darwCanvasArc(canvas, Math.round(p.x), Math.round(p.y), radius, sa, ea, anticlockwise);
					return true;
				}
				else {
					nexacro.__drawCanvasmoveTo(canvas, x, y);
				}
			};

			nexacro.__isPointInCanvasPath = function (canvas, x, y) {
				if (canvas) {
					var elem = canvas._linked_element;
					var p = elem._getCoordSize(x, y);
					return nexacro._isPointInPath(canvas._pathArray, p);
				}
			};
			nexacro.__clipCanvas = function (canvas) {
			};
			nexacro.__setCanvasTransform = function (canvas, a, b, c, d, e, f) {
				var m = [[a, b, 0], [c, d, 0], [e, f, 1]
				];

				nexacro._setMatrix(canvas, m, true);
			};
			nexacro.__measureCanvas = function (canvas, text) {
			};

			nexacro.__createCanvasLinearGradient = function (canvas, aX0, aY0, aX1, aY1) {
				var gradient = new nexacro.CanvasGradient('gradient');
				gradient.x0 = aX0;
				gradient.y0 = aY0;
				gradient.x1 = aX1;
				gradient.y1 = aY1;
				return gradient;
			};
			nexacro.__createCanvasRadialGradient = function (canvas, x0, y0, x1, y1, r0, r1) {
				var gradient = new nexacro.CanvasGradient('gradientradial');
				gradient.x0 = x0;
				gradient.y0 = y0;
				gradient.r0 = r0;
				gradient.x1 = x1;
				gradient.y1 = y1;
				gradient.r1 = r1;
				return gradient;
			};

			nexacro.__rectCanvas = function (canvas, x, y, w, h) {
				var element = canvas._linked_element;
				if (canvas._path_str) {
					var gap = element.lineOffset;
					var gap2 = (h > 0) ? gap : -gap;
					element.moveTo(x - gap, y - gap2);
					element.lineTo(x + w + gap, y - gap2);
					element.lineTo(x + w + gap, y + h + gap2);
					element.lineTo(x - gap, y + h + gap2);
					element.closePath();
					element.moveTo(x + gap, y + gap2);
					element.lineTo(x + w - gap, y + gap2);
					element.lineTo(x + w - gap, y + h - gap2);
					element.lineTo(x + gap, y + h - gap2);
					element.closePath();
				}
				else {
					element.moveTo(x, y);
					element.lineTo(x + w, y);
					element.lineTo(x + w, y + h);
					element.lineTo(x, y + h);
					element.closePath();
				}
			};
			nexacro.__fillCanvas = function (canvas) {
				var elem = canvas._linked_element;

				if (canvas && canvas._path_str) {
					var vml_str = "<v:shape filled='t' stroked='f' style='position:absolute;width:10px;height:10px;' " + 
						"coordorigin='0 0' coordsize='" + canvas._scale * 10 + ' ' + canvas._scale * 10 + "' ";
					if (canvas._fill_type == 2) {
						var gradation = canvas._fill_gradation;
						var angle = Math.atan2(gradation._end_x - gradation._start_x, gradation._end_y - gradation._start_y) * 180 / Math.PI;
						var start_color = nexacro._getWebColorFromXreColor(gradation.start_color);
						var end_color = nexacro._getWebColorFromXreColor(gradation.end_color);

						vml_str += "fillcolor='red' path='" + canvas._path_str + "'>" + 
							"<v:fill type ='gradient' color= '" + end_color + "' color2 = '" + start_color + "' colors = ' 0 " + end_color + "; 1 " + start_color + "' " + 
							"opacity = '1' " + "angle = '" + angle + "'/>";
					}
					else {
						vml_str += "fillcolor='" + canvas._fill_color + "' ";
						if (canvas._fill_alpha != 1) {
							vml_str += "opacity='" + canvas._fill_alpha + "' ";
						}
						vml_str += "path='" + canvas._path_str + "' />";
					}

					canvas._vml_str += vml_str;
					canvas._draw_node.innerHTML = canvas._vml_str;
				}
			};
			nexacro.__strokeCanvas = function (canvas) {
				var elem = canvas._linked_element;
				if (canvas._path_str) {
					var lineWidth = canvas._line_scale * elem.lineWidth;
					var vml_str = "";
					vml_str += "<v:shape filled='f' stroked='t' style='position:absolute;width:10px;height:10px;' ";
					vml_str += "coordorigin='0 0' coordsize='" + canvas._scale * 10 + ' ' + canvas._scale * 10 + "' ";
					vml_str += "strokeweight='" + lineWidth + "px" + "' ";
					vml_str += "strokecolor='" + canvas._stroke_color + "' ";
					vml_str += "path='" + canvas._path_str + "' >";

					vml_str += "<v:stroke ";
					if (canvas._stroke_alpha && canvas._stroke_alpha != 1) {
						vml_str += "opacity='" + canvas._stroke_alpha + "' ";
					}

					vml_str += "joinstyle='" + elem.lineJoin + "' ";
					vml_str += "miterlimit='" + elem.miterLimit + "' ";
					vml_str += "endcap='" + elem._getLineCapStr() + "'  />";
					vml_str += "</v:shape>";
					canvas._vml_str += vml_str;
					canvas._draw_node.innerHTML = canvas._vml_str;
				}
			};
			nexacro.__fillCanvasRect = function (canvas, x, y, dx, dy) {
				var elem = canvas._linked_element;

				elem.beginPath();
				elem.moveTo(x, y);
				elem.lineTo(x + dx, y);
				elem.lineTo(x + dx, y + dy);
				elem.lineTo(x, y + dy);
				elem.closePath();
				elem.fill();
			};
			nexacro.__scaleCanvas = function (canvas, dx, dy) {
				canvas._scale *= dx;
				canvas._half_scale *= dy;
				var m1 = [[dx, 0, 0], [0, dy, 0], [0, 0, 1]
				];

				nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), true);
			};
			nexacro.__rotateCanvas = function (canvas, angle) {
				var c = Math.cos(angle);
				var s = Math.sin(angle);
				var m1 = [[c, s, 0], [-s, c, 0], [0, 0, 1]
				];

				nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), false);
			};
			nexacro.__translateCanvas = function (canvas, dX, dY) {
				var m1 = [[1, 0, 0], [0, 1, 0], [dX, dY, 1]
				];

				nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), false);
			};
			nexacro.__transformCanvas = function (canvas, a, b, c, d, e, f) {
				var m1 = [[a, b, 0], [c, d, 0], [e, f, 1]
				];

				nexacro._setMatrix(canvas, nexacro._matrixMultiply(m1, canvas._matrix), true);
			};


			nexacro.__drawCanvasFillText = function (canvas, text, x, y, maxwidth) {
				var element = canvas._linked_element;
				if (typeof text == "string") {
					text = nexacro._encodeXml(text);
				}
				var textAlign = canvas._textAlign;
				var font = element.font;
				var color = canvas._fill_color;
				var letterspace = element.letterspace;
				var textsize = nexacro._getTextSize(letterspace, text, font);
				var textwidth = textsize[0];
				var textheight = textsize[1];
				var conY = nexacro._getTextBaseline(canvas._textBaseline, y, textheight);
				var carlen = (textwidth / text.length);
				if (nexacro.BrowserVersion == 8) {
					carlen *= 1.5;
				}
				var x1, y1 = conY, x2, y2 = conY + 0.125;
				var vtextAlign = "left";
				if (textAlign == 2 || textAlign == 4 || textAlign === undefined) {
					x1 = x;
					x2 = x1 + textwidth;
				}
				else if (textAlign == 1 || textAlign == 3) {
					x1 = x - textwidth - carlen;
					x2 = x;
					vtextAlign = "right";
				}
				else {
					x1 = (x - textwidth / 2) - carlen;
					x2 = (x + textwidth / 2);
				}

				var bpt = element._getCoordPos(x1, y1);
				var ept = element._getCoordPos(x2, y2);
				var vml_str = "<v:line from='" + bpt.x + " " + bpt.y + "' to='" + ept.x + " " + ept.y + "' filled='t' stroked='f' "
					 + "fillcolor='" + color + "'><v:path textpathok='t'/>"
					 + "<v:textpath on='t' fitpath='True' style=\"v-text-align: " + vtextAlign + "; font:" + font._sysvalue + ";\" "
					 + "string='" + text + "'/></v:line>";
				canvas._vml_str += vml_str;
				canvas._draw_node.innerHTML = canvas._vml_str;
			};
			nexacro.__drawCanvasStrokeText = function (canvas, text, x, y) {
				var element = canvas._linked_element;
				if (typeof text == "string") {
					text = nexacro._encodeXml(text);
				}

				var vml_str = "";
				var pt = element._getCoordPos(x, y);
				if (canvas) {
					var strokecolor = canvas._stroke_color;

					var font = element._font;

					vml_str += "<v:line from='" + x + " " + y + "' to='" + (pt.x + 100) + " " + (pt.y + 0.125) + "' filled='t' stroked='f' ";
					vml_str += "fillcolor='" + strokecolor + "'><v:path textpathok='t'/>";
					vml_str += "<v:textpath on='t' style=\"v-text-align:left; font:" + font + ";\" ";
					vml_str += "string='" + text + "'/></v:line>";
				}
				canvas._vml_str += vml_str;
				canvas._draw_node.innerHTML = canvas._vml_str;
			};

			nexacro.__drawCanvasImage = function (canvas, image, x, y, imgWidth, imgHeight) {
				var dx, dy, dw, dh, sx, sy, sw, sh;
				var elem = canvas._linked_element;

				var w = image.width;
				var h = image.height;

				if (arguments.length == 4) {
					dx = x;
					dy = y;
					sx = sy = 0;
					sw = dw = w;
					sh = dh = h;
				}
				else if (arguments.length == 6) {
					dx = x;
					dy = y;
					dw = imgWidth;
					dh = imgHeight;
					sx = sy = 0;
					sw = w;
					sh = h;
				}
				else {
					throw Error('Invalid number of arguments');
				}

				var d = elem._getCoordSize(dx, dy);

				var w2 = sw / 2;
				var h2 = sh / 2;

				var vmlStr = [];

				vmlStr.push(' <v:group', ' coordsize="', 100, ',', 100, '"', ' coordorigin="0,0"', ' style="width:', 10, 'px;height:', 10, 'px;position:absolute;');


				if (canvas._matrix[0][0] != 1 || canvas._matrix[0][1]) {
					var filter = [];

					filter.push('M11=', canvas._matrix[0][0], ',', 'M12=', canvas._matrix[1][0], ',', 'M21=', canvas._matrix[0][1], ',', 'M22=', canvas._matrix[1][1], ',', 'Dx=', Math.round(d.x / 10), ',', 'Dy=', Math.round(d.y / 10), '');

					var max = d;
					var c2 = elem._getCoordSize(dx + dw, dy);
					var c3 = elem._getCoordSize(dx, dy + dh);
					var c4 = elem._getCoordSize(dx + dw, dy + dh);

					max.x = Math.max(max.x, c2.x, c3.x, c4.x);
					max.y = Math.max(max.y, c2.y, c3.y, c4.y);

					vmlStr.push('padding:0 ', Math.round(max.x / 10), 'px ', Math.round(max.y / 10), 'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(', filter.join(''), ", sizingmethod='clip');");
				}
				else {
					vmlStr.push('top:', Math.round(d.y / 10), 'px;left:', Math.round(d.x / 10), 'px;');
				}

				vmlStr.push(' ">', '<v:image src="', image.src, '"', ' style="width:', 10 * dw, 'px;', ' height:', 10 * dh, 'px;"', ' cropleft="', sx / w, '"', ' croptop="', sy / h, '"', ' cropright="', (w - sx - sw) / w, '"', ' cropbottom="', (h - sy - sh) / h, '"', ' />', '</v:group>');

				canvas.insertAdjacentHTML('BeforeEnd', vmlStr.join(''));
				canvas._vml_str += vmlStr;
			};
			nexacro.__setCanvasGlobalAlpha = function (canvas, f) {
			};
			nexacro.__setCanvasGlobalCompositeOperation = function (canvas, eOperation) {
			};
			nexacro.__toDataURLCanvas = function (_handle) {
			};
			nexacro.__restoreCanvas = function (canvas) {
				var element = canvas._linked_element;
				var cur_status = element._status_stack.pop();
				if (cur_status) {
					element.setElementStrokeStyle(nexacro._getCachedStyleObj("color", cur_status.strokeStyle));
					element.setElementFillStyle(nexacro._getCachedStyleObj("color", cur_status.fillStyle));
					element.setElementGlobalAlpha(cur_status.globalAlpha);
					element.setElementLineWidth(cur_status.lineWidth);
					element.setElementLineCap(cur_status.lineCap);
					element.setElementLineJoin(cur_status.lineJoin);
					element.setElementMiterLimit(cur_status.miterLimit);
					element.setElementShadowOffsetX(cur_status.shadowOffsetX);
					element.setElementShadowOffsetY(cur_status.shadowOffsetY);
					element.setElementShadowBlur(cur_status.shadowBlur);
					element.setElementShadowColor(nexacro._getCachedStyleObj("color", cur_status.shadowColor));
					element.setElementGlobalCompositeOperation(cur_status.globalCompositeOperation);
					element.setElementFont(cur_status.font);
					element.setElementTextAlign(cur_status.textAlign);
					element.setElementTextBaseline(cur_status.textBaseline);
					element.setElementStrokeStyle(cur_status.strokeColor);
				}

				canvas._matrix = element._matrix_stack.pop();
			};
			nexacro.__saveCanvas = function (canvas) {
				var elem = canvas._linked_element;
				var cur_status = {
					"strokeStyle" : elem.strokeStyle, 
					"fillStyle" : elem.fillStyle, 
					"globalAlpha" : elem.globalAlpha, 
					"lineWidth" : elem.lineWidth, 
					"lineCap" : elem.lineCap, 
					"lineJoin" : elem.lineJoin, 
					"miterLimit" : elem.miterLimit, 
					"shadowOffsetX" : elem.shadowOffsetX, 
					"shadowOffsetY" : elem.shadowOffsetY, 
					"shadowBlur" : elem.shadowBlur, 
					"shadowColor" : elem.shadowColor, 
					"globalCompositeOperation" : elem.globalCompositeOperation, 
					"font" : elem.font, 
					"textAlign" : elem.textAlign, 
					"textBaseline" : elem.textBaseline, 
					"strokeColor" : elem.strokeColor, 
					"lineScale" : canvas._line_scale
				};
				elem._status_stack.push(cur_status);
				elem._matrix_stack.push(canvas._matrix);
				canvas._matrix = nexacro._matrixMultiply(nexacro._createMatrixIdentity(), canvas._matrix);
			};
		}
		else {
			nexacro.__setCanvasFillColor = function (canvas, color) {
				canvas._draw_ctx.fillStyle = nexacro._getWebColorFromXreColor(color.value);
			};

			nexacro.__setCanvasFillGradation = function (canvas, fillstyle) {
				var gradation = nexacro.__createCanvasLinearGradient(canvas, fillstyle._start_x, fillstyle._start_y, fillstyle._end_x, fillstyle._end_y);
				gradation.addColorStop(0, fillstyle.start_color);
				gradation.addColorStop(1, fillstyle.end_color);
				canvas._draw_ctx.fillStyle = gradation;
			};
			nexacro.__setCanvasFillStyle = function (canvas, clrrgb, clra) {
				canvas._draw_ctx.fillStyle = clrrgb;
			};
			nexacro.__setCanvasStrokeStyle = function (canvas, color) {
				canvas._draw_ctx.strokeStyle = color._syscolor;
			};
			nexacro.__setCanvasLineCap = function (canvas, eCapType) {
				canvas._draw_ctx.lineCap = eCapType;
			};
			nexacro.__setCanvasLineJoin = function (canvas, eJoinType) {
				canvas._draw_ctx.lineJoin = eJoinType;
			};
			nexacro.__setCanvasLineWidth = function (canvas, nSize) {
				canvas._draw_ctx.lineWidth = nSize;
			};
			nexacro.__setCanvasMiterLimit = function (canvas, nLimit) {
				canvas._draw_ctx.miterLimit = nLimit;
			};
			nexacro.__setCanvasShadowColor = function (canvas, clrRGA, clrA) {
				canvas._draw_ctx.shadowColor = canvas._shadowColor;
			};
			nexacro.__setCanvasShadowOffsetX = function (canvas, sX) {
				canvas._draw_ctx.shadowOffsetX = sX;
			};
			nexacro.__setCanvasShadowOffsetY = function (canvas, sY) {
				canvas._draw_ctx.shadowOffsetY = sY;
			};
			nexacro.__setCanvasShadowBlur = function (canvas, nFact) {
				canvas._draw_ctx.shadowBlur = nFact;
			};
			nexacro.__setCanvasFont = function (canvas, font, sysvalue) {
				canvas._draw_ctx.font = sysvalue;
			};
			nexacro.__setCanvasTextAlign = function (canvas, eAlignValue) {
				canvas._draw_ctx.textAlign = eAlignValue;
			};
			nexacro.__setCanvasTextBaseline = function (canvas, eBaseValue) {
				canvas._draw_ctx.textBaseline = eBaseValue;
			};

			nexacro.__drawCanvasBeginPath = function (canvas) {
				canvas._draw_ctx.beginPath();
			};
			nexacro.__drawCanvasClosePath = function (canvas) {
				canvas._draw_ctx.closePath();
			};
			nexacro.__drawCanvasFillRect = function (canvas, x, y, dx, dy) {
				var ctx = canvas._draw_ctx;
				ctx.rect(x, y, dx, dy);
				ctx.fill();
				ctx.beginPath();
			};
			nexacro.__drawCanvasStrokeRect = function (canvas, x, y, dx, dy) {
				canvas._draw_ctx.strokeRect(x, y, dx, dy);
			};
			nexacro.__drawCanvasRect = function (canvas, x, y, dx, dy) {
				var ctx = canvas._draw_ctx;
				crx.rect(x, y, dx, dy);
				ctx.stroke();
				ctx.beginPath();
			};
			nexacro.__drawCanvasClearRect = function (canvas, x, y, dx, dy) {
				canvas._draw_ctx.clearRect(x, y, dx, dy);
			};

			nexacro.__drawCanvaslineTo = function (canvas, x, y) {
				canvas._draw_ctx.lineTo(x, y);
			};
			nexacro.__drawCanvasmoveTo = function (canvas, x, y) {
				canvas._draw_ctx.moveTo(x, y);
			};
			nexacro.__drawCanvasQuadraticCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y) {
				canvas._draw_ctx.quadraticCurveTo(cp1x, cp1y, cp2x, cp2y);
			};
			nexacro.__drawCanvasBezierCurveTo = function (canvas, cp1x, cp1y, cp2x, cp2y, x, y) {
				canvas._draw_ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
			};
			nexacro.__darwCanvasArc = function (canvas, x, y, r, sA, eA, eCw) {
				canvas._draw_ctx.arc(x, y, r, sA, eA, eCw);
			};
			nexacro.__drawCanvasArcTo = function (canvas, x, y, x2, y2, r) {
				canvas._draw_ctx.arcTo(x, y, x2, y2, r);
			};

			nexacro.__isPointInCanvasPath = function (canvas, x, y) {
				return canvas._draw_ctx.isPointInPath(x, y);
			};
			nexacro.__clipCanvas = function (canvas) {
				canvas._draw_ctx.clip();
			};
			nexacro.__setCanvasTransform = function (canvas, a, b, c, d, e, f) {
				canvas._draw_ctx.setTransform(a, b, c, d, e, f);
			};
			nexacro.__measureCanvas = function (canvas, text) {
				canvas._draw_ctx.measureText(text);
			};

			nexacro.__createCanvasLinearGradient = function (canvas, aX0, aY0, aX1, aY1) {
				return canvas._draw_ctx.createLinearGradient(aX0, aY0, aX1, aY1);
			};
			nexacro.__createCanvasRadialGradient = function (canvas, x0, y0, x1, y1, r0, r1) {
				return canvas._draw_ctx.createRadialGradient(x0, y0, x1, y1, r0, r1);
			};
			nexacro.__rectCanvas = function (canvas, x, y, w, h) {
				canvas._draw_ctx.rect(x, y, w, h);
			};
			nexacro.__fillCanvas = function (canvas) {
				canvas._draw_ctx.fill();
			};
			nexacro.__strokeCanvas = function (canvas) {
				canvas._draw_ctx.stroke();
			};
			nexacro.__fillCanvasRect = function (canvas, x, y, dx, dy) {
				canvas._draw_ctx.fillRect(x, y, dx, dy);
			};
			nexacro.__scaleCanvas = function (canvas, dx, dy) {
				canvas._draw_ctx.scale(dx, dy);
			};
			nexacro.__rotateCanvas = function (canvas, angle) {
				canvas._draw_ctx.rotate(angle);
			};
			nexacro.__translateCanvas = function (canvas, dX, dY) {
				canvas._draw_ctx.translate(dX, dY);
			};
			nexacro.__transformCanvas = function (canvas, a, b, c, d, e, f) {
				canvas._draw_ctx.transform(a, b, c, d, e, f);
			};
			nexacro.__drawCanvasFillText = function (canvas, text, x, y, maxWidth) {
				if (maxWidth) {
					canvas._draw_ctx.fillText(text, x, y, maxWidth);
				}
				else {
					canvas._draw_ctx.fillText(text, x, y);
				}
			};
			nexacro.__drawCanvasStrokeText = function (canvas, text, x, y, maxWidth) {
				if (maxWidth) {
					canvas._draw_ctx.strokeText(text, x, y, maxWidth);
				}
				else {
					canvas._draw_ctx.strokeText(text, x, y);
				}
			};

			nexacro.__drawCanvasImage = function (canvas, image, x, y, imgWidth, imgHeight) {
				canvas._draw_ctx.drawImage(image, x, y, imgWidth, imgHeight);
			};
			nexacro.__setCanvasGlobalAlpha = function (canvas, f) {
				canvas._draw_ctx.globalAlpha = f;
			};
			nexacro.__setCanvasGlobalCompositeOperation = function (canvas, eOperation) {
				canvas._draw_ctx.globalCompositeOperation = eOperation;
			};
			nexacro.__toDataURLCanvas = function (canvas) {
				var url = canvas._draw_node.toDataURL();
				if (url) {
					var imgObj = new nexacro.Image();
					imgObj.set_src(url);
					return imgObj;
				}
			};
			nexacro.__restoreCanvas = function (canvas) {
				canvas._draw_ctx.restore();
			};
			nexacro.__saveCanvas = function (canvas) {
				canvas._draw_ctx.save();
			};
		}




		if (nexacro.Browser == "MobileSafari") {
			nexacro.__setDOMNodeAccessibilityEnable = function (node, enable) {
				if (enable == false) {
					node.setAttribute("role", "document");
					node.setAttribute("aria-label", " ");
					node.setAttribute("aria-description", "");
				}
			};

			nexacro.__setDOMNodeAccessibilityLabel = function (node, label) {
				if (label) {
					node.setAttribute("aria-label", label);
				}
			};

			nexacro.__setDOMNodeAccessibilityLabelBy = nexacro._emptyFn;
			nexacro.__setDOMNodeAccessibilityDescription = nexacro._emptyFn;
			nexacro.__setDOMNodeAccessibilityDescriptionBy = nexacro._emptyFn;
		}
		else {
			nexacro.__setDOMNodeAccessibilityEnable = function (node, enable) {
				if (enable == false) {
					node.setAttribute("role", "document");
					node.setAttribute("aria-label", " ");
					node.setAttribute("aria-description", "");
					node.setAttribute("aria-labelledby", "accessibility_notify_0");
				}
			};

			nexacro.__setDOMNodeAccessibilityLabel = function (node, label) {
				if (label) {
					node.setAttribute("aria-label", label);
				}
				node.setAttribute("aria-labelledby", "accessibility_notify_0");
			};

			nexacro.__setDOMNodeAccessibilityLabelBy = function (node, id) {
				node.setAttribute("aria-labelledby", id);
			};

			nexacro.__setDOMNodeAccessibilityDescription = function (node, desc) {
				node.setAttribute("aria-description", desc);
			};

			nexacro.__setDOMNodeAccessibilityDescriptionBy = function (node, id) {
				node.setAttribute("aria-describedby", id);
			};
		}


		nexacro.__setDOMNodeAccessibilityDescLevel = function (node, level) {
		};

		nexacro.__setDOMNodeAccessibilityStatNormal = function (node, normal) {
		};

		nexacro.__setDOMNodeAccessibilityStatDisabled = function (node, disable) {
			node.setAttribute("aria-disabled", disable);
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__setDOMNodeAccessibilityStatHidden = function (node, hidden) {
				node.setAttribute("aria-hidden", hidden);
			};
		}
		else {
			nexacro.__setDOMNodeAccessibilityStatHidden = nexacro._emptyFn;
		}

		nexacro.__setDOMNodeAccessibilityHidden = function (node, hidden) {
			if (hidden) {
				node.setAttribute("aria-hidden", hidden);
			}
			else {
				node.removeAttribute("aria-hidden");
			}
		};

		nexacro.__setDOMNodeAccessibilityStatChecked = function (node, check) {
			node.setAttribute("aria-checked", check);
		};

		nexacro.__setDOMNodeAccessibilityStatPressed = function (node, press) {
			if (press) {
				node.setAttribute("aria-pressed", press);
			}
			else {
				node.removeAttribute("aria-pressed");
			}
		};

		nexacro.__setDOMNodeAccessibilityStatSelected = function (node, select) {
			node.setAttribute("aria-selected", select);
		};

		nexacro.__setDOMNodeAccessibilityStatExpanded = function (node, expanded) {
			node.setAttribute("aria-expanded", expanded);
		};

		nexacro.__setDOMNodeAccessibilityStatAutoComplete = function (node, autocomplete) {
			node.setAttribute("aria-autocomplete", autocomplete);
		};

		nexacro.__setDOMNodeAccessibilityStatHasPopup = function (node, haspopup) {
			node.setAttribute("aria-haspopup", haspopup);
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__setDOMNodeAccessibilityStatFocus = function (node, label) {
				var acclabel = label;
				if (!label) {
					acclabel = node.getAttribute("aria-label");
				}
				nexacro.__notifyAccessibility(node, acclabel, "focus");
			};
		}
		else {
			nexacro.__setDOMNodeAccessibilityStatFocus = function (node, label) {
				var acclabel = label;
				if (!label) {
					acclabel = node.getAttribute("aria-label");
				}
				nexacro.__notifyAccessibility(node, acclabel, "focus");
			};
		}

		nexacro.__setDOMNodeAccessibilityFlagDefaultButton = function (node, button) {
		};

		nexacro.__setDOMNodeAccessibilityFlagFocusable = function (node, focus) {
		};

		nexacro.__setDOMNodeAccessibilityFlagReadOnly = function (node, readonly) {
			node.setAttribute("aria-readonly", readonly);
		};

		nexacro.__setDOMNodeAccessibilityFlagPassword = function (node, password) {
		};

		nexacro.__setDOMNodeAccessibilityFlagMultiLine = function (node, multiline) {
			node.setAttribute("aria-multiline", multiline);
		};

		nexacro.__setDOMNodeAccessibilityFlagMultiSelectable = function (node, multiselectable) {
			node.setAttribute("aria-multiselectable", multiselectable);
		};

		nexacro.__setDOMNodeAccessibilityFlagSelectable = function (node, selectable) {
			node.setAttribute("aria-selected", selectable);
		};

		nexacro.__setDOMNodeAccessibilityInfoCount = function (node, count) {
			node.setAttribute("aria-setsize", count);
		};

		nexacro.__setDOMNodeAccessibilityInfoIndex = function (node, index) {
			node.setAttribute("aria-posinset", index);
		};

		nexacro.__setDOMNodeAccessibilityInfoValueMax = function (node, maxvalue) {
			node.setAttribute("aria-valuemax", maxvalue);
		};

		nexacro.__setDOMNodeAccessibilityInfoValueMin = function (node, minvalue) {
			node.setAttribute("aria-valuemin", minvalue);
		};

		nexacro.__setDOMNodeAccessibilityInfoValueCur = function (node, value) {
			node.setAttribute("aria-valuenow", value);
		};

		nexacro.__setDOMNodeAccessibilityInfoValueText = function (node, text) {
			node.setAttribute("aria-valuetext", text);
		};

		nexacro.__setDOMNodeAccessibilityInfoLevel = function (node, level) {
			if (level) {
				node.setAttribute("aria-level", level);
			}
		};

		nexacro.__setDOMNodeAccessibilitySelection = function (node, select) {
		};

		nexacro.__setDOMNodeAccessibilityRole = function (node, role) {
			if (role) {
				node.setAttribute("role", role);
			}
			else {
				node.removeAttribute("role");
			}
		};

		nexacro.__setDOMNodeAccessibilityHotKey = function (node, select) {
		};

		nexacro.__setDOMNodeAccessibilityActiveDescendant = function (node, id) {
			node.setAttribute("aria-activedescendant", id);
		};

		nexacro.__setDOMNodeAccessibilityTabStop = function (node, id) {
		};

		nexacro.__setDOMNodeAccessibilityLive = function (node) {
			node.innerHTML = "accessibilityLiveNode";
			node.setAttribute("aria-relevant", "text");
			node.setAttribute("aria-live", "assertive");
			node.setAttribute("aria-atomic", "false");
		};

		nexacro.__setDOMNodeAccessibilityValue = function (node, value, elem, bfocus) {
			nexacro.__notifyAccessibility(node, value, "valuechange", elem, bfocus);
		};



		nexacro._AccessibilityNotifyManager = function () {
			this._nodes = [];
			this._index = -1;
			this._count = 0;
		};

		var _pAccessibilityNotifyManager = nexacro._createPrototype(Object, nexacro._AccessibilityNotifyManager);
		nexacro._AccessibilityNotifyManager.prototype = _pAccessibilityNotifyManager;

		if (nexacro.Browser == "Gecko") {
			_pAccessibilityNotifyManager._getNotifyNode = function () {
				if (this._index == -1) {
					var _doc = document;
					var node = _doc.createElement("div");
					node.id = "accessibility_notify_" + this._count;

					var node_style = node.style;
					nexacro.__setDOMNodeStyleAbsolute(node_style);
					nexacro.__setDOMNodeStyleSize(node_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node, -1);
					nexacro.__setDOMNodeAccessibilityRole(node, "document");
					_doc.body.appendChild(node);


					this._nodes.push(node);

					this._count = this._count + 1;

					var node2 = _doc.createElement("div");
					node2.id = "accessibility_notify_" + this._count;

					var node2_style = node2.style;
					nexacro.__setDOMNodeStyleAbsolute(node2_style);
					nexacro.__setDOMNodeStyleSize(node2_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node2, -1);

					_doc.body.appendChild(node2);
					nexacro.__setDOMNodeAccessibilityRole(node2, "document");
					this._nodes.push(node2);
					this._index = 0;
				}

				return this._nodes;
			};

			_pAccessibilityNotifyManager._notify = function (_handle, label, notifyevent, elem) {
				var nodes = this._getNotifyNode();
				if (nodes) {
					if (notifyevent == "notify") {
						var node = nodes[this._index];
						node.innerText = label;
						nexacro.__setDOMNodeTitle(node, label);
						node.focus();
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else {
						var node = nodes[0];
						node.innerText = label;
						nexacro.__setDOMNodeTitle(node, label);
					}
				}
				this._index = this._index ^ 1;
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion == 11) {
			_pAccessibilityNotifyManager._getNotifyNode = function () {
				if (this._index == -1) {
					var _doc = document;
					var node = _doc.createElement("div");
					node.id = "accessibility_notify_" + this._count;

					var node_style = node.style;
					nexacro.__setDOMNodeStyleAbsolute(node_style);
					nexacro.__setDOMNodeStyleSize(node_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node, -1);
					nexacro.__setDOMNodeAccessibilityRole(node, "document");
					_doc.body.appendChild(node);


					this._nodes.push(node);

					this._count = this._count + 1;

					var node2 = _doc.createElement("div");
					node2.id = "accessibility_notify_" + this._count;

					var node2_style = node2.style;
					nexacro.__setDOMNodeStyleAbsolute(node2_style);
					nexacro.__setDOMNodeStyleSize(node2_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node2, -1);

					_doc.body.appendChild(node2);
					nexacro.__setDOMNodeAccessibilityRole(node2, "document");
					this._nodes.push(node2);
					this._index = 0;
				}

				return this._nodes;
			};

			_pAccessibilityNotifyManager._notify = function (_handle, label, notifyevent, elem, bfocus) {
				var nodes = this._getNotifyNode();
				if (nodes) {
					if (notifyevent == "notify") {
						var node = nodes[this._index];
						node.innerText = label;
						if (elem) {
							if (elem.accessibility_role != "textbox") {
								nexacro.__setDOMNodeAccessibilityRole(node, elem.accessibility_role);
							}
							else {
								nexacro.__setDOMNodeAccessibilityRole(node, "document");
							}
							nexacro.__setDOMNodeStylePos(node.style, elem.left, elem.top);
						}
						else {
							nexacro.__setDOMNodeAccessibilityRole(node, _handle.getAttribute('role'));
						}
						node.focus();
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "valuechange") {
						var node = nodes[0];
						node.innerText = "";
						if (elem && elem._input_handle) {
							var linkedcontrol = _handle._linked_element.linkedcontrol;
							var comp = linkedcontrol._getRootComponent(linkedcontrol);

							var _is_popup_frame = application._isPopupFrame(comp._getOwnerFrame().id);

							if (_is_popup_frame) {
								nexacro.__setDOMNodeAccessibilityRole(elem._input_handle, "document");
								_handle.focus();
							}
						}
						else {
							if (bfocus) {
								node.focus();
							}
						}
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "daychange") {
						var node = nodes[0];
						node.innerText = label;
						node.focus();
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "wholeread") {
						var node = nodes[0];
						node.innerText = label;
						nexacro.__setDOMNodeAccessibilityRole(node, "document");
						node.focus();
					}
					else {
						var node = nodes[0];
						node.innerText = label;
					}
				}
				this._index = this._index ^ 1;
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) {
			_pAccessibilityNotifyManager._getNotifyNode = function () {
				if (this._index == -1) {
					var _doc = document;
					var node = _doc.createElement("div");
					node.id = "accessibility_notify_" + this._count;

					var node_style = node.style;
					nexacro.__setDOMNodeStyleAbsolute(node_style);
					nexacro.__setDOMNodeStyleSize(node_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node, -1);
					nexacro.__setDOMNodeAccessibilityRole(node, "document");
					_doc.body.appendChild(node);


					this._nodes.push(node);

					this._count = this._count + 1;

					var node2 = _doc.createElement("div");
					node2.id = "accessibility_notify_" + this._count;

					var node2_style = node2.style;
					nexacro.__setDOMNodeStyleAbsolute(node2_style);
					nexacro.__setDOMNodeStyleSize(node2_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node2, -1);

					_doc.body.appendChild(node2);
					nexacro.__setDOMNodeAccessibilityRole(node2, "document");
					this._nodes.push(node2);
					this._index = 0;
				}

				return this._nodes;
			};

			_pAccessibilityNotifyManager._notify = function (_handle, label, notifyevent, elem, bfocus) {
				var nodes = this._getNotifyNode();
				if (nodes) {
					if (notifyevent == "notify") {
						var node = nodes[this._index];
						node.innerText = label;

						if (elem) {
							if (elem.accessibility_role != "textbox") {
								nexacro.__setDOMNodeAccessibilityRole(node, elem.accessibility_role);
							}
							else {
								nexacro.__setDOMNodeAccessibilityRole(node, "document");
							}
							nexacro.__setDOMNodeStylePos(node.style, elem.left, elem.top);
						}
						else {
							nexacro.__setDOMNodeAccessibilityRole(node, _handle.getAttribute('role'));
						}
						node.focus();
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "valuechange") {
						var node = nodes[0];
						node.innerText = "";

						if (elem && elem._input_handle) {
						}
						if (bfocus) {
							node.focus();
						}
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "daychange") {
						var node = nodes[0];
						node.innerText = label;
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "wholeread") {
						var node = nodes[0];
						node.innerText = label;
						nexacro.__setDOMNodeAccessibilityRole(node, "document");
						node.focus();
					}
					else {
						var node = nodes[0];
						node.innerText = label;
					}
				}
				this._index = this._index ^ 1;
			};
		}
		else if (nexacro.Browser == "MobileSafari") {
			_pAccessibilityNotifyManager._getNotifyNode = nexacro._emptyFn;
			_pAccessibilityNotifyManager._notify = function (_handle, label, notifyevent, elem, bfocus) {
			};
		}

		else if (true) {
			_pAccessibilityNotifyManager._getNotifyNode = function () {
				if (this._index == -1) {
					var _doc = document;
					var node = _doc.createElement("div");
					node.id = "accessibility_notify_" + this._count;

					var node_style = node.style;
					nexacro.__setDOMNodeStyleAbsolute(node_style);
					nexacro.__setDOMNodeStyleSize(node_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node, -1);
					nexacro.__setDOMNodeAccessibilityRole(node, "document");
					_doc.body.appendChild(node);


					this._nodes.push(node);

					this._count = this._count + 1;

					var node2 = _doc.createElement("div");
					node2.id = "accessibility_notify_" + this._count;

					var node2_style = node2.style;
					nexacro.__setDOMNodeStyleAbsolute(node2_style);
					nexacro.__setDOMNodeStyleSize(node2_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node2, -1);

					_doc.body.appendChild(node2);
					nexacro.__setDOMNodeAccessibilityRole(node2, "document");
					this._nodes.push(node2);
					this._index = 0;
				}

				return this._nodes;
			};

			_pAccessibilityNotifyManager._notify = function (_handle, label, notifyevent, elem, bfocus) {
				var nodes = this._getNotifyNode();
				if (nodes) {
					if (notifyevent == "notify") {
						var node = nodes[this._index];
						node.innerText = label;

						if (elem) {
							if (elem.accessibility_role != "textbox") {
								nexacro.__setDOMNodeAccessibilityRole(node, elem.accessibility_role);
							}
							else {
								nexacro.__setDOMNodeAccessibilityRole(node, "document");
							}
							nexacro.__setDOMNodeStylePos(node.style, elem.left, elem.top);
						}
						else {
							nexacro.__setDOMNodeAccessibilityRole(node, _handle.getAttribute('role'));
						}
						node.focus();
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "valuechange") {
						var node = nodes[0];
						if (label == "#textarea:msg_accessibility_emptyline") {
							label = application._getErrorMessge("msg_accessibility_emptyline");
						}
						node.innerText = label;
						nexacro.__setDOMNodeAccessibilityRole(node, "listitem");
						nexacro.__setDOMNodeAccessibilityActiveDescendant(_handle, node.id);

						if (elem && elem._input_handle) {
						}
						if (bfocus) {
							node.focus();
						}
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "daychange") {
						var node = nodes[0];
						node.innerText = label;
						nexacro.__setDOMNodeAccessibilityActiveDescendant(_handle, node.id);
						nexacro.__setDOMNodeStylePos(node.style, 0, 0);
					}
					else if (notifyevent == "wholeread") {
						var node = nodes[0];
						node.innerText = label;
						nexacro.__setDOMNodeAccessibilityRole(node, "document");
						node.focus();
					}
					else {
						var node = nodes[0];
						node.innerText = label;
					}
				}
				this._index = this._index ^ 1;
			};
		}
		else {
			_pAccessibilityNotifyManager._getNotifyNode = function () {
				if (this._index == -1) {
					var _doc = document;
					var node = _doc.createElement("div");
					node.id = "accessibility_notify_" + this._count;

					var node_style = node.style;
					nexacro.__setDOMNodeStyleAbsolute(node_style);
					nexacro.__setDOMNodeStyleSize(node_style, 0, 0);
					nexacro.__setDOMNodeTabIndex(node, -1);
					_doc.body.appendChild(node);

					node_style.background = "transparent";
					nexacro.__setDOMNodeAccessibilityRole(node, "log");
					nexacro.__setDOMNodeAccessibilityLabel(node, "temporary");
					nexacro.__setDOMNodeAccessibilityLive(node);

					this._nodes.push(node);

					this._count = this._count + 1;

					this._index = 0;
				}

				return this._nodes;
			};

			_pAccessibilityNotifyManager._notify = function (_handle, label) {
				var nodes = this._getNotifyNode();
				if (nodes) {
					var node = nodes[this._index];
					nexacro.AccessibilityUtil.setDOMNodeLabel(node, label);
				}
			};
		}

		delete _pAccessibilityNotifyManager;

		nexacro.__notifyAccessibility = function (node, label, notifyevent, elem, bfocus) {
			if (!nexacro._AccessibilityNotifyNode) {
				nexacro._AccessibilityNotifyNode = new nexacro._AccessibilityNotifyManager();
			}
			nexacro._AccessibilityNotifyNode._notify(node, label, notifyevent, elem, bfocus);
		};

		nexacro._notifyAccessibilityValue = function (elem, label, notifyevent) {
			if (!nexacro._AccessibilityNotifyNode) {
				nexacro._AccessibilityNotifyNode = new nexacro._AccessibilityNotifyManager();
			}
			var _handle = elem._handle;
			if (_handle) {
				nexacro._AccessibilityNotifyNode._notify(_handle, label, notifyevent, elem);
			}
		};






		(function () {
			var re_special_htmlchar = /&|"|'|\<|\>|\r|\n/g;
			function _replace_htmlChar (chr) {
				if (chr == "&") {
					return "&amp;";
				}
				else if (chr == "'") {
					return "&#39;";
				}
				else if (chr == '"') {
					return "&quot;";
				}
				else if (chr == "<") {
					return "&lt;";
				}
				else if (chr == ">") {
					return "&gt;";
				}
				else if (chr == "\r") {
					return "";
				}
				else if (chr == "\n") {
					return "<br/>";
				}
				else {
					return chr;
				}
			}
			nexacro.__toInnerHTMLText = function (text) {
				return text.replace(re_special_htmlchar, _replace_htmlChar);
			};
		})();
		(function () {
			var re_special_xmlchar = /[&"'\<\>\r\n\t ]/g;
			function _encode_xmlChar (chr) {
				if (chr == "&") {
					return "&amp;";
				}
				else if (chr == "'") {
					return "&#39;";
				}
				else if (chr == '"') {
					return "&quot;";
				}
				else if (chr == "<") {
					return "&lt;";
				}
				else if (chr == ">") {
					return "&gt;";
				}
				else if (chr == "\r") {
					return "&#13;";
				}
				else if (chr == "\n") {
					return "&#10;";
				}
				else if (chr == "\t") {
					return "&#9;";
				}
				else if (chr == " ") {
					return "&#32;";
				}
				else {
					return chr;
				}
			}
			nexacro._encodeXml = function (str) {
				if (!nexacro._isNull(str)) {
					var tempStr = "";
					var l = str.length;
					for (i = 0; i < l; i++) {
						var charCode = str.charCodeAt(i);
						if ((charCode & 0x80) != 0x00 || charCode >= 0x20 || charCode == 0xA || charCode == 0xD || charCode == 0x9) {
							tempStr += String.fromCharCode(charCode);
						}
					}
					str = tempStr;

					return str.replace(re_special_xmlchar, _encode_xmlChar);
				}
			};

			var re_encoded_xmlchar = /&#[0-9]+;|&[a-z]+;/g;
			function _decode_xmlStr (str) {
				if (str.charAt(1) == "#") {
					return String.fromCharCode(str.substring(2, str.length - 1) | 0);
				}
				else {
					var code = str.substring(1, str.length - 1);
					if (code == "amp") {
						return "&";
					}
					else if (code == "quot") {
						return "\"";
					}
					else if (code == "apos") {
						return "\'";
					}
					else if (code == "lt") {
						return "<";
					}
					else if (code == "gt") {
						return ">";
					}
					else {
						return "";
					}
				}
			}
			nexacro._decodeXml = function (str) {
				if (!nexacro._isNull(str)) {
					var tempStr = "";
					var l = str.length;
					for (i = 0; i < l; i++) {
						var charCode = str.charCodeAt(i);
						if ((charCode & 0x80) != 0x00 || charCode >= 0x20 || charCode == 0xA || charCode == 0xD || charCode == 0x9) {
							tempStr += String.fromCharCode(charCode);
						}
					}
					str = tempStr;

					if (str.indexOf("&") >= 0) {
						return str.replace(re_encoded_xmlchar, _decode_xmlStr);
					}
				}
				return str;
			};
		})();

		nexacro._getDisplayText = function (text, _type) {
			return text;
		};

		nexacro._getHTMLOuter = function (node, doc) {
			if (!node || !node.tagName) {
				return '';
			}
			var txt = node.outerHTML;
			if (!txt) {
				var el = doc.createElement("div");

				el.appendChild(node);
				txt = el.innerHTML;
				el = null;
			}

			return txt;
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			nexacro._getCloneNode = function (node) {
				var clone = document.createElement("div");
				clone.innerHTML = node.innerHTML;
				return clone;
			};

			nexacro._makeFakePrintNode = function (comps) {
				var remove_targets = [];

				for (var i = 0, len = comps.length; i < len; i++) {
					if (comps[i]._type_name == "WebBrowser") {
						var doc = comps[i].document;
						if (doc) {
							var fake_chart_node = document.createElement("div");
							fake_chart_node.innerHTML = doc.body.innerHTML;

							var style = comps[i]._control_element._client_element._handle.style;
							fake_chart_node.style.position = "absolute";
							fake_chart_node.style.left = style.left;
							fake_chart_node.style.top = style.top;
							fake_chart_node.style.width = style.width;
							fake_chart_node.style.height = style.height;
							comps[i]._control_element._handle.appendChild(fake_chart_node);
							remove_targets.push(fake_chart_node);
						}
					}
				}

				return remove_targets;
			};
		}
		else {
			nexacro._getCloneNode = function (node) {
				return node.cloneNode(true);
			};

			nexacro._makeFakePrintNode = function (comps) {
				var remove_targets = [];

				for (var i = 0, len = comps.length; i < len; i++) {
					var doc = comps[i].document;
					if (doc) {
						var canvases = doc.getElementsByTagName("canvas");
						if (canvases && canvases.length) {
							var cv = doc.createElement("canvas");
							var context = cv.getContext("2d");

							var w, h;
							w = h = 0;

							for (var j = 0, cv_len = canvases.length; j < cv_len; j++) {
								if (w < canvases[j].clientWidth) {
									w = canvases[j].clientWidth;
								}

								if (h < canvases[j].clientHeight) {
									h = canvases[j].clientHeight;
								}
							}
							cv.width = w;
							cv.height = h;

							for (var j = 0, cv_len = canvases.length; j < cv_len; j++) {
								context.drawImage(canvases[j], parseInt(canvases[j].style.left), parseInt(canvases[j].style.top), canvases[j].clientWidth, canvases[j].clientHeight);
							}

							var fake_chart_node = document.createElement("img");
							fake_chart_node.src = cv.toDataURL("image/png");

							var style = comps[i]._control_element._client_element._handle.style;
							fake_chart_node.style.position = style.position;
							fake_chart_node.style.left = style.left;
							fake_chart_node.style.top = style.top;
							fake_chart_node.style.width = style.width;
							fake_chart_node.style.height = style.height;
							comps[i]._control_element._handle.appendChild(fake_chart_node);
							remove_targets.push(fake_chart_node);
						}
					}
				}

				return remove_targets;
			};
		}

		nexacro._searchFakePrintNode = function (comp, make_targets) {
			if (comp._is_form) {
				var comps = comp.components;
				for (var i = 0, len = comps.length; i < len; i++) {
					if (comps[i]._type_name == "WebBrowser") {
						make_targets.push(comps[i]);
					}
					else if (comps[i]._is_form) {
						make_targets = nexacro._searchFakePrintNode(comps[i], make_targets);
					}
				}
			}

			return make_targets;
		};

		nexacro._beforePrintCheckPlugin = function (comp, refform, defaultprint, valign, halign, is_recursive) {
			var make_targets = [];
			var remove_targets = [];

			if (comp._is_form) {
				make_targets = nexacro._searchFakePrintNode(comp, make_targets);
				remove_targets = nexacro._makeFakePrintNode(make_targets);
			}
			else if (comp._type_name == "WebBrowser") {
				if (nexacro.BrowserVersion > 8 && (nexacro.Browser == "Edge" || nexacro.Browser == "IE")) {
					make_targets.push(comp);
					remove_targets = nexacro._makeFakePrintNode(make_targets);
				}
				else {
					nexacro._printInnerContents(comp);
					return;
				}
			}

			nexacro._print(comp, comp._refform, defaultprint, valign, halign);

			for (var i = 0, len = remove_targets.length; i < len; i++) {
				remove_targets[i].parentNode.removeChild(remove_targets[i]);
			}

			make_targets = null;
			remove_targets = null;
		};

		nexacro._print = function (pThis, refform, defaultprint, valign, halign) {
			var form_elem = refform.getElement();
			var doc = form_elem.getRootWindowHandle();

			var clone_handle = nexacro._getCloneNode(pThis._control_element._handle);

			if (pThis._control_element.container_maxwidth) {
				clone_handle.style.width = pThis._control_element.container_maxwidth + "px";
				if (clone_handle.firstChild) {
					clone_handle.firstChild.style.width = pThis._control_element.container_maxwidth + "px";
				}
			}
			if (pThis._control_element.container_maxheight) {
				clone_handle.style.height = pThis._control_element.container_maxheight + "px";
				if (clone_handle.firstChild) {
					clone_handle.firstChild.style.height = pThis._control_element.container_maxheight + "px";
				}
			}

			if (clone_handle.lastChild && clone_handle.lastChild.id == clone_handle.id + "_vscrollbar") {
				clone_handle.removeChild(clone_handle.lastChild);
			}
			if (clone_handle.lastChild && clone_handle.lastChild.id == clone_handle.id + "_hscrollbar") {
				clone_handle.lastChild.style.width = clone_handle.style.width;
				clone_handle.lastChild.style.top = parseInt(clone_handle.style.height) - parseInt(clone_handle.lastChild.style.height) + "px";
			}


			clone_handle.style.left = "0px";
			clone_handle.style.top = "0px";
			clone_handle.style.overflow = "";


			var html = '<HTML lang=\"' + nexacro.BrowserLang.substr(0, 2) + '\">\n<HEAD>\n';

			if (doc.getElementsByTagName != null) {
				var headTags = doc.getElementsByTagName("head");

				if (headTags.length > 0) {
					html += headTags[0].innerHTML;
				}
			}

			if (clone_handle.getElementsByTagName != null) {
				var inputTags = clone_handle.getElementsByTagName("input");
				var temp = pThis._control_element._handle.getElementsByTagName("input");
				for (var i = 0; i < inputTags.length; i++) {
					inputTags[i].setAttribute("value", temp[i].value);
				}
			}

			html += '\n</HEAD>\n\n';
			html += '<BODY onLoad="self.print(); self.close();">\n';
			html += nexacro._getHTMLOuter(clone_handle, doc);
			html += '</BODY>\n\n</HTML>\n\n';

			var wnd = window;
			if (refform && refform._control_element && refform._control_element.linkedcontrol && refform._control_element.linkedcontrol._getWindow()._doc.parentWindow) {
				wnd = doc.parentWindow;
			}

			var printWin = window.open("", "printSpecial", "top=" + wnd.screenTop + ",left=" + wnd.screenLeft + ", width=auto, height=auto");
			printWin.document.open();
			printWin.document.write(html);
			printWin.document.close();
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._printInnerContents = function (comp) {
				try {
					var current_focus = document.activeElement;
					var win = comp._ifrm_elem._handle.contentWindow;
					if (!win.onafterprint) {
						win.onafterprint = function () {
							current_focus.focus();
						};
					}
					win.document.body.focus();
					win.print();

					return true;
				}
				catch (e) {
					return false;
				}
			};
		}
		else {
			nexacro._printInnerContents = function (comp) {
				try {
					comp.callMethod("print");
					return true;
				}
				catch (e) {
					return false;
				}
			};
		}

		nexacro._managerFrameDoc = null;
		nexacro._managerFrameNode = null;
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._managerFrameSrc = "<html>\n"
				 + "<head>\n"
				 + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
				 + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;width:65535px;position:absolute'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + 'nexacro._imgloadhandler_onload_forward = function() { nexacro._imgloadhandler_onload(window.event.srcElement); };'
				 + 'nexacro._imgloadhandler_onerror_forward = function () { nexacro._imgloadhandler_onerror(window.event.srcElement); };'
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 9) {
			nexacro._managerFrameSrc = "<html>\n"
				 + "<head>\n"
				 + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
				 + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + 'nexacro._imgloadhandler_onload_forward = function(e) { nexacro._imgloadhandler_onload(e.target); };'
				 + 'nexacro._imgloadhandler_onerror_forward = function (e) { nexacro._imgloadhandler_onerror(e.target); };'
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 9) {
			nexacro._managerFrameSrc = "<html>\n"
				 + "<head>\n"
				 + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
				 + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + 'nexacro._imgloadhandler_onload_forward = function(e) { nexacro._imgloadhandler_onload(e.srcElement); };'
				 + 'nexacro._imgloadhandler_onerror_forward = function (e) { nexacro._imgloadhandler_onerror(e.srcElement); };'
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else {
			nexacro._managerFrameSrc = "<html>\n"
				 + "<head>\n"
				 + "<style> .calculate_image { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "<style> .calculate_text { position: absolute; height: auto; width: auto; left: 0px; top: 0px; } </style>"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + 'nexacro._imgloadhandler_onload_forward = function(e) { nexacro._imgloadhandler_onload(e.target); };'
				 + 'nexacro._imgloadhandler_onerror_forward = function (e) { nexacro._imgloadhandler_onerror(e.target); };'
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._managerPopupFrameSrc = "<html>\n"
				 + "<head>\n"
				 + "<meta http-equiv='X-UA-Compatible' content='IE=Edge' />\n"
				 + "</head>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}
		else {
			nexacro._managerPopupFrameSrc = "<html>\n"
				 + "<head/>\n"
				 + "<body style='margin:0;border:none;'>\n"
				 + "<script type='text/javascript'>\n"
				 + "nexacro = parent.nexacro;"
				 + "</script>\n"
				 + "</body>\n"
				 + "</html>";
		}

		nexacro._preparePopupManagerFrame = function (popupWin) {
			var _doc = popupWin.document;
			var iframeobj = _doc.createElement("IFRAME");
			iframeobj.frameborder = "0";
			iframeobj.scrolling = "no";
			iframeobj.style.visibility = 'hidden';
			iframeobj.style.position = 'absolute';
			iframeobj.style.border = 'none';

			var str_title = application._getErrorMessge("msg_accessibility_emptyframe");
			nexacro.__setDOMNodeTitle(iframeobj, str_title);

			_doc.body.appendChild(iframeobj);
			iframeobj.src = "about:blank";
			var _frame_doc;
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				_frame_doc = iframeobj.contentWindow.document;
			}
			else {
				_frame_doc = iframeobj.contentDocument;
			}
			_frame_doc.open();
			_frame_doc.write(nexacro._managerPopupFrameSrc);
			_frame_doc.close();
			nexacro._managerPopupFrameNode = iframeobj;
			nexacro._managerPopupFrameDoc = _frame_doc;
		};

		nexacro._prepareManagerFrame = function () {
			var _doc = document;
			var iframeobj = _doc.createElement("IFRAME");
			iframeobj.frameborder = "0";
			iframeobj.scrolling = "no";

			iframeobj.style.visibility = 'hidden';
			iframeobj.style.position = 'absolute';
			iframeobj.style.border = 'none';
			if (nexacro.OS == "iOS") {
				iframeobj.style.display = 'none';
			}

			var str_title = application._getErrorMessge("msg_accessibility_emptyframe");
			nexacro.__setDOMNodeTitle(iframeobj, str_title);
			nexacro.__setDOMNodeAccessibilityHidden(iframeobj, true);

			_doc.body.appendChild(iframeobj);
			iframeobj.src = "about:blank";
			var _frame_doc;
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				_frame_doc = iframeobj.contentWindow.document;
			}
			else {
				_frame_doc = iframeobj.contentDocument;
			}
			_frame_doc.open();
			_frame_doc.write(nexacro._managerFrameSrc);
			_frame_doc.close();
			nexacro._managerFrameNode = iframeobj;
			nexacro._managerFrameDoc = _frame_doc;
		};

		nexacro._destroyManagerFrame = function (_win_handle) {
			var dest_handle = nexacro._getWindowDestinationHandle(_win_handle);
			if (nexacro._managerFrameNode && dest_handle) {
				nexacro.__removeDOMNode(dest_handle, nexacro._managerFrameNode);
			}
			nexacro._managerFrameNode = null;
			nexacro._managerFrameDoc = null;
		};


		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._createFrameNode = function (node, left, top, _doc) {
				var framehandle = _doc.createElement("iframe");
				framehandle.id = node.id + "_iframe";
				framehandle.frameborder = 0;
				framehandle.scrolling = "no";
				framehandle.style.border = 'none';
				framehandle.style.filter = "Alpha(Opacity=0);";

				framehandle.left = left;
				framehandle.top = top;

				framehandle.style.width = "100%";
				framehandle.style.height = "100%";
				nexacro.__appendDOMNode(node, framehandle);

				return framehandle;
			};

			nexacro._destroyFrameNode = function (node, framehandle) {
				if (framehandle) {
					nexacro.__removeDOMNode(node, framehandle);
				}
				framehandle = null;
			};
		}
		else {
			nexacro._createFrameNode = nexacro._destroyFrameNode = nexacro._emptyFn;
		}


		if (nexacro.Browser == "IE") {
			nexacro._TextCacheNodeCnt = 0;
			nexacro._TextInfoCacheManager = function (font, letterspace) {
				this.font = font;
				this.letterspace = letterspace;
				this.nowrapnode_arr = [];
				this.font_height = 0;
				this.space_width = 0;
				this.space_width1 = 0;
				this.cache = {
				};
				this._getFontInfo();
				this.wordwrapnode = null;
			};
			_pTextInfoCacheManager = nexacro._createPrototype(Object, nexacro._TextInfoCacheManager);
			nexacro._TextInfoCacheManager.prototype = _pTextInfoCacheManager;


			_pTextInfoCacheManager.getNowrapTextNode = function () {
				var node = this.nowrapnode_arr.pop();
				if (node == null) {
					var _doc = nexacro._managerFrameDoc;
					node = _doc.createElement("div");
					node.id = "calculate_text_" + nexacro._TextCacheNodeCnt;

					var node_style = node.style;
					node_style.position = "absolute";
					node_style.height = "auto";
					node_style.width = "auto";
					node_style.left = "0px";
					node_style.top = "0px";
					node_style.visibility = "hidden";
					this._setStyleFont(node_style, this.font);

					_doc.body.appendChild(node);
					nexacro._TextCacheNodeCnt++;
				}

				return node;
			};

			_pTextInfoCacheManager.restoreNode = function (node) {
				this.restoreNowrapTextNode(node);
			};
			_pTextInfoCacheManager.restoreNowrapTextNode = function (node) {
				this.nowrapnode_arr.push(node);
			};

			_pTextInfoCacheManager._getFontInfo = function () {
				var node = this.getNowrapTextNode();
				nexacro.__setDOMNodeSinglelineText(node, "gH");
				this.font_height = node.clientHeight;
				var font_width = node.clientWidth;
				nexacro.__setDOMNodeSinglelineText(node, "g H");
				var font_total_width = node.clientWidth;
				this.space_width = font_total_width - font_width;
				nexacro.__setDOMNodeSinglelineText(node, "　");
				this.space_width1 = node.clientWidth;
				this.restoreNowrapTextNode(node);
			};

			_pTextInfoCacheManager.getWordTextWidth = function (word) {
				var text_width = this.cache[word];
				if (text_width == null) {
					var textnode = this.getNowrapTextNode();

					try {
						nexacro.__setDOMNodeSinglelineText(textnode, word);
					}
					catch (e) {
					}
					text_width = textnode.clientWidth;

					this.restoreNowrapTextNode(textnode);
					this.cache[word] = text_width;
				}

				return text_width;
			};
		}
		else {
			nexacro._TextCacheNodeCnt = 0;
			nexacro._TextInfoCacheManager = function (font, letterspace) {
				this.font = font;
				this.letterspace = letterspace;
				this.canvas_arr = [];
				this.font_height = 0;
				this.space_width = 0;
				this.space_width1 = 0;
				this.cache = {
				};
				this._getFontInfo();
				this.wordwrapnode = null;
			};
			_pTextInfoCacheManager = nexacro._createPrototype(Object, nexacro._TextInfoCacheManager);
			nexacro._TextInfoCacheManager.prototype = _pTextInfoCacheManager;

			if (nexacro.Browser == "Gecko") {
				nexacro._HTMLNodeSizeGap = 1;
			}
			else {
				nexacro._HTMLNodeSizeGap = 0;
			}


			_pTextInfoCacheManager.getCanvasNode = function () {
				var canvasinfo = this.canvas_arr.pop();
				if (canvasinfo == null) {
					var node = document.createElement("canvas");
					var ctx = node.getContext('2d');
					this._setCanvasStyleFont(ctx, this.font);

					canvasinfo = {
						node : node, 
						ctx : ctx
					};
				}
				return canvasinfo;
			};

			_pTextInfoCacheManager.restoreNode = function (node) {
				this.restoreCanvasNode(node);
			};

			_pTextInfoCacheManager.restoreCanvasNode = function (canvas_info) {
				this.canvas_arr.push(canvas_info);
			};

			_pTextInfoCacheManager._getFontInfo = function () {
				var _doc = nexacro._managerFrameDoc;
				var node = _doc.createElement("div");
				node.id = "calculate_text_" + nexacro._TextCacheNodeCnt;

				var node_style = node.style;
				node_style.position = "absolute";
				node_style.height = "auto";
				node_style.width = "auto";
				node_style.left = "0px";
				node_style.top = "0px";
				node_style.visibility = "hidden";
				this._setStyleFont(node_style, this.font);

				_doc.body.appendChild(node);
				nexacro._TextCacheNodeCnt++;

				nexacro.__setDOMNodeSinglelineText(node, "gH");
				this.font_height = node.clientHeight - nexacro._HTMLNodeSizeGap;
				_doc.body.removeChild(node);

				var node = document.createElement("canvas");
				var ctx = node.getContext('2d');
				this._setCanvasStyleFont(ctx, this.font);

				this.space_width = ctx.measureText(" ").width;
				this.space_width1 = ctx.measureText("　").width;

				this.restoreCanvasNode({
					node : node, 
					ctx : ctx
				});
			};

			_pTextInfoCacheManager.getWordTextWidth = function (word) {
				var text_width = this.cache[word];
				if (text_width == null) {
					var canvasinfo = this.getCanvasNode();
					text_width = canvasinfo.ctx.measureText(word).width;

					this.restoreCanvasNode(canvasinfo);
					this.cache[word] = text_width;
				}
				return text_width;
			};
		}

		_pTextInfoCacheManager.getWordwrapTextNode = function (width, wordwrap) {
			var node = this.wordwrapnode;
			if (node == null) {
				var _doc = nexacro._managerFrameDoc;
				node = _doc.createElement("div");
				node.id = "calculate_wraptext_" + nexacro._TextCacheNodeCnt;

				var node_style = node.style;
				node_style.position = "absolute";
				node_style.height = "auto";
				node_style.width = width + "px";
				node_style.left = "0px";
				node_style.top = "0px";
				node_style.visibility = "hidden";
				this._setStyleFont(node_style, this.font);

				if (wordwrap == undefined || wordwrap == true || wordwrap == "true") {
					wordwrap = "char";
				}
				else if (wordwrap == false || wordwrap == "false") {
					wordwrap = "none";
				}

				nexacro.__setDOMNodeWordWrap(node, wordwrap);

				_doc.body.appendChild(node);
				nexacro._TextCacheNodeCnt++;
			}
			else {
				node_style.width = width + "px";
			}

			return node;
		};

		_pTextInfoCacheManager.getWordWrapTextSize = function (text, width, wordwrap) {
			var strw = text + "#width" + width;
			var strh = strw + "#height";

			var text_width = this.cache[strw];
			var text_height = this.cache[strh];
			if (text_width == null) {
				var textnode = this.getWordwrapTextNode(width, wordwrap);

				try {
					nexacro.__setDOMNodeMultilineText(textnode, text);
				}
				catch (e) {
				}
				text_width = textnode.clientWidth;
				text_height = textnode.clientHeight;
				this.cache[strw] = text_width;
				this.cache[strh] = text_height;
			}
			return [text_width, text_height];
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pTextInfoCacheManager._setStyleFont = function (node_style, font) {
				if (font._bold) {
					node_style.fontWeight = "bold";
				}
				else {
					node_style.fontWeight = "normal";
				}

				if (font._italic) {
					node_style.fontStyle = "italic";
				}
				else {
					node_style.fontStyle = "normal";
				}

				node_style.fontFamily = font.face;
				node_style.fontSize = font.size >= 0 ? font.size + "pt" : Math.abs(font.size) + "px";
			};
		}
		else {
			_pTextInfoCacheManager._setStyleFont = function (node_style, font) {
				node_style.font = font._sysvalue;
			};
		}

		_pTextInfoCacheManager._setCanvasStyleFont = function (node_style, font) {
			node_style.font = font._sysvalue;
		};

		delete _pTextInfoCacheManager;

		nexacro._TextSizeCacheManagers = {
		};
		(function () {
			var re_newline = /\r\n|\n|\r/;
			var re_space = /\s/;

			nexacro.__getSinglelineTextSize = function (manager, letterspace, text) {
				var words = text.split(re_space);
				var wcnt = words.length;
				var text_size = 0;
				var letterspace_size = text.length * letterspace;
				for (var i = 0; i < wcnt; i++) {
					var word = words[i];
					if (word) {
						text_size += manager.getWordTextWidth(word);
						text_size += (parseInt(letterspace_size));
					}
				}
				var idx_space = text.indexOf("　");
				if (idx_space > -1) {
					text_size += (wcnt - 1) * manager.space_width1;
				}
				else {
					text_size += (wcnt - 1) * manager.space_width;
				}
				return text_size;
			};

			nexacro._getSinglelineTextSize = function (manager, letterspace, text) {
				var text_width = nexacro.__getSinglelineTextSize(manager, letterspace, text.replace(/\r\n|\n|\r/, ' '));
				return [text_width, manager.font_height];
			};

			nexacro._getMultilineTextSize = function (manager, letterspace, text) {
				var lines = text.split(re_newline);
				var lcnt = lines.length;
				var text_width = 0;
				for (var i = 0; i < lcnt; i++) {
					var line_width = nexacro.__getSinglelineTextSize(manager, letterspace, lines[i]);
					if (line_width > text_width) {
						text_width = line_width;
					}
				}
				return [text_width, manager.font_height * lcnt];
			};



			nexacro._getWordwrapTextSize = function (manager, letterspace, text, content_width, wordwrap) {
				var text_size = manager.getWordWrapTextSize(text, content_width, wordwrap);
				var letterspace_size = text.length * letterspace;
				text_size[0] += parseInt(letterspace_size);
				return text_size;
			};
		})();

		nexacro._getFontHeight = function (font) {
			var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
			if (cacheManager == null) {
				cacheManager = new nexacro._TextInfoCacheManager(font);
				nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
			}
			return cacheManager.font_height;
		};

		nexacro._getTextSize = function (letterspace, text, font, multiline, content_width, wordwrap) {
			if (text && text.length > 0 && font && !font._is_empty) {
				var cacheManager = nexacro._TextSizeCacheManagers[font._sysvalue];
				if (cacheManager == null) {
					cacheManager = new nexacro._TextInfoCacheManager(font, letterspace);
					nexacro._TextSizeCacheManagers[font._sysvalue] = cacheManager;
				}

				if (multiline) {
					if (content_width != null) {
						return nexacro._getWordwrapTextSize(cacheManager, letterspace, text, content_width, wordwrap);
					}
					else {
						return nexacro._getMultilineTextSize(cacheManager, letterspace, text);
					}
				}
				else {
					return nexacro._getSinglelineTextSize(cacheManager, letterspace, text);
				}
			}
			return [0, 0];
		};
		nexacro._getTextSize2 = nexacro._getTextSize;

		nexacro.getTextSize = function (text, font, width, wordwrap, letterspace) {
			if (typeof (wordwrap) == "string") {
				wordwrap = wordwrap.toLowerCase();
			}

			if (wordwrap == true || wordwrap == "true") {
				wordwrap = "char";
			}
			else if (wordwrap == false || wordwrap == "false") {
				wordwrap = "none";
			}

			var line = true;

			if (wordwrap == "none") {
				line = false;
			}
			else if (wordwrap == "line") {
				wordwrap = null;
			}

			if (!letterspace) {
				letterspace = 0;
			}

			var retn = nexacro._getTextSize(letterspace, text, font, line, width, wordwrap);
			var obj = {
				nx : retn[0], 
				ny : retn[1]
			};

			return obj;
		};

		nexacro._getTextBaseline = function (textBaseline, y, h) {
			var cony = y;
			var s = h / 7;
			if (textBaseline == 3) {
				cony -= h / 3 - s;
			}
			else if (textBaseline == 2) {
				cony += h / 2;
			}
			else if (textBaseline == 0) {
				cony = y - h / 3 + s;
			}
			else if (textBaseline == 1) {
				cony = y + h / 2 + s;
			}
			return cony;
		};
		nexacro._getLineCountWithWordwrap = function (elem, letterspace, text, wordwrap) {
			var gap = (parseInt(elem._handle.style.paddingLeft) | 0) + (parseInt(elem._handle.style.paddingRight) | 0);
			var content_width = parseInt(elem.width) - gap - 2;

			var cacheManager = nexacro._TextSizeCacheManagers[elem.font._sysvalue];
			if (cacheManager == null) {
				cacheManager = new nexacro._TextInfoCacheManager(elem.font, letterspace);
				nexacro._TextSizeCacheManagers[elem.font._sysvalue] = cacheManager;
			}

			var text_size = nexacro._getWordwrapTextSize(cacheManager, elem.letterspace, text, content_width, wordwrap);
			var linecount = Math.round(text_size[1] / cacheManager.font_height);
			return Math.max(linecount, 1);
		};




		nexacro._ImgInfoCacheManager = 
			{
			cnt : 0, 
			ready : [], 
			loadinglist : {
			}, 
			get_imgnode : function () {
				var node = this.ready.pop();
				if (node == null) {
					var _doc = nexacro._managerFrameDoc;
					node = _doc.createElement("img");
					node.id = "calculate_img_" + this.cnt;
					nexacro.__setDOMNodeAlt(node, "");

					if (nexacro._allow_default_pinchzoom) {
						var imgcontainer = _doc.getElementById("calculate_img_container");
						if (!imgcontainer) {
							imgcontainer = _doc.createElement("div");
							imgcontainer.id = "calculate_img_container";
							imgcontainer.style.position = 'absolute';
							imgcontainer.style.overflow = 'hidden';
							imgcontainer.style.width = "1px";
							imgcontainer.style.height = "1px";
							_doc.body.appendChild(imgcontainer);
						}

						imgcontainer.appendChild(node);
					}
					else {
						_doc.body.appendChild(node);
					}

					this.cnt++;
				}
				return node;
			}, 
			restore_imgnode : function (node) {
				if (!(nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 10)) {
					var src = node.getAttributeNode("src");
					if (src) {
						node.removeAttributeNode(src);
					}
				}
				this.ready.push(node);
			}, 
			clear_imgnode : function () {
				var _doc = nexacro._managerFrameDoc;
				var node = null;
				while (this.ready.length > 0) {
					node = this.ready.pop();
					nexacro.__removeDOMNode(_doc.body, node);
					node = null;
				}
				this.ready = null;
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 9) {
			nexacro._bind_imgloadhandler_onload_recall = function (node) {
				return function () {
					if (node) {
						nexacro._imgloadhandler_onload(node);
					}
				};
			};
		}

		nexacro._imgloadhandler_onload = function (node) {
			var img_url = node._cacheurl;
			node._cacheurl = null;

			var width = node.width;
			var height = node.height;

			nexacro._ImgInfoCacheList[img_url] = {
				width : width, 
				height : height
			};
			delete nexacro._ImgInfoCacheManager.loadinglist[img_url];

			nexacro._stopSysObserving(node, "load", "onload", nexacro._imgloadhandler_onload_forward);
			nexacro._stopSysObserving(node, "error", "onerror", nexacro._imgloadhandler_onerror_forward);

			if (node._callbackList) {
				var callbacklist = node._callbackList;
				var cnt = callbacklist.length;
				for (var i = 0; i < cnt; i++) {
					callbacklist[i].callback.call(callbacklist[i].target, img_url, width, height);
					callbacklist[i].target = null;
				}
				node._callbackList = null;
			}
			nexacro._ImgInfoCacheManager.restore_imgnode(node);
		};

		nexacro._imgloadhandler_onerror = function (node) {
			var img_url = node._cacheurl;
			delete node._cacheurl;
			node._cacheurl = null;

			nexacro._ImgInfoCacheList[img_url] = {
				width : 0, 
				height : 0
			};
			delete nexacro._ImgInfoCacheManager.loadinglist[img_url];

			nexacro._stopSysObserving(node, "load", "onload", nexacro._imgloadhandler_onload_forward);
			nexacro._stopSysObserving(node, "error", "onerror", nexacro._imgloadhandler_onerror_forward);

			if (node._callbackList) {
				var callbacklist = node._callbackList;
				var cnt = callbacklist.length;
				for (var i = 0; i < cnt; i++) {
					callbacklist[i].callback.call(callbacklist[i].target, img_url, 0, 0, node, -1);
				}
				delete node._callbackList;
				node._callbackList = null;
			}
			nexacro._ImgInfoCacheManager.restore_imgnode(node);
		};

		nexacro._getImageSize = function (src, callbackFn, pThis, base_url) {
			if (!src) {
				return null;
			}
			if (src.substring(0, 4).toLowerCase() == "url(") {
				src = src.substring(5, src.length - 2);
			}

			if (!src) {
				return null;
			}

			var img_url = src;
			if (img_url.substring(0, 17) == "data:image;base64") {
				var frontStr = img_url.substr(0, 10);
				var rearStr = img_url.substr(10, img_url.length - 1);
				if (nexacro.Browser == "Chrome") {
					img_url = frontStr + "/*" + rearStr;
				}
			}
			else {
				img_url = nexacro._getImageLocation(src, base_url);
			}

			var retval = nexacro._ImgInfoCacheList[img_url];
			if (retval) {
				return retval;
			}

			if (img_url) {
				var imgnode = nexacro._ImgInfoCacheManager.loadinglist[img_url];
				if (imgnode) {
					imgnode._callbackList.push({
						target : pThis, 
						callback : callbackFn
					});
				}
				else {
					imgnode = nexacro._ImgInfoCacheManager.get_imgnode();
					nexacro._ImgInfoCacheManager.loadinglist[img_url] = imgnode;
					imgnode._callbackList = [{
						target : pThis, 
						callback : callbackFn
					}];
					imgnode._cacheurl = img_url;
					nexacro._observeSysEvent(imgnode, "load", "onload", nexacro._imgloadhandler_onload_forward);
					nexacro._observeSysEvent(imgnode, "error", "onerror", nexacro._imgloadhandler_onerror_forward);
					imgnode.src = img_url;
				}
				retval = nexacro._ImgInfoCacheList[img_url];

				imgnode = null;
			}
			return retval ? retval : null;
		};

		nexacro._getImageObject = function (src, callbackFn, pThis, base_url) {
			if (src.substring(0, 4).toLowerCase() == "url(") {
				src = src.substring(5, src.length - 2);
			}

			if (!src) {
				return null;
			}


			var img_url = nexacro._getImageLocation(src, base_url);

			if (img_url) {
				var retval = nexacro._ImgInfoCacheList[img_url];

				var imgnode = nexacro._ImgInfoCacheManager.loadinglist[img_url];
				if (imgnode) {
					imgnode._callbackList.push({
						target : pThis, 
						callback : callbackFn
					});
					var retval = nexacro._ImgInfoCacheList[img_url];
					if (retval) {
						nexacro._imgloadhandler_onload_forward(imgnode);
					}
				}
				else {
					imgnode = nexacro._ImgInfoCacheManager.get_imgnode();

					var imagesize = nexacro._ImgInfoCacheList[img_url];
					if (imagesize) {
						imgnode.src = img_url;
						callbackFn.call(pThis, img_url, imagesize.width, imagesize.height, imgnode);
					}
					else {
						nexacro._ImgInfoCacheManager.loadinglist[img_url] = imgnode;
						imgnode._callbackList = [{
							target : pThis, 
							callback : callbackFn
						}];
						imgnode._cacheurl = img_url;
						nexacro._observeSysEvent(imgnode, "load", "onload", nexacro._imgloadhandler_onload_forward);
						nexacro._observeSysEvent(imgnode, "error", "onerror", nexacro._imgloadhandler_onerror_forward);
						imgnode.src = img_url;
					}
				}
				return imgnode;
			}

			return null;
		};



		nexacro._IframeManager = 
			{
			formlist : [], 
			create_form : function (name, iframe_id, pThis) {
				var _doc = nexacro._managerFrameDoc;
				var node = _doc.createElement("FORM");
				node.id = name;
				node.name = name;
				node.enctype = "multipart/form-data";
				node.encoding = "multipart/form-data";
				node.method = "post";
				node.target = iframe_id;

				var uploadiframe;
				if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
					uploadiframe = _doc.createElement("<IFRAME name='" + node.target + "'/>");
				}
				else {
					uploadiframe = _doc.createElement("IFRAME");
					uploadiframe.name = node.target;
				}
				uploadiframe.id = node.target;

				var str_title = application._getErrorMessge("msg_accessibility_emptyframe");
				nexacro.__setDOMNodeTitle(uploadiframe, str_title);

				var inputlist = [];

				nexacro._observeSysEvent(uploadiframe, "load", "onload", nexacro._fileinputhandler_onload_forward);
				this.formlist.push({
					form : node, 
					inputlist : inputlist, 
					uploadiframe : uploadiframe
				});

				node.appendChild(uploadiframe);
				_doc.body.appendChild(node);
				return uploadiframe;
			}, 
			search_form : function (form_id) {
				var form = null;
				for (var i = 0; i < this.formlist.length; i++) {
					if (this.formlist[i].form.id == form_id) {
						form = this.formlist[i].form;
						return {
							idx : i, 
							node : form
						};
					}
				}
				return form;
			}, 
			search_iframe : function (form_target) {
				var iframe = null;
				for (var i = 0; i < this.formlist.length; i++) {
					if (this.formlist[i].uploadiframe.id == form_target) {
						iframe = this.formlist[i].uploadiframe;
						return {
							idx : i, 
							node : iframe
						};
					}
				}
				return iframe;
			}, 
			search_input : function (form, input_id) {
				var input = null;
				var idx = 0;

				for (var j = 0; j < form.node.length; j++) {
					if (form.node[j].name == input_id) {
						input = form.node[j];
						return {
							idx : j, 
							node : input
						};
					}
				}
				return input;
			}, 

			get_node : function (id) {
				var form = this.search_form(id);
				var iframe = this.search_iframe(form.node.target);
				return iframe.node.contentWindow.document;
			}, 
			get_doc : function (node) {
				var xmlDoc = node;
				if (node.XMLDocument) {
					xmlDoc = node.XMLDocument;
				}
				return xmlDoc;
			}
		};

		nexacro._getXMLDocument = function (id) {
			var manager = nexacro._IframeManager;
			var node = null, xmldoc = null;
			if (manager) {
				var node = manager.get_node(id);
				if (node) {
					xmldoc = manager.get_doc(node);
				}
			}
			return xmldoc;
		};
		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._findclick = function (comp_name, item_comp_name, item_comp) {
				if (item_comp._isPopupFrame()) {
					item_comp._getWindow()._handle._inputDOM_nodeClick(item_comp._input_node);
				}
				else {
					var manager = nexacro._IframeManager;
					if (manager) {
						var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
						if (input) {
							input.node.click();
						}
					}
				}
			};
		}
		else {
			nexacro._findclick = function (comp_name, item_comp_name, item_comp) {
				var manager = nexacro._IframeManager;
				if (manager) {
					var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
					if (input) {
						input.node.click();
					}
				}
			};
		}

		nexacro._file_changed = nexacro._emptyFn;

		nexacro._setMultipleFile = function (comp_name, item_comp_name, flag) {
			var manager = nexacro._IframeManager;
			if (manager) {
				var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
				if (input) {
					input.node.multiple = flag;
				}
			}
		};

		nexacro._randomId = function (_window) {
			var rid = "";
			var doc = nexacro._getWindowDocumentHandle(_window._handle);
			do {
				rid = Math.random().toString().substr(2, 30);
			} while (doc.getElementById(rid));
			return rid;
		};

		nexacro._get_hidden_frame = function (form_id) {
			var manager = nexacro._IframeManager;
			return manager.search_form(form_id);
		};

		nexacro._create_hidden_frame = function (name, iframe_id, callback_fn, pThis) {
			var iframe = nexacro._IframeManager.create_form(name, iframe_id, pThis);
			iframe._callbackList = [{
				target : pThis, 
				callback : callback_fn
			}];
		};

		nexacro._destroy_hidden_frame = function (form_id, pThis) {
			var _doc = nexacro._managerFrameDoc;
			var manager = nexacro._IframeManager;
			var form = manager.search_form(form_id);
			var inputlist = manager.formlist[form.idx].inputlist;

			var inputnode = null;
			if (form && form.node) {
				while (inputlist.length > 0) {
					inputnode = inputlist.pop();
					delete inputnode._callbackList;
					inputnode._callbackList = null;
					nexacro.__removeDOMNode(form.node, inputnode);
					inputnode = null;
				}
				var ret_iframe = manager.formlist[form.idx].uploadiframe;
				if (ret_iframe) {
					nexacro._stopSysObserving(ret_iframe, "load", "onload", nexacro._fileinputhandler_onload_forward);
					delete ret_iframe._callbackList;
					ret_iframe._callbackList = null;
					nexacro.__removeDOMNode(form.node, ret_iframe);
					ret_iframe = null;
				}
				nexacro.__removeDOMNode(_doc.body, form.node);
				manager.formlist.splice(form.idx, 1);
				form.node = null;
			}
		};

		nexacro._create_filedownload_handle = nexacro._emptyFn;
		nexacro._destroy_filedownload_handle = nexacro._emptyFn;

		nexacro._getDataFromDOM = function (doc) {
			return doc.body.innerHTML;
		};

		nexacro._getContentType = function (doc) {
			if (doc.contentType) {
				trace(doc.contentType);
				return doc.contentType.split("/")[1].toUpperCase();
			}
			else {
				if (doc.xml || doc.xmlVersion) {
					return "XML";
				}
				else {
					return "HTML";
				}
			}
		};


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			nexacro._download = function (url) {
				var index = url.lastIndexOf(".");
				var extension;
				if (index > 0) {
					extension = url.substr(index + 1);
					if (extension == "xlsx") {
						window.location.href = url;
						return;
					}
				}
				window.open(url);
			};
		}
		else if (nexacro.Browser == "Chrome") {
			nexacro._download = function (url) {
				var new_win = window.open(url);
				new_win.addEventListener("focus", function () {
					if (this._use_filedialog) {
						this.close();
					}
				}, false);
				new_win.addEventListener("blur", function () {
					this._use_filedialog = true;
				}, false);
			};
		}
		else if (nexacro.Browser == "Safari") {
			nexacro._download = function (url) {
				download = window.open('');
				download.location = url;
				download.setTimeout('window.close();', 500);
			};
		}
		else if (nexacro.Browser == "MobileSafari" && nexacro.OS == "iOS") {
			nexacro._download = function (url) {
				if (nexacro._isHybrid()) {
					var params = '{"url":"' + url + '"}';
					var jsonstr = '{"id":"", "div":"Browser", "method":"execBrowser", "params":' + params + '}';

					nexacro.Device.exec(jsonstr);
				}
				else {
					var bChange = false;

					var version_arr = nexacro.OSVersion.split(".");
					var major_version = version_arr[0];
					var minor_version = version_arr[1];
					var third_version = version_arr.length == 3 ? version_arr[2] : null;

					if (major_version >= 8 && minor_version >= 1) {
						if (minor_version == 1) {
							if (third_version && third_version >= 3) {
								bChange = true;
							}
						}
						else {
							bChange = true;
						}
					}

					if (bChange) {
						var download = window.open('');
						setTimeout(function () {
							download.location = url;
						}, 1200);
					}
					else {
						window.open(url);
					}
				}
			};
		}
		else {
			nexacro._download = function (url) {
				window.open(url);
			};
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 8) {
			nexacro._append_hidden_item = function (form_id, input_id, callback_fn, pThis, handle, multiselect) {
				var _doc;
				_doc = nexacro._managerFrameDoc;

				var manager = nexacro._IframeManager;
				var form = manager.search_form(form_id);
				var input = null;
				if (form && form.node) {
					var node = form.node;
					input = _doc.createElement("INPUT");
					input.type = "file";
					if (multiselect && nexacro.BrowserVersion > 9) {
						input.multiple = multiselect;
					}
					input.name = input_id;
					input._callbackList = [{
						target : pThis, 
						callback : callback_fn
					}];
					manager.formlist[form.idx].inputlist.push(input);

					node.appendChild(input);
					nexacro._observeSysEvent(input, "change", "onchange", nexacro._fileinputhandler_onchange_forward);
				}
				pThis._input_node = input;
			};

			nexacro._remove_hidden_item = function (form_id, input_id) {
				var manager = nexacro._IframeManager;
				var form = manager.search_form(form_id);
				if (form && form.node) {
					var input = manager.search_input(form, input_id);
					if (input && input.node) {
						nexacro._stopSysObserving(input.node, "propertychanage", "onpropertychange", nexacro._fileinputhandler_onchange_forward);
						nexacro.__removeDOMNode(form.node, input.node);
						manager.formlist[form.idx].inputlist.splice(input.idx, 1);
					}
				}
			};
		}
		else {
			nexacro._append_hidden_item = function (form_id, input_id, callback_fn, pThis, handle, multiselect) {
				var _doc;
				_doc = nexacro._managerFrameDoc;
				var manager = nexacro._IframeManager;
				var form = manager.search_form(form_id);
				var input = null;
				if (form && form.node) {
					var node = form.node;
					input = _doc.createElement("INPUT");
					input.type = "file";
					if (multiselect && (nexacro.Browser != "Edge" && nexacro.Browser != "IE")) {
						input.multiple = multiselect;
					}
					input.name = input_id;

					input._callbackList = [{
						target : pThis, 
						callback : callback_fn
					}];
					manager.formlist[form.idx].inputlist.push(input);

					node.appendChild(input);
					nexacro._observeSysEvent(input, "change", "onchange", nexacro._fileinputhandler_onchange_forward);
				}
				pThis._input_node = input;
			};

			nexacro._remove_hidden_item = function (form_id, input_id) {
				var manager = nexacro._IframeManager;
				var form = manager.search_form(form_id);
				if (form && form.node) {
					var input = manager.search_input(form, input_id);
					if (input && input.node) {
						nexacro._stopSysObserving(input.node, "change", "onchange", nexacro._fileinputhandler_onchange_forward);
						nexacro.__removeDOMNode(form.node, input.node);
						manager.formlist[form.idx].inputlist.splice(input.idx, 1);
					}
				}
			};
		}

		nexacro._submit = function (form_id, action) {
			var manager = nexacro._IframeManager;
			var form = manager.search_form(form_id);
			if (form && form.node) {
				var node = form.node;
				node.action = action;
				node.submit();
			}
		};

		nexacro._setImportCommand = function (comp_name, item_comp_name, item_comp, handle, value) {
			var manager = nexacro._IframeManager;
			if (manager) {
				var input = manager.search_input(manager.search_form(comp_name), item_comp_name);
				if (input) {
					input.node.value = value;
				}
				else {
					return false;
				}
			}
			return true;
		};

		nexacro._append_hidden_textitem = function (form_id, input_id) {
			var _doc;
			_doc = nexacro._managerFrameDoc;
			var manager = nexacro._IframeManager;
			var form = manager.search_form(form_id);
			var input = null;
			if (form && form.node) {
				var node = form.node;
				input = _doc.createElement("INPUT");
				input.type = "text";
				input.name = input_id;

				manager.formlist[form.idx].inputlist.push(input);

				node.appendChild(input);
			}
		};

		nexacro._fileinputhandler_onchange = function (node) {
			var value = "";
			var path = "";
			var index = -1;
			var node_value = node.value;
			var files = node.files;
			if (node.multiple) {
				var fLen = files.length;
				if (fLen > 0) {
					value = path + files[0].name;
					for (var j = 1; j < fLen; j++) {
						value += ", " + path + files[j].name;
					}
				}
			}
			else {
				value = node_value;
			}

			if (node._callbackList) {
				var cnt = 0, callbackitem = null;
				var callbacklist = node._callbackList;
				if (callbacklist) {
					cnt = callbacklist.length;
				}
				for (var i = 0; i < cnt; i++) {
					callbackitem = callbacklist[i];
					if (files) {
						callbackitem.target._changeFiles(files);
					}
					callbackitem.callback.call(callbackitem.target, value);
				}
			}
		};

		nexacro._fileinputhandler_onload = function (node) {
			if (node._callbackList) {
				var cnt = 0;
				var callbacklist = node._callbackList;
				if (callbacklist) {
					cnt = callbacklist.length;
				}
				for (var i = 0; i < cnt; i++) {
					callbacklist[i].callback.call(callbacklist[i].target);
				}
			}
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion <= "8") {
				nexacro._fileinputhandler_onchange_forward = function (evt) {
					var target = evt.srcElement;
					nexacro._fileinputhandler_onchange(target);
				};
			}
			else {
				nexacro._fileinputhandler_onchange_forward = function (evt) {
					var target = evt.srcElement;
					nexacro._fileinputhandler_onchange(target);
				};
			}

			nexacro._fileinputhandler_onload_forward = function (evt) {
				var target = evt.srcElement;
				nexacro._fileinputhandler_onload(target);
			};
		}
		else {
			nexacro._fileinputhandler_onchange_forward = function (evt) {
				var target = evt.target;
				nexacro._fileinputhandler_onchange(target);
			};
			nexacro._fileinputhandler_onload_forward = function (evt) {
				var target = evt.target;
				nexacro._fileinputhandler_onload(target);
			};
		}

		nexacro._filedownload_iframe = null;

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__createHttpRequest = function (win_handle) {
				var _ajax = {
				};
				_ajax._destroy = nexacro._emptyFn;
				_ajax._handle = new nexacro._getXmlParser();
				return _ajax;
			};
		}
		else {
			nexacro.__createHttpRequest = function (win_handle) {
				var _ajax = {
				};
				_ajax._destroy = nexacro._emptyFn;
				if (win_handle) {
					_ajax._handle = new win_handle.XMLHttpRequest();
				}
				else {
					_ajax._handle = new XMLHttpRequest();
				}

				return _ajax;
			};
		}

		nexacro.__createFakeHttpRequest = function (ndatatype, compress) {
			if (nexacro._isHybrid && nexacro._isHybrid()) {
				var _ajax = {
				};
				_ajax._destroy = function () {
					if (this._handle) {
						this._handle.destory();
					}
				};
				_ajax._handle = new nexacro.FakeXMLHttpRequest("FakeXMLHttpRequest", this, ndatatype, compress);
				return _ajax;
			}
			else {
				return nexacro.__createHttpRequest(win_handle);
			}
		};
		nexacro.__checkAjaxSuccess = function (ajax) {
			var ajax_handle = ajax._handle;
			if (ajax_handle.readyState == 4) {
				var statusNum = ajax_handle.status || 200;
				return (statusNum >= 200 && statusNum < 300) ? statusNum : -statusNum;
			}
			ajax_handle = null;
			return 0;
		};
		nexacro.__checkAjaxStatus = function (ajax) {
			var ajax_handle = ajax._handle;
			var ajaxstatus = ajax_handle.readyState;
			if (ajaxstatus == 4) {
				if (ajax._protocol != 2) {
					if (ajax_handle.status == 0 && ajax_handle.statusText == "") {
						return 0;
					}
				}

				var statusNum = ajax_handle.status || 200;
				ajax_handle = null;
				return (statusNum >= 200 && statusNum < 300) ? statusNum : -statusNum;
			}
			else {
				ajax_handle = null;
				return ajaxstatus == 0 ? 1 : ajaxstatus;
			}
		};

		nexacro.__httpErrorTable = 
			{
			301 : -0x1004A, 
			302 : -0x1004B, 
			305 : -0x1004D, 
			307 : -0x1004E, 
			400 : -0x1003B, 
			401 : -0x10042, 
			402 : -0x10043, 
			403 : -0x10044, 
			404 : -0x1003C, 
			405 : -0x1003D, 
			406 : -0x10045, 
			407 : -0x10046, 
			408 : -0x10047, 
			500 : -0x1003E, 
			503 : -0x1003F, 
			499 : -0x10040, 
			599 : -0x10041, 
			0 : 0
		};

		nexacro.__getHttpErrorCode = function (statuscode) {
			var errorcode = this.__httpErrorTable[statuscode];
			if (!errorcode) {
				if (statuscode < 500) {
					errorcode = "0x80010040";
				}
				else {
					errorcode = "0x80010041";
				}
			}
			return errorcode;
		};

		nexacro.__bindLoadModuleHandler = function (_ajax, pthis) {
			return function () {
				if (!_ajax || !_ajax._handle) {
					return;
				}
				var ajax_handle = _ajax._handle;
				var is_abort = _ajax.aborted;
				var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
				if (status > 0) {
					if (status >= 4) {
						var cookie = "";
						if (pthis.context) {
							if (pthis.context._is_component) {
								cookie = pthis.context._getWindow()._doc.cookie;
							}
							else {
								cookie = document ? document.cookie : null;
							}
						}
						var data = ajax_handle.responseText;
						var last_modified = ajax_handle.getResponseHeader("Last-Modified");
						pthis.on_load_module(data, cookie, last_modified);
						_ajax._destroy();
						_ajax = null;
						pthis = null;
					}
				}
				else {
					if (status == -304) {
						var cookie = "";
						if (pthis.context) {
							if (pthis.context._is_component) {
								cookie = pthis.context._getWindow()._doc.cookie;
							}
							else {
								cookie = document ? document.cookie : null;
							}
						}

						pthis.bcache = false;
						var m_cache = nexacro._CacheList[pthis.path];
						pthis.on_load_module(m_cache.data, cookie, m_cache.last_modified);
					}
					else {
						var errcode = nexacro.__getHttpErrorCode(-status);

						var locationurl = "";
						pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
					}
					_ajax._destroy();
					_ajax = null;
					pthis = null;
				}
				ajax_handle = null;
			};
		};
		nexacro.__bindLoadTextHandler = function (_ajax, pthis) {
			return function () {
				if (!_ajax || !_ajax._handle) {
					return;
				}
				var ajax_handle = _ajax._handle;
				var is_abort = _ajax.aborted;
				var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
				if (status > 0) {
					if (status >= 4) {
						var cookie = "";
						if (pthis.context) {
							if (pthis.context._is_component) {
								cookie = pthis.context._getWindow()._doc.cookie;
							}
							else {
								cookie = document ? document.cookie : null;
							}
						}
						var data = ajax_handle.responseText;
						var last_modified = ajax_handle.getResponseHeader("Last-Modified");
						pthis.on_load_text(data, cookie, last_modified);
						_ajax._destroy();
						_ajax = null;
						pthis = null;
					}
				}
				else {
					if (_ajax._user_aborted) {
						pthis.on_error(0, "comm_cancel_byuser");
					}
					else if (status == -304) {
						var cookie = "";
						if (pthis.context) {
							if (pthis.context._is_component) {
								cookie = pthis.context._getWindow()._doc.cookie;
							}
							else {
								cookie = document ? document.cookie : null;
							}
						}

						pthis.bcache = false;
						var m_cache = nexacro._CacheList[pthis.path];
						pthis.on_load_text(m_cache.data, cookie, m_cache.last_modified);
					}
					else {
						var errcode = nexacro.__getHttpErrorCode(-status);
						var locationurl = "";
						pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
					}
					_ajax._destroy();
					_ajax = null;
					pthis = null;
				}
				ajax_handle = null;
			};
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			nexacro.__checkloadData = function (xmlstr) {
				if (xmlstr) {
					var chkstr = xmlstr.substring(0, 5);
					if (chkstr.indexOf("xml") >= 0) {
						return true;
					}
				}
				return false;
			};

			nexacro.__bindLoadDataHandler = function (_ajax, pthis) {
				return function () {
					if (!_ajax || !_ajax._handle) {
						return;
					}
					var ajax_handle = _ajax._handle;
					var is_abort = _ajax.aborted;
					var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
					if (status > 0) {
						try {
							if (status >= 4) {
								var _doc = null;
								var cookie = "";
								var last_modified = ajax_handle.getResponseHeader("Last-Modified");

								if (pthis.context) {
									if (pthis.context._is_component) {
										cookie = pthis.context._getWindow()._doc.cookie;
									}
									else {
										cookie = document ? document.cookie : null;
									}
								}
								if (pthis._check_responseXML) {
									_doc = ajax_handle.responseXML;
									if (_doc && _doc.childNodes && _doc.childNodes.length > 0) {
										pthis.on_load_xmldom(_doc, cookie, last_modified);
									}
									else {
										var data = ajax_handle.responseText;
										if (data) {
											pthis.on_load_data(data, cookie, last_modified);
										}
										else {
											pthis.on_load_data("", cookie, last_modified);
										}
									}
								}
								else {
									var data = ajax_handle.responseText;
									if (data) {
										pthis.on_load_data(data, cookie, last_modified);
									}
									else {
										pthis.on_load_data("", cookie, last_modified);
									}
								}

								_doc = null;
								_ajax._destroy();
								_ajax = null;
								pthis = null;
							}
						}
						catch (e) {
							var err_code = -1;
							var err_message = "";
							var err_type = "comm_fail_unknown";

							if (e) {
								err_code = e.number;
								err_message = e.message;
							}

							application.addErrorMessage(system._language, err_type, err_message);

							pthis.on_error(err_code, err_type, err_code, "");
							_ajax._destroy();
							_ajax = null;
							pthis = null;
						}
					}
					else {
						if (_ajax._user_aborted) {
							pthis.on_error(0, "comm_cancel_byuser");
						}
						else {
							var errcode = nexacro.__getHttpErrorCode(-status);
							var locationurl = "";
							pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
						}
						_ajax._destroy();
						_ajax = null;
						pthis = null;
					}

					ajax_handle = null;
				};
			};
		}
		else {
			nexacro.__bindLoadDataHandler = function (_ajax, pthis) {
				return function () {
					if (!_ajax || !_ajax._handle) {
						return;
					}
					var ajax_handle = _ajax._handle;
					var is_abort = _ajax.aborted;

					var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
					if (status > 0) {
						try {
							if (status >= 4) {
								var _doc = null;
								var cookie = "";
								var last_modified = ajax_handle.getResponseHeader("Last-Modified");

								if (pthis.context) {
									if (pthis.context._is_component) {
										cookie = pthis.context._getWindow()._doc.cookie;
									}
									else {
										cookie = document ? document.cookie : null;
									}
								}
								var data = ajax_handle.responseText;
								if (!data) {
									data = "";
								}

								if (!data && pthis._check_responseXML) {
									_doc = ajax_handle.responseXML;
									if (_doc) {
										pthis.on_load_xmldom(_doc, cookie, last_modified);
									}
									else {
										pthis.on_load_data("", cookie, last_modified);
									}
								}
								else {
									pthis.on_load_data(data, cookie, last_modified);
								}
								_ajax._destroy();
								_ajax = null;
								pthis = null;
							}
							else if (status == 3) {
								if (pthis instanceof nexacro.TransactionItem) {
									if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 10) {
										return;
									}

									if (pthis._is_unknowntype_data) {
										return;
									}

									if (pthis._progress_data && !pthis._progress_data._needParseForFirstCount()) {
										return;
									}

									if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
										pthis._progress_cnt++;
										if (pthis._progress_cnt > 3 && (pthis._progress_cnt % 30) != 3) {
											return;
										}
									}

									var data = ajax_handle.responseText;
									if (!data) {
										data = "";
									}

									pthis.on_progress_data(data, false);
								}
							}
						}
						catch (e) {
							var err_code = -1;
							var err_message = "";
							var err_type = "comm_fail_unknown";

							if (e) {
								err_code = e.number;
								err_message = e.message;
							}

							application.addErrorMessage(system._language, err_type, err_message);

							pthis.on_error(err_code, err_type, err_code, "");
							_ajax._destroy();
							_ajax = null;
							pthis = null;
						}
					}
					else {
						if (_ajax._user_aborted) {
							pthis.on_error(0, "comm_cancel_byuser");
						}
						else {
							var errcode = nexacro.__getHttpErrorCode(-status);
							var locationurl = "";
							pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
						}
						_ajax._destroy();
						_ajax = null;
						pthis = null;
					}

					ajax_handle = null;
				};
			};
		}

		nexacro.__bindLoadUpdateHandler = function (_ajax, pthis) {
			return function () {
				if (!_ajax || !_ajax._handle) {
					return;
				}
				var ajax_handle = _ajax._handle;
				var is_abort = _ajax.aborted;
				var status = (is_abort ? -1 : nexacro.__checkAjaxStatus(_ajax));
				if (status > 0) {
					if (status >= 4) {
						var cookie = "";
						if (pthis.context) {
							if (pthis.context._is_component) {
								cookie = pthis.context._getWindow()._doc.cookie;
							}
							else {
								cookie = document ? document.cookie : null;
							}
						}

						var data = ajax_handle.responseText;
						pthis.on_load_update(data, cookie);
						_ajax._destroy();
						_ajax = null;
						pthis = null;
					}
				}
				else {
					var errcode = nexacro.__getHttpErrorCode(-status);

					var locationurl = "";
					pthis.on_error(errcode, "comm_fail_loaddetail", -status, locationurl);
					_ajax = null;
					pthis = null;
				}
				_ajax._destroy();
				ajax_handle = null;
			};
		};

		nexacro.__startCommunication = function (loadItem, path, cachelevel, async, referer, senddata, ndatatype, compress, ver, failpass, service) {
			var _ajax;
			if (loadItem.type == "data" && nexacro._isHybrid() && ndatatype == 1) {
				_ajax = nexacro.__createFakeHttpRequest(ndatatype, compress);
			}
			else {
				_ajax = nexacro.__createHttpRequest();
			}

			var ajax_handle = _ajax._handle;

			if (path.indexOf("://") > -1) {
				var ar = path.split("://");
				var protocol = ar[0];
				switch (protocol) {
					case "http":
						_ajax._protocol = 0;
						break;
					case "https":
						_ajax._protocol = 1;
						break;
					case "file":
						_ajax._protocol = 2;
						break;
					default:
						_ajax._protocol = -1;
						break;
				}
			}

			var bindfn = null;
			var method = "GET";
			var mime_xml = false;

			if (loadItem.type == "module") {
				bindfn = nexacro.__bindLoadModuleHandler(_ajax, loadItem);
			}
			else if (loadItem.type == "data") {
				bindfn = nexacro.__bindLoadDataHandler(_ajax, loadItem);
				method = loadItem._http_method ? loadItem._http_method : "POST";
				mime_xml = true;
			}
			else if (loadItem.type == "text") {
				bindfn = nexacro.__bindLoadTextHandler(_ajax, loadItem);
			}
			else {
				bindfn = nexacro.__bindLoadUpdateHandler(_ajax, loadItem);
			}

			if (async) {
				ajax_handle.onreadystatechange = bindfn;
			}

			try {
				ajax_handle.open(method, path, !!async);
			}
			catch (e) {
				loadItem.on_error(e.number, "comm_fail_loaddetail", e.number);
				_ajax = null;
				return null;
			}

			if (mime_xml) {
				ajax_handle.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				ajax_handle.setRequestHeader("Accept", "application/xml, text/xml, */*");
				ajax_handle.setRequestHeader("Content-Type", "text/xml");
			}

			var header_vars = application._header_variables;
			var header_vars_len = header_vars.length;
			if (header_vars_len > 0) {
				var header_id, header_value;
				for (var i = 0; i < header_vars_len; i++) {
					header_id = header_vars[i];
					header_value = application[header_id];
					if (header_id && header_value) {
						ajax_handle.setRequestHeader(header_id, header_value);
					}
				}
			}

			if (service) {
				if (service.cachelevel == "none") {
					ajax_handle.setRequestHeader("cache-control", "no-cache, no-store");
					ajax_handle.setRequestHeader("Pragma", "no-cache");
					ajax_handle.setRequestHeader("If-Modified-Since", "Thu, 01 Jun 1970 00:00:00 GMT");
					ajax_handle.setRequestHeader("Expires", -1);
				}
				else {
					if (loadItem.last_modified) {
						ajax_handle.setRequestHeader("cache-control", "no-cache");
						ajax_handle.setRequestHeader("If-Modified-Since", loadItem.last_modified);
					}
				}
			}

			try {
				if (async) {
					if (ajax_handle.timeout != undefined && application.httptimeout >= 0 && application.httptimeout <= 2147483) {
						ajax_handle.timeout = application.httptimeout * 1000;
					}
				}
				ajax_handle.send(senddata ? senddata : null);
				if (!async) {
					bindfn(_ajax, loadItem);
				}
			}
			catch (e) {
				if (_ajax._user_aborted) {
					loadItem.on_error(e.number, "comm_stop_transaction_byesc");
				}
				else {
					loadItem.on_error(e.number, "comm_fail_loaddetail", e.number);
				}
				return null;
			}
			ajax_handle = null;
			return _ajax;
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 6) {
			nexacro.__cancelCommunication = function (_ajax) {
				var ajax_handle = _ajax._handle;
				_ajax.aborted = true;
				ajax_handle.abort();
				ajax_handle = null;
				return false;
			};
		}
		else {
			nexacro.__cancelCommunication = function (_ajax) {
				var ajax_handle = _ajax._handle;
				_ajax.aborted = true;
				ajax_handle.abort();
				ajax_handle = null;
				return false;
			};
		}

		nexacro._convertDatasetSSVToBIN = function (ssvdata) {
		};
		nexacro._convertDatasetBINToSSV = function (bindata) {
		};

		nexacro._convertStreamSSVToBIN = function (ssvdata) {
		};
		nexacro._convertStreamBINToSSV = function (bindata) {
		};

		nexacro._completedUpdateResource = nexacro._emptyFn;
		nexacro.__plugincallMethod = nexacro._emptyFn;

		nexacro.__openSystemCalendar = nexacro._emptyFn;
		nexacro.__closeSystemCalendar = nexacro._emptyFn;

		nexacro._ProgressData = function (parent) {
			this._data_buffer = "";
			this._cur_idx = 0;

			this._received_data_length = 0;
			this._parent = parent;
			this._rs;
			this._cs;

			this._data_type = null;
			this._parse_mode = 0;
			this._load_completed = false;

			this._parameters = [];
			this._datasets = {
			};
			this._cur_dataset_id = "";

			this._error_info = [0, "SUCCESS"];

			this._parsing_min_size = 1024 * 4;

			this._init();
		};

		var _pProgressData = nexacro._createPrototype(nexacro.Object, nexacro._ProgressData);
		nexacro._ProgressData.prototype = _pProgressData;

		_pProgressData._init = function () {
			var out_datasets = this._parent.outputDatasets;
			var form = this._parent.context;

			if (out_datasets && out_datasets.length) {
				var outDataCnt = out_datasets.length;

				for (var i = 0; i < outDataCnt; i++) {
					var param = out_datasets[i];
					if (!this._datasets[param.rval]) {
						var ds = form._getDatasetObject(param.lval);
						if (ds) {
							this._datasets[param.rval] = {
								_isEnable : false, 
								_target_ds : ds, 
								_firefirstcount : ds.firefirstcount, 
								_is_loaded : false, 
								_is_loaded_firstcount : (ds.firefirstcount > 0) ? false : true, 
								_is_first_load : true, 
								_useclientlayout : ds.useclientlayout, 
								_viewrecords_length : 0, 

								_next_record_idx : 0, 

								_ds_start_idx : -1, 
								_ds_end_idx : -1, 

								_row_start_idx : -1, 
								_firstrow_end_idx : -1, 
								_row_end_idx : -1, 

								_colinfo_start_idx : -1, 
								_colinfo_end_idx : -1
							};
						}
					}
				}
			}
		};

		_pProgressData._applyChange_inputDataset = function () {
			var in_datasets = this._parent.inputDatasets;
			var form = this._parent.context;

			if (in_datasets && in_datasets.length) {
				var in_ds_cnt = in_datasets.length;
				for (var i = 0; i < in_ds_cnt; i++) {
					var param = in_datasets[i];
					var ds = form._getDatasetObject(param.rval);
					if (ds) {
						ds.applyChange();
					}
				}
			}
		};

		_pProgressData._on_progress = function (data, bFinal) {
			var received_len = data.length - this._received_data_length;

			if (!bFinal && (received_len < this._parsing_min_size)) {
				return;
			}

			this._received_data_length = data.length;
			var error_cd = this._error_info[0];
			if (error_cd >= 0) {
				this._parse(data, bFinal);
			}
		};

		_pProgressData._needParseForFirstCount = function () {
			for (var buff_ds in this._datasets) {
				if (!this._datasets[buff_ds]._is_loaded_firstcount) {
					return true;
				}
			}
			return false;
		};

		_pProgressData._appendData = function (data) {
			if (!data) {
				return;
			}

			if (nexacro.Browser == "Runtime") {
				this._data_buffer[this._data_buffer.length] = data;
				this._received_data_length += data.length;
			}
		};

		_pProgressData._parseHeader = function (data) {
			var n = -1;
			var rs_len = 0;

			if (this._rs instanceof Array) {
				var rss = this._rs;
				var i;
				for (i = 0; i < rss.length; i++) {
					var rs = rss[i];
					n = data.indexOf(rs, this._cur_idx);
					if (n >= 0) {
						rs_len = this._rs[i].length;
						this._rs = this._rs[i];
						break;
					}
				}
			}
			else {
				n = data.indexOf(this._rs, this._cur_idx);
				rs_len = this._rs.length;
			}

			if (n >= 0) {
				this._cur_idx = n + rs_len;
			}
			else {
				return false;
			}

			return true;
		};

		_pProgressData._parseParameters = function (data) {
			var line = "";
			var n = -1;
			var rs_len = 0;

			if (this._rs instanceof Array) {
				var rss = this._rs;
				var i;
				for (i = 0; i < rss.length; i++) {
					var rs = rss[i];
					n = data.indexOf(rs, this._cur_idx);
					if (n >= 0) {
						rs_len = this._rs[i].length;
						break;
					}
				}
			}
			else {
				n = data.indexOf(this._rs, this._cur_idx);
				rs_len = this._rs.length;
			}

			if (n >= 0) {
				line = data.substring(this._cur_idx, n);
			}
			else {
				return false;
			}

			this._cur_idx = n + rs_len;

			var param_arr = line.split(this._cs);
			var param_cnt = param_arr.length;
			var form = this._parent.context;

			for (var i = 0; i < param_cnt; i++) {
				var param_str = param_arr[i];
				if (this._data_type == "CSV") {
					if (param_str.charAt(0) == "\"" || param_str.charAt(0) == "\'") {
						param_str = param_str.substring(1, param_str.length - 1);
					}
				}
				var varInfo = param_str;
				var val = undefined;
				var sep_pos = param_str.indexOf("=");
				if (sep_pos >= 0) {
					varInfo = param_str.substring(0, sep_pos);
					val = param_str.substring(sep_pos + 1);
					if (val == String.fromCharCode(3)) {
						val = undefined;
					}
				}

				if (varInfo) {
					var id = varInfo;
					var sep_pos = varInfo.indexOf(":");
					if (sep_pos >= 0) {
						id = varInfo.substring(0, sep_pos);
					}

					if (id == "ErrorCode") {
						var code = parseInt(val) | 0;
						if (isFinite(code) == false) {
							val = -1;
						}
						else {
							val = code;
						}

						this._error_info[0] = val;
					}
					else if (id == "ErrorMsg") {
						this._error_info[1] = val;
					}
					else if (id in form) {
						if (typeof (form[id]) != "object") {
							form[id] = val;
						}
					}
					else {
						if (application._existVariable(id)) {
							application[id] = val;
						}
					}

					this._parameters[this._parameters.length] = {
						id : id, 
						value : val
					};
				}
			}

			if (this._error_info[0] >= 0) {
				this._applyChange_inputDataset();
			}

			return true;
		};

		_pProgressData._parseDataset = function (data) {
			var line = "";
			var rs_len = 0;
			if (this._rs instanceof Array) {
				var rss = this._rs;
				var i;
				for (i = 0; i < rss.length; i++) {
					var rs = rss[i];
					n = data.indexOf(rs, this._cur_idx);
					if (n >= 0) {
						rs_len = this._rs[i].length;
						break;
					}
				}
			}
			else {
				n = data.indexOf(this._rs, this._cur_idx);
				rs_len = this._rs.length;
			}

			if (n >= 0) {
				line = data.substring(this._cur_idx, n);
			}
			else {
				return false;
			}

			if (this._cur_dataset_id) {
				var cur_buffer_obj = this._datasets[this._cur_dataset_id];
				cur_buffer_obj._row_end_idx = this._cur_idx - rs_len;
			}

			var sep_pos = line.indexOf(":");
			if (sep_pos > 0) {
				var remoteId = line.substring(sep_pos + 1);
				if (remoteId && remoteId.length) {
					var buffer_obj = this._datasets[remoteId];
					if (buffer_obj) {
						buffer_obj._isEnable = true;
						this._cur_dataset_id = remoteId;

						buffer_obj._ds_start_idx = this._cur_idx;
						buffer_obj._ds_end_idx = this._cur_idx + n;
					}
					else {
						this._cur_dataset_id = "";
						this._parse_mode = 9;
					}
				}
			}

			this._cur_idx = n + rs_len;
			return true;
		};

		_pProgressData._parseColInfo = function (data) {
			var rs_len = 0;
			if (this._rs instanceof Array) {
				var rss = this._rs;
				var i;
				for (i = 0; i < rss.length; i++) {
					var rs = rss[i];
					n = data.indexOf(rs, this._cur_idx);
					if (n >= 0) {
						rs_len = this._rs[i].length;
						break;
					}
				}
			}
			else {
				n = data.indexOf(this._rs, this._cur_idx);
				rs_len = this._rs.length;
			}


			if (n > 0) {
				if (this._cur_dataset_id) {
					var buffer_obj = this._datasets[this._cur_dataset_id];
					if (buffer_obj._colinfo_start_idx < 0) {
						buffer_obj._colinfo_start_idx = this._cur_idx;
					}

					buffer_obj._colinfo_end_idx = n;
				}
			}
			else {
				this._parse_mode = 3;
				return false;
			}

			this._cur_idx = n + rs_len;

			return true;
		};

		_pProgressData._parseRecord = function (data) {
			var n = -1;
			var rs_len = 0;
			if (this._rs instanceof Array) {
				var rss = this._rs;
				var i;
				for (i = 0; i < rss.length; i++) {
					var rs = rss[i];
					n = data.indexOf(rs, this._cur_idx);
					if (n >= 0) {
						rs_len = rs.length;
						break;
					}
				}
			}
			else {
				n = data.indexOf(this._rs, this._cur_idx);
				rs_len = this._rs.length;
			}

			if (n < 0) {
				return false;
			}

			var buffer_obj;
			if (this._cur_dataset_id) {
				buffer_obj = this._datasets[this._cur_dataset_id];
				var firstcount = buffer_obj._firefirstcount;

				if (buffer_obj._row_start_idx < 0) {
					buffer_obj._row_start_idx = this._cur_idx;
				}

				if (this._data_type == "SSV" || this._data_type == "PPX") {
					var rowtype = data.charAt(this._cur_idx);
					if (rowtype != "d" || rowtype != "D") {
						buffer_obj._viewrecords_length++;
					}
				}
				else {
					buffer_obj._viewrecords_length++;
				}
			}

			this._cur_idx = n + rs_len;

			if (buffer_obj && buffer_obj._viewrecords_length == firstcount && firstcount > 0) {
				buffer_obj._firstrow_end_idx = n;
				return false;
			}

			return true;
		};


		_pProgressData._parse = function (data, bFinal) {
			var bLoop = true;
			var pre_parse_mode;
			var rows_buffer, buffer_obj, ds, lines, line_idx;

			while (bLoop) {
				pre_parse_mode = this._parse_mode;
				bLoop = this._setNextParseMode(data);
				if (pre_parse_mode == 2 && this._parse_mode != 2) {
					if (this._error_info[0] < 0) {
						bLoop = false;
					}
				}

				if (!bLoop) {
					break;
				}

				switch (this._parse_mode) {
					case 0:
						break;
					case 1:
						bLoop = this._parseHeader(data);
						break;
					case 2:
						bLoop = this._parseParameters(data);
						break;
					case 3:
						bLoop = this._parseDataset(data);
						break;
					case 4:
					case 5:
						bLoop = this._parseColInfo(data);
						break;
					case 6:
						bLoop = this._parseRecord(data);

						if (!bLoop) {
							var buffer_obj = this._datasets[this._cur_dataset_id];
							if (buffer_obj && buffer_obj._viewrecords_length == buffer_obj._firefirstcount && !buffer_obj._is_loaded_firstcount) {
								this._on_fire_onload(data, buffer_obj, 1);

								buffer_obj._is_loaded_firstcount = true;
								bLoop = true;
							}
						}
						break;
					case 9:
						break;
					case 10:
						var buffer_obj = this._datasets[this._cur_dataset_id];
						if (!buffer_obj._isEnable) {
							continue;
						}

						this._on_fire_onload(data, buffer_obj, 0);
						buffer_obj._is_loaded = true;
						this._parse_mode = 9;
						break;
					default:
						break;
				}
			}

			if (bFinal) {
				for (var val in this._datasets) {
					buffer_obj = this._datasets[val];
					if (!buffer_obj._isEnable || buffer_obj._is_loaded) {
						if (!this._parent.bcache) {
							this._datasets[val] = null;
						}
						continue;
					}

					this._on_fire_onload(data, buffer_obj, 0);
					if (!this._parent.bcache) {
						this._datasets[val] = null;
					}
				}

				this._data_buffer = null;
			}
		};

		_pProgressData._on_fire_onload = function (data, bufferObj, nLoadType) {
			var ds = bufferObj._target_ds;
			if (nLoadType == 1) {
				var buff = data.slice(bufferObj._colinfo_start_idx, bufferObj._firstrow_end_idx);
			}
			else {
				if (bufferObj._row_end_idx < 0) {
					bufferObj._row_end_idx = data.length - 1;
				}
				var buff = data.slice(bufferObj._colinfo_start_idx, bufferObj._row_end_idx);
			}

			var rs = "";
			if (this._rs instanceof Array) {
				rs = this._rs.join("|");
			}
			else {
				rs = this._rs;
			}

			var lines = buff.split(new RegExp(rs));
			buff = null;

			ds.rowposition = -1;
			switch (this._data_type) {
				case "CSV":
					var colLine = lines[0];
					lines.splice(0, 1);
					line_idx = ds._loadFromCSVArray(colLine, lines, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
					break;
				case "SSV":
					var colLines = ds._getColLinesFromSSVLines(lines, 0);
					lines.splice(0, colLines.length);
					line_idx = ds._loadFromSSVArray(colLines, lines, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
					break;
				case "PPX":
					var colLines = ds._getColLinesFromPPXLines(lines, 0);
					lines.splice(0, colLines.length);
					line_idx = ds._loadFromPPXArray(colLines, lines, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
					break;
				default:
					break;
			}
			bufferObj._is_first_load = false;

			if (nLoadType == 0 && !bufferObj._is_loaded_firstcount) {
				bufferObj._is_loaded_firstcount = true;
			}
			lines = null;

			if (ds.colinfos) {
				ds._reFilter();
				ds._resetSortGroup();
			}

			if (ds._eventstat) {
				ds.on_fire_onload(0, "", nLoadType);
				if (ds._viewRecords && ds._viewRecords.length > 0) {
					ds._forcesetRowPosition(0, 51);
				}
				else {
					ds._forcesetRowPosition(-1, 51);
				}
			}
			else if (ds._viewRecords && ds._viewRecords.length > 0) {
				ds.rowposition = 0;
			}

			bufferObj._next_record_idx = line_idx;
		};

		_pProgressData._parseConstColInfo = nexacro._emptyFn;
		_pProgressData._setNextParseMode = nexacro._emptyFn;

		delete _pProgressData;

		nexacro._ProgressDataCSV = function (parent) {
			nexacro._ProgressData.call(this, parent);
			this._data_type = "CSV";

			this._rs = ["\r\n", "\n"];
			this._cs = ",";
		};

		var _pProgressDataCSV = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataCSV);
		nexacro._ProgressDataCSV.prototype = _pProgressDataCSV;

		_pProgressDataCSV._setNextParseMode = function (data) {
			var sec_type_max_len = 10;
			var sec = data.substr(this._cur_idx, sec_type_max_len).toUpperCase();

			if (this._parse_mode == 0) {
				this._parse_mode = 1;
			}
			else if (sec.indexOf("DATASET") == 0) {
				this._parse_mode = 3;
			}
			else {
				switch (this._parse_mode) {
					case 0:
						break;
					case 1:
						this._parse_mode = 2;
						break;
					case 2:
						break;
					case 3:
						this._parse_mode = 5;
						break;
					case 5:
						this._parse_mode = 6;
						break;
					case 6:
						var buffer_obj = this._datasets[this._cur_dataset_id];

						if (buffer_obj._is_loaded_firstcount) {
							var buff = data.slice(this._cur_idx, data.length);
							var n = -1;
							var rss = this._rs;
							for (var i = 0; i < rss.length; i++) {
								var rs = rss[i];
								var regexp = new RegExp(rs + "dataset", "gi");
								n = buff.search(regexp);
								if (n >= 0) {
									break;
								}
							}

							if (n >= 0) {
								buffer_obj._row_end_idx = this._cur_idx + n;
								this._cur_idx += n + rs.length;
								this._parse_mode = 10;
							}
							else {
								this._cur_idx = data.length - 1;
								buffer_obj._row_end_idx = this._cur_idx - 1;
								return false;
							}
						}
						break;
					case 9:
						var buff = data.slice(this._cur_idx, data.length);
						var rss = this._rs;
						for (var i = 0; i < rss.length; i++) {
							var rs = rss[i];
							var regexp = new RegExp(rs + "dataset", "gi");
							n = buff.search(regexp);
							if (n >= 0) {
								break;
							}
						}

						if (n >= 0) {
							this._cur_idx += n + rs.length;
							this._parse_mode = 3;
						}
						else {
							this._cur_idx = data.length - 1;
							return false;
						}
						break;
					default:
						return false;
				}
			}
			return true;
		};

		delete _pProgressDataCSV;

		nexacro._ProgressDataSSV = function (parent) {
			nexacro._ProgressData.call(this, parent);
			this._data_type = "SSV";

			this._rs = String.fromCharCode(30);
			this._cs = String.fromCharCode(31);
		};

		var _pProgressDataSSV = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataSSV);
		nexacro._ProgressDataSSV.prototype = _pProgressDataSSV;

		_pProgressDataSSV._setNextParseMode = function (data) {
			var sec_type_max_len = 10;
			var sec = data.substr(this._cur_idx, sec_type_max_len).toUpperCase();

			if (this._parse_mode == 0) {
				this._parse_mode = 1;
			}
			else if (sec.indexOf("DATASET") == 0) {
				this._parse_mode = 3;
			}
			else if (sec.indexOf("JSONOBJECT") == 0) {
				this._parse_mode = 7;
			}
			else {
				switch (this._parse_mode) {
					case 0:
						break;
					case 1:
						this._parse_mode = 2;
						break;
					case 2:
						break;
					case 3:
						if (sec.indexOf("_CONST_") == 0) {
							this._parse_mode = 4;
						}
						else {
							this._parse_mode = 5;
						}
						break;
					case 4:
						this._parse_mode = 5;
						break;
					case 5:
						this._parse_mode = 6;
						break;
					case 6:
						var buffer_obj = this._datasets[this._cur_dataset_id];
						if (buffer_obj._is_loaded_firstcount) {
							var buff = data.slice(this._cur_idx, data.length);
							var regexp = new RegExp(this._rs + "dataset", "gi");
							var n = buff.search(regexp);
							if (n >= 0) {
								buffer_obj._row_end_idx = this._cur_idx + n;
								this._cur_idx += n + this._rs.length;
								this._parse_mode = 10;
							}
							else {
								this._cur_idx = data.length - 1;
								return false;
							}
						}
						break;
					case 7:
						this._parse_mode = 8;
						break;
					case 8:
						break;
					case 9:
						var buff = data.slice(this._cur_idx, data.length);
						var regexp = new RegExp(this._rs + "dataset", "gi");
						var n = buff.search(regexp);
						if (n >= 0) {
							this._cur_idx += n + this._rs.length;
							this._parse_mode = 3;
						}
						else {
							this._cur_idx = data.length - 1;
							return false;
						}
						break;
					default:
						return false;
				}
			}
			return true;
		};

		delete _pProgressDataSSV;

		nexacro._ProgressDataPPX = function (parent) {
			nexacro._ProgressData.call(this, parent);
			this._data_type = "PPX";

			this._rs = String.fromCharCode(30);
			this._cs = String.fromCharCode(31);
		};

		var _pProgressDataPPX = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataPPX);
		nexacro._ProgressDataPPX.prototype = _pProgressDataPPX;

		_pProgressDataPPX._parseParameters = function (data) {
			var line = "";
			var n = -1;

			n = data.indexOf(this._rs, this._cur_idx);

			if (n >= 0) {
				line = data.substring(this._cur_idx, n);
			}
			else {
				return false;
			}

			this._cur_idx = n + this._rs.length;

			var form = this._parent.context;
			var param_arr = line.split(this._cs);
			var id = param_arr[1];
			var val = param_arr[2];

			if (val == String.fromCharCode(3)) {
				val = undefined;
			}

			if (id == "ErrorCode") {
				code = parseInt(val) | 0;
				if (isFinite(code) == false) {
					val = -1;
				}
				else {
					val = code;
				}

				this._error_info[0] = val;
			}
			else if (id == "ErrorMsg") {
				this._error_info[1] = param_arr[2];
			}
			else if (id in form) {
				if (typeof (form[id]) != "object") {
					form[id] = val;
				}
			}
			else {
				if (application._existVariable(id)) {
					application[id] = val;
				}
			}

			this._parameters[this._parameters.length] = {
				id : id, 
				value : val
			};

			if (this._error_info[0] >= 0) {
				this._applyChange_inputDataset();
			}

			return true;
		};

		_pProgressDataPPX._parseDataset = function (data) {
			var line = "";

			var n = data.indexOf(this._rs, this._cur_idx);
			if (n > 0) {
				line = data.substring(this._cur_idx, n);
			}
			else {
				return false;
			}

			if (this._cur_dataset_id) {
				var cur_buffer_obj = this._datasets[this._cur_dataset_id];
				cur_buffer_obj._row_end_idx = this._cur_idx - this._rs.length;
			}

			var remoteId = line.split(this._cs)[1];
			if (remoteId && remoteId.length) {
				var buffer_obj = this._datasets[remoteId];
				if (buffer_obj) {
					buffer_obj._isEnable = true;
					this._cur_dataset_id = remoteId;

					buffer_obj._ds_start_idx = this._cur_idx;
					buffer_obj._ds_end_idx = this._cur_idx + n;
				}
				else {
					this._cur_dataset_id = "";
					this._parse_mode = 9;
				}
			}

			this._cur_idx = n + this._rs.length;
			return true;
		};

		_pProgressDataPPX._setNextParseMode = function (data) {
			if (this._parse_mode == 0) {
				this._parse_mode = 1;
			}
			else if (data.charAt(this._cur_idx) == "D") {
				this._parse_mode = 3;
			}
			else {
				switch (this._parse_mode) {
					case 0:
						break;
					case 1:
						this._parse_mode = 2;
						break;
					case 2:
						break;
					case 3:
					case 4:
					case 5:
						if (data.charAt(this._cur_idx) == "V") {
							this._parse_mode = 4;
						}
						else if (data.charAt(this._cur_idx) == "C") {
							this._parse_mode = 5;
						}
						else {
							this._parse_mode = 6;
						}
						break;
					case 6:
						var buffer_obj = this._datasets[this._cur_dataset_id];
						if (buffer_obj._is_loaded_firstcount) {
							var buff = data.slice(this._cur_idx, data.length);
							var regexp = new RegExp(this._rs + "D", "gi");
							var n = buff.search(regexp);
							if (n >= 0) {
								buffer_obj._row_end_idx = this._cur_idx + n;
								this._cur_idx += n + this._rs.length;
								this._parse_mode = 10;
							}
							else {
								this._cur_idx = data.length - 1;
								return false;
							}
						}
						break;
					case 9:
						var buff = data.slice(this._cur_idx, data.length);
						var regexp = new RegExp(this._rs + "D", "gi");
						var n = buff.search(regexp);
						if (n >= 0) {
							this._cur_idx += n + this._rs.length;
							this._parse_mode = 3;
						}
						else {
							this._cur_idx = data.length - 1;
							return false;
						}
						break;
					default:
						return false;
				}
			}

			return true;
		};

		delete _pProgressDataPPX;

		nexacro._ProgressDataXML = function (parent) {
			nexacro._ProgressData.call(this, parent);
			this._data_type = "XML";

			this._rs = String.fromCharCode(30);
			this._cs = String.fromCharCode(31);

			this._parameters_start_idx = -1;
			this._parameters_end_idx = -1;

			this._parameters_tag = ["<Parameters>", "</Parameters>", "<Parameters/>"];
			this._dataset_tag = ["<Dataset", "</Dataset>", "<Dataset/>"];
			this._colinfo_tag = ["<ColumnInfo>", "</ColumnInfo>", "<ColumnInfo/>"];
			this._col_tag = ["<Col ", "</Col>", "<Col/>"];
			this._rows_tag = ["<Rows>", "</Rows>", "<Rows/>"];
			this._row_tag = ["<Row", "</Row>", "<Row/>"];
		};

		var _pProgressDataXML = nexacro._createPrototype(nexacro._ProgressData, nexacro._ProgressDataXML);
		nexacro._ProgressDataXML.prototype = _pProgressDataXML;

		_pProgressDataXML._setNextParseMode = function (data) {
			var start_idx, end_idx;

			if (this._parse_mode == 0) {
				this._parse_mode = 1;
			}
			else {
				switch (this._parse_mode) {
					case 0:
						break;
					case 1:
						start_idx = data.indexOf(this._parameters_tag[0], this._cur_idx);

						if (start_idx > -1) {
							this._parameters_start_idx = start_idx;
							this._cur_idx = start_idx;

							var end_idx = data.indexOf(this._parameters_tag[1], this._cur_idx);

							if (end_idx > -1) {
								this._parameters_end_idx = end_idx + this._parameters_tag[1].length;
								this._cur_idx = end_idx + this._parameters_tag[1].length;
								this._parse_mode = 2;
							}
							else {
								return false;
							}
						}
						else {
							start_idx = data.indexOf(this._parameters_tag[2], this._cur_idx);

							if (start_idx > -1) {
								this._parameters_start_idx = start_idx;
								this._parameters_end_idx = start_idx + this._parameters_tag[2].length;
								this._cur_idx += this._parameters_tag[2].length;
							}

							this._parse_mode = 3;
						}
						break;
					case 2:
						start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);

						if (start_idx > -1) {
							this._parse_mode = 3;
						}
						else {
							return false;
						}

						break;
					case 3:
						start_idx = data.indexOf(this._colinfo_tag[0], this._cur_idx);

						if (start_idx > -1) {
							this._parse_mode = 5;
						}
						else {
							return false;
						}

						break;
					case 4:
					case 5:
						start_idx = data.indexOf(this._rows_tag[0], this._cur_idx);
						if (start_idx > -1) {
							this._cur_idx = start_idx + this._rows_tag[0].length;
							this._parse_mode = 6;
						}
						else {
							return false;
						}

						break;
					case 6:
						var buffer_obj = this._datasets[this._cur_dataset_id];
						if (buffer_obj._is_loaded_firstcount) {
							start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);
							if (start_idx >= 0) {
								buffer_obj._row_end_idx = start_idx - 1;
								this._cur_idx = start_idx;
								this._parse_mode = 10;
							}
							else {
								this._cur_idx = data.length - 1;
								return false;
							}
						}
						break;
					case 9:
						start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);
						if (start_idx > -1) {
							this._cur_idx = start_idx;
							this._parse_mode = 3;
						}
						else {
							this._cur_idx = data.length - 1;
							return false;
						}
						break;
					case 33:
						this._parse_mode = 3;
						break;
					default:
						return false;
				}
			}

			return true;
		};

		_pProgressDataXML._parseHeader = function (data) {
			return true;
		};

		_pProgressDataXML._parseParameters = function (data) {
			var form = this._parent.context;

			var parameter_str = data.slice(this._parameters_start_idx, this._parameters_end_idx);
			var params_info = nexacro._getXMLTagData(parameter_str, 0, "<Parameters>", "</Parameters>");

			if (params_info) {
				var paramsData = params_info[0];
				var param_parse_pos = 0;

				var varInfo = nexacro._getXMLTagData2(paramsData, param_parse_pos, "<Parameter ", "</Parameter>");
				while (varInfo) {
					param_parse_pos = varInfo[3];
					var attrStr = varInfo[1];
					var id = nexacro._getXMLAttributeID(attrStr);
					if (id && id.length) {
						var val = varInfo[0];

						if (id == "ErrorCode") {
							var code = parseInt(val) | 0;
							if (isFinite(code) == false) {
								val = -1;
							}
							else {
								val = code;
							}

							this._error_info[0] = val;
						}
						else if (id == "ErrorMsg") {
							val = nexacro._decodeXml(val);
							this._error_info[1] = val;
						}
						else if (id in form) {
							if (!(id in form["all"])) {
								val = nexacro._decodeXml(val);
								form[id] = val;
							}
						}
						else {
							if (application._existVariable(id)) {
								val = nexacro._decodeXml(val);
								application[id] = val;
							}
						}

						this._parameters[this._parameters.length] = {
							id : id, 
							value : val
						};
					}
					varInfo = nexacro._getXMLTagData2(paramsData, param_parse_pos, "<Parameter ", "</Parameter>");
				}
			}

			if (this._error_info[0] >= 0) {
				this._applyChange_inputDataset();
			}

			return true;
		};

		_pProgressDataXML._parseDataset = function (data) {
			var start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);

			if (start_idx < 0) {
				this._parse_mode = 9;
				return false;
			}

			var end_idx = data.indexOf(">", start_idx);

			if (end_idx > -1) {
				var attstr = data.slice(start_idx, end_idx + 1);
				var remoteId = nexacro._getXMLAttributeData(attstr, "id");

				if (this._cur_dataset_id) {
					var cur_buffer_obj = this._datasets[this._cur_dataset_id];
					cur_buffer_obj._row_end_idx = this._cur_idx;
				}

				if (remoteId && remoteId.length) {
					var buffer_obj = this._datasets[remoteId];
					if (buffer_obj) {
						buffer_obj._isEnable = true;
						this._cur_dataset_id = remoteId;

						buffer_obj._ds_start_idx = start_idx;
						buffer_obj._ds_end_idx = end_idx + 1;
					}
					else {
						this._cur_dataset_id = "";
						this._parse_mode = 9;
					}
				}

				this._cur_idx = end_idx + 1;
			}
			else {
				this._parse_mode = 9;
				return false;
			}

			return true;
		};

		_pProgressDataXML._parseColInfo = function (data) {
			var start_idx = data.indexOf(this._colinfo_tag[0], this._cur_idx);

			if (start_idx < 0) {
				return false;
			}

			var end_idx = data.indexOf(this._colinfo_tag[1], start_idx);

			if (end_idx > 0) {
				if (this._cur_dataset_id) {
					var buffer_obj = this._datasets[this._cur_dataset_id];
					if (buffer_obj._colinfo_start_idx < 0) {
						buffer_obj._colinfo_start_idx = start_idx;
					}

					buffer_obj._colinfo_end_idx = end_idx + 1;
				}
			}
			else {
				this._parse_mode = 3;
				return false;
			}

			this._cur_idx = end_idx + 1;

			return true;
		};


		_pProgressDataXML._parseRecord = function (data) {
			var start_idx = data.indexOf(this._row_tag[0], this._cur_idx);
			var end_idx;

			var next_ds_start_idx = data.indexOf(this._dataset_tag[0], this._cur_idx);

			if (next_ds_start_idx > -1 && start_idx > next_ds_start_idx) {
				this._parse_mode = 33;
				return true;
			}

			if (start_idx < 0) {
				start_idx = data.indexOf(this._row_tag[2], this._cur_idx);

				if (start_idx > -1) {
					end_idx = start_idx + this._row_tag[2].length;
				}
				else {
					return false;
				}
			}
			else {
				end_idx = data.indexOf(this._row_tag[1], start_idx);

				if (end_idx > -1) {
					end_idx += this._row_tag[1].length;
				}
				else {
					return false;
				}
			}

			var buffer_obj;
			if (this._cur_dataset_id) {
				buffer_obj = this._datasets[this._cur_dataset_id];
				var firstcount = buffer_obj._firefirstcount;

				if (buffer_obj._row_start_idx < 0) {
					buffer_obj._row_start_idx = start_idx;
				}

				var attr_end_idx = data.indexOf(">", start_idx);
				var attstr = data.slice(start_idx, attr_end_idx + 1);

				var type = nexacro._getXMLAttributeType(attstr);
				if (type) {
					var typeChar = type.charAt(0);
					if (!(typeChar == "d" || typeChar == "D")) {
						buffer_obj._viewrecords_length++;
					}
				}
				else {
					buffer_obj._viewrecords_length++;
				}
			}

			this._cur_idx = end_idx;

			if (buffer_obj && buffer_obj._viewrecords_length == firstcount && firstcount > 0) {
				buffer_obj._firstrow_end_idx = end_idx;
				return false;
			}

			return true;
		};

		_pProgressDataXML._on_fire_onload = function (data, bufferObj, nLoadType) {
			var ds = bufferObj._target_ds;
			var xml_str;

			if (nLoadType == 1) {
				xml_str = data.slice(bufferObj._colinfo_start_idx, bufferObj._firstrow_end_idx);
			}
			else {
				if (bufferObj._row_end_idx < 0) {
					bufferObj._row_end_idx = data.length - 1;
				}
				xml_str = data.slice(bufferObj._colinfo_start_idx, bufferObj._row_end_idx);
			}

			ds.rowposition = -1;
			var xml_parse_pos = ds._loadFromXMLStr(xml_str, bufferObj._next_record_idx, -1, bufferObj._useclientlayout, bufferObj._is_first_load);
			bufferObj._is_first_load = false;

			if (ds.colinfos) {
				ds._reFilter();
				ds._resetSortGroup();
			}

			if (ds._eventstat) {
				ds.on_fire_onload(0, "", nLoadType);

				if (ds._viewRecords && ds._viewRecords.length > 0) {
					ds._forcesetRowPosition(0, 51);
				}
				else {
					ds._forcesetRowPosition(-1, 51);
				}
			}
			else if (ds._viewRecords && ds._viewRecords.length > 0) {
				ds.rowposition = 0;
			}

			bufferObj._next_record_idx = xml_parse_pos;
		};

		delete _pProgressDataXML;

		if (nexacro.Browser != "IE") {
			nexacro._parseXMLDocument = function (str) {
				return (new DOMParser()).parseFromString(str, "text/xml");
			};
			nexacro._documentToXml = function (xmldoc) {
				return (new XMLSerializer()).serializeToString(xmldoc);
			};

			if (nexacro.Browser == "Gecko") {
				nexacro._getParserError = function (xmldoc) {
					var node = xmldoc.documentElement;
					if (node.nodeName == "parsererror") {
						var msg = "", desc = "";

						var childs = node.childNodes;
						msg = nexacro._decodeXml(childs[0].nodeValue);
						desc = childs[1].textContent;

						return {
							"line" : undefined, 
							"column" : undefined, 
							"message" : msg, 
							"desc" : desc
						};
					}
					return null;
				};
			}
			else {
				nexacro._getParserError = function (xmldoc) {
					var errors = xmldoc.getElementsByTagName("parsererror");
					if (errors.length > 0) {
						var msg = "";
						var node = errors[0].firstChild;
						while (node) {
							if (node.nodeName == "div") {
								msg = node.textContent;
								break;
							}
							node = node.nextSibling;
						}
						return {
							"line" : undefined, 
							"column" : undefined, 
							"message" : msg, 
							"desc" : ""
						};
					}
					return null;
				};
			}
		}
		else {
			nexacro._getXmlDom = function () {
				var xmlDomProgIDs;
				if (nexacro.BrowserVersion <= 8) {
					xmlDomProgIDs = ["Microsoft.XmlDom", "MSXML2.DOMDocument", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0"];
				}
				else {
					xmlDomProgIDs = ["MSXML2.DOMDocument", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0", "Microsoft.XmlDom"];
				}

				for (var i = 0; i < xmlDomProgIDs.length; i++) {
					try {
						var progObj = new ActiveXObject(xmlDomProgIDs[i]);
						return progObj;
					}
					catch (e) {
					}
				}
				return null;
			};
			nexacro._getXmlParser = function () {
				var xmlDomProgIDs = ['Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.6.0'];

				for (var i = xmlDomProgIDs.length - 1; i >= 0; i--) {
					try {
						var progObj = new ActiveXObject(xmlDomProgIDs[i]);
						return progObj;
					}
					catch (e) {
					}
				}
				return null;
			};

			nexacro._parseXMLDocument = function (str) {
				var XMLDom = nexacro._getXmlDom();
				XMLDom.async = false;
				XMLDom.loadXML(str);
				return XMLDom;
			};
			nexacro._documentToXml = function (document) {
				return document.xml;
			};

			nexacro._getParserError = function (xmldoc) {
				var error = xmldoc.parseError;
				if (error && error.errorCode != 0) {
					var infos = ["Error on line ", error.line, " at column ", error.linepos, ": ", error.errorCode, " ", error.reason];

					var msg = infos.join('');
					var desc = error.srcText || "";

					return {
						"line" : error.line, 
						"column" : error.linepos, 
						"message" : msg, 
						"desc" : desc
					};
				}
				return null;
			};
		}

		if (nexacro.Browser == "Chrome") {
			(function () {
				var re_newline = /\r\n|\n/;

				nexacro.__toInnerHTMLText = function (text) {
					return text.split("&").join("&amp;").split("\"").join("&quot;").split("'").join("&#39;").replace("<", "&lt;").split(">").join("&gt;").split(re_newline).join("<br/>");
				};
			})();
		}
		else if (nexacro.Browser == "Gecko") {
			(function () {
				var re_special = /[&"'\<\>]/g;
				var re_newline = /\r\n|\n/g;
				var _map = {
					"&" : "&amp;", 
					"'" : "&#39;", 
					'"' : "&quot;", 
					"<" : "&lt;", 
					">" : "&gt;"
				};
				function _replaceEntity (chr) {
					return _map[chr];
				}

				nexacro.__toInnerHTMLText = function (text) {
					return text.replace(re_special, _replaceEntity).replace(re_newline, "<br/>");
				};
			})();
		}
		else {
			(function () {
				var re_amp = /&/g;
				var re_apos = /'/g;
				var re_quot = /"/g;
				var re_lt = /</g;
				var re_gt = />/g;
				var re_newline = /\r\n|\n|\r/g;

				nexacro.__toInnerHTMLText = function (text) {
					return text.replace(re_amp, "&amp;").replace(re_apos, "&#39;").replace(re_quot, "&quot;").replace(re_lt, "&lt;").replace(re_gt, "&gt;").replace(re_newline, "<br/>");
				};
			})();
		}

		nexacro._decorateString = function (str) {
			var strtemp = str;

			var expPrefixMap = [/<\/?ff\s+[v]\s*=\'/g, /<\/?fs\s*[v]\s*=\'/g, /<\/?fc\s+[v]\s*=\'/g, /<\/?b\s+[v].*?>/g, /<\/?i\s+[v].*?>/g, /<\/?u\s+[v].*?>/g, /<\/?s\s+[v].*?>/g];
			var expSufixMap = [/<\/ff>/g, /<\/fs>/g, /<\/fc>/g, /<\/b>/g, /<\/i>/g, /<\/u>/g, /<\/s>/g];
			for (var i = 0; i <= expPrefixMap.length - 1; i++) {
				var idx = 0;
				var preexp = expPrefixMap[i];
				var sufexp = expSufixMap[i];
				var preexec = preexp.exec(strtemp);

				while (preexec) {
					var sufexec = sufexp.exec(strtemp);
					var startidx = preexec.index;
					var endidx = sufexp.lastIndex;

					var frontstr = strtemp.substring(0, startidx);
					var endstr = strtemp.substring(endidx, strtemp.length);
					var changestr = strtemp.substring(startidx, endidx);

					switch (i) {
						case 0:
							changestr = changestr.replace(preexec[0], "<span style=\"font-family:").replace("\'>", "\">").replace(sufexec[0], "</span>");
							break;
						case 1:
							changestr = changestr.replace(preexec[0], "<span style=\"font-size:").replace("\'>", "pt\">").replace(sufexec[0], "</span>");
							break;
						case 2:
							changestr = changestr.replace(preexec[0], "<span style=\"color:").replace("\'>", "\">").replace(sufexec[0], "</span>");
							var startidx = changestr.indexOf(":");
							var endidx = changestr.indexOf("\">");
							var colorstr = changestr.substring(startidx + 1, endidx);
							changestr = changestr.replace(colorstr, nexacro._getWebColorFromXreColor(colorstr));
							break;
						case 3:
							changestr = changestr.replace(preexec[0], "<b>");
							break;
						case 4:
							changestr = changestr.replace(preexec[0], "<i>");
							break;
						case 5:
							changestr = changestr.replace(preexec[0], "<u>");
							break;
						case 6:
							changestr = changestr.replace(preexec[0], "<s>");
							break;
						case 7:
							break;
					}

					strtemp = frontstr + changestr + endstr;

					preexp.lastIndex = 0;
					preexec = preexp.exec(strtemp);
					if (preexec) {
						sufexp.lastIndex = preexp.lastIndex;
					}
				}
			}

			strtemp = strtemp.replace(/\&lt;/g, "&amp;lt;").replace(/\&gt;/g, "&amp;gt;").replace(/\&quot;/g, "&amp;quot;").replace(/\&apos;/g, "&amp;apos;");


			return strtemp;
		};

		nexacro._quoteStr = function (str) {
			if (/[\r\n\"\t]/.test(str)) {
				return "\"" + str.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\"/g, "\\\"") + "\"";
			}
			else if (/[,\']/.test(str)) {
				return "\"" + str + "\"";
			}
			else {
				return str;
			}
		};
		nexacro._unQuoteStr = function (str) {
			if (str.charAt(0) != "\"" && str.charAt(0) != "\'") {
				return str;
			}
			else if (str.indexOf("\\") >= 0) {
				str = str.replace(/\\r/g, "\r").replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\/g, "");
				return str.substring(1, str.length - 1);
			}
			else {
				return str.substring(1, str.length - 1);
			}
		};

		if (nexacro.checkDocument.hasGetBoundingClientRect) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				nexacro._getElementXYInWindow = function (node, id) {
					var point_x, point_y;
					var _doc = (node.ownerDocument || node.document);
					var doc_elem = _doc.documentElement;
					var body = id ? _doc.getElementById(id) : _doc.body;
					var box = node.getBoundingClientRect();
					point_x = Math.round(box.left) - doc_elem.clientLeft;
					point_y = Math.round(box.top) - doc_elem.clientTop;

					var docBox = body.getBoundingClientRect();
					var physicalW = docBox.right - docBox.left;
					var logicalW = body.offsetWidth;
					if (physicalW != logicalW) {
						var factor = Math.round((physicalW / logicalW) * 100) / 100;
						point_x = Math.round(point_x / factor);
						point_y = Math.round(point_y / factor);
					}

					return [point_x, point_y];
				};
			}
			else {
				nexacro._getElementXYInWindow = function (node) {
					var point_x, point_y;

					if (nexacro._allow_default_pinchzoom) {
						if (!node) {
							return [0, 0];
						}
						var _doc = (node.ownerDocument || node.document);
						var elem_pos = nexacro.__getHTMLNodePositionInFrame(_doc, node);
						if (elem_pos) {
							return [elem_pos.x, elem_pos.y];
						}
					}

					if (node) {
						var box = node.getBoundingClientRect();
						point_x = Math.round(box.left);
						point_y = Math.round(box.top);
					}
					else {
						trace("error (nexacro._getElementXYInWindow)");
					}

					return [point_x, point_y];
				};
			}
		}
		else {
			nexacro._getElementXYInWindow = function (node) {
				var point_x = 0, point_y = 0;
				point_x += node.offsetLeft;
				point_y += node.offsetTop;

				var pnode = node.offsetParent;
				while (pnode) {
					point_x += (pnode.offsetLeft + (pnode.clientLeft | 0) - pnode.scrollLeft);
					point_y += (pnode.offsetTop + (pnode.clientTop | 0) - pnode.scrollTop);
					pnode = pnode.offsetParent;
				}

				var doc_elem = document.documentElement;
				point_x += doc_elem.scrollLeft;
				point_y += doc_elem.scrollTop;

				return [point_x, point_y];
			};
		}
		nexacro._getElementPositionInFrame = function (elem) {
			var node = elem._handle;
			if (!node) {
				return {
					x : 0, 
					y : 0
				};
			}

			var _doc = (node.ownerDocument || node.document);
			return nexacro.__getHTMLNodePositionInFrame(_doc, node);
		};
		nexacro.__getHTMLNodePositionInFrame = function (_doc, node, id) {
			var p = {
				x : 0, 
				y : 0
			};
			if (!_doc || !node) {
				return p;
			}

			if (nexacro.checkDocument.hasGetBoundingClientRect) {
				var box = node.getBoundingClientRect();
				p.x = box.left + (_doc.scrollLeft || _doc.body.scrollLeft);
				p.y = box.top + (_doc.scrollTop || _doc.body.scrollTop);

				var pt = nexacro.__adjustBoundingClientRect(_doc);
				p.x -= pt[0];
				p.y -= pt[1];

				p.x = Math.round(p.x);
				p.y = Math.round(p.y);
			}
			else {
				if (nexacro.checkDocument.hasGetBoxObjectFor) {
					var box = _doc.getBoxObjectFor(node);
					p.x = box.x;
					p.y = box.y;
					var style = _doc.defaultView.getComputedStyle(node, "");
					p.x -= parseInt(style.borderLeftWidth) | 0;
					p.y -= parseInt(style.borderTopWidth) | 0;
					node = node.parentNode;
					while (node.nodeType == 1) {
						p.x -= node.scrollLeft;
						p.y -= node.scrollTop;
						node = node.parentNode;
					}
				}
				else {
					p.x = node.offsetLeft;
					p.y = node.offsetTop;
					var pnode = node.offsetParent;
					while (pnode) {
						p.x += pnode.offsetLeft;
						p.y += pnode.offsetTop;
						pnode = pnode.offsetParent;
					}
					var body = id ? _doc.getElementById(id) : (_doc.body || _doc.getElementsByTagName("body")[0]);
					node = node.parentNode || body;
					while (node.nodeType == 1 && node != body) {
						p.x -= node.scrollLeft;
						p.y -= node.scrollTop;
						node = node.parentNode;
					}
				}
			}
			return p;
		};

		if (nexacro.Browser == "IE") {
			nexacro._getElementScreenPosition = function (elem) {
				var _handle = elem._handle;
				if (_handle) {
					var _doc = _handle.ownerDocument || _handle.document;
					var p = nexacro.__getHTMLNodePositionInFrame(_doc, _handle);

					var win = _doc.parentWindow;
					p.x += win.screenLeft;
					p.y += win.screenTop;

					return p;
				}
				return {
					x : 0, 
					y : 0
				};
			};
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro._getElementScreenPosition = function (elem) {
				var _handle = elem._handle;
				if (_handle) {
					var _doc = _handle.ownerDocument || _handle.document;
					var p = nexacro.__getHTMLNodePositionInFrame(_doc, _handle);

					var win = _doc.defaultView;
					p.x += win.mozInnerScreenX;
					p.y += win.mozInnerScreenY;

					return p;
				}
				return {
					x : 0, 
					y : 0
				};
			};
		}
		else {
			nexacro._getElementScreenPosition = function (elem) {
				var _handle = elem._handle;
				if (_handle) {
					var _doc = _handle.ownerDocument || _handle.document;
					var p = nexacro.__getHTMLNodePositionInFrame(_doc, _handle);

					var win = _doc.defaultView;

					p.x += nexacro._gap_client_width;
					p.y += nexacro._gap_client_height;

					return p;
				}
				return {
					x : 0, 
					y : 0
				};
			};
		}

		nexacro.__getHTMLElementPosition = function (node, id) {
			var top = 0;
			var left = 0;
			var skipTd = false;
			while (node.parentNode && node != (id ? window.document.getElementById(id) : window.document.body)) {
				var nodetagname = node.tagName;
				if (skipTd && nodetagname == "TABLE") {
					skipTd = false;
				}
				if ((skipTd && nodetagname == "TD") || nodetagname == "TR" || nodetagname == "TBODY") {
					node = node.parentNode;
					continue;
				}

				var node_style = node.style;
				if (node_style.position == "absolute") {
					skipTd = true;
				}

				left -= (node.scrollLeft | 0);
				top -= (node.scrollTop | 0);
				var borderWidth = (node_style.borderLeftWidth | 0);
				var borderHeight = (node_style.borderTopWidth | 0);
				if ((nexacro.Browser == "Gecko" || nexacro.Browser == "KHTML") && node.tagName != "TABLE") {
					left += borderWidth * 2;
					top += borderWidth * 2;
				}
				else if (nexacro.Browser == "IE" || nexacro.Browser == "WebKit") {
					top += borderWidth;
					left += borderWidth;
				}
				top += (node.offsetTop | 0);
				left += (node.offsetLeft | 0);
				node = node.parentNode;
			}
			return {
				top : top, 
				left : left
			};
		};

		nexacro.__getHTMLPageSize = function () {
			var xScroll, yScroll;
			if (window.innerHeight && window.scrollMaxY) {
				xScroll = document.body.scrollWidth;
				yScroll = window.innerHeight + window.scrollMaxY;
			}
			else {
				if (document.body.scrollHeight > document.body.offsetHeight) {
					xScroll = document.body.scrollWidth;
					yScroll = document.body.scrollHeight;
				}
				else {
					if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight) {
						xScroll = document.documentElement.scrollWidth;
						yScroll = document.documentElement.scrollHeight;
					}
					else {
						xScroll = document.body.offsetWidth;
						yScroll = document.body.offsetHeight;
					}
				}
			}
			var windowWidth, windowHeight;
			if (self.innerHeight) {
				windowWidth = self.innerWidth;
				windowHeight = self.innerHeight;
			}
			else {
				if (document.documentElement && document.documentElement.clientHeight) {
					windowWidth = document.documentElement.clientWidth;
					windowHeight = document.documentElement.clientHeight;
				}
				else {
					if (document.body) {
						windowWidth = document.body.clientWidth;
						windowHeight = document.body.clientHeight;
					}
				}
			}
			if (yScroll < windowHeight) {
				pageHeight = windowHeight;
			}
			else {
				pageHeight = yScroll;
			}
			if (xScroll < windowWidth) {
				pageWidth = windowWidth;
			}
			else {
				pageWidth = xScroll;
			}
			return [pageWidth, pageHeight, windowWidth, windowHeight];
		};


		nexacro.__findParentElement = function (node) {
			if (node) {
				while (node) {
					var elem = node._linked_element;
					if (elem) {
						return elem;
					}
					node = node.parentNode;
				}
			}
			return;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__findParentElementForKeyEvent = function (node, win) {
				var active_node = win._dest_doc.activeElement;
				if (active_node.tagName == "OBJECT") {
					win._last_focused_elem = null;
				}

				if (win && win._last_focused_elem) {
					var focused_elem = win._last_focused_elem;
					if (!focused_elem.visible || focused_elem._handle == null) {
						win._last_focused_elem = null;
					}
					else {
						return win._last_focused_elem;
					}
				}

				return nexacro.__findParentElement(node);
			};
		}
		else {
			nexacro.__findParentElementForKeyEvent = function (node, win) {
				if (win && win._last_focused_elem) {
					var focused_elem = win._last_focused_elem;
					if (!focused_elem.visible || focused_elem._handle == null) {
						win._last_focused_elem = null;
					}
					else {
						return win._last_focused_elem;
					}
				}

				return nexacro.__findParentElement(node);
			};
		}

		nexacro.__getWheelDelta = nexacro.__getWheelDeltaY;

		if (nexacro.Browser == "Gecko") {
			nexacro.__getWheelDeltaX = function (e) {
				if (e.axis === 2) {
					var wheel_deltax = 0;
				}
				else {
					var wheel_deltax = -40 * e.detail;
				}
				return wheel_deltax;
			};

			nexacro.__getWheelDeltaY = function (e) {
				if (e.axis === 2) {
					var wheel_deltay = -40 * e.detail;
				}
				else {
					var wheel_deltay = 0;
				}
				return wheel_deltay;
			};
		}
		else if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro.__getWheelDeltaX = function (e) {
				return 0;
			};

			nexacro.__getWheelDeltaY = function (e) {
				return e.wheelDelta;
			};
		}
		else {
			nexacro.__getWheelDeltaX = function (e) {
				return e.wheelDeltaX;
			};

			nexacro.__getWheelDeltaY = function (e) {
				return e.wheelDeltaY;
			};
		}

		if (nexacro.Browser != "Edge" && nexacro.Browser != "IE") {
			nexacro._getSysEventElement = function (sysevt) {
				var node = sysevt.target;
				return (node) ? nexacro.__findParentElement(node) : null;
			};
			nexacro._getSysEventKey = function (sysevt) {
				return sysevt.charCode || sysevt.keyCode;
			};

			if (nexacro.Browser == "Gecko") {
				nexacro._getSysEventKeyCode = function (sysevt) {
					var k = sysevt.keyCode;
					return ((k > 0 && k <= 46) ? k : sysevt.charCode == 0 ? k : sysevt.charCode);
				};
			}
			else {
				nexacro._getSysEventKeyCode = function (sysevt) {
					return sysevt.keyCode;
				};
			}

			nexacro._getSysEventX = function (sysevt) {
				return sysevt.pageX + document.body.scrollLeft;
			};
			nexacro._getSysEventY = function (sysevt) {
				return sysevt.pageY + document.body.scrollTop;
			};

			nexacro._getSysEventBtnCode = function (sysevt, code) {
				return sysevt.which ? (sysevt.which - 1) : (sysevt.button);
			};


			nexacro._stopSysEvent = function (sysevt) {
				sysevt.preventDefault();
				sysevt.stopPropagation();
				sysevt.stopped = true;
				return false;
			};

			nexacro._stopPropagation = function (sysevt) {
				sysevt.stopPropagation();
				return false;
			};

			nexacro._observeSysEvent = function (node, name, onname, callback) {
				node.addEventListener(name, callback, false);
			};
			nexacro._stopSysObserving = function (node, name, onname, callback) {
				node.removeEventListener(name, callback, false);
				callback = null;
			};
		}
		else {
			nexacro._getSysEventElement = function (sysevt) {
				var node = sysevt.srcElement;
				return node ? nexacro.__findParentElement(node) : null;
			};
			nexacro._getSysEventKey = function (sysevt) {
				return sysevt.charCode || sysevt.keyCode;
			};
			nexacro._getSysEventKeyCode = function (sysevt) {
				return sysevt.keyCode;
			};

			nexacro._getSysEventX = function (sysevt) {
				return sysevt.clientX + document.body.scrollLeft;
			};
			nexacro._getSysEventY = function (sysevt) {
				return sysevt.clientY + document.body.scrollTop;
			};
			if (nexacro.BrowserVersion < 11) {
				nexacro._getSysEventBtnCode = function (sysevt, code) {
					return sysevt.button;
				};
			}
			else {
				nexacro._getSysEventBtnCode = function (sysevt, code) {
					return sysevt.which ? (sysevt.which - 1) : (sysevt.button);
				};
			}


			nexacro._stopSysEvent = function (sysevt) {
				sysevt.returnValue = false;
				sysevt.cancelBubble = true;
				sysevt.stopped = true;


				if (sysevt.preventDefault) {
					sysevt.preventDefault();
				}
				if (sysevt.stopPropagation) {
					sysevt.stopPropagation();
				}
				return false;
			};

			nexacro._stopPropagation = function (sysevt) {
				sysevt.cancelBubble = true;
				return false;
			};

			if (nexacro.BrowserVersion > 8) {
				nexacro._observeSysEvent = function (node, name, onname, callback) {
					node.addEventListener(name, callback);
				};
				nexacro._stopSysObserving = function (node, name, onname, callback) {
					node.removeEventListener(name, callback, false);
					callback = null;
				};
			}
			else {
				nexacro._observeSysEvent = function (node, name, onname, callback) {
					if (onname in node) {
						node.attachEvent(onname, callback);
					}
				};
				nexacro._stopSysObserving = function (node, name, onname, callback) {
					if (onname in node) {
						node.detachEvent(onname, callback);
					}
					callback = null;
				};
			}
			;
		}

		nexacro._getSysEventBtnString = function (sysevt) {
			switch (nexacro._getSysEventBtnCode(sysevt)) {
				case nexacro_HTMLSysEvent.MOUSE_LBUTTON:
					return "lbutton";
				case nexacro_HTMLSysEvent.MOUSE_MBUTTON:
					return "mbutton";
				case nexacro_HTMLSysEvent.MOUSE_RBUTTON:
					return "rbutton";
				default:
					return "none";
			}
		};

		nexacro._observeEvent = nexacro._observeSysEvent;
		nexacro._stopObserving = nexacro._stopSysObserving;

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__fireHTMLEvent = function (node, name, onname) {
				if (node.fireEvent) {
					node.fireEvent(onname);
				}
			};
		}
		else {
			nexacro.__fireHTMLEvent = function (node, name, onname) {
				var doc = node.ownerDocument || node.document;

				if (doc.createEvent) {
					var evt = doc.createEvent('HTMLEvents');
					evt.initEvent(name, true, true);
					node.dispatchEvent(evt);
				}
			};
		}

		nexacro._xreNamedColorList = 
			{
			"" : "", 
			"@gradation" : "", 
			"aliceblue" : "#F0F8FF", 
			"antiquewhite" : "#FAEBD7", 
			"aqua" : "#00FFFF", 
			"aquamarine" : "#7FFFD4", 
			"azure" : "#F0FFFF", 
			"beige" : "#F5F5DC", 
			"bisque" : "#FFE4C4", 
			"black" : "#000000", 
			"blanchedalmond" : "#FFEBCD", 
			"blue" : "#0000FF", 
			"blueviolet" : "#8A2BE2", 
			"brown" : "#A52A2A", 
			"burlywood" : "#DEB887", 
			"cadetblue" : "#5F9EA0", 
			"chartreuse" : "#7FFF00", 
			"chocolate" : "#D2691E", 
			"coral" : "#FF7F50", 
			"cornflowerblue" : "#6495ED", 
			"cornsilk" : "#FFF8DC", 
			"crimson" : "#DC143C", 
			"cyan" : "#00FFFF", 
			"darkblue" : "#00008B", 
			"darkcyan" : "#008B8B", 
			"darkgoldenrod" : "#B8860B", 
			"darkgray" : "#A9A9A9", 
			"darkgreen" : "#006400", 
			"darkgrey" : "#A9A9A9", 
			"darkkhaki" : "#BDB76B", 
			"darkmagenta" : "#8B008B", 
			"darkolivegreen" : "#556B2F", 
			"darkorange" : "#FF8C00", 
			"darkorchid" : "#9932CC", 
			"darkred" : "#8B0000", 
			"darksalmon" : "#E9967A", 
			"darkseagreen" : "#8FBC8F", 
			"darkslateblue" : "#483D8B", 
			"darkslategray" : "#2F4F4F", 
			"darkslategrey" : "#2F4F4F", 
			"darkturquoise" : "#00CED1", 
			"darkviolet" : "#9400D3", 
			"deeppink" : "#FF1493", 
			"deepskyblue" : "#00BFFF", 
			"dimgray" : "#696969", 
			"dimgrey" : "#696969", 
			"dodgerblue" : "#1E90FF", 
			"firebrick" : "#B22222", 
			"floralwhite" : "#FFFAF0", 
			"forestgreen" : "#228B22", 
			"fuchsia" : "#FF00FF", 
			"gainsboro" : "#DCDCDC", 
			"ghostwhite" : "#F8F8FF", 
			"gold" : "#FFD700", 
			"goldenrod" : "#DAA520", 
			"gray" : "#808080", 
			"green" : "#008000", 
			"greenyellow" : "#ADFF2F", 
			"grey" : "#808080", 
			"honeydew" : "#F0FFF0", 
			"hotpink" : "#FF69B4", 
			"indianred" : "#CD5C5C", 
			"indigo" : "#4B0082", 
			"ivory" : "#FFFFF0", 
			"khaki" : "#F0E68C", 
			"lavender" : "#E6E6FA", 
			"lavenderblush" : "#FFF0F5", 
			"lawngreen" : "#7CFC00", 
			"lemonchiffon" : "#FFFACD", 
			"lightblue" : "#ADD8E6", 
			"lightcoral" : "#F08080", 
			"lightcyan" : "#E0FFFF", 
			"lightgoldenrodyellow" : "#FAFAD2", 
			"lightgray" : "#D3D3D3", 
			"lightgreen" : "#90EE90", 
			"lightgrey" : "#D3D3D3", 
			"lightpink" : "#FFB6C1", 
			"lightsalmon" : "#FFA07A", 
			"lightseagreen" : "#20B2AA", 
			"lightskyblue" : "#87CEFA", 
			"lightslategray" : "#778899", 
			"lightslategrey" : "#778899", 
			"lightsteelblue" : "#B0C4DE", 
			"lightyellow" : "#FFFFE0", 
			"lime" : "#00FF00", 
			"limegreen" : "#32CD32", 
			"linen" : "#FAF0E6", 
			"magenta" : "#FF00FF", 
			"maroon" : "#800000", 
			"mediumaquamarine" : "#66CDAA", 
			"mediumblue" : "#0000CD", 
			"mediumorchid" : "#BA55D3", 
			"mediumpurple" : "#9370DB", 
			"mediumseagreen" : "#3CB371", 
			"mediumslateblue" : "#7B68EE", 
			"mediumspringgreen" : "#00FA9A", 
			"mediumturquoise" : "#48D1CC", 
			"mediumvioletred" : "#C71585", 
			"midnightblue" : "#191970", 
			"mintcream" : "#F5FFFA", 
			"mistyrose" : "#FFE4E1", 
			"moccasin" : "#FFE4B5", 
			"navajowhite" : "#FFDEAD", 
			"navy" : "#000080", 
			"oldlace" : "#FDF5E6", 
			"olive" : "#808000", 
			"olivedrab" : "#6B8E23", 
			"orange" : "#FFA500", 
			"orangered" : "#FF4500", 
			"orchid" : "#DA70D6", 
			"palegoldenrod" : "#EEE8AA", 
			"palegreen" : "#98FB98", 
			"paleturquoise" : "#AFEEEE", 
			"palevioletred" : "#DB7093", 
			"papayawhip" : "#FFEFD5", 
			"peachpuff" : "#FFDAB9", 
			"peru" : "#CD853F", 
			"pink" : "#FFC0CB", 
			"plum" : "#DDA0DD", 
			"powderblue" : "#B0E0E6", 
			"purple" : "#800080", 
			"red" : "#FF0000", 
			"rosybrown" : "#BC8F8F", 
			"royalblue" : "#4169E1", 
			"saddlebrown" : "#8B4513", 
			"salmon" : "#FA8072", 
			"sandybrown" : "#F4A460", 
			"seagreen" : "#2E8B57", 
			"seashell" : "#FFF5EE", 
			"sienna" : "#A0522D", 
			"silver" : "#C0C0C0", 
			"skyblue" : "#87CEEB", 
			"slateblue" : "#6A5ACD", 
			"slategray" : "#708090", 
			"slategrey" : "#708090", 
			"snow" : "#FFFAFA", 
			"springgreen" : "#00FF7F", 
			"steelblue" : "#4682B4", 
			"tan" : "#D2B48C", 
			"teal" : "#008080", 
			"thistle" : "#D8BFD8", 
			"tomato" : "#FF6347", 
			"turquoise" : "#40E0D0", 
			"violet" : "#EE82EE", 
			"wheat" : "#F5DEB3", 
			"white" : "#FFFFFF", 
			"whitesmoke" : "#F5F5F5", 
			"yellow" : "#FFFF00", 
			"yellowgreen" : "#9ACD32"
		};

		if (nexacro.Browser_ColorAlpha) {
			nexacro._getWebColorFromXreColor = function (color) {
				var v = nexacro._xreNamedColorList[color];
				if (v) {
					return v;
				}

				len = color.length;
				if (color.substring(0, 1) == '#') {
					if (len == 7) {
						return color;
					}
					if (len == 9) {
						var alpha = color.substring(7);
						if (alpha == "00") {
							return "transparent";
						}
						else {
							var str = "rgba(";
							str += parseInt(color.substring(1, 3), 16) + ',';
							str += parseInt(color.substring(3, 5), 16) + ',';
							str += parseInt(color.substring(5, 7), 16) + ',';
							str += (parseInt(alpha, 16) / 255);
							str += ")";
							return str;
						}
					}
				}
				if (color.substring(0, 2) == "0x") {
					if (len == 8) {
						return "#" + color.substring(2);
					}
					if (len == 10) {
						var alpha = color.substring(8);
						if (alpha == "00") {
							return "transparent";
						}
						else {
							var str = "rgba(";
							str += parseInt(color.substring(2, 4), 16) + ',';
							str += parseInt(color.substring(4, 6), 16) + ',';
							str += parseInt(color.substring(6, 8), 16) + ',';
							str += (parseInt(alpha, 16) / 255);
							str += ")";
							return str;
						}
					}
				}
				return "";
			};
		}
		else {
			nexacro._getWebColorFromXreColor = function (color) {
				var v = nexacro._xreNamedColorList[color];
				if (v) {
					return v;
				}

				len = color.length;
				if (color.substring(0, 1) == '#') {
					if (len == 7) {
						return color;
					}
					if (len == 9) {
						var alpha = color.substring(7);
						if (alpha == "00") {
							return "transparent";
						}
						return "#" + color.substr(1, 6);
					}
				}
				if (color.substring(0, 2) == "0x") {
					if (len == 8) {
						return "#" + color.substring(2);
					}
					if (len == 10) {
						var alpha = color.substring(8);
						if (alpha == "00") {
							return "transparent";
						}
						return "#" + color.substring(2, 8);
					}
				}
				return "";
			};
		}

		nexacro._getXreColorAlpha = function (color) {
			if (!color) {
				return 255;
			}
			if (typeof color != "string") {
				color = color.toString();
			}
			var v = nexacro._xreNamedColorList[color], len;
			if (v) {
				return 255;
			}
			len = color.length;
			if (len == 7) {
				return 255;
			}
			if (len == 9) {
				return parseInt(color.substr(7), 16);
			}
			if (len == 8) {
				return 255;
			}
			if (len == 10) {
				return parseInt(color.substr(8), 16);
			}
			return 255;
		};

		nexacro._getXreColorOpacity = function (color) {
			if (!color) {
				return 100;
			}
			if (typeof color != "string") {
				color = color.toString();
			}
			var v = nexacro._xreNamedColorList[color];
			if (v) {
				return 100;
			}
			len = color.length;
			if (len == 7) {
				return 100;
			}
			if (len == 9) {
				return Math.round(parseInt(color.substring(7), 16) * 100 / 255);
			}
			if (len == 8) {
				return 100;
			}
			if (len == 10) {
				return Math.round(parseInt(color.substring(8), 16) * 100 / 255);
			}
			return 100;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			nexacro._getFilterColorFromXreColor = function (color) {
				if (color == undefined) {
					return;
				}
				if (typeof color != "string") {
					color = color.toString();
				}
				var v = nexacro._xreNamedColorList[color];
				if (v) {
					return v;
				}
				len = color.length;
				if (len == 7) {
					return "#" + color.substring(1);
				}
				if (len == 9) {
					var alpha = color.substring(7);
					if (alpha == "00") {
						return;
					}
					return "#" + alpha + color.substr(1, 6);
				}
				if (len == 8) {
					return "#" + color.substring(2);
				}
				if (len == 10) {
					var alpha = color.substring(8);
					if (alpha == "00") {
						return;
					}
					return "#" + alpha + color.substring(2, 8);
				}
				return;
			};

			nexacro._getOpacityFilterFromXreColor = function (color) {
				var filterColor = nexacro._getFilterColorFromXreColor(color);
				if (filterColor) {
					return ("progid:DXImageTransform.Microsoft.gradient(startColorStr=" + filterColor + ",endColorStr=" + filterColor + ")");
				}
				return "";
			};
		}
		else {
			nexacro._getOpacityFilterFromXreColor = function (color) {
				return "";
			};
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion <= 8) {
				nexacro._makeGradationSysValue = function (cssobj) {
					if (cssobj.style == "linear") {
						var start_color = nexacro._getFilterColorFromXreColor(cssobj.start_color);
						var end_color = nexacro._getFilterColorFromXreColor(cssobj.end_color);
						var vml_start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
						var vml_end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
						var start_x = cssobj._start_x, start_y = cssobj._start_y;
						var end_x = cssobj._end_x, end_y = cssobj._end_y;

						if (!start_color && !end_color) {
							var val = "";
							var val2 = "";
						}
						else {
							if (start_color && start_x != null && start_y != null) {
								cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
							}
							if (end_color && end_x != null && end_y != null) {
								cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
							}

							if (start_color && !end_color) {
								end_color = "black";
							}
							else if (!start_color && end_color) {
								start_color = "white";
							}

							if (vml_start_color && !vml_end_color) {
								vml_end_color = "black";
							}
							else if (!vml_start_color && vml_end_color) {
								vml_start_color = "white";
							}

							var val = "progid:DXImageTransform.Microsoft.gradient(";
							var val2 = "type='gradient' ";
							var direction = 0;
							if (cssobj._start_y == cssobj._end_y) {
								val += "GradientType=1";
								val2 += "angle='90' ";
								if (cssobj._start_x > 50) {
									direction = 1;
								}
							}
							else if (cssobj._start_x == cssobj._end_x) {
								val += "GradientType=0";
								val2 += "angle='0' ";
								if (cssobj._start_y > 50) {
									direction = 1;
								}
							}
							else if (cssobj._start_x != cssobj._end_x && cssobj._start_y != cssobj._end_y && cssobj._start_x != cssobj._start_y) {
								val += "GradientType=1";
								val2 += "angle='135' ";
								if (cssobj._start_x > 50) {
									direction = 1;
								}
							}
							else {
								val += "GradientType=0";
								val2 += "angle='45' ";
								if (cssobj._start_x > 50) {
									direction = 1;
								}
							}

							if (direction == 0) {
								val += ",startColorStr=" + start_color;
								val += ",endColorStr=" + end_color;
								val += ")";

								val2 += "color = '" + vml_end_color + "' ";
								val2 += "colors = '0% " + vml_end_color + ", 100% " + vml_start_color + "' ";
								val2 += "color2 = '" + vml_start_color + "' ";
								val2 += "opacity = '" + (nexacro._getXreColorOpacity(cssobj.start_color)) / 100 + "' ";
								val2 += "o:opacity2 = '" + (nexacro._getXreColorOpacity(cssobj.end_color)) / 100 + "'";
							}
							else {
								val += ",startColorStr=" + end_color;
								val += ",endColorStr=" + start_color;
								val += ")";

								val2 += "color = '" + vml_start_color + "' ";
								val2 += "colors = '0% " + vml_start_color + ", 100% " + vml_end_color + "' ";
								val2 += "color2 = '" + vml_end_color + "' ";
								val2 += "opacity = '" + (nexacro._getXreColorOpacity(cssobj.end_color)) / 100 + "' ";
								val2 += "o:opacity2 = '" + (nexacro._getXreColorOpacity(cssobj.start_color)) / 100 + "'";
							}
						}

						cssobj._sysvalue = val;
						cssobj._sysvalue2 = val2;
					}
					else {
						cssobj._sysvalue = "";
						cssobj._sysvalue2 = "";
					}
				};
			}
			else if (nexacro.BrowserVersion == 9) {
				nexacro._makeGradationSysValue = function (cssobj) {
					if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color)) {
						var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
						var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
						var start_x = cssobj._start_x, start_y = cssobj._start_y;
						var end_x = cssobj._end_x, end_y = cssobj._end_y;

						if (start_color && start_x != null && start_y != null) {
							cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
						}
						if (end_color && end_x != null && end_y != null) {
							cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
						}

						if (start_color && !end_color) {
							end_color = "black";
						}
						else if (!start_color && end_color) {
							start_color = "white";
						}

						var direction = "x1='" + start_x + "%' y1='" + start_y + "%' ";
						direction += "x2='" + end_x + "%' y2='" + end_y + "%'";

						var svgstr = "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1 1' preserveAspectRatio='none'>";
						svgstr += "<linearGradient id='_sysgradation' gradientUnits='userSpaceOnUse' " + direction + ">";
						svgstr += "<stop stop-color='" + start_color + "' offset='0'/><stop stop-color='" + end_color + "' offset='1'/></linearGradient>";
						svgstr += "<rect width='1' height='1' fill='url(#_sysgradation)' />";
						svgstr += "</svg>";

						cssobj._sysvalue = "url(data:image/svg+xml;base64," + nexacro.base64Encode(svgstr) + ")";
					}
					else {
						cssobj._sysvalue = "";
					}
				};
			}
			else {
				nexacro._makeGradationSysValue = function (cssobj) {
					if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color)) {
						var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
						var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
						var start_x = cssobj._start_x, start_y = cssobj._start_y;
						var end_x = cssobj._end_x, end_y = cssobj._end_y;

						if (start_color && start_x != null && start_y != null) {
							cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
						}
						if (end_color && end_x != null && end_y != null) {
							cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
						}

						if (start_color && !end_color) {
							end_color = "black";
						}
						else if (!start_color && end_color) {
							start_color = "white";
						}

						var val = "linear-gradient(to ";
						if (start_x == end_x) {
							if (start_y > end_y) {
								val += "top, ";
							}
							else if (start_y < end_y) {
								val += "bottom, ";
							}
						}
						else if (start_x > end_x) {
							if (start_y == end_y) {
								val += "left, ";
							}
							else if (start_y > end_y) {
								val += "top left, ";
							}
							else if (start_y < end_y) {
								val += "bottom left, ";
							}
						}
						else if (start_x < end_x) {
							if (start_y == end_y) {
								val += "right, ";
							}
							else if (start_y > end_y) {
								val += "top right, ";
							}
							else if (start_y < end_y) {
								val += "bottom right, ";
							}
						}

						val += start_color;
						val += " 0%,";
						if (cssobj.peglist.length) {
							var arr = cssobj._parsePegList(cssobj.peglist);
							var len = arr.length;
							var valarr;
							for (var i = 0; i < len; i++) {
								valarr = arr[i];
								val += nexacro._getWebColorFromXreColor(valarr[1]) + " " + valarr[0] + "%,";
							}
						}
						val += end_color;
						val += " 100%)";

						cssobj._sysvalue = val;
					}
					else {
						cssobj._sysvalue = "";
					}
				};
			}
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro._makeGradationSysValue = function (cssobj) {
				if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color)) {
					var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
					var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
					var start_x = cssobj._start_x, start_y = cssobj._start_y;
					var end_x = cssobj._end_x, end_y = cssobj._end_y;

					if (start_color && start_x != null && start_y != null) {
						cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
					}
					if (end_color && end_x != null && end_y != null) {
						cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
					}

					if (start_color && !end_color) {
						end_color = "black";
					}
					else if (!start_color && end_color) {
						start_color = "white";
					}

					var val = "-moz-linear-gradient(";
					if (start_x == end_x) {
						if (start_y > end_y) {
							val += "to top, ";
						}
						else if (start_y < end_y) {
							val += "to bottom, ";
						}
						else if (start_y == end_y) {
							val += "center, ";
						}
					}
					else if (start_x > end_x) {
						if (start_y == end_y) {
							val += "to left, ";
						}
						else if (start_y > end_y) {
							val += "to top left, ";
						}
						else if (start_y < end_y) {
							val += "to bottom left, ";
						}
						else {
							val += "center, ";
						}
					}
					else if (start_x < end_x) {
						if (start_y == end_y) {
							val += "to right, ";
						}
						else if (start_y > end_y) {
							val += "to top right, ";
						}
						else if (start_y < end_y) {
							val += "to bottom right, ";
						}
						else {
							val += "center, ";
						}
					}

					val += start_color;
					val += " 0%,";
					if (cssobj.peglist.length) {
						var arr = cssobj._parsePegList(cssobj.peglist);
						var len = arr.length;
						var valarr;
						for (var i = 0; i < len; i++) {
							valarr = arr[i];
							val += nexacro._getWebColorFromXreColor(valarr[1]) + " " + valarr[0] + "%,";
						}
					}
					val += end_color;
					val += " 100%)";

					cssobj._sysvalue = val;
				}
				else {
					cssobj._sysvalue = "";
				}
			};
		}
		else if (nexacro.Browser == "WebKit" || nexacro.Browser == "Chrome" || nexacro.Browser == "MobileSafari" || nexacro.Browser == "Safari") {
			nexacro._makeGradationSysValue = function (cssobj) {
				if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color)) {
					var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
					var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
					var start_x = cssobj._start_x, start_y = cssobj._start_y;
					var end_x = cssobj._end_x, end_y = cssobj._end_y;

					if (start_color && start_x != null && start_y != null) {
						cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
					}
					if (end_color && end_x != null && end_y != null) {
						cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
					}

					if (start_color && !end_color) {
						end_color = "black";
					}
					else if (!start_color && end_color) {
						start_color = "white";
					}

					var val = "-webkit-gradient(linear,";
					val += start_x + "% " + start_y + "%,";
					val += end_x + "% " + end_y + "%,";
					val += "from(";
					val += start_color;
					val += "),";
					if (cssobj.peglist.length) {
						var arr = cssobj._parsePegList(cssobj.peglist);
						var len = arr.length;
						var valarr;
						for (var i = 0; i < len; i++) {
							valarr = arr[i];
							val += "color-stop(" + valarr[0] + "%," + nexacro._getWebColorFromXreColor(valarr[1]) + "),";
						}
					}
					val += "to(";
					val += end_color;
					val += "))";
					cssobj._sysvalue = val;
				}
				else {
					cssobj._sysvalue = "";
				}
			};
		}
		else if (nexacro.Browser == "Opera") {
			nexacro._makeGradationSysValue = function (cssobj) {
				if (cssobj.style == "linear" && (cssobj.start_color || cssobj.end_color)) {
					var start_color = nexacro._getWebColorFromXreColor(cssobj.start_color);
					var end_color = nexacro._getWebColorFromXreColor(cssobj.end_color);
					var start_x = cssobj._start_x, start_y = cssobj._start_y;
					var end_x = cssobj._end_x, end_y = cssobj._end_y;

					if (start_color && start_x != null && start_y != null) {
						cssobj.start = start_x + "%, " + start_y + "% " + cssobj.start_color;
					}
					if (end_color && end_x != null && end_y != null) {
						cssobj.end = end_x + "%, " + end_y + "% " + cssobj.end_color;
					}

					var dx = end_x - start_x;
					var dy = end_y - start_y;
					var ang = (((Math.atan2(dx, dy)) * 180) / Math.PI) - 90;
					if (ang == NaN) {
						ang = 45;
					}

					if (start_color && !end_color) {
						end_color = "black";
					}
					else if (!start_color && end_color) {
						start_color = "white";
					}

					var val = "-o-linear-gradient(";
					val += ang + "deg, ";

					val += start_color;
					val += " 0%,";
					if (cssobj.peglist.length) {
						var arr = cssobj._parsePegList(cssobj.peglist);
						var len = arr.length;
						var valarr;
						for (var i = 0; i < len; i++) {
							valarr = arr[i];
							val += nexacro._getWebColorFromXreColor(valarr[1]) + " " + valarr[0] + "%,";
						}
					}
					val += end_color;
					val += " 100%)";
					cssobj._sysvalue = val;
				}
				else {
					cssobj._sysvalue = "";
				}
			};
		}
		else {
			nexacro._makeGradationSysValue = nexacro._emptyFn;
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 10) {
			nexacro._initHTMLSysTimerManager = function (_cur_win) {
				nexacro._createSysTimer_CallbackFuncs(_cur_win);
				_cur_win.nexacro_HTMLSysTimerManager = new nexacro.HTMLSysTimerManager(_cur_win);
			};
			nexacro._finalizeHTMLSysTimerManager = function (_cur_win) {
				_cur_win.nexacro_HTMLSysTimerManager = null;
			};

			nexacro.HTMLSysTimerManager = function (_cur_win) {
				this._cur_win = _cur_win;
				this._timer_idno = 0;
				this._timers = [];

				this._syshandler_timercallback = _cur_win._syshandler_timercallback;
				_cur_win._syshandler_timercallback = null;
			};
			var _pHTMLSysTimerManager = nexacro.HTMLSysTimerManager.prototype;

			_pHTMLSysTimerManager.setInterval = function (timerfn, interval) {
				var timeritem = null;
				var tid = Math.max((this._timer_idno + 1) | 0, 1);
				while ((timeritem = this._timers[tid])) {
					tid = Math.max((tid + 1) | 0, 1);
				}
				;

				this._timer_idno = tid;
				this._timers[tid] = {
					"id" : "", 
					"callback" : timerfn
				};

				var sys_tid = this._cur_win.setInterval("nexacro_HTMLSysTimerManager._syshandler_timercallback(" + tid + ")", interval);
				this._timers[tid].id = sys_tid;
				return tid;
			};
			_pHTMLSysTimerManager.clearInterval = function (timerid) {
				var sys_tid = this._timers[timerid].id;
				this._cur_win.clearInterval(sys_tid);

				delete this._timers[timerid];
			};
			delete _pHTMLSysTimerManager;

			nexacro._createSysTimer_CallbackFuncs = function (_cur_win) {
				_cur_win._syshandler_timercallback = function () {
					if (arguments.length > 0) {
						var tid = arguments[0];
						var callback = _cur_win.nexacro_HTMLSysTimerManager._timers[tid].callback;
						if (callback) {
							try {
								callback.apply(null, arguments);
							}
							catch (e) {
								var sys_tid = _cur_win.nexacro_HTMLSysTimerManager._timers[tid].id;
								_cur_win.clearInterval(sys_tid);
								delete _cur_win.nexacro_HTMLSysTimerManager._timers[tid];
							}
						}
					}
				};
			};

			nexacro._setSystemTimer = function (_win_handle, timerfn, interval) {
				if (_win_handle) {
					return _win_handle.nexacro_HTMLSysTimerManager.setInterval(timerfn, interval);
				}
				return null;
			};
			nexacro._clearSystemTimer = function (_win_handle, timer_handle) {
				if (_win_handle) {
					_win_handle.nexacro_HTMLSysTimerManager.clearInterval(timer_handle);
				}
			};
		}
		else {
			nexacro._initHTMLSysTimerManager = nexacro._emptyFn;
			nexacro._finalizeHTMLSysTimerManager = nexacro._emptyFn;

			nexacro._setSystemTimer = function (_win_handle, timerfn, interval) {
				if (_win_handle) {
					return _win_handle.setInterval(timerfn, interval);
				}
				return null;
			};
			nexacro._clearSystemTimer = function (_win_handle, timer_handle) {
				if (_win_handle) {
					_win_handle.clearInterval(timer_handle);
				}
			};
		}

		nexacro._getProjectBaseURL = function (url) {
			var location = window.location.href;
			if (location.length > 0) {
				return location.substring(0, location.lastIndexOf("/") + 1);
			}

			return "";
		};

		nexacro._checkLicense = nexacro._emptyFn;
		nexacro._updateEngine = nexacro._emptyFn;
		nexacro._addUpdateResoruce = nexacro._emptyFn;
		nexacro._updateResource = nexacro._emptyFn;

		nexacro._checkActiveElement = function (element) {
			var _doc = element.getRootWindowHandle();
			if (!_doc) {
				return false;
			}

			if (!element || !element._parent_elem || !element._parent_elem.linkedcontrol) {
				return false;
			}

			var comp = element._parent_elem.linkedcontrol;
			var win = comp._getWindow();
			if (!win) {
				return false;
			}

			if (!win._is_active_window) {
				return false;
			}

			return (_doc.activeElement == element._input_handle) ? true : false;
		};

		nexacro._loadImageBase64 = function (source, target, handler) {
			var data = source.toString();
			var _handle = nexacro.ImageElement(target.getElement());

			if (data.substring(0, 5) == "data:") {
				data = source;
			}
			else {
				data = "data:image/png;base64," + source;
			}

			_handle.setElementImageUrl(data);

			handler.call(target, errorcode, errormsg, source, data);
			return _handle;
		};

		nexacro._convertRealPath = function (path) {
		};

		nexacro._execBrowser = function (url) {
			var _url = url.toLowerCase();

			var prefix = "mailto:";
			var reg = new RegExp(prefix);
			if (reg.test(_url)) {
				var iframe = document.createElement("iframe");
				var body = document.body;
				iframe.src = prefix + url.substring(7, url.length);
				iframe.style.display = "none";

				var str_title = application._getErrorMessge("msg_accessibility_emptyframe");
				nexacro.__setDOMNodeTitle(iframe, str_title);

				body.appendChild(iframe);
				nexacro.__removeDOMNode(body, iframe);
				iframe = null;
				return 0;
			}

			reg = new RegExp("tel:");
			if (reg.test(_url)) {
				window.open(url);
				return 0;
			}

			url = nexacro._getImageLocation(nexacro._checkDomain(url));
			window.open(url);
			return 0;
		};

		nexacro._checkDomain = function (url) {
			if (url.match("^(https?:\\/\\/)?((([a-z\d](([a-z\d-]*[a-z\d])|([ㄱ-힣]))*)\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$")) {
				if (url.indexOf("http://") != -1 || url.indexOf("https://") != -1) {
					return url;
				}
				else {
					return "http://" + url;
				}
			}
			return url;
		};
		nexacro._execShell = function () {
		};

		nexacro._execNexacro = function (command) {
		};

		nexacro._setClipboard = function (format, data) {
			if (window.clipboardData) {
				if (format == "CF_TEXT") {
					window.clipboardData.setData("text", data);
				}
			}
		};

		nexacro._getClipboard = function (format) {
			var retVal = "";
			if (window.clipboardData) {
				if (format == "CF_TEXT") {
					retVal = window.clipboardData.getData("text");
				}
				return retVal;
			}
		};

		nexacro._clearClipboard = function () {
			if (window.clipboardData) {
				window.clipboardData.clearData("text");
			}
		};

		nexacro._getScreenWidth = function (monitor_index) {
			if (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Chrome") {
				var is_portrait_device = nexacro._searchDeviceExceptionValue("is_portrait_device");
				if (is_portrait_device === true) {
					var orientation = nexacro._getMobileOrientation();
					var is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
					var is_delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
					if (orientation == 2 || orientation == 3) {
						if (is_swap_screen === true && !is_delayed_swap_screen) {
							if (screen.width < screen.height) {
								return screen.height;
							}
						}
					}
				}
			}

			return screen.width;
		};

		nexacro._getScreenHeight = function (monitor_index) {
			if (!nexacro._isDesktop() && nexacro.OS == "Android" && nexacro.Browser == "Chrome") {
				var is_portrait_device = nexacro._searchDeviceExceptionValue("is_portrait_device");
				if (is_portrait_device === true) {
					var orientation = nexacro._getMobileOrientation();
					var is_swap_screen = nexacro._searchDeviceExceptionValue("swap_screen");
					var is_delayed_swap_screen = nexacro._searchDeviceExceptionValue("delayed_swap_screen");
					if (orientation == 2 || orientation == 3) {
						if (is_swap_screen === true && !is_delayed_swap_screen) {
							if (screen.width < screen.height) {
								return screen.width;
							}
						}
					}
				}
			}

			return screen.height;
		};

		nexacro._getScreenAvailWidth = function (monitor_index) {
			return screen.availWidth;
		};

		nexacro._getScreenAvailHeight = function (monitor_index) {
			return screen.availHeight;
		};

		nexacro._getScreenRect = function (monitor_index) {
			return new nexacro.Rect(0, 0, screen.width, screen.height);
		};

		nexacro._isPrimaryMonitor = function (monitor_index) {
		};

		nexacro._getMonitorIndex = function (cursorX, cursorY) {
		};

		nexacro._getOS = function () {
			return nexacro.OS;
		};

		nexacro._getOSVersion = function () {
			if (nexacro.OS.indexOf("Win") >= 0) {
				switch (nexacro.OSVersion) {
					case "5.0":
						return "Windows 2000";
					case "5.01":
						return "Windows 2000, Service Pack 1 (SP1)";
					case "5.1":
						return "Windows XP";
					case "5.2":
						return "Windows Server 2003 / Windows XP 64-bit";
					case "6.0":
						return "Windows Vista";
					case "6.1":
						return "Windows 7";
					case "6.2":
						return "Windows 8";
				}
			}

			if (!nexacro.OS) {
				return;
			}
			return (nexacro.OSVersion ? (nexacro.OS + " " + nexacro.OSVersion) : nexacro.OS);
		};

		nexacro._getTaskbarSize = function () {
			return 0;
		};

		nexacro._getComputerName = function () {
			return "";
		};

		nexacro._getCPUArchitecture = function () {
			return "UNKNOWN";
		};

		nexacro._getCPUCount = function () {
			return 1;
		};

		nexacro._getCPUType = function () {
			return "UNKNOWN PROCESSOR";
		};

		nexacro._getLocale = function () {
			return nexacro.BrowserLang;
		};
		nexacro._getLanguage = function () {
			var arr = nexacro.BrowserLang.split('-');
			return arr ? arr[0] : 'en';
		};

		nexacro._getLoginUser = function () {
			return "";
		};

		nexacro._getMobileOrientation = function () {
			var orientation;
			if (!nexacro.isTouchInteraction) {
				orientation = 4;
			}
			else {
				var o = window ? window.orientation : 0;
				if (o == 90) {
					orientation = 3;
				}
				else if (o == -90) {
					orientation = 2;
				}
				else if (o == 180) {
					orientation = 1;
				}
				else {
					orientation = 0;
				}
			}

			return orientation;
		};



		nexacro._getMobilePhoneNumber = function () {
			return "";
		};

		nexacro._getMobileProductType = function () {
			return nexacro.DEVICE;
		};

		nexacro._getMobileUniqueID = function () {
			return "";
		};

		nexacro._getAccessibilityStatus = function () {
			var accessibility = nexacro._toBoolean(location.search.split('accessibility=')[1]);
			return accessibility;
		};

		nexacro._getMonitorCount = function () {
			return 1;
		};

		nexacro._getNavigatorName = function () {
			return nexacro.Browser;
		};

		nexacro._getCurrentScreenID = function () {
			if (application._curscreen) {
				return application._curscreen.name;
			}

			return application._simulator_screenid;
		};

		nexacro._getCursorX = function (e) {
			var x;
			if (window.event) {
				x = window.event.screenX;
			}
			else {
				return e ? e.screenX : undefined;
			}
			return x;
		};

		nexacro._getCursorY = function (e) {
			var y;
			if (window.event) {
				y = window.event.screenY;
			}
			else {
				return e ? e.screenY : undefined;
			}
			return y;
		};

		nexacro._getUserAppPath = function () {
			return "";
		};

		if ((nexacro.Browser == "IE" && nexacro.BrowserVersion < 9)) {
			nexacro._fireBeforeDblclick = function (comp, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
				var win = comp._getWindow();
				comp._on_lbuttondown(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, undefined, from_comp, from_refer_comp);
				win._on_default_sys_lbuttonup(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
				comp._on_lbuttonup(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, undefined, from_comp, from_refer_comp, comp._control_element);
				comp._on_click(comp._control_element, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY);
			};
		}
		else {
			nexacro._fireBeforeDblclick = nexacro._emptyFn;
		}

		nexacro._getCompOffsetSize = function (comp) {
			var elem = comp._control_element;
			var offs = {
			};
			if (!comp || !comp._control_element) {
				offs.width = 0;
				offs.height = 0;
			}
			else {
				var w = comp._getWindow();
				offs.width = w.getWidth() - (parseInt(elem.left) | 0);
				offs.height = w.getHeight() - ((parseInt(elem.top) | 0) + (parseInt(elem.height) | 0));
			}
			return offs;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 9) {
			nexacro.__checkHighContrast = function () {
				if (window.matchMedia("screen and (-ms-high-contrast)").matches) {
					return true;
				}
				else {
					return false;
				}
			};
		}
		else if (nexacro.Browser == "IE") {
			nexacro.__checkHighContrast = function () {
				var _doc = window.document;
				if (_doc) {
					var _usehighcontrast = false;
					if (!_doc.getElementById('styleTest')) {
						var css = _doc.createElement("style");
						css.type = "text/css";
						css.id = "styleTest";
						var styles = ".checkHighContrast {background : red;}";
						styles += "@media screen and (-ms-high-contrast:active) {.checkHighContrast  { background : white;}}";
						if (css.styleSheet) {
							css.styleSheet.cssText = styles;
						}
						else {
							css.appendChild(_doc.createTextNode(styles));
						}
						var headRef = _doc.getElementsByTagName('head')[0];
						if (headRef) {
							headRef.appendChild(css);
						}
					}
					var _handle = _doc.createElement("div");
					if (_handle && _doc.body) {
						_doc.body.appendChild(_handle);
						_handle.className = "checkHighContrast";
						var color = _handle.currentStyle.getAttribute("backgroundColor");
						if (color != "red") {
							_usehighcontrast = true;
						}

						_doc.body.removeChild(_handle);
					}
					return _usehighcontrast;
				}

				return false;
			};
		}
		else {
			nexacro.__checkHighContrast = function () {
				return false;
			};
		}

		nexacro._adjustPopupPosition = function (comp, x, y, align) {
			var alignPosition = comp._getAlignPosition(x, y, align);

			var _width = comp._width;
			var _height = comp._height;
			var _left = alignPosition[0];
			var _top = alignPosition[1];
			var mainframe = comp._getMainFrame();
			var screenXY = nexacro._getElementScreenPosition(mainframe._control_element);
			var m_screenX = screenXY.x;
			var m_screenY = screenXY.y;

			var m_c_width = mainframe._adjust_width;
			var m_c_height = mainframe._adjust_height;

			if (_left < m_screenX) {
				_left = m_screenX;
			}
			else if (_left + _width >= m_screenX + m_c_width) {
				_left = m_screenX + m_c_width - _width;
			}

			if (_top < m_screenY) {
				_top = m_screenY;
			}
			else if (_top + _height >= m_screenY + m_c_height) {
				_top = m_screenY + m_c_height - _height;
			}
			comp._popup(_left, _top, _width, _height);
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._redrawVMLBorder = function (comp) {
				if (!comp) {
					return;
				}
				var control_elem = comp.getElement();
				if (control_elem && control_elem._vml_elem) {
					var pseudo = comp._getResultPseudo(comp._status, comp._pseudo);
					var border = comp.on_find_CurrentStyle_border(pseudo);
					var bordertype = comp.on_find_CurrentStyle_bordertype(pseudo);
					control_elem.setElementBorder(border, bordertype);
				}
			};

			nexacro._refreshVMLContainerElement = function (control_elem, target_elem) {
				if (control_elem && target_elem && control_elem._dest_handle && target_elem._dest_handle && control_elem._client_element && control_elem._client_element._dest_handle) {
					var target_owner_elem = target_elem._owner_elem;
					nexacro.__unlinkDOMNode(control_elem._handle, target_elem._dest_handle);
					nexacro.__insertDOMNode(control_elem._dest_handle, target_elem._dest_handle, control_elem._client_element._dest_handle);
					target_elem._owner_elem = target_owner_elem;
					return true;
				}
				return false;
			};

			nexacro._refreshVMLContainerElement2 = function (control_elem, target_elem) {
				if (control_elem && control_elem._dest_handle && target_elem && target_elem._dest_handle) {
					var _parent_handle = target_elem._dest_handle.parentNode;
					var _first_handle = nexacro.__getLastChildDOMNode(_parent_handle);

					if (_first_handle && target_elem._dest_handle != _first_handle) {
						nexacro.__unlinkDOMNode(_parent_handle, target_elem._dest_handle);
						_parent_handle.insertBefore(target_elem._dest_handle, _first_handle);
						return true;
					}
				}
				return false;
			};
		}
		else {
			nexacro._redrawVMLBorder = nexacro._emptyFn;
			nexacro._refreshVMLContainerElement = nexacro._emptyFn;
			nexacro._refreshVMLContainerElement2 = nexacro._emptyFn;
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
			nexacro._updateTextElementPositions = function (comp) {
				if (!comp) {
					return;
				}
				var align = comp.on_find_CurrentStyle_align(comp._pseudo);
				var textElem = comp._text_elem;
				if (textElem && align) {
					var client_height = comp._client_height;

					var halign = (align.halign == "" ? "center" : align.halign);
					var valign = (align.valign == "" ? "middle" : align.valign);

					var tw, th;
					var font = comp.currentstyle.font;
					var letterspace = comp.currentstyle.letterspace;
					var size = nexacro._getTextSize(letterspace, comp.text, font, /\r\n|\n/.test(comp.text));
					tw = comp._text_width = size[0];
					var textline = 1;
					if (comp.wordwrap != "none" && comp.wordwrap != "false" && comp.wordwrap != false) {
						textline += parseInt(tw / comp._client_width) | 0;
					}
					th = comp._text_height = size[1] * textline;

					var pos;

					var textpos_y;
					switch (valign) {
						case "top":
							pos = 0;
							textpos_y = pos;
							break;
						case "bottom":
							pos = client_height - th;
							textpos_y = pos;
							break;
						default:
							pos = (client_height - th - 2) / 2 | 0;
							textpos_y = pos;
							break;
					}
					textpos_y = textpos_y < 0 ? 0 : textpos_y;
					textElem.setElementAlignXY(halign, "top");
					textElem.setElementPaddingXY(0, textpos_y, 0, 0);
				}
			};

			nexacro._resetVML = function (comp) {
				if (!comp) {
					return;
				}
				var control_elem = comp._control_element;
				if (comp && comp._isVisible && comp._isVisible()) {
					if (control_elem && control_elem._vml_elem) {
						comp._vml_visible = control_elem._refreshVMLContainerElement(control_elem, control_elem._vml_elem);
					}

					var objs = [];
					if (comp._is_form) {
						objs = comp.components;
					}

					if (objs) {
						var len = 0;
						len = objs.length;
						for (var i = 0; i < len; i++) {
							nexacro._resetVML(objs[i]);
						}
					}

					objs = comp._subctrlitems;
					if (objs) {
						var len = 0;
						len = objs.length;
						for (var i = 0; i < len; i++) {
							nexacro._resetVML(objs[i]);
						}
					}
				}
			};

			nexacro._addSubComponent = function (comp, item) {
				if (!comp) {
					return;
				}
				var parent;
				if (!item) {
					if (comp.parent) {
						parent = comp.parent;
					}
					else {
						return;
					}
					if (comp._popup_window) {
						item = comp._popup_window;
					}
					else {
						item = comp;
					}
				}
				else {
					parent = comp;
				}
				if (!parent._subctrlitems) {
					parent._subctrlitems = [];
				}
				comp._vml_visible = false;
				parent._subctrlitems.push(item);
			};

			nexacro._addSubComponents = function () {
				var len = arguments.length;
				if (len < 2) {
					return;
				}
				var i = 0;
				var parent = arguments[0];
				if (!parent._subctrlitems) {
					parent._subctrlitems = [];
				}
				for (var i = 1; i < len; i++) {
					var comp = arguments[i];
					comp._vml_visible = false;
					parent._subctrlitems.push(comp);
				}
			};

			nexacro._deleteAllSubComponent = function (comp) {
				var components = comp._subctrlitems;
				for (var i = 0, len = components.length; i < len; i++) {
					var obj = components.pop();
					obj = null;
				}
				components = null;
				comp._subctrlitems = null;
			};

			nexacro._deleteSubComponent = function (comp, parent) {
				var components = parent._subctrlitems;
				if (components) {
					for (var i = 0, len = components.length; i < len; i++) {
						var obj = components[i];
						if (obj === comp) {
							obj = components.splice(i, 1);
							obj = null;
							break;
						}
					}
				}

				components = null;
				comp._subctrlitems = null;
			};
		}
		else {
			nexacro._addSubComponent = nexacro._emptyFn;
			nexacro._addSubComponents = nexacro._emptyFn;
			nexacro._deleteAllSubComponent = nexacro._emptyFn;
			nexacro._deleteSubComponent = nexacro._emptyFn;
			nexacro._updateTextElementPositions = nexacro._emptyFn;
			nexacro._resetVML = nexacro._emptyFn;
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.OSVersion >= 6.0) {
				if (nexacro.BrowserVersion >= 11) {
					nexacro._roleList = 
						{
						"alert" : "alert", 
						"application" : "application", 
						"button" : "button", 
						"calendar" : "document", 
						"chart" : "document", 
						"checkbox" : "checkbox", 
						"columnheader" : "option", 
						"combobox" : "combobox", 
						"datepicker" : "document", 
						"dialog" : "dialog", 
						"edit" : "textbox", 
						"fileupload" : "document", 
						"form" : "document", 
						"frame" : "document", 
						"grid" : "document", 
						"gridcell" : "option", 
						"groupbox" : "group", 
						"image" : "img", 
						"listbox" : "listbox", 
						"listitem" : "listitem", 
						"menubar" : "document", 
						"menu" : "menu", 
						"menuitem" : "menuitem", 
						"none" : "option", 
						"progressbar" : "document", 
						"radio" : "document", 
						"radioitem" : "radio", 
						"rowheader" : "option", 
						"scrollbar" : "scrollbar", 
						"slider" : "slider", 
						"spin" : "spinbutton", 
						"splitter" : "document", 
						"static" : "document", 
						"statusbar" : "status", 
						"step" : "document", 
						"tab" : "tablist", 
						"tabitem" : "tab", 
						"tabpage" : "tabpanel", 
						"textbox" : "textbox", 
						"titlebar" : "region", 
						"toolbar" : "toolbar", 
						"tooltip" : "tooltip", 
						"treegrid" : "tree", 
						"treeitem" : "treeitem", 
						"webbrowser" : "document", 
						"link" : "link", 
						"heading" : "document"
					};
				}
				else {
					nexacro._roleList = 
						{
						"alert" : "alert", 
						"application" : "application", 
						"button" : "button", 
						"calendar" : "document", 
						"chart" : "document", 
						"checkbox" : "checkbox", 
						"columnheader" : "document", 
						"combobox" : "combobox", 
						"datepicker" : "document", 
						"dialog" : "dialog", 
						"edit" : "textbox", 
						"fileupload" : "document", 
						"form" : "document", 
						"frame" : "document", 
						"grid" : "document", 
						"gridcell" : "gridcell", 
						"groupbox" : "group", 
						"image" : "img", 
						"listbox" : "listbox", 
						"listitem" : "listitem", 
						"menubar" : "document", 
						"menu" : "menu", 
						"menuitem" : "menuitem", 
						"none" : "option", 
						"progressbar" : "document", 
						"radio" : "document", 
						"radioitem" : "radio", 
						"rowheader" : "document", 
						"scrollbar" : "scrollbar", 
						"slider" : "slider", 
						"spin" : "spinbutton", 
						"splitter" : "document", 
						"static" : "document", 
						"statusbar" : "status", 
						"step" : "document", 
						"tab" : "tablist", 
						"tabitem" : "tab", 
						"tabpage" : "tabpanel", 
						"textbox" : "textbox", 
						"titlebar" : "region", 
						"toolbar" : "toolbar", 
						"tooltip" : "tooltip", 
						"treegrid" : "tree", 
						"treeitem" : "treeitem", 
						"webbrowser" : "document", 
						"link" : "link", 
						"heading" : "document"
					};
				}
			}
			else {
				nexacro._roleList = 
					{
					"alert" : "alert", 
					"application" : "application", 
					"button" : "button", 
					"calendar" : "alert", 
					"chart" : "alert", 
					"checkbox" : "checkbox", 
					"columnheader" : "alert", 
					"combobox" : "combobox", 
					"datepicker" : "alert", 
					"dialog" : "dialog", 
					"edit" : "textbox", 
					"fileupload" : "alert", 
					"form" : "alert", 
					"frame" : "alert", 
					"grid" : "alert", 
					"gridcell" : "gridcell", 
					"groupbox" : "group", 
					"image" : "img", 
					"listbox" : "listbox", 
					"listitem" : "listitem", 
					"menubar" : "menubar", 
					"menu" : "menu", 
					"menuitem" : "menuitem", 
					"none" : "alert", 
					"progressbar" : "alert", 
					"radio" : "alert", 
					"radioitem" : "radio", 
					"rowheader" : "alert", 
					"scrollbar" : "scrollbar", 
					"slider" : "slider", 
					"spin" : "spinbutton", 
					"splitter" : "alert", 
					"static" : "alert", 
					"statusbar" : "status", 
					"step" : "alert", 
					"tab" : "tablist", 
					"tabitem" : "tab", 
					"tabpage" : "tabpanel", 
					"textbox" : "textbox", 
					"titlebar" : "region", 
					"toolbar" : "toolbar", 
					"tooltip" : "tooltip", 
					"treegrid" : "tree", 
					"treeitem" : "treeitem", 
					"webbrowser" : "alert", 
					"link" : "link", 
					"heading" : "alert"
				};
			}
		}
		else if (nexacro.Browser == "Gecko") {
			nexacro._roleList = 
				{
				"alert" : "alert", 
				"application" : "application", 
				"button" : "button", 
				"calendar" : "", 
				"chart" : "", 
				"checkbox" : "checkbox", 
				"columnheader" : "", 
				"combobox" : "combobox", 
				"datepicker" : "", 
				"dialog" : "dialog", 
				"fileupload" : "", 
				"form" : "", 
				"frame" : "", 
				"grid" : "", 
				"gridcell" : "gridcell", 
				"groupbox" : "group", 
				"image" : "img", 
				"listbox" : "listbox", 
				"listitem" : "option", 
				"menubar" : "menubar", 
				"menu" : "menu", 
				"menuitem" : "menuitem", 
				"none" : "", 
				"progressbar" : "", 
				"radio" : "document", 
				"radioitem" : "radio", 
				"rowheader" : "", 
				"scrollbar" : "scrollbar", 
				"slider" : "slider", 
				"spin" : "spinbutton", 
				"splitter" : "", 
				"static" : "", 
				"statusbar" : "status", 
				"step" : "", 
				"tab" : "tablist", 
				"tabitem" : "tab", 
				"tabpage" : "tabpanel", 
				"textbox" : "textbox", 
				"titlebar" : "region", 
				"toolbar" : "toolbar", 
				"tooltip" : "tooltip", 
				"treegrid" : "treegrid", 
				"treeitem" : "treeitem", 
				"webbrowser" : "", 
				"link" : "link", 
				"heading" : ""
			};
		}
		else if (nexacro.Browser == "MobileSafari") {
			nexacro._roleList = 
				{
				"alert" : "alert", 
				"application" : "application", 
				"button" : "button", 
				"calendar" : "textbox", 
				"chart" : "", 
				"checkbox" : "checkbox", 
				"columnheader" : "option", 
				"combobox" : "combobox", 
				"datepicker" : "", 
				"dialog" : "dialog", 
				"edit" : "textbox", 
				"fileupload" : "", 
				"form" : "", 
				"frame" : "", 
				"grid" : "", 
				"gridcell" : "option", 
				"groupbox" : "group", 
				"image" : "img", 
				"listbox" : "listbox", 
				"listitem" : "option", 
				"menubar" : "menubar", 
				"menu" : "menu", 
				"menuitem" : "menuitem", 
				"none" : "", 
				"progressbar" : "", 
				"radio" : "radiogroup", 
				"radioitem" : "radio", 
				"rowheader" : "option", 
				"scrollbar" : "scrollbar", 
				"slider" : "slider", 
				"spin" : "spinbutton", 
				"splitter" : "", 
				"static" : "option", 
				"statusbar" : "status", 
				"step" : "", 
				"tab" : "tablist", 
				"tabitem" : "tab", 
				"tabpage" : "tabpanel", 
				"textbox" : "textbox", 
				"titlebar" : "region", 
				"toolbar" : "toolbar", 
				"tooltip" : "tooltip", 
				"treegrid" : "", 
				"treeitem" : "option", 
				"webbrowser" : "", 
				"link" : "link", 
				"heading" : ""
			};
		}
		else {
			nexacro._roleList = 
				{
				"alert" : "alert", 
				"application" : "application", 
				"button" : "button", 
				"calendar" : "document", 
				"chart" : "", 
				"checkbox" : "checkbox", 
				"columnheader" : "", 
				"combobox" : "combobox", 
				"datepicker" : "", 
				"dialog" : "dialog", 
				"fileupload" : "", 
				"form" : "", 
				"frame" : "", 
				"grid" : "", 
				"gridcell" : "gridcell", 
				"groupbox" : "group", 
				"image" : "img", 
				"listbox" : "listbox", 
				"listitem" : "option", 
				"menubar" : "menubar", 
				"menu" : "menu", 
				"menuitem" : "menuitem", 
				"none" : "", 
				"progressbar" : "", 
				"radio" : "document", 
				"radioitem" : "radio", 
				"rowheader" : "", 
				"scrollbar" : "scrollbar", 
				"slider" : "slider", 
				"spin" : "spinbutton", 
				"splitter" : "", 
				"static" : "", 
				"statusbar" : "status", 
				"step" : "", 
				"tab" : "tablist", 
				"tabitem" : "tab", 
				"tabpage" : "tabpanel", 
				"titlebar" : "region", 
				"toolbar" : "toolbar", 
				"tooltip" : "tooltip", 
				"treegrid" : "treegrid", 
				"treeitem" : "treeitem", 
				"webbrowser" : "", 
				"link" : "link", 
				"heading" : ""
			};
		}

		nexacro.__setEnableAccessibility = nexacro._emptyFn;
		nexacro.__setAccessibilityType = nexacro._emptyFn;
		nexacro._observeGlobalEvent = nexacro._emptyFn;
		nexacro._stopGlobalEvent = nexacro._emptyFn;
		nexacro._setBrowserErrorMsg = nexacro._emptyFn;
		nexacro._initApplication = nexacro._emptyFn;

		nexacro._AppliedTitleBarHeight = function (frame, h) {
			return (frame && frame._is_window) ? 0 : h;
		};

		nexacro._AppliedStatusBarHeight = function (frame, h) {
			return (frame && frame._is_window) ? 0 : h;
		};

		nexacro._isPluginMode = function () {
			return false;
		};

		nexacro._isMobile = function () {
			var uA = navigator.userAgent.toLowerCase();
			if (uA.indexOf("mobile") >= 0) {
				return true;
			}
			return false;
		};

		nexacro._isHybrid = function () {
			return false;
		};
		nexacro._getUserAgent = function () {
			return navigator.userAgent;
		};

		nexacro._refreshCaret = function () {
			var refresh_node = document.createElement("div");
			refresh_node.id = "iOS_refesh_node";
			document.body.appendChild(refresh_node);
			nexacro.OnceCallbackTimer.callonce("", function () {
				document.body.removeChild(refresh_node);
				refresh_node = null;
			});
		};

		nexacro._deleteRefreshNode = function () {
			var refresh_node = document.getElementById("iOS_refresh_node");
			if (refresh_node) {
				document.body.removeChild(refresh_node);
				refresh_node = null;
			}
		};

		nexacro._applyZoomEdge = function (control_elem, v) {
			var edge = control_elem._bkimage_elem;

			if (edge) {
				var x = edge._edgex, y = edge._edgey;
				var edgewidth = 0, edgeheight = 0;

				x = Math.ceil(x * v / 100);
				y = Math.ceil(y * v / 100);
				if (edge.parent) {
					edgewidth = edge.parent._node_width;
					edgeheight = edge.parent._node_height;
				}
				nexacro.__setDOMNodeStyleEdgeBorder(edge._handle.style, edge._img_url, edge._edgex, edge._edgey, x, y);
				nexacro.__setDOMNodeStyleSize(edge._handle.style, edgewidth - x * 2, edgeheight - y * 2);
			}
		};

		nexacro._isRuntimeProtocol = function () {
			return false;
		};
		nexacro._setProtocolVar = nexacro._emptyFn;

		nexacro._isSimulator = function () {
			return false;
		};
	}
}
