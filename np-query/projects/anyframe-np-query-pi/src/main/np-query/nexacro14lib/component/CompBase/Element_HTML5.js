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
	if (!nexacro.Element) {
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro.__createCanvasElementHandle = function (element, _doc, left, top, width, height) {
				var _handle = _doc.createElement("div");
				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeSize(_handle, width, height);
				_handle._linked_element = element;
				_handle._element_type = 9;
				return _handle;
			};
			nexacro.__destroyCanvasElementHandle = nexacro._desyroyElementHandle;
		}
		else if (nexacro.Browser != "Edge" || nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9)) {
			nexacro.__createCanvasElementHandle = function (element, _doc, left, top, width, height) {
				var _handle = _doc.createElement("canvas");
				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeSize(_handle, width, height);

				_handle._linked_element = element;
				_handle._element_type = 9;
				_handle._draw_ctx = _handle.getContext("2d");
				return _handle;
			};
			nexacro.__destroyCanvasElementHandle = function (_parent_handle, _handle) {
				if (_parent_handle) {
					_parent_handle.removeChild(_handle);
				}
				_handle._draw_ctx = null;
				_handle._linked_element = null;
			};
		}

		nexacro.__setElementHandleBringToFront = nexacro.__bringDOMNodeToFront;
		nexacro.__setElementHandleSendToBack = nexacro.__sendDOMNodeToBack;
		nexacro.__setElementHandleMoveToPrev = nexacro.__moveDOMNodeToPrev;
		nexacro.__setElementHandleMoveToNext = nexacro.__moveDOMNodeToNext;


		nexacro.__setLastFocusedElement = function (elem) {
			if (elem) {
				var win = elem.linkedcontrol ? elem.linkedcontrol._getWindow() : (elem._parent_elem ? elem._parent_elem.linkedcontrol._getWindow() : null);
				if (win) {
					var root_win = win;
					while (true) {
						if (root_win instanceof nexacro.PopupWindow) {
							if (root_win == root_win.parent) {
								break;
							}
							root_win = root_win.parent;
						}
						else {
							break;
						}
					}
					if (!root_win) {
						root_win = win;
					}
					root_win._last_focused_elem = elem;
				}
			}
		};




		nexacro.Element = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pElement = nexacro._createPrototype(nexacro.Object, nexacro.Element);
		nexacro.Element.prototype = _pElement;

		_pElement._type_name = "Element";

		_pElement.left = 0;
		_pElement.top = 0;
		_pElement.width = 0;
		_pElement.height = 0;
		_pElement.visible = true;
		_pElement.mirror = false;
		_pElement.rtldirection = "inherit";
		_pElement.letterspace = 0;
		_pElement._handle = null;
		_pElement._dest_handle = null;
		_pElement._owner_elem = null;
		_pElement._is_nc_element = false;

		_pElement.clearContents = nexacro._emptyFn;

		_pElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 0;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}
				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.mirror) {
					var background = this.background;
					if (background && background.image) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
					}
				}

				if (this.rtldirection) {
					nexacro.__setDOMNodeStyleDirection(handle_style, this.rtldirection);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
			}
		};

		_pElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pElement._destroyElementHandle = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle && _owner_elem) {
				_handle._linked_element = null;
				nexacro.__removeDOMNode(_owner_elem._handle, _handle);
				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
		};

		_pElement._removeElementHandle = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle && _owner_elem) {
				_handle._linked_element = null;
				nexacro.__removeDOMNode(_owner_elem._handle, _handle);
				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
		};

		_pElement._appendToContainer = function (_owner_elem) {
			var _handle = this._handle;
			if (_handle && _owner_elem._handle && this._owner_elem == null) {
				this._owner_elem = _owner_elem;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
			}
		};

		_pElement._removeFromContainer = function () {
			var _owner_elem = this._owner_elem;
			if (_owner_elem) {
				this._owner_elem = null;
				var _handle = this._handle;
				if (_handle && _owner_elem._handle) {
					nexacro.__unlinkDOMNode(_owner_elem._dest_handle, _handle);
				}
			}
		};

		_pElement.getContainerElement = function () {
			return this;
		};
		_pElement.getRootWindowHandle = function () {
			if (this._owner_elem) {
				return this._owner_elem.getRootWindowHandle();
			}
			return null;
		};
		_pElement._getElementBaseUrl = function () {
			var tmp = this;
			while (tmp && !tmp._is_form) {
				tmp = tmp.parent;
			}

			if (tmp && tmp._is_form) {
				return tmp._getFormBaseUrl();
			}
			return "";
		};

		_pElement.hasSetSelectionRange = function () {
			var _handle = this._input_handle;
			if (_handle) {
				if (_handle.setSelectionRange) {
					return true;
				}
			}
			return false;
		};

		_pElement._getParentFont = function () {
			var elem = this._parent_elem;
			while (elem) {
				if (elem.font) {
					return elem.font;
				}
				elem = elem._parent_elem;
			}
			return null;
		};

		_pElement._getParentLetterSpace = function () {
			var elem = this._parent_elem;
			while (elem) {
				if (elem.letterspace) {
					return elem.letterspace;
				}
				elem = elem._parent_elem;
			}
			return 0;
		};

		_pElement._isRtl = function () {
			var elem = this._parent_elem;
			var rtldirection = this.rtldirection;
			while (elem) {
				if (elem.rtldirection && elem.rtldirection != "inherit") {
					rtldirection = elem.rtldirection;
					break;
				}
				elem = elem._parent_elem;
			}

			return rtldirection == "rtl";
		};

		_pElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStylePos(_handle.style, left, top);
				}
			}
		};

		_pElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;

				if (width < 0) {
					width = 0;
				}
				if (height < 0) {
					height = 0;
				}

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
				}
			}
		};

		_pElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleLetterSpace(_handle.style, letterspace);
				}
			}
		};

		_pElement.setElementVisible = function (visible) {
			if (this.visible != visible) {
				this.visible = visible;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleVisible(_handle.style, visible);

					if (nexacro.OS == "Android" || nexacro.OS == "iOS") {
						if (this.visible) {
							var v = this.zindex;
							if (!v || v < 0) {
								v = "";
							}
							nexacro.__setDOMNodeStyleZindex(_handle.style, v);
						}
						else {
							nexacro.__setDOMNodeStyleZindex(_handle.style, nexacro._zindex_hide);
						}
					}
				}
			}
		};

		_pElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
			var v = this.mirror;

			if (rtlimagemirroring) {
				v = nexacro._toBoolean(rtlimagemirroring._value);
			}

			if (this.mirror != v || bChangeRtlDirection) {
				this.mirror = v;

				var background = this.background;
				var image = this.image;

				if (background && background.image) {
					var handle = this._handle;
					var bRtl = this._isRtl();
					if (handle) {
						this.setElementBorder(this.border, this.bordertype);
						this.setElementPadding(this.padding);
						nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
					}

					if (this._client_element) {
						handle = this._client_element._handle;
						if (handle) {
							nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
						}
					}
				}
			}
		};

		_pElement.setElementRtlDirection = function (rtldirection) {
			if (this.rtldirection != rtldirection) {
				this.rtldirection = rtldirection;

				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStyleDirection(handle.style, rtldirection);
				}
				if (this.align) {
					this.setElementAlign(this.align);
				}
				if (this.halign && this.valign) {
					this.setElementAlignXY(this.halign, this.valign);
				}
				if (this.shadow) {
					this.setElementShadow(this.shadow);
				}
				if (this.border) {
					this.setElementBorder(this.border, this.bordertype);
				}
				if (this.bordertype) {
					this.setElementBorder(this.border, this.bordertype);
				}
				if (this.padding) {
					this.setElementPadding(this.padding);
				}
				if (this.gradation) {
					this.setElementBackground(this.background, this.gradation);
				}
			}
		};

		_pElement.setElementEnable = nexacro._emptyFn;
		_pElement.setElementTabIndex = nexacro._emptyFn;

		_pElement.setElementAlign = nexacro._emptyFn;
		_pElement.setElementAlignXY = nexacro._emptyFn;

		_pElement.setElementPadding = nexacro._emptyFn;
		_pElement.setElementPaddingXY = nexacro._emptyFn;

		_pElement.setElementFont = nexacro._emptyFn;
		_pElement.setElementColor = nexacro._emptyFn;

		_pElement.setElementCursor = nexacro._emptyFn;

		delete _pElement;


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			nexacro._VMLContainerElement = function (parent_elem) {
				this.parent = parent_elem;
				this._parent_elem = parent_elem;
			};
			var __pVMLContainerElement = nexacro._createPrototype(nexacro.Element, nexacro._VMLContainerElement);
			nexacro._VMLContainerElement.prototype = __pVMLContainerElement;
			__pVMLContainerElement._type_name = "VMLContainerElement";

			__pVMLContainerElement.bordertype = null;
			__pVMLContainerElement.border = null;
			__pVMLContainerElement.background = null;
			__pVMLContainerElement._inner_left = 0;
			__pVMLContainerElement._inner_top = 0;
			__pVMLContainerElement._inner_width = 0;
			__pVMLContainerElement._inner_height = 0;
			__pVMLContainerElement._outer_path = "";
			__pVMLContainerElement._inner_path = "";
			__pVMLContainerElement._border_handle = null;
			__pVMLContainerElement._backgroundtype = 0;
			__pVMLContainerElement._applied_backgroundtype = 0;
			__pVMLContainerElement._background_handle = null;
			__pVMLContainerElement._background_fill_handle = null;
			__pVMLContainerElement._imagetype = 0;
			__pVMLContainerElement._applied_imagetype = 0;
			__pVMLContainerElement._image_handle = null;
			__pVMLContainerElement._image_fill_handle = null;
			__pVMLContainerElement._img_url = "";
			__pVMLContainerElement._img_repeat = "";
			__pVMLContainerElement._img_bkpos_x = 0;
			__pVMLContainerElement._img_bkpos_y = 0;
			__pVMLContainerElement._need_update = false;
			__pVMLContainerElement._need_update_border = false;
			__pVMLContainerElement._need_update_background = false;
			__pVMLContainerElement._need_update_image = false;
			__pVMLContainerElement._is_nc_element = true;

			__pVMLContainerElement.create = function (before_node) {
				var _owner_elem = this._parent_elem;
				if (_owner_elem._handle) {
					if (!this._handle) {
						this._owner_elem = _owner_elem;
						var _doc = _owner_elem.getRootWindowHandle();
						var _handle = _doc.createElement("div");
						_handle.id = this._parent_elem._handle.id + this._type_name;

						nexacro.__setDOMNodeSelectable(_handle, false);

						var handle_style = _handle.style;
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
						nexacro.__setDOMNodeStylePos(handle_style, 0, 0);
						nexacro.__setDOMNodeStyleUnitSize(handle_style, "100%", "100%");

						this._handle = this._dest_handle = _handle;
					}

					if (before_node) {
						nexacro.__insertDOMNode(_owner_elem._dest_handle, this._handle, before_node);
					}
					else {
						nexacro.__appendDOMNode(_owner_elem._dest_handle, this._handle);
					}

					this.updateVMLInfo();
				}
			};

			__pVMLContainerElement.destroy = function () {
				var _handle = this._handle;
				if (_handle) {
					_handle._linked_element = null;
					if (this._owner_elem && this._owner_elem._dest_handle) {
						nexacro.__removeDOMNode(this._owner_elem._dest_handle, _handle);
					}
					this._owner_elem = null;
					this._handle = this._dest_handle = null;

					var _background_handle = this._background_handle;
					if (_background_handle) {
						nexacro.__removeDOMNode(_handle, _background_handle);
						var _background_fill_handle = this._background_fill_handle;
						if (_background_fill_handle) {
							nexacro.__removeDOMNode(_background_handle, _background_fill_handle);
						}
					}
					var _border_handle = this._border_handle;
					if (_border_handle) {
						nexacro.__removeDOMNode(_handle, _border_handle);
					}
					var _image_handle;
					if (_image_handle) {
						nexacro.__removeDOMNode(_handle, _image_handle);
						var _image_fill_handle = this._image_fill_handle;
						if (_image_fill_handle) {
							nexacro.__removeDOMNode(_image_handle, _image_fill_handle);
						}
					}

					this._background_fill_handle = null;
					this._border_handle = null;
					this._background_handle = null;
					this._image_handle = null;
					this._image_fill_handle = null;
				}
				this.parent = null;
				this._parent_elem = null;
			};

			__pVMLContainerElement.clearContents = function () {
				var _handle = this._handle;
				var _owner_elem = this._owner_elem;
				if (_handle) {
					if (_owner_elem) {
						nexacro.__removeDOMNode(_owner_elem._handle, _handle);
					}
					this._owner_elem = null;
				}
			};

			__pVMLContainerElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;

					if (this.bordertype) {
						this.setVMLBorder(this.bordertype, this.border);
						if (this._handle) {
							this.updateVMLInfo();
						}
					}
				}
			};

			__pVMLContainerElement._createVMLOuterPath = function (width, height, radius_x, radius_y, bordertype) {
				var x1 = 0, x2 = width * 10, y1 = 0, y2 = height * 10;

				var patharr = [];
				if (radius_x > 0 && radius_y > 0) {
					var rx = radius_x * 10, ry = radius_y * 10;

					if (bordertype._lefttop) {
						patharr.push('m' + x1 + ',' + (y1 + ry) + 'qy' + (x1 + rx) + ',' + y1);
					}
					else {
						patharr.push('m' + x1 + ',' + y1);
					}
					if (bordertype._righttop) {
						patharr.push('l' + (x2 - rx) + ',' + y1 + 'qx' + x2 + ',' + (y1 + ry));
					}
					else {
						patharr.push('l' + x2 + ',' + y1);
					}
					if (bordertype._rightbottom) {
						patharr.push('l' + x2 + ',' + (y2 - ry) + 'qy' + (x2 - rx) + ',' + y2);
					}
					else {
						patharr.push('l' + x2 + ',' + y2);
					}
					if (bordertype._leftbottom) {
						patharr.push('l' + (x1 + rx) + ',' + y2 + 'qx' + x1 + ',' + (y2 - ry));
					}
					else {
						patharr.push('l' + x1 + ',' + y2);
					}
					patharr.push('x');
				}
				else {
					patharr.push('m' + x1 + ',' + y1);
					patharr.push('l' + x2 + ',' + y1);
					patharr.push('l' + x2 + ',' + y2);
					patharr.push('l' + x1 + ',' + y2);
					patharr.push('x');
				}
				return patharr.join('');
			};
			__pVMLContainerElement._createVMLInnerPath = function (width, height, radius_x, radius_y, border, bordertype) {
				var top = border._top_width;
				var right = border._right_width;
				var bottom = border._bottom_width;
				var left = border._left_width;

				var x1 = 0, x2 = width * 10, y1 = 0, y2 = height * 10;
				if (border && !border._is_real_empty()) {
					x1 += left * 10;
					x2 -= right * 10;
					y1 += top * 10;
					y2 -= bottom * 10;
				}
				if (x1 >= x2 || y1 >= y2) {
					return "";
				}

				var patharr = [];
				var rx, ry;
				if (radius_x > 0 && radius_y > 0) {
					rx = (radius_x - left) * 10;
					ry = (radius_y - top) * 10;
					if (rx > 0 && ry > 0 && bordertype._lefttop) {
						patharr.push('m' + x1 + ',' + (y1 + ry) + 'qy' + (x1 + rx) + ',' + y1);
					}
					else {
						patharr.push('m' + x1 + ',' + y1);
					}
					rx = (radius_x - right) * 10;
					ry = (radius_y - top) * 10;
					if (rx > 0 && ry > 0 && bordertype._righttop) {
						patharr.push('l' + (x2 - rx) + ',' + y1 + 'qx' + x2 + "," + (y1 + ry));
					}
					else {
						patharr.push('l' + x2 + ',' + y1);
					}
					rx = (radius_x - right) * 10;
					ry = (radius_y - bottom) * 10;
					if ((rx > 0 && ry > 0) && bordertype._rightbottom) {
						patharr.push('l' + x2 + ',' + (y2 - ry) + 'qy' + (x2 - rx) + ',' + y2);
					}
					else {
						patharr.push('l' + x2 + ',' + y2);
					}
					rx = (radius_x - left) * 10;
					ry = (radius_y - bottom) * 10;
					if (rx > 0 && ry > 0 && bordertype._leftbottom) {
						patharr.push('l' + (x1 + rx) + ',' + y2 + 'qx' + x1 + ',' + (y2 - ry));
					}
					else {
						patharr.push('l' + x1 + ',' + y2);
					}
					patharr.push('x');
				}
				else {
					patharr.push('m' + x1 + ',' + y1);
					patharr.push('l' + x2 + ',' + y1);
					patharr.push('l' + x2 + ',' + y2);
					patharr.push('l' + x1 + ',' + y2);
					patharr.push('x');
				}
				return patharr.join('');
			};

			__pVMLContainerElement.setVMLBorder = function (bordertype, border) {
				if (this.bordertype != bordertype || this.border != border || this.prev_width != this.width || this.prev_height != this.height) {
					var width = this.width;
					var height = this.height;

					if (bordertype && border) {
						var _border_width = border._getBorderWidth();
						var _border_height = border._getBorderHeight();

						this._inner_left = border._left_width;
						this._inner_top = border._top_width;
						this._inner_width = width - _border_width;
						this._inner_height = height - _border_height;

						var color = border._syscolor;
						if (!color || color == "") {
							color = border._top_syscolor;
						}
						this._border_color = color;

						var radius_x = bordertype._radiusx, radius_y = bordertype._radiusy;
						var round_adjust = 0;
						if ((radius_x + radius_x) > width) {
							round_adjust = radius_x - Math.floor(width / 2);
						}
						if ((radius_y + radius_y) > height) {
							var round_adjust2 = radius_y - Math.floor(height / 2);
							if (round_adjust2 > round_adjust) {
								round_adjust = round_adjust2;
							}
						}
						if (round_adjust) {
							radius_x -= round_adjust;
							radius_y -= round_adjust;
						}

						var outer_path = this._createVMLOuterPath(width, height, radius_x, radius_y, bordertype);
						var inner_path = this._createVMLInnerPath(width, height, radius_x, radius_y, border, bordertype);
						this._outer_path = outer_path;
						this._inner_path = inner_path;
					}
					else {
						this._inner_left = 0;
						this._inner_top = 0;
						this._inner_width = width;
						this._inner_height = height;

						this._outer_path = "";
						var inner_path = this._createVMLOuterPath(width, height, 0, 0, bordertype);
						this._inner_path = inner_path;
					}

					this.prev_width = width;
					this.prev_height = height;
					this.bordertype = bordertype;
					this.border = border;
					this._need_update = true;
					this._need_update_border = true;
				}
			};

			__pVMLContainerElement.setVMLBackground = function (background, gradation) {
				if ((background && (this.background != background || this.background._syscolor != background._syscolor)) || (background.color == "@gradation" && (gradation && (this.gradation != gradation || this.gradation._sysvalue2 != gradation._sysvalue2)))) {
					if (background) {
						if (background.color == "@gradation" && gradation && gradation._sysvalue2) {
							this._backgroundtype = 2;
						}
						else if (background._value == "transparent") {
							background._syscolor = "transparent";
							background._sysopacity = 0;
							this._backgroundtype = 1;
						}
						else if (background._syscolor) {
							this._backgroundtype = 1;
						}
						else if (nexacro.BrowserVersion == 8) {
							background._syscolor = "transparent";
							background._sysopacity = 0;
							this._backgroundtype = 1;
						}
						else {
							this._backgroundtype = 0;
						}

						this.background = background;
						this.gradation = gradation;
					}
					else {
						this.background = null;
						this.gradation = null;
						this._backgroundtype = 0;
					}
					this._need_update = true;
					this._need_update_background = true;
				}
			};

			__pVMLContainerElement.setVMLStretchImage = function (url) {
				if (this._imagetype != 2 || this.img_url != url) {
					this._imagetype = 2;
					this._img_url = url;
					this._img_repeat = "";
					this._img_bkpos_x = 0;
					this._img_bkpos_y = 0;
					this._need_update = true;
					this._need_update_image = true;
				}
			};

			__pVMLContainerElement.setVMLRepeatImage = function (_handle, url, repeat, posx, posy) {
				if (repeat == "") {
					repeat = "no-repeat";
				}
				if (this._imagetype != 1 || this.img_url != url || this._img_repeat != repeat || this._img_bkpos_x != posx || this._img_bkpos_y != posy) {
					this._imagetype = 1;
					this._img_url = url;
					this._img_repeat = repeat;
					this._img_bkpos_x = posx;
					this._img_bkpos_y = posy;
					this._need_update = true;
					this._need_update_image = true;
				}
			};

			__pVMLContainerElement.clearVMLImage = function () {
				if (this._imagetype != 0) {
					this._imagetype = 0;
					this._img_url = "";
					this._img_repeat = "";
					this._img_bkpos = "";
					this._need_update_image = true;
				}
			};

			__pVMLContainerElement.updateVMLInfo = function () {
				var _handle = this._handle;
				var _doc = this.getRootWindowHandle();
				if (_handle && _doc) {
					var _backgroundtype = this._backgroundtype;

					var _need_update_border = this._need_update_border;
					var _need_update_background = this._need_update_background;
					var _need_update_image = this._need_update_image;

					var _border_handle = this._border_handle;
					var _background_handle = this._background_handle;
					var _image_handle = this._image_handle;

					if (_need_update_background) {
						var _applied_backgroundtype = this._applied_backgroundtype;
						var _backgroundtype = this._backgroundtype;
						if (_backgroundtype == 0) {
							if (_background_handle) {
								nexacro.__removeDOMNode(_handle, _background_handle);
								var _background_fill_handle = this._background_fill_handle;
								if (_background_fill_handle) {
									nexacro.__removeDOMNode(_background_handle, _background_fill_handle);
								}
								this._background_handle = null;
								this._background_fill_handle = null;
							}
						}
						else if (_backgroundtype == 1) {
							var background = this.background;
							if (_applied_backgroundtype == 0) {
								_background_handle = _doc.createElement("<v:shape style='position:absolute;width:1px;height:1px;' stroked='f' coordorigin='5 5' coordsize='10 10'>");
								_background_handle.path = this._inner_path;
								if (_image_handle) {
									_handle.insertBefore(_background_handle, _image_handle);
								}
								else if (_border_handle) {
									_handle.insertBefore(_background_handle, _border_handle);
								}
								else {
									_handle.appendChild(_background_handle);
								}
								this._background_handle = _background_handle;
								if (background._syscolor == "transparent" && nexacro.BrowserVersion == 8) {
									_background_handle.fillcolor = "none";
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}
									_fill_handle = _doc.createElement("<v:fill color = 'red' opacity= '0' />");
									_background_handle.appendChild(_fill_handle);
									this._background_fill_handle = _fill_handle;
								}
								else if (background._syscolor == "transparent") {
									_background_handle.fillcolor = "none";
								}
								else {
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}
									var opacity = (background._sysopacity / 100);
									var bksyscolor = background._syscolor;
									_fill_handle = _doc.createElement("<v:fill type= 'gradient' color = '" + bksyscolor + "' opacity = '" + opacity + "' color2 = '" + bksyscolor + "'" + " o:opacity2 = '" + opacity + "' colors = '0 " + bksyscolor + " 1 " + bksyscolor + "' />");
									_background_handle.appendChild(_fill_handle);
									this._background_fill_handle = _fill_handle;
								}
							}
							else if (_applied_backgroundtype >= 1) {
								if (background._syscolor == "transparent" && nexacro.BrowserVersion == 8) {
									_background_handle.fillcolor = "none";
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}
									_fill_handle = _doc.createElement("<v:fill color = 'red' opacity= '0' />");
									_background_handle.appendChild(_fill_handle);
									this._background_fill_handle = _fill_handle;
								}
								else if (background._syscolor == "transparent") {
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}
									_background_handle.fillcolor = "none";
								}
								else {
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}
									var opacity = (background._sysopacity / 100);
									var bksyscolor = background._syscolor;
									_fill_handle = _doc.createElement("<v:fill type= 'gradient' color = '" + bksyscolor + "' opacity = '" + opacity + "' color2 = '" + bksyscolor + "'" + " o:opacity2 = '" + opacity + "' colors = '0 " + bksyscolor + " 1 " + bksyscolor + "' />");
									_background_handle.appendChild(_fill_handle);
									this._background_fill_handle = _fill_handle;
								}
							}
							else if (_applied_backgroundtype == 2) {
								var _fill_handle = this._background_fill_handle;
								if (_fill_handle) {
									nexacro.__removeDOMNode(_background_handle, _fill_handle);
									this._background_fill_handle = null;
								}
								_fill_handle = _doc.createElement("<v:fill color = '" + background._syscolor + "'" + " opacity= '" + (background._sysopacity / 100) + "' />");
								_background_handle.appendChild(_fill_handle);
								this._background_fill_handle = _fill_handle;
							}
						}
						else {
							var gradation = this.gradation;
							this._need_vmlrefresh = true;
							if (_applied_backgroundtype == 0) {
								_background_handle = _doc.createElement("<v:shape style='position:absolute;width:1px;height:1px' stroked='f' coordorigin='5 5' coordsize='10 10'>");
								_background_handle.path = this._inner_path;
								var _fill_handle = _doc.createElement("<v:fill " + gradation._sysvalue2 + ">");
								_background_handle.appendChild(_fill_handle);
								if (_image_handle) {
									_handle.insertBefore(_background_handle, _image_handle);
								}
								else if (_border_handle) {
									_handle.insertBefore(_background_handle, _border_handle);
								}
								else {
									_handle.appendChild(_background_handle);
								}
								this._background_handle = _background_handle;
								this._background_fill_handle = _fill_handle;
							}
							else if (_applied_backgroundtype == 1) {
								if (gradation._sysvalue2) {
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}

									_fill_handle = _doc.createElement("<v:fill " + gradation._sysvalue2 + ">");
									_background_handle.appendChild(_fill_handle);
									this._background_fill_handle = _fill_handle;
								}
							}
							else if (_applied_backgroundtype == 2) {
								if (gradation._sysvalue2) {
									var _fill_handle = this._background_fill_handle;
									if (_fill_handle) {
										nexacro.__removeDOMNode(_background_handle, _fill_handle);
										this._background_fill_handle = null;
									}
									_fill_handle = _doc.createElement("<v:fill " + gradation._sysvalue2 + ">");
									_background_handle.appendChild(_fill_handle);
									this._background_fill_handle = _fill_handle;
								}
							}
						}
						this._applied_backgroundtype = _backgroundtype;
					}
					else {
						if (_need_update_border && _background_handle) {
							_background_handle.path = this._inner_path;
						}
					}

					if (_need_update_image) {
						var _applied_imagetype = this._applied_imagetype;
						var _imagetype = this._imagetype;
						if (_imagetype == 0) {
							if (_image_handle) {
								nexacro.__removeDOMNode(_handle, _image_handle);
								var _image_fill_handle = this._image_fill_handle;
								if (_image_fill_handle) {
									nexacro.__removeDOMNode(_image_handle, _image_fill_handle);
								}
								this._image_handle = null;
								this._image_fill_handle = null;
							}
						}
						else if (_imagetype == 1) {
							if (_applied_imagetype == 0) {
								_image_handle = _doc.createElement("div");
								var handle_style = _image_handle.style;

								nexacro.__setDOMNodeStyleAbsolute(handle_style);
								nexacro.__setDOMNodeStylePos(handle_style, this._inner_left, this._inner_top);
								nexacro.__setDOMNodeStyleSize(handle_style, this._inner_width, this._inner_height);
								nexacro.__setDOMNodeStyleBackgroundImage(handle_style, this._img_url, this._img_repeat, (this._img_bkpos_x + "% " + this._img_bkpos_y + "%"));

								if (_border_handle && nexacro.BrowserVersion < 8) {
									_handle.insertBefore(_image_handle, _border_handle);
								}
								else {
									_handle.appendChild(_image_handle);
								}
								this._image_handle = _image_handle;
								this._image_fill_handle = null;
							}
							else if (_applied_imagetype == 1) {
								var handle_style = _image_handle.style;
								nexacro.__setDOMNodeStylePos(handle_style, this._inner_left, this._inner_top);
								nexacro.__setDOMNodeStyleSize(handle_style, this._inner_width, this._inner_height);
								nexacro.__setDOMNodeStyleBackgroundImage(handle_style, this._img_url, this._img_repeat, (this._img_bkpos_x + "% " + this._img_bkpos_y + "%"));
							}
							else {
								if (_image_handle) {
									nexacro.__removeDOMNode(_handle, _image_handle);
									var _image_fill_handle = this._image_fill_handle;
									if (_image_fill_handle) {
										nexacro.__removeDOMNode(_image_handle, _image_fill_handle);
									}
									this._image_handle = null;
									this._image_fill_handle = null;
								}
								_image_handle = _doc.createElement("div");
								var handle_style = _image_handle.style;

								nexacro.__setDOMNodeStyleAbsolute(handle_style);
								nexacro.__setDOMNodeStylePos(handle_style, this._inner_left, this._inner_top);
								nexacro.__setDOMNodeStyleSize(handle_style, this._inner_width, this._inner_height);
								nexacro.__setDOMNodeStyleBackgroundImage(handle_style, this._img_url, this._img_repeat, (this._img_bkpos_x + "% " + this._img_bkpos_y + "%"));
								if (_border_handle && nexacro.BrowserVersion < 8) {
									_handle.insertBefore(_image_handle, _border_handle);
								}
								else {
									_handle.appendChild(_image_handle);
								}
								this._image_handle = _image_handle;
								if (this._image_fill_handle) {
									nexacro.__removeDOMNode(_image_handle, this._image_fill_handle);
									this._image_fill_handle = null;
								}
							}
						}
						else {
							if (_applied_imagetype == 0) {
								_image_handle = _doc.createElement("<v:shape style='position:absolute;width:1px;height:1px;' stroked='f' coordorigin='5 5' coordsize='10 10'>");
								_image_handle.path = this._inner_path;
								var _fill_handle = _doc.createElement("<v:fill  type='frame' src='" + this._img_url + "'/>");
								_image_handle.appendChild(_fill_handle);
								if (_border_handle && nexacro.BrowserVersion < 8) {
									_handle.insertBefore(_image_handle, _border_handle);
								}
								else {
									_handle.appendChild(_image_handle);
								}
								this._image_handle = _image_handle;
								this._image_fill_handle = _fill_handle;
							}
							else if (_applied_imagetype == 1) {
								if (_image_handle) {
									nexacro.__removeDOMNode(_handle, _image_handle);
									var _image_fill_handle = this._image_fill_handle;
									if (_image_fill_handle) {
										nexacro.__removeDOMNode(_image_handle, _image_fill_handle);
									}
									this._image_handle = null;
									this._image_fill_handle = null;
								}
								_image_handle = _doc.createElement("<v:shape style='position:absolute;width:1px;height:1px;' stroked='f' coordorigin='5 5' coordsize='10 10'>");
								_image_handle.path = this._inner_path;
								var _fill_handle = _doc.createElement("<v:fill  type='frame' src='" + this._img_url + "'/>");
								_image_handle.appendChild(_fill_handle);
								if (_border_handle && nexacro.BrowserVersion < 8) {
									_handle.insertBefore(_image_handle, _border_handle);
								}
								else {
									_handle.appendChild(_image_handle);
								}
								this._image_handle = _image_handle;
								this._image_fill_handle = _fill_handle;
							}
							else if (_applied_imagetype == 2) {
								_image_handle.path = this._inner_path;
								var _fill_handle = this._image_fill_handle;
								if (_fill_handle) {
									_fill_handle.src = this._img_url;
								}
							}
						}
						this._applied_imagetype = _imagetype;
					}
					else {
						if (_need_update_border && _image_handle) {
							if (_imagetype == 1) {
								nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
								nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);
							}
							else if (_imagetype == 2) {
								_image_handle.path = this._inner_path;
							}
						}
					}

					if (_need_update_border) {
						var _outer_path = this._outer_path;
						if (_border_handle) {
							if (_outer_path) {
								_border_handle.path = _outer_path + " " + this._inner_path + " e";
								if (this._border_color == "transparent" || this._border_color == "") {
									_border_handle.fillcolor = "none";
								}
								else {
									_border_handle.fillcolor = this._border_color;
								}
								this._border_handle = _border_handle;
							}
							else {
								nexacro.__removeDOMNode(_handle, _border_handle);
								this._border_handle = null;
							}
						}
						else if (_outer_path) {
							_border_handle = _doc.createElement("<v:shape style='position:absolute;width:1px;height:1px' stroked='f' coordorigin='5 5' coordsize='10 10'>");
							if (_background_handle && nexacro.BrowserVersion == 8) {
								_handle.insertBefore(_border_handle, _background_handle);
							}
							else {
								_handle.appendChild(_border_handle);
							}
							_border_handle.path = this._outer_path + " " + this._inner_path + " e";
							if (this._border_color == "transparent" || this._border_color == "") {
								_border_handle.fillcolor = "none";
							}
							else {
								_border_handle.fillcolor = this._border_color;
							}
							this._border_handle = _border_handle;
						}
					}

					this._need_update = false;
					this._need_update_border = false;
					this._need_update_background = false;
					this._need_update_image = false;
				}
			};
			delete __pVMLContainerElement;


			nexacro._RepeatImageElement = function (parent_elem) {
				this.parent = parent_elem;
				this._parent_elem = parent_elem;
			};
			var __pRepeatImageElement = nexacro._createPrototype(nexacro.Element, nexacro._RepeatImageElement);
			nexacro._RepeatImageElement.prototype = __pRepeatImageElement;

			__pRepeatImageElement._type_name = "RepeatImageElement";

			__pRepeatImageElement._img_url = "";
			__pRepeatImageElement._repeat = "";
			__pRepeatImageElement._posx = 0;
			__pRepeatImageElement._posy = 0;
			__pRepeatImageElement._is_nc_element = true;

			__pRepeatImageElement.create = function (before_elem) {
				var _owner_elem = this._parent_elem;
				if (_owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					_handle.id = this._parent_elem._handle.id + this._type_name;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

					this._handle = this._dest_handle = _handle;
					if (before_elem) {
						nexacro.__insertDOMNode(_owner_elem._dest_handle, _handle, before_elem._handle);
					}
					else {
						nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
					}

					if (this._img_url) {
						nexacro.__setDOMNodeStyleBackgroundImage(handle_style, this._img_url, this._repeat, (this._posx + "% " + this._posy + "%"));
					}

					if (this.mirror) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
					}
				}
			};

			__pRepeatImageElement.setElementInfo = function (url, repeat, posx, posy) {
				if (this._img_url != url || this._repeat != repeat || this._posx != posx || this._posy != posy) {
					this._img_url = url;
					this._repeat = repeat;
					this._posx = posx;
					this._posy = posy;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setDOMNodeStyleBackgroundImage(_handle.style, url, repeat, (posx + "% " + posy + "%"));
					}
				}
			};

			__pRepeatImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
				var v = this.mirror;

				if (rtlimagemirroring) {
					v = nexacro._toBoolean(rtlimagemirroring._value);
				}

				if (this.mirror != v || bChangeRtlDirection) {
					this.mirror = v;

					var handle = this._handle;
					if (handle) {
						nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
					}
				}
			};

			delete __pRepeatImageElement;


			nexacro._StretchImageElement = function (parent_elem) {
				this.parent = parent_elem;
				this._parent_elem = parent_elem;
			};
			var __pStretchImageElement = nexacro._createPrototype(nexacro.Element, nexacro._StretchImageElement);
			nexacro._StretchImageElement.prototype = __pStretchImageElement;

			__pStretchImageElement._type_name = "StretchImageElement";

			__pStretchImageElement._img_url = "";
			__pStretchImageElement._is_nc_element = true;

			__pStretchImageElement.create = function (before_elem) {
				var _owner_elem = this._parent_elem;
				if (_owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("img");
					_handle.id = this._parent_elem._handle.id + this._type_name;
					_handle._linked_element = this;

					nexacro.__setDOMNodeSelectable(_handle, false);
					nexacro.__setDOMNodeAlt(_handle, this._parent_elem.accessibility_label ? this._parent_elem.accessibility_label : this._parent_elem.linkedcontrol.id);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

					if (this._img_url) {
						nexacro.__setImageDOMNodeImageUrl(_handle, this._img_url);
					}

					if (this.mirror) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
					}

					this._handle = this._dest_handle = _handle;
					if (before_elem) {
						nexacro.__insertDOMNode(_owner_elem._dest_handle, _handle, before_elem._handle);
					}
					else {
						var _parent_handle = _owner_elem._dest_handle;
						var _lastchild_handle = nexacro.__getLastChildDOMNode(_parent_handle);
						nexacro.__insertDOMNode(_parent_handle, _handle, _lastchild_handle);
					}
				}
			};

			__pStretchImageElement.setElementInfo = function (url) {
				if (this._img_url != url) {
					this._img_url = url;
					var _handle = this._handle;
					if (_handle) {
						if (url == "") {
							nexacro.__setDOMNodeStyleVisible(_handle.style, visible);
						}
						else {
							nexacro.__setImageDOMNodeImageUrl(_handle, url);
						}
					}
				}
			};

			__pStretchImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
				var v = this.mirror;

				if (rtlimagemirroring) {
					v = nexacro._toBoolean(rtlimagemirroring._value);
				}

				if (this.mirror != v || bChangeRtlDirection) {
					this.mirror = v;

					var handle = this._handle;
					if (handle) {
						nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
					}
				}
			};

			delete __pStretchImageElement;
		}


		nexacro._QuadImageElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var __pQuadImageElement = nexacro._createPrototype(nexacro.Element, nexacro._QuadImageElement);
		nexacro._QuadImageElement.prototype = __pQuadImageElement;

		__pQuadImageElement._type_name = "QuadImageElement";

		__pQuadImageElement._img_url = "";
		__pQuadImageElement._lefttop_node = null;
		__pQuadImageElement._righttop_node = null;
		__pQuadImageElement._rightbottom_node = null;
		__pQuadImageElement._leftbottom_node = null;
		__pQuadImageElement._is_nc_element = true;

		__pQuadImageElement.create = function (before_elem) {
			var _owner_elem = this._parent_elem;
			if (_owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;

				nexacro.__setDOMNodeSelectable(_handle, false);

				if ((this.width % 2) == 1) {
					var _width = "51%";
				}
				else {
					var _width = "50%";
				}

				if ((this.height % 2) == 1) {
					var _height = "51%";
				}
				else {
					var _height = "50%";
				}

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

				var lefttop_node = _doc.createElement("div");
				lefttop_style = lefttop_node.style;

				nexacro.__setDOMNodeStylePosLeftTop(lefttop_style);
				nexacro.__setDOMNodeStyleUnitSize(lefttop_style, _width, _height);
				lefttop_style.backgroundRepeat = "no-repeat";
				lefttop_style.backgroundPosition = "left top";
				this._lefttop_node = lefttop_node;

				var righttop_node = _doc.createElement("div");
				righttop_style = righttop_node.style;

				nexacro.__setDOMNodeStylePosRightTop(righttop_style);
				nexacro.__setDOMNodeStyleUnitSize(righttop_style, "50%", _height);
				righttop_style.backgroundRepeat = "no-repeat";
				righttop_style.backgroundPosition = "right top";
				this._righttop_node = righttop_node;

				var rightbottom_node = _doc.createElement("div");
				rightbottom_style = rightbottom_node.style;

				nexacro.__setDOMNodeStylePosRightBottom(rightbottom_style);
				nexacro.__setDOMNodeStyleUnitSize(rightbottom_style, "50%", "50%");
				rightbottom_style.backgroundRepeat = "no-repeat";
				rightbottom_style.backgroundPosition = "right bottom";
				this._rightbottom_node = rightbottom_node;

				var leftbottom_node = _doc.createElement("div");
				leftbottom_style = leftbottom_node.style;

				nexacro.__setDOMNodeStylePosLeftBottom(leftbottom_style);
				nexacro.__setDOMNodeStyleUnitSize(leftbottom_style, _width, "50%");
				leftbottom_style.backgroundRepeat = "no-repeat";
				leftbottom_style.backgroundPosition = "left bottom";
				this._leftbottom_node = leftbottom_node;

				if (this._img_url) {
					var url2 = "url(" + this._img_url + ")";
					lefttop_style.backgroundImage = url2;
					righttop_style.backgroundImage = url2;
					rightbottom_style.backgroundImage = url2;
					leftbottom_style.backgroundImage = url2;
				}

				_handle.appendChild(lefttop_node);
				_handle.appendChild(righttop_node);
				_handle.appendChild(rightbottom_node);
				_handle.appendChild(leftbottom_node);

				if (this.mirror) {
					nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
				}

				this._handle = this._dest_handle = _handle;
				if (before_elem) {
					nexacro.__insertDOMNode(_owner_elem._dest_handle, _handle, before_elem._handle);
				}
				else {
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				}
			}
		};

		__pQuadImageElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					nexacro.__removeDOMNode(this._owner_elem._dest_handle, _handle);
				}
				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._lefttop_node = null;
				this._righttop_node = null;
				this._rightbottom_node = null;
				this._leftbottom_node = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		__pQuadImageElement.setElementInfo = function (url) {
			if (this._img_url != url) {
				this._img_url = url;
				if (this._handle) {
					var url2 = "url(" + url + ")";
					this._lefttop_node.style.backgroundImage = url2;
					this._righttop_node.style.backgroundImage = url2;
					this._rightbottom_node.style.backgroundImage = url2;
					this._leftbottom_node.style.backgroundImage = url2;
				}
			}
		};

		__pQuadImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
			var v = this.mirror;

			if (rtlimagemirroring) {
				v = nexacro._toBoolean(rtlimagemirroring._value);
			}

			if (this.mirror != v || bChangeRtlDirection) {
				this.mirror = v;

				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
				}
			}
		};

		delete __pQuadImageElement;


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
			nexacro._EdgeImageElement = function (parent_elem) {
				this.parent = parent_elem;
				this._parent_elem = parent_elem;

				this._edge_type = 0;
				this._applied_edge_type = 0;
				this._img_url = "";
				this._applied_img_url = "";
				this._edgex = 0;
				this._edgey = 0;
				this._img_width = 0;
				this._img_height = 0;
				this._img_sizereq = false;
				this._image_cc_node = null;
				this._div_lt_node = null;
				this._div_rt_node = null;
				this._div_lb_node = null;
				this._div_rb_node = null;
				this._image_tt_node = null;
				this._image_rr_node = null;
				this._image_bb_node = null;
				this._image_ll_node = null;
				this._need_update_imagesize = false;
			};
			var __pEdgeImageElement = nexacro._createPrototype(nexacro.Element, nexacro._EdgeImageElement);
			nexacro._EdgeImageElement.prototype = __pEdgeImageElement;
			__pEdgeImageElement._type_name = "EdgeImageElement";
			__pEdgeImageElement._is_nc_element = true;

			__pEdgeImageElement.create = function (before_elem) {
				var _owner_elem = this._parent_elem;
				if (_owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					if (_doc) {
						var _handle = _doc.createElement("div");
						_handle.id = this._parent_elem._handle.id + this._type_name;

						nexacro.__setDOMNodeSelectable(_handle, false);

						this._applied_edge_type = 0;

						var width = this.width;
						var height = this.height;

						var handle_style = _handle.style;
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
						nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
						nexacro.__setDOMNodeStyleSize(handle_style, width, height);

						var image_cc = _doc.createElement("img");
						var node_style = image_cc.style;

						nexacro.__setDOMNodeAlt(image_cc, "");

						nexacro.__setDOMNodeStylePosLeftTop(node_style);
						nexacro.__setDOMNodeStyleUnitSize(node_style, "100%", "100%");

						_handle.appendChild(image_cc);
						this._image_cc_node = image_cc;

						if (!this._img_sizereq) {
							if (this._img_width > 0 && this._img_height > 0) {
								this._updateImgSize(_handle, this._edge_type, width, height, this._img_url, this._img_width, this._img_height, this._edgex, this._edgey);
							}
							else if (this._img_url) {
								var imgsize = nexacro._getImageSize(this._img_url, this._on_notify_imgsize, this);
								this._img_sizereq = true;
								if (imgsize) {
									this._img_width = imgsize.width;
									this._img_height = imgsize.height;
									this._updateImgSize(_handle, this._edge_type, width, height, this._img_url, imgsize.width, imgsize.height, this._edgex, this._edgey);
								}
							}
						}

						if (this.mirror) {
							nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
						}

						this._handle = this._dest_handle = _handle;
						if (before_elem) {
							nexacro.__insertDOMNode(_owner_elem._dest_handle, _handle, before_elem._handle);
						}
						else {
							nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
						}
					}
				}
			};

			__pEdgeImageElement.destroy = function () {
				var _handle = this._handle;
				if (_handle) {
					_handle._linked_element = null;
					if (this._owner_elem && this._owner_elem._dest_handle) {
						nexacro.__removeDOMNode(this._owner_elem._dest_handle, _handle);
					}
					this._owner_elem = null;
					this._handle = this._dest_handle = null;

					this._div_lt_node = null;
					this._div_rt_node = null;
					this._div_lb_node = null;
					this._div_rb_node = null;
					this._image_tt_node = null;
					this._image_rr_node = null;
					this._image_bb_node = null;
					this._image_ll_node = null;
					this._image_cc_node = null;
				}
				this.parent = null;
				this._parent_elem = null;
			};

			__pEdgeImageElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
						if (this._img_width > 0 && this._img_height > 0) {
							this._updateLayout(_handle, this._edge_type, width, height, this._img_width, this._img_height, this._edgex, this._edgey);
						}
						else {
							this._updateLayout(_handle, 0, width, height, this._img_width, this._img_height, this._edgex, this._edgey);
						}
					}
				}
			};

			__pEdgeImageElement._updateURL = function (_hanlde, edge_type, url) {
				if (edge_type == 3) {
					var url2 = "url(" + url + ")";
					this._div_lt_node.style.backgroundImage = url2;
					this._div_rt_node.style.backgroundImage = url2;
					this._div_lb_node.style.backgroundImage = url2;
					this._div_rb_node.style.backgroundImage = url2;
				}

				if (edge_type == 1 || edge_type == 3) {
					this._image_ll_node.src = url;
					this._image_rr_node.src = url;
				}
				if (edge_type == 2 || edge_type == 3) {
					this._image_tt_node.src = url;
					this._image_bb_node.src = url;
				}

				if (this._image_cc_node) {
					this._image_cc_node.src = url;
				}

				this._applied_img_src = url;
			};

			__pEdgeImageElement.setElementInfo = function (url, edgex, edgey) {
				var url_change = false;
				var layout_change = false;
				var edge_type = 0;

				if (edgex < 0) {
					edgex = 0;
				}
				if (edgey < 0) {
					edgey = 0;
				}

				if (edgex > 0 && edgey > 0) {
					edge_type = 3;
				}
				else if (edgey > 0) {
					edge_type = 2;
				}
				else if (edgex > 0) {
					edge_type = 1;
				}

				if (this._img_url != url) {
					this._img_url = url;
					url_change = true;
				}

				if (this._edge_type != edge_type || this._edgex != edgex || this._edgey != edgey) {
					this._edge_type = edge_type;
					this._edgex = edgex;
					this._edgey = edgey;
					layout_change = true;
				}

				var _handle = this._handle;
				if (_handle) {
					var width = this.width;
					var height = this.height;

					if (url_change) {
						var imgsize = nexacro._getImageSize(this._img_url, this._on_notify_imgsize, this);
						this._img_sizereq = true;
						if (imgsize) {
							this._img_sizereq = false;
							if (this._img_width != imgsize.width || this._img_height != imgsize.height) {
								this._img_width = imgsize.width;
								this._img_height = imgsize.height;
								this._updateLayout(_handle, edge_type, width, height, imgsize.width, imgsize.height, this._edgex, this._edgey);
								this._updateURL(_handle, edge_type, url);
							}
							else {
								this._updateURL(_handle, edge_type, url);
							}
						}
						else {
							this._img_sizereq = true;
							this._img_width = 0;
							this._img_height = 0;
							this._updateLayout(_handle, edge_type, width, height, 0, 0, 0, 0);
						}
					}
					else if (layout_change) {
						if (this._img_width > 0 && this._img_height > 0) {
							this._updateLayout(_handle, edge_type, width, height, this._img_width, this._img_height, this._edgex, this._edgey);
							this._updateURL(_handle, edge_type, this._img_url);
						}
					}
				}
				else if (url_change) {
					var imgsize = nexacro._getImageSize(this._img_url, this._on_notify_imgsize, this);
					this._img_sizereq = true;
					if (imgsize) {
						this._img_sizereq = false;
						this._img_width = imgsize.width;
						this._img_height = imgsize.height;
					}
				}
			};

			if (nexacro.BrowserVersion <= 7) {
				nexacro._makeImageClipInfo = function (top, right, bottom, left) {
					return "rect(" + top + " " + right + " " + bottom + " " + left + ")";
				};
			}
			else {
				nexacro._makeImageClipInfo = function (top, right, bottom, left) {
					return "rect(" + top + "px," + right + "px," + bottom + "px," + left + "px)";
				};
			}

			__pEdgeImageElement._createLeftRight = function (_doc, _handle, img_width, height, img_offset_y, edgex, edgey) {
				var _top = (-img_offset_y);
				var _height = height + img_offset_y + img_offset_y;
				var _clip_top = edgey + img_offset_y;
				var _clip_bottom = height - edgey + img_offset_y;

				var image_ll = _doc.createElement("img");
				node_style = image_ll.style;

				nexacro.__setDOMNodeAlt(image_ll, "");
				nexacro.__setDOMNodeStyleAbsolute(node_style);
				nexacro.__setDOMNodeStylePos(node_style, 0, _top);
				nexacro.__setDOMNodeStyleSize(node_style, img_width, _height);
				node_style.clip = nexacro._makeImageClipInfo(_clip_top, edgex, _clip_bottom, 0);
				_handle.appendChild(image_ll);

				var image_rr = _doc.createElement("img");
				node_style = image_rr.style;

				nexacro.__setDOMNodeAlt(image_rr, "");
				nexacro.__setDOMNodeStyleAbsolute(image_rr.style);
				node_style.right = "0px";
				node_style.top = _top + "px";
				nexacro.__setDOMNodeStyleSize(node_style, img_width, _height);
				node_style.clip = nexacro._makeImageClipInfo(_clip_top, img_width, _clip_bottom, -edgex + img_width);
				_handle.appendChild(image_rr);

				this._image_rr_node = image_rr;
				this._image_ll_node = image_ll;
			};

			__pEdgeImageElement._updateLeftRight = function (img_width, height, img_offset_y, edgex, edgey) {
				var _top = (-img_offset_y);
				var _height = height + img_offset_y + img_offset_y;
				var _clip_top = edgey + img_offset_y;
				var _clip_bottom = height - edgey + img_offset_y;

				var node_style = this._image_ll_node.style;
				node_style.top = _top + "px";
				nexacro.__setDOMNodeStyleSize(node_style, img_width, _height);
				node_style.clip = nexacro._makeImageClipInfo(_clip_top, edgex, _clip_bottom, 0);

				var node_style = this._image_rr_node.style;
				node_style.top = _top + "px";
				nexacro.__setDOMNodeStyleSize(node_style, img_width, _height);
				node_style.clip = nexacro._makeImageClipInfo(_clip_top, img_width, _clip_bottom, -edgex + img_width);
			};
			__pEdgeImageElement._destroyLeftRight = function (_handle) {
				if (this._image_ll_node) {
					nexacro.__removeDOMNode(_handle, this._image_ll_node);
				}
				if (this._image_rr_node) {
					nexacro.__removeDOMNode(_handle, this._image_rr_node);
				}
				this._image_ll_node = null;
				this._image_rr_node = null;
			};


			__pEdgeImageElement._createTopBottom = function (_doc, _handle, img_height, width, img_offset_x, edgex, edgey) {
				var _left = (-img_offset_x);
				var _width = width + img_offset_x + img_offset_x;
				var _clip_left = edgex + img_offset_x;
				var _clip_right = width - edgex + img_offset_x;

				var image_tt = _doc.createElement("img");
				var node_style = image_tt.style;

				nexacro.__setDOMNodeAlt(image_tt, "");

				nexacro.__setDOMNodeStyleAbsolute(node_style);
				nexacro.__setDOMNodeStylePos(node_style, _left, 0);
				nexacro.__setDOMNodeStyleSize(node_style, _width, img_height);
				node_style.clip = nexacro._makeImageClipInfo(0, _clip_right, edgey, _clip_left);
				_handle.appendChild(image_tt);

				var image_bb = _doc.createElement("img");
				var node_style = image_bb.style;

				nexacro.__setDOMNodeAlt(image_bb, "");

				nexacro.__setDOMNodeStyleAbsolute(image_bb.style);
				node_style.left = _left + "px";
				node_style.bottom = "0px";
				nexacro.__setDOMNodeStyleSize(node_style, _width, img_height);
				node_style.clip = nexacro._makeImageClipInfo(-edgey + img_height, _clip_right, img_height, _clip_left);
				_handle.appendChild(image_bb);

				this._image_tt_node = image_tt;
				this._image_bb_node = image_bb;
			};

			__pEdgeImageElement._updateTopBottom = function (img_height, width, img_offset_x, edgex, edgey) {
				var _left = (-img_offset_x);
				var _width = width + img_offset_x + img_offset_x;
				var _clip_left = edgex + img_offset_x;
				var _clip_right = width - edgex + img_offset_x;

				var node_style = this._image_tt_node.style;
				node_style.left = _left + "px";
				nexacro.__setDOMNodeStyleSize(node_style, _width, img_height);
				node_style.clip = nexacro._makeImageClipInfo(0, _clip_right, edgey, _clip_left);

				var node_style = this._image_bb_node.style;
				node_style.left = _left + "px";
				nexacro.__setDOMNodeStyleSize(node_style, _width, img_height);
				node_style.clip = nexacro._makeImageClipInfo(-edgey + img_height, _clip_right, img_height, _clip_left);
			};

			__pEdgeImageElement._destroyTopBottom = function (_handle) {
				if (this._image_tt_node) {
					nexacro.__removeDOMNode(_handle, this._image_tt_node);
				}
				if (this._image_bb_node) {
					nexacro.__removeDOMNode(_handle, this._image_bb_node);
				}
				this._image_tt_node = null;
				this._image_bb_node = null;
			};

			__pEdgeImageElement._createCorners = function (_doc, _handle, edgex, edgey) {
				var div_lt = _doc.createElement("div");
				var node_style = div_lt.style;

				nexacro.__setDOMNodeStylePosLeftTop(node_style);
				nexacro.__setDOMNodeStyleSize(node_style, edgex, edgey);
				node_style.backgroundPosition = "left top";
				node_style.fontSize = "1px";
				_handle.appendChild(div_lt);

				var div_rt = _doc.createElement("div");
				node_style = div_rt.style;

				nexacro.__setDOMNodeStylePosRightTop(node_style);
				nexacro.__setDOMNodeStyleSize(node_style, edgex, edgey);
				node_style.fontSize = "1px";
				node_style.backgroundPosition = "right top";
				_handle.appendChild(div_rt);

				var div_lb = _doc.createElement("div");
				node_style = div_lb.style;

				nexacro.__setDOMNodeStylePosLeftBottom(node_style);
				nexacro.__setDOMNodeStyleSize(node_style, edgex, edgey);
				node_style.backgroundPosition = "left bottom";
				node_style.fontSize = "1px";
				_handle.appendChild(div_lb);

				var div_rb = _doc.createElement("div");
				node_style = div_rb.style;

				nexacro.__setDOMNodeStylePosRightBottom(node_style);
				nexacro.__setDOMNodeStyleSize(node_style, edgex, edgey);
				node_style.backgroundPosition = "right bottom";
				node_style.fontSize = "1px";
				_handle.appendChild(div_rb);

				this._div_lt_node = div_lt;
				this._div_rt_node = div_rt;
				this._div_lb_node = div_lb;
				this._div_rb_node = div_rb;
			};

			__pEdgeImageElement._updateCorners = function (edgex, edgey) {
				nexacro.__setDOMNodeStyleSize(this._div_lt_node.style, edgex, edgey);
				nexacro.__setDOMNodeStyleSize(this._div_rt_node.style, edgex, edgey);
				nexacro.__setDOMNodeStyleSize(this._div_lb_node.style, edgex, edgey);
				nexacro.__setDOMNodeStyleSize(this._div_rb_node.style, edgex, edgey);
			};

			__pEdgeImageElement._destroyCorners = function (_handle) {
				if (this._div_lt_node) {
					nexacro.__removeDOMNode(_handle, this._div_lt_node);
				}
				if (this._div_rt_node) {
					nexacro.__removeDOMNode(_handle, this._div_rt_node);
				}
				if (this._div_lb_node) {
					nexacro.__removeDOMNode(_handle, this._div_lb_node);
				}
				if (this._div_rb_node) {
					nexacro.__removeDOMNode(_handle, this._div_rb_node);
				}
				this._div_lt_node = null;
				this._div_rt_node = null;
				this._div_lb_node = null;
				this._div_rb_node = null;
			};

			__pEdgeImageElement._updateLayout = function (_handle, edge_type, width, height, img_width, img_height, edgex, edgey) {
				var _doc = this.getRootWindowHandle();
				var old_type = this._applied_edge_type;

				if (_handle) {
					if (edgex > img_width) {
						edgex = img_width;
					}
					if (edgey > img_height) {
						edgey = img_height;
					}
					var test_img_offset_x = img_width - edgex - edgex;
					var test_img_offset_y = img_height - edgey - edgey;
					var img_offset_x = 0;
					var img_offset_y = 0;

					var half_width = img_width / 2;
					var half_height = img_height / 2;

					if (edgex > half_width) {
						if (test_img_offset_x < 0) {
							test_img_offset_x = test_img_offset_x * -1;
						}
						img_offset_x = Math.round(edgex * ((width - edgex - edgex) / (test_img_offset_x)) - width + edgex);
					}
					else {
						if (test_img_offset_x == 0) {
							img_offset_x = Math.round(edgex * ((width - edgex - edgex + 1) / (img_width - edgex - edgex + 1)) - edgex);
						}
						else {
							img_offset_x = Math.round(edgex * ((width - edgex - edgex) / (img_width - edgex - edgex)) - edgex);
						}
					}

					if (edgey > half_height) {
						if (test_img_offset_y < 0) {
							test_img_offset_y = test_img_offset_y * -1;
						}
						img_offset_y = Math.round(edgey * ((height - edgey - edgey) / (test_img_offset_y)) - height + edgey);
					}
					else {
						if (test_img_offset_y == 0) {
							img_offset_y = Math.round(edgey * ((height - edgey - edgey + 1) / (img_height - edgey - edgey + 1)) - edgey);
						}
						else {
							img_offset_y = Math.round(edgey * ((height - edgey - edgey) / (img_height - edgey - edgey)) - edgey);
						}
					}

					if (edge_type == 0) {
						if (old_type == 1) {
							this._destroyLeftRight(_handle);
						}
						else if (old_type == 2) {
							this._destroyTopBottom(_handle);
						}
						else if (old_type == 3) {
							this._destroyLeftRight(_handle);
							this._destroyTopBottom(_handle);
							this._destroyCorners(_handle);
						}

						var node_style = this._image_cc_node.style;
						nexacro.__setDOMNodeStylePosLeftTop(node_style);
						nexacro.__setDOMNodeStyleUnitSize(node_style, "100%", "100%");
					}
					else if (edge_type == 1) {
						if (old_type == 1) {
							this._updateLeftRight(img_width, height, img_offset_y, edgex, edgey);
						}
						else if (old_type == 2) {
							this._destroyTopBottom(_handle);
							this._createLeftRight(_doc, _handle, img_width, height, img_offset_y, edgex, edgey);
						}
						else if (old_type == 3) {
							this._destroyTopBottom(_handle);
							this._destroyCorners(_handle);
							this._updateLeftRight(img_width, height, img_offset_y, edgex, edgey);
						}
						else {
							this._createLeftRight(_doc, _handle, img_width, height, img_offset_y, edgex, edgey);
						}
					}
					else if (edge_type == 2) {
						if (old_type == 1) {
							this._destroyLeftRight(_handle);
							this._createTopBottom(_doc, _handle, img_height, width, img_offset_x, edgex, edgey);
						}
						else if (old_type == 2) {
							this._updateTopBottom(img_height, width, img_offset_x, edgex, edgey);
						}
						else if (old_type == 3) {
							this._destroyLeftRight(_handle);
							this._destroyCorners(_handle);
							this._updateTopBottom(img_height, width, img_offset_x, edgex, edgey);
						}
						else {
							this._createTopBottom(_doc, _handle, img_height, width, img_offset_x, edgex, edgey);
						}
					}
					else {
						if (old_type == 0) {
							this._createCorners(_doc, _handle, edgex, edgey);
							this._createLeftRight(_doc, _handle, img_width, height, img_offset_y, edgex, edgey);
							this._createTopBottom(_doc, _handle, img_height, width, img_offset_x, edgex, edgey);
						}
						if (old_type == 1) {
							this._createCorners(_doc, _handle, edgex, edgey);
							this._updateLeftRight(img_width, height, img_offset_y, edgex, edgey);
							this._createTopBottom(_doc, _handle, img_height, width, img_offset_x, edgex, edgey);
						}
						else if (old_type == 2) {
							this._createCorners(_doc, _handle, edgex, edgey);
							this._createLeftRight(_doc, _handle, img_width, height, img_offset_y, edgex, edgey);
							this._updateTopBottom(img_height, width, img_offset_x, edgex, edgey);
						}
						else {
							this._updateCorners(edgex, edgey);
							this._updateLeftRight(img_width, height, img_offset_y, edgex, edgey);
							this._updateTopBottom(img_height, width, img_offset_x, edgex, edgey);
						}
					}

					if (edge_type != 0) {
						node_style = this._image_cc_node.style;
						nexacro.__setDOMNodeStylePos(node_style, (-img_offset_x), (-img_offset_y));
						nexacro.__setDOMNodeStyleSize(node_style, (width + img_offset_x + img_offset_x), (height + img_offset_y + img_offset_y));
						node_style.clip = nexacro._makeImageClipInfo(edgey + img_offset_y, width - edgex + img_offset_x, height - edgey + img_offset_y, edgex + img_offset_x);
					}
					this._applied_edge_type = edge_type;
				}
			};
			__pEdgeImageElement._updateImgSize = function (_handle, edge_type, width, height, img_url, img_width, img_height, edgex, edgey) {
				if (_handle) {
					var layout_change = false, url_change = false;
					if (this._applied_edge_type != edge_type) {
						layout_change = true;
						url_change = true;
					}
					else if (this._applied_img_url != img_url) {
						url_change = true;
					}

					if (layout_change) {
						this._updateLayout(_handle, edge_type, width, height, img_width, img_height, edgex, edgey);
						this._updateURL(_handle, edge_type, img_url);
					}
					else if (url_change) {
						this._updateURL(_handle, edge_type, img_url);
					}
				}
			};

			__pEdgeImageElement._on_notify_imgsize = function (img_url, img_width, img_height) {
				if (!(img_width && img_height)) {
					return;
				}
				if (img_url != this._img_url) {
					return;
				}

				var _handle = this._handle;
				var edge_type = this._edge_type;

				this._img_sizereq = false;
				this._img_width = img_width;
				this._img_height = img_height;

				if (_handle && edge_type) {
					this._updateImgSize(_handle, edge_type, this.width, this.height, img_url, img_width, img_height, this._edgex, this._edgey);
				}
			};

			__pEdgeImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
				var v = this.mirror;

				if (rtlimagemirroring) {
					v = nexacro._toBoolean(rtlimagemirroring._value);
				}

				if (this.mirror != v || bChangeRtlDirection) {
					this.mirror = v;

					var handle = this._handle;
					if (handle) {
						nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
					}
				}
			};

			delete __pEdgeImageElement;
		}
		else if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 10)) {
			nexacro._EdgeImageElement = function (parent_elem) {
				this.parent = parent_elem;
				this._parent_elem = parent_elem;

				__pEdgeImageElement._node_width = 0;
				__pEdgeImageElement._node_height = 0;
				__pEdgeImageElement._edgex = 0;
				__pEdgeImageElement._edgey = 0;
				__pEdgeImageElement._img_url = "";
			};
			var __pEdgeImageElement = nexacro._createPrototype(nexacro.Element, nexacro._EdgeImageElement);
			nexacro._EdgeImageElement.prototype = __pEdgeImageElement;
			__pEdgeImageElement._type_name = "_EdgeImageElement";
			__pEdgeImageElement._is_nc_element = true;


			__pEdgeImageElement.create = function (before_elem) {
				var _owner_elem = this._parent_elem;
				if (_owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					if (_doc) {
						var _handle = _doc.createElement("div");
						_handle.id = this._parent_elem._handle.id + this._type_name;

						nexacro.__setDOMNodeSelectable(_handle, false);

						var handle_style = _handle.style;
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
						nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
						nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

						if (this._img_url) {
							handle_style.borderColor = "transparent";

							nexacro.__setDOMNodeStyleEdgeBorder(handle_style, this._img_url, this._edgex, this._edgey);
						}

						if (this.mirror) {
							nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
						}

						this._handle = this._dest_handle = _handle;
						if (before_elem) {
							nexacro.__insertDOMNode(_owner_elem._dest_handle, _handle, before_elem._handle);
						}
						else {
							nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
						}
					}
				}
			};

			__pEdgeImageElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var handle_width = (width - this._edgex - this._edgex);
					var handle_height = (height - this._edgey - this._edgey);
					if (this._node_width != handle_width || this._node_height != handle_height) {
						this._node_width = (handle_width < 0) ? 0 : handle_width;
						this._node_height = (handle_height < 0) ? 0 : handle_height;
						var _handle = this._handle;
						if (_handle) {
							var handle_style = _handle.style;
							nexacro.__setDOMNodeStyleSize(handle_style, handle_width, handle_height);
							nexacro.__setDOMNodeStyleEdgeBorder(handle_style, this._img_url, this._edgex, this._edgey);
						}
					}
				}
			};

			__pEdgeImageElement.setElementInfo = function (url, edgex, edgey) {
				if (this._img_url != url || this._edgex != edgex || this._edgey != edgey) {
					this._img_url = url;
					var _handle = this._handle;

					var handle_width = this.width - edgex - edgex;
					var handle_height = this.height - edgey - edgey;
					this._edgex = edgex;
					this._edgey = edgey;
					if (this._node_width != handle_width || this._node_height != handle_height) {
						this._node_width = (handle_width < 0) ? 0 : handle_width;
						this._node_height = (handle_height < 0) ? 0 : handle_height;
						var _handle = this._handle;
						if (_handle) {
							var handle_style = _handle.style;
							nexacro.__setDOMNodeStyleSize(handle_style, handle_width, handle_height);
							nexacro.__setDOMNodeStyleEdgeBorder(handle_style, this._img_url, edgex, edgey);
						}
					}
					else if (_handle) {
						nexacro.__setDOMNodeStyleEdgeBorder(this._handle.style, this._img_url, edgex, edgey);
					}
				}
			};

			__pEdgeImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
				var v = this.mirror;

				if (rtlimagemirroring) {
					v = nexacro._toBoolean(rtlimagemirroring._value);
				}

				if (this.mirror != v || bChangeRtlDirection) {
					this.mirror = v;

					var handle = this._handle;
					if (handle) {
						nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
					}
				}
			};

			delete __pEdgeImageElement;
		}


		nexacro.TextBoxElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pTextBoxElement = nexacro._createPrototype(nexacro.Element, nexacro.TextBoxElement);
		nexacro.TextBoxElement.prototype = _pTextBoxElement;

		_pTextBoxElement._type_name = "TextBoxElement";

		_pTextBoxElement.font = null;
		_pTextBoxElement.color = null;
		_pTextBoxElement.cursor = null;
		_pTextBoxElement.align = null;
		_pTextBoxElement.halign = "left";
		_pTextBoxElement.valign = "top";
		_pTextBoxElement.padding = null;
		_pTextBoxElement.padding_left = 0;
		_pTextBoxElement.padding_top = 0;
		_pTextBoxElement.padding_right = 0;
		_pTextBoxElement.padding_bottom = 0;
		_pTextBoxElement.text = "";
		_pTextBoxElement.linespace = 0;
		_pTextBoxElement.wordwrap = "none";
		_pTextBoxElement.decoration = "";
		_pTextBoxElement._cell_node = null;

		_pTextBoxElement._use_newline = true;
		_pTextBoxElement._default_textoverflow = "ellipsis";

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 7) {
			_pTextBoxElement._createTextElementHandle = function (_doc, left, top, width, height) {
				var _handle = _doc.createElement("table");
				var handle_style = _handle.style;

				_handle.cellSpacing = 0;
				_handle.cellPadding = 0;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeStyleSize(handle_style, width, height);
				nexacro.__setTextDOMNodeStyleAlignXY(handle_style, this.halign, this.valign);

				var _tbody_node = _doc.createElement("tbody");
				var _tr_node = _doc.createElement("tr");
				var _cell_node = _doc.createElement("td");
				_cell_node.style.whiteSpace = "pre";
				_handle.appendChild(_tbody_node);
				_tbody_node.appendChild(_tr_node);
				_tr_node.appendChild(_cell_node);

				nexacro.__setDOMNodeStyleSize(_cell_node.style, width, height);

				this._cell_node = _cell_node;
				return _handle;
			};

			_pTextBoxElement._destroyTextElementHandle = function () {
			};

			_pTextBoxElement._appendTextElementHandle = function () {
			};

			_pTextBoxElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var _handle = this._handle;
					var _cell_node = this._cell_node;

					if (_handle) {
						nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
						nexacro.__setDOMNodeStyleSize(_cell_node.style, width, height);
					}
				}
			};
		}
		else if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8)) {
			_pTextBoxElement._createTextElementHandle = function (_doc, left, top, width, height) {
				var _handle = _doc.createElement("div");
				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeStyleSize(handle_style, width, height);


				var _cell_node = _doc.createElement("div");
				var cell_style = _cell_node.style;
				cell_style.display = "table-cell";
				cell_style.whiteSpace = "pre";
				cell_style.textOverflow = this._default_textoverflow;

				nexacro.__setDOMNodeStyleSize(cell_style, width, height);

				this._cell_node = _cell_node;
				return _handle;
			};

			_pTextBoxElement._appendTextElementHandle = function (_handle, cell_node) {
				nexacro.__appendDOMNode(_handle, cell_node);
			};

			_pTextBoxElement._destroyTextElementHandle = function () {
				nexacro.__removeDOMNode(this._handle, this._cell_node);
			};

			_pTextBoxElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
					}
					_handle = this._cell_node;
					if (_handle) {
						_handle.style.textOverflow = "";
						nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
						_handle.style.textOverflow = this._default_textoverflow;
					}
				}
			};
		}

		_pTextBoxElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = this._createTextElementHandle(_doc, this.left, this.top, this.width, this.height);
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 4;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;
				var cell_node = this._cell_node;
				var cell_style = cell_node.style;

				var bRtl = this._isRtl();

				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}
				if (this.font) {
					nexacro.__setDOMNodeStyleFont(cell_style, this.font);
				}

				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(cell_style, this.letterspace);
				}

				if (this.color) {
					nexacro.__setDOMNodeStyleColor(cell_style, this.color);
				}

				if (this.align) {
					var _align = this.align._getStyleObject(bRtl);
					nexacro.__setDOMNodeStyleAlign(cell_style, _align);
				}
				else if (this.halign && this.valign) {
					var _halign = this.halign;
					if (bRtl) {
						_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
					}
					nexacro.__setDOMNodeStyleAlignXY(cell_style, _halign, this.valign);
				}

				if (this.padding) {
					var _padding = this.padding._getStyleObject(bRtl);

					nexacro.__setDOMNodeStylePadding(cell_style, _padding);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					if (bRtl) {
						nexacro.__setDOMNodeStylePaddingXY(cell_style, this.padding_right, this.padding_top, this.padding_left, this.padding_bottom);
					}
					else {
						nexacro.__setDOMNodeStylePaddingXY(cell_style, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
					}
				}

				if (this.linespace > 0) {
					nexacro.__setDOMNodeStyleLineSpace(cell_style, this.linespace);
				}


				if (this.wordwrap != "none") {
					nexacro.__setDOMNodeWordWrap(cell_node, this.wordwrap);
				}

				if (this.decoration) {
					nexacro.__setDOMNodeStyleDecorateText(cell_node, this.decoration);
				}
				else {
					nexacro.__setDOMNodeText(cell_node, this.text, this._use_newline, this.wordwrap);
				}

				this._handle = this._dest_handle = _handle;

				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				this._appendTextElementHandle(_handle, cell_node);
			}
		};

		_pTextBoxElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				if (this._cell_node) {
					this._destroyTextElementHandle();
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._cell_node = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pTextBoxElement.setParentElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		_pTextBoxElement.setElementFont = function (font) {
			this.font = font;
			var _cell_node = this._cell_node;
			if (_cell_node) {
				nexacro.__setDOMNodeStyleFont(_cell_node.style, font);
			}
		};

		_pTextBoxElement.setElementColor = function (color) {
			this.color = color;
			var _cell_node = this._cell_node;
			if (_cell_node) {
				nexacro.__setDOMNodeStyleColor(_cell_node.style, color);
			}
		};

		_pTextBoxElement.setElementAlign = function (align) {
			var _align = align ? align._getStyleObject(this._isRtl()) : null;

			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var _cell_node = this._cell_node;
			if (_cell_node) {
				_cell_node.style.textOverflow = "";
				nexacro.__setTextDOMNodeStyleAlign(_cell_node.style, _align);
				_cell_node.style.textOverflow = this._default_textoverflow;
			}
		};

		_pTextBoxElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;
			if (this._isRtl()) {
				_halign = halign == "left" ? "right" : (halign == "right" ? "left" : halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _cell_node = this._cell_node;
			if (_cell_node) {
				_cell_node.style.textOverflow = "";
				nexacro.__setTextDOMNodeStyleAlignXY(_cell_node.style, _halign, valign);
				_cell_node.style.textOverflow = this._default_textoverflow;
			}
		};

		_pTextBoxElement.setElementPadding = function (padding) {
			this.padding = padding;
			this.padding_left = 0;
			this.padding_top = 0;
			this.padding_right = 0;
			this.padding_bottom = 0;
			var _cell_node = this._cell_node;
			if (_cell_node) {
				nexacro.__setDOMNodeStylePadding(_cell_node.style, padding);
			}
		};


		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8) {
			_pTextBoxElement.setElementPaddingXY = function (left, top, right, bottom) {
				this.padding = null;
				this.padding_left = left;
				this.padding_top = top;
				this.padding_right = right;
				this.padding_bottom = bottom;
				var _cell_node = this._cell_node;
				if (_cell_node) {
					var size_width = this.width - left - right;
					var size_height = this.height - top - bottom;
					if (this._isRtl()) {
						nexacro.__setDOMNodeStylePaddingXY(_cell_node.style, right, top, left, bottom);
					}
					else {
						nexacro.__setDOMNodeStylePaddingXY(_cell_node.style, left, top, right, bottom);
					}

					nexacro.__setDOMNodeStyleSize(_cell_node.style, size_width, size_height);
				}
			};
		}
		else {
			_pTextBoxElement.setElementPaddingXY = function (left, top, right, bottom) {
				this.padding = null;
				this.padding_left = left;
				this.padding_top = top;
				this.padding_right = right;
				this.padding_bottom = bottom;
				var _cell_node = this._cell_node;
				if (_cell_node) {
					var size_width = this.width - left - right;
					var size_height = this.height - top - bottom;
					if (this._isRtl()) {
						nexacro.__setDOMNodeStylePaddingXY(_cell_node.style, right, top, left, bottom);
					}
					else {
						nexacro.__setDOMNodeStylePaddingXY(_cell_node.style, left, top, right, bottom);
					}


					nexacro.__setDOMNodeStyleSize(_cell_node.style, size_width, size_height);
				}
			};
		}
		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" || nexacro.Browser == "Safari") {
			_pTextBoxElement.setElementText = function (text) {
				if (this.text !== text) {
					if (text == null) {
						this.text = "";
					}
					else {
						this.text = text.replace(/\r\n|\r/g, "\n");
					}

					var _cell_node = this._cell_node;
					if (_cell_node) {
						nexacro.__setDOMNodeText(_cell_node, this.text, this._use_newline, this.wordwrap);
					}
				}
			};
		}
		else {
			_pTextBoxElement.setElementText = function (text) {
				if (this.text !== text) {
					if (text == null) {
						this.text = "";
					}
					else {
						this.text = text.replace(/\r\n|\r|\n/g, "\r\n");
					}

					var _cell_node = this._cell_node;
					if (_cell_node) {
						nexacro.__setDOMNodeText(_cell_node, this.text, this._use_newline, this.wordwrap);
					}
				}
			};
		}

		_pTextBoxElement.setElementLineSpace = function (linespace) {
			if (this.linespace != linespace) {
				this.linespace = linespace;
				var _cell_node = this._cell_node;
				if (_cell_node) {
					var comp = this._parent_elem.linkedcontrol;
					if (comp) {
						var font_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
						linespace = font_size[1] + nexacro._toInt(linespace);
					}
					nexacro.__setDOMNodeStyleLineSpace(_cell_node.style, linespace);
				}
			}
		};

		_pTextBoxElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _cell_node = this._cell_node;
				if (_cell_node) {
					nexacro.__setDOMNodeStyleLetterSpace(_cell_node.style, letterspace);
				}
			}
		};

		_pTextBoxElement.setElementDecorateText = function (text) {
			if (this.decoration != text) {
				this.decoration = text;
				var _cell_node = this._cell_node;
				if (_cell_node) {
					nexacro.__setDOMNodeStyleDecorateText(_cell_node, text);
				}
			}
		};

		_pTextBoxElement.setElementUseNewLine = function (use_newline) {
			if (this._use_newline != use_newline) {
				this._use_newline = use_newline;

				var _cell_node = this._cell_node;
				if (_cell_node) {
					if (this.wordwrap != "none") {
						return;
					}
					nexacro.__setDOMNodeText(cell_node, this.text, this._use_newline, this.wordwrap);
				}
			}
		};

		_pTextBoxElement.setElementWordWrap = function (wordwrap) {
			if (wordwrap == true || wordwrap == "true") {
				wordwrap = "char";
			}
			else if (wordwrap == false || wordwrap == "false") {
				wordwrap = "none";
			}

			if (this.wordwrap != wordwrap) {
				this.wordwrap = wordwrap;
				var _cell_node = this._cell_node;
				if (_cell_node) {
					if (wordwrap != "none") {
						nexacro.__setDOMNodeWordWrap(_cell_node, wordwrap);
					}
					else if (this._use_newline) {
						nexacro.__setDOMNodeWordWrap(_cell_node, "none");
					}
					else {
						_cell_node.innerHTML = "";
						nexacro.__setDOMNodeWordWrap(_cell_node, "none");
					}

					if (this.decoration) {
						nexacro.__setDOMNodeStyleDecorateText(_cell_node, this.decoration);
					}
					else {
						nexacro.__setDOMNodeText(_cell_node, this.text, this._use_newline, this.wordwrap);
					}
				}
			}
		};

		_pTextBoxElement.setElementTextOverFlow = function () {
			var _cell_node = this._cell_node;
			if (_cell_node) {
				nexacro.__setDOMNodeStyleTextOverFlow(_cell_node.style);
			}
		};


		_pTextBoxElement._setElementAccessibilityRole = function () {
			if (this._handle) {
				nexacro.__setDOMNodeAccessibilityRole(this._handle, "option");
			}
		};

		_pTextBoxElement._setElementAccessibilityLabel = function () {
			if (this._parent_elem && this._handle) {
				var label = this._parent_elem._makeAccessibilityLabelbyReadtype();
				nexacro.__setDOMNodeAccessibilityLabel(this._handle, label);
			}
		};

		delete _pTextBoxElement;

		nexacro.ImageElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pImageElement = nexacro._createPrototype(nexacro.Element, nexacro.ImageElement);
		nexacro.ImageElement.prototype = _pImageElement;

		_pImageElement._type_name = "ImageElement";

		_pImageElement.imageurl = "";
		_pImageElement.image_width = 0;
		_pImageElement.image_height = 0;


		_pImageElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 5;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);


				var _image_handle = _doc.createElement("img");
				var _image_handle_style = _image_handle.style;
				if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
					nexacro.__setDOMNodeStyleAbsolute(_image_handle_style);
				}
				nexacro.__setDOMNodeStyleSize(_image_handle_style, this.width, this.height);

				nexacro.__setDOMNodeSelectable(_image_handle, false);
				nexacro.__setDOMNodeAlt(_image_handle, this._parent_elem.accessibility_label ? this._parent_elem.accessibility_label : this._parent_elem.linkedcontrol.id);

				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}

				if (this.imageurl) {
					nexacro.__setImageDOMNodeImageUrl(_image_handle, this.imageurl);
				}

				if (this.mirror) {
					nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
				}

				this._handle = this._dest_handle = _handle;
				this._image_handle = _image_handle;

				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				nexacro.__appendDOMNode(_handle, _image_handle);
			}
		};

		_pImageElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				if (this._image_handle) {
					nexacro.__removeDOMNode(_handle, this._image_handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._image_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pImageElement.setElementImageUrl = function (url) {
			var elem = this;
			while (!elem.linkedcontrol) {
				elem = elem.parent;
			}
			var last_imgurl = elem.linkedcontrol._lastest_imgurl;
			var flag = true;
			if (last_imgurl != undefined) {
				flag = (last_imgurl == url);
			}

			if (this.imageurl != url && flag) {
				url = nexacro._getURIValue(url);
				if (this.imageurl == url) {
					return;
				}

				if (url && !nexacro._isAbsolutePath(url)) {
					var base_url = this._getElementBaseUrl();
					url = nexacro._getImageLocation(url, base_url);
					if (this.imageurl == url) {
						return;
					}
				}

				this.imageurl = url;

				var image_handle = this._image_handle;
				if (image_handle) {
					nexacro.__setImageDOMNodeImageUrl(image_handle, url);
				}
			}
		};

		_pImageElement.setElementImageBase64 = function (base64) {
			if (this.imageurl != base64) {
				var image_handle = this._image_handle;

				this.imageurl = base64;

				if (image_handle) {
					nexacro.__setImageDOMNodeImageUrl(image_handle, base64);
				}
			}
		};

		_pImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
			var v = this.mirror;

			if (rtlimagemirroring) {
				v = nexacro._toBoolean(rtlimagemirroring._value);
			}

			if (this.mirror != v || bChangeRtlDirection) {
				this.mirror = v;

				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
				}
			}
		};

		_pImageElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;
				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStylePos(handle.style, left, top);
				}
			}
		};

		_pImageElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStyleSize(handle.style, width, height);
				}

				var image_handle = this._image_handle;
				if (image_handle) {
					nexacro.__setDOMNodeStyleSize(image_handle.style, width, height);
				}
			}
		};

		_pImageElement.setElementHandleImageObject = nexacro._emptyFn;

		delete _pImageElement;

		nexacro.AlignImageElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pAlignImageElement = nexacro._createPrototype(nexacro.Element, nexacro.AlignImageElement);
		nexacro.AlignImageElement.prototype = _pAlignImageElement;


		_pAlignImageElement._type_name = "AlignImageElement";

		_pAlignImageElement.align = null;
		_pAlignImageElement.halign = "";
		_pAlignImageElement.valign = "";
		_pAlignImageElement.imageurl = "";
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 7) {
			_pAlignImageElement._image_width = 0;
			_pAlignImageElement._image_height = 0;
			_pAlignImageElement.create = function () {
				var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
				if (_owner_elem && _owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("img");
					_handle.id = this._parent_elem._handle.id + this._type_name;
					_handle._linked_element = this;
					_handle._element_type = 5;

					nexacro.__setDOMNodeSelectable(_handle, false);
					nexacro.__setDOMNodeAlt(_handle, "");

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

					if (!this.visible) {
						nexacro.__setDOMNodeStyleVisible(handle_style, false);
					}

					if (this.imageurl) {
						nexacro.__setImageDOMNodeImageUrl(_handle, this.imageurl);
					}

					if (this.align) {
						var align = this.align;
						nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
					}
					else if (this.halign && this.valign) {
						this._setElementAlignXY(_handle);
					}

					if (this.mirror) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
					}


					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				}
			};

			_pAlignImageElement.setElementAlign = function (align) {
				this.align = align;
				this.halign = align._halign;
				this.valign = align._valign;
				var _handle = this._handle;
				if (_handle) {
					this._setElementAlignXY(_handle);
				}
			};

			_pAlignImageElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					if (this._handle) {
						this.setElementAlignXY(this.halign, this.valign);
					}
				}
			};

			_pAlignImageElement.setElementAlignXY = function (halign, valign) {
				this.align = null;
				this.halign = halign;
				this.valign = valign;
				var _handle = this._handle;
				if (_handle) {
					this._setElementAlignXY(_handle);
				}
			};

			_pAlignImageElement._setElementAlignXY = function (_handle) {
				var imgw = 0, imgh = 0, imgpos_x = 0, imgpos_y = 0;
				if (this.width > 0) {
					imgw = this.imageurl ? this._image_width : this.width;

					var _halign = this.halign;

					if (this._isRtl()) {
						_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
					}

					switch (_halign) {
						case "left":
							imgpos_x = 0;
							break;
						case "right":
							imgpos_x = this.width - imgw;
							break;
						default:
							imgpos_x = ((this.width - imgw) / 2) | 0;
							break;
					}
				}
				if (this.height > 0) {
					imgh = this.imageurl ? this._image_height : this.height;
					switch (this.valign) {
						case "top":
							imgpos_y = 0;
							break;
						case "bottom":
							imgpos_y = this.height - imgh;
							break;
						default:
							imgpos_y = ((this.height - imgh) / 2) | 0;
							break;
					}
				}

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStylePos(handle_style, imgpos_x, imgpos_y);
				nexacro.__setDOMNodeStyleSize(handle_style, imgw, imgh);
			};

			_pAlignImageElement.setElementImageUrl = function (url) {
				if (this.imageurl != url) {
					url = nexacro._getURIValue(url);
					if (this.imageurl == url) {
						return;
					}

					if (url && !nexacro._isAbsolutePath(url)) {
						var base_url = this._parent_elem._getElementBaseUrl();
						url = nexacro._getImageLocation(url, base_url);
						if (this.imageurl == url) {
							return;
						}
					}
					this.imageurl = url;

					var imagesize = nexacro._getImageSize(url, this._on_loadImg, this);
					if (imagesize) {
						this._image_width = imagesize.width;
						this._image_height = imagesize.height;
						var _handle = this._handle;
						if (_handle) {
							nexacro.__setImageDOMNodeImageUrl(_handle, url);
							this.setElementAlignXY(this.halign, this.valign);
						}
					}
				}
			};

			_pAlignImageElement._on_loadImg = function (imgurl, w, h) {
				var _handle = this._handle;
				this._image_width = w;
				this._image_height = h;
				if (_handle && this.imageurl == imgurl) {
					nexacro.__setImageDOMNodeImageUrl(_handle, imgurl);
					this.setElementAlignXY(this.halign, this.valign);
				}
			};
		}
		else {
			_pAlignImageElement.create = function () {
				var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
				if (_owner_elem && _owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					_handle.id = this._parent_elem._handle.id + this._type_name;
					_handle._linked_element = this;
					_handle._element_type = 6;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					handle_style.position = "absolute";
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);
					handle_style.backgroundRepeat = "no-repeat";

					if (!this.visible) {
						nexacro.__setDOMNodeStyleVisible(handle_style, false);
					}

					if (this.align) {
						nexacro.__setBKImageDOMNodeStyleAlign(handle_style, this.align);
					}
					else if (this.halign && this.valign) {
						nexacro.__setBKImageDOMNodeStyleAlignXY(handle_style, this.halign, this.valign);
					}

					if (this.imageurl) {
						nexacro.__setBKImageDOMNodeStyleImageUrl(handle_style, this.imageurl);
					}

					if (this._owner_elem.mirror) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this._owner_elem.mirror && this._isRtl());
					}

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				}
			};

			_pAlignImageElement.setElementAlign = function (align) {
				this.align = align;
				this.halign = align._halign;
				this.valign = align._valign;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setBKImageDOMNodeStyleAlign(_handle.style, align);
				}
			};
			_pAlignImageElement.setElementAlignXY = function (halign, valign) {
				var _halign = halign;

				if (this._isRtl()) {
					_halign = halign == "left" ? "right" : (halign == "right" ? "left" : halign);
				}

				this.align = null;
				this.halign = halign;
				this.valign = valign;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setBKImageDOMNodeStyleAlignXY(_handle.style, _halign, valign);
				}
			};

			_pAlignImageElement.setElementImageUrl = function (url) {
				if (this.imageurl != url) {
					url = nexacro._getURIValue(url);
					if (this.imageurl == url) {
						return;
					}

					if (url && !nexacro._isAbsolutePath(url)) {
						var base_url = this._parent_elem._getElementBaseUrl();
						url = nexacro._getImageLocation(url, base_url);
						if (this.imageurl == url) {
							return;
						}
					}

					this.imageurl = url;

					var _handle = this._handle;
					if (_handle) {
						nexacro.__setBKImageDOMNodeStyleImageUrl(_handle.style, url);
					}
				}
			};
		}

		_pAlignImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
			var v = this.mirror;

			if (rtlimagemirroring) {
				v = nexacro._toBoolean(rtlimagemirroring._value);
			}

			if (this.mirror != v || bChangeRtlDirection) {
				this.mirror = v;

				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStyleTransformMirror(handle.style, this.mirror && this._isRtl());
				}
			}
		};

		delete _pAlignImageElement;

		nexacro.InputElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pInputElement = nexacro._createPrototype(nexacro.Element, nexacro.InputElement);
		nexacro.InputElement.prototype = _pInputElement;

		_pInputElement._type_name = "InputElement";

		_pInputElement.enable = true;
		_pInputElement.tabindex = -1;
		_pInputElement.font = null;
		_pInputElement.color = null;
		_pInputElement.cursor = null;
		_pInputElement.align = null;
		_pInputElement.halign = "";
		_pInputElement.valign = "";
		_pInputElement.padding = null;
		_pInputElement.padding_left = 0;
		_pInputElement.padding_top = 0;
		_pInputElement.padding_right = 0;
		_pInputElement.padding_bottom = 0;
		_pInputElement.useime = "global";
		_pInputElement.imemode = "auto";
		_pInputElement.readonly = false;
		_pInputElement.maxlength = -1;
		_pInputElement.password = false;
		_pInputElement.text = "";
		_pInputElement.value = "";
		_pInputElement.displaynulltext = "";
		_pInputElement.color = null;
		_pInputElement.caretcolor = null;
		_pInputElement.selectcolor = null;
		_pInputElement.selectbackground = null;
		_pInputElement.compositecolor = null;
		_pInputElement.tabindentsize = 4;
		_pInputElement.usemultiline = false;
		_pInputElement.linespace = 0;
		_pInputElement.wordwrap = "none";
		_pInputElement.type = "normal";

		_pInputElement._handle = null;
		_pInputElement._input_handle = null;
		_pInputElement._display_elem = null;

		_pInputElement._type = "text";

		_pInputElement._prev_x = 0;

		_pInputElement._is_focused = false;
		_pInputElement._is_focusing = false;

		_pInputElement._accept_keyinput = false;
		_pInputElement._accept_blur_by_altkey = false;
		_pInputElement._is_mousedown = false;
		_pInputElement._is_input_touchstart = false;
		_pInputElement._isUseDelCaret = false;

		_pInputElement.setInputElementCompositeClear = nexacro._emptyFn;

		_pInputElement._isPreventDefault = function (comp, evtname) {
			comp = comp._getFromComponent(comp);
			return (comp[evtname] && comp[evtname].defaultprevented);
		};

		_pInputElement._setElementInputRole = function () {
			var role = this._parent_elem.accessibility_role;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeAccessibilityRole(input_handle, role);
			}
		};

		_pInputElement._setElementInputLabel = function () {
			var label = this._parent_elem._makeAccessibilityLabelbyReadtype();
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeAccessibilityLabel(input_handle, label);
			}
		};


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
			_pInputElement._wantAccessibilityAdditionalLabel = function () {
				var role = this._parent_elem.accessibility_role;

				switch (role) {
					case "document":
					case "spinbutton":
						return false;
						break;
					default:
						return true;
						break;
				}
			};
		}
		else if (nexacro.Browser == "Chrome") {
			_pInputElement._wantAccessibilityAdditionalLabel = function () {
				return true;
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			_pInputElement._createInputHandle = function () {
				var elem_handle = this._handle;
				if (elem_handle) {
					var align_style_text = "";
					if (this.halign && this.valign) {
						var txt_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
						align_style_text = nexacro.__getInputHTMLStyleAlignXY(this.halign, this.valign, this.height, txt_size[1]);
					}

					var input_attr_str = nexacro.__getHTMLAttrEnable(this.enable) + 
						nexacro.__getHTMLAttrReadOnly(this.readonly) + 
						nexacro.__getHTMLAttrTabIndex(this.tabindex) + 
						nexacro.__getHTMLAttrTabIndentSize(this.tabindentsize);
					var input_style_str = nexacro.__getHTMLStyleAbsoluteTransparent() + 
						nexacro.__getHTMLStylePos(0, 0) + 
						nexacro.__getHTMLStyleSize(this.width, this.height) + 
						"border:none;outline:none;" + 
						nexacro.__getHTMLStyleFont(this.font) + 
						nexacro.__getHTMLStyleColor(this.color) + 
						align_style_text + 
						nexacro.__getHTMLStyleCursor(this.cursor, "text") + 
						nexacro.__getHTMLStylemeMode(this.imemode);

					var maxlength_str = "";
					if (this.password && this.maxlength > 0) {
						var maxlength_str = nexacro.__getHTMLAttrMaxLength(this.maxlength);
					}

					var type_str = " type='" + this._type + "'";
					var value_str = " value='" + (this.text ? nexacro._encodeXml(this.text) : "") + "'";
					var id_str = " id='" + this.parent._handle.id + "_input'";
					var html = "<input" + maxlength_str + type_str + id_str + input_attr_str + value_str + " style='" + input_style_str + "'/>";

					elem_handle.innerHTML = html;
					var input_handle = elem_handle.firstChild;
					input_handle._linked_element = this;

					if (nexacro._enableaccessibility) {
						nexacro.__setDOMNodeAccessibilityLabelBy(input_handle, "accessibility_notify_0");
						nexacro.__setDOMNodeAccessibilityRole(input_handle, this._parent_elem.accessibility_role);
					}

					return input_handle;
				}
			};
		}
		else {
			_pInputElement._createInputHandle = function () {
				var elem_handle = this._handle;
				if (elem_handle) {
					var input_element_name = "input";
					var _doc = this._owner_elem.getRootWindowHandle();
					var input_handle = _doc.createElement(input_element_name);
					input_handle._linked_element = this;
					nexacro.__setDOMNodeId(input_handle, this.parent._handle.id, "_" + input_element_name);
					elem_handle.style.webkitUserSelect = "initial";

					if (!this.enable) {
						if (nexacro.OS == "iOS") {
							input_handle.style.opacity = 1;
							input_handle.style.webkitTextFillColor = this.color ? this.color._syscolor : "";
						}
						nexacro.__setDOMNodeEnable(input_handle, false);
					}

					if (this.readonly) {
						nexacro.__setDOMNodeReadOnly(input_handle, true);
					}

					if (this.tabindex >= -1) {
						nexacro.__setDOMNodeTabIndex(input_handle, this.tabindex);
					}

					if (this._type) {
						nexacro.__changeInputDOMNodeType(input_handle, this._type);
					}

					if (this.password && this.maxlength > 0) {
						nexacro.__setDOMNodeMaxLength(input_handle, this.maxlength);
					}

					var input_style = input_handle.style;
					input_style.border = "none";
					input_style.outline = "none";

					nexacro.__setDOMNodeStyleAbsoluteTransparent(input_style);
					nexacro.__setDOMNodeStylePos(input_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(input_style, this.width, this.height);
					nexacro.__setDOMNodeStyleCursor(input_style, this.cursor, "text");

					if (this.font) {
						nexacro.__setDOMNodeStyleFont(input_style, this.font);
					}

					if (this.letterspace) {
						nexacro.__setDOMNodeStyleLetterSpace(input_handle, this.letterspace);
					}

					if (this.color) {
						nexacro.__setDOMNodeStyleColor(input_style, this.color);
					}

					if (this.halign && this.valign) {
						var txt_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
						nexacro.__setInputDOMNodeStyleAlignXY(input_style, this.halign, this.valign, this.height, this.width, txt_size[1]);
					}

					if (this.tabindentsize > 4) {
						nexacro.__setDOMNodeTabIndentSize(input_handle, this.tabindentsize);
					}
					if (this.text) {
						nexacro.__setDOMNodeValue(input_handle, this.text);
					}
					if (this.imemode) {
						nexacro.__setDOMNodeImeMode(input_handle, this.imemode);
					}

					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11 && nexacro.SystemLang == "ko-KR") {
						if (this.type) {
							if (this.type.indexOf("normal") == -1 && this.type.indexOf("full") == -1) {
								nexacro.__setDOMNodeImeMode(input_handle, "disabled");
							}
							else {
								nexacro.__setDOMNodeImeMode(input_handle, this.imemode);
							}
						}
					}

					nexacro.__appendDOMNode(elem_handle, input_handle);

					if (nexacro._enableaccessibility) {
						nexacro.__setDOMNodeAccessibilityLabelBy(input_handle, "accessibility_notify_0");
						nexacro.__setDOMNodeAccessibilityRole(input_handle, this._parent_elem.accessibility_role);
					}

					return input_handle;
				}
			};
		}
		;

		_pInputElement._destroyInputHandle = function () {
			if (this._input_handle) {
				this._input_handle._linked_element = null;

				nexacro.__removeDOMNode(this._dest_handle, this._input_handle);

				this._input_handle = null;
			}
		};

		_pInputElement._createPlaceHolderElement = function (visible) {
			var display_elem = this._display_elem;
			if (this._handle && !display_elem) {
				var display_elem = this._display_elem = new nexacro.TextBoxElement(this);
				display_elem.setElementSize(this.width, this.height);
				display_elem.setElementFont(this.font);
				display_elem.setElementLetterSpace(this.letterspace);
				display_elem.setElementColor(this.displaynulltextcolor);
				display_elem.setElementAlignXY(this.halign, this.valign);
				display_elem.setElementVisible(!!visible);
				display_elem.setElementText(this.displaynulltext);
				display_elem.create();

				nexacro.AccessibilityUtil.supportMobileApplicationAccessibility(display_elem._handle, true);

				if (nexacro.SupportTouch && nexacro.isTouchInteraction) {
					nexacro._observeSysEvent(display_elem._handle, "touchstart", "ontouchstart", this._inputhandler_displayelement_ontouchstart_forward);
				}

				return display_elem;
			}
		};

		_pInputElement._destroyPlaceHolderElement = function () {
			if (this._display_elem) {
				this._display_elem.destroy();
				this._display_elem = null;
			}
		};

		_pInputElement._createFakeFocusElement = function () {
			var fake_input_handle = this._fake_input_handle;
			if (this._handle && !fake_input_handle) {
				var input_handle = document.createElement("input");
				input_handle.type = "text";

				var input_style = input_handle.style;

				nexacro.__setDOMNodeTabIndex(input_handle, -1);
				nexacro.__setDOMNodeStyleAbsolute(input_style);
				nexacro.__setDOMNodeStylePos(input_style, 0, -10);
				nexacro.__setDOMNodeStyleSize(input_style, 1, 1);
				input_style.opacity = 0;
				input_style.border = "0px solid #ffffff";

				this._fake_input_handle = input_handle;

				nexacro.__appendDOMNode(this._handle, input_handle);
			}
		};

		_pInputElement._destroyFakeFocusElement = function () {
			if (this._fake_input_handle) {
				nexacro.__removeDOMNode(this._handle, this._fake_input_handle);
				this._fake_input_handle = null;
			}
		};

		_pInputElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle) {
				var _handle = this._handle;
				var _doc = _owner_elem.getRootWindowHandle();

				if (!_handle) {
					this._owner_elem = _owner_elem;
					_handle = _doc.createElement("div");
					_handle.id = this._parent_elem._handle.id + this._type_name;
					_handle._linked_element = this;
					_handle._element_type = 7;

					var handle_style = _handle.style;

					nexacro.__setDOMNodeStyleAbsoluteTransparent(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

					if (!this.visible) {
						nexacro.__setDOMNodeStyleVisible(handle_style, false);
					}

					if (this.padding) {
						nexacro.__setDOMNodeStylePadding(handle_style, this.padding);
					}
					else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
						nexacro.__setDOMNodeStylePaddingXY(handle_style, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
					}


					nexacro.__setDOMNodeStyleCursor(handle_style, this.cursor);

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					this._input_handle = this._createInputHandle();
				}

				var display_elem = this._display_elem;
				if (this.displaynulltext && !display_elem) {
					this._createPlaceHolderElement(this.value ? false : true);
				}
			}
		};

		_pInputElement.destroy = function () {
			this._destroyPlaceHolderElement();
			this._destroyInputHandle();

			if (this._input_handle) {
				this._input_handle._linked_element = null;

				nexacro.__removeDOMNode(this._dest_handle, this._input_handle);

				this._input_handle = null;
			}

			this.color = null;
			this.cursor = null;
			this.font = null;
			this.padding = null;
			this.selectbackground = null;
			this.selectcolor = null;
			this.letterspace = null;

			return nexacro.Element.prototype.destroy.call(this);
		};

		_pInputElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;
				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStylePos(handle.style, left, top);
				}

				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setDOMNodeStylePos(input_handle.style, left, top);
				}

				var display_elem = this._display_elem;
				if (display_elem) {
					display_elem.setElementPosition(left, top);
				}
			}
		};

		_pInputElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeStyleSize(handle.style, width, height);
				}

				var input_handle = this._input_handle;
				if (input_handle) {
					var pos_before = this.getElementCaretPos();

					nexacro.__setDOMNodeStyleSize(input_handle.style, width, height);

					this.setElementAlignXY(this.halign, this.valign);

					var pos_after = this.getElementCaretPos();

					if ((pos_before != -1 && pos_after != -1) && (pos_before.begin != pos_after.begin || pos_before.end != pos_after.end)) {
						this.setElementSetSelect(0, 0);
						this.setElementSetSelect(pos_before.begin, pos_before.end);
					}
				}
				var display_elem = this._display_elem;
				if (display_elem) {
					display_elem.setElementSize(width, height);
				}
			}
		};

		_pInputElement.setElementEnable = function (enable) {
			if (this.enable != enable) {
				this.enable = enable;

				var comp = this._parent_elem.linkedcontrol;
				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setDOMNodeEnable(input_handle, enable);

					if (nexacro.OS == "iOS" && comp) {
						var color = comp.on_find_CurrentStyle_color(comp._pseudo);
						if (enable) {
							input_handle.style.opacity = "";
							input_handle.style.webkitTextFillColor = "";
						}
						else {
							input_handle.style.opacity = 1;
							input_handle.style.webkitTextFillColor = color._syscolor;
						}
					}

					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 9) {
						this._isUseDelCaret = enable ? false : true;
						this._deleteCaret();
					}
				}
			}
		};

		_pInputElement.setElementTabIndex = function (tabindex) {
			if (this.tabindex != tabindex) {
				this.tabindex = tabindex;
				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setDOMNodeTabIndex(input_handle, tabindex);
				}
			}
		};

		_pInputElement.setElementFont = function (font) {
			this.font = font;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeStyleFont(input_handle.style, font);
			}

			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementFont(font);
			}
		};

		_pInputElement.setElementColor = function (color) {
			this.color = color;

			var comp = this._parent_elem.linkedcontrol;
			var input_handle = this._input_handle;
			if (input_handle) {
				if (nexacro.OS == "iOS" && comp) {
					if (comp.enable) {
						input_handle.style.webkitTextFillColor = "";
						nexacro.__setDOMNodeStyleColor(input_handle.style, color);
					}
					else {
						input_handle.style.webkitTextFillColor = color._syscolor;
					}
				}
				else {
					nexacro.__setDOMNodeStyleColor(input_handle.style, color);
				}
			}
			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementColor(this.displaynulltextcolor);
			}
		};

		_pInputElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _input_handle = this._input_handle;
				if (_input_handle) {
					nexacro.__setDOMNodeStyleLetterSpace(_input_handle.style, letterspace);
				}
				var _elem = this._display_elem;
				if (_elem) {
					_elem.setElementLetterSpace(letterspace);
				}
			}
		};

		_pInputElement.setElementCursor = function (cursor) {
			this.cursor = cursor;
			var input_cursor = cursor;
			var handle = this._handle;
			var input_handle = this._input_handle;
			if (handle && input_handle) {
				if (!this.readonly && this.enable && input_cursor && input_cursor._value == "auto") {
					input_cursor = nexacro._getCachedStyleObj("cursor", "text");
				}

				nexacro.__setDOMNodeStyleCursor(handle.style, input_cursor);
				nexacro.__setDOMNodeStyleCursor(input_handle.style, input_cursor);
			}

			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementCursor(input_cursor);
			}
		};

		_pInputElement.setElementAlign = function (align) {
			var _align = align ? align._getStyleObject(this._isRtl()) : null;

			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;

			var input_handle = this._input_handle;
			if (input_handle) {
				var pad = this.padding;
				var width = pad ? this.width - pad.left - pad.right : this.width;

				var txt_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
				nexacro.__setInputDOMNodeStyleAlignXY(input_handle.style, _align._halign, _align._valign, this.height, width, txt_size[1]);
			}
			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementAlign(align);
			}
		};

		_pInputElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = halign == "left" ? "right" : (halign == "right" ? "left" : halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;

			var input_handle = this._input_handle;
			if (input_handle) {
				var pad = this.padding;
				var width = pad ? this.width - pad.left - pad.right : this.width;
				if (width < 0) {
					width = 0;
				}

				var txt_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
				nexacro.__setInputDOMNodeStyleAlignXY(input_handle.style, _halign, valign, this.height, width, txt_size[1]);
			}
			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementAlignXY(halign, valign);
			}
		};

		_pInputElement.setElementPadding = function (padding) {
			this.padding = padding;

			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeStylePadding(input_handle.style, padding);
			}
			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementPadding(padding);
			}
		};

		_pInputElement.setElementPaddingXY = function (left, top, right, bottom) {
			this.padding = null;

			this.padding_left = left;
			this.padding_top = top;
			this.padding_right = right;
			this.padding_bottom = bottom;

			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeStylePaddingXY(input_handle.style, left, top, right, bottom);
			}
		};

		_pInputElement.setElementValue = function (value, bForce, bElementOnly) {
			var input_handle = this._input_handle;
			var comp = this._parent_elem.linkedcontrol;
			var editbase = comp._edit_base_api;

			if (!comp._is_alive) {
				return;
			}

			var bValChange = (this.value === value) ? false : true;
			var bEmpString = (value == "") ? true : false;

			if (editbase) {
				this.text = editbase._text;
			}
			else {
				this.text = value;
			}
			this.value = value;

			if (bElementOnly) {
				return;
			}

			if (input_handle) {
				var input_value = nexacro.__getDOMNodeValue(input_handle);
				var bTxtChange = (this.text == input_value) ? false : true;

				if (bValChange || bTxtChange || bEmpString || bForce) {
					this._updateInputValue();
				}
			}
		};

		_pInputElement._updateInputValue = function () {
			var input_handle = this._input_handle;
			var display_elem = this._display_elem;
			var comp = this._parent_elem.linkedcontrol;
			var editbase = comp._edit_base_api;
			var nulltext = this.displaynulltext;
			var active = nexacro._checkActiveElement(this);

			if (this.value !== undefined && this.value !== null) {
				this._setInputVisible(true);
				nexacro.__setDOMNodeValue(input_handle, this.text);
			}
			else if (!active && nulltext && nulltext.length > 0) {
				this._setInputVisible(false);
				if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8 && comp._is_subcontrol
					 && (comp._displaymode || comp.parent._displaymode)) {
					nexacro.__setDOMNodeValue(input_handle, nulltext);
				}
				else {
					nexacro.__setDOMNodeValue(input_handle, this.text);
					display_elem.setElementText(nulltext);
				}
			}
			else {
				this._setInputVisible(true);
				if (editbase && (editbase._type_name == "EditMaskString" || editbase._type_name == "EditMaskNumber")) {
					nexacro.__setDOMNodeValue(input_handle, this.text);
				}
				else {
					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8 && comp._is_subcontrol
						 && (comp._displaymode || comp.parent._displaymode)) {
						nexacro.__setDOMNodeValue(input_handle, " ");
					}
					else {
						nexacro.__setDOMNodeValue(input_handle, "");
					}
				}
			}
		};

		_pInputElement.setElementDisplayNullText = function (nulltext) {
			var handle = this._handle;
			var input_handle = this._input_handle;

			var nulltext_change = false;
			if (this.displaynulltext != nulltext) {
				nulltext_change = true;
				this.displaynulltext = nulltext;
			}

			if (handle && input_handle) {
				var display_elem = this._display_elem;
				if (nulltext) {
					if (!display_elem) {
						this._createPlaceHolderElement(false);
					}
				}
				else {
					if (display_elem) {
						this._destroyPlaceHolderElement();
					}
				}

				if (nulltext_change && nexacro._isNull(this.value)) {
					this._updateInputValue();
				}
			}
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) {
			_pInputElement._setInputVisible = function (visible) {
				if (this._input_visible != visible) {
					this._input_visible = visible;

					var input_handle = this._input_handle;
					if (input_handle) {
						nexacro.__setDOMNodeStyleVisible(input_handle.style, visible);
					}
					var display_elem = this._display_elem;
					if (display_elem) {
						display_elem.setElementVisible(!visible);
					}
				}
			};
		}
		else if (nexacro.Browser == "MobileSafari") {
			_pInputElement._setInputVisible = function (visible) {
				var input_handle = this._input_handle;
				if (input_handle) {
					if (!(nexacro._enableaccessibility && nexacro._accessibilitytype == 4)) {
						nexacro.__setDOMNodeStyleVisible(input_handle.style, visible);
					}
				}
				var display_elem = this._display_elem;
				if (display_elem) {
					if (!visible) {
						display_elem.setElementSize(this.width, this.height);

						if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
							nexacro.__setDOMNodeAccessibilityLabel(this._input_handle, this._parent_elem.accessibility_label + " " + this.displaynulltext);
						}
					}
					else {
						display_elem.setElementSize(0, 0);
						if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4) {
							nexacro.__setDOMNodeAccessibilityLabel(this._input_handle, this._parent_elem.accessibility_label);
						}
					}
					display_elem.setElementVisible(!visible);
				}
			};
		}
		else {
			_pInputElement._setInputVisible = function (visible) {
				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setDOMNodeStyleVisible(input_handle.style, visible);
				}
				var display_elem = this._display_elem;
				if (display_elem) {
					if (!visible) {
						display_elem.setElementSize(this.width, this.height);
					}
					else {
						display_elem.setElementSize(0, 0);
					}
					display_elem.setElementVisible(!visible);
				}
			};
		}

		_pInputElement.setElementMaxLength = function (length) {
			if (this.maxlength != length) {
				this.maxlength = length;

				var input_handle = this._input_handle;
				if (input_handle) {
					if (this.password && length > 0) {
						nexacro.__setDOMNodeMaxLength(input_handle, length);
					}
					else {
						input_handle.removeAttribute("maxlength");
					}
				}
			}
		};

		_pInputElement.setElementReadonly = function (readonly) {
			if (this.readonly != readonly) {
				this.readonly = readonly;
				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setDOMNodeReadOnly(input_handle, readonly);
					if (readonly) {
						this._deleteCaret();
					}
				}
			}
		};

		_pInputElement.setElementCaretColor = function (color) {
			this.caretcolor = color;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeCaretColor(input_handle, color);
			}
		};

		_pInputElement.setElementSelectColor = function (color) {
			this.selectcolor = color;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeSelectColor(input_handle, color);
			}
		};

		_pInputElement.setElementDisplayNullTextColor = function (color) {
			this.displaynulltextcolor = color;
			var display_elem = this._display_elem;
			if (display_elem) {
				display_elem.setElementColor(color);
			}
		};
		_pInputElement.setElementSelectBackgroundColor = function (color) {
			this.selectbackground = color;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeSelectBackgroundColor(input_handle, color);
			}
		};

		_pInputElement.setElementCompositeColor = function (color) {
			this.compositecolor = color;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeCompositeColor(input_handle, color);
			}
		};

		_pInputElement.setElementTabindentSize = function (indent) {
			this.tabindentsize = indent;
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeTabIndentSize(input_handle, indent);
			}
		};

		_pInputElement.setElementLineSpace = function (linespace) {
		};

		_pInputElement.setElementWordWrap = function (wordwrap) {
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			_pInputElement.setElementPassword = function (bPassword) {
				if (this.password != bPassword) {
					this.password = bPassword;
					this._type = bPassword ? "password" : "text";

					var maxlength = this.maxlength;
					var input_handle = this._input_handle;
					if (input_handle) {
						var new_handle = nexacro.__changeInputDOMNodeType(input_handle, this._type);

						if (bPassword) {
							if (maxlength > 0) {
								nexacro.__setDOMNodeMaxLength(new_handle, maxlength);
							}
							else {
								new_handle.removeAttribute("maxlength");
							}
						}
						else {
							new_handle.removeAttribute("maxlength");
						}

						if (new_handle != input_handle) {
							this._unBindEvent();

							new_handle._linked_element = this;
							this._input_handle = new_handle;

							this._bindEvent();
							if (this._is_focused) {
								this.setElementFocus();
							}
						}
					}
				}
			};
		}
		else {
			_pInputElement.setElementPassword = function (bPassword) {
				if (this.password != bPassword) {
					this.password = bPassword;
					this._type = bPassword ? "password" : "text";

					var maxlength = this.maxlength;
					var input_handle = this._input_handle;
					if (input_handle) {
						nexacro.__changeInputDOMNodeType(input_handle, this._type);

						if (bPassword) {
							if (maxlength > 0) {
								nexacro.__setDOMNodeMaxLength(input_handle, maxlength);
							}
							else {
								input_handle.removeAttribute("maxlength");
							}
						}
						else {
							input_handle.removeAttribute("maxlength");
						}
					}
				}
			};
		}

		if (nexacro.SupportTouch && nexacro.isTouchInteraction) {
			_pInputElement.setElementInputType = function (type) {
				if (type == "number") {
					type = "tel";
				}
				else if (type !== "date") {
					type = "text";
				}

				if (this._type != type) {
					this._type = type;

					var input_handle = this._input_handle;
					if (input_handle) {
						nexacro.__changeInputDOMNodeType(input_handle, this._type);
					}
				}
			};
		}
		else {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 11 && nexacro.SystemLang == "ko-KR") {
				_pInputElement.setElementInputType = function (type) {
					var input_handle = this._input_handle;

					if (input_handle) {
						if (type.indexOf("normal") == -1 && type.indexOf("full") == -1) {
							nexacro.__setDOMNodeImeMode(input_handle, "disabled");
						}
						else {
							nexacro.__setDOMNodeImeMode(input_handle, this.imemode);
						}
					}
					this.type = type;
					this._type = "text";
				};
			}
			else {
				_pInputElement.setElementInputType = function (type) {
					this._type = "text";
				};
			}
		}


		_pInputElement.setElementUseIme = function (useime) {
			if (this.useime != useime) {
				this.useime = useime;
			}
		};

		_pInputElement.setElementImeMode = function (imemode) {
			if (this.imemode != imemode) {
				this.imemode = imemode;
				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setDOMNodeImeMode(input_handle, imemode);
				}
			}
		};

		_pInputElement.setElementFocus = function (selffocus) {
			var input_handle = this._input_handle;
			if (input_handle) {
				this._is_focusing = true;
				this._setInputVisible(true);

				if (nexacro.isTouchInteraction || ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && nexacro.SupportTouch)) {
					if (!this._is_input_touchstart) {
						var comp = this._parent_elem.linkedcontrol;
						if (nexacro.OS == "iOS" && comp && this._type != "date") {
							nexacro.OnceCallbackTimer.callonce(comp, function () {
								nexacro.__setInputDOMNodeFocus(input_handle);
							});
						}
						else {
							nexacro.__setInputDOMNodeFocus(input_handle);
						}
					}
					this._is_input_touchstart = false;
				}
				else {
					nexacro.__setInputDOMNodeFocus(input_handle);
				}

				nexacro.__setLastFocusedElement(this);
			}
		};

		_pInputElement.setElementBlur = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeBlur(input_handle);
			}
		};

		_pInputElement.setElementSetSelect = function (start, end) {
			var input_handle = this._input_handle;
			if (input_handle) {
				var _doc = this.getRootWindowHandle();
				var val = this.getElementValue();
				var len = val.length;

				end = (end == -1 ? len : end);
				var range = end - start;
				if (_doc) {
					if (range == len) {
						if (nexacro.isTouchInteraction && nexacro.OS == "iOS") {
							nexacro.__setDOMNodeSetSelect(_doc, input_handle, start, end);
						}
						else {
							nexacro.__setDOMNodeSelect(_doc, input_handle);
						}
					}
					else {
						nexacro.__setDOMNodeSetSelect(_doc, input_handle, start, end);
					}
				}
			}
		};


		_pInputElement.getElementId = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				return input_handle.id;
			}
			return -1;
		};

		_pInputElement.inputElementAttributefillter = function (v) {
			if (v == "accesskey") {
				return "accessKey";
			}
			else if (v == "contenteditable") {
				return "contentEditable";
			}
			else if (v == "tabindex") {
				return "tabIndex";
			}
			else {
				return v;
			}
		};

		_pInputElement.getInputElementAttribute = function (attribute) {
			var input_handle = this._input_handle;
			if (input_handle) {
				var rtn = input_handle[this.inputElementAttributefillter(attribute)];
				if (rtn) {
					return rtn;
				}
				else {
					return undefined;
				}
			}
			return undefined;
		};

		_pInputElement.setInputElementAttribute = function (attribute, attrvalue) {
			var input_handle = this._input_handle;
			if (input_handle) {
				attribute = this.inputElementAttributefillter(attribute);
				if (attribute) {
					input_handle.setAttribute(attribute, attrvalue);
					return true;
				}
				else {
					return false;
				}
			}
			return false;
		};

		_pInputElement.getElementCaretPos = function () {
			var input_handle = this._input_handle;
			var bActive = nexacro._checkActiveElement(this);

			if (input_handle && bActive) {
				var _doc = this.getRootWindowHandle();
				if (_doc) {
					return nexacro.__getDOMNodeCaretPos(_doc, input_handle);
				}
			}
			return -1;
		};

		_pInputElement.getElementSelectionRange = function () {
			var input_handle = this._input_handle;
			var _doc = this.getRootWindowHandle();

			if (input_handle && _doc) {
				var pos = nexacro.__getDOMNodeCaretPos(_doc, input_handle);
				return [pos.begin, pos.end];
			}

			return [0, 0];
		};

		_pInputElement.getCaretLine = function () {
			return 1;
		};

		_pInputElement.getScrollLeft = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				if (nexacro.Browser == "Edge") {
					var pos = input_handle.scrollLeft;
					var comp = this._parent_elem.linkedcontrol;
					var editbase = comp ? comp._edit_base_api : null;
					if (editbase && editbase._pasteAction) {
						return pos + 3;
					}
				}

				return input_handle.scrollLeft;
			}
			return 0;
		};

		_pInputElement.setScrollLeft = function (v) {
			var input_handle = this._input_handle;
			if (input_handle) {
				input_handle.scrollLeft = v;
			}
		};

		_pInputElement.getScrollTop = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				return input_handle.scrollTop;
			}
			return 0;
		};

		_pInputElement.setScrollTop = function (v) {
			var input_handle = this._input_handle;
			if (input_handle) {
				input_handle.scrollTop = v;
			}
		};

		_pInputElement.getScrollWidth = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				return input_handle.scrollWidth;
			}
			return 0;
		};

		_pInputElement.getScrollHeight = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				return (input_handle.clientHeight > input_handle.scrollHeight ? input_handle.clientHeight : input_handle.scrollHeight);
			}
			return 0;
		};

		_pInputElement.getElementValue = function () {
			var input_handle = this._input_handle;
			if (input_handle) {
				return nexacro.__getDOMNodeValue(input_handle);
			}
			return "";
		};

		_pInputElement.setElementAccessibilityRole = function (role) {
			var accrole = nexacro._roleList[role];
			var input_handle = this._input_handle;
			if (input_handle) {
				nexacro.__setDOMNodeAccessibilityRole(input_handle, accrole);
			}
		};

		_pInputElement._checkActiveElement = function () {
			var _handle = this._input_handle;
			var isActive = true;

			if (_handle) {
				isActive = nexacro._checkActiveElement(this);
			}

			return isActive;
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pInputElement._bindEvent = function () {
				var input = this._input_handle;

				if (typeof input.onpropertychange !== "undefined") {
					input.attachEvent("onpropertychange", this._inputhandler_onkeyinput_forward);
				}
				else {
					nexacro._observeSysEvent(input, "input", "oninput", this._inputhandler_onkeyinput_forward);
					nexacro._observeSysEvent(input, "compositionstart", "oncompositionstart", this._inputhandler_oncompositionstart_forward);
					nexacro._observeSysEvent(input, "compositionupdate", "oncompositionupdate", this._inputhandler_oncompositionupdate_forward);
					nexacro._observeSysEvent(input, "compositionend", "oncompositionend", this._inputhandler_oncompositionend_forward);
				}

				nexacro._observeSysEvent(input, "focus", "onfocus", this._inputhandler_onfocus_forward);
				nexacro._observeSysEvent(input, "blur", "onblur", this._inputhandler_onblur_forward);
				nexacro._observeSysEvent(input, "mousedown", "onmousedown", this._inputhandler_onmousedown_forward);
				nexacro._observeSysEvent(input, "mouseup", "onmouseup", this._inputhandler_onmouseup_forward);
				nexacro._observeSysEvent(input, "mousemove", "onmousemove", this._inputhandler_onmousemove_forward);

				nexacro._observeSysEvent(input, "keydown", "onkeydown", this._inputhandler_onkeydown_forward);
				nexacro._observeSysEvent(input, "keypress", "onkeypress", this._inputhandler_onkeypress_forward);
				nexacro._observeSysEvent(input, "keyup", "onkeyup", this._inputhandler_onkeyup_forward);

				nexacro._observeSysEvent(input, "copy", "oncopy", this._inputhandler_oncopy_forward);
				nexacro._observeSysEvent(input, "cut", "oncut", this._inputhandler_oncut_forward);
				nexacro._observeSysEvent(input, "paste", "onpaste", this._inputhandler_onpaste_forward);

				nexacro._observeSysEvent(input, "select", "onselect", this._inputhandler_onselect_forward);
			};

			_pInputElement._unBindEvent = function () {
				var input = this._input_handle;
				if (input) {
					if (typeof input.onpropertychange !== "undefined") {
						input.detachEvent("onpropertychange", this._inputhandler_onkeyinput_forward);
						if (input.type != "password") {
							nexacro._stopSysObserving(input, "focus", "onfocus", this._inputhandler_onfocus_forward);
						}
					}
					else {
						nexacro._stopSysObserving(input, "input", "oninput", this._inputhandler_onkeyinput_forward);
						nexacro._stopSysObserving(input, "compositionstart", "oncompositionstart", this._inputhandler_oncompositionstart_forward);
						nexacro._stopSysObserving(input, "compositionupdate", "oncompositionupdate", this._inputhandler_oncompositionupdate_forward);
						nexacro._stopSysObserving(input, "compositionend", "oncompositionend", this._inputhandler_oncompositionend_forward);
						nexacro._stopSysObserving(input, "focus", "onfocus", this._inputhandler_onfocus_forward);
					}
					nexacro._stopSysObserving(input, "blur", "onblur", this._inputhandler_onblur_forward);
					nexacro._stopSysObserving(input, "mousedown", "onmousedown", this._inputhandler_onmousedown_forward);
					nexacro._stopSysObserving(input, "mouseup", "onmouseup", this._inputhandler_onmouseup_forward);
					nexacro._stopSysObserving(input, "mousemove", "onmousemove", this._inputhandler_onmousemove_forward);

					nexacro._stopSysObserving(input, "keydown", "onkeydown", this._inputhandler_onkeydown_forward);
					nexacro._stopSysObserving(input, "keypress", "onkeypress", this._inputhandler_onkeypress_forward);
					nexacro._stopSysObserving(input, "keyup", "onkeyup", this._inputhandler_onkeyup_forward);

					nexacro._stopSysObserving(input, "copy", "oncopy", this._inputhandler_oncopy_forward);
					nexacro._stopSysObserving(input, "cut", "oncut", this._inputhandler_oncut_forward);
					nexacro._stopSysObserving(input, "paste", "onpaste", this._inputhandler_onpaste_forward);

					nexacro._stopSysObserving(input, "select", "onselect", this._inputhandler_onselect_forward);
				}
			};

			_pInputElement._inputhandler_onkeyinput_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;

				if (evt.propertyName === undefined || evt.propertyName == "value") {
					return nexacro._inputhandler_onkeyinput(node, evt);
				}
			};

			_pInputElement._inputhandler_oncopy_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_oncopy(node, evt);
			};

			_pInputElement._inputhandler_oncut_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_oncut(node, evt);
			};

			_pInputElement._inputhandler_onpaste_forward = function (evt) {
				application._is_input_paste = true;

				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onpaste(node, evt);
			};

			_pInputElement._inputhandler_oncompositionstart_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_oncompositionstart(node, evt);
			};

			_pInputElement._inputhandler_oncompositionupdate_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_oncompositionupdate(node, evt);
			};

			_pInputElement._inputhandler_oncompositionend_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_oncompositionend(node, evt);
			};

			_pInputElement._inputhandler_onfocus_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onfocus(node, evt);
			};

			_pInputElement._inputhandler_onblur_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onblur(node, evt);
			};

			_pInputElement._inputhandler_onkeypress_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onkeypress(node, evt);
			};

			_pInputElement._inputhandler_onmousedown_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onmousedown(node, evt);
			};

			_pInputElement._inputhandler_onmouseup_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}

				var node = evt.srcElement;
				if (evt.button == 2) {
					application._input_paste_comp = node._linked_element._parent_elem.linkedcontrol;
				}

				return nexacro._inputhandler_onmouseup(node, evt);
			};

			_pInputElement._inputhandler_lock_onmouseup_forward = nexacro._emptyFn;
			_pInputElement._inputhandler_onmousemove_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onmousemove(node, evt);
			};

			_pInputElement._inputhandler_lock_onmousemove_forward = nexacro._emptyFn;
			_pInputElement._inputhandler_ontouchstart_forward = function (evt) {
			};
			_pInputElement._inputhandler_ontouchend_forward = function (evt) {
			};
			_pInputElement._inputhandler_ontouchmove_forward = function (evt) {
			};

			_pInputElement._inputhandler_onkeydown_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onkeydown(node, evt);
			};

			_pInputElement._inputhandler_onkeyup_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onkeyup(node, evt);
			};

			_pInputElement._inputhandler_onselect_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				return nexacro._inputhandler_onselect(node, evt);
			};


			if (nexacro.OSVersion >= 6.0) {
				_pInputElement._on_sys_keyinput = function (keycode, altkey, ctrlkey, shiftkey) {
					var comp = this._parent_elem.linkedcontrol;
					if (this._isPreventDefault(comp, "onkeydown")) {
						return;
					}

					if (nexacro.BrowserVersion == 8) {
						if (this._accept_keyinput || this._is_keydown) {
							comp._on_input_keyinput(this);
						}
						else {
							this._accept_keyinput = true;
						}
					}
					else {
						comp._on_input_keyinput(this);
					}
				};
			}
			else {
				_pInputElement._on_sys_keyinput = function (keycode, altkey, ctrlkey, shiftkey) {
					var comp = this._parent_elem.linkedcontrol;
					if (this._isPreventDefault(comp, "onkeydown")) {
						return;
					}
					var accept_keyinput = false;

					if (this._accept_keyinput || this._is_keydown) {
						if (comp._edit_base_api._is_selected() && comp._edit_base_api._keycode != nexacro.KeyCode_ImeInput && comp._edit_base_api._keycode != 8 && comp._edit_base_api._keycode != 46) {
							accept_keyinput = true;
						}
						comp._on_input_keyinput(this);

						this._accept_keyinput = accept_keyinput;
					}
				};
			}

			_pInputElement._on_sys_copy = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_copy(this);
			};

			_pInputElement._on_sys_cut = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_cut(this);
			};

			_pInputElement._on_sys_paste = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_paste(this);
			};

			_pInputElement._on_sys_compositionstart = function (data) {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_compositionstart(data);
			};

			_pInputElement._on_sys_compositionupdate = function (data) {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_compositionupdate(data);
			};

			_pInputElement._on_sys_compositionend = function (data) {
				var comp = this._parent_elem.linkedcontrol;
				var pThis = this;

				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				if (data == "" && !comp._edit_base_api._is_hangul(data)) {
					data = comp._edit_base_api.getCompositionData(this);
				}

				comp._on_input_compositionend(data);

				if (!(data == "" || comp._edit_base_api._is_hangul(data))) {
					nexacro.OnceCallbackTimer.callonce(comp, function () {
						pThis._on_sys_keyinput(this);
					});
				}
			};
		}
		else {
			_pInputElement._bindEvent = function () {
				var input = this._input_handle;

				if (typeof input.onpropertychange !== "undefined") {
					input.attachEvent("onpropertychange", this._inputhandler_onkeyinput_forward);
				}
				else {
					nexacro._observeSysEvent(input, "input", "oninput", this._inputhandler_onkeyinput_forward);
					nexacro._observeSysEvent(input, "compositionstart", "oncompositionstart", this._inputhandler_oncompositionstart_forward);
					nexacro._observeSysEvent(input, "compositionupdate", "oncompositionupdate", this._inputhandler_oncompositionupdate_forward);
					nexacro._observeSysEvent(input, "compositionend", "oncompositionend", this._inputhandler_oncompositionend_forward);
				}

				nexacro._observeSysEvent(input, "focus", "onfocus", this._inputhandler_onfocus_forward);
				nexacro._observeSysEvent(input, "blur", "onblur", this._inputhandler_onblur_forward);
				nexacro._observeSysEvent(input, "mousedown", "onmousedown", this._inputhandler_onmousedown_forward);
				nexacro._observeSysEvent(input, "mouseup", "onmouseup", this._inputhandler_onmouseup_forward);
				nexacro._observeSysEvent(input, "mousemove", "onmousemove", this._inputhandler_onmousemove_forward);

				nexacro._observeSysEvent(input, "keydown", "onkeydown", this._inputhandler_onkeydown_forward);
				nexacro._observeSysEvent(input, "keypress", "onkeypress", this._inputhandler_onkeypress_forward);
				nexacro._observeSysEvent(input, "keyup", "onkeyup", this._inputhandler_onkeyup_forward);

				nexacro._observeSysEvent(input, "copy", "oncopy", this._inputhandler_oncopy_forward);
				nexacro._observeSysEvent(input, "cut", "oncut", this._inputhandler_oncut_forward);
				nexacro._observeSysEvent(input, "paste", "onpaste", this._inputhandler_onpaste_forward);

				nexacro._observeSysEvent(input, "select", "onselect", this._inputhandler_onselect_forward);
			};

			_pInputElement._unBindEvent = function () {
				var input = this._input_handle;
				if (input) {
					if (typeof input.onpropertychange !== "undefined") {
						input.detachEvent("onpropertychange", this._inputhandler_onkeyinput_forward);
						if (input.type != "password") {
							nexacro._stopSysObserving(input, "focus", "onfocus", this._inputhandler_onfocus_forward);
						}
					}
					else {
						nexacro._stopSysObserving(input, "input", "oninput", this._inputhandler_onkeyinput_forward);
						nexacro._stopSysObserving(input, "compositionstart", "oncompositionstart", this._inputhandler_oncompositionstart_forward);
						nexacro._stopSysObserving(input, "compositionupdate", "oncompositionupdate", this._inputhandler_oncompositionupdate_forward);
						nexacro._stopSysObserving(input, "compositionend", "oncompositionend", this._inputhandler_oncompositionend_forward);
						nexacro._stopSysObserving(input, "focus", "onfocus", this._inputhandler_onfocus_forward);
					}
					nexacro._stopSysObserving(input, "blur", "onblur", this._inputhandler_onblur_forward);
					nexacro._stopSysObserving(input, "mousedown", "onmousedown", this._inputhandler_onmousedown_forward);
					nexacro._stopSysObserving(input, "mouseup", "onmouseup", this._inputhandler_onmouseup_forward);
					nexacro._stopSysObserving(input, "mousemove", "onmousemove", this._inputhandler_onmousemove_forward);

					nexacro._stopSysObserving(input, "keydown", "onkeydown", this._inputhandler_onkeydown_forward);
					nexacro._stopSysObserving(input, "keypress", "onkeypress", this._inputhandler_onkeypress_forward);
					nexacro._stopSysObserving(input, "keyup", "onkeyup", this._inputhandler_onkeyup_forward);

					nexacro._stopSysObserving(input, "copy", "oncopy", this._inputhandler_oncopy_forward);
					nexacro._stopSysObserving(input, "cut", "oncut", this._inputhandler_oncut_forward);
					nexacro._stopSysObserving(input, "paste", "onpaste", this._inputhandler_onpaste_forward);

					nexacro._stopSysObserving(input, "select", "onselect", this._inputhandler_onselect_forward);
				}
			};

			_pInputElement._inputhandler_oncopy_forward = function (evt) {
				application._is_input_paste = true;
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}

				var node = evt.target;
				return nexacro._inputhandler_oncopy(node, evt);
			};

			_pInputElement._inputhandler_oncut_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_oncut(node, evt);
			};

			_pInputElement._inputhandler_onpaste_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				application._is_input_paste = true;
				return nexacro._inputhandler_onpaste(node, evt);
			};

			_pInputElement._inputhandler_onkeyinput_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onkeyinput(node, evt);
			};

			_pInputElement._inputhandler_oncompositionstart_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_oncompositionstart(node, evt);
			};

			_pInputElement._inputhandler_oncompositionupdate_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_oncompositionupdate(node, evt);
			};

			_pInputElement._inputhandler_oncompositionend_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_oncompositionend(node, evt);
			};

			_pInputElement._inputhandler_onfocus_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onfocus(node, evt);
			};

			_pInputElement._inputhandler_onblur_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onblur(node, evt);
			};

			_pInputElement._inputhandler_onkeypress_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onkeypress(node, evt);
			};

			_pInputElement._inputhandler_onmousedown_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onmousedown(node, evt);
			};

			_pInputElement._inputhandler_onmouseup_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				if (evt.button == 2) {
					application._input_paste_comp = node._linked_element._parent_elem.linkedcontrol;
				}
				return nexacro._inputhandler_onmouseup(node, evt);
			};

			_pInputElement._inputhandler_lock_onmouseup_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				if (evt.button == 2) {
					application._input_paste_comp = node._linked_element._parent_elem.linkedcontrol;
				}
				return nexacro._inputhandler_lock_onmouseup(node, evt);
			};

			_pInputElement._inputhandler_onmousemove_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onmousemove(node, evt);
			};

			_pInputElement._inputhandler_lock_onmousemove_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_lock_onmousemove(node, evt);
			};

			_pInputElement._inputhandler_onkeydown_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onkeydown(node, evt);
			};

			_pInputElement._inputhandler_onkeyup_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onkeyup(node, evt);
			};

			_pInputElement._inputhandler_onselect_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				return nexacro._inputhandler_onselect(node, evt);
			};

			_pInputElement._on_sys_keyinput = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_keyinput(this);
			};

			_pInputElement._on_sys_copy = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_copy(this);
			};

			_pInputElement._on_sys_cut = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_cut(this);
			};

			_pInputElement._on_sys_paste = function () {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_paste(this);
			};

			_pInputElement._on_sys_compositionstart = function (data) {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_compositionstart(data);
			};

			_pInputElement._on_sys_compositionupdate = function (data) {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_compositionupdate(data);
			};

			_pInputElement._on_sys_compositionend = function (data) {
				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_compositionend(data);
			};
		}

		_pInputElement._inputhandler_displayelement_ontouchstart_forward = function (evt) {
			var input_elem = this._linked_element.parent;
			var comp = input_elem._parent_elem.linkedcontrol;
			var _win = comp._getWindow();
			var cur_focus_paths = _win.getCurrentFocusPaths();

			var pThis = comp;

			while (pThis && pThis._is_nc_control) {
				pThis = pThis.parent;
			}

			if (!pThis) {
				return;
			}

			if (cur_focus_paths) {
				focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
			}

			if (focuspath_index > -1) {
				input_elem._setInputVisible(true);
			}
		};

		_pInputElement._on_sys_focus = function (target) {
			var comp = this._parent_elem.linkedcontrol;
			var editbase = comp._edit_base_api;
			var _win = comp._getWindow();

			if (_win._is_active_window) {
				var cur_focus_paths = _win.getCurrentFocusPaths();

				var pThis = comp;

				while (pThis && pThis._is_nc_control) {
					pThis = pThis.parent;
				}

				if (!pThis) {
					return;
				}

				pThis = pThis._getRootComponent(pThis);

				var focuspath_index = -1;
				if (cur_focus_paths) {
					focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
				}

				if (focuspath_index == -1) {
					var old_focused_comp = cur_focus_paths ? cur_focus_paths[cur_focus_paths.length - 1] : null;
					if (old_focused_comp) {
						old_focused_comp._re_focus = true;
						if (nexacro.Browser == "Safari") {
							if (editbase._is_composition()) {
								nexacro.OnceCallbackTimer.callonce(old_focused_comp, function () {
									old_focused_comp.on_apply_custom_setfocus();
								});
							}
							else {
								old_focused_comp.on_apply_custom_setfocus();
							}
						}
						else {
							old_focused_comp.on_apply_custom_setfocus();
						}
						old_focused_comp._re_focus = false;
						return;
					}
				}
			}

			if (this._isPreventDefault(comp, "onfocus")) {
				return;
			}
			if (!comp._is_alive) {
				return;
			}

			comp._on_input_focus(this, target);

			var input_handle = this._input_handle;
			if (input_handle && !this._is_focused) {
				this._is_focused = true;
				this._setInputVisible(true);
			}

			nexacro.__setLastFocusedElement(this);
		};

		_pInputElement._on_sys_blur = function (target) {
			var comp = this._parent_elem.linkedcontrol;
			var _win = comp._getWindow();
			var focuspath_index = -1;
			var cur_focus_paths = _win.getCurrentFocusPaths();

			if (this._isPreventDefault(comp, "onkillfocus")) {
				return;
			}
			if (!comp._is_alive) {
				return;
			}

			if ((comp && comp._edit_base_api && comp._edit_base_api._accept_blur_event)) {
				if (_win._is_active_window && !_win._is_iframe_focus) {
					var pThis = comp;

					while (pThis && pThis._is_nc_control) {
						pThis = pThis.parent;
					}

					if (!pThis) {
						return;
					}

					if (cur_focus_paths) {
						focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
					}

					if (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) {
						if (focuspath_index > -1) {
							comp._set_editbase_focusstat("blur");
							this.setElementFocus();
							return;
						}
					}
					else if (nexacro.Browser == "MobileSafari") {
						if (focuspath_index > -1) {
							comp._on_killfocus();
						}
					}
				}
			}

			comp._on_input_blur(this, target);

			var input_handle = this._input_handle;
			if (input_handle && this._is_focused) {
				this._is_focused = false;

				if (nexacro._isNull(this.value) && this.displaynulltext) {
					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
						if (!this._is_focusing || input_handle.readOnly) {
							this._setInputVisible(false);
						}
					}
					else {
						this._setInputVisible(false);
					}
				}
				this._is_focusing = false;
			}

			var win_handle = nexacro._getMainWindowHandle();
			if (win_handle != win_handle.parent) {
				var last_focus = cur_focus_paths[cur_focus_paths.length - 1];
				if (!nexacro._enableaccessibility && (nexacro.Browser == "Edge" || nexacro.Browser == "IE" && nexacro.BrowserVersion > 9)) {
					if (!last_focus._has_inputElement) {
						this._createFakeFocusElement();
						this._fake_input_handle.focus();
						this._destroyFakeFocusElement();
					}
				}
			}
		};

		_pInputElement._on_sys_keypress = function (keycode, charcode, altkey, ctrlkey, shiftkey, evt) {
			var comp = this._parent_elem.linkedcontrol;
			if (this._isPreventDefault(comp, "onkeydown")) {
				return;
			}
			if (!comp._is_alive) {
				return;
			}
			if (ctrlkey && charcode == 118) {
				return;
			}
			if (keycode == nexacro.Event.KEY_TAB) {
				this._event_stop = true;
				return;
			}

			comp._on_input_keypress(this, keycode, charcode, altkey, ctrlkey, shiftkey);

			var c = String.fromCharCode(keycode);
			c = comp._edit_base_api.applyInputmode(c);
			if (c.length == 1 && nexacro.isAlpha(c)) {
				keycode = c.charCodeAt(0);
			}
			evt.keyCode = keycode;
		};

		_pInputElement._on_sys_mousedown = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = this._parent_elem.linkedcontrol;
			if (nexacro._enableaccessibility && nexacro._accessibilitytype == 4
				 && comp && comp._accessibility_role == "combobox") {
				this._event_stop = true;
				return;
			}

			if (this._isPreventDefault(comp, "onlbuttondown") || this._isPreventDefault(comp, "onrbuttondown")) {
				this._event_stop = true;
				return;
			}
			if (!comp._is_alive) {
				return;
			}

			if (comp._on_input_mousedown) {
				comp._on_input_mousedown(this, altkey, ctrlkey, shiftkey);
			}
		};

		_pInputElement._on_sys_touchstart = function () {
			var comp = this._parent_elem.linkedcontrol;

			if (!comp._is_alive) {
				return;
			}

			if (comp._on_input_touchstart) {
				comp._on_input_touchstart(this);
			}
		};

		_pInputElement._on_sys_touchmove = function () {
			var comp = this._parent_elem.linkedcontrol;

			if (!comp._is_alive) {
				return;
			}

			if (comp._on_input_touchmove) {
				comp._on_input_touchmove(this);
			}
		};

		_pInputElement._on_sys_touchend = function () {
			var comp = this._parent_elem.linkedcontrol;

			if (!comp._is_alive) {
				return;
			}

			if (comp._on_input_touchend) {
				comp._on_input_touchend(this);
			}
		};

		_pInputElement._on_sys_mouseup = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = this._parent_elem.linkedcontrol;
			if (this._isPreventDefault(comp, "onlbuttonup") || this._isPreventDefault(comp, "onrbuttonup")) {
				this._event_stop = true;
				return;
			}
			if (!comp._is_alive) {
				return;
			}

			if (comp._on_input_mouseup) {
				comp._on_input_mouseup(this, altkey, ctrlkey, shiftkey);
			}
		};

		_pInputElement._on_sys_mousemove = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = this._parent_elem.linkedcontrol;
			if (this._isPreventDefault(comp, "onmousemove")) {
				return;
			}
			if (!comp._is_alive) {
				return;
			}

			comp._on_input_mousemove(this);
		};

		if (nexacro.Browser != "IE" || ((nexacro.Browser == "Edge" || nexacro.Browser == "IE") && nexacro.OSVersion >= 6.0)) {
			if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
				_pInputElement._on_sys_keydown = function (keycode, altkey, ctrlkey, shiftkey) {
					if (!this._parent_elem) {
						return;
					}

					var comp = this._parent_elem.linkedcontrol;

					if (this._isPreventDefault(comp, "onkeydown")) {
						this._event_stop = true;
						return;
					}
					if (!comp._is_alive) {
						return;
					}

					comp._on_input_keydown(this, keycode, altkey, ctrlkey, shiftkey);

					if (keycode == nexacro.Event.KEY_DELETE || keycode == nexacro.Event.KEY_BACKSPACE) {
						if (nexacro.Browser == "Gecko") {
							return;
						}
						comp._on_input_keypress(this, keycode, keycode, altkey, ctrlkey, shiftkey);
					}

					if (keycode == nexacro.Event.KEY_TAB) {
						this._on_sys_keyinput(this);
					}

					this._is_keydown = true;
				};

				_pInputElement._on_sys_keyup = function (keycode, altkey, ctrlkey, shiftkey) {
					this._is_keydown = false;
					if (!this._parent_elem) {
						return;
					}

					var comp = this._parent_elem.linkedcontrol;
					if (this._isPreventDefault(comp, "onkeyup")) {
						return;
					}
					if (!comp._is_alive) {
						return;
					}

					comp._on_input_keyup(this, keycode, altkey, ctrlkey, shiftkey);

					this._accept_keyinput = false;
				};
			}
			else {
				_pInputElement._on_sys_keydown = function (keycode, altkey, ctrlkey, shiftkey) {
					if (!this._parent_elem) {
						return;
					}

					var comp = this._parent_elem.linkedcontrol;

					if (keycode == nexacro.Event.KEY_TAB) {
						this._event_stop = true;
					}

					if (this._isPreventDefault(comp, "onkeydown")) {
						this._event_stop = true;
						return;
					}
					if (!comp._is_alive) {
						return;
					}

					comp._on_input_keydown(this, keycode, altkey, ctrlkey, shiftkey);

					if (keycode == nexacro.Event.KEY_DELETE || keycode == nexacro.Event.KEY_BACKSPACE) {
						if (nexacro.Browser == "Gecko") {
							return;
						}
						comp._on_input_keypress(this, keycode, keycode, altkey, ctrlkey, shiftkey);
					}
				};

				_pInputElement._on_sys_keyup = function (keycode, altkey, ctrlkey, shiftkey) {
					if (!this._parent_elem) {
						return;
					}

					var comp = this._parent_elem.linkedcontrol;
					if (this._isPreventDefault(comp, "onkeyup")) {
						return;
					}
					if (!comp._is_alive) {
						return;
					}

					comp._on_input_keyup(this, keycode, altkey, ctrlkey, shiftkey);
				};
			}
		}
		else {
			_pInputElement._on_sys_keydown = function (keycode, altkey, ctrlkey, shiftkey) {
				if (!this._parent_elem) {
					return;
				}

				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeydown")) {
					this._event_stop = true;
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				if (keycode != 16) {
					this._accept_keyinput = true;
				}

				comp._on_input_keydown(this, keycode, altkey, ctrlkey, shiftkey);

				if (keycode == nexacro.Event.KEY_DELETE || keycode == nexacro.Event.KEY_BACKSPACE) {
					if (nexacro.Browser == "Gecko") {
						return;
					}
					comp._on_input_keypress(this, keycode, keycode, altkey, ctrlkey, shiftkey);
				}

				if (keycode == nexacro.KeyCode_ImeInput || keycode == nexacro.Event.KEY_BACKSPACE || keycode == nexacro.Event.KEY_DELETE) {
					this._on_sys_keyinput(this);
				}
				if (keycode == 18 && altkey == true) {
					this._accept_blur_by_altkey = true;
				}
				else if (keycode != 18 && altkey == true) {
					this._accept_blur_by_altkey = false;
				}
				this._is_keydown = true;
			};

			_pInputElement._on_sys_keyup = function (keycode, altkey, ctrlkey, shiftkey) {
				this._is_keydown = false;

				if (!this._parent_elem) {
					return;
				}

				var comp = this._parent_elem.linkedcontrol;
				if (this._isPreventDefault(comp, "onkeyup")) {
					return;
				}
				if (!comp._is_alive) {
					return;
				}

				comp._on_input_keyup(this, keycode, altkey, ctrlkey, shiftkey);

				if (this._accept_blur_by_altkey == true && document.selection) {
					this._deleteCaret();
					this.setElementBlur();
				}

				this._accept_keyinput = false;
				this._accept_blur_by_altkey = false;
			};
		}

		_pInputElement._on_sys_select = function () {
			var comp = this._parent_elem.linkedcontrol;
			if (!comp._is_alive) {
				return;
			}

			comp._on_input_select(this);
		};

		if (nexacro.Browser == "Gecko") {
			_pInputElement._deleteCaret = function () {
				if (window.getSelection && this._isUseDelCaret) {
					var selection = window.getSelection();
					var comp = this._parent_elem.linkedcontrol;
					var sel = comp.getSelect();

					if (sel[0] == sel[1]) {
						selection.removeAllRanges();
					}
				}
			};
		}
		else {
			_pInputElement._deleteCaret = function () {
				if (document.selection && this._isUseDelCaret) {
					var range = document.selection.createRange();
					begin = 0 - range.duplicate().moveStart('character', -100000);
					end = begin + range.text.length;

					if (begin == end) {
						document.selection.empty();
					}
				}
			};
		}

		_pInputElement._checkInputAutoSelect = function () {
			var comp = this._parent_elem.linkedcontrol;
			if (comp) {
				if (comp.autoselect) {
					return true;
				}
			}
			return false;
		};

		delete _pInputElement;
		_pInputElement = null;

		nexacro.TextAreaElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pTextAreaElement = new nexacro._createPrototype(nexacro.InputElement, nexacro.TextAreaElement);
		nexacro.TextAreaElement.prototype = _pTextAreaElement;

		_pTextAreaElement._type_name = "TextAreaElement";

		_pTextAreaElement.usemultiline = true;

		if (nexacro.Browser == "Chrome") {
			_pTextAreaElement._overflow_scroll_size = 0;
		}
		else {
			_pTextAreaElement._overflow_scroll_size = 17;
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pTextAreaElement._bindEvent = function () {
				var input = this._input_handle;

				nexacro.InputElement.prototype._bindEvent.call(this);

				nexacro._observeSysEvent(input, "scroll", "onscroll", this._inputhandler_onscroll_forward);
			};

			_pTextAreaElement._unBindEvent = function () {
				var input = this._input_handle;
				if (input) {
					nexacro.InputElement.prototype._unBindEvent.call(this);

					nexacro._stopSysObserving(input, "scroll", "onscroll", this._inputhandler_onscroll_forward);
				}
			};

			_pTextAreaElement._inputhandler_onscroll_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}

				var target = evt.srcElement;
				var container = target._linked_element;
				if (container) {
					var comp = container._parent_elem.linkedcontrol;
					var _win = comp._getWindow();

					if (_win && _win._cur_ldown_elem) {
						var elem_scroll_top = container.parent.scroll_top;
						var elem_scroll_left = container.parent.scroll_left;

						var hscrollbar = container.parent._hscroll_control;
						if (hscrollbar && !hscrollbar._is_tracking) {
							hscrollbar.set_pos(target.scrollLeft);
						}

						var vscrollbar = container.parent._vscroll_control;
						if (vscrollbar && !vscrollbar._is_tracking) {
							vscrollbar.set_pos(target.scrollTop);
						}
					}
				}
			};

			if (nexacro.BrowserVersion <= 7) {
				_pTextAreaElement.setElementBlur = function () {
					var input_handle = this._input_handle;
					if (input_handle) {
						nexacro.__setDOMNodeBlur(input_handle);
						nexacro._setDOMNodeRemoveCaret();
					}
				};
			}
		}
		else {
			_pTextAreaElement._bindEvent = function () {
				var input = this._input_handle;

				nexacro.InputElement.prototype._bindEvent.call(this);

				nexacro._observeSysEvent(input, "scroll", "onscroll", this._inputhandler_onscroll_forward);
			};

			_pTextAreaElement._unBindEvent = function () {
				var input = this._input_handle;
				if (input) {
					nexacro.InputElement.prototype._unBindEvent.call(this);

					nexacro._stopSysObserving(input, "scroll", "onscroll", this._inputhandler_onscroll_forward);
				}
			};

			_pTextAreaElement._inputhandler_onscroll_forward = function (evt) {
				var target = evt.target;
				var container = target._linked_element;
				if (container) {
					var comp = container._parent_elem.linkedcontrol;
					var _win = comp._getWindow();

					var pos = container.getElementCaretPos();

					if ((_win && _win._cur_ldown_elem) || (nexacro.isTouchInteraction && (_win && _win._cur_touch_elem || ((pos && pos != -1) && pos.begin != pos.end)))) {
						var elem_scroll_top = container.parent.scroll_top;
						var elem_scroll_left = container.parent.scroll_left;

						if (elem_scroll_left != target.scrollLeft) {
							var hscrollbar = container.parent._hscroll_control;
							if (hscrollbar && !hscrollbar._is_tracking) {
								hscrollbar.set_pos(target.scrollLeft);
							}
						}
						if (elem_scroll_top != target.scrollTop) {
							var vscrollbar = container.parent._vscroll_control;
							if (vscrollbar && !vscrollbar._is_tracking) {
								vscrollbar.set_pos(target.scrollTop);
							}
						}
					}
				}
			};
		}

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			_pTextAreaElement._createInputHandle = function () {
				var elem_handle = this._handle;
				if (elem_handle) {
					var align_style_text = "";
					if (this.halign && this.valign) {
						var text_height = this.getScrollHeight();
						var blank_height = Math.max(0, this.height - text_height);
						align_style_text = nexacro.__getTextAreaHTMLStyleAlignXY(this.halign, this.valign, blank_height);
					}

					var input_attr_str = nexacro.__getTextAreaHTMLAttrEnable(this.enable) + 
						nexacro.__getHTMLAttrReadOnly(this.readonly) + 
						nexacro.__getHTMLAttrTabIndex(this.tabindex) + 
						nexacro.__getHTMLAttrWordWrap(this.wordwrap);
					var input_style_str = nexacro.__getTextAreaHTMLStyleAbsoluteTransparent() + 
						nexacro.__getHTMLStylePos(0, 0) + 
						nexacro.__getHTMLStyleSize(this.width + this._overflow_scroll_size, this.height + this._overflow_scroll_size) + 
						"border:none;outline:none;resize:none;" + 
						nexacro.__getHTMLStyleFont(this.font) + 
						nexacro.__getHTMLStyleColor(this.color) + 
						align_style_text + 
						nexacro.__getHTMLStyleCursor(this.cursor, "text") + 
						nexacro.__getHTMLStyleLineSpace(this.linespace) + 
						nexacro.__getHTMLStyleWordWrap(this.wordwrap) + 
						nexacro.__getHTMLStylemeMode(this.imemode);

					var text = this.text ? nexacro._encodeXml(this.text) : "";
					var id_str = " id='" + this.parent._handle.id + "_textarea'";
					var html = "<textarea " + input_attr_str + id_str + " style='" + input_style_str + "'/>" + text + "</textarea>";

					elem_handle.innerHTML = html;
					var input_handle = elem_handle.firstChild;
					input_handle._linked_element = this;

					if (nexacro._enableaccessibility) {
						nexacro.__setDOMNodeAccessibilityLabelBy(input_handle, "accessibility_notify_0");
						nexacro.__setDOMNodeAccessibilityRole(input_handle, this._parent_elem.accessibility_role);
					}
					;

					return input_handle;
				}
			};

			_pTextAreaElement.setElementSetSelect = function (start, end) {
				var _handle = this._input_handle;
				if (_handle) {
					var _doc = this.getRootWindowHandle();
					end = (typeof end == 'number') ? end : start;
					var value = this.getElementValue();
					if (end == -1) {
						end = _handle.value.length;
						var front_val = value.slice(0, start);
						var rear_val = value.slice(0, end);
						start -= front_val.split('\r\n').length - 1;
						end -= rear_val.split('\r\n').length - 1;
					}

					nexacro.__setTextAreaDOMNodeSetSelect(_doc, _handle, start, end);
				}
			};
		}
		else {
			_pTextAreaElement._createInputHandle = function () {
				var elem_handle = this._handle;
				if (elem_handle) {
					var input_element_name = "textarea";
					var _doc = this._owner_elem.getRootWindowHandle();
					var input_handle = _doc.createElement(input_element_name);
					input_handle._linked_element = this;
					nexacro.__setDOMNodeId(input_handle, this.parent._handle.id, "_" + input_element_name);
					elem_handle.style.webkitUserSelect = "initial";

					if (!this.enable) {
						if (nexacro.OS == "iOS") {
							input_handle.style.opacity = 1;
							input_handle.style.webkitTextFillColor = this.color ? this.color._syscolor : "";
						}
						nexacro.__setTextAreaDOMNodeEnable(input_handle, false);
					}

					if (this.readonly) {
						nexacro.__setDOMNodeReadOnly(input_handle, true);
					}

					if (this.tabindex >= -1) {
						nexacro.__setDOMNodeTabIndex(input_handle, this.tabindex);
					}

					var input_style = input_handle.style;
					input_style.border = "none";
					input_style.outline = "none";
					input_style.resize = "none";

					nexacro.__setTextAreaDOMNodeStyleAbsoluteTransparent(input_style);

					nexacro.__setDOMNodeStylePos(input_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(input_style, this.width + this._overflow_scroll_size, this.height + this._overflow_scroll_size);
					nexacro.__setDOMNodeStyleCursor(input_style, this.cursor, "text");

					if (this.font) {
						nexacro.__setDOMNodeStyleFont(input_style, this.font);
					}

					if (this.letterspace) {
						nexacro.__setDOMNodeStyleLetterSpace(input_style, this.letterspace);
					}

					if (this.color) {
						nexacro.__setDOMNodeStyleColor(input_style, this.color);
					}

					if (this.halign && this.valign) {
						var txt_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
						nexacro.__setInputDOMNodeStyleAlignXY(input_style, this.halign, this.valign, this.height, this.width, txt_size[1]);
					}

					if (this.tabindentsize > 4) {
						nexacro.__setDOMNodeTabIndentSize(input_handle, this.tabindentsize);
					}
					if (this.linespace > 0) {
						nexacro.__setDOMNodeStyleLineSpace(input_style, this.linespace);
					}
					nexacro.__setTextAreaDOMNodeWordWrap(input_handle, this.wordwrap);

					if (this.text) {
						nexacro.__setDOMNodeValue(input_handle, this.text);
					}
					if (this.imemode) {
						nexacro.__setDOMNodeImeMode(input_handle, this.imemode);
					}

					nexacro.__appendDOMNode(elem_handle, input_handle);

					if (nexacro._enableaccessibility) {
						nexacro.__setDOMNodeAccessibilityLabelBy(input_handle, "accessibility_notify_0");
						nexacro.__setDOMNodeAccessibilityRole(input_handle, this._parent_elem.accessibility_role);
					}

					return input_handle;
				}
			};

			_pTextAreaElement.setElementSetSelect = function (start, end) {
				var _handle = this._input_handle;
				if (_handle) {
					var _doc = this.getRootWindowHandle();
					end = (typeof end == 'number') ? (end == -1 ? _handle.value.length : end) : start;

					if (nexacro._checkActiveElement(this)) {
						nexacro.__setTextAreaDOMNodeSetSelect(_doc, _handle, start, end);
					}
				}
			};
		}

		_pTextAreaElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
				}

				_handle = this._input_handle;
				if (_handle) {
					var pos_before = this.getElementCaretPos();

					var offsetwidth = width + this._overflow_scroll_size;
					var offsetheight = height + this._overflow_scroll_size;
					nexacro.__setDOMNodeStyleSize(_handle.style, offsetwidth, offsetheight);

					if (_handle.clientWidth > width || _handle.clientHeight > height) {
						offsetwidth += (width - _handle.clientWidth);
						offsetheight += (height - _handle.clientHeight);
						nexacro.__setDOMNodeStyleSize(_handle.style, offsetwidth, offsetheight);
					}

					var pos_after = this.getElementCaretPos();

					if ((pos_before != -1 && pos_after != -1) && (pos_before.begin != pos_after.begin || pos_before.end != pos_after.end)) {
						this.setElementSetSelect(0, 0);
						this.setElementSetSelect(pos_before.begin, pos_before.end);
					}
				}
				var elem = this._display_elem;
				if (elem) {
					elem.setElementSize(width, height);
				}
			}
		};

		_pTextAreaElement.setElementEnable = function (enable) {
			if (this.enable != enable) {
				this.enable = enable;

				var comp = this._parent_elem.linkedcontrol;
				var input_handle = this._input_handle;
				if (input_handle) {
					nexacro.__setTextAreaDOMNodeEnable(input_handle, enable);

					if (nexacro.OS == "iOS" && comp) {
						var color = comp.on_find_CurrentStyle_color(comp._pseudo);
						if (enable) {
							input_handle.style.opacity = "";
							input_handle.style.webkitTextFillColor = "";
						}
						else {
							input_handle.style.opacity = 1;
							input_handle.style.webkitTextFillColor = color._syscolor;
						}
					}

					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 9) {
						this._isUseDelCaret = enable ? false : true;
						this._deleteCaret();
					}
				}
			}
		};

		_pTextAreaElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;

			var input_handle = this._input_handle;
			if (input_handle) {
				var text_height = this.getScrollHeight();
				var blank_height = Math.max(0, this.height - text_height);
				nexacro.__setTextAreaDOMNodeStyleAlignXY(input_handle.style, this.halign, this.valign, blank_height);
			}
			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementAlign(align);
			}
		};

		_pTextAreaElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;
			var padding = this.padding;

			if (this._isRtl()) {
				_halign = halign == "left" ? "right" : (halign == "right" ? "left" : halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;

			var input_handle = this._input_handle;
			if (input_handle) {
				var text_height = this.getScrollHeight();
				var blank_height = Math.max(0, this.height - text_height);
				nexacro.__setTextAreaDOMNodeStyleAlignXY(input_handle.style, _halign, valign, blank_height, padding);
			}
			var _elem = this._display_elem;
			if (_elem) {
				_elem.setElementAlignXY(_halign, valign);
			}
		};

		_pTextAreaElement.setElementLineSpace = function (linespace) {
			this.linespace = linespace;

			var input_handle = this._input_handle;
			if (input_handle) {
				var comp = this._parent_elem.linkedcontrol;
				if (comp) {
					var font_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
					linespace = font_size[1] + nexacro._toInt(linespace);
				}

				nexacro.__setDOMNodeStyleLineSpace(input_handle.style, linespace);
			}
		};

		_pTextAreaElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _input_handle = this._input_handle;
				if (_input_handle) {
					nexacro.__setDOMNodeStyleLetterSpace(_input_handle.style, letterspace);
				}
			}
		};

		_pTextAreaElement.setElementWordWrap = function (wordwrap) {
			if (wordwrap == true || wordwrap == "true") {
				wordwrap = "char";
			}
			else if (wordwrap == false || wordwrap == "false") {
				wordwrap = "none";
			}

			if (this.wordwrap != wordwrap) {
				this.wordwrap = wordwrap;
				var handle = this._handle;
				var input_handle = this._input_handle;

				if (handle && input_handle) {
					nexacro.__setTextAreaDOMNodeWordWrap(input_handle, this.wordwrap);
					this._updateInputValue();
				}
			}
		};

		_pTextAreaElement.setElementPassword = function (is_password_type) {
		};

		_pTextAreaElement.getElementCaretPos = function () {
			var _handle = this._input_handle;
			var bActive = nexacro._checkActiveElement(this);

			if (_handle && bActive) {
				var _doc = this.getRootWindowHandle();
				return nexacro.__getTextAreaDOMNodeCaretPos(_doc, _handle);
			}
			return -1;
		};

		_pTextAreaElement.getElementSelectionRange = function () {
			var input_handle = this._input_handle;
			var _doc = this.getRootWindowHandle();

			if (input_handle && _doc) {
				var pos = nexacro.__getTextAreaDOMNodeCaretPos(_doc, input_handle);
				return [pos.begin, pos.end];
			}

			return [0, 0];
		};

		_pTextAreaElement.getCaretLine = function () {
			var _handle = this._input_handle;
			if (_handle) {
				var _doc = this.getRootWindowHandle();
				return nexacro.__getDOMNodeCaretLine(_doc, _handle);
			}
			return 0;
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			_pTextAreaElement.getElementValue = function () {
				var input_handle = this._input_handle;
				if (input_handle) {
					var value = nexacro.__getDOMNodeValue(input_handle);
					if (value) {
						value = value.replace(/\r\n/g, "\n");
					}
					return value;
				}
				return "";
			};

			_pTextAreaElement.setElementValue = function (value, bForce, bElementOnly) {
				var input_handle = this._input_handle;
				var comp = this._parent_elem.linkedcontrol;
				var editbase = comp._edit_base_api;

				if (!comp._is_alive) {
					return;
				}

				var bValChange = (this.value === value) ? false : true;
				var bEmpString = (value == "") ? true : false;

				if (value) {
					value = value.replace(/\r\n/g, "\n");
				}

				if (editbase) {
					this.text = editbase._text;
				}
				else {
					this.text = value;
				}

				this.value = value;

				if (bElementOnly) {
					return;
				}

				if (input_handle) {
					var input_value = nexacro.__getDOMNodeValue(input_handle);
					var bTxtChange = (this.text == input_value) ? false : true;

					if (bValChange || bTxtChange || bEmpString || bForce) {
						this._updateInputValue();
					}
				}
			};
		}
		else {
			_pTextAreaElement.getElementValue = function () {
				var input_handle = this._input_handle;
				if (input_handle) {
					return nexacro.__getDOMNodeValue(input_handle);
					;
				}
				return "";
			};

			_pTextAreaElement.setElementValue = function (value, bForce, bElementOnly) {
				var input_handle = this._input_handle;
				var comp = this._parent_elem.linkedcontrol;
				var editbase = comp._edit_base_api;

				if (!comp._is_alive) {
					return;
				}

				var bValChange = (this.value === value) ? false : true;
				var bEmpString = (value == "") ? true : false;

				if (value) {
					value = value.replace(/\r\n/g, "\n");
				}

				if (editbase) {
					this.text = editbase._text;
				}
				else {
					this.text = value;
				}
				this.value = value;

				if (bElementOnly) {
					return;
				}

				if (input_handle) {
					var input_value = nexacro.__getDOMNodeValue(input_handle);
					var bTxtChange = (this.text == input_value) ? false : true;

					if (bValChange || bTxtChange || bEmpString || bForce) {
						this._updateInputValue();
					}
				}
			};
		}

		_pTextAreaElement._is_prevent_enter = false;
		_pTextAreaElement._inputhandler_onkeydown_forward = function (evt) {
			if (application._com_waiting) {
				nexacro._stopSysEvent(evt);
			}
			var node = evt.target || evt.srcElement;

			if (this._is_prevent_enter) {
				if (evt.keyCode == 13 && (evt.altKey || evt.ctrlKey)) {
					evt.preventDefault();
				}
			}

			return nexacro._inputhandler_onkeydown(node, evt);
		};

		delete _pTextAreaElement;
		_pTextAreaElement = null;

		nexacro._inputhandler_onkeyinput = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_keyinput(nexacro._getSysEventKey(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);
				return true;
			}
			return false;
		};

		nexacro._inputhandler_oncopy = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_copy();
				return true;
			}
			return false;
		};

		nexacro._inputhandler_oncut = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_cut();
				return true;
			}
			return false;
		};

		nexacro._inputhandler_onpaste = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_paste();
				return true;
			}
			return false;
		};

		nexacro._inputhandler_oncompositionupdate = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_compositionupdate(evt.data);
				return true;
			}
			return false;
		};

		nexacro._inputhandler_oncompositionend = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_compositionend(evt.data);
				return true;
			}
			return false;
		};

		nexacro._inputhandler_oncompositionstart = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_compositionstart(evt.data);
				return true;
			}
			return false;
		};

		nexacro._inputhandler_onfocus = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				if (nexacro.isTouchInteraction && nexacro.OS == "Android") {
					if (!elem.readonly && node.readOnly) {
						nexacro.__setDOMNodeReadOnly(elem._input_handle, false);
					}
				}

				elem._on_sys_focus();
				return true;
			}
			return false;
		};

		nexacro._inputhandler_onblur = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_blur(node);
				return true;
			}
			return false;
		};

		nexacro._inputhandler_onkeypress = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_keypress(evt.keyCode, evt.charCode, evt.altKey, evt.ctrlKey, evt.shiftKey, evt);
				elem._accept_keyinput = true;

				if (elem._event_stop) {
					elem._event_stop = false;
					nexacro._stopSysEvent(evt);
				}

				return true;
			}
			return false;
		};

		nexacro._inputhandler_onmousedown = function (node, evt) {
			var elem = node._linked_element;
			if (elem && elem._on_sys_mousedown) {
				nexacro._stopPropagation(evt);
				elem._is_mousedown = true;
				var comp = elem._parent_elem.linkedcontrol;
				var _win = comp._getWindow();
				if (_win instanceof nexacro.PopupWindow) {
					_win = _win.parent;
				}
				var __win = _win._handle;
				var id = _win._custom_node_id;
				var sysEvent = application._is_attach_childframe ? __win.nexacro_HTMLSysEvent[id] : __win.nexacro_HTMLSysEvent;

				if (nexacro.isTouchInteraction && nexacro.OS == "Android") {
					if (!elem.readonly && node.readOnly) {
						nexacro.__setDOMNodeReadOnly(elem._input_handle, false);
					}
				}
				evt.id = id;

				if (nexacro.Browser == "Edge" && !elem._checkActiveElement() && comp.autoselect) {
					nexacro._stopSysEvent(evt);
					elem._event_stop = false;
				}

				sysEvent._syshandler_onmousedown_forward(evt);

				var is_seleted = elem._parent_elem.linkedcontrol._edit_base_api._is_selected();

				elem._on_sys_mousedown(evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);

				if (elem._event_stop || (evt.ctrlKey && !is_seleted)) {
					nexacro._stopSysEvent(evt);
					elem._event_stop = false;
				}
				elem._is_mousedown = false;
				return true;
			}
			return false;
		};

		nexacro._inputhandler_onmouseup = function (node, evt) {
			var elem = node._linked_element;
			if (elem && elem._on_sys_mouseup) {
				nexacro._stopPropagation(evt);

				var comp = elem._parent_elem.linkedcontrol;
				var _win = comp._getWindow();
				if (_win instanceof nexacro.PopupWindow) {
					_win = _win.parent;
				}

				var __win = _win._handle;
				var id = _win._custom_node_id;
				var sysEvent = application._is_attach_childframe ? __win.nexacro_HTMLSysEvent[id] : __win.nexacro_HTMLSysEvent;
				elem._useTimer = false;
				elem._on_sys_mouseup(evt.keyCode, evt.altKey, evt.ctrlKey, evt.shiftKey);

				if (elem._useTimer) {
					var copyEvt = {
					};
					if (nexacro.Browser == "IE") {
						for (var attr in evt) {
							copyEvt[attr] = evt[attr];
						}
					}
					else {
						copyEvt = evt;
					}

					nexacro.OnceCallbackTimer.callonce(comp, function () {
						if ((nexacro.Browser != "Edge" && nexacro.Browser != "IE") && nexacro._getSysEventBtnCode(evt) == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
							evt.id = id;
							sysEvent._syshandler_lock_onmouseup_forward(copyEvt);
						}
						else {
							sysEvent._syshandler_onmouseup_forward(copyEvt);
						}
					});
					elem._useTimer = false;
				}
				else {
					if ((nexacro.Browser != "Edge" && nexacro.Browser != "IE") && nexacro._getSysEventBtnCode(evt) == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
						evt.id = id;
						sysEvent._syshandler_lock_onmouseup_forward(evt);
					}
					else {
						sysEvent._syshandler_onmouseup_forward(evt);
					}
				}

				if (elem._event_stop) {
					if (nexacro.Browser != "Edge" && nexacro.Browser != "IE") {
						evt.preventDefault();
						evt.stopped = true;
						elem._event_stop = false;
					}
				}

				return true;
			}
			return false;
		};

		nexacro._inputhandler_onmousemove = function (node, evt) {
			var elem = node._linked_element;
			if (elem && elem._on_sys_mousemove) {
				if ((nexacro.Browser != "Edge" && nexacro.Browser != "IE") && nexacro._getSysEventBtnCode(evt) == nexacro_HTMLSysEvent.MOUSE_LBUTTON) {
					nexacro._stopPropagation(evt);
				}

				var comp = elem._parent_elem.linkedcontrol;
				var _win = comp._getWindow();
				if (_win instanceof nexacro.PopupWindow) {
					_win = _win.parent;
				}

				if (_win._cur_screen_pos.x == evt.screenX && _win._cur_screen_pos.y == evt.screenY) {
					return false;
				}

				var __win = _win._handle;
				var id = _win._custom_node_id;
				var sysEvent = application._is_attach_childframe ? __win.nexacro_HTMLSysEvent[id] : __win.nexacro_HTMLSysEvent;
				if ((nexacro.Browser != "Edge" && nexacro.Browser != "IE") && nexacro._getSysEventBtnCode(evt) == (application._is_attach_childframe ? nexacro_HTMLSysEvent[id].MOUSE_LBUTTON : nexacro_HTMLSysEvent.MOUSE_LBUTTON)) {
					evt.id = id;
					sysEvent._syshandler_lock_onmousemove_forward(evt);
				}

				elem._on_sys_mousemove();

				if (elem._isPreventDefault(comp, "ondrag")) {
					var pos = elem.getElementCaretPos();
					var p = (pos && pos != -1) ? pos.begin : 0;
					if (evt.screenX > elem._prev_x) {
						p = (pos && pos != -1) ? pos.end : 0;
					}
					elem.setElementSetSelect(p, p);
				}
				elem._prev_x = evt.screenX;
				return true;
			}
			return false;
		};


		nexacro._inputhandler_onkeydown = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				nexacro._stopPropagation(evt);
				var comp = elem._parent_elem.linkedcontrol;
				var _win = comp._getWindow();
				if (_win instanceof nexacro.PopupWindow) {
					_win = _win.parent;
				}

				var __win = _win._handle;
				var id = _win._custom_node_id;
				var sysEvent = application._is_attach_childframe ? __win.nexacro_HTMLSysEvent[id] : __win.nexacro_HTMLSysEvent;
				evt.id = id;
				sysEvent._syshandler_onkeydown_forward(evt);

				elem._on_sys_keydown(nexacro._getSysEventKey(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);

				if (elem._event_stop) {
					nexacro._stopSysEvent(evt);
					elem._event_stop = false;
				}
				return true;
			}
			return false;
		};

		nexacro._inputhandler_onkeyup = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				nexacro._stopPropagation(evt);

				var comp = elem._parent_elem.linkedcontrol;
				var _win = comp._getWindow();
				if (_win instanceof nexacro.PopupWindow) {
					_win = _win.parent;
				}

				elem._on_sys_keyup(nexacro._getSysEventKey(evt), evt.altKey, evt.ctrlKey, evt.shiftKey);

				var __win = _win._handle;
				var id = _win._custom_node_id;
				var sysEvent = application._is_attach_childframe ? __win.nexacro_HTMLSysEvent[id] : __win.nexacro_HTMLSysEvent;
				evt.id = id;
				sysEvent._syshandler_onkeyup_forward(evt);

				if (elem._event_stop) {
					nexacro._stopSysEvent(evt);
					elem._event_stop = false;
				}

				return true;
			}
			return false;
		};

		nexacro._inputhandler_onselect = function (node, evt) {
			var elem = node._linked_element;
			if (elem) {
				elem._on_sys_select();
				return true;
			}
			return false;
		};

		nexacro.ControlElementBase = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pControlElementBase = nexacro._createPrototype(nexacro.Element, nexacro.ControlElementBase);
		nexacro.ControlElementBase.prototype = _pControlElementBase;

		_pControlElementBase._type_name = "ControlElementBase";

		_pControlElementBase.enable = true;
		_pControlElementBase.tabindex = -1;
		_pControlElementBase.zindex = -1;
		_pControlElementBase.font = null;
		_pControlElementBase.color = null;
		_pControlElementBase.cursor = null;
		_pControlElementBase.client_left = 0;
		_pControlElementBase.client_top = 0;
		_pControlElementBase.client_width = 0;
		_pControlElementBase.client_height = 0;
		_pControlElementBase.border = null;
		_pControlElementBase.bordertype = null;
		_pControlElementBase.background = null;
		_pControlElementBase.gradation = null;
		_pControlElementBase.opacity = 100;
		_pControlElementBase.padding = null;
		_pControlElementBase.padding_left = 0;
		_pControlElementBase.padding_top = 0;
		_pControlElementBase.padding_right = 0;
		_pControlElementBase.padding_bottom = 0;
		_pControlElementBase.position_step = undefined;
		_pControlElementBase.linkedcontrol = null;

		_pControlElementBase.accessibility_role = "";
		_pControlElementBase.accessibility_enable = false;
		_pControlElementBase.accessibility_label = "";
		_pControlElementBase.accessibility_desclevel = "";
		_pControlElementBase.accessibility_description = "";
		_pControlElementBase.accessibility_action = "";
		_pControlElementBase._accessibility_value = undefined;
		_pControlElementBase._accessibility_stat_disabled = undefined;
		_pControlElementBase._accessibility_stat_hidden = undefined;
		_pControlElementBase._accessibility_stat_checked = undefined;
		_pControlElementBase._accessibility_stat_pressed = undefined;
		_pControlElementBase._accessibility_stat_selected = undefined;
		_pControlElementBase._accessibility_stat_expanded = undefined;
		_pControlElementBase._accessibility_stat_autocomplete = undefined;
		_pControlElementBase._accessibility_flag_haspopup = undefined;
		_pControlElementBase._accessibility_flag_focusable = undefined;
		_pControlElementBase._accessibility_flag_readonly = undefined;
		_pControlElementBase._accessibility_flag_password = undefined;
		_pControlElementBase._accessibility_flag_multiselectable = undefined;
		_pControlElementBase._accessibility_flag_selectable = undefined;
		_pControlElementBase._accessibility_flag_defaultbutton = undefined;
		_pControlElementBase._accessibility_prop_itemcount = undefined;
		_pControlElementBase._accessibility_prop_itemindex = undefined;
		_pControlElementBase._accessibility_prop_valuemax = undefined;
		_pControlElementBase._accessibility_prop_valuemin = undefined;

		_pControlElementBase._dom_border = null;
		_pControlElementBase._inner_left = 0;
		_pControlElementBase._inner_top = 0;
		_pControlElementBase._inner_width = 0;
		_pControlElementBase._inner_height = 0;
		_pControlElementBase._node_width = 0;
		_pControlElementBase._node_height = 0;
		_pControlElementBase._background_style = 0;
		_pControlElementBase._node_opacity_str = "";
		_pControlElementBase._node_opacity = 100;
		_pControlElementBase._node_bkcolor = "";
		_pControlElementBase._node_gradation = "";
		_pControlElementBase._node_bkurl = "";
		_pControlElementBase._node_bkrepeat = "";
		_pControlElementBase._node_bkpos = "";

		_pControlElementBase._client_element = null;
		_pControlElementBase._vml_elem = null;
		_pControlElementBase._bkimg_elem = null;

		_pControlElementBase.create = nexacro._emptyFn;
		_pControlElementBase.destroy = nexacro._emptyFn;
		_pControlElementBase.clearContents = nexacro._emptyFn;

		_pControlElementBase.setElementStepCount = nexacro._emptyFn;
		_pControlElementBase.setElementStepIndex = nexacro._emptyFn;

		_pControlElementBase.setLinkedControl = function (control) {
			if (!this.linkedcontrol && control) {
				this.parent = control;
				this.linkedcontrol = control;
			}
		};

		_pControlElementBase.setElementPositionBasis = function (position) {
			if (this.position != position) {
				this.position = position;

				if (this._handle) {
					if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
						if (position.toLowerCase() == "fixed") {
							nexacro.__setDOMNodeStyleFixed(this._handle.style);
						}
						else {
							nexacro.__setDOMNodeStyleAbsolute(this._handle.style);
						}
					}
				}
			}
		};

		_pControlElementBase.setElementPositionBasis = function (position) {
			if (this.position != position) {
				this.position = position;

				if (this._handle) {
					if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
						if (position.toLowerCase() == "fixed") {
							nexacro.__setDOMNodeStyleFixed(this._handle.style);
						}
						else {
							nexacro.__setDOMNodeStyleAbsolute(this._handle.style);
						}
					}
				}
			}
		};

		_pControlElementBase.setElementPositionStep = function (position_step) {
			if (this.position_step != position_step || position_step == -1) {
				this.position_step = position_step;

				var _handle = this._handle;
				if (_handle && this._parent_elem) {
					var old_owner_elem = this._owner_elem;
					var _owner_elem = this._parent_elem.getContainerElement(position_step);
					if (old_owner_elem && old_owner_elem._dest_handle && _owner_elem && _owner_elem._dest_handle) {
						nexacro.__unlinkDOMNode(old_owner_elem._dest_handle, this._handle);
						nexacro.__appendDOMNode(_owner_elem._dest_handle, this._handle);
						this._owner_elem = _owner_elem;
					}
				}
			}
		};

		_pControlElementBase.setElementEnable = function (enable) {
			if (this.enable != enable) {
				this.enable = enable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeEnable(_handle, enable);
				}
			}
		};

		_pControlElementBase.setElementTabIndex = function (tabindex) {
			if (this.tabindex != tabindex) {
				this.tabindex = tabindex;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeTabIndex(_handle, tabindex);
				}
			}
		};

		_pControlElementBase.setElementZIndex = function (zindex) {
			if (this.zindex != zindex) {
				this.zindex = zindex;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleZindex(_handle.style, zindex);
				}
			}
		};

		_pControlElementBase.setElementFont = nexacro._emptyFn;

		_pControlElementBase.setElementColor = function (color) {
			this.color = color;
			var _handle = this._handle;
			if (this._client_element) {
				this._client_element.setElementColor(color);
			}
		};

		_pControlElementBase.setElementCursor = function (cursor) {
			this.cursor = cursor;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeStyleCursor(_handle.style, cursor);
			}
		};

		_pControlElementBase.setElementToolTip = function (tooltiptext, tooltiptype) {
			if (tooltiptext === undefined) {
				tooltiptext = "";
			}
			if (this.tooltiptext != tooltiptext || this.tooltiptype != tooltiptype) {
				this.tooltiptext = tooltiptext;
				this.tooltiptype = tooltiptype;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeToolTip(_handle, tooltiptext, tooltiptype);
				}
			}
		};

		_pControlElementBase.setElementShadow = function (shadow) {
			this.shadow = shadow;
			var _handle = this._handle;
			if (_handle) {
				var _shadow = shadow ? shadow._getStyleObject(this._isRtl()) : null;

				nexacro.__setDOMNodeStyleShadow(_handle.style, _shadow);
			}
		};

		_pControlElementBase.setElementFocus = function (selffocus) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeFocus(_handle, selffocus);
				nexacro.__setLastFocusedElement(this);
			}
		};

		_pControlElementBase.setElementOpacity = function (opacity) {
			this.opacity = opacity;
			var _handle = this._handle;
			if (_handle) {
				this._setControlOpacity(this, _handle, (parseInt(opacity.value)));
			}
		};

		_pControlElementBase.setElementAlign = nexacro._emptyFn;
		_pControlElementBase.setElementAlignXY = nexacro._emptyFn;

		_pControlElementBase.setElementPadding = nexacro._emptyFn;
		_pControlElementBase.setElementPaddingXY = nexacro._emptyFn;

		_pControlElementBase.setElementHittestType = nexacro._emptyFn;

		_pControlElementBase.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				this._setControlSize(this, this._handle, width, height);
				this._updateClientSize();
			}
		};

		_pControlElementBase.setElementBorder = function (border, bordertype) {
			var bRtl = this._isRtl();

			var _border = border;
			var _bordertype = bordertype;

			_border = border ? border._getStyleObject(bRtl ^ this.mirror) : null;
			_bordertype = bordertype ? bordertype._getStyleObject(bRtl) : null;

			this.border = border;
			this.bordertype = bordertype;
			this._setControlBorder(this, this._handle, _border, _bordertype);
			this._updateClientSize();
		};

		_pControlElementBase.setElementBackground = function (background, gradation) {
			this.background = background;
			this.gradation = gradation;

			var bRtl = this._isRtl();
			var _gradation = gradation;

			_gradation = gradation ? gradation._getStyleObject(bRtl) : null;
			this._setControlBackground(this, this._handle, background, _gradation);
		};

		_pControlElementBase.setElementAccessibilityRole = function (role) {
			var accrole = nexacro._roleList[role];
			if (this.accessibility_role != accrole) {
				this.accessibility_role = accrole;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityRole(_handle, accrole);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityLabel = function (label) {
			if (this.accessibility_label != label) {
				this.accessibility_label = label;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityLabel(_handle, label);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityEnable = function (enable) {
			if (this.accessibility_enable != enable) {
				this.accessibility_enable = enable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityEnable(_handle, enable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityDescription = function (desc) {
			if (this.accessibility_description != desc) {
				this.accessibility_description = desc;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityDescription(_handle, desc);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityDescLevel = function (desclevel) {
		};

		_pControlElementBase.setElementAccessibilityAction = function (action) {
			this.accessibility_action = action;
		};

		_pControlElementBase.setElementAccessibilityValue = function (value, input, bfocus) {
			if (this._accessibility_value != value) {
				this._accessibility_value = value;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityValue(_handle, value, input, bfocus);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatDisabled = function (disabled) {
			if (this._accessibility_stat_disabled != disabled) {
				this._accessibility_stat_disabled = disabled;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatDisabled(_handle, disabled);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatHidden = function (hidden) {
			if (this._accessibility_stat_hidden != hidden) {
				this._accessibility_stat_hidden = hidden;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatHidden(_handle, hidden);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityHidden = function (hidden) {
			if (this._client_element) {
				var _handle = this._client_element._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityHidden(_handle, hidden);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatChecked = function (checked) {
			if (this._accessibility_stat_checked != checked) {
				this._accessibility_stat_checked = checked;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatChecked(_handle, checked);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatPressed = function (pressed) {
			if (this._accessibility_stat_pressed != pressed) {
				this._accessibility_stat_pressed = pressed;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatPressed(_handle, pressed);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatSelected = function (selected) {
			if (this._accessibility_stat_selected != selected) {
				this._accessibility_stat_selected = selected;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatSelected(_handle, selected);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatExpanded = function (expanded) {
			if (this._accessibility_stat_expanded != expanded) {
				this._accessibility_stat_expanded = expanded;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatExpanded(_handle, expanded);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatAutoComplete = function (autocomplete) {
			if (this._accessibility_stat_autocomplete != autocomplete) {
				this._accessibility_stat_autocomplete = autocomplete;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatAutoComplete(_handle, autocomplete);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagHasPopup = function (haspopup) {
			if (this._accessibility_flag_haspopup != haspopup) {
				this._accessibility_flag_haspopup = haspopup;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityStatHasPopup(_handle, haspopup);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagFocusable = function (focusable) {
			if (this._accessibility_flag_focusable != focusable) {
				this._accessibility_flag_focusable = focusable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagFocusable(_handle, focusable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagReadOnly = function (readonly) {
			if (this._accessibility_flag_readonly != readonly) {
				this._accessibility_flag_readonly = readonly;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagReadOnly(_handle, readonly);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagPassword = function (password) {
			if (this._accessibility_flag_password != password) {
				this._accessibility_flag_password = password;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagPassword(_handle, password);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagMultiSelectable = function (multiselectable) {
			if (this._accessibility_flag_multiselectable != multiselectable) {
				this._accessibility_flag_multiselectable = multiselectable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagMultiSelectable(_handle, multiselectable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagSelectable = function (selectable) {
			if (this._accessibility_flag_selectable != selectable) {
				this._accessibility_flag_selectable = selectable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagSelectable(_handle, selectable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagDefaultButton = function (defaultbutton) {
			if (this._accessibility_flag_defaultbutton != defaultbutton) {
				this._accessibility_flag_defaultbutton = defaultbutton;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagDefaultButton(_handle, defaultbutton);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagMultiLine = function (multiline) {
			if (this._accessibility_flag_multiline != multiline) {
				this._accessibility_flag_multiline = multiline;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityFlagMultiLine(_handle, multiline);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoCount = function (count) {
			if (this._accessibility_prop_infocount != count) {
				this._accessibility_prop_infocount = count;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityInfoCount(_handle, count);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoIndex = function (index) {
			if (this._accessibility_prop_infoindex != index) {
				this._accessibility_prop_infoindex = index;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityInfoIndex(_handle, index);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoValueMax = function (valuemax) {
			if (this._accessibility_prop_infovaluemax != valuemax) {
				this._accessibility_prop_infovaluemax = valuemax;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityInfoValueMax(_handle, valuemax);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoValueMin = function (valuemin) {
			if (this._accessibility_prop_infovaluemin != valuemin) {
				this._accessibility_prop_infovaluemin = valuemin;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityInfoValueMin(_handle, valuemin);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoValueCur = function (valuecur) {
			if (this._accessibility_prop_infovaluecur != valuecur) {
				this._accessibility_prop_infovaluecur = valuecur;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityInfoValueCur(_handle, valuecur);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoLevel = function (level) {
			if (this._accessibility_prop_infolevel != level) {
				this._accessibility_prop_infolevel = level;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityInfoLevel(_handle, level);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityHotKey = function (hotkey) {
			if (this._accessibility_prop_hotkey != hotkey) {
				this._accessibility_prop_hotkey = hotkey;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeAccessibilityHotKey(_handle, hotkey);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityActiveDescendant = function (activedescendant_elem) {
			this._accessibility_prop_activedescendant = activedescendant_elem.linkedcontrol._unique_id;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeAccessibilityActiveDescendant(_handle, activedescendant_elem.linkedcontrol._unique_id);
			}
		};

		_pControlElementBase.setElementAccessibilityStatFocus = function (label) {
			var notifyvalue;
			if (label) {
				notifyvalue = label;
			}
			else {
				var readlabel = this._makeAccessibilityLabelbyReadtype(this);
				this.accessibility_readlabel = readlabel;
				notifyvalue = readlabel;
			}

			var _handle = this._handle;
			if (_handle) {
				nexacro.__notifyAccessibility(_handle, notifyvalue, "focus");
			}
		};

		_pControlElementBase.setElementAccessibilityNotifyEvent = nexacro._emptyFn;


		_pControlElementBase._refreshForeground = function (_handle, handle_style) {
			var bRtl = this._isRtl();

			if (!this.visible) {
				nexacro.__setDOMNodeStyleVisible(handle_style, false);
			}
			if (!this.enable) {
				nexacro.__setDOMNodeEnable(_handle, false);
			}
			if (this.tabindex >= -1) {
				nexacro.__setDOMNodeTabIndex(_handle, this.tabindex);
			}
			if (this.zindex >= 0) {
				nexacro.__setDOMNodeStyleZindex(handle_style, this.zindex);
			}
			if (this.cursor) {
				nexacro.__setDOMNodeStyleCursor(handle_style, this.cursor);
			}
			if (this.tooltiptext) {
				nexacro.__setDOMNodeToolTip(_handle, this.tooltiptext, this.tooltiptype);
			}
			if (this.shadow) {
				var _shadow = this.shadow._getStyleObject(bRtl);
				nexacro.__setDOMNodeStyleShadow(handle_style, _shadow);
			}
			if (this.opacity) {
				this._setControlOpacity(this, this._handle, (parseInt(this.opacity.value)));
			}


			if (nexacro._enableaccessibility) {
				if (this.accessibility_role) {
					nexacro.__setDOMNodeAccessibilityRole(_handle, this.accessibility_role);
				}

				if (this.accessibility_enable) {
					if (this.accessibility_enable) {
						nexacro.__setDOMNodeAccessibilityEnable(_handle, this.accessibility_enable);
					}
					if (this.accessibility_desclevel) {
						nexacro.__setDOMNodeAccessibilityDescLevel(_handle, this.accessibility_desclevel);
					}
					if (this.accessibility_description) {
						nexacro.__setDOMNodeAccessibilityDescription(_handle, this.accessibility_description);
					}
					var readlabel = this._makeAccessibilityLabelbyReadtype(this);
					if (readlabel != this.accessibility_readlabel) {
						this.accessibility_readlabel = readlabel;
						nexacro.__setDOMNodeAccessibilityLabel(_handle, this.accessibility_readlabel);
					}
				}
				else {
					nexacro.__setDOMNodeAccessibilityEnable(_handle, this.accessibility_enable);
				}

				if (this._accessibility_value) {
					nexacro.__setDOMNodeAccessibilityValue(_handle, this._accessibility_value);
				}

				if (this._accessibility_stat_disabled) {
					nexacro.__setDOMNodeAccessibilityStatDisabled(_handle, this._accessibility_stat_disabled);
				}
				if (this._accessibility_stat_hidden) {
					nexacro.__setDOMNodeAccessibilityStatHidden(_handle, this._accessibility_stat_hidden);
				}
				if (this._accessibility_stat_checked) {
					nexacro.__setDOMNodeAccessibilityStatChecked(_handle, this._accessibility_stat_checked);
				}

				if (this._accessibility_stat_pressed) {
					nexacro.__setDOMNodeAccessibilityStatPressed(_handle, this._accessibility_stat_pressed);
				}
				if (this._accessibility_stat_selected) {
					nexacro.__setDOMNodeAccessibilityStatSelected(_handle, this._accessibility_stat_selected);
				}
				if (this._accessibility_stat_expanded) {
					nexacro.__setDOMNodeAccessibilityStatExpanded(_handle, this._accessibility_stat_expanded);
				}
				if (this._accessibility_stat_autocomplete) {
					nexacro.__setDOMNodeAccessibilityStatAutoComplete(_handle, this._accessibility_stat_autocomplete);
				}

				if (this._accessibility_flag_haspopup) {
					nexacro.__setDOMNodeAccessibilityStatHasPopup(_handle, this._accessibility_flag_haspopup);
				}
				if (this._accessibility_flag_focusable) {
					nexacro.__setDOMNodeAccessibilityFlagFocusable(_handle, this._accessibility_flag_focusable);
				}
				if (this._accessibility_flag_readonly) {
					nexacro.__setDOMNodeAccessibilityFlagReadOnly(_handle, this._accessibility_flag_readonly);
				}

				if (this._accessibility_flag_password) {
					nexacro.__setDOMNodeAccessibilityFlagPassword(_handle, this._accessibility_flag_password);
				}
				if (this._accessibility_flag_multiselectable) {
					nexacro.__setDOMNodeAccessibilityFlagMultiSelectable(_handle, this._accessibility_flag_multiselectable);
				}
				if (this._accessibility_flag_selectable) {
					nexacro.__setDOMNodeAccessibilityFlagSelectable(_handle, this._accessibility_flag_selectable);
				}
				if (this._accessibility_flag_defaultbutton) {
					nexacro.__setDOMNodeAccessibilityFlagDefaultButton(_handle, this._accessibility_flag_defaultbutton);
				}
				if (this._accessibility_flag_multiline) {
					nexacro.__setDOMNodeAccessibilityFlagMultiLine(_handle, this._accessibility_flag_multiline);
				}

				if (this._accessibility_prop_itemcount) {
					nexacro.__setDOMNodeAccessibilityInfoCount(_handle, this._accessibility_prop_itemcount);
				}
				if (this._accessibility_prop_itemindex) {
					nexacro.__setDOMNodeAccessibilityInfoIndex(_handle, this._accessibility_prop_itemindex);
				}

				if (this._accessibility_prop_valuemax) {
					nexacro.__setDOMNodeAccessibilityInfoValueMax(_handle, this._accessibility_prop_valuemax);
				}
				if (this._accessibility_prop_valuemin) {
					nexacro.__setDOMNodeAccessibilityInfoValueMin(_handle, this._accessibility_prop_valuemin);
				}
			}
		};


		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			_pControlElementBase._refreshVMLContainerElement = function (control_elem, target_elem) {
				if (control_elem && target_elem && control_elem._dest_handle && target_elem._dest_handle && control_elem._client_element && control_elem._client_element._dest_handle) {
					var target_owner_elem = target_elem._owner_elem;
					nexacro.__unlinkDOMNode(control_elem._handle, target_elem._dest_handle);
					nexacro.__insertDOMNode(control_elem._dest_handle, target_elem._dest_handle, control_elem._client_element._dest_handle);
					target_elem._owner_elem = target_owner_elem;
					return true;
				}
				return false;
			};


			_pControlElementBase._setControlOpacity = function (element, _handle, sysopacity) {
				var filter_str = "";
				if (sysopacity < 0) {
					sysopacity = 0;
				}
				if (sysopacity < 100) {
					filter_str = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + sysopacity + ")";
				}

				if (this._node_opacity_str != filter_str) {
					this._node_opacity_str = filter_str;
					if (_handle) {
						var handle_style = _handle.style;
						nexacro.__setDOMNodeStyleForceVisibility(handle_style, true);
						if (filter_str) {
							if (this._node_gradation) {
								handle_style.filter = this._node_gradation + ' ' + filter_str;
							}
							else {
								handle_style.filter = filter_str;
							}
						}
						else {
							if (this._node_gradation) {
								handle_style.filter = this._node_gradation;
							}
							else {
								handle_style.filter = "";
							}
						}
						nexacro.__setDOMNodeStyleVisible(handle_style, this.visible);
					}
				}
			};

			if ((nexacro.BrowserVersion <= 6 || nexacro.checkDocument.quirksMode)) {
				_pControlElementBase._setControlSize = function (element, _handle, width, height) {
					var inner_width = width;
					var inner_height = height;

					var border = this.border;
					if (border && !border._is_real_empty()) {
						inner_width = width - border._getBorderWidth();
						inner_height = height - border._getBorderHeight();
						if (inner_width < 0) {
							inner_width = 0;
						}
						if (inner_height < 0) {
							inner_height = 0;
						}
					}

					if (this._node_width != width || this._node_height != height) {
						this._node_width = width;
						this._node_height = height;
						if (_handle) {
							nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
						}
					}
					if (this._inner_width != inner_width || this._inner_height != inner_height) {
						this._inner_width = inner_width;
						this._inner_height = inner_height;

						var background_elem = this._bkimage_elem;
						if (background_elem) {
							background_elem.setElementSize(inner_width, inner_height);
						}
					}
				};
			}
			else {
				_pControlElementBase._setControlSize = function (element, _handle, width, height) {
					var inner_width = width;
					var inner_height = height;

					var border = this.border;
					if (border && !border._is_real_empty()) {
						inner_width = width - border._getBorderWidth();
						inner_height = height - border._getBorderHeight();

						if (inner_width < 0) {
							inner_width = 0;
						}
						if (inner_height < 0) {
							inner_height = 0;
						}
					}

					if (this._inner_width != inner_width || this._inner_height != inner_height) {
						this._node_width = this._inner_width = inner_width;
						this._node_height = this._inner_height = inner_height;

						if (_handle) {
							nexacro.__setDOMNodeStyleSize(_handle.style, inner_width, inner_height);
						}

						var background_elem = this._bkimage_elem;
						if (background_elem) {
							background_elem.setElementSize(inner_width, inner_height);
						}
					}
				};
			}

			if ((nexacro.BrowserVersion <= 6 || nexacro.checkDocument.quirksMode)) {
				_pControlElementBase._isVML = function () {
					if (this._vml_elem) {
						return true;
					}
					return false;
				};

				_pControlElementBase._setControlBorder = function (element, _handle, border, bordertype) {
					var width = element.width;
					var height = element.height;

					var inner_left = 0;
					var inner_top = 0;
					var inner_width = width;
					var inner_height = height;

					var usevml = application.usevml;

					var round = false;
					if (bordertype && bordertype._isRound()) {
						round = true;
					}

					if (border && !border._is_real_empty()) {
						if (usevml && round) {
							inner_left = border._left_width;
							inner_top = border._top_width;
						}
						inner_width = width - border._getBorderWidth();
						inner_height = height - border._getBorderHeight();
						if (inner_width < 0) {
							inner_width = 0;
						}
						if (inner_height < 0) {
							inner_height = 0;
						}
					}

					var handle_style = (_handle ? _handle.style : null);
					var vml_elem = this._vml_elem;
					if (usevml && round) {
						if (this._dom_border) {
							this._dom_border = null;
							if (_handle) {
								nexacro.__setDOMNodeStyleBorder(_handle.style, null);
							}
						}
						this._clearDOMBackgroundOnly(_handle);

						if (vml_elem) {
							vml_elem.setElementSize(element.width, element.height);
							vml_elem.setVMLBorder(bordertype, border);
							this._vml_elem = vml_elem;
							if (this.background) {
								this._setControlBackground(element, _handle, this.background, this.gradation);
							}
						}
						else {
							vml_elem = new nexacro._VMLContainerElement(element);
							vml_elem.setElementSize(element.width, element.height);
							vml_elem.setVMLBorder(bordertype, border);
							this._vml_elem = vml_elem;
							this._setControlBackground(element, _handle, this.background, this.gradation);
							if (_handle) {
								var before_node = _handle.firstChild;
								vml_elem.create(before_node);
							}
						}
					}
					else {
						if (this._dom_border != border) {
							this._dom_border = border;
							if (_handle) {
								nexacro.__setDOMNodeStyleBorder(_handle.style, border);
							}
						}
						if (vml_elem) {
							vml_elem.destroy();
							vml_elem = null;
							this._vml_elem = vml_elem;
							this._setControlBackground(element, _handle, this.background, this.gradation);
						}
					}

					var ischangedpos = this._inner_left != inner_left || this._inner_top != inner_top;
					var ischangedsize = this._inner_width != inner_width || this._inner_height != inner_height;
					var background_elem = this._bkimage_elem;

					if (ischangedpos) {
						this._inner_left = inner_left;
						this._inner_top = inner_top;
						if (background_elem) {
							background_elem.setElementPosition(inner_left, inner_top);
						}
					}
					if (ischangedsize) {
						this._inner_width = inner_width;
						this._inner_height = inner_height;
						if (background_elem) {
							background_elem.setElementSize(inner_width, inner_height);
						}
					}
				};
			}
			else {
				_pControlElementBase._isVML = function () {
					if (this._vml_elem) {
						return true;
					}
					return false;
				};

				_pControlElementBase._setControlBorder = function (element, _handle, border, bordertype) {
					var width = element.width;
					var height = element.height;

					var inner_left = 0;
					var inner_top = 0;
					var inner_width = width;
					var inner_height = height;

					var usevml = application.usevml;

					var round = false;
					if (bordertype && bordertype._isRound()) {
						round = true;
					}

					if (border && !border._is_real_empty()) {
						if (usevml && round) {
							inner_left = border._left_width;
							inner_top = border._top_width;
						}
						inner_width = width - border._getBorderWidth();
						inner_height = height - border._getBorderHeight();
						if (inner_width < 0) {
							inner_width = 0;
						}
						if (inner_height < 0) {
							inner_height = 0;
						}
					}

					var vml_elem = this._vml_elem;
					if (usevml && round) {
						if (this._node_width != width || this._node_height != height) {
							this._node_width = width;
							this._node_height = height;
							if (_handle) {
								nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
							}
						}

						if (this._dom_border) {
							this._dom_border = null;
							if (_handle) {
								nexacro.__setDOMNodeStyleBorder(_handle.style, null);
							}
						}
						this._clearDOMBackgroundOnly(_handle);

						if (vml_elem) {
							vml_elem.setElementSize(element.width, element.height);
							vml_elem.setVMLBorder(bordertype, border);
							this._vml_elem = vml_elem;
							if (this.background) {
								this._setControlBackground(element, _handle, this.background, this.gradation);
							}
						}
						else {
							vml_elem = new nexacro._VMLContainerElement(element);
							vml_elem.setElementSize(element.width, element.height);
							vml_elem.setVMLBorder(bordertype, border);
							this._vml_elem = vml_elem;
							this._setControlBackground(element, _handle, this.background, this.gradation);
							if (_handle) {
								var before_node = _handle.firstChild;
								vml_elem.create(before_node);
							}
						}
					}
					else {
						if (this._node_width != inner_width || this._node_height != inner_height) {
							this._node_width = inner_width;
							this._node_height = inner_height;
							if (_handle) {
								nexacro.__setDOMNodeStyleSize(_handle.style, inner_width, inner_height);
							}
						}

						if (this._dom_border != border) {
							this._dom_border = border;
							if (_handle) {
								nexacro.__setDOMNodeStyleBorder(_handle.style, border);
							}
						}

						if (vml_elem) {
							vml_elem.destroy();
							vml_elem = null;
							this._vml_elem = vml_elem;
							this._setControlBackground(element, _handle, this.background, this.gradation);
						}
					}

					var ischangedpos = this._inner_left != inner_left || this._inner_top != inner_top;
					var ischangedsize = this._inner_width != inner_width || this._inner_height != inner_height;
					var background_elem = this._bkimage_elem;

					if (ischangedpos) {
						this._inner_left = inner_left;
						this._inner_top = inner_top;
						if (background_elem) {
							background_elem.setElementPosition(inner_left, inner_top);
						}
					}
					if (ischangedsize) {
						this._inner_width = inner_width;
						this._inner_height = inner_height;
						if (background_elem) {
							background_elem.setElementSize(inner_width, inner_height);
						}
					}
				};
			}

			_pControlElementBase._setDOMBackgroundOnly = function (_handle, syscolor, sysgradation) {
				if (_handle) {
					var handle_style = _handle ? _handle.style : null;

					if (this._node_bkcolor != syscolor) {
						this._node_bkcolor = syscolor;
						handle_style.backgroundColor = (syscolor ? syscolor : "transparent");
					}
					if (this._node_gradation != sysgradation) {
						this._node_gradation = sysgradation;
						nexacro.__setDOMNodeStyleForceVisibility(handle_style, true);
						if (sysgradation) {
							if (this._node_opacity_str) {
								handle_style.filter = sysgradation + ' ' + this._node_opacity_str;
							}
							else {
								handle_style.filter = sysgradation;
							}
						}
						else {
							if (this._node_opacity_str) {
								handle_style.filter = this._node_opacity_str;
							}
							else {
								handle_style.filter = "";
							}
						}
						nexacro.__setDOMNodeStyleVisible(handle_style, this.visible);
					}
					if (this._node_bkurl) {
						this._node_bkurl = "";
						this._node_bkrepeat = "";
						this._node_bkpos = "";
						handle_style.backgroundImage = "";
					}
				}
				else {
					this._node_bkcolor = syscolor;
					this._node_gradation = sysgradation;
					this._node_bkurl = "";
					this._node_bkrepeat = "";
					this._node_bkpos = "";
				}
			};

			_pControlElementBase._setDOMBackground = function (_handle, syscolor, sysgradation, url, repeat, posx, posy) {
				var bkpos = posx + "% " + posy + "%";
				if (repeat == "") {
					repeat = "no-repeat";
				}
				syscolor = (syscolor ? syscolor : "transparent");

				if (_handle) {
					var handle_style = _handle.style;
					if (this._node_bkcolor != syscolor) {
						this._node_bkcolor = syscolor;
						handle_style.backgroundColor = syscolor;
					}
					if (this._node_gradation != sysgradation) {
						this._node_gradation = sysgradation;
						nexacro.__setDOMNodeStyleForceVisibility(handle_style, true);
						if (sysgradation) {
							if (this._node_opacity_str) {
								handle_style.filter = sysgradation + ' ' + this._node_opacity_str;
							}
							else {
								handle_style.filter = sysgradation;
							}
						}
						else {
							if (this._node_opacity_str) {
								handle_style.filter = this._node_opacity_str;
							}
							else {
								handle_style.filter = "";
							}
						}
						nexacro.__setDOMNodeStyleVisible(handle_style, this.visible);
					}

					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
						if (this.linkedcontrol._is_subcontrol == true && syscolor == "transparent" && url == "") {
							url = null;
						}
					}

					if (this._background_style != 0 || this._node_bkurl != url || this._node_bkrepeat != repeat || this._node_bkpos != bkpos) {
						this._node_bkurl = url;
						this._node_bkrepeat = repeat;
						this._node_bkpos = bkpos;

						if (this._bkimage_elem) {
							this._bkimage_elem.destroy();
							this._bkimage_elem = null;
							this._background_style = 0;
						}

						if (url) {
							var url2 = "url(" + url + ")";
							handle_style.backgroundImage = url2;
							handle_style.backgroundRepeat = repeat;
							handle_style.backgroundPosition = bkpos;
						}
						else {
							handle_style.backgroundImage = "";
						}
					}
				}
				else {
					if (nexacro.Browser == "IE" && nexacro.BrowserVersion == 8) {
						if (this.linkedcontrol._is_subcontrol == true && syscolor == "transparent" && url == "") {
							url = null;
						}
					}

					this._node_bkcolor = syscolor;
					this._node_gradation = sysgradation;
					this._node_bkurl = url;
					this._node_bkrepeat = repeat;
					this._node_bkpos = bkpos;

					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
						this._bkimage_elem = null;
						this._background_style = 0;
					}
				}
			};

			_pControlElementBase._clearDOMBackgroundOnly = function (_handle) {
				if (_handle) {
					var handle_style = _handle.style;
					if (this._node_bkcolor) {
						this._node_bkcolor = "";
						handle_style.backgroundColor = "transparent";
					}
					if (this._node_gradation) {
						this._node_gradation = "";
						nexacro.__setDOMNodeStyleForceVisibility(handle_style, true);
						if (this._node_opacity_str) {
							handle_style.filter = this._node_opacity_str;
						}
						else {
							handle_style.filter = "";
						}
						nexacro.__setDOMNodeStyleVisible(handle_style, this.visible);
					}
					if (this._node_bkurl) {
						this._node_bkurl = "";
						this._node_bkrepeat = "";
						this._node_bkpos = "";
						handle_style.backgroundImage = "";
					}
				}
				else {
					this._node_bkcolor = "";
					this._node_gradation = "";
					this._node_bkurl = "";
					this._node_bkrepeat = "";
					this._node_bkpos = "";
				}
			};

			_pControlElementBase._clearDOMBackground = function (_handle) {
				if (_handle) {
					var handle_style = _handle.style;
					if (this._node_bkcolor) {
						this._node_bkcolor = "";
						handle_style.backgroundColor = "transparent";
					}
					if (this._node_gradation) {
						this._node_gradation = "";
						nexacro.__setDOMNodeStyleForceVisibility(handle_style, true);
						if (this._node_opacity_str) {
							handle_style.filter = this._node_opacity_str;
						}
						else {
							handle_style.filter = "";
						}
						nexacro.__setDOMNodeStyleVisible(handle_style, this.visible);
					}

					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
						this._bkimage_elem = null;
						this._background_style = 0;
					}

					if (this._node_bkurl) {
						this._node_bkurl = "";
						this._node_bkrepeat = "";
						this._node_bkpos = "";
						this._background_style = 0;
						handle_style.backgroundImage = "";
					}
				}
				else {
					this._node_bkcolor = "";
					this._node_gradation = "";

					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
						this._bkimage_elem = null;
						this._background_style = 0;
					}

					this._node_bkurl = "";
					this._node_bkrepeat = "";
					this._node_bkpos = "";
					this._background_style = 0;
				}
			};

			_pControlElementBase._setControlBackground = function (element, _handle, background, gradation, notusevml) {
				if (background) {
					var bkgradation = "";
					var bkcolor = background._syscolor;
					var bkimgurl = background.image;
					var bkrepeat = background.repeat;
					var pos_x = background.position_x;
					var pos_y = background.position_y;
					var edge_x = background.imageedge_x;
					var edge_y = background.imageedge_y;
					var vml_elem = this._vml_elem;
					var usevml = application.usevml;

					if (notusevml) {
						usevml = false;
					}

					bkimgurl = nexacro._getURIValue(bkimgurl);

					if (bkimgurl && !nexacro._isAbsolutePath(bkimgurl)) {
						var base_url = this._getElementBaseUrl();
						bkimgurl = nexacro._getImageLocation(bkimgurl, base_url);
					}

					if (background.color == "@gradation" && gradation) {
						bkcolor = "";
						bkgradation = gradation._sysvalue;
					}

					if (usevml && background._sysopacity < 100) {
						var bordertype = this.bordertype;
						if (!vml_elem && bordertype && bordertype._isRound()) {
							this._clearDOMBackgroundOnly(_handle);
							vml_elem = new nexacro._VMLContainerElement(element);
							vml_elem.setElementSize(element.width, element.height);
							vml_elem.setVMLBorder(bordertype, this.border);
							this._vml_elem = vml_elem;
							if (_handle) {
								var before_node = _handle.firstChild;
								vml_elem.create(before_node);
							}
						}
					}

					if (vml_elem) {
						if (bkimgurl) {
							if (bkrepeat == "quad") {
								this._clearDOMBackgroundOnly(_handle);
								vml_elem.setVMLBackground(background, gradation);
								vml_elem.clearVMLImage();
								this._setDOMQuadImage(element, _handle, bkimgurl);
							}
							else if (bkrepeat == "stretch") {
								if (edge_x == 0 && edge_y == 0) {
									this._clearDOMBackground(_handle);
									vml_elem.setVMLBackground(background, gradation);
									vml_elem.setVMLStretchImage(bkimgurl);
								}
								else {
									this._clearDOMBackgroundOnly(_handle);
									vml_elem.setVMLBackground(background, gradation);
									vml_elem.clearVMLImage();
									this._setDOMEdgeImage(element, _handle, bkimgurl, edge_x, edge_y);
								}
							}
							else {
								this._clearDOMBackground(_handle);
								vml_elem.setVMLBackground(background, gradation);
								vml_elem.setVMLRepeatImage(_handle, bkimgurl, bkrepeat, pos_x, pos_y);
							}
						}
						else {
							this._clearDOMBackground(_handle);
							vml_elem.clearVMLImage();
							vml_elem.setVMLBackground(background, gradation);
						}
						vml_elem.updateVMLInfo();
					}
					else {
						if (bkimgurl) {
							if (bkrepeat == "quad") {
								this._setDOMBackgroundOnly(_handle, bkcolor, bkgradation);
								this._setDOMQuadImage(element, _handle, bkimgurl);
							}
							else if (bkrepeat == "stretch") {
								if (edge_x == 0 && edge_y == 0) {
									this._setDOMBackgroundOnly(_handle, bkcolor, bkgradation);
									this._setDOMStretchImage(element, _handle, bkimgurl, pos_x, pos_y);
								}
								else {
									this._setDOMBackgroundOnly(_handle, bkcolor, bkgradation);
									this._setDOMEdgeImage(element, _handle, bkimgurl, edge_x, edge_y);
								}
							}
							else {
								if (!bkrepeat) {
									bkrepeat = "no-repeat";
								}
								if (bkgradation) {
									this._setDOMBackgroundOnly(_handle, bkcolor, bkgradation);
									this._setDOMRepeatImage(element, _handle, bkimgurl, bkrepeat, pos_x, pos_y);
								}
								else {
									this._setDOMBackground(_handle, bkcolor, bkgradation, bkimgurl, bkrepeat, pos_x, pos_y);
								}
							}
						}
						else {
							this._setDOMBackground(_handle, bkcolor, bkgradation, "", "", 0, 0);
						}
					}
				}
			};

			_pControlElementBase._createControlSubElements = function (element, _handle) {
				if (_handle) {
					var handle_style = _handle.style;

					var border = this._dom_border;
					if (border && !border._is_real_empty()) {
						if (border._linecnt == 1) {
							handle_style.border = border._systop;
						}
						else {
							var _border = border._getStyleObject(this._isRtl());

							handle_style.borderTop = _border._systop;
							handle_style.borderRight = _border._sysright;
							handle_style.borderBottom = _border._sysbottom;
							handle_style.borderLeft = _border._sysleft;
						}
					}

					var syscolor = this._node_bkcolor;
					if (syscolor) {
						handle_style.backgroundColor = syscolor;
					}

					var sysgradation = this._node_gradation;
					nexacro.__setDOMNodeStyleForceVisibility(handle_style, true);
					if (sysgradation) {
						if (this._node_opacity_str) {
							handle_style.filter = sysgradation + ' ' + this._node_opacity_str;
						}
						else {
							handle_style.filter = sysgradation;
						}
					}
					else if (this._node_opacity_str) {
						handle_style.filter = this._node_opacity_str;
					}
					nexacro.__setDOMNodeStyleVisible(handle_style, this.visible);

					var url = this._node_bkurl;
					if (url) {
						var url2 = "url(" + url + ")";
						var repeat = this._node_bkrepeat;
						var bkpos = this._node_bkpos;
						handle_style.backgroundImage = url2;
						handle_style.backgroundRepeat = repeat;
						handle_style.backgroundPosition = bkpos;
					}

					var vml_elem = this._vml_elem;
					if (vml_elem) {
						var before_elem = null;
						vml_elem.create(null);
					}

					var bkimg_elem = this._bkimage_elem;
					if (bkimg_elem) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						bkimg_elem.create(before_elem);
					}
				}
			};

			_pControlElementBase._destroyControlSubElements = function () {
				if (this._bkimage_elem) {
					this._bkimage_elem.destroy();
					this._bkimage_elem = null;
					this._background_style = 0;
				}
				if (this._vml_elem) {
					this._vml_elem.destroy();
					this._vml_elem = null;
				}
			};

			_pControlElementBase._setDOMRepeatImage = function (element, _handle, url, bkrepeat, posx, posy) {
				if (this._background_style == 1) {
					this._bkimage_elem.setElementInfo(url, bkrepeat, posx, posy);
				}
				else {
					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
					}

					var repeat_elem = new nexacro._RepeatImageElement(element);
					repeat_elem.setElementPosition(this._inner_left, this._inner_top);
					repeat_elem.setElementSize(this._inner_width, this._inner_height);
					repeat_elem.setElementInfo(url, bkrepeat, posx, posy);
					this._bkimage_elem = repeat_elem;
					this._background_style = 1;

					if (_handle) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						repeat_elem.create(before_elem);
					}
				}
			};

			_pControlElementBase._setDOMStretchImage = function (element, _handle, url) {
				if (this._background_style == 2) {
					this._bkimage_elem.setElementInfo(url);
				}
				else {
					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
					}

					var stretch_elem = new nexacro._StretchImageElement(element);
					stretch_elem.setElementPosition(this._inner_left, this._inner_top);
					stretch_elem.setElementSize(this._inner_width, this._inner_height);
					stretch_elem.setElementInfo(url);
					this._bkimage_elem = stretch_elem;
					this._background_style = 2;

					if (_handle) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						stretch_elem.create(before_elem);
					}
				}
			};

			_pControlElementBase._setDOMQuadImage = function (element, _handle, url) {
				if (this._background_style == 3) {
					this._bkimage_elem.setElementInfo(url);
				}
				else {
					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
					}

					var quad_elem = new nexacro._QuadImageElement(element);
					quad_elem.setElementPosition(this._inner_left, this._inner_top);
					quad_elem.setElementSize(this._inner_width, this._inner_height, (this._vml_elem != null));
					quad_elem.setElementInfo(url);
					this._bkimage_elem = quad_elem;
					this._background_style = 3;

					if (_handle) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						quad_elem.create(before_elem);
					}
				}
			};

			_pControlElementBase._setDOMEdgeImage = function (element, _handle, url, edgex, edgey) {
				if (this._background_style == 4) {
					this._bkimage_elem.setElementInfo(url, edgex, edgey);
				}
				else {
					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
					}

					var edge_elem = new nexacro._EdgeImageElement(element);
					edge_elem.setElementPosition(this._inner_left, this._inner_top);
					edge_elem.setElementSize(this._inner_width, this._inner_height, (this._vml_elem != null));
					edge_elem.setElementInfo(url, edgex, edgey);
					this._bkimage_elem = edge_elem;
					this._background_style = 4;

					if (_handle) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						edge_elem.create(before_elem);
					}
				}
			};
		}
		else {
			_pControlElementBase._isVML = function () {
				return false;
			};

			_pControlElementBase._setControlOpacity = function (element, _handle, sysopacity) {
				if (this._node_opacity != sysopacity) {
					this._node_opacity = sysopacity;
					if (_handle) {
						if (sysopacity >= 100) {
							_handle.style.opacity = 1;
						}
						else if (sysopacity <= 0) {
							_handle.style.opacity = 0;
						}
						else {
							_handle.style.opacity = sysopacity / 100;
						}
					}
				}
			};

			_pControlElementBase._setControlSize = function (element, _handle, width, height) {
				var inner_width = width;
				var inner_height = height;

				var border = this.border;
				if (border && !border._is_real_empty()) {
					inner_width = width - border._getBorderWidth();
					inner_height = height - border._getBorderHeight();
					if (inner_width < 0) {
						inner_width = 0;
					}
					if (inner_height < 0) {
						inner_height = 0;
					}
				}

				if (this._inner_width != inner_width || this._inner_height != inner_height) {
					this._node_width = this._inner_width = inner_width;
					this._node_height = this._inner_height = inner_height;

					if (_handle) {
						nexacro.__setDOMNodeStyleSize(_handle.style, inner_width, inner_height);
					}

					var background_elem = this._bkimage_elem;
					if (background_elem) {
						background_elem.setElementSize(inner_width, inner_height);
					}
				}
			};

			_pControlElementBase._setControlBorder = function (element, _handle, border, bordertype) {
				if (_handle) {
					if (bordertype) {
						nexacro.__setDOMNodeStyleBorderType(_handle.style, bordertype, _handle);
					}
					else {
						nexacro.__clearDOMNodeStyleBorderType(_handle.style);
					}
				}

				this.border = border;

				var width = element.width;
				var height = element.height;

				var inner_width = width;
				var inner_height = height;

				if (border && !border._is_real_empty()) {
					if (_handle) {
						var handle_style = _handle.style;
						if (border._linecnt == 1) {
							handle_style.border = border._systop;
						}
						else {
							handle_style.borderTop = border._systop;
							handle_style.borderRight = border._sysright;
							handle_style.borderBottom = border._sysbottom;
							handle_style.borderLeft = border._sysleft;
						}
					}

					inner_width = width - border._getBorderWidth();
					inner_height = height - border._getBorderHeight();
					if (inner_width < 0) {
						inner_width = 0;
					}
					if (inner_height < 0) {
						inner_height = 0;
					}
				}
				else {
					if (_handle) {
						_handle.style.border = "none";
					}
				}

				if (this._inner_width != inner_width || this._inner_height != inner_height) {
					this._node_width = this._inner_width = inner_width;
					this._node_height = this._inner_height = inner_height;

					if (_handle) {
						var handle_style = _handle.style;
						handle_style.width = inner_width + "px";
						handle_style.height = inner_height + "px";
					}

					var background_elem = this._bkimage_elem;
					if (background_elem) {
						background_elem.setElementSize(inner_width, inner_height);
					}
				}
			};

			_pControlElementBase._setDOMBackgroundOnly = function (_handle, syscolor, sysgradation) {
				syscolor = (syscolor ? syscolor : "transparent");
				if (_handle) {
					var handle_style = _handle.style;
					if (this._node_bkcolor != syscolor) {
						this._node_bkcolor = syscolor;
						handle_style.backgroundColor = syscolor;
					}

					if (this._node_gradation != sysgradation) {
						this._node_gradation = sysgradation;
						nexacro.__setDOMNodeStyleBackgroundGradation(handle_style, sysgradation);
					}

					if (this._node_bkurl) {
						this._node_bkurl = "";
						this._node_bkrepeat = "";
						this._node_bkpos = "";

						handle_style.backgroundImage = "";
					}
				}
				else {
					this._node_bkcolor = syscolor;
					this._node_gradation = sysgradation;
					this._node_bkurl = "";
					this._node_bkrepeat = "";
					this._node_bkpos = "";
				}
			};

			_pControlElementBase._setDOMBackground = function (_handle, syscolor, sysgradation, url, repeat, posx, posy) {
				var bkpos = posx + "% " + posy + "%";
				if (repeat == "") {
					repeat = "no-repeat";
				}
				syscolor = (syscolor ? syscolor : "transparent");

				if (_handle) {
					var handle_style = _handle.style;
					if (this._node_bkcolor != syscolor) {
						this._node_bkcolor = syscolor;
						handle_style.backgroundColor = syscolor;
					}

					if (this._background_style != 0 || this._node_gradation != sysgradation || 
						this._node_bkurl != url || this._node_bkrepeat != repeat || 
						this._node_bkpos != bkpos) {
						this._node_gradation = sysgradation;
						this._node_bkurl = url;
						this._node_bkrepeat = repeat;
						this._node_bkpos = bkpos;

						if (this._bkimage_elem) {
							this._bkimage_elem.destroy();
							this._bkimage_elem = null;
							this._background_style = 0;
						}

						if (nexacro.Browser == "Chrome") {
							if (url && url.substring(0, 17) == "data:image;base64") {
								var frontStr = url.substr(0, 10);
								var rearStr = url.substr(10, url.length - 1);

								url = frontStr + "/*" + rearStr;
							}
						}

						nexacro.__setDOMNodeStyleBackgroundImageGradation(handle_style, url, sysgradation, repeat, bkpos);
					}
				}
				else {
					if (nexacro.Browser == "IE" && (nexacro.BrowserVersion == 9 || nexacro.BrowserVersion == 10)) {
						if (this.linkedcontrol._is_subcontrol == true && syscolor == "transparent" && url == "") {
							url = null;
						}
					}

					this._node_bkcolor = syscolor;

					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
						this._bkimage_elem = null;
						this._background_style = 0;
					}

					this._node_gradation = sysgradation;
					this._node_bkurl = url;
					this._node_bkrepeat = repeat;
					this._node_bkpos = bkpos;
				}
			};

			_pControlElementBase._setControlBackground = function (element, _handle, background, gradation) {
				if (background) {
					var bkgradation = "";
					var bkcolor = background._syscolor;
					var bkimgurl = background.image;
					var bkrepeat = background.repeat;
					var pos_x = background.position_x;
					var pos_y = background.position_y;
					var edge_x = background.imageedge_x;
					var edge_y = background.imageedge_y;
					var bkgradation = "";

					bkimgurl = nexacro._getURIValue(bkimgurl);
					if (bkimgurl && !nexacro._isAbsolutePath(bkimgurl)) {
						var base_url = this._getElementBaseUrl();
						bkimgurl = nexacro._getImageLocation(bkimgurl, base_url);
					}

					if (background.color == "@gradation" && gradation) {
						bkcolor = "";
						bkgradation = gradation._sysvalue;
					}

					if (bkimgurl) {
						if (bkrepeat == "quad") {
							this._setDOMBackgroundOnly(_handle, bkcolor, bkgradation);
							this._setDOMQuadImage(element, _handle, bkimgurl);
						}
						else if (bkrepeat == "stretch" && (edge_x != 0 || edge_y != 0)) {
							this._setDOMBackgroundOnly(_handle, bkcolor, bkgradation);
							this._setDOMEdgeImage(element, _handle, bkimgurl, edge_x, edge_y);
						}
						else {
							this._setDOMBackground(_handle, bkcolor, bkgradation, bkimgurl, bkrepeat, pos_x, pos_y);
						}
					}
					else {
						this._setDOMBackground(_handle, bkcolor, bkgradation, "", "", 0, 0);
					}
				}
			};

			_pControlElementBase._createControlSubElements = function (element, _handle) {
				if (_handle) {
					var handle_style = _handle.style;

					var bordertype = this.bordertype;
					if (bordertype) {
						var _bordertype = bordertype._getStyleObject(this._isRtl());
						nexacro.__setDOMNodeStyleBorderType(_handle.style, _bordertype, _handle);
					}

					var border = this.border;
					if (border && !border._is_real_empty()) {
						if (border._linecnt == 1) {
							handle_style.border = border._systop;
						}
						else {
							var _border = border._getStyleObject(this._isRtl());

							handle_style.borderTop = _border._systop;
							handle_style.borderRight = _border._sysright;
							handle_style.borderBottom = _border._sysbottom;
							handle_style.borderLeft = _border._sysleft;
						}
					}

					var syscolor = this._node_bkcolor;
					if (syscolor) {
						handle_style.backgroundColor = syscolor;
					}

					var sysgradation = this._node_gradation;
					var url = this._node_bkurl;
					var repeat = this._node_bkrepeat;
					var bkpos = this._node_bkpos;

					nexacro.__setDOMNodeStyleBackgroundImageGradation(handle_style, url, sysgradation, repeat, bkpos);

					var bkimg_elem = this._bkimage_elem;
					if (bkimg_elem) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						bkimg_elem.create(before_elem);
					}
				}
			};

			_pControlElementBase._destroyControlSubElements = function () {
				if (this._bkimage_elem) {
					this._bkimage_elem.destroy();
					this._bkimage_elem = null;
					this._background_style = 0;
				}
			};


			_pControlElementBase._setDOMQuadImage = function (element, _handle, url) {
				if (this._background_style == 3) {
					this._bkimage_elem.setElementInfo(url);
				}
				else {
					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
					}

					var quad_elem = new nexacro._QuadImageElement(element);
					quad_elem.setElementPosition(this._inner_left, this._inner_top);
					quad_elem.setElementSize(this._inner_width, this._inner_height, (this._vml_elem != null));
					quad_elem.setElementInfo(url);
					this._bkimage_elem = quad_elem;
					this._background_style = 3;

					if (_handle) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						quad_elem.create(before_elem);
					}
				}
			};

			_pControlElementBase._setDOMEdgeImage = function (element, _handle, url, edgex, edgey) {
				if (this._background_style == 4) {
					this._bkimage_elem.setElementInfo(url, edgex, edgey);
				}
				else {
					if (this._bkimage_elem) {
						this._bkimage_elem.destroy();
					}

					var edge_elem = new nexacro._EdgeImageElement(element);
					edge_elem.setElementPosition(this._inner_left, this._inner_top);
					edge_elem.setElementSize(this._inner_width, this._inner_height, (this._vml_elem != null));
					edge_elem.setElementInfo(url, edgex, edgey);
					this._bkimage_elem = edge_elem;
					this._background_style = 4;

					if (_handle) {
						var before_elem = null;
						if (element._client_element) {
							before_elem = element._client_element;
						}
						edge_elem.create(before_elem);
					}
				}
			};
		}
		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 8) {
			_pControlElementBase.setAccessibility = nexacro._emptyFn;
			_pControlElementBase.notifyAccessibility = nexacro._emptyFn;
			_pControlElementBase._makeAccessibilityLabelbyReadtype = nexacro._emptyFn;
		}
		else {
			_pControlElementBase.setAccessibility = function (accessibility) {
				var role = accessibility._role;
				var enable = accessibility.enable;
				var desclevel = accessibility._desclevel ? accessibility._desclevel : accessibility.desclevel;
				var label = (accessibility._label ? accessibility._label : accessibility.label);
				var description = accessibility._description ? accessibility._description : accessibility.description;
				var action = accessibility._action ? accessibility._action : accessibility.action;

				var handle = this._handle;
				if (handle) {
					if (role != this.accessibility_role && role != "none") {
						this.accessibility_role = role;
						nexacro.__setDOMNodeAccessibilityRole(handle, role);
					}

					if (desclevel != this.accessibility_desclevel) {
						this.accessibility_desclevel = desclevel;
						nexacro.__setDOMNodeAccessibilityDescLevel(handle, desclevel);
					}

					if (label != this.accessibility_label) {
						this.accessibility_label = label;
					}
					if (description != this.accessibility_description) {
						this.accessibility_description = description;
						nexacro.__setDOMNodeAccessibilityDescription(handle, description);
					}
					if (action != this.accessibility_action) {
						this.accessibility_action = action;
					}
					var readlabel = this._makeAccessibilityLabelbyReadtype();
					if (readlabel != this.accessibility_readlabel) {
						this.accessibility_readlabel = readlabel;
						nexacro.__setDOMNodeAccessibilityLabel(handle, readlabel);
					}

					this.accessibility_enable = enable;
				}
				else {
					this.accessibility_role = role;
					this.accessibility_desclevel = desclevel;
					this.accessibility_label = label;
					this.accessibility_description = description;
					this.accessibility_action = action;
					this.accessibility_enable = enable;
				}
			};

			_pControlElementBase.notifyAccessibility = function (label, notifyevent, bfocus) {
				var readlabel = this._makeAccessibilityLabelbyReadtype(this);
				this.accessibility_readlabel = readlabel;
				nexacro.__notifyAccessibility(this._handle, label ? label : this.accessibility_readlabel, notifyevent ? notifyevent : "notify", this, bfocus);
			};

			_pControlElementBase._makeAccessibilityLabelbyReadtype = function () {
				var label = " ";
				if (this.accessibility_desclevel != "none" && this.accessibility_desclevel != "child") {
					if ((nexacro._accessibilitydescreadtype & 0x01) == 0x01) {
						label = nexacro.AccessibilityUtil.getAccessibilityLabel(this);
					}
					if ((nexacro._accessibilitydescreadtype & 0x02) == 0x02 && this.accessibility_action) {
						label += " " + nexacro.AccessibilityUtil.getAccessibilityAction(this);
					}
					if ((nexacro._accessibilitydescreadtype & 0x04) == 0x04 && this.accessibility_description) {
						label += " " + nexacro.AccessibilityUtil.getAccessibilityDescription(this);
					}
					if (nexacro.AccessibilityUtil.getAccessibilityAdditionalLabel) {
						label += " " + nexacro.AccessibilityUtil.getAccessibilityAdditionalLabel(this);
					}
				}
				return label;
			};
		}

		nexacro.SimpleControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pSimpleControlElement = nexacro._createPrototype(nexacro.ControlElementBase, nexacro.SimpleControlElement);
		nexacro.SimpleControlElement.prototype = _pSimpleControlElement;

		_pSimpleControlElement._type_name = "SimpleControlElement";

		_pSimpleControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
				_handle.id = this.linkedcontrol._unique_id;
				_handle._linked_element = this;
				_handle._element_type = 1;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;
				if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
					if (this.linkedcontrol.parent._type_name == "Form" && this.linkedcontrol.position.toLowerCase() == "fixed") {
						nexacro.__setDOMNodeStyleFixed(handle_style);
					}
					else {
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
					}
				}
				else {
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
				}
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

				if (this.mirror) {
					var background = this.background;
					if (background && background.image) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
						if (this._client_element && this._client_element._handle) {
							nexacro.__setDOMNodeStyleTransformMirror(this._client_element._handle.style, this.mirror && this._isRtl());
						}
					}
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

				this._createControlSubElements(this, _handle);
				this._refreshForeground(_handle, handle_style);
			}
		};

		_pSimpleControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();

				this._client_element = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pSimpleControlElement._updateClientSize = function () {
			this.client_left = this._inner_left;
			this.client_top = this._inner_top;
			this.client_width = this._inner_width;
			this.client_height = this._inner_height;
		};

		_pSimpleControlElement.getContainerElement = function () {
			return this;
		};

		_pSimpleControlElement.setElementPadding = function (padding) {
		};
		_pSimpleControlElement.setElementPaddingXY = function (left, top, right, bottom) {
		};

		_pSimpleControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this) {
					if (child_elem._handle) {
						var old_doc = child_elem.getRootWindowHandle();
						var new_doc = this.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this;
						}
					}
					else {
						child_elem._parent_elem = this;
					}
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					child_elem._appendToContainer(this);
				}
			}
		};
		_pSimpleControlElement.removeChildElement = function (child_elem) {
			if (child_elem._owner_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pSimpleControlElement.moveToNextElement = function (cur_elem, target_elem) {
			if (cur_elem && target_elem && cur_elem._owner_elem == this && target_elem._owner_elem == this && cur_elem._handle && target_elem._handle) {
				nexacro.__setElementHandleMoveToNext(cur_elem._handle, target_elem._handle);
			}
		};
		_pSimpleControlElement.moveToPrevElement = function (cur_elem, target_elem) {
			if (cur_elem && target_elem && cur_elem._owner_elem == this && target_elem._owner_elem == this && cur_elem._handle && target_elem._handle) {
				nexacro.__setElementHandleMoveToPrev(cur_elem._handle, target_elem._handle);
			}
		};
		_pSimpleControlElement.sendToBackElement = function (cur_elem) {
			if (cur_elem && cur_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleSendToBack(cur_elem._handle);
			}
		};
		_pSimpleControlElement.bringToFrontElement = function (cur_elem) {
			if (cur_elem && cur_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleBringToFront(cur_elem._handle);
			}
		};

		_pControlElementBase.saveToImage = nexacro._emptyFn;
		_pControlElementBase.saveToImageFile = nexacro._emptyFn;
		_pControlElementBase.saveToImageObject = nexacro._emptyFn;

		_pSimpleControlElement.setElementHScrollPos = function (hpos) {
			if (hpos < 0) {
				hpos = 0;
			}
			if (this.scroll_left != hpos || this._reset_scrollpos) {
				this.scroll_left = hpos;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeHScrollPos(_handle, hpos);
				}
			}
		};
		_pSimpleControlElement.setElementVScrollPos = function (vpos) {
			if (vpos < 0) {
				vpos = 0;
			}
			if (this.scroll_top != vpos || this._reset_scrollpos) {
				this.scroll_top = vpos;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeVScrollPos(_handle, vpos);
				}
			}
		};
		_pSimpleControlElement.setElementScrollPos = function (hpos, vpos) {
			if (hpos < 0) {
				hpos = 0;
			}
			if (vpos < 0) {
				vpos = 0;
			}
			if (this.scroll_left != hpos || this.scroll_top != vpos) {
				this.scroll_left = hpos;
				this.scroll_top = vpos;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeOffset(_handle, hpos, vpos);
				}
			}
		};

		_pSimpleControlElement._refreshVMLContainerElement = function (control_elem, target_elem) {
			if (control_elem && target_elem && control_elem._dest_handle && target_elem._dest_handle) {
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

		nexacro.ControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;
		};

		var _pControlElement = nexacro._createPrototype(nexacro.ControlElementBase, nexacro.ControlElement);
		nexacro.ControlElement.prototype = _pControlElement;
		_pControlElement._type_name = "ControlElement";

		_pControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle) {
				if (!this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					_handle.id = this.linkedcontrol._unique_id;
					_handle._linked_element = this;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
						if (this.linkedcontrol.parent._type_name == "Form" && this.linkedcontrol.position.toLowerCase() == "fixed") {
							nexacro.__setDOMNodeStyleFixed(handle_style);
						}
						else {
							nexacro.__setDOMNodeStyleAbsolute(handle_style);
						}
					}
					else {
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
					}
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);

					if (this.rtldirection) {
						nexacro.__setDOMNodeStyleDirection(handle_style, this.rtldirection);
					}
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}

				if (handle_style) {
					var background = this.background;
					if (background && background.image) {
						nexacro.__setDOMNodeStyleTransformMirror(handle_style, this.mirror && this._isRtl());
						nexacro.__setDOMNodeStyleTransformMirror(this._client_element._handle.style, this.mirror && this._isRtl());
					}
				}
			}
		};

		_pControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();

				this._client_element.destroy();
				this._client_element = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pControlElement.clearContents = function () {
			if (this._handle) {
				this._client_element.clearContents();
			}
		};

		_pControlElement.getContainerElement = function () {
			return this._client_element;
		};

		_pControlElement._updateClientSize = function () {
			var client_left = this._inner_left;
			var client_top = this._inner_top;
			var client_width = this._inner_width;
			var client_height = this._inner_height;

			if (this.padding) {
				var padding = this.padding._getStyleObject(this._isRtl());

				client_left += padding.left;
				client_top += padding.top;
				client_width -= (padding.left + padding.right);
				client_height -= (padding.top + padding.bottom);
				if (client_width < 0) {
					client_width = 0;
				}
				if (client_height < 0) {
					client_height = 0;
				}
			}
			else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
				if (this._isRtl()) {
					client_left += this.padding_right;
				}
				else {
					client_left += this.padding_left;
				}

				client_top += this.padding_top;
				client_width -= (this.padding_left + this.padding_right);
				client_height -= (this.padding_top + this.padding_bottom);
				if (client_width < 0) {
					client_width = 0;
				}
				if (client_height < 0) {
					client_height = 0;
				}
			}

			var client_element = this._client_element;
			if (client_element) {
				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}
				if (this.client_width != client_width || this.client_height != client_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(client_width, client_height);
				}
			}
			else {
				this.client_left = client_left;
				this.client_top = client_top;
				this.client_width = client_width;
				this.client_height = client_height;
			}
		};

		_pControlElement.setElementPadding = function (padding) {
			this.padding = padding;
			this.padding_left = 0;
			this.padding_top = 0;
			this.padding_right = 0;
			this.padding_bottom = 0;
			this._updateClientSize();
		};
		_pControlElement.setElementPaddingXY = function (left, top, right, bottom) {
			this.padding = null;
			this.padding_left = left;
			this.padding_top = top;
			this.padding_right = right;
			this.padding_bottom = bottom;
			this._updateClientSize();
		};

		_pControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this) {
					if (child_elem._handle) {
						var old_doc = child_elem.getRootWindowHandle();
						var new_doc = this._client_element.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this;
						}
					}
					else {
						child_elem._parent_elem = this;
					}
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					child_elem._appendToContainer(this._client_element);
				}
			}
		};

		_pControlElement.removeChildElement = function (child_elem) {
			if (child_elem._parent_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pControlElement.sendToBackElement = function (cur_elem) {
			this._client_element.sendToBackElement(cur_elem);
		};
		_pControlElement.bringToFrontElement = function (cur_elem) {
			this._client_element.bringToFrontElement(cur_elem);
		};
		_pControlElement.moveToNextElement = function (cur_elem, target_elem) {
			this._client_element.moveToNextElement(cur_elem, target_elem);
		};
		_pControlElement.moveToPrevElement = function (cur_elem, target_elem) {
			this._client_element.moveToPrevElement(cur_elem, target_elem);
		};

		nexacro.FrameControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;

			this._border_elems = new nexacro.Collection();
			this._frame_node = null;
		};
		var _pFrameControlElement = nexacro._createPrototype(nexacro.ControlElementBase, nexacro.FrameControlElement);
		nexacro.FrameControlElement.prototype = _pFrameControlElement;
		_pFrameControlElement._type_name = "FrameControlElement";

		_pFrameControlElement._title_control = null;
		_pFrameControlElement._menubar_control = null;
		_pFrameControlElement._status_control = null;
		_pFrameControlElement._title_height = 0;
		_pFrameControlElement._menu_height = 0;
		_pFrameControlElement._status_height = 0;
		_pFrameControlElement._title_top = 0;
		_pFrameControlElement._title_width = 0;
		_pFrameControlElement._menu_top = 0;
		_pFrameControlElement._menu_width = 0;
		_pFrameControlElement._status_top = 0;
		_pFrameControlElement._status_width = 0;
		_pFrameControlElement._max_child_zindex = 0;
		_pFrameControlElement._is_window_element = false;
		_pFrameControlElement._resizable = false;

		_pFrameControlElement._doc = null;

		_pFrameControlElement.create = function () {
			if (!this._handle) {
				if (this._parent_elem == null) {
					var _win = this.linkedcontrol._getWindow();
					var _doc = this._doc = _win._doc;
					this._owner_elem = _win;
					this._is_window_element = true;
					this.left = 0;
					this.top = 0;
					this.width = this._node_width = _win.clientWidth;
					this.height = this._node_height = _win.clientHeight;
					var _handle;
					if (_win._custom_node_id) {
						_handle = this._handle = this._dest_handle = _win._dest_handle = _doc.createElement("DIV");
					}
					else {
						_handle = this._handle = this._dest_handle = _win._dest_handle;
					}
					this.linkedcontrol._unique_id = this.linkedcontrol.id;
					_handle.id = this.linkedcontrol.id;
					_handle._linked_element = this;
					_handle._element_type = 1;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;


					if (!_win._custom_node_id && !nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
						nexacro.__setDOMNodeStyleFixed(handle_style);
					}

					nexacro.__setDOMNodeStyleMargin(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);



					this._createControlSubElements(this, _handle);

					this._refreshForeground(_handle, handle_style);

					this._client_element.create();
				}
				else {
					var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement();
					if (_owner_elem && _owner_elem._handle && !this._handle) {
						this._owner_elem = _owner_elem;
						var _doc = _owner_elem.getRootWindowHandle();
						var _handle = _doc.createElement("div");
						this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
						_handle.id = this.linkedcontrol._unique_id;
						_handle._linked_element = this;
						_handle._element_type = 1;

						var handle_style = _handle.style;

						if (_owner_elem instanceof nexacro.ModalOverlayElement) {
							if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
								nexacro.__setDOMNodeStyleFixed(handle_style);
							}
							else {
								nexacro.__setDOMNodeStyleAbsolute(handle_style);
							}
						}
						else {
							nexacro.__setDOMNodeStyleAbsolute(handle_style);
						}

						nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
						nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);


						this._handle = this._dest_handle = _handle;
						nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

						this._createControlSubElements(this, _handle);
						this._refreshForeground(_handle, handle_style);

						if (this._client_element) {
							this._client_element.create();
						}

						this._frame_node = nexacro._createFrameNode(_handle, this.left, this.top, _doc);
					}
				}

				if (this._resizable) {
					this._createBorderElements();
					this._updateBorderElementsPosition();
				}
			}
			else {
				if (this._parent_elem == null) {
					var _win = this.linkedcontrol._getWindow();
					if (this._handle != _win._dest_handle) {
						var old_handle = this._handle;

						var _doc = this._doc = _win._doc;
						this._owner_elem = _win;
						this._is_window_element = true;
						this.left = 0;
						this.top = 0;
						this.width = this._node_width = _win.clientWidth;
						this.height = this._node_height = _win.clientHeight;
						var _handle = this._handle = this._dest_handle = _win._dest_handle;
						this.linkedcontrol._unique_id = this.linkedcontrol.id;
						_handle.id = this.linkedcontrol.id;
						_handle._linked_element = this;
						_handle._element_type = 1;

						var handle_style = _handle.style;

						if (this.border) {
							this.border = null;
						}

						this._title_height = 0;
						this._status_height = 0;

						nexacro.__setDOMNodeStyleAbsolute(handle_style);
						nexacro.__setDOMNodeStyleMargin(handle_style);
						nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
						nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

						if (old_handle.hasChildNodes()) {
							var childs = old_handle.childNodes;
							for (var i = 0; i < childs.length; i++) {
								var child = childs[i];
								nexacro.__appendDOMNode(_handle, child);
							}
						}

						this._refreshForeground(_handle, handle_style);
					}

					if (this._handle && !this._client_element._handle) {
						this._client_element.create();
					}
				}
			}
		};

		_pFrameControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._is_window_element && (!this._owner_elem || _owner_handle)) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				nexacro._destroyFrameNode(_handle, this._frame_node);
				this._frame_node = null;

				this._owner_elem = null;
				this._doc = null;
				if (!this._is_window_element) {
					this._dest_handle = null;
				}

				this._handle = null;

				this._destroyBorderElements();
				this._destroyControlSubElements();

				if (this._client_element) {
					this._client_element.destroy();
				}
				this._client_element = null;

				this._dest_handle = null;
				this._title_control = null;
				this._menubar_control = null;
				this._status_control = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pFrameControlElement.clearContents = function () {
			if (this._handle) {
				this._client_element.clearContents();
			}
		};

		_pFrameControlElement._removeFromContainer = function () {
			var _owner_elem = this._owner_elem;
			if (_owner_elem) {
				this._owner_elem = null;
				var _handle = this._handle;
				if (_handle && _owner_elem._handle) {
					if (_owner_elem._dest_handle != _handle) {
						nexacro.__unlinkDOMNode(_owner_elem._dest_handle, _handle);
					}
				}
			}
		};

		_pFrameControlElement.getContainerElement = function () {
			return this._client_element;
		};
		_pFrameControlElement.getRootWindowHandle = function () {
			if (this._is_window_element) {
				return this._doc;
			}
			else if (this._owner_elem) {
				return this._owner_elem.getRootWindowHandle();
			}
			else if (this._parent && this._parent.getRootWindowHandle) {
				return this._parent.getRootWindowHandle();
			}
			return null;
		};

		_pFrameControlElement.setElementBorder = function (border, bordertype) {
			if (this.linkedcontrol && this.linkedcontrol._is_window) {
				return;
			}

			nexacro.ControlElementBase.prototype.setElementBorder.call(this, border, bordertype);
		};

		_pFrameControlElement._updateClientSize = function () {
			var client_left = this._inner_left;
			var client_top = this._inner_top;
			var client_width = this._inner_width;
			var client_height = this._inner_height;

			var title_control = this._title_control;
			if (title_control) {
				if (!this._is_verticalmin && (this.client_left != client_left || this._title_top != client_top || this._title_width != client_width)) {
					this._title_top = client_top;
					this._title_width = client_width;
					title_control.move(client_left, client_top, client_width, this._title_height);
				}
				else if (this._is_verticalmin && (this.client_top != client_top || this._title_top != client_top || this._title_height != client_height)) {
					this._title_top = client_top;
					this._title_width = client_width;
					title_control.move(client_left, client_top, client_width, client_height);
				}
				client_top += this._title_height;
				client_height -= this._title_height;
				if (client_height < 0) {
					client_height = 0;
				}
			}
			else {
				this._title_top = client_top;
			}

			var menubar_control = this._menubar_control;
			if (menubar_control) {
				var menu_top = client_top;
				if (this.client_left != client_left || this._menu_top != client_top || this._menu_width != client_width) {
					this._menu_top = client_top;
					this._menu_width = client_width;
					menubar_control.move(client_left, client_top, client_width, this._menu_height);
				}
				client_top += this._menu_height;
				client_height -= this._menu_height;
				if (client_height < 0) {
					client_height = 0;
				}
			}
			else {
				this._menu_top = client_top;
			}


			var status_control = this._status_control;
			if (status_control) {
				if (this._status_height > 0) {
					client_height -= this._status_height;
					if (client_height < 0) {
						client_height = 0;
					}
				}
				var status_top = client_top + client_height;
				if (this.client_left != client_left || this._status_top != status_top || this._status_width != client_width) {
					this._status_top = status_top;
					this._status_width = client_width;
					status_control.move(client_left, status_top, client_width, this._status_height);
				}
			}
			else {
				this._status_top = client_top + client_height;
			}

			var client_element = this._client_element;
			if (client_element) {
				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}
				if (this.client_width != client_width || this.client_height != client_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(client_width, client_height);
				}
			}

			this.client_left = client_left;
			this.client_top = client_top;
			this.client_width = client_width;
			this.client_height = client_height;

			this._updateBorderElementsPosition();
		};

		_pFrameControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (!this._client_element) {
					return;
				}

				if (child_elem._parent_elem == this._client_element) {
					child_elem._is_nc_element = true;
				}
				else {
					if (child_elem._handle) {
						var old_doc = child_elem.getRootWindowHandle();
						var new_doc = this.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this._client_element;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this._client_element;
						}
					}
					else {
						child_elem._parent_elem = this._client_element;
					}
				}

				child_elem._is_nc_element = true;

				child_elem.setElementPosition(0, 0);
				child_elem.setElementSize(this.client_width, this.client_height);
				if (this.font) {
					child_elem.setElementFont(this.font);
				}
				if (this.color) {
					child_elem.setElementColor(this.color);
				}
				if (this.align) {
					child_elem.setElementAlign(this.align);
				}
				else if (this.halign || this.valign) {
					child_elem.setElementAlignXY(this.halign, this.valign);
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					child_elem._appendToContainer(this._client_element);
				}
			}
		};
		_pFrameControlElement.removeChildElement = function (child_elem) {
			if (child_elem._parent_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pFrameControlElement.sendToBackElement = function (target_elem) {
			if (target_elem && target_elem._owner_elem && 
				target_elem._owner_elem._owner_elem == this && target_elem._handle) {
				nexacro.__setElementHandleSendToBack(target_elem._handle);
				if (target_elem._border_elems) {
					for (var i = 0; i < target_elem._border_elems.length; i++) {
						nexacro.__setElementHandleSendToBack(target_elem._border_elems[i]._handle);
					}
				}
			}
		};

		_pFrameControlElement.bringToFrontElement = function (cur_elem) {
			if (this._client_element && this._client_element._handle) {
				this._max_child_zindex++;

				var new_zindex = (this._max_child_zindex * 10);

				cur_elem.setElementZIndex(new_zindex);
				if (cur_elem._border_elems) {
					for (var i = 0; i < cur_elem._border_elems.length; i++) {
						cur_elem._border_elems[i].setElementZIndex(new_zindex + (i + 1));
					}
				}
			}
		};

		_pFrameControlElement.moveToNextElement = function (cur_elem, target_elem) {
			var client_element = this.getContainerElement(cur_elem.position_step);
			client_element.moveToNextElement(cur_elem, target_elem);
		};

		_pFrameControlElement.moveToPrevElement = function (cur_elem, target_elem) {
			var client_element = this.getContainerElement(cur_elem.position_step);
			client_element.moveToPrevElement(cur_elem, target_elem);
		};

		_pFrameControlElement.setTitleBarControl = function (title_control, title_height) {
			if (this._title_control != title_control) {
				if (title_control) {
					title_control._is_nc_control = true;
					this._title_control = title_control;
					this._title_height = parseInt(title_height) | 0;
					this._title_width = 0;
				}
				else {
					this._title_control = null;
					this._title_height = 0;
					this._title_width = 0;
				}
				this._updateClientSize();
			}
			else if (title_control) {
				this._title_height = parseInt(title_height) | 0;
				this._title_width = 0;
				this._updateClientSize();
			}
		};
		_pFrameControlElement.setStatusBarControl = function (status_control, status_height) {
			if (this._status_control != status_control) {
				if (status_control) {
					status_control._is_nc_control = true;
					this._status_control = status_control;
					this._status_height = parseInt(status_height) | 0;
					this._status_width = 0;
				}
				else {
					this._status_control = null;
					this._status_height = 0;
					this._status_width = 0;
				}
				this._updateClientSize();
			}
			else if (status_control) {
				this._status_height = parseInt(menu_height) | 0;
				this._status_width = 0;
				this._updateClientSize();
			}
		};
		_pFrameControlElement.setMenuBarControl = function (menu_control, menu_height) {
			if (this._menu_control != menu_control) {
				if (menu_control) {
					menu_control._is_nc_control = true;
					this._menu_control = menu_control;
					this._menu_height = parseInt(menu_height) | 0;
					this._menu_width = 0;
					menu_control.set_visible(this._menu_height > 0);
				}
				else {
					this._menu_control = null;
					this._menu_height = 0;
					this._menu_width = 0;
				}
				this._updateClientSize();
			}
			else if (menu_control) {
				this._menu_height = parseInt(menu_height) | 0;
				this._menu_width = 0;
				menu_control.set_visible(this._menu_height > 0);
			}
		};

		_pFrameControlElement._createBorderElements = function () {
			if (this.parent == null || this._parent_elem == null) {
				return;
			}

			if (this._border_elems.length > 0) {
				return;
			}

			var name_table = Array("lt", "t", "rt", "l", "r", "lb", "b", "rb");
			for (var i = 0; i < 8; i++) {
				var border_elem = new nexacro.FrameResizeBorderElement(this._parent_elem);

				border_elem.parent = this;

				this._border_elems.add_item(name_table[i], border_elem);
			}

			this._setResizable(this._resizable);

			for (var i = 0; i < 8; i++) {
				var border_elem = this._border_elems[i];
				border_elem.linkedcontrol = this.linkedcontrol;
				border_elem.create();
			}
		};

		_pFrameControlElement._destroyBorderElements = function () {
			for (var i = 0; i < this._border_elems.length; i++) {
				this._border_elems[i].destroy();
				this._border_elems[i] = null;
			}
		};

		_pFrameControlElement.setElementPosition = function (x, y) {
			nexacro.ControlElementBase.prototype.setElementPosition.call(this, x, y);
			this._updateBorderElementsPosition();
		};
		_pFrameControlElement.setElementSize = function (w, h) {
			nexacro.ControlElementBase.prototype.setElementSize.call(this, w, h);
			this._updateBorderElementsPosition();
		};

		_pFrameControlElement._updateBorderElementsPosition = function () {
			if (this._border_elems.length == 0) {
				return;
			}

			var border = this.border;
			if (!border) {
				return;
			}

			var lw, tw, rw, bw;
			if (border._linecnt == 1) {
				lw = tw = rw = bw = border._getBorderLeftWidth();
			}
			else {
				lw = border._getBorderLeftWidth();
				tw = border._getBorderTopWidth();
				rw = border._getBorderRightWidth();
				bw = border._getBorderBottomWidth();
			}

			var inner_width = this._inner_width;
			var inner_height = this._inner_height;

			if (lw < 5) {
				var lx = 5 - lw;
				lw += lx;
				inner_width -= lx;
			}
			if (tw < 5) {
				var tx = 5 - tw;
				tw += tx;
				inner_height -= tx;
			}
			if (rw < 5) {
				var rx = 5 - rw;
				rw += rx;
				inner_width -= rx;
			}
			if (bw < 5) {
				var bx = 5 - bw;
				bw += bx;
				inner_height -= bx;
			}

			var left = this.left;
			var top = this.top;
			var right = left + this.width;
			var bottom = top + this.height;

			var x = left;
			var y = top;
			for (var i = 0; i < 8; i++) {
				this._border_elems[i].setElementPosition(x, y);
				switch (i) {
					case 0:
						x += lw;
						break;
					case 1:
						x += inner_width;
						break;
					case 2:
						x = left;
						y += tw;
						break;
					case 3:
						x += (lw + inner_width);
						break;
					case 4:
						x = left;
						y += inner_height;
						break;
					case 5:
						x += lw;
						break;
					case 6:
						x += inner_width;
						break;
					case 7:
						break;
				}
			}

			for (var i = 0; i < 8; i++) {
				if (i == 0 || i == 3 || i == 5) {
					x = lw;
				}
				if (i == 1 || i == 6) {
					x = inner_width;
				}
				if (i == 2 || i == 4 || i == 7) {
					x = rw;
				}
				if (i < 3) {
					y = tw;
				}
				else if (i < 5) {
					y = inner_height;
				}
				else {
					y = bw;
				}

				this._border_elems[i].setElementSize(x, y);
			}
		};

		_pFrameControlElement._setResizable = function (resizable) {
			this._resizable = resizable;
			if (this._handle) {
				if (this._border_elems.length == 0) {
					if (resizable) {
						this._createBorderElements();
						this._updateBorderElementsPosition();
					}
					else {
						return;
					}
				}

				var cursor_table = Array("nw", "n", "ne", "w", "e", "sw", "s", "se");
				for (var i = 0; i < 8; i++) {
					var border_elem = this._border_elems[i];
					border_elem._is_track = resizable;

					var cursor;
					if (resizable) {
						cursor = new nexacro.Style_value(cursor_table[i] + "-resize");
					}
					else {
						cursor = new nexacro.Style_value("arrow");
					}
					border_elem.setElementCursor(cursor);
				}
			}

			if (this._status_control) {
				this._status_control._setResizable(resizable);
			}
		};

		nexacro.FrameResizeBorderElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pFrameResizeBorderElement = nexacro._createPrototype(nexacro.SimpleControlElement, nexacro.FrameResizeBorderElement);
		nexacro.FrameResizeBorderElement.prototype = _pFrameResizeBorderElement;

		_pFrameResizeBorderElement._type_name = "FrameResizeBorderElement";

		_pFrameResizeBorderElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement();
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle._linked_element = this;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);
				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

				this._createControlSubElements(this, _handle);
				this._refreshForeground(_handle, handle_style);

				if (this._client_element) {
					this._client_element.create();
				}
			}
		};

		_pFrameResizeBorderElement._on_starttrack = function () {
			this.linkedcontrol._on_border_starttrack(this.cursor);
		};
		_pFrameResizeBorderElement._on_endtrack = function (x, y, dragdata) {
			this.linkedcontrol._on_border_endtrack(x, y, dragdata);
		};
		_pFrameResizeBorderElement._on_movetrack = function (x, y, dragdata) {
			this.linkedcontrol._on_border_movetrack(x, y, dragdata);
		};

		delete _pFrameResizeBorderElement;

		nexacro.ModalOverlayElement = function (parent_elem) {
			this._parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;
		};

		var _pModalOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.ModalOverlayElement);
		nexacro.ModalOverlayElement.prototype = _pModalOverlayElement;
		_pModalOverlayElement._type_name = "ModalOverlayElement";

		_pModalOverlayElement.create = function (zindex, color, ref_dest_handle) {
			if (this._parent_elem && !this._handle) {
				var _win = this.linkedcontrol._getWindow();
				var _doc = this._doc = this._parent.getRootWindowHandle();
				var _handle = this._handle = this._dest_handle = _doc.createElement("div");
				_handle._linked_element = this;

				var _win_handle = _win._handle;
				this.width = nexacro._getWindowHandleClientWidth(_win_handle) || _win.clientWidth;
				this.height = nexacro._getWindowHandleClientHeight(_win_handle) || _win.clientHeight;

				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, 0, 0);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);
				nexacro.__setDOMNodeStyleZindex(handle_style, zindex);
				this.setElementColor(color);

				var _win = this.linkedcontrol._getWindow();
				var _owner_elem = _win;

				if (ref_dest_handle) {
					_owner_elem._dest_handle.insertBefore(_handle, ref_dest_handle);
				}
				else {
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				}

				if (this._client_element) {
					this._client_element.setElementSize(this.width, this.height);
					this._client_element.create();
				}

				this._refreshForeground(_owner_elem._dest_handle, _owner_elem._dest_handle.style);
				this._frame_node = nexacro._createFrameNode(_handle, this.left, this.top, _doc);
			}
		};

		_pModalOverlayElement.destroy = function () {
			if (!this._handle) {
				return;
			}

			var _win = this.linkedcontrol._getWindow();
			var _owner_elem = _win;

			nexacro.__removeDOMNode(_owner_elem._dest_handle, this._handle);
			this._handle = null;

			this._client_element.destroy();
			this._client_element = null;

			nexacro._destroyFrameNode(this._handle, this._frame_node);
			this._frame_node = null;

			this._refreshForeground(_owner_elem._dest_handle, _owner_elem._dest_handle.style);
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
			_pModalOverlayElement.setElementColor = function (color) {
				color = this._preventTransparentHittest(color);

				this.color = color;
				this._createVMLNode();
			};
		}
		else {
			_pModalOverlayElement.setElementColor = function (color) {
				color = this._preventTransparentHittest(color);

				this.color = color;
				this._setDOMBackgroundOnly(this._handle, color ? color._syscolor : 0, null);
			};
		}

		_pModalOverlayElement._preventTransparentHittest = function (color) {
			if (!color) {
				return;
			}
			if (color._value == "transparent" || color._syscolor == "transparent") {
				color._setValue("#ffffff01");
			}
			else if (color._sysalpha == 0) {
				color._sysalpha = 1;
				var _value = color._value;
				if (_value.length == 9 && _value[7] == '0' && _value[8] == '0') {
					color._value = _value.slice(0, 8) + "1";
				}
				_value = color.value;
				if (_value.length == 9 && _value[7] == '0' && _value[8] == '0') {
					color.value = _value.slice(0, 8) + "1";
				}
			}

			return color;
		};

		_pModalOverlayElement.setElementSize = function (width, height) {
			var ret = nexacro.ControlElement.prototype.setElementSize.call(this, width, height);

			if (this._vml_node) {
				var w = width;
				var h = height;
				this._vml_node.path = "m 0,0 l " + w + ",0, " + w + "," + h + ", 0," + h + " x e";
				if (this._vml_fillnode) {
					this._vml_node.removeChild(this._vml_fillnode);
				}

				var _doc = this._doc;
				var color = this.color;
				var _syscolor = color ? color._syscolor : 0;
				var _opacity = color ? color._sysalpha * 100 / 255 : 100;
				var _v2 = _doc.createElement("<v:fill color='" + _syscolor + "' opacity='" + _opacity + "%'/>");
				this._vml_node.appendChild(_v2);
				this._vml_fillnode = _v2;
			}

			return ret;
		};

		_pModalOverlayElement._createVMLNode = function () {
			if (!this._handle) {
				return;
			}

			if (this._vml_node) {
				this._destroyVMLNode();
			}

			var w = this.width;
			var h = this.height;
			var _doc = this._doc;

			var _v = _doc.createElement("<v:shape stroked='f' style='position:absolute;width:" + w + "px;height:" + h + "px' coordorigin='0 0' coordsize='" + w + " " + h + "'/>");
			w = parseInt(w | 1);
			h = parseInt(h | 1);
			_v.path = "m 0,0 l " + w + ",0, " + w + "," + h + ", 0," + h + " x e";

			this._handle.appendChild(_v);
			this._vml_node = _v;

			var color = this.color;
			var _syscolor = color ? color._syscolor : 0;
			var _opacity = color ? color._sysalpha * 100 / 255 : 100;
			var _v2 = _doc.createElement("<v:fill color='" + _syscolor + "' opacity='" + _opacity + "%'/>");
			_v.appendChild(_v2);

			this._vml_fillnode = _v2;
		};

		_pModalOverlayElement._destroyVMLNode = function () {
			if (this._handle && this._vml_node) {
				var _v = this._vml_node;

				nexacro.__removeDOMNode(this._handle, this._vml_node);

				this._vml_node = null;
				this._vml_fillnode = null;
			}
		};

		_pModalOverlayElement.getContainerElement = function () {
			return this._client_element;
		};

		_pModalOverlayElement.getRootWindowHandle = function () {
			return this._doc;
		};

		delete _pModalOverlayElement;

		nexacro.ScrollableControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ScrollableContainerElement(this);


			this._client_element = client_element;
		};
		var _pScrollableControlElement = nexacro._createPrototype(nexacro.ControlElementBase, nexacro.ScrollableControlElement);
		nexacro.ScrollableControlElement.prototype = _pScrollableControlElement;
		_pScrollableControlElement._type_name = "ScrollableControlElement";

		_pScrollableControlElement._zoomFactor = 100;
		_pScrollableControlElement.scroll_left = 0;
		_pScrollableControlElement.scroll_top = 0;
		_pScrollableControlElement.container_maxwidth = 0;
		_pScrollableControlElement.container_maxheight = 0;
		_pScrollableControlElement._hscroll_visible = false;
		_pScrollableControlElement._vscroll_visible = false;
		_pScrollableControlElement._hscroll_height = 0;
		_pScrollableControlElement._vscroll_width = 0;
		_pScrollableControlElement._hscroll_left = 0;
		_pScrollableControlElement._hscroll_top = 0;
		_pScrollableControlElement._hscroll_width = 0;
		_pScrollableControlElement._vscroll_left = 0;
		_pScrollableControlElement._vscroll_top = 0;
		_pScrollableControlElement._vscroll_height = 0;
		_pScrollableControlElement.hscroll_limit = 0;
		_pScrollableControlElement.vscroll_limit = 0;
		_pScrollableControlElement._scroll_showtype = -1;
		_pScrollableControlElement._scrollview_width_top = 0;
		_pScrollableControlElement._step_count = 0;
		_pScrollableControlElement._step_index = -1;
		_pScrollableControlElement._hscroll_control = null;
		_pScrollableControlElement._vscroll_control = null;
		_pScrollableControlElement._resizebutton_element = null;
		_pScrollableControlElement._step_containers = null;
		_pScrollableControlElement._scroll_overlap = false;

		_pScrollableControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle) {
				if (!this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					_handle.id = this.linkedcontrol._unique_id;
					_handle._linked_element = this;
					_handle._element_type = 1;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
						if (this.linkedcontrol.parent._type_name == "Form" && this.linkedcontrol.position.toLowerCase() == "fixed") {
							nexacro.__setDOMNodeStyleFixed(handle_style);
						}
						else {
							nexacro.__setDOMNodeStyleAbsolute(handle_style);
						}
					}
					else {
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
					}
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}

				if (this._handle) {
					var step_count = this._step_count;
					if (step_count > 0) {
						this._step_containers = [];
						for (var i = 0; i < step_count; i++) {
							var step_client = new nexacro.ContainerElement(this._client_element);
							step_client.setElementPosition(i * this.client_width, 0);
							step_client.setElementSize(this.client_width, this.client_height);
							step_client.create();
							this._step_containers.push(step_client);
						}

						if (this._scroll_showtype >= 0) {
							this._updateClientSize();
						}
					}
				}
			}
		};

		_pScrollableControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();

				this._client_element.destroy();
				this._client_element = null;

				var step_containers = this._step_containers;
				if (step_containers) {
					var step_count = step_containers.length;
					for (var i = 0; i < step_count; i++) {
						var step_client = step_containers[i];
						step_client.destroy();
					}
					this._step_containers = null;
				}

				this._hscroll_control = null;
				this._vscroll_control = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pScrollableControlElement.clearContents = function () {
			if (this._handle) {
				this._client_element.clearContents();

				var step_containers = this._step_containers;
				if (step_containers) {
					var step_count = step_containers.length;
					for (var i = 0; i < step_count; i++) {
						var step_client = step_containers[i];
						step_client.destroy();
					}
					this._step_containers = null;
				}
			}
		};

		_pScrollableControlElement.getContainerElement = function (position_step) {
			var step_count = this._step_count;
			var step_index = this._step_index;
			var step_containers = this._step_containers;
			if (step_count > 0 && step_containers && step_count > position_step) {
				if (position_step < 0 || position_step == null) {
					position_step = (step_index > -1 ? step_index : 0);
				}

				return step_containers[position_step];
			}
			else {
				return this._client_element;
			}
		};
		_pScrollableControlElement.setElementStepCount = function (count) {
			if (this._step_count != count) {
				var step_count = this._step_count;
				var step_containers = this._step_containers;
				if (step_containers && this._step_count) {
					for (var i = 0; i < step_count; i++) {
						var step_client = step_containers[i];
						step_client.destroy();
					}
					this._step_containers = null;
				}

				this._step_count = count;

				if (this._handle && count > 0) {
					this._step_containers = [];
					for (var i = 0; i < count; i++) {
						var step_client = new nexacro.ContainerElement(this._client_element);
						step_client.setElementPosition(i * this.client_width, 0);
						step_client.setElementSize(this.client_width, this.client_height);
						step_client.create();
						this._step_containers.push(step_client);
					}
				}

				if (this._scroll_showtype >= 0) {
					this._updateClientSize();
				}
			}
		};

		_pScrollableControlElement.setElementStepIndex = function (index) {
			if (this._step_index != index) {
				if (this._step_count > 0) {
					if (index > -1 && this._step_count > index) {
						this._step_index = index;
					}
				}
				else {
					this._step_index = index;
				}
			}
		};


		_pScrollableControlElement.getZoom = function () {
			return this._zoomFactor;
		};
		_pScrollableControlElement.setZoom = function (zoomFactor) {
			var _handle = this._handle;
			if (_handle) {
				if (zoomFactor < 0) {
					zoomFactor = 0;
				}
				this._zoomFactor = zoomFactor;
				var client = this.getContainerElement(this._step_index);
				if (client) {
					this._client_element.setZoom(zoomFactor);
				}
				this._updateClientSize();
			}
		};

		_pScrollableControlElement.setElementPadding = function (padding) {
			this.padding = padding;
			this.padding_left = 0;
			this.padding_top = 0;
			this.padding_right = 0;
			this.padding_bottom = 0;
			this._updateClientSize();
		};

		_pScrollableControlElement.setElementPaddingXY = function (left, top, right, bottom) {
			this.padding = null;
			this.padding_left = left;
			this.padding_top = top;
			this.padding_right = right;
			this.padding_bottom = bottom;
			this._updateClientSize();
		};

		_pScrollableControlElement._updateClientSize = function () {
			var client_left = this._inner_left;
			var client_top = this._inner_top;
			var client_width = this._inner_width;
			var client_height = this._inner_height;

			var padding = this.padding;
			if (this.padding) {
				client_left += padding.left;
				client_top += padding.top;
				client_width -= (padding.left + padding.right);
				client_height -= (padding.top + padding.bottom);
				if (client_width < 0) {
					client_width = 0;
				}
				if (client_height < 0) {
					client_height = 0;
				}
			}
			else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
				client_left += this.padding_left;
				client_top += this.padding_top;
				client_width -= (this.padding_left + this.padding_right);
				client_height -= (this.padding_top + this.padding_bottom);
				if (client_width < 0) {
					client_width = 0;
				}
				if (client_height < 0) {
					client_height = 0;
				}
			}

			var client_element = this._client_element;
			if (!client_element || client_width == 0 || client_height == 0) {
				return;
			}

			var zoomFactor = this._zoomFactor / 100;
			var zclient_width = client_width / zoomFactor;
			var zclient_height = client_height / zoomFactor;
			var scroll_showtype = this._scroll_showtype;
			var hscroll_hidden = false;
			var container_maxwidth = this.container_maxwidth;
			var container_maxheight = this.container_maxheight;

			if (zoomFactor != 1) {
				var factor = 4;
				zclient_width = nexacro.floor(zclient_width, factor);
				zclient_height = nexacro.floor(zclient_height, factor);
				container_maxwidth = nexacro.floor(container_maxwidth, factor);
				container_maxheight = nexacro.floor(container_maxheight, factor);
			}

			var step_count = this._step_count;
			var step_index = this._step_index;
			var step_containers = this._step_containers;
			if (step_count > 0 && step_containers) {
				hscroll_hidden = true;
			}

			if (scroll_showtype > 0) {
				var hscroll_visible = false;
				var vscroll_visible = false;
				var hscroll_limit = 0;
				var vscroll_limit = 0;

				if (scroll_showtype == 1) {
					if (this._vscroll_control && container_maxheight > zclient_height) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = container_maxheight - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (this._hscroll_control && container_maxwidth > zclient_width) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						if (this._vscroll_control && container_maxheight > zclient_height) {
							if (!vscroll_visible) {
								vscroll_visible = true;
								client_width -= this._vscroll_width;
								zclient_width = client_width / zoomFactor;
							}
							vscroll_limit = container_maxheight - zclient_height;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}
				else if (scroll_showtype == 2) {
					if (this._vscroll_control) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = container_maxheight + this._hscroll_height - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (this._hscroll_control) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}
				else if (scroll_showtype == 31) {
					if (this._vscroll_control) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = container_maxheight - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (this._hscroll_control && container_maxwidth > zclient_width) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						if (this._vscroll_control && container_maxheight > zclient_height) {
							if (!vscroll_visible) {
								vscroll_visible = true;
								client_width -= this._vscroll_width;
								zclient_width = client_width / zoomFactor;
							}
							vscroll_limit = container_maxheight - zclient_height;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}
				else if (scroll_showtype == 32) {
					if (this._vscroll_control && container_maxheight > zclient_height) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = container_maxheight + this._hscroll_height - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (this._hscroll_control) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}

				var reset_vlimit = false;
				var reset_hlimit = false;
				if (this.hscroll_limit != hscroll_limit) {
					reset_hlimit = true;
					this.hscroll_limit = hscroll_limit;
				}
				if (this.vscroll_limit != vscroll_limit) {
					reset_vlimit = true;
					this.vscroll_limit = vscroll_limit;
				}

				var reset_vscroll = false;
				var reset_hscroll = false;
				var reset_vscroll_enable = false;
				var reset_hscroll_enable = false;

				if (this.scroll_top > vscroll_limit) {
					reset_vscroll = true;
					this.scroll_top = vscroll_limit;
				}
				if (this.scroll_left > hscroll_limit) {
					reset_hscroll = true;
					this.scroll_left = hscroll_limit;
				}

				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}

				if (this.client_width != zclient_width || this.client_height != zclient_height || 
					client_element.width != zclient_width || client_element.height != zclient_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(zclient_width, zclient_height);

					if (step_count > 0 && step_containers) {
						for (var i = 0; i < step_count; i++) {
							var step_client_element = step_containers[i];
							step_client_element.setElementPosition(zclient_width * i, 0);
							step_client_element.setElementSize(zclient_width, client_height);
						}

						step_index = this._step_index;
						var step_scroll_left = zclient_width * step_index;
						if (this.scroll_left != step_scroll_left) {
							reset_hscroll = true;
							this.scroll_left = step_scroll_left;
						}
					}
				}

				if (reset_hscroll) {
					client_element.setElementHScrollPos(this.scroll_left);
				}
				if (reset_vscroll) {
					client_element.setElementVScrollPos(this.scroll_top);
				}

				if (this._vscroll_control) {
					if (this._vscroll_control.parent.enable != this._vscroll_control.enable) {
						reset_vscroll_enable = true;
					}

					if (vscroll_visible) {
						if (!this._vscroll_visible) {
							this._vscroll_visible = true;
							this._vscroll_control.set_visible(true);
						}

						if (this._vscroll_left != (client_left + client_width) || this._vscroll_top != client_top || this._vscroll_height != client_height || reset_vlimit) {
							this._vscroll_left = (client_left + client_width);
							this._vscroll_top = client_top;
							this._vscroll_height = client_height;
							this._vscroll_control._setScrollInfo(this._vscroll_left, client_top, this._vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, zclient_height, zclient_height, true, this.scroll_top);
						}
						else if (reset_vscroll) {
							this._vscroll_control._setScrollPos(this.scroll_top);
						}

						if (reset_vscroll_enable) {
							this._vscroll_control._setEnable(this._vscroll_control.parent.enable);
						}
					}
					else {
						if (this._vscroll_left != (client_left + client_width) || this._vscroll_top != client_top || this._vscroll_height != client_height || reset_vlimit) {
							this._vscroll_left = (client_left + client_width);
							this._vscroll_top = client_top;
							this._vscroll_height = client_height;

							this._vscroll_control._setScrollInfo(this._vscroll_left - this._vscroll_width, client_top, this._vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, zclient_height, zclient_height, false, this.scroll_top);
						}
						else if (reset_vscroll) {
							this._vscroll_control._setScrollPos(this.scroll_top);
						}

						if (reset_vscroll_enable) {
							this._vscroll_control._setEnable(this._vscroll_control.parent.enable);
						}
						if (this._vscroll_visible) {
							this._vscroll_visible = false;
							this._vscroll_control.set_visible(false);
						}
					}
				}
				if (this._hscroll_control) {
					if (this._hscroll_control.parent.enable != this._hscroll_control.enable) {
						reset_hscroll_enable = true;
					}

					if (hscroll_visible) {
						if (!this._hscroll_visible) {
							this._hscroll_visible = true;
							this._hscroll_control.set_visible(true);
						}

						if (this._hscroll_left != client_left || this._hscroll_top != (client_top + client_height) || this._hscroll_width != client_width || reset_hlimit) {
							this._hscroll_left = client_left;
							this._hscroll_top = (client_top + client_height);
							this._hscroll_width = client_width;
							this._hscroll_control._setScrollInfo(client_left, this._hscroll_top, this._hscroll_width, this._hscroll_height, 0, this.hscroll_limit, 30, zclient_width, zclient_width, true, this.scroll_left);
						}
						else if (reset_hscroll) {
							this._hscroll_control._setScrollPos(this.scroll_left);
						}

						if (reset_hscroll_enable) {
							this._hscroll_control._setEnable(this._hscroll_control.parent.enable);
						}
					}
					else {
						if (this._hscroll_left != client_left || this._hscroll_top != (client_top + client_height) || this._hscroll_width != client_width || reset_hlimit) {
							this._hscroll_left = client_left;
							this._hscroll_top = (client_top + client_height);
							this._hscroll_width = client_width;

							this._hscroll_control._setScrollInfo(client_left, this._hscroll_top - this._hscroll_height, this._hscroll_width, this._hscroll_height, 0, this.hscroll_limit, 30, zclient_width, zclient_width, false, this.scroll_left);
						}
						else if (reset_hscroll) {
							this._hscroll_control._setScrollPos(this.scroll_left);
						}

						if (reset_hscroll_enable) {
							this._hscroll_control._setEnable(this._hscroll_control.parent.enable);
						}
						if (this._hscroll_visible) {
							this._hscroll_visible = false;
							this._hscroll_control.set_visible(false);
						}
					}
				}
			}
			else {
				if (step_count > 0 && step_containers) {
					container_maxwidth = step_count * zclient_width;

					var hscroll_limit = 0;
					if (container_maxwidth > zclient_width) {
						hscroll_limit = container_maxwidth - zclient_width;
					}

					if (this.hscroll_limit != hscroll_limit) {
						this.hscroll_limit = hscroll_limit;
					}
				}

				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}

				if (this.client_width != zclient_width || this.client_height != zclient_height || 
					client_element.width != zclient_width || client_element.height != zclient_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(zclient_width, zclient_height);

					if (step_count > 0 && step_containers && step_count > step_index) {
						for (var i = 0; i < step_count; i++) {
							var step_client_element = step_containers[i];
							step_client_element.setElementPosition(zclient_width * i, 0);
							step_client_element.setElementSize(zclient_width, client_height);
						}
					}
				}
			}
		};


		_pScrollableControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this) {
					if (child_elem._handle) {
						var old_doc = child_elem.getRootWindowHandle();
						var new_doc = this._client_element.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this;
						}
					}
					else {
						child_elem._parent_elem = this;
					}
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					var client_element = this.getContainerElement(child_elem.position_step);
					child_elem._appendToContainer(client_element);
				}
			}
		};
		_pScrollableControlElement.removeChildElement = function (child_elem) {
			if (child_elem._parent_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pScrollableControlElement.sendToBackElement = function (cur_elem) {
			var client_element = this.getContainerElement(cur_elem.position_step);
			client_element.sendToBackElement(cur_elem);
		};
		_pScrollableControlElement.bringToFrontElement = function (cur_elem) {
			var client_element = this.getContainerElement(cur_elem.position_step);
			client_element.bringToFrontElement(cur_elem);
		};
		_pScrollableControlElement.moveToNextElement = function (cur_elem, target_elem) {
			var client_element = this.getContainerElement(cur_elem.position_step);
			client_element.moveToNextElement(cur_elem, target_elem);
		};
		_pScrollableControlElement.moveToPrevElement = function (cur_elem, target_elem) {
			var client_element = this.getContainerElement(cur_elem.position_step);
			client_element.moveToPrevElement(cur_elem, target_elem);
		};


		_pScrollableControlElement.setScrollControls = function (hscroll_control, vscroll_control, hscroll_height, vscroll_width, scroll_showtype) {
			var recalc = false;

			if (this._scroll_showtype != scroll_showtype) {
				this._scroll_showtype = scroll_showtype;
				recalc = true;
			}

			if (this._hscroll_control != hscroll_control) {
				if (hscroll_control) {
					this._hscroll_visible = true;
					hscroll_control._is_nc_control = true;
					this._hscroll_control = hscroll_control;
					if (this._hscroll_height != hscroll_height) {
						this._hscroll_height = hscroll_height;
						recalc = true;
					}
				}
				else {
					this._hscroll_control = null;
					if (this._hscroll_height) {
						this._hscroll_height = 0;
						recalc = true;
					}
					this._hscroll_left = 0;
					this._hscroll_top = 0;
					this._hscroll_width = 0;
				}
			}

			if (this._vscroll_control != vscroll_control) {
				if (vscroll_control) {
					this._vscroll_visible = true;
					vscroll_control._is_nc_control = true;
					this._vscroll_control = vscroll_control;
					if (this._vscroll_width != vscroll_width) {
						this._vscroll_width = vscroll_width;
						recalc = true;
					}
				}
				else {
					this._vscroll_control = null;
					if (this._vscroll_width) {
						this._vscroll_width = 0;
						recalc = true;
					}
					this._vscroll_left = 0;
					this._vscroll_top = 0;
					this._vscroll_height = 0;
				}
			}

			if (recalc) {
				this._updateClientSize();
			}
		};

		_pScrollableControlElement.setElementHScrollPos = function (hpos) {
			if (hpos < 0) {
				hpos = 0;
			}
			if (hpos > this.hscroll_limit) {
				hpos = this.hscroll_limit;
			}

			if (this.scroll_left != hpos || this._reset_scrollpos) {
				this.scroll_left = hpos;
				if (this._client_element) {
					this._client_element.setElementHScrollPos(hpos);
				}
				if (this._hscroll_control) {
					this._hscroll_control._setScrollPos(this.scroll_left);
				}
			}
		};
		_pScrollableControlElement.setElementVScrollPos = function (vpos) {
			if (vpos < 0) {
				vpos = 0;
			}
			if (vpos > this.vscroll_limit) {
				vpos = this.vscroll_limit;
			}
			if (this.scroll_top != vpos || this._reset_scrollpos) {
				this.scroll_top = vpos;
				if (this._client_element) {
					this._client_element.setElementVScrollPos(vpos);
				}
				if (this._vscroll_control) {
					this._vscroll_control._setScrollPos(this.scroll_top);
				}
			}
		};
		_pScrollableControlElement.setElementScrollPos = function (hpos, vpos) {
			if (hpos < 0) {
				hpos = 0;
			}
			if (vpos < 0) {
				vpos = 0;
			}
			if (hpos > this.hscroll_limit) {
				hpos = this.hscroll_limit;
			}
			if (vpos > this.vscroll_limit) {
				vpos = this.vscroll_limit;
			}

			if (this.scroll_left != hpos || this.scroll_top != vpos) {
				this.scroll_left = hpos;
				this.scroll_top = vpos;
				if (this._client_element) {
					this._client_element.setElementScrollPos(hpos, vpos);
				}
				if (this._hscroll_control) {
					this._hscroll_control._setScrollPos(this.scroll_left);
				}
				if (this._vscroll_control) {
					this._vscroll_control._setScrollPos(this.scroll_top);
				}
			}
		};

		_pScrollableControlElement.setElementScrollMaxSize = function (width, height) {
			if (this.container_maxwidth != width || this.container_maxheight != height) {
				this.container_maxwidth = width;
				this.container_maxheight = height;
				if (this._scroll_showtype >= 0) {
					this._updateClientSize();
				}
				return true;
			}
			return false;
		};

		_pScrollableControlElement.setElementScrollbarSize = function (width, height) {
			if (this._vscroll_width != width || this._hscroll_height != height) {
				this._vscroll_width = width;
				this._hscroll_height = height;
				if (this._scroll_showtype >= 0) {
					this._updateClientSize();
				}
				return true;
			}
			return false;
		};

		_pScrollableControlElement.setElementInitPosSize = function (left, top, width, height) {
		};

		delete _pControlElementBase;
		delete _pSimpleControlElement;
		delete _pControlElement;
		delete _pFrameControlElement;
		delete _pScrollableControlElement;


		nexacro.ContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pContainerElement = nexacro._createPrototype(nexacro.Element, nexacro.ContainerElement);
		nexacro.ContainerElement.prototype = _pContainerElement;
		_pContainerElement._type_name = "ContainerElement";

		_pContainerElement.font = null;
		_pContainerElement.color = null;
		_pContainerElement._is_nc_element = true;

		_pContainerElement.create = function () {
			var _owner_elem = this._parent_elem;
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle._linked_element = this;
				_handle._element_type = 2;

				nexacro.__setDOMNodeSelectable(_handle, false);

				nexacro.AccessibilityUtil.supportMobileApplicationAccessibility(_handle);

				var handle_style = _handle.style;

				if (nexacro.Browser == "IE" && (nexacro.BrowserVersion >= 8 && nexacro.BrowserVersion <= 9)) {
					nexacro.__setDOMNodeStyleFilterTransparent(handle_style);
				}
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
			}
		};

		_pContainerElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pContainerElement.clearContents = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle) {
				_handle._linked_element = null;
				if (_owner_elem) {
					nexacro.__removeDOMNode(_owner_elem._handle, _handle);
				}
				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
		};

		_pContainerElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this.parent_elem) {
					if (child_elem._handle) {
						var old_doc = child_elem.getRootWindowHandle();
						var new_doc = this.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this.parent_elem;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this.parent_elem;
						}
					}
					else {
						child_elem._parent_elem = this.parent_elem;
					}
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					child_elem._appendToContainer(this);
				}
			}
		};
		_pContainerElement.removeChildElement = function (child_elem) {
			if (child_elem._owner_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pContainerElement.moveToNextElement = function (cur_elem, target_elem) {
			if (cur_elem && target_elem && cur_elem._owner_elem == this && target_elem._owner_elem == this && cur_elem._handle && target_elem._handle) {
				nexacro.__setElementHandleMoveToNext(cur_elem._handle, target_elem._handle);
			}
		};
		_pContainerElement.moveToPrevElement = function (cur_elem, target_elem) {
			if (cur_elem && target_elem && cur_elem._owner_elem == this && target_elem._owner_elem == this && cur_elem._handle && target_elem._handle) {
				nexacro.__setElementHandleMoveToPrev(cur_elem._handle, target_elem._handle);
			}
		};
		_pContainerElement.sendToBackElement = function (cur_elem) {
			if (cur_elem && cur_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleSendToBack(cur_elem._handle);
			}
		};
		_pContainerElement.bringToFrontElement = function (cur_elem) {
			if (cur_elem && cur_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleBringToFront(cur_elem._handle);
			}
		};

		_pContainerElement.setElementFont = nexacro._emptyFn;
		_pContainerElement.setElementColor = function (color) {
			this.color = color;
			if (this._handle) {
				nexacro.__setDOMNodeStyleColor(this._handle.style, color);
			}
		};

		delete _pContainerElement;


		nexacro.ScrollableContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pScrollableContainerElement = nexacro._createPrototype(nexacro.ContainerElement, nexacro.ScrollableContainerElement);
		nexacro.ScrollableContainerElement.prototype = _pScrollableContainerElement;
		_pScrollableContainerElement._type_name = "ScrollableContainerElement";

		_pScrollableContainerElement._scroll_left = 0;
		_pScrollableContainerElement._scroll_top = 0;

		_pScrollableContainerElement._cached_scrollTop = 0;
		_pScrollableContainerElement._cached_scrollLeft = 0;

		_pScrollableContainerElement.create = function () {
			var _owner_elem = this._parent_elem;
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 3;

				nexacro.__setDOMNodeSelectable(_handle, false);
				nexacro.AccessibilityUtil.supportMobileApplicationAccessibility(_handle);
				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsoluteTransparent(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

				if (this._scroll_left != 0 || this._scroll_top != 0) {
					nexacro.__setDOMNodeOffset(_handle, this._scroll_left, this._scroll_top);
				}

				nexacro._observeSysEvent(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			}
		};

		_pScrollableContainerElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro._stopSysObserving(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);

				_handle._linked_element = null;
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pScrollableContainerElement.clearContents = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle) {
				nexacro._stopSysObserving(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);

				_handle._linked_element = null;
				if (_owner_elem && _owner_elem._handle) {
					nexacro.__removeDOMNode(_owner_elem._handle, _handle);
				}
				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			if (nexacro.BrowserVersion <= 8) {
				_pScrollableContainerElement._syshandler_onscroll_forward = function (evt) {
					if ((!evt || evt.type != "scroll") && window.event) {
						evt = window.event;
					}
					if (evt.type != "scroll") {
						return;
					}

					var target = evt.srcElement;
					if (!target) {
						return;
					}

					var container = target._linked_element;
					if (container) {
						var parent_elem = container.parent;
						var retn = false;

						if (parent_elem._recover_vpos != undefined) {
							target.scrollTop = parent_elem._recover_vpos;
							retn = true;
						}
						if (parent_elem._recover_hpos != undefined) {
							target.scrollLeft = parent_elem._recover_hpos;
							retn = true;
						}

						if (retn) {
							return;
						}

						var elem_scroll_top = container._scroll_top | 0;
						var elem_scroll_left = container._scroll_left | 0;

						container._cached_scrollLeft = target.scrollLeft;
						container._cached_scrollTop = target.scrollTop;

						if (elem_scroll_left != container._cached_scrollLeft) {
							var linkedcontrol = container._findScrollbarLinkedControl(container, false);
							if (linkedcontrol) {
								linkedcontrol.hscrollbar.set_pos(container._cached_scrollLeft);
							}
						}

						if (elem_scroll_top != container._cached_scrollTop) {
							var linkedcontrol = container._findScrollbarLinkedControl(container, true);
							if (linkedcontrol) {
								linkedcontrol.vscrollbar.set_pos(container._cached_scrollTop);
							}
						}
					}
				};
			}
			else {
				_pScrollableContainerElement._syshandler_onscroll_forward = function (evt) {
					if ((!evt || evt.type != "scroll") && window.event) {
						evt = window.event;
					}
					if (evt.type != "scroll") {
						return;
					}

					var target = evt.srcElement;
					if (!target) {
						return;
					}

					var container = target._linked_element;
					if (container) {
						var parent_elem = container.parent;
						var retn = false;

						if (parent_elem._recover_vpos != undefined) {
							target.scrollTop = parent_elem._recover_vpos;
							parent_elem._recover_vpos = undefined;
							retn = true;
						}
						if (parent_elem._recover_hpos != undefined) {
							target.scrollLeft = parent_elem._recover_hpos;
							parent_elem._recover_hpos = undefined;
							retn = true;
						}

						if (retn) {
							return;
						}

						var elem_scroll_top = container._scroll_top | 0;
						var elem_scroll_left = container._scroll_left | 0;

						container._cached_scrollLeft = target.scrollLeft;
						container._cached_scrollTop = target.scrollTop;

						if (elem_scroll_left != container._cached_scrollLeft) {
							var linkedcontrol = container._findScrollbarLinkedControl(container, false);
							if (linkedcontrol) {
								linkedcontrol.hscrollbar.set_pos(container._cached_scrollLeft);
							}
						}

						if (elem_scroll_top != container._cached_scrollTop) {
							var linkedcontrol = container._findScrollbarLinkedControl(container, true);
							if (linkedcontrol) {
								linkedcontrol.vscrollbar.set_pos(container._cached_scrollTop);
							}
						}
					}
				};
			}
		}
		else {
			_pScrollableContainerElement._syshandler_onscroll_forward = function (evt) {
				var target = evt.target;
				var container = target._linked_element;
				if (container) {
					var parent_elem = container.parent;

					if (parent_elem._recover_vpos != undefined) {
						target.scrollTop = parent_elem._recover_vpos;
						parent_elem._recover_vpos = undefined;
						return;
					}
					if (parent_elem._recover_hpos != undefined) {
						target.scrollLeft = parent_elem._recover_hpos;
						parent_elem._recover_hpos = undefined;
						return;
					}

					var elem_scroll_top = container._scroll_top | 0;
					var elem_scroll_left = container._scroll_left | 0;

					container._cached_scrollLeft = target.scrollLeft;
					container._cached_scrollTop = target.scrollTop;

					if (elem_scroll_left != container._cached_scrollLeft) {
						var linkedcontrol = container._findScrollbarLinkedControl(container, false);
						if (linkedcontrol) {
							linkedcontrol.hscrollbar.set_pos(container._cached_scrollLeft);
						}
					}

					if (elem_scroll_top != container._cached_scrollTop) {
						var linkedcontrol = container._findScrollbarLinkedControl(container, true);
						if (linkedcontrol) {
							linkedcontrol.vscrollbar.set_pos(container._cached_scrollTop);
						}
					}
				}
			};
		}

		_pScrollableContainerElement._findScrollbarLinkedControl = function (elem, is_vert) {
			while (elem) {
				var linkedcontrol = elem.linkedcontrol;
				if (linkedcontrol) {
					if (is_vert) {
						if (linkedcontrol.vscrollbar && linkedcontrol.vscrollbar._isVisible()) {
							return linkedcontrol;
						}
					}
					else {
						if (linkedcontrol.hscrollbar && linkedcontrol.hscrollbar._isVisible()) {
							return linkedcontrol;
						}
					}
				}

				elem = elem.parent;
			}
		};

		_pScrollableContainerElement.setElementVScrollPos = function (vpos) {
			if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_top = vpos;
				var _handle = this._handle;
				if (_handle) {
					if (this._cached_scrollTop != vpos) {
						nexacro.__setDOMNodeVScrollPos(_handle, vpos);
					}
				}
			}
		};

		_pScrollableContainerElement.setElementHScrollPos = function (hpos) {
			if (this._scroll_left != hpos || this.parent._reset_scrollpos) {
				this._scroll_left = hpos;
				var _handle = this._handle;
				if (_handle) {
					if (this._cached_scrollLeft != hpos) {
						nexacro.__setDOMNodeHScrollPos(_handle, hpos);
					}
				}
			}
		};

		_pScrollableContainerElement.setElementScrollPos = function (hpos, vpos) {
			if (this._scroll_left != hpos || this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_left = hpos;
				this._scroll_top = vpos;
				var _handle = this._handle;
				if (_handle) {
					if (this._cached_scrollTop != vpos) {
						nexacro.__setDOMNodeVScrollPos(_handle, vpos);
					}
					if (this._cached_scrollLeft != hpos) {
						nexacro.__setDOMNodeHScrollPos(_handle, hpos);
					}
				}
			}
		};

		_pScrollableContainerElement.getZoom = function () {
			if (this._handle) {
				var scalevalue = nexacro.__getDOMNodeStyleTransformcale(this._handle.style);
				if (scalevalue) {
					return parseInt(scalevalue * 100.0);
				}

				return 100;
			}
			return 100;
		};
		_pScrollableContainerElement.setZoom = function (zoomFactor) {
			if (this._handle) {
				nexacro.__setDOMNodeStyleTransformScale(this._handle.style, zoomFactor / 100);
			}
		};
		delete _pScrollableContainerElement;

		nexacro.ScrollableInnerContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pScrollableInnerContainerElement = nexacro._createPrototype(nexacro.ScrollableContainerElement, nexacro.ScrollableInnerContainerElement);
		nexacro.ScrollableInnerContainerElement.prototype = _pScrollableInnerContainerElement;
		_pScrollableInnerContainerElement._type_name = "ScrollableInnerContainerElement";


		_pScrollableInnerContainerElement.create = function () {
			var _owner_elem = this._parent_elem;
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 3;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var _dest_handle = _doc.createElement("div");
				_dest_handle.id = _handle.id + "_inner";

				nexacro.__setDOMNodeSelectable(_dest_handle, false);

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsoluteTransparent(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

				var inner_style = _dest_handle.style;
				inner_style.position = "absolute";
				nexacro.__setDOMNodeStylePos(inner_style, 0, 0);
				nexacro.__setDOMNodeStyleSize(inner_style, this.width, this.height);

				if (this.font) {
					nexacro.__setDOMNodeStyleFont(inner_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(inner_style, this.color);
				}

				this._handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

				nexacro.__appendDOMNode(_handle, _dest_handle);
				this._dest_handle = _dest_handle;

				if (this._scroll_left != 0 || this._scroll_top != 0) {
					nexacro.__setDOMNodeStyleTranslate(inner_style, -this._scroll_left, -this._scroll_top);
				}
				nexacro._observeSysEvent(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			}
		};

		_pScrollableInnerContainerElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro._stopSysObserving(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				_handle._linked_element = null;
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pScrollableInnerContainerElement._noEventScroll = false;

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pScrollableInnerContainerElement._syshandler_onscroll_forward = function (evt) {
				if ((!evt || evt.type != "scroll") && window.event) {
					evt = window.event;
				}
				if (evt.type != "scroll") {
					return;
				}

				var target = evt.srcElement;
				if (!target) {
					return;
				}

				var container = target._linked_element;

				if (container) {
					if (target.scrollLeft > 0) {
						target.scrollLeft = 0;
					}
					if (target.scrollTop > 0) {
						target.scrollTop = 0;
					}
				}
			};
		}
		else {
			_pScrollableInnerContainerElement._syshandler_onscroll_forward = function (evt) {
				var target = evt.target;
				var container = target._linked_element;
				if (container) {
					if (target.scrollLeft > 0) {
						target.scrollLeft = 0;
					}
					if (target.scrollTop > 0) {
						target.scrollTop = 0;
					}
				}
			};
		}

		_pScrollableInnerContainerElement.setElementVScrollPos = function (vpos) {
			if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_top = vpos;
				var _inner_handle = this._dest_handle;
				if (_inner_handle) {
					nexacro.__setDOMNodeStyleTranslateY(_inner_handle.style, -vpos);
				}
			}
		};

		_pScrollableInnerContainerElement.setElementHScrollPos = function (hpos) {
			if (this._scroll_left != hpos || this.parent._reset_scrollpos) {
				this._scroll_left = hpos;
				var _inner_handle = this._dest_handle;
				if (_inner_handle) {
					nexacro.__setDOMNodeStyleTranslateX(_inner_handle.style, -hpos);
				}
			}
		};

		_pScrollableInnerContainerElement.setElementScrollPos = function (hpos, vpos) {
			if (this._scroll_left != hpos || this._scroll_top != vpos) {
				this._scroll_left = hpos;
				this._scroll_top = vpos;
				var _inner_handle = this._dest_handle;
				if (_inner_handle) {
					nexacro.__setDOMNodeStyleTranslate(_inner_handle.style, -hpos, -vpos);
				}
			}
		};

		_pScrollableInnerContainerElement.setElementScrollMaxSize = function (width, height) {
			var _inner_handle = this._dest_handle;
			if (_inner_handle) {
				nexacro.__setDOMNodeStyleSize(_inner_handle.style, width, height);
			}
		};

		delete _pScrollableInnerContainerElement;

		nexacro.PopupControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;
			this._frame_node = null;
		};

		var _pPopupControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.PopupControlElement);
		nexacro.PopupControlElement.prototype = _pPopupControlElement;

		_pPopupControlElement._type_name = "PopupControlElement";

		_pPopupControlElement._doc = null;
		_pPopupControlElement._is_window_element = false;

		_pPopupControlElement.create = function () {
			if (this._parent_elem == null) {
				if (!this._handle) {
					var linkedcontrol = this.linkedcontrol;

					var _win = this.linkedcontrol._getWindow();
					var _doc = this._doc = _win._doc;
					var _owner_elem = _win;
					this._is_window_element = true;

					var _handle = _doc.createElement("div");
					linkedcontrol._unique_id = linkedcontrol.parent._unique_id + '_' + linkedcontrol.id;
					_handle.id = linkedcontrol._unique_id;
					_handle._linked_element = this;
					_handle._element_type = 1;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;

					if (linkedcontrol._findOwnerElementHandle) {
						var owner_elem_info = linkedcontrol._findOwnerElementHandle();
						if (owner_elem_info.is_append) {
							nexacro.__appendDOMNode(owner_elem_info.owner_handle, _handle);
						}
						else {
							owner_elem_info.owner_handle.insertBefore(_handle, owner_elem_info.ref_handle);
						}
						this._owner_elem = owner_elem_info.owner_handle._linked_element;
					}
					else {
						nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
						this._owner_elem = _owner_elem;
					}


					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);

					this._frame_node = nexacro._createFrameNode(_handle, this.left, this.top, _doc);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};

		_pPopupControlElement.getRootWindowHandle = function () {
			return this._doc;
		};

		_pPopupControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				nexacro._destroyFrameNode(_handle, this._frame_node);
				this._frame_node = null;

				this._owner_elem = null;
				this._doc = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();
				this._client_element.destroy();
				this._client_element = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		delete _pPopupControlElement;


		nexacro.PopupScrollableControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ScrollableContainerElement(this);
			this._client_element = client_element;
			this._frame_node = null;
		};
		var _pPopupScrollableControlElement = nexacro._createPrototype(nexacro.ScrollableControlElement, nexacro.PopupScrollableControlElement);
		nexacro.PopupScrollableControlElement.prototype = _pPopupScrollableControlElement;
		_pPopupScrollableControlElement._type_name = "PopupScrollableControlElement";

		_pPopupScrollableControlElement._doc = null;
		_pPopupScrollableControlElement._is_window_element = true;

		_pPopupScrollableControlElement.create = function (_window) {
			if (this._parent_elem == null) {
				if (!this._handle) {
					var _win = this.linkedcontrol._getWindow();
					var _doc = this._doc = _win._doc;
					var _owner_elem = _win;

					this._is_window_element = true;

					var _handle = _doc.createElement("div");
					var linkedcontrol = this.linkedcontrol;
					linkedcontrol._unique_id = linkedcontrol.parent._unique_id + '_' + linkedcontrol.id;
					_handle.id = linkedcontrol._unique_id;
					_handle._linked_element = this;
					_handle._element_type = 1;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;
					if (linkedcontrol._findOwnerElementHandle) {
						var owner_elem_info = linkedcontrol._findOwnerElementHandle();
						if (owner_elem_info.is_append) {
							nexacro.__appendDOMNode(owner_elem_info.owner_handle, _handle);
						}
						else {
							owner_elem_info.owner_handle.insertBefore(_handle, owner_elem_info.ref_handle);
						}
						this._owner_elem = owner_elem_info.owner_handle._linked_element;
					}
					else {
						nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
						this._owner_elem = _owner_elem;
					}

					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);

					this._frame_node = nexacro._createFrameNode(_handle, this.left, this.top, _doc);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};

		_pPopupScrollableControlElement.getRootWindowHandle = function () {
			return this._doc;
		};

		_pPopupScrollableControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				nexacro._destroyFrameNode(_handle, this._frame_node);
				this._frame_node = null;

				this._owner_elem = null;
				this._doc = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();

				this._client_element.destroy();
				this._client_element = null;

				this._hscroll_control = null;
				this._vscroll_control = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pPopupScrollableControlElement.clearContents = function () {
			if (this._handle) {
				this._client_element.clearContents();
			}
		};

		delete _pPopupScrollableControlElement;

		nexacro.TextElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pTextElement = nexacro._createPrototype(nexacro.Element, nexacro.TextElement);
		nexacro.TextElement.prototype = _pTextElement;
		_pTextElement._type_name = "TextElement";

		_pTextElement.font = null;
		_pTextElement.color = null;
		_pTextElement.align = null;
		_pTextElement.halign = "";
		_pTextElement.valign = "";
		_pTextElement.padding = null;
		_pTextElement.padding_left = 0;
		_pTextElement.padding_top = 0;
		_pTextElement.padding_right = 0;
		_pTextElement.padding_bottom = 0;
		_pTextElement.text = "";
		_pTextElement.linespace = 0;
		_pTextElement.letterspace = 0;
		_pTextElement.wordwrap = "none";
		_pTextElement.decoration = "";

		_pTextElement._use_newline = true;

		_pTextElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;

				_handle._linked_element = this;
				_handle._element_type = 4;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleTextSize(handle_style, this.height);
				handle_style.position = "absolute";
				nexacro.__setDOMNodeStyleTextOverFlow(handle_style);
				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}
				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}

				if (this.align) {
					nexacro.__setDOMNodeStyleAlign(_owner_elem._handle.style, this.align);
				}
				else if (this.halign && this.valign) {
					nexacro.__setDOMNodeStyleAlignXY(_owner_elem._handle.style, this.halign, this.valign);
				}

				if (this.padding) {
					nexacro.__setDOMNodeStylePadding(handle_style, this.padding);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					nexacro.__setDOMNodeStylePaddingXY(handle_style, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
				}

				if (this.linespace > 0) {
					nexacro.__setDOMNodeStyleLineSpace(handle_style, this.linespace);
				}

				if (this.wordwrap != "none") {
					nexacro.__setDOMNodeWordWrap(_handle, this.wordwrap);
				}

				if (this.decoration) {
					nexacro.__setDOMNodeStyleDecorateText(handle_style, this.decoration);
				}
				else {
					nexacro.__setDOMNodeText(_handle, this.text, this._use_newline, this.wordwrap);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
			}
		};

		_pTextElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pTextElement.setElementFont = function (font) {
			this.font = font;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeStyleFont(_handle.style, font);
			}
		};

		_pTextElement.setElementColor = function (color) {
			this.color = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeStyleColor(_handle.style, color);
			}
		};

		_pTextElement.setElementPadding = function (padding) {
			this.padding = padding;
			this.padding_left = 0;
			this.padding_top = 0;
			this.padding_right = 0;
			this.padding_bottom = 0;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeStylePadding(_handle.style, padding);
			}
		};
		_pTextElement.setElementPaddingXY = function (left, top, right, bottom) {
			this.padding = null;
			this.padding_left = left;
			this.padding_top = top;
			this.padding_right = right;
			this.padding_bottom = bottom;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setDOMNodeStylePaddingXY(_handle.style, left, top, right, bottom);
			}
		};

		_pTextElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var owner_elem = this._owner_elem;
			if (owner_elem) {
				var _handle = owner_elem._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleAlign(_handle.style, align);
				}
			}
		};
		_pTextElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = halign == "left" ? "right" : (halign == "right" ? "left" : halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var owner_elem = this._owner_elem;
			if (owner_elem) {
				var _handle = owner_elem._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleAlignXY(_handle.style, _halign, valign);
				}
			}
		};

		_pTextElement.setElementText = function (text) {
			if (this.text != text) {
				if (text == null) {
					this.text = "";
				}
				else {
					this.text = text;
				}

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeText(_handle, this.text, this._use_newline, this.wordwrap);
				}
			}
		};

		_pTextElement.setElementLineSpace = function (linespace) {
			if (this.linespace != linespace) {
				this.linespace = linespace;
				var _handle = this._handle;
				if (_handle) {
					var comp = this._parent_elem.linkedcontrol;
					if (comp) {
						var font_size = nexacro._getTextSize2(this.letterspace || this._getParentLetterSpace(), "Wj", this.font || this._getParentFont());
						linespace = font_size[1] + nexacro._toInt(linespace);
					}

					nexacro.__setDOMNodeStyleLineSpace(_handle.style, linespace);
				}
			}
		};

		_pTextElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleLetterSpace(_handle.style, letterspace);
				}
			}
		};

		_pTextElement.setElementDecorateText = function (text) {
			if (this.decoration != text) {
				this.decoration = text;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleDecorateText(_handle, text);
				}
			}
		};

		_pTextElement.setElementUseNewLine = function (use_newline) {
			if (this._use_newline != use_newline) {
				this._use_newline = use_newline;

				var _handle = this._handle;
				if (_handle) {
					if (this.wordwrap != "none") {
						return;
					}

					nexacro.__setDOMNodeText(_handle, this.text, use_newline, this.wordwrap);
				}
			}
		};

		_pTextElement.setElementWordWrap = function (wordwrap) {
			if (wordwrap == true || wordwrap == "true") {
				wordwrap = "char";
			}
			else if (wordwrap == false || wordwrap == "false") {
				wordwrap = "none";
			}

			if (this.wordwrap != wordwrap) {
				var handle = this._handle;
				if (handle) {
					nexacro.__setDOMNodeText(handle, this.text, this._use_newline, this.wordwrap);
				}
			}
		};

		_pTextElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStylePos(_handle.style, left, top);
				}
			}
		};
		_pTextElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
				}
				_handle = this._cell_node;
				if (_handle) {
					_handle.style.textOverflow = "";
					nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
					_handle.style.textOverflow = this._default_textoverflow;
				}
			}
		};

		delete _pTextElement;


		nexacro.PluginElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			this._params = new nexacro.Collection();
			this._events = new nexacro.Collection();
		};

		var _pPluginElement = nexacro._createPrototype(nexacro.Element, nexacro.PluginElement);
		nexacro.PluginElement.prototype = _pPluginElement;
		_pPluginElement._type_name = "PluginElement";

		_pPluginElement.license = "";
		_pPluginElement.lpkpath = "";
		_pPluginElement.classid = "";
		_pPluginElement.codebase = "";
		_pPluginElement.code = "";
		_pPluginElement.archive = "";
		_pPluginElement.mimetype = "";

		_pPluginElement.pluginsrc = "";
		_pPluginElement.plugintype = "";
		_pPluginElement.pluginpage = "";

		_pPluginElement.windowed = false;
		_pPluginElement.popupstyle = false;

		_pPluginElement.enable = true;
		_pPluginElement.font = null;
		_pPluginElement.color = null;
		_pPluginElement.cursor = null;
		_pPluginElement.align = null;
		_pPluginElement.padding = null;
		_pPluginElement.color = null;

		_pPluginElement._object_node = null;
		_pPluginElement._embed_node = null;
		_pPluginElement._params = null;
		_pPluginElement._events = null;
		_pPluginElement._object_id = null;

		_pPluginElement.create = function () {
			var _owner_elem;
			var _doc;
			if (!this._parent_elem) {
				_doc = nexacro._managerFrameDoc;
				_owner_elem = _doc.body;
				this._owner_elem = _doc.body;
				this._owner_elem._dest_handle = _doc.body;
			}
			else {
				_owner_elem = this._parent_elem.getContainerElement(this.position_step);
				if (_owner_elem && _owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					_doc = _owner_elem.getRootWindowHandle();
				}
			}


			if (_owner_elem && !this._handle) {
				var _handle = this._createObjectElementHandle(_doc, this.left, this.top, this.width, this.height, this._params);
				nexacro.__setDOMNodeSelectable(_handle, false);
				var handle_style = _handle.style;
				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}

				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}

				if (this.align) {
					nexacro.__setDOMNodeStyleAlign(handle_style, this.align);
				}

				if (this.padding) {
					nexacro.__setDOMNodeStylePadding(handle_style, this.padding);
				}

				this._handle = this._dest_handle = _handle;

				var events = this._events;
				var event_cnt = events.length;
				for (var i = 0; i < event_cnt; i++) {
					this.addEventHandler(events.get_id(i), events.get_item(i), null);
				}

				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
			}
		};

		_pPluginElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;
				this._object_node = null;
				this._embed_node = null;
			}
			this.parent = null;
			this._parent_elem = null;

			var params = this._params;
			if (params) {
				params.destroy();
				this._params = null;
			}

			var events = this._events;
			if (events) {
				events.destroy();
				this._events = null;
			}
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
				var _handle = _doc.createElement("div");

				_handle._linked_element = this;
				_handle._element_type = 8;

				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeStyleSize(handle_style, width, height);

				var innerHtml = "";
				if (this.lpkpath) {
					innerHtml += '<object classid = "clsid:5220cb21-c88d-11cf-b347-00aa00a28331">';
					innerHtml += '<param name="LPKPath" value="' + this.lpkpath + '">';
					innerHtml += '<embed src= "' + this.lpkpath + '" ></embed>';
					innerHtml += '</object>';
				}

				if (this._parent_elem && this.component) {
					this._object_id = this._parent_elem._handle.id + '_' + this.component._type_name;
					innerHtml += '<object id=' + this._object_id + ' style="position: absolute; overflow: hidden; width: ' + width + 'px; height: ' + height + 'px;" ';
				}
				else {
					innerHtml += '<object style="position: absolute; overflow: hidden; width: ' + width + 'px; height: ' + height + 'px;" ';
				}

				var classid = this.classid;
				if (classid) {
					innerHtml += 'classid="' + classid + '" ';
				}

				var codebase = this.codebase;
				if (codebase) {
					innerHtml += 'codebase="' + codebase + '" ';
				}

				var code = this.code;
				if (code) {
					innerHtml += 'code="' + code + '" ';
				}

				var archive = this.archive;
				if (archive) {
					innerHtml += 'archive="' + archive + '" ';
				}

				var mimetype = this.mimetype;
				if (mimetype) {
					innerHtml += 'type="' + mimetype + '" ';
				}

				var data = this.data;
				if (data) {
					innerHtml += 'data="' + data + '" ';
				}
				innerHtml += '>';

				var param_cnt = (params ? params.length : 0);
				for (var i = 0; i < param_cnt; i++) {
					innerHtml += '<param name="' + params.get_id(i) + '" value="' + params.get_item(i) + '" />';
				}

				var has_embed_node = false;
				if (nexacro.BrowserVersion >= 9) {
					if (this.pluginsrc || this.pluginpage) {
						has_embed_node = true;
						innerHtml += '<embed width="' + width + '" height="' + height + '" ';

						var pluginsrc = this.pluginsrc;
						if (pluginsrc) {
							innerHtml += 'src="' + pluginsrc + '" ';
						}

						var pluginpage = this.pluginpage;
						if (pluginpage) {
							innerHtml += 'pluginspage="' + pluginpage + '" ';
						}

						var plugintype = this.plugintype;
						if (plugintype) {
							innerHtml += 'type="' + plugintype + '" ';
						}
						for (var i = 0; i < param_cnt; i++) {
							innerHtml += params.get_id(i) + '="' + params.get_item(i) + '" ';
						}
						innerHtml += '/>';
					}
				}
				innerHtml += "</object>";

				_handle.innerHTML = innerHtml;

				var _object_node = null;
				var _child_node = _handle.firstChild;
				while (_child_node) {
					if (_child_node.nodeType == 1 && _child_node.tagName.toLowerCase() == "object") {
						_object_node = _child_node;
					}
					_child_node = _child_node.nextSibling;
				}

				this._object_node = _object_node;

				if (_object_node && has_embed_node) {
					var _embed_node = null;
					var _nodes = _object_node.getElementsByTagName("embed");
					if (_nodes && _nodes.length > 0) {
						_embed_node = _nodes[0];
					}
					this._embed_node = _embed_node;
				}
				return _handle;
			};
		}
		else {
			_pPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
				var _handle = _doc.createElement("object");

				_handle._linked_element = this;
				_handle._element_type = 8;

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeStyleSize(handle_style, width, height);

				var codebase = this.codebase;
				if (codebase) {
					_handle.setAttribute('codebase', codebase);
				}

				var code = this.code;
				if (code) {
					_handle.setAttribute('code', code);
				}

				var archive = this.archive;
				if (archive) {
					_handle.setAttribute('archive', archive);
				}

				if (nexacro.Browser == "Chrome") {
					var mimetype = this.mimetype;
					if (mimetype) {
						_handle.setAttribute('type', mimetype);
					}
				}

				var param_cnt = (params ? params.length : 0);
				for (var i = 0; i < param_cnt; i++) {
					this._setObjectDOMParam(_doc, _handle, params.get_id(i), params.get_item(i));
				}

				if (this.pluginsrc || this.pluginpage) {
					var _embed_node = _doc.createElement("embed");

					var node_style = _embed_node.style;
					nexacro.__setDOMNodeStyleAbsolute(node_style);
					nexacro.__setDOMNodeStyleSize(node_style, width, height);

					var pluginsrc = this.pluginsrc;
					if (pluginsrc) {
						_embed_node.setAttribute('src', pluginsrc);
					}

					var pluginpage = this.pluginpage;
					if (pluginpage) {
						_embed_node.setAttribute('pluginspage', pluginpage);
					}

					var plugintype = this.plugintype;
					if (plugintype) {
						_embed_node.setAttribute('type', plugintype);
					}

					for (var i = 0; i < param_cnt; i++) {
						_embed_node.setAttribute(params.get_id(i), params.get_item(i));
					}

					this._embed_node = _embed_node;
					_handle.appendChild(_embed_node);
				}

				this._object_node = _handle;
				return _handle;
			};
		}

		_pPluginElement._setObjectDOMParam = function (_doc, target_handle, name, value) {
			var param_node = _doc.createElement("param");
			param_node.setAttribute("name", name);
			param_node.setAttribute("value", value);
			target_handle.appendChild(param_node);
		};

		_pPluginElement.on_update_position = function (resize_flag, move_flag, newleft, newtop) {
			var _handle = this._object_node;
			if (_handle) {
				var handle_style = _handle.style;

				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				if (move_flag) {
					nexacro.__setDOMNodeStylePos(handle_style, newleft, newtop);
				}
				if (resize_flag) {
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);
				}
			}
		};

		_pPluginElement.setElementFocus = function (selffocus) {
			var _handle = this._object_node;
			if (_handle) {
				nexacro.__setDOMNodeFocus(_handle, true);
				nexacro.__setLastFocusedElement(this);
			}
		};

		_pPluginElement.setElementLicense = function (license) {
			if (this.license != license) {
				this.license = license;
			}
		};

		_pPluginElement.setElementLicenseFile = function (lpkpath) {
			if (!this._handle && this.lpkpath != lpkpath) {
				this.lpkpath = lpkpath;
			}
		};

		_pPluginElement.setElementMIMEType = function (mimetype) {
			if (this.mimetype != mimetype) {
				this.mimetype = mimetype;
				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					_object_node.setAttribute('type', mimetype);
				}
			}
			if (this.plugintype != mimetype) {
				this.plugintype = mimetype;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					var _embed_node = this._embed_node;
					if (_embed_node == null) {
						var _doc = this.getRootWindowHandle();
						this._embed_node = _embed_node = _doc.createElement("embed");
						_object_node.appendChild(_embed_node);
					}
					_embed_node.setAttribute('type', type);
				}
			}
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pPluginElement.setElementClassId = function (classid) {
				if (classid) {
					if (classid.charAt(0) == '{') {
					}
					{

						var clsid = classid.replace(/\{|\}/g, "");
						classid = "clsid:" + clsid;
					}
				}

				if (this.classid != classid) {
					this.classid = classid;

					var _object_node = this._object_node;
					if (this._handle && this._object_node) {
						_object_node.setAttribute('classid', classid);
					}
				}
			};
		}
		else {
			_pPluginElement.setElementClassId = nexacro._emptyFn;
		}

		_pPluginElement.setElementCodebase = function (codebase) {
			if (this.codebase != codebase) {
				this.codebase = codebase;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					_object_node.setAttribute('codebase', codebase);
				}
			}
		};

		_pPluginElement.setElementCode = function (code) {
			if (this.code != code) {
				this.code = code;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					_object_node.setAttribute('code', code);
				}
			}
		};

		_pPluginElement.setElementArchive = function (archive) {
			if (this.archive != archive) {
				this.archive = archive;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					_object_node.setAttribute('archive', archive);
				}
			}
		};

		_pPluginElement.getElementParam = function (name) {
			if (this._handle && this._object_node) {
				var obj_node = this._object_node;
				var param = obj_node.getElementsByTagName("param");
				for (var i in param) {
					if (param[i].name == name) {
						return param[i].value;
					}
				}
				if (this._object_node[name]) {
					return this._object_node[name];
				}
			}
			else {
				var params = this._params;
				return params.get_item(name);
			}
		};

		_pPluginElement.setElementParam = function (name, value) {
			var obj_node = this._object_node;
			if (this._handle && obj_node) {
				var _doc = this.getRootWindowHandle();
				var param = obj_node.getElementsByTagName("param");
				for (var i in param) {
					if (param[i].name == name) {
						param[i].value = value;
						this._object_node[name] = value;
						return;
					}
				}
				this._setObjectDOMParam(_doc, obj_node, name, value);
				this._object_node[name] = value;
			}
			else {
				var params = this._params;
				if (params.get_item(name)) {
					params.set_item(name, value);
				}
				else {
					params.add_item(name, value);
				}
			}
		};

		_pPluginElement.setElementPluginSrc = function (src) {
			if (this.pluginsrc != src) {
				this.pluginsrc = src;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					var _embed_node = this._embed_node;
					if (_embed_node == null) {
						var _doc = this.getRootWindowHandle();
						this._embed_node = _embed_node = _doc.createElement("embed");
						var embed_node_style = _embed_node.style;
						nexacro.__setDOMNodeStyleAbsolute(embed_node_style);
						nexacro.__setDOMNodeStylePos(embed_node_style, this.left, this.top);
						nexacro.__setDOMNodeStyleSize(embed_node_style, this.width, this.height);
						_object_node.appendChild(_embed_node);
					}
					_embed_node.setAttribute('src', src);
				}
			}
		};

		_pPluginElement.setElementPluginMIMEType = function (type) {
			if (this.plugintype != type) {
				this.plugintype = type;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					var _embed_node = this._embed_node;
					if (_embed_node == null) {
						var _doc = this.getRootWindowHandle();
						this._embed_node = _embed_node = _doc.createElement("embed");
						_object_node.appendChild(_embed_node);
					}
					_embed_node.setAttribute('type', type);
				}
			}
		};

		_pPluginElement.setElementPluginPage = function (pluginpage) {
			if (this.pluginpage != pluginpage) {
				this.pluginpage = pluginpage;

				var _object_node = this._object_node;
				if (this._handle && this._object_node) {
					var _embed_node = this._embed_node;
					if (_embed_node == null) {
						var _doc = this.getRootWindowHandle();
						this._embed_node = _embed_node = _doc.createElement("embed");
						_object_node.appendChild(_embed_node);
					}
					_embed_node.setAttribute('pluginspage', pluginpage);
				}
			}
		};

		_pPluginElement.callMethod = function () {
			if (arguments.length < 1) {
				return;
			}

			if (this._handle && this._object_node) {
				var fn_name = Array.prototype.shift.call(arguments);
				var str;



				if (this._object_id) {
					str = this._object_id + '.' + fn_name;
				}
				else if (this._embed_node) {
					str = 'this._embed_node.' + fn_name;
				}
				else {
					str = 'this._object_node.' + fn_name;
				}

				str += '(';
				var len = arguments.length;
				if (len > 0) {
					str += 'arguments[0]';
					for (var i = 1; i < len; i++) {
						str += ', arguments[' + i + ']';
					}
				}
				str += ');';

				return eval(str);
			}
		};

		_pPluginElement.getPluginObject = function () {
			if (this._handle && this._object_node) {
				var obj = new nexacro.PluginObject;
				obj._handle = this._object_node;
				obj._doc = this.getRootWindowHandle();
				return obj;
			}
		};


		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pPluginElement.addEventHandler = function (name, callback, target) {
				if (this._handle && this._object_node && this._object_id) {
					var _doc = this.getRootWindowHandle();
					var _script_node = _doc.createElement("script");

					_script_node.setAttribute('for', this._object_id);

					var nameFromToStringRegex = /^function\s?([^\s(]*)/;
					var paramsFromToStringRegex = /\(.*?\)/;
					var params = callback.toString().match(paramsFromToStringRegex)[0];
					var eventValue = name + params;
					var callfunc;

					_script_node.setAttribute('event', eventValue);
					_script_node.setAttribute('language', 'javascript');

					var parentFrame, parentFrame2;
					parentFrame = this.component.parent;
					if (parentFrame) {
						callfunc = "." + this.component.id + '["' + name + '"]; \n';
						callfunc += 'if (eventFn) eventFn._firePluginEvent' + params + ';';
						do {
							if (parentFrame instanceof nexacro.MainFrame) {
								callfunc = 'var eventFn = application.mainframe' + callfunc;
								break;
							}
							if (parentFrame instanceof nexacro.ChildFrame) {
								parentFrame2 = parentFrame.parent;
								if (parentFrame2) {
									if (parentFrame2 instanceof nexacro.FrameSet || 
										parentFrame2 instanceof nexacro.VFrameSet || 
										parentFrame2 instanceof nexacro.HFrameSet || 
										parentFrame2 instanceof nexacro.ChildFrame) {
										if (parentFrame2._frames && parentFrame2._frames.length) {
											var frmidx;
											var frmlen = parentFrame2._frames.length;
											for (frmidx = 0; frmidx < frmlen; frmidx++) {
												if (parentFrame2._frames[frmidx] == parentFrame) {
													callfunc = '._frames[' + frmidx + ']' + callfunc;
													break;
												}
											}
										}
									}
									else if (parentFrame2 instanceof nexacro.MainFrame) {
										callfunc = '.frame' + callfunc;
									}
									else if (parentFrame2 instanceof nexacro.Form) {
										callfunc = '.' + parentFrame.id + callfunc;
									}
								}
							}
							else if (parentFrame instanceof nexacro.FrameSet || 
								parentFrame instanceof nexacro.VFrameSet || 
								parentFrame instanceof nexacro.HFrameSet) {
								parentFrame2 = parentFrame.parent;
								if (parentFrame2) {
									if (parentFrame2._frames && parentFrame2._frames.length) {
										var frmidx;
										var frmlen = parentFrame2._frames.length;
										for (frmidx = 0; frmidx < frmlen; frmidx++) {
											if (parentFrame2._frames[frmidx] == parentFrame) {
												callfunc = '._frames[' + frmidx + ']' + callfunc;
												break;
											}
										}
									}
								}
							}
							else if (parentFrame instanceof nexacro.Div) {
								callfunc = '.' + parentFrame.id + callfunc;
							}
							else if (parentFrame instanceof nexacro.Form) {
								callfunc = '.form' + callfunc;
							}
							parentFrame = parentFrame.parent;
						} while (parentFrame);
					}
					_script_node.text = callfunc;
					var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
					_owner_elem._dest_handle.appendChild(_script_node);
					return true;
				}
				else {
					this._events.add_item(name, callback);
				}
				return false;
			};

			_pPluginElement.removeEventHandler = function (name, callback, target) {
				if (this._handle) {
					var _doc = this.getRootWindowHandle();
					var nameFromToStringRegex = /^function\s?([^\s(]*)/;
					var paramsFromToStringRegex = /\(.*?\)/;
					var params = callback.toString().match(paramsFromToStringRegex)[0];
					var eventValue = name + params;

					var i;
					var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
					var _scripts = _owner_elem._dest_handle.getElementsByTagName("script");
					var length = _scripts.length;
					for (i = 0; i < length; i++) {
						var _script = _scripts[i];
						if (_script) {
							var eventAttribute = _script.getAttribute('event');
							if (eventAttribute === eventValue) {
								var parentNode = _script.parentNode;
								parentNode.removeChild(_script);
								break;
							}
						}
					}
				}
			};
		}
		else {
			_pPluginElement.addEventHandler = function (name, callback, target) {
				if (this._handle && this._object_node) {
					var object_node = this._object_node;
					object_node.setAttribute(name, name);

					var _doc = this.getRootWindowHandle();
					var _script_node = _doc.createElement("script");

					var nameFromToStringRegex = /^function\s?([^\s(]*)/;
					var paramsFromToStringRegex = /\(.*?\)/;
					var params = callback.toString().match(paramsFromToStringRegex)[0];
					var eventValue = name + params;

					_script_node.setAttribute('event', eventValue);

					var parentFrame, parentFrame2;
					parentFrame = this.component.parent;
					if (parentFrame) {
						callfunc = "." + this.component.id + '["' + name + '"]; \n';
						callfunc += '\tif (eventFn) eventFn._firePluginEvent' + params + ';' + "\n};";
						do {
							if (parentFrame instanceof nexacro.MainFrame) {
								callfunc = '\tvar eventFn = application.mainframe' + callfunc;
								break;
							}
							if (parentFrame instanceof nexacro.ChildFrame) {
								parentFrame2 = parentFrame.parent;
								if (parentFrame2) {
									if (parentFrame2 instanceof nexacro.FrameSet || 
										parentFrame2 instanceof nexacro.VFrameSet || 
										parentFrame2 instanceof nexacro.HFrameSet || 
										parentFrame2 instanceof nexacro.ChildFrame) {
										if (parentFrame2._frames && parentFrame2._frames.length) {
											var frmidx;
											var frmlen = parentFrame2._frames.length;
											for (frmidx = 0; frmidx < frmlen; frmidx++) {
												if (parentFrame2._frames[frmidx] == parentFrame) {
													callfunc = '._frames[' + frmidx + ']' + callfunc;
													break;
												}
											}
										}
									}
									else if (parentFrame2 instanceof nexacro.MainFrame) {
										callfunc = '.frame' + callfunc;
									}
									else if (parentFrame2 instanceof nexacro.Form) {
										callfunc = '.' + parentFrame.id + callfunc;
									}
								}
							}
							else if (parentFrame instanceof nexacro.FrameSet || 
								parentFrame instanceof nexacro.VFrameSet || 
								parentFrame instanceof nexacro.HFrameSet) {
								parentFrame2 = parentFrame.parent;
								if (parentFrame2) {
									if (parentFrame2._frames && parentFrame2._frames.length) {
										var frmidx;
										var frmlen = parentFrame2._frames.length;
										for (frmidx = 0; frmidx < frmlen; frmidx++) {
											if (parentFrame2._frames[frmidx] == parentFrame) {
												callfunc = '._frames[' + frmidx + ']' + callfunc;
												break;
											}
										}
									}
								}
							}
							else if (parentFrame instanceof nexacro.Div) {
								callfunc = '.' + parentFrame.id + callfunc;
							}
							else if (parentFrame instanceof nexacro.Form) {
								callfunc = '.form' + callfunc;
							}
							parentFrame = parentFrame.parent;
						} while (parentFrame);
					}
					callfunc = 'function ' + eventValue + '\n{\n' + callfunc;
					_script_node.text = callfunc;
					this._handle.appendChild(_script_node);
					return true;
				}
				else {
					this._events.add_item(name, callback);
				}
				return false;
			};

			_pPluginElement.removeEventHandler = function (name, callback, target) {
				if (this._handle && this._object_node) {
					var object_node = this._object_node;
					object_node.removeAttribute(name);

					var _doc = this.getRootWindowHandle();
					var nameFromToStringRegex = /^function\s?([^\s(]*)/;
					var paramsFromToStringRegex = /\(.*?\)/;
					var params = callback.toString().match(paramsFromToStringRegex)[0];
					var eventValue = name + params;

					var i;
					var _scripts = this._handle.getElementsByTagName("script");
					var length = _scripts.length;
					for (i = 0; i < length; i++) {
						var _script = _scripts[i];
						if (_script) {
							var eventAttribute = _script.getAttribute('event');
							if (eventAttribute === eventValue) {
								var parentNode = _script.parentNode;
								parentNode.removeChild(_script);
								break;
							}
						}
					}
				}
			};
		}
		;

		_pPluginElement.getProperty = _pPluginElement.getElementParam;
		_pPluginElement.setProperty = _pPluginElement.setElementParam;

		_pPluginElement.install = nexacro._emptyFn;
		_pPluginElement.isInstalled = nexacro._emptyFn;
		_pPluginElement.isLoaded = nexacro._emptyFn;
		_pPluginElement.setElementPluginVisible = nexacro._emptyFn;
		_pPluginElement.setElementAdjustAlpha = nexacro._emptyFn;
		_pPluginElement.setElementWindowed = nexacro._emptyFn;
		_pPluginElement.setElementPopupStyle = nexacro._emptyFn;
		_pPluginElement.initEvent = nexacro._emptyFn;
		_pPluginElement.updateWindow = nexacro._emptyFn;

		delete _pPluginElement;


		nexacro.PluginObject = function () {
		};

		var _pPluginObject = nexacro._createPrototype(nexacro.Object, nexacro.PluginObject);
		nexacro.PluginObject.prototype = _pPluginObject;
		_pPluginObject._type_name = "PluginObject";
		_pPluginObject._handle = null;
		_pPluginObject._doc = null;
		_pPluginObject._window = null;

		_pPluginObject.getProperty = function (name) {
			var handle = this._handle;
			if (handle !== undefined) {
				if (name) {
					var property = handle[name];
					if (property !== undefined) {
						if (property === null || (typeof property != "object" && property != undefined)) {
							return property;
						}
						var pobject = new nexacro.PluginObject;
						pobject._handle = property;
						pobject._window = this._window;
						return pobject;
					}
					var param = this._handle.getElementsByTagName("param");
					for (var i in param) {
						if (param[i].name == name) {
							return param[i].value;
						}
					}
				}
			}
		};

		_pPluginObject.setProperty = function (name, value) {
			if (this._handle && name && value) {
				if (this._handle[name] !== undefined) {
					this._handle[name] = value;
					return;
				}
				var param = this._handle.getElementsByTagName("param");
				for (var i in param) {
					if (param[i].name == name) {
						param[i].value = value;
						return;
					}
				}
				var param_node = this._doc.createElement("param");
				param_node.setAttribute("name", name);
				param_node.setAttribute("value", value);
				this._handle.appendChild(param_node);
			}
		};

		_pPluginObject._delete_property = function (name) {
			if (this._handle && name) {
				if (this._handle[name]) {
					this._handle[name] = "";
					return;
				}
				var param = this._handle.getElementsByTagName("param");
				for (var i in param) {
					if (param[i].name == name) {
						this._handle.removeChild(param[i]);
						return;
					}
				}
			}
		};

		_pPluginObject.callMethod = function () {
			var fn_name, len, str, value;
			if (arguments.length < 1) {
				return;
			}

			if (this._handle) {
				fn_name = Array.prototype.shift.call(arguments);
				str = 'this._handle.' + fn_name;

				str += '(';
				len = arguments.length;
				if (len > 0) {
					str += 'arguments[0]';
					for (var i = 1; i < len; i++) {
						str += ', arguments[' + i + ']';
					}
				}
				str += ');';

				value = eval(str);

				if (value != null && typeof (value) == "object") {
					var pobject = new nexacro.PluginObject;
					pobject._handle = value;
					return pobject;
				}
				return value;
			}
		};

		_pPluginObject.destroy = nexacro._emptyFn;
		delete _pPluginObject;



		nexacro.WebBrowserPluginElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._parent_elem.windowed = true;

			this._params = new nexacro.Collection();
			this._events = new nexacro.Collection();
		};

		var _pWebBrowserPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro.WebBrowserPluginElement);
		nexacro.WebBrowserPluginElement.prototype = _pWebBrowserPluginElement;

		_pWebBrowserPluginElement._type_name = "WebBrowserPluginElement";
		_pWebBrowserPluginElement.initEvent = nexacro._emptyFn;

		_pWebBrowserPluginElement._object_node = null;
		_pWebBrowserPluginElement._embed_node = null;
		_pWebBrowserPluginElement._params = null;
		_pWebBrowserPluginElement._events = null;
		_pWebBrowserPluginElement._window = null;
		_pWebBrowserPluginElement._document = null;
		_pWebBrowserPluginElement._block_node = null;
		_pWebBrowserPluginElement._prev_outfocus_message_elem = null;
		_pWebBrowserPluginElement._next_outfocus_message_elem = null;


		var _iframe_eventhandler_ontouchmove = function (evt) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				var target = evt.srcElement;
			}
			else {
				var target = evt.target;
			}

			if (target) {
				var _doc = target.ownerDocument;
				var _body = _doc.body;
				var ct = _doc._nexacro_iframe_contaniner;

				if (nexacro.OS == "iOS") {
					var scroll_target = _doc._nexacro_iframe_contaniner;
				}
				else {
					var scroll_target = _body;
				}

				if (_doc._nexacro_bScroll && _doc._nexacro_preTouchInfo) {
					var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
					for (var i = 0; i < touchlen; i++) {
						var touch = evt.changedTouches ? evt.changedTouches[i] : (evt.touches ? evt.touches[0] : evt);
					}

					var clientX = touch.pageX || touch.clientX;
					var clientY = touch.pageY || touch.clientY;
					var screenX = touch.screenX || clientX;
					var screenY = touch.screenY || clientY;

					var touchInfo = [clientX, clientY, screenX, screenY];

					function getDirection (tInfo1, tInfo2) {
						var gap_x = tInfo2[2] - tInfo1[2];
						var gap_y = tInfo2[3] - tInfo1[3];

						if (Math.abs(gap_y) >= Math.abs(gap_x)) {
							return ["y", gap_y];
						}
						else {
							return ["x", gap_x];
						}
					}

					var dir = getDirection(_doc._nexacro_preTouchInfo, touchInfo);

					var bScroll = false;

					if (dir[0] == "y") {
						var _win = _doc.defaultView || _doc.parentWindow;

						if (nexacro.OS == "iOS") {
							var clientHeight = parseInt(scroll_target.style.height);
						}
						else {
							var clientHeight = nexacro._getWindowHandleClientHeight(_win);
							var w_innerHeight = _win.innerHeight;

							clientHeight = (clientHeight > w_innerHeight) ? clientHeight : w_innerHeight;
						}

						var scrollHeight = scroll_target.scrollHeight || _doc.documentElement.scrollHeight;
						var scrollTop = scroll_target.scrollTop || _doc.documentElement.scrollTop;

						if ((scrollTop == 0 && dir[1] > 0) || (((scrollHeight - clientHeight) <= scrollTop) && dir[1] < 0)) {
							bScroll = true;
						}

						var preClientY = _doc._nexacro_preTouchInfo[1];

						if ((dir[1] < 0 && clientY > preClientY) || (dir[1] > 0 && clientY < preClientY)) {
							return;
						}
					}
				}
			}
		};

		var _iframe_eventhandler_ontouchstart = function (evt) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				var target = evt.srcElement;
			}
			else {
				var target = evt.target;
			}

			if (target) {
				var _doc = target.ownerDocument;
				var _body = _doc.body;
				var ct = _doc._nexacro_iframe_contaniner;

				if (nexacro.OS == "iOS") {
					var scroll_target = _doc._nexacro_iframe_contaniner;
				}
				else {
					var scroll_target = _body;
				}


				_doc._nexacro_bScroll = false;

				var _win = _doc.defaultView || _doc.parentWindow;

				if (nexacro.OS == "iOS") {
					var clientHeight = parseInt(scroll_target.style.height);
				}
				else {
					var clientHeight = nexacro._getWindowHandleClientHeight(_win);
					var w_innerHeight = _win.innerHeight;

					clientHeight = (clientHeight > w_innerHeight) ? clientHeight : w_innerHeight;
				}

				var scrollHeight = scroll_target.scrollHeight || _doc.documentElement.scrollHeight;
				var scrollTop = scroll_target.scrollTop || _doc.documentElement.scrollTop;

				if (scrollTop == 0 || (scrollHeight - clientHeight) <= scrollTop) {
					_doc._nexacro_bScroll = true;

					var touchlen = evt.changedTouches ? evt.changedTouches.length : 1;
					for (var i = 0; i < touchlen; i++) {
						var touch = evt.changedTouches ? evt.changedTouches[i] : (evt.touches ? evt.touches[0] : evt);
					}

					var clientX = touch.pageX || touch.clientX;
					var clientY = touch.pageY || touch.clientY;
					var screenX = touch.screenX || clientX;
					var screenY = touch.screenY || clientY;

					_doc._nexacro_preTouchInfo = [clientX, clientY, screenX, screenY];

					nexacro._syshandler_ontouchstart(window.nexacro_HTMLSysEvent, ct, evt);
				}
			}
		};

		var _iframe_eventhandler_ontouchend = function (evt) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				var target = evt.srcElement;
			}
			else {
				var target = evt.target;
			}
			if (target) {
				var _doc = target.ownerDocument;
				var _body = _doc.body;
				var ct = _doc._nexacro_iframe_contaniner;

				if (_doc._nexacro_bScroll) {
					nexacro._syshandler_ontouchend(window.nexacro_HTMLSysEvent, ct, evt);
				}
			}
		};

		var _iframe_eventhandler_onmousewheel = function (evt) {
			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				var target = evt.srcElement;
			}
			else {
				var target = evt.target;
			}

			if (target) {
				var _doc = target.ownerDocument;
				var _body = _doc.body;
				var ct = _doc._nexacro_iframe_contaniner;

				if (nexacro.OS == "iOS") {
					var scroll_target = _doc._nexacro_iframe_contaniner;
				}
				else {
					var scroll_target = _body;
				}

				var _win = _doc.defaultView || _doc.parentWindow;
				var clientHeight = 0;
				var scrollHeight = scroll_target.scrollHeight || _doc.documentElement.scrollHeight;
				var scrollTop = scroll_target.scrollTop || _doc.documentElement.scrollTop;

				if (nexacro.OS == "iOS") {
					clientHeight = parseInt(scroll_target.style.height);
				}
				else {
					if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 8) {
						clientHeight = _doc.documentElement.offsetHeight;
					}
					else {
						clientHeight = _win.innerHeight;
					}
				}

				var delta_y = nexacro.__getWheelDeltaY(evt);
				if ((scrollTop == 0 && delta_y > 0) || (scrollHeight - clientHeight <= scrollTop && delta_y < 0)) {
					nexacro._syshandler_onmousewheel(window.nexacro_HTMLSysEvent, ct, evt);
				}
			}
		};

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			var _iframe_eventhandler_onload = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				var node = evt.srcElement;
				if (!node) {
					return;
				}

				try {
					var _doc = node.contentDocument || node.contentWindow.document;

					_doc._nexacro_iframe_contaniner = node._contaniner._handle;

					if (nexacro.SupportTouch && nexacro.isTouchInteraction) {
						nexacro._observeSysEvent(_doc, "MSPointerMove", "ontouchmove", _iframe_eventhandler_ontouchmove);
						nexacro._observeSysEvent(_doc, "MSPointerDown", "ontouchstart", _iframe_eventhandler_ontouchstart);
						nexacro._observeSysEvent(_doc, "MSPointerUp", "ontouchend", _iframe_eventhandler_ontouchend);
					}

					nexacro._observeSysEvent(_doc, "mousewheel", "onmousewheel", _iframe_eventhandler_onmousewheel);
				}
				catch (e) {
					;
				}
				finally {
					var elem = node._linked_element;
					if (!elem) {
						return;
					}
					return elem._on_frame_load(node.contentWindow);
				}
			};
		}
		else {
			var _iframe_eventhandler_onload = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				var node = evt.target;
				if (!node) {
					return;
				}

				try {
					var _doc = node.contentDocument || node.contentWindow.document;

					_doc._nexacro_iframe_contaniner = node._contaniner._handle;

					if (nexacro.SupportTouch) {
						nexacro._observeSysEvent(_doc, "touchmove", "ontouchmove", _iframe_eventhandler_ontouchmove);
						nexacro._observeSysEvent(_doc, "touchstart", "ontouchstart", _iframe_eventhandler_ontouchstart);
						nexacro._observeSysEvent(_doc, "touchend", "ontouchend", _iframe_eventhandler_ontouchend);
					}

					nexacro._observeSysEvent(_doc, "mousewheel", "onmousewheel", _iframe_eventhandler_onmousewheel);
					nexacro._observeSysEvent(_doc, "DOMMouseScroll", "onmousewheel", _iframe_eventhandler_onmousewheel);
				}
				catch (e) {
					;
				}
				finally {
					var elem = node._linked_element;
					if (!elem) {
						return;
					}
					return elem._on_frame_load(node.contentWindow);
				}
			};
		}

		_pWebBrowserPluginElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = this._createInternalFrameElementHandle(_doc, this.left, this.top, this.width, this.height, this._params);
				_handle._contaniner = _owner_elem;

				if (nexacro._enableaccessibility) {
					nexacro.__setDOMNodeAccessibilityActiveDescendant(_handle, this._parent_elem.linkedcontrol._unique_id);
				}

				nexacro.__setDOMNodeSelectable(_handle, true);

				if (nexacro.OS == "iOS") {
					nexacro.__setMobileIframeDOMNodeStyleScroll(_owner_elem._handle.style);
				}

				if (nexacro.OS == "Android" && (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari") && this.visible) {
					this._need_hide = true;
				}

				var handle_style = _handle.style;
				if (!this.visible || this._need_hide) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}

				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}

				if (this.align) {
					nexacro.__setDOMNodeStyleAlign(handle_style, this.align);
				}

				if (this.padding) {
					nexacro.__setDOMNodeStylePadding(handle_style, this.padding);
				}


				var _focus_input = _doc.createElement("div");
				var f_input_style = _focus_input.style;
				nexacro.__setDOMNodeTabIndex(_focus_input, 0);
				nexacro.__setDOMNodeStyleAbsolute(f_input_style);
				nexacro.__setDOMNodeStylePos(f_input_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(f_input_style, 1, 1);
				f_input_style.opacity = 0;
				_focus_input.parent_elem = this.parent;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _focus_input);
				nexacro._observeSysEvent(_focus_input, "focus", "onfocus", this._go_prev_focus);

				if (nexacro._enableaccessibility) {
					var message_elem = this._prev_outfocus_message_elem = new nexacro.TextBoxElement(_owner_elem);
					message_elem.create();
					nexacro.__setDOMNodeTabIndex(message_elem._handle, 0);
					nexacro._observeSysEvent(message_elem._handle, "focus", "onfocus", this._iframe_onfocus_forward);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);



				if (nexacro._enableaccessibility) {
					message_elem = this._next_outfocus_message_elem = new nexacro.TextBoxElement(_owner_elem);
					message_elem.create();
					nexacro.__setDOMNodeTabIndex(message_elem._handle, 0);
					nexacro._observeSysEvent(message_elem._handle, "focus", "onfocus", this._iframe_onfocus_forward);
				}

				_focus_input = _doc.createElement("div");
				f_input_style = _focus_input.style;
				nexacro.__setDOMNodeTabIndex(_focus_input, 0);
				nexacro.__setDOMNodeStyleAbsolute(f_input_style);
				nexacro.__setDOMNodeStylePos(f_input_style, 0, +this.height - 5);
				nexacro.__setDOMNodeStyleSize(f_input_style, 1, 1);

				f_input_style.opacity = 0;
				f_input_style.border = "0px solid #ffffff";
				_focus_input.parent_elem = this.parent;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _focus_input);
				nexacro._observeSysEvent(_focus_input, "focus", "onfocus", this._go_next_focus);

				nexacro._observeSysEvent(_handle, "load", "onload", _iframe_eventhandler_onload);
				if (nexacro.Browser == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) || (nexacro.isTouchInteraction && nexacro.SupportTouch)) {
					nexacro._observeSysEvent(_handle, "focusin", "onfocusin", this._iframe_onfocusin_forward);
					nexacro._observeSysEvent(_handle, "focusout", "onfocusout", this._iframe_onfocusout_forward);
				}
			}
		};
		_pWebBrowserPluginElement._go_prev_focus = function (evt) {
			var node = evt.target ? evt.target : evt.srcElement;
			var form = node.parent_elem.linkedcontrol._getForm();

			var newfocus_comp = form._searchPrevTabFocus(form._last_focused, undefined, undefined, false);

			if (newfocus_comp && newfocus_comp[0]) {
				if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
					var win = form._getWindow();
					win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
				}

				newfocus_comp[0]._setFocus(true, 1, true);
			}
		};

		_pWebBrowserPluginElement._go_next_focus = function (evt) {
			var node = evt.target ? evt.target : evt.srcElement;
			var form = node.parent_elem.linkedcontrol._getForm();

			var newfocus_comp = form._searchNextTabFocus(form._last_focused, undefined, undefined, false);

			if (newfocus_comp && newfocus_comp[0]) {
				if (newfocus_comp[0] instanceof nexacro.Form && newfocus_comp[0]._last_focused) {
					var win = form._getWindow();
					win._removeFromCurrentFocusPath(newfocus_comp[0]._last_focused);
				}

				newfocus_comp[0]._setFocus(true, 0, true);
			}
		};

		_pWebBrowserPluginElement._on_frame_load = function (_win) {
			try {
				var docurl = "";
				var comp = this._parent_elem.linkedcontrol;
				if (_win) {
					if (this._need_hide) {
						nexacro.__setDOMNodeStyleVisible(this._handle.style, true);
						this._need_hide = false;
					}

					this._window = _win;

					this._document = _win.document;
					if (_win.NEXACROWEBBROWSER == undefined) {
						_win.NEXACROWEBBROWSER = comp;
					}
				}

				if (this._document) {
					docurl = this._document.location.href;
				}
			}
			catch (e) {
				this._window = null;
				this._document = null;
			}

			var _win = comp._getWindow();
			var cur_focus_paths = _win.getCurrentFocusPaths();
			var pThis = comp;

			while (pThis && pThis._is_nc_control) {
				pThis = pThis.parent;
			}

			if (!pThis) {
				return;
			}

			var focuspath_index = -1;
			var len = 0;
			if (cur_focus_paths) {
				focuspath_index = nexacro._indexOf(cur_focus_paths, pThis);
				len = cur_focus_paths.length;
			}

			if (focuspath_index < 0 && len > 0) {
				cur_focus_paths[len - 1].on_apply_custom_setfocus();
			}
			comp.on_load_handler(docurl);
		};

		_pWebBrowserPluginElement.destroy = function () {
			if (this._prev_outfocus_message_elem) {
				nexacro._stopSysObserving(this._prev_outfocus_message_elem._handle, "focus", "onfocus", this._iframe_onfocus_forward);
				this._prev_outfocus_message_elem.destroy();
				this._prev_outfocus_message_elem = null;
			}

			if (this._next_outfocus_message_elem) {
				this._next_outfocus_message_elem.destroy();
				this._next_outfocus_message_elem = null;
			}

			var _handle = this._handle;
			if (_handle) {
				nexacro._stopSysObserving(_handle, "load", "onload", _iframe_eventhandler_onload);
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				var _block_node = this._block_node;
				if (_block_node && _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _block_node);
				}

				this._block_node = null;
				this._document = null;
				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
			this.parent = null;
			this._parent_elem = null;

			var params = this._params;
			if (params) {
				params.destroy();
				this._params = null;
			}

			var events = this._events;
			if (events) {
				events.destroy();
				this.events = null;
			}
		};

		_pWebBrowserPluginElement._createInternalFrameElementHandle = function (_doc, left, top, width, height, params) {
			var _handle = _doc.createElement("iframe");

			_handle._linked_element = this;
			_handle._element_type = 8;
			_handle.frameBorder = 0;

			this._object_id = this._parent_elem._handle.id + '_' + this.component._type_name;
			if (this._object_id) {
				_handle.setAttribute('id', this._object_id);
			}

			var handle_style = _handle.style;
			handle_style.position = "absolute";

			nexacro.__setDOMNodeTitle(_handle, this._parent_elem.tooltiptext ? this._parent_elem.tooltiptext : (this._parent_elem.accessibility_label ? this._parent_elem.accessibility_label : this._parent_elem.linkedcontrol.id));

			nexacro.__setDOMNodeStylePos(handle_style, left, top);
			nexacro.__setDOMNodeStyleSize(handle_style, width, height);

			var param_cnt = (params ? params.length : 0);
			for (var i = 0; i < param_cnt; i++) {
				this._setInternalFrameDOMParam(_doc, _handle, params.get_id(i), params.get_item(i));
			}

			return _handle;
		};

		_pWebBrowserPluginElement._setInternalFrameDOMParam = function (_doc, target_handle, name, value) {
			target_handle.setAttribute(name, value);
		};

		_pWebBrowserPluginElement.setElementFocus = nexacro._emptyFn;

		_pWebBrowserPluginElement._setElementFocus = function (selffocus) {
			var handle = this._handle;
			if (handle) {
				nexacro.__setDOMNodeFocus(handle, true);
				nexacro.__setLastFocusedElement(this);
			}
		};

		_pWebBrowserPluginElement.setElementCodebase = function (codebaseurl) {
			if (this.codebase != codebaseurl) {
				this.codebase = codebaseurl;

				if (this._handle) {
					this._handle.setAttribute('codebase', codebaseurl);
				}
			}
		};

		_pWebBrowserPluginElement.getElementParam = function (name) {
			var handle = this._handle;
			if (handle) {
				var value = null;
				if (name) {
					if (name === "document") {
						var _doc = this._document;
						if (!_doc) {
							_doc = this._document = handle.contentDocument || handle.contentWindow.document;
						}
						var pobject = new nexacro.PluginObject;
						pobject._handle = _doc;
						return pobject;
					}
					else if (name == "window") {
						var _win = this._window;
						if (!_win) {
							_win = this._window = handle.contentWindow;
						}
						var pobject = new nexacro.PluginObject;
						pobject._handle = _win;
						return pobject;
					}

					value = handle[name];
					if (value != null && typeof (value) == "object") {
						var pobject = new nexacro.PluginObject;
						pobject._handle = value;
						return pobject;
					}
					return value;
				}
			}
			else {
				var params = this._params;
				return params.get_item(name);
			}
		};

		_pWebBrowserPluginElement.setElementParam = function (name, value) {
			if (this._handle) {
				var _doc = this.getRootWindowHandle();
				this._setInternalFrameDOMParam(_doc, this._handle, name, value);
			}
			else {
				var params = this._params;
				params.add_item(name, value);
			}
		};

		_pWebBrowserPluginElement.setElementEnable = function (value) {
			if (this.enable != value) {
				this.enable = value;
				var _handle = this._handle;
				if (_handle) {
					var _block_node = this._block_node;
					if (value) {
						if (_block_node) {
							nexacro.__removeDOMNode(_block_node.parentNode, _block_node);
							this._block_node = null;
						}
					}
					else {
						var _doc = this.getRootWindowHandle();
						this._block_node = _block_node = _doc.createElement("DIV");
						var _block_style = _block_node.style;
						_block_style.cssText = _handle.style.cssText;

						this.parent._setControlOpacity(this, _block_node, 1);
						_block_style.backgroundColor = "#ffffff";
						_block_style.zIndex = 100000;

						var pNode = _handle.parentNode;
						pNode.appendChild(_block_node);
						pNode.insertBefore(_block_node, _handle);
					}
				}
			}
		};

		_pWebBrowserPluginElement._getDoc = function () {
			return this._document;
		};

		_pWebBrowserPluginElement._setUrl = function (url) {
			if (this._handle) {
				if (nexacro.OS == "iOS" && nexacro._enableaccessibility) {
					if (url == "about:blank") {
						nexacro.__setDOMNodeStyleDisplay(this._handle.style, "none");
					}
					else {
						nexacro.__setDOMNodeStyleDisplay(this._handle.style, "initial");
					}
				}

				this.setElementParam("src", url);
			}
		};

		_pWebBrowserPluginElement._setGo = function () {
			if (this._handle && this._handle.contentWindow) {
				try {
					this._handle.contentWindow.history.go(0);
				}
				catch (e) {
				}
			}
		};

		_pWebBrowserPluginElement._setBack = function () {
			if (this._handle && this._handle.contentWindow) {
				try {
					this._handle.contentWindow.history.back();
				}
				catch (e) {
				}
			}
		};

		_pWebBrowserPluginElement._setForward = function () {
			if (this._handle && this._handle.contentWindow) {
				try {
					this._handle.contentWindow.history.forward();
				}
				catch (e) {
				}
			}
		};

		_pWebBrowserPluginElement.callMethod = function () {
			if (arguments.length < 1) {
				return;
			}

			var name = arguments[0];

			var fn_name = Array.prototype.shift.call(arguments);
			return this._window[fn_name].apply(this._window, arguments);
		};

		if (nexacro.Browser == "Edge" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 9) || (nexacro.isTouchInteraction && nexacro.SupportTouch)) {
			_pWebBrowserPluginElement._iframe_onfocusout_forward = function (evt) {
				var win = this._linked_element._parent_elem.linkedcontrol._getWindow();
				win._is_iframe_focus = false;
			};

			_pWebBrowserPluginElement._iframe_onfocusin_forward = function (evt) {
				var win = this._linked_element._parent_elem.linkedcontrol._getWindow();
				win._is_iframe_focus = true;
			};
		}

		if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
			_pWebBrowserPluginElement._iframe_onfocus_forward = function (evt) {
				if (window.event) {
					evt = window.event;
				}
				if (application._com_waiting) {
					if (evt.preventDefault) {
						evt.preventDefault();
					}
				}
				var node = evt.srcElement;
				var elem = node._linked_element;
				if (elem) {
					elem._killfocus_flag = true;
				}
			};
		}
		else {
			_pWebBrowserPluginElement._iframe_onfocus_forward = function (evt) {
				if (application._com_waiting) {
					nexacro._stopSysEvent(evt);
				}
				var node = evt.target;
				var elem = node._linked_element;
				if (elem) {
					elem._killfocus_flag = true;
				}
			};
		}

		_pWebBrowserPluginElement.getProperty = _pWebBrowserPluginElement.getElementParam;
		_pWebBrowserPluginElement.setProperty = _pWebBrowserPluginElement.setElementParam;

		delete _pWebBrowserPluginElement;
		nexacro.MediaPlayerPluginElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._parent_elem.windowed = true;

			this._params = new nexacro.Collection();
			this._events = new nexacro.Collection();

			this._node_type = null;
		};

		var _pMediaPlayerPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro.MediaPlayerPluginElement);
		nexacro.MediaPlayerPluginElement.prototype = _pMediaPlayerPluginElement;

		_pMediaPlayerPluginElement._type_name = "MediaPlayerPluginElement";

		_pMediaPlayerPluginElement.classid = "{6bf52a52-394a-11d3-b153-00c04f79faa6}";

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			_pMediaPlayerPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
				var _handle = _doc.createElement("object");

				_handle._linked_element = this;
				_handle._element_type = 8;

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeStyleSize(handle_style, width, height);

				_handle.setAttribute('classid', "clsid:6bf52a52-394a-11d3-b153-00c04f79faa6");
				_handle.setAttribute('type', "video/x-ms-wmv");
				this._setObjectDOMParam(_doc, _handle, "wmode", "transparent");

				var param_cnt = (params ? params.length : 0);
				for (var i = 0; i < param_cnt; i++) {
					this._setObjectDOMParam(_doc, _handle, params.get_id(i), params.get_item(i));
				}
				this._object_node = _handle;
				return _handle;
			};

			_pMediaPlayerPluginElement._play = function () {
				var object = this.getPluginObject();
				if (object) {
					var controls = object.getProperty("controls");
					if (controls) {
						controls.callMethod("play");
					}
				}
			};

			_pMediaPlayerPluginElement._pause = function () {
				var object = this.getPluginObject();
				if (object) {
					var controls = object.getProperty("controls");
					if (controls) {
						controls.callMethod("pause");
					}
				}
			};

			_pMediaPlayerPluginElement._rewind = function () {
				var object = this.getPluginObject();
				if (object) {
					var controls = object.getProperty("controls");
					if (controls) {
						controls.callMethod("fastReverse");
					}
				}
			};

			_pMediaPlayerPluginElement._stop = function () {
				var object = this.getPluginObject();
				if (object) {
					var controls = object.getProperty("controls");
					if (controls) {
						controls.callMethod("stop");
					}
				}
			};

			_pMediaPlayerPluginElement._togglemute = function () {
				var object = this.getPluginObject();
				if (object) {
					var settings = this.getPluginObject("settings");
					if (settings) {
						var mute = settings.getProperty("mute");
						if (nexacro._toBoolean(mute) == true) {
							settings._delete_property("mute");
						}
						else {
							settings.setProperty("mute", "true");
						}
					}
				}
			};


			_pMediaPlayerPluginElement._setMediaEnable = _pMediaPlayerPluginElement._setMediaControl = _pMediaPlayerPluginElement._setMediaUrl = _pMediaPlayerPluginElement._setMediaCurrentTime = _pMediaPlayerPluginElement._setMediaLoop = _pMediaPlayerPluginElement._setMediaAutoPlay = _pMediaPlayerPluginElement._setMediaVolume = nexacro.PluginElement.prototype.setElementParam;
		}
		else {
			_pMediaPlayerPluginElement._getNodeType = function (file_type) {
				var ret = "video";

				switch (file_type) {
					case "mp3":
					case "wav":
						ret = "audio";
						break;
				}
				return ret;
			};

			_pMediaPlayerPluginElement._getType = function (file_type) {
				var ret = "video/" + file_type;

				switch (file_type) {
					case "mp3":
					case "wav":
						ret = "audio" + file_type;
						break;
				}
				return ret;
			};

			_pMediaPlayerPluginElement._createObjectElementHandle = function (_doc, left, top, width, height, params) {
				var source = this.source;
				if (source) {
					var file_type = (source + "").substring(source.lastIndexOf(".") + 1).toLowerCase();
				}
				var type = this._getType(file_type);
				var node_name = this._getNodeType(file_type);
				var _handle = _doc.createElement(node_name);

				this._node_type = node_name;

				_handle._linked_element = this;
				_handle._element_type = 8;

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, left, top);
				nexacro.__setDOMNodeStyleSize(handle_style, width, height);

				var control = this.controls;
				if (control != null) {
					_handle.controls = control;
				}
				if (this.autoplay != null) {
					_handle.autoplay = this.autoplay;
				}
				if (this.volume != null) {
					_handle.volume = this.volume;
				}
				if (this.loop != null) {
					_handle.loop = this.loop;
				}

				if (source) {
					var source_node = this._source_node = _doc.createElement("source");
					source_node.setAttribute('src', this.source);
					source_node.setAttribute('type', this._getType(file_type));
					_handle.appendChild(source_node);
				}

				nexacro._observeSysEvent(_handle, "canplaythrough", "oncanplaythrough", this._media_eventhandler_canplaythrough);

				nexacro._observeSysEvent(_handle, "ended", "onended", this._media_eventhandler_changedstatus);
				nexacro._observeSysEvent(_handle, "error", "onerror", this._media_eventhandler_error);


				nexacro._observeSysEvent(_handle, "pause", "onpause", this._media_eventhandler_changedstatus);
				nexacro._observeSysEvent(_handle, "play", "onplay", this._media_eventhandler_changedstatus);
				nexacro._observeSysEvent(_handle, "progress", "onprogress", this._media_eventhandler_progress);


				nexacro._observeSysEvent(_handle, "timeupdate", "ontimeupdate", this._media_eventhandler_timeupdate);

				this._object_node = _handle;
				return _handle;
			};

			_pMediaPlayerPluginElement._media_eventhandler_changedstatus = function (evt) {
				var comp = evt.target._linked_element._parent_elem.linkedcontrol;
				comp && comp._on_statuschanged(evt.type);
			};

			_pMediaPlayerPluginElement._media_eventhandler_timeupdate = function (evt) {
				var node = evt.target;
				var comp = node._linked_element._parent_elem.linkedcontrol;
				comp && comp._on_currenttimechanged(node.currentTime);
			};

			_pMediaPlayerPluginElement._media_eventhandler_error = function (evt) {
				var node = evt.target;
				var comp = node._linked_element._parent_elem.linkedcontrol;
				if (comp) {
					var errormsg = "";
					var statuscode = node.error.code;
					switch (statuscode) {
						case 1:
							errormsg = "fetching process aborted by user";
							break;
						case 2:
							errormsg = "error occurred when downloading";
							break;
						case 3:
							errormsg = "error occurred when decoding";
							break;
						case 4:
							errormsg = "video not supported";
							break;
					}
					comp._on_error("NativeError", errormsg, statuscode);
				}
			};

			_pMediaPlayerPluginElement._media_eventhandler_canplaythrough = function (evt) {
				var node = evt.target;
				var comp = node._linked_element._parent_elem.linkedcontrol;
				comp.size = node.videoWidth + " " + node.videoHeight;
				comp.duration = node.duration;
			};

			_pMediaPlayerPluginElement.setElementSource = function (v) {
				this.source = v;
				if (this._object_node) {
					var source_node = this._source_node;
					if (source_node) {
						this._object_node.removeChild(source_node);
					}
					var _doc = nexacro._managerFrameDoc;
					source_node = this._source_node = _doc.createElement("source");
					source_node.setAttribute('src', v);
					if (this.type) {
						this._source_node.setAttribute('type', v);
					}
					this._object_node.appendChild(source_node);
				}
			};

			_pMediaPlayerPluginElement.setElementAttribute = function (attribute_name, v) {
				this[attribute_name] = v;
				if (this._object_node) {
					this._object_node.setAttribute(attribute_name, v);
				}
			};

			_pMediaPlayerPluginElement.setElementProperty = function (property_name, v) {
				this[property_name] = v;
				if (this._object_node) {
					this._object_node[property_name] = v;
				}
			};


			_pMediaPlayerPluginElement._play = function () {
				var video_node = this._object_node;
				video_node.play();
				return;
			};

			_pMediaPlayerPluginElement._pause = function () {
				var video_node = this._object_node;
				video_node.pause();
				return;
			};

			_pMediaPlayerPluginElement._rewind = function () {
				var video_node = this._object_node;
				if (video_node.currentTime != null) {
					video_node.currentTime = 0;
					video_node.play();
				}
			};

			_pMediaPlayerPluginElement._stop = function () {
				var video_node = this._object_node;
				if (video_node.currentTime != null) {
					video_node.pause();
					video_node.currentTime = 0;
				}
			};

			_pMediaPlayerPluginElement._togglemute = function (v) {
				var video_node = this._object_node;
				if (video_node) {
					video_node.muted = !video_node.muted;
				}
				return;
			};
			_pMediaPlayerPluginElement._setMediaControl = function (name, v) {
				if (v == "none") {
					v = false;
				}
				else {
					v = true;
				}
				if (this.controls != v) {
					this.controls = v;
					var node = this._object_node;
					if (node) {
						node.controls = v;
					}
				}
			};

			_pMediaPlayerPluginElement._setMediaUrl = function (name, v) {
				if (this.source != v) {
					this.source = v;
					if (this._object_node) {
						this._object_node.src = v;
					}
				}
			};

			_pMediaPlayerPluginElement._setMediaCurrentTime = function (name, v) {
				if (v > -1) {
					if (this._object_node) {
						this._object_node.currentTime = v;
					}
				}
			};

			_pMediaPlayerPluginElement._setMediaLoop = function (name, v) {
				if (this.loop != v) {
					this.loop = v;
					if (this._object_node) {
						this._object_node.loop = v;
					}
				}
			};

			_pMediaPlayerPluginElement._setMediaAutoPlay = function (name, v) {
				if (this.autoplay != v) {
					this.autoplay = v;
					if (this._object_node) {
						this._object_node.autoplay = v;
					}
				}
			};

			_pMediaPlayerPluginElement._setMediaVolume = function (name, v) {
				v = v / 100;
				if (this.volume != v) {
					this.volume = v;
					if (this._object_node) {
						this._object_node.volume = v;
					}
				}
			};

			_pMediaPlayerPluginElement._setMediaEnable = function (name, v) {
				this.enable = v;
			};
		}

		_pMediaPlayerPluginElement.destroy = function () {
			nexacro.PluginElement.prototype.destroy.call();
		};

		_pMediaPlayerPluginElement.set_volume = function (v) {
		};

		delete _pMediaPlayerPluginElement;

		nexacro.CanvasElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pCanvasElement = nexacro._createPrototype(nexacro.Element, nexacro.CanvasElement);
		nexacro.CanvasElement.prototype = _pCanvasElement;

		_pCanvasElement._type_name = "CanvasElement";

		_pCanvasElement.lineOffset = 0.5;
		_pCanvasElement.scale = 10;
		_pCanvasElement.scalex = 0;
		_pCanvasElement.scaley = 0;


		_pCanvasElement.fillStyle = "#000000";
		_pCanvasElement.strokeStyle = "#000000";
		_pCanvasElement.lineCap = "butt";
		_pCanvasElement.lineJoin = "miter";
		_pCanvasElement.lineWidth = 1;
		_pCanvasElement.miterLimit = 10;
		_pCanvasElement.shadowColor = "#000000";
		_pCanvasElement._shadowColor = "#000000";
		_pCanvasElement.shadowOffsetX = 0;
		_pCanvasElement.shadowOffsetY = 0;
		_pCanvasElement.shadowBlur = 0;

		_pCanvasElement.font = null;
		_pCanvasElement._font = null;

		_pCanvasElement.textAlign = "start";
		_pCanvasElement.textBaseline = 0;
		_pCanvasElement.globalAlpha = 1;
		_pCanvasElement.globalCompositeOperation = 1;

		_pCanvasElement._status_stack = [];
		_pCanvasElement._matrix_stack = [];

		_pCanvasElement.createPattern = function () {
			return null;
		};

		_pCanvasElement.createLinearGradient = function (aX0, aY0, aX1, aY1) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__createCanvasLinearGradient(_handle, aX0, aY0, aX1, aY1);
			}
			return null;
		};

		_pCanvasElement.createRadialGradient = function (aX0, aY0, aR0, aX1, aY1, aR1) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__createCanvasRadialGradient(_handle, aX0, aY0, aR0, aX1, aY1, aR1);
			}
			return null;
		};

		_pCanvasElement.setElementFillStyle = function (fillstyle) {
			var _handle = this._handle;
			if (_handle && fillstyle) {
				this.fillStyle = fillstyle;
				if (fillstyle instanceof nexacro.Style_color) {
					nexacro.__setCanvasFillColor(_handle, fillstyle);
				}
				else {
					nexacro.__setCanvasFillGradation(_handle, fillstyle);
				}
			}
		};

		_pCanvasElement.setElementFont = function (font) {
			var _handle = this._handle;
			if (!font || !_handle) {
				return;
			}

			var sysvalue = font._sysvalue;
			if (!this.font || this.font._sysvalue != sysvalue) {
				this.font = font;
				this._font = sysvalue;
				nexacro.__setCanvasFont(_handle, font, sysvalue);
			}
			else {
				nexacro.__setCanvasFont(_handle, font, sysvalue);
			}
		};

		_pCanvasElement.clearRect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasClearRect(_handle, x, y, dx, dy);
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion < 9) {
			_pCanvasElement.setElementPosition = function (left, top) {
				if (this.left != left || this.top != top) {
					this.left = left;
					this.top = top;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setCanvasNodeStylePos(_handle.style, left, top);
					}
				}
			};
		}
		else {
			_pCanvasElement.setElementPosition = function (left, top) {
				if (this.left != left || this.top != top) {
					this.left = left;
					this.top = top;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setCanvasNodeStylePos(_handle._draw_node.style, left, top);
					}
				}
			};
		}

		_pCanvasElement.setElementGlobalAlpha = function (alpha) {
			var _handle = this._handle;
			if (_handle && alpha >= 0) {
				this.globalAlpha = alpha;
				nexacro.__setCanvasGlobalAlpha(_handle, alpha);
			}
		};

		_pCanvasElement.setElementGlobalCompositeOperation = function (strOperation) {
			var _handle = this._handle;
			if (_handle && strOperation) {
				this.globalCompositeOperation = strOperation;
				nexacro.__setCanvasGlobalCompositeOperation(_handle, strOperation);
			}
		};

		_pCanvasElement.setElementLineCap = function (linecap) {
			var _handle = this._handle;
			if (_handle) {
				this.lineCap = linecap;
				nexacro.__setCanvasLineCap(_handle, linecap);
			}
		};

		_pCanvasElement.setElementLineJoin = function (linejoin) {
			var _handle = this._handle;
			if (_handle) {
				this.lineJoin = linejoin;
				nexacro.__setCanvasLineJoin(_handle, linejoin);
			}
		};

		_pCanvasElement.setElementLineWidth = function (width) {
			var _handle = this._handle;
			if (_handle && isFinite(width)) {
				this.lineWidth = width;
				this.lineOffset = width / 2;
				nexacro.__setCanvasLineWidth(_handle, width);
			}
		};

		_pCanvasElement.setElementStrokeStyle = function (strokestyle) {
			var _handle = this._handle;
			if (_handle && strokestyle) {
				this.strokeStyle = strokestyle;
				nexacro.__setCanvasStrokeStyle(_handle, strokestyle);
			}
		};

		_pCanvasElement.setElementMiterLimit = function (limit) {
			var _handle = this._handle;
			if (_handle && limit) {
				this.miterLimit = limit;
				nexacro.__setCanvasMiterLimit(_handle, limit);
			}
		};

		_pCanvasElement.setElementShadowBlur = function (blur) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowBlur = blur;
				nexacro.__setCanvasShadowBlur(_handle, blur);
			}
		};

		_pCanvasElement.setElementShadowColor = function (color) {
			var _handle = this._handle;
			if (color && _handle) {
				this.shadowColor = color;
				_handle._shadowColor = nexacro._getWebColorFromXreColor(color.value);
				nexacro.__setCanvasShadowColor(_handle, _handle._shadowColor);
			}
		};

		_pCanvasElement.setElementShadowOffsetX = function (offsetx) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowOffsetX = offsetx;
				nexacro.__setCanvasShadowOffsetX(_handle, offsetx);
			}
		};

		_pCanvasElement.setElementShadowOffsetY = function (offsety) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowOffsetY = offsety;
				nexacro.__setCanvasShadowOffsetY(_handle, offsety);
			}
		};

		_pCanvasElement.setElementTextAlign = function (align) {
			var _handle = this._handle;
			if (_handle) {
				this.textAlign = align;
				nexacro.__setCanvasTextAlign(_handle, align);
			}
		};

		_pCanvasElement.setElementTextBaseline = function (value) {
			var _handle = this._handle;
			if (_handle) {
				this.textBaseline = value;
				nexacro.__setCanvasTextBaseline(_handle, value);
			}
		};

		_pCanvasElement.arc = function (x, y, r, start_rad, end_rad, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__darwCanvasArc(_handle, x, y, r, start_rad, end_rad, counterclockwise);
			}
		};

		_pCanvasElement.arc2 = function (x, y, r, start_deg, end_deg, counterclockwise) {
			var start_rad = nexacro._degreesToRadians(start_deg);
			var end_rad = nexacro._degreesToRadians(end_deg);
			var _handle = this._handle;
			if (_handle) {
				nexacro.__darwCanvasArc(_handle, x, y, r, start_rad, end_rad, counterclockwise);
			}
		};

		_pCanvasElement.arcTo = function (x, y, x2, y2, r) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasArcTo(_handle, x, y, x2, y2, r);
			}
		};

		_pCanvasElement.beginPath = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasBeginPath(_handle);
			}
		};

		_pCanvasElement.bezierCurveTo = function (p1x, p1y, p2x, p2y, x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasBezierCurveTo(_handle, p1x, p1y, p2x, p2y, x, y);
			}
		};

		_pCanvasElement.clip = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__clipCanvas(_handle);
			}
		};

		_pCanvasElement.closePath = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasClosePath(_handle);
			}
		};

		_pCanvasElement.drawImage = function (objimage, x, y, imgWidth, imgHeight) {
			var _handle = this._handle;
			var img = objimage._handle;
			if (img && _handle) {
				nexacro.__drawCanvasImage(_handle, img, x, y, imgWidth, imgHeight);
			}
		};

		_pCanvasElement.fill = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__fillCanvas(_handle);
			}
		};

		_pCanvasElement.fillRect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__fillCanvasRect(_handle, x, y, dx, dy);
			}
		};

		_pCanvasElement.fillText = function (text, x, y, maxWidth) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasFillText(_handle, text, x, y, maxWidth);
			}
		};

		_pCanvasElement.isPointInPath = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__isPointInCanvasPath(_handle, x, y);
			}
			return false;
		};

		_pCanvasElement.lineTo = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvaslineTo(_handle, x, y);
			}
		};

		_pCanvasElement.moveTo = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasmoveTo(_handle, x, y);
			}
		};


		_pCanvasElement.quadraticCurveTo = function (px, py, x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasQuadraticCurveTo(_handle, px, py, x, y);
			}
		};

		_pCanvasElement.rect = function (x, y, w, h) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__rectCanvas(_handle, x, y, w, h);
			}
		};

		_pCanvasElement.rotate = function (angle_rad) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__rotateCanvas(_handle, angle_rad);
			}
		};

		_pCanvasElement.rotate2 = function (angle) {
			var radians = nexacro._degreesToRadians(angle);
			this.rotate(radians);
		};

		_pCanvasElement.scale = function (dx, dy) {
			var _handle = this._handle;
			this.scalex = dx;
			this.scaley = dy;
			if (_handle) {
				nexacro.__scaleCanvas(_handle, dx, dy);
			}
		};

		_pCanvasElement.setTransform = function (a, b, c, d, e, f) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setCanvasTransform(_handle, a, b, c, d, e, f);
			}
		};

		_pCanvasElement.stroke = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__strokeCanvas(_handle);
			}
		};

		_pCanvasElement.strokeRect = function (x, y, width, height) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasStrokeRect(_handle, x, y, width, height);
			}
		};

		_pCanvasElement.strokeText = function (text, x, y, maxWidth) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__drawCanvasStrokeText(_handle, text, x, y, maxWidth);
			}
		};

		_pCanvasElement.transform = function (a, b, c, d, e, f) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__transformCanvas(_handle, a, b, c, d, e, f);
			}
		};

		_pCanvasElement.translate = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__translateCanvas(_handle, x, y);
			}
		};

		_pCanvasElement.save = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__saveCanvas(_handle);
			}
		};

		_pCanvasElement.toDataURL = function () {
			var _handle = this._handle;
			try {
				if (_handle) {
					return nexacro.__toDataURLCanvas(_handle);
				}
			}
			catch (e) {
				try {
					if (_handle) {
						return nexacro.__toDataURLCanvas(_handle);
					}
				}
				catch (e) {
					return "";
				}
			}
		};


		_pCanvasElement.restore = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__restoreCanvas(_handle);
			}
		};

		_pCanvasElement.drawArc = function (x, y, r, start_deg, end_deg, bClockwise, bNormal) {
			if (!bNormal) {
				start_deg = start_deg * (Math.PI / 180);
				end_deg = end_deg * (Math.PI / 180);
			}
			this.arc(x, y, r, start_deg, end_deg, bClockwise);
		};

		_pCanvasElement.drawFill = function () {
			this.fill();
			this.beginPath();
		};

		_pCanvasElement._setPenStyle = function (pen) {
			if (pen && pen._isValid()) {
				this.setElementStrokeStyle(pen.color);
				this.setElementLineWidth(pen.width);
			}
		};

		_pCanvasElement.drawStrokeLine = function (x1, y1, x2, y2) {
			this.moveTo(x1, y1);
			this.lineTo(x2, y2);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeVLine = function (x, y1, y2) {
			this.moveTo(x, y1);
			this.lineTo(x, y2);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeHLine = function (y, x1, x2) {
			this.moveTo(x1, y);
			this.lineTo(x2, y);
			this.drawStroke();
		};

		_pCanvasElement.drawFillArc = function (x, y, r, start_rad, end_rad, bClockwise) {
			this.drawArc(x, y, r, start_rad, end_rad, bClockwise, true);
			this.closePath();
			this.fill();
			this.beginPath();
		};

		_pCanvasElement.drawFillArc2 = function (x, y, r, start_deg, end_deg, bClockwise) {
			var start_rad = nexacro._degreesToRadians(start_deg);
			var end_rad = nexacro._degreesToRadians(end_deg);
			this.arc(x, y, r, start_rad, end_rad, bClockwise);
			this.closePath();
			this.fill();
			this.beginPath();
		};

		_pCanvasElement.halfRect = function (x, y, w, h) {
			var gap = this.lineWidth;
			var gap2 = (h > 0) ? gap : -gap;
			this.moveTo(x, y);
			this.lineTo(x, y + h);
			this.lineTo(x + w, y + h);
			this.lineTo(x + w, y);
			this.lineTo(x + w - gap, y);
			this.lineTo(x + w - gap, y + h - gap2);
			this.lineTo(x + gap, y + h - gap2);
			this.lineTo(x + gap, y);
			this.closePath();
		};

		_pCanvasElement.drawStrokeHalfRect = function (x, y, w, h) {
			this.halfRect(x, y, w, h);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeRect = function (x, y, w, h) {
			this.rect(x, y, w, h, true);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeArc = function (x, y, r, start_rad, end_rad, bClockwise) {
			this.arc(x, y, r, start_rad, end_rad, bClockwise);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeArc2 = function (x, y, r, start_deg, end_deg, bClockwise) {
			this.arc2(x, y, r, start_deg, end_deg, bClockwise);
			this.drawStroke();
		};

		_pCanvasElement.drawStrokeInsetRect = function (x, y, w, h) {
			this.insetRect(x, y, w, h);
			this.drawStroke();
		};

		_pCanvasElement.hline = function (y, x1, x2) {
			this.moveTo(x1, y);
			this.lineTo(x2, y);
		};

		_pCanvasElement.vline = function (x, y1, y2) {
			this.moveTo(x, y1);
			this.lineTo(x, y2);
		};


		if (!(nexacro.Browser == "IE" && nexacro.BrowserVersion < 9)) {
			_pCanvasElement.create = function () {
				var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
				if (_owner_elem && _owner_elem._handle) {
					var _handle = this._handle;
					if (!_handle) {
						this._owner_elem = _owner_elem;
						var _doc = _owner_elem.getRootWindowHandle();
						_handle = _doc.createElement("div");
						_handle._linked_element = this;
						_handle._element_type = 7;

						nexacro.__setDOMNodeSelectable(_handle, false);

						this._handle = this._dest_handle = _handle;
						var _draw_node = _doc.createElement("canvas");
						_handle._draw_node = _draw_node;
						_handle._draw_ctx = _draw_node.getContext("2d");
						var node_style = _draw_node.style;
						node_style.border = "none";
						nexacro.__setDOMNodeStyleAbsoluteTransparent(node_style);
						nexacro.__setDOMNodeStylePos(node_style, this.left, this.top);
						nexacro.__setCanvasNodeSize(_draw_node, this.width, this.height);
						nexacro.__setCanvasTextAlign(_handle, this.textAlign);

						nexacro.__appendDOMNode(_handle, _draw_node);

						nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
					}
				}
			};

			_pCanvasElement.destroy = function () {
				var _handle = this._handle;
				if (_handle) {
					_handle._linked_element = null;

					var _owner_handle = null;
					if (this._owner_elem && this._owner_elem._dest_handle) {
						_owner_handle = this._owner_elem._dest_handle;
					}

					if (!this._owner_elem || _owner_handle) {
						nexacro.__removeDOMNode(_owner_handle, _handle);
					}

					this._owner_elem = null;
					this._handle = this._dest_handle = null;

					_handle._draw_node = null;
					_handle._draw_ctx = null;
				}
				this.parent = null;
				this._parent_elem = null;
			};

			_pCanvasElement._drawRotate = function (angle_deg) {
				var _handle = this._handle;
				if (!_handle) {
					return;
				}

				var angle_rad = angle_deg * Math.PI / 180;
				this._handle._draw_ctx.rotate(angle_rad);
			};

			_pCanvasElement.circle = function (x, y, r) {
				this.arc(x, y, r, 0, 2 * Math.PI, true);
			};

			_pCanvasElement.drawStrokeCircle = function (x, y, r) {
				this.arc(x, y, r, 0, 2 * Math.PI, true);
				this.drawStroke();
			};

			_pCanvasElement.drawStrokeInsetArc = function (x, y, r, start_deg, end_deg) {
				var gap = this.lineWidth / 2;
				this.drawArc(x, y, r - gap, start_deg, end_deg);
				this.drawStroke();
			};

			_pCanvasElement.drawStrokeInsetCircle = function (x, y, r) {
				var gap = this.lineOffset;
				this.arc(x, y, r - gap, 0, 2 * Math.PI, true);
				this.drawStroke();
			};

			_pCanvasElement.drawFillRect = function (x, y, dx, dy) {
				this.rect(x, y, dx, dy);
				this.fill();
				this.beginPath();
			};

			_pCanvasElement.endDraw = function () {
				this.beginPath();
				this.closePath();
			};

			_pCanvasElement.drawStroke = function () {
				this.stroke();
				this.beginPath();
			};

			_pCanvasElement.drawFillCircle = function (x, y, r) {
				this.arc(x, y, r, 0, 2 * Math.PI, true);
				this.fill();
				this.beginPath();
			};

			_pCanvasElement.insetRect = function (x, y, w, h) {
				if (w == 0 || h == 0) {
					return;
				}
				var gap = this.lineOffset;
				var wgap = (w > 0) ? gap : -gap;
				var hgap = (h > 0) ? gap : -gap;
				this.moveTo(x + wgap, y + hgap);
				this.lineTo(x + wgap, y + h - hgap);
				this.lineTo(x + w - wgap, y + h - hgap);
				this.lineTo(x + w - wgap, y + hgap);
				this.closePath();
			};

			_pCanvasElement._setLineStyle = function (line) {
				if (line && line._isValid()) {
					this.setElementStrokeStyle(line.color);
					this.setElementLineWidth(line.width);
				}
			};

			_pCanvasElement._moveCanvas = function (left, top, width, height) {
				this.left = left || 0;
				this.top = top || 0;
				this.width = width || 0;
				this.height = height || 0;
				if (this._handle) {
					var _draw_node = this._handle._draw_node;
					if (_draw_node) {
						_draw_node.width = this.width;
						_draw_node.height = this.height;
						var nodeStyle = _draw_node.style;
						nodeStyle.left = this.left + "px";
						nodeStyle.top = this.top + "px";
						nodeStyle.width = this.width + "px";
						nodeStyle.height = this.height + "px";
					}
				}
			};

			_pCanvasElement.measureText = function (text, font) {
				var _handle = this._handle;
				if (_handle) {
					if (!font) {
						font = new nexacro.Style_font(_handle._draw_ctx.font);
					}
					var obj = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), text, font);
					return {
						width : obj[0], 
						height : obj[1]
					};
				}
			};

			_pCanvasElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setCanvasNodeSize(_handle._draw_node, width, height);
					}
				}
			};
		}
		else {
			_pCanvasElement._image_data = null;
			_pCanvasElement.create = function () {
				var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
				if (_owner_elem && _owner_elem._handle) {
					var _handle = this._handle;
					if (!_handle) {
						this._owner_elem = _owner_elem;
						var _doc = _owner_elem.getRootWindowHandle();
						_handle = _doc.createElement("div");
						_handle._linked_element = this;
						_handle._element_type = 7;

						_handle._scale = 10;
						_handle._half_scale = 5;
						_handle._path_str = "";
						_handle._vml_str = "";
						_handle._line_scale = 1;
						_handle._matrix = nexacro._createMatrixIdentity();
						_handle._pathArray = [];
						_handle._image = null;
						_handle._textBaseline = 3;

						this._handle = this._dest_handle = _handle;
						var _draw_node = _doc.createElement("div");
						_handle._draw_node = _draw_node;
						var node_style = _draw_node.style;
						node_style.border = "none";

						nexacro.__setDOMNodeStyleAbsoluteTransparent(node_style);
						nexacro.__setDOMNodeStylePos(node_style, this.left, this.top);
						nexacro.__setDOMNodeSize(node_style, this.width, this.height);
						if (!this.font) {
							this.font = new nexacro.Style_font("8px Arial");
						}
						nexacro.__appendDOMNode(_handle, _draw_node);
						nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
					}
				}
			};

			_pCanvasElement.destroy = function () {
				var _handle = this._handle;
				if (_handle) {
					_handle._linked_element = null;

					var _owner_handle = null;
					if (this._owner_elem && this._owner_elem._dest_handle) {
						_owner_handle = this._owner_elem._dest_handle;
					}

					if (!this._owner_elem || _owner_handle) {
						nexacro.__removeDOMNode(_owner_handle, _handle);
					}

					this._owner_elem = null;
					this._handle = this._dest_handle = null;

					_handle._linked_element = null;
					_handle._pathArray = null;
					_handle._matrix = null;
					_handle._draw_node = null;
				}
				this.parent = null;
				this._parent_elem = null;
			};

			_pCanvasElement._getCoordSize = function (x, y) {
				var m = this._handle._matrix;
				var scale = this._handle._scale;
				var _half_scale = this._handle._half_scale;
				return {
					x : Math.round(scale * (x * m[0][0] + y * m[1][0] + m[2][0]) - _half_scale), 
					y : Math.round(scale * (x * m[0][1] + y * m[1][1] + m[2][1]) - _half_scale)
				};
			};

			_pCanvasElement._getCoordPos = function (x, y) {
				var m = this._handle._matrix;
				return {
					x : (x * m[0][0] + y * m[1][0] + m[2][0]), 
					y : (x * m[0][1] + y * m[1][1] + m[2][1])
				};
			};

			_pCanvasElement._getLineCapStr = function () {
				return (this.lineCap == "butt") ? "flat" : this.lineCap;
			};

			_pCanvasElement._moveCanvas = function (left, top, width, height) {
				this.left = left || 0;
				this.top = top || 0;
				this.width = width || 0;
				this.height = height || 0;
				if (this._handle && this._handle._draw_node) {
					var _draw_node = this._handle._draw_node;
					if (_draw_node) {
						var nodestyle = _draw_node.style;
						nodestyle.left = this.left + "px";
						nodestyle.top = this.top + "px";
						nodestyle.width = this.width + "px";
						nodestyle.height = this.height + "px";
					}
				}
			};

			_pCanvasElement._setLineStyle = function (line) {
				if (line && line._isValid()) {
					this.setElementStrokeStyle(line.color);
					this.setElementLineWidth(line.width);
				}
			};

			_pCanvasElement._setPenStyle = function (pen) {
				if (pen && pen._isValid()) {
					this.setElementStrokeStyle(pen.color);
					this.setElementLineWidth(pen.width);
				}
			};

			_pCanvasElement._circle = function (x, y, r) {
				var _handle = this._handle;
				if (_handle) {
					var scale = _handle._scale;
					var hscale = _handle._half_scale;
					var _r = r * scale;
					var xStart = x + _r - hscale;
					var yStart = y - hscale;

					var p = this._getCoordSize(x, y);
					var sp = this._getCoordSize(xStart, yStart);
					var sub = ' at' + (p.x - _r) + ',' + (p.y - _r) + ' ' + (p.x + _r) + ',' + (p.y + _r) + ' ' + 
						sp.x + ',' + sp.y + ' ' + sp.x + ',' + sp.y + ' ';

					_handle._pathArray.push({
						x : p.x - _r, 
						y : p.y - _r
					});
					_handle._pathArray.push({
						x : p.x + _r, 
						y : p.y + _r
					});
					_handle._pathArray.push({
						x : sp.x, 
						y : sp.y
					});

					_handle._path_str += sub;
				}
			};

			_pCanvasElement.circle = function (x, y, r, bstroke) {
				if (bstroke) {
					var gap = this.lineOffset;
					this._circle(x, y, r - gap);
				}
				else {
					this._circle(x, y, r);
				}
			};

			_pCanvasElement.insetRect = function (x, y, w, h) {
				if (w == 0 || h == 0) {
					return;
				}
				var wgap = (w > 0) ? gap : -gap;
				var hgap = (h > 0) ? gap : -gap;
				this.moveTo(x + wgap, y + hgap);
				this.lineTo(x + wgap, y + h - hgap);
				this.lineTo(x + w - wgap, y + h - hgap);
				this.lineTo(x + w - wgap, y + hgap);
				this.closePath();
			};

			_pCanvasElement.drawHalfRect = function (x, y, w, h) {
				this.halfRect(x, y, w, h);
				this.drawStroke();
			};

			_pCanvasElement.drawFillRect = function (x, y, dx, dy) {
				this.moveTo(x, y);
				this.lineTo(x + dx, y);
				this.lineTo(x + dx, y + dy);
				this.lineTo(x, y + dy);
				this.closePath();
				this.fill();
				this.beginPath();
			};

			_pCanvasElement.strokeRect = function (x, y, dx, dy) {
				this.rect(x, y, dx, dy, true);
				this.drawStroke();
			};

			_pCanvasElement.drawStrokeInsetArc = function (x, y, r, start_deg, end_deg) {
				var gap = this.lineWidth;
				this.drawArc(x, y, r - gap, start_deg, end_deg);
				this.drawStroke();
				this.closePath();
			};

			_pCanvasElement.drawFillCircle = function (x, y, r) {
				this.circle(x, y, r);
				this.fill();
				this.beginPath();
			};

			_pCanvasElement.drawStrokeCircle = function (x, y, r) {
				var gap = this.lineOffset;
				this.circle(x, y, r + gap);
				this.circle(x, y, r - gap);
				this.drawStroke();
			};

			_pCanvasElement.drawStrokeInsetCircle = function (x, y, r) {
				var gap = this.lineWidth;
				this.circle(x, y, r);
				this.circle(x, y, r - gap);
				this.drawStroke();
			};

			_pCanvasElement.drawStroke = function () {
				var _handle = this._handle;
				var elem = _handle._linked_element;
				if (_handle && _handle._path_str) {
					var vml_str = "";
					vml_str += "<v:shape filled='f' stroked='t' style='position:absolute;width:10px;height:10px;' ";
					vml_str += "coordorigin='0 0' coordsize='" + _handle._scale * 10 + ' ' + _handle._scale * 10 + "' ";
					vml_str += "color='" + _handle._stroke_color + "' ";
					vml_str += "strokecolor='" + _handle._stroke_color + "' ";
					if (_handle._stroke_alpha != 1) {
						vml_str += "opacity='" + _handle._stroke_alpha + "' ";
					}

					var lineWidth = elem.lineWidth * _handle._line_scale;
					vml_str += "joinstyle='" + elem.lineJoin + "' endcap='" + elem._getLineCapStr() + "' strokeweight='" + lineWidth + "px' ";
					vml_str += "path='" + _handle._path_str + "' />";

					_handle._vml_str += vml_str;
					_handle._draw_node.innerHTML = _handle._vml_str;
					_handle._path_str = "";
				}
			};
			_pCanvasElement.endDraw = function () {
				this.beginPath();
			};

			_pCanvasElement.measureText = function (text, font) {
				var _handle = this._handle;
				if (_handle) {
					if (!font) {
						return;
						font = new nexacro.Style_font();
					}
					var obj = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), text, font);
					return {
						width : obj[0], 
						height : obj[1]
					};
				}
			};

			_pCanvasElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setCanvasNodeSize(_handle._draw_node.style, width, height);
						_handle._draw_node.innerHTML = "";
						_handle._vml_str = "";
						_handle._path_str = "";
					}
				}
			};
		}

		_pCanvasElement.drawFillText = function (text, x, y, maxwidth) {
			this.fillText(text, x, y, maxwidth);
			this.beginPath();
		};

		_pCanvasElement.drawBorder = function (x, y, width, height, border, bordertype) {
			if (false && bordertype && bordertype.type == "round") {
				if (border.width && border.color != "" && border.color != "transparent") {
					var color = new nexacro.Style_color(border.color);
					this.setElementStrokeStyle(color);
					this.setElementLineWidth(parseInt(border.width));
					var radius_x = bordertype._radiusx, radius_y = bordertype._radiusy;
					if (radius_x > 0 && radius_y > 0) {
						var round_adjust = 0;
						if ((radius_x + radius_x) > width) {
							round_adjust = radius_x - Math.floor(width / 2);
						}
						if ((radius_y + radius_y) > height) {
							var round_adjust2 = radius_y - Math.floor(height / 2);
							if (round_adjust2 > round_adjust) {
								round_adjust = round_adjust2;
							}
						}
						if (round_adjust) {
							radius_x -= round_adjust;
							radius_y -= round_adjust;
						}

						this.moveTo(x + radius_x + 1000, y);
						this.arcTo(x + width, y, x, y + radius_y, radius_y);
						this.lineTo(bottomright.x, bottomright.y - rounding.w);
						this.arcTo(bottomright.x, bottomright.y, bottomright.x - rounding.w, bottomright.y, rounding.w);
						this.lineTo(bottomleft.x + rounding.h, bottomleft.y);
						this.arcTo(bottomleft.x, bottomleft.y, bottomleft.x, bottomleft.y - rounding.h, rounding.h);
						this.lineTo(topleft.x, topleft.y + rounding.x);
						this.arcTo(topleft.x, topleft.y, topleft.x + rounding.x, topleft.y, rounding.x);

						this.drawStroke();
					}
					else {
						this.drawStrokeInsetRect(x, y, width, height);
					}
				}
			}
			else if (border && !border._is_empty) {
				if (border._linecnt == 1) {
					if (border.width && border.color != "" && border.color != "transparent") {
						var color = new nexacro.Style_color(border.color);
						this.setElementStrokeStyle(color);
						this.setElementLineWidth(parseInt(border.width));
						this.drawStrokeInsetRect(x, y, width, height);
					}
				}
				else if (border._linecnt == 2) {
					if (border.top._isValid()) {
						this._setLineStyle(border.top);
						var offset = border.top._width / 2;
						this.moveTo(x, y + offset);
						this.lineTo(x + width, y + offset);
						this.moveTo(x, y + height - offset);
						this.lineTo(x + width, y + height - offset);
						this.stroke();
					}
					if (border.right._isValid()) {
						this._setLineStyle(border.right);
						var offset = border.right._width / 2;
						this.moveTo(x + width - offset, y);
						this.lineTo(x + width - offset, y + height);
						this.moveTo(x + offset, y);
						this.lineTo(x + offset, y + height);
						this.stroke();
					}
				}
				else if (border._linecnt == 3) {
					if (border.top._isValid()) {
						this._setLineStyle(border.top);
						var offset = border.top._width / 2;
						this.moveTo(x, y + offset);
						this.lineTo(x + width, y + offset);
						this.stroke();
					}
					if (border.right._isValid()) {
						this._setLineStyle(border.right);
						var offset = border.right._width / 2;
						this.moveTo(x + width - offset, y);
						this.lineTo(x + width - offset, y + height);
						this.moveTo(x + offset, y);
						this.lineTo(x + offset, y + height);
						this.stroke();
					}
					if (border.bottom._isValid()) {
						this._setLineStyle(border.bottom);
						var offset = border.bottom._width / 2;
						this.moveTo(x, y + width - offset);
						this.lineTo(x + width, y + width - offset);
						this.stroke();
					}
				}
				else {
					if (border.top._isValid()) {
						this._setLineStyle(border.top);
						var offset = border.top._width / 2;
						this.moveTo(x, y + offset);
						this.lineTo(x + width, y + offset);
						this.stroke();
					}
					if (border.right._isValid()) {
						this._setLineStyle(border.right);
						var offset = border.right._width / 2;
						this.moveTo(x + width - offset, y);
						this.lineTo(x + width - offset, y + height);
						this.stroke();
					}
					if (border.bottom._isValid()) {
						this._setLineStyle(border.bottom);
						var offset = border.bottom._width / 2;
						this.moveTo(x, y + width - offset);
						this.lineTo(x + width, y + width - offset);
						this.stroke();
					}
					if (border.left._isValid()) {
						this._setLineStyle(border.left);
						var offset = border.left._width / 2;
						this.moveTo(x + offset, y);
						this.lineTo(x + offset, y + height);
						this.stroke();
					}
				}
			}
		};

		_pCanvasElement = null;

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

		nexacro.GridScrollableControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			this._target_vscroll_elements = null;
			this._target_hscroll_elements = null;
			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;
		};
		var _pGridScrollableControlElement = nexacro._createPrototype(nexacro.ControlElementBase, nexacro.GridScrollableControlElement);
		nexacro.GridScrollableControlElement.prototype = _pGridScrollableControlElement;
		_pGridScrollableControlElement._type_name = "GridScrollableControlElement";

		_pGridScrollableControlElement.scroll_left = 0;
		_pGridScrollableControlElement.scroll_top = 0;
		_pGridScrollableControlElement.container_maxwidth = 0;
		_pGridScrollableControlElement.container_maxheight = 0;
		_pGridScrollableControlElement._hscroll_visible = false;
		_pGridScrollableControlElement._vscroll_visible = false;
		_pGridScrollableControlElement._hscroll_height = 0;
		_pGridScrollableControlElement._vscroll_width = 0;
		_pGridScrollableControlElement._hscroll_left = 0;
		_pGridScrollableControlElement._hscroll_top = 0;
		_pGridScrollableControlElement._hscroll_width = 0;
		_pGridScrollableControlElement._vscroll_left = 0;
		_pGridScrollableControlElement._vscroll_top = 0;
		_pGridScrollableControlElement._vscroll_height = 0;
		_pGridScrollableControlElement.hscroll_limit = 0;
		_pGridScrollableControlElement.vscroll_limit = 0;
		_pGridScrollableControlElement._scroll_showtype = -1;
		_pGridScrollableControlElement._scrollview_width_top = 0;
		_pGridScrollableControlElement._hscroll_control = null;
		_pGridScrollableControlElement._vscroll_control = null;
		_pGridScrollableControlElement._resizebutton_element = null;
		_pGridScrollableControlElement._scroll_overlap = false;

		_pGridScrollableControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle) {
				if (!this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					_handle.id = this.linkedcontrol._unique_id;
					_handle._linked_element = this;
					_handle._element_type = 1;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					if (!nexacro._allow_default_pinchzoom && nexacro._isDesktop()) {
						if (this.linkedcontrol.parent._type_name == "Form" && this.linkedcontrol.position.toLowerCase() == "fixed") {
							nexacro.__setDOMNodeStyleFixed(handle_style);
						}
						else {
							nexacro.__setDOMNodeStyleAbsolute(handle_style);
						}
					}
					else {
						nexacro.__setDOMNodeStyleAbsolute(handle_style);
					}
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
				nexacro._observeSysEvent(this._client_element._handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				nexacro._observeSysEvent(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
			}
		};

		_pGridScrollableControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro._stopSysObserving(this._client_element._handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				nexacro._stopSysObserving(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();

				this._client_element.destroy();
				this._client_element = null;

				if (this._target_vscroll_elements) {
					if (nexacro._isArray(this._target_vscroll_elements)) {
						for (var i = 0, n = this._target_vscroll_elements.length; i < n; i++) {
							this._target_vscroll_elements[i] = null;
						}
					}

					this._target_vscroll_elements = null;
				}

				if (this._target_hscroll_elements) {
					if (nexacro._isArray(this._target_hscroll_elements)) {
						for (var i = 0, n = this._target_hscroll_elements.length; i < n; i++) {
							this._target_hscroll_elements[i] = null;
						}
					}

					this._target_hscroll_elements = null;
				}


				this._hscroll_control = null;
				this._vscroll_control = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pGridScrollableControlElement.clearContents = function () {
			if (this._handle) {
				nexacro._stopSysObserving(this._client_element._handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				nexacro._stopSysObserving(this._handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
				this._client_element.clearContents();
			}
		};

		_pGridScrollableControlElement._syshandler_onscroll_forward = function (evt) {
			if (window.event) {
				evt = window.event;
			}
			var target = evt.srcElement || evt.target;
			target.scrollLeft = 0;
			target.scrollTop = 0;
		};

		_pGridScrollableControlElement.getContainerElement = function (position_step) {
			return this._client_element;
		};

		_pGridScrollableControlElement.setVertScrollElements = function (elems) {
			this._target_vscroll_elements = elems;
		};

		_pGridScrollableControlElement.setHorzScrollElements = function (elems) {
			this._target_hscroll_elements = elems;
		};

		_pGridScrollableControlElement.setContainerVScrollPos = function (pos) {
			var vert_elems = this._target_vscroll_elements;
			if (vert_elems) {
				if (nexacro._isArray(vert_elems)) {
					var elem;
					for (var i = 0, n = vert_elems.length; i < n; i++) {
						elem = vert_elems[i];
						elem.setElementVScrollPos(pos);
					}
				}
				else {
					vert_elems.setElementVScrollPos(pos);
				}
			}
		};

		_pGridScrollableControlElement.setContainerHScrollPos = function (pos) {
			var horz_elems = this._target_hscroll_elements;
			if (horz_elems) {
				if (nexacro._isArray(horz_elems)) {
					var elem;
					for (var i = 0, n = horz_elems.length; i < n; i++) {
						elem = horz_elems[i];
						elem.setElementHScrollPos(pos);
					}
				}
				else {
					horz_elems.setElementHScrollPos(pos);
				}
			}
		};

		_pGridScrollableControlElement.setContainerMaxHeight = function (height) {
			var vert_elems = this._target_vscroll_elements;
			if (vert_elems) {
				this.container_maxheight = height;
				if (nexacro._isArray(vert_elems)) {
					var elem;
					for (var i = 0, n = vert_elems.length; i < n; i++) {
						elem = vert_elems[i];
						elem._setContainerMaxHeight(height);
					}
				}
				else {
					vert_elems._setContainerMaxHeight(height);
				}
			}
		};

		_pGridScrollableControlElement.setContainerMaxWidth = function (width) {
			var horz_elems = this._target_hscroll_elements;
			if (horz_elems) {
				this.container_maxwidth = width;
				if (nexacro._isArray(horz_elems)) {
					var elem;
					for (var i = 0, n = horz_elems.length; i < n; i++) {
						elem = horz_elems[i];
						elem._setContainerMaxWidth(width);
					}
				}
				else {
					horz_elems._setContainerMaxWidth(width);
				}
			}
		};

		_pGridScrollableControlElement._updateClientSize = function () {
			var client_left = this._inner_left;
			var client_top = this._inner_top;
			var client_width = this._inner_width;
			var client_height = this._inner_height;

			var client_element = this._client_element;
			if (this._scroll_showtype > 0) {
				var v_elements = this._target_vscroll_elements, v_element = v_elements, h_elements = this._target_hscroll_elements, h_element = h_elements;
				if (nexacro._isArray(v_elements)) {
					v_element = v_elements[0];
				}
				if (nexacro._isArray(h_elements)) {
					h_element = h_elements[0];
				}

				var v_client_height = (v_element) ? v_element._calculateClientHeight(client_height - this.client_height) : client_height - this.client_height;
				var h_client_width = (h_element) ? h_element._calculateClientWidth(client_width - this.client_width) : client_width - this.client_width;
				var maxheight = (v_element) ? v_element._getContainerMaxHeight() : 0;
				var maxwidth = (h_element) ? h_element._getContainerMaxWidth() : 0;
				var scrollLeft = (h_element) ? h_element._getScrollLeft() : 0;
				var scrollTop = (v_element) ? v_element._getScrollTop() : 0;
				var hscroll_visible = false;
				var vscroll_visible = false;
				var hscroll_limit = 0;
				var vscroll_limit = 0;

				var step_count = this._step_count;
				var hscroll_hidden = false;
				var scroll_showtype = this._scroll_showtype;

				if (scroll_showtype == 1) {
					if (this._vscroll_control && maxheight > v_client_height) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						vscroll_limit = maxheight - v_client_height;
					}
					h_client_width = (h_element) ? h_element._calculateClientWidth(client_width - this.client_width) : client_width - this.client_width;
					if (this._hscroll_control && maxwidth > h_client_width) {
						hscroll_visible = true;
						client_height -= this._hscroll_height;
						v_client_height = (v_element) ? v_element._calculateClientHeight(client_height - this.client_height) : client_height - this.client_height;
						if (this._vscroll_control && maxheight > v_client_height) {
							if (!vscroll_visible) {
								vscroll_visible = true;
								client_width -= this._vscroll_width;
								h_client_width -= this._vscroll_width;
							}
							vscroll_limit = maxheight - v_client_height;
						}
						hscroll_limit = maxwidth - h_client_width;
					}
				}
				else if (scroll_showtype == 2) {
					if (this._vscroll_control) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						vscroll_limit = maxheight + this._hscroll_height - v_client_height;
					}
					if (step_count > 0 && step_containers) {
						maxwidth = step_count * this.client_width;
					}
					h_client_width = (h_element) ? h_element._calculateClientWidth(client_width - this.client_width) : client_width - this.client_width;
					if (this._hscroll_control) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
						}
						hscroll_limit = maxwidth - h_client_width;
					}
				}
				else if (scroll_showtype == 31) {
					if (this._vscroll_control) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						vscroll_limit = maxheight - v_client_height;
					}
					if (step_count > 0 && step_containers) {
						maxwidth = step_count * this.client_width;
					}
					h_client_width = (h_element) ? h_element._calculateClientWidth(client_width - this.client_width) : client_width - this.client_width;
					if (this._hscroll_control && maxwidth > h_client_width) {
						hscroll_visible = true;
						client_height -= this._hscroll_height;
						v_client_height = (v_element) ? v_element._calculateClientHeight(client_height - this.client_height) : client_height - this.client_height;
						if (this._vscroll_control && maxheight > v_client_height) {
							if (!vscroll_visible) {
								vscroll_visible = true;
								client_width -= this._vscroll_width;
								h_client_width -= this._vscroll_width;
							}
							vscroll_limit = maxheight - v_client_height;
						}
						hscroll_limit = maxwidth - h_client_width;
					}
				}
				else if (scroll_showtype == 32) {
					if (this._vscroll_control && maxheight > v_client_height) {
						vscroll_visible = true;
						client_width -= this._vscroll_width;
						vscroll_limit = maxheight + this._hscroll_height - v_client_height;
					}
					if (step_count > 0 && step_containers) {
						maxwidth = step_count * this.client_width;
					}
					h_client_width = (h_element) ? h_element._calculateClientWidth(client_width - this.client_width) : client_width - this.client_width;
					if (this._hscroll_control) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
						}
						hscroll_limit = maxwidth - h_client_width;
					}
				}

				if (hscroll_limit < 0) {
					hscroll_limit = 0;
				}

				if (vscroll_limit < 0) {
					vscroll_limit = 0;
				}

				var reset_vlimit = false;
				var reset_hlimit = false;
				if (this.hscroll_limit != hscroll_limit) {
					reset_hlimit = true;
					this.hscroll_limit = hscroll_limit;
				}
				if (this.vscroll_limit != vscroll_limit) {
					reset_vlimit = true;
					this.vscroll_limit = vscroll_limit;
				}

				var reset_vscroll = false;
				var reset_hscroll = false;
				var reset_vscroll_enable = false;
				var reset_hscroll_enable = false;

				if (scrollTop > vscroll_limit) {
					reset_vscroll = true;
					scrollTop = vscroll_limit;
				}
				if (scrollLeft > hscroll_limit) {
					reset_hscroll = true;
					scrollLeft = hscroll_limit;
				}

				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}
				if (this.client_width != client_width || this.client_height != client_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(client_width, client_height);
				}

				if (reset_hscroll) {
					this.setElementHScrollPos(scrollLeft);
				}
				if (reset_vscroll) {
					this.setElementVScrollPos(scrollTop);
				}

				if (this._vscroll_control) {
					if (this._vscroll_control.parent.enable != this._vscroll_control.enable) {
						reset_vscroll_enable = true;
					}

					if (vscroll_visible) {
						if (!this._vscroll_visible) {
							this._vscroll_visible = true;
							this._vscroll_control.set_visible(true);
						}
						if (this._vscroll_left != (client_left + client_width) || this._vscroll_top != client_top || this._vscroll_height != client_height || reset_vlimit) {
							this._vscroll_left = (client_left + client_width);
							this._vscroll_top = client_top;
							this._vscroll_height = client_height;
							this._vscroll_control._setScrollInfo(this._vscroll_left, client_top, this._vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, v_client_height, v_client_height, true, scrollTop);
						}
						else {
							this._vscroll_control._setScrollInfo(this._vscroll_left, client_top, this._vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, v_client_height, v_client_height, true, scrollTop);
							if (reset_vscroll) {
								this._vscroll_control._setScrollPos(scrollTop);
							}
						}

						if (reset_vscroll_enable) {
							this._vscroll_control._setEnable(this._vscroll_control.parent.enable);
						}
					}
					else {
						if (this._vscroll_visible) {
							this._vscroll_visible = false;
							this._vscroll_control.set_visible(false);
						}

						if (this._vscroll_left != (client_left + client_width) || this._vscroll_top != client_top || this._vscroll_height != client_height || reset_vlimit) {
							this._vscroll_left = (client_left + client_width);
							this._vscroll_top = client_top;
							this._vscroll_height = client_height;
							this._vscroll_control._setScrollInfo(this._vscroll_left, client_top, this._vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, v_client_height, v_client_height, false, scrollTop);
						}
						else if (reset_vscroll) {
							this._vscroll_control._setScrollPos(scrollTop);
						}

						if (reset_vscroll_enable) {
							this._vscroll_control._setEnable(this._vscroll_control.parent.enable);
						}
					}
				}
				if (this._hscroll_control) {
					if (this._hscroll_control.parent.enable != this._hscroll_control.enable) {
						reset_hscroll_enable = true;
					}

					if (hscroll_visible) {
						if (!this._hscroll_visible) {
							this._hscroll_visible = true;
							this._hscroll_control.set_visible(true);
						}
						if (this._hscroll_left != client_left || this._hscroll_top != (client_top + client_height) || this._hscroll_width != client_width || reset_hlimit) {
							this._hscroll_left = client_left;
							this._hscroll_top = (client_top + client_height);
							this._hscroll_width = client_width;
							this._hscroll_control._setScrollInfo(client_left, this._hscroll_top, this._hscroll_width, this._hscroll_height, 0, this.hscroll_limit, 30, h_client_width, h_client_width, true, scrollLeft);
						}
						else if (reset_hscroll) {
							this._hscroll_control._setScrollPos(scrollLeft);
						}

						if (reset_hscroll_enable) {
							this._hscroll_control._setEnable(this._hscroll_control.parent.enable);
						}
					}
					else {
						if (this._hscroll_visible) {
							this._hscroll_visible = false;
							this._hscroll_control.set_visible(false);
						}

						if (this._hscroll_left != client_left || this._hscroll_top != (client_top + client_height) || this._hscroll_width != client_width || reset_hlimit) {
							this._hscroll_left = client_left;
							this._hscroll_top = (client_top + client_height);
							this._hscroll_width = client_width;
							this._hscroll_control._setScrollInfo(client_left, this._hscroll_top, this._hscroll_width, this._hscroll_height, 0, this.hscroll_limit, 30, h_client_width, h_client_width, false, scrollLeft);
						}
						else if (reset_hscroll) {
							this._hscroll_control._setScrollPos(scrollLeft);
						}

						if (reset_hscroll_enable) {
							this._hscroll_control._setEnable(this._hscroll_control.parent.enable);
						}
					}
				}
			}
			else {
				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}
				if (this.client_width != client_width || this.client_height != client_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(client_width, client_height);
				}
			}
		};
		_pGridScrollableControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this) {
					if (child_elem._handle) {
						var old_doc = child.elem.getRootWindowHandle();
						var new_doc = this._client_element.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this;
						}
					}
					else {
						child_elem._parent_elem = this;
					}
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					child_elem._appendToContainer(this._client_element);
				}
			}
		};
		_pGridScrollableControlElement.removeChildElement = function (child_elem) {
			if (child_elem._parent_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pGridScrollableControlElement.sendToBackElement = function (cur_elem) {
			this._client_element.sendToBackElement(cur_elem);
		};
		_pGridScrollableControlElement.bringToFrontElement = function (cur_elem) {
			this._client_element.bringToFrontElement(cur_elem);
		};
		_pGridScrollableControlElement.moveToNextElement = function (cur_elem, target_elem) {
			this._client_element.moveToNextElement(cur_elem, target_elem);
		};
		_pGridScrollableControlElement.moveToPrevElement = function (cur_elem, target_elem) {
			this._client_element.moveToPrevElement(cur_elem, target_elem);
		};


		_pGridScrollableControlElement.setScrollControls = function (hscroll_control, vscroll_control, hscroll_height, vscroll_width, scroll_showtype) {
			var recalc = false;
			if (this._scroll_showtype != scroll_showtype) {
				this._scroll_showtype = scroll_showtype;
				recalc = true;
			}

			if (this._hscroll_control != hscroll_control) {
				if (hscroll_control) {
					this._hscroll_visible = true;
					hscroll_control._is_nc_control = true;
					this._hscroll_control = hscroll_control;
					if (this._hscroll_height != hscroll_height) {
						this._hscroll_height = hscroll_height;
						recalc = true;
					}
				}
				else {
					this._hscroll_control = null;
					if (this._hscroll_height) {
						this._hscroll_height = 0;
						recalc = true;
					}
					this._hscroll_left = 0;
					this._hscroll_top = 0;
					this._hscroll_width = 0;
				}
			}

			if (this._vscroll_control != vscroll_control) {
				if (vscroll_control) {
					this._vscroll_visible = true;
					vscroll_control._is_nc_control = true;
					this._vscroll_control = vscroll_control;
					if (this._vscroll_width != vscroll_width) {
						this._vscroll_width = vscroll_width;
						recalc = true;
					}
				}
				else {
					this._vscroll_control = null;
					if (this._vscroll_width) {
						this._vscroll_width = 0;
						recalc = true;
					}
					this._vscroll_left = 0;
					this._vscroll_top = 0;
					this._vscroll_height = 0;
				}
			}

			if (recalc) {
				this._updateClientSize();
			}
		};

		_pGridScrollableControlElement._arrangeBandOrder = function () {
			var comp = this.linkedcontrol;
			if (comp) {
				var client_element = this._client_element;
				var control_element = null;

				if (client_element._handle) {
					if (comp._headBand) {
						control_element = comp._headBand._control_element;
						nexacro.__removeDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._bodyBand) {
						control_element = comp._bodyBand._control_element;
						nexacro.__removeDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._summBand) {
						control_element = comp._summBand._control_element;
						nexacro.__removeDOMNode(client_element._dest_handle, control_element._handle);
					}

					if (comp._headBand) {
						control_element = comp._headBand._control_element;
						nexacro.__appendDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._bodyBand) {
						control_element = comp._bodyBand._control_element;
						nexacro.__appendDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._summBand) {
						control_element = comp._summBand._control_element;
						nexacro.__appendDOMNode(client_element._dest_handle, control_element._handle);
					}
				}
				delete control_element;
			}
		};

		_pGridScrollableControlElement._arrangeBandOrder = function () {
			var comp = this.linkedcontrol;
			if (comp) {
				var client_element = this._client_element;
				var control_element = null;

				if (client_element._handle) {
					if (comp._headBand) {
						control_element = comp._headBand._control_element;
						nexacro.__removeDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._bodyBand) {
						control_element = comp._bodyBand._control_element;
						nexacro.__removeDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._summBand) {
						control_element = comp._summBand._control_element;
						nexacro.__removeDOMNode(client_element._dest_handle, control_element._handle);
					}

					if (comp._headBand) {
						control_element = comp._headBand._control_element;
						nexacro.__appendDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._bodyBand) {
						control_element = comp._bodyBand._control_element;
						nexacro.__appendDOMNode(client_element._dest_handle, control_element._handle);
					}
					if (comp._summBand) {
						control_element = comp._summBand._control_element;
						nexacro.__appendDOMNode(client_element._dest_handle, control_element._handle);
					}
				}
				delete control_element;
			}
		};

		if (nexacro.OS == "Android" && (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari")) {
			_pGridScrollableControlElement.setElementHScrollPos = function (hpos) {
				var h_element = this._target_hscroll_elements;

				if (h_element) {
					if (nexacro._isArray(h_element)) {
						h_element = h_element[0];
					}
					if (hpos < 0) {
						hpos = 0;
					}
					if (hpos > this.hscroll_limit) {
						hpos = this.hscroll_limit;
					}
					var scrollLeft = h_element._getScrollLeft();
					if (scrollLeft != hpos || this._reset_scrollpos) {
						this.scroll_left = hpos;
						this.linkedcontrol._scroll_left = hpos;
						this.setContainerHScrollPos(hpos);
						if (this._hscroll_control) {
							this._hscroll_control._setScrollPos(hpos);
						}
					}

					if (this.parent._procRefreshDOM == true) {
						var areacontents;
						if (nexacro._isArray(h_element)) {
							areacontents = h_element[0]._client_body_element;
						}
						else {
							areacontents = h_element._client_body_element;
						}

						if (areacontents) {
							areacontents._refreshDOM();
						}
					}
				}
			};

			_pGridScrollableControlElement.setElementVScrollPos = function (vpos) {
				var v_element = this._target_vscroll_elements;

				if (v_element) {
					if (nexacro._isArray(v_element)) {
						v_element = v_element[0];
					}
					if (vpos < 0) {
						vpos = 0;
					}
					if (vpos > this.vscroll_limit) {
						vpos = this.vscroll_limit;
					}
					var scrollTop = v_element._getScrollTop();
					if (scrollTop != vpos || this._reset_scrollpos) {
						this.scroll_top = vpos;
						this.linkedcontrol._scroll_top = vpos;
						this.setContainerVScrollPos(vpos);
						if (this._vscroll_control && !this._vscroll_control._no_set_scrollinfo) {
							this._vscroll_control._setScrollPos(vpos);
						}
					}

					if (this.parent._procRefreshDOM == true) {
						var bandcontents;
						if (nexacro._isArray(v_element)) {
							bandcontents = v_element[0]._client_element;
						}
						else {
							bandcontents = v_element._client_element;
						}

						if (bandcontents) {
							bandcontents._refreshDOM();
						}
					}
				}
			};
		}
		else {
			_pGridScrollableControlElement.setElementHScrollPos = function (hpos) {
				var h_element = this._target_hscroll_elements;

				if (h_element) {
					if (nexacro._isArray(h_element)) {
						h_element = h_element[0];
					}
					if (hpos < 0) {
						hpos = 0;
					}
					if (hpos > this.hscroll_limit) {
						hpos = this.hscroll_limit;
					}
					var scrollLeft = h_element._getScrollLeft();
					if (scrollLeft != hpos || this._reset_scrollpos) {
						this.scroll_left = hpos;
						this.linkedcontrol._scroll_left = hpos;
						this.setContainerHScrollPos(hpos);
						if (this._hscroll_control && !this._hscroll_control._no_set_scrollinfo) {
							this._hscroll_control._setScrollPos(hpos);
						}
					}
				}
			};

			_pGridScrollableControlElement.setElementVScrollPos = function (vpos) {
				var v_element = this._target_vscroll_elements;

				if (v_element) {
					if (nexacro._isArray(v_element)) {
						v_element = v_element[0];
					}
					if (vpos < 0) {
						vpos = 0;
					}
					if (vpos > this.vscroll_limit) {
						vpos = this.vscroll_limit;
					}
					var scrollTop = v_element._getScrollTop();
					if (scrollTop != vpos || this._reset_scrollpos) {
						this.scroll_top = vpos;
						this.linkedcontrol._scroll_top = vpos;
						this.setContainerVScrollPos(vpos);
						if (this._vscroll_control && !this._vscroll_control._no_set_scrollinfo) {
							this._vscroll_control._setScrollPos(vpos);
						}
					}
				}
			};
		}
		;

		_pGridScrollableControlElement.setElementScrollPos = function (hpos, vpos) {
			var v_element = this._target_vscroll_elements;
			var h_element = this._target_hscroll_elements;

			if (v_element) {
				if (nexacro._isArray(v_element)) {
					v_element = v_element[0];
				}
				if (vpos < 0) {
					vpos = 0;
				}
				if (vpos > this.vscroll_limit) {
					vpos = this.vscroll_limit;
				}

				var scrollTop = v_element._getScrollTop();
				if (scrollTop != vpos) {
					this.scroll_top = vpos;
					this.linkedcontrol._scroll_top = vpos;
					this.setContainerVScrollPos(vpos);
					if (this._vscroll_control) {
						this._vscroll_control._setScrollPos(vpos);
					}
				}
			}
			if (h_element) {
				if (nexacro._isArray(h_element)) {
					h_element = h_element[0];
				}
				if (hpos < 0) {
					hpos = 0;
				}
				if (hpos > this.hscroll_limit) {
					hpos = this.hscroll_limit;
				}

				var scrollLeft = h_element._getScrollLeft();
				if (scrollLeft != hpos) {
					this.scroll_left = hpos;
					this.linkedcontrol._scroll_left = hpos;
					this.setContainerHScrollPos(hpos);
					if (this._hscroll_control) {
						this._hscroll_control._setScrollPos(hpos);
					}
				}
			}
		};

		_pGridScrollableControlElement._setInnerElementScrollMaxSize = function (sizes) {
			var v_element = this._target_vscroll_elements;
			if (v_element && sizes) {
				v_element._client_element._scroll_max_arr = sizes;
			}
		};

		_pGridScrollableControlElement.setElementScrollMaxSize = function (width, height) {
			var v_element = this._target_vscroll_elements;
			if (nexacro._isArray(v_element)) {
				v_element = v_element[0];
			}
			var h_element = this._target_hscroll_elements;
			if (nexacro._isArray(h_element)) {
				h_element = h_element[0];
			}
			var maxheight = (v_element) ? v_element._getContainerMaxHeight() : 0;
			var maxwidth = (h_element) ? h_element._getContainerMaxWidth() : 0;
			var retn = false;

			if (maxwidth != width || maxheight != height) {
				if (maxheight != height) {
					this.setContainerMaxHeight(height);
				}
				if (maxwidth != width) {
					this.setContainerMaxWidth(width);
				}
				retn = true;
			}

			if (v_element && this._scroll_showtype >= 0) {
				this._updateClientSize();
			}

			return retn;
		};

		_pGridScrollableControlElement.setElementScrollMaxWidth = function (width, update) {
			var h_element = this._target_hscroll_elements;
			if (h_element) {
				if (nexacro._isArray(h_element)) {
					h_element = h_element[0];
				}
				var maxwidth = h_element._getContainerMaxWidth();
				if (maxwidth != width) {
					if (maxwidth != width) {
						this.setContainerMaxWidth(width);
					}
					if (update && this._scroll_showtype >= 0) {
						this._updateClientSize();
					}

					return true;
				}
			}
			return false;
		};

		_pGridScrollableControlElement.setElementScrollMaxHeight = function (height, update) {
			var v_element = this._target_vscroll_elements;
			if (v_element) {
				if (nexacro._isArray(v_element)) {
					v_element = v_element[0];
				}
				var maxheight = v_element._getContainerMaxHeight();
				if (maxheight != height) {
					if (maxheight != height) {
						this.setContainerMaxHeight(height);
					}
					if (update && this._scroll_showtype >= 0) {
						this._updateClientSize();
					}

					return true;
				}
			}
			return false;
		};

		_pGridScrollableControlElement.setElementScrollbarSize = function (width, height) {
			if (this._vscroll_width != width || this._hscroll_height != height) {
				this._vscroll_width = width;
				this._hscroll_height = height;
				if (this._scroll_showtype >= 0) {
					this._updateClientSize();
				}

				return true;
			}
			return false;
		};
		delete _pGridScrollableControlElement;

		nexacro.GridBandControlElement = function (parent_elem, type) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._type = type;
			this._client_element = new nexacro.GridBandContainerElement(this);
			this._client_element_fix = null;
			this._fix_height = 0;
			this.container_maxwidth = 0;
			this.container_maxheight = 0;
		};

		var _pGridBandControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridBandControlElement);
		nexacro.GridBandControlElement.prototype = _pGridBandControlElement;

		_pGridBandControlElement._type_name = "GridBandControlElement";

		_pGridBandControlElement.scroll_left = 0;
		_pGridBandControlElement.scroll_top = 0;

		_pGridBandControlElement.create = function () {
			nexacro.ControlElement.prototype.create.call(this);

			if (this._client_element_fix) {
				this._client_element_fix.create();
			}
		};

		_pGridBandControlElement.destroy = function () {
			if (this._client_element_fix) {
				this._client_element_fix.destroy();
				this._client_element_fix = null;
			}
			return nexacro.ControlElement.prototype.destroy.call(this);
		};

		_pGridBandControlElement._setFixArea = function (height) {
			this._fix_height = height;

			if (!this._client_element_fix) {
				this._client_element_fix = new nexacro.GridBandContainerElement(this, true);
			}

			if (this._handle && !this._client_element_fix._handle) {
				this._client_element_fix.create();
			}

			this._updateClientSize();
		};

		_pGridBandControlElement.getContainerElement = function (is_fixed) {
			if (is_fixed) {
				return this._client_element_fix;
			}

			return this._client_element;
		};

		_pGridBandControlElement._setContainerMaxHeight = function (height) {
			if (this._type == "body") {
				if (this.container_maxheight != height) {
					this.container_maxheight = height;
					this._client_element._setScrollHeight(height);
				}
			}
		};

		_pGridBandControlElement._calculateClientHeight = function (change_height) {
			var c_height = this.client_height + change_height + ((this.border) ? this.border._getBorderHeight() : 0);
			return c_height;
		};

		_pGridBandControlElement.setElementBorder = function (border, bordertype) {
			this.border = border;
			this.bordertype = bordertype;
			this._setControlBorder(this, this._handle, border, bordertype, true);
			this._updateClientSize();
			this._client_element._adjustPos();
		};

		_pGridBandControlElement._getContainerMaxHeight = function () {
			if (this._type == "body") {
				return this.container_maxheight;
			}
			else {
				return this.client_height;
			}
		};

		_pGridBandControlElement._getScrollLeft = function () {
			return this.scroll_left;
		};

		_pGridBandControlElement._getScrollTop = function () {
			if (this._type == "body") {
				return this.scroll_top;
			}
			else {
				return 0;
			}
		};

		_pGridBandControlElement._updateClientSize = function () {
			var client_left = 0;
			var client_top = 0;
			var client_width = this._inner_width;
			var client_height = this._inner_height;
			var border = this.border;

			if (border && !border._is_real_empty()) {
				client_width += border._getBorderWidth();
				client_height += border._getBorderHeight();
			}

			var fix_height = this._fix_height;

			client_top += fix_height;
			client_height -= fix_height;

			var client_element_fix = this._client_element_fix;
			if (client_element_fix) {
				client_element_fix.setElementPosition(client_left, 0);
				client_element_fix.setElementSize(client_width, fix_height);
			}

			var client_element = this._client_element;
			if (client_element) {
				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}
				if (this.client_width != client_width || this.client_height != client_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(client_width, client_height);
				}
			}
			else {
				this.client_left = client_left;
				this.client_top = client_top;
				this.client_width = client_width;
				this.client_height = client_height;
			}
		};

		_pGridBandControlElement.setElementVScrollPos = function (vpos) {
			if (this._type == "body") {
				this._client_element._try_user_setvpos = true;
				this._client_element.setElementVScrollPos(vpos);
				this._client_element._try_user_setvpos = null;
				this.scroll_top = vpos;
			}
		};

		_pGridBandControlElement._setOnScrollCallbackTarget = function (target) {
			if (this._type == "body") {
				this._client_element._grid = target;
			}
		};

		_pGridBandControlElement.setElementCursor = nexacro._emptyFn;
		_pGridBandControlElement.setElementShadow = nexacro._emptyFn;

		delete _pGridBandControlElement;


		nexacro.GridBandContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._scroll_max_arr = [];
			this._ext_inner = [];
		};



		var _pGridBandContainerElement;
		var _gridScrollMode = 1;

		if (nexacro.Browser == "Edge" || (nexacro.OS == "Android" && (nexacro.Browser == "Safari" || nexacro.Browser == "MobileSafari"))) {
			_gridScrollMode = 0;
		}

		if (_gridScrollMode) {
			_pGridBandContainerElement = nexacro._createPrototype(nexacro.ScrollableInnerContainerElement, nexacro.GridBandContainerElement);
		}
		else {
			_pGridBandContainerElement = nexacro._createPrototype(nexacro.ScrollableContainerElement, nexacro.GridBandContainerElement);
		}

		nexacro.GridBandContainerElement.prototype = _pGridBandContainerElement;
		_pGridBandContainerElement._type_name = "GridBandContainerElement";

		_pGridBandContainerElement._findScrollbarLinkedControl = function (elem, is_vert) {
			while (elem) {
				var linkedcontrol = elem.linkedcontrol;
				if (linkedcontrol) {
					linkedcontrol = linkedcontrol.parent;
					if (is_vert) {
						if (linkedcontrol.vscrollbar && linkedcontrol.vscrollbar._isVisible()) {
							return linkedcontrol;
						}
					}
					else {
						if (linkedcontrol.hscrollbar && linkedcontrol.hscrollbar._isVisible()) {
							return linkedcontrol;
						}
					}
				}

				elem = elem.parent;
			}
		};

		_pGridBandContainerElement._adjustPos = function () {
			this.setElementPosition(this.left, this.top);
		};

		_pGridBandContainerElement.setElementPosition = function (left, top) {
			var border = this.parent.border;
			this.left = left;
			this.top = top;
			var _handle = this._handle;
			if (_handle) {
				if (border) {
					left = left - border._left_width;
					top = top - border._top_width;
				}
				nexacro.__setDOMNodeStylePos(_handle.style, left, top);
			}
		};

		if (_gridScrollMode) {
			_pGridBandContainerElement.create = function () {
				var _owner_elem = this._parent_elem;
				if (_owner_elem && _owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					_handle.id = this._parent_elem._handle.id + this._type_name;
					_handle._linked_element = this;
					_handle._element_type = 3;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var _dest_handle = _doc.createElement("div");
					_dest_handle.id = _handle.id + "_inner";

					nexacro.__setDOMNodeSelectable(_dest_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsoluteTransparent(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

					var inner_style = _dest_handle.style;
					inner_style.position = "absolute";
					nexacro.__setDOMNodeStylePos(inner_style, 0, 0);
					nexacro.__setDOMNodeStyleSize(inner_style, this.width, this.height);

					if (this.font) {
						nexacro.__setDOMNodeStyleFont(inner_style, this.font);
					}
					if (this.letterspace) {
						nexacro.__setDOMNodeStyleLetterSpace(inner_style, this.letterspace);
					}
					if (this.color) {
						nexacro.__setDOMNodeStyleColor(inner_style, this.color);
					}

					nexacro.__appendDOMNode(_handle, _dest_handle);
					this._dest_handle = _dest_handle;

					this._handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
					this._setScrollHeight(_owner_elem.container_maxheight);
					if (this._scroll_left != 0 || this._scroll_top != 0) {
						nexacro.__setDOMNodeStyleTranslate(inner_style, -this._scroll_left, -this._scroll_top);
					}
					nexacro._observeSysEvent(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
					this._adjustPos();
				}
			};

			_pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
				var target = evt.target;
				if (!target) {
					target = evt.srcElement;
				}

				if (!target) {
					return;
				}

				var container = target._linked_element;
				if (container) {
					if (container._noEventScroll == true) {
						container._noEventScroll = false;
						return;
					}

					var elem_scroll_top = container._scroll_top | 0;

					if (target.scrollLeft > 0) {
						container._noEventScroll = true;
						target.scrollLeft = 0;
					}
					if (target.scrollTop > 0) {
						container._noEventScroll = true;
						target.scrollTop = 0;
					}
				}
			};

			_pGridBandContainerElement._setInnerElementExtend = function () {
				var _handle = this._handle;
				var _dest_handle = this._dest_handle;
				var _scroll_max = this._scroll_max_arr;
				var _doc = this._owner_elem.getRootWindowHandle();

				if (_scroll_max.length > 0) {
					for (var i = 1; i < _scroll_max.length; i++) {
						var _ext_inner = _doc.createElement("div");
						_ext_inner.id = _dest_handle.id + "_ext_" + (i - 1);

						nexacro.__setDOMNodeSelectable(_ext_inner, false);

						var inner_style = _ext_inner.style;
						inner_style.position = "absolute";
						nexacro.__setDOMNodeStylePos(inner_style, 0, _scroll_max[0]);
						nexacro.__setDOMNodeStyleSize(_ext_inner.style, this.width, _scroll_max[i] - _scroll_max[i - 1]);

						nexacro.__appendDOMNode(_handle, _ext_inner);

						this._ext_inner.push(_ext_inner);
					}
				}
			};

			_pGridBandContainerElement._setScrollHeight = function (height) {
				var _handle = this._dest_handle;
				if (_handle) {
					if (this._scroll_max_arr && this._scroll_max_arr.length > 0) {
						nexacro.__setDOMNodeStyleSize(_handle.style, this.width, this._scroll_max_arr[0]);
						this._setInnerElementExtend();
					}
					else {
						nexacro.__setDOMNodeStyleSize(_handle.style, this.width, height);
					}
				}
			};

			if (_gridScrollMode == 2) {
				_pGridBandContainerElement.setElementVScrollPos = function (vpos) {
					if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
						this._scroll_top = vpos;
						var _inner_handle = this._dest_handle;
						if (_inner_handle) {
							nexacro.__setDOMNodeStylePos(_inner_handle.style, 0, -vpos);

							if (this._grid) {
								this._grid._callback_onscroll(vpos);
							}
						}
					}
				};
			}
			else {
				_pGridBandContainerElement._getInnerElementIndex = function (top) {
					var _ext_inner = this._ext_inner;
					var _scroll_max = this._scroll_max_arr;
					for (var i = 0; i < _scroll_max.length; i++) {
						if (top < _scroll_max[i]) {
							return i - 1;
						}
					}
					return null;
				};

				_pGridBandContainerElement._changeInnerElement = function (down, top, row_handle) {
					var idx = this._getInnerElementIndex(top);
					var next_handle = (this._ext_inner[idx]) ? this._ext_inner[idx] : this._dest_handle;
					var prev_handle = row_handle.parentElement;

					if (prev_handle != next_handle) {
						if (down) {
							nexacro.__removeDOMNode(prev_handle, row_handle);
							nexacro.__appendDOMNode(next_handle, row_handle);
						}
						else {
							nexacro.__removeDOMNode(prev_handle, row_handle);
							nexacro.__appendDOMNode(next_handle, row_handle);
						}
					}
					else {
						if (idx != null && idx > -1) {
							top = top - this._scroll_max_arr[idx];
						}
					}
					return top;
				};

				_pGridBandContainerElement._setInnerElementVScrollPos = function (vpos) {
					var ext_vpos = vpos;
					var _ext_inner = this._ext_inner;
					var scroll_max_arr = this._scroll_max_arr;
					for (var i = 0; i < _ext_inner.length; i++) {
						if (i > 0) {
							if (vpos >= scroll_max_arr[i - 1]) {
								ext_vpos = vpos - scroll_max_arr[i - 1];

								if (ext_vpos >= scroll_max_arr[1]) {
									ext_vpos = scroll_max_arr[1];
								}

								nexacro.__setDOMNodeStyleTranslateY(_ext_inner[i].style, -ext_vpos);
							}
						}
						else {
							if (vpos >= scroll_max_arr[1]) {
								ext_vpos = scroll_max_arr[1];
							}

							nexacro.__setDOMNodeStyleTranslateY(_ext_inner[0].style, -ext_vpos);
							nexacro.__setDOMNodeStyleTranslateY(this._dest_handle.style, -ext_vpos);
						}
					}
				};

				_pGridBandContainerElement.setElementVScrollPos = function (vpos) {
					if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
						this._scroll_top = vpos;
						var _inner_handle = this._dest_handle;
						if (_inner_handle) {
							nexacro.__setDOMNodeStyleTranslateY(_inner_handle.style, -vpos);
							this._setInnerElementVScrollPos(vpos);

							if (this._grid) {
								this._grid._callback_onscroll(vpos);
							}
						}
					}
				};
			}
			_pGridBandContainerElement._refreshDOM = function () {
				if (this._handle) {
					nexacro.__setDOMNodeVScrollPos(this._handle, 1);
				}
			};
		}
		else {
			_pGridBandContainerElement.create = function () {
				var _owner_elem = this._parent_elem;
				if (_owner_elem && _owner_elem._handle && !this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					_handle.id = this._parent_elem._handle.id + this._type_name;
					_handle._linked_element = this;
					_handle._element_type = 3;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsoluteTransparent(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

					if (this.font) {
						nexacro.__setDOMNodeStyleFont(handle_style, this.font);
					}
					if (this.letterspace) {
						nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
					}
					if (this.color) {
						nexacro.__setDOMNodeStyleColor(handle_style, this.color);
					}

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					if (this._scroll_left != 0 || this._scroll_top != 0) {
						nexacro.__setDOMNodeOffset(_handle, this._scroll_left, this._scroll_top);
					}

					var tempdiv = this._tempdiv = _doc.createElement("div");
					tempdiv._element_type = 3;

					nexacro.__setDOMNodeStyleAbsoluteTransparent(tempdiv.style);
					nexacro.__setDOMNodeStylePos(tempdiv.style, 0, 0);
					nexacro.__setDOMNodeStyleSize(tempdiv.style, 1, 1);
					nexacro.__setDOMNodeStyleVisible(tempdiv.style, false);
					nexacro.__appendDOMNode(_handle, tempdiv);

					this._setScrollHeight(_owner_elem.container_maxheight);

					nexacro._observeSysEvent(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);
					this._adjustPos();
				}
			};

			_pGridBandContainerElement.destroy = function () {
				var _handle = this._handle;
				if (_handle) {
					nexacro._stopSysObserving(_handle, "scroll", "onscroll", this._syshandler_onscroll_forward);

					_handle._linked_element = null;
					var _owner_handle = null;
					if (this._owner_elem && this._owner_elem._dest_handle) {
						_owner_handle = this._owner_elem._dest_handle;
					}

					if (!this._owner_elem || _owner_handle) {
						nexacro.__removeDOMNode(_owner_handle, _handle);
					}

					nexacro.__removeDOMNode(_handle, this._tempdiv);
					this._tempdiv = null;
					this._owner_elem = null;
					this._handle = this._dest_handle = null;
				}
				this.parent = null;
				this._parent_elem = null;
			};

			if (nexacro.Browser == "Edge" || nexacro.Browser == "IE") {
				if (nexacro.BrowserVersion <= 8) {
					_pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
						if ((!evt || evt.type != "scroll") && window.event) {
							evt = window.event;
						}
						if (evt.type != "scroll") {
							return;
						}

						var target = evt.srcElement;
						if (!target) {
							return;
						}

						var container = target._linked_element;
						if (container) {
							if (container._noEventScroll == true) {
								container._noEventScroll = false;

								if (container._grid) {
									container._grid._callback_onscroll(target.scrollTop);
								}

								return;
							}

							var elem_scroll_top = container._scroll_top | 0;

							if (!container._try_user_setvpos) {
								if (elem_scroll_top != target.scrollTop) {
									var linkedcontrol = container._findScrollbarLinkedControl(container, true);
									if (linkedcontrol) {
										if (linkedcontrol._scrollpixel == "all") {
											linkedcontrol.vscrollbar.set_pos(target.scrollTop);
										}
										else {
											linkedcontrol.vscrollbar.set_pixelpos(target.scrollTop);
										}
									}
									else {
										target.scrollTop = elem_scroll_top;
									}
								}
							}
						}
					};
				}
				else {
					_pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
						if ((!evt || evt.type != "scroll") && window.event) {
							evt = window.event;
						}
						if (evt.type != "scroll") {
							return;
						}

						var target = evt.srcElement;
						if (!target) {
							return;
						}

						var container = target._linked_element;
						if (container) {
							if (container._noEventScroll == true) {
								container._noEventScroll = false;

								if (container._grid) {
									container._grid._callback_onscroll(target.scrollTop);
								}

								return;
							}

							var elem_scroll_top = container._scroll_top | 0;

							if (elem_scroll_top != target.scrollTop) {
								var linkedcontrol = container._findScrollbarLinkedControl(container, true);
								if (linkedcontrol) {
									if (linkedcontrol._scrollpixel == "all") {
										linkedcontrol.vscrollbar.set_pos(target.scrollTop);
									}
									else {
										linkedcontrol.vscrollbar.set_pixelpos(target.scrollTop);
									}
								}
								else {
									target.scrollTop = elem_scroll_top;
								}
							}
						}
					};
				}
			}
			else {
				_pGridBandContainerElement._syshandler_onscroll_forward = function (evt) {
					var target = evt.target;
					if (!target) {
						return;
					}
					var container = target._linked_element;
					if (container) {
						if (container._noEventScroll == true) {
							container._noEventScroll = false;

							if (container._grid) {
								container._grid._callback_onscroll(target.scrollTop);
							}

							return;
						}

						var elem_scroll_top = container._scroll_top | 0;

						if (elem_scroll_top != target.scrollTop) {
							var linkedcontrol = container._findScrollbarLinkedControl(container, true);
							if (linkedcontrol) {
								if (linkedcontrol._scrollpixel == "all") {
									linkedcontrol.vscrollbar.set_pos(target.scrollTop);
								}
								else {
									linkedcontrol.vscrollbar.set_pixelpos(target.scrollTop);
								}
							}
							else {
								target.scrollTop = elem_scroll_top;
							}
						}
					}
				};
			}

			_pGridBandContainerElement._setScrollHeight = function (height) {
				if (this._tempdiv) {
					nexacro.__setDOMNodeStylePos(this._tempdiv.style, 0, height - 1);
				}
			};

			_pGridBandContainerElement.setElementVScrollPos = function (vpos) {
				if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
					this._scroll_top = vpos;

					var _handle = this._handle;
					if (_handle) {
						this._noEventScroll = true;
						nexacro.__setDOMNodeVScrollPos(_handle, vpos);
					}
				}
			};
		}
		;

		delete _pGridBandContainerElement;


		nexacro.GridRowControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			this._client_left_element = null;
			this._client_body_element = new nexacro.GridAreaContainerElement(this, "body");
			this._client_right_element = null;

			this._left_width = 0;
			this._right_width = 0;
			this._body_width = 0;
			this._body_scroll_maxwidth = 0;
			this.scroll_left = 0;
		};

		var _pGridRowControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridRowControlElement);

		nexacro.GridRowControlElement.prototype = _pGridRowControlElement;

		_pGridRowControlElement._type_name = "GridRowControlElement";

		_pGridRowControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.linkedcontrol._fixed);
			if (_owner_elem && _owner_elem._handle) {
				if (!this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					_handle.id = this.linkedcontrol._unique_id;
					_handle._linked_element = this;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);
				}

				if (this._handle) {
					if (!this._client_body_element._handle) {
						this._client_body_element.create();
					}
					if (this._client_left_element && !this._client_left_element._handle) {
						this._client_left_element.create();
					}
					if (this._client_right_element && !this._client_right_element._handle) {
						this._client_right_element.create();
					}

					this._client_element = this._client_body_element;
				}
			}
		};

		_pGridRowControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_handle.parentNode, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._destroyControlSubElements();

				this._client_body_element.destroy();

				if (this._client_left_element) {
					this._client_left_element.destroy();
				}

				if (this._client_right_element) {
					this._client_right_element.destroy();
				}

				this._client_body_element = null;
				this._client_left_element = null;
				this._client_right_element = null;
				this._client_element = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pGridRowControlElement.clearContents = function () {
			if (this._handle) {
				this._client_body_element.clearContents();
				if (this._client_left_element) {
					this._client_left_element.clearContents();
				}
				if (this._client_right_element) {
					this._client_right_element.clearContents();
				}
			}
		};

		_pGridRowControlElement.getContainerElement = function (area) {
			if (area == "left") {
				return this._client_left_element;
			}
			else if (area == "right") {
				return this._client_right_element;
			}

			return this._client_body_element;
		};

		_pGridRowControlElement.setArea = function (leftwidth, rightwidth) {
			if (leftwidth > 0 && !this._client_left_element) {
				this._client_left_element = new nexacro.GridAreaContainerElement(this, "left");
			}

			if (rightwidth > 0 && !this._client_right_element) {
				this._client_right_element = new nexacro.GridAreaContainerElement(this, "right");
			}

			this._left_width = leftwidth;
			if (this._client_left_element) {
				this._client_left_element.setElementPosition(this.client_left, this.client_top);
				this._client_left_element.setElementSize(leftwidth, this.client_height);
			}

			this._right_width = rightwidth;
			if (this._client_right_element) {
				this._client_right_element.setElementPosition(this.client_width - rightwidth, this.client_top);
				this._client_right_element.setElementSize(rightwidth, this.client_height);
			}

			this._body_width = this.client_width - leftwidth - rightwidth;
			this._client_body_element.setElementPosition(leftwidth, this.client_top);
			this._client_body_element.setElementSize(this._body_width, this.height);
		};

		_pGridRowControlElement._updateClientSize = function () {
			this.client_left = this._inner_left;
			this.client_top = this._inner_top;
			this.client_width = this._inner_width;
			this.client_height = this._inner_height;

			this.setArea(this._left_width, this._right_width);
		};

		_pGridRowControlElement._setContainerMaxWidth = function (width) {
			if (this._body_scroll_maxwidth != width) {
				this._body_scroll_maxwidth = width;
			}
		};

		_pGridRowControlElement._calculateClientWidth = function (change_width) {
			var c_width = this._body_width + change_width;
			return c_width;
		};

		_pGridRowControlElement._getContainerMaxWidth = function () {
			return this._body_scroll_maxwidth;
		};

		_pGridRowControlElement._getScrollLeft = function () {
			return this.scroll_left;
		};

		_pGridRowControlElement.setElementHScrollPos = function (hpos) {
			this._client_body_element.setElementHScrollPos(hpos);
			this.scroll_left = hpos;
		};

		if (_gridScrollMode == 1) {
			_pGridRowControlElement.setElementPosition = function (left, top) {
				var _owner_elem = this._owner_elem;
				if (this.left != left || this.top != top) {
					if (_owner_elem && this.top != top) {
						var _handle = this._handle;
						if (_owner_elem._scroll_top < top) {
							top = _owner_elem._changeInnerElement(true, top, this._handle);
						}
						else {
							top = _owner_elem._changeInnerElement(false, top, this._handle);
						}
					}

					this.left = left;
					this.top = top;
					if (_handle) {
						nexacro.__setDOMNodeStylePos(_handle.style, left, top);
					}
				}
			};
		}
		_pGridRowControlElement.setElementCursor = nexacro._emptyFn;
		_pGridRowControlElement.setElementShadow = nexacro._emptyFn;

		delete _pGridRowControlElement;


		nexacro.GridAreaContainerElement = function (parent_elem, areatype) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._areatype = areatype;
		};

		var _pGridAreaContainerElement;
		if (nexacro.Browser == "Edge") {
			_pGridAreaContainerElement = nexacro._createPrototype(nexacro.ScrollableContainerElement, nexacro.GridAreaContainerElement);
		}
		else {
			_pGridAreaContainerElement = nexacro._createPrototype(nexacro.ScrollableInnerContainerElement, nexacro.GridAreaContainerElement);
		}

		nexacro.GridAreaContainerElement.prototype = _pGridAreaContainerElement;
		_pGridAreaContainerElement._type_name = "GridAreaContainerElement";

		_pGridAreaContainerElement._findScrollbarLinkedControl = function (elem, is_vert) {
			while (elem) {
				var linkedcontrol = elem.linkedcontrol;
				if (linkedcontrol) {
					linkedcontrol = linkedcontrol.parent.parent;
					if (is_vert) {
						if (linkedcontrol.vscrollbar && linkedcontrol.vscrollbar._isVisible()) {
							return linkedcontrol;
						}
					}
					else {
						if (linkedcontrol.hscrollbar && linkedcontrol.hscrollbar._isVisible()) {
							return linkedcontrol;
						}
					}
				}

				elem = elem.parent;
			}
		};
		if (nexacro.Browser == "Edge") {
			_pGridAreaContainerElement.setElementHScrollPos = function (hpos) {
				this._scroll_left = hpos;
				var _handle = this._dest_handle;
				if (this._handle) {
					nexacro.__setDOMNodeHScrollPos(this._handle, hpos);
				}
			};
		}
		else {
			_pGridAreaContainerElement.setElementHScrollPos = function (hpos) {
				this._scroll_left = hpos;
				var _handle = this._dest_handle;
				if (this._handle) {
					nexacro.__setDOMNodeStyleTranslateX(_handle.style, -hpos);
				}
			};
		}

		_pGridAreaContainerElement._refreshDOM = function () {
			if (this._handle) {
				this._noRecovery = true;
				nexacro.__setDOMNodeHScrollPos(this._handle, 1);
			}
		};
		_pGridAreaContainerElement.setElementCursor = nexacro._emptyFn;
		_pGridAreaContainerElement.setElementShadow = nexacro._emptyFn;

		delete _pGridAreaContainerElement;

		nexacro.GridCellControlElement = function (parent_elem, area, mode, padding) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._area = area;
			this._expand_width = 0;
			this._expand_ctrl = null;
			this._mode = "";
			this._changeMode(mode, padding);
		};

		var _pGridCellControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.GridCellControlElement);
		nexacro.GridCellControlElement.prototype = _pGridCellControlElement;

		_pGridCellControlElement._type_name = "GridCellControlElement";

		_pGridCellControlElement._changeMode = function (mode, padding) {
			mode = (mode) ? mode : "text";

			if (this._mode !== mode) {
				var prev = this._client_element;
				var textchange = false;

				if (this._mode.indexOf("text") >= 0 && mode.indexOf("text") >= 0) {
					textchange = true;
				}

				if (mode == "text") {
					this._client_element = new nexacro.GridCellTextSimpleContainerElement(this);

					if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8)) {
						this._client_element.padding = (padding) ? padding : null;
					}
				}
				else if (mode == "expandtext") {
					this._client_element = new nexacro.GridCellTextContainerElement(this);
				}
				else {
					this._client_element = new nexacro.GridCellContainerElement(this);
				}

				var client_element = this._client_element;

				if (prev) {
					if (textchange) {
						client_element.font = prev.font;
						client_element.letterspace = prev.letterspace;
						client_element.color = prev.color;
						client_element.cursor = prev.cursor;
						client_element.align = prev.align;
						client_element.halign = prev.halign;
						client_element.valign = prev.valign;
						client_element.text = prev.text;
						client_element.linespace = prev.linespace;
						client_element.wordwrap = prev.wordwrap;
						client_element.decoration = prev.decoration;
						client_element._cell_node = prev._cell_node;
						client_element._use_newline = prev._use_newline;
					}
					if (this.linkedcontrol._subComp) {
						this.linkedcontrol._subComp.destroy();
						this.linkedcontrol._subComp = null;
					}
					prev.destroy();
				}

				if (this._handle && !client_element._handle) {
					client_element.create();
				}
				client_element.setElementSize(this.client_width, this.client_height);
				client_element.setElementPosition(this.client_left, this.client_top);

				this._mode = mode;
			}
			else {
				if (this._mode == "text") {
					if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8)) {
						this._client_element.padding = (padding) ? padding : null;
					}
				}
			}

			return this._client_element;
		};

		_pGridCellControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this._area);
			if (_owner_elem && _owner_elem._handle) {
				if (!this._handle) {
					this._owner_elem = _owner_elem;
					var _doc = _owner_elem.getRootWindowHandle();
					var _handle = _doc.createElement("div");
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					_handle.id = this.linkedcontrol._unique_id;
					_handle._linked_element = this;

					nexacro.__setDOMNodeSelectable(_handle, false);

					var handle_style = _handle.style;
					nexacro.__setDOMNodeStyleAbsolute(handle_style);
					nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
					nexacro.__setDOMNodeStyleSize(handle_style, this._node_width, this._node_height);

					this._handle = this._dest_handle = _handle;
					nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);

					this._createControlSubElements(this, _handle);
					this._refreshForeground(_handle, handle_style);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};

		_pGridCellControlElement._setExpandControl = function (expand_ctrl, expand_width) {
			this._expand_ctrl = expand_ctrl;
			this._expand_width = expand_width;
			this._updateClientSize();
		};

		_pGridCellControlElement._updateClientSize = function () {
			var client_left = this._inner_left;
			var client_top = this._inner_top;
			var client_width = this._inner_width;
			var client_height = this._inner_height;

			var padding = this.padding;
			if (this.padding) {
				client_left += padding.left;
				client_top += padding.top;
				client_width -= (padding.left + padding.right);
				client_height -= (padding.top + padding.bottom);
				if (client_width < 0) {
					client_width = 0;
				}
				if (client_height < 0) {
					client_height = 0;
				}

				if (this._mode == "text" && (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8))) {
					this._client_element.setElementPadding(this.padding);
				}
			}
			else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
				client_left += padding.left;
				client_top += padding.top;
				client_width -= (padding.left + padding.right);
				client_height -= (padding.top + padding.bottom);
				if (client_width < 0) {
					client_width = 0;
				}
				if (client_height < 0) {
					client_height = 0;
				}

				if (this._mode == "text" && (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8))) {
					this._client_element.setElementPaddingXY(this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
				}
			}

			if (this._expand_ctrl && this._expand_ctrl.visible == true) {
				client_width -= this._expand_width;
				if (client_width < 0) {
					client_width = 0;
				}
			}

			var client_element = this._client_element;
			if (client_element) {
				if (this.client_left != client_left || this.client_top != client_top) {
					this.client_left = client_left;
					this.client_top = client_top;
					client_element.setElementPosition(client_left, client_top);
				}
				if (this.client_width != client_width || this.client_height != client_height) {
					this.client_width = client_width;
					this.client_height = client_height;
					client_element.setElementSize(client_width, client_height);
				}
			}
			else {
				this.client_left = client_left;
				this.client_top = client_top;
				this.client_width = client_width;
				this.client_height = client_height;
			}
		};

		_pGridCellControlElement._setDisplay = function (v) {
			var handle;
			if (handle = this._handle) {
				var handle_style = handle.style;

				if (v) {
					nexacro.__setDOMNodeStyleDisplay(handle_style, "");
				}
				else {
					nexacro.__setDOMNodeStyleDisplay(handle_style, "none");
				}
			}
		};

		_pGridCellControlElement.setContainerVisible = function (v) {
			if (this._client_element) {
				this._client_element.setElementVisible(v);
			}
		};
		_pGridCellControlElement._setControlBackground = function (element, _handle, background, gradation, notusevml) {
			return nexacro.ControlElement.prototype._setControlBackground.call(this, element, _handle, background, gradation, true);
		};

		delete _pGridCellControlElement;


		nexacro.GridCellContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pGridCellContainerElement = nexacro._createPrototype(nexacro.ContainerElement, nexacro.GridCellContainerElement);
		nexacro.GridCellContainerElement.prototype = _pGridCellContainerElement;

		_pGridCellContainerElement._type_name = "GridCellContainerElement";

		_pGridCellContainerElement.create = function () {
			var _owner_elem = this._parent_elem;
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = _doc.createElement("div");
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 2;

				nexacro.__setDOMNodeSelectable(_handle, false);
				nexacro.AccessibilityUtil.supportMobileApplicationAccessibility(_handle);

				var handle_style = _handle.style;
				nexacro.__setDOMNodeStyleAbsolute(handle_style);
				nexacro.__setDOMNodeStylePos(handle_style, this.left, this.top);
				nexacro.__setDOMNodeStyleSize(handle_style, this.width, this.height);

				if (this.font) {
					nexacro.__setDOMNodeStyleFont(handle_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(handle_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(handle_style, this.color);
				}
				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
			}
		};

		delete _pGridCellContainerElement;


		nexacro.GridCellTextContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pGridCellTextContainerElement = nexacro._createPrototype(nexacro.TextBoxElement, nexacro.GridCellTextContainerElement);
		nexacro.GridCellTextContainerElement.prototype = _pGridCellTextContainerElement;

		_pGridCellTextContainerElement._type_name = "GridCellTextContainerElement";

		_pGridCellTextContainerElement._is_nc_element = true;

		_pGridCellTextContainerElement.create = function () {
			var _owner_elem = this._parent_elem;
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = this._createTextElementHandle(_doc, this.left, this.top, this.width, this.height);
				_handle.id = this._parent_elem._handle.id + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 4;

				nexacro.__setDOMNodeSelectable(_handle, false);
				nexacro.AccessibilityUtil.supportMobileApplicationAccessibility(_handle);

				var handle_style = _handle.style;
				var cell_node = this._cell_node;
				var cell_style = cell_node.style;

				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}
				if (this.font) {
					nexacro.__setDOMNodeStyleFont(cell_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(cell_style, this.letterspace);
				}
				if (this.color) {
					nexacro.__setDOMNodeStyleColor(cell_style, this.color);
				}

				if (this.align) {
					nexacro.__setDOMNodeStyleAlign(cell_style, this.align);
				}
				else if (this.halign && this.valign) {
					nexacro.__setDOMNodeStyleAlignXY(cell_style, this.halign, this.valign);
				}

				if (this.padding) {
					nexacro.__setDOMNodeStylePadding(cell_style, this.padding);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					nexacro.__setDOMNodeStylePaddingXY(cell_style, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
				}

				if (this.linespace > 0) {
					nexacro.__setDOMNodeStyleLineSpace(cell_style, this.linespace);
				}


				if (this.wordwrap != "none") {
					nexacro.__setDOMNodeWordWrap(cell_node, this.wordwrap);
				}

				if (this.decoration) {
					nexacro.__setDOMNodeStyleDecorateText(cell_node, this.decoration);
				}
				else {
					nexacro.__setDOMNodeText(cell_node, this.text, this._use_newline, this.wordwrap);
				}

				this._handle = this._dest_handle = _handle;
				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				this._appendTextElementHandle(_handle, cell_node);
			}
		};

		_pGridCellTextContainerElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;

				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._dest_handle) {
					_owner_handle = this._owner_elem._dest_handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__removeDOMNode(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = this._dest_handle = null;

				this._cell_node = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pGridCellTextContainerElement.clearContents = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle) {
				_handle._linked_element = null;
				if (_owner_elem) {
					nexacro.__removeDOMNode(_owner_elem._handle, _handle);
				}
				this._owner_elem = null;
				this._handle = this._dest_handle = null;
			}
		};

		_pGridCellTextContainerElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this.parent_elem) {
					if (child_elem._handle) {
						var old_doc = child_elem.getRootWindowHandle();
						var new_doc = this.getRootWindowHandle();
						if (old_doc != new_doc) {
							child_elem._parent_elem = this.parent_elem;
							child_elem._removeFromContainer();
						}
						else {
							child_elem._parent_elem = this.parent_elem;
						}
					}
					else {
						child_elem._parent_elem = this.parent_elem;
					}
				}

				if (!child_elem._handle) {
					child_elem.create();
				}
				else {
					child_elem._appendToContainer(this);
				}
			}
		};
		_pGridCellTextContainerElement.removeChildElement = function (child_elem) {
			if (child_elem._owner_elem == this) {
				child_elem._removeFromContainer();
			}
		};

		_pGridCellTextContainerElement.moveToNextElement = function (cur_elem, target_elem) {
			if (cur_elem && target_elem && cur_elem._owner_elem == this && target_elem._owner_elem == this && cur_elem._handle && target_elem._handle) {
				nexacro.__setElementHandleMoveToNext(cur_elem._handle, target_elem._handle);
			}
		};
		_pGridCellTextContainerElement.moveToPrevElement = function (cur_elem, target_elem) {
			if (cur_elem && target_elem && cur_elem._owner_elem == this && target_elem._owner_elem == this && cur_elem._handle && target_elem._handle) {
				nexacro.__setElementHandleMoveToPrev(cur_elem._handle, target_elem._handle);
			}
		};
		_pGridCellTextContainerElement.sendToBackElement = function (cur_elem) {
			if (cur_elem && cur_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleSendToBack(cur_elem._handle);
			}
		};
		_pGridCellTextContainerElement.bringToFrontElement = function (cur_elem) {
			if (cur_elem && cur_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleBringToFront(cur_elem._handle);
			}
		};

		_pGridCellTextContainerElement.setElementTextVisible = function (visible) {
			var _handle = this._cell_node;

			visible = visible && this.visible;

			if (_handle) {
				nexacro.__setDOMNodeStyleVisible(_handle.style, visible);
			}
		};

		delete _pGridCellTextContainerElement;


		nexacro.GridCellTextSimpleContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};
		var _pGridCellTextSimpleContainerElement = nexacro._createPrototype(nexacro.GridCellTextContainerElement, nexacro.GridCellTextSimpleContainerElement);
		nexacro.GridCellTextSimpleContainerElement.prototype = _pGridCellTextSimpleContainerElement;

		_pGridCellTextSimpleContainerElement._type_name = "GridCellTextSimpleContainerElement";

		if (nexacro.Browser != "IE" || (nexacro.Browser == "IE" && nexacro.BrowserVersion >= 8)) {
			_pGridCellTextSimpleContainerElement._createTextElementHandle = function (_doc, left, top, width, height) {
				var _handle = _doc.createElement("div");
				var handle_style = _handle.style;

				nexacro.__setDOMNodeStylePos(handle_style, 0, 0);

				width = this.parent.width;
				height = this.parent.height;

				nexacro.__setDOMNodeStyleSize(handle_style, width, height);
				handle_style.display = "table-cell";
				handle_style.whiteSpace = "pre";
				handle_style.textOverflow = this._default_textoverflow;
				this._cell_node = _handle;
				return _handle;
			};

			_pGridCellTextSimpleContainerElement._appendTextElementHandle = nexacro._emptyFn;

			_pGridCellTextSimpleContainerElement.setElementSize = function (width, height) {
				if (this.width != width || this.height != height) {
					this.width = width;
					this.height = height;
					var _handle = this._handle;
					if (_handle) {
						_handle.style.textOverflow = "";

						width = this.parent.width;
						height = this.parent.height;

						nexacro.__setDOMNodeStyleSize(_handle.style, width, height);
						_handle.style.textOverflow = this._default_textoverflow;
					}
				}
			};
		}

		delete _pGridCellTextSimpleContainerElement;

		nexacro.EventPassOverlayElement = function (parent_elem, elements) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;


			this.width = parent_elem.width;
			this.height = parent_elem.height;


			this.pointer_events = "none";
			this._target_elements = elements;
		};

		var _pEventPassOverlayElement = nexacro._createPrototype(nexacro.TextBoxElement, nexacro.EventPassOverlayElement);
		nexacro.EventPassOverlayElement.prototype = _pEventPassOverlayElement;

		_pEventPassOverlayElement._type_name = "EventPassOverlayElement";

		_pEventPassOverlayElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _doc = _owner_elem.getRootWindowHandle();
				var _handle = this._createTextElementHandle(_doc, this.left, this.top, this.width, this.height);
				_handle.id = this._parent_elem._handle.id + '_' + this._type_name;
				_handle._linked_element = this;
				_handle._element_type = 4;

				nexacro.__setDOMNodeSelectable(_handle, false);

				var handle_style = _handle.style;
				var cell_node = this._cell_node;
				var cell_style = cell_node.style;

				nexacro.__setDOMNodeStyleAbsolute(cell_style);

				if (!this.visible) {
					nexacro.__setDOMNodeStyleVisible(handle_style, false);
				}
				if (this.pointer_events) {
					nexacro.__setDOMNodeStylePointerEvents(handle_style, this.pointer_events);
				}
				if (this.font) {
					nexacro.__setDOMNodeStyleFont(cell_style, this.font);
				}
				if (this.letterspace) {
					nexacro.__setDOMNodeStyleLetterSpace(cell_style, this.letterspace);
				}

				if (this.color) {
					nexacro.__setDOMNodeStyleColor(cell_style, this.color);
				}

				if (this.align) {
					nexacro.__setDOMNodeStyleAlign(cell_style, this.align);
				}
				else if (this.halign && this.valign) {
					nexacro.__setDOMNodeStyleAlignXY(cell_style, this.halign, this.valign);
				}

				if (this.padding) {
					nexacro.__setDOMNodeStylePadding(cell_style, this.padding);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					nexacro.__setDOMNodeStylePaddingXY(cell_style, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
				}

				if (this.linespace > 0) {
					nexacro.__setDOMNodeStyleLineSpace(cell_style, this.linespace);
				}

				if (this.wordwrap != "none") {
					nexacro.__setDOMNodeWordWrap(cell_node, this.wordwrap);
				}

				if (this.decoration) {
					nexacro.__setDOMNodeStyleDecorateText(cell_node, this.decoration);
				}
				else {
					nexacro.__setDOMNodeText(cell_node, this.text, this._use_newline, this.wordwrap);
				}

				this._handle = this._dest_handle = _handle;

				nexacro.__appendDOMNode(_owner_elem._dest_handle, _handle);
				this._appendTextElementHandle(_handle, cell_node);
			}
		};

		if (nexacro.Browser == "IE" && nexacro.BrowserVersion <= 10) {
			_pEventPassOverlayElement.setSelectEventPassElement = function (clientX, clientY) {
				var elements = this._target_elements, len = elements.length, elem = elements[0];
				if (len > 1) {
					var comp = null, over_comp = null;
					var elem_pos = null;
					var left = 0, top = 0, right = 0, bottom = 0;
					for (var i = 0; i < len; i++) {
						elem_pos = nexacro._getElementXYInWindow(elements[i]._handle);
						left = elem_pos[0];
						top = elem_pos[1];
						right = left + elem.width;
						bottom = top + elem.height;
						if (left <= clientX && clientX <= right
							 && top <= clientY && clientY <= bottom) {
							elem = elements[i];
							over_comp = elem.linkedcontrol;
						}

						comp = elements[i].linkedcontrol;
						comp._applyMouseLeaveEvent();
					}
				}

				if (over_comp) {
					over_comp._applyMouseOverEvent();
				}

				return elem;
			};
		}

		_pEventPassOverlayElement.setTargetElements = function (elements) {
			this._target_elements = elements;
		};

		_pEventPassOverlayElement.updateCellNodeClient = function (left, top, width, height, cell_hpos) {
			var _cell_node = this._cell_node;
			if (_cell_node) {
				var right = left + width;
				var top = this._getNodeAlignPos();

				left = 0;
				if (cell_hpos > 0) {
					var comp = this.parent.linkedcontrol;
					if (right < comp._client_width) {
						left = -cell_hpos;
					}
					width += cell_hpos;
				}

				nexacro.__setDOMNodeStylePos(_cell_node.style, left, top);
				nexacro.__setDOMNodeStyleSize(_cell_node.style, width, height);
			}
		};

		_pEventPassOverlayElement.updateElementLineHeight = function (height) {
			var _cell_node = this._cell_node;
			if (_cell_node && height != this.linespace) {
				nexacro.__setDOMNodeStyleLineSpace(_cell_node.style, height);
			}
		};

		_pEventPassOverlayElement.setElementAlign = function (align) {
			this.setElementAlignXY(align.halign, align.valign);
			this.align = align;
		};

		_pEventPassOverlayElement.setElementAlignXY = function (halign, valign) {
			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _cell_node = this._cell_node;
			if (_cell_node) {
				var left = 0;
				var top = this._getNodeAlignPos();
				nexacro.__setDOMNodeStylePosLeftTop(_cell_node.style, left, top);
			}
		};

		_pEventPassOverlayElement._getNodeAlignPos = function () {
			var _cell_node = this._cell_node;
			if (_cell_node) {
				var top = 0;

				var halign = (this.align) ? this.align.halign : this.halign;
				var valign = (this.align) ? this.align.valign : this.valign;
				var tx_size = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), this.text, this.font, true, this.width, this.wordwrap);

				if (this.height > 0 && this.height > tx_size[1]) {
					if (valign == "bottom") {
						tx_size = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), this.text, this.font, true);
						top = (tx_size) ? this.height - tx_size[1] : 0;
					}
					else if (valign == "middle") {
						top = (tx_size) ? (this.height / 2) - (tx_size[1] / 2) : 0;
					}
				}

				nexacro.__setDOMNodeStyleAlignXY(_cell_node.style, halign, "top");
				return top;
			}
		};

		delete _pEventPassOverlayElement;
	}
}

