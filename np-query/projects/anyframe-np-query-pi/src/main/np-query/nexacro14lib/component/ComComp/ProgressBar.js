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

if (!nexacro.ProgressBar) {
	nexacro.ProgressBar_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
	};

	var _pProgressBarStyle = nexacro._createPrototype(nexacro.Style, nexacro.ProgressBar_Style);
	nexacro.ProgressBar_Style.prototype = _pProgressBarStyle;

	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "bartype"));
	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "smooth"));
	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "direction"));
	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "startimage"));
	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "progressimage"));
	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "endimage"));
	eval(nexacro._createValueAttributeEvalStr("_pProgressBarStyle", "barcolor"));
	eval(nexacro._createGradationAttributeEvalStr("_pProgressBarStyle", "bargradation"));

	_pProgressBarStyle.__custom_emptyObject = function () {
		this.bartype = null;
		this.smooth = null;
		this.direction = null;
		this.startimage = null;
		this.progressimage = null;
		this.endimage = null;
		this.barcolor = null;
		this.bargradation = null;
	};

	_pProgressBarStyle.__get_custom_style_value = function () {
		var val = "";
		if (this.bartype && !this.bartype._is_empty) {
			val += "bartype:" + this.bartype._value + "; ";
		}
		if (this.smooth && !this.smooth._is_empty) {
			val += "smooth:" + this.smooth._value + "; ";
		}
		if (this.direction && !this.direction._is_empty) {
			val += "direction:" + this.direction._value + "; ";
		}
		if (this.startimage && !this.startimage._is_empty) {
			val += "startimage:" + this.startimage._value + "; ";
		}
		if (this.progressimage && !this.progressimage._is_empty) {
			val += "progressimage:" + this.progressimage._value + "; ";
		}
		if (this.endimage && !this.endimage._is_empty) {
			val += "endimage:" + this.endimage._value + "; ";
		}
		if (this.barcolor && !this.barcolor._is_empty) {
			val += "barcolor:" + this.barcolor._value + "; ";
		}
		if (this.bargradation && !this.bargradation._is_empty) {
			val += "bargradation:" + this.bargradation._value + "; ";
		}
		return val;
	};

	nexacro.ProgressBar_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);
		this.bartype = null;
		this.smooth = null;
		this.direction = null;
		this.startimage = null;
		this.progressimage = null;
		this.endimage = null;
		this.barcolor = null;
		this.bargradation = null;
	};

	var _pProgressBarCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.ProgressBar_CurrentStyle);
	nexacro.ProgressBar_CurrentStyle.prototype = _pProgressBarCurrentStyle;

	_pProgressBarCurrentStyle.__custom_emptyObject = _pProgressBarStyle.__custom_emptyObject;
	_pProgressBarCurrentStyle.__get_custom_style_value = _pProgressBarStyle.__get_custom_style_value;

	_pProgressBarStyle = null;
	_pProgressBarCurrentStyle = null;

	nexacro.ProgressBar = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.celllist = [];
		this.cellitem = null;

		this.start_img = null;
		this.progress_img = null;
		this.progress_img_list = new Array();
		this.end_img = null;

		this.statictext = null;
		this.style_list = null;

		this.start_img_width = 0;
		this.progress_img_width = 0;
		this.end_img_width = 0;
		this.start_img_url = "";
		this.progress_img_url = "";
		this.end_img_url = "";

		this.pos = 0;
		this.step = 1;
		this.max = 100;
		this.min = 0;
		this.blocksize = 15;
		this.blockgap = 2;

		this._accessibility_role = "progressbar";
	};

	var _pProgressBar = nexacro._createPrototype(nexacro.Component, nexacro.ProgressBar);
	nexacro.ProgressBar.prototype = _pProgressBar;

	_pProgressBar._type_name = "ProgressBar";

	nexacro.ProgressBar._default_bartype = nexacro._getCachedStyleObj("bartype", "normal");

	_pProgressBar.on_apply_custom_pseudo = function (pseudo) {
		if (!pseudo) {
			pseudo = this._pseudo;
		}
		var curstyle = this.currentstyle;
		var bartype = this.on_find_CurrentStyle_bartype(pseudo);
		var smooth = this.on_find_CurrentStyle_smooth(pseudo);
		var direction = this.on_find_CurrentStyle_direction(pseudo);
		var startimage = this.on_find_CurrentStyle_startImage(pseudo);
		var progressimage = this.on_find_CurrentStyle_progressImage(pseudo);
		var endimage = this.on_find_CurrentStyle_endImage(pseudo);
		var barcolor = this.on_find_CurrentStyle_barColor(pseudo);
		var bargradation = this.on_find_CurrentStyle_barGradation(pseudo);
		var font = this.on_find_CurrentStyle_font(pseudo);
		var letterspace = this.on_find_CurrentStyle_letterspace(pseudo);
		var color = this.on_find_CurrentStyle_color(pseudo);
		var align = this.on_find_CurrentStyle_align(pseudo);

		if (curstyle.font != font) {
			curstyle.font = font;
			this.on_apply_style_font(font);
		}

		if (curstyle.letterspace != letterspace) {
			curstyle.letterspace = letterspace;
			this.on_apply_style_letterspace(letterspace);
		}

		if (curstyle.color != color) {
			curstyle.color = color;
			this.on_apply_style_color(color);
		}

		if (curstyle.align != align) {
			curstyle.align = align;
			this.on_apply_style_align(align);
		}

		if (bartype != curstyle.bartype) {
			curstyle.bartype = bartype;
			this.on_apply_style_bartype(bartype);
		}

		if (smooth != curstyle.smooth) {
			curstyle.smooth = smooth;
			this.on_apply_style_smooth(smooth);
		}

		if (direction != curstyle.direction) {
			curstyle.direction = direction;
			this.on_apply_style_direction(direction);
		}

		if (startimage != curstyle.startimage) {
			curstyle.startimage = startimage;
			this.on_apply_style_startimage(startimage);
		}

		if (progressimage != curstyle.progressimage) {
			curstyle.progressimage = progressimage;
			this.on_apply_style_progressimage(progressimage);
		}
		if (endimage != curstyle.endimage) {
			curstyle.endimage = endimage;
			this.on_apply_style_endimage(endimage);
		}
		if (barcolor != curstyle.barcolor) {
			curstyle.barcolor = barcolor;
			this.on_apply_style_barcolor(barcolor);
		}
		if (bargradation != curstyle.bargradation) {
			curstyle.bargradation = bargradation;
			this.on_apply_style_bargradation(bargradation);
		}
	};

	_pProgressBar.on_create_custom_style = function () {
		return new nexacro.ProgressBar_Style(this);
	};

	_pProgressBar.on_create_custom_currentStyle = function () {
		return new nexacro.ProgressBar_CurrentStyle();
	};



	_pProgressBar.on_find_CurrentStyle_bartype = function (pseudo) {
		var bartype = this._find_pseudo_obj("bartype", pseudo);
		return (bartype) ? bartype : nexacro.ProgressBar._default_bartype;
	};
	_pProgressBar.on_find_CurrentStyle_smooth = function (pseudo) {
		return this._find_pseudo_obj("smooth", pseudo);
	};
	_pProgressBar.on_find_CurrentStyle_direction = function (pseudo) {
		return this._find_pseudo_obj("direction", pseudo);
	};
	_pProgressBar.on_find_CurrentStyle_startImage = function (pseudo) {
		return this._find_pseudo_obj("startimage", pseudo);
	};
	_pProgressBar.on_find_CurrentStyle_progressImage = function (pseudo) {
		return this._find_pseudo_obj("progressimage", pseudo);
	};
	_pProgressBar.on_find_CurrentStyle_endImage = function (pseudo) {
		return this._find_pseudo_obj("endimage", pseudo);
	};
	_pProgressBar.on_find_CurrentStyle_barColor = function (pseudo) {
		return this._find_pseudo_obj("barcolor", pseudo, "color");
	};
	_pProgressBar.on_find_CurrentStyle_barGradation = function (pseudo) {
		return this._find_pseudo_obj("bargradation", pseudo, "gradation");
	};


	_pProgressBar.on_update_style_bartype = function () {
		var bartype = this.currentstyle.bartype = this.on_find_CurrentStyle_bartype(this._pseudo);
		this.on_apply_style_bartype(bartype);
	};
	_pProgressBar.on_update_style_smooth = function () {
		var smooth = this.currentstyle.smooth = this.on_find_CurrentStyle_smooth(this._pseudo);
		this.on_apply_style_smooth(smooth);
	};
	_pProgressBar.on_update_style_direction = function () {
		var direction = this.currentstyle.direction = this.on_find_CurrentStyle_direction(this._pseudo);
		this.on_apply_style_direction(direction);
	};
	_pProgressBar.on_update_style_startimage = function () {
		var startimage = this.currentstyle.startimage = this.on_find_CurrentStyle_startImage(this._pseudo);
		this.on_apply_style_startimage(startimage);
	};
	_pProgressBar.on_update_style_progressimage = function () {
		var progressimage = this.currentstyle.progressimage = this.on_find_CurrentStyle_progressImage(this._pseudo);
		this.on_apply_style_progressimage(progressimage);
	};
	_pProgressBar.on_update_style_endimage = function () {
		var endimage = this.currentstyle.endimage = this.on_find_CurrentStyle_endImage(this._pseudo);
		this.on_apply_style_endimage(endimage);
	};
	_pProgressBar.on_update_style_barcolor = function () {
		var barcolor = this.currentstyle.barcolor = this.on_find_CurrentStyle_barColor(this._pseudo);
		this.on_apply_style_barcolor(barcolor);
	};
	_pProgressBar.on_update_style_bargradation = function () {
		var bargradation = this.currentstyle.bargradation = this.on_find_CurrentStyle_barGradation(this._pseudo);
		this.on_apply_style_bargradation(bargradation);
	};


	_pProgressBar.on_apply_style_bartype = function (bartype) {
		this._update();
	};

	_pProgressBar.on_apply_style_smooth = function (smooth) {
		if (!smooth) {
			return;
		}

		if (smooth == true && this.celllist && this.celllist.length > 1) {
			for (i = 1; i < this.celllist.length; i++) {
				this.celllist[i].destroy();
			}
		}
		this._update();
	};

	_pProgressBar.on_apply_style_direction = function (direction) {
		this._update();
	};

	_pProgressBar.on_apply_style_startimage = function (startimage) {
		if (!startimage) {
			return;
		}
		var imgurl = this._get_img_fullurl(startimage);
		var size = nexacro._getImageSize(imgurl, this._on_start_img, this, undefined, startimage);
		if (size != null) {
			this.start_img_width = size.width;
			this.start_img_url = imgurl;
			this._on_start_img(imgurl, size.width, size.height);
		}
	};

	_pProgressBar.on_apply_style_progressimage = function (progressimage) {
		if (!progressimage) {
			return;
		}
		var imgurl = this._get_img_fullurl(progressimage);
		var size = nexacro._getImageSize(imgurl, this._on_progress_img, this, undefined, progressimage);
		if (size != null) {
			this.progress_img_width = size.width;
			this.progress_img_url = imgurl;
			this._on_progress_img(imgurl, size.width, size.height);
		}
	};

	_pProgressBar.on_apply_style_endimage = function (endimage) {
		if (!endimage) {
			return;
		}
		var imgurl = this._get_img_fullurl(endimage);
		var size = nexacro._getImageSize(imgurl, this._on_end_img, this, undefined, endimage);
		if (size != null) {
			this.end_img_width = size.width;
			this.end_img_url = imgurl;
			this._on_end_img(imgurl, size.width, size.height);
		}
	};

	_pProgressBar.on_apply_style_barcolor = function (barcolor) {
		var cell_item = this.cellitem;
		if (!cell_item) {
			return;
		}

		barcolor = barcolor ? barcolor.toString() : "transparent";

		if (barcolor != "@gradation") {
			cell_item.style.set_background(barcolor);

			var cell_list = this.celllist;
			if (cell_list) {
				var cLen = cell_list.length;
				for (i = 1; i < cLen; i++) {
					cell_list[i].style.set_background(barcolor);
				}
			}
		}
	};

	_pProgressBar.on_apply_style_bargradation = function (bargradation) {
		var cell_item = this.cellitem;
		if (!cell_item || !bargradation) {
			return;
		}

		var barcolor = this.on_find_CurrentStyle_barColor(this._pseudo);
		barcolor = barcolor ? barcolor.toString() : "transparent";

		if (barcolor == "@gradation") {
			cell_item.style.set_background(barcolor);
			cell_item.on_update_style_gradation();

			var cell_list = this.celllist;
			if (cell_list) {
				var cLen = cell_list.length;
				for (var i = 1; i < cLen; i++) {
					cell_list[i].style.set_background(barcolor);
					cell_list[i].on_update_style_gradation();
				}
			}
		}
	};

	_pProgressBar.on_apply_style_color = function (color) {
		if (this._text_elem) {
			this._text_elem.setElementColor(color);
		}
	};

	_pProgressBar.on_apply_style_font = function (font) {
		if (this._text_elem) {
			this._text_elem.setElementFont(font);
			this._text_width = -1;
			this._text_height = -1;
		}
	};

	_pProgressBar.on_apply_style_align = function (align) {
		if (this._text_elem && align) {
			this._text_elem.setElementAlignXY(align.halign ? align._halign : "center", align.valign ? align._valign : "middle");
		}
	};

	_pProgressBar.on_create_contents = function () {
		var control_elem = this.getElement();
		if (control_elem) {
			if (this.text) {
				var text_elem = this._text_elem = new nexacro.TextBoxElement(control_elem);
				var align = this.on_find_CurrentStyle_align(this._pseudo);

				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(this.on_find_CurrentStyle_color(this._pseudo));
				text_elem.setElementFont(this.on_find_CurrentStyle_font(this._pseudo));
				text_elem.setElementAlignXY(align.halign ? align._halign : "center", align.valign ? align._valign : "middle");
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);
			}

			var curBartype = this.on_find_CurrentStyle_bartype(this._pseudo);
			if (curBartype != "image") {
				this.cellitem = new nexacro.ProgressBarCell("cell0", "absolute", 0, 0, 0, this._client_height, null, null, this);
				this.cellitem.createComponent();
			}
		}
	};

	_pProgressBar.on_created_contents = function () {
		this.on_apply_text(this.text);

		if (nexacro._enableaccessibility && this._isAccessibilityEnable()) {
			this._setAccessibilityInfoValueMin(this.min);
			this._setAccessibilityInfoValueMax(this.max);
			this._setAccessibilityInfoValueCur(this.pos);
		}

		var text_elem = this._text_elem;
		var cell_item = this.cellitem;

		if (cell_item) {
			cell_item.on_created();
		}

		if (text_elem) {
			text_elem.create();
		}


		this._update();
	};
	_pProgressBar.on_destroy_contents = function () {
		if (this._text_elem) {
			this._text_elem.destroy();
			delete this._text_elem;
			this._text_elem = null;
		}

		this._clear();

		this.statictext = null;
		this.style_list = null;
	};

	_pProgressBar._clear = function () {
		this._delete_cell();


		delete this.progress_img_list;
		this.progress_img_list = null;

		this._delete_img(this.start_img);
		delete this.start_img;
		this.start_img = null;

		this._delete_img(this.progress_img);
		this.progress_img = null;
		delete this.progress_img;

		this._delete_img(this.end_img);
		delete this.end_img;
		this.end_img = null;
	};

	_pProgressBar.on_change_containerRect = function (width, height) {
		var textElem = this._text_elem;
		if (textElem) {
			textElem.setElementSize(width, height);
		}
		this._update();
	};
	_pProgressBar._on_getAccessibilityAdditionalLabel = function () {
		var additional = "";
		if (this._isAccessibilityEnable()) {
			additional = (this.expr && this.expr.length > 0) ? this.displaytext + " " + this.min + " " + this.max : this.pos + " " + this.min + " " + this.max;
		}
		return additional;
	};

	_pProgressBar._on_getAccessibilityAdditionalRole = function () {
		if (this._getAccessibilityRole(this.on_find_CurrentStyle_accessibility(this._pseudo)) == "progressbar") {
			return " ProgressBar";
		}
		return "";
	};
	_pProgressBar.on_apply_text = function () {
		var control_elem = this._control_element;
		if (control_elem) {
			var text_elem = this._text_elem;
			if (!text_elem) {
				this._text_elem = new nexacro.TextBoxElement(control_elem);
				text_elem = this._text_elem;
				text_elem.setElementSize(this._client_width, this._client_height);
				var align = this.on_find_CurrentStyle_align(this._pseudo);

				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementAlignXY(align.halign ? align._halign : "center", align.valign ? align._valign : "middle");
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);

				text_elem.create();
			}

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
				exprfn = nexacro._createInlineFunc(conv_expr, ["comp", "pos"]);

				if (exprfn) {
					try {
						var val = nexacro._toString(exprfn.call(null, this, this.pos));
						if (val != this.displaytext) {
							this.displaytext = val;
							if (nexacro._enableaccessibility && this._isAccessibilityEnable()) {
								this._setAccessibilityValue(val);
								this._notifyAccessibility(val, "notify");
							}
						}
					}
					catch (e) {
						return;
					}
				}
			}
			else {
				this.displaytext = this.text;
			}

			text_elem.setElementText(this.displaytext);
			this.on_apply_style_align(this.currentstyle.align);

			text_elem = null;
		}
	};

	_pProgressBar.on_apply_expr = function () {
		this.on_apply_text();
	};

	_pProgressBar.set_blockgap = function (v) {
		if (this.blockgap != v) {
			var blockgap = parseInt(v) | 0;
			this.blockgap = (blockgap < 0) ? 0 : blockgap;
			this._update();
		}
	};

	_pProgressBar.set_blocksize = function (v) {
		if (this.blocksize != v) {
			var blocksize = parseInt(v) | 0;
			this.blocksize = (blocksize < 1) ? 1 : blocksize;
			this._update();
		}
	};

	_pProgressBar.set_min = function (v) {
		if (this.min != v) {
			var min = parseInt(v) | 0;
			var max = parseInt(this.max) | 0;
			var pos = parseInt(this.pos) | 0;
			this.min = min = (min < 0) ? 0 : min;

			if (min > max) {
				this.max = min;
			}
			if (min > pos) {
				this.pos = min;
			}

			if (nexacro._enableaccessibility && this._isAccessibilityEnable()) {
				this._setAccessibilityInfoValueMin(min);
			}
			this._update();
		}
	};

	_pProgressBar.set_max = function (v) {
		if (this.max != v) {
			var max = parseInt(v) | 0;
			var min = parseInt(this.min) | 0;
			var pos = parseInt(this.pos) | 0;
			this.max = max = (max < 0) ? 0 : max;

			if (max < min) {
				this.min = max;
			}
			if (max < pos) {
				this.pos = max;
			}

			if (nexacro._enableaccessibility && this._isAccessibilityEnable()) {
				this._setAccessibilityInfoValueMax(max);
			}
			this._update();
		}
	};

	_pProgressBar.set_pos = function (v) {
		v = parseInt(v) | 0;

		if (this.pos != v) {
			var pos = v;
			var min = parseInt(this.min) | 0;
			var max = parseInt(this.max) | 0;
			this.pos = pos = (pos < 0) ? 0 : pos;

			if (pos > max) {
				this.pos = pos = max;
			}
			else if (pos < min) {
				this.pos = pos = min;
			}

			if (nexacro._enableaccessibility && this._isAccessibilityEnable()) {
				this._setAccessibilityInfoValueCur(pos);
			}
		}
		this._update();
	};

	_pProgressBar.set_step = function (v) {
		if (this.step != v) {
			this.step = v;
			this._update();
		}
	};


	_pProgressBar.resize = function (w, h) {
		nexacro.Component.prototype.resize.call(this, w, h);
		this._update();
	};

	_pProgressBar.move = function (left, top, width, height, right, bottom) {
		nexacro.Component.prototype.move.call(this, left, top, width, height, right, bottom);
		this._update();
	};

	_pProgressBar.stepIt = function () {
		var min = this.min, max = this.max;
		var pos = (parseInt(this.pos) | 0) + (parseInt(this.step) | 0);

		if (parseInt(max) < pos) {
			this.pos = max;
			return;
		}
		else if (parseInt(min) > pos) {
			this.pos = min;
			return;
		}
		else {
			this.pos = pos;
		}
		this._update();
	};

	_pProgressBar._update = function () {
		var type = this.on_find_CurrentStyle_bartype() || nexacro.ProgressBar._default_bartype;

		if (type == "normal") {
			this._update_cell();
			return;
		}

		this._update_img();
	};

	_pProgressBar._update_cell = function () {
		this._delete_cell();

		this._delete_img(this.start_img);
		this._delete_img(this.end_img);

		if (this.progress_img_list) {
			var len = this.progress_img_list.length;
			for (var i = 0; i < len; i++) {
				this._delete_img(this.progress_img_list[i]);
			}

			this.progress_img_list = [];
		}

		if (this.pos == 0) {
			this._clear();
			this.on_apply_text(this.text);
			return;
		}


		var height = this._client_height;
		var width = this._client_width;
		if (this.cellitem == null) {
			this.cellitem = new nexacro.ProgressBarCell("cell_0", "absolute", 0, 0, 0, height, null, null, this);
			this.cellitem.createComponent();
		}

		var cellitem = this.cellitem;
		var cell_list = this.celllist;
		var l, t, w, h;
		var block_size = 1;
		var pos = parseInt(this.pos) | 0;
		var max = parseInt(this.max) | 0;
		var min = parseInt(this.min) | 0;
		var per = (pos - min) / (max - min);
		var smooth = this.on_find_CurrentStyle_smooth(this._pseudo);
		var direction = this.on_find_CurrentStyle_direction(this._pseudo);
		var blocksize = parseInt(this.blocksize) | 0;
		var blockgap = parseInt(this.blockgap) | 0;

		if (smooth == "true") {
			if (direction == "backward") {
				t = cellitem._adjust_top;
				w = parseInt(width * per) | 0;
				l = width - parseInt(width * per) | 0;
				h = height;
			}
			else {
				l = 0;
				t = 0;
				w = parseInt(width * per) | 0;
				h = height;
			}
			cellitem._applysetPosition(l, t, w, h);

			cellitem.show();
		}
		else {
			if (direction == "backward") {
				w = blocksize;
				l = width - blocksize;
				t = cellitem._adjust_top;
				h = cellitem._adjust_height;

				cellitem._applysetPosition(l, t, w, h);

				cell_list[0] = cellitem;

				block_size = blockgap + blocksize;

				var size = Math.ceil((width / block_size) * per);
				for (var i = size; i > 0; i--) {
					l = width - (i * block_size);
					t = 0;

					w = blocksize;
					h = height;
					cell_list[i] = new nexacro.ProgressBarCell("cell_" + i, "absolute", l + blockgap, t, w, h, null, null, this);
					cell_list[i].createComponent();
				}
				this.celllist = cell_list;
			}
			else {
				l = cellitem._adjust_left;
				t = cellitem._adjust_top;

				h = cellitem._adjust_height;
				w = blocksize;
				cellitem._applysetPosition(l, t, w, h);

				cell_list[0] = cellitem;

				block_size = blockgap + blocksize;

				var size = Math.ceil((width / block_size) * per);
				for (var i = 1; i < size; i++) {
					l = (i * block_size);
					t = 0;

					w = blocksize;
					h = height;
					cell_list[i] = new nexacro.ProgressBarCell("cell_" + i, "absolute", l, t, w, h, null, null, this);
					cell_list[i].createComponent();
				}
				this.celllist = cell_list;
			}
		}


		if (this._text_elem) {
			this._text_elem.destroy();
			delete this._text_elem;
			this._text_elem = null;
		}

		var control_elem = this.getElement();
		if (control_elem) {
			this._text_elem = new nexacro.TextBoxElement(control_elem);
			var text_elem = this._text_elem;
			var halign = this.currentstyle.align ? (this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign) : "center";
			var valign = this.currentstyle.align ? (this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign) : "middle";
			text_elem.setElementSize(this._client_width, this._client_height);
			text_elem.setElementColor(this.currentstyle.color);
			text_elem.setElementFont(this.currentstyle.font);
			text_elem.setElementAlignXY(halign, valign);
			text_elem.setElementLetterSpace(this.currentstyle.letterspace);

			if (text_elem) {
				text_elem.create();
			}

			this.on_apply_style_align(this.currentstyle.align);
			this.on_apply_style_barcolor(this.currentstyle.barcolor);
			this.on_apply_style_bargradation(this.currentstyle.bargradation);

			this.on_apply_text(this.text);
		}


		var cellitem = null;
		var cell_list = null;
	};

	_pProgressBar._delete_cell = function () {
		if (this.celllist) {
			var len = this.celllist.length;
			for (var i = 0; i < len; i++) {
				this.celllist[i].destroy();
				delete this.celllist[i];
			}
			this.celllist = [];
		}

		if (this.cellitem) {
			this.cellitem.destroy();
			delete this.cellitem;
			this.cellitem = null;
		}
	};

	_pProgressBar._on_start_img = function (imgurl, w, h) {
		this.start_img_width = w;
		this.start_img_url = imgurl;
		this._update_img();
	};

	_pProgressBar._on_progress_img = function (imgurl, w, h) {
		this.progress_img_width = w;
		this.progress_img_url = imgurl;
		this._update_img();
	};

	_pProgressBar._on_end_img = function (imgurl, w, h) {
		this.end_img_width = w;
		this.end_img_url = imgurl;
		this._update_img();
	};

	_pProgressBar._create_img = function (img, img_val, id) {
		if (img_val != null && img_val != "") {
			img = new nexacro.ProgressBarImg(id, "absolute", 0, 0, 0, this._client_height, null, null, this);
			img.createComponent();

			if (id == "startImg") {
				img_val = this.currentstyle.startimage;
			}
			else if (id == "endImg") {
				img_val = this.currentstyle.endimage;
			}
			else {
				img_val = this.currentstyle.progressimage;
			}

			img.style.set_background("URL('" + img_val + "') stretch");

			try {
				return img;
			}
			finally {
				delete img;
				img = null;
			}
		}
	};
	_pProgressBar._delete_img = function (img) {
		if (img) {
			img.destroy();
		}
	};
	_pProgressBar._get_img_fullurl = function (img) {
		url = nexacro._toString(img);
		if (url.substring(0, 4).toLowerCase() == "url(") {
			url = url.substring(5, url.length - 2);
		}

		url = nexacro._getImageLocation(url, this._getRefFormBaseUrl());
		return url;
	};

	_pProgressBar._update_img = function () {
		var type = this.on_find_CurrentStyle_bartype();
		var progressimg = this.on_find_CurrentStyle_progressImage();

		if ((type && type.value == "normal") || (progressimg && progressimg.value == "")) {
			return;
		}

		this._delete_cell();

		var direction = this.currentstyle.direction;

		if (type == "image") {
			this._delete_img(this.start_img);
			this._delete_img(this.end_img);
			if (this.progress_img_list) {
				var len = this.progress_img_list.length;
				for (var i = 0; i < len; i++) {
					this._delete_img(this.progress_img_list[i]);
				}

				this.progress_img_list = [];
			}

			if (this.pos == 0) {
				this._clear();
				this.on_apply_text(this.text);
				return;
			}

			if (!this.progress_img_list) {
				this.progress_img_list = new Array();
			}

			var progress_w = this.progress_img_width;
			var start_w = 0, end_w = 0, cnt = 0, l = 0, t = 0, r = 0;
			var height = this._client_height;
			var width = this._client_width;
			var pos = parseInt(this.pos) | 0;
			var max = parseInt(this.max) | 0;
			var min = parseInt(this.min) | 0;
			var b = height;
			var posX = parseInt(((pos - min) / (max - min)) * width) | 0;


			this.start_img = this._create_img(this.start_img, this.start_img_url, "startImg");
			if (this.start_img) {
				start_w = this.start_img_width;
			}

			this.end_img = this._create_img(this.end_img, this.end_img_url, "endImg");
			if (this.end_img) {
				end_w = this.end_img_width;
			}

			cnt = parseInt((posX - start_w - end_w) / progress_w) | 0;

			if (direction == "backward") {
				if (this.end_img && this.progress_img) {
					l = width - end_w;
					this.end_img._applysetPosition(l, t, end_w, b);
				}

				var progress_img = null;
				var pImg_start = width - progress_w;

				for (var i = 0; i < cnt; i++) {
					progress_img = this._create_img(this.progress_img, this.progress_img_url, "pImg" + i);

					l = pImg_start - (progress_w * i);
					t = 0;
					progress_img._applysetPosition(l, t, progress_w, b);
					this.progress_img_list[i] = progress_img;
				}

				if (this.start_img) {
					l = l - start_w;
					this.start_img._applysetPosition(l, t, start_w, b);
				}
			}
			else {
				for (var i = 0; i < cnt; i++) {
					this.progress_img = this._create_img(this.progress_img, this.progress_img_url, "pImg" + i);
					this.progress_img_list[i] = this.progress_img;
				}

				if (this.start_img) {
					r = start_w;
					this.start_img._applysetPosition(l, t, r - l, b - t);
				}

				for (var i = 0; i < cnt; i++) {
					if (i > 0) {
						var img_item = this.progress_img_list[i - 1];
						l = img_item._adjust_left + img_item._adjust_width;
						t = 0;
						r = l + progress_w;
						b = height;
					}
					else {
						if (this.start_img) {
							l = this.start_img._adjust_left + this.start_img._adjust_width;
							r = l + progress_w;
						}
						else {
							l = 0;
							r = progress_w;
						}
					}
					this.progress_img_list[i]._applysetPosition(l, t, r - l, b - t);
					this.progress_img = this.progress_img_list[i];
				}

				if (this.end_img && this.progress_img) {
					l = this.progress_img._adjust_left + this.progress_img._adjust_width;
					r = l + end_w;
					this.end_img._applysetPosition(l, t, r - l, b - t);
				}
			}

			if (this._text_elem) {
				this._text_elem.destroy();
				delete this._text_elem;
				this._text_elem = null;
			}

			var control_elem = this.getElement();
			if (control_elem) {
				this._text_elem = new nexacro.TextBoxElement(control_elem);
				var text_elem = this._text_elem;
				var halign = this.currentstyle.align ? (this.currentstyle.align.halign == "" ? "center" : this.currentstyle.align._halign) : "center";
				var valign = this.currentstyle.align ? (this.currentstyle.align.valign == "" ? "middle" : this.currentstyle.align._valign) : "middle";
				text_elem.setElementSize(this._client_width, this._client_height);
				text_elem.setElementColor(this.currentstyle.color);
				text_elem.setElementFont(this.currentstyle.font);
				text_elem.setElementAlignXY(halign, valign);
				text_elem.setElementLetterSpace(this.currentstyle.letterspace);

				if (text_elem) {
					text_elem.create();
				}

				this.on_apply_text(this.text);
			}
		}
	};

	delete _pProgressBar;

	nexacro.ProgressBarCell = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;
	};
	_pProgressBarCell = nexacro.ProgressBarCell.prototype = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.ProgressBarCell);

	_pProgressBarCell.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent._find_pseudo_obj("bargradation", pseudo, "gradation");
	};

	_pProgressBarCell.on_find_CurrentStyle_padding = nexacro._emptyFn;
	_pProgressBarCell.on_apply_style_color = nexacro._emptyFn;
	_pProgressBarCell.on_apply_style_font = nexacro._emptyFn;
	_pProgressBarCell.on_apply_style_align = nexacro._emptyFn;
	_pProgressBarCell.on_apply_expr = nexacro._emptyFn;
	_pProgressBarCell.on_apply_wordwrap = nexacro._emptyFn;

	delete _pProgressBarCell;

	nexacro.ProgressBarImg = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);

		this._is_reference_control = false;
	};
	_pProgressBarImg = nexacro.ProgressBarImg.prototype = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.ProgressBarImg);

	_pProgressBarImg.on_find_CurrentStyle_border = nexacro._emptyFn;
	_pProgressBarImg.on_find_CurrentStyle_padding = nexacro._emptyFn;
	_pProgressBarImg.on_apply_style_color = nexacro._emptyFn;
	_pProgressBarImg.on_apply_style_font = nexacro._emptyFn;
	_pProgressBarImg.on_apply_style_align = nexacro._emptyFn;
	_pProgressBarImg.on_apply_expr = nexacro._emptyFn;
	_pProgressBarImg.on_apply_wordwrap = nexacro._emptyFn;

	delete _pProgressBarImg;

	nexacro.ProgressBarCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ProgressBar.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pProgressBarCtrl = nexacro.ProgressBarCtrl.prototype = nexacro._createPrototype(nexacro.ProgressBar, nexacro.ProgressBarCtrl);
	_pProgressBarCtrl._type_name = "ProgressBarControl";

	_pProgressBarCtrl._is_focus_accept = false;

	nexacro._setForControlStyleFinder(_pProgressBarCtrl);

	delete _pProgressBarCtrl;
}

