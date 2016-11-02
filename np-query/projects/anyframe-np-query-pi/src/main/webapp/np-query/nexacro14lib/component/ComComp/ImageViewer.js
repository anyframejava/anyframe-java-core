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

if (!nexacro.ImageViewer) {
	nexacro.ImageAlign = function (valign, halign, target) {
		nexacro.Object.call(this);

		this.align = new nexacro.Style_align(valign, halign);

		this.valign = this.align.valign;
		this.halign = this.align.halign;

		this._target = target;
	};

	var _pImageAlign = nexacro.ImageAlign.prototype = nexacro._createPrototype(nexacro.Object, nexacro.ImageAlign);
	_pImageAlign._type_name = "ImageAlign";

	_pImageAlign.set_halign = function (v) {
		if (this.align.set_halign(v)) {
			this.halign = this.align.halign;
			this._target.on_apply_imagealign(this.align);
		}
	};
	_pImageAlign.set_valign = function (v) {
		if (this.align.set_valign(v)) {
			this.valign = this.align.valign;
			this._target.on_apply_imagealign(this.align);
		}
	};

	_pImageAlign.destroy = function () {
		this.align = null;
		this.valign = null;
		this.halign = null;
		this._target = null;
	};
	delete _pImageAlign;

	nexacro.ImageViewer = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.text = "";
		this.image = "";
		this.imagealign = new nexacro.ImageAlign("middle", "center", this);

		this.imagewidth = 0;
		this.imageheight = 0;
		this.stretch = "none";
		this.repeatcount = -1;
		this.resampling = 0;

		this._text_elem = null;
		this._img_elem = null;
		this._prewidth = 0;
		this._preheight = 0;
		this._img_type = "url";
		this._accessibility_role = "image";
	};

	var _pImageViewer = nexacro._createPrototype(nexacro.Component, nexacro.ImageViewer);
	nexacro.ImageViewer.prototype = _pImageViewer;
	_pImageViewer._type_name = "ImageViewer";


	_pImageViewer.on_apply_custom_pseudo = function (pseudo) {
		var curstyle = this.currentstyle;

		var font = this.on_find_CurrentStyle_font(pseudo);
		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}
		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}
		var color = this.on_find_CurrentStyle_color(pseudo);
		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}
		var align = this.on_find_CurrentStyle_align(pseudo);
		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};

	_pImageViewer.on_apply_style_color = function (color) {
		if (this._text_elem) {
			this._text_elem.setElementColor(color);
		}
	};

	_pImageViewer.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
		}
	};

	_pImageViewer.on_apply_style_align = function (align) {
		if (this._text_elem) {
			var halign = align.halign == "" ? "center" : align._halign;
			var valign = align.valign == "" ? "middle" : align._valign;
			this._text_elem.setElementAlignXY(halign, valign);
			halign = valign = null;
		}
	};


	_pImageViewer.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		this.on_change_containerRect(this._client_width, this._client_height);
	};

	_pImageViewer.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.text) {
				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				var halign = this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign;
				var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);

				text_elem = halign = valign = null;
			}
		}
		control_elem = null;
	};

	_pImageViewer.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			this._text_elem = null;
		}

		if (this._img_elem) {
			this._img_elem.destroy();
			this._img_elem = null;
		}

		if (this.imagealign) {
			this.imagealign.destroy();
			this.imagealign = null;
		}
	};

	_pImageViewer.on_created_contents = function () {
		var _text_elem = this._text_elem;
		this._load_image(this.image);

		if (_text_elem) {
			var client_width = this._client_width;
			var client_height = this._client_height;
			_text_elem.setElementSize(client_width, client_height);
			_text_elem.create();
		}
		if (this.expr) {
			this.on_apply_expr();
		}

		this.on_apply_prop_rtldirection();

		_text_elem = null;
	};

	_pImageViewer.on_fire_onsize = function (width, height) {
		if (this._text_elem) {
			var halign = this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign;
			var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
			this._text_elem.setElementAlignXY(halign, valign);
		}
		this.on_apply_imagealign();

		return nexacro.Component.prototype.on_fire_onsize.call(this, width, height);
	};

	_pImageViewer.on_change_containerRect = function (width, height) {
		var textElem = this._text_elem;
		var imgElem = this._img_elem;
		if (textElem) {
			textElem.setElementSize(width, height);
			if (imgElem) {
				this._updateElementPositions();
			}
		}
		else if (imgElem) {
			this._updateElementPositions();
		}


		var pseudo = this._pseudo;
		var align = this.on_find_CurrentStyle_align(pseudo);
		this.on_apply_style_align(align);

		textElem = null;
		imgElem = null;
	};
	_pImageViewer.on_apply_text = function () {
		var expr = this.expr;
		if (expr && expr.length > 0) {
			expr = expr.trim().split(":");
			var len = expr.length;
			var parser = new nexacro.ExprParser();
			var conv_expr, exprfn;
			var str;

			if (len == 1) {
				str = expr[0];
			}
			else {
				if (expr[0].trim().toUpperCase() != "EXPR") {
					str = expr.join(":");
				}
				else {
					str = expr.slice(1).join(":");
				}
			}

			conv_expr = parser.makeExpr(this, str);
			exprfn = nexacro._createInlineFunc(conv_expr, ["comp"]);

			if (exprfn) {
				try {
					var val = nexacro._toString(exprfn.call(null, this));
					if (val != this.displaytext) {
						this.displaytext = val;
					}
				}
				catch (e) {
					return;
				}
			}
			parser = null;
		}
		else {
			this.displaytext = this.text;
		}

		expr = null;

		if (!this._text_elem && this.displaytext) {
			var control_elem = this.getElement();
			if (control_elem) {
				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				var halign = this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign;
				var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);

				text_elem.create();
				text_elem = halign = valign = null;
			}
			control_elem = null;
		}

		if (this._text_elem) {
			this._text_elem.setElementText(this.displaytext);
		}
		this._refreshAccessibilityValue();
	};

	_pImageViewer.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pImageViewer.set_image = function (v) {
		if (v) {
			if (v instanceof nexacro.Image) {
				if ((v._handle_id) && nexacro.Browser == "Runtime" && (((typeof v._handle_id) == "number") || (v._handle_id instanceof nexacro.Decimal))) {
					var image = this.image;
					var elem = this.getElement();
					var img_elem = this._img_elem;
					var image_handleid = image._handle_id;

					if (image_handleid && ((typeof image_handleid) == "number")) {
						img_elem.destroy(null, image_handleid);
					}

					if (!img_elem) {
						this._img_elem = img_elem = new nexacro.ImageElement(elem);
					}

					if (!img_elem._handle) {
						img_elem.create();
					}

					img_elem.setElementHandleImageObject(v._handle_id);

					this.image = v;
					this._img_type = "url";
					this._load_image(v._handle_id);
					return true;
				}
				else {
					v = v._base64str;
					this._img_type = "base64";
				}
			}
			else {
				v = v.toString();

				var isBase64 = nexacro._checkBase64String(v);
				if (isBase64) {
					if (v.substring(0, 10).toLowerCase() == "data:image") {
						if (v.substring(0, 17).toLowerCase() != "data:image;base64") {
							var comma_idx = v.indexOf(",");
							if (comma_idx > -1) {
								var tmp = v.slice(comma_idx + 1, v.legnth);
								v = "data:image;base64," + tmp;
							}
						}
					}
					else {
						v = "data:image;base64," + v;
					}
					this._img_type = "base64";
				}
				else {
					this._img_type = "url";
				}
			}
		}
		else {
			v = "";
			this._img_type = "url";
		}

		this.image = v;
		this.on_apply_image();
	};

	_pImageViewer.on_apply_image = function () {
		this._load_image(this.image);
	};

	_pImageViewer.set_imagewidth = function (v) {
	};

	_pImageViewer.set_imageheight = function (v) {
	};


	_pImageViewer.set_stretch = function (v) {
		if (v != this.stretch) {
			this.stretch = v;
			this.on_apply_stretch();
		}
	};

	_pImageViewer.on_apply_stretch = function () {
		this._updateElementPositions();
	};

	_pImageViewer.set_repeatcount = function (v) {
		if (v != this.repeatcount) {
			this.repeatcount = v;
		}
	};

	_pImageViewer.set_imagealign = function (v) {
		if (this.imagealign.align.valueOf() != v) {
			if (this.imagealign.align._setValue(v)) {
				this.imagealign.halign = this.imagealign.align.halign;
				this.imagealign.valign = this.imagealign.align.valign;
				this.on_apply_imagealign();
			}
		}
	};

	_pImageViewer.on_apply_imagealign = function () {
		if (this._img_elem) {
			this._updateElementPositions();
		}
	};


	_pImageViewer.on_apply_repeatcount = function () {
	};

	_pImageViewer.set_resampling = function (v) {
	};

	_pImageViewer.repeatStart = function (nCount) {
		this.repeatcount = parseInt(nCount) | 0;
	};

	_pImageViewer.repeatStop = function () {
		return;
	};


	_pImageViewer._on_loadImg = function (imgurl, w, h) {
		this.imagewidth = this._prewidth = w;
		this.imageheight = this._preheight = h;
		this._img_load_completed(imgurl);
	};

	_pImageViewer._img_load_completed = function (url) {
		var img_elem = this._img_elem;
		var val = this.image;
		if (img_elem) {
			if (!val) {
				this._img_elem.setElementVisible(false);
				this._img_elem.setElementImageUrl("");
				this._updateElementPositions();

				this.imagewidth = 0;
				this.imageheight = 0;

				if (this._text_elem) {
					var halign = this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign;
					var valign = this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign;
					this._text_elem.setElementAlignXY(halign, valign);
				}
			}
			else {
				var img_type = this._img_type;
				val = val.toString();

				if (img_type == "url") {
					if (val.substring(0, 4).toLowerCase() == "url(") {
						val = val.substring(5, val.length - 2);
					}

					if (nexacro._getImageLocation(val, this._getRefFormBaseUrl()) == url) {
						img_elem.setElementVisible(true);
						img_elem.setElementImageUrl(val);
					}
				}
				else {
					img_elem.setElementVisible(true);
					img_elem.setElementImageBase64(url);
				}

				this._updateElementPositions();
			}
		}
		img_elem = null;
	};

	_pImageViewer._load_image = function (image) {
		var val = image.toString();
		var elem = this.getElement();
		var curstyle = this.currentstyle;

		if (val && elem) {
			var img_elem = this._img_elem;
			var text_elem = this._text_elem;
			var img_type = this._img_type;
			if (img_type == "url") {
				val = nexacro._getURIValue(val);
				val = nexacro._getImageLocation(val, this._getRefFormBaseUrl());
			}

			if (!img_elem) {
				this._img_elem = img_elem = new nexacro.ImageElement(elem);
			}

			if (!img_elem._handle) {
				img_elem.create();
			}

			var image_size = nexacro._getImageSize(val, this._on_loadImg, this, undefined, image.toString());
			if (image_size) {
				this._prewidth = image_size.width;
				this._preheight = image_size.height;
				this._img_load_completed(val);
			}

			if (text_elem) {
				elem.moveToNextElement(img_elem, text_elem);
			}

			img_elem = null;
			text_elem = null;
			img_size = null;
		}
		else {
			if (this._img_elem) {
				this._img_elem.setElementVisible(false);
				this._img_elem.setElementImageUrl("");
				this._updateElementPositions();

				this.imagewidth = 0;
				this.imageheight = 0;

				if (this._text_elem) {
					var halign = curstyle.align.halign == "" ? "center" : curstyle.align._halign;
					var valign = curstyle.align.valign == "" ? "middle" : curstyle.align._valign;
					this._text_elem.setElementAlignXY(halign, valign);
				}
			}
		}

		curstyle = null;
	};

	_pImageViewer._updateElementPositions = function () {
		if (this.imagealign.align == null) {
			return;
		}

		this._resizeImage();

		var _img_elem = this._img_elem;
		if (_img_elem) {
			var halign = this.imagealign.align.halign;
			var valign = this.imagealign.align.valign;

			var client_width = this._client_width;
			var client_height = this._client_height;

			var tw, th;

			var imgw = this.imagewidth;
			var imgh = this.imageheight;

			var pos;
			var imgpos_x, imgpos_y;

			switch (halign) {
				case "left":
					imgpos_x = 0;
					break;
				case "right":
					pos = client_width - imgw;
					imgpos_x = pos;
					break;
				default:
					pos = Math.floor((client_width - imgw) / 2);
					imgpos_x = pos;
					break;
			}

			switch (valign) {
				case "top":
					imgpos_y = 0;
					textpos_y = -1;
					break;
				case "bottom":
					pos = client_height - imgh;
					imgpos_y = pos;
					break;
				default:
					pos = Math.floor((client_height - imgh) / 2);
					imgpos_y = pos;
					break;
			}
			imgpos_x = this._convertLeftForRtlLayout(imgpos_x, imgw);
			_img_elem.setElementPosition(imgpos_x, imgpos_y);
			_img_elem.setElementSize(imgw, imgh);
		}
		_img_elem = null;
	};

	_pImageViewer._resizeImage = function () {
		var _img_elem = this._img_elem;
		var _stretch = this.stretch;
		var _img = this.image;

		if (!_img_elem || _stretch == null) {
			return;
		}

		var spanWidth = this._client_width;
		var spanHeight = this._client_height;

		if (_stretch == "fit" || _img._handle_id) {
			_img_elem.image_width = this.imagewidth = spanWidth;
			_img_elem.image_height = this.imageheight = spanHeight;
		}
		else if (_stretch == "fixaspectratio") {
			var width = 0, height = 0;

			if (this.imagewidth == 0 && this.imageheight == 0) {
				var _imageWidth = this._prewidth;
				var _imageHeight = this._preheight;
			}
			else {
				var _imageWidth = this.imagewidth = this._prewidth;
				var _imageHeight = this.imageheight = this._preheight;
			}

			var widthPer = spanWidth / _imageWidth;
			var heightPer = spanHeight / _imageHeight;

			if (widthPer <= heightPer) {
				width = spanWidth;
				height = Math.floor(_imageHeight * widthPer);
			}
			else {
				width = Math.floor(_imageWidth * heightPer);
				height = spanHeight;
			}

			_img_elem.image_width = this.imagewidth = width;
			_img_elem.image_height = this.imageheight = height;
		}
		else {
			_img_elem.image_width = this.imagewidth = this._prewidth;
			_img_elem.image_height = this.imageheight = this._preheight;
		}

		_img_elem.setElementSize(this.imagewidth, this.imageheight);
		this.stretch = _stretch;

		_stretch = null;
		_img_elem = null;
	};

	delete _pImageViewer;
	_pImageViewer = null;

	nexacro.ImageViewerCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ImageViewer.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pImageViewerCtrl = nexacro.ImageViewerCtrl.prototype = nexacro._createPrototype(nexacro.ImageViewer, nexacro.ImageViewerCtrl);
	_pImageViewerCtrl._type_name = "ImageViewerControl";

	nexacro._setForControlStyleFinder(_pImageViewerCtrl);

	delete _pImageViewerCtrl;
	_pImageViewerCtrl = null;
}




