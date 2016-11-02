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
	if (!nexacro.Element) {
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
		_pElement._owner_elem = null;
		_pElement._is_nc_element = false;

		_pElement.clearContents = nexacro._emptyFn;

		_pElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}
				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}
				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}
				if (this.mirror) {
					nexacro.__setElementHandleMirror(_handle, this.mirror);
				}

				if (this.rtldirection) {
					nexacro.__setElementHandleRtlDirection(_handle, this.rtldirection);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pElement._destroyElementHandle = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle) {
				var _owner_handle = null;
				if (_owner_elem && _owner_elem._handle) {
					_owner_handle = _owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}
			}
			this._owner_elem = null;
			this._handle = null;
		};

		_pElement._appendToContainer = function (_owner_elem) {
			var _handle = this._handle;
			if (_handle && _owner_elem._handle && this._owner_elem == null) {
				this._owner_elem = _owner_elem;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pElement._removeFromContainer = function () {
			var _owner_elem = this._owner_elem;
			if (_owner_elem) {
				this._owner_elem = null;
				var _handle = this._handle;
				if (_handle && _owner_elem._handle) {
					nexacro.__unlinkElementHandle(_owner_elem._handle, _handle);
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
		_pElement._getWindowHandle = function () {
			return this.getRootWindowHandle();
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

		_pElement._getElementRtlDirection = function () {
			var elem = this._parent_elem;
			var rtldirection = this.rtldirection;
			while (elem) {
				if (elem.rtldirection && elem.rtldirection != "inherit") {
					rtldirection = elem.rtldirection;
					break;
				}
				elem = elem._parent_elem;
			}

			return rtldirection;
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

		_pElement.hasSetSelectionRange = nexacro._emptyFn;

		_pElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandlePosition(_handle, left, top);
				}
			}
		};

		_pElement.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleSize(_handle, width, height);
				}
			}
		};

		_pElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLetterSpace(_handle, letterspace);
				}
			}
		};

		_pElement.setElementVisible = function (visible) {
			if (this.visible != visible) {
				this.visible = visible;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleVisible(_handle, visible);
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
					if (handle) {
						nexacro.__setElementHandleMirror(handle, this.mirror && this._isRtl());
					}

					if (this._client_element) {
						handle = this._client_element._handle;
						if (handle) {
							nexacro.__setElementHandleMirror(handle, this.mirror && this._isRtl());
						}
					}
				}
			}
		};

		_pElement.setElementRtlDirection = function (rtldirection) {
			if (this.rtldirection != rtldirection) {
				this.rtldirection = rtldirection;

				if (rtldirection == "rtl") {
					if (this.align) {
						this.align._createRtlValue();
					}

					if (this.shadow) {
						this.shadow._createRtlValue();
					}

					if (this.border) {
						this.border._createRtlValue();
					}

					if (this.bordertype) {
						this.bordertype._createRtlValue();
					}

					if (this.padding) {
						this.padding._createRtlValue();
					}

					if (this.gradation) {
						this.gradation._createRtlValue();
					}
				}

				var handle = this._handle;
				if (handle) {
					nexacro.__setElementHandleRtlDirection(handle, rtldirection);
				}

				if (this.align) {
					this.setElementAlign(this.align);
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
		_pTextBoxElement.letterspace = 0;
		_pTextBoxElement.wordwrap = "none";
		_pTextBoxElement.decoration = "";
		_pTextBoxElement._use_newline = true;
		_pTextBoxElement._cell_node = null;


		_pTextBoxElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createTextElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

				var bRtl = this._isRtl();

				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}
				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}
				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}

				if (this.align) {
					var _align = this.align._getStyleObject(bRtl);
					nexacro.__setElementHandleAlign(_handle, _align.halign, _align.valign);
				}
				else if (this.halign && this.valign) {
					var _halign = this.halign;
					if (bRtl) {
						_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
					}
					nexacro.__setElementHandleAlign(_handle, _halign, this.valign);
				}

				if (this.padding) {
					var _padding = this.padding._getStyleObject(bRtl);
					nexacro.__setElementHandlePadding(_handle, _padding.left, _padding.top, _padding.right, _padding.bottom);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					if (bRtl) {
						nexacro.__setElementHandlePadding(_handle, this.padding_right, this.padding_top, this.padding_left, this.padding_bottom);
					}
					else {
						nexacro.__setElementHandlePadding(_handle, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
					}
				}

				if (this.decoration) {
					nexacro.__setElementHandleDecorateText(_handle, this.decoration);
				}
				if (this.linespace > 0) {
					nexacro.__setElementHandleLineSpace(_handle, this.linespace);
				}

				if (this.wordwrap != "none") {
					nexacro.__setElementHandleWordWrap(_handle, this.wordwrap);
				}

				if (this.text) {
					nexacro.__setElementHandleText(_handle, this.text, this._use_newline, this.wordwrap);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pTextBoxElement.setParentElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		_pTextBoxElement.setElementFont = function (font) {
			this.font = font;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
			}
		};
		_pTextBoxElement.setElementColor = function (color) {
			this.color = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleColor(_handle, color._syscolor);
			}
		};

		_pTextBoxElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, align._halign, align._valign);
			}
		};
		_pTextBoxElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, _halign, valign);
			}
		};

		_pTextBoxElement.setElementPadding = function (padding) {
			this.padding = padding;
			this.padding_left = 0;
			this.padding_top = 0;
			this.padding_right = 0;
			this.padding_bottom = 0;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
			}
		};
		_pTextBoxElement.setElementPaddingXY = function (left, top, right, bottom) {
			this.padding = null;
			this.padding_left = left;
			this.padding_top = top;
			this.padding_right = right;
			this.padding_bottom = bottom;
			var _handle = this._handle;
			if (_handle) {
				if (this._isRtl()) {
					nexacro.__setElementHandlePadding(_handle, right, top, left, bottom);
				}
				else {
					nexacro.__setElementHandlePadding(_handle, left, top, right, bottom);
				}
			}
		};

		_pTextBoxElement.setElementText = function (text) {
			if (this.text != text) {
				if (text == null) {
					this.text = "";
				}
				else {
					this.text = text.replace(/\r\n|\r|\n/g, "\r\n");
				}

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleText(_handle, this.text, this._use_newline, this.wordwrap);
				}
			}
		};

		_pTextBoxElement.setElementLineSpace = function (linespace) {
			if (this.linespace != linespace) {
				this.linespace = linespace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLineSpace(_handle, linespace);
				}
			}
		};

		_pTextBoxElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLetterSpace(_handle, letterspace);
				}
			}
		};

		_pTextBoxElement.setElementDecorateText = function (text) {
			if (this.decoration != text) {
				if (text == null) {
					this.decoration = "";
				}
				else {
					this.decoration = text.replace(/\r\n|\r|\n/g, "\r\n");
				}

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleDecorateText(_handle, this.decoration);
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
					this.__setElementHandleText(_cell_node, this.text, this._use_newline, this.wordwrap);
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
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleWordWrap(_handle, wordwrap);
				}
			}
		};

		_pTextBoxElement.setElementTextOverFlow = nexacro._emptyFn;

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
		_pImageElement._img_sizereq = false;

		_pImageElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createImageElementHandle(this, _win_handle, this.left, this.top, this.width, this.height, true);
				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}

				if (this.align) {
					var align = this.align;
					nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
				}
				else if (this.halign && this.valign) {
					nexacro.__setElementHandleAlign(_handle, this.halign, this.valign);
				}

				if (this.imageurl && !this._img_sizereq) {
					nexacro.__setElementHandleImageUrl(_handle, this.imageurl);
				}

				if (this.mirror) {
					nexacro.__setElementHandleMirror(_handle, this.mirror);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};


		_pImageElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, align._halign, align._valign);
			}
		};
		_pImageElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, _halign, valign);
			}
		};

		_pImageElement.setElementImageUrl = function (url) {
			if (this.imageurl != url) {
				if (url && url.substring(0, 4).toLowerCase() == "url(") {
					url = url.substring(5, url.length - 2);
					if (this.imageurl == url) {
						return;
					}
				}

				var temp_url = url;

				if (url && !nexacro._isAbsolutePath(url)) {
					var base_url = this._parent_elem._getElementBaseUrl();
					url = nexacro._getImageLocation(url, base_url);
					if (this.imageurl == url) {
						return;
					}
				}

				this.imageurl = url;

				if (url) {
					var size = nexacro._getImageSize(url, this._on_loadImg, this, undefined, temp_url);
					this._img_sizereq = true;
					if (size) {
						this._img_sizereq = false;
						var _handle = this._handle;
						if (_handle) {
							nexacro.__setElementHandleImageUrl(_handle, url);
						}
					}
				}
				else {
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setElementHandleImageUrl(_handle, url);
					}
				}
			}
		};

		_pImageElement.setElementImageBase64 = function (url) {
			if (this.imageurl != url) {
				this.imageurl = url;

				var _handle = this._handle;
				if (_handle) {
					var comma_idx = url.indexOf(",");
					if (comma_idx > -1) {
						var tmp = url.slice(comma_idx + 1, url.legnth);
						url = "data:image;base64," + tmp;
					}

					nexacro.__setElementHandleImageUrl(_handle, url);
				}
			}
		};

		_pImageElement._on_loadImg = function (imgurl, w, h) {
			var _handle = this._handle;
			if (this.imageurl == imgurl) {
				this._img_sizereq = false;
				if (_handle) {
					nexacro.__setElementHandleImageUrl(_handle, imgurl);
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
					nexacro.__setElementHandleMirror(handle, this.mirror && this._isRtl());
				}
			}
		};
		_pImageElement.setElementHandleImageObject = function (_unique_id) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleImageObject(_handle, _unique_id);
			}
		};

		_pImageElement.destroy = function (_owner_handle, _unique_id) {
			if (arguments.length == 0) {
				nexacro.Element.prototype.destroy.call(this);
			}
			else {
				var _handle = this._handle;
				if (_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _unique_id);
					this._owner_elem = null;
					this._handle = null;
				}
			}
		};

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
		_pAlignImageElement._img_sizereq = false;

		_pAlignImageElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createImageElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}

				if (this.align) {
					var align = this.align;
					nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
				}
				else if (this.halign && this.valign) {
					nexacro.__setElementHandleAlign(_handle, this.halign, this.valign);
				}

				if (this.imageurl && !this._img_sizereq) {
					nexacro.__setElementHandleImageUrl(_handle, this.imageurl);
				}

				if (this.mirror) {
					nexacro.__setElementHandleMirror(_handle, this.mirror);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};


		_pAlignImageElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, align._halign, align._valign);
			}
		};


		_pAlignImageElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, _halign, valign);
			}
		};

		_pAlignImageElement.setElementImageUrl = function (url) {
			if (this.imageurl != url) {
				if (url && url.substring(0, 4).toLowerCase() == "url(") {
					url = url.substring(5, url.length - 2);
					if (this.imageurl == url) {
						return;
					}
				}

				var _temp_url = url;

				if (url && !nexacro._isAbsolutePath(url)) {
					var base_url = this._parent_elem._getElementBaseUrl();
					url = nexacro._getImageLocation(url, base_url);
					if (this.imageurl == url) {
						return;
					}
				}

				this.imageurl = url;

				if (url) {
					var size = nexacro._getImageSize(url, this._on_loadImg, this, undefined, _temp_url);
					this._img_sizereq = true;
					if (size) {
						this._img_sizereq = false;
						var _handle = this._handle;
						if (_handle) {
							nexacro.__setElementHandleImageUrl(_handle, url);
						}
					}
				}
				else {
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setElementHandleImageUrl(_handle, url);
					}
				}
			}
		};
		_pAlignImageElement._on_loadImg = function (imgurl, w, h) {
			var _handle = this._handle;
			if (this.imageurl == imgurl) {
				this._img_sizereq = false;
				if (_handle) {
					nexacro.__setElementHandleImageUrl(_handle, imgurl);
				}
			}
		};

		_pAlignImageElement.setElementImageMirror = function (rtlimagemirroring, bChangeRtlDirection) {
			var v = this.mirror;

			if (rtlimagemirroring) {
				v = nexacro._toBoolean(rtlimagemirroring._value);
			}

			if (this.mirror != v || bChangeRtlDirection) {
				this.mirror = v;

				var handle = this._handle;
				if (handle) {
					nexacro.__setElementHandleMirror(handle, this.mirror && this._isRtl());
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
		_pInputElement.inputtype = "normal";
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
		_pInputElement.letterspace = 0;

		_pInputElement.wordwrap = "none";
		_pInputElement._is_focused = false;
		_pInputElement.autoselect = false;
		_pInputElement._is_maskedit = false;

		_pInputElement._isPreventDefault = function (comp, evtname) {
			comp = comp._getFromComponent(comp);

			if (comp) {
				return (comp[evtname] && comp[evtname].defaultprevented);
			}

			return false;
		};

		_pInputElement._wantAccessibilityAdditionalLabel = function () {
			return true;
		};

		_pInputElement.create = function () {
			var _owner_elem = this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createInputElementHandle(this, _win_handle, this.left, this.top, this.width, this.height, this.usemultiline, this._is_maskedit);

				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}
				if (!this.enable) {
					nexacro.__setElementHandleEnable(_handle, false);
				}

				if (this.readonly) {
					nexacro.__setElementHandleReadOnly(_handle, true);
				}

				if (this.tabindex >= 0) {
					nexacro.__setElementHandleTabIndex(_handle, this.tabindex);
				}

				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}

				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}

				if (this.cursor) {
					nexacro.__setElementHandleCursor(_handle, this.cursor.value);
				}

				if (this.align) {
					var align = this.align;
					nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
				}
				else if (this.halign && this.valign) {
					nexacro.__setElementHandleAlign(_handle, this.halign, this.valign);
				}

				if (this.padding) {
					var padding = this.padding;
					nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					nexacro.__setElementHandlePadding(_handle, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
				}

				if (this.caretcolor) {
					nexacro.__setInputElementHandleCaretColor(_handle, this.caretcolor._syscolor);
				}
				if (this.selectcolor) {
					nexacro.__setInputElementHandleSelectColor(_handle, this.selectcolor._syscolor);
				}
				if (this.selectbackground) {
					nexacro.__setInputElementHandleSelectBackgroundColor(_handle, this.selectbackground._syscolor);
				}
				if (this.compositecolor) {
					nexacro.__setInputElementHandleCompositeColor(_handle, this.compositecolor._syscolor);
				}

				if (!this.usemultiline && this.password) {
					nexacro.__setInputElementHandleUsePassword(_handle, true);
				}
				if (this.usemultiline) {
					if (this.linespace > 0) {
						nexacro.__setElementHandleLineSpace(_handle, this.linespace);
					}
					if (this.wordwrap != "none") {
						nexacro.__setElementHandleWordWrap(_handle, this.wordwrap);
					}
				}

				if (this.tabindentsize > 4) {
					nexacro.__setElementHandleTabIndentSize(_handle, this.tabindentsize);
				}

				if (this.imemode) {
					nexacro.__setInputElementHandleImeMode(_handle, this.imemode);
				}

				if (this.inputtype) {
					nexacro.__setInputElementHandleInputType(_handle, this.inputtype);
				}

				if (this.text) {
					nexacro.__setElementHandleValue(_handle, this.text);
				}
				else if (this.displaynulltext) {
					nexacro.__setElementHandleNullTextColor(_handle, this.displaynulltextcolor._syscolor);
					nexacro.__setElementHandleValue(_handle, this.displaynulltext, true);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pInputElement.setElementEnable = function (enable) {
			if (this.enable != enable) {
				this.enable = enable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleEnable(_handle, enable);
				}
			}
		};
		_pInputElement.setElementTabIndex = function (tabindex) {
			if (this.tabindex != tabindex) {
				this.tabindex = tabindex;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleTabIndex(_handle, tabindex);
				}
			}
		};

		_pInputElement.setElementFont = function (font) {
			this.font = font;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
			}
		};
		_pInputElement.setElementColor = function (color) {
			this.color = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleColor(_handle, color._syscolor);
			}
		};
		_pInputElement.setElementCursor = function (cursor) {
			this.cursor = cursor;
			var _handle = this._handle;
			var _parent_handle = this._parent_elem ? this._parent_elem._handle : null;
			if (_handle && _parent_handle) {
				if (cursor && !cursor._is_empty) {
					nexacro.__setElementHandleCursor(_parent_handle, cursor.value);
					nexacro.__setElementHandleCursor(_handle, cursor.value);
				}
				else {
					nexacro.__setElementHandleCursor(_parent_handle, cursor);
					nexacro.__setElementHandleCursor(_handle, cursor);
				}
			}
		};

		_pInputElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, align._halign, align._valign);
			}
		};
		_pInputElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, _halign, valign);
			}
		};

		_pInputElement.setElementPadding = function (padding) {
			this.padding = padding;
			this.padding_left = 0;
			this.padding_top = 0;
			this.padding_right = 0;
			this.padding_bottom = 0;
			var _handle = this._handle;
			if (_handle && padding) {
				nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
			}
		};

		_pInputElement.setElementPaddingXY = function (left, top, right, bottom) {
			this.padding = null;
			this.padding_left = left;
			this.padding_top = top;
			this.padding_right = right;
			this.padding_bottom = bottom;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandlePadding(_handle, left, top, right, bottom);
			}
		};

		_pInputElement.setElementValue = function (value) {
			var _handle = this._handle;
			var comp = this._parent_elem.linkedcontrol;
			var api = comp._edit_base_api;

			var bValChange = (this.value === value) ? false : true;
			var bEmpString = (value == "") ? true : false;

			this.value = value;
			if (api) {
				this.text = api._text;
			}
			else {
				this.text = value;
			}

			if (_handle) {
				var input_value = nexacro.__getElementHandleValue(_handle);
				var bTxtChange = (this.text == input_value) ? false : true;

				if (bValChange || bTxtChange || bEmpString) {
					this._updateInputValue();
				}
			}
		};

		_pInputElement._updateInputValue = function () {
			var _handle = this._handle;
			var comp = this._parent_elem.linkedcontrol;
			var api = comp._edit_base_api;

			if (this.value !== undefined && this.value !== null) {
				nexacro.__setElementHandleValue(_handle, this.text);
			}
			else if (!this._is_focused && this.displaynulltext && this.displaynulltext.length > 0) {
				nexacro.__setElementHandleValue(_handle, this.displaynulltext, true);
			}
			else {
				if (api && (api._type_name == "EditMaskString" || api._type_name == "EditMaskNumber")) {
					nexacro.__setElementHandleValue(_handle, this.text);
				}
				else {
					nexacro.__setElementHandleValue(_handle, "");
				}
			}
		};

		_pInputElement.setElementDisplayNullText = function (text) {
			var nulltext_change = false;
			if (this.displaynulltext != text) {
				nulltext_change = true;
				this.displaynulltext = text;
			}

			var _handle = this._handle;
			if (_handle && nulltext_change && nexacro._isNull(this.value) && !this._is_focused) {
				nexacro.__setElementHandleNullTextColor(_handle, this.displaynulltextcolor._syscolor);
				nexacro.__setElementHandleValue(_handle, this.displaynulltext, true);
			}
		};

		_pInputElement.setElementMaxLength = function (length) {
			if (this.maxlength != length) {
				this.maxlength = length;
			}
		};

		_pInputElement.setElementReadonly = function (readonly) {
			if (this.readonly != readonly) {
				this.readonly = readonly;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleReadOnly(_handle, readonly);
				}
			}
		};

		_pInputElement.setElementCaretColor = function (color) {
			this.caretcolor = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setInputElementHandleCaretColor(_handle, color._syscolor);
			}
		};

		_pInputElement.setElementSelectColor = function (color) {
			this.selectcolor = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setInputElementHandleSelectColor(_handle, color._syscolor);
			}
		};

		_pInputElement.setElementDisplayNullTextColor = function (color) {
			this.displaynulltextcolor = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleNullTextColor(_handle, color._syscolor);
			}
		};

		_pInputElement.setElementSelectBackgroundColor = function (color) {
			this.selectbackground = color;
			var _handle = this._handle;

			if (_handle) {
				nexacro.__setInputElementHandleSelectBackgroundColor(_handle, color._syscolor);
			}
		};

		_pInputElement.setElementCompositeColor = function (color) {
			this.compositecolor = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setInputElementHandleCompositeColor(_handle, color._syscolor);
			}
		};

		_pInputElement.setElementTabindentSize = function (indent) {
			this.tabindentsize = indent;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleTabIndentSize(_handle, indent);
			}
		};

		_pInputElement.setElementLineSpace = function (linespace) {
		};

		_pInputElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLetterSpace(_handle, letterspace);
				}
			}
		};

		_pInputElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLetterSpace(_handle, letterspace);
				}
			}
		};

		_pInputElement.setElementWordWrap = function (wordwrap) {
		};

		_pInputElement.setElementPassword = function (password) {
			if (this.password != password) {
				this.password = password;
				var _handle = this._handle;
				if (_handle && !this.usemultiline) {
					if (password == true) {
						nexacro.__setInputElementHandleSetIme(_handle, "none", "none");
					}
					else {
						nexacro.__setInputElementHandleSetIme(_handle, this.useime, this.imemode);
					}

					nexacro.__setInputElementHandleUsePassword(_handle, password);
				}
			}
		};


		_pInputElement.setElementUseIme = function (useime) {
			if (this.useime != useime) {
				this.useime = useime;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setInputElementHandleUseIme(_handle, useime);
				}
			}
		};

		_pInputElement.setElementImeMode = function (imemode) {
			if (this.imemode != imemode) {
				this.imemode = imemode;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setInputElementHandleImeMode(_handle, imemode);
				}
			}
		};

		_pInputElement.setElementInputType = function (inputtype) {
			if (this.inputtype != inputtype) {
				this.inputtype = inputtype;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setInputElementHandleInputType(_handle, inputtype);
				}
			}
		};

		_pInputElement.setInputElementCompositeClear = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setInputElementCompositeClear(_handle);
			}
		};

		_pInputElement.setElementFocus = function () {
			var _handle = this._handle;
			if (_handle) {
				if (!this._is_focused) {
					this._is_focused = true;
					if (!this.value) {
						var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
						var api = comp._edit_base_api;
						if (api && (api._type_name == "EditMaskString" || api._type_name == "EditMaskNumber")) {
							nexacro.__setElementHandleValue(_handle, this.text);
						}
						else {
							nexacro.__setElementHandleValue(_handle, "");
						}
					}

					nexacro.__setElementHandleFocus(_handle);
					nexacro.__setLastFocusedElement(this);
				}
				else {
				}
			}
		};

		_pInputElement.setElementBlur = function () {
			var _handle = this._handle;
			if (_handle && this._is_focused) {
				this._is_focused = false;
				if (!this.value) {
					nexacro.__setElementHandleValue(_handle, this.displaynulltext, true);
				}
				nexacro.__setInputElementHandleBlur(_handle);
			}
		};

		_pInputElement.setElementSetSelect = function (start, end) {
			var _handle = this._handle;
			if (_handle) {
				var val = this.getElementValue();
				var len = val.length;

				end = (end == -1 ? len : end);
				var range = end - start;
				if (range == len) {
					nexacro.__setInputElementHandleSetSelect(_handle, start, end, true);
				}
				else {
					nexacro.__setInputElementHandleSetSelect(_handle, start, end, false);
				}
			}
		};

		_pInputElement.getElementCaretPos = function () {
			var _handle = this._handle;
			if (_handle) {
				var pos = nexacro.__getInputElementHandleCaretPos(_handle);
				if (pos) {
					return {
						begin : pos[0], 
						end : pos[1]
					};
				}
			}
			return -1;
		};

		_pInputElement.getElementSelectionRange = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getInputElementHandleSelectionRange(_handle);
			}
			return [0, 0];
		};

		_pInputElement.getCaretLine = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getInputElementHandleCaretLine(_handle);
			}
			return 0;
		};

		_pInputElement.getScrollLeft = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getInputElementHandleScrollLeft(_handle);
			}
			return 0;
		};

		_pInputElement.setScrollLeft = function (v) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setInputElementHandleScrollLeft(_handle, v);
			}
		};

		_pInputElement.getScrollTop = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getInputElementHandleScrollTop(_handle);
			}
			return 0;
		};

		_pInputElement.setScrollTop = function (v) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setInputElementHandleScrollTop(_handle, v);
			}
		};

		_pInputElement.getScrollWidth = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getInputElementHandleScrollWidth(_handle);
			}
			return 0;
		};

		_pInputElement.getScrollHeight = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getInputElementHandleScrollHeight(_handle);
			}
			return 0;
		};

		_pInputElement.getElementValue = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getElementHandleValue(_handle);
			}
			return "";
		};

		_pInputElement.setElementAccessibilityRole = function (role) {
		};

		_pInputElement._checkActiveElement = function (role) {
			var _handle = this._handle;
			var isActive = true;

			if (_handle) {
				isActive = nexacro._checkActiveElement(this);
			}

			return isActive;
		};

		_pInputElement._setCutAction = nexacro._emptyFn;
		_pInputElement._deleteCaret = nexacro._emptyFn;
		_pInputElement._setElementInputRole = nexacro._emptyFn;
		_pInputElement._setElementInputLabel = nexacro._emptyFn;

		_pInputElement._on_sys_keyinput = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_keyinput(this);
				return true;
			}
			return false;
		};
		_pInputElement._on_sys_keypress = function (keycode, charcode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				var bRet = comp._on_input_keypress(this, keycode, charcode, altkey, ctrlkey, shiftkey);

				if (bRet != false) {
					return true;
				}
			}
			return false;
		};
		_pInputElement._on_sys_keydown = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				var _win = comp._getWindow();

				nexacro._syshandler_onkeydown_forward(_win, this, keycode, altkey, ctrlkey, shiftkey);

				if (this._isPreventDefault(comp, "onkeydown")) {
					return false;
				}

				var bRet = comp._on_input_keydown(this, keycode, altkey, ctrlkey, shiftkey);

				if (keycode == nexacro.Event.KEY_DELETE || keycode == nexacro.Event.KEY_BACKSPACE) {
					comp._on_input_keypress(this, keycode, keycode, altkey, ctrlkey, shiftkey);
				}

				if (bRet != false) {
					return true;
				}
			}
			return false;
		};
		_pInputElement._on_sys_keyup = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				var _win = comp._getWindow();

				if (this._isPreventDefault(comp, "onkeyup")) {
					return false;
				}

				comp._on_input_keyup(this, keycode, altkey, ctrlkey, shiftkey);

				nexacro._syshandler_onkeyup_forward(_win, this, keycode, altkey, ctrlkey, shiftkey);

				if (this._isPreventDefault(comp, "onkeyup")) {
					return false;
				}
			}
			return false;
		};

		_pInputElement._on_sys_compositionstart = function (data) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_compositionstart(data);
			}
			return false;
		};
		_pInputElement._on_sys_compositionupdate = function (data) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_compositionupdate(data);
			}
			return false;
		};
		_pInputElement._on_sys_compositionend = function (data) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_compositionend(data);
			}
			return false;
		};

		_pInputElement._on_sys_focus = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				if (comp._on_input_focus) {
					comp._on_input_focus(this);
				}

				var _handle = this._handle;
				if (_handle && !this._is_focused) {
					this._is_focused = true;
				}
			}
			return false;
		};
		_pInputElement._on_sys_blur = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				if (comp._on_input_blur) {
					comp._on_input_blur(this, this._handle);
				}

				var _handle = this._handle;
				if (_handle && this._is_focused) {
					this._is_focused = false;

					if (nexacro._isNull(this.value) && this.displaynulltext) {
						nexacro.__setElementHandleValue(_handle, this.displaynulltext, true);
					}
				}
			}
			return false;
		};

		_pInputElement._on_sys_lbuttondown = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_mousedown(this, altkey, ctrlkey, shiftkey);
			}
			return false;
		};
		_pInputElement._on_sys_lbuttonup = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_mouseup(this, altkey, ctrlkey, shiftkey);
			}
			return false;
		};
		_pInputElement._on_sys_rbuttondown = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_mousedown(this);
			}
			return false;
		};
		_pInputElement._on_sys_rbuttonup = function (button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);

			if (comp) {
				var _win = comp._getWindow();

				nexacro._syshandler_onrbuttonup_forward(_win, this, button, altkey, ctrlkey, shiftkey, windowX, windowY, screenX, screenY);

				comp._on_input_mouseup(this);
				return true;
			}
			return false;
		};
		_pInputElement._on_sys_mousemove = function (keycode, altkey, ctrlkey, shiftkey) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_mousemove(this);
			}
			return false;
		};

		_pInputElement._on_sys_cut = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_cut(this);
			}
			return false;
		};
		_pInputElement._on_sys_copy = nexacro._emptyFn;
		_pInputElement._on_sys_paste = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				comp._on_input_paste(this);
			}
			return false;
		};

		_pInputElement._on_sys_contextmenu = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				var _win = comp._getWindow();

				nexacro._syshandler_oncontextmenu_forward(_win, this);

				return comp._on_contextmenu(this);
			}
			return false;
		};

		_pInputElement._on_sys_select = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				return comp._on_input_select(this);
			}
			return false;
		};

		_pInputElement._setElementInputRole = nexacro._emptyFn;

		_pInputElement._bindEvent = function () {
			var input = this._handle;

			nexacro._observeInputEvent(input, "input", "oninput", this._on_sys_keyinput);
			nexacro._observeInputEvent(input, "keydown", "onkeydown", this._on_sys_keydown);
			nexacro._observeInputEvent(input, "keyup", "onkeyup", this._on_sys_keyup);
			nexacro._observeInputEvent(input, "keypress", "onkeypress", this._on_sys_keypress);

			nexacro._observeInputEvent(input, "compositionstart", "oncompositionstart", this._on_sys_compositionstart);
			nexacro._observeInputEvent(input, "compositionupdate", "oncompositionupdate", this._on_sys_compositionupdate);
			nexacro._observeInputEvent(input, "compositionend", "oncompositionend", this._on_sys_compositionend);

			nexacro._observeInputEvent(input, "focus", "onfocus", this._on_sys_focus);
			nexacro._observeInputEvent(input, "blur", "onblur", this._on_sys_blur);

			nexacro._observeInputEvent(input, "lbuttondown", "onlbuttondown", this._on_sys_lbuttondown);
			nexacro._observeInputEvent(input, "lbuttonup", "onlbuttonup", this._on_sys_lbuttonup);
			nexacro._observeInputEvent(input, "rbuttondown", "onrbuttondown", this._on_sys_rbuttondown);
			nexacro._observeInputEvent(input, "rbuttonup", "onrbuttonup", this._on_sys_rbuttonup);
			nexacro._observeInputEvent(input, "mousemove", "onmousemove", this._on_sys_mousemove);

			if (nexacro.SupportTouch) {
				nexacro._observeInputEvent(input, "touchstart", "ontouchstart", this._on_sys_lbuttondown);
				nexacro._observeInputEvent(input, "touchend", "ontouchend", this._on_sys_lbuttonup);
				nexacro._observeInputEvent(input, "touchmove", "ontouchmove", this._on_sys_mousemove);
			}

			nexacro._observeInputEvent(input, "cut", "oncut", this._on_sys_cut);
			nexacro._observeInputEvent(input, "paste", "onpaste", this._on_sys_paste);
			nexacro._observeInputEvent(input, "contextmenu", "oncontextmenu", this._on_sys_contextmenu);

			nexacro._observeInputEvent(input, "select", "onselect", this._on_sys_select);
		};

		_pInputElement._unBindEvent = function () {
			var input = this._handle;

			nexacro._stopInputObserving(input, "input", "oninput", this._on_sys_keyinput);
			nexacro._stopInputObserving(input, "keydown", "onkeydown", this._on_sys_keydown);
			nexacro._stopInputObserving(input, "keyup", "onkeyup", this._on_sys_keyup);
			nexacro._stopInputObserving(input, "keypress", "onkeypress", this._on_sys_keypress);

			nexacro._stopInputObserving(input, "compositionstart", "oncompositionstart", this._on_sys_compositionstart);
			nexacro._stopInputObserving(input, "compositionupdate", "oncompositionupdate", this._on_sys_compositionupdate);
			nexacro._stopInputObserving(input, "compositionend", "oncompositionend", this._on_sys_compositionend);

			nexacro._stopInputObserving(input, "focus", "onfocus", this._on_sys_focus);
			nexacro._stopInputObserving(input, "blur", "onblur", this._on_sys_blur);

			nexacro._stopInputObserving(input, "lbuttondown", "onlbuttondown", this._on_sys_lbuttondown);
			nexacro._stopInputObserving(input, "lbuttonup", "onlbuttonup", this._on_sys_lbuttonup);
			nexacro._stopInputObserving(input, "rbuttondown", "onrbuttondown", this._on_sys_rbuttondown);
			nexacro._stopInputObserving(input, "rbuttonup", "onrbuttonup", this._on_sys_rbuttonup);
			nexacro._stopInputObserving(input, "mousemove", "onmousemove", this._on_sys_mousemove);

			if (nexacro.SupportTouch) {
				nexacro._stopInputObserving(input, "touchstart", "ontouchstart", this._on_sys_lbuttondown);
				nexacro._stopInputObserving(input, "touchend", "ontouchend", this._on_sys_lbuttonup);
				nexacro._stopInputObserving(input, "touchmove", "ontouchmove", this._on_sys_mousemove);
			}

			nexacro._stopInputObserving(input, "cut", "oncut", this._on_sys_cut);
			nexacro._stopInputObserving(input, "paste", "onpaste", this._on_sys_paste);
			nexacro._stopInputObserving(input, "contextmenu", "oncontextmenu", this._on_sys_contextmenu);

			nexacro._stopInputObserving(input, "select", "onselect", this._on_sys_select);
		};

		delete _pInputElement;

		nexacro.TextAreaElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pTextAreaElement = new nexacro._createPrototype(nexacro.InputElement, nexacro.TextAreaElement);
		nexacro.TextAreaElement.prototype = _pTextAreaElement;


		_pTextAreaElement._type_name = "TextAreaElement";

		_pTextAreaElement.usemultiline = true;

		_pTextAreaElement.setElementLineSpace = function (linespace) {
			if (this.linespace != linespace) {
				this.linespace = linespace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLineSpace(_handle, linespace);
				}
			}
		};

		_pTextAreaElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLetterSpace(_handle, letterspace);
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
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleWordWrap(_handle, wordwrap);
				}
			}
		};

		_pTextAreaElement._on_sys_scroll = function (posTop, posLeft) {
			var container = this._parent_elem.getContainerElement(this.position_step);
			if (container) {
				var comp = container._parent_elem.linkedcontrol;
				var _win = comp._getWindow();
				if (_win && _win._cur_ldown_elem) {
					var hscrollbar = container.parent._hscroll_control;
					if (hscrollbar && !hscrollbar._is_tracking) {
						hscrollbar.set_pos(posLeft);
					}

					var vscrollbar = container.parent._vscroll_control;
					if (vscrollbar && !vscrollbar._is_tracking) {
						vscrollbar.set_pos(posTop);
					}
				}
			}
		};

		_pTextAreaElement._bindEvent = function () {
			var input = this._handle;

			nexacro.InputElement.prototype._bindEvent.call(this);

			nexacro._observeInputEvent(input, "scroll", "onscroll", this._on_sys_scroll);
		};

		_pTextAreaElement._unbindEvent = function () {
			var input = this._handle;

			nexacro.InputElement.prototype._unBindEvent.call(this);

			nexacro._stopInputObserving(input, "scroll", "onscroll", this._on_sys_scroll);
		};

		delete _pTextAreaElement;

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
		_pControlElementBase.opacity = 0;
		_pControlElementBase.padding = null;
		_pControlElementBase.padding_left = 0;
		_pControlElementBase.padding_top = 0;
		_pControlElementBase.padding_right = 0;
		_pControlElementBase.padding_bottom = 0;
		_pControlElementBase.position_step = undefined;

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
		_pControlElementBase._accessibility_flag_multiline = undefined;
		_pControlElementBase._accessibility_prop_itemcount = undefined;
		_pControlElementBase._accessibility_prop_itemindex = undefined;
		_pControlElementBase._accessibility_prop_valuemax = undefined;
		_pControlElementBase._accessibility_prop_valuemin = undefined;
		_pControlElementBase._accessibility_prop_hotkey = undefined;


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
		_pControlElementBase.linkedcontrol = null;
		_pControlElementBase._client_element = null;
		_pControlElementBase._vml_elem = null;
		_pControlElementBase._bkimg_elem = null;
		_pControlElementBase._append_flag = false;
		_pControlElementBase._is_window_element = false;
		_pControlElementBase._img_sizereq = false;
		_pControlElementBase._img_url = "";
		_pControlElementBase._hittest_type = "";

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

		_pControlElementBase.setElementPositionStep = function (position_step) {
			if (this.position_step != position_step || position_step == -1) {
				this.position_step = position_step;

				var _handle = this._handle;
				if (_handle && this._parent_elem) {
					var old_owner_elem = this._owner_elem;
					var _owner_elem = this._parent_elem.getContainerElement(position_step);
					if (old_owner_elem && old_owner_elem._handle && _owner_elem && _owner_elem._handle) {
						nexacro.__unlinkElementHandle(old_owner_elem._handle, _handle);
						nexacro.__appendElementHandle(_owner_elem._handle, _handle);
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
					nexacro.__setElementHandleEnable(_handle, enable);
				}
			}
		};
		_pControlElementBase.setElementTabIndex = function (tabindex) {
			if (this.tabindex != tabindex) {
				this.tabindex = tabindex;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleTabIndex(_handle, tabindex);
				}
			}
		};
		_pControlElementBase.setElementZIndex = function (zindex) {
			if (this.zindex != zindex) {
				this.zindex = zindex;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleZindex(_handle, zindex);
				}
			}
		};

		_pControlElementBase.setElementFont = function (font) {
			this.font = font;
			if (this._client_element) {
				this._client_element.setElementFont(font);
			}
		};
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
				if (cursor && !cursor._is_empty) {
					nexacro.__setElementHandleCursor(_handle, cursor.value);
				}
				else {
					nexacro.__setElementHandleCursor(_handle, cursor);
				}
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
					nexacro.__setElementHandleToolTip(_handle, tooltiptext, tooltiptype);
				}
			}
		};

		_pControlElementBase.setElementShadow = function (shadow) {
			this.shadow = shadow;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleShadow(_handle, shadow.type, shadow._syscolor, shadow.factor, shadow._offset_x, shadow._offset_y);
			}
		};

		_pControlElementBase.setElementFocus = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleFocus(_handle);
				nexacro.__setLastFocusedElement(this);
			}
		};

		_pControlElementBase._isVML = function () {
			return false;
		};

		_pControlElementBase.setElementOpacity = function (opacity) {
			var _handle = this._handle;
			this.opacity = parseInt(opacity.value);
			if (_handle) {
				var val = (this.opacity >= 100) ? 100 : (this.opacity <= 0) ? 0 : this.opacity;
				nexacro.__setElementHandleOpacity(_handle, val);
			}
		};

		_pControlElementBase.setElementAlign = nexacro._emptyFn;
		_pControlElementBase.setElementAlignXY = nexacro._emptyFn;

		_pControlElementBase.setElementPadding = nexacro._emptyFn;
		_pControlElementBase.setElementPaddingXY = nexacro._emptyFn;

		_pControlElementBase.setElementHittestType = function (httype) {
			if (this._hittest_type != httype) {
				this._hittest_type = httype;
				if (this._handle) {
					nexacro.__setElementHittestValue(this._handle, httype);
				}
			}
		};

		_pControlElementBase.setElementSize = function (width, height) {
			if (this.width != width || this.height != height) {
				this.width = width;
				this.height = height;
				var _handle = this._handle;
				this._setControlSize(_handle, width, height);
				this._updateClientSize();
			}
		};

		_pControlElementBase.setElementBorder = function (border, bordertype) {
			this.border = border;
			this.bordertype = bordertype;
			var _handle = this._handle;
			this._setControlBorder(_handle, border, bordertype);
			this._updateClientSize();
		};

		_pControlElementBase.setElementBackground = function (background, gradation) {
			this.background = background;
			this.gradation = gradation;

			if (background && background.image) {
				var bkimgurl = background.image;

				if (bkimgurl && bkimgurl.substring(0, 4).toLowerCase() == "url(") {
					bkimgurl = bkimgurl.substring(5, bkimgurl.length - 2);
				}
				if (bkimgurl && !nexacro._isAbsolutePath(bkimgurl)) {
					var base_url = this._getElementBaseUrl();
					bkimgurl = nexacro._getImageLocation(bkimgurl, base_url);
				}

				if (this._img_url != bkimgurl) {
					this._img_url = bkimgurl;
					var imgsize = nexacro._getImageSize(bkimgurl, this._on_notify_imgsize, this, undefined, background.image);

					if (bkimgurl.substring(0, 10).toLowerCase() == "data:image") {
						this._img_sizereq = false;
					}
					else {
						this._img_sizereq = true;
					}

					if (imgsize && this._img_sizereq) {
						this._img_sizereq = false;
					}
				}
			}

			var _handle = this._handle;
			if (_handle) {
				this._setControlBackground(_handle, background, gradation);
			}
		};

		_pControlElementBase.setElementAccessibilityRole = function (role) {
			var accrole = nexacro._roleList[role];
			if (this.accessibility_role != accrole) {
				this.accessibility_role = accrole;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityRole(_handle, accrole);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityLabel = function (label) {
			if (this.accessibility_label != label) {
				this.accessibility_label = label;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityLabel(_handle, label);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityEnable = function (enable) {
			if (this.accessibility_enable != enable) {
				this.accessibility_enable = enable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityEnable(_handle, enable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityDescription = function (desc) {
			if (this.accessibility_description != desc) {
				this.accessibility_description = desc;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityDescription(_handle, desc);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityAction = function (action) {
			if (this.accessibility_action != action) {
				this.accessibility_action = action;
			}
		};

		_pControlElementBase.setElementAccessibilityDescLevel = function (desclevel) {
			if (this.accessibility_desclevel != desclevel) {
				this.accessibility_desclevel = desclevel;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityDescLevel(_handle, desclevel);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityValue = function (value) {
		};

		_pControlElementBase.setElementAccessibilityStatDisabled = function (disabled) {
			if (this._accessibility_stat_disabled != disabled) {
				this._accessibility_stat_disabled = disabled;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatDisabled(_handle, disabled);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatHidden = function (hidden) {
			if (this._accessibility_stat_hidden != hidden) {
				this._accessibility_stat_hidden = hidden;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatHidden(_handle, hidden);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityHidden = function (hidden) {
		};

		_pControlElementBase.setElementAccessibilityStatChecked = function (checked) {
			if (this._accessibility_stat_checked != checked) {
				this._accessibility_stat_checked = checked;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatChecked(_handle, checked);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatPressed = function (pressed) {
			if (this._accessibility_stat_pressed != pressed) {
				this._accessibility_stat_pressed = pressed;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatPressed(_handle, pressed);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatSelected = function (selected) {
			if (this._accessibility_stat_selected != selected) {
				this._accessibility_stat_selected = selected;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatSelected(_handle, selected);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatExpanded = function (expanded) {
			if (this._accessibility_stat_expanded != expanded) {
				this._accessibility_stat_expanded = expanded;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatExpanded(_handle, expanded);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityStatAutoComplete = function (autocomplete) {
		};

		_pControlElementBase.setElementAccessibilityFlagHasPopup = function (haspopup) {
			if (this._accessibility_flag_haspopup != haspopup) {
				this._accessibility_flag_haspopup = haspopup;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatHasPopup(_handle, haspopup);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagFocusable = function (focusable) {
			if (this._accessibility_flag_focusable != focusable) {
				this._accessibility_flag_focusable = focusable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityFlagFocusable(_handle, focusable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagReadOnly = function (readonly) {
			if (this._accessibility_flag_readonly != readonly) {
				this._accessibility_flag_readonly = readonly;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityFlagReadOnly(_handle, readonly);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagPassword = function (password) {
			if (this._accessibility_flag_password != password) {
				this._accessibility_flag_password = password;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityFlagPassword(_handle, password);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagMultiSelectable = function (multiselectable) {
			if (this._accessibility_flag_multiselectable != multiselectable) {
				this._accessibility_flag_multiselectable = multiselectable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityFlagMultiSelectable(_handle, multiselectable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagSelectable = function (selectable) {
			if (this._accessibility_flag_selectable != selectable) {
				this._accessibility_flag_selectable = selectable;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityFlagSelectable(_handle, selectable);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagDefaultButton = function (defaultbutton) {
			if (this._accessibility_flag_defaultbutton != defaultbutton) {
				this._accessibility_flag_defaultbutton = defaultbutton;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityStatDefaultButton(_handle, defaultbutton);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityFlagMultiLine = function (multiline) {
			if (this._accessibility_flag_multiline != multiline) {
				this._accessibility_flag_multiline = multiline;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityFlagMultiLine(_handle, multiline);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoCount = function (count) {
			if (this._accessibility_prop_infocount != count) {
				this._accessibility_prop_infocount = count;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityInfoCount(_handle, count);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoIndex = function (index) {
			if (this._accessibility_prop_infoindex != index) {
				this._accessibility_prop_infoindex = index;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityInfoIndex(_handle, index);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoValueMax = function (valuemax) {
			if (this._accessibility_prop_infovaluemax != valuemax) {
				this._accessibility_prop_infovaluemax = valuemax;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityInfoValueMax(_handle, valuemax);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoValueMin = function (valuemin) {
			if (this._accessibility_prop_infovaluemin != valuemin) {
				this._accessibility_prop_infovaluemin = valuemin;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityInfoValueMin(_handle, valuemin);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoValueCur = function (valuecur) {
			if (this._accessibility_prop_infovaluecur != valuecur) {
				this._accessibility_prop_infovaluecur = valuecur;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityInfoValueCur(_handle, valuecur);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityInfoLevel = function (level) {
			if (this._accessibility_prop_infolevel != level) {
				this._accessibility_prop_infolevel = level;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityInfoLevel(_handle, level);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityHotKey = function (hotkey) {
			if (this._accessibility_prop_hotkey != hotkey) {
				this._accessibility_prop_hotkey = hotkey;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleAccessibilityHotKey(_handle, hotkey);
				}
			}
		};

		_pControlElementBase.setElementAccessibilityActiveDescendant = function (activedescendant_elem) {
			this._accessibility_prop_activedescendant = activedescendant_elem.linkedcontrol._unique_id;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAccessibilityActiveDescendant(_handle, activedescendant_elem.linkedcontrol._unique_id);
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

		_pControlElementBase.setElementAccessibilityNotifyEvent = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAccessibilityNotifyEvent(_handle);
			}
			return true;
		};

		_pControlElementBase._refreshForeground = function (_handle) {
			if (!this.visible) {
				nexacro.__setElementHandleVisible(_handle, false);
			}
			if (!this.enable) {
				nexacro.__setElementHandleEnable(_handle, false);
			}
			if (this.tabindex >= -1) {
				nexacro.__setElementHandleTabIndex(_handle, this.tabindex);
			}
			if (this.zindex >= 0) {
				nexacro.__setElementHandleZindex(_handle, this.zindex);
			}
			if (this.cursor) {
				nexacro.__setElementHandleCursor(_handle, this.cursor.value);
			}
			if (this.tooltiptext) {
				nexacro.__setElementHandleToolTip(_handle, this.tooltiptext, this.tooltiptype);
			}
			if (this.shadow) {
				var shadow = this.shadow;
				nexacro.__setElementHandleShadow(_handle, shadow.type, shadow._syscolor, shadow.factor, shadow._offset_x, shadow._offset_y);
			}

			if (nexacro._enableaccessibility) {
				if (this.accessibility_role) {
					nexacro.__setElementHandleAccessibilityRole(_handle, this.accessibility_role);
				}

				if (this.accessibility_enable) {
					if (this.accessibility_enable) {
						nexacro.__setElementHandleAccessibilityEnable(_handle, this.accessibility_enable);
					}
					if (this.accessibility_desclevel) {
						nexacro.__setElementHandleAccessibilityDescLevel(_handle, this.accessibility_desclevel);
					}
					if (this.accessibility_description) {
						nexacro.__setElementHandleAccessibilityDescription(_handle, this.accessibility_description);
					}
					var readlabel = this._makeAccessibilityLabelbyReadtype(this);
					if (readlabel != this.accessibility_readlabel) {
						this.accessibility_readlabel = readlabel;
						nexacro.__setElementHandleAccessibilityLabel(_handle, this.accessibility_readlabel);
					}
				}
				else {
					nexacro.__setElementHandleAccessibilityEnable(_handle, this.accessibility_enable);
				}


				if (this._accessibility_stat_disabled) {
					nexacro.__setElementHandleAccessibilityStatDisabled(_handle, this._accessibility_stat_disabled);
				}
				if (this._accessibility_stat_hidden) {
					nexacro.__setElementHandleAccessibilityStatHidden(_handle, this._accessibility_stat_hidden);
				}
				if (this._accessibility_stat_checked) {
					nexacro.__setElementHandleAccessibilityStatChecked(_handle, this._accessibility_stat_checked);
				}

				if (this._accessibility_stat_pressed) {
					nexacro.__setElementHandleAccessibilityStatPressed(_handle, this._accessibility_stat_pressed);
				}
				if (this._accessibility_stat_selected) {
					nexacro.__setElementHandleAccessibilityStatSelected(_handle, this._accessibility_stat_selected);
				}
				if (this._accessibility_stat_expanded) {
					nexacro.__setElementHandleAccessibilityStatExpanded(_handle, this._accessibility_stat_expanded);
				}

				if (this._accessibility_flag_haspopup) {
					nexacro.__setElementHandleAccessibilityStatHasPopup(_handle, this._accessibility_flag_haspopup);
				}
				if (this._accessibility_flag_focusable) {
					nexacro.__setElementHandleAccessibilityFlagFocusable(_handle, this._accessibility_flag_focusable);
				}
				if (this._accessibility_flag_readonly) {
					nexacro.__setElementHandleAccessibilityFlagReadOnly(_handle, this._accessibility_flag_readonly);
				}

				if (this._accessibility_flag_password) {
					nexacro.__setElementHandleAccessibilityFlagPassword(_handle, this._accessibility_flag_password);
				}
				if (this._accessibility_flag_multiselectable) {
					nexacro.__setElementHandleAccessibilityFlagMultiSelectable(_handle, this._accessibility_flag_multiselectable);
				}
				if (this._accessibility_flag_selectable) {
					nexacro.__setElementHandleAccessibilityFlagSelectable(_handle, this._accessibility_flag_selectable);
				}
				if (this._accessibility_flag_defaultbutton) {
					nexacro.__setElementHandleAccessibilityStatDefaultButton(_handle, this._accessibility_flag_defaultbutton);
				}

				if (this._accessibility_flag_multiline) {
					nexacro.__setElementHandleAccessibilityFlagMultiLine(_handle, this._accessibility_flag_multiline);
				}

				if (this._accessibility_prop_hotkey) {
					nexacro.__setElementHandleAccessibilityHotKey(_handle, this._accessibility_prop_hotkey);
				}

				if (this._accessibility_prop_itemcount) {
					nexacro.__setElementHandleAccessibilityInfoCount(_handle, this._accessibility_prop_itemcount);
				}
				if (this._accessibility_prop_itemindex) {
					nexacro.__setElementHandleAccessibilityInfoIndex(_handle, this._accessibility_prop_itemindex);
				}

				if (this._accessibility_prop_valuemax) {
					nexacro.__setElementHandleAccessibilityInfoValueMax(_handle, this._accessibility_prop_valuemax);
				}
				if (this._accessibility_prop_valuemin) {
					nexacro.__setElementHandleAccessibilityInfoValueMin(_handle, this._accessibility_prop_valuemin);
				}
			}

			nexacro.AccessibilityUtil.supportMobileApplicationAccessibility(this);
		};

		_pControlElementBase._setControlSize = function (_handle, width, height) {
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
				this._inner_width = inner_width;
				this._inner_height = inner_height;

				if (_handle) {
					nexacro.__setElementHandleSize(_handle, width, height);
				}
			}

			if (this._is_window_element) {
				var _win_handle = this.getRootWindowHandle();
				nexacro._setWindowHandleBorder(_win_handle, this.border, this.bordertype);
			}
		};

		_pControlElementBase._setControlBorder = function (_handle, border, bordertype) {
			if (_handle) {
				if (bordertype) {
					var radiusx = (bordertype._radiusx < 0) ? 0 : bordertype._radiusx;
					var radiusy = (bordertype._radiusy < 0) ? 0 : bordertype._radiusy;

					nexacro.__setElementHandleBordertype(_handle, bordertype.type, radiusx, radiusy, bordertype._lefttop, bordertype._righttop, bordertype._leftbottom, bordertype._rightbottom);
				}
				else {
					nexacro.__setElementHandleBordertype(_handle, "", 0, 0, 0, 0, 0, 0);
				}
			}

			var inner_width = this.width;
			var inner_height = this.height;

			if (border && !border._is_real_empty()) {
				if (_handle) {
					if (border._linecnt == 1) {
						var top_width = border.top_style ? border._top_width : 0;
						top_width = top_width < 0 ? 0 : top_width;
						nexacro.__setElementHandleBorder(_handle, border.top_style, top_width, border._top_syscolor);
					}
					else {
						var left_width, top_width, right_width, bottom_width;
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

						top_width = top_width < 0 ? 0 : top_width;
						bottom_width = bottom_width < 0 ? 0 : bottom_width;
						left_width = left_width < 0 ? 0 : left_width;
						right_width = right_width < 0 ? 0 : right_width;

						nexacro.__setElementHandleBorderTop(_handle, border.top_style, top_width, border._top_syscolor);
						nexacro.__setElementHandleBorderBottom(_handle, border.bottom_style, bottom_width, border._bottom_syscolor);
						nexacro.__setElementHandleBorderLeft(_handle, border.left_style, left_width, border._left_syscolor);
						nexacro.__setElementHandleBorderRight(_handle, border.right_style, right_width, border._right_syscolor);
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
			else {
				nexacro.__setElementHandleBorder(_handle, "none", 0, 0);
			}

			if (this._inner_width != inner_width || this._inner_height != inner_height) {
				this._inner_width = inner_width;
				this._inner_height = inner_height;
			}

			if (this._is_window_element) {
				var _win_handle = this.getRootWindowHandle();
				nexacro._setWindowHandleBorder(_win_handle, border, bordertype);
			}
		};

		_pControlElementBase._on_notify_imgsize = function (img_url, img_width, img_height) {
			if (!(img_width && img_height)) {
				return;
			}
			if (img_url != this._img_url) {
				return;
			}

			this._img_sizereq = false;
			var _handle = this._handle;
			if (_handle) {
				this._setControlBackground(_handle, this.background, this.gradation);
			}
		};

		_pControlElementBase._setControlBackground = function (_handle, background, gradation) {
			if (background) {
				if (background.color == "@gradation" && gradation) {
					nexacro.__setElementHandleBackgroundColor(_handle, 0);
					nexacro.__setElementHandleBackgroundGradation(_handle, gradation.style, gradation._start_x, gradation._start_y, gradation._start_syscolor, gradation._end_x, gradation._end_y, gradation._end_syscolor, gradation._sysvalue);
				}
				else {
					nexacro.__setElementHandleBackgroundColor(_handle, background._syscolor);
					nexacro.__setElementHandleBackgroundGradation(_handle, "", 0, 0, 0, 0, 0, 0, 0, "");
				}

				var bkimgurl = background.image;
				if (bkimgurl && !this._img_sizereq) {
					if (bkimgurl && bkimgurl.substring(0, 4).toLowerCase() == "url(") {
						bkimgurl = bkimgurl.substring(5, bkimgurl.length - 2);
					}
					if (bkimgurl && !nexacro._isAbsolutePath(bkimgurl)) {
						var base_url = this._getElementBaseUrl();
						bkimgurl = nexacro._getImageLocation(bkimgurl, base_url);
					}

					var bkrepeat = background.repeat;
					var pos_x = background.position_x;
					var pos_y = background.position_y;
					var edge_x = background.imageedge_x;
					var edge_y = background.imageedge_y;
					nexacro.__setElementHandleBackgroundImage(_handle, bkimgurl, bkrepeat, pos_x, pos_y, edge_x, edge_y);
				}
				else {
					nexacro.__setElementHandleBackgroundImage(_handle, "", false, 0, 0, 0, 0);
				}
			}
		};

		_pControlElementBase._isVML = function () {
			return false;
		};

		_pControlElementBase._setDOMQuadImage = nexacro._emptyFn;
		_pControlElementBase._setDOMEdgeImage = nexacro._emptyFn;

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
					nexacro.__setElementHandleAccessibilityRole(handle, role);
				}

				if (desclevel != this.accessibility_desclevel) {
					this.accessibility_desclevel = desclevel;
					var nLevel = {
						"none" : 0, 
						"self" : 1, 
						"child" : 2, 
						"all" : 3
					};
					nexacro.__setElementHandleAccessibilityDescLevel(handle, nLevel[desclevel]);
				}

				if (enable == true && (desclevel != "none" && desclevel != "child")) {
					if (label != this.accessibility_label) {
						this.accessibility_label = label;
					}
					if (description != this.accessibility_description) {
						this.accessibility_description = description;
						nexacro.__setElementHandleAccessibilityDescription(handle, description);
					}
					if (action != this.accessibility_action) {
						this.accessibility_action = action;
					}
					var readlabel = this._makeAccessibilityLabelbyReadtype();
					if (readlabel != this.accessibility_readlabel) {
						this.accessibility_readlabel = readlabel;
						nexacro.__setElementHandleAccessibilityLabel(handle, readlabel);
					}
				}
				else {
					this.accessibility_label = label;
					this.accessibility_description = description;
					nexacro.__setElementHandleAccessibilityEnable(handle, enable);
				}
				this.accessibility_enable = enable;
			}
			else {
				this.accessibility_role = role;
				this.accessibility_desclevel = desclevel;
				this.accessibility_label = label;
				this.accessibility_action = action;
				this.accessibility_description = description;
				this.accessibility_enable = enable;
			}
		};

		_pControlElementBase.notifyAccessibility = function (label, notifyevent) {
			var handle = this._handle;
			if (handle) {
				var readlabel = this._makeAccessibilityLabelbyReadtype(this);
				this.accessibility_readlabel = readlabel;
				nexacro.__notifyAccessibility(handle, label ? label : this.accessibility_readlabel, notifyevent ? notifyevent : "notify");
			}
		};

		_pControlElementBase._makeAccessibilityLabelbyReadtype = function () {
			var label = "";
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
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
				this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
				nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);
				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);

				if (this.border || this.bordertype) {
					this._setControlBorder(_handle, this.border, this.bordertype);
				}
				if (this.background) {
					this._setControlBackground(_handle, this.background, this.gradation);
				}

				if (this.opacity) {
					nexacro.__setElementHandleOpacity(_handle, this.opacity);
				}

				if (this._hittest_type) {
					nexacro.__setElementHittestValue(_handle, this._hittest_type);
				}

				if (this.mirror) {
					nexacro.__setElementHandleMirror(_handle, this.mirror);
				}

				this._refreshForeground(_handle);
			}
		};
		_pSimpleControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;
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

		_pSimpleControlElement.setElementPadding = function (padding) {
		};
		_pSimpleControlElement.setElementPaddingXY = function (left, top, right, bottom) {
		};

		_pSimpleControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this) {
					if (child_elem._handle) {
						var old_win_handle = child_elem.getRootWindowHandle();
						var new_win_handle = this.getRootWindowHandle();
						if (old_win_handle != new_win_handle) {
							child_elem._parent_elem = this;
							child_elem._destroyElementHandle();
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
					var _win_handle = _owner_elem.getRootWindowHandle();
					var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);
					this._handle = _handle;
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}

					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}

					if (this.rtldirection) {
						nexacro.__setElementHandleRtlDirection(_handle, this.rtldirection);
					}

					this._refreshForeground(_handle);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}

				if (_handle) {
					nexacro.__setElementHandleMirror(_handle, this.mirror);
				}
			}
		};
		_pControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.AccessibilityUtil.unsupportMobileApplicationAccessibility(this);
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;

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

		_pControlElement.getZoom = function () {
			if (this._zoomFactor) {
				return this._zoomFactor;
			}
			return 100;
		};

		_pControlElement.setZoom = function (zoomFactor) {
			var _handle = this._handle;
			if (_handle) {
				if (zoomFactor < 0) {
					zoomFactor = 0;
				}
				this._zoomFactor = zoomFactor;
				nexacro.__setElementHandleScale(_handle, zoomFactor);
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
						var old_win_handle = child_elem.getRootWindowHandle();
						var new_win_handle = this._client_element.getRootWindowHandle();
						if (old_win_handle != new_win_handle) {
							child_elem._parent_elem = this;
							child_elem._destroyElementHandle();
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

		_pControlElementBase.saveToImage = function (fileName, fileType, compressOption) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__saveToImageFile(_handle, fileName, fileType, compressOption);
			}
		};
		_pControlElementBase.saveToImageFile = function (fileName, fileType, compressOption) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__saveToImageFile(_handle, fileName, fileType, compressOption);
			}
		};
		_pControlElementBase.saveToImageObject = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__saveToImageObject(_handle);
			}
		};

		nexacro.FrameControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;

			this._border_elems = new nexacro.Collection();
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

		_pFrameControlElement._resizable = false;

		_pFrameControlElement._win_handle = null;

		_pFrameControlElement.create = function () {
			if (!this._handle) {
				if (this._parent_elem == null) {
					var _win = this.linkedcontrol._getWindow();
					var _win_handle = this._win_handle = _win._handle;
					this._owner_elem = _win;
					this._is_window_element = true;
					this.left = 0;
					this.top = 0;
					this.width = _win.clientWidth;
					this.height = _win.clientHeight;

					var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					this.linkedcontrol._unique_id = this.linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);

					this._handle = _handle;
					nexacro.__appendElementHandle(this._owner_elem._handle, _handle);

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}

					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}

					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);

					this._client_element.create();
				}
				else {
					var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement();
					if (_owner_elem && _owner_elem._handle && !this._handle) {
						this._owner_elem = _owner_elem;
						var _win_handle = _owner_elem.getRootWindowHandle();
						var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
						this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
						nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);

						this._handle = _handle;
						nexacro.__appendElementHandle(_owner_elem._handle, _handle);

						if (this.border || this.bordertype) {
							this._setControlBorder(_handle, this.border, this.bordertype);
						}
						if (this.background) {
							this._setControlBackground(_handle, this.background, this.gradation);
						}

						if (this.opacity) {
							nexacro.__setElementHandleOpacity(_handle, this.opacity);
						}

						if (this._hittest_type) {
							nexacro.__setElementHittestValue(_handle, this._hittest_type);
						}
						this._refreshForeground(_handle);

						if (this._client_element) {
							this._client_element.create();
						}
					}
				}

				if (this._resizable) {
					this._createBorderElements();
					this._updateBorderElementsPosition();
				}
			}
			else {
			}
		};

		_pFrameControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._win_handle = null;
				this._handle = null;

				this._destroyBorderElements();

				if (this._client_element) {
					this._client_element.destroy();
				}
				this._client_element = null;
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



		_pFrameControlElement.getContainerElement = function () {
			return this._client_element;
		};

		_pFrameControlElement.getRootWindowHandle = function () {
			if (this._is_window_element) {
				return this._win_handle;
			}
			else if (this._owner_elem) {
				return this._owner_elem.getRootWindowHandle();
			}
			else if (this._parent && this._parent.getRootWindowHandle) {
				return this._parent.getRootWindowHandle();
			}
			return null;
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
				else if (this._is_verticalmin && (this.client_left != client_left || this._title_top != client_top || this._title_width != client_width)) {
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
						if (child_elem._doc != this._doc) {
							child_elem._parent_elem = this._client_element;
							child_elem._destroyDOMHandle();
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
			if (cur_elem && cur_elem._owner_elem && 
				cur_elem._owner_elem._owner_elem == this && cur_elem._handle) {
				nexacro.__setElementHandleBringToFront(cur_elem._handle);
				if (cur_elem._border_elems) {
					for (var i = 0; i < cur_elem._border_elems.length; i++) {
						nexacro.__setElementHandleBringToFront(cur_elem._border_elems[i]._handle);
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

		_pFrameControlElement._createBorderElements = function () {
			var parent_elem = this._parent_elem;
			if (this._border_elems.length > 0) {
				return;
			}

			var name_table = Array("lt", "t", "rt", "l", "r", "lb", "b", "rb");
			for (var i = 0; i < 8; i++) {
				var border_elem = new nexacro.FrameResizeBorderElement(parent_elem);
				this._border_elems.add_item(name_table[i], border_elem);
			}

			for (var i = 0; i < 8; i++) {
				var border_elem = this._border_elems[i];
				border_elem.linkedcontrol = this.linkedcontrol;
				border_elem.create();
			}

			this._setResizable(this._resizable);
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

			if (this._is_window_element) {
				var border = this.border;
				var bordertype = this.bordertype;
				var win = this.linkedcontrol._getWindow();
				var win_handle = win._handle;

				nexacro.__updateWindowHandleRegion(win_handle, border ? border._getBorderLeftWidth() : 0, border ? border._getBorderTopWidth() : 0, border ? border._getBorderRightWidth() : 0, border ? border._getBorderBottomWidth() : 0, bordertype ? bordertype.type : "normal", bordertype ? bordertype.radiusx : 0, bordertype ? bordertype.radiusy : 0, bordertype ? bordertype.lefttop : true, bordertype ? bordertype.righttop : true, bordertype ? bordertype.leftbottom : true, bordertype ? bordertype.rightbottom : true, w, h);
			}
		};

		_pFrameControlElement._updateBorderElementsPosition = function () {
			if (this._border_elems.length == 0) {
				return;
			}

			var border = this.border;
			var lw, tw, rw, bw;
			if (border) {
				if (border._linecnt == 1) {
					lw = tw = rw = bw = border._getBorderLeftWidth();
				}
				else {
					lw = border._getBorderLeftWidth();
					tw = border._getBorderTopWidth();
					rw = border._getBorderRightWidth();
					bw = border._getBorderBottomWidth();
				}
			}
			else {
				lw = tw = rw = bw = 0;
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

				var is_apply;
				if (nexacro.System.navigatorname == "nexacro") {
					is_apply = (this._is_window_element && resizable);
				}
				else {
					is_apply = (this._is_window_element && resizable);
					if (this._getWindowHandle() == nexacro._getMainWindowHandle()) {
						is_apply = false;
					}
				}

				var cursor_table = Array("nw", "n", "ne", "w", "e", "sw", "s", "se");
				var hittest_table = Array("topleft", "top", "topright", "left", "right", "bottomleft", "bottom", "bottomright");
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

					if (is_apply) {
						border_elem.setElementHittestType("resizingborder_" + hittest_table[i]);
					}
					else {
						border_elem.setElementHittestType("fixedborder");
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

		_pFrameResizeBorderElement._win_handle = null;

		_pFrameResizeBorderElement.create = function () {
			var _owner_elem;
			var _win_handle;
			if (this._parent_elem == null) {
				var _win = this.linkedcontrol._getWindow();
				_owner_elem = _win;
				_win_handle = this._win_handle = _win._handle;
				this.left = 0;
				this.top = 0;
				this.width = 0;
				this.height = 0;
			}
			else {
				_owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement();
				_win_handle = _owner_elem.getRootWindowHandle();
			}

			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
				_handle._linked_element = this;

				var handle_style = _handle.style;

				this._handle = this._dest_handle = _handle;
				nexacro.__appendElementHandle(this._owner_elem._handle, _handle);

				if (this.border || this.bordertype) {
					this._setControlBorder(_handle, this.border, this.bordertype);
				}
				if (this.background) {
					this._setControlBackground(_handle, this.background, this.gradation);
				}
				if (this.opacity) {
					nexacro.__setElementHandleOpacity(_handle, this.opacity);
				}
				if (this._hittest_type) {
					nexacro.__setElementHittestValue(_handle, this._hittest_type);
				}

				this._refreshForeground(_handle);

				if (this._client_element) {
					this._client_element.create();
				}
			}
		};

		_pFrameResizeBorderElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._win_handle = null;
				this._handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pFrameResizeBorderElement.getRootWindowHandle = function () {
			if (this._is_window_element) {
				return this._win_handle;
			}
			else if (this._owner_elem) {
				return this._owner_elem.getRootWindowHandle();
			}
			return null;
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
		};

		var _pModalOverlayElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.ModalOverlayElement);
		nexacro.ModalOverlayElement.prototype = _pModalOverlayElement;
		_pModalOverlayElement._type_name = "ModalOverlayElement";

		_pModalOverlayElement.create = function (zindex, color, ref_dest_handle) {
			if (this._parent_elem && !this._handle) {
				var _win = this.linkedcontrol._getWindow();
				this._win_handle = _win._handle;

				this.left = 0;
				this.top = 0;
				this.width = _win.clientWidth;
				this.height = _win.clientHeight;

				var _handle = this._handle = this._dest_handle = nexacro.__createControlElementHandle(this, this._win_handle, this.left, this.top, this.width, this.height);
				_handle._linked_element = this;

				var handle_style = _handle.style;
				nexacro.__setElementHandleZindex(_handle, zindex);
				this.setElementColor(color);

				var _win = this.linkedcontrol._getWindow();
				var _owner_elem = _win;

				if (ref_dest_handle) {
					nexacro.__insertElementHandle(_owner_elem._handle, _handle, ref_dest_handle);
				}
				else {
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);
				}

				this._refreshForeground(_handle);
			}
		};

		_pModalOverlayElement.destroy = function () {
			if (!this._handle) {
				return;
			}

			var _win = this.linkedcontrol._getWindow();
			var _owner_elem = _win;

			nexacro.__destroyElementHandle(_owner_elem._handle, this._handle);
			this._handle = null;
		};

		_pModalOverlayElement.setElementColor = function (color) {
			nexacro.__setElementHandleBackgroundColor(this._handle, color ? color._syscolor : 0);
		};

		_pModalOverlayElement.getContainerElement = function () {
			return this;
		};

		_pModalOverlayElement.getRootWindowHandle = function () {
			return this._win_handle;
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

		_pScrollableControlElement._init_left = 0;
		_pScrollableControlElement._init_top = 0;
		_pScrollableControlElement._init_width = 0;
		_pScrollableControlElement._init_height = 0;

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
					var _win_handle = _owner_elem.getRootWindowHandle();
					var _handle = nexacro.__createScrollableControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);
					this._handle = _handle;
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);

					if (this._init_width > 0 || this._init_height > 0) {
						nexacro.__setElementHandleInitPosSize(_handle, this._init_left, this._init_top, this._init_width, this._init_height);
					}

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}
					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);
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
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;

				this._client_element.destroy();

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
				var client = this.getContainerElement();
				nexacro.__setElementHandleScale(client._handle, this._zoomFactor);
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

		_pScrollableControlElement._updateClientSize = function () {
			var client_left = this._inner_left;
			var client_top = this._inner_top;
			var client_width = this._inner_width;
			var client_height = this._inner_height;

			var padding = this.padding;
			if (padding) {
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
			var scroll_showtype = this._scroll_showtype;
			var hscroll_hidden = false;

			var zclient_width = client_width / zoomFactor;
			var zclient_height = client_height / zoomFactor;

			var container_maxwidth = this.container_maxwidth;
			var container_maxheight = this.container_maxheight;

			var vscroll_control = this._vscroll_control;
			var hscroll_control = this._hscroll_control;
			var vscroll_width = this._vscroll_width;

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
					if (vscroll_control && container_maxheight > zclient_height) {
						vscroll_visible = true;
						client_width -= vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = container_maxheight - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (hscroll_control && container_maxwidth > zclient_width) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						if (vscroll_control && container_maxheight > zclient_height) {
							if (!vscroll_visible) {
								vscroll_visible = true;
								client_width -= vscroll_width;
								zclient_width = client_width / zoomFactor;
							}
							vscroll_limit = container_maxheight - zclient_height;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}
				else if (scroll_showtype == 2) {
					if (vscroll_control) {
						vscroll_visible = true;
						client_width -= vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = this.container_maxheight + this._hscroll_height - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (hscroll_control) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}
				else if (scroll_showtype == 31) {
					if (vscroll_control) {
						vscroll_visible = true;
						client_width -= vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = this.container_maxheight - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (hscroll_control && container_maxwidth > zclient_width) {
						if (!hscroll_hidden) {
							hscroll_visible = true;
							client_height -= this._hscroll_height;
							zclient_height = client_height / zoomFactor;
						}
						if (vscroll_control && this.container_maxheight > zclient_height) {
							if (!vscroll_visible) {
								vscroll_visible = true;
								client_width -= vscroll_width;
								zclient_width = client_width / zoomFactor;
							}
							vscroll_limit = this.container_maxheight - zclient_height;
						}
						hscroll_limit = container_maxwidth - zclient_width;
					}
				}
				else if (scroll_showtype == 32) {
					if (vscroll_control && this.container_maxheight > zclient_height) {
						vscroll_visible = true;
						client_width -= vscroll_width;
						zclient_width = client_width / zoomFactor;
						vscroll_limit = this.container_maxheight + this._hscroll_height - zclient_height;
					}
					if (step_count > 0 && step_containers) {
						container_maxwidth = step_count * zclient_width;
					}
					if (hscroll_control) {
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
					client_element.setElementSize(client_width, client_height);

					if (step_count > 0 && step_containers) {
						for (var i = 0; i < step_count; i++) {
							var step_client_element = step_containers[i];
							step_client_element.setElementPosition(zclient_width * i, 0);
							step_client_element.setElementSize(client_width, client_height);
						}

						var step_scroll_left = client_width * step_index;
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

				if (vscroll_control) {
					if (vscroll_control.parent.enable != vscroll_control.enable) {
						reset_vscroll_enable = true;
					}

					if (vscroll_visible) {
						if (!this._vscroll_visible) {
							this._vscroll_visible = true;
							vscroll_control.set_visible(true);
						}

						if (this._vscroll_left != (client_left + client_width) || this._vscroll_top != client_top || this._vscroll_height != client_height || reset_vlimit) {
							this._vscroll_left = (client_left + client_width);
							this._vscroll_top = client_top;
							this._vscroll_height = client_height;
							vscroll_control._setScrollInfo(this._vscroll_left, client_top, vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, client_height, client_height, true, this.scroll_top);
						}
						else if (reset_vscroll) {
							vscroll_control._setScrollPos(this.scroll_top);
						}

						if (reset_vscroll_enable) {
							vscroll_control._setEnable(vscroll_control.parent.enable);
						}
					}
					else {
						if (this._vscroll_left != (client_left + client_width) || this._vscroll_top != client_top || this._vscroll_height != client_height || reset_vlimit) {
							this._vscroll_left = (client_left + client_width);
							this._vscroll_top = client_top;
							this._vscroll_height = client_height;

							vscroll_control._setScrollInfo(this._vscroll_left - this._vscroll_width, client_top, this._vscroll_width, this._vscroll_height, 0, this.vscroll_limit, 30, zclient_height, zclient_height, false, this.scroll_top);
						}
						else if (reset_vscroll) {
							vscroll_control._setScrollPos(this.scroll_top);
						}

						if (reset_vscroll_enable) {
							vscroll_control._setEnable(vscroll_control.parent.enable);
						}

						if (this._vscroll_visible) {
							this._vscroll_visible = false;
							vscroll_control.set_visible(false);
						}
					}
				}
				if (hscroll_control) {
					if (hscroll_control.parent.enable != hscroll_control.enable) {
						reset_hscroll_enable = true;
					}

					if (hscroll_visible) {
						if (!this._hscroll_visible) {
							this._hscroll_visible = true;
							hscroll_control.set_visible(true);
						}

						if (this._hscroll_left != client_left || this._hscroll_top != (client_top + client_height) || this._hscroll_width != client_width || reset_hlimit) {
							this._hscroll_left = client_left;
							this._hscroll_top = (client_top + client_height);
							this._hscroll_width = client_width;
							hscroll_control._setScrollInfo(client_left, this._hscroll_top, this._hscroll_width, this._hscroll_height, 0, this.hscroll_limit, 30, zclient_width, zclient_width, true, this.scroll_left);
						}
						else if (reset_hscroll) {
							hscroll_control._setScrollPos(this.scroll_left);
						}

						if (reset_hscroll_enable) {
							hscroll_control._setEnable(hscroll_control.parent.enable);
						}
					}
					else {
						if (this._hscroll_left != client_left || this._hscroll_top != (client_top + client_height) || this._hscroll_width != client_width || reset_hlimit) {
							this._hscroll_left = client_left;
							this._hscroll_top = (client_top + client_height);
							this._hscroll_width = client_width;

							hscroll_control._setScrollInfo(client_left, this._hscroll_top - this._hscroll_height, this._hscroll_width, this._hscroll_height, 0, this.hscroll_limit, 30, zclient_width, zclient_width, false, this.scroll_left);
						}
						else if (reset_hscroll) {
							hscroll_control._setScrollPos(this.scroll_left);
						}

						if (reset_hscroll_enable) {
							hscroll_control._setEnable(hscroll_control.parent.enable);
						}

						if (this._hscroll_visible) {
							this._hscroll_visible = false;
							hscroll_control.set_visible(false);
						}
					}
				}
			}
			else {
				if (step_count > 0 && step_containers) {
					container_maxwidth = step_count * this.client_width * zoomFactor / 100;

					var hscroll_limit = 0;
					if (container_maxwidth > client_width) {
						hscroll_limit = container_maxwidth - client_width;
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
					client_element.setElementSize(client_width, client_height);

					if (step_count > 0 && step_containers && step_count > step_index) {
						for (var i = 0; i < step_count; i++) {
							var step_client_element = step_containers[i];
							step_client_element.setElementPosition(zclient_width * i, 0);
							step_client_element.setElementSize(client_width, client_height);
						}
					}
				}
			}
		};


		_pScrollableControlElement.appendChildElement = function (child_elem) {
			if (this._handle) {
				if (child_elem._parent_elem != this) {
					if (child_elem._handle) {
						var old_win_handle = child_elem.getRootWindowHandle();
						var new_win_handle = this._client_element.getRootWindowHandle();
						if (old_win_handle != new_win_handle) {
							child_elem._parent_elem = this;
							child_elem._destroyElementHandle();
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

			if (this.scroll_left != hpos) {
				this.scroll_left = hpos;
				if (this._client_element) {
					this._client_element.setElementHScrollPos(hpos);
				}
				if (this._hscroll_control) {
					this._hscroll_control._setScrollPos(this.scroll_left);
				}
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
					this._refreshForeground(this._handle);
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
			if (this.scroll_top != vpos) {
				this.scroll_top = vpos;
				if (this._client_element) {
					this._client_element.setElementVScrollPos(vpos);
				}
				if (this._vscroll_control) {
					this._vscroll_control._setScrollPos(this.scroll_top);
				}
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
					this._refreshForeground(this._handle);
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
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
					this._refreshForeground(this._handle);
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

				var client_element = this._client_element;
				if (client_element && client_element._handle) {
					nexacro.__setElementHandleMaxSize(client_element._handle, width, height);
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

		_pScrollableControlElement.setElementInitPosSize = function (init_left, init_top, init_width, init_height) {
			this._init_left = init_left;
			this._init_top = init_top;
			this._init_width = init_width;
			this._init_height = init_height;

			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleInitPosSize(_handle, left, top, init_width, init_height);
			}
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
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createContainerElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}
				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pContainerElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pContainerElement.clearContents = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle) {
				_handle._linked_element = null;
				if (_owner_elem && _owner_elem._handle) {
					nexacro.__destroyElementHandle(_owner_elem._handle, _handle);
				}
				this._owner_elem = null;
				this._handle = null;
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

		_pContainerElement.setElementFont = function (font) {
			this.font = font;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
			}
		};
		_pContainerElement.setElementColor = function (color) {
			this.color = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleColor(_handle, color._syscolor);
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

		_pScrollableContainerElement.create = function () {
			var _owner_elem = this._parent_elem;
			if (_owner_elem && _owner_elem._handle && !this._handle) {
				this._owner_elem = _owner_elem;
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createScrollableContainerElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}
				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}

				if (this._scroll_left != 0 || this._scroll_top != 0) {
					nexacro.__setElementHandleOffset(_handle, this._scroll_left, this._scroll_top);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pScrollableContainerElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				_handle._linked_element = null;
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};

		_pScrollableContainerElement.clearContents = function () {
			var _handle = this._handle;
			var _owner_elem = this._owner_elem;
			if (_handle) {
				_handle._linked_element = null;
				if (_owner_elem && _owner_elem._handle) {
					nexacro.__destroyElementHandle(_owner_elem._handle, _handle);
				}
				this._owner_elem = null;
				this._handle = null;
			}
		};

		_pScrollableContainerElement.setElementVScrollPos = function (vpos) {
			if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_top = vpos;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleVScrollPos(_handle, vpos);
				}
			}
		};

		_pScrollableContainerElement.setElementHScrollPos = function (hpos) {
			if (this._scroll_left != hpos || this.parent._reset_scrollpos) {
				this._scroll_left = hpos;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleHScrollPos(_handle, hpos);
				}
			}
		};

		_pScrollableContainerElement.setElementScrollPos = function (hpos, vpos) {
			if (this._scroll_left != hpos || this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_left = hpos;
				this._scroll_top = vpos;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleOffset(_handle, hpos, vpos);
				}
			}
		};

		_pScrollableContainerElement.getZoom = function () {
			return this._zoomFactor;
		};

		_pScrollableContainerElement.setZoom = function (zoomFactor) {
			if (this._handle) {
				this._zoomFactor = zoomFactor;
				nexacro.__setElementHandleScale(this._handle, zoomFactor);
			}
		};

		delete _pScrollableContainerElement;

		nexacro.PopupControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			var client_element = new nexacro.ContainerElement(this);
			this._client_element = client_element;
		};

		var _pPopupControlElement = nexacro._createPrototype(nexacro.ControlElement, nexacro.PopupControlElement);
		nexacro.PopupControlElement.prototype = _pPopupControlElement;

		_pPopupControlElement._type_name = "PopupControlElement";

		_pPopupControlElement._win_handle = null;


		_pPopupControlElement.create = function (_window) {
			if (this._parent_elem == null) {
				if (!this._handle) {
					var linkedcontrol = this.linkedcontrol;

					var _win = linkedcontrol._getWindow();
					var _win_handle = this._win_handle = _win._handle;
					var _owner_elem = _win;

					var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					linkedcontrol._unique_id = linkedcontrol.parent._unique_id + '_' + linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, linkedcontrol._unique_id);

					this._handle = _handle;

					if (linkedcontrol._findOwnerElementHandle) {
						var owner_elem_info = linkedcontrol._findOwnerElementHandle();
						if (owner_elem_info.is_append) {
							nexacro.__appendElementHandle(owner_elem_info.owner_handle, _handle);
						}
						else {
							nexacro.__insertElementHandle(owner_elem_info.owner_handle, _handle, owner_elem_info.ref_handle);
						}
					}
					else {
						nexacro.__appendElementHandle(_win_handle, _handle);
					}

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}
					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};
		_pPopupControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._win_handle = null;
				this._handle = null;

				this._client_element.destroy();
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pPopupControlElement.getRootWindowHandle = function () {
			return this._win_handle;
		};

		delete _pPopupControlElement;

		nexacro.PopupScrollableControlElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;

			var client_element = new nexacro.ScrollableContainerElement(this);
			this._client_element = client_element;
		};
		var _pPopupScrollableControlElement = nexacro._createPrototype(nexacro.ScrollableControlElement, nexacro.PopupScrollableControlElement);
		nexacro.PopupScrollableControlElement.prototype = _pPopupScrollableControlElement;
		_pPopupScrollableControlElement._type_name = "PopupScrollableControlElement";

		_pPopupScrollableControlElement._win_handle = null;


		_pPopupScrollableControlElement.create = function (_window) {
			if (this._parent_elem == null) {
				if (!this._handle) {
					var linkedcontrol = this.linkedcontrol;
					var _win = linkedcontrol._getWindow();
					var _win_handle = this._win_handle = _win._handle;
					var _owner_elem = _win;

					var _handle = nexacro.__createScrollableControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					linkedcontrol._unique_id = linkedcontrol.parent._unique_id + '_' + linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, linkedcontrol._unique_id);
					this._handle = _handle;

					if (linkedcontrol._findOwnerElementHandle) {
						var owner_elem_info = linkedcontrol._findOwnerElementHandle();
						if (owner_elem_info.is_append) {
							nexacro.__appendElementHandle(owner_elem_info.owner_handle, _handle);
						}
						else {
							nexacro.__insertElementHandle(owner_elem_info.owner_handle, _handle, owner_elem_info.ref_handle);
						}
					}
					else {
						nexacro.__appendElementHandle(_win_handle, _handle);
					}

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}
					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};

		_pPopupScrollableControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._win_handle = null;
				this._handle = null;

				this._client_element.destroy();

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

		_pPopupScrollableControlElement.getRootWindowHandle = function () {
			return this._win_handle;
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
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createTextElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}

				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}

				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}

				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}

				if (this.align) {
					var align = this.align;
					nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
				}
				else if (this.halign && this.valign) {
					nexacro.__setElementHandleAlign(_handle, this.halign, this.valign);
				}

				if (this.padding) {
					var padding = this.padding;
					nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
				}
				else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
					nexacro.__setElementHandlePadding(_handle, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
				}

				if (this.decoration) {
					nexacro.__setElementHandleDecorateText(_handle, this.decoration);
				}

				if (this.linespace > 0) {
					nexacro.__setElementHandleLineSpace(_handle, this.linespace);
				}

				if (this.wordwrap != "none") {
					nexacro.__setElementHandleWordWrap(_handle, this.wordwrap);
				}

				if (this.text) {
					nexacro.__setElementHandleText(_handle, this.text, this._use_newline, this.wordwrap);
				}

				var size = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), this.text, this.font, this._use_newline);
				nexacro.__setElementHandleSize(_handle, size[0], size[1]);

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		_pTextElement.setElementFont = function (font) {
			this.font = font;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				var size = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), this.text, this.font, this._use_newline);
				nexacro.__setElementHandleSize(_handle, size[0], size[1]);
			}
		};

		_pTextElement.setElementColor = function (color) {
			this.color = color;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleColor(_handle, color._syscolor);
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
				nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
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
				nexacro.__setElementHandlePadding(_handle, left, top, right, bottom);
			}
		};

		_pTextElement.setElementAlign = function (align) {
			this.align = align;
			this.halign = align._halign;
			this.valign = align._valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, align._halign, align._valign);
			}
		};

		_pTextElement.setElementAlignXY = function (halign, valign) {
			var _halign = halign;

			if (this._isRtl()) {
				_halign = this.halign == "left" ? "right" : (this.halign == "right" ? "left" : this.halign);
			}

			this.align = null;
			this.halign = halign;
			this.valign = valign;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleAlign(_handle, _halign, valign);
			}
		};

		_pTextElement.setElementText = function (text) {
			if (this.text != text) {
				if (text == null) {
					this.text = "";
				}
				else {
					this.text = text.replace(/\r\n|\r|\n/g, "\r\n");
				}

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleText(_handle, this.text, this._use_newline, this.wordwrap);

					var size = nexacro._getTextSize(this.letterspace || this._getParentLetterSpace(), this.text, this.font, this._use_newline);
					nexacro.__setElementHandleSize(_handle, size[0], size[1]);
				}
			}
		};

		_pTextElement.setElementLetterSpace = function (letterspace) {
			if (this.letterspace != letterspace) {
				this.letterspace = letterspace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLetterSpace(_handle, letterspace);
				}
			}
		};

		_pTextElement.setElementLineSpace = function (linespace) {
			if (this.linespace != linespace) {
				this.linespace = linespace;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleLineSpace(_handle, linespace);
				}
			}
		};

		_pTextElement.setElementDecorateText = function (text) {
			if (this.decoration != text) {
				this.decoration = text;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleDecorateText(_handle, text);
				}
			}
		};

		_pTextElement.setElementUseNewLine = function (use_newline) {
			if (this._use_newline != use_newline) {
				this._use_newline = use_newline;

				var _cell_node = this._cell_node;
				if (_cell_node) {
					if (this.wordwrap != "none") {
						return;
					}
					this.__setElementHandleText(cell_node, this.text, this._use_newline, this.wordwrap);
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
				this.wordwrap = wordwrap;
				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandleWordWrap(_handle, this.wordwrap);
				}
			}
		};

		_pTextElement.setElementPosition = function (left, top) {
			if (this.left != left || this.top != top) {
				this.left = left;
				this.top = top;

				var _handle = this._handle;
				if (_handle) {
					nexacro.__setElementHandlePosition(_handle, left, top);
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

		_pPluginElement._plugin_object = null;

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
		_pPluginElement.pluginname = "";

		_pPluginElement.windowed = false;
		_pPluginElement.popupstyle = false;
		_pPluginElement.adjustalpha = false;
		_pPluginElement.usepersistdata = false;

		_pPluginElement.enable = true;
		_pPluginElement.font = null;
		_pPluginElement.color = null;
		_pPluginElement.cursor = null;
		_pPluginElement.align = null;
		_pPluginElement.padding = null;
		_pPluginElement.color = null;
		_pPluginElement.component = null;

		_pPluginElement._params = null;
		_pPluginElement._events = null;

		_pPluginElement.create = function () {
			if (!this._handle) {
				var _win_handle = null;
				var _owner_elem = null;
				var _linked_comp = null;
				if (this._parent_elem) {
					_owner_elem = this._parent_elem.getContainerElement(this.position_step);
					if (_owner_elem && _owner_elem._handle) {
						this._owner_elem = _owner_elem;
						_win_handle = _owner_elem.getRootWindowHandle();
					}
					_linked_comp = this._parent_elem.linkedcontrol;
				}

				var _handle = nexacro.__createPluginElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

				if (this.classid) {
					nexacro.__setPluginElementHandleClassId(_handle, this.classid);
				}
				if (this.adjustalpha) {
					nexacro.__setPluginElementHandleAdjustAlpha(_handle, this.adjustalpha);
				}

				if (this.pluginname) {
					nexacro.__setPluginElementHandlePluginName(_handle, this.pluginname);
				}

				if (this.mimetype) {
					nexacro.__setPluginElementHandleMIMEType(_handle, this.mimetype);
				}
				if (this.pluginsrc) {
					nexacro.__setPluginElementHandlePluginSrc(_handle, this.pluginsrc);
				}
				if (this.pluginpage) {
					nexacro.__setPluginElementHandlePluginPage(_handle, this.pluginpage);
				}
				if (this.code) {
					nexacro.__setPluginElementHandleCode(_handle, this.code);
				}

				if (this.codebase) {
					nexacro.__setPluginElementHandleCodebase(_handle, this.codebase);
				}

				var params = this._params;
				var param_cnt = (params ? params.length : 0);
				for (var i = 0; i < param_cnt; i++) {
					nexacro.__setPluginElementHandleAttribute(_handle, params.get_id(i), params.get_item(i));
				}

				if (this.mimetype && this.classid == "") {
					var events = this._events;
					var event_cnt = events.length;
					for (var i = 0; i < event_cnt; i++) {
						this.addEventHandler(events.get_id(i), events.get_item(i));
					}
				}

				if (this.license || this.lpkpath) {
					nexacro._setPluginElementHandleLicense(_handle, this.license, this.lpkpath);
				}

				if (!this.visible || (_linked_comp && _linked_comp.visible == false)) {
					nexacro.__setElementHandleVisible(_handle, false);
					if (this.visible) {
						this.visible = false;
					}
				}

				if (!this.enable || (_linked_comp && _linked_comp.enable == false)) {
					nexacro.__setElementHandleEnable(_handle, false);
					if (this.enable) {
						this.enable = false;
					}
				}

				if (this.windowed) {
					nexacro.__setPluginElementHandleWindowed(_handle, this.windowed);
					if (this.popupstyle) {
						nexacro.__setPluginElementHandlePopupstyle(_handle, this.popupstyle);
					}
				}

				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}
				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}

				if (this.align) {
					var align = this.align;
					nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
				}

				if (this.padding) {
					var padding = this.padding;
					nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
				}

				this._handle = _handle;
				if (_owner_elem && _owner_elem._handle) {
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);
				}
				nexacro.__createdPluginElementHandle(_handle);

				this._plugin_object = new nexacro.PluginObject;
				if (this._plugin_object) {
					this._plugin_object._handle = nexacro.__getPluginElementHandleObject(this._handle);
				}
			}
		};

		_pPluginElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, this._handle);
				}

				this._owner_elem = null;
				this._handle = null;
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

			var plugin_object = this._plugin_object;
			if (plugin_object) {
				plugin_object.destroy();
				this._plugin_object = null;
			}
		};

		_pPluginElement.initEvent = function () {
			if (this._handle) {
				nexacro._observeWrapperEvent(this._handle, null, "on_plugin_event", this.on_plugin_event, -1, null);
			}
		};

		_pPluginElement.on_plugin_event = function () {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				var length = arguments.length;
				if (length > 0) {
					var evt_id = arguments[0];
					if (comp[evt_id]) {
						var listener = comp[evt_id];
						if (listener) {
							var j;
							var params = [];
							for (var i = 1, j = 0; i < length; i++, j++) {
								params[j] = arguments[i];
							}
							if (listener._firePluginEvent) {
								listener._firePluginEvent.apply(listener, params);
							}
						}
					}
				}
			}
		};


		_pPluginElement.on_update_position = function () {
			if (this._handle) {
				nexacro.__updatePluginElementHandlePosition(this._handle);
			}
		};

		_pPluginElement.setElementFocus = function () {
			if (this._handle) {
				nexacro.__setElementHandleFocus(this._handle);
				nexacro.__setLastFocusedElement(this);
			}
		};

		_pPluginElement.setElementPluginPosition = function (left, top) {
			if (this._handle) {
				this.setElementPosition(left, top);
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

		_pPluginElement.setElementMIMEType = function (_type) {
			if (this.mimetype != _type) {
				this.mimetype = _type;
			}
		};

		_pPluginElement.setElementClassId = function (classid) {
			if (this.classid != classid) {
				this.classid = classid;
			}
		};

		_pPluginElement.setElementCodebase = function (codebase) {
			if (this.codebase != codebase) {
				this.codebase = codebase;

				if (this._handle) {
					nexacro.__setPluginElementHandleCodebase(this._handle, this.codebase);
				}
			}
		};

		_pPluginElement.setElementCode = function (code) {
			if (this.code != code) {
				this.code = code;
			}
		};

		_pPluginElement.setElementArchive = function (archive) {
			if (this.archive != archive) {
				this.archive = archive;
			}
		};

		_pPluginElement.setElementAdjustAlpha = function (adjustalpha) {
			if (this.adjustalpha != adjustalpha) {
				this.adjustalpha = adjustalpha;
			}
		};

		_pPluginElement.setElementUsePersistData = function (usepersistdata) {
			if (this.usepersistdata != usepersistdata) {
				this.usepersistdata = usepersistdata;
			}
		};

		_pPluginElement.getElementParam = function (name) {
			if (this._plugin_object) {
				return this._plugin_object.getProperty(name);
			}
			else {
				var params = this._params;
				return params.get_item(name);
			}
		};
		_pPluginElement.setElementParam = function (name, value) {
			if (this._plugin_object) {
				if (name && value) {
					this._plugin_object.setProperty(name, value);
				}
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
			}
		};

		_pPluginElement.setElementPluginPage = function (pluginpage) {
			if (this.pluginpage != pluginpage) {
				this.pluginpage = pluginpage;
			}
		};

		_pPluginElement.setElementWindowed = function (windowed) {
			if (this.windowed != windowed) {
				this.windowed = windowed;
				if (this._handle) {
				}
			}
		};

		_pPluginElement.setElementEnable = function (enable) {
			if (this.enable != enable) {
				this.enable = enable;
				if (this._handle) {
					nexacro.__setElementHandleEnable(this._handle, enable);
				}
			}
		};

		_pPluginElement.setElementPluginVisible = function (visible) {
			if (this._handle) {
				nexacro.__setElementHandleVisible(this._handle, visible);
			}
		};

		_pPluginElement.setElementPopupStyle = function (popupstyle) {
			if (this.popupstyle != popupstyle) {
				this.popupstyle = popupstyle;
			}
		};
		_pPluginElement.setElementpluginname = function (pluginname) {
			if (this.pluginname != pluginname) {
				this.pluginname = pluginname;
			}
		};

		_pPluginElement.callMethod = function () {
			if (arguments.length < 1) {
				return;
			}

			if (this._plugin_object) {
				return this._plugin_object.callMethod.apply(this._plugin_object, arguments);
			}
		};

		_pPluginElement.getPluginObject = function () {
			if (this._plugin_object) {
				return this._plugin_object;
			}
			return null;
		};

		_pPluginElement.install = function () {
			if (this._handle && this.codebase) {
				nexacro.__callPluginElementHandleInstall(this._handle);
			}
		};

		_pPluginElement.isInstalled = function () {
			if (this._handle) {
				return nexacro.__getPluginElementHandleIsInstalled(this._handle);
			}
			return false;
		};

		_pPluginElement.isLoaded = function () {
			if (this._handle) {
				return nexacro.__isPluginElementHandleLoaded(this._handle);
			}
			return false;
		};

		_pPluginElement.addEventHandler = function (name, callback) {
			if (this._handle && this.classid == "" && this.mimetype) {
				var nameFromToStringRegex = /^function\s?([^\s(]*)/;
				var paramsFromToStringRegex = /\(\)|\(.+\)/;
				var params = callback.toString().match(paramsFromToStringRegex)[0];
				var eventValue = name + params;
				var callfunc;

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
				callfunc = 'callback = function' + params + '\n{\n' + callfunc + "\n}";
				nexacro.__appendGlobalScript(name, eval(callfunc));
			}
			else {
				this._events.add_item(name, callback);
			}
		};

		_pPluginElement.removeEventHandler = function (name, callback) {
			if (this._handle && this.classid == "" && this.mimetype) {
				nexacro.__removeGlobalScript(name);
			}
			else {
				this._events.delete_item(name);
			}
		};

		_pPluginElement.updateWindow = function () {
			if (this.windowed == true) {
				nexacro.__updatePluginElementHandleWindow(this._handle);
			}
		};

		_pPluginElement.getProperty = _pPluginElement.getElementParam;
		_pPluginElement.setProperty = _pPluginElement.setElementParam;
		_pPluginElement.setElementPluginMIMEType = nexacro._emptyFn;
		_pPluginElement._setElementFocus = _pPluginElement.setElementFocus;

		delete _pPluginElement;









		nexacro.PluginObject = function () {
		};

		var _pPluginObject = nexacro._createPrototype(nexacro.Object, nexacro.PluginObject);
		nexacro.PluginObject.prototype = _pPluginObject;
		_pPluginObject._type_name = "PluginObject";
		_pPluginObject._handle = null;

		_pPluginObject.getProperty = function (name) {
			if (this._handle) {
				if (name) {
					var value = nexacro.__getPluginObjectHandleAttribute(this._handle, name);
					if (value != null && typeof (value) == "object") {
						var pobject = new nexacro.PluginObject;
						pobject._handle = value;
						return pobject;
					}
					return value;
				}
			}
		};

		_pPluginObject.setProperty = function (name, value) {
			if (this._handle) {
				if (name && value) {
					nexacro.__setPluginObjectHandleAttribute(this._handle, name, value);
				}
			}
		};

		_pPluginObject.callMethod = function () {
			if (arguments.length < 1) {
				return;
			}

			if (this._handle) {
				Array.prototype.unshift.call(arguments, this._handle);
				var value = nexacro.__callPluginObjectHandleMethod.apply(nexacro, arguments);
				if (value != null && typeof (value) == "object") {
					var pobject = new nexacro.PluginObject;
					pobject._handle = value;

					return pobject;
				}
				return value;
			}
		};


		_pPluginObject.callScriptMethod = function () {
			if (arguments.length < 1) {
				return;
			}

			if (this._handle) {
				Array.prototype.unshift.call(arguments, this._handle);
				var value = nexacro.__callPluginObjectHandleScriptMethod.apply(nexacro, arguments);
				if (value != null && typeof (value) == "object") {
					var pobject = new nexacro.PluginObject;
					pobject._handle = value;

					return pobject;
				}
				return value;
			}
		};


		_pPluginObject.destroy = function () {
			if (this._handle) {
				nexacro.__destroyPluginObjectHandle(this._handle);
				this._handle = null;
			}
		};

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

		_pWebBrowserPluginElement.windowed = true;
		_pWebBrowserPluginElement.classid = "{8856F961-340A-11D0-A96B-00C04FD705A2}";
		_pWebBrowserPluginElement.pluginname = "WebBrowser";
		_pWebBrowserPluginElement.src = "";

		_pWebBrowserPluginElement.initEvent = function () {
			if (this._handle) {
				nexacro._observeWrapperEvent(this._handle, null, "on_plugin_event", this.on_plugin_event);
			}
		};

		_pWebBrowserPluginElement.on_plugin_event = function (evt_id, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg8, arg9) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);
			if (comp) {
				if (evt_id == "DocumentComplete") {
					var locationURL = this.getElementParam("LocationURL");
					if (locationURL == arg1) {
						evt_id = "onloadcompleted";
						if (comp.on_load_handler) {
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
							nexacro.__restorePluginElementHandleWindowFocus(this._handle);
							return comp.on_load_handler(arg1);
						}
					}
				}
				else if (evt_id == "TitleChange") {
					comp.on_fire_onusernotify(comp, arg0);
				}

				if (comp[evt_id]) {
					var listener = comp[evt_id];
					if (listener) {
						return listener._fireEvent(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg8, arg9);
					}
				}
			}
		};

		_pWebBrowserPluginElement._getDoc = function () {
			return null;
		};

		_pWebBrowserPluginElement._setUrl = function (url) {
			if (this._plugin_object) {
				this._setSharedVariablesToCookie(url);
				this._plugin_object.callMethod("Navigate", url);
			}
		};

		_pWebBrowserPluginElement._setGo = function () {
			if (this._plugin_object) {
				this._plugin_object.callMethod("Refresh");
			}
		};

		_pWebBrowserPluginElement._setBack = function () {
			if (this._plugin_object) {
				this._plugin_object.callMethod("GoBack");
			}
		};


		_pWebBrowserPluginElement._setForward = function () {
			if (this._plugin_object) {
				this._plugin_object.callMethod("GoForward");
			}
		};

		_pWebBrowserPluginElement.getProperty = function (name) {
			if (this._plugin_object) {
				if (name == "window") {
					var doc = this._plugin_object.getProperty("document");
					if (doc) {
						return doc.getProperty("parentWindow");
					}
				}
				return this._plugin_object.getProperty(name);
			}
			else {
				var params = this._params;
				return params.get_item(name);
			}
		};

		_pWebBrowserPluginElement.callMethod = function () {
			if (arguments.length < 1) {
				return;
			}

			if (this._plugin_object) {
				return nexacro._pluginCallMethod(this, arguments);
			}
		};

		_pWebBrowserPluginElement._setSharedVariablesToCookie = function (url) {
			var cookievar = application._cookie_variables;
			var cookievarCnt = 0;
			if (cookievar) {
				cookievarCnt = cookievar.length;
			}

			var cookies = "";
			for (var i = 0; i < cookievarCnt; i++) {
				var cookieid = cookievar[i];
				var curCookie = nexacro._getCookie(cookieid);
				cookies += (cookieid + '=' + curCookie + ';');
			}

			if (cookievarCnt) {
				nexacro._setSharedVariablesToCookie(url, cookies);
			}
		};

		delete _pWebBrowserPluginElement;


		nexacro.MediaPlayerPluginElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._parent_elem.windowed = true;

			this._params = new nexacro.Collection();
			this._events = new nexacro.Collection();
		};

		var _pMediaPlayerPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro.MediaPlayerPluginElement);
		nexacro.MediaPlayerPluginElement.prototype = _pMediaPlayerPluginElement;
		_pMediaPlayerPluginElement._type_name = "MediaPlayerPluginElement";
		_pMediaPlayerPluginElement.classid = "{6bf52a52-394a-11d3-b153-00c04f79faa6}";

		_pMediaPlayerPluginElement.set_volume = function (v) {
		};

		_pMediaPlayerPluginElement._play = function () {
			var object = this.getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("play");
					controls.destroy();
				}
			}
		};

		_pMediaPlayerPluginElement._pause = function () {
			var object = this.getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("pause");
					controls.destroy();
				}
			}
		};

		_pMediaPlayerPluginElement._rewind = function () {
			var object = this.getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("fastReverse");
					controls.destroy();
				}
			}
		};

		_pMediaPlayerPluginElement._stop = function () {
			var object = this.getPluginObject();
			if (object) {
				var controls = object.getProperty("controls");
				if (controls) {
					controls.callMethod("stop");
					controls.destroy();
				}
			}
		};

		_pMediaPlayerPluginElement._togglemute = function () {
			var object = this.getPluginObject();
			if (object) {
				var settings = object.getPluginObject("settings");
				if (settings) {
					var mute = settings.getProperty("mute");
					if (mute == true) {
						settings.setProperty("mute", false);
					}
					else {
						settings.setProperty("mute", true);
					}
					settings.destroy();
				}
			}
		};

		_pMediaPlayerPluginElement._setMediaEnable = _pMediaPlayerPluginElement._setMediaControl = _pMediaPlayerPluginElement._setMediaUrl = _pMediaPlayerPluginElement._setMediaCurrentTime = _pMediaPlayerPluginElement._setMediaLoop = _pMediaPlayerPluginElement._setMediaAutoPlay = _pMediaPlayerPluginElement._setMediaVolume = nexacro.PluginElement.prototype.setElementParam;

		delete _pMediaPlayerPluginElement;

		nexacro.GoogleMapPluginElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._parent_elem.windowed = true;

			this._params = new nexacro.Collection();
			this._events = new nexacro.Collection();
		};

		var _pGoogleMapPluginElement = nexacro._createPrototype(nexacro.PluginElement, nexacro.GoogleMapPluginElement);
		nexacro.GoogleMapPluginElement.prototype = _pGoogleMapPluginElement;
		_pGoogleMapPluginElement._type_name = "GoogleMapElement";

		_pGoogleMapPluginElement.pluginname = "GoogleMap";


		_pGoogleMapPluginElement.destroy = function () {
			nexacro.PluginElement.prototype.destroy.call(this);
		};



		_pGoogleMapPluginElement._setLoad = function (params) {
			if (this._plugin_object) {
				this.callMethod("load", params);
			}
		};

		_pGoogleMapPluginElement._setDestroy = function (params) {
			if (this._plugin_object) {
				this.callMethod("destroy", params);
			}
		};

		_pGoogleMapPluginElement._getAddress = function (params) {
			if (this._plugin_object) {
				this.callMethod("getAddress", params);
			}
		};

		_pGoogleMapPluginElement._getCoordinates = function (params) {
			if (this._plugin_object) {
				this.callMethod("getCoordinates", params);
			}
		};

		_pGoogleMapPluginElement._setRemove = function (params) {
			if (this._plugin_object) {
				this.callMethod("removeItem", params);
			}
		};

		_pGoogleMapPluginElement._setMarker = function (params) {
			if (this._plugin_object) {
				this.callMethod("Marker", params);
			}
		};

		_pGoogleMapPluginElement._setPolyline = function (params) {
			if (this._plugin_object) {
				this.callMethod("Polyline", params);
			}
		};

		_pGoogleMapPluginElement._setPolygon = function (params) {
			if (this._plugin_object) {
				this.callMethod("Polygon", params);
			}
		};

		_pGoogleMapPluginElement.initEvent = function () {
			if (this._handle) {
				nexacro._observeWrapperEvent(this._handle, null, "on_plugin_event", this.on_plugin_event, -1, null);
			}
		};

		_pGoogleMapPluginElement.on_plugin_event = function (evt_id, args) {
			var comp = (this._parent_elem ? this._parent_elem.linkedcontrol : null);

			if (comp) {
				var objArgs = eval("(" + args + ")");
				if (evt_id == "GoogleMap") {
					if (objArgs.eventid == "onload") {
						if (comp.on_load_handler) {
							return comp.on_load_handler(objArgs.eventid, objArgs.centerlocation, objArgs.coordinates, objArgs.viewmode, objArgs.zoomlevel, objArgs.addresses);
						}
					}
					else if (objArgs.eventid == "onerror") {
						if (comp.on_error_handler) {
							return comp.on_error_handler(objArgs.eventid, objArgs.errorcode, objArgs.errormsg);
						}
					}
					else if (objArgs.eventid == "onrecvsuccess") {
						if (comp.on_recvsuccess_handler) {
							return comp.on_recvsuccess_handler(objArgs.eventid, objArgs.centerlocation, objArgs.coordinates, objArgs.viewmode, objArgs.zoomlevel, objArgs.addresses);
						}
					}
					else if (objArgs.eventid == "onclick") {
						if (comp.on_click_handler) {
							return comp.on_click_handler(objArgs.eventid, objArgs.location);
						}
					}
					else if (objArgs.eventid == "ondrag") {
						if (comp.on_drag_handler) {
							return comp.on_drag_handler(objArgs.eventid, objArgs.location);
						}
					}
					else if (objArgs.eventid == "onmapdragstart") {
						if (comp.on_mapdragstart_handler) {
							return comp.on_mapdragstart_handler(objArgs.eventid, objArgs.location);
						}
					}
					else if (objArgs.eventid == "onmapdrag") {
						if (comp.on_mapdrag_handler) {
							return comp.on_mapdrag_handler(objArgs.eventid, objArgs.location);
						}
					}
					else if (objArgs.eventid == "onmapdragend") {
						if (comp.on_mapdragend_handler) {
							return comp.on_mapdragend_handler(objArgs.eventid, objArgs.location);
						}
					}
				}
			}
		};

		delete _pGoogleMapPluginElement;

		nexacro.CanvasElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
		};

		var _pCanvasElement = nexacro._createPrototype(nexacro.Element, nexacro.CanvasElement);
		nexacro.CanvasElement.prototype = _pCanvasElement;

		_pCanvasElement._type_name = "CanvasElement";

		_pCanvasElement.lineOffset = 0.5;

		_pCanvasElement.scale = 10;
		_pCanvasElement.half_scale = 5;
		_pCanvasElement.scalex = 0;
		_pCanvasElement.scaley = 0;

		_pCanvasElement.fillStyle = null;
		_pCanvasElement.strokeColor = "#000000";
		_pCanvasElement.lineCap = 'butt';
		_pCanvasElement.lineJoin = 'miter';
		_pCanvasElement.lineWidth = 1;
		_pCanvasElement.miterLimit = 10;
		_pCanvasElement.shadowColor = null;
		_pCanvasElement.shadowOffsetX = 0;
		_pCanvasElement.shadowOffsetY = 0;
		_pCanvasElement.shadowBlur = 0;
		_pCanvasElement.font = null;
		_pCanvasElement.textAlign = "left";
		_pCanvasElement.textBaseline = 0;
		_pCanvasElement.globalAlpha = 1;
		_pCanvasElement.globalCompositeOperation = 1;

		_pCanvasElement._fillStyle_rgb = "#000000";
		_pCanvasElement.strokeStyle_rgb = "#000000";
		_pCanvasElement.shadowColor_rgb = "#000000";

		_pCanvasElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this.position_step);
			if (_owner_elem && _owner_elem._handle) {
				var _handle = this._handle;
				if (!_handle) {
					this._owner_elem = _owner_elem;
					var _win_handle = _owner_elem.getRootWindowHandle();
					_handle = nexacro.__createCanvasElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

					if (!this.font) {
						this.font = new nexacro.Style_font("8px Arial");
						nexacro.__setCanvasElementHandleFont(_handle, this.font.face, this.font.size, this.font._bold, this.font._italic, this.font._underline, this.font._strikeout, this.font._antialias);
					}

					if (!this.visible) {
						nexacro.__setElementHandleVisible(_handle, false);
					}

					this._handle = _handle;
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);
				}
			}
		};

		_pCanvasElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;
			}
			this.parent = null;
			this._parent_elem = null;
		};


		_pCanvasElement.setElementFillStyle = function (fillstyle) {
			var _handle = this._handle;
			if (_handle && fillstyle) {
				this.fillStyle = fillstyle;
				if (fillstyle instanceof nexacro.Style_color) {
					nexacro.__setCanvasElementHandleFillColor(_handle, nexacro._getWebColorFromXreColor(fillstyle.value));
				}
				else {
					nexacro.__setCanvasFillGradation(_handle, fillstyle.style, fillstyle._start_x, fillstyle._start_y, nexacro._getWebColorFromXreColor(fillstyle.start_color), fillstyle._end_x, fillstyle._end_y, nexacro._getWebColorFromXreColor(fillstyle.end_color), fillstyle._sysvalue);
				}
			}
		};

		_pCanvasElement.setElementFont = function (font) {
			if (!font) {
				return;
			}
			this.font = font;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setCanvasElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
			}
		};

		_pCanvasElement.setElementGlobalAlpha = function (alpha) {
			this.globalAlpha = alpha;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setCanvasElementHandleGlobalAlpha(_handle, alpha);
			}
		};

		_pCanvasElement.setElementGlobalCompositeOperation = function (operation) {
			this.globalCompositeOperation = operation;
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setCanvasElementHandleGlobalCompositoperation(_handle, operation);
			}
		};

		_pCanvasElement.setElementLineCap = function (captype) {
			var _handle = this._handle;
			if (_handle) {
				this.lineCap = captype;
				nexacro.__setCanvasElementHandleLineCap(_handle, captype);
			}
		};

		_pCanvasElement.setElementLineJoin = function (jointype) {
			var _handle = this._handle;
			if (_handle) {
				this.lineJoin = jointype;
				nexacro.__setCanvasElementHandleLineJoin(_handle, jointype);
			}
		};

		_pCanvasElement.setElementLineWidth = function (size) {
			var _handle = this._handle;
			if (_handle && isFinite(size)) {
				this.lineWidth = size;
				this.lineOffset = Math.round(size / 2);
				nexacro.__setCanvasElementHandleLineWidth(_handle, size);
			}
		};

		_pCanvasElement.setElementMiterLimit = function (size) {
			var _handle = this._handle;
			if (_handle) {
				this.miterLimit = size;
				nexacro.__setCanvasElementHandleMiterLimit(_handle, size);
			}
		};

		_pCanvasElement.setElementShadowBlur = function (fact) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowBlur = fact;
				nexacro.__setCanvasElementHandleShadowBlur(_handle, fact);
			}
		};

		_pCanvasElement.setElementShadowColor = function (color) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowColor = color;
				nexacro.__setCanvasElementHandleShadowColor(_handle, nexacro._getWebColorFromXreColor(color.value));
			}
		};

		_pCanvasElement.setElementShadowOffsetX = function (sx) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowOffsetX = sx;
				nexacro.__setCanvasElementHandleShadowOffsetx(_handle, sx);
			}
		};

		_pCanvasElement.setElementShadowOffsetY = function (sy) {
			var _handle = this._handle;
			if (_handle) {
				this.shadowOffsetY = sy;
				nexacro.__setCanvasElementHandleShadowOffsety(_handle, sy);
			}
		};

		_pCanvasElement.setElementStrokeStyle = function (color) {
			var _handle = this._handle;
			if (_handle && color) {
				this.strokeStyle = color;
				nexacro.__setCanvasElementHandleStrokeColor(_handle, nexacro._getWebColorFromXreColor(color.value));
			}
		};

		_pCanvasElement.setElementTextAlign = function (textalign) {
			var _handle = this._handle;
			if (_handle) {
				this.textAlign = textalign;
				nexacro.__setCanvasElementHandleTextAlign(_handle, textalign);
			}
		};

		_pCanvasElement.setElementTextBaseline = function (basealign) {
			var _handle = this._handle;
			if (_handle) {
				this.textBaseline = basealign;
				nexacro.__setCanvasElementHandleTextBaseline(_handle, basealign);
			}
		};


		_pCanvasElement.arc = function (x, y, r, start_rad, end_rad, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r, start_rad, end_rad, counterclockwise);
			}
		};

		_pCanvasElement.arcTo = function (x, y, x2, y2, r) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleArcToPath(_handle, x, y, x2, y2, r);
			}
		};

		_pCanvasElement.beginPath = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.bezierCurveTo = function (p1x, p1y, p2x, p2y, x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleBezierCurveToPath(_handle, p1x, p1y, p2x, p2y, x, y);
			}
		};

		_pCanvasElement.clearRect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__clearCanvasElementHandleRect(_handle, x, y, dx, dy);
			}
		};

		_pCanvasElement.clip = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__clipCanvasElementHandle(_handle);
			}
		};

		_pCanvasElement.closePath = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleClosePath(_handle);
			}
		};

		_pCanvasElement.createImageData = function (iWidth, iHeight) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__createCanvasElementHandleImageData(_handle, iWidth, iHeight);
			}
		};

		_pCanvasElement.drawImage = function (_image_handle, x, y, imgwidth, imgheight) {
			var _handle = this._handle;
			if (_handle) {
				var absoluteUrl = _image_handle.src;
				if (absoluteUrl && absoluteUrl.substring(0, 4).toLowerCase() == "url(") {
					absoluteUrl = absoluteUrl.substring(5, absoluteUrl.length - 2);
				}
				if (absoluteUrl && !nexacro._isAbsolutePath(absoluteUrl)) {
					var base_url = this._parent_elem._getElementBaseUrl();
					absoluteUrl = nexacro._getImageLocation(absoluteUrl);
				}
				nexacro.__drawCanvasElementHandleImage(_handle, absoluteUrl, x, y, imgwidth, imgheight);
			}
		};

		_pCanvasElement.fill = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__fillCanvasElementHandlePath(_handle);
			}
		};

		_pCanvasElement.fillRect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__fillCanvasElementHandleRect(_handle, x, y, dx, dy);
			}
		};

		_pCanvasElement.fillText = function (text, x, y, maxwidth) {
			var _handle = this._handle;
			if (_handle) {
				var font = this.font;
				if (font) {
					nexacro.__setCanvasElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}

				var color = this.fillStyle;
				if (color) {
					nexacro.__setCanvasElementHandleFillColor(_handle, nexacro._getWebColorFromXreColor(color.value));
				}

				nexacro.__fillCanvasElementHandleText(_handle, text, x, y, maxwidth);
			}
		};

		_pCanvasElement.getImageData = function (sx, sy, width, height) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__getCanvasElementHandleImageData(_handle, sx, sy, width, height);
			}
		};

		_pCanvasElement.isPointInPath = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__isPointInCanvasElementHandlePath(_handle, x, y);
			}
		};

		_pCanvasElement.lineTo = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x, y);
			}
		};

		_pCanvasElement.moveTo = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleMoveToPath(_handle, x, y);
			}
		};

		_pCanvasElement.putImageData = function (_image_handle, sx, sy, ix, iy, iwidth, iheight) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__putCanvasElementHandleImageData(_handle, _image_handle, sx, sy, ix, iy, iwidth, iheight);
			}
		};

		_pCanvasElement.quadraticCurveTo = function (cp1x, cp1y, cp2x, cp2y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleQuadraticCurveToPath(_handle, cp1x, cp1y, cp2x, cp2y);
			}
		};

		_pCanvasElement.rect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleRectPath(_handle, x, y, dx, dy);
			}
		};

		_pCanvasElement.rotate = function (angle) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__rotateCanvasElementHandle(_handle, angle);
			}
		};

		_pCanvasElement.rotate2 = function (radian) {
			var _handle = this._handle;
			if (_handle) {
				var angle = radian * Math.PI / 180;
				nexacro.__rotateCanvasElementHandle(_handle, angle);
			}
		};

		_pCanvasElement.scale = function (dx, dy) {
			var _handle = this._handle;
			this.scalex = dx;
			this.scaley = dy;
			if (_handle) {
				nexacro.__scaleCanvasElementHandle(_handle, dx, dy);
			}
		};

		_pCanvasElement.setTransform = function (a, b, c, d, e, f) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__setCanvasElementHandleTransform(_handle, a, b, c, d, e, f);
			}
		};

		_pCanvasElement.stroke = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__strokeCanvasElementHandlePath(_handle);
			}
		};

		_pCanvasElement.strokeRect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__strokeCanvasElementHandleRect(_handle, x, y, dx, dy);
			}
		};

		_pCanvasElement.strokeText = function (text, tx, ty, maxwidth) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__strokeCanvasElementHandleText(_handle, text, tx, ty, maxwidth);
			}
		};

		_pCanvasElement.transform = function (a, b, c, d, e, f) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__transformCanvasElementHandle(_handle, a, b, c, d, e, f);
			}
		};

		_pCanvasElement.translate = function (x, y) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__translateCanvasElementHandle(_handle, x, y);
			}
		};


		_pCanvasElement.arc2 = function (x, y, r, start_deg, end_deg, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				var start_rad = start_deg * Math.PI / 180;
				var end_rad = end_deg * Math.PI / 180;
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r, start_rad, end_rad, counterclockwise);
			}
		};

		_pCanvasElement.circle = function (x, y, r) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r, 0, 2 * Math.PI, true);
			}
		};

		_pCanvasElement.drawStrokeArc = function (x, y, r, start_deg, end_deg, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				this.arc(x, y, r, start_deg, end_deg, counterclockwise);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeArc2 = function (x, y, r, start_deg, end_deg, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				this.arc2(x, y, r, start_deg, end_deg, counterclockwise);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeCircle = function (x, y, r) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r, 0, 2 * Math.PI, true);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeHalfRect = function (x, y, w, h) {
			var _handle = this._handle;
			if (_handle) {
				this.halfRect(x, y, w, h);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeLine = function (x1, y1, x2, y2) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleMoveToPath(_handle, x1, y1);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x2, y2);
				this.drawStroke();
			}
		};

		_pCanvasElement.drawStrokeVLine = function (x, y1, y2) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleMoveToPath(_handle, x, y1);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x, y2);
				this.drawStroke();
			}
		};

		_pCanvasElement.drawStrokeHLine = function (y, x1, x2) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleMoveToPath(_handle, x1, y);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x2, y);
				this.drawStroke();
			}
		};

		_pCanvasElement.drawStrokeInsetArc = function (x, y, r, start_deg, end_deg, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				var gap = this.lineOffset;
				start_deg = start_deg * (Math.PI / 180);
				end_deg = end_deg * (Math.PI / 180);
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r - gap, start_deg, end_deg, counterclockwise);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeInsetCircle = function (x, y, r) {
			var _handle = this._handle;
			if (_handle) {
				var gap = this.lineOffset;
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r - gap, 0, 2 * Math.PI, true);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeInsetRect = function (x, y, w, h) {
			var _handle = this._handle;
			if (_handle) {
				this.insetRect(x, y, w, h);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStrokeRect = function (x, y, w, h) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleRectPath(_handle, x, y, w, h);
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawFillRect = function (x, y, dx, dy) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleRectPath(_handle, x, y, dx, dy);
				nexacro.__fillCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawFillText = function (text, x, y, maxwidth) {
			var _handle = this._handle;
			if (_handle) {
				var font = this.font;
				if (font) {
					nexacro.__setCanvasElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}

				var color = this.fillStyle;
				if (color) {
					nexacro.__setCanvasElementHandleFillColor(_handle, nexacro._getWebColorFromXreColor(color.value));
				}

				nexacro.__setCanvasElementHandleTextBaseline(_handle, "middle");
				nexacro.__fillCanvasElementHandleText(_handle, text, x, y, maxwidth);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.endDraw = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
				nexacro.__plotCanvasElementHandleClosePath(_handle);
			}
		};

		_pCanvasElement.drawFill = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__fillCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawStroke = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__strokeCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawFillArc = function (x, y, r, start_rad, end_rad, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				this.arc(x, y, r, start_rad, end_rad, counterclockwise);
				nexacro.__plotCanvasElementHandleClosePath(_handle);
				nexacro.__fillCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawFillArc2 = function (x, y, r, start_deg, end_deg, counterclockwise) {
			var _handle = this._handle;
			if (_handle) {
				this.arc2(x, y, r, start_deg, end_deg, counterclockwise);
				nexacro.__plotCanvasElementHandleClosePath(_handle);
				nexacro.__fillCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.drawFillCircle = function (x, y, r) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleArcPath(_handle, x, y, r, 0, 2 * Math.PI, true);
				nexacro.__fillCanvasElementHandlePath(_handle);
				nexacro.__plotCanvasElementHandleBeginPath(_handle);
			}
		};

		_pCanvasElement.halfRect = function (x, y, w, h) {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__plotCanvasElementHandleMoveToPath(_handle, x, y);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x, y + h);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x + w, y + h);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x + w, y);
			}
		};

		_pCanvasElement.hline = function (y, x1, x2) {
			this.moveTo(x1, y);
			this.lineTo(x2, y);
		};

		_pCanvasElement.vline = function (x, y1, y2) {
			this.moveTo(x, y1);
			this.lineTo(x, y2);
		};

		_pCanvasElement.insetRect = function (x, y, w, h) {
			var _handle = this._handle;
			if (_handle) {
				if (w == 0 || h == 0) {
					return;
				}
				var gap = this.lineOffset;
				var wgap = (w > 0) ? gap : -gap;
				var hgap = (h > 0) ? gap : -gap;
				nexacro.__plotCanvasElementHandleMoveToPath(_handle, x + wgap, y + hgap);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x + wgap, y + h - hgap);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x + w - wgap, y + h - hgap);
				nexacro.__plotCanvasElementHandleLineToPath(_handle, x + w - wgap, y + hgap);
				nexacro.__plotCanvasElementHandleClosePath(_handle);
			}
		};

		_pCanvasElement.save = function () {
			var _handle = this._handle;
			if (_handle) {
				nexacro.__saveCanvasElementHandle(_handle);
			}
		};
		_pCanvasElement.restore = function () {
			var _handle = this._handle;
			if (_handle) {
				return nexacro.__restoreCanvasElementHandle(_handle);
			}
		};

		_pCanvasElement.drawBorder = function (x, y, width, height, border, bordertype) {
			if (border && !border._is_empty) {
				if (border._linecnt == 1) {
					if (border.width && border.color != "" && border.color != "transparent") {
						var color = new nexacro.Style_color(border.color);
						this.setElementStrokeStyle(color);
						this.setElementLineWidth(border.width);
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

		_pCanvasElement.toDataURL = function () {
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

		_pCanvasElement._moveCanvas = function (left, top, width, height) {
			this.left = left || 0;
			this.top = top || 0;
			this.width = width || 0;
			this.height = height || 0;

			var _handle = this._handle;
			if (_handle) {
				nexacro.__setElementHandleSize(_handle, width, height);
				nexacro.__setElementHandlePosition(_handle, left, top);
			}
		};

		_pCanvasElement = null;

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
					var _win_handle = _owner_elem.getRootWindowHandle();
					var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);

					this._handle = _handle;
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}
					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);
				}

				if (this._handle && !this._client_element._handle) {
					this._client_element.create();
				}
			}
		};

		_pGridScrollableControlElement.destroy = function () {
			var _handle = this._handle;
			if (_handle) {
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;

				this._client_element.destroy();
				this.linkedcontrol = null;

				this._target_vscroll_elements = null;
				this._target_hscroll_elements = null;
				this._hscroll_control = null;
				this._vscroll_control = null;
			}
			this.parent = null;
			this._parent_elem = null;
			this.linkedcontrol = null;
		};

		_pGridScrollableControlElement.clearContents = function () {
			if (this._handle) {
				this._client_element.clearContents();
			}
		};

		_pGridScrollableControlElement.getContainerElement = function () {
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
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
					this._refreshForeground(this._handle);
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
				if (nexacro._enableaccessibility && nexacro._accessibilitytype == 5) {
					this._refreshForeground(this._handle);
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
								h_client_width = (h_element) ? h_element._calculateClientWidth(-this._vscroll_width) : -this._vscroll_width;
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

						if (!this._vscroll_visible) {
							this._vscroll_visible = true;
							this._vscroll_control.set_visible(true);
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

						if (!this._hscroll_visible) {
							this._hscroll_visible = true;
							this._hscroll_control.set_visible(true);
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
						var old_win_handle = child_elem.getRootWindowHandle();
						var new_win_handle = this._client_element.getRootWindowHandle();
						if (old_win_handle != new_win_handle) {
							child_elem._parent_elem = this;
							child_elem._destroyElementHandle();
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

		_pGridScrollableControlElement._arrangeBandOrder = nexacro._emptyFn;

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

		_pGridScrollableControlElement.setElementScrollPos = function (hpos, vpos) {
			var v_element = this._target_vscroll_element;
			var h_element = this._target_hscroll_element;

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
					if (this._hscroll_control && !this._hscroll_control._no_set_scrollinfo) {
						this._hscroll_control._setScrollPos(hpos);
					}
				}
			}
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
					if (this._vscroll_control && !this._vscroll_control._no_set_scrollinfo) {
						this._vscroll_control._setScrollPos(vpos);
					}
				}
			}
		};

		_pGridScrollableControlElement._setInnerElementScrollMaxSize = nexacro._emptyFn;

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

		_pGridScrollableControlElement.setElementScrollMaxHeight = function (width, update) {
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

		_pGridScrollableControlElement._setScrollMaxHeight = function (height, update) {
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
			this._setControlBorder(this._handle, border, bordertype, true);
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
				this._client_element.setElementVScrollPos(vpos);
				this.scroll_top = vpos;
			}
		};

		_pGridBandControlElement._setOnScrollCallbackFunc = function (target, func) {
			if (this._type == "body") {
				this._client_element._callback_onscroll = func;
				this._client_element._grid = target;
			}
		};

		delete _pGridBandControlElement;

		nexacro.GridBandContainerElement = function (parent_elem) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._callback_onscroll = null;
		};

		var _pGridBandContainerElement = nexacro._createPrototype(nexacro.ScrollableContainerElement, nexacro.GridBandContainerElement);
		nexacro.GridBandContainerElement.prototype = _pGridBandContainerElement;
		_pGridBandContainerElement._type_name = "GridBandContainerElement";

		_pGridBandContainerElement._container_maxwidth = 0;
		_pGridBandContainerElement._container_maxheight = 0;

		_pGridBandContainerElement.setElementVScrollPos = function (vpos) {
			if (this._scroll_top != vpos || this.parent._reset_scrollpos) {
				this._scroll_top = vpos;

				if (!this.parent._no_setscroll) {
					var _handle = this._handle;
					if (_handle) {
						nexacro.__setElementHandleVScrollPos(_handle, vpos);
						if (this._callback_onscroll) {
							this._callback_onscroll.call(this._grid);
						}
					}
				}
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
				nexacro.__setElementHandlePosition(_handle, left, top);
			}
		};

		_pGridBandContainerElement.create = function () {
			var retn = nexacro.ScrollableContainerElement.prototype.create.call(this);
			this._adjustPos();
			return retn;
		};

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
					var _win_handle = _owner_elem.getRootWindowHandle();
					var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);

					this._handle = _handle;
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}

					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);
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
				var _owner_handle = null;
				if (this._owner_elem && this._owner_elem._handle) {
					_owner_handle = this._owner_elem._handle;
				}

				if (!this._owner_elem || _owner_handle) {
					nexacro.__destroyElementHandle(_owner_handle, _handle);
				}

				this._owner_elem = null;
				this._handle = null;

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

		delete _pGridRowControlElement;


		nexacro.GridAreaContainerElement = function (parent_elem, areatype) {
			this.parent = parent_elem;
			this._parent_elem = parent_elem;
			this._areatype = areatype;
		};

		var _pGridAreaContainerElement = nexacro._createPrototype(nexacro.ScrollableContainerElement, nexacro.GridAreaContainerElement);
		nexacro.GridAreaContainerElement.prototype = _pGridAreaContainerElement;
		_pGridAreaContainerElement._type_name = "GridAreaContainerElement";

		_pGridAreaContainerElement._container_maxwidth = 0;
		_pGridAreaContainerElement._container_maxheight = 0;

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
			}

			return this._client_element;
		};

		_pGridCellControlElement.create = function () {
			var _owner_elem = (this._is_nc_element) ? this._parent_elem : this._parent_elem.getContainerElement(this._area);
			if (_owner_elem && _owner_elem._handle) {
				if (!this._handle) {
					this._owner_elem = _owner_elem;
					var _win_handle = _owner_elem.getRootWindowHandle();
					var _handle = nexacro.__createControlElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
					this.linkedcontrol._unique_id = this.linkedcontrol.parent._unique_id + '_' + this.linkedcontrol.id;
					nexacro.__setElementHandleId(_handle, this.linkedcontrol._unique_id);

					this._handle = _handle;
					nexacro.__appendElementHandle(_owner_elem._handle, _handle);

					if (this.border || this.bordertype) {
						this._setControlBorder(_handle, this.border, this.bordertype);
					}
					if (this.background) {
						this._setControlBackground(_handle, this.background, this.gradation);
					}

					if (this.opacity) {
						nexacro.__setElementHandleOpacity(_handle, this.opacity);
					}
					if (this._hittest_type) {
						nexacro.__setElementHittestValue(_handle, this._hittest_type);
					}
					this._refreshForeground(_handle);
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

		_pGridCellControlElement._setDisplay = nexacro._emptyFn;

		_pGridCellControlElement.setContainerVisible = function (v) {
			if (this._client_element) {
				this._client_element.setElementVisible(v);
			}
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
				var _win_handle = _owner_elem.getRootWindowHandle();
				var _handle = nexacro.__createContainerElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

				if (this.letterspace) {
					nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
				}
				if (this.font) {
					var font = this.font;
					nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
				}
				if (this.color) {
					nexacro.__setElementHandleColor(_handle, this.color._syscolor);
				}
				if (!this.visible) {
					nexacro.__setElementHandleVisible(_handle, false);
				}

				this._handle = _handle;
				nexacro.__appendElementHandle(_owner_elem._handle, _handle);
			}
		};

		delete _pGridCellContainerElement;
	}


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
			var _win_handle = _owner_elem.getRootWindowHandle();
			var _handle = nexacro.__createTextElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);
			if (!this.visible) {
				nexacro.__setElementHandleVisible(_handle, false);
			}
			if (this.letterspace) {
				nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
			}
			if (this.font) {
				var font = this.font;
				nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
			}
			if (this.color) {
				nexacro.__setElementHandleColor(_handle, this.color._syscolor);
			}

			if (this.align) {
				var align = this.align;
				nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
			}
			else if (this.halign && this.valign) {
				nexacro.__setElementHandleAlign(_handle, this.halign, this.valign);
			}

			if (this.padding) {
				var padding = this.padding;
				nexacro.__setElementHandlePadding(_handle, padding.left, padding.top, padding.right, padding.bottom);
			}
			else if (this.padding_left || this.padding_top || this.padding_right || this.padding_bottom) {
				nexacro.__setElementHandlePadding(_handle, this.padding_left, this.padding_top, this.padding_right, this.padding_bottom);
			}

			if (this.decoration) {
				nexacro.__setElementHandleDecorateText(_handle, this.decoration);
			}
			if (this.linespace > 0) {
				nexacro.__setElementHandleLineSpace(_handle, this.linespace);
			}
			if (this.wordwrap != "none") {
				nexacro.__setElementHandleWordWrap(_handle, this.wordwrap);
			}

			if (this.text) {
				nexacro.__setElementHandleText(_handle, this.text);
			}

			this._handle = _handle;
			nexacro.__appendElementHandle(_owner_elem._handle, _handle);
		}
	};

	_pGridCellTextContainerElement.clearContents = function () {
		var _handle = this._handle;
		var _owner_elem = this._owner_elem;
		if (_handle) {
			_handle._linked_element = null;
			if (_owner_elem && _owner_elem._handle) {
				nexacro.__destroyElementHandle(_owner_elem._handle, _handle);
			}
			this._owner_elem = null;
			this._handle = null;
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
		var _handle = this._handle;

		visible = visible && this.visible;

		if (_handle) {
			nexacro.__setElementHandleVisible(_handle, visible);
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
			var _win_handle = _owner_elem.getRootWindowHandle();
			var _handle = nexacro.__createTextElementHandle(this, _win_handle, this.left, this.top, this.width, this.height);

			if (!this.visible) {
				nexacro.__setElementHandleVisible(_handle, false);
			}

			if (this.letterspace) {
				nexacro.__setElementHandleLetterSpace(_handle, this.letterspace);
			}

			if (this.font) {
				var font = this.font;
				nexacro.__setElementHandleFont(_handle, font.face, font.size, font._bold, font._italic, font._underline, font._strikeout, font._antialias);
			}
			if (this.color) {
				nexacro.__setElementHandleColor(_handle, this.color._syscolor);
			}

			if (this.align) {
				var align = this.align;
				nexacro.__setElementHandleAlign(_handle, align.halign, align.valign);
			}
			else if (this.halign && this.valign) {
				nexacro.__setElementHandleAlign(_handle, this.halign, this.valign);
			}

			if (this.decoration) {
				nexacro.__setElementHandleDecorateText(_handle, this.decoration);
			}
			if (this.linespace > 0) {
				nexacro.__setElementHandleLineSpace(_handle, this.linespace);
			}

			if (this.wordwrap != "none") {
				nexacro.__setElementHandleWordWrap(_handle, this.wordwrap);
			}

			if (this.text) {
				nexacro.__setElementHandleText(_handle, this.text, this._use_newline, this.wordwrap);
			}

			this._handle = _handle;
			nexacro.__appendElementHandle(_owner_elem._handle, _handle);
		}
	};

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

				if (comp) {
					comp._applyMouseLeaveEvent();
				}
			}
		}

		if (over_comp) {
			over_comp._applyMouseOverEvent();
		}

		return elem;
	};

	_pEventPassOverlayElement.setTargetElements = function (elements) {
		this._target_elements = elements;
	};

	_pEventPassOverlayElement.updateCellNodeClient = function (left, top, width, height, cell_hpos, is_fake_merge) {
		var _handle = this._handle;
		if (_handle) {
			if (cell_hpos > 0 && left <= 0) {
				left = -cell_hpos;
				width += cell_hpos;
			}

			nexacro.__setElementHandlePosition(_handle, left, top);
			nexacro.__setElementHandleSize(_handle, width, height);
		}
	};

	_pEventPassOverlayElement.updateElementLineHeight = nexacro._emptyFn;


	_pEventPassOverlayElement.setElementPadding = nexacro._emptyFn;
	_pEventPassOverlayElement.setElementPaddingXY = nexacro._emptyFn;

	delete _pEventPassOverlayElement;
}
