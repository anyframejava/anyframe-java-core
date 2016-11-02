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

if (!nexacro.GroupBox) {
	nexacro.GroupBox_Style = function (target) {
		nexacro.Style.call(this);
		if (target) {
			this._target = target;
		}
	};

	var _pGroupBoxStyle = nexacro._createPrototype(nexacro.Style, nexacro.GroupBox_Style);
	nexacro.GroupBox_Style.prototype = _pGroupBoxStyle;

	eval(nexacro._createBackgroundAttributeEvalStr("_pGroupBoxStyle", "titlebackground"));
	eval(nexacro._createGradationAttributeEvalStr("_pGroupBoxStyle", "titlegradation"));
	eval(nexacro._createValueAttributeEvalStr("_pGroupBoxStyle", "titleimage"));
	eval(nexacro._createAlignAttributeEvalStr("_pGroupBoxStyle", "titleimagealign"));
	eval(nexacro._createPaddingAttributeEvalStr("_pGroupBoxStyle", "titleimagepadding"));
	eval(nexacro._createPaddingAttributeEvalStr("_pGroupBoxStyle", "titlepadding"));
	eval(nexacro._createValueAttributeEvalStr("_pGroupBoxStyle", "titleview"));

	_pGroupBoxStyle.__custom_emptyObject = function () {
		this.titlebackground = null;
		this.titlegradation = null;
		this.titleimage = null;
		this.titleimagealign = null;
		this.titleimagepadding = null;
		this.titlepadding = null;
		this.titleview = null;
	};

	_pGroupBoxStyle.__get_custom_style_value = function () {
		var val = "";

		if (this.titlebackground && !this.titlebackground._is_empty) {
			val += "titlebackground:" + this.titlebackground._value + "; ";
		}
		if (this.titlegradation && !this.titlegradation._is_empty) {
			val += "titlegradation:" + this.titlegradation._value + "; ";
		}
		if (this.titleimage && !this.titleimage._is_empty) {
			val += "titleimage:" + this.titleimage._value + "; ";
		}
		if (this.titleimagealign && !this.titleimagealign._is_empty) {
			val += "titleimagealign:" + this.titleimagealign._value + "; ";
		}
		if (this.titleimagepadding && !this.titleimagepadding._is_empty) {
			val += "titleimagepadding:" + this.titleimagepadding._value + "; ";
		}
		if (this.titlepadding && !this.titlepadding._is_empty) {
			val += "titlepadding:" + this.titlepadding._value + "; ";
		}
		if (this.titleview && !this.titleview._is_empty) {
			val += "titleview:" + this.titleview._value + "; ";
		}
		return val;
	};


	nexacro.GroupBox_CurrentStyle = function () {
		nexacro.CurrentStyle.call(this);

		this.titlebackground = null;
		this.titlegradation = null;
		this.titleimage = null;
		this.titleimagealign = null;
		this.titleimagepadding = null;
		this.titlepadding = null;
		this.titleview = null;
	};

	var _pGroupBoxCurrentStyle = nexacro._createPrototype(nexacro.CurrentStyle, nexacro.GroupBox_CurrentStyle);
	nexacro.GroupBox_CurrentStyle.prototype = _pGroupBoxCurrentStyle;

	_pGroupBoxCurrentStyle.__custom_emptyObject = _pGroupBoxStyle.__custom_emptyObject;
	_pGroupBoxCurrentStyle.__get_custom_style_value = _pGroupBoxStyle.__get_custom_style_value;

	delete _pGroupBoxStyle;
	delete _pGroupBoxCurrentStyle;

	nexacro.GroupBox = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.Component.call(this, id, position, left, top, width, height, right, bottom, parent);

		this.titlealign = "topleft";

		this.mainStatic = null;
		this.titleButton = null;
		this.leftStatic = null;
		this.rightStatic = null;
		this.sizechange = 0;

		this._image_width = 0;
		this._image_height = 0;

		this.tabstop = false;
		this._is_focus_accept = false;
		this._accessibility_role = "groupbox";


		this._event_list = {
			"onlbuttondown" : 1, 
			"onlbuttonup" : 1, 
			"onmouseenter" : 1, 
			"onmouseleave" : 1, 
			"onmousemove" : 1, 
			"onmove" : 1, 
			"onsize" : 1, 
			"ontouchstart" : 1, 
			"ontouchmove" : 1, 
			"ontouchend" : 1, 
			"onflingstart" : 1, 
			"onfling" : 1, 
			"onflingend" : 1, 
			"onpinchstart" : 1, 
			"onpinch" : 1, 
			"onpinchend" : 1, 
			"onlongpress" : 1, 
			"onslidestart" : 1, 
			"onslide" : 1, 
			"onslideend" : 1
		};
	};

	var _pGroupBox = nexacro._createPrototype(nexacro.Component, nexacro.GroupBox);
	nexacro.GroupBox.prototype = _pGroupBox;
	_pGroupBox._type_name = "GroupBox";

	nexacro.GroupBox._default_title_view = nexacro._getCachedStyleObj("titleview", "horizontal");

	_pGroupBox.on_create_custom_style = function () {
		return new nexacro.GroupBox_Style(this);
	};

	_pGroupBox.on_create_custom_currentStyle = function () {
		return new nexacro.GroupBox_CurrentStyle();
	};

	_pGroupBox.on_apply_custom_pseudo = function (pseudo) {
		if (!pseudo) {
			pseudo = this._pseudo;
		}
		var curstyle = this.currentstyle;
		var titlebackground = this.on_find_CurrentStyle_titleBackground(pseudo);
		var titlegradation = this.on_find_CurrentStyle_titleGradation(pseudo);
		var titleimage = this.on_find_CurrentStyle_titleImage(pseudo);
		var titleimagealign = this.on_find_CurrentStyle_titleImageAlign(pseudo);
		var titleimagepadding = this.on_find_CurrentStyle_titleImagePadding(pseudo);
		var titlepadding = this.on_find_CurrentStyle_titlePadding(pseudo);
		var titleview = this.on_find_CurrentStyle_titleView(pseudo);
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

		if (titlebackground != curstyle.titlebackground) {
			curstyle.titlebackground = titlebackground;
			this.on_apply_style_titlebackground(titlebackground);
		}
		if (titlegradation != curstyle.titlegradation) {
			curstyle.titlegradation = titlegradation;
			this.on_apply_style_titlegradation(titlegradation);
		}
		if (titleimage != curstyle.titleimage) {
			curstyle.titleimage = titleimage;
			this.on_apply_style_titleimage(titleimage);
		}
		if (titleimagealign != curstyle.titleimagealign) {
			curstyle.titleimagealign = titleimagealign;
			this.on_apply_style_titleimagealign(titleimagealign);
		}
		if (titleimagepadding != curstyle.titleimagepadding) {
			curstyle.titleimagepadding = titleimagepadding;
			this.on_apply_style_titleimagepadding(titleimagepadding);
		}
		if (titlepadding != curstyle.titlepadding) {
			curstyle.titlepadding = titlepadding;
			this.on_apply_style_titlepadding(titlepadding);
		}
		if (titleview != curstyle.titleview) {
			curstyle.titleview = titleview;
			this.on_apply_style_titleview(titleview);
		}
		this._title_Border();

		var rtlimagemirroring = this.on_find_CurrentStyle_rtlimagemirroring(pseudo);
		if (rtlimagemirroring != curstyle.rtlimagemirroring) {
			curstyle.rtlimagemirroring = rtlimagemirroring;
			this.on_apply_style_rtlimagemirroring(rtlimagemirroring);
		}
	};


	_pGroupBox.on_find_CurrentStyle_titleBackground = function (pseudo) {
		return this._find_pseudo_obj("titlebackground", pseudo, "background");
	};
	_pGroupBox.on_find_CurrentStyle_titleGradation = function (pseudo) {
		return this._find_pseudo_obj("titlegradation", pseudo, "gradation");
	};
	_pGroupBox.on_find_CurrentStyle_titleImage = function (pseudo) {
		return this._find_pseudo_obj("titleimage", pseudo);
	};
	_pGroupBox.on_find_CurrentStyle_titleImageAlign = function (pseudo) {
		var titleimagealign = this._find_pseudo_obj("titleimagealign", pseudo, "align");
		return titleimagealign ? titleimagealign : nexacro.Component._default_buttonimg_align;
	};
	_pGroupBox.on_find_CurrentStyle_titleImagePadding = function (pseudo) {
		return this._find_pseudo_obj("titleimagepadding", pseudo, "padding");
	};
	_pGroupBox.on_find_CurrentStyle_titlePadding = function (pseudo) {
		return this._find_pseudo_obj("titlepadding", pseudo, "padding");
	};
	_pGroupBox.on_find_CurrentStyle_titleView = function (pseudo) {
		var titleview = this._find_pseudo_obj("titleview", pseudo);
		return (titleview) ? titleview : nexacro.GroupBox._default_title_view;
	};


	_pGroupBox.on_update_style_titlebackground = function () {
		var titlebackground = this.currentstyle.titlebackground = this.on_find_CurrentStyle_titleBackground(this._pseudo);
		this.on_apply_style_titlebackground(titlebackground);
	};
	_pGroupBox.on_update_style_titlegradation = function () {
		var titlegradation = this.currentstyle.titlegradation = this.on_find_CurrentStyle_titleGradation(this._pseudo);
		this.on_apply_style_titlegradation(titlegradation);
	};
	_pGroupBox.on_update_style_titleimage = function () {
		var titleimage = this.currentstyle.titleimage = this.on_find_CurrentStyle_titleImage(this._pseudo);
		this.on_apply_style_titleimage(titleimage);
	};
	_pGroupBox.on_update_style_titleimagealign = function () {
		var titleimagealign = this.currentstyle.titleimagealign = this.on_find_CurrentStyle_titleImageAlign(this._pseudo);
		this.on_apply_style_titleimagealign(titleimagealign);
	};
	_pGroupBox.on_update_style_titleimagepadding = function () {
		var titleimagepadding = this.currentstyle.titleimagepadding = this.on_find_CurrentStyle_titleImagePadding(this._pseudo);
		this.on_apply_style_titleimagepadding(titleimagepadding);
	};
	_pGroupBox.on_update_style_titlepadding = function () {
		var titlepadding = this.currentstyle.titlepadding = this.on_find_CurrentStyle_titlePadding(this._pseudo);
		this.on_apply_style_titlepadding(titlepadding);
	};
	_pGroupBox.on_update_style_titleview = function () {
		var titleview = this.currentstyle.titleview = this.on_find_CurrentStyle_titleView(this._pseudo);
		this.on_apply_style_titleview(titleview);
	};


	_pGroupBox.on_apply_style_titlebackground = function (titlebackground) {
		if (this.titleButton && titlebackground) {
			this.titleButton.style.set_background(titlebackground);
		}
	};

	_pGroupBox.on_apply_style_titlegradation = function (titlegradation) {
		if (this.titleButton && titlegradation) {
			this.titleButton.style.set_gradation(titlegradation);
		}
	};

	_pGroupBox.on_apply_style_titleimage = function (titleimage) {
		if (this.titleButton && titleimage) {
			this.titleButton._load_image(titleimage);
		}
	};

	_pGroupBox.on_apply_style_titleimagealign = function (titleimagealign) {
		var titleimage = this.on_find_CurrentStyle_titleImage(this._pseudo);
		var titleButton = this.titleButton;
		if (titleButton && titleimage && titleimagealign) {
			this._applyTitleSize();
			titleButton.on_apply_style_imagealign(titleimagealign);
		}
	};

	_pGroupBox.on_apply_style_titleimagepadding = function (titleimagepadding) {
	};

	_pGroupBox.on_apply_style_titlepadding = function (titlepadding) {
		if (this.titleButton) {
			this.titleButton.style.set_padding(titlepadding);
		}
	};

	_pGroupBox.on_apply_style_titleview = function (titleview) {
	};

	_pGroupBox.on_apply_style_font = function (font) {
		if (this.titleButton) {
			this.titleButton.on_apply_style_font(font);
			this._applyTitleSize();
		}
	};

	_pGroupBox.on_apply_style_color = function (color) {
		if (this.titleButton) {
			this.titleButton.on_apply_style_color(color);
		}
	};

	_pGroupBox.on_apply_style_letterspace = function (letterspace) {
		if (this.titleButton) {
			this.titleButton.style.set_letterspace(this.currentstyle.letterspace);
			this._applyTitleSize();
		}
	};

	_pGroupBox.on_apply_prop_rtldirection = function () {
		nexacro.Component.prototype.on_apply_prop_rtldirection.call(this);
		this.on_change_containerRect();

		var _rtldirection = this._rtldirection;

		var titleButton = this.titleButton;
		var mainStatic = this.mainStatic;
		var leftStatic = this.leftStatic;
		var rightStatic = this.rightStatic;

		if (titleButton) {
			titleButton._setRtlDirection(_rtldirection);
		}
		if (mainStatic) {
			mainStatic._setRtlDirection(_rtldirection);
		}
		if (leftStatic) {
			leftStatic._setRtlDirection(_rtldirection);
		}
		if (rightStatic) {
			rightStatic._setRtlDirection(_rtldirection);
		}
	};

	_pGroupBox.on_create_contents = function () {
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
			}
		}
	};

	_pGroupBox.on_created_contents = function () {
		var text_elem = this._text_elem;
		var img_elem = this._img_elem;
		if (img_elem) {
			img_elem.create();
		}
		if (text_elem) {
			text_elem.create();
		}

		this._createGroupSubObj();
		this.on_apply_text(this.text);
		this.on_apply_style_color(this.currentstyle.color);
		this.on_apply_style_font(this.currentstyle.font);
		this.on_apply_style_letterspace(this.currentstyle.letterspace);
		this.on_apply_style_titleimage(this.currentstyle.titleimage);
		this._applyTitleSize();
		this.on_apply_style_titlepadding(this.currentstyle.titlepadding);
		this.on_apply_style_titleimagealign(this.currentstyle.titleimagealign);
		this.on_apply_style_titleimagepadding(this.currentstyle.titleimagepadding);
		this.on_apply_style_titleview(this.currentstyle.titleview);

		this.on_apply_prop_rtldirection();
	};

	_pGroupBox.on_destroy_contents = function () {
		var textElem = this._text_elem;
		var imgElem = this._img_elem;
		if (textElem) {
			textElem.destroy();
			this._text_elem = null;
		}
	};

	_pGroupBox.on_change_containerRect = function (width, height) {
		var textElem = this._text_elem;

		if (textElem) {
			textElem.setElementSize(width, height);
		}

		if (this.mainStatic && this.leftStatic && this.rightStatic && this.titleButton) {
			this._applyTitleSize();
		}

		this._title_Border();
	};

	_pGroupBox.set_titlealign = function (v) {
		var val = v.toString();
		if (val != this.titlealign) {
			this.titlealign = v;
			this.on_apply_titlealign();
		}
	};

	_pGroupBox.on_apply_titlealign = function () {
		var titlealign = this.titlealign;

		var titleButton = this.titleButton;
		var mainStatic = this.mainStatic;
		var leftStatic = this.leftStatic;
		var rightStatic = this.rightStatic;

		var _bordertype = this.on_find_CurrentStyle_bordertype(this._pseudo);
		var title_w_gap = parseInt(_bordertype.radiusx);
		var title_h_gap = parseInt(_bordertype.radiusy);

		if (!this.currentstyle.border && !titleButton || !mainStatic || !leftStatic || !rightStatic) {
			return false;
		}

		var rc_w = this._adjust_width;
		var rc_h = this._adjust_height;

		var title_l = titleButton._adjust_left;
		var title_t = titleButton._adjust_top;
		var title_w = titleButton._adjust_width;
		var title_h = titleButton._adjust_height;

		var titlepadding = this.on_find_CurrentStyle_titlePadding(this._pseudo);

		if (titlepadding) {
			title_w += (titlepadding.left + titlepadding.right);
			title_h += (titlepadding.top + titlepadding.bottom);
		}

		var mini_w = rc_w - 20;
		var mini_h = rc_h - 20;
		if (mini_w < title_w) {
			title_w = mini_w > 0 ? mini_w : 0;
		}
		if (mini_h < title_h) {
			title_h = mini_h > 0 ? mini_h : 0;
		}

		var _border = this.on_find_CurrentStyle_border(this._pseudo);
		var border_width = parseInt(_border.width);

		var border_l_width = parseInt(_border.left_width);
		var border_t_width = parseInt(_border.top_width);
		var border_r_width = parseInt(_border.right_width);
		var border_b_width = parseInt(_border.bottom_width);

		if (titlealign == "topcenter") {
			var static_width = Math.floor((rc_w - title_w) / 2);
			var static_top = Math.floor(title_h / 2);
			var static_height = rc_h - static_top;
			var r_static_left = static_width + title_w + border_r_width;
			var r_static_width = rc_w - static_width - title_w;

			this.mainStatic.move(0, static_top, rc_w, static_height);
			this.leftStatic.move(0, static_top, static_width, static_height);
			this.rightStatic.move(r_static_left, static_top, r_static_width, static_height);
			titleButton.move(static_width, 0, title_w, title_h);
		}
		else if (titlealign == "topright") {
			var static_width = rc_w - title_w_gap - title_w - border_width;
			var static_top = Math.floor(title_h / 2);
			var static_height = rc_h - static_top;
			var r_static_left = rc_w - title_w_gap - border_width;
			var r_static_width = rc_w - r_static_left;

			this.mainStatic.move(0, static_top, rc_w, static_height);
			this.leftStatic.move(0, static_top, static_width, static_height);
			this.rightStatic.move(r_static_left, static_top, r_static_width, static_height);
			titleButton.move(static_width, 0, title_w, title_h);
		}
		else if (titlealign == "righttop") {
			var static_width = rc_w - Math.floor(title_w / 2);
			var b_static_top = title_h_gap + title_h;


			this.mainStatic.move(0, 0, static_width, rc_h);
			this.leftStatic.move(0, 0, static_width, title_h_gap);
			this.rightStatic.move(0, b_static_top, static_width, rc_h - b_static_top);
			titleButton.move(rc_w - title_w, title_h_gap, title_w, title_h);
		}
		else if (titlealign == "rightcenter") {
			var static_width = rc_w - Math.floor(title_w / 2);
			var t_static_height = Math.floor((rc_h - title_h) / 2);

			this.mainStatic.move(0, 0, static_width, rc_h - border_b_width);
			this.leftStatic.move(0, 0, static_width, t_static_height);
			this.rightStatic.move(0, t_static_height + title_h, static_width, t_static_height);
			titleButton.move(rc_w - title_w, t_static_height, title_w, title_h);
		}
		else if (titlealign == "rightbottom") {
			var static_width = rc_w - Math.floor(title_w / 2);
			var t_static_h = title_h_gap + title_h;

			this.mainStatic.move(0, 0, static_width, rc_h);
			this.leftStatic.move(0, 0, static_width, rc_h - t_static_h);
			this.rightStatic.move(0, rc_h - title_h_gap, static_width, title_h_gap);
			titleButton.move(rc_w - title_w, rc_h - t_static_h, title_w, title_h);
		}
		else if (titlealign == "bottomright") {
			var static_width = rc_w - title_w_gap - title_w;
			var static_height = rc_h - Math.floor(title_h / 2);
			var r_static_left = rc_w - title_w_gap;


			this.mainStatic.move(0, 0, rc_w, static_height);
			this.leftStatic.move(0, 0, static_width, static_height);
			this.rightStatic.move(r_static_left, 0, title_w_gap, static_height);
			titleButton.move(static_width, rc_h - title_h, title_w, title_h);
		}
		else if (titlealign == "bottomcenter") {
			var static_width = Math.floor((rc_w - title_w) / 2);
			var static_height = rc_h - Math.floor(title_h / 2);
			var r_static_left = static_width + title_w + border_r_width;
			var r_static_width = rc_w - static_width - title_w;

			this.mainStatic.move(0, 0, rc_w, static_height);
			this.leftStatic.move(0, 0, static_width, static_height);
			this.rightStatic.move(r_static_left, 0, r_static_width, static_height);
			titleButton.move(static_width, rc_h - title_h, title_w, title_h);
		}
		else if (titlealign == "bottomleft") {
			var static_width = rc_w - title_w_gap - title_w;
			var static_height = rc_h - Math.floor(title_h / 2);
			var r_static_left = title_w_gap + title_w;
			var r_static_width = rc_w - r_static_left + border_r_width;


			this.mainStatic.move(0, 0, rc_w, static_height);
			this.leftStatic.move(0, 0, title_w_gap, static_height);
			this.rightStatic.move(r_static_left, 0, r_static_width, static_height);
			titleButton.move(title_w_gap, rc_h - title_h, title_w, title_h);
		}
		else if (titlealign == "leftbottom") {
			var static_left = Math.floor(title_w / 2);
			var static_width = rc_w - static_left;
			var t_static_h = title_h_gap + title_h;

			this.mainStatic.move(static_left, 0, static_width, rc_h);
			this.leftStatic.move(static_left, 0, static_width, rc_h - t_static_h);
			this.rightStatic.move(static_left, rc_h - title_h_gap, static_width, title_h_gap);
			titleButton.move(0, rc_h - t_static_h, title_w, title_h);
		}
		else if (titlealign == "leftcenter") {
			var static_left = Math.floor(title_w / 2);
			var static_width = rc_w - static_left;
			var t_static_height = Math.floor((rc_h - title_h) / 2);
			var r_static_height = rc_h - t_static_height - title_h - border_b_width;

			this.mainStatic.move(static_left, 0, static_width, rc_h - border_b_width);
			this.leftStatic.move(static_left, 0, static_width, t_static_height);
			this.rightStatic.move(static_left, t_static_height + title_h, static_width, r_static_height);
			titleButton.move(0, t_static_height, title_w, title_h);
		}
		else if (titlealign == "lefttop") {
			var static_left = Math.floor(title_w / 2);
			var static_width = rc_w - static_left;
			var b_static_top = title_h_gap + title_h;


			this.mainStatic.move(static_left, 0, static_width, rc_h);
			this.leftStatic.move(static_left, 0, static_width, title_h_gap);
			this.rightStatic.move(static_left, b_static_top, static_width, rc_h - b_static_top);
			titleButton.move(0, title_h_gap, title_w, title_h);
		}
		else {
			var static_top = Math.floor(title_h / 2);
			var static_height = rc_h - static_top;

			var l_static_width = title_w_gap + border_l_width;
			var r_static_left = l_static_width + title_w;
			var r_static_width = rc_w - r_static_left + border_r_width;
			title_l = l_static_width;

			this.mainStatic.move(0, static_top, rc_w, static_height);
			this.leftStatic.move(0, static_top, l_static_width, static_height + 10);
			this.rightStatic.move(r_static_left, static_top, r_static_width, static_height);
			titleButton.move(title_l, title_t, title_w, title_h);
		}

		this._title_Border();
	};

	_pGroupBox.set_text = function (v) {
		var val = v;
		if (val === undefined || val === null) {
			val = "";
		}
		else {
			val = v.toString();
		}

		if (val != this.text) {
			this.text = this._display_text = val;
			var titleButton = this.titleButton;

			this.on_apply_text(val);
			this.on_apply_style_color(this.currentstyle.color);
			this.on_apply_style_font(this.currentstyle.font);
			this.on_apply_style_align(this.currentstyle.align);
			this.on_apply_titlealign();

			if (titleButton) {
				this._applyTitleSize();
				this.bRectChange = true;
			}
		}
		return this.text;
	};

	_pGroupBox.on_apply_text = function (text) {
		var val = text;
		if (this.titleButton != null) {
			this.titleButton.style.set_letterspace(this.currentstyle.letterspace);
			this.titleButton.set_text(val);
		}
	};



	_pGroupBox.on_get_prop_tabstop = function () {
		if (nexacro._enableaccessibility) {
			var accessibility = this.on_find_CurrentStyle_accessibility(this._pseudo);
			if (accessibility && accessibility.enable && accessibility.role == "link") {
				return true;
			}
		}
		return false;
	};

	_pGroupBox._isFocusAcceptable = function () {
		return nexacro._enableaccessibility;
	};

	_pGroupBox._createGroupSubObj = function () {
		var mainStatic = this.mainStatic = new nexacro.MainCtrl("mainline", "absolute", 0, 0, 0, 0, null, null, this);
		mainStatic.createComponent();

		var titleButton = this.titleButton = new nexacro.TitleCtrl("title", "absolute", 0, 0, 0, 0, null, null, this);
		titleButton.style.set_border("0px solid transparent");
		titleButton.style.set_bordertype("round 1 1");
		titleButton.createComponent();

		var leftStatic = this.leftStatic = new nexacro.TitleBorderCtrl("line1", "absolute", 0, 0, 0, 0, null, null, this);
		leftStatic.createComponent();

		var rightStatic = this.rightStatic = new nexacro.TitleBorderCtrl("line2", "absolute", 0, 0, 0, 0, null, null, this);
		rightStatic.createComponent();
	};

	_pGroupBox._applyTitleSize = function () {
		var title_size = this._GetTextSize(this._display_text);
		title_size[0] = title_size[0] < 0 ? 0 : title_size[0];
		var titleButton = this.titleButton;
		var imgwidth = titleButton._image_width;
		var imgheight = titleButton._image_height;
		var title_w = title_size[0];
		var title_h = title_size[1];


		if (titleButton) {
			if (titleButton._img_elem) {
				var imgalign = this.on_find_CurrentStyle_titleImageAlign(this._pseudo);
				if (imgalign.halign == "lefttext" || imgalign.halign == "righttext") {
					title_w += imgwidth;
					title_h = title_h < imgheight ? titleButton._image_height : title_h;
				}
				if (imgalign.valign == "toptext" || imgalign.valign == "bottomtext") {
					title_h += imgheight;
				}
			}

			var title_l = 0;
			var title_t = 0;

			this.titleButton._adjust_left = title_l;
			this.titleButton._adjust_top = title_t;
			this.titleButton._adjust_width = title_w;
			this.titleButton._adjust_height = title_h;
			this.on_apply_titlealign();
		}
	};

	_pGroupBox._getMakeClientRect = function (comp) {
		return {
			left : comp._client_left, 
			top : comp._client_top, 
			right : comp._client_left + comp._client_width, 
			bottom : comp._client_top + comp._client_height, 
			width : comp._client_width, 
			height : comp._client_height
		};
	};

	_pGroupBox._title_Border = function () {
		if (!this.mainStatic || !this.leftStatic || !this.rightStatic) {
			return false;
		}
		var border = this.on_find_CurrentStyle_border(this._pseudo);
		var bordertype = this.on_find_CurrentStyle_bordertype(this._pseudo);
		var background = this.on_find_CurrentStyle_background(this._pseudo);
		var l_bordertype = this.leftStatic.on_find_CurrentStyle_bordertype(this._pseudo);
		var r_bordertype = this.rightStatic.on_find_CurrentStyle_bordertype(this._pseudo);

		this.mainStatic._setElementBorder(this.mainStatic.getElement(), border, bordertype, this.titlealign);
		this.leftStatic._setElementBorder(this.leftStatic.getElement(), border, l_bordertype, this.titlealign);
		this.rightStatic._setElementBorder(this.rightStatic.getElement(), border, r_bordertype, this.titlealign);

		this.on_apply_style_border("");
		this.on_apply_style_background("none");
		this.mainStatic.on_apply_style_background(background);
	};

	_pGroupBox._GetTextSize = function (text) {
		if (!this.titleButton) {
			return;
		}
		var font = this.titleButton.on_find_CurrentStyle_font(this._pseudo) || nexacro.Component._default_font;
		var letterspace = this.titleButton.on_find_CurrentStyle_letterspace(this._pseudo);
		return nexacro._getTextSize2(letterspace, text, font);
	};

	nexacro.TitleCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.ButtonCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;
	};
	_pTitleCtrl = nexacro.TitleCtrl.prototype = nexacro._createPrototype(nexacro.ButtonCtrl, nexacro.TitleCtrl);
	_pTitleCtrl.orgRect = null;

	_pTitleCtrl.on_apply_custom_pseudo = function (pseudo) {
		nexacro.ButtonCtrl.prototype.on_apply_custom_pseudo.call(this, pseudo);

		this.parent.mainStatic._pseudo = pseudo;
		this.parent.mainStatic.on_update_style_border();

		if (this.parent.rightStatic) {
			this.parent.rightStatic._pseudo = pseudo;
			this.parent.rightStatic.on_update_style_border();
		}
		if (this.parent.leftStatic) {
			this.parent.leftStatic._pseudo = pseudo;
			this.parent.leftStatic.on_update_style_border();
		}
		this.parent._title_Border();
	};


	_pTitleCtrl.on_find_CurrentStyle_align = function (pseudo) {
		return nexacro.Component._default_align;
	};

	_pTitleCtrl.on_find_CurrentStyle_color = function (pseudo) {
		return this.parent._find_pseudo_obj("color", pseudo, "color");
	};

	_pTitleCtrl.on_find_CurrentStyle_font = function (pseudo) {
		return this.parent._find_pseudo_obj("font", pseudo, "font");
	};

	_pTitleCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent._find_pseudo_obj("titlebackground", pseudo, "background");
	};

	_pTitleCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent._find_pseudo_obj("titlegradation", pseudo, "gradation");
	};

	_pTitleCtrl.on_find_CurrentStyle_image = function (pseudo) {
		return this.parent._find_pseudo_obj("titleimage", pseudo);
	};

	_pTitleCtrl.on_find_CurrentStyle_imagealign = function (pseudo) {
		return this.parent.on_find_CurrentStyle_titleImageAlign(pseudo);
	};

	_pTitleCtrl.on_find_CurrentStyle_imagepadding = function (pseudo) {
		return this.parent._find_pseudo_obj("titleimagepadding", pseudo, "padding");
	};

	_pTitleCtrl.on_find_CurrentStyle_padding = function (pseudo) {
		return this.parent._find_pseudo_obj("titlepadding", pseudo, "padding");
	};

	_pTitleCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent._find_pseudo_obj("cursor", pseudo);
	};


	_pTitleCtrl._img_load_completed = function (imgurl) {
		this.parent._applyTitleSize();
		nexacro.Button.prototype._img_load_completed.call(this, imgurl);
	};

	nexacro.MainCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;
	};
	_pMainCtrl = nexacro.MainCtrl.prototype = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.MainCtrl);
	_pMainCtrl.orgPos = null;

	_pMainCtrl.on_apply_custom_pseudo = function (pseudo) {
		nexacro.StaticCtrl.prototype.on_apply_custom_pseudo.call(this, pseudo);

		if (this.parent.rightStatic) {
			this.parent.rightStatic._pseudo = pseudo;
			this.parent.rightStatic.on_update_style_border();
		}
		if (this.parent.leftStatic) {
			this.parent.leftStatic._pseudo = pseudo;
			this.parent.leftStatic.on_update_style_border();
		}
		this.parent._title_Border();
	};


	_pMainCtrl.on_find_CurrentStyle_background = function (pseudo) {
		return this.parent._find_pseudo_obj("background", pseudo, "background");
	};

	_pMainCtrl.on_find_CurrentStyle_shadow = function (pseudo) {
		return this.parent._find_pseudo_obj("shadow", pseudo, "shadow");
	};

	_pMainCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		return this.parent._find_pseudo_obj("bordertype", pseudo, "bordertype");
	};

	_pMainCtrl.on_find_CurrentStyle_gradation = function (pseudo) {
		return this.parent._find_pseudo_obj("gradation", pseudo, "gradation");
	};

	_pMainCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent._find_pseudo_obj("cursor", pseudo);
	};


	_pMainCtrl._setElementBorder = function (control, border, bordertype, align) {
		if (!border) {
			return;
		}

		var b = border.clone();
		var b_val = b._value;
		var all_border;

		b._linecnt = 1;
		b._copytoSubObjects();
		b._linecnt = 4;

		if (align != null) {
			if (align == "righttop" || align == "rightcenter" || align == "rightbottom") {
				b.set_right_width("0");
			}
			else if (align == "lefttop" || align == "leftcenter" || align == "leftbottom") {
				b.set_left_width("0");
			}
			else if (align == "bottomright" || align == "bottomcenter" || align == "bottomleft") {
				b.set_bottom_width("0");
			}
			else {
				b.set_top_width("0");
			}
			control.setElementBorder(b, bordertype);
		}
	};

	delete _pMainCtrl;

	nexacro.TitleBorderCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.StaticCtrl.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_reference_control = false;
	};

	_pTitleBorderCtrl = nexacro.TitleBorderCtrl.prototype = nexacro._createPrototype(nexacro.StaticCtrl, nexacro.TitleBorderCtrl);

	_pTitleBorderCtrl.on_apply_custom_pseudo = function (pseudo) {
		nexacro.StaticCtrl.prototype.on_apply_custom_pseudo.call(this, pseudo);

		this.parent.mainStatic._pseudo = pseudo;
		this.parent.mainStatic.on_update_style_border();

		if (this.id == "line1") {
			if (this.parent.rightStatic) {
				this.parent.rightStatic._pseudo = pseudo;
				this.parent.rightStatic.on_update_style_border();
			}
		}
		if (this.id == "line2") {
			if (this.parent.leftStatic) {
				this.parent.leftStatic._pseudo = pseudo;
				this.parent.leftStatic.on_update_style_border();
			}
		}
		this.parent._title_Border();
	};


	_pTitleBorderCtrl.on_find_CurrentStyle_background = function (pseudo) {
	};

	_pTitleBorderCtrl.on_find_CurrentStyle_border = function (pseudo) {
		return this.parent._find_pseudo_obj("border", pseudo, "border");
	};

	_pTitleBorderCtrl.on_find_CurrentStyle_bordertype = function (pseudo) {
		var bordertypeorg = this.parent._find_pseudo_obj("bordertype", pseudo, "bordertype");
		var bordertype = bordertypeorg.clone();
		var align = this.parent.titlealign;

		if (align == "righttop" || align == "rightcenter" || align == "rightbottom") {
			if (this.id == "line1") {
				bordertype.set_lefttop(false);
				bordertype.set_leftbottom(false);
				bordertype.set_righttop(true);
				bordertype.set_rightbottom(false);
			}
			else if (this.id == "line2") {
				bordertype.set_lefttop(false);
				bordertype.set_leftbottom(true);
				bordertype.set_righttop(false);
				bordertype.set_rightbottom(true);
			}
		}
		else if (align == "lefttop" || align == "leftcenter" || align == "leftbottom") {
			if (this.id == "line1") {
				bordertype.set_lefttop(true);
				bordertype.set_leftbottom(false);
				bordertype.set_righttop(true);
				bordertype.set_rightbottom(false);
			}
			else if (this.id == "line2") {
				bordertype.set_lefttop(false);
				bordertype.set_leftbottom(true);
				bordertype.set_righttop(false);
				bordertype.set_rightbottom(true);
			}
		}
		else if (align == "bottomright" || align == "bottomcenter" || align == "bottomleft") {
			if (this.id == "line1") {
				bordertype.set_lefttop(true);
				bordertype.set_leftbottom(true);
				bordertype.set_righttop(false);
				bordertype.set_rightbottom(false);
			}
			else if (this.id == "line2") {
				bordertype.set_lefttop(false);
				bordertype.set_leftbottom(false);
				bordertype.set_righttop(true);
				bordertype.set_rightbottom(true);
			}
		}
		else {
			if (this.id == "line1") {
				bordertype.set_lefttop(true);
				bordertype.set_leftbottom(true);
				bordertype.set_righttop(false);
				bordertype.set_rightbottom(false);
			}
			else if (this.id == "line2") {
				bordertype.set_lefttop(false);
				bordertype.set_leftbottom(false);
				bordertype.set_righttop(true);
				bordertype.set_rightbottom(true);
			}
		}

		return bordertype;
	};

	_pTitleBorderCtrl.on_find_CurrentStyle_cursor = function (pseudo) {
		return this.parent._find_pseudo_obj("cursor", pseudo);
	};


	_pTitleBorderCtrl._setElementBorder = function (control, border, bordertype, align) {
		if (!border) {
			return;
		}

		var b = border.clone();
		b._linecnt = 1;
		b._copytoSubObjects();
		b._linecnt = 4;

		if (align != null) {
			if (align == "righttop" || align == "rightcenter" || align == "rightbottom") {
				if (this.id == "line1") {
					b.set_bottom_width("0");
				}
				else if (this.id == "line2") {
					b.set_top_width("0");
				}
			}
			else if (align == "lefttop" || align == "leftcenter" || align == "leftbottom") {
				if (this.id == "line1") {
					b.set_bottom_width("0");
				}
				else if (this.id == "line2") {
					b.set_top_width("0");
				}
			}
			else if (align == "bottomright" || align == "bottomcenter" || align == "bottomleft") {
				b.set_top_width("0");

				if (this.id == "line1") {
					b.set_right_width("0");
				}
				else if (this.id == "line2") {
					b.set_left_width("0");
				}
			}
			else {
				if (this.id == "line1") {
					b.set_right_width("0");
				}
				else if (this.id == "line2") {
					b.set_left_width("0");
				}
			}

			control.setElementBorder(b, bordertype);
		}
	};

	delete _pTitleBorderCtrl;

	nexacro.GroupBoxCtrl = function (id, position, left, top, width, height, right, bottom, parent) {
		nexacro.GroupBox.call(this, id, position, left, top, width, height, right, bottom, parent);
		this._is_subcontrol = true;
	};

	var _pGroupBoxCtrl = nexacro.GroupBoxCtrl.prototype = nexacro._createPrototype(nexacro.GroupBox, nexacro.GroupBoxCtrl);
	_pGroupBoxCtrl._type_name = "GroupBoxControl";

	nexacro._setForControlStyleFinder(_pGroupBoxCtrl);

	delete _pGroupBoxCtrl;
}
